// ER Simulator — case pack E (Gastroenterology, Infectious Disease, Endocrinology, Emergency Medicine)
// Fictional, educational cases. No doses or procedure instructions by design.
window.CASE_LIBRARY = window.CASE_LIBRARY || [];
window.CASE_LIBRARY.push(

  // ───────────────────────────────────────────── 1. Stomach bug with mild dehydration
  {
    id: 'e-gastro-dehydration-01',
    title: 'Vomiting and diarrhea after a family dinner',
    specialty: 'Gastroenterology',
    difficulty: 'Beginner',
    age: 29, sex: 'M',
    chiefComplaint: 'Vomiting and watery diarrhea since last night, feeling weak',
    suspected: 'Stomach bug (gastroenteritis) with dehydration',
    finalDiagnosis: 'Viral gastroenteritis with mild dehydration',
    presentation: 'A 29-year-old man started vomiting and having watery diarrhea late last night. Two other people in his household have had the same illness this week. He has kept down only small sips of water, feels tired and a little dizzy when he stands up, and has crampy belly pain that comes and goes. There is no blood in his stool and he has not traveled recently.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Works in an office. Lives with his partner and young child. Does not smoke.'
    },
    canDie: false,
    maxSeverity: 45,
    startSeverity: 24,
    drift: 0.5,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 80,  sbp: 122, dbp: 76, rr: 15, spo2: 99, temp: 37.0 },
      critical: { hr: 122, sbp: 98,  dbp: 60, rr: 20, spo2: 98, temp: 38.0 }
    },
    initialLabs: [
      { name: 'Sodium', value: '137 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '3.6 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '1.1 mg/dL', flag: '', ref: '0.7–1.2' },
      { name: 'Glucose', value: '92 mg/dL', flag: '', ref: '70–140' }
    ],
    initialImaging: [],
    decisions: [
      {
        title: 'First look',
        findings: 'He is sitting up and talking normally. Heart rate is 102 and blood pressure 116/72. His mouth looks dry, but he is alert and his belly is soft.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Give a medicine for nausea, then start small, frequent sips of an oral rehydration drink and recheck', correct: true, feedback: 'Most adults with mild dehydration can be rehydrated by mouth. Calming the nausea first makes it much easier for him to keep fluids down.', effect: -8 },
          { text: 'Start antibiotics through a drip straight away, because several people at home have the same stomach illness this week', correct: false, feedback: 'Most stomach bugs that spread through a household are caused by viruses, which antibiotics do not treat.', effect: 6 },
          { text: 'Send him for a CT scan of the abdomen first, so that a hidden surgical problem is ruled out before any treatment starts', correct: false, feedback: 'His belly is soft and the story fits a stomach bug. A CT scan is not needed first and only delays rehydration.', effect: 6 },
          { text: 'Ask him not to eat or drink anything for the next six hours to let his stomach rest before giving any fluids at all', correct: false, feedback: 'Stopping all fluids makes dehydration worse. Small, frequent sips are better than a long rest for the stomach.', effect: 8 }
        ],
        results: {
          update: 'After the anti-sickness medicine, he is sipping the rehydration drink slowly.'
        }
      },
      {
        title: 'Keeping fluids down?',
        findings: 'An hour later he has vomited twice more and cannot keep the drink down. He feels dizzy standing, and his heart rate is now 108.',
        question: 'What is the most sensible next step?',
        timeCost: 15,
        options: [
          { text: 'Keep encouraging the oral drink for several more hours, since adults should only get a drip if they become confused', correct: false, feedback: 'Confusion is a late sign. If someone cannot keep fluids down by mouth and is getting dizzy, it is time to move to IV fluids.', effect: 7 },
          { text: 'Place an IV line and give fluids through a drip, as he cannot keep anything down and is dizzy', correct: true, feedback: 'IV fluids are used when oral rehydration is not working, for example with ongoing vomiting or signs like dizziness and a rising heart rate.', effect: -10 },
          { text: 'Give a medicine to stop the diarrhea right away and send him home to rest, since the fluid problem will then settle', correct: false, feedback: 'Stopping diarrhea does not replace the fluid he has already lost, and he still cannot keep anything down.', effect: 8 },
          { text: 'Admit him to the intensive care unit for close monitoring, because vomiting that continues can quickly become deadly', correct: false, feedback: 'He is unwell but stable. A drip in the ER is enough; intensive care is for patients with failing organs.', effect: 4 }
        ],
        results: {
          update: 'IV fluids started. After an hour his heart rate is 88 and he no longer feels dizzy when sitting up.',
          labs: [ { name: 'Urine color', value: 'Dark yellow, becoming lighter', flag: '', ref: 'Pale yellow' } ]
        }
      },
      {
        title: 'Stopping the spread',
        findings: 'He is feeling better. The nurse mentions that two other patients in the same corridor are immunocompromised, and his partner is asking how to keep their child from catching it.',
        question: 'What infection-control advice matters most?',
        timeCost: 10,
        options: [
          { text: 'Rely on hand sanitizer gel alone, because alcohol gels kill every stomach virus that spreads between people at home', correct: false, feedback: 'Some common stomach viruses are not reliably killed by alcohol gel. Washing with soap and water is more effective.', effect: 4 },
          { text: 'Wear a face mask at home for a week, since stomach bugs mainly spread by coughing and breathing on other people', correct: false, feedback: 'Stomach bugs spread mainly from hands, surfaces and shared food, not mostly through coughs.', effect: 4 },
          { text: 'Wash hands with soap and water, clean shared toilets, and avoid making food for others for a few days', correct: true, feedback: 'Good handwashing and cleaning, plus not handling other people’s food while unwell, are the main ways to stop a stomach bug from spreading.', effect: -6 },
          { text: 'Give everyone in the house antibiotics as a precaution, so that no one else in the family picks up the infection', correct: false, feedback: 'Antibiotics do not prevent viral stomach bugs and can cause side effects. Hygiene is what stops spread.', effect: 5 }
        ]
      },
      {
        title: 'Ready for home?',
        findings: 'After the drip he has kept down two cups of fluid and a few crackers. He has passed urine, his heart rate is 84, and he can walk without dizziness.',
        question: 'What is the right plan now?',
        timeCost: 10,
        options: [
          { text: 'Keep him overnight on the ward for more IV fluids, because the stomach bug might still come back later this evening', correct: false, feedback: 'He is now drinking, passing urine and walking steadily. Staying in hospital is not needed and keeps a bed from someone sicker.', effect: 4 },
          { text: 'Discharge home with a supply of antibiotics and advice to finish the full course even if he is already feeling better', correct: false, feedback: 'Antibiotics are not helpful for a viral stomach bug, so they should not be part of the discharge plan.', effect: 5 },
          { text: 'Discharge home with no advice, since a stomach bug always clears up by itself and there is no need for any follow-up', correct: false, feedback: 'Safe discharge includes telling the patient which warning signs mean he should come back.', effect: 5 },
          { text: 'Discharge home with fluids advice, hygiene tips and clear reasons to return, like blood in the stool', correct: true, feedback: 'He meets safe discharge goals. Clear return advice ("safety-netting") means he knows when to come back if things change.', effect: -6 }
        ]
      }
    ],
    disposition: { type: 'home', label: 'Discharged home with oral fluids, hygiene advice and return precautions', maxSeverity: 20 },
    teaching: 'Most adults with a stomach bug and mild dehydration can be rehydrated by mouth, often after a medicine for nausea. IV fluids are used when oral fluids fail or there are signs like dizziness and a fast heart rate. Handwashing with soap and water is the key to stopping spread, and every safe discharge includes clear reasons to return.'
  },

  // ───────────────────────────────────────────── 2. Cholecystitis → cholangitis twist
  {
    id: 'e-gallbladder-01',
    title: 'Right-sided belly pain after a fatty meal',
    specialty: 'Gastroenterology',
    difficulty: 'Intermediate',
    age: 45, sex: 'F',
    chiefComplaint: 'Pain under the right ribs and vomiting since last night',
    suspected: 'Possible gallbladder problem',
    finalDiagnosis: 'Acute cholecystitis with a gallstone blocking the bile duct, causing ascending cholangitis',
    presentation: 'A 45-year-old woman developed steady pain under her right ribs about two hours after a large fried dinner last night. The pain spreads to her right shoulder blade and has not settled overnight. She has vomited three times. She mentions shorter episodes of similar pain after big meals over the past few months that always went away on their own.',
    history: {
      pmh: ['Type 2 diabetes', 'Overweight'],
      meds: ['A diabetes tablet'],
      allergies: 'No known allergies',
      social: 'Works as a pharmacist assistant. Does not smoke. Drinks alcohol rarely.'
    },
    canDie: true,
    startSeverity: 30,
    drift: 0.6,
    recoveredDrift: -1.2,
    vitals: {
      stable:   { hr: 82,  sbp: 128, dbp: 78, rr: 16, spo2: 98, temp: 37.0 },
      critical: { hr: 130, sbp: 82,  dbp: 48, rr: 28, spo2: 93, temp: 39.4 }
    },
    initialLabs: [
      { name: 'White blood cells', value: '13.8 ×10⁹/L', flag: 'H', ref: '4.0–11.0' },
      { name: 'Bilirubin (bile pigment)', value: '1.0 mg/dL', flag: '', ref: '0.1–1.2' },
      { name: 'Lipase (pancreas enzyme)', value: 'Normal', flag: '', ref: 'Normal' },
      { name: 'Pregnancy test', value: 'Negative', flag: '', ref: 'Negative' }
    ],
    initialImaging: [],
    rescue: {
      title: 'Blood pressure falling',
      findings: 'She is shivering, drowsy and confused about where she is. Blood pressure is 82/48 and heart rate 130. Her skin and eyes are clearly yellow.',
      question: 'She is now in septic shock. What do you do?',
      timeCost: 10,
      options: [
        { text: 'Call the resuscitation team, give IV fluids and antibiotics now, and get urgent bile duct drainage arranged', correct: true, feedback: 'An infected, blocked bile duct causing shock needs fast resuscitation, antibiotics, and urgent drainage of the duct by the specialist team.', effect: -22 },
        { text: 'Send her for an MRI scan of the bile ducts first so the team knows exactly where the stone is before treatment', correct: false, feedback: 'A long scan away from the resuscitation area is unsafe in shock. Stabilize and start antibiotics first.', effect: 18 },
        { text: 'Give a medicine to lower the fever and recheck her temperature and blood pressure again in about thirty minutes', correct: false, feedback: 'Lowering the fever does not treat the infection or the blockage, and waiting while she is in shock is dangerous.', effect: 20 },
        { text: 'Book her for gallbladder removal on the routine surgical list later this week, once the infection has settled', correct: false, feedback: 'Routine surgery later does not help now. The infected bile duct needs urgent drainage alongside resuscitation.', effect: 22 }
      ]
    },
    decisions: [
      {
        title: 'First look',
        findings: 'She is lying still and holding her right side. Temperature 37.6 °C, heart rate 96, blood pressure 130/80. She has vomited once more since arriving.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Place an IV line, take blood tests, and give pain relief and anti-sickness medicine while you examine her belly', correct: true, feedback: 'Pain relief does not hide the diagnosis. Getting IV access and bloods while making her comfortable lets you examine her properly.', effect: -8 },
          { text: 'Hold all pain relief until the surgeon has examined her, so the pain does not hide what is happening in the belly', correct: false, feedback: 'Studies show pain relief does not stop doctors from finding the problem. Leaving her in pain is unkind and unnecessary.', effect: 6 },
          { text: 'Give her an antacid drink for indigestion and watch her in the waiting room to see whether the pain settles down', correct: false, feedback: 'Steady pain lasting many hours with vomiting and a raised white count is more than indigestion and needs assessment.', effect: 8 },
          { text: 'Send her home with stronger painkillers and a clinic visit next week, since past episodes of this pain settled alone', correct: false, feedback: 'This episode is lasting much longer than the old ones and she has signs of inflammation. She needs a diagnosis today.', effect: 10 }
        ],
        results: {
          update: 'Pain eased a little after medicine. On examination, pressing under her right ribs as she breathes in makes her stop the breath sharply (positive Murphy’s sign).'
        }
      },
      {
        title: 'Choosing the scan',
        findings: 'She has a positive Murphy’s sign and a raised white cell count. Her pancreas enzyme and pregnancy test are normal.',
        question: 'Which test should come next?',
        timeCost: 20,
        options: [
          { text: 'A plain X-ray of the abdomen, since it clearly shows nearly all gallstones and any swelling of the gallbladder', correct: false, feedback: 'Most gallstones do not show up on a plain X-ray, so it often misses the problem.', effect: 6 },
          { text: 'An ultrasound scan of the right upper abdomen, to look at the gallbladder wall, stones and the bile duct size', correct: true, feedback: 'Ultrasound is the first-choice test for gallbladder problems. It shows stones, a thickened gallbladder wall, fluid around it, and whether the bile duct is widened.', effect: -10 },
          { text: 'A camera test down into the stomach, to look for an ulcer as the most likely cause of this upper belly pain', correct: false, feedback: 'An ulcer is possible, but her story and Murphy’s sign point to the gallbladder. Ultrasound comes first.', effect: 6 },
          { text: 'A heart tracing and repeat heart blood tests only, because upper belly pain is usually a hidden heart attack', correct: false, feedback: 'Heart problems can cause upper belly pain and are worth an ECG, but they do not explain these findings. The gallbladder needs imaging.', effect: 5 }
        ],
        results: {
          update: 'Ultrasound result available.',
          imaging: [ { name: 'Ultrasound — right upper abdomen', result: 'Gallstones with a thickened gallbladder wall and a little fluid around it. Tender when the probe presses over the gallbladder. The bile duct is mildly widened.' } ]
        }
      },
      {
        title: 'Treating the inflamed gallbladder',
        findings: 'The scan confirms an inflamed gallbladder (acute cholecystitis). She is still in pain but stable. The bile duct is slightly wider than normal.',
        question: 'What is the best plan right now?',
        timeCost: 20,
        options: [
          { text: 'Start IV antibiotics, keep her fasting with IV fluids, and refer to the surgical team for admission and surgery', correct: true, feedback: 'Acute cholecystitis is treated with fluids, antibiotics and pain relief, and the surgical team usually removes the gallbladder during the same admission.', effect: -10 },
          { text: 'Discharge her on tablets for pain and arrange to remove the gallbladder at a routine clinic in two months’ time', correct: false, feedback: 'An inflamed gallbladder with a raised white count needs admission. Sending her home risks the inflammation worsening.', effect: 10 },
          { text: 'Give a strong anti-acid medicine and a low-fat diet sheet, then review her again tomorrow morning in the ER', correct: false, feedback: 'Diet changes help prevent future attacks, but they do not treat an inflamed, infected gallbladder today.', effect: 8 },
          { text: 'Request a CT scan of the whole abdomen as well, before telling the surgeons, to be fully certain of the diagnosis', correct: false, feedback: 'The ultrasound has already answered the question. Delaying referral for another scan adds radiation and time.', effect: 5 }
        ],
        results: {
          update: 'Antibiotics and IV fluids started. The surgical team accepts her for admission.'
        }
      },
      {
        title: 'Twist — new fever and yellow eyes',
        findings: 'While waiting for a ward bed, she starts shivering. Temperature is 39.1 °C, heart rate 112, blood pressure 108/66. The nurse notices the whites of her eyes look yellow.',
        question: 'How should you interpret this change?',
        timeCost: 15,
        options: [
          { text: 'A normal response to the antibiotics working, which often causes fever and some yellow eyes for the first day', correct: false, feedback: 'Antibiotics working should make her better, not cause rigors and jaundice. This is a new, worrying problem.', effect: 12 },
          { text: 'A sign she has caught a new chest infection from lying in bed, which needs a chest X-ray and a different antibiotic', correct: false, feedback: 'A chest infection would not make her eyes yellow. Jaundice points to a blocked bile duct.', effect: 10 },
          { text: 'Likely stone blocking the bile duct with infection behind it (cholangitis); tell the seniors now', correct: true, feedback: 'Fever, right upper belly pain and yellow skin together suggest an infected, blocked bile duct (ascending cholangitis), which can quickly lead to sepsis.', effect: -10 },
          { text: 'Likely dehydration from fasting, which can make the eyes look yellow, so simply speed up the IV fluids and watch', correct: false, feedback: 'Fluids help, but dehydration does not cause jaundice and rigors. Missing cholangitis can be dangerous.', effect: 10 }
        ],
        results: {
          update: 'Senior doctor and surgical team informed.',
          labs: [
            { name: 'Bilirubin (bile pigment)', value: '4.2 mg/dL', flag: 'H', ref: '0.1–1.2' },
            { name: 'White blood cells', value: '18.6 ×10⁹/L', flag: 'H', ref: '4.0–11.0' },
            { name: 'Lactate', value: '2.6 mmol/L', flag: 'H', ref: '0.5–2.0' }
          ]
        }
      },
      {
        title: 'Escalation',
        findings: 'Bilirubin has risen sharply and lactate is up. A repeat ultrasound shows the bile duct is now clearly widened. She remains feverish with blood pressure 104/64.',
        question: 'What is the most important next step?',
        timeCost: 25,
        options: [
          { text: 'Keep the current plan on the ward and plan gallbladder surgery next week, as the antibiotics need time to work', correct: false, feedback: 'Antibiotics alone often cannot clear an infection behind a blocked duct. The blockage itself needs to be relieved soon.', effect: 14 },
          { text: 'Escalate antibiotics, monitor her in a high-care area, and ask the specialist team for urgent bile duct drainage', correct: true, feedback: 'Cholangitis needs strong antibiotics, close monitoring, and urgent drainage of the blocked duct by the specialist team, usually with a camera procedure.', effect: -14 },
          { text: 'Stop the antibiotics and send blood cultures first, so the lab can grow the germ before any further treatment', correct: false, feedback: 'Blood cultures are useful, but stopping antibiotics in someone with sepsis is dangerous.', effect: 16 },
          { text: 'Take her straight to theatre now for open removal of the gallbladder by the general surgeon on call tonight', correct: false, feedback: 'The urgent problem is the blocked bile duct, which is usually cleared by a camera procedure first. Gallbladder removal follows later.', effect: 8 }
        ],
        results: {
          update: 'The specialist team cleared a stone from the bile duct the same night. Fever settled over the next day.',
          labs: [ { name: 'Bilirubin (bile pigment)', value: '2.1 mg/dL, falling', flag: 'H', ref: '0.1–1.2' } ]
        }
      }
    ],
    disposition: { type: 'ward', label: 'Admitted under surgery after bile duct drainage; gallbladder removal planned during the admission', maxSeverity: 35 },
    teaching: 'Gallbladder inflammation (cholecystitis) causes right upper belly pain after fatty meals, a positive Murphy’s sign, and is best seen on ultrasound. If fever and yellow skin appear, think of a stone blocking the bile duct with infection behind it (cholangitis) — this can cause sepsis and needs urgent drainage, not just antibiotics.'
  },

  // ───────────────────────────────────────────── 3. Necrotizing soft-tissue infection
  {
    id: 'e-nsti-leg-01',
    title: 'Painful red leg that keeps getting worse',
    specialty: 'Infectious Disease',
    difficulty: 'Advanced',
    age: 56, sex: 'M',
    chiefComplaint: 'Severe left leg pain and redness after a small cut two days ago',
    suspected: 'Skin infection of the leg',
    finalDiagnosis: 'Necrotizing soft-tissue infection (necrotizing fasciitis) of the left leg with sepsis',
    presentation: 'A 56-year-old man scraped his left shin on a garden fence two days ago. Since last night the leg has become red, swollen and extremely painful. He says the pain is "the worst I have ever felt", even though the redness does not look dramatic. He feels feverish and weak.',
    history: {
      pmh: ['Type 2 diabetes', 'High blood pressure'],
      meds: ['A diabetes tablet', 'A blood pressure tablet'],
      allergies: 'No known allergies',
      social: 'Retired builder who gardens daily. Drinks alcohol most days. Lives with his wife.'
    },
    canDie: true,
    startSeverity: 42,
    drift: 1.6,
    recoveredDrift: -1,
    vitals: {
      stable:   { hr: 86,  sbp: 130, dbp: 78, rr: 16, spo2: 98, temp: 37.1 },
      critical: { hr: 140, sbp: 76,  dbp: 42, rr: 32, spo2: 90, temp: 39.8 }
    },
    initialLabs: [
      { name: 'White blood cells', value: '19.4 ×10⁹/L', flag: 'H', ref: '4.0–11.0' },
      { name: 'Sodium', value: '131 mmol/L', flag: 'L', ref: '135–145' },
      { name: 'Glucose', value: '268 mg/dL', flag: 'H', ref: '70–140' },
      { name: 'CRP (inflammation marker)', value: '240 mg/L', flag: 'H', ref: '<5' }
    ],
    initialImaging: [],
    events: [
      { afterMinutes: 45, text: 'Nurse: the redness has spread past the pen line you drew on his leg less than an hour ago.', effect: 8 }
    ],
    rescue: {
      title: 'Septic shock',
      findings: 'He is now confused and breathing fast. Blood pressure has fallen to 78/44 despite fluids, and the leg is darker and more swollen.',
      question: 'He is in septic shock. What do you do?',
      timeCost: 10,
      options: [
        { text: 'Get more IV fluids in, ask for blood pressure support by the ICU, and keep the surgeons moving toward theatre', correct: true, feedback: 'In septic shock from a deep tissue infection, resuscitation and removing the infected tissue in surgery have to happen together. Delay worsens survival.', effect: -22 },
        { text: 'Hold surgery until his blood pressure is fully normal for at least a day, because operating on shock is too risky', correct: false, feedback: 'The infection is driving the shock, so the shock may not settle until the infected tissue is removed. Waiting a day is dangerous.', effect: 20 },
        { text: 'Change to a different antibiotic and wait two hours to see whether his blood pressure improves on its own', correct: false, feedback: 'Antibiotics alone cannot reach dead infected tissue well. Waiting while he is in shock lets the infection spread.', effect: 20 },
        { text: 'Send him for a full-body MRI to map how far the infection has spread before choosing what treatment to give', correct: false, feedback: 'A long scan is unsafe in shock and only delays the surgery that he needs.', effect: 22 }
      ]
    },
    decisions: [
      {
        title: 'First look',
        findings: 'Temperature 38.6 °C, heart rate 112, blood pressure 118/70, breathing rate 22. The lower left leg is red and swollen. He winces when you go anywhere near it.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Start the sepsis steps: IV lines, blood cultures, lactate, IV fluids and broad IV antibiotics, plus pain relief', correct: true, feedback: 'Fever, a fast heart rate and fast breathing with an infection suggest sepsis. Early cultures, fluids and antibiotics save lives.', effect: -10 },
          { text: 'Give antibiotic tablets for a skin infection and send him home, with a check by his family doctor in two days', correct: false, feedback: 'He already has signs of sepsis. Tablets at home are only right for mild skin infections in otherwise well patients.', effect: 14 },
          { text: 'Raise the leg on pillows and give pain relief, then wait for all blood results before deciding about antibiotics', correct: false, feedback: 'Raising the leg helps comfort, but in suspected sepsis antibiotics should not wait for every result.', effect: 10 },
          { text: 'Get an X-ray of the left leg first to check for a broken bone from the fence before any other treatment begins', correct: false, feedback: 'He had a scrape, not a big injury, and he looks septic. Treat the infection first.', effect: 8 }
        ],
        results: {
          update: 'Two IV lines placed, cultures sent, fluids and broad antibiotics started.',
          labs: [ { name: 'Lactate', value: '3.4 mmol/L', flag: 'H', ref: '0.5–2.0' } ]
        }
      },
      {
        title: 'Twist — pain out of proportion',
        findings: 'Even after strong pain relief he says the pain is unbearable. The skin looks only mildly red, but the leg feels tense and woody, and the pain spreads well beyond the red area.',
        question: 'What does this pattern suggest?',
        timeCost: 10,
        options: [
          { text: 'Ordinary skin infection (cellulitis), and his pain is likely high because he tolerates pain less well than most', correct: false, feedback: 'Assuming low pain tolerance is a classic trap. Pain far worse than the skin looks is a key warning sign of a deep infection.', effect: 14 },
          { text: 'Possible deep, fast-spreading infection along the tissue layers, so mark the red edge and call the surgeons now', correct: true, feedback: 'Pain out of proportion to the skin, tense swelling and sepsis together raise strong concern for a necrotizing infection, which needs urgent surgical review.', effect: -12 },
          { text: 'Probable gout flare in the leg made worse by drinking, which needs anti-inflammatory medicine and a few days’ rest', correct: false, feedback: 'Gout usually affects a joint, and it would not explain sepsis with a rising lactate.', effect: 10 },
          { text: 'Likely blood clot in the leg vein, so start a blood thinner and arrange an ultrasound of the veins for tomorrow', correct: false, feedback: 'A clot can cause a swollen leg, but not fever and sepsis. Delaying surgical review risks missing a deep infection.', effect: 10 }
        ],
        results: {
          update: 'The edge of the redness is marked with a pen. The surgical team is on its way.'
        }
      },
      {
        title: 'Spreading fast',
        findings: 'Within an hour the redness has crossed the pen line and some skin now looks dusky with a few small blisters. He is more drowsy. Blood pressure 98/58.',
        question: 'The surgeon asks whether to wait for a CT scan. What do you advise?',
        timeCost: 15,
        options: [
          { text: 'Wait for the CT scan, because surgery should never go ahead until imaging confirms the deep infection first', correct: false, feedback: 'Imaging can help when the picture is unclear, but a normal scan cannot rule this out and waiting costs precious time.', effect: 16 },
          { text: 'Give a bit more time on antibiotics and decide on surgery tomorrow if the redness is still spreading by then', correct: false, feedback: 'Antibiotics cannot reach dead tissue well. Necrotizing infections can spread quickly, so waiting until tomorrow is too late.', effect: 18 },
          { text: 'Go to theatre now: with rapid spread and sepsis, surgery should not be delayed for scans that may miss it', correct: true, feedback: 'This is a surgical emergency. When the clinical picture is clear, early surgery to remove infected tissue is the most important treatment.', effect: -14 },
          { text: 'Transfer him to a specialist hospital two hours away so their team can decide about surgery after he arrives', correct: false, feedback: 'A long transfer adds hours. If a surgical team is available here, surgery should not be delayed.', effect: 12 }
        ],
        results: {
          update: 'Taken to theatre. The surgeons found and removed infected tissue along the deep layers of the leg.',
          labs: [ { name: 'Tissue sample', value: 'Bacteria seen — sent for culture', flag: 'H', ref: 'None' } ]
        }
      },
      {
        title: 'After theatre',
        findings: 'He is back from theatre on blood pressure support. Lactate has improved to 2.8. The surgeons say more tissue may need checking. His blood sugar is 290.',
        question: 'What is the right plan for the next 24 hours?',
        timeCost: 25,
        options: [
          { text: 'ICU care with antibiotics adjusted to the cultures, blood sugar control, and a return to theatre within a day', correct: true, feedback: 'After surgery, the team keeps him in ICU, controls blood sugar (which helps fight infection), and usually returns to theatre to check for any remaining infected tissue.', effect: -12 },
          { text: 'Move him to a general ward and switch to antibiotic tablets, since the infected tissue has already been removed', correct: false, feedback: 'He is still on blood pressure support and needs ICU care and IV antibiotics. It is far too early for tablets.', effect: 14 },
          { text: 'Stop all antibiotics now that surgery is over, to avoid side effects, and watch the wound closely in the ICU', correct: false, feedback: 'Antibiotics are still needed after surgery to clear the infection from the surrounding tissue and blood.', effect: 14 },
          { text: 'Keep him in the ICU but allow high blood sugar for now, since controlling it only matters after he is home', correct: false, feedback: 'High blood sugar weakens the body’s ability to fight infection and slows healing, so it should be controlled now.', effect: 8 }
        ],
        results: {
          update: 'Second look in theatre the next day found only a small area needing treatment. Blood pressure support was stopped on day 2.',
          labs: [ { name: 'Lactate', value: '1.4 mmol/L', flag: '', ref: '0.5–2.0' } ]
        }
      },
      {
        title: 'Recovery and the bigger picture',
        findings: 'By day 4 he is awake, eating and off blood pressure support. The wound is clean. Cultures grew a common streptococcus bacterium. His wife asks what made this so serious.',
        question: 'Which explanation and plan is most accurate?',
        timeCost: 15,
        options: [
          { text: 'It was bad luck alone; nothing about his health raised his risk, so no changes are needed after he goes home', correct: false, feedback: 'Diabetes and heavy alcohol use both raise the risk. Discussing them is part of good care.', effect: 6 },
          { text: 'Diabetes and alcohol raised his risk; plan wound care, sugar control, alcohol support and early rehab', correct: true, feedback: 'Risk factors such as diabetes and heavy drinking make deep infections more likely and more severe. Recovery involves wound care, rehabilitation and addressing these risks.', effect: -8 },
          { text: 'The cut was cleaned badly at home, so the only advice he needs is to wash any future cuts with soap and water', correct: false, feedback: 'Cleaning cuts is sensible, but most of these infections happen even after small, clean wounds. His risk factors matter more.', effect: 5 },
          { text: 'He caught it from the hospital, so he should be moved home as soon as possible to avoid getting it a second time', correct: false, feedback: 'The infection began before he came in, from the cut on his leg. Leaving early would not be safe.', effect: 6 }
        ]
      }
    ],
    disposition: { type: 'icu', label: 'Cared for in ICU after emergency surgery, then stepped down to the surgical ward for wound care and rehabilitation', maxSeverity: 45 },
    teaching: 'Necrotizing soft-tissue infections spread along the deep layers under the skin. The key warning sign is pain much worse than the skin looks, often with sepsis and rapid spread. It is a surgical emergency: early surgery plus antibiotics and ICU support saves lives, and scans should not delay theatre when the picture is clear.'
  },

  // ───────────────────────────────────────────── 4. Adrenal crisis
  {
    id: 'e-adrenal-crisis-01',
    title: 'Low blood pressure that will not come up',
    specialty: 'Endocrinology',
    difficulty: 'Expert',
    age: 38, sex: 'F',
    chiefComplaint: 'Vomiting, belly pain and feeling faint for two days',
    suspected: 'Dehydration from a stomach bug',
    finalDiagnosis: 'Adrenal crisis caused by suddenly stopping long-term steroid tablets during a stomach bug',
    presentation: 'A 38-year-old woman has had vomiting, loose stools and crampy belly pain for two days. Today she nearly fainted getting out of bed and her partner called an ambulance. She seems very tired and slow to answer. Her partner mentions she "has a long-term condition" but is not sure of the details.',
    history: {
      pmh: ['Severe asthma with several hospital stays', 'Mild eczema'],
      meds: ['Inhalers', 'Steroid tablets every day for the past year (has not taken them for 3 days because of vomiting)'],
      allergies: 'No known allergies',
      social: 'Works as a graphic designer. Does not smoke. Lives with her partner.'
    },
    canDie: true,
    startSeverity: 55,
    drift: 2.0,
    recoveredDrift: -1.2,
    vitals: {
      stable:   { hr: 80,  sbp: 118, dbp: 74, rr: 16, spo2: 98, temp: 36.9 },
      critical: { hr: 138, sbp: 68,  dbp: 38, rr: 28, spo2: 94, temp: 38.0 }
    },
    initialLabs: [
      { name: 'Sodium', value: '127 mmol/L', flag: 'L', ref: '135–145' },
      { name: 'Potassium', value: '5.6 mmol/L', flag: 'H', ref: '3.5–5.0' },
      { name: 'Glucose', value: '58 mg/dL', flag: 'L', ref: '70–140' },
      { name: 'Creatinine (kidney)', value: '1.5 mg/dL', flag: 'H', ref: '0.5–1.1' }
    ],
    initialImaging: [],
    rescue: {
      title: 'Shock deepening',
      findings: 'She is barely responding to her name. Blood pressure 70/40, heart rate 136. Fluids are running but nothing seems to help.',
      question: 'What must happen right now?',
      timeCost: 10,
      options: [
        { text: 'Call the resuscitation team, keep fluids going, and give IV steroid treatment now as directed by the team', correct: true, feedback: 'In adrenal crisis, the missing stress hormone (cortisol) must be replaced urgently. Without it, blood pressure will not respond to fluids alone.', effect: -24 },
        { text: 'Start a blood pressure–raising drip alone and wait for the morning cortisol blood test before giving steroids', correct: false, feedback: 'Never delay steroid treatment for a test in a suspected adrenal crisis. Blood can be taken first, but treatment must not wait.', effect: 20 },
        { text: 'Send her for an urgent CT of the abdomen to look for bleeding inside the belly as the cause of the low pressure', correct: false, feedback: 'Leaving the resuscitation area while in shock is dangerous, and the history already points to a missing hormone.', effect: 20 },
        { text: 'Give more sugar through the drip and recheck her blood sugar and blood pressure again in about half an hour', correct: false, feedback: 'Sugar helps the low glucose, but the root problem is missing cortisol. Waiting another half hour is unsafe.', effect: 18 }
      ]
    },
    decisions: [
      {
        title: 'First look',
        findings: 'Blood pressure 88/52, heart rate 118. She is drowsy but answers questions slowly. Her mouth is dry and her face looks rounder and fuller than in the photo on her ID card.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Put her on a monitor, place two IV lines, check a finger-prick sugar and start an IV fluid bolus', correct: true, feedback: 'Low blood pressure and drowsiness need immediate monitoring, IV access, a quick glucose check and fluids while you work out the cause.', effect: -8 },
          { text: 'Give anti-sickness medicine and some oral rehydration drink, then reassess her after one hour', correct: false, feedback: 'She is drowsy with low blood pressure. Drinking is unsafe and too slow; she needs IV access and fluids now.', effect: 12 },
          { text: 'Wait for the full blood results before treating, so you are sure what is causing the low blood pressure', correct: false, feedback: 'Treat the low blood pressure while the results come back. Waiting risks her getting worse.', effect: 12 },
          { text: 'Send her for a CT scan of the abdomen first to look for a surgical cause of the vomiting and pain', correct: false, feedback: 'She is too unstable to leave the resuscitation area right now. Stabilize first.', effect: 12 }
        ],
        results: {
          update: 'Fluids running. Finger-prick sugar is low, so sugar is given through the drip.'
        }
      },
      {
        title: 'Twist — fluids are not working',
        findings: 'After a large volume of IV fluid, her blood pressure is still 86/50. Her blood tests show low sodium, high potassium and low sugar. Her partner finds her medicine bag.',
        question: 'Which detail is the most important clue?',
        timeCost: 10,
        options: [
          { text: 'Her severe asthma, which suggests the low blood pressure is from a hidden asthma attack that is draining her', correct: false, feedback: 'She is not wheezy or short of breath. Her asthma matters mainly because of the treatment she takes for it.', effect: 10 },
          { text: 'The loose stools, which suggest the low sodium and high potassium are only from fluid lost from the bowel', correct: false, feedback: 'Diarrhea usually lowers potassium, not raises it. Low sodium and low sugar with blood pressure that ignores fluids point to a hormone problem.', effect: 10 },
          { text: 'The round, full face, which suggests an underactive thyroid has slowed her body and lowered her blood pressure', correct: false, feedback: 'A round, full face in someone on long-term steroid tablets is a side effect of the steroids themselves — a clue to the real problem, not a thyroid one.', effect: 8 },
          { text: 'She stopped daily steroid tablets three days ago, so her body may lack cortisol (adrenal insufficiency)', correct: true, feedback: 'Long-term steroid tablets switch off the body’s own cortisol production. Stopping them suddenly — especially while ill — can cause an adrenal crisis.', effect: -12 }
        ]
      },
      {
        title: 'Acting on the diagnosis',
        findings: 'You suspect adrenal crisis. A blood sample for cortisol can be sent, but the result will take until tomorrow.',
        question: 'What should you do?',
        timeCost: 15,
        options: [
          { text: 'Wait for the cortisol result tomorrow so the diagnosis is confirmed before giving any steroid medicine', correct: false, feedback: 'In a suspected adrenal crisis, treatment must never wait for the result. Delay can be life-threatening.', effect: 18 },
          { text: 'Restart her usual steroid tablets by mouth now, with a sip of water, and then continue the IV fluids', correct: false, feedback: 'She is vomiting and in shock, so tablets may not be absorbed. In a crisis, steroids are given by injection or drip.', effect: 10 },
          { text: 'Send the cortisol test, then give IV steroid treatment right away as directed by the seniors', correct: true, feedback: 'Take the blood test if it does not cause delay, then give IV steroid treatment immediately. Fluids and sugar continue alongside.', effect: -16 },
          { text: 'Start a blood pressure–raising drip and hold off on steroids until the endocrinology team sees her', correct: false, feedback: 'Blood pressure medicines often fail in adrenal crisis because the missing cortisol is what the blood vessels need to respond.', effect: 14 }
        ],
        results: {
          update: 'IV steroid treatment given. Within an hour her blood pressure rises to 104/64 and she is more alert.',
          labs: [ { name: 'Glucose', value: '96 mg/dL', flag: '', ref: '70–140' } ]
        }
      },
      {
        title: 'Watching the salts',
        findings: 'She is improving. Repeat bloods show sodium 129 and potassium 5.2. The nurse asks whether to give extra salt to bring the sodium up quickly.',
        question: 'What is the right approach to her sodium?',
        timeCost: 20,
        options: [
          { text: 'Correct the sodium as fast as possible with very salty fluids, so it is back to normal within a few hours', correct: false, feedback: 'Raising sodium too quickly can harm the brain. It should rise slowly and steadily, with frequent checks.', effect: 14 },
          { text: 'Ignore the sodium completely, because it will always fix itself once the steroid treatment has been given', correct: false, feedback: 'Sodium often improves with treatment, but it still needs regular checks to make sure it is not rising too quickly.', effect: 8 },
          { text: 'Give a water tablet to remove the extra potassium and stop the sodium falling any lower over the next day', correct: false, feedback: 'A water tablet would worsen dehydration and low blood pressure. Steroid treatment and fluids usually fix both salts.', effect: 12 },
          { text: 'Continue steroids and fluids, and check sodium every few hours so it rises gradually', correct: true, feedback: 'Steroids and fluids usually correct both sodium and potassium. Checking often makes sure the sodium does not rise too fast.', effect: -10 }
        ],
        results: {
          update: 'Sodium rising slowly. Potassium is back to normal by the evening.',
          labs: [ { name: 'Potassium', value: '4.6 mmol/L', flag: '', ref: '3.5–5.0' } ]
        }
      },
      {
        title: 'Where should she go?',
        findings: 'Blood pressure is now 110/70 and she is talking normally, but she is still vomiting a little and needs IV steroid treatment for now.',
        question: 'What is the right place for her ongoing care?',
        timeCost: 20,
        options: [
          { text: 'Discharge home with her old tablets restarted, because her blood pressure is now completely normal', correct: false, feedback: 'She still cannot keep things down, so tablets may not work. She needs IV treatment in hospital a little longer.', effect: 14 },
          { text: 'Admit to a medical ward with the endocrine team, continuing IV steroids until she can take tablets', correct: true, feedback: 'She needs hospital care until the vomiting stops and she can reliably take steroid tablets again, guided by the hormone specialists.', effect: -10 },
          { text: 'Admit to the ICU for several days of strong blood pressure medicines through a central line', correct: false, feedback: 'Her blood pressure has already recovered with steroid treatment, so ICU-level support is no longer needed.', effect: 4 },
          { text: 'Keep her in the ER waiting room overnight for observation and decide about admission in the morning', correct: false, feedback: 'A waiting room cannot give IV steroids and close monitoring. She needs a proper ward bed.', effect: 10 }
        ]
      },
      {
        title: 'Preventing the next crisis',
        findings: 'Two days later she is eating and back on tablets. She says she stopped the steroids because "you shouldn’t take medicine on an empty stomach while vomiting."',
        question: 'What is the most important teaching before she leaves?',
        timeCost: 15,
        options: [
          { text: 'Stop the steroid tablets entirely after discharge, since they were the cause of this whole problem', correct: false, feedback: 'Stopping suddenly is exactly what caused the crisis. Any reduction must be slow and guided by her doctors.', effect: 14 },
          { text: 'Take the tablets only on days when she feels unwell, and skip them on days when she feels healthy', correct: false, feedback: 'Her body depends on the daily tablets. Skipping doses can trigger another crisis.', effect: 12 },
          { text: 'Never stop steroids suddenly, follow “sick day rules”, and carry a steroid alert card', correct: true, feedback: 'People on long-term steroids need written sick day rules, an emergency injection plan if advised, and a card or bracelet so others know in an emergency.', effect: -8 },
          { text: 'Switch to a herbal remedy for her asthma instead, so she will never need steroid tablets again', correct: false, feedback: 'Herbal remedies are not a safe replacement and stopping steroids suddenly is dangerous.', effect: 12 }
        ]
      }
    ],
    disposition: { type: 'ward', label: 'Admitted to the medical ward under endocrinology, discharged with sick day rules and a steroid alert card', maxSeverity: 35 },
    teaching: 'Long-term steroid tablets switch off the body’s own cortisol production. Stopping them suddenly, especially during an illness, can cause an adrenal crisis: low blood pressure that does not respond to fluids, low sodium and low sugar (potassium is more often high when the adrenal gland itself is damaged). Treatment must not wait for tests — IV steroid treatment is given right away, along with fluids and sugar.'
  },

  // ───────────────────────────────────────────── 5. Kidney stone → infected obstructed kidney twist
  {
    id: 'e-kidney-stone-01',
    title: 'Severe pain in the side that comes in waves',
    specialty: 'Emergency Medicine',
    difficulty: 'Intermediate',
    age: 34, sex: 'M',
    chiefComplaint: 'Sudden severe left side and back pain with vomiting',
    suspected: 'Possible kidney stone',
    finalDiagnosis: 'Left ureteric stone causing a blocked, infected kidney (obstructed pyelonephritis)',
    presentation: 'A 34-year-old man woke at 5 a.m. with sudden, severe pain in his left side and back. The pain comes in waves, spreading down toward his groin, and he cannot keep still. He has vomited twice. He noticed his urine looks slightly pink.',
    history: {
      pmh: ['None'],
      meds: ['None'],
      allergies: 'No known allergies',
      social: 'Works long shifts as a chef in a hot kitchen and drinks little water. Does not smoke.'
    },
    canDie: false,
    maxSeverity: 60,
    startSeverity: 32,
    drift: 0.6,
    recoveredDrift: -1.5,
    vitals: {
      stable:   { hr: 78,  sbp: 126, dbp: 78, rr: 15, spo2: 99, temp: 36.9 },
      critical: { hr: 122, sbp: 104, dbp: 62, rr: 24, spo2: 97, temp: 39.0 }
    },
    initialLabs: [
      { name: 'Urine dipstick — blood', value: 'Positive', flag: 'H', ref: 'Negative' },
      { name: 'Urine dipstick — nitrites', value: 'Negative', flag: '', ref: 'Negative' },
      { name: 'Creatinine (kidney)', value: '1.1 mg/dL', flag: '', ref: '0.7–1.2' },
      { name: 'White blood cells', value: '10.2 ×10⁹/L', flag: '', ref: '4.0–11.0' }
    ],
    initialImaging: [],
    decisions: [
      {
        title: 'First look',
        findings: 'He is pacing and cannot lie still. Heart rate 104, blood pressure 142/88, temperature 36.9 °C. His belly is soft, and tapping over the left lower back is painful.',
        question: 'What should you do first?',
        timeCost: 10,
        options: [
          { text: 'Give pain relief and anti-sickness medicine, and check his urine and kidney blood tests', correct: true, feedback: 'Kidney stone pain is among the worst pains people feel. Good pain relief comes first, along with a urine test and kidney function check.', effect: -10 },
          { text: 'Ask him to lie completely still on the bed, as moving about tends to make kidney pain worse', correct: false, feedback: 'People with kidney stones often cannot keep still. Moving does not harm him; he needs pain relief.', effect: 5 },
          { text: 'Hold all pain medicine until the scan is done, so the result is not hidden by the pain relief', correct: false, feedback: 'Pain relief does not hide what a scan shows. Leaving him in severe pain is unnecessary.', effect: 7 },
          { text: 'Give him several litres of water to drink at once to help flush the stone out straight away', correct: false, feedback: 'Forcing lots of fluid does not help the stone pass faster and he is vomiting.', effect: 5 }
        ],
        results: {
          update: 'Pain eases considerably after medicine. Urine shows blood but no clear signs of infection.'
        }
      },
      {
        title: 'Choosing a scan',
        findings: 'He is much more comfortable. He has never had a stone before. His blood tests and kidney function are normal.',
        question: 'Which test best confirms a kidney stone?',
        timeCost: 20,
        options: [
          { text: 'A plain X-ray of the abdomen, since every type of kidney stone shows up clearly on it', correct: false, feedback: 'Many stones are hard to see on a plain X-ray, so it often misses them.', effect: 5 },
          { text: 'A low-dose CT scan without contrast dye, to find the stone and check for blockage', correct: true, feedback: 'A non-contrast low-dose CT is very accurate for kidney stones. Ultrasound is also a good option, especially to avoid radiation in younger or pregnant patients.', effect: -8 },
          { text: 'An MRI scan of the whole spine, because the back pain may be coming from a slipped disc', correct: false, feedback: 'Pain in waves with blood in the urine points to the kidney, not the spine.', effect: 5 },
          { text: 'A camera test into the bladder straight away, to look for a stone from the inside first', correct: false, feedback: 'That is an invasive test for specialists, not the first step. A scan comes first.', effect: 6 }
        ],
        results: {
          update: 'CT result available.',
          imaging: [ { name: 'Low-dose CT (kidneys, ureters, bladder)', result: 'A 5 mm stone in the lower left ureter (the tube from the kidney to the bladder). The left kidney is mildly swollen from the blockage.' } ]
        }
      },
      {
        title: 'Plan for a small stone',
        findings: 'The stone is small and his pain is controlled. He has no fever and his kidney function is normal.',
        question: 'What is the most suitable plan?',
        timeCost: 15,
        options: [
          { text: 'Book an urgent operation tonight to remove the stone, since every kidney stone needs surgery', correct: false, feedback: 'Most small stones pass by themselves with time. Surgery is for large stones, infection or uncontrolled pain.', effect: 6 },
          { text: 'Admit him for a week of IV fluids to push the stone out more quickly than drinking can manage', correct: false, feedback: 'Lots of IV fluid does not speed up stone passage and a week in hospital is not needed.', effect: 5 },
          { text: 'Plan home with pain relief, a medicine to relax the ureter, and a urology clinic follow-up', correct: true, feedback: 'Small stones often pass on their own. Pain relief, sometimes a medicine that relaxes the ureter, and urology follow-up is a common plan.', effect: -8 },
          { text: 'Discharge him with no follow-up, because the stone is small and will definitely pass in a day', correct: false, feedback: 'Small stones usually pass, but not always. Follow-up checks that it has gone and the kidney is fine.', effect: 5 }
        ]
      },
      {
        title: 'Twist — a new fever',
        findings: 'While waiting for his discharge letter, he starts shivering. Temperature 38.7 °C, heart rate 112, blood pressure 112/68. A repeat urine test now shows white cells.',
        question: 'How does this change things?',
        timeCost: 15,
        options: [
          { text: 'Discharge as planned with antibiotic tablets, as a fever is common while a stone is passing', correct: false, feedback: 'Fever with a blocking stone is not normal. Infection trapped behind a blockage can quickly lead to sepsis.', effect: 14 },
          { text: 'Likely infected, blocked kidney: start IV antibiotics and call urology to drain it now', correct: true, feedback: 'A stone blocking an infected kidney is an emergency. Antibiotics alone are not enough — the blockage must be relieved by urology, usually with a tube.', effect: -12 },
          { text: 'Give a fever-lowering medicine and recheck his temperature in a few hours before deciding', correct: false, feedback: 'Lowering the fever hides the problem but does not treat the trapped infection.', effect: 10 },
          { text: 'Give more pain relief and repeat the CT scan tomorrow to see whether the stone has moved on', correct: false, feedback: 'The problem now is infection behind the blockage, which cannot wait until tomorrow.', effect: 10 }
        ],
        results: {
          update: 'Blood cultures and IV antibiotics given. Urology accepts him for urgent drainage.',
          labs: [
            { name: 'White blood cells', value: '15.9 ×10⁹/L', flag: 'H', ref: '4.0–11.0' },
            { name: 'Lactate', value: '2.2 mmol/L', flag: 'H', ref: '0.5–2.0' }
          ]
        }
      },
      {
        title: 'After drainage',
        findings: 'Urology placed a thin tube to drain the blocked kidney. Next morning his temperature is 37.4 °C and he feels better. The stone is still in place.',
        question: 'What is the best ongoing plan?',
        timeCost: 20,
        options: [
          { text: 'Admit to the urology ward on IV antibiotics, and plan to remove the stone once the infection clears', correct: true, feedback: 'The infection is treated first; the stone is dealt with later once he is well. He also needs advice on drinking more fluids to prevent new stones.', effect: -8 },
          { text: 'Remove the drainage tube now and send him home, since his fever has gone and he feels much better', correct: false, feedback: 'The stone is still there. Removing the drain too early could allow the blockage and infection to return.', effect: 10 },
          { text: 'Remove the stone in a long operation right away today, even though the infection is still settling', correct: false, feedback: 'Operating on the stone during an active infection raises risk. It is usually done once the infection has cleared.', effect: 6 },
          { text: 'Stop the antibiotics now that the fever has settled, and watch him for a day on the ward without them', correct: false, feedback: 'A kidney infection needs a full course of antibiotics, even when the fever settles quickly.', effect: 8 }
        ]
      }
    ],
    disposition: { type: 'ward', label: 'Admitted to urology after kidney drainage; stone treatment planned once infection clears', maxSeverity: 30 },
    teaching: 'Kidney stones cause sudden severe flank pain that comes in waves, often with blood in the urine. Good pain relief comes first, and a low-dose CT (or ultrasound) confirms the stone. Most small stones pass by themselves, but fever with a blocking stone means an infected, blocked kidney — an emergency that needs antibiotics and urgent drainage by urology.'
  }
);
