/* Education section: lessons + quizzes. Educational, age-appropriate, no dosing. */
(function () {
'use strict';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const TOPICS = [
{
  id: 'er-basics', title: 'How an ER works: triage', icon: '🏥',
  body: `
<p>An Emergency Department (ER) never knows who will come through the door next. Because many people arrive at once, staff use <b>triage</b> — a French word meaning "to sort" — to decide who must be seen first.</p>
<h3>Sickest first, not first-come</h3>
<p>Triage nurses look at each patient's breathing, circulation, level of consciousness, pain and vital signs. A person with a sprained ankle may wait longer than someone who arrived later with chest pain, because chest pain could be a heart attack.</p>
<div class="callout"><b>In the simulator:</b> the waiting room sorts patients "sickest first". Critical and Unstable patients rise to the top — just like a real triage board.</div>
<h3>The ER team</h3>
<ul><li><b>Emergency physicians</b> lead assessment and treatment.</li><li><b>Nurses</b> monitor patients, give treatments and are often first to notice a change.</li><li><b>Specialists</b> (cardiology, surgery, etc.) are consulted for expert care.</li><li><b>Paramedics, radiographers, lab scientists, pharmacists</b> and many others make it all work.</li></ul>
<h3>Juggling patients</h3>
<p>A real ER doctor looks after several patients at once. While you focus on one, others keep getting better or worse. Good doctors regularly "scan the board", re-prioritize, and go back to anyone whose condition changes.</p>`,
  quiz: [
    { q: 'Two patients arrive: one with a cut finger at 9:00, one with sudden chest pain at 9:05. Who is usually seen first?', o: ['The cut finger, because they arrived first', 'The chest pain, because it could be life-threatening', 'Whoever is younger', 'Whoever is in more pain on a 1–10 scale only'], a: 1, e: 'Triage sorts by how urgent the problem is, not arrival time. Chest pain may be a heart attack.' },
    { q: 'What does "triage" mean?', o: ['A type of heart test', 'A machine that measures oxygen', 'Sorting patients by urgency', 'A hospital ward for children'], a: 2, e: 'Triage comes from the French "trier", to sort.' },
    { q: 'Who is often the first person to notice that a patient is getting worse?', o: ['The hospital receptionist', 'The patient\'s bedside nurse', 'The hospital manager', 'The pharmacist in another building'], a: 1, e: 'Nurses spend the most time at the bedside and frequently spot changes first. Listening to them is a key safety habit.' }
  ]
},
{
  id: 'abcde', title: 'The ABCDE approach', icon: '🅰️',
  body: `
<p>When a patient is very sick, doctors use a simple, ordered checklist so nothing important is missed. Problems are fixed <b>in order</b> as they are found, because the earlier letters kill fastest.</p>
<div class="abcde"><div><b>A</b>Airway — is it open? Can they talk?</div><div><b>B</b>Breathing — rate, effort, oxygen level, lung sounds</div><div><b>C</b>Circulation — pulse, blood pressure, skin color, bleeding</div><div><b>D</b>Disability — awake? confused? blood sugar?</div><div><b>E</b>Exposure — look at the whole body, temperature, rashes, injuries</div></div>
<h3>Why the order matters</h3>
<p>Without an open airway, nothing else works. A blocked airway can be fatal in minutes; a broken wrist is not. So you check A before B before C, and you call for help early.</p>
<div class="callout"><b>Tip:</b> a patient who is talking to you in full sentences has an open airway and is breathing — a quick but useful first check.</div>
<div class="callout warn"><b>Don't forget "D":</b> low blood sugar can look like a stroke or confusion. Checking glucose is quick and important.</div>`,
  quiz: [
    { q: 'What does the "B" in ABCDE stand for?', o: ['Blood', 'Breathing', 'Bones', 'Brain'], a: 1, e: 'B = Breathing: rate, effort, oxygen saturation and lung sounds.' },
    { q: 'A patient suddenly gets worse. What should you check FIRST?', o: ['Their X-rays', 'Their airway', 'Their medication list', 'Their temperature'], a: 1, e: 'Always start with the Airway — it is the fastest threat to life.' },
    { q: 'Which quick test in "D" (Disability) can reveal a cause of confusion that is easy to treat?', o: ['Blood sugar (glucose)', 'Hearing test', 'Eye color check', 'Height measurement'], a: 0, e: 'Low blood sugar causes confusion and can mimic a stroke, and it is easily corrected.' },
    { q: 'Why is the ABCDE approach done in order?', o: ['It is alphabetical, so it is easy to remember only', 'Earlier letters are usually the fastest threats to life', 'Because X-rays must come first', 'So the patient can rest between steps'], a: 1, e: 'The order follows what kills fastest: airway, then breathing, then circulation.' }
  ]
},
{
  id: 'vitals', title: 'Vital signs: what\'s normal?', icon: '❤️',
  body: `
<p>Vital signs are the body's basic "dashboard". Changes in them are often the first clue that someone is getting sicker or better.</p>
<table class="vtable"><thead><tr><th>Vital sign</th><th>Typical adult range</th><th>What it tells you</th></tr></thead><tbody>
<tr><td><b>Heart rate (HR)</b></td><td>60–100 beats/min</td><td>Fast HR can mean pain, fever, blood loss, dehydration or a heart rhythm problem.</td></tr>
<tr><td><b>Blood pressure (BP)</b></td><td>about 90–140 / 60–90 mmHg</td><td>Low BP can mean shock — not enough blood reaching the organs.</td></tr>
<tr><td><b>Respiratory rate (RR)</b></td><td>12–20 breaths/min</td><td>One of the earliest signs that someone is very unwell.</td></tr>
<tr><td><b>Oxygen saturation (SpO₂)</b></td><td>94–100%</td><td>How much of the blood's oxygen-carrying capacity is used.</td></tr>
<tr><td><b>Temperature</b></td><td>36.1–37.9 °C</td><td>38 °C or higher is a fever, often from infection.</td></tr></tbody></table>
<div class="callout"><b>Children are different:</b> babies and young children normally have faster heart and breathing rates than adults.</div>
<h3>Trends beat single numbers</h3>
<p>A heart rate of 100 might be fine — but a heart rate that went from 80 to 100 to 120 over an hour is a warning sign. That's why the simulator shows trend charts in every treatment room.</p>
<div class="callout warn"><b>Trap:</b> a "normal" oxygen level on extra oxygen does not always mean a patient is safe. Watch how hard they are working to breathe.</div>`,
  quiz: [
    { q: 'What is a typical adult resting heart rate?', o: ['20–40', '60–100', '120–160', '180–220'], a: 1, e: 'Adults usually have a resting heart rate of 60–100 beats per minute.' },
    { q: 'A temperature of 38.6 °C is called…', o: ['Hypothermia', 'Normal', 'A fever', 'Shock'], a: 2, e: '38 °C or above is a fever.' },
    { q: 'Which is MORE worrying?', o: ['HR steady at 98 for 3 hours', 'HR rising from 80 → 100 → 125 over an hour', 'HR of 72 while asleep', 'HR of 90 after walking'], a: 1, e: 'A rising trend shows the patient is changing — trends matter more than one reading.' },
    { q: 'Low blood pressure in a very sick patient can be a sign of…', o: ['Shock', 'Good fitness', 'Sleepiness only', 'A broken bone being healed'], a: 0, e: 'Shock means organs are not getting enough blood flow. Low BP is one sign.' }
  ]
},
{
  id: 'labs', title: 'Understanding lab tests', icon: '🧪',
  body: `
<p>Blood tests help doctors see inside the body. In the simulator, results are flagged <span class="flag flag-H">HIGH</span>, <span class="flag flag-L">LOW</span> or <span class="flag flag-C">CRITICAL</span>.</p>
<table class="vtable"><thead><tr><th>Test</th><th>What it measures</th><th>Often high/low when…</th></tr></thead><tbody>
<tr><td><b>White blood cells (WBC)</b></td><td>Infection-fighting cells</td><td>High in infection or inflammation (e.g., appendicitis).</td></tr>
<tr><td><b>Hemoglobin (Hb)</b></td><td>Oxygen-carrying protein in red cells</td><td>Low after bleeding (may lag behind at first!).</td></tr>
<tr><td><b>CRP</b></td><td>Inflammation marker</td><td>High in infection and inflammation.</td></tr>
<tr><td><b>Troponin</b></td><td>Heart-muscle damage</td><td>High in a heart attack.</td></tr>
<tr><td><b>Lactate</b></td><td>Sign of tissues lacking oxygen</td><td>High in shock and severe sepsis; should fall as treatment works.</td></tr>
<tr><td><b>Creatinine</b></td><td>Kidney function</td><td>High when the kidneys are struggling.</td></tr>
<tr><td><b>Glucose</b></td><td>Blood sugar</td><td>Very high in diabetic emergencies; low in hypoglycemia.</td></tr>
<tr><td><b>Blood gas (pH, CO₂)</b></td><td>Acid level and breathing efficiency</td><td>Rising CO₂ in an asthma attack can mean the patient is tiring.</td></tr></tbody></table>
<div class="callout warn"><b>Think, don't just read:</b> a normal result can be misleading. Hemoglobin can look normal soon after bleeding starts, because the blood hasn't been diluted yet. Always match tests to the patient in front of you.</div>`,
  quiz: [
    { q: 'Which test helps show heart-muscle damage?', o: ['Troponin', 'Glucose', 'Creatinine', 'WBC'], a: 0, e: 'Troponin is released when heart muscle is damaged.' },
    { q: 'A rising lactate in a sick patient suggests…', o: ['They are dehydrated only', 'Tissues may not be getting enough oxygen (shock)', 'Their kidneys are perfect', 'They just ate a meal'], a: 1, e: 'Lactate rises when tissues are short of oxygen, as in shock or severe sepsis.' },
    { q: 'Why might hemoglobin look normal right after a big bleed starts?', o: ['The lab made a mistake every time', 'The blood has not been diluted by body fluids yet', 'Bleeding raises hemoglobin', 'Hemoglobin is not in blood'], a: 1, e: 'Hemoglobin often drops later, after fluids shift. Clinical signs matter more early on.' }
  ]
},
{
  id: 'imaging', title: 'Choosing imaging', icon: '🩻',
  body: `
<p>Imaging lets doctors see inside the body. Each type has strengths and trade-offs.</p>
<table class="vtable"><thead><tr><th>Type</th><th>Good for</th><th>Trade-offs</th></tr></thead><tbody>
<tr><td><b>X-ray</b></td><td>Bones, chest (lungs, heart size)</td><td>Fast, cheap, low radiation. Less detail for soft tissues.</td></tr>
<tr><td><b>Ultrasound</b></td><td>Abdomen, heart (echo), pregnancy, fluid/bleeding (FAST scan)</td><td>No radiation, at the bedside. Depends on operator; may not see everything.</td></tr>
<tr><td><b>CT scan</b></td><td>Head bleeding, strokes, trauma, abdomen, lung clots</td><td>Fast and detailed, but higher radiation dose.</td></tr>
<tr><td><b>MRI</b></td><td>Brain, spine, soft tissues, ligaments</td><td>No radiation, very detailed, but slow and not for unstable patients.</td></tr></tbody></table>
<div class="callout"><b>Young patients:</b> doctors try to limit radiation in children and teenagers, so ultrasound or MRI are often preferred when they can answer the question.</div>
<div class="callout warn"><b>"Not seen" is not "normal":</b> if an ultrasound can't see an organ, the test is inconclusive. Don't treat it as a normal result.</div>
<h3>Unstable patients stay put</h3>
<p>A crashing patient should not be sent away to a scanner. Stabilize first (ABCDE), then image.</p>`,
  quiz: [
    { q: 'Best first test for a suspected broken wrist?', o: ['MRI', 'CT scan', 'X-ray', 'Blood test'], a: 2, e: 'X-rays are quick, cheap and low-radiation — ideal for most suspected fractures.' },
    { q: 'Which imaging uses NO radiation?', o: ['CT scan', 'X-ray', 'Ultrasound', 'All of them use radiation'], a: 2, e: 'Ultrasound uses sound waves. MRI also avoids radiation.' },
    { q: 'An ultrasound for appendicitis could not see the appendix. This means…', o: ['Appendicitis is ruled out', 'The result is inconclusive', 'The patient can go home', 'The appendix is missing'], a: 1, e: 'An unseen organ means the test did not answer the question — further assessment is needed.' }
  ]
},
{
  id: 'deterioration', title: 'Spotting deterioration & shock', icon: '⚠️',
  body: `
<p>Patients rarely get worse without warning. The skill is noticing small changes early.</p>
<h3>Early warning signs</h3>
<ul><li>Breathing faster, or working harder to breathe</li><li>Heart rate climbing</li><li>Blood pressure falling</li><li>New confusion or sleepiness</li><li>Less urine, cold or mottled skin</li><li>A nurse or family member saying "something isn't right"</li></ul>
<h3>Shock</h3>
<p>Shock means organs aren't getting enough blood flow. Common types:</p>
<ul><li><b>Septic shock</b> — from severe infection</li><li><b>Hypovolemic shock</b> — from blood or fluid loss</li><li><b>Cardiogenic shock</b> — the heart pump is failing</li><li><b>Anaphylactic shock</b> — a severe allergic reaction</li></ul>
<div class="callout warn"><b>Misleading reassurance:</b> sudden pain relief in appendicitis can mean the appendix burst. Normal blood pressure in a young trauma patient can hide serious bleeding, because young bodies compensate well — until they suddenly can't.</div>
<h3>Escalate early</h3>
<p>Calling for senior help early is a strength, not a weakness. Rapid-response teams exist so that sick patients get expert help before they crash.</p>`,
  quiz: [
    { q: 'Which is often an EARLY sign of deterioration?', o: ['Breathing rate going up', 'Asking for a sandwich', 'Normal temperature', 'Sleeping at night'], a: 0, e: 'A rising breathing rate is one of the earliest and most overlooked warning signs.' },
    { q: 'Cardiogenic shock is caused by…', o: ['Severe infection', 'The heart failing to pump well', 'A bee sting', 'Dehydration only'], a: 1, e: 'Cardiogenic = from the heart. The pump is too weak to supply the body.' },
    { q: 'A young trauma patient has normal blood pressure. Does that prove they are not bleeding?', o: ['Yes, always', 'No — young people can compensate until they suddenly decompensate', 'Yes, if their heart rate is fast', 'Only if they are talking'], a: 1, e: 'Young bodies maintain blood pressure by speeding the heart and tightening vessels — until reserves run out.' },
    { q: 'When should you call for senior help?', o: ['Only after the patient collapses', 'Early, as soon as you are worried', 'Never — it shows weakness', 'Only during the day'], a: 1, e: 'Early escalation saves lives. Good doctors ask for help early.' }
  ]
},
{
  id: 'teamwork', title: 'Communication & safety', icon: '🤝',
  body: `
<p>Most medical errors are not caused by a lack of knowledge, but by communication breakdowns. Doctors use tools to keep patients safe.</p>
<h3>SBAR — a clear way to hand over or ask for help</h3>
<ul><li><b>S</b>ituation — "I'm calling about Patient 2, who is getting more breathless."</li><li><b>B</b>ackground — "24-year-old with severe asthma, here 3 hours."</li><li><b>A</b>ssessment — "Her CO₂ is rising; I think she's tiring."</li><li><b>R</b>ecommendation — "Please come and review her for ICU now."</li></ul>
<h3>Other safety habits</h3>
<ul><li><b>Check allergies</b> before any new medicine.</li><li><b>Closed-loop communication:</b> repeat back instructions ("Giving oxygen now — done").</li><li><b>Write it down:</b> the medical record lets others continue care safely.</li><li><b>Respect and consent:</b> explain things kindly and involve patients and families in decisions.</li></ul>
<div class="callout"><b>Kindness is clinical skill:</b> scared patients describe symptoms better when they feel listened to.</div>`,
  quiz: [
    { q: 'In SBAR, what does the "R" stand for?', o: ['Rest', 'Recommendation', 'Radiology', 'Rhythm'], a: 1, e: 'Recommendation — what you think should happen next.' },
    { q: 'Before giving any new medicine, you should always check…', o: ['The weather', 'Allergies', 'Their favorite food', 'Their shoe size'], a: 1, e: 'Allergy checks prevent dangerous reactions.' },
    { q: '"Closed-loop communication" means…', o: ['Never talking to the team', 'Repeating back an instruction to confirm it', 'Only using text messages', 'Closing the door during rounds'], a: 1, e: 'Saying the instruction back confirms it was heard correctly.' }
  ]
},
{
  id: 'discharge', title: 'Safe discharge', icon: '🏠',
  body: `
<p>Sending a patient home (or to another unit) is a medical decision too — and a risky one if rushed.</p>
<h3>Before discharge, ask:</h3>
<ul><li>Has the patient been fully assessed and is the diagnosis clear enough?</li><li>Are vital signs stable — and staying stable after a period of observation?</li><li>Can they eat, drink, walk and manage their pain at home?</li><li>Do they understand their medicines and follow-up?</li><li>Do they know the <b>"red flags"</b> — warning signs that mean come back right away?</li></ul>
<div class="callout"><b>In the simulator:</b> the DISCHARGE PATIENT button runs a readiness check. It will refuse to discharge someone who is unstable, unassessed, or hasn't been observed long enough after treatment.</div>
<h3>Other dispositions</h3>
<p>Not everyone goes home. Patients may be admitted to a ward, a monitored "step-down" unit, the ICU, or go to the operating room. Matching the level of care to how sick someone is keeps them safe.</p>`,
  quiz: [
    { q: 'What are "red flag" instructions?', o: ['Rules about hospital parking', 'Warning signs that mean the patient should return urgently', 'A list of foods to avoid', 'Instructions for nurses only'], a: 1, e: 'Red flags tell patients when to come back — a key part of safe discharge.' },
    { q: 'A patient\'s vital signs just improved 2 minutes ago after treatment. Discharge now?', o: ['Yes, immediately', 'No — observe them to make sure they stay stable', 'Yes, if they ask', 'Only if it is night time'], a: 1, e: 'A period of observation confirms improvement is lasting.' },
    { q: 'A heart attack patient off ICU support and stable, but still needing rhythm monitoring, should go to…', o: ['Home today', 'A monitored step-down unit', 'A general ward with no monitor', 'Stay in ICU for weeks'], a: 1, e: 'Step-down units provide monitoring for patients who no longer need ICU.' }
  ]
},
{
  id: 'cpr', title: 'CPR: Restarting a Heart', icon: '💓',
  body: `
<p>When the heart stops pumping (<b>cardiac arrest</b>), blood stops reaching the brain. Without help, brain damage starts within minutes. <b>CPR</b> (cardiopulmonary resuscitation) pushes blood around the body by hand until the heart can be restarted.</p>
<h3>The chain of survival</h3>
<ol><li><b>Check:</b> is the scene safe? Does the person respond when you tap them and shout? Are they breathing normally?</li><li><b>Call for help:</b> call the emergency number (911 in the US) and send someone to fetch an <b>AED</b> (automated external defibrillator).</li><li><b>Push hard and fast</b> in the center of the chest — <b>100 to 120 pushes per minute</b>.</li><li><b>Use the AED</b> as soon as it arrives. It talks you through every step and only shocks if a shock is needed.</li></ol>
<div class="callout"><b>Hands-only CPR:</b> if you are not trained in rescue breaths, chest compressions alone still save lives. The speed matters: too slow doesn't move enough blood, too fast doesn't let the heart refill.</div>
<h3>In the hospital</h3>
<p>A <b>Code Blue</b> means a patient's heart has stopped. A team rushes in: one person does compressions, others give breaths with a bag and mask, attach the defibrillator, and look for the cause. People swap every 2 minutes because good compressions are tiring.</p>
<div class="callout warn"><b>Learn it for real:</b> many organizations run CPR classes for teens. Practicing on a mannequin with an instructor is the best way to learn how deep and how fast to push.</div>
<button class="btn btn-danger btn-lg" data-act="cpr-practice" style="margin-top:8px">💓 Practice CPR Now</button>`,
  quiz: [
    { q: 'How fast should chest compressions be?', o: ['40–60 per minute', '60–80 per minute', '100–120 per minute', '160–200 per minute'], a: 2, e: '100–120 compressions per minute moves the most blood.' },
    { q: 'You find someone collapsed. After checking it is safe, what comes next?', o: ['Give them a drink of water', 'Check if they respond and call for help', 'Wait 10 minutes to see if they wake up', 'Lift their legs and leave'], a: 1, e: 'Check responsiveness, then call the emergency number and get an AED — help needs to be on the way fast.' },
    { q: 'What does an AED do?', o: ['Measures blood sugar', 'Checks the heart rhythm and gives a shock if needed', 'Gives oxygen through the nose', 'Takes an X-ray'], a: 1, e: 'An AED analyzes the rhythm and tells you whether to shock. Anyone can use one — it gives spoken instructions.' },
    { q: 'If you are not trained in rescue breaths, you should…', o: ['Do nothing until trained help arrives', 'Do hands-only CPR: push hard and fast in the center of the chest', 'Only give rescue breaths', 'Shake the person until they wake'], a: 1, e: 'Hands-only CPR is far better than doing nothing.' }
  ]
},
{
  id: 'study', title: 'How to learn medicine', icon: '🎓',
  body: `
<p>Becoming a doctor is a long journey — and it starts with how you learn, not how much you memorize.</p>
<h3>Study habits doctors use</h3>
<ul><li><b>Active recall:</b> test yourself instead of re-reading. (The quizzes here do exactly that!)</li><li><b>Spaced repetition:</b> review topics after 1 day, 1 week, 1 month.</li><li><b>Learn from mistakes:</b> every wrong answer in the simulator comes with an explanation — read it carefully.</li><li><b>Think in systems:</b> connect symptoms to body systems (heart, lungs, brain…).</li><li><b>Ask "why?":</b> understanding why a treatment works helps you remember it.</li></ul>
<h3>The path to becoming a doctor (in many countries)</h3>
<ol><li>Strong science and math in school — biology, chemistry, physics.</li><li>University / pre-medical studies.</li><li>Medical school (about 4–6 years).</li><li>Residency training in a specialty (3–7+ years), such as emergency medicine, pediatrics or surgery.</li></ol>
<h3>Things you can do now</h3>
<ul><li>Take a first aid or CPR course for young people.</li><li>Volunteer or shadow in health settings when old enough.</li><li>Read about the human body and how diseases work.</li><li>Practice clear writing and kind communication — doctors do a lot of both.</li></ul>
<div class="callout"><b>Remember:</b> this simulator is a learning game. Real patients are always cared for by trained, licensed professionals.</div>`,
  quiz: [
    { q: 'Which study method is most effective for remembering?', o: ['Re-reading the same page many times', 'Testing yourself (active recall)', 'Highlighting every line', 'Studying only the night before'], a: 1, e: 'Self-testing strengthens memory far more than re-reading.' },
    { q: 'What should you do after getting a decision wrong in the simulator?', o: ['Restart until you guess right', 'Read the explanation and understand why', 'Ignore it', 'Choose the longest answer next time'], a: 1, e: 'Mistakes are where the most learning happens — understand the reasoning.' },
    { q: 'After medical school, doctors train in a specialty during…', o: ['Residency', 'Vacation', 'Triage', 'Discharge'], a: 0, e: 'Residency is specialty training after medical school.' }
  ]
}
];

function view(ui, S) {
  const done = (S.edu && S.edu.completed) || {};
  const cur = TOPICS.find(t => t.id === ui.eduTopic) || null;
  let h = '<div class="page-head"><div><h1>Education Center</h1><p>Short lessons and quizzes on how to assess and care for patients. ' + Object.keys(done).length + ' of ' + TOPICS.length + ' quizzes completed.</p></div></div>';
  h += '<div class="edu-layout"><nav class="card edu-nav">' + TOPICS.map(t => '<button class="' + (cur && cur.id === t.id ? 'on' : '') + '" data-go="#/learn/' + t.id + '"><span>' + t.icon + '</span>' + esc((window.tc||String)(t.title)) + (done[t.id] != null ? '<span class="done">✓ ' + done[t.id] + '/' + t.quiz.length + '</span>' : '') + '</button>').join('') + '</nav>';
  if (!cur) {
    h += '<div><div class="lib-grid">' + TOPICS.map(t => '<div class="card lib-card"><div style="font-size:30px">' + t.icon + '</div><h3>' + esc((window.tc||String)(t.title)) + '</h3><p>' + t.quiz.length + ' Quiz Questions' + (done[t.id] != null ? ' · <span class="ok-t">Best Score ' + done[t.id] + '/' + t.quiz.length + '</span>' : '') + '</p><button class="btn btn-sm btn-primary" data-go="#/learn/' + t.id + '">Start Lesson</button></div>').join('') + '</div></div></div>';
    return h;
  }
  const ans = ui.eduAnswers[cur.id] || (ui.eduAnswers[cur.id] = { picks: {}, checked: false });
  h += '<article class="panel lesson"><h2>' + cur.icon + ' ' + esc((window.tc||String)(cur.title)) + '</h2>' + cur.body +
    '<div class="quiz"><div class="panel-title">Quick quiz</div>' + cur.quiz.map((q, qi) => {
      const pick = ans.picks[qi];
      return '<div class="qitem"><div class="question">' + (qi + 1) + '. ' + esc(q.q) + '</div><div class="opts">' + q.o.map((o, oi) => {
        let cls = 'opt';
        if (ans.checked) { if (oi === q.a) cls += ' right'; else if (oi === pick) cls += ' wrong'; }
        else if (pick === oi) cls += ' sel';
        return '<button class="' + cls + '" data-act="edu-pick" data-t="' + cur.id + '" data-q="' + qi + '" data-o="' + oi + '"' + (ans.checked ? ' disabled' : '') + '><span class="L">' + 'ABCD'[oi] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>' + (ans.checked ? '<div class="qres ' + (pick === q.a ? 'good' : 'bad') + '">' + (pick === q.a ? '✓ Correct. ' : '✗ Not quite. ') + esc(q.e) + '</div>' : '') + '</div>';
    }).join('');
  const all = cur.quiz.every((q, qi) => ans.picks[qi] != null);
  if (ans.checked) {
    const score = cur.quiz.filter((q, qi) => ans.picks[qi] === q.a).length;
    h += '<div class="verdict ' + (score === cur.quiz.length ? 'good' : 'bad') + '"><div><h3>Score: ' + score + ' / ' + cur.quiz.length + '</h3>' + (score === cur.quiz.length ? 'Excellent work!' : 'Review the explanations above and try again.') + '</div></div><div class="row" style="margin-top:12px"><button class="btn" data-act="edu-retry" data-t="' + cur.id + '">Retry Quiz</button>' + nextBtn(cur) + '</div>';
  } else {
    h += '<button class="btn btn-blue btn-lg" data-act="edu-check" data-t="' + cur.id + '"' + (all ? '' : ' disabled') + '>SUBMIT ANSWERS</button>' + (all ? '' : ' <span class="small muted">Answer every question to submit.</span>');
  }
  h += '</div></article></div>';
  return h;
}
function nextBtn(cur) {
  const i = TOPICS.indexOf(cur), n = TOPICS[i + 1];
  return n ? '<button class="btn btn-primary" data-go="#/learn/' + n.id + '">Next Lesson: ' + esc((window.tc||String)(n.title)) + ' →</button>' : '<button class="btn btn-primary" data-go="#/">Back to the ER →</button>';
}
function handle(act, el, ui, S) {
  const tid = el.getAttribute('data-t'); if (!tid) return false;
  const topic = TOPICS.find(t => t.id === tid); if (!topic) return false;
  const ans = ui.eduAnswers[tid] || (ui.eduAnswers[tid] = { picks: {}, checked: false });
  if (act === 'edu-pick') { if (!ans.checked) ans.picks[+el.getAttribute('data-q')] = +el.getAttribute('data-o'); return true; }
  if (act === 'edu-check') {
    ans.checked = true;
    const score = topic.quiz.filter((q, qi) => ans.picks[qi] === q.a).length;
    S.edu.completed[tid] = Math.max(score, S.edu.completed[tid] || 0);
    return true;
  }
  if (act === 'edu-retry') { ui.eduAnswers[tid] = { picks: {}, checked: false }; return true; }
  return false;
}
window.EDU = { view: view, handle: handle, topics: TOPICS };
})();
