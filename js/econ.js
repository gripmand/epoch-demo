'use strict';

const Econ = {

  M: TUNE.TICK_MIN * TUNE.TEMPO,

  realTime(s, nowMs) {
    const now = nowMs || Date.now();
    const dtMs = Math.max(0, now - (s.lastSeenMs || now));
    s.lastSeenMs = now;
    for (const b of s.buildings) {
      if (b.job || b.done === false) { b.job = null; b.done = true; G.cache.dirty = true; }
    }
    if (s.hallJob) { s.hallLevel = Math.max(s.hallLevel, s.hallJob.level); s.hallJob = null; }
    return dtMs;
  },

  offlineCapHours(s) {
    let stores = 0;
    for (const b of s.buildings)
    {
      const d = DEF(b.type);
      if (b.done !== false && b.conn && d && (d.storeGrain || d.storeFlour || b.type === 'stoneyard')) stores++;
    }
    return Math.min(TUNE.OFFLINE_CAP_MAX_H,
      subTier(s).offlineH + stores * TUNE.OFFLINE_CAP_PER_STORE);
  },

  catchUp(s) {
    const away = Math.max(0, Date.now() - (s.lastSeenMs || Date.now()));
    const capH = Econ.offlineCapHours(s);
    const capMs = capH * 3600000;
    const useMs = Math.min(away, capMs);
    const secs = Math.floor(useMs / 1000);
    if (secs < 30) return null;
    const KINDS = Object.keys(s.stock);
    const before = {
      money: s.money, flour: s.cum.flour, stone: s.cum.stone,
      rent: s.realRent, pop: Game.totalResidents(s),
      stock: Object.fromEntries(KINDS.map(k => [k, s.stock[k]])),
    };
    s.offline = true;

    const step = Math.max(1, Math.ceil(secs / 200000));
    let simulated = 0;
    for (let n = 0; n < secs; n += step) { Econ.tick(s, true); simulated += step; }
    s.offline = false;

    const goods = [];
    for (const k of KINDS) {
      const delta = s.stock[k] - before.stock[k];
      if (Math.abs(delta) < 0.5 && s.stock[k] < 0.5) continue;
      goods.push({ kind: k, delta: Math.round(delta), inStore: Math.round(s.stock[k]),
                   cap: Econ.capOf(s, k) });
    }

    const stalls = {};
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || b.type === 'road' || d.fixed) continue;
      const st = b.status;
      if (!st || st === 'ok' || st === 'understaffed') continue;
      const key = st + '|' + b.type;
      stalls[key] = (stalls[key] || 0) + 1;
    }
    return {
      hours: +(useMs / 3600000).toFixed(1),
      capHours: capH,
      cappedFrom: away > capMs ? +(away / 3600000).toFixed(1) : null,
      money: Math.round(s.money - before.money),
      perHour: Math.round((s.money - before.money) / Math.max(0.01, useMs / 3600000)),
      flourMade: Math.round(s.cum.flour - before.flour),
      flourEaten: Math.round((s.cum.flour - before.flour) - (s.stock.flour - before.stock.flour)),
      stone: Math.round(s.cum.stone - before.stone),
      rent: s.realRent - before.rent,
      popBefore: before.pop, popAfter: Game.totalResidents(s),
      hunger: s.hunger,
      goods,
      stalls: Object.entries(stalls).map(([k, n]) => {
        const [status, type] = k.split('|');
        return { status, type, name: DEF(type).name, n };
      }).sort((a, b) => b.n - a.n),
    };
  },

  tick(s, offline) {
    const C = G.cache;
    if (C.dirty) Grid.rebuild(s);

    Econ.stampPower(s);

    Econ.soilTick(s, offline);

    let income = 0, upkeep = 0, flourMade = 0, premium = 0;

    C.tallyTick = {};

    const byPlaced = s.buildings.slice()
      .filter(b => b.done !== false)
      .sort((a, b) => a.placed - b.placed);
    let pool = Game.totalResidents(s);
    C.workersTotal = pool;
    for (const b of byPlaced) {
      const d = DEF(b.type);
      b.staff = 0;
      if (!d.workers) continue;

      if (b.resting) {
        if (Grid.soilUnder(b) >= 0.999) {
          b.resting = false;
          if (!offline) UI.toast('\u{1F33E} ' + d.name + ' is back at full soil and has resumed cropping on its own.', 8000);
        } else { b.block = null; continue; }
      }
      b.block = Econ.blockOf(b);
      if (b.block) continue;
      b.staff = Math.min(d.workers, pool);
      pool -= b.staff;
    }
    C.workersUsed = C.workersTotal - pool;

    for (const b of byPlaced) {
      const d = DEF(b.type);

      b.supply = Econ.supplyMultiplier(s, b);

      if (d.sells) {
        const sv = Grid.customerSurvey(s, b);
        b.customers = sv.n;
        b.custDist = sv.meanDist;
        b.trade = Econ.tradeMultiplier(sv.meanDist);
      } else b.trade = 1;
      upkeep += d.upkeep * b.supply * b.trade * rankUpkeepMult(b) * Econ.M;
      premium += d.upkeep * (b.supply * b.trade - 1) * rankUpkeepMult(b) * Econ.M;
      if (b.type === 'townhall') {
        income += HALLS[s.hallLevel].trickle * Econ.M;

        if (s.foundingLeft > 0) {
          const draw = Math.min(s.foundingLeft, TUNE.FOUNDING.perMinute * Econ.M);
          s.foundingLeft -= draw;
          income += draw;
          if (s.foundingLeft <= 0 && !offline) {
            s.foundingLeft = 0;
            UI.toast('\u{1F33E} The Anunnaki ration is finished — the last of the founding grain is issued. ' +
              'Your city stands on its own economy now.', 11000);
          }
        }

        C.rentRP = Econ.rentPoints(s).rp;
        s.realRent += rentMonthly(s.era, s.hallLevel, s.subTier, C.rentRP) / 30 / 86400;
        b.status = 'ok';
      } else if (d.monument) {

        if (!b.complete) { b.rate = 0; continue; }
        b.block = Econ.blockOf(b);
        b.status = b.block || 'ok';
        if (b.status === 'ok') { income += d.trickle * Econ.M; b.rate = d.trickle; }
        else b.rate = 0;
      } else if (!d.workers && !d.cap) {

        b.status = (d.needsRoad && !b.conn) ? 'no_road'
          : (d.needsWater && !Grid.covered(C.water, b)) ? 'no_water' : 'ok';
      }
    }

    for (const b of byPlaced) {
      const d = DEF(b.type);
      if (!d.out || !d.workers) continue;

      if (b.resting) {
        b.soil = Grid.soilUnder(b);
        b.status = 'resting'; b.rate = 0; b.lastStaffEff = 0; continue;
      }
      if (b.block) { b.status = b.block; b.rate = 0; b.lastStaffEff = 0; continue; }
      const staffEff = b.staff / d.workers;
      b.lastStaffEff = staffEff;
      if (b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }

      let made = 0;
      if (d.out.grain) {

        b.soil = Grid.soilUnder(b);
        const soilMult = TUNE.SOIL.minYield + (1 - TUNE.SOIL.minYield) * b.soil;
        const mult = (1 + TUNE.FERTILE_BONUS * (b.fertile || 0)) *
                     (1 + (b.adjBoost ? TUNE.ADJ_BONUS : 0)) * soilMult * rankOutMult(b);
        made = d.out.grain * staffEff * mult * Econ.M;
        Econ.addStock(s, 'grain', made);
      } else if (d.out.clay || d.out.wool) {

        const kind = d.out.clay ? 'clay' : 'wool';
        const mult = (1 + (b.adjBoost ? TUNE.ADJ_BONUS : 0)) * rankOutMult(b);
        made = d.out[kind] * staffEff * mult * Econ.M;
        Econ.addStock(s, kind, made);
      } else if (d.out.stone) {

        const left = Econ.quarryStoneLeft(b);
        b.stoneLeft = left;
        const mult = (0.5 + 0.5 * (b.rockFrac || 0)) * (1 + (b.adjBoost ? TUNE.ADJ_BONUS : 0)) * rankOutMult(b);
        made = left > 0 ? d.out.stone * staffEff * mult * Econ.M : 0;
        if (made > 0) {
          Econ.spendQuarry(s, b, made);
          Econ.addStock(s, 'stone', made);
          s.cum.stone += made;
        }
      }
      b.rate = made;
      b.status = staffEff < 1 ? 'understaffed' : 'ok';
    }

    for (const b of byPlaced) {
      const d = DEF(b.type);
      if (!d.procIn || !d.workers) continue;
      if (b.block) { b.status = b.block; b.rate = 0; continue; }
      const staffEff = b.staff / d.workers;
      if (b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }
      const want = d.procRate * staffEff * (1 + (b.adjBoost ? TUNE.ADJ_BONUS : 0)) * rankOutMult(b) * Econ.M;
      const use = Math.min(want, s.stock[d.procIn]);
      s.stock[d.procIn] -= use;
      Econ.note(d.procIn, 0, use);
      const made = use * d.procRatio;
      Econ.addStock(s, d.procOut, made);
      if (d.procOut === 'flour') { flourMade += made; s.cum.flour += made; }
      b.rate = made;
      b.status = use <= 0.0001 ? 'no_input' : (staffEff < 1 ? 'understaffed' : 'ok');
    }

    for (const b of byPlaced) {
      if (b.type !== 'coal') continue;
      if (b.block) { b.status = b.block; continue; }
      b.status = b.staff === 0 ? 'no_staff' : (b.staff < DEF('coal').workers ? 'understaffed' : 'ok');
      b.lastStaffEff = b.staff / DEF('coal').workers;
    }

    const houses = byPlaced.filter(b => DEF(b.type).cap);
    for (const h of houses) {
      h.block = Econ.blockOf(h);
      if (h.cap == null) h.cap = DEF(h.type).cap;
    }
    const residents = Game.totalResidents(s);
    const demand = residents * TUNE.FLOUR_PER_RESIDENT * Econ.M;

    const eaten = offline ? Math.min(demand, s.stock.flour) : Math.min(demand, s.stock.flour);
    s.stock.flour -= eaten;
    Econ.note('flour', 0, eaten);
    const fed = (offline || demand <= 0) ? 1 : eaten / demand;

    const rise = 1 / (TUNE.STARVE_MINUTES * 60);
    if (fed < 0.99) s.hunger = Math.min(1, s.hunger + (1 - fed) * rise);
    else s.hunger = Math.max(0, s.hunger - TUNE.HUNGER_RECOVER);

    if (s.hunger >= 1 && s.tick % 10 === 0) Econ.removeResident(s, houses);
    if (s.tick % 6 === 0) {
      const blocked = houses.find(h => h.block && h.residents > 0);
      if (blocked) { blocked.residents--; Econ.floater(blocked, '-1'); }
    }

    if (s.tick % 10 === 0) {
      const over = houses.find(h => h.residents > h.cap);
      if (over) {
        const room = houses.find(h => h !== over && !h.block && h.residents < h.cap);
        over.residents--;
        if (room) room.residents++;
      }
    }

    C.flourRate = C.flourRate * 0.9 + flourMade * 0.1;
    Econ.migration(s, houses, offline);
    for (const h of houses) {
      h.status = h.block ? h.block : (s.hunger >= TUNE.HUNGER_WARN ? 'hungry' : 'ok');
    }
    Econ.evolveHousing(s, houses, offline);

    for (const b of byPlaced) {
      const d = DEF(b.type);
      if (!d.sells) continue;
      if (b.block) { b.status = b.block; b.rate = 0; continue; }
      if (b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }
      const staffEff = b.staff / d.workers;

      const cust = b.customers != null ? b.customers : Grid.customerSurvey(s, b).n;
      if (cust < d.custMin) { b.status = 'no_customers'; b.rate = 0; continue; }

      const keep = d.sells === 'flour'
        ? residents * TUNE.FLOUR_PER_RESIDENT * TUNE.FLOUR_RESERVE_MIN : 0;

      const scribeMult = b.scribed ? (1 + TUNE.SCRIBE.bonus) : 1;
      const sell = Math.min(d.sellRate * staffEff * scribeMult * rankOutMult(b) * Econ.M,
                            Math.max(0, s.stock[d.sells] - keep));
      s.stock[d.sells] -= sell;
      Econ.note(d.sells, 0, sell);
      const gain = sell * d.sellPrice;
      income += gain;
      b.rate = sell;
      b.status = sell <= 0.0001 ? 'no_input' : (staffEff < 1 ? 'understaffed' : 'ok');
      if (!offline && gain > 0 && s.tick % 60 === b.id % 60) Econ.floater(b, '+$' + Math.round(gain * 60));
    }

    s.money += income - upkeep;
    s.cum.earned += Math.max(0, income - upkeep);

    C.net = C.ratesDirty ? (income - upkeep) : C.net * 0.9 + (income - upkeep) * 0.1;

    if (!offline && s.money < 0) UI.firstToast('broke', 'Out of money. Upkeep still runs — demolish something (50% refund) or wait on Town Hall income.');

    Econ.buildMonuments(s, offline);

    Econ.checkLiteracy(s, offline);
    Econ.settleTally(s, income, upkeep, premium);

    const next = s.era + 1;
    if (!offline && next <= MAX_ERA && !s.prompted[next] && Econ.eraReady(s)) {
      s.prompted[next] = 1;
      UI.promptAdvance(next);
    }

    if (!offline) C.floaters = C.floaters.filter(f => (f.age += 1 / 60) < 1.6);
    s.tick++;
  },

  supplyDepots(s) {
    const C = G.cache;
    if (C.depots) return C.depots;
    const list = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (d.sells && b.done !== false) list.push(b);
    }

    if (!list.length) {
      const hall = s.buildings.find(b => b.type === 'townhall');
      if (hall) list.push(hall);
    }
    return (C.depots = list);
  },

  supplyMultiplier(s, b) {
    const SP = TUNE.SUPPLY;
    const depots = Econ.supplyDepots(s);
    if (!depots.length) return 1;
    const d = DEF(b.type);
    const cx = b.x + d.w / 2, cy = b.y + d.h / 2;
    let best = Infinity;
    for (const m of depots) {
      const md = DEF(m.type);
      const dist = Math.hypot(cx - (m.x + md.w / 2), cy - (m.y + md.h / 2));
      if (dist < best) best = dist;
    }
    b.supplyDist = best;
    if (best <= SP.freeRadius) return 1;
    return Math.min(SP.maxMultiplier, 1 + (best - SP.freeRadius) / SP.premiumPer);
  },

  tradeMultiplier(dist) {
    const T = TUNE.TRADE;
    if (!T || dist <= T.freeRadius) return 1;
    return Math.min(T.maxMultiplier, 1 + (dist - T.freeRadius) / T.premiumPer);
  },

  soilTick(s, offline) {

    if (offline) return;
    const S = TUNE.SOIL;
    const drain = 1 / (S.saltMinutes * 60);
    const heal = 1 / (S.fallowMinutes * 60);
    const cropped = new Set();
    let changedChunks = null;

    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d.out || !d.out.grain || b.done === false) continue;
      if (b.block || !b.staff) continue;

      if (Grid.soilUnder(b) <= S.autoRestAt) {
        b.resting = true;
        b.staff = 0; b.rate = 0; b.status = 'resting';
        if (!offline) UI.toast('\u{1F4A4} ' + d.name + ' has worked its ground out and stopped itself. ' +
          'It will recover and resume on its own - click it to override.', 10000);
        continue;
      }
      Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
        if (!Grid.inB(tx, ty)) return;
        cropped.add(Grid.key(tx, ty));
        const v = Grid.soilAt(tx, ty) - drain * b.lastStaffEff;
        if (Grid.setSoil(s, tx, ty, v)) {
          (changedChunks = changedChunks || new Set()).add(Grid.chunkKeyOf(tx, ty));
        }
      });
    }

    const W = TUNE.WORLD;
    for (const k in s.soilEdits) {
      if (cropped.has(+k)) continue;
      const x = k % W, y = (k / W) | 0;
      let rate = heal;
      if (Econ.nearChannel(x, y, S.waterLeach)) rate *= S.waterBonus;
      if (G.cache.midden[k]) rate *= S.middenBonus;
      if (Grid.setSoil(s, x, y, s.soilEdits[k] + rate)) {
        (changedChunks = changedChunks || new Set()).add(Grid.chunkKeyOf(x, y));
      }
    }

    if (changedChunks && window.Rend && Rend.markSoilDirty) Rend.markSoilDirty(changedChunks);
  },

  nearChannel(x, y, r) {
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++) {
        const nx = x + dx, ny = y + dy;
        if (Grid.inB(nx, ny) && G.cache.terrain[Grid.key(nx, ny)] === TERRAIN.WATER) return true;
      }
    return false;
  },

  stampMidden(s) {
    const C = G.cache;
    C.midden.fill(0);
    for (const b of s.buildings) {
      const d = DEF(b.type);

      if (d.soilRadius && b.done !== false) Grid.stampRadius(C.midden, b, d.soilRadius + rankRadiusBonus(b));
    }
  },

  quarryStoneLeft(b) {
    let left = 0;
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
      if (Grid.inB(tx, ty) && G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.ROCK)
        left += Grid.stoneAt(tx, ty);
    });
    return left;
  },

  spendQuarry(s, b, amt) {
    const tiles = [];
    Grid.footTiles(b.type, b.x, b.y, (tx, ty) => {
      if (Grid.inB(tx, ty) && G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.ROCK &&
          Grid.stoneAt(tx, ty) > 0) tiles.push([tx, ty]);
    });
    if (!tiles.length) return;
    const each = amt / tiles.length;
    let exhausted = false;
    for (const [tx, ty] of tiles) if (Grid.spendStone(s, tx, ty, each)) exhausted = true;
    if (exhausted) {
      G.cache.dirty = true;
      if (window.Rend && Rend.invalidateTerrain) Rend.invalidateTerrain();
      UI.firstToast('quarryout', 'That outcrop is worked out. Stone does not grow back — to keep quarrying you must buy land that has more rock.');
    }
  },

  migration(s, houses, offline) {
    const C = G.cache;
    const M = TUNE.MIGRATION;
    let open = 0, blocked = 0;
    for (const h of houses) {
      if (h.block) { blocked++; continue; }
      open += Math.max(0, (h.cap || 0) - (h.residents || 0));
    }
    C.openHousing = open;

    let why = 'ok';
    if (!houses.length) why = 'nohouse';
    else if (s.hunger >= M.hungerStop) why = 'hungry';
    else if (blocked === houses.length) why = 'blocked';
    else if (open <= 0) why = 'full';
    C.migrateWhy = why;

    if (why !== 'ok') {
      C.migrateRate = 0;

      s.settlerAcc = Math.min(s.settlerAcc || 0, 0.6);
      if (!offline && why === 'full' && s.tick > 30)
        UI.firstToast('housingfull', 'Every house is full. Build more housing — residents are what staff your buildings.');
      if (!offline && why === 'blocked')
        UI.firstToast('housingblocked', 'Your housing has no road or no water, so nobody will move in. Check the red markers.');
      return;
    }

    const rate = M.perMinute * Math.min(1, M.floor + open / M.openFull);
    C.migrateRate = rate;
    s.settlerAcc = (s.settlerAcc || 0) + rate * Econ.M;
    if (s.settlerAcc < 1) return;

    const beds = houses.filter(h => !h.block && h.residents < h.cap)
      .sort((a, b) => (b.level || 1) - (a.level || 1) || a.placed - b.placed);
    let i = 0, guard = 0;
    while (s.settlerAcc >= 1 && guard++ < 200) {
      while (i < beds.length && beds[i].residents >= beds[i].cap) i++;
      if (i >= beds.length) { s.settlerAcc = 0; break; }
      beds[i].residents++;
      s.settlerAcc -= 1;
      if (!offline) {
        Econ.floater(beds[i], '+1');
        UI.firstToast('movein', 'A settler moved in. Residents staff your buildings — and eat your flour, so grow the food before you grow the town.');
      }
    }
  },

  EVOLVE_TICKS: 40,
  NEIGHBOURS_FOR_RUNG2: 2,

  houseWant(s, h) {
    const floor = h.bought || 1;
    if (h.block) return floor;
    if (s.hunger > 0.35) return floor;
    const earned = (h.nearHomes || 0) >= Econ.NEIGHBOURS_FOR_RUNG2 ? 2 : 1;
    return Math.max(floor, earned);
  },

  houseUpgrade(s, h) {
    const lvl = h.level || 1;
    if (lvl >= HOUSE_MAX_LEVEL) return null;
    if (lvl === 1 && (h.nearHomes || 0) < Econ.NEIGHBOURS_FOR_RUNG2) {

      return { blocked: 'neighbours', need: Econ.NEIGHBOURS_FOR_RUNG2, have: h.nearHomes || 0 };
    }
    return { level: lvl + 1, cost: houseUpgradeCost(s.era, lvl), name: houseLevelName(s.era, lvl + 1) };
  },

  buyHouseUpgrade(s, h) {
    const up = Econ.houseUpgrade(s, h);
    if (!up || up.blocked || s.money < up.cost) return false;
    s.money -= up.cost;
    h.level = up.level;
    h.bought = up.level;
    h.evolve = 0;
    G.cache.dirty = true;
    Econ.floater(h, '▲ ' + up.name);
    return true;
  },

  evolveHousing(s, houses, offline) {
    const rate = 1 / Econ.EVOLVE_TICKS;
    for (const h of houses) {
      if (!h.level) h.level = 1;
      const want = Econ.houseWant(s, h);
      if (want > h.level) {
        h.evolve = (h.evolve || 0) + rate;
        if (h.evolve >= 1) {
          h.level++; h.evolve = 0;
          G.cache.dirty = true;
          if (!offline) {
            Econ.floater(h, '▲ ' + houseLevelName(s.era, h.level));
            UI.firstToast('evolve', 'Standing among neighbours, a hut has become a Mudbrick House. Build homes close together and they improve on their own — anything grander than this you buy, from the house\'s own panel.');
          }
        }
      } else if (want < h.level) {

        h.evolve = (h.evolve || 0) - rate * 1.4;
        if (h.evolve <= -1) {
          h.level--; h.evolve = 0;
          G.cache.dirty = true;
          if (!offline) Econ.floater(h, '▼');
        }
      } else {
        h.evolve = (h.evolve || 0) * 0.92;
      }
    }
  },

  monumentProgress(s, b) {
    const d = DEF(b.type);
    if (!d || !d.monument) return null;
    const need = monumentBuild(b.type, d.era || 1);
    const got = b.delivered || {};
    const parts = [];
    let sum = 0, n = 0;
    for (const k in need) {
      const have = Math.min(need[k], got[k] || 0);
      parts.push({ kind: k, have: Math.round(have), need: need[k], frac: have / need[k] });
      sum += have / need[k]; n++;
    }
    return { parts, frac: n ? sum / n : 1, done: parts.every(p => p.have >= p.need) };
  },

  monumentStage(s, b) {
    const p = Econ.monumentProgress(s, b);
    if (!p) return 3;
    return Math.min(3, Math.floor(p.frac * 3.999));
  },

  buildMonuments(s, offline) {
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.monument) continue;
      if (b.complete) continue;
      const need = monumentBuild(b.type, d.era || 1);
      b.delivered = b.delivered || {};

      b.block = Econ.blockOf(b);
      if (b.block) { b.status = b.block; continue; }

      if (b.halted) { b.status = 'halted'; continue; }

      let moved = false;
      for (const k in need) {
        const want = need[k] - (b.delivered[k] || 0);
        if (want <= 0) continue;
        const rate = (MONUMENT_RATE[k] || 6) * Econ.M;
        const take = Math.min(want, rate, k === 'money' ? Math.max(0, s.money) : s.stock[k] || 0);
        if (take <= 0) continue;
        if (k === 'money') s.money -= take; else { s.stock[k] -= take; Econ.note(k, 0, take); }
        b.delivered[k] = (b.delivered[k] || 0) + take;
        moved = true;
      }

      const p = Econ.monumentProgress(s, b);
      b.buildFrac = p.frac;
      b.status = p.done ? 'ok' : (moved ? 'building' : 'no_input');
      const stage = Econ.monumentStage(s, b);
      if (stage !== b.stage) { b.stage = stage; if (window.Rend) Rend.onWorldChange(); }
      if (p.done && !b.complete) {
        b.complete = true;
        if (!offline) {
          UI.toast('\u{1F3DB}️ THE ' + d.name.toUpperCase() + ' IS FINISHED. It begins earning at once — ' +
            'and it is the single largest contributor to your real rent in this age.', 12000);
        }
      }
    }
  },

  eraReady(s) {
    const next = s.era + 1;
    if (next > MAX_ERA) return false;
    const r = eraReq(next);
    return Game.totalResidents(s) >= r.pop && s.money >= r.money &&
           s.cum.flour >= r.food && s.cum.stone >= r.stone;
  },

  grantEraLand(s) {

    const own = new Set(s.owned);
    const ring = new Set();
    for (const k of own) {
      const [cx, cy] = k.split(',').map(Number);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nk = (cx + dx) + ',' + (cy + dy);
        if (!own.has(nk)) ring.add(nk);
      }
    }
    const per = TUNE.CHUNK;
    const max = Math.floor(TUNE.WORLD / per);
    let granted = 0;
    for (const k of ring) {
      const [cx, cy] = k.split(',').map(Number);
      if (cx < 0 || cy < 0 || cx >= max || cy >= max) continue;
      s.owned.push(k);
      G.cache.ownedSet.add(k);
      granted++;
    }
    return { parcels: granted, tiles: granted * per * per };
  },

  eraUnlocks(era) {
    const out = { buildings: [], upgrades: [], monument: null };
    for (const k in BUILDINGS) {
      const d = BUILDINGS[k];
      if ((d.era || 1) !== era || d.noBuild || d.fixed) continue;
      if (d.monument) out.monument = d;
      else out.buildings.push(d);
    }
    for (const k in UPGRADES) {
      const u = UPGRADES[k];
      if ((u.era || 1) === era) out.upgrades.push(u);
    }
    return out;
  },

  advanceEra(s) {
    if (!Econ.eraReady(s)) return false;
    s.era++;
    const era = ERAS[s.era - 1];
    const land = Econ.grantEraLand(s);
    Grid.rebuild(s);
    UI.refreshPalette();

    if (window.Rend) { Rend.layerDirty = true; Rend.onWorldChange(); }

    UI.eraCeremony(s.era, land);
    return true;
  },

  blockOf(b) {
    if (window.Dev && Dev.flags.noBlockers) return null;
    const d = DEF(b.type);

    if (d.needsRoad && !b.conn) return 'no_road';
    if (d.needsWater && !Grid.covered(G.cache.water, b)) return 'no_water';
    if (d.needsPower && !Grid.covered(G.cache.power, b)) return 'no_power';
    return null;
  },

  stampPower(s) {
    const C = G.cache;
    C.power.fill(0);
    if (s.era < 9) return;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (d.powerRadius && b.conn && b.lastStaffEff > 0)
        Grid.stampRadius(C.power, b, d.powerRadius);
    }
  },

  BASE_CAP: { grain: 'GRAIN_CAP', flour: 'FLOUR_CAP', stone: 'STONE_CAP', blocks: 'BLOCKS_CAP',
              clay: 'CLAY_CAP', pottery: 'POTTERY_CAP', wool: 'WOOL_CAP',
              cloth: 'CLOTH_CAP', beer: 'BEER_CAP' },

  capOf(s, kind) {
    const m = subTier(s).storageMult;
    const base = TUNE[Econ.BASE_CAP[kind]] || 30;
    if (kind === 'grain' || kind === 'flour') {
      const key = kind === 'grain' ? 'storeGrain' : 'storeFlour';
      let extra = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d[key] || b.done === false || !b.conn) continue;
        if (d.needsWater && !Grid.covered(G.cache.water, b)) continue;
        extra += d[key];
      }
      return Math.round(m * (base + extra));
    }
    return Math.round(m * base);
  },

  addStock(s, kind, amt) {
    const cap = Econ.capOf(s, kind);
    const space = cap - s.stock[kind];
    const stored = Math.min(amt, Math.max(0, space));
    s.stock[kind] += stored;
    const overflow = amt - stored;
    if (overflow > 0) s.money += overflow * TUNE.PRICES[kind] * TUNE.EXPORT_MULT;

    Econ.note(kind, amt, 0, overflow);
  },

  note(kind, made, used, exported) {
    const T = G.cache.tallyTick;
    if (!T) return;
    const r = T[kind] || (T[kind] = { made: 0, used: 0, exported: 0 });
    if (made) r.made += made;
    if (used) r.used += used;
    if (exported) r.exported += exported;
  },

  settleTally(s, income, upkeep, premium) {
    const C = G.cache;
    const T = C.tallyTick;

    const a = C.ratesDirty ? 1 : 0.05;
    C.ratesDirty = false;

    const perMin = 60;
    for (const k in T) {
      const t = T[k];
      const r = C.tally[k] || (C.tally[k] = { made: 0, used: 0, exported: 0 });
      r.made += (t.made * perMin - r.made) * a;
      r.used += (t.used * perMin - r.used) * a;
      r.exported += (t.exported * perMin - r.exported) * a;
    }

    for (const k in C.tally) {
      if (T[k]) continue;
      const r = C.tally[k];
      r.made *= 1 - a; r.used *= 1 - a; r.exported *= 1 - a;
    }
    C.incomeRate += (income * perMin - C.incomeRate) * a;
    C.upkeepRate += (upkeep * perMin - C.upkeepRate) * a;
    C.premiumRate += (premium * perMin - C.premiumRate) * a;
  },

  checkLiteracy(s, offline) {
    if (s.literate) return;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.keepsTally) continue;
      if (b.done === false) continue;
      if (Econ.blockOf(b)) continue;
      s.literate = 1;
      if (!offline) {
        UI.toast('\u{1F4DC} The scribes have begun the tally. Writing was invented here to count grain — ' +
          'and now you can see your own numbers. Press T for what the city actually produces.', 12000);
      }
      return;
    }
  },

  rentContribution(s, b) {
    const d = DEF(b.type);
    if (!d || b.type === 'road') return null;
    if (d.fixed) return RP.hallPerChapter * (s.hallLevel || 1);

    if (d.monument && !b.complete) return null;
    const ok = !b.status || b.status === 'ok' || b.status === 'understaffed';
    if (!ok) return null;
    return d.monument ? monumentRP(d.era || 1) : buildingRP(d.era || 1, d) * rankOutMult(b);
  },

  rentPoints(s) {
    let rp = RP.hallPerChapter * (s.hallLevel || 1);
    let monuments = 0, working = 0, idle = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || b.type === 'road') continue;
      if (d.fixed) continue;
      const c = Econ.rentContribution(s, b);
      if (c === null) { idle++; continue; }
      rp += c;
      if (d.monument) monuments++; else working++;
    }
    return { rp, monuments, working, idle };
  },
  rentInfo(s) {
    const p = Econ.rentPoints(s);
    return {
      ...p,
      achievement: rentAchievement(p.rp, s.era),
      monthly: rentMonthly(s.era, s.hallLevel, s.subTier, p.rp),
      ceiling: RENT_MONTHLY[Util.clamp(s.era, 1, MAX_ERA)],
    };
  },

  buildersBusy() { return 0; },
  buildersFree() { return Infinity; },
  jobProgress() { return 1; },

  hallNext(s) {
    const lvl = s.hallLevel + 1;
    if (lvl > MAX_ERA) return null;
    if (s.hallLevel >= s.era) return { locked: 'era' };
    return { level: lvl, money: HALLS[lvl].cost, trickle: HALLS[lvl].trickle };
  },
  startHall(s) {
    const n = Econ.hallNext(s);
    if (!n || n.locked) return false;
    if (s.money < n.money) return false;
    s.money -= n.money;
    s.hallLevel = n.level;
    return true;
  },

  removeResident(s, houses) {
    const occupied = houses.filter(h => h.residents > 0);
    if (!occupied.length) return;
    const h = occupied[Math.floor(Math.random() * occupied.length)];
    h.residents--;
    Econ.floater(h, '-1');
    UI.firstToast('starve', 'Residents are leaving. The city has been hungry for ' + TUNE.STARVE_MINUTES +
      ' minutes — build a Farm, and a Mill to grind its grain into flour.');
  },

  floater(b, txt) {
    const d = DEF(b.type);
    G.cache.floaters.push({ x: b.x + d.w / 2, y: b.y, txt, age: 0 });
    if (G.cache.floaters.length > 40) G.cache.floaters.shift();
  },
};
