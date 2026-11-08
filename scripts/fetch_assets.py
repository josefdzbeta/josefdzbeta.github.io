"""Download the CC0 assets used by the photoreal renders (Poly Haven, https://polyhaven.com — CC0, no attribution
required; credited in dist/docs/fidelity-audit.md). Files go to ../research/assets/polyhaven/ (not into the site).

  python scripts/fetch_assets.py ../research/assets/polyhaven

HDRIs at 4k (.hdr), textures at 2k (diffuse, OpenGL normal, roughness, AO), models as glTF with 1k textures.
"""
import sys, os, json, urllib.request

UA = {'User-Agent': 'bamaire-render-pipeline/1.0'}
HDRIS = ['kloofendal_48d_partly_cloudy_puresky']                     # day sky (the blue hour keeps a procedural sky)
TEXTURES = ['white_stucco_02', 'concrete_floor_02', 'precast_stone_paving', 'rectangular_paving', 'asphalt_02', 'aerial_asphalt_01',
            'aerial_grass_rock', 'leafy_grass',                                          # building and surroundings
            'laminate_floor_02', 'oak_veneer_01', 'rough_linen', 'wool_boucle', 'patio_tiles']   # dwellings
MODELS = ['island_tree_01', 'island_tree_02', 'tree_small_02', 'jacaranda_tree', 'shrub_02',
          'modern_coffee_table_01', 'modern_wooden_cabinet', 'wooden_table_02', 'dining_chair_02', 'painted_wooden_nightstand',
          'outdoor_table_chair_set_01', 'potted_plant_02', 'throw_pillows_01']
MAPS = ['Diffuse', 'nor_gl', 'Rough', 'AO']


def get_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r: return json.load(r)


def fetch(url, dst):
    if os.path.exists(dst) and os.path.getsize(dst) > 0: return os.path.getsize(dst)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r, open(dst + '.part', 'wb') as f:
        while True:
            b = r.read(1 << 20)
            if not b: break
            f.write(b)
    os.replace(dst + '.part', dst); return os.path.getsize(dst)


def main(out):
    total = 0
    for a in HDRIS:
        f = get_json(f'https://api.polyhaven.com/files/{a}')['hdri']['4k']['hdr']
        total += fetch(f['url'], os.path.join(out, 'hdris', a + '_4k.hdr')); print('hdri', a)
    for a in TEXTURES:
        f = get_json(f'https://api.polyhaven.com/files/{a}')
        for m in MAPS:
            if m in f and '2k' in f[m]:
                v = f[m]['2k'].get('jpg') or f[m]['2k'].get('png')
                total += fetch(v['url'], os.path.join(out, 'textures', a, f'{a}_{m}_2k.' + v['url'].rsplit('.', 1)[1]))
        print('texture', a)
    for a in MODELS:
        f = get_json(f'https://api.polyhaven.com/files/{a}')['gltf']
        res = '1k' if '1k' in f else sorted(f)[0]
        g = f[res]['gltf']; d = os.path.join(out, 'models', a)
        total += fetch(g['url'], os.path.join(d, os.path.basename(g['url'])))
        for rel, inc in g.get('include', {}).items(): total += fetch(inc['url'], os.path.join(d, rel))
        print('model', a, res)
    print(f'total {total / 1e6:.0f} MB')


if __name__ == '__main__':
    main(sys.argv[1])
