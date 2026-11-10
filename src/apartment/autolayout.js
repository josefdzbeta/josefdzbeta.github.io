// Furniture for dwellings without a transcribed layout, from the traced plan alone: the plan's bed symbols and
// hob, the wall runs of every room, clear swing zones in front of the doors and the most open spots. It uses the
// same pieces as the curated layouts (layouts.js) and returns them in world units.

const DIRS = {N: [-1, 0], S: [1, 0], W: [0, -1], E: [0, 1]};           // towards the wall, in cells (di, dj)
const YAW = {N: 0, S: Math.PI, W: Math.PI / 2, E: -Math.PI / 2};      // the piece's front faces away from that wall

export function autoLayout(plan) {
  const {W, H, c, g, owner, solid, rooms, X, Z, u} = plan;
  const occ = new Uint8Array(W * H), items = [];
  const floor = n => g[n] >= 2 && !(solid[n] & 1);
  const fullWall = n => (solid[n] & 0b100) !== 0;
  const cellRange = (x0, x1, z0, z1, f) => {
    const j0 = Math.max(0, Math.floor((x0 + plan.ox) / c + .01)), j1 = Math.min(W, Math.ceil((x1 + plan.ox) / c - .01));
    const i0 = Math.max(0, Math.floor((z0 + plan.oz) / c + .01)), i1 = Math.min(H, Math.ceil((z1 + plan.oz) / c - .01));
    for (let i = i0; i < i1; i++) for (let j = j0; j < j1; j++) if (f(i * W + j) === false) return false;
    return true;
  };
  // doors and balcony doors keep a clear 0,7 m on both sides
  for (const o of plan.openings) {
    if (o.kind !== 'door' && o.kind !== 'balcony') continue;
    const [a0, a1] = o.a, [t0, t1] = o.t;
    const [x0, x1, z0, z1] = o.horiz ? [a0 - .05, a1 + .05, t0 - .7, t1 + .7] : [t0 - .7, t1 + .7, a0 - .05, a1 + .05];
    cellRange(x0, x1, z0, z1, n => { if (!occ[n]) occ[n] = 2; });
  }
  // footprint of a piece (yaw a multiple of 90°) must be this room's free floor; then it is taken
  const box = (x, z, w, d, yaw) => { const q = Math.abs(Math.sin(yaw)) > .5; const hw = (q ? d : w) / 2, hd = (q ? w : d) / 2; return [x - hw, x + hw, z - hd, z + hd]; };
  const fits = (r, x, z, w, d, yaw) => { const [a, b, e, f] = box(x, z, w, d, yaw); return cellRange(a, b, e, f, n => owner[n] === r && floor(n) && !occ[n] ? undefined : false); };
  const take = (x, z, w, d, yaw) => { const [a, b, e, f] = box(x, z, w, d, yaw); cellRange(a, b, e, f, n => { occ[n] = 1; }); };
  // the piece itself goes into the list (callers size it after placing it)
  const put = (it, r, w, d) => { if (!fits(r, it.x, it.z, w, d, it.yaw)) return false; take(it.x, it.z, w, d, it.yaw); it.y = 0; items.push(it); return true; };

  // wall runs of a room: contiguous stretches of full-height wall, as {dir, face (world), a0, a1 (world along)}
  function runs(r) {
    const out = [];
    for (const [dir, [di, dj]] of Object.entries(DIRS)) {
      const lines = new Map();
      for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
        const n = i * W + j, i2 = i + di, j2 = j + dj;
        if (owner[n] !== r || !floor(n) || i2 < 0 || j2 < 0 || i2 >= H || j2 >= W || !fullWall(i2 * W + j2)) continue;
        const key = di ? i : j; (lines.get(key) || lines.set(key, []).get(key)).push(di ? j : i);
      }
      for (const [line, along] of lines) {
        along.sort((p, q) => p - q);
        for (let s = 0; s < along.length;) {
          let e = s; while (e + 1 < along.length && along[e + 1] === along[e] + 1) e++;
          const face = dir === 'N' ? Z(line) : dir === 'S' ? Z(line + 1) : dir === 'W' ? X(line) : X(line + 1);
          const a0 = di ? X(along[s]) : Z(along[s]), a1 = di ? X(along[e] + 1) : Z(along[e] + 1);
          if (a1 - a0 >= .5) out.push({dir, face, a0, a1, len: a1 - a0});
          s = e + 1;
        }
      }
    }
    return out.sort((p, q) => q.len - p.len);
  }
  // a piece against a run: centre `s` along it, depth d out from the wall face
  const against = (run, s, d) => {
    const n = {N: [0, 1], S: [0, -1], W: [1, 0], E: [-1, 0]}[run.dir], horiz = run.dir === 'N' || run.dir === 'S';
    return {x: horiz ? s : run.face + n[0] * d / 2, z: horiz ? run.face + n[1] * d / 2 : s, yaw: YAW[run.dir]};
  };
  // try a piece along a run: centred, then sliding along it
  const along = (r, run, k, w, d, extra = {}, prefer = (run.a0 + run.a1) / 2) => {
    if (run.len < w + .02) return null;
    const lo = run.a0 + w / 2 + .01, hi = run.a1 - w / 2 - .01, s0 = Math.max(lo, Math.min(hi, prefer));
    for (const off of [0, .2, -.2, .4, -.4, .7, -.7, 1, -1, 1.4, -1.4]) {
      const s = s0 + off; if (s < lo || s > hi) continue;
      const it = {k, ...against(run, s, d), ...extra};
      if (put(it, r, w, d)) return it;
    }
    return null;
  };
  // the most open free spot of a room (distance to anything taken or walled, in metres)
  function openSpot(r, need) {
    const dist = new Float32Array(W * H).fill(-1), q = [];
    for (let n = 0; n < W * H; n++) if (owner[n] !== r || !floor(n) || occ[n] === 1) { dist[n] = 0; q.push(n); }
    for (let h = 0; h < q.length; h++) { const n = q[h], i = (n / W) | 0, j = n % W; for (const [di, dj] of Object.values(DIRS)) { const i2 = i + di, j2 = j + dj; if (i2 < 0 || j2 < 0 || i2 >= H || j2 >= W) continue; const m = i2 * W + j2; if (dist[m] < 0) { dist[m] = dist[n] + 1; q.push(m); } } }
    let best = -1; for (let n = 0; n < W * H; n++) if (owner[n] === r && occ[n] !== 2 && (best < 0 || dist[n] > dist[best])) best = n;
    return best >= 0 && dist[best] * c >= need ? {x: X(best % W + .5), z: Z(((best / W) | 0) + .5), clear: dist[best] * c} : null;
  }
  const centre = r => ({x: X(r.label[0]), z: Z(r.label[1])});

  // ---- kitchens: the run along the hob's wall (or the longest one)
  const kitchenOf = rooms.filter(r => r.type === 'kitchen' || r.type === 'living_kitchen');
  for (const r of kitchenOf) {
    const hx = u.hob ? X(u.hob[0]) : null, hz = u.hob ? Z(u.hob[1]) : null;
    const rr = runs(r.index).filter(q => q.len >= 1.2).sort((p, q) => hx == null ? 0 : distTo(p, hx, hz) - distTo(q, hx, hz));
    let it = null, run = null, L = 0, hob = null;
    for (const q of rr) {                                                      // the hob's wall first, then the others
      hob = hx == null ? null : q.dir === 'N' || q.dir === 'S' ? hx : hz;
      for (L = Math.min(q.len - .02, r.type === 'kitchen' ? 4.2 : 3.6); L >= 1.2 && !it; L -= .3) it = along(r.index, q, 'kitchen', L, .62, {}, hob ?? (q.a0 + q.a1) / 2);
      if (it) { run = q; L += .3; break; }
    }
    if (!it) continue;
    const toLocal = s => (run.dir === 'N' ? 1 : run.dir === 'S' ? -1 : run.dir === 'W' ? -1 : 1) * (s - (run.dir === 'N' || run.dir === 'S' ? it.x : it.z));
    it.w = L; it.hob = Math.max(-L / 2 + .35, Math.min(L / 2 - .35, hob != null && distTo(run, hx, hz) < 1 ? toLocal(hob) : L / 4));
    it.sink = it.hob > 0 ? it.hob - 1.0 : it.hob + 1.0; if (Math.abs(it.sink) > L / 2 - .4) it.sink = null;
    const n = Math.max(1, Math.round(L / 1.2));
    for (let k = 0; k < n; k++) items.push({k: 'downlight', y: 0, ...shift(it, (k + .5) / n * L - L / 2, .45)});
    // what a stylist leaves on the worktop, away from the hob and the sink
    const busy = [it.hob, it.sink].filter(v => v != null), freeAt = x => busy.every(b => Math.abs(b - x) > .45) && Math.abs(x) < L / 2 - .2;
    const spots = [-L / 2 + .3, -L / 2 + .75, L / 2 - .3, L / 2 - .75, 0].filter(freeAt);
    ['fruitBowl', 'kettle', 'board', 'herbs'].slice(0, spots.length).forEach((k, i) => items.push({k, y: 0, ...shift(it, spots[i], -.02), top: .9}));
  }
  // ---- living rooms: sofa on the longest free wall, TV facing it, coffee table and rug between; dining set
  for (const r of rooms.filter(q => q.type === 'living' || q.type === 'living_kitchen')) {
    const rr = runs(r.index);
    let sofa = null;
    for (const want of [2.4, 1.9]) for (const run of rr) {
      if (sofa || run.len < want + .1) continue;
      sofa = along(r.index, run, 'sofaL', want, .95, {}); if (sofa) Object.assign(sofa, {L: want, D: .95, E: .95, Dr: .9, run});
    }
    if (sofa) {
      const opp = {N: 'S', S: 'N', W: 'E', E: 'W'}[sofa.run.dir], s = sofa.run.dir === 'N' || sofa.run.dir === 'S' ? sofa.x : sofa.z;
      const tvRun = rr.filter(q => q.dir === opp && q.a0 < s - .8 && q.a1 > s + .8 && Math.abs(q.face - sofa.run.face) > 2.6 && Math.abs(q.face - sofa.run.face) < 5.5)[0];
      if (tvRun) {
        const tv = along(r.index, tvRun, 'tvUnit', 1.6, .42, {}, s);
        if (tv) { tv.w = 1.6; tv.d = .42; }
        const gap = Math.abs(tvRun.face - sofa.run.face), mid = shift(sofa, 0, .95 / 2 + (gap - .95 - .42) / 2);
        items.push({k: 'rug', y: 0, ...mid, w: 2.0, d: 1.6});
        if (fits(r.index, mid.x, mid.z, 1.0, .55, mid.yaw)) { take(mid.x, mid.z, 1.0, .55, mid.yaw); items.push({k: 'coffee', y: 0, ...mid, w: 1.0, d: .55}, {k: 'bookStack', y: 0, ...shift(mid, -.2, 0), top: .406}); }
      }
      items.push({k: 'art', y: 0, ...shift(sofa, 0, -.95 / 2), aw: 1.0, ah: .7, ay: 1.5, seed: 3 + r.index});
      const lamp = shift(sofa, sofa.L / 2 + .25, -.2);
      if (fits(r.index, lamp.x, lamp.z, .35, .35, 0)) { take(lamp.x, lamp.z, .35, .35, 0); items.push({k: 'floorLamp', y: 0, ...lamp, yaw: sofa.yaw + Math.PI}); }
      items.push({k: 'sofaThrow', y: 0, ...shift(sofa, sofa.L / 2 - .08, 0), yaw: sofa.yaw + Math.PI / 2});   // over the free arm, draping outside
    }
    // a tall plant beside the main window
    const win = plan.openings.filter(o => o.room === r.index && o.kind !== 'door').sort((p, q) => q.len - p.len)[0];
    if (win) for (const u of [win.a[0] - .45, win.a[1] + .45]) {
      const inward = win.inside < 0 ? win.t[0] - .45 : win.t[1] + .45, x = win.horiz ? u : inward, z = win.horiz ? inward : u;
      if (fits(r.index, x, z, .5, .5, 0)) { take(x, z, .5, .5, 0); items.push({k: 'plantTall', y: 0, x, z, yaw: 0}); break; }
    }
    const spot = openSpot(r.index, 1.15);
    if (spot) {
      const t = {k: 'table', x: spot.x, z: spot.z, yaw: 0, w: 1.4, d: .85};
      if (put(t, r.index, 1.4, .85)) {
        items.push({k: 'pendant', y: 0, x: t.x, z: t.z});
        for (const [dx, dz, yaw] of [[-.35, -.65, 0], [.35, -.65, 0], [-.35, .65, Math.PI], [.35, .65, Math.PI]]) items.push({k: 'chair', y: 0, x: t.x + dx, z: t.z + dz, yaw});
        items.push({k: 'vase', y: 0, x: t.x, z: t.z, top: .762});
      }
    }
  }
  // ---- bedrooms: beds from the plan's symbols (headboard on the nearer wall), nightstands, wardrobe, lamp
  const beds = u.beds || [];
  for (const r of rooms.filter(q => q.type === 'bedroom')) {
    const mine = beds.filter(b => b[4] === r.index);
    for (const [bx, by, bw, bh] of mine) {
      // the bed stands where the plan draws it; its headboard goes to the nearest wall (window walls included)
      const cx = X(bx + bw / 2), cz = Z(by + bh / 2), square = Math.abs(bw - bh) < 8;
      const ends = (square || bh >= bw ? ['N', 'S'] : []).concat(square || bw > bh ? ['W', 'E'] : []);
      const gap = dir => { const [di, dj] = DIRS[dir]; let i = dir === 'N' ? by - 1 : dir === 'S' ? by + bh : by + (bh >> 1), j = dir === 'W' ? bx - 1 : dir === 'E' ? bx + bw : bx + (bw >> 1), k = 0;
        while (i >= 0 && j >= 0 && i < H && j < W && floor(i * W + j) && k < 40) { i += di; j += dj; k++; } return k; };
      const dir = ends.sort((p, q) => gap(p) - gap(q))[0], vertical = dir === 'N' || dir === 'S';
      const width = vertical ? bw * c : bh * c, dbl = width > 1.15, w = dbl ? 1.5 : .9, l = dbl ? 2.0 : 1.9, yaw = YAW[dir];
      // pushed back onto that wall
      const [di, dj] = DIRS[dir], wallAt = vertical ? (dir === 'N' ? Z(by - gap(dir)) : Z(by + bh + gap(dir))) : (dir === 'W' ? X(bx - gap(dir)) : X(bx + bw + gap(dir)));
      const bed = {k: 'bed', y: 0, yaw, w, l, double: dbl, x: vertical ? cx : wallAt - dj * (l + .18) / 2, z: vertical ? wallAt - di * (l + .18) / 2 : cz};
      take(...[bed.x, bed.z, w + .14, l + .18, yaw]); items.push(bed);
      for (const side of [-1, 1]) { const p = shift(bed, side * (w / 2 + .3), -(l + .18) / 2 + .21); if (fits(r.index, p.x, p.z, .46, .4, p.yaw)) { take(p.x, p.z, .46, .4, p.yaw); items.push({k: 'nightstand', y: 0, ...p}); } }
      items.push({k: 'art', y: 0, ...shift(bed, 0, -(l + .18) / 2), aw: dbl ? 1.0 : .5, ah: .7, ay: 1.6, seed: 5 + r.index});
    }
    if (!mine.length) {                                                                  // no bed symbol: a double bed on the longest wall
      for (const run of runs(r.index)) { const b = along(r.index, run, 'bed', 1.64, 2.18, {w: 1.5, l: 2.0, double: true}); if (b) break; }
    }
    const rr = runs(r.index).filter(q => q.len >= 1.0);
    for (const run of rr) { const w = Math.min(run.len - .02, 2.0); if (along(r.index, run, 'wardrobe', w, .6, {w, d: .6})) break; }
    items.push({k: 'ceilingLamp', y: 0, ...centre(r)});
  }
  // ---- bathrooms: shower tray at one end of the longest wall, then WC and basin, each trying every wall
  for (const r of rooms.filter(q => q.type === 'bath')) {
    const rr = runs(r.index); if (!rr.length) continue;
    const d = Math.min(1.4, Math.max(.8, r.area / 1.8));
    const endOf = run => { const ax = {N: 1, S: -1, W: -1, E: 1}[run.dir]; return [ax > 0 ? run.a0 : run.a1, ax]; };   // tray screen faces the room
    for (const run of rr) {
      const [st, ax] = endOf(run), tray = along(r.index, run, 'shower', .8, d, {w: .8, d}, st + ax * .41);
      if (tray) { items.push({k: 'bathMat', y: 0, ...shift(tray, .8 / 2 + .3, 0), w: .5, d: .8}); break; }
    }
    for (const [k, w, dd] of [['toilet', .42, .62], ['basin', .62, .47]]) for (const run of rr) if (along(r.index, run, k, w, dd)) break;
    items.push({k: 'downlight', y: 0, ...centre(r)});
  }
  // ---- corridors and terraces
  for (const r of rooms.filter(q => q.type === 'circulation')) items.push({k: 'downlight', y: 0, ...centre(r)});
  for (const r of rooms.filter(q => q.exterior)) {
    const spot = openSpot(r.index, r.area > 6 ? .95 : .55);
    if (spot && r.area > 6 && put({k: 'teakTable', x: spot.x, z: spot.z, yaw: 0, w: .8, d: 1.2}, r.index, .8, 1.2)) {
      for (const [dx, dz, yaw] of [[-.55, -.25, Math.PI / 2], [-.55, .25, Math.PI / 2], [.55, -.25, -Math.PI / 2], [.55, .25, -Math.PI / 2]]) items.push({k: 'teakChair', y: 0, x: spot.x + dx, z: spot.z + dz, yaw});
    } else if (spot) put({k: 'wickerChair', x: spot.x, z: spot.z, yaw: 0}, r.index, .8, .8);
    const corner = openSpot(r.index, .3);
    if (corner) items.push({k: 'planter', y: 0, x: corner.x, z: corner.z, r: .3, h: .55});
  }
  return items;
}

const distTo = (run, x, z) => run.dir === 'N' || run.dir === 'S' ? Math.hypot(Math.max(run.a0, Math.min(run.a1, x)) - x, run.face - z) : Math.hypot(run.face - x, Math.max(run.a0, Math.min(run.a1, z)) - z);
// a point in a piece's local frame (x along its width, z out of its front) in world coordinates, keeping its facing
const shift = (it, lx, lz) => ({x: it.x + lx * Math.cos(it.yaw) + lz * Math.sin(it.yaw), z: it.z - lx * Math.sin(it.yaw) + lz * Math.cos(it.yaw), yaw: it.yaw});
