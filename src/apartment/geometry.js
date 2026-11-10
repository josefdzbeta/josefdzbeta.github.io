// BufferGeometry assembly. Architecture is written as quads, each with world-scale UVs (metres) for the
// material textures and its own lightmap chart; packCharts() lays the charts out in one atlas (uv1).
import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

export class Mesher {
  constructor() { this.buckets = new Map(); this.charts = []; }
  // one bucket per material and room (each room's surfaces reflect that room)
  bucket(name, room = -1) {
    const key = name + '|' + room;
    if (!this.buckets.has(key)) this.buckets.set(key, {name, roomId: room, p: [], n: [], uv: [], room: [], idx: [], charts: []});
    return this.buckets.get(key);
  }
  // a, b, c, d counter-clockwise seen from the front; uv per corner in metres; lightmap chart unless lm = false
  quad(name, a, b, c, d, n, uv, {room = -1, lm = true} = {}) {
    const B = this.bucket(name, room), o = B.p.length / 3;
    B.p.push(...a, ...b, ...c, ...d); for (let k = 0; k < 4; k++) { B.n.push(...n); B.room.push(room); }
    B.uv.push(...uv); B.idx.push(o, o + 1, o + 2, o, o + 2, o + 3);
    if (lm) {
      const su = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), sv = Math.hypot(d[0] - a[0], d[1] - a[1], d[2] - a[2]);
      const chart = {bucket: B, vertex: o, su, sv, room};
      B.charts.push(chart); this.charts.push(chart);
    }
  }
  // axis-aligned quads by plane: horizontal (y fixed, facing ±y) and vertical (x or z fixed)
  floor(name, x0, x1, z0, z1, y, up = true, opt) {
    if (up) this.quad(name, [x0, y, z1], [x1, y, z1], [x1, y, z0], [x0, y, z0], [0, 1, 0], [x0, -z1, x1, -z1, x1, -z0, x0, -z0], opt);
    else this.quad(name, [x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1], [0, -1, 0], [x0, z0, x1, z0, x1, z1, x0, z1], opt);
  }
  wallZ(name, x0, x1, y0, y1, z, facing, opt) {              // plane z = const, facing ±z
    if (facing > 0) this.quad(name, [x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], [0, 0, 1], [x0, y0, x1, y0, x1, y1, x0, y1], opt);
    else this.quad(name, [x1, y0, z], [x0, y0, z], [x0, y1, z], [x1, y1, z], [0, 0, -1], [-x1, y0, -x0, y0, -x0, y1, -x1, y1], opt);
  }
  wallX(name, z0, z1, y0, y1, x, facing, opt) {              // plane x = const, facing ±x
    if (facing > 0) this.quad(name, [x, y0, z1], [x, y0, z0], [x, y1, z0], [x, y1, z1], [1, 0, 0], [-z1, y0, -z0, y0, -z0, y1, -z1, y1], opt);
    else this.quad(name, [x, y0, z0], [x, y0, z1], [x, y1, z1], [x, y1, z0], [-1, 0, 0], [z0, y0, z1, y0, z1, y1, z0, y1], opt);
  }
  box(name, x0, x1, y0, y1, z0, z1, opt = {}) {
    const {skip = ''} = opt;
    if (!skip.includes('t')) this.floor(name, x0, x1, z0, z1, y1, true, opt);
    if (!skip.includes('b')) this.floor(name, x0, x1, z0, z1, y0, false, opt);
    if (!skip.includes('s')) this.wallZ(name, x0, x1, y0, y1, z1, 1, opt);
    if (!skip.includes('n')) this.wallZ(name, x0, x1, y0, y1, z0, -1, opt);
    if (!skip.includes('e')) this.wallX(name, z0, z1, y0, y1, x1, 1, opt);
    if (!skip.includes('w')) this.wallX(name, z0, z1, y0, y1, x0, -1, opt);
  }
  geometries() {
    const out = [];
    for (const B of this.buckets.values()) {
      if (!B.idx.length) continue;
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(B.p, 3));
      g.setAttribute('normal', new T.Float32BufferAttribute(B.n, 3));
      g.setAttribute('uv', new T.Float32BufferAttribute(B.uv, 2));
      g.setAttribute('room', new T.Float32BufferAttribute(B.room, 1));
      if (B.charts.length) { g.setAttribute('uv1', new T.Float32BufferAttribute(B.uv1, 2)); g.setAttribute('chart', new T.Float32BufferAttribute(B.chartRect, 4)); }
      g.setIndex(B.p.length / 3 > 65535 ? new T.Uint32BufferAttribute(B.idx, 1) : new T.Uint16BufferAttribute(B.idx, 1));
      g.computeBoundingSphere(); g.computeBoundingBox();
      out.push({name: B.name, room: B.roomId, geometry: g});
    }
    return out;
  }
}

// Shelf-packs every chart into a square atlas at `density` texels per metre (halving the density until it fits).
export function packCharts(charts, {density = 24, size = 2048, pad = 2} = {}) {
  for (let d = density; d >= 4; d /= 1.25) {
    const items = charts.map(ch => ({ch, w: Math.max(1, Math.round(ch.su * d)), h: Math.max(1, Math.round(ch.sv * d))}))
      .sort((p, q) => q.h - p.h || q.w - p.w);
    let x = 0, y = 0, row = 0, ok = true;
    for (const it of items) {
      const w = it.w + 2 * pad, h = it.h + 2 * pad;
      if (w > size) { ok = false; break; }
      if (x + w > size) { x = 0; y += row; row = 0; }
      if (y + h > size) { ok = false; break; }
      it.x = x + pad; it.y = y + pad; x += w; row = Math.max(row, h);
    }
    if (!ok) continue;
    for (const B of new Set(charts.map(ch => ch.bucket))) { B.uv1 = new Array(B.p.length / 3 * 2).fill(0); B.chartRect = new Array(B.p.length / 3 * 4).fill(0); }
    for (const {ch, x: px, y: py, w, h} of items) {
      const u0 = px / size, v0 = py / size, u1 = (px + w) / size, v1 = (py + h) / size, o = ch.vertex * 2, a = ch.bucket.uv1;
      a.splice(o, 8, u0, v0, u1, v0, u1, v1, u0, v1);
      ch.px = [px, py, w, h];                                 // texel rectangle, for reading the bake back per room
      for (let k = 0; k < 4; k++) ch.bucket.chartRect.splice((ch.vertex + k) * 4, 4, u0, v0, u1, v1);   // and for blurring inside the chart
    }
    return {density: d, size};
  }
  throw new Error('lightmap atlas overflow');
}

// Furniture helpers: a part is any BufferGeometry placed by a matrix; parts are merged per material.
export class Parts {
  constructor() { this.by = new Map(); }
  // boxUV: texture coordinates in metres projected along each vertex's dominant normal (true-scale fabric, wood…)
  add(mat, geo, m, {boxUV = true, room = -1} = {}) {
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    if (!g.getAttribute('normal')) g.computeVertexNormals();
    const pos = g.getAttribute('position'), nrm = g.getAttribute('normal');
    if (boxUV || !g.getAttribute('uv')) {
      const uv = new Float32Array(pos.count * 2);
      for (let i = 0; i < pos.count; i++) {
        const ax = Math.abs(nrm.getX(i)), ay = Math.abs(nrm.getY(i)), az = Math.abs(nrm.getZ(i));
        const [u, v] = ay >= ax && ay >= az ? [pos.getX(i), pos.getZ(i)] : ax >= az ? [pos.getZ(i), pos.getY(i)] : [pos.getX(i), pos.getY(i)];
        uv[2 * i] = u; uv[2 * i + 1] = v;
      }
      g.setAttribute('uv', new T.BufferAttribute(uv, 2));
    }
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(k)) g.deleteAttribute(k);
    if (!g.getAttribute('color')) g.setAttribute('color', new T.BufferAttribute(new Float32Array(pos.count * 3).fill(1), 3));
    if (m) g.applyMatrix4(m);
    const key = mat + '|' + room;
    (this.by.get(key) || this.by.set(key, []).get(key)).push(g);
    return g;
  }
  meshes(materials, {shadows = true} = {}) {
    const out = [];
    for (const [key, list] of this.by) {
      const [mat, room] = key.split('|'), g = mergeGeometries(list, false); list.forEach(x => x.dispose());
      g.computeBoundingSphere();
      const mesh = new T.Mesh(g, materials[mat]); mesh.name = mat; mesh.userData.room = Number(room);
      mesh.castShadow = shadows && !materials[mat]?.transparent; mesh.receiveShadow = shadows;
      out.push(mesh);
    }
    return out;
  }
}

// placement matrix: position (x, y, z), yaw (radians, turning the local +z front), optional scale
export const place = (x, y, z, yaw = 0, s = [1, 1, 1]) =>
  new T.Matrix4().compose(new T.Vector3(x, y, z), new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), yaw), new T.Vector3(...s));
