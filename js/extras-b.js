// Case extras (tests, imaging, triage, conversations) for cases in cases-c.js and cases-d.js.
// See EXTRAS_SCHEMA.md for the format.
window.CASE_EXTRAS = window.CASE_EXTRAS || {};

// ---------------------------------------------------------------------------
// c-trauma-spleen-01 — Cyclist hit by a car (splenic laceration)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['c-trauma-spleen-01'] = {
  esi: 2,
  esiWhy: 'A high-energy crash with left rib and belly pain and a fast pulse is high risk for hidden bleeding, even though he is talking and his blood pressure is still normal.',
  tests: {
    us_bedside: { useful: true, report: 'FAST scan positive: free fluid around the spleen, between the spleen and the left kidney. No fluid around the heart.' },
    cbc: { useful: true,
      results: [
        { name: 'Hemoglobin', value: '14.1 g/dL', flag: '', ref: '13.5–17.5' },
        { name: 'White blood cells', value: '13.2 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
        { name: 'Platelets', value: '248 ×10⁹/L', flag: '', ref: '150–400' }
      ],
      stages: [
        { from: 2, results: [
          { name: 'Hemoglobin', value: '13.4 g/dL', flag: 'L', ref: '13.5–17.5' },
          { name: 'White blood cells', value: '13.6 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
          { name: 'Platelets', value: '236 ×10⁹/L', flag: '', ref: '150–400' }
        ] },
        { from: 4, results: [
          { name: 'Hemoglobin', value: '9.8 g/dL', flag: 'L', ref: '13.5–17.5' },
          { name: 'White blood cells', value: '14.0 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
          { name: 'Platelets', value: '182 ×10⁹/L', flag: '', ref: '150–400' }
        ] }
      ] },
    lactate: { useful: true,
      results: [ { name: 'Lactate', value: '2.6 mmol/L', flag: 'H', ref: '0.5–2.0' } ],
      stages: [ { from: 4, results: [ { name: 'Lactate', value: '4.8 mmol/L', flag: 'H', ref: '0.5–2.0' } ] } ] },
    typecross: { useful: true, results: [
      { name: 'Blood group', value: 'O positive', flag: '', ref: '—' },
      { name: 'Antibody screen', value: 'Negative', flag: '', ref: 'Negative' },
      { name: 'Crossmatched red cell units', value: 'Ready', flag: '', ref: '—' }
    ] },
    coag: { useful: true, results: [
      { name: 'INR (clotting time)', value: '1.1', flag: '', ref: '0.9–1.2' },
      { name: 'Fibrinogen', value: '2.6 g/L', flag: '', ref: '2.0–4.0' }
    ] },
    ct_abd: { useful: true, report: 'Deep laceration of an enlarged spleen with a large amount of blood around it. Liver and kidneys intact. Two left lower rib fractures.' },
    cxr: { useful: true, report: 'Fractures of two left lower ribs. No collapsed lung and no blood around the lungs. Heart and middle of the chest look normal.' },
    ct_head: { useful: false, why: 'He wore a helmet, never lost consciousness, and is fully alert with a normal neurological exam, so a head scan adds radiation without changing his care.' },
    mri: { useful: false, report: 'Torn, enlarged spleen with blood around it — the same answer a CT gives much faster.', why: 'An MRI takes far too long for a patient who may be bleeding inside; ultrasound and a quick CT answer the question.' },
    dimer: { useful: false, results: [ { name: 'D-dimer', value: 'Raised', flag: 'H', ref: 'Negative' } ], why: 'D-dimer is raised after any injury or bleeding, so it tells you nothing useful here.' }
  },
  talk: {
    afterDecision: 4,
    who: 'The patient',
    title: 'I feel okay — do I need surgery?',
    situation: 'The surgeon has just said he needs an operation on his spleen. He says, "Earlier I felt totally fine. Can’t you just give me more blood and let it heal by itself? I’ve never had surgery."',
    question: 'How do you respond?',
    options: [
      { text: 'Explain that his spleen is still bleeding even with blood transfusions, so stopping it in theatre is the safe choice, and ask what worries him most.', correct: true,
        feedback: 'Honest and clear: he hears why surgery is needed now, and inviting his worries lets the team address fear before consent.' },
      { text: 'Tell him that young people always recover well, so he doesn’t need to worry about anything at all, and the surgeons will take care of everything for him.', correct: false,
        feedback: 'False reassurance skips over real risks and leaves him unprepared; patients deserve honest information.' },
      { text: 'Agree to keep trying more blood for a few hours to see if the bleeding stops on its own, since he feels nervous.', correct: false,
        feedback: 'He has responded only briefly to blood; delaying surgery to avoid an uncomfortable talk puts his life at risk.' },
      { text: 'Say the surgeons have already made the decision, so there is no point discussing it further, and ask him to sign the form.', correct: false,
        feedback: 'Shutting down questions removes his say in his own care and increases fear and mistrust.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// c-trauma-headbleed-01 — Minor fall, bumped head (subdural on a blood thinner)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['c-trauma-headbleed-01'] = {
  esi: 2,
  esiWhy: 'Although she looks well, an older adult on a blood thinner who has hit her head is high risk for bleeding inside the skull and should not wait.',
  tests: {
    ct_head: { useful: true, report: 'Thin crescent of blood over the right side of the brain (small subdural hematoma). No shift of the brain.',
      stages: [ { from: 3, report: 'The subdural hematoma has grown and is now pushing the brain slightly to the left.' } ] },
    coag: { useful: true, results: [
      { name: 'INR (clotting time)', value: '2.8', flag: 'H', ref: '0.9–1.1 (not on thinner)' }
    ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '12.6 g/dL', flag: '', ref: '12.0–15.5' },
      { name: 'White blood cells', value: '7.4 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Platelets', value: '210 ×10⁹/L', flag: '', ref: '150–400' }
    ] },
    glucose: { useful: true, results: [ { name: 'Glucose (finger-prick)', value: '104 mg/dL', flag: '', ref: '70–110' } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '138 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.2 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '0.9 mg/dL', flag: '', ref: '0.5–1.1' }
    ] },
    ecg: { useful: true, report: 'Atrial fibrillation (irregular rhythm) at a controlled rate of about 78. No signs of a heart attack.', image: 'ecg-afib' },
    typecross: { useful: true, results: [
      { name: 'Blood group', value: 'A positive', flag: '', ref: '—' },
      { name: 'Antibody screen', value: 'Negative', flag: '', ref: 'Negative' }
    ] },
    mri: { useful: false, report: 'Thin layer of blood over the right side of the brain — the same answer the CT gives more quickly.', why: 'CT finds bleeding faster and is easier to get in an emergency; an MRI would delay the answer.' },
    cxr: { useful: false, why: 'She has no chest pain, cough or breathing problems, so a chest X-ray does not help with a head injury.' },
    xr_limb: { useful: false, why: 'She has no limb pain or swelling, and the real danger here is inside the head, not in her bones.' }
  },
  talk: {
    afterDecision: 2,
    who: 'The patient',
    title: 'But my cat needs feeding',
    situation: 'You explain the scan found a small bleed. She frowns: "It’s only a tiny one, and I feel perfectly well. My cat hasn’t been fed since this morning — can’t I come back tomorrow?"',
    question: 'How do you respond?',
    options: [
      { text: 'Explain a bleed on a blood thinner can grow even if she feels fine, so she should stay; ask if her daughter can feed the cat.', correct: true,
        feedback: 'You take her worry seriously, explain the real risk simply, and solve the practical problem that is keeping her from staying.' },
      { text: 'Let her go home if she promises to come straight back tomorrow morning, since she is alert and seems well.', correct: false,
        feedback: 'Looking well does not mean the bleed is safe; she needs reversal of her blood thinner and close watching in hospital.' },
      { text: 'Tell her firmly that she has no choice and that the cat is not a medical concern, then move on to the next patient waiting.', correct: false,
        feedback: 'Dismissing what matters to her damages trust and does not explain why staying is important.' },
      { text: 'Avoid mentioning the bleed so she won’t panic, and just say the doctors want to keep her a little longer.', correct: false,
        feedback: 'She has the right to know her diagnosis; hiding it removes her ability to make informed decisions.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// c-ortho-hip-01 — Fall at home, cannot stand (hip fracture, slow heart rate)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['c-ortho-hip-01'] = {
  esi: 2,
  esiWhy: 'She is 84, in severe pain with a likely broken hip after an unexplained fall and hours on the floor, which is high risk in an older adult, so she should not wait.',
  tests: {
    xr_limb: { useful: true, report: 'Displaced fracture of the right femoral neck (the top of the thigh bone at the hip). The bones look thin, in keeping with osteoporosis.', image: 'xr-hip-fracture' },
    ecg: { useful: true, report: 'Slow but regular rhythm (sinus bradycardia) at about 52 beats per minute. No heart block and no signs of a heart attack.', image: 'ecg-sinus-brady',
      stages: [ { from: 4, report: 'Regular rhythm at about 62 beats per minute now that the heart-slowing tablet is paused.' } ] },
    ck: { useful: true, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '890 U/L', flag: 'H', ref: '30–150' } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '137 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.6 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Urea (BUN)', value: '32 mg/dL', flag: 'H', ref: '7–20' },
      { name: 'Creatinine (kidney)', value: '1.4 mg/dL', flag: 'H', ref: '0.5–1.1' }
    ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '11.4 g/dL', flag: 'L', ref: '12.0–15.5' },
      { name: 'White blood cells', value: '9.6 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Platelets', value: '232 ×10⁹/L', flag: '', ref: '150–400' }
    ] },
    glucose: { useful: true, results: [ { name: 'Glucose (finger-prick)', value: '98 mg/dL', flag: '', ref: '70–110' } ] },
    ua: { useful: true, results: [
      { name: 'Appearance', value: 'Dark, concentrated', flag: 'H', ref: 'Pale yellow' },
      { name: 'White cells / nitrites', value: 'Negative', flag: '', ref: 'Negative' }
    ] },
    coag: { useful: true, results: [ { name: 'INR (clotting time)', value: '1.0', flag: '', ref: '0.9–1.2' } ] },
    typecross: { useful: true, results: [
      { name: 'Blood group', value: 'A positive', flag: '', ref: '—' },
      { name: 'Antibody screen', value: 'Negative', flag: '', ref: 'Negative' }
    ] },
    mri: { useful: false, report: 'Broken right hip (femoral neck), as already seen on the X-ray.', why: 'The X-ray already clearly shows the fracture, so an MRI would only add delay before surgery.' },
    ct_abd: { useful: false, why: 'She has no belly pain or tenderness; scanning her abdomen adds radiation without answering any question.' },
    dimer: { useful: false, results: [ { name: 'D-dimer', value: 'Raised', flag: 'H', ref: 'Negative' } ], why: 'D-dimer is almost always raised after a fracture and a long lie, so it cannot tell you anything useful here.' }
  },
  talk: {
    afterDecision: 3,
    who: 'Her daughter',
    title: 'Is this dementia now?',
    situation: 'Her daughter arrives and finds her mother confused, thinking she is at school. She is upset: "Mum was sharp yesterday. Has the fall given her dementia? Is she ever going to be herself again?"',
    question: 'How do you respond?',
    options: [
      { text: 'Explain it looks like delirium, a common sudden confusion in hospital that often improves, and that her being here helps.', correct: true,
        feedback: 'You name the problem in plain words, give honest hope, and invite her to be part of the care, which really does help delirium.' },
      { text: 'Tell her it is probably the start of dementia, since memory problems often get worse quickly at this age and after a fall.', correct: false,
        feedback: 'A sudden change over hours points to delirium, not dementia; this answer is inaccurate and frightening.' },
      { text: 'Say the confusion is simply from the pain medicine she was given earlier, so it will definitely be gone completely by tonight.', correct: false,
        feedback: 'Promising a quick, certain recovery is not honest; delirium has several causes and can last days.' },
      { text: 'Suggest she waits outside in the family room until her mother has calmed down, so that neither of them gets more upset.', correct: false,
        feedback: 'A familiar face is one of the best treatments for delirium; sending family away usually makes it worse.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// c-peds-croup-01 — Toddler with a barking cough (croup)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['c-peds-croup-01'] = {
  esi: 4,
  esiWhy: 'He is pink, alert and only noisy when upset, so he is stable; he needs a medicine and a short period of watching but no tests or scans.',
  tests: {
    cxr: { useful: false, why: 'Croup is diagnosed by the barking cough and story; an X-ray adds radiation and upsets the child without changing treatment.' },
    cbc: { useful: false, why: 'A blood test means a needle that can make a crying child’s breathing worse, and the result would not change croup care.' },
    abg: { useful: false, why: 'His oxygen level is already shown by the finger probe; a painful blood gas is not needed for mild croup.' },
    cultures: { useful: false, why: 'Croup is caused by a virus and he does not look seriously unwell, so blood cultures will not help.' },
    crp: { useful: false, why: 'An inflammation marker cannot tell croup from other causes and would not change the plan for a happy, well-looking toddler.' }
  },
  talk: {
    afterDecision: 4,
    who: 'His mother',
    title: 'What if it happens again tonight?',
    situation: 'As you prepare to send him home, his mother looks worried. "That barking noise terrified me. What if he wakes up like that again at 3 a.m.? How will I know if it’s serious?"',
    question: 'How do you respond?',
    options: [
      { text: 'Explain croup is often worse at night and describe when to come back, like noisy breathing at rest or pulling in.', correct: true,
        feedback: 'You normalise what may happen and give clear warning signs, so she feels able to cope and knows when to return.' },
      { text: 'Reassure her that croup is never dangerous, so there is no reason to come back even if the noise returns tonight.', correct: false,
        feedback: 'Croup can occasionally become severe; parents need clear return advice, not false reassurance.' },
      { text: 'Suggest he stays in hospital overnight just in case, since explaining all the warning signs to a worried parent takes a long time.', correct: false,
        feedback: 'He is well enough to go home; admitting him to avoid a conversation is not good care.' },
      { text: 'Tell her to give him a cough syrup and sit with him in a steamy bathroom if the barking cough comes back during the night.', correct: false,
        feedback: 'Cough syrups are not recommended for toddlers, and steam has not been shown to help croup.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// c-peds-intuss-01 — Baby with vomiting and fussiness (intussusception)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['c-peds-intuss-01'] = {
  esi: 2,
  esiWhy: 'A pale, drowsy infant with signs of dehydration and episodes of severe pain is high risk and should be seen right away.',
  tests: {
    us_formal: { useful: true, report: 'Target-shaped mass in the right upper abdomen consistent with intussusception. Blood flow present. No free fluid.' },
    us_bedside: { useful: true, report: 'A possible target-shaped mass in the right upper belly. A formal ultrasound by an experienced operator is needed to confirm it.' },
    glucose: { useful: true, results: [ { name: 'Glucose (finger-prick)', value: '72 mg/dL', flag: '', ref: '60–110' } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '136 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.3 mmol/L', flag: '', ref: '3.5–5.5' },
      { name: 'Bicarbonate', value: '19 mmol/L', flag: 'L', ref: '20–28' },
      { name: 'Urea (BUN)', value: '19 mg/dL', flag: 'H', ref: '5–18' },
      { name: 'Creatinine (kidney)', value: '0.3 mg/dL', flag: '', ref: '0.2–0.4' }
    ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '11.6 g/dL', flag: '', ref: '10.5–13.5' },
      { name: 'White blood cells', value: '12.8 ×10⁹/L', flag: '', ref: '6.0–17.5' },
      { name: 'Platelets', value: '386 ×10⁹/L', flag: '', ref: '150–450' }
    ] },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '1.9 mmol/L', flag: '', ref: '0.5–2.0' } ] },
    ct_abd: { useful: false, report: 'Bowel telescoped into itself in the right upper belly (intussusception) — the same answer an ultrasound gives without radiation.', why: 'Ultrasound diagnoses intussusception without radiation; a CT gives a baby a large radiation dose and may need sedation.' },
    xr_abd: { useful: false, why: 'A plain belly X-ray often looks normal in intussusception, so it cannot rule it in or out and only adds radiation.' },
    cultures: { useful: false, why: 'He has no fever and the story points to a bowel blockage, not a bloodstream infection.' }
  },
  talk: {
    afterDecision: 3,
    who: 'His father',
    title: 'Will it hurt him?',
    situation: 'You explain that the radiology team will try to push the bowel back into place with an air or fluid enema. His father asks, "Will it hurt him? And what happens if it doesn’t work?"',
    question: 'How do you respond?',
    options: [
      { text: 'Say it can be uncomfortable but is quick and usually works; a small risk of a tear means surgeons stay ready.', correct: true,
        feedback: 'Honest about discomfort, success and the small risk, so the parents can give real informed consent.' },
      { text: 'Promise him that it is completely painless and always works the first time, so there is nothing at all to worry about.', correct: false,
        feedback: 'Overpromising is not honest; parents trust you less if things turn out differently.' },
      { text: 'Tell him the details are too technical to explain and the radiology team will handle all of it, so he should just sign.', correct: false,
        feedback: 'Parents must understand a procedure before agreeing to it; you can explain it in simple words.' },
      { text: 'Explain that if the enema fails they will just wait a day or two and try again, since teams try to avoid surgery on babies.', correct: false,
        feedback: 'A failed enema may need prompt surgery, not waiting, because the trapped bowel can lose its blood supply.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// c-em-anaphylaxis-01 — Hives and wheeze at a party (anaphylaxis, biphasic)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['c-em-anaphylaxis-01'] = {
  esi: 1,
  esiWhy: 'Throat tightness, wheeze and low blood pressure after eating mean anaphylaxis, which needs life-saving epinephrine immediately.',
  tests: {
    cxr: { useful: false, why: 'Her wheeze is from allergic airway narrowing; an X-ray will not change the urgent treatment and delays it.' },
    ct_chest: { useful: false, why: 'A CT would move an unstable patient away from the resus room and gives radiation without helping the diagnosis.' },
    cbc: { useful: false, why: 'Anaphylaxis is diagnosed at the bedside; a blood count does not change treatment.' },
    dimer: { useful: false, why: 'Her symptoms clearly fit an allergic reaction, not a blood clot, so a D-dimer could only mislead.' },
    abg: { useful: false, why: 'The finger oxygen probe and her breathing tell you what you need; a painful blood gas would not change treatment.' }
  },
  talk: {
    afterDecision: 5,
    who: 'The patient',
    title: 'I don’t want to carry it',
    situation: 'You hand her the auto-injector plan. She looks down and says quietly, "Everyone will think I’m weird if I carry that around. I’ll just be careful what I eat."',
    question: 'How do you respond?',
    options: [
      { text: 'Say her feelings make sense, explain today showed how fast it can turn serious, and talk about easy ways to carry it.', correct: true,
        feedback: 'You respect how a teenager feels while being honest about the danger, and help her find a plan she will actually follow.' },
      { text: 'Tell her that if she refuses to carry it she could easily die next time, so she has no choice in the matter.', correct: false,
        feedback: 'Scaring a teen often leads to shutting down; honesty works better with empathy and problem-solving.' },
      { text: 'Agree that being careful with food is enough, as long as she reads labels closely and checks ingredients at every party.', correct: false,
        feedback: 'Accidental exposure happens even to careful people; today she reacted to a cookie, so she needs epinephrine with her.' },
      { text: 'Move past what she said and go through the injector steps with her mother instead, since parents are in charge of teen care.', correct: false,
        feedback: 'She is 15 and will be on her own at school and parties; she needs to be included in her own care.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// d-cardio-dissection-01 — Tearing chest pain to the back (Type A dissection)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['d-cardio-dissection-01'] = {
  esi: 2,
  esiWhy: 'Sudden severe chest pain going to the back in a pale, sweaty man is very high risk and must be seen immediately, even though he is still breathing well with a high blood pressure.',
  tests: {
    ecg: { useful: true, report: 'Fast regular rhythm with signs of a thickened heart muscle from long-term high blood pressure. No ST elevation.', image: 'ecg-sinus-tach' },
    cxr: { useful: true, report: 'The middle part of the chest (mediastinum) looks wider than expected. Lungs clear.', image: 'cxr-wide-mediastinum' },
    ct_chest: { useful: true, report: 'CT angiogram: a tear in the inner wall of the aorta starting just above the heart (Type A dissection) and extending down into the chest. The branch to the left arm is partly narrowed. Small amount of fluid around the heart.' },
    us_bedside: { useful: true, report: 'The first part of the aorta looks widened. A small amount of fluid around the heart, which is still filling normally.',
      stages: [ { from: 4, report: 'More fluid around the heart than before, beginning to squeeze the heart. The first part of the aorta looks widened.' } ] },
    troponin: { useful: true, results: [ { name: 'Troponin (heart muscle damage marker)', value: 'Normal', flag: '', ref: 'Normal: very low' } ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '13.6 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'White blood cells', value: '10.2 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Platelets', value: '224 ×10⁹/L', flag: '', ref: '150–400' }
    ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '140 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.1 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '1.1 mg/dL', flag: '', ref: '0.7–1.2' }
    ] },
    coag: { useful: true, results: [ { name: 'INR (clotting time)', value: '1.0', flag: '', ref: '0.9–1.2' } ] },
    typecross: { useful: true, results: [
      { name: 'Blood group', value: 'B positive', flag: '', ref: '—' },
      { name: 'Crossmatched red cell units', value: 'Ready for theatre', flag: '', ref: '—' }
    ] },
    echo: { useful: true, report: 'The first part of the aorta is widened, with a flap from the tear seen inside it. Small amount of fluid around the heart; the heart squeezes normally.',
      stages: [ { from: 4, report: 'More fluid around the heart than before, beginning to squeeze the heart. The first part of the aorta is widened with a flap inside it.' } ] },
    dimer: { useful: false, results: [ { name: 'D-dimer', value: 'Raised', flag: 'H', ref: 'Negative' } ], why: 'It would probably be raised, but it cannot confirm a dissection; his high-risk features already mean he needs a CT now.' },
    mri: { useful: false, report: 'Tear in the wall of the aorta just above the heart — the same answer the CT gives in minutes.', why: 'An MRI takes too long and moves a high-risk patient far from the resus team; CT gives the answer in minutes.' }
  },
  talk: {
    afterDecision: 3,
    who: 'His wife',
    title: 'Is he going to be okay?',
    situation: 'His wife has just arrived and heard the word "surgery". She grabs your arm: "Is he going to be okay? Please tell me honestly. Can I see him before he goes?"',
    question: 'How do you respond?',
    options: [
      { text: 'Find a quiet spot, explain the main artery has torn and needs emergency surgery with real risks, and take her to see him now.', correct: true,
        feedback: 'You are honest about how serious it is in simple words, and seeing him briefly matters a great deal to both of them.' },
      { text: 'Tell her he will definitely be fine because the surgeons here are excellent, so she should go and get a coffee while she waits.', correct: false,
        feedback: 'You cannot promise the outcome; false reassurance can make bad news later much harder to bear.' },
      { text: 'Go through every detail of the CT scan, the types of tear and all possible complications of surgery before she sees him.', correct: false,
        feedback: 'Too much technical detail in a crisis overwhelms people; she needs the key facts and time with him.' },
      { text: 'Say you are not allowed to discuss anything until the surgeon has finished, and ask her to wait in the main waiting room.', correct: false,
        feedback: 'Family deserve a basic, honest update now; leaving them in the dark adds fear and distrust.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// d-cardio-syncope-01 — Fainting at school assembly (vasovagal syncope)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['d-cardio-syncope-01'] = {
  esi: 4,
  esiWhy: 'She is fully recovered with normal vital signs; she needs one resource, an ECG, plus a careful history and exam.',
  tests: {
    ecg: { useful: true, report: 'Normal heart rhythm at a normal rate. Normal electrical intervals, including the QT interval. No signs of extra electrical pathways or a thickened heart muscle.', image: 'ecg-normal' },
    glucose: { useful: true, results: [ { name: 'Finger-prick blood sugar', value: '4.6 mmol/L (83 mg/dL)', flag: '', ref: '4.0–7.8 mmol/L' } ] },
    ct_head: { useful: false, why: 'She did not hit her head, recovered fully within seconds and has a normal exam, so a scan adds radiation without benefit.' },
    echo: { useful: false, why: 'With a normal exam, normal ECG and no red flags such as fainting during exercise, a heart scan is not needed.' },
    troponin: { useful: false, why: 'She has no chest pain and a normal ECG; a simple faint does not damage the heart muscle.' },
    dimer: { useful: false, why: 'Nothing suggests a blood clot, and a D-dimer could give a false alarm that leads to unnecessary scans.' }
  },
  talk: {
    afterDecision: 3,
    who: 'The patient',
    title: 'Is something wrong with my heart?',
    situation: 'After her ECG, she looks worried. "My friend said people can just drop dead from heart problems. Is that what happened to me? Is my heart broken?"',
    question: 'How do you respond?',
    options: [
      { text: 'Explain her heart tracing is normal, and that heat, standing and skipping breakfast caused a common, simple faint.', correct: true,
        feedback: 'You answer her fear directly, explain the cause in words she understands, and link it to her own results.' },
      { text: 'Tell her not to listen to her friends and that teenagers never have heart problems, so she should stop worrying about it.', correct: false,
        feedback: 'This is untrue and dismissive; rare heart problems do exist, which is exactly why you checked her ECG and asked about red flags.' },
      { text: 'Say you cannot be sure yet, so she should stop all sport and exercise until she has seen a heart specialist in a few months.', correct: false,
        feedback: 'With no red flags and a normal ECG, banning sport causes needless worry and harm.' },
      { text: 'Turn to her mother and explain the result only to her, since a 15-year-old is too young to really understand heart tests.', correct: false,
        feedback: 'At 15 she can understand her own health and deserves an explanation directly.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// d-resp-pneumothorax-01 — Sudden chest pain in a tall young man (pneumothorax → tension)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['d-resp-pneumothorax-01'] = {
  esi: 2,
  esiWhy: 'Sudden chest pain with breathlessness and a low oxygen level is high risk, even though he walked in and is speaking in full sentences.',
  tests: {
    cxr: { useful: true, report: 'Large left pneumothorax: the lung has partly collapsed away from the chest wall with a visible edge. No shift of the heart or windpipe at this stage. Right lung normal.', image: 'cxr-pneumothorax-left',
      stages: [
        { from: 3, report: 'Very large left pneumothorax with the heart and windpipe pushed to the right (tension). This must be treated immediately, without waiting for imaging.', image: 'cxr-pneumothorax-left' },
        { from: 4, report: 'Chest drain in place on the left. The left lung has re-expanded. Windpipe back in the middle.', image: 'cxr-normal' }
      ] },
    us_bedside: { useful: true, report: 'No normal lung sliding on the left side, which fits air around the lung. Normal lung sliding on the right.',
      stages: [ { from: 4, report: 'Lung sliding has returned on the left with the chest drain in place. Normal lung sliding on the right.' } ] },
    ecg: { useful: true, report: 'Sinus tachycardia at about 98 beats per minute, otherwise normal.', image: 'ecg-sinus-tach',
      stages: [ { from: 3, report: 'Sinus tachycardia at about 128 beats per minute. No signs of a heart attack.', image: 'ecg-sinus-tach' },
                { from: 4, report: 'Normal sinus rhythm. Rate back to normal.', image: 'ecg-normal' } ] },
    ct_chest: { useful: false, report: 'Large collapsed left lung with air around it — the same answer the chest X-ray already gave.', why: 'The chest X-ray already shows the collapsed lung clearly, so a CT adds radiation and delay.' },
    dimer: { useful: false, why: 'His story and exam point to a collapsed lung, and he has no clot risk factors, so a D-dimer could only mislead.' },
    abg: { useful: false, why: 'The finger probe shows his oxygen level; a painful arterial test would not change treatment.' }
  },
  talk: {
    afterDecision: 4,
    who: 'The patient',
    title: 'Did someone mess up?',
    situation: 'Now comfortable with the drain in, he is still shaken. "That was terrifying. One minute I was okay and then I couldn’t breathe. Did someone mess up? Will it happen again?"',
    question: 'How do you respond?',
    options: [
      { text: 'Explain trapped air built up under pressure, a known complication; the team acted fast, and it can come back.', correct: true,
        feedback: 'You are honest about what happened and about the chance of it returning, without blame or false reassurance.' },
      { text: 'Tell him nobody made any mistakes at all and it absolutely cannot happen again now that he has a drain in.', correct: false,
        feedback: 'Pneumothorax can recur, especially in smokers; promising otherwise is not honest.' },
      { text: 'Tell him it was probably because the team did not put the drain in quickly enough, and that he could make a complaint.', correct: false,
        feedback: 'Guessing about blame without the facts is unfair and unhelpful; explain what happened and offer a proper review if he has concerns.' },
      { text: 'Change the subject and remind him that he needs to rest now and try not to worry so much about what has already happened.', correct: false,
        feedback: 'Avoiding his questions leaves him frightened and confused; he deserves a clear explanation.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// d-neuro-sah-01 — The worst headache of her life (subarachnoid hemorrhage)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['d-neuro-sah-01'] = {
  esi: 2,
  esiWhy: 'A sudden "worst ever" headache with vomiting, a stiff neck and high blood pressure could be a brain bleed, so she must be seen right away.',
  tests: {
    ct_head: { useful: true, report: 'No definite blood seen. Brain fluid spaces normal size. No mass. Reported as "no acute abnormality", but the scan was done about 12 hours after the headache began.',
      stages: [ { from: 4, report: 'The fluid spaces in the brain (ventricles) have enlarged — hydrocephalus. No new bleeding.' } ] },
    coag: { useful: true, results: [ { name: 'INR (clotting time)', value: '1.0', flag: '', ref: '0.9–1.2' } ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '13.4 g/dL', flag: '', ref: '12.0–15.5' },
      { name: 'White blood cells', value: '10.8 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Platelets', value: '245 ×10⁹/L', flag: '', ref: '150–400' }
    ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '3.9 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '0.8 mg/dL', flag: '', ref: '0.5–1.1' }
    ] },
    glucose: { useful: true, results: [ { name: 'Glucose (finger-prick)', value: '112 mg/dL', flag: 'H', ref: '70–110' } ] },
    ecg: { useful: true, report: 'Normal sinus rhythm. Some mild T-wave changes, which can be seen after bleeding around the brain. No heart attack pattern.' },
    mri: { useful: false, report: 'A small amount of blood in the fluid spaces around the brain — slower to get than the CT and lumbar puncture.', why: 'MRI is slower and harder to get in an emergency; CT, then a lumbar puncture and a CT angiogram, answer the question faster.' },
    cultures: { useful: false, why: 'She has no fever and the headache came on in seconds, which points to bleeding rather than infection.' },
    dimer: { useful: false, why: 'A D-dimer has no role in finding a brain bleed and could send you looking for a clot that is not there.' }
  },
  talk: {
    afterDecision: 3,
    who: 'The patient',
    title: 'Is this my fault?',
    situation: 'While the team prepares to treat the aneurysm, she is alert and talking clearly. She says, "My mum had a bleed like this too. Did I cause this by smoking? Will my children get it?"',
    question: 'How do you respond?',
    options: [
      { text: 'Explain it isn’t her fault, though smoking raises the risk and stopping helps; family checks are for the specialists.', correct: true,
        feedback: 'Honest about risk factors without blame, and you point her to the right team for family screening questions.' },
      { text: 'Tell her yes, this happened because she smoked, and she must stop immediately if she wants to avoid it happening again.', correct: false,
        feedback: 'Blaming a frightened patient is unkind and oversimplifies; aneurysms have several causes, including family history.' },
      { text: 'Reassure her that brain aneurysms are never passed down in families, so her children have nothing to worry about and do not need any checks.', correct: false,
        feedback: 'This is inaccurate; having two close relatives affected can raise family risk, which specialists may want to discuss.' },
      { text: 'Say these questions are not important right now and she should focus on resting before her treatment instead of worrying.', correct: false,
        feedback: 'Her worries matter; brushing them aside increases anxiety. A short, honest answer helps her rest.' }
    ]
  }
};

// ---------------------------------------------------------------------------
// d-cardio-tamponade-01 — Breathless and dizzy after a viral illness (tamponade)
// ---------------------------------------------------------------------------
window.CASE_EXTRAS['d-cardio-tamponade-01'] = {
  esi: 1,
  esiWhy: 'Low blood pressure, a fast pulse, swollen neck veins and a near-faint mean his heart is being squeezed, and he needs life-saving treatment now.',
  tests: {
    ecg: { useful: true, report: 'Fast regular rhythm. Small (low-voltage) complexes, and the size of each beat alternates slightly from beat to beat.', image: 'ecg-low-voltage',
      stages: [ { from: 3, report: 'Regular rhythm at about 92. The complexes are a little bigger than before drainage.', image: 'ecg-normal' } ] },
    us_bedside: { useful: true, report: 'Large collection of fluid all around the heart. The right-sided heart chambers are being squashed and collapse inward with each beat.',
      stages: [
        { from: 3, report: 'After drainage: only a small amount of fluid remains. The heart chambers fill normally.' },
        { from: 4, report: 'Fluid is building up around the heart again and the right side is starting to collapse inward.' }
      ] },
    echo: { useful: true, report: 'Large fluid collection around the heart with collapse of the right-sided chambers, confirming tamponade. The heart muscle itself squeezes normally.',
      stages: [
        { from: 3, report: 'Only a small amount of fluid remains around the heart. Heart chambers fill and squeeze normally.' },
        { from: 4, report: 'The fluid around the heart has built up again and is pressing on the right side of the heart.' }
      ] },
    cxr: { useful: true, report: 'The heart shadow is large and globe-shaped. Lungs are clear with no fluid congestion.', image: 'cxr-big-heart' },
    troponin: { useful: true, results: [ { name: 'Troponin (heart muscle damage marker)', value: 'Slightly raised', flag: 'H', ref: 'Normal: very low' } ] },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '3.2 mmol/L', flag: 'H', ref: '0.5–2.0' } ],
      stages: [ { from: 3, results: [ { name: 'Lactate', value: '1.6 mmol/L', flag: '', ref: '0.5–2.0' } ] } ] },
    crp: { useful: true, results: [ { name: 'C-reactive protein (inflammation)', value: '64 mg/L', flag: 'H', ref: '<5' } ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '13.9 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'White blood cells', value: '10.4 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Platelets', value: '298 ×10⁹/L', flag: '', ref: '150–400' }
    ] },
    ct_chest: { useful: false, report: 'Large fluid collection around the heart. No blood clot in the lungs.', why: 'Lying flat in a scanner is dangerous for him, and bedside ultrasound already shows the problem.' },
    dimer: { useful: false, why: 'The ultrasound has found the cause of his breathlessness; a D-dimer would only add confusion and delay.' },
    cultures: { useful: false, why: 'He has no fever and looks like a post-viral effusion; the fluid sample itself is the more useful test for infection.' }
  },
  talk: {
    afterDecision: 2,
    who: 'The patient',
    title: 'A needle near my heart?',
    situation: 'You explain that cardiology is coming to drain the fluid. He grips the bed rail: "A needle near my heart? That sounds terrifying. Can’t we try tablets first and see if it goes away?"',
    question: 'How do you respond?',
    options: [
      { text: 'Explain the fluid is squeezing his heart so tablets are too slow, and that the team uses ultrasound to guide them.', correct: true,
        feedback: 'You explain why it is urgent in plain words, reduce fear with what makes it safer, and keep him involved.' },
      { text: 'Agree to start anti-inflammatory tablets first and see whether the fluid goes down over the next day or two, since he is scared.', correct: false,
        feedback: 'His blood pressure is falling; tablets work far too slowly for tamponade, and waiting could be fatal.' },
      { text: 'Tell him it is a tiny, routine procedure with no risks whatsoever, so he really doesn’t need to think about it.', correct: false,
        feedback: 'Every procedure has some risk; honest information is needed for consent and trust.' },
      { text: 'Tell him not to worry because he will be put fully to sleep for the procedure and won’t remember anything about it afterward.', correct: false,
        feedback: 'Inaccurate and unsafe: deep sedation can make tamponade much worse, and it does not address his real fear.' }
    ]
  }
};
