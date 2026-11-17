/* Physical-examination findings for case pack F.
   Region ids: head, neck, heart, lungs, abdomen, pelvis, armR, armL, legR, legL, skin.
   `stages[].from` = decisionIndex (number of decisions completed) at which that finding applies.
   Fictional, educational content. No medication doses or procedure instructions. */
window.EXAM_DATA = window.EXAM_DATA || {};

/* ───────────── Kitchen fire burns ───────────── */
window.EXAM_DATA['f-burns-kitchen-fire'] = {
  head: { finding: 'Awake and talking, in pain. Face is red like a mild sunburn, with no blisters.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'Black soot around the nostrils and inside the mouth. The hairs in his nose look singed. His voice is hoarse.', abnormal: true },
                    { from: 2, finding: 'Sedated on the ventilator with a breathing tube in place. Face red but not blistered.', abnormal: true } ] },
  neck: { finding: 'No noisy breathing. Windpipe in the middle. Back of the neck red, no blisters.', abnormal: false, key: true,
          stages: [ { from: 1, finding: 'Hoarse voice and frequent throat clearing. No stridor yet, but a warning sign of airway swelling.', abnormal: true },
                    { from: 2, finding: 'Breathing tube secured. Windpipe in the middle.', abnormal: false } ] },
  lungs: { finding: 'Breathing a little fast. Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal',
           stages: [ { from: 1, finding: 'A few scattered wheezes. He coughs up dark-flecked mucus from breathing smoke.', abnormal: true, sound: 'wheeze' },
                     { from: 2, finding: 'A few scattered wheezes on the ventilator. Dark-flecked mucus is cleared from the breathing tube.', abnormal: true, sound: 'wheeze' },
                     { from: 4, finding: 'Equal breath sounds on both sides with the ventilator. Only an occasional faint wheeze.', abnormal: false, sound: 'breath-normal' } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 4, finding: 'Regular heartbeat at a normal rate. Strong pulses.', abnormal: false, sound: 'heart-normal' } ] },
  skin: { finding: 'Blistered, moist, pink burns (partial thickness) across the whole front of the chest and abdomen and all around the right arm. Face and back of neck only red (superficial).', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Burns cleaned and covered with clean dressings. Skin elsewhere feels cool to the touch.', abnormal: true },
                    { from: 4, finding: 'Burns covered with clean dressings. Skin elsewhere warmer under a warming blanket.', abnormal: true } ] },
  armR: { finding: 'Partial-thickness burn all the way around the arm (circumferential). The watch has left a red line on the wrist. Hand is warm and the wrist pulse is present.', abnormal: true, key: true,
          stages: [ { from: 4, finding: 'Arm more swollen inside the dressings. Hand still warm with a pulse present; the burn team is checking it regularly.', abnormal: true } ] },
  armL: { finding: 'No burns. Normal skin, pulse and movement.', abnormal: false },
  legR: { finding: 'No burns. Normal skin and pulses.', abnormal: false },
  legL: { finding: 'No burns. Normal skin and pulses.', abnormal: false }
};

/* ───────────── Compartment syndrome ───────────── */
window.EXAM_DATA['f-compartment-syndrome'] = {
  legR: { finding: 'Shin swollen and bruised with an obvious bend. Skin intact. Foot warm and pink, foot pulse present, and he can wiggle his toes.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'In a splint. Calf swollen but soft. Foot warm, pulse present, toes move, feeling normal.', abnormal: true },
                    { from: 2, finding: 'Calf tense and hard. Gently lifting the toes causes severe pain. Tingling between the first two toes. Foot pulse still easy to feel.', abnormal: true },
                    { from: 5, finding: 'Clean surgical dressings. Calf softer; pain much improved. Feeling between the toes is returning.', abnormal: true } ] },
  head: { finding: 'Alert and talking, uncomfortable but coping with pain relief.', abnormal: false, key: true,
          stages: [ { from: 2, finding: 'Very distressed, saying the pain is the worst he has ever felt despite strong pain relief.', abnormal: true },
                    { from: 5, finding: 'Drowsy after the anesthetic but comfortable.', abnormal: false } ] },
  heart: { finding: 'Regular heartbeat, slightly fast from pain. No murmurs.', abnormal: false, sound: 'heart-normal',
           stages: [ { from: 2, finding: 'Fast, regular heartbeat from severe pain.', abnormal: true, sound: 'heart-fast' },
                     { from: 5, finding: 'Regular heartbeat at a normal rate.', abnormal: false, sound: 'heart-normal' } ] },
  legL: { finding: 'Normal leg. No swelling or tenderness; foot pulse present.', abnormal: false, key: true },
  pelvis: { finding: 'Pressing on the hips and pelvis causes no pain. No pelvic injury.', abnormal: false },
  abdomen: { finding: 'Soft and not tender. No bruising.', abnormal: false, sound: 'bowel-normal' },
  skin: { finding: 'No cuts or wounds anywhere, including over the fracture.', abnormal: false }
};

/* ───────────── Febrile seizure ───────────── */
window.EXAM_DATA['f-febrile-seizure'] = {
  head: { finding: 'Drowsy but opens eyes and cries when touched. Right eardrum is red and bulging. Runny nose; throat mildly red.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'Awake and looking around. Right eardrum red and bulging. Pupils equal and react to light.', abnormal: true },
                    { from: 3, finding: 'Bright, playful and smiling. Right eardrum still red.', abnormal: true } ] },
  neck: { finding: 'Moves her neck freely; no neck stiffness (a reassuring sign against meningitis).', abnormal: false, key: true },
  skin: { finding: 'Hot and flushed. No rash anywhere, and no spots that stay when pressed.', abnormal: false, key: true,
          stages: [ { from: 3, finding: 'Warm, normal color. No rash.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat from the fever. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 3, finding: 'Regular heartbeat at a normal rate for her age.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides. No wheeze or crackles.', abnormal: false, sound: 'breath-normal' },
  abdomen: { finding: 'Soft, no tenderness or swelling.', abnormal: false, sound: 'bowel-normal' },
  armL: { finding: 'Moving both arms equally. No weakness on one side.', abnormal: false }
};

/* ───────────── Heat stroke ───────────── */
window.EXAM_DATA['f-heat-stroke'] = {
  head: { finding: 'Restless and confused, mumbling and not answering questions properly. Does not know where he is.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'Calmer, answering simple questions but still slow and muddled.', abnormal: true },
                    { from: 2, finding: 'Awake and knows his name and where he is. Tired.', abnormal: false } ] },
  skin: { finding: 'Very hot and flushed to the touch, damp with sweat.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'Cool and wet after cold-water immersion. Normal color.', abnormal: false } ] },
  heart: { finding: 'Very fast, regular heartbeat. Pulse feels bounding.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 2, finding: 'Regular heartbeat, a bit fast. Monitor shows taller T waves than earlier.', abnormal: true, sound: 'heart-fast' },
                     { from: 4, finding: 'Regular heartbeat at a normal rate. Monitor pattern back toward normal.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Breathing fast, but clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' },
  legR: { finding: 'No injuries. Muscles soft.', abnormal: false,
          stages: [ { from: 2, finding: 'Thigh and calf muscles are tender and sore when squeezed.', abnormal: true } ] },
  legL: { finding: 'No injuries. Muscles soft.', abnormal: false,
          stages: [ { from: 2, finding: 'Thigh and calf muscles are tender and sore when squeezed.', abnormal: true } ] },
  pelvis: { finding: 'Bladder not full; he has not passed urine in hours.', abnormal: true,
            stages: [ { from: 1, finding: 'Catheter shows only a small amount of dark, cola-colored urine.', abnormal: true },
                      { from: 3, finding: 'Urine output improving and the color is getting lighter.', abnormal: true } ] },
  abdomen: { finding: 'Soft, not tender.', abnormal: false, sound: 'bowel-normal' }
};

/* ───────────── Carbon monoxide poisoning ───────────── */
window.EXAM_DATA['f-carbon-monoxide'] = {
  head: { finding: 'Throbbing headache. Slightly slow to answer and unsteady when standing. Pupils equal and reactive.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Headache easing. Answering questions quickly and clearly.', abnormal: true },
                    { from: 4, finding: 'Alert, no headache. Walking steadily.', abnormal: false } ] },
  skin: { finding: 'Pale, with pink lips and fingertips. No blue color. The finger probe reads 99%.', abnormal: false, key: true,
          stages: [ { from: 1, finding: 'Pink and well-colored, and the probe still reads 99%. In carbon monoxide poisoning, normal color and a normal probe reading can be misleading.', abnormal: true },
                    { from: 4, finding: 'Normal color. Warm and dry.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 3, finding: 'Still a little fast; monitor shows mild changes of heart strain.', abnormal: true, sound: 'heart-fast' },
                     { from: 4, finding: 'Regular heartbeat at a normal rate.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides. No wheeze or crackles.', abnormal: false, sound: 'breath-normal' },
  neck: { finding: 'No neck stiffness.', abnormal: false },
  abdomen: { finding: 'Soft and not tender, though she feels sick.', abnormal: false, sound: 'bowel-normal' }
};

/* ───────────── Button battery ingestion ───────────── */
window.EXAM_DATA['f-button-battery'] = {
  head: { finding: 'Happy and playful. Drooling a little more than usual. No burns inside the mouth.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Sleepy after the anesthetic but wakes easily and cuddles his mother.', abnormal: false },
                    { from: 4, finding: 'Awake and playing quietly in bed.', abnormal: false } ] },
  neck: { finding: 'No swelling or tenderness. He seems reluctant to swallow and lets saliva dribble out.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Swallowing his saliva carefully. No neck swelling.', abnormal: true } ] },
  lungs: { finding: 'Clear breath sounds on both sides. No stridor, wheeze or crackles.', abnormal: false, key: true, sound: 'breath-normal' },
  heart: { finding: 'Regular heartbeat at a normal rate for his age. No murmurs.', abnormal: false, sound: 'heart-normal' },
  abdomen: { finding: 'Soft, not tender, no swelling.', abnormal: false, sound: 'bowel-normal' },
  skin: { finding: 'Pink and warm. No rash.', abnormal: false }
};
