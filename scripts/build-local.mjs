import {build} from 'esbuild';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const dist=path.join(root,'dist');
const data=await readFile(path.join(dist,'data.json'),'utf8');
let app=await readFile(path.join(root,'src/app.js'),'utf8');
app=app.replace(/^const db = .*?;\n/,'const db = '+data+';\n');
const result=await build({stdin:{contents:'(async()=>{\n'+app+'\n})();',resolveDir:path.join(root,'src'),sourcefile:'local-entry.js',loader:'js'},bundle:true,write:false,minify:true,format:'iife',target:['es2022']});
let js=result.outputFiles[0].text;
let css=await readFile(path.join(dist,'style.css'),'utf8');
let html=await readFile(path.join(dist,'index.html'),'utf8');
html=html.replace(/<link rel="stylesheet" href="\/style.css">/,'<style>'+css+'</style>').replace(/<script type="module" src="\/js\/app.js"><\/script>/,()=>'<script>'+js.replaceAll('</script','<\\/script')+'</script>');
const types={'.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.md':'text/plain;charset=utf-8'};
for(const folder of ['assets','docs'])for(const name of await readdir(path.join(dist,folder))){const ref='/'+folder+'/'+name;if(!html.includes(ref))continue;const bytes=await readFile(path.join(dist,folder,name));const uri='data:'+(types[path.extname(name)]||'application/octet-stream')+';base64,'+bytes.toString('base64');html=html.replaceAll(ref,uri)}
const output=path.join(root,'../Bamaire-local.html');
await writeFile(output,html);
console.log(JSON.stringify({output,bytes:Buffer.byteLength(html),externalScripts:html.match(/<script[^>]+src=/g)?.length||0,remainingLocalAssets:html.match(/["']\/assets\//g)?.length||0}));
