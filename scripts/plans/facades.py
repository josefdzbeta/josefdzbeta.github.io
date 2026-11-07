"""Measure the long façades of Mykonos from Bamaire's orthographic elevations
(images/mykonos-fachada1.png, mykonos-fachada2.png on bamaire.es).

Scale: the building is 69,0 m long (2 × 34,5 m Portal 1 length from the key plans), measured
edge to edge on each elevation. Output (metres; u along the façade from its left edge as seen
in the image, v up from ground):
  frame      outer rectangle of the projecting white frame
  bays       recessed grey-clad bays inside the frame
  windows    glazed openings (u0, u1, v0, v1) with zone: 'end' | 'bay' | 'pier' | 'ground'
  balconies  tinted-glass balcony fronts (u0, u1, v0 = slab level, v1 = rail top)
  overruns   roof boxes above the frame
Usage: python facades.py <img_dir> <out.json> [qa.png]
"""
import sys, json
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

LENGTH = 69.0


def classes(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn, mean = a.max(2), a.min(2), a.mean(2)
    white = (mn > 196) & (mx - mn < 22)
    teal = (g > r + 8) & (b > r + 6) & (mean > 70) & (mean < 205)
    glass = ((r > b + 12) & (mean > 50) & (mean < 215)) | (mx < 100)
    grey = (mx - mn < 16) & (mean >= 95) & (mean <= 196)
    return white, teal, glass, grey


def boxes(mask, min_w, min_h, merge=0):
    m = ndi.binary_dilation(mask, iterations=merge) if merge else mask
    lab, n = ndi.label(m)
    out = []
    for sl in ndi.find_objects(lab):
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if w >= min_w and h >= min_h: out.append([sl[1].start + merge, sl[1].stop - merge, sl[0].start + merge, sl[0].stop - merge])
    return out


def measure(path):
    a = np.asarray(Image.open(path).convert('RGB')).astype(int)
    H, W = a.shape[:2]
    white, teal, glass, grey = classes(a)
    building = (white | teal | glass | grey) & (a.max(2) > 30)
    glass &= a.max(2) > 30
    # façade extent: columns that are mostly building between the top of the frame and the plinth
    col = building[int(H * .25):int(H * .8)].mean(0)
    xs = np.nonzero(col > .9)[0]; u0p, u1p = xs.min(), xs.max() + 1
    ppm = (u1p - u0p) / LENGTH
    # ground line: lowest row where the façade is still mostly building
    row = building[:, u0p:u1p].mean(1)
    ground = max(i for i in range(H) if row[i] > .85) + 1
    top_rows = [i for i in range(H) if row[i] > .85]
    top = min(top_rows)
    U = lambda x: round((x - u0p) / ppm, 2); V = lambda y: round((ground - y) / ppm, 2)
    # bays: large regions of grey/teal/glass inside the façade (not white)
    nonwhite = (teal | glass | grey) & ~white
    nonwhite[:, :u0p] = False; nonwhite[:, u1p:] = False
    closed = ndi.binary_closing(nonwhite, np.ones((9, 9)))
    bays = [b for b in boxes(closed, int(4 * ppm), int(8 * ppm)) if b[3] < ground - 2 * ppm]
    # frame: white band around the bays, from the top of the façade to the underside above the plinth
    if bays:
        fb0 = min(b[0] for b in bays); fb1 = max(b[1] for b in bays)
        by0 = min(b[2] for b in bays); by1 = max(b[3] for b in bays)
        # frame edges: walk outwards from the bays while the colour stays white
        def walk(x, y, dx):
            while 0 < x < W - 1 and white[y, x]: x += dx
            return x
        midy = (by0 + by1) // 2
        f0 = walk(fb0 - 3, by0 - 3, -1); f1 = walk(fb1 + 3, by0 - 3, 1)
        fbottom = by1
        while fbottom < ground and white[fbottom, (fb0 + fb1) // 2]: fbottom += 1
        frame = [U(f0), U(f1), V(fbottom), V(top)]
    else:
        frame = None
    bay_rects = [[U(b[0]), U(b[1]), V(b[3]), V(b[2])] for b in bays]
    def zone(x0, x1, y0, y1):
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        if V(cy) < 3.8: return 'ground'
        for b in bays:
            if b[0] <= cx <= b[1] and b[2] <= cy <= b[3]: return 'bay'
        if frame and U(cx) > frame[0] and U(cx) < frame[1]: return 'pier'
        return 'end'
    # windows: glass components (panes merged), at least 0,5 × 0,6 m
    wins = []
    for x0, x1, y0, y1 in boxes(glass & ~teal, int(.35 * ppm), int(.5 * ppm), merge=2):
        if y1 > ground or y0 < top: continue
        if (x1 - x0) > 4 * ppm: continue
        wins.append([U(x0), U(x1), V(y1), V(y0), zone(x0, x1, y0, y1)])
    # balcony glass fronts
    bals = []
    for x0, x1, y0, y1 in boxes(teal, int(1.2 * ppm), int(.5 * ppm), merge=1):
        if y1 > ground - 3 * ppm: continue
        bals.append([U(x0), U(x1), V(y1), V(y0)])
    # roof overruns: white blobs above the façade top
    ov = []
    above = building.copy(); above[top:] = False
    for x0, x1, y0, y1 in boxes(above, int(2 * ppm), int(.4 * ppm)):
        ov.append([U(x0), U(x1), V(top), V(y0)])
    return {'image': path.split('/')[-1], 'pxPerM': round(ppm, 3), 'heightM': V(top), 'frame': frame, 'bays': bay_rects,
            'windows': wins, 'balconies': bals, 'overruns': ov,
            '_px': (u0p, ground, ppm)}


def qa(path, m, out):
    im = Image.open(path).convert('RGB'); d = ImageDraw.Draw(im)
    u0p, ground, ppm = m['_px']
    P = lambda u, v: (u0p + u * ppm, ground - v * ppm)
    if m['frame']:
        f = m['frame']; d.rectangle([P(f[0], f[3]), P(f[1], f[2])], outline=(255, 0, 255), width=2)
    for b in m['bays']: d.rectangle([P(b[0], b[3]), P(b[1], b[2])], outline=(0, 0, 255), width=2)
    for w in m['windows']: d.rectangle([P(w[0], w[3]), P(w[1], w[2])], outline={'end': (255, 0, 0), 'bay': (255, 140, 0), 'pier': (0, 160, 0), 'ground': (120, 0, 160)}[w[4]], width=1)
    for b in m['balconies']: d.rectangle([P(b[0], b[3]), P(b[1], b[2])], outline=(0, 200, 200), width=2)
    for o in m['overruns']: d.rectangle([P(o[0], o[3]), P(o[1], o[2])], outline=(200, 0, 0), width=2)
    im = im.resize((im.width * 3 // 2, im.height * 3 // 2)); im.save(out)


if __name__ == '__main__':
    src, out = sys.argv[1:3]
    res = {}
    for k, f in (('fachada1', 'mykonos-fachada1.png'), ('fachada2', 'mykonos-fachada2.png')):
        m = measure(f'{src}/{f}'); res[k] = m
        if len(sys.argv) > 3: qa(f'{src}/{f}', m, sys.argv[3].replace('.png', f'-{k}.png'))
        print(k, 'px/m', m['pxPerM'], 'height', m['heightM'], 'frame', m['frame'], 'bays', len(m['bays']), 'windows', len(m['windows']), 'balconies', len(m['balconies']), 'overruns', m['overruns'])
    for m in res.values(): m.pop('_px')
    json.dump(res, open(out, 'w'), indent=1)
