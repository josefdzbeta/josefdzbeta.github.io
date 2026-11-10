// Mykonos viewer: the traced building and its floors in three.js (explorer.js), and every dwelling in the
// photographic three.js viewer (apartment/): baked soft light, a live sun through the roller shutters, and the
// Tour / Photo / Walk bar. Both load on demand; the page keeps the API it used with the explorer alone.
import {getJSON, fileURL, navUI, levelName, RENDER_VIEWS} from './shared.js';
export {getJSON, RENDER_VIEWS};

export function createViewer(container, callbacks, opts) {
  const {promotion = 'mykonos'} = opts, base = `/models/${promotion}`;
  const ui = navUI(container), queued = [];
  let ex = null, exLoading = null, building = null;

  // the dwelling layer, re-used from one dwelling to the next
  const layer = document.createElement('div'); layer.className = 'ap ap-in-viewer'; layer.hidden = true;
  const status = document.createElement('div'); status.className = 'ap-status'; layer.append(status);
  container.append(layer);
  let ap = null, apCode = null, token = 0;
  async function showHome(code, portal = 1) {
    if (!code) return;
    const t = ++token;
    layer.hidden = false; container.classList.add('ap-on');
    layer.classList.toggle('ap-mirror', portal === 2);                     // Portal 2 repeats Portal 1, mirrored
    if (apCode !== code) {
      ap?.dispose(); ap = null; apCode = null; layer.replaceChildren(status);
      status.hidden = false; status.textContent = 'Preparando la vivienda…';
      const [{createApartment}, unit] = await Promise.all([import('./apartment/index.js'), getJSON(`${base}/units/${code}.json`)]);
      if (t !== token) return;
      const a = await createApartment(layer, {unit, planURL: fileURL(`${base}/plans/${code}.jpg`), onStatus: s => { status.textContent = s; status.hidden = !s; }});
      if (t !== token) { a.dispose(); return; }
      ap = a; apCode = code; layer.append(status);
    }
    ap.setMirror(portal === 2); ap.resume();
  }
  function hideHome() { token++; layer.hidden = true; container.classList.remove('ap-on'); ap?.pause(); }

  function load3D() {
    return exLoading ||= (async () => {
      const mod = await import('./explorer.js');
      const e = mod.createExplorer(container, {
        ...callbacks,
        building: () => { hideHome(); callbacks.building?.(); },
        floor: (n, fromViewer) => { hideHome(); callbacks.floor?.(n, fromViewer); },
        home: (code, fromViewer, portal) => { showHome(code, portal || 1); callbacks.home?.(code, fromViewer, portal); },
        room: r => callbacks.room?.(r),
      }, opts);
      await e.ready;
      for (const [k, a, b] of queued) e[k](a, b);
      container.querySelector('.loading')?.remove();
      ex = e;
      ui.floors(levels(), lv => api.selectFloor(lv === 'B' ? 0 : Number(lv)), () => {});
      return e;
    })();
  }
  const levels = () => Object.keys(building?.levels || {});
  const ready = (async () => { building = await getJSON(`${base}/building.json`); const e = await load3D(); e.building(); })();

  // fullscreen: the viewer (building, floors, dwellings) fills the screen
  const fsBtn = document.createElement('button'); fsBtn.className = 'v-fullscreen'; fsBtn.setAttribute('aria-label', 'Pantalla completa'); fsBtn.title = 'Pantalla completa';
  fsBtn.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
  fsBtn.onclick = () => document.fullscreenElement ? document.exitFullscreen() : (container.requestFullscreen?.() || container.webkitRequestFullscreen?.());
  if (container.requestFullscreen || container.webkitRequestFullscreen) container.querySelector('.viewer-bottom > div')?.append(fsBtn);
  // "m²": show every room / dwelling label at once (otherwise each is a small "+" pin)
  const msBtn = document.createElement('button'); msBtn.className = 'v-measures'; msBtn.type = 'button'; msBtn.textContent = 'm²';
  msBtn.title = 'Mostrar todas las medidas'; msBtn.setAttribute('aria-pressed', 'false');
  msBtn.onclick = () => { const on = container.classList.toggle('measures-all'); msBtn.setAttribute('aria-pressed', on); msBtn.classList.toggle('active', on); };
  container.querySelector('.viewer-bottom > div')?.prepend(msBtn);

  const fwd = (k, ...a) => ex ? ex[k](...a) : undefined;
  const api = {
    ready,
    async selectFloor(n) { await ready; return ex.selectFloor(n); },
    async selectHome(code, portal = 1) { await ready; return ex.selectHome(code, portal); },
    async building() { await ready; hideHome(); return ex.building(); },
    renderView(id) { if (!id) return null; hideHome(); load3D().then(e => e.renderView(id)); return RENDER_VIEWS.find(x => x.id === id); },
    // a room of the open dwelling: its photograph, or a walk from its middle
    enterRoom: i => { if (ap && !layer.hidden) return ap.enterRoom(i); return fwd('enterRoom', i); },
    setFurniture: (i, on) => { ap?.setFurniture(i, on); return fwd('setFurniture', i, on); },
    setAllFurniture: on => { ap?.setAllFurniture(on); return fwd('setAllFurniture', on); },
    furnitureRooms: () => fwd('furnitureRooms') || [], toggleOverlay: on => fwd('toggleOverlay', on), toggleCut: on => fwd('toggleCut', on),
    setFinish(slot, o) { if (ex) ex.setFinish(slot, o); else queued.push(['setFinish', slot, o]); },
    setConcept(k, o) { if (ex) ex.setConcept(k, o); else queued.push(['setConcept', k, o]); },
    view(v) { fwd('view', v); },
    camera(action) { fwd('camera', action); },
    resize() { fwd('resize'); },
    get mode() { return layer.hidden ? 'model' : 'dwelling'; },
    dispose() { token++; ap?.dispose(); ex?.dispose(); ui.dispose(); fsBtn.remove(); msBtn.remove(); layer.remove(); },
  };
  return api;
}
export {levelName};
