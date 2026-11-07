"""Trace every dwelling plan PDF of a promotion in parallel.
Usage: python batch.py <pdf_dir> <glob> <code_regex> <out_dir> [qa_dir]
Example: python batch.py ../research/source-pdfs/mykonos 'mykonos-p1-*.pdf' 'p1-(\\w+)\\.pdf' dist/models/mykonos/units qa/
"""
import sys, os, re, glob, json
from multiprocessing import Pool
sys.path.insert(0, os.path.dirname(__file__))
import trace as T


def job(args):
    pdf, code, out, qa = args
    try:
        r = T.fit_trace(pdf, code, qa)
        json.dump(r, open(out, 'w'), ensure_ascii=False, separators=(',', ':'))
        return code, r['fit']['meanAbsErrPct'], None
    except Exception as e:
        return code, None, repr(e)


if __name__ == '__main__':
    src, pat, rx, out = sys.argv[1:5]
    qa = sys.argv[5] if len(sys.argv) > 5 else None
    os.makedirs(out, exist_ok=True)
    if qa: os.makedirs(qa, exist_ok=True)
    jobs = []
    for f in sorted(glob.glob(os.path.join(src, pat))):
        m = re.search(rx, os.path.basename(f))
        if not m: continue
        code = m.group(1).upper()
        if os.path.exists(os.path.join(out, code + '.json')): continue  # resume
        jobs.append((f, code, os.path.join(out, code + '.json'), os.path.join(qa, code + '.jpg') if qa else None))
    with Pool(min(8, os.cpu_count())) as p:
        for code, err, ex in p.imap_unordered(job, jobs):
            print(code, err, ex or '', flush=True)
