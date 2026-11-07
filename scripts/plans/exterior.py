"""Mykonos exterior from Bamaire's published images (bamaire.es/mykonos/images/):
  mykonos-fachada1.png  courtyard façade (x = 0), orthographic elevation
  mykonos-fachada2.png  Calle María de Molina façade (x = 20), orthographic elevation
  mikonos-giro-7.png    pedestrian-street end (z = +34,5), near-frontal view
  mikonos-giro-3.png    far end (z = −34,5), near-frontal view

Orientation was established by matching the balconies of each elevation with the terraces traced on the
dwelling plans placed with their key plans (fachada2's centre bay ↔ 2D, left bay ↔ 2C/2B; fachada1's
centre bay ↔ 2E, right bay ↔ 2F/2A).

Writes <out>/exterior.json (dimensions, levels, frame/bays/balconies per face, roof overruns, site) and
<out>/tex/*.jpg (each façade cropped to the building, rectified to metres).
Usage: python exterior.py <img_dir> <building.json> <out_dir>
"""
import sys, os, json
import numpy as np
from PIL import Image

LENGTH, DEPTH = 69.0, 20.0
PPM = 16.13                     # px per metre on both elevations (1113 px ↔ 69 m)
U0 = 62                         # left building edge (px) on both elevations
GROUND = {'fachada1': 389.0, 'fachada2': 387.6}   # fachada2 aligned on the window rows of fachada1
TOP = 22.94                     # top of the frame / parapet (m)
LEVELS = {'B': .74, '1': 4.60, '2': 7.87, '3': 11.14, '4': 14.41, '5': 17.68, 'roof': 20.95}


def runs(v, thr, minlen=2):
    out, i, n = [], 0, len(v)
    while i < n:
        if v[i] > thr:
            j = i
            while j < n and v[j] > thr: j += 1
            if j - i >= minlen: out.append((i, j))
            i = j
        else: i += 1
    return out


def face_texture(img, key, out):
    a = np.asarray(Image.open(img).convert('RGB'))
    g = GROUND[key]
    y0 = int(round(g - TOP * PPM)); H = int(round(TOP * PPM)); W = int(round(LENGTH * PPM))
    canvas = np.zeros((H, W, 3), np.uint8); canvas[:] = (226, 224, 220)
    ys = slice(max(0, y0), min(a.shape[0], y0 + H)); dst = slice(ys.start - y0, ys.stop - y0)
    canvas[dst] = a[ys, U0:U0 + W]
    base = int(H - .3 * PPM)  # lowest 30 cm: lawn/kerb of the render → plinth colour
    canvas[base:] = canvas[base - 2:base - 1].mean(axis=(0, 1)).astype(np.uint8)
    im = Image.fromarray(canvas)
    im.save(out, quality=88, optimize=True)
    return {'file': os.path.basename(out), 'w': W, 'h': H, 'widthM': LENGTH, 'heightM': TOP}


def balconies(img, key):
    """Tinted-glass balcony fronts per floor: teal columns in the railing band of each floor."""
    a = np.asarray(Image.open(img).convert('RGB')).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mean = a.mean(2)
    teal = (g > r + 6) & (b > r + 4) & (mean > 70) & (mean < 215)
    out = []
    for lv in ('1', '2', '3', '4', '5'):
        base = LEVELS[lv]
        ya, yb = int(GROUND[key] - (base + .85) * PPM), int(GROUND[key] - (base + .2) * PPM)
        ya, yb = max(0, ya), min(a.shape[0], yb)
        prof = teal[ya:yb, U0:U0 + int(LENGTH * PPM)].mean(0)
        for x0, x1 in runs(prof, .45, int(.9 * PPM)):
            out.append([round(x0 / PPM, 2), round(x1 / PPM, 2), lv])
    return out


def end_texture(img, out, box):
    """Near-frontal end view: end wall rectangle read on a pixel grid of the published image
    (left, right, top in px); rectified to 20 m × TOP at the long-façade resolution."""
    a = Image.open(img).convert('RGB')
    x0, x1, top = box
    ppm = (x1 - x0) / DEPTH
    bottom = int(round(top + TOP * ppm))
    crop = a.crop((x0, top, x1, bottom))
    W = int(DEPTH * PPM); H = int(TOP * PPM)
    crop = crop.resize((W, H), Image.LANCZOS)
    crop.save(out, quality=88, optimize=True)
    return {'file': os.path.basename(out), 'w': W, 'h': H, 'widthM': DEPTH, 'heightM': TOP, 'srcPxPerM': round(ppm, 2)}


def main(src, bjson, out):
    os.makedirs(os.path.join(out, 'tex'), exist_ok=True)
    b = json.load(open(bjson))
    faces = {
        # u runs along the image from its left edge; 'axis' tells the JS how u maps to world z
        'courtyard': {'x': 0.0, 'normal': -1, 'zOfU': [-LENGTH / 2, 1], 'image': 'mykonos-fachada1.png', 'key': 'fachada1',
                      'frame': [7.0, 61.9, 3.53, TOP], 'bays': [[7.81, 24.18], [30.44, 38.56], [44.82, 61.19]], 'bayV': [5.45, 20.55]},
        'street': {'x': DEPTH, 'normal': 1, 'zOfU': [LENGTH / 2, -1], 'image': 'mykonos-fachada2.png', 'key': 'fachada2',
                   'frame': [7.0, 62.0, 3.53, TOP], 'bays': [[7.69, 18.41], [24.55, 44.51], [50.59, 61.25]], 'bayV': [5.45, 20.55]},
    }
    spec = {'source': 'bamaire.es/mykonos/images (fachada1/2, giro-3/7)', 'length': LENGTH, 'depth': DEPTH, 'top': TOP,
            'levels': LEVELS, 'pxPerM': PPM, 'faces': {}, 'ends': {}}
    for name, f in faces.items():
        img = os.path.join(src, f['image'])
        tex = face_texture(img, f['key'], os.path.join(out, 'tex', f'{name}.jpg'))
        spec['faces'][name] = {k: v for k, v in f.items() if k not in ('image', 'key')} | {'texture': tex, 'balconies': balconies(img, f['key'])}
    spec['ends']['peatonal'] = {'z': LENGTH / 2, 'normal': 1, 'texture': end_texture(os.path.join(src, 'mikonos-giro-7.png'), os.path.join(out, 'tex', 'peatonal.jpg'), (316, 521, 26))}
    spec['ends']['far'] = {'z': -LENGTH / 2, 'normal': -1, 'texture': end_texture(os.path.join(src, 'mikonos-giro-3.png'), os.path.join(out, 'tex', 'far.jpg'), (316, 521, 25))}
    # roof overruns (lift/stair) measured on fachada1 (u) and giro-3 (x span)
    spec['overruns'] = [{'z': [-21.2, -17.5], 'x': [1.2, 12.0], 'h': 1.45}, {'z': [17.5, 21.2], 'x': [1.2, 12.0], 'h': 1.45}]
    # site: ground-floor patios toward the street (key-plan outline of level B), courtyard with pool and lawn
    B = b['levels'].get('B')
    if B:
        ox, oy = B['offset']; sc = B['slabCell']
        xs = [ox + x * sc for x, y, w, h in B['slab']] + [ox + (x + w) * sc for x, y, w, h in B['slab']]
        zs = [oy + y * sc for x, y, w, h in B['slab']] + [oy + (y + h) * sc for x, y, w, h in B['slab']]
        spec['site'] = {'patioX': [round(min(xs), 2), round(max(xs), 2)], 'patioZ': [round(min(zs), 2), round(max(zs), 2)]}
    json.dump(spec, open(os.path.join(out, 'exterior.json'), 'w'), indent=1)
    for k, f in spec['faces'].items(): print(k, 'balconies', len(f['balconies']), f['balconies'][:6])
    print('ends', {k: v['texture'] for k, v in spec['ends'].items()})


if __name__ == '__main__':
    main(*sys.argv[1:])
