/* ER Simulator — case pack B (GI, Infectious Disease, Endocrinology)
 * Fictional educational cases. No doses, no procedure instructions.
 */
window.CASE_LIBRARY = window.CASE_LIBRARY || [];
window.CASE_LIBRARY.push(
  /* ------------------------------------------------------------------ */
  {
    id: 'b-gi-bleed-01',
    title: 'Vomiting blood and black stools',
    specialty: 'Gastroenterology',
    difficulty: 'Advanced',
    age: 67, sex: 'M',
    chiefComplaint: 'Vomited dark material twice and has had black stools for two days',
    suspected: 'Possible upper gastrointestinal bleeding',
    finalDiagnosis: 'Bleeding stomach ulcer (upper GI bleed) linked to anti-inflammatory pain pills and a blood thinner',
    presentation: 'A 67-year-old man arrives after vomiting dark, coffee-ground-looking material twice this morning. He has had black, sticky stools for two days and feels light-headed when he stands up. He has been taking extra anti-inflammatory pain pills for a sore knee over the past three weeks, and he also takes a daily blood thinner for an irregular heart rhythm.',
    history: {
      pmh: ['Atrial fibrillation (irregular heart rhythm)', 'Knee arthritis', 'High blood pressure'],
      meds: ['A daily blood thinner', 'Over-the-counter anti-inflammatory pain pills', 'A blood pressure pill'],
      allergies: 'No known allergies',
      social: 'Retired carpenter; lives with his wife. Drinks a glass of wine most evenings. Does not smoke.'
    },
    canDie: true,
    startSeverity: 45,
    drift: 1.6,
    recoveredDrift: -1.2,
    vitals: {
      stable:   { hr: 84,  sbp: 128, dbp: 78, rr: 16, spo2: 98, temp: 36.7 },
      critical: { hr: 132, sbp: 76,  dbp: 42, rr: 26, spo2: 95, temp: 36.2 }
    },
    initialLabs: [
      { name: 'Hemoglobin', value: '13.1 g/dL', flag: 'L', ref: '13.5–17.5' },
      { name: 'Platelets', value: '228 ×10⁹/L', flag: '', ref: '150–400' },
      { name: 'Blood urea nitrogen (BUN)', value: '42 mg/dL', flag: 'H', ref: '7–20' },
      { name: 'Creatinine', value: '1.0 mg/dL', flag: '', ref: '0.7–1.3' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 50, text: 'Nurse: he just passed a large black stool and looks paler.', effect: 8 }
    ],
    rescue: {
      title: 'Sudden drop in blood pressure',
      findings: 'He vomits a large amount of bright red blood. His blood pressure falls to 74/40, his heart rate is 136, and he is pale and sweaty but still answers questions.',
      question: 'What do you do right now?',
      timeCost: 10,
      options: [
        { text: 'Activate the massive transfusion plan and call the GI and surgery teams', correct: true, feedback: 'Life-threatening bleeding needs blood products quickly through a coordinated hospital plan, plus specialists who can stop the bleeding at its source.', effect: -20 },
        { text: 'Give a pill to settle his stomach and lay him flat to rest for an hour', correct: false, feedback: 'Pills cannot work fast enough and cannot stop a major bleed. He needs blood replacement and an urgent procedure to control the source.', effect: 20 },
        { text: 'Send him for a CT scan of his abdomen to look for the exact bleeding spot', correct: false, feedback: 'Moving an unstable patient to a scanner before resuscitation is risky. Blood products and the GI team come first.', effect: 15 },
        { text: 'Keep running plain saline as fast as possible and recheck the labs later', correct: false, feedback: 'Saline does not carry oxygen and can dilute clotting factors. In a major bleed, blood products are what he needs.', effect: 12 }
      ]
    },
    decisions: [
      {
        title: 'First steps',
        findings: 'He is alert but pale. Heart rate 104, blood pressure 108/66 lying down, and he feels faint when he sits up. His stool on rectal check is black and tarry.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Place two large IV lines and send blood for typing and crossmatch', correct: true, feedback: 'With a possible serious bleed, the first priorities are reliable IV access and getting blood ready in case he needs a transfusion.', effect: -10 },
          { text: 'Send him to CT for a scan of the abdomen before placing any IV lines', correct: false, feedback: 'Imaging can wait. A patient who may be bleeding needs IV access and blood ready before leaving the department.', effect: 10 },
          { text: 'Give him a pain pill for the stomach ache and recheck vitals in an hour', correct: false, feedback: 'Anti-inflammatory pain pills may be part of the cause, and waiting an hour wastes time in a bleeding patient.', effect: 12 },
          { text: 'Have him drink plenty of water to replace fluid while labs are running', correct: false, feedback: 'Patients with a possible GI bleed should usually not eat or drink in case they need an endoscopy, and water will not fix blood loss.', effect: 6 }
        ],
        results: {
          update: 'Two IV lines are placed and blood is sent to the blood bank. An IV acid-reducing medicine is started.',
          labs: [ { name: 'Blood type & screen', value: 'O positive, no antibodies', flag: '', ref: '—' } ]
        }
      },
      {
        title: 'A reassuring number?',
        findings: 'The first hemoglobin is 13.1 g/dL, only just below normal. The resident says, "His blood count is basically fine, so maybe this is not a big bleed." His heart rate is still 106.',
        question: 'How should you interpret the hemoglobin?',
        timeCost: 10,
        options: [
          { text: 'Repeat it soon, since early in a bleed the number may not have dropped', correct: true, feedback: 'Right after bleeding, the blood lost has the same concentration as what is left, so hemoglobin can look normal. It falls later as the body and IV fluids dilute the blood.', effect: -8 },
          { text: 'Treat it as proof of a minor bleed and start planning for his discharge', correct: false, feedback: 'A normal early hemoglobin can be falsely reassuring. His fast heart rate and black stools suggest significant blood loss.', effect: 14 },
          { text: 'Stop the IV fluids, since his blood count shows no sign of blood loss', correct: false, feedback: 'His heart rate and dizziness are signs of reduced blood volume. The hemoglobin simply has not caught up yet.', effect: 10 },
          { text: 'Transfuse two units of blood now because of the black stools alone', correct: false, feedback: 'Transfusion decisions depend on his vital signs and hemoglobin trend. Right now he is stable enough to recheck closely first.', effect: 5 }
        ],
        results: {
          update: 'A repeat hemoglobin is ordered for one hour from now. His clotting tests come back.',
          labs: [ { name: 'INR (clotting time)', value: '2.8', flag: 'H', ref: '0.9–1.1' } ]
        }
      },
      {
        title: 'His home medicines',
        findings: 'His clotting test is prolonged because of his blood thinner. He asks if he should keep taking his pain pills for his knee, and whether skipping the blood thinner could cause a stroke.',
        question: 'What is your plan for his medicines?',
        timeCost: 10,
        options: [
          { text: 'Hold both medicines and discuss blood thinner reversal with specialists', correct: true, feedback: 'Both drugs make bleeding worse. Stopping them and asking the specialist team about reversing the blood thinner balances bleeding risk against stroke risk.', effect: -10 },
          { text: 'Keep giving the blood thinner as usual so his heart rhythm stays safe', correct: false, feedback: 'Stroke risk matters, but active bleeding is the more immediate danger. The blood thinner is usually held during a serious bleed.', effect: 12 },
          { text: 'Swap his pain pills for a stronger anti-inflammatory of the same kind', correct: false, feedback: 'Anti-inflammatory pills damage the stomach lining and likely caused the ulcer. A stronger one would make things worse.', effect: 14 },
          { text: 'Stop only the pain pills and keep the blood thinner on its usual schedule', correct: false, feedback: 'Stopping the pain pills is good, but continuing the blood thinner keeps his blood from clotting while he is actively bleeding.', effect: 8 }
        ]
      },
      {
        title: 'The number changes',
        findings: 'One hour later his heart rate is 118 and blood pressure 94/58. The repeat hemoglobin has dropped from 13.1 to 8.9 g/dL, and a second recheck shows 7.4 g/dL. He has passed more black stool.',
        question: 'How do you respond to this drop?',
        timeCost: 15,
        options: [
          { text: 'Transfuse red blood cells now, given the drop and his worse vitals', correct: true, feedback: 'A falling hemoglobin together with a faster heart rate and lower blood pressure shows ongoing bleeding. Red blood cells restore oxygen-carrying capacity.', effect: -14 },
          { text: 'Wait until his hemoglobin falls below 5 before giving any blood products', correct: false, feedback: 'Waiting for a very low number in a patient who is actively bleeding and becoming unstable is dangerous.', effect: 18 },
          { text: 'Give large amounts of IV saline only, since transfusions carry some risk', correct: false, feedback: 'Saline can support blood pressure briefly but does not carry oxygen. Ongoing bleeding with unstable vitals needs blood.', effect: 12 },
          { text: 'Recheck the hemoglobin again in six hours before deciding on anything', correct: false, feedback: 'The trend is already clear. Six more hours of bleeding without treatment could make him critically ill.', effect: 15 }
        ],
        results: {
          update: 'Blood is transfused. His heart rate settles to 98 and his blood pressure rises to 112/68.',
          labs: [ { name: 'Hemoglobin (after transfusion)', value: '8.6 g/dL', flag: 'L', ref: '13.5–17.5' } ]
        }
      },
      {
        title: 'Finding the source',
        findings: 'He is more stable after transfusion. The GI team asks when you think he needs an endoscopy (a camera passed into the stomach to find and treat the bleeding spot).',
        question: 'What timing do you recommend to the GI team?',
        timeCost: 20,
        options: [
          { text: 'Urgent endoscopy within 24 hours, once he is resuscitated and stable', correct: true, feedback: 'For a significant upper GI bleed, endoscopy is done soon after resuscitation. It finds the source and lets the GI team treat it directly.', effect: -12 },
          { text: 'A routine outpatient endoscopy next week once he has gone back home', correct: false, feedback: 'He has had a serious bleed that needed transfusion. Delaying the camera test risks rebleeding at home.', effect: 16 },
          { text: 'Send him straight to the operating room for stomach surgery tonight', correct: false, feedback: 'Surgery is a backup if endoscopy fails. Most bleeding ulcers can be treated through the endoscope.', effect: 10 },
          { text: 'Skip the endoscopy, since the transfusion should stop the bleeding', correct: false, feedback: 'A transfusion replaces lost blood but does not fix the ulcer. Without finding the source, he may bleed again.', effect: 12 }
        ],
        results: {
          update: 'Endoscopy finds a stomach ulcer with a visible vessel, which the GI team treats successfully. No further bleeding occurs.',
          imaging: [ { name: 'Upper endoscopy', result: 'Ulcer in the stomach lining with a visible vessel; treated by the GI team. No active bleeding afterward.' } ]
        }
      }
    ],
    disposition: { type: 'icu', label: 'Admitted to the ICU for monitoring after endoscopy', maxSeverity: 40 },
    teaching: 'Early in a bleed, hemoglobin can look normal because the blood has not had time to dilute — trust the heart rate, blood pressure and trend. Anti-inflammatory pain pills and blood thinners both raise the risk of stomach bleeding. Priorities are IV access, blood ready, careful transfusion decisions, and timely endoscopy by the GI team.'
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'b-urosepsis-01',
    title: 'Confused grandmother with a fever',
    specialty: 'Infectious Disease',
    difficulty: 'Intermediate',
    age: 79, sex: 'F',
    chiefComplaint: 'New confusion and weakness since yesterday',
    suspected: 'Confusion in an older adult — cause unclear',
    finalDiagnosis: 'Septic shock from a kidney infection behind a blocking kidney stone',
    presentation: 'A 79-year-old woman is brought in by her daughter because she has been confused and unusually sleepy since yesterday. Normally she lives on her own and does her own shopping. Today she did not recognize her neighbor. Her daughter mentions she has been going to the bathroom often and said it "burned" a few days ago.',
    history: {
      pmh: ['High blood pressure', 'Type 2 diabetes', 'Kidney stones ten years ago'],
      meds: ['A blood pressure pill', 'A diabetes pill'],
      allergies: 'No known allergies',
      social: 'Widowed; lives alone. Daughter visits daily.'
    },
    canDie: true,
    startSeverity: 50,
    drift: 1.8,
    recoveredDrift: -1.0,
    vitals: {
      stable:   { hr: 86,  sbp: 124, dbp: 72, rr: 16, spo2: 97, temp: 37.2 },
      critical: { hr: 128, sbp: 72,  dbp: 40, rr: 30, spo2: 91, temp: 39.4 }
    },
    initialLabs: [
      { name: 'Glucose', value: '214 mg/dL', flag: 'H', ref: '70–140' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 45, text: 'Nurse: her hands and feet feel cool and she has barely made any urine.', effect: 6 }
    ],
    rescue: {
      title: 'Blood pressure keeps falling',
      findings: 'Her blood pressure is now 70/38 and she is very hard to wake. Her breathing is fast and shallow.',
      question: 'What do you do right now?',
      timeCost: 10,
      options: [
        { text: 'Call the ICU team, give fluids and start blood pressure support', correct: true, feedback: 'Septic shock that is getting worse needs ICU-level care, fluids and medicine to support blood pressure, while antibiotics keep working.', effect: -18 },
        { text: 'Stop all fluids because her lungs might fill up and let her rest quietly', correct: false, feedback: 'Fluid caution matters, but stopping all support during shock lets her blood pressure fall further.', effect: 16 },
        { text: 'Change to a different antibiotic and recheck her blood pressure later', correct: false, feedback: 'Antibiotics take hours to work. Her blood pressure needs support right now.', effect: 12 },
        { text: 'Order a head CT to check whether her drowsiness is caused by a stroke', correct: false, feedback: 'Her drowsiness is explained by shock reducing blood flow to the brain. Leaving to the scanner now delays treatment.', effect: 14 }
      ]
    },
    decisions: [
      {
        title: 'Why is she confused?',
        findings: 'She is drowsy but wakes to her name. Temperature 38.9 °C, heart rate 112, blood pressure 92/54, breathing 24 per minute. Her skin is warm and dry.',
        question: 'What is your first priority?',
        timeCost: 10,
        options: [
          { text: 'Treat as possible sepsis: IV access, lactate, blood tests and cultures', correct: true, feedback: 'Fever, fast heart rate, fast breathing, low blood pressure and confusion together suggest sepsis — a body-wide reaction to infection that needs quick action.', effect: -10 },
          { text: 'Get a head CT first, since sudden confusion in older adults is a stroke', correct: false, feedback: 'Stroke is possible, but fever, fast breathing and low blood pressure point strongly to infection. Delaying sepsis care is dangerous.', effect: 10 },
          { text: 'Assume her dementia is worsening and arrange follow-up with her doctor', correct: false, feedback: 'She has no dementia and this change happened in a day. Sudden confusion in an older adult is often a sign of serious illness.', effect: 16 },
          { text: 'Give a calming medicine so she rests, then draw blood in a few hours', correct: false, feedback: 'Calming medicines can make confusion and low blood pressure worse, and waiting delays the diagnosis.', effect: 14 }
        ],
        results: {
          update: 'IV lines are placed. Blood is drawn for tests.',
          labs: [
            { name: 'White blood cells', value: '18.6 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
            { name: 'Lactate', value: '4.2 mmol/L', flag: 'C', ref: '0.5–2.0' },
            { name: 'Creatinine', value: '2.1 mg/dL', flag: 'H', ref: '0.6–1.1' }
          ]
        }
      },
      {
        title: 'Cultures and antibiotics',
        findings: 'The lab has trouble drawing her second set of blood cultures because her veins are small. A medical student asks whether antibiotics should wait until all cultures are collected and the results return.',
        question: 'How do you handle cultures and antibiotics?',
        timeCost: 10,
        options: [
          { text: 'Get cultures quickly, but start antibiotics without any delay', correct: true, feedback: 'Cultures taken before antibiotics help identify the germ later, but every hour of delay in sepsis raises risk. Never hold antibiotics for a hard culture draw.', effect: -12 },
          { text: 'Wait for the culture results so you know which antibiotic will work', correct: false, feedback: 'Cultures take a day or more. Broad antibiotics are started right away and adjusted once results return.', effect: 18 },
          { text: 'Skip cultures entirely and focus only on giving antibiotics quickly', correct: false, feedback: 'Fast antibiotics are right, but quickly collected cultures help the team choose the most targeted antibiotic later.', effect: 4 },
          { text: 'Start antibiotics only after the urine test confirms an infection', correct: false, feedback: 'Her signs already suggest sepsis. Waiting for a confirming test delays a treatment that should not wait.', effect: 12 }
        ],
        results: {
          update: 'Broad-spectrum antibiotics are started through the IV.',
          labs: [ { name: 'Urinalysis', value: 'Many white cells, positive nitrites', flag: 'H', ref: 'Negative' } ]
        }
      },
      {
        title: 'Low blood pressure',
        findings: 'Her blood pressure is 88/50. Her lungs sound clear and she has no leg swelling. Her daughter worries that "old people can\'t take much fluid."',
        question: 'How do you support her circulation?',
        timeCost: 15,
        options: [
          { text: 'Give IV fluid boluses and recheck her pressure and lungs after each one', correct: true, feedback: 'Sepsis makes blood vessels leaky and wide, so fluids are a key early treatment. Checking after each bolus catches signs of fluid overload early.', effect: -10 },
          { text: 'Hold all fluids because older patients cannot handle any extra volume', correct: false, feedback: 'Age alone is not a reason to withhold fluids. Careful fluids with frequent reassessment are safe and needed in septic shock.', effect: 12 },
          { text: 'Give her usual morning blood pressure pill to keep her on her schedule', correct: false, feedback: 'Her blood pressure is already too low. Her usual blood pressure pill would lower it further.', effect: 16 },
          { text: 'Ask her to drink several glasses of water while you finish the paperwork', correct: false, feedback: 'She is drowsy and could choke, and drinking cannot replace fluid fast enough in septic shock.', effect: 10 }
        ],
        results: {
          update: 'After fluids her blood pressure rises only slightly to 94/56. Lungs remain clear.',
          labs: [ { name: 'Repeat lactate', value: '3.9 mmol/L', flag: 'C', ref: '0.5–2.0' } ]
        }
      },
      {
        title: 'Not improving as expected',
        findings: 'Her lactate barely changed after fluids, her urine output is still very low, and her fever persists. A bedside ultrasound of her kidneys is performed.',
        question: 'What does this slow response suggest?',
        timeCost: 15,
        options: [
          { text: 'There may be an infection source that antibiotics alone cannot fix', correct: true, feedback: 'When sepsis does not improve as expected, look for a source that needs physical treatment, such as a blocked kidney, an abscess or an infected device.', effect: -10 },
          { text: 'The lactate is likely a lab error and can be ignored for the moment', correct: false, feedback: 'A persistently high lactate means her tissues are still not getting enough oxygen. It should not be dismissed.', effect: 14 },
          { text: 'The antibiotics simply need more days, so keep the plan as it is', correct: false, feedback: 'Antibiotics do need time, but a lack of early improvement is a warning sign to search for a hidden source.', effect: 10 },
          { text: 'She probably has a virus, so the antibiotics should be stopped now', correct: false, feedback: 'Her urine test and high white count point to a bacterial infection. Stopping antibiotics would be dangerous.', effect: 18 }
        ],
        results: {
          update: 'The ultrasound shows a swollen, blocked right kidney.',
          imaging: [ { name: 'Kidney ultrasound / CT', result: 'Kidney stone blocking the right ureter, with a swollen right kidney (hydronephrosis).' } ]
        }
      },
      {
        title: 'A blocked, infected kidney',
        findings: 'The scan confirms a kidney stone blocking urine flow from her infected right kidney. Her blood pressure is 90/52 despite fluids and antibiotics.',
        question: 'What is the next step?',
        timeCost: 20,
        options: [
          { text: 'Call urology to relieve the blockage and involve the ICU team as well', correct: true, feedback: 'An infected, blocked kidney is an emergency: the trapped infected urine must be drained by urology, and her shock needs ICU support.', effect: -14 },
          { text: 'Let the stone pass on its own and give pain medicine as she needs it', correct: false, feedback: 'Waiting for a stone to pass is fine for simple stones, but not when infection is trapped behind it and she is in shock.', effect: 16 },
          { text: 'Admit her to a general ward and repeat the kidney scan in two days', correct: false, feedback: 'She is still in shock and the infected kidney is blocked. She needs drainage and closer monitoring now.', effect: 14 },
          { text: 'Add a second antibiotic and wait to see if she improves by tomorrow', correct: false, feedback: 'More antibiotics cannot reach well into trapped, infected urine. The blockage itself must be relieved.', effect: 10 }
        ],
        results: {
          update: 'Urology relieves the blockage. Over the next hours her blood pressure improves and her confusion begins to clear.',
          labs: [ { name: 'Lactate (6 hours later)', value: '1.8 mmol/L', flag: '', ref: '0.5–2.0' } ]
        }
      }
    ],
    disposition: { type: 'icu', label: 'Admitted to the ICU after urology drainage', maxSeverity: 45 },
    teaching: 'Sudden confusion in an older adult can be the main sign of infection. In sepsis, collect cultures quickly but never delay antibiotics, give fluids with frequent reassessment, and recheck lactate. If a patient does not improve as expected, search for a source — like a blocked kidney — that needs to be drained.'
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'b-meningitis-01',
    title: 'College student with fever and headache',
    specialty: 'Infectious Disease',
    difficulty: 'Expert',
    age: 19, sex: 'M',
    chiefComplaint: 'Severe headache, fever and vomiting since last night',
    suspected: 'Fever with severe headache — cause unclear',
    finalDiagnosis: 'Bacterial (meningococcal) meningitis with early septic shock',
    presentation: 'A 19-year-old college student is brought in by his roommate. He went to bed last night with a headache and woke with a high fever, vomiting, and the worst headache of his life. He says bright lights hurt his eyes and it hurts to bend his neck. He lives in a crowded dormitory.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'First-year college student; lives in a shared dorm. Has a girlfriend he saw two days ago.'
    },
    canDie: true,
    startSeverity: 55,
    drift: 2.2,
    recoveredDrift: -1.0,
    vitals: {
      stable:   { hr: 90,  sbp: 122, dbp: 74, rr: 16, spo2: 98, temp: 37.4 },
      critical: { hr: 140, sbp: 74,  dbp: 38, rr: 30, spo2: 92, temp: 40.1 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [
      { afterMinutes: 30, text: 'Nurse: he is getting harder to keep awake.', effect: 8 }
    ],
    rescue: {
      title: 'Rapid worsening',
      findings: 'The rash is spreading quickly. His blood pressure is 76/40, his hands are cold and mottled, and he only groans when you speak to him.',
      question: 'What do you do right now?',
      timeCost: 10,
      options: [
        { text: 'Give fluids, start blood pressure support and call the ICU team now', correct: true, feedback: 'He is in septic shock. He needs fluids and blood pressure support right away, along with ICU care, while the antibiotics work.', effect: -18 },
        { text: 'Hold fluids in case they worsen brain swelling, and keep him resting', correct: false, feedback: 'Low blood pressure reduces blood flow to the brain too. Shock must be treated.', effect: 16 },
        { text: 'Take him for an MRI of the brain to look for the cause of his drowsiness', correct: false, feedback: 'An unstable patient should not leave for a long scan. Resuscitation comes first.', effect: 18 },
        { text: 'Add a different antibiotic and wait to see whether his pressure rises', correct: false, feedback: 'Changing antibiotics does not treat shock. His circulation needs support immediately.', effect: 12 }
      ]
    },
    decisions: [
      {
        title: 'Arrival',
        findings: 'He is lying still with his eyes shut against the light. Temperature 39.6 °C, heart rate 118, blood pressure 112/68. He has neck stiffness and is drowsy but answers questions correctly. Several patients are sitting nearby in the waiting area.',
        question: 'What should you do first?',
        timeCost: 5,
        options: [
          { text: 'Move him to a private room with droplet precautions and get IV access', correct: true, feedback: 'Fever, headache and neck stiffness suggest meningitis, which can spread through respiratory droplets. Isolate him and get ready to treat fast.', effect: -10 },
          { text: 'Give him a mask and seat him in the waiting room until a bed is free', correct: false, feedback: 'He may have a life-threatening, contagious infection. He needs a room and treatment now, not a wait.', effect: 14 },
          { text: 'Place him on a hallway stretcher and finish seeing your other patients', correct: false, feedback: 'A hallway exposes others to infection, and delaying care in suspected meningitis is dangerous.', effect: 14 },
          { text: 'Give pain medicine for the headache and reassess him in about two hours', correct: false, feedback: 'Pain relief is kind, but suspected meningitis cannot wait two hours. Every hour matters.', effect: 16 }
        ]
      },
      {
        title: 'Scan, spinal tap or antibiotics?',
        findings: 'The resident wants to get a head CT, then a lumbar puncture (spinal fluid test), and then give antibiotics once the spinal fluid is collected. The CT scanner has a 90-minute wait.',
        question: 'What order do you choose?',
        timeCost: 10,
        options: [
          { text: 'Draw blood cultures, then give antibiotics and a steroid right away', correct: true, feedback: 'In suspected bacterial meningitis, antibiotics must not wait for a scan or spinal tap. Blood cultures first take minutes; a steroid given early can reduce some complications.', effect: -16 },
          { text: 'Get the head CT first and give the antibiotics once the scan is read', correct: false, feedback: 'A 90-minute delay for a scan could allow the infection to progress. Antibiotics come first.', effect: 18 },
          { text: 'Do the spinal tap first so the spinal fluid culture grows properly', correct: false, feedback: 'Cultures are helpful, but delaying antibiotics to protect test results is the wrong trade-off in a life-threatening infection.', effect: 14 },
          { text: 'Wait for his white blood cell count before deciding on antibiotics', correct: false, feedback: 'A blood count cannot rule meningitis in or out, and waiting delays urgent treatment.', effect: 15 }
        ],
        results: {
          update: 'Blood cultures are drawn and IV antibiotics and a steroid are given within minutes.',
          labs: [
            { name: 'White blood cells', value: '22.4 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
            { name: 'Platelets', value: '96 ×10⁹/L', flag: 'L', ref: '150–400' },
            { name: 'Lactate', value: '3.4 mmol/L', flag: 'H', ref: '0.5–2.0' }
          ]
        }
      },
      {
        title: 'A new rash',
        findings: 'A nurse notices small purple spots on his ankles and belly that do not fade when a clear glass is pressed on them. His blood pressure has fallen to 94/52 and his heart rate is 128.',
        question: 'What does this rash change?',
        timeCost: 10,
        options: [
          { text: 'It suggests bloodstream infection and shock; give fluids, call ICU', correct: true, feedback: 'A non-fading purple rash with falling blood pressure suggests meningococcal bloodstream infection. This can worsen very fast and needs aggressive support.', effect: -12 },
          { text: 'It is likely an allergic reaction to the antibiotic, so stop it now', correct: false, feedback: 'Allergic rashes are usually raised and itchy and they fade with pressure. Stopping antibiotics here could be deadly.', effect: 20 },
          { text: 'It looks like a skin irritation, so apply a cream and keep watching', correct: false, feedback: 'A non-fading rash in a feverish, unwell patient is a warning sign of serious infection, not a skin problem.', effect: 14 },
          { text: 'Ask the skin specialists to review the rash at their clinic tomorrow', correct: false, feedback: 'This rash is a sign of a dangerous infection that can worsen within hours. It needs action now.', effect: 16 }
        ],
        results: {
          update: 'Fluids are given and the ICU team is called. His blood pressure improves to 104/60.'
        }
      },
      {
        title: 'Getting sleepier',
        findings: 'Antibiotics have been running for 40 minutes. He now opens his eyes only when spoken to loudly and is confused about where he is. The resident says, "The antibiotics are in, so let\'s do the spinal tap now."',
        question: 'What do you do before a spinal tap?',
        timeCost: 15,
        options: [
          { text: 'Get a head CT first because his level of alertness has now dropped', correct: true, feedback: 'A drop in alertness can mean pressure inside the skull. A scan before the spinal tap helps check it is safe, and antibiotics are already running.', effect: -10 },
          { text: 'Do the spinal tap right away since the antibiotics are already given', correct: false, feedback: 'With reduced alertness, there may be raised pressure in the brain. A spinal tap without checking first could be harmful.', effect: 14 },
          { text: 'Skip all further testing because the treatment would be the same', correct: false, feedback: 'Testing still matters: it confirms the germ, guides the length of treatment and checks for complications.', effect: 8 },
          { text: 'Let him sleep since he is exhausted and recheck him in the morning', correct: false, feedback: 'Worsening drowsiness in meningitis is a red flag that needs close monitoring, not sleep without checks.', effect: 16 }
        ],
        results: {
          update: 'The CT is safe to proceed. A spinal tap is done later by the team.',
          imaging: [ { name: 'Head CT', result: 'No bleeding, mass or signs of dangerous brain shift.' } ],
          labs: [ { name: 'Spinal fluid', value: 'Cloudy; high white cells, low glucose; gram-negative diplococci', flag: 'C', ref: 'Clear; few cells' } ]
        }
      },
      {
        title: 'Protecting others',
        findings: 'The spinal fluid suggests meningococcal bacteria. His roommate, who drove him in, and his girlfriend ask whether they are at risk. A nurse who stood next to him while he vomited, without a mask, also asks.',
        question: 'What do you advise for these contacts?',
        timeCost: 15,
        options: [
          { text: 'Notify public health and offer preventive antibiotics to close contacts', correct: true, feedback: 'Close contacts of meningococcal disease have a higher risk of infection and are offered preventive antibiotics. Public health helps find everyone who needs them.', effect: -10 },
          { text: 'Contacts need treatment only if they develop a fever later this week', correct: false, feedback: 'Waiting for symptoms is too late — this infection can become severe within hours. Prevention is offered before symptoms.', effect: 10 },
          { text: 'Give preventive antibiotics to every student living in his college', correct: false, feedback: 'Only close contacts need prevention. Treating everyone causes side effects and resistance without benefit.', effect: 5 },
          { text: 'No contacts need anything because he is already receiving treatment', correct: false, feedback: 'Treating the patient does not protect people who were already exposed before treatment began.', effect: 12 }
        ]
      }
    ],
    disposition: { type: 'icu', label: 'Admitted to the ICU on droplet precautions', maxSeverity: 45 },
    teaching: 'In suspected bacterial meningitis, antibiotics must never be delayed for a scan or spinal tap — draw blood cultures and treat. A purple rash that does not fade with pressure is a warning sign of meningococcal bloodstream infection and shock. Use droplet precautions and offer preventive antibiotics to close contacts through public health.'
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'b-dka-01',
    title: 'Teen with vomiting and fast breathing',
    specialty: 'Endocrinology',
    difficulty: 'Advanced',
    age: 15, sex: 'F',
    chiefComplaint: 'Vomiting, stomach pain and fast breathing',
    suspected: 'Unwell teen with diabetes',
    finalDiagnosis: 'Diabetic ketoacidosis (DKA), complicated by early brain swelling',
    presentation: 'A 15-year-old girl with type 1 diabetes has been vomiting since yesterday and has bad stomach pain. Her mother says her insulin pump tubing came loose two days ago and she did not notice for a while. She has been very thirsty, urinating a lot, and now seems tired and is breathing deeply and quickly.',
    history: {
      pmh: ['Type 1 diabetes since age 9'],
      meds: ['Insulin through an insulin pump'],
      allergies: 'No known allergies',
      social: 'High school student; plays soccer; lives with her mother and brother.'
    },
    canDie: true,
    startSeverity: 50,
    drift: 1.6,
    recoveredDrift: -1.2,
    vitals: {
      stable:   { hr: 88,  sbp: 112, dbp: 70, rr: 16, spo2: 99, temp: 36.9 },
      critical: { hr: 140, sbp: 84,  dbp: 46, rr: 34, spo2: 97, temp: 37.4 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [
      { afterMinutes: 35, text: 'Nurse: she vomited again and says her stomach really hurts.', effect: 4 }
    ],
    rescue: {
      title: 'Sudden change in her brain',
      findings: 'She stops answering questions and her heart rate drops to 58 while her blood pressure rises. One pupil looks slightly larger than the other.',
      question: 'What do you do right now?',
      timeCost: 10,
      options: [
        { text: 'Give medicine to reduce brain swelling and call the pediatric ICU now', correct: true, feedback: 'These are signs of dangerous brain swelling. It needs immediate brain-swelling treatment and ICU care — before any scan.', effect: -18 },
        { text: 'Speed up her IV fluids since she may be getting dehydrated once again', correct: false, feedback: 'Giving fluid quickly can make brain swelling worse. This is not dehydration.', effect: 20 },
        { text: 'Send her for a head CT first and decide the treatment after it is read', correct: false, feedback: 'Treatment should start right away based on her signs. A scan can come after she is treated.', effect: 14 },
        { text: 'Give pain medicine for a headache and keep the current plan running', correct: false, feedback: 'These signs are not a simple headache. Missing brain swelling can cause lasting harm.', effect: 18 }
      ]
    },
    decisions: [
      {
        title: 'First look',
        findings: 'She is tired but answers questions. Heart rate 124, blood pressure 104/62, breathing 30 per minute, deep and regular. Her lips are dry and her breath smells fruity.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Check fingerstick glucose and ketones, place an IV and send blood tests', correct: true, feedback: 'Deep, fast breathing and fruity breath in a teen with type 1 diabetes suggest DKA. A quick sugar and ketone check plus blood tests confirm it.', effect: -10 },
          { text: 'Give anti-nausea medicine and discharge her if she keeps water down', correct: false, feedback: 'Vomiting in type 1 diabetes can be DKA, which is life-threatening. She needs testing, not discharge.', effect: 16 },
          { text: 'Get an abdominal CT for appendicitis before sending any blood tests', correct: false, feedback: 'Stomach pain is common in DKA. Blood tests come first and are much faster than a CT.', effect: 10 },
          { text: 'Give an insulin injection right away before any test results return', correct: false, feedback: 'Insulin is needed, but giving it before checking potassium and starting fluids can cause dangerous problems.', effect: 12 }
        ],
        results: {
          update: 'Fingerstick glucose reads "HIGH". Blood tests are back.',
          labs: [
            { name: 'Glucose', value: '548 mg/dL', flag: 'C', ref: '70–140' },
            { name: 'Blood pH (venous gas)', value: '7.08', flag: 'C', ref: '7.32–7.42' },
            { name: 'Bicarbonate', value: '7 mmol/L', flag: 'C', ref: '22–28' },
            { name: 'Ketones (blood)', value: '6.1 mmol/L', flag: 'C', ref: '< 0.6' }
          ]
        }
      },
      {
        title: 'Where to start treatment',
        findings: 'This is DKA: very high sugar, acid in the blood and high ketones. She is dehydrated from days of urinating and vomiting. The potassium result is still pending.',
        question: 'What treatment comes first?',
        timeCost: 15,
        options: [
          { text: 'Start IV fluids first, at a carefully controlled rate for her age', correct: true, feedback: 'Fluids are the first treatment in DKA: they restore circulation and start lowering sugar. In young patients they are given carefully to reduce brain-swelling risk.', effect: -12 },
          { text: 'Start insulin right away since her blood sugar is the main problem', correct: false, feedback: 'Insulin before fluids and a potassium check can drop potassium dangerously and shift fluid too fast.', effect: 12 },
          { text: 'Give a bicarbonate infusion to correct the acid level more quickly', correct: false, feedback: 'Bicarbonate is rarely used in DKA and may raise the risk of brain swelling in young patients. Fluids and insulin fix the acid.', effect: 10 },
          { text: 'Withhold all IV fluids to avoid any possibility of brain swelling', correct: false, feedback: 'She is significantly dehydrated. Careful fluids are needed — withholding them is dangerous.', effect: 14 }
        ],
        results: {
          update: 'IV fluids are started. Her heart rate begins to fall.',
          labs: [
            { name: 'Potassium', value: '5.6 mmol/L', flag: 'H', ref: '3.5–5.0' },
            { name: 'Sodium', value: '131 mmol/L', flag: 'L', ref: '135–145' }
          ]
        }
      },
      {
        title: 'A misleading potassium',
        findings: 'Her potassium is high at 5.6. The resident says, "Great, at least potassium is not a problem — we can just ignore it and get on with insulin."',
        question: 'How should you interpret her potassium?',
        timeCost: 10,
        options: [
          { text: 'Her body store is likely low, and insulin will drop the blood level', correct: true, feedback: 'In DKA, acid pushes potassium out of cells, so the blood level looks high while the body has lost a lot in urine. Insulin moves it back into cells, so it can fall fast.', effect: -12 },
          { text: 'It is high, so she needs a medicine to remove potassium from her body', correct: false, feedback: 'Removing potassium would be dangerous here, because her total body potassium is actually low and will drop with treatment.', effect: 16 },
          { text: 'High potassium means insulin is unsafe and should be held all day', correct: false, feedback: 'Insulin is essential to stop ketone production. A mildly high potassium does not mean insulin must wait all day.', effect: 12 },
          { text: 'It looks fine and will not change, so it no longer needs checking', correct: false, feedback: 'Potassium changes quickly during DKA treatment and must be checked often to avoid dangerous heart rhythms.', effect: 14 }
        ]
      },
      {
        title: 'Starting insulin',
        findings: 'After an hour of fluids, her potassium is rechecked at 4.4 and she is making urine. Her blood is still acidic and her ketones are high.',
        question: 'What is the next step?',
        timeCost: 15,
        options: [
          { text: 'Start a steady insulin infusion and add potassium to her IV fluids', correct: true, feedback: 'With potassium checked and urine flowing, insulin can start. Potassium is usually added to fluids so the level does not fall too low.', effect: -12 },
          { text: 'Wait for fluids alone to bring her sugar to normal before any insulin', correct: false, feedback: 'Fluids lower sugar, but only insulin stops the body from making ketones and acid.', effect: 12 },
          { text: 'Restart her insulin pump and send her home to finish treatment there', correct: false, feedback: 'She still has severe acid in her blood. DKA needs hospital treatment with close monitoring.', effect: 18 },
          { text: 'Give a large insulin injection to bring her sugar down as fast as possible', correct: false, feedback: 'Lowering sugar too fast shifts fluid quickly and raises the risk of brain swelling. Steady, controlled correction is safer.', effect: 14 }
        ],
        results: {
          update: 'An insulin infusion is started. Her sugar begins to fall gradually.',
          labs: [ { name: 'Glucose (2 hours later)', value: '362 mg/dL', flag: 'H', ref: '70–140' } ]
        }
      },
      {
        title: 'A new headache',
        findings: 'Four hours into treatment, her numbers are improving. But she now complains of a bad headache, seems newly confused about the day, and her heart rate has slowed from 104 to 66.',
        question: 'What do you think is happening?',
        timeCost: 15,
        options: [
          { text: 'Possible brain swelling; treat it now and call the pediatric ICU', correct: true, feedback: 'New headache, confusion and a slowing heart rate during DKA treatment in a young patient are warning signs of brain swelling. Treat immediately and get ICU help.', effect: -14 },
          { text: 'A normal tension headache; give pain medicine and keep the plan', correct: false, feedback: 'In a young patient with DKA, a new headache with confusion must be treated as possible brain swelling.', effect: 16 },
          { text: 'Low blood sugar from insulin; stop the insulin infusion completely', correct: false, feedback: 'Her sugar is still above normal. Stopping insulin would let the acid build up again, and it misses the real danger.', effect: 12 },
          { text: 'She is tired from being ill, so dim the lights and let her sleep', correct: false, feedback: 'Confusion and a slowing heart rate are not normal tiredness. They are warning signs that need urgent action.', effect: 16 }
        ],
        results: {
          update: 'Brain-swelling treatment is given and fluids are slowed. Within 30 minutes she is more alert and her headache eases.',
          imaging: [ { name: 'Head CT (after treatment)', result: 'Mild brain swelling, no bleeding.' } ]
        }
      }
    ],
    disposition: { type: 'icu', label: 'Admitted to the pediatric ICU', maxSeverity: 45 },
    teaching: 'In DKA, fluids come first and insulin starts only after potassium is known. Potassium can look normal or high in the blood while the body has actually lost a lot, and insulin makes it fall. Young patients can develop brain swelling during treatment — new headache, confusion or a slowing heart rate need immediate action.'
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'b-hypoglycemia-01',
    title: 'Shaky and sweaty after skipping lunch',
    specialty: 'Endocrinology',
    difficulty: 'Beginner',
    age: 56, sex: 'M',
    chiefComplaint: 'Sweaty, shaky and acting confused at work',
    suspected: 'Confusion in a man with diabetes',
    finalDiagnosis: 'Hypoglycemia (low blood sugar) from a diabetes medicine taken without eating',
    presentation: 'A 56-year-old man is brought in by a coworker. He seemed confused at his desk this afternoon, was sweating, and his hands were shaking. He has type 2 diabetes and took his diabetes pills this morning, but he was busy and skipped lunch.',
    history: {
      pmh: ['Type 2 diabetes', 'High cholesterol'],
      meds: ['A diabetes pill that makes the body release more insulin', 'A cholesterol pill'],
      allergies: 'No known allergies',
      social: 'Office manager; lives with his partner. Does not drink alcohol.'
    },
    canDie: false,
    maxSeverity: 45,
    startSeverity: 30,
    drift: 1.0,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 78,  sbp: 128, dbp: 80, rr: 14, spo2: 99, temp: 36.7 },
      critical: { hr: 112, sbp: 146, dbp: 88, rr: 18, spo2: 98, temp: 36.5 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [],
    decisions: [
      {
        title: 'First check',
        findings: 'He is pale, sweaty and shaky. He knows his name but is unsure of the date. Heart rate 104, blood pressure 138/84. He can sit up and talk.',
        question: 'What should you check first?',
        timeCost: 5,
        options: [
          { text: 'Check his blood sugar with a fingerstick test right away', correct: true, feedback: 'In anyone with diabetes who is confused or sweaty, check blood sugar first — it is fast, easy and finds a very treatable cause.', effect: -10 },
          { text: 'Order a head CT scan to look for a stroke as the cause', correct: false, feedback: 'Stroke is possible, but low sugar is much more likely here and can mimic a stroke. A fingerstick takes seconds.', effect: 8 },
          { text: 'Get an ECG first and wait for the cardiology team to visit', correct: false, feedback: 'His fast heart rate is likely from low sugar. Checking sugar first is quicker and more useful.', effect: 6 },
          { text: 'Give him oxygen and wait to see if his confusion clears up', correct: false, feedback: 'His oxygen level is normal. Waiting delays the simple test that explains his symptoms.', effect: 8 }
        ],
        results: {
          update: 'The fingerstick sugar is low.',
          labs: [ { name: 'Glucose (fingerstick)', value: '46 mg/dL', flag: 'C', ref: '70–140' } ]
        }
      },
      {
        title: 'Treating low sugar',
        findings: 'His blood sugar is 46 mg/dL. He is awake, can follow instructions, and can swallow safely.',
        question: 'How do you treat him?',
        timeCost: 5,
        options: [
          { text: 'Give him juice or glucose tablets since he can swallow', correct: true, feedback: 'When a person is awake and can swallow safely, fast-acting sugar by mouth works quickly. IV sugar is used if they cannot swallow.', effect: -12 },
          { text: 'Give an extra dose of his diabetes pill to steady things', correct: false, feedback: 'His diabetes pill lowers blood sugar. Another dose would make his sugar drop even further.', effect: 14 },
          { text: 'Wait half an hour to see if his sugar rises on its own', correct: false, feedback: 'Low blood sugar can get worse and cause seizures or unconsciousness. It should be treated right away.', effect: 10 },
          { text: 'Give him only water so that he does not get dehydrated', correct: false, feedback: 'Water does not contain sugar and will not raise his blood sugar.', effect: 8 }
        ],
        results: {
          update: 'He drinks a glass of juice. Fifteen minutes later he feels better and is no longer sweating.',
          labs: [ { name: 'Glucose (15 minutes later)', value: '98 mg/dL', flag: '', ref: '70–140' } ]
        }
      },
      {
        title: 'Feeling better',
        findings: 'His sugar is now 98 mg/dL and he is fully alert. He says, "Great, I feel fine — can I go back to work now?"',
        question: 'What should happen next?',
        timeCost: 15,
        options: [
          { text: 'Give him a meal and keep rechecking his sugar for a few hours', correct: true, feedback: 'Juice works fast but wears off, while his pill can keep lowering sugar for many hours. A meal and repeated sugar checks over a few hours make sure his sugar stays up.', effect: -8 },
          { text: 'Let him go back to work since his sugar is normal right now', correct: false, feedback: 'His diabetes pill may still be working. Without food, his sugar could fall again in an hour or two.', effect: 8 },
          { text: 'Give him a second glass of juice and then discharge him now', correct: false, feedback: 'More juice raises sugar briefly, but he needs a real meal with longer-lasting food and a recheck.', effect: 5 },
          { text: 'Admit him to the hospital for several days of sugar checks', correct: false, feedback: 'He responded well and the cause is clear. Most patients like him do not need a long admission.', effect: 4 }
        ],
        results: {
          update: 'He eats a sandwich. Over the next few hours his sugar stays steady at around 130 mg/dL.'
        }
      },
      {
        title: 'Why did it happen?',
        findings: 'He asks, "I have taken these pills for years. Why did my sugar drop today?"',
        question: 'What is the explanation?',
        timeCost: 10,
        options: [
          { text: 'His pill kept lowering his sugar even though he skipped lunch', correct: true, feedback: 'His type of diabetes pill makes the body release insulin whether or not he eats. Without lunch, there was no food to balance it.', effect: -8 },
          { text: 'Eating too many sweets yesterday caused a sugar crash today', correct: false, feedback: 'Yesterday\'s food does not usually cause low sugar the next afternoon. The medicine plus a skipped meal is the cause.', effect: 4 },
          { text: 'His diabetes has gone away, so he no longer needs the pills', correct: false, feedback: 'Type 2 diabetes does not suddenly disappear. One low reading after a skipped meal does not mean it is cured.', effect: 6 },
          { text: 'A stomach virus must have stopped his body absorbing sugar', correct: false, feedback: 'He has no vomiting or diarrhea. The story of a skipped meal after his pill explains it.', effect: 4 }
        ]
      },
      {
        title: 'Going home safely',
        findings: 'He feels completely normal and his sugar is stable. His partner is coming to pick him up.',
        question: 'What is the discharge plan?',
        timeCost: 10,
        options: [
          { text: 'Home with partner, meal advice, sugar checks, med review', correct: true, feedback: 'Safe discharge includes someone with him, advice not to skip meals, checking sugar if he feels shaky, and asking his doctor to review his medicine.', effect: -8 },
          { text: 'Stop all of his diabetes medicine permanently starting today', correct: false, feedback: 'Stopping all diabetes medicine could let his sugar run very high. Changes should be made with his own doctor.', effect: 8 },
          { text: 'Drive himself straight back to work for the rest of the day', correct: false, feedback: 'Driving soon after a low sugar episode is unsafe. He should rest and eat with someone around.', effect: 8 },
          { text: 'Double his diabetes pill tonight so his sugar stays balanced', correct: false, feedback: 'More of his pill would raise the chance of another low sugar episode.', effect: 10 }
        ]
      }
    ],
    disposition: { type: 'home', label: 'Discharged home with his partner and follow-up with his doctor', maxSeverity: 20 },
    teaching: 'Always check blood sugar in anyone with diabetes who is confused, sweaty or shaky. Some diabetes medicines keep lowering sugar even when a person does not eat, so skipping meals can cause lows. Treat with fast sugar, then a meal and a recheck, and review medicines before discharge.'
  }
);
