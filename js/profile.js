/* Doctor profile: ID badge, rank progression (XP), career stats, achievements. */
(function () {
'use strict';
const esc = window.UTIL.esc;
const RANKS = [
  { xp: 0, name: 'Medical Student' },
  { xp: 150, name: 'Intern' },
  { xp: 400, name: 'Junior Resident' },
  { xp: 800, name: 'Senior Resident' },
  { xp: 1400, name: 'Chief Resident' },
  { xp: 2200, name: 'Attending Physician' },
  { xp: 3500, name: 'Chief of Emergency Medicine' }
];
const SPECIALTIES = ['Emergency Medicine', 'Cardiology', 'Respiratory', 'Neurology', 'Gastroenterology', 'Infectious Disease', 'Endocrinology', 'Trauma Surgery', 'Orthopedics', 'Pediatrics'];
const COLORS = [['#1d5fbf', 'Ceil Blue'], ['#0f7c8c', 'Teal'], ['#2e7d32', 'Surgical Green'], ['#5b3fa6', 'Royal Purple'], ['#b5375b', 'Wine'], ['#0b2545', 'Navy'], ['#d9640a', 'Sunrise Orange']];
const ICONS = [['steth', 'Stethoscope'], ['Cardiology', 'Heart'], ['Neurology', 'Brain'], ['Respiratory', 'Lungs'], ['Orthopedics', 'Bone'], ['Pediatrics', 'Child Care'], ['Emergency Medicine', 'Medical Cross']];

function xp(S) {
  const c = S.career || {}, quiz = Object.values((S.edu || {}).completed || {}).reduce((a, b) => a + b, 0);
  return c.correct * 10 + c.incorrect * 2 + c.discharged * 25 + c.rescues * 15 + c.exams + quiz * 5 + c.bestStreak * 3 + (c.goodTests || 0) * 3 + (c.readsOk || 0) * 5 + (c.talkOk || 0) * 8 + (c.triageOk || 0) * 5 + (c.dxBonus || 0) + (c.cprSaves || 0) * 20 + (c.cprPractice ? 10 : 0) + (c.dailyDone || 0) * 20 + (window.LAB ? LAB.passedCount(S) * 15 : 0) + (c.skillCase || 0) * 5 + Object.keys(c.orCases || {}).length * 30;
}
function rank(S) {
  const x = xp(S); let i = 0;
  RANKS.forEach((r, k) => { if (x >= r.xp) i = k; });
  const next = RANKS[i + 1];
  return { name: RANKS[i].name, level: i + 1, xp: x, next: next, pct: next ? Math.round(100 * (x - RANKS[i].xp) / (next.xp - RANKS[i].xp)) : 100 };
}
function achievements(S) {
  const c = S.career || {}, done = (S.edu || {}).completed || {};
  const perfectQuiz = (window.EDU ? window.EDU.topics : []).some(t => done[t.id] === t.quiz.length);
  return [
    { id: 'first', name: 'First Day on the Job', desc: 'Submit your first clinical decision.', got: c.correct + c.incorrect >= 1, icon: 'steth' },
    { id: 'eye', name: 'Sharp Eye', desc: 'Examine 15 body areas.', got: c.exams >= 15, icon: 'eye' },
    { id: 'safe', name: 'Safe Discharge', desc: 'Discharge your first patient safely.', got: c.discharged >= 1, icon: 'exit' },
    { id: 'life', name: 'Lifesaver', desc: 'Handle an emergency intervention correctly.', got: c.rescues >= 1, icon: 'Emergency Medicine' },
    { id: 'streak', name: 'On a Roll', desc: 'Make 5 correct decisions in a row.', got: c.bestStreak >= 5, icon: 'check' },
    { id: 'perfect', name: 'Textbook Case', desc: 'Discharge a patient with every decision this shift correct.', got: c.perfect >= 1, icon: 'list' },
    { id: 'explorer', name: 'Explorer', desc: 'Treat patients from 5 different specialties.', got: (c.specs || []).length >= 5, icon: 'Neurology' },
    { id: 'scholar', name: 'Scholar', desc: 'Complete 5 Education quizzes.', got: Object.keys(done).length >= 5, icon: 'book' },
    { id: 'top', name: 'Top of the Class', desc: 'Score 100% on any quiz.', got: perfectQuiz, icon: 'chart' },
    { id: 'ten', name: 'Busy Shift', desc: 'Discharge 10 patients.', got: c.discharged >= 10, icon: 'clock' },
    { id: 'expert', name: 'Expert Clinician', desc: 'Make 50 correct decisions.', got: c.correct >= 50, icon: 'Cardiology' },
    { id: 'reader', name: 'Sharp Reader', desc: 'Read 5 ECGs, X-rays or scans correctly yourself.', got: (c.readsOk || 0) >= 5, icon: 'scan' },
    { id: 'listener', name: 'Good Listener', desc: 'Handle 5 patient or family conversations well.', got: (c.talkOk || 0) >= 5, icon: 'steth' },
    { id: 'triage', name: 'Triage Pro', desc: 'Assign 10 correct triage levels.', got: (c.triageOk || 0) >= 10, icon: 'Emergency Medicine' },
    { id: 'steward', name: 'Smart Tester', desc: 'Order 20 useful tests.', got: (c.goodTests || 0) >= 20, icon: 'flask' },
    { id: 'detective', name: 'Medical Detective', desc: 'Guess 5 final diagnoses correctly.', got: (c.dxOk || 0) >= 5, icon: 'eye' },
    { id: 'cpr', name: 'Heart Restarter', desc: 'Bring a patient back with good CPR.', got: (c.cprSaves || 0) >= 1, icon: 'Cardiology' },
    { id: 'cprpro', name: 'Steady Hands', desc: 'Score 90% or more in CPR Practice.', got: (c.cprBest || 0) >= 90, icon: 'check' },
    { id: 'lab', name: 'Skills Lab Graduate', desc: 'Pass all six Skills Lab skills.', got: !!window.LAB && LAB.passedCount(S) >= LAB.SKILLS.length, icon: 'check' },
    { id: 'scrub', name: 'Scrubbed In', desc: 'Complete an operation in the Operating Room.', got: (c.orOps || 0) >= 1, icon: 'Trauma' },
    { id: 'orstar', name: 'Safety Star', desc: 'Score 90% or more in the Operating Room.', got: (c.orBest || 0) >= 90, icon: 'Emergency Medicine' },
    { id: 'daily', name: 'Daily Doctor', desc: 'Finish the Case of the Day 3 days in a row.', got: (c.bestDailyStreak || 0) >= 3, icon: 'clock' },
    { id: 'chief', name: 'Chief of the ER', desc: 'Reach the highest rank.', got: rank(S).level === RANKS.length, icon: 'Pediatrics' }
  ];
}
function badge(S, icon) {
  const p = S.profile, r = rank(S), name = p.name ? 'Dr. ' + p.name : 'Dr. (Your Name)';
  return '<div class="idbadge" style="--pc:' + esc(p.color) + '">' +
    '<div class="idb-top"><span>RIVERSIDE ER</span><span>SIMULATION STAFF</span></div>' +
    '<div class="idb-body">' + (window.ART ? '<div class="idb-pin" title="' + esc(r.name) + '">' + ART.insignia(r.level, 44) + '</div>' : '') + '<div class="idb-av">' + icon(p.icon, 46) + '</div>' +
    '<div class="idb-name">' + esc(name) + '</div><div class="idb-rank">' + esc(r.name) + '</div>' +
    '<div class="idb-spec">' + esc(p.specialty) + '</div>' +
    (p.motto ? '<div class="idb-motto">“' + esc(p.motto) + '”</div>' : '') + '</div>' +
    '<div class="idb-foot"><span>ID ' + esc(p.idNo) + '</span><span>LEVEL ' + r.level + '</span></div>' +
    '<div class="idb-bar">' + Array.from({ length: 28 }, (_, i) => '<i style="width:' + (1 + ((p.idNo.charCodeAt(i % p.idNo.length) + i * 7) % 4)) + 'px"></i>').join('') + '</div></div>';
}
function view(ui, S, icon) {
  const p = S.profile, r = rank(S), c = S.career, ach = achievements(S), got = ach.filter(a => a.got).length;
  const tot = c.correct + c.incorrect;
  let h = '<div class="page-head"><div><h1>My Doctor Profile</h1><p>Build your character, track your rank and unlock achievements. Your career stats carry over between simulations.</p></div></div>';
  h += '<div class="prof-grid"><div class="prof-left">' + badge(S, icon) +
    '<div class="panel"><div class="panel-title">' + icon('chart', 18) + 'Rank Progress</div><div class="rank-row"><b>' + esc(r.name) + '</b><span class="mono small">' + r.xp + ' XP</span></div>' +
    '<div class="bar" style="height:10px"><i style="width:' + r.pct + '%"></i></div>' +
    '<div class="small muted" style="margin-top:6px">' + (r.next ? (r.next.xp - r.xp) + ' XP to <b>' + esc(r.next.name) + '</b>' : 'Highest rank reached!') + '</div>' +
    '<ol class="ranks">' + RANKS.map((k, i) => '<li class="' + (i < r.level ? 'reached' : '') + (i === r.level - 1 ? ' cur' : '') + '">' + (window.ART ? '<span class="rk-ins">' + ART.insignia(i + 1, 30) + '</span>' : '') + '<span class="rk-name">' + esc(k.name) + ((window.CAREER_UNLOCKS || {})[i + 1] ? '<small class="unl">' + (i < r.level ? '✓ ' : '🔒 ') + esc(window.CAREER_UNLOCKS[i + 1].join(' · ')) + '</small>' : '') + '</span><span class="mono small">' + k.xp + ' XP</span></li>').join('') + '</ol>' +
    '<p class="small muted" style="margin-bottom:0">Earn XP: correct decision +10 · learning from a mistake +2 · safe discharge +25 · emergency handled +15 · body exam +1 · quiz point +5 · useful test +3 · image read correctly +5 · good conversation +8 · correct triage +5 · correct diagnosis up to +25 · CPR save +20 · Case of the Day +20.</p></div></div>';
  h += '<div class="prof-right"><div class="panel"><div class="panel-title">' + icon('steth', 18) + 'Character Details</div><div class="prof-form">' +
    '<div class="form-row"><label for="prof-name">Doctor Name</label><input id="prof-name" data-prof="name" maxlength="28" placeholder="e.g. Alex Rivera" value="' + esc(p.name) + '"></div>' +
    '<div class="form-row"><label for="prof-spec">Dream Specialty</label><select id="prof-spec" data-prof="specialty">' + SPECIALTIES.map(x => '<option' + (x === p.specialty ? ' selected' : '') + '>' + x + '</option>').join('') + '</select></div>' +
    '<div class="form-row"><label for="prof-motto">Motto</label><input id="prof-motto" data-prof="motto" maxlength="60" placeholder="e.g. Calm hands, kind words." value="' + esc(p.motto) + '"></div>' +
    '<div class="form-row"><label for="prof-why">Why I Want to Be a Doctor</label><textarea id="prof-why" data-prof="why" rows="3" maxlength="300" placeholder="Write a few sentences…">' + esc(p.why) + '</textarea></div>' +
    '<div class="form-row"><label>Scrub Color</label><div class="swatches">' + COLORS.map(x => '<button class="sw' + (p.color === x[0] ? ' on' : '') + '" style="background:' + x[0] + '" data-act="prof-color" data-v="' + x[0] + '" aria-label="' + x[1] + '" title="' + x[1] + '"></button>').join('') + '</div></div>' +
    '<div class="form-row"><label>Badge Symbol</label><div class="iconpick">' + ICONS.map(x => '<button class="' + (p.icon === x[0] ? 'on' : '') + '" data-act="prof-icon" data-v="' + x[0] + '" title="' + x[1] + '">' + icon(x[0], 22) + '<span>' + x[1] + '</span></button>').join('') + '</div></div>' +
    '</div></div>';
  h += '<div class="stats" style="margin-top:16px">' +
    st('Career Decisions', tot, tot ? Math.round(100 * c.correct / tot) + '% correct' : 'none yet') +
    st('Best Streak', c.bestStreak, 'correct in a row') +
    st('Patients Discharged', c.discharged, 'safely') +
    st('Emergencies Handled', c.rescues, 'correctly') +
    st('Body Exams', c.exams, 'areas examined') +
    st('Specialties Seen', (c.specs || []).length, 'of 10') +
    st('Triage Accuracy', (c.triages ? Math.round(100 * (c.triageOk || 0) / c.triages) + '%' : '—'), (c.triages || 0) + ' patients triaged') +
    st('Images Read', (c.readsOk || 0) + '/' + (c.reads || 0), 'ECGs, X-rays and scans correct') +
    st('Conversations', (c.talkOk || 0) + '/' + (c.talks || 0), 'handled well') +
    st('Useful Tests', c.goodTests || 0, (c.extraTests || 0) + ' not needed') +
    st('Diagnoses', (c.dxOk || 0) + '/' + (c.dxTotal || 0), 'guessed correctly') +
    st('CPR', (c.cprSaves || 0) + ' saved', 'best practice score ' + (c.cprBest || 0) + '%') +
    st('Skills Lab', (window.LAB ? LAB.passedCount(S) : 0) + '/6', 'skills passed') +
    st('Operations', c.orOps || 0, (c.orOps ? 'best safety score ' + (c.orBest || 0) + '%' : 'scrub in at ' + 'Junior Resident')) + '</div>';
  h += '<div class="panel"><div class="panel-title">' + icon('check', 18) + 'Achievements<span class="exam-count">' + got + ' of ' + ach.length + ' Unlocked</span></div><div class="ach-grid">' +
    ach.map(a => '<div class="ach' + (a.got ? ' got' : '') + '">' + (window.ART ? '<div class="ach-medal">' + ART.medal(a.id, a.got, 54) + '<span>' + icon(a.icon, 18) + '</span></div>' : '<div class="ach-ic">' + icon(a.icon, 22) + '</div>') + '<div><b>' + esc(a.name) + '</b><div class="small">' + esc(a.desc) + '</div></div></div>').join('') + '</div></div></div></div>';
  return h;
}
function st(k, v, s) { return '<div class="stat"><div class="k">' + k + '</div><div class="v">' + v + '</div><div class="s">' + s + '</div></div>'; }
function handle(act, el, ui, S) {
  if (act === 'prof-color') { S.profile.color = el.getAttribute('data-v'); return true; }
  if (act === 'prof-icon') { S.profile.icon = el.getAttribute('data-v'); return true; }
  return false;
}
window.PROFILE = { view: view, handle: handle, rank: rank, xp: xp, badge: badge, RANKS: RANKS };
})();
