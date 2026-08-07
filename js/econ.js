'use strict';

const Econ = {

  M: TUNE.TICK_MIN * TUNE.TEMPO,

  BASE_M: TUNE.TICK_MIN * TUNE.TEMPO,

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

    Econ.siltTick(s, offline);

    Econ.trophicTick(s, offline);

    Econ.levyTick(s, offline);

    Econ.stampWater(s);

    Econ.stampMagazine(s);
    Econ.rationTick(s, offline);

    Econ.cascadeTick(s);

    Econ.reachTick(s);

    Econ.opsonTick(s, offline);

    Econ.nileTick(s, offline);

    Econ.soilTick(s, offline);

    let income = 0, upkeep = 0, flourMade = 0, premium = 0;

    C.tallyTick = {};

    C.tickExport = 0; C.tickDole = 0; C.tickDues = 0; C.monBoost = 0; C.tickMonBonus = 0;

    C.tickAnnona = 0;
    C.grainDraw = { mill: 0, brewery: 0, oxen: 0, dole: 0 };

    const byPlaced = s.buildings.slice()
      .filter(b => b.done !== false)
      .sort((a, b) => a.placed - b.placed);

    if (s.hunger >= TUNE.HUNGER_WARN) {

      const foodFirst = b => {
        const d = DEF(b.type);
        if (!d) return 1;
        const raws = d.out ? Object.keys(d.out) : [];
        return (raws.some(inFoodChain) || inFoodChain(d.procOut) || inFoodChain(d.sells) ||
          b.type === 'breadoven' || b.type === 'templeGranary') ? 0 : 1;
      };
      byPlaced.sort((a, b) => foodFirst(a) - foodFirst(b) || a.placed - b.placed);
    }

    if (Econ.magazineActive(s)) {
      const at = new Map();
      byPlaced.forEach((b, i) => at.set(b, i));
      const isMag = b => { const d = DEF(b.type); return (d && d.magazineRadius) ? 0 : 1; };
      byPlaced.sort((a, b) => isMag(a) - isMag(b) || at.get(a) - at.get(b));
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

      b.block = Econ.blockOf(b);
      if (!d.workers) continue;

      if (b.resting) {
        if (Grid.soilUnder(b) >= 0.999) {
          b.resting = false;
          if (!offline) UI.toast((d.icon || '\u{1F331}') + ' ' + d.name + ' is back at full soil and has resumed cropping on its own.', 8000);
        } else { b.block = null; continue; }
      }

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

      const dOx = DEF(b.type);
      if (!dOx || !dOx.oxTeam) continue;
      if (b.block || !b.staff) continue;

      const want = Econ.oxFodder(dOx) * (b.staff / dOx.workers) * Econ.M;
      if (want > 0 && s.stock.grain >= want) {
        s.stock.grain -= want;
        Econ.note('grain', 0, want);
        C.grainDraw.oxen += want;
        C.fedByres.add(b.id);
      }
    }

    C.litLamps = new Set();
    for (const b of byPlaced) {
      const dL = DEF(b.type);
      if (!dL || !dL.lampRadius || !dL.fuelIn) continue;
      if (b.block || b.mothballed || (dL.workers && !b.staff)) continue;
      const want = dL.fuelRate * (dL.workers ? b.staff / dL.workers : 1) * Econ.M;
      if (want > 0 && (s.stock[dL.fuelIn] || 0) >= want) {
        s.stock[dL.fuelIn] -= want;
        Econ.note(dL.fuelIn, 0, want);
        C.litLamps.add(b.id);
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

    const wasSwept = !!C.swept;
    C.swept = false;
    if (s.policySweep && Econ.gridActive(s)) {
      let live = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.drainRadius || !Econ.campLive(b) || (d.needsRoad && !b.conn)) continue;
        live++;
      }
      const need = TUNE.SWEEP.perDrain * live * Econ.M;

      const on = wasSwept ? (s.stock.brick >= need) : (s.stock.brick >= need * 3);
      if (need > 0 && on) {
        s.stock.brick -= need;
        Econ.note('brick', 0, need);
        C.swept = true;
      }
    }

    const wasWide = !!C.wideIssue;
    C.wideIssue = false;
    if (s.policyWideIssue && Econ.magazineActive(s)) {
      const per = TUNE.MAGAZINE.issuePer.oil * TUNE.WIDEISSUE.mult;
      const hold = per * TUNE.MAGAZINE.reserveMin * (TUNE.MAGAZINE.freeAdmin + 1);
      C.wideIssue = wasWide ? (s.stock.oil >= hold) : (s.stock.oil >= hold * 2);
    }

    const wasRevet = !!C.revetAdd;
    C.revetAdd = 0;
    if (s.policyRevet && Econ.cascadeActive(s)) {
      let live = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.cascadeSource || !Econ.campLive(b) || (d.workers && !(b.staff > 0))) continue;
        live++;
      }
      const need = TUNE.REVET.per * live * Econ.M;
      const on = wasRevet ? (s.stock.blocks >= need) : (s.stock.blocks >= need * 3);
      if (need > 0 && on) {
        s.stock.blocks -= need;
        Econ.note('blocks', 0, need);
        C.revetAdd = TUNE.REVET.add;
      }
    }

    const wasLash = !!C.lashAdd;
    C.lashAdd = 0;
    if (s.policyLash && Econ.reachActive(s)) {
      let live = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.voyageRange || !Econ.campLive(b) || (d.workers && !(b.staff > 0))) continue;
        live++;
      }
      const need = TUNE.LASH.per * live * Econ.M;
      const on = wasLash ? (s.stock.sennit >= need) : (s.stock.sennit >= need * 3);
      if (need > 0 && on) {
        s.stock.sennit -= need;
        Econ.note('sennit', 0, need);
        C.lashAdd = TUNE.LASH.add;
      }
    }

    const wasFleet = !!C.fleetLift;
    C.fleetLift = 0;
    if (s.policyFleet && Econ.annonaActive(s)) {
      const landed = (C.annona ? C.annona.got : 0) * Econ.M;
      const need = TUNE.FLEET.perLanded * landed;
      const on = wasFleet ? (s.stock.velum >= need) : (s.stock.velum >= need * 3);
      if (need > 0 && on) {
        s.stock.velum -= need;
        Econ.note('velum', 0, need);
        C.fleetLift = TUNE.FLEET.lift;
      }
    }

    if (!!C.swept !== wasSwept && !offline) Grid.recomputeBlocks(s);

    C.offerRelief = 0;
    if (Econ.trophicActive(s)) {
      let best = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.offerRelief || b.mothballed || b.done === false || b.block) continue;
        best = Math.max(best, d.offerRelief);
      }
      if (best > 0) {
        const O = TUNE.PRED.offering;
        const need = O.perHead * Game.totalResidents(s) * Econ.M;
        if (need > 0 && s.stock[O.good] >= need) {
          s.stock[O.good] -= need;
          Econ.note(O.good, 0, need);
          C.offerRelief = best;
        }
      }
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

      b.uBill = 0;
      if (b.mothballed) {
        b.uBill = d.upkeep * TUNE.MOTHBALL_UPKEEP * Econ.M;
        upkeep += b.uBill;
      } else {
        if (b.resting) uBase *= TUNE.FALLOW_UPKEEP;
        else if (d.workers) uBase *= TUNE.STAFF_UPKEEP_FLOOR +
          (1 - TUNE.STAFF_UPKEEP_FLOOR) * (b.staff / d.workers);

        uBase *= Econ.blockUpkeep(s, b);
        const uFull = uBase * b.supply * b.trade;
        b.uBill = uFull * Econ.M;
        upkeep += b.uBill;
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
            UI.toast('\u{1F4E6} ' + eraVoice(s.era).ration + ' ' +
              'Your ' + eraVoice(s.era).place + ' stands on its own economy now.', 11000);
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
      } else if (d.dues && !b.mothballed) {

        if (b.block) b.status = b.block;
        else if (b.staff === 0) b.status = 'no_staff';
        else {
          b.status = b.staff < d.workers ? 'understaffed' : 'ok';
          const dues = Econ.duesPer(s, d) * Grid.residentsWithin(s, b, TUNE.DUES.radius) *
            (b.staff / d.workers) * Econ.M;
          income += dues;
          C.tickDues += dues;
        }
      } else if (d.oxTeam && !b.mothballed) {
        b.status = b.block ? b.block
          : b.staff === 0 ? 'no_staff'
          : C.fedByres.has(b.id) ? (b.staff < d.workers ? 'understaffed' : 'ok')
          : 'no_input';
      } else if (d.workers && !d.out && !d.procIn && !d.sells && !d.sellsRaw && !b.mothballed) {

        b.status = b.block ? b.block
          : b.staff === 0 ? 'no_staff'
          : b.staff < d.workers ? 'understaffed' : 'ok';
      } else if (!d.workers && !d.cap && !b.mothballed) {

        b.status = b.block || 'ok';
      }
    }

    for (const b of byPlaced) {
      const d = DEF(b.type);
      if (!d.out || (!d.workers && !d.selfRun) || b.mothballed) continue;
      if (d.oxTeam) continue;

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

      const staffEff = d.workers ? b.staff / d.workers : 1;
      b.lastStaffEff = staffEff;
      if (d.workers && b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }

      let made = 0, outKind = null;
      if (d.out.grain) {

        b.soil = Grid.soilUnder(b);
        const soilMult = TUNE.SOIL.minYield + (1 - TUNE.SOIL.minYield) * b.soil;

        const oxen = Econ.oxBonusFor(b);

        const mult = (1 + TUNE.FERTILE_BONUS * (b.fertile || 0)) *
                     (1 + (b.adjBoost || 0)) * (1 + oxen) * soilMult * rankOutMult(b) *
                     Econ.siteMult(s, b);

        made = d.out.grain * staffEff * mult * Econ.M * (1 + C.beerBonus) * (C.nileMult || 1);
        Econ.addStock(s, 'grain', made);
        outKind = 'grain';
      } else if (d.out.clay || d.out.wool) {

        const kind = d.out.clay ? 'clay' : 'wool';
        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b) * Econ.siteMult(s, b);
        made = d.out[kind] * staffEff * mult * Econ.M * (1 + C.beerBonus);
        Econ.addStock(s, kind, made);
        outKind = kind;
      } else if (d.out.dates || d.out.fish || d.out.salt || d.out.reeds || d.out.sesame ||
                 d.out.forage) {

        const kind = Object.keys(d.out)[0];

        const oxen = Econ.oxBonusFor(b);

        let mult = (1 + (b.adjBoost || 0)) * (1 + oxen) * rankOutMult(b) * Econ.siteMult(s, b);
        if (d.saltProof) {
          b.soil = Grid.soilUnder(b);
          if (b.soil < 0.3) mult *= 1.5;
        } else if (d.slowSalt) {
          b.soil = Grid.soilUnder(b);
          mult *= TUNE.SOIL.minYield + (1 - TUNE.SOIL.minYield) * b.soil;
        }
        made = d.out[kind] * staffEff * mult * Econ.M * (1 + C.beerBonus);
        Econ.addStock(s, kind, made);
        outKind = kind;
      } else if (d.out.deadwood) {

        const left = Econ.cutterWoodLeft(b);
        b.woodLeft = left;

        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b) * Econ.siteMult(s, b);
        made = left > 0 ? Math.min(left, d.out.deadwood * staffEff * mult * Econ.M * (1 + C.beerBonus)) : 0;

        made = Math.min(made, Math.max(0, Econ.capOf(s, 'deadwood') - s.stock.deadwood));
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
        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b) * Econ.siteMult(s, b);
        made = d.out[kind] * staffEff * mult * Econ.M * (1 + C.beerBonus);
        Econ.addStock(s, kind, made);
        outKind = kind;
      } else if (d.quarried) {

        const good = Object.keys(d.out)[0];
        const left = Econ.quarryStoneLeft(b);
        b.stoneLeft = left;

        const rf = good === 'stone' ? (0.5 + 0.5 * (b.rockFrac || 0)) : 1;

        const mult = rf * (1 + (b.adjBoost || 0)) * rankOutMult(b) *
          Econ.mineMult(s, b) * Econ.siteMult(s, b);
        made = left > 0 ? d.out[good] * staffEff * mult * Econ.M * (1 + C.beerBonus) : 0;

        made = Math.min(made, Math.max(0, Econ.capOf(s, good) - s.stock[good]));
        if (made > 0) {
          Econ.spendQuarry(s, b, made);
          Econ.addStock(s, good, made);
          if (good === 'stone') s.cum.stone += made;
        }
        b.rate = made;

        b.status = left <= 0 ? 'stand_spent' : (staffEff < 1 ? 'understaffed' : 'ok');
        continue;
      } else if (d.salvaged) {

        const good = Object.keys(d.out)[0];
        const left = Econ.ruinSpoliaLeft(s, b);
        b.stoneLeft = left;
        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b) * Econ.siteMult(s, b);
        made = left > 0 ? d.out[good] * staffEff * mult * Econ.M * (1 + C.beerBonus) : 0;

        made = Math.min(made, Math.max(0, Econ.capOf(s, good) - s.stock[good]));
        made = Math.min(made, left);
        if (made > 0) {
          Econ.spendRuin(s, b, made);
          Econ.addStock(s, good, made);
        }
        b.rate = made;
        b.status = left <= 0 ? 'stand_spent' : (staffEff < 1 ? 'understaffed' : 'ok');
        continue;
      } else if (d.out) {

        const kind = Object.keys(d.out)[0];
        const mult = (1 + (b.adjBoost || 0)) * rankOutMult(b) *
          Econ.mineMult(s, b) * Econ.siteMult(s, b);
        made = d.out[kind] * staffEff * mult * Econ.M * (1 + C.beerBonus);
        Econ.addStock(s, kind, made);
        outKind = kind;
      }

      if (outKind && made > 0) Econ.noteFood(s, outKind, made);
      b.rate = made;

      b.status = staffEff < 1 ? 'understaffed'
        : (b.headDry && Econ.cascadeActive(s)) ? 'no_head'
        : ((b.forageCrowd | 0) > 0 && Econ.rangeActive(s)) ? 'crowded' : 'ok';
    }

    Econ.waterTick(s, offline);

    const procs = byPlaced.filter(b => { const d = DEF(b.type);
      return d.procIn && (d.workers || d.selfRun) && !b.mothballed; });

    procs.sort((a, b) =>
      ((DEF(b.type).procOut === 'flour') ? 1 : 0) - ((DEF(a.type).procOut === 'flour') ? 1 : 0) ||
      a.placed - b.placed);
    for (const b of procs) {
      const d = DEF(b.type);
      if (b.block) { b.status = b.block; b.rate = 0; continue; }
      const staffEff = d.workers ? b.staff / d.workers : 1;
      if (d.workers && b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }

      b.bureauSlow = Econ.anyAuraLive(b.bureauSlowBy);
      const slow = b.bureauSlow ? (1 - TUNE.BUREAU.slow) : 1;

      const want = d.procRate * staffEff * (1 + (b.adjBoost || 0)) *
        rankOutMult(b) * slow * Econ.M * (1 + C.beerBonus) * Econ.mineMult(s, b) *
        Econ.blockMult(s, b);
      const use = Math.min(want, s.stock[d.procIn]);
      s.stock[d.procIn] -= use;
      Econ.note(d.procIn, 0, use);
      if (d.procIn === 'grain') {
        C.grainDraw[d.procOut === 'flour' ? 'mill' : 'brewery'] += use;
      }

      const made = Econ.levySkim(s, b, use * d.procRatio);
      Econ.addStock(s, d.procOut, made);

      if (d.procOut === 'flour') { flourMade += made; s.cum.flour += made; }

      if (d.procOut === 'passage') s.cum.passage = (s.cum.passage || 0) + made;
      if (made > 0) Econ.noteFood(s, d.procOut, made);
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

      const capEquiv = Econ.opsonCap(s, f.kind) * demand;
      const useEquiv = Math.min(shortfall, have * f.eff, capEquiv);
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

    shortfall -= Econ.annonaBuy(s, shortfall, s.money - upkeep, offline);
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
        UI.toast('\u{1F37D}\u{FE0F} Your ' + eraVoice(s.era).place + ' is going hungry — newcomers are turning away. Check the Tally (T): ' +
          'is the ' + eraVoice(s.era).mill + ' starving, or are there simply too many mouths?', 10000);
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

    if (s.hunger >= 1 && s.tick % 10 === 0) Econ.removeResident(s, houses, 'famine');
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
      if (d.workers && b.staff === 0) { b.status = 'no_staff'; b.rate = 0; continue; }
      const staffEff = d.workers ? b.staff / d.workers : 1;

      const cust = b.customers != null ? b.customers : Grid.customerSurvey(s, b).n;
      if (cust < d.custMin) { b.status = 'no_customers'; b.rate = 0; continue; }

      const scribeMult = b.scribed ? (1 + TUNE.SCRIBE.bonus) : 1;

      const throughput = staffEff * scribeMult * rankOutMult(b) * Econ.blockMult(s, b) *
        Econ.tableShopMult(s) * Econ.M * (1 + C.beerBonus);

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

          const kEff = foodEff(k);
          const foodKeep = kEff > 0
            ? residents * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO * reserveMin / kEff : 0;
          const avail = (s.stock[k] || 0) - (monRes[k] || 0) - fKeep - foodKeep;
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

        const sellEff = foodEff(d.sells);
        const keep = (sellEff > 0
          ? residents * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO * reserveMin / sellEff : 0) +
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

      }
    }

    const monDrawn = Econ.buildMonuments(s, offline);

    income += C.tickExport;

    upkeep += C.tickAnnona;

    if (C.monBoost) {
      C.tickMonBonus = income * C.monBoost;
      income += C.tickMonBonus;
    }
    s.money += income - upkeep;
    s.cum.earned += Math.max(0, income - upkeep);

    Econ.arrearsTick(s, offline);
    Econ.repairTick(s, offline);
    const flow = income - upkeep - monDrawn;

    C.net = C.ratesDirty ? flow : C.net * 0.9 + flow * 0.1;
    C.tickMonSpend = monDrawn;

    if (!offline && s.money < 0) UI.firstToast('broke', 'Out of money. Upkeep still runs — mothball or demolish something, import nothing, and wait on the trickle from your ' + anchorFor(s.era).name + '. A mothballed building costs a fifth of its upkeep.');

    if (!offline) {
      const perMin = C.net * 60;
      if (perMin > 0.5) { C.posTicks = (C.posTicks || 0) + 1; C.negTicks = 0; }
      else if (perMin < -0.5) { C.negTicks = (C.negTicks || 0) + 1; C.posTicks = 0; }
      else { C.posTicks = 0; C.negTicks = 0; }
      if (C.posTicks === 60 && !s.firsts.breakeven) {
        s.firsts.breakeven = 1;
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

    const free = supplyFree(s);
    if (best <= free) return 1;
    return Math.min(SP.maxMultiplier, 1 + (best - free) / SP.premiumPer);
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
        UI.toast('\u{1F9C2} THE LAND IS SALTING — ' + eraVoice(s.era).saltName + '. This field is under half soil ' +
          'and fading. The answers: REST it (its own panel), ' + eraVoice(s.era).saltAnswers +
          '. Press O twice for the salt overlay.', 16000);
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

  rockTiles(s, b) {
    const R = DEF(b.type).rockRadius;
    const out = [];
    if (!R) {
      Grid.tilesOf(b, (tx, ty) => {
        if (Grid.inB(tx, ty) && G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.ROCK) out.push([tx, ty]);
      });
      return out;
    }
    const ver = (G.cache.rockVer || 0);
    if (b._rockV === ver && b._rockT) return b._rockT;
    const dm = Grid.dimsOf(b);
    const cx = b.x + (dm.w - 1) / 2, cy = b.y + (dm.h - 1) / 2;
    for (let ty = Math.floor(cy - R); ty <= Math.ceil(cy + R); ty++)
      for (let tx = Math.floor(cx - R); tx <= Math.ceil(cx + R); tx++) {
        if (!Grid.inB(tx, ty)) continue;
        const dx = tx - cx, dy = ty - cy;
        if (dx * dx + dy * dy > R * R) continue;
        if (G.cache.terrain[Grid.key(tx, ty)] === TERRAIN.ROCK) out.push([tx, ty]);
      }

    out.sort((p, q) => ((p[0]-cx)**2 + (p[1]-cy)**2) - ((q[0]-cx)**2 + (q[1]-cy)**2));
    b._rockV = ver; b._rockT = out;
    return out;
  },
  quarryStoneLeft(b) {
    let left = 0;
    for (const [tx, ty] of Econ.rockTiles(G.s, b)) left += Grid.stoneAt(tx, ty);
    return left;
  },

  groundMult(b) {
    return Grid.goodGround(G.s, b) ? (1 + (TUNE.TERRAIN_BONUS || 0)) : 1;
  },

  siteMult(s, b) {
    return Econ.groundMult(b) * Econ.forageMult(s, b) * Econ.blockMult(s, b) *
           Econ.headMult(s, b);
  },

  oxFodder(d) { return (d && d.oxFodder) || TUNE.OX.fodder; },
  oxRadius(d) { return (d && d.oxRadius) || TUNE.OX.radius; },
  oxBonus(d)  { return (d && d.oxBonus)  || TUNE.OX.bonus; },

  ovenReach(d)   { return (d && d.ovenRadius)   || TUNE.OVEN.radius; },
  scribeReach(d) { return (d && d.scribeRadius) || TUNE.SCRIBE.radius; },
  weighReach(d)  { return (d && d.weighRadius)  || TUNE.WEIGH.radius; },

  oxBonusFor(b) {
    const by = G.cache.byId, fed = G.cache.fedByres;
    let best = 0;
    for (const id of (b.oxNear || [])) {
      if (!fed || !fed.has(id)) continue;
      const o = by && by.get ? by.get(id) : null;
      if (!o) continue;
      const v = Econ.oxBonus(DEF(o.type));
      if (v > best) best = v;
    }
    return best;
  },

  woodTiles(s, b) {
    const d = DEF(b.type), R = d.woodRadius;
    const out = [];

    if (!R) {
      const dm0 = Grid.dimsOf(b);
      const cx0 = b.x + (dm0.w - 1) / 2, cy0 = b.y + (dm0.h - 1) / 2;
      const WANT = 12, MAX = TUNE.WORLD;
      for (let r = 0; r <= MAX && out.length < WANT; r++) {
        for (let dy = -r; dy <= r; dy++) {
          const ady = Math.abs(dy);
          for (let dx = -r; dx <= r; dx++) {

            if (r > 0 && ady !== r && Math.abs(dx) !== r) continue;
            const tx = Math.round(cx0) + dx, ty = Math.round(cy0) + dy;
            if (!Grid.inB(tx, ty)) continue;
            if (Grid.woodAt(s, tx, ty) > 0) out.push([tx, ty]);
          }
        }
      }
      return out;
    }
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

    if (!DEF(b.type).woodRadius) return Math.max(0, (G.cache && G.cache.forestLeft) || 0);
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

    const tiles = Econ.rockTiles(s, b).filter(([tx, ty]) => Grid.stoneAt(tx, ty) > 0);
    if (!tiles.length) return;
    let exhausted = false, rest = amt;
    for (const [tx, ty] of tiles) {
      if (rest <= 0) break;
      const take = Math.min(rest, Grid.stoneAt(tx, ty));
      rest -= take;
      if (Grid.spendStone(s, tx, ty, take)) exhausted = true;
    }
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

    let away = 0;
    for (const b of s.buildings) if (b.hunt) away += b.hunt.party || 0;
    if (away > 0) open = Math.max(0, open - away);
    C.openHousing = open;

    let why = 'ok';
    if (!houses.length) why = 'nohouse';
    else if (s.hunger >= M.hungerStop) why = 'hungry';

    else if ((s.chill || 0) >= TUNE.COLD.stopGrowth) why = 'cold';
    else if (blocked === houses.length) why = 'blocked';

    else if (open <= 0 && !(Econ.foodRate() > 0)) why = 'nofood';
    else if (open <= 0) why = 'full';

    else if (Econ.passageLeft(s) < 1) why = 'nopassage';
    C.migrateWhy = why;

    if (why !== 'ok') {
      C.migrateRate = 0;

      s.settlerAcc = Math.min(s.settlerAcc || 0, 0.6);

      return;
    }

    let rate = Econ.calvingRate(s) * Math.min(1, M.floor + open / M.openFull);

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

      if (Econ.passageLeft(s) < 1) { s.settlerAcc = Math.min(s.settlerAcc, 0.99); break; }
      Econ.spendPassage(s);
      beds[i].residents++;
      s.settlerAcc -= 1;
      if (s.records) s.records.settlers = (s.records.settlers || 0) + 1;

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

          const name = settlerName(s);
          if (window.Rend && Rend.focusOn) Rend.focusOn(beds[i]);
          UI.toast('\u{1F3E0} ' + name + ' has settled in your ' + eraVoice(s.era).place + ' — the first of many. ' +
            'Residents staff your buildings and eat your food: grow both together.', 12000);
          Econ.log(s, '\u{1F3E0}', name + ' arrived — the first settler.');
        } else {

          UI.firstToast('movein', 'A settler moved in. Residents staff your buildings — and eat your ' +
            eraStaple(s.era).cookedName.toLowerCase() + ', so grow the food before you grow the town.');
        }
      }
    }
  },

  EVOLVE_TICKS: 40,

  NEIGHBOURS_FOR_RUNG2: 1,

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
    return { level: lvl + 1, cost: houseUpgradeCost(s.era, lvl, DEF(h.type)), name: houseLevelName(s.era, lvl + 1, DEF(h.type)) };
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

            const hd = DEF(h.type);
            Econ.floater(h, '▲ ' + houseLevelName(s.era, h.level, hd) + ' · +' +
              Math.max(0, houseCap(hd, h) - houseCap(hd, { level: h.level - 1 })) + ' beds');
            UI.firstToast('evolve', 'Standing among neighbours, a ' + houseLevelName(s.era, h.level - 1, hd) + ' has become a ' + houseLevelName(s.era, h.level, hd) + '. Build homes close together and they improve on their own — anything grander than this you buy, from the house\'s own panel.');
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
    const need = monumentBuild(b.type, defEra(d));
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

  monumentRate(s, k) {
    const base = MONUMENT_RATE[k] || 6;
    const gift = Math.pow(1 + TUNE.GIFT_ARENA_STEP, ((s && s.giftArena) | 0));
    if (!Econ.gridActive(s)) return base * gift;
    return base * gift * (TUNE.GRID.monBase + TUNE.GRID.monPerFrac * (G.cache.gridFrac || 0));
  },

  monumentReserve(s) {
    const res = {};
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.monument || b.complete || b.halted || b.done === false) continue;
      if (Econ.blockOf(b)) continue;
      const need = monumentBuild(b.type, defEra(d));
      for (const k in need) {
        if (k === 'money') continue;
        const want = need[k] - ((b.delivered || {})[k] || 0);
        if (want <= 0) continue;
        res[k] = (res[k] || 0) +
          Math.min(want, Econ.monumentRate(s, k) * Econ.M * TUNE.MON_RESERVE_TICKS);
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
      const need = monumentBuild(b.type, defEra(d));
      b.delivered = b.delivered || {};

      b.block = Econ.blockOf(b);
      if (b.block) { b.status = b.block; continue; }

      if (b.halted) { b.status = 'halted'; continue; }

      let moved = false;
      for (const k in need) {
        let want = need[k] - (b.delivered[k] || 0);
        if (want <= 0) continue;
        const rate = Econ.monumentRate(s, k) * Econ.M;
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
          UI.toast('\u{1F3DB}️ THE ' + d.name.toUpperCase() + ' IS FINISHED. It begins earning at once — ' +
            'and it is the single largest contributor to your real rent in this age.', 12000);
        }
      }
    }
    return moneyDrawn;
  },

  nextEra(s) { return nextWrittenEra(s.era); },

  noteFood(s, kind, made) {
    const eff = foodEff(kind);
    if (eff > 0) s.cum.food = (s.cum.food || 0) + made * eff;
  },

  cumFood(s) { return s.cum.food != null ? s.cum.food : (s.cum.flour || 0); },
  baseFood(base) {
    if (!base) return 0;
    return base.food != null ? base.food : (base.flour || 0);
  },

  foodRate() {
    const T = G.cache.tally || {};
    let r = 0;
    for (const f of TUNE.FOODS) r += ((T[f.kind] && T[f.kind].made) || 0) * f.eff;
    return r;
  },

  eraReady(s) {
    const next = Econ.nextEra(s);
    if (!next) return false;

    if (Econ.trophicActive(s)) return Econ.prologueGate(s).ready;
    const r = eraReq(s.era + 1);

    const base = s.eraBase || {};

    return Econ.countedResidents(s) >= r.pop && s.money >= r.money &&
           (Econ.cumFood(s) - Econ.baseFood(base)) >= r.food &&
           (s.cum.stone - (base.stone || 0)) >= r.stone &&
           Econ.eraExtraGate(s) &&
           Econ.monumentDone(s, s.era);
  },

  ERA_EXTRA_GATE: {

    10: (s) => Econ.opsonTable(s).laid >= 0.95,

    11: (s) => Econ.censusState(s).frac >= TUNE.CENSUS.gateFrac,

    12: (s, base) => (s.cum.passage || 0) - (base.passage || 0) >= TUNE.PASSAGE.gateLanded,

    13: (s) => Econ.annonaState(s).premium <= TUNE.ANNONA.gatePremium,

    15: (s) => Econ.chainsRunning(s, 15) >= 3,
    2: (s, base) => (s.cum.tributePaid || 0) - (base.tributePaid || 0) >= TUNE.TRIBUTE.gate,

    6: (s) => (G.cache.gridFrac || 0) >= TUNE.GRID.gateFrac,

    7: (s) => {
      const f = Econ.rationForecast(s);
      return f.billable > 0 && f.administered >= f.billable * TUNE.MAGAZINE.gateFrac;
    },

    8: (s) => {
      const f = Econ.cascadeForecast(s);
      return f.drawers >= TUNE.CASCADE.gateFields && f.frac >= TUNE.CASCADE.gateFrac;
    },

    9: (s) => Econ.reachForecast(s).landfalls >= TUNE.VOYAGE.gateLandfalls,
  },
  eraExtraGate(s) {
    const f = Econ.ERA_EXTRA_GATE[rungOf(s.era)];
    return f ? f(s, s.eraBase || {}) : true;
  },

  ERA_EXTRA_LABEL: {
    2:  'The quota is paid',
    6:  'Most of the town is planned',
    7:  'The magazines administer the roll',
    8:  'The fans are fed',
    9:  'Crossings made to other islands',
    10: 'The table is laid',
    11: 'The register is current',
    12: 'Berths landed for arrivals',
    13: 'The grain bill is under control',

    15: 'Three chains are still selling',
  },
  eraExtraLabel(s) {
    const r = rungOf(s.era);
    if (!Econ.ERA_EXTRA_GATE[r]) return null;
    return Econ.ERA_EXTRA_LABEL[r] || 'This age’s own condition';
  },

  monumentFor(era) {
    const e = rungOf(era);
    for (const k in BUILDINGS) {
      const d = BUILDINGS[k];
      if (d.monument && defEra(d) === e) return { key: k, def: d };
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
      if (defEra(d) !== era || d.noBuild || d.fixed) continue;
      if (d.monument) out.monument = d;
      else out.buildings.push(d);
    }
    for (const k in UPGRADES) {
      const u = UPGRADES[k];
      if (defEra(u) === era) out.upgrades.push(u);
    }
    return out;
  },

  migrateStalePrestige(s) {
    if (!s || rungOf(s.era) <= 1) return null;
    const stale = s.buildings.filter(b => {
      const d = DEF(b.type);
      if (!d || b.relic || d.fixed || b.type === 'road') return false;
      return defEra(d) < s.era;
    });
    if (!stale.length) return null;

    const carried = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (d && d.monument && b.complete && !b.relic) {
        carried.push({ type: b.type, era: defEra(d), name: d.name });
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

    s.cleared = {}; s.planted = {}; s.terraEdits = {}; s.elevEdits = {};
    s.soilEdits = {}; s.rockSpent = {};

    s.woodSpent = {}; s.herds = null; s.hunt = null; s.chill = 0;
    s.nextId = 1; s.placeCounter = 0;

    s.hallLevel = Math.min(s.era, 4); s.hallJob = null;
    s.hunger = 0; s.settlerAcc = 0; s.festival = null;

    s.founded = false;
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
        carried.push({ type: b.type, era: defEra(d), name: d.name });
      }
    }
    s.relics = (s.relics || []).concat(carried);

    const wasPop = Game.totalResidents(s), wasMoney = s.money, wasBuildings = s.buildings.length;

    s.era = Econ.nextEra(s);

    s.eraBase = { flour: s.cum.flour, food: Econ.cumFood(s), stone: s.cum.stone,
                  tributePaid: s.cum.tributePaid || 0,
                  landfalls: s.cum.landfalls || 0 };

    s.tribute = { bank: 0, count: 0, missed: 0, due: TUNE.TRIBUTE.firstAt * 60 };
    s.unrest = 0; s.struck = 0; s.conscripted = 0;
    const era = eraInfo(s.era);

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

    Econ.closeRegister(s);

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
    return Econ.siteBlock(b, d) || Econ.stateBlock(b, d);
  },

  siteBlock(b, d) {
    d = d || DEF(b.type);

    if (d.needsRoad && !b.conn) return 'no_road';
    if (d.needsWater && !Grid.covered(G.cache.water, b)) return 'no_water';
    if (d.needsPower && !Grid.covered(G.cache.power, b)) return 'no_power';
    return null;
  },

  stateBlock(b, d) {
    d = d || DEF(b.type);

    if (d.needsWarm && (!G.cache.warm || !Grid.covered(G.cache.warm, b))) return 'no_warmth';

    if (d.mines && G.s && G.s.struck && Econ.levyActive(G.s)) return 'struck';

    if (d.needsBlock && !b.inBlock) return 'no_block';

    if (b.noIssue && Econ.magazineActive(G.s || {})) return 'no_magazine';

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

  canalActive(s) { return rungOf(s.era) === 4; },

  siltSources(s) {
    let n = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.waterRadius || b.mothballed || b.done === false) continue;
      n++;
    }
    return n;
  },

  dredgeRate(s) {
    let w = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.dredge || b.mothballed || b.done === false || b.block) continue;
      w += (b.staff || 0) * (d.dredgePower || 1);
    }
    return w * TUNE.SILT.dredgePerWorker;
  },

  siltForecast(s) {
    const gain = Econ.siltSources(s) * TUNE.SILT.perSource;
    const clear = Econ.dredgeRate(s);
    const net = gain - clear;
    const silt = s.silt || 0;
    if (net <= 0) {
      return { net, gain, clear, silt, secs: Infinity,
               text: silt > 0.01 ? 'the crews are gaining on it' : 'the channels run clear' };
    }

    const secs = (1 - silt) / (net * Econ.M);
    return { net, gain, clear, silt, secs,
             text: Math.round(secs) + 's until the canals choke' };
  },

  canalReach(s) {
    if (!Econ.canalActive(s)) return 1;
    return Math.max(0, 1 - TUNE.SILT.reachLoss * (s.silt || 0));
  },

  siltTick(s, offline) {
    const C = G.cache;
    C.siltNet = 0;
    if (!Econ.canalActive(s)) { C.siltChoked = false; return; }
    const f = Econ.siltForecast(s);
    C.siltNet = f.net;

    if (!offline) s.silt = Util.clamp((s.silt || 0) + f.net * Econ.M, 0, 1);
    C.siltChoked = (s.silt || 0) >= 0.999;

    if (offline) return;
    if ((s.silt || 0) < TUNE.SILT.rearmAt) C.siltTold = 0;
    else if (!C.siltTold && (s.silt || 0) >= TUNE.SILT.warnAt) {
      C.siltTold = 1;
      Econ.log(s, '\u{1F6F6}', 'The channels are silting — the wells reach less ground than they did.');
      UI.toast('\u{1F6F6} THE CANALS ARE SILTING — ' + Math.round((s.silt || 0) * 100) +
        '% choked, and every well is already reaching less ground. ' +
        Econ.siltSources(s) + ' wells lay down ' + (f.gain * TUNE.TEMPO).toFixed(2) +
        '/min; your crews clear ' + (f.clear * TUNE.TEMPO).toFixed(2) +
        '/min. Build a DREDGING CREW — about one per two wells. Another well makes it worse, ' +
        'not better: it is one more channel to keep clear.', 15000);
    }
  },

  rangeActive(s) { return rungOf(s.era) === 3; },

  forageRadiusOf(s, b) {
    const d = DEF(b.type);
    if (!d || !d.forageRadius) return 0;
    const r = d.forageRadius + rankRadiusBonus(b);

    return s.policyMoveCamps ? Math.max(1, Math.ceil(r * TUNE.MOVING.radiusCut)) : r;
  },

  campLive(b) {
    return !!b && !b.mothballed && !b.resting && !b.block && b.done !== false;
  },

  forageNeighbours(s, b) {
    let n = 0;
    const by = G.cache.byId;
    for (const id of (b.forageNear || [])) {
      const o = by && by.get ? by.get(id) : null;
      if (!Econ.campLive(o)) continue;
      n++;
    }
    return n;
  },

  forageMult(s, b) {
    if (!Econ.rangeActive(s)) return 1;
    const d = DEF(b.type);
    if (!d || !d.forageRadius) return 1;
    const n = Econ.forageNeighbours(s, b);
    b.forageCrowd = n;
    return Math.max(TUNE.FORAGE.floor, 1 / (1 + TUNE.FORAGE.crowd * n)) *
           (s.policyMoveCamps ? (1 - TUNE.MOVING.slow) : 1);
  },

  forageHarvest(s) {
    const lost = {};
    if (!Econ.rangeActive(s)) return { raw: 0, actual: 0, frac: 1, crowded: 0, camps: 0, lost };
    let raw = 0, actual = 0, crowded = 0, camps = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);

      if (!d || !d.forageRadius || !d.out || !Econ.campLive(b)) continue;
      const kind = Object.keys(d.out)[0], base = d.out[kind];
      const m = Econ.forageMult(s, b);
      camps++; if ((b.forageCrowd | 0) > 0) crowded++;
      raw += base; actual += base * m;
      lost[kind] = (lost[kind] || 0) + base * (1 - m);
    }
    return { raw, actual, frac: raw > 0 ? actual / raw : 1, crowded, camps, lost };
  },

  gridActive(s) { return rungOf(s.era) === 6; },

  drainReach(s, d) {
    const own = (d && d.drainRadius) || TUNE.GRID.drainRadius;
    return (G.cache && G.cache.swept) ? Math.max(own, TUNE.SWEEP.radius) : own;
  },

  blockLive(s, b) { return !!(b && b.inBlock) && Econ.gridActive(s); },

  blockMult(s, b) { return Econ.blockLive(s, b) ? 1 + TUNE.GRID.bonus : 1; },
  blockUpkeep(s, b) { return Econ.blockLive(s, b) ? 1 - TUNE.GRID.upkeepCut : 1; },

  gridForecast(s) {
    const C = G.cache;
    const out = { frac: 0, blocks: 0, inBlocks: 0, atRisk: 0, atRiskBuildings: 0,
                  best: null, text: 'no blocks yet' };
    if (!Econ.gridActive(s)) return out;
    out.frac = C.gridFrac || 0;
    out.blocks = (C.blocks || []).length;
    for (const b of s.buildings) if (b.inBlock) out.inBlocks++;
    for (const blk of (C.blocks || [])) {
      if (blk.drains.length !== 1) continue;
      out.atRisk++;
      out.atRiskBuildings += blk.count;
    }

    out.best = C.blockNearMiss || null;
    out.text = out.blocks
      ? out.blocks + (out.blocks === 1 ? ' block' : ' blocks') + ' · ' + out.inBlocks + ' inside'
      : (out.best ? out.best.short + ' is ' + out.best.missing + ' tiles short' : 'no blocks yet');
    return out;
  },

  magazineActive(s) { return rungOf(s.era) === 7; },

  onLedger(d) {
    return !!d && !d.offLedger && !!(d.out || d.procIn || d.sells || d.sellsRaw);
  },

  magReach(s, d, b) {
    if (!d || !d.magazineRadius) return 0;
    return d.magazineRadius + (b ? rankRadiusBonus(b) : 0) + ((s && s.giftIssue) | 0) +
      ((G.cache && G.cache.wideIssue) ? TUNE.WIDEISSUE.widen : 0);
  },

  stampMagazine(s) {
    const C = G.cache;
    C.magazine.fill(0);
    if (!Econ.magazineActive(s)) return;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.magazineRadius || b.mothballed) continue;
      if (!b.conn || (d.workers && !(b.staff > 0))) continue;
      Grid.stampRadiusCircle(C.magazine, b, Econ.magReach(s, d, b));
    }
  },

  rationTick(s, offline) {
    const C = G.cache;
    C.roll = null;
    if (!Econ.magazineActive(s)) return;

    const mags = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.magazineRadius || b.mothballed) continue;
      if (!b.conn || (d.workers && !(b.staff > 0))) continue;
      mags.push(b);
    }
    const roll = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!Econ.onLedger(d)) continue;
      b.noIssue = false;
      if (b.done === false || b.mothballed || b.resting) continue;

      if (b.block && b.block !== 'no_magazine') continue;
      if (!Grid.covered(C.magazine, b)) { b.noIssue = true; continue; }
      let near = Infinity;
      for (const m of mags) { const g = Grid.gap(b, m); if (g < near) near = g; }
      roll.push({ b, near });
    }
    roll.sort((x, y) => x.near - y.near || x.b.placed - y.b.placed);

    const R = TUNE.MAGAZINE;
    const mult = C.wideIssue ? TUNE.WIDEISSUE.mult : 1;
    const legs = {};
    let cap = Infinity, bind = null;
    for (const g in R.issuePer) {
      const per = R.issuePer[g] * mult;
      const have = s.stock[g] || 0;
      const n = Math.floor(have / (per * R.reserveMin));
      legs[g] = { stock: have, per: per, cap: n };
      if (n < cap) { cap = n; bind = g; }
    }
    cap = R.freeAdmin + (cap === Infinity ? 0 : cap);
    const admin = Math.min(roll.length, cap);

    const billed = Math.max(0, admin - R.freeAdmin);
    for (const g in R.issuePer) {
      const want = billed * R.issuePer[g] * mult * Econ.M;
      if (want <= 0) continue;
      const take = Math.min(want, s.stock[g] || 0);
      s.stock[g] -= take;
      Econ.note(g, 0, take);
    }
    for (let i = admin; i < roll.length; i++) roll[i].b.noIssue = true;

    C.roll = { billable: roll.length, administered: admin, cap: cap,
                 free: R.freeAdmin, legs: legs, bind: bind, mags: mags.length };
  },

  rationForecast(s) {
    const out = { active: false, billable: 0, administered: 0, cap: 0, room: 0,
                  short: 0, bind: null, mags: 0, text: 'no magazine yet', secs: 0 };
    if (!Econ.magazineActive(s)) return out;
    const r = (G.cache && G.cache.roll) || null;
    out.active = true;
    if (!r) return out;
    out.billable = r.billable; out.administered = r.administered;
    out.cap = r.cap; out.bind = r.bind; out.mags = r.mags;
    out.room = Math.max(0, r.cap - r.billable);
    out.short = Math.max(0, r.billable - r.administered);

    const billed = Math.max(0, r.administered - r.free);
    if (billed > 0 && r.bind) {
      const perMin = billed * r.legs[r.bind].per;
      if (perMin > 0) out.secs = (r.legs[r.bind].stock / perMin) / TUNE.TEMPO * 60;
    }
    out.text = r.billable
      ? r.administered + ' / ' + r.billable + (out.short ? ' · ' + out.short + ' unissued'
                                                         : ' · room for ' + out.room)
      : 'nothing on the ledger';
    return out;
  },

  cascadeActive(s) { return rungOf(s.era) === 8; },

  headNeed(b) {
    const d = DEF(b.type);
    if (!d || !d.cascadeDraw) return 0;
    return d.cascadeDraw * rankOutMult(b);
  },

  gateHead(s, d) {
    return (d.cascadeSource || 0) + ((G.cache && G.cache.revetAdd) || 0);
  },

  cascadeTick(s) {
    const C = G.cache;
    C.cascade = null;
    if (!Econ.cascadeActive(s)) return;
    const K = TUNE.CASCADE;

    const net = new Map();
    const gates = [], drawers = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d) continue;
      if (d.cascadeSource) {
        b.headOut = 0;
        if (b.done !== false && Econ.campLive(b) && (!d.workers || b.staff > 0)) gates.push(b);
      }
      if (!(d.cascadeCarry || d.cascadeCut || d.cascadeDraw)) continue;
      if (b.done === false) continue;
      if (d.cascadeDraw) { b.headIn = 0; b.headDry = true; b.headBlock = 'unreached'; }
      const live = Econ.campLive(b) && (!d.workers || b.staff > 0);

      if (!live && !d.cascadeDraw) continue;
      Grid.tilesOf(b, (x, y) => { if (Grid.inB(x, y)) net.set(Grid.key(x, y), b); });
      if (d.cascadeDraw && live) drawers.push(b);
    }
    gates.sort((a, b) => a.placed - b.placed);

    let emitted = 0, drawn = 0, spare = 0;
    const served = new Set(), touched = new Set();
    let breakAt = null;
    for (const g of gates) {
      const gd = DEF(g.type);
      const source = Econ.gateHead(s, gd);
      emitted += source;
      let budget = source;

      const seen = new Set();
      const q = [];
      Grid.tilesOf(g, (x, y) => {
        if (!Grid.inB(x, y)) return;
        seen.add(Grid.key(x, y));
        q.push({ x, y, hop: 0, cuts: null });
      });
      const reached = [], reachedSet = new Set();
      const cutUse = new Map();
      for (let qi = 0; qi < q.length; qi++) {
        const cur = q[qi];
        if (cur.hop >= K.hopLimit) continue;
        const ce = Grid.elevAt(cur.x, cur.y);
        for (let n = 0; n < 4; n++) {
          const nx = cur.x + (n === 0 ? 1 : n === 1 ? -1 : 0);
          const ny = cur.y + (n === 2 ? 1 : n === 3 ? -1 : 0);
          if (!Grid.inB(nx, ny)) continue;
          const nk = Grid.key(nx, ny);
          if (seen.has(nk)) continue;
          const nb = net.get(nk);
          if (!nb) continue;
          const nd = DEF(nb.type);
          const drop = ce - Grid.elevAt(nx, ny);
          let cuts = cur.cuts;
          if (drop < 0) {

            if (!nd.cascadeCut || -drop > nd.cascadeCut) {
              if (!breakAt) breakAt = { x: nx, y: ny, gate: g, up: -drop, down: 0 };
              continue;
            }
            cuts = cuts ? cuts.concat([nb]) : [nb];
          } else if (drop > K.maxDrop) {

            if (!breakAt) breakAt = { x: nx, y: ny, gate: g, up: 0, down: drop };
            continue;
          }
          seen.add(nk);
          q.push({ x: nx, y: ny, hop: cur.hop + 1, cuts });
          if (nd.cascadeDraw && !reachedSet.has(nb)) {
            reachedSet.add(nb);
            reached.push({ b: nb, hop: cur.hop + 1, cuts });
          }
        }
      }

      reached.sort((a, b) => a.hop - b.hop || a.b.placed - b.b.placed);
      for (const r of reached) {
        touched.add(r.b.id);
        if (served.has(r.b.id)) continue;
        const need = Econ.headNeed(r.b);
        if (!(need > 0)) continue;
        if (need > budget) { r.b.headBlock = 'budget'; continue; }

        let ok = true;
        if (r.cuts) for (const c of r.cuts) {
          const cap = DEF(c.type).cascadeThrough || 0;
          if ((cutUse.get(c.id) || 0) + need > cap) { ok = false; break; }
        }
        if (!ok) { r.b.headBlock = 'cut'; continue; }
        if (r.cuts) for (const c of r.cuts) cutUse.set(c.id, (cutUse.get(c.id) || 0) + need);
        budget -= need;
        served.add(r.b.id);
        r.b.headIn = need; r.b.headDry = false; r.b.headBlock = null;
        drawn += need;
      }
      g.headOut = source - budget;
      spare += budget;
    }
    for (const b of drawers) if (b.headDry && !touched.has(b.id)) b.headBlock = 'unreached';

    const dry = drawers.filter(b => b.headDry).length;
    C.cascade = { gates: gates.length, emitted, drawn, spare, dry,
                  drawers: drawers.length, breakAt };
  },

  headMult(s, b) {
    if (!Econ.cascadeActive(s)) return 1;
    const d = DEF(b.type);
    if (!d || !d.cascadeDraw) return 1;
    return b.headDry ? TUNE.CASCADE.dryYield : 1;
  },

  cascadeForecast(s) {
    const out = { active: false, gates: 0, emitted: 0, drawn: 0, spare: 0, dry: 0,
                  drawers: 0, breakAt: null, frac: 1, text: 'no gate yet' };
    if (!Econ.cascadeActive(s)) return out;
    out.active = true;
    const c = (G.cache && G.cache.cascade) || null;
    if (!c) return out;
    out.gates = c.gates; out.emitted = c.emitted; out.drawn = c.drawn;
    out.spare = c.spare; out.dry = c.dry; out.drawers = c.drawers;
    out.breakAt = c.breakAt;

    out.frac = c.drawers > 0 ? (c.drawers - c.dry) / c.drawers : 1;
    out.text = c.drawers
      ? (c.drawers - c.dry) + ' / ' + c.drawers + ' plumbed' +
        (c.dry ? ' · ' + c.dry + ' dry' : ' · spare ' + c.spare.toFixed(1))
      : 'no bunded fields yet';
    return out;
  },

  headWhy(s, b) {

    if (!b) return null;
    const f = Econ.cascadeForecast(s);
    const d = DEF(b.type);
    const need = Econ.headNeed(b);
    if (!f.active || !d || !d.cascadeDraw) return null;
    if (!b.headDry) return null;
    if (b.headBlock === 'budget')
      return 'This bund wants ' + need.toFixed(1) + ' head and every gate above it is already spent. ' +
        'A gate emits ' + TUNE.CASCADE.warnSpare * 3 + ' and a field draws ' + TUNE.CASCADE.warnSpare +
        ', so THREE fields to a gate: put in another DIVERSION GATE, upgrade this one to a KING\'S ' +
        'WEIR, or mothball a field nearer the gate and this one runs instead. A well will not help.';
    if (b.headBlock === 'cut')
      return 'The run reaches this bund through a CUT CHANNEL that is already carrying all it can. ' +
        'Drive a second cut through the same rise, or upgrade it to a TWIN CUT.';
    const at = f.breakAt;
    return 'No head reaches this bund at all. ' + (at
      ? 'The run out of your gate ' + (at.up ? 'CLIMBS ' + at.up + ' step' + (at.up > 1 ? 's' : '') +
          ' at (' + at.x + ', ' + at.y + ') — head only ever runs downhill, so nothing past that tile ' +
          'gets any. CUT the ground there, or drive a CUT CHANNEL through it.'
        : 'FALLS ' + at.down + ' steps at once at (' + at.x + ', ' + at.y + '), which scours the ditch ' +
          'out. RAM the tile below it, or CUT the tile above.')
      : 'Dig FIELD DITCHES from a DIVERSION GATE down to it — level, or one step down, never up.') +
      ' A well stamps a circle; a field wants a flow.';
  },

  reachActive(s) { return rungOf(s.era) === 9; },

  reachRangeOf(s, b) {
    const K = TUNE.VOYAGE;
    return K.range + Econ.reachCourt(s) + K.rangePerRank * (rankOf(b) - 1) +
           ((G.cache && G.cache.lashAdd) || 0);
  },

  reachCourt(s) {
    const C = G.cache;
    if (C && C.reach) return C.reach.court;
    return Econ.scanCourt(s);
  },
  scanCourt(s) {
    let best = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.voyageBonus || b.done === false) continue;
      if (!Econ.campLive(b) || (d.workers && !(b.staff > 0))) continue;
      if (d.voyageBonus > best) best = d.voyageBonus;
    }
    return best;
  },

  reachTick(s) {
    const C = G.cache;
    C.reach = null;
    if (!Econ.reachActive(s)) return;
    const K = TUNE.VOYAGE, W = TUNE.WORLD, TELL = K.tell;

    const court = Econ.scanCourt(s);
    const landings = [];
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.voyageRange || b.done === false) continue;

      if (!Econ.campLive(b) || (d.workers && !(b.staff > 0))) { b.reachOut = 0; continue; }
      b.reachOut = Econ.reachRangeOf(s, b);
      landings.push(b);
    }

    if (!C.reachRem || C.reachRem.length !== W * W) {
      C.reachRem = new Int16Array(W * W);
      C.reachSrc = new Int32Array(W * W);
    }
    const rem = C.reachRem, src = C.reachSrc;
    rem.fill(-1); src.fill(-1);

    let q = [], best = 0;
    for (const b of landings) {
      const budget = b.reachOut + TELL;
      if (b.reachOut > best) best = b.reachOut;
      Grid.tilesOf(b, (x, y) => {
        for (let n = 0; n < 4; n++) {
          const nx = x + (n === 0 ? 1 : n === 1 ? -1 : 0);
          const ny = y + (n === 2 ? 1 : n === 3 ? -1 : 0);
          if (!Grid.inB(nx, ny)) continue;
          const nk = Grid.key(nx, ny);
          if (C.terrain[nk] !== TERRAIN.WATER) continue;
          const v = budget - 1;
          if (v > rem[nk]) { rem[nk] = v; src[nk] = b.id; q.push(nk); }
        }
      });
    }

    for (let qi = 0; qi < q.length; qi++) {
      const k = q[qi];
      const v = rem[k] - 1;
      if (v < 0) continue;
      const x = k % W, y = (k / W) | 0;
      for (let n = 0; n < 4; n++) {
        const nx = x + (n === 0 ? 1 : n === 1 ? -1 : 0);
        const ny = y + (n === 2 ? 1 : n === 3 ? -1 : 0);
        if (!Grid.inB(nx, ny)) continue;
        const nk = Grid.key(nx, ny);

        if (C.terrain[nk] !== TERRAIN.WATER) continue;
        if (v > rem[nk]) { rem[nk] = v; src[nk] = src[k]; q.push(nk); }
      }
    }

    const open = new Set();
    for (const k of q) {
      if (rem[k] < TELL) continue;
      const x = k % W, y = (k / W) | 0;
      for (let n = 0; n < 4; n++) {
        const nx = x + (n === 0 ? 1 : n === 1 ? -1 : 0);
        const ny = y + (n === 2 ? 1 : n === 3 ? -1 : 0);
        if (!Grid.inB(nx, ny)) continue;

        if (C.terrain[Grid.key(nx, ny)] === TERRAIN.WATER) continue;
        const c = Grid.chunkOf(nx, ny);
        open.add(c.cx + ',' + c.cy);
      }
    }
    let newGround = 0;
    for (const key of open) {
      if (C.ownedSet.has(key)) continue;
      const p = key.split(',');
      if (Grid.chunkAdjacentOwned(s, +p[0], +p[1])) continue;
      newGround++;
    }

    C.reach = { landings: landings.length, best, court, open, newGround };
  },

  reachState(s) {
    const C = G.cache;
    if (!Econ.reachActive(s)) return null;
    if (!C.reach) Econ.reachTick(s);
    return C.reach;
  },

  landfallAt(s, cx, cy) {
    if (!Econ.reachActive(s)) return null;
    const st = Econ.reachState(s);
    const C = G.cache, K = TUNE.VOYAGE, TELL = K.tell;
    const out = { ok: false, short: Infinity, dist: Infinity, range: st ? st.best : 0 };
    if (!st || !st.landings) return out;

    if (st.open.has(cx + ',' + cy)) { out.ok = true; out.short = 0; return out; }
    const rem = C.reachRem, src = C.reachSrc;
    const x0 = cx * TUNE.CHUNK, y0 = cy * TUNE.CHUNK;
    for (let dy = 0; dy < TUNE.CHUNK; dy++)
      for (let dx = 0; dx < TUNE.CHUNK; dx++) {
        const x = x0 + dx, y = y0 + dy;
        if (!Grid.inB(x, y)) continue;
        if (C.terrain[Grid.key(x, y)] === TERRAIN.WATER) continue;
        for (let n = 0; n < 4; n++) {
          const nx = x + (n === 0 ? 1 : n === 1 ? -1 : 0);
          const ny = y + (n === 2 ? 1 : n === 3 ? -1 : 0);
          if (!Grid.inB(nx, ny)) continue;
          const nk = Grid.key(nx, ny);
          if (C.terrain[nk] !== TERRAIN.WATER) continue;
          const r = rem[nk];
          if (r < 0) continue;
          const b = C.byId.get(src[nk]);
          const range = (b && b.reachOut) || st.best;
          const short = TELL - r;
          if (short < out.short) {
            out.short = short; out.range = range; out.dist = range + short;
          }
        }
      }
    return out;
  },

  reachForecast(s) {
    const out = { active: false, landings: 0, best: 0, court: false, courtAdd: 0,
                  open: 0, landfalls: 0, need: 0, text: 'no landing yet' };
    if (!Econ.reachActive(s)) return out;
    out.active = true;
    out.need = TUNE.VOYAGE.gateLandfalls;
    out.landfalls = Math.max(0, (s.cum.landfalls || 0) -
                                ((s.eraBase && s.eraBase.landfalls) || 0));
    const st = Econ.reachState(s);
    if (!st) return out;
    out.landings = st.landings; out.best = st.best; out.court = st.court > 0;
    out.courtAdd = st.court;

    out.open = st.newGround;
    out.text = !st.landings
      ? 'no landing yet'
      : st.best + ' tiles · ' + out.open + ' landfall' + (out.open === 1 ? '' : 's');
    return out;
  },

  reachWhy(s, cx, cy) {
    const f = Econ.landfallAt(s, cx, cy);
    if (!f || f.ok) return null;
    const st = Econ.reachState(s);
    if (!st || !st.landings)
      return 'This ground is across open water and you have no CANOE LANDING. A Landing on your own ' +
        'shore — cleared coral and a hauling ramp, no road and no spring needed — crosses ' +
        TUNE.VOYAGE.range + ' tiles of sea, and everything within that becomes ground you can buy.';
    if (!isFinite(f.short))
      return 'Nothing but open ocean lies between here and any shore you hold. A canoe crosses water; ' +
        'it does not cross the whole sea. Land nearer first, and go on from there.';
    return 'No landing within reach — this shore is ' + f.dist + ' tiles of open water from your ' +
      'nearest Landing, and that Landing crosses ' + f.range + '. You are ' + f.short + ' short. ' +
      'Build a WAYFINDING COURT (+' + TUNE.VOYAGE.courtBonus + ' to every Landing you own), rank the ' +
      'Landing (+' + TUNE.VOYAGE.rangePerRank + ' a rank), or put a new Landing on a shore that is ' +
      'closer to it.';
  },

  opsonActive(s) { return rungOf(s.era) === 10; },

  opsonCap(s, kind) {
    if (!Econ.opsonActive(s)) return Infinity;
    const K = TUNE.OPSON;
    if (kind === eraStaple(s.era).cooked) return stapleCap(s);
    return K.share[kind] !== undefined ? K.share[kind] : K.other;
  },

  opsonTable(s) {
    const out = { on: false, legs: [], laid: 1, met: 1, secs: Infinity, soon: null, missing: [] };
    if (!Econ.opsonActive(s)) return out;
    out.on = true;
    const res = Game.totalResidents(s);
    const demand = res * TUNE.FLOUR_PER_RESIDENT;
    if (!(demand > 0)) return out;
    let met = 0;
    const staple = eraStaple(s.era).cooked;
    for (const f of TUNE.FOODS) {
      const cap = Econ.opsonCap(s, f.kind);
      if (!(cap > 0)) continue;
      const capEquiv = cap * demand;
      const have = (s.stock[f.kind] || 0) * f.eff;
      const cover = Math.min(capEquiv, have);
      met += cover;

      if (f.kind !== staple && TUNE.OPSON.share[f.kind] === undefined) continue;

      const drawUnits = cover / f.eff;
      const secs = drawUnits > 0
        ? ((s.stock[f.kind] || 0) / drawUnits) * 60 / TUNE.TEMPO : Infinity;
      const leg = { kind: f.kind, name: goodLabel(s.era, f.kind), cap,
                    coverEquiv: cover, share: cover / demand, secs };
      out.legs.push(leg);
      if (cover <= 0.0001) out.missing.push(leg);
      else if (secs < out.secs) { out.secs = secs; out.soon = leg; }
    }
    out.met = met / demand;
    out.laid = Math.min(1, out.met);
    return out;
  },

  tableShopMult(s) {
    return (Econ.opsonActive(s) && s.policyPublicTable) ? (1 - TUNE.OPSON.lawShopCut) : 1;
  },

  opsonTick(s, offline) {
    const C = G.cache;
    C.opson = null;
    if (!Econ.opsonActive(s)) return;
    const t = Econ.opsonTable(s);
    C.opson = t;
    if (offline || t.laid >= 0.999) { if (t.laid >= 0.999) C.opsonTold = 0; return; }
    if (t.secs > TUNE.OPSON.rearmSecs) C.opsonTold = 0;
    if (C.opsonTold) return;
    const gap = t.missing.length

      ? 'It has no ' + t.missing.map(l => l.name.toLowerCase()).join(' and no ') + ' on it'
      : 'The ' + (t.soon ? t.soon.name.toLowerCase() : 'shortest leg') + ' runs out first';
    C.opsonTold = 1;
    UI.toast('⚖️ THE TABLE IS ' + Math.round(t.laid * 100) + '% LAID. ' + gap +
      ', and this city cannot eat its way out of that with bread — a Greek table is grain, ' +
      'figs, pulses and fish, and no one of them feeds everybody. Sow a BEAN & LENTIL PLOT ' +
      'or a FIG ORCHARD: neither needs water, a road or anything off a quay.', 12000);
  },

  annonaActive(s) { return rungOf(s.era) === 13; },

  annonaCapacity(s) {
    let cap = TUNE.ANNONA.base;
    if (!Econ.annonaActive(s)) return cap;

    const lift = 1 + ((G.cache && G.cache.fleetLift) || 0);
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.annonaCap || b.done === false || b.mothballed || b.block) continue;
      if (d.needsRoad && !b.conn) continue;
      if (d.workers && !b.staff) continue;

      cap += d.annonaCap * rankOutMult(b) * lift;
    }
    return cap;
  },

  annonaPremium(need, cap) {
    const A = TUNE.ANNONA;
    if (!(need > 0) || !(cap > 0)) return 1;
    if (need <= cap) return 1;
    return Math.min(A.maxPremium, Math.pow(need / cap, A.bite));
  },

  annonaBuy(s, need, purse, offline) {
    const C = G.cache;
    C.annona = null;
    if (!Econ.annonaActive(s)) return 0;
    const A = TUNE.ANNONA;
    const capMin = Econ.annonaCapacity(s);
    const cap = capMin * Econ.M;
    const premium = Econ.annonaPremium(need, cap);
    const per = A.price * premium;

    const got = per > 0 ? Math.min(need, Math.max(0, purse) / per) : 0;
    const bill = got * per;
    C.tickAnnona = (C.tickAnnona || 0) + bill;

    const perMin = Econ.M > 0 ? 1 / Econ.M : 0;
    C.annona = {
      need: need * perMin, got: got * perMin, short: (need - got) * perMin,
      cap: capMin, premium, bill: bill * perMin, purse: Math.max(0, purse),
    };
    if (!offline) {

      if (premium < A.rearmAt) C.annonaTold = 0;
      else if (premium >= A.warnAt && !C.annonaTold) {
        C.annonaTold = 1;
        UI.toast('\u{1F33E} THE ANNONA IS COSTING ×' + premium.toFixed(1) +
          '. This city outgrew its landings — it is buying ' + (need * perMin).toFixed(1) +
          ' a minute against works that land ' + capMin.toFixed(1) +
          ', and the whole shipment reprices, not just the excess. Two answers, and ' +
          'both are builds: land more (a STATIO ANNONAE), or grow more (a ' +
          'CENTURIATED FIELD). Buying will not open the gate — only what you grow ' +
          'counts toward it.', 13000);
      }
    }
    return got;
  },

  annonaState(s) {
    const a = G.cache.annona;
    const cap = Econ.annonaCapacity(s);
    if (!a) {
      return { on: Econ.annonaActive(s), need: 0, got: 0, short: 0, cap,
               premium: 1, bill: 0, secs: Infinity, warn: false, bad: false };
    }
    const perSec = a.bill * TUNE.TEMPO / 60;
    const secs = perSec > 0 ? Math.max(0, s.money) / perSec : Infinity;
    return { on: true, need: a.need, got: a.got, short: a.short, cap: a.cap,
             premium: a.premium, bill: a.bill, secs: secs,
             warn: a.premium >= TUNE.ANNONA.warnAt, bad: a.short > 0.001 };
  },

  censusActive(s) { return rungOf(s.era) === 11; },

  counted(s, b) {
    if (!Econ.censusActive(s)) return true;
    return !!b && (b.placed | 0) < ((s.census && s.census.at) | 0);
  },

  countedResidents(s) {
    if (!Econ.censusActive(s)) return Game.housedResidents(s);
    let n = 0;
    for (const b of s.buildings) {
      if (!DEF(b.type) || !DEF(b.type).cap || !b.residents) continue;
      if (Econ.counted(s, b)) n += b.residents;
    }
    return n;
  },

  censusOffices(s) {
    if (!Econ.censusActive(s)) return 0;
    let n = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.censusOffice || b.mothballed) continue;
      if (b.block || (d.workers && !b.staff)) continue;
      n++;
    }
    return Math.min(TUNE.CENSUS.officeMax, n);
  },

  censusPerHead(s) {
    const K = TUNE.CENSUS;
    return K.per * (1 - K.officeCut * Econ.censusOffices(s));
  },

  censusCost(s) {
    const K = TUNE.CENSUS;
    const un = Math.max(0, Game.housedResidents(s) - Econ.countedResidents(s));
    const gross = K.base + Econ.censusPerHead(s) * un;
    return Math.round(gross * (s && s.policyProfessio ? TUNE.PROFESSIO.feeCut : 1));
  },

  duesPer(s, d) {
    const base = (d && d.dues) || TUNE.DUES.per;
    if (Econ.censusActive(s) && s && s.policyProfessio) return base * TUNE.PROFESSIO.duesCut;
    if (Econ.passageActive(s) && s && s.policyAteleia) return base * TUNE.ATELEIA.duesCut;
    return base;
  },

  censusState(s) {
    const out = { on: false, counted: 0, uncounted: 0, mouths: 0, frac: 1,
                  ageSecs: 0, cost: 0, afford: true, warn: false, ever: true,
                  offices: 0, perHead: TUNE.CENSUS.per };
    if (!Econ.censusActive(s)) return out;
    out.on = true;

    out.offices = Econ.censusOffices(s);
    out.perHead = Econ.censusPerHead(s) * (s.policyProfessio ? TUNE.PROFESSIO.feeCut : 1);
    const mouths = Game.housedResidents(s);
    const counted = Econ.countedResidents(s);
    out.mouths = mouths;
    out.counted = counted;
    out.uncounted = Math.max(0, mouths - counted);

    out.frac = mouths > 0 ? counted / mouths : 1;
    out.ageSecs = Math.max(0, (s.tick || 0) - ((s.census && s.census.at) || 0));
    out.cost = Econ.censusCost(s);
    out.afford = s.money >= out.cost;
    out.warn = out.uncounted > 0 && (1 - out.frac) >= TUNE.CENSUS.warnFrac;
    out.ever = !!(s.census && s.census.taken);
    return out;
  },

  takeCensus(s) {
    if (!Econ.censusActive(s)) return 'no census is kept in this age';
    const st = Econ.censusState(s);
    if (!st.afford) return 'the treasury cannot pay for it — it costs $' + st.cost;
    if (st.uncounted <= 0 && st.frac >= 1) return 'the register is already current';
    s.money -= st.cost;
    Econ.closeRegister(s);
    Econ.log(s, '\u{1F3DB}\u{FE0F}', 'The censors closed the lustrum — ' + st.mouths +
      ' citizens and ' + st.uncounted + ' uncounted heads entered on the register, for $' +
      st.cost + '.');
    return true;
  },

  closeRegister(s) {
    s.census = { at: s.placeCounter | 0, taken: 1 };
  },

  passageActive(s) { return rungOf(s.era) === 12; },

  passageLeft(s) {
    if (!Econ.passageActive(s)) return Infinity;
    return Math.floor((s.stock.passage || 0) / TUNE.PASSAGE.per);
  },

  spendPassage(s) {
    if (!Econ.passageActive(s)) return;
    s.stock.passage = Math.max(0, (s.stock.passage || 0) - TUNE.PASSAGE.per);
  },

  passageState(s) {
    const on = Econ.passageActive(s);
    const out = { on, left: 0, open: 0, short: 0, rate: 0, warn: false };
    if (!on) return out;
    out.left = Econ.passageLeft(s);
    let open = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.cap || b.block || b.done === false) continue;
      open += Math.max(0, (d.cap || 0) - (b.residents || 0));
    }
    out.open = open;

    out.short = Math.max(0, open - out.left);

    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || d.procOut !== 'passage' || b.block || b.mothballed) continue;
      if (d.workers && !(b.staff > 0)) continue;
      out.rate += d.procRate * (d.workers ? b.staff / d.workers : 1) * rankOutMult(b);
    }
    out.warn = out.short >= TUNE.PASSAGE.warnBeds;
    return out;
  },

  arrearsActive(s) { return rungOf(s.era) === 15; },

  fabricPool(b) {
    const d = DEF(b.type);
    if (!d) return 0;
    let paid = paidCost(b.type);
    for (let r = 1; r < (b.rank || 1); r++) paid += rankUpCost(d, r);
    return TUNE.ARREARS.fabricFrac * paid * (d.fabricMult != null ? d.fabricMult : 1);
  },

  fabricOf(b) { return b.fabric === undefined ? 1 : b.fabric; },

  stampShield(s) {
    const C = G.cache;
    if (!C.shield) return;
    C.shield.fill(0);
    C.shieldBest = 1;
    if (!Econ.arrearsActive(s)) return;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.fabricShield || b.mothballed || b.done === false || b.block) continue;
      if (d.workers && !(b.staff > 0)) continue;
      Grid.stampRadiusCircle(C.shield, b, (d.shieldRadius || 0) + rankRadiusBonus(b));
      C.shieldBest = Math.min(C.shieldBest, d.fabricShield);
    }
  },
  fabricShield(s, b) {
    if (!Econ.arrearsActive(s)) return 1;
    const C = G.cache;
    if (!C.shield || C.shieldBest === undefined) return 1;
    return Grid.covered(C.shield, b) ? C.shieldBest : 1;
  },

  protectSlots(s) {
    if (!Econ.arrearsActive(s)) return 0;
    let gangs = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.repairRadius || b.mothballed || b.done === false) continue;
      if (d.workers && !(b.staff > 0)) continue;
      gangs++;
    }
    return TUNE.ARREARS.protectFree + gangs * TUNE.ARREARS.protectPerCurator;
  },

  protectedSet(s) {
    const n = Econ.protectSlots(s);
    const list = (s.curated || []).slice(0, n);
    return new Set(list);
  },

  chargeable(s) {
    const out = [];
    if (!Econ.arrearsActive(s)) return out;
    const prot = Econ.protectedSet(s);
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || d.fabricProof || d.fixed) continue;

      if (b.done === false) continue;
      if (b.mothballed && TUNE.ARREARS.mothballFreeze) continue;
      if (prot.has(b.id)) continue;
      if (!(b.uBill > 0)) continue;
      out.push(b);
    }
    return out;
  },

  munusBase(s) {
    if (!Econ.arrearsActive(s)) return 0;
    let sum = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || d.fabricProof || d.fixed || b.done === false) continue;
      sum += Econ.fabricPool(b);
    }
    return sum;
  },

  arrearsTick(s, offline) {
    const C = G.cache;
    C.arrears = C.arrears || { D: 0, gross: 0, charged: 0, ruins: 0, munus: 0, pool: 0 };
    const A = C.arrears;
    A.D = 0; A.gross = 0; A.charged = 0; A.ruins = 0; A.munus = 0;
    if (!Econ.arrearsActive(s)) return;

    Econ.stampShield(s);

    if (s.money < 0) { A.D = -s.money; s.money = 0; }
    A.pool = Econ.munusBase(s);

    let bill = A.D;
    if (A.D > 0 && s.policyMunus) {
      A.munus = TUNE.MUNUS.per * A.pool * Econ.M;
      bill = (A.D + A.munus) * (1 - TUNE.MUNUS.relief);
    }
    if (offline || bill <= 0) return;

    const list = TUNE.ARREARS.order === 'upkeepShare' ? Econ.chargeable(s) : [];
    let total = 0;
    for (const b of list) total += b.uBill;
    if (!(total > 0)) return;

    const fallen = [];
    for (const b of list) {
      const share = b.uBill / total;
      const gross = share * bill;
      A.gross += gross;
      const charge = gross * Econ.fabricShield(s, b);
      A.charged += charge;
      const pool = Econ.fabricPool(b);
      if (!(pool > 0)) continue;
      const now = Econ.fabricOf(b) - charge / pool;
      b.fabric = Math.max(0, now);

      if (b.fabric < TUNE.ARREARS.warnAt) b.status = 'dilapidated';
      if (b.fabric <= 0) fallen.push(b);
    }

    for (const b of fallen) {
      const spolia = TUNE.ARREARS.spoliaFrac * paidCost(b.type);
      Grid.makeRuin(s, b, spolia);
      Grid.removeBuilding(s, b);
      A.ruins++;
      s.cum.ruins = (s.cum.ruins | 0) + 1;

      if (!offline) UI.firstToast('ruina', '\u{1F3DA}\u{FE0F} The ' + DEF(b.type).name +
        ' has fallen. It refunded NOTHING — a building you demolish on purpose pays back half and ' +
        'its parcel sells for 60% more. Its footprint is RUIN now, and it cannot be painted back: ' +
        'a RUDERATIO can work it.', 13000);
    }
    if (fallen.length) Grid.rebuild(s);

    if (!offline) {
      if (A.D > 0) {
        C.arrearsCalm = 0;
        if (!C.arrearsWarned) {
          C.arrearsWarned = 1;
          const f = Econ.arrearsForecast(s);
          UI.toast('\u{1F3DA}\u{FE0F} The treasury is empty and the city has started paying in ITSELF — $' +
            Math.round(A.D * TUNE.TEMPO / Econ.M * Econ.BASE_M) + ' a minute, out of the buildings. ' +
            'The far ones go first: distance already bills them up to twelve times over. ' +
            'MOTHBALL takes a building to a fifth of base and stops its clock dead.' +
            (f.worst ? ' The ' + f.worst.name + ' has ' + Math.round(f.secs) + ' seconds.' : ''), 15000);
        }
      } else {
        C.arrearsCalm = (C.arrearsCalm || 0) + Econ.M;
        if (C.arrearsCalm >= TUNE.ARREARS.rearmMinutes) C.arrearsWarned = 0;
      }
    }
  },

  repairTick(s, offline) {
    const C = G.cache;
    C.repaired = 0;
    if (!Econ.arrearsActive(s)) return;

    if (!(s.money > 0)) {
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.repairRadius || b.mothballed || b.done === false) continue;
        if (b.status === 'ok' || b.status === 'dilapidated') b.status = 'unfunded';
      }
      return;
    }
    if (offline) return;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.repairRadius || b.mothballed || b.done === false || b.block) continue;
      const staffEff = d.workers ? b.staff / d.workers : 1;
      if (!(staffEff > 0)) continue;
      const budgetFabric = (d.workers || 0) * staffEff * TUNE.ARREARS.repairPerWorker * Econ.M;
      if (!(budgetFabric > 0)) continue;

      const near = s.buildings.filter(o => {
        const od = DEF(o.type);
        return od && !od.fixed && o.done !== false && Econ.fabricOf(o) < 1 &&
          Grid.within(b, o, d.repairRadius);
      }).sort((x, y) => Econ.fabricOf(x) - Econ.fabricOf(y));
      let left = budgetFabric;
      for (const o of near) {
        if (left <= 0) break;
        const pool = Econ.fabricPool(o);
        if (!(pool > 0)) continue;
        const want = Math.min(left, (1 - Econ.fabricOf(o)) * pool);
        const price = (d.repairPrice != null ? d.repairPrice : TUNE.ARREARS.repairPrice);
        const afford = Math.min(want, s.money / price);
        if (!(afford > 0)) break;
        s.money -= afford * price;
        o.fabric = Math.min(1, Econ.fabricOf(o) + afford / pool);
        left -= afford;
        C.repaired += afford;
      }
    }
  },

  arrearsForecast(s) {
    const A = (G.cache && G.cache.arrears) || { D: 0, gross: 0, charged: 0, ruins: 0, munus: 0, pool: 0 };
    const out = { D: A.D, munus: A.munus, bill: A.gross, pool: A.pool, charged: A.charged,
                  ruins: A.ruins, worst: null, secs: Infinity, minFabric: 1, warned: 0,
                  coverMin: Infinity };
    if (!Econ.arrearsActive(s)) return out;
    const list = Econ.chargeable(s);
    let total = 0;
    for (const b of list) total += b.uBill;
    for (const b of list) {
      const f = Econ.fabricOf(b);
      if (f < out.minFabric) out.minFabric = f;
      if (f < TUNE.ARREARS.warnAt) out.warned++;
      if (!(total > 0) || !(A.gross > 0)) continue;
      const perTick = (b.uBill / total) * A.gross * Econ.fabricShield(s, b);
      const pool = Econ.fabricPool(b);
      if (!(perTick > 0) || !(pool > 0)) continue;

      const secs = f * pool / perTick;
      if (secs < out.secs) { out.secs = secs; out.worst = b; }
    }

    if (A.D > 0 && out.pool > 0) out.coverMin = out.pool / (A.D / Econ.M);
    return out;
  },

  chainsRunning(s, rung) {
    const seen = new Set();
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.sells || defEra(d) !== rung) continue;
      if (b.mothballed || b.done === false || b.block) continue;
      if (d.workers && !(b.staff > 0)) continue;
      if (!(b.rate > 0)) continue;
      seen.add(d.sells);
    }
    return seen.size;
  },

  ruinSpoliaLeft(s, b) {
    let left = 0;
    Grid.tilesOf(b, (x, y) => { left += Grid.ruinSpoliaAt(s, x, y); });
    return left;
  },
  spendRuin(s, b, amt) {
    let want = amt, took = 0;
    Grid.tilesOf(b, (x, y) => {
      if (want <= 0) return;
      const got = Grid.spendRuinSpolia(s, x, y, want);
      want -= got; took += got;
    });
    return took;
  },

  levyActive(s) { return rungOf(s.era) === 2; },

  realSecs() { return Econ.M / Econ.BASE_M; },

  levyState(s) {
    if (!s.tribute) s.tribute = { bank: 0, count: 0, missed: 0, due: TUNE.TRIBUTE.firstAt * 60 };
    return s.tribute;
  },
  levyQuota(count) {
    return TUNE.TRIBUTE.base * Math.pow(TUNE.TRIBUTE.growth, count);
  },
  levyForecast(s) {
    const t = Econ.levyState(s);
    const quota = Econ.levyQuota(t.count);
    return { quota, bank: t.bank, short: Math.max(0, quota - t.bank),
             secs: Math.max(0, t.due), count: t.count + 1, missed: t.missed || 0,
             unrest: s.unrest || 0 };
  },

  levySkim(s, b, made) {
    if (!Econ.levyActive(s) || !DEF(b.type).levied || !(made > 0)) return made;
    const t = Econ.levyState(s);
    const take = made * TUNE.TRIBUTE.share;

    if (Econ.levyYardLive(s)) t.bank += take;
    b.levied = take;
    return made - take;
  },

  levyYardLive(s) {
    return s.buildings.some(b => {
      const d = DEF(b.type);
      return d && d.levyYard && b.done !== false && !b.mothballed && !b.block &&
        (!d.workers || b.staff > 0);
    });
  },

  mineMult(s, b) {
    if (!Econ.levyActive(s)) return 1;
    const d = DEF(b.type);
    if (!d || !d.mines) return 1;
    const U = TUNE.UNREST, u = s.unrest || 0;
    let m = 1;
    if (u >= U.clampNoGate) m = U.crashSlow;
    else if (u >= U.strikeAt) m = U.strikeSlow;

    if (s.struck) return 0;

    if (Econ.anyLampLit(b.lampNear)) m *= 1 + TUNE.TERRAIN_BONUS;
    if (s.policyDoubleShift) m *= 1 + TUNE.SHIFT.bonus;
    return m;
  },

  levyBuyoutPrice(s, units) {
    return Math.round(units * TUNE.PRICES.gold * TUNE.TRIBUTE.buyoutMult);
  },
  levyBuyout(s, units) {
    if (!Econ.levyActive(s) || !(units > 0)) return false;
    const price = Econ.levyBuyoutPrice(s, units);
    if (s.money < price) return false;
    s.money -= price;
    Econ.levyState(s).bank += units;
    return true;
  },

  levyTick(s, offline) {
    if (!Econ.levyActive(s)) return;
    const t = Econ.levyState(s);
    const T = TUNE.TRIBUTE, U = TUNE.UNREST;
    t.due -= Econ.realSecs();
    let guard = 0;
    while (t.due <= 0 && guard++ < 1000) {
      const quota = Econ.levyQuota(t.count);
      if (t.bank >= quota) {

        const ratio = t.bank / quota;
        t.bank -= quota;
        s.cum.tributePaid = (s.cum.tributePaid || 0) + quota;
        t.missed = 0;

        s.unrest = (s.unrest || 0) >= U.clampNoGate
          ? U.strikeAt - 0.01
          : Util.clamp((s.unrest || 0) + (ratio >= T.appeaseAt ? U.appeased : U.paid), 0, 1);
        t.count++;
        if (!offline) {
          Econ.log(s, '\u{2696}\u{FE0F}', 'Count ' + t.count + ' settled: ' +
            Math.round(quota) + ' gold weighed out.' +
            (ratio >= T.appeaseAt ? ' They went away satisfied.' : ''));
        }
      } else {

        t.missed = (t.missed || 0) + 1;
        s.unrest = Util.clamp((s.unrest || 0) + U.missed +
          (s.policyDoubleShift ? TUNE.SHIFT.unrestPerLevy : 0), 0, 1);
        t.count++;
        Econ.levyConscript(s, offline);
        if (!offline) {
          const nq = Econ.levyQuota(t.count);
          UI.toast('\u{2696}\u{FE0F} THE COUNT IS SHORT — ' + Math.round(quota) +
            ' gold owed, ' + Math.round(t.bank) + ' weighed. Unrest ' +
            Math.round((s.unrest || 0) * 100) + '%. The next count wants ' +
            Math.round(nq) + '. The Hall will sell you the shortfall at $' +
            TUNE.TRIBUTE.buyoutMult + '\u{00D7} list.', 14000);
          Econ.log(s, '\u{2696}\u{FE0F}', 'Count ' + t.count + ' was short by ' +
            Math.round(quota - t.bank) + ' gold.');
        }
      }

      if ((s.unrest || 0) >= U.crashAt && !Econ.eraReady(s)) s.unrest = U.clampNoGate;
      if ((s.unrest || 0) >= U.crashAt && Econ.eraReady(s) && !s.struck) {
        s.struck = 1;
        if (!offline) {
          UI.toast('\u{270A} THE STRIKE OF THE IGIGI \u{2014} "We have put a stop to the digging. ' +
            'The load is excessive, it is killing us." Every pick in the camp is down, and they ' +
            'are not coming back up. The age can turn.', 22000);
        }
        Econ.log(s, '\u{270A}', 'The tools were burned at the gate. The digging has stopped.');
      }
      t.due += T.periodMin * 60;
    }
  },

  levyConscript(s, offline) {
    const U = TUNE.UNREST;
    if ((s.unrest || 0) < U.conscriptAt) return;
    const housed = Game.housedResidents(s);

    const take = Math.min(Math.round(housed * U.conscriptShare),
      Math.max(0, housed - U.conscriptFloor));
    if (take <= 0) return;
    let left = take;
    for (const b of s.buildings) {
      if (left <= 0) break;
      if (!b.residents) continue;
      const n = Math.min(b.residents, left);
      b.residents -= n; left -= n;
    }
    const gone = take - left;
    if (gone <= 0) return;
    s.conscripted = (s.conscripted || 0) + gone;
    Econ.log(s, '\u{26D3}\u{FE0F}', gone + ' were taken up the hill to work the masters\' own ground.');
    if (!offline) {
      UI.toast('\u{26D3}\u{FE0F} ' + gone + ' PEOPLE WERE CONSCRIPTED. They are not dead and this is ' +
        'not famine — the masters took them for the shortfall, and they do not come back. ' +
        Math.round((s.unrest || 0) * 100) + '% unrest. Settle a count in full to stop it.', 16000);
    }
  },

  trophicActive(s) { return rungOf(s.era) === 0; },

  calvingRate(s) {
    const base = Econ.trophicActive(s) ? TUNE.PRED.calving : TUNE.MIGRATION.perMinute;
    const gift = Math.pow(1 + TUNE.GIFT_BEACON_STEP, ((s && s.giftBeacon) | 0));
    const lever = (Econ.passageActive(s) && s && s.policyAteleia) ? (1 + TUNE.ATELEIA.pull) : 1;
    return base * gift * lever;
  },

  diluteAt(head) {
    const P = TUNE.PRED;
    return Util.clamp(Math.pow(Math.max(1, head) / P.diluteRef, -P.diluteExp),
                      P.diluteMin, P.diluteMax);
  },

  sentinelReliefAt(s, b) {
    let relief = 0;
    for (const o of s.buildings) {
      const od = DEF(o.type);
      if (!od || !od.sentinelRelief || o.mothballed || o.done === false) continue;
      const r = (od.amenityRadius || 0) + rankRadiusBonus(o);
      const ad = Grid.dimsOf(b), odm = Grid.dimsOf(o);
      if (Util.rectDist(b.x, b.y, ad.w, ad.h, o.x, o.y, odm.w, odm.h) <= r)
        relief = Math.max(relief, od.sentinelRelief);
    }
    return relief;
  },

  nestCull(s, b, head) {
    const P = TUNE.PRED;

    const cover = b.cover !== undefined ? b.cover : Grid.coverFraction(s, b, P.coverRadius);
    const coverMult = 1 + P.coverPenalty * cover;
    const diluteMult = Econ.diluteAt(head);
    const sentinelMult = 1 - (b.sentinel !== undefined ? b.sentinel : Econ.sentinelReliefAt(s, b));
    const offerMult = 1 - (G.cache.offerRelief || 0);
    const huddleMult = (s.policyHuddle ? 1 - TUNE.HUDDLE.cullCut : 1);
    return {
      cover, coverMult, diluteMult, sentinelMult, offerMult, huddleMult,
      frac: P.base * coverMult * diluteMult * sentinelMult * offerMult * huddleMult,
    };
  },

  staticCullMean(s) {
    let wsum = 0, w = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.cap || b.mothballed || b.done === false || b.block) continue;
      const cap = Math.max(1, b.cap || d.cap);
      const c = Econ.nestCull(s, b, TUNE.PRED.diluteRef);
      wsum += (c.frac / c.diluteMult) * cap;
      w += cap;
    }
    return w ? wsum / w : 0;
  },
  meanCullAt(s, H) { return Econ.staticCullMean(s) * Econ.diluteAt(H); },

  herdForecast(s) {
    const P = TUNE.PRED;
    const head = Game.housedResidents(s);
    let beds = 0, nests = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.cap || b.mothballed || b.done === false || b.block) continue;
      nests++; beds += Math.max(1, b.cap || d.cap);
    }
    const grace = Math.max(0, s.predGrace || 0);
    let take = 0, dom = null, domMult = 1;
    if (!grace) {
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.cap || b.mothballed || b.done === false) continue;
        const c = Econ.nestCull(s, b, head);
        take += c.frac * (b.residents || 0);

        if (c.coverMult > domMult) { domMult = c.coverMult; dom = 'cover'; }
      }
      if (!dom) {
        const dl = Econ.diluteAt(head);
        if (dl > 1.05) { dom = 'dilution'; domMult = dl; }
      }
    }
    let ceiling = 0;
    if (nests) {
      const stat = Econ.staticCullMean(s);
      let H = Math.max(1, head);
      for (let i = 0; i < 12; i++) {
        const f = stat * Econ.diluteAt(H);
        if (f <= 0) { H = beds; break; }
        H = P.calving / f;
      }

      ceiling = Math.min(beds, H);
    }
    return { head, beds, nests, ceiling, take, grace,
             empty: Math.max(0, beds - Math.round(ceiling)),
             dominant: dom, dominantMult: domMult,
             text: !nests ? 'nothing nests here yet'
                 : grace > 0 ? Math.ceil(grace) + 's before anything hunts'
                 : head >= ceiling - 0.5 ? 'the colony is at its ceiling'
                 : 'growing toward ' + Math.round(ceiling) + ' head' };
  },

  trophicTick(s, offline) {
    const C = G.cache;
    C.herdTake = 0;
    if (!Econ.trophicActive(s)) { C.herdCeiling = 0; return; }

    if (offline) return;

    if (s.predGrace === undefined || s.predGrace === null) s.predGrace = TUNE.PRED.graceMinutes * 60;
    if (s.predGrace > 0) { s.predGrace = Math.max(0, s.predGrace - 1); return; }

    const f = Econ.herdForecast(s);
    C.herdTake = f.take; C.herdCeiling = f.ceiling;
    const houses = s.buildings.filter(b => DEF(b.type) && DEF(b.type).cap);

    const room = Math.max(0, f.head - TUNE.PRED.floorHerd);
    s.herdCull = (s.herdCull || 0) + Math.min(f.take * Econ.M, room);
    while (s.herdCull >= 1 && Game.totalResidents(s) > TUNE.PRED.floorHerd) {
      s.herdCull -= 1;
      Econ.removeResident(s, houses, 'culled');
    }

    if (f.ceiling > 0 && f.head < f.ceiling * TUNE.PRED.rearmAt) C.herdTold = 0;
    else if (!C.herdTold && f.ceiling > 0 && f.head >= f.ceiling * TUNE.PRED.warnAt && f.empty >= 2) {
      C.herdTold = 1;
      const why = f.dominant === 'cover'
        ? 'The treeline is what is taking them: ' + Math.round((f.dominantMult - 1) / TUNE.PRED.coverPenalty * 100) +
          '% of the ground around your nests is treed. A SENTINEL KNOLL costs $' +
          BUILDINGS.sentinelknoll.cost + ' and needs no water, no trail and no food.'
        : 'Small colonies are watched harder than big ones. More nests IN THE OPEN is the answer; ' +
          'more nests in cover is not.';
      Econ.log(s, '\u{1F995}', 'The colony has stopped growing — the ground is holding it down.');
      UI.toast('\u{1F995} THE RANGE IS FULL AT ' + Math.round(f.ceiling) + ' HEAD and you have ' +
        f.beds + ' bowls. ' + why, 15000);
    }
  },

  prologueGate(s) {
    const P = TUNE.PRED;
    const left = Math.max(0, P.stageSeconds - (s.tick || 0));
    const head = Game.housedResidents(s);
    const ready = left <= 0 && head >= P.exitHead;
    return {
      left, head, needHead: P.exitHead, ready,
      binds: left > 0 ? 'time' : (head < P.exitHead ? 'head' : null),
      text: ready ? 'the sky is changing colour'
          : left > 0 ? Math.ceil(left) + 's before the sky changes'
          : 'the range has held ' + head + ' of ' + P.exitHead + ' head',
    };
  },

  HERD_NAMES: { mammoth: 'woolly mammoth', bison: 'steppe bison', rhino: 'woolly rhinoceros', sabertooth: 'sabertooth',
                titanosaur: 'titanosaur', hadrosaur: 'crested hadrosaur', ceratopsian: 'horned ceratopsian', raptor: 'raptor' },
  HERD_ICON: { mammoth: '\u{1F9A3}', bison: '\u{1F9AC}', rhino: '\u{1F98F}', sabertooth: '\u{1F405}',
               titanosaur: '\u{1F995}', hadrosaur: '\u{1F995}', ceratopsian: '\u{1F996}', raptor: '\u{1F996}' },

  herdsFor(era) {
    const rung = rungOf(era);
    const keys = Object.keys(TUNE.ERA_HERDS).map(Number).sort((a, b) => a - b);
    let pick = null;
    for (const k of keys) if (k <= rung) pick = TUNE.ERA_HERDS[k];
    return pick;
  },
  herdsActive(s) { return !!(s && Econ.herdsFor(s.era)); },

  herdSpot(rnd, ring) {
    const C = TUNE.WORLD / 2;
    const a = rnd() * Math.PI * 2;

    const lo = ring[0], hi = ring[1];
    const r = Math.sqrt(lo * lo + rnd() * (hi * hi - lo * lo));
    return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r };
  },

  seedHerds(s) {
    const H = Econ.herdsFor(s.era);
    if (!H) return [];
    const rnd = Util.mulberry32((s.seed ^ 0x5EED) >>> 0);
    const herds = [];
    let id = 1;

    const ring = H.seedRing || [28, 100];

    const near = H.nearRing || [30, 48];
    for (const kind in H.counts) {
      for (let i = 0; i < H.counts[kind]; i++) {
        const p = Econ.herdSpot(rnd, i === 0 ? near : ring);
        herds.push({ id: id++, kind, x: p.x, y: p.y, heading: rnd() * Math.PI * 2, turn: 0 });
      }
    }
    return herds;
  },

  topUpHerds(s) {
    const H = Econ.herdsFor(s.era);
    if (!H || !s.herds) return 0;
    const rnd = Util.mulberry32((s.seed ^ 0xA11E) >>> 0);
    const ring = H.returnRing || [45, 85];
    let id = 1, added = 0;
    for (const h of s.herds) if (h.id >= id) id = h.id + 1;
    for (const kind in H.counts) {
      let have = 0;
      for (const h of s.herds) if (h.kind === kind) have++;
      for (let i = have; i < (H.counts[kind] | 0); i++) {
        const p = Econ.herdSpot(rnd, ring);
        s.herds.push({ id: id++, kind, x: p.x, y: p.y, heading: rnd() * Math.PI * 2, turn: 0 });
        added++;
      }
    }
    return added;
  },

  herdReturns(s, H) {
    const R = H.returnEvery;
    if (!R) return;
    const W = TUNE.WORLD;
    let kindIdx = 0;
    for (const kind in H.counts) {
      const every = R[kind] | 0;
      kindIdx++;
      if (every <= 0) continue;

      if ((s.tick + kindIdx * 37) % every !== 0) continue;
      const cap = H.counts[kind] | 0;
      let have = 0;
      for (const h of s.herds) if (h.kind === kind) have++;
      if (have >= cap) continue;

      const rnd = Util.mulberry32((s.seed ^ (s.tick * 2654435761) ^ (kindIdx * 0x9E37)) >>> 0);

      const p = Econ.herdSpot(rnd, H.returnRing || [45, 85]);
      const x = p.x, y = p.y;
      let id = 1;
      for (const h of s.herds) if (h.id >= id) id = h.id + 1;
      s.herds.push({ id, kind, x, y, heading: rnd() * Math.PI * 2, turn: 0 });

      if (H.announce && H.announce[kind]) {
        Econ.log(s, Econ.HERD_ICON[kind] || '\u{1F43E}',
          'A ' + Econ.HERD_NAMES[kind] + ' has come onto the range from the far country.');
      }
    }
  },

  herdTick(s, offline) {

    const H = Econ.herdsFor(s.era);
    if (!H) return;
    if (!s.herds) s.herds = Econ.seedHerds(s);
    if (offline) return;
    const W = TUNE.WORLD, C = W / 2;

    const rnd = Util.mulberry32((s.seed ^ s.tick) >>> 0);
    for (const h of s.herds) {

      h.turn = (h.turn || 0) * 0.92 + (rnd() - 0.5) * 0.016;
      if (h.turn > 0.05) h.turn = 0.05; else if (h.turn < -0.05) h.turn = -0.05;
      h.heading += h.turn;
      const sp = H.speed[h.kind] || 0.1;
      const nx = h.x + Math.cos(h.heading) * sp, ny = h.y + Math.sin(h.heading) * sp;
      if (Math.hypot(nx - C, ny - C) < H.standoff ||
          nx < 12 || ny < 14 || nx > W - 12 || ny > W - 12 ||
          G.cache.terrain[Grid.key(Math.round(nx), Math.round(ny))] === TERRAIN.MOUNTAIN) {
        h.heading += Math.PI * (0.6 + rnd() * 0.8);
        h.turn = 0;
        continue;
      }
      h.x = nx; h.y = ny;
    }
    Econ.herdReturns(s, H);

    for (const b of s.buildings) {
      if (!DEF(b.type).huntBase || b.done === false) continue;
      if (!b.hunt) continue;
      b.hunt.left -= 1;
      if (b.hunt.left <= 0) Econ.resolveHunt(s, b);
    }
    {

      for (const b of s.buildings) {

        if (!DEF(b.type).huntBase || b.done === false || b.mothballed) continue;
        if (b.hunt) continue;
        if (b.autoHunt === false) continue;
        if (b.huntRest > 0) { b.huntRest--; continue; }
        const t = Econ.nearestHerd(s, b);
        if (!t) continue;

        if (Econ.huntOdds(s, t.herd, t.dist, b) < TUNE.HUNT.autoMinOdds) continue;

        if (Econ.huntHaulRoom(s, t.herd.kind) < TUNE.HUNT.autoMinRoom) continue;

        if (Econ.launchHunt(s, b) === null) b.huntRest = TUNE.HUNT.rest;
      }
    }
  },

  huntedHerdIds(s) {
    const out = new Set();
    for (const b of s.buildings) if (b.hunt) out.add(b.hunt.herdId);
    return out;
  },

  huntHaulRoom(s, kind) {
    const haul = (TUNE.HUNT.haul || {})[kind];
    if (!haul) return 1;
    let want = 0, fits = 0;
    for (const k in haul) {
      const room = Math.max(0, Econ.capOf(s, k) - (s.stock[k] || 0));
      want += haul[k];
      fits += Math.min(haul[k], room);
    }
    return want > 0 ? fits / want : 1;
  },

  nearestHerd(s, b) {
    if (!s.herds) return null;
    const d = Grid.dimsOf(b);
    const cx = b.x + d.w / 2, cy = b.y + d.h / 2;

    const kinds = DEF(b.type).huntKinds || null;

    const taken = Econ.huntedHerdIds(s);
    let best = null, bd = Infinity;
    for (const h of s.herds) {
      if (kinds && kinds.indexOf(h.kind) === -1) continue;
      if (taken.has(h.id) && !(b.hunt && b.hunt.herdId === h.id)) continue;
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

    if (!camp) return 'no camp';
    if (camp.hunt) return 'this camp already has a party out';
    const t = Econ.nearestHerd(s, camp);
    if (!t) return 'no herd within reach — watch the steppe';
    const party = TUNE.HUNT.party;

    if (Game.housedResidents(s) <= party + TUNE.HUNT.autoSpare)
      return 'the camp cannot spare ' + party + ' hunters';

    const houses = s.buildings.filter(b => DEF(b.type).cap);
    for (let i = 0; i < party; i++) Econ.removeResident(s, houses, 'hunt');

    camp.hunt = {
      herdId: t.herd.id, kind: t.herd.kind, party,
      left: TUNE.HUNT.ticks, dist: Math.round(t.dist),
      odds: Econ.huntOdds(s, t.herd, t.dist, camp),
      camp: camp.type, campId: camp.id,
      cat: Econ.sabertoothNear(s, t.herd),

      seed: (s.seed ^ s.tick ^ (camp.id * 2654435761) ^ 0xBEEF) >>> 0,
    };
    const h = camp.hunt;
    Econ.log(s, '\u{1F3F9}', party + ' hunters walked out from the ' + DEF(camp.type).name +
      ' after the ' + Econ.HERD_NAMES[t.herd.kind] + ', ' + Math.round(t.dist) + ' tiles onto the steppe.');
    UI.toast('\u{1F3F9} THE HUNT IS OUT — ' + party + ' hunters from the ' + DEF(camp.type).name +
      ' tracking the ' + Econ.HERD_NAMES[t.herd.kind] +
      '. They are gone from your labour pool until they return. ' +
      'Odds ' + Math.round(h.odds * 100) + '%' + (h.cat ? ' — and a sabertooth is shadowing the herd.' : '.'), 12000);
    return null;
  },

  resolveHunt(s, camp) {

    const hunt = camp ? camp.hunt : null;
    if (camp) camp.hunt = null;
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

    const homeless = back - seated;
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
        (lost ? ' ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' did not come back.'
              : (homeless ? '' : ' Nobody was lost.')) +
        (homeless ? ' ' + homeless + ' came home to no bed and left the camp.' : ''));
      UI.toast('\u{1F3F9} THE HUNT CAME HOME — ' + got.join(', ') + '.' +
        (lost ? ' \u{1FAA6} ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' died on the steppe.'
              : (homeless ? '' : ' Everyone came back.')) +
        (homeless ? ' \u{1F3E0} ' + homeless + ' found no bed and walked on — build housing before you hunt.' : ''), 14000);
    } else {
      Econ.log(s, '\u{1F3F9}', 'The hunt FAILED — the ' + Econ.HERD_NAMES[hunt.kind] + ' broke away.' +
        (lost ? ' ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' did not come back.' : ''));
      UI.toast('\u{1F3F9} The hunt failed — the ' + Econ.HERD_NAMES[hunt.kind] + ' broke away' +
        (lost ? ', and \u{1FAA6} ' + lost + ' hunter' + (lost === 1 ? '' : 's') + ' died out there' : '') +
        '. The animal is still on the map. So are you.' +
        (homeless ? ' \u{1F3E0} ' + homeless + ' found no bed and walked on.' : ''), 12000);
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

    let best = 0;
    for (const b of s.buildings) {
      if (!DEF(b.type).fuelKeeper || b.mothballed || b.done === false) continue;
      if (!(b.staff || 0)) continue;
      best = Math.max(best, TUNE.FIREKEEPER.save * (1 + 0.5 * (rankOf(b) - 1)));
    }
    return sum * (1 - Math.min(0.9, best));
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
      Econ.removeResident(s, houses, 'freeze');
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

    if (Econ.canalActive(s)) {
      const reach = Econ.canalReach(s);
      C.water.fill(0);
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d.waterRadius || b.done === false || b.mothballed) continue;

        const r = Math.max(TUNE.SILT.reachFloor,
                           Math.round((d.waterRadius + rankRadiusBonus(b)) * reach));
        Grid.stampRadiusCircle(C.water, b, r);
      }
      return;
    }
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
        Econ.log(s, '\u{1F4A7}', 'The tank ran dry and the city browned out.');
        UI.toast('\u{1F4A7} THE TANK IS EMPTY — every aqueduct has gone dark, and with it everything ' +
          'that needs water. Your Milpas and Quarries keep working; nothing else does. MOTHBALL the ' +
          'industry until the rains, turn on the Reservoir Ration, and build a Chultun or an Aguada ' +
          'before the next dry season.', 16000);
      }
    }
  },

  BASE_CAP: (function () {
    const m = {};
    for (const g in TUNE.PRICES) {
      const k = g.toUpperCase() + '_CAP';
      if (TUNE[k] !== undefined) m[g] = k;
    }
    return m;
  })(),

  CRAFT_KINDS: ['clay', 'pottery', 'wool', 'cloth', 'beer', 'reeds', 'baskets',
                'sesame', 'oil', 'dyedcloth', 'mudbrick', 'salt', 'dates', 'fish',
                'cacao', 'chocolate',

                'deadwood', 'charcoal', 'hide', 'parka', 'flint', 'blades',
                'bone', 'ochre', 'carvings', 'ivory',

                'forage',

                'ore', 'concentrate', 'malachite', 'gold', 'goldleaf',
                'copper', 'bitumen', 'pitch',

                'olives', 'unguent', 'purplecloth', 'saffron', 'tin', 'bronze',

                'mulberry', 'cocoon', 'silk', 'brocade',
                'copperore', 'ritualbronze', 'brine',

                'brick', 'cotton', 'cottoncloth', 'carnelian', 'beads', 'shell', 'bangles',
                'coir', 'sennit', 'bast', 'tapa', 'nacre', 'lure', 'adze', 'feathers', 'cloak',

                'grapes', 'wine', 'silver',

                'salsamentum', 'tegula', 'silex',

                'passage',

                'natron', 'glass', 'pergamena', 'epistyle',

                'sigillata', 'marmor', 'pozzolana', 'concrete',
                'galena', 'plumbum', 'linum', 'velum',

                'iron', 'spolia', 'arma', 'calx'],

  capOf(s, kind) {

    const m = subTier(s).storageMult * (1 + 0.25 * (s.giftStore | 0));
    const base = TUNE[Econ.BASE_CAP[kind]] || 30;
    if (kind === 'grain' || kind === 'flour' || kind === 'game' || kind === 'pemmican') {

      const key = kind === 'grain' ? 'storeGrain' : kind === 'flour' ? 'storeFlour'
                : kind === 'game' ? 'storeGame' : 'storePemmican';
      let extra = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);

        if (!d || !d[key] || b.done === false || b.mothballed || Econ.siteBlock(b, d)) continue;

        extra += d[key] * rankStoreMult(b);
      }
      return Math.round(m * (base + extra));
    }

    if (kind === 'water') {
      let extra = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || !d.storeWater || b.done === false) continue;
        if (d.needsRoad && !b.conn) continue;
        extra += d.storeWater * rankStoreMult(b);
      }
      return Math.round(m * (base + extra));
    }

    if (Econ.CRAFT_KINDS.includes(kind)) {
      let extra = 0;
      for (const b of s.buildings) {
        const d = DEF(b.type);

        if (!d || !d.storeCraft || b.done === false || b.mothballed || Econ.siteBlock(b, d)) continue;
        if (b.staff !== undefined && d.workers && b.staff === 0) continue;
        extra += d.storeCraft * rankStoreMult(b);
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

      } else {

        G.cache.tickExport += overflow * TUNE.PRICES[kind] * exportMult(s);
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
        UI.toast('\u{1F4DC} ' + eraVoice(s.era).tallyLine +
          ' Press T for what this age actually produces.', 12000);
      }
      return;
    }
  },

  rentContribution(s, b) {
    const d = DEF(b.type);
    if (!d || b.type === 'road') return null;
    if (d.fixed) return RP.hallPerChapter * (s.hallLevel || 1);

    if (d.monument && !b.complete) return null;

    if (!Econ.counted(s, b)) return null;
    const ok = !b.status || b.status === 'ok' || b.status === 'understaffed';
    if (!ok) return null;
    return d.monument ? monumentRP(defEra(d)) : buildingRP(defEra(d), d) * rankOutMult(b);
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

  anyLampLit(ids) {
    if (!ids || !ids.length || !G.cache.litLamps) return false;
    for (const id of ids) if (G.cache.litLamps.has(id) && Econ.auraLive(id)) return true;
    return false;
  },

  foodEquiv(s) {
    let sum = 0;
    for (const f of TUNE.FOODS) sum += (s.stock[f.kind] || 0) * f.eff;
    return sum;
  },

  removeResident(s, houses, reason) {
    const occupied = houses.filter(h => h.residents > 0)
      .sort((a, b) => (a.level || 1) - (b.level || 1) || b.placed - a.placed);
    if (!occupied.length) return;
    const h = occupied[0];
    h.residents--;
    reason = reason || 'famine';
    if (s.records) {

      const key = reason === 'freeze' ? 'lostFreeze' : reason === 'hunt' ? 'huntDrafted'
        : reason === 'culled' ? 'lostCulled' : 'lostFamine';
      s.records[key] = (s.records[key] || 0) + 1;
    }
    Econ.floater(h, '-1');

    if (reason === 'famine') {
      UI.firstToast('starve', 'Residents are leaving. The city has been hungry for ' + TUNE.STARVE_MINUTES +
        ' minutes — ' + (Econ.hearthActive(s)
          ? 'get a Forage Ground and a Drying Rack running, fish the ice, or send a hunt.'
          : 'build a Farm, and a Mill to grind its grain into flour.'));
    } else if (reason === 'freeze') {
      UI.firstToast('freezeout', 'People are freezing out of the camp. This is not hunger — the fires ' +
        'are dark and the homes are cold. Fuel first; food will not fix it.');
    }
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
    let best = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.rankDiscount) continue;
      if (b.done === false || b.mothballed || !(b.staff > 0) || Econ.blockOf(b)) continue;
      if (d.rankDiscount > best) best = d.rankDiscount;
    }
    return 1 - best;
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

    if (overflow > 0) s.money += overflow * TUNE.PRICES[imp.kind] * exportMult(s);

    Econ.log(s, '\u{1F6B6}', imp.who + ' ' + TUNE.IMPORT_GRAIN.units + ' ' +
      goodLabel(s.era, imp.kind).toLowerCase() +
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

(() => {
  const bad = [];
  for (const k of Object.keys(Econ.ERA_EXTRA_GATE))
    if (!Econ.ERA_EXTRA_LABEL[k])
      bad.push('rung ' + k + ' has an ERA_EXTRA_GATE row and no ERA_EXTRA_LABEL — the era ' +
               'panel will print the generic fallback instead of naming the age’s condition');
  for (const k of Object.keys(Econ.ERA_EXTRA_LABEL))
    if (!Econ.ERA_EXTRA_GATE[k])
      bad.push('rung ' + k + ' has an ERA_EXTRA_LABEL and no ERA_EXTRA_GATE — the label is ' +
               'orphaned and eraExtraLabel returns null, so it is never printed');
  if (bad.length) console.error('EPOCH ERA_EXTRA parity:\n  ' + bad.join('\n  '));
})();
