// Architecture of a dwelling from its plan voxels: walls, reveals, sills, lintels, ceilings, floors and the roof
// slab come out of one greedy face pass (lightmapped); windows, doors and roller shutters are built as parts.
import * as T from 'three';
import {BANDS, LEVEL, rects} from './plan.js';
import {Mesher, Parts, place} from './geometry.js';

const SLAB = 2.95, LV = [...BANDS, SLAB], NB = LV.length - 1;    // six bands: … 2.25–2.6 room, 2.6–2.95 slab

export function buildArchitecture(plan) {
  const {W, H, g, solid: S0, owner, rooms, X, Z, c} = plan;
  // band 5 (slab) over the interior and over full-height walls; terraces stay open to the sky
  const S = new Uint8Array(W * H);
  const floorCell = n => g[n] !== 0 && !(S0[n] & 1) && (g[n] !== 1 || S0[n] !== 0);
  const roomOf = n => owner[n] >= 0 ? rooms[owner[n]] : null;
  for (let n = 0; n < W * H; n++) {
    const covered = (S0[n] >> 4) & 1 || (floorCell(n) && g[n] >= 2 && !roomOf(n)?.exterior);
    S[n] = S0[n] | (covered ? 1 << 5 : 0);
  }
  const solid = (i, j, k) => (i < 0 || j < 0 || i >= H || j >= W) ? 0 : (S[i * W + j] >> k) & 1;

  const M = new Mesher();
  const MATS = ['paint', 'tile', 'ceiling', 'facade', 'coping', 'reveal'];
  // material of a vertical face, from the open cell it is seen from
  const sideMat = (i, j) => {
    const v = (i < 0 || j < 0 || i >= H || j >= W) ? 0 : g[i * W + j];
    if (v === 1 || v === 2 && owner[i * W + j] < 0) return 'reveal';
    const r = v === 0 ? null : roomOf(i * W + j);
    if (!r || r.exterior) return 'facade';
    return r.type === 'bath' ? 'tile' : 'paint';
  };
  const roomId = (i, j) => (i < 0 || j < 0 || i >= H || j >= W) ? -1 : owner[i * W + j];
  const code = (mat, room) => (MATS.indexOf(mat) + 1) * 128 + room + 1;
  const decode = id => [MATS[(id >> 7) - 1], (id & 127) - 1];

  // vertical faces across rows (planes z = Z(i)) and columns (x = X(j)), merged over cells × bands
  const mask = new Int32Array(Math.max(W, H) * NB);
  const sweep = (len, ids, emit) => {
    for (const [a, w, k0, h, id] of greedy2(ids, len, NB)) emit(a, a + w, k0, k0 + h, id);
  };
  for (let i = 0; i <= H; i++) for (const f of [1, -1]) {
    mask.fill(0, 0, W * NB);
    for (let j = 0; j < W; j++) for (let k = 0; k < NB; k++) {
      const s = f > 0 ? solid(i - 1, j, k) && !solid(i, j, k) : solid(i, j, k) && !solid(i - 1, j, k);
      if (!s) continue;
      const oi = f > 0 ? i : i - 1;                                  // the open cell the face looks into
      mask[k * W + j] = code(k === 5 ? 'facade' : sideMat(oi, j), roomId(oi, j));
    }
    sweep(W, mask, (j0, j1, k0, k1, id) => { const [m, room] = decode(id); M.wallZ(m, X(j0), X(j1), LV[k0], LV[k1], Z(i), f, {room}); });
  }
  for (let j = 0; j <= W; j++) for (const f of [1, -1]) {
    mask.fill(0, 0, H * NB);
    for (let i = 0; i < H; i++) for (let k = 0; k < NB; k++) {
      const s = f > 0 ? solid(i, j - 1, k) && !solid(i, j, k) : solid(i, j, k) && !solid(i, j - 1, k);
      if (!s) continue;
      const oj = f > 0 ? j : j - 1;
      mask[k * H + i] = code(k === 5 ? 'facade' : sideMat(i, oj), roomId(i, oj));
    }
    sweep(H, mask, (i0, i1, k0, k1, id) => { const [m, room] = decode(id); M.wallX(m, Z(i0), Z(i1), LV[k0], LV[k1], X(j), f, {room}); });
  }
  // horizontal faces at every band boundary: sill and parapet tops, lintel soffits, ceilings
  const cells = new Int32Array(W * H);
  for (let k = 1; k < NB; k++) for (const up of [true, false]) {
    cells.fill(0);
    for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
      const lo = solid(i, j, k - 1), hi = solid(i, j, k);
      if (up ? !(lo && !hi) : !(!lo && hi)) continue;
      const n = i * W + j, r = roomOf(n);
      const m = up ? (k === 2 ? 'coping' : 'reveal') : k === 5 && r && !r.exterior && g[n] >= 2 ? 'ceiling' : 'reveal';
      cells[n] = code(m, owner[n]);
    }
    for (const [j, w, i, h, id] of greedy2(cells, W, H)) { const [m, room] = decode(id); M.floor(m, X(j), X(j + w), Z(i), Z(i + h), LV[k], up, {room}); }
  }
  // the roof over the slab: never seen from inside, but it closes the wall tops (no sky leaking down a wall)
  cells.fill(0);
  for (let n = 0; n < W * H; n++) if ((S[n] >> 5) & 1) cells[n] = 1;
  for (const [j, w, i, h] of greedy2(cells, W, H)) M.floor('roof', X(j), X(j + w), Z(i), Z(i + h), SLAB, true, {lm: false});
  // floors per room: SPC plank inside, porcelain in baths, porcelain pavers on terraces, stone thresholds
  const FMATS = ['wood', 'bathFloor', 'terrace', 'threshold'];
  cells.fill(0);
  for (let n = 0; n < W * H; n++) {
    if (!floorCell(n)) continue;
    const r = roomOf(n), m = !r ? 'threshold' : r.exterior ? 'terrace' : r.type === 'bath' ? 'bathFloor' : 'wood';
    cells[n] = (FMATS.indexOf(m) + 1) * 128 + owner[n] + 1;
  }
  for (const [j, w, i, h, id] of greedy2(cells, W, H)) M.floor(FMATS[(id >> 7) - 1], X(j), X(j + w), Z(i), Z(i + h), 0, true, {room: (id & 127) - 1});

  // skirting (PVC, as the memoria: every interior room except baths) along painted wall feet
  const parts = new Parts();
  const skirt = (x0, x1, z0, z1, room) => parts.add('skirting', new T.BoxGeometry(Math.max(x1 - x0, .001), .07, Math.max(z1 - z0, .001)), place((x0 + x1) / 2, .035, (z0 + z1) / 2), {room});
  for (const B of M.buckets.values()) if (B.name === 'paint') for (const ch of B.charts) {
    const o = ch.vertex * 3, p = B.p, n = B.n;
    const y0 = Math.min(p[o + 1], p[o + 4], p[o + 7], p[o + 10]);
    if (y0 > .001 || ch.room < 0 || rooms[ch.room]?.exterior) continue;
    const xs = [p[o], p[o + 3], p[o + 6], p[o + 9]], zs = [p[o + 2], p[o + 5], p[o + 8], p[o + 11]];
    const nx = n[o], nz = n[o + 2], t = .012;
    if (Math.abs(nz) > .5) skirt(Math.min(...xs), Math.max(...xs), zs[0], zs[0] + nz * t, ch.room);
    else skirt(xs[0], xs[0] + nx * t, Math.min(...zs), Math.max(...zs), ch.room);
  }
  openingParts(plan, parts);
  return {mesher: M, parts};
}

// greedy rectangles over an id grid (len × rows), equal non-zero ids merge: yields [a, w, b, h, id]
function* greedy2(ids, len, rows) {
  const used = new Uint8Array(len * rows);
  for (let b = 0; b < rows; b++) for (let a = 0; a < len;) {
    const id = ids[b * len + a];
    if (!id || used[b * len + a]) { a++; continue; }
    let a1 = a + 1; while (a1 < len && ids[b * len + a1] === id && !used[b * len + a1]) a1++;
    let b1 = b + 1;
    grow: for (; b1 < rows; b1++) for (let q = a; q < a1; q++) if (ids[b1 * len + q] !== id || used[b1 * len + q]) break grow;
    for (let r = b; r < b1; r++) used.fill(1, r * len + a, r * len + a1);
    yield [a, a1 - a, b, b1 - b, id]; a = a1;
  }
}

// ---- windows, balcony doors, interior doors, roller shutters --------------------------------------------
export const SHUTTER = {slat: .045, slit: .009};           // aluminium lamas; the slit is what a lowered persiana leaves open

function openingParts(plan, parts) {
  const {rooms} = plan;
  for (const o of plan.openings) {
    const [a0, a1] = o.a, [t0, t1] = o.t, len = a1 - a0;
    // local frame: u along the wall, w across it towards the inside (w = 0 outer face), y up
    const outer = o.inside < 0 ? t1 : t0, sgn = o.inside < 0 ? -1 : 1, depth = t1 - t0;
    const at = (u, y, w) => o.horiz ? [a0 + u, y, outer + sgn * w] : [outer + sgn * w, y, a0 + u];
    const yaw = o.horiz ? (sgn > 0 ? 0 : Math.PI) : (sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
    const box = (mat, u0, u1, y0, y1, w0, w1) => {
      const [cx, cy, cz] = at((u0 + u1) / 2, (y0 + y1) / 2, (w0 + w1) / 2);
      parts.add(mat, new T.BoxGeometry(u1 - u0, y1 - y0, w1 - w0), place(cx, cy, cz, yaw), {room: o.room});
    };
    if (o.kind === 'door') { interiorDoor(o, box, len, depth, rooms); continue; }
    if (o.kind === 'frame') continue;
    const sill = o.kind === 'window' ? LEVEL.sill : 0, head = LEVEL.head, wg = Math.min(.12, depth * .4);   // glass plane depth from outside
    // PVC frame (anthracite outside, as the façades), sashes and double glazing
    const fw = .07, fd = .07;
    box('pvc', 0, fw, sill, head, wg - fd / 2, wg + fd / 2); box('pvc', len - fw, len, sill, head, wg - fd / 2, wg + fd / 2);
    box('pvc', 0, len, head - fw, head, wg - fd / 2, wg + fd / 2); box('pvc', 0, len, sill, sill + (sill ? fw : .03), wg - fd / 2, wg + fd / 2);
    const leaves = len > 1.3 ? 2 : 1, lw = (len - 2 * fw) / leaves;
    for (let s = 0; s < leaves; s++) {
      const u0 = fw + s * lw, u1 = u0 + lw, y0 = sill + (sill ? fw : .03), y1 = head - fw, sw = .065;
      box('pvc', u0, u1, y0, y0 + sw, wg - .03, wg + .035); box('pvc', u0, u1, y1 - sw, y1, wg - .03, wg + .035);
      box('pvc', u0, u0 + sw, y0, y1, wg - .03, wg + .035); box('pvc', u1 - sw, u1, y0, y1, wg - .03, wg + .035);
      box('glass', u0 + sw, u1 - sw, y0 + sw, y1 - sw, wg - .006, wg + .006);
      const hu = s === 0 && leaves === 2 ? u1 - .045 : u0 + .045;            // handle on the meeting stile
      box('chrome', hu - .01, hu + .01, (y0 + y1) / 2 - .07, (y0 + y1) / 2 + .07, wg + .035, wg + .06);
    }
    // interior sill board (window) or threshold (balcony door)
    if (sill) box('stone', -.02, len + .02, sill - .02, sill, wg + fd / 2, depth + .025);
    else box('stone', 0, len, -.005, .012, 0, depth);
    // exterior roller shutter: guides in the reveal, the curtain lowered to `lower` (set by the lighting preset)
    const ws = Math.max(.02, wg - .07);
    box('alu', -.005, .025, sill, head, ws - .02, ws + .02); box('alu', len - .025, len + .005, sill, head, ws - .02, ws + .02);
    o.shutter = {at, yaw, len, sill, head, ws, room: o.room};
  }
}

function interiorDoor(o, box, len, depth, rooms) {
  const leafH = 2.03, th = .04, arch = .07, leaf = Math.min(len - .04, .82);
  // jambs and head lining across the wall, architraves on both faces
  box('lacquer', 0, .02, 0, LEVEL.door, 0, depth); box('lacquer', len - .02, len, 0, LEVEL.door, 0, depth);
  box('lacquer', 0, len, LEVEL.door - .02, LEVEL.door, 0, depth);
  for (const [w0, w1] of [[-.012, 0], [depth, depth + .012]]) {
    box('lacquer', -arch + .02, .02, 0, LEVEL.door + arch - .02, w0, w1); box('lacquer', len - .02, len + arch - .02, 0, LEVEL.door + arch - .02, w0, w1);
    box('lacquer', -arch + .02, len + arch - .02, LEVEL.door - .02, LEVEL.door + arch - .02, w0, w1);
  }
  // leaf opened 90° into the room (bedroom, living) rather than the corridor, and into the corridor rather than
  // the bath, as Bamaire's plans draw them (glazed in the living room). w runs from side B's face (0) to side A's
  const [ra, rb] = o.rooms.map(r => rooms[r]?.type), rank = t => t === 'bath' ? 0 : t === 'circulation' ? 1 : 2;
  const intoB = rank(rb) >= rank(ra);
  const wIn = intoB ? 0 : depth, s = intoB ? -1 : 1;
  const glazed = ra === 'living_kitchen' || rb === 'living_kitchen';
  box('lacquer', .02, .02 + th, 0, leafH, wIn + s * .005, wIn + s * (leaf + .005));
  if (glazed) box('glassDoor', .015, .025 + th + .005, .35, leafH - .35, wIn + s * .12, wIn + s * (leaf - .12));
  box('chrome', .02 + th, .02 + th + .05, 1.0, 1.02, wIn + s * (leaf - .07), wIn + s * (leaf - .05));
  box('chrome', -.03, .02, 1.0, 1.02, wIn + s * (leaf - .07), wIn + s * (leaf - .05));
  // light switches beside the door, on both faces of the wall
  for (const [w0, w1] of [[-.009, -.001], [depth + .001, depth + .009]]) box('switch', len + .11, len + .19, 1.02, 1.1, w0, w1);
}

// the lowered part of every shutter: slats with slits; returns one geometry per shutter so presets can move them
export function shutterGeometry(sh, lower) {
  const {at, yaw, len, sill, head, ws, room} = sh, parts = new Parts();
  const bottom = head - lower * (head - sill), pitch = SHUTTER.slat + SHUTTER.slit;
  const slat = new T.BoxGeometry(len - .04, SHUTTER.slat - .004, .012);
  for (let y = head - SHUTTER.slat / 2; y > bottom + SHUTTER.slat / 2; y -= pitch) { const [x, , z] = at(len / 2, 0, ws); parts.add('alu', slat, place(x, y, z, yaw), {room}); }
  if (lower > .02) { const [x, , z] = at(len / 2, 0, ws); parts.add('alu', new T.BoxGeometry(len - .04, .05, .03), place(x, bottom + .025, z, yaw), {room}); }
  return parts;
}
