// Production build with cache-busting: hashed JS/CSS file names written into index.html, and a build id
// appended to data/model requests, so browsers and the hosted Site never serve a stale version.
import {build} from 'esbuild';
import {readFile, writeFile, readdir, unlink, mkdir, copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const dist = 'dist', BUILD = Date.now().toString(36);
const pagesBuild = process.argv.includes('--pages');
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

// Keep the public GitHub Pages copy behind a simple, branded entry screen.
// This is a front-end convenience gate; the static files remain publicly accessible.
const appPath = `/${path.relative(dist, app).replaceAll(path.sep, '/')}`;
const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
if (!bodyMatch) throw new Error('Could not locate the document body for the access screen.');
let siteMarkup = bodyMatch[2];
const shellOpen = '<div id="site-shell" hidden>';
if (siteMarkup.includes(shellOpen)) {
  const shellStart = siteMarkup.indexOf(shellOpen) + shellOpen.length;
  const shellEnd = siteMarkup.indexOf('</div><!-- /site-shell -->', shellStart);
  if (shellEnd < 0) throw new Error('Could not unwrap the existing site shell.');
  siteMarkup = siteMarkup.slice(shellStart, shellEnd);
} else {
  siteMarkup = siteMarkup.replace(/<script[^>]*src="\/js\/app[^\"]+"[^>]*><\/script>/, '');
}
let wrappedBody;
html = html.replace(/<link rel="stylesheet" href="\/access\.css">/g, '');
if (pagesBuild) {
  const accessScreen = await readFile('src/access-gate.html', 'utf8');
  const accessLoader = `<script id="access-loader" src="/access.js" data-app="${appPath}"></script>`;
  wrappedBody = `${accessScreen}<div id="site-shell" hidden>${siteMarkup}</div><!-- /site-shell -->${accessLoader}`;
  html = html.replace(/<head>/i, '<head><link rel="stylesheet" href="/access.css">');
} else {
  wrappedBody = `${siteMarkup}<script type="module" src="${appPath}"></script>`;
}
html = html.replace(/<body([^>]*)>[\s\S]*?<\/body>/i, `<body${bodyMatch[1]}>${wrappedBody}</body>`);
await writeFile(`${dist}/index.html`, html);
if (pagesBuild) {
  await copyFile('src/access-gate.css', `${dist}/access.css`);
  await copyFile('src/access-gate.js', `${dist}/access.js`);
  await writeFile(`${dist}/.nojekyll`, '');
} else {
  for (const file of ['access.css', 'access.js', '.nojekyll']) {
    try { await unlink(`${dist}/${file}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
console.log(JSON.stringify({build: BUILD, app: path.basename(app), css: cssName, pagesBuild}));
