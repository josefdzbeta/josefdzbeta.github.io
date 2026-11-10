// Camera modes. Photo: level, wide real-estate shots (two-point perspective) and a plan view; Tour: a smooth
// path through the doors from shot to shot; Walk: pointer lock, WASD, Shift to run, C to crouch, Esc to release,
// with collisions against walls, sills, parapets and the larger furniture.
import * as T from 'three';
import {SHOTS} from './layouts.js';

const EYE = 1.6, CROUCH = 1.05, RADIUS = .24;

export function createCameras({plan, items, renderer, container}) {
  const {W, H, c, X, Z, solid, g} = plan;
  const camera = new T.PerspectiveCamera(60, 1, .03, 600), ortho = new T.OrthographicCamera(-1, 1, 1, -1, .1, 100);
  ortho.layers.enable(2); ortho.position.set(0, 50, 0); ortho.up.set(0, 0, -1); ortho.lookAt(0, 0, 0);
  let aspect = 1, mode = 'photo', shotIndex = 0, active = camera;

  // ---- obstacles on the plan grid: walls below door height, sills and parapets, and the larger furniture
  const blocked = new Uint8Array(W * H);
  for (let n = 0; n < W * H; n++) blocked[n] = g[n] === 0 || (solid[n] & 0b111) !== 0 ? 1 : 0;
  const FOOT = {sofaL: it => [[it.L, it.D, 0, 0], [it.Dr, it.E, -it.L / 2 + it.Dr / 2, -it.D / 2 + it.E / 2]], table: it => [[it.w, it.d, 0, 0]], coffee: it => [[it.w, it.d, 0, 0]],
    tvUnit: it => [[it.w, it.d, 0, 0]], bed: it => [[it.w + .14, it.l + .1, 0, -.05]], wardrobe: it => [[it.w, .6, 0, 0]], kitchen: it => [[it.w, .62, 0, .01]],
    sunbed: it => [[it.w, it.d, 0, 0]], teakTable: it => [[it.w, it.d, 0, 0]], wickerSofa: () => [[2.0, 1.0, 0, .3]], wickerChair: () => [[.8, .8, 0, 0]],
    planter: it => [[it.r * 2, it.d || it.r * 2, 0, 0]], toilet: () => [[.4, .6, 0, 0]], basin: () => [[.6, .46, 0, 0]], shower: () => [], nightstand: () => [[.46, .38, 0, 0]], plantTall: () => [[.5, .5, 0, 0]]};
  for (const it of items) for (const [w, d, ox, oz] of FOOT[it.k]?.(it) || []) {
    const cs = Math.cos(it.yaw), sn = Math.sin(it.yaw), cx = it.x + ox * cs + oz * sn, cz = it.z - ox * sn + oz * cs;
    const ext = Math.hypot(w, d) / 2;
    for (let i = Math.floor((cz - ext + plan.oz) / c); i <= Math.ceil((cz + ext + plan.oz) / c); i++) for (let j = Math.floor((cx - ext + plan.ox) / c); j <= Math.ceil((cx + ext + plan.ox) / c); j++) {
      if (i < 0 || j < 0 || i >= H || j >= W) continue;
      const px = X(j + .5) - cx, pz = Z(i + .5) - cz, lx = px * cs - pz * sn, lz = px * sn + pz * cs;
      if (Math.abs(lx) <= w / 2 && Math.abs(lz) <= d / 2) blocked[i * W + j] = 1;
    }
  }
  // clearance (cells to the nearest obstacle), for collisions and the tour paths
  const clear = new Int16Array(W * H).fill(-1), q = [];
  for (let n = 0; n < W * H; n++) if (blocked[n]) { clear[n] = 0; q.push(n); }
  for (let h = 0; h < q.length; h++) { const n = q[h], i = (n / W) | 0, j = n % W; for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const i2 = i + di, j2 = j + dj; if (i2 < 0 || j2 < 0 || i2 >= H || j2 >= W) continue; const m = i2 * W + j2; if (clear[m] < 0) { clear[m] = clear[n] + 1; q.push(m); } } }
  const cellAt = (x, z) => { const [i, j] = plan.cellOf(x, z); return i < 0 || j < 0 || i >= H || j >= W ? -1 : i * W + j; };
  const free = (x, z, r = RADIUS) => { const n = cellAt(x, z); return n >= 0 && clear[n] * c >= r; };

  // a shot per main room when none is curated, as an estate photographer frames it: aimed at the room's subject
  // (the kitchen run, the bed, the basin; the window in living rooms), from the free spot whose view towards it is
  // the most open (rays across the field of view to the first wall), preferring distance
  function autoShots() {
    const wallAt = (x, z) => { const n = cellAt(x, z); return n < 0 || g[n] === 0 || (solid[n] & 0b100) !== 0; };
    const reach = (p, dx, dz, max) => { for (let t = .05; t < max; t += .05) if (wallAt(p.x + dx * t, p.z + dz * t)) return t; return max; };
    const subjectOf = r => {
      const own = items.filter(it => it.room === r.index), pick = k => own.find(it => it.k === k);
      const it = r.type === 'bath' ? pick('basin') : r.type === 'bedroom' ? pick('bed') : r.type === 'kitchen' ? pick('kitchen') : null;
      if (it) return new T.Vector3(it.x, 1.1, it.z);
      const win = plan.openings.filter(o => o.room === r.index && o.kind !== 'door').sort((p, q) => q.len - p.len)[0];
      if (win) return new T.Vector3(win.horiz ? (win.a[0] + win.a[1]) / 2 : (win.t[0] + win.t[1]) / 2, 1.3, win.horiz ? (win.t[0] + win.t[1]) / 2 : (win.a[0] + win.a[1]) / 2);
      return new T.Vector3(X(r.label[0]), 1.2, Z(r.label[1]));
    };
    // open door leaves are not walls in the grid: keep the photographer away from every door
    const doors = plan.openings.filter(o => o.kind === 'door').map(o => o.horiz ? [(o.a[0] + o.a[1]) / 2, (o.t[0] + o.t[1]) / 2] : [(o.t[0] + o.t[1]) / 2, (o.a[0] + o.a[1]) / 2]);
    const out = [];
    for (const r of plan.rooms) {
      if (r.area < 6 || r.type === 'circulation' || r.exterior) continue;
      const target = subjectOf(r);
      let best = null, bestS = -1;
      for (let n = 0; n < W * H; n += 2) {
        if (plan.owner[n] !== r.index || clear[n] * c < .45) continue;
        const p = new T.Vector3(X(n % W + .5), 1.35, Z(((n / W) | 0) + .5)), d = Math.hypot(target.x - p.x, target.z - p.z);
        if (d < 1.6 || doors.some(([x, z]) => Math.hypot(x - p.x, z - p.z) < 1.1)) continue;
        const a0 = Math.atan2(target.z - p.z, target.x - p.x);
        if (reach(p, Math.cos(a0), Math.sin(a0), d) < d - .25) continue;            // the subject must be in sight
        let open = 0;
        for (let k = -4; k <= 4; k++) { const a = a0 + k * .14; open += Math.min(reach(p, Math.cos(a), Math.sin(a), 7), d + .5); }
        const score = open / 9 + .35 * Math.min(d, 6);
        if (score > bestS) { best = p; bestS = score; }
      }
      if (best) out.push({name: r.name, pos: best, target, fov: r.type === 'bath' ? 86 : 80});
    }
    return out;
  }

  // ---- shots: curated per dwelling (layouts.js), then the plan view
  const k = W * c / (W >= H ? 1100 : 1100 * W / H), P = ([x, y]) => [x * k - plan.ox, y * k - plan.oz];
  const shots = SHOTS[plan.u.code] ? SHOTS[plan.u.code].map(s => { const [x, z] = P(s.from), [tx, tz] = P(s.to); return {...s, pos: new T.Vector3(x, s.h || 1.35, z), target: new T.Vector3(tx, s.th ?? s.h ?? 1.35, tz)}; })
    : autoShots();
  shots.push({name: 'Planta', plan: true});

  function frameShot(s) {
    if (s.plan) {
      active = ortho; const [sw, sh] = plan.size, m = 1.06;
      const half = Math.max(sw / 2, sh / 2 * aspect) * m;
      Object.assign(ortho, {left: -half, right: half, top: half / aspect, bottom: -half / aspect}); ortho.updateProjectionMatrix();
      return;
    }
    active = camera; camera.position.copy(s.pos);
    const d = s.target.clone().sub(s.pos); d.y = 0; camera.lookAt(camera.position.clone().add(d));   // level camera: vertical lines stay vertical
    setFov(s.fov || 76);
    // lens shift so the target height sits where the photographer framed it (keeps verticals parallel)
    const shift = s.shift ?? 0;
    camera.setViewOffset(1000, 1000, 0, -shift * 1000, 1000, 1000); camera.updateProjectionMatrix();
  }
  // horizontal field of view, the vertical one capped at 70° (portrait phones would otherwise stretch the room)
  function setFov(hfov) { camera.fov = Math.min(70, 2 * Math.atan(Math.tan(hfov * Math.PI / 360) / aspect) * 180 / Math.PI); camera.updateProjectionMatrix(); }

  // ---- tour: shot to shot along paths that keep clear of walls and furniture
  let tour = null;
  function path(a, b) {
    const start = cellAt(a.x, a.z), goal = cellAt(b.x, b.z), prev = new Int32Array(W * H).fill(-1), Q = [start]; prev[start] = start;
    const ok = n => clear[n] * c >= .28;
    for (let h = 0; h < Q.length && prev[goal] < 0; h++) { const n = Q[h], i = (n / W) | 0, j = n % W; for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) { const i2 = i + di, j2 = j + dj; if (i2 < 0 || j2 < 0 || i2 >= H || j2 >= W) continue; const m = i2 * W + j2; if (prev[m] < 0 && (ok(m) || m === goal)) { prev[m] = n; Q.push(m); } } }
    if (prev[goal] < 0) return [a.clone(), b.clone()];
    const cells = []; for (let n = goal; n !== start; n = prev[n]) cells.push(n); cells.push(start); cells.reverse();
    // string-pulling on the clearance grid
    const pts = cells.map(n => new T.Vector3(X(n % W + .5), 0, Z(((n / W) | 0) + .5))), out = [pts[0]];
    const sees = (p, r) => { const steps = Math.ceil(p.distanceTo(r) / (c * .7)); for (let s = 1; s < steps; s++) { const t = s / steps; if (!free(p.x + (r.x - p.x) * t, p.z + (r.z - p.z) * t, .3)) return false; } return true; };
    for (let s = 1; s < pts.length - 1;) { let e = pts.length - 1; while (e > s && !sees(out[out.length - 1], pts[e])) e--; out.push(pts[e]); s = e + 1; }
    if (out[out.length - 1] !== pts[pts.length - 1]) out.push(pts[pts.length - 1]);
    return out.map(p => new T.Vector3(p.x, 1.45, p.z));
  }
  function startTour() {
    const real = shots.filter(s => !s.plan), legs = [];
    for (let s = 0; s < real.length; s++) {
      const a = real[s], b = real[(s + 1) % real.length], pts = path(a.pos, b.pos);
      pts[0] = a.pos.clone(); pts[pts.length - 1] = b.pos.clone();
      const curve = new T.CatmullRomCurve3(pts.length > 2 ? pts : [pts[0], pts[0].clone().lerp(pts[1], .5), pts[1]], false, 'centripetal', .5);
      legs.push({curve, len: curve.getLength(), a, b});
    }
    tour = {legs, leg: 0, t: 0, dwell: 1.5, look: camera.getWorldDirection(new T.Vector3())};
    active = camera; setFov(72); camera.clearViewOffset();
  }
  function tourStep(dt) {
    const L = tour.legs[tour.leg];
    if (tour.dwell > 0) { tour.dwell -= dt; }
    else { tour.t += dt * .55 / Math.max(L.len, .01); if (tour.t >= 1) { tour.t = 0; tour.leg = (tour.leg + 1) % tour.legs.length; tour.dwell = 2.2; return true; } }
    const u = T.MathUtils.smootherstep(tour.t, 0, 1), p = L.curve.getPointAt(u);
    const ahead = L.curve.getPointAt(Math.min(1, u + .08)).sub(p); ahead.y = 0;
    const toB = L.b.target.clone().sub(p); toB.y = 0;
    const w = T.MathUtils.smoothstep(u, .55, 1), wantDir = ahead.lengthSq() > 1e-6 ? ahead.normalize().lerp(toB.normalize(), w) : toB.normalize();
    if (tour.dwell > 0 && tour.t === 0) { const toA = L.a.target.clone().sub(L.a.pos); toA.y = 0; wantDir.copy(toA.normalize()); }
    tour.look.lerp(wantDir, Math.min(1, dt * 2.2)).normalize();
    camera.position.copy(p); camera.lookAt(p.clone().add(tour.look));
    return true;
  }

  // ---- walk: pointer lock (or a drag) to look; Portal 2 is shown mirrored, so left and right swap there
  const canvas = renderer.domElement, keys = new Set();
  const look = (dx, dy) => {
    const e = new T.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
    e.y -= dx * .0022 * (api.mirror ? -1 : 1); e.x = T.MathUtils.clamp(e.x - dy * .0022, -1.35, 1.35);
    camera.quaternion.setFromEuler(e); api.invalidate?.();
  };
  const locked = () => document.pointerLockElement === canvas;
  const onMove = e => { if (mode === 'walk' && (locked() || drag)) look(e.movementX, e.movementY); };
  let drag = false;
  canvas.addEventListener('mousedown', () => { if (mode === 'walk' && !locked()) drag = true; });
  addEventListener('mouseup', () => { drag = false; });
  addEventListener('mousemove', onMove);
  let eye = EYE, crouch = false;
  const hint = document.createElement('div'); hint.className = 'ap-hint';
  hint.textContent = matchMedia('(pointer: coarse)').matches ? 'Drag to look around · drag with two fingers to walk' : 'Click to look around · WASD to walk · Shift to run · C to crouch · L for lighting only · Esc to release the mouse';
  container.append(hint);
  const caption = document.createElement('div'); caption.className = 'ap-shot';
  caption.innerHTML = '<button data-step="-1" aria-label="Previous shot">‹</button><span></span><button data-step="1" aria-label="Next shot">›</button>';
  caption.onclick = e => { const b = e.target.closest('button'); if (b) api.shot(shotIndex + Number(b.dataset.step)); };
  container.append(caption);
  const onKey = (e, down) => {
    if (mode !== 'walk' && !(down && mode === 'photo' && /Arrow(Left|Right)/.test(e.code))) { if (down && e.key?.toLowerCase() === 'l') api.onKey?.('l'); return; }
    if (mode === 'photo') { api.shot(shotIndex + (e.code === 'ArrowLeft' ? -1 : 1)); return; }
    if (down && e.code === 'KeyC') crouch = !crouch;
    if (down && e.code === 'KeyL') api.onKey?.('l');
    down ? keys.add(e.code) : keys.delete(e.code);
  };
  const kd = e => onKey(e, true), ku = e => onKey(e, false);
  addEventListener('keydown', kd); addEventListener('keyup', ku);
  canvas.addEventListener('click', () => { if (mode === 'walk' && !matchMedia('(pointer: coarse)').matches) canvas.requestPointerLock?.(); });
  // touch: one finger looks, two fingers walk
  let touch = null;
  renderer.domElement.addEventListener('touchstart', e => { if (mode !== 'walk') return; touch = {x: e.touches[0].clientX, y: e.touches[0].clientY, n: e.touches.length}; }, {passive: true});
  renderer.domElement.addEventListener('touchmove', e => {
    if (mode !== 'walk' || !touch) return; const t = e.touches[0], dx = t.clientX - touch.x, dy = t.clientY - touch.y; touch.x = t.clientX; touch.y = t.clientY;
    if (e.touches.length > 1) touch.walk = -dy * .02; else look(dx * 2.2, dy * 2.2);
  }, {passive: true});
  renderer.domElement.addEventListener('touchend', () => { touch = null; }, {passive: true});

  function walkStep(dt) {
    const f = new T.Vector3(); camera.getWorldDirection(f); f.y = 0; f.normalize();
    const r = new T.Vector3(-f.z, 0, f.x), v = new T.Vector3();
    if (keys.has('KeyW') || keys.has('ArrowUp')) v.add(f); if (keys.has('KeyS') || keys.has('ArrowDown')) v.sub(f);
    const side = api.mirror ? -1 : 1;
    if (keys.has('KeyD') || keys.has('ArrowRight')) v.addScaledVector(r, side); if (keys.has('KeyA') || keys.has('ArrowLeft')) v.addScaledVector(r, -side);
    if (touch?.walk) v.addScaledVector(f, touch.walk);
    const targetEye = crouch ? CROUCH : EYE, moving = v.lengthSq() > 0;
    eye += (targetEye - eye) * Math.min(1, dt * 8);
    if (moving) {
      v.normalize().multiplyScalar((keys.has('ShiftLeft') || keys.has('ShiftRight') ? 3.0 : 1.35) * dt);
      const p = camera.position;
      if (free(p.x + v.x, p.z)) p.x += v.x;                 // slide along walls
      if (free(p.x, p.z + v.z)) p.z += v.z;
    }
    const bob = moving ? Math.sin(performance.now() / 160) * .012 : 0;
    camera.position.y = eye + bob;
    return moving || Math.abs(targetEye - eye) > .002;
  }
  function startWalk() {
    active = camera; camera.clearViewOffset(); setFov(84);
    const s = shots.find(x => !x.plan), p = s?.pos || new T.Vector3();
    let spot = p.clone(); if (!free(spot.x, spot.z)) for (let r = .1; r < 2 && !free(spot.x, spot.z); r += .1) for (let a = 0; a < 6.28; a += .5) if (free(p.x + Math.cos(a) * r, p.z + Math.sin(a) * r)) { spot.set(p.x + Math.cos(a) * r, 0, p.z + Math.sin(a) * r); break; }
    camera.position.set(spot.x, EYE, spot.z); eye = EYE; crouch = false;
    if (s) { const d = s.target.clone().sub(s.pos); d.y = 0; camera.lookAt(camera.position.clone().add(d)); }
  }

  const api = {
    get camera() { return active; },
    isPlan: () => active === ortho,
    get mode() { return mode; },
    setMode(m) {
      if (locked()) document.exitPointerLock();
      mode = m; keys.clear(); tour = null;
      container.classList.toggle('ap-walk', m === 'walk'); caption.hidden = m !== 'photo';
      if (m === 'photo') api.shot(shotIndex); else if (m === 'tour') startTour(); else startWalk();
      api.onMode?.(m);
    },
    shot(i) {
      shotIndex = (i + shots.length) % shots.length; const s = shots[shotIndex];
      caption.querySelector('span').textContent = s.name; frameShot(s); api.onMode?.(mode); api.invalidate?.();
    },
    shots,
    update(dt) { return mode === 'tour' && tour ? tourStep(dt) : mode === 'walk' ? walkStep(dt) : false; },
    resize(w, h) { aspect = w / h; camera.aspect = aspect; if (mode === 'photo') frameShot(shots[shotIndex]); else setFov(mode === 'walk' ? 84 : 72); },
    // a room: its photograph when one is framed in it, otherwise a walk from its middle
    enterRoom(i) {
      const k = shots.findIndex(s => !s.plan && plan.owner[cellAt(s.pos.x, s.pos.z)] === i);
      if (k >= 0) { shotIndex = k; api.setMode('photo'); return; }
      const r = plan.rooms[i]; if (!r) return;
      api.setMode('walk');
      const x = X(r.label[0]), z = Z(r.label[1]);
      camera.position.set(x, EYE, z); camera.rotation.set(0, 0, 0); api.invalidate?.();
    },
    mirror: false,
    dispose() { removeEventListener('keydown', kd); removeEventListener('keyup', ku); removeEventListener('mousemove', onMove); if (locked()) document.exitPointerLock(); },
  };
  return api;
}
