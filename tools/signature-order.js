// Sequencing tool for the signature.
//
// You click waypoints along the signature in the order the pen should travel.
// Each click snaps to the nearest point on the traced CENTRELINE, and the
// stretch between one waypoint and the next is filled in by walking the
// skeleton itself, so the result always follows the real ink and never cuts a
// corner across white paper. "New stroke" is a pen lift.
//
// The output is the `reveal` array for src/components/Signature.astro. The
// smoothing, simplification and curve fit below are ports of the Python that
// produced the committed trace, so what you draw here is what the site animates.

/* global DATA */

const PTS = DATA.skel;
const ADJ = DATA.adj;

// Adjacency is precomputed in the generator, on the original integer pixel
// grid. It is NOT rebuilt here from coordinates: the points have been
// translated into the viewBox frame by a half pixel, and re-deriving
// neighbours from those rounded positions loses 8-connectivity, which leaves
// the search unable to find a route along an unbroken stroke.
function nearest(x, y) {
  let best = -1;
  let bd = Infinity;
  for (let i = 0; i < PTS.length; i++) {
    const dx = PTS[i][0] - x;
    const dy = PTS[i][1] - y;
    const d = dx * dx + dy * dy;
    if (d < bd) { bd = d; best = i; }
  }
  return { index: best, dist: Math.sqrt(bd) };
}

// Shortest run of skeleton points from a to b. ~2.5k points, so a plain
// breadth-first search is instant.
function pathBetween(a, b) {
  if (a === b) return [a];
  const prev = new Int32Array(PTS.length).fill(-1);
  const seen = new Uint8Array(PTS.length);
  const queue = [a];
  seen[a] = 1;
  for (let head = 0; head < queue.length; head++) {
    const cur = queue[head];
    if (cur === b) break;
    const ns = ADJ[cur];
    for (let k = 0; k < ns.length; k++) {
      const n = ns[k];
      if (seen[n]) continue;
      seen[n] = 1;
      prev[n] = cur;
      queue.push(n);
    }
  }
  if (!seen[b]) return null;
  const out = [];
  for (let c = b; c !== -1; c = prev[c]) out.push(c);
  return out.reverse();
}

// ---------------------------------------------------------------- geometry
function resample(P, step) {
  const d = [0];
  for (let i = 1; i < P.length; i++) {
    d.push(d[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  }
  const total = d[d.length - 1];
  if (total < 1e-6) return P.slice(0, 2);
  const n = Math.max(Math.floor(total / step) + 1, 2);
  const out = [];
  let j = 0;
  for (let k = 0; k < n; k++) {
    const t = (total * k) / (n - 1);
    while (j < d.length - 2 && d[j + 1] < t) j++;
    const span = d[j + 1] - d[j] || 1;
    const f = (t - d[j]) / span;
    out.push([
      P[j][0] + (P[j + 1][0] - P[j][0]) * f,
      P[j][1] + (P[j + 1][1] - P[j][1]) * f,
    ]);
  }
  return out;
}

function smooth(P, k) {
  if (P.length < 2 * k + 1) return P;
  const out = P.map((p) => p.slice());
  for (let i = k; i < P.length - k; i++) {
    let sx = 0;
    let sy = 0;
    for (let o = -k; o <= k; o++) { sx += P[i + o][0]; sy += P[i + o][1]; }
    out[i] = [sx / (2 * k + 1), sy / (2 * k + 1)];
  }
  return out;
}

function rdp(P, eps) {
  if (P.length < 3) return P;
  const keep = new Uint8Array(P.length);
  keep[0] = keep[P.length - 1] = 1;
  const stack = [[0, P.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    if (b <= a + 1) continue;
    const vx = P[b][0] - P[a][0];
    const vy = P[b][1] - P[a][1];
    const L = Math.hypot(vx, vy);
    let far = -1;
    let fd = -1;
    for (let i = a + 1; i < b; i++) {
      const wx = P[i][0] - P[a][0];
      const wy = P[i][1] - P[a][1];
      const dist = L > 1e-9 ? Math.abs(vx * wy - vy * wx) / L : Math.hypot(wx, wy);
      if (dist > fd) { fd = dist; far = i; }
    }
    if (fd > eps) { keep[far] = 1; stack.push([a, far], [far, b]); }
  }
  return P.filter((_, i) => keep[i]);
}

function toBezier(P) {
  const n = P.length;
  const f = (v) => v.toFixed(1);
  let d = `M${f(P[0][0])},${f(P[0][1])}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = i > 0 ? P[i - 1] : P[i];
    const p1 = P[i];
    const p2 = P[i + 1];
    const p3 = i + 2 < n ? P[i + 2] : P[i + 1];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

function fitPath(indices) {
  const P = indices.map((i) => PTS[i]);
  if (P.length < 2) return null;
  return toBezier(rdp(smooth(resample(P, 6), 3), 1.4));
}

// ---------------------------------------------------------------- state
const SVGNS = 'http://www.w3.org/2000/svg';
const el = (id) => document.getElementById(id);
const svg = el('stage');
const layer = el('drawn');
const marks = el('marks');
const ghost = el('ghost');

let strokes = [[]];          // each stroke is a list of waypoint indices
let runs = [[]];             // the filled-in skeleton run for each stroke
let history = [];

const COLOURS = ['#e0004d', '#0a7bd4', '#0a9d4a', '#e08a00', '#8b3fd4', '#00908c'];

function snapshot() {
  history.push(JSON.stringify(strokes));
  if (history.length > 200) history.shift();
}

function rebuild() {
  runs = strokes.map((wps) => {
    if (wps.length === 1) return [wps[0]];
    const run = [];
    for (let i = 0; i < wps.length - 1; i++) {
      const seg = pathBetween(wps[i], wps[i + 1]);
      if (!seg) return [];
      run.push(...(i === 0 ? seg : seg.slice(1)));
    }
    return run;
  });
}

function render() {
  layer.textContent = '';
  marks.textContent = '';
  runs.forEach((run, si) => {
    if (run.length > 1) {
      const p = document.createElementNS(SVGNS, 'path');
      p.setAttribute('d', 'M' + run.map((i) => PTS[i].join(',')).join(' '));
      p.setAttribute('class', 'trail');
      p.setAttribute('stroke', COLOURS[si % COLOURS.length]);
      layer.appendChild(p);
    }
    strokes[si].forEach((wp, wi) => {
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', PTS[wp][0]);
      c.setAttribute('cy', PTS[wp][1]);
      c.setAttribute('r', wi === 0 ? 9 : 6);
      c.setAttribute('class', wi === 0 ? 'wp wp--first' : 'wp');
      c.setAttribute('stroke', COLOURS[si % COLOURS.length]);
      marks.appendChild(c);
    });
  });

  const drawn = runs.filter((r) => r.length > 1).length;
  const covered = new Set();
  runs.forEach((r) => r.forEach((i) => covered.add(i)));
  const here = strokes[strokes.length - 1].length;
  el('stat').textContent =
    `${drawn} stroke${drawn === 1 ? '' : 's'} · ` +
    `${here} point${here === 1 ? '' : 's'} in the current one · ` +
    `${Math.round((covered.size / PTS.length) * 100)}% of the signature covered`;
  el('undo').disabled = history.length === 0;
  emit();
}

function emit() {
  const paths = runs.map((r) => (r.length > 1 ? fitPath(r) : null)).filter(Boolean);
  el('count').textContent = paths.length;
  el('out').value = paths.length
    ? paths.map((d, i) => `  // ${i + 1}.\n  '${d}',`).join('\n')
    : '(click along the signature to build the sequence)';
  buildPreview(paths);
}

// ---------------------------------------------------------------- preview
let timer = null;
function buildPreview(paths) {
  const pv = el('previewMask');
  pv.textContent = '';
  paths.forEach((d) => {
    const p = document.createElementNS(SVGNS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', 'reveal');
    pv.appendChild(p);
  });
  play();
}

function play() {
  if (timer) { cancelAnimationFrame(timer); timer = null; }
  const paths = [...el('previewMask').querySelectorAll('path')];
  if (!paths.length) return;
  const lens = paths.map((p) => p.getTotalLength());
  // 0.8s per stroke, each starting 0.22s after the last — the site's timing.
  const DUR = 800;
  const STAGGER = 220;
  const total = DUR + STAGGER * (paths.length - 1) + 500;
  const t0 = performance.now();
  const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
  function frame(now) {
    const t = now - t0;
    paths.forEach((p, i) => {
      const f = ease((t - i * STAGGER) / DUR);
      p.style.strokeDasharray = String(lens[i]);
      p.style.strokeDashoffset = String(lens[i] * (1 - f));
    });
    timer = t < total ? requestAnimationFrame(frame) : null;
  }
  timer = requestAnimationFrame(frame);
}

// ---------------------------------------------------------------- input
function stagePoint(evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

svg.addEventListener('mousemove', (evt) => {
  const p = stagePoint(evt);
  const n = nearest(p.x, p.y);
  ghost.setAttribute('cx', PTS[n.index][0]);
  ghost.setAttribute('cy', PTS[n.index][1]);
  ghost.style.opacity = n.dist < 40 ? '1' : '0.2';
});

svg.addEventListener('click', (evt) => {
  const p = stagePoint(evt);
  const n = nearest(p.x, p.y);
  const cur = strokes[strokes.length - 1];
  if (cur.length && !pathBetween(cur[cur.length - 1], n.index)) {
    el('warn').textContent =
      'No route along the ink from the last point to there. Press N for a new stroke instead.';
    return;
  }
  el('warn').textContent = '';
  snapshot();
  cur.push(n.index);
  rebuild();
  render();
});

el('newstroke').addEventListener('click', () => {
  if (!strokes[strokes.length - 1].length) return;
  snapshot();
  strokes.push([]);
  rebuild();
  render();
});

el('undo').addEventListener('click', () => {
  const prev = history.pop();
  if (prev === undefined) return;
  strokes = JSON.parse(prev);
  if (!strokes.length) strokes = [[]];
  rebuild();
  render();
});

el('reset').addEventListener('click', () => {
  history = [];
  strokes = [[]];
  rebuild();
  render();
});

el('replay').addEventListener('click', play);

el('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(el('out').value);
    el('copy').textContent = 'Copied';
  } catch (err) {
    el('out').select();
    el('copy').textContent = 'Select + copy';
  }
  setTimeout(() => { el('copy').textContent = 'Copy'; }, 1400);
});

document.addEventListener('keydown', (evt) => {
  const typing = evt.target.tagName === 'TEXTAREA' || evt.target.tagName === 'INPUT';
  if (typing) return;
  if (evt.key === 'n' || evt.key === 'N') el('newstroke').click();
  if ((evt.key === 'z' || evt.key === 'Z') && (evt.metaKey || evt.ctrlKey)) {
    evt.preventDefault();
    el('undo').click();
  }
});

el('skelToggle').addEventListener('change', (evt) => {
  el('skeldots').style.display = evt.target.checked ? '' : 'none';
});

// Faint dots so it is obvious where a click can land.
el('skeldots').setAttribute('d', PTS.map((p) => `M${p[0]},${p[1]}h0.4`).join(''));

rebuild();
render();
