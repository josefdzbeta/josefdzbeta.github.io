// Dumps the Mykonos exterior and plot exactly as the web builds them (src/explorer.js buildExterior/buildSite)
// to JSON for the Blender turntable (scripts/blender/turntable.py). Coordinates: building frame, metres,
// y up (x 0 = courtyard … 20 = street, z along the building, +z Portal 1 / calle peatonal).
//   node scripts/export-scene.mjs dist/models/mykonos <out.json>
import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const [modelDir, out] = process.argv.slice(2);
globalThis.matchMedia = () => ({matches: false});
globalThis.location = {search: ''};
const tmp = path.resolve('.export-scene.tmp.mjs');
await build({
  stdin: {contents: "export {buildExterior, buildSite} from './src/explorer.js';", resolveDir: process.cwd(), loader: 'js'},
  bundle: true, format: 'esm', platform: 'node', outfile: tmp, define: {__BUILD__: '"export"'}, logLevel: 'error',
});
const {buildExterior, buildSite} = await import(tmp + '?t=' + Date.now());
fs.unlinkSync(tmp);
const ex = JSON.parse(fs.readFileSync(path.join(modelDir, 'exterior.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(modelDir, 'building.json'), 'utf8'));
const dump = B => Object.fromEntries([...B.b].filter(([, v]) => v.i.length).map(([k, v]) => [k, v]));
const site = buildSite(ex, b, {});
const res = {exterior: ex, building: dump(buildExterior(ex, {})), site: dump(site), trees: site.trees};
fs.writeFileSync(out, JSON.stringify(res));
for (const [g, m] of Object.entries({building: res.building, site: res.site})) console.log(g, Object.entries(m).map(([k, v]) => `${k}:${v.i.length / 3}`).join(' '));
