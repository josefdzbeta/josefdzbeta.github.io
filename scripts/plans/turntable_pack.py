"""Pack the Blender turntable (scripts/blender/turntable.py) for the web.

  python turntable_pack.py <render_dir> <out_dir> <variant> <label> [views_dir]
      e.g. ../research/turntable/day dist/models/mykonos/turntable day Día

Writes <out_dir>/<variant>/lg/fNN.webp (1600×1200, desktop/retina), <variant>/sm/fNN.webp (1200×900, phones)
and merges the variant into manifest.json, with the camera of every frame (building frame, metres, y up)
used to project apartments. All variants share the same camera ring.
"""
import sys, os, json
from PIL import Image

SIZES = {'lg': ((1600, 1200), 80), 'sm': ((1200, 900), 74)}


# render 01's camera (PnP, 2026-11-07) is not accurate enough for a pixel comparison yet: only render 03 is offered
VIEWS = [('r03', 'Render 03 · calle', '/assets/ref-mykonos03.jpg')]


def pack_views(views_dir, out):
    """our model rendered with the calibrated cameras of Bamaire's renders (turntable.py --cam), for the comparison slider"""
    res = []
    for vid, label, ref in VIEWS:
        src = os.path.join(views_dir, f'view_{vid}.png')
        if not os.path.exists(src): continue
        os.makedirs(os.path.join(out, 'views'), exist_ok=True)
        Image.open(src).convert('RGB').save(os.path.join(out, 'views', f'{vid}.webp'), 'WEBP', quality=82, method=6)
        res.append({'id': vid, 'label': label, 'file': f'views/{vid}.webp', 'ref': ref})
    return res


def main(src, out, variant='day', label='Día', views_dir=None):
    cams = json.load(open(os.path.join(src, 'cameras.json')))
    frames = cams['frames']; files = []
    total = {k: 0 for k in SIZES}
    for f in frames:
        im = Image.open(os.path.join(src, 'frame_%03d.png' % f['i'])).convert('RGB')
        name = 'f%02d.webp' % f['i']; files.append(name)
        for k, (size, q) in SIZES.items():
            os.makedirs(os.path.join(out, variant, k), exist_ok=True)
            p = os.path.join(out, variant, k, name)
            (im if im.size == size else im.resize(size, Image.LANCZOS)).save(p, 'WEBP', quality=q, method=6)
            total[k] += os.path.getsize(p)
    r = cams['ring']
    mp = os.path.join(out, 'manifest.json')
    old = json.load(open(mp)) if os.path.exists(mp) else {}
    man = {'source': 'Blender Cycles turntable (scripts/blender/turntable.py): façades from the published elevations, '
                     'surroundings from OpenStreetMap (reflected to match the published plans)',
           'size': SIZES['lg'][0], 'fovY': r['fovY'], 'target': r['target'], 'radius': r['radius'], 'height': r['height'],
           'sun': cams['sun'], 'files': files, 'frames': [{'angle': f['angle'], 'pos': f['pos']} for f in frames],
           'variants': {**old.get('variants', {}), variant: {'label': label, 'bytes': total}},
           'views': pack_views(views_dir, out) if views_dir else old.get('views', [])}
    if old.get('frames') and old['frames'] != man['frames']: raise SystemExit('camera ring differs from the variants already packed')
    json.dump(man, open(mp, 'w'), indent=1)
    print(json.dumps({k: f'{v / 1e6:.2f} MB ({v / len(frames) / 1e3:.0f} KB/frame)' for k, v in total.items()}))


if __name__ == '__main__':
    main(*sys.argv[1:])
