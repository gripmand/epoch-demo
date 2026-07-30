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

      if (b.done !== false && !(d && d.needsRoad && !b.conn) && d &&
          (d.storeGrain || d.storeFlour || d.storeCraft || b.type === 'stoneyard')) stores++;
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
    const baseM = Econ.M;
    Econ.M = baseM * step;
    for (let n = 0; n < secs; n += step) Econ.tick(s, true);
    Econ.M = baseM;
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

    Econ.stampWarmth(s, offline);

    Econ.herdTick(s, offline);

    Econ.seasonTick(s, offline);

    Econ.stampWater(s);

    Econ.nileTick(s, offline);

    Econ.soilTick(s, offline);

    let income = 0, upkeep = 0, flourMade = 0, premium = 0;

    C.tallyTick = {};

    C.tickExport = 0; C.tickDole = 0; C.tickDues = 0; C.monBoost = 0; C.tickMonBonus = 0;
    C.grainDraw = { mill: 0, brewery: 0, oxen: 0, dole: 0 };

    const byPlaced = s.buildings.slice()
      .filter(b => b.done !== false)
      .sort((a, b) => a.placed - b.placed);

    if (s.hunger >= TUNE.HUNGER_WARN) {
      const foodFirst = b => {
        const d = DEF(b.type);
        return (d.out && (d.out.grain || d.out.dates || d.out.fish || d.out.game)) ||
          d.procOut === 'flour' || d.sells === 'flour' ||
          d.procOut === 'pemmican' || d.sells === 'pemmican' ||
          b.type === 'breadoven' || b.type === 'templeGranary' ? 0 : 1;
      };
      byPlaced.sort((a, b) => foodFirst(a) - foodFirst(b) || a.placed - b.placed);
    }

    let pool = Game.housedResidents(s);
    let crew = Game.crewSize(s);
    const starter = starterFor(s.era);
    if (s.founded || !starter) { pool += crew; crew = 0; }
    C.crewHeld = crew;
    C.starter = starter;
    C.workersTotal = pool + crew;
    for (const b of byPlaced) {
      const d = DEF(b.type);
      b.staff = 0;

      if (b.mothballed) { b.block = null; b.status = 'mothballed'; b.rate = 0; continue; }
      if (!d.workers) continue;

      if (b.resting) {
        if (Grid.soilUnder(b) >= 0.999) {
          b.resting = false;
          if (!offline) UI.toast('\u{1F33E} ' + d.name + ' is back at full soil and has resumed cropping on its own.', 8000);
        } else { b.block = null; continue; }
      }
      b.block = Econ.blockOf(b);
      if (b.block) continue;

      let want = d.workers;
      let take = 0;
      if (crew > 0 && b.type === starter) { take = Math.min(want, crew); crew -= take; want -= take; }
      const fromPool = Math.min(want, pool);
      pool -= fromPool;
      b.staff = take + fromPool;

      if (!s.founded && starter && b.type === starter && b.staff >= d.workers) s.founded = true;
    }
    C.workersUsed = C.workersTotal - pool - crew;
    C.crewHeld = crew;

    C.fedByres = new Set();
    for (const b of byPlaced) {
      if (b.type !== 'oxbyre') continue;
      if (b.block || !b.staff) continue;
      const want = TUNE.OX.fodder * (b.staff / DEF('oxbyre').workers) * Econ.M;
      if (want > 0 && s.stock.grain >= want) {
        s.stock.grain -= want;
        Econ.note('grain', 0, want);
        C.grainDraw.oxen += want;
        C.fedByres.add(b.id);
      }
    }

    C.beerBonus = 0;
    if (s.policyBeerRation && rungOf(s.era) === 4) {
      const need = TUNE.BEER_RATION.perResident * Game.totalResidents(s) * Econ.M;
      if (need > 0 && s.stock.beer >= need) {
        s.stock.beer -= need;
        Econ.note('beer', 0, need);
        C.beerBonus = TUNE.BEER_RATION.bonus;
      }
    }

    C.corvee = false;
    if (s.policyCorvee && C.nilePhase === 'akhet') {
      const need = TUNE.CORVEE.perResident * Game.totalResidents(s) * Econ.M;
      if (need > 0 && s.stock.flour >= need) {
        s.stock.flour -= need;
        Econ.note('flour', 0, need);
        C.beerBonus = TUNE.CORVEE.bonus;
        C.corvee = true;
      }
    }

    C.ration = false;
    if (s.policyRation && Econ.tankActive(s)) {
      C.beerBonus = -TUNE.RATION.slow;
      C.ration = true;
    }

    for (const b of byPlaced) {
      const d = DEF(b.type);

      b.supply = Econ.supplyMultiplier(s, b);

      if (d.sells || d.sellsRaw) {
        const sv = Grid.customerSurvey(s, b);
        b.customers = sv.n;
        b.custDist = sv.meanDist;
        b.trade = Econ.tradeMultiplier(sv.meanDist);
      } else b.trade = 1;

      let uBase = d.upkeep * rankUpkeepMult(b);
      if (b.mothballed) {
        upkeep += d.upkeep * TUNE.MOTHBALL_UPKEEP * Econ.M;
      } else {
        if (b.resting) uBase *= TUNE.FALLOW_UPKEEP;
        else if (d.workers) uBase *= TUNE.STAFF_UPKEEP_FLOOR +
          (1 - TUNE.STAFF_UPKEEP_FLOOR) * (b.staff / d.workers);
        const uFull = uBase * b.supply * b.trade;
        upkeep += uFull * Econ.M;
        premium += (uFull - uBase) * Econ.M;
      }
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
        if (b.status === 'ok') {
          income += d.trickle * Econ.M; b.rate = d.trickle;

          C.monBoost = (C.monBoost || 0) + TUNE.MONUMENT_BOOST;
        } else b.rate = 0;
      } else if (b.type === 'templeGranary' && !b.mothballed) {

        if (b.block) b.status = b.block;
        else if (b.staff === 0) b.status = 'no_staff';
        else {
          b.status = b.staff < d.workers ? 'understaffed' : 'ok';
          const dues = TUNE.DUES.per * Grid.residentsWithin(s, b, TUNE.DUES.radius) *
            (b.staff / d.workers) * Econ.M;
          income += dues;
          C.tickDues += dues;
        }
      } else if (b.type === 'oxbyre' && !b.mothballed) {
        b.status = b.block ? b.block
          : b.staff === 0 ? 'no_staff'
          : C.fedByres.has(b.id) ? (b.staff < d.workers ? 'understaffed' : 'ok')
          : 'no_input';
      } else if (d.workers && !d.out && !d.procIn && !d.sells && !d.sellsRaw && !b.mothballed) {

        b.status = b.block ? b.block
          : b.staff === 0 ? 'no_staff'
          : b.staff < d.workers ? 'understaffed' : 'ok';
      } else if (!d.workers && !d.cap && !b.mothballed) {

        b.status = (d.needsRoad && !b.conn) ? 'no_road'
          : (d.needsWater && !Grid.covered(C.water, b)) ? 'no_water' : 'ok';
      }
    }

    for (const b of byPlaced) {
      const d = DEF(b.type);
      if (!d.out || !d.workers || b.mothballed) continue;
      if (b.type === 'oxbyre') continue;

      if (b.resting) {
        b.soil = Grid.soilUnder(b);
        b.status = 'resting'; b.rate = 0; b.lastStaffEff = 0; continue;
      }
      if (b.block) { b.status = b.block; b.rate = 0; b.lastStaffEff = 0; continue; }

      if (C.nilePhase === 'akhet' && d.out && d.out.grain && Econ.nileFloods(b)) {
        b.soil = Grid.soilUnder(b);
        b.flooded = true;
        b.status = 'flooded'; b.rate = 0; b.lastStaffEff = 0;
        continue;
      }
      b.flooded = false;
      const staffEff = b.staff / d.workers;
      b.lastStaffEff = staffEff;
      if (b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }

      let made = 0;
      if (d.out.grain) {

        b.soil = Grid.soilUnder(b);
        const soilMult = TUNE.SOIL.minYield + (1 - TUNE.SOIL.minYield) * b.soil;

        const oxen = (b.oxNear || []).some(id => C.fedByres.has(id)) ? TUNE.OX.bonus : 0;
        const mult = (1 + TUNE.FERTILE_BONUS * (b.fertile || 0)) *
                     (1 + (b.adjBoost || 0)) * (1 + oxen) * soilMult * rankOutMult(b);

        made = d.out.grain * staffEff * mult * Econ.M * (1 + C.beerBonus) * (C.nileMult || 1);
        Econ.addStock(s, 'grain', made);
      } else if (d.out.clay || d.out.wool) {

        const kind = d.out.clay ? 'clay' : 'wool';
        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b);
        made = d.out[kind] * staffEff * mult * Econ.M * (1 + C.beerBonus);
        Econ.addStock(s, kind, made);
      } else if (d.out.dates || d.out.fish || d.out.salt || d.out.reeds || d.out.sesame) {

        const kind = Object.keys(d.out)[0];

        const oxen = (b.oxNear || []).some(id => C.fedByres.has(id)) ? TUNE.OX.bonus : 0;
        let mult = (1 + (b.adjBoost || 0)) * (1 + oxen) * rankOutMult(b);
        if (d.saltProof) {
          b.soil = Grid.soilUnder(b);
          if (b.soil < 0.3) mult *= 1.5;
        } else if (d.slowSalt) {
          b.soil = Grid.soilUnder(b);
          mult *= TUNE.SOIL.minYield + (1 - TUNE.SOIL.minYield) * b.soil;
        }
        made = d.out[kind] * staffEff * mult * Econ.M * (1 + C.beerBonus);
        Econ.addStock(s, kind, made);
      } else if (d.out.deadwood) {

        const left = Econ.cutterWoodLeft(b);
        b.woodLeft = left;
        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b);
        made = left > 0 ? Math.min(left, d.out.deadwood * staffEff * mult * Econ.M * (1 + C.beerBonus)) : 0;
        if (made > 0) {
          Econ.spendCutter(s, b, made);
          Econ.addStock(s, 'deadwood', made);
        }
        b.rate = made;
        b.status = left <= 0 ? 'stand_spent' : (staffEff < 1 ? 'understaffed' : 'ok');
        continue;

      } else if (d.out.water || d.out.cacao || d.out.honey ||
                 d.out.game || d.out.bone || d.out.ochre) {

        const kind = Object.keys(d.out)[0];
        if (!Econ.sourceRunning(d)) {
          b.status = 'dry_season'; b.rate = 0; b.lastStaffEff = staffEff;
          continue;
        }
        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b);
        made = d.out[kind] * staffEff * mult * Econ.M * (1 + C.beerBonus);
        Econ.addStock(s, kind, made);
      } else if (d.out.stone || d.out.flint) {

        const good = d.out.stone ? 'stone' : 'flint';
        const left = Econ.quarryStoneLeft(b);
        b.stoneLeft = left;

        const rf = d.out.stone ? (0.5 + 0.5 * (b.rockFrac || 0)) : 1;
        const mult = rf * (1 + (b.adjBoost || 0)) * rankOutMult(b);
        made = left > 0 ? d.out[good] * staffEff * mult * Econ.M * (1 + C.beerBonus) : 0;
        if (made > 0) {
          Econ.spendQuarry(s, b, made);
          Econ.addStock(s, good, made);
          if (good === 'stone') s.cum.stone += made;
        }
        b.rate = made;

        b.status = left <= 0 ? 'stand_spent' : (staffEff < 1 ? 'understaffed' : 'ok');
        continue;
      }
      b.rate = made;
      b.status = staffEff < 1 ? 'understaffed' : 'ok';
    }

    Econ.waterTick(s, offline);

    const procs = byPlaced.filter(b => DEF(b.type).procIn && DEF(b.type).workers && !b.mothballed);

    procs.sort((a, b) =>
      ((DEF(b.type).procOut === 'flour') ? 1 : 0) - ((DEF(a.type).procOut === 'flour') ? 1 : 0) ||
      a.placed - b.placed);
    for (const b of procs) {
      const d = DEF(b.type);
      if (b.block) { b.status = b.block; b.rate = 0; continue; }
      const staffEff = b.staff / d.workers;
      if (b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }

      b.bureauSlow = Econ.anyAuraLive(b.bureauSlowBy);
      const slow = b.bureauSlow ? (1 - TUNE.BUREAU.slow) : 1;
      const want = d.procRate * staffEff * (1 + (b.adjBoost || 0)) *
        rankOutMult(b) * slow * Econ.M * (1 + C.beerBonus);
      const use = Math.min(want, s.stock[d.procIn]);
      s.stock[d.procIn] -= use;
      Econ.note(d.procIn, 0, use);
      if (d.procIn === 'grain') {
        C.grainDraw[d.procOut === 'flour' ? 'mill' : 'brewery'] += use;
      }
      const made = use * d.procRatio;
      Econ.addStock(s, d.procOut, made);
      if (d.procOut === 'flour') { flourMade += made; s.cum.flour += made; }
      b.rate = made;

      b.prodRate = made;
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

    let effRes = residents;
    if (residents > 0) {

      let covered = 0;
      for (const h of houses) {
        if (h.residents && Econ.anyAuraLive(h.nearOvenIds)) covered += h.residents;
      }
      if (covered > 0) effRes = residents - covered * (1 - TUNE.OVEN.factor);
    }

    const demand = effRes * TUNE.FLOUR_PER_RESIDENT * Econ.M;
    let shortfall = demand;
    for (const f of TUNE.FOODS) {
      if (shortfall <= 0) break;
      const have = s.stock[f.kind] || 0;
      if (have <= 0) continue;
      const useEquiv = Math.min(shortfall, have * f.eff);
      const useUnits = useEquiv / f.eff;
      s.stock[f.kind] -= useUnits;
      Econ.note(f.kind, 0, useUnits);
      shortfall -= useEquiv;
    }

    if (shortfall > 0 && s.hunger >= TUNE.DOLE.hungerAt) {
      const granary = byPlaced.find(b => b.type === 'templeGranary' &&
        !b.mothballed && b.staff > 0 && !b.block);
      if (granary) {
        const equiv = Math.min(shortfall, TUNE.DOLE.rate * Econ.M,
          (s.stock.grain || 0) / TUNE.DOLE.grainPerFlour);
        if (equiv > 0) {
          const grain = equiv * TUNE.DOLE.grainPerFlour;
          s.stock.grain -= grain;
          Econ.note('grain', 0, grain);
          C.grainDraw.dole += grain;
          C.tickDole += equiv;
          shortfall -= equiv;
        }
      }
    }
    const eaten = demand - shortfall;
    const fed = (offline || demand <= 0) ? 1 : eaten / demand;

    const rise = 1 / (TUNE.STARVE_MINUTES * 60);
    if (fed < 0.99) s.hunger = Math.min(1, s.hunger + (1 - fed) * rise);
    else {

      const target = residents * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO * TUNE.LARDER.recoverMin;
      const larder = residents > 0
        ? Math.max(0.25, Math.min(1, Econ.foodEquiv(s) / Math.max(1, target))) : 1;
      s.hunger = Math.max(0, s.hunger - TUNE.HUNGER_RECOVER * larder);
    }

    if (!offline) {
      if (s.hunger <= 0.001) { C.h25Told = 0; C.h50Told = 0; C.famineLogged = 0; }
      if (s.hunger >= TUNE.MIGRATION.hungerStop && !C.h25Told) {
        C.h25Told = 1;
        UI.toast('\u{1F35E} The city is going hungry — newcomers are turning away. Check the Tally (T): ' +
          'is the Mill starving, or are there simply too many mouths?', 10000);
      }
      if (s.hunger >= TUNE.HUNGER_WARN && !C.h50Told) {
        C.h50Told = 1;

        UI.toast('⚠️ FAMINE RISING. Residents will hold on for roughly ' +
          Math.round(TUNE.STARVE_MINUTES * (1 - s.hunger)) + ' more minutes. ' +
          (Econ.hearthActive(s)
            ? 'Import dried meat at the Long Hearth, fish the ice, send a hunt, or get the Drying Rack moving — then the recovery is fast.'
            : 'Import grain at the Hall, open the Temple Granary\'s dole, or get flour moving — then the recovery is fast.'), 12000);
        if (!C.famineLogged) { C.famineLogged = 1; Econ.log(s, '⚠️', 'Famine took hold of the city.'); }
      }
    }

    if (s.hunger >= 1 && s.tick % 10 === 0) Econ.removeResident(s, houses);
    if (s.tick % 6 === 0) {

      const blocked = houses.find(h => h.block && h.residents > 0);
      if (blocked) {
        const room = houses.find(h => !h.block && h.residents < h.cap);
        blocked.residents--;
        if (room) room.residents++;
        else Econ.floater(blocked, '-1');
      }
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

    const monRes = Econ.monumentReserve(s);

    const reserveMin = Econ.reserveMinutes(s, byPlaced);
    for (const b of byPlaced) {
      const d = DEF(b.type);
      if ((!d.sells && !d.sellsRaw) || b.mothballed) continue;
      if (b.block) { b.status = b.block; b.rate = 0; continue; }
      if (b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }
      const staffEff = b.staff / d.workers;

      const cust = b.customers != null ? b.customers : Grid.customerSurvey(s, b).n;
      if (cust < d.custMin) { b.status = 'no_customers'; b.rate = 0; continue; }

      const scribeMult = b.scribed ? (1 + TUNE.SCRIBE.bonus) : 1;
      const throughput = staffEff * scribeMult * rankOutMult(b) * Econ.M * (1 + C.beerBonus);

      b.weighed = Econ.anyAuraLive(b.weighedBy);
      b.bureau = Econ.anyAuraLive(b.bureauBy);
      const priceMult = rankPriceMult(b) *
        (b.weighed ? 1 + TUNE.WEIGH.bonus : 1) *
        (b.bureau ? 1 + TUNE.BUREAU.priceBonus : 1);

      let sell = 0, gain = 0;
      if (d.sellsRaw) {

        let kind = null, best = 0;
        for (const k of d.sellsRaw) {

          const fKeep = (TUNE.FUEL[k] && Econ.hearthActive(s))
            ? Econ.warmDemand(s) * TUNE.TEMPO * TUNE.FUEL_RESERVE_MIN / TUNE.FUEL[k] : 0;
          const avail = (s.stock[k] || 0) - (monRes[k] || 0) - fKeep;
          if (avail > best) { best = avail; kind = k; }
        }
        b.rawKind = kind;
        if (kind) {
          sell = Math.min(d.sellRate * throughput, Math.max(0, best));
          s.stock[kind] -= sell;
          Econ.note(kind, 0, sell);
          gain = sell * TUNE.PRICES[kind] * 0.8 * priceMult;
        }
      } else {

        const fuelKeep = (TUNE.FUEL[d.sells] && Econ.hearthActive(s))
          ? Econ.warmDemand(s) * TUNE.TEMPO * TUNE.FUEL_RESERVE_MIN / TUNE.FUEL[d.sells] : 0;
        const keep = (d.sells === 'flour'
          ? residents * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO * reserveMin : 0) +
          fuelKeep + (monRes[d.sells] || 0);
        sell = Math.min(d.sellRate * throughput,
                        Math.max(0, s.stock[d.sells] - keep));
        s.stock[d.sells] -= sell;
        Econ.note(d.sells, 0, sell);

        let price = d.sellPrice;
        if (!(price > 0)) {
          price = TUNE.PRICES[d.sells] || 1;
          if (!Econ._priceWarned) Econ._priceWarned = {};
          if (!Econ._priceWarned[b.type]) {
            Econ._priceWarned[b.type] = 1;
            console.warn('EPOCH: ' + b.type + ' sells ' + d.sells +
              ' with no sellPrice — falling back to the list price $' + price + '. Author it in data.js.');
          }
        }
        gain = sell * price * priceMult;
      }
      income += gain;
      b.rate = sell;
      b.lastGain = gain;
      b.status = sell <= 0.0001 ? 'no_input' : (staffEff < 1 ? 'understaffed' : 'ok');
      if (!offline && gain > 0 && s.tick % 60 === b.id % 60) {
        Econ.floater(b, '+$' + Math.round(gain * 60));

        if (window.Sfx) Sfx.play('coin', { price: d.sellPrice || (b.rawKind ? TUNE.PRICES[b.rawKind] : 5) });
      }
    }

    const monDrawn = Econ.buildMonuments(s, offline);

    income += C.tickExport;

    if (C.monBoost) {
      C.tickMonBonus = income * C.monBoost;
      income += C.tickMonBonus;
    }
    s.money += income - upkeep;
    s.cum.earned += Math.max(0, income - upkeep);
    const flow = income - upkeep - monDrawn;

    C.net = C.ratesDirty ? flow : C.net * 0.9 + flow * 0.1;
    C.tickMonSpend = monDrawn;

    if (!offline && s.money < 0) UI.firstToast('broke', 'Out of money. Upkeep still runs — mothball or demolish something, import nothing, and wait on Town Hall income. A mothballed building costs a fifth of its upkeep.');

    if (!offline) {
      const perMin = C.net * 60;
      if (perMin > 0.5) { C.posTicks = (C.posTicks || 0) + 1; C.negTicks = 0; }
      else if (perMin < -0.5) { C.negTicks = (C.negTicks || 0) + 1; C.posTicks = 0; }
      else { C.posTicks = 0; C.negTicks = 0; }
      if (C.posTicks === 60 && !s.firsts.breakeven) {
        s.firsts.breakeven = 1;
        if (window.Sfx) Sfx.play('bell');
        UI.toast('\u{1F514} YOUR CITY PAYS FOR ITSELF. Net has held positive a full minute — from here, ' +
          'time itself earns you money. Build the next chain.', 12000);
        Econ.log(s, '\u{1F514}', 'The city broke even — it pays for itself now.');
      }
      if (C.posTicks === 60) C.slumpTold = 0;
      if (s.firsts.breakeven && C.negTicks === 60 && !C.slumpTold) {
        C.slumpTold = 1;
        UI.toast('\u{1F53B} The city is eating its treasury — net has been negative a full minute. ' +
          'Open the Tally (T): find what stalled, mothball what bleeds.', 12000);
      }
    }

    Econ.checkLiteracy(s, offline);
    Econ.settleTally(s, income, upkeep, premium);

    if (s.records && s.tick % 10 === 0) {
      const R = s.records, pop = Game.totalResidents(s);
      if (pop > (R.peakPop || 0)) R.peakPop = pop;
      const netMin = C.net * 60;
      if (netMin > (R.bestNet || 0)) R.bestNet = netMin;
      if (s.hunger <= 0.001) {
        R.streak = (R.streak || 0) + 10;
        if (R.streak > (R.bestStreak || 0)) R.bestStreak = R.streak;
      } else R.streak = 0;
    }

    const next = Econ.nextEra(s);
    if (!offline && next && !s.prompted[next] && Econ.eraReady(s)) {
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

      if ((d.sells || d.sellsRaw || d.depot) && b.done !== false && !b.mothballed) {
        if (d.depot && d.workers && b.staff === 0 && s.tick > 2) continue;
        list.push(b);
      }
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
    const d = Grid.dimsOf(b);
    const cx = b.x + d.w / 2, cy = b.y + d.h / 2;
    let best = Infinity;
    for (const m of depots) {
      const md = Grid.dimsOf(m);
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

  NILE_PHASES: ['akhet', 'peret', 'shemu'],
  NILE_LABEL: {
    akhet: 'Akhet — the flood',
    peret: 'Peret — the growing',
    shemu: 'Shemu — the drought',
  },

  nileActive(s) { return rungOf(s.era) === 5; },

  nileTick(s, offline) {
    const C = G.cache;
    C.nilePhase = null; C.nileMult = 1;
    if (!Econ.nileActive(s)) { s.nile = null; return; }
    if (!s.nile) s.nile = { phase: 1, left: TUNE.NILE.peret };
    if (offline) {
      C.nilePhase = Econ.NILE_PHASES[s.nile.phase];
      return;
    }

    s.nile.left -= 1;
    if (s.nile.left <= 0) {
      s.nile.phase = (s.nile.phase + 1) % 3;
      const name = Econ.NILE_PHASES[s.nile.phase];
      s.nile.left = TUNE.NILE[name];

      if (name === 'akhet') {
        let renewed = 0;
        const chunks = new Set();
        for (const b of s.buildings) {
          const d = DEF(b.type);
          if (!d || !d.out || !d.out.grain) continue;
          if (!Econ.nileFloods(b)) continue;
          Grid.tilesOf(b, (tx, ty) => {
            if (!Grid.inB(tx, ty)) return;
            if (Grid.setSoil(s, tx, ty, 1)) chunks.add(Grid.chunkKeyOf(tx, ty));
          });
          renewed++;
        }
        if (chunks.size && window.Rend && Rend.markSoilDirty) Rend.markSoilDirty(chunks);
        Econ.log(s, '\u{1F30A}', 'Akhet: the river came up. ' + renewed +
          ' field' + (renewed === 1 ? '' : 's') + ' under water, and every one of them renewed.');
        UI.toast('\u{1F30A} AKHET — the flood is in. ' + renewed + ' field' + (renewed === 1 ? '' : 's') +
          ' will grow nothing for ' + Math.round(TUNE.NILE.akhet) + 's, and will come out of it on fresh silt. ' +
          'Your granary is what the city eats until then.', 11000);
      } else if (name === 'peret') {
        Econ.log(s, '\u{1F33F}', 'Peret: the water is off the fields and the silt is new.');
        UI.toast('\u{1F33F} PERET — the water is off the land. Fresh silt: +' +
          Math.round(TUNE.NILE.peretBonus * 100) + '% grain while it lasts.', 9000);
      } else {
        Econ.log(s, '\u{2600}\u{FE0F}', 'Shemu: the harvest, and the ground begins to dry.');
        UI.toast('\u{2600}\u{FE0F} SHEMU — harvest and drought. The salt clock is running again; ' +
          'fill the granary before the river comes back.', 9000);
      }
    }

    const phase = Econ.NILE_PHASES[s.nile.phase];
    C.nilePhase = phase;
    C.nileLeft = s.nile.left;
    C.nileMult = phase === 'peret' ? 1 + TUNE.NILE.peretBonus : 1;
  },

  nileFloods(b) {
    let hit = false;
    Grid.tilesOf(b, (tx, ty) => {
      if (hit || !Grid.inB(tx, ty)) return;
      if (Econ.nearChannel(tx, ty, TUNE.NILE.floodBand)) hit = true;
    });
    return hit;
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
      if (!d.out || !(d.out.grain || d.slowSalt) || b.done === false) continue;
      if (b.block || !b.staff || b.mothballed) continue;

      if (Grid.soilUnder(b) <= S.autoRestAt) {
        b.resting = true;
        b.staff = 0; b.rate = 0; b.status = 'resting';
        if (!offline) UI.toast('\u{1F4A4} ' + d.name + ' has worked its ground out and stopped itself. ' +
          'It will recover and resume on its own - click it to override.', 10000);
        continue;
      }
      const dr = drain * (d.slowSalt ? 0.5 : 1);
      Grid.tilesOf(b,(tx, ty) => {
        if (!Grid.inB(tx, ty)) return;
        cropped.add(Grid.key(tx, ty));
        const v = Grid.soilAt(tx, ty) - dr * b.lastStaffEff;
        if (Grid.setSoil(s, tx, ty, v)) {
          (changedChunks = changedChunks || new Set()).add(Grid.chunkKeyOf(tx, ty));
        }
      });

      if (!s.firsts.saltcrisis && Grid.soilUnder(b) < 0.5) {
        s.firsts.saltcrisis = 1;
        if (window.Rend && Rend.focusOn) Rend.focusOn(b);
        UI.toast('\u{1F9C2} THE LAND IS SALTING — Sumer\'s oldest enemy. This field is under half soil ' +
          'and fading. Three answers: REST it (its own panel), a MIDDEN or SHADUF in range (×3 recovery), ' +
          'or convert to Date Palms, which thrive on ruined ground. Press O twice for the salt overlay.', 16000);
        Econ.log(s, '\u{1F9C2}', 'The first field fell below half soil — the salt has begun.');
      }
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
      if (!d.soilRadius || b.done === false || b.mothballed) continue;

      if (d.workers && (b.staff === 0 || Econ.blockOf(b))) continue;

      Grid.stampRadiusCircle(C.midden, b, d.soilRadius + rankRadiusBonus(b));
    }
  },

  quarryStoneLeft(b) {
    let left = 0;
    Grid.tilesOf(b,(tx, ty) => {
      if (Grid.inB(tx, ty) && G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.ROCK)
        left += Grid.stoneAt(tx, ty);
    });
    return left;
  },

  woodTiles(s, b) {
    const d = DEF(b.type), R = d.woodRadius;
    const out = [];
    if (!R) { Grid.tilesOf(b, (tx, ty) => { if (Grid.inB(tx, ty)) out.push([tx, ty]); }); return out; }
    const dm = Grid.dimsOf(b);
    const cx = b.x + (dm.w - 1) / 2, cy = b.y + (dm.h - 1) / 2;
    for (let ty = Math.floor(cy - R); ty <= Math.ceil(cy + R); ty++)
      for (let tx = Math.floor(cx - R); tx <= Math.ceil(cx + R); tx++) {
        if (!Grid.inB(tx, ty)) continue;
        const dx = tx - cx, dy = ty - cy;
        if (dx * dx + dy * dy <= R * R) out.push([tx, ty]);
      }

    out.sort((p, q) => ((p[0]-cx)**2 + (p[1]-cy)**2) - ((q[0]-cx)**2 + (q[1]-cy)**2));
    return out;
  },
  cutterWoodLeft(b) {
    let left = 0;
    for (const [tx, ty] of Econ.woodTiles(G.s, b)) left += Grid.woodAt(G.s, tx, ty);
    return left;
  },
  spendCutter(s, b, amt) {

    const tiles = Econ.woodTiles(s, b).filter(([tx, ty]) => Grid.woodAt(s, tx, ty) > 0);
    if (!tiles.length) return;
    let burned = false, rest = amt;
    for (const [tx, ty] of tiles) {
      if (rest <= 0) break;
      const take = Math.min(rest, Grid.woodAt(s, tx, ty));
      rest -= take;
      if (Grid.spendWood(s, tx, ty, take)) burned = true;
    }
    if (burned) {
      G.cache.dirty = true;
      if (window.Rend && Rend.invalidateTerrain) Rend.invalidateTerrain();
      Econ.log(s, '\u{1F525}', 'A dead stand was felled to nothing — that ground is ash now, forever.');
      UI.firstToast('ashfirst', 'A tree tile is SPENT and has become ASH. The forest does not grow back ' +
        'in this age — every fire you light is paid for out of a finite map. Site the next Cutter ' +
        'before this one dies.');
    }
  },

  spendQuarry(s, b, amt) {
    const tiles = [];
    Grid.tilesOf(b,(tx, ty) => {
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
      Econ.log(s, '⛰️', 'An outcrop was quarried to nothing — that stone is gone forever.');
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

    else if ((s.chill || 0) >= TUNE.COLD.stopGrowth) why = 'cold';
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

    let rate = M.perMinute * Math.min(1, M.floor + open / M.openFull);

    const resNow = Game.totalResidents(s);
    if (resNow > 0) {
      const target = resNow * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO * TUNE.LARDER.migrateMin;
      rate *= Math.max(M.floor, Math.min(1, Econ.foodEquiv(s) / Math.max(1, target)));
    }

    if (s.festival && s.festival.left > 0) rate *= TUNE.FESTIVAL.migMult;
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
      if (s.records) s.records.settlers = (s.records.settlers || 0) + 1;

      if (!offline && window.Sfx && s.records && s.records.settlers % 20 === 1) Sfx.play('settle');

      if (s.festival && s.festival.left > 0) {
        s.festival.left--;
        if (s.festival.left <= 0) {
          s.festival = null;
          if (!offline) UI.toast('\u{1F37A} The Festival of Ninkasi is over — ' + TUNE.FESTIVAL.settlers +
            ' newcomers came for the beer and stayed for the city.', 10000);
        }
      }
      if (!offline) {
        Econ.floater(beds[i], '+1');

        if (!s.firsts.firstsettler) {
          s.firsts.firstsettler = 1;
          const NAMES = ['Enheduanna', 'Ur-Nammu', 'Ninlil', 'Gilgamesh', 'Shulgi', 'Kubaba'];
          const name = NAMES[(s.seed || 0) % NAMES.length];
          if (window.Rend && Rend.focusOn) Rend.focusOn(beds[i]);
          UI.toast('\u{1F3E0} ' + name + ' has settled in your city — the first of many. ' +
            'Residents staff your buildings and eat your food: grow both together.', 12000);
          Econ.log(s, '\u{1F3E0}', name + ' arrived — the first settler.');
        } else {
          UI.firstToast('movein', 'A settler moved in. Residents staff your buildings — and eat your flour, so grow the food before you grow the town.');
        }
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

    if (lvl >= houseMaxLevel(s)) return null;
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
            if (window.Sfx) Sfx.play('evolve');
            Econ.floater(h, '▲ ' + houseLevelName(s.era, h.level) + ' · +' +
              Math.max(0, houseCap(DEF(h.type), h) - houseCap(DEF(h.type), { level: h.level - 1 })) + ' beds');
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

  monumentReserve(s) {
    const res = {};
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.monument || b.complete || b.halted || b.done === false) continue;
      if (Econ.blockOf(b)) continue;
      const need = monumentBuild(b.type, d.era || 1);
      for (const k in need) {
        if (k === 'money') continue;
        const want = need[k] - ((b.delivered || {})[k] || 0);
        if (want <= 0) continue;
        res[k] = (res[k] || 0) +
          Math.min(want, (MONUMENT_RATE[k] || 6) * Econ.M * TUNE.MON_RESERVE_TICKS);
      }
    }
    return res;
  },

  reserveMinutes(s, byPlaced) {
    const g = (byPlaced || s.buildings).find(b => b.type === 'templeGranary' &&
      b.done !== false && !b.mothballed && b.staff > 0 && !b.block);
    if (!g) return TUNE.FLOUR_RESERVE_MIN;
    return TUNE.RESERVE_POLICY[s.granaryPolicy || 'lean'] || TUNE.FLOUR_RESERVE_MIN;
  },

  buildMonuments(s, offline) {
    let moneyDrawn = 0;
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
        let want = need[k] - (b.delivered[k] || 0);
        if (want <= 0) continue;
        const rate = (MONUMENT_RATE[k] || 6) * Econ.M;
        if (k === 'money') {

          if (b.beerWages) {
            const capLeft = need.money * 0.5 - (b.beerWageCredit || 0);
            if (capLeft > 0 && (s.stock.beer || 0) > 0) {
              const beerTake = Math.min(s.stock.beer, (MONUMENT_RATE.beer || 2) * Econ.M,
                capLeft / 8, want / 8);
              if (beerTake > 0) {
                s.stock.beer -= beerTake;
                Econ.note('beer', 0, beerTake);
                const credit = beerTake * 8;
                b.delivered.money = (b.delivered.money || 0) + credit;
                b.beerWageCredit = (b.beerWageCredit || 0) + credit;
                want -= credit;
                moved = true;
              }
            }
          }
          const take = Math.min(Math.max(0, want), rate, Math.max(0, s.money));
          if (take > 0) {
            s.money -= take;
            moneyDrawn += take;
            b.delivered.money = (b.delivered.money || 0) + take;
            moved = true;
          }
        } else if (k === 'clay') {

          let cap = rate;
          if ((s.stock.mudbrick || 0) > 0 && cap > 0) {
            const brickTake = Math.min(s.stock.mudbrick, cap / 4, want / 4);
            if (brickTake > 0) {
              s.stock.mudbrick -= brickTake;
              Econ.note('mudbrick', 0, brickTake);
              b.delivered.clay = (b.delivered.clay || 0) + brickTake * 4;
              want -= brickTake * 4;
              cap -= brickTake * 4;
              moved = true;
            }
          }
          const take = Math.min(Math.max(0, want), cap, s.stock.clay || 0);
          if (take > 0) {
            s.stock.clay -= take;
            Econ.note('clay', 0, take);
            b.delivered.clay = (b.delivered.clay || 0) + take;
            moved = true;
          }
        } else {
          const take = Math.min(want, rate, s.stock[k] || 0);
          if (take <= 0) continue;
          s.stock[k] -= take;
          Econ.note(k, 0, take);
          b.delivered[k] = (b.delivered[k] || 0) + take;
          moved = true;
        }
      }

      const p = Econ.monumentProgress(s, b);
      b.buildFrac = p.frac;
      b.status = p.done ? 'ok' : (moved ? 'building' : 'no_input');
      const stage = Econ.monumentStage(s, b);
      if (stage !== b.stage) { b.stage = stage; if (window.Rend) Rend.onWorldChange(); }
      if (p.done && !b.complete) {
        b.complete = true;
        Econ.log(s, d.icon || '\u{1F3DB}️', 'THE ' + d.name.toUpperCase() + ' WAS COMPLETED.');

        const gift = monumentGift(s.era);
        if (gift) {
          gift.apply(s);
          s.pendingGift = 1;
          Econ.log(s, gift.icon, gift.log);
        }
        if (!offline) {
          if (window.Sfx) Sfx.play('drum');
          UI.toast('\u{1F3DB}️ THE ' + d.name.toUpperCase() + ' IS FINISHED. It begins earning at once — ' +
            'and it is the single largest contributor to your real rent in this age.', 12000);
        }
      }
    }
    return moneyDrawn;
  },

  nextEra(s) { return nextWrittenEra(s.era); },

  eraReady(s) {
    const next = Econ.nextEra(s);
    if (!next) return false;
    const r = eraReq(s.era + 1);

    const base = s.eraBase || {};

    return Game.housedResidents(s) >= r.pop && s.money >= r.money &&
           (s.cum.flour - (base.flour || 0)) >= r.food &&
           (s.cum.stone - (base.stone || 0)) >= r.stone &&
           Econ.monumentDone(s, s.era);
  },

  monumentFor(era) {
    const e = Math.max(1, Math.round(era || 1));
    for (const k in BUILDINGS) {
      const d = BUILDINGS[k];
      if (d.monument && (d.era || 1) === e) return { key: k, def: d };
    }
    return null;
  },
  monumentDone(s, era) {
    const m = Econ.monumentFor(era);

    if (!m) return true;
    return s.buildings.some(b => b.type === m.key && b.complete);
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

  migrateStalePrestige(s) {
    if (!s || (s.era || 1) <= 1) return null;
    const stale = s.buildings.filter(b => {
      const d = DEF(b.type);
      if (!d || b.relic || d.fixed || b.type === 'road') return false;
      return (d.era || 1) < s.era;
    });
    if (!stale.length) return null;

    const carried = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (d && d.monument && b.complete && !b.relic) {
        carried.push({ type: b.type, era: d.era || 1, name: d.name });
      }
    }
    s.relics = (s.relics || []).concat(carried);

    const before = { buildings: s.buildings.length, stale: stale.length,
                     pop: Game.totalResidents(s), money: Math.round(s.money) };
    const res = Econ.prestigeReset(s);
    Econ.log(s, '\u{1F30D}', 'The age was turned before the ground was. Your ' + before.stale +
      ' buildings from the previous age have been left behind where they belong, and ' +
      s.relics.length + ' monument' + (s.relics.length === 1 ? '' : 's') + ' came with you.');
    return { before, relics: s.relics.length, placed: res ? res.placed.length : 0 };
  },

  prestigeReset(s) {
    const C = TUNE.WORLD / 2;

    s.seed = (Math.imul(s.seed, 1664525) + 1013904223) >>> 0;

    s.buildings = [];
    s.owned = [];
    s.cleared = {}; s.planted = {}; s.terraEdits = {}; s.soilEdits = {}; s.rockSpent = {};

    s.woodSpent = {}; s.herds = null; s.hunt = null; s.chill = 0;
    s.nextId = 1; s.placeCounter = 0;

    s.hallLevel = Math.min(s.era, 4); s.hallJob = null;
    s.hunger = 0; s.settlerAcc = 0; s.festival = null;
    s.stock = Game.startStock(true);
    s.foundingLeft = TUNE.FOUNDING.purse;

    s.money = Math.round(TUNE.START_MONEY * Math.pow(TUNE.PRESTIGE_PURSE_MULT, s.era - 4));

    G.cache = Game.freshCache();
    Grid.genTerrain(s);

    const cc = TUNE.WORLD / TUNE.CHUNK / 2 - 1;
    for (let cy = cc; cy <= cc + 2; cy++)
      for (let cx = cc; cx <= cc + 2; cx++)
        s.owned.push(cx + ',' + cy);

    for (let y = C - 4; y <= C + 7; y++)
      for (let x = C - 4; x <= C + 7; x++)
        if (Grid.treeAt(s, x, y)) s.cleared[Grid.key(x, y)] = 1;

    Grid.rebuild(s);
    Grid.addBuilding(s, 'townhall', C - 2, C - 2);
    Grid.rebuild(s);

    return { placed: [], unplaced: (s.relics || []).slice(), granted: 0 };
  },

  placeRelics(s, C) {
    const out = { placed: [], unplaced: [], granted: 0 };

    const claim = (x, y, w, h) => {
      const added = [];
      const p0 = Grid.chunkOf(x, y), p1 = Grid.chunkOf(x + w - 1, y + h - 1);
      for (let cx = p0.cx; cx <= p1.cx; cx++)
        for (let cy = p0.cy; cy <= p1.cy; cy++) {
          const k = cx + ',' + cy;
          if (G.cache.ownedSet.has(k)) continue;
          s.owned.push(k); G.cache.ownedSet.add(k); added.push(k);
        }
      return added;
    };
    const unclaim = (keys) => {
      for (const k of keys) {
        G.cache.ownedSet.delete(k);
        const i = s.owned.indexOf(k);
        if (i >= 0) s.owned.splice(i, 1);
      }
    };

    let slot = 0;
    for (const r of (s.relics || [])) {
      const d = DEF(r.type);
      if (!d) { out.unplaced.push(r); continue; }
      const w = d.w || 1, h = d.h || 1;
      let done = false;
      for (let ring = TUNE.RELIC_RING; ring <= TUNE.RELIC_RING + 32 && !done; ring += 3) {
        const spots = 12;
        for (let i = 0; i < spots && !done; i++) {
          const a = ((slot + i) / spots) * Math.PI * 2;
          const x = Math.round(C - 1 + Math.cos(a) * ring);
          const y = Math.round(C - 1 + Math.sin(a) * ring);
          if (!Grid.inB(x, y) || !Grid.inB(x + w - 1, y + h - 1)) continue;
          const added = claim(x, y, w, h);
          if (!Grid.canPlace(s, r.type, x, y)) { unclaim(added); continue; }
          const b = Grid.addBuilding(s, r.type, x, y);
          if (!b) { unclaim(added); continue; }
          b.complete = true;
          b.done = true;
          b.relic = true;
          b.relicEra = r.era;
          out.placed.push(r); out.granted += added.length; done = true; slot += 5;
        }
      }
      if (!done) out.unplaced.push(r);
    }
    return out;
  },

  advanceEra(s) {
    if (!Econ.eraReady(s)) return false;

    const carried = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);

      if (d && d.monument && b.complete) {
        carried.push({ type: b.type, era: d.era || 1, name: d.name });
      }
    }
    s.relics = (s.relics || []).concat(carried);

    const wasPop = Game.totalResidents(s), wasMoney = s.money, wasBuildings = s.buildings.length;

    s.era = Econ.nextEra(s);

    s.eraBase = { flour: s.cum.flour, stone: s.cum.stone };
    const era = ERAS[s.era - 1];

    Econ.log(s, '\u{1F30D}', 'The age turned: Era ' + s.era + ' — ' + era.name +
      '. The old city is behind you — ' + wasBuildings + ' buildings, ' + wasPop +
      ' residents, ' + Util.fmtMoney(wasMoney) + ' spent into the ground. ' +
      s.relics.length + ' monument' + (s.relics.length === 1 ? '' : 's') + ' came with you.');

    const res = Econ.prestigeReset(s);
    const land = { parcels: s.owned.length, tiles: s.owned.length * TUNE.CHUNK * TUNE.CHUNK };

    if (res && res.unplaced.length) {
      Econ.log(s, '\u{26A0}\u{FE0F}', res.unplaced.length + ' relic' +
        (res.unplaced.length === 1 ? '' : 's') + ' found no ground near the new hall and wait in the dynasty.');
    }

    Grid.rebuild(s);
    UI.refreshPalette();

    if (window.Rend) {
      Rend.layerDirty = true;
      if (Rend.invalidateTerrain) Rend.invalidateTerrain();
      Rend.onWorldChange();
      if (Rend.focusOn) { const h = s.buildings.find(b => b.type === 'townhall'); if (h) Rend.focusOn(h); }
    }

    UI.eraCeremony(s.era, land);
    return true;
  },

  blockOf(b) {
    if (window.Dev && Dev.flags.noBlockers) return null;

    if (b.relic) return null;
    const d = DEF(b.type);

    if (d.needsRoad && !b.conn) return 'no_road';
    if (d.needsWater && !Grid.covered(G.cache.water, b)) return 'no_water';
    if (d.needsPower && !Grid.covered(G.cache.power, b)) return 'no_power';

    if (d.needsWarm && (!G.cache.warm || !Grid.covered(G.cache.warm, b))) return 'no_warmth';
    return null;
  },

  stampPower(s) {
    const C = G.cache;
    C.power.fill(0);
    if (s.era < 30) return;
    for (const b of s.buildings) {
      const d = DEF(b.type);

      if (d.powerRadius && b.conn && b.lastStaffEff > 0)
        Grid.stampRadiusCircle(C.power, b, d.powerRadius);
    }
  },

  SEASON_PHASES: ['wet', 'dry'],
  SEASON_LABEL: {
    wet: 'The Rains',
    dry: 'The Dry',
  },

  tankActive(s) { return rungOf(s.era) === 14; },

  hearthActive(s) { return rungOf(s.era) === 1; },

  HERD_NAMES: { mammoth: 'woolly mammoth', bison: 'steppe bison', rhino: 'woolly rhinoceros', sabertooth: 'sabertooth' },
  HERD_ICON: { mammoth: '\u{1F9A3}', bison: '\u{1F9AC}', rhino: '\u{1F98F}', sabertooth: '\u{1F405}' },

  seedHerds(s) {
    const W = TUNE.WORLD, C = W / 2;
    const rnd = Util.mulberry32((s.seed ^ 0x5EED) >>> 0);
    const herds = [];
    let id = 1;
    for (const kind in TUNE.HERDS.counts) {
      for (let i = 0; i < TUNE.HERDS.counts[kind]; i++) {
        let x, y, tries = 0;

        if (i === 0) {
          const a = rnd() * Math.PI * 2, r = 30 + rnd() * 15;
          x = C + Math.cos(a) * r; y = C + Math.sin(a) * r;
        } else {
          do {
            x = 20 + rnd() * (W - 40); y = 20 + rnd() * (W - 40); tries++;
          } while (Math.hypot(x - C, y - C) < TUNE.HERDS.standoff + 10 && tries < 50);
        }
        herds.push({ id: id++, kind, x, y, heading: rnd() * Math.PI * 2 });
      }
    }
    return herds;
  },

  herdTick(s, offline) {
    if (!Econ.hearthActive(s)) return;
    if (!s.herds) s.herds = Econ.seedHerds(s);
    if (offline) return;
    const W = TUNE.WORLD, C = W / 2;

    const rnd = Util.mulberry32((s.seed ^ s.tick) >>> 0);
    for (const h of s.herds) {

      h.turn = (h.turn || 0) * 0.92 + (rnd() - 0.5) * 0.016;
      if (h.turn > 0.05) h.turn = 0.05; else if (h.turn < -0.05) h.turn = -0.05;
      h.heading += h.turn;
      const sp = TUNE.HERDS.speed[h.kind] || 0.1;
      const nx = h.x + Math.cos(h.heading) * sp, ny = h.y + Math.sin(h.heading) * sp;
      if (Math.hypot(nx - C, ny - C) < TUNE.HERDS.standoff ||
          nx < 12 || ny < 14 || nx > W - 12 || ny > W - 12 ||
          G.cache.terrain[Grid.key(Math.round(nx), Math.round(ny))] === TERRAIN.MOUNTAIN) {
        h.heading += Math.PI * (0.6 + rnd() * 0.8);
        h.turn = 0;
        continue;
      }
      h.x = nx; h.y = ny;
    }

    if (s.hunt) {
      s.hunt.left -= 1;
      if (s.hunt.left <= 0) Econ.resolveHunt(s);
    } else {

      for (const b of s.buildings) {

        if (!DEF(b.type).huntBase || b.done === false || b.mothballed) continue;
        if (b.autoHunt === false) continue;
        if (b.huntRest > 0) { b.huntRest--; continue; }
        const t = Econ.nearestHerd(s, b);
        if (!t) continue;

        if (Econ.huntOdds(s, t.herd, t.dist, b) < TUNE.HUNT.autoMinOdds) continue;
        if (Econ.launchHunt(s, b) === null) { b.huntRest = TUNE.HUNT.rest; break; }
      }
    }
  },

  nearestHerd(s, b) {
    if (!s.herds) return null;
    const d = Grid.dimsOf(b);
    const cx = b.x + d.w / 2, cy = b.y + d.h / 2;

    const kinds = DEF(b.type).huntKinds || null;
    let best = null, bd = Infinity;
    for (const h of s.herds) {
      if (kinds && kinds.indexOf(h.kind) === -1) continue;
      const dist = Math.hypot(h.x - cx, h.y - cy);
      if (dist < bd) { bd = dist; best = h; }
    }
    return best && bd <= TUNE.HUNT.range ? { herd: best, dist: bd } : null;
  },

  huntOdds(s, herd, dist, camp) {
    const H = TUNE.HUNT;
    let p = H.odds[herd.kind] || 0.5;
    p -= dist * H.distPenalty;

    if (camp) p += (DEF(camp.type).huntOddsBonus || 0);
    return Util.clamp(p, 0.05, 0.95);
  },
  sabertoothNear(s, herd) {
    return (s.herds || []).some(h => h !== herd && h.kind === 'sabertooth' &&
      Math.hypot(h.x - herd.x, h.y - herd.y) < 18);
  },

  launchHunt(s, camp) {
    if (!Econ.hearthActive(s)) return 'not this age';
    if (s.hunt) return 'a hunt is already out';
    const t = Econ.nearestHerd(s, camp);
    if (!t) return 'no herd within reach — watch the steppe';
    const party = TUNE.HUNT.party;

    if (Game.housedResidents(s) <= party + TUNE.HUNT.autoSpare)
      return 'the camp cannot spare ' + party + ' hunters';

    const houses = s.buildings.filter(b => DEF(b.type).cap);
    for (let i = 0; i < party; i++) Econ.removeResident(s, houses);
    s.hunt = {
      herdId: t.herd.id, kind: t.herd.kind, party,
      left: TUNE.HUNT.ticks, dist: Math.round(t.dist),
      odds: Econ.huntOdds(s, t.herd, t.dist, camp),
      camp: camp.type,
      cat: Econ.sabertoothNear(s, t.herd),
      seed: (s.seed ^ s.tick ^ 0xBEEF) >>> 0,
    };
    Econ.log(s, '\u{1F3F9}', party + ' hunters walked out after the ' +
      Econ.HERD_NAMES[t.herd.kind] + ', ' + Math.round(t.dist) + ' tiles onto the steppe.');
    UI.toast('\u{1F3F9} THE HUNT IS OUT — ' + party + ' hunters tracking the ' +
      Econ.HERD_NAMES[t.herd.kind] + '. They are gone from your labour pool until they return. ' +
      'Odds ' + Math.round(s.hunt.odds * 100) + '%' + (s.hunt.cat ? ' — and a sabertooth is shadowing the herd.' : '.'), 12000);
    return null;
  },

  resolveHunt(s) {
    const hunt = s.hunt;
    s.hunt = null;
    if (!hunt) return;
    const rnd = Util.mulberry32(hunt.seed);
    const success = rnd() < hunt.odds;

    let lost = 0;
    const risk = (success ? 0.03 : 0.10) + (hunt.cat ? TUNE.HUNT.catOdds : 0);
    for (let i = 0; i < hunt.party; i++) if (rnd() < risk) lost++;
    const back = hunt.party - lost;

    const houses = s.buildings.filter(b => DEF(b.type).cap && !b.block);
    let seated = 0;
    for (let i = 0; i < back; i++) {
      const room = houses.find(h => (h.residents || 0) < (h.cap || 0));
      if (room) { room.residents = (room.residents || 0) + 1; seated++; }
    }
    if (success) {
      const haul = TUNE.HUNT.haul[hunt.kind] || {};
      const got = [];
      for (const k in haul) { Econ.addStock(s, k, haul[k]); got.push(haul[k] + ' ' + k); }

      const cash = (TUNE.HUNT.bonus || {})[hunt.kind] || 0;
      let paid = 0;
      if (cash > 0 && rnd() < (TUNE.HUNT.bonusChance || 0)) {
        paid = cash; s.money += paid;
        got.push('and $' + paid + ' traded on');
      }

      s.herds = (s.herds || []).filter(h => h.id !== hunt.herdId);
      Econ.log(s, '\u{1F3F9}', 'THE HUNT CAME HOME: the ' + Econ.HERD_NAMES[hunt.kind] +
        ' is taken — ' + got.join(', ') + '.' +
        (lost ? ' ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' did not come back.' : ' Nobody was lost.'));
      UI.toast('\u{1F3F9} THE HUNT CAME HOME — ' + got.join(', ') + '.' +
        (lost ? ' \u{1FAA6} ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' died on the steppe.' : ' Everyone came back.'), 14000);
      if (window.Sfx) Sfx.play('bell');
    } else {
      Econ.log(s, '\u{1F3F9}', 'The hunt FAILED — the ' + Econ.HERD_NAMES[hunt.kind] + ' broke away.' +
        (lost ? ' ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' did not come back.' : ''));
      UI.toast('\u{1F3F9} The hunt failed — the ' + Econ.HERD_NAMES[hunt.kind] + ' broke away' +
        (lost ? ', and \u{1FAA6} ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' died out there' : '') +
        '. The animal is still on the map. So are you.', 12000);
    }
    if (s.records) s.records.hunts = (s.records.hunts || 0) + 1;
  },

  warmDemand(s) {
    const geo = Econ.warmGeo(s);
    let sum = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.warm || b.mothballed || b.done === false) continue;
      if (geo && !Grid.covered(geo, b)) continue;
      sum += d.warm;
    }

    const keeper = s.buildings.some(b => DEF(b.type).fuelKeeper && !b.mothballed &&
      b.done !== false && (b.staff || 0) > 0);
    return sum * (keeper ? 1 - TUNE.FIREKEEPER.save : 1);
  },

  fuelEquiv(s) {
    let e = 0;
    for (const k in TUNE.FUEL) e += (s.stock[k] || 0) * TUNE.FUEL[k];
    return e;
  },

  warmForecast(s) {
    const demand = Econ.warmDemand(s);
    const have = Econ.fuelEquiv(s);
    const perTick = demand * Econ.M;
    return { demand, have, secs: perTick > 0 ? have / perTick : Infinity };
  },

  warmGeo(s) {
    const C = G.cache;
    if (C.warmGeoClean && C.warmGeo) return C.warmGeo;
    if (!C.warmGeo) C.warmGeo = new Uint8Array(TUNE.WORLD * TUNE.WORLD);
    C.warmGeo.fill(0);
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d.warmRadius || b.done === false || b.mothballed) continue;
      Grid.stampRadiusCircle(C.warmGeo, b, d.warmRadius + rankRadiusBonus(b));
    }
    C.warmGeoClean = true;
    return C.warmGeo;
  },

  stampWarmth(s, offline) {
    const C = G.cache;
    if (!Econ.hearthActive(s)) { C.dark = false; return; }
    if (!C.warm) C.warm = new Uint8Array(TUNE.WORLD * TUNE.WORLD);

    const want = Econ.warmDemand(s) * Econ.M;
    let unpaid = want;

    for (const kind of ['deadwood', 'bone', 'charcoal']) {
      if (unpaid <= 0) break;
      const worth = TUNE.FUEL[kind];
      const useUnits = Math.min(s.stock[kind] || 0, unpaid / worth);
      if (useUnits <= 0) continue;
      s.stock[kind] -= useUnits;
      Econ.note(kind, 0, useUnits);
      unpaid -= useUnits * worth;
    }
    const dark = unpaid > want * 0.001;
    C.dark = dark;
    C.warmDraw = want - unpaid;

    C.warm.fill(0);
    if (!dark) C.warm.set(Econ.warmGeo(s));

    let coldRes = 0, residents = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d.cap || !b.residents) continue;
      residents += b.residents;
      if (dark || !Grid.covered(C.warm, b)) coldRes += b.residents;
    }
    if (!offline) {
      const rise = 1 / (TUNE.COLD.freezeMinutes * 60);
      if (residents > 0 && coldRes > 0) {
        s.chill = Math.min(1, (s.chill || 0) + (coldRes / residents) * rise);
      } else {
        s.chill = Math.max(0, (s.chill || 0) - TUNE.COLD.recover);
      }

      if ((s.chill || 0) <= 0.001) { C.cold20Told = 0; C.cold40Told = 0; }
      if (s.chill >= TUNE.COLD.stopGrowth && !C.cold20Told) {
        C.cold20Told = 1;
        UI.toast('\u{2744}\u{FE0F} The camp is going cold — newcomers are turning away. Check the fuel ' +
          'chip: are the fires dark, or is a home outside every hearth circle?', 10000);
      }
      if (s.chill >= TUNE.COLD.warnAt && !C.cold40Told) {
        C.cold40Told = 1;
        if (window.Sfx) Sfx.play('bell');
        UI.toast('\u{1F9CA} FREEZING. People will hold on for roughly ' +
          Math.round(TUNE.COLD.freezeMinutes * (1 - s.chill)) + ' more minutes. Feed the fires — ' +
          'cut wood, burn bone, stop selling charcoal — or mothball what you can spare.', 12000);
        Econ.log(s, '\u{1F9CA}', 'The cold took hold of the camp.');
      }

      if (!dark && Econ.fuelEquiv(s) > want * 60) C.darkTold = 0;
      if (dark && !C.darkTold) {
        C.darkTold = 1;
        Econ.log(s, '\u{1F525}', 'The fuel ran out and every fire in the camp went dark.');
        UI.toast('\u{1F525} THE FIRES ARE DARK — the fuel is gone, and everything inside the hearth ' +
          'circles has stopped. Your Cutters, Drives, Weirs and Quarries keep working; nothing else ' +
          'does. Cut wood, burn bone, and stop the Fuel Stack selling your warmth.', 15000);
      }
    }

    if (!offline && (s.chill || 0) >= 1 && s.tick % 10 === 0) {
      const houses = s.buildings.filter(b => DEF(b.type).cap);
      Econ.removeResident(s, houses);
    }
  },

  seasonTick(s, offline) {
    const C = G.cache;
    C.seasonPhase = null; C.seasonLeft = 0;
    if (!Econ.tankActive(s)) { s.season = null; return; }

    if (!s.season) s.season = { phase: 0, left: TUNE.SEASON.wet };
    if (offline) {

      C.seasonPhase = Econ.SEASON_PHASES[s.season.phase];
      C.seasonLeft = s.season.left;
      return;
    }

    s.season.left -= 1;
    if (s.season.left <= 0) {
      s.season.phase = (s.season.phase + 1) % 2;
      const name = Econ.SEASON_PHASES[s.season.phase];
      s.season.left = TUNE.SEASON[name];

      C.seasonPhase = name;
      C.seasonLeft = s.season.left;
      if (name === 'dry') {

        const f = Econ.waterForecast(s);
        Econ.log(s, '\u{2600}\u{FE0F}', 'The dry season came in. The rains are ' +
          Math.round(TUNE.SEASON.dry) + 's away and the catchments have stopped.');
        UI.toast('\u{2600}\u{FE0F} THE DRY — every catchment and reservoir has stopped collecting. ' +
          'Only the cenotes still run. You have ' + f.text + ', and the rains return in ' +
          Math.round(TUNE.SEASON.dry) + 's. Mothball what you can spare, or ration at the Council House.', 13000);
      } else {
        Econ.log(s, '\u{1F327}\u{FE0F}', 'The rains returned — the courts are draining into the tanks again.');
        UI.toast('\u{1F327}\u{FE0F} THE RAINS — the catchments are collecting again. Fill the tank, ' +
          'light what you mothballed, and buy capacity before the next dry.', 10000);
      }
    }
    C.seasonPhase = Econ.SEASON_PHASES[s.season.phase];
    C.seasonLeft = s.season.left;
  },

  sourceRunning(d) {
    if (!d.wetOnly) return true;
    return G.cache.seasonPhase !== 'dry';
  },

  stampWater(s) {
    const C = G.cache;
    if (!Econ.tankActive(s)) return;
    const dry = (s.stock.water || 0) <= 0;
    C.brownout = dry;
    C.water.fill(0);
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d.waterRadius || b.done === false) continue;

      if (d.tankFed && dry) continue;
      if (b.mothballed) continue;
      Grid.stampRadiusCircle(C.water, b, d.waterRadius + rankRadiusBonus(b));
    }
  },

  waterDemand(s) {
    let workers = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.needsWater || b.mothballed || b.done === false) continue;
      workers += b.staff || 0;
    }
    const raw = Game.totalResidents(s) * TUNE.WATER_PER_RESIDENT +
                workers * TUNE.WATER_PER_WORKER;
    return raw * (s.policyRation ? (1 - TUNE.RATION.drawCut) : 1);
  },

  waterSupply(s) {
    let out = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.out || !d.out.water || b.mothballed || b.done === false) continue;
      if (b.block || !b.staff) continue;
      if (!Econ.sourceRunning(d)) continue;
      out += d.out.water * (b.staff / d.workers) * rankOutMult(b);
    }
    return out;
  },

  waterForecast(s) {
    const demand = Econ.waterDemand(s);
    const supply = Econ.waterSupply(s);
    const net = supply - demand;
    const have = s.stock.water || 0;
    if (net >= 0) {
      return { net, demand, supply, secs: Infinity,
               text: have > 0 ? 'water to spare' : 'no water banked, but supply covers the draw' };
    }

    const secs = have / (-net * Econ.M);
    return { net, demand, supply, secs,
             text: Math.round(secs) + 's of water left at this draw' };
  },

  waterTick(s, offline) {
    const C = G.cache;
    C.waterDraw = 0;
    if (!Econ.tankActive(s)) return;
    const want = Econ.waterDemand(s) * Econ.M;
    if (want <= 0) return;
    const use = Math.min(want, s.stock.water || 0);
    s.stock.water -= use;
    Econ.note('water', 0, use);
    C.waterDraw = use;
    C.waterShort = want - use;

    if (!offline && !C.brownout) {
      const cap = Econ.capOf(s, 'water');
      const f = Econ.waterForecast(s);
      if (f.net >= 0 && (s.stock.water || 0) > cap * 0.4) C.lowWaterTold = 0;
      else if (!C.lowWaterTold && f.net < 0 && f.secs >= 5 && f.secs < 90) {
        C.lowWaterTold = 1;
        UI.toast('\u{1F4A7} THE TANK IS DRAINING — ' + Math.round(f.secs) + 's of water left. ' +
          'You are drinking ' + (f.demand * TUNE.TEMPO).toFixed(0) + '/min and collecting ' +
          (f.supply * TUNE.TEMPO).toFixed(0) + '/min. Turn on the Reservoir Ration at the Council House ' +
          '(free, instant), MOTHBALL what you can spare, and add a source or a Chultun. ' +
          'When it hits zero every aqueduct goes dark at once.', 15000);
        Econ.log(s, '\u{1F4A7}', 'The tank began to run down — ' + Math.round(f.secs) + 's of water left.');
      }
    }

    if (!offline) {
      if ((s.stock.water || 0) > want * 3) C.dryTold = 0;
      if ((s.stock.water || 0) <= 0 && !C.dryTold) {
        C.dryTold = 1;
        if (window.Sfx) Sfx.play('bell');
        Econ.log(s, '\u{1F4A7}', 'The tank ran dry and the city browned out.');
        UI.toast('\u{1F4A7} THE TANK IS EMPTY — every aqueduct has gone dark, and with it everything ' +
          'that needs water. Your Milpas and Quarries keep working; nothing else does. MOTHBALL the ' +
          'industry until the rains, turn on the Reservoir Ration, and build a Chultun or an Aguada ' +
          'before the next dry season.', 16000);
      }
    }
  },

  BASE_CAP: { grain: 'GRAIN_CAP', flour: 'FLOUR_CAP', stone: 'STONE_CAP', blocks: 'BLOCKS_CAP',
              clay: 'CLAY_CAP', pottery: 'POTTERY_CAP', wool: 'WOOL_CAP',
              cloth: 'CLOTH_CAP', beer: 'BEER_CAP',
              dates: 'DATES_CAP', fish: 'FISH_CAP', salt: 'SALT_CAP', reeds: 'REEDS_CAP',
              baskets: 'BASKETS_CAP', sesame: 'SESAME_CAP', oil: 'OIL_CAP',
              dyedcloth: 'DYEDCLOTH_CAP', mudbrick: 'MUDBRICK_CAP',
              water: 'WATER_CAP', cacao: 'CACAO_CAP',
              chocolate: 'CHOCOLATE_CAP', honey: 'HONEY_CAP',
              deadwood: 'DEADWOOD_CAP', charcoal: 'CHARCOAL_CAP',
              game: 'GAME_CAP', pemmican: 'PEMMICAN_CAP',
              hide: 'HIDE_CAP', parka: 'PARKA_CAP', flint: 'FLINT_CAP',
              blades: 'BLADES_CAP', bone: 'BONE_CAP', ochre: 'OCHRE_CAP',
              carvings: 'CARVINGS_CAP', ivory: 'IVORY_CAP' },

  CRAFT_KINDS: ['clay', 'pottery', 'wool', 'cloth', 'beer', 'reeds', 'baskets',
                'sesame', 'oil', 'dyedcloth', 'mudbrick', 'salt', 'dates', 'fish',
                'cacao', 'chocolate',

                'deadwood', 'charcoal', 'hide', 'parka', 'flint', 'blades',
                'bone', 'ochre', 'carvings', 'ivory'],

  capOf(s, kind) {
    const m = subTier(s).storageMult;
    const base = TUNE[Econ.BASE_CAP[kind]] || 30;
    if (kind === 'grain' || kind === 'flour' || kind === 'game' || kind === 'pemmican') {

      const key = kind === 'grain' ? 'storeGrain' : kind === 'flour' ? 'storeFlour'
                : kind === 'game' ? 'storeGame' : 'storePemmican';
      let extra = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);

        if (!d || !d[key] || b.done === false || b.mothballed || (d.needsRoad && !b.conn)) continue;
        if (d.needsWater && !Grid.covered(G.cache.water, b)) continue;
        extra += d[key];
      }
      return Math.round(m * (base + extra));
    }

    if (kind === 'water') {
      let extra = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.storeWater || b.done === false) continue;
        if (d.needsRoad && !b.conn) continue;
        extra += d.storeWater;
      }
      return Math.round(m * (base + extra));
    }

    if (Econ.CRAFT_KINDS.includes(kind)) {
      let extra = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.storeCraft || b.done === false || !b.conn || b.mothballed) continue;
        if (b.staff !== undefined && d.workers && b.staff === 0) continue;
        extra += d.storeCraft;
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
    if (overflow > 0) {

      if (TUNE.NO_EXPORT && TUNE.NO_EXPORT[kind]) {
        Econ.note(kind, amt, 0, 0, overflow);
      } else if (s.holdAtCap && s.holdAtCap[kind]) {

        Econ.note(kind, amt, 0, 0, overflow);
      } else {

        G.cache.tickExport += overflow * TUNE.PRICES[kind] * TUNE.EXPORT_MULT;
        Econ.note(kind, amt, 0, overflow);
      }
    } else {

      Econ.note(kind, amt, 0, 0);
    }
  },

  note(kind, made, used, exported, held) {
    const T = G.cache.tallyTick;
    if (!T) return;
    const r = T[kind] || (T[kind] = { made: 0, used: 0, exported: 0, held: 0 });
    if (made) r.made += made;
    if (used) r.used += used;
    if (exported) r.exported += exported;
    if (held) r.held = (r.held || 0) + held;
  },

  settleTally(s, income, upkeep, premium) {
    const C = G.cache;
    const T = C.tallyTick;

    const a = C.ratesDirty ? 1 : 0.05;
    C.ratesDirty = false;

    const perMin = 60;
    for (const k in T) {
      const t = T[k];
      const r = C.tally[k] || (C.tally[k] = { made: 0, used: 0, exported: 0, held: 0 });
      r.made += (t.made * perMin - r.made) * a;
      r.used += (t.used * perMin - r.used) * a;
      r.exported += (t.exported * perMin - r.exported) * a;
      r.held = (r.held || 0) + ((t.held || 0) * perMin - (r.held || 0)) * a;
    }

    for (const k in C.tally) {
      if (T[k]) continue;
      const r = C.tally[k];
      r.made *= 1 - a; r.used *= 1 - a; r.exported *= 1 - a; r.held = (r.held || 0) * (1 - a);
    }
    C.incomeRate += (income * perMin - C.incomeRate) * a;
    C.upkeepRate += (upkeep * perMin - C.upkeepRate) * a;
    C.premiumRate += (premium * perMin - C.premiumRate) * a;

    C.exportRate = (C.exportRate || 0) + ((C.tickExport || 0) * perMin - (C.exportRate || 0)) * a;
    C.monSpendRate = (C.monSpendRate || 0) + ((C.tickMonSpend || 0) * perMin - (C.monSpendRate || 0)) * a;
    C.doleRate = (C.doleRate || 0) + ((C.tickDole || 0) * perMin - (C.doleRate || 0)) * a;
    C.monBonusRate = (C.monBonusRate || 0) + ((C.tickMonBonus || 0) * perMin - (C.monBonusRate || 0)) * a;
    C.duesRate = (C.duesRate || 0) + ((C.tickDues || 0) * perMin - (C.duesRate || 0)) * a;
    if (!C.grainDrawAvg) C.grainDrawAvg = { mill: 0, brewery: 0, oxen: 0, dole: 0 };
    for (const k in C.grainDrawAvg) {
      C.grainDrawAvg[k] += (((C.grainDraw && C.grainDraw[k]) || 0) * perMin - C.grainDrawAvg[k]) * a;
    }
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

    const sec = standingSection(p.rp, s.era);
    const at = standingThreshold(sec, s.era);
    const next = standingThreshold(sec + 1, s.era);
    const span = next - at;
    return {
      ...p,
      achievement: rentAchievement(p.rp, s.era),
      monthly: rentMonthly(s.era, s.hallLevel, s.subTier, p.rp),
      ceiling: RENT_MONTHLY[Util.clamp(s.era, 1, MAX_ERA)],
      section: sec,
      sections: STANDING_SECTIONS,
      sectionAt: at,
      nextAt: next,
      toNext: isFinite(next) ? Math.max(0, next - p.rp) : 0,
      progress: (isFinite(span) && span > 0) ? Util.clamp((p.rp - at) / span, 0, 1) : 1,
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

  auraLive(id) {
    const b = G.cache.byId.get(id);
    if (!b || b.done === false || b.mothballed) return false;
    const d = DEF(b.type);
    if (d.workers && !b.staff) return false;
    return !b.block;
  },
  anyAuraLive(ids) {
    if (!ids || !ids.length) return false;
    for (const id of ids) if (Econ.auraLive(id)) return true;
    return false;
  },

  foodEquiv(s) {
    let sum = 0;
    for (const f of TUNE.FOODS) sum += (s.stock[f.kind] || 0) * f.eff;
    return sum;
  },

  removeResident(s, houses) {
    const occupied = houses.filter(h => h.residents > 0)
      .sort((a, b) => (a.level || 1) - (b.level || 1) || b.placed - a.placed);
    if (!occupied.length) return;
    const h = occupied[0];
    h.residents--;
    if (s.records) s.records.lostFamine = (s.records.lostFamine || 0) + 1;
    Econ.floater(h, '-1');
    UI.firstToast('starve', 'Residents are leaving. The city has been hungry for ' + TUNE.STARVE_MINUTES +
      ' minutes — build a Farm, and a Mill to grind its grain into flour.');
  },

  floater(b, txt) {
    const d = Grid.dimsOf(b);
    G.cache.floaters.push({ x: b.x + d.w / 2, y: b.y, txt, age: 0 });
    if (G.cache.floaters.length > 40) G.cache.floaters.shift();
  },

  log(s, icon, msg) {
    if (!s.chronicle) s.chronicle = [];
    s.chronicle.push({ tick: s.tick, era: s.era, icon: icon || '\u{1F4DC}', msg });
    if (s.chronicle.length > 200) s.chronicle.shift();
  },

  rankDiscount(s) {
    const t = s.buildings.find(b => b.type === 'tablethouse' && b.done !== false &&
      !b.mothballed && b.staff > 0 && !Econ.blockOf(b));
    return t ? 0.85 : 1;
  },

  importGrain(s) {
    const imp = eraImport(s.era);
    const cost = TUNE.IMPORT_GRAIN.units * imp.price;
    if (s.money < cost) return false;
    s.money -= cost;

    const space = Math.max(0, Econ.capOf(s, imp.kind) - (s.stock[imp.kind] || 0));
    const stored = Math.min(TUNE.IMPORT_GRAIN.units, space);
    s.stock[imp.kind] += stored;
    const overflow = TUNE.IMPORT_GRAIN.units - stored;
    if (overflow > 0) s.money += overflow * TUNE.PRICES[imp.kind] * TUNE.EXPORT_MULT;
    Econ.log(s, '\u{1F6B6}', imp.who + ' ' + TUNE.IMPORT_GRAIN.units + ' ' + imp.kind +
      ' at $' + imp.price + ' a ' + imp.unit + ' — four times the fair price.');
    return cost;
  },

  festivalCost(s) {
    return {
      beer: Math.round(TUNE.FESTIVAL.beerBase + TUNE.FESTIVAL.beerPerRes * Game.totalResidents(s)),
      cloth: TUNE.FESTIVAL.cloth,
    };
  },
  declareFestival(s) {
    if (s.festival && s.festival.left > 0) return 'a festival is already running';
    const c = Econ.festivalCost(s);
    if ((s.stock.beer || 0) < c.beer) return 'not enough beer — it needs ' + c.beer;
    if ((s.stock.cloth || 0) < c.cloth) return 'not enough cloth — it needs ' + c.cloth;
    s.stock.beer -= c.beer;
    s.stock.cloth -= c.cloth;
    Econ.note('beer', 0, c.beer);
    Econ.note('cloth', 0, c.cloth);
    s.hunger = Math.max(0, s.hunger - TUNE.FESTIVAL.hungerDrop);
    s.festival = { left: TUNE.FESTIVAL.settlers };
    Econ.log(s, '\u{1F37A}', 'The city declared the Festival of Ninkasi — ' + c.beer +
      ' beer and ' + c.cloth + ' cloth poured out for the whole town.');
    return true;
  },
};
