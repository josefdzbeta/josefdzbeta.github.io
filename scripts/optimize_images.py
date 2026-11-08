"""Responsive WebP copies of the site images (performance): dist/assets/opt/<name>-<w>.webp at 640/1280/1920 px
(never upscaled) and dist/assets/opt/index.json mapping each original URL to its variants, used by the page to
write srcset/sizes. The originals stay as the fallback and for downloads.

  python scripts/optimize_images.py dist
"""
import sys, os, json
from PIL import Image

WIDTHS = (640, 1280, 1920)
MIN_BYTES = 60_000


def main(dist):
    src = os.path.join(dist, 'assets'); out = os.path.join(src, 'opt'); os.makedirs(out, exist_ok=True)
    index, before, after = {}, 0, 0
    for name in sorted(os.listdir(src)):
        path = os.path.join(src, name)
        if not name.lower().endswith(('.jpg', '.jpeg', '.png')) or os.path.getsize(path) < MIN_BYTES: continue
        im = Image.open(path); im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') and name.endswith('.png') else 'RGB')
        base = os.path.splitext(name)[0]; variants = []
        for w in WIDTHS:
            if w > im.width and variants: break
            ww = min(w, im.width); h = round(im.height * ww / im.width)
            dst = os.path.join(out, f'{base}-{ww}.webp')
            if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(path):
                im.resize((ww, h), Image.LANCZOS).save(dst, 'WEBP', quality=74, method=6)
            variants.append([ww, f'/assets/opt/{base}-{ww}.webp'])
            if ww == im.width: break
        index[f'/assets/{name}'] = variants
        before += os.path.getsize(path); after += os.path.getsize(os.path.join(out, os.path.basename(variants[min(1, len(variants) - 1)][1])))
    json.dump(index, open(os.path.join(out, 'index.json'), 'w'), separators=(',', ':'))
    print(f'{len(index)} images; originals {before / 1e6:.1f} MB → 1280-px WebP {after / 1e6:.1f} MB')


if __name__ == '__main__':
    main(sys.argv[1])
