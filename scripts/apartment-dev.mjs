// Bundles the dwelling viewer's development page into dist/dev/ (not linked from the site).
import {build} from 'esbuild';
await build({entryPoints: ['src/apartment/dev.js'], bundle: true, format: 'esm', outfile: 'dist/dev/apartment.js', target: ['es2022'], sourcemap: true, minify: false});
console.log('dist/dev/apartment.js');
