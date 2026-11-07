// Mykonos viewer: photoreal turntable for the building (turntable.js, no WebGL) and the traced 3D model for
// floors and dwellings (explorer.js, Three.js), loaded only when a floor or dwelling is opened or the user
// asks for the interactive model. Exposes the same API the page used with the explorer alone.
import {getJSON, navUI, levelName, RENDER_VIEWS} from './shared.js';
import {createTurntable} from './turntable.js';
export {getJSON, RENDER_VIEWS};

const NOTE = {
  photo: 'IMAGEN GENERADA DEL MODELO<br>Fachadas de los alzados publicados · entorno de OpenStreetMap, orientativo',
  model: 'MODELO TRAZADO DE LOS PLANOS PUBLICADOS<br>Alturas medidas en el alzado publicado · mobiliario orientativo',
};

export function createViewer(container, callbacks, opts) {
  const {promotion = 'mykonos', status = {}, unitsInfo = {}} = opts, base = `/models/${promotion}`;
  const ui = navUI(container);
  const note = container.querySelector('.viewer-note');
  const hint = t => { const el = container.querySelector('#viewer-hint'); if (el) el.textContent = t; };
  let tt = null, ex = null, exLoading = null, mode = 'photo', want3D = false, building = null, lightBar = null;
  const queued = [];                                     // finish/concept choices made before the 3D model loads
  const modeBar = document.createElement('div'); modeBar.className = 'tt-mode'; modeBar.setAttribute('role', 'group'); modeBar.setAttribute('aria-label', 'Tipo de vista del edificio');
  modeBar.innerHTML = '<button data-tt="photo" aria-pressed="true" class="active">Fotorrealista</button><button data-tt="model" aria-pressed="false">Modelo 3D</button>';
  if (note) note.after(modeBar); else container.querySelector('.viewer-top')?.prepend(modeBar);
  modeBar.onclick = e => { const b = e.target.closest('button[data-tt]'); if (b) b.dataset.tt === 'model' ? showModel() : showPhoto(); };

  const levels = () => Object.keys(building?.levels || {});
  function setMode(m) {
    mode = m; container.classList.toggle('tt-on', m === 'photo'); tt?.show(m === 'photo');
    if (note) note.innerHTML = m === 'photo' ? NOTE.photo : NOTE.model;
    modeBar.hidden = m === 'inside'; if (lightBar) lightBar.hidden = m !== 'photo';
    modeBar.querySelectorAll('button').forEach(b => { const on = b.dataset.tt === (m === 'photo' ? 'photo' : 'model'); b.classList.toggle('active', on); b.setAttribute('aria-pressed', on); });
  }
  function photoNav() {
    ui.setCrumbs([['Edificio', null]]); ui.activeFloor(null);
    ui.floors(levels(), lv => api.selectFloor(lv === 'B' ? 0 : Number(lv)), lv => tt?.highlightFloor(lv));
    hint('Arrastra para girar · pasa el cursor por una vivienda o elige una planta');
  }
  function showPhoto() {
    if (!tt) return showModel();
    want3D = false; setMode('photo'); photoNav(); callbacks.building?.();
  }
  async function showModel() { want3D = true; const e = await load3D(); setMode('model'); e.building(); }

  function load3D() {
    if (ex) return Promise.resolve(ex);
    return exLoading ||= (async () => {
      const prev = container.querySelector('.loading');
      if (!prev) { const l = document.createElement('div'); l.className = 'loading tt-loading'; l.textContent = 'Cargando el modelo 3D…'; container.append(l); }
      const mod = await import('./explorer.js');
      const e = mod.createExplorer(container, {
        ...callbacks,
        building: () => { if (!want3D && tt) { setMode('photo'); photoNav(); } callbacks.building?.(); },
        floor: (n, fromViewer) => { setMode('inside'); callbacks.floor?.(n, fromViewer); },
        home: (code, fromViewer, portal) => { setMode('inside'); callbacks.home?.(code, fromViewer, portal); },
      }, opts);
      await e.ready;
      for (const [k, a, b] of queued) e[k](a, b);
      container.querySelector('.tt-loading')?.remove();
      ex = e;
      // keep one set of floor handlers: picking opens the floor in 3D; hover highlights in the active view
      ui.floors(levels(), lv => api.selectFloor(lv === 'B' ? 0 : Number(lv)), () => {});
      return e;
    })();
  }

  const ready = (async () => {
    building = await getJSON(`${base}/building.json`);
    try {
      tt = await createTurntable(container, {base, building, published: status, info: unitsInfo, ui, hint,
        onApartment: a => api.selectHome(a.code, a.portal),
        onFloor: lv => api.selectFloor(lv === 'B' ? 0 : Number(lv))});
      if (tt.variants.length > 1) {                       // Día / Atardecer
        const lb = document.createElement('div'); lb.className = 'tt-mode tt-light'; lb.setAttribute('role', 'group'); lb.setAttribute('aria-label', 'Luz');
        lb.innerHTML = tt.variants.map((v, k) => `<button data-light="${v.id}" class="${k ? '' : 'active'}" aria-pressed="${!k}">${v.label}</button>`).join('');
        lb.onclick = e => { const b = e.target.closest('button[data-light]'); if (!b) return; tt.setVariant(b.dataset.light); lb.querySelectorAll('button').forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', on); }); };
        modeBar.after(lb); lightBar = lb;
      }
      setMode('photo'); photoNav();
    } catch (err) {                                      // no rendered frames for this promotion: interactive model only
      console.warn('turntable unavailable', err); modeBar.remove(); want3D = true;
      const e = await load3D(); setMode('model'); e.building();
    }
  })();

  const fwd = (k, ...a) => ex ? ex[k](...a) : undefined;
  const api = {
    ready,
    async selectFloor(n) { await ready; const e = await load3D(); setMode('inside'); return e.selectFloor(n); },
    async selectHome(code, portal = 1) { await ready; const e = await load3D(); setMode('inside'); return e.selectHome(code, portal); },
    async building() { await ready; if (want3D || !tt) { const e = await load3D(); return e.building(); } if (ex && mode !== 'photo') ex.building(); else showPhoto(); },
    renderView(id) {
      if (!id) return null;
      const v = RENDER_VIEWS.find(x => x.id === id);
      want3D = true; load3D().then(e => { setMode('model'); e.renderView(id); });
      return v;
    },
    enterRoom: i => fwd('enterRoom', i), setFurniture: (i, on) => fwd('setFurniture', i, on), setAllFurniture: on => fwd('setAllFurniture', on),
    furnitureRooms: () => fwd('furnitureRooms') || [], toggleOverlay: on => fwd('toggleOverlay', on), toggleCut: on => fwd('toggleCut', on),
    setFinish(slot, o) { if (ex) ex.setFinish(slot, o); else queued.push(['setFinish', slot, o]); },
    setConcept(k, o) { if (ex) ex.setConcept(k, o); else queued.push(['setConcept', k, o]); },
    view(v) { if (mode === 'photo') { if (v === 'top') showModel().then(() => ex.view('top')); else tt.camera('reset'); } else fwd('view', v); },
    camera(action) { if (mode === 'photo') tt.camera(action); else fwd('camera', action); },
    resize() { tt?.resize(); fwd('resize'); },
    get mode() { return mode; },
    dispose() { tt?.dispose(); ex?.dispose(); ui.dispose(); modeBar.remove(); lightBar?.remove(); },
  };
  return api;
}
export {levelName};
