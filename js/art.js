/* Code-drawn graphics: patient portraits, live bedside monitor waves, treatment-room scene.
   Everything is SVG built from the game state. Cartoon style, never graphic. */
(function () {
'use strict';

/* ───────── helpers ───────── */
function hash(s) { s = String(s || ''); let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function pick(arr, h, salt) { return arr[(hash(h + ':' + salt)) % arr.length]; }
let uidN = 0; const nid = p => 'a' + (++uidN) + (p || '');

/* ───────── 1. Patient portraits ───────── */
const SKIN = ['#f8dcc8', '#f0c4a3', '#e0a87f', '#c68a5f', '#9c6a45', '#744a2e'];
const HAIR = ['#2a1b12', '#3d2616', '#5c3a1f', '#8a5a2b', '#c9974a', '#1b1b1b', '#7a3b1c'];
const GOWN = ['#9cc3e6', '#a7d3c9', '#b9b4e0', '#9fc0de'];
const darker = (hex, f) => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v * f)); return '#' + c.map(v => ('0' + Math.max(0, Math.min(255, v)).toString(16)).slice(-2)).join(''); };

function look(p) {
  const key = p.mrn || p.id || 'x', age = p.age || 30, F = p.sex === 'F';
  const grp = age < 12 ? 'child' : age < 18 ? 'teen' : age < 60 ? 'adult' : 'older';
  let hair = pick(HAIR, key, 'hair');
  if (grp === 'older') hair = pick(['#bdbdbd', '#d9d9d9', '#9e9e9e', '#e8e4dc'], key, 'gray');
  const styles = F ? (grp === 'older' ? ['bun', 'short-f', 'curly'] : grp === 'child' ? ['pigtails', 'long', 'ponytail', 'curly'] : ['long', 'ponytail', 'bob', 'curly', 'bun'])
    : (grp === 'older' ? ['bald', 'short', 'bald'] : grp === 'child' ? ['short', 'messy', 'curly'] : ['short', 'messy', 'buzz', 'curly', 'side']);
  return { key: key, grp: grp, F: F, skin: pick(SKIN, key, 'skin'), hair: hair, style: pick(styles, key, 'style'), gown: pick(GOWN, key, 'gown'),
    glasses: grp === 'older' ? hash(key + 'g') % 2 === 0 : hash(key + 'g') % 7 === 0, beard: !F && grp !== 'child' && grp !== 'teen' && hash(key + 'b') % 4 === 0, freckles: hash(key + 'f') % 5 === 0 };
}
function mood(p) {
  if (p.outcome === 'deceased') return 'gone';
  if (p.outcome === 'discharged') return 'happy';
  if (p.arrest) return 'out';
  if (p.status === 'Critical' || p.rescueActive) return 'critical';
  if (p.status === 'Unstable') return 'hurting';
  if (p.status === 'Needs Assessment') return 'worried';
  if (p.status === 'Improving') return 'better';
  return 'calm';
}
function hairBack(L) {
  const c = L.hair;
  switch (L.style) {
    case 'long': return '<path d="M29 44 Q27 20 50 19 Q73 20 71 44 L74 78 Q62 84 50 80 Q38 84 26 78 Z" fill="' + c + '"/>';
    case 'bob': return '<path d="M29 44 Q28 20 50 19 Q72 20 71 44 L72 64 Q60 68 50 66 Q40 68 28 64 Z" fill="' + c + '"/>';
    case 'ponytail': return '<path d="M64 28 Q88 30 84 64 Q80 70 76 66 Q80 50 68 42 Z" fill="' + c + '"/><path d="M29 46 Q27 22 50 20 Q73 22 71 46 L71 54 L29 54 Z" fill="' + c + '"/>';
    case 'pigtails': return '<circle cx="26" cy="52" r="8" fill="' + c + '"/><circle cx="74" cy="52" r="8" fill="' + c + '"/>';
    case 'bun': return '<circle cx="50" cy="18" r="9" fill="' + c + '"/>';
    case 'curly': return [[30, 34], [36, 24], [46, 19], [56, 19], [65, 24], [70, 34], [28, 46], [72, 46]].map(q => '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="9" fill="' + c + '"/>').join('');
    default: return '';
  }
}
function hairFront(L) {
  const c = L.hair, d = darker(c, 0.8);
  switch (L.style) {
    case 'bald': return '<path d="M31 46 Q31 36 35 32 L36 46 Z M69 46 Q69 36 65 32 L64 46 Z" fill="' + c + '"/>';
    case 'buzz': return '<path d="M31 42 Q31 22 50 22 Q69 22 69 42 Q60 31 50 31 Q40 31 31 42 Z" fill="' + c + '" opacity=".85"/>';
    case 'messy': return '<path d="M30 44 Q28 20 50 20 Q72 20 70 44 L66 34 L62 38 L58 31 L52 36 L47 30 L42 36 L37 32 L34 40 Z" fill="' + c + '"/>';
    case 'side': return '<path d="M30 44 Q29 20 50 20 Q71 20 70 44 Q66 30 56 29 Q44 34 32 36 Z" fill="' + c + '"/><path d="M56 29 Q46 31 36 34" stroke="' + d + '" stroke-width="1" fill="none"/>';
    case 'curly': return [[36, 28], [44, 25], [52, 25], [60, 28], [66, 34]].map(q => '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="6" fill="' + c + '"/>').join('');
    case 'long': case 'bob': case 'ponytail': case 'pigtails': case 'bun': case 'short-f':
      return '<path d="M30 46 Q28 19 50 19 Q72 19 70 46 Q68 32 58 28 Q50 36 36 34 Q32 38 30 46 Z" fill="' + c + '"/>';
    default: return '<path d="M30 42 Q29 20 50 20 Q71 20 70 42 Q66 30 50 29 Q36 29 30 42 Z" fill="' + c + '"/>';
  }
}
function face(L, m) {
  const ink = '#3b2a20', y = 47;
  let eyes, brows, mouth, extra = '';
  const eyeOpen = '<ellipse cx="42" cy="' + y + '" rx="2.6" ry="3" fill="' + ink + '"/><ellipse cx="58" cy="' + y + '" rx="2.6" ry="3" fill="' + ink + '"/><circle cx="43" cy="' + (y - 1) + '" r=".9" fill="#fff"/><circle cx="59" cy="' + (y - 1) + '" r=".9" fill="#fff"/>';
  const eyeShut = '<path d="M39 ' + y + ' Q42 ' + (y + 2.5) + ' 45 ' + y + ' M55 ' + y + ' Q58 ' + (y + 2.5) + ' 61 ' + y + '" stroke="' + ink + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  const eyeHalf = '<path d="M39 ' + y + ' L45 ' + y + ' M55 ' + y + ' L61 ' + y + '" stroke="' + ink + '" stroke-width="1.6" stroke-linecap="round"/><path d="M39.5 ' + y + ' Q42 ' + (y + 2.6) + ' 44.5 ' + y + ' Z M55.5 ' + y + ' Q58 ' + (y + 2.6) + ' 60.5 ' + y + ' Z" fill="' + ink + '"/>';
  const browN = '<path d="M38 41 Q42 39 46 41 M54 41 Q58 39 62 41" stroke="' + darker(L.hair === '#e8e4dc' ? '#9e9e9e' : L.hair, .9) + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  const browW = '<path d="M38 41 Q42 40 46 38 M54 38 Q58 40 62 41" stroke="' + darker(L.hair === '#e8e4dc' ? '#9e9e9e' : L.hair, .9) + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  switch (m) {
    case 'happy': eyes = '<path d="M39 ' + (y + 1) + ' Q42 ' + (y - 2.5) + ' 45 ' + (y + 1) + ' M55 ' + (y + 1) + ' Q58 ' + (y - 2.5) + ' 61 ' + (y + 1) + '" stroke="' + ink + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>'; brows = browN; mouth = '<path d="M42 57 Q50 65 58 57 Z" fill="#8a3b3b"/><path d="M44 57.5 L56 57.5" stroke="#fff" stroke-width="1.4"/>'; break;
    case 'better': eyes = eyeOpen; brows = browN; mouth = '<path d="M43 58 Q50 62 57 58" stroke="#8a3b3b" stroke-width="1.8" fill="none" stroke-linecap="round"/>'; break;
    case 'calm': eyes = eyeOpen; brows = browN; mouth = '<path d="M44 58.5 Q50 61 56 58.5" stroke="#8a3b3b" stroke-width="1.7" fill="none" stroke-linecap="round"/>'; break;
    case 'worried': eyes = eyeOpen; brows = browW; mouth = '<path d="M44 59.5 Q47 58 50 59.5 T56 59.5" stroke="#8a3b3b" stroke-width="1.7" fill="none" stroke-linecap="round"/>'; break;
    case 'hurting': eyes = '<path d="M39 ' + (y - 1) + ' L45 ' + (y + 1) + ' L39 ' + (y + 3) + ' M61 ' + (y - 1) + ' L55 ' + (y + 1) + ' L61 ' + (y + 3) + '" stroke="' + ink + '" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; brows = browW; mouth = '<path d="M44 61 Q50 56 56 61" stroke="#8a3b3b" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
      extra = '<path d="M68 36 q3 5 0 7 q-3 -2 0 -7 Z" fill="#7cc4f2"/>'; break;
    case 'critical': eyes = eyeHalf; brows = browW; mouth = '<path d="M45 60 Q50 58 55 60" stroke="#7a4b4b" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
      extra = '<path d="M28 54 Q40 50 46 53 M72 54 Q60 50 54 53" stroke="#e8f4ff" stroke-width="1.6" fill="none"/><circle cx="47" cy="53.5" r="1.4" fill="#e8f4ff"/><circle cx="53" cy="53.5" r="1.4" fill="#e8f4ff"/>' +
        '<path d="M68 36 q3 5 0 7 q-3 -2 0 -7 Z" fill="#7cc4f2"/>'; break;
    case 'out': case 'gone': eyes = eyeShut; brows = browN; mouth = '<path d="M45 59 L55 59" stroke="#7a4b4b" stroke-width="1.6" stroke-linecap="round"/>'; break;
  }
  const nose = '<path d="M50 49 Q48 53 50.5 54" stroke="' + darker(L.skin, .78) + '" stroke-width="1.4" fill="none" stroke-linecap="round"/>';
  const cheeks = (m === 'calm' || m === 'better' || m === 'happy') && (L.grp === 'child' || L.F) ? '<ellipse cx="38" cy="55" rx="4" ry="2.4" fill="#f08a8a" opacity=".35"/><ellipse cx="62" cy="55" rx="4" ry="2.4" fill="#f08a8a" opacity=".35"/>' : '';
  const freck = L.freckles ? [[37, 52], [40, 54], [36, 55], [63, 52], [60, 54], [64, 55]].map(q => '<circle cx="' + q[0] + '" cy="' + q[1] + '" r=".7" fill="' + darker(L.skin, .7) + '"/>').join('') : '';
  const lines = L.grp === 'older' ? '<path d="M35 51 q2 1.5 4 0 M61 51 q2 1.5 4 0 M44 36 q6 -1.5 12 0" stroke="' + darker(L.skin, .8) + '" stroke-width=".8" fill="none"/>' : '';
  const beard = L.beard ? '<path d="M32 50 Q34 70 50 72 Q66 70 68 50 Q64 62 56 63 Q50 60 44 63 Q36 62 32 50 Z" fill="' + L.hair + '" opacity=".9"/>' : '';
  const glasses = L.glasses ? '<g stroke="#4a3b30" stroke-width="1.3" fill="rgba(255,255,255,.18)"><circle cx="42" cy="' + y + '" r="5.5"/><circle cx="58" cy="' + y + '" r="5.5"/><path d="M47.5 ' + y + ' L52.5 ' + y + ' M36.5 ' + (y - 1) + ' L31 ' + (y - 3) + ' M63.5 ' + (y - 1) + ' L69 ' + (y - 3) + '" fill="none"/></g>' : '';
  const lash = L.F && (m === 'calm' || m === 'better' || m === 'worried') ? '<path d="M38.6 ' + (y - 2.2) + ' l-1.6 -1.4 M45.4 ' + (y - 2.2) + ' l1.6 -1.4 M54.6 ' + (y - 2.2) + ' l-1.6 -1.4 M61.4 ' + (y - 2.2) + ' l1.6 -1.4" stroke="' + ink + '" stroke-width="1" stroke-linecap="round"/>' : '';
  return lash + cheeks + freck + lines + beard + brows + eyes + nose + mouth + glasses + extra;
}
/* portrait(p, size, opts) → inline SVG. opts.bg=false for no background disc. */
function portrait(p, size, opts) {
  opts = opts || {};
  const L = look(p), m = mood(p), id = nid('pt');
  const child = L.grp === 'child';
  const pale = m === 'critical' || m === 'out' || m === 'gone';
  const skin = L.skin;
  const bgc = { happy: '#dff3e2', better: '#dff3f5', calm: '#e7eefb', worried: '#fff4cf', hurting: '#ffe6d1', critical: '#fde0e0', out: '#fde0e0', gone: '#e6e8ec' }[m];
  const head = child ? '<ellipse cx="50" cy="46" rx="21" ry="22" fill="' + skin + '"/>' : '<ellipse cx="50" cy="45" rx="19" ry="22.5" fill="' + skin + '"/>';
  let s = '<svg class="portrait m-' + m + '"' + (opts.at ? ' x="' + opts.at[0] + '" y="' + opts.at[1] + '"' : '') + ' width="' + size + '" height="' + size + '" viewBox="0 0 100 100" role="img" aria-label="Patient ' + (p.num || '') + ' portrait"><defs><clipPath id="' + id + '"><circle cx="50" cy="50" r="50"/></clipPath>' +
    '<pattern id="' + id + 'g" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M4 1 L7 4 L4 7 L1 4 Z" fill="none" stroke="' + darker(L.gown, .8) + '" stroke-width=".8"/></pattern></defs><g' + (opts.clip === false ? '' : ' clip-path="url(#' + id + ')"') + '>' +
    (opts.bg === false ? '' : '<rect width="100" height="100" fill="' + bgc + '"/>') +
    hairBack(L) +
    '<path d="M43 60 L43 76 L57 76 L57 60 Z" fill="' + darker(skin, .9) + '"/>' +
    '<path d="M12 104 Q14 78 50 74 Q86 78 88 104 Z" fill="' + L.gown + '"/><path d="M12 104 Q14 78 50 74 Q86 78 88 104 Z" fill="url(#' + id + 'g)"/>' +
    '<path d="M40 75 Q50 84 60 75" stroke="' + darker(L.gown, .75) + '" stroke-width="1.5" fill="none"/>' +
    '<ellipse cx="' + (child ? 29 : 31) + '" cy="48" rx="3.6" ry="6" fill="' + darker(skin, .93) + '"/><ellipse cx="' + (child ? 71 : 69) + '" cy="48" rx="3.6" ry="6" fill="' + darker(skin, .93) + '"/>' +
    head + hairFront(L) + face(L, m) +
    (pale ? (opts.clip === false ? '<ellipse cx="50" cy="46" rx="22" ry="24" fill="#dfe8f2" opacity=".3"/>' : '<rect width="100" height="100" fill="#dfe8f2" opacity="' + (m === 'gone' ? .45 : .28) + '" style="mix-blend-mode:screen"/>') : '') +
    '</g></svg>';
  return s;
}

/* ───────── 2. Live monitor waveforms ───────── */
const g = (t, c, w, a) => a * Math.exp(-((t - c) / w) * ((t - c) / w));
function seeded(seed) { let x = hash(seed) || 1; return () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; }
/* Rhythm on a bedside monitor. Only the rhythm is shown — ST changes and T waves are left for the 12-lead ECG. */
function beatsFor(rhythm, hr, T, rnd) {
  const out = [];
  if (rhythm === 'afib') { let t = 0.25; while (t < T) { out.push(t); t += (60 / hr) * (0.55 + rnd() * 0.9); } }
  else { const iv = 60 / Math.max(20, hr); for (let t = 0.3; t < T; t += iv) out.push(t); }
  return out;
}
function ecgTrace(rhythm, hr, W, H, seed) {
  const T = 6, rnd = seeded(seed || 'ecg'), beats = beatsFor(rhythm, hr, T, rnd), base = H * 0.62, amp = H * 0.5;
  const small = rhythm === 'low-voltage', block = rhythm === 'heart-block', wide = block;
  const pw = []; if (block) for (let t = 0.12; t < T; t += 60 / 80) pw.push(t);
  let d = '';
  for (let i = 0; i <= 900; i++) {
    const t = i * T / 900; let y = 0;
    beats.forEach((b, k) => {
      const a = small ? (k % 2 ? .28 : .4) : 1, w = wide ? 1.8 : 1;
      if (rhythm !== 'afib' && !block) y += g(t, b - .16, .025, .12 * a);
      y += g(t, b - .025 * w, .01 * w, -.1 * a) + g(t, b, .012 * w, a) + g(t, b + .03 * w, .013 * w, -.25 * a) + g(t, b + .28, .05, .25 * a);
    });
    pw.forEach(q => { y += g(t, q, .025, .12); });
    if (rhythm === 'afib') y += .03 * Math.sin(t * 47) + .02 * Math.sin(t * 29 + 1.3);
    d += (i ? 'L' : 'M') + (t / T * W).toFixed(1) + ' ' + (base - y * amp).toFixed(1);
  }
  return d;
}
function plethTrace(rhythm, hr, W, H, perf, seed) {
  const T = 6, rnd = seeded(seed || 'ecg'), beats = beatsFor(rhythm, hr, T, rnd), base = H * 0.85, amp = H * 0.7 * perf;
  let d = '';
  for (let i = 0; i <= 600; i++) {
    const t = i * T / 600; let y = 0;
    beats.forEach(b => { y += g(t, b + .2, .085, 1) + g(t, b + .42, .07, .32); });
    d += (i ? 'L' : 'M') + (t / T * W).toFixed(1) + ' ' + (base - Math.min(1.1, y) * amp).toFixed(1);
  }
  return d;
}
function respTrace(rr, W, H) {
  const T = 6, f = rr / 60; let d = '';
  for (let i = 0; i <= 300; i++) { const t = i * T / 300; const y = Math.sin(2 * Math.PI * f * t - Math.PI / 2); d += (i ? 'L' : 'M') + (t / T * W).toFixed(1) + ' ' + (H / 2 - y * H * 0.32).toFixed(1); }
  return d;
}
function vfTrace(W, H) { let d = ''; for (let x = 0; x <= W; x += 3) d += (x ? 'L' : 'M') + x + ' ' + (H / 2 + Math.sin(x * .105) * H * .18 * Math.sin(x * .018 + 1) + Math.sin(x * .27) * H * .07).toFixed(1); return d; }
function flatTrace(W, H, y) { return 'M0 ' + (H * (y || .6)) + ' L' + W + ' ' + (H * (y || .6)); }
/* One sweeping channel: the trace is drawn once; an eraser bar sweeps left to right like a real monitor. */
function channel(cls, d, color, H, label, dur) {
  return '<div class="ch ' + cls + '" style="--dur:' + dur + 's"><span class="ch-l" style="color:' + color + '">' + label + '</span>' +
    '<svg viewBox="0 0 600 ' + H + '" preserveAspectRatio="none"><path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="1.8" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg><i class="sweep"></i></div>';
}
function monitorWaves(o) {
  // o: { rhythm, hr, spo2, rr, sbp, arrest, seed }
  if (o.arrest) return channel('c-ecg', vfTrace(600, 70), '#f87171', 70, 'II', 6) + channel('c-pleth', flatTrace(600, 40, .8), '#38bdf8', 40, 'PLETH', 6) + channel('c-resp', flatTrace(600, 30, .5), '#facc15', 30, 'RESP', 6);
  const perf = Math.max(.25, Math.min(1, (o.sbp - 60) / 60)) * (o.spo2 < 85 ? .7 : 1);
  return channel('c-ecg', ecgTrace(o.rhythm, o.hr, 600, 70, o.seed), '#4ade80', 70, 'II', 6) +
    channel('c-pleth', plethTrace(o.rhythm, o.hr, 600, 40, perf, o.seed), '#38bdf8', 40, 'PLETH', 6) +
    channel('c-resp', respTrace(o.rr, 600, 30), '#facc15', 30, 'RESP', 6);
}

/* ───────── 3. Treatment-room scene ───────── */
const EQUIP = [
  ['vent', /breathing tube|intubat|ventilat|protect (his|her|the) airway|airway team/],
  ['neb', /nebuli|bronchodilator|inhaled/],
  ['oxygen', /oxygen|non-rebreather|cpap|bipap|high-flow/],
  ['blood', /transfus|red blood cells|blood product/],
  ['iv', /\biv\b|intravenous|fluids|drip|antibiotic|insulin|infusion|transfus|blood thinner|clot-dissolving|clot-busting|clot removal|medicine through/],
  ['collar', /collar|c-spine|neck brace|spine (precautions|protection)/],
  ['splintArm', /(splint|sling|cast).*\b(wrist|arm|elbow|hand|forearm)\b|\b(wrist|arm|elbow|hand|forearm)\b.*(splint|sling|cast)/],
  ['splintLeg', /(splint|traction|cast).*\b(leg|hip|ankle|knee|shin|tibia|femur)\b|\b(leg|hip|ankle|knee|shin|tibia|femur)\b.*(splint|traction|cast)/],
  ['defib', /cardioversion|defibrillat|pacing|pacemaker pads|cpr performed/]
];
const EQUIP_NAMES = { monitor: 'Heart Monitor', oxygen: 'Oxygen Mask', neb: 'Nebulizer Mask', iv: 'IV Line', blood: 'Blood Transfusion', collar: 'Neck Collar', splintArm: 'Arm Splint', splintLeg: 'Leg Splint', vent: 'Breathing Machine', defib: 'Crash Cart', family: 'Family Visiting' };
function equipment(p) {
  const txt = ((p.log || []).map(l => l.correctText || '').join(' | ') + ' | ' + (p.record || []).filter(r => r.type === 'intervention' && /CPR performed/.test(r.text)).map(r => r.text).join(' ')).toLowerCase();
  const eq = {};
  EQUIP.forEach(e => { if (e[1].test(txt)) eq[e[0]] = true; });
  if (eq.vent) { eq.oxygen = false; eq.neb = false; }
  if (eq.neb) eq.oxygen = false;
  if (p.arrest) eq.defib = true;
  if (p.talkDone) eq.family = true;
  if (!p.outcome) eq.monitor = true;
  return eq;
}
function clockHands(min) {
  const h = (min % 720) / 720 * 360, m = (min % 60) / 60 * 360, r = a => (a - 90) * Math.PI / 180;
  return '<path d="M345 36 L' + (345 + 6 * Math.cos(r(h))).toFixed(1) + ' ' + (36 + 6 * Math.sin(r(h))).toFixed(1) + ' M345 36 L' + (345 + 9 * Math.cos(r(m))).toFixed(1) + ' ' + (36 + 9 * Math.sin(r(m))).toFixed(1) + '" stroke="#37474f" stroke-width="1.6" stroke-linecap="round"/>';
}
function visitor(p, x, y) {
  const fam = { mrn: (p.mrn || p.id) + '-fam', age: p.age < 18 ? 38 : p.age > 60 ? 40 : 55, sex: hash((p.mrn || p.id) + 'fs') % 2 ? 'F' : 'M', status: 'Stable' };
  const F = look(fam);
  return '<g><rect x="' + (x + 4) + '" y="' + (y + 40) + '" width="40" height="8" rx="3" fill="#8d6e63"/><path d="M' + (x + 8) + ' ' + (y + 48) + ' L' + (x + 8) + ' ' + (y + 70) + ' M' + (x + 40) + ' ' + (y + 48) + ' L' + (x + 40) + ' ' + (y + 70) + '" stroke="#6d4c41" stroke-width="3"/>' +
    '<path d="M' + (x + 6) + ' ' + (y + 44) + ' L' + (x + 8) + ' ' + (y + 22) + ' Q' + (x + 24) + ' ' + (y + 14) + ' ' + (x + 40) + ' ' + (y + 22) + ' L' + (x + 42) + ' ' + (y + 44) + ' Z" fill="' + pick(['#ef9a9a', '#90caf9', '#ffcc80', '#a5d6a7'], F.key, 'shirt') + '"/>' +
    portrait(fam, 48, { bg: false, clip: false, at: [x, y - 18] }) + '</g>';
}
function scene(p, o) {
  o = o || {};
  const L = look(p), eq = o.eq || equipment(p), out = p.outcome;
  let s = '<svg class="scene" viewBox="0 0 400 215" role="img" aria-label="Treatment room picture">' +
    '<rect width="400" height="215" fill="#e6eef6"/><rect y="168" width="400" height="47" fill="#cfd8e3"/><path d="M0 168 L400 168" stroke="#b6c3d3" stroke-width="2"/>' +
    [40, 120, 200, 280, 360].map(x => '<path d="M' + x + ' 168 L' + (x - 30) + ' 215" stroke="#c3ccd8" stroke-width="1"/>').join('') +
    '<path d="M6 10 L394 10" stroke="#9fb0c4" stroke-width="3"/>' +
    '<path d="M366 10 Q372 60 366 110 Q374 140 368 168 L394 168 L394 10 Z" fill="#9fd3cf" opacity=".85"/><path d="M374 12 Q378 80 374 166 M384 12 Q388 80 384 166" stroke="#7fbcb7" stroke-width="1.5" fill="none"/>' +
    '<rect x="128" y="34" width="26" height="16" rx="3" fill="#f6f8fb" stroke="#b6c3d3"/><circle cx="135" cy="42" r="3" fill="#2e7d32"/><circle cx="147" cy="42" r="3" fill="#90a4ae"/>' +
    '<circle cx="345" cy="36" r="13" fill="#fff" stroke="#9fb0c4" stroke-width="2"/>' + (o.clock != null ? clockHands(o.clock) : '');
  if (eq.monitor) {
    const col = p.arrest ? '#f87171' : '#4ade80';
    s += '<path d="M80 30 L80 22 L70 22" stroke="#9fb0c4" stroke-width="3" fill="none"/><rect x="34" y="30" width="80" height="54" rx="5" fill="#0f1b2d" stroke="#5b6b82" stroke-width="2"/><rect x="38" y="34" width="72" height="46" rx="2" fill="#07111f"/>' +
      '<path d="' + (p.arrest ? 'M40 52 q4 -8 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0' : 'M40 54 L52 54 L55 50 L58 54 L61 54 L63 40 L66 62 L68 54 L80 54 L83 50 L86 54 L89 54 L91 40 L94 62 L96 54 L108 54') + '" stroke="' + col + '" stroke-width="1.4" fill="none"/>' +
      '<text x="42" y="75" font-family="monospace" font-size="10" font-weight="700" fill="' + col + '">' + (p.arrest ? 'NO PULSE' : 'HR ' + (o.hr || '')) + '</text>' +
      (p.arrest || p.status === 'Critical' ? '<circle class="sc-alarm" cx="108" cy="30" r="5" fill="#ef4444"/>' : '');
  }
  if (eq.vent) s += '<g><rect x="18" y="104" width="54" height="64" rx="5" fill="#e9eef4" stroke="#90a4ae" stroke-width="2"/><rect x="24" y="110" width="42" height="24" rx="2" fill="#07111f"/><path d="M26 126 q5 -10 10 0 t10 0 t10 0" stroke="#38bdf8" stroke-width="1.5" fill="none"/><circle cx="34" cy="150" r="5" fill="#90a4ae"/><circle cx="54" cy="150" r="5" fill="#90a4ae"/>' +
    '<path d="M72 120 C120 120 150 96 196 88" stroke="#b0bec5" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
  else if (eq.family && !out) s += visitor(p, 26, 98);
  s += '<rect x="140" y="56" width="120" height="100" rx="18" fill="#d5dde8" stroke="#a9b6c6" stroke-width="2"/><rect x="146" y="62" width="108" height="20" rx="10" fill="#e5ebf2"/>';
  if (!out) {
    const gown = L.gown, skin = L.skin;
    s += '<path d="M156 168 L158 128 Q164 112 200 110 Q236 112 242 128 L244 168 Z" fill="' + gown + '"/>';
    s += portrait(p, 100, { bg: false, clip: false, at: [150, 22] });
    if (eq.collar) s += '<path d="M186 96 Q200 102 214 96 L216 110 Q200 116 184 110 Z" fill="#f2c27b" stroke="#c9974a" stroke-width="1.2"/><path d="M190 103 L210 103" stroke="#c9974a" stroke-width="1"/>';
    s += '<path d="M126 150 Q200 140 274 150 L282 182 L118 182 Z" fill="#f4f7fb" stroke="#c8d3df" stroke-width="1.5"/><path d="M140 160 Q170 156 190 164 M214 162 Q240 156 264 162" stroke="#d5dde8" stroke-width="1.5" fill="none"/>';
    s += '<path d="M162 124 Q148 140 168 156 L180 150 Q166 140 172 128 Z" fill="' + gown + '" stroke="' + darker(gown, .8) + '"/><path d="M238 124 Q252 140 232 156 L220 150 Q234 140 228 128 Z" fill="' + gown + '" stroke="' + darker(gown, .8) + '"/>' +
      '<ellipse cx="180" cy="154" rx="7" ry="5" fill="' + skin + '" stroke="' + darker(skin, .85) + '" stroke-width=".8"/><ellipse cx="220" cy="154" rx="7" ry="5" fill="' + skin + '" stroke="' + darker(skin, .85) + '" stroke-width=".8"/>';
    if (eq.splintArm) s += '<path d="M156 134 Q150 146 166 158 L182 151 Q169 142 172 132 Z" fill="#5c7cfa"/><path d="M158 141 L173 137 M160 148 L176 144" stroke="#fff" stroke-width="1.6"/>';
    if (eq.splintLeg) s += '<rect x="226" y="156" width="34" height="18" rx="5" fill="#5c7cfa" opacity=".9"/><path d="M234 156 L234 174 M248 156 L248 174" stroke="#fff" stroke-width="2"/>';
    if (eq.oxygen || eq.neb) s += '<path d="M190 72 Q200 66 210 72 L211 83 Q200 91 189 83 Z" fill="rgba(160,220,200,.55)" stroke="#5fb79a" stroke-width="1.2"/><path d="M189 76 L172 68 M211 76 L228 68" stroke="#5fb79a" stroke-width="1"/>' +
      '<path d="M200 88 C200 118 150 100 141 50" stroke="#5fb79a" stroke-width="2" fill="none"/>' +
      (eq.neb ? '<rect x="195" y="88" width="10" height="9" rx="2" fill="#cfeee3" stroke="#5fb79a"/><g class="sc-mist"><circle cx="194" cy="66" r="3" fill="#fff"/><circle cx="205" cy="63" r="2.5" fill="#fff"/></g>' : '');
    if (eq.vent) s += '<rect x="195" y="78" width="10" height="8" rx="2" fill="#eceff1" stroke="#90a4ae"/>';
    if (eq.iv || eq.blood) {
      s += '<path d="M300 20 L300 196 M288 196 L312 196 M286 24 L314 24" stroke="#90a4ae" stroke-width="3" fill="none" stroke-linecap="round"/>';
      if (eq.iv) s += '<path d="M280 26 L292 26 L294 54 Q286 60 278 54 Z" fill="rgba(200,230,255,.9)" stroke="#7aa7c7"/><text x="281" y="43" font-size="7" fill="#4a6b85" font-family="sans-serif">IV</text>';
      if (eq.blood) s += '<path d="M308 26 L320 26 L322 54 Q314 60 306 54 Z" fill="#b23b48" stroke="#8e2f39"/><rect x="309" y="36" width="10" height="6" fill="#fff" opacity=".8"/>';
      s += '<path d="M' + (eq.iv ? 286 : 314) + ' 58 C' + (eq.iv ? 286 : 314) + ' 110 260 120 232 152" stroke="' + (eq.blood && !eq.iv ? '#b23b48' : '#9cc6e0') + '" stroke-width="1.6" fill="none"/>';
    }
  } else if (out === 'discharged') {
    s += '<path d="M126 150 Q200 144 274 150 L282 182 L118 182 Z" fill="#f4f7fb" stroke="#c8d3df" stroke-width="1.5"/><rect x="214" y="134" width="50" height="16" rx="4" fill="#9cc3e6"/><rect x="214" y="126" width="50" height="10" rx="4" fill="#b9d3ea"/>' +
      '<g transform="translate(160 92)"><rect width="80" height="26" rx="6" fill="#2e7d32"/><text x="40" y="17" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" font-family="sans-serif">Discharged ✓</text></g>';
  }
  s += '<rect x="116" y="178" width="168" height="12" rx="4" fill="#8fa1b5"/><path d="M130 190 L130 202 M270 190 L270 202" stroke="#8fa1b5" stroke-width="4"/><circle cx="130" cy="205" r="5" fill="#5b6b82"/><circle cx="270" cy="205" r="5" fill="#5b6b82"/>' +
    '<path d="M118 152 L118 176 M282 152 L282 176 M118 160 L136 160 M264 160 L282 160" stroke="#a9b6c6" stroke-width="3" stroke-linecap="round"/>';
  if (eq.defib && !out) s += '<g><rect x="322" y="112" width="44" height="56" rx="4" fill="#d64545"/><rect x="322" y="124" width="44" height="2" fill="#a83232"/><rect x="322" y="140" width="44" height="2" fill="#a83232"/><rect x="326" y="98" width="36" height="16" rx="3" fill="#ffd54f" stroke="#c9a227"/><path d="M342 101 l-4 6 l4 0 l-4 6" stroke="#333" stroke-width="1.5" fill="none"/><circle cx="328" cy="172" r="4" fill="#5b6b82"/><circle cx="360" cy="172" r="4" fill="#5b6b82"/></g>';
  else if (eq.family && eq.vent && !out) s += visitor(p, 316, 98);
  if (out === 'deceased') s += '<path d="M100 10 Q110 90 104 168 L300 168 Q294 90 300 10 Z" fill="#9fd3cf"/>' + [130, 160, 190, 220, 250, 280].map(x => '<path d="M' + x + ' 12 Q' + (x + 5) + ' 90 ' + x + ' 166" stroke="#7fbcb7" stroke-width="1.5" fill="none"/>').join('') +
    '<text x="200" y="196" text-anchor="middle" font-size="11" fill="#5b6b82" font-family="sans-serif">Curtain drawn</text>';
  if (p.arrest) s += '<rect class="sc-flash" width="400" height="215" fill="#ef4444"/>';
  return s + '</svg>';
}

/* ───────── 5. CT scans and ultrasound (schematic, grayscale) ───────── */
const CT_BLUR = '<defs><filter id="ctb" x="0" y="0" width="300" height="300" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="1.6"/></filter></defs>';
function ctWrap(inner, label) {
  return '<svg class="xray-img ct-img" viewBox="0 0 300 300" role="img" aria-label="' + label + '"><rect width="300" height="300" fill="#000"/>' + CT_BLUR + '<g filter="url(#ctb)">' + inner + '</g>' +
    '<text x="10" y="20" font-size="14" font-weight="700" font-family="sans-serif" fill="#e8e8e8">R</text><text x="290" y="20" text-anchor="end" font-size="10" font-family="monospace" fill="#9e9e9e">CT · AXIAL</text></svg>';
}
function drawCT(id) {
  if (id.indexOf('ct-head') === 0) {
    let s = '<ellipse cx="150" cy="152" rx="104" ry="124" fill="#555"/><ellipse cx="150" cy="152" rx="96" ry="116" fill="none" stroke="#f2f2f2" stroke-width="10"/>' +
      '<ellipse cx="150" cy="152" rx="90" ry="110" fill="#8c8c8c"/>' +
      '<path d="M150 46 L150 258" stroke="#6f6f6f" stroke-width="2"/>' +
      '<path d="M140 120 Q118 140 128 178 Q138 168 142 150 Z M160 120 Q182 140 172 178 Q162 168 158 150 Z" fill="#2c2c2c"/>' +
      '<path d="M90 110 q12 10 4 26 M210 110 q-12 10 -4 26 M84 180 q16 4 22 22 M216 180 q-16 4 -22 22" stroke="#7a7a7a" stroke-width="3" fill="none"/>';
    if (id === 'ct-head-subdural') s += '<path d="M68 96 Q50 150 68 212 Q74 150 82 100 Z" fill="#dedede"/>';
    if (id === 'ct-head-bleed') s += '<ellipse cx="190" cy="140" rx="20" ry="15" fill="#e6e6e6"/><ellipse cx="190" cy="140" rx="30" ry="24" fill="none" stroke="#6a6a6a" stroke-width="6"/>';
    if (id === 'ct-head-stroke') s += '<path d="M150 150 L218 96 Q240 150 220 200 Z" fill="#5e5e5e" opacity=".9"/>';
    return ctWrap(s, 'Head CT image');
  }
  if (id.indexOf('ct-chest') === 0) {
    let s = '<ellipse cx="150" cy="160" rx="134" ry="100" fill="#6a6a6a"/>' +
      '<path d="M40 150 Q44 82 128 82 Q138 150 120 238 Q52 232 40 150 Z" fill="#101010"/><path d="M260 150 Q256 82 172 82 Q162 150 180 238 Q248 232 260 150 Z" fill="#101010"/>' +
      '<path d="M60 120 l30 20 M70 190 l28 -14 M240 120 l-30 20 M230 190 l-28 -14" stroke="#3a3a3a" stroke-width="2"/>' +
      '<ellipse cx="150" cy="248" rx="20" ry="16" fill="#f0f0f0"/><ellipse cx="150" cy="248" rx="10" ry="8" fill="#555"/>' +
      '<circle cx="138" cy="124" r="20" fill="#e8e8e8"/>' + '<circle cx="170" cy="222" r="14" fill="#e8e8e8"/>' +
      '<path d="M156 112 Q170 96 200 110" stroke="#e8e8e8" stroke-width="16" fill="none" stroke-linecap="round"/>' +
      '<path d="M190 112 Q214 126 222 150 M126 140 Q98 150 86 168" stroke="#e8e8e8" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      '<rect x="128" y="150" width="44" height="40" rx="16" fill="#7a7a7a"/>';
    if (id === 'ct-chest-pe') s += '<ellipse cx="208" cy="132" rx="7" ry="4" fill="#444"/><ellipse cx="98" cy="160" rx="7" ry="4" fill="#444"/><ellipse cx="214" cy="146" rx="4" ry="3" fill="#444"/>';
    if (id === 'ct-chest-dissection') s += '<path d="M122 116 L154 132" stroke="#3a3a3a" stroke-width="3"/><path d="M160 214 L180 230" stroke="#3a3a3a" stroke-width="3"/>';
    if (id === 'ct-chest-pneumonia') s += '<path d="M60 170 Q80 150 110 168 Q118 200 96 222 Q62 214 60 170 Z" fill="#9a9a9a"/>';
    return ctWrap(s, 'Chest CT image');
  }
  // abdomen
  let s = '<ellipse cx="150" cy="156" rx="132" ry="104" fill="#5a5a5a"/><ellipse cx="150" cy="156" rx="124" ry="96" fill="#707070"/>' +
    '<path d="M36 140 Q40 70 118 66 Q130 110 112 150 Q80 176 36 140 Z" fill="#8e8e8e"/>' +
    '<path d="M262 132 Q256 88 214 78 Q206 110 226 140 Z" fill="#8a8a8a"/>' +
    '<ellipse cx="150" cy="232" rx="20" ry="16" fill="#f0f0f0"/><ellipse cx="150" cy="232" rx="10" ry="8" fill="#555"/>' +
    '<ellipse cx="106" cy="196" rx="20" ry="27" fill="#9a9a9a"/><ellipse cx="194" cy="196" rx="20" ry="27" fill="#9a9a9a"/>' +
    '<circle cx="160" cy="206" r="9" fill="#cfcfcf"/>' +
    [[140, 120], [170, 130], [150, 160], [184, 168], [126, 166]].map(q => '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="13" fill="#5f5f5f" stroke="#888" stroke-width="2"/>').join('');
  if (id === 'ct-abd-spleen') s += '<path d="M268 132 Q262 80 210 70 Q196 110 222 148 Q252 158 268 132 Z" fill="none" stroke="#4a4a4a" stroke-width="8"/><path d="M220 96 L240 112 L232 124" stroke="#333" stroke-width="4" fill="none"/>';
  if (id === 'ct-abd-stone-r') s += '<ellipse cx="106" cy="196" rx="24" ry="30" fill="#9a9a9a"/><ellipse cx="106" cy="196" rx="10" ry="14" fill="#4c4c4c"/><circle cx="118" cy="236" r="4" fill="#fafafa"/>';
  if (id === 'ct-abd-stone-l') s += '<ellipse cx="194" cy="196" rx="24" ry="30" fill="#9a9a9a"/><ellipse cx="194" cy="196" rx="10" ry="14" fill="#4c4c4c"/><circle cx="182" cy="240" r="4" fill="#fafafa"/>';
  if (id === 'ct-abd-appendicitis') s += '<circle cx="96" cy="230" r="12" fill="#6a6a6a" stroke="#bdbdbd" stroke-width="4"/><circle cx="96" cy="230" r="22" fill="none" stroke="#858585" stroke-width="5" opacity=".7"/>';
  return ctWrap(s, 'Abdomen CT image');
}
function usWrap(inner, id, label) {
  const rnd = seeded(id); let dots = '';
  for (let i = 0; i < 520; i++) { const a = (-38 + rnd() * 76) * Math.PI / 180, r = 20 + rnd() * 250; dots += '<circle cx="' + (150 + Math.sin(a) * r).toFixed(1) + '" cy="' + (16 + Math.cos(a) * r).toFixed(1) + '" r="' + (0.8 + rnd() * 1.8).toFixed(1) + '" fill="#fff" opacity="' + (0.08 + rnd() * 0.22).toFixed(2) + '"/>'; }
  const fan = 'M150 16 L' + (150 - Math.sin(38 * Math.PI / 180) * 270).toFixed(1) + ' ' + (16 + Math.cos(38 * Math.PI / 180) * 270).toFixed(1) + ' A270 270 0 0 0 ' + (150 + Math.sin(38 * Math.PI / 180) * 270).toFixed(1) + ' ' + (16 + Math.cos(38 * Math.PI / 180) * 270).toFixed(1) + ' Z';
  return '<svg class="xray-img us-img" viewBox="0 0 300 300" role="img" aria-label="' + label + '"><rect width="300" height="300" fill="#000"/><defs><clipPath id="fan-' + id + '"><path d="' + fan + '"/></clipPath><filter id="usb" x="0" y="0" width="300" height="300" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="1.2"/></filter></defs>' +
    '<g clip-path="url(#fan-' + id + ')"><path d="' + fan + '" fill="#2b2b2b"/><g filter="url(#usb)">' + inner + '</g>' + dots + '</g>' +
    '<text x="290" y="20" text-anchor="end" font-size="10" font-family="monospace" fill="#9e9e9e">ULTRASOUND</text></svg>';
}
function drawUS(id) {
  let s = '';
  switch (id) {
    case 'us-fast': s = '<path d="M60 90 Q150 70 250 120 Q240 180 160 170 Q90 150 60 90 Z" fill="#5c5c5c"/><ellipse cx="160" cy="220" rx="70" ry="34" fill="#4a4a4a" stroke="#bdbdbd" stroke-width="5"/><path d="M70 150 Q150 196 240 168 Q230 186 150 184 Q90 176 70 150 Z" fill="#050505"/>'; break;
    case 'us-tamponade': s = '<ellipse cx="150" cy="170" rx="118" ry="96" fill="#050505"/><ellipse cx="150" cy="170" rx="74" ry="60" fill="#666"/><ellipse cx="128" cy="160" rx="22" ry="30" fill="#0a0a0a"/><path d="M162 140 Q190 150 180 196 Q166 200 158 180 Z" fill="#0a0a0a"/>'; break;
    case 'us-gallstones': s = '<path d="M90 110 Q170 80 220 140 Q210 200 140 196 Q80 180 90 110 Z" fill="#050505" stroke="#9a9a9a" stroke-width="7"/><path d="M130 188 q8 -12 16 0 M152 190 q8 -12 16 0" stroke="#fafafa" stroke-width="6" fill="none"/><path d="M134 196 L128 300 L146 300 Z M158 196 L156 300 L172 300 Z" fill="#000" opacity=".9"/>'; break;
    case 'us-hydro': s = '<ellipse cx="150" cy="160" rx="96" ry="58" fill="#6a6a6a" stroke="#c8c8c8" stroke-width="5"/><path d="M110 160 Q150 150 190 160 M150 158 L130 126 M150 158 L176 128 M150 162 L132 194 M150 162 L172 192" stroke="#050505" stroke-width="16" stroke-linecap="round" fill="none"/>'; break;
    case 'us-target': s = '<circle cx="150" cy="160" r="70" fill="#7a7a7a"/><circle cx="150" cy="160" r="56" fill="#1c1c1c"/><circle cx="150" cy="160" r="42" fill="#9a9a9a"/><circle cx="150" cy="160" r="28" fill="#1c1c1c"/><circle cx="150" cy="160" r="14" fill="#b0b0b0"/>'; break;
    case 'us-dvt': s = '<circle cx="120" cy="150" r="24" fill="#050505" stroke="#bdbdbd" stroke-width="4"/><circle cx="185" cy="160" r="36" fill="#7c7c7c" stroke="#bdbdbd" stroke-width="3"/><text x="150" y="250" text-anchor="middle" font-size="12" fill="#cfcfcf" font-family="sans-serif">Vein does not squash when pressed</text>'; break;
    case 'us-aorta': s = '<path d="M30 120 Q150 90 270 120 L270 210 Q150 240 30 210 Z" fill="#050505" stroke="#bdbdbd" stroke-width="5"/><path d="M40 160 Q150 140 260 168" stroke="#c8c8c8" stroke-width="3" fill="none"/>'; break;
    case 'us-no-sliding': s = '<rect x="0" y="16" width="300" height="80" fill="#6a6a6a"/><path d="M0 96 L300 96" stroke="#f5f5f5" stroke-width="5"/>' + Array.from({ length: 16 }, (_, i) => '<path d="M0 ' + (110 + i * 10) + ' L300 ' + (110 + i * 10) + '" stroke="#8a8a8a" stroke-width="3"/>').join('') + '<text x="150" y="292" text-anchor="middle" font-size="12" fill="#cfcfcf" font-family="sans-serif">Motion strip: straight "barcode" lines</text>'; break;
    case 'us-pericardial': s = '<ellipse cx="150" cy="170" rx="94" ry="76" fill="#050505"/><ellipse cx="150" cy="170" rx="80" ry="64" fill="#666"/><ellipse cx="124" cy="160" rx="24" ry="34" fill="#0a0a0a"/><ellipse cx="178" cy="166" rx="18" ry="28" fill="#0a0a0a"/>'; break;
  }
  return usWrap(s, id, 'Ultrasound image');
}

/* ───────── 6. ER floor map ───────── */
const ST_COL = { 'Critical': '#c62828', 'Unstable': '#d9640a', 'Needs Assessment': '#a67c00', 'Improving': '#0f7c8c', 'Stable': '#2e7d32' };
const ROOMS = {
  'Resus-1': [20, 20, 140, 120], 'Resus-2': [170, 20, 140, 120], 'Resus-3': [320, 20, 140, 120],
  'Bay-1': [20, 170, 100, 96], 'Bay-2': [128, 170, 100, 96], 'Bay-3': [236, 170, 100, 96], 'Bay-4': [344, 170, 100, 96], 'Bay-5': [452, 170, 100, 96],
  'Bay-6': [20, 362, 100, 96], 'Bay-7': [128, 362, 100, 96], 'Bay-8': [236, 362, 100, 96], 'Bay-9': [344, 362, 100, 96], 'Bay-10': [452, 362, 100, 96],
  'Peds-1': [596, 196, 132, 104], 'Peds-2': [738, 196, 132, 104],
  'Fast-Track-1': [596, 356, 86, 90], 'Fast-Track-2': [690, 356, 86, 90], 'Fast-Track-3': [784, 356, 86, 90]
};
function personIcon(x, y, c) { return '<circle cx="' + x + '" cy="' + (y - 9) + '" r="5" fill="' + c + '"/><path d="M' + (x - 7) + ' ' + (y + 6) + ' Q' + x + ' ' + (y - 6) + ' ' + (x + 7) + ' ' + (y + 6) + ' Z" fill="' + c + '"/>'; }
function floorMap(patients, o) {
  o = o || {};
  const byBed = {}, hall = [];
  patients.forEach(p => { if (ROOMS[p.bed] && !byBed[p.bed]) byBed[p.bed] = p; else hall.push(p); });
  let s = '<svg class="floormap" viewBox="0 0 890 560" role="img" aria-label="Map of the emergency department">' +
    '<rect x="4" y="4" width="882" height="552" rx="14" fill="#f4f6fa" stroke="#b8c4d4" stroke-width="3"/>' +
    '<rect x="14" y="146" width="862" height="18" fill="#e6ebf2"/><rect x="14" y="462" width="862" height="14" fill="#e6ebf2"/><rect x="560" y="146" width="28" height="330" fill="#e6ebf2"/>' +
    // nurses' station
    '<rect x="40" y="282" width="490" height="64" rx="32" fill="#dfe9f7" stroke="#9fb6d6" stroke-width="2"/>' +
    '<text x="285" y="318" text-anchor="middle" font-size="13" font-weight="700" fill="#4a6286" font-family="Inter,sans-serif">NURSES’ STATION</text>' +
    [90, 160, 410, 480].map(x => '<rect x="' + (x - 12) + '" y="290" width="24" height="15" rx="2" fill="#37474f"/><rect x="' + (x - 10) + '" y="292" width="20" height="11" fill="#8fd3ff"/>').join('') +
    personIcon(120, 336, '#5c7cfa') + personIcon(220, 336, '#0f7c8c') + personIcon(360, 336, '#b5375b') + personIcon(450, 336, '#5c7cfa') +
    // imaging rooms
    '<rect x="470" y="20" width="190" height="120" rx="8" fill="' + (o.ctDown ? '#fde7e7' : '#eef0ff') + '" stroke="#b8c4d4" stroke-width="2"/>' +
    '<circle cx="540" cy="80" r="34" fill="#fff" stroke="#9aa5c9" stroke-width="8"/><circle cx="540" cy="80" r="16" fill="#eef0ff"/><rect x="540" y="74" width="90" height="12" rx="4" fill="#cfd6ee"/>' +
    '<text x="565" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="#5b6b82" font-family="Inter,sans-serif">CT SCANNER</text>' +
    (o.ctDown ? '<text x="565" y="132" text-anchor="middle" font-size="11" font-weight="800" fill="#c62828" font-family="Inter,sans-serif">OUT OF ORDER</text>' : '') +
    '<rect x="670" y="20" width="200" height="120" rx="8" fill="#eef3f6" stroke="#b8c4d4" stroke-width="2"/><rect x="740" y="54" width="60" height="48" rx="4" fill="#cfd8dc"/><rect x="760" y="30" width="20" height="24" fill="#90a4ae"/>' +
    '<text x="770" y="132" text-anchor="middle" font-size="11" font-weight="700" fill="#5b6b82" font-family="Inter,sans-serif">X-RAY</text>' +
    // area labels
    '<text x="240" y="160" text-anchor="middle" font-size="10" font-weight="700" fill="#7a849b" letter-spacing="1" font-family="Inter,sans-serif">RESUSCITATION · MAIN ER BAYS</text>' +
    '<rect x="590" y="172" width="286" height="134" rx="10" fill="#fff6e0" stroke="#f0d48a" stroke-width="2"/><text x="733" y="188" text-anchor="middle" font-size="11" font-weight="800" fill="#b8860b" font-family="Inter,sans-serif">PEDIATRIC ER</text>' +
    '<rect x="590" y="330" width="286" height="122" rx="10" fill="#eaf6ee" stroke="#a9d6b5" stroke-width="2"/><text x="733" y="346" text-anchor="middle" font-size="11" font-weight="800" fill="#2e7d32" font-family="Inter,sans-serif">FAST TRACK</text>' +
    // ambulance bay & entrance
    '<rect x="14" y="480" width="300" height="70" rx="8" fill="#e9edf2" stroke="#b8c4d4" stroke-width="2" stroke-dasharray="6 4"/><text x="266" y="545" text-anchor="middle" font-size="10" font-weight="700" fill="#7a849b" font-family="Inter,sans-serif">AMBULANCE BAY</text>' +
    '<rect x="324" y="480" width="236" height="70" rx="8" fill="#f9fafc" stroke="#b8c4d4" stroke-width="2"/><text x="442" y="545" text-anchor="middle" font-size="10" font-weight="700" fill="#7a849b" font-family="Inter,sans-serif">WAITING ROOM · ENTRANCE</text>' +
    [350, 380, 410, 440, 470, 500, 530].map(x => '<rect x="' + (x - 10) + '" y="494" width="20" height="18" rx="4" fill="#c5cfdd"/>').join('') +
    '<text x="733" y="500" text-anchor="middle" font-size="10" font-weight="700" fill="#7a849b" font-family="Inter,sans-serif">HALLWAY BEDS</text>';
  if (o.ambulance) s += '<g class="' + (o.ambulance === 'drive' ? 'amb-in' : 'amb-park') + '"><rect x="60" y="490" width="120" height="44" rx="6" fill="#fff" stroke="#9aa5b8" stroke-width="2"/><rect x="180" y="502" width="36" height="32" rx="6" fill="#fff" stroke="#9aa5b8" stroke-width="2"/><rect x="188" y="507" width="22" height="12" rx="2" fill="#8fd3ff"/>' +
    '<rect x="60" y="514" width="156" height="6" fill="#d32f2f"/><path d="M112 497 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 Z" fill="#d32f2f"/><circle cx="90" cy="537" r="8" fill="#37474f"/><circle cx="196" cy="537" r="8" fill="#37474f"/>' +
    '<rect class="amb-light" x="150" y="484" width="14" height="7" rx="2" fill="#ef4444"/><rect class="amb-light b" x="166" y="484" width="14" height="7" rx="2" fill="#3b82f6"/></g>';
  Object.keys(ROOMS).forEach(bed => {
    const r = ROOMS[bed], p = byBed[bed], kids = bed.indexOf('Peds') === 0;
    const col = p ? (ST_COL[p.status] || '#5b6b82') : '#b8c4d4';
    s += '<g class="mroom' + (p ? ' occ' : '') + '"' + (p ? ' data-room="' + p.id + '" tabindex="0" role="button"' : '') + '>' + (p ? '<title>Patient ' + p.num + ' — ' + p.status + ' — click to enter the room</title>' : '') +
      '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" rx="8" fill="' + (p ? '#fff' : kids ? '#fffaf0' : '#fbfcfe') + '" stroke="' + col + '" stroke-width="' + (p ? 3 : 1.5) + '"/>' +
      '<text x="' + (r[0] + 8) + '" y="' + (r[1] + 15) + '" font-size="10" font-weight="700" fill="#7a849b" font-family="Inter,sans-serif">' + bed.replace('Fast-Track-', 'FT-') + '</text>';
    const cx = r[0] + r[2] / 2, cy = r[1] + r[3] / 2 + 6;
    if (p) {
      const crit = p.status === 'Critical' || p.arrest || p.rescueActive;
      s += (crit ? '<circle class="mpulse" cx="' + cx + '" cy="' + cy + '" r="27" fill="none" stroke="' + col + '" stroke-width="3"/>' : '') +
        '<circle cx="' + cx + '" cy="' + cy + '" r="25" fill="' + col + '"/>' + portrait(p, 46, { at: [cx - 23, cy - 23] }) +
        '<rect x="' + (cx - 20) + '" y="' + (cy + 24) + '" width="40" height="15" rx="7" fill="' + col + '"/><text x="' + cx + '" y="' + (cy + 35) + '" text-anchor="middle" font-size="10" font-weight="800" fill="#fff" font-family="Inter,sans-serif">P' + p.num + '</text>' +
        (p.arrest ? '<text x="' + (r[0] + r[2] - 8) + '" y="' + (r[1] + 15) + '" text-anchor="end" font-size="10" font-weight="800" fill="#c62828" font-family="Inter,sans-serif">CODE</text>' : (o.needs && o.needs(p) ? '<circle class="mneed" cx="' + (r[0] + r[2] - 12) + '" cy="' + (r[1] + 12) + '" r="6" fill="#1d5fbf"/>' : ''));
    } else {
      s += '<rect x="' + (cx - 16) + '" y="' + (cy - 20) + '" width="32" height="44" rx="6" fill="#e3e8ef"/><rect x="' + (cx - 12) + '" y="' + (cy - 16) + '" width="24" height="9" rx="4" fill="#fff"/>';
    }
    s += '</g>';
  });
  hall.slice(0, 6).forEach((p, i) => {
    const cx = 612 + i * 50, cy = 524, col = ST_COL[p.status] || '#5b6b82';
    s += '<g class="mroom occ" data-room="' + p.id + '" tabindex="0" role="button"><title>Patient ' + p.num + ' (' + p.bed + ') — ' + p.status + '</title><circle cx="' + cx + '" cy="' + cy + '" r="19" fill="' + col + '"/>' + portrait(p, 34, { at: [cx - 17, cy - 17] }) +
      '<text x="' + cx + '" y="' + (cy + 31) + '" text-anchor="middle" font-size="9" font-weight="800" fill="' + col + '" font-family="Inter,sans-serif">P' + p.num + '</text></g>';
  });
  return s + '</svg>';
}

/* ───────── 7. Rank insignia, achievement medals, promotion confetti ───────── */
const METAL = [null, ['#c98a5a', '#8c5a32'], ['#c98a5a', '#8c5a32'], ['#c9d2db', '#7d8a98'], ['#c9d2db', '#7d8a98'], ['#f1c232', '#a67c00'], ['#f1c232', '#a67c00'], ['#f6d365', '#b8860b']];
function star(cx, cy, r, fill) { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1); } return '<path d="' + d + 'Z" fill="' + fill + '"/>'; }
function insignia(level, size) {
  level = Math.max(1, Math.min(7, level || 1));
  const m = METAL[level], id = nid('in'), enamel = level >= 6 ? '#0b2545' : level >= 3 ? '#1d5fbf' : '#0f7c8c';
  let s = '<svg class="insignia" width="' + size + '" height="' + size + '" viewBox="0 0 100 100" role="img" aria-label="Rank insignia level ' + level + '"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + m[0] + '"/><stop offset="1" stop-color="' + m[1] + '"/></linearGradient></defs>';
  if (level >= 6) s += '<path d="M14 64 Q8 40 22 20 M86 64 Q92 40 78 20" stroke="' + m[1] + '" stroke-width="3" fill="none"/>' + [0, 1, 2, 3].map(i => '<ellipse cx="' + (13 + i * 2) + '" cy="' + (58 - i * 11) + '" rx="3.5" ry="6" fill="' + m[0] + '" transform="rotate(-25 ' + (13 + i * 2) + ' ' + (58 - i * 11) + ')"/><ellipse cx="' + (87 - i * 2) + '" cy="' + (58 - i * 11) + '" rx="3.5" ry="6" fill="' + m[0] + '" transform="rotate(25 ' + (87 - i * 2) + ' ' + (58 - i * 11) + ')"/>').join('');
  s += '<path d="M50 6 L84 18 L84 50 Q84 78 50 94 Q16 78 16 50 L16 18 Z" fill="url(#' + id + ')" stroke="' + m[1] + '" stroke-width="2"/>' +
    '<path d="M50 14 L77 24 L77 50 Q77 72 50 86 Q23 72 23 50 L23 24 Z" fill="' + enamel + '"/>';
  if (level === 1) s += '<path d="M34 40 Q42 36 50 40 Q58 36 66 40 L66 64 Q58 60 50 64 Q42 60 34 64 Z" fill="#fff"/><path d="M50 40 L50 64" stroke="' + enamel + '" stroke-width="1.5"/>';
  else if (level <= 5) {
    const n = level === 2 ? 1 : level === 3 ? 2 : 3;
    for (let i = 0; i < n; i++) s += '<path d="M32 ' + (44 + i * 11) + ' L50 ' + (34 + i * 11) + ' L68 ' + (44 + i * 11) + '" stroke="' + m[0] + '" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>';
    if (level === 5) s += star(50, 26, 7, '#fff');
  } else {
    s += '<path d="M46 34 h8 v10 h10 v8 h-10 v10 h-8 v-10 h-10 v-8 h10 Z" fill="#fff"/>';
    s += level === 6 ? star(50, 74, 6, m[0]) : star(38, 72, 5, m[0]) + star(50, 76, 6, m[0]) + star(62, 72, 5, m[0]);
  }
  return s + '</svg>';
}
const MEDAL_COL = [['#e53935', '#1e88e5'], ['#43a047', '#fdd835'], ['#8e24aa', '#ffb300'], ['#00897b', '#f4511e'], ['#3949ab', '#e53935'], ['#f4511e', '#3949ab']];
function medal(key, got, size) {
  const c = got ? MEDAL_COL[hash(key) % MEDAL_COL.length] : ['#c5cbd3', '#aab2bd'], id = nid('md');
  const metal = got ? ['#ffe082', '#c9a227'] : ['#e3e6ea', '#b0b7c0'];
  return '<svg class="medal" width="' + size + '" height="' + size + '" viewBox="0 0 64 64" aria-hidden="true"><defs><radialGradient id="' + id + '" cx=".35" cy=".35"><stop offset="0" stop-color="' + metal[0] + '"/><stop offset="1" stop-color="' + metal[1] + '"/></radialGradient></defs>' +
    '<path d="M18 2 L30 2 L36 26 L26 30 Z" fill="' + c[0] + '"/><path d="M46 2 L34 2 L28 26 L38 30 Z" fill="' + c[1] + '"/>' +
    '<circle cx="32" cy="40" r="21" fill="url(#' + id + ')" stroke="' + metal[1] + '" stroke-width="2"/><circle cx="32" cy="40" r="15.5" fill="none" stroke="' + (got ? '#fff6d0' : '#f2f4f6') + '" stroke-width="1.5" stroke-dasharray="2 2"/></svg>';
}
function confetti(n) {
  const cols = ['#e53935', '#1e88e5', '#43a047', '#fdd835', '#8e24aa', '#ff7043'], rnd = seeded('c' + Date.now());
  let h = '<div class="confetti" aria-hidden="true">';
  for (let i = 0; i < (n || 60); i++) h += '<i style="left:' + (rnd() * 100).toFixed(1) + '%;background:' + cols[i % cols.length] + ';animation-delay:' + (rnd() * .8).toFixed(2) + 's;animation-duration:' + (2 + rnd() * 1.6).toFixed(2) + 's;--dx:' + Math.round(rnd() * 120 - 60) + 'px;--rot:' + Math.round(rnd() * 720) + 'deg;width:' + (6 + rnd() * 6).toFixed(0) + 'px;height:' + (8 + rnd() * 8).toFixed(0) + 'px"></i>';
  return h + '</div>';
}

window.ART = { insignia: insignia, medal: medal, confetti: confetti, floorMap: floorMap, drawCT: drawCT, drawUS: drawUS, scene: scene, equipment: equipment, EQUIP_NAMES: EQUIP_NAMES, portrait: portrait, look: look, mood: mood, monitorWaves: monitorWaves, hash: hash, darker: darker, _priv: { g: g } };
})();
