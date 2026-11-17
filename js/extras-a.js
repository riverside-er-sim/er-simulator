// Case extras (triage level, orderable tests, conversation) for cases in
// cases-core.js, cases-a.js and cases-b.js. Format: see EXTRAS_SCHEMA.md.
window.CASE_EXTRAS = window.CASE_EXTRAS || {};

/* ------------------------------------------------------------------ */
/* cases-core.js                                                       */
/* ------------------------------------------------------------------ */

window.CASE_EXTRAS['core-stemi-shock'] = {
  esi: 1,
  esiWhy: 'A large heart attack with low blood pressure and cold, clammy skin is shock — he needs life-saving treatment immediately.',
  tests: {
    ecg: {
      useful: true,
      report: 'ST elevation across the front (anterior) leads with sinus tachycardia — an acute heart attack of the front wall.',
      image: 'ecg-stemi-anterior',
      stages: [
        { from: 1, report: 'Sinus tachycardia. The ST elevation in the front leads is smaller now that the artery has been opened, but changes from the heart attack remain.', image: 'ecg-stemi-anterior' },
        { from: 4, report: 'Sinus rhythm, rate 84. Settling changes over the front wall from the recent heart attack. No new ST elevation and no irregular beats.', image: 'ecg-stemi-anterior' }
      ]
    },
    troponin: {
      useful: true,
      results: [ { name: 'Troponin (heart muscle damage)', value: 'Markedly elevated', flag: 'C', ref: 'Normal: very low' } ],
      stages: [ { from: 4, results: [ { name: 'Troponin (heart muscle damage)', value: 'Elevated, trending down', flag: 'H', ref: 'Normal: very low' } ] } ]
    },
    lactate: {
      useful: true,
      results: [ { name: 'Lactate', value: '5.1 mmol/L', flag: 'C', ref: '0.5–2.0' } ],
      stages: [
        { from: 1, results: [ { name: 'Lactate', value: '4.8 mmol/L', flag: 'C', ref: '0.5–2.0' } ] },
        { from: 2, results: [ { name: 'Lactate', value: '3.9 mmol/L', flag: 'H', ref: '0.5–2.0' } ] },
        { from: 4, results: [ { name: 'Lactate', value: '1.9 mmol/L', flag: '', ref: '0.5–2.0' } ] }
      ]
    },
    bmp: {
      useful: true,
      results: [
        { name: 'Creatinine (kidney)', value: '1.3 mg/dL', flag: 'H', ref: '0.7–1.2' },
        { name: 'Potassium', value: '4.0 mmol/L', flag: '', ref: '3.5–5.0' },
        { name: 'Sodium', value: '137 mmol/L', flag: '', ref: '135–145' }
      ],
      stages: [
        { from: 2, results: [
          { name: 'Creatinine (kidney)', value: '2.1 mg/dL', flag: 'H', ref: '0.7–1.2' },
          { name: 'Potassium', value: '4.0 mmol/L', flag: '', ref: '3.5–5.0' },
          { name: 'Sodium', value: '136 mmol/L', flag: '', ref: '135–145' } ] },
        { from: 3, results: [
          { name: 'Creatinine (kidney)', value: '1.9 mg/dL', flag: 'H', ref: '0.7–1.2' },
          { name: 'Potassium', value: '3.1 mmol/L', flag: 'L', ref: '3.5–5.0' },
          { name: 'Magnesium', value: '1.4 mg/dL', flag: 'L', ref: '1.7–2.2' } ] },
        { from: 4, results: [
          { name: 'Creatinine (kidney)', value: '1.6 mg/dL (falling)', flag: 'H', ref: '0.7–1.2' },
          { name: 'Potassium', value: '4.2 mmol/L', flag: '', ref: '3.5–5.0' },
          { name: 'Magnesium', value: '2.1 mg/dL', flag: '', ref: '1.7–2.2' } ] },
        { from: 5, results: [
          { name: 'Creatinine (kidney)', value: '1.4 mg/dL', flag: 'H', ref: '0.7–1.2' },
          { name: 'Potassium', value: '4.0 mmol/L', flag: '', ref: '3.5–5.0' } ] },
        { from: 6, results: [
          { name: 'Creatinine (kidney)', value: '1.3 mg/dL', flag: 'H', ref: '0.7–1.2' },
          { name: 'Potassium', value: '4.3 mmol/L', flag: '', ref: '3.5–5.0' } ] }
      ]
    },
    cxr: {
      useful: true,
      report: 'Mild fluid congestion in both lungs from the struggling heart. No collapsed lung and no widened middle of the chest.',
      image: 'cxr-edema',
      stages: [
        { from: 4, report: 'Lungs are clear now — the earlier fluid congestion has gone. Heart size at the upper limit of normal.', image: 'cxr-normal' },
        { from: 5, report: 'Fluid congestion in both lungs with small fluid collections at the bases. No pneumonia pattern. Heart slightly enlarged.', image: 'cxr-edema' }
      ]
    },
    echo: {
      useful: true,
      report: 'The front wall of the heart barely moves. Overall pump strength is severely reduced. No fluid around the heart.',
      stages: [ { from: 4, report: 'Front wall still moves weakly, but overall pump strength has improved to moderately reduced. No fluid around the heart.' } ]
    },
    ct_chest: { useful: false, why: 'The ECG already shows the heart attack; a CT would delay opening the artery and the contrast dye could strain his kidneys.' },
    dimer: { useful: false, why: 'The diagnosis is already clear from the ECG, and a D-dimer is often raised after a heart attack anyway, so it would only confuse things.' },
    ct_head: { useful: false, why: 'He has no head injury or stroke signs; his symptoms are fully explained by the heart.' }
  },
  talk: {
    afterDecision: 6,
    who: 'The patient',
    title: '"I\'ll just cut down"',
    situation: 'As you go over his discharge plan he says, "Look, I\'ve smoked for thirty years. I\'ll cut down to a few a day — that should be good enough, right?"',
    question: 'How do you respond?',
    options: [
      { text: 'Fair enough — a few a day is a big improvement on a pack, and that will protect your heart well.', correct: false,
        feedback: 'Even a few cigarettes a day keep raising the risk of another heart attack. Agreeing just to be pleasant leaves him with wrong information.' },
      { text: 'Stopping completely protects your heart far more than cutting down. Can we set up support to help you quit?', correct: true,
        feedback: 'This is honest about the facts, avoids blame, and turns the advice into a practical offer of help, which makes quitting much more likely.' },
      { text: 'If you keep smoking after a heart attack this big, there is honestly no point in us treating you again.', correct: false,
        feedback: 'Threats and shame make people defensive and less likely to change. Every patient deserves care, and support works far better than scare tactics.' },
      { text: 'That is really something to talk about with your family doctor later — today we are only focused on your heart.', correct: false,
        feedback: 'Smoking is the most important thing he can change for his heart. A moment like this, right after a heart attack, is when people are most ready to quit.' }
    ]
  }
};

window.CASE_EXTRAS['core-asthma'] = {
  esi: 1,
  esiWhy: 'She can only speak a few words, is using her neck muscles to breathe and her oxygen is below 90% — a life-threatening asthma attack needing immediate treatment.',
  tests: {
    abg: {
      useful: true,
      results: [
        { name: 'pH', value: '7.46', flag: 'H', ref: '7.35–7.45' },
        { name: 'CO₂', value: '32 mmHg', flag: 'L', ref: '35–45' },
        { name: 'Oxygen (on room air)', value: '58 mmHg', flag: 'L', ref: '80–100' }
      ],
      stages: [
        { from: 2, results: [
          { name: 'pH', value: '7.34', flag: 'L', ref: '7.35–7.45' },
          { name: 'CO₂', value: '45 mmHg', flag: 'H', ref: '35–45 (expected low in severe asthma)' } ] },
        { from: 5, results: [
          { name: 'pH', value: '7.31', flag: 'L', ref: '7.35–7.45' },
          { name: 'CO₂', value: '50 mmHg', flag: 'H', ref: '35–45' } ] },
        { from: 7, results: [
          { name: 'pH', value: '7.41', flag: '', ref: '7.35–7.45' },
          { name: 'CO₂', value: '39 mmHg', flag: '', ref: '35–45' } ] }
      ]
    },
    cxr: { useful: true, report: 'Hyperinflated lungs, consistent with asthma. No collapsed lung (pneumothorax). No pneumonia.', image: 'cxr-hyperinflation' },
    ecg: { useful: true, report: 'Sinus tachycardia (fast but regular), rate about 120. No other changes.', image: 'ecg-sinus-tach' },
    bmp: {
      useful: true,
      results: [
        { name: 'Potassium', value: '3.9 mmol/L', flag: '', ref: '3.5–5.0' },
        { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
        { name: 'Creatinine (kidney)', value: '0.7 mg/dL', flag: '', ref: '0.5–1.1' }
      ],
      stages: [ { from: 2, results: [
        { name: 'Potassium', value: '3.2 mmol/L', flag: 'L', ref: '3.5–5.0' },
        { name: 'Sodium', value: '138 mmol/L', flag: '', ref: '135–145' },
        { name: 'Creatinine (kidney)', value: '0.7 mg/dL', flag: '', ref: '0.5–1.1' } ] } ]
    },
    ct_chest: { useful: false, why: 'A chest X-ray answers the key questions (collapsed lung, pneumonia); a CT adds a lot of radiation and means moving a very sick patient away from the resus bay.' },
    dimer: { useful: false, why: 'Her wheeze, cold and known asthma explain everything, and a D-dimer is often raised in sick patients, so it would likely send you chasing the wrong problem.' },
    cbc: { useful: false, why: 'This attack was triggered by a virus, and steroids raise the white cell count anyway, so the result would not change her treatment.' }
  },
  talk: {
    afterDecision: 7,
    who: 'The patient',
    title: 'The forgotten inhaler',
    situation: 'Before going home she looks embarrassed: "Honestly, I only use the preventer when I remember, which is… not often. It doesn\'t seem to do anything when I take it."',
    question: 'How do you respond?',
    options: [
      { text: 'You nearly ended up on a breathing machine. You really need to start taking your health more seriously than this.', correct: false,
        feedback: 'Lecturing and blame make people feel ashamed and less likely to be honest next time. She needs understanding and a plan.' },
      { text: 'Thanks for being honest. It works quietly over weeks to calm the airways — can we find a routine that helps you remember?', correct: true,
        feedback: 'Thanking her keeps her talking. Explaining why it seems to "do nothing" fixes the misunderstanding, and planning a routine together makes change realistic.' },
      { text: 'That is fine — as long as you carry your reliever inhaler everywhere, you can use that one whenever symptoms start.', correct: false,
        feedback: 'Relying only on the reliever treats symptoms but not the airway inflammation. That is exactly how this severe attack built up.' },
      { text: 'Lots of people forget theirs. I will write it on your discharge letter so your family doctor can sort it out with you later.', correct: false,
        feedback: 'Passing it on is not enough — the best moment to explain and plan is now, while she understands how serious this attack was.' }
    ]
  }
};

window.CASE_EXTRAS['core-appendicitis'] = {
  esi: 3,
  esiWhy: 'He is stable with only mildly abnormal vital signs, but needs several resources: blood tests, imaging, IV fluids and a surgical opinion.',
  tests: {
    cbc: {
      useful: true,
      results: [
        { name: 'White blood cells', value: '15.2 ×10⁹/L', flag: 'H', ref: '4.5–13.0' },
        { name: 'Hemoglobin', value: '14.6 g/dL', flag: '', ref: '13.0–16.0' },
        { name: 'Platelets', value: '262 ×10⁹/L', flag: '', ref: '150–400' }
      ],
      stages: [ { from: 2, results: [
        { name: 'White blood cells', value: '18.9 ×10⁹/L', flag: 'H', ref: '4.5–13.0' },
        { name: 'Hemoglobin', value: '14.2 g/dL', flag: '', ref: '13.0–16.0' },
        { name: 'Platelets', value: '255 ×10⁹/L', flag: '', ref: '150–400' } ] } ]
    },
    crp: {
      useful: true,
      results: [ { name: 'CRP (inflammation)', value: '48 mg/L', flag: 'H', ref: '<5' } ],
      stages: [ { from: 2, results: [ { name: 'CRP (inflammation)', value: '136 mg/L', flag: 'H', ref: '<5' } ] } ]
    },
    ua: {
      useful: true,
      results: [
        { name: 'Blood', value: 'Negative', flag: '', ref: 'Negative' },
        { name: 'White cells', value: 'Negative', flag: '', ref: 'Negative' },
        { name: 'Nitrites', value: 'Negative', flag: '', ref: 'Negative' }
      ]
    },
    us_formal: { useful: true, report: 'Appendix not clearly seen. Small amount of free fluid in the lower right abdomen. Inconclusive.',
      stages: [ { from: 3, report: 'The appendix has been removed. No fluid collection (abscess) seen.' } ] },
    mri: {
      useful: true,
      report: 'Inflamed, swollen appendix (11 mm) with a small hard stone (appendicolith) at its base. No abscess. No clear perforation.',
      stages: [
        { from: 2, report: 'Swollen appendix with a small stone at its base, now with more free fluid around it, suggesting a small perforation.' },
        { from: 3, report: 'The appendix has been removed. Expected changes after surgery. No fluid collection (abscess).' }
      ]
    },
    ct_abd: {
      useful: true,
      report: 'Swollen, inflamed appendix (11 mm) with a small stone at its base and inflamed fat around it. No abscess.',
      stages: [
        { from: 2, report: 'Swollen appendix with a small stone, a little free air and fluid nearby — consistent with a small perforation.' },
        { from: 3, report: 'The appendix has been removed. Expected changes after surgery. No fluid collection (abscess).' }
      ]
    },
    lipase: { useful: false, why: 'Pancreas pain is usually high in the upper abdomen; his pain moved to the lower right, which points to the appendix.' },
    xr_abd: { useful: false, why: 'A plain abdominal X-ray rarely shows appendicitis, so it adds radiation without answering the question.' },
    cxr: { useful: false, why: 'He has no cough or breathing symptoms, so a chest X-ray will not help explain lower-right belly pain.' }
  },
  talk: {
    afterDecision: 2,
    who: 'The patient',
    title: 'Nervous about surgery',
    situation: 'After the surgeons leave, he quietly asks you, "Do they really have to cut me open? Will I be awake? I\'ve never had an operation before."',
    question: 'How do you respond?',
    options: [
      { text: 'Don\'t worry about any of that — the surgeons do this every day, so there is really nothing to be nervous about.', correct: false,
        feedback: 'Brushing off fear does not answer his questions. Being reassuring is good, but he deserves real information.' },
      { text: 'You\'ll be fully asleep. They usually use a camera and a few tiny cuts. What else is worrying you?', correct: true,
        feedback: 'Short, honest, age-appropriate facts answer exactly what he asked, and inviting more questions shows you are listening.' },
      { text: 'That is a question for the surgeons and the anesthetist. They will come and explain everything when it is time.', correct: false,
        feedback: 'They will explain more, but you can answer simple questions now. Sending him away leaves him anxious while he waits.' },
      { text: 'You could skip the operation and try antibiotics first, though if that fails you would need surgery anyway.', correct: false,
        feedback: 'With a stone in the appendix, the surgical team has recommended an operation. Offering a different plan on your own confuses him and undermines their advice.' }
    ]
  }
};

window.CASE_EXTRAS['ortho-wrist-01'] = {
  esi: 4,
  esiWhy: 'She is stable with normal vital signs and good circulation, and needs just one resource — an X-ray of the wrist.',
  tests: {
    xr_limb: {
      useful: true,
      report: 'Buckle (torus) fracture of the distal radius — the bone surface is bulged but not broken through. Growth plate not involved. Normal alignment.',
      image: 'xr-wrist-buckle'
    },
    mri: { useful: false, why: 'A plain X-ray already shows this fracture clearly; an MRI is slow, expensive and would not change her treatment.' },
    ct_head: { useful: false, why: 'She did not hit her head and has no headache, vomiting or confusion, so a head CT would only add radiation.' },
    cbc: { useful: false, why: 'A simple wrist fracture does not cause meaningful blood loss, so a blood count will not help.' },
    ecg: { useful: false, why: 'Her slightly fast pulse is from pain and worry; she has no chest symptoms, so a heart tracing adds nothing.' }
  },
  talk: {
    afterDecision: 3,
    who: 'The patient',
    title: '"Is it broken?"',
    situation: 'Now that the tingling has settled, she looks at the X-ray on the screen and asks, worried, "So is it broken? Will I need an operation? I have a volleyball tournament in two weeks."',
    question: 'How do you respond?',
    options: [
      { text: 'Yes, it\'s a small "buckle" break that heals well in a splint — no operation. Sadly, the tournament will need to wait.', correct: true,
        feedback: 'Honest, simple and kind: she gets the good news and the disappointing news clearly, without false promises about the tournament.' },
      { text: 'It is nothing to worry about at all, just a bit of a bruise on the bone, so you should be fine to play in two weeks.', correct: false,
        feedback: 'Calling a fracture "a bruise" is not honest, and promising she can play may lead to re-injury and loss of trust later.' },
      { text: 'There is a torus fracture of the distal radial metaphysis without physeal involvement, so management is conservative.', correct: false,
        feedback: 'Accurate, but full of medical words a 13-year-old will not understand. Good explanations use everyday language.' },
      { text: 'We will have to wait for the bone specialists before I can say anything at all about what it shows or what happens next.', correct: false,
        feedback: 'You can share what you already know in simple terms. Saying nothing leaves her more anxious than an honest, gentle answer.' }
    ]
  }
};

/* ------------------------------------------------------------------ */
/* cases-a.js                                                          */
/* ------------------------------------------------------------------ */

window.CASE_EXTRAS['a-afib-thyroid-01'] = {
  esi: 2,
  esiWhy: 'Her blood pressure is fine, but a heart rate jumping between 135 and 155 is a dangerously abnormal vital sign, so she should not wait.',
  tests: {
    ecg: {
      useful: true,
      report: 'Atrial fibrillation — irregularly irregular rhythm with no clear P waves — at about 148 per minute. No signs of a heart attack.',
      image: 'ecg-afib',
      stages: [ { from: 4, report: 'Still atrial fibrillation, but the rate is now about 100 per minute. No signs of a heart attack.', image: 'ecg-afib' } ]
    },
    tsh: {
      useful: true,
      results: [
        { name: 'TSH (thyroid-stimulating hormone)', value: '<0.01 mIU/L', flag: 'L', ref: '0.4–4.0' },
        { name: 'Free T4 (thyroid hormone)', value: '48 pmol/L', flag: 'H', ref: '10–22' }
      ]
    },
    bmp: {
      useful: true,
      results: [
        { name: 'Potassium', value: '4.1 mmol/L', flag: '', ref: '3.5–5.0' },
        { name: 'Sodium', value: '140 mmol/L', flag: '', ref: '135–145' },
        { name: 'Creatinine (kidney)', value: '0.8 mg/dL', flag: '', ref: '0.5–1.1' }
      ]
    },
    troponin: { useful: true, results: [ { name: 'Troponin (heart muscle)', value: 'Normal', flag: '', ref: 'Normal: very low' } ] },
    cbc: {
      useful: true,
      results: [
        { name: 'Hemoglobin', value: '13.4 g/dL', flag: '', ref: '12.0–15.5' },
        { name: 'White blood cells', value: '7.0 ×10⁹/L', flag: '', ref: '4.5–11.0' }
      ]
    },
    cxr: { useful: true, report: 'Normal heart size. Lungs clear, with no fluid congestion and no pneumonia.', image: 'cxr-normal' },
    echo: { useful: true, report: 'Heart pump strength normal. The upper left chamber is mildly enlarged. No fluid around the heart.' },
    ct_chest: { useful: false, why: 'Nothing suggests a lung clot, and the iodine in CT contrast dye can actually make an overactive thyroid worse.' },
    dimer: { useful: false, why: 'Her breathlessness is explained by the fast rhythm, and a D-dimer is often mildly raised in atrial fibrillation, so it would mislead.' },
    ct_head: { useful: false, why: 'She has no weakness, speech problems or confusion, so there is nothing for a head scan to find.' }
  },
  talk: {
    afterDecision: 4,
    who: 'The patient',
    title: 'Afraid of a stroke',
    situation: 'After cardiology mentions stroke risk, she grips your arm: "My father had a stroke. Is that going to happen to me? Should I be scared?"',
    question: 'How do you respond?',
    options: [
      { text: 'No, you are much too young and healthy for that to happen, so please try not to think about it at all.', correct: false,
        feedback: 'False reassurance is not honest — she does have a real, if small, risk. It also makes her less likely to take a blood thinner seriously.' },
      { text: 'Yes, unfortunately your stroke risk is very high now, much like your father\'s was, so you need to be careful.', correct: false,
        feedback: 'This exaggerates the risk and frightens her. Good communication gives the honest size of a risk, not the scariest version.' },
      { text: 'This rhythm does raise stroke risk, but we can lower it. We\'ll work out your risk and discuss blood thinners.', correct: true,
        feedback: 'It is honest that the risk is real without exaggerating it, and shows her there is a plan to lower it that she will be part of.' },
      { text: 'I cannot really say anything about stroke today — cardiology will explain it all properly before you go home.', correct: false,
        feedback: 'She asked a direct question while frightened. You can give a simple, honest answer now and let cardiology add the details.' }
    ]
  }
};

window.CASE_EXTRAS['a-pe-travel-01'] = {
  esi: 2,
  esiWhy: 'Sudden breathlessness with chest pain, a fast heart rate and oxygen of 91% is high risk — this could be a lung clot and she should not wait.',
  tests: {
    ecg: {
      useful: true,
      report: 'Sinus tachycardia (fast but regular), rate 116. No other clear changes.',
      image: 'ecg-sinus-tach',
      stages: [ { from: 4, report: 'Sinus tachycardia, rate 132, with new signs of strain on the right side of the heart.', image: 'ecg-sinus-tach' } ]
    },
    cxr: { useful: true, report: 'Normal. Clear lungs, no collapse, no fluid, normal heart size.', image: 'cxr-normal' },
    ct_chest: { useful: true, report: 'CT pulmonary angiogram: multiple clots in the arteries of both lungs. The right side of the heart looks enlarged and strained.' },
    us_bedside: {
      useful: true,
      report: 'Right ventricle dilated and working hard. Left side of the heart normal. No fluid around the heart.',
      stages: [ { from: 4, report: 'Right ventricle even larger and squeezing poorly; it is pushing on the left side of the heart.' } ]
    },
    us_formal: { useful: true, report: 'Leg vein ultrasound: clot in the deep veins of the left calf extending up behind the knee.' },
    troponin: { useful: true, results: [ { name: 'Troponin (heart muscle marker)', value: 'Mildly raised', flag: 'H', ref: 'Normal: very low' } ] },
    cbc: {
      useful: true,
      results: [
        { name: 'White blood cells', value: '9.2 ×10⁹/L', flag: '', ref: '4.5–11.0' },
        { name: 'Hemoglobin', value: '13.1 g/dL', flag: '', ref: '12.0–15.5' },
        { name: 'Platelets', value: '244 ×10⁹/L', flag: '', ref: '150–400' }
      ]
    },
    coag: {
      useful: true,
      results: [
        { name: 'INR (clotting time)', value: '1.0', flag: '', ref: '0.9–1.2' },
        { name: 'aPTT', value: '29 s', flag: '', ref: '25–35' }
      ]
    },
    bmp: {
      useful: true,
      results: [
        { name: 'Creatinine (kidney)', value: '0.8 mg/dL', flag: '', ref: '0.5–1.1' },
        { name: 'Potassium', value: '4.0 mmol/L', flag: '', ref: '3.5–5.0' }
      ]
    },
    dimer: { useful: false, why: 'When suspicion of a clot is already high, a D-dimer cannot rule it out — you go straight to the CT scan.' },
    ct_head: { useful: false, why: 'Her tingling fingers come from fast breathing, not the brain; a head CT would not help.' },
    cultures: { useful: false, why: 'She has no fever or signs of infection, so blood cultures will not explain her breathlessness.' }
  },
  talk: {
    afterDecision: 3,
    who: 'The patient',
    title: '"Did my pill do this?"',
    situation: 'After hearing the CT result she asks, "I read that the birth control pill can cause clots. Did I do this to myself? Do I have to stop it?"',
    question: 'How do you respond?',
    options: [
      { text: 'The pill and the long flight both raise clot risk, but this isn\'t your fault. We\'ll help you choose a safer option.', correct: true,
        feedback: 'Honest about the link, removes blame, and promises a practical plan for contraception — exactly what she needs to hear.' },
      { text: 'No, the pill has nothing to do with it at all — this was only bad luck from sitting still on a very long flight.', correct: false,
        feedback: 'This is not true; the combined pill raises clot risk. She needs accurate information to make safe choices in the future.' },
      { text: 'Yes, it was almost certainly the pill, and you really should have read the leaflet risks before taking it on that trip.', correct: false,
        feedback: 'Blaming her is unkind and unfair; there were several risk factors. Shame does not help her recover or decide what to do next.' },
      { text: 'Just keep taking it for now. We can think about contraception much later once you are back home and fully better.', correct: false,
        feedback: 'Someone who has had a clot is usually advised against this type of pill. The team should address it now, not leave her on it.' }
    ]
  }
};

window.CASE_EXTRAS['a-pneumonia-01'] = {
  esi: 3,
  esiWhy: 'He is unwell but stable with near-normal vital signs, and needs at least two resources: a chest X-ray and blood tests (plus antibiotics).',
  tests: {
    cxr: { useful: true, report: 'Patchy white shadowing (consolidation) in the right lower lobe — pneumonia. No fluid around the lung.', image: 'cxr-pneumonia-right' },
    cbc: {
      useful: true,
      results: [
        { name: 'White blood cells', value: '14.2 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
        { name: 'Hemoglobin', value: '14.8 g/dL', flag: '', ref: '13.5–17.5' },
        { name: 'Platelets', value: '310 ×10⁹/L', flag: '', ref: '150–400' }
      ]
    },
    crp: { useful: true, results: [ { name: 'CRP (inflammation marker)', value: '96 mg/L', flag: 'H', ref: '<5' } ] },
    bmp: {
      useful: true,
      results: [
        { name: 'Urea (kidney marker)', value: '5.1 mmol/L', flag: '', ref: '2.5–7.8' },
        { name: 'Creatinine (kidney)', value: '0.9 mg/dL', flag: '', ref: '0.7–1.2' },
        { name: 'Sodium', value: '137 mmol/L', flag: '', ref: '135–145' }
      ]
    },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '1.3 mmol/L', flag: '', ref: '0.5–2.0' } ] },
    cultures: { useful: false, why: 'In a mild pneumonia treated at home, blood cultures are almost always negative and will not change his antibiotics.' },
    ct_chest: { useful: false, why: 'The X-ray already shows the pneumonia clearly; a CT adds a lot of radiation without changing treatment.' },
    dimer: { useful: false, why: 'His chest pain on breathing is explained by the pneumonia, and infection raises D-dimer anyway, so it would mislead.' }
  },
  talk: {
    afterDecision: 3,
    who: 'The patient',
    title: 'Stopping early?',
    situation: 'As you explain his antibiotic tablets, he says, "I\'m a builder — I can\'t miss work. Once I feel fine in a day or two, can I just stop the tablets?"',
    question: 'How do you respond?',
    options: [
      { text: 'Sure, once the fever is gone you can stop them, because by then the tablets will have done their job anyway.', correct: false,
        feedback: 'Feeling better usually comes before the infection is fully cleared. Stopping early risks the pneumonia coming back.' },
      { text: 'Please finish the course — you\'ll feel better before it\'s fully cleared. I can give you a note for work.', correct: true,
        feedback: 'Clear, honest advice with the reason behind it, and it respects his worry about work instead of ignoring it.' },
      { text: 'You must take every single tablet or the bacteria will become resistant and next time no antibiotic will work at all.', correct: false,
        feedback: 'This exaggerates and frightens rather than explains. Accurate, calm reasons help people follow advice.' },
      { text: 'That really depends on how you feel, so just use your own judgment and stop taking them whenever you think best.', correct: false,
        feedback: 'He asked for guidance and deserves a clear answer. Leaving it to guesswork makes stopping too early more likely.' }
    ]
  }
};

window.CASE_EXTRAS['a-stroke-01'] = {
  esi: 2,
  esiWhy: 'Sudden face droop, arm weakness and jumbled speech are stroke signs — every minute counts, so he must be seen immediately even though his airway is clear.',
  tests: {
    glucose: { useful: true, results: [ { name: 'Fingerstick glucose', value: '7.2 mmol/L (130 mg/dL)', flag: '', ref: '4.0–7.8 (72–140)' } ] },
    ct_head: {
      useful: true,
      report: 'CT brain (no contrast): no bleeding. Subtle early changes on the left side of the brain.',
      stages: [
        { from: 3, report: 'No bleeding. CT angiogram: a clot is blocking the first part of the left middle cerebral artery, a large brain artery.' },
        { from: 4, report: 'Repeat CT brain: a small area of bleeding within the stroke area. No large bleed.' }
      ]
    },
    ecg: { useful: true, report: 'Sinus rhythm, rate 84. No atrial fibrillation and no signs of a heart attack.', image: 'ecg-normal' },
    cbc: {
      useful: true,
      results: [
        { name: 'Platelets', value: '228 ×10⁹/L', flag: '', ref: '150–400' },
        { name: 'Hemoglobin', value: '14.1 g/dL', flag: '', ref: '13.5–17.5' }
      ]
    },
    coag: {
      useful: true,
      results: [
        { name: 'INR (clotting time)', value: '1.0', flag: '', ref: '0.9–1.2' },
        { name: 'aPTT', value: '30 s', flag: '', ref: '25–35' }
      ]
    },
    bmp: {
      useful: true,
      results: [
        { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
        { name: 'Creatinine (kidney)', value: '1.0 mg/dL', flag: '', ref: '0.7–1.2' }
      ]
    },
    mri: { useful: false, why: 'MRI takes much longer than CT, and the fast CT already answers the key question (bleeding or not) — waiting would cost brain cells.' },
    cxr: { useful: false, why: 'He has no breathing or chest symptoms, and stopping for a chest X-ray would delay clot-dissolving treatment.' },
    dimer: { useful: false, why: 'A D-dimer does not diagnose stroke and would not change the urgent treatment decision.' }
  },
  talk: {
    afterDecision: 2,
    who: 'His wife',
    title: 'A risky medicine',
    situation: 'The stroke team is about to offer a clot-dissolving drug. His wife says, "They said it can cause bleeding in the brain. Is it safe? I don\'t know what to decide."',
    question: 'How do you respond?',
    options: [
      { text: 'It is completely safe — we give it all the time, so there is honestly nothing for you to worry about at all.', correct: false,
        feedback: 'Every treatment has risks, and this one has a real bleeding risk. Hiding it is not honest and takes away a fair choice.' },
      { text: 'It is very risky, so if I were you I would avoid it and just wait to see whether he gets better on his own.', correct: false,
        feedback: 'For a stroke treated early, the expected benefit is greater than the risk for most patients. Waiting means losing brain cells.' },
      { text: 'There\'s a small chance of bleeding, but it improves the chance of a good recovery. What worries you most?', correct: true,
        feedback: 'It is honest about both benefit and risk, uses plain words, and invites her concerns so the family can make an informed choice.' },
      { text: 'You need to decide in the next minute, because we cannot wait around while every minute he is losing brain.', correct: false,
        feedback: 'Time does matter, but pressure without information is frightening and unfair. A short, clear explanation is quick and kind.' }
    ]
  }
};

window.CASE_EXTRAS['a-seizure-01'] = {
  esi: 2,
  esiWhy: 'She arrives drowsy and confused right after a seizure — a change in mental state is high risk until she wakes up and a cause is checked.',
  tests: {
    glucose: { useful: true, results: [ { name: 'Fingerstick glucose', value: '5.4 mmol/L (97 mg/dL)', flag: '', ref: '4.0–7.8 (72–140)' } ] },
    bmp: {
      useful: true,
      results: [
        { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
        { name: 'Calcium', value: '2.35 mmol/L', flag: '', ref: '2.15–2.55' },
        { name: 'Potassium', value: '3.9 mmol/L', flag: '', ref: '3.5–5.0' }
      ]
    },
    ecg: { useful: true, report: 'Normal sinus rhythm. Normal intervals — no heart rhythm problem that could cause a collapse.', image: 'ecg-normal' },
    ua: {
      useful: true,
      results: [
        { name: 'Pregnancy test', value: 'Negative', flag: '', ref: 'Negative' },
        { name: 'White cells / nitrites', value: 'Negative', flag: '', ref: 'Negative' }
      ]
    },
    ct_head: { useful: false, why: 'She did not hit her head, is back to normal and has a normal exam, so an emergency CT adds radiation; an MRI is planned instead.' },
    mri: { useful: false, why: 'An MRI is the right brain scan, but it is best arranged as a planned outpatient test, not in the emergency department today.' },
    cultures: { useful: false, why: 'She has no fever, headache or neck stiffness, so there is no sign of infection to look for.' }
  },
  talk: {
    afterDecision: 1,
    who: 'The patient',
    title: '"Don\'t tell my parents"',
    situation: 'While her parents are in the corridor she whispers, "Please don\'t tell them I\'ve been up till 4 a.m. every night on energy drinks. They\'ll go crazy."',
    question: 'How do you respond?',
    options: [
      { text: 'Okay, I promise I will keep that just between us, and I won\'t write any of it down anywhere in your notes either.', correct: false,
        feedback: 'Important information like a seizure trigger must go in her notes, and a promise of total secrecy is not one you should make. Encourage sharing instead.' },
      { text: 'Thanks for telling me. Lack of sleep can trigger seizures, so it matters — can we tell them together?', correct: true,
        feedback: 'It respects her trust, explains why the information matters, and gives her some control over how her parents hear it.' },
      { text: 'Your parents have a right to know everything, so I am going to go and tell them about it right now myself.', correct: false,
        feedback: 'Going straight past her breaks her trust and may stop her being honest with doctors in the future. Involve her first.' },
      { text: 'It doesn\'t really matter what time you go to bed — that has nothing to do with what happened to you today.', correct: false,
        feedback: 'This is wrong: sleep deprivation is a well-known seizure trigger. She needs accurate information to stay safe.' }
    ]
  }
};

/* ------------------------------------------------------------------ */
/* cases-b.js                                                          */
/* ------------------------------------------------------------------ */

window.CASE_EXTRAS['b-gi-bleed-01'] = {
  esi: 2,
  esiWhy: 'Vomiting blood with black stools, a fast heart rate and dizziness while on a blood thinner is high risk — he could deteriorate quickly.',
  tests: {
    cbc: {
      useful: true,
      results: [
        { name: 'Hemoglobin', value: '13.1 g/dL', flag: 'L', ref: '13.5–17.5' },
        { name: 'Platelets', value: '228 ×10⁹/L', flag: '', ref: '150–400' }
      ],
      stages: [
        { from: 3, results: [
          { name: 'Hemoglobin', value: '7.4 g/dL', flag: 'C', ref: '13.5–17.5' },
          { name: 'Platelets', value: '196 ×10⁹/L', flag: '', ref: '150–400' } ] },
        { from: 4, results: [
          { name: 'Hemoglobin (after transfusion)', value: '8.6 g/dL', flag: 'L', ref: '13.5–17.5' },
          { name: 'Platelets', value: '190 ×10⁹/L', flag: '', ref: '150–400' } ] }
      ]
    },
    typecross: { useful: true, results: [ { name: 'Blood type & screen', value: 'O positive, no antibodies', flag: '', ref: '—' } ] },
    coag: { useful: true, results: [ { name: 'INR (clotting time)', value: '2.8', flag: 'H', ref: '0.9–1.2' } ] },
    bmp: {
      useful: true,
      results: [
        { name: 'Blood urea nitrogen (BUN)', value: '42 mg/dL', flag: 'H', ref: '7–20' },
        { name: 'Creatinine', value: '1.0 mg/dL', flag: '', ref: '0.7–1.2' },
        { name: 'Potassium', value: '4.3 mmol/L', flag: '', ref: '3.5–5.0' }
      ]
    },
    lactate: {
      useful: true,
      results: [ { name: 'Lactate', value: '2.4 mmol/L', flag: 'H', ref: '0.5–2.0' } ],
      stages: [
        { from: 3, results: [ { name: 'Lactate', value: '3.6 mmol/L', flag: 'H', ref: '0.5–2.0' } ] },
        { from: 4, results: [ { name: 'Lactate', value: '1.8 mmol/L', flag: '', ref: '0.5–2.0' } ] }
      ]
    },
    ecg: {
      useful: true,
      report: 'Atrial fibrillation (his known irregular rhythm), rate about 104. No signs of a heart attack.',
      image: 'ecg-afib',
      stages: [ { from: 3, report: 'Atrial fibrillation, faster now at about 118. No signs of a heart attack.', image: 'ecg-afib' } ]
    },
    ct_abd: { useful: false, why: 'Vomited blood and black stools point to the stomach or upper gut, where an endoscopy can both find and treat the bleed — a CT cannot.' },
    xr_abd: { useful: false, why: 'A plain belly X-ray cannot show a bleeding ulcer, so it only adds radiation and delay.' },
    lipase: { useful: false, why: 'He has no upper belly pain typical of pancreatitis; his problem is bleeding, not pancreas inflammation.' }
  },
  talk: {
    afterDecision: 4,
    who: 'His wife',
    title: 'Why does he need blood?',
    situation: 'His wife sees the bag of blood being hung up and goes pale: "Why does he need a transfusion? Is he going to die? Nobody is telling me anything."',
    question: 'How do you respond?',
    options: [
      { text: 'He is in good hands, so please try to stay calm and wait outside while we get on with treating him.', correct: false,
        feedback: 'This ignores her questions and her feeling of being left out. A short, honest update is quick and kind.' },
      { text: 'He\'s lost blood from a stomach bleed, so we\'re replacing it. It\'s serious and we\'re watching him closely.', correct: true,
        feedback: 'Honest about how serious it is without being frightening, explains the reason for the blood in plain words, and shows what the team is doing.' },
      { text: 'Don\'t worry at all — the transfusion is just a routine precaution and he is not really in any danger right now.', correct: false,
        feedback: 'His blood count has dropped a lot and his blood pressure fell; calling it routine is not honest and damages trust.' },
      { text: 'His hemoglobin dropped from 13.1 to 7.4 with hemodynamic instability, so he meets transfusion criteria.', correct: false,
        feedback: 'True, but full of jargon she will not understand while frightened. Plain language matters most in moments like this.' }
    ]
  }
};

window.CASE_EXTRAS['b-urosepsis-01'] = {
  esi: 2,
  esiWhy: 'New confusion with fever, a fast heart rate and low blood pressure suggests sepsis — she is high risk and must not wait.',
  tests: {
    lactate: {
      useful: true,
      results: [ { name: 'Lactate', value: '4.2 mmol/L', flag: 'C', ref: '0.5–2.0' } ],
      stages: [
        { from: 3, results: [ { name: 'Lactate', value: '3.9 mmol/L', flag: 'C', ref: '0.5–2.0' } ] },
        { from: 5, results: [ { name: 'Lactate', value: '1.8 mmol/L', flag: '', ref: '0.5–2.0' } ] }
      ]
    },
    cbc: {
      useful: true,
      results: [
        { name: 'White blood cells', value: '18.6 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
        { name: 'Hemoglobin', value: '12.1 g/dL', flag: '', ref: '12.0–15.5' },
        { name: 'Platelets', value: '168 ×10⁹/L', flag: '', ref: '150–400' }
      ]
    },
    bmp: {
      useful: true,
      results: [
        { name: 'Creatinine', value: '2.1 mg/dL', flag: 'H', ref: '0.5–1.1' },
        { name: 'Glucose', value: '214 mg/dL', flag: 'H', ref: '70–140' },
        { name: 'Sodium', value: '134 mmol/L', flag: 'L', ref: '135–145' },
        { name: 'Potassium', value: '4.6 mmol/L', flag: '', ref: '3.5–5.0' }
      ]
    },
    glucose: { useful: true, results: [ { name: 'Fingerstick glucose', value: '214 mg/dL', flag: 'H', ref: '70–140' } ] },
    ua: {
      useful: true,
      results: [
        { name: 'White cells', value: 'Many', flag: 'H', ref: 'None' },
        { name: 'Nitrites', value: 'Positive', flag: 'H', ref: 'Negative' },
        { name: 'Blood', value: 'Small amount', flag: 'H', ref: 'Negative' }
      ]
    },
    cultures: { useful: true, report: 'Blood and urine cultures sent to the lab. Results in about 48 hours.' },
    us_bedside: { useful: true, report: 'Bedside kidney ultrasound: the right kidney is swollen with a widened, blocked drainage system (hydronephrosis). Left kidney normal.' },
    ct_abd: { useful: true, report: 'A kidney stone is blocking the right ureter, with a swollen right kidney (hydronephrosis). No other source of infection.' },
    cxr: { useful: true, report: 'Clear lungs with no pneumonia or fluid. Normal heart size.', image: 'cxr-normal' },
    ct_head: { useful: false, why: 'She has no fall, head injury or weakness on one side; her confusion is explained by the infection and should improve as it is treated.' },
    dimer: { useful: false, why: 'Infection pushes D-dimer up, so a raised result here would only distract from the real problem.' }
  },
  talk: {
    afterDecision: 4,
    who: 'Her daughter',
    title: 'Will she be herself again?',
    situation: 'While urology prepares to drain the kidney, her daughter asks, "She didn\'t even recognize me this morning. Will Mum go back to how she was? Please be honest."',
    question: 'How do you respond?',
    options: [
      { text: 'Yes, she will definitely be completely back to normal by tomorrow — this kind of confusion always goes away.', correct: false,
        feedback: 'You cannot promise this. She asked for honesty, and certainty you do not have can break trust later.' },
      { text: 'At her age, people who get this confused usually don\'t fully recover, so you should prepare yourself for that.', correct: false,
        feedback: 'This is unnecessarily bleak and not accurate — confusion from infection often improves as the infection is treated.' },
      { text: 'Confusion like this often improves as the infection is treated, but it can take days and she\'s very sick.', correct: true,
        feedback: 'Honest and hopeful at the same time: it gives a realistic picture, admits uncertainty and does not hide how serious things are.' },
      { text: 'It is too early to say anything at all, so it is better not to think about that until she is out of the ICU.', correct: false,
        feedback: 'Some uncertainty is real, but you can still share what usually happens. Refusing to answer leaves her alone with her fear.' }
    ]
  }
};

window.CASE_EXTRAS['b-meningitis-01'] = {
  esi: 2,
  esiWhy: 'Fever, the worst headache of his life, a stiff neck and drowsiness suggest meningitis — high risk, he must be seen and treated right away.',
  tests: {
    cultures: { useful: true, report: 'Blood cultures sent to the lab before antibiotics. Results in about 48 hours.' },
    cbc: {
      useful: true,
      results: [
        { name: 'White blood cells', value: '22.4 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
        { name: 'Hemoglobin', value: '14.6 g/dL', flag: '', ref: '13.5–17.5' },
        { name: 'Platelets', value: '96 ×10⁹/L', flag: 'L', ref: '150–400' }
      ]
    },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '3.4 mmol/L', flag: 'H', ref: '0.5–2.0' } ] },
    coag: {
      useful: true,
      results: [
        { name: 'INR (clotting time)', value: '1.5', flag: 'H', ref: '0.9–1.2' },
        { name: 'Fibrinogen', value: '1.6 g/L', flag: 'L', ref: '2.0–4.0' }
      ]
    },
    bmp: {
      useful: true,
      results: [
        { name: 'Sodium', value: '136 mmol/L', flag: '', ref: '135–145' },
        { name: 'Creatinine', value: '1.1 mg/dL', flag: '', ref: '0.7–1.2' },
        { name: 'Glucose', value: '112 mg/dL', flag: '', ref: '70–140' }
      ]
    },
    ct_head: { useful: true, report: 'Head CT: no bleeding, mass or signs of dangerous brain shift.' },
    mri: { useful: false, why: 'An MRI takes too long for someone this sick; when a scan is needed, a quick CT answers the safety question.' },
    ua: { useful: false, why: 'He has no urinary symptoms; the source of infection is clearly the brain lining, so a urine test will not change anything.' },
    xr_limb: { useful: false, why: 'The purple spots are a skin sign of bloodstream infection, not an injury, so a limb X-ray shows nothing useful.' }
  },
  talk: {
    afterDecision: 2,
    who: 'His mother (on the phone)',
    title: 'A frightened phone call',
    situation: 'His mother calls from three hours away, crying: "His roommate says he\'s in the emergency room with meningitis. Is he going to be okay? Should I come now?"',
    question: 'How do you respond?',
    options: [
      { text: 'He\'s asked me to update you. He\'s very unwell with a serious infection, but treatment started fast. Please come.', correct: true,
        feedback: 'It respects his privacy (he agreed to the update), is honest about how serious it is, shares that care is under way, and answers her question about coming.' },
      { text: 'I am sorry, but I really cannot give out any medical information over the phone, so please call back again later.', correct: false,
        feedback: 'Privacy matters, but with his permission or once identity is checked, a parent can be updated. Hanging up on a frightened mother is unkind.' },
      { text: 'Oh, it\'s probably just a bad virus going round the dorms, so there is really no need to make the long drive tonight.', correct: false,
        feedback: 'This is false reassurance — he has suspected bacterial meningitis and is going to the ICU. She needs the truth to make her decision.' },
      { text: 'Honestly, it\'s very bad — meningitis like this can kill young people within hours, so you need to get here fast.', correct: false,
        feedback: 'Honesty is important, but this is blunt and frightening over the phone while she has to drive. Give the facts calmly.' }
    ]
  }
};

window.CASE_EXTRAS['b-dka-01'] = {
  esi: 2,
  esiWhy: 'Deep, fast breathing, a fast heart rate and tiredness in a teen with type 1 diabetes point to DKA — high risk, she needs to be seen now.',
  tests: {
    glucose: {
      useful: true,
      results: [ { name: 'Fingerstick glucose', value: 'HIGH (above meter range); lab 548 mg/dL', flag: 'C', ref: '70–140' } ],
      stages: [
        { from: 4, results: [ { name: 'Fingerstick glucose', value: '248 mg/dL', flag: 'H', ref: '70–140' } ] }
      ]
    },
    ketones: {
      useful: true,
      results: [ { name: 'Ketones (blood)', value: '6.1 mmol/L', flag: 'C', ref: '<0.6' } ],
      stages: [ { from: 4, results: [ { name: 'Ketones (blood)', value: '2.4 mmol/L', flag: 'H', ref: '<0.6' } ] } ]
    },
    abg: {
      useful: true,
      results: [
        { name: 'pH (venous gas)', value: '7.08', flag: 'C', ref: '7.32–7.42' },
        { name: 'Bicarbonate', value: '7 mmol/L', flag: 'C', ref: '22–28' },
        { name: 'CO₂', value: '20 mmHg', flag: 'L', ref: '40–50' }
      ],
      stages: [ { from: 4, results: [
        { name: 'pH (venous gas)', value: '7.22', flag: 'L', ref: '7.32–7.42' },
        { name: 'Bicarbonate', value: '13 mmol/L', flag: 'L', ref: '22–28' } ] } ]
    },
    bmp: {
      useful: true,
      results: [ { name: 'Potassium', value: 'Pending', flag: '', ref: '3.5–5.0' } ],
      stages: [
        { from: 2, results: [
          { name: 'Potassium', value: '5.6 mmol/L', flag: 'H', ref: '3.5–5.0' },
          { name: 'Sodium', value: '131 mmol/L', flag: 'L', ref: '135–145' },
          { name: 'Creatinine', value: '1.1 mg/dL', flag: 'H', ref: '0.5–1.0' } ] },
        { from: 3, results: [
          { name: 'Potassium', value: '4.4 mmol/L', flag: '', ref: '3.5–5.0' },
          { name: 'Sodium', value: '133 mmol/L', flag: 'L', ref: '135–145' },
          { name: 'Creatinine', value: '0.9 mg/dL', flag: '', ref: '0.5–1.0' } ] },
        { from: 4, results: [
          { name: 'Potassium', value: '4.0 mmol/L', flag: '', ref: '3.5–5.0' },
          { name: 'Sodium', value: '134 mmol/L', flag: 'L', ref: '135–145' } ] }
      ]
    },
    ecg: {
      useful: true,
      report: 'Sinus tachycardia, rate 124. No dangerous potassium-related changes.',
      image: 'ecg-sinus-tach',
      stages: [ { from: 4, report: 'Sinus rhythm, now slower at 66 per minute. Otherwise normal.', image: 'ecg-normal' } ]
    },
    ua: {
      useful: true,
      results: [
        { name: 'Glucose (urine)', value: '4+', flag: 'H', ref: 'Negative' },
        { name: 'Ketones (urine)', value: '3+', flag: 'H', ref: 'Negative' },
        { name: 'White cells / nitrites', value: 'Negative', flag: '', ref: 'Negative' }
      ]
    },
    ct_head: {
      useful: true,
      report: 'No brain swelling or bleeding.',
      stages: [ { from: 4, report: 'Mild brain swelling, no bleeding. (Treatment should never wait for this scan.)' } ]
    },
    xr_abd: { useful: false, why: 'Belly pain is very common in DKA and usually eases as the acid clears; an X-ray adds radiation without helping.' },
    ct_abd: { useful: false, why: 'Her stomach pain is explained by DKA, so a CT exposes a teenager to lots of radiation without changing treatment.' }
  },
  talk: {
    afterDecision: 2,
    who: 'Her mother',
    title: '"This is my fault"',
    situation: 'Her mother is in tears: "I should have checked the pump tubing. I\'m her mother — how did I miss this? This is all my fault."',
    question: 'How do you respond?',
    options: [
      { text: 'Well, checking the pump tubing every day is really important, so next time you will need to be much more careful.', correct: false,
        feedback: 'Lecturing a parent who already feels guilty adds shame without helping. Teaching about pump checks can come later, kindly.' },
      { text: 'Pump problems are easy to miss. You brought her in and she\'s getting the right care — we\'ll plan prevention later.', correct: true,
        feedback: 'It eases blame, recognizes that she acted, and promises practical help to prevent it next time — calm and supportive.' },
      { text: 'Please try not to cry in front of her, because it will upset her more and make things harder for all of us.', correct: false,
        feedback: 'Her feelings are normal. Telling her to hide them ignores her distress instead of supporting her.' },
      { text: 'Honestly, it is your daughter\'s job at fifteen to check her own pump, so this one is really more her fault than yours.', correct: false,
        feedback: 'Shifting blame onto a sick teenager is unkind and unhelpful. Nobody needs blame here, just support and a plan.' }
    ]
  }
};

window.CASE_EXTRAS['b-hypoglycemia-01'] = {
  esi: 2,
  esiWhy: 'He is confused, sweaty and shaky — a change in mental state is high risk until a quick fingerstick test finds the cause.',
  tests: {
    glucose: {
      useful: true,
      results: [ { name: 'Fingerstick glucose', value: '46 mg/dL', flag: 'C', ref: '70–140' } ],
      stages: [
        { from: 2, results: [ { name: 'Fingerstick glucose', value: '98 mg/dL', flag: '', ref: '70–140' } ] },
        { from: 3, results: [ { name: 'Fingerstick glucose', value: '130 mg/dL', flag: '', ref: '70–140' } ] }
      ]
    },
    bmp: {
      useful: true,
      results: [
        { name: 'Creatinine (kidney)', value: '0.9 mg/dL', flag: '', ref: '0.7–1.2' },
        { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
        { name: 'Potassium', value: '4.0 mmol/L', flag: '', ref: '3.5–5.0' }
      ]
    },
    ecg: {
      useful: true,
      report: 'Sinus tachycardia, rate 104. No signs of a heart attack.',
      image: 'ecg-sinus-tach',
      stages: [ { from: 2, report: 'Normal sinus rhythm, rate 78. No signs of a heart attack.', image: 'ecg-normal' } ]
    },
    ct_head: { useful: false, why: 'His confusion is explained by the low sugar and clears once it is treated, so a head CT adds radiation without benefit.' },
    ketones: { useful: false, why: 'Ketones matter when sugar is very high (as in DKA), not when it is low after a missed meal.' },
    cbc: { useful: false, why: 'Nothing suggests infection or blood loss; the cause is already clear from his medicine and skipped lunch.' }
  },
  talk: {
    afterDecision: 4,
    who: 'His partner',
    title: 'Should he stop the pills?',
    situation: 'His partner arrives to take him home and says, "Those pills nearly put him in a coma. Surely he should just stop taking them?"',
    question: 'How do you respond?',
    options: [
      { text: 'Yes, that sounds sensible — he should stop them for now and only restart once he has seen his own doctor.', correct: false,
        feedback: 'Stopping diabetes medicine suddenly can let his sugar run dangerously high. Changes should be made with his doctor.' },
      { text: 'Please don\'t stop them alone. Regular meals and sugar checks keep him safe; his doctor will review the pill.', correct: true,
        feedback: 'It takes the worry seriously, explains the safe plan in plain words, and makes sure the medicine is reviewed by the right person.' },
      { text: 'The pills are perfectly fine — he just made a silly mistake by skipping lunch, so it is entirely his own fault.', correct: false,
        feedback: 'Blame is unhelpful, and this ignores a real issue: his medicine may need adjusting to make this less likely to happen again.' },
      { text: 'That is really a question for his family doctor, not for us, so we cannot say anything about his medicines today.', correct: false,
        feedback: 'You can give safe, simple advice now. Leaving them without guidance could lead them to stop the medicine anyway.' }
    ]
  }
};
