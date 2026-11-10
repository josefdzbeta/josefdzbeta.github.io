// What the windows look out on: a generic neighbourhood around the building (illustrative, not the real street):
// blocks with window grids (lit at night), trees, streets on the ground far below, and aerial haze.
import * as T from 'three';

const rng = seed => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const GROUND = -16.9;                                         // the dwelling's floor is about 17 m above the street

function facadeTextures(r) {
  const W = 256, H = 512, c = Object.assign(document.createElement('canvas'), {width: W, height: H}), e = Object.assign(document.createElement('canvas'), {width: W, height: H});
  const x = c.getContext('2d'), y = e.getContext('2d');
  x.fillStyle = '#e9e5dc'; x.fillRect(0, 0, W, H); y.fillStyle = '#000'; y.fillRect(0, 0, W, H);
  for (let row = 0; row < 16; row++) for (let col = 0; col < 8; col++) {
    const px = 8 + col * 31, py = 10 + row * 31;
    x.fillStyle = r() < .15 ? '#8d9196' : '#3c4248'; x.fillRect(px, py, 16, 18);           // glass, some shutters down
    x.fillStyle = '#d5d0c6'; x.fillRect(px - 2, py + 18, 20, 3);                            // sill
    if (r() < .35) { y.fillStyle = r() < .5 ? '#ffd9a0' : '#ffe9c4'; y.fillRect(px, py, 16, 18); }
  }
  const tex = cv => { const t = new T.CanvasTexture(cv); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; return t; };
  return {map: tex(c), emissiveMap: tex(e)};
}

function groundTexture(r) {
  const S = 1024, c = Object.assign(document.createElement('canvas'), {width: S, height: S}), x = c.getContext('2d');
  x.fillStyle = '#7f8a6c'; x.fillRect(0, 0, S, S);
  for (let k = 0; k < 900; k++) { x.fillStyle = `rgba(${90 + r() * 40},${100 + r() * 40},${70 + r() * 30},.35)`; x.fillRect(r() * S, r() * S, 6 + r() * 30, 6 + r() * 30); }
  x.fillStyle = '#6d6d6a';
  for (const p of [.18, .5, .82]) { x.fillRect(0, p * S - 9, S, 18); x.fillRect(p * S - 9, 0, 18, S); }
  x.fillStyle = '#c9c4b8'; for (const p of [.18, .5, .82]) { x.fillRect(0, p * S - 12, S, 3); x.fillRect(0, p * S + 9, S, 3); }
  const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(3, 3); t.anisotropy = 8;
  return t;
}

export function createSurroundings({center = new T.Vector3(), keepOut = 30, seed = 3} = {}) {
  const r = rng(seed), g = new T.Group(); g.name = 'surroundings';
  const ground = new T.Mesh(new T.PlaneGeometry(900, 900), new T.MeshStandardMaterial({map: groundTexture(r), roughness: 1}));
  ground.rotation.x = -Math.PI / 2; ground.position.set(center.x, GROUND - .05, center.z); g.add(ground);
  // blocks
  const fac = facadeTextures(r), mat = new T.MeshStandardMaterial({map: fac.map, emissiveMap: fac.emissiveMap, emissive: '#ffffff', emissiveIntensity: 0, roughness: .9});
  const N = 70, blocks = new T.InstancedMesh(new T.BoxGeometry(1, 1, 1).translate(0, .5, 0), mat, N), m = new T.Matrix4(), col = new T.Color();
  let n = 0;
  for (let tries = 0; n < N && tries < 600; tries++) {
    const a = r() * Math.PI * 2, d = keepOut + 12 + r() * 170, w = 12 + r() * 26, dd = 10 + r() * 16, h = 6 + r() * (d < 80 ? 14 : 22);
    const x = center.x + Math.cos(a) * d, z = center.z + Math.sin(a) * d;
    m.compose(new T.Vector3(x, GROUND, z), new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), Math.round(a / (Math.PI / 2)) * Math.PI / 2 + (r() - .5) * .3), new T.Vector3(w, h, dd));
    blocks.setMatrixAt(n, m); blocks.setColorAt(n, col.set(['#f1ede4', '#e6dfd2', '#efe8dc', '#dcd6cc', '#f4f1ea'][Math.floor(r() * 5)])); n++;
  }
  blocks.count = n; g.add(blocks);
  // trees along the streets and in the gardens
  const treeGeo = new T.IcosahedronGeometry(1, 2), treeMat = new T.MeshStandardMaterial({color: '#ffffff', roughness: .9, flatShading: true});
  const trees = new T.InstancedMesh(treeGeo, treeMat, 160);
  for (let k = 0; k < 160; k++) {
    const a = r() * Math.PI * 2, d = keepOut - 6 + r() * 120, s = 2.2 + r() * 2.8;
    m.compose(new T.Vector3(center.x + Math.cos(a) * d, GROUND + s * 1.4, center.z + Math.sin(a) * d), new T.Quaternion(), new T.Vector3(s, s * 1.15, s));
    trees.setMatrixAt(k, m); trees.setColorAt(k, col.set(r() < .5 ? '#5d7347' : '#6f8551').offsetHSL(0, 0, (r() - .5) * .08));
  }
  g.add(trees);
  g.traverse(o => { o.castShadow = false; o.receiveShadow = false; });
  // night: a share of the windows lit
  g.setLights = level => { mat.emissiveIntensity = level * 2.5; };
  return g;
}
