"""Build the compact web model for a promotion from traced units + key-plan assembly.

Outputs (in <out_dir>):
  units/<CODE>.json   traced dwelling (published-plan orientation) for the interior viewer
  plans/<CODE>.jpg    source plan crop aligned to the traced grid (overlay for validation)
  building.json       per-level slab outline rects, placed unit walls/openings (building frame)
  validation.json     per-unit/per-room area error, key-plan IoU, placement source

Usage: python build_model.py <pdf_dir> <traced_dir> <assembly.json> <out_dir>
"""
import sys, os, json, glob, re, math
import numpy as np, pymupdf
from PIL import Image
from scipy import ndimage as ndi
sys.path.insert(0, os.path.dirname(__file__))
import trace as T

CELL = 0.05
MAX_ERR = 35.0  # dwellings whose raw trace deviates more than this (mean |Δ| %) are not published; others are fitted to the printed m²


def decode(u):
    vals = []
    for tok in u['grid'].split(','):
        v, c = tok.split(':'); vals += [int(v)] * int(c)
    return np.array(vals, np.int16).reshape(u['h'], u['w'])


def encode(g):
    flat = g.ravel(); out = []; i = 0
    while i < len(flat):
        j = i
        while j < len(flat) and flat[j] == flat[i]: j += 1
        out.append(f'{int(flat[i])}:{j - i}'); i = j
    return ','.join(out)


def sanitize_names(u):
    """Inferred names must not duplicate a printed one (e.g. a second 'Salón-Comedor' when OCR found the real one)."""
    printed = {r['name'] for r in u['rooms'] if not r.get('nameInferred')}
    for r in u['rooms']:
        if r.get('nameInferred') and r['name'] in printed and r['name'].startswith('Salón'):
            r['name'] = 'Cocina' if 5 <= r['area'] <= 16 and not any(x['type'] in ('kitchen', 'living_kitchen') for x in u['rooms']) else 'Estancia'
            r['type'] = 'kitchen' if r['name'] == 'Cocina' else 'other'
    seen = {}
    for r in u['rooms']:  # number repeated plain names: Dormitorio, Dormitorio → Dormitorio, Dormitorio 2
        base = r['name']; seen[base] = seen.get(base, 0) + 1
        if seen[base] > 1 and not re.search(r'\d$', base): r['name'] = f'{base} {seen[base]}'


def drop_phantoms(u):
    """Unnamed header values (útil/construida) sometimes survive as a 'room': drop them, give cells to a neighbour."""
    util = u.get('superficieUtil') or sum(r['area'] for r in u['rooms'])
    bad = [k for k, r in enumerate(u['rooms']) if r.get('nameInferred') and r['area'] > .6 * util]
    if not bad: return
    g = decode(u)
    for k in sorted(bad, reverse=True):
        v = k + 3; m = g == v
        ring = ndi.binary_dilation(m) & ~m; rv = g[ring]; rv = rv[(rv >= 3) & (rv != v)]
        g[m] = int(np.bincount(rv).argmax()) if rv.size else 0
        g[g > v] -= 1
        u['rooms'].pop(k)
    u['grid'] = encode(g)


def balance(u):
    """Move room boundaries (never walls) so each room matches its printed m². Cells are only
    exchanged between rooms that touch without a wall, i.e. open connections the tracer had to split."""
    g = decode(u)
    R = len(u['rooms']); vals = list(range(3, 3 + R))
    # enclosed holes (dark furniture/appliances read as 'nothing') belong to the room around them
    lab, n = ndi.label(g == 0)
    border = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0}
    for i in range(1, n + 1):
        if i in border: continue
        m = lab == i
        ring = ndi.binary_dilation(m) & ~m
        rv = g[ring]; rv = rv[rv >= 3]
        if rv.size: g[m] = np.bincount(rv).argmax()
    interior = [v for v in vals if u['rooms'][v - 3]['type'] not in ('exterior', 'laundry')] or vals
    cells = sum(int((g == v).sum()) for v in interior)
    if cells:  # grid sampling biases areas low: recalibrate the cell so interior rooms sum to the printed total
        u['cell'] = round(u['cell'] * math.sqrt(sum(u['rooms'][v - 3]['area'] for v in interior) / (cells * u['cell'] ** 2)), 6)
    c2 = u['cell'] ** 2
    target = {v: u['rooms'][v - 3]['area'] / c2 for v in vals}
    seed = {v: (u['rooms'][v - 3]['label'][1], u['rooms'][v - 3]['label'][0]) for v in vals}
    def nb(mask):
        o = np.zeros_like(mask)
        o[1:] |= mask[:-1]; o[:-1] |= mask[1:]; o[:, 1:] |= mask[:, :-1]; o[:, :-1] |= mask[:, 1:]
        return o
    moved = 0
    for _ in range(4000):
        cnt = {v: int((g == v).sum()) for v in vals}
        diff = {v: cnt[v] - target[v] for v in vals}
        best = None
        for A in vals:
            if diff[A] <= max(4, .015 * target[A]): continue
            mA = g == A; edge = nb(mA)
            for B in vals:
                if B == A or diff[B] >= -max(4, .015 * target[B]): continue
                reach = g == B
                circ = 'circulation' in (u['rooms'][A - 3]['type'], u['rooms'][B - 3]['type'])
                if circ:  # corridors may be split from rooms at a doorway the tracer could not seal
                    for _ in range(6): reach = reach | (nb(reach) & (g == 2))
                cand = mA & nb(reach)
                if not cand.any(): continue
                k = min(diff[A], -diff[B])
                if best is None or k > best[0]: best = (k, A, B, cand)
        if not best: break
        k, A, B, cand = best
        ys, xs = np.nonzero(cand)
        sy, sx = seed[B]
        order = np.argsort((ys - sy) ** 2 + (xs - sx) ** 2)[:max(1, int(k))]
        g[ys[order], xs[order]] = B; moved += len(order)
    for v in vals:
        r = u['rooms'][v - 3]
        r['tracedArea'] = r['measured']; r['tracedErrPct'] = r['errPct']
        r['measured'] = round(float((g == v).sum() * c2), 2)
        r['errPct'] = round((r['measured'] - r['area']) / r['area'] * 100, 1)
    u['grid'] = encode(g); u['balancedCells'] = moved


def detect_beds(u, sub, step):
    """Beds are drawn with lavender bedding on these plans: take their footprint from the raster."""
    a = sub.astype(int)
    lav = (a[..., 2] > a[..., 0] + 12) & (a[..., 2] > a[..., 1] + 10) & (a[..., 0] > 110) & (a[..., 2] > 165)
    # a bed is drawn as several pieces (pillows, duvet folds): group pieces closer than ~25 cm
    lav = ndi.binary_opening(lav, np.ones((3, 3)))
    grp, n = ndi.label(ndi.binary_dilation(lav, iterations=max(1, int(.19 / u['mPerSourcePx']))))
    lab = np.where(lav, grp, 0)
    g = decode(u); beds = []
    for i, sl in enumerate(ndi.find_objects(lab), 1):
        h = (sl[0].stop - sl[0].start) * u['mPerSourcePx']; w = (sl[1].stop - sl[1].start) * u['mPerSourcePx']
        lo, hi = sorted((w, h))
        if not (.7 <= lo <= 1.95 and 1.25 <= hi <= 2.4): continue
        x0, y0 = int(sl[1].start / step), int(sl[0].start / step); x1, y1 = int(sl[1].stop / step), int(sl[0].stop / step)
        sub_g = g[max(0, y0):y1, max(0, x0):x1]
        rooms = sub_g[sub_g >= 3]
        if not rooms.size: continue
        beds.append([x0, y0, x1 - x0, y1 - y0, int(np.bincount(rooms).argmax()) - 3])
    if beds: u['beds'] = beds


def clean(u):
    """Drop traced islands not connected to the dwelling (e.g. the key-plan thumbnail when the
    plan raster spans the whole page)."""
    g = decode(u)
    lab, n = ndi.label(g != 0, structure=np.ones((3, 3)))
    if n <= 1: return
    sizes = ndi.sum(g != 0, lab, range(1, n + 1)); keep = lab == (int(np.argmax(sizes)) + 1)
    removed = int(((g != 0) & ~keep).sum())
    g[~keep] = 0; u['grid'] = encode(g)
    u['openings'] = [o for o in u['openings'] if keep[o['y']:o['y'] + o['h'], o['x']:o['x'] + o['w']].any()]
    u['islandsRemovedCells'] = removed


def rects(mask):
    """Greedy rectangle cover of a boolean grid -> [x, y, w, h] in cells."""
    m = mask.copy(); out = []
    H, W = m.shape
    for y in range(H):
        x = 0
        while x < W:
            if not m[y, x]: x += 1; continue
            x1 = x
            while x1 < W and m[y, x1]: x1 += 1
            y1 = y + 1
            while y1 < H and m[y1, x:x1].all(): y1 += 1
            m[y:y1, x:x1] = False
            out.append([x, y, x1 - x, y1 - y]); x = x1
    return out


def rail_segments(ext, void):
    """Edges where a terrace/patio cell meets open air -> railing/parapet segments (cells)."""
    segs = []
    H, W = ext.shape
    for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nb = np.zeros_like(void)
        ys = slice(max(0, -dy), H - max(0, dy)); xs = slice(max(0, -dx), W - max(0, dx))
        yd = slice(max(0, dy), H - max(0, -dy) if max(0, -dy) else H); xd = slice(max(0, dx), W - max(0, -dx) if max(0, -dx) else W)
        nb[ys, xs] = void[yd, xd]
        edge = ext & nb
        # also the grid border counts as open air
        if dy == -1: edge[0] |= ext[0]
        if dy == 1: edge[-1] |= ext[-1]
        if dx == -1: edge[:, 0] |= ext[:, 0]
        if dx == 1: edge[:, -1] |= ext[:, -1]
        if dy:  # horizontal runs
            for y in range(H):
                x = 0
                while x < W:
                    if edge[y, x]:
                        x1 = x
                        while x1 < W and edge[y, x1]: x1 += 1
                        yy = y if dy < 0 else y + 1
                        if x1 - x >= 4: segs.append([x, yy, x1, yy])
                        x = x1
                    else: x += 1
        else:
            for x in range(W):
                y = 0
                while y < H:
                    if edge[y, x]:
                        y1 = y
                        while y1 < H and edge[y1, x]: y1 += 1
                        xx = x if dx < 0 else x + 1
                        if y1 - y >= 4: segs.append([xx, y, xx, y1])
                        y = y1
                    else: y += 1
    return segs


def place_by_structure(level_codes, units, ref_walls, slab, slab_off, key, res=0.1, taken0=None):
    """Place dwellings of a level whose key plan is ambiguous (ground floor, ático): maximise overlap of
    their walls with the structure of the adjacent typical floor, stay inside the level outline, avoid
    overlapping each other, and stay near the key-plan estimate when one exists. All grids in metres/res."""
    from scipy.signal import fftconvolve
    H, W = ref_walls.shape
    refd = ndi.binary_dilation(ref_walls, iterations=1).astype(float)
    slabf = slab.astype(float)
    taken = np.zeros((H, W), bool) if taken0 is None else taken0.copy()
    out = []
    order = sorted(level_codes, key=lambda c: -(key.get(c, {}).get('iou') or 0))
    for code in order:
        u = units[code]; g = decode(u); f = u['cell'] / res
        best = None
        rots = [key[code]['rot']] if code in key and key[code].get('iou', 0) > .8 else range(4)
        for rot in rots:
            gr = np.rot90(g, rot)
            hh, ww = max(1, int(gr.shape[0] * f)), max(1, int(gr.shape[1] * f))
            ys = (np.arange(hh) / f).astype(int).clip(0, gr.shape[0] - 1); xs = (np.arange(ww) / f).astype(int).clip(0, gr.shape[1] - 1)
            gs = gr[np.ix_(ys, xs)]
            wl = (gs == 1).astype(float); fp = (gs != 0).astype(float)
            if hh >= H or ww >= W: continue
            s_wall = fftconvolve(refd, wl[::-1, ::-1], mode='valid') / max(wl.sum(), 1)
            s_in = fftconvolve(slabf, fp[::-1, ::-1], mode='valid') / max(fp.sum(), 1)
            s_ov = fftconvolve(taken.astype(float), fp[::-1, ::-1], mode='valid') / max(fp.sum(), 1)
            score = 1.0 * s_wall + 3.0 * s_in - 8.0 * s_ov
            if code in key:
                ky, kx = key[code]['y'] / res, key[code]['x'] / res
                yy, xx = np.mgrid[0:score.shape[0], 0:score.shape[1]]
                score = score + .6 * np.exp(-((yy - ky) ** 2 + (xx - kx) ** 2) / (2 * (3.0 / res) ** 2))
            j = np.unravel_index(np.argmax(score), score.shape)
            if best is None or score[j] > best[0]:
                best = (float(score[j]), rot, j, fp > 0, float(s_wall[j]), float(s_in[j]), float(s_ov[j]))
        if best is None: continue
        sc, rot, (y, x), fpm, sw, si, so = best
        taken[y:y + fpm.shape[0], x:x + fpm.shape[1]] |= fpm
        out.append({'code': code, 'rot': rot, 'x': round(x * res, 2), 'y': round(y * res, 2),
                    'structureMatch': round(sw, 3), 'insideOutline': round(si, 3), 'overlap': round(so, 3)})
    return out


def best_offset(inner, outer, cell, search=24):
    """Shift (cells) of `outer` relative to `inner` maximising coverage of inner by outer."""
    best = (-1, 0, 0)
    H = max(inner.shape[0], outer.shape[0]) + 2 * search; W = max(inner.shape[1], outer.shape[1]) + 2 * search
    A = np.zeros((H, W), bool); A[search:search + inner.shape[0], search:search + inner.shape[1]] = inner
    for dy in range(-search, search + 1):
        for dx in range(-search, search + 1):
            B = np.zeros((H, W), bool)
            y0, x0 = search + dy, search + dx
            if y0 < 0 or x0 < 0 or y0 + outer.shape[0] > H or x0 + outer.shape[1] > W: continue
            B[y0:y0 + outer.shape[0], x0:x0 + outer.shape[1]] = outer
            sc = (A & B).sum() - 0.15 * (B & ~A).sum()
            if sc > best[0]: best = (sc, dx, dy)
    return best[1] * cell, best[2] * cell


def main(pdf_dir, traced, asm_path, out):
    os.makedirs(os.path.join(out, 'units'), exist_ok=True)
    os.makedirs(os.path.join(out, 'plans'), exist_ok=True)
    asm = json.load(open(asm_path)) if asm_path != 'none' else {'levels': {}, 'frame': ''}
    units = {}; rejected = {}
    for f in sorted(glob.glob(os.path.join(traced, '*.json'))):
        u = json.load(open(f))
        if 'COMPLETA' in u['code']: continue  # whole-floor sheets are not dwellings
        clean(u)
        err = (u.get('fit') or {}).get('meanAbsErrPct', 999)
        if err <= MAX_ERR: sanitize_names(u); drop_phantoms(u); balance(u)
        if err > MAX_ERR: rejected[u['code']] = {'source': u['source'], 'meanAbsErrPct': err}; continue
        units[u['code']] = u
    # ---- consensus placement for typical floors 1-4 (same letter = same column/row in the key plans)
    typ = {}
    for lv in '1234':
        for p in asm['levels'].get(lv, {}).get('units', []):
            typ.setdefault(p['code'][1:], []).append(p)
    consensus = {}
    for letter, ps in typ.items():
        good = [p for p in ps if p['iou'] >= 0.85 and abs(p['scaleDevPct']) < 5 and p['rot'] == 1] or ps
        consensus[letter] = {'x': float(np.median([p['x'] for p in good])), 'y': float(np.median([p['y'] for p in good])),
                             'rot': int(np.median([p['rot'] for p in good])), 'n': len(good)}
    validation = {'units': {}, 'method': (
        'Rooms traced from the plan raster of each published PDF; scale calibrated so the sum of traced interior '
        'rooms equals the sum of printed interior areas; sealing parameters chosen per unit to minimise mean '
        'absolute room-area error; placement from the blue highlight of the key plan printed on the same PDF.')}
    building = {'frame': asm['frame'], 'cell': CELL, 'storeyHeight': 3.3, 'groundStoreyHeight': 3.8, 'storeyHeightSource': 'medido en el alzado publicado mykonos-fachada1.png',
                'levels': {}}
    order = ['B', '1', '2', '3', '4', '5']
    for lv in order:
        L = asm['levels'].get(lv)
        if not L: continue
        slab = np.array([[c == '1' for c in r] for r in L['slab']['rows']])
        lev = {'slabCell': L['slab']['cell'], 'slab': rects(slab), 'outlineM': L['outlineM'], 'units': [],
               'placement': 'key-plan' if lv in '1234' else 'outline-only'}
        if lv in '1234':
            for letter in sorted(consensus):
                code = lv + letter
                if code not in units: continue
                c = consensus[letter]; u = units[code]
                g = np.rot90(decode(u), c['rot'])
                walls = rects(g == 1)
                op = np.zeros(g.shape, np.int16)
                og = np.zeros((u['h'], u['w']), np.int16)
                for i, o in enumerate(u['openings'], 1):
                    og[o['y']:o['y'] + o['h'], o['x']:o['x'] + o['w']] = i
                og = np.rot90(og, c['rot'])
                ops = []
                for i, sl in enumerate(ndi.find_objects(og), 1):
                    if sl is None: continue
                    o = u['openings'][i - 1]
                    if o['kind'] == 'door': continue  # interior doors are not visible from outside
                    ops.append([sl[1].start, sl[0].start, sl[1].stop - sl[1].start, sl[0].stop - sl[0].start, o['kind']])
                own = next((p for p in L['units'] if p['code'] == code), None)
                lev['units'].append({'code': code, 'x': round(c['x'], 2), 'y': round(c['y'], 2), 'w': g.shape[1], 'h': g.shape[0], 'cell': u['cell'],
                                     'walls': walls, 'openings': ops,
                                     'ext': rects(ext := np.isin(g, [k + 3 for k, r in enumerate(u['rooms']) if r['type'] == 'exterior'])),
                                     'rail': rail_segments(ext, g == 0),
                                     'placementSource': 'consenso plantas 1-4 por letra' if not own or own['iou'] < 0.85 or own['rot'] != c['rot'] else 'plano llave propio'})
        building['levels'][lv] = lev
    # ---- align outline-only levels to the typical floor (ground floor contains it; ático sits on it)
    def mask(lv):
        L = asm['levels'][lv]; return np.array([[c == '1' for c in r] for r in L['slab']['rows']])
    for lv in building['levels']: building['levels'][lv]['offset'] = [0.0, 0.0]
    if 'B' in building['levels'] and '1' in asm['levels']:
        dx, dy = best_offset(mask('1'), mask('B'), 0.25)
        building['levels']['B']['offset'] = [dx, dy]
    if '5' in building['levels'] and '4' in asm['levels']:
        sc, dx, dy = -1, 0, 0
        m4, m5 = mask('4'), mask('5')
        dx, dy = best_offset(m5, m4, 0.25)  # where level 4 sits relative to level 5
        building['levels']['5']['offset'] = [-dx, -dy]
    # ---- ground floor and ático: structure-matched placement (frame = level-1 key outline, metres)
    res = 0.1
    def level_walls(lv):
        L = building['levels'].get(lv)
        if not L: return None
        Wm = max(pu['x'] + pu['w'] * pu['cell'] for pu in L['units']) + 12; Hm = max(pu['y'] + pu['h'] * pu['cell'] for pu in L['units']) + 12
        m = np.zeros((int(Hm / res) + 60, int(Wm / res) + 60), bool)
        for pu in L['units']:
            for x, y, w, h in pu['walls']:
                m[int((pu['y'] + y * pu['cell']) / res) + 30:int((pu['y'] + (y + h) * pu['cell']) / res) + 30,
                  int((pu['x'] + x * pu['cell']) / res) + 30:int((pu['x'] + (x + w) * pu['cell']) / res) + 30] = True
        return m
    for lv, ref in (('B', '1'), ('5', '4')):
        if lv not in building['levels'] or ref not in building['levels'] or not building['levels'][ref]['units']: continue
        refw = level_walls(ref)
        L = asm['levels'][lv]; sc_ = L['slab']['cell']; ox, oy = building['levels'][lv]['offset']
        slab = np.zeros_like(refw)
        for x, y, w, h in building['levels'][lv]['slab']:
            slab[int((oy + y * sc_) / res) + 30:int((oy + (y + h) * sc_) / res) + 30, int((ox + x * sc_) / res) + 30:int((ox + (x + w) * sc_) / res) + 30] = True
        key = {p['code']: {'rot': p['rot'], 'iou': p['iou'], 'x': p['x'] + ox + 3, 'y': p['y'] + oy + 3} for p in L['units']}
        codes = sorted(c for c in units if (c.startswith('B') if lv == 'B' else c.startswith('5')))
        # the stair/lift core of the typical floor continues down/up: reserve it
        R = building['levels'][ref]; core = np.zeros_like(refw); cov = np.zeros_like(refw)
        for x, y, w, h in R['slab']:
            core[int(y * R['slabCell'] / res) + 30:int((y + h) * R['slabCell'] / res) + 30, int(x * R['slabCell'] / res) + 30:int((x + w) * R['slabCell'] / res) + 30] = True
        for pu in R['units']:
            cov[int(pu['y'] / res) + 30:int((pu['y'] + pu['h'] * pu['cell']) / res) + 30, int(pu['x'] / res) + 30:int((pu['x'] + pu['w'] * pu['cell']) / res) + 30] = True
        core &= ~ndi.binary_dilation(cov, iterations=3)
        placed = place_by_structure(codes, units, refw, slab, (ox, oy), key, res, taken0=core)
        for pl in placed:
            u = units[pl['code']]; g = np.rot90(decode(u), pl['rot'])
            og = np.zeros((u['h'], u['w']), np.int16)
            for i, o in enumerate(u['openings'], 1): og[o['y']:o['y'] + o['h'], o['x']:o['x'] + o['w']] = i
            og = np.rot90(og, pl['rot']); ops = []
            for i, sl in enumerate(ndi.find_objects(og), 1):
                if sl is None or u['openings'][i - 1]['kind'] == 'door': continue
                ops.append([sl[1].start, sl[0].start, sl[1].stop - sl[1].start, sl[0].stop - sl[0].start, u['openings'][i - 1]['kind']])
            ext = np.isin(g, [k + 3 for k, r in enumerate(u['rooms']) if r['type'] == 'exterior'])
            building['levels'][lv]['units'].append({'code': pl['code'], 'x': round(pl['x'] - 3, 2), 'y': round(pl['y'] - 3, 2),
                'w': g.shape[1], 'h': g.shape[0], 'cell': u['cell'], 'walls': rects(g == 1), 'openings': ops, 'ext': rects(ext),
                'rail': rail_segments(ext, g == 0), 'placementSource': 'ajuste a la estructura de la planta %s + plano llave' % ref,
                'fit': {k: pl[k] for k in ('structureMatch', 'insideOutline', 'overlap')}})
        building['levels'][lv]['placement'] = 'structure-matched'
    # ---- per-unit files, plan overlays and validation
    for code, u in units.items():
        doc = pymupdf.open(os.path.join(pdf_dir, u['source'])); page = doc[0]
        a, rect = T.main_raster(doc, page)
        x0, y0, x1, y1 = u['crop']
        im = Image.fromarray(a[y0:y1, x0:x1])
        im.thumbnail((1100, 1100)); im.save(os.path.join(out, 'plans', code + '.jpg'), quality=72, optimize=True)
        detect_beds(u, a[y0:y1, x0:x1], CELL / u['mPerSourcePx'])
        slim = {k: v for k, v in u.items() if k not in ('crop', 'sourcePx', 'mPerSourcePx')}
        # hob symbol (dark red/black glass-ceramic drawn on the plan) anchors the kitchen run
        sub = a[y0:y1, x0:x1].astype(int)
        hob = (sub[..., 0] > 55) & (sub[..., 0] < 140) & (sub[..., 1] < 45) & (sub[..., 2] < 50)
        hl, hn = ndi.label(ndi.binary_opening(hob, np.ones((3, 3))))
        if hn:
            sizes = ndi.sum(hob, hl, range(1, hn + 1)); j = int(np.argmax(sizes)) + 1
            if sizes[j - 1] > 150:
                cy, cx = ndi.center_of_mass(hob, hl, j); step = CELL / u['mPerSourcePx']
                slim['hob'] = [round(cx / step, 1), round(cy / step, 1)]
        slim['promotion'] = os.path.basename(os.path.normpath(out))
        slim['level'] = 'B' if code.startswith('B') else code[0]
        json.dump(slim, open(os.path.join(out, 'units', code + '.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
        placed = None
        for lv, L in asm['levels'].items():
            for p in L['units']:
                if p['code'] == code: placed = p
        validation['units'][code] = {
            'source': u['source'], 'superficieUtil': u['superficieUtil'], 'fit': u.get('fit'),
            'rooms': [{'name': r['name'], 'printed': r['area'], 'model': r['measured'], 'errPct': r['errPct'],
                       'rawTrace': r.get('tracedArea', r['measured']), 'rawErrPct': r.get('tracedErrPct', r['errPct']),
                       'boundaryInferred': r['splitInferred'], 'nameInferred': r.get('nameInferred', False)} for r in u['rooms']],
            'labelsFrom': u.get('labelsFrom', 'pdf-text'), 'beds': len(u.get('beds', [])),
            'openings': {k: sum(1 for o in u['openings'] if o['kind'] == k) for k in ('door', 'window', 'balcony_door', 'entrance')},
            'entranceMarkerFound': u.get('entrance') is not None,
            'keyPlan': {k: placed[k] for k in ('iou', 'rot', 'scaleDevPct')} if placed else None,
        }
    json.dump(building, open(os.path.join(out, 'building.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    validation['rejected'] = rejected
    json.dump(validation, open(os.path.join(out, 'validation.json'), 'w'), ensure_ascii=False, indent=1)
    index = [{'code': c, 'title': u['title'], 'source': u['source'], 'util': u['superficieUtil'], 'built': u['superficieConstruida'],
              'bedrooms': sum(1 for r in u['rooms'] if r['type'] == 'bedroom'), 'baths': sum(1 for r in u['rooms'] if r['type'] == 'bath'),
              'kitchen': 'separada' if any(r['type'] == 'kitchen' for r in u['rooms']) else 'integrada' if any(r['type'] == 'living_kitchen' for r in u['rooms']) else None,
              'meanAbsErrPct': (u.get('fit') or {}).get('meanAbsErrPct')} for c, u in sorted(units.items())]
    json.dump({'promotion': os.path.basename(os.path.normpath(out)), 'units': index, 'hasBuilding': bool(building['levels'])},
              open(os.path.join(out, 'index.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
    print({lv: len(L['units']) for lv, L in building['levels'].items()}, os.path.getsize(os.path.join(out, 'building.json')))


if __name__ == '__main__':
    main(*sys.argv[1:])
