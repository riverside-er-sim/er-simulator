/* Physical-examination findings for case pack D.
   Region ids: head, neck, heart, lungs, abdomen, pelvis, armR, armL, legR, legL, skin.
   `stages[].from` = decisionIndex (number of decisions completed) at which that finding applies.
   Fictional, educational content. No medication doses or procedure instructions. */
window.EXAM_DATA = window.EXAM_DATA || {};

/* ───────────── D1: Aortic dissection ───────────── */
window.EXAM_DATA['d-cardio-dissection-01'] = {
  head: { finding: 'Awake and talking, but pale, sweaty and frightened. Keeps reaching round to his back.', abnormal: true,
          stages: [ { from: 3, finding: 'Calmer now that the pain is controlled. Still pale.', abnormal: true },
                    { from: 4, finding: 'Paler again and quieter, saying he feels unwell.', abnormal: true },
                    { from: 5, finding: 'Resting comfortably after surgery. Normal color returning.', abnormal: false } ] },
  neck: { finding: 'Neck veins are not swollen. Windpipe in the middle.', abnormal: false },
  heart: { finding: 'Fast, regular heartbeat. A soft blowing murmur just after the second heart sound, a sign the valve at the start of the aorta may be leaking.', abnormal: true, key: true, sound: 'murmur',
           stages: [ { from: 4, finding: 'Fast heartbeat. The heart sounds are a little quieter than before, and the soft murmur is still there.', abnormal: true, sound: 'heart-fast' },
                     { from: 5, finding: 'Regular heartbeat at a normal rate after the repair. No murmur.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides. No crackles.', abnormal: false, sound: 'breath-normal' },
  armR: { finding: 'Strong pulse at the wrist. Blood pressure in this arm is high (about 170 systolic).', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Strong pulse. Blood pressure now controlled in this arm.', abnormal: false } ] },
  armL: { finding: 'Pulse at the wrist feels weaker than on the right. Blood pressure in this arm is much lower than the right arm.', abnormal: true, key: true,
          stages: [ { from: 4, finding: 'Pulse at the wrist is now very faint. The hand feels cool and he says his fingers tingle.', abnormal: true },
                    { from: 5, finding: 'Pulse at the wrist is strong again and the hand is warm.', abnormal: false } ] },
  abdomen: { finding: 'Soft and not tender. No pulsing lump felt.', abnormal: false, sound: 'bowel-normal' },
  legL: { finding: 'Foot pulses can be felt. Leg warm with normal color.', abnormal: false },
  skin: { finding: 'Pale, cool and sweaty.', abnormal: true,
          stages: [ { from: 3, finding: 'Still pale, a little less sweaty.', abnormal: true },
                    { from: 4, finding: 'Paler and cool to touch, with a clammy feel.', abnormal: true },
                    { from: 5, finding: 'Warm and pink. Capillary refill under 2 seconds.', abnormal: false } ] }
};

/* ───────────── D2: Simple faint ───────────── */
window.EXAM_DATA['d-cardio-syncope-01'] = {
  head: { finding: 'Alert and fully oriented. No bump or cut on the head and no bitten tongue.', abnormal: false, key: true },
  heart: { finding: 'Regular heartbeat at a normal rate. Normal heart sounds with no murmur, including when she stands up.', abnormal: false, key: true, sound: 'heart-normal' },
  skin: { finding: 'A little pale and slightly cool and sweaty, as is common straight after a faint.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'Warm with normal color. Capillary refill under 2 seconds.', abnormal: false } ] },
  neck: { finding: 'Neck soft and moves freely. Neck veins normal.', abnormal: false },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' },
  abdomen: { finding: 'Soft and not tender.', abnormal: false, sound: 'bowel-normal' },
  armR: { finding: 'Normal strength and feeling. No injury from the fall.', abnormal: false }
};

/* ───────────── D3: Spontaneous pneumothorax ───────────── */
window.EXAM_DATA['d-resp-pneumothorax-01'] = {
  lungs: { finding: 'Breath sounds are clearly quieter on the left side than the right. The left chest sounds hollow when tapped.', abnormal: true, key: true, sound: 'diminished',
           stages: [ { from: 3, finding: 'Almost no breath sounds on the left. He is breathing fast and shallow.', abnormal: true, sound: 'diminished' },
                     { from: 4, finding: 'Breath sounds heard on both sides now that the lung has re-expanded. Drain in place on the left.', abnormal: false, sound: 'breath-normal' } ] },
  neck: { finding: 'Windpipe is in the middle. Neck veins are not swollen.', abnormal: false, key: true,
          stages: [ { from: 3, finding: 'Windpipe is pushed over to the right and the neck veins are swollen — signs of air trapped under pressure.', abnormal: true },
                    { from: 4, finding: 'Windpipe back in the middle. Neck veins normal.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmur.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 4, finding: 'Regular heartbeat at a normal rate. No murmur.', abnormal: false, sound: 'heart-normal' } ] },
  head: { finding: 'Alert and talking in full sentences, but uncomfortable. Lips pink.', abnormal: false, key: true,
          stages: [ { from: 3, finding: 'Anxious, speaking only a few words at a time. Lips look a little dusky.', abnormal: true },
                    { from: 4, finding: 'Comfortable and chatting. Lips pink.', abnormal: false } ] },
  skin: { finding: 'Warm with normal color.', abnormal: false,
          stages: [ { from: 3, finding: 'Pale and sweaty.', abnormal: true },
                    { from: 4, finding: 'Warm with normal color.', abnormal: false } ] },
  abdomen: { finding: 'Soft and not tender.', abnormal: false, sound: 'bowel-normal' },
  legL: { finding: 'No calf swelling or tenderness (no sign of a leg clot).', abnormal: false }
};

/* ───────────── D4: Subarachnoid hemorrhage ───────────── */
window.EXAM_DATA['d-neuro-sah-01'] = {
  head: { finding: 'Alert and oriented, but in severe pain with her eyes shut against the light. Pupils equal and react to light. Speech normal.', abnormal: true, key: true,
          stages: [ { from: 4, finding: 'Drowsy and confused about where she is, keeps closing her eyes mid-sentence. Pupils equal and react to light.', abnormal: true },
                    { from: 5, finding: 'More awake and answering questions correctly. Still has a headache. Pupils equal.', abnormal: true } ] },
  neck: { finding: 'Stiff neck: bending her chin toward her chest is painful and resisted.', abnormal: true, key: true },
  armR: { finding: 'Normal strength and feeling. Can hold her arm out straight without drifting.', abnormal: false, key: true },
  armL: { finding: 'Normal strength and feeling. No drift.', abnormal: false },
  heart: { finding: 'Regular heartbeat at a normal rate. No murmur.', abnormal: false, sound: 'heart-normal' },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' },
  skin: { finding: 'No rash anywhere on the body. Skin warm, no fever.', abnormal: false },
  legR: { finding: 'Normal strength and feeling in both legs.', abnormal: false }
};

/* ───────────── D5: Cardiac tamponade ───────────── */
window.EXAM_DATA['d-cardio-tamponade-01'] = {
  neck: { finding: 'Neck veins are swollen even while he sits upright (raised JVP).', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Neck veins look normal when sitting up.', abnormal: false },
                    { from: 4, finding: 'Neck veins are swollen again while sitting up.', abnormal: true },
                    { from: 5, finding: 'Neck veins look normal.', abnormal: false } ] },
  heart: { finding: 'Fast heartbeat. The heart sounds are muffled and hard to hear.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 3, finding: 'Heart sounds clearer now, at a near-normal rate.', abnormal: false, sound: 'heart-normal' },
                     { from: 4, finding: 'Fast heartbeat. Heart sounds are quieter again.', abnormal: true, sound: 'heart-fast' },
                     { from: 5, finding: 'Clear heart sounds at a normal rate.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides with no crackles — so the breathlessness is not from fluid in the lungs.', abnormal: false, key: true, sound: 'breath-normal' },
  armR: { finding: 'Weak, fast pulse at the wrist that fades noticeably each time he breathes in (pulsus paradoxus).', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Steady, stronger pulse at the wrist that no longer fades with breathing.', abnormal: false },
                    { from: 4, finding: 'Pulse is fast and fades again when he breathes in.', abnormal: true },
                    { from: 5, finding: 'Steady, strong pulse.', abnormal: false } ] },
  head: { finding: 'Anxious, sitting bolt upright and leaning forward. Talking in short sentences.', abnormal: true,
          stages: [ { from: 3, finding: 'Relaxed and talking easily.', abnormal: false },
                    { from: 4, finding: 'Looks anxious again and is sitting forward.', abnormal: true },
                    { from: 5, finding: 'Relaxed and comfortable.', abnormal: false } ] },
  skin: { finding: 'Pale, cool and clammy. Slow capillary refill.', abnormal: true,
          stages: [ { from: 3, finding: 'Warm and pink.', abnormal: false },
                    { from: 4, finding: 'Pale and cool again.', abnormal: true },
                    { from: 5, finding: 'Warm and pink.', abnormal: false } ] },
  abdomen: { finding: 'Soft and not tender.', abnormal: false, sound: 'bowel-normal' },
  legR: { finding: 'No ankle swelling and no calf tenderness.', abnormal: false }
};
