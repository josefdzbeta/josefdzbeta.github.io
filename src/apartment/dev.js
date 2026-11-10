// Development page for the dwelling viewer: /dev/apartment.html?u=5B
import * as THREE from 'three';
import {createApartment} from './index.js';

window.THREE = THREE;

const code = new URLSearchParams(location.search).get('u') || '5B';
const status = document.getElementById('status');
const unit = await fetch(`/models/mykonos/units/${code}.json`).then(r => r.json());
const ap = await createApartment(document.getElementById('ap'), {unit, planURL: `/models/mykonos/plans/${code}.jpg`, onStatus: t => { status.textContent = t; status.hidden = !t; }});
window.viewer = ap;
console.log('apartment', code, JSON.stringify({buildMs: ap.stats.buildMs, firstBakeMs: ap.stats.firstBakeMs, relightMs: ap.stats.relightMs}));
