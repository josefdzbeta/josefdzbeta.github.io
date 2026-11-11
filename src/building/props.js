// Life seen in Bamaire's renders: cars parked along Calle María de Molina (instanced: one draw per part), potted
// cypresses and lounge sets on the level-5 terraces, furnished ground-floor patios, and the outdoor lights of
// renders 01 and 04 (patio wall lights, balcony soffit downlights) for the bake.
import * as T from 'three';
import {mergeGeometries, mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
import {STREET} from './site.js';
import {buildFurniture} from '../apartment/furniture.js';

const rng = seed => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const flat = list => mergeGeometries(list.map(g => g.index ? g.toNonIndexed() : g), false);

// a lofted surface through rings of points (same count each), smooth along and around it, flat-capped at the ends;
// faces turned outward from the axis of each ring (the rings are convex)
function loft(rings, caps = true) {
  const pos = [], capPos = [], n = rings[0].length, centre = r => r.reduce((m, p) => m.add(p), new T.Vector3()).multiplyScalar(1 / n);
  const tri = (out, a, b, c, o) => {
    const nrm = new T.Vector3().subVectors(b, a).cross(new T.Vector3().subVectors(c, a)), mid = a.clone().add(b).add(c).multiplyScalar(1 / 3);
    if (nrm.dot(mid.sub(o)) < 0) [b, c] = [c, b];
    out.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  };
  for (let s = 0; s + 1 < rings.length; s++) {
    const o = centre(rings[s]).add(centre(rings[s + 1])).multiplyScalar(.5);
    for (let i = 0; i < n; i++) {
      const a = rings[s][i], b = rings[s][(i + 1) % n], c = rings[s + 1][(i + 1) % n], d = rings[s + 1][i];
      const oa = o.clone(); oa.x = (a.x + c.x) / 2;                                // outward from the ring's own axis
      tri(pos, a, b, c, oa); tri(pos, a, c, d, oa);
    }
  }
  if (caps) for (const [r, other] of [[rings[0], rings[1]], [rings.at(-1), rings.at(-2)]]) {
    const c = centre(r), away = centre(other);                                    // outward: away from the next ring
    for (let i = 0; i < n; i++) tri(capPos, c, r[i], r[(i + 1) % n], away);
  }
  const side = mergeVertices(new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(pos, 3)), 1e-5); side.computeVertexNormals();
  if (!caps) return side.toNonIndexed();
  const cap = new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(capPos, 3)); cap.computeVertexNormals();
  return flat([side, cap]);
}
// a rounded rectangle across the car (z, y) at x: half-width w, from yb to yt, corner radii rb (bottom) and rt (top)
function ring(x, w, yb, yt, rt, rb) {
  const pts = [];
  for (const [cz, cy, r, a0] of [[w - rb, yb + rb, rb, -Math.PI / 2], [w - rt, yt - rt, rt, 0], [-(w - rt), yt - rt, rt, Math.PI / 2], [-(w - rb), yb + rb, rb, Math.PI]])
    for (let k = 0; k <= 4; k++) { const a = a0 + Math.PI / 2 * k / 4; pts.push(new T.Vector3(x, cy + r * Math.sin(a), cz + r * Math.cos(a))); }
  return pts;
}
// a compact SUV (4,4 × 1,8 × 1,55 m) along +x, as the ones parked in renders 03 and 04: a lofted body with rounded
// shoulders, tapered nose and tail and a sloping bonnet; the glasshouse narrower than the body (tumblehome) with a
// raked windscreen and rear window, a painted roof panel and mirrors; black wheel arches, sill cladding and grille;
// 18" wheels with alloy faces; wrap-round tail lights and slim headlights
function carGeometry() {
  // body: [x, half-width, bottom, top (bonnet / beltline)]
  const B = [[-2.21, .62, .44, .8], [-2.17, .8, .38, .94], [-2.07, .87, .33, 1.0], [-1.9, .9, .31, 1.02], [-1.4, .91, .3, 1.01], [-.4, .91, .3, .99], [.6, .91, .3, .97],
    [1.3, .9, .3, .93], [1.8, .88, .31, .88], [2.05, .84, .33, .83], [2.17, .76, .36, .76], [2.23, .6, .42, .66]];
  const body = loft(B.map(([x, w, yb, yt]) => ring(x, w, yb, yt, Math.min(.16, (yt - yb) / 2 - .01), .07)));
  // glasshouse: rings sheared front to back (bottom at the beltline, top at the roof), narrowing towards the roof
  const gh = [], roofRings = [];
  for (let k = 0; k <= 4; k++) {
    const u = k / 4, xb = .92 + (-1.97 - .92) * u, xt = .12 + (-1.72 - .12) * u, yb = .96, yt = 1.52 - .03 * u * u;
    gh.push(ring(0, .85, yb, yt, .14, .02).map(p => { const t = (p.y - yb) / (yt - yb); p.z *= 1 - .2 * t; p.x = xb + (xt - xb) * t; return p; }));
    roofRings.push(ring(xt + .04 - .1 * u, .66, yt - .035, yt + .012, .05, .01));
  }
  const glass = loft(gh), roof = loft(roofRings);
  const mirrors = [.93, -.93].map(z => { const m = new T.BoxGeometry(.2, .11, .13).translate(.72, 1.05, z); m.deleteAttribute('uv'); return m; });
  const paint = flat([body, roof, ...mirrors]);
  // black trim: wheel arches, sill cladding, grille and lower bumpers
  const trim = [new T.BoxGeometry(3.3, .13, 1.84).translate(-.03, .38, 0), new T.BoxGeometry(.06, .2, .95).translate(2.2, .56, 0), new T.BoxGeometry(.08, .12, 1.5).translate(-2.16, .45, 0)];
  const wheels = [], rims = [];
  for (const [x, z] of [[1.38, .79], [1.38, -.79], [-1.42, .79], [-1.42, -.79]]) {
    trim.push(new T.TorusGeometry(.43, .055, 5, 12, Math.PI).translate(x, .36, Math.sign(z) * .9));
    wheels.push(new T.CylinderGeometry(.36, .36, .23, 20).rotateX(Math.PI / 2).translate(x, .36, z));
    // alloy face over the dark tyre: rim ring, five double spokes, hub
    const f = z + Math.sign(z) * .118;
    rims.push(new T.TorusGeometry(.225, .022, 4, 18).translate(x, .36, f), new T.CylinderGeometry(.055, .055, .03, 10).rotateX(Math.PI / 2).translate(x, .36, f));
    for (let k = 0; k < 10; k++) rims.push(new T.BoxGeometry(.028, .19, .02).translate(0, .11, 0).rotateZ((Math.floor(k / 2) + (k % 2 ? .09 : -.09)) * Math.PI * 2 / 5).translate(x, .36, f));
  }
  const lights = flat([.6, -.6].map(z => new T.BoxGeometry(.05, .06, .34).translate(2.17, .74, z)));
  const tail = flat([.62, -.62].flatMap(z => [new T.BoxGeometry(.05, .07, .36).translate(-2.15, .9, z), new T.BoxGeometry(.3, .07, .05).translate(-2.0, .9, Math.sign(z) * .875)]));
  return {paint, glass, tyre: flat([...wheels, ...trim]), rim: flat(rims), lights, tail};
}

const PAINT = ['#f1f1ee', '#f1f1ee', '#c9cbcd', '#c9cbcd', '#8d9296', '#2c2f33', '#16181b', '#3d4f66', '#7a2a2a', '#e9e4da'];

// cars parked on both sides of Calle María de Molina (x ≈ 31 by the building, 39 across), between its crossings
export function buildCars(M, {x = [31.2, 38.9], z = [-45, 29], seed = 23} = {}) {             // clear of the crossings (z ≈ 35, 50) and junctions
  const r = rng(seed), spots = [];
  for (const [i, cx] of x.entries()) for (let zz = z[0]; zz < z[1]; zz += 5.6) if (r() < (i ? .3 : .42)) spots.push([cx + (r() - .5) * .15, zz + (r() - .5) * .5, i ? Math.PI / 2 : -Math.PI / 2 + (r() < .5 ? Math.PI : 0)]);
  const G = carGeometry(), g = new T.Group(); g.name = 'cars';
  const parts = {paint: M.carPaint, glass: M.carGlass, tyre: M.tyre, rim: M.alu, lights: M.headlight, tail: M.taillight};
  const meshes = Object.fromEntries(Object.entries(parts).map(([k, m]) => [k, new T.InstancedMesh(G[k], m, spots.length)]));
  const m4 = new T.Matrix4(), q = new T.Quaternion(), col = new T.Color(), up = new T.Vector3(0, 1, 0);
  spots.forEach(([px, pz, yaw], i) => {
    m4.compose(new T.Vector3(px, STREET, pz), q.setFromAxisAngle(up, yaw + (r() - .5) * .04), new T.Vector3(1, 1, 1));
    for (const m of Object.values(meshes)) m.setMatrixAt(i, m4);
    meshes.paint.setColorAt(i, col.set(PAINT[Math.floor(r() * PAINT.length)]));
  });
  for (const [k, m] of Object.entries(meshes)) { m.castShadow = k !== 'lights' && k !== 'tail'; m.receiveShadow = true; g.add(m); }
  return g;
}

// potted cypresses on the roof terraces, near the façade voids (as in renders 01 and 03)
export function buildCypresses(M, terraces, y, {seed = 31} = {}) {
  const r = rng(seed), spots = [];
  for (const [x0, x1, z0, z1] of terraces) {
    if (x1 - x0 < 3 || z1 - z0 < 3) continue;
    for (const [px, pz] of [[x0 + .9, z0 + .9], [x1 - .9, z0 + .9], [x0 + .9, z1 - .9], [x1 - .9, z1 - .9]]) if (r() < .5) spots.push([px, pz]);
  }
  const pot = new T.BoxGeometry(.55, .6, .55).translate(0, .3, 0);
  const crown = new T.IcosahedronGeometry(1, 3).scale(.32, 1.05, .32).translate(0, 1.55, 0);
  const pots = new T.InstancedMesh(pot, M.pot, spots.length), trees = new T.InstancedMesh(crown, M.cypress, spots.length), m4 = new T.Matrix4();
  spots.forEach(([px, pz], i) => { const s = .8 + r() * .4; m4.makeScale(s, s, s).setPosition(px, y, pz); pots.setMatrixAt(i, m4); trees.setMatrixAt(i, m4); });
  pots.castShadow = trees.castShadow = true; pots.receiveShadow = trees.receiveShadow = true;
  return new T.Group().add(pots, trees);
}

// patios and terraces furnished as in render 01 (wicker lounge, teak dining set or sunbeds, planters), and the
// lights that come on at dusk: two wall lights per patio, downlights in the soffit over every balcony
export function buildOutdoor({patios, terraces, balconies, lv5}, M, {seed = 41, lite = false} = {}) {        // lite: phones (no tall potted plants)
  const r = rng(seed), items = [], lights = [], glows = [], H = Math.PI / 2;
  const lounge = (cx, cz, y, along) => {                       // crescent sofa facing a low table and an armchair
    const yaw = along ? 0 : -H, dx = along ? 0 : 1, dz = along ? 1 : 0;
    items.push({k: 'wickerSofa', x: cx + dx * 1.1, y, z: cz + dz * 1.1, yaw: yaw + Math.PI}, {k: 'wickerTable', x: cx, y, z: cz, yaw},
      {k: 'wickerChair', x: cx - dx * 1.25, y, z: cz - dz * 1.25, yaw});
  };
  for (const p of patios) {                                     // p.facade: the façade's x; p.out: +1 street side, −1 courtyard
    const [x0, x1] = p.x, [z0, z1] = p.z, y = p.y, zc = (z0 + z1) / 2, len = z1 - z0, xc = (x0 + x1) / 2 + .3 * p.out, pick = r();
    const edge = p.out > 0 ? x1 - .4 : x0 + .4, near = p.facade + p.out * .55;
    if (len > 5.5 && pick < .4) lounge(xc + .2, zc, y, false);
    else if (len > 4 && pick < .75) {
      items.push({k: 'teakTable', x: xc, y, z: zc, w: 1.6, d: .9, yaw: H});
      for (const [ox, oz, yaw] of [[-.68, -.42, H], [-.68, .42, H], [.68, -.42, -H], [.68, .42, -H]]) items.push({k: 'teakChair', x: xc + ox, y, z: zc + oz, yaw});
    } else for (const oz of [-.45, .45]) items.push({k: 'sunbed', x: xc, y, z: zc + oz * Math.min(1, len / 3), w: .68, d: 1.95, yaw: -H});
    // a planted bed along the fence, a tall plant by the façade
    items.push({k: 'planter', bed: true, r: .22, d: Math.min(len - 1.4, 2.6), h: .45, flowers: r() < .5, x: edge, y, z: zc + (r() - .5) * .6});
    if (r() < .7 && !lite) items.push({k: 'plantTall', x: near, y, z: r() < .5 ? z0 + .6 : z1 - .6});
    for (const t of [.25, .75]) { const z = z0 + t * len; lights.push({x: p.facade + p.out * .3, y: y + 2.2, z, intensity: 5}); glows.push([p.facade + p.out * .04, y + 2.3, z, .08, .2, .12]); }
  }
  for (const [x0, x1, z0, z1] of terraces) {
    if (x1 - x0 < 3 || z1 - z0 < 3) continue;
    const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    lounge(cx, cz, lv5, z1 - z0 > x1 - x0);
    items.push({k: 'planter', r: .3, h: .5, x: x0 + .5, y: lv5, z: (z0 + z1) / 2 + 1.6}); if (!lite) items.push({k: 'plantTall', x: x1 - .5, y: lv5, z: cz - 1.4});
    lights.push({x: cx, y: lv5 + 2.6, z: cz, intensity: 6});
  }
  for (const b of balconies) {
    const len = Math.max(b.x[1] - b.x[0], b.z[1] - b.z[0]), n = Math.max(1, Math.round(len / 3));
    for (let k = 0; k < n; k++) {
      const t = (k + .5) / n, along = b.z[1] - b.z[0] > b.x[1] - b.x[0];
      const x = along ? (b.x[0] + b.x[1]) / 2 : b.x[0] + t * (b.x[1] - b.x[0]), z = along ? b.z[0] + t * (b.z[1] - b.z[0]) : (b.z[0] + b.z[1]) / 2;
      lights.push({x, y: b.soffit - .03, z, intensity: 3, beam: .55}); glows.push([x, b.soffit - .01, z, .12, .02, .12]);
    }
  }
  const f = buildFurniture(items, M), g = new T.Group(); g.name = 'outdoor'; g.add(...f.meshes);
  // the light fittings: one instanced box per fitting, lit with the street lamps' glow
  const im = new T.InstancedMesh(new T.BoxGeometry(1, 1, 1), M.lampGlow, glows.length), m4 = new T.Matrix4();
  glows.forEach(([x, y, z, w, h, d], i) => im.setMatrixAt(i, m4.makeScale(w, h, d).setPosition(x, y, z)));
  g.add(im);
  return {group: g, lights};
}

// landscaping seen in the foreground of render 03, across the corner of Calle María de Molina and the pedestrian
// street (positions recovered with its calibrated camera): a lavender bed and two light bollards
export const LAVENDER_BED = [[52.5, 35.2], [62.5, 35.2], [62.5, 25.5], [57.4, 26.6]];
export const BOLLARDS = [[46.7, 33.4], [58.5, 36.4], [40.5, 30.5]];
const inPoly = (x, z, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) if ((P[i][1] > z) !== (P[j][1] > z) && x < (P[j][0] - P[i][0]) * (z - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0]) c = !c; return c; };
export function buildPlanting(M, {seed = 53} = {}) {
  const r = rng(seed), g = new T.Group(); g.name = 'planting';
  // lavender: clumps of upright flower-spike cards on a 0,55 m staggered grid
  const cards = [];
  for (let k = 0; k < 16; k++) {
    const a = k * 2.4, rr = .16 * Math.sqrt((k + .5) / 16), sz = .34 + r() * .12;
    // cards lean outward with their distance from the clump's centre: a rounded mound, not a flat-topped carpet
    cards.push(new T.PlaneGeometry(sz, sz * 1.25).translate(0, sz * .62, 0).rotateX(-(rr / .16) * .55 - r() * .2).rotateY(a + Math.PI / 2 + (r() - .5) * .6).translate(Math.cos(a) * rr, 0, Math.sin(a) * rr));
  }
  const clump = flat(cards), spots = [];
  for (let x = 52; x < 63; x += .55) for (let z = 25; z < 36; z += .48) { const px = x + (Math.round(z / .48) % 2) * .27 + (r() - .5) * .12, pz = z + (r() - .5) * .1; if (inPoly(px, pz, LAVENDER_BED)) spots.push([px, pz]); }
  const lav = new T.InstancedMesh(clump, M.lavender, spots.length), m4 = new T.Matrix4(), q = new T.Quaternion(), up = new T.Vector3(0, 1, 0), col = new T.Color();
  spots.forEach(([x, z], i) => { const s = 1 + r() * .55; m4.compose(new T.Vector3(x, STREET, z), q.setFromAxisAngle(up, r() * 6.28), new T.Vector3(s, s * (.8 + r() * .4), s)); lav.setMatrixAt(i, m4); lav.setColorAt(i, col.setHSL(.8, .08, .82 + (r() - .5) * .16)); });
  lav.castShadow = true; lav.receiveShadow = true; g.add(lav);
  // bollards: dark grey posts with a light band under the cap
  const post = flat([new T.CylinderGeometry(.09, .09, .78, 16).translate(0, .39, 0), new T.CylinderGeometry(.1, .1, .05, 16).translate(0, .8, 0)]);
  const posts = new T.InstancedMesh(post, M.bollard, BOLLARDS.length), glow = new T.InstancedMesh(new T.CylinderGeometry(.085, .085, .06, 16), M.lampGlow, BOLLARDS.length);
  BOLLARDS.forEach(([x, z], i) => { posts.setMatrixAt(i, m4.makeTranslation(x, STREET, z)); glow.setMatrixAt(i, m4.makeTranslation(x, STREET + .74, z)); });
  posts.castShadow = true; g.add(posts, glow);
  return {group: g, lights: BOLLARDS.map(([x, z]) => new T.Vector4(x, STREET + .72, z, 6))};
}

// lavender spikes: grey-green stems and leaves, violet flower heads in the upper half (alpha-tested card)
export function lavenderTexture(size = 256) {
  const c = Object.assign(document.createElement('canvas'), {width: size, height: size}), x = c.getContext('2d'), r = rng(61);
  for (let k = 0; k < 90; k++) {
    const bx = size * (.1 + r() * .8), top = size * (.05 + r() * .35), lean = (r() - .5) * size * .12;
    x.strokeStyle = `hsl(${95 + r() * 20}, 14%, ${46 + r() * 14}%)`; x.lineWidth = 1.2 + r();
    x.beginPath(); x.moveTo(bx, size); x.quadraticCurveTo(bx + lean * .3, (size + top) / 2, bx + lean, top); x.stroke();
    for (let j = 0; j < 7; j++) { const t = j / 7, px = bx + lean * (1 - t * .1), py = top + t * size * .12; x.fillStyle = `hsl(${258 + r() * 22}, ${16 + r() * 14}%, ${62 + r() * 14}%)`; x.beginPath(); x.ellipse(px, py, 2.2 + r() * 1.5, 3.5 + r() * 2, 0, 0, 6.3); x.fill(); }
  }
  for (let k = 0; k < 60; k++) { x.strokeStyle = `hsl(${100 + r() * 20}, 13%, ${48 + r() * 12}%)`; x.lineWidth = 2; const bx = size * r(); x.beginPath(); x.moveTo(bx, size); x.lineTo(bx + (r() - .5) * 30, size * (.55 + r() * .3)); x.stroke(); }
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
}

// ---- people: scale figures where renders 03 and 04 show pedestrians (positions recovered with their camera),
// plus a few on the patios, terraces and the pedestrian street. Proportioned bodies in a walking or standing pose,
// clothes in everyday colours; one merged mesh with vertex colours.
const SKIN = ['#e8c0a0', '#d9a882', '#c99b78', '#8d5d3f', '#f1d2bb'], HAIR = ['#2b211a', '#4a3423', '#c9a46a', '#8b8b8b', '#16161a'];
const TOPS = ['#f2f0ea', '#f2f0ea', '#2f3d55', '#9aa3ab', '#c9b79c', '#7a2e2e', '#3c5a46', '#d8d2c4'], BOTTOMS = ['#3b4a63', '#3b4a63', '#25262a', '#b5a487', '#6b6e72'];
export const PEOPLE = [                                   // [x, z, yaw (0 = facing +z), walking, people]
  [22.8, 42.2, -Math.PI / 2, true, 1], [28.7, 26.2, 0, true, 2], [27.3, 14.6, Math.PI / 2, false, 1], [29.0, 10.0, Math.PI, false, 2],
  [28.7, -12.8, 0, true, 2], [28.9, -27, Math.PI, true, 1], [41.6, 4, 0, true, 1], [14, 45.5, Math.PI / 2, true, 2],
];
function paint(g, color) {
  const c = new T.Color(color), a = new Float32Array(g.getAttribute('position').count * 3);
  for (let i = 0; i < a.length; i += 3) c.toArray(a, i);
  g.setAttribute('color', new T.BufferAttribute(a, 3)); return g;
}
function person(r, {walk = true, h = 1.74} = {}) {
  const s = h / 1.74, parts = [], pick = a => a[Math.floor(r() * a.length)];
  const skin = pick(SKIN), hair = pick(HAIR), top = pick(TOPS), bottom = pick(BOTTOMS), shoe = r() < .5 ? '#1d1d1f' : '#e9e7e2';
  const swing = walk ? .38 : .04, add = (g, c) => parts.push(paint(g.index ? g.toNonIndexed() : g, c));
  // legs (tapered, from the hip), shoes, pelvis
  for (const side of [-1, 1]) {
    const a = side * swing * (r() < .5 ? 1 : 1), leg = new T.CylinderGeometry(.075, .05, .82, 10).translate(0, -.41, 0).rotateX(a).translate(side * .095, .9, 0);
    add(leg, bottom);
    const foot = new T.BoxGeometry(.1, .08, .25).translate(0, .04, .05).translate(side * .095, 0, Math.sin(a) * .82 * -1 + 0);
    add(foot, shoe);
  }
  add(new T.CylinderGeometry(.17, .16, .16, 14).scale(1, 1, .7).translate(0, .93, 0), bottom);
  // torso: a lathe from waist to shoulders, flattened front to back
  const prof = [[.155, .98], [.15, 1.08], [.165, 1.22], [.19, 1.38], [.17, 1.45], [.08, 1.49], [0, 1.5]].map(([x, y]) => new T.Vector2(x, y));
  add(new T.LatheGeometry(prof, 16).scale(1, 1, .62), top);
  // arms swinging against the legs, hands
  for (const side of [-1, 1]) {
    const a = -side * swing * .8, arm = new T.CylinderGeometry(.05, .038, .6, 8).translate(0, -.3, 0).rotateX(a).rotateZ(side * .06).translate(side * .205, 1.43, 0);
    add(arm, r() < .35 ? skin : top);
    add(new T.SphereGeometry(.045, 8, 6).translate(0, -.63, 0).rotateX(a).rotateZ(side * .06).translate(side * .205, 1.43, 0), skin);
  }
  add(new T.CylinderGeometry(.05, .055, .1, 8).translate(0, 1.52, 0), skin);
  add(new T.SphereGeometry(.1, 14, 10).scale(1, 1.15, 1.05).translate(0, 1.64, .01), skin);
  add(new T.SphereGeometry(.108, 14, 8, 0, Math.PI * 2, 0, Math.PI * .55).scale(1, 1.12, 1.08).translate(0, 1.655, -.008), hair);
  const g = mergeGeometries(parts, false); g.scale(s, s, s); return g;
}
export function buildPeople(M, spots = PEOPLE, {seed = 71} = {}) {
  const r = rng(seed), list = [], m4 = new T.Matrix4(), q = new T.Quaternion(), up = new T.Vector3(0, 1, 0);
  for (const [x, z, yaw, walk, n] of spots) for (let k = 0; k < n; k++) {
    const g = person(r, {walk, h: 1.62 + r() * .26}), off = (k - (n - 1) / 2) * .58;      // couples side by side
    g.applyMatrix4(m4.compose(new T.Vector3(x + Math.cos(yaw) * off, STREET, z - Math.sin(yaw) * off), q.setFromAxisAngle(up, yaw + (r() - .5) * .15), new T.Vector3(1, 1, 1)));
    list.push(g);
  }
  const mesh = new T.Mesh(mergeGeometries(list, false), M.person); mesh.name = 'people'; mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}
