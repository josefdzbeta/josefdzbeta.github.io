"""Side-by-side + 50 % blend of the Blender top render and the source plan crop (same metric extent)."""
import sys, os, glob
from PIL import Image
models, renders = sys.argv[1:3]
for f in sorted(glob.glob(os.path.join(renders, '*_blender_top.png'))):
    code = os.path.basename(f)[:-len('_blender_top.png')]
    r = Image.open(f).convert('RGB'); p = Image.open(os.path.join(models, 'plans', code + '.jpg')).convert('RGB').resize(r.size)
    c = Image.new('RGB', (r.width * 3, r.height), 'white')
    c.paste(p, (0, 0)); c.paste(r, (r.width, 0)); c.paste(Image.blend(p, r, .45), (r.width * 2, 0))
    c.thumbnail((1800, 1800)); c.save(os.path.join(renders, code + '_compare.jpg'), quality=80)
print('ok')
