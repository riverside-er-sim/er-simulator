/* Operating Room: the player leads the team's SAFETY work around an operation —
   consent, safety time-out, sterile tray, watching the monitor, the count, and recovery.
   The surgery itself is a non-graphic cartoon; no technique, no medicine doses. */
(function () {
'use strict';
const { esc, shuffle } = window.UTIL;
const F = 'font-family="Inter,sans-serif"';
const PASS = 70;
const STAGES = ['Before Surgery', 'Time-Out', 'Sterile Tray', 'Operation', 'The Count', 'Recovery'];

/* ───────── Cartoon drawings ───────── */
function svg(inner, label, vb) { return '<svg class="or-art" viewBox="' + (vb || '0 0 260 150') + '" role="img" aria-label="' + esc(label) + '">' + inner + '</svg>'; }
function artAppendix(f) {
  let s = '<rect width="260" height="150" fill="#1b2433"/><circle cx="130" cy="75" r="68" fill="#3a2a2a"/><circle cx="130" cy="75" r="68" fill="none" stroke="#0b1220" stroke-width="6"/>' +
    '<path d="M70 50 Q130 30 190 52 Q200 90 170 104 Q140 112 120 100" stroke="#e8a3a3" stroke-width="22" fill="none" stroke-linecap="round"/>';
  if (f < 3) s += '<path d="M120 100 Q108 116 100 128" stroke="' + (f >= 1 ? '#d9534f' : '#e8a3a3') + '" stroke-width="' + (f >= 1 ? 13 : 9) + '" stroke-linecap="round" fill="none"/>' + (f === 2 ? '<circle cx="104" cy="122" r="3" fill="#7a1f1f"/>' : '');
  else s += '<path d="M118 102 l4 4 M114 98 l4 4" stroke="#fff" stroke-width="2"/>';
  if (f >= 1) s += '<rect x="196" y="20" width="6" height="70" rx="3" fill="#cfd8dc" transform="rotate(25 199 55)"/><rect x="60" y="22" width="6" height="64" rx="3" fill="#cfd8dc" transform="rotate(-25 63 54)"/>';
  if (f === 0) s += '<text x="130" y="140" text-anchor="middle" font-size="11" fill="#9fb6d6" ' + F + '>Camera view</text>';
  if (f === 3) s += '<text x="130" y="140" text-anchor="middle" font-size="12" font-weight="700" fill="#8fe3a2" ' + F + '>Appendix removed ✓</text>';
  return svg(s, 'Keyhole camera view of the appendix');
}
function artSpleen(f) {
  let s = '<rect width="260" height="150" fill="#f6efe6"/><path d="M40 20 Q130 4 220 20 L232 130 Q130 146 28 130 Z" fill="#f3d7c4" stroke="#c49a7e"/>' +
    '<path d="M60 40 Q100 30 130 50 Q100 70 70 66 Z" fill="#b5574b" opacity=".85"/><text x="92" y="60" font-size="9" fill="#fff" ' + F + '>liver</text>' +
    '<path d="M70 96 Q130 80 190 100 Q160 124 100 120 Z" fill="#e7b2a6"/><text x="128" y="108" text-anchor="middle" font-size="9" fill="#7a4a3f" ' + F + '>bowel</text>';
  if (f < 3) s += '<path d="M168 36 Q206 30 212 56 Q206 82 176 74 Q162 56 168 36Z" fill="#6a2c70"/>' + (f >= 1 ? '<path d="M184 44 l10 12 M190 40 l6 18" stroke="#f3d7c4" stroke-width="2"/><ellipse cx="188" cy="82" rx="22" ry="7" fill="#c62828" opacity="' + (f === 2 ? .25 : .45) + '"/>' : '') +
    '<text x="190" y="28" text-anchor="middle" font-size="9" fill="#6a2c70" font-weight="700" ' + F + '>spleen</text>';
  else s += '<text x="190" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="#2e7d32" ' + F + '>Spleen removed ✓</text><text x="190" y="76" text-anchor="middle" font-size="10" fill="#2e7d32" ' + F + '>Bleeding stopped</text>';
  s += '<text x="40" y="146" font-size="9" fill="#7a849b" ' + F + '>Patient\'s RIGHT</text><text x="220" y="146" text-anchor="end" font-size="9" fill="#7a849b" ' + F + '>Patient\'s LEFT</text>';
  return svg(s, 'Cartoon of the belly organs and the spleen');
}
function artHip(f) {
  let s = '<rect width="260" height="150" fill="#10202e"/><path d="M60 20 Q100 6 130 30 Q160 6 200 20 Q210 60 170 70 L130 64 L90 70 Q50 60 60 20Z" fill="#dfe7ee" opacity=".9"/>' +
    '<circle cx="96" cy="74" r="14" fill="none" stroke="#9fb6c8" stroke-width="3"/>';
  if (f >= 2) s += '<circle cx="96" cy="74" r="12" fill="#b0bec5" stroke="#eceff1" stroke-width="2"/><path d="M104 82 L118 98 L112 140" stroke="#b0bec5" stroke-width="7" fill="none"/>';
  else s += '<circle cx="' + (f >= 1 ? 92 : 96) + '" cy="' + (f >= 1 ? 72 : 74) + '" r="12" fill="#dfe7ee"/>';
  s += '<path d="M104 84 Q112 88 118 98 L122 140 L104 140 L106 100" fill="#dfe7ee" opacity=".9"/><circle cx="164" cy="74" r="12" fill="#dfe7ee"/><path d="M156 84 Q148 88 142 98 L138 140 L156 140 L154 100" fill="#dfe7ee" opacity=".9"/>';
  if (f === 1) s += '<path d="M100 80 l8 -6 l-4 10 l8 -4" stroke="#ff6b6b" stroke-width="2.5" fill="none"/>';
  s += '<text x="10" y="144" font-size="9" fill="#9fb6c8" ' + F + '>Patient\'s RIGHT</text><text x="250" y="144" text-anchor="end" font-size="9" fill="#9fb6c8" ' + F + '>LEFT</text>' +
    (f >= 2 ? '<text x="200" y="110" text-anchor="middle" font-size="11" font-weight="700" fill="#8fe3a2" ' + F + '>New metal hip ball ✓</text>' : '');
  return svg(s, 'X-ray style cartoon of the hip');
}
function bodyMap(answer, picked) {
  const Z = { RUQ: [70, 96, 50, 40], LUQ: [122, 96, 50, 40], RLQ: [70, 138, 50, 40], LLQ: [122, 138, 50, 40], RHIP: [58, 180, 56, 34], LHIP: [128, 180, 56, 34], CHEST: [70, 40, 102, 54] };
  let s = '<path d="M68 62 L46 150 M174 62 L196 150" stroke="#f1d3bd" stroke-width="16" stroke-linecap="round"/><path d="M100 214 L96 240 M142 214 L146 240" stroke="#f1d3bd" stroke-width="26" stroke-linecap="round"/><circle cx="121" cy="21" r="16" fill="#f1d3bd" stroke="#a97c5f"/><path d="M90 36 Q121 30 152 36 L176 60 L172 180 Q170 214 150 218 L92 218 Q72 214 70 180 L66 60 Z" fill="#f1d3bd" stroke="#a97c5f"/>' +
    '<path d="M121 96 v82 M70 138 h102" stroke="#c49a7e" stroke-dasharray="4 4"/>';
  Object.keys(Z).forEach(k => {
    const z = Z[k], cls = picked ? (k === answer ? ' ok' : k === picked ? ' bad' : '') : '';
    s += '<rect class="or-zone' + cls + '" data-or="tap" data-z="' + k + '" x="' + z[0] + '" y="' + z[1] + '" width="' + z[2] + '" height="' + z[3] + '" rx="8" tabindex="0" role="button" aria-label="' + k + '"/>';
  });
  s += '<text x="20" y="250" font-size="11" font-weight="700" fill="#5b6b82" ' + F + '>← Patient\'s RIGHT</text><text x="222" y="250" text-anchor="end" font-size="11" font-weight="700" fill="#5b6b82" ' + F + '>Patient\'s LEFT →</text>';
  return '<svg class="or-body" viewBox="0 0 242 258" role="img" aria-label="Front view of a patient">' + s + '</svg>';
}
function scene(p) {
  const team = (x, c) => '<circle cx="' + x + '" cy="62" r="13" fill="#e9c7ab"/><path d="M' + (x - 13) + ' 58 Q' + x + ' 42 ' + (x + 13) + ' 58 Z" fill="' + c + '"/><rect x="' + (x - 9) + '" y="64" width="18" height="8" rx="3" fill="#8fd3ff"/><path d="M' + (x - 18) + ' 112 L' + (x - 14) + ' 78 Q' + x + ' 70 ' + (x + 14) + ' 78 L' + (x + 18) + ' 112 Z" fill="' + c + '"/>';
  return '<svg class="or-scene" viewBox="0 0 400 150" role="img" aria-label="Operating room">' +
    '<rect width="400" height="150" fill="#e8f1f2"/><rect y="118" width="400" height="32" fill="#cfdcdf"/>' +
    '<path d="M200 0 v18" stroke="#90a4ae" stroke-width="4"/><ellipse cx="200" cy="26" rx="46" ry="12" fill="#cfd8dc" stroke="#90a4ae" stroke-width="2"/><ellipse cx="200" cy="30" rx="34" ry="6" fill="#fffde7"/>' +
    '<path d="M168 36 L130 96 L270 96 L232 36 Z" fill="#fffde7" opacity=".35"/>' +
    '<rect x="120" y="96" width="160" height="12" rx="4" fill="#78909c"/><rect x="194" y="108" width="12" height="16" fill="#607d8b"/>' +
    '<rect x="122" y="84" width="150" height="16" rx="6" fill="#2e8b57"/>' + (window.ART && p ? ART.portrait(p, 26, { at: [264, 72], bg: false }) : '<circle cx="276" cy="86" r="10" fill="#e9c7ab"/>') +
    team(100, '#2e7d32') + team(330, '#1d5fbf') + team(150, '#0f7c8c') +
    '<rect x="350" y="40" width="40" height="30" rx="3" fill="#0b1220"/><path d="M354 56 l6 0 l3 -8 l4 14 l3 -6 l16 0" stroke="#4ade80" stroke-width="1.5" fill="none"/><rect x="366" y="70" width="6" height="48" fill="#90a4ae"/>' +
    '<rect x="20" y="88" width="56" height="8" rx="2" fill="#b0bec5"/><rect x="24" y="96" width="4" height="22" fill="#90a4ae"/><rect x="68" y="96" width="4" height="22" fill="#90a4ae"/><path d="M28 86 h8 M40 86 h10 M54 86 h6" stroke="#607d8b" stroke-width="3"/></svg>';
}

/* ───────── Case content ───────── */
const COMMON_TRAY = [['Sterile instruments', true], ['Sterile gauze', true], ['Sterile drapes', true], ['Sterile gown and gloves', true], ['Stitches (sutures)', true],
  ['Your phone', false], ['Open box of exam gloves', false], ['Coffee cup', false], ['Pen from your pocket', false], ['ID badge on a lanyard', false]];
const COUNT_ITEMS = [['Gauze pads', 5], ['Clamps', 4], ['Big belly sponges', 3], ['Scissors', 2], ['Needles', 2]];
const CONTAM = [
  { q: 'A clamp slips off the sterile tray and lands on the floor.', opts: [
    { t: 'Call it out, pass it off the sterile area, and open a new sterile clamp', ok: true, fb: 'Right — anything that touches the floor is no longer sterile. Say it out loud so everyone knows.' },
    { t: 'Pick it up, wipe it on a sterile towel and use it', ok: false, fb: 'Wiping doesn\'t make it sterile again. Germs from the floor could cause an infection.' },
    { t: 'Nobody saw — put it back quietly', ok: false, fb: 'Speaking up about contamination protects the patient. Good teams want to hear it.' },
    { t: 'Cancel the operation', ok: false, fb: 'No need — just replace it with a new sterile one.' }] },
  { q: 'The scrub nurse\'s gloved hand brushes the handle of the big overhead light, which is not sterile.', opts: [
    { t: 'Speak up — the nurse changes gloves before touching anything sterile again', ok: true, fb: 'Correct. Once a sterile glove touches something non-sterile, it has to be changed.' },
    { t: 'Say nothing — it was only for a second', ok: false, fb: 'Even a quick touch can carry germs. It\'s always OK to speak up for safety.' },
    { t: 'Spray the glove with water', ok: false, fb: 'Water doesn\'t sterilize. A fresh sterile glove is needed.' },
    { t: 'Have the nurse leave the hospital', ok: false, fb: 'Mistakes happen! The fix is simple: change gloves.' }] },
  { q: 'You notice a small tear in the wrapper of a sterile pack of gauze.', opts: [
    { t: 'Don\'t use it — set it aside and open a new pack', ok: true, fb: 'Yes. A torn wrapper means it may not be sterile anymore.' },
    { t: 'Use it — the tear is tiny', ok: false, fb: 'Any tear can let germs in. Better safe than sorry.' },
    { t: 'Tape over the tear and use it', ok: false, fb: 'Tape doesn\'t make it sterile again.' },
    { t: 'Use only the gauze farthest from the tear', ok: false, fb: 'You can\'t tell which pieces stayed sterile. Open a new pack.' }] }
];

const CFG = {
  'core-appendicitis': {
    after: 2, organ: 'appendix', zone: 'RLQ', art: artAppendix,
    proc: 'Keyhole appendix removal (laparoscopic appendectomy)', wrongProc: 'Gallbladder removal',
    site: 'Lower right belly', wrongSite: 'Lower left belly',
    equip: 'Keyhole camera checked and working', wrongEquip: 'Keyhole camera not checked yet',
    tray: [['Keyhole camera', true]],
    preop: [
      { q: 'Before surgery, the surgeon talks with him and his parent. Which explanation is best?', opts: [
        { t: 'In plain words: what the operation is, why it\'s needed, the main risks like bleeding and infection, other options — then answer their questions', ok: true, fb: 'Yes! That\'s "informed consent": the patient (and, for a teen, a parent) understands before agreeing.' },
        { t: '"Just sign here — it\'s routine, nothing to worry about."', ok: false, fb: 'Signing a form isn\'t consent unless they understand what they\'re agreeing to.' },
        { t: 'Explain everything in medical terms so it sounds professional', ok: false, fb: 'Plain words are better — the goal is that the family truly understands.' },
        { t: 'Skip the talk — the doctors know best', ok: false, fb: 'Patients and families always have a say in their own care.' }] },
      { q: 'Why has he had nothing to eat since he arrived?', opts: [
        { t: 'Food in the stomach could come back up and get into his lungs while he\'s asleep under anesthesia', ok: true, fb: 'Correct — an empty stomach makes anesthesia much safer.' },
        { t: 'So the surgeon can see the appendix more easily', ok: false, fb: 'Not the main reason. The real worry is food getting into the lungs during anesthesia.' },
        { t: 'Because hospital food is bad', ok: false, fb: 'Ha! The real reason is anesthesia safety.' },
        { t: 'To help him lose weight before surgery', ok: false, fb: 'No — it\'s about keeping the lungs safe during anesthesia.' }] }
    ],
    frames: [
      'He\'s already asleep under general anesthesia and feels nothing. The anesthesiologist stays by his head the whole time, watching his breathing, heart and blood pressure.',
      'The surgeon makes three tiny keyhole cuts and slides in a thin camera. The belly is gently filled with gas to make space, and the team watches on a TV screen.',
      'On screen: a swollen, red appendix with a small hole in it. The surgeon seals it off at its base, removes it, and washes out the infected fluid.',
      'The tiny cuts are closed with dissolving stitches and covered with small dressings. Operation complete!'
    ],
    event: { v: { hr: 98, sbp: 112, dbp: 68, spo2: 90 }, q: 'During the operation, his oxygen level drops from 99% to 90%.', after: 'The anesthesiologist adjusts the breathing machine and his oxygen level climbs back to 98%.', opts: [
      { t: 'Tell the anesthesiologist right away so they can check the breathing tube and the breathing machine', ok: true, fb: 'Right! Speaking up quickly is the most important job of everyone in the room.' },
      { t: 'Turn off the alarm so it doesn\'t distract the surgeon', ok: false, fb: 'Never silence an alarm without fixing the problem — it\'s there to protect the patient.' },
      { t: 'Ask him to take a deep breath', ok: false, fb: 'He\'s fully asleep — a breathing machine is doing his breathing for him.' },
      { t: 'Say nothing — the surgeon is busy', ok: false, fb: 'Everyone on the team should speak up. Good surgeons want to know.' }] },
    recovery: [
      { q: 'He wakes up in the recovery room and feels sick to his stomach — common after anesthesia.', opts: [
        { t: 'Give the anti-sickness medicine the doctor prescribed, and offer small sips of water once it settles', ok: true, fb: 'Yes — nausea after anesthesia is common and treatable.' },
        { t: 'Give him a big burger to settle his stomach', ok: false, fb: 'Too much too soon! Start with sips and build up.' },
        { t: 'Ignore it — it will pass', ok: false, fb: 'Nausea is miserable and can be treated. Don\'t ignore it.' },
        { t: 'Send him home immediately', ok: false, fb: 'He needs to recover from anesthesia first, and finish his antibiotics plan.' }] },
      { q: 'He rates his pain 7 out of 10.', opts: [
        { t: 'Give the pain medicine the doctor prescribed, then check his pain score again', ok: true, fb: 'Correct — treat pain, then recheck to make sure it worked.' },
        { t: 'Tell him pain is normal and he should tough it out', ok: false, fb: 'Pain after surgery should be treated. Good pain control helps him move and recover.' },
        { t: 'Give twice the prescribed amount so it works faster', ok: false, fb: 'Never give more than prescribed — too much pain medicine can slow breathing dangerously.' },
        { t: 'Wait until tomorrow to ask again', ok: false, fb: 'Pain should be checked regularly, especially right after treatment.' }] }
    ],
    teach: ['Informed consent: plain words, risks, options and questions.', 'Speak up the moment the monitor changes.', 'Every gauze and instrument is counted before and after.']
  },

  'c-trauma-spleen-01': {
    after: 4, organ: 'spleen', zone: 'LUQ', art: artSpleen,
    proc: 'Emergency open belly operation to stop bleeding from the spleen', wrongProc: 'Kidney removal',
    site: 'Left upper belly (spleen)', wrongSite: 'Right upper belly (liver)',
    equip: 'Blood for transfusion ready in the room', wrongEquip: 'Blood not ready yet',
    tray: [['Suction', true]],
    preop: [
      { q: 'He\'s bleeding inside and getting worse. There isn\'t time for a long talk. What about consent?', opts: [
        { t: 'Briefly explain he\'s bleeding inside and needs an operation now, and ask for his OK', ok: true, fb: 'Right. He\'s awake and understands, so he still decides — the talk is just short. If a patient couldn\'t understand and no family could be reached, the team could go ahead to save their life.' },
        { t: 'Wait until his family arrives to sign the forms', ok: false, fb: 'Waiting could cost his life — he\'s still bleeding.' },
        { t: 'Tell him nothing so he doesn\'t get scared', ok: false, fb: 'Even in an emergency, patients deserve to know what\'s happening.' },
        { t: 'Give him a meal first in case it\'s a long operation', ok: false, fb: 'No food before anesthesia — and there\'s no time to wait.' }] },
      { q: 'What must be ready before he goes into the operating room?', opts: [
        { t: 'Blood for transfusion, because he\'s losing blood', ok: true, fb: 'Yes — he will need blood to replace what he\'s lost.' },
        { t: 'A full scan of every part of his body first', ok: false, fb: 'He\'s too unstable to wait for more scans. Stopping the bleeding comes first.' },
        { t: 'A cast for his arm', ok: false, fb: 'His arm is fine — the bleeding is the emergency.' },
        { t: 'Nothing — just go', ok: false, fb: 'Blood should be ready; he\'s been losing a lot.' }] }
    ],
    frames: [
      'This is an emergency. He\'s asleep under general anesthesia, and blood is running into his IV lines to replace what he\'s lost.',
      'The surgeon opens the belly and finds blood around a torn spleen — the organ tucked under the lower left ribs that helps fight infection.',
      'The spleen is too badly torn to repair, so the surgeon removes it (a "splenectomy") and checks every other organ for injury.',
      'The bleeding has stopped. The belly is closed and he goes to intensive care to be watched closely.'
    ],
    event: { v: { hr: 138, sbp: 76, dbp: 40, spo2: 97 }, q: 'As the surgeon reaches the spleen, his blood pressure falls to 76/40 and his heart rate climbs to 138.', after: 'With pressure on the bleeding spot and more blood running in, his blood pressure comes back up to 102/64.', opts: [
      { t: 'Tell the team: the surgeon presses on the bleeding spot while the anesthesia team gives more blood', ok: true, fb: 'Exactly — stop the bleeding and replace the blood at the same time.' },
      { t: 'Stop the blood transfusion to save some for later', ok: false, fb: 'He needs the blood now — this is when it matters most.' },
      { t: 'Turn up the room temperature and wait', ok: false, fb: 'Keeping him warm helps, but this needs action right now.' },
      { t: 'Wake him up to ask how he feels', ok: false, fb: 'He needs to stay asleep while the surgeon works.' }] },
    recovery: [
      { q: 'In intensive care, the nurse checks him every few minutes. Which sign would worry you most?', opts: [
        { t: 'Heart rate climbing and blood pressure falling again', ok: true, fb: 'Yes — that pattern could mean bleeding has started again. Call the surgeon right away.' },
        { t: 'He\'s sleepy right after anesthesia', ok: false, fb: 'Feeling sleepy is normal after anesthesia.' },
        { t: 'He asks for a drink of water', ok: false, fb: 'Normal! (The team will say when he can drink.)' },
        { t: 'He says the bed is uncomfortable', ok: false, fb: 'Worth a pillow, but not a warning sign.' }] },
      { q: 'A week later he\'s ready to go home. Without a spleen, what matters for the future?', opts: [
        { t: 'Vaccines to protect against certain infections, and seeing a doctor quickly for any fever', ok: true, fb: 'Right — the spleen helps fight some germs, so vaccines and quick care for fevers are important for life.' },
        { t: 'He can never play sports again', ok: false, fb: 'He can return to sport once healed — his surgeon will say when.' },
        { t: 'Nothing changes at all', ok: false, fb: 'Life is mostly normal, but he\'s at higher risk of some infections.' },
        { t: 'He must stay inside forever', ok: false, fb: 'No! Vaccines and quick care for fevers keep him safe.' }] }
    ],
    teach: ['In an emergency, consent is quick — and if the patient can\'t decide, the team can act to save a life.', 'Falling blood pressure plus rising heart rate means bleeding — act fast.', 'No spleen: vaccines and quick care for any fever.']
  },

  'c-ortho-hip-01': {
    after: 4, organ: 'broken right hip', zone: 'RHIP', art: artHip,
    proc: 'Partial hip replacement, RIGHT hip (hemiarthroplasty)', wrongProc: 'Knee replacement',
    site: 'RIGHT hip — marked by the surgeon', wrongSite: 'LEFT hip',
    equip: 'New hip implant (sterile pack) in the room', wrongEquip: 'Hip implant still in the storeroom',
    tray: [['Hip implant (sterile pack, opened when needed)', true]],
    preop: [
      { q: 'She\'s 84. Earlier she was a little confused, but now she\'s alert and understands what\'s happening. Who gives consent for her operation?', opts: [
        { t: 'She does — explain clearly, check she understands, and include her family if she wants', ok: true, fb: 'Yes! Being older doesn\'t take away someone\'s right to decide. If she understands the choice, it\'s hers to make.' },
        { t: 'Her neighbor, who found her', ok: false, fb: 'A neighbor can\'t consent for her.' },
        { t: 'Her family only, because she\'s old', ok: false, fb: 'Age alone never means someone can\'t decide for themselves.' },
        { t: 'Nobody — just operate', ok: false, fb: 'This isn\'t a life-or-death emergency, and she can decide. Ask her.' }] },
      { q: 'The surgeon marks the operation site with a pen before surgery. Which hip gets marked?', opts: [
        { t: 'The RIGHT hip — the broken side — marked while she\'s awake and can confirm it', ok: true, fb: 'Correct. Marking the right side while the patient can confirm it prevents wrong-side surgery.' },
        { t: 'The left hip', ok: false, fb: 'Her RIGHT hip is broken. Wrong-side surgery is exactly what marking prevents.' },
        { t: 'Both hips, just in case', ok: false, fb: 'Marking both would defeat the purpose — only the operation site is marked.' },
        { t: 'No marking needed — everyone remembers', ok: false, fb: 'Memory isn\'t a safety system. Left/right operations are always marked.' }] }
    ],
    frames: [
      'She\'s already under anesthesia, so she feels nothing. The anesthesiologist watches her heart, breathing and blood pressure the whole time.',
      'The X-ray showed the "ball" at the top of her thigh bone has broken off. The surgeon will replace it with a metal ball — a partial hip replacement.',
      'The new metal ball is fitted into her hip socket. An X-ray in the operating room checks it\'s in exactly the right place.',
      'The wound is closed and dressed. Tomorrow the physical therapists will help her stand on her new hip!'
    ],
    event: { v: { hr: 64, sbp: 88, dbp: 48, spo2: 96 }, q: 'Partway through, her blood pressure slowly drifts down to 88/48.', after: 'The anesthesiologist gives fluids and her blood pressure recovers to 118/66.', opts: [
      { t: 'Tell the anesthesiologist — they can give fluids or medicine to support her blood pressure, and the team checks for bleeding', ok: true, fb: 'Right — older patients can drop their blood pressure under anesthesia. Spot it, say it, treat it.' },
      { t: 'Ignore it — older people always have low blood pressure', ok: false, fb: 'A drop during surgery needs attention at any age.' },
      { t: 'Sit her up on the operating table', ok: false, fb: 'Not possible mid-operation — and sitting up can lower blood pressure further.' },
      { t: 'Skip the X-ray check to finish faster', ok: false, fb: 'Skipping safety checks doesn\'t fix blood pressure. Tell the anesthesiologist.' }] },
    recovery: [
      { q: 'That night she\'s confused and pulling at her IV, though she was clear before surgery.', opts: [
        { t: 'Stay calm and reassure her, make sure she has her glasses and hearing aids, involve family, and check for causes like pain or low oxygen', ok: true, fb: 'Yes — this is "delirium", common in older people after surgery. Gentle reorientation and treating the cause help most.' },
        { t: 'Tie her hands down straight away', ok: false, fb: 'Restraints can make delirium worse. Try calm reassurance and look for the cause first.' },
        { t: 'Assume it\'s permanent dementia', ok: false, fb: 'New confusion after surgery is often delirium, which usually gets better.' },
        { t: 'Turn the lights off and leave her alone', ok: false, fb: 'Being alone in the dark can make confusion worse.' }] },
      { q: 'When should she start getting out of bed?', opts: [
        { t: 'As soon as possible — usually the day after surgery, with a physical therapist', ok: true, fb: 'Right! Getting up early prevents blood clots, chest infections and muscle loss.' },
        { t: 'After six weeks of bed rest', ok: false, fb: 'Long bed rest causes clots, pneumonia and weakness in older people.' },
        { t: 'Never — she should use a wheelchair from now on', ok: false, fb: 'The goal of the operation is to help her walk again.' },
        { t: 'Only once all the pain is gone', ok: false, fb: 'Some soreness is expected. Pain medicine helps her move sooner.' }] }
    ],
    teach: ['Older age doesn\'t take away someone\'s right to decide.', 'Left/right operations are always marked while the patient can confirm.', 'After hip surgery: watch for delirium, and get up early.']
  }
};

/* ───────── Game engine ───────── */
let st = null;
function open(opts) {
  close();
  const cfg = CFG[opts.p.caseId]; if (!cfg) return;
  const root = document.createElement('div'); root.id = 'or-root'; root.className = 'cpr-bg'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
  document.body.appendChild(root);
  st = { opts: opts, cfg: cfg, p: opts.p, root: root, stage: -1, step: 0, scores: [], sub: {}, msg: '', msgKind: '' };
  draw();
  document.addEventListener('keydown', onKey, true);
  root.addEventListener('click', onClick);
}
function close() {
  if (!st) return;
  clearTimeout(st.memTimer);
  document.removeEventListener('keydown', onKey, true);
  if (st.root) st.root.remove();
  st = null;
}
function onKey(e) {
  if (!st) return;
  if (e.key === 'Escape') { e.preventDefault(); quit(); return; }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('[data-or="tap"]')) { e.preventDefault(); onClick(e); }
}
function quit() { const cb = st.opts.onDone; close(); if (cb) cb({ quit: true }); }

/* Quiz helper: st.q = { def, order, picked, ok, tried } */
function setQuiz(def) { st.q = { def: def, order: shuffle(def.opts.map((o, i) => i)), picked: null, ok: false, tried: false }; st.msg = ''; st.msgKind = ''; }
function quizHtml(extra) {
  const q = st.q, d = q.def;
  return '<p class="lab-q">' + esc(d.q) + '</p>' + (extra || '') + '<div class="lab-opts">' + q.order.map(i => {
    const o = d.opts[i], cls = q.picked === i ? (o.ok ? ' ok' : ' bad') : (q.ok && o.ok ? ' ok' : '');
    return '<button class="lab-opt' + cls + '" data-or="opt" data-i="' + i + '"' + (q.ok ? ' disabled' : '') + '>' + esc(o.t) + '</button>';
  }).join('') + '</div>';
}
function pickOpt(i) {
  const q = st.q; if (!q || q.ok) return;
  const o = q.def.opts[i]; q.picked = i;
  if (o.ok) { q.ok = true; st.msg = o.fb + (q.def.after ? ' ' + q.def.after : ''); st.msgKind = 'ok'; }
  else { q.tried = true; st.msg = o.fb + ' Try again.'; st.msgKind = 'bad'; }
  draw();
}
const qScore = () => (st.q && !st.q.tried ? 1 : 0);

/* Stage plans: each stage is a list of steps; each step = { kind, ... } */
function plan(stage) {
  const c = st.cfg;
  switch (stage) {
    case 0: return c.preop.map(d => ({ kind: 'quiz', def: d }));
    case 1: return [{ kind: 'timeout' }];
    case 2: return [{ kind: 'tray' }, { kind: 'quiz', def: CONTAM[Math.floor(Math.random() * CONTAM.length)] }];
    case 3: return [{ kind: 'memory' }, { kind: 'frame', f: 0 }, { kind: 'frame', f: 1 }, { kind: 'event' }, { kind: 'frame', f: 2 }, { kind: 'anat' }, { kind: 'frame', f: 3 }];
    case 4: return [{ kind: 'count' }, { kind: 'quiz', def: countQuiz() }];
    case 5: return c.recovery.map(d => ({ kind: 'quiz', def: d, mon: true }));
  }
  return [];
}
function startStage(n) {
  st.stage = n; st.step = 0; st.stagePts = 0; st.stageMax = 0;
  if (n >= STAGES.length) return finishOp();
  st.steps = plan(n);
  enterStep();
}
function enterStep() {
  const s = st.steps[st.step]; st.msg = ''; st.msgKind = ''; st.q = null;
  if (!s) { st.scores[st.stage] = st.stageMax ? st.stagePts / st.stageMax : 1; st.stageDone = true; draw(); return; }
  st.stageDone = false;
  if (s.kind === 'quiz') setQuiz(s.def);
  if (s.kind === 'event') setQuiz(st.cfg.event);
  if (s.kind === 'timeout') setupTimeout();
  if (s.kind === 'tray') setupTray();
  if (s.kind === 'memory') setupCount();
  if (s.kind === 'anat') st.anat = null;
  if (s.kind === 'count') st.countPick = null;
  draw();
}
function nextStep() {
  const s = st.steps[st.step];
  if (s.kind === 'quiz' || s.kind === 'event') { st.stagePts += qScore(); st.stageMax += 1; }
  if (s.kind === 'anat') { st.stagePts += st.anat === st.cfg.zone ? 1 : 0; st.stageMax += 1; }
  if (s.kind === 'timeout') { st.stagePts += st.to.right / st.to.items.length * 2; st.stageMax += 2; }
  if (s.kind === 'tray') { st.stagePts += st.tray.right / st.tray.items.length * 2; st.stageMax += 2; }
  if (s.kind === 'count') { st.stagePts += st.countPick === st.missing ? 1 : 0; st.stageMax += 1; }
  st.step++; enterStep();
}

/* Time-out */
function setupTimeout() {
  const c = st.cfg, p = st.p, mrn = String(p.mrn || 'MRN-100000');
  const badMrn = mrn.slice(0, -1) + ((+mrn.slice(-1) + 3) % 10);
  const allergy = st.opts.allergies || 'No known allergies';
  st.chart = [['Patient', 'Patient ' + p.num + ' · ' + mrn], ['Operation', c.proc], ['Site', c.site], ['Allergies', allergy], ['Antibiotics', 'Given before the first cut'], ['Equipment', c.equip]];
  const items = [
    { who: 'Nurse', ok: 'This is Patient ' + p.num + ', ' + mrn + '.', bad: 'This is Patient ' + p.num + ', ' + badMrn + '.', why: 'The record number doesn\'t match the wristband and chart — check it\'s the right patient!' },
    { who: 'Surgeon', ok: 'We are doing: ' + c.proc + '.', bad: 'We are doing: ' + c.wrongProc + '.', why: 'That\'s the wrong operation!' },
    { who: 'Surgeon', ok: 'Site: ' + c.site + '.', bad: 'Site: ' + c.wrongSite + '.', why: 'Wrong site — that\'s how wrong-side surgery happens.' },
    { who: 'Anesthesiologist', ok: 'Allergies: ' + allergy + '.', bad: 'Allergies: ' + (/penicillin/i.test(allergy) ? 'latex' : 'penicillin') + '.', why: 'The chart and wristband don\'t list that allergy — the team must stop and find out which is true.' },
    { who: 'Anesthesiologist', ok: 'Antibiotics were given before the first cut.', bad: 'Antibiotics have not been given yet.', why: 'Antibiotics should be given before the first cut to prevent infection.' },
    { who: 'Scrub nurse', ok: c.equip + '.', bad: c.wrongEquip + '.', why: 'Everything needed must be ready before starting.' }
  ];
  const bad = shuffle([0, 1, 2, 3, 4, 5]).slice(0, Math.random() < 0.5 ? 1 : 2);
  st.to = { items: items.map((it, i) => ({ who: it.who, text: bad.indexOf(i) >= 0 ? it.bad : it.ok, bad: bad.indexOf(i) >= 0, why: it.why, mark: null })), checked: false, right: 0 };
}
/* Tray */
function setupTray() {
  st.tray = { items: shuffle(COMMON_TRAY.concat(st.cfg.tray).map(x => ({ name: x[0], sterile: x[1], on: false }))), checked: false, right: 0 };
}
/* Count */
function setupCount() {
  st.count = COUNT_ITEMS.map(x => ({ name: x[0], n: x[1] + Math.floor(Math.random() * 3) }));
  st.missing = Math.random() < 0.75 ? st.count[Math.floor(Math.random() * st.count.length)].name : 'none';
}
function countQuiz() {
  return { q: 'What should the team do if a gauze pad is missing at the end of the count?', opts: [
    { t: 'Stop before closing, search the area, and take an X-ray if it still can\'t be found', ok: true, fb: 'Yes! Surgical gauze has a thin strip that shows up on X-ray, so nothing gets left inside a patient.' },
    { t: 'Close anyway — it\'s only gauze', ok: false, fb: 'Leaving anything inside can cause serious infection. Always find it first.' },
    { t: 'Count again next week at the follow-up visit', ok: false, fb: 'It has to be found before the patient leaves the operating room.' },
    { t: 'Assume it went in the trash', ok: false, fb: 'Never assume — search, and X-ray if needed.' }] };
}

function finishOp() {
  const total = Math.round(100 * st.scores.reduce((a, b) => a + b, 0) / STAGES.length);
  st.result = { score: total, pass: total >= PASS, scores: st.scores.slice() };
  st.stage = STAGES.length; draw();
}

function onClick(e) {
  const b = e.target.closest('[data-or]'); if (!b || !st) return;
  const a = b.getAttribute('data-or');
  if (a === 'start') startStage(0);
  else if (a === 'quit') quit();
  else if (a === 'next') nextStep();
  else if (a === 'stage') startStage(st.stage + 1);
  else if (a === 'opt') pickOpt(+b.getAttribute('data-i'));
  else if (a === 'done') { const cb = st.opts.onDone, r = st.result; close(); if (cb) cb(r); }
  else if (a === 'to-mark') { const i = +b.getAttribute('data-i'); if (!st.to.checked) { st.to.items[i].mark = b.getAttribute('data-v'); draw(); } }
  else if (a === 'to-check') { if (st.to.items.some(x => !x.mark)) { st.msg = 'Check every line before finishing the time-out.'; st.msgKind = 'bad'; draw(); return; } st.to.checked = true; st.to.right = st.to.items.filter(x => (x.mark === 'bad') === x.bad).length; const missed = st.to.items.filter(x => x.bad && x.mark !== 'bad').length; st.msg = missed ? 'Some problems slipped past. In real life, anyone — even a student — can say "Stop!" during a time-out.' : st.to.right === st.to.items.length ? 'Perfect time-out! You caught every problem.' : 'You caught the problems, but flagged a line that was actually fine.'; st.msgKind = missed ? 'bad' : 'ok'; draw(); }
  else if (a === 'tray-tog') { const i = +b.getAttribute('data-i'); if (!st.tray.checked) { st.tray.items[i].on = !st.tray.items[i].on; draw(); } }
  else if (a === 'tray-check') { st.tray.checked = true; st.tray.right = st.tray.items.filter(x => x.on === x.sterile).length; st.msg = st.tray.right === st.tray.items.length ? 'Perfect — only sterile items on the sterile tray.' : 'Only sterile items belong on the sterile tray. Anything else could carry germs into the wound.'; st.msgKind = st.tray.right === st.tray.items.length ? 'ok' : 'bad'; draw(); }
  else if (a === 'tap') { if (st.anat) return; st.anat = b.getAttribute('data-z'); const ok = st.anat === st.cfg.zone; st.msg = ok ? 'Correct! Remember: when you face a patient, their right side is on your left.' : 'Not quite. The ' + st.cfg.organ + ' is highlighted in green. When you face a patient, their right side is on your left.'; st.msgKind = ok ? 'ok' : 'bad'; draw(); }
  else if (a === 'count-pick') { if (st.countPick) return; st.countPick = b.getAttribute('data-v'); const ok = st.countPick === st.missing; st.msg = ok ? (st.missing === 'none' ? 'Correct — everything is accounted for.' : 'Great memory! One of the ' + st.missing.toLowerCase() + ' is missing. The team stops and searches — and finds it tucked under a drape.') : (st.missing === 'none' ? 'Actually, everything was there — the count was correct.' : 'Look again: one of the ' + st.missing.toLowerCase() + ' was missing. The team searches and finds it under a drape.'); st.msgKind = ok ? 'ok' : 'bad'; draw(); }
}

function monitorHtml(v) {
  v = v || { hr: 82, sbp: 118, dbp: 72, spo2: 99 };
  const warn = v.spo2 < 94 || v.sbp < 90 || v.hr > 120;
  return '<div class="monitor or-mon">' + (window.ART ? '<div class="waves">' + ART.monitorWaves({ rhythm: 'sinus', hr: v.hr, spo2: v.spo2, rr: 14, sbp: v.sbp, seed: 'or' }) + '</div>' : '') +
    '<div class="or-vit"><span class="' + (v.hr > 120 ? 'al' : '') + '">HR <b>' + v.hr + '</b></span><span class="' + (v.sbp < 90 ? 'al' : '') + '">BP <b>' + v.sbp + '/' + v.dbp + '</b></span><span class="' + (v.spo2 < 94 ? 'al' : '') + '">SpO₂ <b>' + v.spo2 + '%</b></span>' + (warn ? '<span class="al">⚠ ALARM</span>' : '') + '</div></div>';
}
function stepper() {
  return '<div class="or-steps">' + STAGES.map((s, i) => '<span class="' + (i < st.stage || (i === st.stage && st.stageDone) ? 'done' : i === st.stage ? 'cur' : '') + '">' + (i + 1) + '. ' + esc(s) + '</span>').join('') + '</div>';
}
function draw() {
  if (!st) return;
  const c = st.cfg, p = st.p, msg = '<div class="lab-msg ' + st.msgKind + '" aria-live="polite">' + esc(st.msg) + '</div>';
  const next = (label) => '<div class="cpr-actions"><button class="btn btn-primary btn-lg" data-or="next">' + (label || 'Next →') + '</button></div>';
  let body = '';
  if (st.stage < 0) {
    body = '<h2 class="lab-title">Operating Room</h2>' + scene(p) + '<p class="cpr-lead"><b>Patient ' + p.num + '</b> needs: ' + esc(c.proc) + '.</p>' +
      '<p>The surgeon does the operation. <b>Your job is to keep the patient safe</b>: talk with the patient, run the safety checks, keep everything sterile, watch the monitor, count the instruments and look after recovery.</p>' +
      '<ol class="or-list">' + STAGES.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol>' +
      '<div class="cpr-actions"><button class="btn" data-or="quit">Not Now</button><button class="btn btn-primary btn-lg or-go" data-or="start">Scrub In</button></div>';
  } else if (st.stage >= STAGES.length) {
    const r = st.result;
    body = '<h2 class="lab-title">' + (r.pass ? 'Operation complete — great teamwork!' : 'Operation complete') + '</h2>' + c.art(3) +
      '<div class="or-score"><b>' + r.score + '%</b><span>safety score</span></div><table class="or-break">' + STAGES.map((s, i) => '<tr><td>' + esc(s) + '</td><td class="mono">' + Math.round(100 * (r.scores[i] || 0)) + '%</td></tr>').join('') + '</table>' +
      '<div class="lab-teach"><b>Remember</b><ul>' + c.teach.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul></div>' +
      '<div class="cpr-actions"><button class="btn btn-primary btn-lg" data-or="done">Back to the Patient</button></div>';
  } else if (st.stageDone) {
    body = stepper() + '<h2 class="lab-title">' + esc(STAGES[st.stage]) + ' ✓</h2><p class="lab-score"><b>' + Math.round(100 * st.scores[st.stage]) + '%</b> on this stage</p>' +
      '<div class="cpr-actions"><button class="btn btn-primary btn-lg" data-or="stage">' + (st.stage + 1 < STAGES.length ? 'On to ' + esc(STAGES[st.stage + 1]) + ' →' : 'See Your Results →') + '</button></div>';
  } else {
    const s = st.steps[st.step];
    body = stepper();
    if (s.kind === 'quiz') {
      body += (s.mon ? monitorHtml({ hr: 88, sbp: 122, dbp: 74, spo2: 98 }) : st.stage === 0 ? scene(p) : '') + quizHtml() + msg + (st.q.ok ? next() : '');
    } else if (s.kind === 'event') {
      body += c.art(1) + monitorHtml(st.q.ok ? null : c.event.v) + quizHtml() + msg + (st.q.ok ? next() : '');
    } else if (s.kind === 'timeout') {
      const to = st.to;
      body += '<p class="lab-q">The patient is under anesthesia and the drapes are on. Safety time-out! Everyone stops before the first cut. Compare what each person says with the chart. Mark anything that doesn\'t match.</p>' +
        '<div class="or-chart"><b>📋 Chart &amp; wristband</b>' + st.chart.map(r => '<div><span>' + esc(r[0]) + '</span>' + esc(r[1]) + '</div>').join('') + '</div>' +
        '<div class="or-to">' + to.items.map((it, i) => {
          const res = to.checked ? ((it.mark === 'bad') === it.bad ? ' right' : ' wrong') : '';
          return '<div class="or-to-row' + res + '"><div><small>' + esc(it.who) + ' says</small>"' + esc(it.text) + '"' + (to.checked && it.bad ? '<div class="small or-why">⚠ ' + esc(it.why) + '</div>' : '') + '</div>' +
            '<div class="or-to-btns"><button class="btn btn-sm' + (it.mark === 'ok' ? ' on-ok' : '') + '" data-or="to-mark" data-i="' + i + '" data-v="ok"' + (to.checked ? ' disabled' : '') + '>✓ Matches</button><button class="btn btn-sm' + (it.mark === 'bad' ? ' on-bad' : '') + '" data-or="to-mark" data-i="' + i + '" data-v="bad"' + (to.checked ? ' disabled' : '') + '>✋ Stop!</button></div></div>';
        }).join('') + '</div>' + msg + (to.checked ? next() : '<div class="cpr-actions"><button class="btn btn-primary" data-or="to-check">Finish the Time-Out</button></div>');
    } else if (s.kind === 'tray') {
      const t = st.tray;
      body += '<p class="lab-q">Set up the sterile tray. Tap each item that belongs on it — only sterile things!</p><div class="or-tray">' + t.items.map((it, i) => {
        const res = t.checked ? (it.on === it.sterile ? ' right' : ' wrong') : '';
        return '<button class="or-item' + (it.on ? ' on' : '') + res + '" data-or="tray-tog" data-i="' + i + '"' + (t.checked ? ' disabled' : '') + '>' + esc(it.name) + (t.checked && it.on !== it.sterile ? '<small>' + (it.sterile ? 'belongs on the tray' : 'not sterile') + '</small>' : '') + '</button>';
      }).join('') + '</div>' + msg + (t.checked ? next() : '<div class="cpr-actions"><button class="btn btn-primary" data-or="tray-check">Tray Ready</button></div>');
    } else if (s.kind === 'memory') {
      body += '<p class="lab-q">Before the first cut, the nurses count everything out loud. <b>Memorize the count</b> — you\'ll need it at the end!</p><div class="or-count">' + st.count.map(x => '<div><b>' + x.n + '</b>' + esc(x.name) + '</div>').join('') + '</div>' + next('I\'ve Got It — Start the Operation →');
    } else if (s.kind === 'frame') {
      body += c.art(s.f) + '<p class="or-frame">' + esc(c.frames[s.f]) + '</p>' + monitorHtml() + next();
    } else if (s.kind === 'anat') {
      body += '<p class="lab-q">Quick anatomy check: tap where the <b>' + esc(c.organ) + '</b> is on the patient lying in front of you.</p>' + bodyMap(c.zone, st.anat) + msg + (st.anat ? next() : '');
    } else if (s.kind === 'count') {
      const after = st.count.map(x => ({ name: x.name, n: x.name === st.missing ? x.n - 1 : x.n }));
      body += '<p class="lab-q">Before closing, the nurses count again. Compare with the count you memorized. Is anything missing?</p><div class="or-count">' + after.map(x => '<div><b>' + x.n + '</b>' + esc(x.name) + '</div>').join('') + '</div>' +
        '<div class="lab-opts">' + st.count.map(x => '<button class="lab-opt' + (st.countPick ? (x.name === st.missing ? ' ok' : x.name === st.countPick ? ' bad' : '') : '') + '" data-or="count-pick" data-v="' + esc(x.name) + '"' + (st.countPick ? ' disabled' : '') + '>One of the ' + esc(x.name.toLowerCase()) + ' is missing</button>').join('') +
        '<button class="lab-opt' + (st.countPick ? (st.missing === 'none' ? ' ok' : st.countPick === 'none' ? ' bad' : '') : '') + '" data-or="count-pick" data-v="none"' + (st.countPick ? ' disabled' : '') + '>Nothing — the count matches</button></div>' + msg + (st.countPick ? next() : '');
    }
    body += '<div class="lab-foot"><button class="btn btn-sm" data-or="quit">Leave the OR</button><span class="small muted">Patient ' + p.num + ' · ' + esc(c.proc.split(' (')[0]) + '</span></div>';
  }
  st.root.innerHTML = '<div class="cpr-card lab-card or-card"><div class="cpr-head or-head">🩺 OPERATING ROOM<span>Patient ' + p.num + '</span></div><div class="cpr-body">' + body + '</div></div>';
  const f = st.root.querySelector('[data-or="next"], [data-or="stage"], [data-or="start"], [data-or="done"]'); if (f) f.focus();
}

window.OR = { open: open, close: close, CFG: CFG, CONTAM: CONTAM, scene: scene, PASS: PASS, get active() { return !!st; } };
})();
