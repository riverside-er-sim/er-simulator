/* Hospital sound engine — everything is synthesized with the Web Audio API (no audio files). */
(function () {
'use strict';
let ctx = null, master, ambBus, monBus, alarmBus, examBus, noiseBuf = null, ambNodes = [];
const cfg = { on: true, ambient: true, monitor: true, alarms: true, volume: 0.7 };
let room = null;            // { hr, spo2, level: 0|1|2, rhythm: 'regular'|'irregular' } while in a treatment room
let nextBeat = 0, nextAlarm = 0, nextAmbEvent = 0, timer = null, examStop = null;

function init() {
  if (ctx) return true;
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain(); master.connect(ctx.destination);
  ambBus = bus(); monBus = bus(); alarmBus = bus(); examBus = bus();
  // 2 s of brown noise, reused everywhere
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0); let last = 0;
  for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
  applyCfg();
  timer = setInterval(tick, 40);
  return true;
}
function bus() { const g = ctx.createGain(); g.connect(master); return g; }
function applyCfg() {
  if (!ctx) return;
  const t = ctx.currentTime;
  master.gain.setTargetAtTime(cfg.on ? cfg.volume : 0, t, 0.05);
  ambBus.gain.setTargetAtTime(cfg.ambient ? 1 : 0, t, 0.3);
  monBus.gain.setTargetAtTime(cfg.monitor ? 1 : 0, t, 0.05);
  alarmBus.gain.setTargetAtTime(cfg.alarms ? 1 : 0, t, 0.05);
  if (cfg.on && cfg.ambient && !ambNodes.length) startAmbient();
}
function noise(dest, opts) {
  const src = ctx.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
  const f = ctx.createBiquadFilter(); f.type = opts.type || 'lowpass'; f.frequency.value = opts.freq || 400; f.Q.value = opts.q || 0.7;
  const g = ctx.createGain(); g.gain.value = opts.gain == null ? 0.05 : opts.gain;
  src.connect(f); f.connect(g); g.connect(dest);
  src.start(opts.at || ctx.currentTime, Math.random() * 1.5);
  return { src: src, gain: g, filter: f };
}
function tone(dest, freq, at, dur, vol, type) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, at + 0.012);
  g.gain.setValueAtTime(vol, at + Math.max(0.015, dur - 0.03));
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g); g.connect(dest); o.start(at); o.stop(at + dur + 0.02);
  return o;
}

/* Ambient: ventilation hum, room tone, distant events */
function startAmbient() {
  ambNodes.push(noise(ambBus, { freq: 320, gain: 0.07 }));            // air handling
  ambNodes.push(noise(ambBus, { type: 'bandpass', freq: 900, q: 0.5, gain: 0.012 })); // room murmur
  const hum = ctx.createOscillator(), hg = ctx.createGain(); hum.frequency.value = 120; hg.gain.value = 0.004;
  hum.connect(hg); hg.connect(ambBus); hum.start(); ambNodes.push({ src: hum });
  nextAmbEvent = ctx.currentTime + 4;
}
function distant(freqs, gap, dur, vol) {
  const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400; f.connect(ambBus);
  let t = ctx.currentTime;
  freqs.forEach(fr => { tone(f, fr, t, dur, vol, 'triangle'); t += gap; });
}
function ambientEvent() {
  const r = Math.random();
  if (r < 0.28) distant([784, 622], 0.55, 0.5, 0.035);                    // overhead paging chime
  else if (r < 0.62) { const n = 3 + Math.floor(Math.random() * 4); const t0 = ctx.currentTime; const fr = 900 + Math.random() * 300; for (let i = 0; i < n; i++) tone(lowpassTo(ambBus, 1800), fr, t0 + i * (0.6 + Math.random() * 0.3), 0.07, 0.012); } // monitor in another bay
  else if (r < 0.8) distant([523, 659, 784], 0.2, 0.16, 0.012);           // far-away alarm
  else { const n = noise(ambBus, { type: 'bandpass', freq: 2500, q: 2, gain: 0.0001 }); const t = ctx.currentTime; n.gain.gain.linearRampToValueAtTime(0.012, t + 0.4); n.gain.gain.linearRampToValueAtTime(0.0001, t + 1.6); n.src.stop(t + 1.7); } // trolley rolling by
}
function lowpassTo(dest, fr) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = fr; f.connect(dest); return f; }

/* Scheduler for monitor beeps, alarms and ambience */
function tick() {
  if (!ctx || !cfg.on || document.hidden) return;
  const now = ctx.currentTime;
  if (cfg.ambient && ambNodes.length && now >= nextAmbEvent) { ambientEvent(); nextAmbEvent = now + 9 + Math.random() * 18; }
  if (room && room.hr > 0) {
    if (now >= nextBeat - 0.05) {
      const at = Math.max(now, nextBeat);
      // pulse-oximeter beep: pitch falls as oxygen saturation falls
      const fr = 440 + (clamp(room.spo2, 70, 100) - 70) * 14;
      tone(monBus, fr, at, 0.07, 0.07);
      let iv = 60 / room.hr;
      if (room.rhythm === 'irregular') iv *= 0.6 + Math.random() * 0.8;
      nextBeat = at + iv;
    }
    if (room.level > 0 && now >= nextAlarm) {
      if (room.level >= 2) { [0, 0.18, 0.36, 0.75, 0.93].forEach(o => tone(alarmBus, 988, now + o, 0.14, 0.09, 'square')); nextAlarm = now + 3; }
      else { [0, 0.25, 0.5].forEach((o, i) => tone(alarmBus, [523, 659, 784][i], now + o, 0.2, 0.06, 'triangle')); nextAlarm = now + 7; }
    }
  }
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* Stethoscope sounds */
function stopExam() { if (examStop) { examStop(); examStop = null; } }
function playExam(kind, hr) {
  if (!unlock() || !cfg.on) return 0;
  stopExam();
  const out = ctx.createGain(); out.gain.value = 1; out.connect(examBus);
  const t0 = ctx.currentTime + 0.05, dur = 5;
  const nodes = [];
  if (kind.indexOf('heart') === 0 || kind === 'murmur') {
    const rate = kind === 'heart-fast' ? Math.max(hr || 120, 110) : (hr || 75);
    let t = t0;
    while (t < t0 + dur) {
      thump(out, t, 55, 0.11, 0.6); thump(out, t + 0.3 * 60 / rate * 0.9, 75, 0.08, 0.42);
      if (kind === 'murmur') { const n = noise(out, { type: 'bandpass', freq: 220, q: 1.2, gain: 0.0001, at: t }); n.gain.gain.setValueAtTime(0.0001, t + 0.08); n.gain.gain.linearRampToValueAtTime(0.25, t + 0.15); n.gain.gain.linearRampToValueAtTime(0.0001, t + 0.26 * 60 / rate); n.src.stop(t + 0.5); nodes.push(n.src); }
      let iv = 60 / rate; if (kind === 'heart-irregular') iv *= 0.55 + Math.random() * 0.9;
      t += iv;
    }
  } else if (kind.indexOf('bowel') === 0) {
    const n = kind === 'bowel-active' ? 9 : kind === 'bowel-quiet' ? 1 : 4;
    for (let i = 0; i < n; i++) gurgle(out, t0 + Math.random() * (dur - 0.6));
    const bed = noise(out, { freq: 200, gain: 0.02 }); bed.src.stop(t0 + dur); nodes.push(bed.src);
  } else {
    // breathing cycle: in 1.4 s, out 2 s
    const cyc = 3.4;
    for (let t = t0; t < t0 + dur; t += cyc) {
      const quiet = kind === 'diminished' ? 0.25 : 1;
      const n = noise(out, { type: 'bandpass', freq: 600, q: 0.6, gain: 0.0001, at: t });
      n.gain.gain.setValueAtTime(0.0001, t); n.gain.gain.linearRampToValueAtTime(0.5 * quiet, t + 0.7); n.gain.gain.linearRampToValueAtTime(0.05, t + 1.4);
      n.gain.gain.linearRampToValueAtTime(0.35 * quiet, t + 1.9); n.gain.gain.linearRampToValueAtTime(0.0001, t + 3.3); n.src.stop(t + cyc); nodes.push(n.src);
      if (kind === 'wheeze') { [610, 740].forEach(fr => { const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain(); o.frequency.value = fr; lfo.frequency.value = 6; lg.gain.value = 12; lfo.connect(lg); lg.connect(o.frequency); g.gain.setValueAtTime(0.0001, t + 1.5); g.gain.linearRampToValueAtTime(0.05, t + 1.9); g.gain.linearRampToValueAtTime(0.0001, t + 3.2); o.connect(g); g.connect(out); o.start(t + 1.4); lfo.start(t + 1.4); o.stop(t + 3.3); lfo.stop(t + 3.3); nodes.push(o, lfo); }); }
      if (kind === 'crackles') { for (let i = 0; i < 14; i++) { const ct = t + 0.4 + Math.random() * 1.0; const c = noise(out, { type: 'highpass', freq: 1500, gain: 0.0001, at: ct }); c.gain.gain.setValueAtTime(0.5, ct); c.gain.gain.exponentialRampToValueAtTime(0.0001, ct + 0.012); c.src.stop(ct + 0.03); } }
      if (kind === 'stridor') { const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = 290; f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 3; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.06, t + 0.5); g.gain.linearRampToValueAtTime(0.0001, t + 1.4); o.connect(f); f.connect(g); g.connect(out); o.start(t); o.stop(t + 1.5); nodes.push(o); }
    }
  }
  const end = setTimeout(() => { try { out.disconnect(); } catch (e) { } }, (dur + 0.6) * 1000);
  examStop = () => { clearTimeout(end); out.gain.setTargetAtTime(0, ctx.currentTime, 0.03); setTimeout(() => { try { out.disconnect(); } catch (e) { } }, 200); };
  return dur;
}
function thump(dest, at, fr, dur, vol) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.frequency.setValueAtTime(fr * 1.6, at); o.frequency.exponentialRampToValueAtTime(fr, at + dur);
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g); g.connect(dest); o.start(at); o.stop(at + dur + 0.02);
}
function gurgle(dest, at) {
  const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(180, at); o.frequency.linearRampToValueAtTime(380 + Math.random() * 200, at + 0.4);
  lfo.frequency.value = 22; lg.gain.value = 0.06; lfo.connect(lg); lg.connect(g.gain);
  g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(0.08, at + 0.05); g.gain.linearRampToValueAtTime(0.0001, at + 0.45);
  o.connect(g); g.connect(dest); o.start(at); lfo.start(at); o.stop(at + 0.5); lfo.stop(at + 0.5);
}

/* Public API */
function unlock() { if (!init()) return false; if (ctx.state === 'suspended') ctx.resume(); return true; }
window.SND = {
  unlock: unlock,
  configure(c) { Object.assign(cfg, c); applyCfg(); },
  setRoom(r) { const was = room; room = r; if (r && !was && ctx) { nextBeat = ctx.currentTime + 0.2; nextAlarm = ctx.currentTime + 1; } },
  alert() { if (!ctx || !cfg.on || !cfg.alarms) return; const t = ctx.currentTime; [0, 0.22].forEach(o => tone(alarmBus, 880, t + o, 0.18, 0.12)); },
  exam: playExam,
  click() { if (!unlock() || !cfg.on) return; tone(examBus, 1500, ctx.currentTime + 0.005, 0.035, 0.09, 'square'); },
  thump() { if (!unlock() || !cfg.on) return; thump(examBus, ctx.currentTime + 0.005, 70, 0.12, 0.55); },
  stopExam: stopExam,
  get ready() { return !!ctx && ctx.state === 'running'; }
};
})();
