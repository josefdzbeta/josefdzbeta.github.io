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

Requisitos: Python 3 con `pymupdf numpy scipy scikit-image pillow`; Blender 4.4 opcional para la validación de planos y GLB.

```sh
python scripts/plans/batch.py ../research/source-pdfs/mykonos 'mykonos-p1-*.pdf' 'p1-(\w+)\.pdf' ../research/traced/mykonos ../research/qa/mykonos
python scripts/plans/assemble.py ../research/source-pdfs/mykonos ../research/traced/mykonos ../research/traced/mykonos-assembly.json
python scripts/plans/build_model.py ../research/source-pdfs/mykonos ../research/traced/mykonos ../research/traced/mykonos-assembly.json dist/models/mykonos
python scripts/plans/prune.py dist/models/mykonos 15
python scripts/plans/report.py dist
python scripts/plans/exterior.py ../research/source-images/mykonos dist/models/mykonos/building.json dist/models/mykonos
blender -b -P scripts/blender/validate_and_export.py -- dist/models/mykonos ../research/qa/blender/mykonos
```

Viviendas en three.js (`src/apartment/`, desde el 10 de noviembre de 2026; los renders de Blender anteriores están archivados en `../archive/renders-2026-11-10/`, fuera de la web): cada vivienda se construye en el navegador a partir de su plano trazado, todo como BufferGeometry con materiales PBR y texturas procedurales a escala real:

- `plan.js` lee la rejilla trazada (celdas de 5 cm) como vóxeles en bandas de altura (alféizar, antepecho, dintel de puerta y de ventana, techo, forjado) y clasifica cada hueco (ventana, puerta balconera, puerta interior, marco de terraza).
- `architecture.js` saca de un único paso muros, mochetas, alféizares, dinteles, techos y suelos (cada cara con su propia carta de lightmap), y construye carpinterías de PVC, puertas lacadas y persianas de lamas de aluminio.
- `bake.js` hornea en la GPU, en un atlas: el cielo desde unas 200 direcciones (entra solo por los huecos, con las persianas como están), las lámparas de techo, el sol directo y dos rebotes de luz con luces puntuales virtuales; tarda ≈0,2–0,8 s por preset y se repite al cambiar la hora.
- `lighting.js` define los presets Low sun / Morning / Day / Evening / Night (orientativos: la orientación real no está publicada); el sol es una luz en tiempo real cuyo mapa de sombras dibuja las rayas de las persianas.
- `layouts.js` transcribe el mobiliario del plano publicado (5B) y las fotos de cada estancia; `autolayout.js` amuebla el resto desde el plano trazado (camas donde las dibuja el plano, cocina junto a la placa, sofá y TV, comedor, baños, terrazas).
- `cameras.js`: Tour (recorrido por las puertas de foto en foto), Photo (encuadres de fotógrafo inmobiliario y vista en planta con el plano publicado superpuesto) y Walk (pointer lock, WASD, Shift para correr, C para agacharse, Esc para soltar).
- `index.js`: exposición automática por estancia, balance de blancos, entorno capturado en cada estancia, AO, bloom y barra de depuración (Matcap / Lighting only / Wireframe).

Página de desarrollo (no enlazada, `dist/dev/` está en `.gitignore`):

```sh
node scripts/apartment-dev.mjs   # → http://localhost:4173/dev/apartment.html?u=5B
```

Detalle, resultados y lagunas: `dist/docs/fidelity-audit.md`.
