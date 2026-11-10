// Furniture, fittings and clutter, all procedural BufferGeometry. Local frame of every piece: origin at the
// centre of its footprint on the floor, +z is its front, x its width. Layouts place pieces where Bamaire's
// published plan draws them (see layouts.js); pieces that stand against a wall are pushed back onto it.
import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {Reflector} from 'three/addons/objects/Reflector.js';
import {Parts, place} from './geometry.js';

const D2R = Math.PI / 180;
const rb = (w, h, d, r = .02, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, Math.max(.001, Math.min(r, w / 2 - .001, h / 2 - .001, d / 2 - .001)));
const bx = (w, h, d) => new T.BoxGeometry(w, h, d);
const cyl = (r0, r1, h, n = 28, open = false) => new T.CylinderGeometry(r0, r1, h, n, 1, open);
const rng = seed => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// a placer for one piece: put(material, geometry, x, y, z, yaw°, pitch°) in the piece's local frame
function placer(P, it, room) {
  const base = place(it.x, it.y || 0, it.z, it.yaw || 0), e = new T.Euler(), q = new T.Quaternion(), one = new T.Vector3(1, 1, 1);
  return (mat, geo, x, y, z, yaw = 0, pitch = 0, roll = 0, opt) => {
    e.set(pitch * D2R, yaw * D2R, roll * D2R, 'YXZ');
    P.add(mat, geo, base.clone().multiply(new T.Matrix4().compose(new T.Vector3(x, y, z), q.setFromEuler(e), one)), {room, ...opt});
  };
}

// ---- living -------------------------------------------------------------------------------------------------
// a low modern sofa: straight (E = D) or L-shaped with a chaise return at the local −x end
function sofaL(put, {L, D, E, Dr}) {
  const back = .2, arm = .16, seatY = .44, base = .12, x0 = -L / 2, z0 = -D / 2, ret = E > D + .1;
  const xs = ret ? x0 + Dr : x0 + arm, sx1 = L / 2 - arm;                                          // seat run along the back
  const legs = [[-L / 2 + .08, -D / 2 + .08], [L / 2 - .08, -D / 2 + .08], [-L / 2 + .08, D / 2 - .08], [L / 2 - .08, D / 2 - .08], [0, -D / 2 + .08], [0, D / 2 - .08]];
  if (ret) legs.push([x0 + .08, z0 + E - .08], [x0 + Dr - .08, z0 + E - .08]);
  for (const [lx, lz] of legs) put('oak', cyl(.022, .016, base, 10), lx, base / 2, lz);
  put('fabric', rb(L, seatY - base, D, .045, 4), 0, base + (seatY - base) / 2, 0);
  put('fabric', rb(L, .4, back, .07, 4), 0, seatY + .2 - .02, z0 + back / 2);                       // back
  put('fabric', rb(arm, .26, D, .07, 4), L / 2 - arm / 2, seatY + .11, 0);                          // free-end arm
  if (ret) {
    put('fabric', rb(Dr, seatY - base, E - D + .02, .045, 4), x0 + Dr / 2, base + (seatY - base) / 2, z0 + D + (E - D) / 2 - .01);
    put('fabric', rb(back, .4, E, .05), x0 + back / 2, seatY + .2 - .02, z0 + E / 2);               // back along the return
    put('fabric', rb(Dr, .24, arm, .05), x0 + Dr / 2, seatY + .1, z0 + E - arm / 2);                 // return-end arm
    put('fabric', rb(Dr - back - .01, .15, E - arm - back - .01, .06), x0 + back + (Dr - back) / 2, seatY + .07, z0 + back + (E - arm - back) / 2);
    put('fabric', rb(.17, .42, (E - arm - back) * .48, .08), x0 + back + .07, seatY + .33, z0 + back + (E - arm - back) * .26, 0, 0, 12);
    put('fabric', rb(.17, .42, (E - arm - back) * .48, .08), x0 + back + .07, seatY + .33, z0 + back + (E - arm - back) * .75, 0, 0, 12);
    put('fabric', rb(.17, .42, Dr - back, .08), x0 + back + .07, seatY + .33, z0 + back + .07, 45, 0, 0);
    put('cushion', rb(.13, .4, .42, .07), x0 + back + .2, seatY + .33, z0 + D + .1, 10, 0, 16);
  } else put('fabric', rb(arm, .26, D, .07, 4), x0 + arm / 2, seatY + .11, 0);                     // second arm
  const n = Math.max(1, Math.round((sx1 - xs) / .72)), cw = (sx1 - xs) / n;
  for (let i = 0; i < n; i++) {
    put('fabric', rb(cw - .012, .15, D - back - .01, .07, 4), xs + cw * (i + .5), seatY + .07, z0 + back + (D - back) / 2);
    put('fabric', rb(cw - .02, .44, .19, .09, 4), xs + cw * (i + .5), seatY + .34, z0 + back + .08, 0, -12);   // back cushion, leaning 12°
  }
  put('cushionAccent', rb(.45, .42, .14, .07), sx1 - .3, seatY + .34, z0 + back + .2, -8, -18);
  put('cushion', rb(.42, .4, .13, .07), sx1 - .75, seatY + .33, z0 + back + .2, 6, -16);
}

// upholstered dining chair: soft seat on an oak apron, curved back shell, tapered legs splayed slightly
function curvedShell(R, chord, t, h) {
  const a = Math.asin(chord / 2 / R), sh = new T.Shape(), n = 24;
  for (let k = 0; k <= n; k++) { const f = -a + 2 * a * k / n; sh[k ? 'lineTo' : 'moveTo'](R * Math.sin(f), -R + R * Math.cos(f)); }
  for (let k = n; k >= 0; k--) { const f = -a + 2 * a * k / n; sh.lineTo((R - t) * Math.sin(f), -R + (R - t) * Math.cos(f)); }
  const g = new T.ExtrudeGeometry(sh, {depth: h, bevelEnabled: true, bevelThickness: .012, bevelSize: .012, bevelSegments: 3, curveSegments: 4});
  return g.rotateX(-Math.PI / 2).translate(0, 0, 0);
}
const CHAIR_BACK = curvedShell(.55, .46, .05, .36);
function chairUpholstered(put) {
  put('oak', rb(.43, .055, .41, .008, 2), 0, .43, 0);
  put('cushion', rb(.48, .085, .47, .04, 4), 0, .497, .012);
  put('cushion', CHAIR_BACK, 0, .5, -.19, 0, -9);
  for (const sx of [-1, 1]) {
    put('oak', cyl(.017, .012, .45, 12), sx * .19, .215, .17, 0, 3, -sx * 3);                // front legs
    put('oak', cyl(.017, .012, .47, 12), sx * .19, .225, -.19, 0, -8, -sx * 3);              // back legs, raked
  }
}

function glassTable(put, {w, d, h = .75}) {
  put('tintGlass', bx(w, .012, d), 0, h - .006, 0);
  put('steel', bx(w - .16, .05, .03), 0, h - .04, d / 2 - .1); put('steel', bx(w - .16, .05, .03), 0, h - .04, -d / 2 + .1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) put('steel', bx(.04, h - .012, .04), sx * (w / 2 - .08), (h - .012) / 2, sz * (d / 2 - .1));
}

function coffeeTable(put, {w, d}) {
  put('tintGlass', bx(w, .012, d), 0, .4, 0); put('tintGlass', bx(w - .08, .01, d - .08), 0, .12, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) put('chrome', bx(.02, .4, .02), sx * (w / 2 - .03), .2, sz * (d / 2 - .03));
}

function tvUnit(put, {w, d}, {inst: clutter}) {
  const h = .44;
  for (const sx of [-1, 1]) put('blackMetal', bx(.03, .1, d - .06), sx * (w / 2 - .12), .05, 0);
  put('lacquer', rb(w, h - .1, d, .006, 2), 0, .1 + (h - .1) / 2, 0);
  for (let i = 1; i < 3; i++) put('lacquerGrey', bx(.003, h - .12, .002), -w / 2 + i * w / 3, .1 + (h - .1) / 2, d / 2 + .001);
  // TV on a pedestal, 50"
  put('blackMetal', bx(.3, .012, .2), 0, h + .006, -.02); put('blackMetal', bx(.06, .12, .03), 0, h + .07, -.06);
  put('blackMetal', rb(1.12, .65, .035, .006, 2), 0, h + .12 + .325, -.06); put('screen', bx(1.1, .62, .002), 0, h + .12 + .325, -.042);
  clutter.books(w / 2 - .35, h, 0, put);
  put('ceramic', cyl(.05, .07, .22, 20), -w / 2 + .2, h + .11, 0);
}

// ---- kitchen run (against the wall at local −z) --------------------------------------------------------------
function kitchenRun(put, {w, tall = null, sink = null, hob = null, wall = true}) {
  const D = .6, top = .9, x0 = -w / 2, z0 = -.3;
  const doors = (xa, xb, y0, y1, z, mat = 'lacquer', width = .6) => {
    const n = Math.max(1, Math.round((xb - xa) / width)), dw = (xb - xa) / n;
    for (let i = 0; i < n; i++) put(mat, rb(dw - .004, y1 - y0 - .004, .019, .002, 1), xa + dw * (i + .5), (y0 + y1) / 2, z + .0095);
  };
  const runs = tall ? [[x0, tall[0]], [tall[1], w / 2]] : [[x0, w / 2]];
  for (const [xa, xb] of runs) {
    if (xb - xa < .05) continue;
    put('blackMetal', bx(xb - xa, .1, D - .08), (xa + xb) / 2, .05, z0 + (D - .08) / 2);
    put('lacquer', bx(xb - xa, top - .13, D - .03), (xa + xb) / 2, .1 + (top - .13) / 2, z0 + (D - .03) / 2);
    doors(xa, xb, .1, top - .03, z0 + D - .03);
    put('splash', bx(xb - xa, .55, .008), (xa + xb) / 2, top + .275, z0 + .004);
    if (wall) {
      put('lacquer', bx(xb - xa, .7, .33), (xa + xb) / 2, 1.45 + .35, z0 + .165); doors(xa, xb, 1.45, 2.15, z0 + .33, 'lacquer', .5);
      put('bulb', bx(xb - xa - .1, .006, .012), (xa + xb) / 2, 1.447, z0 + .26);                   // under-cabinet LED strip
    }
  }
  // worktop with the sink opening
  const sk = sink ? [sink - .38, sink + .38] : null;
  const segs = []; for (const [xa, xb] of runs) { if (sk && sk[0] > xa && sk[1] < xb) segs.push([xa, sk[0]], [sk[1], xb]); else segs.push([xa, xb]); }
  for (const [xa, xb] of segs) put('worktop', bx(xb - xa, .03, D + .02), (xa + xb) / 2, top - .015, z0 + (D + .02) / 2);
  if (sk) {
    put('worktop', bx(.76, .03, .09), sink, top - .015, z0 + .045); put('worktop', bx(.76, .03, .09), sink, top - .015, z0 + D + .02 - .045);
    put('steel', bx(.74, .006, .44), sink, top - .2, z0 + .31);
    for (const [ww, dd, x, z] of [[.74, .006, 0, .09], [.74, .006, 0, .53], [.006, .44, -.37, .31], [.006, .44, .37, .31]]) put('steel', bx(ww, .19, dd), sink + x, top - .1, z0 + z);
    const tap = new T.TubeGeometry(new T.CubicBezierCurve3(new T.Vector3(0, 0, 0), new T.Vector3(0, .32, 0), new T.Vector3(0, .34, .2), new T.Vector3(0, .22, .22)), 24, .012, 10);
    put('chrome', cyl(.025, .025, .05, 16), sink, top + .025, z0 + .06); put('chrome', tap, sink, top + .03, z0 + .06);
  }
  if (hob != null) {
    put('blackGlass', bx(.59, .58, .01), hob, .45, z0 + .6); put('steel', bx(.5, .02, .02), hob, .76, z0 + .615);   // oven below
    put('blackGlass', bx(.6, .006, .52), hob, top + .003, z0 + .3);
    for (const [dx, dz, r] of [[-.15, -.1, .1], [.15, -.1, .08], [-.15, .12, .08], [.15, .12, .1]]) put('lacquerGrey', new T.TorusGeometry(r, .0025, 4, 40).rotateX(Math.PI / 2), hob + dx, top + .0065, z0 + .3 + dz);
    if (wall) put('steel', bx(.6, .04, .3), hob, 1.43, z0 + .15);
  }
  if (tall) {                                                                                       // fridge column
    const [a, b] = tall;
    put('lacquer', bx(b - a, 2.15, D), (a + b) / 2, 1.075, z0 + D / 2);
    put('lacquer', rb(b - a - .004, 1.3, .02, .002, 1), (a + b) / 2, .76, z0 + D + .01); put('lacquer', rb(b - a - .004, .8, .02, .002, 1), (a + b) / 2, 1.76, z0 + D + .01);
  }
}

// ---- bedrooms ----------------------------------------------------------------------------------------------
function bed(put, {w, l, double: dbl}) {
  const z0 = -l / 2, top = .54;
  put('fabric', rb(w + .14, 1.05, .09, .03), 0, .525, z0 - .045);                                   // upholstered headboard
  put('oak', bx(w, .2, l), 0, .14, 0); put('blackMetal', bx(w - .2, .04, l - .2), 0, .02, 0);
  put('bedding', rb(w - .02, .2, l - .02, .05), 0, .34, 0);                                         // mattress
  put('lilac', rb(w + .1, .07, l * .7, .03), 0, top + .015, z0 + l * .3 + l * .35 + .03);            // duvet over the lower 70 %
  for (const s of [-1, 1]) put('lilac', rb(.035, .26, l * .7, .015), s * (w / 2 + .035), top - .12, z0 + l * .65 + .03);
  put('lilac', rb(w + .1, .26, .035, .015), 0, top - .12, l / 2 + .045);
  put('bedding', rb(w + .02, .08, .28, .03), 0, top + .01, z0 + l * .3 - .1);                        // folded sheet
  const pillows = dbl ? [-w / 4, w / 4] : [0];
  for (const x of pillows) {
    put('bedding', rb(dbl ? w / 2 - .08 : w - .22, .13, .42, .06), x, top + .07, z0 + .25, 0, -6);            // pillow, lying
    put('lilac', rb(dbl ? .5 : .46, .4, .13, .06), x, top + .24, z0 + .43, 0, -16);                         // cushion, leaning back
  }
  if (dbl) put('cushion', rb(w + .12, .03, .5, .012), 0, top + .06, l / 2 - .32);                    // throw at the foot
}
function nightstand(put, it, {lamps}) {
  put('lacquer', rb(.46, .42, .38, .006, 2), 0, .21 + .05, 0); put('lacquerGrey', bx(.44, .003, .002), 0, .33, .191);
  for (const sx of [-1, 1]) put('blackMetal', bx(.02, .05, .3), sx * .2, .025, 0);
  put('ceramic', cyl(.05, .07, .25, 20), .06, .47 + .125, -.04); put('lampShade', cyl(.11, .14, .2, 28, true), .06, .47 + .32, -.04);
  lamps.push({x: it.at(.06, .78, -.04), kind: 'table'});
}
function wardrobe(put, {w, d = .6, h = 2.55}) {
  put('lacquer', bx(w, h, d - .02), 0, h / 2, -.01);
  const n = Math.max(1, Math.round(w / .5)), dw = w / n;
  for (let i = 0; i < n; i++) {
    put('lacquer', rb(dw - .004, h - .1, .02, .002, 1), -w / 2 + dw * (i + .5), .1 + (h - .1) / 2, d / 2 - .01);
    put('steel', bx(.012, .32, .02), -w / 2 + dw * (i + (i % 2 ? .1 : .9)), 1.05, d / 2 + .012);
  }
}

// ---- bathrooms ---------------------------------------------------------------------------------------------
const lathe = (pts, n = 40) => new T.LatheGeometry(pts.map(([x, y]) => new T.Vector2(x, y)), n);
function toilet(put) {
  // close-coupled WC: pedestal and bowl turned in the lathe (oval in plan), seat and lid, cistern against the wall
  put('ceramic', lathe([[0, 0], [.12, 0], [.13, .06], [.11, .2], [.15, .3], [.19, .38], [.18, .4], [.15, .39], [.06, .3], [0, .29]]).scale(1, 1, 1.35), 0, 0, .06);
  put('ceramic', cyl(.19, .19, .025, 40).scale(1, 1, 1.32), 0, .415, .06); put('ceramic', cyl(.185, .185, .02, 40).scale(1, 1, 1.3), 0, .44, .05);
  put('ceramic', rb(.36, .38, .16, .04), 0, .64, -.2); put('chrome', cyl(.022, .022, .012, 20), 0, .835, -.2);
}
function basin(put, it, {mirrors}) {
  // wall-hung vanity, stone-white slab and a ceramic bowl on it, tall mixer, mirror with a light strip, towel
  put('lacquer', rb(.6, .42, .45, .006, 2), 0, .6, -.005); put('lacquerGrey', bx(.58, .003, .002), 0, .6, .218);
  put('ceramic', rb(.62, .035, .47, .008, 2), 0, .83, 0);
  put('ceramic', lathe([[0, 0], [.12, 0], [.17, .03], [.19, .11], [.185, .125], [.17, .12], [.155, .04], [0, .025]]).scale(1, 1, .8), 0, .848, .03);
  put('chrome', cyl(.016, .016, .26, 14), 0, .98, -.16); put('chrome', bx(.02, .02, .13), 0, 1.1, -.1); put('chrome', bx(.012, .05, .012), 0, 1.07, -.04);
  put('blackMetal', bx(.62, .82, .012), 0, 1.5, -.226); mirrors.push({it, x: 0, y: 1.5, z: -.218, w: .6, h: .8});
  const soap = cyl(.028, .028, .14, 18); tint(soap, '#d9d2c4'); put('tinted', soap, .21, .92, -.15); put('chrome', cyl(.008, .008, .04, 8), .21, 1.01, -.15);
  const cup = cyl(.035, .03, .1, 18); tint(cup, '#3c4a52'); put('tinted', cup, -.22, .9, -.16);
  put('bulb', bx(.5, .015, .01), 0, 1.92, -.21);
  put('fabric', rb(.35, .45, .03, .01), .5, 1.0, -.21);
}
function shower(put, {w, d}) {
  put('resin', rb(w, .035, d, .01), 0, .0175, 0);
  put('glass', bx(.008, 1.95, d * .62), w / 2 - .02, 1.0, -d / 2 + d * .31); put('chrome', bx(.02, 1.95, .02), w / 2 - .02, 1.0, -d / 2 + d * .62);
  put('chrome', cyl(.012, .012, 1.1, 12), 0, 1.55, -d / 2 + .05); put('chrome', cyl(.11, .11, .01, 28), 0, 2.1, -d / 2 + .15);
  put('glass', bx(.36, .008, .12), -w / 2 + .25, 1.1, -d / 2 + .06);                                // corner shelf
  [['#e9e4da', .035, .19], ['#7d8f7a', .03, .16], ['#2f3437', .028, .21]].forEach(([c, r, h], i) => { const b = cyl(r, r, h, 16); tint(b, c); put('tinted', b, -w / 2 + .14 + i * .08, 1.104 + h / 2, -d / 2 + .06); });
  put('chrome', bx(.02, .02, .12), 0, 2.1, -d / 2 + .09);
}

// ---- terraces ----------------------------------------------------------------------------------------------
function sunbed(put, {w, d}) {
  const x = w / 2 - .03;
  for (const s of [-1, 1]) put('teak', bx(.05, .1, d), s * x, .28, 0);
  for (const [s, z] of [[-1, d / 2 - .06], [1, d / 2 - .06]]) put('teak', bx(.05, .25, .05), s * x, .125, z);
  for (let z = -d / 2 + .7; z < d / 2 - .05; z += .09) put('teak', bx(w - .1, .02, .07), 0, .32, z);
  put('cushion', rb(w - .12, .08, d - .75, .035), 0, .37, .37 - .05);
  put('cushion', rb(w - .12, .08, .7, .035), 0, .5, -d / 2 + .3, 0, 32);
  put('teak', bx(w - .1, .02, .7), 0, .45, -d / 2 + .33, 0, 32);
}
function teakTable(put, {w, d}) {
  for (let x = -w / 2 + .05; x < w / 2; x += .1) put('teak', bx(.085, .025, d - .08), x, .735, 0);
  put('blackMetal', bx(w, .04, .04), 0, .7, d / 2 - .04); put('blackMetal', bx(w, .04, .04), 0, .7, -d / 2 + .04);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) put('blackMetal', bx(.04, .72, .04), sx * (w / 2 - .04), .36, sz * (d / 2 - .04));
}
function teakChair(put) {
  for (const sx of [-1, 1]) { put('blackMetal', bx(.02, .82, .02), sx * .22, .41, -.2); put('blackMetal', bx(.02, .44, .02), sx * .22, .22, .2); put('blackMetal', bx(.02, .02, .42), sx * .22, .44, 0); }
  put('teak', bx(.46, .02, .44), 0, .45, 0); put('cushion', rb(.44, .05, .42, .02), 0, .485, .01);
  for (const y of [.62, .74]) put('teak', bx(.46, .07, .02), 0, y, -.21, 0, -6);
}
function wickerChair(put) {
  put('wicker', rb(.82, .34, .8, .06), 0, .2, 0);
  for (const sx of [-1, 1]) put('wicker', rb(.13, .32, .78, .06), sx * .345, .52, 0);
  put('wicker', rb(.82, .44, .14, .06), 0, .56, -.33, 0, -6);
  put('cushion', rb(.58, .12, .62, .05), 0, .43, .06); put('cushion', rb(.56, .38, .14, .07), 0, .66, -.22, 0, -14);
  put('bedding', rb(.36, .32, .12, .06), .1, .6, -.1, 20, -20);
}
function wickerSofa(put) {                                                                           // crescent, three segments on an arc
  const R = 1.0;
  for (const a of [-38, 0, 38]) {
    const ar = a * D2R, x = Math.sin(ar) * R, z = R - Math.cos(ar) * R - .1;
    put('wicker', rb(.68, .34, .78, .06), x, .2, z, a); put('wicker', rb(.7, .4, .14, .06), x - Math.sin(ar) * .32, .56, z + -Math.cos(ar) * .32, a, -6);
    put('cushion', rb(.64, .12, .6, .05), x + Math.sin(ar) * .05, .43, z + Math.cos(ar) * .05, a);
    put('bedding', rb(.42, .34, .13, .06), x - Math.sin(ar) * .18, .62, z - Math.cos(ar) * .18, a, -18);
  }
  for (const s of [-1, 1]) { const ar = s * 62 * D2R; put('wicker', rb(.13, .32, .7, .06), Math.sin(ar) * R * .95, .52, R - Math.cos(ar) * R * .95 - .1, s * 62); }
}
function wickerTable(put) {
  const top = cyl(.5, .5, .04, 40).scale(1, 1, .45);
  put('wicker', top, 0, .38, 0); put('wicker', cyl(.42, .44, .3, 40, true).scale(1, 1, .42), 0, .2, 0);
}
function planter(put, it, {inst}) {
  const {r = .35, h = .55, bed = false, flowers = false, d = .8} = it;
  if (bed) put('plantPot', rb(r * 2, h, d, .02), 0, h / 2, 0); else put('plantPot', cyl(r, r * .78, h, 32), 0, h / 2, 0);
  put('soil', bed ? bx(r * 2 - .04, .02, d - .04) : cyl(r - .02, r - .02, .02, 28), 0, h - .03, 0);
  inst.foliage(it, {cx: 0, cy: h + (bed ? .25 : .35), cz: 0, rx: bed ? r * 1.1 : r * 1.25, ry: bed ? .32 : .45, rz: bed ? d / 2 + .05 : r * 1.25, n: bed ? 520 : 700, flowers});
}

// ---- lights ------------------------------------------------------------------------------------------------
function pendant(put, it, {lamps}) {
  put('blackMetal', cyl(.004, .004, 1.1, 6), 0, 2.6 - .55, 0); put('blackMetal', cyl(.06, .06, .02, 20), 0, 2.59, 0);
  put('blackMetal', new T.SphereGeometry(.2, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), 0, 1.38, 0); put('bulb', new T.SphereGeometry(.05, 16, 8), 0, 1.36, 0);
  lamps.push({x: it.at(0, 1.33, 0), kind: 'pendant', bake: true, intensity: 1.6});
}
function downlight(put, it, {lamps}) {
  put('lacquer', cyl(.05, .05, .006, 24), 0, 2.597, 0); put('bulb', cyl(.035, .035, .004, 24), 0, 2.593, 0);
  lamps.push({x: it.at(0, 2.58, 0), kind: 'down', bake: true, intensity: 1});
}
function ceilingLamp(put, it, {lamps}) {
  put('lampShade', cyl(.2, .2, .07, 40), 0, 2.565, 0); put('blackMetal', cyl(.21, .21, .01, 40), 0, 2.6, 0);
  lamps.push({x: it.at(0, 2.5, 0), kind: 'ceiling', bake: true, intensity: 1.4});
}

// ---- clutter instancing: foliage (leaves + blossoms) and books ---------------------------------------------
function clutter(materials) {
  const leaves = [], blooms = [], books = [];
  const r = rng(77);
  return {
    foliage(it, {cx, cy, cz, rx, ry, rz, n, flowers, scale = 1, sage = false}) {
      for (let k = 0; k < n; k++) {
        const u = r() * 2 - 1, th = r() * Math.PI * 2, s = Math.cbrt(.35 + .65 * r()), q = Math.sqrt(1 - u * u);
        const p = new T.Vector3(cx + Math.cos(th) * q * rx * s, cy + u * ry * s, cz + Math.sin(th) * q * rz * s);
        const w = it.at(p.x, p.y, p.z);
        const yaw = r() * Math.PI * 2, pitch = (r() - .5) * 1.6, sc = (.7 + r() * .6) * scale;
        (flowers && r() < .22 ? blooms : leaves).push({p: w, yaw: yaw + (it.yaw || 0), pitch, sc, dark: r() < .4, sage, room: it.room});
      }
    },
    books(x, y, z, put) {
      let px = x - .14;
      for (let k = 0; k < 9; k++) { const w = .02 + r() * .025, h = .17 + r() * .07; books.push({w, h, d: .14 + r() * .05, p: [px, y + h / 2, z], put}); px += w + .002; }
    },
    meshes() {
      const out = [], m4 = new T.Matrix4(), q = new T.Quaternion(), e = new T.Euler(), col = new T.Color();
      // a pointed leaf: raised midrib, curved edges, slightly cupped
      const leafGeo = new T.BufferGeometry();
      leafGeo.setAttribute('position', new T.Float32BufferAttribute([0, 0, 0, 0, .01, .04, 0, .012, .075, 0, .004, .115,
        -.024, .004, .03, -.03, .006, .06, -.018, .005, .09, .024, .004, .03, .03, .006, .06, .018, .005, .09], 3));
      leafGeo.setIndex([0, 4, 1, 1, 4, 5, 1, 5, 2, 2, 5, 6, 2, 6, 3, 0, 1, 7, 1, 8, 7, 1, 2, 8, 2, 9, 8, 2, 3, 9]);
      leafGeo.computeVertexNormals();
      for (const [list, mat, tint] of [[leaves, materials.leaf, null], [blooms, materials.leaf, '#e0703a']]) {
        if (!list.length) continue;
        const im = new T.InstancedMesh(leafGeo, mat, list.length);
        list.forEach((l, i) => {
          e.set(l.pitch, l.yaw, 0, 'YXZ'); m4.compose(l.p, q.setFromEuler(e), new T.Vector3(l.sc, l.sc, l.sc)); im.setMatrixAt(i, m4);
          im.setColorAt(i, col.set(tint || (l.sage ? (l.dark ? '#7d8f7a' : '#9aab95') : l.dark ? '#4a6338' : '#6f8c52')).offsetHSL((r() - .5) * .04, 0, (r() - .5) * .08));
        });
        im.castShadow = im.receiveShadow = true; out.push(im);
      }
      const bookColors = ['#3d4a5c', '#a3452f', '#d8cfbf', '#6b7b5a', '#2f2f33', '#c79a4b', '#8e9aa6', '#e7e1d6'];
      for (const b of books) {
        const g = bx(b.w, b.h, b.d), c = new T.Color(bookColors[Math.floor(r() * bookColors.length)]), cols = new Float32Array(g.getAttribute('position').count * 3);
        for (let i = 0; i < cols.length; i += 3) c.toArray(cols, i);
        g.setAttribute('color', new T.BufferAttribute(cols, 3)); b.put('tinted', g, ...b.p);
      }
      return out;
    },
  };
}

// ---- decor: what a photographer's stylist brings (rug, plants, art, objects) ----------------------------------
function rug(put, {w, d}) { put('rug', rb(w, .014, d, .006, 3), 0, .007, 0); }
function plantTall(put, it, {inst}) {
  put('plantPot', new T.LatheGeometry([[0, 0], [.19, 0], [.22, .05], [.24, .42], [.22, .44]].map(([x, y]) => new T.Vector2(x, y)), 40), 0, 0, 0);
  put('soil', cyl(.21, .21, .02, 24), 0, .42, 0);
  put('oak', cyl(.018, .025, 1.1, 8), .02, .95, 0, 0, 4); put('oak', cyl(.012, .015, .5, 8), -.08, 1.35, .05, 0, -20, 15);
  inst.foliage(it, {cx: 0, cy: 1.55, cz: 0, rx: .42, ry: .4, rz: .42, n: 1500, scale: .85});
}
function art(put, it, {materials, artwork}) {
  const {aw: w = .8, ah: h = 1.0, ay: y = 1.55} = it, name = artwork(it.seed || 1);              // metres (not plan pixels)
  put('blackMetal', bx(w, h, .025), 0, y, .0125); put('lacquer', bx(w - .04, h - .04, .004), 0, y, .027);
  put(name, new T.PlaneGeometry(w - .16, h - .16), 0, y, .0295, 0, 0, 0, {boxUV: false});
}
function vase(put, it, {inst}) {
  put('ceramic', new T.LatheGeometry([[0, 0], [.06, 0], [.09, .08], [.07, .2], [.04, .25], [.045, .27]].map(([x, y]) => new T.Vector2(x, y)), 32), 0, it.top || .75, 0);
  for (const [a, l] of [[-14, .36], [6, .42], [20, .32]]) put('oak', cyl(.003, .005, l, 5), Math.sin(a * D2R) * l / 2, (it.top || .75) + .25 + l / 2 * Math.cos(a * D2R), 0, 0, 0, a);
  inst.foliage(it, {cx: 0, cy: (it.top || .75) + .52, cz: 0, rx: .2, ry: .12, rz: .12, n: 110, scale: .45, sage: true});
}
function fruitBowl(put, it) {
  const y = it.top || .9;
  put('oak', new T.SphereGeometry(.15, 32, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2).scale(1, .45, 1), 0, y + .07, 0);
  const fruit = [['#e8892b', .04], ['#e8892b', .04], ['#e6c84a', .037], ['#9bb54a', .04], ['#e8892b', .039]];
  fruit.forEach(([c, r], i) => { const a = i * 1.3, g = new T.SphereGeometry(r, 16, 12); tint(g, c); put('tinted', g, Math.cos(a) * .06, y + .06 + (i > 3 ? .04 : 0), Math.sin(a) * .06); });
}
function kettle(put, it) {
  const y = it.top || .9;
  put('steel', new T.LatheGeometry([[0, 0], [.08, 0], [.09, .04], [.085, .16], [.05, .2], [0, .21]].map(([x, z]) => new T.Vector2(x, z)), 32), 0, y, 0);
  put('blackMetal', new T.TorusGeometry(.07, .008, 6, 24, Math.PI), 0, y + .2, 0, 90);
}
function board(put, it) { put('oak', rb(.42, .02, .28, .008, 2), 0, (it.top || .9) + .01, 0, -8); }
function herbs(put, it, {inst}) {
  put('ceramic', cyl(.06, .05, .12, 20), 0, (it.top || .9) + .06, 0);
  inst.foliage(it, {cx: 0, cy: (it.top || .9) + .2, cz: 0, rx: .1, ry: .08, rz: .1, n: 110, scale: .45});
}
function bookStack(put, it) {
  const y = it.top || .41;
  [['#d8cfbf', .26, .2, .03], ['#3d4a5c', .24, .18, .025], ['#a3452f', .22, .16, .02]].forEach(([c, w, d, h], i) => {
    const g = bx(w, h, d); tint(g, c); put('tinted', g, 0, y + h / 2 + i * .027, 0, i * 7 - 5);
  });
}
function bathMat(put, {w = .5, d = .8}) { put('boucle', rb(w, .01, d, .004, 2), 0, .005, 0); }
function sofaThrow(put) {
  put('cushionAccent', rb(.5, .02, .55, .01), 0, .69, 0); put('cushionAccent', rb(.5, .45, .02, .01), 0, .47, .28);
}
function floorLamp(put, it, {lamps}) {
  put('stone', cyl(.15, .16, .04, 32), 0, .02, 0);
  const arc = new T.TubeGeometry(new T.QuadraticBezierCurve3(new T.Vector3(0, .04, 0), new T.Vector3(0, 2.1, .15), new T.Vector3(0, 1.75, 1.15)), 40, .012, 8);
  put('brass', arc, 0, 0, 0); put('blackMetal', new T.SphereGeometry(.17, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), 0, 1.6, 1.15);
  put('bulb', new T.SphereGeometry(.04, 12, 8), 0, 1.6, 1.15);
  lamps.push({x: it.at(0, 1.55, 1.15), kind: 'table'});
}
function tint(g, c) {
  const col = new T.Color(c), a = new Float32Array(g.getAttribute('position').count * 3);
  for (let i = 0; i < a.length; i += 3) col.toArray(a, i);
  g.setAttribute('color', new T.BufferAttribute(a, 3));
}

const BUILD = {sofaL, chair: chairUpholstered, table: glassTable, coffee: coffeeTable, kitchen: kitchenRun, bed, wardrobe, toilet, basin, shower,
  sunbed, teakTable, teakChair, wickerChair, wickerSofa, wickerTable, tvUnit, nightstand, planter, pendant, downlight, ceilingLamp,
  rug, plantTall, art, vase, fruitBowl, kettle, board, herbs, bookStack, bathMat, sofaThrow, floorLamp};

// items: world-space pieces from a layout; returns meshes, instanced clutter and the lamps (for the bake and the night)
export function buildFurniture(items, materials, roomAt = () => -1) {
  const P = new Parts(), lamps = [], inst = clutter(materials), mirrors = [];
  const ctx = {inst, lamps, materials, mirrors, artwork: seed => { const k = 'art-' + seed; materials[k] ||= artMaterial(seed); return k; }};
  for (const it of items) {
    it.at = (x, y, z) => new T.Vector3(x, y, z).applyMatrix4(place(it.x, 0, it.z, it.yaw || 0));
    it.room = roomAt(it.x, it.z);
    BUILD[it.k]?.(placer(P, it, it.room), it, ctx);
  }
  const extra = inst.meshes();                                  // books join the merged parts, foliage stays instanced
  // bathroom mirrors: true planar reflections (rendered only while in view)
  for (const m of mirrors) {
    const r = new Reflector(new T.PlaneGeometry(m.w, m.h), {textureWidth: 512, textureHeight: 680, color: '#c9cdcf', clipBias: .003});
    r.position.copy(m.it.at(m.x, m.y, m.z)); r.rotation.y = m.it.yaw || 0; r.userData.room = m.it.room; extra.push(r);
  }
  return {meshes: [...P.meshes(materials), ...extra], lamps};
}

// an abstract print on cotton paper, drawn on a canvas (earth palette, soft shapes), one per seed
function artMaterial(seed) {
  const r = rng(seed * 7919), c = Object.assign(document.createElement('canvas'), {width: 512, height: 640}), x = c.getContext('2d');
  const pal = ['#c0704d', '#8f9d84', '#d9c3a5', '#3b3a38', '#c99a4a', '#b9c4c9', '#e4d7c4'];
  x.fillStyle = '#f3efe7'; x.fillRect(0, 0, 512, 640);
  for (let k = 0; k < 4; k++) {
    x.fillStyle = pal[Math.floor(r() * pal.length)]; x.globalAlpha = .85;
    const cx = 80 + r() * 350, cy = 100 + r() * 440, rad = 70 + r() * 150;
    x.beginPath();
    if (r() < .4) x.arc(cx, cy, rad, 0, Math.PI * 2);
    else if (r() < .6) { x.moveTo(cx - rad, cy + rad); x.lineTo(cx - rad, cy); x.arc(cx, cy, rad, Math.PI, 0); x.lineTo(cx + rad, cy + rad); }
    else x.ellipse(cx, cy, rad, rad * (.4 + r() * .5), r() * 3, 0, Math.PI * 2);
    x.fill();
  }
  x.globalAlpha = .06; for (let k = 0; k < 4000; k++) { x.fillStyle = r() < .5 ? '#000' : '#fff'; x.fillRect(r() * 512, r() * 640, 1.5, 1.5); }
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4;
  return new T.MeshStandardMaterial({map: t, roughness: .9});
}
