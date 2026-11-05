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

Portada editorial, colección con filtros, fichas de todas las promociones, documentos originales, mapas Google Maps, galería ampliable, trayectoria, personalización por promoción y consulta revisable. Explorador Mykonos con selección edificio/planta/vivienda, cámara 3D, interior amueblado representativo y alternativa de lista accesible.

El prototipo **no acredita stock actual** y **no contiene geometría arquitectónica aprobada**. Los modelos y muestras son ilustrativos, visibles como tales en la interfaz. Las áreas, orientación y habitaciones reales se consultan en documentos originales; no se inventan. El formulario prepara un archivo y un borrador de correo: no simula un envío al CRM.

Consultar `dist/docs/content-inventory.md`, `dist/docs/source-index.json`, `dist/docs/production-requirements.md` y `QA.md`.

Contenido: `dist/data.json`. Interacción: `src/app.js`. Modelos: `src/explorer.js`. Diseño: `dist/style.css`. El build no reemplaza los archivos de contenido y estilos.

Publicación privada registrada en `.openai/hosting.json`. No se modificó el sitio oficial bamaire.es.

## Copia local sin servidor ni login

`node scripts/build-local.mjs` genera `../Bamaire-local.html`, un archivo autocontenido con datos, imágenes y JavaScript 3D incrustados. Abre ese HTML directamente en un navegador. Mapas y documentos enlazados siguen requiriendo Internet.

El 5 de noviembre de 2026 se sustituyó la redacción promocional nueva por el texto de las páginas originales de Bamaire. `dist/docs/original-copy.json` conserva los párrafos y sus URLs. Se mantienen únicamente instrucciones de interacción y avisos de prototipo necesarios para no presentar modelos o muestras ilustrativos como verificados.
