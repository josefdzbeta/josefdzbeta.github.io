"""CC0 asset helpers for the Blender renders (Poly Haven, fetched by scripts/fetch_assets.py into
../research/assets/polyhaven): glTF models as instanceable collections, PBR texture materials tiled in metres,
and HDRI skies rotated so that their sun comes from a chosen direction."""
import bpy, glob, math, os
import numpy as np
from mathutils import Vector

ROOT = None
_models = {}


def set_root(path):
    global ROOT
    ROOT = path if path and os.path.isdir(path) else None
    return ROOT


def have(kind, name):
    if not ROOT: return False
    return bool(glob.glob(os.path.join(ROOT, kind, name + '_*.hdr'))) if kind == 'hdris' else os.path.isdir(os.path.join(ROOT, kind, name))


def protos():
    """collection holding the imported originals, excluded from the view layer so only the instances render"""
    sc = bpy.context.scene; c = bpy.data.collections.get('asset_protos')
    if c is None: c = bpy.data.collections.new('asset_protos')
    if c.name not in sc.collection.children: sc.collection.children.link(c)
    for lc in bpy.context.view_layer.layer_collection.children:
        if lc.collection == c: lc.exclude = True
    return c


def model(name, parent=None):
    """import once; returns (collection, size xyz) with the collection's instance offset at the base centre"""
    if name in _models: return _models[name]
    if not have('models', name): return None
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=glob.glob(os.path.join(ROOT, 'models', name, '*.gltf'))[0])
    new = [o for o in bpy.data.objects if o not in before]
    coll = bpy.data.collections.new('asset_' + name)
    (parent or protos()).children.link(coll)
    for o in new:
        for c in list(o.users_collection): c.objects.unlink(o)
        coll.objects.link(o)
    pts = [o.matrix_world @ Vector(c) for o in new if o.type == 'MESH' for c in o.bound_box]
    mn = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
    mx = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
    coll.instance_offset = ((mn.x + mx.x) / 2, (mn.y + mx.y) / 2, mn.z)
    _models[name] = (coll, mx - mn)
    return _models[name]


def place(name, loc, yaw=0., scale=(1, 1, 1), coll=None, label='inst'):
    m = model(name)
    if not m: return None
    e = bpy.data.objects.new(label, None); e.instance_type = 'COLLECTION'; e.instance_collection = m[0]
    e.location = loc; e.rotation_euler = (0, 0, yaw); e.scale = scale
    (coll or bpy.context.scene.collection).objects.link(e)
    return e


def _img(path, colorspace):
    i = bpy.data.images.load(path, check_existing=True); i.colorspace_settings.name = colorspace; return i


def tex_nodes(nt, name, size_m, coord='UV', rot=0.):
    """image nodes (color, roughness, normal, ao) of a Poly Haven texture set, tiled every size_m metres (turned rot rad)"""
    d = os.path.join(ROOT, 'textures', name)
    f = lambda m: (glob.glob(os.path.join(d, f'{name}_{m}_2k.*')) or [None])[0]
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1 / size_m,) * 3
    mp.inputs['Rotation'].default_value = (0, 0, rot)
    nt.links.new(tc.outputs[coord], mp.inputs['Vector'])
    out = {}
    for key, m, cs in (('color', 'Diffuse', 'sRGB'), ('rough', 'Rough', 'Non-Color'), ('normal', 'nor_gl', 'Non-Color'), ('ao', 'AO', 'Non-Color')):
        p = f(m)
        if not p: continue
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = _img(p, cs); t.interpolation = 'Linear'
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector']); out[key] = t
    if 'normal' in out:
        nm = nt.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = .8
        nt.links.new(out['normal'].outputs['Color'], nm.inputs['Color']); out['normalMap'] = nm
    return out


def sockets(t):
    """output sockets of tex_nodes(): color, rough, normal"""
    s = {'color': t['color'].outputs['Color']}
    if 'rough' in t: s['rough'] = t['rough'].outputs['Color']
    if 'normalMap' in t: s['normal'] = t['normalMap'].outputs['Normal']
    return s


def _noise(nt, scale, lo, hi, a=0., b=1.):
    """object-space noise (scale = features per metre) remapped from [lo, hi] to [a, b]"""
    tc = nt.nodes.new('ShaderNodeTexCoord'); nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = scale
    nz.inputs['Detail'].default_value = 3; nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
    mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = lo; mr.inputs['From Max'].default_value = hi
    mr.inputs['To Min'].default_value = a; mr.inputs['To Max'].default_value = b; mr.clamp = True
    nt.links.new(nz.outputs['Fac'], mr.inputs['Value']); return mr.outputs['Result']


def detile(nt, name, size_m, coord='Object'):
    """large surfaces without visible repeats: two samplings of the scan (scale ×1.62, turned 37°) blended by noise,
    times a broad brightness variation; returns sockets like sockets()"""
    a = sockets(tex_nodes(nt, name, size_m, coord)); b = sockets(tex_nodes(nt, name, size_m * 1.62, coord, rot=.65))
    f = _noise(nt, 1 / (size_m * 2.5), .44, .56)
    out = {}
    for k, kind in (('color', 'RGBA'), ('rough', 'FLOAT'), ('normal', 'VECTOR')):
        if k not in a or k not in b: continue
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = kind; nt.links.new(f, mx.inputs['Factor'])
        nt.links.new(a[k], mx.inputs['A']); nt.links.new(b[k], mx.inputs['B']); out[k] = mx.outputs['Result']
    v = _noise(nt, 1 / 45., .3, .7, .8, 1.15)
    br = nt.nodes.new('ShaderNodeMix'); br.data_type = 'RGBA'; br.blend_type = 'MULTIPLY'; br.inputs['Factor'].default_value = 1
    cv = nt.nodes.new('ShaderNodeCombineColor'); [nt.links.new(v, cv.inputs[i]) for i in range(3)]
    nt.links.new(out['color'], br.inputs['A']); nt.links.new(cv.outputs['Color'], br.inputs['B']); out['color'] = br.outputs['Result']
    return out


def pbr(name, tex, size_m, tint=None, rough_mul=1., coord='UV', coat=0., sat=None):
    """material from a texture set; optional saturation (0 = grey) and tint (linear rgb) multiply the colour"""
    if not have('textures', tex): return None
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; p = nt.nodes['Principled BSDF']
    t = tex_nodes(nt, tex, size_m, coord)
    col = t['color'].outputs['Color']
    if 'ao' in t:
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs['Factor'].default_value = .6
        nt.links.new(col, mx.inputs['A']); nt.links.new(t['ao'].outputs['Color'], mx.inputs['B']); col = mx.outputs['Result']
    if sat is not None:
        hs = nt.nodes.new('ShaderNodeHueSaturation'); hs.inputs['Saturation'].default_value = sat
        nt.links.new(col, hs.inputs['Color']); col = hs.outputs['Color']
    if tint:
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs['Factor'].default_value = 1
        mx.inputs['B'].default_value = (*tint, 1); nt.links.new(col, mx.inputs['A']); col = mx.outputs['Result']
    nt.links.new(col, p.inputs['Base Color'])
    if 'rough' in t:
        rm = nt.nodes.new('ShaderNodeMath'); rm.operation = 'MULTIPLY'; rm.inputs[1].default_value = rough_mul
        nt.links.new(t['rough'].outputs['Color'], rm.inputs[0]); nt.links.new(rm.outputs[0], p.inputs['Roughness'])
    if 'normalMap' in t: nt.links.new(t['normalMap'].outputs['Normal'], p.inputs['Normal'])
    if coat: p.inputs['Coat Weight'].default_value = coat; p.inputs['Coat Roughness'].default_value = .15
    return m


def hdri_world(name, sun_dir=None, strength=1.0, scene=None):
    """HDRI sky; if sun_dir (Blender world vector) is given, the HDRI is turned about Z so its sun comes from there"""
    if not have('hdris', name): return None
    path = glob.glob(os.path.join(ROOT, 'hdris', name + '_*.hdr'))[0]
    img = _img(path, 'Linear Rec.709')
    w, h = img.size; buf = np.empty(w * h * 4, np.float32); img.pixels.foreach_get(buf); px = buf.reshape(h, w, 4)
    lum = px[..., :3].sum(2); r, c = np.unravel_index(int(np.argmax(lum)), lum.shape)
    u, v = (c + .5) / w, (r + .5) / h
    phi, th = (u - .5) * 2 * math.pi, (v - .5) * math.pi
    sun_az = (.5 - u) * 2 * math.pi                              # Blender equirect: u = -atan2(y, x)/2π + .5
    world = bpy.data.worlds.new('sky_' + name); (scene or bpy.context.scene).world = world; world.use_nodes = True
    nt = world.node_tree; bg = nt.nodes['Background']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); env = nt.nodes.new('ShaderNodeTexEnvironment'); env.image = img
    rot = 0.
    if sun_dir is not None: rot = math.atan2(sun_dir.y, sun_dir.x) - sun_az
    mp.inputs['Rotation'].default_value = (0, 0, -rot)       # lookup = R(a)·dir: a = sun_az − target_az puts the sun at sun_dir
    nt.links.new(tc.outputs['Generated'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], env.inputs['Vector'])
    nt.links.new(env.outputs['Color'], bg.inputs['Color']); bg.inputs['Strength'].default_value = strength
    elev = math.degrees(th)
    print(f'hdri {name}: sun elevation {elev:.1f}°, turned {math.degrees(rot):.1f}°', flush=True)
    return world, bg, env, elev
