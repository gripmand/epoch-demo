'use strict';

const Sfx = {
  ctx: null,
  master: null,
  muted: false,
  volume: 0.5,

  init() {
    try {
      Sfx.muted = localStorage.getItem('epoch_muted') === '1';
      const v = parseFloat(localStorage.getItem('epoch_volume'));
      if (!isNaN(v)) Sfx.volume = Util.clamp(v, 0, 1);
    } catch (e) {}

    const arm = () => { Sfx.ensure(); };
    window.addEventListener('pointerdown', arm, { once: true });
    window.addEventListener('keydown', arm, { once: true });
  },

  ensure() {
    if (Sfx.ctx) return true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      Sfx.ctx = new AC();
      Sfx.master = Sfx.ctx.createGain();
      Sfx.master.gain.value = Sfx.muted ? 0 : Sfx.volume;
      Sfx.master.connect(Sfx.ctx.destination);
    } catch (e) { return false; }
    return true;
  },

  setMuted(m) {
    Sfx.muted = m;
    if (Sfx.master) Sfx.master.gain.value = m ? 0 : Sfx.volume;
    try { localStorage.setItem('epoch_muted', m ? '1' : '0'); } catch (e) {}
  },

  tone(freq, dur, type, gain, when) {
    const c = Sfx.ctx, t0 = c.currentTime + (when || 0);
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain || 0.18, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    o.connect(g); g.connect(Sfx.master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  },

  noise(dur, freq, q, gain, when, drop) {
    const c = Sfx.ctx, t0 = c.currentTime + (when || 0);
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(freq, t0);
    if (drop) f.frequency.exponentialRampToValueAtTime(Math.max(40, freq * drop), t0 + dur);
    f.Q.value = q || 1;
    const g = c.createGain();
    g.gain.setValueAtTime(gain || 0.25, t0);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    src.connect(f); f.connect(g); g.connect(Sfx.master);
    src.start(t0);
  },

  play(name, opt) {
    if (Sfx.muted || !Sfx.ensure()) return;
    if (Sfx.ctx.state === 'suspended') { try { Sfx.ctx.resume(); } catch (e) {} }
    switch (name) {
      case 'place':
        { const size = (opt && opt.size) || 1;
          Sfx.noise(0.16, 240 / Math.sqrt(size), 1.2, 0.5, 0, 0.4);
          Sfx.tone(70 / Math.sqrt(size), 0.18, 'sine', 0.4); }
        break;
      case 'road':
        Sfx.noise(0.05, 600, 2, 0.14, 0, 0.5);
        break;
      case 'demolish':
        Sfx.noise(0.3, 300, 0.8, 0.4, 0, 0.25);
        break;
      case 'deny':
        Sfx.tone(140, 0.1, 'triangle', 0.28);
        Sfx.tone(96, 0.12, 'triangle', 0.22, 0.05);
        break;
      case 'toast':
        Sfx.tone(1450, 0.03, 'sine', 0.05);
        break;
      case 'save':
        Sfx.noise(0.08, 900, 3, 0.12, 0, 0.6);
        Sfx.tone(520, 0.06, 'sine', 0.1, 0.02);
        break;
      case 'coin':
        { const p = Util.clamp(((opt && opt.price) || 5) / 26, 0.15, 1);
          Sfx.tone(700 + 900 * p, 0.07, 'sine', 0.09);
          Sfx.tone(1050 + 1350 * p, 0.09, 'sine', 0.07, 0.03); }
        break;
      case 'rank':
        Sfx.tone(330, 0.08, 'triangle', 0.16);
        Sfx.tone(495, 0.12, 'triangle', 0.16, 0.07);
        break;
      case 'evolve':
        Sfx.tone(392, 0.09, 'sine', 0.14);
        Sfx.tone(523, 0.14, 'sine', 0.14, 0.08);
        break;
      case 'bell':
        Sfx.tone(660, 0.5, 'sine', 0.2);
        Sfx.tone(990, 0.4, 'sine', 0.1, 0.02);
        break;
      case 'horn':
        Sfx.tone(98, 0.9, 'sawtooth', 0.1);
        Sfx.tone(147, 0.9, 'sine', 0.12, 0.05);
        Sfx.tone(196, 0.7, 'sine', 0.07, 0.1);
        break;
      case 'drum':
        Sfx.noise(0.2, 140, 1.5, 0.5, 0, 0.5);
        Sfx.noise(0.2, 140, 1.5, 0.45, 0.24, 0.5);
        Sfx.noise(0.35, 110, 1.5, 0.55, 0.48, 0.4);
        Sfx.tone(147, 1.2, 'sine', 0.14, 0.5);
        Sfx.tone(220, 1.0, 'sine', 0.09, 0.55);
        break;
      case 'settle':
        Sfx.tone(587, 0.22, 'sine', 0.08);
        break;
    }
  },
};

window.Sfx = Sfx;
