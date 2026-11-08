"""Photoreal 3D floor-plan renders of each traced dwelling (Cycles), for the dwelling view of the web.

  blender -b -P scripts/blender/dwelling.py -- <dwellings_dir> <out_dir> [--res 1600x1200] [--samples 96] [--only 1C,2A]

dwellings_dir  geometry exported by scripts/export-units.mjs (exactly what the web builds from the traced plans)
out_dir        <code>.png + <code>.json (camera and the pixel position of every room label, for the "+" pins)

Walls are cut at door-head height (2,10 m) with dark section caps; floors, tiles, carpentry and fittings use
physically based materials matching the memoria (SPC vinyl wood-look flooring, porcelain tiles in baths, white PVC
windows); furniture keeps the web's layout (orientative) with rounded edges and fabric/wood materials. Daylight:
physical sky + soft sun. Portal 2 dwellings are the mirror image (the web flips the picture and the pins).
"""
import bpy, bmesh, json, math, os, sys
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

argv = sys.argv[sys.argv.index('--') + 1:]
src, out = map(os.path.abspath, argv[:2])
opt = dict(zip(argv[2::2], argv[3::2]))
RW, RH = map(int, opt.get('--res', '1600x1200').split('x')); SAMPLES = int(opt.get('--samples', 96))
ONLY = opt['--only'].split(',') if '--only' in opt else None
CUT = 2.1      # section height: door heads, so rooms stay visible from the 3/4 view
os.makedirs(out, exist_ok=True)
B = lambda x, y, z: Vector((x, -z, y))


def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in c)


def node_mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    return m, m.node_tree, m.node_tree.nodes['Principled BSDF']


def plain(name, col, rough=.85, metal=0., spec=.5, bump=0., scale=60., coat=0., sheen=0.):
    m, nt, p = node_mat(name)
    p.inputs['Base Color'].default_value = (*srgb(col), 1); p.inputs['Roughness'].default_value = rough
    p.inputs['Metallic'].default_value = metal; p.inputs['Specular IOR Level'].default_value = spec
    if coat: p.inputs['Coat Weight'].default_value = coat; p.inputs['Coat Roughness'].default_value = .08
    if sheen: p.inputs['Sheen Weight'].default_value = sheen
    if bump:
        n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = scale; n.inputs['Detail'].default_value = 8
        tc = nt.nodes.new('ShaderNodeTexCoord'); nt.links.new(tc.outputs['Object'], n.inputs['Vector'])
        bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = bump; bm.inputs['Distance'].default_value = .003
        nt.links.new(n.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    return m


def tiles(name, c1, c2, w, h, grout='#c9c6c0', rough=.25, offset=.0):
    """tiles/planks in metric UVs (the exported geometry carries UVs in metres)"""
    m, nt, p = node_mat(name)
    tc = nt.nodes.new('ShaderNodeTexCoord'); br = nt.nodes.new('ShaderNodeTexBrick'); br.offset = offset
    br.inputs['Color1'].default_value = (*srgb(c1), 1); br.inputs['Color2'].default_value = (*srgb(c2), 1); br.inputs['Mortar'].default_value = (*srgb(grout), 1)
    br.inputs['Scale'].default_value = 1; br.inputs['Mortar Size'].default_value = .003; br.inputs['Brick Width'].default_value = w; br.inputs['Row Height'].default_value = h
    br.inputs['Bias'].default_value = 0
    nt.links.new(tc.outputs['UV'], br.inputs['Vector']); nt.links.new(br.outputs['Color'], p.inputs['Base Color'])
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .4; bm.inputs['Distance'].default_value = .002; bm.invert = True
    nt.links.new(br.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    p.inputs['Roughness'].default_value = rough
    return m


def wood_floor(name, light='#c9a77f', dark='#a9825a'):
    """wood-look SPC planks 1,22 × 0,18 m: plank colour variation + grain"""
    m, nt, p = node_mat(name)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    br = nt.nodes.new('ShaderNodeTexBrick'); br.offset = .37; br.offset_frequency = 1
    br.inputs['Color1'].default_value = (*srgb(light), 1); br.inputs['Color2'].default_value = (*srgb(dark), 1); br.inputs['Mortar'].default_value = (*srgb('#7d6248'), 1)
    br.inputs['Scale'].default_value = 1; br.inputs['Mortar Size'].default_value = .0015; br.inputs['Brick Width'].default_value = 1.22; br.inputs['Row Height'].default_value = .18
    nt.links.new(tc.outputs['UV'], br.inputs['Vector'])
    mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1, 18, 1); nt.links.new(tc.outputs['UV'], mp.inputs['Vector'])
    wv = nt.nodes.new('ShaderNodeTexWave'); wv.inputs['Scale'].default_value = 3; wv.inputs['Distortion'].default_value = 6; wv.inputs['Detail'].default_value = 4
    nt.links.new(mp.outputs['Vector'], wv.inputs['Vector'])
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs['Factor'].default_value = .18
    nt.links.new(br.outputs['Color'], mx.inputs['A']); nt.links.new(wv.outputs['Color'], mx.inputs['B'])
    nt.links.new(mx.outputs['Result'], p.inputs['Base Color'])
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .5; bm.inputs['Distance'].default_value = .001; bm.invert = True
    nt.links.new(br.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    p.inputs['Roughness'].default_value = .42; p.inputs['Coat Weight'].default_value = .25; p.inputs['Coat Roughness'].default_value = .2
    return m


def glass():
    m = bpy.data.materials.new('glass'); m.use_nodes = True; nt = m.node_tree
    for nd in list(nt.nodes):
        if nd.type != 'OUTPUT_MATERIAL': nt.nodes.remove(nd)
    tr = nt.nodes.new('ShaderNodeBsdfTransparent'); gl = nt.nodes.new('ShaderNodeBsdfGlossy'); gl.inputs['Roughness'].default_value = .02
    fr = nt.nodes.new('ShaderNodeFresnel'); mx = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(fr.outputs['Fac'], mx.inputs['Fac']); nt.links.new(tr.outputs['BSDF'], mx.inputs[1]); nt.links.new(gl.outputs['BSDF'], mx.inputs[2])
    nt.links.new(mx.outputs['Shader'], nt.nodes['Material Output'].inputs['Surface'])
    return m


def materials():
    return {
        'paint': plain('paint', '#f1efea', .9, bump=.05, scale=90), 'facade': plain('facade', '#eeece7', .85),
        'cap': plain('cap', '#3e4144', .9),
        'floor': wood_floor('floor'), 'kitchenFloor': wood_floor('kitchenFloor'),
        'bathFloor': tiles('bathFloor', '#cfcbc4', '#c8c4bc', .6, .6, '#b9b5ad', .3),
        'bathWall': tiles('bathWall', '#f3f2ef', '#eeede9', .6, .3, '#d6d4cf', .12),
        'kitchenWall': tiles('kitchenWall', '#f1f0ec', '#ebe9e4', .3, .1, '#d2d0ca', .15, .5),
        'terrace': tiles('terrace', '#cdc5b8', '#c4bcae', .6, .6, '#aaa293', .7),
        'skirting': plain('skirting', '#f3f2ee', .4), 'carpentry': plain('carpentry', '#f4f3ef', .35, coat=.3),
        'frameDark': plain('frameDark', '#e9eae8', .35), 'glass': glass(),
        'cabinets': plain('cabinets', '#f2f1ed', .45, coat=.2), 'worktop': plain('worktop', '#e7e4de', .25, bump=.03, scale=200),
        'hob': plain('hob', '#0e0f10', .08, spec=1), 'metal': plain('metal', '#d6d9dc', .18, metal=1),
        'sanitary': plain('sanitary', '#fbfbf9', .08, coat=.6), 'resin': plain('resin', '#efeeea', .35),
        'wood': plain('wood', '#a8835d', .5, bump=.1, scale=40, coat=.2), 'lacquer': plain('lacquer', '#ecebe6', .35, coat=.4),
        'fabric': plain('fabric', '#bdb7ad', .95, bump=.25, scale=300, sheen=.6), 'linen': plain('linen', '#f4f2ee', .95, bump=.15, scale=250, sheen=.5),
        'accent': plain('accent', '#7f8f80', .9, bump=.2, scale=250, sheen=.5), 'rug': plain('rug', '#cfc6b6', 1, bump=.4, scale=400, sheen=.4),
        'outdoor': plain('outdoor', '#8a8984', .6), 'plant': plain('plant', '#4f6b33', .7, bump=.6, scale=30),
        'ground': plain('ground', '#e4e1da', .95), 'slab': plain('slab', '#f2f0ec', .85),
    }


def mesh(name, bk, mat, cap=None, bevel=0.):
    p, u, idx = bk['p'], bk['u'], bk['i']
    me = bpy.data.meshes.new(name)
    vs = [tuple(B(p[i], min(p[i + 1], CUT), p[i + 2])) for i in range(0, len(p), 3)]
    me.from_pydata(vs, [], [tuple(idx[i:i + 3]) for i in range(0, len(idx), 3)])
    uvl = me.uv_layers.new(name='UVMap')
    for poly in me.polygons:
        for li in poly.loop_indices:
            vi = me.loops[li].vertex_index; uvl.data[li].uv = (u[vi * 2], u[vi * 2 + 1])
    me.materials.append(mat)
    if cap:                                                    # section caps: upward faces at the cut height
        me.materials.append(cap)
        for poly in me.polygons:
            if poly.normal.z > .9 and all(abs(vs[v][2] - CUT) < 1e-4 for v in poly.vertices): poly.material_index = 1
    me.validate(); me.update()
    ob = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(ob)
    if bevel:
        bpy.context.view_layer.objects.active = ob; ob.select_set(True)
        bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.remove_doubles(threshold=1e-4); bpy.ops.object.mode_set(mode='OBJECT')
        m = ob.modifiers.new('bevel', 'BEVEL'); m.width = bevel; m.segments = 3; m.limit_method = 'ANGLE'
        ob.select_set(False)
    return ob


def render(code):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; d = json.load(open(os.path.join(src, code + '.json'))); M = materials()
    w, dd = d['size']
    for k, bk in d['builder'].items():
        cap = M['cap'] if k in ('paint', 'facade') else None
        mesh('u_' + k, bk, M.get(k, M['paint']), cap, bevel=.012 if k in ('cabinets', 'worktop', 'sanitary') else 0)
    for room, buckets in d['furniture'].items():
        for k, bk in buckets.items(): mesh(f'f{room}_{k}', bk, M.get(k, M['fabric']), bevel=.025 if k in ('fabric', 'linen', 'accent', 'rug') else .008)
    # model slab and a soft ground far below: the dwelling reads as a cut-away architectural model
    bm = bmesh.new(); bmesh.ops.create_cube(bm, size=1); me = bpy.data.meshes.new('slab'); bm.to_mesh(me); bm.free()
    sl = bpy.data.objects.new('slab', me); sl.scale = (w + .3, dd + .3, .3); sl.location = (0, 0, -.16); me.materials.append(M['slab']); sc.collection.objects.link(sl)
    bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=200); me = bpy.data.meshes.new('ground'); bm.to_mesh(me); bm.free()
    gr = bpy.data.objects.new('ground', me); gr.location.z = -2.5; me.materials.append(M['ground']); sc.collection.objects.link(gr)
    # light: physical sky + soft sun from the front-left
    world = bpy.data.worlds.new('w'); sc.world = world; world.use_nodes = True; bg = world.node_tree.nodes['Background']
    sky = world.node_tree.nodes.new('ShaderNodeTexSky'); sky.sky_type = 'NISHITA'; sky.sun_disc = False; sky.sun_elevation = math.radians(52); sky.dust_density = .5
    world.node_tree.links.new(sky.outputs['Color'], bg.inputs['Color']); bg.inputs['Strength'].default_value = .28
    sd = bpy.data.lights.new('sun', 'SUN'); sd.energy = 4.6; sd.angle = math.radians(3); sd.color = (1, .92, .8)
    sun = bpy.data.objects.new('sun', sd); sun.rotation_euler = Vector((-.5, -.75, 1.4)).normalized().to_track_quat('Z', 'Y').to_euler(); sc.collection.objects.link(sun)
    # camera: 3/4 view from above, long lens, fitted to the footprint
    cd = bpy.data.cameras.new('cam'); cd.sensor_fit = 'VERTICAL'; fov = math.radians(26); cd.angle_y = fov; cd.clip_start = .5; cd.clip_end = 400
    cam = bpy.data.objects.new('cam', cd); sc.collection.objects.link(cam); sc.camera = cam
    dirv = Vector((.42, .86, .5)).normalized()                                 # same direction as the web overview (x, y up, z)
    r = math.hypot(w, dd) / 2 + .3; hf = 2 * math.atan(math.tan(fov / 2) * RW / RH); dist = r / math.sin(min(fov, hf) / 2) * .74
    tgt = Vector((0, .9, 0)); pos = tgt + dirv * dist
    cam.location = B(*pos); cam.rotation_euler = (B(*tgt) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    # render
    sc.render.engine = 'CYCLES'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    try:
        prefs.compute_device_type = 'METAL'; prefs.get_devices()
        for dv in prefs.devices: dv.use = True
        sc.cycles.device = 'GPU'
    except Exception as e: print('GPU unavailable', e)
    sc.cycles.samples = SAMPLES; sc.cycles.use_adaptive_sampling = True; sc.cycles.adaptive_threshold = .015
    sc.cycles.use_denoising = True; sc.cycles.denoiser = 'OPENIMAGEDENOISE'
    sc.cycles.max_bounces = 8; sc.cycles.diffuse_bounces = 4; sc.cycles.glossy_bounces = 4; sc.cycles.transmission_bounces = 6
    sc.cycles.caustics_reflective = False; sc.cycles.caustics_refractive = False; sc.cycles.blur_glossy = 1
    sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = RW, RH, 100
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'; sc.view_settings.exposure = .15
    sc.render.film_transparent = False
    sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGB'
    sc.render.filepath = os.path.join(out, code + '.png'); bpy.ops.render.render(write_still=True)
    pins = []
    for rm in d['rooms']:
        if rm['area'] is not None and rm['area'] < .9: continue
        v = world_to_camera_view(sc, cam, B(rm['labelAt'][0], .2, rm['labelAt'][1]))
        pins.append({'index': rm['index'], 'name': rm['name'], 'area': rm['area'], 'x': round(v.x, 4), 'y': round(1 - v.y, 4)})
    json.dump({'code': code, 'size': [RW, RH], 'camera': {'pos': [round(c, 3) for c in pos], 'target': list(tgt), 'fovY': 26}, 'pins': pins,
               'note': 'pins in image fractions (x right, y down); Portal 2 = mirror image (flip x)'}, open(os.path.join(out, code + '.json'), 'w'), indent=1)
    print('rendered', code, flush=True)


codes = ONLY or sorted(f[:-5] for f in os.listdir(src) if f.endswith('.json'))
for c in codes: render(c)
print('done')
