// Furniture layouts transcribed from Bamaire's published plans (dist/models/<promotion>/plans/<code>.jpg).
// Coordinates are plan-image pixels (the image spans the traced grid exactly); r is the facing in degrees
// (0 = the piece's front looks down the plan, 90 = right, −90 = left, 180 = up). Sizes are plan pixels too.
// Pieces marked as wall-backed are pushed onto the nearest wall behind them when placed.
import * as T from 'three';
import {autoLayout} from './autolayout.js';

const PLAN_PX = 1100;                                    // long side of the plan images

export const LAYOUTS = {
  '5B': [
    // kitchen: tall fridge column left of the pillar, sink and hob on the long run (plan: 425–515 and 547–720 px)
    {k: 'kitchen', x: 470, y: 43.5, w: 90, r: 0, tall: [482, 514], wall: false},
    {k: 'kitchen', x: 633.5, y: 43.5, w: 173, r: 0, sink: 583, hob: 656},
    {k: 'table', x: 594, y: 178.5, w: 44, d: 73, r: 0},
    {k: 'chair', x: 562, y: 158, r: 90}, {k: 'chair', x: 562, y: 200, r: 90}, {k: 'chair', x: 626, y: 158, r: -90}, {k: 'chair', x: 626, y: 200, r: -90},
    {k: 'chair', x: 594, y: 130, r: 0}, {k: 'chair', x: 594, y: 227, r: 180},
    {k: 'sofaL', x: 510.5, y: 335, L: 150, D: 43, E: 87, Dr: 44, r: 90},
    {k: 'coffee', x: 562.5, y: 322, w: 54, d: 33, r: 90},
    {k: 'tvUnit', x: 710, y: 320, w: 100, d: 22, r: -90},
    {k: 'pendant', x: 594, y: 178.5},
    {k: 'downlight', x: 575, y: 85}, {k: 'downlight', x: 655, y: 85}, {k: 'downlight', x: 470, y: 85},
    {k: 'downlight', x: 405, y: 105}, {k: 'downlight', x: 380, y: 160}, {k: 'downlight', x: 650, y: 330}, {k: 'downlight', x: 560, y: 380},
    // bedroom 1 (double), bedrooms 2 and 3 (twin beds), as drawn
    {k: 'wardrobe', x: 50.5, y: 199.5, w: 95, d: 31, r: 90},
    {k: 'bed', x: 92, y: 337.5, w: 86, l: 107, r: 90, double: true},
    {k: 'nightstand', x: 48, y: 271.5, r: 90}, {k: 'nightstand', x: 48, y: 401, r: 90},
    {k: 'wardrobe', x: 221.5, y: 230.5, w: 69, d: 31, r: 0},
    {k: 'bed', x: 238, y: 298.5, w: 48, l: 102, r: 90}, {k: 'bed', x: 238, y: 382, w: 48, l: 102, r: 90}, {k: 'nightstand', x: 199.5, y: 340, r: 90},
    {k: 'wardrobe', x: 446, y: 230.5, w: 68, d: 31, r: 0},
    {k: 'bed', x: 430, y: 298.5, w: 48, l: 102, r: -90}, {k: 'bed', x: 430, y: 382, w: 48, l: 102, r: -90}, {k: 'nightstand', x: 468.5, y: 340, r: -90},
    {k: 'ceilingLamp', x: 110, y: 330}, {k: 'ceilingLamp', x: 260, y: 340}, {k: 'ceilingLamp', x: 410, y: 340},
    {k: 'downlight', x: 200, y: 168}, {k: 'downlight', x: 300, y: 168}, {k: 'downlight', x: 100, y: 95}, {k: 'downlight', x: 265, y: 95},
    // bathrooms: shower tray along the left wall, WC and washbasin on the back wall
    {k: 'shower', x: 56, y: 103.5, w: 42, d: 83, r: 0}, {k: 'toilet', x: 100.5, y: 79, r: 0}, {k: 'basin', x: 140, y: 75, r: 0},
    {k: 'shower', x: 213.5, y: 103.5, w: 42, d: 83, r: 0}, {k: 'toilet', x: 261, y: 72, r: 0}, {k: 'basin', x: 302.5, y: 74, r: 0},
    // terrace: two sunbeds, planters, the teak dining set and the wicker lounge
    {k: 'sunbed', x: 858, y: 80, w: 44, d: 102, r: 0}, {k: 'sunbed', x: 932, y: 80, w: 44, d: 102, r: 0},
    {k: 'planter', x: 804, y: 47, rpx: 20}, {k: 'planter', x: 1046, y: 106, rpx: 20}, {k: 'planter', x: 1046, y: 377, rpx: 11, dpx: 42, bed: true, flowers: true},
    {k: 'teakTable', x: 1020, y: 256.5, w: 46, d: 85, r: 0},
    {k: 'teakChair', x: 988, y: 237, r: 90}, {k: 'teakChair', x: 988, y: 276, r: 90}, {k: 'teakChair', x: 1052, y: 237, r: -90}, {k: 'teakChair', x: 1052, y: 276, r: -90},
    {k: 'teakChair', x: 1020, y: 204, r: 0}, {k: 'teakChair', x: 1020, y: 310, r: 180},
    {k: 'wickerChair', x: 777, y: 277, r: 30}, {k: 'wickerSofa', x: 790, y: 360, r: 136}, {k: 'wickerChair', x: 882, y: 377, r: -120}, {k: 'wickerTable', x: 812, y: 337, r: -40},
    {k: 'planter', x: 605, y: 487, rpx: 12, dpx: 30, bed: true, flowers: true}, {k: 'planter', x: 780, y: 458, rpx: 18},
    {k: 'planter', x: 245, y: 490, rpx: 18}, {k: 'wickerChair', x: 38, y: 468, r: 60},
    // staging, as a photographer's stylist would dress it (not in the published plan)
    {k: 'rug', x: 598, y: 325, w: 115, d: 100}, {k: 'plantTall', x: 707, y: 254}, {k: 'floorLamp', x: 498, y: 250, r: 135},
    {k: 'sofaThrow', x: 511, y: 266, r: 180}, {k: 'bookStack', x: 556, y: 312, top: .406}, {k: 'vase', x: 594, y: 178.5, top: .762},
    {k: 'fruitBowl', x: 445, y: 45, top: .9}, {k: 'board', x: 624, y: 42, top: .9}, {k: 'herbs', x: 690, y: 37, top: .9}, {k: 'kettle', x: 712, y: 45, top: .9},
    {k: 'art', x: 492, y: 322, r: 90, aw: 1.0, ah: .75, ay: 1.5, seed: 3},
    {k: 'art', x: 38, y: 337, r: 90, aw: 1.1, ah: .7, ay: 1.62, seed: 5}, {k: 'art', x: 190, y: 340, r: 90, aw: .5, ah: .7, ay: 1.45, seed: 8},
    {k: 'art', x: 477, y: 340, r: -90, aw: .5, ah: .7, ay: 1.45, seed: 11},
    {k: 'bathMat', x: 97, y: 128, r: 0}, {k: 'bathMat', x: 253, y: 128, r: 0},
    {k: 'rug', x: 815, y: 335, w: 120, d: 95, r: 0}, {k: 'planter', x: 762, y: 405, rpx: 15},
  ],
};

// photographer's shots per dwelling (plan pixels: camera → what it looks at; h = lens height; fov horizontal)
export const SHOTS = {
  '5B': [
    {name: 'Salón-Comedor-Cocina', from: [706, 398], to: [520, 110], h: 1.38, fov: 80},
    {name: 'Salón · salida a la terraza', from: [445, 80], to: [715, 300], h: 1.38, fov: 80},
    {name: 'Cocina', from: [660, 270], to: [540, 30], h: 1.4, fov: 76},
    {name: 'Terraza', from: [1052, 405], to: [790, 120], h: 1.45, fov: 80},
    {name: 'Dormitorio 1', from: [168, 172], to: [70, 420], h: 1.35, fov: 80},
    {name: 'Dormitorio 2', from: [322, 262], to: [205, 418], h: 1.35, fov: 80},
    {name: 'Baño 2', from: [282, 150], to: [292, 55], h: 1.5, fov: 86},
  ],
};

// how far behind its centre each wall-backed piece reaches (metres), for pushing it onto the wall
const BACK = {art: () => 0, kitchen: () => .3, wardrobe: () => .3, bed: it => it.l / 2 + .09, toilet: () => .28, basin: () => .235, tvUnit: it => it.d / 2, nightstand: () => .19};

// plan pixels → world items (metres, yaw in radians), wall-backed pieces snapped onto their wall; dwellings
// without a transcribed layout are furnished from their traced plan (autolayout.js)
export function layoutFor(plan) {
  const list = LAYOUTS[plan.u.code];
  if (!list) return autoLayout(plan);
  const {W, H, c, ox, oz, solid, cellOf} = plan, k = W * c / (W >= H ? PLAN_PX : PLAN_PX * W / H);
  const wallAt = (x, z) => { const [i, j] = cellOf(x, z); return i >= 0 && j >= 0 && i < H && j < W && (solid[i * W + j] & 0b100) !== 0; };
  return list.map(src => {
    const it = {...src, x: src.x * k - ox, y: 0, z: src.y * k - oz, yaw: (src.r || 0) * Math.PI / 180};
    for (const f of ['w', 'd', 'L', 'D', 'E', 'Dr', 'l']) if (typeof src[f] === 'number') it[f] = src[f] * k;
    if (it.k === 'kitchen') { for (const f of ['sink', 'hob']) if (src[f] != null) it[f] = (src[f] - src.x) * k; if (src.tall) it.tall = src.tall.map(p => (p - src.x) * k); }
    if (src.rpx) { it.r = src.rpx * k; it.h = it.bed ? .45 : .55; }
    if (src.dpx) it.d = src.dpx * k;
    if (it.k === 'sofaL') it.D = Math.max(it.D, .9);
    const back = BACK[it.k]?.(it);
    if (back != null) {
      // walk backwards from the centre to the first wall (checked at mid height, on three lines across the piece)
      const f = new T.Vector2(Math.sin(it.yaw), Math.cos(it.yaw)), side = new T.Vector2(f.y, -f.x), half = Math.max(.05, ((it.w || .5) / 2) - .08);
      for (let t = 0; t < back + .35; t += .01) {
        if ([-half, 0, half].some(s => wallAt(it.x - f.x * t + side.x * s, it.z - f.y * t + side.y * s))) {
          const shift = t - back - .004;
          if (Math.abs(shift) < .3) { it.x -= f.x * shift; it.z -= f.y * shift; }
          break;
        }
      }
    }
    return it;
  });
}
