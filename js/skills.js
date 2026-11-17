/* Skills Lab: hands-on first-aid and safety skills played as step-by-step mini-games.
   First-aid level only (the kind taught in school and Red Cross classes):
   no medicine doses and no instructions for invasive procedures. */
(function () {
'use strict';
const { esc, shuffle } = window.UTIL;
const PASS = 70;
const F = 'font-family="Inter,sans-serif"';

/* ───────── Drawings ───────── */
function hand(x, y, flip, fill, stroke) {
  const f = (i, h) => '<rect x="' + (4 + i * 10) + '" y="' + (-h + 4) + '" width="9" height="' + h + '" rx="4.5" fill="' + fill + '" stroke="' + stroke + '"/>';
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + flip + ' 1)">' + f(0, 22) + f(1, 27) + f(2, 26) + f(3, 21) +
    '<rect x="0" y="0" width="46" height="46" rx="14" fill="' + fill + '" stroke="' + stroke + '"/>' +
    '<rect x="40" y="10" width="9" height="24" rx="4.5" fill="' + fill + '" stroke="' + stroke + '" transform="rotate(-35 44 22)"/></g>';
}
function bubbles(n, cx, cy, spread) {
  let s = '';
  for (let i = 0; i < n; i++) { const a = i * 2.4, r = (i % 4) * spread / 4 + 4; s += '<circle cx="' + (cx + Math.cos(a) * r * 1.6).toFixed(1) + '" cy="' + (cy + Math.sin(a) * r).toFixed(1) + '" r="' + (3 + i % 3 * 2) + '" fill="#fff" stroke="#9ec9ee" opacity=".95"/>'; }
  return s;
}
function svgWrap(inner, label) { return '<svg class="lab-art" viewBox="0 0 240 150" role="img" aria-label="' + esc(label) + '">' + inner + '</svg>'; }

function artHands(st) {
  const ph = st.pi, d = st.done;
  const water = (ph === 0 && d === 1) || (ph === 2 && d === 1);
  const soap = (ph === 0 && d >= 2) || ph === 1 || (ph === 2 && d === 0);
  const towel = ph === 2 && d >= 2, clean = ph >= 3 || st.phase === 'result';
  const nb = ph === 0 ? Math.max(0, d - 1) * 3 : ph === 1 ? 10 + Math.round(st.elapsed * 0.8) : ph === 2 && d === 0 ? 18 : 0;
  let s = '<rect x="30" y="122" width="180" height="22" rx="8" fill="#cfd8e3"/><rect x="104" y="12" width="32" height="10" rx="3" fill="#90a4ae"/><rect x="116" y="20" width="8" height="16" fill="#90a4ae"/>';
  if (water) s += '<rect class="lab-water" x="117" y="36" width="6" height="86" rx="3" fill="#8fd3ff" opacity=".8"/>';
  s += '<g class="' + (st.holding ? 'lab-rub' : '') + '">' + hand(70, 70, 1, '#e9c7ab', '#a97c5f') + hand(170, 70, -1, '#e0b494', '#a97c5f') + '</g>';
  if (soap) s += bubbles(Math.min(nb, 26), 120, 82, 26);
  if (towel) s += '<rect x="168" y="96" width="46" height="34" rx="4" fill="#fff" stroke="#9aa5b8"/><path d="M174 104 h34 M174 112 h34" stroke="#c6d3e6"/>';
  if (clean) s += '<text x="200" y="40" font-size="22">✨</text><text x="30" y="52" font-size="16">✨</text>';
  return svgWrap(s, 'Hands at a sink');
}

function artPpe(st) {
  const order = ['gown', 'mask', 'goggles', 'gloves'];
  let on = {};
  if (st.pi === 0) st.doneKeys.forEach(k => { on[k] = true; });
  else if (st.pi === 1) { order.forEach(k => { on[k] = true; }); st.doneKeys.forEach(k => { on[k] = false; }); }
  else if (st.phase !== 'result' && st.pi > 1) on = {};
  const skin = '#e9c7ab', scrub = '#1d5fbf';
  let s = '<rect x="0" y="0" width="240" height="150" fill="#f4f7fb"/>' +
    '<path d="M86 150 L92 92 Q120 78 148 92 L154 150 Z" fill="' + (on.gown ? '#f6c453' : scrub) + '" stroke="#55606e"/>' +
    '<path d="M92 94 L70 140" stroke="' + (on.gown ? '#f6c453' : scrub) + '" stroke-width="14" stroke-linecap="round"/><path d="M148 94 L170 140" stroke="' + (on.gown ? '#f6c453' : scrub) + '" stroke-width="14" stroke-linecap="round"/>' +
    '<circle cx="70" cy="140" r="8" fill="' + (on.gloves ? '#7e57c2' : skin) + '" stroke="#55606e"/><circle cx="170" cy="140" r="8" fill="' + (on.gloves ? '#7e57c2' : skin) + '" stroke="#55606e"/>' +
    '<circle cx="120" cy="56" r="26" fill="' + skin + '" stroke="#a97c5f"/><path d="M95 50 Q100 26 120 26 Q142 26 146 50 Q132 38 120 40 Q104 40 95 50Z" fill="#5b3a29"/>' +
    '<circle cx="110" cy="56" r="3" fill="#333"/><circle cx="130" cy="56" r="3" fill="#333"/>' +
    (on.mask ? '<path d="M100 62 Q120 58 140 62 L138 76 Q120 86 102 76 Z" fill="#8fd3ff" stroke="#3b82c4"/><path d="M100 64 L94 56 M140 64 L146 56" stroke="#3b82c4"/>' : '<path d="M112 70 Q120 76 128 70" stroke="#8c5a32" stroke-width="2" fill="none"/>') +
    (on.goggles ? '<rect x="100" y="48" width="40" height="16" rx="7" fill="#d9f2ff" fill-opacity=".55" stroke="#3b82c4" stroke-width="2"/>' : '');
  if (st.cleanHands) s += '<text x="174" y="128" font-size="16">✨</text><text x="52" y="128" font-size="16">✨</text>';
  return svgWrap(s, 'Doctor putting on protective gear');
}

function artSplint(st) {
  const k = st.allKeys, val = st.val == null ? 50 : st.val;
  const tight = k.wrap && st.pi === 1 ? val : k.wrap ? 50 : 0;
  const tooTight = st.pi === 1 && val > 70, loose = st.pi === 1 && val < 30;
  const pale = tooTight || (st.pi === 3 && !st.phaseDone);
  const raised = k.raise;
  let s = '<rect x="0" y="0" width="240" height="150" fill="#f4f7fb"/><g transform="' + (raised ? 'rotate(-12 40 90)' : '') + '">';
  if (k.place) s += '<rect x="26" y="' + (loose ? 104 : 98) + '" width="170" height="10" rx="3" fill="#d7b98c" stroke="#a07c4f"/>';
  if (k.pad) s += '<rect x="28" y="' + (loose ? 100 : 94) + '" width="166" height="6" rx="3" fill="#fff" stroke="#cfd8e3"/>';
  s += '<path d="M20 70 L170 66 L170 96 L20 96 Z" fill="#e9c7ab" stroke="#a97c5f"/><ellipse cx="96" cy="80" rx="12" ry="9" fill="#f2b8a0" opacity="' + (k.wrap ? 0 : .7) + '"/>' +
    '<g fill="' + (pale ? '#c4cde6' : '#f0b9a0') + '" stroke="#a97c5f">' + [0, 1, 2, 3].map(i => '<rect x="170" y="' + (64 + i * 8) + '" width="' + (28 - Math.abs(i - 1.5) * 4) + '" height="7" rx="3.5"/>').join('') + '</g>' +
    '<path d="M150 66 Q160 52 172 56" stroke="#a97c5f" stroke-width="7" fill="none" stroke-linecap="round"/>';
  if (k.wrap) { for (let x = 34; x < 166; x += 16) s += '<path d="M' + x + ' 64 L' + (x + 14) + ' 104" stroke="' + (tight > 70 ? '#c62828' : '#e3e8ef') + '" stroke-width="' + (tight > 70 ? 7 : 6) + '" opacity=".95"/>'; }
  if (raised) s += '<rect x="80" y="44" width="40" height="22" rx="8" fill="#bfe6ff" stroke="#3b82c4"/><text x="100" y="59" text-anchor="middle" font-size="9" fill="#1d5fbf" ' + F + '>ICE</text>';
  s += '</g>';
  if (st.pi === 1) s += '<text x="120" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="' + (tooTight ? '#c62828' : loose ? '#a67c00' : '#2e7d32') + '" ' + F + '>' + (tooTight ? 'Fingers pale and tingly' : loose ? 'Splint slides around' : 'Snug · fingers pink and warm') + '</text>';
  if (k.check || k.recheck) s += '<text x="214" y="44" font-size="16">👆</text>';
  return svgWrap(s, 'Forearm splint');
}

function artBleed(st) {
  const k = st.allKeys, pressing = st.pi === 1 ? st.holding : (k.press && st.pi !== 0) || (st.pi === 0 && k.press);
  let s = '<rect x="0" y="0" width="240" height="150" fill="#f4f7fb"/>' +
    '<path d="M10 80 L200 74 L200 110 L10 112 Z" fill="#e9c7ab" stroke="#a97c5f"/><path d="M200 74 Q232 78 232 92 Q232 108 200 110" fill="#e9c7ab" stroke="#a97c5f"/>' +
    '<path d="M96 92 L124 90" stroke="#b3261e" stroke-width="3" stroke-linecap="round"/>';
  if (!pressing && st.pi < 3) s += '<circle class="lab-drip" cx="112" cy="104" r="3" fill="#c62828"/><circle class="lab-drip b" cx="104" cy="104" r="2.5" fill="#c62828"/>';
  if (k.press || st.pi >= 1) s += '<rect x="88" y="76" width="46" height="30" rx="4" fill="#fff" stroke="#9aa5b8"/>' + (st.layers > 1 ? '<rect x="84" y="70" width="54" height="34" rx="4" fill="#fdfdfd" stroke="#9aa5b8"/>' : '');
  if (pressing) s += '<g class="lab-press">' + hand(86, 40, 1, k.safe ? '#7e57c2' : '#e0b494', '#55606e') + '</g>';
  if (k.call) s += '<rect x="196" y="12" width="26" height="42" rx="5" fill="#37474f"/><rect x="199" y="17" width="20" height="28" fill="#8fd3ff"/><text x="209" y="35" text-anchor="middle" font-size="8" font-weight="800" fill="#c62828" ' + F + '>911</text>';
  if (k.safe) s += '<text x="18" y="30" font-size="12" font-weight="700" fill="#5b3fa6" ' + F + '>Gloves on 🧤</text>';
  if (k.find) s += '<circle cx="110" cy="91" r="22" fill="none" stroke="#1d5fbf" stroke-width="2" stroke-dasharray="4 3"/>';
  return svgWrap(s, 'Pressing on a cut forearm');
}

function artRecovery(st) {
  const k = st.allKeys;
  let s = '<rect x="0" y="0" width="240" height="150" fill="#eef3ea"/>';
  if (k.roll) {
    s += '<circle cx="54" cy="70" r="14" fill="#e9c7ab" stroke="#a97c5f"/><path d="M46 62 Q54 54 64 60" stroke="#5b3a29" stroke-width="5" fill="none"/>' +
      '<path d="M70 74 Q110 62 150 72" stroke="#3f7cc4" stroke-width="26" stroke-linecap="round" fill="none"/>' +
      '<path d="M84 84 L82 110 L60 112" stroke="#e9c7ab" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '<path d="M84 64 Q70 72 62 80" stroke="#e9c7ab" stroke-width="8" stroke-linecap="round" fill="none"/>' +
      '<path d="M150 74 L184 64 L200 98" stroke="#37474f" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '<path d="M150 78 L222 84" stroke="#37474f" stroke-width="12" stroke-linecap="round" fill="none"/>' +
      (k.tilt ? '<text x="30" y="40" font-size="11" font-weight="700" fill="#2e7d32" ' + F + '>Airway open</text>' : '');
  } else {
    const nearArm = k.arm ? 'M86 92 L86 124 L58 124' : 'M86 90 L140 98';
    const farArm = k.cheek ? 'M86 50 L112 72 L70 80' : 'M86 50 L140 42';
    const farLeg = k.knee ? 'M150 60 L190 34 L206 60' : 'M150 60 L226 56';
    s += '<path d="M150 82 L226 86" stroke="#37474f" stroke-width="12" stroke-linecap="round" fill="none"/><path d="' + farLeg + '" stroke="#37474f" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '<path d="M80 71 L150 71" stroke="#3f7cc4" stroke-width="40" stroke-linecap="round"/>' +
      '<path d="' + nearArm + '" stroke="#e9c7ab" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '<path d="' + farArm + '" stroke="#e9c7ab" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '<circle cx="56" cy="71" r="15" fill="#e9c7ab" stroke="#a97c5f"/><path d="M42 66 Q44 56 56 56 Q50 64 42 66" fill="#5b3a29"/><path d="M50 74 h4 M58 74 h4" stroke="#555"/>';
  }
  if (k.tap && !k.call) s += '<rect x="96" y="6" width="110" height="24" rx="10" fill="#fff" stroke="#9aa5b8"/><text x="151" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="#334" ' + F + '>"Are you OK?"</text>';
  if (k.call) s += '<rect x="206" y="8" width="24" height="38" rx="5" fill="#37474f"/><rect x="209" y="13" width="18" height="24" fill="#8fd3ff"/><text x="218" y="29" text-anchor="middle" font-size="7" font-weight="800" fill="#c62828" ' + F + '>911</text>';
  if (k.call || k.watch) s += '<text class="lab-breathe" x="118" y="40" font-size="12" font-weight="700" fill="#1d5fbf" ' + F + '>breathing ∿</text>';
  if (k.safe) s += '<text x="10" y="144" font-size="10" fill="#5b6b82" ' + F + '>Scene safe ✓</text>';
  return svgWrap(s, 'Person lying on the floor');
}

function artOxygen(st) {
  const ph = SKILL_BY.oxygen.phases[st.pi] || {}, k = st.allKeys;
  let dev = ph.device || '', spo2 = ph.spo2 || 0;
  if (ph.type === 'order') { dev = k.place ? 'nrb' : ''; spo2 = k.watch ? 99 : 0; }
  if (st.phase === 'result') { dev = 'nrb'; spo2 = 99; }
  if (ph.type === 'quiz' && !st.phaseDone) dev = '';
  let s = '<rect x="0" y="0" width="240" height="150" fill="#f4f7fb"/><rect x="50" y="104" width="140" height="46" rx="20" fill="#9fb6d6"/>' +
    '<circle cx="120" cy="66" r="40" fill="#e9c7ab" stroke="#a97c5f"/><path d="M80 60 Q84 24 120 24 Q158 24 160 60 Q146 40 120 42 Q94 42 80 60Z" fill="#6d4c41"/>' +
    '<path d="M102 60 h10 M128 60 h10" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><path d="M118 64 Q114 76 120 78" stroke="#a97c5f" stroke-width="2" fill="none"/><path d="M110 88 Q120 92 130 88" stroke="#8c5a32" stroke-width="2" fill="none"/>';
  if (dev === 'cannula') s += '<path d="M80 70 Q96 84 114 80 M160 70 Q144 84 126 80" stroke="#8fd3ff" stroke-width="3" fill="none"/><path d="M114 80 h12" stroke="#3b82c4" stroke-width="3"/><path d="M80 70 Q70 110 90 140" stroke="#8fd3ff" stroke-width="3" fill="none"/>';
  if (dev === 'nrb') {
    s += '<path d="M98 64 Q120 56 142 64 L140 92 Q120 104 100 92 Z" fill="#d9f2ff" fill-opacity=".75" stroke="#3b82c4" stroke-width="2"/>' +
      (k.strap || st.phase === 'result' ? '<path d="M98 72 L80 62 M142 72 L160 62" stroke="#3b82c4" stroke-width="2"/>' : '') +
      (k.nose || st.phase === 'result' ? '<path d="M112 62 Q120 58 128 62" stroke="#90a4ae" stroke-width="3" fill="none"/>' : '') +
      '<ellipse cx="120" cy="' + (k.fill || st.phase === 'result' ? 124 : 116) + '" rx="' + (k.fill || st.phase === 'result' ? 20 : 12) + '" ry="' + (k.fill || st.phase === 'result' ? 18 : 6) + '" fill="#e8f5e9" stroke="#66bb6a" stroke-width="2"/><path d="M120 100 v6" stroke="#3b82c4" stroke-width="3"/>';
  }
  if (!dev && ph.type === 'order' && k.fill) s += '<ellipse cx="200" cy="120" rx="20" ry="18" fill="#e8f5e9" stroke="#66bb6a" stroke-width="2"/><text x="200" y="146" text-anchor="middle" font-size="8" fill="#2e7d32" ' + F + '>bag filled</text>';
  if (spo2) s += '<rect x="176" y="10" width="56" height="34" rx="6" fill="#0b1220"/><text x="182" y="22" font-size="8" fill="#38bdf8" ' + F + '>SpO₂</text><text x="226" y="40" text-anchor="end" font-size="17" font-weight="800" fill="' + (spo2 < 92 ? '#f87171' : '#38bdf8') + '" ' + F + '>' + spo2 + '%</text>';
  return svgWrap(s, 'Patient with an oxygen device');
}

/* ───────── The six skills ───────── */
const SKILLS = [
  { id: 'hands', name: 'Hand Washing', emoji: '🧼', color: '#0f7c8c', art: artHands,
    blurb: 'The most important way to stop germs spreading in a hospital — and at home.',
    phases: [
      { type: 'order', title: 'Wash, step by step', prompt: 'Tap the steps in the right order.', steps: [
        { k: 'wet', t: 'Wet your hands with clean running water', why: 'Water first, so the soap can lather.' },
        { k: 'soap', t: 'Put on enough soap to cover every part of both hands', why: 'Soap lifts germs and dirt off the skin.' },
        { k: 'palms', t: 'Rub your palms together', why: 'Start with the biggest surfaces.' },
        { k: 'backs', t: 'Rub the back of each hand with the other palm', why: 'The backs of hands are easy to forget.' },
        { k: 'between', t: 'Lace your fingers together and rub between them', why: 'Germs hide between fingers.' },
        { k: 'thumbs', t: 'Grip each thumb in the other hand and twist', why: 'Thumbs are the most often missed spot.' },
        { k: 'tips', t: 'Rub your fingertips in circles in the other palm (under the nails too)', why: 'Fingertips touch everything — including patients.' }
      ] },
      { type: 'hold', title: 'Keep scrubbing', prompt: 'Hold the SCRUB button for 20 seconds of lathering — about as long as humming "Happy Birthday" twice.', secs: 20, label: 'SCRUB', unit: 'seconds', reset: false, done: 'Twenty seconds — that is long enough for soap to do its job.' },
      { type: 'order', title: 'Rinse and dry', prompt: 'Finish the job.', steps: [
        { k: 'rinse', t: 'Rinse your hands well under running water', why: 'Rinsing carries the loosened germs away.' },
        { k: 'dry', t: 'Dry them with a clean paper towel', why: 'Wet hands spread germs more easily.' },
        { k: 'tap', t: 'Use the towel to turn off the tap', why: 'The tap handle was touched by dirty hands.' }
      ] },
      { type: 'quiz', q: 'Alcohol hand gel works for most hand cleaning in hospitals. When should you use soap and water instead?', opts: [
        { t: 'When hands look dirty, or after caring for someone with vomiting or diarrhea', ok: true, fb: 'Right! Gel does not clean visibly dirty hands, and some stomach-bug germs (like norovirus) are not killed well by alcohol. Soap and water wash them away.' },
        { t: 'Never — hand gel always works better than soap', ok: false, fb: 'Gel is great most of the time, but not for dirty hands or some stomach-bug germs.' },
        { t: 'Only before eating lunch', ok: false, fb: 'Hands need cleaning before and after every patient, not just at lunch.' },
        { t: 'Only when wearing gloves', ok: false, fb: 'Gloves do not replace hand cleaning — clean hands before putting gloves on and after taking them off.' }
      ] }
    ],
    teach: ['Lather for at least 20 seconds — backs, between fingers, thumbs and fingertips.', 'Use soap and water when hands look dirty or after vomiting or diarrhea illnesses.', 'Doctors clean their hands before and after touching every patient.'] },

  { id: 'ppe', name: 'Protective Gear', emoji: '🥽', color: '#5b3fa6', art: artPpe,
    blurb: 'Put on and take off gown, mask, goggles and gloves in the safe order.',
    phases: [
      { type: 'order', title: 'Putting it on', prompt: 'Your patient may have a germ that spreads by droplets, and you may get splashed. Put on full gear in the right order.', steps: [
        { k: 'hands', t: 'Clean your hands', why: 'Always start with clean hands.' },
        { k: 'gown', t: 'Put on the gown and tie it at the back', why: 'The gown goes on first so everything else goes on top of it.' },
        { k: 'mask', t: 'Put on the mask and fit it over your nose and chin', why: 'The mask goes on before goggles so the goggles sit over it.' },
        { k: 'goggles', t: 'Put on goggles or a face shield', why: 'Protects your eyes from splashes.' },
        { k: 'gloves', t: 'Put on gloves, pulled over the gown cuffs', why: 'Gloves go last so they cover the gown sleeves.' }
      ] },
      { type: 'order', title: 'Taking it off', prompt: 'The outside of everything is now "dirty". Take it off in the order that keeps germs off you (the CDC\'s first method — there is a second one, too).', steps: [
        { k: 'gloves', t: 'Take off the gloves', why: 'Gloves are the dirtiest, so they come off first.' },
        { k: 'goggles', t: 'Take off goggles or face shield by the strap', why: 'Handle them by the strap — the front may be contaminated.' },
        { k: 'gown', t: 'Untie the gown and roll it away from your body', why: 'Rolling it inside-out traps the germs inside.' },
        { k: 'mask', t: 'Take off the mask by the ties or ear loops', why: 'Never touch the front of the mask.' },
        { k: 'hands', t: 'Clean your hands right away', why: 'Always finish with clean hands.' }
      ] },
      { type: 'quiz', q: 'While taking off your gown, your bare hand touches the outside of it. What should you do?', opts: [
        { t: 'Clean your hands straight away, then carry on', ok: true, fb: 'Yes — clean your hands whenever they might have touched something contaminated, even partway through.' },
        { t: 'Ignore it — you will clean your hands at the end anyway', ok: false, fb: 'Your dirty hand could spread germs to your face or the next item. Clean it now.' },
        { t: 'Wipe your hand on your scrubs', ok: false, fb: 'That just moves the germs onto your clothes.' },
        { t: 'Put the gown back on and start again', ok: false, fb: 'Not needed — just clean your hands and carry on.' }
      ] }
    ],
    teach: ['On: hands → gown → mask → goggles → gloves.', 'Off: gloves → goggles → gown → mask → hands. The dirtiest things come off first.', 'Hospitals post their own order on the wall — always follow your hospital\'s poster.'] },

  { id: 'splint', name: 'Splinting', emoji: '🦴', color: '#a0522d', art: artSplint,
    blurb: 'Keep a hurt arm still and safe until it can be X-rayed — and check the circulation.',
    phases: [
      { type: 'order', title: 'Splint the forearm', prompt: 'A girl fell off her skateboard and hurt her wrist. Tap the steps in order.', steps: [
        { k: 'check', t: 'Keep the arm still as you found it (don\'t straighten it) and check the hand beyond the injury: color, warmth, feeling and movement', why: 'Moving a broken bone can hurt it more — and this check is your "before" picture to compare with later.' },
        { k: 'pad', t: 'Pad the splint so it is soft and comfortable', why: 'Padding stops sore pressure spots.' },
        { k: 'place', t: 'Line up the splint so it supports the joints above and below the injured bone', why: 'Holding the joints on both sides stops the bone from moving.' },
        { k: 'wrap', t: 'Wrap a bandage around to hold the splint in place', why: 'Next: how tight?' }
      ] },
      { type: 'slider', title: 'How snug?', prompt: 'Slide to set how tight the wrap is, then check the fingers.', btn: 'Check the Fingers', zones: [
        { max: 30, ok: false, fb: 'Too loose — the splint slides around and the bone can still move.' },
        { max: 70, ok: true, fb: 'Just right — snug, and the fingers stay pink and warm.' },
        { max: 101, ok: false, fb: 'Too tight — the fingers turned pale and tingly. A wrap that is too tight squeezes the blood flow.' }
      ] },
      { type: 'order', title: 'After splinting', prompt: 'Two more steps.', steps: [
        { k: 'recheck', t: 'Check color, warmth, feeling and movement beyond the splint again', why: 'Compare with your "before" check.' },
        { k: 'raise', t: 'Raise the arm and put on an ice pack wrapped in a cloth', why: 'Raising it and cold both reduce swelling. Never put ice right on bare skin.' }
      ] },
      { type: 'quiz', q: 'Twenty minutes later her fingers look pale and she says they feel tingly and cold. What do you do?', opts: [
        { t: 'Loosen the wrap, re-check the fingers, and get a doctor to look straight away', ok: true, fb: 'Correct. Pale, cold, tingly fingers mean blood flow is being squeezed. Loosen it and get help.' },
        { t: 'Wrap it tighter so the arm stays still', ok: false, fb: 'Tighter would squeeze the blood flow even more.' },
        { t: 'Leave it — tingling is normal after an injury', ok: false, fb: 'New pale, cold, tingly fingers are a warning sign, not normal.' },
        { t: 'Take off the splint and ask her to move her wrist', ok: false, fb: 'The arm still needs support. Loosen the wrap rather than removing the splint, and get help.' }
      ] }
    ],
    teach: ['Check circulation, feeling and movement before AND after splinting.', 'Support the joints above and below the injured bone; don\'t straighten it.', 'Snug, not tight. Pale, cold or tingly fingers mean loosen it and get help.'] },

  { id: 'bleed', name: 'Stop the Bleeding', emoji: '🩹', color: '#c62828', art: artBleed,
    blurb: 'Firm, steady pressure is how you stop most bleeding — and don\'t peek!',
    phases: [
      { type: 'order', title: 'First steps', prompt: 'Someone cut their forearm badly on broken glass. Tap the steps in order.', steps: [
        { k: 'safe', t: 'Make sure it is safe for you, and put on gloves if there are some nearby', why: 'Protect yourself first (watch out for the broken glass!).' },
        { k: 'call', t: 'Shout for help and have someone call 911', why: 'Get help on the way early.' },
        { k: 'find', t: 'Find exactly where the blood is coming from', why: 'Pressure only works if it is on the right spot.' },
        { k: 'press', t: 'Press firmly right on the wound with a clean cloth or gauze', why: 'Firm, direct pressure stops most bleeding.' }
      ] },
      { type: 'hold', title: 'Keep the pressure on', prompt: 'Hold PRESS without letting go. Each second here stands for a minute in real life. Don\'t lift to peek!', secs: 10, label: 'PRESS', unit: 'minutes', reset: true, resetMsg: 'You let go to peek — that can disturb the clot that is forming. Press again and keep holding.', done: 'Ten "minutes" of steady pressure. The bleeding has slowed right down.' },
      { type: 'quiz', q: 'Blood starts soaking through the cloth. What should you do?', after: 'layers', opts: [
        { t: 'Put another cloth on top of the first and keep pressing hard', ok: true, fb: 'Yes! Leave the first cloth in place so you don\'t pull off the clot, add more on top, and press harder.' },
        { t: 'Peel off the soaked cloth and start again with a new one', ok: false, fb: 'Pulling off the first cloth can rip away the clot that is starting to form.' },
        { t: 'Let go and wait to see if it stops on its own', ok: false, fb: 'Bleeding needs steady pressure — letting go makes it worse.' },
        { t: 'Rinse the wound under the tap', ok: false, fb: 'Cleaning can wait. Right now the job is stopping the bleeding.' }
      ] },
      { type: 'quiz', q: 'Bleeding from an arm or leg is very heavy and won\'t slow down even with hard pressure. What is the best plan?', opts: [
        { t: 'Keep pressing hard, make sure emergency help is coming, and use a tourniquet if someone has one and knows how', ok: true, fb: 'Right. Keep up the pressure. A tourniquet (a tight band above the wound) can stop life-threatening arm or leg bleeding — anyone, teens included, can learn to use one in a "Stop the Bleed" class.' },
        { t: 'Give them something to drink', ok: false, fb: 'Drinks don\'t help bleeding, and someone badly hurt may need surgery.' },
        { t: 'Have them walk to the car to go to hospital', ok: false, fb: 'Moving around increases bleeding. Keep them still and call 911.' },
        { t: 'Stop pressing so you can look for a bandage', ok: false, fb: 'Never stop pressure on heavy bleeding — send someone else to look.' }
      ] }
    ],
    teach: ['Stay safe, call 911, find the bleeding, press hard and keep pressing.', 'Don\'t lift to peek. If blood soaks through, add more cloth on top.', 'For life-threatening arm or leg bleeding, a tourniquet can save a life — learn how in a "Stop the Bleed" class!'] },

  { id: 'recovery', name: 'Recovery Position', emoji: '🛌', color: '#2e7d32', art: artRecovery,
    blurb: 'Keep someone who is breathing but not awake safe while help comes.',
    phases: [
      { type: 'order', title: 'Check them', prompt: 'You find someone lying on the floor at school. Tap the steps in order.', steps: [
        { k: 'safe', t: 'Check that the area is safe for you', why: 'You can\'t help if you get hurt too.' },
        { k: 'tap', t: 'Tap their shoulder and shout "Are you OK?"', why: 'See if they respond.' },
        { k: 'call', t: 'No answer: shout for help, have someone call 911, and check for normal breathing — watch the chest rise and fall for no more than 10 seconds', why: 'Help is on the way, and breathing tells you what to do next. (Some courses check breathing just before calling — both are fine.)' }
      ] },
      { type: 'quiz', q: 'They are breathing normally but still won\'t wake up. What do you do?', opts: [
        { t: 'Roll them into the recovery position and keep checking their breathing', ok: true, fb: 'Right! On their side, the tongue can\'t block the airway and anything they vomit can drain out.' },
        { t: 'Start chest compressions (CPR)', ok: false, fb: 'CPR is for someone who is NOT breathing normally. This person is breathing.' },
        { t: 'Give them a drink of water', ok: false, fb: 'Never give food or drink to someone who isn\'t fully awake — they could choke.' },
        { t: 'Sit them up against the wall', ok: false, fb: 'Their head could flop forward and block the airway. The recovery position is safer.' }
      ] },
      { type: 'order', title: 'Roll them into the recovery position', prompt: 'Kneel beside them. Tap the steps in order.', steps: [
        { k: 'arm', t: 'Place the arm nearest you out at a right angle, elbow bent, palm up', why: 'This arm stops them rolling too far.' },
        { k: 'cheek', t: 'Bring their far arm across the chest and hold the back of that hand against the cheek nearest you', why: 'The hand cushions and supports the head.' },
        { k: 'knee', t: 'Bend their far knee up, foot flat on the floor', why: 'The bent leg is your handle for rolling.' },
        { k: 'roll', t: 'Pull the bent knee toward you to roll them onto their side', why: 'Rolling toward you keeps it controlled.' },
        { k: 'tilt', t: 'Tilt the head back a little to keep the airway open', why: 'An open airway lets air flow freely.' },
        { k: 'watch', t: 'Stay with them and keep checking their breathing until help arrives', why: 'Things can change — keep watching.' }
      ] },
      { type: 'quiz', q: 'While you wait, they stop breathing normally. What now?', opts: [
        { t: 'Roll them onto their back and start CPR, and tell 911 that they stopped breathing', ok: true, fb: 'Exactly — no normal breathing means start CPR straight away. (Practice compressions in the CPR trainer!)' },
        { t: 'Keep them in the recovery position and wait', ok: false, fb: 'The recovery position is only for someone who IS breathing normally.' },
        { t: 'Shake them hard to wake them up', ok: false, fb: 'Shaking won\'t restart breathing. Start CPR.' },
        { t: 'Leave to find an adult', ok: false, fb: 'Shout for help but stay and start CPR — every minute matters.' }
      ] }
    ],
    teach: ['Safe? → Responsive? → Call 911 → Breathing?', 'Breathing but not awake: recovery position, and keep checking.', 'Not breathing normally: start CPR.'] },

  { id: 'oxygen', name: 'Oxygen Mask', emoji: '😷', color: '#1d5fbf', art: artOxygen,
    blurb: 'Choose the right oxygen device for each patient, then fit it.',
    phases: [
      { type: 'quiz', spo2: 91, device: 'cannula', q: 'Patient 1: an older man with pneumonia. Oxygen level 91%. He\'s talking in full sentences and only a little short of breath. Which is best?', opts: [
        { t: 'Nasal cannula — two small prongs in the nose giving a little extra oxygen', ok: true, fb: 'Right. He needs just a little extra oxygen, and a nasal cannula is comfortable and lets him talk and eat.' },
        { t: 'Non-rebreather mask with a reservoir bag', ok: false, fb: 'That gives a lot of oxygen — more than he needs right now.' },
        { t: 'No oxygen at all', ok: false, fb: '91% is a bit low. Most patients aim for about 94–98% (some people with long-term lung disease a bit lower).' },
        { t: 'A paper bag over the mouth', ok: false, fb: 'Breathing into a bag would make his oxygen even lower!' }
      ] },
      { type: 'quiz', spo2: 98, device: '', q: 'Patient 2: a woman with mild chest discomfort. Oxygen level 98% in room air. She\'s comfortable. Does she need oxygen?', opts: [
        { t: 'No — her oxygen level is already normal, so extra oxygen won\'t help', ok: true, fb: 'Correct! Oxygen is a treatment, not a comfort blanket. When the level is normal, extra oxygen doesn\'t help and can even do harm in some heart problems.' },
        { t: 'Yes — every chest pain patient gets a non-rebreather mask', ok: false, fb: 'That used to be common, but now we only give oxygen if the level is low.' },
        { t: 'Yes — a nasal cannula just in case', ok: false, fb: 'Not needed when the level is normal. We watch it and give oxygen if it drops.' },
        { t: 'Yes — have her breathe from the tank directly', ok: false, fb: 'Never — oxygen is always given through a proper device at a set flow.' }
      ] },
      { type: 'quiz', spo2: 99, device: 'nrb', q: 'Patient 3: pulled from a smoky house fire with a headache and confusion. The oxygen reading says 99% — but you suspect carbon monoxide poisoning. What do you choose?', opts: [
        { t: 'Non-rebreather mask — as much oxygen as possible, even though the number looks normal', ok: true, fb: 'Yes! Carbon monoxide fools the finger sensor into reading "normal". High-flow oxygen through a non-rebreather pushes the carbon monoxide out faster.' },
        { t: 'No oxygen — 99% is normal', ok: false, fb: 'This is the trap! With carbon monoxide the finger sensor can show a falsely normal number.' },
        { t: 'Nasal cannula', ok: false, fb: 'Too little oxygen. Carbon monoxide poisoning needs as much oxygen as possible.' },
        { t: 'Open a window and wait', ok: false, fb: 'Fresh air helps at the scene, but in hospital this patient needs high-flow oxygen now.' }
      ] },
      { type: 'order', title: 'Fit the non-rebreather mask', prompt: 'Tap the steps in order.', steps: [
        { k: 'explain', t: 'Clean your hands and explain to the patient what you are doing', why: 'A scared patient fights the mask. Explain first.' },
        { k: 'connect', t: 'Connect the tubing to the oxygen supply and turn it on (the nurse or respiratory therapist sets the flow)', why: 'Oxygen has to be flowing before the mask goes on.' },
        { k: 'fill', t: 'Let the reservoir bag fill up with oxygen', why: 'An empty bag means the patient would breathe in very little oxygen.' },
        { k: 'place', t: 'Place the mask over the nose and mouth', why: 'It must cover both.' },
        { k: 'strap', t: 'Slip the elastic strap over the head and adjust it', why: 'Snug, so oxygen doesn\'t leak out the sides.' },
        { k: 'nose', t: 'Pinch the metal strip to fit the bridge of the nose', why: 'Seals the top of the mask.' },
        { k: 'watch', t: 'Check the bag stays partly full, and watch the patient and oxygen level', why: 'If the bag collapses, the patient isn\'t getting enough oxygen.' }
      ] }
    ],
    teach: ['Little extra oxygen: nasal cannula. Lots: non-rebreather mask.', 'Most patients aim for about 94–98% (some lung patients a bit lower). Normal level? No extra oxygen needed.', 'Carbon monoxide fools the finger sensor — give high-flow oxygen anyway.'] }
];
const SKILL_BY = {}; SKILLS.forEach(s => { SKILL_BY[s.id] = s; });

/* Hands-on skills that appear inside matching ER cases. */
const CASE_SKILLS = {
  'ortho-wrist-01': 'splint', 'core-asthma': 'oxygen', 'a-pneumonia-01': 'oxygen', 'f-carbon-monoxide': 'oxygen',
  'a-seizure-01': 'recovery', 'f-febrile-seizure': 'recovery', 'b-meningitis-01': 'ppe', 'e-gastro-dehydration-01': 'hands'
};

/* ───────── Game engine ───────── */
let st = null;
function open(id, opts) {
  close();
  const g = SKILL_BY[id]; if (!g) return;
  const root = document.createElement('div'); root.id = 'lab-root'; root.className = 'cpr-bg'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
  document.body.appendChild(root);
  st = { g: g, opts: opts || {}, root: root, phase: 'intro', pi: -1, done: 0, doneKeys: [], allKeys: {}, pool: [], miss: 0, pts: 0, max: 0, msg: '', msgKind: '', val: 50, holding: false, elapsed: 0, releases: 0, timer: null, phaseDone: false, quizTried: false, picked: null, layers: 1, cleanHands: false };
  draw();
  document.addEventListener('keydown', onKey, true);
  document.addEventListener('keyup', onKeyUp, true);
  root.addEventListener('click', onClick);
  root.addEventListener('pointerdown', onDown);
  root.addEventListener('input', onInput);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => root.addEventListener(ev, onUp, true));
}
function close() {
  if (!st) return;
  stopTimer();
  document.removeEventListener('keydown', onKey, true);
  document.removeEventListener('keyup', onKeyUp, true);
  if (st.root) st.root.remove();
  st = null;
}
const better = (a, b) => !a ? b : !b ? a : (b.score >= a.score ? b : a);
function finish(quit) { const prev = st.opts.prev, cb = st.opts.onDone, r = quit ? (prev || { quit: true, id: st.g.id }) : better(prev, st.result); close(); if (cb) cb(r); }
function phase() { return st.g.phases[st.pi]; }
function startPhase(i) {
  st.pi = i; stopTimer();
  if (i >= st.g.phases.length) return result();
  const ph = phase();
  st.phase = ph.type; st.done = 0; st.doneKeys = []; st.miss = 0; st.msg = ''; st.msgKind = ''; st.phaseDone = false; st.quizTried = false; st.picked = null;
  st.elapsed = 0; st.releases = 0; st.holding = false; st.val = Math.random() < 0.5 ? 10 : 90; st.sliderTried = false;
  if (ph.type === 'order') { st.pool = shuffle(ph.steps.map((s, j) => j)); st.max += ph.steps.length; }
  else { st.max += 1; }
  if (ph.type === 'quiz') st.order = shuffle(ph.opts.map((o, j) => j));
  draw();
}
function result() {
  stopTimer();
  const pct = Math.round(100 * st.pts / Math.max(1, st.max));
  st.result = { id: st.g.id, score: pct, pass: pct >= PASS, stars: pct >= 100 ? 3 : pct >= 85 ? 2 : pct >= PASS ? 1 : 0 };
  st.phase = 'result'; st.cleanHands = true; draw();
  if (window.SND && SND.click && st.result.pass) SND.click();
}

function onKey(e) {
  if (!st) return;
  if (e.key === 'Escape') { e.preventDefault(); finish(true); return; }
  if ((e.code === 'Space' || e.key === ' ') && st.phase === 'hold') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) holdStart(); }
}
function onKeyUp(e) { if (st && (e.code === 'Space' || e.key === ' ') && st.phase === 'hold') { e.preventDefault(); holdStop(); } }
function onDown(e) { if (st && st.phase === 'hold' && e.target.closest('[data-lab="hold"]')) { e.preventDefault(); holdStart(); } }
function onUp(e) { if (st && st.phase === 'hold' && st.holding && (e.type !== 'pointerleave' || e.target.closest && e.target.closest('[data-lab="hold"]'))) holdStop(); }
function onInput(e) {
  if (!st || st.phase !== 'slider' || !e.target.matches('.lab-slider')) return;
  st.val = +e.target.value; const a = st.root.querySelector('.lab-art-wrap'); if (a) a.innerHTML = st.g.art(st);
}
function onClick(e) {
  const b = e.target.closest('[data-lab]'); if (!b || !st) return;
  const a = b.getAttribute('data-lab');
  if (a === 'start') startPhase(0);
  else if (a === 'quit') finish(true);
  else if (a === 'done') finish(false);
  else if (a === 'next') startPhase(st.pi + 1);
  else if (a === 'retry') { const g = st.g.id, o = Object.assign({}, st.opts, { prev: better(st.opts.prev, st.result) }); close(); open(g, o); }
  else if (a === 'pick') pickStep(+b.getAttribute('data-i'));
  else if (a === 'opt') pickOpt(+b.getAttribute('data-i'));
  else if (a === 'slide-check') sliderCheck();
}

function pickStep(i) {
  const ph = phase();
  if (st.done >= ph.steps.length) return;
  if (i === st.done) {
    const s = ph.steps[i];
    if (!st.miss) st.pts++;
    st.done++; st.doneKeys.push(s.k); st.allKeys[s.k] = true; st.miss = 0;
    st.cleanHands = s.k === 'hands';
    st.msg = '✓ ' + s.why; st.msgKind = 'ok';
    if (window.SND && SND.click) SND.click();
  } else {
    st.miss++;
    st.msg = st.miss >= 2 ? 'Hint: the next step is highlighted.' : (i < st.done ? 'Already done.' : 'Not yet — "' + ph.steps[i].t.split(' — ')[0] + '" comes later. What has to happen first?');
    st.msgKind = 'bad';
  }
  draw();
}
function pickOpt(i) {
  const ph = phase(); if (st.phaseDone) return;
  const o = ph.opts[i]; st.picked = i;
  if (o.ok) { st.phaseDone = true; if (!st.quizTried) st.pts++; if (ph.after === 'layers') st.layers = 2; st.msg = o.fb; st.msgKind = 'ok'; }
  else { st.quizTried = true; st.msg = o.fb + ' Try again.'; st.msgKind = 'bad'; }
  draw();
}
function sliderCheck() {
  const ph = phase(), z = ph.zones.find(x => st.val < x.max);
  if (z.ok) { if (!st.sliderTried) st.pts++; st.phaseDone = true; st.msg = '✓ ' + z.fb; st.msgKind = 'ok'; }
  else { st.sliderTried = true; st.msg = z.fb + ' Adjust and check again.'; st.msgKind = 'bad'; }
  draw();
}

function holdStart() {
  if (st.holding || st.phaseDone) return;
  st.holding = true; st.msg = ''; st.msgKind = '';
  let last = performance.now();
  stopTimer();
  st.timer = setInterval(() => {
    if (!st || !st.holding) return;
    const now = performance.now(); st.elapsed += (now - last) / 1000; last = now;
    const ph = phase();
    if (st.elapsed >= ph.secs) { st.elapsed = ph.secs; st.holding = false; stopTimer(); st.phaseDone = true; if (!st.releases || !ph.reset) st.pts++; else st.pts += 0.5; st.msg = '✓ ' + ph.done; st.msgKind = 'ok'; if (window.SND && SND.click) SND.click(); draw(); return; }
    liveHold();
  }, 100);
  liveHold();
}
function holdStop() {
  if (!st.holding) return;
  st.holding = false; stopTimer();
  const ph = phase();
  if (ph.reset) { st.releases++; st.elapsed = 0; st.msg = ph.resetMsg; st.msgKind = 'bad'; }
  else { st.msg = 'Paused — hold the button to keep going.'; st.msgKind = ''; }
  liveHold();
}
function stopTimer() { if (st && st.timer) { clearInterval(st.timer); st.timer = null; } }
function liveHold() {
  if (!st) return;
  const ph = phase(), r = st.root;
  const f = r.querySelector('.lab-hold-fill'); if (f) f.style.width = (100 * st.elapsed / ph.secs) + '%';
  const t = r.querySelector('.lab-hold-time'); if (t) t.textContent = Math.floor(st.elapsed) + ' / ' + ph.secs + ' ' + ph.unit;
  const a = r.querySelector('.lab-art-wrap'); if (a) a.innerHTML = st.g.art(st);
  const m = r.querySelector('.lab-msg'); if (m) { m.textContent = st.msg; m.className = 'lab-msg ' + st.msgKind; }
  const b = r.querySelector('[data-lab="hold"]'); if (b) b.classList.toggle('on', st.holding);
}

function dots() {
  return '<div class="lab-dots">' + st.g.phases.map((p, i) => '<span class="' + (i < st.pi ? 'done' : i === st.pi ? 'cur' : '') + '"></span>').join('') + '</div>';
}
function draw() {
  if (!st) return;
  const g = st.g, o = st.opts, ph = phase();
  const head = '<div class="cpr-head lab-head" style="background:' + g.color + '">' + g.emoji + ' ' + (o.caseTitle ? 'HANDS-ON SKILL' : 'SKILLS LAB') + '<span>' + esc(o.caseTitle || g.name) + '</span></div>';
  let body = '';
  const art = '<div class="lab-art-wrap">' + g.art(st) + '</div>';
  const msg = '<div class="lab-msg ' + st.msgKind + '" aria-live="polite">' + esc(st.msg) + '</div>';
  if (st.phase === 'intro') {
    body = '<h2 class="lab-title">' + esc(g.name) + '</h2>' + art + '<p class="cpr-lead">' + esc(g.blurb) + '</p>' +
      '<p class="small muted">' + g.phases.length + ' parts · tap the steps in order, answer the questions, and earn up to 3 stars.</p>' +
      '<p class="small cpr-note">This is practice for first-aid skills. To learn them for real, take a first-aid or Stop the Bleed class with a trained instructor.</p>' +
      '<div class="cpr-actions"><button class="btn" data-lab="quit">Close</button><button class="btn btn-primary btn-lg" data-lab="start" style="background:' + g.color + ';border-color:' + g.color + '">Start</button></div>';
  } else if (st.phase === 'result') {
    const r = st.result;
    body = '<h2 class="lab-title">' + (r.pass ? 'Skill complete!' : 'Keep practicing') + '</h2>' + art +
      '<div class="lab-stars" aria-label="' + r.stars + ' of 3 stars">' + [1, 2, 3].map(i => '<span class="' + (i <= r.stars ? 'on' : '') + '">★</span>').join('') + '</div>' +
      '<p class="lab-score"><b>' + r.score + '%</b> right on the first try' + (r.pass ? '' : ' · ' + PASS + '% needed to pass') + '</p>' +
      '<div class="lab-teach"><b>Remember</b><ul>' + g.teach.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul></div>' +
      '<div class="cpr-actions"><button class="btn" data-lab="retry">Try Again</button><button class="btn btn-primary btn-lg" data-lab="done">' + (o.caseTitle ? 'Back to the Patient' : 'Done') + '</button></div>';
  } else {
    body = dots() + '<div class="lab-ph-title">' + esc(ph.title || 'Question') + '</div>' + art;
    if (ph.type === 'order') {
      const fin = st.done >= ph.steps.length;
      body += '<p class="lab-prompt">' + esc(ph.prompt) + '</p>' +
        (st.done ? '<ol class="lab-done">' + ph.steps.slice(0, st.done).map(s => '<li>' + esc(s.t) + '</li>').join('') + '</ol>' : '') + msg +
        (fin ? '' : '<div class="lab-picks">' + st.pool.filter(i => i >= st.done).map(i => '<button class="lab-step' + (st.miss >= 2 && i === st.done ? ' hint' : '') + '" data-lab="pick" data-i="' + i + '">' + esc(ph.steps[i].t) + '</button>').join('') + '</div>') +
        (fin ? '<div class="cpr-actions"><button class="btn btn-primary btn-lg" data-lab="next">Next →</button></div>' : '');
    } else if (ph.type === 'quiz') {
      body += '<p class="lab-q">' + esc(ph.q) + '</p><div class="lab-opts">' + st.order.map(i => {
        const op = ph.opts[i], cls = st.picked === i ? (op.ok ? ' ok' : ' bad') : (st.phaseDone && op.ok ? ' ok' : '');
        return '<button class="lab-opt' + cls + '" data-lab="opt" data-i="' + i + '"' + (st.phaseDone ? ' disabled' : '') + '>' + esc(op.t) + '</button>';
      }).join('') + '</div>' + msg + (st.phaseDone ? '<div class="cpr-actions"><button class="btn btn-primary btn-lg" data-lab="next">Next →</button></div>' : '');
    } else if (ph.type === 'hold') {
      body += '<p class="lab-prompt">' + esc(ph.prompt) + '</p><div class="lab-hold-bar"><div class="lab-hold-fill" style="width:' + (100 * st.elapsed / ph.secs) + '%"></div></div><div class="lab-hold-time mono">' + Math.floor(st.elapsed) + ' / ' + ph.secs + ' ' + ph.unit + '</div>' + msg +
        (st.phaseDone ? '<div class="cpr-actions"><button class="btn btn-primary btn-lg" data-lab="next">Next →</button></div>' : '<button class="lab-hold" data-lab="hold" style="--c:' + g.color + '">Hold to ' + esc(ph.label) + '</button><p class="small muted" style="text-align:center;margin:0">Press and hold (or hold the space bar).</p>');
    } else if (ph.type === 'slider') {
      body += '<p class="lab-prompt">' + esc(ph.prompt) + '</p><div class="lab-slide"><span>Loose</span><input type="range" class="lab-slider" min="0" max="100" value="' + st.val + '" aria-label="Wrap tightness"' + (st.phaseDone ? ' disabled' : '') + '><span>Tight</span></div>' + msg +
        (st.phaseDone ? '<div class="cpr-actions"><button class="btn btn-primary btn-lg" data-lab="next">Next →</button></div>' : '<div class="cpr-actions"><button class="btn btn-primary" data-lab="slide-check">' + esc(ph.btn) + '</button></div>');
    }
    body += '<div class="lab-foot"><button class="btn btn-sm" data-lab="quit">Exit</button><span class="small muted">Score so far: ' + Math.round(st.pts) + ' / ' + st.max + '</span></div>';
  }
  st.root.innerHTML = '<div class="cpr-card lab-card">' + head + '<div class="cpr-body">' + body + '</div></div>';
  // No auto-focus after a hold: a held Space key would otherwise land on the new Next button.
  const f = st.phase === 'hold' ? null : st.root.querySelector('[data-lab="next"], [data-lab="start"], [data-lab="done"]'); if (f) f.focus();
}

/* ───────── Skills Lab page ───────── */
function view(S) {
  const best = (S.career && S.career.skills) || {};
  const passed = SKILLS.filter(s => (best[s.id] || 0) >= PASS).length;
  let h = '<div class="page-head"><div><h1>Skills Lab</h1><p>Practice real first-aid and safety skills step by step. Each skill you pass earns XP and a star rating — and you\'ll use them on real cases in the ER.</p></div></div>';
  h += '<div class="lab-progress panel"><b>' + passed + ' of ' + SKILLS.length + ' skills passed</b><div class="bar"><i style="width:' + Math.round(100 * passed / SKILLS.length) + '%"></i></div><span class="small muted">Pass all six to earn the Skills Lab Graduate medal.</span></div>';
  h += '<div class="lab-grid">' + SKILLS.map(s => {
    const b = best[s.id], stars = b == null ? 0 : b >= 100 ? 3 : b >= 85 ? 2 : b >= PASS ? 1 : 0;
    return '<button class="lab-tile" data-act="lab-open" data-skill="' + s.id + '" style="--c:' + s.color + '"><span class="lab-emoji">' + s.emoji + '</span><b>' + esc(s.name) + '</b><span class="small">' + esc(s.blurb) + '</span>' +
      '<span class="lab-tile-f"><span class="lab-stars sm">' + [1, 2, 3].map(i => '<span class="' + (i <= stars ? 'on' : '') + '">★</span>').join('') + '</span><span class="small muted">' + (b == null ? 'Not tried yet' : 'Best ' + b + '%') + '</span></span></button>';
  }).join('') +
    '<button class="lab-tile" data-act="cpr-practice" style="--c:#c62828"><span class="lab-emoji">💓</span><b>CPR Compressions</b><span class="small">Push at the right speed on the training mannequin.</span><span class="lab-tile-f"><span class="small muted">' + ((S.career || {}).cprBest ? 'Best ' + S.career.cprBest + '%' : 'Not tried yet') + '</span></span></button></div>';
  h += '<p class="small muted" style="margin-top:14px">Real skills are best learned hands-on. Ask about a first-aid, CPR or "Stop the Bleed" class for teens — many are run by the Red Cross, the American Heart Association and local hospitals.</p>';
  return h;
}
function passedCount(S) { const b = (S.career && S.career.skills) || {}; return SKILLS.filter(s => (b[s.id] || 0) >= PASS).length; }

window.LAB = { open: open, close: close, view: view, SKILLS: SKILLS, CASE_SKILLS: CASE_SKILLS, PASS: PASS, passedCount: passedCount, get active() { return !!st; } };
})();
