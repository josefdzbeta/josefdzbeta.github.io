"""Trace published Bamaire dwelling plans (raster plan inside a PDF with vector room labels)
into a compact metric grid used by the web explorer.

Evidence chain
- Walls, room extents, openings and terraces are traced from the plan raster.
- Scale is calibrated from the printed net room areas (m2) in the same PDF.
- Heights are NOT published: they are emitted as inferred defaults by the web viewer.

Usage: python trace.py <pdf> <out.json> [--qa out.png] [--code 1A]
Requires: pymupdf, numpy, scipy, pillow.
"""
import io, os, json, re, sys, math, argparse
import numpy as np
import pymupdf
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

AREA_RE = re.compile(r'^\s*(\d+[.,]\d+)\s*m\s*2?\s*²?\s*$')
CELL_M = 0.05
DEBUG = False  # output grid resolution (metres)


def norm_type(name):
    if not name: return "other"
    n = name.lower()
    n = n.replace('ñ', 'n').replace('ó', 'o').replace('í', 'i').replace('é', 'e').replace('á', 'a')
    if 'bano' in n or 'aseo' in n: return 'bath'
    if 'salon-comedor-cocina' in n or ('salon' in n and 'cocina' in n): return 'living_kitchen'
    if 'cocina' in n: return 'kitchen'
    if 'lavadero' in n or 'tendedero' in n: return 'laundry'
    if 'terraza' in n or 'patio' in n or 'porche' in n: return 'exterior'
    if 'dormit' in n: return 'bedroom'
    if 'salon' in n or 'estar' in n: return 'living'
    if 'distrib' in n or 'pasillo' in n or 'vestibulo' in n or 'hall' in n or 'recibidor' in n: return 'circulation'
    if 'vestidor' in n: return 'dressing'
    return 'other'


def page_lines(page):
    lines = []
    for b in page.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            t = ''.join(s['text'] for s in l['spans']).strip()
            if t: lines.append((t, l['bbox']))
    return lines


def ocr_lines(page, zoom=4.0, light=False):
    """Plans without a text layer: OCR the rendered page with Tesseract (unrotated page frame)."""
    import subprocess, tempfile, csv
    tmp = pymupdf.open(); tmp.insert_pdf(page.parent, from_page=page.number, to_page=page.number)
    tp = tmp[0]; tp.set_rotation(0)
    pm = tp.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
    # keep only glyph-sized dark strokes (walls, hatching and furniture textures confuse OCR)
    rgb = np.asarray(Image.frombytes('RGB', (pm.width, pm.height), pm.samples)).astype(int)
    g = rgb.mean(2)
    dark = (g < 110) & ((rgb.max(2) - rgb.min(2)) < 40)
    lab, n = ndi.label(dark)
    keep = np.zeros(n + 1, bool)
    for i, ob in enumerate(ndi.find_objects(lab), 1):
        h, w = ob[0].stop - ob[0].start, ob[1].stop - ob[1].start
        keep[i] = 10 * zoom / 4 <= h <= 70 * zoom / 4 and w <= 80 * zoom / 4
    txt = keep[lab]
    if light:  # light text on dark floors (e.g. Perseo): same glyph filter on bright strokes
        bright = (g > 205) & ((rgb.max(2) - rgb.min(2)) < 30)
        lab2, n2 = ndi.label(bright); keep2 = np.zeros(n2 + 1, bool)
        for i, ob in enumerate(ndi.find_objects(lab2), 1):
            h, w = ob[0].stop - ob[0].start, ob[1].stop - ob[1].start
            keep2[i] = 10 * zoom / 4 <= h <= 70 * zoom / 4 and w <= 80 * zoom / 4
        txt = txt | keep2[lab2]
    clean = Image.fromarray(np.where(txt, 0, 255).astype(np.uint8))
    with tempfile.TemporaryDirectory() as d:
        f = os.path.join(d, 'p.png'); clean.save(f)
        out = subprocess.run(['tesseract', f, '-', '--psm', '11', 'tsv'], capture_output=True, text=True).stdout
    words = [r for r in csv.DictReader(out.splitlines(), delimiter='\t', quoting=csv.QUOTE_NONE) if r.get('text', '').strip() and float(r.get('conf', -1)) > 30]
    # group words into lines by proximity (psm 11 = sparse text)
    words.sort(key=lambda r: (int(r['top']), int(r['left'])))
    lines = []
    for r in words:
        x, y, w, h = (int(r[k]) / zoom for k in ('left', 'top', 'width', 'height'))
        for L in lines:
            lx0, ly0, lx1, ly1 = L[1]
            if abs(ly0 - y) < h * .6 and 0 <= x - lx1 < h * 1.5:
                L[0] += ' ' + r['text']; L[1] = [lx0, min(ly0, y), x + w, max(ly1, y + h)]; break
        else:
            lines.append([r['text'], [x, y, x + w, y + h]])
    def fix(t):
        t = re.sub(r'(\d)\s*[.,]\s*(\d\d)\s*m\s*[2²?"]?', r'\1,\2 m2', t)
        t = re.sub(r'^(\d{1,2})\s?(\d\d)\s*m\s*[2²?"]?\s*\|?$', r'\1,\2 m2', t)  # decimal comma lost by OCR
        return t
    return [(fix(t), tuple(b)) for t, b in lines]


def pair_geometric(lines):
    """OCR output is noisy and unordered: pair each area with the closest name line just above it."""
    areas = [(t, b) for t, b in lines if AREA_RE.match(t.replace(' ', ''))]
    names = [(t, b) for t, b in lines if re.match(r'^[A-Za-zÁÉÍÓÚáéíóúñÑ][A-Za-zÁÉÍÓÚáéíóúñÑ .\-/]{2,}$', t)
             and not re.search(r'SUPER|CONSTRU|PORTAL|VENTA|bamaire|PILARA|REGIMEN|INFORMA', t, re.I)]
    out = []
    for t, b in areas:
        h = b[3] - b[1]
        best = None
        for n, nb in names:
            dy = b[1] - nb[3]; dx = abs(nb[0] - b[0])
            if -h * .5 < dy < h * 2.2 and dx < 60:
                sc = dy + dx * .3
                if best is None or sc < best[0]: best = (sc, n, nb)
        area = float(AREA_RE.match(t.replace(' ', '')).group(1).replace(',', '.'))
        if best:
            out.append({'name': best[1].replace('Salon', 'Salón').replace('Bano', 'Baño').replace(' Comedor', '-Comedor'), 'area': area,
                        'pt': ((best[2][0] + b[0]) / 2 + 8, (best[2][1] + b[3]) / 2)})
        else:
            out.append({'name': None, 'area': area, 'pt': ((b[0] + b[2]) / 2, (b[1] + b[3]) / 2)})
    return out


def labels_from_page(page, lines=None):
    """Pair room-name lines with the following area line; areas without a name become unnamed labels."""
    lines = lines if lines is not None else page_lines(page)
    out, pending = [], []
    head = None
    for t, bb in lines:
        if t.startswith('PORTAL') or 'PORTAL' in t: head = t
        tt = t.replace(' ', '')
        if AREA_RE.match(tt) or AREA_RE.match(t):
            area = float(AREA_RE.match(tt).group(1).replace(',', '.'))
            if pending:
                name = ' '.join(p[0] for p in pending)
                x0 = min(p[1][0] for p in pending); y0 = min(p[1][1] for p in pending)
                out.append({'name': name.replace('descub.', 'descubierta'), 'area': area,
                            'pt': ((x0 + bb[0]) / 2 + 8, (y0 + bb[3]) / 2)})
            else:
                out.append({'name': None, 'area': area, 'pt': ((bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2)})
            pending = []
        elif re.match(r'^[A-Za-zÁÉÍÓÚáéíóúñÑ]', t) and len(t) < 40 and not re.match(r'^(\S\s){3,}', t) and len(t) > 2 and 'SUPERFICIE' not in t.upper() and 'Calle' not in t \
                and 'PORTAL' not in t and 'Este documento' not in t and 'www' not in t:
            if pending and abs(pending[-1][1][3] - bb[1]) > 30: pending = []
            pending.append((t, bb))
        else:
            pending = []
    txt = ' | '.join(t for t, _ in lines)
    util = re.search(r'SUPERFICIE [ÚU]TIL\s*\|?\s*([\d.,]+)', txt, re.I)
    built = re.search(r'CONSTRUIDA[^|]*\|\s*([\d.,]+)', txt, re.I)
    f = lambda m: float(m.group(1).replace('.', '').replace(',', '.')) if m else None
    return out, f(util), f(built), head


def main_raster(doc, page, clip=None):
    """Composite the plan raster. Some PDFs hold one image, others tile it, and some keep
    an unused off-page copy; only images mostly inside the page and left of the key plan count."""
    pr = page.mediabox if page.rotation else page.rect
    parts = []
    for info in page.get_images(full=True):
        xref = info[0]
        for r in page.get_image_rects(xref):
            inter = r & pr
            if r.is_empty or inter.is_empty: continue
            if inter.width * inter.height < 0.5 * r.width * r.height: continue
            if r.width * r.height < 2000 or (not page.rotation and r.x0 > 0.7 * pr.width and r.width * r.height < 90000): continue
            parts.append((xref, r, info[2], info[3]))
    if not parts: raise ValueError('no plan raster')
    ppt = max(w / r.width for _, r, w, _ in parts)
    U = parts[0][1]
    for _, r, _, _ in parts[1:]: U = U | r
    U = U & pr
    if clip is not None: U = U & clip
    ppt = min(ppt, 2400 / max(U.width, U.height))
    # render the plan area with text removed (images may be tiled or rotated inside the PDF)
    tmp = pymupdf.open(); tmp.insert_pdf(doc, from_page=page.number, to_page=page.number)
    tp = tmp[0]; tp.set_rotation(0)
    for b in tp.get_text('dict')['blocks']:
        if b.get('type') == 0: tp.add_redact_annot(b['bbox'])
    tp.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=0)
    pm = tp.get_pixmap(clip=U, matrix=pymupdf.Matrix(ppt, ppt), alpha=False)
    im = Image.frombytes('RGB', (pm.width, pm.height), pm.samples)
    return np.asarray(im), U


def key_raster(doc, page, plan_rect):
    """Second raster on the right-hand side: the published key plan."""
    cands = []
    for info in page.get_images(full=True):
        for r in page.get_image_rects(info[0]):
            if r.x0 > plan_rect.x1 - 120 and 120 < r.width < 400 and r.y0 > 150:
                cands.append((r.width * r.height, info[0], r))
    if not cands: return None, None
    _, xref, r = max(cands)
    raw = doc.extract_image(xref)
    return np.asarray(Image.open(io.BytesIO(raw['image'])).convert('RGB')), r


def wall_mask(a, mode='dark'):
    mx = a.max(2).astype(int); mn = a.min(2).astype(int)
    if mode == 'white':  # warm off-white walls on a pure-white sheet (e.g. Ciudad de Évora)
        m = (mx < 248) & (mn > 195) & ((mx - mn) < 32)
        m = ndi.binary_opening(m, np.ones((3, 3)))
        lab, n = ndi.label(m)
        if n:
            sizes = ndi.sum(m, lab, range(1, n + 1)); big = sizes.max()
            m = np.isin(lab, [i + 1 for i, v in enumerate(sizes) if v > .1 * big])
        return m, None
    else:
        m = (mx < 112) & ((mx - mn) < 34)
    m = ndi.binary_opening(m, np.ones((3, 3)))
    lab, n = ndi.label(m)
    sizes = ndi.sum(m, lab, range(1, n + 1))
    keep = np.zeros(n + 1, bool)
    W = a.shape[1]
    for i, sl in enumerate(ndi.find_objects(lab), 1):
        ext = max(sl[0].stop - sl[0].start, sl[1].stop - sl[1].start)
        # walls are long/thin networks; compact dark blobs are appliances or furniture
        keep[i] = sizes[i - 1] > 2500 and ext > 0.06 * W
    return keep[lab], None


def seal_gaps(w, max_gap, max_thick):
    """Close door/window gaps in wall lines; return sealed mask and gap components."""
    gaps = np.zeros_like(w)
    for axis in (1, 0):
        k = np.ones((1, max_gap)) if axis == 1 else np.ones((max_gap, 1))
        add = ndi.binary_closing(w, k) & ~w
        lab, n = ndi.label(add)
        for i, sl in enumerate(ndi.find_objects(lab), 1):
            h = sl[0].stop - sl[0].start; ww = sl[1].stop - sl[1].start
            thick, length = (h, ww) if axis == 1 else (ww, h)
            if thick <= max_thick and length >= max_thick * 0.8 and length <= max_gap:
                gaps[sl] |= lab[sl] == i
    return w | gaps, gaps


def trace(pdf, code=None, qa=None, gap=0.15, thick=0.03, _cache={}, wallmode='dark', clip=None, light_ocr=False):
    doc = pymupdf.open(pdf); page = doc[0]
    ck = (pdf, tuple(clip) if clip is not None else None)
    if ck not in _cache:
        _cache.clear()
        lines = page_lines(page); ocr = False
        if not any(AREA_RE.match(t.replace(' ', '')) for t, _ in lines):
            lines = ocr_lines(page, light=light_ocr); ocr = True
        labs = labels_from_page(page, lines)
        if ocr: labs = (pair_geometric(lines),) + labs[1:]
        _cache[ck] = (main_raster(doc, page, pymupdf.Rect(clip) if clip is not None else None), labs, ocr)
    (a, rect), (labels0, util, built, head), ocr = _cache[ck]
    labels = [dict(L) for L in labels0]
    # unnamed areas outside the plan raster are the header values (superficie útil / construida)
    inside = [L for L in labels if (L['name'] and clip is None) or rect.contains(pymupdf.Point(*L['pt']))]
    hdr = sorted(L['area'] for L in labels if L not in inside)
    if util is None and len(hdr) >= 2: util, built = hdr[0], hdr[-1]
    labels = [L for L in inside if L['name'] or not any(v and abs(L['area'] - v) < .02 for v in (util, built))]
    H, W = a.shape[:2]
    ppt = W / rect.width  # raster px per PDF point
    to_px = lambda pt: ((pt[0] - rect.x0) * ppt, (pt[1] - rect.y0) * ppt)
    w, out_fp = wall_mask(a, wallmode)
    white = (a.min(2) > 243)
    outside = ndi.label(white | ~ndi.binary_dilation(np.ones_like(w), iterations=0))[0]
    # flood white background from the image border
    lab_w, _ = ndi.label(white)
    border = set(np.unique(np.r_[lab_w[0], lab_w[-1], lab_w[:, 0], lab_w[:, -1]])) - {0}
    out = np.isin(lab_w, list(border))
    if out_fp is not None: out = out_fp
    # remove raster content beyond the plan (logos etc. are vector, so the raster is the plan)
    max_gap = int(round(gap * W)); max_thick = int(round(thick * W))
    sealed, gaps = seal_gaps(w, max_gap, max_thick)
    free = ndi.binary_opening(~w & ~out, np.ones((5, 5)))
    dist = ndi.distance_transform_edt(free)
    from skimage.segmentation import watershed
    fy, fx = np.nonzero(free)
    rooms = []
    seeds = []
    for L in labels:
        x, y = to_px(L['pt'])
        xi, yi = int(np.clip(x, 0, W - 1)), int(np.clip(y, 0, H - 1))
        if not free[yi, xi]:
            j = ((fx - xi) ** 2 + (fy - yi) ** 2).argmin(); xi, yi = fx[j], fy[j]
        L['px'] = (x, y); rooms.append(L); seeds.append((yi, xi))

    # 1) rooms bounded by walls + sealed door/window gaps
    comp, cn = ndi.label(ndi.binary_opening(~sealed & ~out, np.ones((5, 5))))
    markers = np.zeros((H, W), np.int32)
    by_comp = {}
    for k, (yi, xi) in enumerate(seeds, 1):
        c = int(comp[yi, xi])
        if c == 0:  # label drawn over a wall line or furniture: nearest component pixel
            win = comp[max(0, yi - 60):yi + 60, max(0, xi - 60):xi + 60]
            ys, xs = np.nonzero(win)
            if len(ys):
                j = ((ys - 60) ** 2 + (xs - 60) ** 2).argmin(); c = int(win[ys[j], xs[j]])
        by_comp.setdefault(c, []).append(k)
        if DEBUG: print('seed', rooms[k-1]['name'], (xi, yi), 'comp', c)
    for c, ks in by_comp.items():
        if c and len(ks) == 1:
            markers[comp == c] = ks[0]
        elif c and all(norm_type(rooms[k - 1]['name']) in ('exterior', 'laundry') for k in ks):
            m = comp == c
            yy, xx = np.nonzero(m)
            d = np.stack([(xx - seeds[k - 1][1]) ** 2 + (yy - seeds[k - 1][0]) ** 2 for k in ks])
            markers[yy, xx] = np.array(ks)[d.argmin(0)]
            for k in ks: rooms[k - 1]['split'] = True
        else:  # 2) several labels in one open region: split at narrowings between room cores
            m = (comp == c) if c else free
            pts = np.zeros((H, W), np.int32)
            for k in ks:
                yi, xi = seeds[k - 1]
                # move the seed to the most open point near the printed label
                r0 = 90
                win = (dist * m)[max(0, yi - r0):yi + r0, max(0, xi - r0):xi + r0]
                j = np.unravel_index(win.argmax(), win.shape)
                yi, xi = max(0, yi - r0) + j[0], max(0, xi - r0) + j[1]
                seeds[k - 1] = (yi, xi)
            for k in ks:
                yi, xi = seeds[k - 1]
                core = None
                for t in (25, 35, 45, 55, 65, 80, 95, 110, 130, 150, 175, 200):
                    if dist[yi, xi] <= t: break
                    cl, _ = ndi.label(m & (dist > t))
                    i = cl[yi, xi]
                    if all(cl[seeds[q - 1]] != i for q in ks if q != k):
                        core = cl == i; break
                if core is None:
                    core = np.zeros((H, W), bool); core[max(0, yi - 5):yi + 5, max(0, xi - 5):xi + 5] = True
                pts[core & (pts == 0)] = k
                if c: rooms[k - 1]['split'] = True
            sub = watershed(-dist, pts, mask=m | (pts > 0))
            markers[m] = sub[m]
    room_map = watershed(-dist, markers, mask=free | (markers > 0)).astype(np.int16)
    # unlabeled free pockets join the adjacent room
    rest = free & (room_map == 0)
    rl, rn = ndi.label(rest)
    for i in range(1, rn + 1):
        m = rl == i
        ring = ndi.binary_dilation(m, iterations=int(max_thick * 1.4)) & (room_map > 0)
        if ring.any():
            room_map[m] = np.bincount(room_map[ring]).argmax()
    # exterior rooms that touch another exterior room without a wall: boundary is inferred
    for i, L in enumerate(rooms, 1):
        if norm_type(L['name']) != 'exterior': continue
        m = ndi.binary_dilation(room_map == i, iterations=2)
        for j, L2 in enumerate(rooms, 1):
            if j != i and norm_type(L2['name']) == 'exterior' and (m & (room_map == j)).any():
                L['split'] = True
    # rooms printed without a name (Évora, Orión, Argo…): infer the use from the drawing
    if any(L['name'] is None for L in rooms):
        hobm = ndi.binary_opening(a.max(2) < 50, np.ones((5, 5)))
        feats = []
        for i, L in enumerate(rooms, 1):
            m = room_map == i
            if L['name'] is not None or not m.any(): continue
            ring = ndi.binary_dilation(m, iterations=4) & ~m
            frac_out = (ring & out).sum() / max(ring.sum(), 1)
            px = a[m].astype(float) / 255
            mx, mn = px.max(1), px.min(1)
            sat = np.median((mx - mn) / np.maximum(mx, 1e-3)); r_, g_, b_ = np.median(px, 0)
            wood = sat > .22 and r_ > g_ > b_ and r_ > .3
            halfw = dist[m].max() * math.sqrt(L['area'] / max(m.sum(), 1))
            hob_px = (hobm & m).sum() * L['area'] / max(m.sum(), 1)  # m² of black glass/appliance inside the room
            feats.append((L, frac_out, .12 < hob_px < 1.2 and not wood, wood, halfw))
        for L, fo, hob, wood, hw in feats:
            t = ('Terraza' if fo > .3 and not wood else 'Cocina' if hob else 'Baño' if L['area'] <= 8 and not wood
                 else 'Distribuidor' if hw < .62 and L['area'] < 14 else None)
            L['name'] = t; L['nameInferred'] = True
        rest = sorted([f[0] for f in feats if f[0]['name'] is None], key=lambda L: -L['area'])
        if rest and rest[0]['area'] >= 14: rest[0]['name'] = 'Salón-Comedor'; rest = rest[1:]
        for n, L in enumerate([L for L in rest if L['area'] >= 6], 1): L['name'] = f'Dormitorio {n}'
        for L in rest:
            if L['name'] is None: L['name'] = 'Estancia'
        for kind in ('Baño', 'Terraza'):
            same = sorted([L for L in rooms if L.get('nameInferred') and L['name'] == kind], key=lambda L: -L['area'])
            if len(same) > 1:
                for n, L in enumerate(same, 1): L['name'] = f'{kind} {n}'
    # scale: total printed interior area vs traced interior pixels (split errors cancel in the sum)
    tot_a = tot_px = 0
    for i, L in enumerate(rooms, 1):
        px = (room_map == i).sum(); L['px_area'] = int(px)
        if norm_type(L['name']) not in ('exterior', 'laundry'):
            tot_a += L['area']; tot_px += px
    m2px = tot_a / tot_px
    mpp = math.sqrt(m2px)  # metres per raster pixel
    for L in rooms:
        L['measured'] = round(L['px_area'] * m2px, 2)
        L['err'] = round((L['measured'] - L['area']) / L['area'] * 100, 1)
    # crop to plan content
    content = (sealed | (room_map > 0))
    ys, xs = np.nonzero(content)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    # resample to CELL_M grid
    step = CELL_M / mpp
    gw, gh = int(math.ceil((x1 - x0) / step)), int(math.ceil((y1 - y0) / step))
    sx = (x0 + (np.arange(gw) + .5) * step).astype(int).clip(0, W - 1)
    sy = (y0 + (np.arange(gh) + .5) * step).astype(int).clip(0, H - 1)
    gw_wall = w[np.ix_(sy, sx)]
    g_gap = gaps[np.ix_(sy, sx)]
    g_room = room_map[np.ix_(sy, sx)]
    grid = np.zeros((gh, gw), np.int16)  # 0 void, 1 wall, 2 opening, 3+k room k
    grid[g_room > 0] = g_room[g_room > 0] + 2
    grid[g_gap] = 2
    grid[gw_wall] = 1
    # openings
    gl, gn = ndi.label(grid == 2)
    openings = []
    rtype = lambda k: norm_type(rooms[k - 3]['name']) if k >= 3 else ('void' if k == 0 else 'wall')
    for i, sl in enumerate(ndi.find_objects(gl), 1):
        h = sl[0].stop - sl[0].start; ww = sl[1].stop - sl[1].start
        horiz = ww >= h
        length = (ww if horiz else h) * CELL_M
        if length < 0.45: continue
        cy0, cx0 = (sl[0].start + sl[0].stop) // 2, (sl[1].start + sl[1].stop) // 2
        def walk(dy, dx):
            y, x = cy0, cx0
            for _ in range(40):
                y += dy; x += dx
                if not (0 <= y < gh and 0 <= x < gw): return 0
                if grid[y, x] not in (1, 2): return grid[y, x]
            return 0
        side_a, side_b = (walk(-1, 0), walk(1, 0)) if horiz else (walk(0, -1), walk(0, 1))
        ta, tb = rtype(int(side_a)), rtype(int(side_b))
        ext = 'void' in (ta, tb) or 'exterior' in (ta, tb)
        if ext and ('exterior' in (ta, tb) and ('void' not in (ta, tb))):
            kind = 'balcony_door' if length >= 0.7 else 'window'
        elif ext:
            kind = 'window'
        else:
            kind = 'door'
        openings.append({'x': sl[1].start, 'y': sl[0].start, 'w': ww, 'h': h, 'len': round(length, 2),
                         'kind': kind, 'between': [ta, tb]})
    # entrance: blue marker triangle (published "acceso" symbol)
    tri = None
    entrance = None
    for dr in page.get_drawings():
        f = dr.get('fill'); r = dr['rect']
        if f and len(dr['items']) == 3 and all(i[0] == 'l' for i in dr['items']) and f[2] > 0.65 and f[0] < 0.3 \
                and 15 < r.width < 60 and 15 < r.height < 60 and rect.contains(r):
            tri = r
    if tri is not None:
        cx, cy = to_px(((tri.x0 + tri.x1) / 2, (tri.y0 + tri.y1) / 2))
        gx, gy = (cx - x0) / step, (cy - y0) / step
        entrance = [round(gx, 1), round(gy, 1)]
        best = None
        for o in openings:
            if 'void' not in o['between'] and 'exterior' not in o['between']: continue
            d = math.hypot(o['x'] + o['w'] / 2 - gx, o['y'] + o['h'] / 2 - gy)
            if best is None or d < best[0]: best = (d, o)
        if best and best[0] * CELL_M < 3.0:
            best[1]['kind'] = 'entrance'
    # RLE encode grid
    flat = grid.ravel(); rle = []
    i = 0
    while i < len(flat):
        j = i
        while j < len(flat) and flat[j] == flat[i] and j - i < 65535: j += 1
        rle.append([int(flat[i]), j - i]); i = j
    res = {
        'source': pdf.split('/')[-1], 'code': code, 'title': head, 'labelsFrom': 'ocr' if ocr else 'pdf-text',
        'superficieUtil': util, 'superficieConstruida': built,
        'cell': CELL_M, 'w': gw, 'h': gh, 'mPerSourcePx': round(mpp, 6),
        'crop': [int(x0), int(y0), int(x1), int(y1)], 'sourcePx': [W, H],
        'rooms': [{'name': L['name'], 'type': norm_type(L['name']), 'area': L['area'],
                   'measured': L['measured'], 'errPct': L['err'], 'splitInferred': bool(L.get('split')),
                   'nameInferred': bool(L.get('nameInferred')),
                   'label': [round((L['px'][0] - x0) / step, 1), round((L['px'][1] - y0) / step, 1)]}
                  for L in rooms],
        'openings': [{k: v for k, v in o.items()} for o in openings],
        'entrance': entrance,
        'grid': ''.join(f'{v}:{c},' for v, c in rle).rstrip(','),
    }
    if qa:
        sub = Image.fromarray(a[y0:y1, x0:x1]).convert('RGB')
        ov = np.zeros((gh, gw, 4), np.uint8)
        pal = [(0, 0, 0, 0), (220, 30, 30, 170), (30, 200, 255, 220)]
        rng = np.random.default_rng(3)
        cols = [tuple(int(c) for c in rng.integers(60, 230, 3)) + (70,) for _ in rooms]
        for k in range(gh):
            for v in np.unique(grid[k]): pass
        for v in np.unique(grid):
            ov[grid == v] = pal[v] if v < 3 else cols[v - 3]
        ovi = Image.fromarray(ov, 'RGBA').resize(sub.size, Image.NEAREST)
        sub = sub.convert('RGBA'); sub.alpha_composite(ovi)
        d = ImageDraw.Draw(sub)
        for o in openings:
            c = {'door': (0, 160, 0), 'window': (0, 90, 255), 'balcony_door': (160, 0, 200), 'entrance': (255, 140, 0)}[o['kind']]
            d.rectangle([o['x'] * step, o['y'] * step, (o['x'] + o['w']) * step, (o['y'] + o['h']) * step], outline=c, width=5)
        for L in rooms:
            d.text(((L['px'][0] - x0) + 4, (L['px'][1] - y0) + 30), f"{L['measured']} ({L['err']:+}%)", fill=(200, 0, 0, 255))
        sub.convert('RGB').save(qa, quality=80)
    return res


def fit_trace(pdf, code=None, qa=None, clip=None, light_ocr=False):
    """Choose wall mode and sealing parameters that best reproduce the printed room areas."""
    best = None
    fast = os.environ.get('TRACE_FAST') == '1'
    grid = [(0.15, 0.03), (0.22, 0.035)] if fast else [(g, t) for g in (0.11, 0.15, 0.2, 0.28) for t in (0.025, 0.035)]
    for mode in ('dark', 'white'):
        if mode == 'white' and best and best[0] < 12: break
        for g, t in grid:
            if True:
                try: r = trace(pdf, code, None, g, t, wallmode=mode, clip=clip, light_ocr=light_ocr)
                except Exception: continue
                e = [min(abs(x['errPct']), 100) for x in r['rooms'] if x['type'] not in ('exterior', 'laundry')]
                if not e: continue
                score = sum(e) / len(e)
                if best is None or score < best[0]: best = (score, g, t, mode)
    if best is None: raise ValueError('no usable trace')
    r = trace(pdf, code, qa, best[1], best[2], wallmode=best[3], clip=clip, light_ocr=light_ocr)
    r['fit'] = {'meanAbsErrPct': round(best[0], 2), 'gap': best[1], 'thick': best[2], 'walls': best[3]}
    return r


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('pdf'); ap.add_argument('out'); ap.add_argument('--qa'); ap.add_argument('--code')
    o = ap.parse_args()
    r = fit_trace(o.pdf, o.code, o.qa)
    json.dump(r, open(o.out, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(json.dumps({'code': r['code'], 'fit': r['fit'], 'rooms': [(x['name'], x['area'], x['measured'], x['errPct']) for x in r['rooms']]}, ensure_ascii=False))
