// Time-of-day presets (illustrative: the dwelling's real orientation is not published), the live sun with its
// shadow map (what draws the shutter streaks), the sky, and the per-room bounce light computed from the flux
// that enters each room through its openings (sky, sun through the shutters, lamps) for the later bounces.
import * as T from 'three';
import {Sky} from 'three/addons/objects/Sky.js';
import {SHUTTER} from './architecture.js';

// sun: azimuth from the plan's "down" towards its "right", elevation, colour, irradiance; sky: tint × level;
// shutters: fraction lowered; lamps: level of the baked lamps (0 off)
export const PRESETS = {
  'Low sun': {sun: {az: 62, el: 10, color: '#ffb877', E: 26}, sky: '#c3cddb', skyE: .7, lamps: 0, shutters: .55, exposure: 1.15},
  Morning: {sun: {az: 100, el: 24, color: '#ffe0b8', E: 30}, sky: '#d2dbe6', skyE: 1, lamps: 0, shutters: .4, exposure: 1.0},
  Day: {sun: {az: 25, el: 56, color: '#fff4e6', E: 34}, sky: '#e0e6ee', skyE: 1.25, lamps: 0, shutters: .2, exposure: .9},
  Evening: {sun: {az: -28, el: 7, color: '#ff9550', E: 16}, sky: '#e0aa8e', skyE: .45, lamps: .45, shutters: .5, exposure: 1.3},
  Night: {sun: null, sky: '#22324f', skyE: .05, lamps: 1, shutters: .75, exposure: 1.25},
};

export function sunDir({az, el}) {
  const a = az * Math.PI / 180, e = el * Math.PI / 180;
  return new T.Vector3(Math.cos(e) * Math.sin(a), Math.sin(e), Math.cos(e) * Math.cos(a));
}

export function createSun(bounds) {
  const sun = new T.DirectionalLight('#ffffff', 0), size = bounds.getSize(new T.Vector3()), R = Math.hypot(size.x, size.z) / 2 + 1;
  sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096); sun.shadow.bias = -.0002; sun.shadow.normalBias = .012; sun.shadow.radius = 2;
  Object.assign(sun.shadow.camera, {left: -R, right: R, top: R, bottom: -R, near: 1, far: 80});
  const center = bounds.getCenter(new T.Vector3());
  sun.target.position.copy(center);
  sun.place = dir => { sun.position.copy(center).addScaledVector(dir, 40); sun.target.updateMatrixWorld(); sun.shadow.camera.updateProjectionMatrix(); sun.shadow.needsUpdate = true; };
  return sun;
}

export function createSky() {
  const sky = new Sky(); sky.scale.setScalar(4000);
  const u = sky.material.uniforms; u.turbidity.value = 4; u.rayleigh.value = 1.4; u.mieCoefficient.value = .004; u.mieDirectionalG.value = .85;
  return sky;
}

// irradiance of the third and later bounces per room (two are baked): ρ³/(1−ρ) × entering flux / room surface
// area, then shared through the doors
export function roomAmbient(plan, preset, {lamps = [], lampRoom = null, rho = .7} = {}) {
  const n = plan.rooms.length, flux = new Float32Array(n * 3), sky = new T.Color(preset.sky).multiplyScalar(preset.skyE);
  const sun = preset.sun ? new T.Color(preset.sun.color).multiplyScalar(preset.sun.E) : null, dir = preset.sun ? sunDir(preset.sun) : null;
  const add = (r, c, k) => { if (r < 0) return; flux[3 * r] += c.r * k; flux[3 * r + 1] += c.g * k; flux[3 * r + 2] += c.b * k; };
  const slitT = SHUTTER.slit / (SHUTTER.slat + SHUTTER.slit);
  for (const o of plan.openings) {
    if (o.kind !== 'window' && o.kind !== 'balcony') continue;
    const h = o.kind === 'window' ? 1.25 : 2.25, area = o.len * h;
    add(o.room, sky, area * 1.1);
    if (sun) {
      const nrm = o.horiz ? new T.Vector3(0, 0, -o.inside) : new T.Vector3(-o.inside, 0, 0);    // outward normal
      const cos = nrm.dot(dir);
      if (cos > 0) add(o.room, sun, area * cos * .55 * (1 - preset.shutters * (1 - slitT)));
    }
  }
  for (const l of lamps) if (l.room >= 0) add(l.room, new T.Color('#ffd9a8'), 2.5 * (l.intensity ?? 1) * (lampRoom?.[l.room] ?? preset.lamps));
  const area = plan.rooms.map(r => 2 * r.area + 10.4 * Math.sqrt(r.area)), E = [];
  for (let r = 0; r < n; r++) E.push(new T.Color(flux[3 * r], flux[3 * r + 1], flux[3 * r + 2]).multiplyScalar(plan.rooms[r].exterior ? 0 : rho ** 3 / (1 - rho) / area[r]));
  // two exchanges through the interior doors (corridors get light from the rooms around them)
  const doors = plan.openings.filter(o => o.kind === 'door' && o.rooms[0] >= 0 && o.rooms[1] >= 0);
  for (let it = 0; it < 2; it++) {
    const next = E.map(c => c.clone());
    for (const d of doors) {
      const [a, b] = d.rooms, k = d.len * 2.05 * .35;
      next[a].add(E[b].clone().multiplyScalar(k / area[a])); next[b].add(E[a].clone().multiplyScalar(k / area[b]));
    }
    E.splice(0, n, ...next);
  }
  return E;
}
