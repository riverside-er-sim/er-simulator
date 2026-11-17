/* Physical-examination findings for the clickable body diagram.
   Region ids: head, neck, heart, lungs, abdomen, pelvis, armR, armL, legR, legL, skin.
   `stages[].from` = decisionIndex (number of decisions completed) at which that finding applies.
   Fictional, educational content. No medication doses or procedure instructions. */
window.EXAM_DATA = window.EXAM_DATA || {};

/* ───────────── Core cases ───────────── */

window.EXAM_DATA['core-stemi-shock'] = {
  head: { finding: 'Awake and answering questions, but anxious and pale. Forehead beaded with sweat.', abnormal: true,
          stages: [ { from: 4, finding: 'Alert, relaxed and chatting. Face has normal color.', abnormal: false } ] },
  neck: { finding: 'Neck veins look a little full while he sits propped up, a sign of back-pressure from a weak heart (raised JVP).', abnormal: true,
          stages: [ { from: 4, finding: 'Neck veins look normal when sitting propped up.', abnormal: false },
                    { from: 5, finding: 'Neck veins are full again while sitting up (raised JVP), a sign of extra fluid backing up.', abnormal: true },
                    { from: 6, finding: 'Neck veins look normal.', abnormal: false } ] },
  heart: { finding: 'Fast, faint heartbeat. Pulse at the wrist feels weak (thready). No murmurs.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 3, finding: 'Mostly regular, but the monitor shows short bursts of fast, irregular beats every so often.', abnormal: true, sound: 'heart-irregular' },
                     { from: 4, finding: 'Regular heartbeat at a normal rate. Pulse feels strong. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Fine crackles at the bottom of both lungs, from fluid backing up into the lungs.', abnormal: true, key: true, sound: 'crackles',
           stages: [ { from: 3, finding: 'Clear breath sounds on both sides. No crackles.', abnormal: false, sound: 'breath-normal' },
                     { from: 5, finding: 'Crackles at the bottom of both lungs. He is more comfortable sitting up than lying flat.', abnormal: true, sound: 'crackles' },
                     { from: 6, finding: 'Clear breath sounds on both sides. Comfortable lying flat.', abnormal: false, sound: 'breath-normal' } ] },
  skin: { finding: 'Pale, cool and clammy. Fingertip color takes over 3 seconds to return after pressing (slow capillary refill).', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'A bit warmer than before; fingertip color returns in about 3 seconds.', abnormal: true },
                    { from: 4, finding: 'Warm and pink. Capillary refill under 2 seconds.', abnormal: false } ] },
  pelvis: { finding: 'Bladder is not full. Very little urine is collecting, a sign the kidneys are not getting enough blood flow.', abnormal: true,
            stages: [ { from: 4, finding: 'Bladder not full; he is passing a good amount of urine now.', abnormal: false } ] },
  legR: { finding: 'No ankle swelling and no calf tenderness. Foot pulses present.', abnormal: false,
          stages: [ { from: 5, finding: 'Puffy ankle; pressing leaves a dent that slowly fills back in (pitting edema).', abnormal: true },
                    { from: 6, finding: 'Ankle swelling has gone down.', abnormal: false } ] },
  legL: { finding: 'No ankle swelling and no calf tenderness. Foot pulses present.', abnormal: false,
          stages: [ { from: 5, finding: 'Puffy ankle; pressing leaves a dent that slowly fills back in (pitting edema).', abnormal: true },
                    { from: 6, finding: 'Ankle swelling has gone down.', abnormal: false } ] }
};

window.EXAM_DATA['core-asthma'] = {
  lungs: { finding: 'Loud wheezes across both lungs, especially breathing out. Air entry reduced at both bases.', abnormal: true, key: true, sound: 'wheeze',
           stages: [ { from: 4, finding: 'Wheeze across both lungs. Breath sounds may be a little quieter on the right, but the wheeze makes it hard to be sure.', abnormal: true, sound: 'wheeze' },
                     { from: 5, finding: 'Wheeze still heard throughout both lungs, with fair air entry. She is working a bit harder to breathe than earlier.', abnormal: true, sound: 'wheeze' },
                     { from: 7, finding: 'Only a faint wheeze at the end of a deep breath. Good air entry on both sides.', abnormal: false, sound: 'breath-normal' } ] },
  neck: { finding: 'Neck muscles tighten with every breath in (accessory muscle use). Windpipe is in the middle.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Neck muscles still working with each breath, a little less than on arrival. Windpipe in the middle.', abnormal: true },
                    { from: 5, finding: 'Neck muscles are starting to pull with each breath again. Windpipe in the middle.', abnormal: true },
                    { from: 7, finding: 'Relaxed neck muscles at rest. Windpipe in the middle.', abnormal: false } ] },
  head: { finding: 'Alert but frightened, speaking only 3–4 words at a time. Lips pink, not blue.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Still alert, but looking tired and speaking in short phrases.', abnormal: true },
                    { from: 6, finding: 'More tired and slower to answer, speaking in short phrases. A warning sign that she is wearing out.', abnormal: true },
                    { from: 7, finding: 'Bright and alert, speaking in full sentences.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 7, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  skin: { finding: 'Slightly sweaty. No hives, rash or lip swelling (so this does not look like an allergic reaction).', abnormal: false,
          stages: [ { from: 7, finding: 'Warm and dry, normal color. No rash.', abnormal: false } ] }
};

window.EXAM_DATA['core-appendicitis'] = {
  abdomen: { finding: 'Tender in the lower right abdomen, and the muscles tense up when pressed there (guarding). Pain is worse when he coughs.', abnormal: true, key: true, sound: 'bowel-quiet',
             stages: [ { from: 2, finding: 'Tender across the whole lower abdomen. The belly wall feels hard and rigid, and even gentle pressure hurts a lot.', abnormal: true, sound: 'bowel-quiet' },
                       { from: 3, finding: 'Soft belly with mild soreness around small healing keyhole wounds. No rigidity.', abnormal: false, sound: 'bowel-normal' } ] },
  pelvis: { finding: 'Stretching the right hip backward hurts the lower right belly (psoas sign). Testicles normal, not swollen or tender; no groin lump.', abnormal: true, key: true,
            stages: [ { from: 3, finding: 'Hip movements no longer hurt. Testicles and groin normal.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 2, finding: 'Very fast, regular heartbeat. Pulse a little weaker than before.', abnormal: true, sound: 'heart-fast' },
                     { from: 3, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  skin: { finding: 'Warm and flushed with fever. Lips a little dry. Capillary refill about 2 seconds.', abnormal: true,
          stages: [ { from: 2, finding: 'Hot and sweaty with high fever. Capillary refill about 3 seconds.', abnormal: true },
                    { from: 3, finding: 'Normal temperature and color. Well hydrated.', abnormal: false } ] },
  head: { finding: 'Alert but uncomfortable, lying very still because moving hurts.', abnormal: true,
          stages: [ { from: 2, finding: 'Looks flushed and unwell, lying very still.', abnormal: true },
                    { from: 3, finding: 'Comfortable and chatty, asking about soccer.', abnormal: false } ] },
  lungs: { finding: 'Clear breath sounds on both sides — no chest infection causing the pain.', abnormal: false, sound: 'breath-normal' }
};

window.EXAM_DATA['ortho-wrist-01'] = {
  armR: { finding: 'Swollen and tender just above the wrist on the thumb side of the forearm. Strong wrist pulse, fingers pink and warm, refill under 2 seconds, normal feeling and finger movement. Anatomical snuffbox not tender.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'In a splint. Tender at one spot on the forearm bone about 3 cm above the wrist crease. Fingers pink, warm and moving.', abnormal: true },
                    { from: 2, finding: 'Fingers look puffy and feel tingly; the splint is tight. Pulse still present, but pain is worse.', abnormal: true },
                    { from: 3, finding: 'Splint re-padded. Tingling gone, fingers pink and warm, refill under 2 seconds, all fingers moving.', abnormal: false },
                    { from: 4, finding: 'Comfortable in a removable wrist splint. Fingers pink, warm, and moving well with normal feeling.', abnormal: false } ] },
  armL: { finding: 'Normal left arm, wrist and hand — useful for comparison.', abnormal: false },
  skin: { finding: 'No cuts, scrapes or open wounds over the injured wrist, so the bone is not exposed (a closed injury).', abnormal: false, key: true },
  head: { finding: 'Alert and talking normally. No bumps or bruises on the head; she did not hit it.', abnormal: false },
  neck: { finding: 'No neck pain or tenderness. Moves her neck freely.', abnormal: false }
};

/* ───────────── Cases A ───────────── */

window.EXAM_DATA['a-afib-thyroid-01'] = {
  heart: { finding: 'Fast and completely irregular heartbeat with no steady pattern (irregularly irregular). The pulse at the wrist varies in strength.', abnormal: true, key: true, sound: 'heart-irregular',
           stages: [ { from: 4, finding: 'Still irregular, but much slower and calmer than on arrival.', abnormal: true, sound: 'heart-irregular' } ] },
  neck: { finding: 'The front of the neck looks slightly full. The gland there feels smoothly enlarged and is not tender (goiter). Neck veins normal.', abnormal: true, key: true },
  armR: { finding: 'Fine shaking of the outstretched fingers (fine tremor). Palms are warm and damp.', abnormal: true, key: true },
  armL: { finding: 'Fine tremor of the outstretched fingers, same as the right. Normal strength.', abnormal: true },
  skin: { finding: 'Warm, moist and slightly sweaty all over. Capillary refill normal.', abnormal: true },
  lungs: { finding: 'Clear breath sounds on both sides. No crackles.', abnormal: false, sound: 'breath-normal' },
  head: { finding: 'Alert and talking in full sentences, a little restless. Face symmetrical and speech clear — no stroke signs.', abnormal: false },
  legL: { finding: 'No ankle swelling.', abnormal: false }
};

window.EXAM_DATA['a-pe-travel-01'] = {
  lungs: { finding: 'Breathing fast, but breath sounds are clear and equal on both sides. Sharp pain on the right when she breathes in deeply.', abnormal: false, key: true, sound: 'breath-normal' },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 4, finding: 'Very fast heartbeat. Pulse at the wrist is weak.', abnormal: true, sound: 'heart-fast' } ] },
  legL: { finding: 'Left calf is swollen, warm and tender — about 3 cm bigger around than the right calf.', abnormal: true, key: true },
  legR: { finding: 'Right calf normal: soft, not swollen, not tender.', abnormal: false },
  neck: { finding: 'Neck veins look normal.', abnormal: false,
          stages: [ { from: 4, finding: 'Neck veins are now full and bulging, a sign the right side of the heart is struggling.', abnormal: true } ] },
  head: { finding: 'Alert and anxious. Says her fingers tingle from breathing fast.', abnormal: true,
          stages: [ { from: 4, finding: 'More confused and slow to answer questions.', abnormal: true } ] },
  skin: { finding: 'Normal color, slightly sweaty. Capillary refill under 2 seconds.', abnormal: false,
          stages: [ { from: 4, finding: 'Pale, cool and clammy. Capillary refill slow (about 4 seconds).', abnormal: true } ] }
};

window.EXAM_DATA['a-pneumonia-01'] = {
  lungs: { finding: 'Crackles over the lower right chest, and breath sounds there have a harsher, louder quality. Left side clear.', abnormal: true, key: true, sound: 'crackles' },
  head: { finding: 'Alert and knows the date, place and who he is — not confused.', abnormal: false, key: true },
  skin: { finding: 'Hot and flushed with fever. Well hydrated, capillary refill under 2 seconds.', abnormal: true,
          stages: [ { from: 3, finding: 'Warm, less flushed. Well hydrated.', abnormal: false } ] },
  heart: { finding: 'Regular heartbeat, at the upper end of normal. No murmurs.', abnormal: false, sound: 'heart-normal' },
  abdomen: { finding: 'Soft and not tender — the pain is coming from the chest, not the belly.', abnormal: false, sound: 'bowel-normal' },
  legL: { finding: 'No calf swelling or tenderness.', abnormal: false }
};

window.EXAM_DATA['a-stroke-01'] = {
  head: { finding: 'Awake but frightened. Right side of the face droops, and his words come out jumbled (aphasia).', abnormal: true, key: true,
          stages: [ { from: 4, finding: 'Complains of a severe headache, has vomited, and is harder to wake.', abnormal: true } ] },
  armR: { finding: 'Very weak — he cannot lift the right arm against gravity.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Right arm now completely limp with no movement.', abnormal: true } ] },
  legR: { finding: 'Right leg weak; it drifts down when he tries to hold it up.', abnormal: true, key: true },
  armL: { finding: 'Normal strength and feeling in the left arm.', abnormal: false },
  legL: { finding: 'Normal strength and feeling in the left leg.', abnormal: false },
  heart: { finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' },
  neck: { finding: 'Airway clear, swallowing his saliva. No neck stiffness.', abnormal: false }
};

window.EXAM_DATA['a-seizure-01'] = {
  head: { finding: 'Drowsy but opens her eyes to her name. A little saliva around the mouth and a bite mark on the side of the tongue. No bumps on the head.', abnormal: true, key: true,
          stages: [ { from: 1, finding: 'Fully awake and talking normally. Small bite on the side of the tongue. Pupils equal; normal brain and nerve exam.', abnormal: true } ] },
  neck: { finding: 'No neck stiffness — she can bend her chin to her chest.', abnormal: false, key: true },
  lungs: { finding: 'Breathing on her own, with a little gurgling from saliva. Air moving well on both sides.', abnormal: true, sound: 'breath-normal',
           stages: [ { from: 1, finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 1, finding: 'Regular heartbeat at a normal rate. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  skin: { finding: 'Normal temperature. No rash or bruising.', abnormal: false },
  armR: { finding: 'Shoulder, arm and hand move normally — no injury from the fall. Normal strength.', abnormal: false }
};

/* ───────────── Cases B ───────────── */

window.EXAM_DATA['b-gi-bleed-01'] = {
  abdomen: { finding: 'Soft, mildly tender in the upper middle belly. No rigidity. Bowel sounds are busy.', abnormal: true, key: true, sound: 'bowel-active' },
  pelvis: { finding: 'Rectal check: black, sticky, tar-like stool (melena), a sign of bleeding high up in the gut.', abnormal: true, key: true },
  skin: { finding: 'Pale and slightly cool. Capillary refill about 3 seconds.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Very pale, cool and clammy. Capillary refill slow (about 4 seconds).', abnormal: true },
                    { from: 4, finding: 'Color improving; skin warmer. Capillary refill about 2 seconds.', abnormal: false } ] },
  heart: { finding: 'Fast and irregular heartbeat (his known rhythm problem). No murmurs.', abnormal: true, sound: 'heart-irregular',
           stages: [ { from: 3, finding: 'Faster than before, still irregular. Pulse feels weaker.', abnormal: true, sound: 'heart-irregular' },
                     { from: 4, finding: 'Irregular as usual for him, but slower and stronger after the transfusion.', abnormal: true, sound: 'heart-irregular' } ] },
  head: { finding: 'Alert. Inside of the lower eyelids looks pale. Feels faint when he sits up.', abnormal: true,
          stages: [ { from: 3, finding: 'Anxious and pale; dizzy even lying down.', abnormal: true },
                    { from: 4, finding: 'Alert and calmer. Less dizzy.', abnormal: false } ] },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' }
};

window.EXAM_DATA['b-urosepsis-01'] = {
  head: { finding: 'Drowsy but wakes to her name. Confused about the date and where she is.', abnormal: true, key: true,
          stages: [ { from: 5, finding: 'More awake; confusion is beginning to clear.', abnormal: true } ] },
  abdomen: { finding: 'Tender in the right side of the belly and over the right lower back (flank) when gently tapped.', abnormal: true, key: true, sound: 'bowel-normal' },
  pelvis: { finding: 'Mildly tender just above the pubic bone. Bladder not full. Very little urine.', abnormal: true },
  lungs: { finding: 'Breathing fast, but breath sounds are clear on both sides — no chest infection or fluid build-up.', abnormal: false, key: true, sound: 'breath-normal' },
  skin: { finding: 'Hot, flushed and dry with fever. Capillary refill about 2 seconds.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Hands and feet now cool, with slow capillary refill (about 4 seconds).', abnormal: true },
                    { from: 5, finding: 'Hands and feet warmer; capillary refill improving.', abnormal: true } ] },
  heart: { finding: 'Fast, regular heartbeat. Pulse feels weak. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 5, finding: 'Heart rate slower and pulse stronger. No murmurs.', abnormal: false, sound: 'heart-normal' } ] },
  legL: { finding: 'No leg or ankle swelling.', abnormal: false }
};

window.EXAM_DATA['b-meningitis-01'] = {
  neck: { finding: 'Stiff neck: bending his chin toward his chest is painful and limited (neck stiffness).', abnormal: true, key: true },
  head: { finding: 'Lying with eyes shut because light hurts (photophobia). Drowsy but answers questions correctly.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Only opens eyes to a loud voice and is confused about where he is.', abnormal: true } ] },
  skin: { finding: 'Hot to touch. No rash seen yet. Capillary refill about 2 seconds.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Small purple spots on the ankles and belly that do not fade when a glass is pressed on them (non-blanching rash). Capillary refill slow.', abnormal: true } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 2, finding: 'Very fast heartbeat with a weaker pulse.', abnormal: true, sound: 'heart-fast' } ] },
  legR: { finding: 'Normal leg. No spots on the skin.', abnormal: false,
          stages: [ { from: 2, finding: 'Small purple spots around the ankle that do not fade with pressure.', abnormal: true } ] },
  legL: { finding: 'Normal leg. No spots on the skin.', abnormal: false,
          stages: [ { from: 2, finding: 'Small purple spots around the ankle that do not fade with pressure.', abnormal: true } ] },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' }
};

window.EXAM_DATA['b-dka-01'] = {
  head: { finding: 'Tired but answers questions. Lips dry, and her breath smells fruity (from ketones).', abnormal: true, key: true,
          stages: [ { from: 4, finding: 'Complains of a bad headache and is newly confused about what day it is.', abnormal: true },
                    { from: 5, finding: 'More alert; headache easing.', abnormal: true } ] },
  lungs: { finding: 'Deep, fast, regular breaths (Kussmaul breathing) — her body is blowing off acid. Lungs are clear.', abnormal: true, key: true, sound: 'breath-normal',
           stages: [ { from: 4, finding: 'Breathing slower and less deep than on arrival. Lungs clear.', abnormal: false, sound: 'breath-normal' } ] },
  abdomen: { finding: 'Tender all over but soft, with no rigid area. Insulin pump site on the belly is clean.', abnormal: true, key: true, sound: 'bowel-quiet',
             stages: [ { from: 4, finding: 'Soft and only mildly tender.', abnormal: false, sound: 'bowel-normal' } ] },
  skin: { finding: 'Dry skin and mouth. Capillary refill about 3 seconds — signs of dehydration.', abnormal: true,
          stages: [ { from: 3, finding: 'Better hydrated. Capillary refill about 2 seconds.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 2, finding: 'Still fast but slowing as fluids go in.', abnormal: true, sound: 'heart-fast' },
                     { from: 4, finding: 'Heart rate has become unusually slow for her — a change that needs attention.', abnormal: true, sound: 'heart-normal' },
                     { from: 5, finding: 'Regular heartbeat at a normal rate.', abnormal: false, sound: 'heart-normal' } ] }
};

window.EXAM_DATA['b-hypoglycemia-01'] = {
  head: { finding: 'Knows his name but unsure of the date. Speech a little slow.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Fully alert and knows the date, place and time.', abnormal: false } ] },
  skin: { finding: 'Pale, cold and sweaty (clammy).', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Warm, dry and normal color.', abnormal: false } ] },
  armR: { finding: 'Hand is shaky (tremor). Normal strength.', abnormal: true,
          stages: [ { from: 2, finding: 'Hand steady. Normal strength.', abnormal: false } ] },
  armL: { finding: 'Hand is shaky, but strength is equal on both sides — no one-sided weakness.', abnormal: true,
          stages: [ { from: 2, finding: 'Hand steady. Normal strength.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 2, finding: 'Regular heartbeat at a normal rate.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' }
};

/* ───────────── Cases C ───────────── */

window.EXAM_DATA['c-trauma-spleen-01'] = {
  abdomen: { finding: 'Tender in the left upper belly. Belly is soft and not swollen yet.', abnormal: true, key: true, sound: 'bowel-quiet',
             stages: [ { from: 4, finding: 'Belly is more swollen and tense, and tender on the left side.', abnormal: true, sound: 'bowel-quiet' },
                       { from: 5, finding: 'Surgical dressing in place. Belly soft and appropriately sore.', abnormal: false, sound: 'bowel-quiet' } ] },
  lungs: { finding: 'Breath sounds equal on both sides. Tender over the left lower ribs; he winces on deep breaths.', abnormal: true, key: true, sound: 'breath-normal' },
  heart: { finding: 'Slightly fast, regular heartbeat. Pulse strong. No murmurs.', abnormal: true, key: true, sound: 'heart-fast',
           stages: [ { from: 3, finding: 'Very fast heartbeat with a weak, thready pulse.', abnormal: true, sound: 'heart-fast' },
                     { from: 4, finding: 'Still fast, pulse a little stronger.', abnormal: true, sound: 'heart-fast' },
                     { from: 5, finding: 'Regular heartbeat at a normal rate. Strong pulse.', abnormal: false, sound: 'heart-normal' } ] },
  skin: { finding: 'Tire-tread bruise across the left lower ribs. Skin warm and pink, capillary refill under 2 seconds.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Pale, cool and sweaty. Capillary refill slow (about 4 seconds). Tire-tread bruise on the left ribs.', abnormal: true },
                    { from: 5, finding: 'Warm and pink again. Tire-tread bruise on the left ribs.', abnormal: true } ] },
  armL: { finding: 'Left shoulder itself is not injured.', abnormal: false,
          stages: [ { from: 1, finding: 'Pain at the tip of the left shoulder, but the shoulder is not tender — pain spreading from irritation under the diaphragm (Kehr sign).', abnormal: true } ] },
  pelvis: { finding: 'Pelvis is stable and not tender when gently pressed. No blood at the urine opening.', abnormal: false },
  neck: { finding: 'In a protective collar. No tenderness over the bones at the back of the neck.', abnormal: false },
  head: { finding: 'Helmet protected his head. Alert, eyes open, answering questions normally.', abnormal: false,
          stages: [ { from: 3, finding: 'Awake but anxious and restless.', abnormal: true },
                    { from: 5, finding: 'Awake and calm.', abnormal: false } ] }
};

window.EXAM_DATA['c-trauma-headbleed-01'] = {
  head: { finding: 'Small bruise above the right ear, no cut. Alert and knows where she is. Pupils equal and react to light.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Keeps dozing off; opens eyes to voice, then drifts back to sleep and repeats questions. Pupils still equal for now.', abnormal: true } ] },
  neck: { finding: 'No tenderness over the neck bones; she turns her head freely without pain.', abnormal: false, key: true },
  heart: { finding: 'Irregularly irregular heartbeat at a normal rate, with no steady pattern. No murmurs.', abnormal: true, key: true, sound: 'heart-irregular' },
  armL: { finding: 'Normal strength and feeling in the left arm.', abnormal: false },
  legL: { finding: 'Normal strength in the left leg. Walks steadily.', abnormal: false },
  skin: { finding: 'A few old bruises on the forearms; she bruises easily. No other injuries.', abnormal: true }
};

window.EXAM_DATA['c-ortho-hip-01'] = {
  legR: { finding: 'Right leg is shorter and the foot is turned outward. Any movement of the hip is very painful. Foot warm with a good pulse.', abnormal: true, key: true },
  pelvis: { finding: 'Tender over the right hip and groin. Pelvic bones stable when gently pressed.', abnormal: true, key: true },
  legL: { finding: 'Left leg normal length, moves freely, foot warm with a good pulse.', abnormal: false },
  heart: { finding: 'Slow but regular heartbeat. No murmurs.', abnormal: true, key: true, sound: 'heart-normal',
           stages: [ { from: 4, finding: 'Regular heartbeat at a normal rate now.', abnormal: false, sound: 'heart-normal' } ] },
  head: { finding: 'Awake and talking, a little vague about how she fell. Dry mouth. No head bruises.', abnormal: true,
          stages: [ { from: 3, finding: 'Confused: thinks she is at school and is pulling at her IV line. Attention wanders.', abnormal: true },
                    { from: 4, finding: 'Calmer with her daughter at the bedside, but still a little muddled.', abnormal: true } ] },
  skin: { finding: 'Red pressure marks on the right hip and shoulder from lying on the floor. Skin dry with mild dehydration.', abnormal: true },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' }
};

window.EXAM_DATA['c-peds-croup-01'] = {
  neck: { finding: 'Barking cough and hoarse voice. A harsh noise on breathing in (stridor) only when he cries; slight pulling in at the bottom of the neck.', abnormal: true, key: true, sound: 'stridor',
          stages: [ { from: 3, finding: 'Breathing quietly while asleep. No stridor and no pulling in at the neck.', abnormal: false, sound: 'breath-normal' } ] },
  lungs: { finding: 'Good air entry on both sides. No wheeze or crackles.', abnormal: false, key: true, sound: 'breath-normal' },
  head: { finding: 'Alert, pink and playing with keys. Not drooling and happy to swallow juice.', abnormal: false, key: true },
  skin: { finding: 'Pink and warm with mild fever. Capillary refill under 2 seconds; well hydrated.', abnormal: false },
  heart: { finding: 'Regular heartbeat, normal for his age. No murmurs.', abnormal: false, sound: 'heart-normal' }
};

window.EXAM_DATA['c-peds-intuss-01'] = {
  abdomen: { finding: 'Belly soft, with a sausage-shaped lump felt in the upper right side. He fusses when it is pressed.', abnormal: true, key: true, sound: 'bowel-active',
             stages: [ { from: 4, finding: 'Soft belly. The lump can no longer be felt.', abnormal: false, sound: 'bowel-normal' } ] },
  pelvis: { finding: 'Diaper is drier than usual. No stool and no diarrhea.', abnormal: true, key: true,
            stages: [ { from: 2, finding: 'Diaper contains dark red, jelly-like stool.', abnormal: true },
                      { from: 4, finding: 'Wet diaper; no new blood.', abnormal: false } ] },
  head: { finding: 'Pale and unusually sleepy between crying spells. Mouth slightly dry; soft spot on the head a little sunken.', abnormal: true, key: true,
          stages: [ { from: 4, finding: 'Alert, smiling and feeding a little.', abnormal: false } ] },
  skin: { finding: 'Pale. Capillary refill about 3 seconds — he is a bit dehydrated.', abnormal: true, key: true,
          stages: [ { from: 4, finding: 'Pink and warm. Capillary refill under 2 seconds.', abnormal: false } ] },
  heart: { finding: 'Fast, regular heartbeat for his age. No murmurs.', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 4, finding: 'Regular heartbeat, normal for his age.', abnormal: false, sound: 'heart-normal' } ] },
  lungs: { finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' }
};

window.EXAM_DATA['c-em-anaphylaxis-01'] = {
  skin: { finding: 'Raised, itchy red welts (hives) across the chest. Skin warm and flushed.', abnormal: true, key: true,
          stages: [ { from: 3, finding: 'Hives have faded. Normal color.', abnormal: false },
                    { from: 4, finding: 'Hives have come back on the chest.', abnormal: true },
                    { from: 5, finding: 'Hives have faded again.', abnormal: false } ] },
  lungs: { finding: 'Wheeze heard on both sides, especially breathing out.', abnormal: true, key: true, sound: 'wheeze',
           stages: [ { from: 2, finding: 'Wheeze has eased; breath sounds clear on both sides.', abnormal: false, sound: 'breath-normal' },
                     { from: 4, finding: 'Wheeze has returned on both sides.', abnormal: true, sound: 'wheeze' },
                     { from: 5, finding: 'Clear breath sounds on both sides.', abnormal: false, sound: 'breath-normal' } ] },
  neck: { finding: 'She says her throat feels tight and keeps clearing it. Voice slightly hoarse.', abnormal: true, key: true,
          stages: [ { from: 2, finding: 'Throat no longer feels tight. Voice normal.', abnormal: false } ] },
  head: { finding: 'Lips are swollen. Anxious and dizzy, but alert.', abnormal: true,
          stages: [ { from: 2, finding: 'Lip swelling going down. Still a little lightheaded when sitting up.', abnormal: true },
                    { from: 3, finding: 'Lips back to normal. Calm and alert.', abnormal: false },
                    { from: 4, finding: 'Lips normal, but she looks worried again.', abnormal: true },
                    { from: 5, finding: 'Calm and alert. Lips normal.', abnormal: false } ] },
  heart: { finding: 'Fast heartbeat with a weak pulse (low blood pressure).', abnormal: true, sound: 'heart-fast',
           stages: [ { from: 2, finding: 'Still a little fast, but the pulse is stronger.', abnormal: true, sound: 'heart-fast' },
                     { from: 3, finding: 'Regular heartbeat at a normal rate.', abnormal: false, sound: 'heart-normal' },
                     { from: 4, finding: 'Fast again, pulse a little weaker.', abnormal: true, sound: 'heart-fast' },
                     { from: 5, finding: 'Regular heartbeat at a normal rate.', abnormal: false, sound: 'heart-normal' } ] },
  abdomen: { finding: 'Soft and not tender.', abnormal: false, sound: 'bowel-normal' }
};
