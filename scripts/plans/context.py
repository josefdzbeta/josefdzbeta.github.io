"""Surroundings of Mykonos from OpenStreetMap, for the photoreal turntable (scripts/blender/turntable.py).

Source: OSM extract around Calle María de Molina, Badajoz (research/osm/mykonos-osm.json, Overpass,
© OpenStreetMap contributors, ODbL). OSM building way 1453174853 (68,6–69,4 × 21,7–21,9 m) is the Mykonos
block; satellite imagery confirms it (María de Molina to the west, pool to the east, pedestrian street to
the south).

Bamaire's published plans and renders are drawn as the mirror image of that footprint (seen from María de
Molina the "Calle peatonal" is on the left in every plan, on the right on site). The building is kept
exactly as published, so the context is reflected north–south: María de Molina stays along the street
façade (x = 20), the pedestrian street stays at the Portal 1 end (+z) and the courtyard/pool side faces the
rest of the block, as on the plans. Everything else (grid, widths, neighbouring blocks) is OSM geometry.

Output (model coordinates, metres; x across the building 0 = courtyard … 20 = street, z along it, +z
Portal 1 / calle peatonal):
  <out>/ground_albedo.jpg, ground_rough.png, ground_height.png  raster ground (RES m/px) over EXTENT
  <out>/context.json  extent, buildings (footprint, height), trees, roads (for cars/lamps), crossings
Usage: python context.py <osm.json> <exterior.json> <out_dir>
"""
import sys, os, json, math
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

RES = 0.2                                 # m per pixel
EXTENT = (-260.0, 280.0, -270.0, 270.0)   # x0, x1, z0, z1
MYKONOS_WAY = 1453174853
rng = np.random.default_rng(7)

# carriageway width, kerb-to-kerb, and sidewalk on each side (m), by OSM highway class
ROADS = {
    'trunk': (7.5, 4.5), 'primary': (8, 4), 'secondary': (8, 4), 'tertiary': (7.5, 3.5),
    'residential': (11.0, 4.0),            # 6,5 m lane(s) + 2,25 m parking each side (as on site)
    'unclassified': (7, 2.5), 'living_street': (6, 0), 'service': (5, 0),
}
PATHS = {'pedestrian': 9.0, 'footway': 2.6, 'cycleway': 2.4, 'path': 2.0, 'track': 3.0, 'steps': 2.0}
COL = {  # sRGB albedo
    'meadow_dry': (122, 128, 76), 'meadow_green': (84, 116, 50), 'lawn': (72, 120, 44), 'soil': (140, 118, 88),
    'asphalt': (62, 63, 66), 'paving': (188, 182, 171), 'promenade': (190, 172, 158), 'cycle': (128, 70, 60),
    'track': (150, 132, 104), 'mark': (225, 225, 220), 'plot': (198, 193, 184),
}


def noise(shape, scales=((64, .5), (16, .3), (4, .2))):
    out = np.zeros(shape, np.float32)
    for s, w in scales:
        small = rng.random((shape[0] // s + 2, shape[1] // s + 2)).astype(np.float32)
        out += w * ndi.zoom(small, s, order=3)[:shape[0], :shape[1]]
    return (out - out.min()) / (np.ptp(out) + 1e-6)


def main(osm_path, ex_path, out):
    os.makedirs(out, exist_ok=True)
    d = json.load(open(osm_path)); ex = json.load(open(ex_path))
    lat0, lon0 = 38.8795, -7.0133
    mx, my = 111320 * math.cos(math.radians(lat0)), 110540
    E = lambda la, lo: ((lo - lon0) * mx, (la - lat0) * my)
    myk = next(e for e in d['elements'] if e['id'] == MYKONOS_WAY)
    pts = [E(p['lat'], p['lon']) for p in myk['geometry']][:-1]
    c = np.mean(pts, axis=0)
    # long axis (pointing to the pedestrian street, south) and the across axis (pointing to María de Molina, west)
    edges = sorted(((math.dist(a, b), a, b) for a, b in zip(pts, pts[1:] + pts[:1])), key=lambda t: -t[0])
    _, a, b = edges[0]
    s = np.subtract(b, a); s /= np.linalg.norm(s)
    if s[1] > 0: s = -s                                      # point south
    w = np.array([-s[1], s[0]])
    if w[0] > 0: w = -w                                      # point west
    def M(p):  # OSM local metres → model (x, z); reflection (see module doc)
        q = np.subtract(p, c)
        return (round(float(ex['depth'] / 2 + q @ w), 2), round(float(q @ s), 2))
    print('axis bearing %.1f°, centre %s' % (math.degrees(math.atan2(s[0], s[1])) % 360, c.round(1)))

    x0, x1, z0, z1 = EXTENT
    W, H = int((x1 - x0) / RES), int((z1 - z0) / RES)
    P = lambda x, z: ((x - x0) / RES, (z - z0) / RES)
    cls = Image.new('L', (W, H), 0); dc = ImageDraw.Draw(cls)       # class ids, painted in order
    K = {n: i for i, n in enumerate(['meadow', 'lawn', 'soil', 'asphalt', 'paving', 'promenade', 'cycle', 'track', 'mark', 'plot'])}
    elements = []
    for e in d['elements']:
        if 'geometry' not in e: continue
        e['_m'] = [M(E(p['lat'], p['lon'])) for p in e['geometry']]
        elements.append(e)
    tag = lambda e, k: e.get('tags', {}).get(k)
    poly = lambda e, k: dc.polygon([P(*q) for q in e['_m']], fill=K[k]) if len(e['_m']) > 2 else None
    for e in elements:
        lu, le = tag(e, 'landuse'), tag(e, 'leisure')
        if lu in ('grass', 'recreation_ground', 'village_green') or le in ('park', 'garden', 'playground'): poly(e, 'lawn')
        elif lu in ('construction', 'brownfield'): poly(e, 'soil')
        elif tag(e, 'amenity') == 'parking': poly(e, 'asphalt')
    roads = []
    width = lambda m: max(1, int(round(m / RES)))
    hw = lambda e: tag(e, 'highway')
    # sidewalks first, then carriageways, then paths on top
    for e in elements:
        k = hw(e)
        if k in ROADS and ROADS[k][1] > 0:
            dc.line([P(*q) for q in e['_m']], fill=K['paving'], width=width(ROADS[k][0] + 2 * ROADS[k][1]), joint='curve')
    for e in elements:
        k = hw(e)
        if k in ROADS:
            dc.line([P(*q) for q in e['_m']], fill=K['asphalt'], width=width(ROADS[k][0]), joint='curve')
            roads.append({'kind': k, 'name': tag(e, 'name'), 'oneway': tag(e, 'oneway') == 'yes', 'width': ROADS[k][0], 'pts': e['_m']})
    for e in elements:
        k = hw(e)
        if k in PATHS:
            dc.line([P(*q) for q in e['_m']], fill=K['promenade' if k == 'pedestrian' else 'cycle' if k == 'cycleway' else 'track' if k == 'track' else 'paving'], width=width(PATHS[k]), joint='curve')
    # the Mykonos plot (fenced, raised courtyard and patios are modelled geometry) sits on paving
    px = ex['site']['patioX'][1]; zN, zP = ex['site'].get('plotZ', [-ex['length'] / 2 - 2, ex['length'] / 2 + 2]); pz = max(-zN, zP)
    dc.rectangle([P(-8.5, zN - .5), P(px + .5, zP + .5)], fill=K['plot'])
    # markings: lane/parking lines and zebra crossings near the building
    marks = ImageDraw.Draw(cls)
    near = lambda q: abs(q[0] - 10) < 170 and abs(q[1]) < 170
    crossings = []
    nodes = {}
    for r in roads:
        for q in (r['pts'][0], r['pts'][-1]): nodes.setdefault((round(q[0], 1), round(q[1], 1)), []).append(r)
        if r['kind'] != 'residential': continue
        for a, b in zip(r['pts'], r['pts'][1:]):
            L = math.dist(a, b)
            if L < 1e-3 or not (near(a) or near(b)): continue
            t = ((b[0] - a[0]) / L, (b[1] - a[1]) / L); n = (-t[1], t[0])
            for side in (-1, 1):                               # parking lane edge lines
                off = side * (r['width'] / 2 - 2.25)
                marks.line([P(a[0] + n[0] * off, a[1] + n[1] * off), P(b[0] + n[0] * off, b[1] + n[1] * off)], fill=K['mark'], width=width(.12))
                for k in range(int(L // 5.0)):                 # bay separators every 5 m
                    u = 2.5 + k * 5.0
                    if u > L - 1: break
                    p0 = (a[0] + t[0] * u + n[0] * off, a[1] + t[1] * u + n[1] * off)
                    p1 = (p0[0] + n[0] * side * 2.1, p0[1] + n[1] * side * 2.1)
                    marks.line([P(*p0), P(*p1)], fill=K['mark'], width=width(.12))
    for q, rs in nodes.items():                                # zebra crossings 6 m from each junction arm
        if len(rs) < 2 or not near(q): continue
        for r in rs:
            if r['kind'] not in ('residential', 'trunk', 'unclassified'): continue
            pts = r['pts'] if math.dist(r['pts'][0], q) < .5 else r['pts'][::-1]
            a, b = pts[0], pts[1]; L = math.dist(a, b)
            if L < 14: continue
            t = ((b[0] - a[0]) / L, (b[1] - a[1]) / L); n = (-t[1], t[0])
            cpos = (a[0] + t[0] * 7.5, a[1] + t[1] * 7.5); half = r['width'] / 2 - .3
            for k in np.arange(-half, half, 1.0):
                p0 = (cpos[0] + n[0] * k, cpos[1] + n[1] * k); p1 = (cpos[0] + n[0] * (k + .5), cpos[1] + n[1] * (k + .5))
                marks.polygon([P(p0[0] - t[0] * 1.5, p0[1] - t[1] * 1.5), P(p0[0] + t[0] * 1.5, p0[1] + t[1] * 1.5), P(p1[0] + t[0] * 1.5, p1[1] + t[1] * 1.5), P(p1[0] - t[0] * 1.5, p1[1] - t[1] * 1.5)], fill=K['mark'])
            crossings.append({'at': [round(cpos[0], 2), round(cpos[1], 2)], 'dir': [round(t[0], 3), round(t[1], 3)]})

    C = np.asarray(cls)
    print('raster', W, H, {k: round(float((C == v).mean()), 3) for k, v in K.items()})
    # albedo from classes + noise (meadow mixes dry grass and green patches, as on site)
    n1, n2, n3 = noise((H, W)), noise((H, W), ((8, .6), (2, .4))), noise((H, W), ((160, .7), (40, .3)))
    alb = np.zeros((H, W, 3), np.float32)
    def put(k, col, var=.06, nn=None):
        m = C == K[k]; v = (nn if nn is not None else n2)[m][:, None]
        alb[m] = np.array(col, np.float32) * (1 - var + 2 * var * v)
    mg = np.clip((n3 - .35) * 2.2, 0, 1)[..., None]
    mead = (np.array(COL['meadow_dry'], np.float32) * (1 - mg) + np.array(COL['meadow_green'], np.float32) * mg) * (.85 + .3 * n2[..., None])
    alb[C == K['meadow']] = mead[C == K['meadow']]
    put('lawn', COL['lawn'], .12, n1); put('soil', COL['soil'], .1); put('asphalt', COL['asphalt'], .08)
    put('paving', COL['paving'], .05); put('promenade', COL['promenade'], .05); put('cycle', COL['cycle'], .06)
    put('track', COL['track'], .1); put('mark', COL['mark'], .03); put('plot', COL['plot'], .03)
    Image.fromarray(np.clip(alb, 0, 255).astype(np.uint8)).save(os.path.join(out, 'ground_albedo.jpg'), quality=90)
    rough = np.full((H, W), .92, np.float32)
    rough[C == K['asphalt']] = .78; rough[np.isin(C, [K['paving'], K['promenade'], K['plot']])] = .7; rough[C == K['mark']] = .6
    Image.fromarray((rough * 255).astype(np.uint8)).save(os.path.join(out, 'ground_rough.png'))
    # heights: carriageways and markings 0, kerbed surfaces +0,15 m, meadow uneven (bump only)
    hgt = np.where(np.isin(C, [K['asphalt'], K['mark'], K['cycle']]), 0., .15).astype(np.float32)
    hgt = ndi.gaussian_filter(hgt, .6) + np.where(np.isin(C, [K['meadow'], K['soil']]), .05 * n1, 0)
    Image.fromarray((np.clip(hgt / .25, 0, 1) * 255).astype(np.uint8)).save(os.path.join(out, 'ground_height.png'))

    # neighbouring buildings (OSM footprints, heights from building:levels, else 4 storeys / 1 for retail)
    blds = []
    for e in elements:
        t = e.get('tags', {})
        if 'building' not in t or e['id'] == MYKONOS_WAY or len(e['_m']) < 4: continue
        lv = t.get('building:levels')
        h = float(t['height']) if 'height' in t else (float(lv) * 3.4 + 1 if lv else 9 if t['building'] in ('commercial', 'retail', 'industrial') else 13.5)
        blds.append({'name': t.get('name'), 'kind': t['building'], 'height': round(h, 1), 'pts': e['_m'][:-1]})
    # trees: OSM trees and tree rows; street trees along the residential streets near the building every 9 m
    trees = []
    for e in d['elements']:
        if e['type'] == 'node' and e.get('tags', {}).get('natural') == 'tree': trees.append([*M(E(e['lat'], e['lon'])), 'osm'])
    for e in elements:
        if tag(e, 'natural') == 'tree_row':
            for a, b in zip(e['_m'], e['_m'][1:]):
                L = math.dist(a, b)
                for k in range(int(L // 8) + 1): trees.append([round(a[0] + (b[0] - a[0]) * k * 8 / max(L, 1e-3), 2), round(a[1] + (b[1] - a[1]) * k * 8 / max(L, 1e-3), 2), 'row'])
    for r in roads:
        if r['kind'] != 'residential': continue
        for a, b in zip(r['pts'], r['pts'][1:]):
            L = math.dist(a, b)
            if L < 1e-3: continue
            t = ((b[0] - a[0]) / L, (b[1] - a[1]) / L); n = (-t[1], t[0])
            for side in (-1, 1):
                off = side * (r['width'] / 2 + 1.0)
                for k in range(int(L // 9)):
                    u = 4.5 + k * 9
                    q = (a[0] + t[0] * u + n[0] * off, a[1] + t[1] * u + n[1] * off)
                    if not (abs(q[0] - 10) < 150 and abs(q[1]) < 150): continue
                    if -9 < q[0] < px + 1 and abs(q[1]) < pz + 1: continue           # inside the plot
                    trees.append([round(q[0], 2), round(q[1], 2), 'street'])
    # shrubs scattered on the meadow lots (green patches on site)
    shrubs = []
    for _ in range(9000):
        x, z = rng.uniform(x0 + 5, x1 - 5), rng.uniform(z0 + 5, z1 - 5)
        i, j = int((z - z0) / RES), int((x - x0) / RES)
        if C[i, j] == K['meadow'] and n3[i, j] > .55 and rng.random() < .35: shrubs.append([round(x, 1), round(z, 1)])
    mdm = [r for r in roads if r['name'] == 'Calle María de Molina']
    ctx = {'source': 'OpenStreetMap (ODbL) extract research/osm/mykonos-osm.json; reflected north–south to match the published plans',
           'res': RES, 'extent': EXTENT, 'classes': K, 'buildings': blds, 'trees': trees, 'shrubs': shrubs, 'roads': roads, 'crossings': crossings,
           'mariaDeMolina': mdm}
    json.dump(ctx, open(os.path.join(out, 'context.json'), 'w'))
    print('buildings', len(blds), 'trees', len(trees), 'shrubs', len(shrubs), 'crossings', len(crossings))
    for r in mdm: print('María de Molina', r['pts'])


if __name__ == '__main__':
    main(*sys.argv[1:])
