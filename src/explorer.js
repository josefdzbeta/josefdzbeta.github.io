// Bamaire 3D explorer: building, floor and dwelling views generated from plans traced from the
// published PDFs (see scripts/plans/). Geometry is built at runtime from compact JSON grids, so the
// first view downloads only building.json (~tens of KB); a dwelling loads its own file on demand.
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {GTAOPass} from 'three/addons/postprocessing/GTAOPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {programmeSlots, memoriaNotes, CONCEPTS, applyVariant as applyShared, setAnisotropy, textureCache} from './finishes.js';
import {getJSON, fileURL, HEIGHTS, levelY, storeyH, levelName, STATUS, statusOf, fmt, tipHTML, navUI, apartmentBoxes as boxesOf, RENDER_VIEWS} from './shared.js';
export {getJSON, fileURL, HEIGHTS, RENDER_VIEWS};

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = matchMedia('(max-width: 700px)').matches;
const DEBUG = /[?&]debug/.test(location.search);
export const marks = [];
const mark = (n, t0) => { if (DEBUG) marks.push([n, Math.round(performance.now() - t0)]); };

// ------------------------------------------------------------------------------------------------
// geometry helpers: boxes/quads with UVs in metres, bucketed per material, one draw call per bucket
class Builder {
  constructor() { this.b = new Map(); }
  bucket(name) { if (!this.b.has(name)) this.b.set(name, {p: [], n: [], u: [], i: []}); return this.b.get(name); }
  quad(name, a, b, c, d, nrm, uv) {
    const B = this.bucket(name), o = B.p.length / 3;
    for (const v of [a, b, c, d]) B.p.push(...v);
    for (let k = 0; k < 4; k++) B.n.push(...nrm);
    B.u.push(...uv); B.i.push(o, o + 1, o + 2, o, o + 2, o + 3);
  }
  box(name, x0, x1, y0, y1, z0, z1, faces = 63) {
    if (x1 < x0) [x0, x1] = [x1, x0]; if (z1 < z0) [z0, z1] = [z1, z0];
    if (x1 - x0 < 1e-4 || y1 <= y0 || z1 - z0 < 1e-4) return;
    if (faces & 1) this.quad(name, [x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [0, 1, 0], [x0, z0, x0, z1, x1, z1, x1, z0]);
    if (faces & 2) this.quad(name, [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0], [x0, z0, x1, z0, x1, z1, x0, z1]);
    if (faces & 4) this.quad(name, [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1], [x0, y0, x1, y0, x1, y1, x0, y1]);
    if (faces & 8) this.quad(name, [x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1], [-x1, y0, -x0, y0, -x0, y1, -x1, y1]);
    if (faces & 16) this.quad(name, [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0], [-z1, y0, -z0, y0, -z0, y1, -z1, y1]);
    if (faces & 32) this.quad(name, [x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0], [z0, y0, z1, y0, z1, y1, z0, y1]);
  }
  meshes(mats, {shadows = true} = {}) {
    const out = [];
    for (const [name, B] of this.b) {
      if (!B.i.length) continue;
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(B.p, 3));
      g.setAttribute('normal', new T.Float32BufferAttribute(B.n, 3));
      g.setAttribute('uv', new T.Float32BufferAttribute(B.u, 2));
      g.setIndex(B.p.length / 3 > 65535 ? new T.Uint32BufferAttribute(B.i, 1) : new T.Uint16BufferAttribute(B.i, 1));
      g.computeBoundingSphere();
      const m = new T.Mesh(g, mats[name] || mats.paint); m.name = name;
      m.castShadow = shadows && !['glass', 'rail'].includes(name); m.receiveShadow = shadows;
      out.push(m);
    }
    return out;
  }
}

export function decodeGrid(u) {
  const g = new Uint16Array(u.w * u.h); let k = 0;
  for (const tok of u.grid.split(',')) { const [v, c] = tok.split(':').map(Number); g.fill(v, k, k + c); k += c; }
  return g;
}
function greedy(mask, W, H) {
  const m = mask.slice(), out = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W;) {
    if (!m[y * W + x]) { x++; continue; }
    let x1 = x; while (x1 < W && m[y * W + x1]) x1++;
    let y1 = y + 1;
    outer: for (; y1 < H; y1++) for (let i = x; i < x1; i++) if (!m[y1 * W + i]) break outer;
    for (let yy = y; yy < y1; yy++) m.fill(0, yy * W + x, yy * W + x1);
    out.push([x, y, x1 - x, y1 - y]); x = x1;
  }
  return out;
}

function slatTexture() {
  const c = document.createElement('canvas'); c.width = 64; c.height = 8; const x = c.getContext('2d');
  x.fillStyle = '#3e4246'; x.fillRect(0, 0, 64, 8); x.fillStyle = '#7b8086'; for (let i = 0; i < 64; i += 8) x.fillRect(i, 0, 5, 8);
  const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(.6, 1); t.colorSpace = T.SRGBColorSpace; return t;
}

// ------------------------------------------------------------------------------------------------
// materials shared by one viewer; finishes are swapped in place
function materialSet() {
  const std = (c, o = {}) => new T.MeshStandardMaterial({color: c, roughness: .85, envMapIntensity: .9, ...o});
  return {
    paint: std('#eeebe4', {roughness: .92, envMapIntensity: 1.1}), ceiling: std('#f5f4f0', {envMapIntensity: 1}),
    floor: std('#cfb38f'), kitchenFloor: std('#cfb38f'), bathFloor: std('#9f9c96'), bathWall: std('#f0eee9'),
    kitchenWall: std('#efede7'), terrace: std('#bdb5a8'), facade: std('#f3f2ee'), slab: std('#dedcd6'),
    cladding: std('#a9a59c', {roughness: .6}), frameDark: std('#55585a', {roughness: .45, metalness: .3}),
    carpentry: std('#f1efe9', {roughness: .35}), skirting: std('#f3f2ee', {roughness: .4}), cabinets: std('#eeede8', {roughness: .4}), worktop: std('#ecebe7', {roughness: .25}),
    metal: std('#d9dcdf', {metalness: 1, roughness: .12, envMapIntensity: 1}), sanitary: std('#fbfbf9', {roughness: .12, envMapIntensity: .9}),
    resin: std('#efeeea', {roughness: .55}), frame: std('#f4f4f2', {roughness: .4}), hob: std('#121214', {roughness: .08, envMapIntensity: 1}),
    fabric: std('#d9d4ca', {roughness: 1}), linen: std('#f2f0eb', {roughness: 1}), accent: std('#8f9b8f', {roughness: 1}),
    wood: std('#a88563', {roughness: .55}), lacquer: std('#ece9e2', {roughness: .35}), rug: std('#c9c1b2', {roughness: 1}),
    outdoor: std('#8c8b86', {roughness: .7}), plant: std('#6e7d62', {roughness: 1}),
    glass: new T.MeshStandardMaterial({color: '#a9c1c4', roughness: .04, metalness: .1, transparent: true, opacity: .28, envMapIntensity: 1, depthWrite: false}),
    rail: new T.MeshStandardMaterial({color: '#7f9195', roughness: .05, metalness: .1, transparent: true, opacity: .55, depthWrite: false}),
    ground: std('#b9bfae', {roughness: 1}), street: new T.MeshLambertMaterial({color: '#8d8f8c'}),
    plaster: new T.MeshLambertMaterial({color: '#f4f3f0'}), cladSide: new T.MeshLambertMaterial({color: '#a7a49d'}), roof: new T.MeshLambertMaterial({color: '#d5d6d2'}),
    cap: new T.MeshLambertMaterial({color: '#fbfaf8'}), pavement: new T.MeshLambertMaterial({color: '#cfcac1'}), lineWhite: new T.MeshBasicMaterial({color: '#e8e8e4'}),
    lawn: new T.MeshLambertMaterial({color: '#7fa24a'}), paving: new T.MeshLambertMaterial({color: '#d6d2ca'}), poolEdge: new T.MeshLambertMaterial({color: '#e8e4dc'}),
    water: new T.MeshBasicMaterial({color: '#59b9d2', transparent: true, opacity: .9}), fenceWall: new T.MeshLambertMaterial({color: '#eceae5'}),
    poolWall: new T.MeshLambertMaterial({color: '#7fc2d4'}), grass: new T.MeshLambertMaterial({color: '#6f9a3f'}), lounger: new T.MeshLambertMaterial({color: '#f1efea'}),
    glassFence: new T.MeshStandardMaterial({color: '#cfe0e2', roughness: .05, transparent: true, opacity: .3, depthWrite: false}), ramp: new T.MeshLambertMaterial({color: '#7d7f80'}),
    tunnel: new T.MeshBasicMaterial({color: '#1d1f21'}), planter: new T.MeshLambertMaterial({color: '#e9e6df'}),
    slats: new T.MeshLambertMaterial({map: slatTexture(), color: '#ffffff'}), trunk: new T.MeshLambertMaterial({color: '#7b6a55'}), canopy: new T.MeshLambertMaterial({color: '#89a85a', flatShading: true}),
    plan: new T.MeshBasicMaterial({transparent: true, opacity: .92, depthWrite: false, toneMapped: false}),
    hit: new T.MeshBasicMaterial({color: '#7f9c86', transparent: true, opacity: 0, depthWrite: false}),
  };
}

// ------------------------------------------------------------------------------------------------
// dwelling model from a traced unit
const kindOf = t => t === 'exterior' || t === 'laundry' ? 'exterior' : t;

export function buildUnit(u, {kitchenTile = 'wall', notes = {}} = {}) {
  const c = u.cell, W = u.w, H = u.h, g = decodeGrid(u), ox = W * c / 2, oz = H * c / 2;
  const X = j => j * c - ox, Z = i => i * c - oz, HGT = HEIGHTS.clear;
  const B = new Builder(), roomType = v => v >= 3 ? kindOf(u.rooms[v - 3]?.type) : null;
  const at = (i, j) => (i < 0 || j < 0 || i >= H || j >= W) ? 0 : g[i * W + j];
  const occ = new Uint8Array(W * H);               // 1 fixture/furniture, 2 door keep-out
  const cellsOf = (x0, x1, z0, z1, f) => {
    const j0 = Math.max(0, Math.floor((Math.min(x0, x1) + ox) / c)), j1 = Math.min(W, Math.ceil((Math.max(x0, x1) + ox) / c));
    const i0 = Math.max(0, Math.floor((Math.min(z0, z1) + oz) / c)), i1 = Math.min(H, Math.ceil((Math.max(z0, z1) + oz) / c));
    for (let i = i0; i < i1; i++) for (let j = j0; j < j1; j++) if (f(i, j) === false) return false;
    return true;
  };
  for (const [x, y, w, h] of greedy(Uint8Array.from(g, v => v === 1), W, H)) B.box('paint', X(x), X(x + w), 0, HGT, Z(y), Z(y + h));
  const floorBucket = t => t === 'bath' ? 'bathFloor' : t === 'kitchen' ? (kitchenTile === 'all' ? 'kitchenFloor' : 'floor') : t === 'exterior' ? 'terrace' : 'floor';
  const vals = new Set(g); vals.delete(0); vals.delete(1);
  for (const v of vals) {
    const name = v === 2 ? 'floor' : floorBucket(roomType(v));
    for (const [x, y, w, h] of greedy(Uint8Array.from(g, q => q === v), W, H)) B.box(name, X(x), X(x + w), -0.02, 0, Z(y), Z(y + h), 1);
  }
  // wall skins + wall runs
  const runs = [];
  const skin = t => t === 'bath' ? 'bathWall' : t === 'kitchen' ? 'kitchenWall' : t === 'exterior' ? 'facade' : null;
  const e = .004;
  for (const [di, dj, dir] of [[-1, 0, 'N'], [1, 0, 'S'], [0, -1, 'W'], [0, 1, 'E']]) {
    const horiz = di !== 0, L1 = horiz ? H : W, L2 = horiz ? W : H;
    for (let a = 0; a < L1; a++) {
      let b = 0;
      while (b < L2) {
        const i = horiz ? a : b, j = horiz ? b : a, v = at(i, j);
        if (v >= 3 && at(i + di, j + dj) === 1) {
          let b1 = b;
          while (b1 < L2) { const i2 = horiz ? a : b1, j2 = horiz ? b1 : a; if (at(i2, j2) !== v || at(i2 + di, j2 + dj) !== 1) break; b1++; }
          const t = roomType(v), name = skin(t), len = (b1 - b) * c;
          const wallPos = horiz ? (di < 0 ? Z(a) : Z(a + 1)) : (dj < 0 ? X(a) : X(a + 1));
          const s0 = horiz ? X(b) : Z(b), s1 = horiz ? X(b1) : Z(b1);
          runs.push({v, t, dir, wallPos, s0, s1, len});
          if (name) {
            const top = t === 'exterior' ? 1.05 : HGT;
            if (horiz) { const z = wallPos - di * e; di < 0 ? B.quad(name, [s0, 0, z], [s1, 0, z], [s1, top, z], [s0, top, z], [0, 0, 1], [s0, 0, s1, 0, s1, top, s0, top])
              : B.quad(name, [s1, 0, z], [s0, 0, z], [s0, top, z], [s1, top, z], [0, 0, -1], [-s1, 0, -s0, 0, -s0, top, -s1, top]); }
            else { const x = wallPos - dj * e; dj < 0 ? B.quad(name, [x, 0, s1], [x, 0, s0], [x, top, s0], [x, top, s1], [1, 0, 0], [-s1, 0, -s0, 0, -s0, top, -s1, top])
              : B.quad(name, [x, 0, s0], [x, 0, s1], [x, top, s1], [x, top, s0], [-1, 0, 0], [s0, 0, s1, 0, s1, top, s0, top]); }
          }
          b = b1;
        } else b++;
      }
    }
  }
  // skirting (rodapié) as published: height/finish per promotion; not in baths, tiled kitchens or terraces
  if (notes.skirting) {
    const sh = notes.skirting.heightMm / 1000, st = (notes.skirting.thicknessMm || 10) / 1000;
    for (const r of runs) {
      if (r.t === 'bath' || r.t === 'exterior' || (r.t === 'kitchen')) continue;
      const n = {N: [0, 1], S: [0, -1], W: [1, 0], E: [-1, 0]}[r.dir];
      if (r.dir === 'N' || r.dir === 'S') B.box('skirting', r.s0, r.s1, 0, sh, r.wallPos, r.wallPos + n[1] * st);
      else B.box('skirting', r.wallPos, r.wallPos + n[0] * st, 0, sh, r.s0, r.s1);
    }
  }
  // openings
  for (const o of u.openings) {
    const x0 = X(o.x), x1 = X(o.x + o.w), z0 = Z(o.y), z1 = Z(o.y + o.h), horiz = o.w >= o.h;
    // header over the opening, only across a wall's thickness (a traced 'opening' region deeper than 0,45 m is a
    // passage area, and a slab over it reads as a ceiling in the cut-away views)
    const lintel = y => { if (Math.min(x1 - x0, z1 - z0) <= .45) B.box('paint', x0, x1, y, HGT, z0, z1); };
    if (o.kind === 'door' || o.kind === 'entrance') {
      lintel(Math.max(2.1, (notes.doorHeight || 2.03) + .07));
      const len = horiz ? x1 - x0 : z1 - z0, th = .04, leafH = (notes.doorHeight || 2.03) - .02;
      const sideA = o.between?.[0], towardA = sideA && !['circulation', 'void'].includes(sideA);
      const sgn = towardA ? -1 : 1, leaf = Math.min(len - .1, .9);
      if (horiz) { const xh = x0 + .05, zc = (z0 + z1) / 2; B.box('carpentry', xh, xh + th, 0, leafH, zc, zc + sgn * leaf); }
      else { const zh = z0 + .05, xc = (x0 + x1) / 2; B.box('carpentry', xc, xc + sgn * leaf, 0, leafH, zh, zh + th); }
      if (horiz) { B.box('carpentry', x0, x0 + .06, 0, 2.15, z0 - .01, z1 + .01); B.box('carpentry', x1 - .06, x1, 0, 2.15, z0 - .01, z1 + .01); B.box('carpentry', x0, x1, 2.09, 2.15, z0 - .01, z1 + .01); }
      else { B.box('carpentry', x0 - .01, x1 + .01, 0, 2.15, z0, z0 + .06); B.box('carpentry', x0 - .01, x1 + .01, 0, 2.15, z1 - .06, z1); B.box('carpentry', x0 - .01, x1 + .01, 2.09, 2.15, z0, z1); }
      // keep a 0,9 m clearance in front of every door on both sides
      const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, r = Math.max(.9, len / 2 + .3);
      cellsOf(cx - r, cx + r, cz - r, cz + r, (i, j) => { if (!occ[i * W + j]) occ[i * W + j] = 2; });
    } else {
      const sill = o.kind === 'window' ? HEIGHTS.sill : 0, head = HEIGHTS.head;
      if (sill) B.box('paint', x0, x1, 0, sill, z0, z1);
      lintel(head);
      const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
      if (horiz) { B.box('glass', x0, x1, sill, head, mz - .006, mz + .006); B.box('frameDark', x0, x1, sill, sill + .06, mz - .035, mz + .035); B.box('frameDark', x0, x1, head - .06, head, mz - .035, mz + .035); B.box('frameDark', mx - .03, mx + .03, sill, head, mz - .035, mz + .035); }
      else { B.box('glass', mx - .006, mx + .006, sill, head, z0, z1); B.box('frameDark', mx - .035, mx + .035, sill, sill + .06, z0, z1); B.box('frameDark', mx - .035, mx + .035, head - .06, head, z0, z1); B.box('frameDark', mx - .035, mx + .035, sill, head, mz - .03, mz + .03); }
    }
  }
  // fixed fittings (kitchen, sanitary, wardrobe) — position inferred from wall runs / hob symbol
  const fixtures = [], byRoom = {};
  for (const r of runs) (byRoom[r.v] ||= []).push(r);
  const nrm = r => ({N: [0, 1], S: [0, -1], W: [1, 0], E: [-1, 0]}[r.dir]);
  const along = (bld, r, s0, s1, d0, d1, y0, y1, name, mark = true) => {
    const n = nrm(r);
    let x0, x1, z0, z1;
    if (r.dir === 'N' || r.dir === 'S') { x0 = s0; x1 = s1; z0 = r.wallPos + n[1] * d0; z1 = r.wallPos + n[1] * d1; }
    else { z0 = s0; z1 = s1; x0 = r.wallPos + n[0] * d0; x1 = r.wallPos + n[0] * d1; }
    bld.box(name, x0, x1, y0, y1, z0, z1);
    if (mark) cellsOf(x0, x1, z0, z1, (i, j) => { occ[i * W + j] = 1; });
    return [x0, x1, z0, z1];
  };
  for (const [vs, rr] of Object.entries(byRoom)) {
    const v = Number(vs), room = u.rooms[v - 3], t = room?.type;
    rr.sort((a, b) => b.len - a.len);
    if ((t === 'kitchen' || t === 'living_kitchen') && rr[0]?.len >= 1.2) {
      let r = rr[0];
      if (u.hob) { const hx = X(u.hob[0]), hz = Z(u.hob[1]); r = rr.filter(q => q.len >= 1.2).sort((a, b) => runDist(a, hx, hz) - runDist(b, hx, hz))[0] || r; }
      const L = Math.min(r.len, t === 'kitchen' ? 4.2 : 3.6), s0 = r.s0 + (r.len - L) / 2, s1 = s0 + L;
      along(B, r, s0, s1, 0, .58, .1, .87, 'cabinets'); along(B, r, s0, s1, 0, .6, 0, .1, 'paint');
      along(B, r, s0, s1, 0, .62, .87, .9, 'worktop'); along(B, r, s0, s1, 0, .35, 1.45, 2.15, 'cabinets');
      if (t === 'living_kitchen') along(B, r, s0, s1, 0, .006, .9, 1.45, 'kitchenWall', false);
      const mid = (s0 + s1) / 2; along(B, r, mid - .9, mid - .3, 0, .5, .9, .905, 'hob', false); along(B, r, mid + .3, mid + .8, 0, .45, .9, .91, 'metal', false);
      fixtures.push({room: room.name, item: 'Cocina', placement: u.hob ? 'pared de la placa trazada' : 'pared más larga (inferida)'});
    }
    if (t === 'bath' && rr[0]?.len >= 1.5) {
      const r = rr[0], L = r.len;
      along(B, r, r.s0 + .05, r.s0 + .85, 0, .45, .45, .85, 'cabinets'); along(B, r, r.s0 + .1, r.s0 + .8, 0, .44, .85, .9, 'sanitary', false);
      along(B, r, r.s0 + .95, r.s0 + 1.35, 0, .65, 0, .42, 'sanitary'); along(B, r, r.s0 + .3, r.s0 + .6, 0, .1, 1.05, 1.1, 'metal', false);
      const trayL = Math.min(1.4, L - 1.45);
      if (trayL >= .7) { along(B, r, r.s1 - trayL, r.s1, 0, .8, 0, .04, 'resin'); along(B, r, r.s1 - trayL, r.s1 - trayL + .01, 0, .8, .04, 2.0, 'glass', false); }
      fixtures.push({room: room.name, item: 'Lavabo, inodoro, plato de ducha', placement: 'pared más larga (inferida)'});
    }
  }
  // furniture: one builder per room so each room's furniture can be hidden independently
  const furniture = furnish(u, g, {X, Z, c, W, H, at, occ, cellsOf, byRoom, along, nrm, ox, oz});
  const group = new T.Group();
  group.userData = {unit: u, fixtures, size: [W * c, H * c], furniture};
  return {group, builder: B, rooms: roomTargets(u, g, X, Z), furniture};
}
const runDist = (r, hx, hz) => (r.dir === 'N' || r.dir === 'S') ? Math.hypot(Math.max(r.s0, Math.min(r.s1, hx)) - hx, r.wallPos - hz) : Math.hypot(r.wallPos - hx, Math.max(r.s0, Math.min(r.s1, hz)) - hz);

// ------------------------------------------------------------------------------------------------
// furniture placement: beds from the plan's bed symbols; other pieces by a free-space search
function furnish(u, g, k) {
  const {X, Z, c, W, H, occ, cellsOf, byRoom, along, nrm} = k;
  const out = {};
  const fits = (v, x0, x1, z0, z1, allowKeep = false) => cellsOf(x0, x1, z0, z1, (i, j) => g[i * W + j] === v && (occ[i * W + j] === 0 || (allowKeep && occ[i * W + j] === 2)) ? undefined : false);
  const mark = (x0, x1, z0, z1) => cellsOf(x0, x1, z0, z1, (i, j) => { occ[i * W + j] = 1; });
  // distance (cells) to the nearest non-room cell, per room
  const dist = new Float32Array(W * H);
  for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) dist[i * W + j] = g[i * W + j] >= 3 ? 1e4 : 0;
  for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) { const p = i * W + j; if (!dist[p]) continue; const v = g[p];
    if (i) dist[p] = Math.min(dist[p], g[p - W] === v ? dist[p - W] + 1 : 1); if (j) dist[p] = Math.min(dist[p], g[p - 1] === v ? dist[p - 1] + 1 : 1); }
  for (let i = H - 1; i >= 0; i--) for (let j = W - 1; j >= 0; j--) { const p = i * W + j; if (!dist[p]) continue; const v = g[p];
    if (i < H - 1) dist[p] = Math.min(dist[p], g[p + W] === v ? dist[p + W] + 1 : 1); if (j < W - 1) dist[p] = Math.min(dist[p], g[p + 1] === v ? dist[p + 1] + 1 : 1); }
  const openSpot = (v, minClear) => { // most open free cell of a room
    let best = null;
    for (let p = 0; p < W * H; p++) if (g[p] === v && !occ[p] && dist[p] * c >= minClear && (!best || dist[p] > dist[best])) best = p;
    return best == null ? null : [X(best % W + .5), Z(Math.floor(best / W) + .5)];
  };
  const bed = (F, x0, x1, z0, z1, headDir) => {
    const w = Math.abs(x1 - x0), d = Math.abs(z1 - z0);
    F.box('wood', x0, x1, 0, .28, z0, z1); F.box('linen', x0 + .03, x1 - .03, .28, .5, z0 + .03, z1 - .03);
    const long = headDir === 'N' || headDir === 'S' ? 'z' : 'x', narrow = long === 'z' ? w : d;
    const pill = narrow > 1.2 ? 2 : 1;
    for (let p = 0; p < pill; p++) {
      const a = (p + .5) / pill;
      if (long === 'z') { const zp = headDir === 'N' ? z0 + .08 : z1 - .43, xp = x0 + w * a; F.box('fabric', xp - .3 * (narrow / pill / .75), xp + .3 * (narrow / pill / .75), .5, .62, zp, zp + .35); }
      else { const xp = headDir === 'W' ? x0 + .08 : x1 - .43, zp = z0 + d * a; F.box('fabric', xp, xp + .35, .5, .62, zp - .3 * (narrow / pill / .75), zp + .3 * (narrow / pill / .75)); }
    }
    if (long === 'z') { const zh = headDir === 'N' ? z0 : z1; F.box('wood', x0 - .02, x1 + .02, 0, 1.05, zh - .04, zh + .04);
      F.box('accent', x0 + .02, x1 - .02, .5, .53, headDir === 'N' ? z1 - .55 : z0 + .05, headDir === 'N' ? z1 - .05 : z0 + .55); }
    else { const xh = headDir === 'W' ? x0 : x1; F.box('wood', xh - .04, xh + .04, 0, 1.05, z0 - .02, z1 + .02);
      F.box('accent', headDir === 'W' ? x1 - .55 : x0 + .05, headDir === 'W' ? x1 - .05 : x0 + .55, .5, .53, z0 + .02, z1 - .02); }
  };
  const roomsByType = (pred) => u.rooms.map((r, i) => [r, i + 3]).filter(([r]) => pred(r));
  const ensure = v => out[v - 3] ||= {builder: new Builder(), swap: new Builder(), models: [], items: []};
  // model descriptor for the photoreal renders: centre, footprint along/across, facing (unit vector into the room)
  const model = (v, kind, x0, x1, z0, z1, face, extra = {}) => ensure(v).models.push({kind, cx: (x0 + x1) / 2, cz: (z0 + z1) / 2, sx: Math.abs(x1 - x0), sz: Math.abs(z1 - z0), face, ...extra});
  // 1) beds: from the plan symbols when available
  const bedRooms = new Set();
  for (const [x, y, w, h, ri] of u.beds || []) {
    const v = ri + 3, F = ensure(v).builder; let x0 = X(x), x1 = X(x + w), z0 = Z(y), z1 = Z(y + h);
    // headboard: the short side closest to a wall
    const vertical = h >= w, sides = vertical ? [['N', y - 2, x + w / 2], ['S', y + h + 1, x + w / 2]] : [['W', x - 2, y + h / 2], ['E', x + w + 1, y + h / 2]];
    let head = sides[0][0], bestD = 1e9;
    for (const [dir] of sides) {
      let d = 0;
      for (let s = 1; s < 30; s++) { const ii = dir === 'N' ? y - s : dir === 'S' ? y + h + s : Math.round(y + h / 2), jj = dir === 'W' ? x - s : dir === 'E' ? x + w + s : Math.round(x + w / 2);
        if (ii < 0 || jj < 0 || ii >= H || jj >= W || g[ii * W + jj] === 1 || g[ii * W + jj] === 0) { d = s; break; } }
      if (d && d < bestD) { bestD = d; head = dir; }
    }
    { // normalise to a standard mattress (single 0,90×1,90 / double 1,50×2,00), anchored at the headboard
      const vert = head === 'N' || head === 'S', wid = vert ? x1 - x0 : z1 - z0, dbl = wid > 1.15;
      const tw = dbl ? 1.5 : .9, tl = dbl ? 2.0 : 1.9;
      if (vert) { const cx = (x0 + x1) / 2; x0 = cx - tw / 2; x1 = cx + tw / 2; if (head === 'N') z1 = z0 + tl; else z0 = z1 - tl; }
      else { const cz = (z0 + z1) / 2; z0 = cz - tw / 2; z1 = cz + tw / 2; if (head === 'W') x1 = x0 + tl; else x0 = x1 - tl; }
    }
    bed(F, x0, x1, z0, z1, head); mark(x0, x1, z0, z1); bedRooms.add(v);
    ensure(v).items.push('cama (posición del plano)');
    // nightstands either side of the headboard
    const nsFace = {N: [0, 1], S: [0, -1], W: [1, 0], E: [-1, 0]}[head];
    const ns = (a0, a1, b0, b1) => { if (fits(v, a0, a1, b0, b1)) { ensure(v).swap.box('lacquer', a0, a1, 0, .5, b0, b1); model(v, 'nightstand', a0, a1, b0, b1, nsFace); mark(a0, a1, b0, b1); } };
    if (head === 'N') { ns(x0 - .5, x0 - .05, z0, z0 + .4); ns(x1 + .05, x1 + .5, z0, z0 + .4); }
    if (head === 'S') { ns(x0 - .5, x0 - .05, z1 - .4, z1); ns(x1 + .05, x1 + .5, z1 - .4, z1); }
    if (head === 'W') { ns(x0, x0 + .4, z0 - .5, z0 - .05); ns(x0, x0 + .4, z1 + .05, z1 + .5); }
    if (head === 'E') { ns(x1 - .4, x1, z0 - .5, z0 - .05); ns(x1 - .4, x1, z1 + .05, z1 + .5); }
  }
  // 2) remaining bedrooms: bed against the longest free wall
  for (const [room, v] of roomsByType(r => r.type === 'bedroom')) {
    if (bedRooms.has(v)) continue;
    const rr = (byRoom[v] || []).slice().sort((a, b) => b.len - a.len), wide = room.area >= 11;
    const bw = wide ? 1.5 : .9, bl = wide ? 2.0 : 1.9;
    for (const r of rr) {
      if (r.len < bw + .2) continue;
      const mid = (r.s0 + r.s1) / 2, n = nrm(r);
      let x0, x1, z0, z1;
      if (r.dir === 'N' || r.dir === 'S') { x0 = mid - bw / 2; x1 = mid + bw / 2; z0 = r.wallPos; z1 = r.wallPos + n[1] * bl; }
      else { z0 = mid - bw / 2; z1 = mid + bw / 2; x0 = r.wallPos; x1 = r.wallPos + n[0] * bl; }
      if (!fits(v, x0, x1, z0, z1)) continue;
      const F = ensure(v).builder; bed(F, Math.min(x0, x1), Math.max(x0, x1), Math.min(z0, z1), Math.max(z0, z1), r.dir === 'N' ? 'N' : r.dir === 'S' ? 'S' : r.dir === 'W' ? 'W' : 'E');
      mark(x0, x1, z0, z1); ensure(v).items.push('cama (posición indicativa)'); break;
    }
  }
  // 3) living rooms: sofa + coffee table + TV unit, dining table with chairs
  for (const [room, v] of roomsByType(r => r.type === 'living' || r.type === 'living_kitchen')) {
    const F = ensure(v).builder, rr = (byRoom[v] || []).slice().sort((a, b) => b.len - a.len);
    for (const r of rr) {
      if (r.len < 2.4) continue;
      const mid = (r.s0 + r.s1) / 2, n = nrm(r), L = 2.2;
      const box = (d0, d1, s0, s1) => (r.dir === 'N' || r.dir === 'S') ? [s0, s1, r.wallPos + n[1] * d0, r.wallPos + n[1] * d1] : [r.wallPos + n[0] * d0, r.wallPos + n[0] * d1, s0, s1];
      const sofa = box(.02, .92, mid - L / 2, mid + L / 2), zone = box(.02, 1.95, mid - L / 2, mid + L / 2);
      if (!fits(v, ...zone)) continue;
      const [sx0, sx1, sz0, sz1] = sofa;
      const SW = ensure(v).swap, face = [n[0], n[1]];
      SW.box('fabric', sx0, sx1, 0, .42, sz0, sz1);
      const back = box(.02, .22, mid - L / 2, mid + L / 2); SW.box('fabric', back[0], back[1], .42, .82, back[2], back[3]);
      const arm1 = box(.22, .92, mid - L / 2, mid - L / 2 + .18), arm2 = box(.22, .92, mid + L / 2 - .18, mid + L / 2);
      SW.box('fabric', arm1[0], arm1[1], .42, .62, arm1[2], arm1[3]); SW.box('fabric', arm2[0], arm2[1], .42, .62, arm2[2], arm2[3]);
      model(v, 'sofa', sx0, sx1, sz0, sz1, face);
      const tbl = box(1.35, 1.9, mid - .5, mid + .5); SW.box('wood', tbl[0], tbl[1], .36, .4, tbl[2], tbl[3]); model(v, 'coffeeTable', ...tbl, face);
      const rug = box(1.0, 2.3, mid - 1.1, mid + 1.1); if (fits(v, ...rug, true)) F.box('rug', rug[0], rug[1], 0, .012, rug[2], rug[3]);
      mark(...zone); ensure(v).items.push('sofá y mesa de centro');
      // TV unit on the facing wall run, if any
      const opp = {N: 'S', S: 'N', W: 'E', E: 'W'}[r.dir];
      const facing = rr.find(q => q.dir === opp && q.len >= 1.6 && q.s0 < mid && q.s1 > mid);
      if (facing) { const t0 = Math.max(facing.s0, mid - .8), t1 = Math.min(facing.s1, mid + .8); const n2 = nrm(facing);
        const tv = (facing.dir === 'N' || facing.dir === 'S') ? [t0, t1, facing.wallPos, facing.wallPos + n2[1] * .4] : [facing.wallPos, facing.wallPos + n2[0] * .4, t0, t1];
        if (fits(v, ...tv)) { ensure(v).swap.box('lacquer', tv[0], tv[1], .1, .5, tv[2], tv[3]); model(v, 'tvUnit', ...tv, [n2[0], n2[1]]); mark(...tv); ensure(v).items.push('mueble TV'); } }
      break;
    }
    const spot = openSpot(v, .95);
    if (spot) {
      const [cx, cz] = spot, along = (room.area > 20), tw = 1.6, td = .9;
      const hx = along ? tw / 2 : td / 2, hz = along ? td / 2 : tw / 2;
      if (fits(v, cx - hx - .55, cx + hx + .55, cz - hz - .55, cz + hz + .55, true)) {
        const SW = ensure(v).swap; model(v, 'diningTable', cx - hx, cx + hx, cz - hz, cz + hz, along ? [0, 1] : [1, 0]);
        SW.box('wood', cx - hx, cx + hx, .72, .76, cz - hz, cz + hz);
        for (const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) SW.box('frameDark', cx + lx * (hx - .06) - .025, cx + lx * (hx - .06) + .025, 0, .72, cz + lz * (hz - .06) - .025, cz + lz * (hz - .06) + .025);
        const chairs = along ? [[-.4, -1], [.4, -1], [-.4, 1], [.4, 1]] : [[-1, -.4], [-1, .4], [1, -.4], [1, .4]];
        for (const [a, b] of chairs) {
          const px = along ? cx + a : cx + a * (hx + .3), pz = along ? cz + b * (hz + .3) : cz + b;
          SW.box('fabric', px - .22, px + .22, .42, .47, pz - .22, pz + .22);
          if (along) SW.box('fabric', px - .22, px + .22, .47, .9, pz + b * .2 - .02, pz + b * .2 + .02); else SW.box('fabric', px + a * .2 - .02, px + a * .2 + .02, .47, .9, pz - .22, pz + .22);
          model(v, 'chair', px - .22, px + .22, pz - .22, pz + .22, along ? [0, -b] : [-a, 0]);
        }
        mark(cx - hx - .55, cx + hx + .55, cz - hz - .55, cz + hz + .55); ensure(v).items.push('mesa de comedor y sillas');
      }
    }
  }
  // 4) terraces and patios: table and chairs; loungers on large patios
  for (const [room, v] of roomsByType(r => r.type === 'exterior' && r.area >= 3)) {
    const F = ensure(v).builder, spot = openSpot(v, .75);
    if (spot) { const [cx, cz] = spot, SW = ensure(v).swap; SW.box('outdoor', cx - .4, cx + .4, .7, .74, cz - .4, cz + .4); SW.box('outdoor', cx - .04, cx + .04, 0, .7, cz - .04, cz + .04);
      for (const [a, b] of [[-.7, 0], [.7, 0]]) { SW.box('outdoor', cx + a - .23, cx + a + .23, .42, .46, cz + b - .23, cz + b + .23); SW.box('outdoor', cx + a + Math.sign(a) * .21 - .02, cx + a + Math.sign(a) * .21 + .02, .46, .85, cz - .23, cz + .23); }
      model(v, 'terraceSet', cx - .95, cx + .95, cz - .45, cz + .45, [0, 1]);
      mark(cx - 1, cx + 1, cz - .5, cz + .5); ensure(v).items.push('mesa exterior'); }
    if (room.area >= 15) {
      for (let n = 0; n < 2; n++) { const sp = openSpot(v, .6); if (!sp) break; const [lx, lz] = sp;
        if (!fits(v, lx - .35, lx + .35, lz - 1, lz + 1)) break;
        F.box('outdoor', lx - .35, lx + .35, .25, .35, lz - .95, lz + .95); F.box('outdoor', lx - .35, lx + .35, .35, .7, lz - .95, lz - .55); mark(lx - .45, lx + .45, lz - 1.05, lz + 1.05); }
      ensure(v).items.push('tumbonas');
    }
    const p2 = openSpot(v, .4); if (p2) { ensure(v).swap.box('plant', p2[0] - .25, p2[0] + .25, 0, .9, p2[1] - .25, p2[1] + .25); model(v, 'plant', p2[0] - .25, p2[0] + .25, p2[1] - .25, p2[1] + .25, [0, 1]); }
  }
  return out;
}

function roomTargets(u, g, X, Z) {
  const out = [];
  u.rooms.forEach((r, k) => {
    const v = k + 3; let n = 0, sx = 0, sz = 0, x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (let i = 0; i < u.h; i++) for (let j = 0; j < u.w; j++) if (g[i * u.w + j] === v) {
      n++; sx += j; sz += i; x0 = Math.min(x0, j); x1 = Math.max(x1, j); z0 = Math.min(z0, i); z1 = Math.max(z1, i);
    }
    if (!n) return;
    const lx = r.label ? r.label[0] : sx / n, lz = r.label ? r.label[1] : sz / n;
    out.push({...r, index: k, center: [X(sx / n), Z(sz / n)], labelAt: [X(lx), Z(lz)], bbox: [X(x0), X(x1 + 1), Z(z0), Z(z1 + 1)]});
  });
  return out;
}

// ------------------------------------------------------------------------------------------------
// viewer core
function setup(container, {shadows = true} = {}) {
  const scene = new T.Scene(); scene.background = new T.Color('#d9dcd6');
  const renderer = new T.WebGLRenderer({antialias: !small, alpha: false, powerPreference: 'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.25 : 1.6));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFShadowMap; renderer.shadowMap.autoUpdate = false;
  renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = .78;
  setAnisotropy(renderer.capabilities.getMaxAnisotropy());
  container.prepend(renderer.domElement);
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'Modelo 3D generado a partir de los planos publicados. Usa los botones de plantas, viviendas, estancias y cámara como alternativa accesible.');
  const pm = new T.PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture; pm.dispose();
  const camera = new T.PerspectiveCamera(40, 1, .05, 600);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = .09; controls.maxPolarAngle = Math.PI * .495; controls.enablePan = true; controls.screenSpacePanning = false;
  scene.add(new T.HemisphereLight('#fffaf2', '#a8a69e', 1.5));
  const sun = new T.DirectionalLight('#fff1dc', 1.8); sun.position.set(-18, 30, 14); sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048); sun.shadow.normalBias = .03; sun.shadow.bias = -.0003;
  scene.add(sun, sun.target);
  const labels = document.createElement('div'); labels.className = 'scene-labels'; container.append(labels);
  let alive = true, visible = true, frame = null, tween = null, dirty = 0, onFrame = null, composer = null, aoOn = false;
  // soft contact shadows in corners and under furniture (GTAO), only at eye level on desktop
  const setAO = on => {
    aoOn = !!on && !small;
    if (aoOn && !composer) {
      const w = container.clientWidth || 1, h = container.clientHeight || 1;
      composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
      const ao = new GTAOPass(scene, camera, w, h); ao.updateGtaoMaterial({radius: .45, distanceExponent: 1.4, thickness: 1, scale: 1.1, samples: 12});
      ao.updatePdMaterial({lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12}); ao.blendIntensity = .9;
      composer.addPass(ao); composer.addPass(new OutputPass()); composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h);
    }
    invalidate();
  };
  const invalidate = () => { dirty = 30; if (!frame && visible && alive) frame = requestAnimationFrame(tick); };
  function tick(time) {
    frame = null; if (!alive || !visible) return;
    if (tween) {
      const t = Math.min(1, (time - tween.time) / tween.duration), k = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(tween.from, tween.to, k); controls.target.lerpVectors(tween.tf, tween.tt, k);
      if (tween.fov) { camera.fov = tween.fov[0] + (tween.fov[1] - tween.fov[0]) * k; camera.updateProjectionMatrix(); }
      dirty = 20; if (t === 1) tween = null;
    }
    controls.update(); if (aoOn) composer.render(); else renderer.render(scene, camera); onFrame?.();
    if (dirty-- > 0 || tween) frame = requestAnimationFrame(tick);
  }
  controls.addEventListener('change', invalidate); controls.addEventListener('start', () => { tween = null; invalidate(); });
  const resize = () => { const w = container.clientWidth, h = container.clientHeight; if (w && h) { renderer.setSize(w, h, false); composer?.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); invalidate(); } };
  const ro = new ResizeObserver(resize); ro.observe(container);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) invalidate(); }, {rootMargin: '100px'}); io.observe(container);
  const move = (pos, target, fov) => {
    const to = new T.Vector3(...pos), tt = new T.Vector3(...target);
    if (reduced) { camera.position.copy(to); controls.target.copy(tt); if (fov) { camera.fov = fov; camera.updateProjectionMatrix(); } }
    else tween = {from: camera.position.clone(), to, tf: controls.target.clone(), tt, time: performance.now(), duration: 900, fov: fov ? [camera.fov, fov] : null};
    invalidate();
  };
  const fitShadow = (box) => {
    const s = box.getSize(new T.Vector3()), cxyz = box.getCenter(new T.Vector3()), r = Math.max(s.x, s.z) * .62 + 1;
    Object.assign(sun.shadow.camera, {left: -r, right: r, top: r, bottom: -r, near: .5, far: 200}); sun.shadow.camera.updateProjectionMatrix();
    sun.target.position.copy(cxyz); sun.position.copy(cxyz).add(new T.Vector3(-22, 38, 16)); renderer.shadowMap.needsUpdate = true;
  };
  const dispose = () => {
    alive = false; if (frame) cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); controls.dispose(); composer?.dispose();
    scene.traverse(o => { o.geometry?.dispose(); }); scene.environment?.dispose(); renderer.dispose(); renderer.domElement.remove(); labels.remove();
  };
  resize();
  if (/[?&]debug/.test(location.search)) (globalThis.__bamaireViewers ||= []).push({scene, renderer, camera});
  return {scene, renderer, camera, controls, move, invalidate, resize, dispose, labels, fitShadow, sun, setAO, set onFrame(f) { onFrame = f; }};
}

const eyeFov = s => Math.min(80, Math.max(58, 2 * Math.atan(Math.tan(47.5 * Math.PI / 180) / Math.max(.5, s.camera.aspect || 1.5)) * 180 / Math.PI));
function eyeLevel(s, r) {
  const [x0, x1, z0, z1] = r.bbox, w = x1 - x0, d = z1 - z0, cx = r.center[0], cz = r.center[1];
  const dir = w > d ? [1, 0] : [0, 1];
  s.controls.minDistance = .05; s.controls.maxDistance = .15; s.controls.rotateSpeed = -.45; s.controls.enablePan = false;
  s.controls.maxPolarAngle = Math.PI * .8; s.controls.minPolarAngle = Math.PI * .2;
  s.move([cx - dir[0] * .1, 1.5, cz - dir[1] * .1], [cx, 1.485, cz], eyeFov(s));
}
function orbitMode(s, minD = .3, maxD = 40, fov = 40) {
  Object.assign(s.controls, {minDistance: minD, maxDistance: maxD, rotateSpeed: 1, enablePan: true, minPolarAngle: 0, maxPolarAngle: Math.PI * .495});
  return fov;
}
function ceilingOf(u, mat) {
  const c = u.cell, W = u.w, H = u.h, g = decodeGrid(u), ox = W * c / 2, oz = H * c / 2, y = HEIGHTS.clear, pos = [], idx = [];
  const indoor = v => v === 1 || v === 2 || (v >= 3 && kindOf(u.rooms[v - 3]?.type) !== 'exterior');
  for (let i = 0; i < H; i++) for (let j = 0; j < W;) {
    if (!indoor(g[i * W + j])) { j++; continue; }
    let k = j; while (k < W && indoor(g[i * W + k])) k++;
    const x0 = j * c - ox - .02, x1 = k * c - ox + .02, z0 = i * c - oz - .02, z1 = (i + 1) * c - oz + .02, n = pos.length / 3;
    pos.push(x0, y, z0, x1, y, z0, x1, y, z1, x0, y, z1); idx.push(n, n + 1, n + 2, n, n + 2, n + 3); j = k;
  }
  const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
  const m = new T.Mesh(geo, mat); m.name = 'ceiling'; m.castShadow = true; m.receiveShadow = true; m.visible = false; return m;
}
function disposeGroup(g) { g.traverse(o => o.geometry?.dispose()); g.clear(); }

// finish state + material application (shared by explorer and interior viewer)
function finishState(project, mats) {
  const slots = programmeSlots(project), notes = memoriaNotes(project), cache = textureCache();
  const applyVariant = (m, k, v) => applyShared(m, k, v, cache);
  const state = {slots, notes, chosen: {}, concept: {worktop: 0, cabinets: 0, taps: 0}};
  const apply = () => {
    for (const s of slots) {
      if (!s.surface || !s.variants) continue;
      const v = s.variants[(state.chosen[s.idx] ?? 0) % s.variants.length];
      if (s.surface === 'floor') { applyVariant(mats.floor, 'floorWood', v); if (notes.floorWetKitchen) applyVariant(mats.kitchenFloor, 'floorWood', v); }
      if (s.surface === 'kitchenWall' || s.surface === 'kitchenAll') { applyVariant(mats.kitchenWall, 'tile', v); if (s.surface === 'kitchenAll') applyVariant(mats.kitchenFloor, 'tile', {...v, tile: [.6, .6], pattern: 'grid'}); }
      if (s.surface === 'bath') { applyVariant(mats.bathWall, 'tile', v.wall); applyVariant(mats.bathFloor, 'tile', v.floor); }
      if (s.surface === 'carpentry') applyVariant(mats.carpentry, 'carpentry', v);
      if (s.surface === 'paint') applyVariant(mats.paint, 'paint', v);
      if (s.surface === 'cabinets') applyVariant(mats.cabinets, 'carpentry', v);
    }
    if (/PVC$/.test(notes.skirting?.finish || '')) applyVariant(mats.skirting, 'paint', {base: '#e9e5dc'});
    if (!slots.some(s => s.surface === 'floor')) applyVariant(mats.floor, 'floorWood', notes.defaultFloor || {base: '#c9ad88', grain: '#9b7b55', var: .04});
    if (!slots.some(s => s.surface === 'bath')) { applyVariant(mats.bathWall, 'tile', {tile: [.6, .3], base: '#f0eee9', grout: '#dcd8cf', gloss: .18}); applyVariant(mats.bathFloor, 'tile', {tile: [.6, .6], base: '#a9a6a0', grout: '#94918b', gloss: .5, speck: .6}); }
    if (!slots.some(s => /kitchen/.test(s.surface || ''))) applyVariant(mats.kitchenWall, 'tile', {tile: [.6, .3], base: '#efede7', grout: '#d8d4cb', gloss: .2, pattern: 'grid'});
    if (!slots.some(s => s.surface === 'cabinets')) applyVariant(mats.cabinets, 'carpentry', CONCEPTS.cabinets.options[state.concept.cabinets]);
    const w = CONCEPTS.worktop.options[state.concept.worktop]; applyVariant(mats.worktop, w.kind === 'wood' ? 'wood' : 'stone', w);
    applyVariant(mats.metal, 'metal', CONCEPTS.taps.options[state.concept.taps]);
    applyVariant(mats.terrace, 'tile', {tile: [.33, .33], base: '#bdb4a6', grout: '#a59c8e', gloss: .75, speck: .9});
    applyVariant(mats.facade, 'tile', {tile: [.24, .07], base: '#f4f3ef', grout: '#e0ded8', gloss: .7, pattern: 'brick'});
    applyVariant(mats.cladding, 'tile', {tile: [1.2, .15], base: '#aaa69d', grout: '#8f8b83', gloss: .55, pattern: 'brick', speck: .3});
  };
  return {state, apply};
}

function unitMeshes(u, mats, opts) {
  const built = buildUnit(u, opts);
  for (const m of built.builder.meshes(mats)) built.group.add(m);
  const fg = {};
  for (const [ri, f] of Object.entries(built.furniture)) {
    const grp = new T.Group(); grp.name = 'furniture-' + ri;
    for (const m of f.builder.meshes(mats)) grp.add(m);
    for (const m of f.swap?.meshes(mats) || []) grp.add(m);
    grp.userData.models = f.models || [];
    built.group.add(grp); fg[ri] = grp;
  }
  built.furnitureGroups = fg;
  return built;
}

function planOverlay(u, mats) {
  const tex = new T.TextureLoader().load(fileURL(`/models/${u.promotion || 'mykonos'}/plans/${u.code}.jpg`));
  tex.colorSpace = T.SRGBColorSpace;
  const mat = mats.plan.clone(); mat.map = tex;
  const m = new T.Mesh(new T.PlaneGeometry(u.w * u.cell, u.h * u.cell), mat);
  m.rotation.x = -Math.PI / 2; m.position.y = .012; m.visible = false; m.renderOrder = 2; m.name = 'plan-overlay';
  return m;
}

function placeLabels(s, items, filter = null) {
  // compact pins: a small "+" per room/dwelling; hover or tap shows its name and m², the viewer's "Medidas" button shows all
  s.labels.innerHTML = items.map((r, i) => `<span class="scene-label pin" data-i="${i}"><button class="pin-dot" type="button" aria-expanded="false" aria-label="${r.name}${r.text ? ' · ' + r.text : ''}">+</button><span class="pin-body"><b>${r.name}</b>${r.text ? `<small>${r.text}</small>` : ''}</span></span>`).join('');
  s.labels.querySelectorAll('.pin-dot').forEach(b => b.onclick = e => {
    e.stopPropagation(); const p = b.parentElement, on = !p.classList.contains('open');
    p.classList.toggle('open', on); b.setAttribute('aria-expanded', on); b.textContent = on ? '−' : '+';
  });
  const nodes = [...s.labels.children], v = new T.Vector3();
  s.onFrame = () => {
    const w = s.renderer.domElement.clientWidth, h = s.renderer.domElement.clientHeight;
    items.forEach((r, i) => {
      v.set(r.pos[0], r.pos[1], r.pos[2]).applyMatrix4(r.obj.matrixWorld);
      const seen = !filter || filter(i, v); v.project(s.camera);
      const n = nodes[i]; if (!n) return;
      const show = seen && v.z < 1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05;
      n.style.display = show ? '' : 'none';
      if (show) n.style.transform = `translate(-50%,-50%) translate(${(v.x * .5 + .5) * w}px,${(-v.y * .5 + .5) * h}px)`;
    });
  };
}
const roomLabel = r => ({name: r.name, text: `${fmt(r.area)} m²`});

// ------------------------------------------------------------------------------------------------
// building exterior: rebuilt from Bamaire's published elevations (see scripts/plans/exterior.py).
// Every outward face is mapped with the published image itself, so windows, cladding and railings read
// exactly as customers see them; relief (frame, bays, balconies, roof) is real geometry.
export function buildExterior(ex, mats) {
  const P = new Builder(), L = ex.length, D = ex.depth, TOPY = ex.top, half = L / 2;
  const quad = (name, a, b, c, d, n, uv) => P.quad(name, a, b, c, d, n, uv);
  // textured quad on a long face (plane x = X): z0<z1, y0<y1; u from the face's z mapping
  const longFace = (f, name, X, z0, z1, y0, y1, out) => {
    const U = z => f.zOfU[1] > 0 ? (z - f.zOfU[0]) / L : (f.zOfU[0] - z) / L, V = y => y / TOPY;
    if (out > 0) quad(name, [X, y0, z1], [X, y0, z0], [X, y1, z0], [X, y1, z1], [1, 0, 0], [U(z1), V(y0), U(z0), V(y0), U(z0), V(y1), U(z1), V(y1)]);
    else quad(name, [X, y0, z0], [X, y0, z1], [X, y1, z1], [X, y1, z0], [-1, 0, 0], [U(z0), V(y0), U(z1), V(y0), U(z1), V(y1), U(z0), V(y1)]);
  };
  // box whose outward face (towards ±x) is textured and the rest plain
  const reliefX = (f, name, side, xa, xb, z0, z1, y0, y1, out) => {
    const x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), front = out > 0 ? x1 : x0;
    longFace(f, name, front, z0, z1, y0, y1, out);
    P.box(side, x0, x1, y0, y1, z0, z1, 1 | 2 | 4 | 8);
  };
  const zOf = (f, u) => f.zOfU[0] + f.zOfU[1] * u;
  for (const [key, f] of Object.entries(ex.faces)) {
    const name = 'tex_' + key, X0 = f.x, s = f.normal, d = .45, rec = .35;
    const [fu0, fu1, fb, ft] = f.frame, [bv0, bv1] = f.bayV;
    const Z = (ua, ub) => { const a = zOf(f, ua), b = zOf(f, ub); return [Math.min(a, b), Math.max(a, b)]; };
    // main plane outside the frame and under it (plinth)
    longFace(f, name, X0, ...Z(0, fu0), 0, TOPY, s); longFace(f, name, X0, ...Z(fu1, L), 0, TOPY, s);
    longFace(f, name, X0, ...Z(fu0, fu1), 0, fb, s);
    // frame bands and piers (project d)
    const xo = X0 + s * d;
    reliefX(f, name, 'plaster', X0, xo, ...Z(fu0, fu1), bv1, TOPY, s);
    reliefX(f, name, 'plaster', X0, xo, ...Z(fu0, fu1), fb, bv0, s);
    const edges = [fu0, ...f.bays.flat(), fu1];
    for (let i = 0; i < edges.length; i += 2) if (edges[i + 1] - edges[i] > .05) reliefX(f, name, 'plaster', X0, xo, ...Z(edges[i], edges[i + 1]), bv0, bv1, s);
    // recessed bays: textured back wall + grey reveals
    for (const [ua, ub] of f.bays) {
      const [z0, z1] = Z(ua, ub), xb = X0 - s * rec;
      longFace(f, name, xb, z0, z1, bv0, bv1, s);
      P.box('cladSide', Math.min(xb, xo), Math.max(xb, xo), bv0, bv1, z0 - .02, z0, 4); P.box('cladSide', Math.min(xb, xo), Math.max(xb, xo), bv0, bv1, z1, z1 + .02, 8);
    }
    // balconies: merge pieces split by mullions, slab + glass front (textured) + glass sides
    const byLv = {};
    for (const [ua, ub, lv] of f.balconies) (byLv[lv] ||= []).push([ua, ub]);
    for (const [lv, list] of Object.entries(byLv)) {
      list.sort((a, b) => a[0] - b[0]);
      const merged = [];
      for (const r of list) { const m = merged.at(-1); if (m && r[0] - m[1] < .7) m[1] = Math.max(m[1], r[1]); else merged.push([...r]); }
      const y = ex.levels[lv];
      for (const [ua, ub] of merged) {
        if (ub - ua < 1) continue;
        const [z0, z1] = Z(ua, ub), xb = X0 - s * rec, xf = X0 + s * (d + .75);
        reliefX(f, name, 'cladSide', xb, xf, z0, z1, y - .26, y, s);                 // slab: front edge carries the image's grey band
        longFace(f, name, xf + s * .005, z0, z1, y, y + 1.05, s);                    // tinted glass front as published
        // solid grey side cheeks as in the renders
        P.box('cladSide', Math.min(xb, xf), Math.max(xb, xf), y - .26, y + 1.05, z0, z0 + .12, 63); P.box('cladSide', Math.min(xb, xf), Math.max(xb, xf), y - .26, y + 1.05, z1 - .12, z1, 63);
      }
    }
  }
  // ends
  for (const [key, e] of Object.entries(ex.ends)) {
    const name = 'tex_' + key, Z0 = e.z;
    if (e.normal > 0) quad(name, [0, 0, Z0], [D, 0, Z0], [D, TOPY, Z0], [0, TOPY, Z0], [0, 0, 1], [0, 0, 1, 0, 1, 1, 0, 1]);
    else quad(name, [D, 0, Z0], [0, 0, Z0], [0, TOPY, Z0], [D, TOPY, Z0], [0, 0, -1], [0, 0, 1, 0, 1, 1, 0, 1]);
  }
  // roof inside the parapet, parapet inner faces and cap, lift/stair overruns
  const ry = ex.levels.roof + .35, t = .3;
  P.box('roof', 0, D, ry - .05, ry, -half, half, 1);
  P.box('plaster', 0, t, ry, TOPY, -half, half, 16); P.box('plaster', D - t, D, ry, TOPY, -half, half, 32);
  P.box('plaster', 0, D, ry, TOPY, -half, -half + t, 4); P.box('plaster', 0, D, ry, TOPY, half - t, half, 8);
  for (const [x0, x1, z0, z1] of [[-.45, t, -half, half], [D - t, D + .45, -half, half], [0, D, -half, -half + t], [0, D, half - t, half]]) P.box('cap', x0, x1, TOPY, TOPY + .04, z0, z1, 1);
  for (const o of ex.overruns) P.box('plaster', o.x[0], o.x[1], ry, TOPY + o.h, o.z[0], o.z[1]);
  return P;
}

// surroundings measured from the renders/plans: street with parking on Calle María de Molina, slatted plot
// fence, ground-floor patios, raised courtyard with the pool (render 02, sótano "Foso piscina"), the garage ramp
// along the Portal 1 end (render 01, sótano "Rampa acceso a garaje") and the pedestrian street beyond it
const rectMinus = (r, holes) => {                    // axis-aligned rectangle minus holes → rectangles [x0, x1, z0, z1]
  const xs = [...new Set([r[0], r[1], ...holes.flatMap(h => [h[0], h[1]]).filter(v => v > r[0] && v < r[1])])].sort((a, b) => a - b);
  const zs = [...new Set([r[2], r[3], ...holes.flatMap(h => [h[2], h[3]]).filter(v => v > r[2] && v < r[3])])].sort((a, b) => a - b);
  const out = [];
  for (let a = 0; a < xs.length - 1; a++) for (let b = 0; b < zs.length - 1; b++) {
    const cx = (xs[a] + xs[a + 1]) / 2, cz = (zs[b] + zs[b + 1]) / 2;
    if (!holes.some(h => cx > h[0] && cx < h[1] && cz > h[2] && cz < h[3])) out.push([xs[a], xs[a + 1], zs[b], zs[b + 1]]);
  }
  return out;
};
export function buildSite(ex, b, mats) {
  const S = new Builder(), half = ex.length / 2, st = ex.site || {};
  const [zN, zP] = st.plotZ || [-half - 2, half + 7.5];
  const px = st.patioX?.[1] ?? ex.depth + 6.5, cx = -8, top = .7;
  const pool = st.pool || {x: [-6.4, -2.0], z: [-32.0, -16.0]}, coping = .4;
  const sol = st.solarium || {x: [-7.6, -.9], z: [-15.0, -9.0]};
  const ramp = st.ramp || {z: [38.1, 41.7], x: [2.0, px], top: 24.5, bottom: 4.0, depth: -3.2};
  S.box('pavement', -40, 70, -.32, -.3, zN - 30, zP + 30, 1);
  S.box('street', px + 4, px + 14, -.31, -.295, zN - 30, zP + 30, 1);
  for (let z = zN; z < zP; z += 5) S.box('lineWhite', px + 4.1, px + 6.2, -.294, -.29, z, z + .12, 1);        // parking bays
  S.box('lineWhite', px + 8.95, px + 9.05, -.294, -.29, zN - 30, zP + 30, 1);
  S.box('lawn', -40, cx - 1, -.3, -.28, zN - 30, zP + 30, 1);
  // raised paving: courtyard (minus pool and solarium), street-side patios, both end strips, deck over the ramp tunnel
  const P = (x0, x1, z0, z1) => S.box('paving', x0, x1, -.3, top, z0, z1, 1);
  const poolOut = [pool.x[0] - coping, pool.x[1] + coping, pool.z[0] - coping, pool.z[1] + coping];
  for (const r of rectMinus([cx, 0, zN, half], [poolOut, [sol.x[0], sol.x[1], sol.z[0], sol.z[1]]])) P(...r);
  P(ex.depth, px, zN, half); P(cx, px, zN, -half); P(cx, px, half, ramp.z[0] - .2); P(cx, ramp.x[0], ramp.z[0] - .2, zP);
  S.box('paving', cx, ramp.x[0], -.3, top, ramp.z[0], ramp.z[1], 16);                                        // deck edge over the tunnel
  // pool: coping ring, tiled basin, water 12 cm below the coping; solarium of artificial grass with loungers; glass fence
  for (const r of rectMinus(poolOut, [[pool.x[0], pool.x[1], pool.z[0], pool.z[1]]])) S.box('poolEdge', r[0], r[1], top, top + .04, r[2], r[3], 1);
  S.box('poolWall', pool.x[0], pool.x[1], top - 1.4, top + .02, pool.z[0], pool.z[1], 2 | 4 | 8 | 16 | 32);
  S.box('water', pool.x[0], pool.x[1], top - .3, top - .12, pool.z[0], pool.z[1], 1);
  S.box('grass', sol.x[0], sol.x[1], top, top + .03, sol.z[0], sol.z[1], 1);
  for (let k = 0; k < 4; k++) { const z = sol.z[0] + 1 + k * 1.3; S.box('lounger', sol.x[0] + .6, sol.x[0] + 2.5, top + .03, top + .38, z, z + .7); }
  for (const [x0, x1, z0, z1] of [[poolOut[1] + .05, poolOut[1] + .09, poolOut[2], sol.z[1]], [poolOut[0], poolOut[1] + .09, poolOut[2] - .04, poolOut[2]]])
    S.box('glassFence', x0, x1, top, top + 1.1, z0, z1);
  // garage ramp: street level at the María de Molina side down to the basement under the courtyard deck
  const [rz0, rz1] = ramp.z, yT = -.3, yB = ramp.depth;
  S.quad('ramp', [ramp.x[1], yT, rz0], [ramp.x[1], yT, rz1], [ramp.top, yT, rz1], [ramp.top, yT, rz0], [0, 1, 0], [0, 0, 0, 1, 1, 1, 1, 0]);
  S.quad('ramp', [ramp.top, yT, rz0], [ramp.top, yT, rz1], [ramp.bottom, yB, rz1], [ramp.bottom, yB, rz0], [.14, .99, 0], [0, 0, 0, 1, 1, 1, 1, 0]);
  S.quad('ramp', [ramp.bottom, yB, rz0], [ramp.bottom, yB, rz1], [cx, yB, rz1], [cx, yB, rz0], [0, 1, 0], [0, 0, 0, 1, 1, 1, 1, 0]);
  for (const [z, n] of [[rz0, 1], [rz1, -1]]) {                                                              // ramp side walls (inner faces + top)
    const prof = [[ramp.x[1], yT], [ramp.top, yT], [ramp.bottom, yB], [ramp.x[0] - .2, yB]];
    for (let k = 0; k < prof.length - 1; k++) {
      const [xa, ya] = prof[k], [xb, yb] = prof[k + 1];
      S.quad('fenceWall', [xa, ya, z], [xb, yb, z], [xb, 1.0, z], [xa, 1.0, z], [0, 0, n], [xa, ya, xb, yb, xb, 1, xa, 1]);
    }
    S.box('fenceWall', ramp.x[0], ramp.x[1], 1.0, 1.06, z - (n > 0 ? .2 : 0), z + (n < 0 ? .2 : 0), 1);
  }
  S.quad('tunnel', [ramp.x[0], yB, rz1], [ramp.x[0], yB, rz0], [ramp.x[0], top - .3, rz0], [ramp.x[0], top - .3, rz1], [1, 0, 0], [0, 0, 1, 0, 1, 1, 0, 1]);
  S.box('fenceWall', ramp.x[0] - .3, ramp.x[0], top - .3, top, rz0, rz1, 16);                                   // lintel over the tunnel mouth
  S.box('planter', cx + .6, cx + 3.2, top, top + .6, rz0 + .5, rz1 - .5);
  // plot fences: white base wall + grey slats (open at the ramp entrance)
  const fence = (x0, x1, z0, z1) => { S.box('fenceWall', x0, x1, -.3, 1.0, z0, z1); S.box('slats', x0 + (x1 - x0) * .25, x1 - (x1 - x0) * .25, 1.0, 1.95, z0 + (z1 - z0 > 1 ? 0 : .07), z1 - (z1 - z0 > 1 ? 0 : .07)); };
  fence(px - .15, px + .15, zN, rz0); fence(px - .15, px + .15, rz1, zP); fence(cx - .15, cx + .15, zN, zP); fence(cx, px, zP - .15, zP + .15); fence(cx, px, zN - .15, zN + .15);
  // patio dividers of the ground-floor dwellings (traced rails), Portal 1 and mirrored Portal 2
  const B = b.levels.B;
  for (const pu of B?.units || []) {
    const c = pu.cell || b.cell;
    for (const [x0, y0, x1, y1] of pu.rail || []) {
      const X0 = pu.x + x0 * c, X1 = pu.x + x1 * c, Z0 = pu.y + y0 * c, Z1 = pu.y + y1 * c;
      for (const m of [1, -1]) {
        if (Z0 === Z1) S.box('fenceWall', Math.min(X0, X1), Math.max(X0, X1), .7, 1.75, m * Z0 - .1, m * Z0 + .1);
        else S.box('fenceWall', X0 - .1, X0 + .1, .7, 1.75, Math.min(m * Z0, m * Z1), Math.max(m * Z0, m * Z1));
      }
    }
  }
  // trees along the street and in the courtyard (as in the renders)
  const trees = [];
  for (let z = zN + 4; z < zP; z += 9) trees.push([px + 2, z]);
  for (let z = -half + 20; z < half; z += 12) trees.push([cx - 3, z]);
  S.trees = trees;
  return S;
}



// ------------------------------------------------------------------------------------------------
// public: building → floor → dwelling explorer
export function createExplorer(container, callbacks, {project, promotion = 'mykonos', status = {}, unitsInfo = {}} = {}) {
  const t0 = performance.now();
  const s = setup(container, {shadows: false}); mark('setup', t0);
  const mats = materialSet();
  let fin = null; const pending = {chosen: {}, concept: {}};   // interior finishes are generated only when a dwelling opens
  const finishes = () => { if (!fin) { fin = finishState(project, mats); Object.assign(fin.state.chosen, pending.chosen); Object.assign(fin.state.concept, pending.concept); fin.apply(); } return fin; };
  const root = new T.Group(), buildingG = new T.Group(), floorG = new T.Group(), homeG = new T.Group(), hoverG = new T.Group();
  s.scene.add(root); root.add(buildingG, floorG, homeG, hoverG);
  const base = `/models/${promotion}`;
  let building = null, ex = null, mode = 'building', level = null, unit = null, unitBuilt = null, wallsCut = false, overlay = null;
  let apartments = [], hoverTarget = null, unitPortal = 1;
  const ui = navUI(container);
  const hint = t => { const el = container.querySelector('#viewer-hint'); if (el) el.textContent = t; };

  function texMat(file) {
    const tx = new T.TextureLoader().load(fileURL(`${base}/tex/${file}`), () => s.invalidate());
    tx.colorSpace = T.SRGBColorSpace; tx.anisotropy = 8;
    return new T.MeshBasicMaterial({map: tx, toneMapped: false});
  }

  async function init() {
    [building, ex] = await Promise.all([getJSON(`${base}/building.json`), getJSON(`${base}/exterior.json`)]); mark('json', t0);
    const em = {...mats};
    for (const [k, f] of Object.entries(ex.faces)) em['tex_' + k] = texMat(f.texture.file);
    for (const [k, e] of Object.entries(ex.ends)) em['tex_' + k] = texMat(e.texture.file);
    const shell = new T.Group(); for (const m of buildExterior(ex, em).meshes(em, {shadows: false})) shell.add(m);
    const siteB = buildSite(ex, building, em), site = new T.Group(); for (const m of siteB.meshes(em, {shadows: false})) site.add(m);
    { // trees: two instanced meshes (trunk + rounded canopy)
      const n = siteB.trees.length, trunk = new T.InstancedMesh(new T.CylinderGeometry(.11, .15, 2.6, 6), mats.trunk, n), crown = new T.InstancedMesh(new T.IcosahedronGeometry(1.6, 1), mats.canopy, n);
      const M = new T.Matrix4(), q = new T.Quaternion(), sc = new T.Vector3();
      siteB.trees.forEach(([x, z], i) => { const k = .85 + ((i * 37) % 10) / 30; M.compose(new T.Vector3(x, 1.0, z), q, sc.set(1, 1, 1)); trunk.setMatrixAt(i, M); M.compose(new T.Vector3(x, 3.3 * k, z), q, sc.set(k, k * 1.15, k)); crown.setMatrixAt(i, M); });
      site.add(trunk, crown);
    }
    buildingG.add(shell, site); buildingG.position.set(-ex.depth / 2, 0, 0); floorG.position.copy(buildingG.position); hoverG.position.copy(buildingG.position);
    apartments = apartmentBoxes(building);
    mark('exterior', t0);
    overview(true); ui.setCrumbs([['Edificio', null]]); ui.floors(Object.keys(building.levels), lv => goFloor(lv), lv => highlightLevel(lv));
    s.invalidate();
    if (DEBUG) { const r0 = performance.now(); s.renderer.render(s.scene, s.camera); s.renderer.getContext().finish(); mark('firstRender(' + Math.round(performance.now() - r0) + 'ms)', t0); globalThis.__bamaireMarks = marks; }
  }
  // one box per apartment and portal (Portal 2 mirrors Portal 1)
  const apartmentBoxes = b => boxesOf(b).map(a => ({...a, box: new T.Box3(new T.Vector3(...a.min), new T.Vector3(...a.max))}));
  const statusColor = (code, portal) => STATUS[statusOf(status, code, portal)]?.color;
  const info = code => unitsInfo[code] || {};
  const tip = a => tipHTML(a, unitsInfo, status);

  function overview(instant) {
    const k = 1 / Math.pow(Math.min(1.25, Math.max(.45, s.camera.aspect || 1.2)) / 1.25, .85);
    const p = [(ex.depth * 3.2 + 30) * k, 34 * Math.sqrt(k), ex.length * .85 * k];
    orbitMode(s, 12, 260);
    if (instant) { s.camera.position.set(...p); s.controls.target.set(0, 9, 0); s.camera.fov = 40; s.camera.updateProjectionMatrix(); s.invalidate(); }
    else s.move(p, [0, 9, 0], 40);
  }
  function clearHover() { disposeGroup(hoverG); hoverTarget = null; ui.tip(null); s.invalidate(); }
  function showBox(box, color, opacity = .32) {
    const g = new T.BoxGeometry(...box.getSize(new T.Vector3()).toArray().map((v, i) => v + (i === 1 ? 0 : .9)));
    const m = new T.Mesh(g, new T.MeshBasicMaterial({color, transparent: true, opacity, depthWrite: false, depthTest: false})); m.renderOrder = 10;
    m.position.copy(box.getCenter(new T.Vector3())); hoverG.add(m);
    const e = new T.LineSegments(new T.EdgesGeometry(g), new T.LineBasicMaterial({color, transparent: true, opacity: .95, depthTest: false})); e.position.copy(m.position); e.renderOrder = 11; hoverG.add(e);
  }
  function highlightLevel(lv) {
    if (mode !== 'building') return;
    disposeGroup(hoverG);
    if (lv) showBox(new T.Box3(new T.Vector3(-.6, levelY(lv), -ex.length / 2 - .6), new T.Vector3(ex.depth + .6, levelY(lv) + storeyH(lv), ex.length / 2 + .6)), '#2f6f86', .22);
    s.invalidate();
  }

  // ---- floor: cut the building above the floor, show its apartments coloured by published status
  function goFloor(lv) {
    if (!building) return;
    level = lv; mode = 'floor'; clearHover(); disposeGroup(floorG); homeG.visible = false; buildingG.visible = true; floorG.visible = true; walkOff();
    const L = building.levels[lv], y = levelY(lv), F = new Builder(), c0 = building.cell;
    for (const [x, z, w, h] of L.slab) { const sc = L.slabCell, [ox, oz] = L.offset || [0, 0];
      for (const m of [1, -1]) { const za = m * (oz + z * sc), zb = m * (oz + (z + h) * sc); F.box('slab', ox + x * sc, ox + (x + w) * sc, y - .3, y, Math.min(za, zb), Math.max(za, zb)); } }
    for (const pu of L.units) {
      const c = pu.cell || c0;
      for (const m of [1, -1]) for (const [x, z, w, h] of pu.walls) {
        const za = m * (pu.y + z * c), zb = m * (pu.y + (z + h) * c);
        F.box('plaster', pu.x + x * c, pu.x + (x + w) * c, y, y + 1.2, Math.min(za, zb), Math.max(za, zb));
      }
    }
    for (const m of F.meshes(mats, {shadows: false})) floorG.add(m);
    const labels = [];
    for (const a of apartments.filter(a => a.lv === lv)) {
      const st = statusOf(status, a.code, a.portal), sz = a.box.getSize(new T.Vector3()), ctr = a.box.getCenter(new T.Vector3());
      const plate = new T.Mesh(new T.BoxGeometry(sz.x - .3, .06, sz.z - .3), new T.MeshBasicMaterial({color: statusColor(a.code, a.portal) || '#7f9c86', transparent: true, opacity: .28, depthWrite: false}));
      plate.position.set(ctr.x, y + .05, ctr.z); plate.userData.apartment = a; floorG.add(plate);
      const i = info(a.code);
      labels.push({name: (a.portal === 2 ? 'P2 · ' : '') + a.code, text: [i.bedrooms != null ? i.bedrooms + ' dorm.' : '', i.util ? fmt(i.util) + ' m²' : '', st ? STATUS[st].label : ''].filter(Boolean).join(' · '), pos: [ctr.x, y + .4, ctr.z], obj: floorG});
    }
    placeLabels(s, labels);
    clip(y + 1.25);
    const asp = s.camera.aspect || 1.3, span = Math.max(ex.length + 6, (ex.depth + 14) * asp), hfov = 2 * Math.atan(Math.tan(20 * Math.PI / 180) * asp);
    const h = (span / 2) / Math.tan(hfov / 2) * 1.02;
    s.move([-h * .18, y + h, .01], [0, y, 0], orbitMode(s, 6, 260));
    ui.setCrumbs([['Edificio', () => goBuilding()], [levelName(lv), null]]); ui.activeFloor(lv);
    hint(`${levelName(lv)} · pulsa una vivienda`);
    callbacks.floor?.(lv === 'B' ? 0 : Number(lv), true);
  }
  function goBuilding() {
    callbacks.building?.();
    mode = 'building'; level = null; clearHover(); disposeGroup(floorG); clip(null); homeG.visible = false; buildingG.visible = true;
    clearHome(); unitBuilt = null; walkOff();
    placeLabels(s, []); overview(); ui.setCrumbs([['Edificio', null]]); ui.activeFloor(null);
    hint('Pasa el cursor por la fachada · pulsa una vivienda o elige una planta');
  }
  function clip(y) { s.renderer.clippingPlanes = y == null ? [] : [new T.Plane(new T.Vector3(0, -1, 0), y)]; s.renderer.shadowMap.needsUpdate = true; s.invalidate(); }

  // ---- dwelling interior
  // built dwellings are cached (geometry kept when leaving) and can be prepared ahead (hover / tap on the turntable)
  const builtCache = new Map();
  const tileOf = f => f.state.slots.some(x => x.surface === 'kitchenAll') ? 'all' : 'wall';
  async function prepare(code) {
    const u = await getJSON(`${base}/units/${code}.json`).catch(() => null); if (!u) return null;
    const f = finishes(), key = code + '|' + tileOf(f);
    if (!builtCache.has(key)) {
      builtCache.set(key, unitMeshes(u, mats, {kitchenTile: tileOf(f), notes: f.state.notes}));
      if (builtCache.size > 8) { const [k0, b0] = builtCache.entries().next().value; if (b0 !== unitBuilt) { disposeGroup(b0.group); builtCache.delete(k0); } }
    }
    return {u, built: builtCache.get(key)};
  }
  function clearHome() { if (unitBuilt?.group.parent === homeG) homeG.remove(unitBuilt.group); disposeGroup(homeG); }
  // eye level: ceiling on (the sun then only enters through the windows) and soft contact shadows; off for the overview
  function eyeLook(on) {
    if (unitBuilt?.ceiling && unitBuilt.ceiling.visible !== on) { unitBuilt.ceiling.visible = on; s.renderer.shadowMap.needsUpdate = true; }
    // filmic AgX at eye level, as the Cycles renders (white walls keep their shading instead of clipping)
    s.renderer.toneMapping = on ? T.AgXToneMapping : T.ACESFilmicToneMapping; s.renderer.toneMappingExposure = on ? 1.0 : .78;
    s.setAO(on); s.invalidate();
  }
  function fitHome(view = 'perspective') {
    eyeLook(false);
    const [w, d] = unitBuilt.group.userData.size, r = Math.hypot(w, d) / 2 + .4;
    const vf = 40 * Math.PI / 180, hf = 2 * Math.atan(Math.tan(vf / 2) * (s.camera.aspect || 1)), dist = r / Math.sin(Math.min(vf, hf) / 2) * .9;
    const dir = view === 'top' ? new T.Vector3(0, 1, .002) : new T.Vector3(.42, .86, .5).normalize();
    s.move(dir.multiplyScalar(dist).toArray(), [0, 0, 0], orbitMode(s, .3, 60));
  }
  async function selectHome(code, portal = 1) {
    const next = await getJSON(`${base}/units/${code}.json`).catch(() => null);
    if (!next) { hint(`${code}: modelo no disponible. Consulta el plano PDF original.`); callbacks.unitMissing?.(code); return; }
    unit = next; unit.promotion = promotion; unitPortal = portal; const u0 = performance.now(); callbacks.home?.(code, true, portal);
    const f = finishes();
    mode = 'home'; clearHover(); clip(null); clearHome(); disposeGroup(floorG); buildingG.visible = false; homeG.visible = true;
    homeG.scale.z = portal === 2 ? -1 : 1; homeG.updateMatrixWorld(true);
    s.renderer.shadowMap.enabled = true;
    unitBuilt = (await prepare(code)).built;
    for (const g of Object.values(unitBuilt.furnitureGroups)) g.visible = true;
    if (!unitBuilt.ceiling) { unitBuilt.ceiling = ceilingOf(unit, mats.ceiling); unitBuilt.group.add(unitBuilt.ceiling); }
    homeG.add(unitBuilt.group); overlay = planOverlay(unit, mats); homeG.add(overlay); mark('unitBuild ' + code + ' ' + Math.round(performance.now() - u0) + 'ms', t0);
    applyCut();
    unitBuilt.rooms.forEach(r => { const [x0, x1, z0, z1] = r.bbox, m = new T.Mesh(new T.BoxGeometry(x1 - x0, .02, z1 - z0), mats.hit); m.position.set((x0 + x1) / 2, .01, (z0 + z1) / 2); m.userData.room = r; homeG.add(m); });
    placeLabels(s, unitBuilt.rooms.map(r => ({...roomLabel(r), pos: [r.labelAt[0], .2, r.labelAt[1]], obj: homeG})), (i, p) => !eye || seenFromEye(unitBuilt.rooms[i], p));
    s.fitShadow(new T.Box3().setFromObject(unitBuilt.group));
    eye = false; fitHome();
    const lv = code.startsWith('B') ? 'B' : code[0]; level = lv;
    ui.setCrumbs([['Edificio', () => goBuilding()], [levelName(lv), () => goFloor(lv)], [(portal === 2 ? 'Portal 2 · ' : '') + code, null]]); ui.activeFloor(lv);
    hint(`${code} · pulsa una estancia o un punto del plano para recorrerla`);
    homeUI();
    dress(unitBuilt);
    callbacks.unitLoaded?.(unit, unitBuilt);
  }
  function applyCut() { if (unitBuilt) clip(wallsCut ? 1.2 : null); }
  // the renders' scanned surfaces and furniture models, loaded after the dwelling is on screen
  function dress() {}                                   // dwellings open in the photographic viewer (apartment/)
  // a room opens from its inner end (towards the middle of the dwelling, where the door usually is), looking across
  // its whole length, like a real-estate photograph; L-shaped or tight rooms fall back to the centre
  function enterRoom(r) {
    const m = unitPortal === 2 ? -1 : 1, [x0, x1, z0, z1] = r.bbox, alongX = x1 - x0 > Math.abs(z1 - z0);
    const half = (alongX ? x1 - x0 : Math.abs(z1 - z0)) / 2, cx = r.center[0], cz = m * r.center[1];
    const ends = [-1, 1].map(sg => { const back = Math.max(0, half - .75); return alongX ? [cx + sg * back, cz, [-sg, 0]] : [cx, cz + sg * back, [0, -sg]]; })
      .sort((a, b) => Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));
    for (const [x, z, dir] of ends) { const c = clearSpot(x, z); if (c && roomAt(c[0], c[1]) === r) { eyeAt(c[0], c[1], dir, r); return; } }
    const c = clearSpot(cx, cz) || [cx, cz]; eyeAt(c[0], c[1], alongX ? [1, 0] : [0, m], r);
  }

  // ---- dwelling walkthrough: room bar, plan with your position, ↑↓/W S to walk, ←→/A D to turn, wheel to step,
  // click on the floor or on the plan to go there; walls stop you (traced grid of the dwelling)
  const roomBar = document.createElement('div'); roomBar.className = 'v-rooms'; roomBar.hidden = true;
  const mini = document.createElement('canvas'); mini.className = 'v-minimap'; mini.hidden = true;
  mini.setAttribute('role', 'img'); mini.setAttribute('aria-label', 'Plano de la vivienda con tu posición: pulsa un punto para ir allí');
  container.append(roomBar, mini);
  let eye = false, grid = null, planCv = null, curRoom = null;
  const TYPE_COL = {bedroom: [217, 211, 234], bath: [207, 227, 234], kitchen: [240, 220, 196], living_kitchen: [239, 226, 200], living: [242, 232, 207],
    circulation: [230, 228, 221], exterior: [219, 232, 208], laundry: [216, 230, 222], other: [232, 230, 224]};
  const mz = () => unitPortal === 2 ? -1 : 1;
  const cellOf = (x, z) => [Math.floor((mz() * z + unit.h * unit.cell / 2) / unit.cell), Math.floor((x + unit.w * unit.cell / 2) / unit.cell)];
  const valAt = (x, z) => { const [i, j] = cellOf(x, z); return i < 0 || j < 0 || i >= unit.h || j >= unit.w ? 0 : grid[i * unit.w + j]; };
  const walkable = (x, z) => { const v = valAt(x, z); return v === 2 || v >= 3; };
  const roomAt = (x, z) => { const v = valAt(x, z); return v >= 3 ? unitBuilt.rooms.find(r => r.index === v - 3) || null : null; };
  // keep the eye clear of walls (≥ 40 cm all round), so a wall never fills the screen
  const CLEAR = .4, RING = [0, 1, 2, 3, 4, 5, 6, 7].map(k => [Math.cos(k * Math.PI / 4), Math.sin(k * Math.PI / 4)]);
  const clear = (x, z, r = CLEAR) => walkable(x, z) && RING.every(([a, b]) => walkable(x + a * r, z + b * r));
  function clearSpot(x, z) {                          // the nearest spot with room around it (within 1 m)
    if (clear(x, z)) return [x, z];
    for (let d = .1; d <= 1.001; d += .1) for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d; if (clear(px, pz) && roomAt(px, pz) === roomAt(x, z)) return [px, pz]; }
    for (let d = .1; d <= 1.001; d += .1) for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, px = x + Math.cos(a) * d, pz = z + Math.sin(a) * d; if (clear(px, pz)) return [px, pz]; }
    return walkable(x, z) ? [x, z] : null;
  }
  // a room's pin shows at eye level only when you can see into that room: not your own room, nothing but open floor
  // (doorways included) on the traced plan between you and its label
  function seenFromEye(r, p) {
    const c = s.camera.position; if (roomAt(c.x, c.z) === r) return false;
    const dx = p.x - c.x, dz = p.z - c.z, L = Math.hypot(dx, dz), n = Math.ceil(L / .08);
    for (let k = 2; k < n - 2; k++) { const t = k / n; if (!walkable(c.x + dx * t, c.z + dz * t)) return false; }
    return true;
  }
  function homeUI() {
    grid = decodeGrid(unit);
    const rooms = unitBuilt.rooms.filter(r => r.area == null || r.area > .9);
    roomBar.innerHTML = '<button data-r="all">Vista general</button>' + rooms.map(r => `<button data-r="${r.index}">${r.name}</button>`).join('') +
      '<span class="v-walk-help">↑ ↓ avanzar · ← → girar · pulsa el suelo para ir</span>';
    roomBar.querySelectorAll('button').forEach(b => b.onclick = () => b.dataset.r === 'all' ? overviewHome() : enterRoom(unitBuilt.rooms.find(r => r.index === Number(b.dataset.r))));
    // plan image: one pixel per traced cell, mirrored for Portal 2 so it matches the 3D
    const W = unit.w, H = unit.h; planCv = document.createElement('canvas'); planCv.width = W; planCv.height = H;
    const g = planCv.getContext('2d'), img = g.createImageData(W, H);
    for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
      const v = grid[i * W + j], row = mz() > 0 ? i : H - 1 - i, o = (row * W + j) * 4;
      const c = v === 1 ? [70, 74, 77] : v === 2 ? [250, 250, 248] : v >= 3 ? TYPE_COL[kindOf(unit.rooms[v - 3]?.type)] || TYPE_COL.other : null;
      if (c) { img.data[o] = c[0]; img.data[o + 1] = c[1]; img.data[o + 2] = c[2]; img.data[o + 3] = 255; }
    }
    g.putImageData(img, 0, 0);
    roomBar.hidden = false; mini.hidden = false; markRoom(); drawMini();
  }
  function walkOff() { eye = false; keys.clear(); curRoom = null; roomBar.hidden = true; mini.hidden = true; eyeLook(false); }
  function markRoom() { roomBar.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.r === (eye && curRoom ? String(curRoom.index) : eye ? '' : 'all'))); }
  function overviewHome() { eye = false; curRoom = null; markRoom(); fitHome(); hint(`${unit.code} · pulsa una estancia o un punto del plano para recorrerla`); callbacks.overview?.(); }
  function eyeAt(x, z, dir, room) {
    wallsCut = false; applyCut(); eye = true; eyeLook(true);
    Object.assign(s.controls, {minDistance: .05, maxDistance: .15, rotateSpeed: -.45, enablePan: false, maxPolarAngle: Math.PI * .8, minPolarAngle: Math.PI * .2});
    s.move([x - dir[0] * .1, 1.5, z - dir[1] * .1], [x, 1.485, z], eyeFov(s));
    setRoom(room || roomAt(x, z));
  }
  function setRoom(r) {
    if (r === curRoom) return; curRoom = r; markRoom();
    if (r) { hint(`${r.name} · ${fmt(r.area)} m² · arrastra para mirar · ↑ ↓ para avanzar`); callbacks.room?.(r); }
  }
  const lookDir = () => { const d = s.controls.target.clone().sub(s.camera.position); d.y = 0; return d.lengthSq() ? d.normalize() : new T.Vector3(1, 0, 0); };
  function walkTo(x, z) { const c = walkable(x, z) && clearSpot(x, z); if (!c) return false; const d = lookDir(); eyeAt(c[0], c[1], [d.x, d.z]); return true; }
  function step(dist) {                              // move the eye along the view, sliding along walls
    const tg = s.controls.target, d = lookDir().multiplyScalar(dist), probe = Math.sign(dist) * .28;
    const dn = lookDir().multiplyScalar(probe);
    const tight = !clear(tg.x, tg.z, CLEAR * .8);       // started in a tight spot: any walkable move is allowed
    const ok = (x, z) => (tight ? walkable(x, z) : clear(x, z, CLEAR * .8)) && walkable(x + dn.x, z + dn.z);
    let mv = null;
    if (ok(tg.x + d.x, tg.z + d.z)) mv = d; else if (ok(tg.x + d.x, tg.z)) mv = new T.Vector3(d.x, 0, 0); else if (ok(tg.x, tg.z + d.z)) mv = new T.Vector3(0, 0, d.z);
    if (!mv) return;
    s.camera.position.add(mv); tg.add(mv); s.controls.update(); s.invalidate(); setRoom(roomAt(tg.x, tg.z) || curRoom); drawMini();
  }
  function turn(a) { const tg = s.controls.target, off = s.camera.position.clone().sub(tg).applyAxisAngle(new T.Vector3(0, 1, 0), a); s.camera.position.copy(tg).add(off); s.controls.update(); s.invalidate(); drawMini(); }
  const keys = new Set(); let walkRaf = 0, lastT = 0;
  const KEYMAP = {ArrowUp: 'f', KeyW: 'f', ArrowDown: 'b', KeyS: 'b', ArrowLeft: 'l', KeyA: 'l', ArrowRight: 'r', KeyD: 'r'};
  function walkKey(e, down) {
    const k = KEYMAP[e.code]; if (!k) return;
    if (!down) { keys.delete(k); return; }
    if (mode !== 'home' || !eye || !container.isConnected) return;
    if (!container.matches(':hover') && document.activeElement?.closest('#viewer') !== container) return;
    if (e.target.closest?.('input, select, textarea')) return;
    e.preventDefault(); keys.add(k);
    if (!walkRaf) { lastT = performance.now(); walkRaf = requestAnimationFrame(walkLoop); }
  }
  function walkLoop(t) {
    walkRaf = 0; const dt = Math.min(.05, (t - lastT) / 1000); lastT = t;
    if (!keys.size || mode !== 'home' || !eye) return;
    if (keys.has('l') || keys.has('r')) turn((keys.has('l') ? 1 : -1) * 1.5 * dt);
    const f = (keys.has('f') ? 1 : 0) - (keys.has('b') ? 1 : 0); if (f) step(f * 1.5 * dt);
    walkRaf = requestAnimationFrame(walkLoop);
  }
  const onKeyDown = e => walkKey(e, true), onKeyUp = e => walkKey(e, false);
  addEventListener('keydown', onKeyDown); addEventListener('keyup', onKeyUp);
  s.renderer.domElement.addEventListener('wheel', e => { if (mode === 'home' && eye) { e.preventDefault(); step(-Math.sign(e.deltaY) * .45); } }, {passive: false});
  s.controls.addEventListener('change', () => { if (mode === 'home') drawMini(); });
  function miniFit() {
    const r = mini.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2), W = unit.w, H = unit.h;
    if (mini.width !== Math.round(r.width * dpr)) { mini.width = Math.round(r.width * dpr); mini.height = Math.round(r.height * dpr); }
    const k = Math.min((mini.width - 12) / W, (mini.height - 12) / H);
    return {k, ox: (mini.width - W * k) / 2, oy: (mini.height - H * k) / 2};
  }
  function drawMini() {
    if (mini.hidden || !planCv || !unit) return;
    const g = mini.getContext('2d'), {k, ox, oy} = miniFit(), c = unit.cell;
    g.clearRect(0, 0, mini.width, mini.height); g.imageSmoothingEnabled = false; g.drawImage(planCv, ox, oy, unit.w * k, unit.h * k);
    const P = (x, z) => [ox + (x + unit.w * c / 2) / c * k, oy + (z + unit.h * c / 2) / c * k];
    const at = eye ? s.controls.target : s.camera.position, d = lookDir(), [px, py] = P(at.x, at.z), R = Math.max(18, k * 7);
    const a = Math.atan2(d.z, d.x);
    g.fillStyle = 'rgba(59,89,104,.28)'; g.beginPath(); g.moveTo(px, py); g.arc(px, py, R, a - .55, a + .55); g.closePath(); g.fill();
    g.fillStyle = '#3b5968'; g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.arc(px, py, Math.max(4, k * 1.6), 0, 7); g.fill(); g.stroke();
  }
  mini.addEventListener('click', e => {
    if (!unit) return;
    const r = mini.getBoundingClientRect(), dpr = mini.width / r.width, {k, ox, oy} = miniFit(), c = unit.cell;
    const x = ((e.clientX - r.left) * dpr - ox) / k * c - unit.w * c / 2, z = ((e.clientY - r.top) * dpr - oy) / k * c - unit.h * c / 2;
    if (!walkable(x, z)) return;
    if (eye) walkTo(x, z); else { const c = clearSpot(x, z) || [x, z], d = new T.Vector3(-c[0], 0, -c[1]); d.lengthSq() < .01 ? d.set(1, 0, 0) : d.normalize(); eyeAt(c[0], c[1], [d.x, d.z]); }
  });

  // ---- picking: façade apartments in the building view, plates on a floor, rooms in a dwelling
  const ray = new T.Raycaster(), ptr = new T.Vector2();
  const setPtr = e => { const r = s.renderer.domElement.getBoundingClientRect(); ptr.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1); ray.setFromCamera(ptr, s.camera); };
  function pickApartment() {
    const o = ray.ray.origin.clone().sub(buildingG.position), dir = ray.ray.direction, r2 = new T.Ray(o, dir);
    let best = null, p = new T.Vector3();
    for (const a of apartments) { const hit = r2.intersectBox(a.box, p); if (hit) { const dd = hit.distanceTo(o); if (!best || dd < best.d) best = {a, d: dd}; } }
    return best?.a || null;
  }
  function pick(e) {
    setPtr(e);
    if (mode === 'building') return {apartment: pickApartment()};
    const targets = mode === 'floor' ? floorG.children.filter(m => m.userData.apartment) : homeG.children.filter(m => m.userData.room);
    const h = ray.intersectObjects(targets, false)[0]?.object;
    return h ? {apartment: h.userData.apartment, room: h.userData.room} : {};
  }
  let down = null;
  const el = s.renderer.domElement;
  el.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
  el.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch' || e.buttons) return;
    const h = pick(e), a = h.apartment;
    if (mode === 'building' && a !== hoverTarget) {
      disposeGroup(hoverG); hoverTarget = a;
      if (a) showBox(a.box, statusColor(a.code, a.portal) || '#2f6f86', .3);
      s.invalidate();
    }
    if (a && mode !== 'home') ui.tip(tip(a), e); else ui.tip(null);
    el.style.cursor = a || h.room ? 'pointer' : 'grab';
  });
  el.addEventListener('pointerleave', () => { if (mode === 'building') clearHover(); ui.tip(null); });
  el.addEventListener('pointerup', e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    if (mode === 'home' && eye) {
      setPtr(e); const hit = ray.intersectObjects(homeG.children.filter(m => m.userData.room), false)[0];
      if (hit) walkTo(hit.point.x, hit.point.z);
      return;
    }
    const h = pick(e);
    if (h.apartment) { ui.tip(null); selectHome(h.apartment.code, h.apartment.portal); }
    else if (h.room) enterRoom(h.room);
  });
  const onKey = e => {
    if (!container.isConnected || !container.matches(':hover') && document.activeElement?.closest('#viewer') !== container) return;
    const order = Object.keys(building?.levels || {}).sort((a, b) => levelY(a) - levelY(b));
    if (e.key === 'Escape') { if (mode === 'home') goFloor(level); else if (mode === 'floor') goBuilding(); }
    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && mode === 'floor') { const i = order.indexOf(level) + (e.key === 'ArrowUp' ? 1 : -1); if (order[i]) { e.preventDefault(); goFloor(order[i]); } }
  };
  addEventListener('keydown', onKey);

  const ready = init().catch(err => { callbacks.error?.(err); throw err; });
  return {
    ready,
    selectFloor: n => ready.then(() => goFloor(n === 0 ? 'B' : String(n))),
    selectHome: (code, portal = 1) => ready.then(() => selectHome(code, portal)),
    prefetch: code => ready.then(() => new Promise(r => (globalThis.requestIdleCallback || setTimeout)(() => r(prepare(code)), {timeout: 800}))),
    building: () => ready.then(goBuilding),
    renderView(id) {
      const v = RENDER_VIEWS.find(x => x.id === id); if (!v || !ex) return;
      if (mode !== 'building') goBuilding();
      const off = new T.Vector3(-ex.depth / 2, 0, 0);
      if (v.cam) {
        const p = new T.Vector3(...v.cam.pos).add(off), t = p.clone().add(new T.Vector3(...v.cam.fwd).normalize().multiplyScalar(70));
        s.move(p.toArray(), t.toArray(), v.cam.fov); Object.assign(s.controls, {minDistance: 1, maxDistance: 400, maxPolarAngle: Math.PI * .6});
      } else {
        const dir = new T.Vector3(...v.fit.dir).normalize(), e = v.fit.el * Math.PI / 180, dist = 420, ty = v.fit.centerY ?? ex.top * .5;
        const fov = 2 * Math.atan((v.fit.width / Math.max(s.camera.aspect, .5)) / 2 / dist) * 180 / Math.PI;
        const pos = dir.clone().multiplyScalar(Math.cos(e) * dist); pos.y = ty + Math.sin(e) * dist;
        s.move(pos.toArray(), [0, ty, 0], fov); Object.assign(s.controls, {minDistance: 8, maxDistance: 600});
      }
      return v;
    },
    enterRoom: idx => { const r = unitBuilt?.rooms.find(x => x.index === idx); if (r) enterRoom(r); },
    setFurniture(idx, on) { const g = unitBuilt?.furnitureGroups[idx]; if (g) { g.visible = on; s.renderer.shadowMap.needsUpdate = true; s.invalidate(); } },
    setAllFurniture(on) { for (const g of Object.values(unitBuilt?.furnitureGroups || {})) g.visible = on; s.renderer.shadowMap.needsUpdate = true; s.invalidate(); },
    furnitureRooms: () => Object.keys(unitBuilt?.furnitureGroups || {}).map(Number),
    toggleOverlay(on) { if (overlay) { overlay.visible = on ?? !overlay.visible; s.invalidate(); return overlay.visible; } return false; },
    toggleCut(on) { wallsCut = on ?? !wallsCut; applyCut(); return wallsCut; },
    setFinish(slot, option) { if (!fin) { pending.chosen[slot] = option; return; } fin.state.chosen[slot] = option; fin.apply(); s.renderer.shadowMap.needsUpdate = true; s.invalidate(); },
    setConcept(name, option) { if (!fin) { pending.concept[name] = option; return; } fin.state.concept[name] = option; fin.apply(); s.invalidate(); },
    view(v) {
      if (mode === 'home' && unitBuilt) { eye = false; curRoom = null; markRoom(); fitHome(v); }
      else if (mode === 'floor') goFloor(level);
      else if (ex) { if (v === 'top') s.move([0, 150, .1], [0, 0, 0], orbitMode(s, 12, 260)); else overview(); }
    },
    camera(action) {
      if (action === 'reset') return this.view('perspective');
      const delta = s.camera.position.clone().sub(s.controls.target);
      if (action === 'left' || action === 'right') delta.applyAxisAngle(new T.Vector3(0, 1, 0), action === 'left' ? -.35 : .35);
      else delta.multiplyScalar(action === 'in' ? .78 : 1.28);
      s.move(delta.add(s.controls.target).toArray(), s.controls.target.toArray());
    },
    resize: s.resize, dispose: () => { removeEventListener('keydown', onKey); removeEventListener('keydown', onKeyDown); removeEventListener('keyup', onKeyUp); roomBar.remove(); mini.remove(); s.dispose(); },
  };
}


// ------------------------------------------------------------------------------------------------
// public: single-dwelling interior for the personalisation section
export function createInterior(container, {project, unitURL, promotion}) {
  const s = setup(container), mats = materialSet(), fin = finishState(project, mats); fin.apply();
  const g = new T.Group(); s.scene.add(g);
  let built = null, overlay = null;
  const cut = on => { s.renderer.clippingPlanes = on ? [new T.Plane(new T.Vector3(0, -1, 0), 1.25)] : []; s.renderer.shadowMap.needsUpdate = true; s.invalidate(); };
  const ready = getJSON(unitURL).then(u => {
    u.promotion = promotion;
    built = unitMeshes(u, mats, {kitchenTile: fin.state.slots.some(x => x.surface === 'kitchenAll') ? 'all' : 'wall', notes: fin.state.notes});
    g.add(built.group); overlay = planOverlay(u, mats); g.add(overlay);
    cut(true);
    const [w, d] = built.group.userData.size;
    s.fitShadow(new T.Box3().setFromObject(built.group));
    orbitMode(s, .05, 40);
    s.camera.position.set(w * .5, Math.max(w, d) * .95, d * .9); s.controls.target.set(0, 0, 0);
    placeLabels(s, built.rooms.map(r => ({name: r.name, text: `${fmt(r.area)} m²`, pos: [r.labelAt[0], .2, r.labelAt[1]], obj: g})));
    s.renderer.shadowMap.needsUpdate = true; s.invalidate();
    return {unit: u, rooms: built.rooms, fixtures: built.group.userData.fixtures, furnitureRooms: Object.keys(built.furnitureGroups).map(Number)};
  });
  return {
    ready,
    setFinish(slot, option) { fin.state.chosen[slot] = option; fin.apply(); s.renderer.shadowMap.needsUpdate = true; s.invalidate(); },
    setConcept(name, option) { fin.state.concept[name] = option; fin.apply(); s.invalidate(); },
    finishes: fin.state,
    enterRoom: idx => { const r = built?.rooms.find(x => x.index === idx); if (!r) return; cut(false); eyeLevel(s, r); },
    overview() { if (!built) return; cut(true); const [w, d] = built.group.userData.size; s.move([w * .5, Math.max(w, d) * .95, d * .9], [0, 0, 0], orbitMode(s, .05, 40)); },
    setFurniture(idx, on) { const f = built?.furnitureGroups[idx]; if (f) { f.visible = on; s.renderer.shadowMap.needsUpdate = true; s.invalidate(); } },
    setAllFurniture(on) { for (const f of Object.values(built?.furnitureGroups || {})) f.visible = on; s.renderer.shadowMap.needsUpdate = true; s.invalidate(); },
    toggleOverlay(on) { if (overlay) { overlay.visible = on ?? !overlay.visible; s.invalidate(); return overlay.visible; } },
    dispose: s.dispose, resize: s.resize,
  };
}
