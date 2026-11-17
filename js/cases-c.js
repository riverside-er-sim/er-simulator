// ER Simulator — case pack C (Trauma, Orthopedics, Pediatrics, Emergency Medicine)
// Fictional educational cases. No doses, no procedure instructions.
window.CASE_LIBRARY = window.CASE_LIBRARY || [];
window.CASE_LIBRARY.push(

  // ---------------------------------------------------------------------------
  // 1. Trauma — Expert — splenic injury after bike vs car
  // ---------------------------------------------------------------------------
  {
    id: 'c-trauma-spleen-01',
    title: 'Cyclist hit by a car',
    specialty: 'Trauma',
    difficulty: 'Expert',
    age: 19, sex: 'M',
    chiefComplaint: 'Left-sided belly and rib pain after a bike crash',
    suspected: 'Blunt trauma, injuries not yet known',
    finalDiagnosis: 'Splenic laceration with internal bleeding (hemorrhagic shock)',
    presentation: 'A 19-year-old cyclist was struck by a slow-turning car and thrown onto the handlebars, then the road. He was wearing a helmet and is talking. Paramedics report he complained of left upper belly and lower left rib pain. He arrives on a spinal board with a cervical collar. He says he "feels okay, just sore" and asks if he can call his roommate.',
    history: {
      pmh: ['Infectious mononucleosis two months ago'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'College student; commutes by bike.'
    },
    canDie: true,
    startSeverity: 30,
    drift: 2.2,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 92,  sbp: 124, dbp: 78, rr: 18, spo2: 99, temp: 36.7 },
      critical: { hr: 148, sbp: 72,  dbp: 40, rr: 32, spo2: 94, temp: 35.9 }
    },
    initialLabs: [
      { name: 'Hemoglobin', value: '14.1 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'Lactate', value: '2.6 mmol/L', flag: 'H', ref: '0.5–2.0' },
      { name: 'Glucose', value: '128 mg/dL', flag: 'H', ref: '70–110' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 35, text: 'Nurse: he is suddenly pale and sweaty and says he feels dizzy. Blood pressure is lower than a moment ago.', effect: 14 }
    ],
    rescue: {
      title: 'Crashing trauma patient',
      findings: 'He is now confused and grey. Pulse is very fast and weak, and blood pressure is falling quickly. His belly is more swollen than before.',
      question: 'What is the immediate priority?',
      timeCost: 10,
      options: [
        { text: 'Start massive transfusion and move to the operating room', correct: true, feedback: 'Uncontrolled internal bleeding needs blood replaced and the source stopped. Only surgery (or a specialist bleeding-control procedure) fixes it.', effect: -22 },
        { text: 'Give more clear fluid quickly and repeat the CT scan first', correct: false, feedback: 'Large amounts of clear fluid dilute the blood and its clotting factors, and an unstable patient should not go to CT.', effect: 18 },
        { text: 'Give a medicine to raise blood pressure and keep watching', correct: false, feedback: 'Squeezing blood vessels does not replace lost blood. The problem is an empty tank, not a weak pump.', effect: 20 },
        { text: 'Place a breathing tube first, then think about bleeding', correct: false, feedback: 'He is still moving air. Putting in a breathing tube in a patient with very low blood pressure can make it collapse further; circulation is the urgent problem.', effect: 14 }
      ]
    },
    decisions: [
      {
        title: 'Primary survey',
        findings: 'He is talking in full sentences. Breath sounds are equal, though he winces on deep breaths. Pulse is 102, blood pressure 122/76. There is a tire-tread bruise across the left lower ribs.',
        question: 'How should you begin?',
        timeCost: 10,
        options: [
          { text: 'Check airway, breathing, circulation, disability, then exposure', correct: true, feedback: 'The ABCDE primary survey finds the threats that kill fastest first, in a set order, so nothing important is skipped in a busy trauma bay.', effect: -10 },
          { text: 'Send him straight to CT scan of the head, chest, and belly first', correct: false, feedback: 'Imaging matters, but you must first check that airway, breathing, and circulation are safe before the patient leaves the resuscitation room.', effect: 10 },
          { text: 'Focus on the bruised ribs first since that is where he hurts most', correct: false, feedback: 'Pain location is a clue, not a plan. Talking patients can still be bleeding; a structured survey is needed.', effect: 8 },
          { text: 'Remove the collar and board first so that he is more comfortable', correct: false, feedback: 'Spinal precautions stay until the neck is properly cleared. Comfort is important but comes after a structured assessment.', effect: 9 }
        ],
        results: {
          update: 'Airway clear, breathing adequate, two large IV lines placed, blood sent for type and crossmatch. He is alert. On exposure there is tenderness in the left upper belly.'
        }
      },
      {
        title: 'Bedside ultrasound',
        findings: 'His vitals look reassuring for now: pulse 104, blood pressure 120/74. He says the pain is "creeping up into my left shoulder".',
        question: 'What is the most useful next test at the bedside?',
        timeCost: 10,
        options: [
          { text: 'A FAST ultrasound looking for free fluid in the belly', correct: true, feedback: 'A FAST scan is quick, done at the bedside, and can show blood around the spleen, liver, or heart. Left shoulder pain can be a sign of blood irritating the diaphragm.', effect: -10 },
          { text: 'A shoulder X-ray to look for a collarbone fracture first', correct: false, feedback: 'Shoulder pain after belly trauma can be "referred" from blood under the diaphragm. An X-ray of the shoulder would miss the real problem.', effect: 8 },
          { text: 'An ECG and heart enzyme blood test to check the heart', correct: false, feedback: 'The heart can be bruised in crashes, but the story points to the belly. The bedside ultrasound answers the urgent question faster.', effect: 6 },
          { text: 'A urine sample to look for blood from a kidney injury', correct: false, feedback: 'Kidney injury is possible, but a urine test will not tell you whether there is dangerous bleeding inside the belly right now.', effect: 6 }
        ],
        results: {
          update: 'FAST scan shows free fluid around the spleen, between the spleen and the left kidney. No fluid around the heart.',
          imaging: [ { name: 'FAST ultrasound', result: 'Positive: free fluid in the left upper quadrant. Pericardial view normal.' } ]
        }
      },
      {
        title: 'Reassuring numbers?',
        findings: 'Blood pressure is still 118/72, pulse 108. He is young and fit. Repeat hemoglobin has only dropped slightly to 13.4. He had mono two months ago, which can enlarge the spleen.',
        question: 'How do you interpret this?',
        timeCost: 10,
        options: [
          { text: 'Young people compensate well; he may still be bleeding a lot', correct: true, feedback: 'Young, fit patients can keep a normal blood pressure until they have lost a large amount of blood. A rising pulse and positive FAST matter more than one normal pressure, and hemoglobin lags behind real blood loss.', effect: -10 },
          { text: 'Normal blood pressure means the bleeding is small and stopped', correct: false, feedback: 'Blood pressure often stays normal until late in bleeding. Relying on it alone is a classic trauma trap.', effect: 14 },
          { text: 'Hemoglobin barely moved, so the free fluid is probably not blood', correct: false, feedback: 'Hemoglobin takes hours to fall because blood is lost as whole blood. Early values look falsely reassuring.', effect: 12 },
          { text: 'He is stable enough to wait for a ward bed and recheck tomorrow', correct: false, feedback: 'A positive FAST with a rising pulse needs close monitoring in the resuscitation area and early surgical input, not the ward.', effect: 16 }
        ],
        results: {
          update: 'You call the trauma surgery team early. He goes for a quick CT while still stable, with a doctor and nurse alongside.',
          imaging: [ { name: 'CT abdomen', result: 'Deep laceration of an enlarged spleen with a large amount of blood around it. Liver and kidneys intact. Two left lower rib fractures.' } ]
        }
      },
      {
        title: 'The delayed drop',
        findings: 'Back in the trauma bay, his pulse is now 132 and blood pressure has fallen to 86/50. He is pale and anxious. The surgery team is on the way down.',
        question: 'What is the right resuscitation fluid now?',
        timeCost: 10,
        options: [
          { text: 'Blood products such as red cells, plasma, and platelets', correct: true, feedback: 'When patients lose blood, they need blood back. Giving red cells with plasma and platelets helps carry oxygen and keeps the blood able to clot.', effect: -14 },
          { text: 'Several more large bags of clear saltwater fluid', correct: false, feedback: 'Lots of clear fluid dilutes clotting factors and can make bleeding worse. A small amount is fine while blood arrives, but blood is the goal.', effect: 14 },
          { text: 'A medicine to squeeze blood vessels and raise pressure', correct: false, feedback: 'Vessel-squeezing medicines do not treat blood loss. They can hide how sick the patient is while the bleeding continues.', effect: 16 },
          { text: 'Pain medicine only, since pain is raising his heart rate', correct: false, feedback: 'Pain control is kind and important, but blaming the fast pulse on pain while blood pressure falls misses shock.', effect: 18 }
        ],
        results: {
          update: 'Blood products are running. Pulse improves slightly to 120, blood pressure 98/60, but the surgeon notes his belly is more tense.',
          labs: [ { name: 'Hemoglobin (repeat)', value: '9.8 g/dL', flag: 'L', ref: '13.5–17.5' }, { name: 'Lactate (repeat)', value: '4.8 mmol/L', flag: 'H', ref: '0.5–2.0' } ]
        }
      },
      {
        title: 'Definitive plan',
        findings: 'He responded only briefly to blood products, and his blood pressure is drifting down again. The surgeon asks what you think should happen next.',
        question: 'What is the most fitting next step?',
        timeCost: 15,
        options: [
          { text: 'Take him to the operating room to stop the spleen bleeding', correct: true, feedback: 'A patient who only briefly responds to blood is still bleeding. The source must be controlled, here by surgery on the spleen.', effect: -16 },
          { text: 'Admit to the ward for bed rest and repeat blood counts later', correct: false, feedback: 'Watching-and-waiting is only for spleen injuries in patients who stay stable. He is not stable.', effect: 20 },
          { text: 'Repeat the CT scan to see whether the bleeding has grown', correct: false, feedback: 'A patient with falling blood pressure should not leave for the scanner; the answer is already clear.', effect: 16 },
          { text: 'Keep giving blood in the trauma bay until his numbers settle', correct: false, feedback: 'Blood buys time but does not stop the leak. Delaying surgery lets shock worsen.', effect: 14 }
        ],
        results: {
          update: 'In the operating room the team controls the bleeding from the spleen. He is moved to intensive care afterward, awake and stable.'
        }
      }
    ],
    disposition: { type: 'or', label: 'Operating room for splenic bleeding control, then ICU', maxSeverity: 45 },
    teaching: 'Young trauma patients can hide serious bleeding behind a normal blood pressure; a rising heart rate and a positive FAST scan are early warning signs. Bleeding patients need blood products, not lots of clear fluid, and a patient who only briefly responds needs the source stopped in the operating room.'
  },

  // ---------------------------------------------------------------------------
  // 2. Trauma — Intermediate — head injury on a blood thinner
  // ---------------------------------------------------------------------------
  {
    id: 'c-trauma-headbleed-01',
    title: 'Minor fall, bumped head',
    specialty: 'Trauma',
    difficulty: 'Intermediate',
    age: 78, sex: 'F',
    chiefComplaint: 'Hit her head on a cabinet after tripping',
    suspected: 'Minor head injury',
    finalDiagnosis: 'Subdural hematoma (bleeding around the brain) in a patient on a blood thinner',
    presentation: 'A 78-year-old woman tripped over a rug at home this morning and bumped the side of her head on a kitchen cabinet. She did not pass out. She has a small bruise above her right ear and a mild headache. Her daughter brought her in "just to be safe". She is chatty, knows where she is, and wants to go home to feed her cat.',
    history: {
      pmh: ['Atrial fibrillation (irregular heartbeat)', 'High blood pressure', 'Mild arthritis'],
      meds: ['A blood thinner for atrial fibrillation', 'A blood pressure tablet'],
      allergies: 'No known allergies',
      social: 'Lives alone; independent; daughter nearby.'
    },
    canDie: true,
    startSeverity: 18,
    drift: 1.0,
    recoveredDrift: -1,
    vitals: {
      stable:   { hr: 78, sbp: 142, dbp: 82, rr: 15, spo2: 97, temp: 36.6 },
      critical: { hr: 54, sbp: 188, dbp: 98, rr: 10, spo2: 92, temp: 36.8 }
    },
    initialLabs: [
      { name: 'Hemoglobin', value: '12.6 g/dL', flag: '', ref: '12.0–15.5' },
      { name: 'Platelets', value: '210 ×10⁹/L', flag: '', ref: '150–400' },
      { name: 'Glucose', value: '104 mg/dL', flag: '', ref: '70–110' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 60, text: 'Daughter: "Mum keeps dozing off and she just asked me the same question three times."', effect: 12 }
    ],
    rescue: {
      title: 'Worsening brain bleed',
      findings: 'She is now very hard to wake. Her right pupil is larger than her left, her heart rate has slowed, and her blood pressure is climbing.',
      question: 'What is the most urgent action?',
      timeCost: 10,
      options: [
        { text: 'Call neurosurgery now and reverse the blood thinner urgently', correct: true, feedback: 'These signs suggest the bleed is pressing on the brain. Stopping the bleeding and getting the surgeons to relieve the pressure are both urgent.', effect: -20 },
        { text: 'Give a sedative so she rests and recheck her in one hour', correct: false, feedback: 'Sedation would hide her brain checks and could stop her breathing. A falling level of alertness is an emergency.', effect: 20 },
        { text: 'Lower her blood pressure fast and order a repeat blood test', correct: false, feedback: 'The high pressure is the body trying to push blood into a squeezed brain. The root cause, the bleed, must be treated.', effect: 16 },
        { text: 'Give a pain reliever for her headache and dim the room lights', correct: false, feedback: 'Comfort care alone misses signs of rising pressure inside the skull.', effect: 18 }
      ]
    },
    decisions: [
      {
        title: 'First look',
        findings: 'She is alert, oriented, and moving all limbs normally. The bruise is small and there is no cut. She says, "I feel silly being here."',
        question: 'Which detail in her history matters most right now?',
        timeCost: 5,
        options: [
          { text: 'She takes a blood thinner for atrial fibrillation', correct: true, feedback: 'Blood thinners make even small head bumps much more dangerous, because a slow bleed inside the skull can keep growing.', effect: -8 },
          { text: 'She has arthritis that made her a little unsteady', correct: false, feedback: 'Useful for fall prevention later, but it does not change how worried we should be about her brain right now.', effect: 4 },
          { text: 'She lives alone and is eager to go home to her cat', correct: false, feedback: 'Important for safe discharge planning, but it is not the main risk factor for a hidden bleed.', effect: 4 },
          { text: 'She takes a tablet every day for her blood pressure', correct: false, feedback: 'Worth knowing, but blood pressure tablets do not raise bleeding risk the way blood thinners do.', effect: 5 }
        ]
      },
      {
        title: 'Imaging decision',
        findings: 'Her neurological exam is normal. She has had no vomiting. The daughter asks if a scan is really needed since her mum "seems totally fine".',
        question: 'What should you do?',
        timeCost: 20,
        options: [
          { text: 'Order a CT scan of the head because of the blood thinner', correct: true, feedback: 'Older age plus a blood thinner means a CT is recommended even when the patient looks well, because early bleeds can be silent.', effect: -10 },
          { text: 'Skip imaging since her exam is normal and she is talking', correct: false, feedback: 'A normal exam does not rule out a slow bleed in someone on a blood thinner. Head injury rules recommend scanning her.', effect: 12 },
          { text: 'Order a skull X-ray to look for any cracks in the bone', correct: false, feedback: 'X-rays show bone, not bleeding around the brain. A CT scan is the right test.', effect: 8 },
          { text: 'Send her home and ask the daughter to call if it gets worse', correct: false, feedback: 'Without a scan, a growing bleed could be missed while she is home alone.', effect: 14 }
        ],
        results: {
          imaging: [ { name: 'CT head', result: 'Thin crescent of blood over the right side of the brain (small subdural hematoma). No shift of the brain.' } ],
          labs: [ { name: 'Clotting test (INR)', value: '2.8', flag: 'H', ref: '0.9–1.1 (not on thinner)' } ]
        }
      },
      {
        title: 'Small bleed, now what?',
        findings: 'The bleed is small and she still looks well. Her clotting test confirms the blood thinner is working strongly.',
        question: 'What is the most important next step?',
        timeCost: 15,
        options: [
          { text: 'Plan blood thinner reversal and contact neurosurgery', correct: true, feedback: 'A brain bleed on a blood thinner can grow. Reversing the thinner, as guided by the specialist team, and involving neurosurgery early is standard care.', effect: -12 },
          { text: 'Let her keep the blood thinner so she avoids a stroke', correct: false, feedback: 'Stroke prevention matters long term, but an active brain bleed takes priority right now.', effect: 14 },
          { text: 'Discharge her home since the bleed is only a small one', correct: false, feedback: 'Small bleeds on blood thinners can expand over hours. She needs monitoring in hospital.', effect: 16 },
          { text: 'Repeat the CT next week at an outpatient appointment', correct: false, feedback: 'Too slow. If the bleed grows, it will happen in the next hours, not next week.', effect: 12 }
        ]
      },
      {
        title: 'The twist',
        findings: 'An hour later her daughter says she keeps dozing off and repeating questions. She opens her eyes to voice but drifts back to sleep. Her pupils are equal for now.',
        question: 'How do you interpret this change?',
        timeCost: 15,
        options: [
          { text: 'Possible bleed expansion; repeat the CT scan urgently', correct: true, feedback: 'New drowsiness or confusion after a head injury is a warning sign that pressure in the skull may be rising. It needs urgent re-imaging.', effect: -12 },
          { text: 'She is just tired after a long morning in the hospital', correct: false, feedback: 'Tiredness is tempting to blame, but a change in alertness after head injury must be treated as a bleed until proven otherwise.', effect: 16 },
          { text: 'Likely low blood sugar since she has not eaten lunch yet', correct: false, feedback: 'A quick sugar check is reasonable, and hers was normal, but it should not delay looking at the brain again.', effect: 10 },
          { text: 'Probably a urine infection causing mild elderly confusion', correct: false, feedback: 'Infections can confuse older adults, but the timing right after a known brain bleed points to the bleed.', effect: 12 }
        ],
        results: {
          imaging: [ { name: 'Repeat CT head', result: 'The subdural hematoma has grown and is now pushing the brain slightly to the left.' } ]
        }
      },
      {
        title: 'Disposition',
        findings: 'The bleed has grown. The blood thinner reversal is underway. Neurosurgery has reviewed the scan.',
        question: 'Where should she go next?',
        timeCost: 15,
        options: [
          { text: 'To neurosurgery for an operation to relieve the pressure', correct: true, feedback: 'A growing bleed causing brain shift and drowsiness usually needs surgery to remove the blood and relieve pressure.', effect: -14 },
          { text: 'To a general medical ward with brain checks every 4 hours', correct: false, feedback: 'She is getting worse and needs specialist surgical care, not routine ward monitoring.', effect: 16 },
          { text: 'Back home with her daughter staying overnight to watch her', correct: false, feedback: 'Far too risky. Her brain is under pressure and she could deteriorate quickly.', effect: 22 },
          { text: 'To rehab to work on balance and prevent another fall', correct: false, feedback: 'Fall prevention will matter later, but the bleed must be treated first.', effect: 14 }
        ]
      }
    ],
    disposition: { type: 'or', label: 'Neurosurgery for evacuation of subdural hematoma', maxSeverity: 40 },
    teaching: 'Older adults on blood thinners can have serious brain bleeds after small bumps, so they should get a CT scan even if they look well. Any new drowsiness or confusion after a head injury is a warning sign of a growing bleed. Reversing the blood thinner and involving neurosurgery early saves brains.'
  },

  // ---------------------------------------------------------------------------
  // 3. Orthopedics — Intermediate — hip fracture
  // ---------------------------------------------------------------------------
  {
    id: 'c-ortho-hip-01',
    title: 'Fall at home, cannot stand',
    specialty: 'Orthopedics',
    difficulty: 'Intermediate',
    age: 84, sex: 'F',
    chiefComplaint: 'Right hip pain and unable to walk after a fall',
    suspected: 'Possible hip injury after a fall',
    finalDiagnosis: 'Right femoral neck (hip) fracture; fall caused by a slow heart rhythm from a medication side effect',
    presentation: 'An 84-year-old woman was found on her bedroom floor by a neighbor this morning. She thinks she fell during the night on the way to the bathroom but is a little vague about what happened. She has severe right hip pain and cannot stand. Paramedics noticed her right leg looks shorter and turned outward.',
    history: {
      pmh: ['Osteoporosis (thin bones)', 'High blood pressure', 'Mild memory problems'],
      meds: ['A heart-rate-slowing blood pressure tablet (dose recently increased)', 'A bone-strengthening tablet', 'Calcium and vitamin D'],
      allergies: 'No known allergies',
      social: 'Lives alone with a walker; family visits weekly.'
    },
    canDie: false,
    maxSeverity: 60,
    startSeverity: 28,
    drift: 0.8,
    recoveredDrift: -1,
    vitals: {
      stable:   { hr: 64, sbp: 132, dbp: 74, rr: 16, spo2: 96, temp: 36.4 },
      critical: { hr: 44, sbp: 98,  dbp: 56, rr: 22, spo2: 93, temp: 35.8 }
    },
    initialLabs: [
      { name: 'Hemoglobin', value: '11.4 g/dL', flag: 'L', ref: '12.0–15.5' },
      { name: 'Creatine kinase (muscle enzyme)', value: '890 U/L', flag: 'H', ref: '30–150' },
      { name: 'Sodium', value: '137 mmol/L', flag: '', ref: '135–145' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 70, text: 'Nurse: she is now picking at her sheets and thinks she is at her old school. She was clear-headed on arrival.', effect: 8 }
    ],
    decisions: [
      {
        title: 'Look and listen',
        findings: 'She is in obvious pain and holding very still. Her right leg is shortened and rotated outward. The foot is warm with a good pulse.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Give pain relief and order hip and pelvis X-rays', correct: true, feedback: 'A shortened, outward-turned leg after a fall is a classic sign of hip fracture. Good pain relief comes early, with X-rays to confirm.', effect: -10 },
          { text: 'Ask her to try standing to see how bad the pain is', correct: false, feedback: 'Testing weight-bearing on a likely broken hip causes severe pain and can move the fracture.', effect: 10 },
          { text: 'Straighten the leg to line it up before any X-rays', correct: false, feedback: 'Do not pull on a suspected fracture in the ED. Keep her still and comfortable until imaging and specialist review.', effect: 10 },
          { text: 'Hold pain medicine until the orthopedic team examines', correct: false, feedback: 'Untreated pain is cruel and raises the risk of confusion in older adults. Pain relief should not wait.', effect: 8 }
        ],
        results: {
          imaging: [ { name: 'X-ray right hip and pelvis', result: 'Displaced fracture of the right femoral neck. Bones look thin (osteoporosis).' } ]
        }
      },
      {
        title: 'Why did she fall?',
        findings: 'The fracture is confirmed. She says, "I just got up and everything went grey." Her heart rate is 52. Her blood pressure tablet dose was recently increased.',
        question: 'What is the most useful next step?',
        timeCost: 15,
        options: [
          { text: 'Get an ECG and review her medicines as a fall cause', correct: true, feedback: 'Always ask why an older person fell. Blacking out, a slow pulse, and a recently increased heart-slowing tablet point to a rhythm or medication cause.', effect: -10 },
          { text: 'Assume she tripped in the dark and move on to surgery', correct: false, feedback: 'Assuming a simple trip can miss a heart rhythm problem that could cause another fall, or be risky during anesthesia.', effect: 10 },
          { text: 'Order an MRI of her brain to look for a hidden stroke', correct: false, feedback: 'Stroke is possible but nothing points to it. The slow pulse and "going grey" point first toward the heart.', effect: 6 },
          { text: 'Check her vision since she fell in a dark bedroom', correct: false, feedback: 'Vision matters for fall prevention, but it does not explain the blackout and slow pulse.', effect: 6 }
        ],
        results: {
          update: 'ECG shows a slow but regular rhythm, likely from her heart-slowing tablet. The team pauses that medicine. She also lay on the floor for several hours.',
          labs: [ { name: 'Creatinine (kidney)', value: '1.4 mg/dL', flag: 'H', ref: '0.5–1.1' } ]
        }
      },
      {
        title: 'Long lie',
        findings: 'She was on the floor for about six hours. Her muscle enzyme level is high and her kidney test is slightly raised. Her mouth is dry.',
        question: 'What does this suggest you should add?',
        timeCost: 10,
        options: [
          { text: 'IV fluids, and watch kidney function and urine output', correct: true, feedback: 'After a long lie, muscle breakdown and dehydration can stress the kidneys. Fluids and monitoring help protect them.', effect: -8 },
          { text: 'Restrict all fluids until after her operation is done', correct: false, feedback: 'Fasting for surgery limits food and drink by mouth, but she still needs IV fluids to protect her kidneys.', effect: 8 },
          { text: 'A diuretic tablet to make her pass more urine quickly', correct: false, feedback: 'She is already dry. A water tablet would dehydrate her further.', effect: 10 },
          { text: 'Ignore it, since those numbers are normal for her age', correct: false, feedback: 'Raised muscle enzymes and kidney tests are not normal aging; they reflect the long lie.', effect: 8 }
        ]
      },
      {
        title: 'New confusion',
        findings: 'She now thinks she is at school and is pulling at her IV line. She was clear-headed on arrival. She has had pain medicine and is in a busy, noisy corridor bay.',
        question: 'How should you manage this?',
        timeCost: 15,
        options: [
          { text: 'Delirium care: calm room, glasses, family, pain review', correct: true, feedback: 'Delirium is common after hip fracture. Calm surroundings, glasses and hearing aids, familiar faces, good pain control, and checking for causes help most.', effect: -10 },
          { text: 'Give a strong sedative so she stops pulling at the line', correct: false, feedback: 'Sedatives often make delirium worse in older adults and increase fall and breathing risks.', effect: 10 },
          { text: 'Use wrist restraints so she cannot pull out the IV line', correct: false, feedback: 'Restraints increase agitation and injury. They are a last resort, not first-line care.', effect: 10 },
          { text: 'Assume it is her memory problem and simply carry on', correct: false, feedback: 'A sudden change from her normal is delirium, not her baseline memory problem, and needs a search for causes.', effect: 8 }
        ]
      },
      {
        title: 'Plan and consult',
        findings: 'She is calmer with her daughter at the bedside. Her heart rate has improved to 62 off the heart-slowing tablet. The orthopedic team asks about timing.',
        question: 'What is the most fitting plan?',
        timeCost: 15,
        options: [
          { text: 'Admit under orthopedics for surgery within about a day', correct: true, feedback: 'Hip fractures usually do best with surgery soon, ideally within about 24–36 hours, once the patient is medically optimized.', effect: -12 },
          { text: 'Send her home on crutches with a clinic visit next week', correct: false, feedback: 'She cannot walk and lives alone. Displaced hip fractures need surgery and hospital care.', effect: 14 },
          { text: 'Keep her on bed rest for several weeks to let it heal', correct: false, feedback: 'Long bed rest causes blood clots, pneumonia, and pressure sores. Surgery gets older adults moving again sooner.', effect: 12 },
          { text: 'Delay any surgery for a full month of heart monitoring', correct: false, feedback: 'The rhythm cause has been found and managed. Long delays to surgery raise complication risks.', effect: 10 }
        ]
      }
    ],
    disposition: { type: 'ward', label: 'Admitted to orthopedics for hip surgery with an elderly-care team', maxSeverity: 40 },
    teaching: 'A shortened, outward-rotated leg after a fall suggests a hip fracture. Always ask why an older person fell, since medicines and heart rhythms are common hidden causes. Early pain relief, delirium prevention, and timely surgery give the best recovery.'
  },

  // ---------------------------------------------------------------------------
  // 4. Pediatrics — Beginner — croup
  // ---------------------------------------------------------------------------
  {
    id: 'c-peds-croup-01',
    title: 'Toddler with a barking cough',
    specialty: 'Pediatrics',
    difficulty: 'Beginner',
    age: 2, sex: 'M',
    chiefComplaint: 'Barking cough and noisy breathing at night',
    suspected: 'Breathing problem in a toddler',
    finalDiagnosis: 'Mild to moderate croup (viral laryngotracheitis)',
    presentation: 'A 2-year-old boy had a runny nose and mild fever for two days. Tonight he woke up with a loud cough that sounds like a seal barking, and a hoarse voice. His parents heard a harsh noise when he breathed in while crying. He is now sitting on his mother\'s lap, a little upset but playing with her keys.',
    history: {
      pmh: ['None; vaccinations up to date'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Attends daycare; older sister had a cold last week.'
    },
    canDie: false,
    maxSeverity: 50,
    startSeverity: 22,
    drift: 0.4,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 118, sbp: 98,  dbp: 60, rr: 26, spo2: 98, temp: 37.9 },
      critical: { hr: 165, sbp: 104, dbp: 66, rr: 46, spo2: 92, temp: 38.4 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [],
    decisions: [
      {
        title: 'First approach',
        findings: 'He has a barking cough and a soft harsh noise when breathing in, but only when he cries. He is pink and alert on his mother\'s lap.',
        question: 'How should you examine him?',
        timeCost: 5,
        options: [
          { text: 'Keep him on his parent\'s lap and examine him gently', correct: true, feedback: 'Crying makes croup worse by narrowing the swollen airway more. Keeping the child calm with a parent helps him breathe.', effect: -8 },
          { text: 'Lay him flat on the bed so you can listen to his chest', correct: false, feedback: 'Separating and laying a toddler flat usually triggers crying and can worsen the noisy breathing.', effect: 6 },
          { text: 'Look deep in his throat with a tongue depressor first', correct: false, feedback: 'Forcing a throat exam can upset the child and is not needed to diagnose croup.', effect: 6 },
          { text: 'Take blood tests right away to check for an infection', correct: false, feedback: 'Croup is diagnosed by its typical signs; needles would make him cry and add little.', effect: 6 }
        ]
      },
      {
        title: 'How sick is he?',
        findings: 'At rest he breathes quietly with only a little pulling in at the bottom of his neck. Oxygen level is 98%. He is drinking juice.',
        question: 'Which description fits him best?',
        timeCost: 5,
        options: [
          { text: 'Mild croup: noisy breathing only when he is upset', correct: true, feedback: 'Severity depends on noise at rest, effort of breathing, alertness, and color. Noise only when upset with good oxygen means mild croup.', effect: -6 },
          { text: 'Severe croup: he needs a breathing tube right now', correct: false, feedback: 'He is pink, alert, and quiet at rest. Nothing suggests an airway emergency.', effect: 6 },
          { text: 'Asthma attack: he needs his chest listened to only', correct: false, feedback: 'Asthma causes wheeze when breathing out. A barking cough with noise on breathing in points to croup.', effect: 5 },
          { text: 'A swallowed object: he needs a scope of his airway', correct: false, feedback: 'A swallowed object is worth asking about, but the cold, fever, and barking cough fit croup much better.', effect: 5 }
        ]
      },
      {
        title: 'Treatment',
        findings: 'His parents ask whether he needs antibiotics like his sister had for an ear infection.',
        question: 'What treatment fits croup?',
        timeCost: 10,
        options: [
          { text: 'A single dose of a steroid medicine by mouth', correct: true, feedback: 'Steroids reduce swelling in the airway and help even mild croup. Croup is caused by a virus, so antibiotics do not help.', effect: -10 },
          { text: 'A course of antibiotics to clear the infection', correct: false, feedback: 'Croup is almost always viral. Antibiotics do not treat viruses and can cause side effects.', effect: 4 },
          { text: 'A cough syrup to settle the barking cough down', correct: false, feedback: 'Cough syrups are not recommended for young children and do not reduce airway swelling.', effect: 4 },
          { text: 'An inhaler used for asthma to open the airways', correct: false, feedback: 'Asthma inhalers act on the small airways in the lungs; croup swelling is higher up near the voice box.', effect: 4 }
        ],
        results: {
          update: 'He takes the medicine mixed in juice and settles on his mother\'s lap. He falls asleep after a while.'
        }
      },
      {
        title: 'Home or stay?',
        findings: 'After a period of observation he is asleep, breathing quietly with no pulling in. Oxygen is 99%. His parents are comfortable and live 10 minutes away.',
        question: 'What is the most fitting plan?',
        timeCost: 15,
        options: [
          { text: 'Discharge home with advice on when to return', correct: true, feedback: 'Mild croup that is quiet at rest after treatment can go home. Parents should return for noise at rest, struggling to breathe, or color changes.', effect: -8 },
          { text: 'Admit him to the children\'s ward for a few days', correct: false, feedback: 'He is well and settled. Admission is for children who stay noisy at rest or need repeated treatments.', effect: 4 },
          { text: 'Send him to the ICU for close breathing checks', correct: false, feedback: 'Intensive care is for severe croup, not a sleeping child breathing quietly.', effect: 6 },
          { text: 'Keep him in the ER overnight just to be careful', correct: false, feedback: 'Not needed for mild croup that has settled; a well-informed family at home is safe.', effect: 3 }
        ]
      }
    ],
    disposition: { type: 'home', label: 'Discharged home with croup advice and return precautions', maxSeverity: 25 },
    teaching: 'Croup is a viral illness of toddlers that causes a barking cough and noisy breathing in. Keeping the child calm on a parent\'s lap and giving a steroid medicine to reduce airway swelling are the key steps. Most children go home once breathing is quiet at rest.'
  },

  // ---------------------------------------------------------------------------
  // 5. Pediatrics — Advanced — intussusception masquerading as a stomach bug
  // ---------------------------------------------------------------------------
  {
    id: 'c-peds-intuss-01',
    title: 'Baby with vomiting and fussiness',
    specialty: 'Pediatrics',
    difficulty: 'Advanced',
    age: 1, sex: 'M',
    chiefComplaint: 'Vomiting and fussy since this morning',
    suspected: 'Vomiting infant, cause unclear',
    finalDiagnosis: 'Intussusception (bowel telescoping into itself)',
    presentation: 'A 10-month-old boy has vomited four times since this morning. His older brother had a stomach bug last week, so his parents assumed he caught it. They mention that every 15–20 minutes he suddenly screams, pulls his knees up, and then goes quiet and sleepy between episodes. He has had fewer wet diapers today.',
    history: {
      pmh: ['Healthy; born at full term; vaccinations up to date'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Lives with parents and a 4-year-old brother.'
    },
    canDie: true,
    startSeverity: 32,
    drift: 1.2,
    recoveredDrift: -1.2,
    vitals: {
      stable:   { hr: 138, sbp: 90, dbp: 56, rr: 32, spo2: 99, temp: 37.4 },
      critical: { hr: 188, sbp: 66, dbp: 38, rr: 50, spo2: 95, temp: 38.6 }
    },
    initialLabs: [
      { name: 'Glucose (finger-prick)', value: '72 mg/dL', flag: '', ref: '60–110' },
      { name: 'Sodium', value: '136 mmol/L', flag: '', ref: '135–145' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 45, text: 'Nurse: his diaper has a small amount of dark red, jelly-like stool in it.', effect: 8 }
    ],
    rescue: {
      title: 'Infant in shock',
      findings: 'He is now floppy, pale, and mottled. His heart rate is very fast and his hands and feet are cold. His belly is swollen.',
      question: 'What should happen immediately?',
      timeCost: 10,
      options: [
        { text: 'Fluid boluses, antibiotics, and urgent pediatric surgery call', correct: true, feedback: 'He may have damaged bowel and infection. He needs circulation support, antibiotics, and surgeons immediately.', effect: -20 },
        { text: 'Try small sips of oral rehydration fluid every few minutes', correct: false, feedback: 'A shocked, floppy baby cannot safely drink and needs IV support now.', effect: 16 },
        { text: 'Give an anti-sickness medicine and wait to see if he settles', correct: false, feedback: 'Stopping vomiting does not fix the blockage or the shock.', effect: 18 },
        { text: 'Send him for the air enema straight away without the surgeons', correct: false, feedback: 'When a baby is in shock or the bowel may be damaged, an enema is unsafe; surgeons must be involved first.', effect: 16 }
      ]
    },
    decisions: [
      {
        title: 'First assessment',
        findings: 'Between episodes he is pale and drowsy, not his usual playful self. Mouth is slightly dry. Capillary refill is about 3 seconds. Heart rate 140.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Assess hydration and get IV access with a blood sugar', correct: true, feedback: 'He shows signs of dehydration and low energy. Measuring sugar and getting IV access lets you support him while you work out the cause.', effect: -8 },
          { text: 'Give a bottle of milk to see if he can keep it down', correct: false, feedback: 'Milk can worsen vomiting, and a drowsy baby needs careful assessment first.', effect: 6 },
          { text: 'Diagnose a stomach bug and teach the parents about fluids', correct: false, feedback: 'Jumping to a diagnosis before a full assessment can miss something serious.', effect: 8 },
          { text: 'Give fever medicine and then reassess him in an hour', correct: false, feedback: 'He barely has a fever, and waiting an hour without a plan wastes time.', effect: 6 }
        ],
        results: {
          update: 'IV line placed. Sugar is normal. He has another episode: sudden screaming with legs drawn up, then limp and sleepy afterward.'
        }
      },
      {
        title: 'Look closer',
        findings: 'Between episodes he is unusually sleepy. His belly is soft but you feel a sausage-shaped lump in the upper right side. There has been no diarrhea at all.',
        question: 'Which feature fits a simple stomach bug least well?',
        timeCost: 10,
        options: [
          { text: 'Screaming spells with sleepiness in between', correct: true, feedback: 'Stomach bugs cause steady discomfort with diarrhea. Waves of severe pain with lethargy between them suggest a bowel blockage like intussusception.', effect: -10 },
          { text: 'Vomiting several times since early this morning', correct: false, feedback: 'Vomiting is common in both stomach bugs and blockages, so it does not separate them well.', effect: 5 },
          { text: 'A brother who had a stomach bug the week before', correct: false, feedback: 'This is a misleading clue that makes a stomach bug seem likely, but it does not explain his other signs.', effect: 6 },
          { text: 'Having fewer wet diapers than usual today', correct: false, feedback: 'Fewer wet diapers shows dehydration, which happens with both conditions.', effect: 5 }
        ]
      },
      {
        title: 'Which test?',
        findings: 'You suspect intussusception, where one part of the bowel slides inside the next like a telescope. A nurse now shows you a diaper with dark red, jelly-like stool.',
        question: 'What is the most useful test?',
        timeCost: 20,
        options: [
          { text: 'An ultrasound of the belly by a skilled operator', correct: true, feedback: 'Ultrasound is the first-choice test: no radiation, quick, and very accurate for intussusception, which shows as a "target" shape.', effect: -12 },
          { text: 'A stool sample sent to the lab to look for germs', correct: false, feedback: 'Stool tests take days and look for infection. They will not show a blockage.', effect: 10 },
          { text: 'A CT scan of the whole belly under general sedation', correct: false, feedback: 'CT gives a lot of radiation and needs sedation in a baby; ultrasound answers the question without either.', effect: 6 },
          { text: 'A chest X-ray to rule out a hidden pneumonia first', correct: false, feedback: 'Pneumonia can cause vomiting in babies, but the belly lump and red jelly stool point to the bowel.', effect: 8 }
        ],
        results: {
          imaging: [ { name: 'Abdominal ultrasound', result: 'Target-shaped mass in the right upper abdomen consistent with intussusception. Blood flow present. No free fluid.' } ],
          labs: [ { name: 'Lactate', value: '1.9 mmol/L', flag: '', ref: '0.5–2.0' } ]
        }
      },
      {
        title: 'Treatment choice',
        findings: 'The ultrasound confirms intussusception. He is responding to IV fluids, there are no signs of bowel perforation, and blood flow to the bowel looks preserved.',
        question: 'What is the usual first treatment?',
        timeCost: 30,
        options: [
          { text: 'An air or fluid enema by radiology with surgeons aware', correct: true, feedback: 'In a stable child, radiologists can often push the bowel back into place with an air or fluid enema. Surgeons stay ready in case it fails.', effect: -14 },
          { text: 'Go straight to open surgery on the bowel right away', correct: false, feedback: 'Surgery is needed if the enema fails or the child is unstable, but most stable children avoid an operation.', effect: 6 },
          { text: 'Send him home on fluids to see if it untangles itself', correct: false, feedback: 'Intussusception can cut off blood flow to the bowel. It needs prompt treatment, not waiting at home.', effect: 20 },
          { text: 'Give laxative medicine to push the bowel back in place', correct: false, feedback: 'Laxatives do not fix a telescoped bowel and can worsen pain and vomiting.', effect: 12 }
        ],
        results: {
          update: 'The radiology team reports the enema worked: the bowel is back in place. He is pinker and more alert afterward.'
        }
      },
      {
        title: 'After the fix',
        findings: 'He is feeding a little and smiling at his mother. His parents ask if they can go home right away.',
        question: 'What is the most fitting next step?',
        timeCost: 15,
        options: [
          { text: 'Observe him in hospital for a while for recurrence', correct: true, feedback: 'Intussusception can come back, most often within the first day. A period of observation lets the team catch it quickly.', effect: -8 },
          { text: 'Discharge right away since the problem is now fixed', correct: false, feedback: 'He looks well, but recurrences happen and the family needs a safe observation period first.', effect: 8 },
          { text: 'Schedule a routine follow-up scan in six months', correct: false, feedback: 'Routine scans are not needed. What matters is watching for early recurrence.', effect: 4 },
          { text: 'Plan bowel surgery anyway to stop it happening again', correct: false, feedback: 'Surgery is not needed after a successful enema in a typical case.', effect: 6 }
        ]
      }
    ],
    disposition: { type: 'ward', label: 'Admitted to pediatric ward for observation after successful enema reduction', maxSeverity: 30 },
    teaching: 'Not every vomiting baby has a stomach bug. Waves of screaming with sleepiness in between, a belly lump, and red jelly-like stool suggest intussusception. Ultrasound confirms it, and an air or fluid enema usually fixes it, with surgeons ready if needed.'
  },

  // ---------------------------------------------------------------------------
  // 6. Emergency Medicine — Intermediate — anaphylaxis
  // ---------------------------------------------------------------------------
  {
    id: 'c-em-anaphylaxis-01',
    title: 'Hives and wheeze at a party',
    specialty: 'Emergency Medicine',
    difficulty: 'Intermediate',
    age: 15, sex: 'F',
    chiefComplaint: 'Itchy rash, lip swelling, and trouble breathing after eating',
    suspected: 'Allergic reaction',
    finalDiagnosis: 'Anaphylaxis to peanut, with a biphasic (second-wave) reaction',
    presentation: 'A 15-year-old girl ate a cookie at a friend\'s birthday party about 20 minutes ago. Within minutes she felt itchy, her lips started swelling, and she began coughing. She now feels dizzy and says her throat feels "tight". Her friend\'s parent drove her straight in. She has had mild reactions to peanuts before but has never been prescribed an auto-injector.',
    history: {
      pmh: ['Mild asthma', 'Previous mild hives after peanuts'],
      meds: ['A reliever inhaler as needed'],
      allergies: 'Peanuts (previous hives)',
      social: 'High school student; plays soccer.'
    },
    canDie: true,
    startSeverity: 50,
    drift: 2.5,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 88,  sbp: 116, dbp: 72, rr: 16, spo2: 99, temp: 36.9 },
      critical: { hr: 150, sbp: 70,  dbp: 38, rr: 34, spo2: 86, temp: 37.0 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [
      { afterMinutes: 90, text: 'Nurse: her hives are back and she is wheezing again, even though she looked fine 30 minutes ago.', effect: 14 }
    ],
    rescue: {
      title: 'Worsening anaphylaxis',
      findings: 'Her voice is hoarse, her lips are very swollen, and her oxygen level is dropping. Her blood pressure is low despite treatment.',
      question: 'What should happen now?',
      timeCost: 5,
      options: [
        { text: 'Repeat epinephrine, give IV fluids, call airway help', correct: true, feedback: 'If anaphylaxis is not improving, epinephrine is repeated as directed, fluids support blood pressure, and an airway expert is called early.', effect: -22 },
        { text: 'Give another antihistamine and wait twenty minutes', correct: false, feedback: 'Antihistamines are too slow and too weak for life-threatening anaphylaxis.', effect: 20 },
        { text: 'Give a steroid and move her to a quiet room to rest', correct: false, feedback: 'Steroids act over hours. She needs fast-acting treatment and close monitoring now.', effect: 18 },
        { text: 'Sit her upright and use her reliever inhaler again', correct: false, feedback: 'An inhaler may ease wheeze, but it does not treat throat swelling or low blood pressure.', effect: 14 }
      ]
    },
    decisions: [
      {
        title: 'Recognize it',
        findings: 'She has hives over her chest, swollen lips, a wheeze, and her blood pressure is 88/52. She is anxious and says her throat feels tight.',
        question: 'What is this most likely to be?',
        timeCost: 5,
        options: [
          { text: 'Anaphylaxis: a severe whole-body allergic reaction', correct: true, feedback: 'Skin signs plus breathing trouble and low blood pressure after a known trigger is anaphylaxis, a medical emergency.', effect: -8 },
          { text: 'A panic attack brought on by fear of a possible reaction', correct: false, feedback: 'Anxiety is common here, but panic does not cause hives, swollen lips, or low blood pressure.', effect: 12 },
          { text: 'A mild skin allergy that only needs an anti-itch cream', correct: false, feedback: 'Breathing trouble and low blood pressure mean this is far beyond a skin-only reaction.', effect: 14 },
          { text: 'An asthma attack set off by the excitement of the party', correct: false, feedback: 'She does have asthma, which raises her risk, but hives and lip swelling show this is an allergic reaction.', effect: 10 }
        ]
      },
      {
        title: 'First treatment',
        findings: 'Nurses ask what to give first. Someone suggests an antihistamine since "it\'s an allergy".',
        question: 'What is the first-line treatment?',
        timeCost: 5,
        options: [
          { text: 'Epinephrine injected into the outer thigh muscle', correct: true, feedback: 'Epinephrine is the first-line treatment for anaphylaxis. It quickly reverses swelling, opens the airways, and supports blood pressure.', effect: -18 },
          { text: 'An antihistamine tablet to block the allergy itself', correct: false, feedback: 'Antihistamines help itching and hives but do not reverse airway swelling or low blood pressure. They are not first-line.', effect: 14 },
          { text: 'A steroid medicine given through the IV line first', correct: false, feedback: 'Steroids take hours to work and do not treat the immediate danger.', effect: 12 },
          { text: 'Her reliever inhaler from her bag for the wheezing', correct: false, feedback: 'An inhaler may help wheeze but does nothing for throat swelling or low blood pressure.', effect: 12 }
        ],
        results: {
          update: 'Within minutes of epinephrine her wheeze eases, her lips start to shrink, and blood pressure rises to 108/68. Oxygen and monitoring are in place.'
        }
      },
      {
        title: 'Supporting care',
        findings: 'She feels better but is still a little lightheaded when she sits up. Hives remain on her chest.',
        question: 'What is the most helpful next measure?',
        timeCost: 10,
        options: [
          { text: 'Lie her flat with legs raised and give IV fluids', correct: true, feedback: 'Anaphylaxis makes blood vessels leaky and wide. Lying flat with legs raised and IV fluids help keep blood flowing to vital organs.', effect: -10 },
          { text: 'Help her walk to the bathroom to freshen up', correct: false, feedback: 'Standing or walking during anaphylaxis can cause blood pressure to collapse.', effect: 14 },
          { text: 'Sit her bolt upright in a chair to aid breathing', correct: false, feedback: 'Sitting up may help breathing when blood pressure is normal, but she is still lightheaded, so lying with legs raised is safer.', effect: 8 },
          { text: 'Give her water and a snack to raise her energy', correct: false, feedback: 'Food or drink is not helpful while her throat may still be swollen, and it does not treat low blood pressure.', effect: 6 }
        ]
      },
      {
        title: 'Ready to go?',
        findings: 'Thirty minutes after epinephrine she feels well. Hives have faded and vital signs are normal. Her mom has arrived and asks if they can go home now.',
        question: 'What should you advise?',
        timeCost: 15,
        options: [
          { text: 'Stay for several hours to watch for a second wave', correct: true, feedback: 'Symptoms can come back hours later without new exposure (a biphasic reaction). Observation lets the team treat it quickly if it happens.', effect: -10 },
          { text: 'Go home now since all of her symptoms have resolved', correct: false, feedback: 'Feeling better soon after epinephrine is expected, but the reaction can return once the medicine wears off.', effect: 14 },
          { text: 'Go home now and take an antihistamine if hives return', correct: false, feedback: 'Antihistamines would not handle a serious second wave, and she has no auto-injector yet.', effect: 14 },
          { text: 'Go home now and see her family doctor tomorrow morning', correct: false, feedback: 'Follow-up is good, but discharge right after severe anaphylaxis skips the observation period.', effect: 12 }
        ]
      },
      {
        title: 'Second wave',
        findings: 'About an hour later the hives return and she is wheezing again. Her blood pressure has dipped to 96/60. She did not eat anything new.',
        question: 'What do you do?',
        timeCost: 10,
        options: [
          { text: 'Treat as returning anaphylaxis with repeat epinephrine', correct: true, feedback: 'This is a biphasic reaction. It is treated the same way as the first: epinephrine first, as directed, plus supportive care.', effect: -14 },
          { text: 'Give an antihistamine only since this is a milder wave', correct: false, feedback: 'Wheeze and falling blood pressure mean this is anaphylaxis again, and epinephrine is still the main treatment.', effect: 14 },
          { text: 'Assume she secretly ate peanuts again and just observe', correct: false, feedback: 'Second-wave reactions happen without new exposure. Blaming the patient delays treatment.', effect: 14 },
          { text: 'Give her inhaler and plan discharge once wheeze settles', correct: false, feedback: 'The inhaler does not treat low blood pressure, and returning anaphylaxis needs longer observation, not discharge.', effect: 12 }
        ],
        results: {
          update: 'Symptoms settle again after repeat epinephrine. The team extends her observation and she stays well for the rest of her stay.'
        }
      },
      {
        title: 'Before she leaves',
        findings: 'She has been symptom-free for many hours. She and her mom ask what they should do differently from now on.',
        question: 'What is the most important teaching point?',
        timeCost: 15,
        options: [
          { text: 'Carry two auto-injectors and learn when and how to use them', correct: true, feedback: 'People with anaphylaxis should carry epinephrine auto-injectors, know the warning signs, use it early, and call emergency services. An allergy specialist referral and a written action plan help too.', effect: -10 },
          { text: 'Take an antihistamine every day to prevent future reactions', correct: false, feedback: 'Daily antihistamines do not prevent anaphylaxis. Avoiding the trigger and carrying epinephrine are key.', effect: 8 },
          { text: 'Try eating tiny amounts of peanut at home to build tolerance', correct: false, feedback: 'Desensitization is only done under specialist supervision. Trying it at home is dangerous.', effect: 12 },
          { text: 'Use her reliever inhaler first if she reacts to food again', correct: false, feedback: 'The inhaler is not a treatment for anaphylaxis. Epinephrine should come first.', effect: 10 }
        ]
      }
    ],
    disposition: { type: 'home', label: 'Discharged after extended observation with auto-injectors, action plan, and allergy referral', maxSeverity: 25 },
    teaching: 'Anaphylaxis is a whole-body allergic emergency, and epinephrine is the first-line treatment; antihistamines and steroids are only add-ons. Symptoms can return hours later (a biphasic reaction), so patients are observed before going home. Everyone with anaphylaxis should carry epinephrine auto-injectors and know how to use them.'
  }

);
