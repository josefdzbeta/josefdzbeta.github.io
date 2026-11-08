#!/usr/bin/env bash
# Full Mykonos render set: day + dusk turntables (36 frames each) and the calibrated views of renders 03 and 01.
# Run from bamaire-site/. Inputs come from scripts/plans/{context,facade_vector,glow_masks}.py and scripts/export-scene.mjs.
set -u
B=${BLENDER:-/Applications/Blender.app/Contents/MacOS/Blender}
R=../research/turntable
A=("$R/scene.json" "$R/context" dist/models/mykonos/tex)
O=(--openings "$R/facade-openings.json")
keep() { grep --line-buffered -E "^Time|rendered|Error|Traceback|done"; }
"$B" -b -P scripts/blender/turntable.py -- "${A[@]}" "$R/day2" --res 1600x1200 --samples 64 "${O[@]}" 2>&1 | keep > "$R/day2-render.log"
"$B" -b -P scripts/blender/turntable.py -- "${A[@]}" "$R/dusk2" --res 1600x1200 --samples 64 "${O[@]}" --mode dusk --glow "$R/glow" 2>&1 | keep > "$R/dusk2-render.log"
# render 03 is a day image, render 01 a blue-hour one: each comparison view uses the light of its original
"$B" -b -P scripts/blender/turntable.py -- "${A[@]}" "$R/views" --res 1920x1080 --samples 128 "${O[@]}" --cam r03 2>&1 | keep > "$R/views-render.log"
"$B" -b -P scripts/blender/turntable.py -- "${A[@]}" "$R/views" --res 1920x1080 --samples 128 "${O[@]}" --cam r01 --mode dusk --glow "$R/glow" 2>&1 | keep >> "$R/views-render.log"
echo finished
