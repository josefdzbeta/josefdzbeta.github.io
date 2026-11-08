// Photoreal building view. Frames are rendered offline in Blender (scripts/blender/turntable.py) from a
// ring of cameras around the building; dragging swaps frames, so turning the building costs one image draw
// on any phone or laptop. Apartments and floors are highlighted by projecting their traced boxes with the
// exact camera of each frame (cameras.json → manifest.json). No WebGL here.
import {getJSON, fileURL, hasFile, bundled, levelY, storeyH, STATUS, statusOf, tipHTML, apartmentBoxes} from './shared.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ZENITH = {day: '#bfd0e0', dusk: '#1f2c4e'};          // sky above the frame when a tall viewer extends it

export async function createTurntable(container, {base, building, published = {}, info = {}, ui, onApartment, onFloor, onHover, hint}) {
  const m = await getJSON(`${base}/turntable/manifest.json`);
  const N = m.frames.length, [W, H] = m.size, tanH = Math.tan(m.fovY * Math.PI / 360), aspect = W / H;
  const layer = document.createElement('div'); layer.className = 'tt';
  const cv = document.createElement('canvas'); cv.className = 'tt-canvas'; cv.tabIndex = 0;
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'Vista fotorrealista del edificio generada a partir de los alzados y planos publicados. Flechas izquierda y derecha para girar; botones de planta para elegir planta.');
  layer.append(cv); layer.hidden = true; container.prepend(layer);
  const ctx = cv.getContext('2d', {alpha: false});
  const boxes = apartmentBoxes(building);
  const T0 = m.target;

  // frame size: large frames when the viewer is wide in device pixels, else the small set
  const variants = Object.keys(m.variants || {day: {}});
  let variant = variants[0];
  const big = () => container.clientWidth * Math.min(devicePixelRatio, 2) > 1250;
  const sizeKey = () => {                       // the standalone copy carries one size per light; use what it has
    const pref = big() ? ['lg', 'sm'] : ['sm', 'lg'];
    return bundled() ? pref.find(k => hasFile(`${base}/turntable/${variant}/${k}/${m.files[0]}`)) || pref[0] : pref[0];
  };
  let key = sizeKey();
  let imgs = new Array(N).fill(null), ready = new Uint8Array(N), gen = 0;
  let frame = 0, zoom = 1, center = [W / 2, H / 2], hover = null, floorHi = null, alive = true, raf = 0;

  // load order: current frame, then every 90°, 45°, … so a coarse turn works after a few images
  function order(start = 0) {
    const out = [start], seen = new Set(out);
    for (const step of [Math.round(N / 4), Math.round(N / 8), Math.round(N / 12), 2, 1]) for (let k = 0; k < N; k += Math.max(1, step)) { const i = (start + k) % N; if (!seen.has(i)) { seen.add(i); out.push(i); } }
    for (let i = 0; i < N; i++) if (!seen.has(i)) out.push(i);
    return out;
  }
  let queue = order(), inflight = 0, unlocked = false, loaded = 0;
  const EAGER = Math.max(4, Math.round(N / 4));                      // frame 0 + every 90°… before any interaction
  const unlock = () => { if (!unlocked) { unlocked = true; pump(); } };
  const first = new Promise(res => { pump(res); });
  function pump(onFirst) {
    while (inflight < 4 && queue.length && (unlocked || loaded + inflight < EAGER)) {
      const i = queue.shift(), im = new Image(), g = gen; im.decoding = 'async'; inflight++;
      // decode off the main thread before a frame becomes eligible (capped: background tabs may defer decode())
      im.onload = () => Promise.race([im.decode().catch(() => {}), new Promise(r => setTimeout(r, 300))]).then(() => { inflight--; if (g !== gen) return pump(); imgs[i] = im; ready[i] = 1; loaded++; onFirst?.(); onFirst = null; if (!alive) return; if (nearest(frame) === i) draw(); pump(); });
      im.onerror = () => { inflight--; pump(onFirst); };
      im.src = fileURL(`${base}/turntable/${variant}/${key}/${m.files[i]}`);
    }
  }
  // switch frame set (size or light): keep showing the current picture until the new one arrives
  function reload() { gen++; loaded = 0; imgs = new Array(N).fill(null); ready = new Uint8Array(N); queue = order(frame); pump(); }
  const nearest = f => { for (let d = 0; d <= N / 2; d++) { if (ready[(f + d) % N]) return (f + d) % N; if (ready[(f - d + N) % N]) return (f - d + N) % N; } return -1; };

  // ---- camera of a frame: eye on the ring, looking at the target, y up, vertical FOV
  function cam(i) {
    const e = m.frames[i].pos, f = norm(sub(T0, e)), r = norm(cross(f, [0, 1, 0])), u = cross(r, f);
    return {e, f, r, u};
  }
  const project = (c, p) => { const d = sub(p, c.e), z = dot(d, c.f); if (z <= .1) return null; return [(dot(d, c.r) / (z * tanH * aspect) + 1) / 2 * W, (1 - dot(d, c.u) / (z * tanH)) / 2 * H]; };
  // image ↔ canvas (cover fit, digital zoom about `center`)
  // cover the canvas, but never crop more than 22 % of the width (tall/narrow viewers: frame sits at the bottom, sky extends above)
  const view = () => { const cw = cv.width, ch = cv.height, s = Math.min(Math.max(cw / W, ch / H), cw / (W * .78)) * zoom; return {cw, ch, s}; };
  const clampCenter = () => {
    const {cw, ch, s} = view(), hw = cw / s / 2, hh = ch / s / 2;
    center = [hw * 2 >= W ? W / 2 : Math.min(W - hw, Math.max(hw, center[0])), hh * 2 >= H ? H - hh : Math.min(H - hh, Math.max(hh, center[1]))];
  };
  const edge = new Map();                        // average colour of the top and bottom rows of each frame
  function edges(im) {
    if (edge.has(im)) return edge.get(im);
    const c = document.createElement('canvas'); c.width = 1; c.height = 16; const g = c.getContext('2d', {willReadFrequently: true});
    g.drawImage(im, 0, 0, 1, 16); const d = g.getImageData(0, 0, 1, 16).data;
    const v = [`rgb(${d[0]},${d[1]},${d[2]})`, `rgb(${d[60]},${d[61]},${d[62]})`]; edge.set(im, v); return v;
  }
  const toCanvas = ([x, y]) => { const {cw, ch, s} = view(); return [(x - center[0]) * s + cw / 2, (y - center[1]) * s + ch / 2]; };
  const toImage = (cx, cy) => { const {cw, ch, s} = view(); return [(cx - cw / 2) / s + center[0], (cy - ch / 2) / s + center[1]]; };

  function hull(pts) {
    pts = pts.filter(Boolean).sort((a, b) => a[0] - b[0] || a[1] - b[1]); if (pts.length < 3) return pts;
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), lo = [], up = [];
    for (const p of pts) { while (lo.length >= 2 && cr(lo.at(-2), lo.at(-1), p) <= 0) lo.pop(); lo.push(p); }
    for (const p of pts.slice().reverse()) { while (up.length >= 2 && cr(up.at(-2), up.at(-1), p) <= 0) up.pop(); up.push(p); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }
  const corners = (a, b) => [0, 1, 2, 3, 4, 5, 6, 7].map(k => [k & 1 ? b[0] : a[0], k & 2 ? b[1] : a[1], k & 4 ? b[2] : a[2]]);
  function outline(c, min, max, color, fillA, lineW) {
    const poly = hull(corners(min, max).map(p => project(c, p))).map(toCanvas); if (poly.length < 3) return;
    ctx.beginPath(); poly.forEach(([x, y], k) => k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath();
    ctx.globalAlpha = fillA; ctx.fillStyle = color; ctx.fill(); ctx.globalAlpha = 1;
    ctx.lineWidth = lineW * devicePixelRatio; ctx.strokeStyle = color; ctx.stroke();
  }

  function draw() {
    raf = 0; if (!alive) return;
    const i = nearest(frame); if (i < 0) return;
    const {cw, ch} = view(); clampCenter();
    const [x0, y0] = toCanvas([0, 0]), [x1, y1] = toCanvas([W, H]);
    if (y0 > 0 || y1 < ch || x0 > 0 || x1 < cw) {
      const [top] = edges(imgs[i]), g = ctx.createLinearGradient(0, 0, 0, Math.max(1, y0));
      g.addColorStop(0, ZENITH[variant] || '#c9d6e2'); g.addColorStop(1, top); ctx.fillStyle = g; ctx.fillRect(0, 0, cw, Math.ceil(y0) + 1);
    }
    ctx.drawImage(imgs[i], x0, y0, x1 - x0, y1 - y0);
    const c = cam(i);
    if (floorHi) outline(c, [-.7, levelY(floorHi), -35.2], [20.7, levelY(floorHi) + storeyH(floorHi), 35.2], '#2f6f86', .26, 2);
    if (hover) outline(c, hover.min, hover.max, STATUS[statusOf(published, hover.code, hover.portal)]?.color || '#2f6f86', .34, 2);
  }
  const redraw = () => { if (!raf) raf = requestAnimationFrame(draw); };

  function resize() {
    const dpr = Math.min(devicePixelRatio, 2), w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.width = w + 'px'; cv.style.height = h + 'px';
    const k = sizeKey(); if (k !== key && (k === 'lg' || bundled())) { key = k; reload(); }
    draw();
  }
  const ro = new ResizeObserver(resize); ro.observe(container);

  // ---- picking: ray through the pixel, nearest apartment box (slab test)
  function pickAt(clientX, clientY) {
    const r = cv.getBoundingClientRect(), dpr = cv.width / r.width;
    const [ix, iy] = toImage((clientX - r.left) * dpr, (clientY - r.top) * dpr);
    if (ix < 0 || iy < 0 || ix > W || iy > H) return null;
    const i = nearest(frame); if (i < 0) return null;
    const c = cam(i), nx = ix / W * 2 - 1, ny = 1 - iy / H * 2;
    const d = norm(add(c.f, add(scale(c.r, nx * tanH * aspect), scale(c.u, ny * tanH))));
    let best = null, bd = Infinity;
    for (const a of boxes) {
      let t0 = 0, t1 = Infinity;
      for (let k = 0; k < 3; k++) {
        const inv = 1 / d[k]; let ta = (a.min[k] - c.e[k]) * inv, tb = (a.max[k] - c.e[k]) * inv;
        if (ta > tb) [ta, tb] = [tb, ta]; t0 = Math.max(t0, ta); t1 = Math.min(t1, tb); if (t0 > t1) break;
      }
      if (t0 <= t1 && t0 < bd) { bd = t0; best = a; }
    }
    return best;
  }

  // ---- interaction: drag to turn (with a little inertia), wheel/pinch/buttons to zoom, hover + click
  const degPerPx = () => 360 / Math.max(500, container.clientWidth * 1.35);
  let drag = null, vel = 0, inertia = 0, acc = 0, touchTap = null;
  const pinch = new Map();
  const setFrame = f => { frame = ((Math.round(f) % N) + N) % N; redraw(); };
  const turnBy = deg => { acc += deg / (360 / N); const whole = Math.trunc(acc); if (whole) { acc -= whole; setFrame(frame + whole); } };
  cv.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') pinch.set(e.pointerId, [e.clientX, e.clientY]);
    if (drag && e.pointerType === 'touch') { drag.moved = true; drag.pd = null; return; }            // second finger: pinch
    cancelAnimationFrame(inertia); try { cv.setPointerCapture(e.pointerId); } catch {}
    drag = {id: e.pointerId, x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t: performance.now(), moved: false, pts: new Map([[e.pointerId, [e.clientX, e.clientY]]])};
    vel = 0; cv.classList.add('dragging');
  });
  cv.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') pinch.set(e.pointerId, [e.clientX, e.clientY]);
    if (pinch.size === 2) {
      const [a, b] = [...pinch.values()], dd = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (drag?.pd) zoomAt(dd / drag.pd, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
      if (drag) { drag.pd = dd; drag.moved = true; drag.x = e.clientX; }
      return;
    }
    if (drag && drag.id === e.pointerId) {
      const dx = e.clientX - drag.x, now = performance.now();
      if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) > 6) drag.moved = true;
      turnBy(-dx * degPerPx()); vel = -dx * degPerPx() / Math.max(1, now - drag.t); drag.x = e.clientX; drag.t = now;
      if (hover) { hover = null; ui.tip(null); }
      return;
    }
    if (e.pointerType === 'touch') return;
    const a = pickAt(e.clientX, e.clientY);
    if (a !== hover) { hover = a; redraw(); onHover?.(a); }
    ui.tip(a ? tipHTML(a, info, published) + '<br><small>Pulsa para ver la vivienda</small>' : null, e);
    cv.style.cursor = a ? 'pointer' : 'grab';
  });
  const end = e => {
    pinch.delete(e.pointerId);
    if (!drag || drag.id !== e.pointerId) return;
    const wasDrag = drag.moved; drag = null; cv.classList.remove('dragging');
    if (!wasDrag) {
      const a = pickAt(e.clientX, e.clientY);
      if (e.pointerType === 'touch') {
        if (a && touchTap && touchTap.code === a.code && touchTap.portal === a.portal) { touchTap = null; hover = null; ui.tip(null); redraw(); onApartment(a); return; }
        touchTap = a; hover = a; redraw(); onHover?.(a); ui.tip(a ? tipHTML(a, info, published) + '<br><small>Toca de nuevo para abrirla</small>' : null, e); return;
      }
      if (a) { hover = null; ui.tip(null); redraw(); onApartment(a); }
      return;
    }
    if (!reduced && Math.abs(vel) > .05) {                       // short glide after a flick
      let v = vel * 16, last = performance.now();
      const glide = now => { const dt = now - last; last = now; v *= Math.pow(.9, dt / 16); turnBy(v * dt / 16); if (Math.abs(v) > .15 && alive) inertia = requestAnimationFrame(glide); };
      inertia = requestAnimationFrame(glide);
    }
  };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  cv.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch' && !drag) { hover = null; ui.tip(null); redraw(); } });
  function zoomAt(k, clientX, clientY) {
    const r = cv.getBoundingClientRect(), dpr = cv.width / r.width;
    const before = toImage((clientX - r.left) * dpr, (clientY - r.top) * dpr);
    zoom = Math.min(2.2, Math.max(1, zoom * k));
    const after = toImage((clientX - r.left) * dpr, (clientY - r.top) * dpr);
    center = [center[0] + before[0] - after[0], center[1] + before[1] - after[1]]; redraw();
  }
  cv.addEventListener('wheel', e => { if (!e.ctrlKey && zoom === 1 && e.deltaY > 0) return; e.preventDefault(); zoomAt(Math.exp(-e.deltaY * .0015), e.clientX, e.clientY); }, {passive: false});
  cv.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setFrame(frame + (e.key === 'ArrowLeft' ? -1 : 1)); }
  });

  for (const ev of ['pointerenter', 'pointerdown', 'keydown', 'focus']) cv.addEventListener(ev, unlock, {once: true, passive: true});
  setTimeout(() => { if (!layer.hidden) unlock(); }, 6000);
  await first; resize(); hint?.('Arrastra para girar · pasa el cursor por una vivienda o elige una planta');
  return {
    show(on) { layer.hidden = !on; container.classList.toggle('tt-on', on); if (on) { resize(); } else { hover = null; floorHi = null; } },
    highlightFloor(lv) { floorHi = lv; redraw(); },
    camera(action) {
      unlock();
      if (action === 'left' || action === 'right') setFrame(frame + (action === 'left' ? -3 : 3));
      else if (action === 'in' || action === 'out') { const r = cv.getBoundingClientRect(); zoomAt(action === 'in' ? 1.25 : .8, r.left + r.width / 2, r.top + r.height / 2); }
      else { zoom = 1; center = [W / 2, H / 2]; setFrame(0); }
    },
    get frame() { return frame; }, set frame(f) { setFrame(f); },
    variants: variants.map(v => ({id: v, label: m.variants?.[v]?.label || v})),
    get variant() { return variant; },
    setVariant(v) { if (v === variant || !variants.includes(v)) return; variant = v; key = sizeKey(); reload(); },
    resize, manifest: m,
    dispose() { alive = false; ro.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(inertia); layer.remove(); container.classList.remove('tt-on'); },
  };
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = a => scale(a, 1 / Math.hypot(...a));
