"""Window glow masks for the dusk turntable: each glazed opening of the published elevation textures
(dark panes, connected components) is switched on at random (about 1 in 3, as in Bamaire's dusk renders).

  python glow_masks.py <tex_dir> <out_dir> [share]
Writes <out_dir>/<texture>_glow.png (grey levels = light intensity per window).
"""
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi


def main(tex, out, share=.36):
    share = float(share); os.makedirs(out, exist_ok=True); rng = np.random.default_rng(27)
    for f in sorted(os.listdir(tex)):
        if not f.endswith('.jpg'): continue
        a = np.asarray(Image.open(os.path.join(tex, f)).convert('RGB')).astype(np.float32) / 255
        lum = a.mean(2); r, g, b = a[..., 0], a[..., 1], a[..., 2]
        teal = (g > r + .025) & (b > r + .015) & (lum > .27)
        dark = (lum < .42) & ~teal
        lab, n = ndi.label(ndi.binary_opening(dark, np.ones((2, 2))))
        sizes = ndi.sum(np.ones_like(lum), lab, range(1, n + 1))
        on = np.zeros(n + 1, np.float32); H = lum.shape[0]
        for k, sl in enumerate(ndi.find_objects(lab), 1):
            h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
            above_roof = sl[0].start < H * .09 and 'giro' not in f                          # ático terraces / sky in the elevation crop
            if 12 <= sizes[k - 1] <= 4000 and w <= 80 and h <= 60 and not above_roof and rng.random() < share: on[k] = rng.uniform(.55, 1.0)
        m = on[lab]
        # balcony doors seen through the tinted glass: a softer glow behind lit panes nearby
        m = np.maximum(m, ndi.grey_dilation(m, size=(3, 3)) * teal * .45)
        Image.fromarray((ndi.gaussian_filter(m, .7) * 255).astype(np.uint8)).save(os.path.join(out, f.replace('.jpg', '_glow.png')))
        print(f, 'windows', int((sizes >= 12).sum()), 'lit', int((on > 0).sum()))


if __name__ == '__main__':
    main(*sys.argv[1:])
