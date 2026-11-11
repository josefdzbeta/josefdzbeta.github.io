# Bamaire project guide for AI coding agents

This file is the starting guide for AI assistants and developers working in this repository. Read it together with `README.md` and `QA.md` before making changes.

## Project

Bamaire is a Spanish-language residential promotions website and interactive showroom prototype. It is a static site served from `dist/`; the official Bamaire site is `https://bamaire.es` and is not modified by this repository.

Deployment is through GitHub (user instruction, 8 November 2026): pushing to `main` of `github.com/josefdzbeta/josefdzbeta.github.io` runs `.github/workflows/pages.yml`, which publishes `https://josefdzbeta.github.io`. The earlier ChatGPT Site (`https://bamaire-arquitectura-jf.almondpartridge.chatgpt.site`, project ID in `.openai/hosting.json`) is no longer deployed to; leave it and its project ID untouched.

## Project files

- `src/app.js` — routes, page markup, navigation, filters, forms, and site interactions.
- `src/building/` — the Mykonos section "El edificio en 3D" (11 November 2026, replacing the Mykonos explorer, its floor/dwelling sidebar and plan list by user instruction): the building and its surroundings only. `facade.js` (façades, frame, bays, balconies, every opening with reveal, sill, frame, glass, shutter and a room behind; roof slab, level-5 terraces snapped to the façade voids, parapets, overruns) from `exterior.json` + `facade-openings.json` + `building.json`; `site.js` (raised plot, pool, solarium, slatted fences, garage door and ramp, patio walls; OpenStreetMap ground classes `ground_class.png`, neighbouring buildings, leaf-card trees, shrubs, street lamps from `context.json`); `props.js` (parked cars, terrace cypresses); `cameras.js` (Tour orbit, Photo with Bamaire's calibrated render cameras and a 50 % overlay of the render, Walk with collisions); `index.js` (materials, GPU bake of sky and ground light reused from `src/apartment/bake.js`, presets, gradient sky, post-processing, debug bar). Development page: `node scripts/building-dev.mjs` → `/dev/building.html`. `src/shared.js` holds data access (`getJSON`/`fileURL`, used by the viewer so the offline copy works), heights and status per portal.
- `src/explorer.js` — Three.js building/floor views generated at runtime from `dist/models/<promotion>/` (traced from the published plan PDFs); since 11 November 2026 only its interiors are used, by the finishes configurator (`#acabados`).
- `src/apartment/` — the dwelling viewer (10 November 2026, replacing the Blender renders; not shown on the site since 11 November 2026, its geometry, texture and bake modules are shared with `src/building/`): `plan.js` (traced grid → wall voxels and classified openings), `architecture.js` (walls, sills, lintels, ceilings, floors, PVC windows, doors, aluminium roller shutters), `geometry.js` (BufferGeometry builders, lightmap atlas packing), `textures.js` + `materials.js` (procedural PBR surfaces at real scale; lightmapped architecture), `bake.js` (GPU lightmap bake: sky, lamps, sun, two bounces), `lighting.js` (time-of-day presets, sun, sky), `furniture.js` (procedural furniture, decor, instanced foliage), `layouts.js` (5B transcribed from its published plan, photo shots) and `autolayout.js` (furniture for every other dwelling from its traced plan), `cameras.js` (Tour / Photo / Walk), `index.js` (renderer, post-processing, auto-exposure, debug bar). Development page: `node scripts/apartment-dev.mjs` → `/dev/apartment.html?u=5B` (`dist/dev/` is git-ignored).
- `src/finishes.js`, `src/catalog.js` — procedural physically scaled textures; official programme slots, memoria facts and concept extras.
- `scripts/plans/` — plan tracing, key-plan assembly, model build and validation report; `exterior.py` builds the Mykonos exterior (façade textures + spec) from the published elevations; `context.py` the OpenStreetMap surroundings; `scripts/blender/validate_and_export.py` — headless Blender validation renders and GLB export of the traced plans. The earlier Blender photoreal renders (turntable, dwelling orbits, Poly Haven assets and their scripts) are archived outside the repository in `../archive/renders-2026-11-10/` and are no longer part of the site. `scripts/optimize_images.py` writes the responsive WebP variants in `dist/assets/opt/` (rerun after adding images). See `dist/docs/fidelity-audit.md`.
- `dist/index.html` — static HTML shell and global header/footer.
- `dist/style.css` — site styling and responsive breakpoints.
- `src/access-gate.html`, `src/access-gate.css`, `src/access-gate.js` — the public GitHub Pages entry screen, branding, and shared passcode flow. `build.mjs` wraps the compiled site behind it.
- `dist/data.json` — promotion, project, and copy data used by the site.
- `dist/assets/` — Bamaire logo and image assets.
- `dist/docs/original-copy.json` — collected original website copy and source URLs.
- `dist/docs/source-index.json` and `dist/docs/content-inventory.md` — source and content references.
- `dist/docs/production-requirements.md` — outstanding production requirements and accuracy constraints.
- `scripts/build-local.mjs` — creates the self-contained local HTML copy at `../Bamaire-local.html`.
- `README.md` — setup and feature overview; `QA.md` — recorded verification and limitations.

`npm run build` bundles `src/app.js` and `src/explorer.js` into `dist/js/` with content-hashed names and updates the script/stylesheet references. `npm run build:pages` additionally wraps the page in the public access screen and copies its CSS/JS into `dist/`; local development uses `npm run build` and stays ungated. Edit `dist/style.css`; the hashed copy is generated. Neither build regenerates `dist/data.json`, `dist/style.css` or `dist/models/` (use `scripts/plans/`).

The GitHub Pages deployment runs `npm ci` and `npm run build`, then publishes `dist/` from the `main` branch. Its public entry URL is `https://josefdzbeta.github.io`; the access screen compares the visitor's input to the shared passcode `bamaire` in browser code. Keep this as a simple front-end gate, per the user's instruction; the repository and files are public and the gate is not server-side authentication.

## Copy and accuracy rules

- Keep the website copy aligned with Bamaire's current published text. Do not invent marketing claims, prices, availability, measurements, orientations, or building specifications.
- Check `dist/docs/original-copy.json` and the source references before changing promotion text. Preserve source URLs and attribution where present.
- 3D dwellings are traced from published plans and must keep their per-room validation visible; anything not in the sources (heights, door swing, fixture positions, Portal 2, finish tones) stays labelled as inferred or conceptual. Original published plans and specifications are the authority for dwelling details.
- Traced dwellings are fitted to the printed m² (boundaries without walls only); do not publish a dwelling whose raw trace deviates more than 35 % (`MAX_ERR` in `scripts/plans/build_model.py`) or whose fitted model deviates more than 15 % area-weighted (`scripts/plans/prune.py`). Mykonos Portal 2 repeats Portal 1 by client instruction. Heights come from the published elevation (see `HEIGHTS` in `src/shared.js`). Portal 2 is not on sale: it must read "Próximamente", never a Portal 1 status. Portal 1 red-line dwellings read "Reservada" (client, 8 November 2026), green-line "Disponible".
- The contact form prepares a downloadable summary and an email draft. It does not submit to a CRM or send email.

## Local development

Requirements: Node.js and npm. If dependencies are absent, run `npm install` from this directory.

```sh
npm run build
npm run dev
```

Open `http://localhost:4173`. To regenerate the standalone copy, run:

```sh
node scripts/build-local.mjs
```

The resulting file is `../Bamaire-local.html`; `../Bamaire-local.zip` is the packaged copy. Online maps and linked source documents still need internet access.

## Publishing and credentials

- Deploy only through GitHub: commit on `main` and push; the Pages workflow builds with `npm ci` + `npm run build:pages` and publishes `dist/`. Check the run (Actions tab or `api.github.com/repos/josefdzbeta/josefdzbeta.github.io/actions/runs`) and the live site afterwards. Commit and push only when the user asks.
- Everything in the repository is public (models, plans, code, the passcode). Do not add anything that must stay private.
- Do not deploy to the ChatGPT Site any more and do not create a replacement Site; keep `.openai/hosting.json` as it is.
- Keep repository credentials and access tokens in session memory and pass them only through the supported helper's stdin. Never put credentials in source files, shell history, logs, or this guide.
- Do not add a custom domain or change DNS unless the user requests it and confirms they control that domain.
