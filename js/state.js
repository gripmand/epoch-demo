'use strict';

const SAVE_KEY = 'epoch_save_v7';

const ERA1_CALL = 1;
const ARCHIVE_KEY = 'epoch_archive_v7';

const LEGACY_KEYS = ['epoch_save_v6', 'epoch_save_v5'];

const G = {
  s: null,
  cache: null,
};

const Game = {
  newGame(seed, opts) {

    const granted = !!TUNE.FOUNDING_GRANT && !(opts && opts.bare);

    const era = (opts && opts.era != null) ? opts.era : START_ERA;
    const s = {
      version: 1,
      seed: seed !== undefined ? seed : (Math.floor(Math.random() * 2 ** 31)),
      tick: 0,

      money: startMoneyFor(era),

      era,

      hallLevel: Math.max(1, era),
      realRent: 0,

      eraBase: { flour: 0, food: 0, stone: 0, tributePaid: 0 },
      giftHousing: 0,
      giftStore: 0,
      giftRank: 0,
      giftCrew: 0,
      giftLand: 0,
      giftDrain: 0,
      giftIssue: 0,

      giftTerra: 0,

      stock: Game.startStock(granted, era),

      cum: { flour: 0, food: 0, stone: 0, earned: 0, tributePaid: 0 },
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

      era1Call: ERA1_CALL,

      founded: false,
      terraEdits: {},

      elevEdits: {},
      soilEdits: {},
      rockSpent: {},
      cleared: {},
      planted: {},

      lastSeenMs: Date.now(),
      subTier: 'free',
      cp: 0,
      cpFrac: 0,
      hallJob: null,

      cityName: '',

      policyFeedFirst: true,
      policyRationLaw: true,
      policyBeerRation: false,
      policyCorvee: false,
      policyRation: false,
      policySweep: false,
      policyWideIssue: false,
      policyRevet: false,
      season: null,

      policyDoubleShift: false,

      tribute: { bank: 0, count: 0, missed: 0, due: TUNE.TRIBUTE.firstAt * 60 },
      unrest: 0,
      conscripted: 0,
      struck: 0,

      silt: 0,

      policyHuddle: false,
      predGrace: null,
      herdCull: 0,
      giftSeams: 0,

      chill: 0,
      woodSpent: {},
      herds: null,
      hunt: null,
      granaryPolicy: 'lean',
      holdAtCap: {},
      festival: null,
      chronicle: [],
      records: {},

      relics: [],
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

  startStock(granted, era) {
    const st = Object.assign({}, TUNE.START_STOCK);
    if (granted) return st;
    for (const k in st) st[k] = 0;
    if (rungOf(era != null ? era : START_ERA) === 1) {
      st.deadwood = TUNE.START_STOCK.deadwood;
      st.pemmican = TUNE.START_STOCK.pemmican;
    }
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

      magazine: new Uint8Array(n),
      midden: new Uint8Array(n),

      elev: new Int8Array(n),
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

  housedResidents(s) {
    let n = 0;
    for (const b of s.buildings) if (b.residents) n += b.residents;
    return n;
  },

  crewSize(s) {
    if (s && rungOf(s.era) === 0) return 0;
    return (TUNE.FOUNDING_CREW | 0) + 4 * ((s && s.giftCrew) | 0);
  },

  totalResidents(s) {
    return Game.housedResidents(s) + Game.crewSize(s);
  },

  totalCapacity(s) {
    let n = 0;
    for (const b of s.buildings) if (DEF(b.type).cap) n += (b.cap != null ? b.cap : DEF(b.type).cap);
    return n;
  },

  serialize(s) {
    return JSON.stringify({
      version: s.version, seed: s.seed, tick: s.tick, money: s.money,
      era: s.era, hallLevel: s.hallLevel, realRent: s.realRent, eraBase: s.eraBase,

      rungs: 1,

      world: TUNE.WORLD,
      stock: s.stock, cum: s.cum, hunger: s.hunger, prompted: s.prompted,
      era1Call: s.era1Call | 0,
      founded: !!s.founded,
      terraEdits: s.terraEdits, cleared: s.cleared, planted: s.planted,
      elevEdits: s.elevEdits,
      soilEdits: s.soilEdits, rockSpent: s.rockSpent,
      lastSeenMs: Date.now(), cp: s.cp, cpFrac: s.cpFrac, hallJob: s.hallJob, subTier: s.subTier,
      settlerAcc: s.settlerAcc || 0,
      literate: s.literate ? 1 : 0,
      foundingLeft: +s.foundingLeft || 0,

      cityName: s.cityName || '',
      policyFeedFirst: s.policyFeedFirst !== false,
      policyRationLaw: !!s.policyRationLaw,
      policyBeerRation: !!s.policyBeerRation,
      policyCorvee: !!s.policyCorvee,
      granaryPolicy: s.granaryPolicy || 'lean',
      holdAtCap: s.holdAtCap || {},
      festival: s.festival || null,
      chronicle: s.chronicle || [],
      records: s.records || {},

      freeRank: s.freeRank ? 1 : 0,
      pendingGift: s.pendingGift ? 1 : 0,

      giftHousing: s.giftHousing | 0,
      giftStore: s.giftStore | 0,
      giftRank: s.giftRank | 0,
      giftCrew: s.giftCrew | 0,
      giftLand: s.giftLand | 0,
      giftDrain: s.giftDrain | 0,

      giftIssue: s.giftIssue | 0,
      giftTerra: s.giftTerra | 0,

      tribute: s.tribute ? { bank: +s.tribute.bank || 0, count: s.tribute.count | 0,
                             missed: s.tribute.missed | 0,
                             due: Math.round(+s.tribute.due || 0) } : null,
      unrest: +s.unrest || 0,
      conscripted: s.conscripted | 0,
      struck: s.struck ? 1 : 0,
      policyDoubleShift: !!s.policyDoubleShift,

      nile: s.nile ? { phase: s.nile.phase | 0, left: Math.round(s.nile.left) } : null,

      season: s.season ? { phase: s.season.phase | 0, left: Math.round(s.season.left) } : null,
      policyRation: !!s.policyRation,
      policySweep: !!s.policySweep,
      policyWideIssue: !!s.policyWideIssue,
      policyRevet: !!s.policyRevet,

      chill: +s.chill || 0,

      silt: +s.silt || 0,
      woodSpent: s.woodSpent || {},
      herds: s.herds || null,

      relics: (s.relics || []).map(r => ({ type: r.type, era: r.era | 0, name: r.name || '' })),
      nextId: s.nextId, placeCounter: s.placeCounter, owned: s.owned, firsts: s.firsts,
      buildings: s.buildings.map(b => ({
        id: b.id, type: b.type, x: b.x, y: b.y, placed: b.placed,
        rot: (b.rot | 0) & 3,
        residents: b.residents || 0,
        level: b.level || 0,
        bought: b.bought || 0,
        evolve: b.evolve || 0,
        job: b.job || null,
        done: b.done !== false,

        mothballed: !!b.mothballed,
        rankPrice: b.rankPrice || 0,
        beerWages: !!b.beerWages,
        beerWageCredit: b.beerWageCredit || 0,
        name: b.name || undefined,

        resting: !!b.resting,

        autoHunt: b.autoHunt === false ? false : undefined,

        hunt: b.hunt || undefined,
        huntRest: b.huntRest > 0 ? Math.round(b.huntRest) : undefined,

        halted: !!b.halted,

        rank: b.rank || 1,

        delivered: DEF(b.type).monument ? (b.delivered || {}) : undefined,
        complete: DEF(b.type).monument ? !!b.complete : undefined,

        relic: b.relic ? 1 : undefined,
        relicEra: b.relic ? (b.relicEra | 0) : undefined,
      })),
    });
  },

  SNAPS: [
    { key: 'epoch_snap_a', ms: 3 * 60 * 1000 },
    { key: 'epoch_snap_b', ms: 20 * 60 * 1000 },
    { key: 'epoch_snap_c', ms: 3 * 60 * 60 * 1000 },
  ],

  snapshot() {
    if (typeof Main !== 'undefined' && Main.saveBlocked) return;
    let cur = null;
    try { cur = localStorage.getItem(SAVE_KEY); } catch (e) { return; }
    if (!cur || cur.length < 40) return;
    const now = Date.now();
    for (let i = 0; i < Game.SNAPS.length; i++) {
      const slot = Game.SNAPS[i];
      let stampedAt = 0;
      try { stampedAt = +localStorage.getItem(slot.key + '_t') || 0; } catch (e) {}

      if (!stampedAt && i > 0) {
        try { localStorage.setItem(slot.key + '_t', String(now)); } catch (e) {}
        continue;
      }
      if (now - stampedAt < slot.ms) continue;
      try {
        localStorage.setItem(slot.key, cur);
        localStorage.setItem(slot.key + '_t', String(now));
      } catch (e) {

        try { localStorage.removeItem(Game.SNAPS[Game.SNAPS.length - 1].key); } catch (e2) {}
        return;
      }
      break;
    }
  },

  snapshotList() {
    const out = [];
    const add = (key, label, t) => {
      let v = null;
      try { v = localStorage.getItem(key); } catch (e) {}
      if (!v) return;
      let info = { key, label, bytes: v.length, at: t || 0, era: null, buildings: null, money: null };
      try {
        const d = JSON.parse(v);
        info.era = d.era; info.buildings = (d.buildings || []).length;
        info.money = Math.round(d.money || 0);
        info.pop = (d.buildings || []).reduce((a, b) => a + (b.residents || 0), 0);
        info.name = d.cityName || '';
      } catch (e) { info.corrupt = true; }
      out.push(info);
    };
    for (const slot of Game.SNAPS) {
      let t = 0; try { t = +localStorage.getItem(slot.key + '_t') || 0; } catch (e) {}
      add(slot.key, 'auto-backup', t);
    }
    add(ARCHIVE_KEY, 'archived city (era call)', 0);

    try {
      for (const k of Object.keys(localStorage))
        if (k.indexOf('epoch_rescue_') === 0) add(k, 'RESCUED — a save that would not load', +k.slice(13) || 0);
    } catch (e) {}
    return out.sort((a, b) => b.at - a.at);
  },

  restoreSnapshot(key) {
    let v = null;
    try { v = localStorage.getItem(key); } catch (e) {}
    if (!v) return false;
    try { JSON.parse(v); } catch (e) { return false; }
    try {
      const cur = localStorage.getItem(SAVE_KEY);
      if (cur) {
        localStorage.setItem('epoch_snap_prerestore', cur);
        localStorage.setItem('epoch_snap_prerestore_t', String(Date.now()));
      }
      localStorage.setItem(SAVE_KEY, v);
    } catch (e) { return false; }
    if (typeof Main !== 'undefined') Main.saveBlocked = false;
    return true;
  },

  save() {

    if (typeof Main !== 'undefined' && Main.saveBlocked) return false;

    Game.snapshot();
    try { localStorage.setItem(SAVE_KEY, Game.serialize(G.s)); return true; }
    catch (e) { return false; }
  },

  exportSave() {
    let blob = null;
    try { blob = Game.serialize(G.s); } catch (e) { return false; }
    const s = G.s;
    const name = (s.cityName || 'epoch-city').replace(/[^a-z0-9\-_]+/gi, '-').toLowerCase();
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    const stamp = d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes());
    const file = name + '_era' + s.era + '_' + stamp + '.json';
    try {
      const url = URL.createObjectURL(new Blob([blob], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url; a.download = file;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      return file;
    } catch (e) { return false; }
  },

  importSave(text) {
    let d = null;
    try { d = JSON.parse(text); } catch (e) { return 'that file is not a saved city'; }
    if (!d || d.version !== 1 || !Array.isArray(d.buildings)) return 'that file is not an EPOCH save';
    if (!d.buildings.some(b => b.type === 'townhall')) return 'that save has no Town Hall — it would not load';
    try {
      const cur = localStorage.getItem(SAVE_KEY);
      if (cur) {
        localStorage.setItem('epoch_snap_preimport', cur);
        localStorage.setItem('epoch_snap_preimport_t', String(Date.now()));
      }
      localStorage.setItem(SAVE_KEY, text);
    } catch (e) { return 'this browser refused to store it (out of space?)'; }
    if (typeof Main !== 'undefined') Main.saveBlocked = false;
    return null;
  },

  rawSave() {
    try {
      const cur = localStorage.getItem(SAVE_KEY);
      if (cur) return cur;
      for (const k of LEGACY_KEYS) {
        const old = localStorage.getItem(k);
        if (old) { Game.migratedFrom = k; return old; }
      }
    } catch (e) {}
    return null;
  },

  reworld(d) {
    const to = TUNE.WORLD;
    let from = +d.world || 0;
    if (!from) {

      let max = 0;
      for (const b of d.buildings) max = Math.max(max, b.x | 0, b.y | 0);
      if (Array.isArray(d.owned)) {
        for (const k of d.owned) {
          const p = String(k).split(',').map(Number);
          max = Math.max(max, (p[0] + 1) * TUNE.CHUNK - 1, (p[1] + 1) * TUNE.CHUNK - 1);
        }
      }
      from = max >= to ? 512 : to;
    }
    if (from === to) return null;
    const dt = (from - to) / 2;
    const dp = dt / TUNE.CHUNK;
    const inB = (x, y) => x >= 0 && y >= 0 && x < to && y < to;
    const rep = { from, to, shifted: dt, droppedBuildings: 0, droppedParcels: 0, droppedTiles: 0, keptBuildings: 0 };

    d.buildings = d.buildings.filter(b => {
      const x = b.x - dt, y = b.y - dt;
      const w = DEF(b.type) ? DEF(b.type).w || 1 : 1, h = DEF(b.type) ? DEF(b.type).h || 1 : 1;

      if (!inB(x, y) || !inB(x + w - 1, y + h - 1)) { rep.droppedBuildings++; return false; }
      b.x = x; b.y = y; rep.keptBuildings++; return true;
    });

    if (Array.isArray(d.owned)) {
      const side = to / TUNE.CHUNK;
      d.owned = d.owned.filter(k => {
        const p = String(k).split(',').map(Number);
        const cx = p[0] - dp, cy = p[1] - dp;
        if (cx < 0 || cy < 0 || cx >= side || cy >= side) { rep.droppedParcels++; return false; }
        return true;
      }).map(k => {
        const p = String(k).split(',').map(Number);
        return (p[0] - dp) + ',' + (p[1] - dp);
      });
    }

    for (const field of ['cleared', 'planted', 'terraEdits', 'elevEdits', 'soilEdits']) {
      const src = d[field];
      if (!src || typeof src !== 'object' || Array.isArray(src)) continue;
      const out = {};
      for (const k in src) {
        const n = +k;
        if (!isFinite(n)) continue;
        const x = (n % from) - dt, y = Math.floor(n / from) - dt;
        if (!inB(x, y)) { rep.droppedTiles++; continue; }
        out[y * to + x] = src[k];
      }
      d[field] = out;
    }

    Game.reworldReport = rep;
    return rep;
  },

  load() {
    const raw = Game.rawSave();
    if (!raw) return false;
    let d;
    try { d = JSON.parse(raw); } catch (e) { return false; }
    if (!d || d.version !== 1 || !Array.isArray(d.buildings)) return false;
    if (!d.buildings.some(b => b.type === 'townhall')) return false;

    Game.reworldReport = null;
    Game.reworld(d);
    if (!d.buildings.some(b => b.type === 'townhall')) return false;

    if (!d.rungs) {
      d.era = MIGRATE_RUNG[d.era | 0] || d.era | 0 || START_ERA;
      d.hallLevel = MIGRATE_RUNG[d.hallLevel | 0] || d.hallLevel | 0 || 1;
      if (Array.isArray(d.relics)) {
        for (const r of d.relics) if (r) r.era = MIGRATE_RUNG[r.era | 0] || r.era | 0;
      }
      d.prompted = {};
      d.rungs = 1;
    }

    const s = {
      version: 1, seed: d.seed >>> 0, tick: d.tick | 0, money: +d.money || 0,
      era: Util.clamp(d.era | 0 || 1, 1, MAX_ERA),
      hallLevel: Util.clamp(d.hallLevel | 0 || 1, 1, MAX_ERA),
      realRent: +d.realRent || 0,

      eraBase: (d.eraBase && typeof d.eraBase === 'object')
        ? { flour: +d.eraBase.flour || 0,
            food: d.eraBase.food != null ? (+d.eraBase.food || 0) : (+d.eraBase.flour || 0),
            stone: +d.eraBase.stone || 0, tributePaid: +d.eraBase.tributePaid || 0 }
        : { flour: 0, food: 0, stone: 0 },

      stock: (() => {
        const st = {};
        for (const k in TUNE.PRICES) st[k] = +(d.stock && d.stock[k]) || 0;
        return st;
      })(),

      cum: { flour: +d.cum.flour || 0,
             food: d.cum.food != null ? (+d.cum.food || 0) : (+d.cum.flour || 0),
             stone: +d.cum.stone || 0, earned: +d.cum.earned || 0,
             tributePaid: +d.cum.tributePaid || 0 },
      hunger: +d.hunger || 0,
      nextId: d.nextId | 0 || 1, placeCounter: d.placeCounter | 0 || 0,
      owned: d.owned.slice(), firsts: d.firsts || {}, prompted: d.prompted || {},
      era1Call: d.era1Call | 0,
      founded: !!d.founded,
      terraEdits: d.terraEdits || {}, cleared: d.cleared || {}, planted: d.planted || {},

      elevEdits: d.elevEdits || {},
      soilEdits: d.soilEdits || {}, rockSpent: d.rockSpent || {},
      lastSeenMs: +d.lastSeenMs || Date.now(),
      subTier: SUB_TIERS[d.subTier] ? d.subTier : 'free',
      cp: +d.cp || 0, cpFrac: +d.cpFrac || 0,
      settlerAcc: +d.settlerAcc || 0,

      cityName: d.cityName || '',

      policyFeedFirst: true,
      policyRationLaw: true,
      policyBeerRation: !!d.policyBeerRation,
      policyCorvee: !!d.policyCorvee,
      granaryPolicy: TUNE.RESERVE_POLICY[d.granaryPolicy] ? d.granaryPolicy : 'lean',
      holdAtCap: d.holdAtCap || {},
      festival: d.festival && d.festival.left > 0 ? { left: Math.round(d.festival.left) } : null,
      chronicle: Array.isArray(d.chronicle) ? d.chronicle.slice(-200) : [],
      records: d.records || {},
      freeRank: d.freeRank ? 1 : 0,
      pendingGift: d.pendingGift ? 1 : 0,
      giftHousing: d.giftHousing | 0,
      giftStore: d.giftStore | 0,
      giftRank: d.giftRank | 0,
      giftCrew: d.giftCrew | 0,
      giftLand: d.giftLand | 0,

      giftDrain: d.giftDrain | 0,

      giftIssue: d.giftIssue | 0,
      giftTerra: d.giftTerra | 0,

      tribute: (d.tribute && typeof d.tribute === 'object')
        ? { bank: Math.max(0, +d.tribute.bank || 0), count: Math.max(0, d.tribute.count | 0),
            missed: Math.max(0, d.tribute.missed | 0),
            due: Math.max(0, Math.round(+d.tribute.due || 0)) }
        : null,
      unrest: Util.clamp(+d.unrest || 0, 0, 1),
      conscripted: d.conscripted | 0,
      struck: d.struck ? 1 : 0,
      policyDoubleShift: !!d.policyDoubleShift,
      nile: (d.nile && typeof d.nile === 'object')
        ? { phase: Util.clamp(d.nile.phase | 0, 0, 2), left: Math.max(1, d.nile.left | 0) }
        : null,

      season: (d.season && typeof d.season === 'object')
        ? { phase: Util.clamp(d.season.phase | 0, 0, 1), left: Math.max(1, d.season.left | 0) }
        : null,
      policyRation: !!d.policyRation,
      policySweep: !!d.policySweep,
      policyWideIssue: !!d.policyWideIssue,
      policyRevet: !!d.policyRevet,
      chill: Util.clamp(+d.chill || 0, 0, 1),

      silt: Util.clamp(+d.silt || 0, 0, 1),
      woodSpent: d.woodSpent || {},
      herds: Array.isArray(d.herds) ? d.herds.filter(h => h && h.kind && TUNE.HERDS.counts[h.kind] !== undefined)
        .map(h => ({ id: h.id | 0, kind: h.kind, x: +h.x || 0, y: +h.y || 0, heading: +h.heading || 0 })) : null,

      legacyHunt: (d.hunt && typeof d.hunt === 'object' && d.hunt.kind)
        ? { herdId: d.hunt.herdId | 0, kind: d.hunt.kind, party: d.hunt.party | 0,
            left: Math.max(1, d.hunt.left | 0), dist: d.hunt.dist | 0,
            odds: +d.hunt.odds || 0.5, cat: !!d.hunt.cat, seed: d.hunt.seed >>> 0 }
        : null,
      hunt: null,
      relics: Array.isArray(d.relics)
        ? d.relics.filter(r => r && BUILDINGS[r.type])
            .map(r => ({ type: r.type, era: r.era | 0, name: r.name || (DEF(r.type) || {}).name || '' }))
        : [],

      literate: TUNE.TALLY_FROM_START ? 1 : (d.literate === undefined ? 1 : (d.literate ? 1 : 0)),

      foundingLeft: d.foundingLeft === undefined ? 0 : Math.max(0, +d.foundingLeft || 0),
      hallJob: d.hallJob || null,
      buildings: d.buildings
        .filter(b => BUILDINGS[b.type])
        .map(b => ({
          id: b.id, type: b.type, x: b.x, y: b.y, placed: b.placed || 0,
          rot: (b.rot | 0) & 3,
          residents: b.residents || 0, staff: 0, lastStaffEff: 0, status: 'ok',

          level: b.level || (BUILDINGS[b.type] && BUILDINGS[b.type].cap ? 1 : 0),
          bought: b.bought || 0,
          evolve: +b.evolve || 0,
          job: b.job || null, done: b.done !== false,
          resting: !!b.resting,
          autoHunt: b.autoHunt === false ? false : undefined,
          hunt: b.hunt || null,
          huntRest: Math.max(0, +b.huntRest || 0),
          halted: !!b.halted,
          mothballed: !!b.mothballed,
          rankPrice: Math.max(0, Math.round(+b.rankPrice || 0)),
          beerWages: !!b.beerWages,
          beerWageCredit: +b.beerWageCredit || 0,
          name: typeof b.name === 'string' && b.name ? b.name.slice(0, 40) : undefined,

          rank: Util.clamp(Math.round(+b.rank || 1), 1, RANK.max + (d.giftRank | 0)),

          delivered: b.delivered || {},
          complete: BUILDINGS[b.type].monument ? (b.delivered === undefined ? true : !!b.complete) : false,

          relic: !!b.relic,
          relicEra: b.relicEra | 0 || undefined,
        })),
    };
    G.s = s;

    G.cache = Game.freshCache();
    Game.adoptLegacyHunt(s);

    Econ.topUpHerds(s);
    Grid.genTerrain(s);
    Grid.rebuild(s);
    if (window.Rend && Rend.invalidateTerrain) Rend.invalidateTerrain();
    return true;
  },

  adoptLegacyHunt(s) {
    const h = s.legacyHunt;
    s.legacyHunt = null;
    if (!h) return;
    const camps = s.buildings.filter(b => DEF(b.type) && DEF(b.type).huntBase);
    const host = camps.find(b => b.type === h.camp) || camps[0];
    if (host) {
      host.hunt = Object.assign({}, h, { campId: host.id });
    } else {

      const tmp = { hunt: Object.assign({}, h), id: 0, type: null };
      Econ.resolveHunt(s, tmp);
    }
  },

  archiveAndRestart() {
    let ok = false;
    try {
      const blob = Game.serialize(G.s);
      localStorage.setItem(ARCHIVE_KEY, blob);
      ok = localStorage.getItem(ARCHIVE_KEY) === blob;
    } catch (e) { ok = false; }
    if (!ok) return false;
    try {
      localStorage.removeItem(SAVE_KEY);
      for (const k of LEGACY_KEYS) localStorage.removeItem(k);
    } catch (e) {}
    Game.migratedFrom = null;
    Game.newGame();
    G.s.era1Call = ERA1_CALL;
    Game.save();
    return true;
  },

  hasArchive() {
    try { return !!localStorage.getItem(ARCHIVE_KEY); } catch (e) { return false; }
  },

  restoreArchive() {
    let blob = null;
    try { blob = localStorage.getItem(ARCHIVE_KEY); } catch (e) {}
    if (!blob) return false;
    try {
      localStorage.setItem(SAVE_KEY, blob);
      if (!Game.load()) return false;
      G.s.era1Call = ERA1_CALL;
      Game.save();
      localStorage.removeItem(ARCHIVE_KEY);
    } catch (e) { return false; }
    return true;
  },

  reset() {

    try {
      localStorage.removeItem(SAVE_KEY);
      for (const k of LEGACY_KEYS) localStorage.removeItem(k);
    } catch (e) {}
    Game.migratedFrom = null;
    Game.newGame();
  },
};
