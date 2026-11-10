// Bamaire dwelling in three.js: architecture from the traced plan, furniture from the published plan, baked soft
// light (sky + lamps), a live sun whose shadow map draws the roller-shutter streaks, and the debug bar of the
// reference video: Tour / Photo / Walk · Matcap / Lighting only / Wireframe · Low sun … Night.
import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {GTAOPass} from 'three/addons/postprocessing/GTAOPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {readPlan, rects} from './plan.js';
import {buildArchitecture, shutterGeometry} from './architecture.js';
import {packCharts} from './geometry.js';
import {createMaterials, sharedUniforms, ALBEDO} from './materials.js';
import {createBaker, bounceLights} from './bake.js';
import {buildFurniture} from './furniture.js';
import {layoutFor} from './layouts.js';
import {PRESETS, sunDir, createSun, createSky, roomAmbient} from './lighting.js';
import {createCameras} from './cameras.js';
import {createSurroundings} from './surroundings.js';

const small = matchMedia('(max-width: 700px), (pointer: coarse)').matches;
const NIGHT_SKY = new T.Color(.0011, .0019, .0042);                  // deep blue, in scene radiance

const WHITE_BALANCE = {                                          // per-channel gains in linear light (the photographer's white balance)
  uniforms: {tDiffuse: {value: null}, gain: {value: new T.Vector3(1, 1, 1)}},
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. ); }',
  fragmentShader: 'uniform sampler2D tDiffuse; uniform vec3 gain; varying vec2 vUv; void main(){ vec4 c = texture2D( tDiffuse, vUv ); gl_FragColor = vec4( c.rgb * gain, c.a ); }',
};
const GRADE = {                                                   // vignette + fine grain, after tone mapping
  uniforms: {tDiffuse: {value: null}, time: {value: 0}, vignette: {value: .22}, grain: {value: .018}},
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. ); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time, vignette, grain; varying vec2 vUv;
    float h( vec2 p ){ return fract( sin( dot( p, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
    void main(){ vec4 c = texture2D( tDiffuse, vUv ); vec2 d = vUv - .5; c.rgb *= 1. - vignette * dot( d, d ) * 2.2;
      c.rgb += ( h( vUv * 1000. + time ) - .5 ) * grain; gl_FragColor = c; }`,
};

export async function createApartment(container, {unit, planURL = null, onStatus = () => {}} = {}) {
  const t0 = performance.now(), plan = readPlan(unit);
  // the room a point is in, or the nearest one when it stands in a wall or a doorway (−1 far from any)
  const ownerAt = (x, z) => {
    const [i0, j0] = plan.cellOf(x, z);
    for (let rad = 0; rad < 12; rad++) for (let di = -rad; di <= rad; di++) for (let dj = -rad; dj <= rad; dj++) {
      if (Math.max(Math.abs(di), Math.abs(dj)) !== rad) continue;
      const i = i0 + di, j = j0 + dj;
      if (i >= 0 && j >= 0 && i < plan.H && j < plan.W && plan.owner[i * plan.W + j] >= 0) return plan.owner[i * plan.W + j];
    }
    return -1;
  };
  // each room's surfaces and furniture take reflections and ambient light from that room's own capture: one clone
  // of each material per room (a shared material switching captures between draws does not update reliably).
  // Lamp shades and bulbs stay shared: the presets change their glow.
  const envs = [], roomMats = new Map(), SHARED = new Set(['lampShade', 'bulb']);
  let envDefault = null, dirty = 2;                                        // dirty: frames still to render
  function bindEnv(mesh) {
    const m = mesh.material;
    if (!m?.isMeshStandardMaterial || SHARED.has(m.name)) return mesh;
    const room = mesh.userData.room ?? -1, key = m.uuid + '|' + room;
    let c = roomMats.get(key);
    if (!c) {
      c = m.clone(); c.onBeforeCompile = m.onBeforeCompile; c.customProgramCacheKey = m.customProgramCacheKey; c.userData.room = room;
      roomMats.set(key, c);
    }
    mesh.material = c;
    return mesh;
  }
  function applyEnvs() {
    for (const c of roomMats.values()) { const e = envs[c.userData.room] || envDefault; if (c.envMap !== e) { c.envMap = e; c.needsUpdate = true; } }
  }
  // ---- renderer and scene
  const renderer = new T.WebGLRenderer({antialias: false, powerPreference: 'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.NeutralToneMapping;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false;
  container.append(renderer.domElement); renderer.domElement.className = 'ap-canvas';
  const scene = new T.Scene(), U = sharedUniforms(), {M} = createMaterials(U);

  // ---- architecture (lightmapped) and its parts
  onStatus('Building the dwelling…');
  const {mesher, parts} = buildArchitecture(plan);
  const atlas = packCharts(mesher.charts, {density: small ? 18 : 26, size: small ? 1024 : 2048});
  const arch = new T.Group(); arch.name = 'architecture'; scene.add(arch);
  const lightmapped = [];
  for (const {name, room, geometry: geo} of mesher.geometries()) {
    const m = new T.Mesh(geo, M[name] || M.paint); m.name = name; m.userData.room = room; m.castShadow = m.receiveShadow = true; arch.add(m);
    if (geo.getAttribute('uv1')) lightmapped.push(m);
  }
  arch.add(...parts.meshes(M));
  // the building under the dwelling (seen over the parapets) and a neighbourhood around it
  const below = new T.Group(); scene.add(below);
  {
    const fm = new T.MeshStandardMaterial({color: '#e9e6df', roughness: .95});
    for (const [j, i, w, h] of rects(plan.W, plan.H, n => plan.g[n] !== 0)) {
      const b = new T.Mesh(new T.BoxGeometry(w * plan.c, 16.8, h * plan.c), fm); b.position.set(plan.X(j + w / 2), -8.4 - .02, plan.Z(i + h / 2)); below.add(b);
    }
  }
  const around = createSurroundings({center: new T.Vector3(0, 0, 0), keepOut: Math.hypot(...plan.size) / 2 + 8}); below.add(around);
  // wall caps for the plan view (cut at 2,3 m, dark like the published plans) and the published plan itself,
  // laid over at its exact traced scale to check the layout (shown at half opacity in the plan view)
  const caps = new T.Mesh(capGeometry(plan), new T.MeshBasicMaterial({color: '#3d4045', toneMapped: false})); caps.layers.set(2); scene.add(caps);
  const overlay = new T.Mesh(new T.PlaneGeometry(...plan.size), new T.MeshBasicMaterial({transparent: true, opacity: .5, depthTest: false, toneMapped: false}));
  overlay.rotation.x = -Math.PI / 2; overlay.position.y = 2.295; overlay.layers.set(2); overlay.visible = false; overlay.renderOrder = 10; scene.add(overlay);
  if (planURL) new T.TextureLoader().load(planURL, t => { t.colorSpace = T.SRGBColorSpace; overlay.material.map = t; overlay.material.needsUpdate = true; invalidate(); });

  // ---- furniture (from the published plan) and the shutters
  const items = layoutFor(plan), furn = buildFurniture(items, M, ownerAt);
  const furniture = new T.Group(); furniture.name = 'furniture'; furniture.add(...furn.meshes); scene.add(furniture);
  for (const l of furn.lamps) { const [i, j] = plan.cellOf(l.x.x, l.x.z); l.room = plan.owner[i * plan.W + j] ?? -1; }
  const shutters = new T.Group(); scene.add(shutters);
  const openings = plan.openings.filter(o => o.shutter);
  function setShutters(lower) {
    shutters.children.forEach(m => m.geometry.dispose()); shutters.clear();
    for (const o of openings) shutters.add(...shutterGeometry(o.shutter, o.kind === 'balcony' ? lower * .9 : lower).meshes(M).map(bindEnv));
  }
  setShutters(.5);

  // ---- light: sun, sky, lamps for the furniture at night
  const bounds = new T.Box3().setFromObject(arch);
  const sun = createSun(bounds); scene.add(sun, sun.target);
  const sky = createSky(); scene.add(sky);
  const lampLights = furn.lamps.filter(l => l.kind === 'table' || l.kind === 'pendant').slice(0, 8).map(l => {
    const p = new T.PointLight('#ffcf94', 0, l.kind === 'pendant' ? 5 : 3.5, 2); p.position.copy(l.x); p.room = l.room; scene.add(p); return p;
  });

  // ---- bake: lamps once; sky, sun and the first bounce again for every preset (shutters move)
  onStatus('Baking light…');
  scene.updateMatrixWorld(true);
  const baker = createBaker(renderer, atlas.size);
  const casters = []; scene.traverse(o => { if (o.isMesh && !o.isInstancedMesh && o.castShadow && o.parent !== below && o.parent !== shutters && o !== caps) casters.push(o); });
  baker.setScene(lightmapped, casters, bounds);
  const tb = performance.now();
  U.lampMap.value = await baker.bakeLamps(furn.lamps.filter(l => l.bake).map(l => ({x: l.x.x, y: l.x.y, z: l.x.z, intensity: l.intensity})), small ? 6 : 12);
  U.bounceMap.value = baker.targets.bounce.texture;
  for (const m of lightmapped) { m.material.lightMap = baker.targets.sky.texture; m.material.lightMap.channel = 1; m.material.needsUpdate = true; }
  let means = null, bakeMs = 0;
  async function relight(p) {
    const t = performance.now();
    baker.setDynamicCasters(shutters.children);
    await baker.bakeSky(small ? 112 : 176);
    const sunE = p.sun ? new T.Color(p.sun.color).multiplyScalar(p.sun.E) : new T.Color(0, 0, 0);
    await baker.bakeSun(p.sun ? sunDir(p.sun) : null);
    const opt = {albedo: ch => ALBEDO[ch.bucket.name] ?? .6, interior: ch => ch.room >= 0 && !plan.rooms[ch.room].exterior};
    const lampOf = ch => ch.room >= 0 ? U.lampTint.value.clone().multiplyScalar(U.lampRoom.value[ch.room]) : new T.Color(0, 0, 0);
    await baker.bakeBounce(bounceLights(baker, mesher.charts, {...opt, count: small ? 64 : 160, tints: {sky: U.skyTint.value, sun: sunE, lamp: lampOf}}));
    await baker.bakeBounce(bounceLights(baker, mesher.charts, {...opt, count: small ? 48 : 128, tints: {bounce: new T.Color(1, 1, 1)}}), {first: false});
    means = baker.roomMeans(mesher.charts, plan.rooms.length);
    bakeMs = Math.round(performance.now() - t);
  }

  // ---- post-processing
  const cams = createCameras({plan, items, renderer, container, scene});
  const composer = new EffectComposer(renderer, new T.WebGLRenderTarget(1, 1, {type: T.HalfFloatType, samples: small ? 0 : 4}));
  const renderPass = new RenderPass(scene, cams.camera); composer.addPass(renderPass);
  const gtao = small ? null : new GTAOPass(scene, cams.camera, 1, 1);
  if (gtao) { gtao.blendIntensity = .55; gtao.updateGtaoMaterial({radius: .35, distanceExponent: 1.4, thickness: 1.2, scale: 1}); composer.addPass(gtao); }
  const bloom = new UnrealBloomPass(new T.Vector2(1, 1), .14, .5, 1); composer.addPass(bloom);
  const balance = new ShaderPass(WHITE_BALANCE); composer.addPass(balance);
  composer.addPass(new OutputPass());
  const grade = new ShaderPass(GRADE); composer.addPass(grade);

  // ---- environments: every room seen from its middle at 1,8 m (above pendants and table tops), re-captured for every
  // preset (reflections, furniture light)
  const pmrem = new T.PMREMGenerator(renderer), envRTs = [];
  const living = plan.rooms.find(r => r.type === 'living_kitchen' || r.type === 'living') || plan.rooms[0];
  scene.traverse(o => { if (o.isMesh && o.userData.room !== undefined) bindEnv(o); });
  // the captures see a sky of the same tint and level as the baked one (the visible Sky shader is far brighter),
  // so furniture and lightmapped walls get the same daylight
  function capture() {
    caps.visible = false;
    // and without the live sun: its bounce is already in the walls' bake, so furniture and walls agree
    const skyWas = sky.visible, bgWas = scene.background, sunWas = sun.visible;
    sky.visible = false; sun.visible = false; scene.background = U.skyTint.value.clone().multiplyScalar(.85);
    plan.rooms.forEach((r, i) => {
      envRTs[i]?.dispose();
      envRTs[i] = pmrem.fromScene(scene, 0, .05, 80, {position: new T.Vector3(plan.X(r.label[0]), 1.8, plan.Z(r.label[1])), size: r.area > 6 ? 256 : 128});
      envs[i] = envRTs[i].texture;
    });
    envDefault = envs[living.index]; scene.environment = envDefault; applyEnvs();
    sky.visible = skyWas; scene.background = bgWas; sun.visible = sunWas;
  }

  // ---- presets, render styles
  let preset = 'Low sun', style = 'final', exposureKey = 1, exposure = 0;
  // auto-exposure: the photographer exposes for the room the camera is in (white walls read near white)
  const lum = c => .2126 * c.r + .7152 * c.g + .0722 * c.b;
  function roomExposure() {
    const r = cams.isPlan() ? living.index : roomNear(cams.camera.position);
    if (!means) return exposure || 1;
    const ill = means.sky[r].clone().multiply(U.skyTint.value).add(means.lamp[r].clone().multiply(U.lampTint.value).multiplyScalar(U.lampRoom.value[r]))
      .add(means.bounce[r]).add(U.ambient.value[r]);
    // outdoors the sun counts too (about half the terrace in sun)
    if (plan.rooms[r].exterior && sun.visible) ill.add(sun.color.clone().multiplyScalar(sun.intensity * Math.max(.15, sunDir(PRESETS[preset].sun).y) * .5));
    const E = lum(ill);
    // white balance: a cold (sky) cast is neutralised almost fully, a warm (sun, lamp) one only partly
    const k = ill.b > ill.r ? .95 : .7, g = [ill.r, ill.g, ill.b].map(c => Math.pow(E / Math.max(c, 1e-4), k));
    balance.uniforms.gain.value.set(...g).multiplyScalar(1 / lum({r: g[0], g: g[1], b: g[2]}));
    return Math.min(30, exposureKey * 2.0 / Math.max(E, plan.rooms[r].exterior ? .06 : .015));   // outdoors at night stays dark
  }
  const roomNear = p => { const r = ownerAt(p.x, p.z); return r < 0 ? living.index : r; };
  const matcap = new T.MeshMatcapMaterial({matcap: matcapTexture()}), wire = new T.MeshBasicMaterial({color: '#d7dde3', wireframe: true});
  function setFurnitureVisible(match, on) {
    let changed = false;
    furniture.children.forEach(m => { if (match(m) && m.visible !== on) { m.visible = on; changed = true; } });
    if (!changed) return;
    baker.setScene(lightmapped, casters.filter(m => m.visible), bounds);
    renderer.shadowMap.needsUpdate = true; setTime(preset);
  }
  let relighting = Promise.resolve();
  function setTime(name) {
    preset = name; const p = PRESETS[name];
    bar.querySelectorAll('[data-time]').forEach(b => b.classList.toggle('on', b.dataset.time === name));
    return relighting = relighting.then(async () => {
      if (preset !== name) return;                                        // a later choice supersedes this one
      U.skyTint.value.set(p.sky).multiplyScalar(p.skyE); U.lampTint.value.set('#ffd6a0').multiplyScalar(p.lamps * 1.2);
      if (p.sun) { const d = sunDir(p.sun); sun.visible = true; sun.color.set(p.sun.color); sun.intensity = p.sun.E; sun.place(d); sky.material.uniforms.sunPosition.value.copy(d); }
      else { sun.visible = false; sky.material.uniforms.sunPosition.value.set(0, -.3, 1); }
      sky.material.uniforms.rayleigh.value = p.sun ? (p.sun.el < 12 ? 2.6 : 1.4) : .3;
      exposureKey = p.exposure;
      // lamps: everywhere at night and dusk, and by day in rooms without a window (a photographer switches them on)
      const daylit = new Set(plan.openings.filter(o => o.kind === 'window' || o.kind === 'balcony').map(o => o.room));
      plan.rooms.forEach((r, i) => { U.lampRoom.value[i] = Math.max(p.lamps, r.exterior || daylit.has(i) ? 0 : 1); });
      if (!p.lamps) U.lampTint.value.set('#fff1e0').multiplyScalar(1.2);
      lampLights.forEach(l => { l.intensity = (U.lampRoom.value[l.room] ?? p.lamps) * 1.6; });
      around.setLights(p.lamps);
      scene.fog = new T.FogExp2(U.skyTint.value.clone().multiplyScalar(p.sun ? 1.4 : .6), .0032);   // aerial haze over the city
      M.lampShade.emissive.set(p.lamps ? '#ffcc8a' : '#000000'); M.lampShade.emissiveIntensity = p.lamps * .9;
      M.bulb.color.set(p.lamps ? '#fff1d6' : '#e8e4dc').multiplyScalar(p.lamps ? 4 : .04);              // unlit bulbs: a pale grey, not a glow
      setShutters(p.shutters);
      const A = roomAmbient(plan, p, {lamps: furn.lamps, lampRoom: U.lampRoom.value});
      U.ambient.value.forEach((c, i) => c.copy(A[i] || new T.Color(0, 0, 0)));
      await relight(p);
      renderer.shadowMap.needsUpdate = true; capture(); invalidate();
    });
  }
  function setStyle(s) {
    style = style === s ? 'final' : s;
    U.clay.value = style === 'lighting' ? 1 : 0;
    scene.overrideMaterial = style === 'matcap' ? matcap : style === 'wire' ? wire : null;
    scene.background = style === 'wire' ? new T.Color('#16191d') : null; sky.visible = style !== 'wire' && style !== 'matcap';
    bar.querySelectorAll('[data-style]').forEach(b => b.classList.toggle('on', b.dataset.style === style));
    invalidate();
  }

  // ---- UI: the debug bar of the reference video
  const bar = document.createElement('div'); bar.className = 'ap-bar';
  bar.innerHTML = `<div class="ap-group">${['Tour', 'Photo', 'Walk'].map(m => `<button data-mode="${m.toLowerCase()}">${m}</button>`).join('')}</div>
    <div class="ap-group">${[['matcap', 'Matcap'], ['lighting', 'Lighting only'], ['wire', 'Wireframe']].map(([k, l]) => `<button data-style="${k}">${l}</button>`).join('')}</div>
    <div class="ap-group">${Object.keys(PRESETS).map(p => `<button data-time="${p}">${p}</button>`).join('')}</div>`;
  bar.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.mode) cams.setMode(b.dataset.mode); if (b.dataset.style) setStyle(b.dataset.style); if (b.dataset.time) setTime(b.dataset.time);
  };
  container.append(bar);
  cams.onMode = m => { bar.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('on', b.dataset.mode === m)); renderPass.camera = cams.camera; if (gtao) gtao.camera = cams.camera; invalidate(); };
  cams.onKey = k => { if (k === 'l') setStyle('lighting'); };

  // ---- loop
  let raf = 0, last = performance.now();
  function invalidate() { dirty = Math.max(dirty, 2); }
  cams.invalidate = invalidate;
  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); composer.setSize(w, h); cams.resize(w, h); invalidate();
  };
  const ro = new ResizeObserver(resize); ro.observe(container); resize();
  let paused = false;
  function frame(now) {
    if (paused) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (cams.update(dt)) dirty = Math.max(dirty, 1);
    const want = roomExposure();
    if (!exposure || Math.abs(Math.log(want / exposure)) > .01) {        // adapt like an eye in Tour/Walk, at once for photos
      exposure = cams.mode === 'photo' || !exposure ? want : Math.exp(Math.log(exposure) + (Math.log(want) - Math.log(exposure)) * Math.min(1, dt * 1.5));
      renderer.toneMappingExposure = exposure; bloom.threshold = 2.2 / exposure; dirty = Math.max(dirty, 1);   // bloom only what reads brighter than white
    }
    if (!dirty) return;
    dirty--;
    const planView = cams.isPlan();
    renderer.clippingPlanes = planView ? [new T.Plane(new T.Vector3(0, -1, 0), 2.3)] : [];
    const night = !PRESETS[preset].sun;
    below.visible = !planView; sky.visible = !planView && style !== 'wire' && style !== 'matcap' && !night;
    bloom.enabled = !planView; if (gtao) gtao.enabled = !planView;
    scene.background = planView ? new T.Color('#ffffff') : style === 'wire' ? new T.Color('#16191d') : night ? NIGHT_SKY : null;
    grade.uniforms.time.value = (now % 1000) / 1000;
    composer.render(dt);
  }
  cams.setMode('photo');
  await setTime('Low sun');
  raf = requestAnimationFrame(frame);
  onStatus('');
  const stats = {buildMs: Math.round(performance.now() - t0), firstBakeMs: Math.round(performance.now() - tb), atlas, get relightMs() { return bakeMs; }, get means() { return means; }};
  return {
    pause() { paused = true; cancelAnimationFrame(raf); if (document.pointerLockElement) document.exitPointerLock(); },
    resume() { if (!paused) return; paused = false; last = performance.now(); invalidate(); raf = requestAnimationFrame(frame); },
    setMirror(m) { cams.mirror = m; invalidate(); },
    // per-room furniture toggles (as the sidebar offers): hidden pieces stop casting, so the light is baked again
    setFurniture(room, on) { setFurnitureVisible(m => m.userData.room === room, on); },
    setAllFurniture(on) { setFurnitureVisible(() => true, on); },
    enterRoom: i => cams.enterRoom(i),
    stats, uniforms: U, internals: {mesher, baker, plan, lightmapped, passes: {gtao, bloom, balance, grade}, M, overlay, envs}, setTime, setStyle, setMode: m => cams.setMode(m), shot: i => cams.shot(i), cams, scene, renderer,
    dispose() { cancelAnimationFrame(raf); ro.disconnect(); cams.dispose(); baker.dispose(); pmrem.dispose(); envRTs.forEach(t => t?.dispose()); composer.dispose(); renderer.dispose(); scene.traverse(o => o.geometry?.dispose()); container.replaceChildren(); },
  };
}

// tops of the walls cut at 2,3 m for the plan view
function capGeometry(plan) {
  const pos = [], {W, H, X, Z, solid} = plan;
  for (const [j, i, w, h] of rects(W, H, n => (solid[n] & 0b100) !== 0 || (solid[n] & 1) !== 0)) {
    const x0 = X(j), x1 = X(j + w), z0 = Z(i), z1 = Z(i + h), y = 2.29;
    pos.push(x0, y, z1, x1, y, z1, x1, y, z0, x0, y, z1, x1, y, z0, x0, y, z0);
  }
  const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
  return g;
}

// a soft clay matcap drawn on a canvas
function matcapTexture() {
  const c = Object.assign(document.createElement('canvas'), {width: 256, height: 256}), x = c.getContext('2d');
  const g = x.createRadialGradient(100, 90, 10, 128, 128, 135);
  g.addColorStop(0, '#f4f1ec'); g.addColorStop(.45, '#c9c3ba'); g.addColorStop(.85, '#7d776f'); g.addColorStop(1, '#4a4642');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; return t;
}
