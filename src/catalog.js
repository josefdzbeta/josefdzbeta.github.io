// Finish catalogue (no Three.js dependency, safe for the main bundle).
//
// Evidence levels shown to the visitor:
//   'oficial'   a slot of Bamaire's published personalisation programme. The NUMBER of options per
//               category is published; product names, formats and colours are NOT. Tones below only
//               visualise the slot and are labelled "tono orientativo".
//   'memoria'   fixed specification stated in the published memoria de calidades.
//   'concepto'  an additional idea, not offered by Bamaire's programme.
// --- tone variants used to visualise official slots (orientative only) -------------------------
export const WOOD = [
  {tone: 'roble claro', base: '#cfb38f', grain: '#a98559', var: .05},
  {tone: 'roble natural', base: '#ad8660', grain: '#7d5a38', var: .06},
  {tone: 'gris ceniza', base: '#b2aca2', grain: '#878075', var: .04},
  {tone: 'nogal suave', base: '#86664c', grain: '#5b412d', var: .06},
];
export const KITCHEN_TILE = [
  {tone: 'blanco brillo 30×60', tile: [.6, .3], base: '#efede7', grout: '#d8d4cb', gloss: .18, pattern: 'grid'},
  {tone: 'piedra gris 30×60', tile: [.6, .3], base: '#c8c4bb', grout: '#b2ada3', gloss: .45, pattern: 'grid', speck: .5},
  {tone: 'crema metro 7,5×15', tile: [.15, .075], base: '#e6dccb', grout: '#cfc5b2', gloss: .2, pattern: 'brick'},
  {tone: 'verde salvia 7,5×30', tile: [.3, .075], base: '#b7c0ad', grout: '#a4ab99', gloss: .22, pattern: 'brick'},
];
export const BATH = [
  {tone: 'blanco + suelo gris', wall: {tile: [.6, .3], base: '#f0eee9', grout: '#dcd8cf', gloss: .18}, floor: {tile: [.6, .6], base: '#9f9c96', grout: '#8b8882', gloss: .5, speck: .6}},
  {tone: 'piedra beige', wall: {tile: [.6, .3], base: '#ddd2c0', grout: '#c9bca7', gloss: .35, speck: .5}, floor: {tile: [.6, .6], base: '#c7b9a3', grout: '#b2a48e', gloss: .5, speck: .7}},
  {tone: 'gris cemento', wall: {tile: [.6, .3], base: '#c4c3bf', grout: '#adaca7', gloss: .6, speck: .8}, floor: {tile: [.6, .6], base: '#7f7e7b', grout: '#6c6b68', gloss: .6, speck: .9}},
  {tone: 'mármol blanco', wall: {tile: [.6, .3], base: '#eeece8', grout: '#d9d6d0', gloss: .12, vein: '#a9a7a4'}, floor: {tile: [.6, .6], base: '#e7e4df', grout: '#cfcbc4', gloss: .2, vein: '#9e9b97'}},
];
export const CARPENTRY = [
  {tone: 'lacado blanco', base: '#f1efe9', lacquer: true},
  {tone: 'roble', base: '#b48a5e', grain: '#86603b'},
  {tone: 'gris grafito', base: '#77746f', lacquer: true},
  {tone: 'roble claro', base: '#d2b48e', grain: '#a7845a'},
];
export const PAINT = [{tone: 'blanco roto', base: '#eeebe4'}, {tone: 'gris perla', base: '#dcd9d1'}, {tone: 'arena', base: '#e3d9c9'}, {tone: 'blanco', base: '#f3f2ee'}];

// Concept-only extras (not part of any published programme).
export const CONCEPTS = {
  worktop: {label: 'Encimera', options: [
    {tone: 'cuarzo blanco', kind: 'stone', base: '#ecebe7', speck: .35, gloss: .2},
    {tone: 'porcelánico negro', kind: 'stone', base: '#2f2f30', speck: .4, gloss: .25},
    {tone: 'laminado roble', kind: 'wood', base: '#b99068', grain: '#8a6440'},
  ]},
  cabinets: {label: 'Frentes de cocina', options: [
    {tone: 'blanco mate', base: '#eeede8', lacquer: true},
    {tone: 'verde salvia', base: '#9aa58f', lacquer: true},
    {tone: 'roble', base: '#b48a5e', grain: '#86603b'},
    {tone: 'grafito', base: '#4a4a4b', lacquer: true},
  ]},
  taps: {label: 'Grifería', options: [
    {tone: 'cromo (memoria: monomando cromado)', metal: '#d9dcdf', rough: .12, memoria: true},
    {tone: 'negro mate', metal: '#26272a', rough: .45},
    {tone: 'latón cepillado', metal: '#c2a26a', rough: .3},
  ]},
};

// Map a published programme category to the surfaces it drives and to the tone variants.
export function programmeSlots(project) {
  const opts = project?.materialProgramme?.options || [];
  return opts.map((o, idx) => {
    const c = (o.category + ' ' + (o.description || '')).toLowerCase();
    let surface = null, variants = null;
    if (/mobiliario de cocina/.test(c)) { surface = 'cabinets'; variants = CONCEPTS.cabinets.options; }
    else if (/pavimento|tarima/.test(c)) { surface = 'floor'; variants = WOOD; }
    else if (/cocina/.test(c)) { surface = /solado|suelo/.test(c) ? 'kitchenAll' : 'kitchenWall'; variants = KITCHEN_TILE; }
    else if (/baño|aseo/.test(c)) { surface = 'bath'; variants = BATH; }
    else if (/carpinter/.test(c)) { surface = 'carpentry'; variants = CARPENTRY; }
    else if (/pintura/.test(c)) { surface = 'paint'; variants = PAINT; }
    return {idx, category: o.category, description: o.description || '', count: o.publishedOptions, surface, variants};
  });
}

// What the memoria states for surfaces that are not buyer choices (Mykonos/Aura family wording).
export function memoriaNotes(project) {
  const sp = project?.finishSpec || {};
  return {
    furnishedKitchen: !!sp.furnishedKitchen,
    worktop: sp.furnishedKitchen && /Silestone/i.test(sp.worktop || '') ? 'Encimera de Silestone o similar (memoria)' : null,
    floorWetKitchen: /SPC/.test(sp.floorProduct || ''),          // SPC "apta para zonas húmedas … excepto baños"
    floorProduct: sp.floorProduct,
    skirting: sp.skirting || null,
    doorHeight: sp.interiorDoorHeightM || null,
    doorsWhiteLacquer: !!sp.doorsWhiteLacquer,
    categories: sp.categories || {},
    source: sp.source,
    sanitary: 'Porcelana vitrificada blanca · plato de ducha de resina antideslizante (memoria)',
    taps: 'Griferías monomando de 1ª calidad (memoria)',
    terrace: 'Baldosa de gres espesorado en terrazas y patios (memoria)',
    ceiling: 'Pintura plástica lisa blanca en techos (memoria)',
  };
}
// published category text for an official programme slot
export function memoriaFor(project, category) {
  const c = memoriaNotes(project).categories, k = category.toLowerCase();
  const key = /tarima|pavimento/.test(k) ? 'Pavimento' : /mobiliario de cocina/.test(k) ? 'Cocina' : /cocina/.test(k) ? 'Cocina' : /baño|aseo/.test(k) ? 'Baños' : /carpinter/.test(k) ? 'Carpintería interior' : /pintura/.test(k) ? 'Pintura' : null;
  const lines = (key && c[key]) || [];
  const rx = {Pavimento: /^(TARIMA|PAVIMENTO)/i, Cocina: /^(Alicatado|BALDOSA).*cocina|^COCINA AMUEBLADA/i, 'Baños': /^(BALDOSA|Alicatado).*(baño|aseo)/i, 'Carpintería interior': /^(PUERTAS DE PASO|PUERTAS INTERIORES|.*FRENTE DE ARMARIO)/i, Pintura: /paredes/i}[key];
  const all = Object.values(c).flat();
  return [...new Set(all.filter(l => !/^[•–\-]/.test(l) && rx && rx.test(l) && !/garaje|rampa/i.test(l)))].slice(0, 2);
}

export const swatchCSS = (surface, v) => surface === 'bath' ? `linear-gradient(135deg,${v.wall.base} 0 50%,${v.floor.base} 50% 100%)`
  : surface === 'floor' ? `repeating-linear-gradient(90deg,${v.base} 0 9px,${v.grain} 9px 10px)` : (v.base || v.metal);
