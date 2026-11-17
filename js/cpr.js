/* CPR rhythm mini-game: tap PUSH (or Space) at 100–120 compressions per minute.
   Used for Code Blue (cardiac arrest) in the game and for CPR Practice in Education. */
(function () {
'use strict';
const LO = 100, HI = 120, OK_LO = 95, OK_HI = 125, PER_ROUND = 30, ROUNDS = 2, PASS = 60;
let st = null;
const esc = window.UTIL.esc;

function open(opts) {
  close();
  const root = document.createElement('div'); root.id = 'cpr-root'; root.className = 'cpr-bg'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
  document.body.appendChild(root);
  st = { opts: opts || {}, root: root, phase: 'intro', taps: [], all: [], round: 1, attempt: 1, metro: true, metroTimer: null, idleTimer: null, msg: '' };
  draw();
  document.addEventListener('keydown', onKey, true);
  root.addEventListener('click', onClick);
}
function close() {
  if (!st) return;
  stopMetro(); clearTimeout(st.idleTimer);
  document.removeEventListener('keydown', onKey, true);
  if (st.root) st.root.remove();
  st = null;
}
function onKey(e) {
  if (!st) return;
  if ((e.code === 'Space' || e.key === ' ' || e.key === 'Enter') && st.phase === 'press') { e.preventDefault(); e.stopPropagation(); push(); }
  else if (e.key === 'Escape' && st.opts.practice) { e.preventDefault(); finishPractice(true); }
}
function onClick(e) {
  const b = e.target.closest('[data-cpr]'); if (!b) return;
  const a = b.getAttribute('data-cpr');
  if (a === 'start') { st.phase = 'press'; st.taps = []; st.round = 1; st.all = []; st.msg = ''; startMetro(); draw(); }
  else if (a === 'push') push();
  else if (a === 'metro') { st.metro = !st.metro; if (st.metro && st.phase === 'press') startMetro(); else stopMetro(); draw(); }
  else if (a === 'retry') { st.attempt++; st.phase = 'press'; st.taps = []; st.round = 1; st.all = []; st.msg = ''; startMetro(); draw(); }
  else if (a === 'done') { const r = st.result, cb = st.opts.onDone; close(); if (cb) cb(r); }
  else if (a === 'quit') finishPractice(true);
}
function finishPractice(quit) { const cb = st.opts.onDone, r = quit ? { quit: true } : st.result; close(); if (cb) cb(r); }

function startMetro() {
  stopMetro(); if (!st.metro) return;
  const beat = () => { if (!st) return; if (window.SND && SND.click) SND.click(); const d = st.root.querySelector('.cpr-metro-dot'); if (d) { d.classList.add('on'); setTimeout(() => d && d.classList.remove('on'), 90); } };
  st.metroTimer = setInterval(beat, 60000 / 110);
}
function stopMetro() { if (st && st.metroTimer) { clearInterval(st.metroTimer); st.metroTimer = null; } }

function rateNow() {
  const t = st.taps; if (t.length < 2) return 0;
  const n = Math.min(4, t.length - 1); return Math.round(60000 / ((t[t.length - 1] - t[t.length - 1 - n]) / n));
}
function push() {
  if (!st || st.phase !== 'press') return;
  const now = performance.now();
  if (st.taps.length) { const iv = now - st.taps[st.taps.length - 1]; if (iv < 120) return; st.all.push(60000 / iv); }
  st.taps.push(now);
  if (window.SND && SND.thump) SND.thump();
  clearTimeout(st.idleTimer);
  st.idleTimer = setTimeout(() => { if (st && st.phase === 'press') { st.msg = 'Keep going! Every pause stops blood flowing to the brain.'; updateLive(); } }, 2500);
  const r = rateNow();
  st.msg = !r ? 'Good start — keep a steady rhythm.' : r < OK_LO ? 'Push faster!' : r > OK_HI ? 'Slow down a little.' : 'Great rhythm — keep going!';
  const hands = st.root.querySelector('.cpr-hands'); if (hands) { hands.classList.add('down'); setTimeout(() => hands && hands.classList.remove('down'), 110); }
  if (st.taps.length >= PER_ROUND) {
    clearTimeout(st.idleTimer);
    if (st.round < ROUNDS) {
      st.phase = 'breaths'; stopMetro(); draw();
      setTimeout(() => { if (!st) return; st.round++; st.taps = []; st.phase = 'press'; st.msg = ''; startMetro(); draw(); }, 2200);
    } else score();
    return;
  }
  updateLive();
}
function score() {
  stopMetro();
  const good = st.all.filter(r => r >= OK_LO && r <= OK_HI).length, total = st.all.length || 1;
  const avg = Math.round(st.all.reduce((a, b) => a + b, 0) / total);
  const pct = Math.round(100 * good / total);
  const slow = st.all.filter(r => r < OK_LO).length, fast = st.all.filter(r => r > OK_HI).length;
  st.result = { pass: pct >= PASS, score: pct, avgRate: avg, slow: slow, fast: fast, compressions: st.all.length + ROUNDS, attempt: st.attempt };
  st.phase = 'result'; draw();
}
function gauge(r) {
  const min = 60, max = 160, pos = r ? Math.max(0, Math.min(100, (r - min) / (max - min) * 100)) : 0;
  const zl = (LO - min) / (max - min) * 100, zw = (HI - LO) / (max - min) * 100;
  return '<div class="cpr-gauge"><div class="cpr-zone" style="left:' + zl + '%;width:' + zw + '%"></div>' + (r ? '<i style="left:calc(' + pos + '% - 3px)"></i>' : '') +
    '<div class="cpr-scale"><span>60</span><span>100</span><span>120</span><span>160</span></div></div>';
}
function chest() {
  return '<svg class="cpr-chest" viewBox="0 0 200 150" aria-hidden="true">' +
    '<ellipse cx="100" cy="112" rx="88" ry="34" fill="#e9c7ab" stroke="#a97c5f"/><path d="M40 112 Q100 70 160 112" fill="none" stroke="#b98e72" stroke-width="2"/>' +
    '<rect x="94" y="88" width="12" height="32" rx="4" fill="#f4e7d7" opacity=".7"/>' +
    '<g class="cpr-hands"><path d="M70 20 L88 84 L112 84 L130 20 Z" fill="#1d5fbf" opacity=".9"/><ellipse cx="100" cy="88" rx="22" ry="9" fill="#e0b494" stroke="#a97c5f"/><ellipse cx="100" cy="82" rx="20" ry="8" fill="#e9c7ab" stroke="#a97c5f"/></g></svg>';
}
function updateLive() {
  if (!st) return;
  const r = rateNow(), cnt = st.root.querySelector('.cpr-count'), g = st.root.querySelector('.cpr-gauge-wrap'), m = st.root.querySelector('.cpr-msg'), rv = st.root.querySelector('.cpr-rate');
  if (cnt) cnt.textContent = st.taps.length + ' / ' + PER_ROUND;
  if (g) g.innerHTML = gauge(r);
  if (rv) { rv.textContent = r ? r + ' per min' : '—'; rv.className = 'cpr-rate ' + (!r ? '' : r < OK_LO ? 'slow' : r > OK_HI ? 'fast' : 'good'); }
  if (m) m.textContent = st.msg;
}
function draw() {
  if (!st) return;
  const o = st.opts, practice = !!o.practice;
  const head = '<div class="cpr-head ' + (practice ? 'practice' : 'code') + '">' + (practice ? 'CPR PRACTICE' : '<span class="dot"></span>CODE BLUE') + '<span>' + esc(o.title || '') + '</span></div>';
  let body = '';
  if (st.phase === 'intro') {
    body = '<p class="cpr-lead">' + (practice ? 'Practice the most important part of CPR: chest compressions at the right speed.' : 'The patient has no pulse. The team has started the resuscitation — you lead the chest compressions.') + '</p>' +
      '<ul class="cpr-tips"><li>Tap <b>PUSH</b> (or press the <b>space bar</b>) once for each compression.</li><li>Aim for <b>100–120 per minute</b> — about two pushes every second.</li><li>Do <b>2 rounds of 30</b>. The team gives breaths in between.</li><li>Keep a steady rhythm; don\'t stop. The metronome clicks at the right speed.</li></ul>' +
      (!practice && st.attempt === 1 ? '<p class="small cpr-note">Real CPR also means pushing hard (about 5 cm deep on an adult) and letting the chest rise back up — learn it hands-on in a certified CPR class.</p>' : '') +
      '<div class="cpr-actions">' + (practice ? '<button class="btn" data-cpr="quit">Close</button>' : '') + '<button class="btn btn-danger btn-lg" data-cpr="start">START COMPRESSIONS</button></div>';
  } else if (st.phase === 'press') {
    body = '<div class="cpr-round">Round ' + st.round + ' of ' + ROUNDS + (st.attempt > 1 ? ' · Attempt ' + st.attempt : '') + '</div>' + chest() +
      '<div class="cpr-live"><div><span class="small muted">Compressions</span><b class="cpr-count">' + st.taps.length + ' / ' + PER_ROUND + '</b></div><div><span class="small muted">Your speed</span><b class="cpr-rate">—</b></div>' +
      '<button class="cpr-metro" data-cpr="metro" title="Metronome on/off"><span class="cpr-metro-dot"></span>' + (st.metro ? 'Metronome On' : 'Metronome Off') + '</button></div>' +
      '<div class="cpr-gauge-wrap">' + gauge(0) + '</div><div class="cpr-msg" aria-live="polite">' + esc(st.msg || 'Start pushing!') + '</div>' +
      '<button class="cpr-push" data-cpr="push">PUSH</button>';
  } else if (st.phase === 'breaths') {
    body = '<div class="cpr-round">Round ' + st.round + ' done!</div>' + chest() + '<div class="cpr-breaths">The team is giving 2 rescue breaths… get ready for round ' + (st.round + 1) + '.</div>';
  } else if (st.phase === 'result') {
    const r = st.result, last = st.attempt >= (o.attempts || 1);
    const tip = r.slow > r.fast && r.slow > 3 ? 'You were often too slow — push a bit faster.' : r.fast > 3 ? 'You were often too fast — fast pushes don\'t let the heart refill. Slow down a little.' : 'Nice steady rhythm.';
    let verdict, actions;
    if (practice) {
      verdict = '<h3>' + r.score + '% at the right speed</h3><p>Average speed: <b>' + r.avgRate + ' per minute</b> (target 100–120). ' + tip + '</p>';
      actions = '<button class="btn" data-cpr="quit">Close</button><button class="btn btn-primary" data-cpr="retry">Try Again</button>';
      st.result.practice = true;
    } else if (r.pass) {
      verdict = '<h3 class="ok-t">Pulse is back! (ROSC)</h3><p>' + r.score + '% of compressions at the right speed (average ' + r.avgRate + ' per minute). Good CPR kept blood flowing until the heart restarted. The patient is still critical — continue emergency care.</p>';
      actions = '<button class="btn btn-primary btn-lg" data-cpr="done">Continue →</button>';
    } else if (!last) {
      verdict = '<h3 class="bad-t">No pulse yet</h3><p>Only ' + r.score + '% of compressions were at the right speed (average ' + r.avgRate + ' per minute). ' + tip + ' Keep going!</p>';
      actions = '<button class="btn btn-danger btn-lg" data-cpr="retry">KEEP GOING</button>';
    } else {
      verdict = '<h3>The patient could not be revived</h3><p>Despite the team\'s efforts, the heart did not restart. CPR is hard, and even with excellent CPR many patients cannot be saved. ' + tip + '</p>';
      actions = '<button class="btn btn-primary" data-cpr="done">Continue</button>';
    }
    body = '<div class="cpr-result">' + verdict + '</div><div class="cpr-actions">' + actions + '</div>';
  }
  st.root.innerHTML = '<div class="cpr-card">' + head + '<div class="cpr-body">' + body + '</div></div>';
  if (st.phase === 'press') updateLive();
  const btn = st.root.querySelector('.cpr-push, [data-cpr="start"], [data-cpr="retry"], [data-cpr="done"]'); if (btn) btn.focus();
}
window.CPR = { open: open, close: close, get active() { return !!st; } };
})();
