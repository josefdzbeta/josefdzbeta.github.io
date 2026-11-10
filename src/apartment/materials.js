// PBR materials. Architecture is lightmapped: its diffuse light is the baked sky (tinted per time of day) + the
// baked lamps + the baked first bounce + a per-room term for the further bounces, never the environment map
// (which still gives it reflections).
// Every material honours the shared `clay` uniform, which turns albedo to white for "Lighting only".
import * as T from 'three';
import {oakPlanks, tiles, plaster, weave, woodGrain, stone} from './textures.js';

export const MAX_ROOMS = 24;
// diffuse reflectance of the lightmapped finishes (for the bounce light)
export const ALBEDO = {paint: .82, reveal: .82, ceiling: .86, tile: .8, facade: .72, coping: .55, wood: .45, bathFloor: .55, terrace: .42, threshold: .65};

export function sharedUniforms() {
  return {
    lampMap: {value: null}, bounceMap: {value: null}, skyTint: {value: new T.Color(1, 1, 1)}, lampTint: {value: new T.Color(0, 0, 0)},
    ambient: {value: Array.from({length: MAX_ROOMS}, () => new T.Color(0, 0, 0))}, lampRoom: {value: new Float32Array(MAX_ROOMS)}, clay: {value: 0},
  };
}

// indirect light of the lightmapped finishes: baked sky × time-of-day tint + baked lamps (switched per room) +
// two baked bounces + the room's further bounces; reflections still come from the environment map
const LIGHTMAP_CHUNK = /* glsl */`
#if defined( RE_IndirectDiffuse ) && defined( USE_LIGHTMAP )
  irradiance += texture2D( lightMap, vLightMapUv ).rgb * skyTint + texture2D( bounceMap, vLightMapUv ).rgb
    + ( vRoom >= 0 ? texture2D( lampMap, vLightMapUv ).rgb * lampTint * lampRoom[ vRoom ] + ambient[ vRoom ] : vec3( 0. ) );
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
  radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
#endif
`;

function hook(mat, U, {lightmapped = false} = {}) {
  mat.onBeforeCompile = sh => {
    sh.uniforms.clay = U.clay;
    sh.fragmentShader = 'uniform float clay;\n' + sh.fragmentShader.replace('#include <color_fragment>',
      '#include <color_fragment>\n\tdiffuseColor.rgb = mix( diffuseColor.rgb, vec3( .72 ), clay );');
    if (!lightmapped) return;
    Object.assign(sh.uniforms, {lampMap: U.lampMap, bounceMap: U.bounceMap, skyTint: U.skyTint, lampTint: U.lampTint, ambient: U.ambient, lampRoom: U.lampRoom});
    sh.vertexShader = 'attribute float room;\nflat varying int vRoom;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\n\tvRoom = int( floor( room + .5 ) );');
    // the shader still has its #include lines here: the indirect-light chunk is replaced whole
    sh.fragmentShader = `uniform sampler2D lampMap, bounceMap;\nuniform vec3 skyTint, lampTint, ambient[${MAX_ROOMS}];\nuniform float lampRoom[${MAX_ROOMS}];\nflat varying int vRoom;\n` + sh.fragmentShader
      .replace('#include <lights_fragment_maps>', LIGHTMAP_CHUNK);
  };
  mat.customProgramCacheKey = () => lightmapped ? 'lm' : 'std';
  return mat;
}

export function createMaterials(U) {
  const tex = {
    oak: oakPlanks(), paint: plaster(), linen: weave({color: [38, 12, 84], threads: 140, metres: .15, slub: .25}), boucle: weave({color: [40, 14, 86], threads: 60, slub: .6, seed: 4}),
    wicker: weave({color: [33, 30, 62], threads: 40, metres: .25, slub: .2, basket: true, seed: 12}), teak: woodGrain(),
    oakFurniture: woodGrain({tone: [32, 30, 62], contrast: 9, seed: 5}), stone: stone(), coping: stone({color: [40, 6, 80], seed: 8, metres: 1.2}),
    render: stone({color: [38, 9, 91], seed: 19, metres: 1.6, speckle: .3}),
    bathWall: tiles({tw: .6, th: .3, per: 3, color: [40, 6, 93], vary: 1, grout: '#d9d7d2', joint: .002, rough: .12, roughVar: .04, cloud: .02, seed: 13}),
    bathFloor: tiles({tw: .6, th: .6, per: 3, color: [170, 16, 80], vary: 2, grout: '#b9c3c0', joint: .003, rough: .45, cloud: .06, seed: 14}),
    splash: tiles({tw: .6, th: .3, per: 3, color: [40, 5, 94], vary: 1, grout: '#dcdad5', joint: .002, rough: .1, cloud: .02, seed: 15}),
    pavers: tiles({tw: .75, th: .375, per: 4, color: [38, 6, 80], vary: 3, grout: '#b3aea5', joint: .004, bond: 'running', speckle: .8, cloud: .1, rough: .85, roughVar: .1, seed: 16}),
  };
  const maps = t => Object.fromEntries(['map', 'normalMap', 'roughnessMap'].filter(k => t?.[k]).map(k => [k, t[k]]));
  const std = (o, t, lm = false) => hook(new T.MeshStandardMaterial({...maps(t), ...o}), U, {lightmapped: lm});
  // both faces cast into the sun's shadow map: walls, ceilings and slabs are single-sided shells
  const arch = (o, t) => std({...o, lightMapIntensity: 1, shadowSide: T.DoubleSide}, t, true);
  // textiles: the soft sheen of woven cloth at grazing angles
  const cloth = (o, t) => hook(new T.MeshPhysicalMaterial({...maps(t), sheen: .7, sheenRoughness: .65, sheenColor: new T.Color('#ffffff'), roughness: 1, ...o}), U);
  const M = {
    // architecture (lightmapped)
    paint: arch({color: '#f1eee8', roughness: 1, normalScale: new T.Vector2(.12, .12)}, tex.paint),
    reveal: arch({color: '#f1eee8', roughness: .9, normalScale: new T.Vector2(.12, .12)}, tex.paint),
    ceiling: arch({color: '#f7f6f3', roughness: 1, normalScale: new T.Vector2(.1, .1)}, tex.paint),
    tile: arch({color: '#ffffff', roughness: 1}, tex.bathWall),
    facade: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(.9, .9)}, tex.render),
    coping: arch({color: '#e2ded6', roughness: .8}, tex.coping),
    wood: arch({color: '#ffffff', roughness: 1, normalScale: new T.Vector2(.6, .6)}, tex.oak),
    bathFloor: arch({color: '#ffffff', roughness: 1}, tex.bathFloor),
    terrace: arch({color: '#ffffff', roughness: 1}, tex.pavers),
    threshold: arch({color: '#e7e3dc', roughness: .5}, tex.stone),
    roof: std({color: '#d9d6cf', roughness: .95, shadowSide: T.DoubleSide}), switch: std({color: '#f6f5f2', roughness: .35}),
    // carpentry and fittings
    skirting: std({color: '#f2f0ec', roughness: .45}), lacquer: std({color: '#f3f1ec', roughness: .32}), lacquerGrey: std({color: '#d8d6d1', roughness: .35}),
    pvc: std({color: '#3a3e43', roughness: .45}), alu: std({color: '#8f959b', roughness: .38, metalness: .6}),
    chrome: std({color: '#e8eaec', roughness: .08, metalness: 1}), steel: std({color: '#c9ccce', roughness: .28, metalness: 1}),
    blackGlass: std({color: '#0b0c0e', roughness: .04, metalness: .2}), stone: std({color: '#ebe7e0', roughness: .45}, tex.stone),
    glass: hook(new T.MeshPhysicalMaterial({color: '#f4f8f7', roughness: .02, metalness: 0, transparent: true, opacity: .07, depthWrite: false, envMapIntensity: .5}), U),
    glassDoor: hook(new T.MeshPhysicalMaterial({color: '#e9f0ef', roughness: .25, transparent: true, opacity: .35, depthWrite: false}), U),
    tintGlass: std({color: '#2b2f2f', roughness: .03, metalness: .1, transparent: true, opacity: .82}),
    ceramic: std({color: '#fbfbf9', roughness: .08}), resin: std({color: '#f2f1ee', roughness: .55}), mirror: std({color: '#dfe3e5', roughness: .0, metalness: 1}),
    worktop: std({color: '#eeece8', roughness: .22}, tex.stone), splash: std({color: '#ffffff', roughness: 1}, tex.splash),
    // furniture
    fabric: cloth({color: '#ffffff', normalScale: new T.Vector2(.35, .35)}, tex.linen), boucle: cloth({color: '#ffffff', normalScale: new T.Vector2(.5, .5)}, tex.boucle),
    rug: cloth({color: '#d3cbbd', normalScale: new T.Vector2(.9, .9), sheen: .4}, tex.boucle),
    cushionAccent: cloth({color: '#9a6a4f'}, tex.linen), bedding: cloth({color: '#f3f2ee', sheen: .4}, tex.linen),
    lilac: cloth({color: '#c8c4e2'}, tex.linen), oak: std({color: '#ffffff', roughness: .55}, tex.oakFurniture),
    teak: std({color: '#ffffff', roughness: .6}, tex.teak), wicker: std({color: '#ffffff', roughness: .85}, tex.wicker),
    cushion: cloth({color: '#ece7dc', normalScale: new T.Vector2(.35, .35)}, tex.linen), blackMetal: std({color: '#1d1e20', roughness: .4, metalness: .7}),
    screen: std({color: '#0a0b0c', roughness: .06, metalness: .55, emissive: '#000000'}), plantPot: std({color: '#d8d2c6', roughness: .8}),
    leaf: std({color: '#ffffff', roughness: .6, side: T.DoubleSide}),
    soil: std({color: '#3b2f25', roughness: 1}), brass: std({color: '#c9a76a', roughness: .3, metalness: 1}),
    lampShade: std({color: '#f4efe4', roughness: .9, emissive: '#000000', side: T.DoubleSide}), bulb: new T.MeshBasicMaterial({color: '#fff3df'}),
    tinted: std({color: '#ffffff', roughness: .7, vertexColors: true}),
  };
  for (const [k, m] of Object.entries(M)) m.name = k;
  return {M, tex};
}
