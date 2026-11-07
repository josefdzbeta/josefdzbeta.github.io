# Bamaire project guide for AI coding agents

This file is the starting guide for AI assistants and developers working in this repository. Read it together with `README.md` and `QA.md` before making changes.

## Project

Bamaire is a Spanish-language residential promotions website and interactive showroom prototype. It is a static site served from `dist/`; the official Bamaire site is `https://bamaire.es` and is not modified by this repository.

The current hosted Site is `https://bamaire-arquitectura-jf.almondpartridge.chatgpt.site`. It is private to its owner. Preserve that audience unless the user explicitly asks to change it. The project ID and static output configuration are in `.openai/hosting.json`.

## Project files

- `src/app.js` — routes, page markup, navigation, filters, forms, and site interactions.
- `src/viewer.js` — Mykonos viewer: photoreal turntable for the building (`src/turntable.js`, pre-rendered frames in `dist/models/mykonos/turntable/`, no WebGL) and the 3D explorer loaded on demand for floors and dwellings. `src/shared.js` holds data access, heights, status per portal (Portal 2 = "Próximamente") and the in-viewer navigation.
- `src/explorer.js` — Three.js building/floor/dwelling views generated at runtime from `dist/models/<promotion>/` (traced from the published plan PDFs).
- `src/finishes.js`, `src/catalog.js` — procedural physically scaled textures; official programme slots, memoria facts and concept extras.
- `scripts/plans/` — plan tracing, key-plan assembly, model build and validation report; `exterior.py` builds the Mykonos exterior (façade textures + spec) from the published elevations; `context.py` the OpenStreetMap surroundings (reflected to match the published plans); `scripts/blender/` — headless Blender validation renders, GLB export and the Cycles turntable (`turntable.py`; pack with `scripts/plans/turntable_pack.py`). See `dist/docs/fidelity-audit.md`.
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

`npm run build` bundles `src/app.js` and `src/explorer.js` into `dist/js/` with content-hashed names and updates the script/stylesheet references. `npm run build:pages` additionally wraps the page in the public access screen and copies its CSS/JS into `dist/`; the existing private Site build uses `npm run build` and stays ungated. Edit `dist/style.css`; the hashed copy is generated. Neither build regenerates `dist/data.json`, `dist/style.css` or `dist/models/` (use `scripts/plans/`).

The GitHub Pages deployment runs `npm ci` and `npm run build`, then publishes `dist/` from the `main` branch. Its public entry URL is `https://josefdzbeta.github.io`; the access screen compares the visitor's input to the shared passcode `bamaire` in browser code. Keep this as a simple front-end gate, per the user's instruction; the files are public and the gate is not server-side authentication. The existing ChatGPT Site remains owner-private.

## Copy and accuracy rules

- Keep the website copy aligned with Bamaire's current published text. Do not invent marketing claims, prices, availability, measurements, orientations, or building specifications.
- Check `dist/docs/original-copy.json` and the source references before changing promotion text. Preserve source URLs and attribution where present.
- 3D dwellings are traced from published plans and must keep their per-room validation visible; anything not in the sources (heights, door swing, fixture positions, Portal 2, finish tones) stays labelled as inferred or conceptual. Original published plans and specifications are the authority for dwelling details.
- Traced dwellings are fitted to the printed m² (boundaries without walls only); do not publish a dwelling whose raw trace deviates more than 35 % (`MAX_ERR` in `scripts/plans/build_model.py`) or whose fitted model deviates more than 15 % area-weighted (`scripts/plans/prune.py`). Mykonos Portal 2 repeats Portal 1 by client instruction. Heights come from the published elevation (see `HEIGHTS` in `src/shared.js`). Portal 2 is not on sale: it must read "Próximamente", never a Portal 1 status.
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

- Preserve the existing Site project ID in `.openai/hosting.json`; do not create a replacement Site for this project.
- Keep the Site private. Never widen access as a workaround for preview or phone access.
- The user separately requested a publicly hosted GitHub Pages version with a simple branded passcode screen. Publish that version through GitHub Actions; this does not change the audience of the existing private Site.
- For a hosted source edit, follow the installed Sites skill and its source helper workflow. Confirm the current Site owner and audience first, build and package from the exact source commit, then use the private deployment path.
- Keep repository credentials and access tokens in session memory and pass them only through the supported helper's stdin. Never put credentials in source files, shell history, logs, or this guide.
- Do not add a custom domain or change DNS unless the user requests it and confirms they control that domain.
