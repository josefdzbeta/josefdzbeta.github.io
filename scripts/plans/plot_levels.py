"""QA plot of building.json: each level's outline (grey), dwelling footprints (outlines) and walls."""
import json, sys
from PIL import Image, ImageDraw
b = json.load(open(sys.argv[1])); S = 14; tiles = []
for lv in ['B', '1', '4', '5']:
    L = b['levels'].get(lv)
    if not L: continue
    im = Image.new('RGB', (int(45 * S), int(50 * S)), 'white'); d = ImageDraw.Draw(im); O = 6
    ox, oy = L.get('offset', [0, 0]); sc = L['slabCell']
    for x, y, w, h in L['slab']: d.rectangle([(O + ox + x * sc) * S, (O + oy + y * sc) * S, (O + ox + (x + w) * sc) * S, (O + oy + (y + h) * sc) * S], fill=(222, 222, 222))
    cols = [(200, 60, 60), (60, 120, 200), (60, 160, 90), (200, 140, 30), (150, 70, 180), (40, 160, 170)]
    for k, pu in enumerate(L['units']):
        c = pu.get('cell', b['cell']); col = cols[k % len(cols)]
        for x, y, w, h in pu['walls']: d.rectangle([(O + pu['x'] + x * c) * S, (O + pu['y'] + y * c) * S, (O + pu['x'] + (x + w) * c) * S, (O + pu['y'] + (y + h) * c) * S], fill=col)
        d.text(((O + pu['x'] + pu['w'] * c / 2) * S, (O + pu['y'] + pu['h'] * c / 2) * S), pu['code'], fill=(0, 0, 0))
    d.text((5, 5), 'Nivel ' + lv, fill=(0, 0, 0)); tiles.append(im)
c = Image.new('RGB', (sum(t.width for t in tiles), tiles[0].height), 'white'); x = 0
for t in tiles: c.paste(t, (x, 0)); x += t.width
c.save(sys.argv[2])
