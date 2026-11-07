"""Headless Blender: independent rebuild of the web model for validation + GLB export.

  blender -b -P scripts/blender/validate_and_export.py -- <models_dir> <out_dir> [CODE ...]

For each unit: builds walls (extruded 2.5 m, inferred), floors coloured by room type and opening
infills from units/<CODE>.json, renders an orthographic top view at the exact metric extent of the
traced grid (so it can be overlaid 1:1 on plans/<CODE>.jpg), and exports <CODE>.glb.
If building.json exists, also exports building.glb (Draco) of the assembled Portal 1.
"""
import bpy, bmesh, json, os, sys

argv = sys.argv[sys.argv.index('--') + 1:]
models, out = argv[0], argv[1]
codes = argv[2:]
os.makedirs(out, exist_ok=True)
H = 2.6  # clear height measured on the published elevation
STOREY = {'B': 3.8}; TYP = 3.3
level_z = lambda lv: 0 if lv == 'B' else 3.8 + (int(lv) - 1) * TYP
COL = {'wall': (0.15, 0.17, 0.19, 1), 'bath': (0.35, 0.65, 0.75, 1), 'kitchen': (0.85, 0.55, 0.3, 1),
       'living_kitchen': (0.9, 0.75, 0.45, 1), 'living': (0.95, 0.85, 0.55, 1), 'bedroom': (0.6, 0.55, 0.85, 1),
       'circulation': (0.75, 0.75, 0.7, 1), 'exterior': (0.55, 0.75, 0.5, 1), 'laundry': (0.5, 0.7, 0.6, 1),
       'other': (0.8, 0.8, 0.8, 1), 'opening': (0.95, 0.3, 0.3, 1)}


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'BLENDER_WORKBENCH'
    sc.display.shading.light = 'FLAT'; sc.display.shading.color_type = 'MATERIAL'
    sc.render.film_transparent = False
    sc.world = bpy.data.worlds.new('w'); sc.world.color = (1, 1, 1)
    return sc


def mat(name):
    m = bpy.data.materials.get(name)
    if not m:
        m = bpy.data.materials.new(name); m.diffuse_color = COL.get(name, (0.8, 0.8, 0.8, 1))
        m.use_nodes = True; m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = m.diffuse_color
    return m


def decode(u):
    vals = []
    for tok in u['grid'].split(','):
        v, c = tok.split(':'); vals += [int(v)] * int(c)
    return vals


def greedy(mask, W, Hh):
    m = list(mask); out = []
    for y in range(Hh):
        x = 0
        while x < W:
            if not m[y * W + x]: x += 1; continue
            x1 = x
            while x1 < W and m[y * W + x1]: x1 += 1
            y1 = y + 1
            while y1 < Hh and all(m[y1 * W + i] for i in range(x, x1)): y1 += 1
            for yy in range(y, y1):
                for i in range(x, x1): m[yy * W + i] = 0
            out.append((x, y, x1 - x, y1 - y)); x = x1
    return out


def boxes(name, rects, c, z0, z1, ox=0, oy=0, flip=True):
    bm = bmesh.new()
    for x, y, w, h in rects:
        X0, X1 = ox + x * c, ox + (x + w) * c
        Y0, Y1 = (oy - y * c, oy - (y + h) * c) if flip else (oy + y * c, oy + (y + h) * c)
        vs = [bm.verts.new((a, b, zz)) for zz in (z0, z1) for a, b in ((X0, Y0), (X1, Y0), (X1, Y1), (X0, Y1))]
        for f in ((0, 1, 2, 3), (4, 7, 6, 5), (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)):
            bm.faces.new([vs[i] for i in f])
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    bmesh.ops if False else None
    ob = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(ob)
    ob.data.materials.append(mat(name.split(':')[0]))
    return ob


def unit(code):
    sc = reset()
    u = json.load(open(os.path.join(models, 'units', code + '.json')))
    g, W, Hh, c = decode(u), u['w'], u['h'], u['cell']
    boxes('wall', greedy([v == 1 for v in g], W, Hh), c, 0, H)
    boxes('opening', greedy([v == 2 for v in g], W, Hh), c, 0, .02)
    by = {}
    for k, r in enumerate(u['rooms']): by.setdefault(r['type'], []).append(k + 3)
    for t, vs in by.items():
        rs = greedy([v in vs for v in g], W, Hh)
        if rs: boxes(t + ':' + code, rs, c, 0, .02)
    for ob in bpy.data.objects:
        if ':' in ob.name: ob.data.materials.clear(); ob.data.materials.append(mat(ob.name.split(':')[0]))
    cam = bpy.data.cameras.new('cam'); cam.type = 'ORTHO'
    wM, hM = W * c, Hh * c
    cam.ortho_scale = max(wM, hM)
    co = bpy.data.objects.new('cam', cam); co.location = (wM / 2, -hM / 2, 30); sc.collection.objects.link(co); sc.camera = co
    px = 900
    sc.render.resolution_x = int(px * wM / max(wM, hM)); sc.render.resolution_y = int(px * hM / max(wM, hM))
    sc.render.filepath = os.path.join(out, code + '_blender_top.png')
    bpy.ops.render.render(write_still=True)
    bpy.ops.export_scene.gltf(filepath=os.path.join(out, code + '.glb'), export_format='GLB', export_draco_mesh_compression_enable=True)
    return sc.render.filepath


def building():
    p = os.path.join(models, 'building.json')
    if not os.path.exists(p): return
    reset(); b = json.load(open(p))
    for lv, L in b['levels'].items():
        z = level_z(lv); S = STOREY.get(lv, TYP)
        ox, oy = L.get('offset', [0, 0]); sc_ = L['slabCell']
        boxes('slab', [tuple(r) for r in L['slab']], sc_, z - .3, z, ox, -oy)
        for pu in L['units']:
            boxes('wall', [tuple(r) for r in pu['walls']], pu.get('cell', b['cell']), z, z + S - .3, pu['x'], -pu['y'])
            # Portal 2: same distribution as Portal 1, mirrored about the shared gable (y = 0)
            boxes('wall', [tuple(r) for r in pu['walls']], pu.get('cell', b['cell']), z, z + S - .3, pu['x'], pu['y'], flip=False)
    bpy.ops.export_scene.gltf(filepath=os.path.join(out, 'building.glb'), export_format='GLB', export_draco_mesh_compression_enable=True)


for code in codes or sorted(f[:-5] for f in os.listdir(os.path.join(models, 'units'))):
    print('rendered', unit(code))
building()
print('done')
