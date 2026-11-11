// Camera modes for the building. Tour: orbit around the building (drag, wheel or pinch), turning slowly by itself
// when left alone; Photo: the calibrated cameras of Bamaire's renders and a few architectural views, with the
// published render laid over for comparison; Walk: eye height in the streets and the courtyard (pointer lock, WASD,
// Shift to run), kept out of the building and through the plot fences.
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {STREET} from './site.js';

const EYE = 1.65, RADIUS = .3;
// an elevation: the published drawing spans `width` metres across at its aspect, centred on the building at `y`;
// shown in the light that falls on that façade, as in the drawings (Morning on the street, Day on the courtyard)
const elevation = (name, ref, aspect, width, y, side, time) => {
  const d = 600, fov = 2 * Math.atan(width / aspect / 2 / d) * 180 / Math.PI;
  return {name, ref, aspect, fov, pos: new T.Vector3(10 + side * d, y, 0), fwd: new T.Vector3(-side, 0, 0), far: true, time};
};

export function createCameras({renderer, container, ex, plot}) {
  const camera = new T.PerspectiveCamera(40, 1, .3, 3000), canvas = renderer.domElement, half = ex.length / 2;
  const center = new T.Vector3(ex.depth / 2, 9, 0);
  let aspect = 1, mode = '', shotIndex = 0, idle = 0;
  const api = {camera, get mode() { return mode; }, mirror: false, invalidate: null, onMode: null, onShot: null};

  // ---- shots: Bamaire's calibrated render cameras (vertical field of view at 16:9), then architectural views
  const dir = (x, y, z) => new T.Vector3(x, y, z).normalize();
  const shots = [
    {name: 'Render 03 · Calle María de Molina', ref: '/assets/ref-mykonos03.jpg', pos: new T.Vector3(71.4, 2.36, 55.81), fwd: dir(-.782, .125, -.61), fov: 30, time: 'Low sun'},
    {name: 'Render 01 · Vista aérea', ref: '/assets/ref-mykonos01.jpg', pos: new T.Vector3(53.92, 38.66, 44.59), fwd: dir(-.6539, -.519, -.5505), fov: 44.95, time: 'Evening'},   // solved from 7 roof, frame and bay corners (≈7 px rms)
    {name: 'Render 04 · Calle de noche', ref: '/assets/ref-mykonos04.jpg', pos: new T.Vector3(71.4, 2.36, 55.81), fwd: dir(-.782, .125, -.61), fov: 30, time: 'Night'},
    {name: 'Piscina (render 02)', pos: new T.Vector3(-7, 3, 4.6), fwd: dir(.04, -.27, 1), fov: 60, time: 'Day'},   // framed by eye: the render's pool is not the plan's
    {name: 'Fachada al patio', pos: new T.Vector3(-34, 1.6, 66), fwd: dir(.62, .2, -.76), fov: 40},
    elevation('Alzado a María de Molina', '/assets/ref-mykonos-fachada2.jpg', 1243 / 380, 77.06, 11.3, 1, 'Morning'),
    elevation('Alzado al patio', '/assets/ref-mykonos-fachada1.jpg', 1243 / 400, 77.06, 11.72, -1, 'Day'),
  ];
  let refAspect = 16 / 9;
  function frameShot(s) {
    camera.position.copy(s.pos); camera.lookAt(s.pos.clone().add(s.fwd));
    refAspect = s.aspect || 16 / 9; camera.near = s.far ? 100 : .3;            // elevations: 600 m away, keep depth precision
    camera.userData.fov = s.fov; setFov();
  }
  // the image's vertical field of view when the view is at least as wide as the image, its horizontal one otherwise
  function setFov() {
    const f = camera.userData.fov || 40, ra = mode === 'photo' ? refAspect : 16 / 9;
    camera.fov = aspect >= ra ? f : 2 * Math.atan(Math.tan(f * Math.PI / 360) * ra / aspect) * 180 / Math.PI;
    if (mode !== 'photo') camera.fov = Math.min(camera.fov, 64);                // portrait phones: frame the building, not the sky
    camera.updateProjectionMatrix();
  }
  // ---- tour: orbit controls around the building
  const orbit = new OrbitControls(camera, canvas);
  Object.assign(orbit, {enableDamping: true, dampingFactor: .08, minDistance: 25, maxDistance: 320, maxPolarAngle: Math.PI * .485, rotateSpeed: .6, zoomSpeed: .8, panSpeed: .6});
  orbit.target.copy(center); orbit.enabled = false;
  orbit.addEventListener('start', () => { idle = -1; });
  orbit.addEventListener('end', () => { idle = 0; });
  orbit.addEventListener('change', () => api.invalidate?.());
  // ---- walk: obstacles are the building (with its balconies) and the plot fences
  const boxes = [[-1.3, ex.depth + 1.3, -half - .1, half + .1]];
  const fences = plot.fences.map(([x0, x1, z0, z1]) => [x0 - .05, x1 + .05, z0 - .05, z1 + .05]);
  const free = (x, z) => ![...boxes, ...fences].some(([x0, x1, z0, z1]) => x > x0 - RADIUS && x < x1 + RADIUS && z > z0 - RADIUS && z < z1 + RADIUS);
  const groundAt = (x, z) => plot.inside(x, z) ? .7 : STREET;
  const keys = new Set(), look = (dx, dy) => {
    const e = new T.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
    e.y -= dx * .0022 * (api.mirror ? -1 : 1); e.x = T.MathUtils.clamp(e.x - dy * .0022, -1.35, 1.35);
    camera.quaternion.setFromEuler(e); api.invalidate?.();
  };
  const locked = () => document.pointerLockElement === canvas;
  let drag = false, touch = null;
  const onMove = e => { if (mode === 'walk' && (locked() || drag)) look(e.movementX, e.movementY); };
  canvas.addEventListener('mousedown', () => { if (mode === 'walk' && !locked()) drag = true; });
  const onUp = () => { drag = false; };
  addEventListener('mouseup', onUp); addEventListener('mousemove', onMove);
  canvas.addEventListener('click', () => { if (mode === 'walk' && !locked() && !matchMedia('(pointer: coarse)').matches) canvas.requestPointerLock?.(); });
  // touch: one finger looks, two fingers walk
  canvas.addEventListener('touchstart', e => { if (mode === 'walk') touch = [...e.touches].map(t => [t.clientX, t.clientY]); }, {passive: true});
  canvas.addEventListener('touchmove', e => {
    if (mode !== 'walk' || !touch) return;
    const now = [...e.touches].map(t => [t.clientX, t.clientY]);
    if (now.length === 1 && touch.length === 1) look(now[0][0] - touch[0][0], now[0][1] - touch[0][1]);
    else if (now.length === 2 && touch.length === 2) walkBy(-((now[0][1] + now[1][1]) - (touch[0][1] + touch[1][1])) / 2 * .03);
    touch = now;
  }, {passive: true});
  canvas.addEventListener('touchend', () => { touch = null; }, {passive: true});
  const KEYS = new Set(['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift']);
  const onKey = e => {
    if (mode !== 'walk' || e.target.closest?.('input, textarea, select')) return;
    const k = e.key.toLowerCase();
    if (KEYS.has(k)) { e.type === 'keydown' ? keys.add(k) : keys.delete(k); if (k.startsWith('arrow')) e.preventDefault(); }
  };
  addEventListener('keydown', onKey); addEventListener('keyup', onKey);
  addEventListener('blur', () => keys.clear());
  function walkBy(fwd, side = 0) {
    const f = camera.getWorldDirection(new T.Vector3()); f.y = 0; f.normalize();
    const r = new T.Vector3(-f.z, 0, f.x).multiplyScalar(api.mirror ? -1 : 1), p = camera.position;
    const step = f.multiplyScalar(fwd).add(r.multiplyScalar(side));
    // slide along obstacles: try the full step, then each axis
    if (free(p.x + step.x, p.z + step.z)) { p.x += step.x; p.z += step.z; }
    else if (free(p.x + step.x, p.z)) p.x += step.x;
    else if (free(p.x, p.z + step.z)) p.z += step.z;
    const want = groundAt(p.x, p.z) + EYE; p.y += (want - p.y) * .25;
    api.invalidate?.();
  }
  const hint = document.createElement('div'); hint.className = 'ap-hint';
  hint.textContent = matchMedia('(pointer: coarse)').matches ? 'Arrastra para mirar · arrastra con dos dedos para caminar' : 'Clic para mirar · WASD para caminar · Mayús para correr · Esc suelta el ratón';
  container.append(hint);
  // ---- photo caption: previous / next shot, the path-traced render, and the published render laid over the view
  const caption = document.createElement('div'); caption.className = 'ap-shot';
  caption.innerHTML = '<button data-step="-1" aria-label="Vista anterior">‹</button><span></span><button data-render title="Render fotorrealista (trazado de rayos)">Render</button><button data-compare hidden>Comparar</button><button data-step="1" aria-label="Vista siguiente">›</button>';
  const overlay = document.createElement('img'); overlay.className = 'bd-ref'; overlay.alt = ''; overlay.hidden = true; container.append(overlay);
  caption.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.step) api.shot(shotIndex + Number(b.dataset.step));
    else if ('compare' in b.dataset) { overlay.hidden = !overlay.hidden; b.classList.toggle('on', !overlay.hidden); }
    else if ('render' in b.dataset) api.onRender?.();
  };
  container.append(caption);
  // the render button reports the path tracer's progress: null (idle), 'prep', 0…1
  api.setRenderProgress = v => {
    const b = caption.querySelector('[data-render]');
    b.textContent = v === null ? 'Render' : v === 'prep' ? 'Preparando…' : v >= 1 ? 'Render ✓' : `Render ${Math.round(v * 100)} %`;
    b.classList.toggle('on', v !== null);
  };
  const layoutOverlay = () => {
    const wide = aspect >= refAspect;
    Object.assign(overlay.style, wide ? {height: '100%', width: 'auto', left: '50%', top: '0', transform: 'translateX(-50%)'} : {width: '100%', height: 'auto', left: '0', top: '50%', transform: 'translateY(-50%)'});
  };

  Object.assign(api, {
    shots,
    setMode(m) {
      if (m === mode && m !== 'photo') return;
      if (locked()) document.exitPointerLock();
      mode = m; keys.clear(); orbit.enabled = m === 'tour';
      container.classList.toggle('ap-walk', m === 'walk');
      caption.hidden = m !== 'photo'; hint.hidden = m !== 'walk'; overlay.hidden = true; caption.querySelector('[data-compare]').classList.remove('on');
      if (m !== 'photo') camera.near = .3;
      if (m === 'tour') { camera.userData.fov = 40; setFov(); camera.position.set(center.x + 64, 30, center.z + 84); orbit.target.copy(center); orbit.update(); idle = 0; }
      if (m === 'photo') api.shot(shotIndex);
      if (m === 'walk') {
        camera.userData.fov = 62; setFov();
        camera.position.set(ex.depth + 13, STREET + EYE, half + 14); camera.lookAt(ex.depth / 2, 8, 6);
      }
      api.onMode?.(m); api.invalidate?.();
    },
    shot(i) {
      shotIndex = (i + shots.length) % shots.length; const s = shots[shotIndex];
      if (mode !== 'photo') { mode = 'photo'; orbit.enabled = false; caption.hidden = false; hint.hidden = true; container.classList.remove('ap-walk'); api.onMode?.('photo'); }
      frameShot(s);
      caption.querySelector('span').textContent = `${s.name} (${shotIndex + 1}/${shots.length})`;
      const cmp = caption.querySelector('[data-compare]'); cmp.hidden = !s.ref; cmp.classList.remove('on'); overlay.hidden = true;
      if (s.ref) overlay.src = s.ref;
      layoutOverlay();
      api.onShot?.(s); api.invalidate?.();
    },
    resize(w, h) { aspect = w / h; camera.aspect = aspect; setFov(); layoutOverlay(); },
    // per frame: true while the view changes
    update(dt) {
      if (mode === 'tour') {
        if (idle >= 0) { idle += dt; if (idle > 4) { const a = dt * .05 * Math.min(1, (idle - 4) / 2), p = camera.position.clone().sub(orbit.target); p.applyAxisAngle(new T.Vector3(0, 1, 0), a); camera.position.copy(orbit.target).add(p); } }
        const moved = orbit.update() || idle > 4;
        return moved;
      }
      if (mode === 'walk' && keys.size) {
        const speed = (keys.has('shift') ? 6 : 2.2) * dt;
        const f = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0);
        const s = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
        if (f || s) { walkBy(f * speed, s * speed); return true; }
      }
      return false;
    },
    dispose() { orbit.dispose(); removeEventListener('mouseup', onUp); removeEventListener('mousemove', onMove); removeEventListener('keydown', onKey); removeEventListener('keyup', onKey); },
  });
  return api;
}
