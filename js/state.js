'use strict';

const SAVE_KEY = 'epoch_save_v5';

const G = {
  s: null,
  cache: null,
};

const Game = {
  newGame(seed, opts) {

    const granted = !!TUNE.FOUNDING_GRANT && !(opts && opts.bare);
    const s = {
      version: 1,
      seed: seed !== undefined ? seed : (Math.floor(Math.random() * 2 ** 31)),
      tick: 0,
      money: TUNE.START_MONEY,
      era: 1,
      hallLevel: 1,
      realRent: 0,

      stock: Game.startStock(granted),
      cum: { flour: 0, stone: 0, earned: 0 },
      hunger: 0,
      settlerAcc: 0,

      literate: TUNE.TALLY_FROM_START ? 1 : 0,

      foundingLeft: granted ? TUNE.FOUNDING.purse : 0,
      buildings: [],
      nextId: 1,
      placeCounter: 0,
      owned: [],
      firsts: {},
      prompted: {},
      terraEdits: {},
      soilEdits: {},
      rockSpent: {},
      cleared: {},
      planted: {},

      lastSeenMs: Date.now(),
      subTier: 'free',
      cp: 0,
      cpFrac: 0,
      hallJob: null,
    };

    const cc = TUNE.WORLD / TUNE.CHUNK / 2 - 1;
    for (let cy = cc; cy <= cc + 2; cy++)
      for (let cx = cc; cx <= cc + 2; cx++)
        s.owned.push(cx + ',' + cy);
    const C = TUNE.WORLD / 2;

    G.s = s;
    G.cache = Game.freshCache();
    Grid.genTerrain(s);

    for (let y = C - 4; y <= C + 7; y++)
      for (let x = C - 4; x <= C + 7; x++)
        if (Grid.treeAt(s, x, y)) s.cleared[Grid.key(x, y)] = 1;
    Grid.addBuilding(s, 'townhall', C - 2, C - 2);
    Grid.rebuild(s);

    if (granted) {
      Game.foundingSettlement(s, C);
      Grid.rebuild(s);
    }
    if (window.Rend && Rend.invalidateTerrain) Rend.invalidateTerrain();
    return s;
  },

  startStock(granted) {
    const st = Object.assign({}, TUNE.START_STOCK);
    if (!granted) for (const k in st) st[k] = 0;
    return st;
  },

  foundingSettlement(s, C) {
    const put = (t, x, y) => {
      if (!Grid.canPlace(s, t, x, y)) return null;
      const d = DEF(t);
      if (d.needsWater && !Grid.covered(G.cache.water, { type: t, x, y })) return null;
      const b = Grid.addBuilding(s, t, x, y);
      Grid.rebuild(s);
      return b;
    };

    const LANE = C + 1, ROW = C + 2, LANE2 = C + 4, ROW2 = C + 5;
    for (let x = C - 4; x <= C + 7; x++) put('road', x, LANE);
    for (let x = C - 4; x <= C + 7; x++) put('road', x, LANE2);

    put('well', C - 4, ROW2);
    put('well', C + 3, ROW2);

    const farms = [];
    for (const [x, y] of [[C - 4, ROW], [C - 2, ROW], [C, ROW]]) {
      const b = put('farm', x, y);
      if (b) farms.push(b);
    }
    const mill = put('mill', C + 2, ROW);
    let market = null;
    for (const [x, y] of [[C + 4, ROW], [C + 4, ROW2], [C + 6, ROW]]) {
      market = put('market', x, y);
      if (market) break;
    }

    let midden = null;
    for (const [x, y] of [[C - 2, ROW2], [C, ROW2], [C - 4, ROW2 + 1]]) {
      midden = put('midden', x, y);
      if (midden) break;
    }

    let homes = 0;
    for (const x of [C + 4, C + 5, C + 6, C + 7, C + 2, C + 1]) {
      if (homes >= 4) break;
      if (put('house', x, ROW2)) homes++;
    }

    Grid.rebuild(s);
    for (const b of s.buildings) {
      const bd = DEF(b.type);
      if (!bd.needsRoad || bd.fixed || b.conn) continue;
      for (let y = b.y - 1; y >= LANE; y--) put('road', b.x, y);
      Grid.rebuild(s);
    }
    return { farms: farms.length, homes, mill: !!mill, market: !!market, midden: !!midden };
  },

  freshCache() {
    const n = TUNE.WORLD * TUNE.WORLD;
    return {
      dirty: true,
      terrain: new Uint8Array(n),
      occ: new Int32Array(n).fill(-1),
      road: new Uint8Array(n),
      connRoads: new Set(),
      water: new Uint8Array(n),
      power: new Uint8Array(n),
      midden: new Uint8Array(n),
      ownedSet: new Set(),
      byId: new Map(),
      net: 0,
      flourRate: 0,
      workersTotal: 0,
      workersUsed: 0,
      floaters: [],

      tally: {},
      tallyTick: null,
      upkeepRate: 0,
      incomeRate: 0,
      premiumRate: 0,
    };
  },

  totalResidents(s) {
    let n = 0;
    for (const b of s.buildings) if (b.residents) n += b.residents;
    return n;
  },

  totalCapacity(s) {
    let n = 0;
    for (const b of s.buildings) if (DEF(b.type).cap) n += (b.cap != null ? b.cap : DEF(b.type).cap);
    return n;
  },

  serialize(s) {
    return JSON.stringify({
      version: s.version, seed: s.seed, tick: s.tick, money: s.money,
      era: s.era, hallLevel: s.hallLevel, realRent: s.realRent,
      stock: s.stock, cum: s.cum, hunger: s.hunger, prompted: s.prompted,
      terraEdits: s.terraEdits, cleared: s.cleared, planted: s.planted,
      soilEdits: s.soilEdits, rockSpent: s.rockSpent,
      lastSeenMs: Date.now(), cp: s.cp, cpFrac: s.cpFrac, hallJob: s.hallJob, subTier: s.subTier,
      settlerAcc: s.settlerAcc || 0,
      literate: s.literate ? 1 : 0,
      foundingLeft: +s.foundingLeft || 0,
      nextId: s.nextId, placeCounter: s.placeCounter, owned: s.owned, firsts: s.firsts,
      buildings: s.buildings.map(b => ({
        id: b.id, type: b.type, x: b.x, y: b.y, placed: b.placed,
        residents: b.residents || 0,
        level: b.level || 0,
        bought: b.bought || 0,
        evolve: b.evolve || 0,
        job: b.job || null,
        done: b.done !== false,

        resting: !!b.resting,

        halted: !!b.halted,

        rank: b.rank || 1,

        delivered: DEF(b.type).monument ? (b.delivered || {}) : undefined,
        complete: DEF(b.type).monument ? !!b.complete : undefined,
      })),
    });
  },

  save() {
    try { localStorage.setItem(SAVE_KEY, Game.serialize(G.s)); return true; }
    catch (e) { return false; }
  },

  load() {
    let raw;
    try { raw = localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
    if (!raw) return false;
    let d;
    try { d = JSON.parse(raw); } catch (e) { return false; }
    if (!d || d.version !== 1 || !Array.isArray(d.buildings)) return false;
    if (!d.buildings.some(b => b.type === 'townhall')) return false;

    const s = {
      version: 1, seed: d.seed >>> 0, tick: d.tick | 0, money: +d.money || 0,
      era: Util.clamp(d.era | 0 || 1, 1, MAX_ERA),
      hallLevel: Util.clamp(d.hallLevel | 0 || 1, 1, MAX_ERA),
      realRent: +d.realRent || 0,

      stock: (() => {
        const st = {};
        for (const k in TUNE.PRICES) st[k] = +(d.stock && d.stock[k]) || 0;
        return st;
      })(),
      cum: { flour: +d.cum.flour || 0, stone: +d.cum.stone || 0, earned: +d.cum.earned || 0 },
      hunger: +d.hunger || 0,
      nextId: d.nextId | 0 || 1, placeCounter: d.placeCounter | 0 || 0,
      owned: d.owned.slice(), firsts: d.firsts || {}, prompted: d.prompted || {},
      terraEdits: d.terraEdits || {}, cleared: d.cleared || {}, planted: d.planted || {},
      soilEdits: d.soilEdits || {}, rockSpent: d.rockSpent || {},
      lastSeenMs: +d.lastSeenMs || Date.now(),
      subTier: SUB_TIERS[d.subTier] ? d.subTier : 'free',
      cp: +d.cp || 0, cpFrac: +d.cpFrac || 0,
      settlerAcc: +d.settlerAcc || 0,

      literate: TUNE.TALLY_FROM_START ? 1 : (d.literate === undefined ? 1 : (d.literate ? 1 : 0)),

      foundingLeft: d.foundingLeft === undefined ? 0 : Math.max(0, +d.foundingLeft || 0),
      hallJob: d.hallJob || null,
      buildings: d.buildings
        .filter(b => BUILDINGS[b.type])
        .map(b => ({
          id: b.id, type: b.type, x: b.x, y: b.y, placed: b.placed || 0,
          residents: b.residents || 0, staff: 0, lastStaffEff: 0, status: 'ok',

          level: b.level || (BUILDINGS[b.type] && BUILDINGS[b.type].cap ? 1 : 0),
          bought: b.bought || 0,
          evolve: +b.evolve || 0,
          job: b.job || null, done: b.done !== false,
          resting: !!b.resting,
          halted: !!b.halted,

          rank: Util.clamp(Math.round(+b.rank || 1), 1, RANK.max),

          delivered: b.delivered || {},
          complete: BUILDINGS[b.type].monument ? (b.delivered === undefined ? true : !!b.complete) : false,
        })),
    };
    G.s = s;
    G.cache = Game.freshCache();
    Grid.genTerrain(s);
    Grid.rebuild(s);
    if (window.Rend && Rend.invalidateTerrain) Rend.invalidateTerrain();
    return true;
  },

  reset() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    Game.newGame();
  },
};
