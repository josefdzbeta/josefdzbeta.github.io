"""Photoreal turntable of Mykonos (Cycles) for the web's building view.

  blender -b -P scripts/blender/turntable.py -- <scene.json> <context_dir> <tex_dir> <out_dir>
          [--frames 36] [--res 1600x1200] [--samples 96] [--only 0,9] [--blend file.blend]
          [--mode dusk --glow <dir of *_glow.png from scripts/plans/glow_masks.py>]
          [--openings facade-openings.json] [--cam r03|r01 (published render camera, for comparison)]
          [--assets ../research/assets/polyhaven (CC0 sky, textures, trees and shrubs)]

scene.json   building + plot geometry exactly as the web builds it (scripts/export-scene.mjs)
context_dir  OSM surroundings (scripts/plans/context.py): ground rasters + context.json
tex_dir      façade textures from the published elevations (dist/models/mykonos/tex)
out_dir      frame_###.png + cameras.json (camera of every frame, building frame, y up)

The camera circles the building at a fixed height; the sun is fixed in the world, so the light moves
across the façades as the building turns. Nothing here changes the published geometry: façades carry the
published elevation images, glass/cladding/plaster only get physically based shading.
"""
import bpy, bmesh, json, math, os, sys, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import facade_geo, assets
import numpy as np
from mathutils import Vector, Matrix, Euler

argv = sys.argv[sys.argv.index('--') + 1:]
scene_json, ctx_dir, tex_dir, out_dir = map(os.path.abspath, argv[:4])   # absolute: saving a .blend remaps relative paths
opt = dict(zip(argv[4::2], argv[5::2]))
NFR = int(opt.get('--frames', 36)); RW, RH = map(int, opt.get('--res', '1600x1200').split('x'))
DUSK = opt.get('--mode') == 'dusk'; GLOW = os.path.abspath(opt['--glow']) if '--glow' in opt else None   # blue hour: lit windows, street lights
OPENINGS = json.load(open(opt['--openings'])) if '--openings' in opt else {}   # scripts/plans/facade_vector.py
ASSETS = assets.set_root(os.path.abspath(opt['--assets'])) if '--assets' in opt else None   # CC0 Poly Haven assets (scripts/fetch_assets.py)
CAM = opt.get('--cam')            # a published render's calibrated camera (r03, r01) instead of the ring
SAMPLES = int(opt.get('--samples', 96)); ONLY = [int(v) for v in opt['--only'].split(',')] if '--only' in opt else None
os.makedirs(out_dir, exist_ok=True)
random.seed(11)

# ring: target near the building centre, 140 m out, 42 m up (≈13° down, horizon at the top edge), vertical FOV 34°, 4:3
RING = {'target': [10.0, 10.0, 0.0], 'radius': 140.0, 'height': 42.0, 'fovY': 34.0, 'aspect': RW / RH, 'start': 40.0, 'step': 360.0 / NFR}
SUN = {'azimuth': -25.0, 'elevation': 40.0}   # degrees; azimuth in the building frame from +x towards +z

B = lambda x, y, z: Vector((x, -z, y))       # building frame (y up) → Blender (z up)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
data = json.load(open(scene_json)); ctx = json.load(open(os.path.join(ctx_dir, 'context.json')))
ex = data['exterior']


# ------------------------------------------------------------------------------------------- materials
def node_mat(name):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; bsdf = nt.nodes['Principled BSDF']
    return m, nt, bsdf


def plain(name, col, rough=.85, metal=0., spec=.5, bump=0., bump_scale=40., coat=0.):
    m, nt, p = node_mat(name)
    p.inputs['Base Color'].default_value = (*col, 1); p.inputs['Roughness'].default_value = rough
    p.inputs['Metallic'].default_value = metal; p.inputs['Specular IOR Level'].default_value = spec
    if coat: p.inputs['Coat Weight'].default_value = coat; p.inputs['Coat Roughness'].default_value = .05
    if bump:
        n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = bump_scale; n.inputs['Detail'].default_value = 8
        bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = bump; bm.inputs['Distance'].default_value = .01
        nt.links.new(n.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    return m


def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in c)


def facade_mat(name, path):
    """Published elevation as albedo; glass (dark panes, teal balcony glass) glossy via a mask computed here."""
    img = bpy.data.images.load(path); img.colorspace_settings.name = 'sRGB'
    w, h = img.size; px = np.array(img.pixels[:], np.float32).reshape(h, w, 4)[..., :3]
    lum = px.mean(2); r, g, b = px[..., 0], px[..., 1], px[..., 2]
    teal = (g > r + .025) & (b > r + .015) & (lum > .27) & (lum < .86)
    dark = lum < .40
    mask = np.clip(teal * .8 + dark * 1.0, 0, 1).astype(np.float32)
    mi = bpy.data.images.new(name + '_mask', w, h, alpha=False, float_buffer=False)
    mi.colorspace_settings.name = 'Non-Color'
    mi.pixels[:] = np.dstack([mask, mask, mask, np.ones_like(mask)]).ravel()
    mi.pack()
    m, nt, p = node_mat(name)
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = img; t.interpolation = 'Cubic'; t.extension = 'EXTEND'
    tm = nt.nodes.new('ShaderNodeTexImage'); tm.image = mi; tm.extension = 'EXTEND'
    # slightly lift the published whites (elevations are rendered flat) to a real white render albedo
    cc = nt.nodes.new('ShaderNodeBrightContrast'); cc.inputs['Bright'].default_value = .02; cc.inputs['Contrast'].default_value = .06
    nt.links.new(t.outputs['Color'], cc.inputs['Color']); nt.links.new(cc.outputs['Color'], p.inputs['Base Color'])
    mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['To Min'].default_value = .82; mr.inputs['To Max'].default_value = .05
    nt.links.new(tm.outputs['Color'], mr.inputs['Value']); nt.links.new(mr.outputs['Result'], p.inputs['Roughness'])
    sp = nt.nodes.new('ShaderNodeMapRange'); sp.inputs['To Min'].default_value = .35; sp.inputs['To Max'].default_value = 1.0
    nt.links.new(tm.outputs['Color'], sp.inputs['Value']); nt.links.new(sp.outputs['Result'], p.inputs['Specular IOR Level'])
    bw = nt.nodes.new('ShaderNodeRGBToBW'); nt.links.new(t.outputs['Color'], bw.inputs['Color'])
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .25; bm.inputs['Distance'].default_value = .02
    nt.links.new(bw.outputs['Val'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    gp = os.path.join(GLOW or '', os.path.basename(path).replace('.jpg', '_glow.png'))
    if DUSK and GLOW and os.path.exists(gp):
        gi = bpy.data.images.load(gp); gi.colorspace_settings.name = 'Non-Color'
        tg = nt.nodes.new('ShaderNodeTexImage'); tg.image = gi; tg.extension = 'EXTEND'
        k = nt.nodes.new('ShaderNodeMath'); k.operation = 'MULTIPLY'; k.inputs[1].default_value = 9.0
        nt.links.new(tg.outputs['Color'], k.inputs[0]); nt.links.new(k.outputs[0], p.inputs['Emission Strength'])
        p.inputs['Emission Color'].default_value = (1.0, .66, .36, 1)
    return m


def paving_mat(name, c1, c2, tile=.6, rough=.75):
    m, nt, p = node_mat(name)
    uv = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1 / tile, 1 / tile, 1)
    br = nt.nodes.new('ShaderNodeTexBrick'); br.offset = .5
    br.inputs['Color1'].default_value = (*c1, 1); br.inputs['Color2'].default_value = (*c2, 1); br.inputs['Mortar'].default_value = (*[v * .8 for v in c1], 1)
    br.inputs['Scale'].default_value = 1; br.inputs['Mortar Size'].default_value = .02; br.inputs['Brick Width'].default_value = 1; br.inputs['Row Height'].default_value = 1
    nt.links.new(uv.outputs['UV'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], br.inputs['Vector'])
    nt.links.new(br.outputs['Color'], p.inputs['Base Color']); p.inputs['Roughness'].default_value = rough
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .3; bm.inputs['Distance'].default_value = .01; bm.invert = True
    nt.links.new(br.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    return m


def slats_mat():
    m, nt, p = node_mat('slats')
    uv = nt.nodes.new('ShaderNodeTexCoord'); wv = nt.nodes.new('ShaderNodeTexWave'); wv.wave_profile = 'SAW'
    wv.inputs['Scale'].default_value = 1.2; wv.bands_direction = 'Y'
    nt.links.new(uv.outputs['UV'], wv.inputs['Vector'])
    # vertical grey slats with see-through gaps (plot fence of the published renders)
    ramp = nt.nodes.new('ShaderNodeValToRGB'); ramp.color_ramp.elements[0].position = .62; ramp.color_ramp.elements[0].color = (1, 1, 1, 1)
    ramp.color_ramp.elements[1].position = .66; ramp.color_ramp.elements[1].color = (0, 0, 0, 1)
    nt.links.new(wv.outputs['Fac'], ramp.inputs['Fac']); nt.links.new(ramp.outputs['Color'], p.inputs['Alpha'])
    p.inputs['Base Color'].default_value = (*srgb('#9da1a3'), 1)
    p.inputs['Metallic'].default_value = .5; p.inputs['Roughness'].default_value = .45
    return m


def water_mat():
    m, nt, p = node_mat('water')
    p.inputs['Base Color'].default_value = (*srgb('#2f9fc0'), 1); p.inputs['Roughness'].default_value = .02; p.inputs['IOR'].default_value = 1.33
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = 3; n.inputs['Detail'].default_value = 4
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .12
    nt.links.new(n.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    return m


def leaf_mat(name, cols):
    m, nt, p = node_mat(name)
    oi = nt.nodes.new('ShaderNodeObjectInfo'); ramp = nt.nodes.new('ShaderNodeValToRGB')
    ramp.color_ramp.elements[0].color = (*srgb(cols[0]), 1); ramp.color_ramp.elements[1].color = (*srgb(cols[1]), 1)
    nt.links.new(oi.outputs['Random'], ramp.inputs['Fac']); nt.links.new(ramp.outputs['Color'], p.inputs['Base Color'])
    p.inputs['Roughness'].default_value = .55; p.inputs['Subsurface Weight'].default_value = .0
    # thin translucent leaf: mix in a translucent lobe
    tr = nt.nodes.new('ShaderNodeBsdfTranslucent'); nt.links.new(ramp.outputs['Color'], tr.inputs['Color'])
    mix = nt.nodes.new('ShaderNodeMixShader'); mix.inputs['Fac'].default_value = .38
    out = nt.nodes['Material Output']
    nt.links.new(p.outputs['BSDF'], mix.inputs[1]); nt.links.new(tr.outputs['BSDF'], mix.inputs[2]); nt.links.new(mix.outputs['Shader'], out.inputs['Surface'])
    return m


def window_wall_mat(name, wall, glass, bw=3.1, rh=3.3):
    """generic residential façade for neighbouring blocks: wall with a regular grid of dark glazed openings"""
    m, nt, p = node_mat(name)
    uv = nt.nodes.new('ShaderNodeTexCoord'); sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(uv.outputs['UV'], sep.inputs['Vector'])
    def band(out, period, lo, hi):
        dv = nt.nodes.new('ShaderNodeMath'); dv.operation = 'DIVIDE'; dv.inputs[1].default_value = period; nt.links.new(out, dv.inputs[0])
        fr = nt.nodes.new('ShaderNodeMath'); fr.operation = 'FRACT'; nt.links.new(dv.outputs[0], fr.inputs[0])
        a = nt.nodes.new('ShaderNodeMath'); a.operation = 'GREATER_THAN'; a.inputs[1].default_value = lo; nt.links.new(fr.outputs[0], a.inputs[0])
        b = nt.nodes.new('ShaderNodeMath'); b.operation = 'LESS_THAN'; b.inputs[1].default_value = hi; nt.links.new(fr.outputs[0], b.inputs[0])
        mm = nt.nodes.new('ShaderNodeMath'); mm.operation = 'MULTIPLY'; nt.links.new(a.outputs[0], mm.inputs[0]); nt.links.new(b.outputs[0], mm.inputs[1])
        return mm.outputs[0]
    w = nt.nodes.new('ShaderNodeMath'); w.operation = 'MULTIPLY'
    nt.links.new(band(sep.outputs['X'], bw, .28, .72), w.inputs[0]); nt.links.new(band(sep.outputs['Y'], rh, .32, .78), w.inputs[1])
    mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'
    mix.inputs['A'].default_value = (*srgb(wall), 1); mix.inputs['B'].default_value = (*srgb(glass), 1)
    nt.links.new(w.outputs[0], mix.inputs['Factor']); nt.links.new(mix.outputs['Result'], p.inputs['Base Color'])
    mr = nt.nodes.new('ShaderNodeMapRange'); mr.inputs['To Min'].default_value = .85; mr.inputs['To Max'].default_value = .08
    nt.links.new(w.outputs[0], mr.inputs['Value']); nt.links.new(mr.outputs['Result'], p.inputs['Roughness'])
    if DUSK:
        cells = []
        for axis, per in (('X', bw), ('Y', rh)):
            dv = nt.nodes.new('ShaderNodeMath'); dv.operation = 'DIVIDE'; dv.inputs[1].default_value = per; nt.links.new(sep.outputs[axis], dv.inputs[0])
            fl = nt.nodes.new('ShaderNodeMath'); fl.operation = 'FLOOR'; nt.links.new(dv.outputs[0], fl.inputs[0]); cells.append(fl.outputs[0])
        cb = nt.nodes.new('ShaderNodeCombineXYZ'); nt.links.new(cells[0], cb.inputs['X']); nt.links.new(cells[1], cb.inputs['Y'])
        oi = nt.nodes.new('ShaderNodeObjectInfo'); nt.links.new(oi.outputs['Random'], cb.inputs['Z'])
        wn = nt.nodes.new('ShaderNodeTexWhiteNoise'); wn.noise_dimensions = '3D'; nt.links.new(cb.outputs['Vector'], wn.inputs['Vector'])
        gt = nt.nodes.new('ShaderNodeMath'); gt.operation = 'GREATER_THAN'; gt.inputs[1].default_value = .7; nt.links.new(wn.outputs['Value'], gt.inputs[0])
        lit = nt.nodes.new('ShaderNodeMath'); lit.operation = 'MULTIPLY'; nt.links.new(gt.outputs[0], lit.inputs[0]); nt.links.new(w.outputs[0], lit.inputs[1])
        k = nt.nodes.new('ShaderNodeMath'); k.operation = 'MULTIPLY'; k.inputs[1].default_value = 5.0; nt.links.new(lit.outputs[0], k.inputs[0])
        nt.links.new(k.outputs[0], p.inputs['Emission Strength']); p.inputs['Emission Color'].default_value = (1.0, .66, .36, 1)
    return m


MATS = {
    'plaster': plain('plaster', srgb('#f2f0eb'), .88, bump=.04, bump_scale=60),
    'cap': plain('cap', srgb('#f6f5f2'), .8),
    'cladSide': plain('cladSide', srgb('#9f9d97'), .55, spec=.6),
    'roof': plain('roof', srgb('#c3c5c2'), .92, bump=.15, bump_scale=25),
    'paving': paving_mat('paving', srgb('#d9d3c8'), srgb('#cfc8bb'), .6),
    'fenceWall': plain('fenceWall', srgb('#eeece7'), .85, bump=.03, bump_scale=50),
    'slats': slats_mat(), 'water': water_mat(),
    'poolEdge': plain('poolEdge', srgb('#ebe6dc'), .7, bump=.05),
    'poolWall': plain('poolWall', srgb('#7fc2d4'), .3),
    'lampHead': plain('lampHead', srgb('#f6f1e4'), .4),
    'grass': plain('grass', srgb('#5f8d34'), .9, bump=.4, bump_scale=300), 'lounger': plain('lounger', srgb('#f2f0eb'), .5),
    'ramp': plain('ramp', srgb('#6f7173'), .8, bump=.15, bump_scale=40), 'tunnel': plain('tunnel', srgb('#141516'), .9),
    'planter': plain('planter', srgb('#ece9e2'), .8),
    'trunk': plain('trunk', srgb('#5a4a3b'), .9, bump=.2, bump_scale=15),
    'leaf1': leaf_mat('leaf1', ('#56762a', '#93ad45')), 'leaf2': leaf_mat('leaf2', ('#62802f', '#a6b851')),
    'shrub': leaf_mat('shrub', ('#4a5a2a', '#7a8740')),
    'nbWall': window_wall_mat('nbWall', '#ebe7df', '#3a4248'), 'nbWall2': window_wall_mat('nbWall2', '#e2ddd2', '#40464a', 3.4, 3.2),
    'nbPlain': plain('nbPlain', srgb('#d4d6d6'), .6, spec=.6), 'nbRoof': plain('nbRoof', srgb('#bdbfbc'), .9),
    'metal': plain('metal', srgb('#55595c'), .4, metal=.8), 'lamp': plain('lamp', srgb('#f4f2ea'), .3),
    'tyre': plain('tyre', srgb('#151515'), .7), 'carGlass': plain('carGlass', srgb('#0d1013'), .05, spec=1),
}
def render_mat():
    """white monocapa render: off-white, fine stucco relief, faint large-scale variation"""
    m, nt, p = node_mat('fac_render')
    tc = nt.nodes.new('ShaderNodeTexCoord')
    n1 = nt.nodes.new('ShaderNodeTexNoise'); n1.inputs['Scale'].default_value = 140; n1.inputs['Detail'].default_value = 6
    n2 = nt.nodes.new('ShaderNodeTexNoise'); n2.inputs['Scale'].default_value = .35; n2.inputs['Detail'].default_value = 2
    nt.links.new(tc.outputs['Object'], n1.inputs['Vector']); nt.links.new(tc.outputs['Object'], n2.inputs['Vector'])
    ramp = nt.nodes.new('ShaderNodeValToRGB'); ramp.color_ramp.elements[0].color = (*srgb('#ecebe6'), 1); ramp.color_ramp.elements[1].color = (*srgb('#f7f6f2'), 1)
    nt.links.new(n2.outputs['Fac'], ramp.inputs['Fac']); nt.links.new(ramp.outputs['Color'], p.inputs['Base Color'])
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .06; bm.inputs['Distance'].default_value = .004
    nt.links.new(n1.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    p.inputs['Roughness'].default_value = .9
    return m


def thin_glass(name, tint=(.86, .9, .9), rough=.0, frost=0., body=None, refl=.07):
    """architectural glass as a thin sheet: Fresnel reflection over straight transmission (no refraction offset);
    frosted railings add a translucent lobe"""
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree
    for nd in list(nt.nodes):
        if nd.type != 'OUTPUT_MATERIAL': nt.nodes.remove(nd)
    out = nt.nodes['Material Output']
    tr = nt.nodes.new('ShaderNodeBsdfTransparent'); tr.inputs['Color'].default_value = (*tint, 1)
    gl = nt.nodes.new('ShaderNodeBsdfGlossy'); gl.inputs['Roughness'].default_value = rough
    fr = nt.nodes.new('ShaderNodeFresnel'); fr.inputs['IOR'].default_value = 1.52
    lift = nt.nodes.new('ShaderNodeMapRange'); lift.inputs['To Min'].default_value = refl; lift.inputs['To Max'].default_value = 1.0   # coated glazing: ≥ refl reflectance
    nt.links.new(fr.outputs['Fac'], lift.inputs['Value'])
    mix = nt.nodes.new('ShaderNodeMixShader'); nt.links.new(lift.outputs['Result'], mix.inputs['Fac'])
    base = tr
    if frost:
        tl = nt.nodes.new('ShaderNodeBsdfTranslucent'); tl.inputs['Color'].default_value = (*(body or tint), 1)
        df = nt.nodes.new('ShaderNodeBsdfDiffuse'); df.inputs['Color'].default_value = (*(body or tint), 1)
        m1 = nt.nodes.new('ShaderNodeMixShader'); m1.inputs['Fac'].default_value = frost
        m2 = nt.nodes.new('ShaderNodeMixShader'); m2.inputs['Fac'].default_value = .5
        nt.links.new(tl.outputs['BSDF'], m2.inputs[1]); nt.links.new(df.outputs['BSDF'], m2.inputs[2])
        nt.links.new(tr.outputs['BSDF'], m1.inputs[1]); nt.links.new(m2.outputs['Shader'], m1.inputs[2]); base = m1
    nt.links.new(base.outputs[0], mix.inputs[1]); nt.links.new(gl.outputs['BSDF'], mix.inputs[2])
    nt.links.new(mix.outputs['Shader'], out.inputs['Surface'])
    return m


def interior(name, col, lit=False):
    m = plain(name, srgb(col), .85)
    if lit:
        p = m.node_tree.nodes['Principled BSDF']; p.inputs['Emission Color'].default_value = (1.0, .72, .45, 1); p.inputs['Emission Strength'].default_value = 2.2
    return m


def brick_mat():
    m, nt, p = node_mat('fac_brick')
    tc = nt.nodes.new('ShaderNodeTexCoord'); br = nt.nodes.new('ShaderNodeTexBrick'); br.offset = .5
    br.inputs['Color1'].default_value = (*srgb('#f3f1ec'), 1); br.inputs['Color2'].default_value = (*srgb('#e8e5de'), 1)
    br.inputs['Mortar'].default_value = (*srgb('#d6d3cc'), 1); br.inputs['Scale'].default_value = 1
    br.inputs['Mortar Size'].default_value = .008; br.inputs['Brick Width'].default_value = .25; br.inputs['Row Height'].default_value = .065
    br.inputs['Bias'].default_value = 0
    nt.links.new(tc.outputs['UV'], br.inputs['Vector']); nt.links.new(br.outputs['Color'], p.inputs['Base Color'])
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .35; bm.inputs['Distance'].default_value = .003; bm.invert = True
    nt.links.new(br.outputs['Fac'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    p.inputs['Roughness'].default_value = .82
    return m


MATS.update({
    'fac_brick': brick_mat(),
    'fac_render': render_mat(),
    'fac_frame': plain('fac_frame', srgb('#e8e9e7'), .32, metal=.35),
    'fac_glass': thin_glass('fac_glass', (.80, .86, .87), .02),
    'fac_sill': plain('fac_sill', srgb('#e4ded2'), .55, bump=.05, bump_scale=60),
    'fac_room': interior('fac_room', '#d2c9bb'), 'fac_roomFloor': plain('fac_roomFloor', srgb('#8f6d4c'), .45),
    'fac_roomLit': interior('fac_roomLit', '#efe4d2', lit=DUSK),
    'fac_slabEdge': plain('fac_slabEdge', srgb('#8d9193'), .5, spec=.55),
    'fac_railGlass': thin_glass('fac_railGlass', (.84, .9, .89), .18, frost=.74, body=(.80, .87, .86), refl=.1),
    'fac_railCap': plain('fac_railCap', srgb('#b8bcbf'), .3, metal=.9),
    'glassFence': thin_glass('glassFence', (.9, .95, .95), .02, refl=.08),
})
if ASSETS:
    for k, args in {'fac_render': ('white_stucco_02', 2.0), 'roof': ('concrete_floor_02', 3.0), 'paving': ('precast_stone_paving', 2.4),
                    'ramp': ('asphalt_02', 2.5), 'grass': ('leafy_grass', 1.6), 'poolEdge': ('precast_stone_paving', 1.6),
                    'fenceWall': ('white_stucco_02', 2.0), 'planter': ('white_stucco_02', 1.5)}.items():
        m = assets.pbr(k + '_scan', *args)
        if m: MATS[k] = m
for k, f in list(ex['faces'].items()) + list(ex['ends'].items()):
    MATS['tex_' + k] = facade_mat('tex_' + k, os.path.join(tex_dir, f['texture']['file']))


# ------------------------------------------------------------------------------------------- geometry
def mesh_from_bucket(name, bk, mat):
    p, n, u, idx = bk['p'], bk['n'], bk['u'], bk['i']
    me = bpy.data.meshes.new(name)
    verts = [tuple(B(p[i], p[i + 1], p[i + 2])) for i in range(0, len(p), 3)]
    faces = [tuple(idx[i:i + 3]) for i in range(0, len(idx), 3)]
    me.from_pydata(verts, [], faces)
    uvl = me.uv_layers.new(name='UVMap')
    for poly in me.polygons:
        for li in poly.loop_indices:
            vi = me.loops[li].vertex_index; uvl.data[li].uv = (u[vi * 2], u[vi * 2 + 1])
    me.materials.append(mat); me.validate(); me.update()
    for poly in me.polygons: poly.use_smooth = False
    ob = bpy.data.objects.new(name, me); sc.collection.objects.link(ob)
    return ob


for k, bk in data['building'].items():
    if k.startswith('tex_') and OPENINGS: continue                        # rebuilt below as real geometry
    if k == 'roof' and OPENINGS: continue                                  # rebuilt below without the ático terraces
    mesh_from_bucket('bld_' + k, bk, MATS.get(k, MATS['plaster']))
if OPENINGS:
    _obs, n_open = facade_geo.build(data, ex, OPENINGS, MATS, sc.collection, dusk=DUSK)
    print('facade openings built', n_open, flush=True)
for k, bk in data['site'].items():
    if k in ('pavement', 'street', 'lineWhite', 'lawn'): continue      # replaced by the OSM ground
    mesh_from_bucket('site_' + k, bk, MATS.get(k, MATS['plaster']))


def box(name, x0, x1, y0, y1, z0, z1, mat, coll=None):
    bm = bmesh.new()
    vs = [bm.verts.new(B(x, y, z)) for y in (y0, y1) for (x, z) in ((x0, z0), (x1, z0), (x1, z1), (x0, z1))]
    for f in ((0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)): bm.faces.new([vs[i] for i in f])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); me.materials.append(mat)
    ob = bpy.data.objects.new(name, me); (coll or sc.collection).objects.link(ob); return ob


# pool, solarium, glass fence and garage ramp come from the web site geometry (buildSite in src/explorer.js)
if OPENINGS:
    # ático terraces at both ends (open to the sky inside the white frame), z from ±27,9 m to the end walls
    ry, half, D5 = ex['levels']['roof'] + .35, ex['length'] / 2, ex['levels']['5']
    TZ = 27.9
    box('roof_main', 0, ex['depth'], ry - .05, ry, -TZ, TZ, MATS['roof'])
    for sgn in (1, -1):
        za, zb = sorted((sgn * TZ, sgn * (half - .3)))
        box('terrace_floor', .3, ex['depth'] - .3, D5 - .08, D5 + .02, za, zb, MATS['paving'])
        box('terrace_wall', .3, ex['depth'] - .3, D5, ry, *sorted((sgn * TZ, sgn * (TZ - .15))), MATS['fac_render'])
        for x0 in (3.0, 11.5):                                            # glazed doors onto the terrace
            box('terrace_door', x0, x0 + 2.4, D5 + .02, D5 + 2.3, sgn * TZ + sgn * .16, sgn * TZ + sgn * .17, MATS['fac_glass'])
            box('terrace_doorframe', x0 - .05, x0 + 2.45, D5 + 2.3, D5 + 2.36, sgn * TZ + sgn * .15, sgn * TZ + sgn * .2, MATS['fac_frame'])
        for x0 in (1.2, 16.3):                                            # planters with shrubs (as in render 01)
            box('planter', x0, x0 + 2.4, D5, D5 + .55, sgn * (TZ + 2.5), sgn * (TZ + 3.3), MATS['fac_render'])


# ground: OSM raster under everything, a wide meadow beyond it
x0, x1, z0, z1 = ctx['extent']
def ground_mat():
    m, nt, p = node_mat('ground')
    def img(f, cs):
        i = bpy.data.images.load(os.path.join(ctx_dir, f)); i.colorspace_settings.name = cs
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = i; t.extension = 'EXTEND'; return t
    a, r, h = img('ground_albedo.jpg', 'sRGB'), img('ground_rough.png', 'Non-Color'), img('ground_height.png', 'Non-Color')
    nt.links.new(a.outputs['Color'], p.inputs['Base Color']); nt.links.new(r.outputs['Color'], p.inputs['Roughness'])
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = 6; n.inputs['Detail'].default_value = 12
    tc = nt.nodes.new('ShaderNodeTexCoord'); nt.links.new(tc.outputs['Object'], n.inputs['Vector'])
    mx = nt.nodes.new('ShaderNodeMath'); mx.operation = 'MULTIPLY_ADD'; mx.inputs[1].default_value = .06
    nt.links.new(n.outputs['Fac'], mx.inputs[0]); nt.links.new(h.outputs['Color'], mx.inputs[2])
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .8; bm.inputs['Distance'].default_value = .25
    nt.links.new(mx.outputs['Value'], bm.inputs['Height']); nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    return m
def ground_mat_scan():
    """OSM classes (ground_class.png) → scanned asphalt, paving, stone, grass; the raster albedo keeps the large-scale variation"""
    m, nt, p = node_mat('ground_scan')
    cls = bpy.data.images.load(os.path.join(ctx_dir, 'ground_class.png')); cls.colorspace_settings.name = 'Non-Color'
    tc = nt.nodes.new('ShaderNodeTexCoord')
    ci = nt.nodes.new('ShaderNodeTexImage'); ci.image = cls; ci.interpolation = 'Closest'; ci.extension = 'EXTEND'
    alb = nt.nodes.new('ShaderNodeTexImage'); alb.image = bpy.data.images.load(os.path.join(ctx_dir, 'ground_albedo.jpg')); alb.extension = 'EXTEND'
    hgt = nt.nodes.new('ShaderNodeTexImage'); hgt.image = bpy.data.images.load(os.path.join(ctx_dir, 'ground_height.png')); hgt.image.colorspace_settings.name = 'Non-Color'
    cv = nt.nodes.new('ShaderNodeMath'); cv.operation = 'MULTIPLY'; cv.inputs[1].default_value = 255; nt.links.new(ci.outputs['Color'], cv.inputs[0])
    K = ctx['classes']
    def mask(*names):
        acc = None
        for nm in names:
            c1 = nt.nodes.new('ShaderNodeMath'); c1.operation = 'COMPARE'; c1.inputs[1].default_value = K[nm]; c1.inputs[2].default_value = .5
            nt.links.new(cv.outputs[0], c1.inputs[0])
            if acc is None: acc = c1.outputs[0]
            else: ad = nt.nodes.new('ShaderNodeMath'); ad.operation = 'ADD'; nt.links.new(acc, ad.inputs[0]); nt.links.new(c1.outputs[0], ad.inputs[1]); acc = ad.outputs[0]
        return acc
    layers = [(('meadow', 'soil', 'track'), 'aerial_grass_rock', 7.0, (.72, 1.0, .55)), (('lawn',), 'leafy_grass', 2.2, None), (('asphalt',), 'aerial_asphalt_01', 6.0, None),
              (('cycle',), 'aerial_asphalt_01', 6.0, (1.0, .45, .38)), (('paving',), 'rectangular_paving', 2.4, None), (('promenade', 'plot'), 'precast_stone_paving', 2.6, (1.0, .93, .88))]
    col = alb.outputs['Color']; rough = None; nrm = None
    for names, tex, size, tint in layers:
        if not assets.have('textures', tex): continue
        f = mask(*names)                         # big surfaces (meadows, lawns, roads) are de-tiled
        t = assets.detile(nt, tex, size) if tex in ('aerial_grass_rock', 'leafy_grass', 'aerial_asphalt_01') else assets.sockets(assets.tex_nodes(nt, tex, size, 'Object'))
        c = t['color']
        if tint:
            mt = nt.nodes.new('ShaderNodeMix'); mt.data_type = 'RGBA'; mt.blend_type = 'MULTIPLY'; mt.inputs['Factor'].default_value = 1; mt.inputs['B'].default_value = (*tint, 1)
            nt.links.new(c, mt.inputs['A']); c = mt.outputs['Result']
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; nt.links.new(f, mx.inputs['Factor']); nt.links.new(col, mx.inputs['A']); nt.links.new(c, mx.inputs['B']); col = mx.outputs['Result']
        if 'rough' in t:
            mr = nt.nodes.new('ShaderNodeMix'); mr.data_type = 'FLOAT'; nt.links.new(f, mr.inputs['Factor'])
            if rough is None: mr.inputs['A'].default_value = .9
            else: nt.links.new(rough, mr.inputs['A'])
            nt.links.new(t['rough'], mr.inputs['B']); rough = mr.outputs['Result']
        if 'normal' in t:
            mn = nt.nodes.new('ShaderNodeMix'); mn.data_type = 'VECTOR'; nt.links.new(f, mn.inputs['Factor'])
            if nrm is None:
                gn = nt.nodes.new('ShaderNodeNewGeometry'); nt.links.new(gn.outputs['Normal'], mn.inputs['A'])
            else: nt.links.new(nrm, mn.inputs['A'])
            nt.links.new(t['normal'], mn.inputs['B']); nrm = mn.outputs['Result']
    # lane and parking markings stay painted white
    mk = mask('mark'); mw = nt.nodes.new('ShaderNodeMix'); mw.data_type = 'RGBA'; mw.inputs['B'].default_value = (.85, .85, .83, 1)
    nt.links.new(mk, mw.inputs['Factor']); nt.links.new(col, mw.inputs['A']); col = mw.outputs['Result']
    nt.links.new(col, p.inputs['Base Color'])
    if rough is not None: nt.links.new(rough, p.inputs['Roughness'])
    bm = nt.nodes.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = .8; bm.inputs['Distance'].default_value = .25
    nt.links.new(hgt.outputs['Color'], bm.inputs['Height'])
    if nrm is not None: nt.links.new(nrm, bm.inputs['Normal'])
    nt.links.new(bm.outputs['Normal'], p.inputs['Normal'])
    return m


me = bpy.data.meshes.new('ground')
me.from_pydata([tuple(B(x0, -.3, z0)), tuple(B(x1, -.3, z0)), tuple(B(x1, -.3, z1)), tuple(B(x0, -.3, z1))], [], [(0, 1, 2, 3)])
uvl = me.uv_layers.new(name='UVMap')
for li, (u, v) in zip(me.polygons[0].loop_indices, ((0, 1), (1, 1), (1, 0), (0, 0))): uvl.data[li].uv = (u, v)
me.materials.append(ground_mat_scan() if ASSETS and os.path.exists(os.path.join(ctx_dir, 'ground_class.png')) else ground_mat()); ob = bpy.data.objects.new('ground', me); sc.collection.objects.link(ob)
far = plain('far', srgb('#7f7a52'), .95, bump=.2, bump_scale=.05)
me = bpy.data.meshes.new('farground'); R = 4000
me.from_pydata([tuple(B(-R, -.34, -R)), tuple(B(R, -.34, -R)), tuple(B(R, -.34, R)), tuple(B(-R, -.34, R))], [], [(0, 1, 2, 3)])
me.materials.append(far); sc.collection.objects.link(bpy.data.objects.new('farground', me))

# neighbouring buildings: OSM footprints extruded, façades with a regular opening grid
for k, bd in enumerate(ctx['buildings']):
    pts = bd['pts']; h = bd['height'] - .3
    if len(pts) < 3: continue
    area = sum(pts[i][0] * pts[i - 1][1] - pts[i - 1][0] * pts[i][1] for i in range(len(pts))) / 2
    if area > 0: pts = pts[::-1]
    bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap')
    lo = [bm.verts.new(B(x, -.3, z)) for x, z in pts]; hi = [bm.verts.new(B(x, h, z)) for x, z in pts]
    s = 0.
    for i in range(len(pts)):
        j = (i + 1) % len(pts); L = math.dist(pts[i], pts[j])
        f = bm.faces.new((lo[i], lo[j], hi[j], hi[i]))
        for loop, uv in zip(f.loops, ((s, 0), (s + L, 0), (s + L, h), (s, h))): loop[uvl].uv = uv
        f.material_index = 0; s += L
    try:
        top = bm.faces.new(hi); top.material_index = 1
    except ValueError: pass
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new('nb%d' % k); bm.to_mesh(me); bm.free()
    wall = MATS['nbPlain'] if bd['kind'] in ('commercial', 'retail', 'industrial', 'university') else MATS['nbWall' if k % 2 else 'nbWall2']
    me.materials.append(wall); me.materials.append(MATS['nbRoof'])
    sc.collection.objects.link(bpy.data.objects.new('nb%d' % k, me))


# distant horizon: low blocks and tree clumps 0,5–2 km out (generic; the OSM extract covers ~250 m)
hz = random.Random(3)
for k in range(260):
    a = hz.uniform(0, 2 * math.pi); r = hz.uniform(520, 2000); cx_, cz_ = 10 + r * math.cos(a), r * math.sin(a)
    w_, d_, h_ = hz.uniform(14, 45), hz.uniform(12, 30), hz.choice([7, 10, 13, 16, 19, 22, 28])
    o = box('hz%d' % k, cx_ - w_ / 2, cx_ + w_ / 2, -.3, h_, cz_ - d_ / 2, cz_ + d_ / 2, MATS['nbWall' if k % 2 else 'nbWall2'])
    o.rotation_euler = (0, 0, hz.uniform(0, math.pi)); o.data.materials.append(MATS['nbRoof'])
# ------------------------------------------------------------------------------------------- trees, shrubs
protos = bpy.data.collections.new('protos'); sc.collection.children.link(protos)
leaf_me = bpy.data.meshes.new('leaf')
leaf_me.from_pydata([(0, -.05, 0), (.09, 0, 0), (0, .05, 0), (-.09, 0, 0)], [], [(0, 1, 2, 3)])
def leafob(mat):
    me = leaf_me.copy(); me.materials.append(mat)
    o = bpy.data.objects.new('leaf_' + mat.name, me); protos.objects.link(o); return o
LEAF = {k: leafob(MATS[k]) for k in ('leaf1', 'leaf2', 'shrub')}


def tree_proto(name, trunk_h, crown_r, crown_s, count, leaf):
    coll = bpy.data.collections.new(name)
    bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=.16, radius2=.08, depth=trunk_h + crown_r * .6, location=(0, 0, (trunk_h + crown_r * .6) / 2))
    t = bpy.context.object; t.data.materials.append(MATS['trunk'])
    # crown: 5–7 overlapping lobes in an ellipsoid (irregular outline like the trees of the published renders)
    bm = bmesh.new(); rr = random.Random(hash(name) & 0xffff)
    cz = trunk_h + crown_r * crown_s[2] * .85
    for k in range(rr.randint(5, 7)):
        a = rr.uniform(0, 6.283); rad = crown_r * rr.uniform(.25, .55)
        off = Vector((math.cos(a) * rad * crown_s[0], math.sin(a) * rad * crown_s[1], rr.uniform(-.35, .45) * crown_r * crown_s[2]))
        r_ = crown_r * rr.uniform(.5, .72)
        bmesh.ops.create_icosphere(bm, subdivisions=2, radius=r_, matrix=Matrix.Translation(off + Vector((0, 0, cz))))
    me = bpy.data.meshes.new(name + '_crown'); bm.to_mesh(me); bm.free()
    c = bpy.data.objects.new(name + '_crown', me); bpy.context.collection.objects.link(c)
    for k in range(3):                                                    # main branches into the crown
        a = k * 2.1 + .4
        bpy.ops.mesh.primitive_cone_add(vertices=6, radius1=.07, radius2=.03, depth=crown_r * .7,
                                        location=(math.cos(a) * crown_r * .15, math.sin(a) * crown_r * .15, trunk_h + crown_r * .3),
                                        rotation=(math.sin(a) * .6, -math.cos(a) * .6, 0))
        br = bpy.context.object; br.data.materials.append(MATS['trunk'])
        for cc in br.users_collection: cc.objects.unlink(br)
        coll.objects.link(br)
    for o in (t, c):
        for cc in o.users_collection: cc.objects.unlink(o)
        coll.objects.link(o)
    c.modifiers.new('leaves', 'PARTICLE_SYSTEM'); st = c.particle_systems[0].settings
    st.type = 'HAIR'; st.use_advanced_hair = True; st.count = int(count * .9); st.emit_from = 'FACE'; st.distribution = 'RAND'
    st.render_type = 'OBJECT'; st.instance_object = leaf; st.particle_size = 1.7; st.size_random = .5
    st.use_rotations = True; st.rotation_mode = 'NONE'; st.rotation_factor_random = 1.0; st.phase_factor_random = 2.0
    c.show_instancer_for_render = False; c.show_instancer_for_viewport = False
    return coll


TREES = [tree_proto('treeA', 2.4, 1.9, (1, 1, 1.15), 5200, LEAF['leaf1']), tree_proto('treeB', 2.8, 2.3, (1.1, 1, .9), 6400, LEAF['leaf2']),
         tree_proto('treeC', 2.0, 1.5, (.9, .9, 1.3), 3800, LEAF['leaf1'])]
SHRUB = tree_proto('shrub', .05, .9, (1.3, 1.1, .7), 900, LEAF['shrub'])
# distant trees: same silhouette, solid crown (no leaf instances; they are a few pixels wide)
FAR_TREE = bpy.data.collections.new('farTree')
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=2.0, location=(0, 0, 4.2)); o = bpy.context.object; o.scale = (1, 1, 1.1)
o.data.materials.append(MATS['leaf1'])
d_ = o.modifiers.new('d', 'DISPLACE'); tx = bpy.data.textures.new('clouds', 'CLOUDS'); tx.noise_scale = .6; d_.texture = tx; d_.strength = .6
for cc in o.users_collection: cc.objects.unlink(o)
FAR_TREE.objects.link(o)
for c in TREES + [SHRUB, FAR_TREE]: protos.children.link(c)
TREE_SCALE = [1.0, 1.0, 1.0]; SHRUB_SCALE = 1.0
if ASSETS:                                     # (collection, scale to a 6–7 m street tree)
    scanned = [(n, s) for n, s in (('island_tree_01', 1.3), ('tree_small_02', 1.4), ('island_tree_02', 1.85), ('jacaranda_tree', .38)) if assets.have('models', n)]
    if scanned:
        TREES = [assets.model(n, protos)[0] for n, s in scanned]; TREE_SCALE = [s for n, s in scanned]
    if assets.have('models', 'shrub_02'): SHRUB = assets.model('shrub_02', protos)[0]; SHRUB_SCALE = .32
protos.hide_render = False
layer_coll = bpy.context.view_layer.layer_collection.children['protos']; layer_coll.exclude = True


def instance(coll, x, z, s, rot, name='inst'):
    e = bpy.data.objects.new(name, None); e.instance_type = 'COLLECTION'; e.instance_collection = coll
    e.location = B(x, -.3, z); e.scale = (s, s, s); e.rotation_euler = (0, 0, rot); sc.collection.objects.link(e)
    return e


trees = [(x, z) for x, z, k in ctx['trees']] + [(x, z) for x, z in data['trees'] if x < 0]
for i, (x, z) in enumerate(trees):
    k = (i * 7 + int(abs(x) * 3)) % len(TREES) if len(TREES) > 3 and i % 9 else i % min(3, len(TREES))   # jacarandas now and then
    instance(TREES[k], x, z, random.uniform(.85, 1.15) * TREE_SCALE[k], random.uniform(0, 6.28), 'tree')
for k in range(700):
    a = hz.uniform(0, 2 * math.pi); r = hz.uniform(300, 1300)
    instance(FAR_TREE, 10 + r * math.cos(a), r * math.sin(a), hz.uniform(1.0, 1.8), hz.uniform(0, 6.28), 'fartree')
for x, z in ctx['shrubs']:
    instance(SHRUB, x, z, random.uniform(.6, 1.5) * SHRUB_SCALE, random.uniform(0, 6.28), 'shrub')
if OPENINGS:                                           # greenery in the ático terrace planters, warm lights at dusk
    D5 = ex['levels']['5']
    for sgn in (1, -1):
        for x0 in (1.2, 16.3):
            for dx in (.5, 1.4):
                e = instance(SHRUB, x0 + dx, sgn * 30.3, random.uniform(.45, .65), random.uniform(0, 6.28), 'terrace_shrub'); e.location.z = D5 + .55
        if DUSK:
            tl = bpy.data.lights.new('terrace', 'POINT'); tl.energy = 120; tl.color = (1.0, .72, .45); tl.shadow_soft_size = .3
            for x in (5, 15):
                o = bpy.data.objects.new('terrace_light', tl); o.location = B(x, D5 + 2.4, sgn * 28.4); sc.collection.objects.link(o)


# ------------------------------------------------------------------------------------------- cars, lamps
cars = bpy.data.collections.new('cars'); sc.collection.children.link(cars)
bpy.context.view_layer.layer_collection.children['cars'].exclude = True
def car_proto(i, color):
    coll = bpy.data.collections.new('car%d' % i); cars.children.link(coll)
    paint = plain('paint%d' % i, srgb(color), .35, metal=.4, coat=1.)
    def rbox(sx, sy, sz, loc, mat, bev):
        bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.scale = (sx, sy, sz)
        bpy.ops.object.transform_apply(scale=True)
        m = o.modifiers.new('b', 'BEVEL'); m.width = bev; m.segments = 3
        o.data.materials.append(mat)
        for cc in o.users_collection: cc.objects.unlink(o)
        coll.objects.link(o); return o
    rbox(4.35, 1.78, .62, (0, 0, .62), paint, .22)
    rbox(2.3, 1.58, .55, (-.25, 0, 1.15), MATS['carGlass'], .2)
    rbox(2.2, 1.62, .08, (-.25, 0, 1.44), paint, .04)
    for wx in (-1.35, 1.35):
        for wy in (-.78, .78):
            bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=.33, depth=.24, location=(wx, wy, .33), rotation=(math.pi / 2, 0, 0))
            o = bpy.context.object; o.data.materials.append(MATS['tyre'])
            for cc in o.users_collection: cc.objects.unlink(o)
            coll.objects.link(o)
    return coll
CARS = [car_proto(i, c) for i, c in enumerate(['#f2f2f0', '#b9bcbf', '#2a2c30', '#1f3550', '#8c1d1d', '#d9d4c7', '#5d6266', '#f2f2f0'])]
if DUSK:
    pw = MATS['poolWall'].node_tree.nodes['Principled BSDF']; pw.inputs['Emission Color'].default_value = (.35, .8, 1.0, 1); pw.inputs['Emission Strength'].default_value = 2.5
    lh = MATS['lampHead'].node_tree.nodes['Principled BSDF']; lh.inputs['Emission Color'].default_value = (1.0, .78, .52, 1); lh.inputs['Emission Strength'].default_value = 25
lamp = bpy.data.collections.new('lamp'); cars.children.link(lamp)
# modern street lamp as in Bamaire's renders (tall tapered pole, slim arm, flat LED head, dark blue-grey); the scanned
# Poly Haven lamp is a classical lantern, which the published images do not show
MATS['lampPole'] = plain('lampPole', srgb('#2b3a52'), .35, metal=.7)
bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=.09, radius2=.05, depth=7.3, location=(0, 0, 3.65)); o = bpy.context.object; o.data.materials.append(MATS['lampPole'])
for cc in o.users_collection: cc.objects.unlink(o)
lamp.objects.link(o)
bpy.ops.mesh.primitive_cylinder_add(vertices=10, radius=.035, depth=1.0, location=(.45, 0, 7.18), rotation=(0, math.radians(84), 0)); o = bpy.context.object; o.data.materials.append(MATS['lampPole'])
for cc in o.users_collection: cc.objects.unlink(o)
lamp.objects.link(o)
bpy.ops.mesh.primitive_cube_add(size=1, location=(.98, 0, 7.2)); o = bpy.context.object; o.scale = (.62, .24, .07); o.data.materials.append(MATS['lampPole'])
bv = o.modifiers.new('bevel', 'BEVEL'); bv.width = .025; bv.segments = 3
for cc in o.users_collection: cc.objects.unlink(o)
lamp.objects.link(o)
bpy.ops.mesh.primitive_cube_add(size=1, location=(.98, 0, 7.16)); o = bpy.context.object; o.scale = (.52, .18, .01); o.data.materials.append(MATS['lampHead'])
for cc in o.users_collection: cc.objects.unlink(o)
lamp.objects.link(o)
if DUSK:
    ld = bpy.data.lights.new('streetlight', 'POINT'); ld.energy = 900; ld.color = (1.0, .76, .5); ld.shadow_soft_size = .25
    lo_ = bpy.data.objects.new('streetlight', ld); lo_.location = (.98, 0, 6.95); lamp.objects.link(lo_)

rnd = random.Random(5)
for r in ctx['roads']:
    if r['kind'] != 'residential': continue
    pts = r['pts']
    for a, b in zip(pts, pts[1:]):
        L = math.dist(a, b)
        if L < 1: continue
        t = ((b[0] - a[0]) / L, (b[1] - a[1]) / L); n = (-t[1], t[0]); ang = math.atan2(-t[1], t[0])   # blender yaw of the road direction
        for side in (-1, 1):
            off = side * (r['width'] / 2 - 1.12)
            for k in range(int(L // 5.0)):
                u = 2.5 + k * 5.0 + 2.5
                q = (a[0] + t[0] * u + n[0] * off, a[1] + t[1] * u + n[1] * off)
                if abs(q[0] - 10) > 160 or abs(q[1]) > 170 or rnd.random() > .42: continue
                instance(CARS[rnd.randrange(len(CARS))], q[0], q[1], 1.0, ang + (math.pi if rnd.random() < .5 else 0) + rnd.uniform(-.03, .03), 'car')
            for k in range(int(L // 26)):                                       # street lights on the kerb
                u = 13 + k * 26; q = (a[0] + t[0] * u + n[0] * side * (r['width'] / 2 + .6), a[1] + t[1] * u + n[1] * side * (r['width'] / 2 + .6))
                if abs(q[0] - 10) > 170 or abs(q[1]) > 180: continue
                instance(lamp, q[0], q[1], 1.0, ang + (math.pi / 2 if side < 0 else -math.pi / 2), 'lamp')


if DUSK:
    pl = bpy.data.lights.new('patio', 'POINT'); pl.energy = 60; pl.color = (1.0, .72, .45); pl.shadow_soft_size = .1
    for z in range(-33, 34, 6):
        for x in (ex['depth'] + 1.2, -1.2):
            o = bpy.data.objects.new('patio', pl); o.location = B(x, 1.9, z + .5); sc.collection.objects.link(o)

# ------------------------------------------------------------------------------------------- light, world, camera
world = bpy.data.worlds.new('sky'); sc.world = world; world.use_nodes = True
wn = world.node_tree; bg = wn.nodes['Background']
sky = wn.nodes.new('ShaderNodeTexSky'); sky.sky_type = 'NISHITA'; sky.sun_disc = False
sky.sun_elevation = math.radians(SUN['elevation']); sky.altitude = 200; sky.air_density = 1.0; sky.dust_density = .55; sky.ozone_density = 1.4
az = math.radians(SUN['azimuth'])
sd = B(math.cos(az), 0, math.sin(az)); sd.z = 0; sd.normalize()
sky.sun_rotation = math.atan2(sd.y, sd.x) - math.pi / 2
wn.links.new(sky.outputs['Color'], bg.inputs['Color']); bg.inputs['Strength'].default_value = .3
if not DUSK:
    tcw = wn.nodes.new('ShaderNodeTexCoord'); spw = wn.nodes.new('ShaderNodeSeparateXYZ'); wn.links.new(tcw.outputs['Generated'], spw.inputs['Vector'])
    zc = wn.nodes.new('ShaderNodeMath'); zc.operation = 'MAXIMUM'; zc.inputs[1].default_value = .03; wn.links.new(spw.outputs['Z'], zc.inputs[0])
    px_ = wn.nodes.new('ShaderNodeMath'); px_.operation = 'DIVIDE'; wn.links.new(spw.outputs['X'], px_.inputs[0]); wn.links.new(zc.outputs[0], px_.inputs[1])
    py_ = wn.nodes.new('ShaderNodeMath'); py_.operation = 'DIVIDE'; wn.links.new(spw.outputs['Y'], py_.inputs[0]); wn.links.new(zc.outputs[0], py_.inputs[1])
    cmb = wn.nodes.new('ShaderNodeCombineXYZ'); wn.links.new(px_.outputs[0], cmb.inputs['X']); wn.links.new(py_.outputs[0], cmb.inputs['Y'])
    mp = wn.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (.55, 1.6, 1); wn.links.new(cmb.outputs['Vector'], mp.inputs['Vector'])
    nz = wn.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 1.1; nz.inputs['Detail'].default_value = 8; nz.inputs['Roughness'].default_value = .62
    wn.links.new(mp.outputs['Vector'], nz.inputs['Vector'])
    cr_ = wn.nodes.new('ShaderNodeValToRGB'); cr_.color_ramp.elements[0].position = .52; cr_.color_ramp.elements[1].position = .78
    wn.links.new(nz.outputs['Fac'], cr_.inputs['Fac'])
    fade = wn.nodes.new('ShaderNodeMapRange'); fade.inputs['From Min'].default_value = .02; fade.inputs['From Max'].default_value = .25; wn.links.new(spw.outputs['Z'], fade.inputs['Value'])
    cov = wn.nodes.new('ShaderNodeMath'); cov.operation = 'MULTIPLY'; wn.links.new(cr_.outputs['Color'], cov.inputs[0]); wn.links.new(fade.outputs['Result'], cov.inputs[1])
    cov2 = wn.nodes.new('ShaderNodeMath'); cov2.operation = 'MULTIPLY'; cov2.inputs[1].default_value = .75; wn.links.new(cov.outputs[0], cov2.inputs[0])
    bw_ = wn.nodes.new('ShaderNodeRGBToBW'); wn.links.new(sky.outputs['Color'], bw_.inputs['Color'])
    cl = wn.nodes.new('ShaderNodeMath'); cl.operation = 'MULTIPLY'; cl.inputs[1].default_value = 1.9; wn.links.new(bw_.outputs['Val'], cl.inputs[0])
    mxw = wn.nodes.new('ShaderNodeMix'); mxw.data_type = 'RGBA'
    wn.links.new(cov2.outputs[0], mxw.inputs['Factor']); wn.links.new(sky.outputs['Color'], mxw.inputs['A']); wn.links.new(cl.outputs[0], mxw.inputs['B'])
    hs = wn.nodes.new('ShaderNodeHueSaturation'); hs.inputs['Saturation'].default_value = 1.55   # the renders' saturated blue sky
    wn.links.new(mxw.outputs['Result'], hs.inputs['Color'])
    hz_ = wn.nodes.new('ShaderNodeMapRange'); hz_.inputs['From Min'].default_value = 0; hz_.inputs['From Max'].default_value = .16
    hz_.inputs['To Min'].default_value = .75; hz_.inputs['To Max'].default_value = 0; wn.links.new(spw.outputs['Z'], hz_.inputs['Value'])
    hzm = wn.nodes.new('ShaderNodeMix'); hzm.data_type = 'RGBA'; hzm.inputs['B'].default_value = (.58, .70, .86, 1)   # pale blue horizon of the day renders
    pb = wn.nodes.new('ShaderNodeMath'); pb.operation = 'MULTIPLY'; pb.inputs[1].default_value = 1.0; wn.links.new(bw_.outputs['Val'], pb.inputs[0])
    hzc = wn.nodes.new('ShaderNodeMix'); hzc.data_type = 'RGBA'; hzc.blend_type = 'MULTIPLY'; hzc.inputs['Factor'].default_value = 1
    hzc.inputs['A'].default_value = (.58, .70, .86, 1); wn.links.new(pb.outputs[0], hzc.inputs['B'])
    wn.links.new(hz_.outputs['Result'], hzm.inputs['Factor']); wn.links.new(hs.outputs['Color'], hzm.inputs['A']); wn.links.new(hzc.outputs['Result'], hzm.inputs['B'])
    hz2 = wn.nodes.new('ShaderNodeMath'); hz2.operation = 'MULTIPLY'; hz2.inputs[1].default_value = 1.6
    wn.links.new(hzm.outputs['Result'], bg.inputs['Color'])
if DUSK:   # blue hour: deep blue zenith to a soft peach horizon, no direct sun
    tc = wn.nodes.new('ShaderNodeTexCoord'); sp = wn.nodes.new('ShaderNodeSeparateXYZ'); wn.links.new(tc.outputs['Generated'], sp.inputs['Vector'])
    mr = wn.nodes.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = -.02; mr.inputs['From Max'].default_value = .7; wn.links.new(sp.outputs['Z'], mr.inputs['Value'])
    rp = wn.nodes.new('ShaderNodeValToRGB'); cr = rp.color_ramp
    cr.elements[0].position = 0; cr.elements[0].color = (1.0, .55, .33, 1); cr.elements[1].position = 1; cr.elements[1].color = (.02, .06, .2, 1)
    for pos, col in ((.06, (.85, .48, .42, 1)), (.18, (.33, .32, .55, 1)), (.45, (.08, .16, .40, 1))):
        e = cr.elements.new(pos); e.color = col
    wn.links.new(mr.outputs['Result'], rp.inputs['Fac']); wn.links.new(rp.outputs['Color'], bg.inputs['Color']); bg.inputs['Strength'].default_value = .55
el = math.radians(SUN['elevation'])
d = Vector((sd.x * math.cos(el), sd.y * math.cos(el), math.sin(el)))
sun_data = bpy.data.lights.new('sun', 'SUN'); sun_data.energy = 0.0 if DUSK else 3.8; sun_data.angle = math.radians(.6); sun_data.color = (1.0, .93, .84)
sun = bpy.data.objects.new('sun', sun_data); sc.collection.objects.link(sun)
sun.rotation_euler = d.to_track_quat('Z', 'Y').to_euler()
if ASSETS and not DUSK:                          # blue hour keeps the procedural sky (the CC0 dusk skies have the sun above the horizon)
    H = assets.hdri_world('kloofendal_48d_partly_cloudy_puresky', sun_dir=d, strength=1.0, scene=sc)
    if H:
        world = H[0]
        if not DUSK: sun_data.energy = 0.0          # the HDRI's own sun lights the scene

camd = bpy.data.cameras.new('cam'); camd.sensor_fit = 'VERTICAL'; camd.angle_y = math.radians(RING['fovY']); camd.clip_start = 1; camd.clip_end = 5000
cam = bpy.data.objects.new('cam', camd); sc.collection.objects.link(cam); sc.camera = cam
tgt = Vector(RING['target'])
frames = []
for i in range(NFR):
    a = math.radians(RING['start'] + i * RING['step'])
    pos = [tgt.x + RING['radius'] * math.cos(a), RING['height'], tgt.z + RING['radius'] * math.sin(a)]
    frames.append({'i': i, 'angle': round(RING['start'] + i * RING['step'], 3), 'pos': [round(v, 4) for v in pos]})
json.dump({'ring': RING, 'sun': SUN, 'frames': frames, 'res': [RW, RH], 'up': [0, 1, 0],
           'note': 'building frame, metres, y up; vertical FOV; camera looks at ring.target'}, open(os.path.join(out_dir, 'cameras.json'), 'w'), indent=1)

# render settings
sc.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons['cycles'].preferences
try:
    prefs.compute_device_type = 'METAL'; prefs.get_devices()
    for dv in prefs.devices: dv.use = True
    sc.cycles.device = 'GPU'
except Exception as e:
    print('GPU unavailable', e)
sc.cycles.samples = SAMPLES; sc.cycles.use_adaptive_sampling = True; sc.cycles.adaptive_threshold = .02
sc.cycles.use_denoising = True; sc.cycles.denoiser = 'OPENIMAGEDENOISE'
sc.cycles.max_bounces = 6; sc.cycles.diffuse_bounces = 3; sc.cycles.glossy_bounces = 3; sc.cycles.transmission_bounces = 4
sc.cycles.caustics_reflective = False; sc.cycles.caustics_refractive = False; sc.cycles.blur_glossy = 1.0
sc.render.use_persistent_data = True
sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = RW, RH, 100
sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast' if DUSK else 'AgX - Punchy'; sc.view_settings.exposure = .8 if DUSK else (-.2 + (.95 if ASSETS else 0))
sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGB'; sc.render.image_settings.color_depth = '8'
# light aerial haze from the mist pass (distance only, no volume cost)
vl = bpy.context.view_layer; vl.use_pass_mist = True
world.mist_settings.start = 220; world.mist_settings.depth = 1400; world.mist_settings.falloff = 'QUADRATIC'
sc.use_nodes = True; ct = sc.node_tree
for nd in list(ct.nodes): ct.nodes.remove(nd)
rl = ct.nodes.new('CompositorNodeRLayers'); comp = ct.nodes.new('CompositorNodeComposite')
mix = ct.nodes.new('CompositorNodeMixRGB'); mix.blend_type = 'MIX'; mix.inputs[2].default_value = (.24, .28, .42, 1) if DUSK else (.62, .72, .86, 1)
mul = ct.nodes.new('CompositorNodeMath'); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = .16
ct.links.new(rl.outputs['Mist'], mul.inputs[0]); ct.links.new(mul.outputs[0], mix.inputs[0])
ct.links.new(rl.outputs['Image'], mix.inputs[1]); ct.links.new(mix.outputs['Image'], comp.inputs['Image'])


look = Vector(B(*RING['target']))
VIEWS = {'r03': ([71.4, 2.36, 55.81], [-.782, .125, -.61], 30), 'r01': ([80.82, 45.06, 102.65], [-.568, -.299, -.767], 20)}  # src/shared.js RENDER_VIEWS
if CAM:
    pos, fwd, fov = VIEWS[CAM]                                                                  # building frame (the explorer adds its offset to both)
    camd.angle_y = math.radians(fov); cam.location = B(*pos)
    cam.rotation_euler = Vector(B(*fwd)).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = os.path.join(out_dir, 'view_%s.png' % CAM); bpy.ops.render.render(write_still=True)
    print('rendered', CAM); raise SystemExit
todo = ONLY if ONLY is not None else range(NFR)
for i in todo:
    f = frames[i]; cam.location = B(*f['pos'])
    cam.rotation_euler = (look - cam.location).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = os.path.join(out_dir, 'frame_%03d.png' % i)
    bpy.ops.render.render(write_still=True)
    print('rendered', i, flush=True)
if '--blend' in opt: bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(opt['--blend']), relative_remap=False)   # reference scene, after rendering
print('done')
