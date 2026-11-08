"""Vectorise the openings of Mykonos's published elevations for real façade geometry (turntable.py).

Sources: mykonos-fachada1.png (courtyard), mykonos-fachada2.png (Calle María de Molina) at 16,13 px/m, and the
rectified end walls dist/models/mykonos/tex/{peatonal,far}.jpg (same scale). Openings are the dark/interior
pixels of the published image (glass, frames, rooms seen through) outside the tinted balcony glass; panes split by
thin mullions are merged; each opening is snapped to the measured storey grid (sill/head, doors to the floor).

  python facade_vector.py <img_dir> <exterior.json> <tex_dir> <out.json> [qa_dir]

Output (metres, u along each face from the image's left edge, v up from the façade base):
  {face: {"openings": [{u0,u1,v0,v1,kind: window|door, level, plane: main|frame|bay}], "balconyGlass": [...]}}
"""
import sys, os, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

sys.path.insert(0, os.path.dirname(__file__))
from exterior import PPM, U0, GROUND, TOP, LEVELS, LENGTH, DEPTH

HEAD = 2.25          # window head above the floor (HEIGHTS.head, measured on the elevation)
# open frames of the uncovered ático terraces at both ends (unit 5A "Terraza descubierta" 83,43 m², z 27,9–33,8 m,
# mirrored for Portal 2), measured on dist/models/mykonos/tex/*.jpg (u, v in metres)
VOIDS = {'street': [(1.55, 5.9, 18.5, 20.45), (63.1, 67.45, 18.5, 20.45)],
         'courtyard': [(1.86, 6.2, 18.8, 20.35), (62.8, 67.1, 18.8, 20.35)],
         'peatonal': [(3.7, 16.3, 18.2, 20.4)], 'far': [(3.7, 16.3, 18.2, 20.4)]}
FLOORS = [LEVELS[k] for k in ('B', '1', '2', '3', '4', '5')]


def classes(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mean = a.mean(2)
    teal = (g > r + 6) & (b > r + 4) & (mean > 60) & (mean < 220)
    dark = mean < 112
    warm = (r > b + 14) & (mean > 45) & (mean < 205)                 # interiors seen through glass
    return teal, (dark | warm) & ~teal


def boxes(mask, merge_x=3, merge_y=2):
    m = ndi.binary_closing(mask, np.ones((merge_y * 2 + 1, merge_x * 2 + 1)))
    lab, _ = ndi.label(m)
    return [(sl[1].start, sl[1].stop, sl[0].start, sl[0].stop) for sl in ndi.find_objects(lab)]


def snap_level(v0):
    lv = max([y for y in FLOORS if y <= v0 + .35] or [FLOORS[0]])
    return lv


def runs(prof, thr, min_len):
    out, i, n = [], 0, len(prof)
    while i < n:
        if prof[i] > thr:
            j = i
            while j < n and prof[j] > thr: j += 1
            if j - i >= min_len: out.append([i, j])
            i = j
        else: i += 1
    return out


def band_detect(a, u_of, v_of, zone, top_cut, py_of):
    """Per storey: columns mostly 'opening' in the upper window band (above any railing)."""
    teal, opening = classes(a)
    H, W = opening.shape; out = []
    levels = [(k, y) for k, y in LEVELS.items() if k != 'roof']
    for n, (lv, y) in enumerate(levels):
        y_next = levels[n + 1][1] if n + 1 < len(levels) else LEVELS['roof']
        r0, r1 = int(py_of(y + 2.05)), int(py_of(y + 1.35))
        r0, r1 = max(0, min(r0, r1)), min(H, max(r0, r1))
        if r1 - r0 < 3 or y + 2.05 > top_cut: continue
        prof = opening[r0:r1].mean(0); merged = []
        for r in runs(prof, .5, int(.3 * PPM)):
            if merged and r[0] - merged[-1][1] <= int(.15 * PPM): merged[-1][1] = r[1]
            else: merged.append(r)
        for x0, x1 in merged:
            u0, u1 = sorted((u_of(x0), u_of(x1)))
            if u1 - u0 > 4.2: continue
            ra, rb = int(py_of(y_next - .05)), int(py_of(y + .02)); ra, rb = max(0, min(ra, rb)), min(H, max(ra, rb))
            col = opening[ra:rb, x0:x1].mean(1) > .5; tcol = teal[ra:rb, x0:x1].mean(1) > .5
            idx = np.nonzero(col)[0]
            if not len(idx): continue
            v1, v0 = v_of(ra + idx.min()), v_of(ra + idx.max() + 1)
            below = tcol[idx.max() + 1: idx.max() + 1 + int(.4 * PPM)]
            door = (v0 - y < .45) or (len(below) and below.mean() > .5)
            v0s = y if door else round(max(y + .3, v0) / .05) * .05
            v1s = y + HEAD if abs(v1 - (y + HEAD)) < .45 else round(min(v1, y_next - .35) / .05) * .05
            if v1s - v0s < .4: continue
            out.append({'u0': round(u0, 2), 'u1': round(u1, 2), 'v0': round(v0s, 2), 'v1': round(v1s, 2),
                        'kind': 'door' if door else 'window', 'level': lv, 'plane': zone(u0, u1, v0s, v1s)})
    return out


def merge(a_list, b_list):
    """union of two detections; overlapping boxes (same storey) keep the wider one, doors win"""
    out = list(a_list)
    for b in b_list:
        hit = None
        for k, o in enumerate(out):
            if o['level'] != b['level']: continue
            ov = min(o['u1'], b['u1']) - max(o['u0'], b['u0'])
            if ov > .25 * min(o['u1'] - o['u0'], b['u1'] - b['u0']): hit = k; break
        if hit is None: out.append(b)
        else:
            o = out[hit]
            if (b['kind'] == 'door' and o['kind'] != 'door') or (b['u1'] - b['u0'] > o['u1'] - o['u0'] and b['kind'] == o['kind']): out[hit] = b
    return out


def vectorise(a, u_of, v_of, zone, top_cut, py_of):
    """Per storey slice: openings = dark/interior pixels or closed dark frame outlines (pale panes on the courtyard
    elevation), filled; components → boxes snapped to sill/head/floor. Panes split by mullions are merged.
    Floors 1–4 repeat the same openings (typical plan): a column found on two or more typical floors is completed
    on the others."""
    teal, opening = classes(a)
    L = a.mean(2); local = ndi.uniform_filter(L, 7)
    outline = (L < local - 9) & ~teal
    mask = ndi.binary_fill_holes(outline | opening) & ~ndi.binary_dilation(teal, iterations=1)
    mask = ndi.binary_opening(mask, np.ones((2, 2)))
    H, W = mask.shape; out = []
    levels = [(k, y) for k, y in LEVELS.items() if k != 'roof']
    for n, (lv, y) in enumerate(levels):
        y_next = levels[n + 1][1] if n + 1 < len(levels) else LEVELS['roof']
        ra, rb = int(py_of(y_next - .12)), int(py_of(y + .02))
        ra, rb = max(0, min(ra, rb)), min(H, max(ra, rb))
        if rb - ra < 5 or y + 1.0 > top_cut: continue
        sl = ndi.binary_closing(mask[ra:rb], np.ones((1, 5)))
        lab, _ = ndi.label(sl)
        for obj in ndi.find_objects(lab):
            x0, x1, y0p, y1p = obj[1].start, obj[1].stop, obj[0].start + ra, obj[0].stop + ra
            u0, u1 = sorted((u_of(x0), u_of(x1))); v0, v1 = v_of(y1p), v_of(y0p)
            w, h = u1 - u0, v1 - v0
            fill = lab[obj].astype(bool).mean()
            if w < .4 or h < .5 or w > 4.2 or h > 2.9 or fill < .55: continue
            below = teal[min(H - 1, y1p + 1):min(H, y1p + 1 + int(.4 * PPM)), x0:x1]
            door = (v0 - y < .45) or (below.size and below.mean() > .5)
            v0s = y if door else round(max(y + .3, v0) / .05) * .05
            v1s = y + HEAD if abs(v1 - (y + HEAD)) < .45 else round(min(v1, y_next - .35) / .05) * .05
            if v1s - v0s < .4: continue
            out.append({'u0': round(u0, 2), 'u1': round(u1, 2), 'v0': round(v0s, 2), 'v1': round(v1s, 2),
                        'kind': 'door' if door else 'window', 'level': lv, 'plane': zone(u0, u1, v0s, v1s)})
    out = merge(out, band_detect(a, u_of, v_of, zone, top_cut, py_of))
    # typical floors 1–4: complete columns seen on ≥ 2 of them
    typ = ['1', '2', '3', '4']; cols = []
    for o in [o for o in out if o['level'] in typ]:
        c = (o['u0'] + o['u1']) / 2
        g = next((g for g in cols if abs(g['c'] - c) < .3), None)
        if g: g['items'].append(o)
        else: cols.append({'c': c, 'items': [o]})
    added = 0
    for g in cols:
        have = {o['level'] for o in g['items']}
        if len(have) < 2: continue
        ref = sorted(g['items'], key=lambda o: o['u1'] - o['u0'])[len(g['items']) // 2]
        dy0, dy1 = ref['v0'] - LEVELS[ref['level']], ref['v1'] - LEVELS[ref['level']]
        for lv in typ:
            if lv in have: continue
            y = LEVELS[lv]
            out.append({**ref, 'level': lv, 'v0': round(y + dy0, 2), 'v1': round(y + dy1, 2), 'plane': zone(ref['u0'], ref['u1'], y + dy0, y + dy1), 'completed': True}); added += 1
    out.sort(key=lambda o: (o['v0'], o['u0']))
    print('  completed on typical floors:', added)
    return out


def main(img_dir, ex_path, tex_dir, out_path, qa_dir=None):
    ex = json.load(open(ex_path)); res = {}
    files = {'courtyard': 'mykonos-fachada1.png', 'street': 'mykonos-fachada2.png'}
    for face, fn in files.items():
        f = ex['faces'][face]; key = 'fachada1' if face == 'courtyard' else 'fachada2'
        a = np.asarray(Image.open(os.path.join(img_dir, fn)).convert('RGB')).astype(np.float32)
        u_of = lambda px: (px - U0) / PPM
        v_of = lambda py, g=GROUND[key]: (g - py) / PPM
        fu0, fu1, fb, ft = f['frame']; bv0, bv1 = f['bayV']
        def zone(u0, u1, v0, v1):
            uc, vc = (u0 + u1) / 2, (v0 + v1) / 2
            if any(b0 <= uc <= b1 for b0, b1 in f['bays']) and bv0 <= vc <= bv1: return 'bay'
            if fu0 <= uc <= fu1 and vc >= fb: return 'frame'
            return 'main'
        # crop to the building: u in [0, LENGTH]
        sub = a[:, U0:U0 + int(LENGTH * PPM)]
        ops = vectorise(sub, lambda px: px / PPM, v_of, zone, LEVELS['roof'] + .6, lambda v, g=GROUND[key]: g - v * PPM)
        res[face] = {'openings': ops}
    for end, fn in (('peatonal', 'peatonal.jpg'), ('far', 'far.jpg')):
        a = np.asarray(Image.open(os.path.join(tex_dir, fn)).convert('RGB')).astype(np.float32)
        H = a.shape[0]
        ops = vectorise(a, lambda px: px / PPM, lambda py: TOP * (1 - py / H), lambda *_: 'main', LEVELS['roof'] + .6, lambda v: (1 - v / TOP) * H)
        res[end] = {'openings': ops}
    for face, v in res.items():
        vs = VOIDS.get(face, [])
        v['openings'] = [o for o in v['openings'] if not any(o['u0'] < b[1] and o['u1'] > b[0] and o['v0'] < b[3] and o['v1'] > b[2] for b in vs)]
        v['openings'] += [{'u0': b[0], 'u1': b[1], 'v0': b[2], 'v1': b[3], 'kind': 'void', 'level': '5', 'plane': 'main'} for b in vs]
    json.dump(res, open(out_path, 'w'), indent=1)
    for k, v in res.items():
        kinds = {}
        for o in v['openings']: kinds[(o['kind'], o['plane'])] = kinds.get((o['kind'], o['plane']), 0) + 1
        print(k, len(v['openings']), kinds)
    if qa_dir:
        os.makedirs(qa_dir, exist_ok=True)
        for face, fn in files.items():
            key = 'fachada1' if face == 'courtyard' else 'fachada2'
            im = Image.open(os.path.join(img_dir, fn)).convert('RGB'); d = ImageDraw.Draw(im)
            P = lambda u, v: (U0 + u * PPM, GROUND[key] - v * PPM)
            for o in res[face]['openings']:
                d.rectangle([P(o['u0'], o['v1']), P(o['u1'], o['v0'])], outline=(255, 0, 0) if o['kind'] == 'window' else (0, 90, 255), width=1)
            im.resize((im.width * 2, im.height * 2)).save(os.path.join(qa_dir, f'openings-{face}.png'))


if __name__ == '__main__':
    main(*sys.argv[1:])
