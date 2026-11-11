// GPU lightmap baker. Every lightmapped quad has its own chart in one atlas (uv1); a sample renders a depth map
// from one light and adds that light's shadowed irradiance into the atlas. Maps:
//   sky    – sky light from a few hundred directions (enters only through the openings, shutters as they are)
//   lamp   – ceiling lamps (cones pointing down, jittered over a small disc)
//   sun    – the sun's direct light (only used to find where bounce light comes from)
//   bounce – two bounces: virtual point lights on the brightest surfaces (sun patches, sky-lit floors, lamp
//            pools), then on what those light (the ceiling over a sun patch lights the floor around it)
import * as T from 'three';

const VERT = /* glsl */`
attribute vec2 uv1;
varying vec3 vW; varying vec3 vN;
void main() {
  vec4 w = modelMatrix * vec4( position, 1. ); vW = w.xyz; vN = normalize( mat3( modelMatrix ) * normal );
  gl_Position = vec4( uv1 * 2. - 1., 0., 1. );
}`;
const FRAG = /* glsl */`
uniform sampler2D depthTex; uniform mat4 lightVP; uniform vec3 lightDir, lightPos, axis, radiance; uniform int spot; uniform float bias, texel, cone, minR2;
varying vec3 vW; varying vec3 vN;
void main() {
  vec3 n = normalize( vN ), L = lightDir; float att = 1.;
  if ( spot == 1 ) { vec3 d = lightPos - vW; float r2 = dot( d, d ); L = d * inversesqrt( r2 ); att = pow( max( dot( -L, axis ), 0. ), cone ) / max( r2, minR2 ); }
  float ndl = dot( n, L );
  if ( ndl <= 0. || att <= 0. ) { gl_FragColor = vec4( 0., 0., 0., 1. ); return; }
  vec4 p = lightVP * vec4( vW + n * .015, 1. ); vec3 s = p.xyz / p.w * .5 + .5;
  float vis = 0.;
  if ( s.x < 0. || s.y < 0. || s.x > 1. || s.y > 1. || s.z > 1. ) vis = spot == 1 ? 0. : 1.;
  else for ( int x = -1; x <= 1; x ++ ) for ( int y = -1; y <= 1; y ++ ) vis += step( s.z - bias, texture2D( depthTex, s.xy + vec2( x, y ) * texel ).r ) / 9.;
  gl_FragColor = vec4( radiance * ndl * att * vis, 1. );
}`;
// fills the padding texels around every chart from their covered neighbours (no dark seams)
const DILATE = /* glsl */`
uniform sampler2D src; uniform vec2 texel; varying vec2 vUv;
void main() {
  vec4 c = texture2D( src, vUv );
  if ( c.a > 0. ) { gl_FragColor = c; return; }
  vec3 sum = vec3( 0. ); float n = 0.;
  for ( int x = -1; x <= 1; x ++ ) for ( int y = -1; y <= 1; y ++ ) { vec4 q = texture2D( src, vUv + vec2( x, y ) * texel ); if ( q.a > 0. ) { sum += q.rgb; n += 1.; } }
  gl_FragColor = n > 0. ? vec4( sum / n, 1. ) : vec4( 0. );
}`;

// the chart rectangle of every atlas texel (for blurs that never cross from one surface into another)
const RECT_VERT = 'attribute vec2 uv1; attribute vec4 chart; varying vec4 vChart; void main(){ vChart = chart; gl_Position = vec4( uv1 * 2. - 1., 0., 1. ); }';
const RECT_FRAG = 'varying vec4 vChart; void main(){ gl_FragColor = vChart; }';
// separable gaussian blur inside each chart (the bounce light is low-frequency; this removes the blotches of
// sampling it with a few hundred virtual lights)
const BLUR = /* glsl */`
uniform sampler2D src, rects; uniform vec2 dir; varying vec2 vUv;
void main() {
  vec4 r = texture2D( rects, vUv ), c = texture2D( src, vUv );
  if ( r.z <= r.x ) { gl_FragColor = c; return; }
  vec2 lo = r.xy + dir * .5, hi = r.zw - dir * .5;
  vec3 sum = vec3( 0. ); float wsum = 0.;
  for ( int i = -16; i <= 16; i ++ ) {
    float w = exp( - float( i * i ) / 98. );
    sum += texture2D( src, clamp( vUv + dir * float( i ), lo, hi ) ).rgb * w; wsum += w;
  }
  gl_FragColor = vec4( sum / wsum, c.a );
}`;

// half float → float lookup (readbacks of the atlas)
const HALF = new Float32Array(65536);
for (let h = 0; h < 65536; h++) HALF[h] = T.DataUtils.fromHalfFloat(h);
const yieldTask = () => new Promise(r => setTimeout(r, 0));   // rAF is throttled in hidden tabs

export function createBaker(renderer, atlasSize, {depthSize = 2048} = {}) {
  const rt = () => new T.WebGLRenderTarget(atlasSize, atlasSize, {type: T.HalfFloatType, depthBuffer: false, generateMipmaps: false, minFilter: T.LinearFilter, magFilter: T.LinearFilter});
  const targets = {sky: rt(), lamp: rt(), sun: rt(), bounce: rt()}, scratch = rt();
  const depth = new T.WebGLRenderTarget(depthSize, depthSize, {depthTexture: new T.DepthTexture(depthSize, depthSize, T.UnsignedIntType)});
  const mat = new T.ShaderMaterial({vertexShader: VERT, fragmentShader: FRAG, side: T.DoubleSide, depthTest: false, depthWrite: false,
    blending: T.CustomBlending, blendSrc: T.OneFactor, blendDst: T.OneFactor, blendSrcAlpha: T.OneFactor, blendDstAlpha: T.OneFactor,
    uniforms: {depthTex: {value: depth.depthTexture}, lightVP: {value: new T.Matrix4()}, lightDir: {value: new T.Vector3()}, lightPos: {value: new T.Vector3()},
      axis: {value: new T.Vector3(0, -1, 0)}, radiance: {value: new T.Color()}, spot: {value: 0}, bias: {value: .0015}, texel: {value: 1 / depthSize}, cone: {value: 1.5}, minR2: {value: .04}}});
  const casterMat = new T.MeshBasicMaterial({side: T.DoubleSide, colorWrite: false});
  const atlasScene = new T.Scene(), casterScene = new T.Scene(), dynamic = new T.Group(), cam = new T.OrthographicCamera();
  casterScene.overrideMaterial = casterMat;
  const quad = new T.Mesh(new T.PlaneGeometry(2, 2), new T.ShaderMaterial({uniforms: {src: {value: null}, texel: {value: new T.Vector2(1 / atlasSize, 1 / atlasSize)}},
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4( position.xy, 0., 1. ); }', fragmentShader: DILATE, depthTest: false}));
  quad.frustumCulled = false; const quadScene = new T.Scene().add(quad);
  const rects = new T.WebGLRenderTarget(atlasSize, atlasSize, {type: T.FloatType, depthBuffer: false, generateMipmaps: false, minFilter: T.NearestFilter, magFilter: T.NearestFilter});
  const rectMat = new T.ShaderMaterial({vertexShader: RECT_VERT, fragmentShader: RECT_FRAG, side: T.DoubleSide, depthTest: false});
  const blurMat = new T.ShaderMaterial({uniforms: {src: {value: null}, rects: {value: rects.texture}, dir: {value: new T.Vector2()}},
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4( position.xy, 0., 1. ); }', fragmentShader: BLUR, depthTest: false});
  let center = new T.Vector3(), radius = 10;

  const clone = (m, material) => { const a = new T.Mesh(m.geometry, material); a.matrixAutoUpdate = false; a.matrix.copy(m.matrixWorld); a.matrixWorld.copy(m.matrixWorld); return a; };
  function setScene(lightmapped, casters, bounds) {
    atlasScene.clear(); casterScene.clear(); casterScene.add(dynamic);
    for (const m of lightmapped) { const a = clone(m, mat); a.frustumCulled = false; atlasScene.add(a); }
    for (const m of casters) casterScene.add(clone(m, casterMat));
    center = bounds.getCenter(new T.Vector3()); radius = bounds.getSize(new T.Vector3()).length() / 2 + .5;
    // chart rectangles, drawn once
    const prev = renderer.getRenderTarget(), cc = renderer.getClearColor(new T.Color()), ca = renderer.getClearAlpha();
    atlasScene.overrideMaterial = rectMat;
    renderer.setRenderTarget(rects); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(atlasScene, cam);
    atlasScene.overrideMaterial = null; renderer.setRenderTarget(prev); renderer.setClearColor(cc, ca);
  }
  function blur(target) {
    const prevMat = quad.material; quad.material = blurMat;
    for (const [d, from, to] of [[[1, 0], target, scratch], [[0, 1], scratch, target]]) {
      blurMat.uniforms.src.value = from.texture; blurMat.uniforms.dir.value.set(d[0] / atlasSize, d[1] / atlasSize);
      renderer.setRenderTarget(to); renderer.render(quadScene, cam);
    }
    quad.material = prevMat;
  }
  // casters that change between presets (the shutters) are swapped without rebuilding the rest
  function setDynamicCasters(meshes) { dynamic.clear(); for (const m of meshes) { m.updateMatrixWorld(); dynamic.add(clone(m, casterMat)); } }

  const lightCam = {dir: new T.OrthographicCamera(), spot: new T.PerspectiveCamera(150, 1, .03, 14)};
  function sample(target, s) {
    const U = mat.uniforms;
    let c;
    if (s.spot) {
      const ax = s.axis || new T.Vector3(0, -1, 0);
      c = lightCam.spot; c.fov = s.fov || 150; c.position.copy(s.pos);
      c.up.copy(Math.abs(ax.y) > .9 ? new T.Vector3(0, 0, -1) : new T.Vector3(0, 1, 0)); c.lookAt(s.pos.clone().add(ax)); c.updateMatrixWorld(); c.updateProjectionMatrix();
      U.lightPos.value.copy(s.pos); U.axis.value.copy(ax); U.cone.value = s.cone ?? 1.5; U.minR2.value = s.minR2 ?? .04; U.spot.value = 1; U.bias.value = .0004;
    } else {
      c = lightCam.dir; const R = radius;
      Object.assign(c, {left: -R, right: R, top: R, bottom: -R, near: .1, far: 4 * R});
      c.position.copy(center).addScaledVector(s.dir, 2 * R); c.up.set(Math.abs(s.dir.y) > .99 ? 1 : 0, Math.abs(s.dir.y) > .99 ? 0 : 1, 0); c.lookAt(center); c.updateMatrixWorld(); c.updateProjectionMatrix();
      U.lightDir.value.copy(s.dir); U.spot.value = 0; U.bias.value = s.bias ?? .0006;
    }
    U.lightVP.value.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse); U.radiance.value.copy(s.radiance);
    renderer.setRenderTarget(depth); renderer.clear(true, true, true); renderer.render(casterScene, c);
    renderer.setRenderTarget(target); renderer.render(atlasScene, cam);
  }
  function dilate(target, passes = 3) {
    let a = target, b = scratch;
    for (let i = 0; i < passes; i++) { quad.material.uniforms.src.value = a.texture; renderer.setRenderTarget(b); renderer.render(quadScene, cam); [a, b] = [b, a]; }
    if (a !== target) { quad.material.uniforms.src.value = a.texture; renderer.setRenderTarget(target); renderer.render(quadScene, cam); }
  }
  async function run(target, jobs, onProgress, {clear: wipe = true, dilate: grow = true} = {}) {
    const prev = renderer.getRenderTarget(), autoClear = renderer.autoClear, clear = renderer.getClearColor(new T.Color()), alpha = renderer.getClearAlpha();
    renderer.autoClear = false; renderer.setClearColor(0x000000, 0);
    if (wipe) { renderer.setRenderTarget(target); renderer.clear(); }
    for (let k = 0; k < jobs.length; k++) { sample(target, jobs[k]); if (k % 32 === 31) { onProgress?.(k / jobs.length); await yieldTask(); } }
    if (grow) dilate(target);
    renderer.setRenderTarget(prev); renderer.autoClear = autoClear; renderer.setClearColor(clear, alpha);
    return target.texture;
  }

  // sky: Fibonacci sphere; upper half = sky with CIE overcast gradation, lower half = the ground's bounce (each half
  // can be weighted or left out, and baked into another map: the exterior keeps sky and ground apart)
  function bakeSky(samples = 192, onProgress, {sky = 1, ground = .22, target = 'sky'} = {}) {
    const jobs = [];
    for (let k = 0; k < samples; k++) {
      const y = 1 - 2 * (k + .5) / samples, r = Math.sqrt(1 - y * y), phi = k * 2.399963, L = y > 0 ? sky * (1 + 2 * y) / 3 : ground;
      if (L > 0) jobs.push({dir: new T.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r), radiance: new T.Color(L, L, L).multiplyScalar(4 * Math.PI / samples)});
    }
    return run(targets[target], jobs, onProgress);
  }
  // lamps: I(θ) = I0 cos^1.5 θ, the source jittered over a 4 cm disc; a lamp with a `beam` (half-angle, rad) is a
  // narrower downlight: cos^n θ falling to a quarter at the beam's edge
  function bakeLamps(lamps, per = 10, onProgress, {target = 'lamp'} = {}) {
    const jobs = [];
    for (const lp of lamps) for (let k = 0; k < per; k++) {
      const a = k * 2.399963, rr = .04 * Math.sqrt((k + .5) / per), beam = lp.beam ? {cone: Math.log(.25) / Math.log(Math.cos(lp.beam)), fov: Math.min(150, lp.beam * 2 * 1.8 * 180 / Math.PI)} : {};
      jobs.push({spot: true, ...beam, pos: new T.Vector3(lp.x + Math.cos(a) * rr, lp.y, lp.z + Math.sin(a) * rr), radiance: new T.Color(lp.color || '#fff').multiplyScalar((lp.intensity ?? 1) / per)});
    }
    return run(targets[target], jobs, onProgress);
  }
  // the sun's direct irradiance per unit sun irradiance, through the shutters as they are
  const bakeSun = dir => run(targets.sun, dir ? [{dir, radiance: new T.Color(1, 1, 1), bias: .0004}] : []);
  // bounce light from virtual point lights (Lambertian emitters along their surface normal); the first bounce is
  // left undilated so the second can be gathered from it and added on top
  const bakeBounce = async (vpls, {first = true} = {}) => {
    await run(targets.bounce, vpls.map(v => ({spot: true, pos: v.pos, axis: v.normal, fov: 160, cone: 1, minR2: .45, radiance: v.power})), null, {clear: first, dilate: false});
    if (!first) { const prev = renderer.getRenderTarget(); blur(targets.bounce); dilate(targets.bounce); renderer.setRenderTarget(prev); }
    return targets.bounce.texture;
  };

  function read(name) {
    const buf = new Uint16Array(atlasSize * atlasSize * 4); renderer.readRenderTargetPixels(targets[name], 0, 0, atlasSize, atlasSize, buf);
    return buf;
  }
  // area-weighted mean irradiance of each room's lightmapped surfaces, per map, as THREE.Color (linear rgb)
  function roomMeans(charts, rooms, names = ['sky', 'lamp', 'bounce']) {
    const out = {};
    for (const name of names) {
      const buf = read(name), sum = new Float64Array(rooms * 3), area = new Float64Array(rooms);
      for (const ch of charts) {
        if (ch.room < 0 || !ch.px) continue;
        const [x, y, w, h] = ch.px, a = ch.su * ch.sv, nx = Math.min(w, 4), ny = Math.min(h, 4);
        for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
          const k = ((y + Math.floor((j + .5) * h / ny)) * atlasSize + x + Math.floor((i + .5) * w / nx)) * 4;
          for (let c = 0; c < 3; c++) sum[3 * ch.room + c] += HALF[buf[k + c]] / (nx * ny) * a;
        }
        area[ch.room] += a;
      }
      out[name] = Array.from(area, (A, r) => A ? new T.Color(sum[3 * r] / A, sum[3 * r + 1] / A, sum[3 * r + 2] / A) : new T.Color(0, 0, 0));
    }
    return out;
  }
  return {setScene, setDynamicCasters, bakeSky, bakeLamps, bakeSun, bakeBounce, read, roomMeans, targets, atlasSize,
    dispose() { [...Object.values(targets), scratch, depth, rects].forEach(t => t.dispose()); [mat, casterMat, rectMat, blurMat].forEach(m => m.dispose()); }};
}

// Virtual point lights for one bounce: texels sampled in proportion to the light they reflect (irradiance ×
// albedo × area), interior surfaces favoured; each light carries an equal share of the reflected flux.
export function bounceLights(baker, charts, {albedo, tints, interior, count = 64}) {
  const size = baker.atlasSize, maps = Object.entries(tints).filter(([, c]) => typeof c === 'function' || c.r + c.g + c.b > 0).map(([k, c]) => [baker.read(k), c]);
  const cand = [];
  let total = 0;
  for (const ch of charts) {
    if (!ch.px) continue;
    const [x0, y0, w, h] = ch.px, rho = albedo(ch), weight = interior(ch) ? 1 : .2, B = ch.bucket, o = ch.vertex * 3;
    if (!rho) continue;
    const a = new T.Vector3(B.p[o], B.p[o + 1], B.p[o + 2]), du = new T.Vector3(B.p[o + 3], B.p[o + 4], B.p[o + 5]).sub(a), dv = new T.Vector3(B.p[o + 9], B.p[o + 10], B.p[o + 11]).sub(a);
    const n = new T.Vector3(B.n[o], B.n[o + 1], B.n[o + 2]), step = Math.max(1, Math.round(Math.sqrt(w * h / 64))), texA = ch.su * ch.sv / (w * h);
    for (let j = 0; j < h; j += step) for (let i = 0; i < w; i += step) {
      const k = ((y0 + j) * size + x0 + i) * 4;
      let r = 0, g = 0, b = 0;
      for (const [buf, tint] of maps) { const c = typeof tint === 'function' ? tint(ch) : tint; r += HALF[buf[k]] * c.r; g += HALF[buf[k + 1]] * c.g; b += HALF[buf[k + 2]] * c.b; }
      const flux = (r + g + b) / 3 * rho * texA * step * step;
      if (!(flux > 0)) continue;
      cand.push({u: Math.min(1, (i + .5 * step) / w), v: Math.min(1, (j + .5 * step) / h), a, du, dv, n, rgb: [r * rho, g * rho, b * rho], area: texA * step * step, p: flux * weight});
      total += flux * weight;
    }
  }
  if (!total) return [];
  const out = [], share = total / count;                        // stratified by cumulative weight, equal shares
  let acc = 0, next = share * .5;
  for (const c of cand) {
    acc += c.p;
    while (acc >= next && out.length < count) {
      const pos = c.a.clone().addScaledVector(c.du, c.u).addScaledVector(c.dv, c.v).addScaledVector(c.n, .03);
      // estimator: reflected flux of the texel × (total / (N × its weight)), emitted as radiant intensity flux/π
      out.push({pos, normal: c.n.clone(), power: new T.Color(...c.rgb).multiplyScalar(c.area * share / c.p / Math.PI)});
      next += share;
    }
  }
  return out;
}
