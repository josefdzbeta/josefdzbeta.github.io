"""Withdraw dwellings whose fitted model still deviates from the printed m² by more than MAX_AW
(area-weighted: Σ|model − printed| / Σ printed). Updates units/, plans/, index.json, validation.json.
Usage: python prune.py dist/models/<promotion> [max_pct]"""
import json, os, sys
d = sys.argv[1]; MAX_AW = float(sys.argv[2]) if len(sys.argv) > 2 else 15.0
v = json.load(open(os.path.join(d, 'validation.json'))); idx = json.load(open(os.path.join(d, 'index.json')))
v.setdefault('rejected', {}); gone = []
for code, u in list(v['units'].items()):
    tot = sum(r['printed'] for r in u['rooms']) or 1
    aw = 100 * sum(abs(r['model'] - r['printed']) for r in u['rooms']) / tot
    u['areaWeightedErrPct'] = round(aw, 1)
    if aw > MAX_AW:
        v['rejected'][code] = {'source': u['source'], 'meanAbsErrPct': (u.get('fit') or {}).get('meanAbsErrPct'), 'areaWeightedErrPct': round(aw, 1), 'reason': 'modelo ajustado fuera de tolerancia'}
        del v['units'][code]; gone.append(code)
        for f in (os.path.join(d, 'units', code + '.json'), os.path.join(d, 'plans', code + '.jpg')):
            if os.path.exists(f): os.remove(f)
idx['units'] = [u for u in idx['units'] if u['code'] not in gone]
json.dump(v, open(os.path.join(d, 'validation.json'), 'w'), ensure_ascii=False, indent=1)
json.dump(idx, open(os.path.join(d, 'index.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
print(os.path.basename(d), 'withdrawn', gone, 'remaining', len(v['units']))
