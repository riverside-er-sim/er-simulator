// ER Simulator — case extras C (for cases in cases-e.js and cases-f.js)
// Triage level, orderable tests with results, and one communication moment per case.
// Fictional and educational. No doses or procedure instructions by design.
window.CASE_EXTRAS = window.CASE_EXTRAS || {};

// ───────────────────────────────────────────── Stomach bug with mild dehydration
window.CASE_EXTRAS['e-gastro-dehydration-01'] = {
  esi: 3,
  esiWhy: 'He is alert with steady vitals, but he will likely need blood tests and IV fluids — two or more resources.',
  tests: {
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '137 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '3.6 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Bicarbonate', value: '22 mmol/L', flag: '', ref: '22–29' },
      { name: 'Urea (BUN)', value: '23 mg/dL', flag: 'H', ref: '7–20' },
      { name: 'Creatinine (kidney)', value: '1.1 mg/dL', flag: '', ref: '0.7–1.2' } ] },
    glucose: { useful: true, results: [ { name: 'Fingerstick glucose', value: '92 mg/dL', flag: '', ref: '70–140' } ] },
    ua: { useful: true, results: [
      { name: 'Specific gravity (concentration)', value: '1.030', flag: 'H', ref: '1.005–1.025' },
      { name: 'Ketones', value: 'Trace', flag: 'H', ref: 'Negative' },
      { name: 'Blood / nitrites', value: 'Negative', flag: '', ref: 'Negative' } ] },
    ct_abd: { useful: false, why: 'His belly is soft and the story fits a household stomach bug, so a CT adds radiation without changing the plan.' },
    xr_abd: { useful: false, why: 'A belly X-ray rarely helps in simple gastroenteritis and would not change how you rehydrate him.' },
    cultures: { useful: false, why: 'He has no high fever or signs of sepsis, so blood cultures would not change his care.' },
    cbc: { useful: false, why: 'A blood count will not change the plan for a mild viral stomach bug in a well adult.' }
  },
  talk: {
    afterDecision: 3,
    who: 'His partner',
    title: 'Asking for antibiotics',
    situation: 'His partner looks tired and worried. "Our little one is next, I just know it. Can you give him some antibiotics so it clears up faster and he stops spreading it?"',
    question: 'How do you respond?',
    options: [
      { text: 'This is almost certainly a virus, so antibiotics will not help. Fluids, rest and handwashing are what stop it.', correct: true,
        feedback: 'Honest and clear: it explains why antibiotics would not work and gives the family something useful they can actually do.' },
      { text: 'Sure, a short course of antibiotics will not hurt and might help him get over it a day or two sooner.', correct: false,
        feedback: 'Antibiotics do not work on viruses and can cause side effects and resistance, so prescribing to reassure is not good care.' },
      { text: 'Let us not worry about your child now. Young children almost never catch this from adults anyway.', correct: false,
        feedback: 'This is untrue — stomach bugs spread easily in families — and it brushes off a reasonable worry.' },
      { text: 'I cannot discuss that, you should speak to your own family doctor about what to do at home tomorrow.', correct: false,
        feedback: 'Sending the question elsewhere misses a perfect chance to teach simple hygiene that protects the child today.' }
    ]
  }
};

// ───────────────────────────────────────────── Gallbladder → cholangitis
window.CASE_EXTRAS['e-gallbladder-01'] = {
  esi: 3,
  esiWhy: 'She is stable on arrival but in real pain and will need blood tests, an ultrasound and IV medicines — several resources.',
  tests: {
    cbc: { useful: true, results: [
      { name: 'White blood cells', value: '13.8 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
      { name: 'Hemoglobin', value: '13.4 g/dL', flag: '', ref: '12.0–15.5' },
      { name: 'Platelets', value: '265 ×10⁹/L', flag: '', ref: '150–400' } ],
      stages: [ { from: 3, results: [
        { name: 'White blood cells', value: '18.6 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
        { name: 'Hemoglobin', value: '13.1 g/dL', flag: '', ref: '12.0–15.5' },
        { name: 'Platelets', value: '240 ×10⁹/L', flag: '', ref: '150–400' } ] } ] },
    lft: { useful: true, results: [
      { name: 'Bilirubin (bile pigment)', value: '1.0 mg/dL', flag: '', ref: '0.1–1.2' },
      { name: 'ALT (liver enzyme)', value: '42 U/L', flag: '', ref: '7–45' },
      { name: 'Alkaline phosphatase (bile duct enzyme)', value: '118 U/L', flag: '', ref: '40–130' } ],
      stages: [ { from: 3, results: [
        { name: 'Bilirubin (bile pigment)', value: '4.2 mg/dL', flag: 'H', ref: '0.1–1.2' },
        { name: 'ALT (liver enzyme)', value: '186 U/L', flag: 'H', ref: '7–45' },
        { name: 'Alkaline phosphatase (bile duct enzyme)', value: '310 U/L', flag: 'H', ref: '40–130' } ] },
        { from: 5, results: [
        { name: 'Bilirubin (bile pigment)', value: '2.1 mg/dL, falling', flag: 'H', ref: '0.1–1.2' },
        { name: 'ALT (liver enzyme)', value: '120 U/L', flag: 'H', ref: '7–45' },
        { name: 'Alkaline phosphatase (bile duct enzyme)', value: '240 U/L', flag: 'H', ref: '40–130' } ] } ] },
    lipase: { useful: true, results: [ { name: 'Lipase (pancreas enzyme)', value: '34 U/L', flag: '', ref: '10–60' } ] },
    us_formal: { useful: true, report: 'Gallstones with a thickened gallbladder wall and a little fluid around it; tender when pressed over the gallbladder. The bile duct is mildly widened.',
      stages: [ { from: 4, report: 'Repeat scan: gallstones with an inflamed gallbladder, and the bile duct is now clearly widened, suggesting a stone blocking it.' } ] },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '1.3 mmol/L', flag: '', ref: '0.5–2.0' } ],
      stages: [ { from: 3, results: [ { name: 'Lactate', value: '2.6 mmol/L', flag: 'H', ref: '0.5–2.0' } ] } ] },
    cultures: { useful: true, report: 'Blood cultures sent to the lab. Results in about 48 hours.' },
    ct_abd: { useful: false, why: 'Ultrasound is the best first test for the gallbladder and has no radiation; a CT can even miss gallstones.' },
    xr_abd: { useful: false, why: 'Most gallstones do not show on a plain X-ray, so it would not answer the question.' }
  },
  talk: {
    afterDecision: 3,
    who: 'The patient',
    title: 'Worried about surgery',
    situation: 'After hearing she needs to stay in hospital, she says: "I have two kids at home and I hate hospitals. Can you just give me tablets for the infection and let me go? I will come back if it gets worse."',
    question: 'How do you respond?',
    options: [
      { text: 'Tablets alone may not settle this, and it can turn serious fast. What worries you most — could someone help at home?', correct: true,
        feedback: 'It is honest about the risk while showing respect for her worries and inviting her to solve the practical problems together.' },
      { text: 'Okay, I will write you a prescription for antibiotic tablets and you can come back to the surgical clinic next week if needed.', correct: false,
        feedback: 'Sending her home with an inflamed gallbladder and a widened bile duct is unsafe, and she has not been told the real risks.' },
      { text: 'You do not really have a choice here. The surgeons have decided you are staying, so there is nothing more to discuss.', correct: false,
        feedback: 'An adult who understands the risks can make her own choices; pressure without explanation damages trust.' },
      { text: 'Hospitals are very safe these days, so please do not worry. Everything will be fine and you will be home soon.', correct: false,
        feedback: 'Empty reassurance ignores her real concern (her children) and promises an outcome nobody can guarantee.' }
    ]
  }
};

// ───────────────────────────────────────────── Necrotizing soft-tissue infection
window.CASE_EXTRAS['e-nsti-leg-01'] = {
  esi: 2,
  esiWhy: 'He has fever, a fast heart rate and fast breathing with severe pain — signs of sepsis that should not wait.',
  tests: {
    cbc: { useful: true, results: [
      { name: 'White blood cells', value: '19.4 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
      { name: 'Hemoglobin', value: '13.9 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'Platelets', value: '182 ×10⁹/L', flag: '', ref: '150–400' } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '131 mmol/L', flag: 'L', ref: '135–145' },
      { name: 'Potassium', value: '4.4 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '1.5 mg/dL', flag: 'H', ref: '0.7–1.3' },
      { name: 'Glucose', value: '268 mg/dL', flag: 'H', ref: '70–140' } ] },
    crp: { useful: true, results: [ { name: 'CRP (inflammation marker)', value: '240 mg/L', flag: 'H', ref: '< 5' } ] },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '3.4 mmol/L', flag: 'H', ref: '0.5–2.0' } ],
      stages: [ { from: 3, results: [ { name: 'Lactate', value: '2.8 mmol/L', flag: 'H', ref: '0.5–2.0' } ] },
                { from: 4, results: [ { name: 'Lactate', value: '1.4 mmol/L', flag: '', ref: '0.5–2.0' } ] } ] },
    ck: { useful: true, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '1,650 U/L', flag: 'H', ref: '40–200' } ] },
    cultures: { useful: true, report: 'Blood cultures sent to the lab. Results in about 48 hours.',
      stages: [ { from: 4, report: 'Cultures grew a common streptococcus bacterium; antibiotics have been adjusted to match.' } ] },
    glucose: { useful: true, results: [ { name: 'Fingerstick glucose', value: '268 mg/dL', flag: 'H', ref: '70–140' } ],
      stages: [ { from: 3, results: [ { name: 'Fingerstick glucose', value: '290 mg/dL', flag: 'H', ref: '70–140' } ] } ] },
    mri: { useful: false, why: 'An MRI takes a long time and would delay surgery, which is the treatment this fast-spreading infection needs.' },
    xr_limb: { useful: false, why: 'A normal X-ray does not rule this infection out, so it cannot change the decision to call the surgeons.' },
    dimer: { useful: false, why: 'D-dimer is high in almost any serious infection, so it cannot help tell a clot from this deep infection.' }
  },
  talk: {
    afterDecision: 2,
    who: 'The patient',
    title: 'Will I lose my leg?',
    situation: 'He grips your arm as the surgeons arrive. "Everyone suddenly looks serious. Are you going to cut my leg off? Just tell me straight."',
    question: 'How do you respond?',
    options: [
      { text: 'This is a serious, deep infection. The surgeons want to remove the infected tissue quickly — that gives you the best chance of keeping your leg.', correct: true,
        feedback: 'He asked for honesty and got it, with a clear reason for the urgency and no false promises.' },
      { text: 'No, of course not, nobody loses a leg from a little scrape. Try to relax and let the pain medicine do its job.', correct: false,
        feedback: 'False reassurance about a life-threatening infection breaks trust if things turn out to be more serious.' },
      { text: 'Yes, that is quite likely with this kind of infection, so it is best to prepare yourself and your wife for it now.', correct: false,
        feedback: 'This is not known yet; delivering the worst outcome as fact causes needless distress.' },
      { text: 'I am not the surgeon, so I really cannot say anything about the operation. You will have to wait and ask the surgical team when they come in to see you.', correct: false,
        feedback: 'You can still explain what is happening and why; avoiding the question leaves him frightened and alone.' }
    ]
  }
};

// ───────────────────────────────────────────── Adrenal crisis
window.CASE_EXTRAS['e-adrenal-crisis-01'] = {
  esi: 1,
  esiWhy: 'She is drowsy with low blood pressure and a fast heart rate — shock that needs immediate life-saving treatment.',
  tests: {
    glucose: { useful: true, results: [ { name: 'Fingerstick glucose', value: '58 mg/dL', flag: 'L', ref: '70–140' } ],
      stages: [ { from: 3, results: [ { name: 'Fingerstick glucose', value: '96 mg/dL', flag: '', ref: '70–140' } ] } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '127 mmol/L', flag: 'L', ref: '135–145' },
      { name: 'Potassium', value: '5.6 mmol/L', flag: 'H', ref: '3.5–5.0' },
      { name: 'Urea (BUN)', value: '32 mg/dL', flag: 'H', ref: '7–20' },
      { name: 'Creatinine (kidney)', value: '1.5 mg/dL', flag: 'H', ref: '0.6–1.1' } ],
      stages: [ { from: 3, results: [
        { name: 'Sodium', value: '129 mmol/L', flag: 'L', ref: '135–145' },
        { name: 'Potassium', value: '5.2 mmol/L', flag: 'H', ref: '3.5–5.0' },
        { name: 'Creatinine (kidney)', value: '1.2 mg/dL', flag: 'H', ref: '0.6–1.1' } ] },
        { from: 4, results: [
        { name: 'Sodium', value: '131 mmol/L', flag: 'L', ref: '135–145' },
        { name: 'Potassium', value: '4.6 mmol/L', flag: '', ref: '3.5–5.0' },
        { name: 'Creatinine (kidney)', value: '1.0 mg/dL', flag: '', ref: '0.6–1.1' } ] } ] },
    ecg: { useful: true, report: 'Sinus tachycardia with slightly tall, peaked T waves, fitting a mildly high potassium.', image: 'ecg-peaked-t',
      stages: [ { from: 4, report: 'Normal sinus rhythm. T waves now look normal.', image: 'ecg-normal' } ] },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '2.9 mmol/L', flag: 'H', ref: '0.5–2.0' } ],
      stages: [ { from: 3, results: [ { name: 'Lactate', value: '1.5 mmol/L', flag: '', ref: '0.5–2.0' } ] } ] },
    cbc: { useful: true, results: [
      { name: 'White blood cells', value: '9.6 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Eosinophils (allergy-type white cells)', value: '0.7 ×10⁹/L', flag: 'H', ref: '0.0–0.5' },
      { name: 'Hemoglobin', value: '13.8 g/dL', flag: '', ref: '12.0–15.5' } ] },
    cultures: { useful: true, report: 'Blood cultures sent to look for an infection that may have triggered the crisis. Results in about 48 hours.' },
    ct_head: { useful: false, why: 'Her drowsiness is explained by shock and low sugar, and it improves with treatment, so a head CT would not help.' },
    ct_abd: { useful: false, why: 'Belly cramps and vomiting are common in adrenal crisis; a CT would delay the steroid treatment she urgently needs.' },
    tsh: { useful: false, why: 'A thyroid test will not explain or change the emergency treatment of shock with low sodium and low sugar.' }
  },
  talk: {
    afterDecision: 2,
    who: 'Her partner',
    title: 'Feeling guilty',
    situation: 'Her partner holds up the box of steroid tablets, close to tears. "I told her to skip them while she was being sick. I thought it was the sensible thing. Did I do this to her?"',
    question: 'How do you respond?',
    options: [
      { text: 'You were trying to help, and many people would think the same. Now we know the cause, we can treat it quickly.', correct: true,
        feedback: 'It is kind and honest without blaming, and turns the clue into hope — knowing the cause means treatment can start now.' },
      { text: 'Yes, unfortunately stopping those tablets is exactly what caused this, so you need to be much more careful from now on.', correct: false,
        feedback: 'Blaming a frightened partner adds guilt without helping; teaching about sick day rules can come later, gently.' },
      { text: 'No, the tablets probably have nothing to do with it. It is most likely just a bad stomach bug, so try not to worry.', correct: false,
        feedback: 'This is inaccurate — stopping long-term steroids is the key cause — and could lead to the same thing happening again.' },
      { text: 'Let us not talk about blame right now. Please go and sit in the waiting room while we focus on treating her for the next while.', correct: false,
        feedback: 'Sending the partner away ignores their distress, and they are a valuable source of information about her medicines.' }
    ]
  }
};

// ───────────────────────────────────────────── Kidney stone → infected blocked kidney
window.CASE_EXTRAS['e-kidney-stone-01'] = {
  esi: 3,
  esiWhy: 'He is in severe pain but stable, and will need pain relief through an IV, urine and blood tests, and a scan.',
  tests: {
    ua: { useful: true, results: [
      { name: 'Blood', value: 'Positive', flag: 'H', ref: 'Negative' },
      { name: 'Nitrites', value: 'Negative', flag: '', ref: 'Negative' },
      { name: 'White cells (leukocytes)', value: 'Negative', flag: '', ref: 'Negative' } ],
      stages: [ { from: 3, results: [
        { name: 'Blood', value: 'Positive', flag: 'H', ref: 'Negative' },
        { name: 'Nitrites', value: 'Positive', flag: 'H', ref: 'Negative' },
        { name: 'White cells (leukocytes)', value: 'Strongly positive', flag: 'H', ref: 'Negative' } ] } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '140 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.1 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '1.1 mg/dL', flag: '', ref: '0.7–1.3' } ] },
    cbc: { useful: true, results: [
      { name: 'White blood cells', value: '10.2 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Hemoglobin', value: '15.1 g/dL', flag: '', ref: '13.5–17.5' } ],
      stages: [ { from: 3, results: [
        { name: 'White blood cells', value: '15.9 ×10⁹/L', flag: 'H', ref: '4.5–11.0' },
        { name: 'Hemoglobin', value: '14.8 g/dL', flag: '', ref: '13.5–17.5' } ] } ] },
    ct_abd: { useful: true, report: 'Low-dose CT without contrast: a 5 mm stone in the lower left ureter, with the left kidney mildly swollen from the blockage.' },
    us_bedside: { useful: true, report: 'The left kidney looks mildly swollen with urine backing up (hydronephrosis); the right kidney looks normal.' },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '1.1 mmol/L', flag: '', ref: '0.5–2.0' } ],
      stages: [ { from: 3, results: [ { name: 'Lactate', value: '2.2 mmol/L', flag: 'H', ref: '0.5–2.0' } ] } ] },
    cultures: { useful: true, report: 'Blood and urine cultures sent to the lab. Results in about 48 hours.' },
    xr_abd: { useful: false, why: 'Many stones do not show on a plain X-ray, and the CT has already answered the question.' },
    lipase: { useful: false, why: 'His pain is in the side and back and moves to the groin, which fits a stone, not the pancreas.' },
    mri: { useful: false, why: 'MRI is slow and poor at showing small stones; it would not change his plan.' }
  },
  talk: {
    afterDecision: 4,
    who: 'The patient',
    title: '"You said I could go home"',
    situation: 'He is shivering under a blanket and frustrated. "An hour ago you said I could go home. Now you are saying I need a procedure? Did someone miss something?"',
    question: 'How do you respond?',
    options: [
      { text: 'Things changed: the fever means the blocked kidney is now infected. That is new, and it needs draining today to keep you safe.', correct: true,
        feedback: 'Honest about the change and why it matters, without defensiveness, so he understands the new plan.' },
      { text: 'Nobody missed anything, the plan was always to keep you in. You must have misheard what the doctor told you earlier this morning.', correct: false,
        feedback: 'This is untrue and blames the patient; being straightforward about a change in plan builds trust.' },
      { text: 'Yes, honestly we probably should have kept you from the start. Mistakes like that happen when it gets this busy.', correct: false,
        feedback: 'The earlier plan was reasonable; the fever is a new development. Guessing at blame is not accurate honesty.' },
      { text: 'Please do not get upset — the urology team will explain everything to you when they come down.', correct: false,
        feedback: 'He deserves an explanation now; pushing it onto another team leaves him anxious and confused.' }
    ]
  }
};

// ───────────────────────────────────────────── Burns with smoke inhalation
window.CASE_EXTRAS['f-burns-kitchen-fire'] = {
  esi: 1,
  esiWhy: 'A large burn after smoke in a closed room can swell the airway shut, so he needs immediate airway care and resuscitation.',
  tests: {
    cohb: { useful: true, results: [ { name: 'Carboxyhemoglobin (CO level)', value: '6%', flag: 'H', ref: '< 3% (non-smoker)' } ],
      stages: [ { from: 2, results: [ { name: 'Carboxyhemoglobin (CO level)', value: '4%', flag: 'H', ref: '< 3% (non-smoker)' } ] } ] },
    abg: { useful: true, results: [
      { name: 'pH', value: '7.35', flag: '', ref: '7.35–7.45' },
      { name: 'CO₂', value: '41 mmHg', flag: '', ref: '35–45' },
      { name: 'Oxygen (on high-flow mask)', value: '210 mmHg', flag: 'H', ref: '80–100 on room air' } ] },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '2.4 mmol/L', flag: 'H', ref: '0.5–2.0' } ],
      stages: [ { from: 4, results: [ { name: 'Lactate', value: '1.6 mmol/L', flag: '', ref: '0.5–2.0' } ] } ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '15.8 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'White blood cells', value: '11.8 ×10⁹/L', flag: 'H', ref: '4.5–11.0' } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '141 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.3 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '0.9 mg/dL', flag: '', ref: '0.7–1.3' } ] },
    ecg: { useful: true, report: 'Sinus tachycardia, otherwise normal.', image: 'ecg-sinus-tach' },
    cxr: { useful: true, report: 'Lungs look clear. Smoke injury often does not show on an X-ray in the first hours.', image: 'cxr-normal',
      stages: [ { from: 2, report: 'Breathing tube in a good position. Lungs still look clear.', image: 'cxr-normal' } ] },
    ct_head: { useful: false, why: 'He has no head injury and is awake and talking, so a head CT adds radiation without benefit.' },
    ct_chest: { useful: false, why: 'A CT does not show early airway swelling well and would take him away from close monitoring.' },
    xr_limb: { useful: false, why: 'His arm is burned, not broken; an X-ray would not change how the burn is treated.' }
  },
  talk: {
    afterDecision: 5,
    who: 'His sister',
    title: 'Why move him?',
    situation: 'His sister has just arrived after a long drive. "He is finally settled and now you want to move him to another hospital? Is it because you cannot look after him here?"',
    question: 'How do you respond?',
    options: [
      { text: 'He is stable now. A burn center has a whole team for burns this size and his smoke injury, so it is the right place for him.', correct: true,
        feedback: 'It explains the reason for transfer honestly and positively, so she sees it as getting him the best care, not giving up.' },
      { text: 'It is just hospital policy for burns, I am afraid. I do not really know the details of why, but the transfer team will.', correct: false,
        feedback: 'Vague answers increase worry; she deserves a clear reason in plain words.' },
      { text: 'Honestly, his burns are so bad that we simply cannot manage him here safely, and there is a chance he will not survive the trip.', correct: false,
        feedback: 'This is frightening and inaccurate — he is stable — and focuses on fear instead of the plan.' },
      { text: 'He will be totally fine there in a few days, so you do not need to worry about anything at all.', correct: false,
        feedback: 'Promising a perfect outcome is not honest; large burns need weeks of care and nobody can guarantee results.' }
    ]
  }
};

// ───────────────────────────────────────────── Compartment syndrome
window.CASE_EXTRAS['f-compartment-syndrome'] = {
  esi: 2,
  esiWhy: 'A deformed shin bone with severe pain is high risk for nerve and blood flow problems, so he should not wait.',
  tests: {
    xr_limb: { useful: true, report: 'Displaced fracture through the middle of the tibia (shin bone) and a fracture of the fibula. No break in the skin.', image: 'xr-tibia-fracture' },
    ck: { useful: true, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '420 U/L', flag: 'H', ref: '40–200' } ],
      stages: [ { from: 2, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '2,850 U/L', flag: 'H', ref: '40–200' } ] },
                { from: 4, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '4,300 U/L, still rising', flag: 'H', ref: '40–200' } ] } ] },
    cbc: { useful: true, results: [
      { name: 'Hemoglobin', value: '14.6 g/dL', flag: '', ref: '13.5–17.5' },
      { name: 'White blood cells', value: '10.8 ×10⁹/L', flag: '', ref: '4.5–11.0' },
      { name: 'Platelets', value: '248 ×10⁹/L', flag: '', ref: '150–400' } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.3 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '0.9 mg/dL', flag: '', ref: '0.7–1.3' } ] },
    coag: { useful: true, results: [ { name: 'INR (clotting time)', value: '1.0', flag: '', ref: '0.8–1.2' } ] },
    typecross: { useful: true, results: [ { name: 'Blood group & crossmatch', value: 'O positive — 2 units ready', flag: '', ref: '—' } ] },
    mri: { useful: false, why: 'MRI is slow and does not diagnose compartment syndrome; it would only delay surgery.' },
    us_formal: { useful: false, why: 'A scan of the blood vessels would show good flow, which does not rule out compartment syndrome.' },
    ct_head: { useful: false, why: 'He wore a helmet, has no head injury and is fully alert, so a head CT adds radiation without benefit.' }
  },
  talk: {
    afterDecision: 3,
    who: 'The patient',
    title: 'Can it wait until morning?',
    situation: 'When you mention surgery tonight, he shakes his head. "They said tomorrow morning. Can we just wait? I am scared, and I have heard you can wake up during operations."',
    question: 'How do you respond?',
    options: [
      { text: 'I hear you are scared. The swelling is cutting off blood to your muscles, so waiting could cause lasting harm. Can I explain the anesthesia?', correct: true,
        feedback: 'It names his fear, explains clearly why the surgery cannot wait, and offers to address his specific worry.' },
      { text: 'Sure, morning is fine. A few more hours will not make any real difference, so try to get some sleep and the nurses will check on you overnight.', correct: false,
        feedback: 'This is untrue: muscle can be permanently damaged within hours, so delaying surgery is unsafe.' },
      { text: 'There is no time for questions — we are going now, so please just sign here.', correct: false,
        feedback: 'Even in an emergency, consent means explaining the reason; rushing him without answers is not good care.' },
      { text: 'Waking up during operations never happens anymore, so there is nothing at all to be worried about tonight.', correct: false,
        feedback: '"Never" is not honest, and it ignores the bigger point he needs to hear: why the surgery is urgent.' }
    ]
  }
};

// ───────────────────────────────────────────── Febrile seizure
window.CASE_EXTRAS['f-febrile-seizure'] = {
  esi: 2,
  esiWhy: 'She is still drowsy after a seizure with a high fever and fast heart rate, so she needs to be seen right away.',
  tests: {
    glucose: { useful: true, results: [ { name: 'Bedside blood glucose', value: '96 mg/dL', flag: '', ref: '70–140' } ] },
    ct_head: { useful: false, why: 'A short, whole-body seizure with fever in a child who returns to normal does not need a brain scan, which would add radiation.' },
    cbc: { useful: false, why: 'She has a clear cause for her fever (an ear infection) and looks well, so a blood count would not change the plan.' },
    bmp: { useful: false, why: 'Salt levels are almost always normal in a simple febrile seizure, and the result would not change her care.' },
    cultures: { useful: false, why: 'She is well-looking with an obvious source of fever, so blood cultures add a needle without helping.' }
  },
  talk: {
    afterDecision: 1,
    who: 'Her mother',
    title: 'A terrified parent',
    situation: 'Her mother is shaking and crying. "I thought she was dying. She went stiff and her eyes rolled back. Is she going to be all right? Is it epilepsy?"',
    question: 'How do you respond?',
    options: [
      { text: 'That must have been so frightening. The seizure has stopped and she is breathing well. Seizures with fever are common at her age.', correct: true,
        feedback: 'It acknowledges the fear, gives calming facts about right now, and gently eases the epilepsy worry without promising anything before she is examined.' },
      { text: 'It is very likely epilepsy, so she will probably need tests and daily medicine for many years. We will refer her to a specialist.', correct: false,
        feedback: 'This jumps to a wrong conclusion; most seizures with fever in toddlers are not epilepsy.' },
      { text: 'Please try to calm down, because you being upset will only make her more upset too. She is fine.', correct: false,
        feedback: 'Telling a frightened parent to calm down feels dismissive, and "she is fine" comes before she has been examined.' },
      { text: 'I cannot really say anything yet until we have done a full set of blood tests, a brain scan and probably a spinal tap on her as well.', correct: false,
        feedback: 'This sounds alarming and is not accurate — a simple febrile seizure usually needs no scan or spinal tap.' }
    ]
  }
};

// ───────────────────────────────────────────── Exertional heat stroke
window.CASE_EXTRAS['f-heat-stroke'] = {
  esi: 1,
  esiWhy: 'He is confused with a dangerously high core temperature — he needs immediate cooling to save his brain and organs.',
  tests: {
    glucose: { useful: true, results: [ { name: 'Bedside blood glucose', value: '102 mg/dL', flag: '', ref: '70–140' } ] },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '141 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '4.8 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '1.6 mg/dL', flag: 'H', ref: '0.5–1.0 (teen)' } ],
      stages: [ { from: 2, results: [
        { name: 'Sodium', value: '142 mmol/L', flag: '', ref: '135–145' },
        { name: 'Potassium', value: '5.4 mmol/L', flag: 'H', ref: '3.5–5.0' },
        { name: 'Creatinine (kidney)', value: '2.3 mg/dL', flag: 'H', ref: '0.5–1.0 (teen)' } ] },
        { from: 3, results: [
        { name: 'Sodium', value: '142 mmol/L', flag: '', ref: '135–145' },
        { name: 'Potassium', value: '6.4 mmol/L', flag: 'C', ref: '3.5–5.0' },
        { name: 'Creatinine (kidney)', value: '2.4 mg/dL', flag: 'H', ref: '0.5–1.0 (teen)' } ] },
        { from: 4, results: [
        { name: 'Sodium', value: '141 mmol/L', flag: '', ref: '135–145' },
        { name: 'Potassium', value: '5.3 mmol/L', flag: 'H', ref: '3.5–5.0' },
        { name: 'Creatinine (kidney)', value: '2.2 mg/dL', flag: 'H', ref: '0.5–1.0 (teen)' } ] } ] },
    ck: { useful: true, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '9,800 U/L', flag: 'H', ref: '40–200' } ],
      stages: [ { from: 2, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '24,000 U/L', flag: 'C', ref: '40–200' } ] },
                { from: 4, results: [ { name: 'Creatine kinase (muscle enzyme)', value: '36,000 U/L, still climbing', flag: 'C', ref: '40–200' } ] } ] },
    lft: { useful: true, results: [
      { name: 'ALT (liver enzyme)', value: '210 U/L', flag: 'H', ref: '7–45' },
      { name: 'Bilirubin', value: '1.0 mg/dL', flag: '', ref: '0.1–1.2' } ] },
    coag: { useful: true, results: [ { name: 'INR (clotting time)', value: '1.3', flag: 'H', ref: '0.8–1.2' } ] },
    ua: { useful: true, results: [
      { name: 'Color', value: 'Dark brown', flag: 'H', ref: 'Pale yellow' },
      { name: 'Blood (dipstick)', value: 'Strongly positive', flag: 'H', ref: 'Negative' },
      { name: 'Red cells under microscope', value: 'Very few', flag: '', ref: '0–2' } ] },
    ecg: { useful: true, report: 'Sinus tachycardia, otherwise normal.', image: 'ecg-sinus-tach',
      stages: [ { from: 3, report: 'Tall, peaked T waves — a pattern seen with high potassium.', image: 'ecg-peaked-t' },
                { from: 4, report: 'Sinus rhythm; T waves have returned toward normal.', image: 'ecg-normal' } ] },
    ct_head: { useful: false, why: 'His confusion is explained by heat stroke and clears as he cools; a scan would delay cooling and add radiation.' },
    cultures: { useful: false, why: 'His high temperature came from exercise in the heat, not an infection, so cultures would not guide treatment.' },
    dimer: { useful: false, why: 'D-dimer is often raised after heat stroke and does not answer any question that would change his care.' }
  },
  talk: {
    afterDecision: 4,
    who: 'The patient',
    title: 'Keeping it from the coach',
    situation: 'Now alert, he whispers to you while his parents step out. "Please don\'t tell Coach I felt dizzy an hour before I collapsed. I kept going. If he finds out, I\'ll lose my starting spot."',
    question: 'How do you respond?',
    options: [
      { text: 'Your health details stay private from your coach unless you agree. But your safety comes first, and your doctors will guide when you can play.', correct: true,
        feedback: 'It respects his privacy, is honest that safety decisions are not up for trade, and keeps him trusting the team.' },
      { text: 'Okay, I promise I will not tell anyone at all about the dizziness — not your parents, not your coach, and not the other doctors caring for you.', correct: false,
        feedback: 'You cannot promise to hide important medical information from his care team or parents when his safety is at stake.' },
      { text: 'Your coach has a right to know everything that happened, so I will call him tonight and explain exactly what you did.', correct: false,
        feedback: 'A coach is not part of his care team; sharing his health details without permission breaks his privacy.' },
      { text: 'Pushing through dizziness was really foolish. You are lucky to be alive, and you should be ashamed.', correct: false,
        feedback: 'Shaming a teen makes him less likely to be honest in the future; the goal is to teach, not to blame.' }
    ]
  }
};

// ───────────────────────────────────────────── Carbon monoxide poisoning
window.CASE_EXTRAS['f-carbon-monoxide'] = {
  esi: 2,
  esiWhy: 'She fainted and was exposed to a likely poison along with her whole family — high risk, even though her oxygen reading looks normal.',
  tests: {
    cohb: { useful: true, results: [ { name: 'Carboxyhemoglobin (CO level)', value: '24%', flag: 'C', ref: '< 3% (non-smoker)' } ],
      stages: [ { from: 4, results: [ { name: 'Carboxyhemoglobin (CO level)', value: '6%', flag: 'H', ref: '< 3% (non-smoker)' } ] } ] },
    abg: { useful: true, results: [
      { name: 'pH', value: '7.33', flag: 'L', ref: '7.35–7.45' },
      { name: 'CO₂', value: '34 mmHg', flag: 'L', ref: '35–45' },
      { name: 'Oxygen dissolved in blood', value: '96 mmHg', flag: '', ref: '80–100' },
      { name: 'Pulse oximeter reading', value: '99%', flag: '', ref: '95–100 (falsely normal with CO)' } ],
      stages: [ { from: 1, results: [
        { name: 'pH', value: '7.33', flag: 'L', ref: '7.35–7.45' },
        { name: 'CO₂', value: '34 mmHg', flag: 'L', ref: '35–45' },
        { name: 'Oxygen dissolved in blood (on high-flow mask)', value: '320 mmHg', flag: 'H', ref: '80–100 on room air' },
        { name: 'Pulse oximeter reading', value: '100%', flag: '', ref: '95–100 (falsely normal with CO)' } ] } ] },
    lactate: { useful: true, results: [ { name: 'Lactate', value: '3.1 mmol/L', flag: 'H', ref: '0.5–2.0' } ] },
    troponin: { useful: true, results: [ { name: 'Troponin (heart muscle marker)', value: 'Mildly raised', flag: 'H', ref: 'Below lab cutoff' } ] },
    ecg: { useful: true, report: 'Fast regular rhythm (sinus tachycardia) with mild changes suggesting strain on the heart muscle.', image: 'ecg-sinus-tach' },
    bmp: { useful: true, results: [
      { name: 'Sodium', value: '139 mmol/L', flag: '', ref: '135–145' },
      { name: 'Potassium', value: '3.9 mmol/L', flag: '', ref: '3.5–5.0' },
      { name: 'Creatinine (kidney)', value: '0.8 mg/dL', flag: '', ref: '0.6–1.1' } ] },
    lipase: { useful: false, why: 'The family thought it was a stomach bug, but several people and a pet sick at once points to the home, not the pancreas.' },
    ct_abd: { useful: false, why: 'Her nausea comes from carbon monoxide, not a belly problem, so a CT adds radiation without answering the question.' },
    dimer: { useful: false, why: 'There is no sign of a blood clot, and a D-dimer would not help confirm or treat carbon monoxide poisoning.' }
  },
  talk: {
    afterDecision: 3,
    who: 'Her 11-year-old son',
    title: 'Was it our fault?',
    situation: 'Sitting on a stretcher with an oxygen mask, the 11-year-old pulls it aside. "We begged Mom to keep the heater on because we were cold. Is this our fault? Is she going to die?"',
    question: 'How do you respond?',
    options: [
      { text: 'This is not your fault. The gas has no smell, so nobody could tell. The oxygen is clearing it out, and she is being looked after closely.', correct: true,
        feedback: 'Simple, honest words for a child: it removes blame, explains the invisible gas, and gives real reassurance about her care.' },
      { text: 'Well, the heater is what made everyone sick, so it is good you know that now. Next time just listen to your parents and wear warmer clothes.', correct: false,
        feedback: 'This hints that the children are to blame and does not answer his fear about his mother.' },
      { text: 'Your mom is very, very sick, and we do not know yet if she will survive this.', correct: false,
        feedback: 'This is frightening and not accurate — she is alert and improving — and is too much for a child to carry alone.' },
      { text: 'Do not worry about grown-up things. Put your mask back on and be quiet.', correct: false,
        feedback: 'He asked a real question; brushing it off leaves a scared child alone with guilt.' }
    ]
  }
};

// ───────────────────────────────────────────── Button battery
window.CASE_EXTRAS['f-button-battery'] = {
  esi: 2,
  esiWhy: 'He looks well, but a swallowed button battery can burn the food pipe within hours — a high-risk situation that cannot wait.',
  tests: {
    cxr: { useful: true, report: 'A round metal object about 2 cm across sits in the esophagus at the level of the upper chest, with a "double ring" edge typical of a button battery.', image: 'cxr-battery' },
    xr_abd: { useful: true, report: 'Included in the neck-to-belly X-ray: no other objects seen in the stomach or bowel.' },
    ct_chest: { useful: false, why: 'The X-ray already shows where the battery is; a CT adds a lot of radiation for a toddler and delays removal.' },
    us_formal: { useful: false, why: 'Ultrasound cannot see a battery inside the chest well, and waiting for it would delay urgent removal.' },
    bmp: { useful: false, why: 'Blood salts will not change the plan — the battery needs to come out within hours.' },
    cbc: { useful: false, why: 'A blood count will not change the urgent plan to remove the battery.' }
  },
  talk: {
    afterDecision: 3,
    who: 'His mother',
    title: 'A burn was found',
    situation: 'The specialists have told her there is a burn where the battery sat. She asks you quietly: "Is he going to be okay? I should have noticed sooner. Did I cause this?"',
    question: 'How do you respond?',
    options: [
      { text: 'Bringing him in fast helped him a lot. There is a burn, so the team will watch him closely, but you did the right thing.', correct: true,
        feedback: 'It is honest that a burn was found and why he is being watched, while easing guilt she does not deserve.' },
      { text: 'He will be absolutely fine now that it is out — the burn is nothing to think about, and you can stop worrying.', correct: false,
        feedback: 'Burns from batteries can get worse after removal; promising he is fine is not honest.' },
      { text: 'These batteries are so dangerous that every parent really should know to keep them locked up. Next time, check all the battery covers at home before it happens.', correct: false,
        feedback: 'Prevention advice matters later, but saying it now sounds like blame and does not answer her question.' },
      { text: 'I would rather not say anything about the burn — that is really a question for the specialists.', correct: false,
        feedback: 'You can explain what you know in plain words; avoiding her question increases her worry.' }
    ]
  }
};
