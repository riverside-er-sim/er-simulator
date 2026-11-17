// ER Simulator — case pack A (Cardiology, Respiratory, Neurology)
// Fictional, educational cases. No doses or procedure instructions by design.
window.CASE_LIBRARY = window.CASE_LIBRARY || [];
window.CASE_LIBRARY.push(

  // ───────────────────────────────────────────── 1. Atrial fibrillation + hidden thyroid trigger
  {
    id: 'a-afib-thyroid-01',
    title: 'Racing, fluttering heartbeat',
    specialty: 'Cardiology',
    difficulty: 'Intermediate',
    age: 52, sex: 'F',
    chiefComplaint: 'Fast, irregular heartbeat and feeling shaky for two days',
    suspected: 'Abnormal heart rhythm',
    finalDiagnosis: 'Atrial fibrillation with rapid ventricular response, triggered by an overactive thyroid (hyperthyroidism)',
    presentation: 'A 52-year-old teacher comes in saying her heart has been "fluttering like a bird" on and off for two days, and constantly since this morning. She feels a little short of breath climbing stairs and slightly lightheaded, but has no chest pain and has not fainted. She says she has felt "on edge" for weeks and blames stress at work.',
    history: {
      pmh: ['Mild high blood pressure'],
      meds: ['A daily blood pressure tablet'],
      allergies: 'No known allergies',
      social: 'Does not smoke. One cup of coffee a day. Lives with her husband.'
    },
    canDie: true,
    startSeverity: 38,
    drift: 0.8,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 84,  sbp: 128, dbp: 78, rr: 16, spo2: 98, temp: 37.0 },
      critical: { hr: 172, sbp: 86,  dbp: 52, rr: 28, spo2: 92, temp: 37.6 }
    },
    initialLabs: [
      { name: 'Hemoglobin', value: '13.4 g/dL', flag: '', ref: '12.0–15.5' },
      { name: 'Potassium', value: '4.1 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Troponin (heart muscle marker)', value: 'Normal', flag: '', ref: 'Normal' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 50, text: 'Nurse: her heart rate keeps creeping back up into the 140s and she feels more breathless lying flat.', effect: 6 }
    ],
    rescue: {
      title: 'Blood pressure falling',
      findings: 'Her heart rate is now about 175 and very irregular. Blood pressure has dropped to 84/50, she is pale and sweaty, and she says she feels like she might pass out.',
      question: 'The fast rhythm is now making her unstable. What do you do?',
      timeCost: 10,
      options: [
        { text: 'Call the resuscitation team for urgent electrical cardioversion under sedation', correct: true, feedback: 'When a fast rhythm causes low blood pressure, the heart is not pumping well enough. An electrical shock given by the team under sedation can quickly reset the rhythm.', effect: -20 },
        { text: 'Give another dose of the same rate-slowing medicine and wait for an hour', correct: false, feedback: 'Some rate medicines also lower blood pressure, and waiting an hour while she is unstable is too slow.', effect: 18 },
        { text: 'Sit her upright, give a glass of water and recheck vital signs in thirty minutes', correct: false, feedback: 'Her low blood pressure comes from the rhythm, not from thirst. She needs the rhythm fixed now.', effect: 22 },
        { text: 'Send her urgently for a chest CT scan to look for a different hidden cause first', correct: false, feedback: 'Leaving the monitored area for a scan while unstable is risky. Stabilize first, investigate later.', effect: 20 }
      ]
    },
    decisions: [
      {
        title: 'First look',
        findings: 'On the monitor her heart rate jumps between 135 and 155 and looks irregular. Blood pressure is 124/78 and oxygen saturation 97%. She is talking in full sentences and is alert.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Put her on a heart monitor, place an IV line and record a 12-lead ECG', correct: true, feedback: 'An ECG shows exactly which rhythm is causing the fast heartbeat, and monitoring plus IV access prepares you for any change.', effect: -8 },
          { text: 'Shock the heart back to a normal rhythm right away before any tests', correct: false, feedback: 'She is stable with a good blood pressure, so there is time to find out what the rhythm is before choosing treatment.', effect: 12 },
          { text: 'Tell her it is probably stress and offer a quiet room to rest for a while', correct: false, feedback: 'An irregular heart rate near 150 needs to be checked, not assumed to be stress.', effect: 10 },
          { text: 'Order a chest X-ray and wait for the result before doing anything else', correct: false, feedback: 'A chest X-ray can help later, but it cannot tell you the heart rhythm. The ECG comes first.', effect: 6 }
        ],
        results: {
          update: 'The ECG shows an irregularly irregular rhythm with no clear P waves and a rate of about 148.',
          imaging: [{ name: '12-lead ECG', result: 'Atrial fibrillation with a fast ventricular rate (~148/min). No signs of a heart attack.' }]
        }
      },
      {
        title: 'Treating the fast rhythm',
        findings: 'The ECG confirms atrial fibrillation with a fast rate. Her blood pressure stays normal and she is comfortable at rest, though still aware of the pounding.',
        question: 'She is stable. What is the main treatment goal right now?',
        timeCost: 15,
        options: [
          { text: 'Slow the heart rate with a rate-control medicine and keep her monitored', correct: true, feedback: 'In stable atrial fibrillation the first job is usually to slow the rate so the heart fills and pumps better.', effect: -10 },
          { text: 'Give a medicine to raise her blood pressure and speed up the heart', correct: false, feedback: 'Her blood pressure is already normal, and speeding the heart would make things worse.', effect: 15 },
          { text: 'Send her home with a heart monitor patch and a follow-up next month', correct: false, feedback: 'A new fast rhythm near 150 needs treatment and a cause found before going home.', effect: 12 },
          { text: 'Do nothing yet and watch whether the rhythm settles over a few hours', correct: false, feedback: 'Some cases settle on their own, but a rate this fast needs treatment now so the heart does not tire.', effect: 6 }
        ],
        results: {
          update: 'After the rate-control medicine her heart rate drops to about 120, but within half an hour it climbs back toward 140. She mentions she is always too warm, has lost weight without trying and her hands have been shaky.',
          labs: [{ name: 'Heart rate after treatment', value: '118 → 138 /min', flag: 'H', ref: '60–100' }]
        }
      },
      {
        title: 'Why won\'t it slow down?',
        findings: 'On exam her hands have a fine tremor, her skin is warm and moist, and her neck looks slightly full at the front. Her temperature is 37.6 °C. The rate keeps bouncing back despite treatment.',
        question: 'Which test is most likely to reveal the hidden trigger?',
        timeCost: 20,
        options: [
          { text: 'Thyroid blood tests to see if the thyroid gland is overactive', correct: true, feedback: 'Weight loss, heat intolerance, tremor and a stubborn fast rhythm all point to an overactive thyroid, a classic trigger of atrial fibrillation.', effect: -10 },
          { text: 'An exercise treadmill test to look for narrowed heart arteries', correct: false, feedback: 'Exercising a patient who is already in a fast rhythm is not safe, and it would not explain her other symptoms.', effect: 10 },
          { text: 'An urgent brain MRI scan to look for a cause of her tremor', correct: false, feedback: 'Her tremor fits a whole-body hormone problem better than a brain problem, and the MRI would delay the real answer.', effect: 6 },
          { text: 'A full allergy panel to check whether something caused a reaction', correct: false, feedback: 'Nothing in her story suggests an allergic reaction.', effect: 5 }
        ],
        results: {
          labs: [
            { name: 'TSH (thyroid-stimulating hormone)', value: '<0.01 mIU/L', flag: 'L', ref: '0.4–4.0' },
            { name: 'Free T4 (thyroid hormone)', value: '48 pmol/L', flag: 'H', ref: '10–22' }
          ],
          update: 'The thyroid tests show a very overactive thyroid gland.'
        }
      },
      {
        title: 'Putting it together',
        findings: 'Her thyroid is pumping out far too much hormone, which revs up the heart like an engine stuck on high. She asks whether she will just need a stronger heart pill.',
        question: 'How should you now manage her rhythm problem?',
        timeCost: 20,
        options: [
          { text: 'Keep controlling the rate and ask endocrinology to treat the thyroid', correct: true, feedback: 'Treating the trigger is key: the rhythm often settles once the thyroid is controlled. Rate control buys time while that happens.', effect: -12 },
          { text: 'Shock the heart into normal rhythm now and stop all thyroid testing', correct: false, feedback: 'While the thyroid is still overactive the rhythm is likely to come straight back, and the trigger stays untreated.', effect: 10 },
          { text: 'Tell her the thyroid result is unrelated and add a second heart pill', correct: false, feedback: 'An overactive thyroid is one of the most important reversible causes of atrial fibrillation. Ignoring it means the problem keeps coming back.', effect: 12 },
          { text: 'Stop all of her heart medicines and only treat the thyroid from now on', correct: false, feedback: 'Thyroid treatment takes days to weeks to work. Without rate control her heart would race in the meantime.', effect: 14 }
        ],
        results: {
          update: 'With continued rate control and thyroid treatment started by endocrinology, her heart rate settles around 95–105.'
        }
      },
      {
        title: 'Stroke risk and the next step',
        findings: 'She has had symptoms for at least two days and possibly longer. The cardiology team reminds you that in atrial fibrillation blood can pool in the upper heart chambers and form clots that may travel to the brain.',
        question: 'What is the right plan for her stroke risk and rhythm?',
        timeCost: 25,
        options: [
          { text: 'Score her stroke risk and discuss blood thinners with cardiology', correct: true, feedback: 'Because the rhythm has lasted over 48 hours, a clot may already exist. Assessing stroke risk and planning blood thinning before any attempt to reset the rhythm protects the brain.', effect: -12 },
          { text: 'Shock her back into rhythm today since she is calmer and feeling better', correct: false, feedback: 'Resetting the rhythm after more than 48 hours without protection can dislodge a clot and cause a stroke.', effect: 16 },
          { text: 'Skip any blood thinner because her atrial fibrillation is brand new', correct: false, feedback: 'You cannot be sure how long it has been there, and her blood pressure history adds to her risk.', effect: 10 },
          { text: 'Give an aspirin-type tablet alone and plan no further heart follow-up', correct: false, feedback: 'Aspirin alone is not considered good stroke protection in atrial fibrillation, and she needs ongoing follow-up.', effect: 8 }
        ]
      }
    ],
    disposition: { type: 'ward', label: 'Admitted to a monitored cardiology bed with endocrinology input', maxSeverity: 30 },
    teaching: 'Atrial fibrillation causes an irregular, often fast heartbeat. Stable patients need rate control, but always look for triggers such as an overactive thyroid, infection or dehydration. Because clots can form in the heart, stroke risk must be assessed before resetting the rhythm.'
  },

  // ───────────────────────────────────────────── 2. Pulmonary embolism after long travel
  {
    id: 'a-pe-travel-01',
    title: 'Breathless after a long flight',
    specialty: 'Respiratory',
    difficulty: 'Advanced',
    age: 34, sex: 'F',
    chiefComplaint: 'Sudden shortness of breath and sharp chest pain when breathing in',
    suspected: 'Shortness of breath, cause unclear',
    finalDiagnosis: 'Pulmonary embolism (blood clots in both lungs) from a deep vein thrombosis in the left leg',
    presentation: 'A 34-year-old woman arrives by car with her partner. Two days ago she returned from a 14-hour flight. This morning she became suddenly short of breath while walking up stairs and now has a sharp pain on the right side of her chest when she breathes in. She thinks she might be having a panic attack.',
    history: {
      pmh: ['Mild asthma as a child, no inhaler needed for years'],
      meds: ['Combined birth control pill'],
      allergies: 'No known allergies',
      social: 'Does not smoke. Works in marketing and travels often.'
    },
    canDie: true,
    startSeverity: 45,
    drift: 1.2,
    recoveredDrift: -1.2,
    vitals: {
      stable:   { hr: 88,  sbp: 122, dbp: 76, rr: 16, spo2: 97, temp: 37.0 },
      critical: { hr: 140, sbp: 78,  dbp: 46, rr: 34, spo2: 84, temp: 37.4 }
    },
    initialLabs: [
      { name: 'White blood cells', value: '9.2 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Hemoglobin', value: '13.1 g/dL', flag: '', ref: '12.0–15.5' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 60, text: 'Nurse: she is more breathless and her oxygen saturation dipped to 89% while walking to the bathroom.', effect: 8 }
    ],
    rescue: {
      title: 'Collapse on the monitor',
      findings: 'She becomes grey and drowsy. Blood pressure is 72/40, heart rate 142, oxygen saturation 83% despite oxygen. The large clots are now blocking blood flow from the right side of the heart.',
      question: 'What is the immediate priority?',
      timeCost: 10,
      options: [
        { text: 'Call the resuscitation and PE teams for emergency clot-busting therapy', correct: true, feedback: 'A massive pulmonary embolism with collapse needs the clot broken down or removed immediately by the specialist team.', effect: -20 },
        { text: 'Run a large amount of IV fluid in quickly and recheck in twenty minutes', correct: false, feedback: 'In massive PE the right heart is already overstretched. Lots of fluid can make it fail faster.', effect: 18 },
        { text: 'Repeat the CT scan to see whether the clots have become any larger', correct: false, feedback: 'You already know the diagnosis. Moving an unstable patient to the scanner wastes precious minutes.', effect: 22 },
        { text: 'Stop the blood thinner in case it is the cause of her low blood pressure', correct: false, feedback: 'The blood thinner is not the problem. Stopping it removes protection against more clotting.', effect: 20 }
      ]
    },
    decisions: [
      {
        title: 'First priorities',
        findings: 'She is breathing 26 times a minute, heart rate 118, blood pressure 118/74, oxygen saturation 91% on room air. Her lungs sound clear on both sides. She is anxious and says her fingers tingle.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Give oxygen, attach a monitor, place an IV line and record an ECG', correct: true, feedback: 'Low oxygen and a fast heart rate mean she needs support and monitoring straight away while you look for the cause.', effect: -8 },
          { text: 'Start a nebulized asthma treatment since she had asthma as a child', correct: false, feedback: 'Her chest is clear with no wheeze, so asthma does not explain her low oxygen.', effect: 8 },
          { text: 'Coach slow breathing into a paper bag to settle the panic symptoms', correct: false, feedback: 'Panic does not cause oxygen levels of 91%. Assuming anxiety can miss a dangerous diagnosis.', effect: 14 },
          { text: 'Return her to the waiting room and reassess her again in one hour', correct: false, feedback: 'A patient with low oxygen and a heart rate of 118 should not be sent back to wait.', effect: 16 }
        ],
        results: {
          update: 'On oxygen her saturation rises to 95%. Her chest X-ray and ECG come back.',
          imaging: [
            { name: 'Chest X-ray', result: 'Normal. Clear lungs, no collapse, no fluid, normal heart size.' },
            { name: 'ECG', result: 'Sinus tachycardia (fast but regular), rate 116. No other clear changes.' }
          ]
        }
      },
      {
        title: 'A reassuring X-ray?',
        findings: 'Her partner is relieved: "The X-ray is normal, so it\'s just anxiety, right?" She still needs oxygen to keep her saturation above 94%.',
        question: 'How should you interpret the normal chest X-ray?',
        timeCost: 10,
        options: [
          { text: 'Low oxygen with a clear X-ray makes a clot in the lungs more likely', correct: true, feedback: 'A pulmonary embolism blocks blood flow, not air, so the X-ray is often normal. Unexplained low oxygen with a normal X-ray is a classic warning sign.', effect: -10 },
          { text: 'A normal X-ray rules out any serious lung cause, so plan discharge', correct: false, feedback: 'Many serious problems, including blood clots in the lungs, do not show on a plain X-ray.', effect: 18 },
          { text: 'The X-ray is probably missing an early pneumonia, so start antibiotics', correct: false, feedback: 'She has no fever, no cough and normal white cells. Antibiotics would not treat the real problem.', effect: 8 },
          { text: 'The X-ray confirms a panic attack, so give a calming medicine instead', correct: false, feedback: 'A panic attack does not lower oxygen saturation. This would delay the true diagnosis.', effect: 14 }
        ],
        results: {
          update: 'You examine her legs. Her left calf is swollen, warm and tender, about 3 cm bigger than the right. She thought she had pulled a muscle on the flight.'
        }
      },
      {
        title: 'Confirming the diagnosis',
        findings: 'With long travel, the birth control pill, a swollen calf, fast heart rate and low oxygen, your clinical suspicion of pulmonary embolism is high.',
        question: 'Which next step will confirm or exclude it most directly?',
        timeCost: 30,
        options: [
          { text: 'CT pulmonary angiogram to look for clots in the lung arteries', correct: true, feedback: 'When suspicion is high, a CT scan with contrast of the lung arteries is the most direct test. The team may start a blood thinner while waiting if there is no bleeding risk.', effect: -10 },
          { text: 'A D-dimer blood test alone, and send her home if it is borderline', correct: false, feedback: 'D-dimer is useful to rule out clots when suspicion is low. With high suspicion she needs imaging no matter what.', effect: 12 },
          { text: 'Book an outpatient leg ultrasound for next week and give pain relief', correct: false, feedback: 'Her low oxygen means the clot may already be in her lungs. This cannot wait a week.', effect: 18 },
          { text: 'Repeat the chest X-ray in four hours to see if anything has changed', correct: false, feedback: 'The X-ray is likely to stay normal, and the delay leaves a dangerous diagnosis untreated.', effect: 10 }
        ],
        results: {
          imaging: [
            { name: 'CT pulmonary angiogram', result: 'Multiple clots in the arteries of both lungs. The right side of the heart looks enlarged and strained.' },
            { name: 'Bedside heart ultrasound', result: 'Right ventricle dilated and working hard. Left side normal.' }
          ],
          labs: [
            { name: 'Troponin (heart muscle marker)', value: 'Mildly raised', flag: 'H', ref: 'Normal' },
            { name: 'BNP (heart strain marker)', value: 'Raised', flag: 'H', ref: 'Normal' }
          ]
        }
      },
      {
        title: 'Clots with heart strain',
        findings: 'Her blood pressure is still normal at 112/70, but the right heart is strained and the heart markers are raised. This is an intermediate-risk pulmonary embolism.',
        question: 'What is the right treatment plan now?',
        timeCost: 20,
        options: [
          { text: 'Start a blood thinner and admit her to a closely monitored bed', correct: true, feedback: 'With normal blood pressure, a blood thinner plus close monitoring is the standard approach. The specialist team watches for any sign she is getting worse.', effect: -12 },
          { text: 'Give a clot-dissolving drug now because the clots are in both lungs', correct: false, feedback: 'Clot-dissolving drugs carry a real risk of serious bleeding, so they are saved for patients whose blood pressure falls.', effect: 10 },
          { text: 'Discharge her today with blood thinner tablets and clinic follow-up', correct: false, feedback: 'Right heart strain means she could deteriorate. She needs to be watched in hospital.', effect: 16 },
          { text: 'Hold all treatment until the leg ultrasound confirms the clot source', correct: false, feedback: 'The CT already proved the clots. Delaying the blood thinner lets them grow.', effect: 14 }
        ],
        results: {
          update: 'The blood thinner is started and the PE response team is informed. About 40 minutes later the nurse calls you urgently.'
        }
      },
      {
        title: 'Sudden change',
        findings: 'Her blood pressure has fallen to 86/52 and her heart rate is 132. She is more confused and her oxygen needs have increased. The bedside ultrasound shows the right ventricle is even larger.',
        question: 'She now meets criteria for high-risk PE. What should you do?',
        timeCost: 15,
        options: [
          { text: 'Escalate to the PE team and ICU for clot-dissolving or removal therapy', correct: true, feedback: 'Falling blood pressure turns this into a high-risk PE. The benefits of breaking up or removing the clot now outweigh the bleeding risk.', effect: -16 },
          { text: 'Give several large bags of IV fluid quickly to raise the blood pressure', correct: false, feedback: 'A strained right ventricle can be overloaded by too much fluid, which may make her worse.', effect: 14 },
          { text: 'Keep the current plan and recheck her blood pressure in thirty minutes', correct: false, feedback: 'Low blood pressure in PE is a sign of a failing heart. Waiting is dangerous.', effect: 18 },
          { text: 'Stop the blood thinner because it may be causing the low blood pressure', correct: false, feedback: 'The blood thinner does not cause this drop. The clot load is the problem.', effect: 16 }
        ]
      }
    ],
    disposition: { type: 'icu', label: 'Admitted to the intensive care unit under the PE response team', maxSeverity: 45 },
    teaching: 'Pulmonary embolism often follows long travel, immobility or hormone medicines, and a swollen calf is a big clue. A normal chest X-ray with low oxygen should raise suspicion, not lower it. Risk depends on blood pressure and heart strain, and stronger clot-busting treatment is reserved for patients who become unstable.'
  },

  // ───────────────────────────────────────────── 3. Community-acquired pneumonia (Beginner)
  {
    id: 'a-pneumonia-01',
    title: 'Cough and fever for three days',
    specialty: 'Respiratory',
    difficulty: 'Beginner',
    age: 44, sex: 'M',
    chiefComplaint: 'Cough with yellow-green phlegm, fever and right-sided chest pain',
    suspected: 'Chest infection',
    finalDiagnosis: 'Community-acquired pneumonia of the right lower lobe (low severity)',
    presentation: 'A 44-year-old builder has had a cough for three days that now brings up yellow-green phlegm. He has had fevers and chills, and his right lower chest hurts when he coughs or takes a deep breath. He feels tired but is still eating and drinking.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Does not smoke. Lives with his wife and two children.'
    },
    canDie: false,
    maxSeverity: 50,
    startSeverity: 24,
    drift: 0.5,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 84,  sbp: 126, dbp: 78, rr: 16, spo2: 98, temp: 37.2 },
      critical: { hr: 118, sbp: 108, dbp: 66, rr: 26, spo2: 90, temp: 39.4 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [],
    decisions: [
      {
        title: 'Initial assessment',
        findings: 'He looks tired and flushed but is talking normally. The triage nurse has recorded his temperature as 38.6 °C.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Check his vital signs including oxygen level and listen to his lungs', correct: true, feedback: 'Vital signs and a chest exam tell you how sick he is and where the problem is. Oxygen level is especially important in a chest infection.', effect: -8 },
          { text: 'Give him cough syrup and send him home to rest for a few days in bed', correct: false, feedback: 'He may have pneumonia, which usually needs antibiotics. Check him properly before deciding.', effect: 8 },
          { text: 'Order a CT scan of his head because fever can sometimes affect the brain', correct: false, feedback: 'He is alert and his symptoms are in his chest. A head scan would not help here.', effect: 5 },
          { text: 'Start a strong antiviral medicine right away because it is flu season', correct: false, feedback: 'Treatment should follow an assessment. Yellow-green phlegm and chest pain suggest a bacterial infection.', effect: 5 }
        ],
        results: {
          update: 'Heart rate 98, blood pressure 124/76, breathing rate 20, oxygen saturation 95% on room air. You hear crackles over the lower right chest.'
        }
      },
      {
        title: 'Which test?',
        findings: 'Crackles in one area of the lungs with fever and a productive cough make you think of pneumonia.',
        question: 'Which test will best confirm your suspicion?',
        timeCost: 20,
        options: [
          { text: 'A chest X-ray to look for an area of infection in the lungs', correct: true, feedback: 'A chest X-ray is the standard test to confirm pneumonia and show which part of the lung is affected.', effect: -8 },
          { text: 'An X-ray of his ribs to look for a crack from heavy lifting', correct: false, feedback: 'His fever and phlegm point to infection, not a rib injury.', effect: 4 },
          { text: 'An ultrasound of his belly to check the liver and gallbladder', correct: false, feedback: 'His pain is in the chest and worse with coughing, which fits a lung problem.', effect: 4 },
          { text: 'No test at all, since his symptoms will go away on their own', correct: false, feedback: 'Fever, crackles and fast breathing suggest pneumonia, which should be confirmed and treated.', effect: 6 }
        ],
        results: {
          imaging: [{ name: 'Chest X-ray', result: 'Patchy white shadowing (consolidation) in the right lower lobe. No fluid around the lung.' }],
          labs: [
            { name: 'White blood cells', value: '14.2 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
            { name: 'CRP (inflammation marker)', value: '96 mg/L', flag: 'H', ref: '<5' },
            { name: 'Urea (kidney marker)', value: '5.1 mmol/L', flag: '', ref: '2.5–7.8' }
          ]
        }
      },
      {
        title: 'Treatment',
        findings: 'The X-ray shows pneumonia in the right lower lung, and his blood tests show a strong infection response. His kidneys are working normally.',
        question: 'What is the main treatment?',
        timeCost: 15,
        options: [
          { text: 'Start antibiotics that cover the usual bacteria behind pneumonia', correct: true, feedback: 'Most adult community pneumonia is bacterial, so antibiotics chosen by local guidelines are the main treatment, along with fluids and fever relief.', effect: -12 },
          { text: 'Give a steroid medicine on its own to calm down the inflammation', correct: false, feedback: 'Steroids alone do not kill bacteria. Antibiotics are needed to treat the infection.', effect: 8 },
          { text: 'Give an antiviral medicine only, because most coughs are viral', correct: false, feedback: 'Many coughs are viral, but this X-ray and blood test pattern points to bacterial pneumonia.', effect: 6 },
          { text: 'Give only cough syrup and fever medicine to keep him comfortable', correct: false, feedback: 'Comfort treatment helps, but without antibiotics the infection can spread and get worse.', effect: 10 }
        ],
        results: {
          update: 'After the first antibiotics, fluids and fever relief he feels better. Temperature 37.8 °C, oxygen saturation 96%, and he is eating a sandwich.'
        }
      },
      {
        title: 'Home or hospital?',
        findings: 'He is alert, his blood pressure and kidney test are normal, his breathing rate is 18 and he is younger than 65. Doctors use a simple score called CURB-65 to judge pneumonia severity, and his score is 0.',
        question: 'Where should he be treated?',
        timeCost: 15,
        options: [
          { text: 'Home with antibiotic tablets, follow-up and clear return advice', correct: true, feedback: 'A low severity score and normal oxygen mean he can usually recover safely at home, as long as he knows when to come back.', effect: -10 },
          { text: 'Admit him to the intensive care unit to be watched closely overnight', correct: false, feedback: 'The ICU is for very sick patients. He is stable with a low severity score.', effect: 5 },
          { text: 'Keep him on a hospital ward for at least a week of IV antibiotics', correct: false, feedback: 'He can take tablets and is stable, so a long stay adds risks without benefit.', effect: 4 },
          { text: 'Send him home without antibiotics now that he is feeling a bit better', correct: false, feedback: 'He feels better because treatment has started. Stopping now lets the infection come back.', effect: 10 }
        ]
      }
    ],
    disposition: { type: 'home', label: 'Discharged home on antibiotic tablets with GP follow-up', maxSeverity: 25 },
    teaching: 'Pneumonia is an infection of the lung tissue causing fever, cough and crackles on exam. A chest X-ray confirms it, and antibiotics treat the usual bacterial causes. Severity scores like CURB-65 help decide who can safely recover at home.'
  },

  // ───────────────────────────────────────────── 4. Acute ischemic stroke (Expert)
  {
    id: 'a-stroke-01',
    title: 'Sudden weakness and slurred words',
    specialty: 'Neurology',
    difficulty: 'Expert',
    age: 68, sex: 'M',
    chiefComplaint: 'Sudden right-sided weakness and difficulty speaking',
    suspected: 'Possible stroke',
    finalDiagnosis: 'Acute ischemic stroke from a blocked left middle cerebral artery',
    presentation: 'A 68-year-old man is brought in by ambulance. His wife says he was fine at breakfast, then at 8:40 she found him in the kitchen unable to lift his right arm, with his face drooping on the right and his words coming out jumbled. It is now 9:20. He is awake and looks frightened.',
    history: {
      pmh: ['High blood pressure', 'Type 2 diabetes', 'High cholesterol'],
      meds: ['A blood pressure tablet', 'A diabetes tablet', 'A cholesterol tablet'],
      allergies: 'No known allergies',
      social: 'Former smoker, stopped 10 years ago. Retired engineer.'
    },
    canDie: true,
    startSeverity: 55,
    drift: 1.6,
    recoveredDrift: -0.8,
    vitals: {
      stable:   { hr: 78,  sbp: 150, dbp: 86, rr: 16, spo2: 97, temp: 36.9 },
      critical: { hr: 52,  sbp: 210, dbp: 118, rr: 8, spo2: 88, temp: 37.4 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [
      { afterMinutes: 45, text: 'Nurse: his right arm is now completely limp and his speech is harder to understand.', effect: 8 }
    ],
    rescue: {
      title: 'Breathing is slowing',
      findings: 'He has become very drowsy and only groans to a loud voice. His breathing is slow and irregular, and the oxygen saturation is falling.',
      question: 'What is the immediate priority?',
      timeCost: 10,
      options: [
        { text: 'Call anesthesia and the ICU team urgently to protect his airway', correct: true, feedback: 'A deeply drowsy patient may not be able to protect their airway. Airway and breathing always come first, even in a stroke.', effect: -18 },
        { text: 'Send him straight back to the CT scanner before treating anything else', correct: false, feedback: 'A scan will be needed, but not until his breathing is safe. ABCs come first.', effect: 18 },
        { text: 'Give him a sugary drink by mouth in case his blood sugar has dropped', correct: false, feedback: 'A drowsy stroke patient cannot swallow safely, and the drink could go into his lungs.', effect: 20 },
        { text: 'Raise his head, turn up the room lights and recheck him in fifteen minutes', correct: false, feedback: 'Slowing, irregular breathing is an emergency that cannot wait fifteen minutes.', effect: 20 }
      ]
    },
    decisions: [
      {
        title: 'The clock is ticking',
        findings: 'Right face droop, right arm and leg weakness, and jumbled speech. He is awake with a clear airway. Blood pressure 188/102, heart rate 84, oxygen saturation 96%.',
        question: 'What should you do first?',
        timeCost: 5,
        options: [
          { text: 'Activate the stroke team and pin down when he was last known well', correct: true, feedback: 'In stroke, time lost is brain lost. Calling the stroke team early and knowing the last-known-well time decides which treatments are possible.', effect: -10 },
          { text: 'Give him an aspirin tablet right away to help thin out his blood', correct: false, feedback: 'Never give a blood thinner before a scan rules out bleeding in the brain, and he may not be able to swallow safely.', effect: 16 },
          { text: 'Watch him for an hour in case it is a mini-stroke that settles down', correct: false, feedback: 'Waiting wastes the short window when clot treatments work best.', effect: 18 },
          { text: 'Lower his blood pressure to normal quickly before anything else', correct: false, feedback: 'Dropping blood pressure fast in a stroke can starve the struggling brain of blood flow.', effect: 12 }
        ],
        results: {
          update: 'The stroke team is on the way. His wife confirms he was completely normal at 8:00 when they had breakfast together, so last known well is 8:00.'
        }
      },
      {
        title: 'Rule out a mimic',
        findings: 'He has diabetes and takes a tablet that can sometimes cause low blood sugar. Low sugar can occasionally cause weakness and confusion that look exactly like a stroke.',
        question: 'On the way to the scanner, what quick check is essential?',
        timeCost: 5,
        options: [
          { text: 'A fingerstick blood sugar test to make sure it is not low sugar', correct: true, feedback: 'Low blood sugar is the classic stroke mimic and takes seconds to check. It must be excluded before clot-dissolving treatment.', effect: -10 },
          { text: 'Give a sugary drink by mouth just in case his sugar is too low', correct: false, feedback: 'Stroke can affect swallowing, so nothing should go by mouth until a swallow check. Test the sugar instead of guessing.', effect: 12 },
          { text: 'Wait for the full lab panel to come back before going for a scan', correct: false, feedback: 'Waiting for every lab result delays the scan. Only the sugar is needed before deciding on clot treatment in most patients.', effect: 12 },
          { text: 'A check of his reflexes with a hammer to confirm it is a stroke', correct: false, feedback: 'Reflexes add little at this stage and do not exclude the most common mimic.', effect: 6 }
        ],
        results: {
          labs: [{ name: 'Fingerstick glucose', value: '7.2 mmol/L (130 mg/dL)', flag: '', ref: '4.0–7.8' }],
          imaging: [
            { name: 'CT brain (no contrast)', result: 'No bleeding. Subtle early changes in the left side of the brain.' }
          ],
          update: 'Blood sugar is normal, so low sugar is not the cause. The brain CT is done at 9:40.'
        }
      },
      {
        title: 'Clot-dissolving treatment?',
        findings: 'No bleeding on CT, and he is about 1 hour 45 minutes from last known well. He has no recent surgery or bleeding problems. But his blood pressure is now 192/108, above the limit the stroke team uses for clot-dissolving treatment.',
        question: 'What is the right plan?',
        timeCost: 10,
        options: [
          { text: 'Bring blood pressure under the stroke team\'s limit, then give the clot-dissolving drug', correct: true, feedback: 'Clot-dissolving medicine raises bleeding risk if blood pressure is too high. Gently bringing it under the team\'s limit makes the treatment safer without losing much time.', effect: -14 },
          { text: 'Give the clot-dissolving drug right now and deal with the high blood pressure afterwards', correct: false, feedback: 'Giving it with a very high blood pressure increases the chance of bleeding into the brain.', effect: 14 },
          { text: 'Rule out clot-dissolving treatment for good because the blood pressure is far too high', correct: false, feedback: 'High blood pressure can usually be lowered quickly enough. Refusing treatment loses a big chance of recovery.', effect: 12 },
          { text: 'Order an MRI of the brain first to be completely certain that it is a stroke', correct: false, feedback: 'An MRI takes much longer. The CT plus his clear symptoms are enough to decide, and every minute counts.', effect: 14 }
        ],
        results: {
          update: 'Blood pressure comes down to 176/98 and the clot-dissolving drug is started at 10:05. The stroke team also reviews the CT angiogram.',
          imaging: [{ name: 'CT angiogram (head and neck)', result: 'A clot is blocking the first part of the left middle cerebral artery, a large brain artery.' }]
        }
      },
      {
        title: 'A large blocked artery',
        findings: 'The angiogram shows a large artery blocked by a clot. Clot-dissolving medicine alone often does not open large arteries fully. His weakness is still severe.',
        question: 'What additional step should you take now?',
        timeCost: 15,
        options: [
          { text: 'Contact the interventional team about a clot removal procedure now', correct: true, feedback: 'For a large-artery blockage, removing the clot through a catheter greatly improves the chance of recovery. It is done alongside the medicine, not instead of it.', effect: -14 },
          { text: 'Wait twenty-four hours to see if the medicine works before deciding', correct: false, feedback: 'The benefit of clot removal falls with every hour. Waiting a full day could mean losing that chance.', effect: 16 },
          { text: 'Nothing more is needed now that the clot-dissolving drug is running', correct: false, feedback: 'Large-artery clots are often too big for the medicine alone. Extra treatment should be considered right away.', effect: 12 },
          { text: 'Start a second blood thinner as well to help break the clot up faster', correct: false, feedback: 'Adding more blood thinners during clot-dissolving treatment raises the risk of serious bleeding.', effect: 14 }
        ],
        results: {
          update: 'The interventional team accepts him and is preparing the procedure room. While waiting, the nurse calls you over.'
        }
      },
      {
        title: 'New warning signs',
        findings: 'Twenty minutes into the clot-dissolving drug, he suddenly complains of a severe headache, vomits once, and is harder to wake. His blood pressure has jumped to 205/115.',
        question: 'What should you suspect and do?',
        timeCost: 10,
        options: [
          { text: 'Suspect bleeding: stop the clot-dissolving drug and rescan urgently', correct: true, feedback: 'A new headache, vomiting and drowsiness during clot-dissolving treatment suggest bleeding in the brain. Stop the drug and scan immediately.', effect: -16 },
          { text: 'Treat it as a migraine: give pain relief and continue the drug as planned', correct: false, feedback: 'These are warning signs of brain bleeding, the most serious complication of this treatment.', effect: 20 },
          { text: 'Treat it as nausea: give anti-sickness medicine and recheck in an hour', correct: false, feedback: 'Vomiting with a new headache and drowsiness is a red flag, not just nausea.', effect: 18 },
          { text: 'Treat it as a slow response: add more clot-dissolving drug to finish faster', correct: false, feedback: 'More drug would make any bleeding much worse.', effect: 24 }
        ],
        results: {
          imaging: [{ name: 'Repeat CT brain', result: 'A small area of bleeding within the stroke area. No large bleed.' }],
          update: 'The drug was stopped in time. The specialists reverse its effect, control his blood pressure and admit him to the neuro intensive care unit for close watching.'
        }
      }
    ],
    disposition: { type: 'icu', label: 'Admitted to neuro intensive care under the stroke team', maxSeverity: 50 },
    teaching: 'In stroke, "time is brain": know the last-known-well time, call the stroke team early, check blood sugar and get a brain CT before any clot-dissolving treatment. Large-artery clots may also need clot removal. Any new headache, vomiting or drowsiness during treatment means stop and scan for bleeding.'
  },

  // ───────────────────────────────────────────── 5. First seizure in a teenager
  {
    id: 'a-seizure-01',
    title: 'Collapse and shaking at school',
    specialty: 'Neurology',
    difficulty: 'Intermediate',
    age: 17, sex: 'F',
    chiefComplaint: 'Collapsed and had a shaking episode in class',
    suspected: 'Possible seizure',
    finalDiagnosis: 'First generalized seizure, likely juvenile myoclonic epilepsy, triggered by sleep deprivation',
    presentation: 'A 17-year-old student is brought in by ambulance from school. Her teacher saw her suddenly go stiff, fall from her chair and shake all over for about two minutes. Afterwards she was confused and very sleepy. She bit the side of her tongue. Paramedics say she is slowly waking up.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Final-year exams this week. Has been sleeping 3–4 hours a night and drinking a lot of energy drinks. Recently got her learner\'s driving permit.'
    },
    canDie: false,
    maxSeverity: 45,
    startSeverity: 30,
    drift: 0.4,
    recoveredDrift: -2,
    vitals: {
      stable:   { hr: 80,  sbp: 112, dbp: 70, rr: 14, spo2: 99, temp: 36.8 },
      critical: { hr: 124, sbp: 136, dbp: 84, rr: 22, spo2: 93, temp: 37.4 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [],
    decisions: [
      {
        title: 'Arrival',
        findings: 'She is drowsy but opens her eyes to her name. The shaking has stopped. There is a little saliva around her mouth. Heart rate 104, oxygen saturation 96%.',
        question: 'What should you do first?',
        timeCost: 5,
        options: [
          { text: 'Lay her on her side, check airway and breathing, then check sugar', correct: true, feedback: 'The recovery position keeps the airway clear while she is drowsy, and low blood sugar is a quick, fixable cause of seizures.', effect: -10 },
          { text: 'Put something firm between her teeth so she cannot bite her tongue', correct: false, feedback: 'Never put anything in the mouth of someone after or during a seizure. It can break teeth or block the airway.', effect: 10 },
          { text: 'Hold her arms and legs down firmly in case another seizure begins', correct: false, feedback: 'Restraining someone during a seizure can cause injury. Protect them from hard objects instead.', effect: 8 },
          { text: 'Give a strong seizure-stopping medicine now even though it has ended', correct: false, feedback: 'The seizure has already stopped. Extra sedating medicine can make her breathing slower without benefit.', effect: 10 }
        ],
        results: {
          labs: [{ name: 'Fingerstick glucose', value: '5.4 mmol/L (97 mg/dL)', flag: '', ref: '4.0–7.8' }],
          update: 'Blood sugar is normal. Over the next 30 minutes she gradually becomes fully alert and talks normally.'
        }
      },
      {
        title: 'Finding a cause',
        findings: 'She is now awake and embarrassed. She has no fever, no headache and no neck stiffness. She did not hit her head. Her neurological exam is normal.',
        question: 'Which set of tests fits a first seizure in a well, alert teenager?',
        timeCost: 20,
        options: [
          { text: 'Blood salts, a pregnancy test and an ECG of her heart rhythm', correct: true, feedback: 'Basic blood tests look for salt problems, a pregnancy test is routine before treatment decisions, and an ECG checks for heart rhythm causes that can mimic seizures.', effect: -10 },
          { text: 'A spinal tap to look for infection around the brain and spine', correct: false, feedback: 'With no fever, headache or neck stiffness, a spinal tap is not needed.', effect: 8 },
          { text: 'No tests, since first seizures are common and always harmless', correct: false, feedback: 'Many first seizures are not dangerous, but simple tests can find treatable causes.', effect: 6 },
          { text: 'A full-body CT scan to search every organ for a hidden cause', correct: false, feedback: 'This exposes her to lots of radiation without a reason to suspect disease elsewhere.', effect: 6 }
        ],
        results: {
          labs: [
            { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
            { name: 'Calcium', value: '2.35 mmol/L', flag: '', ref: '2.15–2.55' },
            { name: 'Pregnancy test', value: 'Negative', flag: '', ref: 'Negative' }
          ],
          imaging: [{ name: 'ECG', result: 'Normal sinus rhythm. Normal intervals.' }]
        }
      },
      {
        title: 'An extra clue',
        findings: 'Her friend arrives and mentions that for months she has had sudden "jerks" of her arms in the mornings, sometimes spilling her cereal. Everyone thought she was just clumsy. Her tests and exam are all normal.',
        question: 'What does this clue mean for your plan?',
        timeCost: 15,
        options: [
          { text: 'It suggests an epilepsy type; arrange an EEG and outpatient brain MRI', correct: true, feedback: 'Morning jerks plus a big seizure, especially after little sleep, fit a common teenage epilepsy. An EEG (brain wave test) and MRI help the neurologist confirm it.', effect: -12 },
          { text: 'It confirms clumsiness, so no further brain tests are needed at all', correct: false, feedback: 'Morning jerks are an important clue. Dismissing them could miss an epilepsy that is easy to treat.', effect: 8 },
          { text: 'It means she needs an emergency CT scan and ICU admission right away', correct: false, feedback: 'She is alert with a normal exam. The jerks guide outpatient testing, not emergency care.', effect: 5 },
          { text: 'It means the energy drinks caused everything, so just stop drinking them', correct: false, feedback: 'Caffeine and poor sleep can trigger seizures, but the long history of jerks suggests an underlying tendency.', effect: 6 }
        ]
      },
      {
        title: 'Medicine or not?',
        findings: 'Her parents ask whether she should start an anti-seizure medicine today. She is now completely back to normal.',
        question: 'How should this decision be made?',
        timeCost: 15,
        options: [
          { text: 'Discuss with neurology; the choice often waits for the EEG and MRI', correct: true, feedback: 'Whether to start long-term medicine depends on the type of epilepsy and test results, so the specialist usually decides once the tests are done.', effect: -10 },
          { text: 'Start a lifelong anti-seizure medicine today without any specialist', correct: false, feedback: 'Long-term medicines have side effects and the right choice depends on the epilepsy type. A neurologist should guide this.', effect: 6 },
          { text: 'Never use medicine because one seizure can never mean epilepsy', correct: false, feedback: 'With the morning jerks, this may well be epilepsy. Medicine may be very helpful once confirmed.', effect: 6 },
          { text: 'Keep her in hospital for a week to see if another seizure happens', correct: false, feedback: 'Waiting in hospital does not change the plan and disrupts her life. Outpatient follow-up works well here.', effect: 5 }
        ]
      },
      {
        title: 'Going home safely',
        findings: 'She is ready to go home with neurology follow-up. She asks if she can drive with her learner\'s permit this weekend and go swimming with friends.',
        question: 'What safety advice should she receive?',
        timeCost: 10,
        options: [
          { text: 'No driving until cleared, no swimming or bathing alone, sleep well', correct: true, feedback: 'Another seizure while driving or in water could be very dangerous. Driving rules vary by place, but she must not drive until a doctor clears her. Good sleep reduces seizure risk.', effect: -10 },
          { text: 'Driving and swimming are fine as long as someone is in the car or pool', correct: false, feedback: 'A passenger cannot stop a car if the driver has a seizure. Driving must wait until she is cleared.', effect: 6 },
          { text: 'She must stay off school and avoid all exercise for the next six months', correct: false, feedback: 'Normal life, school and most exercise are encouraged with sensible precautions.', effect: 4 },
          { text: 'No special advice is needed because she is now completely back to normal', correct: false, feedback: 'Feeling normal now does not remove the risk of another seizure. Safety advice protects her.', effect: 6 }
        ]
      }
    ],
    disposition: { type: 'home', label: 'Discharged home with family, seizure safety advice and neurology follow-up', maxSeverity: 20 },
    teaching: 'After a first seizure: protect the airway, check blood sugar, and look for causes with simple tests. Clues like morning jerks can point to a specific epilepsy type. Before discharge, give clear safety advice about driving, swimming and sleep, and arrange neurology follow-up.'
  }

);
