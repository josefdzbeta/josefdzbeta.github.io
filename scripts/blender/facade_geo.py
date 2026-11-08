"""Real façade geometry for the Mykonos turntable (imported by turntable.py).

The web exterior (scripts/export-scene.mjs) carries the published elevation images on flat quads ("tex_<face>").
Here every such quad is classified by its plane and rebuilt:
  main wall / frame / piers / end walls → white render with the openings vectorised from the elevations
      (scripts/plans/facade_vector.py): reveal, sill, anthracite frame and mullions, glass, and a room behind it
  recessed bay back wall                → kept with the published image (balcony doors and cladding as drawn)
  balcony slab front edge               → grey slab edge
  balcony front                         → frosted glass railing with a metal top profile
Coordinates: building frame (x across, y up, z along), metres; B() maps to Blender.
"""
import bpy, bmesh, random
from mathutils import Vector

B = lambda x, y, z: Vector((x, -z, y))
REVEAL, FRAME_W, FRAME_D, GLASS_D, ROOM_D = .22, .055, .07, .10, 3.2


class Mesh:
    def __init__(self): self.v, self.f, self.uv = [], [], []
    def quad(self, pts, uvs=None):
        o = len(self.v); self.v += [tuple(B(*p)) for p in pts]; self.f.append((o, o + 1, o + 2, o + 3))
        self.uv.append(uvs or [(0, 0), (1, 0), (1, 1), (0, 1)])
    def build(self, name, mat, coll):
        if not self.f: return None
        me = bpy.data.meshes.new(name); me.from_pydata(self.v, [], self.f)
        uvl = me.uv_layers.new(name='UVMap')
        for poly, uvs in zip(me.polygons, self.uv):
            for li, uv in zip(poly.loop_indices, uvs): uvl.data[li].uv = uv
        me.materials.append(mat); me.validate(); me.update()
        ob = bpy.data.objects.new(name, me); coll.objects.link(ob); return ob


def subtract(r, holes):
    """rectangle r=(u0,u1,v0,v1) minus axis-aligned holes → list of rectangles (grid cells, merged by rows)"""
    us = sorted({r[0], r[1], *[c for h in holes for c in (h[0], h[1]) if r[0] < c < r[1]]})
    vs = sorted({r[2], r[3], *[c for h in holes for c in (h[2], h[3]) if r[2] < c < r[3]]})
    out = []
    for v0, v1 in zip(vs, vs[1:]):
        row = None
        for u0, u1 in zip(us, us[1:]):
            cu, cv = (u0 + u1) / 2, (v0 + v1) / 2
            inside = any(h[0] < cu < h[1] and h[2] < cv < h[3] for h in holes)
            if inside:
                if row: out.append(row); row = None
            elif row and abs(row[1] - u0) < 1e-6: row = (row[0], u1, v0, v1)
            else:
                if row: out.append(row)
                row = (u0, u1, v0, v1)
        if row: out.append(row)
    return out


def build(data, ex, openings, mats, coll, dusk=False, seed=4):
    rnd = random.Random(seed)
    L, D, TOP = ex['length'], ex['depth'], ex['top']
    M = {k: Mesh() for k in ('brick', 'render', 'frame', 'glass', 'sill', 'room', 'roomFloor', 'roomLit', 'slabEdge', 'railGlass', 'railCap')}
    done, bays = set(), {}

    def face_frame(key):
        """returns (to_world(u, v, depth), plane classifier) for a façade key"""
        if key in ex['faces']:
            f = ex['faces'][key]; X0, s = f['x'], f['normal']; z0, zs = f['zOfU']
            u_of = lambda z: (z - z0) / zs
            pt = lambda X: (lambda u, v, d: (X - s * d, v, z0 + zs * u))
            return f, X0, s, u_of, pt
        e = ex['ends'][key]; Z0, n = e['z'], e['normal']
        u_of = lambda x: x if n > 0 else D - x
        pt = lambda Z: (lambda u, v, d: ((u if n > 0 else D - u), v, Z - n * d))
        return e, Z0, n, u_of, pt

    def opening_geo(o, P, depth0, key, wall='render'):
        """reveal + sill + frame + glass + room for an opening on a wall whose face is at depth0 (0 = plane)"""
        u0, u1, v0, v1 = o['u0'], o['u1'], o['v0'], o['v1']
        d0, d1 = depth0, depth0 + REVEAL
        # reveal (4 sides, white render)
        for a, b in (((u0, v0), (u1, v0)), ((u1, v0), (u1, v1)), ((u1, v1), (u0, v1)), ((u0, v1), (u0, v0))):
            M[wall].quad([P(*a, d0), P(*b, d0), P(*b, d1), P(*a, d1)])
        if o['kind'] == 'void':                                      # open terrace frame: thick reveal only
            for a, b in (((u0, v0), (u1, v0)), ((u1, v0), (u1, v1)), ((u1, v1), (u0, v1)), ((u0, v1), (u0, v0))):
                M[wall].quad([P(*a, d1), P(*b, d1), P(*b, d1 + .1), P(*a, d1 + .1)])
            return
        if o['kind'] == 'window':                                    # projecting stone sill
            M['sill'].quad([P(u0 - .04, v0 - .001, d0 - .04), P(u1 + .04, v0 - .001, d0 - .04), P(u1 + .04, v0 - .001, d0 + .05), P(u0 - .04, v0 - .001, d0 + .05)])
            M['sill'].quad([P(u0 - .04, v0 - .05, d0 - .04), P(u1 + .04, v0 - .05, d0 - .04), P(u1 + .04, v0 - .001, d0 - .04), P(u0 - .04, v0 - .001, d0 - .04)])
        df = d1 - FRAME_D
        w = FRAME_W
        # frame ring (front faces) and its inner returns
        ring = [(u0, u1, v1 - w, v1), (u0, u1, v0, v0 + w), (u0, u0 + w, v0 + w, v1 - w), (u1 - w, u1, v0 + w, v1 - w)]
        # mullions: one per ~0,9 m of width for windows, per ~1,0 m for doors; transom on tall doors
        leaves = max(1, round((u1 - u0) / (1.0 if o['kind'] == 'door' else .8)))
        for k in range(1, leaves):
            uc = u0 + (u1 - u0) * k / leaves; ring.append((uc - w * .6, uc + w * .6, v0 + w, v1 - w))
        for a0, a1, b0, b1 in ring:
            M['frame'].quad([P(a0, b0, df), P(a1, b0, df), P(a1, b1, df), P(a0, b1, df)])
        # glass a little behind the frame
        dg = df + .03
        M['glass'].quad([P(u0 + w, v0 + w, dg), P(u1 - w, v0 + w, dg), P(u1 - w, v1 - w, dg), P(u0 + w, v1 - w, dg)])
        # room behind: back, floor (at storey level), ceiling, sides — open towards the window
        lv = ex['levels'][o['level']]; top = min(TOP - .5, lv + 2.6)
        r0, r1 = u0 - .25, u1 + .25; dr = d1 + ROOM_D             # narrow: rooms behind pier windows stay inside the pier zone
        lit = dusk and rnd.random() < .36
        room = M['roomLit'] if lit else M['room']
        room.quad([P(r0, lv, dr), P(r1, lv, dr), P(r1, top, dr), P(r0, top, dr)])                       # back wall
        M['roomFloor'].quad([P(r0, lv + .01, d1), P(r1, lv + .01, d1), P(r1, lv + .01, dr), P(r0, lv + .01, dr)])
        room.quad([P(r0, top, dr), P(r1, top, dr), P(r1, top, d1), P(r0, top, d1)])                      # ceiling
        room.quad([P(r0, lv, d1), P(r0, lv, dr), P(r0, top, dr), P(r0, top, d1)])
        room.quad([P(r1, lv, dr), P(r1, lv, d1), P(r1, top, d1), P(r1, top, dr)])
        # close the wall between the reveal and the room (opening frame to room size)
        for a0, a1, b0, b1 in subtract((r0, r1, lv, top), [(u0, u1, v0, v1)]):
            M['render'].quad([P(a0, b0, d1), P(a1, b0, d1), P(a1, b1, d1), P(a0, b1, d1)])

    for key in list(ex['faces']) + list(ex['ends']):
        bk = data['building'].get('tex_' + key)
        if not bk: continue
        f, plane0, s, u_of, pt = face_frame(key)
        p, idx = bk['p'], bk['i']
        ops = openings.get(key, {}).get('openings', [])
        for q in range(0, len(p) // 12):
            vs = [(p[q * 12 + k * 3], p[q * 12 + k * 3 + 1], p[q * 12 + k * 3 + 2]) for k in range(4)]
            if key in ex['faces']:
                X = vs[0][0]; d = (plane0 - X) * s                           # depth behind the façade plane (negative = proud)
                us = [u_of(v[2]) for v in vs]
            else:
                X = vs[0][2]; d = (plane0 - X) * s
                us = [u_of(v[0]) for v in vs]
            ys = [v[1] for v in vs]
            r = (min(us), max(us), min(ys), max(ys))
            P = pt(X)
            P0 = lambda u, v, dd, P=P: P(u, v, dd)
            if key in ex['faces'] and abs(d - .35) < .02:                    # recessed bay back wall: published image
                bays.setdefault(key, Mesh()).quad([P(r[0], r[2], 0), P(r[1], r[2], 0), P(r[1], r[3], 0), P(r[0], r[3], 0)],
                                                  [(r[0] / L, r[2] / TOP), (r[1] / L, r[2] / TOP), (r[1] / L, r[3] / TOP), (r[0] / L, r[3] / TOP)])
                continue
            if key in ex['faces'] and d < -1.0:                              # balcony fronts (slab edge / glass)
                if r[3] - r[2] < .4:
                    M['slabEdge'].quad([P(r[0], r[2], 0), P(r[1], r[2], 0), P(r[1], r[3], 0), P(r[0], r[3], 0)])
                else:
                    M['railGlass'].quad([P(r[0], r[2], 0), P(r[1], r[2], 0), P(r[1], r[3], 0), P(r[0], r[3], 0)])
                    M['railCap'].quad([P(r[0], r[3], -.02), P(r[1], r[3], -.02), P(r[1], r[3], .06), P(r[0], r[3], .06)])
                continue
            # white wall (main plane, frame band, pier, end wall): openings of the matching plane cut out
            want = 'frame' if (key in ex['faces'] and d < -.2) else 'main'
            holes = [(o['u0'], o['u1'], o['v0'], o['v1'], o) for o in ops
                     if (o['plane'] == want or key not in ex['faces']) and o['u0'] < r[1] - .05 and o['u1'] > r[0] + .05 and o['v0'] < r[3] - .05 and o['v1'] > r[2] + .05]
            holes = [(max(h[0], r[0]), min(h[1], r[1]), max(h[2], r[2]), min(h[3], r[3]), h[4]) for h in holes]
            wall = 'brick' if want == 'main' else 'render'
            for a0, a1, b0, b1 in subtract(r, [h[:4] for h in holes]):
                M[wall].quad([P(a0, b0, 0), P(a1, b0, 0), P(a1, b1, 0), P(a0, b1, 0)],
                                 [(a0, b0), (a1, b0), (a1, b1), (a0, b1)])
            for h in holes:
                o = h[4]; k = (key, o['u0'], o['v0'])
                if k in done: continue
                done.add(k); opening_geo({**o, 'u0': h[0], 'u1': h[1], 'v0': h[2], 'v1': h[3]}, P, 0, key, wall)
    obs = {k: m.build('facade_' + k, mats['fac_' + k], coll) for k, m in M.items()}
    for key, m in bays.items(): obs['bay_' + key] = m.build('facade_bay_' + key, mats['tex_' + key], coll)
    return obs, len(done)
