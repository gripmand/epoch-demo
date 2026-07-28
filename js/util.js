'use strict';

const Util = {

  mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; },

  hash2(x, y) {
    let h = (x * 374761393 + y * 668265263) | 0;
    h = (h ^ (h >>> 13)) | 0;
    h = Math.imul(h, 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  },

  rectGap(ax, ay, aw, ah, bx, by, bw, bh) {
    const gx = Math.max(0, bx - (ax + aw - 1) - 1, ax - (bx + bw - 1) - 1);
    const gy = Math.max(0, by - (ay + ah - 1) - 1, ay - (by + bh - 1) - 1);
    return Math.max(gx, gy);
  },

  fmtMoney(v) {
    const n = Math.floor(v);
    const s = Math.abs(n).toLocaleString('en-US');
    return (n < 0 ? '-$' : '$') + s;
  },

  fmtRate(v) {
    const s = (Math.round(v * 100) / 100).toFixed(2).replace(/\.?0+$/, '');
    return (v >= 0 ? '+' : '') + s;
  },

  fmtNum(v) {
    return (Math.round(v * 10) / 10).toString();
  },

  fmtDur(ms) {
    if (ms <= 0) return 'done';
    const s = Math.round(ms / 1000);
    if (s < 60) return s + 's';
    const m = Math.floor(s / 60);
    if (m < 60) return m + 'm ' + (s % 60) + 's';
    const h = Math.floor(m / 60);
    if (h < 24) return h + 'h ' + (m % 60) + 'm';
    const d = Math.floor(h / 24);
    return d + 'd ' + (h % 24) + 'h';
  },
};
