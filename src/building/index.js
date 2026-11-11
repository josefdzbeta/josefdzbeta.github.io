// The Mykonos building and its surroundings in three.js: façades, roof terraces and plot from Bamaire's published
// elevations and plans (facade.js, site.js), the neighbourhood from OpenStreetMap, PBR materials at real scale, a
// GPU bake of the sky's and the ground's light (soft shadows, sky occlusion) re-tinted for every time of day, the
// live sun with its shadow map, and the bar: Tour / Photo / Walk · Low sun … Night.
import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {GTAOPass} from 'three/addons/postprocessing/GTAOPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {packCharts} from '../apartment/geometry.js';
import {tiles, stone, noise, weave, woodGrain} from '../apartment/textures.js';
import {createBaker} from '../apartment/bake.js';
import {sunDir} from '../apartment/lighting.js';
import {buildFacades} from './facade.js';
import {buildPlot, buildContext, groundMaterial, leafTexture, STREET} from './site.js';
import {createCameras} from './cameras.js';
import {buildCars, buildCypresses, buildOutdoor, buildPlanting, buildPeople, lavenderTexture} from './props.js';
import {SKY_VERT, SKY_FRAG} from './sky.js';

const small = matchMedia('(max-width: 700px), (pointer: coarse)').matches;
const GROUND_EXTENT = [-260, 280, -270, 270];          // ground_class.png: 20 cm pixels, columns along x, rows along z

// time of day (illustrative: the scene follows the published plans, which mirror the real site). Sun: azimuth
// from +z towards +x, elevation, colour, irradiance; sky: tint × level; ground: albedo of the streets around;
// lamps: street lamps and garden lights; lit: share of windows lit; exposure of the camera
export const PRESETS = {
  'Low sun': {sun: {az: 118, el: 24, color: '#fff0e0', E: 1.1}, sky: '#bccbe4', skyE: 2.15, ground: .26, lamps: 0, lit: .06, exposure: .98, zenith: '#1166b8', horizon: '#d2dbe0', clouds: .24, trace: {sky: 1.2, sun: 1.5, sunColor: '#ffe4c4', exposure: .88, envTint: [1.04, .98, 1.08]}, skyBg: 1.2},
  Morning: {sun: {az: 125, el: 30, color: '#fff1e2', E: 1.5}, sky: '#bfcde4', skyE: 2.1, ground: .26, lamps: 0, lit: .03, exposure: .95, zenith: '#2a66b4', horizon: '#d6dde2', clouds: .3, trace: {sky: 1.1, exposure: .9}, skyBg: 1.2},
  Day: {sun: {az: 270, el: 58, color: '#fff8ef', E: 1.7}, sky: '#c4d0e4', skyE: 2.2, ground: .26, lamps: 0, lit: 0, exposure: .9, zenith: '#2563b2', horizon: '#d4dde4', clouds: .25, trace: {sky: 1.1, exposure: .9}, skyBg: 1.2},
  Evening: {sun: {az: -40, el: -3, color: '#ff9a62', E: 0}, sky: '#b2b7c8', skyE: .42, ground: .22, lamps: .9, lit: .5, exposure: 10.5, zenith: '#2c4b80', horizon: '#e4b493', fog: '#80889f', clouds: .4, cloudColor: '#c9a9a6',
    trace: {zenith: .3, horizon: 1.35, exposure: 1.5, envTint: [.76, .97, 1.2]}},   // (traced: the dusk light from low in the sky, cooler; the fields darker, as render 01)
  Night: {sun: null, sky: '#a8a6c6', skyE: .16, ground: .2, lamps: .6, lit: .45, exposure: 19, zenith: '#5a6472', horizon: '#76808c', fog: '#5b636d', clouds: .35, cloudColor: '#858e99',
    trace: {zenith: .4, horizon: 1.9, exposure: 1.12}},   // (traced: the last light low in the sky lights the walls, the ground stays dark, as render 04)
};

const GRADE = {                                  // after tone mapping: S-curve and saturation as a photo edit, vignette, grain
  uniforms: {tDiffuse: {value: null}, time: {value: 0}, vignette: {value: .18}, grain: {value: .014}, contrast: {value: .2}, saturation: {value: 1.1}},
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. ); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time, vignette, grain, contrast, saturation; varying vec2 vUv;
    float h( vec2 p ){ return fract( sin( dot( p, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
    void main(){ vec4 c = texture2D( tDiffuse, vUv ); vec2 d = vUv - .5;
      vec3 x = clamp( c.rgb, 0., 1. ); float l = dot( x, vec3( .2126, .7152, .0722 ) );
      x = mix( vec3( l ), x, saturation ); x = mix( x, x * x * ( 3. - 2. * x ), contrast ); c.rgb = x;
      c.rgb *= 1. - vignette * dot( d, d ) * 2.2;
      c.rgb += ( h( vUv * 1000. + time ) - .5 ) * grain; gl_FragColor = c; }`,
};

// diffuse light of the lightmapped surfaces: baked sky (upper hemisphere) × sky tint + baked ground (lower
// hemisphere) × ground radiance + baked street lamps × lamp level; reflections from the environment map
const EXTERIOR_CHUNK = /* glsl */`
#if defined( RE_IndirectDiffuse ) && defined( USE_LIGHTMAP )
  irradiance += texture2D( lightMap, vLightMapUv ).rgb * skyTint + texture2D( groundMap, vLightMapUv ).rgb * groundTint + texture2D( lampMap, vLightMapUv ).rgb * lampTint;
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
  radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
#endif
`;
function exterior(mat, U, lightmapped) {
  if (!lightmapped) return mat;
  mat.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, {groundMap: U.groundMap, lampMap: U.lampMap, skyTint: U.skyTint, groundTint: U.groundTint, lampTint: U.lampTint});
    sh.fragmentShader = 'uniform sampler2D groundMap, lampMap;\nuniform vec3 skyTint, groundTint, lampTint;\n' + sh.fragmentShader.replace('#include <lights_fragment_maps>', EXTERIOR_CHUNK);
  };
  mat.customProgramCacheKey = () => 'ext-lm';
  return mat;
}

function createMaterials(U) {
  // procedural textures at the resolution each is seen at (their normal maps are the costly part)
  const tex = {
    // white glazed face brick (cara vista), stretcher bond, fine grey joints
    brick: tiles({px: small ? 512 : 1024, tw: .29, th: .0625, per: 4, color: [40, 3, 95], vary: 1.8, grout: '#b9b6af', joint: .01, bond: 'running', cloud: .05, rough: .55, roughVar: .12, seed: 21}),
    // porcelain cladding of the recessed bays, horizontal courses
    cladding: tiles({px: 512, tw: 1.2, th: .5, per: 2, color: [34, 36, 88], vary: 2.2, grout: '#8d877d', joint: .005, bond: 'running', cloud: .09, rough: .42, roughVar: .08, seed: 22}),
    render: stone({color: [30, 6, 96], seed: 19, metres: 1.6, speckle: .25}),
    pavers: tiles({px: 512, tw: .6, th: .3, per: 4, color: [32, 8, 70], vary: 3, grout: '#9c968d', joint: .004, bond: 'running', speckle: .7, cloud: .1, rough: .85, roughVar: .1, seed: 16}),
    terrace: tiles({px: 512, tw: .6, th: .6, per: 3, color: [35, 6, 76], vary: 2, grout: '#a8a29a', joint: .004, speckle: .5, cloud: .08, rough: .8, seed: 17}),
    poolTile: tiles({px: 512, tw: .25, th: .25, per: 4, color: [200, 42, 76], vary: 3, grout: '#e8eef0', joint: .004, rough: .2, seed: 18}),
    coping: stone({color: [40, 8, 86], seed: 8, metres: 1.2}),
    grass: stone({color: [95, 38, 38], seed: 5, metres: .5, speckle: 1}),
    wicker: weave({color: [36, 8, 70], threads: 40, metres: .25, slub: .2, basket: true, seed: 12}), linen: weave({color: [38, 12, 86], threads: 140, metres: .15, slub: .25}),
    teak: woodGrain({px: 512}),
  };
  const maps = t => Object.fromEntries(['map', 'normalMap', 'roughnessMap'].filter(k => t?.[k]).map(k => [k, t[k]]));
  const std = (o, t) => exterior(new T.MeshStandardMaterial({...maps(t), ...o}), U, false);
  // lightmapped: both faces cast into the sun's shadow map (façades and slabs are single-sided shells)
  const arch = (o, t) => exterior(new T.MeshStandardMaterial({...maps(t), lightMapIntensity: 1, shadowSide: T.DoubleSide, ...o}), U, true);
  const water = noise(256, 256, {cells: 10, octaves: 4, seed: 3});
  const M = {
    brick: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(1.5, 1.5)}, tex.brick),
    render: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(.6, .6)}, tex.render),
    cladding: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(.5, .5)}, tex.cladding),
    slabEdge: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(.5, .5)}, tex.render),
    // balcony fronts: laminated glass with a pale green-grey interlayer, as render 03
    balcony: arch({color: '#ffffff', map: glassJoints(), roughness: .12, metalness: 0, envMapIntensity: .9, transparent: true, opacity: .8}),
    terrace: arch({color: '#ffffff', roughness: 1}, tex.terrace),
    roof: arch({color: '#5f6c7c', roughness: .92}),                      // blue-grey waterproofing (render 01)
    shutter: arch({color: '#b4b8ba', roughness: .5, metalness: .25}),
    paving: arch({color: '#ffffff', roughness: 1}, tex.pavers),
    coping: arch({color: '#ece8e0', roughness: .8}, tex.coping),
    poolTile: arch({color: '#ffffff', roughness: 1, emissive: '#000000', emissiveMap: caustics()}, tex.poolTile),
    grass: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(1.5, 1.5)}, tex.grass),
    ramp: arch({color: '#6e6f70', roughness: .9}),
    wallWhite: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(.5, .5)}, tex.render),
    // not lightmapped
    glass: std({color: '#1a2126', roughness: .03, metalness: .05, transparent: true, opacity: .8, depthWrite: false, envMapIntensity: 1.4}),
    room: std({color: '#9a9288', roughness: .9, envMapIntensity: .12, emissive: '#000000'}),
    roomLit: std({color: '#9a9288', roughness: .9, envMapIntensity: .12, emissive: '#000000', emissiveMap: roomGlow()}),
    roomFloor: std({color: '#6f6052', roughness: .7, envMapIntensity: .12}),
    curtain: std({color: '#e4e0d6', roughness: 1, envMapIntensity: .3, side: T.DoubleSide}),
    reveal: std({color: '#b8b2a8', roughness: .9, envMapIntensity: .12}),
    dark: std({color: '#1c1d1f', roughness: .9}),
    sill: std({color: '#e7e3dc', roughness: .55}, tex.coping), cap: std({color: '#eeece7', roughness: .6}),
    pvc: std({color: '#e4e5e3', roughness: .45, metalness: 0}), garageDoor: std({color: '#c9cac8', roughness: .45, metalness: .3}), alu: std({color: '#9aa0a6', roughness: .35, metalness: .7}),
    slats: std({color: '#8c9196', roughness: .45, metalness: .5}), lounger: std({color: '#f2f0ea', roughness: .6}),
    glassFence: std({color: '#dfe8e6', roughness: .05, transparent: true, opacity: .22, depthWrite: false}),
    // pool water: clear enough to show the tiled basin, gentle ripples (strong ones mirror the sky in blotches)
    water: std({color: '#3fa4dc', roughness: .03, metalness: 0, transparent: true, opacity: .55, normalMap: normalFromNoise(water, 256), normalScale: new T.Vector2(.05, .05), envMapIntensity: .9}),
    neighbour: std({color: '#e6e1d8', roughness: .9}),
    canopy: std({color: '#ffffff', roughness: .8, map: leafTexture(), alphaTest: .45, side: T.DoubleSide}), trunk: std({color: '#6a6057', roughness: .95}),
    lampPole: std({color: '#1d3a6b', roughness: .45, metalness: .5}),
    lampGlow: new T.MeshBasicMaterial({color: '#fff4dc'}),
    // cars and terrace plants
    carPaint: exterior(new T.MeshPhysicalMaterial({color: '#ffffff', roughness: .38, metalness: .12, clearcoat: .55, clearcoatRoughness: .12, envMapIntensity: .8}), U, false),
    carGlass: std({color: '#101418', roughness: .05, metalness: .2}), tyre: std({color: '#1b1c1e', roughness: .85}),
    headlight: new T.MeshBasicMaterial({color: '#d9dcdf'}), taillight: new T.MeshBasicMaterial({color: '#5a0d0d'}),
    pot: std({color: '#d6d1c7', roughness: .8}), cypress: std({color: '#4f6340', roughness: .9}),
    // patio and terrace furniture (the dwelling viewer's outdoor pieces)
    wicker: std({color: '#ffffff', roughness: .85}, tex.wicker), teak: std({color: '#ffffff', roughness: .6}, tex.teak),
    cushion: std({color: '#ece8e0', roughness: .95, normalScale: new T.Vector2(.35, .35)}, tex.linen), bedding: std({color: '#f4f2ed', roughness: .95}, tex.linen),
    blackMetal: std({color: '#1d1e20', roughness: .4, metalness: .7}), plantPot: std({color: '#d8d2c6', roughness: .8}), soil: std({color: '#3b2f25', roughness: 1}),
    leaf: std({color: '#ffffff', roughness: .6, side: T.DoubleSide}), lattice: std({color: '#ffffff', map: lattice(), alphaTest: .5, side: T.DoubleSide, roughness: .6}),
    lavender: std({color: '#ffffff', roughness: .85, map: lavenderTexture(), alphaTest: .4, side: T.DoubleSide}), bollard: std({color: '#3a3d41', roughness: .5, metalness: .4}), person: std({color: '#ffffff', roughness: .8, vertexColors: true}),
  };
  M.water.normalMap.repeat.set(1 / 1.5, 1 / 1.5);
  // neighbours: rendered blocks with a window grid on their walls
  M.neighbour.onBeforeCompile = sh => {
    sh.vertexShader = 'varying vec2 vMetres; varying float vUp;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\n\tvMetres = uv; vUp = abs( normal.y );');
    sh.fragmentShader = 'varying vec2 vMetres; varying float vUp;\n' + sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      vec2 gw = fract( vec2( vMetres.x / 3.4, ( vMetres.y - 1.2 ) / 3. ) );
      float win = step( .28, gw.x ) * step( gw.x, .72 ) * step( .3, gw.y ) * step( gw.y, .78 ) * step( vUp, .5 ) * step( 1.2, vMetres.y );
      diffuseColor.rgb *= mix( 1., .28, win ); diffuseColor.rgb *= mix( 1., .85, step( .5, vUp ) );`);
  };
  M.neighbour.customProgramCacheKey = () => 'neighbour';
  for (const [k, m] of Object.entries(M)) m.name = k;
  return M;
}
// laminated glass of the balcony fronts: grey-green, with the vertical joints of its ≈1,15 m panels
function glassJoints() {
  const c = Object.assign(document.createElement('canvas'), {width: 256, height: 8}), x = c.getContext('2d');
  x.fillStyle = '#c6d1cd'; x.fillRect(0, 0, 256, 8); x.fillStyle = '#8c9895'; x.fillRect(0, 0, 3, 8);
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(1 / 1.15, 1); t.anisotropy = 8; return t;
}
// sunlight focused by the pool's ripples on its floor (render 02): a tileable web, bright where neighbouring cells of
// a jittered grid meet (F2 − F1 of a Voronoi field), ≈ 35 cm cells over a 2,1 m repeat. Used as a faint glow scaled with
// the sun: neither renderer traces real caustics.
function caustics(size = 256, cells = 6) {
  let seed = 77; const r = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646, pts = [];
  for (let j = 0; j < cells; j++) for (let i = 0; i < cells; i++) pts.push([(i + .15 + r() * .7) / cells, (j + .15 + r() * .7) / cells]);
  const c = Object.assign(document.createElement('canvas'), {width: size, height: size}), x = c.getContext('2d'), img = x.createImageData(size, size), d = img.data;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const u = (i + .5) / size, v = (j + .5) / size; let f1 = 9, f2 = 9;
    for (const [px, py] of pts) for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) {
      const dd = Math.hypot(px + ox - u, py + oy - v); if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
    }
    const e = Math.exp(-(f2 - f1) * cells * 9) * 255, k = (j * size + i) * 4; d[k] = d[k + 1] = d[k + 2] = e; d[k + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(1 / 2.1, 1 / 2.1); return t;
}
// dark aluminium lattice of the courtyard patio screens (render 02), alpha-tested
function lattice() {
  const c = Object.assign(document.createElement('canvas'), {width: 64, height: 64}), x = c.getContext('2d');
  // expanded metal: diamonds, wider than tall (≈11 × 6 cm), as the screens of render 02
  x.strokeStyle = '#34373b'; x.lineWidth = 9; x.lineCap = 'square';
  for (const o of [-64, 0, 64]) { x.beginPath(); x.moveTo(o, 0); x.lineTo(o + 64, 64); x.moveTo(o + 64, 0); x.lineTo(o, 64); x.stroke(); }
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(1 / .11, 1 / .06); t.anisotropy = 8; return t;
}
// a lit room seen from outside: brightest under the ceiling lamp, falling off towards the floor and the corners
function roomGlow() {
  const c = Object.assign(document.createElement('canvas'), {width: 64, height: 64}), x = c.getContext('2d');
  const g = x.createRadialGradient(32, 12, 2, 32, 22, 46);
  g.addColorStop(0, '#ffffff'); g.addColorStop(.45, '#c9b9a2'); g.addColorStop(1, '#4a4038');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;               // v = 1 (ceiling) is the canvas top
}
function normalFromNoise(n, s) {
  const d = new Uint8Array(s * s * 4);
  for (let j = 0; j < s; j++) for (let i = 0; i < s; i++) {
    const h = (x, y) => n[((y + s) % s) * s + ((x + s) % s)], dx = (h(i + 1, j) - h(i - 1, j)) * 30, dy = (h(i, j + 1) - h(i, j - 1)) * 30, l = Math.hypot(dx, dy, 1), k = (j * s + i) * 4;
    d[k] = (-dx / l * .5 + .5) * 255; d[k + 1] = (-dy / l * .5 + .5) * 255; d[k + 2] = (1 / l * .5 + .5) * 255; d[k + 3] = 255;
  }
  const t = new T.DataTexture(d, s, s); t.wrapS = t.wrapT = T.RepeatWrapping; t.generateMipmaps = true; t.minFilter = T.LinearMipmapLinearFilter; t.needsUpdate = true;
  return t;
}

export async function createBuilding(container, {base = '/models/mykonos/', url = u => u, json = null, onStatus = () => {}} = {}) {
  const t0 = performance.now();
  onStatus('Cargando el edificio…');
  // url: the site's cache-busting/offline mapping; json: its loader (the offline copy embeds the JSON)
  const get = f => json ? json(base + f) : fetch(url(base + f)).then(r => { if (!r.ok) throw new Error(f + ' ' + r.status); return r.json(); });
  const [ex, openings, building, ctx, classTex] = await Promise.all([get('exterior.json'), get('facade-openings.json'), get('building.json'), get('context.json'),
    new T.TextureLoader().loadAsync(url(base + 'ground_class.png'))]);
  Object.assign(classTex, {flipY: false, magFilter: T.NearestFilter, minFilter: T.NearestFilter, generateMipmaps: false}); classTex.needsUpdate = true;

  // ---- renderer, scene, materials
  const renderer = new T.WebGLRenderer({antialias: false, powerPreference: 'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.NeutralToneMapping;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFShadowMap; renderer.shadowMap.autoUpdate = false;
  container.append(renderer.domElement); renderer.domElement.className = 'ap-canvas';
  // a lost GPU context (driver reset, memory pressure) leaves a clear message instead of a frozen picture
  renderer.domElement.addEventListener('webglcontextlost', e => {
    e.preventDefault(); paused = true; cancelAnimationFrame(raf);
    const m = Object.assign(document.createElement('div'), {className: 'loading', textContent: 'La vista 3D se ha interrumpido. Recarga la página para continuar.'});
    container.append(m);
  });
  const scene = new T.Scene();
  const U = {skyTint: {value: new T.Color()}, groundTint: {value: new T.Color()}, lampTint: {value: new T.Color()}, groundMap: {value: null}, lampMap: {value: null}};
  const mark = n => performance.mark('building:' + n);                 // stage timings (Performance panel)
  mark('data'); const M = createMaterials(U); mark('materials');

  // ---- the building and the plot (lightmapped quads + parts), the neighbourhood, the ground
  onStatus('Construyendo el edificio…');
  const fac = buildFacades(ex, openings, building), plot = buildPlot(ex, building);
  const atlas = packCharts([...fac.mesher.charts, ...plot.mesher.charts], {density: small ? 10 : 22, size: small ? 1024 : 2048});
  const NO_SHADOW = new Set(['glass', 'room', 'roomLit', 'roomFloor', 'reveal', 'curtain', 'glassFence', 'water']);
  const lightmapped = [], buildingMeshes = [], plotMeshes = [];
  for (const [src, list] of [[fac, buildingMeshes], [plot, plotMeshes]]) {
    for (const {name, geometry} of src.mesher.geometries()) {
      const m = new T.Mesh(geometry, M[name]); m.name = name; m.castShadow = !NO_SHADOW.has(name); m.receiveShadow = true;
      if (geometry.getAttribute('uv1')) lightmapped.push(m);
      list.push(m);
    }
    list.push(...src.parts.meshes(M));
  }
  const arch = new T.Group(); arch.name = 'building'; arch.add(...buildingMeshes, ...plotMeshes); scene.add(arch);
  plot.water.material = M.water; plot.water.receiveShadow = true; scene.add(plot.water);
  const around = buildContext(ctx, plot, M), outdoor = buildOutdoor({patios: plot.patios, terraces: fac.terraces, balconies: fac.balconies, lv5: ex.levels['5']}, M, {lite: small});
  const planting = buildPlanting(M);
  scene.add(around.group, buildCars(M), buildCypresses(M, fac.terraces, ex.levels['5']), outdoor.group, planting.group, buildPeople(M));
  const site = ex.site, ramp = site.ramp, pool = site.pool;
  // lights on the ground plane (analytic: it is not lightmapped): street lamps (≈110 cd) and the bollards
  const groundLamps = [...around.lampHeads.map(p => new T.Vector4(p.x, p.y, p.z, 110)), ...planting.lights].slice(0, 16);
  const lampsU = {lampPos: {value: groundLamps.concat(Array(16 - groundLamps.length).fill(new T.Vector4(0, -99, 0, 0)))}, lampLevel: {value: 0}};
  const ground = new T.Mesh(new T.PlaneGeometry(6000, 6000).rotateX(-Math.PI / 2), groundMaterial(classTex, GROUND_EXTENT, sh => {
    sh.uniforms.holes = {value: [new T.Vector4(pool.x[0], pool.x[1], pool.z[0], pool.z[1]), new T.Vector4(ramp.x[0] - .2, ramp.x[1], ramp.z[0], ramp.z[1])]};
    Object.assign(sh.uniforms, lampsU);
    sh.fragmentShader = 'uniform vec4 holes[2]; uniform vec4 lampPos[16]; uniform float lampLevel;\n' + sh.fragmentShader
      .replace('void main() {', 'void main() {\n\tfor ( int k = 0; k < 2; k ++ ) { vec4 h = holes[ k ]; if ( vWorld.x > h.x && vWorld.x < h.y && vWorld.z > h.z && vWorld.z < h.w ) discard; }')
      // street lamps and bollards: downlights with a cos^1,5 distribution, on the ground only
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        vec3 lampE = vec3( 0. );
        for ( int k = 0; k < 16; k ++ ) { vec3 d = lampPos[ k ].xyz - vWorld; float r2 = max( dot( d, d ), .04 ), c = d.y * inversesqrt( r2 ); lampE += vec3( 1., .82, .62 ) * lampPos[ k ].w * pow( max( c, 0. ), 2.5 ) / r2; }
        totalEmissiveRadiance += diffuseColor.rgb * lampE * lampLevel / 3.14159;`);
  }));
  ground.position.y = STREET - .004; ground.receiveShadow = true; ground.name = 'ground'; scene.add(ground);

  // ---- sun (live shadows over the building and the plot), sky, environment
  const C = new T.Vector3(ex.depth / 2 + 2, 0, 3);
  const sun = new T.DirectionalLight('#ffffff', 0); sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 2048 : 4096, small ? 2048 : 4096); sun.shadow.bias = -.0004; sun.shadow.normalBias = .035;
  Object.assign(sun.shadow.camera, {left: -64, right: 64, top: 64, bottom: -64, near: 20, far: 420});
  sun.target.position.copy(C); scene.add(sun, sun.target);
  // sky: a photographic gradient (zenith → horizon) with the sun's glow and cirrus wisps; the visible dome shows it
  // at display level, the environment's copy at scene radiance (the baked sky's level)
  const skyU = {zenith: {value: new T.Color()}, horizon: {value: new T.Color()}, groundCol: {value: new T.Color()}, sunDir: {value: new T.Vector3(0, 1, 0)},
    sunCol: {value: new T.Color()}, cloudAmount: {value: 0}, cloudColor: {value: new T.Color()}};
  const skyMat = gain => new T.ShaderMaterial({uniforms: {...skyU, gain: {value: gain}}, vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, side: T.BackSide, depthWrite: false, fog: false});
  const sky = new T.Mesh(new T.SphereGeometry(2000, 48, 24), skyMat(1)); sky.frustumCulled = false; sky.renderOrder = -1; scene.add(sky);
  sky.onBeforeRender = (r, sc, cam) => { sky.position.copy(cam.position); sky.updateMatrixWorld(); };
  const envSky = new T.Mesh(new T.SphereGeometry(900, 32, 16), skyMat(1));
  // the environment's sky has its own colours: the light of the sky as the camera's white balance sees it, not the
  // deep blue it shows behind the building (that would turn asphalt and paving blue)
  Object.assign(envSky.material.uniforms, {zenith: {value: new T.Color()}, horizon: {value: new T.Color()}});
  const pmrem = new T.PMREMGenerator(renderer); let envRT = null;
  // reflections: the neighbourhood seen from above Calle María de Molina without the building (windows, balcony
  // glass and car paint reflect the trees, lamps, cars and street), under the sky at the baked sky's level
  const envAt = new T.Vector3(ex.depth + 12, 6, 0);
  function captureEnv() {
    const hide = [arch, outdoor.group, plot.water, sky], vis = hide.map(o => o.visible), fog = scene.fog, bg = scene.background;
    hide.forEach(o => { o.visible = false; }); scene.fog = null; scene.background = null; scene.add(envSky); envSky.position.copy(envAt);
    envRT?.dispose(); envRT = pmrem.fromScene(scene, 0, .5, 1500, {size: 256, position: envAt}); scene.environment = envRT.texture;
    scene.remove(envSky); hide.forEach((o, i) => { o.visible = vis[i]; }); scene.fog = fog; scene.background = bg;
  }

  // ---- bake: sky (upper hemisphere) with the building and plot as occluders, the ground's light (lower hemisphere)
  // with the building alone (the plot's paving is ground), the street lamps' downlight
  mark('geometry'); onStatus('Calculando la luz…');
  scene.updateMatrixWorld(true);
  const baker = createBaker(renderer, atlas.size), bounds = new T.Box3();
  for (const m of lightmapped) bounds.expandByObject(m);
  const tb = performance.now(), casters = list => list.filter(m => m.castShadow && !m.material.alphaTest);   // alpha-tested screens are mostly open
  baker.setScene(lightmapped, casters([...buildingMeshes, ...plotMeshes]), bounds);
  await baker.bakeSky(small ? 96 : 256, null, {ground: 0});
  baker.setScene(lightmapped, casters(buildingMeshes), bounds);
  await baker.bakeSky(small ? 64 : 160, null, {sky: 0, ground: 1, target: 'lamp'});
  baker.setScene(lightmapped, casters([...buildingMeshes, ...plotMeshes]), bounds);
  // artificial light: street lamps, patio wall lights, terrace lights and balcony downlights
  await baker.bakeLamps([...around.lampHeads.map(p => ({x: p.x, y: p.y - .08, z: p.z, intensity: 110, color: '#ffd1a0'})), ...outdoor.lights.map(l => ({...l, color: '#ffcf96'}))], small ? 3 : 6, null, {target: 'bounce'});
  const bakeMs = Math.round(performance.now() - tb); mark('bake');
  U.groundMap.value = baker.targets.lamp.texture; U.lampMap.value = baker.targets.bounce.texture;
  for (const m of lightmapped) { m.material.lightMap = baker.targets.sky.texture; m.material.lightMap.channel = 1; m.material.needsUpdate = true; }

  // ---- cameras, post-processing
  const cams = createCameras({renderer, container, ex, plot});
  const composer = new EffectComposer(renderer, new T.WebGLRenderTarget(1, 1, {type: T.HalfFloatType, samples: small ? 0 : 4}));
  const renderPass = new RenderPass(scene, cams.camera); composer.addPass(renderPass);
  const gtao = small ? null : new GTAOPass(scene, cams.camera, 1, 1);
  if (gtao) { gtao.blendIntensity = .45; gtao.updateGtaoMaterial({radius: .8, distanceExponent: 1.5, thickness: 2, scale: 1}); composer.addPass(gtao); }
  const bloom = new UnrealBloomPass(new T.Vector2(1, 1), .18, .45, 1); composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const grade = new ShaderPass(GRADE); composer.addPass(grade);

  // ---- photorealistic stills: a path tracer (loaded on first use) refines the Photo view while the camera rests
  // samples to converge: night (many small lights) is slower per sample, so it stops a little earlier
  // the still is traced at up to 1,5 pixels per CSS pixel on dense screens (crisper frames and joints), with fewer
  // samples per pixel so the wait stays about the same (the same rays, spread over more pixels)
  const traceDensity = () => small ? 1 : Math.min(renderer.getPixelRatio(), 1.5);
  const renderGoal = () => small ? 96 : Math.round((PRESETS[preset].sun?.el > 0 ? 256 : 192) * 1.15 / traceDensity() ** 2);
  let tracer = null, tracing = false;
  function lookForTracer() {
    // trace: the traced still's own balance (its bounce light fills shadows the live view's balance had to lift)
    const p = PRESETS[preset], tr = p.trace || {}, up = p.sun && p.sun.el > 0, su = skyU, eu = envSky.material.uniforms;
    const base = {sunDir: su.sunDir.value, sunCol: su.sunCol.value, cloudColor: su.cloudColor.value, cloudAmount: su.cloudAmount.value};
    const tint = new T.Color(...(tr.envTint || [1, 1, 1]));                       // the sky light's hue in the still (render 03's shade is bluer)
    return {
      sky: {...base, zenith: su.zenith.value, horizon: su.horizon.value, groundCol: su.groundCol.value, gain: (p.skyBg ?? 1) / (p.exposure * (tr.exposure ?? 1))},
      env: {...base, zenith: eu.zenith.value.clone().multiply(tint).multiplyScalar(tr.zenith ?? 1), horizon: eu.horizon.value.clone().multiply(tint).multiplyScalar(tr.horizon ?? 1), groundCol: U.groundTint.value, gain: eu.gain.value * (tr.sky ?? 1)},
      sun: up ? {color: tr.sunColor ? new T.Color(tr.sunColor) : sun.color, E: p.sun.E * (tr.sun ?? 1)} : null,
      lamps: p.lamps, lampTint: new T.Color('#ffd9a8'), exposure: p.exposure * (tr.exposure ?? 1),
    };
  }
  async function startRender() {
    if (cams.mode !== 'photo' || tracing) return;
    cams.setRenderProgress('prep'); setPR(prFull);
    await new Promise(r => setTimeout(r, 30));                                // let the label paint before the heavy work
    if (!tracer) {
      const {createPathTracer} = await import('./pathtrace.js'); mark('tracer-loaded');
      tracer = createPathTracer(renderer, {source: scene, skip: new Set([sky, ground]), small,
        ground: {image: classTex.image, extent: GROUND_EXTENT, near: [-60, 100, -90, 90], holes: [[pool.x[0], pool.x[1], pool.z[0], pool.z[1]], [ramp.x[0] - .2, ramp.x[1], ramp.z[0], ramp.z[1]]]},
        lights: [...around.lampHeads.map(l => ({x: l.x, y: l.y - .1, z: l.z, intensity: 110, color: '#ffd1a0'})), ...outdoor.lights.map(l => ({...l, intensity: l.intensity * .55, color: '#ffcf96'})),
          ...planting.lights.map(v => ({x: v.x, y: v.y, z: v.z, intensity: v.w, color: '#ffd8b0'}))]});
      tracer.build(cams.camera); mark('tracer-built');
    }
    tracer.setLook(lookForTracer());
    tracer.start(cams.camera, renderer.getPixelRatio() / traceDensity());
    tracing = true;
  }
  function stopRender() { if (!tracing) return; tracing = false; cams.setRenderProgress(null); invalidate(); }

  // ---- presets, render styles
  let preset = '', dirty = 2;
  const invalidate = () => { dirty = Math.max(dirty, 2); };
  const lum = c => .2126 * c.r + .7152 * c.g + .0722 * c.b;
  function setTime(name) {
    stopRender(); preset = name; const p = PRESETS[name];
    bar.querySelectorAll('[data-time]').forEach(b => b.classList.toggle('on', b.dataset.time === name));
    U.skyTint.value.set(p.sky).multiplyScalar(p.skyE);
    // ground radiance: its albedo × (sun on most of it + the open sky's 7π/9 × tint) / π
    const E = U.skyTint.value.clone().multiplyScalar(7 * Math.PI / 9);
    // the sun lights the scene when it is up; below the horizon it only warms the sky around where it set
    const up = p.sun && p.sun.el > 0;
    if (p.sun) { const d = sunDir(p.sun); skyU.sunDir.value.copy(d); skyU.sunCol.value.set(p.sun.color).multiplyScalar(p.sun.el < 10 ? .9 : .45); }
    else skyU.sunCol.value.setRGB(0, 0, 0);
    sun.visible = !!up;
    if (up) {
      const d = sunDir(p.sun); sun.color.set(p.sun.color); sun.intensity = p.sun.E;
      sun.position.copy(C).addScaledVector(d, 220); sun.target.updateMatrixWorld(); sun.shadow.camera.updateProjectionMatrix();
      E.add(sun.color.clone().multiplyScalar(p.sun.E * Math.max(0, d.y) * .8));
    }
    skyU.zenith.value.set(p.zenith); skyU.horizon.value.set(p.horizon); skyU.groundCol.value.set(p.horizon).multiplyScalar(.55);
    envSky.material.uniforms.zenith.value.set(p.sky); envSky.material.uniforms.horizon.value.set(p.sky).lerp(new T.Color(p.horizon), .6);
    U.groundTint.value.copy(E).multiplyScalar(p.ground / Math.PI).multiply(new T.Color('#d8cfc4'));
    U.lampTint.value.set('#ffd9a8').multiplyScalar(p.lamps);
    lampsU.lampLevel.value = p.lamps;
    skyU.cloudAmount.value = p.clouds || 0; skyU.cloudColor.value.set(p.cloudColor || '#f4f5f6');
    renderer.toneMappingExposure = p.exposure; bloom.threshold = 2 / p.exposure;
    sky.material.uniforms.gain.value = (p.skyBg ?? 1) / p.exposure;           // skyBg: the sky as seen, brighter than its light (render 03)
    // environment: the sky scaled to the baked sky's level (captured with the real ground and neighbourhood)
    const mean = envSky.material.uniforms.zenith.value.clone().lerp(envSky.material.uniforms.horizon.value, .45);
    envSky.material.uniforms.gain.value = lum(U.skyTint.value) * .7 / Math.max(lum(mean), 1e-4);
    captureEnv();
    scene.fog = new T.FogExp2((p.fog ? new T.Color(p.fog) : new T.Color(p.horizon).lerp(new T.Color(p.zenith), .15)).multiplyScalar(.92 / p.exposure), .0017);
    // windows: a share lit at dusk and night (warm), interiors visible through the glass after dark
    // (glows are set against the exposure: a lit window reads ≈ 1,3 × white, a lamp head blooms)
    M.roomLit.emissive.set('#ffcf98'); M.roomLit.emissiveIntensity = p.lit > .2 ? 1.6 / p.exposure : 0;
    M.poolTile.emissive.set('#e6faff'); M.poolTile.emissiveIntensity = up ? .22 * p.sun.E * Math.sin(p.sun.el * Math.PI / 180) : 0;   // caustics in the sun
    M.glass.opacity = up && p.sun.el > 6 ? .8 : .5; M.balcony.opacity = up ? .8 : .78; M.canopy.envMapIntensity = up ? 1 : .45; M.canopy.color.setScalar(up || p.lamps > .7 ? 1 : .5);   // (night: crowns dark but for the lamps, render 04)   // laminated glass: translucent by day, dark grey at night (render 04)
    M.lampGlow.color.set(p.lamps ? '#fff1d8' : '#d8d6d0').multiplyScalar(p.lamps ? 6 / p.exposure : .25 / p.exposure);
    M.taillight.color.set(p.lamps ? '#ff2a1a' : '#5a0d0d').multiplyScalar(p.lamps ? .8 / p.exposure : .3 / p.exposure);
    M.headlight.color.set('#d9dcdf').multiplyScalar(.35 / p.exposure);
    renderer.shadowMap.needsUpdate = true; invalidate();
  }
  // ---- UI: the debug bar
  const bar = document.createElement('div'); bar.className = 'ap-bar';
  bar.innerHTML = `<div class="ap-group">${['Tour', 'Photo', 'Walk'].map(m => `<button data-mode="${m.toLowerCase()}">${m}</button>`).join('')}</div>
    <div class="ap-group">${Object.keys(PRESETS).map(p => `<button data-time="${p}">${p}</button>`).join('')}</div>`;
  bar.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.mode) cams.setMode(b.dataset.mode); if (b.dataset.time) setTime(b.dataset.time);
  };
  container.append(bar);
  cams.onMode = m => { bar.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b.dataset.mode === m)); invalidate(); };
  cams.onShot = s => { stopRender(); if (s.time && s.time !== preset) setTime(s.time); };
  cams.onRender = () => tracing ? stopRender() : startRender();
  cams.invalidate = invalidate;

  // ---- loop (renders only when something changed)
  let raf = 0, last = performance.now(), paused = false, still = 0;
  // adaptive resolution: a lighter pixel ratio while the view moves, the full one as soon as it rests
  const prFull = Math.min(devicePixelRatio, small ? 1.5 : 2), prMove = Math.min(prFull, small ? 1 : 1.25);
  const setPR = v => { if (renderer.getPixelRatio() === v) return; renderer.setPixelRatio(v); composer.setPixelRatio(v); resize(); };
  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight; if (!w || !h) return;
    stopRender(); renderer.setSize(w, h, false); composer.setSize(w, h); cams.resize(w, h); invalidate();
  };
  const ro = new ResizeObserver(resize); ro.observe(container); resize();
  function frame(now) {
    if (paused) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const moved = cams.update(dt);
    if (tracing) {                                                            // the path tracer owns the canvas until the view moves
      if (!moved) {
        if (tracer.samples < renderGoal()) { tracer.step(); tracer.show(null, renderGoal()); cams.setRenderProgress(tracer.samples / renderGoal()); }
        return;
      }
      stopRender();
    }
    if (moved) { dirty = Math.max(dirty, 1); still = 0; setPR(prMove); }
    else if ((still += dt) > .3 && renderer.getPixelRatio() !== prFull) setPR(prFull);
    if (!dirty) return;
    dirty--;
    if (scene.fog) scene.fog.density = cams.camera.position.distanceTo(C) > 300 ? 0 : .0017;   // no haze on the elevations
    grade.uniforms.time.value = (now % 1000) / 1000;
    composer.render(dt);
  }
  setTime('Low sun');
  cams.setMode('tour');
  raf = requestAnimationFrame(frame);
  onStatus(''); mark('ready');
  const stats = {buildMs: Math.round(performance.now() - t0), bakeMs, atlas, charts: fac.mesher.charts.length + plot.mesher.charts.length};
  return {
    pause() { paused = true; cancelAnimationFrame(raf); if (document.pointerLockElement) document.exitPointerLock(); },
    resume() { if (!paused) return; paused = false; last = performance.now(); invalidate(); raf = requestAnimationFrame(frame); },
    setTime, setMode: m => cams.setMode(m), shot: i => cams.shot(i), render: startRender, stopRender, get tracer() { return tracer; }, cams, scene, renderer, stats, uniforms: U, presets: PRESETS,
    internals: {M, baker, fac, plot, around, sun, sky, composer, passes: {gtao, bloom, grade}, lightmapped},
    dispose() { tracer?.dispose(); cancelAnimationFrame(raf); ro.disconnect(); cams.dispose(); baker.dispose(); pmrem.dispose(); envRT?.dispose(); composer.dispose(); renderer.dispose(); scene.traverse(o => o.geometry?.dispose()); container.replaceChildren(); },
  };
}
