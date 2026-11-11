// Development page for the building viewer: /dev/building.html
import * as THREE from 'three';
import {createBuilding} from './index.js';

window.THREE = THREE;
const status = document.getElementById('status');
const b = await createBuilding(document.getElementById('bd'), {onStatus: t => { status.textContent = t; status.hidden = !t; }});
window.viewer = b;
console.log('building', JSON.stringify(b.stats));
