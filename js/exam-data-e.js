/* Physical-examination findings for case pack E (cases-e.js).
   Region ids: head, neck, heart, lungs, abdomen, pelvis, armR, armL, legR, legL, skin.
   `stages[].from` = decisionIndex (number of decisions completed) at which that finding applies.
   Fictional, educational content. No medication doses or procedure instructions. */
window.EXAM_DATA = window.EXAM_DATA || {};

/* ───────────── Stomach bug with mild dehydration ───────────── */
window.EXAM_DATA['e-gastro-dehydration-01'] = {
  head: { finding: 'Alert and chatting. Lips and tongue look dry, and his eyes look slightly sunken.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Alert. Lips and tongue are moist again.', abnormal: false } ] },
  heart: { finding: 'Regular but fast heartbeat. No murmurs.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 2, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' },
  abdomen: { finding: 'Soft belly with mild, spread-out tenderness and no one sore spot. Gurgling bowel sounds are louder and more frequent than usual.', abnormal: true, key: true, sound: 'bowel-active',
             stages: [ { from: 3, finding: 'Soft and only slightly tender. Bowel sounds are settling toward normal.', abnormal: false, sound: 'bowel-normal' } ] },
  skin: { finding: 'When the skin on the back of his hand is gently pinched, it returns a little slowly. Fingertip color returns in about 2 seconds.', abnormal: true,
          stages: [ { from: 2, finding: 'Skin springs back normally when gently pinched. Warm and well colored.', abnormal: false } ] },
  neck: { finding: 'Supple neck with no stiffness. No swollen glands.', abnormal: false }
};

/* ───────────── Cholecystitis → cholangitis ───────────── */
window.EXAM_DATA['e-gallbladder-01'] = {
  head: { finding: 'Uncomfortable but alert. The whites of her eyes are a normal color.', abnormal: false, key: true,
          stages: [ { from: 3, finding: 'Shivering and flushed. The whites of her eyes now look yellow (jaundice).', abnormal: true },
                    { from: 5, finding: 'Comfortable and alert. A faint yellow tinge remains in the whites of her eyes, fading.', abnormal: true } ] },
  abdomen: { finding: 'Tender under the right ribs. When you press there and she breathes in, she stops the breath sharply (positive Murphy’s sign). Rest of the belly is soft.', abnormal: true, key: true, sound: 'bowel-quiet',
             stages: [ { from: 3, finding: 'Very tender under the right ribs, with tenderness now spreading toward the middle of the upper belly. Bowel sounds quiet.', abnormal: true, sound: 'bowel-quiet' },
                       { from: 5, finding: 'Mild tenderness under the right ribs only. Bowel sounds returning.', abnormal: true, sound: 'bowel-normal' } ] },
  heart: { finding: 'Regular heartbeat, slightly fast. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 1, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' },
                     { from: 3, finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast' },
                     { from: 5, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides, though she takes shallow breaths because deep ones hurt her right side.', abnormal: false, sound: 'breath-normal' },
  skin: { finding: 'Warm and a normal color. No rash.', abnormal: false, key: true,
          stages: [ { from: 3, finding: 'Hot to touch. Skin has a yellow tinge, and she says she has started to feel itchy.', abnormal: true },
                    { from: 5, finding: 'Warm, with a faint yellow tinge that is fading.', abnormal: true } ] },
  pelvis: { finding: 'No lower belly tenderness. Bladder not full.', abnormal: false,
            stages: [ { from: 3, finding: 'No lower belly tenderness. She reports her urine has turned dark, like tea.', abnormal: true },
                      { from: 5, finding: 'No lower belly tenderness. Urine is becoming lighter in color.', abnormal: false } ] }
};

/* ───────────── Necrotizing soft-tissue infection ───────────── */
window.EXAM_DATA['e-nsti-leg-01'] = {
  legL: { finding: 'Lower leg is red and swollen around a small healing scrape. He pulls away even before you touch it.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'The skin is only mildly red, but the leg feels firm and tense (woody), and the tenderness extends well beyond the red area. The pain seems far worse than the skin looks.', abnormal: true },
                    { from: 2, finding: 'Redness has spread past the pen line. Some skin looks dusky and there are a few small blisters. A crackling feeling under the skin is noted by the surgeon.', abnormal: true },
                    { from: 3, finding: 'Covered by a large surgical dressing after the operation. Toes are warm with a good pulse in the foot.', abnormal: true },
                    { from: 5, finding: 'Clean surgical wound under the dressing, healing well. Swelling much reduced.', abnormal: true } ] },
  legR: { finding: 'Normal right leg: no redness, swelling or tenderness. Foot pulses present.', abnormal: false },
  head: { finding: 'Flushed and sweaty, but alert and answering questions.', abnormal: true,
          stages: [ { from: 2, finding: 'More drowsy and slow to answer.', abnormal: true },
                    { from: 4, finding: 'Awake, alert and talking normally.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 4, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Breathing a little fast, but breath sounds are clear on both sides.', abnormal: false, sound: 'breath-normal' },
  skin: { finding: 'Hot to touch. Fingertip color returns in about 3 seconds.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Hot, with mottled (blotchy) skin over the knees. Fingertip color returns slowly, over 3 seconds.', abnormal: true },
                    { from: 4, finding: 'Warm and pink. Fingertip color returns in under 2 seconds.', abnormal: false } ] },
  abdomen: { finding: 'Soft and not tender. Normal bowel sounds.', abnormal: false, sound: 'bowel-normal' }
};

/* ───────────── Adrenal crisis ───────────── */
window.EXAM_DATA['e-adrenal-crisis-01'] = {
  head: { finding: 'Drowsy and slow to answer, but follows commands. Dry lips and tongue.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'More alert and answering normally. Lips still a little dry.', abnormal: false },
                    { from: 5, finding: 'Alert, chatting and moist lips.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat with a weak pulse at the wrist. No murmurs.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 3, finding: 'Heart rate slowing. Pulse at the wrist much stronger. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides. No wheeze.', abnormal: false, sound: 'breath-normal' },
  abdomen: { finding: 'Mildly tender all over without one sore spot. Soft, with no guarding. Bowel sounds active.', abnormal: true, sound: 'bowel-active',
             stages: [ { from: 4, finding: 'Soft and barely tender. Bowel sounds normal.', abnormal: false, sound: 'bowel-normal' } ] },
  skin: { finding: 'Cool hands, and fingertip color returns slowly. Thin purple stretch marks on her belly and bruises on her forearms, common side effects of long-term steroid tablets.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Hands warming up. Fingertip color returns in about 2 seconds. Stretch marks and forearm bruises unchanged.', abnormal: true } ] },
  neck: { finding: 'Neck veins are flat even when lying back, a sign of low blood volume. No neck stiffness.', abnormal: true,
          stages: [ { from: 3, finding: 'Neck veins visible at a normal level. No neck stiffness.', abnormal: false } ] },
  legL: { finding: 'No swelling or tenderness. Foot pulses present but weak.', abnormal: false }
};

/* ───────────── Kidney stone → infected blocked kidney ───────────── */
window.EXAM_DATA['e-kidney-stone-01'] = {
  abdomen: { finding: 'Soft belly. Tapping over the left lower back (the kidney area) is very painful. No tenderness at the front of the belly.', abnormal: true, key: true, sound: 'bowel-normal',
             stages: [ { from: 3, finding: 'Soft belly. The left kidney area is very tender again, and he flinches when it is tapped.', abnormal: true, sound: 'bowel-normal' },
                       { from: 5, finding: 'Soft belly. Drainage tube in the left side is covered by a dressing. Mild tenderness only.', abnormal: true, sound: 'bowel-normal' } ] },
  pelvis: { finding: 'No bladder fullness. He has passed a small amount of pinkish urine. Groin exam normal, with no swelling.', abnormal: true, key: true,
            stages: [ { from: 3, finding: 'Urine now looks cloudy as well as pink.', abnormal: true },
                      { from: 5, finding: 'Urine is clearer and a lighter color.', abnormal: false } ] },
  head: { finding: 'Restless and pacing, unable to find a comfortable position.', abnormal: true,
          stages: [ { from: 1, finding: 'Much more comfortable after pain relief, resting on the bed.', abnormal: false },
                    { from: 3, finding: 'Shivering and feeling unwell, though alert.', abnormal: true },
                    { from: 5, finding: 'Comfortable and alert.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 1, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' },
                     { from: 3, finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast' },
                     { from: 5, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  skin: { finding: 'Sweaty from the pain, but a normal temperature to touch.', abnormal: false, key: true,
          stages: [ { from: 3, finding: 'Hot and flushed, with shivering.', abnormal: true },
                    { from: 5, finding: 'Warm and dry, a normal color.', abnormal: false } ] },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' }
};
