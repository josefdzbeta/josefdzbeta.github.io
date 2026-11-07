"""Two-storey houses printed on one page (Perseo): split at the 'PLANTA …' headings, trace each storey.
Usage: python duplex.py <pdf_dir> <glob> <out_dir> [qa_dir]   → <CODE>-PB.json and <CODE>-P1.json
"""
import sys, os, re, glob, json
from multiprocessing import Pool
sys.path.insert(0, os.path.dirname(__file__))
import trace as T, pymupdf


def storeys(pdf):
    page = pymupdf.open(pdf)[0]
    lines = T.ocr_lines(page, light=True)
    heads = sorted([(b[1], t) for t, b in lines if re.search(r'PLANTA\s+(BAJA|PRIMERA|ALTA)', t, re.I)])
    pr = page.mediabox if page.rotation else page.rect
    out = []
    for i, (y, t) in enumerate(heads):
        y1 = heads[i + 1][0] - 4 if i + 1 < len(heads) else pr.y1
        out.append(('PB' if re.search('BAJA', t, re.I) else 'P1', [pr.x0, y, pr.x1 * .82, y1]))
    return out


def job(a):
    pdf, out, qa = a
    code = re.search(r'(viv-[\d-]+)', os.path.basename(pdf), re.I).group(1).upper()
    res = []
    for lv, clip in storeys(pdf):
        try:
            r = T.fit_trace(pdf, f'{code}-{lv}', os.path.join(qa, f'{code}-{lv}.jpg') if qa else None, clip=clip, light_ocr=True)
            r['storey'] = lv; r['house'] = code
            json.dump(r, open(os.path.join(out, f'{code}-{lv}.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
            res.append((lv, r['fit']['meanAbsErrPct']))
        except Exception as e:
            res.append((lv, repr(e)[:80]))
    return code, res


if __name__ == '__main__':
    src, pat, out = sys.argv[1:4]; qa = sys.argv[4] if len(sys.argv) > 4 else None
    os.makedirs(out, exist_ok=True); qa and os.makedirs(qa, exist_ok=True)
    jobs = [(f, out, qa) for f in sorted(glob.glob(os.path.join(src, pat)))]
    with Pool(4) as p:
        for code, r in p.imap_unordered(job, jobs): print(code, r, flush=True)
