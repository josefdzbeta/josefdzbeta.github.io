// Development page for the building viewer: /dev/building.html
import * as THREE from 'three';
import {createBuilding} from './index.js';

window.THREE = THREE;
const status = document.getElementById('status');
const v = Date.now();                                             // never a cached data file while developing
const b = await createBuilding(document.getElementById('bd'), {url: u => u + '?v=' + v, onStatus: t => { status.textContent = t; status.hidden = !t; }});
window.viewer = b;
console.log('building', JSON.stringify(b.stats));
