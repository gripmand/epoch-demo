'use strict';

const TERRAIN = { GRASS: 0, FERTILE: 1, ROCK: 2, WATER: 3, MOUNTAIN: 4, SALT: 5 };

const Grid = {
  W: TUNE.WORLD,

  key(x, y) { return y * TUNE.WORLD + x; },
  inB(x, y) { return x >= 0 && y >= 0 && x < TUNE.WORLD && y < TUNE.WORLD; },

  chunkOf(x, y) { return { cx: Math.floor(x / TUNE.CHUNK), cy: Math.floor(y / TUNE.CHUNK) }; },

  chunkKeyOf(x, y) {
    const c = (typeof Rend !== 'undefined' && Rend.CH) ? Rend.CH : 32;
    return Math.floor(x / c) + ',' + Math.floor(y / c);
  },

  genTerrain(s) {
    const W = TUNE.WORLD, t = G.cache.terrain;
    t.fill(TERRAIN.GRASS);
    const rnd = Util.mulberry32(s.seed);
    const c = W / 2;

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
        ang = ang * 0.90 + desired * 0.10 + (rnd() - 0.5) * 0.42;
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

    const side = Math.floor(rnd() * 2);
    const bendX = c + (rnd() < 0.5 ? -1 : 1) * (11 + rnd() * 5);
    const bendZ = c + (rnd() < 0.5 ? -1 : 1) * (11 + rnd() * 5);
    const start = side ? [0, 40 + rnd() * (W - 80)] : [40 + rnd() * (W - 80), 0];
    const end = side ? [W - 1, 40 + rnd() * (W - 80)] : [40 + rnd() * (W - 80), W - 1];
    carve(start[0], start[1], bendX, bendZ, 3.4, W * 0.75, 2);
    carve(bendX, bendZ, end[0], end[1], 3.2, W * 0.75, 2);

    carve(rnd() * W, 0, rnd() * W, W - 1, 2.2, W * 0.9, 1);

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
        const jitter = nz(x, y, 14) * 5;
        if (d >= 0 && d <= 5 + jitter) t[k] = TERRAIN.FERTILE;
        else if (d < 0 || d > 16 + jitter * 2) {

          const r = nz(x, y, 21);
          if (r > 0.80) t[k] = TERRAIN.ROCK;
          else if (nz(x, y, 17) > 0.54) t[k] = TERRAIN.SALT;
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

    const isRock = (x, y) => Grid.inB(x, y) && t[Grid.key(x, y)] === TERRAIN.ROCK;
    const peaks = [];
    for (let y = 2; y < W - 2; y++)
      for (let x = 2; x < W - 2; x++) {
        if (!isRock(x, y)) continue;
        let solid = true;
        for (let dy = -2; dy <= 2 && solid; dy++)
          for (let dx = -2; dx <= 2; dx++)
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

    for (let y = c + 2; y <= c + 4; y++) for (let x = c - 4; x <= c - 1; x++)
      if (t[Grid.key(x, y)] !== TERRAIN.WATER) t[Grid.key(x, y)] = TERRAIN.FERTILE;
    for (let y = c - 4; y <= c - 2; y++) for (let x = c + 4; x <= c + 6; x++)
      if (t[Grid.key(x, y)] !== TERRAIN.WATER) t[Grid.key(x, y)] = TERRAIN.FERTILE;

    for (const k in (s.terraEdits || {})) t[k] = s.terraEdits[k];

    G.cache.ownedSet = new Set(s.owned);
  },

  TREE_DENSITY: { 1: 0.030, 2: 0.045, 3: 0.240, 4: 0.110, 5: 0.070, 6: 0.080,
                  7: 0.170, 8: 0.070, 9: 0.020, 10: 0.045, 11: 0.040,
                  12: 0.0, 13: 0.0, 14: 0.025 },

  treeDensity(era) {
    const d = Grid.TREE_DENSITY[era || (G.s && G.s.era) || 1];
    return d === undefined ? 0.13 : d;
  },

  treeAt(s, x, y) {
    const k = Grid.key(x, y);
    if (s.planted && s.planted[k]) return true;
    if (s.cleared && s.cleared[k]) return false;
    if (G.cache.terrain[k] !== TERRAIN.GRASS) return false;
    const era = (s && s.era) || 1;
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

  footHasTree(s, type, x, y) {
    let hit = false;
    Grid.footTiles(type, x, y, (tx, ty) => {
      if (Grid.inB(tx, ty) && Grid.treeAt(s, tx, ty)) hit = true;
    });
    return hit;
  },

  clearTree(s, x, y) {
    const k = Grid.key(x, y);
    if (s.planted && s.planted[k]) delete s.planted[k];
    s.cleared[k] = 1;
  },

  terraform(s, kind, x, y) {
    if (!Grid.inB(x, y)) return false;
    if (!Grid.owned(x, y)) return 'unowned';
    const k = Grid.key(x, y);
    if (G.cache.occ[k] >= 0) return 'occupied';
    const cost = TUNE.TERRA[kind];
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
      if (T !== TERRAIN.GRASS) s.cleared[k] = 1;
    }
    s.money -= cost;
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
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
      if (!Grid.inB(tx, ty)) return;
      sum += Grid.soilAt(tx, ty); n++;
    });
    return n ? sum / n : 1;
  },

  stoneAt(x, y) {
    const v = G.s && G.s.rockSpent ? G.s.rockSpent[Grid.key(x, y)] : undefined;
    return TUNE.ROCK_YIELD - (v === undefined ? 0 : v);
  },

  spendStone(s, x, y, amt) {
    const k = Grid.key(x, y);
    const spent = (s.rockSpent[k] || 0) + amt;
    s.rockSpent[k] = Math.min(TUNE.ROCK_YIELD, spent);

    if (s.rockSpent[k] >= TUNE.ROCK_YIELD && G.cache.terrain[k] === TERRAIN.ROCK) {
      G.cache.terrain[k] = TERRAIN.GRASS;
      s.terraEdits[k] = TERRAIN.GRASS;
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
    return Math.round(raw * (1 - subTier(G.s).landDiscount));
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

  footTiles(type, x, y, fn) {
    const d = DEF(type);
    for (let dy = 0; dy < d.h; dy++)
      for (let dx = 0; dx < d.w; dx++)
        fn(x + dx, y + dy);
  },

  canPlace(s, type, x, y, ignoreId) {
    const d = DEF(type);

    if (window.Dev && Dev.flags.freeBuild) {
      let devOk = true;
      Grid.footTiles(type, x, y, (tx, ty) => {
        if (!devOk) return;
        if (!Grid.inB(tx, ty)) { devOk = false; return; }
        const occ = G.cache.occ[Grid.key(tx, ty)];
        if (occ >= 0 && occ !== ignoreId) devOk = false;
      });
      return devOk;
    }

    let ok = true, rock = 0;
    Grid.footTiles(type, x, y, (tx, ty) => {
      if (!ok) return;
      if (!Grid.inB(tx, ty) || !Grid.owned(tx, ty)) { ok = false; return; }
      const occ = G.cache.occ[Grid.key(tx, ty)];
      if (occ >= 0 && occ !== ignoreId) { ok = false; return; }
      const t = G.cache.terrain[Grid.key(tx, ty)];
      if (t === TERRAIN.ROCK) rock++;
      if (t === TERRAIN.MOUNTAIN) { ok = false; return; }

      if (type === 'road' || d.onRock) { if (t === TERRAIN.WATER) ok = false; }
      else if (t !== TERRAIN.GRASS && t !== TERRAIN.FERTILE && t !== TERRAIN.SALT) ok = false;

      if (ok && Grid.treeAt(s, tx, ty)) ok = false;
    });

    if (ok && d.onRock && rock < 2) ok = false;

    if (ok && d.nearWater && !Grid.waterWithin(x, y, d, d.nearWater)) ok = false;
    if (ok && d.dryLand && !Grid.isDryLand(x, y, d)) ok = false;
    return ok;
  },

  whyBlocked(s, type, x, y) {
    const d = DEF(type);
    if (!d) return 'unknown building';
    if (!Grid.inB(x, y) || !Grid.inB(x + d.w - 1, y + d.h - 1)) return 'that is off the edge of the world';
    let unowned = false, occupied = false, tree = false, mountain = false, water = false, wrong = false;
    Grid.footTiles(type, x, y, (tx, ty) => {
      if (!Grid.inB(tx, ty)) { unowned = true; return; }
      if (!Grid.owned(tx, ty)) unowned = true;
      if (G.cache.occ[Grid.key(tx, ty)] >= 0) occupied = true;
      if (Grid.treeAt(s, tx, ty)) tree = true;
      const t = G.cache.terrain[Grid.key(tx, ty)];
      if (t === TERRAIN.MOUNTAIN) mountain = true;
      if (t === TERRAIN.WATER) water = true;
      if (type !== 'road' && !d.onRock && t !== TERRAIN.GRASS && t !== TERRAIN.FERTILE && t !== TERRAIN.SALT) wrong = true;
    });

    if (unowned) return 'you do not own that land yet — buy the parcel first';
    if (occupied) return 'something is already standing there';
    if (tree) return 'wild trees in the way — clear them with Demolish ($' + TUNE.CLEAR_TREE + ' each)';
    if (mountain) return 'you cannot build on mountain';
    if (water) return 'that is in the water';
    if (wrong) return 'the ground there will not take a building';
    if (d.onRock && Grid.rockFrac({ type, x, y }) * d.w * d.h < 2) {
      return 'a ' + d.name + ' must sit on ROCK — at least 2 rocky tiles under its footprint';
    }
    if (d.nearWater && !Grid.waterWithin(x, y, d, d.nearWater)) {
      return 'a ' + d.name + ' must be within ' + d.nearWater + ' tiles of water — move it to the bank';
    }

    if (d.dryLand && !Grid.isDryLand(x, y, d)) {
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

  moveBuilding(s, b, x, y) {
    b.x = x; b.y = y;
    G.cache.dirty = true;
  },

  addBuilding(s, type, x, y) {
    const b = {
      id: s.nextId++, type, x, y, placed: s.placeCounter++,
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
    C.occ.fill(-1); C.road.fill(0); C.byId.clear();
    C.ownedSet = new Set(s.owned);

    for (const b of s.buildings) {
      C.byId.set(b.id, b);
      Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
        C.occ[Grid.key(tx, ty)] = b.id;
        if (b.type === 'road') C.road[Grid.key(tx, ty)] = 1;
      });
    }

    C.depots = null;
    Grid.recomputeConnectivity(s);
    Grid.recomputeWater(s);
    Econ.stampMidden(s);
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
      if (b.type === 'road') { b.conn = C.connRoads.has(Grid.key(b.x, b.y)); continue; }
      b.conn = Grid.touchesConnectedRoad(s, b, hall);
    }
  },

  touchesConnectedRoad(s, b, hall) {
    const C = G.cache;
    let found = false;
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
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

  stampRadius(map, b, radius) {
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
      for (let dy = -radius; dy <= radius; dy++)
        for (let dx = -radius; dx <= radius; dx++) {
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

      if (d.waterRadius) Grid.stampRadius(C.water, b, d.waterRadius + rankRadiusBonus(b));
    }
  },

  covered(map, b) {
    let hit = false;
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
      if (map[Grid.key(tx, ty)]) hit = true;
    });
    return hit;
  },

  fertileFrac(b) {
    const d = DEF(b.type);
    let fert = 0, total = d.w * d.h;
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
      if (G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.FERTILE) fert++;
    });
    return fert / total;
  },

  gap(a, b) {
    const da = DEF(a.type), db = DEF(b.type);
    return Util.rectGap(a.x, a.y, da.w, da.h, b.x, b.y, db.w, db.h);
  },

  adjacent(a, b) { return Grid.gap(a, b) === 0; },

  rockFrac(b) {
    const d = DEF(b.type);
    let rock = 0;
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
      if (G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.ROCK) rock++;
    });
    return rock / (d.w * d.h);
  },

  recomputeAdjacency(s) {
    const grainFarms = s.buildings.filter(b => DEF(b.type).out && DEF(b.type).out.grain);
    const mills = s.buildings.filter(b => b.type === 'mill');
    const quarries = s.buildings.filter(b => b.type === 'quarry');
    const floors = s.buildings.filter(b => DEF(b.type).threshing);
    const cutters = s.buildings.filter(b => b.type === 'stonecutter');
    const parks = s.buildings.filter(b => b.type === 'park');
    const temples = s.buildings.filter(b => b.type === 'temple');
    const industry = s.buildings.filter(b => DEF(b.type).industry);
    const shops = s.buildings.filter(b => DEF(b.type).sells);
    const homes = s.buildings.filter(b => DEF(b.type).cap);

    const scribes = s.buildings.filter(b => DEF(b.type).keepsTally && b.done !== false);

    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (d.out && d.out.grain) {

        b.adjBoost = mills.some(o => Grid.adjacent(b, o)) || floors.some(o => Grid.adjacent(b, o));
        b.fertile = Grid.fertileFrac(b);
      } else if (b.type === 'mill') {
        b.adjBoost = grainFarms.some(o => Grid.adjacent(b, o));
      } else if (d.procIn === 'clay') {
        b.adjBoost = s.buildings.some(o => o.type === 'claypit' && Grid.adjacent(b, o));
      } else if (d.procIn === 'wool') {
        b.adjBoost = s.buildings.some(o => o.type === 'sheepfold' && Grid.adjacent(b, o));
      } else if (b.type === 'brewery') {
        b.adjBoost = grainFarms.some(o => Grid.adjacent(b, o));
      } else if (b.type === 'quarry') {
        b.adjBoost = cutters.some(o => Grid.adjacent(b, o));
        b.rockFrac = Grid.rockFrac(b);
      } else if (b.type === 'stonecutter') {
        b.adjBoost = quarries.some(o => Grid.adjacent(b, o));
      } else if (d.sells) {

        b.scribed = scribes.some(o => {
          const od = DEF(o.type);
          return Util.rectGap(b.x, b.y, d.w, d.h, o.x, o.y, od.w, od.h) <= TUNE.SCRIBE.radius;
        });
      } else if (d.cap) {

        const nearPark = parks.some(o => {
          const od = DEF(o.type);
          return Util.rectGap(b.x, b.y, d.w, d.h, o.x, o.y, od.w, od.h) <= (od.capRadius || 1);
        });
        const nearTemple = temples.some(o => Grid.gap(b, o) <= 2);
        const nearInd = industry.some(o => Grid.adjacent(b, o));

        b.cap = Math.max(1, houseCap(d, b) + (nearPark ? 1 : 0) + (nearTemple ? 1 : 0) - (nearInd ? 1 : 0));
        b.nearPark = nearPark; b.nearTemple = nearTemple; b.nearInd = nearInd;
        b.nearMarket = shops.some(o => {
          const od = DEF(o.type);
          return Util.rectGap(b.x, b.y, d.w, d.h, o.x, o.y, od.w, od.h) <= od.custRadius;
        });

        b.nearHomes = homes.reduce((n, o) => {
          if (o === b) return n;
          const od = DEF(o.type);
          return n + (Util.rectGap(b.x, b.y, d.w, d.h, o.x, o.y, od.w, od.h) <= 2 ? 1 : 0);
        }, 0);
      }
    }
  },

  customerSurvey(s, b) {
    const d = DEF(b.type);
    let n = 0, sum = 0;
    for (const h of s.buildings) {
      const hd = DEF(h.type);
      if (!hd.cap || !h.residents) continue;
      const gap = Util.rectGap(b.x, b.y, d.w, d.h, h.x, h.y, hd.w, hd.h);
      n += h.residents;
      sum += gap * h.residents;
    }
    return { n, meanDist: n ? sum / n : 0 };
  },

  residentsWithin(s, b, radius) {
    const d = DEF(b.type);
    let n = 0;
    for (const h of s.buildings) {

      if (!DEF(h.type).cap || !h.residents) continue;
      const hd = DEF(h.type);

      if (Util.rectGap(b.x, b.y, d.w, d.h, h.x, h.y, hd.w, hd.h) <= radius) n += h.residents;
    }
    return n;
  },
};
