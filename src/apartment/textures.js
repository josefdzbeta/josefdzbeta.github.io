// Procedural surfaces at physical scale, drawn on canvases: albedo (sRGB), normal and roughness maps.
// Each generator returns {map, normalMap, roughnessMap, size} where size is the metres one tile covers.
import * as T from 'three';

const rng = seed => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const canvas = (w, h = w) => Object.assign(document.createElement('canvas'), {width: w, height: h});
const hsl = (h, s, l, a = 1) => `hsla(${h},${s}%,${l}%,${a})`;

// tileable value noise (bilinear on a wrapped lattice), several octaves, 0..1
export function noise(w, h, {cells = 8, octaves = 4, gain = .5, seed = 7} = {}) {
  const out = new Float32Array(w * h), r = rng(seed);
  let amp = 1, sum = 0;
  for (let o = 0, n = cells; o < octaves; o++, n *= 2, amp *= gain) {
    const nx = n, ny = Math.max(1, Math.round(n * h / w)), lat = Float32Array.from({length: nx * ny}, r);
    for (let y = 0; y < h; y++) {
      const fy = y / h * ny, y0 = Math.floor(fy), ty = fy - y0, sy = ty * ty * (3 - 2 * ty), r0 = (y0 % ny) * nx, r1 = ((y0 + 1) % ny) * nx;
      for (let x = 0; x < w; x++) {
        const fx = x / w * nx, x0 = Math.floor(fx), tx = fx - x0, sx = tx * tx * (3 - 2 * tx), a = x0 % nx, b = (x0 + 1) % nx;
        const top = lat[r0 + a] + (lat[r0 + b] - lat[r0 + a]) * sx, bot = lat[r1 + a] + (lat[r1 + b] - lat[r1 + a]) * sx;
        out[y * w + x] += amp * (top + (bot - top) * sy);
      }
    }
    sum += amp;
  }
  for (let k = 0; k < out.length; k++) out[k] /= sum;
  return out;
}

// height (0..1 floats) → tangent-space normal map canvas, wrapping at the edges
function normalFrom(height, w, h, strength) {
  const c = canvas(w, h), ctx = c.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const H = (i, j) => height[((j + h) % h) * w + ((i + w) % w)];
    const dx = (H(x + 1, y) - H(x - 1, y)) * strength, dy = (H(x, y + 1) - H(x, y - 1)) * strength;
    const l = Math.hypot(dx, dy, 1), k = (y * w + x) * 4;
    d[k] = (-dx / l * .5 + .5) * 255; d[k + 1] = (dy / l * .5 + .5) * 255; d[k + 2] = (1 / l * .5 + .5) * 255; d[k + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}
const grayCanvas = (vals, w, h, f = v => v) => {
  const c = canvas(w, h), ctx = c.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
  for (let k = 0; k < vals.length; k++) { const v = Math.max(0, Math.min(255, f(vals[k]) * 255)); d[4 * k] = d[4 * k + 1] = d[4 * k + 2] = v; d[4 * k + 3] = 255; }
  ctx.putImageData(img, 0, 0);
  return c;
};
const readGray = c => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, out = new Float32Array(c.width * c.height); for (let k = 0; k < out.length; k++) out[k] = d[4 * k] / 255; return out; };

function pack({albedo, height, rough, size, strength = 2, aniso = 8}) {
  const tex = (c, srgb) => { const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = aniso; if (srgb) t.colorSpace = T.SRGBColorSpace; t.repeat.set(1 / size, 1 / size); return t; };
  const out = {size, map: tex(albedo, true)};
  if (height) out.normalMap = tex(normalFrom(readGray(height), height.width, height.height, strength), false);
  if (rough) out.roughnessMap = tex(rough, false);
  return out;
}

// ---- SPC vinyl plank (oak print, synchronised embossing): 1220 × 203 mm, light grey-washed oak --------------
export function oakPlanks({px = 2048, metres = 2.44, seed = 11, tone = [34, 16, 80]} = {}) {
  const r = rng(seed), s = px / metres, A = canvas(px), Hc = canvas(px), R = canvas(px);
  const a = A.getContext('2d'), h = Hc.getContext('2d'), q = R.getContext('2d');
  const pw = 1.22 * s, ph = .2033 * s, rows = Math.round(px / ph);
  h.fillStyle = '#808080'; h.fillRect(0, 0, px, px); q.fillStyle = '#7a7a7a'; q.fillRect(0, 0, px, px);
  for (let row = 0; row < rows; row++) {
    const y0 = row * ph, off = r() * pw;
    for (let x0 = -pw + off; x0 < px; x0 += pw) {
      const L = tone[2] + (r() - .5) * 7, S = tone[1] + (r() - .5) * 5, Hh = tone[0] + (r() - .5) * 6;
      for (const dx of [0, px, -px]) {                         // wrap horizontally
        const X0 = x0 + dx; if (X0 > px || X0 + pw < 0) continue;
        a.save(); a.beginPath(); a.rect(X0, y0, pw, ph); a.clip();
        a.fillStyle = hsl(Hh, S, L); a.fillRect(X0, y0, pw, ph);
        h.save(); h.beginPath(); h.rect(X0, y0, pw, ph); h.clip();
        const gs = rng(Math.floor(r() * 1e9));
        // growth rings: long wavy strokes, darker lines are slightly raised (embossed in register)
        for (let k = 0; k < 70; k++) {
          const yy = y0 + gs() * ph, amp = 1 + gs() * 6, wl = 80 + gs() * 400, ph0 = gs() * 6.28, dark = gs() < .55;
          a.strokeStyle = hsl(Hh - 4, S + 6, L + (dark ? -10 - gs() * 10 : 6), .05 + gs() * .1); a.lineWidth = .6 + gs() * 2.2;
          h.strokeStyle = dark ? 'rgba(150,150,150,.25)' : 'rgba(110,110,110,.15)'; h.lineWidth = a.lineWidth;
          for (const ctx of [a, h]) { ctx.beginPath(); for (let x = X0; x <= X0 + pw; x += 12) ctx.lineTo(x, yy + Math.sin(x / wl + ph0) * amp + Math.sin(x / 37 + ph0) * .6); ctx.stroke(); }
        }
        // cathedral figure on some planks
        if (gs() < .5) for (let k = 0; k < 7; k++) {
          const cx = X0 + pw * (.25 + gs() * .5), cy = y0 + ph * (.3 + gs() * .4), rx = pw * (.12 + k * .035), ry = ph * (.12 + k * .05);
          a.strokeStyle = hsl(Hh - 6, S + 8, L - 14, .07); a.lineWidth = 1.2;
          a.beginPath(); a.ellipse(cx, cy, rx, ry, 0, Math.PI * .55, Math.PI * 1.45); a.stroke();
        }
        // pores
        for (let k = 0; k < 900; k++) { a.fillStyle = hsl(Hh, S, L - 22, .12); a.fillRect(X0 + gs() * pw, y0 + gs() * ph, 2 + gs() * 7, .8); }
        a.restore(); h.restore();
        // micro-bevel joints
        a.fillStyle = hsl(Hh, S, L - 18, .55); a.fillRect(X0 - 1, y0, 2.2, ph); a.fillRect(X0, y0 - 1, pw, 2.2);
        h.fillStyle = '#202020'; h.fillRect(X0 - 1.5, y0, 3, ph); h.fillRect(X0, y0 - 1.5, pw, 3);
        q.fillStyle = `rgb(${110 + r() * 40},${110 + r() * 40},${110 + r() * 40})`; q.fillRect(X0 + 2, y0 + 2, pw - 4, ph - 4);
      }
    }
  }
  return pack({albedo: A, height: Hc, rough: R, size: metres, strength: 2.5, aniso: 16});
}

// ---- porcelain / ceramic tiles and stone pavers ----------------------------------------------------------
export function tiles({px = 1024, tw = .6, th = .6, per = 2, color = [0, 0, 92], vary = 2, grout = '#c9c6c0', joint = .003,
  bond = 'stack', speckle = 0, cloud = .04, rough = .3, roughVar = .08, seed = 3} = {}) {
  const r = rng(seed), metres = Math.max(tw, th) * per, s = px / metres, A = canvas(px), Hc = canvas(px), R = canvas(px);
  const a = A.getContext('2d'), h = Hc.getContext('2d'), q = R.getContext('2d');
  a.fillStyle = grout; a.fillRect(0, 0, px, px); h.fillStyle = '#303030'; h.fillRect(0, 0, px, px); q.fillStyle = '#d0d0d0'; q.fillRect(0, 0, px, px);
  const n = noise(256, 256, {cells: 6, octaves: 5, seed}), nc = grayCanvas(n, 256, 256);
  const jw = Math.max(1.5, joint * s), cols = Math.round(metres / tw), rows = Math.round(metres / th);
  for (let row = 0; row < rows; row++) for (let col = -1; col <= cols; col++) {
    const x0 = (col + (bond === 'running' && row % 2 ? .5 : 0)) * tw * s, y0 = row * th * s, w = tw * s, hh = th * s;
    const [H0, S0, L0] = color, L = L0 + (r() - .5) * vary * 2;
    a.save(); a.beginPath(); a.rect(x0 + jw / 2, y0 + jw / 2, w - jw, hh - jw); a.clip();
    a.fillStyle = hsl(H0 + (r() - .5) * 4, S0, L); a.fillRect(x0, y0, w, hh);
    a.globalAlpha = cloud; a.globalCompositeOperation = 'multiply'; a.drawImage(nc, x0 - r() * w, y0 - r() * hh, w * 2.2, hh * 2.2);
    a.globalCompositeOperation = 'source-over'; a.globalAlpha = 1;
    for (let k = 0; k < speckle * w * hh / 100; k++) { a.fillStyle = hsl(H0, S0, L + (r() < .5 ? -18 : 10), .35); a.fillRect(x0 + r() * w, y0 + r() * hh, 1 + r() * 1.5, 1 + r() * 1.5); }
    a.restore();
    h.fillStyle = '#c8c8c8'; h.fillRect(x0 + jw / 2, y0 + jw / 2, w - jw, hh - jw);
    if (speckle) { h.globalAlpha = .25; h.drawImage(nc, x0, y0, w, hh); h.globalAlpha = 1; }
    const rv = (rough + (r() - .5) * roughVar) * 255; q.fillStyle = `rgb(${rv},${rv},${rv})`; q.fillRect(x0 + jw / 2, y0 + jw / 2, w - jw, hh - jw);
  }
  return pack({albedo: A, height: Hc, rough: R, size: metres, strength: 1.2});
}

// ---- smooth plastic paint: an orange-peel normal and a little sheen variation -----------------------------
export function plaster({px = 512, metres = 1.2, seed = 5} = {}) {
  const n = noise(px, px, {cells: 32, octaves: 4, gain: .55, seed}), A = canvas(8);
  A.getContext('2d').fillStyle = '#fff'; A.getContext('2d').fillRect(0, 0, 8, 8);
  const R = grayCanvas(n, px, px, v => .82 + (v - .5) * .12);
  return pack({albedo: A, height: grayCanvas(n, px, px), rough: R, size: metres, strength: .35});
}

// ---- woven fabrics -----------------------------------------------------------------------------------------
export function weave({px = 512, metres = .2, threads = 90, slub = .35, seed = 9, color = [36, 10, 80], basket = false} = {}) {
  const r = rng(seed), n = noise(px, px, {cells: 16, octaves: 3, seed}), slubs = noise(px, px, {cells: 64, octaves: 2, seed: seed + 1});
  const hgt = new Float32Array(px * px), A = canvas(px), a = A.getContext('2d'), img = a.createImageData(px, px), d = img.data;
  const f = threads / px * Math.PI;
  for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) {
    const k = y * px + x, wx = Math.sin(x * f), wy = Math.sin(y * f);
    let v = basket ? (Math.floor(x / (px / threads * 2)) + Math.floor(y / (px / threads * 2))) % 2 ? Math.abs(wy) : Math.abs(wx)
      : (Math.floor(x / (px / threads)) + Math.floor(y / (px / threads))) % 2 ? Math.abs(wx) : Math.abs(wy);      // plain weave
    v = v * .7 + slubs[k] * slub + n[k] * .15;
    hgt[k] = v;
    const L = color[2] + (v - .6) * 4 + (n[k] - .5) * 3;
    const c = new T.Color().setHSL(color[0] / 360, color[1] / 100, Math.max(0, Math.min(1, L / 100)));
    d[4 * k] = c.r * 255; d[4 * k + 1] = c.g * 255; d[4 * k + 2] = c.b * 255; d[4 * k + 3] = 255;
  }
  a.putImageData(img, 0, 0);
  return pack({albedo: A, height: grayCanvas(hgt, px, px), size: metres, strength: 3, aniso: 4});
}

// ---- solid wood (teak terrace furniture, oak furniture) ----------------------------------------------------
export function woodGrain({px = 1024, metres = 1, seed = 21, tone = [28, 45, 45], contrast = 12} = {}) {
  const r = rng(seed), A = canvas(px), Hc = canvas(px), a = A.getContext('2d'), h = Hc.getContext('2d');
  a.fillStyle = hsl(...tone); a.fillRect(0, 0, px, px); h.fillStyle = '#808080'; h.fillRect(0, 0, px, px);
  for (let k = 0; k < 420; k++) {
    const y = r() * px, amp = 2 + r() * 10, wl = 60 + r() * 300, p0 = r() * 6.28, dark = r() < .6;
    a.strokeStyle = hsl(tone[0] - 3, tone[1] + 5, tone[2] + (dark ? -contrast * r() : contrast * .5 * r()), .12 + r() * .15); a.lineWidth = .5 + r() * 2.5;
    h.strokeStyle = dark ? 'rgba(90,90,90,.25)' : 'rgba(170,170,170,.2)'; h.lineWidth = a.lineWidth;
    for (const ctx of [a, h]) { ctx.beginPath(); for (let x = -10; x <= px + 10; x += 10) ctx.lineTo(x, y + Math.sin(x / wl + p0) * amp); ctx.stroke(); }
  }
  return pack({albedo: A, height: Hc, size: metres, strength: 1.2});
}

// ---- natural stone (sills, thresholds, copings) ------------------------------------------------------------
export function stone({px = 512, metres = .8, seed = 31, color = [40, 8, 86], speckle = .6} = {}) {
  const n = noise(px, px, {cells: 8, octaves: 6, gain: .6, seed}), A = canvas(px), a = A.getContext('2d'), img = a.createImageData(px, px), d = img.data, r = rng(seed);
  for (let k = 0; k < n.length; k++) {
    const L = color[2] + (n[k] - .5) * 10 + (r() < speckle * .02 ? -25 : 0);
    const c = new T.Color().setHSL(color[0] / 360, color[1] / 100, L / 100);
    d[4 * k] = c.r * 255; d[4 * k + 1] = c.g * 255; d[4 * k + 2] = c.b * 255; d[4 * k + 3] = 255;
  }
  a.putImageData(img, 0, 0);
  return pack({albedo: A, height: grayCanvas(n, px, px), size: metres, strength: .6});
}
