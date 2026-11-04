import {build} from 'esbuild';
await build({entryPoints:['src/app.js','src/explorer.js'],bundle:true,minify:true,format:'esm',splitting:true,outdir:'dist/js',target:['es2022']});
