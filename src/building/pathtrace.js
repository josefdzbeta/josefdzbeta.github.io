// Path-traced stills of the building (three-gpu-pathtracer, progressive, in the browser). A copy of the viewer's scene
// for the path tracer: the same geometry and finishes in standard materials (no lightmaps: light bounces for real),
// window glass, balcony glass and pool water as physical transmission, instanced trees, shrubs, cars and plants
// expanded into plain geometry, the ground's land-use colours baked into textures (with holes for the pool and the
// ramp), the sky as an HDR panorama with a soft sun disc, and the outdoor lights as spot lights at dusk and night.
// The result goes through the viewer's exposure, tone mapping and photo grade.
import * as T from 'three';
import {WebGLPathTracer, DenoiseMaterial} from 'three-gpu-pathtracer';
import {FullScreenQuad} from 'three/addons/postprocessing/Pass.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {subtract} from './facade.js';
import {CLASS_COLOR, STREET} from './site.js';
import {SKY_EQUIRECT_VERT, SKY_EQUIRECT_FRAG} from './sky.js';

const SUN_RADIUS = 1.2 * Math.PI / 180;                                   // a slightly large sun: soft, photographic shadows

// ---- materials: the viewer's finishes as the path tracer reads them (glass becomes transmissive)
function ptMaterial(src, vertexColors) {
  let m;
  switch (src.name) {
    case 'glass': m = new T.MeshPhysicalMaterial({color: '#f3f6f6', roughness: .015, transmission: 1, ior: 1.5, thickness: 0}); break;
    case 'glassFence': m = new T.MeshPhysicalMaterial({color: '#eef4f2', roughness: .02, transmission: 1, ior: 1.5, thickness: 0}); break;
    // laminated glass with a grey-green interlayer: part transmissive, part diffuse, a soft sheen (renders 03/04)
    case 'balcony': m = new T.MeshPhysicalMaterial({color: '#fbf3e6', map: src.map, roughness: .3, transmission: .15, ior: 1.5, thickness: 0}); break;
    // sheer linen: light passes through (sunlit rooms glow behind it)
    case 'curtain': m = new T.MeshPhysicalMaterial({color: '#fbf8f0', roughness: 1, transmission: .1, ior: 1.2, thickness: 0}); break;
    // foliage: thin, slightly translucent leaves
    case 'canopy': case 'leaf': case 'lavender': case 'cypress':
      // (young leaves a little yellower; lavender keeps its lilac. Light through a dense clump of translucent cards
      // takes the leaf or flower colour once per card and saturates: crowns went deep green, lavender deep violet;
      // a little translucency for the leaves, none for the lavender)
      m = new T.MeshPhysicalMaterial({color: src.color.clone().multiply(src.name === 'lavender' ? new T.Color(1, 1, 1) : new T.Color(1.3, 1.15, .5)), map: src.map, alphaTest: src.alphaTest, roughness: .55, transmission: src.name === 'lavender' ? 0 : .1, thickness: 0, ior: 1.4}); break;
    // car paint without its clearcoat layer (the path tracer renders that layer black), a little glossier instead
    case 'carPaint': m = src.clone(); m.clearcoat = 0; m.roughness = .26; m.envMap = null; m.onBeforeCompile = () => {}; break;
    case 'water': m = new T.MeshPhysicalMaterial({color: '#bfe2f4', roughness: .02, transmission: 1, ior: 1.33, thickness: 0, normalMap: src.normalMap, normalScale: new T.Vector2(.08, .08)}); break;   // (a pale tint: light crosses the surface twice; a light ripple: stronger turns into dark blots)
    default:
      if (src.isMeshBasicMaterial) m = new T.MeshStandardMaterial({color: '#000000', emissive: src.color, emissiveIntensity: 1});   // lamp heads, car lights
      else {
        m = src.clone(); m.lightMap = null; m.envMap = null; m.onBeforeCompile = () => {};
        // physical albedos (the live view's lightmaps were balanced with brighter ones): glazed white brick with grey
        // mortar ≈ 0,6, a gentler relief (in direct sun the full relief turns into speckle at photo scale); the
        // white render of the frame a warm white, as it reads against the brick in render 03
        if (src.name === 'brick') { m.color.setScalar(.75); m.normalScale = new T.Vector2(.55, .55); }
        if (src.name === 'render' || src.name === 'slabEdge' || src.name === 'wallWhite') m.color.setRGB(1, .95, .86);
        // the roof's waterproofing membrane: the darker blue-grey render 01 shows (its live-view tone is lifted for the bake)
        if (src.name === 'roof') { m.color.setRGB(.1, .15, .22); m.roughness = .75; }
      }
  }
  m.name = src.name; m.side = src.side; m.vertexColors = vertexColors || src.vertexColors;
  return m;
}

// an instanced mesh as one plain geometry (instance matrices applied, instance colours as vertex colours)
function expandInstances(im) {
  const base = im.geometry.index ? im.geometry.toNonIndexed() : im.geometry, P = base.attributes.position, N = base.attributes.normal, UV = base.attributes.uv;
  const vc = P.count, n = im.count, pos = new Float32Array(vc * n * 3), nor = new Float32Array(vc * n * 3), uv = UV ? new Float32Array(vc * n * 2) : null;
  const col = im.instanceColor ? new Float32Array(vc * n * 4).fill(1) : null, m4 = new T.Matrix4(), nm = new T.Matrix3(), v = new T.Vector3(), c = new T.Color();
  for (let i = 0; i < n; i++) {
    im.getMatrixAt(i, m4); m4.premultiply(im.matrixWorld); nm.getNormalMatrix(m4);
    if (col) im.getColorAt(i, c);
    for (let k = 0; k < vc; k++) {
      const o = i * vc + k;
      v.fromBufferAttribute(P, k).applyMatrix4(m4).toArray(pos, o * 3);
      v.fromBufferAttribute(N, k).applyMatrix3(nm).normalize().toArray(nor, o * 3);
      if (uv) { uv[o * 2] = UV.getX(k); uv[o * 2 + 1] = UV.getY(k); }
      if (col) c.toArray(col, o * 4);
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.BufferAttribute(pos, 3)); g.setAttribute('normal', new T.BufferAttribute(nor, 3));
  if (uv) g.setAttribute('uv', new T.BufferAttribute(uv, 2)); if (col) g.setAttribute('color', new T.BufferAttribute(col, 4));
  return g;
}

// ---- ground: land-use colours baked into textures — a fine tile around the plot, the whole raster, a horizon plane
function groundMeshes({image, extent: [ex0, ex1, ez0, ez1], near, holes}) {
  const iw = image.width, ih = image.height, can = Object.assign(document.createElement('canvas'), {width: iw, height: ih}), cx = can.getContext('2d', {willReadFrequently: true});
  cx.drawImage(image, 0, 0); const cls = cx.getImageData(0, 0, iw, ih).data;
  const res = (ex1 - ex0) / iw, rgb = CLASS_COLOR.map(h => new T.Color(h).getRGB(new T.Color(), T.SRGBColorSpace)).map(c => [c.r * 255, c.g * 255, c.b * 255]);
  const hash = (x, z) => { const s = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453; return s - Math.floor(s); };
  // per class: roughness (paving and asphalt with the soft sheen of the renders, turf matt)
  const ROUGH = [1, 1, .9, .55, .5, .5, .8, .9, .7, .5], PAVED = new Set([3, 4, 5, 9]);
  function bake([x0, x1, z0, z1], size) {
    const c = Object.assign(document.createElement('canvas'), {width: size, height: size}), g = c.getContext('2d'), img = g.createImageData(size, size), d = img.data;
    const cr = Object.assign(document.createElement('canvas'), {width: size, height: size}), gr = cr.getContext('2d'), imr = gr.createImageData(size, size), dr = imr.data;
    for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
      const x = x0 + (i + .5) / size * (x1 - x0), z = z0 + (j + .5) / size * (z1 - z0);
      const col = Math.min(iw - 1, Math.max(0, Math.floor((x - ex0) / res))), row = Math.min(ih - 1, Math.max(0, Math.floor((z - ez0) / res)));
      const k = cls[(row * iw + col) * 4] | 0, base = rgb[Math.min(9, k)], o = (j * size + i) * 4;
      let f = .9 + .2 * hash(Math.floor(x / .4), Math.floor(z / .2));                   // paver-by-paver and turf variation
      let r = base[0], gg = base[1], b = base[2];
      // promenade: pinkish-grey pavers with lighter bands, low in contrast as in render 03
      if (k === 5) { r = 188; gg = 170; b = 164; if ((((x / 1.7 + .3 * ((z / 23) % 1 > .5)) % 1) + 1) % 1 > .55) { r = 186; gg = 181; b = 176; } }
      // turf: deeper, more saturated green (render 03's lawns), a fine grain of blades over the patchiness
      if (k === 0 || k === 1) { f = (.82 + .3 * hash(Math.floor(x * 1.3), Math.floor(z * 1.3))) * (.9 + .2 * hash(i * .37, j * .91)); r *= .78; gg *= .95; b *= .55; }
      if (k === 3) { r *= 1.05; b *= .9; }                                          // asphalt: warm grey under the blue sky
      if (PAVED.has(k)) f *= .8;                                                    // streets and pavements: mid-grey to dark, as the renders
      d[o] = r * f; d[o + 1] = gg * f; d[o + 2] = b * f; d[o + 3] = 255;
      dr[o] = dr[o + 1] = dr[o + 2] = 255 * ROUGH[Math.min(9, k)] * (k === 0 || k === 1 ? 1 : .92 + .16 * hash(Math.floor(x / .4) + 7, Math.floor(z / .2))); dr[o + 3] = 255;
    }
    g.putImageData(img, 0, 0); gr.putImageData(imr, 0, 0);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace;
    return {map: t, roughnessMap: new T.CanvasTexture(cr)};
  }
  // rectangles → one geometry with uv over [x0..x1] × [z0..z1] (v = 1 at z0: the canvas' first row)
  function quads(rects, [x0, x1, z0, z1], y) {
    const p = [], uv = [], n = [];
    for (const [a0, a1, b0, b1] of rects) {
      const v = [[a0, b1], [a1, b1], [a1, b0], [a0, b1], [a1, b0], [a0, b0]];
      for (const [x, z] of v) { p.push(x, y, z); n.push(0, 1, 0); uv.push((x - x0) / (x1 - x0), 1 - (z - z0) / (z1 - z0)); }
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(p, 3)); g.setAttribute('normal', new T.Float32BufferAttribute(n, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    return g;
  }
  const whole = [ex0, ex1, ez0, ez1], far = [-3000, 3000, -3000, 3000];
  const mat = maps => new T.MeshStandardMaterial({...maps, roughness: 1});
  // around the building: 2 × 2 tiles of 1024² (≈8 cm per texel), then the whole raster, then a horizon plane
  const [nx0, nx1, nz0, nz1] = near, mx = (nx0 + nx1) / 2, mz = (nz0 + nz1) / 2;
  const tiles = [[nx0, mx, nz0, mz], [mx, nx1, nz0, mz], [nx0, mx, mz, nz1], [mx, nx1, mz, nz1]];
  return [
    ...tiles.map(t => new T.Mesh(quads(subtract(t, holes.filter(h => h[0] < t[1] && h[1] > t[0] && h[2] < t[3] && h[3] > t[2])), t, STREET), mat(bake(t, 1024)))),
    new T.Mesh(quads(subtract(whole, [near]), whole, STREET), mat(bake(whole, 1024))),
    new T.Mesh(quads(subtract(far, [whole]), far, STREET - .01), new T.MeshStandardMaterial({color: new T.Color(CLASS_COLOR[0]).multiply(new T.Color(.6, .9, .3)), roughness: 1})),   // (the turf tone of the tiles, in linear)
  ];
}

export function createPathTracer(renderer, {source, skip, ground, lights, small}) {
  const scene = new T.Scene(), materials = [], own = [];                  // [viewer material, path-tracer material]; geometry made here
  const cache = new Map(), matFor = (src, vc) => {
    const key = src.uuid + (vc ? '|vc' : '');
    if (!cache.has(key)) { const m = ptMaterial(src, vc); cache.set(key, m); materials.push([src, m]); }
    return cache.get(key);
  };
  // the scene: every visible mesh of the viewer except the sky dome and the shader-coloured ground
  source.updateMatrixWorld(true);
  source.traverseVisible(o => {
    if (!o.isMesh || skip.has(o)) return;
    if (o.isInstancedMesh) { if (o.count) { const g = expandInstances(o); own.push(g); scene.add(new T.Mesh(g, matFor(o.material, !!o.instanceColor))); } return; }
    // vertex colours with an explicit alpha (the path tracer reads four channels)
    let g = o.geometry;
    if (g.attributes.color?.itemSize === 3) {
      const c3 = g.attributes.color.array, c4 = new Float32Array(c3.length / 3 * 4).fill(1);
      for (let i = 0, j = 0; i < c3.length; i += 3, j += 4) { c4[j] = c3[i]; c4[j + 1] = c3[i + 1]; c4[j + 2] = c3[i + 2]; }
      g = g.clone(); g.setAttribute('color', new T.BufferAttribute(c4, 4)); own.push(g);
    }
    const m = new T.Mesh(g, matFor(o.material, false));
    m.matrixAutoUpdate = false; m.matrix.copy(o.matrixWorld); scene.add(m);
  });
  const grounds = groundMeshes(ground); own.push(...grounds.map(m => m.geometry)); scene.add(...grounds);
  // outdoor lights as spot lights pointing down (their level follows the time of day); a light's `beam` is its
  // half-angle when narrower than a street lamp's flood (the balcony soffit downlights: pools on the floor, not
  // washes up the back wall)
  const spots = lights.map(l => {
    const s = new T.SpotLight(l.color || '#ffd1a0', 0, 0, l.beam ?? 1.25, l.beam ? .5 : .8, 2); s.position.set(l.x, l.y, l.z); s.target.position.set(l.x, l.y - 1, l.z);
    s.userData.I = l.intensity; s.userData.color = s.color.clone(); scene.add(s, s.target); return s;
  });
  // ---- the sky as HDR panoramas: the background as seen, the environment at the baked sky's level plus the sun
  const SW = small ? 1024 : 2048, rt = new T.WebGLRenderTarget(SW, SW / 2, {type: T.FloatType, depthBuffer: false});
  const skyMat = new T.ShaderMaterial({vertexShader: SKY_EQUIRECT_VERT, fragmentShader: SKY_EQUIRECT_FRAG, depthTest: false, depthWrite: false,
    uniforms: {zenith: {value: new T.Color()}, horizon: {value: new T.Color()}, groundCol: {value: new T.Color()}, sunDir: {value: new T.Vector3()}, sunCol: {value: new T.Color()},
      cloudColor: {value: new T.Color()}, cloudAmount: {value: 0}, gain: {value: 1}, sunDisc: {value: new T.Color()}, sunCos: {value: Math.cos(SUN_RADIUS)}}});
  const skyQuad = new FullScreenQuad(skyMat);
  function panorama(u, old) {
    for (const [k, v] of Object.entries(u)) skyMat.uniforms[k].value?.copy ? skyMat.uniforms[k].value.copy(v) : (skyMat.uniforms[k].value = v);
    const prev = renderer.getRenderTarget(); renderer.setRenderTarget(rt); skyQuad.render(renderer); renderer.setRenderTarget(prev);
    const data = new Float32Array(SW * SW / 2 * 4); renderer.readRenderTargetPixels(rt, 0, 0, SW, SW / 2, data);
    old?.dispose();
    const t = new T.DataTexture(data, SW, SW / 2, T.RGBAFormat, T.FloatType); t.mapping = T.EquirectangularReflectionMapping;
    t.minFilter = t.magFilter = T.LinearFilter; t.needsUpdate = true; return t;
  }
  // ---- the path tracer and the display: exposure, neutral tone mapping, sRGB, the viewer's S-curve and vignette
  // transmissiveBounces also budgets the alpha-cut holes a ray passes through: a ray across a crown of leaf cards
  // crosses a dozen or more, and when the budget runs out the path ends dark (black crowns, solid tree shadows)
  const pt = new WebGLPathTracer(renderer);
  Object.assign(pt, {renderToCanvas: false, rasterizeScene: false, minSamples: 0, renderDelay: 0, fadeDuration: 0, dynamicLowRes: false, bounces: 6, transmissiveBounces: 24,
    filterGlossyFactor: .5, multipleImportanceSampling: true});
  // firefly clamp: each sample's radiance is capped at a few times the exposed white. The library has no option for
  // it, so the line that ends a sample is patched in its path-tracing material (private `_pathTracer`; checked on
  // three-gpu-pathtracer 0.0.28 — if the line is not found the patch is skipped and the render is merely noisier)
  const ptMat = pt._pathTracer?.material, END = 'gl_FragColor.a *= opacity;';
  if (ptMat?.fragmentShader.includes(END)) {
    ptMat.uniforms.maxSample = {value: 8};
    ptMat.fragmentShader = 'uniform float maxSample;\n' + ptMat.fragmentShader.replace(END, 'gl_FragColor.rgb = min( gl_FragColor.rgb, vec3( maxSample ) );\n' + END);
    ptMat.needsUpdate = true;
  }
  // light choice: the library picks one of the lights uniformly for each shadow ray; with the façade's ~130 balcony
  // downlights, street lamps and bollards the one that matters here is picked once in a hundred tries (a grainy
  // night). Patched to pick each light in proportion to its unshadowed contribution at the point (intensity, distance,
  // inside its cone), in one pass (a weighted reservoir), the light's pdf corrected to match: no bias, far less noise
  const PICK = 'uint l = uint( ruv.x * float( lightCount ) );\n\t\tLight light = readLightInfo( lights, l );';
  const fs = ptMat?.fragmentShader, at = fs?.indexOf(PICK) ?? -1, ret = at < 0 ? -1 : fs.indexOf('return result;', at);
  if (ptMat && at >= 0 && ret > at) {
    ptMat.fragmentShader = fs.slice(0, at) + /* glsl */`uint l = uint( ruv.x * float( lightCount ) ); float wSum = 0., wPick = 0.;
		for ( uint i = 0u; i < lightCount; i ++ ) {
			uint k = i * 6u;
			vec4 s0 = texelFetch1D( lights, k ), s1 = texelFetch1D( lights, k + 1u );
			vec3 toL = s0.rgb - rayOrigin; float d2 = max( dot( toL, toL ), 1e-4 );
			float w = s1.a * dot( s1.rgb, vec3( .2126, .7152, .0722 ) ) / d2;
			if ( w > 0. && int( round( s0.a ) ) == SPOT_LIGHT_TYPE ) {
				vec4 s2 = texelFetch1D( lights, k + 2u ), s3 = texelFetch1D( lights, k + 3u ), s4 = texelFetch1D( lights, k + 4u );
				// (cross( u, v ) points from the lit side back to the lamp, as the library's spot sampling reads it)
				if ( dot( toL * inversesqrt( d2 ), normalize( cross( s2.rgb, s3.rgb ) ) ) < s4.a ) w = 0.;
			}
			wSum += w;
			uint h = floatBitsToUint( ruv.x ) * 747796405u + i * 2891336453u + 1u;
			h = ( ( h >> ( ( h >> 28u ) + 4u ) ) ^ h ) * 277803737u; h = ( h >> 22u ) ^ h;
			if ( w > 0. && float( h ) * ( 1. / 4294967296. ) * wSum < w ) { l = i; wPick = w; }
		}
		Light light = readLightInfo( lights, l );` + fs.slice(at + PICK.length, ret)
      + 'if ( wSum > 0. ) result.pdf *= float( lightCount ) * wPick / wSum;\n\t\t' + fs.slice(ret);
    ptMat.needsUpdate = true;
  }
  // phones: each sample in four tiles, so no single GPU call runs long enough to trip the watchdog
  pt.tiles.set(small ? 2 : 1, small ? 2 : 1); pt.textureSize.set(small ? 512 : 1024, small ? 512 : 1024);
  const display = new FullScreenQuad(new T.ShaderMaterial({uniforms: {map: {value: null}, exposure: {value: 1}, contrast: {value: .2}, saturation: {value: 1.1}, vignette: {value: .18}},
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4( position.xy, 0., 1. ); }',
    fragmentShader: /* glsl */`uniform sampler2D map; uniform float exposure, contrast, saturation, vignette; varying vec2 vUv;
      vec3 neutral( vec3 color ) {                                                   // three's NeutralToneMapping
        const float start = .76, desat = .15;
        float x = min( color.r, min( color.g, color.b ) ), offset = x < .08 ? x - 6.25 * x * x : .04; color -= offset;
        float peak = max( color.r, max( color.g, color.b ) ); if ( peak < start ) return color;
        float d = 1. - start, newPeak = 1. - d * d / ( peak + d - start ); color *= newPeak / peak;
        return mix( color, vec3( newPeak ), 1. - 1. / ( desat * ( peak - newPeak ) + 1. ) );
      }
      vec3 srgb( vec3 c ) { return mix( c * 12.92, 1.055 * pow( c, vec3( 1. / 2.4 ) ) - .055, step( .0031308, c ) ); }
      void main() {
        vec3 x = clamp( srgb( neutral( texture2D( map, vUv ).rgb * exposure ) ), 0., 1. );
        float l = dot( x, vec3( .2126, .7152, .0722 ) ); x = mix( vec3( l ), x, saturation ); x = mix( x, x * x * ( 3. - 2. * x ), contrast );
        vec2 d = vUv - .5; gl_FragColor = vec4( x * ( 1. - vignette * dot( d, d ) * 2.2 ), 1. );
      }`, depthTest: false, depthWrite: false}));
  // a light edge-aware denoise over the first samples (threshold in linear light, so scaled by the exposure)
  const denoise = new FullScreenQuad(new DenoiseMaterial()), denoised = new T.WebGLRenderTarget(1, 1, {type: T.HalfFloatType, depthBuffer: false});
  let built = false, exposureNow = 1;
  return {
    get samples() { return pt.samples; },
    get target() { return pt.target; },
    scene,                                                                // (for inspection)
    // the BVH of the whole scene: once (a few seconds), then only cameras, lights, materials and the sky change
    build(camera) { if (!built) { pt.setScene(scene, camera); built = true; } },
    // a time of day: the sky panoramas, the sun disc, the lights' level and the viewer's current material values
    setLook({sky, env, sun, lamps, lampTint, exposure}) {
      const sunCos = Math.cos(SUN_RADIUS), solid = 2 * Math.PI * (1 - sunCos);
      scene.background = panorama({...sky, sunDisc: new T.Color(0, 0, 0)}, scene.background);
      scene.environment = panorama({...env, sunDisc: sun ? sun.color.clone().multiplyScalar(sun.E / solid) : new T.Color(0, 0, 0)}, scene.environment);
      for (const s of spots) { s.intensity = s.userData.I * lamps; s.color.copy(s.userData.color).multiply(lampTint); s.visible = lamps > 0; }
      for (const [src, m] of materials) {
        if (src.isMeshBasicMaterial) m.emissive.copy(src.color);
        else if (src.emissive && m.emissive) { m.emissive.copy(src.emissive); m.emissiveIntensity = src.emissiveIntensity; }
      }
      display.material.uniforms.exposure.value = exposure; exposureNow = exposure;
      if (ptMat?.uniforms.maxSample) ptMat.uniforms.maxSample.value = 6 / exposure;
      pt.updateEnvironment(); pt.updateLights(); pt.updateMaterials();
    },
    start(camera, pixelRatio) { pt.renderScale = 1 / pixelRatio; pt.setCamera(camera); pt.reset(); },
    step() { pt.renderSample(); },
    show(target = null, goal = 256) {
      const src = pt.target, k = Math.max(0, 1 - pt.samples / goal);
      if (denoised.width !== src.width || denoised.height !== src.height) denoised.setSize(src.width, src.height);
      const u = denoise.material.uniforms; u.map.value = src.texture; u.sigma.value = 2 + 4 * k; u.kSigma.value = 1.5; u.threshold.value = (.03 + .16 * k * k) / exposureNow;
      renderer.setRenderTarget(denoised); denoise.render(renderer);
      display.material.uniforms.map.value = denoised.texture; renderer.setRenderTarget(target); display.render(renderer); renderer.setRenderTarget(null);
    },
    dispose() { pt.dispose(); rt.dispose(); denoised.dispose(); denoise.material.dispose(); skyMat.dispose(); display.material.dispose(); own.forEach(g => g.dispose()); scene.background?.dispose?.(); scene.environment?.dispose?.(); },
  };
}
