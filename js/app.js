/* ER Simulator — engine + UI. Educational fiction, not a medical tool. */
(function () {
'use strict';

/* ───────── Constants & helpers ───────── */
const LIB = window.CASE_LIBRARY || [];
const CASES = {}; LIB.forEach(c => { CASES[c.id] = c; });
function tcCases() {
  const t = window.tc;
  LIB.forEach(c => {
    ['title', 'suspected', 'finalDiagnosis'].forEach(k => { if (c[k]) c[k] = t(c[k]); });
    if (c.disposition && c.disposition.label) c.disposition.label = t(c.disposition.label);
    if (c.history) { ['pmh', 'meds'].forEach(k => { if (Array.isArray(c.history[k])) c.history[k] = c.history[k].map(t); }); }
    (c.decisions || []).concat(c.rescue ? [c.rescue] : []).forEach(d => { d.title = t(d.title); });
  });
}
const KEY = 'erSim.save.v1';
let activeKey = KEY; // switches to a per-player key while signed in
const VKEYS = ['hr', 'sbp', 'dbp', 'rr', 'spo2', 'temp'];
const RANK = { 'Discharged': -1, 'Stable': 0, 'Improving': 1, 'Needs Assessment': 2, 'Unstable': 3, 'Critical': 4, 'Deceased': 5 };
const SPECIALTIES = ['Cardiology', 'Respiratory', 'Neurology', 'Gastroenterology', 'Infectious Disease', 'Endocrinology', 'Trauma', 'Orthopedics', 'Pediatrics', 'Emergency Medicine'];
const DIFFS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const BEDS = ['Bay-1', 'Bay-2', 'Bay-3', 'Bay-4', 'Bay-5', 'Bay-6', 'Bay-8', 'Bay-9', 'Bay-10', 'Resus-1', 'Resus-3', 'Fast-Track-2', 'Fast-Track-3', 'Peds-1', 'Peds-2'];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const uid = () => Math.random().toString(36).slice(2, 10);
const LET = ['A', 'B', 'C', 'D'];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function fmtClock(m) { m = Math.floor(m); return pad(Math.floor((m % 1440) / 60)) + ':' + pad(m % 60); }
function fmtDay(m) { return 'Day ' + (Math.floor(m / 1440) + 1); }
function fmtDur(m) { m = Math.max(0, Math.round(m)); const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60; if (d) return d + 'd ' + h + 'h'; if (h) return h + 'h ' + pad(mm) + 'm'; return mm + 'm'; }
const SMALL = new Set(['a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'vs', 'as', 'but', 'nor', 'per', 'via', 'into']);
function tc(str) {
  if (str == null) return '';
  return String(str).split(' ').map((w, i, arr) => {
    if (!w || /[A-Z]/.test(w) || /^[\d(]*\d/.test(w)) return w;
    const bare = w.toLowerCase().replace(/[^a-z]/g, '');
    if (i > 0 && SMALL.has(bare) && !/[:—–]$/.test(arr[i - 1])) return w;
    return w.replace(/[a-z]/, ch => ch.toUpperCase());
  }).join(' ');
}
window.tc = tc;
function statusClass(s) { return 'st-' + String(s).split(' ')[0]; }

let S = null;
const ui = { route: { name: 'dash' }, selected: {}, recFilter: 'all', lib: { spec: '', diff: '' }, sort: 'priority', menu: null, modal: null, charts: {}, eduTopic: null, eduAnswers: {} };

/* ───────── Icons ───────── */
const IC = {
  Cardiology: '<path d="M12 20s-7-4.4-9-8.6A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 9 5.1C19 15.6 12 20 12 20z"/>',
  Respiratory: '<path d="M12 4v7m0 0c-1.5 0-3 1-3 3m3-3c1.5 0 3 1 3 3"/><path d="M9 8c-3 0-5 5-5 9 0 2 1 3 2.6 3S9 19 9 17z"/><path d="M15 8c3 0 5 5 5 9 0 2-1 3-2.6 3S15 19 15 17z"/>',
  Neurology: '<path d="M12 5.5a3 3 0 0 0-5.6-1A3 3 0 0 0 4 9a3 3 0 0 0 0 5 3 3 0 0 0 3 4.5 3 3 0 0 0 5 1z"/><path d="M12 5.5a3 3 0 0 1 5.6-1A3 3 0 0 1 20 9a3 3 0 0 1 0 5 3 3 0 0 1-3 4.5 3 3 0 0 1-5 1"/>',
  Gastroenterology: '<path d="M9 3v4c0 2-4 3-4 8a6 6 0 0 0 11 3c1-2 3-2 3-5s-3-4-5-3c-2 1-3-1-3-3V3"/>',
  'Infectious Disease': '<circle cx="12" cy="12" r="5"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  Endocrinology: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  Trauma: '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M10.5 10.5h.01M13.5 13.5h.01M13.5 10.5h.01M10.5 13.5h.01"/>',
  Orthopedics: '<path d="M8.5 6.5 17.5 15.5"/><circle cx="6.5" cy="5" r="2"/><circle cx="5" cy="7.5" r="2"/><circle cx="19" cy="16.5" r="2"/><circle cx="16.5" cy="19" r="2"/>',
  Pediatrics: '<circle cx="12" cy="6.5" r="3"/><path d="M6.5 21v-4.5a5.5 5.5 0 0 1 11 0V21"/>',
  'Emergency Medicine': '<path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  exit: '<path d="M14 4h5v16h-5"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
  chart: '<path d="M4 19V5M4 19h16"/><path d="M7 15l4-4 3 3 5-6"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  scan: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 12h8M8 15h5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  play: '<path d="M7 5l12 7-12 7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
  steth: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="12" r="2"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>',
  speaker: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  mute: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',
  body: '<circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v8M7 10h10M12 15l-3 6M12 15l3 6"/>',
  hourglass: '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>'
};
function icon(name, size) { size = size || 20; return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[name] || IC['Emergency Medicine']) + '</svg>'; }

/* ───────── Persistence ───────── */
function save() {
  S.savedAt = Date.now();
  try { localStorage.setItem(activeKey, JSON.stringify(S)); } catch (e) { /* storage unavailable */ }
  cloudSave();
}
/* Account save (when opened as a shared Claude artifact): one private document per viewer. */
let cloud = null, cloudTimer = null, bootFresh = false;
function cloudSave() {
  if (!cloud) return;
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(() => {
    try {
      const L = cloud.limit || 230000;
      let json = JSON.stringify(S);
      for (let i = (S.history || []).length - 1; i >= 1 && json.length > L; i--) { S.history[i].patients.forEach(ap => { if (ap.record && ap.record.length) { ap.record = []; ap.trimmed = true; } }); json = JSON.stringify(S); }
      if (json.length > L) { S.alerts = S.alerts.slice(0, 15); S.patients.forEach(p => { p.vh = p.vh.slice(-40); }); json = JSON.stringify(S); }
      if (json.length > L + 20000) { const keep = S.patients.filter(p => !isClosed(p)); json = JSON.stringify(Object.assign({}, S, { patients: keep })); }
      cloud.ref.set({ json: json, savedAt: S.savedAt || Date.now() }).then(() => { if (account && account.error) { account.error = ''; renderTop(); } }).catch(e => { if (account) { account.error = 'Not saving to your account right now (' + ((e && e.code) || 'error') + '). Your game is still saved on this device.'; renderTop(); } });
    } catch (e) { /* ignore */ }
  }, 1500);
}
async function initCloud() {
  try {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if (!db || !user) return;
    const id = await user.id(); if (!id) return;
    const ref = db.collection('data/users/' + id).doc('er-sim-save');
    const snap = await Promise.race([ref.get(), new Promise(r => setTimeout(() => r(null), 10000))]);
    if (!snap) return; // account copy unreadable right now: never overwrite it blind
    cloud = { ref: ref };
    if (snap.exists) {
      const d = snap.data() || {};
      const remote = JSON.parse(d.json || 'null');
      if (remote && remote.v === 1 && Array.isArray(remote.patients) && (bootFresh || (remote.savedAt || 0) > (S.savedAt || 0))) {
        remote.patients = remote.patients.filter(p => CASES[p.caseId]);
        S = remote; normalize();
        try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
        render();
        return;
      }
    }
    cloudSave();
  } catch (e) { /* account save unavailable: browser storage still works */ }
}
/* ───────── Username & password accounts (public website, via Firebase) ─────────
   Each player's save is one private document: saves/{uid}. Firestore security rules
   allow only approved player ids to read or write their own document. */
const FB_CONFIG = {
  apiKey: 'AIzaSyC6shByNnE4U4GIqAo0YaHewmHSuSf5onU',
  authDomain: 'riverside-er-sim.firebaseapp.com',
  projectId: 'riverside-er-sim',
  storageBucket: 'riverside-er-sim.firebasestorage.app',
  messagingSenderId: '1079386681301',
  appId: '1:1079386681301:web:ed30f3fa1dff2ee94cd75c'
};
const USER_DOMAIN = '@riverside-er-sim.invalid';
let fbAuth = null, fbDb = null, account = null;
function accountsAvailable() { return !!fbAuth; }
function hasProgress(s) {
  return !!s && ((s.stats && s.stats.correct + s.stats.incorrect > 0) || (s.history && s.history.length) || (s.career && s.career.correct + s.career.incorrect > 0) || (s.profile && s.profile.name));
}
function initAccounts() {
  try {
    if (window.claude || !window.firebase || typeof firebase.initializeApp !== 'function') return;
    if (!firebase.apps.length) firebase.initializeApp(FB_CONFIG);
    fbAuth = firebase.auth(); fbDb = firebase.firestore();
    fbAuth.onAuthStateChanged(u => {
      if (u) onSignedIn(u);
      else if (account) onSignedOut();
      else promptSignInOnce();
    });
  } catch (e) { fbAuth = null; }
}
function promptSignInOnce() {
  let seen = false;
  try { seen = sessionStorage.getItem('erSim.signinPrompted') === '1'; sessionStorage.setItem('erSim.signinPrompted', '1'); } catch (e) { }
  if (!seen && !ui.modal) { ui.modal = { type: 'signin' }; render(); }
}
async function onSignedIn(u) {
  const username = (u.email || '').replace(USER_DOMAIN, '');
  const cacheKey = KEY + '.' + u.uid;
  account = { uid: u.uid, username: username, error: '' };
  if (ui.modal && ui.modal.type === 'signin') ui.modal = null;
  ui.signin = null;
  const ref = fbDb.collection('saves').doc(u.uid);
  let remote = null;
  try {
    const snap = await ref.get();
    if (snap.exists) { const r = JSON.parse((snap.data() || {}).json || 'null'); if (r && r.v === 1 && Array.isArray(r.patients)) remote = r; }
  } catch (e) {
    account.error = (e && e.code === 'permission-denied') ? 'This account is not approved for saving yet. Ask a parent to finish setting it up.' : 'Could not reach your account right now. Your game is saved on this device and will sync later.';
  }
  const cached = load(cacheKey);
  let next = remote && cached ? ((cached.savedAt || 0) > (remote.savedAt || 0) ? cached : remote) : (remote || cached);
  cloud = null; activeKey = cacheKey;
  if (!next) {
    let migrated = false;
    try { migrated = localStorage.getItem(KEY + '.migrated') === '1'; } catch (e) { }
    if (!migrated && hasProgress(S)) { next = S; try { localStorage.setItem(KEY + '.migrated', '1'); } catch (e) { } }
    else { newState(); next = S; }
  }
  next.patients = next.patients.filter(p => CASES[p.caseId]);
  S = next; normalize();
  if (!account.error || account.error.indexOf('reach') >= 0) cloud = { ref: ref, limit: 900000 };
  save(); ui.keepScroll = false; go('#/');
}
function onSignedOut() {
  account = null; cloud = null; activeKey = KEY;
  S = load(KEY);
  if (!S) newState();
  normalize(); go('#/');
}
async function signOut() {
  try { if (cloud) { clearTimeout(cloudTimer); await cloud.ref.set({ json: JSON.stringify(S), savedAt: S.savedAt || Date.now() }); } } catch (e) { }
  try { await fbAuth.signOut(); } catch (e) { }
}
function signInError(code) {
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found' || code === 'auth/invalid-email') return 'That username or password isn\'t right. Check the spelling and try again.';
  if (code === 'auth/too-many-requests') return 'Too many tries. Wait a few minutes, then try again.';
  if (code === 'auth/network-request-failed') return 'Can\'t reach the internet right now. Check the connection and try again.';
  return 'Sign-in didn\'t work (' + (code || 'unknown error') + ').';
}
function doSignIn() {
  const uEl = document.getElementById('si-user'), pEl = document.getElementById('si-pass');
  const user = (uEl ? uEl.value : '').trim().toLowerCase(), pass = pEl ? pEl.value : '';
  ui.signin = { user: user, error: '', busy: true };
  if (!user || !pass) { ui.signin = { user: user, error: 'Enter your username and password.' }; renderModal(); return; }
  renderModal();
  const email = user.indexOf('@') >= 0 ? user : user + USER_DOMAIN;
  fbAuth.signInWithEmailAndPassword(email, pass).catch(err => { ui.signin = { user: user, error: signInError(err && err.code) }; renderModal(); });
}
function signinModalHtml() {
  const si = ui.signin || {};
  return '<div class="modal-h"><h2>Sign In</h2><button class="x" data-act="close" aria-label="Close">×</button></div><div class="modal-b">' +
    '<p class="small" style="margin-top:0">Sign in to save your game to your account, so it works on any device. No account? Ask a parent, or play as a guest (saves in this browser only).</p>' +
    '<div class="form-row"><label for="si-user">Username</label><input id="si-user" autocomplete="username" autocapitalize="none" spellcheck="false" value="' + esc(si.user || '') + '"></div>' +
    '<div class="form-row"><label for="si-pass">Password</label><input id="si-pass" type="password" autocomplete="current-password"></div>' +
    (si.error ? '<div class="qres bad" role="alert">' + esc(si.error) + '</div>' : '') + '</div>' +
    '<div class="modal-f"><button class="btn" data-act="close">Play as Guest</button><button class="btn btn-primary" data-act="signin-go"' + (si.busy ? ' disabled' : '') + '>' + (si.busy ? 'Signing In…' : 'Sign In') + '</button></div>';
}
function accountButton() {
  if (!accountsAvailable()) return '';
  if (!account) return '<button class="tb-btn" data-act="signin" title="Sign in to save to your account">' + icon('body', 16) + '<span class="lbl">Sign In</span></button>';
  return '<button class="tb-btn" data-act="menu-main" title="Signed in as ' + esc(account.username) + (account.error ? ' — ' + esc(account.error) : '') + '">' + icon('body', 16) + '<span class="lbl">' + esc(account.username) + (account.error ? ' ⚠' : '') + '</span></button>';
}

function load(key) {
  try {
    const raw = localStorage.getItem(key || KEY); if (!raw) return null;
    const s = JSON.parse(raw); if (!s || s.v !== 1 || !Array.isArray(s.patients)) return null;
    s.patients = s.patients.filter(p => CASES[p.caseId]);
    return s;
  } catch (e) { return null; }
}

/* ───────── Patient model ───────── */
function caseOf(p) { return CASES[p.caseId]; }
function cap(c) { return c.canDie ? 100 : (c.maxSeverity || 60); }
function finished(p) { return p.decisionIndex >= caseOf(p).decisions.length; }
function isClosed(p) { return p.outcome === 'discharged' || p.outcome === 'deceased'; }
function currentDecision(p) {
  const c = caseOf(p);
  if (isClosed(p)) return null;
  if (p.rescueActive) return c.rescue || window.GENERIC_RESCUE;
  return c.decisions[p.decisionIndex] || null;
}
function interpVitals(c, sev) {
  const t = clamp(sev / 90, 0, 1.15), o = {};
  VKEYS.forEach(k => { const a = c.vitals.stable[k], b = c.vitals.critical[k]; o[k] = a + (b - a) * t; });
  return o;
}
function vitalsAt(p, sev, clock) {
  if (p.outcome === 'deceased') return null;
  const c = caseOf(p), base = interpVitals(c, sev);
  const fade = p.offset ? clamp(1 - Math.abs(sev - p.offsetSev) / 35, 0, 1) : 0;
  const j = Math.sin(clock / 7 + p.num * 1.7) * (1 - fade);
  const v = {};
  VKEYS.forEach(k => { v[k] = base[k] + (p.offset ? p.offset[k] * fade : 0); });
  v.hr = Math.round(v.hr + j * 2); v.sbp = Math.round(v.sbp + j * 2); v.dbp = Math.round(v.dbp + j);
  v.rr = Math.round(v.rr); v.spo2 = Math.round(clamp(v.spo2, 50, 100)); v.temp = Math.round(v.temp * 10) / 10;
  return v;
}
function vitals(p) { return vitalsAt(p, p.severity, S.clock); }
function abnormal(k, v, age) {
  const kid = age < 12;
  switch (k) {
    case 'hr': return v > (kid ? 140 : 100) || v < (kid ? 70 : 50);
    case 'sbp': return v < (kid ? 80 : 90) || v > 170;
    case 'rr': return v > (kid ? 34 : 22) || v < 10;
    case 'spo2': return v < 94;
    case 'temp': return v >= 38 || v < 35.5;
  }
  return false;
}
function trendRate(p) {
  const c = caseOf(p); let r;
  if (p.trend && S.clock < p.trend.until) r = p.trend.rate;
  else if (finished(p) && !p.rescueActive) r = c.recoveredDrift != null ? c.recoveredDrift : -1;
  else {
    const d = c.decisions[p.decisionIndex];
    r = (d && d.drift != null) ? d.drift : c.drift;
    if (p.rescueActive) r = Math.max(r, 1) * 1.2;
  }
  if (p.severity >= 75 && r > 0 && !p.rescueActive) r *= 1.2;
  if (r > 0 && String(p.bed).indexOf('Hall') === 0) r *= 1.15;
  return r;
}
function computeStatus(p) {
  if (p.outcome === 'discharged') return 'Discharged';
  if (p.outcome === 'deceased') return 'Deceased';
  const s = p.severity;
  if (s >= 75) return 'Critical';
  if (s >= 50) return 'Unstable';
  if (!p.assessed && s >= 15) return 'Needs Assessment';
  if (s < 20) return 'Stable';
  if (trendRate(p) < 0) return 'Improving';
  return 'Needs Assessment';
}
function rec(p, type, text, extra) { p.record.push(Object.assign({ t: S.clock, type: type, text: text }, extra || {})); }
function addUpdate(p, text, kind) { p.updates.unshift({ t: S.clock, text: text, kind: kind || 'info' }); rec(p, 'update', text); }
function snapshot(p) {
  const v = vitals(p); if (!v) return;
  const last = p.vh[p.vh.length - 1];
  const pt = Object.assign({ t: S.clock, sev: Math.round(p.severity) }, v);
  if (last && last.t === S.clock) p.vh[p.vh.length - 1] = pt; else p.vh.push(pt);
  if (p.vh.length > 120) p.vh.shift();
}
function pickBed() {
  const used = new Set(S.patients.filter(p => !isClosed(p)).map(p => p.bed));
  return BEDS.find(b => !used.has(b)) || ('Hall-' + (used.size + 1));
}
function applyResults(p, r, prefix) {
  if (!r) return;
  (r.labs || []).forEach(l => { p.labs.push(Object.assign({ t: S.clock }, l)); rec(p, 'lab', l.name + ': ' + l.value + (l.flag ? ' (' + l.flag + ')' : '')); });
  (r.imaging || []).forEach(im => { p.imaging.push(Object.assign({ t: S.clock }, im)); rec(p, 'imaging', im.name + ' — ' + im.result); });
  if (r.update) addUpdate(p, (prefix || '') + r.update, 'result');
}

function createPatient(caseId, seed) {
  seed = seed || {};
  const c = CASES[caseId];
  const elapsed = seed.elapsedMinutes || 0;
  const startSev = seed.startSeverity != null ? seed.startSeverity : c.startSeverity;
  const p = {
    id: seed.id || uid(), num: seed.num != null ? seed.num : S.nextNum++, caseId: caseId,
    age: seed.age != null ? seed.age : c.age, sex: c.sex, bed: seed.bed || pickBed(),
    arrival: S.clock - elapsed, severity: startSev, decisionIndex: 0, assessed: false,
    trend: null, rescueActive: false, order: null, feedback: null, outcome: null, outcomeTime: null,
    labs: [], imaging: [], updates: [], record: [], log: [], vh: [], firedEvents: [],
    needsTriage: !!seed.generated, triageSev: startSev, orders: [], talkDone: false,
    mrn: seed.mrn || newMrn(), returning: !!seed.returning, prevNum: seed.prevNum || null,
    exam: {}, lastDecisionAt: null, offset: null, offsetSev: 0, seed: seed.keep ? seed : null, generated: !!seed.generated
  };
  const now = S.clock;
  // Original presentation
  S.clock = p.arrival;
  rec(p, 'presentation', c.presentation);
  const iv = vitalsAt(p, startSev, S.clock);
  p.initialVitals = iv;
  rec(p, 'vitals', 'Arrival vital signs: ' + vitalsText(iv));
  (c.initialLabs || []).forEach(l => { p.labs.push(Object.assign({ t: S.clock }, l)); rec(p, 'lab', l.name + ': ' + l.value); });
  (c.initialImaging || []).forEach(im => { p.imaging.push(Object.assign({ t: S.clock }, im)); rec(p, 'imaging', im.name + ' — ' + im.result); });
  addUpdate(p, 'Arrived in the Emergency Department. ' + c.chiefComplaint + '.', 'info');
  // Backfill decisions already completed before the shift
  const done = seed.decisionIndex || 0;
  for (let i = 0; i < done; i++) {
    S.clock = p.arrival + Math.round((elapsed - 10) * (i + 1) / (done + 1));
    const d = c.decisions[i], corr = d.options.find(o => o.correct);
    p.log.push({ t: S.clock, n: 'Decision ' + (i + 1), title: d.title, question: d.question, chosen: corr.text, correct: true, correctText: corr.text, pre: true });
    rec(p, 'decision', 'Decision ' + (i + 1) + ' — ' + d.title + ': Correct (completed before this shift)', { correct: true, detail: corr.text });
    rec(p, 'intervention', corr.text);
    applyResults(p, d.results);
  }
  p.decisionIndex = done; p.assessed = done > 0;
  (c.events || []).forEach((ev, i) => { if (ev.afterMinutes <= elapsed) p.firedEvents.push(i); });
  // Synthetic vitals history for already-present patients
  const sevNow = seed.severity != null ? seed.severity : startSev;
  if (elapsed > 0) {
    const n = 8;
    for (let k = n; k >= 1; k--) {
      const tt = now - Math.round(Math.min(elapsed, 240) * k / n);
      const sv = sevNow + (startSev - sevNow) * (k / n) * 0.8;
      const v = vitalsAt(p, sv, tt);
      p.vh.push(Object.assign({ t: tt, sev: Math.round(sv) }, v));
    }
  }
  S.clock = now;
  p.severity = sevNow;
  if (seed.vitals) {
    const base = interpVitals(c, p.severity);
    p.offset = {}; VKEYS.forEach(k => { p.offset[k] = (seed.vitals[k] != null ? seed.vitals[k] : base[k]) - base[k]; });
    p.offsetSev = p.severity;
  }
  (seed.labs || []).forEach(l => { p.labs.push(Object.assign({ t: S.clock }, l)); rec(p, 'lab', l.name + ': ' + l.value); });
  (seed.imaging || []).forEach(im => { p.imaging.push(Object.assign({ t: S.clock }, im)); rec(p, 'imaging', im.name + ' — ' + im.result); });
  if (seed.note) addUpdate(p, seed.note, 'info');
  if (seed.trend) p.trend = { rate: seed.trend.rate, until: S.clock + seed.trend.minutes };
  if (done > 0) p.lastDecisionAt = S.clock - 10;
  p.status = computeStatus(p);
  p.lastAlertSev = p.severity;
  p.alertVitals = vitals(p);
  rec(p, 'status', 'Status: ' + p.status);
  snapshot(p);
  return p;
}
function newMrn() { return 'MRN-' + Math.floor(100000 + Math.random() * 899999); }
/* Temperature units: data stays in °C; display converts when the player picks °F. */
function useF() { return !!(S && S.settings && S.settings.tempUnit === 'F'); }
function cToF(c) { return Math.round((c * 9 / 5 + 32) * 10) / 10; }
function fmtTemp(c) { return (useF() ? cToF(c) : +c).toFixed(1); }
function tUnit() { return useF() ? '°F' : '°C'; }
function convTemps(html) {
  if (!useF()) return html;
  const conv = n => { n = +n; return n < 25 ? Math.round(n * 1.8 * 10) / 10 : cToF(n); }; // small numbers are temperature changes, not temperatures
  return html
    .replace(/(\d+(?:\.\d+)?)\s?[–-]\s?(\d+(?:\.\d+)?)\s?°\s?C\b/g, (m, a, b) => conv(a) + '–' + conv(b) + ' °F')
    .replace(/(\d+(?:\.\d+)?)(\s?)°\s?C\b/g, (m, a, sp) => conv(a) + sp + '°F');
}
function vitalsText(v) { if (!v) return '—'; return 'HR ' + v.hr + ', BP ' + v.sbp + '/' + v.dbp + ', RR ' + v.rr + ', SpO₂ ' + v.spo2 + '%, Temp ' + v.temp.toFixed(1) + '°C'; }

function newState() {
  S = { v: 1, clock: 14 * 60, patients: [], alerts: [], nextNum: 1, lastRoom: null,
    settings: { live: false, arrivals: false, sound: true, arrivalEvery: 90 }, nextArrival: 14 * 60 + 90,
    stats: { correct: 0, incorrect: 0 }, edu: { completed: {} }, created: Date.now() };
  (window.INITIAL_PATIENTS || []).forEach(seed => { S.patients.push(createPatient(seed.caseId, Object.assign({ keep: true }, seed))); });
  S.nextNum = Math.max(0, ...S.patients.map(p => p.num)) + 1;
  save();
}

/* ───────── Alerts ───────── */
function raiseAlert(p, kind, text, level) {
  const inRoom = ui.route.name === 'room' && ui.route.id === p.id;
  S.alerts.unshift({ id: uid(), pid: p.id, num: p.num, t: S.clock, kind: kind, text: text, status: level || p.status, read: inRoom });
  if (S.alerts.length > 80) S.alerts.length = 80;
  rec(p, 'alert', kind + ': ' + text);
  if (!inRoom) ui.beep = true;
}
function changeText(p) {
  const a = p.alertVitals, b = vitals(p); if (!a || !b) return '';
  const parts = [];
  if (Math.abs(b.hr - a.hr) >= 5) parts.push('HR ' + a.hr + '→' + b.hr);
  if (Math.abs(b.sbp - a.sbp) >= 5) parts.push('BP ' + a.sbp + '/' + a.dbp + '→' + b.sbp + '/' + b.dbp);
  if (Math.abs(b.spo2 - a.spo2) >= 2) parts.push('SpO₂ ' + a.spo2 + '→' + b.spo2 + '%');
  if (Math.abs(b.rr - a.rr) >= 3) parts.push('RR ' + a.rr + '→' + b.rr);
  if (Math.abs(b.temp - a.temp) >= 0.5) parts.push('Temp ' + a.temp + '°C→' + b.temp + '°C');
  return parts.length ? ' Changes: ' + parts.join(', ') + '.' : '';
}
function updateStatus(p) {
  const ns = computeStatus(p);
  if (ns !== p.status) {
    const worse = RANK[ns] > RANK[p.status];
    rec(p, 'status', 'Status changed: ' + p.status + ' → ' + ns);
    const old = p.status; p.status = ns;
    if (worse && ns !== 'Deceased' && !(old === 'Improving' && ns === 'Needs Assessment')) {
      raiseAlert(p, ns === 'Critical' ? 'EMERGENCY' : 'Deteriorating', 'Patient ' + p.num + ' is deteriorating (' + old + ' → ' + ns + ').' + changeText(p) + ' Return to their treatment room for urgent reassessment.', ns);
      p.lastAlertSev = p.severity; p.alertVitals = vitals(p);
    }
  } else if (p.severity - p.lastAlertSev >= 12 && trendRate(p) > 0) {
    raiseAlert(p, 'Deteriorating', 'Patient ' + p.num + ' is getting worse (still ' + ns + ').' + changeText(p) + ' Consider reassessing soon.', ns);
    p.lastAlertSev = p.severity; p.alertVitals = vitals(p);
  }
}
function die(p) {
  S.career.deaths++;
  p.outcome = 'deceased'; p.outcomeTime = S.clock; p.rescueActive = false; p.feedback = p.feedback || null;
  rec(p, 'status', 'Status changed: ' + p.status + ' → Deceased');
  p.status = 'Deceased';
  rec(p, 'outcome', 'Despite the resuscitation team\'s efforts, the patient died at ' + fmtClock(S.clock) + '. The family was supported by the care team.');
  raiseAlert(p, 'Patient died', 'Patient ' + p.num + ' has died despite resuscitation efforts. Their record contains a debrief of the case.', 'Deceased');
}

/* ───────── Time engine ───────── */
function tickPatient(p, step) {
  const c = caseOf(p);
  p.severity = clamp(p.severity + trendRate(p) * step / 10, 0, cap(c));
  p.lastAlertSev = Math.min(p.lastAlertSev, p.severity);
  (c.events || []).forEach((ev, i) => {
    if (p.firedEvents.indexOf(i) < 0 && !finished(p) && (S.clock - p.arrival) >= ev.afterMinutes) {
      p.firedEvents.push(i);
      p.severity = clamp(p.severity + (ev.effect || 0), 0, cap(c));
      addUpdate(p, ev.text, 'event');
      raiseAlert(p, 'Clinical event', 'Patient ' + p.num + ': ' + ev.text, computeStatus(p));
    }
  });
  if (c.canDie && p.severity >= 100) { die(p); return; }
  if (c.canDie && p.severity >= 75 && !p.rescueActive) {
    p.rescueActive = true; p.order = null; ui.selected[p.id] = null;
    addUpdate(p, 'Condition critical — EMERGENCY INTERVENTION REQUIRED.', 'critical');
  }
  updateStatus(p);
}
function advanceTime(mins, reason) {
  if (mins <= 0) return;
  let left = mins;
  while (left > 0) {
    const step = Math.min(5, left); left -= step; S.clock += step;
    S.patients.forEach(p => { if (!isClosed(p)) tickPatient(p, step); });
    if (S.clock % 10 === 0) S.patients.forEach(p => { if (!isClosed(p)) snapshot(p); });
    deliverOrders();
    if (S.settings.busy && S.clock >= (S.nextEventAt || 0)) { S.nextEventAt = S.clock + 150 + Math.round(Math.random() * 90); triggerShiftEvent(); }
    if ((S.settings.arrivals || S.settings.busy) && S.clock >= S.nextArrival) {
      S.nextArrival = S.clock + (S.settings.arrivalEvery || 90);
      if (S.patients.filter(p => !isClosed(p)).length < 8) { const back = returnCandidates(); if (back.length && Math.random() < 0.3) returnVisit(back[Math.floor(Math.random() * back.length)], true); else admitRandom(true); }
    }
  }
  S.patients.forEach(p => { if (!isClosed(p)) snapshot(p); });
}
function admitRandom(byAmbulance, filter) {
  filter = filter || {};
  let pool = LIB.filter(c => (!filter.spec || c.specialty === filter.spec) && (!filter.diff || c.difficulty === filter.diff));
  if (!pool.length) return null;
  const active = new Set(S.patients.filter(p => !isClosed(p)).map(p => p.caseId));
  const fresh = pool.filter(c => !active.has(c.id)); if (fresh.length) pool = fresh;
  const c = pool[Math.floor(Math.random() * pool.length)];
  return admitCase(c.id, byAmbulance);
}
function admitCase(caseId, byAmbulance) {
  const c = CASES[caseId];
  let age = c.age;
  if (age >= 18) age = clamp(age + Math.round(Math.random() * 10 - 5), 18, 95);
  else if (age >= 3) age = clamp(age + Math.round(Math.random() * 2 - 1), 3, 17);
  const p = createPatient(caseId, { age: age, generated: true, startSeverity: clamp(c.startSeverity + Math.round(Math.random() * 6 - 3), 5, 90) });
  S.patients.push(p);
  const alertP = p;
  S.alerts.unshift({ id: uid(), pid: alertP.id, num: alertP.num, t: S.clock, kind: byAmbulance ? 'New ambulance arrival' : 'New patient', text: 'Patient ' + p.num + ' (' + p.age + p.sex + ') has arrived in ' + p.bed + ': ' + c.chiefComplaint + '. Status: ' + p.status + '.', status: p.status, read: !byAmbulance });
  if (byAmbulance) ui.beep = true;
  return p;
}

/* ───────── Physical examination (body diagram) ───────── */
const REGIONS = { head: 'Head & Mental Status', neck: 'Neck & Airway', heart: 'Heart', lungs: 'Lungs & Chest', abdomen: 'Abdomen', pelvis: 'Pelvis & Hips', armR: 'Right Arm & Hand', armL: 'Left Arm & Hand', legR: 'Right Leg & Foot', legL: 'Left Leg & Foot', skin: 'Skin & General Appearance' };
const TOOLS = { head: 'Neuro Check & Penlight', neck: 'Look & Feel', heart: 'Stethoscope', lungs: 'Stethoscope', abdomen: 'Palpation & Stethoscope', pelvis: 'Palpation & Movement', armR: 'Neurovascular Check', armL: 'Neurovascular Check', legR: 'Neurovascular Check', legL: 'Neurovascular Check', skin: 'Look & Touch' };
const SOUND_NAMES = { 'breath-normal': 'Normal Breath Sounds', wheeze: 'Wheezing', crackles: 'Crackles', diminished: 'Quiet (Diminished) Breath Sounds', stridor: 'Stridor', 'heart-normal': 'Normal Heart Sounds', 'heart-fast': 'Fast Heartbeat', 'heart-irregular': 'Irregular Heartbeat', murmur: 'Heart Murmur', 'bowel-normal': 'Normal Bowel Sounds', 'bowel-quiet': 'Quiet Bowel Sounds', 'bowel-active': 'Very Active Bowel Sounds' };
function genericFinding(region, v, p) {
  const hr = v.hr || 80, kid = p.age < 12;
  const fastHr = hr > (kid ? 140 : 110), lowO2 = (v.spo2 || 99) < 92, fastRr = (v.rr || 16) > (kid ? 34 : 24), lowBp = (v.sbp || 120) < (kid ? 80 : 90), fever = (v.temp || 37) >= 38;
  switch (region) {
    case 'head': return p.severity >= 75 ? { finding: 'Drowsy; opens eyes to voice and answers slowly. Pupils equal and reacting to light.', abnormal: true } : { finding: 'Awake, alert and talking normally. Pupils equal and reacting to light.', abnormal: false };
    case 'neck': return { finding: 'Airway clear and the patient can speak. Neck soft and moves freely. Neck veins not swollen.', abnormal: false };
    case 'heart': return fastHr ? { finding: 'Fast but regular heartbeat (tachycardia). No murmurs heard.', abnormal: true, sound: 'heart-fast' } : { finding: 'Regular heartbeat with normal heart sounds. No murmurs.', abnormal: false, sound: 'heart-normal' };
    case 'lungs': return (lowO2 || fastRr) ? { finding: 'Breathing fast with extra effort. Breath sounds heard on both sides.', abnormal: true, sound: 'breath-normal' } : { finding: 'Breathing comfortably. Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' };
    case 'abdomen': return { finding: 'Soft and not tender when pressed. Normal bowel sounds.', abnormal: false, sound: 'bowel-normal' };
    case 'pelvis': return { finding: 'Hips move normally without pain. No tenderness over the bladder.', abnormal: false };
    case 'armR': case 'armL': return { finding: 'Normal appearance. Moves freely; pulse, feeling and strength are normal.', abnormal: false };
    case 'legR': case 'legL': return { finding: 'No swelling or tenderness. Pulses, feeling and movement are normal.', abnormal: false };
    case 'skin':
      if (lowBp) return { finding: 'Pale, cool and clammy skin. Capillary refill is slow (over 3 seconds) — a sign of poor circulation.', abnormal: true };
      if (fever) return { finding: 'Skin warm and flushed from fever. No rash. Capillary refill under 2 seconds.', abnormal: true };
      return { finding: 'Normal color, warm, no rashes. Capillary refill under 2 seconds.', abnormal: false };
  }
  return { finding: 'No abnormality found.', abnormal: false };
}
function examFinding(p, region) {
  const data = (window.EXAM_DATA || {})[p.caseId] || {}, r = data[region], v = vitals(p) || {};
  if (!r) return genericFinding(region, v, p);
  let out = { finding: r.finding, abnormal: !!r.abnormal, sound: r.sound || null };
  (r.stages || []).forEach(st => { if (p.decisionIndex >= st.from) out = { finding: st.finding, abnormal: st.abnormal != null ? !!st.abnormal : out.abnormal, sound: st.sound || out.sound }; });
  if (region === 'head' && p.severity >= 75) out = { finding: out.finding + ' The patient is now drowsy and looks critically unwell.', abnormal: true, sound: out.sound };
  if (region === 'skin' && !r.stages && (v.sbp || 120) < (p.age < 12 ? 80 : 90) && out.finding.indexOf('clammy') < 0) out = { finding: out.finding + ' Skin is now cool and clammy with slow capillary refill.', abnormal: true, sound: out.sound };
  return out;
}
function keyRegions(p) { const d = (window.EXAM_DATA || {})[p.caseId] || {}; return Object.keys(d).filter(k => d[k].key && REGIONS[k]); }
function examCheck(p) {
  const keys = keyRegions(p), ex = p.exam || {}, done = keys.filter(k => ex[k]).length;
  return { label: 'Key body areas examined', pass: done === keys.length, detail: done + ' of ' + keys.length + ' important body areas examined. Use the body diagram to investigate the patient.' };
}
function examine(p, region) {
  advanceTime(1);
  const f = examFinding(p, region);
  p.exam = p.exam || {};
  p.exam[region] = { t: S.clock, finding: f.finding, abnormal: f.abnormal, sound: f.sound || null };
  S.career.exams++;
  rec(p, 'exam', REGIONS[region] + ': ' + f.finding + (f.abnormal ? ' [Abnormal]' : ''));
  if (f.sound && window.SND && S.settings.soundOn !== false) SND.exam(f.sound, (vitals(p) || {}).hr);
}
function clickRegion(p, region) {
  ui.examSel = ui.examSel || {};
  ui.examSel[p.id] = region;
  const prev = (p.exam || {})[region];
  if (!isClosed(p) && (!prev || examFinding(p, region).finding !== prev.finding)) examine(p, region);
  save(); ui.keepScroll = true; render();
}
function bodySvg(p) {
  const ex = p.exam || {}, sel = (ui.examSel || {})[p.id];
  const cls = k => {
    let c = 'rg';
    if (ex[k]) c += ex[k].abnormal ? ' rg-abn' : ' rg-ok';
    if (ex[k] && !isClosed(p) && examFinding(p, k).finding !== ex[k].finding) c += ' rg-stale';
    if (sel === k) c += ' rg-sel';
    return c;
  };
  const region = (k, shape) => '<g class="' + cls(k) + '" data-exam="' + k + '" data-id="' + p.id + '" role="button" tabindex="0" aria-label="Examine ' + REGIONS[k] + '"><title>' + REGIONS[k] + '</title>' + shape + '</g>';
  return window.BODY.svg(ui.bodyLayer || 'skin', region);
}
function layerBar() {
  const L = ui.bodyLayer || 'skin';
  return '<div class="layers" role="tablist" aria-label="Body layer">' + [['skin', 'Skin'], ['organs', 'Organs'], ['bones', 'Bones']].map(x => '<button role="tab" aria-selected="' + (L === x[0]) + '" class="' + (L === x[0] ? 'on' : '') + '" data-act="layer" data-layer="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>';
}
function examPanel(p) {
  const ex = p.exam || {}, sel = (ui.examSel || {})[p.id], n = Object.keys(ex).length;
  let det;
  if (sel && ex[sel]) {
    const e = ex[sel], stale = !isClosed(p) && examFinding(p, sel).finding !== e.finding;
    det = '<div class="exam-detail"><div class="row" style="justify-content:space-between"><h3>' + REGIONS[sel] + '</h3><span class="badge ' + (e.abnormal ? 'st-Critical' : 'st-Stable') + '">' + (e.abnormal ? 'Abnormal' : 'Normal') + '</span></div>' +
      '<div class="small muted">' + TOOLS[sel] + ' · Examined at ' + fmtClock(e.t) + '</div><p class="exam-find">' + esc(e.finding) + '</p>' +
      (e.sound ? '<button class="btn btn-sm" data-listen="' + e.sound + '" data-id="' + p.id + '">' + icon('speaker', 16) + 'Listen: ' + SOUND_NAMES[e.sound] + '</button>' : '') +
      (stale ? '<div class="exam-stale">' + icon('refresh', 16) + 'The patient has changed since this exam. <button class="btn btn-sm" data-exam="' + sel + '" data-id="' + p.id + '">Examine Again (+1 Min)</button></div>' : '') + '</div>';
  } else {
    det = '<div class="exam-detail"><h3>Investigate the Patient</h3><p class="small">Click any body area to examine it. Each exam takes <b>1 simulated minute</b>. Heart, lung and abdomen exams use the stethoscope — turn your sound on to hear them.</p>' +
      '<div class="legend"><span><i class="lg-un"></i>Not Examined</span><span><i class="lg-ok"></i>Normal</span><span><i class="lg-abn"></i>Abnormal</span><span><i class="lg-stale"></i>Changed — Re-Examine</span></div></div>';
  }
  const list = Object.keys(REGIONS).filter(k => ex[k]).map(k => '<li class="' + (ex[k].abnormal ? 'abn' : 'ok') + '" data-exam="' + k + '" data-id="' + p.id + '"><b>' + REGIONS[k] + ':</b> ' + esc(ex[k].finding) + '</li>').join('');
  return '<div class="panel-title">' + icon('body', 18) + 'Physical Examination<span class="exam-count">' + n + ' of ' + Object.keys(REGIONS).length + ' Areas Examined</span></div>' +
    '<div class="exam-wrap"><div class="body-wrap">' + layerBar() + bodySvg(p) + '<button class="btn btn-sm' + (ex.skin ? (ex.skin.abnormal ? ' sk-abn' : ' sk-ok') : '') + '" data-exam="skin" data-id="' + p.id + '">' + icon('eye', 16) + 'Skin & General Appearance</button><div class="small muted" style="text-align:center">R = Patient\'s Right</div></div>' + det + '</div>' +
    (list ? '<details class="exam-log"' + (n <= 4 ? ' open' : '') + '><summary>Examination Findings (' + n + ')</summary><ul>' + list + '</ul></details>' : '');
}

/* ───────── Ordering tests, reading images, conversations, triage, shift events ───────── */
function extrasOf(p) { return (window.CASE_EXTRAS || {})[p.caseId] || {}; }
function testEntry(p, id) {
  const e = (extrasOf(p).tests || {})[id]; if (!e) return null;
  let out = Object.assign({}, e);
  (e.stages || []).forEach(st => { if (p.decisionIndex >= st.from) out = Object.assign({}, out, st); });
  return out;
}
function eventActive(k) { return !!(S.events && S.events[k] && S.clock < S.events[k]); }
function orderTest(p, id) {
  const T = window.CLIN && CLIN.TESTS[id]; if (!T || isClosed(p)) return;
  if (T.scanner === 'ct' && eventActive('ctDown')) { ui.orderMsg = { pid: p.id, text: 'The CT scanner is down until ' + fmtClock(S.events.ctDown) + '. Choose another test or come back later.' }; return; }
  p.orders = p.orders || [];
  if (p.orders.some(o => o.test === id && !o.done)) return;
  let mins = T.minutes; if (CLIN.isLab(id) && eventActive('labSlow')) mins *= 2;
  const e = (extrasOf(p).tests || {})[id], useful = !!(e && e.useful);
  p.orders.push({ id: uid(), test: id, at: S.clock, readyAt: S.clock + 1 + mins, done: false, useful: useful });
  S.career[useful ? 'goodTests' : 'extraTests'] = (S.career[useful ? 'goodTests' : 'extraTests'] || 0) + 1;
  rec(p, 'order', 'Ordered ' + T.name + ' (results in about ' + mins + ' min).');
  ui.orderMsg = null;
  advanceTime(1);
}
function deliverOrders() {
  S.patients.forEach(p => {
    if (isClosed(p) || !p.orders) return;
    p.orders.forEach(o => { if (!o.done && S.clock >= o.readyAt) { o.done = true; deliverResult(p, o); } });
  });
}
function deliverResult(p, o) {
  const T = CLIN.TESTS[o.test], e = testEntry(p, o.test), v = vitals(p) || {};
  // A test marked 'not needed' without its own result must not show a made-up normal value that could contradict the case.
  const r = (e && (e.results || e.report)) ? e
    : (e && e.useful === false) ? (CLIN.isLab(o.test) ? { results: [{ name: T.name, value: 'Not helpful for this patient\'s problem', flag: '', ref: '' }] } : { report: 'No findings that help with this patient\'s problem.' })
    : CLIN.normalResult(o.test, p, v);
  const note = (e && e.useful === false && e.why) ? e.why : (!e ? "This test probably wasn't needed for this patient's problem." : '');
  o.note = note;
  if (r.results) r.results.forEach(l => { p.labs.push(Object.assign({ t: S.clock }, l)); rec(p, 'lab', l.name + ': ' + l.value + (l.flag ? ' (' + l.flag + ')' : '')); });
  else {
    const image = r.image || (e && e.image) || null;
    p.imaging.push({ t: S.clock, name: T.name, result: r.report, image: image, readState: image ? 'pending' : null, readQ: image ? CLIN.readOptions(image) : null });
    rec(p, 'imaging', T.name + ' — ' + r.report);
  }
  addUpdate(p, T.name + ' result is back.' + (note ? ' Note: ' + note : ''), note ? 'info' : 'result');
  const inRoom = ui.route.name === 'room' && ui.route.id === p.id;
  S.alerts.unshift({ id: uid(), pid: p.id, num: p.num, t: S.clock, kind: 'Results ready', text: T.name + ' results are ready for Patient ' + p.num + '.', status: p.status, read: inRoom, quiet: true });
}
function submitRead(p, idx, choiceIdx) {
  const im = p.imaging[idx]; if (!im || im.readState !== 'pending' || !im.readQ) return;
  const choice = im.readQ.options[choiceIdx], ok = choice === im.readQ.answer;
  im.readState = 'done'; im.readChoice = choice; im.readOk = ok;
  S.career.reads = (S.career.reads || 0) + 1; if (ok) S.career.readsOk = (S.career.readsOk || 0) + 1;
  rec(p, 'imaging', 'You read the ' + im.name + ': "' + choice + '" — ' + (ok ? 'correct.' : 'not quite. It showed: ' + im.readQ.answer + '.'));
}
function ordersPanel(p) {
  if (!window.CLIN || isClosed(p)) return '';
  const T = CLIN.TESTS, orders = p.orders || [];
  const pend = orders.filter(o => !o.done);
  const group = g => Object.keys(T).filter(k => T[k].group === g).map(k => {
    const busy = pend.some(o => o.test === k), down = T[k].scanner === 'ct' && eventActive('ctDown');
    return '<button class="order-btn' + (busy ? ' busy' : '') + '" data-order="' + k + '" data-id="' + p.id + '"' + (busy ? ' disabled' : '') + ' title="Results in about ' + T[k].minutes + ' min' + (T[k].radiation === 'high' ? ' · higher radiation' : '') + '">' + esc(T[k].name) + (T[k].radiation === 'high' ? ' <span class="rad" title="Higher radiation">☢</span>' : '') + (down ? ' <span class="small">(down)</span>' : '') + '</button>';
  }).join('');
  const msg = ui.orderMsg && ui.orderMsg.pid === p.id ? '<div class="qres bad">' + esc(ui.orderMsg.text) + '</div>' : '';
  return '<details class="orders"' + (ui.ordersOpen ? ' open' : '') + '><summary data-act="orders-toggle">' + icon('flask', 18) + '<b>Order Tests</b><span class="small muted">' + (pend.length ? pend.length + ' pending' : 'choose what you need — each takes real time') + '</span></summary>' + msg +
    '<div class="order-grp"><div class="order-h">Labs</div>' + group('Labs') + '</div><div class="order-grp"><div class="order-h">Heart &amp; Imaging</div>' + group('Heart & Imaging') + '</div></details>' +
    (pend.length ? '<div class="pending">' + pend.map(o => '<span class="pend"><span class="dot"></span>' + esc(T[o.test].name) + ' · ready ' + fmtClock(o.readyAt) + '</span>').join('') + '</div>' : '');
}
function imagingCard(p, im, idx) {
  const hr = (vitals(p) || {}).hr;
  if (!im.image || !window.CLIN) return '<div class="img-card"><div class="img-thumb">' + imgThumb(im.name) + '</div><div><b>' + esc(tc(im.name)) + '</b> <span class="mono small muted">' + fmtClock(im.t) + '</span><p>' + esc(im.result) + '</p></div></div>';
  const pic = '<div class="read-img">' + CLIN.drawImage(im.image, hr) + '</div>';
  const head = '<b>' + esc(tc(im.name)) + '</b> <span class="mono small muted">' + fmtClock(im.t) + '</span>';
  if (im.readState === 'pending' && im.readQ) {
    const isX = CLIN.IMAGES[im.image].kind !== 'ecg';
    return '<div class="img-card read"><div class="read-body">' + head + pic + '<div class="read-q"><b>Read it yourself first:</b> what does this ' + (isX ? 'X-ray' : 'ECG') + ' show?' + (isX ? ' <span class="small muted">(On X-rays, the patient\'s right side is on your left — marked R.)</span>' : '') + '</div>' +
      '<div class="read-opts">' + im.readQ.options.map((o, i) => '<button class="btn btn-sm" data-read="' + idx + '" data-choice="' + i + '" data-id="' + p.id + '">' + esc(o) + '</button>').join('') + '</div></div></div>';
  }
  return '<div class="img-card read"><div class="read-body">' + head + pic + (im.readState === 'done' ? '<div class="qres ' + (im.readOk ? 'good' : 'bad') + '">' + (im.readOk ? '✓ You read it correctly: ' : '✗ You said "' + esc(im.readChoice) + '". It shows: ') + esc(im.readQ.answer) + '.</div>' : '') + '<p><b>Report:</b> ' + esc(im.result) + '</p></div></div>';
}
/* Conversations */
function talkDue(p) { const t = extrasOf(p).talk; return !!(t && !p.talkDone && !isClosed(p) && !p.rescueActive && !p.feedback && !p.needsTriage && p.decisionIndex >= t.afterDecision); }
function talkPanel(p) {
  const t = extrasOf(p).talk; p.talkOrder = p.talkOrder || shuffle([0, 1, 2, 3]);
  const sel = (ui.talkSel || {})[p.id];
  return '<div class="dec"><div class="dec-head"><div><div class="dec-step">Conversation · Bedside Manner</div><h2>' + esc(tc(t.title)) + '</h2></div><span class="small muted">' + icon('clock', 14) + ' takes ~5 sim min</span></div>' +
    '<div class="findings talk-sit"><b>' + esc(t.who) + ':</b> ' + esc(t.situation) + '</div><div class="question">' + esc(t.question) + '</div>' +
    '<div class="opts">' + p.talkOrder.map((oi, pos) => '<button class="opt' + (sel === oi ? ' sel' : '') + '" data-act="talk-pick" data-i="' + oi + '" data-id="' + p.id + '"><span class="L">' + LET[pos] + '</span><span>' + esc(t.options[oi].text) + '</span></button>').join('') + '</div>' +
    '<div class="submit-row"><span class="small muted">How you talk to patients and families matters as much as the medicine.</span><button class="btn btn-blue btn-lg" data-act="talk-submit" data-id="' + p.id + '"' + (sel == null ? ' disabled' : '') + '>SUBMIT RESPONSE</button></div></div>';
}
function submitTalk(p) {
  const t = extrasOf(p).talk, i = (ui.talkSel || {})[p.id]; if (!t || i == null) return;
  const opt = t.options[i], best = t.options.find(o => o.correct);
  p.talkDone = true; ui.talkSel[p.id] = null;
  S.career.talks = (S.career.talks || 0) + 1; if (opt.correct) S.career.talkOk = (S.career.talkOk || 0) + 1;
  p.log.push({ t: S.clock, n: 'Conversation', title: t.title, question: t.question, chosen: opt.text, correct: opt.correct, correctText: best.text, talk: true });
  rec(p, 'talk', 'Conversation with ' + t.who.toLowerCase() + ': ' + (opt.correct ? 'handled well' : 'could have gone better') + '.', { detail: 'You said: ' + opt.text });
  advanceTime(5);
  p.talkFb = { correct: opt.correct, chosen: opt.text, feedback: opt.feedback, best: best.text, bestFeedback: best.feedback, who: t.who };
}
function talkFbView(p) {
  const f = p.talkFb;
  return '<div class="dec"><div class="dec-step">Conversation — result</div><div class="verdict ' + (f.correct ? 'good' : 'bad') + '"><div>' + icon(f.correct ? 'check' : 'x', 28) + '</div><div><h3>' + (f.correct ? 'Great Communication' : 'That Could Have Gone Better') + '</h3><div>You said: ' + esc(f.chosen) + '</div></div></div>' +
    '<div class="explain"><h4>Why</h4>' + esc(f.feedback) + '</div>' + (f.correct ? '' : '<div class="explain" style="border-color:var(--stab)"><h4>A Better Response</h4><b>' + esc(f.best) + '</b><div style="margin-top:6px">' + esc(f.bestFeedback) + '</div></div>') +
    '<div class="submit-row"><span></span><button class="btn btn-primary btn-lg" data-act="talk-continue" data-id="' + p.id + '">Continue →</button></div></div>';
}
/* Triage */
const ESI = [[1, 'Resuscitation', 'Needs life-saving help right now'], [2, 'Emergent', 'High risk or very unwell — should not wait'], [3, 'Urgent', 'Stable, but needs several tests or treatments'], [4, 'Less Urgent', 'Stable, needs one simple test or treatment'], [5, 'Non-Urgent', 'Stable, needs only an exam and advice']];
function correctEsi(p) {
  const e = extrasOf(p).esi; if (e) return e;
  const c = caseOf(p), s = p.triageSev != null ? p.triageSev : p.severity;
  return s >= 75 ? 1 : s >= 50 ? 2 : (c.canDie && s >= 30) ? 2 : s >= 20 ? 3 : 4;
}
function triagePanel(p) {
  const c = caseOf(p), v = p.initialVitals || vitals(p), sel = (ui.esiSel || {})[p.id];
  const first = String(c.presentation || '').split(/(?<=\.)\s/).slice(0, 2).join(' ');
  return '<div class="dec"><div class="dec-head"><div><div class="dec-step">Triage · New Arrival</div><h2>How Urgent Is This Patient?</h2></div><span class="small muted">' + icon('clock', 14) + ' takes ~2 sim min</span></div>' +
    '<div class="findings triage-desc"><b>Arrival:</b> ' + esc(first) + '<br><b>Vital signs:</b> <span class="mono">' + esc(vitalsText(v)) + '</span></div>' +
    '<div class="question">Assign a triage level (Emergency Severity Index):</div><div class="esi">' +
    ESI.map(x => '<button class="esi-btn esi-' + x[0] + (sel === x[0] ? ' sel' : '') + '" data-act="esi-pick" data-level="' + x[0] + '" data-id="' + p.id + '"><b>' + x[0] + '</b><span><strong>' + x[1] + '</strong><small>' + x[2] + '</small></span></button>').join('') + '</div>' +
    '<div class="submit-row"><span class="small muted">Tip: look at the vital signs and how sick the patient seems — not just the complaint.</span><button class="btn btn-blue btn-lg" data-act="triage-submit" data-id="' + p.id + '"' + (sel == null ? ' disabled' : '') + '>ASSIGN LEVEL</button></div></div>';
}
function submitTriage(p) {
  const level = (ui.esiSel || {})[p.id]; if (level == null) return;
  const ok = correctEsi(p), diff = level - ok, c = caseOf(p);
  let effect = 0, msg;
  if (diff === 0) msg = 'Correct triage level.';
  else if (diff > 0) { effect = diff >= 2 ? 10 : 4; msg = 'Under-triaged: you rated this patient less urgent than they are, so they waited longer than they should have.'; }
  else msg = 'Over-triaged: safe for this patient, but it uses a high-priority bed that another patient might need.';
  p.needsTriage = false; p.triage = { level: level, correct: ok };
  if (effect) p.severity = clamp(p.severity + effect, 0, cap(c));
  S.career.triages = (S.career.triages || 0) + 1; if (!diff) S.career.triageOk = (S.career.triageOk || 0) + 1;
  rec(p, 'triage', 'Triage level ' + level + ' assigned (correct level: ' + ok + ').' + (effect ? ' Patient waited longer because of under-triage.' : ''));
  ui.esiSel[p.id] = null;
  advanceTime(2);
  updateStatus(p);
  p.triageFb = { level: level, ok: ok, msg: msg, why: extrasOf(p).esiWhy || '', effect: effect };
}
function triageFbView(p) {
  const f = p.triageFb, good = f.level === f.ok;
  return '<div class="dec"><div class="dec-step">Triage — result</div><div class="verdict ' + (good ? 'good' : 'bad') + '"><div>' + icon(good ? 'check' : 'x', 28) + '</div><div><h3>' + (good ? 'Correct: Level ' + f.ok : 'You Chose Level ' + f.level + ' — Correct Was Level ' + f.ok) + '</h3><div>' + esc(f.msg) + '</div></div></div>' +
    (f.why ? '<div class="explain"><h4>Why Level ' + f.ok + '</h4>' + esc(f.why) + '</div>' : '') +
    '<div class="submit-row"><span></span><button class="btn btn-primary btn-lg" data-act="triage-continue" data-id="' + p.id + '">Start Treatment →</button></div></div>';
}
/* Busy-shift events */
function triggerShiftEvent() {
  S.events = S.events || {};
  const kinds = ['mci', 'ctDown', 'labSlow', 'shortStaff'], k = kinds[Math.floor(Math.random() * kinds.length)];
  const hospAlert = (kind, text) => { S.alerts.unshift({ id: uid(), pid: null, num: '', t: S.clock, kind: kind, text: text, status: 'Unstable', read: false }); ui.beep = true; };
  if (k === 'mci') {
    const active = S.patients.filter(p => !isClosed(p)).length;
    const room = Math.max(0, 10 - active), n = Math.min(3, room);
    if (!n) { hospAlert('Ambulance diversion', 'A multi-vehicle crash nearby, but the ER is full — ambulances are being sent to another hospital.'); return; }
    let pool = shuffle(LIB.filter(c => c.specialty === 'Trauma' || c.specialty === 'Orthopedics'));
    for (let i = 0; i < n && pool.length; i++) admitCase(pool[i % pool.length].id, true);
    S.alerts.forEach((a, i) => { if (i < n && a.kind === 'New ambulance arrival') a.quiet = true; }); // one combined alert instead of n pop-ups
    hospAlert('MASS CASUALTY', 'Multi-vehicle crash nearby: ' + n + ' patients have just arrived at once. Triage them quickly!');
  } else if (k === 'ctDown') { S.events.ctDown = S.clock + 60; hospAlert('CT scanner down', 'The CT scanner is broken until ' + fmtClock(S.events.ctDown) + '. Plan around it.'); }
  else if (k === 'labSlow') { S.events.labSlow = S.clock + 90; hospAlert('Lab backlog', 'The lab is overloaded: blood test results take twice as long until ' + fmtClock(S.events.labSlow) + '.'); }
  else { S.events.shortStaff = S.clock + 90; hospAlert('Short-staffed', 'Two nurses called in sick: treatments take 50% longer until ' + fmtClock(S.events.shortStaff) + '.'); }
}
function eventsBanner() {
  const ev = [];
  if (eventActive('ctDown')) ev.push('CT scanner down until ' + fmtClock(S.events.ctDown));
  if (eventActive('labSlow')) ev.push('Lab results delayed until ' + fmtClock(S.events.labSlow));
  if (eventActive('shortStaff')) ev.push('Short-staffed until ' + fmtClock(S.events.shortStaff));
  const hall = S.patients.filter(p => !isClosed(p) && String(p.bed).indexOf('Hall') === 0).length;
  if (hall) ev.push(hall + ' patient' + (hall > 1 ? 's' : '') + ' waiting in the hallway (no beds)');
  return ev.length ? '<div class="events-banner">' + icon('info', 18) + '<b>Hospital Status:</b> ' + ev.map(esc).join(' · ') + '</div>' : '';
}

/* ───────── Actions ───────── */
function submitDecision(p, optIdx) {
  const c = caseOf(p), isRescue = p.rescueActive, d = currentDecision(p);
  if (!d) return;
  const opt = d.options[optIdx], corr = d.options.find(o => o.correct);
  const vBefore = vitals(p), stBefore = p.status, sevBefore = p.severity;
  const label = isRescue ? 'Emergency intervention' : 'Decision ' + (p.decisionIndex + 1);
  p.severity = clamp(p.severity + opt.effect, 0, cap(c));
  p.assessed = true;
  const base = (d.drift != null ? d.drift : c.drift);
  p.trend = opt.correct
    ? { rate: -Math.max(0.6, Math.abs(base) * 0.5), until: S.clock + d.timeCost + 20 }
    : { rate: Math.max(base, 0.6) * 1.5, until: S.clock + d.timeCost + 20 };
  p.log.push({ t: S.clock, n: label, title: d.title, question: d.question, chosen: opt.text, correct: opt.correct, correctText: corr.text, rescue: isRescue });
  rec(p, 'decision', label + ' — ' + d.title + ': ' + (opt.correct ? 'Correct' : 'Incorrect'), { correct: opt.correct, detail: 'Chosen: ' + opt.text + (opt.correct ? '' : ' | Best answer: ' + corr.text) });
  rec(p, 'intervention', opt.correct ? opt.text : ('Team carried out: ' + opt.text));
  S.stats[opt.correct ? 'correct' : 'incorrect']++;
  { const cr = S.career; cr[opt.correct ? 'correct' : 'incorrect']++; cr.streak = opt.correct ? cr.streak + 1 : 0; cr.bestStreak = Math.max(cr.bestStreak, cr.streak);
    if (opt.correct && isRescue) cr.rescues++; if (cr.specs.indexOf(c.specialty) < 0) cr.specs.push(c.specialty); }
  if (isRescue) { if (opt.correct) p.rescueActive = false; }
  else p.decisionIndex++;
  p.order = null; ui.selected[p.id] = null;
  const t0 = S.clock;
  advanceTime(Math.round(d.timeCost * (eventActive('shortStaff') ? 1.5 : 1)));
  if (p.outcome !== 'deceased') {
    if (!isRescue || opt.correct) applyResults(p, d.results, opt.correct ? '' : 'After senior review, the team corrected course. ');
    p.lastDecisionAt = S.clock;
    updateStatus(p);
  }
  p.feedback = {
    label: label, title: d.title, question: d.question, correct: opt.correct, chosen: opt.text, chosenLetter: LET[(p.lastOrder || [0, 1, 2, 3]).indexOf(optIdx)],
    chosenFeedback: opt.feedback, correctText: corr.text, correctFeedback: corr.feedback, effect: opt.effect,
    minutes: S.clock - t0, stBefore: stBefore, stAfter: p.status, vBefore: vBefore, vAfter: vitals(p),
    sevBefore: Math.round(sevBefore), sevAfter: Math.round(p.severity), results: d.results || null, rescue: isRescue
  };
  save(); render();
}
function ensureOrder(p) { if (!p.order) { p.order = shuffle([0, 1, 2, 3]); save(); } return p.order; }

function dischargeEval(p) {
  const c = caseOf(p), v = vitals(p), disp = c.disposition || { label: 'Discharged', maxSeverity: 22 };
  const maxSev = disp.maxSeverity || 22;
  const observed = p.lastDecisionAt != null ? S.clock - p.lastDecisionAt : 0;
  const checks = [
    { label: 'Patient is alive and responsive', pass: p.outcome !== 'deceased' },
    { label: 'Initial assessment completed', pass: p.assessed, detail: p.assessed ? '' : 'You have not yet examined or assessed this patient.' },
    { label: 'All clinical decisions completed', pass: finished(p), detail: finished(p) ? '' : (c.decisions.length - p.decisionIndex) + ' clinical decision(s) still need your attention (now on ' + (p.decisionIndex + 1) + ' of ' + c.decisions.length + ').' },
    { label: 'No emergency intervention pending', pass: !p.rescueActive, detail: p.rescueActive ? 'The patient is critical and needs emergency treatment now.' : '' },
    { label: 'Clinical severity within safe range', pass: p.severity <= maxSev, detail: 'Severity index ' + Math.round(p.severity) + '/100 (must be ≤ ' + maxSev + ').' },
    { label: 'Vital signs acceptable', pass: !!v && v.spo2 >= 93 && v.sbp >= (p.age < 12 ? 80 : 90) && v.hr <= (p.age < 12 ? 140 : 110) && v.temp < 38.3, detail: v ? vitalsText(v) : '' },
    { label: 'Stability status is Stable or Improving', pass: p.status === 'Stable' || p.status === 'Improving', detail: 'Current status: ' + p.status + '.' },
    examCheck(p),
    { label: 'Conversation with the patient or family completed', pass: !extrasOf(p).talk || !!p.talkDone, detail: 'There is still an important conversation to have with this patient or their family.' },
    { label: 'Observed for at least 15 minutes after the last treatment', pass: observed >= 15, detail: observed >= 15 ? '' : 'Only ' + Math.max(0, observed) + ' minutes since the last intervention. Use "Observe 15 min" before discharge.' }
  ];
  return { ok: checks.every(x => x.pass), checks: checks, disp: disp };
}
function confirmDischarge(p) {
  const ev = dischargeEval(p); if (!ev.ok) return;
  p.outcome = 'discharged'; p.outcomeTime = S.clock; p.rescueActive = false;
  S.career.discharged++; if (p.log.filter(l => !l.pre).length && p.log.filter(l => !l.pre).every(l => l.correct)) S.career.perfect++;
  rec(p, 'status', 'Status changed: ' + p.status + ' → Discharged'); p.status = 'Discharged';
  rec(p, 'outcome', 'Disposition: ' + ev.disp.label + '. Total time under care: ' + fmtDur(S.clock - p.arrival) + '.');
  addUpdate(p, 'Disposition: ' + ev.disp.label + '.', 'result');
  save();
}
function resetPatient(p) {
  const idx = S.patients.indexOf(p);
  const seed = p.seed ? Object.assign({}, p.seed, { id: p.id, num: p.num, bed: p.bed }) : { id: p.id, num: p.num, bed: p.bed, age: p.age };
  if (!p.seed) seed.keep = false;
  const np = createPatient(p.caseId, seed);
  if (!p.seed) np.seed = null;
  S.patients[idx] = np;
  S.alerts = S.alerts.filter(a => a.pid !== p.id);
  ui.selected[p.id] = null;
  save();
}
function enterRoom(id) {
  const p = S.patients.find(x => x.id === id); if (!p) return;
  if (S.lastRoom && S.lastRoom !== id && !isClosed(p)) {
    advanceTime(2);
    rec(p, 'update', 'Doctor arrived from another treatment room (2 min walk).');
  }
  S.lastRoom = id;
  S.alerts.forEach(a => { if (a.pid === id) a.read = true; });
  save();
  go('#/room/' + id);
}
const IN_FRAME = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
if (IN_FRAME) document.documentElement.classList.add('in-frame');
function go(hash) {
  if (IN_FRAME) { route(hash); return; }
  if (location.hash === hash) route(); else location.hash = hash;
}

function syncSound() {
  if (!window.SND || !S) return;
  const st = S.settings;
  SND.configure({ on: st.soundOn !== false, ambient: st.ambient !== false, monitor: st.monitor !== false, alarms: st.sound !== false, volume: st.volume == null ? 0.7 : st.volume });
  let r = null;
  if (ui.route.name === 'room') {
    const p = S.patients.find(x => x.id === ui.route.id);
    if (p && !isClosed(p)) {
      const v = vitals(p);
      const lvl = (p.rescueActive || p.status === 'Critical') ? 2 : (['hr', 'sbp', 'spo2', 'rr'].some(k => abnormal(k, v[k], p.age)) ? 1 : 0);
      r = { hr: v.hr, spo2: v.spo2, level: lvl, rhythm: p.caseId.indexOf('afib') >= 0 ? 'irregular' : 'regular' };
    }
  }
  SND.setRoom(r);
}
/* ───────── Rendering: shell ───────── */
function render() {
  const y = window.scrollY;
  renderTop(); renderToasts();
  const r = ui.route;
  let html = '';
  if (r.name === 'room') html = viewRoom(r.id);
  else if (r.name === 'record') html = viewRecord(r.id);
  else if (r.name === 'library') html = viewLibrary();
  else if (r.name === 'report') html = viewReport();
  else if (r.name === 'learn') html = window.EDU ? window.EDU.view(ui, S) : '';
  else if (r.name === 'profile') html = window.PROFILE ? window.PROFILE.view(ui, S, icon) : '';
  else if (r.name === 'history') html = viewHistory();
  else if (r.name === 'past') html = viewPastRecord(r.shift, r.pid);
  else html = viewDash();
  document.getElementById('app').innerHTML = convTemps(html);
  if (window.CLIN && S.settings.glossary !== false) { try { CLIN.applyGlossary(document.getElementById('app')); } catch (e) { } }
  renderModal();
  if (ui.keepScroll) window.scrollTo(0, y);
  ui.keepScroll = false;
  const tb = document.getElementById('topbar');
  document.documentElement.style.setProperty('--tbh', (tb.offsetHeight + 8) + 'px');
  if (ui.beep) { ui.beep = false; if (window.SND) SND.alert(); }
  syncSound();
}
function renderTop() {
  const unread = S.alerts.filter(a => !a.read).length;
  const r = ui.route.name;
  const nav = [['dash', 'Waiting Room', '#/'], ['library', 'Add Patient / Cases', '#/library'], ['learn', 'Education', '#/learn'], ['report', 'Shift Report', '#/report'], ['history', 'Past Shifts', '#/history'], ['profile', 'My Profile', '#/profile']];
  let h = '<div class="tb">' +
    '<button class="brand" data-go="#/"><span class="brand-logo" style="color:var(--crit)">' + icon('Emergency Medicine', 22) + '</span><span>Riverside ER<small>Simulation · Fictional</small></span></button>' +
    '<nav class="tb-nav">' + nav.map(n => '<button class="' + ((r === n[0] || (n[0] === 'dash' && (r === 'room' || r === 'record')) || (n[0] === 'history' && r === 'past')) ? 'on' : '') + '" data-go="' + n[2] + '">' + n[1] + '</button>').join('') + '</nav>' +
    '<div class="tb-right">' + accountButton() + profileChip() +
      '<div class="clock" title="Simulated hospital clock"><b>' + fmtClock(S.clock) + '</b><span>' + fmtDay(S.clock) + ' · sim time</span></div>' +
      '<button class="tb-btn ' + (S.settings.live ? 'live' : '') + '" data-act="toggle-live" title="Live clock: when on, 5 simulated minutes pass every 20 real seconds">' + icon(S.settings.live ? 'pause' : 'play', 16) + '<span class="lbl">' + (S.settings.live ? 'Live' : 'Paused') + '</span></button>' +
      '<button class="tb-btn" data-act="toggle-sound" title="Hospital sounds on/off" aria-label="Hospital sounds">' + icon(S.settings.soundOn !== false ? 'speaker' : 'mute', 18) + '</button>' +
      '<div class="menu-wrap"><button class="tb-btn" data-act="menu-alerts" aria-label="Alerts">' + icon('bell', 18) + (unread ? '<span class="bell-count">' + unread + '</span>' : '') + '</button>' +
      (ui.menu === 'alerts' ? alertsDropdown() : '') + '</div>' +
      '<div class="menu-wrap"><button class="tb-btn" data-act="menu-main" aria-label="Menu">' + icon('menu', 18) + '</button>' +
      (ui.menu === 'main' ? mainDropdown() : '') + '</div>' +
    '</div></div>' +
    '<div class="disclaimer">Educational simulation with fictional patients — not medical advice. Real medical decisions are made by qualified clinicians.</div>';
  document.getElementById('topbar').innerHTML = h;
}
function profileChip() {
  if (!window.PROFILE) return '';
  const r = PROFILE.rank(S), p = S.profile;
  return '<button class="tb-chip" data-go="#/profile" title="My doctor profile" style="--pc:' + esc(p.color) + '"><span class="tb-av">' + icon(p.icon, 16) + '</span><span class="lbl"><b>' + esc(p.name ? 'Dr. ' + p.name : 'Create Profile') + '</b><small>' + esc(r.name) + '</small></span></button>';
}
function alertsDropdown() {
  const list = S.alerts.slice(0, 30);
  return '<div class="dropdown" style="min-width:330px">' +
    (list.length ? list.map(a => '<div class="alert-item"><div class="row" style="justify-content:space-between"><span class="badge ' + statusClass(a.status) + '">' + esc(a.kind) + '</span><span class="mono small muted">' + fmtClock(a.t) + '</span></div><div style="margin:6px 0">' + esc(a.text) + '</div>' +
      (S.patients.find(p => p.id === a.pid) ? '<button class="btn btn-sm" data-room="' + a.pid + '">Enter Room</button>' : '') + '</div>').join('')
      : '<div class="alert-item muted">No alerts yet.</div>') +
    (list.length ? '<hr><button data-act="clear-alerts">Mark All as Read</button>' : '') + '</div>';
}
function mainDropdown() {
  return '<div class="dropdown">' +
    (account ? '<button data-act="signout">' + icon('exit', 18) + 'Sign Out (' + esc(account.username) + ')</button><hr>' : '') +
    '<button data-act="add-random">' + icon('plus', 18) + 'Admit a Random New Patient</button>' +
    '<button data-act="observe-all">' + icon('hourglass', 18) + 'Advance Clock 15 Min</button>' +
    '<button data-act="settings">' + icon('steth', 18) + 'Simulation Settings</button>' +
    '<hr><button data-act="export">' + icon('list', 18) + 'Export Save File (Backup)</button>' +
    '<button data-act="import">' + icon('refresh', 18) + 'Import Save File</button>' +
    '<hr><button data-act="new-sim" style="color:var(--crit)">' + icon('refresh', 18) + 'Start a New Simulation</button></div>';
}
function renderToasts() {
  const inRoom = ui.route.name === 'room' ? ui.route.id : null;
  const list = S.alerts.filter(a => !a.read && !a.quiet && (a.pid == null || a.pid !== inRoom)).slice(0, window.innerWidth < 700 ? 1 : 3);
  document.getElementById('toasts').innerHTML = convTemps(list.map(a => {
    const em = ['Critical', 'Unstable', 'Deceased'].indexOf(a.status) >= 0 || a.kind === 'EMERGENCY';
    return '<div class="toast ' + statusClass(a.status) + '" role="alert"><div class="toast-h">' + icon('bell', 16) + (em ? 'EMERGENCY ALERT' : 'ALERT') + (a.pid ? ' · PATIENT ' + a.num : ' · HOSPITAL') + '<span style="margin-left:auto" class="mono">' + fmtClock(a.t) + '</span></div>' +
      '<div class="toast-b"><b>' + esc(a.kind) + '</b> — ' + esc(a.text) + '<div class="small muted" style="margin-top:4px">Current Severity: <b>' + esc(a.status) + '</b></div></div>' +
      '<div class="toast-f">' + (!a.pid ? '' : a.status !== 'Deceased' ? '<button class="btn btn-sm btn-danger" data-room="' + a.pid + '">Enter Patient ' + a.num + '\'s Room</button>' : '<button class="btn btn-sm" data-record="' + a.pid + '">View Record</button>') + '<button class="btn btn-sm" data-dismiss="' + a.id + '">Dismiss</button></div></div>';
  }).join(''));
}

/* ───────── Dashboard ───────── */
function viewDash() {
  const active = S.patients.filter(p => !isClosed(p));
  const closed = S.patients.filter(isClosed);
  const sorted = active.slice().sort(ui.sort === 'number' ? (a, b) => a.num - b.num : (a, b) => (RANK[b.status] - RANK[a.status]) || (b.severity - a.severity));
  const waitingN = active.filter(p => currentDecision(p) && !p.feedback).length;
  const tot = S.stats.correct + S.stats.incorrect;
  const crit = active.filter(p => p.status === 'Critical' || p.status === 'Unstable').length;
  let h = '<div class="page-head"><div><h1>Emergency Department — Waiting Room</h1><p>Shift #' + (S.shiftNo || 1) + ' · ' + active.length + ' active patient' + (active.length === 1 ? '' : 's') + ' · ' + fmtDay(S.clock) + ', ' + fmtClock(S.clock) + '</p></div>' +
    '<div class="row"><button class="btn" data-act="observe-all" title="Let 15 simulated minutes pass for every patient">' + icon('hourglass', 18) + 'Advance 15 Min</button><button class="btn btn-primary" data-go="#/library">' + icon('plus', 18) + 'Add Patient</button></div></div>';
  h += '<div class="stats">' +
    stat('Active patients', active.length, 'in the department') +
    stat('Critical / unstable', crit, crit ? 'need urgent attention' : 'none right now', crit ? 'var(--crit)' : '') +
    stat('Decisions waiting', waitingN, 'across all rooms') +
    stat('Decision accuracy', tot ? Math.round(100 * S.stats.correct / tot) + '%' : '—', S.stats.correct + ' correct of ' + tot) +
    stat('Discharged', closed.filter(p => p.outcome === 'discharged').length, 'safely') +
    stat('Deaths', closed.filter(p => p.outcome === 'deceased').length, 'this simulation') + '</div>';
  h += '<div class="toolbar"><label class="small muted" for="sort">Sort By</label><select id="sort" data-change="sort"><option value="priority"' + (ui.sort === 'priority' ? ' selected' : '') + '>Priority (Sickest First)</option><option value="number"' + (ui.sort === 'number' ? ' selected' : '') + '>Patient Number</option></select>' +
    '<span class="small muted">Time moves when you make decisions, observe, move between rooms, or with the Live clock on.</span></div>';
  if (accountsAvailable() && !account) h += '<div class="prof-cta">' + icon('body', 22) + '<div><b>Playing as a Guest</b><div class="small">Your game saves in this browser only. Sign in to save it to your account and play on any device.</div></div><button class="btn btn-primary btn-sm" data-act="signin">Sign In</button></div>';
  if (account && account.error) h += '<div class="prof-cta" style="border-color:var(--crit);color:var(--crit)">' + icon('info', 22) + '<div><b>Account Save Problem</b><div class="small">' + esc(account.error) + '</div></div></div>';
  h += eventsBanner();
  if (!S.profile.name) h += '<div class="prof-cta">' + icon('steth', 22) + '<div><b>Create Your Doctor Profile</b><div class="small">Pick your name, scrub color and dream specialty. Earn XP and rank up from Medical Student to Chief of the ER.</div></div><button class="btn btn-primary btn-sm" data-go="#/profile">Set Up Profile</button></div>';
  h += sorted.length ? '<div class="grid">' + sorted.map(card).join('') + '</div>' : '<div class="panel empty">No active patients. <button class="btn btn-primary" data-go="#/library">Admit a Patient</button></div>';
  if (closed.length) h += '<h2 class="section-h">Completed cases</h2><div class="grid">' + closed.map(card).join('') + '</div>';
  return h;
}
function stat(k, v, s, color) { return '<div class="stat"><div class="k">' + k + '</div><div class="v"' + (color ? ' style="color:' + color + '"' : '') + '>' + v + '</div><div class="s">' + s + '</div></div>'; }
function card(p) {
  const c = caseOf(p), v = vitals(p), d = currentDecision(p);
  const total = c.decisions.length, doneN = Math.min(p.decisionIndex, total);
  let wait;
  if (p.outcome === 'deceased') wait = '<div class="waiting none">Died at ' + fmtClock(p.outcomeTime) + ' · see record for debrief</div>';
  else if (p.outcome === 'discharged') wait = '<div class="waiting ok">' + icon('check', 16) + esc((c.disposition || {}).label || 'Discharged') + '</div>';
  else if (p.rescueActive) wait = '<div class="waiting em"><span class="dot"></span>EMERGENCY Intervention Required</div>';
  else if (p.feedback) wait = '<div class="waiting none">' + icon('eye', 16) + 'Review Result of Your Last Decision</div>';
  else if (p.needsTriage) wait = '<div class="waiting em"><span class="dot"></span>New Arrival — Needs Triage</div>';
  else if (talkDue(p)) wait = '<div class="waiting"><span class="dot"></span>Patient or Family Wants to Talk</div>';
  else if (d) wait = '<div class="waiting"><span class="dot"></span>Decision ' + (p.decisionIndex + 1) + ' Waiting for the Doctor</div>';
  else wait = '<div class="waiting ok">' + icon('check', 16) + 'Decisions Complete — Evaluate for Discharge</div>';
  const vc = (lab, key, val) => '<div class="vcell' + (v && abnormal(key, v[key], p.age) ? ' ab' : '') + '"><div class="l">' + lab + '</div><div class="n">' + val + '</div></div>';
  return '<article class="pcard ' + statusClass(p.status) + '">' +
    '<div class="pc-body"><div class="pc-top"><span class="pnum">PATIENT ' + p.num + (p.returning ? ' <span class="ret" title="Returning patient">↩ Return</span>' : '') + '</span><span class="badge ' + statusClass(p.status) + '">' + p.status + '</span></div>' +
    '<div class="pmeta">Age ' + p.age + ' · ' + (p.sex === 'F' ? 'Female' : 'Male') + ' · ' + esc(p.bed) + ' · ' + (isClosed(p) ? 'Under care ' + fmtDur(p.outcomeTime - p.arrival) : 'In ED ' + fmtDur(S.clock - p.arrival)) + '</div>' +
    '<div class="pcond"><span class="ic">' + icon(c.specialty, 20) + '</span><div><b>' + esc(c.suspected) + '</b><span>' + esc(tc(c.chiefComplaint)) + '</span><div class="row" style="margin-top:4px;gap:6px"><span class="diff diff-' + c.difficulty + '">' + c.difficulty + '</span><span class="spec">' + c.specialty + '</span></div></div></div>' +
    (v ? '<div class="vgrid">' + vc('HR', 'hr', v.hr) + vc('BP', 'sbp', v.sbp + '/' + v.dbp) + vc('SpO₂', 'spo2', v.spo2 + '%') + vc('RR', 'rr', v.rr) + vc('TEMP', 'temp', fmtTemp(v.temp)) + '</div>' : '') +
    '<div class="prog">Treatment Progress: ' + doneN + ' of ' + total + ' Decisions<div class="bar"><i style="width:' + Math.round(100 * doneN / total) + '%"></i></div></div>' +
    wait + '</div>' +
    '<div class="pc-foot">' + (isClosed(p) ? '<div class="row" style="gap:8px"><button class="btn" style="flex:1" data-record="' + p.id + '">' + icon('list', 18) + 'VIEW RECORD</button>' + (canReturn(p) ? '<button class="btn" data-act="return-cur" data-id="' + p.id + '" title="Bring this patient back with a new problem">↩ Return Visit</button>' : '') + '</div>' : '<button class="btn btn-primary" data-room="' + p.id + '">ENTER TREATMENT ROOM</button>') + '</div></article>';
}

/* ───────── Treatment room ───────── */
function viewRoom(id) {
  const p = S.patients.find(x => x.id === id);
  if (!p) return '<div class="panel empty">Patient not found. <button class="btn" data-go="#/">Return to waiting room</button></div>';
  const c = caseOf(p);
  let h = '<div class="roombar"><button class="btn btn-primary" data-go="#/">' + icon('back', 18) + 'RETURN TO WAITING ROOM</button>' +
    '<div class="who"><b>Patient ' + p.num + '</b> <span class="badge ' + statusClass(p.status) + '">' + p.status + '</span><div>Age ' + p.age + ' · ' + (p.sex === 'F' ? 'F' : 'M') + ' · ' + esc(p.bed) + ' · ' + esc(c.suspected) + '</div></div>' +
    '<div class="timer"><span class="muted small">Time Under Care</span><b>' + fmtDur((isClosed(p) ? p.outcomeTime : S.clock) - p.arrival) + '</b></div>' +
    '<button class="btn btn-danger" data-act="discharge" data-id="' + p.id + '">' + icon('exit', 18) + 'DISCHARGE PATIENT</button></div>';
  h += '<div class="room">' +
    '<section class="a-mon">' + monitor(p) + '</section>' +
    '<section class="a-exam panel">' + examPanel(p) + '</section>' +
    '<section class="a-dec panel">' + decisionPanel(p) + '</section>' +
    '<section class="a-trend panel"><div class="panel-title">' + icon('chart', 18) + 'Vital sign trends</div>' + trends(p) + '</section>' +
    '<section class="a-info panel">' + infoPanel(p) + '</section>' +
    '<section class="a-res panel">' + resultsPanel(p) + '</section>' +
    '<section class="a-upd panel"><div class="panel-title">' + icon('clock', 18) + 'Clinical updates</div><ul class="tl">' +
      p.updates.map(u => '<li class="k-' + u.kind + '"><div class="t">' + fmtDay(u.t) + ' ' + fmtClock(u.t) + '</div>' + esc(u.text) + '</li>').join('') + '</ul></section>' +
    '<section class="a-act panel"><div class="panel-title">' + icon('steth', 18) + 'Bedside actions</div><div class="row">' +
      (isClosed(p) ? '' : '<button class="btn" data-act="reassess" data-id="' + p.id + '">' + icon('steth', 18) + 'Reassess Vitals (+5 Min)</button><button class="btn" data-act="observe" data-id="' + p.id + '">' + icon('hourglass', 18) + 'Observe 15 Min</button>') +
      '<button class="btn" data-record="' + p.id + '">' + icon('list', 18) + 'Full Medical Record</button>' +
      '<button class="btn" data-act="reset" data-id="' + p.id + '">' + icon('refresh', 18) + 'Restart This Case</button></div>' +
      '<p class="small muted" style="margin-bottom:0">Other patients keep progressing whenever simulated time passes.</p></section>' +
    '</div>';
  return h;
}
function ecgPath(hr) {
  const W = 600, speed = 50; // units per second
  let n = Math.max(2, Math.round(W / (speed * 60 / hr))); if (n % 2) n++;
  const s = W / n; let d = 'M0 40';
  for (let i = 0; i < n; i++) {
    const x = i * s, f = v => (x + v * s).toFixed(1);
    d += ' L' + f(.30) + ' 40 Q' + f(.36) + ' 33 ' + f(.42) + ' 40 L' + f(.48) + ' 40 L' + f(.51) + ' 45 L' + f(.55) + ' 8 L' + f(.59) + ' 52 L' + f(.62) + ' 40 L' + f(.72) + ' 40 Q' + f(.80) + ' 29 ' + f(.88) + ' 40 L' + f(1) + ' 40';
  }
  return d;
}
function monitor(p) {
  const v = vitals(p);
  if (!v) return '<div class="monitor"><div class="mon-top"><span>BED ' + esc(p.bed) + '</span><span>MONITOR</span></div><div class="mon-off">Monitoring discontinued.<br>Time of death ' + fmtClock(p.outcomeTime) + '.</div></div>';
  if (p.outcome === 'discharged') return '<div class="monitor"><div class="mon-top"><span>BED ' + esc(p.bed) + '</span><span>MONITOR</span></div><div class="mon-off">Patient discharged at ' + fmtClock(p.outcomeTime) + '.<br>Last vitals: ' + esc(vitalsText(v)) + '</div></div>';
  const dur = 6;
  const al = (k) => abnormal(k, v[k], p.age) ? ' alarm' : '';
  const sev = Math.round(p.severity);
  return '<div class="monitor" aria-label="Patient monitor"><div class="mon-top"><span>BED ' + esc(p.bed) + ' · PATIENT ' + p.num + '</span><span>' + fmtClock(S.clock) + '</span></div>' +
    '<div class="ecg"><svg viewBox="0 0 300 80" preserveAspectRatio="none" style="width:100%"><g class="track" style="--shift:-300px;animation-duration:' + dur + 's"><path d="' + ecgPath(v.hr) + '" fill="none" stroke="#4ade80" stroke-width="1.6" vector-effect="non-scaling-stroke"/></g></svg></div>' +
    '<div class="mon-grid">' +
      '<div class="mv hr' + al('hr') + '"><div class="l">HR</div><div class="n">' + v.hr + '</div><div class="u">beats/min</div></div>' +
      '<div class="mv bp' + al('sbp') + '"><div class="l">NIBP</div><div class="n">' + v.sbp + '/' + v.dbp + '</div><div class="u">mmHg</div></div>' +
      '<div class="mv sp' + al('spo2') + '"><div class="l">SpO₂</div><div class="n">' + v.spo2 + '</div><div class="u">%</div></div>' +
      '<div class="mv rr' + al('rr') + '"><div class="l">RESP</div><div class="n">' + v.rr + '</div><div class="u">breaths/min</div></div>' +
      '<div class="mv tp' + al('temp') + '"><div class="l">TEMP</div><div class="n">' + fmtTemp(v.temp) + '</div><div class="u">' + tUnit() + '</div></div>' +
      '<div class="mv tp"><div class="l">TREND</div><div class="n" style="font-size:20px;padding-top:6px">' + (trendRate(p) < -0.05 ? '▼ Better' : trendRate(p) > 0.05 ? '▲ Worse' : '■ Steady') + '</div><div class="u">next 10 min</div></div>' +
    '</div><div class="sevmeter"><div class="lab"><span>SEVERITY INDEX ' + sev + '/100</span><span>lower is better</span></div><div class="sevtrack"><i style="left:calc(' + clamp(sev, 0, 100) + '% - 2px)"></i></div></div></div>';
}
function trends(p) {
  const pts = p.vh;
  if (pts.length < 2) return '<p class="muted small">Trends appear as simulated time passes.</p>';
  const defs = [['hr', 'Heart Rate', 'bpm', [60, 100]], ['sbp', 'Systolic BP', 'mmHg', [90, 140]], ['spo2', 'SpO₂', '%', [94, 100]], ['rr', 'Resp. Rate', '/min', [12, 20]], ['sev', 'Severity Index', '/100', [0, 20]]];
  return '<div class="minis">' + defs.map(d => miniChart(p, d[0], d[1], d[2], d[3])).join('') + '</div><p class="small muted" style="margin:8px 0 0">Shaded band = typical normal range. Hover or tap a chart to read values.</p>';
}
function miniChart(p, key, label, unit, band) {
  const pts = p.vh, W = 300, H = 70, pl = 4, pr = 6, pt = 6, pb = 6;
  const vals = pts.map(x => x[key]);
  let lo = Math.min.apply(null, vals.concat(band[0])), hi = Math.max.apply(null, vals.concat(band[1]));
  const padv = (hi - lo) * 0.12 || 2; lo -= padv; hi += padv;
  const t0 = pts[0].t, t1 = pts[pts.length - 1].t || t0 + 1;
  const sx = t => pl + (W - pl - pr) * ((t - t0) / Math.max(1, t1 - t0));
  const sy = v => pt + (H - pt - pb) * (1 - (v - lo) / (hi - lo));
  const cid = p.id + '-' + key;
  ui.charts[cid] = { pts: pts.map(x => ({ t: x.t, v: x[key], x: sx(x.t), y: sy(x[key]) })), unit: unit, label: label, W: W };
  const d = pts.map((x, i) => (i ? 'L' : 'M') + sx(x.t).toFixed(1) + ' ' + sy(x[key]).toFixed(1)).join(' ');
  const last = pts[pts.length - 1];
  const bad = key === 'sev' ? last.sev >= 50 : abnormal(key, last[key], p.age);
  return '<div class="mini" data-chart="' + cid + '"><h5>' + label + '<span style="color:' + (bad ? 'var(--crit)' : 'var(--ink)') + '">' + last[key] + ' ' + unit + '</span></h5>' +
    '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="' + label + ' trend">' +
    '<rect x="0" y="' + sy(band[1]).toFixed(1) + '" width="' + W + '" height="' + Math.max(0, sy(band[0]) - sy(band[1])).toFixed(1) + '" fill="#e8f5e9"/>' +
    '<path d="' + d + '" fill="none" stroke="#1d5fbf" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
    '<line class="cross" x1="0" x2="0" y1="0" y2="' + H + '" stroke="#7a849b" stroke-width="1" vector-effect="non-scaling-stroke" opacity="0"/>' +
    '</svg></div>';
}
function infoPanel(p) {
  const c = caseOf(p), hx = c.history || {};
  return '<div class="panel-title">' + icon('info', 18) + 'Patient information</div>' +
    '<p class="pres">' + esc(c.presentation) + '</p>' +
    '<dl class="kv"><dt>Record No.</dt><dd class="mono">' + esc(p.mrn || '') + (p.returning ? ' <span class="ret">↩ Return Visit</span>' : '') + '</dd><dt>Patient</dt><dd>Patient ' + p.num + ' · ' + p.age + ' years · ' + (p.sex === 'F' ? 'Female' : 'Male') + '</dd>' +
    '<dt>Main Complaint</dt><dd>' + esc(tc(c.chiefComplaint)) + '</dd>' +
    '<dt>Working Diagnosis</dt><dd>' + esc(c.suspected) + '</dd>' +
    '<dt>Case Type</dt><dd><span class="spec">' + icon(c.specialty, 16) + c.specialty + '</span> <span class="diff diff-' + c.difficulty + '">' + c.difficulty + '</span></dd>' +
    '<dt>Medical History</dt><dd>' + esc((hx.pmh || []).join(', ') || 'None') + '</dd>' +
    '<dt>Medicines</dt><dd>' + esc((hx.meds || []).join(', ') || 'None') + '</dd>' +
    '<dt>Allergies</dt><dd>' + esc(hx.allergies || 'None known') + '</dd>' +
    '<dt>Social</dt><dd>' + esc(hx.social || '—') + '</dd>' +
    '<dt>Arrival Vitals</dt><dd class="mono small">' + esc(vitalsText(p.initialVitals)) + '</dd></dl>' + visitsHtml(p);
}
function resultsPanel(p) {
  const labs = p.labs.slice().reverse(), imgs = p.imaging.slice().reverse();
  let h = ordersPanel(p) + '<div class="panel-title">' + icon('flask', 18) + 'Laboratory results</div>';
  h += labs.length ? '<table class="labs"><thead><tr><th>Test</th><th>Result</th><th>Ref.</th><th>Time</th></tr></thead><tbody>' +
    labs.map(l => '<tr><td>' + esc(tc(l.name)) + '</td><td><b>' + esc(l.value) + '</b> ' + (l.flag ? '<span class="flag flag-' + l.flag + '">' + ({ H: 'HIGH', L: 'LOW', C: 'CRITICAL' }[l.flag] || l.flag) + '</span>' : '') + '</td><td class="small muted">' + esc(l.ref || '') + '</td><td class="mono small muted">' + fmtClock(l.t) + '</td></tr>').join('') + '</tbody></table>'
    : '<p class="muted small">No laboratory results yet.</p>';
  h += '<div class="panel-title" style="margin-top:18px">' + icon('scan', 18) + 'Imaging &amp; tests</div>';
  h += imgs.length ? imgs.map(im => imagingCard(p, im, p.imaging.indexOf(im))).join('')
    : '<p class="muted small">No imaging performed yet.</p>';
  return h;
}
function imgThumb(name) {
  const n = name.toLowerCase();
  const st = 'fill="none" stroke="#9fb7d9" stroke-width="1.5"';
  if (n.indexOf('ecg') >= 0 || n.indexOf('ekg') >= 0) return '<svg width="54" height="40" viewBox="0 0 54 40"><path d="M0 22h10l3-6 3 6h4l3 14 4-32 3 18h6l3-4 3 4h12" ' + st + '/></svg>';
  if (n.indexOf('chest') >= 0 || n.indexOf('lung') >= 0) return '<svg width="50" height="50" viewBox="0 0 50 50"><path d="M25 8v16M22 12C14 12 9 26 9 36c0 4 3 6 7 5l7-3V14M28 12c8 0 13 14 13 24 0 4-3 6-7 5l-7-3V14" ' + st + '/></svg>';
  if (n.indexOf('ct') >= 0 || n.indexOf('mri') >= 0 || n.indexOf('head') >= 0 || n.indexOf('brain') >= 0) return '<svg width="50" height="50" viewBox="0 0 50 50"><ellipse cx="25" cy="25" rx="17" ry="20" ' + st + '/><ellipse cx="25" cy="25" rx="11" ry="14" stroke-dasharray="3 3" ' + st + '/></svg>';
  if (n.indexOf('ultra') >= 0 || n.indexOf('echo') >= 0 || n.indexOf('fast') >= 0) return '<svg width="50" height="50" viewBox="0 0 50 50"><path d="M25 8 8 40a40 40 0 0 0 34 0z" ' + st + '/><path d="M18 30q7-6 14 0" ' + st + '/></svg>';
  if (n.indexOf('x-ray') >= 0 || n.indexOf('xray') >= 0) return '<svg width="50" height="50" viewBox="0 0 50 50"><path d="M20 6v18l-4 20M30 6v18l4 20M18 30h14" ' + st + '/></svg>';
  return '<svg width="44" height="44" viewBox="0 0 24 24" ' + st + '>' + IC.scan + '</svg>';
}

/* ───────── Decision panel ───────── */
function decisionPanel(p) {
  const c = caseOf(p);
  if (p.outcome === 'deceased') {
    return '<div class="outcome"><div class="big" style="background:var(--dec-bg);color:var(--dec)">' + icon('info', 32) + '</div><h2>Patient ' + p.num + ' died</h2><p class="muted">Time of death ' + fmtClock(p.outcomeTime) + ' after ' + fmtDur(p.outcomeTime - p.arrival) + ' of care. The family was supported by the care team.</p>' + debrief(p) + '</div>';
  }
  if (p.outcome === 'discharged') {
    return '<div class="outcome"><div class="big" style="background:var(--stab-bg);color:var(--stab)">' + icon('check', 32) + '</div><h2>Case Complete</h2><p class="muted">' + esc((c.disposition || {}).label) + ' at ' + fmtClock(p.outcomeTime) + '.</p>' + debrief(p) + '</div>';
  }
  if (p.needsTriage) return triagePanel(p);
  if (p.triageFb) return triageFbView(p);
  if (p.talkFb) return talkFbView(p);
  if (p.feedback) return feedbackView(p);
  if (talkDue(p)) return talkPanel(p);
  const d = currentDecision(p);
  if (!d) {
    return '<div class="dec"><div class="dec-step">All decisions complete</div><h2>Final Evaluation</h2><div class="findings">You have completed every clinical decision for this case. Before discharge, the patient must be observed, reach a safe level of stability, and pass the discharge-readiness evaluation.</div>' +
      '<div class="row"><button class="btn" data-act="observe" data-id="' + p.id + '">' + icon('hourglass', 18) + 'Observe 15 Min</button><button class="btn btn-blue" data-act="discharge" data-id="' + p.id + '">' + icon('exit', 18) + 'Evaluate Discharge Readiness</button></div></div>';
  }
  const order = ensureOrder(p); p.lastOrder = order;
  const sel = ui.selected[p.id];
  const rescue = p.rescueActive;
  const step = rescue ? 'EMERGENCY' : 'Decision ' + (p.decisionIndex + 1) + ' of ' + c.decisions.length;
  return '<div class="dec">' + (rescue ? '<div class="emergency-banner"><span class="dot"></span>EMERGENCY INTERVENTION REQUIRED</div>' : '') +
    '<div class="dec-head"><div><div class="dec-step">' + step + '</div><h2>' + esc(d.title) + '</h2></div><span class="small muted">' + icon('clock', 14) + ' takes ~' + d.timeCost + ' sim min</span></div>' +
    (Object.keys(p.exam || {}).length ? '' : '<div class="exam-tip">' + icon('body', 18) + '<span><b>Tip:</b> Examine the patient on the body diagram before deciding — click body areas to investigate.</span></div>') +
    '<div class="findings' + (rescue ? ' em' : '') + '"><b>Clinical Findings:</b> ' + esc(d.findings) + '</div>' +
    '<div class="question">' + esc(d.question) + '</div>' +
    '<div class="opts" role="radiogroup">' + order.map((oi, pos) => '<button class="opt' + (sel === oi ? ' sel' : '') + '" role="radio" aria-checked="' + (sel === oi) + '" data-pick="' + oi + '" data-id="' + p.id + '"><span class="L">' + LET[pos] + '</span><span>' + esc(d.options[oi].text) + '</span></button>').join('') + '</div>' +
    '<div class="submit-row"><span class="small muted">' + (sel == null ? 'Select one answer, then press Submit.' : 'Answer ' + LET[order.indexOf(sel)] + ' selected.') + '</span><button class="btn btn-blue btn-lg" data-act="submit" data-id="' + p.id + '"' + (sel == null ? ' disabled' : '') + '>SUBMIT DECISION</button></div></div>';
}
function feedbackView(p) {
  const f = p.feedback;
  const vb = f.vBefore, va = f.vAfter;
  const chg = (l, a, b, u) => '<span>' + l + ' ' + a + '→' + b + (u || '') + '</span>';
  let h = '<div class="dec"><div class="dec-step">' + esc(f.label) + ' — result</div>' +
    '<div class="verdict ' + (f.correct ? 'good' : 'bad') + '"><div>' + icon(f.correct ? 'check' : 'x', 28) + '</div><div><h3>' + (f.correct ? 'Correct Decision' : 'Not the Best Decision') + '</h3><div>You chose <b>' + f.chosenLetter + '</b>: ' + esc(f.chosen) + '</div></div></div>' +
    '<div class="explain"><h4>Why</h4>' + esc(f.chosenFeedback) + '</div>';
  if (!f.correct) h += '<div class="explain" style="border-color:var(--stab)"><h4>The Best Answer Was</h4><b>' + esc(f.correctText) + '</b><div style="margin-top:6px">' + esc(f.correctFeedback) + '</div></div>';
  h += '<div class="explain"><h4>What Happened Next · ' + f.minutes + ' Simulated Minutes Passed</h4>' +
    '<div class="row" style="margin-bottom:8px"><span class="badge ' + statusClass(f.stBefore) + '">' + f.stBefore + '</span> → <span class="badge ' + statusClass(f.stAfter) + '">' + f.stAfter + '</span><span class="small muted">Severity ' + f.sevBefore + ' → ' + f.sevAfter + '</span></div>' +
    (vb && va ? '<div class="chg">' + chg('HR', vb.hr, va.hr) + chg('BP', vb.sbp + '/' + vb.dbp, va.sbp + '/' + va.dbp) + chg('SpO₂', vb.spo2, va.spo2, '%') + chg('RR', vb.rr, va.rr) + chg('T', fmtTemp(vb.temp), fmtTemp(va.temp), useF() ? ' °F' : ' °C ') + '</div>' : '') +
    (f.results && f.results.update && (f.correct || !f.rescue) ? '<p style="margin:10px 0 0">' + esc(f.results.update) + '</p>' : '') +
    ((f.results && ((f.results.labs || []).length || (f.results.imaging || []).length)) ? '<p class="small muted" style="margin:6px 0 0">New results have been added to the Laboratory and Imaging panels.</p>' : '') + '</div>';
  const next = p.outcome === 'deceased' ? 'View Outcome' : (currentDecision(p) ? (p.rescueActive ? 'Go to EMERGENCY Decision' : 'Continue to Next Decision') : 'Continue');
  h += '<div class="submit-row"><span></span><button class="btn btn-primary btn-lg" data-act="continue" data-id="' + p.id + '">' + next + ' →</button></div></div>';
  return h;
}
function debriefExtras(p) {
  const o = p.orders || [], good = o.filter(x => x.useful).length, extra = o.length - good;
  const reads = p.imaging.filter(im => im.readState === 'done'), readOk = reads.filter(im => im.readOk).length;
  let h = '';
  if (p.triage) h += '<h4 style="margin-top:10px">Triage</h4>You chose level ' + p.triage.level + ' (correct: ' + p.triage.correct + ').';
  if (o.length) h += '<h4 style="margin-top:10px">Tests Ordered</h4>' + good + ' useful, ' + extra + ' not needed.';
  if (reads.length) h += '<h4 style="margin-top:10px">Images You Read</h4>' + readOk + ' of ' + reads.length + ' read correctly.';
  const talk = p.log.find(l => l.talk); if (talk) h += '<h4 style="margin-top:10px">Bedside Manner</h4>' + (talk.correct ? 'Handled the conversation well.' : 'The conversation could have gone better.');
  return h;
}
function debrief(p) {
  const c = caseOf(p), ok = p.log.filter(l => l.correct && !l.pre).length, all = p.log.filter(l => !l.pre).length;
  return '<div class="explain" style="text-align:left;margin-top:14px"><h4>Final Diagnosis</h4><b>' + esc(c.finalDiagnosis) + '</b><h4 style="margin-top:10px">Key Learning Points</h4>' + esc(c.teaching) +
    '<h4 style="margin-top:10px">Your Decisions This Shift</h4>' + (all ? ok + ' of ' + all + ' correct' : 'No decisions made this shift') + debriefExtras(p) + '</div>' +
    '<div class="row" style="justify-content:center;margin-top:12px"><button class="btn" data-record="' + p.id + '">' + icon('list', 18) + 'Full Medical Record</button></div>';
}

/* ───────── Record ───────── */
function viewRecord(id, archivedP, shift) {
  const p = archivedP || S.patients.find(x => x.id === id);
  if (!p) return '<div class="panel empty">Record not found.</div>';
  const c = caseOf(p);
  const fl = ui.recFilter;
  const groups = { all: null, decision: ['decision', 'intervention', 'talk', 'triage'], results: ['lab', 'imaging', 'exam', 'order'], updates: ['update', 'presentation', 'vitals'], status: ['status', 'alert', 'outcome'] };
  const items = p.record.filter(r => !groups[fl] || groups[fl].indexOf(r.type) >= 0);
  const cor = p.log.filter(l => l.correct).length;
  const endT = p.archived ? (p.outcomeTime || p.endClock) : (isClosed(p) ? p.outcomeTime : S.clock);
  let h = '<div class="page-head"><div><h1>Medical Record — Patient ' + p.num + '</h1><p>' + esc(p.mrn || '') + (shift ? ' · Shift #' + shift.no : '') + ' · ' + p.age + ' y ' + (p.sex === 'F' ? 'female' : 'male') + ' · ' + esc(c.title) + ' · ' + c.specialty + ' · ' + c.difficulty + '</p></div><div class="row no-print">' +
    (p.archived ? '<button class="btn" data-go="#/history">' + icon('back', 18) + 'Past Shifts</button>' : isClosed(p) ? '<button class="btn" data-go="#/">' + icon('back', 18) + 'Waiting Room</button>' : '<button class="btn btn-primary" data-room="' + p.id + '">' + icon('back', 18) + 'Back to Treatment Room</button>') +
    '<button class="btn" data-act="print">Print</button></div></div>';
  h += '<div class="rec-head">' +
    '<div class="panel"><div class="panel-title">Original presentation</div><div class="small">' + esc(c.presentation) + '</div></div>' +
    '<div class="panel"><div class="panel-title">Initial vital signs</div><div class="mono small">' + esc(vitalsText(p.initialVitals)) + '</div><div class="panel-title" style="margin-top:12px">Current / final</div><div class="mono small">' + esc(vitalsText(p.archived ? p.finalVitals : vitals(p))) + '</div></div>' +
    '<div class="panel"><div class="panel-title">Summary</div><div class="small">Status: <span class="badge ' + statusClass(p.status) + '">' + p.status + '</span><br>Time elapsed: <b>' + fmtDur(endT - p.arrival) + '</b><br>Decisions: <b>' + cor + ' correct</b> / ' + (p.log.length - cor) + ' incorrect' +
      ((isClosed(p) || p.archived) ? '<br>Outcome: <b>' + (p.outcome === 'deceased' ? 'Died at ' + fmtClock(p.outcomeTime) : p.outcome === 'discharged' ? esc((c.disposition || {}).label) : 'Handed over at the end of the shift') + '</b><br>Final diagnosis: <b>' + esc(c.finalDiagnosis) + '</b>' : '') + '</div></div></div>' + (p.archived ? '' : visitsHtml(p));
  if (p.log.length) {
    h += '<div class="panel" style="margin-bottom:16px"><div class="panel-title">' + icon('check', 18) + 'Decisions submitted</div><table class="labs"><thead><tr><th>Time</th><th>Decision</th><th>Your answer</th><th>Result</th></tr></thead><tbody>' +
      p.log.map(l => '<tr><td class="mono small">' + fmtClock(l.t) + '</td><td><b>' + esc(l.n) + '</b><br><span class="small muted">' + esc(tc(l.title)) + '</span></td><td class="small">' + esc(l.chosen) + (l.correct ? '' : '<br><span class="small" style="color:var(--stab)">Best: ' + esc(l.correctText) + '</span>') + '</td><td>' + (l.correct ? '<span class="ok-t">✓ Correct</span>' : '<span class="bad-t">✗ Incorrect</span>') + (l.pre ? '<br><span class="small muted">Before Shift</span>' : '') + '</td></tr>').join('') + '</tbody></table></div>';
  }
  h += '<div class="panel"><div class="panel-title">' + icon('list', 18) + 'Full chronological record</div><div class="chips no-print">' +
    [['all', 'All'], ['decision', 'Decisions & Treatments'], ['results', 'Test Results'], ['updates', 'Clinical Updates'], ['status', 'Status & Alerts']].map(f => '<button class="chip' + (fl === f[0] ? ' on' : '') + '" data-recf="' + f[0] + '">' + f[1] + '</button>').join('') + '</div>' +
    '<ul class="rec-list">' + items.map(r => '<li><span class="mono small muted">' + fmtDay(r.t) + ' ' + fmtClock(r.t) + '</span><span class="rec-type rt-' + r.type + '">' + r.type + '</span><span>' + esc(r.text) + (r.detail ? '<br><span class="small muted">' + esc(r.detail) + '</span>' : '') + '</span></li>').join('') + '</ul></div>';
  return h;
}

/* ───────── Past shifts & returning patients ───────── */
function archiveShift() {
  const played = S.stats.correct + S.stats.incorrect > 0 || S.patients.some(p => isClosed(p) || p.generated || Object.keys(p.exam || {}).length);
  if (!played) return false;
  const shift = { id: uid(), no: S.shiftNo || 1, endedAt: Date.now(), startClock: 14 * 60, endClock: S.clock, stats: { correct: S.stats.correct, incorrect: S.stats.incorrect },
    patients: S.patients.map(p => ({ archived: true, id: p.id, mrn: p.mrn, num: p.num, caseId: p.caseId, age: p.age, sex: p.sex, bed: p.bed,
      status: isClosed(p) ? p.status : 'Handed Over', outcome: p.outcome, outcomeTime: p.outcomeTime, arrival: p.arrival, endClock: S.clock,
      returning: p.returning, initialVitals: p.initialVitals, finalVitals: vitals(p), log: p.log, record: p.record, exam: p.exam })) };
  S.history = [shift].concat(S.history || []);
  S.history.forEach((h, i) => { if (i >= 5) h.patients.forEach(ap => { if (ap.record && ap.record.length) { ap.record = []; ap.trimmed = true; } }); });
  return true;
}
function findArchived(shiftId, pid) {
  const h = (S.history || []).find(x => x.id === shiftId); if (!h) return null;
  const p = h.patients.find(x => x.id === pid); return p ? { shift: h, p: p } : null;
}
function pastVisits(mrn, excludeId) {
  if (!mrn) return [];
  const out = [];
  S.patients.forEach(q => { if (q.mrn === mrn && q.id !== excludeId && isClosed(q)) out.push({ shift: null, p: q }); });
  (S.history || []).forEach(h => h.patients.forEach(ap => { if (ap.mrn === mrn && ap.id !== excludeId) out.push({ shift: h, p: ap }); }));
  return out;
}
function ageGroup(a) { return a < 12 ? 'child' : a < 18 ? 'teen' : a < 65 ? 'adult' : 'older'; }
function canReturn(src) {
  if (!src || src.outcome !== 'discharged') return false;
  if (S.patients.some(q => q.mrn === src.mrn && !isClosed(q))) return false; // already in the department
  return LIB.some(c => c.sex === src.sex && ageGroup(c.age) === ageGroup(src.age));
}
function returnVisit(src, byAmbulance) {
  if (!canReturn(src)) return null;
  const seen = new Set(pastVisits(src.mrn).map(v => v.p.caseId).concat([src.caseId]));
  const fits = LIB.filter(c => c.sex === src.sex && ageGroup(c.age) === ageGroup(src.age));
  const fresh = fits.filter(c => !seen.has(c.id));
  const pool = fresh.length ? fresh : fits;
  const c = pool[Math.floor(Math.random() * pool.length)];
  const p = createPatient(c.id, { age: src.age, generated: true, mrn: src.mrn, returning: true, prevNum: src.num, startSeverity: clamp(c.startSeverity + Math.round(Math.random() * 6 - 3), 5, 90) });
  const prevCase = CASES[src.caseId];
  addUpdate(p, 'Returning patient (' + p.mrn + '). Previous visit: ' + (prevCase ? prevCase.finalDiagnosis : 'see chart') + '. Review their past records in the Patient Information panel.', 'info');
  S.patients.push(p);
  S.alerts.unshift({ id: uid(), pid: p.id, num: p.num, t: S.clock, kind: byAmbulance ? 'Returning patient by ambulance' : 'Returning patient', text: 'Patient ' + p.num + ' (' + p.age + p.sex + ', ' + p.mrn + ') is back in ' + p.bed + ' with a new problem: ' + c.chiefComplaint + '. Previous visit: ' + (prevCase ? prevCase.finalDiagnosis : '') + '.', status: p.status, read: !byAmbulance });
  if (byAmbulance) ui.beep = true;
  return p;
}
function returnCandidates() {
  const list = S.patients.filter(canReturn);
  (S.history || []).forEach(h => h.patients.forEach(ap => { if (canReturn(ap) && !list.some(x => x.mrn === ap.mrn)) list.push(ap); }));
  return list;
}
function visitsHtml(p) {
  const v = pastVisits(p.mrn, p.id);
  if (!v.length) return '';
  return '<div class="visits"><div class="panel-title" style="margin:14px 0 8px">' + icon('clock', 18) + 'Previous Visits (' + v.length + ')</div>' + v.map(x => {
    const c = CASES[x.p.caseId]; const when = x.shift ? 'Shift #' + x.shift.no + ' · ' + new Date(x.shift.endedAt).toLocaleDateString() : 'Earlier this shift';
    const link = x.shift ? '#/past/' + x.shift.id + '/' + x.p.id : '#/record/' + x.p.id;
    return '<button class="visit" data-go="' + link + '"><span><b>' + esc(c ? c.finalDiagnosis : x.p.caseId) + '</b><small>' + when + ' · Patient ' + x.p.num + '</small></span><span class="badge ' + statusClass(x.p.status) + '">' + esc(x.p.status) + '</span></button>';
  }).join('') + '</div>';
}
function viewHistory() {
  const H = S.history || [];
  let h = '<div class="page-head"><div><h1>Past Shifts</h1><p>Every shift is saved here when you start a new simulation. Open any patient\'s full record, or bring a discharged patient back for a return visit.</p></div>' +
    '<button class="btn btn-primary" data-act="new-sim">' + icon('refresh', 18) + 'End Shift & Start a New One</button></div>';
  if (!H.length) return h + '<div class="panel empty">No past shifts yet. Your current shift (Shift #' + (S.shiftNo || 1) + ') will appear here when you end it.</div>';
  return h + H.map(sh => {
    const tot = sh.stats.correct + sh.stats.incorrect;
    const dis = sh.patients.filter(p => p.outcome === 'discharged').length, dead = sh.patients.filter(p => p.outcome === 'deceased').length;
    return '<section class="panel shift"><div class="shift-h"><div><h2>Shift #' + sh.no + '</h2><div class="small muted">' + new Date(sh.endedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) + ' · ' + fmtDur(sh.endClock - sh.startClock) + ' simulated</div></div>' +
      '<div class="chips-row"><span class="chip">' + sh.patients.length + ' Patients</span><span class="chip">' + dis + ' Discharged</span><span class="chip">' + dead + ' Deaths</span><span class="chip">' + (tot ? Math.round(100 * sh.stats.correct / tot) + '% Accuracy' : 'No Decisions') + '</span>' +
      '<button class="btn btn-sm" data-act="del-shift" data-shift="' + sh.id + '">Delete</button></div></div>' +
      '<div class="tbl-wrap"><table class="labs"><thead><tr><th>Patient</th><th>Case</th><th>Outcome</th><th>Decisions</th><th></th></tr></thead><tbody>' +
      sh.patients.map(p => { const c = CASES[p.caseId], mine = (p.log || []).filter(l => !l.pre), ok = mine.filter(l => l.correct).length;
        return '<tr><td><b>' + p.num + '</b>' + (p.returning ? ' <span class="ret">↩</span>' : '') + '<br><span class="small muted mono">' + esc(p.mrn || '') + '</span></td><td>' + esc(c ? c.title : p.caseId) + (c ? '<br><span class="diff diff-' + c.difficulty + '">' + c.difficulty + '</span>' : '') + '</td><td><span class="badge ' + statusClass(p.status) + '">' + esc(p.status) + '</span></td><td class="small">' + (mine.length ? ok + '/' + mine.length + ' correct' : '—') + '</td>' +
          '<td class="row" style="gap:6px;justify-content:flex-end">' + (p.trimmed ? '<span class="small muted">Summary only</span>' : '<button class="btn btn-sm" data-go="#/past/' + sh.id + '/' + p.id + '">View Record</button>') +
          (canReturn(p) ? '<button class="btn btn-sm btn-primary" data-act="return-past" data-shift="' + sh.id + '" data-pid="' + p.id + '">Bring Back</button>' : '') + '</td></tr>'; }).join('') +
      '</tbody></table></div></section>';
  }).join('');
}
function viewPastRecord(shiftId, pid) {
  const a = findArchived(shiftId, pid);
  if (!a) return '<div class="panel empty">This record is no longer available. <button class="btn" data-go="#/history">Past Shifts</button></div>';
  return viewRecord(null, a.p, a.shift);
}

/* ───────── Library / add patient ───────── */
function viewLibrary() {
  const f = ui.lib;
  const list = LIB.filter(c => (!f.spec || c.specialty === f.spec) && (!f.diff || c.difficulty === f.diff));
  let h = '<div class="page-head"><div><h1>Case Library &amp; Admissions</h1><p>' + LIB.length + ' fictional cases across ' + SPECIALTIES.length + ' specialties. Each admission generates a new patient with slight variations.</p></div>' +
    '<div class="row"><button class="btn btn-primary" data-act="gen">' + icon('plus', 18) + 'Generate Random Patient' + (f.spec || f.diff ? ' (filtered)' : '') + '</button></div></div>';
  h += '<div class="toolbar"><select data-change="spec"><option value="">All Specialties</option>' + SPECIALTIES.map(s => '<option' + (f.spec === s ? ' selected' : '') + '>' + s + '</option>').join('') + '</select>' +
    '<select data-change="diff"><option value="">All Difficulties</option>' + DIFFS.map(s => '<option' + (f.diff === s ? ' selected' : '') + '>' + s + '</option>').join('') + '</select><span class="small muted">' + list.length + ' case(s)</span></div>';
  h += '<div class="lib-grid">' + list.map(c => '<div class="card lib-card"><div class="row" style="justify-content:space-between"><span class="spec">' + icon(c.specialty, 18) + c.specialty + '</span><span class="diff diff-' + c.difficulty + '">' + c.difficulty + '</span></div>' +
    '<h3>' + esc(c.title) + '</h3><p>' + esc(c.age) + ' y ' + (c.sex === 'F' ? 'female' : 'male') + ' · ' + esc(tc(c.chiefComplaint)) + '<br><span class="muted">' + c.decisions.length + ' decisions' + (c.canDie ? ' · life-threatening' : '') + '</span></p>' +
    '<button class="btn btn-sm btn-primary" data-admit="' + c.id + '">' + icon('plus', 16) + 'Admit as New Patient</button></div>').join('') + '</div>';
  return h;
}

/* ───────── Shift report ───────── */
function viewReport() {
  const tot = S.stats.correct + S.stats.incorrect;
  const byDiff = {}; DIFFS.forEach(d => { byDiff[d] = { c: 0, t: 0 }; });
  S.patients.forEach(p => p.log.filter(l => !l.pre).forEach(l => { const d = caseOf(p).difficulty; byDiff[d].t++; if (l.correct) byDiff[d].c++; }));
  let h = '<div class="page-head"><div><h1>Shift Report</h1><p>Simulation running for ' + fmtDur(S.clock - 14 * 60) + ' of simulated time.</p></div><button class="btn" data-act="print">Print</button></div>';
  h += '<div class="stats">' + stat('Decisions made', tot, 'this simulation') + stat('Correct', S.stats.correct, tot ? Math.round(100 * S.stats.correct / tot) + '% accuracy' : '—', 'var(--stab)') + stat('Incorrect', S.stats.incorrect, 'learning opportunities', 'var(--crit)') +
    stat('Discharged', S.patients.filter(p => p.outcome === 'discharged').length, 'patients') + stat('Deaths', S.patients.filter(p => p.outcome === 'deceased').length, 'patients') + stat('Lessons done', Object.keys(S.edu.completed).length, 'education quizzes') + '</div>';
  h += '<div class="panel" style="margin-bottom:16px"><div class="panel-title">Accuracy by difficulty</div>' + DIFFS.map(d => { const x = byDiff[d], pc = x.t ? Math.round(100 * x.c / x.t) : 0; return '<div style="margin-bottom:10px"><div class="row" style="justify-content:space-between"><span class="diff diff-' + d + '">' + d + '</span><span class="small mono">' + (x.t ? x.c + '/' + x.t + ' · ' + pc + '%' : 'no decisions yet') + '</span></div><div class="bar"><i style="width:' + pc + '%"></i></div></div>'; }).join('') + '</div>';
  h += '<div class="panel"><div class="panel-title">All patients</div><table class="labs"><thead><tr><th>Patient</th><th>Case</th><th>Status</th><th>Progress</th><th>Decisions (this shift)</th><th>Time</th><th></th></tr></thead><tbody>' +
    S.patients.map(p => { const c = caseOf(p), mine = p.log.filter(l => !l.pre), ok = mine.filter(l => l.correct).length; return '<tr><td><b>' + p.num + '</b></td><td>' + esc(c.title) + '<br><span class="diff diff-' + c.difficulty + '">' + c.difficulty + '</span></td><td><span class="badge ' + statusClass(p.status) + '">' + p.status + '</span></td><td class="small">' + Math.min(p.decisionIndex, c.decisions.length) + '/' + c.decisions.length + '</td><td class="small">' + (mine.length ? ok + '/' + mine.length + ' correct' : '—') + '</td><td class="mono small">' + fmtDur((isClosed(p) ? p.outcomeTime : S.clock) - p.arrival) + '</td><td><button class="btn btn-sm" data-record="' + p.id + '">Record</button></td></tr>'; }).join('') + '</tbody></table></div>';
  return h;
}

/* ───────── Modals ───────── */
function renderModal() {
  const m = ui.modal, root = document.getElementById('modal-root');
  if (!m) { root.innerHTML = ''; return; }
  let inner = '';
  if (m.type === 'discharge') {
    const p = S.patients.find(x => x.id === m.id); if (!p) { ui.modal = null; root.innerHTML = ''; return; }
    if (isClosed(p)) {
      inner = '<div class="modal-h"><h2>Discharge — Patient ' + p.num + '</h2><button class="x" data-act="close">×</button></div><div class="modal-b">This patient\'s care in the department has already ended (' + p.status + ').</div><div class="modal-f"><button class="btn" data-act="close">Close</button></div>';
    } else {
      const ev = dischargeEval(p);
      inner = '<div class="modal-h"><h2>Discharge-Readiness Evaluation · Patient ' + p.num + '</h2><button class="x" data-act="close" aria-label="Close">×</button></div><div class="modal-b">' +
        '<div class="verdict ' + (ev.ok ? 'good' : 'bad') + '" style="margin-bottom:12px"><div>' + icon(ev.ok ? 'check' : 'x', 26) + '</div><div><h3>' + (ev.ok ? 'Safe to Proceed' : 'Discharge Is NOT Safe Yet') + '</h3><div class="small">' + (ev.ok ? 'Planned disposition: <b>' + esc(ev.disp.label) + '</b>' : 'The patient does not meet the safety criteria below. Continue treatment and re-evaluate.') + '</div></div></div>' +
        '<ul class="check">' + ev.checks.map(ch => '<li class="' + (ch.pass ? 'pass' : 'fail') + '"><span class="ic">' + (ch.pass ? '✓' : '✗') + '</span><div>' + esc(tc(ch.label)) + (ch.detail && !ch.pass ? '<small>' + esc(ch.detail) + '</small>' : '') + '</div></li>').join('') + '</ul></div>' +
        '<div class="modal-f">' + (ev.ok ? '<button class="btn" data-act="close">Not Yet</button><button class="btn btn-primary" data-act="confirm-discharge" data-id="' + p.id + '">Confirm: ' + esc(ev.disp.label) + '</button>' : '<button class="btn btn-primary" data-act="close">Continue Treatment</button>') + '</div>';
    }
  } else if (m.type === 'confirm') {
    inner = '<div class="modal-h"><h2>' + esc(m.title) + '</h2><button class="x" data-act="close">×</button></div><div class="modal-b">' + esc(m.text) + '</div><div class="modal-f"><button class="btn" data-act="close">Cancel</button><button class="btn btn-danger" data-act="confirm-yes">' + esc(m.yes) + '</button></div>';
  } else if (m.type === 'signin') {
    inner = signinModalHtml();
  } else if (m.type === 'settings') {
    const sw = (key, title, sub) => '<div class="switch"><div><b>' + title + '</b><small>' + sub + '</small></div><input type="checkbox" data-setting="' + key + '"' + (S.settings[key] ? ' checked' : '') + ' style="width:22px;height:22px"></div>';
    inner = '<div class="modal-h"><h2>Simulation Settings</h2><button class="x" data-act="close">×</button></div><div class="modal-b">' +
      sw('live', 'Live Clock', 'When on, 5 simulated minutes pass every 20 real seconds. When off, time only moves when you act.') +
      sw('busy', 'Busy Shift Mode', 'Ambulances keep arriving and surprise events happen: mass-casualty crashes, a broken CT scanner, lab delays and short staffing.') +
      sw('glossary', 'Medical Word Helper', 'Medical words are underlined — tap one to see what it means.') +
      sw('arrivals', 'Ambulance Arrivals', 'A new patient arrives every ' + S.settings.arrivalEvery + ' simulated minutes (up to 8 active patients).') +
      '<div class="switch"><div><b>Temperature Units</b><small>Show body temperatures in Celsius or Fahrenheit everywhere in the simulator.</small></div><select id="set-temp" data-tempunit><option value="C"' + (useF() ? '' : ' selected') + '>Celsius</option><option value="F"' + (useF() ? ' selected' : '') + '>Fahrenheit</option></select></div>' +
      sw('soundOn', 'Hospital Sounds', 'Master switch for every sound in the simulator.') +
      sw('ambient', 'Ambient Hospital Noise', 'Ventilation hum, overhead paging chimes, distant monitors and trolleys.') +
      sw('monitor', 'Bedside Monitor Beeps', 'A beep for every heartbeat in the treatment room. The pitch drops when oxygen levels fall.') +
      sw('sound', 'Alarms & Alert Tones', 'Bedside alarms when vital signs are abnormal, and emergency alert tones.') +
      '<div class="switch"><div><b>Volume</b></div><input type="range" min="0" max="1" step="0.05" value="' + (S.settings.volume == null ? 0.7 : S.settings.volume) + '" data-volume style="width:160px"></div>' +
      '<p class="small muted">Progress saves automatically in this browser after every action. Use Export in the menu for a backup file.</p></div><div class="modal-f"><button class="btn btn-primary" data-act="close">Done</button></div>';
  }
  root.innerHTML = convTemps('<div class="modal-bg" data-act="close-bg"><div class="modal" role="dialog" aria-modal="true">' + inner + '</div></div>');
}

/* ───────── Routing ───────── */
function route(hh) {
  const h = (typeof hh === 'string' && hh) || location.hash || '#/';
  const m = h.match(/^#\/(room|record)\/(.+)$/);
  if (m) ui.route = { name: m[1], id: m[2] };
  else if (h.indexOf('#/library') === 0) ui.route = { name: 'library' };
  else if (h.indexOf('#/report') === 0) ui.route = { name: 'report' };
  else if (h.indexOf('#/profile') === 0) ui.route = { name: 'profile' };
  else if (h.indexOf('#/history') === 0) ui.route = { name: 'history' };
  else if (/^#\/past\/[^/]+\/.+$/.test(h)) { const m2 = h.split('/'); ui.route = { name: 'past', shift: m2[2], pid: m2[3] }; }
  else if (h.indexOf('#/learn') === 0) { ui.route = { name: 'learn' }; const t = h.split('/')[2]; if (t) ui.eduTopic = t; }
  else ui.route = { name: 'dash' };
  ui.menu = null;
  if (ui.route.name === 'room') {
    const p = S.patients.find(x => x.id === ui.route.id);
    if (p) { S.lastRoom = p.id; S.alerts.forEach(a => { if (a.pid === p.id) a.read = true; }); }
  }
  render(); window.scrollTo(0, 0);
}

/* ───────── Events ───────── */
function findP(el) { return S.patients.find(x => x.id === el.getAttribute('data-id')); }
document.addEventListener('click', e => {
  const t = e.target.closest('[data-order],[data-read],[data-exam],[data-listen],[data-go],[data-act],[data-room],[data-record],[data-pick],[data-dismiss],[data-admit],[data-recf]');
  if (!t) { if (ui.menu) { ui.menu = null; renderTop(); } return; }
  if (t.hasAttribute('data-go')) { ui.modal = null; go(t.getAttribute('data-go')); return; }
  if (t.hasAttribute('data-room')) { ui.modal = null; enterRoom(t.getAttribute('data-room')); return; }
  if (t.hasAttribute('data-record')) { ui.modal = null; ui.recFilter = 'all'; go('#/record/' + t.getAttribute('data-record')); return; }
  if (t.hasAttribute('data-order')) { const p = findP(t); if (p) { ui.ordersOpen = true; orderTest(p, t.getAttribute('data-order')); save(); ui.keepScroll = true; render(); } return; }
  if (t.hasAttribute('data-read')) { const p = findP(t); if (p) { submitRead(p, +t.getAttribute('data-read'), +t.getAttribute('data-choice')); save(); ui.keepScroll = true; render(); } return; }
  if (t.hasAttribute('data-exam')) { const p = findP(t); if (p) clickRegion(p, t.getAttribute('data-exam')); return; }
  if (t.hasAttribute('data-listen')) { const p = findP(t); if (p && window.SND) { const v = vitals(p); SND.exam(t.getAttribute('data-listen'), v ? v.hr : 80); } return; }
  if (t.hasAttribute('data-recf')) { ui.recFilter = t.getAttribute('data-recf'); ui.keepScroll = true; render(); return; }
  if (t.hasAttribute('data-dismiss')) { const a = S.alerts.find(x => x.id === t.getAttribute('data-dismiss')); if (a) a.read = true; save(); renderTop(); renderToasts(); return; }
  if (t.hasAttribute('data-admit')) { const p = admitCase(t.getAttribute('data-admit'), false); save(); enterRoom(p.id); return; }
  if (t.hasAttribute('data-pick')) { const p = findP(t); ui.selected[p.id] = +t.getAttribute('data-pick'); ui.keepScroll = true; render(); return; }
  const act = t.getAttribute('data-act'), p = t.hasAttribute('data-id') ? findP(t) : null;
  switch (act) {
    case 'menu-alerts': ui.menu = ui.menu === 'alerts' ? null : 'alerts'; renderTop(); break;
    case 'menu-main': ui.menu = ui.menu === 'main' ? null : 'main'; renderTop(); break;
    case 'clear-alerts': S.alerts.forEach(a => { a.read = true; }); ui.menu = null; save(); render(); break;
    case 'layer': ui.bodyLayer = t.getAttribute('data-layer'); ui.keepScroll = true; render(); break;
    case 'return-cur': { const np = p ? returnVisit(p, false) : null; save(); if (np) enterRoom(np.id); break; }
    case 'return-past': { const a = findArchived(t.getAttribute('data-shift'), t.getAttribute('data-pid')); const np = a ? returnVisit(a.p, false) : null; save(); if (np) enterRoom(np.id); break; }
    case 'del-shift': { const sid = t.getAttribute('data-shift'); ui.modal = { type: 'confirm', title: 'Delete this past shift?', text: 'Its patient records will be removed from Past Shifts. Your career stats are not affected.', yes: 'Delete Shift', fn: () => { S.history = (S.history || []).filter(h => h.id !== sid); save(); render(); } }; renderModal(); break; }
    case 'orders-toggle': ui.ordersOpen = !ui.ordersOpen; break;
    case 'talk-pick': if (p) { ui.talkSel = ui.talkSel || {}; ui.talkSel[p.id] = +t.getAttribute('data-i'); ui.keepScroll = true; render(); } break;
    case 'talk-submit': if (p) { submitTalk(p); save(); render(); window.scrollTo(0, 0); } break;
    case 'talk-continue': if (p) { p.talkFb = null; save(); render(); window.scrollTo(0, 0); } break;
    case 'esi-pick': if (p) { ui.esiSel = ui.esiSel || {}; ui.esiSel[p.id] = +t.getAttribute('data-level'); ui.keepScroll = true; render(); } break;
    case 'triage-submit': if (p) { submitTriage(p); save(); render(); window.scrollTo(0, 0); } break;
    case 'triage-continue': if (p) { p.triageFb = null; save(); render(); window.scrollTo(0, 0); } break;
    case 'toggle-sound': S.settings.soundOn = S.settings.soundOn === false; if (window.SND) SND.unlock(); save(); renderTop(); syncSound(); break;
    case 'toggle-live': S.settings.live = !S.settings.live; save(); renderTop(); break;
    case 'submit': if (p && ui.selected[p.id] != null) { ui.keepScroll = false; submitDecision(p, ui.selected[p.id]); window.scrollTo(0, 0); } break;
    case 'continue': if (p) { p.feedback = null; save(); render(); window.scrollTo(0, 0); } break;
    case 'observe':
      if (p) { advanceTime(15); rec(p, 'intervention', 'Doctor observed the patient for 15 minutes.'); addUpdate(p, 'Observed for 15 minutes. ' + describeTrend(p), 'info'); save(); ui.keepScroll = true; render(); }
      break;
    case 'reassess':
      if (p) { advanceTime(5); if (!isClosed(p)) { snapshot(p); rec(p, 'vitals', 'Bedside reassessment: ' + vitalsText(vitals(p))); addUpdate(p, 'Bedside reassessment: ' + vitalsText(vitals(p)) + '. ' + describeTrend(p), 'info'); } save(); ui.keepScroll = true; render(); }
      break;
    case 'observe-all': ui.menu = null; advanceTime(15); save(); ui.keepScroll = true; render(); break;
    case 'discharge': if (p) { ui.modal = { type: 'discharge', id: p.id }; renderModal(); } break;
    case 'confirm-discharge': if (p) { confirmDischarge(p); ui.modal = null; ui.keepScroll = true; render(); } break;
    case 'reset': if (p) { ui.modal = { type: 'confirm', title: 'Restart Patient ' + p.num + '\'s Case?', text: 'This erases this patient\'s record and returns them to where their case began in this simulation. Other patients are not affected.', yes: 'Restart Case', fn: () => { resetPatient(p); render(); } }; renderModal(); } break;
    case 'new-sim': ui.menu = null; ui.modal = { type: 'confirm', title: 'Start a New Simulation?', text: 'Your current shift (Shift #' + (S.shiftNo || 1) + ') will be saved in Past Shifts, where you can reopen every patient\'s record. A new shift then starts with the four starting patients. Your profile, career stats and education progress are kept.', yes: 'End Shift & Start New', fn: () => { archiveShift(); const keep = { edu: S.edu, career: S.career, profile: S.profile, settings: S.settings, history: S.history, shiftNo: (S.shiftNo || 1) + 1 }; newState(); Object.assign(S, keep); save(); go('#/'); } }; render(); break;
    case 'confirm-yes': { const fn = ui.modal && ui.modal.fn; ui.modal = null; if (fn) fn(); else render(); break; }
    case 'signin': ui.menu = null; ui.signin = null; ui.modal = { type: 'signin' }; render(); setTimeout(() => { const el = document.getElementById('si-user'); if (el) el.focus(); }, 30); break;
    case 'signin-go': doSignIn(); break;
    case 'signout': ui.menu = null; renderTop(); signOut(); break;
    case 'close': ui.modal = null; renderModal(); break;
    case 'close-bg': if (e.target === t) { ui.modal = null; renderModal(); } break;
    case 'settings': ui.menu = null; ui.modal = { type: 'settings' }; render(); break;
    case 'add-random': { ui.menu = null; const np = admitRandom(false); save(); if (np) enterRoom(np.id); break; }
    case 'gen': { const np = admitRandom(false, ui.lib); save(); if (np) enterRoom(np.id); break; }
    case 'export': exportSave(); ui.menu = null; renderTop(); break;
    case 'import': ui.menu = null; renderTop(); document.getElementById('import-file').click(); break;
    case 'print': window.print(); break;
    default:
      if ((window.EDU && window.EDU.handle(act, t, ui, S)) || (window.PROFILE && window.PROFILE.handle(act, t, ui, S))) { save(); ui.keepScroll = true; render(); }
  }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.matches('[data-prof]')) { S.profile[t.getAttribute('data-prof')] = t.value.slice(0, 300); save(); renderTop(); const b = document.querySelector('.idbadge'); if (b && window.PROFILE) b.outerHTML = PROFILE.badge(S, icon); }
  else if (t.matches('[data-change="sort"]')) { ui.sort = t.value; render(); }
  else if (t.matches('[data-change="spec"]')) { ui.lib.spec = t.value; render(); }
  else if (t.matches('[data-change="diff"]')) { ui.lib.diff = t.value; render(); }
  else if (t.matches('[data-setting]')) { const k = t.getAttribute('data-setting'); S.settings[k] = t.checked; if (k === 'busy' && t.checked) { S.nextEventAt = S.clock + 45; S.nextArrival = Math.min(S.nextArrival || 0, S.clock + 30); } save(); renderTop(); syncSound(); if (k === 'glossary') { ui.keepScroll = true; render(); } }
  else if (t.matches('[data-tempunit]')) { S.settings.tempUnit = t.value; save(); ui.keepScroll = true; render(); }
  else if (t.matches('[data-volume]')) { S.settings.volume = +t.value; save(); syncSound(); }
  else if (t.id === 'import-file' && t.files[0]) {
    const r = new FileReader();
    r.onload = () => { try { const s = JSON.parse(r.result); if (s.v !== 1 || !Array.isArray(s.patients)) throw new Error('bad'); s.patients = s.patients.filter(p => CASES[p.caseId]); S = s; save(); go('#/'); } catch (err) { alert('That file is not a valid ER Simulator save.'); } t.value = ''; };
    r.readAsText(t.files[0]);
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && ui.modal) { ui.modal = null; renderModal(); } });
function describeTrend(p) {
  if (isClosed(p)) return '';
  const r = trendRate(p);
  if (r < -0.05) return 'The patient appears to be improving.';
  if (r > 1.2) return 'The patient appears to be getting worse — act soon.';
  if (r > 0.05) return 'The patient is slowly getting worse without further treatment.';
  return 'No major change.';
}
function exportSave() {
  const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'er-simulator-save.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* Chart hover */
function chartHover(e) {
  const box = e.target.closest && e.target.closest('.mini'); const tip = document.getElementById('chart-tip');
  if (!box) { tip.hidden = true; document.querySelectorAll('.mini .cross').forEach(l => l.setAttribute('opacity', '0')); return; }
  const ch = ui.charts[box.getAttribute('data-chart')]; if (!ch) return;
  const svg = box.querySelector('svg'), rc = svg.getBoundingClientRect();
  const x = (e.clientX - rc.left) / rc.width * ch.W;
  let best = ch.pts[0]; ch.pts.forEach(pt => { if (Math.abs(pt.x - x) < Math.abs(best.x - x)) best = pt; });
  const line = svg.querySelector('.cross'); line.setAttribute('x1', best.x); line.setAttribute('x2', best.x); line.setAttribute('opacity', '1');
  tip.hidden = false; tip.textContent = fmtClock(best.t) + ' · ' + ch.label + ' ' + best.v + ' ' + ch.unit;
  tip.style.left = Math.min(window.innerWidth - 180, e.clientX + 12) + 'px'; tip.style.top = (e.clientY - 34) + 'px';
}
document.addEventListener('pointermove', chartHover);
document.addEventListener('pointerdown', e => { if (e.target.closest && e.target.closest('.mini')) chartHover(e); });

/* Live clock */
setInterval(() => {
  if (!S.settings.live || ui.modal || document.hidden) return;
  advanceTime(5); save(); ui.keepScroll = true; render();
}, 20000);

/* ───────── Boot ───────── */
tcCases();
S = load();
if (!S) { bootFresh = true; newState(); }
function normalize() {
  S.edu = S.edu || { completed: {} };
  S.settings = Object.assign({ soundOn: true, ambient: true, monitor: true, sound: true, volume: 0.7, glossary: true, busy: false }, S.settings);
  S.events = S.events || {};
  S.patients.forEach(p => { p.exam = p.exam || {}; });
  S.history = S.history || []; S.shiftNo = S.shiftNo || 1;
  S.patients.forEach(p => { if (!p.mrn) p.mrn = newMrn(); });
  S.career = Object.assign({ correct: 0, incorrect: 0, discharged: 0, deaths: 0, exams: 0, rescues: 0, streak: 0, bestStreak: 0, perfect: 0, specs: [] }, S.career);
  S.profile = Object.assign({ name: '', specialty: 'Emergency Medicine', color: '#1d5fbf', icon: 'steth', motto: '', why: '', idNo: 'RVR-' + Math.floor(10000 + Math.random() * 89999) }, S.profile);
}
normalize();
document.addEventListener('pointerdown', () => { if (window.SND && S.settings.soundOn !== false) { SND.unlock(); syncSound(); } }, true);
document.addEventListener('input', e => {
  if (e.target.matches && e.target.matches('[data-prof]')) {
    S.profile[e.target.getAttribute('data-prof')] = e.target.value.slice(0, 300); save();
    const b = document.querySelector('.idbadge'); if (b && window.PROFILE) b.outerHTML = PROFILE.badge(S, icon);
    renderTop(); return;
  } if (e.target.matches && e.target.matches('[data-volume]')) { S.settings.volume = +e.target.value; syncSound(); } });
window.addEventListener('hashchange', () => route(location.hash));
window.ER = { get state() { return S; }, advanceTime: m => { advanceTime(m); save(); render(); }, CASES: CASES };
route();
initCloud();
initAccounts();
document.addEventListener('keydown', e => { if (e.key === 'Enter' && ui.modal && ui.modal.type === 'signin' && e.target && (e.target.id === 'si-user' || e.target.id === 'si-pass')) { e.preventDefault(); doSignIn(); } });
})();
