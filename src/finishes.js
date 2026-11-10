// Finish catalogue + procedural, physically scaled textures for the interior explorer.
//
// Evidence levels shown to the visitor:
//   'oficial'      a slot of Bamaire's published personalisation programme (count per category is
//                  published; product names/colours are NOT — the texture is an orientative tone)
//   'memoria'      fixed specification stated in the published memoria de calidades
//   'concepto'     an additional idea, not offered by Bamaire's programme
import * as T from 'three';
import {WOOD, KITCHEN_TILE, BATH, CARPENTRY, PAINT, CONCEPTS, programmeSlots, memoriaNotes} from './catalog.js';
export {CONCEPTS, programmeSlots, memoriaNotes};

// --- procedural textures --------------------------------------------------------------------
const defaultCache = new Map();
// one cache per viewer: textures are not shared between WebGL contexts
export const textureCache = () => new Map();
let maxAniso = 4;
export const setAnisotropy = n => { maxAniso = Math.min(8, n || 4); };
const rnd = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const shade = (c, f) => `rgb(${c.map(v => Math.max(0, Math.min(255, Math.round(v * f)))).join(',')})`;

function canvas(n) { const c = document.createElement('canvas'); c.width = c.height = n; return c; }

function normalFrom(heightCanvas, strength = 2) {
  const n = heightCanvas.width, src = heightCanvas.getContext('2d').getImageData(0, 0, n, n).data;
  const out = canvas(n), ctx = out.getContext('2d'), img = ctx.createImageData(n, n), d = img.data;
  const h = (x, y) => src[(((y + n) % n) * n + ((x + n) % n)) * 4] / 255;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const dx = (h(x + 1, y) - h(x - 1, y)) * strength, dy = (h(x, y + 1) - h(x, y - 1)) * strength;
    const len = Math.hypot(dx, dy, 1), i = (y * n + x) * 4;
    d[i] = (-dx / len * .5 + .5) * 255; d[i + 1] = (dy / len * .5 + .5) * 255; d[i + 2] = (1 / len * .5 + .5) * 255; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0); return out;
}

function tex(c, srgb) {
  const t = new T.CanvasTexture(c);
  t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = maxAniso;
  if (srgb) t.colorSpace = T.SRGBColorSpace;
  return t;
}

// Planks: 1,22 m × ~0,18 m (typical SPC/laminate format; exact product format not published).
function woodTex(v, N = 512) {
  const size = 1.22, planks = 7, c = canvas(N), h = canvas(N), x = c.getContext('2d'), y = h.getContext('2d');
  const r = rnd(hashStr(v.base) || 7), base = hex(v.base), grain = hex(v.grain || v.base);
  y.fillStyle = '#808080'; y.fillRect(0, 0, N, N);
  const pw = N / planks;
  for (let p = 0; p < planks; p++) {
    const joint = r() * N, segs = [[-N + joint, joint], [joint, joint + N]];
    for (const [a, b] of segs) {
      const f = 1 + (r() - .5) * 2 * (v.var ?? .05);
      x.fillStyle = shade(base, f); x.fillRect(p * pw, a, pw, b - a);
      // grain: long, slightly wavy strokes
      for (let g = 0; g < 26; g++) {
        const gx = p * pw + r() * pw, w = .4 + r() * 1.4;
        x.strokeStyle = `rgba(${grain.join(',')},${.06 + r() * .16})`; x.lineWidth = w;
        x.beginPath(); x.moveTo(gx, a);
        for (let s = a; s <= b; s += 16) x.lineTo(gx + Math.sin(s * .02 + g) * 1.6 + (r() - .5), s);
        x.stroke();
        y.strokeStyle = `rgba(150,150,150,${.15 + r() * .2})`; y.lineWidth = w; y.stroke();
      }
      if (r() < .25) { // occasional knot
        const kx = p * pw + pw * (.2 + r() * .6), ky = a + (b - a) * r();
        x.fillStyle = `rgba(${grain.join(',')},.35)`; x.beginPath(); x.ellipse(kx, ky, 2 + r() * 3, 5 + r() * 6, 0, 0, 7); x.fill();
      }
      x.fillStyle = 'rgba(40,28,18,.55)'; x.fillRect(p * pw, a - 1, pw, 2);
      y.fillStyle = '#303030'; y.fillRect(p * pw, a - 1, pw, 2);
    }
    x.fillStyle = 'rgba(40,28,18,.5)'; x.fillRect(p * pw - 1, 0, 1.5, N);
    y.fillStyle = '#303030'; y.fillRect(p * pw - 1, 0, 1.5, N);
  }
  return {map: tex(c, true), normalMap: tex(normalFrom(h, 1.6)), size: [size, size], roughness: .55};
}

function tileTex(v, N = 512) {
  const [tw, th] = v.tile, nx = Math.max(1, Math.round(1.2 / tw)), ny = Math.max(1, Math.round(1.2 / th));
  const size = [nx * tw, ny * th], c = canvas(N), h = canvas(N), x = c.getContext('2d'), y = h.getContext('2d');
  const r = rnd(hashStr(v.base + v.tone) || 11), base = hex(v.base), groutPx = Math.max(1.5, .003 / size[0] * N);
  x.fillStyle = v.grout; x.fillRect(0, 0, N, N); y.fillStyle = '#404040'; y.fillRect(0, 0, N, N);
  const cw = N / nx, ch = N / ny;
  for (let j = 0; j < ny; j++) for (let i = -1; i <= nx; i++) {
    const ox = v.pattern === 'brick' && j % 2 ? cw / 2 : 0, x0 = i * cw + ox, y0 = j * ch;
    x.fillStyle = shade(base, 1 + (r() - .5) * .05); x.fillRect(x0 + groutPx / 2, y0 + groutPx / 2, cw - groutPx, ch - groutPx);
    y.fillStyle = '#b0b0b0'; y.fillRect(x0 + groutPx / 2, y0 + groutPx / 2, cw - groutPx, ch - groutPx);
    if (v.speck) for (let s = 0; s < 260 * v.speck; s++) {
      x.fillStyle = `rgba(${r() < .5 ? '255,255,255' : '0,0,0'},${.04 + r() * .06})`;
      x.fillRect(x0 + r() * cw, y0 + r() * ch, 1 + r() * 2, 1 + r() * 2);
    }
    if (v.vein) {
      x.save(); x.beginPath(); x.rect(x0, y0, cw, ch); x.clip();
      for (let k = 0; k < 3; k++) {
        x.strokeStyle = v.vein + '55'; x.lineWidth = .6 + r() * 1.6; x.beginPath();
        let px = x0 + r() * cw, py = y0; x.moveTo(px, py);
        while (py < y0 + ch) { px += (r() - .5) * 18; py += 8 + r() * 10; x.lineTo(px, py); }
        x.stroke();
      }
      x.restore();
    }
  }
  return {map: tex(c, true), normalMap: tex(normalFrom(h, 2.4)), size, roughness: v.gloss ?? .4};
}

function stoneTex(v, N = 512) {
  const c = canvas(N), x = c.getContext('2d'), r = rnd(hashStr(v.base) || 5);
  x.fillStyle = v.base; x.fillRect(0, 0, N, N);
  for (let s = 0; s < 9000 * (v.speck || .3); s++) {
    x.fillStyle = `rgba(${r() < .5 ? '255,255,255' : '0,0,0'},${.05 + r() * .08})`; x.fillRect(r() * N, r() * N, 1 + r() * 1.5, 1 + r() * 1.5);
  }
  return {map: tex(c, true), size: [.8, .8], roughness: v.gloss ?? .3};
}

function hashStr(s) { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 2147483647; return h; }

export function surfaceTexture(kind, v, cache = defaultCache) {
  const key = kind + JSON.stringify(v);
  if (!cache.has(key)) {
    const small = matchMedia('(max-width: 700px)').matches ? 256 : 512;
    const t = kind === 'wood' ? woodTex(v, small) : kind === 'tile' ? tileTex(v, small) : stoneTex(v, small);
    // geometry carries UVs in metres, so one texture repeat = its physical size
    for (const m of [t.map, t.normalMap]) m?.repeat.set(1 / t.size[0], 1 / t.size[1]);
    cache.set(key, t);
  }
  return cache.get(key);
}

// Apply a variant to a MeshStandardMaterial in place (no shader recompile: maps keep the same slots).
export function applyVariant(mat, kind, v, cache = defaultCache) {
  if (kind === 'floorWood') kind = 'wood';
  if (kind === 'paint') { mat.map = null; mat.normalMap = null; mat.color.set(v.base); mat.roughness = .9; mat.metalness = 0; }
  else if (kind === 'metal') { mat.map = null; mat.normalMap = null; mat.color.set(v.metal); mat.metalness = 1; mat.roughness = v.rough; }
  else if (kind === 'carpentry' && v.lacquer) { mat.map = null; mat.normalMap = null; mat.color.set(v.base); mat.roughness = .35; mat.metalness = 0; }
  else {
    const t = surfaceTexture(kind === 'carpentry' ? 'wood' : kind, kind === 'carpentry' ? {...v, var: .02} : v, cache);
    mat.map = t.map; mat.normalMap = t.normalMap || null; mat.color.set('#ffffff'); mat.roughness = t.roughness; mat.metalness = 0;
    mat.userData.texSize = t.size;
  }
  mat.needsUpdate = true;
}
