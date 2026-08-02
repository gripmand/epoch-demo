'use strict';

const TERRAIN = { GRASS: 0, FERTILE: 1, ROCK: 2, WATER: 3, MOUNTAIN: 4, SALT: 5, ASH: 6 };

const Grid = {
  W: TUNE.WORLD,

  key(x, y) { return y * TUNE.WORLD + x; },
  inB(x, y) { return x >= 0 && y >= 0 && x < TUNE.WORLD && y < TUNE.WORLD; },

  chunkOf(x, y) { return { cx: Math.floor(x / TUNE.CHUNK), cy: Math.floor(y / TUNE.CHUNK) }; },

  chunkKeyOf(x, y) {
    const c = (typeof Rend !== 'undefined' && Rend.CH) ? Rend.CH : 32;
    return Math.floor(x / c) + ',' + Math.floor(y / c);
  },

  TERRAIN_PROFILE: {

    0: { trunkW: 4.2, trunkW2: 3.8, branch: 3, secondW: 2.6, wander: 0.55,
         fertileTo: 6, dryFrom: 20, edgeJitter: 4,
         beyond: 'GRASS', saltAt: 0.99, rockAt: 0.86, peakR: 3,
         seaEdge: 8, saltPatches: true },

    1: { trunkW: 3.0, trunkW2: 2.8, branch: 2, secondW: 1.8, wander: 0.5,
         fertileTo: -9, dryFrom: 3, edgeJitter: 2,
         beyond: 'GRASS', saltAt: 0.99, rockAt: 0.80, peakR: 3,
         iceWall: 8, bonebeds: true },

    2: { trunkW: 2.6, trunkW2: 2.4, branch: 0, secondW: 0, wander: 0.34,
         fertileTo: 2, dryFrom: 4, edgeJitter: 1.6,
         beyond: 'SALT', saltAt: 0.62, rockAt: 0.54, peakR: 4 },

    3: { trunkW: 1.5, trunkW2: 1.5, branch: 0, secondW: 0, wander: 0.55,
         cenoteEvery: 44, cenoteR: 1.3, peakR: 5,
         fertileTo: 1, dryFrom: 3, edgeJitter: 1.4,
         beyond: 'GRASS', saltAt: 0.99, rockAt: 0.66 },

    4: { trunkW: 3.4, trunkW2: 3.2, branch: 2, secondW: 2.2, wander: 0.42,
         fertileTo: 5, dryFrom: 16, edgeJitter: 5,
         beyond: 'SALT', saltAt: 0.54, rockAt: 0.80 },

    5: { trunkW: 6.0, trunkW2: 5.6, branch: 0, secondW: 0, wander: 0.22,
         fertileTo: 3, dryFrom: 4, edgeJitter: 1.2,
         beyond: 'SALT', saltAt: 0.10, rockAt: 0.92 },

    6: { trunkW: 4.2, trunkW2: 3.8, branch: 3, secondW: 2.6, wander: 0.48,
         fertileTo: 5, dryFrom: 7, edgeJitter: 3.5,
         beyond: 'SALT', saltAt: 0.55, rockAt: 0.94, peakR: 6,
         rockEdge: 3 },

    14: { noTrunk: true, cenoteEvery: 34, cenoteR: 1.7, peakR: 6,
          trunkW: 0, trunkW2: 0, branch: 0, secondW: 0, wander: 0.30,
          fertileTo: 2, dryFrom: 5, edgeJitter: 2.0,
          beyond: 'GRASS', saltAt: 0.99, rockAt: 0.58 },
  },

  terrainProfile(era) {
    const rung = rungOf(curEra(era));
    const keys = Object.keys(Grid.TERRAIN_PROFILE).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= rung) pick = k;
    return Grid.TERRAIN_PROFILE[pick];
  },

  genTerrain(s) {
    const W = TUNE.WORLD, t = G.cache.terrain;

    Grid.forestChanged();
    t.fill(TERRAIN.GRASS);
    const rnd = Util.mulberry32(s.seed);
    const c = W / 2;
    const P = Grid.terrainProfile(s.era);

    const stamp = (cx, cy, r) => {
      const ir = Math.ceil(r);
      for (let dy = -ir; dy <= ir; dy++)
        for (let dx = -ir; dx <= ir; dx++) {
          if (dx * dx + dy * dy > r * r) continue;
          const x = Math.round(cx) + dx, y = Math.round(cy) + dy;
          if (Grid.inB(x, y)) t[Grid.key(x, y)] = TERRAIN.WATER;
        }
    };

    const carve = (x, y, tx, ty, width, life, depth) => {
      let ang = Math.atan2(ty - y, tx - x);
      const branches = [];
      for (let i = 0; i < life; i++) {
        if (!Grid.inB(Math.round(x), Math.round(y))) break;
        const taper = width * (1 - 0.45 * (i / life));
        stamp(x, y, Math.max(0.9, taper));
        const desired = Math.atan2(ty - y, tx - x);
        ang = ang * 0.90 + desired * 0.10 + (rnd() - 0.5) * P.wander;
        x += Math.cos(ang); y += Math.sin(ang);

        if (depth > 0 && i > life * 0.15 && rnd() < 0.020)
          branches.push([x, y, ang + (rnd() < 0.5 ? 0.8 : -0.8), taper]);
      }
      for (const [bx, by, ba, bw] of branches) {
        const blen = 40 + rnd() * 90;
        carve(bx, by, bx + Math.cos(ba) * blen, by + Math.sin(ba) * blen,
              Math.max(1.1, bw * 0.62), blen, depth - 1);
      }
    };

    if (!P.noTrunk) {
      const side = Math.floor(rnd() * 2);
      const bendX = c + (rnd() < 0.5 ? -1 : 1) * (11 + rnd() * 5);
      const bendZ = c + (rnd() < 0.5 ? -1 : 1) * (11 + rnd() * 5);
      const start = side ? [0, 40 + rnd() * (W - 80)] : [40 + rnd() * (W - 80), 0];
      const end = side ? [W - 1, 40 + rnd() * (W - 80)] : [40 + rnd() * (W - 80), W - 1];
      carve(start[0], start[1], bendX, bendZ, P.trunkW, W * 0.75, P.branch);
      carve(bendX, bendZ, end[0], end[1], P.trunkW2, W * 0.75, P.branch);

      if (P.secondW > 0) carve(rnd() * W, 0, rnd() * W, W - 1, P.secondW, W * 0.9, Math.max(0, P.branch - 1));
    }

    if (P.cenoteEvery > 0) {
      const step = P.cenoteEvery;
      for (let gy = 0; gy < W; gy += step)
        for (let gx = 0; gx < W; gx += step) {
          const px = gx + 4 + rnd() * (step - 8);
          const py = gy + 4 + rnd() * (step - 8);
          stamp(px, py, P.cenoteR * (0.75 + rnd() * 0.7));
        }
    }

    const dist = new Int16Array(W * W).fill(-1);
    let queue = [];
    for (let i = 0; i < W * W; i++) if (t[i] === TERRAIN.WATER) { dist[i] = 0; queue.push(i); }
    for (let d = 0; queue.length && d < 40; d++) {
      const next = [];
      for (const k of queue) {
        const x = k % W, y = (k / W) | 0;
        for (let n = 0; n < 4; n++) {
          const nx = x + (n === 0 ? 1 : n === 1 ? -1 : 0);
          const ny = y + (n === 2 ? 1 : n === 3 ? -1 : 0);
          if (!Grid.inB(nx, ny)) continue;
          const nk = Grid.key(nx, ny);
          if (dist[nk] !== -1) continue;
          dist[nk] = d + 1;
          next.push(nk);
        }
      }
      queue = next;
    }

    const smooth = (a, b, f) => a + (b - a) * (f * f * (3 - 2 * f));
    const vnoise = (x, y, sc) => {
      const u = x / sc, v = y / sc;
      const iu = Math.floor(u), iv = Math.floor(v);
      const fu = u - iu, fv = v - iv;
      return smooth(
        smooth(Util.hash2(iu, iv), Util.hash2(iu + 1, iv), fu),
        smooth(Util.hash2(iu, iv + 1), Util.hash2(iu + 1, iv + 1), fu), fv);
    };

    const nz = (x, y, sc) => vnoise(x, y, sc) * 0.72 + vnoise(x, y, sc * 0.34) * 0.28;

    for (let y = 0; y < W; y++)
      for (let x = 0; x < W; x++) {
        const k = Grid.key(x, y);
        if (t[k] === TERRAIN.WATER) continue;
        const d = dist[k];
        const jitter = nz(x, y, 14) * P.edgeJitter;
        if (d >= 0 && d <= P.fertileTo + jitter) t[k] = TERRAIN.FERTILE;
        else if (d < 0 || d > P.dryFrom + jitter * 2) {

          const r = nz(x, y, 21);
          if (r > P.rockAt) t[k] = TERRAIN.ROCK;
          else if (nz(x, y, 17) > P.saltAt) t[k] = TERRAIN[P.beyond];
          else t[k] = TERRAIN.GRASS;
        } else t[k] = TERRAIN.GRASS;
      }

    const dOf = (x, y) => (Grid.inB(x, y) ? dist[Grid.key(x, y)] : 0);
    for (let y = 1; y < W - 1; y++)
      for (let x = 1; x < W - 1; x++) {
        const k = Grid.key(x, y);
        if (t[k] !== TERRAIN.FERTILE) continue;

        const gx = dOf(x + 1, y) - dOf(x - 1, y);
        const gy = dOf(x, y + 1) - dOf(x, y - 1);
        const len = Math.hypot(gx, gy) || 1;
        const px = -gy / len, py = gx / len;
        const sVal = x * px + y * py;
        const period = 7;
        const phase = ((sVal % period) + period) % period;
        if (phase < 0.85) t[k] = TERRAIN.GRASS;
      }

    const pr = P.peakR || 2;
    const isRock = (x, y) => Grid.inB(x, y) && t[Grid.key(x, y)] === TERRAIN.ROCK;
    const peaks = [];
    for (let y = pr; y < W - pr; y++)
      for (let x = pr; x < W - pr; x++) {
        if (!isRock(x, y)) continue;
        let solid = true;
        for (let dy = -pr; dy <= pr && solid; dy++)
          for (let dx = -pr; dx <= pr; dx++)
            if (!isRock(x + dx, y + dy)) { solid = false; break; }
        if (solid) peaks.push(Grid.key(x, y));
      }
    for (const k of peaks) t[k] = TERRAIN.MOUNTAIN;

    for (let y = c - 6; y <= c + 7; y++)
      for (let x = c - 6; x <= c + 7; x++) {
        if (!Grid.inB(x, y)) continue;
        const k = Grid.key(x, y);
        if (t[k] === TERRAIN.FERTILE) continue;
        t[k] = TERRAIN.GRASS;
      }

    for (let y = c - 10; y <= c + 11; y++)
      for (let x = c - 10; x <= c + 11; x++) {
        if (!Grid.inB(x, y)) continue;
        const k = Grid.key(x, y);
        if (t[k] === TERRAIN.WATER || t[k] === TERRAIN.FERTILE) continue;
        t[k] = TERRAIN.GRASS;
      }

    if (P.fertileTo >= 0) {
      for (let y = c + 2; y <= c + 4; y++) for (let x = c - 4; x <= c - 1; x++)
        if (t[Grid.key(x, y)] !== TERRAIN.WATER) t[Grid.key(x, y)] = TERRAIN.FERTILE;
      for (let y = c - 4; y <= c - 2; y++) for (let x = c + 4; x <= c + 6; x++)
        if (t[Grid.key(x, y)] !== TERRAIN.WATER) t[Grid.key(x, y)] = TERRAIN.FERTILE;
    }

    if (P.cenoteEvery > 0) {
      for (let y = c + 4; y <= c + 6; y++)
        for (let x = c + 4; x <= c + 6; x++)
          if (Grid.inB(x, y)) t[Grid.key(x, y)] = TERRAIN.WATER;
    }

    if (P.iceWall) {
      const depth = P.iceWall;
      for (let y = 0; y < depth + 3; y++)
        for (let x = 0; x < W; x++) {

          const edge = depth + Math.round(nz(x, 7, 13) * 6) - 3;
          if (y <= edge) t[Grid.key(x, y)] = TERRAIN.MOUNTAIN;
        }
    }

    if (P.seaEdge) {
      const depth = P.seaEdge;
      for (let y = W - depth - 3; y < W; y++)
        for (let x = 0; x < W; x++) {
          const edge = W - depth - Math.round(nz(x, 11, 17) * 6) + 3;
          if (y >= edge) t[Grid.key(x, y)] = TERRAIN.WATER;
        }
    }

    if (P.rockEdge) {
      const depth = P.rockEdge;
      for (let x = W - depth - 4; x < W; x++)
        for (let y = 0; y < W; y++) {
          const edge = W - depth - Math.round(nz(y, 23, 19) * 5) + 2;
          const k = Grid.key(x, y);
          if (x >= edge && t[k] !== TERRAIN.WATER) t[k] = TERRAIN.ROCK;
        }
    }

    if (P.bonebeds || P.saltPatches) {
      let placed = 0;
      const target = Math.round(W * W * 0.015);
      for (let attempt = 0; attempt < 4000 && placed < target; attempt++) {
        const x = 4 + Math.floor(rnd() * (W - 8)), y = 4 + Math.floor(rnd() * (W - 8));
        const k = Grid.key(x, y);
        if (t[k] !== TERRAIN.GRASS) continue;

        let nearWater = false;
        for (let dy = -2; dy <= 2 && !nearWater; dy++)
          for (let dx = -2; dx <= 2; dx++)
            if (Grid.inB(x + dx, y + dy) && t[Grid.key(x + dx, y + dy)] === TERRAIN.WATER) { nearWater = true; break; }
        if (!nearWater) continue;

        const n = 4 + Math.floor(rnd() * 7);
        let cx = x, cy = y;
        for (let i = 0; i < n; i++) {
          const ck = Grid.key(cx, cy);
          if (Grid.inB(cx, cy) && t[ck] === TERRAIN.GRASS) { t[ck] = TERRAIN.SALT; placed++; }
          cx += Math.floor(rnd() * 3) - 1; cy += Math.floor(rnd() * 3) - 1;
        }
      }
    }

    for (const k in (s.terraEdits || {})) t[k] = s.terraEdits[k];

    G.cache.ownedSet = new Set(s.owned);
  },

  TREE_DENSITY: {
    0: 0.320,

    1: 0.180,
    2: 0.090,
    3: 0.140,
    4: 0.030,
    5: 0.045,
    6: 0.055,
    7: 0.090,
    8: 0.170,
    9: 0.260,
    10: 0.070,
    11: 0.100,
    12: 0.075,
    13: 0.080,
    14: 0.240,
    15: 0.110,
    16: 0.100,
    17: 0.290,
    18: 0.070,
    19: 0.230,
    20: 0.170,
    21: 0.090,
    22: 0.150,
    23: 0.020,
    24: 0.035,
    25: 0.095,
    26: 0.120,
    27: 0.200,
    28: 0.100,
    29: 0.130,
    30: 0.020,
    31: 0.030,
    32: 0.040,
    33: 0.045,
    34: 0.040,
    35: 0.0,
    36: 0.0,
    37: 0.025,
  },

  treeDensity(era) {

    const e = Math.max(0, rungOf(curEra(era)));
    for (let i = e; i >= 0; i--) {
      const d = Grid.TREE_DENSITY[i];
      if (d !== undefined) return d;
    }
    return 0.13;
  },

  treeAt(s, x, y) {
    const k = Grid.key(x, y);
    if (s.planted && s.planted[k]) return true;
    if (s.cleared && s.cleared[k]) return false;
    if (G.cache.terrain[k] !== TERRAIN.GRASS) return false;
    const era = curEra(s && s.era);
    let d = Grid.treeDensity(era);
    if (d <= 0) return false;

    if (Grid.nextToWater(x, y)) d *= 6.0;
    else if (typeof Rend !== 'undefined' && Rend.noise) {
      const grove = Rend.noise(x / 9, y / 9);
      d *= 0.10 + 2.7 * grove * grove;
    }
    return Util.hash2(x, y) < d;
  },

  nextToWater(x, y) {
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx, ny = y + dy;
        if (Grid.inB(nx, ny) && G.cache.terrain[Grid.key(nx, ny)] === TERRAIN.WATER) return true;
      }
    return false;
  },

  footHasTree(s, type, x, y, rot) {
    let hit = false;
    Grid.footTiles(type, x, y, (tx, ty) => {
      if (Grid.inB(tx, ty) && Grid.treeAt(s, tx, ty)) hit = true;
    }, rot);
    return hit;
  },

  forestChanged() {
    if (!G.cache) return;
    G.cache.forestDirty = true;
    G.cache.forestVer = (G.cache.forestVer || 0) + 1;
  },

  rockChanged() { if (G.cache) G.cache.rockVer = (G.cache.rockVer || 0) + 1; },

  clearTree(s, x, y) {
    const k = Grid.key(x, y);
    if (s.planted && s.planted[k]) delete s.planted[k];
    s.cleared[k] = 1;
    Grid.forestChanged();
  },

  terraform(s, kind, x, y) {
    if (!Grid.inB(x, y)) return false;
    if (!Grid.owned(x, y)) return 'unowned';

    if (terraLocked(kind, s.era)) return 'locked';

    if (G.cache.terrain[Grid.key(x, y)] === TERRAIN.ASH) return 'ash';
    const k = Grid.key(x, y);
    if (G.cache.occ[k] >= 0) return 'occupied';

    const cost = terraCost(kind, s.era);
    if (s.money < cost) return 'money';

    if (kind === 'tree') {
      const t = G.cache.terrain[k];
      if (t !== TERRAIN.GRASS && t !== TERRAIN.FERTILE) return false;
      if (Grid.treeAt(s, x, y)) return false;
      if (t === TERRAIN.FERTILE) { G.cache.terrain[k] = TERRAIN.GRASS; s.terraEdits[k] = TERRAIN.GRASS; }
      s.planted[k] = 1;
      delete s.cleared[k];
    } else {
      const T = { grass: TERRAIN.GRASS, water: TERRAIN.WATER, rock: TERRAIN.ROCK, mountain: TERRAIN.MOUNTAIN, fertile: TERRAIN.FERTILE }[kind];
      if (G.cache.terrain[k] === T && !(s.planted && s.planted[k])) return false;
      G.cache.terrain[k] = T;
      s.terraEdits[k] = T;
      if (s.planted && s.planted[k]) delete s.planted[k];

      if (T === TERRAIN.ROCK) s.rockSpent[k] = rockYield(s);
      s.cleared[k] = 1;
    }
    s.money -= cost;

    Grid.forestChanged();
    Grid.rockChanged();

    Rend.invalidateTerrain();
    return true;
  },

  soilAt(x, y) {
    const v = G.s && G.s.soilEdits ? G.s.soilEdits[Grid.key(x, y)] : undefined;
    return v === undefined ? 1 : v;
  },

  setSoil(s, x, y, v) {
    const k = Grid.key(x, y);
    const c = Util.clamp(v, 0, 1);
    const was = s.soilEdits[k];
    if (c >= 1) {
      if (was === undefined) return false;
      delete s.soilEdits[k];
      return true;
    }
    s.soilEdits[k] = c;
    if (was === undefined) return true;
    return Math.floor(was * 20) !== Math.floor(c * 20);
  },

  soilUnder(b) {
    const d = DEF(b.type);
    let sum = 0, n = 0;
    Grid.tilesOf(b,(tx, ty) => {
      if (!Grid.inB(tx, ty)) return;
      sum += Grid.soilAt(tx, ty); n++;
    });
    return n ? sum / n : 1;
  },

  stoneAt(x, y) {
    const v = G.s && G.s.rockSpent ? G.s.rockSpent[Grid.key(x, y)] : undefined;
    return rockYield() - (v === undefined ? 0 : v);
  },

  spendStone(s, x, y, amt) {
    const k = Grid.key(x, y);
    const spent = (s.rockSpent[k] || 0) + amt;
    s.rockSpent[k] = Math.min(rockYield(s), spent);

    if (s.rockSpent[k] >= rockYield(s) && G.cache.terrain[k] === TERRAIN.ROCK) {
      G.cache.terrain[k] = TERRAIN.GRASS;
      s.terraEdits[k] = TERRAIN.GRASS;
      Grid.rockChanged();
      return true;
    }
    return false;
  },

  woodAt(s, x, y) {
    if (!Grid.treeAt(s, x, y)) return 0;

    if (s.planted && s.planted[Grid.key(x, y)]) return 0;
    return Math.max(0, TUNE.DEADWOOD_YIELD - ((s.woodSpent || {})[Grid.key(x, y)] || 0));
  },
  spendWood(s, x, y, amt) {
    const k = Grid.key(x, y);
    if (!s.woodSpent) s.woodSpent = {};
    const before = s.woodSpent[k] || 0;
    s.woodSpent[k] = Math.min(TUNE.DEADWOOD_YIELD, before + amt);

    if (G.cache && G.cache.forestLeft !== undefined)
      G.cache.forestLeft = Math.max(0, G.cache.forestLeft - (s.woodSpent[k] - before));
    if (s.woodSpent[k] >= TUNE.DEADWOOD_YIELD && Grid.treeAt(s, x, y)) {

      s.cleared[k] = 1;
      G.cache.terrain[k] = TERRAIN.ASH;
      s.terraEdits[k] = TERRAIN.ASH;
      return true;
    }
    return false;
  },

  owned(x, y) {
    const c = Grid.chunkOf(x, y);
    return G.cache.ownedSet.has(c.cx + ',' + c.cy);
  },

  chunkPrice(cx, cy) {
    const cc = TUNE.WORLD / TUNE.CHUNK / 2;
    const d = Math.max(Math.abs(cx - cc), Math.abs(cy - cc));
    const raw = d === 0 ? TUNE.LAND_BASE
      : Math.round(TUNE.LAND_BASE * Math.pow(d, TUNE.LAND_EXP) / 10) * 10;

    return Math.round(raw * (1 - subTier(G.s).landDiscount) * landGift(G.s));
  },

  chunkBuyable(s, cx, cy) {
    if (G.cache.ownedSet.has(cx + ',' + cy)) return false;

    return G.cache.ownedSet.has((cx + 1) + ',' + cy) || G.cache.ownedSet.has((cx - 1) + ',' + cy) ||
           G.cache.ownedSet.has(cx + ',' + (cy + 1)) || G.cache.ownedSet.has(cx + ',' + (cy - 1));
  },

  buyChunk(s, cx, cy) {
    const price = Grid.chunkPrice(cx, cy);
    if (!Grid.chunkBuyable(s, cx, cy) || s.money < price) return false;
    s.money -= price;
    s.owned.push(cx + ',' + cy);
    G.cache.ownedSet.add(cx + ',' + cy);
    if (window.Rend && Rend.repaintChunk) Rend.repaintChunk(cx, cy);
    return true;
  },

  sellChunkWhy(s, cx, cy) {
    const key = cx + ',' + cy;
    if (!G.cache.ownedSet.has(key)) return 'not yours';

    const cc = TUNE.WORLD / TUNE.CHUNK / 2 - 1;
    if (cx >= cc && cx <= cc + 2 && cy >= cc && cy <= cc + 2) return 'this is founding ground — the city keeps it';

    const edge = !G.cache.ownedSet.has((cx + 1) + ',' + cy) || !G.cache.ownedSet.has((cx - 1) + ',' + cy) ||
                 !G.cache.ownedSet.has(cx + ',' + (cy + 1)) || !G.cache.ownedSet.has(cx + ',' + (cy - 1));
    if (!edge) return 'only frontier parcels can be sold — this one is surrounded by your own land';

    for (let dy = 0; dy < TUNE.CHUNK; dy++)
      for (let dx = 0; dx < TUNE.CHUNK; dx++) {
        const tx = cx * TUNE.CHUNK + dx, ty = cy * TUNE.CHUNK + dy;
        if (Grid.inB(tx, ty) && G.cache.occ[Grid.key(tx, ty)] >= 0)
          return 'something is standing on it — demolish first';
      }
    return null;
  },

  sellChunk(s, cx, cy) {
    if (Grid.sellChunkWhy(s, cx, cy)) return false;
    const refund = Math.round(Grid.chunkPrice(cx, cy) * TUNE.SELL_LAND);
    s.money += refund;
    const key = cx + ',' + cy;
    s.owned = s.owned.filter(k => k !== key);
    G.cache.ownedSet.delete(key);
    if (window.Rend && Rend.repaintChunk) Rend.repaintChunk(cx, cy);
    return refund;
  },

  dims(type, rot) {
    const d = DEF(type);
    return (rot & 1) ? { w: d.h, h: d.w } : { w: d.w, h: d.h };
  },
  dimsOf(b) { return Grid.dims(b.type, b.rot || 0); },

  tilesOf(b, fn) { Grid.footTiles(b.type, b.x, b.y, fn, b.rot || 0); },

  footTiles(type, x, y, fn, rot) {
    const s = Grid.dims(type, rot);
    for (let dy = 0; dy < s.h; dy++)
      for (let dx = 0; dx < s.w; dx++)
        fn(x + dx, y + dy);
  },

  canPlace(s, type, x, y, ignoreId, rot) {
    const d = DEF(type);

    if (window.Dev && Dev.flags.freeBuild) {
      let devOk = true;
      Grid.footTiles(type, x, y, (tx, ty) => {
        if (!devOk) return;
        if (!Grid.inB(tx, ty)) { devOk = false; return; }
        const occ = G.cache.occ[Grid.key(tx, ty)];
        if (occ >= 0 && occ !== ignoreId) devOk = false;
      }, rot);
      return devOk;
    }

    let ok = true, rock = 0, salt = 0;
    Grid.footTiles(type, x, y, (tx, ty) => {
      if (!ok) return;
      if (!Grid.inB(tx, ty) || !Grid.owned(tx, ty)) { ok = false; return; }
      const occ = G.cache.occ[Grid.key(tx, ty)];
      if (occ >= 0 && occ !== ignoreId) { ok = false; return; }
      const t = G.cache.terrain[Grid.key(tx, ty)];
      if (t === TERRAIN.ROCK) rock++;
      if (t === TERRAIN.SALT) salt++;
      if (t === TERRAIN.MOUNTAIN) { ok = false; return; }

      if (type === 'road' || d.onRock) { if (t === TERRAIN.WATER) ok = false; }

      else if (d.onWater) { if (t !== TERRAIN.WATER) ok = false; }
      else if (t !== TERRAIN.GRASS && t !== TERRAIN.FERTILE && t !== TERRAIN.SALT && t !== TERRAIN.ASH) ok = false;

      if (ok && !d.onWood && Grid.treeAt(s, tx, ty)) ok = false;
    }, rot);

    if (ok && d.needsBlock) {
      let inside = false;
      for (const bk of (G.cache.blocks || [])) {
        let all = true;
        Grid.footTiles(type, x, y, (tx, ty) => {
          if (tx < bk.x || ty < bk.y || tx >= bk.x + bk.w || ty >= bk.y + bk.h) all = false;
        }, rot);
        if (all) { inside = true; break; }
      }
      if (!inside) ok = false;
    }

    if (ok && d.onWood) {
      let wood = 0;
      Grid.footTiles(type, x, y, (tx, ty) => { if (Grid.inB(tx, ty) && Grid.treeAt(s, tx, ty)) wood++; }, rot);
      if (wood < 2) ok = false;
    }

    const sz = Grid.dims(type, rot);
    return ok;
  },

  treesWithin(s, x, y, d, r) {
    let n = 0;
    for (let dy = -r; dy < d.h + r; dy++)
      for (let dx = -r; dx < d.w + r; dx++) {
        const nx = x + dx, ny = y + dy;
        if (!Grid.inB(nx, ny)) continue;
        if (nx >= x && nx < x + d.w && ny >= y && ny < y + d.h) continue;
        if (Grid.treeAt(s, nx, ny)) n++;
      }
    return n;
  },

  coverFraction(s, b, r) {
    if (!G.cache.coverCache) G.cache.coverCache = new Map();
    const ver = G.cache.forestVer || 0;
    const key = b.id + '|' + b.x + ',' + b.y + '|' + r + '|' + ver;
    const hit = G.cache.coverCache.get(key);
    if (hit !== undefined) return hit;
    const d = Grid.dimsOf(b);
    let tree = 0, total = 0;
    for (let dy = -r; dy < d.h + r; dy++)
      for (let dx = -r; dx < d.w + r; dx++) {
        const nx = b.x + dx, ny = b.y + dy;
        if (!Grid.inB(nx, ny)) continue;
        if (Util.rectDist(b.x, b.y, d.w, d.h, nx, ny, 1, 1) > r) continue;
        total++;
        if (Grid.treeAt(s, nx, ny)) tree++;
      }
    const frac = total ? tree / total : 0;

    if (G.cache.coverCache.size > 4096) G.cache.coverCache.clear();
    G.cache.coverCache.set(key, frac);
    return frac;
  },

  whyBlocked(s, type, x, y, rot) {
    const d = DEF(type);
    if (!d) return 'unknown building';
    const sz = Grid.dims(type, rot);
    if (!Grid.inB(x, y) || !Grid.inB(x + sz.w - 1, y + sz.h - 1)) return 'that is off the edge of the world';
    let unowned = false, occupied = false, tree = false, mountain = false, water = false, wrong = false, dry = false, salt = 0;
    Grid.footTiles(type, x, y, (tx, ty) => {
      if (!Grid.inB(tx, ty)) { unowned = true; return; }
      if (!Grid.owned(tx, ty)) unowned = true;
      if (G.cache.occ[Grid.key(tx, ty)] >= 0) occupied = true;
      if (Grid.treeAt(s, tx, ty)) tree = true;
      const t = G.cache.terrain[Grid.key(tx, ty)];
      if (t === TERRAIN.MOUNTAIN) mountain = true;
      if (t === TERRAIN.WATER) water = true;
      if (t === TERRAIN.SALT) salt++;
      if (d.onWater && t !== TERRAIN.WATER) dry = true;
      if (type !== 'road' && !d.onRock && !d.onWater && t !== TERRAIN.GRASS && t !== TERRAIN.FERTILE && t !== TERRAIN.SALT) wrong = true;
    }, rot);

    if (unowned) return 'you do not own that land yet — buy the parcel first';
    if (occupied) return 'something is already standing there';
    if (tree && !d.onWood) return 'wild trees in the way — clear them with Demolish ($' + TUNE.CLEAR_TREE + ' each)';
    if (mountain) return 'you cannot build on mountain';
    if (d.onWater && dry) return 'a ' + d.name + ' stands IN the water — every tile of it must sit on a channel';
    if (!d.onWater && water) return 'that is in the water';
    if (wrong) return 'the ground there will not take a building';

    if (d.needsBlock) {
      let inside = false;
      for (const bk of (G.cache.blocks || [])) {
        let all = true;
        Grid.footTiles(type, x, y, (tx, ty) => {
          if (tx < bk.x || ty < bk.y || tx >= bk.x + bk.w || ty >= bk.y + bk.h) all = false;
        }, rot);
        if (all) { inside = true; break; }
      }
      if (!inside) {
        const g = (typeof Econ !== 'undefined' && Econ.gridForecast) ? Econ.gridForecast(s) : null;
        return 'a ' + d.name + ' can only stand INSIDE a qualifying block' +
          (g && g.best ? ' — the nearest ' + g.best.short + ' is ' + g.best.missing +
            ' tile' + (g.best.missing === 1 ? '' : 's') + ' short of being filled' :
           ' — a rectangle 5-8 tiles a side with road on all four sides, every tile inside it ' +
           'built, and a Covered Drain in reach. Press G for the block map');
      }
    }

    if (d.onWood) {
      let wood = 0;
      Grid.footTiles(type, x, y, (tx, ty) => { if (Grid.inB(tx, ty) && Grid.treeAt(s, tx, ty)) wood++; }, rot);
      if (wood < 2) return 'a ' + d.name + ' must stand ON a dead stand — at least 2 tree tiles under ' +
        'its footprint. The trees are its stock: it eats them, and the ground becomes ash';
    }

    if (d.dryLand && !Grid.isDryLand(x, y, sz)) {
      return 'a ' + d.name + ' needs DRY ground — every tile under it must be plain grass or salt flat, ' +
        'never your irrigated fields or the riverbank. Look for the pale ground away from the water, ' +
        'or a salt flat';
    }
    return 'that spot will not take it';
  },

  waterWithin(x, y, d, r) {
    for (let dy = -r; dy < d.h + r; dy++)
      for (let dx = -r; dx < d.w + r; dx++) {
        const nx = x + dx, ny = y + dy;
        if (Grid.inB(nx, ny) && G.cache.terrain[Grid.key(nx, ny)] === TERRAIN.WATER) return true;
      }
    return false;
  },

  isDryLand(x, y, d) {
    let ok = true;
    for (let dy = 0; dy < d.h; dy++)
      for (let dx = 0; dx < d.w; dx++) {
        const t = G.cache.terrain[Grid.key(x + dx, y + dy)];
        if (t === TERRAIN.FERTILE || t === TERRAIN.WATER) ok = false;
      }
    return ok;
  },

  moveBuilding(s, b, x, y, rot) {
    b.x = x; b.y = y;
    if (rot !== undefined) b.rot = (rot | 0) & 3;
    G.cache.dirty = true;
  },

  addBuilding(s, type, x, y, rot) {
    const b = {
      id: s.nextId++, type, x, y, placed: s.placeCounter++,
      rot: (rot | 0) & 3,
      residents: 0, staff: 0, lastStaffEff: 0, status: 'ok',

      level: DEF(type).cap ? 1 : 0, evolve: 0,
    };
    s.buildings.push(b);
    G.cache.dirty = true;
    return b;
  },

  removeBuilding(s, b) {
    const i = s.buildings.indexOf(b);
    if (i >= 0) s.buildings.splice(i, 1);
    G.cache.dirty = true;
  },

  buildingAt(x, y) {
    if (!Grid.inB(x, y)) return null;
    const id = G.cache.occ[Grid.key(x, y)];
    return id >= 0 ? G.cache.byId.get(id) : null;
  },

  rebuild(s) {
    const C = G.cache;

    C.ratesDirty = true;

    if (C.forestLeft === undefined || C.forestDirty) {
      C.forestLeft = 0;
      for (let y = 0; y < TUNE.WORLD; y++)
        for (let x = 0; x < TUNE.WORLD; x++)
          if (Grid.treeAt(s, x, y)) C.forestLeft += Grid.woodAt(s, x, y);
      C.forestDirty = false;
    }
    C.occ.fill(-1); C.road.fill(0); C.byId.clear();
    C.ownedSet = new Set(s.owned);

    for (const b of s.buildings) {
      C.byId.set(b.id, b);
      Grid.tilesOf(b,(tx, ty) => {
        C.occ[Grid.key(tx, ty)] = b.id;

        if (b.type === 'road' || DEF(b.type).bridge) C.road[Grid.key(tx, ty)] = 1;
      });
    }

    C.depots = null;
    C.warmGeoClean = false;
    Grid.recomputeConnectivity(s);
    Grid.recomputeWater(s);
    Econ.stampMidden(s);

    Grid.recomputeBlocks(s);
    Grid.recomputeAdjacency(s);
    C.dirty = false;
    if (window.Rend && Rend.onWorldChange) Rend.onWorldChange();
  },

  recomputeConnectivity(s) {
    const C = G.cache;
    C.connRoads = new Set();
    const hall = s.buildings.find(b => b.type === 'townhall');
    if (!hall) return;

    const q = [];
    Grid.footTiles('townhall', hall.x, hall.y, (tx, ty) => {
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = tx + dx, ny = ty + dy;
        if (Grid.inB(nx, ny) && C.road[Grid.key(nx, ny)] && !C.connRoads.has(Grid.key(nx, ny))) {
          C.connRoads.add(Grid.key(nx, ny)); q.push([nx, ny]);
        }
      }
    });
    while (q.length) {
      const [x, y] = q.pop();
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (!Grid.inB(nx, ny)) continue;
        const k = Grid.key(nx, ny);
        if (C.road[k] && !C.connRoads.has(k)) { C.connRoads.add(k); q.push([nx, ny]); }
      }
    }

    for (const b of s.buildings) {
      if (b.type === 'townhall') { b.conn = true; continue; }
      if (b.type === 'road' || DEF(b.type).bridge) { b.conn = C.connRoads.has(Grid.key(b.x, b.y)); continue; }
      b.conn = Grid.touchesConnectedRoad(s, b, hall);
    }
  },

  touchesConnectedRoad(s, b, hall) {
    const C = G.cache;
    let found = false;
    Grid.tilesOf(b,(tx, ty) => {
      if (found) return;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = tx + dx, ny = ty + dy;
        if (!Grid.inB(nx, ny)) continue;
        const k = Grid.key(nx, ny);
        if (C.connRoads.has(k)) { found = true; return; }
        const occ = C.occ[k];
        if (occ >= 0 && C.byId.get(occ) && C.byId.get(occ).type === 'townhall') { found = true; return; }
      }
    });
    return found;
  },

  recomputeBlocks(s) {
    const C = G.cache;
    C.blocks = []; C.gridFrac = 0; C.blockNearMiss = null;

    for (const b of s.buildings) b.inBlock = false;
    if (!Econ.gridActive(s)) return;

    const T = TUNE.GRID, W = TUNE.WORLD;

    const drains = [], posts = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d) continue;
      const live = Econ.campLive(b) && (!d.needsRoad || b.conn);
      if (!live) continue;
      if (d.drainRadius) drains.push({ b, r: Econ.drainReach(s, d) });
      if (d.blockRadius) posts.push({ b, r: d.blockRadius,
        maxSide: d.blockMaxSide || T.maxSide, tol: d.blockTolerance || T.tolerance });
    }

    const seen = new Set();
    const wall = (x, y) => {
      if (!Grid.inB(x, y)) return true;
      if (!Grid.owned(x, y)) return true;
      const k = Grid.key(x, y);
      if (C.road[k]) return true;
      if (C.terrain[k] === TERRAIN.WATER) return true;
      return false;
    };

    const tiles = [];
    for (const key of s.owned) {
      const p = key.split(','), cx = +p[0] | 0, cy = +p[1] | 0;
      for (let dy = 0; dy < TUNE.CHUNK; dy++)
        for (let dx = 0; dx < TUNE.CHUNK; dx++)
          tiles.push([cx * TUNE.CHUNK + dx, cy * TUNE.CHUNK + dy]);
    }

    let builtTiles = 0;
    for (const [x, y] of tiles) {
      if (!Grid.inB(x, y)) continue;
      const occ = C.occ[Grid.key(x, y)];
      if (occ < 0) continue;
      const ob = C.byId.get(occ);
      if (!ob || ob.type === 'road' || DEF(ob.type).bridge) continue;
      builtTiles++;
    }

    let inBlockTiles = 0;
    for (const [sx, sy] of tiles) {
      if (wall(sx, sy)) continue;
      const sk = Grid.key(sx, sy);
      if (seen.has(sk)) continue;

      let minX = sx, maxX = sx, minY = sy, maxY = sy, n = 0;
      const stack = [[sx, sy]];
      seen.add(sk);
      const cells = [];
      while (stack.length) {
        const [x, y] = stack.pop();
        n++; cells.push([x, y]);
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy;
          if (wall(nx, ny)) continue;
          const nk = Grid.key(nx, ny);
          if (seen.has(nk)) continue;
          seen.add(nk); stack.push([nx, ny]);
        }
      }
      const w = maxX - minX + 1, h = maxY - minY + 1;
      if (n !== w * h) continue;

      let maxSide = T.maxSide, tol = T.tolerance;
      for (const p of posts) {
        const pd = Grid.dimsOf(p.b);
        let far = 0;
        for (const [cxx, cyy] of [[minX, minY], [maxX, minY], [minX, maxY], [maxX, maxY]])
          far = Math.max(far, Util.rectDist(p.b.x, p.b.y, pd.w, pd.h, cxx, cyy, 1, 1));
        if (far > p.r) continue;
        if (p.maxSide > maxSide) maxSide = p.maxSide;
        if (p.tol > tol) tol = p.tol;
      }
      if (w < T.minSide || h < T.minSide || w > maxSide || h > maxSide) continue;

      let ringOk = true;
      for (let x = minX - 1; x <= maxX + 1 && ringOk; x++)
        for (const y of [minY - 1, maxY + 1])
          if (!Grid.inB(x, y) || !C.road[Grid.key(x, y)]) { ringOk = false; break; }
      for (let y = minY; y <= maxY && ringOk; y++)
        for (const x of [minX - 1, maxX + 1])
          if (!Grid.inB(x, y) || !C.road[Grid.key(x, y)]) { ringOk = false; break; }
      if (!ringOk) continue;

      let empty = 0;
      for (const [x, y] of cells) if (C.occ[Grid.key(x, y)] < 0) empty++;

      const cover = [];
      for (const dr of drains) {
        const dd = Grid.dimsOf(dr.b);
        let far = 0;
        for (const [cxx, cyy] of [[minX, minY], [maxX, minY], [minX, maxY], [maxX, maxY]])
          far = Math.max(far, Util.rectDist(dr.b.x, dr.b.y, dd.w, dd.h, cxx, cyy, 1, 1));
        if (far <= dr.r) cover.push(dr.b.id);
      }

      if (empty > tol || !cover.length) {

        if (!cover.length) continue;
        const miss = empty - tol;
        if (!C.blockNearMiss || miss < C.blockNearMiss.missing)
          C.blockNearMiss = { x: minX, y: minY, w, h, missing: miss,
                              short: w + '×' + h };
        continue;
      }

      const inside = new Set();
      for (const [x, y] of cells) {
        const occ = C.occ[Grid.key(x, y)];
        if (occ >= 0) inside.add(occ);
      }
      for (const id of inside) {
        const ob = C.byId.get(id);
        if (ob) ob.inBlock = true;
      }

      inBlockTiles += (n - empty);
      C.blocks.push({ x: minX, y: minY, w, h, tiles: n, count: inside.size, drains: cover });
    }
    C.gridFrac = builtTiles > 0 ? inBlockTiles / builtTiles : 0;
  },

  stampRadius(map, b, radius) {
    Grid.tilesOf(b,(tx, ty) => {
      for (let dy = -radius; dy <= radius; dy++)
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = tx + dx, ny = ty + dy;
          if (Grid.inB(nx, ny)) map[Grid.key(nx, ny)] = 1;
        }
    });
  },

  stampRadiusCircle(map, b, radius) {
    const r2 = (radius + 0.5) * (radius + 0.5);
    Grid.tilesOf(b,(tx, ty) => {
      for (let dy = -radius; dy <= radius; dy++)
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > r2) continue;
          const nx = tx + dx, ny = ty + dy;
          if (Grid.inB(nx, ny)) map[Grid.key(nx, ny)] = 1;
        }
    });
  },

  recomputeWater(s) {
    const C = G.cache;
    C.water.fill(0);
    for (const b of s.buildings) {
      const d = DEF(b.type);

      if (d.waterRadius && !b.mothballed) Grid.stampRadiusCircle(C.water, b, d.waterRadius + rankRadiusBonus(b));
    }
  },

  covered(map, b) {
    let hit = false;
    Grid.tilesOf(b,(tx, ty) => {
      if (map[Grid.key(tx, ty)]) hit = true;
    });
    return hit;
  },

  fertileFrac(b) {
    const d = DEF(b.type);
    let fert = 0, total = d.w * d.h;
    Grid.tilesOf(b,(tx, ty) => {
      if (G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.FERTILE) fert++;
    });
    return fert / total;
  },

  gap(a, b) {
    const da = Grid.dimsOf(a), db = Grid.dimsOf(b);
    return Util.rectGap(a.x, a.y, da.w, da.h, b.x, b.y, db.w, db.h);
  },

  adjacent(a, b) { return Grid.gap(a, b) === 0; },

  goodGround(s, b) {
    const d = DEF(b.type);
    const sz = Grid.dimsOf(b);

    const want = Math.min(2, sz.w * sz.h);
    if (d.onRock) return Grid.rockFrac(b) * sz.w * sz.h >= want;
    if (d.onSalt) {
      let n = 0;
      Grid.tilesOf(b, (x, y) => { if (Grid.inB(x, y) && G.cache.terrain[Grid.key(x, y)] === TERRAIN.SALT) n++; });
      return n >= want;
    }
    if (d.nearWater) return Grid.waterWithin(b.x, b.y, sz, d.nearWater);
    if (d.nearTrees) return Grid.treesWithin(s, b.x, b.y, sz, 3) >= d.nearTrees;

    if (d.dryLand) return Grid.isDryLand(b.x, b.y, Grid.dimsOf(b));
    return false;
  },

  rockFrac(b) {
    const d = DEF(b.type);
    let rock = 0;
    Grid.tilesOf(b,(tx, ty) => {
      if (G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.ROCK) rock++;
    });
    return rock / (d.w * d.h);
  },

  recomputeAdjacency(s) {
    const grainFarms = s.buildings.filter(b => DEF(b.type).out && DEF(b.type).out.grain);

    const producers = s.buildings.filter(b => DEF(b.type).out || DEF(b.type).procOut);
    const processors = s.buildings.filter(b => DEF(b.type).procIn);

    const mills = s.buildings.filter(b => DEF(b.type).grainMill);
    const floors = s.buildings.filter(b => DEF(b.type).threshing);

    const parks = s.buildings.filter(b => DEF(b.type).capRadius);
    const shrines = s.buildings.filter(b => DEF(b.type).amenityRadius);
    const temples = s.buildings.filter(b => b.type === 'temple');
    const industry = s.buildings.filter(b => DEF(b.type).industry);
    const shops = s.buildings.filter(b => DEF(b.type).sells);
    const homes = s.buildings.filter(b => DEF(b.type).cap);

    const ovens = s.buildings.filter(b => DEF(b.type).ovenRadius);
    const weighs = s.buildings.filter(b => DEF(b.type).weighRadius);
    const bureaus = s.buildings.filter(b => DEF(b.type).woolBureau);
    const byres = s.buildings.filter(b => DEF(b.type).oxTeam);

    const lamps = s.buildings.filter(b => DEF(b.type).lampRadius);

    const scribes = s.buildings.filter(b => DEF(b.type).keepsTally && b.done !== false);

    const within = (a, o, r) => {
      const ad = Grid.dimsOf(a), od = Grid.dimsOf(o);
      return Util.rectDist(a.x, a.y, ad.w, ad.h, o.x, o.y, od.w, od.h) <= r;
    };

    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (d.out && d.out.grain) {

        let boost = mills.some(o => Grid.adjacent(b, o)) ? TUNE.ADJ_BONUS : 0;
        for (const o of floors) {
          if (Grid.adjacent(b, o)) boost = Math.max(boost, TUNE.ADJ_BONUS * rankOutMult(o));
        }
        b.adjBoost = boost;
        b.fertile = Grid.fertileFrac(b);
      } else if (d.out) {

        const kind = Object.keys(d.out)[0];
        b.adjBoost = processors.some(o => DEF(o.type).procIn === kind && Grid.adjacent(b, o))
          ? TUNE.ADJ_BONUS : 0;

        if (DEF(b.type).onRock) b.rockFrac = Grid.rockFrac(b);
      } else if (d.procIn) {

        b.adjBoost = producers.some(o => {
          const od = DEF(o.type);
          return ((od.out && od.out[d.procIn] !== undefined) || od.procOut === d.procIn) &&
            Grid.adjacent(b, o);
        }) ? TUNE.ADJ_BONUS : 0;
      } else if (d.cap) {

        const nearPark = parks.some(o => within(b, o, (DEF(o.type).capRadius || 1) + rankRadiusBonus(o)));

        const nearShrine = shrines.some(o => within(b, o, DEF(o.type).amenityRadius + rankRadiusBonus(o)));
        const nearTemple = temples.some(o => within(b, o, 2));
        const nearInd = industry.some(o => Grid.adjacent(b, o));

        b.cap = Math.max(1, houseCap(d, b) + ((nearPark || nearShrine) ? 1 : 0) + (nearTemple ? 1 : 0) - (nearInd ? 1 : 0)
          + (b.inBlock ? TUNE.GRID.capBonus : 0) + ((s.giftDrain | 0)));

        if (s.policyHuddle && Econ.trophicActive(s))
          b.cap = Math.max(1, Math.round(b.cap * (1 - TUNE.HUDDLE.capCut)));

        if (Econ.trophicActive(s)) {
          b.cover = Grid.coverFraction(s, b, TUNE.PRED.coverRadius);
          b.sentinel = Econ.sentinelReliefAt(s, b);
        }
        b.nearPark = nearPark; b.nearShrine = nearShrine; b.nearTemple = nearTemple; b.nearInd = nearInd;

        b.nearOvenIds = ovens.filter(o => within(b, o, TUNE.OVEN.radius)).map(o => o.id);
        b.nearOven = b.nearOvenIds.length > 0;
        b.nearMarket = shops.some(o => within(b, o, DEF(o.type).custRadius || 6));

        b.nearHomes = homes.reduce((n, o) => {
          if (o === b) return n;
          return n + (within(b, o, 2) ? 1 : 0);
        }, 0);
      }

      if (d.sells || d.sellsRaw) {
        b.scribed = scribes.some(o => within(b, o, TUNE.SCRIBE.radius + rankRadiusBonus(o)));
        b.weighedBy = weighs.filter(o => within(b, o, TUNE.WEIGH.radius)).map(o => o.id);

        b.bureauBy = (d.sells === 'cloth' || d.sells === 'dyedcloth')
          ? bureaus.filter(o => within(b, o, TUNE.BUREAU.radius)).map(o => o.id) : [];
      }

      if (d.plowed) {

        b.oxNear = byres.filter(o => within(b, o, Econ.oxRadius(DEF(o.type)))).map(o => o.id);
      }

      if (d.mines) {
        b.lampNear = lamps.filter(o =>
          within(b, o, DEF(o.type).lampRadius + rankRadiusBonus(o))).map(o => o.id);
      }

      if (d.procIn === 'wool') {
        b.bureauSlowBy = bureaus.filter(o => within(b, o, TUNE.BUREAU.radius)).map(o => o.id);
      }
    }

    const camps = s.buildings.filter(o => DEF(o.type).forageRadius);
    for (const b of camps) {
      const d = DEF(b.type), rb = Econ.forageRadiusOf(s, b);
      b.forageNear = camps.filter(o => o !== b &&
        DEF(o.type).forageKind === d.forageKind &&
        within(b, o, Math.max(rb, Econ.forageRadiusOf(s, o)))).map(o => o.id);
    }
  },

  customerSurvey(s, b) {
    const d = Grid.dimsOf(b);
    let n = 0, sum = 0;

    const hall = s.buildings.find(x => x.type === 'townhall');
    const crew = Game.crewSize(s);
    if (hall && crew > 0) {
      const hd = Grid.dimsOf(hall);
      n += crew;
      sum += Util.rectDist(b.x, b.y, d.w, d.h, hall.x, hall.y, hd.w, hd.h) * crew;
    }
    for (const h of s.buildings) {
      if (!DEF(h.type).cap || !h.residents) continue;
      const hd = Grid.dimsOf(h);

      const gap = Util.rectDist(b.x, b.y, d.w, d.h, h.x, h.y, hd.w, hd.h);
      n += h.residents;
      sum += gap * h.residents;
    }
    return { n, meanDist: n ? sum / n : 0 };
  },

  residentsWithin(s, b, radius) {
    const d = Grid.dimsOf(b);
    let n = 0;
    for (const h of s.buildings) {

      if (!DEF(h.type).cap || !h.residents) continue;
      const hd = DEF(h.type);

      if (Util.rectDist(b.x, b.y, d.w, d.h, h.x, h.y, hd.w, hd.h) <= radius) n += h.residents;
    }
    return n;
  },
};
