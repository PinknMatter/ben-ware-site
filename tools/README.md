# Signature sequencer

A local tool for deciding the order the signature draws itself in.

**Open `signature-order.html` in a browser** — double-click it. Nothing to
install and no server needed; it is three plain files that talk to each other
from the same folder.

## What it does

Click waypoints along the signature in the order the pen should travel. Each
click snaps to the traced **centreline**, and the run between one waypoint and
the next is filled in by walking the skeleton, so a stroke always follows the
real ink and can never cut a corner across white paper. Press <kbd>N</kbd>
wherever the pen lifts to begin another stroke.

The preview animates with the site's own timing — 0.8s a stroke, each starting
0.22s after the last — through the same reveal mask the page uses, so it is a
true rehearsal rather than an impression.

Copy the output over the `reveal` array in `src/components/Signature.astro`.
Path order is writing order; nothing else needs changing.

## The files

| File | |
| --- | --- |
| `signature-order.html` | markup and styling |
| `signature-order.js` | snapping, the skeleton search, curve fitting, preview |
| `signature-data.js` | **generated** — the ink outline, the centreline points, and their adjacency |

## Regenerating the data

`signature-data.js` is derived from `Assets/WhatsApp Image 2026-07-29…jpeg`:
the photo is flattened for lighting, thresholded to ink, the boundary traced
for the outline and the same ink skeletonised for the centreline. It only needs
redoing if the source photograph changes.

One thing to preserve if you ever rebuild it: **the adjacency list is computed
on the original integer pixel grid, not re-derived in the browser from the
exported coordinates.** Those coordinates are translated into the viewBox frame
by half a pixel, and rounding that translation breaks 8-connectivity — which
leaves the search unable to find a route along a stroke that is plainly
unbroken on screen.
