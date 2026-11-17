/* Clinical tools: test catalog, default (normal) results, drawn ECG / X-ray images, medical word helper.
   Educational and schematic — not real medical images. */
(function () {
'use strict';

/* ───────── Test catalog ───────── */
const TESTS = {
  glucose:  { name: 'Fingerstick Blood Sugar', group: 'Labs', minutes: 2 },
  cbc:      { name: 'Complete Blood Count (CBC)', group: 'Labs', minutes: 30 },
  bmp:      { name: 'Electrolytes & Kidney Panel', group: 'Labs', minutes: 35 },
  lft:      { name: 'Liver Tests', group: 'Labs', minutes: 40 },
  lipase:   { name: 'Lipase (Pancreas)', group: 'Labs', minutes: 40 },
  troponin: { name: 'Troponin (Heart Damage)', group: 'Labs', minutes: 45 },
  lactate:  { name: 'Lactate', group: 'Labs', minutes: 15 },
  abg:      { name: 'Blood Gas', group: 'Labs', minutes: 10 },
  crp:      { name: 'CRP (Inflammation)', group: 'Labs', minutes: 40 },
  coag:     { name: 'Clotting Tests', group: 'Labs', minutes: 35 },
  cultures: { name: 'Blood Cultures', group: 'Labs', minutes: 15 },
  ua:       { name: 'Urine Test', group: 'Labs', minutes: 20 },
  ck:       { name: 'CK (Muscle Damage)', group: 'Labs', minutes: 40 },
  dimer:    { name: 'D-dimer (Clot Screen)', group: 'Labs', minutes: 40 },
  tsh:      { name: 'Thyroid Tests', group: 'Labs', minutes: 60 },
  cohb:     { name: 'Carbon Monoxide Level', group: 'Labs', minutes: 10 },
  ketones:  { name: 'Blood Ketones', group: 'Labs', minutes: 10 },
  typecross:{ name: 'Blood Type & Crossmatch', group: 'Labs', minutes: 45 },
  ecg:      { name: '12-Lead ECG', group: 'Heart & Imaging', minutes: 5 },
  cxr:      { name: 'Chest X-ray', group: 'Heart & Imaging', minutes: 20, radiation: 'low' },
  xr_limb:  { name: 'X-ray of Injured Limb', group: 'Heart & Imaging', minutes: 25, radiation: 'low' },
  xr_abd:   { name: 'Abdominal X-ray', group: 'Heart & Imaging', minutes: 25, radiation: 'low' },
  us_bedside:{ name: 'Bedside Ultrasound', group: 'Heart & Imaging', minutes: 10 },
  us_formal:{ name: 'Formal Ultrasound', group: 'Heart & Imaging', minutes: 45 },
  echo:     { name: 'Echocardiogram', group: 'Heart & Imaging', minutes: 40 },
  ct_head:  { name: 'CT Head', group: 'Heart & Imaging', minutes: 30, radiation: 'high', scanner: 'ct' },
  ct_chest: { name: 'CT Chest', group: 'Heart & Imaging', minutes: 40, radiation: 'high', scanner: 'ct' },
  ct_abd:   { name: 'CT Abdomen & Pelvis', group: 'Heart & Imaging', minutes: 45, radiation: 'high', scanner: 'ct' },
  mri:      { name: 'MRI', group: 'Heart & Imaging', minutes: 90, scanner: 'mri' }
};
const isLab = id => TESTS[id] && TESTS[id].group === 'Labs';

function normalResult(id, p, v) {
  v = v || {}; const kid = p.age < 12, hr = v.hr || 80;
  switch (id) {
    case 'glucose': return { results: [{ name: 'Blood sugar', value: '97 mg/dL', flag: '', ref: '70–140' }] };
    case 'cbc': return { results: [{ name: 'White blood cells', value: '7.2 ×10⁹/L', flag: '', ref: kid ? '5–15' : '4.5–11' }, { name: 'Hemoglobin', value: kid ? '12.1 g/dL' : '13.8 g/dL', flag: '', ref: kid ? '10.5–13.5' : '12–17.5' }, { name: 'Platelets', value: '250 ×10⁹/L', flag: '', ref: '150–400' }] };
    case 'bmp': return { results: [{ name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' }, { name: 'Potassium', value: '4.1 mmol/L', flag: '', ref: '3.5–5.0' }, { name: 'Creatinine (kidney)', value: kid ? '0.4 mg/dL' : '0.9 mg/dL', flag: '', ref: kid ? '0.2–0.5' : '0.6–1.2' }, { name: 'Bicarbonate', value: '24 mmol/L', flag: '', ref: '22–28' }] };
    case 'lft': return { results: [{ name: 'ALT (liver enzyme)', value: '22 U/L', flag: '', ref: '7–40' }, { name: 'Bilirubin', value: '0.6 mg/dL', flag: '', ref: '0.2–1.2' }] };
    case 'lipase': return { results: [{ name: 'Lipase', value: '32 U/L', flag: '', ref: '< 60' }] };
    case 'troponin': return { results: [{ name: 'Troponin', value: 'Not raised', flag: '', ref: 'Normal: very low' }] };
    case 'lactate': return { results: [{ name: 'Lactate', value: '1.1 mmol/L', flag: '', ref: '0.5–2.0' }] };
    case 'abg': return { results: [{ name: 'Blood gas pH', value: '7.40', flag: '', ref: '7.35–7.45' }, { name: 'Blood gas CO₂', value: '40 mmHg', flag: '', ref: '35–45' }] };
    case 'crp': return { results: [{ name: 'CRP', value: '3 mg/L', flag: '', ref: '< 5' }] };
    case 'coag': return { results: [{ name: 'INR (clotting)', value: '1.0', flag: '', ref: '0.9–1.2' }] };
    case 'cultures': return { report: 'Sent to the lab. Results take about 48 hours.' };
    case 'ua': return { results: [{ name: 'Urine test', value: 'No blood, no signs of infection, no sugar or ketones', flag: '', ref: 'Normal: negative' }] };
    case 'ck': return { results: [{ name: 'CK (muscle)', value: '120 U/L', flag: '', ref: '30–200' }] };
    case 'dimer': return { results: [{ name: 'D-dimer', value: 'Negative', flag: '', ref: 'Negative' }] };
    case 'tsh': return { results: [{ name: 'TSH (thyroid)', value: '1.8 mIU/L', flag: '', ref: '0.4–4.0' }] };
    case 'cohb': return { results: [{ name: 'Carbon monoxide (COHb)', value: '1%', flag: '', ref: '< 3% (non-smoker)' }] };
    case 'ketones': return { results: [{ name: 'Blood ketones', value: '0.2 mmol/L', flag: '', ref: '< 0.6' }] };
    case 'typecross': return { results: [{ name: 'Blood type', value: 'O positive — crossmatched units available', flag: '', ref: '' }] };
    case 'ecg': return hr > (kid ? 140 : 100) ? { report: 'Fast but regular heart rhythm (sinus tachycardia). No other changes.', image: 'ecg-sinus-tach' } : hr < 55 ? { report: 'Slow but regular heart rhythm (sinus bradycardia).', image: 'ecg-sinus-brady' } : { report: 'Normal heart rhythm and normal ECG.', image: 'ecg-normal' };
    case 'cxr': return { report: 'Normal chest X-ray: clear lungs, normal heart size, no collapsed lung.', image: 'cxr-normal' };
    case 'xr_limb': return { report: 'No fracture or dislocation seen.', image: 'xr-limb-normal' };
    case 'xr_abd': return { report: 'Normal bowel gas pattern. No blockage seen.' };
    case 'us_bedside': return { report: 'No free fluid in the belly or around the heart. Heart squeezing normally.' };
    case 'us_formal': return { report: 'No abnormality seen in the organs scanned.' };
    case 'echo': return { report: 'Normal heart size and pumping. No fluid around the heart.' };
    case 'ct_head': return { report: 'No bleeding, swelling or stroke changes in the brain.' };
    case 'ct_chest': return { report: 'No blood clot in the lungs and no other abnormality.' };
    case 'ct_abd': return { report: 'No abnormality in the abdomen or pelvis.' };
    case 'mri': return { report: 'No abnormality seen.' };
  }
  return { report: 'No abnormality found.' };
}

/* ───────── Image library ───────── */
const IMAGES = {
  'ecg-normal': { kind: 'ecg', label: 'Normal heart rhythm' },
  'ecg-sinus-tach': { kind: 'ecg', label: 'Fast regular rhythm (sinus tachycardia)' },
  'ecg-sinus-brady': { kind: 'ecg', label: 'Slow regular rhythm (sinus bradycardia)' },
  'ecg-afib': { kind: 'ecg', label: 'Irregular rhythm (atrial fibrillation)' },
  'ecg-stemi-anterior': { kind: 'ecg', label: 'ST elevation (heart attack)' },
  'ecg-stemi-inferior': { kind: 'ecg', label: 'ST elevation (heart attack)' },
  'ecg-peaked-t': { kind: 'ecg', label: 'Tall peaked T waves (high potassium)' },
  'ecg-low-voltage': { kind: 'ecg', label: 'Small, alternating beats (fluid around the heart)' },
  'ecg-heart-block': { kind: 'ecg', label: 'Complete heart block' },
  'cxr-normal': { kind: 'cxr', label: 'Normal chest X-ray' },
  'cxr-pneumonia-right': { kind: 'cxr', label: 'Pneumonia in the right lung' },
  'cxr-pneumonia-left': { kind: 'cxr', label: 'Pneumonia in the left lung' },
  'cxr-pneumothorax-right': { kind: 'cxr', label: 'Collapsed right lung (pneumothorax)' },
  'cxr-pneumothorax-left': { kind: 'cxr', label: 'Collapsed left lung (pneumothorax)' },
  'cxr-edema': { kind: 'cxr', label: 'Fluid in both lungs (heart failure)' },
  'cxr-hyperinflation': { kind: 'cxr', label: 'Over-inflated lungs (asthma)' },
  'cxr-wide-mediastinum': { kind: 'cxr', label: 'Widened middle of the chest (mediastinum)' },
  'cxr-big-heart': { kind: 'cxr', label: 'Enlarged heart shadow' },
  'cxr-battery': { kind: 'cxr', label: 'Swallowed round object (battery)' },
  'xr-wrist-buckle': { kind: 'limb', label: 'Buckle fracture of the wrist' },
  'xr-hip-fracture': { kind: 'limb', label: 'Hip fracture' },
  'xr-tibia-fracture': { kind: 'limb', label: 'Fracture of the shin bone (tibia)' },
  'xr-limb-normal': { kind: 'limb', label: 'Normal bones, no fracture' }
};
function readOptions(imageId) {
  const img = IMAGES[imageId]; if (!img) return null;
  const pool = []; Object.keys(IMAGES).forEach(k => { const l = IMAGES[k]; if (l.kind === img.kind && l.label !== img.label && pool.indexOf(l.label) < 0) pool.push(l.label); });
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const opts = pool.slice(0, 3).concat([img.label]);
  for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
  return { options: opts, answer: img.label };
}

/* ECG: a 6-second rhythm strip drawn from a beat model (Gaussian waves). */
function drawECG(id, hr) {
  const pat = (id || 'ecg-normal').replace('ecg-', '');
  let rate = pat === 'sinus-tach' ? Math.max(hr || 125, 115) : pat === 'sinus-brady' ? Math.min(hr || 45, 50) : pat === 'normal' ? Math.min(Math.max(hr || 75, 60), 95) : pat === 'afib' ? 125 : pat === 'low-voltage' ? 118 : pat === 'heart-block' ? 36 : (hr || 90);
  const T = 6, W = 600, H = 130, base = 72, amp = 46;
  const g = (t, c, w, a) => a * Math.exp(-((t - c) / w) * ((t - c) / w));
  const beats = [], pWaves = [];
  if (pat === 'afib') { let t = 0.3; while (t < T) { beats.push(t); t += (60 / rate) * (0.55 + Math.random() * 0.9); } }
  else { const iv = 60 / rate; for (let t = 0.35; t < T; t += iv) beats.push(t); }
  if (pat === 'heart-block') { for (let t = 0.15; t < T; t += 60 / 82) pWaves.push(t); }
  const st = pat.indexOf('stemi') === 0 ? 0.32 : 0, peaked = pat === 'peaked-t', small = pat === 'low-voltage';
  let d = '';
  for (let i = 0; i <= 1500; i++) {
    const t = i * T / 1500; let y = 0;
    beats.forEach((b, k) => {
      const a = small ? (k % 2 ? 0.22 : 0.34) : 1;
      if (pat !== 'afib' && pat !== 'heart-block') y += g(t, b - 0.16, 0.025, 0.13 * a);
      y += g(t, b - 0.025, 0.01, -0.12 * a) + g(t, b, 0.012, 1.0 * a) + g(t, b + 0.028, 0.012, -0.28 * a);
      if (st) y += (t > b + 0.04 && t < b + 0.24) ? st * Math.min(1, (t - b - 0.04) / 0.03) * Math.min(1, (b + 0.24 - t) / 0.06) : 0;
      y += peaked ? g(t, b + 0.25, 0.028, 0.85) : g(t, b + 0.28, 0.05, (st ? 0.42 : 0.28) * a);
    });
    pWaves.forEach(pw => { y += g(t, pw, 0.025, 0.13); });
    if (pat === 'afib') y += 0.035 * Math.sin(t * 47) + 0.025 * Math.sin(t * 29 + 1.3);
    d += (i ? 'L' : 'M') + (t / T * W).toFixed(1) + ' ' + (base - y * amp).toFixed(1);
  }
  let grid = '';
  for (let x = 0; x <= W; x += 10) grid += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + H + '" stroke="' + (x % 50 ? '#f6c9cf' : '#ee9aa6') + '" stroke-width="' + (x % 50 ? 0.5 : 1) + '"/>';
  for (let y = 0; y <= H; y += 10) grid += '<line x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '" stroke="' + (y % 50 ? '#f6c9cf' : '#ee9aa6') + '" stroke-width="' + (y % 50 ? 0.5 : 1) + '"/>';
  return '<svg class="ecg-img" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="ECG rhythm strip"><rect width="' + W + '" height="' + H + '" fill="#fff6f7"/>' + grid +
    '<path d="' + d + '" fill="none" stroke="#1a1a1a" stroke-width="1.6" stroke-linejoin="round"/><text x="6" y="14" font-size="11" font-family="monospace" fill="#555">Lead II · 25 mm/s</text></svg>';
}

/* Chest and limb X-rays: schematic grayscale drawings. Patient's right is on the viewer's LEFT. */
function drawXray(id) {
  const blur = '<defs><filter id="xb" filterUnits="userSpaceOnUse" x="0" y="0" width="300" height="300"><feGaussianBlur stdDeviation="2.2"/></filter><filter id="xb2" filterUnits="userSpaceOnUse" x="0" y="0" width="300" height="300"><feGaussianBlur stdDeviation="6"/></filter><radialGradient id="lg" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#2b2b2b"/><stop offset="1" stop-color="#111"/></radialGradient></defs>';
  const wrap = inner => '<svg class="xray-img" viewBox="0 0 300 300" role="img" aria-label="X-ray image"><rect width="300" height="300" fill="#050505"/>' + blur + inner + '<text x="10" y="20" font-size="14" font-weight="700" font-family="sans-serif" fill="#e8e8e8">R</text></svg>';
  if (IMAGES[id] && IMAGES[id].kind === 'limb') return wrap(limb(id));
  const p = id || 'cxr-normal';
  const hyper = p === 'cxr-hyperinflation', bigHeart = p === 'cxr-big-heart' || p === 'cxr-edema', wide = p === 'cxr-wide-mediastinum';
  const lungBottom = hyper ? 262 : 238;
  const lungL = 'M138 62 C100 58 64 90 58 150 C54 200 60 ' + lungBottom + ' 70 ' + lungBottom + ' C95 ' + (lungBottom - 14) + ' 120 ' + (lungBottom - 10) + ' 138 ' + (lungBottom - 4) + ' Z';
  const lungR = 'M162 62 C200 58 236 90 242 150 C246 200 240 ' + lungBottom + ' 230 ' + lungBottom + ' C205 ' + (lungBottom - 14) + ' 180 ' + (lungBottom - 10) + ' 162 ' + (lungBottom - 4) + ' Z';
  let s = '<ellipse cx="150" cy="165" rx="132" ry="150" fill="#3a3a3a" filter="url(#xb2)"/>';
  const pneumoR = p === 'cxr-pneumothorax-right', pneumoL = p === 'cxr-pneumothorax-left';
  s += '<path d="' + lungL + '" fill="' + (pneumoR ? '#030303' : 'url(#lg)') + '" filter="url(#xb)"/>';
  s += '<path d="' + lungR + '" fill="' + (pneumoL ? '#030303' : 'url(#lg)') + '" filter="url(#xb)"/>';
  const vessels = (cx, dir, skip) => skip ? '' : [0, 1, 2, 3, 4].map(i => '<path d="M' + cx + ' 130 q' + (dir * (20 + i * 9)) + ' ' + (-30 + i * 18) + ' ' + (dir * (40 + i * 12)) + ' ' + (-40 + i * 26) + '" stroke="#5a5a5a" stroke-width="1.3" fill="none" filter="url(#xb)"/>').join('');
  s += vessels(130, -1, pneumoR) + vessels(170, 1, pneumoL);
  if (pneumoR) s += '<path d="M132 80 C110 84 100 120 102 160 C104 190 118 200 134 196 Z" fill="url(#lg)" filter="url(#xb)"/><path d="M132 80 C110 84 100 120 102 160 C104 190 118 200 134 196" stroke="#bdbdbd" stroke-width="1.4" fill="none"/>';
  if (pneumoL) s += '<path d="M168 80 C190 84 200 120 198 160 C196 190 182 200 166 196 Z" fill="url(#lg)" filter="url(#xb)"/><path d="M168 80 C190 84 200 120 198 160 C196 190 182 200 166 196" stroke="#bdbdbd" stroke-width="1.4" fill="none"/>';
  for (let i = 0; i < 9; i++) { const y = 74 + i * 19; s += '<path d="M146 ' + (y - 6) + ' C110 ' + (y - 14) + ' 66 ' + (y + 2) + ' 60 ' + (y + 26) + '" stroke="#9a9a9a" stroke-width="3" fill="none" opacity=".55" filter="url(#xb)"/><path d="M154 ' + (y - 6) + ' C190 ' + (y - 14) + ' 234 ' + (y + 2) + ' 240 ' + (y + 26) + '" stroke="#9a9a9a" stroke-width="3" fill="none" opacity=".55" filter="url(#xb)"/>'; }
  s += '<rect x="141" y="20" width="18" height="270" rx="6" fill="#bdbdbd" filter="url(#xb)"/>';
  s += '<path d="M146 64 Q110 52 70 62" stroke="#d6d6d6" stroke-width="7" fill="none" filter="url(#xb)"/><path d="M154 64 Q190 52 230 62" stroke="#d6d6d6" stroke-width="7" fill="none" filter="url(#xb)"/>';
  const mw = wide ? 34 : 18;
  s += '<path d="M' + (150 - mw) + ' 60 L' + (150 - mw) + ' 140 L' + (150 + mw) + ' 140 L' + (150 + mw) + ' 60 Z" fill="#cfcfcf" filter="url(#xb)"/>';
  const hw = bigHeart ? 1.35 : hyper ? 0.82 : 1;
  s += '<path d="M' + (150 - 30 * hw) + ' 140 C' + (150 - 44 * hw) + ' 168 ' + (150 - 40 * hw) + ' 214 150 ' + (lungBottom - 6) + ' C' + (150 + 70 * hw) + ' ' + (lungBottom - 4) + ' ' + (150 + 76 * hw) + ' 180 ' + (150 + 34 * hw) + ' 140 Z" fill="#e2e2e2" filter="url(#xb)"/>';
  s += '<path d="M56 ' + lungBottom + ' Q100 ' + (lungBottom - (hyper ? 4 : 24)) + ' 146 ' + (lungBottom - 2) + '" stroke="#e6e6e6" stroke-width="10" fill="none" filter="url(#xb)"/><path d="M154 ' + (lungBottom + 4) + ' Q200 ' + (lungBottom - (hyper ? 2 : 20)) + ' 244 ' + (lungBottom + 2) + '" stroke="#e6e6e6" stroke-width="10" fill="none" filter="url(#xb)"/>';
  if (p === 'cxr-pneumonia-right') s += '<ellipse cx="92" cy="200" rx="34" ry="28" fill="#d0d0d0" opacity=".75" filter="url(#xb2)"/>';
  if (p === 'cxr-pneumonia-left') s += '<ellipse cx="208" cy="204" rx="32" ry="26" fill="#d0d0d0" opacity=".75" filter="url(#xb2)"/>';
  if (p === 'cxr-edema') s += '<ellipse cx="108" cy="140" rx="34" ry="44" fill="#bfbfbf" opacity=".6" filter="url(#xb2)"/><ellipse cx="192" cy="140" rx="34" ry="44" fill="#bfbfbf" opacity=".6" filter="url(#xb2)"/>';
  if (p === 'cxr-battery') s += '<circle cx="150" cy="58" r="13" fill="#fafafa"/><circle cx="150" cy="58" r="9" fill="none" stroke="#9e9e9e" stroke-width="2"/>';
  return wrap(s);
}
function limb(id) {
  if (id === 'xr-hip-fracture') {
    return '<path d="M30 40 C80 30 120 70 150 90 C180 70 220 30 270 40 L262 120 C230 110 200 130 186 160 L114 160 C100 130 70 110 38 120 Z" fill="#cfcfcf" filter="url(#xb)"/>' +
      '<circle cx="86" cy="150" r="24" fill="#e2e2e2" filter="url(#xb)"/><path d="M98 168 L120 186" stroke="#e2e2e2" stroke-width="20" filter="url(#xb)"/>' +
      '<path d="M128 196 L150 290" stroke="#e2e2e2" stroke-width="30" filter="url(#xb)"/><path d="M108 178 L126 172" stroke="#050505" stroke-width="3"/>' +
      '<circle cx="214" cy="150" r="24" fill="#e2e2e2" filter="url(#xb)"/><path d="M204 170 L186 200 L172 290" stroke="#e2e2e2" stroke-width="26" fill="none" filter="url(#xb)"/>';
  }
  if (id === 'xr-tibia-fracture') {
    return '<path d="M110 20 L118 130" stroke="#e2e2e2" stroke-width="34" filter="url(#xb)"/><path d="M122 146 L132 280" stroke="#e2e2e2" stroke-width="34" filter="url(#xb)"/>' +
      '<path d="M98 132 L142 150" stroke="#050505" stroke-width="4"/><path d="M176 24 L182 280" stroke="#cfcfcf" stroke-width="14" filter="url(#xb)"/>';
  }
  const buckle = id === 'xr-wrist-buckle';
  return '<path d="M118 20 L124 200" stroke="#e2e2e2" stroke-width="30" filter="url(#xb)"/><path d="M178 20 L172 204" stroke="#cfcfcf" stroke-width="20" filter="url(#xb)"/>' +
    (buckle ? '<path d="M104 170 q-8 6 0 12" stroke="#f4f4f4" stroke-width="5" fill="none"/><path d="M140 170 q8 6 0 12" stroke="#f4f4f4" stroke-width="5" fill="none"/>' : '') +
    [0, 1, 2, 3].map(i => '<circle cx="' + (120 + i * 18) + '" cy="228" r="10" fill="#d6d6d6" filter="url(#xb)"/>').join('') +
    [0, 1, 2, 3].map(i => '<path d="M' + (114 + i * 20) + ' 248 L' + (108 + i * 24) + ' 296" stroke="#d6d6d6" stroke-width="10" filter="url(#xb)"/>').join('');
}
function drawImage(id, hr) {
  const img = IMAGES[id]; if (!img) return '';
  return img.kind === 'ecg' ? drawECG(id, hr) : drawXray(id);
}

/* ───────── Medical word helper ───────── */
let termRe = null, termKeys = null;
function buildTerms() {
  const G = window.GLOSSARY || {}; termKeys = Object.keys(G).sort((a, b) => b.length - a.length);
  if (!termKeys.length) return;
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  termRe = new RegExp('(^|[^A-Za-z0-9\\-])(' + termKeys.map(escRe).join('|') + ')(?![A-Za-z0-9\\-])', 'i');
}
const TERM_SCOPE = '.findings, .exam-find, .tl li, .labs td, .img-card p, .pres, .explain, .lesson p, .lesson li, .question, .kv dd, .rec-list li, .talk-sit, .triage-desc';
function applyGlossary(root) {
  if (!window.GLOSSARY) return;
  if (!termRe) buildTerms(); if (!termRe) return;
  (root || document).querySelectorAll(TERM_SCOPE).forEach(box => {
    const used = new Set();
    const walker = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentNode.closest('button, .term, script, style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      let text = node.nodeValue, frag = null, guard = 0;
      while (text && guard++ < 6) {
        const m = termRe.exec(text); if (!m) break;
        const key = m[2].toLowerCase(); const start = m.index + m[1].length;
        if (used.has(key)) { const cut = start + m[2].length; frag = frag || document.createDocumentFragment(); frag.appendChild(document.createTextNode(text.slice(0, cut))); text = text.slice(cut); continue; }
        used.add(key);
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(text.slice(0, start)));
        const b = document.createElement('button'); b.className = 'term'; b.type = 'button'; b.setAttribute('data-term', key); b.textContent = m[2];
        frag.appendChild(b); text = text.slice(start + m[2].length);
      }
      if (frag) { frag.appendChild(document.createTextNode(text)); node.parentNode.replaceChild(frag, node); }
    });
  });
}
function showTerm(btn) {
  hideTerm();
  const def = (window.GLOSSARY || {})[btn.getAttribute('data-term')]; if (!def) return;
  const pop = document.createElement('div'); pop.className = 'term-pop'; pop.id = 'term-pop'; pop.setAttribute('role', 'tooltip');
  pop.innerHTML = '<b></b><span></span>'; pop.firstChild.textContent = btn.textContent; pop.lastChild.textContent = def;
  document.body.appendChild(pop);
  const r = btn.getBoundingClientRect(), w = pop.offsetWidth;
  pop.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
  const below = r.bottom + 8 + pop.offsetHeight < window.innerHeight;
  pop.style.top = (below ? r.bottom + 8 : r.top - pop.offsetHeight - 8) + 'px';
}
function hideTerm() { const o = document.getElementById('term-pop'); if (o) o.remove(); }
document.addEventListener('click', e => {
  const t = e.target.closest && e.target.closest('.term');
  if (t) { e.stopPropagation(); showTerm(t); return; }
  hideTerm();
}, true);
window.addEventListener('scroll', hideTerm, { passive: true });

window.CLIN = { TESTS: TESTS, isLab: isLab, normalResult: normalResult, IMAGES: IMAGES, readOptions: readOptions, drawImage: drawImage, applyGlossary: applyGlossary };
})();
