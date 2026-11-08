# Bamaire · Arquitectura para vivir

Propuesta de rediseño en español, con ocho promociones y cinco proyectos históricos documentados.

## Ejecución

```sh
npm install
npm run build
npm run dev
```

Abrir http://localhost:4173. Sitio estático listo para servir desde `dist/`.

## Qué incluye

Portada editorial, colección con filtros, fichas de todas las promociones, documentos originales, mapas Google Maps, galería ampliable, trayectoria, personalización por promoción y consulta revisable. Explorador Mykonos con edificio/planta/vivienda generados a partir de los planos publicados, plano original superpuesto, vistas a la altura de los ojos por estancia, validación por estancia y alternativa de lista accesible. Configurador de acabados sobre viviendas trazadas de Mykonos y Aura.

El prototipo **no acredita stock actual**. La geometría de vivienda está **trazada de los planos comerciales publicados**, no de un proyecto aprobado; la desviación frente al plano se publica en `dist/docs/model-validation.md`. Los modelos y muestras son ilustrativos, visibles como tales en la interfaz. Las áreas, orientación y habitaciones reales se consultan en documentos originales; no se inventan. El formulario prepara un archivo y un borrador de correo: no simula un envío al CRM.

Consultar `dist/docs/content-inventory.md`, `dist/docs/source-index.json`, `dist/docs/production-requirements.md` y `QA.md`.

Contenido: `dist/data.json`. Interacción: `src/app.js`. Modelos: `src/explorer.js`. Diseño: `dist/style.css`. El build no reemplaza los archivos de contenido y estilos.

Publicación privada registrada en `.openai/hosting.json`. No se modificó el sitio oficial bamaire.es.

## GitHub Pages

La versión pública se publica desde `dist/` en [josefdzbeta.github.io](https://josefdzbeta.github.io). Antes de mostrar la web aparece una pantalla de acceso con el logotipo de Bamaire; la contraseña compartida es `bamaire`. El control se hace en el navegador para facilitar el acceso a personas no técnicas; los archivos estáticos siguen siendo públicos. El sitio privado de ChatGPT continúa independiente.

GitHub Actions ejecuta `npm ci`, `npm run build:pages` y publica `dist/` cuando se actualiza `main`. El diseño del acceso vive en `src/access-gate.html`, `src/access-gate.css` y `src/access-gate.js`; `build.mjs --pages` lo integra con la web compilada. `npm run build` sin `:pages` mantiene el sitio normal, sin puerta, para la publicación privada existente.

## Copia local sin servidor ni login

`node scripts/build-local.mjs` genera `../Bamaire-local.html`, un archivo autocontenido con datos, imágenes y JavaScript 3D incrustados. Abre ese HTML directamente en un navegador. Mapas y documentos enlazados siguen requiriendo Internet.

El 5 de noviembre de 2026 se sustituyó la redacción promocional nueva por el texto de las páginas originales de Bamaire. `dist/docs/original-copy.json` conserva los párrafos y sus URLs. Se mantienen únicamente instrucciones de interacción y avisos de prototipo necesarios para no presentar modelos o muestras ilustrativos como verificados.

## Modelos a partir de los planos (noviembre 2026)

Planos sin texto (OCR): requiere `tesseract`. Modo rápido de ajuste: `TRACE_FAST=1`. Viviendas de dos plantas en una hoja: `scripts/plans/duplex.py` (experimental).

Requisitos: Python 3 con `pymupdf numpy scipy scikit-image pillow`; Blender 4.4 opcional para validación/GLB.

```sh
python scripts/plans/batch.py ../research/source-pdfs/mykonos 'mykonos-p1-*.pdf' 'p1-(\w+)\.pdf' ../research/traced/mykonos ../research/qa/mykonos
python scripts/plans/assemble.py ../research/source-pdfs/mykonos ../research/traced/mykonos ../research/traced/mykonos-assembly.json
python scripts/plans/build_model.py ../research/source-pdfs/mykonos ../research/traced/mykonos ../research/traced/mykonos-assembly.json dist/models/mykonos
python scripts/plans/prune.py dist/models/mykonos 15
python scripts/plans/report.py dist
python scripts/plans/exterior.py ../research/source-images/mykonos dist/models/mykonos/building.json dist/models/mykonos
blender -b -P scripts/blender/validate_and_export.py -- dist/models/mykonos ../research/qa/blender/mykonos
```

Vista fotorrealista del edificio (Mykonos): entorno de OpenStreetMap, geometría exacta de la web, huecos vectorizados de los alzados, render Cycles de 36 vistas (día y atardecer) más las vistas con la cámara de los renders 03 y 01, y empaquetado WebP (`bash scripts/blender/render_all.sh` lanza todos los renders):

```sh
python scripts/plans/context.py ../research/osm/mykonos-osm.json dist/models/mykonos/exterior.json ../research/turntable/context
node scripts/export-scene.mjs dist/models/mykonos ../research/turntable/scene.json
python scripts/plans/glow_masks.py dist/models/mykonos/tex ../research/turntable/glow
python scripts/plans/facade_vector.py ../research/source-images/mykonos dist/models/mykonos/exterior.json dist/models/mykonos/tex ../research/turntable/facade-openings.json
blender -b -P scripts/blender/turntable.py -- ../research/turntable/scene.json ../research/turntable/context dist/models/mykonos/tex ../research/turntable/day --res 1600x1200 --samples 64
blender -b -P scripts/blender/turntable.py -- ../research/turntable/scene.json ../research/turntable/context dist/models/mykonos/tex ../research/turntable/dusk --res 1600x1200 --samples 64 --mode dusk --glow ../research/turntable/glow
python scripts/plans/turntable_pack.py ../research/turntable/day2 dist/models/mykonos/turntable day Día ../research/turntable/views
python scripts/plans/turntable_pack.py ../research/turntable/dusk2 dist/models/mykonos/turntable dusk Atardecer
python scripts/optimize_images.py dist
```

Viviendas fotorrealistas (planta 3D de cada vivienda trazada):

```sh
node scripts/export-units.mjs dist/models/mykonos dist/data.json ../research/dwellings
blender -b -P scripts/blender/dwelling.py -- ../research/dwellings ../research/dwellings-render --res 1600x1200 --samples 96
python scripts/plans/dwelling_pack.py ../research/dwellings-render dist/models/mykonos/dwellings
```

Detalle, resultados y lagunas: `dist/docs/fidelity-audit.md`.
