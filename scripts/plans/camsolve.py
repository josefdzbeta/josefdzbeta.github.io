# Camera solve for Bamaire's published renders: least squares on position, yaw, pitch (roll optional) and vertical
# field of view from 2D-3D point pairs (three.js PerspectiveCamera conventions, 1600 x 900 image).
# Usage: python3 camsolve.py render01_points.json   (numpy + scipy; used for render 01, 11 November 2026)
import numpy as np, json, sys
from scipy.optimize import least_squares
W, H = 1600, 900
def basis(fwd, roll):
    f = fwd / np.linalg.norm(fwd); up = np.array([0, 1, 0.])
    r = np.cross(f, up); r /= np.linalg.norm(r); u = np.cross(r, f)
    c, s = np.cos(roll), np.sin(roll); r2 = c * r + s * u; u2 = -s * r + c * u
    return r2, u2, f
def unpack(p):
    pos = p[0:3]; yaw, pitch, roll, fov = p[3:7]
    fwd = np.array([np.cos(pitch) * np.sin(yaw), np.sin(pitch), np.cos(pitch) * np.cos(yaw)])
    return pos, fwd, roll, fov
def project(p, X):
    pos, fwd, roll, fov = unpack(p); r, u, f = basis(fwd, roll)
    d = np.asarray(X) - pos; z = d @ f; t = np.tan(np.radians(fov) / 2)
    xn = (d @ r) / z / (t * W / H); yn = (d @ u) / z / t
    return np.stack([(xn + 1) / 2 * W, (1 - yn) / 2 * H], -1)
def p0(pos, fwd, fov):
    fwd = np.array(fwd) / np.linalg.norm(fwd); return np.array([*pos, np.arctan2(fwd[0], fwd[2]), np.arcsin(fwd[1]), 0, fov])
if __name__ == '__main__':
    cfg = json.load(open(sys.argv[1]))
    X = np.array([c[0] for c in cfg['pts']]); U = np.array([c[1] for c in cfg['pts']], float)
    init = p0(cfg['pos'], cfg['fwd'], cfg['fov'])
    print('initial reproj', np.round(project(init, X) - U, 1).tolist())
    fixfov = cfg.get('fixfov')
    def res(p):
        q = p.copy()
        if fixfov: q[6] = fixfov
        if cfg.get('noroll'): q[5] = 0
        return (project(q, X) - U).ravel()
    s = least_squares(res, init, x_scale=[5, 5, 5, .05, .05, .02, 2])
    q = s.x.copy()
    if fixfov: q[6] = fixfov
    if cfg.get('noroll'): q[5] = 0
    pos, fwd, roll, fov = unpack(q)
    print('pos', np.round(pos, 2).tolist(), 'fwd', np.round(fwd, 4).tolist(), 'roll', round(float(np.degrees(roll)), 2), 'fov', round(float(fov), 2))
    print('resid', np.round(project(q, X) - U, 1).tolist())
    for name, P in cfg.get('check', {}).items(): print(name, np.round(project(q, np.array(P)), 1).tolist())
