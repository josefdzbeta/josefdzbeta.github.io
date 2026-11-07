import {build} from 'esbuild';
import {readFile, writeFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const data = await readFile(path.join(dist, 'data.json'), 'utf8');
let app = await readFile(path.join(root, 'src/app.js'), 'utf8');
app = app.replace(/^const db = .*?;\n/m, 'const db = ' + data + ';\n');
const imports = (app.match(/^import .*?;\n/gm) || []).join('');
app = app.replace(/^import .*?;\n/gm, '');
const result = await build({stdin: {contents: imports + '(async()=>{\n' + app + '\n})();', resolveDir: path.join(root, 'src'), sourcefile: 'local-entry.js', loader: 'js'}, bundle: true, write: false, minify: true, format: 'iife', target: ['es2022'], define: {__BUILD__: JSON.stringify('local')}});
let js = result.outputFiles[0].text;
let css = await readFile(path.join(dist, 'style.css'), 'utf8');
let html = await readFile(path.join(dist, 'index.html'), 'utf8');
// the hosted build wraps the site in an entry screen (build.mjs); this private file on disk opens directly
if (html.includes('<div id="site-shell" hidden>')) {
  const b = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i), open = '<div id="site-shell" hidden>';
  const st = b[2].indexOf(open) + open.length, en = b[2].indexOf('</div><!-- /site-shell -->', st);
  html = html.replace(b[0], () => `<body${b[1]}>${b[2].slice(st, en)}<script type="module" src="/js/app.js"></script></body>`).replace(/<link rel="stylesheet" href="\/access\.css">/g, '');
}
const types = {'.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.json': 'application/json', '.md': 'text/plain;charset=utf-8'};
// 3D models: traced units, building, plan overlays, validation → in-memory file map read by explorer.getJSON/fileURL
const files = {};
async function walk(dir) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) { await walk(full); continue; }
    const url = '/' + path.relative(dist, full).split(path.sep).join('/'), ext = path.extname(name);
    // photoreal turntable: one size per light keeps the file manageable (day: desktop frames, dusk: phone frames)
    if (/\/turntable\/(day\/sm|dusk\/lg)\//.test(url)) continue;
    if (ext === '.json') files[url] = JSON.parse(await readFile(full, 'utf8'));
    else files[url] = 'data:' + (types[ext] || 'application/octet-stream') + ';base64,' + (await readFile(full)).toString('base64');
  }
}
await walk(path.join(dist, 'models'));
const filesJS = 'globalThis.__BAMAIRE_FILES=' + JSON.stringify(files).replaceAll('</script', '<\\/script') + ';';
html = html.replace(/<link rel="stylesheet" href="\/style(-\w+)?\.css">/, () => '<style>' + css + '</style>')
  .replace(/<script type="module" src="\/js\/app(-\w+)?\.js"><\/script>/, () => '<script>' + filesJS + '</script><script>' + js.replaceAll('</script', '<\\/script') + '</script>');
for (const folder of ['assets', 'docs']) for (const name of await readdir(path.join(dist, folder))) {
  const ref = '/' + folder + '/' + name; if (!html.includes(ref)) continue;
  const bytes = await readFile(path.join(dist, folder, name));
  const uri = 'data:' + (types[path.extname(name)] || 'application/octet-stream') + ';base64,' + bytes.toString('base64');
  html = html.replaceAll(ref, uri);
}
const output = path.join(root, '../Bamaire-local.html');
await writeFile(output, html);
console.log(JSON.stringify({output, bytes: Buffer.byteLength(html), modelFiles: Object.keys(files).length, externalScripts: html.match(/<script[^>]+src=/g)?.length || 0, remainingLocalAssets: html.match(/["']\/assets\//g)?.length || 0}));
