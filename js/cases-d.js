/* Case pack D: aortic dissection, fainting, collapsed lung, brain bleed, cardiac tamponade.
   Fictional, educational content. No medication doses or procedure instructions. */
window.CASE_LIBRARY = window.CASE_LIBRARY || [];

window.CASE_LIBRARY.push(
/* ───────────── D1: Aortic dissection ───────────── */
{
  id: 'd-cardio-dissection-01',
  title: 'Tearing chest pain going through to the back',
  specialty: 'Cardiology',
  difficulty: 'Advanced',
  age: 62, sex: 'M',
  chiefComplaint: 'Sudden severe chest pain spreading to the back',
  suspected: 'Severe chest pain — cause to be determined',
  finalDiagnosis: 'Acute Type A aortic dissection (a tear in the inner wall of the main artery leaving the heart)',
  presentation: 'A 62-year-old man was lifting boxes in his garage when he felt a sudden, severe pain in the middle of his chest that he describes as "ripping" and that went straight through to between his shoulder blades. The pain was at its worst right from the start. He arrived by ambulance pale, sweaty and frightened. The paramedics noted a high blood pressure in his right arm.',
  history: {
    pmh: ['High blood pressure (often forgets his tablets)', 'High cholesterol'],
    meds: ['Blood pressure tablet (taken irregularly)', 'Cholesterol tablet'],
    allergies: 'No known allergies',
    social: 'Ex-smoker. Works as a warehouse manager. Lives with his wife.'
  },
  canDie: true,
  startSeverity: 58,
  drift: 2.2,
  recoveredDrift: -1,
  vitals: {
    stable:   { hr: 78,  sbp: 126, dbp: 76, rr: 15, spo2: 98, temp: 36.7 },
    critical: { hr: 132, sbp: 76,  dbp: 44, rr: 28, spo2: 90, temp: 36.3 }
  },
  initialLabs: [
    { name: 'Troponin (heart muscle damage marker)', value: 'Normal', flag: '', ref: 'Normal: very low' },
    { name: 'Hemoglobin', value: '13.6 g/dL', flag: '', ref: '13.5–17.5' },
    { name: 'Creatinine (kidney)', value: '1.1 mg/dL', flag: '', ref: '0.7–1.2' }
  ],
  initialImaging: [ { name: '12-lead ECG', result: 'Fast regular rhythm with signs of a thickened heart muscle from long-term high blood pressure. No ST elevation.' } ],
  rescue: {
    title: 'Blood pressure collapsing',
    findings: 'He suddenly becomes grey and confused. Blood pressure falls to 74/40 and his heart rate climbs to 135. The nurse says his pulse is very hard to feel.',
    question: 'The tear may be bleeding. What do you do right now?',
    timeCost: 10,
    options: [
      { text: 'Call the resuscitation team, support airway, breathing and circulation, and take him to the aortic surgeons in theatre now', correct: true, feedback: 'A collapsing patient with a known dissection needs ABC support and emergency surgery. Only an operation can repair the torn aorta.', effect: -22 },
      { text: 'Send him back to the scanner for a repeat CT so the surgeons can see exactly how much the tear has spread since the first scan', correct: false, feedback: 'Leaving the resuscitation area to repeat a scan while he is collapsing wastes precious minutes. The diagnosis is already known.', effect: 20 },
      { text: 'Give a blood thinner through the drip in case a clot has formed in one of the arteries and is causing the sudden fall in pressure', correct: false, feedback: 'Blood thinners can make bleeding from a torn aorta much worse. They are dangerous in aortic dissection.', effect: 25 },
      { text: 'Raise his legs, recheck the blood pressure in both arms in fifteen minutes, and ask the nurse to call you if it gets lower still', correct: false, feedback: 'Watching and waiting is not enough when a patient with a torn aorta is crashing. He needs immediate help and surgery.', effect: 18 }
    ],
    results: { update: 'Resuscitation team at the bedside. He is taken straight to the operating room with the aortic surgery team.' }
  },
  decisions: [
    {
      title: 'Arrival — ripping chest pain',
      findings: 'He rates the pain 10 out of 10 and keeps pointing to his back. He is sweaty and pale. The paramedics only measured blood pressure in his right arm: 172/96.',
      question: 'What should you do first?',
      timeCost: 10,
      options: [
        { text: 'Attach a monitor, place a drip, check blood pressure in both arms and the pulses in his legs, and get an ECG right away', correct: true, feedback: 'Sudden "ripping" pain going to the back is a warning sign for a torn aorta. Comparing blood pressures and pulses on both sides is a quick bedside clue, and the ECG checks for a heart attack.', effect: -10 },
        { text: 'Give the full heart-attack package immediately, including blood thinners, because chest pain with sweating usually means a heart attack', correct: false, feedback: 'Blood thinners given to someone with a torn aorta can cause catastrophic bleeding. Not all severe chest pain is a heart attack, so check first.', effect: 20 },
        { text: 'Give a stomach-settling antacid and a painkiller, and then reassess him in an hour to see whether the pain has eased by itself', correct: false, feedback: 'Sudden, maximal pain going through to the back is not typical of indigestion. Waiting an hour could be fatal if this is a tear in the aorta.', effect: 15 },
        { text: 'Ask him to lie flat and rest quietly in the waiting area until a cubicle with a cardiac monitor becomes free later this evening', correct: false, feedback: 'A man with severe chest pain and high blood pressure needs immediate monitoring and assessment, not a wait.', effect: 16 }
      ],
      results: {
        update: 'Blood pressure right arm 168/94, left arm 132/80 — a big difference. The pulse in his left wrist feels weaker than the right.',
        imaging: [ { name: 'Portable chest X-ray', result: 'The middle part of the chest (mediastinum) looks wider than expected. Lungs clear.' } ]
      }
    },
    {
      title: 'Puzzling results',
      findings: 'The ECG shows no ST elevation and the first troponin is normal. Blood pressure is very different between his two arms, and the chest X-ray shows a widened middle chest.',
      question: 'What is the most useful next test?',
      timeCost: 25,
      options: [
        { text: 'An urgent CT scan with contrast dye of the whole aorta, from the chest down to the pelvis, read by a radiologist now', correct: true, feedback: 'Different arm pressures and a wide mediastinum point toward aortic dissection. A CT angiogram of the aorta shows the tear quickly and clearly.', effect: -12 },
        { text: 'Activate the cardiac catheter team and start blood thinners, since a normal first troponin can be too early to show heart damage', correct: false, feedback: 'Troponin can be early, but the arm pressure difference and wide chest point elsewhere. Blood thinners and a catheter into a torn aorta could be disastrous.', effect: 20 },
        { text: 'Repeat the troponin blood test in three hours, and if it is still normal, book an exercise treadmill test for later in the week', correct: false, feedback: 'A treadmill test is dangerous and useless here. The warning signs of a torn aorta need imaging now, not in days.', effect: 14 },
        { text: 'Order an ultrasound scan of the gallbladder and upper belly, because pain between the shoulder blades can come from gallstones', correct: false, feedback: 'Gallbladder pain can spread to the back, but the sudden ripping onset and the different arm pressures point to the aorta.', effect: 10 }
      ],
      results: {
        update: 'CT angiogram complete.',
        imaging: [ { name: 'CT angiogram of the aorta', result: 'A tear in the inner wall of the aorta starting just above the heart (Type A dissection) and extending down into the chest. The branch artery to the left arm is partly narrowed. Small amount of fluid around the heart.' } ]
      }
    },
    {
      title: 'Diagnosis confirmed — the next minutes',
      findings: 'This is a Type A aortic dissection. He is still in severe pain. Heart rate 104, blood pressure in the right arm 166/92. The team is gathering.',
      question: 'What should the emergency team do while surgery is being arranged?',
      timeCost: 15,
      options: [
        { text: 'Give strong pain relief and drip medicines that slow the heart and lower blood pressure, to the targets the specialist team sets', correct: true, feedback: 'Lowering heart rate and blood pressure reduces the force on the torn wall and helps stop the tear spreading, while pain relief also calms the heart. Specialists set the targets.', effect: -12 },
        { text: 'Give a clot-busting medicine through the drip to open up the narrowed artery to the left arm and restore normal blood flow to it', correct: false, feedback: 'Clot-busting medicines can cause the torn aorta to bleed uncontrollably. The narrowing is caused by the tear, not by a clot.', effect: 25 },
        { text: 'Run several large bags of fluid through the drip to bring the left-arm blood pressure up so that it matches the right arm again', correct: false, feedback: 'Raising the pressure pushes harder on the torn wall. The arm difference comes from the tear itself, not from low fluid.', effect: 14 },
        { text: 'Hold all medicines until the surgeons arrive so they can see how high his blood pressure and heart rate become without any treatment', correct: false, feedback: 'Leaving high pressure and a fast heart untreated increases the strain on the tear. Treatment should start straight away.', effect: 12 }
      ],
      results: {
        update: 'Pain easing. Heart rate 72, blood pressure 118/70 in the right arm.',
        labs: [ { name: 'Repeat troponin', value: 'Normal', flag: '', ref: 'Normal: very low' } ]
      }
    },
    {
      title: 'Who takes over?',
      findings: 'He is calmer and his pressure is controlled. A family member asks whether he can stay on the medical ward overnight and "see how he goes" before anything major is done.',
      question: 'What is the right plan for a Type A dissection?',
      timeCost: 20,
      options: [
        { text: 'Admit to the general medical ward on tablets, and plan a repeat CT scan in a week to see if the tear has healed on its own', correct: false, feedback: 'Some tears further down the aorta (Type B) can be watched, but a Type A tear near the heart carries a high risk of rupture and needs surgery.', effect: 16 },
        { text: 'Refer urgently to the cardiothoracic and vascular surgeons for emergency repair, keeping him in resus until theatre is ready', correct: true, feedback: 'A Type A dissection is a surgical emergency. The risk of rupture or damage to the heart rises with every hour, so the aortic surgeons need to repair it urgently.', effect: -14 },
        { text: 'Ask the cardiology team to do a catheter test of the heart arteries first, just to make sure there is no heart attack as well', correct: false, feedback: 'Passing catheters through a freshly torn aorta is risky and delays the operation. The CT has already explained his pain.', effect: 14 },
        { text: 'Discharge him with stronger blood pressure tablets and an urgent outpatient appointment with a heart surgeon later this week', correct: false, feedback: 'Sending home a patient with a fresh Type A tear is extremely dangerous. This cannot wait for a clinic appointment.', effect: 22 }
      ],
      results: { update: 'The cardiothoracic surgeon reviews the scans and accepts him for emergency surgery. The operating room is being prepared.' }
    },
    {
      title: 'Twist — a change before theatre',
      findings: 'While waiting, his blood pressure drops to 96/58 and he becomes paler. The left wrist pulse is now very faint, and he says his left hand feels cold and tingly. His heart sounds are a little quieter.',
      question: 'What is the best next action?',
      timeCost: 15,
      options: [
        { text: 'Tell the surgical team he is worsening and move him straight to the operating room now, without further delay for tests', correct: true, feedback: 'A falling pressure and new loss of a pulse suggest the tear is extending and may be leaking. The fix is surgery, so the team should go to theatre now.', effect: -16 },
        { text: 'Start a blood thinner for the cold left hand, since a sudden faint pulse and tingling fingers usually mean a clot in that artery', correct: false, feedback: 'The cold hand comes from the tear blocking the arm artery. A blood thinner could cause dangerous bleeding from the aorta.', effect: 22 },
        { text: 'Send him for a repeat CT scan to measure how far the tear has spread, and only then decide with the surgeons on timing', correct: false, feedback: 'He already has the diagnosis and is getting worse. A second scan delays the operation that he needs right now.', effect: 16 },
        { text: 'Give extra fluid and keep him in the department overnight, then review the plan with the surgeons on the morning ward round', correct: false, feedback: 'Waiting until morning while the aorta may be leaking is far too slow. This patient needs the operating room now.', effect: 20 }
      ],
      results: { update: 'Emergency aortic repair completed. The torn section of the aorta was replaced and blood flow to the left arm restored. He is transferred to the cardiac ICU, stable.' }
    }
  ],
  disposition: { type: 'icu', label: 'Emergency aortic surgery, then cardiac ICU', maxSeverity: 30 },
  teaching: 'Sudden "ripping" chest pain that goes through to the back, with different blood pressures in each arm, should make you think of aortic dissection. Always consider it before giving blood thinners for presumed heart attacks. CT angiography confirms it; control heart rate and blood pressure, and get Type A tears to the surgeons urgently.'
},

/* ───────────── D2: Simple faint ───────────── */
{
  id: 'd-cardio-syncope-01',
  title: 'Fainting at the school assembly',
  specialty: 'Cardiology',
  difficulty: 'Beginner',
  age: 15, sex: 'F',
  chiefComplaint: 'Fainted while standing at a school assembly',
  suspected: 'Fainting episode (syncope)',
  finalDiagnosis: 'Vasovagal syncope (a simple faint)',
  presentation: 'A 15-year-old girl was standing for a long school assembly in a warm hall when she felt hot, sick and light-headed, and her vision "went grey at the edges". She slumped to the floor and was out for about 20 seconds, according to her teacher. She woke up quickly, knew where she was, and was a little embarrassed. She skipped breakfast this morning. The school called an ambulance as a precaution.',
  history: {
    pmh: ['Fainted once before at a blood test two years ago'],
    meds: ['None'],
    allergies: 'No known allergies',
    social: 'In Year 10. Plays netball twice a week with no problems. Lives with her mother and brother.'
  },
  canDie: false,
  maxSeverity: 40,
  startSeverity: 15,
  drift: 0.3,
  recoveredDrift: -1.5,
  vitals: {
    stable:   { hr: 76,  sbp: 110, dbp: 68, rr: 14, spo2: 99, temp: 36.7 },
    critical: { hr: 104, sbp: 92,  dbp: 56, rr: 20, spo2: 98, temp: 36.9 }
  },
  initialLabs: [],
  initialImaging: [],
  decisions: [
    {
      title: 'Arrival — after the faint',
      findings: 'She is sitting on the trolley, a little pale, and says she feels "fine now, just wobbly". She did not hit her head. Her teacher says there was no jerking and she was not confused afterwards.',
      question: 'What should you do first?',
      timeCost: 10,
      options: [
        { text: 'Check her airway, breathing and pulse, measure vital signs lying and standing, and do a finger-prick blood sugar', correct: true, feedback: 'Start with the basics. Vital signs, including lying and standing blood pressure, and a quick sugar check catch common and fixable causes of fainting.', effect: -8 },
        { text: 'Send her for an urgent CT scan of the head, because anyone who has passed out needs a brain scan straight away', correct: false, feedback: 'A brain scan is not needed for a typical faint with no head injury and a quick full recovery. It adds radiation without helping.', effect: 5 },
        { text: 'Give her a sugary drink and send her straight back to her class, since teenagers often faint in hot assembly halls', correct: false, feedback: 'Fainting is usually harmless, but a doctor should first check for warning signs of a heart problem before sending her back.', effect: 6 },
        { text: 'Book an outpatient brain-wave test (EEG) for a possible seizure, and send her home now with her mother this morning', correct: false, feedback: 'Her story — warning feelings, a short blackout, quick recovery — fits a faint, not a seizure. She still needs a basic check before going home.', effect: 4 }
      ],
      results: {
        update: 'Lying BP 108/66, HR 74. Standing BP 104/64, HR 86 — only a small change. She feels fine standing.',
        labs: [ { name: 'Finger-prick blood sugar', value: '4.6 mmol/L (83 mg/dL)', flag: '', ref: '4.0–7.8 mmol/L' } ]
      }
    },
    {
      title: 'Checking the heart',
      findings: 'Her vital signs and blood sugar are normal. Her heart sounds are normal with no murmur.',
      question: 'Which test is most important for every patient who has fainted?',
      timeCost: 10,
      options: [
        { text: 'A brain MRI scan to look for any hidden problems inside the head that could cause someone to pass out', correct: false, feedback: 'An MRI is not a routine fainting test. It is only used when there are specific signs of a brain problem.', effect: 5 },
        { text: 'A full set of blood tests including liver tests, thyroid tests and cholesterol, with results reviewed next week', correct: false, feedback: 'Wide blood panels rarely explain a simple faint. The key quick test is the one that looks for dangerous heart rhythms.', effect: 4 },
        { text: 'A 12-lead ECG to look for heart rhythm problems that could cause a person to faint, even when they feel well', correct: true, feedback: 'An ECG is quick, painless and can reveal rare but dangerous electrical heart problems that cause fainting. Every fainting patient should have one.', effect: -8 },
        { text: 'A one-month home heart-monitor recording, started today, before anyone looks at her heart rhythm at all', correct: false, feedback: 'Longer heart monitoring is sometimes needed later, but the first step is a simple 12-lead ECG today.', effect: 4 }
      ],
      results: {
        imaging: [ { name: '12-lead ECG', result: 'Normal heart rhythm at a normal rate. Normal electrical intervals, including the QT interval. No signs of extra electrical pathways or a thickened heart muscle.' } ]
      }
    },
    {
      title: 'Looking for red flags',
      findings: 'The ECG is normal. She is now chatting with her mother and wants to go home. Her mother asks if there is anything else to check.',
      question: 'Which questions matter most before deciding she can go home?',
      timeCost: 10,
      options: [
        { text: 'Ask only what she ate and drank today, because skipping breakfast fully explains this faint and nothing else matters', correct: false, feedback: 'Skipping breakfast may have helped trigger the faint, but you must still ask about warning signs that point to a heart cause.', effect: 5 },
        { text: 'Ask about fainting during exercise, chest pain or a racing heart beforehand, and any family member who died young suddenly', correct: true, feedback: 'These are the "red flags" for a dangerous heart cause of fainting. If all are absent and the ECG is normal, a simple faint is very likely.', effect: -8 },
        { text: 'Skip further questions because her ECG was normal, which completely rules out any heart cause for her fainting episode', correct: false, feedback: 'A normal ECG is very reassuring, but it does not rule out everything. Red-flag questions are a key part of the assessment.', effect: 6 },
        { text: 'Ask about her school grades and friendships, as stress at school is the most common reason why teenagers faint', correct: false, feedback: 'Stress can play a part, but the priority is to screen for the rare heart conditions that can cause fainting.', effect: 4 }
      ],
      results: { update: 'She has never fainted during sport, has no chest pain or palpitations, and there is no family history of sudden death at a young age. Her mother confirms this.' }
    },
    {
      title: 'Going home safely',
      findings: 'She has a typical story for a simple faint: a hot room, long standing, no breakfast, warning feelings, and a fast full recovery. Her exam, ECG and blood sugar are normal, and there are no red flags.',
      question: 'What is the best plan?',
      timeCost: 10,
      options: [
        { text: 'Admit her to the children\'s ward for two days of heart monitoring to be completely sure that nothing has been missed', correct: false, feedback: 'With a classic story, normal ECG and no red flags, admission adds little. She can safely go home with clear advice.', effect: 5 },
        { text: 'Tell her to stop netball and all sport for a whole year in case exercise causes another fainting episode in the future', correct: false, feedback: 'Her faint was not related to exercise. Stopping sport is unnecessary — but fainting during exercise would be a reason to return.', effect: 4 },
        { text: 'Discharge home with advice on fluids, regular meals and sitting or lying down at warning signs, and when to come back', correct: true, feedback: 'Simple faints are common and harmless. Teaching her to recognize warning signs, stay hydrated, eat regularly, and return for red flags keeps her safe.', effect: -10 },
        { text: 'Refer her urgently to the neurology clinic for a brain-wave test, because fainting twice means a seizure condition is likely', correct: false, feedback: 'Her two episodes both had clear triggers and warning feelings typical of fainting, not seizures. A neurology referral is not needed.', effect: 5 }
      ],
      results: { update: 'She goes home with her mother, a written leaflet about fainting, and advice to see her family doctor if it happens again.' }
    }
  ],
  disposition: { type: 'home', label: 'Discharged home with fainting advice and family doctor follow-up', maxSeverity: 20 },
  teaching: 'Most fainting in teenagers is a harmless "vasovagal" faint triggered by heat, standing, hunger or emotion, with warning feelings and a quick recovery. Every fainting patient needs vital signs, a blood sugar and an ECG. Red flags — fainting during exercise, chest pain or palpitations, or a family history of sudden death — need further heart tests.'
},

/* ───────────── D3: Spontaneous pneumothorax ───────────── */
{
  id: 'd-resp-pneumothorax-01',
  title: 'Sudden chest pain in a tall young man',
  specialty: 'Respiratory',
  difficulty: 'Intermediate',
  age: 19, sex: 'M',
  chiefComplaint: 'Sudden sharp left-sided chest pain and shortness of breath',
  suspected: 'Sudden one-sided chest pain — cause to be determined',
  finalDiagnosis: 'Primary spontaneous pneumothorax (collapsed left lung), progressing to tension pneumothorax',
  presentation: 'A tall, thin 19-year-old university student was sitting at his desk studying when he felt a sudden sharp pain on the left side of his chest, worse when breathing in. Over the next hour he became more short of breath, especially walking up stairs. He has never had anything like this before. He walked into the emergency department with a friend.',
  history: {
    pmh: ['None'],
    meds: ['None'],
    allergies: 'No known allergies',
    social: 'Smokes a few cigarettes at weekends. Plays basketball. Lives in student housing.'
  },
  canDie: true,
  startSeverity: 30,
  drift: 0.8,
  recoveredDrift: -1.5,
  vitals: {
    stable:   { hr: 80,  sbp: 122, dbp: 74, rr: 15, spo2: 98, temp: 36.8 },
    critical: { hr: 138, sbp: 80,  dbp: 48, rr: 34, spo2: 82, temp: 36.9 }
  },
  initialLabs: [],
  initialImaging: [],
  events: [ { afterMinutes: 75, text: 'Nurse: he says the breathlessness is getting worse and the pain is sharper.', effect: 6 } ],
  rescue: {
    title: 'Struggling to breathe',
    findings: 'He is gasping and can barely speak. Oxygen level is 84% on oxygen, blood pressure has fallen to 84/52, the windpipe is pushed to the right and his neck veins are swollen.',
    question: 'What is the immediate action?',
    timeCost: 10,
    options: [
      { text: 'Treat this as a tension pneumothorax: call for senior help and have the trapped air released straight away, before any X-ray', correct: true, feedback: 'A tension pneumothorax is diagnosed at the bedside. Releasing the trapped air immediately is life-saving; waiting for an X-ray can be fatal.', effect: -24 },
      { text: 'Get an urgent portable chest X-ray first to confirm the diagnosis, then decide on treatment once a radiologist has reported it', correct: false, feedback: 'With classic tension signs and falling blood pressure, there is no time for an X-ray. The air must be released now.', effect: 20 },
      { text: 'Put on a tight-fitting pressure breathing mask to push extra air into his lungs and raise his oxygen level more quickly', correct: false, feedback: 'Pushing air in under pressure can make a tension pneumothorax worse by forcing more air into the chest space.', effect: 18 },
      { text: 'Give an inhaled bronchodilator nebulizer in case this is a severe asthma attack, and reassess in twenty minutes', correct: false, feedback: 'This is not asthma: one side is quiet, the windpipe has shifted, and blood pressure is falling. These are tension signs.', effect: 18 }
    ],
    results: { update: 'Trapped air released by the senior doctor. His breathing eases and blood pressure begins to recover. A chest drain is placed by the team.' }
  },
  decisions: [
    {
      title: 'Arrival — sharp chest pain',
      findings: 'He is uncomfortable, holding the left side of his chest. He can speak in full sentences but is a bit breathless. Oxygen level 94% on room air, heart rate 98.',
      question: 'What should you do first?',
      timeCost: 10,
      options: [
        { text: 'Put him on a monitor with oxygen, check vital signs, and examine his chest, comparing breath sounds on both sides', correct: true, feedback: 'Start with the ABCs. Listening to both sides of the chest is a quick way to spot a collapsed lung, which makes breath sounds quieter on one side.', effect: -8 },
        { text: 'Give him anti-inflammatory painkillers for a pulled chest muscle and send him home to rest with a follow-up next week', correct: false, feedback: 'Sudden one-sided pain with breathlessness and low-ish oxygen is not a typical muscle strain. He needs examining and a chest X-ray first.', effect: 10 },
        { text: 'Send him to the treadmill lab for an exercise ECG test to check whether the pain is coming from his heart muscle', correct: false, feedback: 'Exercise testing is not for someone breathless with new chest pain. It could make things worse if a lung has collapsed.', effect: 12 },
        { text: 'Ask him to wait in the waiting room until the pain settles, because a young fit man is very unlikely to be seriously unwell', correct: false, feedback: 'Young people can have serious illness. Low oxygen and sudden breathlessness need prompt assessment.', effect: 10 }
      ],
      results: { update: 'Breath sounds are clearly quieter on the left side. The left side of the chest sounds hollow when tapped. The windpipe is in the middle.' }
    },
    {
      title: 'Choosing a test',
      findings: 'Breath sounds are reduced on the left. He has no fever, no cough and no leg swelling. Oxygen level is 95% on oxygen.',
      question: 'Which test will most likely confirm the diagnosis?',
      timeCost: 15,
      options: [
        { text: 'A D-dimer blood test for blood clots, and wait for the result before arranging any imaging of the chest at all', correct: false, feedback: 'A clot in the lung is possible but less likely here, and the exam already points to air around the lung, which an X-ray shows quickly.', effect: 6 },
        { text: 'A CT scan of the abdomen, since pain in the lower ribs on the left can sometimes come from the spleen or the kidney', correct: false, feedback: 'The problem is in the chest: quiet breath sounds on one side. An abdominal scan will not show a collapsed lung.', effect: 8 },
        { text: 'An upright chest X-ray, which can show air in the space between the lung and the chest wall on the affected side', correct: true, feedback: 'A chest X-ray is quick and shows the edge of a collapsed lung with air around it. It also shows how big the pneumothorax is.', effect: -8 },
        { text: 'A sputum sample sent to the laboratory to look for an infection, and start antibiotics while waiting for the result', correct: false, feedback: 'He has no fever or cough. Antibiotics will not help air leaking around the lung.', effect: 6 }
      ],
      results: {
        imaging: [ { name: 'Chest X-ray', result: 'Large left pneumothorax: the lung has partly collapsed away from the chest wall with a visible edge. No shift of the heart or windpipe at this stage. Right lung normal.' } ]
      }
    },
    {
      title: 'Planning treatment',
      findings: 'The X-ray shows a large collapsed left lung. He is still breathless when he moves and his oxygen level is 94–95% on oxygen. He asks if he can just go home and rest.',
      question: 'What is the best plan now?',
      timeCost: 20,
      options: [
        { text: 'Ask the experienced team to remove the air from around the lung with a small drain or needle, and keep him on oxygen', correct: true, feedback: 'A large pneumothorax causing breathlessness usually needs the air removed so the lung can re-expand. Specialists choose the method.', effect: -10 },
        { text: 'Discharge him home with painkillers and ask him to come back in two weeks for a repeat X-ray to check on the lung', correct: false, feedback: 'Small pneumothoraces with no breathlessness may be watched, but a large one with breathlessness and low oxygen should not go home untreated.', effect: 12 },
        { text: 'Give him a breathing exerciser and ask him to blow hard into it every hour to force the collapsed lung back open', correct: false, feedback: 'Blowing hard does not seal the leak, and straining may make the air leak worse. The trapped air needs to be removed.', effect: 8 },
        { text: 'Start a pressure breathing mask to push the lung back out, and repeat the chest X-ray in four hours to check progress', correct: false, feedback: 'Pressure breathing can push more air through the leak and risks making the pneumothorax bigger.', effect: 14 }
      ],
      results: { update: 'The respiratory team agrees and is preparing to place a small chest drain. He is waiting on oxygen.' }
    },
    {
      title: 'Twist — sudden worsening',
      findings: 'Before the drain is placed, he suddenly becomes much more breathless and anxious. Heart rate 128, blood pressure 94/60, oxygen level 88% on oxygen. His windpipe is now pushed to the right and his neck veins are swollen.',
      question: 'What is happening and what should you do?',
      timeCost: 10,
      options: [
        { text: 'This is a panic attack from fear of the drain, so reassure him, coach slow breathing and recheck the vital signs shortly', correct: false, feedback: 'Anxiety cannot shift the windpipe or drop the blood pressure. These are signs of a life-threatening tension pneumothorax.', effect: 18 },
        { text: 'Repeat the chest X-ray first to see if the lung has collapsed further before deciding whether anything needs to change', correct: false, feedback: 'Tension pneumothorax is a bedside diagnosis. Waiting for an X-ray wastes minutes that matter.', effect: 16 },
        { text: 'Recognize tension pneumothorax and get a senior doctor to release the trapped air immediately, without waiting for imaging', correct: true, feedback: 'Air trapped under pressure is squeezing the heart and the other lung. Releasing it immediately, done by an experienced clinician, is life-saving.', effect: -18 },
        { text: 'Order a CT pulmonary angiogram, because sudden worsening with low pressure could mean a large blood clot in the lungs', correct: false, feedback: 'A blood clot is a reasonable thought in general, but the shifted windpipe and quiet left chest point to tension. A scanner trip now is dangerous.', effect: 16 }
      ],
      results: {
        update: 'The senior doctor releases the trapped air with a rush. His breathing eases within minutes. A chest drain is then placed by the team.',
        imaging: [ { name: 'Repeat chest X-ray', result: 'Chest drain in place on the left. The left lung has re-expanded. Windpipe back in the middle.' } ]
      }
    },
    {
      title: 'Next steps',
      findings: 'He is comfortable, oxygen level 97%, blood pressure 120/74. The drain is bubbling a little. He asks when he can go home and whether he can fly to visit his family next week.',
      question: 'What is the right plan?',
      timeCost: 20,
      options: [
        { text: 'Remove the drain now and send him home today, since the lung is back up and he feels much better than he did before', correct: false, feedback: 'A drain that is still bubbling means the air leak may not have sealed. Removing it now risks the lung collapsing again.', effect: 12 },
        { text: 'Admit to the respiratory ward with the drain, advise stopping smoking, and no flying until a doctor clears him', correct: true, feedback: 'He needs monitoring until the leak seals. Smoking raises the risk of it happening again, and pressure changes on flights can re-collapse the lung.', effect: -10 },
        { text: 'Admit to intensive care for a breathing machine overnight, so that the lungs can rest fully after such a serious event', correct: false, feedback: 'He is now breathing comfortably on his own. A breathing machine is not needed and could worsen an air leak.', effect: 10 },
        { text: 'Discharge home with the drain still in place and tell him to fly next week as planned if he feels well enough by then', correct: false, feedback: 'Flying soon after a pneumothorax is unsafe until cleared, and a bubbling drain needs hospital monitoring.', effect: 12 }
      ],
      results: { update: 'Admitted to the respiratory ward. The drain stopped bubbling after two days and was removed. He went home with smoking-cessation support and clinic follow-up.' }
    }
  ],
  disposition: { type: 'ward', label: 'Admitted to the respiratory ward with a chest drain', maxSeverity: 28 },
  teaching: 'Tall, thin young men (often smokers) can develop a spontaneous pneumothorax: sudden one-sided chest pain with quieter breath sounds on that side. A chest X-ray confirms it. Watch for tension pneumothorax — worsening breathlessness, low blood pressure, a shifted windpipe and swollen neck veins — which must be treated immediately at the bedside, without waiting for an X-ray.'
},

/* ───────────── D4: Subarachnoid hemorrhage ───────────── */
{
  id: 'd-neuro-sah-01',
  title: 'The worst headache of her life',
  specialty: 'Neurology',
  difficulty: 'Advanced',
  age: 44, sex: 'F',
  chiefComplaint: 'Sudden severe headache during exercise',
  suspected: 'Sudden severe headache — cause to be determined',
  finalDiagnosis: 'Subarachnoid hemorrhage from a ruptured brain aneurysm, complicated by hydrocephalus',
  presentation: 'A 44-year-old woman was lifting weights at the gym this morning when she felt a sudden, explosive headache at the back of her head — "like being hit with a bat, the worst headache of my life". It reached full strength within a minute. She vomited twice and has found bright lights uncomfortable since. She went home thinking it was a migraine, but the pain did not settle, so her partner drove her in. It is now about 12 hours since the headache began.',
  history: {
    pmh: ['High blood pressure', 'Occasional mild migraines (never like this)'],
    meds: ['Blood pressure tablet'],
    allergies: 'Allergic to penicillin (rash)',
    social: 'Smokes 10 cigarettes a day. Works as an accountant. Her mother had a "bleed in the brain" in her fifties.'
  },
  canDie: true,
  startSeverity: 45,
  drift: 1.8,
  recoveredDrift: -1,
  vitals: {
    stable:   { hr: 74, sbp: 132, dbp: 80, rr: 14, spo2: 98, temp: 37.0 },
    critical: { hr: 52, sbp: 196, dbp: 110, rr: 8, spo2: 89, temp: 37.6 }
  },
  initialLabs: [
    { name: 'Platelets', value: '245 ×10⁹/L', flag: '', ref: '150–400' },
    { name: 'Clotting time (INR)', value: '1.0', flag: '', ref: '0.9–1.2' },
    { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' }
  ],
  initialImaging: [],
  rescue: {
    title: 'Getting harder to wake',
    findings: 'She is now very hard to wake and only groans to a firm touch. Her breathing is slow and irregular, her heart rate has fallen to 52, and her blood pressure has risen to 196/110.',
    question: 'What is your immediate priority?',
    timeCost: 10,
    options: [
      { text: 'Call the resuscitation team to protect her airway and breathing, and get neurosurgery to treat the rising brain pressure now', correct: true, feedback: 'Slow heart rate, high blood pressure and irregular breathing are signs of dangerously high pressure inside the skull. Protect the airway and get emergency neurosurgical help.', effect: -22 },
      { text: 'Give a strong sedative to calm her down and lower her blood pressure, then recheck how alert she is in half an hour', correct: false, feedback: 'Sedating a patient who is already hard to wake can stop her breathing and hides the signs of brain pressure. She needs airway support and neurosurgery.', effect: 20 },
      { text: 'Send her for an MRI scan of the brain to get the most detailed images possible before anyone makes a treatment decision', correct: false, feedback: 'An MRI takes a long time and she is unstable. Airway protection and neurosurgical treatment come first.', effect: 18 },
      { text: 'Let her sleep, because a long day with a bad headache is exhausting and rest is likely to help her recover more quickly', correct: false, feedback: 'Becoming harder to wake is a warning sign, not tiredness. It means the brain is under pressure.', effect: 22 }
    ],
    results: { update: 'Airway secured by the resuscitation team. Neurosurgery takes her for emergency treatment to relieve the pressure.' }
  },
  decisions: [
    {
      title: 'Arrival — thunderclap headache',
      findings: 'She is lying in a darkened corner with her eyes shut. She is alert and talking but in severe pain. Blood pressure 176/98. Bending her neck forward is painful and stiff. She has no fever.',
      question: 'What is the most important first step?',
      timeCost: 15,
      options: [
        { text: 'Check her ABCs and neurological status, give pain and sickness relief, and arrange an urgent CT scan of the head', correct: true, feedback: 'A sudden "thunderclap" headache that peaks within a minute must be treated as a brain bleed until proven otherwise. A CT scan of the head is the first test.', effect: -10 },
        { text: 'Treat it as a bad migraine with headache tablets in a dark room, and discharge her once the pain has eased off a little', correct: false, feedback: 'She says it is unlike her usual migraines, and it started suddenly during exertion. That is a red flag for a bleed.', effect: 16 },
        { text: 'Book an MRI scan of the brain as an outpatient for next week, and give her strong painkillers to take home in the meantime', correct: false, feedback: 'A possible brain bleed needs investigating today, not next week. Delays risk a second, more serious bleed.', effect: 18 },
        { text: 'Start antibiotics straight away for meningitis, since a stiff neck and dislike of light always mean a brain infection', correct: false, feedback: 'Meningitis can cause a stiff neck, but she has no fever and the sudden explosive onset points to bleeding. She needs a CT first.', effect: 10 }
      ],
      results: {
        update: 'She is alert and fully oriented with no weakness. CT head completed.',
        imaging: [ { name: 'CT head (no contrast)', result: 'No definite blood seen. Brain fluid spaces normal size. No mass. Reported as "no acute abnormality".' } ]
      }
    },
    {
      title: 'Twist — a reassuring scan?',
      findings: 'The CT is reported as normal. Her headache has eased slightly with medicine, but her neck is still stiff. Her partner asks if this means she can go home. Remember: the scan was done about 12 hours after the headache started.',
      question: 'How should you interpret this result?',
      timeCost: 20,
      options: [
        { text: 'A normal CT rules out a brain bleed completely at any time point, so this must be a migraine and she can go home tonight', correct: false, feedback: 'CT is very good at finding bleeds in the first few hours, but it becomes less reliable as time passes. A normal CT after 6 hours does not rule it out.', effect: 16 },
        { text: 'The CT may miss a small bleed this long after onset, so arrange a lumbar puncture to look for blood breakdown in spinal fluid', correct: true, feedback: 'After about 6 hours, a small bleed may no longer show on CT. Testing the spinal fluid for blood breakdown products (or other tests chosen by the team) is needed.', effect: -12 },
        { text: 'Admit her to the ward on pain relief and repeat the same CT scan in a week to see whether any blood has appeared by then', correct: false, feedback: 'Blood fades on CT over days, so a later scan is even less likely to show it. Waiting a week also risks a second bleed.', effect: 12 },
        { text: 'Check her blood pressure again and, if it has settled, send her home with advice to rest and avoid the gym for a while', correct: false, feedback: 'Blood pressure alone cannot answer the question. A sudden thunderclap headache with a normal late CT still needs further testing.', effect: 14 }
      ],
      results: {
        update: 'Lumbar puncture performed by the team.',
        labs: [
          { name: 'Spinal fluid appearance', value: 'Yellow-tinged (xanthochromia)', flag: 'C', ref: 'Clear and colorless' },
          { name: 'Spinal fluid red cells', value: 'Many, not clearing between tubes', flag: 'H', ref: 'None' }
        ]
      }
    },
    {
      title: 'Finding the source',
      findings: 'The yellow-tinged spinal fluid shows there has been bleeding around the brain (subarachnoid hemorrhage). The most common cause is a ruptured aneurysm — a weak bulge in a brain artery.',
      question: 'What should happen next?',
      timeCost: 25,
      options: [
        { text: 'Arrange a CT angiogram of the brain arteries and contact neurosurgery urgently so the bleeding source can be secured', correct: true, feedback: 'An angiogram finds the aneurysm, and the neurosurgical or neurointerventional team can seal it. Securing it early reduces the risk of a deadly re-bleed.', effect: -12 },
        { text: 'Start a blood-thinning medicine to stop clots forming in the brain arteries, then plan the next scan for tomorrow morning', correct: false, feedback: 'Blood thinners are dangerous after a brain bleed because they can trigger more bleeding.', effect: 22 },
        { text: 'Refer to the neurology outpatient clinic for headache review, and send her home with stronger pain relief to take if needed', correct: false, feedback: 'A confirmed brain bleed is an emergency and must be managed in hospital by neurosurgery.', effect: 20 },
        { text: 'Ask the infectious disease team to see her, since the abnormal spinal fluid most likely means she has a viral meningitis', correct: false, feedback: 'Yellow fluid with many red cells that do not clear points to old bleeding, not infection.', effect: 12 }
      ],
      results: {
        update: 'Neurosurgery has accepted her care.',
        imaging: [ { name: 'CT angiogram of brain arteries', result: 'A small aneurysm (bulge) on an artery at the base of the brain, the likely source of the bleed.' } ]
      }
    },
    {
      title: 'Keeping her safe until the aneurysm is treated',
      findings: 'The aneurysm will be treated by the neurosurgical team as soon as possible. Meanwhile her blood pressure is 184/102, she still has a headache, and she feels sick.',
      question: 'What is the best approach while she waits?',
      timeCost: 20,
      options: [
        { text: 'Leave her blood pressure high on purpose, because the brain needs extra pressure to push blood through after a bleed', correct: false, feedback: 'Very high blood pressure before the aneurysm is secured increases the risk of a re-bleed. Specialists set a safe target.', effect: 14 },
        { text: 'Give aspirin for the headache, since it is a strong painkiller that also helps blood flow through the narrowed brain arteries', correct: false, feedback: 'Aspirin affects blood clotting and can increase bleeding. It should be avoided after a brain bleed.', effect: 18 },
        { text: 'Lower her blood pressure as low and as fast as possible with several drip medicines at once, to fully prevent any re-bleed', correct: false, feedback: 'Dropping pressure too far or too fast can starve the brain of blood. Lowering should be careful, to the specialist target.', effect: 12 },
        { text: 'Lower blood pressure carefully to the neurosurgery target, treat pain and sickness, and keep her calm and monitored', correct: true, feedback: 'Careful blood pressure control, good pain and nausea relief, a calm quiet setting and frequent neuro checks reduce the risk of a re-bleed while she waits.', effect: -12 }
      ],
      results: { update: 'Blood pressure 148/86. Headache easing. The neurosurgical team also starts a medicine to help protect against artery spasm, as directed.' }
    },
    {
      title: 'Twist — new drowsiness',
      findings: 'Two hours later the nurse is worried. She is now drowsy, confused about where she is, and keeps closing her eyes mid-sentence. Her pupils are equal and react to light. Blood pressure 162/94.',
      question: 'What should you do?',
      timeCost: 15,
      options: [
        { text: 'Let her sleep undisturbed until the morning ward round, since she has had a long and exhausting day in hospital', correct: false, feedback: 'New drowsiness after a brain bleed is a warning sign of re-bleeding or fluid build-up in the brain. It needs urgent review.', effect: 20 },
        { text: 'Give a sedative to settle her confusion so that she does not pull at her drip, and recheck her an hour or so later', correct: false, feedback: 'Sedation can hide worsening brain function and slow her breathing. The cause of the drowsiness must be found first.', effect: 18 },
        { text: 'Arrange an urgent repeat CT scan of the head, call neurosurgery now, and keep a close watch on her airway and breathing', correct: true, feedback: 'New drowsiness can mean a re-bleed or blocked brain fluid (hydrocephalus). A quick scan and urgent neurosurgical review can be life-saving.', effect: -14 },
        { text: 'Recheck her blood sugar and salt levels, and if those are normal, assume the confusion is a side effect of her medicines', correct: false, feedback: 'Blood tests are reasonable, but they must not delay an urgent scan and neurosurgical review in someone with a brain bleed.', effect: 10 }
      ],
      results: {
        update: 'Neurosurgery reviewed her immediately and placed a drain to relieve the fluid pressure. She woke up more over the next hour. The aneurysm was sealed the following morning.',
        imaging: [ { name: 'Repeat CT head', result: 'The fluid spaces in the brain (ventricles) have enlarged — hydrocephalus. No new bleeding.' } ]
      }
    }
  ],
  disposition: { type: 'icu', label: 'Admitted to the neuro ICU under neurosurgery', maxSeverity: 30 },
  teaching: 'A sudden "thunderclap" headache that peaks within a minute — especially the "worst headache of my life" — must be treated as a brain bleed. CT is very sensitive early, but after about 6 hours a normal CT does not rule it out, so further testing such as a lumbar puncture is needed. Careful blood pressure control and urgent neurosurgery help prevent re-bleeding, and new drowsiness is an emergency.'
},

/* ───────────── D5: Cardiac tamponade ───────────── */
{
  id: 'd-cardio-tamponade-01',
  title: 'Breathless and dizzy after a viral illness',
  specialty: 'Cardiology',
  difficulty: 'Expert',
  age: 34, sex: 'M',
  chiefComplaint: 'Increasing breathlessness, dizziness and chest discomfort',
  suspected: 'Breathlessness with low blood pressure — cause to be determined',
  finalDiagnosis: 'Cardiac tamponade from a large pericardial effusion after viral pericarditis',
  presentation: 'A 34-year-old man had a flu-like illness two weeks ago. A week later he developed sharp chest pain that was better when he sat up and leaned forward. Over the last three days he has become more and more breathless, especially lying flat, and today he nearly fainted getting out of bed. He arrives looking pale and anxious, sitting bolt upright.',
  history: {
    pmh: ['None'],
    meds: ['Over-the-counter painkillers for the chest pain'],
    allergies: 'No known allergies',
    social: 'Non-smoker. Works as a primary school teacher. Lives with his partner.'
  },
  canDie: true,
  startSeverity: 55,
  drift: 2.0,
  recoveredDrift: -1,
  vitals: {
    stable:   { hr: 80,  sbp: 120, dbp: 76, rr: 15, spo2: 98, temp: 37.1 },
    critical: { hr: 138, sbp: 70,  dbp: 52, rr: 30, spo2: 90, temp: 37.4 }
  },
  initialLabs: [
    { name: 'Troponin (heart muscle damage marker)', value: 'Slightly raised', flag: 'H', ref: 'Normal: very low' },
    { name: 'Lactate', value: '3.2 mmol/L', flag: 'H', ref: '0.5–2.0' },
    { name: 'C-reactive protein (inflammation)', value: '64 mg/L', flag: 'H', ref: '<5' }
  ],
  initialImaging: [],
  rescue: {
    title: 'Close to collapse',
    findings: 'His blood pressure falls to 68/50 and he becomes confused and grey. The monitor shows a fast heart rate, but his pulse is barely felt at the wrist.',
    question: 'What is the immediate action?',
    timeCost: 10,
    options: [
      { text: 'Call the resuscitation team and have the most experienced clinician drain the fluid around the heart right now', correct: true, feedback: 'In tamponade the heart is being squeezed by fluid. Removing that fluid immediately is the only thing that will restore circulation.', effect: -24 },
      { text: 'Give a strong water tablet (diuretic) through the drip to clear the fluid, since swollen neck veins show the body is overloaded', correct: false, feedback: 'The fluid is trapped around the heart, not in the body. A diuretic lowers filling even further and can cause collapse.', effect: 22 },
      { text: 'Put him to sleep and on a breathing machine first, so his breathing is fully controlled before anything is done to the heart', correct: false, feedback: 'Sedation and pressure breathing can reduce filling of an already squeezed heart and cause cardiac arrest. Drainage comes first.', effect: 20 },
      { text: 'Send him urgently to the CT scanner to see exactly where the fluid is, so the team can plan the safest drainage approach', correct: false, feedback: 'He is too unstable to leave resus. Bedside ultrasound has already shown the fluid.', effect: 18 }
    ],
    results: { update: 'Fluid drained at the bedside by the cardiology team. Blood pressure rises quickly and he becomes more alert.' }
  },
  decisions: [
    {
      title: 'Arrival — breathless and pale',
      findings: 'Heart rate 122, blood pressure 92/70, breathing rate 26. He prefers to sit forward. His neck veins look swollen even while sitting up, and his heart sounds are hard to hear. His lungs sound clear.',
      question: 'What should you do first?',
      timeCost: 10,
      options: [
        { text: 'Give a nitrate spray under the tongue for the chest discomfort, and lay him flat to rest while the ECG is being done', correct: false, feedback: 'Nitrates lower the amount of blood filling the heart and can cause a dangerous drop in pressure here. Lying flat also makes him more breathless.', effect: 16 },
        { text: 'Place him on a monitor with a drip, get an ECG, and do a bedside ultrasound of the heart right away in the resus room', correct: true, feedback: 'Low blood pressure, swollen neck veins and quiet heart sounds (Beck\'s triad) suggest fluid squeezing the heart. A bedside ultrasound shows it within minutes.', effect: -12 },
        { text: 'Start a water tablet (diuretic) for heart failure, since swollen neck veins mean there is too much fluid in his body', correct: false, feedback: 'His lungs are clear, so this is not typical heart failure. A diuretic would reduce heart filling and drop his blood pressure further.', effect: 16 },
        { text: 'Send him for a CT scan of the chest to look for a blood clot in the lungs before giving any treatment or doing anything else', correct: false, feedback: 'A lung clot is worth considering, but sending a patient with low blood pressure out of resus is risky when a bedside test can answer quickly.', effect: 12 }
      ],
      results: {
        update: 'His blood pressure drops noticeably each time he breathes in (pulsus paradoxus).',
        imaging: [
          { name: '12-lead ECG', result: 'Fast regular rhythm. Small (low-voltage) complexes, and the size of each beat alternates slightly from beat to beat.' },
          { name: 'Bedside heart ultrasound', result: 'Large collection of fluid all around the heart. The right-sided heart chambers are being squashed and collapse inward with each beat.' }
        ]
      }
    },
    {
      title: 'Putting it together',
      findings: 'The ultrasound shows a large fluid collection squeezing the right side of the heart. Blood pressure is now 88/68. He is anxious and breathless.',
      question: 'What is the diagnosis and the key next step?',
      timeCost: 15,
      options: [
        { text: 'Viral pericarditis only: start anti-inflammatory medicine, admit to the ward, and repeat the ultrasound in a week', correct: false, feedback: 'Anti-inflammatories treat pericarditis, but this fluid is already squeezing the heart and causing shock. It must be drained urgently.', effect: 18 },
        { text: 'Heart failure from a weak heart: start drip medicines to make the heart pump harder and arrange a cardiology clinic visit', correct: false, feedback: 'The heart muscle is not the main problem — it cannot fill because fluid is squashing it. Pumping harder will not help much.', effect: 14 },
        { text: 'Cardiac tamponade: call cardiology urgently for drainage of the fluid around the heart, and support his circulation meanwhile', correct: true, feedback: 'Tamponade means fluid around the heart is squeezing it so it cannot fill. Urgent drainage by the specialist team is life-saving.', effect: -14 },
        { text: 'A large heart attack: start blood thinners and call the cardiac catheter team to open a blocked artery as fast as possible', correct: false, feedback: 'The troponin is only slightly raised from inflammation, and the ultrasound explains the shock. Blood thinners could cause bleeding into the fluid around the heart.', effect: 20 }
      ],
      results: { update: 'The cardiology team is on its way and preparing for urgent drainage. Expected in about 20 minutes.' }
    },
    {
      title: 'Supporting him while the team prepares',
      findings: 'Blood pressure 86/66, heart rate 126. He is getting tired and the nurse asks whether he should be put to sleep and on a breathing machine "to take the strain off".',
      question: 'What is the best way to support him until drainage?',
      timeCost: 20,
      options: [
        { text: 'Put him to sleep and on a breathing machine now, so his work of breathing is reduced while the cardiology team gets ready', correct: false, feedback: 'Sedating medicines and pressure breathing both reduce how much blood fills the heart. In tamponade this can cause sudden collapse.', effect: 20 },
        { text: 'Give fluid as directed to help the heart fill, keep him sitting up on oxygen, and avoid sedation or pressure breathing', correct: true, feedback: 'A squeezed heart depends on good filling. Fluid can help temporarily, and avoiding sedation and breathing machines prevents a sudden drop in pressure.', effect: -12 },
        { text: 'Give a water tablet (diuretic) to clear his swollen neck veins, and lay him flat so the blood pressure reading improves', correct: false, feedback: 'Diuretics reduce heart filling and can trigger collapse. Lying flat also worsens breathlessness.', effect: 18 },
        { text: 'Give a strong sedative to calm his anxiety, because his fast heart rate is mostly due to fear about what is going to happen', correct: false, feedback: 'The fast heart rate is the body\'s way of keeping blood flowing. Sedatives can drop the blood pressure dangerously.', effect: 16 }
      ],
      results: {
        update: 'Cardiology drained a large amount of straw-colored fluid from around the heart, guided by ultrasound. A small drain was left in place. Blood pressure rises to 116/74 and his heart rate falls to 92.',
        labs: [ { name: 'Lactate', value: '1.6 mmol/L', flag: '', ref: '0.5–2.0' } ]
      }
    },
    {
      title: 'After drainage — finding the cause',
      findings: 'He feels much better. The fluid sample has been collected. Although a recent virus is the most likely cause, other causes of fluid around the heart are possible.',
      question: 'What is the best plan now?',
      timeCost: 25,
      options: [
        { text: 'Admit to cardiac ICU with the drain, test the fluid for infection, cancer and other causes, and treat the inflammation', correct: true, feedback: 'He needs close monitoring in case the fluid returns. Testing the fluid checks for less common causes such as bacterial or TB infection, cancer, kidney or immune conditions.', effect: -10 },
        { text: 'Remove the drain and discharge him home today, since the fluid has been taken off and the cause was almost certainly a virus', correct: false, feedback: 'Fluid can build up again within hours to days. He needs close monitoring and the cause still needs confirming.', effect: 16 },
        { text: 'Throw away the fluid sample because tests are not useful, and transfer him to a general ward with routine checks every six hours', correct: false, feedback: 'Testing the fluid can find important causes like infection or cancer. And he needs closer monitoring than routine ward checks.', effect: 10 },
        { text: 'Start broad antibiotics for presumed bacterial infection around the heart and stop all other tests, since infection is very likely', correct: false, feedback: 'Bacterial infection is possible but less likely after a viral illness. Treatment should be guided by the fluid tests.', effect: 8 }
      ],
      results: {
        update: 'Admitted to cardiac ICU. Early fluid tests show inflammation but no bacteria. Anti-inflammatory treatment started by the cardiology team.',
        labs: [ { name: 'Fluid sample — bacteria on microscope', value: 'None seen', flag: '', ref: 'None' } ]
      }
    },
    {
      title: 'Twist — the next morning',
      findings: 'Overnight, the drain stopped putting out fluid. This morning his heart rate has risen to 118, his blood pressure is 94/72 and his neck veins look swollen again. He says he feels breathless.',
      question: 'What should you do?',
      timeCost: 15,
      options: [
        { text: 'Take out the drain because nothing is coming out of it, which shows the fluid has stopped forming and is no longer needed', correct: false, feedback: 'An empty drain with worsening signs may mean the drain is blocked while fluid builds up again. Removing it removes a lifeline.', effect: 16 },
        { text: 'Give a diuretic for the swollen neck veins and repeat his blood tests at lunchtime to see if the kidneys are coping well', correct: false, feedback: 'Swollen neck veins with low pressure suggest the heart is being squeezed again. A diuretic could make that worse.', effect: 18 },
        { text: 'Repeat a bedside heart ultrasound now to check for fluid building up again, and call the cardiology team back urgently', correct: true, feedback: 'Returning signs of tamponade with a quiet drain suggest a blocked drain and fluid re-accumulating. An ultrasound confirms it and the team can fix it.', effect: -14 },
        { text: 'Assume he is dehydrated from the night, give a large fluid bolus and recheck him in three hours before doing anything else', correct: false, feedback: 'Fluid may buy a little time, but the cause must be checked now. Waiting three hours risks collapse.', effect: 12 }
      ],
      results: {
        update: 'Ultrasound showed the fluid was building up again because the drain was blocked. The cardiology team cleared the problem and drained the fluid. His blood pressure returned to normal.',
        imaging: [ { name: 'Repeat bedside heart ultrasound', result: 'After drainage: only a small amount of fluid remains. The heart chambers fill normally.' } ]
      }
    }
  ],
  disposition: { type: 'icu', label: 'Cardiac ICU with pericardial drain, then cardiology ward', maxSeverity: 30 },
  teaching: 'Cardiac tamponade happens when fluid around the heart squeezes it so it cannot fill. Look for low blood pressure, swollen neck veins and muffled heart sounds (Beck\'s triad), plus a pressure drop when breathing in. Bedside ultrasound confirms it and urgent drainage by specialists is life-saving. Avoid diuretics, nitrates, sedation and pressure breathing, which reduce heart filling.'
}
);
