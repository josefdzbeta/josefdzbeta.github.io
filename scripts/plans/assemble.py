"""Place traced dwellings in a common building frame using the key plan printed on each PDF.

For every unit PDF:
  1. render the key plan (text removed) and orient it so "Calle María de Molina" is on the right (+x)
     and "Calle peatonal" at the bottom (+y) — the orientation most Mykonos keys already use;
  2. take the blue highlight (this dwelling) and the grey outline (the whole Portal 1 floor);
  3. match the traced unit footprint to the highlight under 4 rotations (IoU) and derive metres per key pixel.
Per level, unit positions are expressed relative to the floor outline bbox and scaled with the median
metres-per-key-pixel of that level. The slab outline comes from the key plan itself.

Usage: python assemble.py <pdf_dir> <units_dir> <out.json> [qa.png]
"""
import sys, os, re, json, glob, math
import numpy as np, pymupdf
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

LEVEL = lambda code: 'B' if code.startswith('B') else code[0]


def key_render(page):
    cands = []
    for info in page.get_images(full=True):
        for r, m in page.get_image_rects(info[0], transform=True):
            if 150 < r.width < 360 and 150 < r.height < 360: cands.append(r)
    mdm = [b for b in page.get_text('dict')['blocks'] if b.get('type') == 0 and 'Molina' in str(b)]
    ped = [b for b in page.get_text('dict')['blocks'] if b.get('type') == 0 and 'peatonal' in str(b)]
    if not cands or not mdm: return None
    mb = pymupdf.Rect(mdm[0]['bbox'])
    key = min(cands, key=lambda r: abs((r.x0 + r.x1) / 2 - (mb.x0 + mb.x1) / 2) + abs((r.y0 + r.y1) / 2 - (mb.y0 + mb.y1) / 2))
    tmp = pymupdf.open(); tmp.insert_pdf(page.parent, from_page=page.number, to_page=page.number)
    tp = tmp[0]
    for b in tp.get_text('dict')['blocks']:
        if b.get('type') == 0: tp.add_redact_annot(b['bbox'])
    tp.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=0)
    z = 4.0
    pm = tp.get_pixmap(clip=key, matrix=pymupdf.Matrix(z, z), alpha=False)
    a = np.asarray(Image.frombytes('RGB', (pm.width, pm.height), pm.samples)).astype(int)
    # which side of the key is Calle María de Molina?
    c = ((key.x0 + key.x1) / 2, (key.y0 + key.y1) / 2)
    m = ((mb.x0 + mb.x1) / 2 - c[0], (mb.y0 + mb.y1) / 2 - c[1])
    side = ('right' if m[0] > 0 else 'left') if abs(m[0]) > abs(m[1]) else ('bottom' if m[1] > 0 else 'top')
    k = {'right': 0, 'top': 3, 'left': 2, 'bottom': 1}[side]  # np.rot90 k (CCW) to bring MdM to the right
    a = np.rot90(a, k)
    # mirror check: Calle peatonal should end at the bottom
    mirrored = False
    if ped:
        pb = pymupdf.Rect(ped[0]['bbox'])
        p = ((pb.x0 + pb.x1) / 2 - c[0], (pb.y0 + pb.y1) / 2 - c[1])
        for _ in range(k): p = (p[1], -p[0])  # rotate vector CCW (image coords, y down)
        if abs(p[0]) > abs(p[1]):
            pass
        elif p[1] < 0:
            a = a[::-1]; mirrored = True
    return a, k, mirrored


def masks(a):
    blue = (a[..., 2] > 150) & (a[..., 0] < 90) & (a[..., 1] > 100) & (a[..., 1] < 200)
    grey = (a.min(2) < 236) & ~blue
    bld = ndi.binary_fill_holes(ndi.binary_closing(grey | blue, np.ones((5, 5))))
    lab, n = ndi.label(bld)
    if n:
        sizes = ndi.sum(bld, lab, range(1, n + 1)); bld = lab == (np.argmax(sizes) + 1)
    blue = ndi.binary_opening(blue & bld, np.ones((3, 3)))
    return blue, bld


def unit_occupancy(u):
    vals = []
    for tok in u['grid'].split(','):
        v, c = tok.split(':'); vals += [int(v)] * int(c)
    g = np.array(vals, np.int16).reshape(u['h'], u['w'])
    return g != 0


def match(occ, blue):
    ys, xs = np.nonzero(blue)
    if len(ys) < 30: return None
    by0, by1, bx0, bx1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    crop = blue[by0:by1, bx0:bx1]
    best = None
    for k in range(4):
        o = np.rot90(occ, k)
        im = Image.fromarray((o * 255).astype(np.uint8)).resize((bx1 - bx0, by1 - by0), Image.NEAREST)
        o2 = np.asarray(im) > 127
        iou = (o2 & crop).sum() / max((o2 | crop).sum(), 1)
        sx = o.shape[1] * 0.05 / (bx1 - bx0); sy = o.shape[0] * 0.05 / (by1 - by0)
        aniso = abs(sx - sy) / max(sx, sy)
        score = iou - aniso
        if best is None or score > best[0]:
            best = (score, k, iou, (sx + sy) / 2, aniso, (bx0, by0, bx1, by1))
    return best


def main(pdf_dir, units_dir, out, qa=None):
    rows = []
    for f in sorted(glob.glob(os.path.join(units_dir, '*.json'))):
        u = json.load(open(f)); code = u['code']
        pdf = os.path.join(pdf_dir, u['source'])
        page = pymupdf.open(pdf)[0]
        kr = key_render(page)
        if kr is None: rows.append({'code': code, 'error': 'no key plan'}); continue
        a, k, mir = kr
        blue, bld = masks(a)
        m = match(unit_occupancy(u), blue)
        if m is None: rows.append({'code': code, 'error': 'no highlight'}); continue
        score, rot, iou, mpp, aniso, bb = m
        ys, xs = np.nonzero(bld)
        rows.append({'code': code, 'level': LEVEL(code), 'keyRot': k, 'keyMirrored': mir, 'rot': rot,
                     'iou': round(float(iou), 3), 'aniso': round(float(aniso), 3), 'mPerKeyPx': mpp,
                     'blue': [int(v) for v in bb], 'bld': [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1],
                     'w': u['w'], 'h': u['h'], '_bldmask': bld})
    levels = {}
    for r in rows:
        if 'error' in r: continue
        levels.setdefault(r['level'], []).append(r)
    res = {'frame': 'x → Calle María de Molina, y → Calle peatonal (Portal 1 key plan orientation); metres',
           'levels': {}}
    for lv, rs in sorted(levels.items()):
        good = [r for r in rs if r['iou'] > 0.6] or rs
        s = float(np.median([r['mPerKeyPx'] for r in good]))
        # reference: the floor outline bbox of the best-matching key on this level
        ref = max(rs, key=lambda r: r['iou'])
        bx0, by0, bx1, by1 = ref['bld']
        bm = ref['_bldmask'][by0:by1, bx0:bx1]
        cell = 0.25
        step = cell / s
        gw, gh = int(bm.shape[1] / step), int(bm.shape[0] / step)
        sx = ((np.arange(gw) + .5) * step).astype(int).clip(0, bm.shape[1] - 1)
        sy = ((np.arange(gh) + .5) * step).astype(int).clip(0, bm.shape[0] - 1)
        slab = bm[np.ix_(sy, sx)]
        units = []
        for r in rs:
            # each key may be cropped differently: express highlight relative to its own floor outline
            ox, oy = r['blue'][0] - r['bld'][0], r['blue'][1] - r['bld'][1]
            wk, hk = (r['h'], r['w']) if r['rot'] % 2 else (r['w'], r['h'])
            units.append({'code': r['code'], 'x': round(ox * s, 2), 'y': round(oy * s, 2), 'rot': r['rot'],
                          'wM': round(wk * 0.05, 2), 'hM': round(hk * 0.05, 2), 'iou': r['iou'], 'aniso': r['aniso'],
                          'mPerKeyPx': round(r['mPerKeyPx'], 5),
                          'scaleDevPct': round((r['mPerKeyPx'] - s) / s * 100, 1)})
        res['levels'][lv] = {'mPerKeyPx': round(s, 5), 'outlineM': [round(gw * cell, 2), round(gh * cell, 2)],
                             'slab': {'cell': cell, 'w': gw, 'h': gh,
                                      'rows': [''.join('1' if v else '0' for v in row) for row in slab]},
                             'units': sorted(units, key=lambda u: u['code'])}
    res['errors'] = [r for r in rows if 'error' in r]
    json.dump(res, open(out, 'w'), ensure_ascii=False, indent=1)
    for lv, L in res['levels'].items():
        print(lv, L['outlineM'], [(u['code'], u['rot'], u['iou'], u['scaleDevPct']) for u in L['units']])
    print('errors', res['errors'])
    if qa:
        tiles = []
        for lv, L in sorted(res['levels'].items()):
            S = 20
            W, H = int(L['outlineM'][0] * S) + 40, int(L['outlineM'][1] * S) + 40
            im = Image.new('RGB', (W, H), 'white'); d = ImageDraw.Draw(im)
            for j, row in enumerate(L['slab']['rows']):
                for i, v in enumerate(row):
                    if v == '1': d.rectangle([20 + i * 5, 20 + j * 5, 24 + i * 5, 24 + j * 5], fill=(215, 215, 215))
            for u in L['units']:
                d.rectangle([20 + u['x'] * S, 20 + u['y'] * S, 20 + (u['x'] + u['wM']) * S, 20 + (u['y'] + u['hM']) * S], outline=(0, 90, 200), width=2)
                d.text((24 + u['x'] * S, 24 + u['y'] * S), f"{u['code']} r{u['rot']} {u['iou']}", fill=(200, 0, 0))
            d.text((4, 4), 'Nivel ' + lv, fill=(0, 0, 0)); tiles.append(im)
        Wt = sum(t.width for t in tiles); Ht = max(t.height for t in tiles)
        c = Image.new('RGB', (Wt, Ht), 'white'); x = 0
        for t in tiles: c.paste(t, (x, 0)); x += t.width
        c.save(qa)


if __name__ == '__main__':
    main(*sys.argv[1:])
