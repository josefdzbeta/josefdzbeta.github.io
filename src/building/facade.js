// The Mykonos building from what Bamaire published: exterior.json (envelope, frame, bays and balconies measured on
// the elevations), facade-openings.json (every window, door and terrace void vectorised from them) and
// building.json (the level-5 terraces). Building frame: x across (courtyard x = 0, Calle María de Molina x = 20),
// y up, z along (Portal 1 z > 0); metres.
//   main plane outside the frame and the plinth → white brick (cara vista) / white render
//   projecting frame (bands and piers, 45 cm)    → white render
//   recessed bays (35 cm)                        → porcelain cladding in horizontal courses
//   balconies                                    → slab and solid grey front, as in render 03
// Every opening gets a reveal, a sill, an anthracite PVC frame with mullions, glass, a roller shutter (some
// lowered) and a room behind it that can light up at night.
import * as T from 'three';
import {Mesher, Parts, place} from '../apartment/geometry.js';
import {rects} from '../apartment/plan.js';

const REVEAL = .22, FW = .055, FD = .07, PROJ = .45, REC = .35, BALC = .75;
const rng = seed => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// rectangle [u0, u1, v0, v1] minus axis-aligned holes → rectangles, merged along rows
export function subtract(r, holes) {
  const us = [...new Set([r[0], r[1], ...holes.flatMap(h => [h[0], h[1]]).filter(c => c > r[0] && c < r[1])])].sort((a, b) => a - b);
  const vs = [...new Set([r[2], r[3], ...holes.flatMap(h => [h[2], h[3]]).filter(c => c > r[2] && c < r[3])])].sort((a, b) => a - b);
  const out = [];
  for (let b = 0; b < vs.length - 1; b++) {
    let row = null;
    for (let a = 0; a < us.length - 1; a++) {
      const cu = (us[a] + us[a + 1]) / 2, cv = (vs[b] + vs[b + 1]) / 2;
      if (holes.some(h => cu > h[0] && cu < h[1] && cv > h[2] && cv < h[3])) { if (row) out.push(row); row = null; }
      else if (row) row[1] = us[a + 1];
      else row = [us[a], us[a + 1], vs[b], vs[b + 1]];
    }
    if (row) out.push(row);
  }
  return out;
}

export function buildFacades(ex, published, building, {seed = 4} = {}) {
  // the wide roof-terrace void of each end wall is three openings between two brick piers in render 03
  const openings = Object.fromEntries(Object.entries(published).map(([k, f]) => [k, {...f, openings: f.openings.flatMap(o => {
    if (o.kind !== 'void' || !(k === 'peatonal' || k === 'far') || o.u1 - o.u0 < 8) return [o];
    const pier = .6, w = (o.u1 - o.u0 - 2 * pier) / 3;
    return [0, 1, 2].map(i => ({...o, u0: o.u0 + i * (w + pier), u1: o.u0 + i * (w + pier) + w}));
  })}]));
  const M = new Mesher(), parts = new Parts(), rnd = rng(seed), windows = [], faces = {}, balconies = [];
  const L = ex.length, D = ex.depth, TOP = ex.top, half = L / 2, roofY = ex.levels.roof + .35;
  // a quad facing `want`, wound accordingly; st = surface coordinates (metres) per corner for the textures
  const quad = (mat, p, want, st, lm = true) => {
    let [a, b, c, d] = p, uv = st;
    if (dot(cross(sub(b, a), sub(d, a)), want) < 0) { [a, b, c, d] = [a, d, c, b]; uv = [st[0], st[3], st[2], st[1]]; }
    M.quad(mat, a, b, c, d, want, uv.flat(), {lm: lm && mat !== 'glass'});
  };
  const box = (mat, x0, x1, y0, y1, z0, z1) => parts.add(mat, new T.BoxGeometry(Math.abs(x1 - x0), y1 - y0, Math.abs(z1 - z0)), place((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2));

  // a façade: P(u, v, d) with u along (left to right seen from outside), v up, d into the building
  function face(P, out, U) {
    const F = {
      rect: (mat, u0, u1, v0, v1, d, facing = out) => quad(mat, [P(u0, v0, d), P(u1, v0, d), P(u1, v1, d), P(u0, v1, d)], facing, [[u0, v0], [u1, v0], [u1, v1], [u0, v1]]),
      jamb: (mat, u, v0, v1, d0, d1, dir) => quad(mat, [P(u, v0, d0), P(u, v0, d1), P(u, v1, d1), P(u, v1, d0)], U.map(c => c * dir), [[d0, v0], [d1, v0], [d1, v1], [d0, v1]]),
      flat: (mat, u0, u1, v, d0, d1, up) => quad(mat, [P(u0, v, d0), P(u1, v, d0), P(u1, v, d1), P(u0, v, d1)], [0, up, 0], [[u0, d0], [u1, d0], [u1, d1], [u0, d1]]),
      // a wall plane at depth d with openings cut, each opening built behind it
      wall(mat, r, d, ops, level) {
        const holes = ops.filter(o => o.u0 < r[1] - .02 && o.u1 > r[0] + .02 && o.v0 < r[3] - .02 && o.v1 > r[2] + .02)
          .map(o => ({...o, u0: Math.max(o.u0, r[0]), u1: Math.min(o.u1, r[1]), v0: Math.max(o.v0, r[2]), v1: Math.min(o.v1, r[3])}));
        for (const [a0, a1, b0, b1] of subtract(r, holes.map(h => [h.u0, h.u1, h.v0, h.v1]))) F.rect(mat, a0, a1, b0, b1, d);
        for (const o of holes) opening(F, o, d, mat, level);
      },
      P, out, U,
    };
    return F;
  }

  // reveal, sill, frame, glass, shutter and room for one opening whose wall face is at depth d0
  function opening(F, o, d0, wallMat) {
    const {P, out} = F, {u0, u1, v0, v1} = o, d1 = d0 + REVEAL;
    F.jamb(wallMat, u0, v0, v1, d0, d1, 1); F.jamb(wallMat, u1, v0, v1, d0, d1, -1);
    F.flat(wallMat, u0, u1, v1, d0, d1, -1); F.flat(wallMat, u0, u1, v0, d0, d1, 1);
    if (o.kind === 'void') return;                                                   // open terrace frame
    const pbox = (mat, a0, a1, b0, b1, e0, e1) => {                                  // box in face coordinates
      const p0 = P(a0, b0, e0), p1 = P(a1, b1, e1);
      box(mat, Math.min(p0[0], p1[0]), Math.max(p0[0], p1[0]), b0, b1, Math.min(p0[2], p1[2]), Math.max(p0[2], p1[2]));
    };
    if (o.kind === 'window') pbox('sill', u0 - .04, u1 + .04, v0 - .04, v0, d0 - .04, d0 + .03);
    const df = d1 - FD, dg = df + .035;
    // anthracite PVC frame and mullions
    pbox('pvc', u0, u1, v1 - FW, v1, df, d1); pbox('pvc', u0, u1, v0, v0 + FW, df, d1);
    pbox('pvc', u0, u0 + FW, v0, v1, df, d1); pbox('pvc', u1 - FW, u1, v0, v1, df, d1);
    const leaves = Math.max(1, Math.round((u1 - u0) / (o.kind === 'door' ? 1.0 : .8)));
    for (let k = 1; k < leaves; k++) { const uc = u0 + (u1 - u0) * k / leaves; pbox('pvc', uc - FW * .6, uc + FW * .6, v0, v1, df, d1); }
    F.rect('glass', u0 + FW, u1 - FW, v0 + FW, v1 - FW, dg);
    // roller shutter: some up, some part-lowered, a few down (lamas de aluminio, as the memoria)
    const r = rnd(), lower = r < .5 ? 0 : r < .8 ? .25 + rnd() * .35 : r < .93 ? .7 : 1;
    if (lower > 0) { const vb = v1 - (v1 - v0) * lower; F.rect('shutter', u0 + .01, u1 - .01, vb, v1 - .005, d0 + .06); pbox('alu', u0 + .01, u1 - .01, vb - .04, vb, d0 + .045, d0 + .08); }
    // the room behind: back wall, floor, ceiling and sides, open to the window
    const lv = ex.levels[o.level] ?? v0, top = Math.min(TOP - .6, lv + 2.6), r0 = u0 - .3, r1 = u1 + .3, dr = d1 + 3.2;
    const lit = rnd() < .4, room = lit ? 'roomLit' : 'room';
    quad(room, [P(r0, lv, dr), P(r1, lv, dr), P(r1, top, dr), P(r0, top, dr)], out, [[0, 0], [1, 0], [1, 1], [0, 1]], false);
    quad('roomFloor', [P(r0, lv + .01, d1), P(r1, lv + .01, d1), P(r1, lv + .01, dr), P(r0, lv + .01, dr)], [0, 1, 0], [[0, 0], [1, 0], [1, 1], [0, 1]], false);
    quad(room, [P(r0, top, d1), P(r1, top, d1), P(r1, top, dr), P(r0, top, dr)], [0, -1, 0], [[0, 0], [1, 0], [1, 1], [0, 1]], false);
    quad(room, [P(r0, lv, d1), P(r0, lv, dr), P(r0, top, dr), P(r0, top, d1)], F.U, [[0, 0], [1, 0], [1, 1], [0, 1]], false);
    quad(room, [P(r1, lv, d1), P(r1, lv, dr), P(r1, top, dr), P(r1, top, d1)], F.U.map(c => -c), [[0, 0], [1, 0], [1, 1], [0, 1]], false);
    // close the wall between the reveal and the room size
    for (const [a0, a1, b0, b1] of subtract([r0, r1, lv, top], [[u0, u1, v0, v1]])) quad('reveal', [P(a0, b0, d1), P(a1, b0, d1), P(a1, b1, d1), P(a0, b1, d1)], out, [[a0, b0], [a1, b0], [a1, b1], [a0, b1]], false);
    windows.push({lit, at: P((u0 + u1) / 2, (v0 + v1) / 2, dg)});
  }

  // ---- the two long façades
  for (const [key, f] of Object.entries(ex.faces)) {
    const X0 = f.x, s = f.normal, [z0, zs] = f.zOfU;
    const F = faces[key] = face((u, v, d) => [X0 - s * d, v, z0 + zs * u], [s, 0, 0], [0, 0, zs]);
    const [fu0, fu1, fb] = f.frame, [bv0, bv1] = f.bayV, ops = openings[key]?.openings || [];
    const on = plane => ops.filter(o => o.plane === plane);
    // main plane: the brick end blocks, and the plinth under the frame
    F.wall('brick', [0, fu0, 0, TOP], 0, on('main')); F.wall('brick', [fu1, L, 0, TOP], 0, on('main'));
    F.wall('render', [fu0, fu1, 0, fb], 0, on('main'));
    // the frame: front at −45 cm (top band, bottom band, piers), with its pier windows
    const piers = [], edges = [fu0, ...f.bays.flat(), fu1];
    for (let i = 0; i < edges.length; i += 2) if (edges[i + 1] - edges[i] > .05) piers.push([edges[i], edges[i + 1]]);
    F.wall('render', [fu0, fu1, bv1, TOP], -PROJ, on('frame')); F.wall('render', [fu0, fu1, fb, bv0], -PROJ, on('frame'));
    for (const [a, b] of piers) F.wall('render', [a, b, bv0, bv1], -PROJ, on('frame'));
    F.flat('render', fu0, fu1, fb, -PROJ, 0, -1);                                                // soffit of the frame over the plinth
    { const a = F.P(fu0, TOP, -PROJ - .03), b = F.P(fu1, TOP, 0); box('cap', Math.min(a[0], b[0]), Math.max(a[0], b[0]), TOP, TOP + .05, Math.min(a[2], b[2]), Math.max(a[2], b[2])); }
    F.jamb('render', fu0, fb, TOP, -PROJ, 0, -1); F.jamb('render', fu1, fb, TOP, -PROJ, 0, 1);  // frame ends
    // recessed bays: porcelain back wall with its doors and windows, white returns of the frame around them
    for (const [ua, ub] of f.bays) {
      F.wall('cladding', [ua, ub, bv0, bv1], REC, on('bay'));
      F.jamb('render', ua, bv0, bv1, -PROJ, REC, 1); F.jamb('render', ub, bv0, bv1, -PROJ, REC, -1);
      F.flat('render', ua, ub, bv0, -PROJ, REC, 1); F.flat('render', ua, ub, bv1, -PROJ, REC, -1);
    }
    // balconies: merged per level, slab from the bay wall out to 1,2 m, solid grey front and cheeks
    const byLv = {};
    for (const [ua, ub, lv] of f.balconies) (byLv[lv] ||= []).push([ua, ub]);
    for (const [lv, list] of Object.entries(byLv)) {
      list.sort((a, b) => a[0] - b[0]);
      const merged = [];
      for (const r of list) { const m = merged.at(-1); if (m && r[0] - m[1] < .7) m[1] = Math.max(m[1], r[1]); else merged.push([...r]); }
      const y = ex.levels[lv];
      for (const [ua, ub] of merged) {
        if (ub - ua < 1) continue;
        const dIn = REC, dOut = -(PROJ + BALC);
        { const a = F.P(ua, y, dOut + .1), b = F.P(ub, y, dIn); balconies.push({x: [Math.min(a[0], b[0]), Math.max(a[0], b[0])], z: [Math.min(a[2], b[2]), Math.max(a[2], b[2])], y, soffit: Math.min(y + 3.01, bv1 - .05)}); }
        F.rect('slabEdge', ua, ub, y - .26, y, dOut);                                           // slab front edge
        F.flat('slabEdge', ua, ub, y - .26, dOut, dIn, -1);                                     // slab soffit
        F.flat('terrace', ua, ub, y, dOut + .08, dIn, 1);                                       // balcony floor
        F.rect('balcony', ua, ub, y, y + 1.05, dOut); F.rect('balcony', ua + .06, ub - .06, y, y + 1.05, dOut + .06, F.out.map(c => -c));
        F.flat('balcony', ua, ub, y + 1.05, dOut, dOut + .06, 1);
        for (const [u, dir] of [[ua, -1], [ub, 1]]) {                                           // side cheeks
          F.jamb('balcony', u, y - .26, y + 1.05, dOut, dIn, dir); F.jamb('balcony', u - dir * .06, y, y + 1.05, dOut + .06, dIn, -dir);
        }
      }
    }
  }
  // ---- the two ends (white brick, windows and the top terrace void)
  for (const [key, e] of Object.entries(ex.ends)) {
    const Z0 = e.z, n = e.normal;
    const F = faces[key] = face((u, v, d) => [n > 0 ? u : D - u, v, Z0 - n * d], [0, 0, n], [n > 0 ? 1 : -1, 0, 0]);
    F.wall('brick', [0, D, 0, TOP], 0, openings[key]?.openings || []);
  }
  // ---- roof: slab with the level-5 terraces open to the sky, parapets, cap and the lift/stair overruns
  const T5 = terraceGrid(building, ex, openings), lv5 = ex.levels['5'];
  const X = j => j * T5.c, Z = i => -half + i * T5.c;
  for (const [x0, x1, z0, z1] of subtract([0, D, -half, half], T5.rects.map(([j, i, w, h]) => [X(j), X(j + w), Z(i), Z(i + h)])))
    quad('roof', [[x0, roofY, z1], [x1, roofY, z1], [x1, roofY, z0], [x0, roofY, z0]], [0, 1, 0], [[x0, z1], [x1, z1], [x1, z0], [x0, z0]]);
  for (const [j, i, w, h] of T5.rects) {
    const x0 = X(j), x1 = X(j + w), z0 = Z(i), z1 = Z(i + h);
    quad('terrace', [[x0, lv5, z1], [x1, lv5, z1], [x1, lv5, z0], [x0, lv5, z0]], [0, 1, 0], [[x0, z1], [x1, z1], [x1, z0], [x0, z0]]);
  }
  // the penthouse walls around each terrace (glazed doors every few metres) with a parapet above the roof
  const PH = 1.0, PT = .2;
  for (const [x0, x1, z0, z1, want] of T5.edges) {
    const len = Math.hypot(x1 - x0, z1 - z0), t = [(x1 - x0) / len, 0, (z1 - z0) / len], n = want.map(c => -c);
    const P = (u, v, d) => [x0 + t[0] * u + n[0] * d, v, z0 + t[2] * u + n[2] * d];
    const F = face(P, want, t), ops = [], k = Math.floor(len / 3.6);
    for (let q = 0; q < k; q++) { const uc = len * (q + .5) / k, w = len > 5 ? 1.6 : .9; ops.push({u0: uc - w / 2, u1: uc + w / 2, v0: lv5 + .02, v1: lv5 + 2.2, kind: 'door', level: '5'}); }
    F.wall('render', [0, len, lv5, roofY + PH], 0, ops);
    F.rect('render', 0, len, roofY, roofY + PH, PT, n);                                         // roof side of the parapet
    const a = P(0, 0, -.03), b = P(len, 0, PT + .03);
    box('cap', Math.min(a[0], b[0]), Math.max(a[0], b[0]), roofY + PH, roofY + PH + .05, Math.min(a[2], b[2]), Math.max(a[2], b[2]));
  }
  // inside of the outer walls: full height around the terraces (cut by the façade voids), parapet elsewhere
  for (const [key, runs] of Object.entries(T5.sides)) {
    const F = faces[key], inward = F.out.map(c => -c);
    const voids = (openings[key]?.openings || []).filter(o => o.kind === 'void' && o.level === '5').map(o => [o.u0, o.u1, o.v0, o.v1]);
    for (const [u0, u1, open] of runs) {
      if (open) for (const r of subtract([u0, u1, lv5, TOP], voids)) F.rect('render', r[0], r[1], r[2], r[3], REVEAL, inward);
      else F.rect('render', u0, u1, roofY, TOP, REVEAL, inward);
    }
  }
  const t = REVEAL;
  for (const [x0, x1, z0, z1] of [[-.03, t, -half, half], [D - t, D + .03, -half, half], [0, D, -half - .03, -half + t], [0, D, half - t, half + .03]]) box('cap', x0, x1, TOP, TOP + .05, z0, z1);
  for (const o of ex.overruns) {
    const [x0, x1] = o.x, [z0, z1] = o.z, y1 = TOP + o.h;
    quad('render', [[x0, roofY, z1], [x1, roofY, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1], [[x0, roofY], [x1, roofY], [x1, y1], [x0, y1]]);
    quad('render', [[x1, roofY, z0], [x0, roofY, z0], [x0, y1, z0], [x1, y1, z0]], [0, 0, -1], [[x1, roofY], [x0, roofY], [x0, y1], [x1, y1]]);
    quad('render', [[x1, roofY, z1], [x1, roofY, z0], [x1, y1, z0], [x1, y1, z1]], [1, 0, 0], [[z1, roofY], [z0, roofY], [z0, y1], [z1, y1]]);
    quad('render', [[x0, roofY, z0], [x0, roofY, z1], [x0, y1, z1], [x0, y1, z0]], [-1, 0, 0], [[z0, roofY], [z1, roofY], [z1, y1], [z0, y1]]);
    quad('roof', [[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], [0, 1, 0], [[x0, z1], [x1, z1], [x1, z0], [x0, z0]]);
    box('cap', x0 - .03, x1 + .03, y1, y1 + .05, z0 - .03, z1 + .03);
  }
  const terraces = T5.rects.map(([j, i, w, h]) => [X(j), X(j + w), Z(i), Z(i + h)]);
  return {mesher: M, parts, windows, terraces, balconies};
}

// level-5 terraces open to the sky (Portal 1 as traced, Portal 2 mirrored) on a 25 cm grid over the footprint. The
// trace stops at the planters, 1–2 m short of the outer walls: a terrace reaches a wall where that wall has a
// level-5 void (the openings of render 03). Returns greedy rectangles for the floors, runs of the edges towards the
// roofed building (walls facing the terrace) and, per façade, runs along the outer wall: [u0, u1, open].
function terraceGrid(building, ex, openings) {
  const D = ex.depth, L = ex.length, half = L / 2, c = .25, W = Math.round(D / c), H = Math.round(L / c), g = new Uint8Array(W * H);
  const voids = key => (openings[key]?.openings || []).filter(o => o.kind === 'void' && o.level === '5');
  const zCourt = voids('courtyard').map(o => [o.u0 - half, o.u1 - half]), zStreet = voids('street').map(o => [half - o.u1, half - o.u0]);
  const xPeat = voids('peatonal').map(o => [o.u0, o.u1]), xFar = voids('far').map(o => [D - o.u1, D - o.u0]);
  const hits = (list, a, b) => list.some(([p, q]) => p < b && q > a);
  for (const u of building?.levels?.['5']?.units || []) {
    const k = u.cell || building.cell || .05;
    for (const [x, y, w, h] of u.ext || []) {
      if (w * k < 2.5 || h * k < 2.5) continue;                                                 // balconies and slivers
      for (const m of [1, -1]) {
        let x0 = u.x + x * k, x1 = u.x + (x + w) * k, za = Math.min(m * (u.y + y * k), m * (u.y + (y + h) * k)), zb = Math.max(m * (u.y + y * k), m * (u.y + (y + h) * k));
        if (x0 < 2.5 && hits(zCourt, za, zb)) x0 = 0;
        if (x1 > D - 2.5 && hits(zStreet, za, zb)) x1 = D;
        if (zb > half - 2.5 && hits(xPeat, x0, x1)) zb = half;
        if (za < -half + 2.5 && hits(xFar, x0, x1)) za = -half;
        const j0 = Math.max(0, Math.round(x0 / c)), j1 = Math.min(W, Math.round(x1 / c)), i0 = Math.max(0, Math.round((za + half) / c)), i1 = Math.min(H, Math.round((zb + half) / c));
        for (let i = i0; i < i1; i++) g.fill(1, i * W + j0, i * W + j1);
      }
    }
  }
  const at = (i, j) => g[i * W + j] === 1, edges = [];
  // edges between terrace and roof, merged into runs; each faces the terrace
  for (let i = 1; i < H; i++) for (let j = 0; j < W;) {
    const s = at(i, j) - at(i - 1, j); if (!s) { j++; continue; }
    let e = j + 1; while (e < W && at(i, e) - at(i - 1, e) === s) e++;
    const z = -half + i * c; edges.push(s > 0 ? [e * c, j * c, z, z, [0, 0, 1]] : [j * c, e * c, z, z, [0, 0, -1]]); j = e;
  }
  for (let j = 1; j < W; j++) for (let i = 0; i < H;) {
    const s = at(i, j) - at(i, j - 1); if (!s) { i++; continue; }
    let e = i + 1; while (e < H && at(e, j) - at(e, j - 1) === s) e++;
    const x = j * c; edges.push(s > 0 ? [x, x, -half + i * c, -half + e * c, [1, 0, 0]] : [x, x, -half + e * c, -half + i * c, [-1, 0, 0]]); i = e;
  }
  // runs along each outer wall, in that façade's u
  const runs = (n, open, u) => { const out = []; for (let k = 0; k < n;) { let e = k + 1; while (e < n && open(e) === open(k)) e++; const [a] = u(k), [, b] = u(e - 1); out.push([Math.min(a, b), Math.max(a, b), open(k)]); k = e; } return out; };
  const sides = {
    courtyard: runs(H, i => at(i, 0), i => [i * c, (i + 1) * c]), street: runs(H, i => at(i, W - 1), i => [L - i * c, L - (i + 1) * c]),
    peatonal: runs(W, j => at(H - 1, j), j => [j * c, (j + 1) * c]), far: runs(W, j => at(0, j), j => [D - j * c, D - (j + 1) * c]),
  };
  return {c, rects: rects(W, H, n => g[n] === 1), edges, sides};
}
