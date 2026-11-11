// The plot and its surroundings. The plot follows exterior.json's site (measured on the renders and the basement
// plan): raised paving, courtyard pool and solarium, the garage ramp at the Portal 1 end, the slatted plot fences
// and the walls between the ground-floor patios (traced rails). Around it, OpenStreetMap (ODbL), reflected
// north–south to match Bamaire's plans: the ground by land use (a 20 cm raster), neighbouring buildings with their
// heights, trees and shrubs, and street lamps along Calle María de Molina.
import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {Mesher, Parts, place} from '../apartment/geometry.js';
import {subtract} from './facade.js';

const rng = seed => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
export const STREET = -.31;                                                // street level (the plot is raised to +0,7)

export function buildPlot(ex, building) {
  const M = new Mesher(), parts = new Parts(), half = ex.length / 2, st = ex.site || {};
  const [zN, zP] = st.plotZ || [-half - 2, half + 7.5], px = st.patioX?.[1] ?? ex.depth + 6.5, cx = st.courtyardX ?? -8, cp = st.courtyardPatio ?? 0, top = .7, D = ex.depth;
  const pool = st.pool, sol = st.solarium, ramp = st.ramp, coping = .4;
  // a box whose visible faces are lightmapped quads (top, and the sides that are not against the ground)
  const slab = (mat, x0, x1, y0, y1, z0, z1, sides = true) => {
    M.floor(mat, x0, x1, z0, z1, y1, true);
    if (!sides) return;
    M.wallZ(mat, x0, x1, y0, y1, z1, 1); M.wallZ(mat, x0, x1, y0, y1, z0, -1); M.wallX(mat, z0, z1, y0, y1, x1, 1); M.wallX(mat, z0, z1, y0, y1, x0, -1);
  };
  const box = (mat, x0, x1, y0, y1, z0, z1) => parts.add(mat, new T.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), place((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2));
  // raised paving: courtyard (minus pool and solarium), street-side patios, end strips, deck over the ramp tunnel
  const poolOut = [pool.x[0] - coping, pool.x[1] + coping, pool.z[0] - coping, pool.z[1] + coping];
  for (const r of subtract([cx, 0, zN, half], [poolOut, [sol.x[0], sol.x[1], sol.z[0], sol.z[1]]])) slab('paving', r[0], r[1], STREET, top, r[2], r[3], false);
  slab('paving', D, px, STREET, top, -half, half, false); slab('paving', cx, px, STREET, top, zN, -half, false); slab('paving', cx, px, STREET, top, half, ramp.z[0] - .2, false);
  slab('paving', cx, ramp.x[0], STREET, top, ramp.z[0] - .2, zP, false); slab('paving', ramp.x[0], px, STREET, top, ramp.z[1], zP, false);
  // pool: coping, tiled basin, water; solarium of artificial grass with loungers; glass fence
  for (const r of subtract(poolOut, [[pool.x[0], pool.x[1], pool.z[0], pool.z[1]]])) slab('coping', r[0], r[1], top, top + .04, r[2], r[3]);
  M.floor('poolTile', pool.x[0], pool.x[1], pool.z[0], pool.z[1], top - 1.4, true);
  M.wallZ('poolTile', pool.x[0], pool.x[1], top - 1.4, top, pool.z[0], 1); M.wallZ('poolTile', pool.x[0], pool.x[1], top - 1.4, top, pool.z[1], -1);
  M.wallX('poolTile', pool.z[0], pool.z[1], top - 1.4, top, pool.x[0], 1); M.wallX('poolTile', pool.z[0], pool.z[1], top - 1.4, top, pool.x[1], -1);
  const water = new T.Mesh(new T.PlaneGeometry(pool.x[1] - pool.x[0], pool.z[1] - pool.z[0]).rotateX(-Math.PI / 2), null);
  water.position.set((pool.x[0] + pool.x[1]) / 2, top - .12, (pool.z[0] + pool.z[1]) / 2); water.name = 'water';
  slab('grass', sol.x[0], sol.x[1], top, top + .03, sol.z[0], sol.z[1], false);
  // loungers along the solarium, two rows (render 02 and giro-7)
  for (let k = 0; k < Math.floor((sol.z[1] - sol.z[0] - 1) / 1.3) * 2; k++) {
    const z = sol.z[0] + .8 + (k >> 1) * 1.3, ox = k & 1 ? sol.x[1] - sol.x[0] - 3.2 : 0;
    const x0 = sol.x[0] + .6 + ox;
    box('lounger', x0, x0 + 1.9, top + .3, top + .38, z, z + .7); box('lounger', x0, x0 + .6, top + .38, top + .7, z, z + .7);
    for (const lx of [x0 + .1, x0 + 1.8]) box('alu', lx - .02, lx + .02, top + .03, top + .3, z + .05, z + .65);
  }
  // glass pool fences with slim steel posts across both ends of the pool and its walk (render 02)
  for (const fz of [sol.z[0] - .05, poolOut[2] - .45]) {
    const fx0 = poolOut[0], fx1 = -cp, n = Math.max(1, Math.round((fx1 - fx0) / 1.1));
    box('glassFence', fx0, fx1, top + .04, top + 1.1, fz, fz + .02);
    for (let k = 0; k <= n; k++) { const x = fx0 + (fx1 - fx0) * k / n; box('alu', x - .025, x + .025, top, top + 1.12, fz - .015, fz + .035); }
  }
  // two topiary standards in pots at the back of the solarium (render 02)
  for (const tx of [sol.x[0] + .7, (sol.x[0] + sol.x[1]) / 2 + .4]) {
    const tz = sol.z[1] - .7;
    box('pot', tx - .28, tx + .28, top + .03, top + .58, tz - .28, tz + .28);
    parts.add('trunk', new T.CylinderGeometry(.035, .045, 1.3, 6), place(tx, top + 1.2, tz));
    parts.add('cypress', new T.IcosahedronGeometry(.6, 2).scale(1, .9, 1), place(tx, top + 2.25, tz));
  }
  // garage ramp from Calle María de Molina down under the courtyard deck
  // the ramp runs between tall plain white walls (render 01): towards the end patio and along the pedestrian street
  const [rz0, rz1] = ramp.z, yB = ramp.depth, RW = 2.3;
  const rq = (a, b, c, d, n) => M.quad('ramp', a, b, c, d, n, [a[0], a[2], b[0], b[2], c[0], c[2], d[0], d[2]]);
  rq([ramp.top, STREET, rz1], [ramp.x[1], STREET, rz1], [ramp.x[1], STREET, rz0], [ramp.top, STREET, rz0], [0, 1, 0]);
  rq([ramp.bottom, yB, rz1], [ramp.top, STREET, rz1], [ramp.top, STREET, rz0], [ramp.bottom, yB, rz0], [.12, .99, 0]);
  rq([cx, yB, rz1], [ramp.bottom, yB, rz1], [ramp.bottom, yB, rz0], [cx, yB, rz0], [0, 1, 0]);
  for (const [z, n] of [[rz0, 1], [rz1, -1]]) {
    const prof = [[ramp.x[1], STREET], [ramp.top, STREET], [ramp.bottom, yB], [ramp.x[0] - .2, yB]];
    for (let k = 0; k < prof.length - 1; k++) {
      const [xa, ya] = prof[k], [xb, yb] = prof[k + 1];
      if (n > 0) M.quad('wallWhite', [xb, yb, z], [xa, ya, z], [xa, RW, z], [xb, RW, z], [0, 0, 1], [xb, yb, xa, ya, xa, RW, xb, RW]);
      else M.quad('wallWhite', [xa, ya, z], [xb, yb, z], [xb, RW, z], [xa, RW, z], [0, 0, -1], [xa, ya, xb, yb, xb, RW, xa, RW]);
    }
  }
  M.quad('dark', [ramp.x[0], yB, rz1], [ramp.x[0], yB, rz0], [ramp.x[0], top - .3, rz0], [ramp.x[0], top - .3, rz1], [1, 0, 0], [0, 0, 1, 0, 1, 1, 0, 1], {lm: false});
  // plot fences: low white base and tall grey aluminium slats between white posts (render 03); a white wall with a
  // grey sectional door closes the garage ramp
  const fences = [[ramp.x[0], px + .15, rz0, rz1]], BASE = .2, TOPF = 2.3;
  const fence = (x0, x1, z0, z1) => {
    fences.push([x0, x1, z0, z1]);
    slab('wallWhite', x0, x1, STREET, BASE, z0, z1);
    const along = x1 - x0 > z1 - z0, len = along ? x1 - x0 : z1 - z0, n = Math.floor(len / .12);
    const bar = new T.BoxGeometry(along ? .05 : .07, TOPF - BASE - .02, along ? .07 : .05);
    for (let k = 0; k < n; k++) { const t = (k + .5) / n; if ((k % 40) < 1) continue; parts.add('slats', bar, place(along ? x0 + t * len : (x0 + x1) / 2, (BASE + TOPF) / 2, along ? (z0 + z1) / 2 : z0 + t * len)); }
    for (let k = 0; k <= Math.floor(n / 40); k++) {                                          // white posts every ≈ 4,8 m
      const t = Math.min(1, k * 40 / n), cx0 = along ? x0 + t * len : (x0 + x1) / 2, cz0 = along ? (z0 + z1) / 2 : z0 + t * len;
      slab('wallWhite', cx0 - .12, cx0 + .12, BASE, TOPF, cz0 - .12, cz0 + .12);
    }
  };
  slab('wallWhite', px - .15, px + .15, STREET, TOPF, rz0 - 1.2, rz0); slab('wallWhite', px - .15, px + .15, STREET, TOPF, rz1, rz1 + 1.2);
  slab('wallWhite', px - .15, px + .15, 2.25, TOPF, rz0, rz1);
  for (let k = 0; k < 6; k++) box('garageDoor', px - .05, px + .05, STREET + k * .425 + .01, STREET + (k + 1) * .425 - .01, rz0, rz1);
  // courtyard patios behind a white wall topped by dark lattice screens between posts (render 02, giro-8)
  if (cp > 0) {
    const wx = -cp, lat = new T.PlaneGeometry(3.2, .82).rotateY(Math.PI / 2);         // real size: texture in metres
    slab('wallWhite', wx - .1, wx + .1, top, 1.75, -half, half);
    for (let z = -half; z < half - .1; z += 3.45) {
      slab('wallWhite', wx - .12, wx + .12, 1.75, 2.6, z, z + .2);
      parts.add('lattice', lat, new T.Matrix4().makeTranslation(wx, 2.17, z + 1.82), {boxUV: true});
    }
    slab('wallWhite', wx - .12, wx + .12, 1.75, 2.6, half - .2, half);
    fences.push([wx - .1, wx + .1, -half, half]);
  }
  slab('wallWhite', ramp.x[0], px - .15, top, RW, rz0 - .2, rz0);
  slab('wallWhite', ramp.x[0], px + .15, STREET, RW, rz1, zP + .15); fences.push([ramp.x[0], px, rz1, zP + .15]);
  fence(px - .15, px + .15, zN, rz0 - 1.2); fence(px - .15, px + .15, rz1 + 1.2, zP); fence(cx - .15, cx + .15, zN, zP); fence(cx, ramp.x[0], zP - .15, zP + .15); fence(cx, px, zN - .15, zN + .15);
  // walls between the ground-floor patios: the traced rails that run out from the façades (Portal 2 mirrored)
  const dividers = [], courtDividers = [];
  for (const pu of building?.levels?.B?.units || []) {
    const c = pu.cell || building.cell;
    for (const [x0, y0, x1, y1] of pu.rail || []) {
      if (y0 !== y1) continue;
      let X0 = pu.x + Math.min(x0, x1) * c, X1 = pu.x + Math.max(x0, x1) * c, Z0 = pu.y + y0 * c;
      if (X1 > D) X0 = Math.max(X0, D); else if (X0 < 0) { X1 = Math.min(X1, 0); X0 = Math.min(X0, -cp); } else continue;
      if (X1 - X0 < 1) continue;
      for (const m of [1, -1]) { const r = [X0, X1, m * Z0 - .1, m * Z0 + .1]; slab('wallWhite', r[0], r[1], top, 1.75, r[2], r[3]); fences.push(r); if (X0 >= D) dividers.push(m * Z0); else courtDividers.push(m * Z0); }
    }
  }
  // trees along the street and in the courtyard, as in the renders
  const trees = [];
  for (let z = zN + 4; z < zP; z += 9) trees.push([px + 2, z, STREET, 1]);
  for (let z = -half + 20; z < half; z += 12) trees.push([cx - 3, z, STREET, 1]);
  const inside = (x, z) => x > cx && x < px && z > zN && z < zP;
  // the street-side patios between their dividing walls (for furniture and lights)
  const cuts = [...new Set([zN + .2, ...dividers.sort((a, b) => a - b), ramp.z[0] - .2])].sort((a, b) => a - b), patios = [];
  for (let k = 0; k < cuts.length - 1; k++) if (cuts[k + 1] - cuts[k] > 2.6) patios.push({x: [D, px - .15], z: [cuts[k] + .1, cuts[k + 1] - .1], y: top, facade: D, out: 1});
  if (cp > 0) {
    const cc = [...new Set([-half, ...courtDividers.filter(z => Math.abs(z) < half).sort((a, b) => a - b), half])].sort((a, b) => a - b);
    for (let k = 0; k < cc.length - 1; k++) if (cc[k + 1] - cc[k] > 2.6) patios.push({x: [-cp + .1, 0], z: [cc[k] + .1, cc[k + 1] - .1], y: top, facade: 0, out: -1});
  }
  return {mesher: M, parts, water, trees, fences, inside, patios, lamps: Array.from({length: Math.floor((zP - zN + 20) / 24)}, (_, k) => [px + 2.6, zN - 8 + k * 24])};
}

// ---- the ground: land-use classes of the OpenStreetMap raster, each with its colour, roughness and detail
export const CLASS_COLOR = ['#667f43', '#5e8840', '#9a8366', '#5d5f60', '#b9b3aa', '#cfaaa2', '#9b5a4e', '#b8a585', '#e8e6df', '#b9b3aa'];
// each class's tone against its land-use swatch, in linear light: turf deeper and more saturated (render 03's lawns);
// asphalt and paving darker (the renders' streets read mid-grey to dark, a little wet)
const TURF = [.58, .89, .27], PAVED = [.62, .61, .6];
export const CLASS_TINT = [TURF, TURF, [1, 1, 1], [.62, .6, .57], PAVED, [.62, .59, .58], [1, 1, 1], [1, 1, 1], [1, 1, 1], PAVED];
const CLASS_ROUGH = [1, .95, 1, .9, .85, .8, .85, .95, .7, .85];
export function groundMaterial(classTex, extent, hook) {
  const detail = noiseTexture();
  const mat = new T.MeshStandardMaterial({color: '#ffffff', roughness: 1, map: detail});
  mat.onBeforeCompile = sh => {
    sh.uniforms.classMap = {value: classTex}; sh.uniforms.extent = {value: new T.Vector4(...extent)};
    sh.uniforms.classColor = {value: CLASS_COLOR.map((c, i) => new T.Color(c).multiply(new T.Color(...CLASS_TINT[i])))}; sh.uniforms.classRough = {value: CLASS_ROUGH};
    sh.vertexShader = 'varying vec3 vWorld;\n' + sh.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\n\tvWorld = ( modelMatrix * vec4( transformed, 1. ) ).xyz;');
    sh.fragmentShader = `uniform sampler2D classMap; uniform vec4 extent; uniform vec3 classColor[10]; uniform float classRough[10]; varying vec3 vWorld;
int groundClass() { vec2 uv = ( vWorld.xz - extent.xz ) / ( extent.yw - extent.xz ); if ( any( lessThan( uv, vec2( 0. ) ) ) || any( greaterThan( uv, vec2( 1. ) ) ) ) return 0; return int( texture2D( classMap, uv ).r * 255. + .5 ); }
` + sh.fragmentShader
      .replace('#include <map_fragment>', `int gc = clamp( groundClass(), 0, 9 );
  float dn = texture2D( map, vWorld.xz * .21 ).r * .55 + texture2D( map, vWorld.xz * .043 ).r * .45;
  vec3 gcol = classColor[ gc ];
  if ( gc == 3 || gc == 6 ) gcol *= .82 + .3 * dn;                                   // asphalt
  else if ( gc == 5 ) { vec2 t = fract( vWorld.xz / vec2( .4, .2 ) ); float j = step( .06, t.x ) * step( .1, t.y );   // promenade: paver bands
    float band = step( .55, fract( vWorld.x / 1.7 + .3 * step( .5, fract( vWorld.z / 23. ) ) ) );
    gcol = mix( vec3( .3, .25, .23 ), vec3( .3, .28, .27 ), band ) * ( .88 + .2 * dn ) * mix( .84, 1., j ); }   // (pinkish-grey, low contrast: render 03)
  else if ( gc == 4 || gc == 9 ) { vec2 t = fract( vWorld.xz / vec2( .4, .2 ) ); float j = step( .06, t.x ) * step( .1, t.y ); gcol *= ( .88 + .2 * dn ) * mix( .82, 1., j ); }   // pavers
  else gcol *= .7 + .55 * dn;                                                          // grass, soil
  diffuseColor.rgb *= gcol;`)
      .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = classRough[ gc ];');
    hook?.(sh);
  };
  mat.customProgramCacheKey = () => 'ground';
  return mat;
}
function noiseTexture() {
  const S = 256, c = Object.assign(document.createElement('canvas'), {width: S, height: S}), x = c.getContext('2d'), r = rng(9);
  const img = x.createImageData(S, S);
  // value noise, two octaves, tileable
  const lat = n => Float32Array.from({length: n * n}, r), L1 = lat(16), L2 = lat(64);
  const smp = (L, n, u, v) => { const fx = u * n, fy = v * n, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0, q = (i, j) => L[((j % n + n) % n) * n + ((i % n + n) % n)];
    const a = q(x0, y0) + (q(x0 + 1, y0) - q(x0, y0)) * tx, b = q(x0, y0 + 1) + (q(x0 + 1, y0 + 1) - q(x0, y0 + 1)) * tx; return a + (b - a) * ty; };
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) { const v = (smp(L1, 16, i / S, j / S) * .6 + smp(L2, 64, i / S, j / S) * .4) * 255, k = (j * S + i) * 4; img.data[k] = img.data[k + 1] = img.data[k + 2] = v; img.data[k + 3] = 255; }
  x.putImageData(img, 0, 0);
  const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = 8; return t;
}

// ---- neighbouring buildings (extruded from OpenStreetMap with their heights), trees, shrubs, street lamps
export function buildContext(ctx, plot, M) {
  const g = new T.Group(); g.name = 'context';
  const r = rng(13), half = 34.5;
  // buildings: walls with a window grid, flat roofs
  const walls = [], roofs = [];
  for (const b of ctx.buildings || []) {
    const pts = b.pts.map(([x, z]) => new T.Vector2(x, -z));
    const shape = new T.Shape(pts), h = Math.max(3, b.height || 6);
    const geo = new T.ExtrudeGeometry(shape, {depth: h, bevelEnabled: false}).rotateX(-Math.PI / 2).translate(0, STREET, 0);
    // side UVs in metres (u along the wall, v up) for the window grid
    const pos = geo.getAttribute('position'), nrm = geo.getAttribute('normal'), uv = geo.getAttribute('uv');
    for (let i = 0; i < pos.count; i++) {
      const up = Math.abs(nrm.getY(i)) > .5;
      uv.setXY(i, up ? pos.getX(i) : (Math.abs(nrm.getX(i)) > Math.abs(nrm.getZ(i)) ? pos.getZ(i) : pos.getX(i)), up ? pos.getZ(i) : pos.getY(i) - STREET);
    }
    (b.kind === 'university' || b.kind === 'commercial' ? roofs : walls).push(geo);
  }
  const all = [...walls, ...roofs];
  if (all.length) {
    const m = new T.Mesh(mergeGeometries(all.map(x => x.index ? x.toNonIndexed() : x), false), M.neighbour); m.receiveShadow = true; m.castShadow = true; g.add(m);
  }
  // trees: OSM trees within 220 m plus the plot's own; young street trees (crown ≈ 3 m) of leaf cards around a few
  // branches, normals bent outward from the crown's centre so the foliage shades as one volume
  // + the larger street tree that frames render 03 on the right (placed with its calibrated camera)
  const trees = [...plot.trees, [65.2, 41.6, STREET, 1.55], ...(ctx.trees || []).filter(([x, z]) => Math.hypot(x - 10, z) < 220 && !(x > -9 && x < 28 && z > -38 && z < 43)).map(([x, z]) => [x, z, STREET, .85 + r() * .5])];
  const {crown, wood} = treeGeometry(r);
  const canopy = new T.InstancedMesh(crown, M.canopy, trees.length), trunk = new T.InstancedMesh(wood, M.trunk, trees.length);
  const m4 = new T.Matrix4(), q = new T.Quaternion(), col = new T.Color(), up = new T.Vector3(0, 1, 0);
  trees.forEach(([x, z, y, sc], i) => {
    const s = sc * (.85 + r() * .35);
    const yaw = r() * 6.28, sy = s * (.9 + r() * .2) * (i === plot.trees.length ? .78 : 1);   // (render 03's framing tree: a lower crown, as in its image)
    m4.compose(new T.Vector3(x, y, z), q.setFromAxisAngle(up, yaw), new T.Vector3(s, sy, s));
    trunk.setMatrixAt(i, m4); canopy.setMatrixAt(i, m4);
    // mostly yellow-green young plane and ash trees, a few purple-leaved plums (render 03)
    if (r() < .12) canopy.setColorAt(i, col.setHSL(.97, .32, .5)); else canopy.setColorAt(i, col.setHSL(.2 + (r() - .5) * .05, .36 + r() * .14, .78 + (r() - .5) * .1));
    // the framing tree of render 03: young bright yellow-green leaves (seen from below, against the light)
    if (i === plot.trees.length) canopy.setColorAt(i, col.setHSL(.18, .62, .86));
  });
  // crowns cast shadows but do not receive them: self-shadowed leaf cards read as dark blobs, real crowns glow
  canopy.castShadow = trunk.castShadow = true; canopy.receiveShadow = false; g.add(canopy, trunk);
  // shrubs and hedges: the same leaf cards in low mounds
  const shrubs = (ctx.shrubs || []).filter(([x, z]) => Math.hypot(x - 10, z) < 200);
  // (a third of the crown's cards: a shrub is small on screen and there are hundreds)
  const cardsOf = g => { const p = g.getAttribute('position'), keep = [], n = p.count / 6; for (let c = 0; c < n; c += 3) for (let v = 0; v < 6; v++) keep.push(c * 6 + v); return keep; };
  const pick = (g, idx) => { const out = new T.BufferGeometry(); for (const [k, a] of Object.entries(g.attributes)) { const d = new a.array.constructor(idx.length * a.itemSize); idx.forEach((i, j) => { for (let c = 0; c < a.itemSize; c++) d[j * a.itemSize + c] = a.array[i * a.itemSize + c]; }); out.setAttribute(k, new T.BufferAttribute(d, a.itemSize)); } return out; };
  const flatCrown = crown.index ? crown.toNonIndexed() : crown, bush = pick(flatCrown, cardsOf(flatCrown)).translate(0, -3.15, 0).scale(.55, .45, .55);
  const sh = new T.InstancedMesh(bush, M.canopy, shrubs.length);
  shrubs.forEach(([x, z], i) => { const s = .6 + r() * .6; m4.compose(new T.Vector3(x, STREET + s * .55, z), q.setFromAxisAngle(up, r() * 6.28), new T.Vector3(s, s, s)); sh.setMatrixAt(i, m4); sh.setColorAt(i, col.setHSL(.22, .4, .32 + (r() - .5) * .08)); });
  sh.receiveShadow = true; sh.castShadow = true; g.add(sh);
  // street lamps along Calle María de Molina (tall dark blue poles, as in the renders)
  const lampGeo = mergeGeometries([new T.CylinderGeometry(.06, .09, 8, 10).translate(0, 4, 0), new T.CylinderGeometry(.03, .03, 1.1, 8).rotateZ(Math.PI / 2).translate(.5, 7.9, 0), new T.BoxGeometry(.55, .1, .22).translate(1.05, 7.85, 0)].map(x => x.toNonIndexed()), false);
  const lamps = new T.InstancedMesh(lampGeo, M.lampPole, plot.lamps.length), heads = [];
  plot.lamps.forEach(([x, z], i) => { m4.compose(new T.Vector3(x, STREET, z), q.identity(), new T.Vector3(1, 1, 1)); lamps.setMatrixAt(i, m4); heads.push(new T.Vector3(x + 1.05, STREET + 7.78, z)); });
  lamps.castShadow = true; g.add(lamps);
  const glow = new T.InstancedMesh(new T.BoxGeometry(.48, .02, .18), M.lampGlow, heads.length);
  heads.forEach((p, i) => { m4.compose(p, q.identity(), new T.Vector3(1, 1, 1)); glow.setMatrixAt(i, m4); }); g.add(glow);
  return {group: g, lampHeads: heads};
}

// one young street tree (plane or ash, as in render 03): a clear trunk to 2,3 m, six limbs with two side shoots each and
// a leader, the foliage in loose clusters of small leaf cards at the shoot tips and along the limbs — an airy crown
// (≈3 m across) that the sky shows through, not a solid ball
function treeGeometry(r) {
  const cards = [], wood = [], clusters = [], base = 2.3, cy = 3.35, Y = new T.Vector3(0, 1, 0), q = new T.Quaternion();
  wood.push(new T.CylinderGeometry(.045, .075, base + .3, 7).translate(0, (base + .3) / 2, 0));
  const limb = (from, dir, len, r0, r1) => {                                  // a tapered round branch from `from` along `dir`
    wood.push(new T.CylinderGeometry(r1, r0, len, 4, 1, true).translate(0, len / 2, 0).applyQuaternion(q.setFromUnitVectors(Y, dir)).translate(from.x, from.y, from.z));   // (open, 4 sides: 8 triangles a limb)
    return from.clone().addScaledVector(dir, len);
  };
  for (let k = 0; k < 6; k++) {
    const a = k * 1.047 + r() * .5, tilt = .35 + r() * .4, len = 1.25 + r() * .45;
    const dir = new T.Vector3(Math.sin(tilt) * Math.cos(a), Math.cos(tilt), Math.sin(tilt) * Math.sin(a));
    const from = new T.Vector3(0, base - .15 + r() * .35, 0);
    clusters.push([limb(from, dir, len, .035, .015), 4], [from.clone().addScaledVector(dir, len * .55), 2]);
    for (let j = 0; j < 2; j++) {                                              // side shoots
      const at = from.clone().addScaledVector(dir, len * (.4 + r() * .4)), d2 = dir.clone().add(new T.Vector3(r() - .5, r() * .5, r() - .5)).normalize();
      clusters.push([limb(at, d2, .45 + r() * .4, .02, .008), 4]);
    }
  }
  clusters.push([limb(new T.Vector3(0, base, 0), Y, cy + .9 - base, .04, .015), 5]);   // the leader
  // and twigs filling out the ovoid silhouette (render 03's crowns are full ovals, finely leaved)
  for (let k = 0; k < 14; k++) {
    let p; do { p = new T.Vector3(r() * 2 - 1, r() * 2 - 1, r() * 2 - 1); } while (p.lengthSq() > 1 || p.lengthSq() < .45);
    clusters.push([p.multiply(new T.Vector3(1.2, 1.15, 1.2)).add(new T.Vector3(0, cy, 0)), 3]);
  }
  for (const [c, n] of clusters) for (let i = 0; i < n; i++) {
    const sz = .42 + r() * .28, card = new T.PlaneGeometry(sz, sz), p = c.clone().add(new T.Vector3((r() - .5) * .55, (r() - .35) * .4, (r() - .5) * .55));
    card.rotateX((r() - .5) * 2.4).rotateY(r() * Math.PI).rotateZ((r() - .5) * 1.2).translate(p.x, p.y, p.z);
    // normals from the crown centre (soft volumetric shading of the foliage), on the card's own front side: a
    // double-sided card turns its normal round on the back face, so an outward normal stored against the card's
    // front would point into the crown wherever that back face is seen (half the leaves shaded as if in shadow)
    const pos = card.getAttribute('position'), nrm = card.getAttribute('normal'), front = new T.Vector3().fromBufferAttribute(nrm, 0);
    const bent = Array.from({length: pos.count}, (_, v) => new T.Vector3(pos.getX(v), (pos.getY(v) - cy) * 1.3, pos.getZ(v)).normalize());
    const s = bent.reduce((a, nn) => a + nn.dot(front), 0) < 0 ? -1 : 1;
    bent.forEach((nn, v) => nrm.setXYZ(v, nn.x * s, nn.y * s, nn.z * s));
    cards.push(card);
  }
  return {crown: mergeGeometries(cards, false), wood: mergeGeometries(wood.map(x => x.index ? x.toNonIndexed() : x), false)};
}

// leaf cluster texture with alpha: small elliptic leaves in a few greens, lighter at the top
export function leafTexture(size = 512) {
  const c = Object.assign(document.createElement('canvas'), {width: size, height: size}), x = c.getContext('2d'), r = rng(17);
  for (let k = 0; k < 560; k++) {
    const px = size * (.08 + r() * .84), py = size * (.08 + r() * .84), d = Math.hypot(px - size / 2, py - size / 2) / (size / 2);
    if (d > .98 || r() < d * d * .6) continue;
    const L = 38 + r() * 30 + (1 - py / size) * 10, w = size * (.013 + r() * .009), h = w * (1.7 + r() * .6);
    x.save(); x.translate(px, py); x.rotate(r() * Math.PI * 2);
    x.fillStyle = `hsl(${70 + r() * 24}, ${38 + r() * 22}%, ${L}%)`;
    x.beginPath(); x.ellipse(0, 0, w, h, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = `hsla(80, 30%, ${L - 12}%, .5)`; x.lineWidth = 1; x.beginPath(); x.moveTo(0, -h); x.lineTo(0, h); x.stroke();
    x.restore();
  }
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
}
