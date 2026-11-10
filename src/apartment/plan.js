// A traced dwelling (dist/models/<promotion>/units/<code>.json, 5 cm cells) read as architecture.
// Walls become voxels in five height bands, so sills, lintels, parapets and window reveals come out exact.
// World axes: x to the plan's right, z down the plan, y up; metres; the finished floor is y = 0.

export const LEVEL = {sill: 1.0, parapet: 1.1, door: 2.1, head: 2.25, clear: 2.6};
export const BANDS = [0, LEVEL.sill, LEVEL.parapet, LEVEL.door, LEVEL.head, LEVEL.clear];
// solid bands per cell (bit k = band k)
export const SOLID = {full: 0b11111, window: 0b10001, frame: 0b10011, balcony: 0b10000, lintel: 0b11000, parapet: 0b00011};

const WALL = 1, GAP = 2, N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const isRoom = v => v >= 3;

// The trace (5 cm cells) leaves wall faces with short jogs of one to three cells; a real wall is straight. Every
// bump or notch up to 40 cm long and 15 cm deep, between two stretches of the same face of the same room, is
// levelled with them (openings untouched). Returns the number of cells changed.
export function straighten(g, W, H) {
  let changed = 0;
  const views = [
    [H, W, (i, j) => i * W + j], [H, W, (i, j) => (H - 1 - i) * W + j],     // wall above / below the room
    [W, H, (i, j) => j * W + i], [W, H, (i, j) => j * W + (W - 1 - i)],     // wall left / right of the room
  ];
  for (let pass = 0; pass < 2; pass++) for (const [R, C, at] of views) {
    const v = (i, j) => (i < 0 || j < 0 || i >= R || j >= C) ? 0 : g[at(i, j)];
    const face = (i, j, room) => v(i, j) === room && v(i - 1, j) === WALL;
    for (let i = 1; i < R; i++) for (let j = 1; j < C - 1;) {
      const room = v(i, j);
      if (room < 3 || !face(i, j, room) || face(i, j - 1, room)) { j++; continue; }
      let j1 = j; while (j1 + 1 < C && face(i, j1 + 1, room)) j1++;            // run of this face: j..j1
      const len = j1 - j + 1;
      if (len <= 8) for (let d = -3; d <= 3; d++) {
        if (!d || !face(i + d, j - 1, room) || !face(i + d, j1 + 1, room)) continue;
        const [a, b, from, to] = d < 0 ? [i + d, i, WALL, room] : [i, i + d, room, WALL];   // bump of wall / notch of room
        let ok = true;
        for (let r = a; r < b && ok; r++) for (let q = j; q <= j1; q++) if (v(r, q) !== from) { ok = false; break; }
        if (!ok) continue;
        for (let r = a; r < b; r++) for (let q = j; q <= j1; q++) { g[at(r, q)] = to; changed++; }
        break;
      }
      j = j1 + 1;
    }
  }
  return changed;
}

export function readPlan(u) {
  const {cell: c, w: W, h: H} = u;
  const g = new Uint8Array(W * H);
  let k = 0;
  for (const tok of u.grid.split(',')) { const [v, n] = tok.split(':').map(Number); g.fill(v, k, k + n); k += n; }
  const straightened = straighten(g, W, H);
  const ox = W * c / 2, oz = H * c / 2;
  const X = j => j * c - ox, Z = i => i * c - oz;
  const at = (i, j) => (i < 0 || j < 0 || i >= H || j >= W) ? 0 : g[i * W + j];
  const rooms = u.rooms.map((r, n) => ({...r, v: n + 3, index: n, exterior: r.type === 'exterior'}));
  const roomAt = v => isRoom(v) ? rooms[v - 3] : null;
  const interior = v => v === GAP || (isRoom(v) && !roomAt(v).exterior);
  const flood = (seed, step) => {                             // breadth-first over cells: step(from, to) → accept
    const q = [...seed];
    for (let h = 0; h < q.length; h++) {
      const n = q[h], i = (n / W) | 0, j = n % W;
      for (const [di, dj] of N4) {
        const i2 = i + di, j2 = j + dj;
        if (i2 >= 0 && j2 >= 0 && i2 < H && j2 < W && step(n, i2 * W + j2)) q.push(i2 * W + j2);
      }
    }
  };

  // owner room of every floor cell (gaps take the room they open into)
  const owner = new Int16Array(W * H).fill(-1), rooms0 = [];
  for (let n = 0; n < W * H; n++) if (isRoom(g[n])) { owner[n] = g[n] - 3; rooms0.push(n); }
  flood(rooms0, (n, m) => g[m] === GAP && owner[m] < 0 && ((owner[m] = owner[n]), true));

  // wall cells within 0,5 m of the interior are full height; the rest bound terraces
  const near = new Int16Array(W * H).fill(-1), inside0 = [];
  for (let n = 0; n < W * H; n++) if (interior(g[n])) { near[n] = 0; inside0.push(n); }
  flood(inside0, (n, m) => g[m] === WALL && near[m] < 0 && near[n] < 10 && ((near[m] = near[n] + 1), true));

  // openings, classified by what lies on each side of the wall and cut through its whole thickness
  const openings = [], cuts = [];
  for (const o of u.openings) {
    const horiz = o.w >= o.h, [i0, i1, j0, j1] = [o.y, o.y + o.h, o.x, o.x + o.w];
    const mi = (i0 + i1 - 1) >> 1, mj = (j0 + j1 - 1) >> 1;
    const side = s => {                                       // first floor/void cell across the wall, s = ±1
      let i = horiz ? (s < 0 ? i0 - 1 : i1) : mi, j = horiz ? mj : (s < 0 ? j0 - 1 : j1), steps = 0;
      while ((at(i, j) === WALL || at(i, j) === GAP) && steps++ < 14) { if (horiz) i += s; else j += s; }
      return {v: at(i, j), edge: (horiz ? i : j) + (s < 0 ? 1 : 0)};
    };
    const a = side(-1), b = side(1), inA = interior(a.v), inB = interior(b.v);
    const kind = inA && inB ? 'door' : !inA && !inB ? 'frame'
      : (a.v === 0 || b.v === 0) && o.kind !== 'balcony_door' ? 'window' : 'balcony';
    const depth = (b.edge - a.edge) * c;
    let p0 = horiz ? j0 : i0, p1 = horiz ? j1 : i1;
    if (kind === 'door') {
      if (depth > .45) continue;                              // a passage area, not a door in a wall
      if ((p1 - p0) * c > 1.05) {                             // traced gap wider than a door: 0,9 m leaf opening, wall either side
        const keep = Math.round(.9 / c), mid = (p0 + p1) >> 1, q0 = mid - (keep >> 1);
        for (const [s0, s1] of [[p0, q0], [q0 + keep, p1]]) cuts.push({horiz, p0: s0, p1: s1, span: [a.edge, b.edge], mask: SOLID.full});
        p0 = q0; p1 = q0 + keep;
      }
    }
    const P = horiz ? X : Z, Q = horiz ? Z : X;
    openings.push({kind, horiz, a: [P(p0), P(p1)], t: [Q(a.edge), Q(b.edge)], len: (p1 - p0) * c, depth,
      room: roomAt(inA ? a.v : b.v)?.index ?? -1, inside: inA ? -1 : 1, rooms: [roomAt(a.v)?.index ?? -1, roomAt(b.v)?.index ?? -1]});
    cuts.push({horiz, p0, p1, span: [a.edge, b.edge], mask: {window: SOLID.window, frame: SOLID.frame, balcony: SOLID.balcony, door: SOLID.lintel}[kind], frame: kind === 'frame'});
  }

  // terrace walls: parapets, except wall runs that carry open frames (kept full height between the frames)
  const solid = new Uint8Array(W * H), tall = new Uint8Array(W * H), framed = [];
  for (const k of cuts) if (k.frame) for (let p = k.p0; p < k.p1; p++) for (let q = k.span[0]; q < k.span[1]; q++) framed.push(k.horiz ? q * W + p : p * W + q);
  framed.forEach(n => { tall[n] = 1; });
  flood(framed, (n, m) => g[m] === WALL && near[m] < 0 && !tall[m] && (tall[m] = 1));
  for (let n = 0; n < W * H; n++) if (g[n] === WALL) solid[n] = near[n] >= 0 || tall[n] ? SOLID.full : SOLID.parapet;
  for (const k of cuts) for (let p = k.p0; p < k.p1; p++) for (let q = k.span[0]; q < k.span[1]; q++) {
    const n = k.horiz ? q * W + p : p * W + q;
    if (g[n] === WALL || g[n] === GAP) solid[n] = k.mask;
  }

  return {u, c, W, H, g, at, X, Z, ox, oz, rooms, owner, solid, openings, interior, straightened, size: [W * c, H * c],
    cellOf: (x, z) => [Math.floor((z + oz) / c), Math.floor((x + ox) / c)]};
}

// Greedy rectangles [j, i, w, h] over a predicate on cell indices
export function rects(W, H, test) {
  const used = new Uint8Array(W * H), out = [];
  for (let i = 0; i < H; i++) for (let j = 0; j < W;) {
    if (used[i * W + j] || !test(i * W + j)) { j++; continue; }
    let j1 = j + 1; while (j1 < W && !used[i * W + j1] && test(i * W + j1)) j1++;
    let i1 = i + 1;
    grow: for (; i1 < H; i1++) for (let q = j; q < j1; q++) if (used[i1 * W + q] || !test(i1 * W + q)) break grow;
    for (let a = i; a < i1; a++) used.fill(1, a * W + j, a * W + j1);
    out.push([j, i, j1 - j, i1 - i]); j = j1;
  }
  return out;
}
