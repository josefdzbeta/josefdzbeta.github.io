"""Pack the photoreal dwelling renders (scripts/blender/dwelling.py) for the web.

  python dwelling_pack.py <render_dir> <out_dir>      e.g. ../research/dwellings-render dist/models/mykonos/dwellings

Writes <out_dir>/lg/<code>.webp (1600×1200), <out_dir>/sm/<code>.webp (1000×750) and index.json with the room pins
(image fractions) of every dwelling. Portal 2 uses the same picture mirrored (the viewer flips image and pins).
"""
import sys, os, json
from PIL import Image

SIZES = {'lg': ((1600, 1200), 82), 'sm': ((1000, 750), 76)}


def main(src, out):
    index, total = {}, {k: 0 for k in SIZES}
    for f in sorted(os.listdir(src)):
        if not f.endswith('.json'): continue
        meta = json.load(open(os.path.join(src, f))); code = meta['code']
        png = os.path.join(src, code + '.png')
        if not os.path.exists(png): continue
        im = Image.open(png).convert('RGB')
        for k, (size, q) in SIZES.items():
            os.makedirs(os.path.join(out, k), exist_ok=True); p = os.path.join(out, k, code + '.webp')
            (im if im.size == size else im.resize(size, Image.LANCZOS)).save(p, 'WEBP', quality=q, method=6)
            total[k] += os.path.getsize(p)
        index[code] = {'pins': meta['pins'], 'size': SIZES['lg'][0]}
    json.dump({'source': 'Blender Cycles (scripts/blender/dwelling.py) from the traced plans; furniture orientative', 'units': index},
              open(os.path.join(out, 'index.json'), 'w'), separators=(',', ':'))
    print(len(index), 'dwellings', {k: f'{v / 1e6:.1f} MB' for k, v in total.items()})


if __name__ == '__main__':
    main(*sys.argv[1:])
