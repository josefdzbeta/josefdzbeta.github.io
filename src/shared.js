// Shared by the photoreal turntable (turntable.js) and the 3D explorer (explorer.js): data access with the
// build id, measured heights, published status per portal, the in-viewer navigation UI and the published
// render views. No Three.js here, so the building view starts without the 3D bundle.
const files = () => globalThis.__BAMAIRE_FILES || {};
export const V = typeof __BUILD__ !== 'undefined' ? '?v=' + __BUILD__ : '';
export async function getJSON(url) {
  const f = files()[url];
  if (f) return typeof f === 'string' ? JSON.parse(f) : f;
  const r = await fetch(url + V); if (!r.ok) throw new Error(url + ' ' + r.status); return r.json();
}
export const fileURL = url => files()[url] || url + V;
export const hasFile = url => !!files()[url];
export const bundled = () => !!globalThis.__BAMAIRE_FILES;

// Heights are not published. Measured on the published orthographic elevation of Mykonos
// (mykonos-fachada1.png, scale from 1,2 m windows / 1,9 m balcony doors / 69 m façade):
export const HEIGHTS = {ground: .74, l1: 4.60, typical: 3.27, slab: .3, clear: 2.6, sill: 1.0, head: 2.25, parapet: 1.1, overrun: 2.6};
export const levelY = lv => lv === 'B' ? HEIGHTS.ground : HEIGHTS.l1 + (Number(lv) - 1) * HEIGHTS.typical;
export const storeyH = lv => lv === 'B' ? HEIGHTS.l1 - HEIGHTS.ground : HEIGHTS.typical;
export const levelName = lv => lv === 'B' ? 'Planta baja' : lv === '5' ? 'Ático (planta 5)' : 'Planta ' + lv;

// Commercial status: Portal 1 as published on bamaire.es (green/red line per plan, captured 06.11.2026; the red line reads "Reservada");
// Portal 2 is not on sale yet (client, 07.11.2026), so every Portal 2 dwelling reads "Próximamente".
export const STATUS = {
  disponible: {label: 'Disponible', color: '#3f8f5a'},
  vendida: {label: 'Reservada', color: '#b4564b'},   // red line on bamaire.es; shown as "Reservada" (client, 08.11.2026)
  proximamente: {label: 'Próximamente', color: '#c08a2d'},
};
export const statusOf = (published, code, portal = 1) => portal === 2 ? 'proximamente' : published?.[code] || null;
export const fmt = n => n == null ? '—' : Number(n).toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2});

// one box per apartment and portal (Portal 2 mirrors Portal 1 about the shared gable z = 0), building frame
export function apartmentBoxes(b) {
  const out = [];
  for (const [lv, L] of Object.entries(b.levels)) for (const pu of L.units) {
    const c = pu.cell || b.cell, x0 = pu.x, x1 = pu.x + pu.w * c, z0 = pu.y, z1 = pu.y + pu.h * c;
    for (const portal of [1, 2]) {
      const [a0, a1] = portal === 1 ? [z0, z1] : [-z1, -z0];
      out.push({code: pu.code, portal, lv, min: [x0, levelY(lv), a0], max: [x1, levelY(lv) + storeyH(lv) - .05, a1]});
    }
  }
  return out;
}

export function tipHTML(a, info, published) {
  const i = info[a.code] || {}, st = statusOf(published, a.code, a.portal);
  return `<b>${a.portal === 2 ? 'Portal 2 · ' : 'Portal 1 · '}${a.code}</b>${i.bedrooms != null ? ` · ${i.bedrooms} dorm.` : ''}${i.util ? ` · ${fmt(i.util)} m²` : ''}` +
    (st ? `<br><span class="st ${st}">${STATUS[st].label}</span>` : '');
}

// in-viewer navigation: breadcrumbs + back, floor stack, hover tooltip (one instance per viewer container)
export function navUI(container) {
  if (container.__nav) return container.__nav;
  const nav = document.createElement('div'); nav.className = 'v-nav';
  nav.innerHTML = '<div class="v-crumbs" aria-label="Ruta"></div><div class="v-floors" role="group" aria-label="Plantas"></div><div class="v-tip" hidden></div>';
  container.append(nav);
  const crumbs = nav.querySelector('.v-crumbs'), floors = nav.querySelector('.v-floors'), tipEl = nav.querySelector('.v-tip');
  let handlers = {pick: () => {}, hover: () => {}};
  const ui = {
    setCrumbs(list) {
      crumbs.innerHTML = (list.length > 1 ? '<button class="v-back" aria-label="Volver">‹</button>' : '') + list.map(([t, f], i) => f ? `<button data-i="${i}">${t}</button>` : `<span>${t}</span>`).join('<i>›</i>');
      crumbs.querySelectorAll('button[data-i]').forEach(b => b.onclick = () => list[Number(b.dataset.i)][1]());
      const back = crumbs.querySelector('.v-back'); if (back) back.onclick = () => list.at(-2)[1]();
    },
    floors(levels, onPick, onHover) {
      handlers = {pick: onPick, hover: onHover};
      if (floors.childElementCount !== levels.length) {
        const order = levels.slice().sort((a, b) => levelY(b) - levelY(a));
        floors.innerHTML = order.map(lv => `<button data-lv="${lv}" title="${levelName(lv)}">${lv === 'B' ? 'B' : lv === '5' ? 'Át' : lv}</button>`).join('');
        floors.querySelectorAll('button').forEach(b => {
          b.onclick = () => handlers.pick(b.dataset.lv); b.onmouseenter = () => handlers.hover(b.dataset.lv); b.onmouseleave = () => handlers.hover(null);
          b.onfocus = () => handlers.hover(b.dataset.lv); b.onblur = () => handlers.hover(null);
        });
      }
    },
    activeFloor(lv) { floors.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.lv === lv)); },
    tip(html, e) {
      if (!html) { tipEl.hidden = true; return; }
      const r = container.getBoundingClientRect();
      tipEl.innerHTML = html; tipEl.hidden = false;
      tipEl.style.transform = `translate(${Math.max(4, Math.min(e.clientX - r.left + 14, r.width - 236))}px,${Math.min(e.clientY - r.top + 14, r.height - 90)}px)`;
    },
    dispose() { nav.remove(); delete container.__nav; },
  };
  container.__nav = ui;
  return ui;
}

// published views to compare against (bamaire.es/mykonos images). Perspective renders use cameras solved
// with PnP from building corners (scripts: research notes); elevations are orthographic-like framings.
export const RENDER_VIEWS = [
  {id: 'r03', label: 'Render 03 · calle (día)', img: '/assets/ref-mykonos03.jpg', aspect: 16 / 9, cam: {pos: [71.4, 2.36, 55.81], fwd: [-.782, .125, -.61], fov: 30}},
  {id: 'r04', label: 'Render 04 · calle (noche)', img: '/assets/ref-mykonos04.jpg', aspect: 16 / 9, cam: {pos: [71.4, 2.36, 55.81], fwd: [-.782, .125, -.61], fov: 30}},
  {id: 'r01', label: 'Render 01 · aérea', img: '/assets/ref-mykonos01.jpg', aspect: 16 / 9, cam: {pos: [80.82, 45.06, 102.65], fwd: [-.568, -.299, -.767], fov: 20}},
  {id: 'street', label: 'Alzado C/ María de Molina', img: '/assets/ref-mykonos-fachada2.jpg', fit: {dir: [1, 0, 0], el: 0, width: 77.06, centerY: 11.3, byWidth: true}},
  {id: 'courtyard', label: 'Alzado al patio', img: '/assets/ref-mykonos-fachada1.jpg', fit: {dir: [-1, 0, 0], el: 0, width: 77.06, centerY: 11.72, byWidth: true}},
  {id: 'peatonal', label: 'Testero calle peatonal', img: '/assets/ref-mykonos-giro-7.jpg', fit: {dir: [0, 0, 1], el: 12, width: 44}},
  {id: 'far', label: 'Testero Portal 2', img: '/assets/ref-mykonos-giro-3.jpg', fit: {dir: [0, 0, -1], el: 12, width: 44}},
];
