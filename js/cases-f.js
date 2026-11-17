// ER Simulator — case pack F (burns, compartment syndrome, febrile seizure, heat stroke,
// carbon monoxide, button battery)
// Fictional, educational cases. No doses or procedure instructions by design.
window.CASE_LIBRARY = window.CASE_LIBRARY || [];
window.CASE_LIBRARY.push(

  // ───────────────────────────────────────────── 1. Kitchen fire burns with smoke inhalation
  {
    id: 'f-burns-kitchen-fire',
    title: 'Burns from a kitchen fire',
    specialty: 'Trauma',
    difficulty: 'Advanced',
    age: 41, sex: 'M',
    chiefComplaint: 'Burns to the chest and right arm after a cooking-oil fire',
    suspected: 'Major burns, possible smoke inhalation',
    finalDiagnosis: 'Partial-thickness burns of about 27% body surface area with smoke inhalation injury to the upper airway',
    presentation: 'A 41-year-old man was cooking when a pan of oil caught fire. His shirt caught alight and he spent a few minutes in the smoky kitchen trying to put the fire out before neighbors helped him outside. Paramedics cooled the burns with running water at the scene and brought him in on oxygen. He is in a lot of pain but awake and talking.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Lives alone in an apartment. Does not smoke. Works as an electrician.'
    },
    canDie: true,
    startSeverity: 48,
    drift: 1.6,
    recoveredDrift: -1,
    vitals: {
      stable:   { hr: 92,  sbp: 128, dbp: 78, rr: 18, spo2: 97, temp: 36.6 },
      critical: { hr: 142, sbp: 82,  dbp: 48, rr: 34, spo2: 84, temp: 35.4 }
    },
    initialLabs: [
      { name: 'Hemoglobin', value: '15.8 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'Carboxyhemoglobin (carbon monoxide level)', value: '6%', flag: 'H', ref: 'Under 3% in non-smokers' },
      { name: 'Lactate', value: '2.4 mmol/L', flag: 'H', ref: '0.5–2.0' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 45, text: 'Nurse: his voice sounds more hoarse than when he arrived, and he keeps clearing his throat.', effect: 8 }
    ],
    rescue: {
      title: 'Noisy breathing',
      findings: 'He now makes a high-pitched noise with every breath in (stridor). He can barely speak, is drooling, and his oxygen saturation is falling despite the mask.',
      question: 'His upper airway is swelling shut. What is the immediate priority?',
      timeCost: 10,
      options: [
        { text: 'Call the expert airway team now to secure his airway with a breathing tube', correct: true, feedback: 'Stridor after smoke inhalation means the airway is closing. Securing it with a breathing tube, placed by experts with backup ready, is lifesaving and gets harder every minute.', effect: -22 },
        { text: 'Give a nebulized bronchodilator and recheck his breathing again in twenty minutes', correct: false, feedback: 'Bronchodilators open small airways in the lungs; they cannot stop heat swelling in the throat. Waiting twenty minutes may make the airway impossible to secure.', effect: 20 },
        { text: 'Sit him fully upright, increase the oxygen and send him for a CT scan of the neck', correct: false, feedback: 'Sending a patient with a closing airway to the scanner is dangerous. The airway must be secured first.', effect: 22 },
        { text: 'Speed up the IV fluids, since low blood volume is the main reason he is struggling', correct: false, feedback: 'Fluids matter in burns, but they do not fix a swelling airway, and extra fluid can even add to the swelling.', effect: 16 }
      ],
      results: { update: 'The anesthesia team secured his airway with a breathing tube. Oxygen saturation recovered to 97% on the ventilator.' }
    },
    decisions: [
      {
        title: 'Arrival — burns and smoke',
        findings: 'He is sitting up on the stretcher, in pain. His shirt has been partly removed; some burned fabric and a metal watch are still on his right arm. Heart rate 104, BP 132/80, oxygen saturation 96% on a face mask.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Run the ABC primary survey, remove the watch and burned clothing, and keep him on high-flow oxygen', correct: true, feedback: 'Burn patients are trauma patients: the ABCs come first. Jewelry and burned clothing must come off early because swelling can make a watch or ring act like a tight band.', effect: -10 },
          { text: 'Cover him in towels soaked in ice water and keep them in place until his pain is under control', correct: false, feedback: 'Ice and long periods of cold soaking can deepen the injury and make him dangerously cold (hypothermia). Burns are cooled with cool running water for a limited time, then covered.', effect: 12 },
          { text: 'Apply a thick layer of burn cream to every red area before anything else, to protect the damaged skin', correct: false, feedback: 'Creams can wait. They also make it harder for the burn team to judge depth later. Airway and breathing come first.', effect: 8 },
          { text: 'Send him straight to the CT scanner to check for injuries from the smoke before you do any assessment', correct: false, feedback: 'A CT does not replace a hands-on primary survey, and a burn patient can deteriorate quickly away from the resuscitation room.', effect: 12 }
        ],
        results: {
          update: 'Watch and burned clothing removed. Two IV lines placed. He remains on high-flow oxygen and is given IV pain relief by the team.'
        }
      },
      {
        title: 'A change in his voice',
        findings: 'Up close you notice black soot around his nostrils and inside his mouth, and the hairs in his nose look singed. He says his throat feels scratchy, and his voice has become hoarse. Oxygen saturation is still 96% and he is talking in full sentences.',
        question: 'His oxygen level is normal. What do these findings mean for his care?',
        timeCost: 15,
        options: [
          { text: 'Hot smoke may have injured his upper airway; call senior airway experts early to plan protecting it', correct: true, feedback: 'Hoarseness, soot and singed nasal hair are warning signs of inhalation injury. The throat can swell over the next hours, so experts often secure the airway early while it is still easy to do.', effect: -14 },
          { text: 'A normal oxygen level shows the lungs are fine, so the hoarse voice can be rechecked in a few hours', correct: false, feedback: 'Oxygen saturation stays normal until late in airway swelling. Waiting until he cannot breathe makes the airway much harder to secure.', effect: 18 },
          { text: 'His hoarseness is from shouting during the fire, so warm drinks and throat lozenges should settle it', correct: false, feedback: 'After a fire in an enclosed space, hoarseness must be treated as a possible airway burn until proven otherwise.', effect: 16 },
          { text: 'Give a steroid inhaler and an antibiotic, which together reliably prevent airway swelling after smoke', correct: false, feedback: 'Neither treatment reliably prevents heat swelling of the airway. The key step is early expert airway assessment.', effect: 12 }
        ],
        results: {
          update: 'The anesthesia team looked at his upper airway with a thin camera and saw early swelling. They placed a breathing tube in a calm, controlled way before it worsened.',
          labs: [ { name: 'Carboxyhemoglobin', value: '4%', flag: 'H', ref: 'Under 3%' } ]
        }
      },
      {
        title: 'How big is the burn?',
        findings: 'The burns on the whole front of his chest and abdomen, and around his entire right arm, are blistered and moist (partial thickness). His face and the back of his neck are only red, like a sunburn, with no blisters (superficial).',
        question: 'Using the "rule of nines", what is the best estimate of the burn size used for planning?',
        timeCost: 10,
        options: [
          { text: 'About 27 percent: front of trunk (18) plus whole right arm (9), leaving out red-only skin', correct: true, feedback: 'In an adult the rule of nines gives the front of the trunk 18% and each arm 9%. Red-only (superficial) skin is not included when planning fluids.', effect: -10 },
          { text: 'About 9 percent: the right arm only, since the chest burns can be added up later on the burn ward', correct: false, feedback: 'Leaving out the chest badly underestimates the burn. Under-estimating leads to too little fluid and poor kidney blood flow.', effect: 10 },
          { text: 'About 45 percent: the trunk and arm plus the red face and neck, since all burned skin should count', correct: false, feedback: 'Superficial (red, unblistered) burns are not counted, and adding them over-estimates the size, which can lead to giving too much fluid.', effect: 8 },
          { text: 'About 5 percent: the area of his palm multiplied by the number of separate blistered patches', correct: false, feedback: 'The palm method (about 1% per palm) is for small, scattered burns. For large connected areas the rule of nines is more accurate.', effect: 8 }
        ]
      },
      {
        title: 'Fluids and temperature',
        findings: 'Burn size is estimated at 27%. His blood pressure is 118/74 and heart rate 112. A urinary catheter has been placed. His skin temperature is dropping and his core temperature is 35.8 °C.',
        question: 'What is the plan for fluids and temperature?',
        timeCost: 20,
        options: [
          { text: 'Start IV fluids using a burn formula, adjust by hourly urine output, and keep him warm and covered', correct: true, feedback: 'Large burns leak fluid from the blood into the tissues for many hours. Fluids are started from a formula and then guided by urine output. Burned skin loses heat, so keeping him warm matters too.', effect: -12 },
          { text: 'Hold IV fluids for now, since his blood pressure is normal, and keep cooling the burns with wet towels', correct: false, feedback: 'Blood pressure falls late in burn shock. Fluids should start early, and continued cooling of a large burn causes hypothermia.', effect: 16 },
          { text: 'Give as much fluid as quickly as possible until his heart rate is under 80, then stop the fluids', correct: false, feedback: 'Too much fluid causes its own harm in burns, including swelling of the lungs and limbs. Fluids are titrated to urine output, not run as fast as possible.', effect: 10 },
          { text: 'Give a water tablet (diuretic) to boost his urine output, and offer him only drinks by mouth for now', correct: false, feedback: 'Diuretics push out fluid he needs and make urine output a false guide. A large burn needs IV fluids.', effect: 14 }
        ],
        results: {
          update: 'IV fluids running and adjusted hourly to his urine output. Warming blanket applied; core temperature rising to 36.6 °C.',
          labs: [ { name: 'Lactate', value: '1.6 mmol/L', flag: '', ref: '0.5–2.0' }, { name: 'Creatinine (kidney)', value: '0.9 mg/dL', flag: '', ref: '0.7–1.2' } ]
        }
      },
      {
        title: 'Where should he go?',
        findings: 'He is now stable on the ventilator with steady urine output. The burns cover 27% of his body, including a burn all the way around his right arm, and he has an inhalation injury.',
        question: 'What is the right next step for his ongoing care?',
        timeCost: 30,
        options: [
          { text: 'Admit him to the general surgical ward here for daily dressings and review by the burn team in a week', correct: false, feedback: 'A ventilated patient with a large burn and inhalation injury needs specialist intensive burn care, not a general ward.', effect: 14 },
          { text: 'Arrange transfer to a regional burn center, with the burn team advising on care during the transfer', correct: true, feedback: 'Large burns, inhalation injury and burns that go all the way around a limb all meet criteria for a burn center, where specialist surgery, dressings and intensive care are available.', effect: -12 },
          { text: 'Keep him in the emergency department until the blisters have dried, then decide where he should go', correct: false, feedback: 'Burn care takes weeks. Delaying transfer delays specialist treatment such as surgery and skin grafting.', effect: 10 },
          { text: 'Extubate him now that he is stable, and send him to a step-down unit to save the intensive care bed', correct: false, feedback: 'Airway swelling after smoke often peaks over the first one to two days. Removing the tube too early could be dangerous.', effect: 16 }
        ]
      }
    ],
    disposition: { type: 'transfer', label: 'Transferred by critical care team to a regional burn center', maxSeverity: 40 },
    teaching: 'Treat a major burn as trauma: ABCs first, and watch closely for airway injury after smoke in an enclosed space (hoarseness, soot, singed nasal hair) because swelling can close the airway hours later. The rule of nines estimates burn size (red-only skin is not counted) to plan IV fluids, which are then guided by urine output. Keep the patient warm and transfer large burns, inhalation injuries and circumferential burns to a burn center.'
  },

  // ───────────────────────────────────────────── 2. Compartment syndrome after tibial fracture
  {
    id: 'f-compartment-syndrome',
    title: 'Leg pain that keeps getting worse',
    specialty: 'Orthopedics',
    difficulty: 'Advanced',
    age: 24, sex: 'M',
    chiefComplaint: 'Lower-leg injury after a motorbike fall, with worsening pain',
    suspected: 'Fracture of the lower leg (tibia)',
    finalDiagnosis: 'Acute compartment syndrome of the lower leg after a closed tibial shaft fracture',
    presentation: 'A 24-year-old man came off his motorbike at low speed and his right leg was trapped under it. He could not stand afterward. His lower leg is swollen and bent slightly out of line. He has no other injuries and was wearing a helmet. Paramedics gave him pain relief and splinted the leg.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Works as a delivery rider. Does not smoke. Lives with a housemate.'
    },
    canDie: false,
    maxSeverity: 65,
    startSeverity: 30,
    drift: 0.9,
    recoveredDrift: -1,
    vitals: {
      stable:   { hr: 84,  sbp: 126, dbp: 78, rr: 16, spo2: 99, temp: 36.8 },
      critical: { hr: 128, sbp: 144, dbp: 90, rr: 24, spo2: 98, temp: 37.4 }
    },
    initialLabs: [
      { name: 'Hemoglobin', value: '14.6 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'Creatine kinase (muscle enzyme)', value: '420 U/L', flag: 'H', ref: '40–300' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 60, text: 'Nurse: he is asking for more pain relief again — he says it is the worst pain he has ever had.', effect: 6 }
    ],
    decisions: [
      {
        title: 'First assessment',
        findings: 'The right shin is swollen and bruised, with an obvious bend. The skin is intact (no wound). He can wiggle his toes, and the foot is warm. Heart rate 98, BP 132/80.',
        question: 'What is the most important part of your first assessment of the leg?',
        timeCost: 10,
        options: [
          { text: 'Check pulses, color, feeling and movement in the foot before and after splinting', correct: true, feedback: 'A "neurovascular check" shows whether nerves and blood flow below the injury are working. Doing it before and after splinting catches problems caused by the injury or the splint.', effect: -8 },
          { text: 'Ask him to try standing on the leg so you can see how much weight it can safely take', correct: false, feedback: 'With an obviously deformed leg, putting weight on it could cause more damage and a lot of pain.', effect: 10 },
          { text: 'Straighten the bend fully yourself and then send him for an X-ray without a splint', correct: false, feedback: 'Realignment is done carefully with pain relief and a splint, by the team. An unsplinted fracture moves and hurts.', effect: 8 },
          { text: 'Wait until the X-ray is back before touching or examining the injured leg any further', correct: false, feedback: 'The X-ray shows the bone, but only an exam tells you about nerves and blood flow — and that cannot wait.', effect: 6 }
        ],
        results: {
          update: 'Foot pulses present and equal. Normal feeling in the foot. Leg gently realigned and splinted by the team; pulses still present afterward.',
          imaging: [ { name: 'X-ray right tibia and fibula', result: 'Displaced fracture through the middle of the tibia (shin bone) and a fracture of the fibula. No break in the skin.' } ]
        }
      },
      {
        title: 'Planning while he waits for surgery',
        findings: 'Orthopedics plans to fix the fracture tomorrow morning. He will stay in the emergency department observation area overnight with the leg in a back-slab splint.',
        question: 'What should the nursing team watch for most closely overnight?',
        timeCost: 15,
        options: [
          { text: 'Mainly his temperature, since a fever overnight would point toward an early bone infection', correct: false, feedback: 'Infection is a concern with open fractures, but this one is closed. The bigger early risk is pressure building in the muscles.', effect: 6 },
          { text: 'Pain level, pain on moving the toes, and how tight the calf feels, with frequent foot checks', correct: true, feedback: 'After a tibial fracture, bleeding and swelling can raise the pressure inside the muscle compartments. Rising pain, pain when the toes are moved and a tight calf are the earliest warning signs.', effect: -10 },
          { text: 'Only whether the foot pulse is present, because losing the pulse is the first sign of trouble', correct: false, feedback: 'A pulse is usually still present when pressure in the muscles is already dangerous. Losing it is a late sign.', effect: 10 },
          { text: 'How much he eats and drinks, so that he is well hydrated before the operation in the morning', correct: false, feedback: 'He should usually not eat before surgery, and hydration is not the main danger here.', effect: 6 }
        ]
      },
      {
        title: 'Pain that does not fit',
        findings: 'Four hours later he is in severe pain despite strong IV pain relief. The calf feels tense and hard, like a firm balloon. When you gently lift his toes upward, he cries out in pain. He has tingling between his first two toes. The foot pulse is still easy to feel and the foot is pink.',
        question: 'The foot pulse is normal. How do you interpret these findings?',
        timeCost: 10,
        options: [
          { text: 'Fracture pain is often severe, so higher doses of pain relief and more time are all that is needed', correct: false, feedback: 'Pain "out of proportion" to the injury and not responding to strong pain relief is a red flag, not just a bad fracture.', effect: 14 },
          { text: 'A good pulse means blood flow is fine, so compartment syndrome is ruled out for now', correct: false, feedback: 'Compartment syndrome squeezes the small vessels and nerves in the muscle first. The big artery often keeps pulsing until very late.', effect: 16 },
          { text: 'This is likely compartment syndrome, even with a normal pulse, and is a surgical emergency', correct: true, feedback: 'Pain out of proportion, pain on stretching the toes, a tense calf and tingling are classic early signs. A normal pulse does NOT rule it out.', effect: -14 },
          { text: 'The tingling suggests he hurt a nerve in the original fall, which will slowly improve on its own', correct: false, feedback: 'New tingling that appears hours after the injury suggests rising pressure on the nerve, not the original fall.', effect: 10 }
        ],
        results: {
          labs: [ { name: 'Creatine kinase (muscle enzyme)', value: '2,850 U/L', flag: 'H', ref: '40–300' } ]
        }
      },
      {
        title: 'Immediate steps',
        findings: 'You suspect compartment syndrome. The splint is wrapped with a firm bandage, and the leg is raised high on three pillows.',
        question: 'What should you do right now while help is coming?',
        timeCost: 10,
        options: [
          { text: 'Loosen the bandage and padding, keep the leg level with the heart, and call orthopedics now', correct: true, feedback: 'Anything tight around the leg should be loosened. Raising the leg high lowers blood flow into an already squeezed compartment, so it is kept about level with the heart. The surgeon must come urgently.', effect: -12 },
          { text: 'Raise the leg even higher and place ice packs around the calf to reduce the swelling more quickly', correct: false, feedback: 'In compartment syndrome, high elevation and ice reduce blood flow into the muscles, which can make the damage worse.', effect: 12 },
          { text: 'Add a tighter elastic bandage over the calf so that the pressure pushes the swelling back out', correct: false, feedback: 'External pressure adds to the pressure inside the compartment. Anything tight must be removed, not added.', effect: 16 },
          { text: 'Give more pain relief, recheck the leg in two hours, and inform orthopedics at the morning meeting', correct: false, feedback: 'Muscle and nerve begin to suffer permanent damage within hours. This cannot wait until morning.', effect: 14 }
        ]
      },
      {
        title: 'The surgeon arrives',
        findings: 'Loosening the bandage helped only slightly. The orthopedic surgeon examines him and measures the pressure in the leg compartments, which is high. His creatine kinase continues to rise.',
        question: 'What happens next?',
        timeCost: 30,
        options: [
          { text: 'Admit him to the orthopedic ward with the leg level and repeat the pressure check every few hours', correct: false, feedback: 'Once compartment syndrome is confirmed, watching does not lower the pressure. Muscle damage continues during the wait.', effect: 12 },
          { text: 'Start a water tablet (diuretic) to draw fluid out of the leg and recheck the pressure in an hour', correct: false, feedback: 'Medicines do not reliably reduce compartment pressure. The definitive treatment is surgical.', effect: 10 },
          { text: 'Go to the operating room urgently for surgery to release the pressure and fix the fracture', correct: true, feedback: 'Compartment syndrome is treated with emergency surgery (fasciotomy) by the orthopedic team to release the pressure and restore blood flow to the muscle and nerves.', effect: -16 },
          { text: 'Keep him in the emergency department and plan surgery for tomorrow morning as originally arranged', correct: false, feedback: 'The original plan no longer fits. Delaying release of the pressure risks permanent muscle and nerve damage.', effect: 14 }
        ],
        results: {
          update: 'Emergency surgery released the pressure in the leg compartments and the fracture was fixed. Muscle looked healthy. Feeling between the toes is returning.',
          labs: [ { name: 'Creatinine (kidney)', value: '0.9 mg/dL', flag: '', ref: '0.7–1.2' } ]
        }
      }
    ],
    disposition: { type: 'or', label: 'Emergency surgery to release compartment pressure, then orthopedic ward', maxSeverity: 25 },
    teaching: 'Compartment syndrome happens when swelling inside a closed muscle compartment squeezes the blood vessels and nerves. The early signs are pain out of proportion to the injury and pain when the muscles are stretched (for example, lifting the toes) — a normal foot pulse does NOT rule it out. Loosen anything tight, keep the limb at heart level, and get an orthopedic surgeon urgently, because the treatment is emergency surgery.'
  },

  // ───────────────────────────────────────────── 3. Febrile seizure in a toddler
  {
    id: 'f-febrile-seizure',
    title: 'Toddler who had a seizure with a fever',
    specialty: 'Pediatrics',
    difficulty: 'Beginner',
    age: 1.5, sex: 'F',
    chiefComplaint: 'Shaking episode at home with a high temperature',
    suspected: 'Seizure with fever',
    finalDiagnosis: 'Simple febrile seizure caused by a middle-ear infection (acute otitis media)',
    presentation: 'An 18-month-old girl had a cold for two days and felt hot this evening. Her parents saw her go stiff and then have jerking of both arms and legs for about two minutes. It stopped on its own before the ambulance arrived. She was sleepy afterward but is starting to wake up and cry. Her parents are very frightened.',
    history: {
      pmh: ['Born at full term, healthy', 'Vaccinations up to date'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Lives with parents and a 4-year-old brother. Attends daycare. Her father had seizures with fevers as a toddler.'
    },
    canDie: false,
    maxSeverity: 40,
    startSeverity: 26,
    drift: 0.4,
    recoveredDrift: -2,
    vitals: {
      stable:   { hr: 118, sbp: 94,  dbp: 58, rr: 26, spo2: 99, temp: 37.4 },
      critical: { hr: 168, sbp: 88,  dbp: 52, rr: 40, spo2: 94, temp: 39.8 }
    },
    initialLabs: [],
    initialImaging: [],
    decisions: [
      {
        title: 'Arrival',
        findings: 'She is drowsy in her mother\'s arms but opens her eyes and cries when examined. Her breathing is regular. Temperature 39.4 °C, heart rate 152, oxygen saturation 97%.',
        question: 'The seizure has stopped. What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Check her airway, breathing and circulation, and test her blood sugar at the bedside', correct: true, feedback: 'After any seizure, start with the ABCs. A quick finger-prick sugar test matters because low blood sugar can cause seizures and is easy to treat.', effect: -8 },
          { text: 'Order an urgent brain scan before anything else to look for bleeding or a tumor in the brain', correct: false, feedback: 'A scan is not the first step in a child who is breathing well and waking up. ABCs and a sugar check come first.', effect: 8 },
          { text: 'Put her in a cool bath right away to bring her temperature down as quickly as possible', correct: false, feedback: 'Cold baths are uncomfortable and can make children shiver, which raises temperature. They also distract from the ABCs.', effect: 6 },
          { text: 'Give her a drink of juice straight away in case she is dehydrated after the long seizure', correct: false, feedback: 'A drowsy child after a seizure may not swallow safely. Check airway and sugar before giving anything by mouth.', effect: 6 }
        ],
        results: {
          labs: [ { name: 'Bedside blood glucose', value: '96 mg/dL', flag: '', ref: '70–140' } ]
        }
      },
      {
        title: 'Looking for the fever source',
        findings: 'Her blood sugar is normal. She is now more awake, moving all four limbs equally and reaching for her mother. She has a runny nose and keeps pulling at her right ear.',
        question: 'What is the best next step to find out why she has a fever?',
        timeCost: 10,
        options: [
          { text: 'Do a full head-to-toe exam, including looking in her ears and throat and checking the skin', correct: true, feedback: 'A careful exam finds the source of most toddler fevers. Ear pulling plus a cold is a clue, but you still check everything, including the skin for a rash.', effect: -8 },
          { text: 'Assume it is a simple cold virus and skip the exam since the fever is already explained', correct: false, feedback: 'Never assume. A full exam can find a treatable infection or warning signs of something more serious.', effect: 8 },
          { text: 'Order every blood test and a chest X-ray first, and then examine her once those are back', correct: false, feedback: 'Tests can help, but the exam comes first and often makes many tests unnecessary for a toddler.', effect: 6 },
          { text: 'Start antibiotics through a drip right away, before examining her, just in case it is serious', correct: false, feedback: 'Antibiotics are chosen once you know what infection you are treating. A well-looking child can be examined first.', effect: 6 }
        ],
        results: {
          update: 'Right eardrum is red and bulging. Throat mildly red. No rash. Neck moves freely. Chest clear.'
        }
      },
      {
        title: 'Does she need more tests?',
        findings: 'She is now fully awake, playful and back to her normal self, according to her parents. The seizure was a single, whole-body seizure lasting two minutes. She has an ear infection and no stiff neck or rash.',
        question: 'What testing does she need now?',
        timeCost: 15,
        options: [
          { text: 'A CT scan of the brain, because every child who has a first seizure needs one', correct: false, feedback: 'Brain scans are not needed for a simple febrile seizure in a child who is back to normal. They add radiation without benefit.', effect: 6 },
          { text: 'A spinal tap (lumbar puncture) to rule out meningitis in every child with a fever', correct: false, feedback: 'A spinal tap is considered when there are signs of meningitis, like a stiff neck or a very unwell child. She has a clear source and is well.', effect: 6 },
          { text: 'No brain scan or spinal tap; treat the ear infection and keep her comfortable', correct: true, feedback: 'This is a simple febrile seizure: short, whole-body, one episode, child back to normal, with a clear fever source. No routine brain tests are needed.', effect: -10 },
          { text: 'An EEG brain-wave test tonight, and keep her in hospital until it can be done', correct: false, feedback: 'EEGs are not needed after a simple febrile seizure and would not change her treatment.', effect: 5 }
        ],
        results: {
          update: 'Antibiotic for the ear infection and a fever medicine for comfort given as directed by the team. Temperature 37.9 °C; she is drinking and smiling.'
        }
      },
      {
        title: 'Talking with the family',
        findings: 'Her parents are relieved but worried. They ask whether she has epilepsy, whether it will happen again, and what to do if it does.',
        question: 'What is the most helpful advice to give them?',
        timeCost: 15,
        options: [
          { text: 'Give fever medicine around the clock every day from now on to stop any future seizures from happening', correct: false, feedback: 'Fever medicines help comfort but do not prevent febrile seizures. Giving them non-stop is unnecessary.', effect: 6 },
          { text: 'Lay her on her side, nothing in her mouth, time it, and call for help if it lasts over 5 minutes', correct: true, feedback: 'Febrile seizures are common, usually harmless and do not mean epilepsy. Parents should know safe first aid: on her side, nothing in the mouth, time it, and get help for a long seizure.', effect: -10 },
          { text: 'Put something firm between her teeth during any seizure so that she cannot bite down on her tongue', correct: false, feedback: 'Never put anything in the mouth during a seizure. It can break teeth or block the airway.', effect: 8 },
          { text: 'This means she has epilepsy and will need to take a daily seizure medicine for the rest of her life', correct: false, feedback: 'Simple febrile seizures are not epilepsy. Most children outgrow them by about age five.', effect: 8 }
        ]
      }
    ],
    disposition: { type: 'home', label: 'Discharged home with parents, ear infection treatment and seizure safety advice', maxSeverity: 20 },
    teaching: 'Febrile seizures are common in children aged about 6 months to 5 years and usually happen early in a fever. After checking ABCs and blood sugar, find the fever source with a full exam. A simple febrile seizure (short, whole-body, single, child back to normal) does not need brain scans, and good family education — on her side, nothing in the mouth, time it — is a key part of care.'
  },

  // ───────────────────────────────────────────── 4. Exertional heat stroke
  {
    id: 'f-heat-stroke',
    title: 'Confused after football practice',
    specialty: 'Emergency Medicine',
    difficulty: 'Advanced',
    age: 16, sex: 'M',
    chiefComplaint: 'Collapsed and confused during football practice on a very hot day',
    suspected: 'Heat illness',
    finalDiagnosis: 'Exertional heat stroke complicated by muscle breakdown (rhabdomyolysis), acute kidney injury and high potassium',
    presentation: 'A 16-year-old was at a two-hour preseason football practice in full gear on a hot, humid afternoon. Near the end he stumbled, became confused and collapsed. His coach says he was talking nonsense and did not know where he was. The athletic trainer measured a very high temperature, started pouring cold water over him, and called an ambulance.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'High school linebacker. First week of summer practice. Had little to drink during practice.'
    },
    canDie: true,
    startSeverity: 62,
    drift: 2.2,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 88,  sbp: 122, dbp: 72, rr: 16, spo2: 99, temp: 37.4 },
      critical: { hr: 168, sbp: 78,  dbp: 42, rr: 36, spo2: 90, temp: 42.0 }
    },
    initialLabs: [
      { name: 'Bedside blood glucose', value: '102 mg/dL', flag: '', ref: '70–140' },
      { name: 'Sodium', value: '141 mmol/L', flag: '', ref: '135–145' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 30, text: 'Nurse: he is getting more agitated and his temperature is still above 40.', effect: 8 }
    ],
    rescue: {
      title: 'Seizure in the resuscitation bay',
      findings: 'He suddenly stiffens and has a generalized seizure. His temperature is still very high and his oxygen saturation is falling.',
      question: 'What is the immediate priority?',
      timeCost: 10,
      options: [
        { text: 'Protect airway and breathing, give seizure medicine per the team, and keep cooling hard', correct: true, feedback: 'The brain is being harmed by the heat. Support ABCs, stop the seizure with medicine chosen by the team, and keep cooling — cooling is still the treatment for the cause.', effect: -22 },
        { text: 'Stop the cooling so you can move him to the CT scanner to look for bleeding inside the brain', correct: false, feedback: 'Stopping cooling lets the temperature climb further. Treat the seizure and keep cooling; scans come later if still needed.', effect: 22 },
        { text: 'Hold him down firmly on the stretcher and place a tongue depressor between his teeth', correct: false, feedback: 'Restraining a seizing patient or putting objects in the mouth causes injury and can block the airway.', effect: 18 },
        { text: 'Give a fever-reducing medicine by mouth and wait for it to bring the temperature down', correct: false, feedback: 'Fever medicines do not work in heat stroke, and nothing should go by mouth during a seizure.', effect: 20 }
      ],
      results: { update: 'Seizure stopped. Airway protected. Cooling continued; temperature now falling steadily.' }
    },
    decisions: [
      {
        title: 'Arrival — hot and confused',
        findings: 'He is restless and confused, mumbling and not answering questions properly. His skin is hot and flushed. Core (rectal) temperature 41.3 °C, heart rate 146, BP 104/58.',
        question: 'What is your top priority?',
        timeCost: 10,
        options: [
          { text: 'Start rapid whole-body cooling now, such as cold-water immersion, while you manage the ABCs', correct: true, feedback: 'Heat stroke is a race against time: the longer the body stays very hot, the more the brain, kidneys and muscles are damaged. Cool first, as fast as possible, while supporting ABCs.', effect: -14 },
          { text: 'Give a fever-reducing medicine through the drip and recheck his temperature again in an hour', correct: false, feedback: 'Heat stroke is not a fever — the body\'s thermostat is not raised, it is overwhelmed. Fever medicines do not help and waiting allows more damage.', effect: 18 },
          { text: 'Send him for a CT scan of the head first, because confusion means he probably has a head injury', correct: false, feedback: 'Confusion with a very high temperature after exercise in the heat is heat stroke until proven otherwise. Cooling must not be delayed.', effect: 16 },
          { text: 'Undress him and use a gentle fan in a cool room, so that he cools down slowly and comfortably', correct: false, feedback: 'Gentle fanning alone is too slow. The aim is to bring the temperature down as quickly as possible.', effect: 10 }
        ],
        results: {
          update: 'He is cooled in an ice-water tub with his head supported. Core temperature is falling about 0.2 °C every minute.'
        }
      },
      {
        title: 'Watching the temperature',
        findings: 'After 10 minutes of cold-water immersion his core temperature is 39.4 °C. He is less agitated and starting to answer simple questions.',
        question: 'How should you manage the rest of the cooling?',
        timeCost: 10,
        options: [
          { text: 'Keep him in the ice water for another hour to be certain that he is fully cooled', correct: false, feedback: 'Cooling for too long can overshoot into dangerously low temperature (hypothermia).', effect: 10 },
          { text: 'Stop cooling at about 39 °C with continuous core checks, so he does not overshoot', correct: true, feedback: 'Aggressive cooling is stopped at around 38.5–39 °C, and core temperature is monitored continuously because the body keeps cooling for a while afterward.', effect: -10 },
          { text: 'Rely on the forehead thermometer to decide when to stop, as it gives quick readings', correct: false, feedback: 'Skin and forehead thermometers are inaccurate during cooling. Core temperature is needed.', effect: 8 },
          { text: 'Stop cooling now since he is talking, and let him warm up under several blankets', correct: false, feedback: 'He is still too hot. Stopping early and covering him with blankets could let his temperature rise again.', effect: 12 }
        ],
        results: {
          update: 'Cooling stopped at 38.9 °C. He is calmer and knows his name, but is tired. A urinary catheter shows small amounts of dark, cola-colored urine.',
          labs: [
            { name: 'Creatine kinase (muscle enzyme)', value: '24,000 U/L', flag: 'C', ref: '40–300' },
            { name: 'Creatinine (kidney)', value: '2.3 mg/dL', flag: 'H', ref: '0.6–1.2' },
            { name: 'Potassium', value: '5.4 mmol/L', flag: 'H', ref: '3.5–5.0' },
            { name: 'ALT (liver enzyme)', value: '210 U/L', flag: 'H', ref: '7–40' }
          ]
        }
      },
      {
        title: 'Unexpected blood tests',
        findings: 'He looks much better now that he is cooler. However, his blood tests show a very high muscle enzyme, a raised kidney level and a rising potassium. His urine is dark brown.',
        question: 'He looks better. How do you interpret these results?',
        timeCost: 15,
        options: [
          { text: 'Muscle breakdown is releasing proteins that harm the kidneys; he needs IV fluids and urine checks', correct: true, feedback: 'Heat and heavy exercise can break down muscle (rhabdomyolysis). The muscle proteins can clog the kidneys, and potassium leaks out. IV fluids help flush the kidneys while urine output and blood tests are watched closely.', effect: -12 },
          { text: 'These are normal after hard exercise, so he can drink water by mouth and go home with his parents', correct: false, feedback: 'A muscle enzyme this high with dark urine and a rising kidney level is not normal. He could develop kidney failure.', effect: 16 },
          { text: 'The dark urine shows he is bleeding from the bladder, so he needs an urgent bladder camera test first', correct: false, feedback: 'Dark brown urine here is from muscle protein (myoglobin), not bleeding from the bladder.', effect: 10 },
          { text: 'Give a water tablet (diuretic) now to make more urine and avoid giving any more fluids into the drip', correct: false, feedback: 'He is already low on fluid. A diuretic without fluids can make the kidney injury worse.', effect: 12 }
        ],
        results: {
          update: 'IV fluids running; urine is slowly getting lighter. A repeat potassium is sent and an ECG recorded.',
          labs: [ { name: 'Potassium', value: '6.4 mmol/L', flag: 'C', ref: '3.5–5.0' } ],
          imaging: [ { name: '12-lead ECG', result: 'Tall, peaked T waves — a pattern seen with high potassium.' } ]
        }
      },
      {
        title: 'Rising potassium',
        findings: 'His potassium has risen to 6.4 and the ECG shows tall, peaked T waves. He is awake and says he feels fine apart from sore legs.',
        question: 'What should you do about the potassium?',
        timeCost: 15,
        options: [
          { text: 'Recheck the potassium tomorrow morning, because he feels well and says he has no chest pain', correct: false, feedback: 'How the patient feels is not a guide to potassium danger. ECG changes mean the heart is already affected.', effect: 16 },
          { text: 'Give him a banana and a sports drink to replace the salts he lost by sweating during practice', correct: false, feedback: 'Bananas and many sports drinks contain potassium, which would push his level even higher.', effect: 14 },
          { text: 'Treat urgently with medicines that protect the heart and lower potassium, on a monitor', correct: true, feedback: 'High potassium with ECG changes can trigger dangerous heart rhythms. The team gives medicines to steady the heart muscle and move potassium out of the blood, while the monitor watches the rhythm.', effect: -14 },
          { text: 'Stop all IV fluids so less potassium reaches his heart, and then repeat the ECG after a few hours', correct: false, feedback: 'Stopping fluids would harm his kidneys further and does not lower potassium.', effect: 12 }
        ],
        results: {
          update: 'Potassium-lowering treatment given by the team. ECG T waves returning toward normal.',
          labs: [ { name: 'Potassium', value: '5.3 mmol/L', flag: 'H', ref: '3.5–5.0' } ]
        }
      },
      {
        title: 'Next steps',
        findings: 'His temperature is normal and he is alert. His kidney level is still raised, the muscle enzyme is climbing, and he needs hourly urine and frequent blood tests. His coach asks if he can play in the game this weekend.',
        question: 'Where should he be cared for, and what about returning to sport?',
        timeCost: 20,
        options: [
          { text: 'Discharge him home tonight, since his temperature is normal, and let him play if he feels well', correct: false, feedback: 'His kidneys and potassium still need close watching. Returning to sport early after heat stroke risks another episode.', effect: 16 },
          { text: 'Admit to a general ward with checks twice a day, and let him return to full practice next week', correct: false, feedback: 'Twice-daily checks are not enough for rising potassium and kidney injury, and return to play after heat stroke must be gradual and doctor-guided.', effect: 10 },
          { text: 'Admit to intensive care for close monitoring, with a gradual, doctor-guided return to sport later', correct: true, feedback: 'Kidney injury, muscle breakdown and potassium shifts need close ICU monitoring. After heat stroke, athletes return to play slowly, with medical clearance and heat acclimatization.', effect: -10 },
          { text: 'Transfer him to a kidney unit for dialysis today, because his kidneys are certain to fail now', correct: false, feedback: 'Many patients recover with fluids and monitoring. Dialysis is only needed if specific problems develop.', effect: 8 }
        ]
      }
    ],
    disposition: { type: 'icu', label: 'Admitted to pediatric intensive care for kidney and potassium monitoring', maxSeverity: 40 },
    teaching: 'Heat stroke is a core temperature above about 40 °C with confusion or other brain changes. Rapid whole-body cooling (such as cold-water immersion) is the most important treatment — "cool first, transport second" — and fever medicines do not work. Look for complications on blood tests: muscle breakdown (very high creatine kinase, dark urine) can injure the kidneys and raise potassium, which can affect the heart.'
  },

  // ───────────────────────────────────────────── 5. Carbon monoxide poisoning (family)
  {
    id: 'f-carbon-monoxide',
    title: 'A whole family with headaches',
    specialty: 'Emergency Medicine',
    difficulty: 'Intermediate',
    age: 37, sex: 'F',
    chiefComplaint: 'Headache, nausea and dizziness; her husband and children feel the same',
    suspected: 'Headache and vomiting in several family members',
    finalDiagnosis: 'Carbon monoxide poisoning from a faulty fuel-burning heater, with a brief loss of consciousness',
    presentation: 'A 37-year-old woman arrives with her husband and two children on a cold winter morning. All of them woke with headaches and nausea. She felt dizzy, and her husband says she fainted briefly in the bathroom. They have been using an old fuel-burning space heater in the living room because the central heating broke. They thought they all had a stomach bug.',
    history: {
      pmh: ['Migraines'],
      meds: ['A migraine tablet when needed'],
      allergies: 'No known allergies',
      social: 'Lives with her husband and two children (aged 8 and 11) in a small house. Does not smoke. The family cat has also been very sleepy.'
    },
    canDie: true,
    startSeverity: 40,
    drift: 0.7,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 80,  sbp: 120, dbp: 74, rr: 16, spo2: 99, temp: 36.8 },
      critical: { hr: 134, sbp: 88,  dbp: 54, rr: 30, spo2: 99, temp: 36.9 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [
      { afterMinutes: 40, text: 'Nurse: the 8-year-old in the waiting room has just vomited and says his head hurts a lot.', effect: 4 }
    ],
    rescue: {
      title: 'Becoming drowsy',
      findings: 'She is becoming very drowsy and confused, and only opens her eyes to a loud voice. The pulse oximeter still reads 99%.',
      question: 'What is the immediate priority?',
      timeCost: 10,
      options: [
        { text: 'Support her airway and breathing with the resuscitation team and keep her on maximum oxygen', correct: true, feedback: 'Worsening consciousness in CO poisoning is an emergency. The oximeter is fooled by carbon monoxide; support ABCs and give maximum oxygen while the team considers further treatment.', effect: -22 },
        { text: 'Turn the oxygen down because the saturation of 99% shows she is already getting more than enough', correct: false, feedback: 'The 99% reading is falsely reassuring in CO poisoning. Reducing oxygen slows removal of carbon monoxide.', effect: 22 },
        { text: 'Give her a strong migraine medicine, since her history suggests this is just a very bad migraine', correct: false, feedback: 'A migraine does not explain falling consciousness in a whole family exposed to a heater.', effect: 18 },
        { text: 'Sit her up, give her a cup of strong coffee and recheck how alert she is again in thirty minutes', correct: false, feedback: 'Caffeine does not treat CO poisoning, and drowsiness here needs immediate airway and breathing support.', effect: 20 }
      ],
      results: { update: 'Airway supported, maximum oxygen given. She becomes more alert over the next half hour.' }
    },
    decisions: [
      {
        title: 'Arrival',
        findings: 'She has a throbbing headache and feels sick. She is pale and a little unsteady on her feet. Heart rate 108, BP 118/72, oxygen saturation 99% on room air.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Give a migraine medicine and an anti-sickness tablet, then reassess her in an hour or so', correct: false, feedback: 'The whole family is sick and a fuel heater was running — that pattern points to carbon monoxide, not migraine.', effect: 10 },
          { text: 'Give high-flow oxygen through a tight-fitting mask now, before confirming the cause', correct: true, feedback: 'When carbon monoxide is suspected, high-flow oxygen starts immediately. It helps push carbon monoxide off the blood much faster than room air.', effect: -10 },
          { text: 'Order a CT scan of her head to rule out bleeding, since she fainted earlier this morning', correct: false, feedback: 'A scan may be considered later, but the likely cause is a poison that needs oxygen now.', effect: 8 },
          { text: 'Treat this as a stomach bug, start an IV drip of fluids and offer anti-sickness medicine', correct: false, feedback: 'A stomach bug does not explain headaches, dizziness and fainting in everyone who slept near a heater.', effect: 10 }
        ]
      },
      {
        title: 'A reassuring number?',
        findings: 'She is on high-flow oxygen. A student points out that her oxygen saturation has read 99% the whole time, even before oxygen, and says, "Her oxygen is perfect, so it can\'t be carbon monoxide."',
        question: 'How do you confirm or rule out carbon monoxide poisoning?',
        timeCost: 15,
        options: [
          { text: 'Agree that a normal oxygen saturation rules it out, and look for a different cause instead', correct: false, feedback: 'A standard pulse oximeter cannot tell carbon monoxide apart from oxygen on the blood, so it reads falsely normal.', effect: 14 },
          { text: 'Send a blood gas test that measures the carboxyhemoglobin level, while keeping the oxygen on', correct: true, feedback: 'Carboxyhemoglobin (carbon monoxide stuck to hemoglobin) is measured on a blood gas. The finger probe is misleading in CO poisoning.', effect: -12 },
          { text: 'Take off the oxygen for thirty minutes and see whether the oxygen saturation then falls', correct: false, feedback: 'Removing oxygen delays treatment, and the saturation reading will still look normal.', effect: 14 },
          { text: 'Order a chest X-ray, since carbon monoxide would show up as a cloudy pattern on the lungs', correct: false, feedback: 'Carbon monoxide affects the blood\'s ability to carry oxygen; the chest X-ray is usually normal.', effect: 8 }
        ],
        results: {
          labs: [
            { name: 'Carboxyhemoglobin (CO level)', value: '24%', flag: 'C', ref: 'Under 3% in non-smokers' },
            { name: 'Lactate', value: '3.1 mmol/L', flag: 'H', ref: '0.5–2.0' }
          ]
        }
      },
      {
        title: 'The rest of the family',
        findings: 'Her carboxyhemoglobin is 24% — confirming carbon monoxide poisoning. Her husband and two children are waiting in the waiting room. They have headaches too, and the younger child has just vomited.',
        question: 'What should happen with the rest of the family?',
        timeCost: 15,
        options: [
          { text: 'Ask them to see their own doctor tomorrow, since only the mother fainted', correct: false, feedback: 'Everyone breathed the same air. Children breathe faster and can be affected more quickly.', effect: 10 },
          { text: 'Register each one as a patient, start oxygen and test their CO levels too', correct: true, feedback: 'In CO poisoning, everyone exposed is a patient. Each family member needs oxygen and their own carboxyhemoglobin level.', effect: -10 },
          { text: 'Send them back home to open the windows and air out the house for a while', correct: false, feedback: 'Returning to the house exposes them again. They need assessment and treatment, and the home must be checked first.', effect: 14 },
          { text: 'Check their oxygen saturation with the finger probe and treat if it is low', correct: false, feedback: 'The finger probe is falsely normal in CO poisoning, so it cannot be used to clear them.', effect: 10 }
        ],
        results: {
          update: 'All three are on high-flow oxygen. Levels: husband 18%, 11-year-old 15%, 8-year-old 20%. All improving on oxygen.',
          imaging: [ { name: '12-lead ECG (mother)', result: 'Fast regular rhythm with mild changes suggesting strain on the heart muscle.' } ],
          labs: [ { name: 'Troponin (heart muscle marker, mother)', value: 'Mildly raised', flag: 'H', ref: 'Normal: very low' } ]
        }
      },
      {
        title: 'More than a headache',
        findings: 'After two hours of oxygen her headache is easing, but she lost consciousness at home, her CO level was high, and her ECG and troponin show strain on the heart. A nearby hospital has a hyperbaric (high-pressure) oxygen chamber.',
        question: 'What is the best next step for her treatment?',
        timeCost: 20,
        options: [
          { text: 'Discuss her with the hyperbaric and poison specialists, as she has features of severe poisoning', correct: true, feedback: 'Loss of consciousness, a high CO level and heart strain are features of severe poisoning. Specialists decide whether hyperbaric oxygen could help, which may lower the risk of later memory and thinking problems.', effect: -12 },
          { text: 'Stop the oxygen now that her headache is better, and discharge her home with pain tablets', correct: false, feedback: 'Feeling better does not mean she is safe. Heart strain and fainting need further care and monitoring.', effect: 14 },
          { text: 'Start a blood-thinning drip for a heart attack and call the cardiologist for an urgent angiogram', correct: false, feedback: 'Heart strain here comes from the poison reducing oxygen delivery, not a blocked artery. The cause must be treated.', effect: 10 },
          { text: 'Switch from the mask to low-flow nasal prongs, which are more comfortable for her over many hours', correct: false, feedback: 'Low-flow oxygen removes carbon monoxide much more slowly. She still needs high-flow oxygen.', effect: 10 }
        ],
        results: {
          update: 'The hyperbaric team accepts her for treatment. Her CO level is now 6% and she is alert.',
          labs: [ { name: 'Carboxyhemoglobin (CO level)', value: '6%', flag: 'H', ref: 'Under 3%' } ]
        }
      },
      {
        title: 'Going home safely',
        findings: 'The children and husband are feeling well with CO levels near normal. The family asks if they can all go home tonight, as the house is warm with the heater.',
        question: 'What must happen before anyone returns home?',
        timeCost: 15,
        options: [
          { text: 'They can go home now if they keep a window cracked open whenever the heater is on', correct: false, feedback: 'An open window does not make a faulty heater safe. The source must be found and fixed.', effect: 12 },
          { text: 'The fire service checks the home and heater, and the family fits carbon monoxide alarms', correct: true, feedback: 'The source must be found and made safe before anyone returns. Working CO alarms protect against this invisible, odorless gas in the future.', effect: -10 },
          { text: 'They can go home as long as they switch the heater off at night and use it only in the day', correct: false, feedback: 'Carbon monoxide builds up during the day too. A faulty heater is unsafe at any time.', effect: 10 },
          { text: 'Only the mother needs to stay away; the rest of the family is recovered and can go home', correct: false, feedback: 'The home is still unsafe for everyone (including the pet) until it has been checked.', effect: 10 }
        ]
      }
    ],
    disposition: { type: 'ward', label: 'Hyperbaric oxygen treatment, then admitted for heart monitoring; family housed safely until home is checked', maxSeverity: 25 },
    teaching: 'Carbon monoxide is an invisible, odorless gas from fuel-burning devices; think of it when several people (or pets) from one home have headache, nausea and dizziness, especially in winter. A standard pulse oximeter reads falsely normal, so a blood gas carboxyhemoglobin level is needed. Treat with high-flow oxygen, assess everyone exposed, consider hyperbaric oxygen for severe cases, and never send anyone home until the source is made safe and CO alarms are fitted.'
  },

  // ───────────────────────────────────────────── 6. Button battery ingestion
  {
    id: 'f-button-battery',
    title: 'Toddler who swallowed a battery',
    specialty: 'Pediatrics',
    difficulty: 'Intermediate',
    age: 2, sex: 'M',
    chiefComplaint: 'Possibly swallowed a small coin-shaped battery from a remote control',
    suspected: 'Swallowed foreign object',
    finalDiagnosis: 'Button battery lodged in the esophagus with a local chemical burn of the lining',
    presentation: 'A 2-year-old boy was found playing with a TV remote control with its battery cover open. One small, round, flat battery is missing. His mother thinks it happened about an hour ago. He coughed once but now seems happy and is playing. He has been drooling a little more than usual.',
    history: {
      pmh: ['Healthy'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Lives with his parents and a 5-year-old sister. Has not eaten since the incident.'
    },
    canDie: true,
    startSeverity: 30,
    drift: 0.8,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 112, sbp: 96, dbp: 58, rr: 26, spo2: 99, temp: 36.9 },
      critical: { hr: 172, sbp: 70, dbp: 40, rr: 42, spo2: 92, temp: 37.8 }
    },
    initialLabs: [],
    initialImaging: [],
    events: [
      { afterMinutes: 60, text: 'Nurse: he has refused a sip of water from his sister\'s cup and seems to be drooling more.', effect: 6 }
    ],
    rescue: {
      title: 'Vomiting blood',
      findings: 'He suddenly vomits bright red blood. He becomes pale and sleepy, and his heart rate is climbing while his blood pressure falls.',
      question: 'What is the immediate priority?',
      timeCost: 10,
      options: [
        { text: 'Call for the resuscitation and surgical teams, support ABCs, and prepare blood for transfusion', correct: true, feedback: 'A battery can burn through the esophagus into a nearby blood vessel. This is a critical emergency: support ABCs, get blood ready, and bring specialist surgeons urgently.', effect: -22 },
        { text: 'Give him a drink of cold milk to soothe his throat and see if the bleeding then stops by itself', correct: false, feedback: 'Nothing should be given by mouth while he is bleeding. He needs resuscitation and specialist surgery.', effect: 22 },
        { text: 'Send him for a full set of X-rays first to find exactly where the bleeding is coming from', correct: false, feedback: 'An unstable, bleeding child should not leave the resuscitation room for X-rays. Stabilize first.', effect: 20 },
        { text: 'Give an anti-sickness medicine and observe him in the waiting area with his mother for an hour', correct: false, feedback: 'Vomiting blood after a button battery is a life-threatening sign that needs immediate action.', effect: 22 }
      ],
      results: { update: 'Resuscitation team at the bedside. Blood transfused. Surgical and specialist teams preparing to operate.' }
    },
    decisions: [
      {
        title: 'He looks fine',
        findings: 'He is playful, pink and breathing comfortably, with a little extra drooling. Heart rate 118, oxygen saturation 99%. His mother brings the remote control with the empty battery slot.',
        question: 'He looks well. What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Get an urgent X-ray from his neck to his belly to find out where the battery is', correct: true, feedback: 'A button battery can cause serious damage within about two hours even when the child looks fine. An urgent X-ray shows where it is and guides the next step.', effect: -12 },
          { text: 'Send him home and ask his parents to check his diapers for the battery over a week', correct: false, feedback: 'Waiting is unsafe until you know where it is. A battery stuck in the esophagus can cause a severe burn within hours.', effect: 18 },
          { text: 'Give him bread and water to help the battery pass down into his stomach more quickly', correct: false, feedback: 'Food can delay removal under anesthesia and does not reliably move the battery. Follow specialist and poison control advice.', effect: 12 },
          { text: 'Make him vomit by pressing on the back of his tongue to try to bring the battery up', correct: false, feedback: 'Making a child vomit can cause choking or more injury. It is not used for swallowed objects.', effect: 14 }
        ],
        results: {
          imaging: [ { name: 'X-ray neck, chest and abdomen', result: 'A round metal object about 2 cm across sits in the esophagus at the level of the upper chest. Side view shows a "double ring" (halo) edge — typical of a button battery.' } ]
        }
      },
      {
        title: 'Where is it?',
        findings: 'The X-ray shows the battery stuck in his esophagus (food pipe) in the upper chest. He is still smiling and playing with a toy. His father asks, "He seems fine — can we just wait for it to pass?"',
        question: 'What is the right plan?',
        timeCost: 15,
        options: [
          { text: 'Agree to wait overnight, since most swallowed coins pass through the gut on their own', correct: false, feedback: 'Button batteries are not like coins. In the esophagus they create an electrical current that burns the lining within hours.', effect: 18 },
          { text: 'Call the specialist team now for emergency removal under anesthesia within hours', correct: true, feedback: 'A button battery in the esophagus is a true emergency even in a happy child. Specialist teams remove it under anesthesia as quickly as possible.', effect: -14 },
          { text: 'Repeat the X-ray in twelve hours to see whether the battery has moved down by itself', correct: false, feedback: 'Twelve hours is far too long. Serious burns can happen in two hours.', effect: 16 },
          { text: 'Give a medicine that relaxes the food pipe and offer him a large drink to wash it down', correct: false, feedback: 'This is not reliable and food or drink in the stomach can delay anesthesia. Removal is the treatment.', effect: 12 }
        ]
      },
      {
        title: 'Waiting for the operating room',
        findings: 'The specialist team will remove the battery in about 40 minutes. You call poison control, who give advice on protecting the esophagus until removal, based on his age and timing.',
        question: 'What should happen while he waits?',
        timeCost: 10,
        options: [
          { text: 'Give him a full meal now, since he may be hungry for a long time after the operation', correct: false, feedback: 'A full stomach makes anesthesia less safe and can delay the procedure.', effect: 12 },
          { text: 'Follow poison control advice, such as honey as directed, and nothing else by mouth', correct: true, feedback: 'For some children, poison control may advise honey as a temporary protective coating before removal. Otherwise, nothing by mouth, ready for anesthesia. Removal must never be delayed for this.', effect: -10 },
          { text: 'Let him drink lemon juice to dissolve the battery before the specialist team arrives', correct: false, feedback: 'Acidic drinks do not dissolve batteries and could add to the injury.', effect: 12 },
          { text: 'Let him have fizzy drinks to make him burp the battery back up into his mouth', correct: false, feedback: 'Fizzy drinks do not bring up a stuck battery and fill the stomach before anesthesia.', effect: 10 }
        ],
        results: {
          update: 'Battery removed by the specialist team. The camera shows a dark, burned patch on the lining of the esophagus where the battery sat.'
        }
      },
      {
        title: 'Battery out — is he safe now?',
        findings: 'The battery is out and he is waking up well from anesthesia. The specialists found a burn on the lining of the esophagus. His parents ask if they can take him home tonight now that it is out.',
        question: 'What is the right plan after removal?',
        timeCost: 20,
        options: [
          { text: 'Yes, he can go home tonight, because once the battery is removed the danger is over', correct: false, feedback: 'Damage from a battery can keep developing for days or weeks after removal, including a hole or bleeding.', effect: 14 },
          { text: 'Admit him for observation, with the specialist team deciding on feeding and follow-up', correct: true, feedback: 'After a battery burn the tissue can weaken over days. Admission allows monitoring for warning signs like fever, vomiting blood or chest pain, with specialist-led follow-up.', effect: -12 },
          { text: 'Send him home on a normal diet and see him again in clinic only if he has a problem', correct: false, feedback: 'He needs specialist-guided care. Complications can be serious and may appear later.', effect: 12 },
          { text: 'Keep him in recovery for two hours and discharge him if he drinks without vomiting', correct: false, feedback: 'Drinking well a few hours after removal does not show the burn will heal safely.', effect: 10 }
        ]
      },
      {
        title: 'Preventing it again',
        findings: 'He is settled on the children\'s ward. Before you leave, his parents ask what they can do to keep him and his sister safe in the future.',
        question: 'What is the most useful advice?',
        timeCost: 10,
        options: [
          { text: 'Keep spare batteries locked away and tape or screw shut every battery cover in the house', correct: true, feedback: 'Prevention is key: store batteries out of reach, secure battery compartments, and seek emergency care immediately if a child might have swallowed one.', effect: -8 },
          { text: 'Only worry about large batteries, since small, flat coin batteries are too tiny to be harmful', correct: false, feedback: 'Small coin-shaped batteries are exactly the dangerous kind. They can lodge in the esophagus and burn it quickly.', effect: 8 },
          { text: 'If it ever happens again, wait for symptoms before coming in, since a well child is fine', correct: false, feedback: 'Children often look well at first. Any suspected battery swallow needs immediate emergency care.', effect: 10 },
          { text: 'Teach the children never to touch remotes, since toddlers can easily follow that sort of rule', correct: false, feedback: 'Toddlers cannot reliably follow safety rules. Physical prevention (locked storage, secured covers) works better.', effect: 6 }
        ]
      }
    ],
    disposition: { type: 'ward', label: 'Admitted to the children\'s ward for observation under the specialist team', maxSeverity: 25 },
    teaching: 'A swallowed button battery is time-critical even when the child looks completely well: in the esophagus it can burn the lining within about two hours. Get an urgent X-ray (a "double ring" edge suggests a battery) and call specialists for emergency removal; poison control may advise protective measures such as honey as directed, but removal is never delayed. Damage can progress after removal, so children are watched closely, and prevention means keeping batteries locked away.'
  }
);
