// Dumps every traced dwelling exactly as the web builds it (src/explorer.js buildUnit, Mykonos memoria finishes)
// for the photoreal Blender renders (scripts/blender/dwelling.py): material buckets, furniture per room, rooms.
//   node scripts/export-units.mjs dist/models/mykonos dist/data.json <out_dir>
import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const [modelDir, dataJson, out] = process.argv.slice(2);
globalThis.matchMedia = () => ({matches: false});
globalThis.location = {search: ''};
const tmp = path.resolve('.export-units.tmp.mjs');
await build({
  stdin: {contents: "export {buildUnit} from './src/explorer.js'; export {programmeSlots, memoriaNotes} from './src/catalog.js';", resolveDir: process.cwd(), loader: 'js'},
  bundle: true, format: 'esm', platform: 'node', outfile: tmp, define: {__BUILD__: '"export"'}, logLevel: 'error',
});
const {buildUnit, programmeSlots, memoriaNotes} = await import(tmp + '?t=' + Date.now());
fs.unlinkSync(tmp);
const db = JSON.parse(fs.readFileSync(dataJson, 'utf8'));
const project = db.projects.find(p => p.id === path.basename(modelDir));
const kitchenTile = programmeSlots(project).some(x => x.surface === 'kitchenAll') ? 'all' : 'wall', notes = memoriaNotes(project);
fs.mkdirSync(out, {recursive: true});
const dump = B => Object.fromEntries([...B.b].filter(([, v]) => v.i.length).map(([k, v]) => [k, v]));
const index = [];
for (const f of fs.readdirSync(path.join(modelDir, 'units')).sort()) {
  const u = JSON.parse(fs.readFileSync(path.join(modelDir, 'units', f), 'utf8'));
  const b = buildUnit(u, {kitchenTile, notes});
  const res = {code: u.code, size: b.group.userData.size, height: 2.6,
    rooms: b.rooms.map(r => ({index: r.index, name: r.name, type: r.type, area: r.area, center: r.center, labelAt: r.labelAt, bbox: r.bbox})),
    builder: dump(b.builder), furniture: Object.fromEntries(Object.entries(b.furniture).map(([k, v]) => [k, dump(v.builder)]))};
  fs.writeFileSync(path.join(out, u.code + '.json'), JSON.stringify(res));
  index.push(u.code);
}
console.log(JSON.stringify({units: index.length, kitchenTile, buckets: [...new Set(index.flatMap(c => Object.keys(JSON.parse(fs.readFileSync(path.join(out, c + '.json'), 'utf8')).builder)))].sort()}));
