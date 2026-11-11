// Bundles the building viewer's development page into dist/dev/ (not linked from the site).
import {build} from 'esbuild';
import {writeFile, mkdir} from 'node:fs/promises';
await mkdir('dist/dev', {recursive: true});
await build({entryPoints: ['src/building/dev.js'], bundle: true, format: 'esm', outfile: 'dist/dev/building.js', target: ['es2022'], sourcemap: true, minify: false});
await writeFile('dist/dev/building.html', `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mykonos · edificio</title><link rel="stylesheet" href="/style.css?v=${Date.now()}"><style>html,body{margin:0;height:100%;background:#111}#bd{position:fixed;inset:0}#status{position:fixed;left:16px;top:16px;color:#fff;font:14px system-ui;z-index:5}</style></head>
<body><div id="bd" class="ap bd"></div><div id="status">Cargando…</div><script type="module" src="/dev/building.js?v=${Date.now()}"></script></body></html>`);
console.log('dist/dev/building.html');
