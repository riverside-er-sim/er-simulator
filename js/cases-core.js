/* Core cases: the four starting patients + a generic emergency (rescue) decision.
   Fictional, educational content. No medication doses or procedure instructions. */
window.CASE_LIBRARY = window.CASE_LIBRARY || [];

window.GENERIC_RESCUE = {
  title: 'EMERGENCY: Rapid deterioration',
  findings: 'The bedside monitor alarms. The patient is becoming harder to wake, breathing is labored, and blood pressure is falling. The nurse calls for you urgently.',
  question: 'What is your immediate priority?',
  timeCost: 10,
  options: [
    { text: 'Call the rapid-response team and work through Airway, Breathing and Circulation in order, supporting each problem as you find it.', correct: true, feedback: 'In any sudden deterioration, the ABC approach comes first: make sure the airway is open, breathing is adequate, and circulation is supported, while calling for skilled help.', effect: -25 },
    { text: 'Send the patient for an urgent CT scan to find the cause of the decline, and decide on further treatment once the report is available.', correct: false, feedback: 'Sending an unstable patient away from the resuscitation area for a scan is dangerous. Stabilize first (ABCs), then investigate.', effect: 15 },
    { text: 'Review the full medical record and recent results in detail to identify the cause before starting any new treatment at the bedside.', correct: false, feedback: 'Understanding the cause matters, but a crashing patient needs immediate support of airway, breathing and circulation first.', effect: 12 },
    { text: 'Increase the frequency of vital sign checks to every 15 minutes and ask the nurse to update you if the readings get any worse.', correct: false, feedback: 'More frequent observation alone is not enough when a patient is already deteriorating — this needs immediate hands-on intervention and help.', effect: 15 }
  ],
  results: { update: 'Rapid-response team at the bedside. Airway, breathing and circulation supported.' }
};

window.CASE_LIBRARY.push(
/* ───────────── PATIENT 1 ───────────── */
{
  id: 'core-stemi-shock',
  title: 'Heart attack with cardiogenic shock',
  specialty: 'Cardiology',
  difficulty: 'Expert',
  age: 58, sex: 'M',
  chiefComplaint: 'Crushing chest pain, sweating, low blood pressure',
  suspected: 'Acute heart attack (STEMI) with suspected cardiogenic shock',
  finalDiagnosis: 'Anterior ST-elevation myocardial infarction complicated by cardiogenic shock and acute kidney injury',
  presentation: 'A 58-year-old man developed crushing central chest pain spreading to his left arm while shoveling snow. He arrived by ambulance pale, sweaty and short of breath. His ECG showed a large heart attack affecting the front wall of the heart, and his blood pressure was low — a sign the heart was not pumping strongly enough (cardiogenic shock).',
  history: { pmh: ['High blood pressure', 'High cholesterol', 'Type 2 diabetes'], meds: ['Blood pressure tablet', 'Cholesterol tablet', 'Diabetes tablet'], allergies: 'No known allergies', social: 'Smokes 1 pack a day for 30 years. Works as a bus driver.' },
  canDie: true,
  startSeverity: 72,
  drift: 2.5,
  recoveredDrift: -1,
  vitals: {
    stable:   { hr: 76,  sbp: 124, dbp: 76, rr: 14, spo2: 98, temp: 36.8 },
    critical: { hr: 135, sbp: 70,  dbp: 42, rr: 30, spo2: 86, temp: 36.2 }
  },
  initialLabs: [
    { name: 'Troponin (heart muscle damage marker)', value: 'Markedly elevated', flag: 'C', ref: 'Normal: very low' },
    { name: 'Lactate', value: '5.1 mmol/L', flag: 'C', ref: '0.5–2.0' },
    { name: 'Creatinine (kidney)', value: '1.3 mg/dL', flag: 'H', ref: '0.7–1.2' }
  ],
  initialImaging: [ { name: '12-lead ECG', result: 'ST elevation across the front (anterior) leads — consistent with an acute heart attack.' } ],
  decisions: [
    {
      title: 'Arrival — chest pain and low blood pressure',
      findings: 'ECG shows ST elevation in the anterior leads. BP 88/56, HR 112, skin cool and clammy. He is anxious but answering questions.',
      question: 'What is the most important next step?',
      timeCost: 20,
      options: [
        { text: 'Activate the cardiac catheterization team now for emergency opening of the blocked artery, while giving initial heart-attack medicines.', correct: true, feedback: 'With ST elevation on the ECG, "time is muscle". Opening the blocked artery as fast as possible saves heart muscle and is the key treatment for shock caused by a heart attack.', effect: -15 },
        { text: 'Wait for the second troponin blood test in three hours to confirm heart damage before deciding whether a cardiology procedure is needed.', correct: false, feedback: 'An ECG showing ST elevation is enough to act. Waiting hours for blood tests lets more heart muscle die.', effect: 18 },
        { text: 'Arrange a CT scan of the chest first to rule out other causes of chest pain, then involve cardiology if the CT is normal.', correct: false, feedback: 'A CT is sometimes needed when another diagnosis is strongly suspected, but routinely delaying reperfusion for a classic STEMI costs heart muscle.', effect: 12 },
        { text: 'Give several large fluid boluses through the drip and observe for an hour to see if blood pressure improves before other steps.', correct: false, feedback: 'In cardiogenic shock the problem is a weak pump, not low fluid. Large volumes can flood the lungs, and the hour of waiting delays the real fix.', effect: 14 }
      ],
      results: { update: 'Cardiac catheterization: a blocked artery on the front of the heart was opened and a stent placed. Blood flow restored.' }
    },
    {
      title: 'After the procedure — shock persists',
      findings: 'Despite the open artery, BP remains low at 86/54, lactate is 4.8, and urine output is very low. Lungs have crackles at both bases.',
      question: 'Where and how should he be managed now?',
      timeCost: 30,
      options: [
        { text: 'Admit to the cardiac ICU, where the team can give medicines that support heart pumping and consider a mechanical support device.', correct: true, feedback: 'Cardiogenic shock needs intensive care: close monitoring and specialist-directed support of the heart and blood pressure until the stunned heart muscle recovers.', effect: -14 },
        { text: 'Give repeated fluid boluses on the general cardiology ward, since low urine output usually means the patient is simply dehydrated.', correct: false, feedback: 'Crackles in the lungs show fluid is already backing up. Low urine here reflects poor pumping, and more fluid can worsen breathing.', effect: 14 },
        { text: 'Transfer to a regular ward bed with checks every four hours, because the blocked artery has already been opened successfully.', correct: false, feedback: 'Opening the artery does not instantly restore pumping. A patient still in shock needs ICU-level care.', effect: 16 },
        { text: 'Start a strong water tablet (diuretic) alone to clear the lung crackles, and keep him in the recovery area for a few hours.', correct: false, feedback: 'Removing fluid may help the lungs, but on its own it can drop an already low blood pressure further. Shock needs coordinated ICU support.', effect: 10 }
      ],
      results: { update: 'Admitted to cardiac ICU. Medicines supporting heart pumping started by the ICU team.', labs: [ { name: 'Lactate', value: '3.9 mmol/L', flag: 'H', ref: '0.5–2.0' } ] }
    },
    {
      title: 'ICU day 1 — kidneys under strain',
      findings: 'Blood pressure has improved with support. However, creatinine rose to 2.1 and urine output is still on the low side. He asks for something for his back pain.',
      question: 'What is the best approach to his kidneys?',
      timeCost: 30,
      options: [
        { text: 'Keep blood pressure and circulation adequate, avoid medicines that harm the kidneys, and track urine output and blood tests closely.', correct: true, feedback: 'Kidney injury from shock usually recovers once circulation improves. The key is protecting the kidneys: good perfusion, avoiding kidney-harmful drugs (like anti-inflammatory painkillers), and close monitoring.', effect: -10 },
        { text: 'Give an anti-inflammatory painkiller for the back pain and arrange a contrast CT of the abdomen to look at the kidneys in detail.', correct: false, feedback: 'Anti-inflammatory painkillers and extra contrast dye can both injure already-stressed kidneys.', effect: 12 },
        { text: 'Start dialysis right away today, because a rising creatinine after a heart attack always means the kidneys have failed for good.', correct: false, feedback: 'Dialysis is reserved for specific dangerous problems (very high potassium, fluid overload not responding, etc.). A rising creatinine alone often recovers.', effect: 8 },
        { text: 'Stop all intravenous medicines and fluids so that the kidneys can rest, and then recheck the kidney blood tests in two days.', correct: false, feedback: 'Stopping support could drop his blood pressure and make the kidneys worse. Kidneys need good blood flow, not "rest".', effect: 15 }
      ],
      results: { update: 'Paracetamol-type pain relief given instead of anti-inflammatories. Urine output improving slowly.', labs: [ { name: 'Creatinine', value: '2.1 mg/dL', flag: 'H', ref: '0.7–1.2' } ] }
    },
    {
      title: 'ICU day 2 — irregular beats on the monitor',
      findings: 'The monitor shows several short runs of fast, irregular beats from the lower heart chambers. He feels fine. Potassium and magnesium came back low.',
      question: 'What should be done?',
      timeCost: 20,
      options: [
        { text: 'Replace the potassium and magnesium, keep him on continuous heart monitoring, and recheck both levels later today.', correct: true, feedback: 'Low potassium and magnesium make the injured heart irritable. Correcting them and continuing monitoring reduces the chance of a dangerous rhythm.', effect: -8 },
        { text: 'Ignore the short runs because he feels well and has no symptoms, and stop the heart monitor overnight so he can sleep.', correct: false, feedback: 'After a heart attack, rhythm problems can become life-threatening without warning. Monitoring must continue and the cause must be fixed.', effect: 18 },
        { text: 'Prepare to deliver an electric shock to the heart now, before the short runs of fast beats have a chance to happen again.', correct: false, feedback: 'Shocks are for sustained dangerous rhythms with poor circulation. Brief runs in a stable patient call for fixing the cause, not shocking.', effect: 10 },
        { text: 'Order a repeat coronary angiogram tomorrow to check the stent, and leave the blood salt levels as they are until then.', correct: false, feedback: 'The obvious, fixable trigger is the low electrolytes. Leaving them uncorrected keeps the heart at risk.', effect: 9 }
      ],
      results: { update: 'Electrolytes corrected. No further runs of irregular beats in 18 hours.', labs: [ { name: 'Potassium', value: '4.2 mmol/L', flag: '', ref: '3.5–5.0' }, { name: 'Magnesium', value: '2.1 mg/dL', flag: '', ref: '1.7–2.2' } ] }
    },
    {
      title: 'ICU day 3 — ready to step down?',
      drift: 0.4,
      findings: 'BP 112/72 and HR 84 without any blood-pressure support medicines — the last one was stopped 22 hours ago. Lactate is 1.9, rhythm has been stable for over 24 hours, creatinine is falling (1.6), and he is alert and chatting. He still needs heart medicines and his heart pump strength on echo is moderately reduced.',
      question: 'What is the best decision about his level of care?',
      timeCost: 30,
      options: [
        { text: 'Transfer to a cardiac step-down unit with continuous heart-rhythm monitoring, while continuing his heart medicines and daily blood tests.', correct: true, feedback: 'He has been off blood-pressure support for almost a day, his lactate is normal, rhythm is stable and kidneys are recovering — he no longer needs ICU care, but his weakened heart still needs rhythm monitoring.', effect: -12 },
        { text: 'Keep him in the ICU until his kidney function and heart pump strength are both completely normal, which may take several more weeks.', correct: false, feedback: 'Keeping a stable patient in ICU is not risk-free: it blocks a bed for sicker patients and exposes him to ICU infections and immobility. Full recovery can continue on a monitored unit.', effect: 4 },
        { text: 'Transfer to a general medical ward with standard checks every six hours and no heart-rhythm monitoring, since he feels well.', correct: false, feedback: 'After a large heart attack with recent irregular beats and a weakened heart, he still needs continuous rhythm monitoring.', effect: 10 },
        { text: 'Discharge him home directly from the ICU today with a cardiology clinic appointment in two weeks, as his numbers are now normal.', correct: false, feedback: 'Far too early. He needs a step-down period to make sure he stays stable off support and to start rehabilitation safely.', effect: 18 }
      ],
      results: { update: 'Transferred to the cardiac step-down (telemetry) unit. Walking short distances with the physiotherapist.', labs: [ { name: 'Creatinine', value: '1.4 mg/dL', flag: 'H', ref: '0.7–1.2' } ] }
    },
    {
      title: 'Step-down night 1 — new breathlessness',
      drift: 1.6,
      findings: 'Overnight he became short of breath when lying flat and needed two pillows. SpO₂ 93% on room air, crackles at both lung bases, weight up 2 kg since yesterday, and ankle swelling. Temperature 37.6 °C. A blood test for heart strain (BNP) is high. The night nurse wonders about pneumonia.',
      question: 'What is the most likely problem and best next step?',
      timeCost: 30,
      options: [
        { text: 'Fluid congestion from the weakened heart: get a chest X-ray, give a diuretic, and track daily weight and fluid balance.', correct: true, feedback: 'Breathlessness lying flat, weight gain, ankle swelling and high BNP all point to heart failure congestion. A slightly raised temperature alone does not prove pneumonia — the chest X-ray will help separate the two.', effect: -10 },
        { text: 'Pneumonia picked up in hospital: start broad antibiotics immediately and give extra intravenous fluids because he has a fever.', correct: false, feedback: 'The pattern fits fluid overload. Extra fluids would make the congestion worse, and antibiotics without evidence of infection are not justified.', effect: 14 },
        { text: 'Anxiety after a frightening illness: reassure him, give something to help him sleep, and review him again on the morning ward round.', correct: false, feedback: 'Objective signs (low oxygen, crackles, weight gain, high BNP) show a real physical problem. Sedating a breathless heart patient is risky.', effect: 15 },
        { text: 'Sudden respiratory failure: move him straight back to the ICU for a breathing tube before any other tests are done tonight.', correct: false, feedback: 'He is breathless but talking with SpO₂ 93%. This needs prompt treatment, not immediate intubation — escalation is for failure to respond.', effect: 7 }
      ],
      results: {
        update: 'After diuretic treatment he passed plenty of urine, breathing eased and he slept flat by morning. SpO₂ 97%.',
        imaging: [ { name: 'Chest X-ray', result: 'Fluid congestion in both lungs with small fluid collections at the bases. No focal consolidation (no pneumonia pattern). Heart slightly enlarged.' } ],
        labs: [ { name: 'BNP (heart strain)', value: 'Elevated, improving', flag: 'H', ref: 'Normal: low' } ]
      }
    },
    {
      title: 'Planning for home',
      drift: 0.2,
      findings: 'He is walking the corridor without breathlessness, weight back to baseline, no irregular beats for 3 days, and kidney tests nearly normal. He says he plans to "go back to normal life" and may "cut down" smoking.',
      question: 'Which discharge plan best lowers his risk of another heart attack?',
      timeCost: 30,
      options: [
        { text: 'Cardiac rehab referral, taking all prescribed heart medicines daily, a plan to fully stop smoking, early cardiology follow-up, and warning signs.', correct: true, feedback: 'Secondary prevention works as a package: rehab, medicines that protect the heart and stent, stopping smoking completely, follow-up, and knowing when to call for help.', effect: -10 },
        { text: 'Taking his heart medicines only when he notices chest pain, a gradual reduction in smoking, and a family doctor visit if he feels unwell.', correct: false, feedback: 'Heart-protecting medicines (especially those keeping the stent open) must be taken every day. Stopping them can cause the stent to block.', effect: 12 },
        { text: 'Strict bed rest at home for six weeks, all heart medicines as prescribed, stopping smoking, and a cardiology visit in three months.', correct: false, feedback: 'Prolonged bed rest weakens muscles and raises clot risk. Supervised cardiac rehab with gradual activity is better.', effect: 6 },
        { text: 'Return to heavy snow shoveling and work next week, all prescribed medicines, cutting smoking by half, and follow-up as needed.', correct: false, feedback: 'Heavy exertion soon after a heart attack is risky, "cutting down" smoking is not enough, and follow-up should be planned, not "as needed".', effect: 8 }
      ],
      results: { update: 'Discharge plan agreed with the patient and family. Cardiac rehab booked.' }
    }
  ],
  disposition: { type: 'home', label: 'Discharged home with cardiac rehab and cardiology follow-up', maxSeverity: 22 },
  teaching: 'In a heart attack with ST elevation, rapid reopening of the artery saves heart muscle. Cardiogenic shock means the pump is failing, so more fluid is not the answer. Recovery is gradual — patients step down from ICU when off support and stable — and long-term prevention (medicines, rehab, no smoking) is as important as the emergency treatment.'
},

/* ───────────── PATIENT 2 ───────────── */
{
  id: 'core-asthma',
  title: 'Severe asthma attack',
  specialty: 'Respiratory',
  difficulty: 'Advanced',
  age: 24, sex: 'F',
  chiefComplaint: 'Severe wheezing and shortness of breath',
  suspected: 'Severe asthma exacerbation, possible respiratory failure',
  finalDiagnosis: 'Life-threatening asthma exacerbation triggered by a viral infection',
  presentation: 'A 24-year-old with asthma since childhood has had a cold for three days. Tonight her reliever inhaler stopped helping. She arrived able to speak only a few words at a time, with loud wheezing and using her neck muscles to breathe.',
  history: { pmh: ['Asthma (one previous hospital admission)', 'Hay fever'], meds: ['Reliever inhaler', 'Preventer inhaler (often forgets to use it)'], allergies: 'No known drug allergies', social: 'University student. Does not smoke. Has a cat.' },
  canDie: true,
  startSeverity: 66,
  drift: 2.5,
  recoveredDrift: -1,
  vitals: {
    stable:   { hr: 86,  sbp: 118, dbp: 74, rr: 16, spo2: 98, temp: 37.0 },
    critical: { hr: 145, sbp: 98,  dbp: 58, rr: 38, spo2: 82, temp: 37.3 }
  },
  initialLabs: [],
  initialImaging: [],
  events: [ { afterMinutes: 178, text: 'Nurse report: she is now using her neck muscles to breathe again and speaking in shorter phrases.', effect: 7 } ],
  decisions: [
    {
      title: 'Arrival — cannot finish sentences',
      findings: 'Loud wheeze on both sides, speaking in 3–4 word phrases, SpO₂ 89% on room air, HR 124, RR 30.',
      question: 'What is the first priority?',
      timeCost: 10,
      options: [
        { text: 'Give oxygen and start inhaled bronchodilator nebulizer treatments right away, with continuous monitoring in the resuscitation area.', correct: true, feedback: 'Low oxygen and severe wheeze need immediate oxygen and bronchodilators to open the airways. Treatment comes before tests.', effect: -14 },
        { text: 'Measure her peak flow three times and get a chest X-ray to confirm the diagnosis before starting any treatment at all.', correct: false, feedback: 'Peak flow and imaging can help, but delaying treatment in someone who can barely speak is dangerous.', effect: 14 },
        { text: 'Give a calming medicine because panic is making her breathe faster, then reassess her breathing pattern in thirty minutes.', correct: false, feedback: 'Sedatives can reduce the drive to breathe and are dangerous in severe asthma. Her fast breathing is from airway narrowing, not panic.', effect: 22 },
        { text: 'Start antibiotics for the chest infection she mentions and give her own reliever inhaler to use as often as she needs.', correct: false, feedback: 'Asthma attacks are usually triggered by viruses, and her own inhaler has already failed. She needs nebulized bronchodilators and oxygen.', effect: 12 }
      ],
      results: { update: 'Oxygen and back-to-back bronchodilator nebulizers started. SpO₂ up to 94%.' }
    },
    {
      title: 'Treating the inflammation',
      findings: 'After the first nebulizers she can say slightly longer sentences. Wheeze persists. She has not had any other treatment yet.',
      question: 'What should be added now?',
      timeCost: 15,
      options: [
        { text: 'A corticosteroid (steroid) medicine given early to reduce the airway inflammation, which takes a few hours to start working.', correct: true, feedback: 'Steroids treat the underlying inflammation in asthma. They take hours to act, so giving them early is important.', effect: -10 },
        { text: 'A cough suppressant syrup to stop her coughing, since the repeated coughing fits are making her breathing more tiring.', correct: false, feedback: 'Cough suppressants do not treat asthma and can make clearing mucus harder.', effect: 6 },
        { text: 'An antihistamine allergy tablet, because she has hay fever and a pet cat, which may be the true cause of the attack.', correct: false, feedback: 'Antihistamines do not treat an asthma attack. The airway inflammation needs steroids.', effect: 6 },
        { text: 'Stop the nebulizers for an hour to see how well she manages on her own without treatment before planning further steps.', correct: false, feedback: 'She is still wheezing — stopping treatment early risks relapse.', effect: 12 }
      ],
      results: { update: 'Steroid given. Bronchodilator nebulizers continuing.' }
    },
    {
      title: 'One hour later — slow response',
      findings: 'After an hour of treatment: SpO₂ 94% on oxygen, HR 118, RR 26, wheeze still widespread. Peak flow is only 40% of her best.',
      question: 'What is the next best step?',
      timeCost: 20,
      options: [
        { text: 'Add a second type of nebulized bronchodilator and consider an intravenous magnesium treatment for her airways.', correct: true, feedback: 'When first-line treatment is not enough, adding a second bronchodilator and IV magnesium (a muscle relaxer for the airways) are standard escalation steps.', effect: -9 },
        { text: 'Decide that treatment is working well enough and arrange for her to go home with steroid tablets and her reliever inhaler.', correct: false, feedback: 'Peak flow of 40% is still a severe attack. She is not safe to go home.', effect: 16 },
        { text: 'Move straight to placing a breathing tube now, since she has not fully responded to the first hour of nebulizer treatment.', correct: false, feedback: 'Intubation in asthma is high-risk and reserved for failing patients. There are still treatments to add first.', effect: 10 },
        { text: 'Switch the oxygen off to check her true oxygen level on room air, then decide on extra treatment once a reading is obtained.', correct: false, feedback: 'Removing oxygen from a patient with severe asthma can cause dangerous drops in oxygen levels.', effect: 9 }
      ],
      results: { update: 'Second bronchodilator added and IV magnesium given by the team. Wheeze slightly improved.' }
    },
    {
      title: 'Blood gas result',
      findings: 'A blood gas shows pH 7.34 and carbon dioxide (CO₂) at the upper end of normal. A junior colleague says, "Normal CO₂ — that\'s reassuring." She looks tired.',
      question: 'How should you interpret this?',
      timeCost: 10,
      options: [
        { text: 'Concerning: in a severe attack, fast breathing should push CO₂ low, so a normal level can mean she is tiring and needs close watching.', correct: true, feedback: 'In severe asthma, a "normal" or rising CO₂ is a warning sign: the breathing muscles may be getting exhausted. This is a classic trap.', effect: -6 },
        { text: 'Reassuring: a normal CO₂ shows her lungs are working well, so the monitoring can be reduced to routine ward-level checks.', correct: false, feedback: 'This is the trap! Normal CO₂ while breathing fast in a severe attack suggests fatigue, not recovery.', effect: 14 },
        { text: 'Irrelevant: blood gases do not help in asthma, so only her oxygen saturation should be used to guide decisions from now on.', correct: false, feedback: 'Oxygen saturation can look fine on supplemental oxygen even while CO₂ climbs. Blood gases add important information.', effect: 9 },
        { text: 'Probably a lab error: the result does not fit an asthma attack, so ignore it and simply repeat the test again tomorrow morning.', correct: false, feedback: 'The result fits a tiring patient. Dismissing it and waiting until tomorrow could miss deterioration.', effect: 12 }
      ],
      results: { labs: [ { name: 'Blood gas pH', value: '7.34', flag: 'L', ref: '7.35–7.45' }, { name: 'Blood gas CO₂', value: '45 mmHg', flag: 'H', ref: '35–45 (expected low in severe asthma)' } ], update: 'Noted as a warning sign. Close monitoring continued.' }
    },
    {
      title: 'Ruling out a complication',
      findings: 'Chest pain on the right side has appeared with deep breaths. Breath sounds seem slightly quieter on the right, but loud wheeze makes it hard to be sure.',
      question: 'What is the best next step?',
      timeCost: 20,
      options: [
        { text: 'Get a chest X-ray to look for a collapsed lung (pneumothorax) or pneumonia, which can complicate a severe asthma attack.', correct: true, feedback: 'New one-sided chest pain and quieter breath sounds raise concern for a pneumothorax — an important complication that changes management.', effect: -6 },
        { text: 'Give pain relief for chest-wall muscle strain from all the coughing, and avoid imaging so she is not exposed to radiation.', correct: false, feedback: 'Muscle strain is possible, but missing a collapsed lung would be dangerous. A chest X-ray is a low-radiation, high-value test here.', effect: 10 },
        { text: 'Order a CT scan of the chest with contrast to look for a blood clot in the lungs, and hold her nebulizers until it is done.', correct: false, feedback: 'A clot is less likely here, and stopping treatment for a scan is risky. A simple X-ray answers the main question first.', effect: 10 },
        { text: 'Insert a chest drain on the right side straight away, based on the quieter breath sounds, before any imaging is performed.', correct: false, feedback: 'Placing a drain without confirmation in a stable patient can cause harm. Imaging first unless the patient is crashing.', effect: 14 }
      ],
      results: { imaging: [ { name: 'Chest X-ray', result: 'Hyperinflated lungs, consistent with asthma. No pneumothorax. No pneumonia.' } ], update: 'No collapsed lung. Chest-wall strain likely from coughing.' }
    },
    {
      title: 'Urgent respiratory reassessment',
      drift: 2.2,
      findings: 'SpO₂ 96% on oxygen, HR 108, BP 116/74, RR 25. She still has chest tightness and wheeze, and her breathing effort has increased slightly over the last 30 minutes. The previous blood gas pH was 7.34. The ward calls asking whether she can move upstairs to free up the bed.',
      question: 'What is the best next step?',
      timeCost: 20,
      options: [
        { text: 'Reassess her at the bedside now, repeat the blood gas, continue bronchodilators and alert the ICU or senior respiratory team early.', correct: true, feedback: 'Increasing effort after a borderline gas is a red flag. A good SpO₂ on oxygen can hide a rising CO₂. Reassess, re-check the gas, and involve senior help early.', effect: -8 },
        { text: 'Move her to the general ward now because her oxygen saturation is 96%, with routine observations every four hours.', correct: false, feedback: 'A good saturation on oxygen does not mean she is safe. Rising effort means she needs closer monitoring, not less.', effect: 14 },
        { text: 'Give a sedative to help her relax, since the increased breathing effort is most likely caused by anxiety and fatigue.', correct: false, feedback: 'Sedation can suppress breathing in a tiring asthmatic and can trigger respiratory arrest. This is a dangerous choice.', effect: 22 },
        { text: 'Proceed directly to placing a breathing tube in the emergency department now, before any other assessment or blood tests.', correct: false, feedback: 'Intubation in asthma carries serious risks and is a last resort, decided by an experienced team after reassessment. She is still talking.', effect: 9 }
      ],
      results: { labs: [ { name: 'Repeat blood gas pH', value: '7.31', flag: 'L', ref: '7.35–7.45' }, { name: 'Repeat blood gas CO₂', value: '50 mmHg', flag: 'H', ref: '35–45' } ], update: 'Repeat gas shows CO₂ rising — she is tiring. ICU team notified.' }
    },
    {
      title: 'Rising CO₂ — escalation',
      drift: 2.8,
      findings: 'Repeat blood gas: pH 7.31, CO₂ 50 (rising). She is more tired, still speaking in short phrases, and still responding to treatment slowly. The ICU doctor is on the way.',
      question: 'What is the most appropriate plan?',
      timeCost: 30,
      options: [
        { text: 'Admit to ICU, continue maximal medical therapy, and have an experienced team ready to support her breathing if needed.', correct: true, feedback: 'Rising CO₂ means respiratory failure is developing. ICU gives close monitoring and expert airway support if needed, while medicines keep working.', effect: -12 },
        { text: 'Keep her in the emergency department on the same treatment with checks every two hours, and repeat the blood gas tomorrow.', correct: false, feedback: 'A tiring patient with rising CO₂ needs escalation now. Waiting hours could lead to respiratory arrest.', effect: 18 },
        { text: 'Give an additional dose of steroid tablets as the only change, since steroids will fully control the inflammation within the hour.', correct: false, feedback: 'Steroids take hours to work and she already had them. More steroid alone does not address imminent respiratory failure.', effect: 14 },
        { text: 'Send her home with a nebulizer machine and steroid tablets, since she has been in the emergency department for many hours.', correct: false, feedback: 'Very unsafe. A patient with rising CO₂ and severe symptoms must not be discharged.', effect: 25 }
      ],
      results: { update: 'Admitted to ICU. Over the next 18 hours, with ongoing treatment, her breathing gradually eased without needing a breathing tube.', labs: [ { name: 'Blood gas pH (ICU, next morning)', value: '7.41', flag: '', ref: '7.35–7.45' } ] }
    },
    {
      title: 'Ready to go home?',
      drift: 0.2,
      findings: 'Two days later: no oxygen needed, speaking full sentences, peak flow 75% of her best and stable on her usual inhalers for 24 hours. She admits she rarely uses her preventer inhaler.',
      question: 'Which discharge plan is most important?',
      timeCost: 30,
      options: [
        { text: 'A written action plan, inhaler technique check, daily preventer use, finishing the steroids, and follow-up in a few days.', correct: true, feedback: 'Most asthma deaths are preventable. A clear action plan, good inhaler technique, regular preventer use and prompt follow-up reduce the chance of another severe attack.', effect: -10 },
        { text: 'Relying on her reliever inhaler only, stopping the preventer because it "doesn\'t work", and returning if she feels worse again.', correct: false, feedback: 'Relying on reliever inhalers alone is linked to severe attacks. The preventer controls inflammation over time.', effect: 12 },
        { text: 'Staying in hospital for two more weeks until her peak flow reaches a perfect 100%, with no changes needed to her usual inhalers.', correct: false, feedback: 'She meets safe discharge criteria. Prolonged admission is unnecessary; the key is improving long-term control.', effect: 5 },
        { text: 'Taking steroid tablets every day permanently from now on, without arranging any follow-up appointment or a written plan.', correct: false, feedback: 'Long-term steroid tablets have serious side effects. Good preventer inhaler use and follow-up are better.', effect: 9 }
      ],
      results: { update: 'Asthma action plan written. Inhaler technique corrected. Follow-up booked.' }
    }
  ],
  disposition: { type: 'home', label: 'Discharged home with asthma action plan and follow-up', maxSeverity: 22 },
  teaching: 'Severe asthma is treated urgently with oxygen, bronchodilators and early steroids. Watch for the warning signs of exhaustion: a "normal" or rising CO₂, increasing effort, and difficulty talking. Good oxygen saturation on supplemental oxygen can be falsely reassuring. Never sedate a breathless asthmatic.'
},

/* ───────────── PATIENT 3 ───────────── */
{
  id: 'core-appendicitis',
  title: 'Right lower abdominal pain',
  specialty: 'Gastroenterology',
  difficulty: 'Intermediate',
  age: 17, sex: 'M',
  chiefComplaint: 'Lower-right abdominal pain, nausea and fever',
  suspected: 'Possible appendicitis',
  finalDiagnosis: 'Acute appendicitis with early perforation',
  presentation: 'A 17-year-old developed pain around his belly button yesterday evening that moved to the lower right side overnight. He has lost his appetite, feels sick, and has a fever. Walking and coughing make the pain worse.',
  history: { pmh: ['None'], meds: ['None'], allergies: 'No known allergies', social: 'High school student, plays soccer.' },
  canDie: true,
  startSeverity: 24,
  drift: 1.0,
  recoveredDrift: -1,
  vitals: {
    stable:   { hr: 80,  sbp: 118, dbp: 74, rr: 16, spo2: 99, temp: 37.0 },
    critical: { hr: 145, sbp: 80,  dbp: 46, rr: 28, spo2: 94, temp: 39.8 }
  },
  initialLabs: [],
  initialImaging: [],
  decisions: [
    {
      title: 'Initial evaluation',
      findings: 'Tender in the lower right abdomen with guarding. HR 104, temperature 38.2 °C. Pain 7/10.',
      question: 'What is the best initial plan?',
      timeCost: 30,
      options: [
        { text: 'Nothing by mouth, IV fluids and pain relief, blood tests including white cells and CRP, and an abdominal ultrasound.', correct: true, feedback: 'Pain relief does not hide the diagnosis. Blood tests and ultrasound (no radiation) are a good first step in young people with suspected appendicitis.', effect: -6 },
        { text: 'Withhold all pain relief until a surgeon has examined him, so that the abdominal findings are not masked before review.', correct: false, feedback: 'This is an old myth. Pain relief is kind and does not hide appendicitis from a careful examiner.', effect: 6 },
        { text: 'Give a laxative for likely constipation, offer a light meal, and reassess the abdominal pain in a few hours if needed.', correct: false, feedback: 'Fever, migrating pain and guarding suggest appendicitis. Laxatives and food are unsafe if surgery may be needed.', effect: 10 },
        { text: 'Send him straight for a CT scan before any blood tests, then decide on pain relief and fluids depending on the result.', correct: false, feedback: 'CT is useful but not usually first in young patients, and pain relief and fluids should not wait.', effect: 4 }
      ],
      results: {
        labs: [ { name: 'White blood cells', value: '15.2 ×10⁹/L', flag: 'H', ref: '4.5–11' }, { name: 'CRP (inflammation)', value: '48 mg/L', flag: 'H', ref: '<5' } ],
        imaging: [ { name: 'Abdominal ultrasound', result: 'Appendix not clearly visualized. Small amount of free fluid in the lower right abdomen. Inconclusive.' } ],
        update: 'Fluids and pain relief given. Pain now 5/10.'
      }
    },
    {
      title: 'Inconclusive ultrasound',
      drift: 1.0,
      findings: 'BP 116/72, HR 108, temp 38.4 °C, SpO₂ 99%. Still tender in the lower right abdomen with nausea. White cells and CRP are raised. The ultrasound could not see the appendix. His parent asks if he can go home since "the scan was normal".',
      question: 'What is the best next step?',
      timeCost: 40,
      options: [
        { text: 'Ask the surgical team to assess him, arrange further imaging such as MRI or CT, and keep him fasting on fluids and pain relief.', correct: true, feedback: 'An ultrasound that cannot see the appendix is NOT a normal scan. With fever, raised markers and focal tenderness, he needs surgical review and further imaging.', effect: -10 },
        { text: 'Discharge home because the ultrasound did not show appendicitis, with advice to come back tomorrow if the pain is still there.', correct: false, feedback: '"Not seen" is different from "normal". Sending him home risks the appendix bursting at home.', effect: 18 },
        { text: 'Keep him in the waiting area and repeat the same ultrasound in 24 hours, with no other changes to his care or monitoring.', correct: false, feedback: 'Waiting a day without surgical review or better imaging delays diagnosis while he has signs of infection.', effect: 10 },
        { text: 'Start oral antibiotics and send him home with a clinic appointment, as antibiotics alone will treat any early appendicitis.', correct: false, feedback: 'Antibiotic-only treatment is sometimes chosen by surgeons for confirmed, uncomplicated cases — not as a guess without a diagnosis or surgical review.', effect: 12 }
      ],
      results: {
        imaging: [ { name: 'MRI abdomen', result: 'Inflamed, swollen appendix (11 mm) with a small hard stone (appendicolith) at its base. No abscess. No clear perforation.' } ],
        update: 'Surgical team reviewed: acute appendicitis. Laparoscopic appendectomy planned for later this afternoon. Antibiotics started by the surgical team.'
      }
    },
    {
      title: 'Waiting for theater — a change',
      drift: 2.2,
      findings: 'While waiting for surgery, he suddenly says the pain "got a lot better" for a while. Now, an hour later, temp is 39.1 °C, HR 122, BP 104/64, and tenderness has spread across the whole lower abdomen, which feels rigid.',
      question: 'How do you interpret this, and what should you do?',
      timeCost: 25,
      options: [
        { text: 'Possible perforation: urgent surgical re-review, IV fluids, continue antibiotics, and move the operation earlier.', correct: true, feedback: 'Sudden pain relief followed by spreading pain, rigidity, high fever and fast heart rate suggests the appendix has burst. Surgery should be expedited.', effect: -10 },
        { text: 'Improving appendicitis: the pain eased by itself, so postpone surgery until tomorrow and give some regular paracetamol.', correct: false, feedback: 'This is a trap. Temporary relief can happen when the appendix bursts and pressure is released — then infection spreads.', effect: 18 },
        { text: 'Medicine side effect: the fever is a reaction to the antibiotics, so stop them and recheck his temperature in four hours.', correct: false, feedback: 'Stopping antibiotics in a patient with possible perforation would be dangerous. The findings fit spreading infection.', effect: 16 },
        { text: 'Constipation pain: give an enema and encourage walking, then reassess his abdomen after a couple of hours have passed.', correct: false, feedback: 'Rigidity, fever and tachycardia are signs of peritonitis, not constipation. An enema could worsen things.', effect: 15 }
      ],
      results: { update: 'Taken to the operating room early. Surgeons found a small perforation and cleaned the abdomen. Appendix removed.', labs: [ { name: 'White blood cells', value: '18.9 ×10⁹/L', flag: 'H', ref: '4.5–11' } ] }
    },
    {
      title: 'After surgery — recovery check',
      drift: 0.3,
      findings: 'Day 2 after surgery: temp 37.6 °C, HR 92, eating light food, walking with some soreness. He asks when he can play soccer again. The surgeons plan a short course of antibiotics because of the perforation.',
      question: 'Which plan best fits safe recovery and discharge?',
      timeCost: 30,
      options: [
        { text: 'Home once fever-free and eating; finish antibiotics, no contact sport for a few weeks, return for fever or worse pain.', correct: true, feedback: 'After a perforated appendix, watch for infection (abscess). Clear return precautions and a gradual return to sport are key.', effect: -10 },
        { text: 'Discharge today regardless of temperature, stop the antibiotics early since the appendix is gone, and play soccer this weekend.', correct: false, feedback: 'After perforation, the antibiotic course helps prevent abscess. Contact sport too soon risks wound problems.', effect: 12 },
        { text: 'Keep him in hospital on strict bed rest for two weeks with no food by mouth, to make sure the bowel heals completely.', correct: false, feedback: 'Early walking and eating speed recovery and reduce complications. Prolonged bed rest and fasting are unnecessary.', effect: 6 },
        { text: 'Send him home with no follow-up plan or return advice, because complications after appendectomy almost never occur.', correct: false, feedback: 'Complications such as abscesses are more likely after perforation. Patients need clear advice about warning signs.', effect: 8 }
      ],
      results: { update: 'Afebrile for 24 hours, eating normally. Discharge plan and warning signs explained.' }
    }
  ],
  disposition: { type: 'home', label: 'Discharged home after appendectomy with surgical follow-up', maxSeverity: 22 },
  teaching: 'Appendicitis classically starts near the belly button and moves to the lower right. An ultrasound that cannot see the appendix is inconclusive, not normal. Sudden relief of pain followed by fever and spreading tenderness can mean perforation. Pain relief does not hide the diagnosis.'
},

/* ───────────── PATIENT 4 ───────────── */
{
  id: 'ortho-wrist-01',
  title: 'Wrist injury after a fall',
  specialty: 'Orthopedics',
  difficulty: 'Beginner',
  age: 13, sex: 'F',
  chiefComplaint: 'Wrist pain and swelling after a fall',
  suspected: 'Possible wrist fracture',
  finalDiagnosis: 'Torus (buckle) fracture of the distal radius',
  presentation: 'A 13-year-old fell off her skateboard onto an outstretched right hand about an hour ago. She has pain and swelling just above the wrist and does not want to move it.',
  history: { pmh: ['Mild eczema'], meds: ['None'], allergies: 'No known allergies', social: 'Right-handed. Plays volleyball. Lives with her parents.' },
  canDie: false,
  maxSeverity: 55,
  startSeverity: 14,
  drift: 0.6,
  recoveredDrift: -1,
  vitals: {
    stable:   { hr: 82,  sbp: 112, dbp: 70, rr: 16, spo2: 99, temp: 36.8 },
    critical: { hr: 128, sbp: 128, dbp: 84, rr: 24, spo2: 98, temp: 37.2 }
  },
  initialLabs: [],
  initialImaging: [],
  decisions: [
    {
      title: 'Initial assessment',
      findings: 'She is holding her right forearm against her chest. The area just above the wrist is swollen, with no cuts or open wounds. Pain is 7 out of 10.',
      question: 'What should you do first?',
      timeCost: 10,
      options: [
        { text: 'Check the pulse, finger color and refill, sensation and finger movement, then splint, ice and elevate the arm.', correct: true, feedback: 'Before anything else, confirm the hand has good blood flow and working nerves (a "neurovascular check"). Then splint, ice and elevate to reduce pain and swelling.', effect: -6 },
        { text: 'Send her straight to radiology for wrist X-rays now, and finish the hands-on examination once the images are back.', correct: false, feedback: 'X-rays are probably needed, but skipping the bedside exam could miss a circulation or nerve problem — those are time-critical.', effect: 6 },
        { text: 'Gently pull the wrist back into a straight position right away to ease her pain before doing any other assessment.', correct: false, feedback: 'Never manipulate an injured limb before assessing it and seeing images. Realignment is done by trained clinicians with proper pain control.', effect: 12 },
        { text: 'Reassure her that it is most likely a sprain, wrap it in a soft bandage, and plan to send her home to rest it.', correct: false, feedback: 'Bony tenderness and swelling after a fall on an outstretched hand need an exam and usually X-rays. Assuming a sprain can miss a fracture.', effect: 8 }
      ],
      results: { update: 'Neurovascular exam normal: strong radial pulse, pink warm fingers, refill under 2 seconds, normal sensation, all fingers move. Tender over the distal radius. Splint applied; pain 5/10.' }
    },
    {
      title: 'Choosing imaging',
      findings: 'Pain improved after splinting and ice. She is tender at one spot on the forearm bone about 3 cm above the wrist crease. Her parent asks whether she needs "a scan".',
      question: 'Which imaging is most appropriate now?',
      timeCost: 20,
      options: [
        { text: 'Plain X-rays of the wrist in at least two views, which show bone injuries quickly with a very low radiation dose.', correct: true, feedback: 'X-rays are the first test for suspected fractures: fast, cheap and low radiation. Two views at right angles are needed so fractures are not missed.', effect: -6 },
        { text: 'A CT scan of the wrist and forearm right away, which shows fine bone detail in three dimensions at a higher dose.', correct: false, feedback: 'CT is reserved for complex fractures. It gives more radiation than needed for a first look.', effect: 4 },
        { text: 'An MRI of the wrist with the arm held still for forty minutes, which shows the bones, ligaments and soft tissues.', correct: false, feedback: 'MRI is slow and expensive and is not a first-line test for a likely fracture.', effect: 4 },
        { text: 'No imaging for now; keep the splint on and repeat the examination in one to two weeks if the pain continues.', correct: false, feedback: 'Bony tenderness after a fall needs an X-ray to guide treatment now.', effect: 7 }
      ],
      results: { imaging: [ { name: 'X-ray right wrist (2 views)', result: 'Buckle (torus) fracture of the distal radius — the bone surface is bulged but not broken through. Growth plate not involved. Normal alignment.' } ] }
    },
    {
      title: 'Unexpected change — tingling fingers',
      drift: 2.4,
      findings: 'While waiting for the orthopedic plan, she says her fingers feel "tingly" and the splint feels tight. Her fingers look a little puffy, and pain is now 8/10 despite pain medicine.',
      question: 'What is the most appropriate response?',
      timeCost: 10,
      options: [
        { text: 'Loosen the splint wrapping, raise the arm, and recheck pulse, color, feeling and movement now, escalating if no better.', correct: true, feedback: 'Swelling inside a tight splint can squeeze nerves and blood vessels. Loosen it, elevate, and recheck. Pain out of proportion plus tingling is a warning sign.', effect: -10 },
        { text: 'Give another dose of pain medicine, reassure her that tingling is common with fractures, and recheck in two hours.', correct: false, feedback: 'Tingling and worsening pain under a splint can mean dangerous pressure. It must be checked and relieved now.', effect: 12 },
        { text: 'Add an extra layer of elastic bandage over the splint to hold the wrist more firmly and lower the arm into a sling.', correct: false, feedback: 'Tightening the wrap and lowering the arm both increase swelling and pressure — the opposite of what is needed.', effect: 15 },
        { text: 'Order an urgent repeat X-ray to see if the fracture has moved, leaving the splint exactly as it is until the result.', correct: false, feedback: 'A shifted buckle fracture is unlikely. The urgent issue is pressure from the splint, which should be relieved first.', effect: 6 }
      ],
      results: { update: 'Splint loosened and re-padded. After 10 minutes of elevation the tingling has gone, fingers pink, refill under 2 seconds. Pain 4/10.' }
    },
    {
      title: 'Definitive treatment',
      findings: 'Orthopedics reviews the X-ray: a stable buckle fracture with normal alignment and no growth plate involvement. Neurovascular checks remain normal.',
      question: 'What is the best treatment plan?',
      timeCost: 15,
      options: [
        { text: 'A removable wrist splint for about three weeks, simple pain relief, and a clear follow-up plan.', correct: true, feedback: 'Buckle fractures are stable. Research shows a removable splint works as well as a cast and is more comfortable.', effect: -8 },
        { text: 'An operation to insert metal pins to hold the bone still, followed by an above-elbow cast for at least six weeks.', correct: false, feedback: 'Surgery is for unstable or badly displaced fractures, not stable buckle fractures.', effect: 6 },
        { text: 'No splint or cast at all, and a return to volleyball tomorrow, because the bone is only bent rather than broken.', correct: false, feedback: 'Even stable fractures need protection to heal and to control pain.', effect: 6 },
        { text: 'A full above-elbow plaster cast for eight weeks with weekly X-rays, because any fracture in a child is high risk.', correct: false, feedback: 'Over-treatment: a long, heavy cast and repeated X-rays add radiation and stiffness without benefit.', effect: 4 }
      ],
      results: { update: 'Removable wrist splint fitted. Pain 3/10.' }
    },
    {
      title: 'Going home',
      drift: 0.2,
      findings: 'She is comfortable in the new splint, fingers pink and moving well. Her parent asks what to watch for at home.',
      question: 'Which advice is most important?',
      timeCost: 10,
      options: [
        { text: 'Keep the arm raised, wear the splint, use pain relief as advised, and return urgently for numbness, pale fingers or severe pain.', correct: true, feedback: 'Families need clear "red flag" advice: numbness, pale or cold fingers, or severe increasing pain can mean pressure on nerves or vessels.', effect: -8 },
        { text: 'Remove the splint whenever it feels annoying, put a heat pack on the swelling tonight, and return if pain lasts a month.', correct: false, feedback: 'Heat can increase swelling, and the splint protects healing. Red flags need urgent return, not waiting a month.', effect: 6 },
        { text: 'Keep the arm hanging in a sling, avoid all pain medicine so pain can act as a warning, and follow up only if needed.', correct: false, feedback: 'Elevation reduces swelling, and pain relief is fine. She also needs clear warning signs.', effect: 5 },
        { text: 'Go back to volleyball in two days with tape wrapped tightly over the splint for support, and skip follow-up visits.', correct: false, feedback: 'Tight tape can cause pressure problems, and sport this early risks reinjury.', effect: 6 }
      ],
      results: { update: 'Discharge advice given and understood.' }
    }
  ],
  disposition: { type: 'home', label: 'Discharged home with splint and follow-up', maxSeverity: 20 },
  teaching: 'Always check circulation, sensation and movement (neurovascular status) in limb injuries — before and after splinting. X-rays in two views are the first imaging test. Buckle fractures are stable and heal well in a removable splint. Tingling and severe pain under a splint is a warning sign that needs urgent action.'
}
);

/* Starting state for the four initial patients (preserves their progress). */
window.INITIAL_PATIENTS = [
  {
    caseId: 'core-stemi-shock', num: 1, bed: 'ICU-3',
    severity: 30, decisionIndex: 4, elapsedMinutes: 3240,
    trend: { rate: -0.6, minutes: 60 },
    vitals: { hr: 84, sbp: 112, dbp: 72, rr: 16, spo2: 98, temp: 36.9 },
    labs: [
      { name: 'Lactate', value: '1.9 mmol/L', flag: '', ref: '0.5–2.0' },
      { name: 'Creatinine (kidney)', value: '1.6 mg/dL (falling)', flag: 'H', ref: '0.7–1.2' },
      { name: 'Troponin', value: 'Elevated, trending down', flag: 'H', ref: 'Normal: very low' }
    ],
    imaging: [ { name: 'Echocardiogram (heart ultrasound)', result: 'Front wall of the heart moves weakly. Overall pump strength moderately reduced. No fluid around the heart.' } ],
    note: 'Hospital day 3. Heart rhythm stable. Kidney function beginning to recover. Alert and communicating normally. Improving but still serious.'
  },
  {
    caseId: 'core-asthma', num: 2, bed: 'Resus-2',
    severity: 40, decisionIndex: 5, elapsedMinutes: 150,
    trend: { rate: -0.4, minutes: 15 },
    vitals: { hr: 108, sbp: 116, dbp: 74, rr: 25, spo2: 96, temp: 37.0 },
    note: 'Serious — improving, but needs close monitoring. Continued chest tightness and wheezing; breathing effort has increased slightly.'
  },
  {
    caseId: 'core-appendicitis', num: 3, bed: 'Bay-7',
    severity: 18, decisionIndex: 1, elapsedMinutes: 85,
    vitals: { hr: 108, sbp: 116, dbp: 72, rr: 18, spo2: 99, temp: 38.4 },
    note: 'Stable but concerning symptoms. Persistent lower-right abdominal pain, nausea and tenderness.'
  },
  {
    caseId: 'ortho-wrist-01', num: 4, bed: 'Fast-Track-1',
    severity: 12, decisionIndex: 0, elapsedMinutes: 10,
    vitals: { hr: 88, sbp: 110, dbp: 70, rr: 16, spo2: 99, temp: 36.8 },
    note: 'Initial assessment not yet completed.'
  }
];
