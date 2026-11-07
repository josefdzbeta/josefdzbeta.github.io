// Production build with cache-busting: hashed JS/CSS file names written into index.html, and a build id
// appended to data/model requests, so browsers and the hosted Site never serve a stale version.
import {build} from 'esbuild';
import {readFile, writeFile, readdir, unlink, mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const dist = 'dist', BUILD = Date.now().toString(36);
await mkdir(`${dist}/js`, {recursive: true});
for (const f of await readdir(`${dist}/js`)) await unlink(`${dist}/js/${f}`);
const r = await build({entryPoints: ['src/app.js', 'src/explorer.js'], bundle: true, minify: true, format: 'esm', splitting: true, outdir: `${dist}/js`,
  target: ['es2022'], entryNames: '[name]-[hash]', chunkNames: 'chunk-[hash]', metafile: true, define: {__BUILD__: JSON.stringify(BUILD)}});
const app = Object.keys(r.metafile.outputs).find(k => r.metafile.outputs[k].entryPoint === 'src/app.js');
const css = await readFile(`${dist}/style.css`, 'utf8');
const cssName = `style-${createHash('sha1').update(css).digest('hex').slice(0, 10)}.css`;
for (const f of await readdir(dist)) if (/^style-\w+\.css$/.test(f)) await unlink(`${dist}/${f}`);
await writeFile(`${dist}/${cssName}`, css);
let html = await readFile(`${dist}/index.html`, 'utf8');
html = html.replace(/href="\/style(-\w+)?\.css"/, `href="/${cssName}"`).replace(/src="\/js\/app(-\w+)?\.js"/, `src="/${path.relative(dist, app)}"`);
await writeFile(`${dist}/index.html`, html);
console.log(JSON.stringify({build: BUILD, app: path.basename(app), css: cssName}));
