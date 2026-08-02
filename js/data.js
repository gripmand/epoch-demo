'use strict';

const TUNE = {

  WORLD: 256,
  CHUNK: 4,

  START_MONEY: 3000,

  INVERT_PAN_X: false,
  INVERT_PAN_Y: true,
  FLOUR_PER_RESIDENT: 0.06,

  FOUNDING_GRANT: false,

  TALLY_FROM_START: true,

  FOUNDING: {
    purse: 1500,
    perMinute: 12,
  },

  START_STOCK: { grain: 30, flour: 12, stone: 0, blocks: 0,
                 clay: 0, pottery: 0, wool: 0, cloth: 0, beer: 0,
                 dates: 0, fish: 0, salt: 0, reeds: 0, baskets: 0,
                 sesame: 0, oil: 0, dyedcloth: 0, mudbrick: 0,
                 water: 0, cacao: 0, chocolate: 0, honey: 0,

                 deadwood: 45, charcoal: 0, game: 0, pemmican: 24, forage: 0,
                 hide: 0, parka: 0, flint: 0, blades: 0,
                 bone: 0, ochre: 0, carvings: 0, ivory: 0,

                 ore: 0, concentrate: 0, malachite: 0, gold: 0,
                 goldleaf: 0, copper: 0, bitumen: 0, pitch: 0,

                 brick: 0, cotton: 0, cottoncloth: 0,
                 carnelian: 0, beads: 0, shell: 0, bangles: 0,

                 olives: 0, unguent: 0, purplecloth: 0,
                 saffron: 0, tin: 0, bronze: 0 },

  FOUNDING_CREW: 10,

  ERA_STARTER: { 1: 'deadwoodcutter', 2: 'terraceplot', 3: 'snailbeds', 4: 'farm',
                 5: 'emmerfield', 6: 'leveefield',

                 7: 'figorchard', 14: 'milpa' },

  ERA_START_MONEY: { 0: 1080 },

  MIGRATION: {
    perMinute: 8,
    floor: 0.35,
    openFull: 8,
    hungerStop: 0.25,
  },

  STARVE_MINUTES: 20,
  HUNGER_STOP_GROWTH: 0.25,
  HUNGER_WARN: 0.5,
  HUNGER_RECOVER: 0.02,

  FLOUR_RESERVE_MIN: 2,
  GRAIN_CAP: 60,
  FLOUR_CAP: 40,
  STONE_CAP: 40,
  BLOCKS_CAP: 30,
  GRANARY_GRAIN: 80,
  GRANARY_FLOUR: 50,
  EXPORT_MULT: 0.5,

  CLAY_CAP: 50, POTTERY_CAP: 30, WOOL_CAP: 40, CLOTH_CAP: 25, BEER_CAP: 30,

  DATES_CAP: 30, FISH_CAP: 30, SALT_CAP: 40, REEDS_CAP: 50, BASKETS_CAP: 25,
  SESAME_CAP: 40, OIL_CAP: 25, DYEDCLOTH_CAP: 20, MUDBRICK_CAP: 40,

  CACAO_CAP: 40, CHOCOLATE_CAP: 25, HONEY_CAP: 35,

  DEADWOOD_CAP: 50, CHARCOAL_CAP: 30, GAME_CAP: 60, PEMMICAN_CAP: 40, FORAGE_CAP: 35,
  HIDE_CAP: 40, PARKA_CAP: 25, FLINT_CAP: 50, BLADES_CAP: 30,
  BONE_CAP: 40, OCHRE_CAP: 40, CARVINGS_CAP: 25, IVORY_CAP: 20,

  ORE_CAP: 40, CONCENTRATE_CAP: 23, MALACHITE_CAP: 30, GOLD_CAP: 24,
  GOLDLEAF_CAP: 15, COPPER_CAP: 19, BITUMEN_CAP: 30, PITCH_CAP: 19,

  BRICK_CAP: 53, COTTON_CAP: 53, COTTONCLOTH_CAP: 33,
  CARNELIAN_CAP: 40, BEADS_CAP: 26, SHELL_CAP: 53, BANGLES_CAP: 33,

  OLIVES_CAP: 46, UNGUENT_CAP: 38, SAFFRON_CAP: 46,
  TIN_CAP: 46, BRONZE_CAP: 29, PURPLECLOTH_CAP: 30,
  PRICES: { grain: 0.5, flour: 2, stone: 1, blocks: 4,
            clay: 0.6, pottery: 4, wool: 1.2, cloth: 7, beer: 3,
            dates: 1.8, fish: 1.5, salt: 1.5, reeds: 0.35, baskets: 8.9,
            sesame: 1.0, oil: 13, dyedcloth: 26, mudbrick: 3,

            water: 0, cacao: 9, chocolate: 24, honey: 2.4,

            deadwood: 0.6, charcoal: 3, game: 0.5, pemmican: 2, forage: 1.1,
            hide: 1.2, parka: 7, flint: 0.6, blades: 4,
            bone: 1.2, ochre: 1.5, carvings: 13, ivory: 18,

            ore: 0.9, concentrate: 2.4, malachite: 1.1, gold: 10,
            goldleaf: 21.3, copper: 5.32, bitumen: 1.2, pitch: 9.5,

            brick: 3.90, cotton: 1.56, cottoncloth: 9.10,
            carnelian: 2.34, beads: 33.81, shell: 1.56, bangles: 7.30,

            olives: 1.48, unguent: 19.28, purplecloth: 38.55,
            saffron: 2.22, tin: 1.63, bronze: 7.89 },

  NO_EXPORT: { water: 1 },

  FOODS: [ { kind: 'flour', eff: 1.0 }, { kind: 'pemmican', eff: 1.0 },
           { kind: 'dates', eff: 1.0 }, { kind: 'forage', eff: 0.8 },
           { kind: 'fish', eff: 0.75 }, { kind: 'honey', eff: 0.6 } ],
  LAND_BASE: 150,
  LAND_EXP: 1.35,

  GIFT_LAND_STEP: 0.15,
  DEMOLISH_REFUND: 0.5,
  CLEAR_TREE: 15,
  TERRA: { grass: 20, fertile: 45, water: 80, rock: 60, mountain: 150, tree: 25 },

  TICK_MIN: 1 / 60,

  TEMPO: 10,
  SPEEDUP: 22,
  OFFLINE_CAP_H: 24,
  OFFLINE_CAP_PER_STORE: 2,
  OFFLINE_CAP_MAX_H: 72,

  INSTANT_BUILD: true,

  TERRAIN_BONUS: 0.5,
  FERTILE_BONUS: 0.5,
  ADJ_BONUS: 0.25,
  AUTOSAVE_MS: 10000,

  SOIL: {

    saltMinutes: 300,
    fallowMinutes: 180,
    waterBonus: 3.0,
    waterLeach: 2,
    middenBonus: 3.0,
    minYield: 0.05,

    autoRestAt: 0.02,
  },

  ROCK_YIELD: 900,

  SILT: {
    perSource: 0.0007,
    dredgePerWorker: 0.0006,

    reachLoss: 0.65,
    reachFloor: 1,

    warnAt: 0.45,
    rearmAt: 0.20,
  },

  FORAGE: {
    crowd: 0.5,
    floor: 0.20,

    warnAt: 0.75,
    badAt: 0.55,
  },

  MOVING: {
    radiusCut: 0.5,
    slow: 0.20,

  },

  GRID: {
    minSide: 5,
    maxSide: 8,
    bonus: 0.30,
    upkeepCut: 0.10,
    capBonus: 1,
    drainRadius: 10,
    tolerance: 0,

    monBase: 0.6, monPerFrac: 0.8,

    gateFrac: 0.45,
  },

  SWEEP: { perDrain: 0.15, radius: 14 },

  MAGAZINE: {
    issuePer: { oil: 0.1017, dates: 0.1462 },
    freeAdmin: 4,
    reserveMin: 20,

    gateFrac: 0.90,
  },

  WIDEISSUE: { mult: 2.0, widen: 8 },

  TRIBUTE: {
    share: 0.35,
    base: 34.0,
    growth: 1.18,
    firstAt: 30,
    periodMin: 20,

    buyoutMult: 4,

    appeaseAt: 1.5,

    gate: 1180,
  },

  UNREST: {
    missed:   0.34,
    paid:    -0.06,
    appeased:-0.15,
    conscriptAt:    0.40,
    conscriptShare: 0.08,

    conscriptFloor: 10,
    strikeAt:   0.70,
    strikeSlow: 0.75,
    crashAt:    1.00,
    crashSlow:  0.60,
    clampNoGate:0.99,
  },

  SHIFT: { bonus: 0.25, hungerMult: 1.4, unrestPerLevy: 0.02 },

  PRED: {
    graceMinutes: 1.5,
    calving: 0.60,
    base: 0.034,
    coverRadius: 6,
    coverPenalty: 0.50,
    diluteRef: 20, diluteExp: 0.35,

    diluteMin: 0.55, diluteMax: 1.40,
    sentinelRelief: 0.25,
    offering: { good: 'beer', perHead: 0.02, relief: 0.45 },

    floorHerd: 2,
    warnAt: 0.90,
    rearmAt: 0.60,

    stageSeconds: 300,
    exitHead: 8,
  },

  HUDDLE: { cullCut: 0.35, capCut: 0.25 },

  DEADWOOD_YIELD: 500,

  FUEL: { deadwood: 1.0, charcoal: 3.0, bone: 1.0 },

  COLD: {
    freezeMinutes: 12,
    freezeFloor: 4,
    stopGrowth: 0.20,
    warnAt: 0.40,
    recover: 0.04,
  },

  FIREKEEPER: { save: 0.15 },

  FUEL_RESERVE_MIN: 2,

  HERDS: {
    counts: { mammoth: 8, bison: 22, rhino: 4, sabertooth: 5 },
    speed: { mammoth: 0.09, bison: 0.13, rhino: 0.10, sabertooth: 0.17 },
    standoff: 24,

    seedRing: [28, 100],

    returnRing: [45, 85],

    returnEvery: { bison: 180, sabertooth: 900, rhino: 1500, mammoth: 3600 },
  },
  HUNT: {
    party: 6,
    ticks: 60,
    range: 90,

    odds: { mammoth: 0.62, bison: 0.80, rhino: 0.50, sabertooth: 0.45 },
    distPenalty: 0.003,
    catOdds: 0.12,

    bonusChance: 0.35,
    bonus: { bison: 10, rhino: 25, mammoth: 50, sabertooth: 100 },
    rest: 45,
    autoMinOdds: 0.50,
    autoSpare: 4,

    autoMinRoom: 0.6,

    haul: {
      mammoth:    { game: 90, hide: 30, bone: 60, ivory: 8 },
      bison:      { game: 45, hide: 18, bone: 15 },
      rhino:      { game: 60, hide: 22, bone: 30, ivory: 4 },
      sabertooth: { hide: 10, ivory: 6 },
    },
  },

  SUPPLY: {
    freeRadius: 48,
    premiumPer: 40,
    maxMultiplier: 3,
  },

  TRADE: {
    freeRadius: 20,
    premiumPer: 30,
    maxMultiplier: 4,
  },

  SCRIBE: { radius: 20, bonus: 0.10 },

  HOUSE_UPGRADE_COST: 260,

  HOUSE_UPGRADE_ERA_MULT: Math.pow(2.1, 12 / 35),

  MON_RESERVE_TICKS: 2,

  DOLE: { rate: 2.0, hungerAt: 0.2, grainPerFlour: 1.6667 },
  DUES: { per: 0.04, radius: 20 },

  IMPORT_GRAIN: { units: 20, price: 2 },

  ERA_IMPORT: {

    0: { kind: 'flour', price: 8, who: 'A week grazing beyond the range brought back', unit: 'load' },
    1: { kind: 'pemmican', price: 8, who: 'A passing band traded the camp', unit: 'bundle' },

    2: { kind: 'grain', price: 2, who: 'A supply train sold the camp', unit: 'sack' },

    3: { kind: 'grain', price: 2, who: 'A band down from Karahan Tepe traded the town', unit: 'basket' },
    4: { kind: 'grain', price: 2, who: 'A caravan sold the city', unit: 'sack' },

    7: { kind: 'grain', price: 2, who: 'A ship out of Egypt put in and left the palace', unit: 'measure' },

    5: { kind: 'grain', price: 2, who: 'A river barge sold the estate', unit: 'sack' },

    6: { kind: 'grain', price: 2, who: 'A boat up from Lothal sold the city', unit: 'sack' },
    14: { kind: 'grain', price: 2, who: 'A highland trader sold the city', unit: 'load' },
  },

  LARDER: { recoverMin: 5, migrateMin: 10 },

  MOTHBALL_UPKEEP: 0.2,

  FALLOW_UPKEEP: 0.25,
  STAFF_UPKEEP_FLOOR: 0.5,

  BEER_RATION: { perResident: 0.02, bonus: 0.10 },

  CORVEE: { perResident: 0.03, bonus: 0.25 },

  FESTIVAL: { beerBase: 60, beerPerRes: 0.5, cloth: 15, hungerDrop: 0.3,
              settlers: 15, migMult: 1.5 },

  RESERVE_POLICY: { lean: 2, standard: 10, deep: 30 },

  SELL_LAND: 0.6,

  OVEN:   { radius: 8,  factor: 0.85 },
  WEIGH:  { radius: 10, bonus: 0.12 },
  BUREAU: { radius: 20, priceBonus: 0.15, slow: 0.10 },

  OX:     { radius: 14, fodder: 0.4, bonus: 0.20 },
  SHRINE_RADIUS: 8,

  NILE: {
    akhet: 90,
    peret: 210,
    shemu: 150,
    floodBand: 7,
    peretBonus: 0.25,
  },

  SEASON: {
    wet: 260,
    dry: 190,
  },

  WATER_CAP: 12,

  WATER_PER_RESIDENT: 0.09,
  WATER_PER_WORKER: 0.045,

  RATION: { drawCut: 0.40, slow: 0.15 },

  MONUMENT_BOOST: 0.20,

  PRESTIGE_PURSE_MULT: Math.pow(2.2, 12 / 35),

  RELIC_RING: 7,

  RANK_PRICE_BONUS: 0.20,
};

const HOUSE_RUNG_COST_MULT = [0.6, 1.0, 1.8, 3.0];

const HOUSE_RUNG_REF = { 0: 'nestmound', 1: 'hidetent', 3: 'brushshelter', 4: 'house',
                         5: 'villa', 14: 'stonehouse' };
function houseRungRefCost(era) {
  const rung = rungOf(era);
  const keys = Object.keys(HOUSE_RUNG_REF).map(Number).sort((a, b) => a - b);
  let pick = keys[0];
  for (const k of keys) if (k <= rung) pick = k;
  const ref = BUILDINGS[HOUSE_RUNG_REF[pick]];
  return (ref && ref.cost) || 0;
}

function houseUpgradeCost(era, level, d) {
  const step = HOUSE_RUNG_COST_MULT[Util.clamp((level || 1) - 1, 0, HOUSE_RUNG_COST_MULT.length - 1)];
  const refCost = houseRungRefCost(era);
  const typeMult = (d && d.cost && refCost) ? d.cost / refCost : 1;

  return Math.round(TUNE.HOUSE_UPGRADE_COST *
    Math.pow(TUNE.HOUSE_UPGRADE_ERA_MULT, rungOf(era) - 4) * step * typeMult / 10) * 10;
}

function buildMinutes() { return 0; }
function hallMinutes() { return 0; }
function hallCP() { return 0; }
function cpCap() { return 0; }
function buildersFor() { return Infinity; }

const ERAS = [

  { n: 1,  name: 'The Ice Age',        blurb: 'The long winter under the ice. Keep the fire alive.' },
  { n: 2,  name: 'The Gold Mines',     blurb: 'The overseers set the quota. The gold is not yours.' },
  { n: 3,  name: 'Göbekli Tepe',  blurb: 'The monument comes before the village.' },
  { n: 4,  name: 'Anunnaki',           blurb: 'The first seed. Sky-teachers hand you grain, water, and walls.' },
  { n: 5,  name: 'Ancient Egypt',      blurb: 'The river decides your year.' },
  { n: 6,  name: 'Indus Valley',       blurb: 'Administration as plumbing — the standard brick and the drains.' },
  { n: 7,  name: 'Minoan–Mycenaean', blurb: 'Everything comes into the palace store, and back out.' },
  { n: 8,  name: 'Ancient China',      blurb: 'Terraces on the loess, oracle bones under the floor.' },
  { n: 9,  name: 'Polynesian',         blurb: 'Ownership and kinship cross open water.' },
  { n: 10, name: 'Ancient Greece',     blurb: 'Your export buys your food — the corn route.' },
  { n: 11, name: 'Roman Republic',     blurb: 'Land is registered, not bought. The survey rules.' },
  { n: 12, name: 'Hellenistic',        blurb: 'A city at the far end of somebody else’s rope.' },
  { n: 13, name: 'Roman Age',          blurb: 'Water flows downhill through an empire of law.' },
  { n: 14, name: 'Maya',               blurb: 'No rivers. You live on what you caught in the wet season.' },
  { n: 15, name: 'Late Roman',         blurb: 'The deficit is paid out of the buildings themselves.' },
  { n: 16, name: 'Byzantium',          blurb: 'The half that never fell. Price is what the state allows.' },
  { n: 17, name: 'Dark Ages',          blurb: 'The previous age’s ruins are your quarry.' },
  { n: 18, name: 'Islamic Golden Age', blurb: 'Translation, astronomy, algebra and paper.' },
  { n: 19, name: 'Norse',              blurb: 'The ships go out. Not all of them come back.' },
  { n: 20, name: 'Feudal',             blurb: 'The rotation is forced — the course governs the fields.' },
  { n: 21, name: 'Trade Republics',    blurb: 'Credit: borrow against what your city is assessed to be worth.' },
  { n: 22, name: 'Cathedral Age',      blurb: 'Labour becomes typed — four crafts, four tiers, the guilds.' },
  { n: 23, name: 'Mongol Steppe',      blurb: 'The city itself moves. Pasture grazes and regrows.' },
  { n: 24, name: 'Mali',               blurb: 'Gold goes north, salt comes south, and distance pays.' },
  { n: 25, name: 'Ottoman',            blurb: 'The staged road from the map’s edge — the menzil.' },
  { n: 26, name: 'Aztec',              blurb: 'Manufacture the land itself, and keep it from sinking.' },
  { n: 27, name: 'The Plague',         blurb: 'The buildings all still stand. Nobody is left to work them.' },
  { n: 28, name: 'Renaissance',        blurb: 'Bespoke works, competing ateliers, a reputation to spend.' },
  { n: 29, name: 'Age of Sail',        blurb: 'A hold that fills at sea and settles on the tide.' },
  { n: 30, name: 'Industrial',         blurb: 'Steam, coal, and power by contiguity — the line shaft.' },
  { n: 31, name: 'Railway Age',        blurb: 'Distance stops being a bill and becomes a thing you buy.' },
  { n: 32, name: 'Electrification',    blurb: 'Demand is a 24-hour shape. You pay for the peak.' },
  { n: 33, name: 'Modern',             blurb: 'The commute: every road carries a load, and it shows.' },
  { n: 34, name: 'Information',        blurb: 'Buildings get worse with time now. Refit or decline.' },
  { n: 35, name: 'Orbital',            blurb: 'Leave the planet. Everything leaks, always.' },
  { n: 36, name: 'Interstellar',       blurb: 'Population becomes an output — the colonies remit forever.' },
  { n: 37, name: 'Transdimensional',   blurb: 'The Looking Glass opens. Money buys the rules themselves.' },
];
const MAX_ERA = 37;

const ERA_PROLOGUE = { n: 0, name: 'The Cretaceous',
  blurb: 'Ninety million years before anyone. Outgrow what eats you.' };
function eraInfo(era) {
  const r = rungOf(era);
  return r === 0 ? ERA_PROLOGUE : (ERAS[r - 1] || ERA_PROLOGUE);
}

const WRITTEN_RUNGS = [0, 1, 2, 3, 4, 5, 6, 7, 14];

const START_ERA = WRITTEN_RUNGS[0];
function nextWrittenEra(era) {
  for (const r of WRITTEN_RUNGS) if (r > era) return r;
  return null;
}

const MIGRATE_RUNG = {
  1: 4, 2: 5, 3: 14, 4: 26, 5: 10, 6: 13, 7: 22,
  8: 28, 9: 30, 10: 33, 11: 34, 12: 35, 13: 36, 14: 37,
};

const DEFAULT_ERA = 1;

function rungOf(era) {
  const e = (era == null || era !== era) ? DEFAULT_ERA : era;
  return Math.max(0, Math.round(e));
}

function defEra(d) { return (d && d.era != null) ? d.era : DEFAULT_ERA; }

function curEra(era) {
  if (era != null) return era;
  const live = (typeof G !== 'undefined' && G && G.s) ? G.s.era : null;
  return live != null ? live : START_ERA;
}

const ERA_GROWTH = Math.pow(3.6, 12 / 35);

const POP_GROWTH = Math.pow(1.38, 12 / 35);

function eraReq(n) {

  const g = gateMult();

  return {
    pop: Math.round(55 * Math.pow(POP_GROWTH, n - 5)),

    money: Math.round(100000 * Math.pow(ERA_GROWTH, n - 5) * g),

    food: Math.round(3500 * Math.pow(ERA_GROWTH, n - 5) * g),

    stone: n >= 8 ? Math.round(2500 * Math.pow(ERA_GROWTH, n - 8) * g) : 0,
  };
}

const SUB_MONTHLY = 12.00;

const PROFIT_CAP_MONTHLY = 10.00;

const RENT_MONTHLY = [0];
for (let n = 1; n <= MAX_ERA; n++) RENT_MONTHLY.push(+(0.060 * Math.pow(1.17823, n - 1)).toFixed(3));

const SUB_TIERS = {
  free: {
    key: 'free', name: 'Settler', price: 0,

    rentMult: 0.20,
    withdrawable: false,
    builders: 0,
    offlineH: 12,
    storageMult: 1.0,
    landDiscount: 0,
    perks: [
      'The full game, all 14 eras',
      'Rent accrues at 20% — withdrawable once you subscribe',
      '12h offline production',
    ],
  },
  citizen: {
    key: 'citizen', name: 'Citizen', price: SUB_MONTHLY,
    rentMult: 1.00,
    withdrawable: true,
    builders: 1,
    offlineH: 24,
    storageMult: 1.25,
    landDiscount: 0.10,
    perks: [
      'Earns 5x the rent of a free account',
      '+1 builder from era 1',
      '24h offline production',
      '+25% storage capacity',
      '10% off land parcels',
    ],
  },
};

function subTier(s) { return SUB_TIERS[(s && s.subTier) || 'free']; }

const PAYOUT_MODEL = 'cash';
const POOL_PCT_OF_REVENUE = 0.08;

const RP = {
  buildingBase: 1.0,
  buildingGrowth: 1.5,
  housingMult: 0.5,
  road: 0,
  hallPerChapter: 6,
  monumentBase: 200,

  monumentGrowth: 1.50,
};
function monumentRP(era) {
  return Math.round(RP.monumentBase * Math.pow(RP.monumentGrowth, era - 1));
}

function buildingRP(era, def) {
  const w = (def && def.rp !== undefined) ? def.rp : 1;

  return RP.buildingBase * w * Math.pow(RP.buildingGrowth, rungOf(era) - 1);
}

function rpHalf(era) {
  return 2400 * Math.pow(1.5, era - 1);
}

function rentAchievement(rp, era) {
  const k = rpHalf(era);
  return rp / (rp + k);
}

const STANDING_SECTIONS = 12;
const STANDING_FRONT = 0.50;

function standingSection(rp, era) {
  let s = 1;
  for (let i = 2; i <= STANDING_SECTIONS; i++) {
    if (rp >= standingThreshold(i, era)) s = i; else break;
  }
  return s;
}

function standingThreshold(i, era) {
  if (i <= 1) return 0;
  if (i > STANDING_SECTIONS) return Infinity;
  const f = Math.pow((i - 1) / STANDING_SECTIONS, 1 / STANDING_FRONT);
  if (f >= 1) return Infinity;
  return rpHalf(era) * f / (1 - f);
}

function rentMonthly(era, hallLevel, tierKey, rp) {
  const e = Util.clamp(Math.round(era), 1, MAX_ERA);
  const ceiling = RENT_MONTHLY[e];
  const mult = (SUB_TIERS[tierKey] || SUB_TIERS.citizen).rentMult;
  if (rp === undefined) {

    const frac = Util.clamp((hallLevel || 1) / e, 0, 1);
    return Math.min(ceiling * (0.55 + 0.45 * frac), SUB_MONTHLY + PROFIT_CAP_MONTHLY) * mult;
  }
  return Math.min(ceiling * rentAchievement(rp, e), SUB_MONTHLY + PROFIT_CAP_MONTHLY) * mult;
}
function rentPerDay(era, hallLevel, tierKey) { return rentMonthly(era, hallLevel, tierKey) / 30; }
function rentPerSec(era, hallLevel, tierKey) { return rentPerDay(era, hallLevel, tierKey) / 86400; }

function rentNetMonthly(era, hallLevel, tierKey) {
  const t = SUB_TIERS[tierKey] || SUB_TIERS.free;
  return rentMonthly(era, hallLevel, tierKey) - t.price;
}

const HALL_COST_GROWTH = Math.pow(2.1, 12 / 35);

const ERA_TERRA_LOCK = {

  0: {
    rock: 'the bone beds are what the floods left, one at a time, over millions of years — ' +
      'nothing in this age can make more of them, and that is the only thing this age is trying to teach you',
  },
  1: {
    tree: 'nothing grows here — the standing forest has been dead a thousand years, and no sapling takes in frozen loess',
    fertile: 'no ground on the glacial steppe will take a crop — this age eats what it hunts and gathers',
  },

  2: {
    rock: 'the ore is where the ore is — a ridge you painted yourself would refund the one clock this age cannot answer',
    mountain: 'the crest is the crest, and the adits are driven INTO it; a mountain you can paint is a mountain you can move',
  },

  3: {
    rock: 'the ridge is the ridge — this town cuts limestone out of the plateau and cannot put it back, ' +
      'and the Enclosure is made of the ground it stands on',
    water: 'there is no river up here and no way to make one. The karst takes the rain straight down ' +
      'through itself; you find the seeps, you do not dig them',
    fertile: 'nobody in this age has ever sown anything. Ground is good or it is not — and learning to ' +
      'improve it is the invention that ENDS this age',
  },

  4: {},

  5: {
    water: 'the river is the river — Egypt is given one Nile and builds around what it does, ' +
      'and a channel you dug yourself would make the Inundation something you could opt out of',
  },

  6: {
    rock: 'there is no stone on this plain — the city is made of its own mud because it has nothing ' +
      'else, and the one chert ridge on the map is a place you travel to rather than a thing you buy',
    mountain: 'no mountains, no timber and no defensible height anywhere in Sindh. Everything this ' +
      'civilisation is, it had to manufacture',
  },

  7: {
    rock: 'the spine is the spine. This island is one long limestone ridge and the gypsum cut out of ' +
      'it is the only reason the next age can be reached at all — you cannot put a scarp back',
    water: 'the sea is where it is. Every bay on this map was cut by something older than the palace, ' +
      'and there is no fresh water in any of it — that is what the Spring House is for',
  },

  14: {
    fertile: 'there is no deep soil to buy in the Petén — it is a few inches of leaf mould over ' +
      'limestone, and the only rich ground here is ground you made with ash and terraces',
  },
};

function rockYield(s) {
  const st = s || (typeof G !== 'undefined' && G ? G.s : null);
  return TUNE.ROCK_YIELD * (1 + 0.25 * ((st && st.giftSeams) | 0));
}

function landGift(s) {
  const st = s || (typeof G !== 'undefined' && G ? G.s : null);
  return Math.pow(1 - TUNE.GIFT_LAND_STEP, (st && st.giftLand) | 0);
}

function startMoneyFor(era) {
  const v = TUNE.ERA_START_MONEY[rungOf(era)];
  return v !== undefined ? v : TUNE.START_MONEY;
}

function terraCost(kind, era) {
  const e = rungOf(curEra(era));
  return Math.max(5, Math.round(TUNE.TERRA[kind] * Math.pow(HALL_COST_GROWTH, e - 4)));
}
function terraLocked(kind, era) {
  const L = ERA_TERRA_LOCK[rungOf(curEra(era))];
  return (L && L[kind]) || null;
}

const HALLS = [null];
for (let l = 1; l <= MAX_ERA; l++) {
  HALLS.push({
    cost: l === 1 ? 0 : Math.round(1500 * Math.pow(HALL_COST_GROWTH, l - 5) / 10) * 10,
    trickle: +Math.max(0.2, 0.8 + 0.45 * (l - 4)).toFixed(2),
  });
}

const ROAD_REQUIRED = ['townhall', 'house', 'villa', 'stonehouse', 'market', 'bazaar',
  'stoneyard', 'bakery', 'templeGranary', 'granary', 'temple',

  'rawstall', 'basketweaver', 'oilpress', 'dyeworks', 'weighhouse', 'tablethouse',
  'woolbureau', 'storehouse', 'breadoven', 'runnerpost',

  'nestmound', 'rookeryterrace', 'leafmat', 'blackmud', 'chalkdowns', 'marlfloor',
  'amberbed', 'buriedfall', 'eggbed', 'floodlayer', 'peatswamp', 'sunkenmire',
  'channellag', 'scourpool', 'petrifiedbar', 'stoneforest', 'refuge', 'siltbank',

  'shelter', 'rationshed', 'dolehouse', 'rawbarrow', 'pedlarsrow',
  'goldsmithbench', 'gildinghall', 'copperfurnace', 'crucibleyard',
  'charcoalclamp2', 'retortkiln', 'pitchboilery', 'asphaltworks',
  'hairclothshed', 'tentweavers', 'blockyard', 'masonsquay',
  'tributeyard', 'countinghouse', 'oreheap', 'sortingfloors',
  'overseerpost', 'ridgerelay', 'tallystone', 'reckoningpost'];

const BUILDINGS = {
  townhall: {
    name: 'Town Hall', tier: 'civic', w: 3, h: 3, cost: 0, upkeep: 0,
    icon: '\u{1F3DB}️', color: '#c9a86a', fixed: true,
    desc: 'Your permanent flagship. Pays an in-game trickle AND accrues real rent every second. One upgrade unlocks per era — rent compounds all the way to the Transdimensional age.',
  },

  landmark: {
    name: 'The Landmark', tier: 'civic', era: 0, w: 3, h: 3, cost: 0, upkeep: 0,
    icon: '\u{1F332}', color: '#6f8a4a', fixed: true, selfRun: true,
    desc: 'A sixty-metre araucaria on a rise, standing alone above the fern. The whole range is ' +
      'organised around it and nothing on this floodplain is out of sight of it. It pays a trickle ' +
      'into the record every second.',
  },

  waterhole: {
    name: 'Waterhole', tier: 'infra', era: 0, w: 1, h: 1, cost: 22, upkeep: 0.033,
    icon: '\u{1F573}\u{FE0F}', color: '#7fb4c9', selfRun: true, waterRadius: 3,

    desc: 'A hoof-punched hollow that holds water through the dry weeks. Waters 3 tiles. Everything ' +
      'that needs water shuts down without it — AND THE SEA DOES NOT COUNT: standing on the shore ' +
      'waters nothing, because coverage is stamped by a building and never by the ground.',
  },
  logjam: {
    name: 'Log Jam', tier: 'infra', era: 0, w: 2, h: 2, cost: 72, upkeep: 0.067,
    icon: '\u{1FAB5}', color: '#8a7a5c', selfRun: true, needsWater: true,
    depot: true, storeCraft: 7,

    desc: 'A driftwood raft piled in a river bend, holding everything the last flood carried. Extra ' +
      'capacity for every deposited good, and a SUPPLY POINT — so the chalk district out on the sea ' +
      'margin stops paying the carting premium.',
  },
  ford: {
    name: 'The Ford', tier: 'infra', era: 0, w: 1, h: 1, cost: 43, upkeep: 0.017,
    icon: '\u{1F6B6}', color: '#8fa8b5', selfRun: true, onWater: true, bridge: true,

    desc: 'A gravel bar shallow enough to cross. Laid ON water it carries the trail over the channel — ' +
      'lay a line of them and the far braid joins your range.',
  },

  fernprairie: {
    name: 'Fern Prairie', tier: 'food', era: 0, w: 2, h: 2, cost: 36, upkeep: 0.050,
    icon: '\u{1F33F}', color: '#7d9a55', selfRun: true, needsWater: true,
    out: { grain: 0.33 },

    desc: '0.33 browse/min off a stand of tree fern and horsetail. +50% on floodplain silt, +25% ' +
      'touching a Grazing Lawn. THREE of these feed one Lawn on plain ground, two on silt.',
  },
  grazinglawn: {
    name: 'Grazing Lawn', tier: 'food', era: 0, w: 2, h: 2, cost: 90, upkeep: 0.083,
    icon: '\u{1F343}', color: '#8fae62', selfRun: true, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 1.00, procOut: 'flour', procRatio: 0.6,

    desc: 'A stretch worked down to the root: 1.00 standing browse/min becomes 0.60 forage — 1.25 and ' +
      '0.75 when it touches a Prairie, because the +25% raises both sides. ONE LAWN FEEDS TEN HEAD. ' +
      'Industry: nothing nests beside a lawn with no cover on it.',
  },
  leafmat: {
    name: 'The Leaf Mat', tier: 'commerce', era: 0, w: 2, h: 2, cost: 90, upkeep: 0.100,
    icon: '\u{1F342}', color: '#6a7a4a', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 0.338, sellPrice: 3.07, custRadius: 6, custMin: 3,

    desc: 'Surplus the herd does not eat, trodden into airless mud and kept. 0.338 forage/min at $3.07. ' +
      'Needs 3 head. Forage sustains the range; it is not what makes it rich.',
  },

  coccolithshoal: {
    name: 'Coccolith Shoal', tier: 'food', era: 0, w: 2, h: 2, cost: 40, upkeep: 0.050,
    icon: '\u{1F41A}', color: '#d8dcc9', selfRun: true, nearWater: 3,
    out: { clay: 0.53 },

    desc: '0.53 marl/min. A bloom of armoured algae dying and settling three tiles off the sea edge, ' +
      'laying down the white mud the age is NAMED for — creta, chalk, Cretaceous. It still needs a ' +
      'Waterhole of its own: the sea it stands beside does not count.',
  },
  chalkbank: {
    name: 'Chalk Bank', tier: 'food', era: 0, w: 2, h: 2, cost: 94, upkeep: 0.093,
    icon: '\u{1F90D}', color: '#e2e0d2', selfRun: true, needsWater: true, industry: true,
    procIn: 'clay', procRate: 0.67, procOut: 'pottery', procRatio: 0.5,

    desc: '0.67 marl/min compacts into 0.34 chalk. Two Shoals feed it and leave change.',
  },
  chalkdowns: {
    name: 'Chalk Downs', tier: 'commerce', era: 0, w: 2, h: 2, cost: 87, upkeep: 0.100,
    icon: '\u{26F0}\u{FE0F}', color: '#eeece0', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'pottery', sellRate: 0.282, sellPrice: 6.79, custRadius: 7, custMin: 4,

    desc: '0.282 chalk/min at $6.79, on a sea floor going white. Needs 4 head, and it is always your ' +
      'FAR district — run a Log Jam out to it or pay the carting.',
  },

  bonebed: {
    name: 'Bone Bed', tier: 'food', era: 0, w: 2, h: 2, cost: 43, upkeep: 0.040,
    icon: '\u{1F9B4}', color: '#cfc4ae', selfRun: true, onRock: true, rockRadius: 11,
    industry: true,
    out: { stone: 0.80 },

    desc: '0.80 bone/min out of a channel-lag gravel, scaled by how much gravel is actually under it ' +
      '— three tiles of four is 0.70. It works every lens within 11 tiles. This is the one ground in ' +
      'the age you cannot make more of: there is no rock brush for sale here, and what the floods laid ' +
      'down took millions of years to lay.',
  },
  mineralseep: {
    name: 'Mineral Seep', tier: 'food', era: 0, w: 2, h: 2, cost: 94, upkeep: 0.093,
    icon: '\u{1F48E}', color: '#a8a8b5', selfRun: true, nearWater: 2, industry: true,
    procIn: 'stone', procRate: 0.67, procOut: 'blocks', procRatio: 0.5,

    desc: 'Mineral-charged groundwater moving through buried bone, atom for atom, until the bone IS ' +
      'the rock: 0.67 bone/min becomes 0.34 fossil. This is not a metaphor for fossilisation, it is ' +
      'the process.',
  },
  petrifiedbar: {
    name: 'The Petrified Bar', tier: 'commerce', era: 0, w: 2, h: 2, cost: 87, upkeep: 0.100,
    icon: '\u{1FAA8}', color: '#9c9488', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'blocks', sellRate: 0.282, sellPrice: 7.81, custRadius: 7, custMin: 4,

    desc: '0.282 fossil/min at $7.81, laid down in a gravel bar and left. The richest thing this age ' +
      'makes that a later age will dig up and argue about.',
  },

  resinconifer: {
    name: 'Resin Conifer Stand', tier: 'food', era: 0, w: 2, h: 2, cost: 47, upkeep: 0.050,
    icon: '\u{1F332}', color: '#5f7a4a', selfRun: true, dryLand: true,
    out: { wool: 0.33 },

    desc: '0.33 resin/min. Wants ground with NO fertile silt and NO water under it — the araucaria ' +
      'ridge, rain-fed and stressed, which is exactly when a conifer bleeds hardest. Dry ground is a ' +
      '+50% BONUS and never a wall; it is the reason amber pays what it pays.',
  },
  amberseep: {
    name: 'Amber Seep', tier: 'food', era: 0, w: 2, h: 2, cost: 108, upkeep: 0.100,
    icon: '\u{1F36F}', color: '#c98f2f', selfRun: true, needsWater: true, industry: true,
    procIn: 'wool', procRate: 0.53, procOut: 'cloth', procRatio: 0.5,

    desc: '0.53 resin/min hardens into 0.27 amber. A wound in a conifer, a beetle in the wound, and ' +
      'ninety million years. Nothing else in this age comes out of the ground finished.',
  },
  amberbed: {
    name: 'Amber Bed', tier: 'commerce', era: 0, w: 2, h: 2, cost: 116, upkeep: 0.116,
    icon: '\u{1F7E0}', color: '#d8a03f', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'cloth', sellRate: 0.225, sellPrice: 11.08, custRadius: 7, custMin: 5,

    desc: '0.225 amber/min at $11.08 — the richest thing this age makes and the fussiest to reach: ' +
      'the resin grew on ground with no water of its own, so a Spring Seep had to walk up there first.',
  },

  horsetailmarsh: {
    name: 'Horsetail Marsh', tier: 'food', era: 0, w: 2, h: 2, cost: 36, upkeep: 0.033,
    icon: '\u{1F33E}', color: '#6f8a5f', selfRun: true, nearWater: 2,
    out: { reeds: 0.40 },

    desc: '0.40 horsetail/min from the oxbow edge. Nearly worthless standing; the swamp underneath it ' +
      'is the whole point.',
  },
  peatswamp: {
    name: 'Peat Swamp', tier: 'commerce', era: 0, w: 2, h: 2, cost: 69, upkeep: 0.067,
    icon: '\u{1FAB5}', color: '#4a4a3a', selfRun: true, needsWater: true, needsRoad: true,
    procIn: 'reeds', procRate: 0.67, procOut: 'baskets', procRatio: 0.5,
    sells: 'baskets', sellRate: 0.310, sellPrice: 5.26, custRadius: 6, custMin: 3,

    desc: 'Buries and keeps in one place: 0.67 horsetail/min pressed into lignite and laid down on the ' +
      'spot at $5.26. TWO buildings and one landform where chalk needs three and two. Everything you ' +
      'press down here, a later age digs up and burns.',
  },

  clutchmound: {
    name: 'Clutch Mound', tier: 'food', era: 0, w: 2, h: 2, cost: 87, upkeep: 0.087,
    icon: '\u{1F95A}', color: '#c9b48f', selfRun: true, needsWater: true,
    procIn: 'grain', procRate: 0.67, procOut: 'beer', procRatio: 0.5,

    desc: '0.67 browse/min becomes 0.34 clutches. It drinks the same fern your Grazing Lawn wants, so ' +
      'the herd’s own fertility competes with the herd’s own dinner — grow more prairie, or ' +
      'choose. Clutches are also what a Carrion Ground gives away.',
  },
  eggbed: {
    name: 'Egg Bed', tier: 'commerce', era: 0, w: 2, h: 2, cost: 80, upkeep: 0.093,
    icon: '\u{1F423}', color: '#c9a86a', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'beer', sellRate: 0.394, sellPrice: 4.02, custRadius: 6, custMin: 3,

    desc: '0.394 clutches/min at $4.02, buried in successive flood layers. Auca Mahuevo is thousands ' +
      'of eggs across four such layers, and every one of them is a year the colony came back to the ' +
      'same mud.',
  },

  magnoliathicket: {
    name: 'Magnolia Thicket', tier: 'food', era: 0, w: 3, h: 3, cost: 90, upkeep: 0.067,
    icon: '\u{1F338}', color: '#b5849c', selfRun: true, saltProof: true,
    out: { dates: 0.50 },

    desc: 'The first flowers in the world, and a hadrosaur eats them: 0.50 fruit/min, eaten like ' +
      'forage. Needs NO water coverage and no road, ignores the trophic loop entirely, and takes +50% ' +
      'standing on ash-buried ground nobody else wants. It is what feeds the colony while the ' +
      'predators are being paid.',
  },
  rotwoodbed: {
    name: 'Rot-Wood Bed', tier: 'food', era: 0, w: 2, h: 2, cost: 58, upkeep: 0.050,
    icon: '\u{1F980}', color: '#7a6a4a', selfRun: true, nearWater: 2,
    out: { fish: 0.40 },

    desc: '0.40 crustaceans/min out of rotted conifer logs on the bar. Hadrosaur dung from this exact ' +
      'formation is full of decayed wood AND crustacean shell (Chin et al. 2017) — the herd was not a ' +
      'pure browser. Eaten at 75% of forage. Needs no water coverage, no road and no herd.',
  },

  channellag: {
    name: 'Channel Lag', tier: 'commerce', era: 0, w: 1, h: 2, cost: 51, upkeep: 0.050,
    icon: '\u{1F30A}', color: '#a89a7a', selfRun: true, needsWater: true, needsRoad: true,
    sellsRaw: ['stone', 'grain', 'clay', 'wool', 'reeds'], sellRate: 0.845,
    custRadius: 6, custMin: 3,

    desc: 'A bend where everything the flood carried settles out. Sells whichever raw the range has ' +
      'most of — bone, browse, marl, resin, horsetail — at 80% of list, 0.845/min. Your first income ' +
      'the minute the first shoal opens; knowing when to demolish it is the real decision.',
  },

  nestmound: {
    name: 'Nest Mound', tier: 'housing', era: 0, w: 1, h: 1, cost: 12, upkeep: 0.017,
    icon: '\u{1F95A}', color: '#b09a72', selfRun: true, cap: 2, needsWater: true, needsRoad: true,

    desc: 'A scraped bowl banked with rotting fern, warm from the inside. Holds 1, and 2 once it has ' +
      'earned a rung. +1 near a Wallow or a Sentinel Knoll, −1 next to industry — nothing nests beside ' +
      'a lawn with no cover on it.',
  },
  rookeryterrace: {
    name: 'Rookery Terrace', tier: 'housing', era: 0, w: 2, h: 2, cost: 30, upkeep: 0.043,
    icon: '\u{1F426}', color: '#c2a878', selfRun: true, cap: 6, needsWater: true, needsRoad: true,

    levels: ['Scrape Row', 'Rookery Terrace', 'Packed Rookery', 'Terraced Colony',
             'Great Rookery', 'Ancestral Rookery'],

    desc: 'Nests packed nest-to-nest at one adult’s reach: 3 head in four tiles, 6 once it has ' +
      'earned a rung. Colonial nesting IS the predation strategy — a hundred parents see a predator a ' +
      'hundred times sooner, and the dilution term is not a metaphor.',
  },

  wallow: {
    name: 'The Wallow', tier: 'civic', era: 0, w: 1, h: 1, cost: 29, upkeep: 0.017,
    icon: '\u{1F43E}', color: '#8a7a5f', selfRun: true, capRadius: 11,

    desc: 'Churned mud the whole range comes back to: cooling, parasites, and the only place everybody ' +
      'is in one place at once. +1 capacity for EVERY nest within 11 tiles. One is enough; a second ' +
      'adds nothing to a nest already covered.',
  },
  sentinelknoll: {
    name: 'Sentinel Knoll', tier: 'civic', era: 0, w: 1, h: 1, cost: 33, upkeep: 0.027,
    icon: '\u{1F441}\u{FE0F}', color: '#9a8f6a', selfRun: true,
    amenityRadius: 4, sentinelRelief: 0.25,

    desc: 'A rise with a clear line to the treeline. +1 capacity within 4 tiles, and nests it covers ' +
      'lose 25% less to predators — the cheapest lever in the age, the only one that costs no food, ' +
      'and the only one that still works when everything else has stopped.',
  },
  carrionground: {
    name: 'Carrion Ground', tier: 'civic', era: 0, w: 2, h: 4, cost: 145, upkeep: 0.100,
    icon: '\u{1F9B4}', color: '#8a7a6a', selfRun: true, offerRelief: 0.45,

    desc: 'Where the dead are left where they fall, and a clutch is left with them. Costs 0.02 ' +
      'clutches per head per minute and predators take 45% less from the living. It is the best ' +
      'defence in the age and you pay for it in FOOD — which is the entire point.',
  },
  refuge: {
    name: 'The Refuge', tier: 'civic', era: 0, w: 4, h: 4, cost: 325, upkeep: 0.116,
    icon: '\u{1F5FF}', color: '#a89a7a', selfRun: true, needsWater: true, needsRoad: true,
    depot: true, storeGrain: 80, storeFlour: 50,

    desc: 'A deep bank hollow the whole range shelters under: far more browse and forage capacity, and ' +
      'a supply point so the far districts stop paying the carting premium.',
  },

  skullcairn: {
    name: 'Skull Cairn', tier: 'beauty', era: 0, w: 1, h: 1, cost: 9, upkeep: 0,
    icon: '\u{1F480}', color: '#d8d0bc', selfRun: true, cosmetic: true,

    desc: 'A bleached skull propped where the flood dropped it. No output, no upkeep: being here is ' +
      'the point.',
  },
  standingtrunk: {
    name: 'Standing Trunk', tier: 'beauty', era: 0, w: 1, h: 1, cost: 9, upkeep: 0,
    icon: '\u{1FAB5}', color: '#a89484', selfRun: true, cosmetic: true,
    desc: 'A conifer that died standing and turned to stone where it stood, still upright ninety ' +
      'million years later. Pure landscape — zero output, zero upkeep.',
  },

  deepbrake: {
    name: 'The Deep Brake', tier: 'food', era: 0, w: 2, h: 2, cost: 108, upkeep: 0.088,
    icon: '\u{1F33F}', color: '#6f8a4a', selfRun: true, needsWater: true,
    out: { grain: 0.66 },
    desc: 'The stand let to grow deep and cut in strips instead of grazed flat, so it comes back ' +
      'behind the herd: 0.66 browse/min, double the open prairie.',
  },
  bloomshelf: {
    name: 'The Bloom Shelf', tier: 'food', era: 0, w: 2, h: 2, cost: 120, upkeep: 0.088,
    icon: '\u{1F41A}', color: '#e2e6d6', selfRun: true, nearWater: 3,
    out: { clay: 1.06 },
    desc: 'A shelf the bloom returns to every season, settling year on year: 1.06 marl/min.',
  },
  bledgrove: {
    name: 'The Bled Grove', tier: 'food', era: 0, w: 2, h: 2, cost: 141, upkeep: 0.088,
    icon: '\u{1F332}', color: '#4f6a3a', selfRun: true, dryLand: true,
    out: { wool: 0.66 },
    desc: 'Every trunk on the rise scored and left to weep, season after season: 0.66 resin/min. ' +
      'Still takes its bonus on ground with no silt and no water under it.',
  },
  oxbowbed: {
    name: 'The Oxbow Bed', tier: 'food', era: 0, w: 2, h: 2, cost: 108, upkeep: 0.058,
    icon: '\u{1F33E}', color: '#5f7a4f', selfRun: true, nearWater: 2,
    out: { reeds: 0.80 },
    desc: 'A whole cut-off meander gone to standing horsetail: 0.80/min, and the bed regrows behind ' +
      'the cut.',
  },
  deeplens: {
    name: 'The Deep Lens', tier: 'food', era: 0, w: 2, h: 2, cost: 129, upkeep: 0.070,
    icon: '\u{1F9B4}', color: '#c2b8a0', selfRun: true, onRock: true, rockRadius: 11,
    industry: true,
    out: { stone: 1.60 },
    desc: 'The lens opened and worked in courses rather than picked off the surface: 1.60 bone/min, ' +
      'still scaled by the gravel underneath it — and still on the one ground this age cannot make ' +
      'more of.',
  },

  blossomfall: {
    name: 'The Blossom Fall', tier: 'food', era: 0, w: 3, h: 3, cost: 270, upkeep: 0.117,
    icon: '\u{1F338}', color: '#c99ab0', selfRun: true, saltProof: true,
    out: { dates: 0.80 },
    desc: 'A thicket in full flower with the ground under it deep in fallen fruit: 0.80/min. Still ' +
      'needs no water coverage, and still owes the trophic loop nothing.',
  },
  sunklog: {
    name: 'The Sunk Log', tier: 'food', era: 0, w: 2, h: 2, cost: 174, upkeep: 0.088,
    icon: '\u{1F980}', color: '#6a5c40', selfRun: true, nearWater: 2,
    out: { fish: 0.64 },
    desc: 'Whole trunks worked down into the mud, rotting from the inside and crawling: 0.64/min. ' +
      'Needs no water coverage and no herd.',
  },

  trampleflat: {
    name: 'The Trample Flat', tier: 'food', era: 0, w: 2, h: 2, cost: 180, upkeep: 0.113,
    icon: '\u{1F343}', color: '#7d9a52', selfRun: true, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 1.40, procOut: 'flour', procRatio: 0.6,
    desc: 'Ground worked flat by the whole colony passing over it twice a day: 1.40 browse/min into ' +
      '0.84 forage. Fourteen head off one flat.',
  },
  whitecliff: {
    name: 'The White Cliff', tier: 'food', era: 0, w: 2, h: 2, cost: 188, upkeep: 0.126,
    icon: '\u{26F0}\u{FE0F}', color: '#f0eee2', selfRun: true, needsWater: true, industry: true,
    procIn: 'clay', procRate: 0.94, procOut: 'pottery', procRatio: 0.5,
    desc: 'The bank cut back until the section stands white and open: 0.94 marl/min into 0.47 chalk.',
  },
  slowwound: {
    name: 'The Slow Wound', tier: 'food', era: 0, w: 2, h: 2, cost: 216, upkeep: 0.136,
    icon: '\u{1F36F}', color: '#b58230', selfRun: true, needsWater: true, industry: true,
    procIn: 'wool', procRate: 0.74, procOut: 'cloth', procRatio: 0.5,
    desc: 'A wound kept open for decades instead of a season, and the fall under it metres deep: ' +
      '0.74 resin/min into 0.37 amber.',
  },
  broodbank: {
    name: 'The Brood Bank', tier: 'food', era: 0, w: 2, h: 2, cost: 174, upkeep: 0.118,
    icon: '\u{1F95A}', color: '#d8c9a8', selfRun: true, needsWater: true,
    procIn: 'grain', procRate: 0.94, procOut: 'beer', procRatio: 0.5,
    desc: 'A whole bank of mounds, laid and re-laid in the same season: 0.94 browse/min into 0.47 ' +
      'clutches. It drinks proportionally more of your dinner.',
  },
  silicaspring: {
    name: 'The Silica Spring', tier: 'food', era: 0, w: 2, h: 2, cost: 188, upkeep: 0.126,
    icon: '\u{1F48E}', color: '#b5b5c2', selfRun: true, nearWater: 2, industry: true,
    procIn: 'stone', procRate: 0.94, procOut: 'blocks', procRatio: 0.5,
    desc: 'Water rising through volcanic ash carries far more silica, and the replacement runs faster ' +
      'and finer: 0.94 bone/min into 0.47 fossil.',
  },
  sunkenmire: {

    name: 'The Sunken Mire', tier: 'commerce', era: 0, w: 2, h: 2, cost: 159, upkeep: 0.091,
    icon: '\u{1FAB5}', color: '#3a3a2c', selfRun: true, needsWater: true, needsRoad: true,
    procIn: 'reeds', procRate: 0.94, procOut: 'baskets', procRatio: 0.5,
    sells: 'baskets', sellRate: 0.620, sellPrice: 5.26, custRadius: 6, custMin: 3,
    desc: 'A mire deep enough that nothing which goes into it sees air again: 0.94 horsetail/min ' +
      'buried, and laid down twice as fast.',
  },

  blackmud: {
    name: 'The Black Mud', tier: 'commerce', era: 0, w: 2, h: 2, cost: 225, upkeep: 0.140,
    icon: '\u{1F342}', color: '#4a5238', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 0.676, sellPrice: 3.07, custRadius: 6, custMin: 3,
    desc: 'Airless, sour and metres deep — nothing that goes in comes back out: 0.676 forage/min laid ' +
      'down, double the mat.',
  },
  marlfloor: {
    name: 'The Marl Floor', tier: 'commerce', era: 0, w: 2, h: 2, cost: 218, upkeep: 0.140,
    icon: '\u{1F90D}', color: '#f2f0e6', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'pottery', sellRate: 0.564, sellPrice: 6.79, custRadius: 7, custMin: 4,
    desc: 'A sea floor going white from the shore to the horizon: 0.564 chalk/min, twice the downs.',
  },
  buriedfall: {
    name: 'The Buried Fall', tier: 'commerce', era: 0, w: 2, h: 2, cost: 290, upkeep: 0.162,
    icon: '\u{1F7E0}', color: '#e2ab48', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'cloth', sellRate: 0.450, sellPrice: 11.08, custRadius: 7, custMin: 5,
    desc: 'A whole resin fall taken down by one flood and sealed under the next: 0.450 amber/min. ' +
      'The richest deposit the age can lay.',
  },
  floodlayer: {
    name: 'The Flood Layer', tier: 'commerce', era: 0, w: 2, h: 2, cost: 200, upkeep: 0.130,
    icon: '\u{1F423}', color: '#d8b87a', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'beer', sellRate: 0.788, sellPrice: 4.02, custRadius: 6, custMin: 3,
    desc: 'Four seasons of nests one on top of the other, each sealed by the flood that ended it: ' +
      '0.788 clutches/min.',
  },
  scourpool: {
    name: 'The Scour Pool', tier: 'commerce', era: 0, w: 1, h: 2, cost: 128, upkeep: 0.070,
    icon: '\u{1F30A}', color: '#b5a684', selfRun: true, needsWater: true, needsRoad: true,
    sellsRaw: ['stone', 'grain', 'clay', 'wool', 'reeds'], sellRate: 1.690,
    custRadius: 6, custMin: 3,
    desc: 'The deep hole on the outside of the bend, where the whole flood unloads at once: 1.690 ' +
      'raw/min at 80% of list, double the lag.',
  },
  stoneforest: {
    name: 'The Stone Forest', tier: 'commerce', era: 0, w: 2, h: 2, cost: 218, upkeep: 0.140,
    icon: '\u{1FAA8}', color: '#a8a096', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'blocks', sellRate: 0.564, sellPrice: 7.81, custRadius: 7, custMin: 4,
    desc: 'Trunks and ribs standing in stone across a whole terrace: 0.564 fossil/min.',
  },

  seep: {
    name: 'Spring Seep', tier: 'infra', era: 0, w: 1, h: 1, cost: 55, upkeep: 0.053,
    icon: '\u{1F4A7}', color: '#7fb4c9', selfRun: true, waterRadius: 5,

    desc: 'A true seep at the foot of the ridge: waters 5 tiles and it does not go down in a drought. ' +
      'The only way to get water onto the upland, which is the only place amber grows.',
  },
  driftbank: {
    name: 'The Drift Bank', tier: 'infra', era: 0, w: 2, h: 2, cost: 180, upkeep: 0.121,
    icon: '\u{1FAB5}', color: '#7a6a4c', selfRun: true, needsWater: true,
    depot: true, storeCraft: 10,
    desc: 'Flood after flood piled into the same bend until the bank is made of it: half again the ' +
      'capacity for every deposited good, and still a supply point.',
  },
  churnedhollow: {
    name: 'The Churned Hollow', tier: 'civic', era: 0, w: 1, h: 1, cost: 73, upkeep: 0.031,
    icon: '\u{1F43E}', color: '#7a6a52', selfRun: true, capRadius: 16,
    desc: 'Generations of wallowing in one hollow until it is a pond: +1 capacity for every nest ' +
      'within 16 tiles.',
  },
  watchrise: {
    name: 'The Watch Rise', tier: 'civic', era: 0, w: 1, h: 1, cost: 83, upkeep: 0.049,
    icon: '\u{1F441}\u{FE0F}', color: '#a89a72', selfRun: true,
    amenityRadius: 6, sentinelRelief: 0.36,

    desc: 'A rise with sight of the whole range and somebody on it at all hours: +1 capacity within ' +
      '6 tiles, and nests it covers lose 36% less to predators.',
  },
  openkill: {
    name: 'The Open Kill', tier: 'civic', era: 0, w: 2, h: 4, cost: 363, upkeep: 0.140,
    icon: '\u{1F9B4}', color: '#7a6a5c', selfRun: true, offerRelief: 0.65,

    desc: 'Nothing is dragged off and nothing is buried: the whole kill is left in the open with a ' +
      'clutch beside it. Same 0.02 clutches per head, and predators take 65% less from the living.',
  },
  siltbank: {
    name: 'The Silt Bank', tier: 'civic', era: 0, w: 4, h: 4, cost: 813, upkeep: 0.209,
    icon: '\u{1F5FF}', color: '#b5a888', selfRun: true, needsWater: true, needsRoad: true,
    depot: true, storeGrain: 116, storeFlour: 73,
    desc: 'A whole cut bank of layered flood silt, hollowed out along the seams: half again the browse ' +
      'and forage the Refuge holds, and still a supply point.',
  },

  hearth: {
    name: 'Great Hearth', tier: 'infra', era: 1, w: 2, h: 2, cost: 60, upkeep: 0.10,
    icon: '\u{1F525}', color: '#d97f4a', warmRadius: 18,
    desc: 'A banked fire in a stone ring, with a screen against the wind. Its warmth reaches 18 tiles — ' +
      'far enough that ONE hearth carries a whole camp, so site it centrally and build outward. It ' +
      'burns whatever you have — wood, charcoal, bone — and when the fuel runs out every fire in the ' +
      'camp goes dark at once.',
  },
  longfire: {

    name: 'Longfire & Melt Row', tier: 'infra', era: 1, w: 2, h: 2, cost: 220, upkeep: 0.20,
    icon: '\u{1F3D5}\u{FE0F}', color: '#c9743f', warmRadius: 26, waterRadius: 14, warm: 0.10,
    desc: 'A trench fire with melt-cauldrons standing along it. Warmth out to 26 tiles AND water out ' +
      'to 14, from one object — and it burns 0.10 fuel a minute of its own to melt the snow. In this ' +
      'age, water costs firewood.',
  },

  icehole: {
    name: 'Melt Pit', tier: 'infra', era: 1, w: 1, h: 1, cost: 60, upkeep: 0.10,
    icon: '\u{1F573}\u{FE0F}', color: '#7fb4c9', waterRadius: 5, warm: 0.04,
    desc: 'A lined pit with a fire under it, kept thawed and hauled from by sled. Supplies water in a ' +
      '5-tile radius and can stand anywhere — snow is the one thing this age is never short of. ' +
      'Buildings without water shut down.',
  },
  cache: {
    name: 'Frozen Cache', tier: 'infra', era: 1, w: 1, h: 1, cost: 80, upkeep: 0.04,
    icon: '\u{1F9CA}', color: '#a8bfc9', storeGame: 25, storePemmican: 15, warm: 0.04,
    desc: 'A stone-lidded pit sunk into the permafrost. +250 game and +150 dried meat, no workers, ' +
      'no road. The larder that does not eat.',
  },
  storepit: {
    name: 'Permafrost Store', tier: 'infra', era: 1, w: 2, h: 2, cost: 200, upkeep: 0.20,
    icon: '\u{1F3EF}', color: '#9aa8b0', workers: 2, needsRoad: true, needsWater: true, needsWarm: true,
    depot: true, storeCraft: 20, warm: 0.10,
    desc: 'Racked hides and sealed bundles in a cut cellar: +200 capacity for every craft good, and a ' +
      'SUPPLY POINT so a woodlot two hours out of town does not pay the ×3 carting premium.',
  },
  sleddogpost: {
    name: 'Sled Dog Post', tier: 'infra', era: 1, w: 1, h: 1, cost: 200, upkeep: 0.25,
    icon: '\u{1F415}', color: '#b0a08a', workers: 1, needsRoad: true, depot: true, warm: 0.04,
    desc: 'A picket line, a sled, and eleven dogs who have opinions. Counts as a supply point — one ' +
      'post erases a frontier district’s carting premium. Dogs were domesticated in this very age.',
  },

  deadwoodcutter: {
    name: 'Deadwood Cutter', tier: 'food', era: 1, w: 2, h: 2, cost: 110, upkeep: 0.15,

    icon: '\u{1FA93}', color: '#8a7355', workers: 2,
    out: { deadwood: 1.6 },

    desc: 'Fells and splits 1.6 deadwood a minute from the nearest dead stands, at any distance — put ' +
      'it anywhere and the cutting front grows outward. It eats 500 from every tile it works, and a ' +
      'spent tile is ASH forever. Four tiles is 125 minutes of work. Plan where the next one goes ' +
      'before you build this one.',
  },
  reindeerdrive: {
    name: 'Reindeer Drive', tier: 'food', era: 1, w: 2, h: 2, cost: 100, upkeep: 0.15,

    icon: '\u{1F98C}', color: '#a89070', workers: 2,
    out: { game: 1.0 },
    desc: 'A drive lane of stone cairns funnelling the herd between them: 1 game a minute, anywhere on ' +
      'the open steppe. +25% when it touches a Drying Rack.',
  },
  iceweir: {
    name: 'Ice Weir', tier: 'food', era: 1, w: 1, h: 3, cost: 160, upkeep: 0.15,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 2, onWater: true,
    out: { fish: 0.7 },
    desc: 'A trap set under the river ice: 0.7 fish a minute, eaten at 75% of dried meat. It needs no ' +
      'fire, no herd and no wood — the one food in this era nothing else can take away from you.',
  },
  flintquarry: {
    name: 'Flint Quarry', tier: 'food', era: 1, w: 2, h: 2, cost: 110, upkeep: 0.15,
    icon: '\u{1FAA8}', color: '#8f939c', workers: 2, onRock: true, rockRadius: 20, industry: true,

    out: { flint: 1.6 },
    desc: 'Nodules broken out of the chert on the moraine ridge: 1.6 flint a minute. It works every ' +
      'outcrop within 20 tiles, nearest first — put it anywhere within reach of rock, and stand it ON ' +
      'the rock for +50%. The ridge does not grow back: a worked-out tile stops being rock forever.',
  },
  boneyard: {
    name: 'Mammoth Boneyard', tier: 'food', era: 1, w: 2, h: 2, cost: 120, upkeep: 0.12,
    icon: '\u{1F9B4}', color: '#cfc4ae', workers: 2, onSalt: true,
    out: { bone: 1.0 },

    desc: 'A bend in the river where the bones pile up: 1 bone a minute, and +50% standing on a white ' +
      'bonebed. Burn it when the wood runs out, or send it to a CARVER\'S LODGE for carvings — the ' +
      'Painted Cave wants 1,000 of them. Bonebeds are 1.5% of this map.',
  },
  ochrepit: {
    name: 'Ochre Bank', tier: 'food', era: 1, w: 2, h: 2, cost: 100, upkeep: 0.10,

    icon: '\u{1F7E5}', color: '#b5502f', workers: 2, nearWater: 5,
    out: { ochre: 1.2 },
    desc: 'Red iron oxide cut open by the river: 1.2 ochre a minute, from a bank within 5 tiles of the ' +

      'ice. Nearly worthless to sell. The Painted Cave will want 9,000 of it — that is the real bill, ' +
      'and it is why this is not an optional building.',
  },

  foragecamp: {
    name: 'Forage Ground', tier: 'food', era: 1, w: 2, h: 2, cost: 90, upkeep: 0.12,
    icon: '\u{1F33F}', color: '#7a8a6a', workers: 2, nearTrees: 3,
    out: { forage: 1.2 },

    desc: 'Cloudberries, crowberries, roots dug from under the moss, and lichen boiled soft: 1.2 forage ' +
      'a minute, eaten at 80% of dried meat. It works anywhere and is worth 50% more standing in scrub. ' +
      'It needs no herd, no river and NO FIRE — when the hearths go dark this is the only food left.',
  },

  charclamp: {
    name: 'Charcoal Clamp', tier: 'food', era: 1, w: 2, h: 2, cost: 260, upkeep: 0.28,
    icon: '\u{1F32B}\u{FE0F}', color: '#5c5450', workers: 3, needsWater: true, industry: true,
    procIn: 'deadwood', procRate: 2.0, procOut: 'charcoal', procRatio: 0.5,
    desc: 'A turf-sealed mound burning wood down to charcoal: 2 deadwood a minute into 1 charcoal. ' +
      'Charcoal delivers three times the warmth, so the clamp gets 50% MORE heat out of the same tree — ' +
      'and it is the only way to turn firewood worth $0.60 into something worth $6.80. It is its own fire.',
  },
  dryrack: {
    name: 'Drying Rack', tier: 'food', era: 1, w: 2, h: 2, cost: 250, upkeep: 0.25,
    icon: '\u{1F356}', color: '#a8543a', workers: 3, needsWater: true, needsWarm: true, warm: 0.15, industry: true,
    grainMill: true,
    procIn: 'game', procRate: 3.0, procOut: 'pemmican', procRatio: 0.75,
    desc: 'Rows of split meat over slow smoke: 3 game a minute into 2.25 dried. Three Drives feed one ' +
      'Rack, and each Drive it touches works 25% harder. It needs the fire — if the hearth goes dark, ' +
      'so does dinner.',
  },
  tannery: {
    name: 'Hide Frames', tier: 'food', era: 1, w: 2, h: 2, cost: 300, upkeep: 0.30,
    icon: '\u{1F9F5}', color: '#9a7a58', workers: 3, needsWater: true, needsWarm: true, warm: 0.15, industry: true,
    procIn: 'game', procRate: 1.6, procOut: 'hide', procRatio: 0.5,
    desc: 'Skins pegged, scraped and worked soft. 1.6 game a minute into 0.8 hide. Every carcass on ' +
      'this frame is a carcass nobody eats.',
  },
  knapfloor: {
    name: 'Knapping Floor', tier: 'food', era: 1, w: 2, h: 2, cost: 260, upkeep: 0.28,
    icon: '\u{1FAA8}', color: '#7a7d85', workers: 3, needsWater: true, needsWarm: true, warm: 0.15, industry: true,
    procIn: 'flint', procRate: 2.0, procOut: 'blades', procRatio: 0.5,
    desc: 'A struck-flake floor a foot deep in debris: 2 flint a minute into 1 blade bundle. The most ' +
      'portable wealth in the age.',
  },

  meatstall: {
    name: 'Meat Stall', tier: 'commerce', era: 1, w: 2, h: 2, cost: 250, upkeep: 0.30,
    icon: '\u{1F356}', color: '#c97f6a', workers: 2, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.12,
    sells: 'pemmican', sellRate: 0.6, sellPrice: 5.2, custRadius: 6, custMin: 5,
    desc: 'Sells 0.6 dried meat a minute at $5.20. Needs ≥5 residents, at any distance — hauls over ' +
      '20 tiles cost carting. Everything it sells is something the city was going to eat.',
  },
  fuelstack: {
    name: 'Fuel Stack', tier: 'commerce', era: 1, w: 2, h: 2, cost: 220, upkeep: 0.28,
    icon: '\u{1F9F1}', color: '#6e6157', workers: 2, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.12,
    sells: 'charcoal', sellRate: 0.7, sellPrice: 6.8, custRadius: 6, custMin: 5,
    desc: 'Sells 0.7 charcoal a minute at $6.80 — and charcoal is warmth. At three fuel a bag this ' +
      'counter is spending half your fire. The most profitable way there is to freeze.',
  },
  bladestall: {
    name: 'Blade Trader', tier: 'commerce', era: 1, w: 2, h: 2, cost: 240, upkeep: 0.30,
    icon: '\u{1F52A}', color: '#8a8f9c', workers: 2, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.12,
    sells: 'blades', sellRate: 0.5, sellPrice: 11.5, custRadius: 7, custMin: 6,
    desc: 'Sells 0.5 blade bundles a minute at $11.50. Needs ≥6 residents. Flint travelled hundreds ' +
      'of miles in this age and it is the one good here that does not rot, burn or walk away.',
  },
  carverlodge: {
    name: "Carver's Lodge", tier: 'commerce', era: 1, w: 2, h: 2, cost: 280, upkeep: 0.28,
    icon: '\u{1F9B4}', color: '#c9b491', workers: 3, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.15,
    procIn: 'bone', procRate: 2.0, procOut: 'carvings', procRatio: 0.5,
    sells: 'carvings', sellRate: 0.4, sellPrice: 13, custRadius: 6, custMin: 6,
    desc: 'Carves 2 bone a minute into figures and beads and sells 0.4 at $13. It makes 1, so ONE LODGE ' +
      'EATS TWO BONEYARDS — and it sells 40% of what it carves, so only the rest reaches the Cave, ' +
      'which wants 1,000. This is the first building in the game whose product does nothing at all.',
  },
  furhall: {
    name: 'Fur Hall', tier: 'commerce', era: 1, w: 2, h: 2, cost: 360, upkeep: 0.32,
    icon: '\u{1F9E5}', color: '#8a6a4f', workers: 3, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.15,
    procIn: 'hide', procRate: 0.6, procOut: 'parka', procRatio: 0.6667,
    sells: 'parka', sellRate: 0.3, sellPrice: 26, custRadius: 7, custMin: 8,
    desc: 'Sews 0.6 hide a minute into parkas and sells 0.3 at $26 — the richest trade in the age, and ' +
      'it eats the carcasses your Drying Rack wanted. Needs ≥8 residents.',
  },
  tradepost: {
    name: 'Trade Post', tier: 'commerce', era: 1, w: 1, h: 2, cost: 140, upkeep: 0.15,
    icon: '\u{1F6F7}', color: '#bd9a70', workers: 1, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.12,
    sellsRaw: ['ochre', 'bone', 'hide', 'flint', 'deadwood', 'ivory'], sellRate: 1.5,
    custRadius: 6, custMin: 4,
    desc: 'Sells whatever raw you have most of — ochre, bone, hide, flint, wood, ivory — at 80% of ' +
      'list, 1.5 a minute. First income the minute the first camp runs. Knowing when to demolish it is ' +
      'the real decision.',
  },

  tendedground: {
    name: 'Tended Ground', tier: 'food', era: 1, w: 2, h: 2, cost: 210, upkeep: 0.20,
    icon: '\u{1F33F}', color: '#8a9a72', workers: 3, nearTrees: 3,
    out: { forage: 2.4 },

    desc: 'The good patches, cleared of competitors and burned back to bring on the fruit, and returned ' +
      'to every season. 2.4 forage a minute — double the wild ground — for one more pair of hands. ' +
      'Still needs no herd, no river and no fire.',
  },
  smokelodge: {
    name: 'Smoke Lodge', tier: 'food', era: 1, w: 2, h: 2, cost: 420, upkeep: 0.34,
    icon: '\u{1F356}', color: '#8a4432', workers: 4, needsWater: true, needsWarm: true, warm: 0.18,
    industry: true, grainMill: true,
    procIn: 'game', procRate: 4.2, procOut: 'pemmican', procRatio: 0.84,
    desc: 'The racks, closed in under hide and kept at a slow smoke for days instead of hours. 4.2 game ' +
      'a minute into 3.5 dried — more meat AND more of each carcass surviving the process. It still ' +
      'needs the fire, and it needs more of it.',
  },
  pressurefloor: {
    name: 'Pressure-Flake Floor', tier: 'food', era: 1, w: 2, h: 2, cost: 430, upkeep: 0.34,
    icon: '\u{1FAA8}', color: '#6a6f78', workers: 4, needsWater: true, needsWarm: true, warm: 0.18,
    industry: true,
    procIn: 'flint', procRate: 2.8, procOut: 'blades', procRatio: 0.62,

    desc: 'Blades pressed off with an antler tine rather than struck. 2.8 flint a minute into 1.7 ' +
      'bundles — and the ridge is finite, so getting more out of every nodule is worth more than ' +
      'cutting faster.',
  },
  deepcache: {
    name: 'Deep Cache', tier: 'infra', era: 1, w: 1, h: 1, cost: 200, upkeep: 0.09,
    icon: '\u{1F9CA}', color: '#93aab5', storeGame: 65, storePemmican: 40, warm: 0.04,
    desc: 'Cut further down, through to the permanently frozen ground, and lidded with stone and turf. ' +
      '+650 game and +400 dried meat, still with no workers and no road. The larder that does not eat, ' +
      'twice over.',
  },
  tradering: {
    name: 'Trade Ring', tier: 'commerce', era: 1, w: 1, h: 2, cost: 300, upkeep: 0.26,
    icon: '\u{1F6F7}', color: '#c9a271', workers: 2, needsRoad: true, needsWater: true, needsWarm: true,
    warm: 0.12,
    sellsRaw: ['ochre', 'bone', 'hide', 'flint', 'deadwood', 'ivory', 'forage'], sellRate: 3.0,
    custRadius: 9, custMin: 4,

    desc: 'Not a bigger stall — a place on a route. Flint in this age travelled hundreds of miles, and ' +
      'this is the camp that other camps walk to. Sells 3 raw a minute at 80% of list, to the whole city.',
  },

  hunterscamp: {
    name: "Hunters' Camp", tier: 'food', era: 1, w: 2, h: 2, cost: 200, upkeep: 0.20,
    icon: '\u{1F3F9}', color: '#7d6b52', huntBase: true,
    huntKinds: ['bison'],
    desc: 'Spears, sledges, and the people who walk toward the herd on purpose. Six hunters leave the ' +
      'labour pool and come back with meat, hide and bone — or fewer hunters. It knows the STEPPE ' +
      'BISON and nothing else yet; every upgrade teaches it a bigger animal.',
  },
  spearlodge: {
    name: 'Spear Lodge', tier: 'food', era: 1, w: 2, h: 2, cost: 320, upkeep: 0.26,
    icon: '\u{1F3F9}', color: '#8a7355', huntBase: true,
    huntKinds: ['bison', 'rhino'], huntOddsBonus: 0.05,
    desc: 'Long spears, weighted and straightened, and people who have used them before. Adds the ' +
      'WOOLLY RHINOCEROS — half again the meat of a bison, and ivory with it. Every hunt runs at ' +
      '+5% odds.',
  },
  mammothblind: {
    name: 'Mammoth Blind', tier: 'food', era: 1, w: 2, h: 2, cost: 480, upkeep: 0.32,
    icon: '\u{1F9A3}', color: '#96795a', huntBase: true,
    huntKinds: ['bison', 'rhino', 'mammoth'], huntOddsBonus: 0.10,
    desc: 'A hide screen at the crossing, and the patience to wait behind it. Adds the WOOLLY ' +
      'MAMMOTH: 90 game, 60 bone and 8 ivory in one animal — the largest haul in the age. Every ' +
      'hunt runs at +10% odds.',
  },
  catlodge: {
    name: 'Sabretooth Lodge', tier: 'food', era: 1, w: 2, h: 2, cost: 700, upkeep: 0.40,
    icon: '\u{1F405}', color: '#a5804f', huntBase: true,
    huntKinds: ['bison', 'rhino', 'mammoth', 'sabertooth'], huntOddsBonus: 0.15,
    desc: 'The people who hunt the thing that hunts them. Adds the SABERTOOTH — almost no meat, but ' +
      'the pelt and the fangs are the richest thing this age can sell, and a good one pays $100 on ' +
      'top of the haul. Every hunt runs at +15% odds, which is what makes it survivable.',
  },

  hidetent: {
    name: 'Hide Tent', tier: 'housing', era: 1, w: 1, h: 1, cost: 120, upkeep: 0.05,
    icon: '\u{26FA}', color: '#c9a682', cap: 4, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.08,
    desc: 'Hides over a bent-pole frame, banked with snow. Homes 2 when it goes up, rising to 14 as it earns its rungs. Needs a fire within reach — a tent ' +
      'outside the hearth circle is a tent full of dead people.',
  },
  bonelodge: {

    name: 'Mammoth-Bone Lodge', tier: 'housing', era: 1, w: 2, h: 2, cost: 300, upkeep: 0.10,

    levels: ['Bone Frame', 'Mammoth-Bone Lodge', 'Long Lodge', 'Clan Longhouse',
             'Great Longhouse', 'Elder Longhouse'],
    icon: '\u{1F3D5}\u{FE0F}', color: '#d8cdb5', cap: 16, needsRoad: true, needsWater: true, needsWarm: true, warm: 0.13,
    desc: 'A ridge of arched tusks and mammoth rib, walled in stacked jaws and lashed over with hide: ' +
      'the longhouse of the age. Homes 8 when it goes up and 16 once it has earned a rung, on ONE fire — under half a tent\'s fuel a head. The building ' +
      'this age is actually remembered for.',
  },

  danceground: {
    name: 'Dance Ground', tier: 'civic', era: 1, w: 2, h: 2, cost: 80, upkeep: 0.05,
    icon: '\u{1FA98}', color: '#b09a86', amenityRadius: 20,
    desc: 'Swept, stamped, ringed with skulls and antler. +1 capacity for every home within 20 tiles. ' +
      'One is enough; a second adds nothing to a home already covered.',
  },
  shaman: {
    name: "Shaman's Tent", tier: 'civic', era: 1, w: 1, h: 1, cost: 200, upkeep: 0.12,
    icon: '\u{1FA84}', color: '#9a7fa8', needsWarm: true, warm: 0.04, keepsTally: true,
    desc: 'Someone has to know when the herd comes back, and be believed. +10% trade at every counter ' +
      'within 20 tiles, and the city can read its own numbers. One covers a camp.',
  },
  firekeeper: {
    name: "Firekeeper's Lodge", tier: 'civic', era: 1, w: 2, h: 3, cost: 500, upkeep: 0.45,
    icon: '\u{1F6E1}\u{FE0F}', color: '#c98a5a', workers: 4, needsWarm: true, warm: 0.06, fuelKeeper: true,
    desc: 'Four people whose entire job is that the fire does not go out: banked, screened, fed ' +
      'correctly. NOT a radius — every fire in the CITY burns 15% less, wherever this stands. Worth nothing at one chain and worth ' +
      'eight parcels at three.',
  },
  handprint: {
    name: 'Ochre Handprint Panel', tier: 'beauty', era: 1, w: 1, h: 1, cost: 25, upkeep: 0,
    icon: '\u{1F91A}', color: '#b5502f',
    desc: 'A hand, a mouthful of ochre, a wall. Names a quarter. No output and no upkeep — being here ' +
      'is the point.',
  },

  springhead: {
    name: 'Spring Head', tier: 'infra', era: 3, w: 1, h: 1, cost: 47, upkeep: 0.08,
    icon: '\u{1F4A7}', color: '#7a9aa8', waterRadius: 4,

    desc: 'A karst seep cleared out and given a stone lip. Waters four tiles around it. There is no ' +
      'river up here and no way to dig one — the water comes out of the rock where it comes out, and ' +
      'this is how you keep it.',
  },
  sunkensilo: {
    name: 'The Sunken Silo', tier: 'infra', era: 3, w: 1, h: 1, cost: 62, upkeep: 0.03,
    icon: '\u{1F573}\u{FE0F}', color: '#b8a882', storeGrain: 20, storeFlour: 12,

    desc: 'A stone-lined pit sunk under a raised floor, sealed and forgotten until you need it. ' +
      '+20 einkorn and +12 groats, and NO workers — the buffer that does not eat.',
  },
  skintentstore: {
    name: 'Skin-Tent Store', tier: 'infra', era: 3, w: 2, h: 2, cost: 155, upkeep: 0.15,
    icon: '\u{26FA}', color: '#a89070', workers: 2, depot: true, storeCraft: 17,

    desc: 'Hides over a bent-wood frame, racked and kept dry. +17 capacity for every craft good while ' +
      'staffed, and it counts as a SUPPLY POINT — the rim measures its carting to this, not to the core.',
  },
  carriercairn: {
    name: "Carrier's Cairn", tier: 'infra', era: 3, w: 1, h: 1, cost: 155, upkeep: 0.19,
    icon: '\u{1F9ED}', color: '#9a9284', workers: 1, depot: true, storeCraft: 9,

    desc: 'A marked stone and one person who does nothing but carry. Buildings measure their carting to ' +
      'the nearest shop, store or cairn — ONE CAIRN ERASES A WHOLE HUNTING RANGE\'S PREMIUM. Five blinds ' +
      'twelve tiles apart already span the whole free radius; the sixth is what this is for. Needs no ' +
      'road and no water.',
  },
  logcrossing: {
    name: 'Log Crossing', tier: 'infra', era: 3, w: 1, h: 1, cost: 93, upkeep: 0.04,
    icon: '\u{1F309}', color: '#8a7a5c', onWater: true, bridge: true,

    desc: 'Split trunks laid across the shallows. Placed ON the water, it carries the track to the far ' +
      'bank — the only way to reach the osier beds on the other side without terraforming a stream you ' +
      'are not allowed to paint.',
  },

  brushshelter: {
    name: 'Brush Shelter', tier: 'housing', era: 3, w: 1, h: 1, cost: 93, upkeep: 0.04,
    icon: '\u{1F6D6}', color: '#b8a276', cap: 3, needsRoad: true, needsWater: true,

    levels: ['Windbreak', 'Brush Shelter', 'Walled Shelter', 'Banked Shelter',
             'Hearth Shelter', "Elder's Shelter"],
    desc: 'Brush, hide and a windbreak wall on a swept floor. Homes 2 when it goes up, rising to 11 as ' +
      'it earns its rungs. Needs a track to the Enclosure and a spring within reach.',
  },
  roundhut: {
    name: 'Round Hut', tier: 'housing', era: 3, w: 1, h: 1, cost: 180, upkeep: 0.06,
    icon: '\u{1F3E0}', color: '#cfc4a8', cap: 6, needsRoad: true, needsWater: true,

    levels: ['Sunken Floor', 'Round Hut', 'Kerbed Hut', 'Twin-Roomed Hut',
             'Lineage House', "Founder's House"],
    desc: 'A sunk circular floor, a stone kerb, a conical roof of poles and reed. Homes 3 when it goes ' +
      'up, rising to 21. Round-oval dwellings like this are what ended the story that nobody lived here.',
  },

  aurochsblind: {
    name: 'Aurochs Blind', tier: 'food', era: 3, w: 2, h: 2, cost: 101, upkeep: 0.11,
    icon: '\u{1F402}', color: '#9a8a6a', workers: 2, dryLand: true,
    out: { game: 0.80 }, forageKind: 'game', forageRadius: 12,

    desc: 'A stone hide built on a wallow, downwind. 0.80 game a minute off DRY open ground, +50% when ' +
      'the whole footprint misses every spring and every red-soil pocket. ANOTHER BLIND INSIDE 12 TILES ' +
      'IS HUNTING THE SAME HERD, and you both take a third less. Game is not dinner until it is smoked.',
  },
  smokingtrench: {
    name: 'The Smoking Trench', tier: 'food', era: 3, w: 2, h: 2, cost: 194, upkeep: 0.19,
    icon: '\u{1F356}', color: '#8a5a3f', workers: 3, industry: true, grainMill: true,
    procIn: 'game', procRate: 2.40, procOut: 'pemmican', procRatio: 0.6,

    desc: 'A trench of embers, green-wood frames, three days. Turns 2.4 game a minute into 1.44 smoked ' +
      'meat — this town\'s bread. EXACTLY THREE BLINDS FEED ONE TRENCH. Needs no water, so it can stand ' +
      'out on the ridge with them, and each blind it touches works 25% harder.',
  },
  killshare: {
    name: 'The Kill Share', tier: 'commerce', era: 3, w: 2, h: 2, cost: 194, upkeep: 0.23,
    icon: '\u{1F969}', color: '#c9866a', workers: 2, needsRoad: true, needsWater: true,
    sells: 'pemmican', sellRate: 0.48, sellPrice: 4.96, custRadius: 6, custMin: 4,

    desc: 'The whole point of a kill is that it cannot be kept. Sells 0.48 smoked meat a minute at $4.96 ' +
      'to anyone in the town. Needs 4 residents, at any distance — hauls over 20 tiles cost carting.',
  },

  peggingground: {
    name: 'The Pegging Ground', tier: 'food', era: 3, w: 2, h: 2, cost: 233, upkeep: 0.23,
    icon: '\u{1FAA1}', color: '#9a7a58', workers: 3, industry: true,
    procIn: 'game', procRate: 1.28, procOut: 'cloth', procRatio: 0.5435,

    desc: 'Pegged out, fleshed, scraped and worked soft with brain and smoke. 1.28 game a minute becomes ' +
      '0.70 worked hide. Every carcass on this ground is a carcass nobody eats.',
  },
  hidepost: {
    name: "Hide Traders' Post", tier: 'commerce', era: 3, w: 2, h: 2, cost: 248, upkeep: 0.27,
    icon: '\u{1F9E5}', color: '#8a6a4f', workers: 2, needsRoad: true, needsWater: true,
    sells: 'cloth', sellRate: 0.35, sellPrice: 16.44, custRadius: 7, custMin: 7,

    desc: 'Sells 0.35 worked hide a minute at $16.44 to people who walked here from the Euphrates — the ' +
      'richest trade in the age and the fussiest to feed, because the blinds behind it want the driest ' +
      'ground on the ridge AND twelve tiles between them. Needs 7 residents.',
  },

  wildstand: {
    name: 'Wild Stand', tier: 'food', era: 3, w: 2, h: 2, cost: 78, upkeep: 0.11,
    icon: '\u{1F33E}', color: '#c2b06a', workers: 2, needsWater: true,
    out: { grain: 0.80 }, forageKind: 'grain', forageRadius: 8,

    desc: 'Nobody planted this. 0.80 wild einkorn a minute, cut with a flint sickle, +50% on the red ' +
      'terra rossa pockets. Crop the same hillside forever and it thins — rest it, heap bone on it, or ' +
      'move. And another stand inside 8 tiles is cutting your ears.',
  },
  parchingfloor: {
    name: 'The Parching Floor', tier: 'food', era: 3, w: 2, h: 2, cost: 194, upkeep: 0.19,
    icon: '\u{1F35A}', color: '#d8c28a', workers: 3, needsWater: true, industry: true, grainMill: true,
    procIn: 'grain', procRate: 2.40, procOut: 'flour', procRatio: 0.6,

    desc: 'Roast the ear over hot stones, pound it on a saddle quern, and it keeps. 2.4 einkorn a minute ' +
      'into 1.44 groats. EXACTLY THREE STANDS FEED ONE FLOOR. Seven thousand grinding stones have come ' +
      'out of this ridge — this is the most attested building in the age.',
  },
  groatshare: {
    name: 'The Groat Share', tier: 'commerce', era: 3, w: 2, h: 2, cost: 194, upkeep: 0.23,
    icon: '\u{1F963}', color: '#c9a86a', workers: 2, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 0.48, sellPrice: 4.96, custRadius: 6, custMin: 4,

    desc: 'Parched groats handed out by the measure. Sells 0.48 a minute at $4.96. Needs 4 residents. ' +
      'Not bread — nobody has bread yet, and nobody will for five thousand years.',
  },

  brewvats: {
    name: 'Limestone Brew Vats', tier: 'food', era: 3, w: 2, h: 2, cost: 186, upkeep: 0.20,
    icon: '\u{1F37A}', color: '#c9b06a', workers: 3, needsWater: true, industry: true,
    procIn: 'grain', procRate: 1.60, procOut: 'beer', procRatio: 0.5435,

    desc: 'Carved limestone troughs that still hold the oxalate residue of a wild-grain mash. 1.6 einkorn ' +
      'a minute into 0.87 brew. EXACTLY TWO STANDS FEED ONE SET — and with the Parching Floor that is ' +
      'five, eight tiles apart. It drinks what your people would have eaten, and it is the only wage a ' +
      'pillar-hauler will take.',
  },
  feastground: {
    name: 'The Feast Ground', tier: 'commerce', era: 3, w: 2, h: 2, cost: 171, upkeep: 0.21,
    icon: '\u{1F37B}', color: '#c98f4a', workers: 2, needsRoad: true,
    sells: 'beer', sellRate: 0.61, sellPrice: 5.96, custRadius: 6, custMin: 4,

    desc: 'Fire pits, bone heaps, and everyone within two days\' walk. Sells 0.61 brew a minute at $5.96 ' +
      '— the luxury out-earns the staple, and the grain it drank came out of the town\'s own mouth. ' +
      'Needs 4 residents and a track.',
  },

  flintdiggings: {
    name: 'Flint Diggings', tier: 'food', era: 3, w: 2, h: 2, cost: 85, upkeep: 0.11,
    icon: '\u{1FAA8}', color: '#8f939c', workers: 2, onRock: true, rockRadius: 20, industry: true,
    out: { flint: 1.39 },

    desc: 'Chert nodules broken out of the beds under the plateau: 1.39 a minute. It works every outcrop ' +
      'within 20 tiles, nearest first — stand it ON the rock for +50%. The ridge does not grow back, and ' +
      'your Pillar Quarry is eating the same ridge.',
  },
  coreshed: {
    name: 'The Core Shed', tier: 'food', era: 3, w: 2, h: 2, cost: 202, upkeep: 0.21,
    icon: '\u{1F52A}', color: '#7a7d85', workers: 3, industry: true,
    procIn: 'flint', procRate: 1.74, procOut: 'blades', procRatio: 0.5,

    desc: 'Prepared cores struck down to long regular blades: 1.74 chert a minute into 0.87 bundles. ' +
      'Most of the nodule is waste, and the waste is the floor you are standing on.',
  },
  tradersrock: {
    name: "The Traders' Rock", tier: 'commerce', era: 3, w: 2, h: 2, cost: 186, upkeep: 0.23,
    icon: '\u{1F5E1}\u{FE0F}', color: '#8a8f9c', workers: 2, needsRoad: true,
    sells: 'blades', sellRate: 0.44, sellPrice: 10.09, custRadius: 7, custMin: 5,

    desc: 'A flat stone where blade bundles change hands. Sells 0.44 a minute at $10.09 to people who ' +
      'walked here from four hundred miles away. Needs 5 residents. The one good in this age that does ' +
      'not rot, spoil or walk off.',
  },

  pillarquarry: {
    name: 'Pillar Quarry', tier: 'food', era: 3, w: 2, h: 3, cost: 85, upkeep: 0.11,
    icon: '⛏\u{FE0F}', color: '#cfc9b4', workers: 2, onRock: true, rockRadius: 20, industry: true,
    out: { stone: 1.39 },

    desc: 'Flint picks, wooden wedges and water poured into the cracks. Cuts 1.39 limestone a minute — ' +
      '2.09 standing on the slab, 0.70 reaching for it. Every block you take is gone forever; there is ' +
      'no midden for limestone. The Enclosure alone wants ten and a half tiles of this ridge.',
  },
  reliefshed: {
    name: 'The Relief Shed', tier: 'food', era: 3, w: 2, h: 2, cost: 171, upkeep: 0.17,
    icon: '\u{1F98A}', color: '#c4bda6', workers: 3, industry: true,
    procIn: 'stone', procRate: 1.74, procOut: 'carvings', procRatio: 0.5,

    desc: 'Foxes, boars, cranes, scorpions, a vulture, a snake — cut in relief into dressed limestone. ' +
      '1.74 stone a minute into 0.87 carved blocks. Sell them, or send them to the Enclosure, which ' +
      'counts each one for six of its raw limestone. You cannot do both.',
  },
  beaststones: {
    name: 'The Beast Stones', tier: 'commerce', era: 3, w: 2, h: 2, cost: 167, upkeep: 0.21,
    icon: '\u{1F40D}', color: '#b8b0a0', workers: 2, needsRoad: true,
    sells: 'carvings', sellRate: 0.35, sellPrice: 11.40, custRadius: 6, custMin: 5,

    desc: 'Carved blocks propped along the track for anyone walking in. Sells 0.35 a minute at $11.40 — ' +
      'less per minute than blades, and every one you sell is one the Enclosure does not get. ' +
      'Needs 5 residents.',
  },

  osierbeds: {
    name: 'Osier Beds', tier: 'food', era: 3, w: 2, h: 2, cost: 78, upkeep: 0.08,
    icon: '\u{1F33F}', color: '#7da45f', workers: 2, nearWater: 2,
    out: { reeds: 1.04 }, forageKind: 'reeds', forageRadius: 5,

    desc: 'Withies cut from the stream edge: 1.04 a minute, +50% within two tiles of water. Worthless ' +
      'raw and everything twisted. Build the Cordage Walk or you have bought a pile of sticks — and keep ' +
      'five tiles between beds or you are cutting the same bend twice.',
  },
  cordagewalk: {
    name: 'The Cordage Walk', tier: 'commerce', era: 3, w: 2, h: 2, cost: 147, upkeep: 0.15,
    icon: '\u{1F9F5}', color: '#c2a067', workers: 3, needsRoad: true,
    procIn: 'reeds', procRate: 1.74, procOut: 'baskets', procRatio: 0.5,
    sells: 'baskets', sellRate: 0.48, sellPrice: 7.81, custRadius: 6, custMin: 4,

    desc: 'Twists 1.74 withies a minute into line, netting and baskets and sells them on the spot at ' +
      '$7.81. Two buildings, five mouths — it earns less per building and more per worker than hide. ' +
      'Read your own tally.',
  },

  terebinthgrove: {
    name: 'Terebinth & Almond Grove', tier: 'food', era: 3, w: 3, h: 3, cost: 194, upkeep: 0.15,
    icon: '\u{1F333}', color: '#8fae72', workers: 3,
    out: { dates: 1.20 }, forageKind: 'dates', forageRadius: 10,

    desc: 'Terebinth and wild almond on the broken slope: 1.20 nuts a minute, eaten like groats. It owes ' +
      'nothing to your stands, your herds or your springs — but groves within 10 tiles of each other are ' +
      'picked by the same hands. Its nuts are also the only thing the Resin Hearth will take.',
  },
  resinhearth: {
    name: 'The Resin Hearth', tier: 'food', era: 3, w: 2, h: 2, cost: 202, upkeep: 0.21,
    icon: '\u{1FAD9}', color: '#a89143', workers: 3, industry: true,
    procIn: 'dates', procRate: 1.60, procOut: 'oil', procRatio: 0.5435,

    desc: 'Terebinth resin and pressed almond cooked down in a covered hearth: 1.60 nuts a minute into ' +
      '0.87 pitch. Hafting glue, lamp fuel, waterproofing, medicine. FOUR GROVES FEED THREE HEARTHS — ' +
      'and every nut in the pot is a nut nobody ate.',
  },
  resinpost: {
    name: 'The Resin Post', tier: 'commerce', era: 3, w: 2, h: 2, cost: 186, upkeep: 0.23,
    icon: '\u{1FA94}', color: '#b59a5f', workers: 2, needsRoad: true,
    sells: 'oil', sellRate: 0.35, sellPrice: 11.40, custRadius: 6, custMin: 5,

    desc: 'Sealed gourds of pitch, traded on. Sells 0.35 a minute at $11.40. Needs 5 residents. Every ' +
      'hafted blade in four hundred miles is stuck together with this.',
  },

  stonefishtrap: {
    name: 'Stone Fish Trap', tier: 'food', era: 3, w: 1, h: 3, cost: 124, upkeep: 0.11,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 2, onWater: true,
    out: { fish: 0.96 }, forageKind: 'fish', forageRadius: 6,

    desc: 'A V of stones in the shallows of the headwater. 0.96 fish a minute, eaten at 75% of a groat. ' +
      'It needs no stand, no herd and no spring — but a second trap within 6 tiles is downstream of ' +
      'nothing.',
  },

  snailbeds: {
    name: 'The Snail Beds', tier: 'food', era: 3, w: 2, h: 2, cost: 70, upkeep: 0.09,
    icon: '\u{1F40C}', color: '#8a9a6a', workers: 2, nearTrees: 3,
    out: { forage: 0.96 },

    desc: 'Helix by the basket off the scrub and the walls, boiled with greens and roots: 0.96 a minute, ' +
      'eaten at 80% of a groat. It needs no herd, no stand, no stream and NO GROUND OF ITS OWN — snails ' +
      'do not move, so no camp can ever crowd this one. When the ridge is picked out, this is what is left.',
  },

  barterrock: {
    name: 'Barter Rock', tier: 'commerce', era: 3, w: 1, h: 2, cost: 109, upkeep: 0.11,
    icon: '\u{1F91D}', color: '#bd9a70', workers: 1, needsRoad: true,
    sellsRaw: ['game', 'grain', 'stone', 'flint', 'reeds', 'dates'],
    sellRate: 1.31, custRadius: 6, custMin: 4,

    desc: 'A flat stone where things change hands. Sells whichever raw you hold most of — game, einkorn, ' +
      'limestone, chert, withies or nuts — at 80% of list, 1.31 a minute. Strictly worse than finishing ' +
      'a chain, strictly better than dumping abroad. Knowing when to demolish it is the real decision.',
  },
  bonetally: {
    name: 'Notched Bone Tally', tier: 'civic', era: 3, w: 1, h: 1, cost: 155, upkeep: 0.09,
    icon: '\u{1F9B4}', color: '#cfc4ae', keepsTally: true,

    desc: 'A split rib, scored once a load. Counting is nine thousand years older than writing. +10% ' +
      'sales throughput at every share, post and rock within 20 tiles; a second tally adds nothing to a ' +
      'shop already counted.',
  },
  gatheringcircle: {
    name: 'Gathering Circle', tier: 'civic', era: 3, w: 1, h: 1, cost: 62, upkeep: 0.04,
    icon: '⭕', color: '#c9bda0', capRadius: 19,

    desc: 'Swept ground, a ring of set stones, a fire in the middle. +1 housing capacity for every home ' +
      'within 19 tiles — the shared ground a quarter forms around. One is enough.',
  },
  skullshrine: {
    name: 'Skull Shrine', tier: 'civic', era: 3, w: 1, h: 1, cost: 70, upkeep: 0.06,
    icon: '\u{1F480}', color: '#d8cfb8', amenityRadius: 7,

    desc: 'Plastered skulls set in a wall niche, facing out. +1 housing capacity within 7 tiles — the ' +
      'Circle, for a quarter whose people will never walk to the Circle. It does not stack with one.',
  },
  boneheap: {
    name: 'The Bone Heap', tier: 'food', era: 3, w: 1, h: 1, cost: 70, upkeep: 0.06,
    icon: '\u{1F9F4}', color: '#b8ac93', soilRadius: 4,

    desc: 'Ten thousand aurochs, in a heap, burnt down and spread. Ground within 4 tiles recovers its ' +
      'stands 3x faster. This heap is how anyone knows how many people ate here.',
  },
  carvedboulder: {
    name: 'Carved Boulder', tier: 'beauty', era: 3, w: 1, h: 1, cost: 19, upkeep: 0,
    icon: '\u{1FAA7}', color: '#c4bda6', cosmetic: true, nameable: true,

    desc: 'A fox, a scorpion, a vulture, cut into a loose block and left where it lies. No output, no ' +
      'upkeep — the label is the point. Click it to name the quarter.',
  },

  desertkite: {
    name: 'The Desert Kite', tier: 'food', era: 3, w: 2, h: 2, cost: 200, upkeep: 0.20,
    icon: '\u{1FA81}', color: '#a89a72', workers: 3, dryLand: true,
    out: { game: 1.60 }, forageKind: 'game', forageRadius: 12,

    desc: 'Two low stone walls running a mile out across the steppe, narrowing to a killing pen. A ' +
      'DESERT KITE takes a whole herd where a blind takes an animal: 1.60 game a minute for one more ' +
      'pair of hands. Still the same twelve tiles of ground — a kite does not make more aurochs.',
  },
  sickleground: {
    name: 'The Sickle Ground', tier: 'food', era: 3, w: 2, h: 2, cost: 160, upkeep: 0.20,
    icon: '\u{1F33E}', color: '#cfb86a', workers: 3, needsWater: true,
    out: { grain: 1.60 }, forageKind: 'grain', forageRadius: 8,

    desc: 'The stand cleared of competitors, burned back on a cycle and cut with hafted sickles by a ' +
      'crew that has done it before. 1.60 einkorn a minute — double the wild ground, and still not sown.',
  },
  beddingtrench: {
    name: 'The Bedding Trench', tier: 'food', era: 3, w: 2, h: 3, cost: 170, upkeep: 0.20,
    icon: '⛏\u{FE0F}', color: '#d8d2bd', workers: 3, onRock: true, rockRadius: 20, industry: true,
    out: { stone: 2.78 },

    desc: 'The pillar cut free on three sides in its own trench and levered out whole, the way the one ' +
      'still lying in the bedrock was meant to be. 2.78 limestone a minute — and the ridge empties twice ' +
      'as fast.',
  },
  chertadit: {
    name: 'The Chert Adit', tier: 'food', era: 3, w: 2, h: 2, cost: 170, upkeep: 0.20,
    icon: '\u{1FAA8}', color: '#9aa0a8', workers: 3, onRock: true, rockRadius: 20, industry: true,
    out: { flint: 2.78 },

    desc: 'A driven gallery following the good seam under the cap rock instead of scratching the surface ' +
      'for it: 2.78 chert a minute. The seam is still finite and now you are through it in half the time.',
  },
  coppicerows: {
    name: 'The Coppice Rows', tier: 'food', era: 3, w: 2, h: 2, cost: 160, upkeep: 0.14,
    icon: '\u{1F33F}', color: '#8fae72', workers: 3, nearWater: 2,
    out: { reeds: 2.08 }, forageKind: 'reeds', forageRadius: 5,

    desc: 'Cut on a rotation instead of stripped, so the stool throws twice the rods: 2.08 withies a ' +
      'minute and the bed comes back every year. Still five tiles between beds.',
  },
  sluicepens: {
    name: 'The Sluice Pens', tier: 'food', era: 3, w: 1, h: 3, cost: 250, upkeep: 0.20,
    icon: '\u{1F41F}', color: '#5f9ea0', workers: 3, onWater: true,
    out: { fish: 1.92 }, forageKind: 'fish', forageRadius: 6,

    desc: 'The trap given gates and holding pens, so the run is not just caught but kept alive until it ' +
      'is wanted: 1.92 fish a minute out of the same stretch of water.',
  },
  nuttingslopes: {
    name: 'The Nutting Slopes', tier: 'food', era: 3, w: 3, h: 3, cost: 390, upkeep: 0.27,
    icon: '\u{1F330}', color: '#a8b072', workers: 4,
    out: { dates: 2.40 }, forageKind: 'dates', forageRadius: 10,

    desc: 'The slope cleared under the crowns, the poor trees taken out and the good ones beaten on a ' +
      'rota: 2.40 nuts a minute. Enough, at last, to feed the town AND the Resin Hearth.',
  },
  shellterraces: {
    name: 'The Shell Terraces', tier: 'food', era: 3, w: 2, h: 2, cost: 140, upkeep: 0.16,
    icon: '\u{1F40C}', color: '#9aa882', workers: 3, nearTrees: 3,
    out: { forage: 1.54 },

    desc: 'Low walls thrown across the slope to hold the damp and the leaf litter, and the beds worked ' +
      'in a rota: 1.54 a minute. It still owes nothing to anybody\'s territory.',
  },

  emberpits: {
    name: 'The Ember Pits', tier: 'food', era: 3, w: 2, h: 2, cost: 194, upkeep: 0.27,
    icon: '\u{1F356}', color: '#9a5a3f', workers: 4, industry: true, grainMill: true,
    procIn: 'game', procRate: 3.36, procOut: 'pemmican', procRatio: 0.6,

    desc: 'A row of stone-lined pits under a low roof, banked and kept at a slow smoke for days instead ' +
      'of hours: 3.36 game a minute into 2.02 smoked meat. FOUR BLINDS, OR FIVE.',
  },
  curriersyard: {
    name: "The Currier's Yard", tier: 'food', era: 3, w: 2, h: 2, cost: 233, upkeep: 0.32,
    icon: '\u{1FAA1}', color: '#a88a62', workers: 4, industry: true,
    procIn: 'game', procRate: 1.79, procOut: 'cloth', procRatio: 0.5435,

    desc: 'Fleshed, dressed, smoked and worked over the stake by people who do nothing else: 1.79 game a ' +
      'minute into 0.97 worked hide, and a better hide out of every carcass.',
  },
  grindingslabs: {
    name: 'The Grinding Slabs', tier: 'food', era: 3, w: 2, h: 2, cost: 194, upkeep: 0.27,
    icon: '\u{1F35A}', color: '#e0cd9a', workers: 4, needsWater: true, industry: true, grainMill: true,
    procIn: 'grain', procRate: 3.36, procOut: 'flour', procRatio: 0.6,

    desc: 'Saddle querns in rows, worked in shifts, and a roof over them: 3.36 einkorn a minute into ' +
      '2.02 groats. Seven thousand of these stones have come out of the ground here.',
  },
  troughrow: {
    name: 'The Trough Row', tier: 'food', era: 3, w: 2, h: 2, cost: 186, upkeep: 0.28,
    icon: '\u{1F37A}', color: '#d8bd72', workers: 4, needsWater: true, industry: true,
    procIn: 'grain', procRate: 2.24, procOut: 'beer', procRatio: 0.5435,

    desc: 'Six troughs cut in a line and worked as a battery, with a sequence and a schedule: 2.24 ' +
      'einkorn a minute into 1.22 brew. Enough, finally, to pay the haulers AND the Enclosure.',
  },
  punchfloor: {
    name: 'The Punch Floor', tier: 'food', era: 3, w: 2, h: 2, cost: 202, upkeep: 0.29,
    icon: '\u{1F52A}', color: '#8a8d95', workers: 4, industry: true,
    procIn: 'flint', procRate: 2.44, procOut: 'blades', procRatio: 0.5,

    desc: 'The blow taken on an antler punch instead of the core, so the blade comes off where it was ' +
      'meant to: 2.44 chert a minute into 1.22 bundles, and far less of the seam wasted.',
  },
  sculptorsbay: {
    name: "The Sculptors' Bay", tier: 'food', era: 3, w: 2, h: 2, cost: 171, upkeep: 0.24,
    icon: '\u{1F98A}', color: '#d0c9b2', workers: 4, industry: true,
    procIn: 'stone', procRate: 2.44, procOut: 'carvings', procRatio: 0.5,

    desc: 'A roofed bay with the block on trestles and four people around it: 2.44 limestone a minute ' +
      'into 1.22 carved. The animals get sharper and the pillars get faces.',
  },
  tarhearths: {
    name: 'The Tar Hearths', tier: 'food', era: 3, w: 2, h: 2, cost: 202, upkeep: 0.29,
    icon: '\u{1FAD9}', color: '#b59a4a', workers: 4, industry: true,
    procIn: 'dates', procRate: 2.24, procOut: 'oil', procRatio: 0.5435,

    desc: 'Sealed pots inverted into a fire pit so the pitch runs down and out clean instead of burning: ' +
      '2.24 nuts a minute into 1.22 pitch, and a far better grade of it.',
  },
  nettingsheds: {
    name: 'The Netting Sheds', tier: 'commerce', era: 3, w: 2, h: 2, cost: 194, upkeep: 0.21,
    icon: '\u{1F9F6}', color: '#c9a878', workers: 4, needsRoad: true,
    procIn: 'reeds', procRate: 2.44, procOut: 'baskets', procRatio: 0.5,
    sells: 'baskets', sellRate: 0.96, sellPrice: 7.81, custRadius: 6, custMin: 4,

    desc: 'Line, netting, creels, fish traps and roofing, made in a shed and sold out of the same door: ' +
      '2.44 withies a minute, moved twice as fast.',
  },

  butchersrock: {
    name: "The Butchers' Rock", tier: 'commerce', era: 3, w: 2, h: 2, cost: 290, upkeep: 0.32,
    icon: '\u{1F969}', color: '#d18f72', workers: 3, needsRoad: true, needsWater: true,
    sells: 'pemmican', sellRate: 0.96, sellPrice: 4.96, custRadius: 6, custMin: 4,

    desc: 'A dressed slab, a standing crew and the whole town coming to it: 0.96 smoked meat a minute, ' +
      'double the share it replaces.',
  },
  mealrows: {
    name: 'The Meal Rows', tier: 'commerce', era: 3, w: 2, h: 2, cost: 290, upkeep: 0.32,
    icon: '\u{1F963}', color: '#d2b478', workers: 3, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 0.96, sellPrice: 4.96, custRadius: 6, custMin: 4,

    desc: 'Groats measured out along a row of set stones instead of handed over one basket at a time: ' +
      '0.96 a minute out the door.',
  },
  skinroute: {
    name: 'The Skin Route', tier: 'commerce', era: 3, w: 2, h: 2, cost: 370, upkeep: 0.38,
    icon: '\u{1F9E5}', color: '#9a7558', workers: 3, needsRoad: true, needsWater: true,
    sells: 'cloth', sellRate: 0.70, sellPrice: 16.44, custRadius: 7, custMin: 7,

    desc: 'Not a bigger post: a stop on a route. Worked hide out of this ridge reaches the Euphrates and ' +
      'the sea, and 0.70 a minute goes with it at $16.44.',
  },
  longfeast: {
    name: 'The Long Feast', tier: 'commerce', era: 3, w: 2, h: 2, cost: 260, upkeep: 0.29,
    icon: '\u{1F37B}', color: '#d19a52', workers: 3, needsRoad: true,
    sells: 'beer', sellRate: 1.22, sellPrice: 5.96, custRadius: 6, custMin: 4,

    desc: 'Days of it, not an evening: 1.22 brew a minute. The reason anybody walked here to move a ' +
      'ten-tonne stone for people they were not related to.',
  },
  flintroute: {
    name: 'The Flint Route', tier: 'commerce', era: 3, w: 2, h: 2, cost: 280, upkeep: 0.32,
    icon: '\u{1F5E1}\u{FE0F}', color: '#9a9fac', workers: 3, needsRoad: true,
    sells: 'blades', sellRate: 0.88, sellPrice: 10.09, custRadius: 7, custMin: 5,

    desc: 'A stop on the blade road rather than a rock beside it: 0.88 bundles a minute at $10.09.',
  },
  effigyroute: {
    name: 'The Effigy Route', tier: 'commerce', era: 3, w: 2, h: 2, cost: 250, upkeep: 0.29,
    icon: '\u{1F40D}', color: '#c2baa8', workers: 3, needsRoad: true,
    sells: 'carvings', sellRate: 0.70, sellPrice: 11.40, custRadius: 6, custMin: 5,

    desc: 'Carved blocks going out to Karahan Tepe and the other ridges, 0.70 a minute — and every one ' +
      'of them is a block the Enclosure will not get.',
  },
  pitchroute: {
    name: 'The Pitch Route', tier: 'commerce', era: 3, w: 2, h: 2, cost: 280, upkeep: 0.32,
    icon: '\u{1FA94}', color: '#c2a76a', workers: 3, needsRoad: true,
    sells: 'oil', sellRate: 0.70, sellPrice: 11.40, custRadius: 6, custMin: 5,

    desc: 'Pitch by the sealed gourd, going wherever blades go — which is everywhere: 0.70 a minute.',
  },
  exchangeslabs: {
    name: 'The Exchange Slabs', tier: 'commerce', era: 3, w: 1, h: 2, cost: 160, upkeep: 0.15,
    icon: '\u{1F91D}', color: '#c9a878', workers: 2, needsRoad: true,
    sellsRaw: ['game', 'grain', 'stone', 'flint', 'reeds', 'dates'],
    sellRate: 2.62, custRadius: 6, custMin: 4,

    desc: 'A row of them instead of one: clears raw at 2.62 a minute. Still 80% of list, and still the ' +
      'thing you demolish once your chains are finished.',
  },

  rockbasin: {
    name: 'Rock-Cut Basin', tier: 'infra', era: 3, w: 1, h: 1, cost: 155, upkeep: 0.12,
    icon: '\u{1FAA3}', color: '#7fb4c9', waterRadius: 7,

    desc: 'A basin cut down into the bedrock and roofed with slabs, holding the winter rain. Waters ' +
      'seven tiles — the difference between a camp and a quarter, and the reason the Enclosure can be ' +
      'raised at all.',
  },
  plastervault: {
    name: 'The Plaster Vault', tier: 'infra', era: 3, w: 1, h: 1, cost: 93, upkeep: 0.04,
    icon: '\u{1F573}\u{FE0F}', color: '#cfc9b4', storeGrain: 29, storeFlour: 17,

    desc: 'The pit lined and floored in burnt-lime plaster, sealed against damp and vermin: +29 einkorn ' +
      'and +17 groats, still with no workers.',
  },
  rackedlofts: {
    name: 'The Racked Lofts', tier: 'infra', era: 3, w: 2, h: 2, cost: 230, upkeep: 0.21,
    icon: '\u{26FA}', color: '#b8a082', workers: 3, depot: true, storeCraft: 25,

    desc: 'Racked to the ridge pole and floored above the damp: +25 capacity for every craft good, and ' +
      'still a supply point.',
  },
  relaycairns: {
    name: 'The Relay Cairns', tier: 'infra', era: 3, w: 1, h: 1, cost: 230, upkeep: 0.27,
    icon: '\u{1F9ED}', color: '#a8a294', workers: 2, depot: true, storeCraft: 13,

    desc: 'A line of them, with a covered drop at each: +13 craft capacity out on the rim, and the rim ' +
      'measures its carting here instead of to the core.',
  },
  stoneford: {
    name: 'The Stone Ford', tier: 'infra', era: 3, w: 1, h: 1, cost: 140, upkeep: 0.06,
    icon: '\u{1F309}', color: '#a89e88', onWater: true, bridge: true, depot: true,

    desc: 'Slabs bedded into the shallows so a loaded person can cross dry. It carries the track AND ' +
      'counts as a supply point — the far bank stops being expensive.',
  },
  pillaredcourt: {
    name: 'The Pillared Court', tier: 'civic', era: 3, w: 1, h: 1, cost: 93, upkeep: 0.06,
    icon: '⭕', color: '#d8cfb8', capRadius: 28,

    desc: 'The circle given a kerb, a paved floor and two standing stones at the middle: homes within ' +
      '28 tiles hold more people.',
  },
  ancestorniche: {
    name: 'The Ancestor Niche', tier: 'civic', era: 3, w: 1, h: 1, cost: 105, upkeep: 0.09,
    icon: '\u{1F480}', color: '#e0d8c2', amenityRadius: 10,

    desc: 'The skulls set into a plastered wall with the faces modelled back on, and the dead kept where ' +
      'the living are: +1 housing capacity out to 10 tiles.',
  },
  charredspread: {
    name: 'The Charred Spread', tier: 'food', era: 3, w: 1, h: 1, cost: 105, upkeep: 0.09,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a8272', soilRadius: 6,

    desc: 'Bone burnt down to meal and ash, carted and spread rather than heaped: stands within 6 tiles ' +
      'recover 3x faster.',
  },
  reckoningstone: {
    name: 'The Reckoning Stone', tier: 'civic', era: 3, w: 1, h: 1, cost: 230, upkeep: 0.14,
    icon: '⚖\u{FE0F}', color: '#c9c0a8', keepsTally: true, weighRadius: 9,

    desc: 'A scored rib is one person\'s count. A set stone with a notch cut at the agreed measure is ' +
      'everybody\'s. Keeps the tally AND gives every shop within 9 tiles the weigh-house premium.',
  },

  road: {

    universal: true,
    name: 'Road', tier: 'infra', w: 1, h: 1, cost: 10, upkeep: 0,
    icon: '\u{1F6E4}️', color: '#8a7a5c',
    desc: 'Carries people and goods. Only SOME buildings need one — each says so on its own panel; fields, camps, wells and quarries never do. $10 a tile to lay, and nothing to keep — drag to paint.',
  },
  well: {
    name: 'Well', tier: 'infra', era: 4, w: 1, h: 1, cost: 60, upkeep: 0.10,
    icon: '⛲', color: '#7fb4c9', waterRadius: 5,
    desc: 'Supplies water in a radius. Buildings without water shut down.',
  },
  farm: {
    name: 'Farm', tier: 'food', era: 4, w: 2, h: 2, cost: 100, upkeep: 0.15,
    icon: '\u{1F33E}', color: '#a8c26a', workers: 2, needsWater: true,
    out: { grain: 1.0 },
    desc: 'Grows 1 grain/min. +50% on fertile soil, +25% adjacent to a Mill.',
  },
  mill: {

    grainMill: true,
    name: 'Mill', tier: 'food', era: 4, w: 2, h: 2, cost: 250, upkeep: 0.25,

    icon: '⚙️', color: '#b09a7e', workers: 3, needsWater: true, industry: true,

    procIn: 'grain', procRate: 3.0, procOut: 'flour', procRatio: 0.6,
    desc: 'Grinds 3 grain/min into 1.8 flour — and 3.75 grain when it touches a Farm, because the +25% raises BOTH sides. So one Mill wants two fertile Farms, or three on plain grass. Industry: bad neighbor for houses.',
  },
  house: {
    name: 'House', tier: 'housing', era: 4, w: 1, h: 1, cost: 120, upkeep: 0.05,
    icon: '\u{1F3E0}', color: '#d8a37a', cap: 4, needsWater: true,
    desc: 'Homes 2 residents when it goes up, rising to 14 as it earns its rungs. Residents work buildings and eat flour. +1 capacity near a Park or Temple, −1 next to industry.',
  },
  market: {
    name: 'Market', tier: 'commerce', era: 4, w: 2, h: 2, cost: 250, upkeep: 0.30,
    icon: '\u{1F3EA}', color: '#c97f7f', workers: 2, needsWater: true,
    sells: 'flour', sellRate: 0.6, sellPrice: 5.2, custRadius: 6, custMin: 5,
    desc: 'Sells 0.6 flour/min at $5.20 each. Needs ≥5 residents, at any distance — hauls over 20 tiles cost carting.',
  },

  park: {
    name: 'Square', tier: 'civic', era: 4, w: 1, h: 1, cost: 80, upkeep: 0.05, capRadius: 20,
    icon: '\u{1F3DB}', color: '#c9a86a',
    desc: 'A swept public square. +1 housing capacity for EVERY home within 20 tiles — the shared ground a neighbourhood forms around. One is enough; a second Square adds nothing to a home already covered.',
  },

  midden: {
    name: 'Midden', tier: 'food', era: 4, w: 1, h: 1, cost: 90, upkeep: 0.08,
    icon: '\u{1F4A9}', color: '#8a6a3f', soilRadius: 5,
    desc: 'A dung heap. Land within 5 tiles recovers from salt 3× faster. Pair it with fallow fields — cropping the same plot forever will exhaust it.',
  },
  templeGranary: {
    name: 'Temple Granary', tier: 'civic', era: 4, w: 4, h: 4, cost: 900, upkeep: 0.35,
    icon: '\u{1F33E}', color: '#c9a86a', workers: 6, needsWater: true, depot: true,
    storeGrain: 240, storeFlour: 150,
    desc: 'The temple household in full: massive grain and flour storage, a SUPPLY POINT for carting, ' +
      'head money collected from every resident within 20 tiles — and in a famine its staff hand-grind ' +
      'and issue the stored grain directly (the dole). Its panel also sets the city\'s flour reserve policy.',
  },

  claypit: {
    name: 'Clay Pit', tier: 'food', era: 4, w: 2, h: 2, cost: 110, upkeep: 0.15,
    icon: '\u{1FAA8}', color: '#9c7b52', workers: 2, nearWater: 3,
    out: { clay: 1.6 },
    desc: 'Digs 1.6 clay/min from the riverbank. Must be within 3 tiles of water — Mesopotamia had no stone and no timber, but endless clay.',
  },
  kiln: {
    name: "Potter's Kiln", tier: 'food', era: 4, w: 2, h: 2, cost: 260, upkeep: 0.28,
    icon: '\u{1F3FA}', color: '#b5623a', workers: 3, needsWater: true, industry: true,
    procIn: 'clay', procRate: 2.0, procOut: 'pottery', procRatio: 0.5,
    desc: 'Fires 2 clay/min into 1 pottery. Industry: a poor neighbour for houses.',
  },
  potterystall: {
    name: 'Pottery Stall', tier: 'commerce', era: 4, w: 2, h: 2, cost: 240, upkeep: 0.30,
    icon: '\u{1F3FA}', color: '#c9703f', workers: 2, needsWater: true,

    sells: 'pottery', sellRate: 0.5, sellPrice: 11.5, custRadius: 7, custMin: 6,
    desc: 'Sells 0.5 pottery/min at $11.50. Needs ≥6 residents, at any distance — hauls over 20 tiles cost carting.',
  },
  sheepfold: {
    name: "Shepherd's Fold", tier: 'food', era: 4, w: 2, h: 2, cost: 130, upkeep: 0.15,
    icon: '\u{1F411}', color: '#c9bda0', workers: 2, dryLand: true,
    out: { wool: 1.0 },
    desc: 'Grazes 1.0 wool/min. Wants DRY ground — grass or salt flat, never your irrigated fields. The one building that makes salinized land worth owning.',
  },
  weaver: {
    name: "Weaver's Shed", tier: 'food', era: 4, w: 2, h: 2, cost: 300, upkeep: 0.30,
    icon: '\u{1F9F5}', color: '#a89060', workers: 3, needsWater: true, industry: true,
    procIn: 'wool', procRate: 1.6, procOut: 'cloth', procRatio: 0.5,
    desc: 'Spins 1.6 wool/min into 0.8 cloth. Textiles were Sumer\'s great export.',
  },
  clothhall: {
    name: 'Cloth Hall', tier: 'commerce', era: 4, w: 2, h: 2, cost: 320, upkeep: 0.35,
    icon: '\u{1F9F6}', color: '#b98b6a', workers: 2, needsWater: true,

    sells: 'cloth', sellRate: 0.4, sellPrice: 18.75, custRadius: 7, custMin: 8,
    desc: 'Sells 0.4 cloth/min at $18.75 — the richest trade in the era, and the fussiest to site. Needs ≥8 residents, at any distance — hauls over 20 tiles cost carting.',
  },
  brewery: {
    name: 'Brewery', tier: 'food', era: 4, w: 2, h: 2, cost: 240, upkeep: 0.26,
    icon: '\u{1F37A}', color: '#c9a24a', workers: 3, needsWater: true, industry: true,
    procIn: 'grain', procRate: 2.0, procOut: 'beer', procRatio: 0.5,
    desc: 'Brews 2 grain/min into 1 beer. Sumerian labourers were paid in beer — it competes with your Mill for grain, so grow more.',
  },
  tavern: {
    name: 'Tavern', tier: 'commerce', era: 4, w: 2, h: 2, cost: 220, upkeep: 0.28,
    icon: '\u{1F37B}', color: '#c98a4a', workers: 2, needsWater: true,

    sells: 'beer', sellRate: 0.7, sellPrice: 6.8, custRadius: 6, custMin: 5,
    desc: 'Sells 0.7 beer/min at $6.80 — beer is a luxury, so it out-earns the Market, but the grain it drinks came out of your bread. Needs ≥5 residents, at any distance; hauls over 20 tiles cost carting.',
  },
  scribe: {
    name: "Scribe's House", tier: 'civic', era: 4, w: 1, h: 1, cost: 200, upkeep: 0.12,
    icon: '\u{1F4DC}', color: '#cbb98a', needsWater: true,

    keepsTally: true,
    desc: 'Writing was invented here, to count grain — and a market with its accounts kept sells more of it. ' +
      '+10% sales at every Market, Tavern, Stall and Hall within 20 tiles. One covers a village; ' +
      'a second adds nothing to a shop already counted.',
  },
  cistern: {
    name: 'Cistern', tier: 'infra', era: 4, w: 1, h: 1, cost: 200, upkeep: 0.16,
    icon: '\u{1F4A7}', color: '#7fb4c9', waterRadius: 8,
    desc: 'A lined and roofed reservoir. Waters a much wider radius than a Well.',
  },

  dredgecrew: {
    name: 'Dredging Crew', tier: 'infra', era: 4, w: 2, h: 2, cost: 180, upkeep: 0.22,
    icon: '\u{1F6F6}', color: '#8a9a6b', workers: 3, dredge: true,
    desc: 'Baskets and shoulder-poles: clears 0.0018 silt/min from the whole canal network, wherever it ' +
      'stands. Roughly ONE CREW PER TWO WELLS keeps the channels open. Needs no road and no water — it is ' +
      'the one building that still works when the canals have choked, which is how a silted city digs out.',
  },
  threshing: {
    name: 'Threshing Floor', tier: 'food', era: 4, w: 2, h: 2, cost: 120, upkeep: 0.08,
    icon: '\u{1F33E}', color: '#d8bf86', threshing: true,

    desc: 'A swept clay floor for beating grain from the ear. +25% to every Farm it touches — but it does ' +
      'NOT stack with a Mill, so use it on the farms your Mill cannot reach. Being 2×2 it can touch four at once.',
  },

  shrine: {
    name: 'Wayside Shrine', tier: 'civic', era: 4, w: 1, h: 1, cost: 90, upkeep: 0.08,
    icon: '\u{1F6D5}', color: '#c9a86a', amenityRadius: 8,
    desc: 'A niche, an offering bowl, a swept threshold. +1 housing capacity for homes within 8 tiles — ' +
      'the Square for a satellite hamlet that will never reach the plaza. One covers a lane; a second adds nothing to a home already blessed.',
  },
  jarcluster: {
    name: 'Storage Jar Cluster', tier: 'infra', era: 4, w: 1, h: 1, cost: 80, upkeep: 0.04,
    icon: '\u{1F3FA}', color: '#b08a5a', storeGrain: 25, storeFlour: 15,
    desc: 'Sealed pithoi sunk to the shoulder in the courtyard. +25 grain and +15 flour capacity, NO workers — ' +
      'the famine buffer that does not eat. The Temple Granary stores far more, but it costs six mouths to run.',
  },

  datepalm: {
    name: 'Date-Palm Orchard', tier: 'food', era: 4, w: 3, h: 3, cost: 250, upkeep: 0.20,
    icon: '\u{1F334}', color: '#8fae62', workers: 3,
    out: { dates: 1.5 }, saltProof: true,
    desc: 'Grows 1.5 dates/min, eaten like flour — and it IGNORES the salt clock entirely. Needs NO water ' +
      'coverage: the palm roots into the water table, so it is the one food that keeps feeding you when the ' +
      'canals silt up. On badly salted ground (soil under 30%) it yields +50%.',
  },
  saltpan: {
    name: 'Salt Pan Works', tier: 'food', era: 4, w: 2, h: 2, cost: 120, upkeep: 0.12,
    icon: '\u{1F9C2}', color: '#d8d4c4', workers: 2, onSalt: true,
    out: { salt: 1.0 },
    desc: 'Rakes 1.0 salt/min from the crust. Must sit ON salt flats — the quarter of the map nobody else ' +
      'wants becomes an extraction zone, and it fights your Shepherd\'s Folds for the same dead ground.',
  },
  fishweir: {
    name: 'Fish Weir', tier: 'food', era: 4, w: 1, h: 3, cost: 160, upkeep: 0.15,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 2, onWater: true,

    out: { fish: 1.2 },
    desc: 'A reed fence across the current: 1.2 fish/min, eaten at 75% of flour\'s worth. The first building ' +
      'that stands IN the water — food with no field, no mill and no salt clock, and it needs no canal, ' +
      'so it keeps feeding you through a silting. Bank frontage is now contested.',
  },
  breadoven: {
    name: 'Communal Bread Oven', tier: 'food', era: 4, w: 2, h: 2, cost: 240, upkeep: 0.22,
    icon: '\u{1F35E}', color: '#c98f5f', workers: 2, needsWater: true, ovenRadius: 8,
    desc: 'One hot oven beats twenty cold hearths: homes within 8 tiles eat 15% less flour. Pays for itself ' +
      'at ~22 covered residents — a purchasable dial on craft-city hunger.',
  },
  rawstall: {
    name: 'Raw Goods Stall', tier: 'commerce', era: 4, w: 1, h: 2, cost: 140, upkeep: 0.15,
    icon: '\u{1F9FA}', color: '#bd9a70', workers: 1, needsWater: true,
    sellsRaw: ['salt', 'grain', 'clay', 'wool', 'reeds'], sellRate: 1.5, custRadius: 6, custMin: 4,
    desc: 'Sells whatever raw good you have most of — salt, grain, clay, wool or reeds — at 80% of list, ' +
      '1.5 units/min. Strictly worse than finishing a chain, strictly better than the half-price export dump. ' +
      'First income the minute the first pit runs; knowing when to demolish it is the real decision.',
  },
  weighhouse: {
    name: 'Silver Weigh-House', tier: 'civic', era: 4, w: 2, h: 3, cost: 500, upkeep: 0.45,
    icon: '⚖️', color: '#c9b46a', workers: 4, needsWater: true, weighRadius: 10,
    desc: 'Sealed weights and an honest balance: shops within 10 tiles sell at +12% price. Stacks with the ' +
      'Scribe\'s +10% throughput (radius 20) — throughput wide, price tight: a true market district is both.',
  },
  runnerpost: {
    name: 'Sikkum Runner Post', tier: 'infra', era: 4, w: 1, h: 1, cost: 200, upkeep: 0.25,
    icon: '\u{1F3C3}', color: '#a58c62', workers: 1, depot: true,
    desc: 'A relay of the royal road-runners. Counts as a SUPPLY POINT: buildings measure their carting ' +
      'distance to the nearest market, granary or post — one runner erases a frontier district\'s ×3 premium.',
  },
  oxbyre: {
    name: 'Ox Byre & Plow Team', tier: 'food', era: 4, w: 2, h: 4, cost: 400, upkeep: 0.30,

    icon: '\u{1F402}', color: '#9c7f5c', workers: 2, needsWater: true, oxTeam: true,
    desc: 'A span of oxen eats 0.4 grain/min as fodder and plows EVERY plowed field within 14 tiles — ' +
      'farms, estates and sesame alike — to +20% yield. There is no limit on how many it serves: the ' +
      'fodder costs the same for two fields or twenty, so it breaks even at two and is pure profit after. ' +
      'Site the byre first and lay your fields around it.',
  },
  tablethouse: {
    name: 'Tablet House (Edubba)', tier: 'civic', era: 4, w: 2, h: 2, cost: 350, upkeep: 0.30,
    icon: '\u{1F4D0}', color: '#cbb98a', workers: 3, needsWater: true,
    desc: 'The school where scribes are beaten into shape. While staffed and road-connected, every RANK ' +
      'upgrade in the city costs 15% less — the identity purchase for a rank-heavy strategy.',
  },
  shaduf: {
    name: 'Shaduf', tier: 'infra', era: 4, w: 1, h: 1, cost: 120, upkeep: 0.10,
    icon: '\u{1F3D7}️', color: '#7fb4c9', workers: 1, needsWater: true, soilRadius: 4,
    desc: 'The counterweighted well-sweep. Ground within 4 tiles recovers from salt 3× faster — the Midden\'s ' +
      'partner for fields no channel reaches. It must itself stand inside well coverage.',
  },
  storehouse: {
    name: 'Craft Storehouse', tier: 'infra', era: 4, w: 2, h: 2, cost: 200, upkeep: 0.20,
    icon: '\u{1F4E6}', color: '#a88f68', workers: 2, needsWater: true, depot: true, storeCraft: 20,
    desc: 'Racked shelves and sealed jars: +20 capacity for EVERY craft good (clay, pottery, wool, cloth, ' +
      'beer and the rest) while staffed. Bank goods through a shop\'s bad spell instead of dumping them abroad ' +
      'at half price — and it acts as a supply point for carting.',
  },
  reedcutter: {
    name: "Reed Cutter's Camp", tier: 'food', era: 4, w: 2, h: 2, cost: 100, upkeep: 0.10,
    icon: '\u{1FAB4}', color: '#7da45f', workers: 2, nearWater: 2,
    out: { reeds: 1.2 },
    desc: 'Cuts 1.2 reeds/min from the marsh edge. The cheapest commodity in the era — nearly worthless ' +
      'raw, everything woven. Build its Basket Weaver or you have bought yourself a pile of grass.',
  },
  basketweaver: {
    name: 'Basket Weaver', tier: 'commerce', era: 4, w: 2, h: 2, cost: 190, upkeep: 0.20,
    icon: '\u{1F9FA}', color: '#c2a067', workers: 3, needsWater: true,
    procIn: 'reeds', procRate: 2.0, procOut: 'baskets', procRatio: 0.5,
    sells: 'baskets', sellRate: 0.55, sellPrice: 8.9, custRadius: 6, custMin: 5,
    desc: 'Weaves 2 reeds/min into baskets and sells them on the spot at $8.90 — a deliberately SHORT chain: ' +
      'two buildings and five mouths where pottery needs three and seven. Chain length is now a strategy.',
  },
  sesamefield: {
    name: 'Sesame Field', tier: 'food', era: 4, w: 2, h: 2, cost: 110, upkeep: 0.12,
    icon: '\u{1F33B}', color: '#b5b062', workers: 2, needsWater: true, slowSalt: true,
    out: { sesame: 0.6 },
    desc: 'Grows 0.6 sesame/min and salts the ground at HALF the barley rate — the deep-rooted shift crop. ' +
      'Every fertile tile now asks: bread, beer, or oil?',
  },
  oilpress: {
    name: 'Oil Press', tier: 'commerce', era: 4, w: 2, h: 2, cost: 280, upkeep: 0.28,
    icon: '\u{1FAD2}', color: '#a89143', workers: 3, needsWater: true, industry: true,
    procIn: 'sesame', procRate: 2.0, procOut: 'oil', procRatio: 0.5,
    sells: 'oil', sellRate: 0.4, sellPrice: 13, custRadius: 6, custMin: 6,
    desc: 'Crushes 2 sesame/min into oil and sells it at $13 — lamp fuel, skin balm, cooking fat. ' +
      'Slots between pottery and cloth on the price ladder, for the cost of a two-building chain.',
  },
  dyeworks: {
    name: 'Dye Works', tier: 'commerce', era: 4, w: 2, h: 2, cost: 360, upkeep: 0.32,
    icon: '\u{1F7E5}', color: '#a4485a', workers: 3, needsWater: true, industry: true,
    procIn: 'cloth', procRate: 0.6, procOut: 'dyedcloth', procRatio: 0.6667,
    sells: 'dyedcloth', sellRate: 0.3, sellPrice: 26, custRadius: 7, custMin: 8,
    desc: 'Madder vats turn 0.6 cloth/min into dyed bolts sold at $26 — the NEW top of the ladder. It eats ' +
      'the Cloth Hall\'s input, so the wool chain now has one more decision than it has sheds.',
  },
  woolbureau: {
    name: 'Wool Bureau', tier: 'civic', era: 4, w: 2, h: 2, cost: 200, upkeep: 0.20,

    icon: '\u{1F9F6}', color: '#b9a883', workers: 2, needsWater: true, woolBureau: true,
    desc: 'The state grading office (radius 20): Weavers in range run 10% SLOWER but every cloth and dyed-cloth ' +
      'shop in range sells at +15% — graded bolts trade better. Worth it only when the SHOP, not the shed, ' +
      'is your bottleneck. Read your own tally first.',
  },
  brickyard: {
    name: 'Brickyard', tier: 'food', era: 4, w: 2, h: 2, cost: 220, upkeep: 0.22,
    icon: '\u{1F9F1}', color: '#a5643c', workers: 3, needsWater: true, industry: true,
    procIn: 'clay', procRate: 2.0, procOut: 'mudbrick', procRatio: 0.5,
    desc: 'Molds 2 clay/min into sun-dried brick. Brick has ONE customer: the Ziggurat accepts each brick as ' +
      'FOUR clay of its delivery bill — the deliberate war-economy pivot from pottery profit to monument progress.',
  },
  jetty: {
    name: 'Reed-Boat Jetty', tier: 'infra', era: 4, w: 1, h: 1, cost: 120, upkeep: 0.05,
    icon: '\u{1F6F6}', color: '#8a7a5c', onWater: true, bridge: true,
    desc: 'Bitumen-coated reed boats on a fixed crossing. Placed ON water, it carries the road network across ' +
      'the channel — lay a line of them bank to bank and the far shore joins your city without terraforming.',
  },
  stele: {
    name: 'District Stele', tier: 'beauty', era: 4, w: 1, h: 1, cost: 25, upkeep: 0,
    icon: '\u{1FAA7}', color: '#b8a888', cosmetic: true, nameable: true,
    desc: 'A carved standing stone that NAMES a quarter — "The Potters\' Ward", "The Fold". No output, no ' +
      'upkeep: the label is the point. Click it to name the district.',
  },
  bannerpole: {
    name: 'Reed Banner Pole', tier: 'beauty', era: 4, w: 1, h: 1, cost: 20, upkeep: 0,
    icon: '\u{1F3F3}️', color: '#c96a5a', cosmetic: true,
    desc: 'A woven standard on a tall reed mast. Pure beauty — zero output, zero upkeep, zero excuses needed.',
  },
  gardenplot: {
    name: 'Date-Palm Garden', tier: 'beauty', era: 4, w: 1, h: 1, cost: 40, upkeep: 0,
    icon: '\u{1F33F}', color: '#7fae62', cosmetic: true,
    desc: 'A watered ornamental garden — one palm, flowers, a bench of brick. The city is allowed to be lovely.',
  },

  claybeds: {
    name: 'Levee Clay Beds', tier: 'food', era: 4, w: 2, h: 2, cost: 270, upkeep: 0.26,
    icon: '\u{1FAB5}', color: '#9c7b52', workers: 3, nearWater: 3,
    out: { clay: 3.2 },
    desc: 'The bank cut back and worked in courses: 3.2 clay/min, double the pit it replaces.',
  },
  woolflock: {
    name: 'Great Flock', tier: 'food', era: 4, w: 2, h: 2, cost: 310, upkeep: 0.26,
    icon: '\u{1F411}', color: '#c9bb9a', workers: 3, dryLand: true,
    out: { wool: 2.0 },
    desc: 'Twice the fold and a hired shepherd: 2 wool/min off the dry flats nobody else wants.',
  },
  saltworks: {
    name: 'Salt Boiling Works', tier: 'food', era: 4, w: 2, h: 2, cost: 290, upkeep: 0.22,
    icon: '\u{1F9C2}', color: '#e2ded0', workers: 3, onSalt: true,
    out: { salt: 2.0 },
    desc: 'Brine boiled down in lead pans rather than left to the sun: 2 salt/min, whatever the weather.',
  },
  reedbeds: {
    name: 'Managed Reed Beds', tier: 'food', era: 4, w: 2, h: 2, cost: 250, upkeep: 0.18,
    icon: '\u{1F33E}', color: '#8fae72', workers: 3, nearWater: 2,
    out: { reeds: 2.4 },
    desc: 'Cut on a rotation instead of stripped: 2.4 reeds/min, and the bed comes back every year.',
  },
  sesameterrace: {
    name: 'Sesame Terraces', tier: 'food', era: 4, w: 2, h: 2, cost: 270, upkeep: 0.20,
    icon: '\u{1F33F}', color: '#c9b672', workers: 3, needsWater: true,
    out: { sesame: 1.2 },
    desc: 'Banked and levelled beds: 1.2 sesame/min, and it still salts the ground at only half rate.',
  },

  palmterrace: {
    name: 'Terraced Orchard', tier: 'food', era: 4, w: 3, h: 3, cost: 560, upkeep: 0.32,
    icon: '\u{1F334}', color: '#8fae62', workers: 4,
    out: { dates: 2.4 }, saltProof: true,
    desc: 'Palms above, vegetables in their shade — the three-storey orchard Mesopotamia actually ran: ' +
      '2.4 dates/min. Still needs NO water coverage, so it is still what feeds you through a silting.',
  },
  fishtraps: {
    name: 'Standing Fish Traps', tier: 'food', era: 4, w: 1, h: 3, cost: 380, upkeep: 0.24,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 3, onWater: true,
    out: { fish: 1.9 },
    desc: 'A permanent weir with sluices and holding pens: 1.9 fish/min, and it fishes through a silting.',
  },

  templemill: {
    name: 'Temple Mill', tier: 'food', era: 4, w: 2, h: 2, cost: 420, upkeep: 0.34,
    icon: '\u{1F35E}', color: '#d8b878', workers: 4, needsWater: true, grainMill: true,
    procIn: 'grain', procOut: 'flour', procRate: 4.2, procRatio: 0.6,
    desc: 'The É\'s own mill, worked in shifts: 4.2 flour/min. Still boosts an adjacent field +25% both ways.',
  },
  updraftkiln: {
    name: 'Updraft Kiln', tier: 'craft', era: 4, w: 2, h: 2, cost: 430, upkeep: 0.38,
    icon: '\u{1F3FA}', color: '#b5713f', workers: 4, needsWater: true,
    procIn: 'clay', procOut: 'pottery', procRate: 2.8, procRatio: 0.5,
    desc: 'A chimney draws the fire through the load instead of over it: 2.8 pottery/min, and fewer losses.',
  },
  loomhouse: {
    name: 'Loom House', tier: 'craft', era: 4, w: 2, h: 2, cost: 490, upkeep: 0.40,
    icon: '\u{1F9F6}', color: '#c2a878', workers: 4, needsWater: true,
    procIn: 'wool', procOut: 'cloth', procRate: 2.24, procRatio: 0.5,
    desc: 'Warp-weighted looms under one roof, worked by a guild of women: 2.24 cloth/min.',
  },
  ninkasibrewhouse: {
    name: 'Ninkasi Brewhouse', tier: 'craft', era: 4, w: 2, h: 2, cost: 400, upkeep: 0.36,
    icon: '\u{1F37A}', color: '#c9a05f', workers: 4, needsWater: true,
    procIn: 'grain', procOut: 'beer', procRate: 2.8, procRatio: 0.5,
    desc: 'Brewed to the hymn, in proper vats: 2.8 beer/min. It still drinks the grain your mill wanted.',
  },
  firedbrickyard: {
    name: 'Fired-Brick Yard', tier: 'craft', era: 4, w: 2, h: 2, cost: 370, upkeep: 0.30,
    icon: '\u{1F9F1}', color: '#a86b4a', workers: 4, needsWater: true,
    procIn: 'clay', procOut: 'mudbrick', procRate: 2.8, procRatio: 0.5,
    desc: 'Kiln-fired rather than sun-dried: 2.8 brick/min, and they survive a wet winter.',
  },
  matworks: {
    name: 'Mat & Basket Works', tier: 'craft', era: 4, w: 2, h: 2, cost: 380, upkeep: 0.28,
    icon: '\u{1F9FA}', color: '#c2a86b', workers: 4, needsWater: true, needsRoad: true,
    procIn: 'reeds', procOut: 'baskets', procRate: 2.8, procRatio: 0.5,
    sells: 'baskets', sellRate: 1.1, sellPrice: 8.9, custRadius: 6, custMin: 4,
    desc: 'Mats, crates, river-boats and roofing: 2.8 baskets/min and it sells them twice as fast.',
  },
  beampress: {
    name: 'Beam Press', tier: 'craft', era: 4, w: 2, h: 2, cost: 520, upkeep: 0.38,
    icon: '\u{1FAD2}', color: '#b59a5f', workers: 4, needsWater: true, needsRoad: true,
    procIn: 'sesame', procOut: 'oil', procRate: 2.8, procRatio: 0.5,
    sells: 'oil', sellRate: 0.8, sellPrice: 13, custRadius: 6, custMin: 5,
    desc: 'A weighted beam instead of a hand-stone: 2.8 oil/min, sold at twice the rate.',
  },
  purplehouse: {
    name: 'Purple Dye House', tier: 'craft', era: 4, w: 2, h: 2, cost: 660, upkeep: 0.44,
    icon: '\u{1F7E3}', color: '#7a4a86', workers: 4, needsWater: true, needsRoad: true,
    procIn: 'cloth', procOut: 'dyedcloth', procRate: 0.84, procRatio: 0.6667,
    sells: 'dyedcloth', sellRate: 0.6, sellPrice: 26, custRadius: 7, custMin: 6,
    desc: 'The murex vats — the most valuable thing the age makes: 0.84 dyed cloth/min, sold twice as fast.',
  },

  potteryhall: {
    name: 'Pottery Hall', tier: 'shop', era: 4, w: 2, h: 2, cost: 480, upkeep: 0.42,
    icon: '\u{1F3FA}', color: '#c98f5f', workers: 3, needsWater: true,
    sells: 'pottery', sellRate: 1.0, sellPrice: 11.5, custRadius: 7, custMin: 5,
    desc: 'A roofed hall with a standing stock: moves 1 pottery/min, double the stall.',
  },
  clothexchange: {
    name: 'Cloth Exchange', tier: 'shop', era: 4, w: 2, h: 2, cost: 640, upkeep: 0.50,
    icon: '\u{1F9F5}', color: '#b58fc9', workers: 3, needsWater: true,
    sells: 'cloth', sellRate: 0.8, sellPrice: 18.75, custRadius: 7, custMin: 6,
    desc: 'Cloth sold by weight against sealed tablets: 0.8 cloth/min, twice the hall it replaces.',
  },
  greatalehouse: {
    name: 'Great Alehouse', tier: 'shop', era: 4, w: 2, h: 2, cost: 440, upkeep: 0.40,
    icon: '\u{1F37B}', color: '#c9a05f', workers: 3, needsWater: true,
    sells: 'beer', sellRate: 1.4, sellPrice: 6.8, custRadius: 7, custMin: 5,
    desc: 'Benches, a doorkeeper and a tally on the wall: 1.4 beer/min out the door.',
  },
  rawmarket: {
    name: 'Raw Goods Row', tier: 'shop', era: 4, w: 1, h: 2, cost: 300, upkeep: 0.26,
    icon: '\u{1F6D2}', color: '#c2a878', workers: 2, needsWater: true, needsRoad: true,
    sellsRaw: ['salt', 'grain', 'clay', 'wool', 'reeds'], sellRate: 3.0, custRadius: 6, custMin: 4,
    desc: 'A whole row of stalls rather than one: clears raw goods at 3.0/min.',
  },

  gardencourt: {
    name: 'Garden Court', tier: 'beauty', era: 4, w: 1, h: 1, cost: 170, upkeep: 0.09,
    icon: '\u{1F333}', color: '#6faf62', capRadius: 29,
    desc: 'Water, shade and a bench: homes within 29 tiles hold more people.',
  },
  compostyard: {
    name: 'Compost Yard', tier: 'infra', era: 4, w: 1, h: 1, cost: 190, upkeep: 0.14,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a7a5c', soilRadius: 7,
    desc: 'Night soil and river mud turned and carted: fields within 7 tiles recover ×3.',
  },
  terracedshrine: {
    name: 'Terraced Shrine', tier: 'beauty', era: 4, w: 1, h: 1, cost: 190, upkeep: 0.14,
    icon: '\u{1F54C}', color: '#c9b48f', amenityRadius: 12,
    desc: 'A stepped platform and a standing god: contentment out to 12 tiles.',
  },
  districtbakehouse: {
    name: 'District Bakehouse', tier: 'food', era: 4, w: 2, h: 2, cost: 480, upkeep: 0.34,
    icon: '\u{1F956}', color: '#c98f5f', workers: 3, needsWater: true, needsRoad: true, ovenRadius: 12,
    desc: 'Loaves for a whole quarter: homes within 12 tiles eat 15% less flour.',
  },
  silvermint: {
    name: 'Silver Mint', tier: 'civic', era: 4, w: 2, h: 3, cost: 1050, upkeep: 0.62,
    icon: '\u{1FA99}', color: '#b8b8c2', workers: 5, needsWater: true, needsRoad: true, weighRadius: 14,
    desc: 'Sealed and stamped silver by the shekel: trade bonus out to 14 tiles.',
  },
  chainshaduf: {
    name: 'Chain Shaduf', tier: 'infra', era: 4, w: 1, h: 1, cost: 250, upkeep: 0.16,
    icon: '\u{1F573}\u{FE0F}', color: '#7fb4c9', workers: 2, needsWater: true, soilRadius: 6,
    desc: 'Two lifts in series reach further up the bank: fields within 6 tiles recover ×3.',
  },
  sealedjarstore: {
    name: 'Sealed Jar Store', tier: 'infra', era: 4, w: 1, h: 1, cost: 180, upkeep: 0.08,
    icon: '\u{1F3FA}', color: '#c2a06b', storeGrain: 500, storeFlour: 300,
    desc: 'Pitch-sealed and stamped: holds 500 grain and 300 flour, twice the loose cluster.',
  },
  greatstorehouse: {
    name: 'Great Storehouse of the É', tier: 'civic', era: 4, w: 4, h: 4, cost: 1500, upkeep: 0.52,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c9a878', workers: 7, needsWater: true, needsRoad: true,
    depot: true, storeGrain: 4200, storeFlour: 2600,
    desc: 'The god\'s own granary, doubled and re-roofed: 4,200 grain and 2,600 flour under seal.',
  },
  craftwarehouse: {
    name: 'Craft Warehouse', tier: 'civic', era: 4, w: 2, h: 2, cost: 420, upkeep: 0.30,
    icon: '\u{1F4E6}', color: '#b59a72', workers: 3, needsWater: true, needsRoad: true,
    depot: true, storeCraft: 400,
    desc: 'Racked and ledgered: 400 craft goods held against the caravan season, double the storehouse.',
  },

  canalcorps: {
    name: 'Canal Corps', tier: 'infra', era: 4, w: 2, h: 2, cost: 330, upkeep: 0.34,
    icon: '\u{1F6F6}', color: '#8a9a6b', workers: 4, dredge: true, dredgePower: 1.5,
    desc: 'A standing gang with sledges, baskets and a foreman who keeps a tally: clears 0.0036 silt/min, ' +
      'double a Dredging Crew — about one Corps per FOUR wells. Still needs no road and no water.',
  },

  papyrusbeds: {
    name: 'Managed Papyrus Beds', tier: 'food', era: 5, w: 2, h: 2, cost: 500, upkeep: 0.40,
    icon: '\u{1F33E}', color: '#8fae72', workers: 3, nearWater: 2,
    out: { reeds: 4.4 },
    desc: 'Cut on rotation and re-flooded: 4.4 reeds/min, and the marsh regrows behind the knife.',
  },
  niledredge: {
    name: 'Nile Dredge Works', tier: 'food', era: 5, w: 2, h: 2, cost: 490, upkeep: 0.40,
    icon: '\u{1FAB5}', color: '#9c7b52', workers: 3,
    out: { clay: 5.2 },
    desc: 'Silt lifted straight off the riverbed by basket-chain: 5.2 clay/min.',
  },
  granitequarry: {
    name: 'Granite Quarry', tier: 'food', era: 5, w: 2, h: 2, cost: 640, upkeep: 0.54,
    icon: '\u{26CF}\u{FE0F}', color: '#c2a99a', workers: 4, dryLand: true,
    out: { stone: 3.6 },
    desc: 'Aswan granite, split with wedges and floated downriver: 3.6 stone/min.',
  },
  palmterracegrove: {
    name: 'Walled Palm Garden', tier: 'food', era: 5, w: 2, h: 2, cost: 520, upkeep: 0.32,
    icon: '\u{1F334}', color: '#b8a24e', workers: 3, saltProof: true,
    out: { dates: 3.2 },
    desc: 'Walled, watered by shaduf and underplanted: 3.2 dates/min, and it still owes the flood nothing.',
  },
  deltafishery: {
    name: 'Delta Fishery', tier: 'food', era: 5, w: 2, h: 2, cost: 540, upkeep: 0.36,
    icon: '\u{1F41F}', color: '#5f9ea0', workers: 3, nearWater: 2,
    out: { fish: 3.8 },
    desc: 'Seine nets and drying racks across the delta mouths: 3.8 fish/min, and it rises WITH the flood.',
  },

  granarymill: {
    name: 'Granary Mill', tier: 'food', era: 5, w: 2, h: 2, cost: 700, upkeep: 0.58,
    icon: '\u{1F35E}', color: '#d8b878', workers: 4, needsWater: true, grainMill: true,
    procIn: 'grain', procOut: 'flour', procRate: 5.88, procRatio: 0.6,
    desc: 'Saddle querns worked in rows by the granary gang: 5.88 flour/min.',
  },
  houseoflife: {
    name: 'House of Life', tier: 'craft', era: 5, w: 2, h: 2, cost: 780, upkeep: 0.64,
    icon: '\u{1F4DC}', color: '#d8c9a0', workers: 4, needsWater: true,
    procIn: 'reeds', procOut: 'baskets', procRate: 3.92, procRatio: 0.5,
    desc: 'The temple workshop where papyrus is beaten, dried and bound: 3.92 rolls/min.',
  },
  nomebrickworks: {
    name: 'Nome Brickworks', tier: 'craft', era: 5, w: 2, h: 2, cost: 640, upkeep: 0.52,
    icon: '\u{1F9F1}', color: '#a86b4a', workers: 4,
    procIn: 'clay', procOut: 'mudbrick', procRate: 4.48, procRatio: 0.5,
    desc: 'Gangs, moulds and a stamped cartouche on every course: 4.48 brick/min.',
  },
  dressingfloor: {
    name: 'Dressing Floor', tier: 'craft', era: 5, w: 2, h: 2, cost: 820, upkeep: 0.70,
    icon: '\u{1F3D7}\u{FE0F}', color: '#cdbb92', workers: 5,
    procIn: 'stone', procOut: 'blocks', procRate: 3.36, procRatio: 0.5,
    desc: 'Copper saws, sand abrasive and a levelled dressing floor: 3.36 blocks/min.',
  },

  greatscrollmarket: {
    name: 'Scroll Exchange', tier: 'shop', era: 5, w: 2, h: 2, cost: 1120, upkeep: 0.72,
    icon: '\u{1F4DC}', color: '#d8c9a0', workers: 3, needsWater: true, needsRoad: true,
    sells: 'baskets', sellRate: 1.0, sellPrice: 12, custRadius: 7, custMin: 5,
    desc: 'Papyrus sold by the roll to every temple on the river: 1.0 roll/min.',
  },
  greatbrickwharf: {
    name: 'Brick Harbour', tier: 'shop', era: 5, w: 2, h: 2, cost: 960, upkeep: 0.66,
    icon: '\u{1F6A2}', color: '#a86b4a', workers: 3, needsWater: true, needsRoad: true,
    sells: 'mudbrick', sellRate: 2.0, sellPrice: 4.1, custRadius: 7, custMin: 4,
    desc: 'Barges loading day and night: 2 brick/min out to the building sites.',
  },
  greatblockwharf: {
    name: 'Block Harbour', tier: 'shop', era: 5, w: 2, h: 2, cost: 1040, upkeep: 0.70,
    icon: '\u{1F6A2}', color: '#cdbb92', workers: 3, needsWater: true, needsRoad: true,
    sells: 'blocks', sellRate: 1.2, sellPrice: 12, custRadius: 7, custMin: 6,
    desc: 'Sledges, ramps and a flooded canal to the quay: 1.2 dressed blocks/min.',
  },
  greatbazaar: {
    name: 'Grand Bazaar', tier: 'shop', era: 5, w: 2, h: 2, cost: 1000, upkeep: 0.68,
    icon: '\u{1F3EA}', color: '#d8b878', workers: 4, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 2.4, sellPrice: 7, custRadius: 7, custMin: 5,
    desc: 'A covered market street rather than a square: 2.4 flour/min sold.',
  },

  floodreservoir: {
    name: 'Flood Reservoir', tier: 'infra', era: 5, w: 2, h: 2, cost: 750, upkeep: 0.32,
    icon: '\u{1F4A7}', color: '#6fb3cf', waterRadius: 16,
    desc: 'Banked and sluiced to hold the flood longer: waters 16 tiles instead of 11.',
  },
  royalgranary: {
    name: 'Royal Granary', tier: 'civic', era: 5, w: 2, h: 2, cost: 1400, upkeep: 0.44,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c9a878', needsWater: true, needsRoad: true,
    depot: true, storeGrain: 5200, storeFlour: 3400,
    desc: 'The nomarch\'s own vaults, doubled: 5,200 grain and 3,400 flour under seal.',
  },
  greatgranaryeg: {
    name: 'Double Granary', tier: 'civic', era: 5, w: 2, h: 2, cost: 800, upkeep: 0.30,
    icon: '\u{1F33E}', color: '#c9a878', needsWater: true, needsRoad: true,
    storeGrain: 1600, storeFlour: 1000,
    desc: 'A second vaulted range alongside the first: 1,600 grain and 1,000 flour.',
  },
  greatobelisk: {
    name: 'Paired Obelisks', tier: 'civic', era: 5, w: 1, h: 1, cost: 440, upkeep: 0.10,
    icon: '\u{1F5FC}', color: '#d6c48d', amenityRadius: 10,
    desc: 'Two needles flanking the pylon, tipped in electrum: contentment out to 10 tiles.',
  },
  threshingcourt: {
    name: 'Threshing Court', tier: 'food', era: 5, w: 2, h: 2, cost: 380, upkeep: 0.16,
    icon: '\u{1F33E}', color: '#d8bf86', threshing: true,
    desc: 'A swept and walled floor with oxen on the sledge: +25% to every field it touches.',
  },
  marlbeds: {
    name: 'Marl Beds', tier: 'infra', era: 5, w: 1, h: 1, cost: 300, upkeep: 0.14,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a7a5c', soilRadius: 10,
    desc: 'Flood silt carted and spread by gang: fields within 10 tiles recover ×3.',
  },
  templearchive: {
    name: 'Temple Archive', tier: 'civic', era: 5, w: 1, h: 1, cost: 640, upkeep: 0.22,
    icon: '\u{1F4D6}', color: '#d8c9a0', needsWater: true, keepsTally: true,
    desc: 'The full archive: every rate, every ledger, every year of the river\'s height.',
  },
  stonecauseway: {
    name: 'Stone Causeway', tier: 'infra', era: 5, w: 1, h: 1, cost: 300, upkeep: 0.09,
    icon: '\u{1F309}', color: '#b5a486', onWater: true, bridge: true,
    desc: 'A built causeway rather than a ferry landing: the road crosses without waiting.',
  },
  greattemple: {
    name: 'Great Temple', tier: 'civic', era: 5, w: 2, h: 2, cost: 1200, upkeep: 0.42,
    icon: '\u{1F3EF}', color: '#d9c48a', needsWater: true, needsRoad: true, capRadius: 12,
    desc: 'Pylon, court and hypostyle hall: +1 housing capacity for every home within 12 tiles.',
  },

  emmerfield: {
    name: 'Emmer Field', tier: 'food', era: 5, w: 2, h: 2, cost: 220, upkeep: 0.24,
    icon: '\u{1F33E}', color: '#a8c258', workers: 2, needsWater: true,
    out: { grain: 1.9 },
    desc: 'Emmer wheat on the black land: 1.9 grain/min. The flood feeds it — but only within reach of the water.',
  },
  papyrusmarsh: {
    name: 'Papyrus Marsh', tier: 'food', era: 5, w: 2, h: 2, cost: 240, upkeep: 0.24,
    icon: '\u{1F33F}', color: '#6fa86b', workers: 2, nearWater: 2,
    out: { reeds: 2.2 },
    desc: 'Cut papyrus at the water\'s edge: 2.2 reeds/min. Must sit within 2 tiles of water.',
  },
  nileclay: {
    name: 'Nile Clay Beds', tier: 'food', era: 5, w: 2, h: 2, cost: 230, upkeep: 0.24,
    icon: '\u{1FAB5}', color: '#9c7b52', workers: 2,
    out: { clay: 2.6 },
    desc: 'Silt dug from the riverbank: 2.6 clay/min. Every wall in Egypt starts here.',
  },
  desertquarry: {
    name: 'Desert Quarry', tier: 'food', era: 5, w: 2, h: 2, cost: 300, upkeep: 0.34,
    icon: '\u{26CF}\u{FE0F}', color: '#cdbb92', workers: 3, dryLand: true,
    out: { stone: 1.8 },
    desc: 'Cut limestone out of the deshret: 1.8 stone/min. Needs dry ground — which is 90% of this world.',
  },

  palmgrove: {
    name: 'Palm Grove', tier: 'food', era: 5, w: 2, h: 2, cost: 240, upkeep: 0.20,
    icon: '\u{1F334}', color: '#b8a24e', workers: 2, saltProof: true,
    out: { dates: 1.6 },
    desc: 'Date palms on ground nothing else wants: 1.6 dates/min, and +50% on ruined soil. ' +
      'Owes the flood nothing — this is what the city eats during Akhet.',
  },
  nilefishery: {
    name: 'Nile Fishery', tier: 'food', era: 5, w: 2, h: 2, cost: 250, upkeep: 0.22,
    icon: '\u{1F41F}', color: '#5f9ea0', workers: 2, nearWater: 2,
    out: { fish: 1.9 },
    desc: 'Nets and weirs on the river: 1.9 fish/min. Rises WITH the flood instead of drowning in it.',
  },

  quernhouse: {
    name: 'Quern House', tier: 'food', era: 5, w: 2, h: 2, cost: 420, upkeep: 0.42,
    icon: '\u{1F35E}', color: '#d8b878', workers: 3, needsWater: true,

    grainMill: true,
    procIn: 'grain', procOut: 'flour', procRate: 4.2, procRatio: 0.6, procRatio: 0.6,
    desc: 'Grinds 4.2 grain/min into flour. Egypt paid its wages in bread — this is the payroll.',
  },
  scriptorium: {
    name: 'Scriptorium', tier: 'food', era: 5, w: 2, h: 2, cost: 460, upkeep: 0.46,
    icon: '\u{1F4DC}', color: '#cfc09a', workers: 3, needsWater: true,
    procIn: 'reeds', procOut: 'baskets', procRate: 2.8, procRatio: 0.5, procRatio: 0.5,
    desc: 'Splits, presses and dries papyrus into sheets: 2.8 reeds/min. The richest thing this age makes.',
  },
  brickfield: {
    name: 'Brick Field', tier: 'food', era: 5, w: 2, h: 2, cost: 380, upkeep: 0.38,
    icon: '\u{1F9F1}', color: '#b07a4e', workers: 3,
    procIn: 'clay', procOut: 'mudbrick', procRate: 3.2, procRatio: 0.6,
    desc: 'Straw, silt and sun: 3.2 clay/min into mudbrick. No kiln — the desert does the firing.',
  },
  masonsyard: {
    name: "Masons' Yard", tier: 'food', era: 5, w: 2, h: 2, cost: 480, upkeep: 0.50,
    icon: '\u{1F528}', color: '#b9ae95', workers: 4,
    procIn: 'stone', procOut: 'blocks', procRate: 2.4, procRatio: 0.5,
    desc: 'Dresses rough stone into casing blocks: 2.4 stone/min. The Great Pyramid is built out of this building.',
  },

  scrollmarket: {
    name: 'Scroll Market', tier: 'commerce', era: 5, w: 2, h: 2, cost: 560, upkeep: 0.50,
    icon: '\u{1F4D6}', color: '#e3d7ae', workers: 2, needsRoad: true, needsWater: true,
    sells: 'baskets', sellRate: 0.5, sellPrice: 12, custRadius: 7, custMin: 8,
    desc: 'Sells papyrus sheets at $12 — the highest price in the age — to every temple and estate ' +
      'that keeps accounts. Needs ≥8 residents, at any distance.',
  },
  brickwharf: {
    name: 'Brick Wharf', tier: 'commerce', era: 5, w: 2, h: 2, cost: 480, upkeep: 0.46,
    icon: '\u{1F6A2}', color: '#c08a5e', workers: 2, needsRoad: true, needsWater: true,
    sells: 'mudbrick', sellRate: 1.0, sellPrice: 4.1, custRadius: 7, custMin: 8,
    desc: 'Barges brick downriver: 1.0/min at $4.10. Sell the surplus — but the monument eats brick too.',
  },
  blockwharf: {
    name: 'Block Wharf', tier: 'commerce', era: 5, w: 2, h: 2, cost: 520, upkeep: 0.48,
    icon: '\u{1F5FF}', color: '#c7bda4', workers: 2, needsRoad: true, needsWater: true,
    sells: 'blocks', sellRate: 0.6, sellPrice: 12, custRadius: 7, custMin: 8,
    desc: 'Ships dressed stone: 0.6 blocks/min at $12. Every block sold is one the Pyramid does not get.',
  },

  basin: {
    name: 'Inundation Basin', tier: 'infra', era: 5, w: 2, h: 2, cost: 300, upkeep: 0.22,
    icon: '\u{1F4A7}', color: '#6fb3cf', waterRadius: 11,
    desc: 'Catch the flood and hold it: waters an 11-tile radius, the widest in the age.',
  },
  nomarchgranary: {
    name: "Nomarch's Granary", tier: 'infra', era: 5, w: 2, h: 2, cost: 700, upkeep: 0.30,
    icon: '\u{1F3EF}', color: '#c9a558', needsWater: true, needsRoad: true, depot: true,
    storeGrain: 1600, storeFlour: 400,
    desc: 'The state granary: +1600 grain and +400 flour while connected. Egypt survived on stored years.',
  },
  obelisk: {
    name: 'Obelisk', tier: 'civic', era: 5, w: 1, h: 1, cost: 220, upkeep: 0.06,
    icon: '\u{1F5FC}', color: '#d6c48d', amenityRadius: 7,
    desc: 'A single stone needle. Pleases the neighbourhood and lets houses rise a rung.',
  },

  winnowingfloor: {
    name: 'Winnowing Floor', tier: 'food', era: 5, w: 2, h: 2, cost: 190, upkeep: 0.10,
    icon: '\u{1F33E}', color: '#dcc48e', threshing: true,
    desc: 'A swept floor where oxen tread out the grain. +25% to every field it touches, and being 2×2 ' +
      'it can touch four — use it on the fields your Quern House cannot reach. Does not stack with one.',
  },
  siltspread: {
    name: 'Silt Spread', tier: 'food', era: 5, w: 1, h: 1, cost: 150, upkeep: 0.08,
    icon: '\u{1FAA3}', color: '#7f6a4a', soilRadius: 7,
    desc: 'Flood silt barrowed onto tired ground: land within 7 tiles recovers 3× faster. ' +
      'The flood renews what it reaches — this reaches the rest.',
  },
  houseofbooks: {
    name: 'House of Books', tier: 'civic', era: 5, w: 1, h: 1, cost: 320, upkeep: 0.14,
    icon: '\u{1F4DA}', color: '#cfbd8e', needsWater: true, keepsTally: true,
    desc: 'The per-medjat, where the scribes keep the accounts. +10% sales at every shop within 20 tiles, ' +
      'and the city can read its own numbers.',
  },
  ferryquay: {
    name: 'Ferry Quay', tier: 'infra', era: 5, w: 1, h: 1, cost: 150, upkeep: 0.05,
    icon: '\u{26F5}', color: '#8a7a5c', onWater: true, bridge: true,
    desc: 'Placed ON the river, it carries the road across. Lay a line bank to bank — with one artery ' +
      'this wide, the far shore is half your farmland.',
  },

  canalwell: {
    name: 'Canal Well', tier: 'infra', era: 5, w: 1, h: 1, cost: 180, upkeep: 0.18,
    icon: '\u{1F30A}', color: '#5da4c9', waterRadius: 8,
    desc: 'Egyptian canal engineering: waters a much larger radius.',
  },
  granary: {
    name: 'Granary', tier: 'infra', era: 5, w: 2, h: 2, cost: 400, upkeep: 0.20,
    icon: '\u{1F3FA}', color: '#c4a35a', needsWater: true, depot: true,
    storeGrain: TUNE.GRANARY_GRAIN, storeFlour: TUNE.GRANARY_FLOUR,
    desc: 'Storage: +' + TUNE.GRANARY_GRAIN + ' grain and +' + TUNE.GRANARY_FLOUR + ' flour capacity while connected.',
  },
  estate: {
    name: 'Estate Farm', tier: 'food', era: 5, w: 2, h: 2, cost: 350, upkeep: 0.30,
    icon: '\u{1F3DE}️', color: '#93bd55', workers: 3, needsWater: true,
    out: { grain: 2.2 },
    desc: 'A wheat estate: 2.2 grain/min. Same soil and Mill bonuses.',
  },
  villa: {
    name: 'Villa', tier: 'housing', era: 5, w: 1, h: 1, cost: 300, upkeep: 0.10,
    icon: '\u{1F3E1}', color: '#e0b284', cap: 8, needsWater: true,
    desc: 'Mudbrick villa: homes 8 residents.',
  },
  bazaar: {
    name: 'Bazaar', tier: 'commerce', era: 5, w: 2, h: 2, cost: 500, upkeep: 0.45,
    icon: '\u{1F3D9}️', color: '#d98a5f', workers: 3, needsWater: true,
    sells: 'flour', sellRate: 1.2, sellPrice: 7, custRadius: 7, custMin: 8,
    desc: 'Sells 1.2 flour/min at $7. Needs ≥8 residents, at any distance — hauls over 20 tiles cost carting.',
  },
  temple: {
    name: 'Temple', tier: 'civic', era: 5, w: 2, h: 2, cost: 600, upkeep: 0.25,
    icon: '\u{1F3EF}', color: '#d9c48a', needsWater: true,
    desc: '+1 housing capacity for Houses within 2 tiles. Stacks with Parks.',
  },

  brickwell: {
    name: 'Brick-Lined Well', tier: 'infra', era: 6, w: 1, h: 1, cost: 100, upkeep: 0.17,
    icon: '\u{26F2}', color: '#7fb4c9', waterRadius: 6,
    desc: 'A shaft of wedge-shaped bricks, each one cut to the curve before anyone dug the hole, so the ' +
      'ring locks itself as it goes down. Waters 6 tiles. ★ THE RIVER WATERS NOTHING — only a well ' +
      'does, and every building that says it needs water means this.',
  },

  stepwell: {
    name: 'Stepped Well', tier: 'infra', era: 6, w: 1, h: 1, cost: 330, upkeep: 0.27,
    icon: '\u{1F6B0}', color: '#6fa8c4', waterRadius: 9,
    desc: 'Steps cut down to the water table, so a jar is carried up rather than hauled. Waters 9 ' +
      'tiles — the well a whole block can queue at.',
  },

  drain: {
    name: 'Covered Drain', tier: 'infra', era: 6, w: 1, h: 2, cost: 200, upkeep: 0.17,
    icon: '\u{1F6BF}', color: '#8fa4ae', needsRoad: true, drainRadius: 10,
    desc: 'A brick channel under the street, corbelled over, with lifting slabs every few metres for ' +
      'inspection. ★ A BLOCK ONLY COUNTS WHILE IT IS DRAINED: every qualifying rectangle inside its ' +
      '10 tiles earns +30% output, −10% upkeep and +1 resident a home. Mothball this and every one of ' +
      'them stops counting at once. Needs no water and no workers.',
  },

  riverjetty: {
    name: 'Brick Jetty', tier: 'infra', era: 6, w: 1, h: 1, cost: 200, upkeep: 0.09,
    icon: '\u{1F6E4}\u{FE0F}', color: '#9c6a4a', onWater: true, bridge: true,
    desc: 'Fired brick on a timber raft, which is how you cross a river that moves. Carries the road ' +
      'over water — lay a line of them bank to bank. ★ Water is a WALL for a block, so a jetty can ' +
      'carry a street and can never be inside one.',
  },

  jarrow: {
    name: 'Sunken Jar Row', tier: 'infra', era: 6, w: 1, h: 1, cost: 130, upkeep: 0.07,
    icon: '\u{1F3FA}', color: '#b08a5a', storeGrain: 39, storeFlour: 23,
    desc: 'Storage jars sunk to the shoulder in a brick floor. +39 barley and +23 flour, NO workers ' +
      'and no road — the famine buffer that does not eat.',
  },

  balestore: {
    name: 'Bale Warehouse', tier: 'infra', era: 6, w: 2, h: 2, cost: 330, upkeep: 0.34,
    icon: '\u{1F4E6}', color: '#a88f68', workers: 2, needsRoad: true, depot: true, storeCraft: 26,
    desc: 'Racked shelves and sealed bales, each stamped with a seal nobody can read. +26 capacity for ' +
      'EVERY craft good while staffed, and it counts as a SUPPLY POINT for carting. Bank goods through ' +
      'a shop\'s bad spell instead of dumping them abroad at half list.',
  },

  cartstation: {
    name: 'Bullock-Cart Station', tier: 'infra', era: 6, w: 1, h: 2, cost: 330, upkeep: 0.43,
    icon: '\u{1F402}', color: '#a58c62', workers: 1, needsRoad: true, depot: true,
    desc: 'A yard of solid-wheeled bullock carts, the same design still made in Sindh. Counts as a ' +
      'SUPPLY POINT — one station out on the chert erases the frontier\'s carting premium, which is ' +
      'the entire reason the Agate Camp is affordable at that distance.',
  },

  siltditch: {
    name: 'Silt Ditch', tier: 'infra', era: 6, w: 1, h: 1, cost: 150, upkeep: 0.14,
    icon: '\u{1F4A6}', color: '#8a7a5c', soilRadius: 6,
    desc: 'A cut that lets fresh silt onto tired ground and lets the salt back out. Land within 6 ' +
      'tiles recovers three times as fast. No road, no water, no workers.',
  },

  brickhouse: {
    name: 'Courtyard House', tier: 'housing', era: 6, w: 1, h: 1, cost: 200, upkeep: 0.09,
    icon: '\u{1F3E0}', color: '#c98f6a', cap: 5, needsWater: true, needsRoad: true,
    desc: 'Rooms around a courtyard, a blank wall to the street, and a bathing floor with its own chute ' +
      'down to the drain. Homes 3 when it goes up, rising to 18 — and one more again inside a ' +
      'qualifying block. It is the same house everywhere in the Indus, which is the strangest thing ' +
      'about this civilisation.',
  },

  blockhouse: {
    name: 'Merchant Block House', tier: 'housing', era: 6, w: 2, h: 2, cost: 1560, upkeep: 0.52,
    icon: '\u{1F3D8}\u{FE0F}', color: '#b5794f', cap: 30,
    needsWater: true, needsRoad: true, needsBlock: true,
    levels: ['Walled Yard', 'Merchant Compound', 'Gated Compound',
             'Two-Storey Compound', 'Great Compound', 'Citadel Compound'],
    desc: 'A merchant\'s compound filling a quarter of a planned block — 15 residents when it goes up, ' +
      'rising to 105, all behind one wall sharing one drain and one gate. ★ IT CAN ONLY STAND INSIDE A ' +
      'QUALIFYING BLOCK. More people per tile than anything else in the era, at a worse price per ' +
      'head: density is bought with planning.',
  },

  bathcourt: {
    name: 'Bathing Platform', tier: 'civic', era: 6, w: 1, h: 1, cost: 150, upkeep: 0.14,
    icon: '\u{1F6C1}', color: '#a8bcc4', amenityRadius: 9,
    desc: 'A raised brick floor, a run-off channel and a jar of water. Homes within 9 tiles can climb ' +
      'their rungs. Bathing was not a luxury here; it was plumbing, and every house had it.',
  },

  hallstandards: {
    name: 'Hall of Standards', tier: 'civic', era: 6, w: 2, h: 3, cost: 830, upkeep: 0.77,
    icon: '\u{2696}\u{FE0F}', color: '#c9b46a', workers: 4, needsRoad: true, needsWater: true,
    weighRadius: 12,
    desc: 'Cubical chert weights in a strict 1:2:4:8:16 series, accurate to a fraction of a gram from ' +
      'here to the Persian Gulf. Every shop within 12 tiles sells at a higher price. This is what the ' +
      'Indus had instead of a king.',
  },

  sealcutter: {
    name: "Seal Cutter's Office", tier: 'civic', era: 6, w: 1, h: 2, cost: 330, upkeep: 0.21,
    icon: '\u{1F4DC}', color: '#cbb98a', needsRoad: true, keepsTally: true,
    desc: 'Steatite stamp seals: a one-horned beast, a manger, and six signs nobody alive can read. ' +
      '+10% throughput at every shop within 20 tiles. One covers a quarter; a second adds nothing to a ' +
      'shop already counted.',
  },

  greatgranary: {
    name: 'Great Granary', tier: 'civic', era: 6, w: 4, h: 4, cost: 1500, upkeep: 0.60,
    icon: '\u{1F33E}', color: '#c9a86a', workers: 6, needsRoad: true, needsWater: true,
    depot: true, storeGrain: 374, storeFlour: 234,
    desc: 'A ventilated brick podium the size of a city block, with air ducts running under the floor. ' +
      'Nobody knows what the real ones held — this one holds your grain and flour, counts as a SUPPLY ' +
      'POINT, collects head money from residents within 20 tiles, and issues its stores directly in a ' +
      'famine.',
  },

  gridpost: {
    name: 'Cord & Peg Post', tier: 'civic', era: 6, w: 1, h: 1, cost: 580, upkeep: 0.52,
    icon: '\u{1F4D0}', color: '#c2ac82', needsRoad: true,
    blockRadius: 24, blockMaxSide: 10, blockTolerance: 1,
    desc: 'Cord, peg and a level eye. Blocks within 24 tiles may run to 10 tiles a side and may leave ' +
      'ONE interior tile unbuilt — a 10x10 builds on 82.6% of its ground against an 8x8\'s 79.0%, and ' +
      'the tolerance is the difference between a district you can rebuild and one you must not touch.',
  },

  claycut: {
    name: 'River Clay Cut', tier: 'food', era: 6, w: 2, h: 2, cost: 180, upkeep: 0.26,
    icon: '\u{1FAA8}', color: '#9c7b52', workers: 2, nearWater: 3,
    out: { clay: 2.11 },
    desc: 'Alluvium cut off the bank and levigated through settling tanks: 2.11 clay/min, +50% within ' +
      '3 tiles of water. This is the ONLY raw material the plain has, and everything you will ever ' +
      'build here is made of it.',
  },

  brickkiln: {
    name: 'Fired-Brick Kiln', tier: 'food', era: 6, w: 2, h: 2, cost: 430, upkeep: 0.48,
    icon: '\u{1F9F1}', color: '#a5643c', workers: 3, needsWater: true, industry: true,
    procIn: 'clay', procOut: 'brick', procRate: 2.64, procRatio: 0.5,
    desc: 'Fires 2.64 clay/min into 1.32 standardised bricks — 1:2:4, the same size from Harappa to ' +
      'Lothal for seven hundred years. Sun-dried brick is for walls; FIRED brick is for drains, ' +
      'platforms and anything that has to meet water. Industry: a poor neighbour for houses.',
  },

  standardyard: {
    name: 'Standard Brick Yard', tier: 'commerce', era: 6, w: 2, h: 2, cost: 400, upkeep: 0.52,
    icon: '\u{1F9F1}', color: '#c07a52', workers: 2, needsRoad: true, needsWater: true,
    sells: 'brick', sellRate: 0.66, sellPrice: 14.95, custRadius: 7, custMin: 7,
    desc: 'Stacks of graded brick sold by the standard course: 0.66/min at $14.95. Needs 7 residents. ' +
      'Your drains and your Great Bath eat out of the same pile, so a yard that sells everything is a ' +
      'yard that stopped your monument.',
  },

  cottonfield: {
    name: 'Cotton Field', tier: 'food', era: 6, w: 2, h: 2, cost: 220, upkeep: 0.26,
    icon: '\u{1F33F}', color: '#b9c4a0', workers: 2, needsWater: true, slowSalt: true,
    out: { cotton: 1.32 },
    desc: 'The oldest cotton anyone has found was spun near here thousands of years before this city ' +
      'was laid out, and it wants the same watered silt your barley wants. 1.32 cotton/min, +50% on ' +
      'fertile ground, and it salts the soil at HALF the barley rate.',
  },

  spinnery: {
    name: "Spinner's Court", tier: 'food', era: 6, w: 2, h: 2, cost: 500, upkeep: 0.52,
    icon: '\u{1F9F5}', color: '#c2b48a', workers: 3, needsWater: true, industry: true,
    procIn: 'cotton', procOut: 'cottoncloth', procRate: 2.11, procRatio: 0.5,
    desc: 'Spindle whorls by the thousand in an open courtyard: 2.11 cotton/min into 1.06 cloth. ' +
      'Mesopotamia called the country it came from MELUHHA, and paid silver for it.',
  },

  balehouse: {
    name: 'Bale House', tier: 'commerce', era: 6, w: 2, h: 2, cost: 530, upkeep: 0.60,
    icon: '\u{1F9F6}', color: '#b98b6a', workers: 2, needsRoad: true, needsWater: true,
    sells: 'cottoncloth', sellRate: 0.53, sellPrice: 24.38, custRadius: 7, custMin: 10,
    desc: 'Baled, sealed and stamped for the boats down to Lothal and out to Dilmun: 0.53 cloth/min at ' +
      '$24.38. Needs 10 residents.',
  },

  agatecamp: {
    name: "Agate Gatherer's Camp", tier: 'food', era: 6, w: 2, h: 2, cost: 220, upkeep: 0.26,
    icon: '\u{1F536}', color: '#b5502f', workers: 2, onRock: true,
    out: { carnelian: 0.80 },
    desc: 'Nodules of carnelian agate off a chert ridge — heated, cracked and carried home. 0.80/min, ' +
      'and +50% standing ON the rock. Rock is 1% of this map and all of it is at one edge, which is why ' +
      'this is the richest thing you can make and the furthest from your city. Bring a Cart Station.',
  },

  beadworks: {
    name: 'Bead Drilling Works', tier: 'food', era: 6, w: 2, h: 2, cost: 600, upkeep: 0.55,
    icon: '\u{1F4FF}', color: '#a4485a', workers: 3, needsWater: true, industry: true,
    procIn: 'carnelian', procOut: 'beads', procRate: 1.26, procRatio: 0.5,
    desc: 'Long barrel beads bored with an ernestite drill bit — replication says days of work for ' +
      'each one — then etched white with alkali. 1.26 carnelian/min into 0.63 beads; half the stone ' +
      'goes as dust. These turn up in the Royal Cemetery at Ur, which is where rung 4\'s luxuries came ' +
      'from.',
  },

  beadhouse: {
    name: 'Seal & Bead House', tier: 'commerce', era: 6, w: 2, h: 2, cost: 530, upkeep: 0.60,
    icon: '\u{1F48E}', color: '#c0563f', workers: 2, needsRoad: true, needsWater: true,
    sells: 'beads', sellRate: 0.40, sellPrice: 33.81, custRadius: 7, custMin: 10,
    desc: 'Beads, seals and weights on one counter: 0.40/min at $33.81, the richest trade in the era ' +
      'and the furthest from home. Needs 10 residents.',
  },

  leveefield: {
    name: 'Levee Field', tier: 'food', era: 6, w: 2, h: 2, cost: 170, upkeep: 0.26,
    icon: '\u{1F33E}', color: '#a8c26a', workers: 2,
    out: { grain: 1.56 },
    desc: 'Barley and wheat sown on the silt the flood left behind, watered by nothing but the ground ' +
      'it stands on. 1.56 barley/min, +50% on fertile, +25% touching a Quern Mill, +20% inside a fed ' +
      'Zebu Byre\'s ring — and it needs no well, no road and no street, so your founding party can ' +
      'work it the moment it goes down.',
  },

  quernmill: {
    name: 'The Quern Mill', tier: 'food', era: 6, w: 2, h: 2, cost: 420, upkeep: 0.43,
    icon: '\u{2699}\u{FE0F}', color: '#b09a7e', workers: 3, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procOut: 'flour', procRate: 4.68, procRatio: 0.6,
    desc: 'Saddle and rotary querns under one roof: grinds 4.68 barley/min into 2.81 flour — and 5.85 ' +
      'when it touches a field, because the +25% raises both sides. One mill wants three fields, or two ' +
      'on fertile. Industry: a poor neighbour for houses.',
  },

  grainstreet: {
    name: 'Grain Street Market', tier: 'commerce', era: 6, w: 2, h: 2, cost: 420, upkeep: 0.52,
    icon: '\u{1F3EA}', color: '#c97f7f', workers: 2, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 0.94, sellPrice: 5.72, custRadius: 6, custMin: 6,
    desc: 'Barrows of flour along a swept arterial street, sold by the standard measure: 0.94/min at ' +
      '$5.72. Needs 6 residents. Bread is the cheapest thing in the city and the reason anyone lives ' +
      'in it.',
  },

  shellbed: {
    name: 'Chank Shell Bed', tier: 'food', era: 6, w: 2, h: 2, cost: 220, upkeep: 0.26,
    icon: '\u{1F41A}', color: '#d8cbb4', workers: 2, nearWater: 2,
    out: { shell: 1.32 },
    desc: 'Divers working the creeks for the sacred chank, brought up whole and carried inland. 1.32 ' +
      'shell/min, +50% within 2 tiles of water. It wants the same bank your clay and your weir want.',
  },

  banglecourt: {
    name: "Bangle Sawyer's Court", tier: 'food', era: 6, w: 2, h: 2, cost: 500, upkeep: 0.52,
    icon: '\u{1F4BF}', color: '#c9bda8', workers: 3, needsWater: true, industry: true,
    procIn: 'shell', procOut: 'bangles', procRate: 2.11, procRatio: 0.5,
    desc: 'A bronze saw and a fixed jig: the shell is cut in a spiral so one whorl yields five or six ' +
      'rings and the core goes out as inlay. 2.11 shell/min into 1.06 bangles.',
  },

  banglecounter: {
    name: 'Bangle & Inlay Counter', tier: 'commerce', era: 6, w: 2, h: 2, cost: 530, upkeep: 0.60,
    icon: '\u{1F48D}', color: '#cbbfa4', workers: 2, needsRoad: true, needsWater: true,
    sells: 'bangles', sellRate: 0.66, sellPrice: 19.50, custRadius: 7, custMin: 8,
    desc: 'Bangles by the armful and shell inlay by the sheet: 0.66/min at $19.50. Needs 8 residents. ' +
      'Four-fifths the price of a bale of cloth and a quarter more of them out the door — the same ' +
      'money, taken off different ground.',
  },

  tilfield: {
    name: 'Til Field', tier: 'food', era: 6, w: 2, h: 2, cost: 180, upkeep: 0.21,
    icon: '\u{1F33B}', color: '#b5b062', workers: 2, needsWater: true, slowSalt: true,
    out: { sesame: 0.79 },
    desc: 'Sesame — til — grown at Harappa before anywhere else on earth. 0.79/min, and it salts the ' +
      'ground at HALF the barley rate. ★ ONE FIELD CANNOT KEEP A MILL BUSY: this is the era\'s only ' +
      '2:1:1 chain, and that is the point of it.',
  },

  oilmill: {
    name: 'Sesame Oil Mill', tier: 'food', era: 6, w: 2, h: 2, cost: 430, upkeep: 0.48,
    icon: '\u{1FAD2}', color: '#a89143', workers: 3, needsWater: true, industry: true,
    procIn: 'sesame', procOut: 'oil', procRate: 2.64, procRatio: 0.5,
    desc: 'A stone mortar and a turning pestle driven by an ox: crushes 2.64 sesame/min into 1.32 oil. ' +
      'Two Til Fields keep it fed; one leaves it idle 40% of the time.',
  },

  oilrow: {
    name: 'Oil Row', tier: 'commerce', era: 6, w: 2, h: 2, cost: 540, upkeep: 0.70,
    icon: '\u{1FAD9}', color: '#bfa14e', workers: 2, needsRoad: true, needsWater: true,
    sells: 'oil', sellRate: 0.79, sellPrice: 16.90, custRadius: 6, custMin: 6,
    desc: 'Sealed jars of til oil along one street: lamp fuel, cooking fat and skin balm, 0.79/min at ' +
      '$16.90. Needs 6 residents. The cheapest chain in the era to stand up and the fussiest to feed.',
  },

  canecut: {
    name: 'Sarkanda Cane Cut', tier: 'food', era: 6, w: 2, h: 2, cost: 170, upkeep: 0.17,
    icon: '\u{1FAB4}', color: '#8fae72', workers: 2, nearWater: 2,
    out: { reeds: 1.58 },
    desc: 'Sarkanda cane cut off the marsh edge: 1.58/min, +50% within 2 tiles of water. Nearly ' +
      'worthless raw, and the frame of every roof, crate, screen and boat in the valley. Build its ' +
      'Matting Court or you have bought a pile of grass.',
  },

  mattingcourt: {
    name: 'Matting Court', tier: 'food', era: 6, w: 2, h: 2, cost: 430, upkeep: 0.48,
    icon: '\u{1F9FA}', color: '#c2a86b', workers: 3, needsWater: true, industry: true,
    procIn: 'reeds', procOut: 'baskets', procRate: 2.64, procRatio: 0.5,
    desc: 'Screens, crates, cordage and roofing panels woven flat on the ground: 2.64 cane/min into ' +
      '1.32 finished matting.',
  },

  cratecounter: {
    name: 'Crate & Mat Counter', tier: 'commerce', era: 6, w: 2, h: 2, cost: 400, upkeep: 0.52,
    icon: '\u{1F4E6}', color: '#c2a067', workers: 2, needsRoad: true, needsWater: true,
    sells: 'baskets', sellRate: 0.79, sellPrice: 11.57, custRadius: 6, custMin: 6,
    desc: 'Crates stamped for the boats and screens for every courtyard in the quarter: 0.79/min at ' +
      '$11.57. Needs 6 residents. Cheap to stand up, cheap to keep, and it never made anybody rich.',
  },

  brickweir: {
    name: 'The Brick Weir', tier: 'food', era: 6, w: 1, h: 3, cost: 270, upkeep: 0.26,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 2, onWater: true,
    out: { fish: 1.87 },
    desc: 'A brick-and-cane fence set across the current: 1.87 fish/min, eaten at 75% of flour\'s ' +
      'worth. Food that owes nothing to your soil, your salt, your mill or your streets — it stands ' +
      'IN the water, so it can never be part of a block and can never lose one.',
  },

  bergarden: {
    name: 'Ber & Date Garden', tier: 'food', era: 6, w: 3, h: 3, cost: 420, upkeep: 0.34,
    icon: '\u{1F334}', color: '#8fae62', workers: 3,
    out: { dates: 2.34 }, saltProof: true,
    desc: 'Ber and date, walled and underplanted, rooting straight into the water table. 2.34/min, ' +
      'eaten like flour, and it IGNORES the salt clock entirely — +50% on ground already ruined. ' +
      'Needs no water coverage, no road and no street: the one food nothing in this age can take away.',
  },

  zebubyre: {
    name: 'Zebu Byre & Plow Team', tier: 'food', era: 6, w: 2, h: 4, cost: 670, upkeep: 0.52,
    icon: '\u{1F402}', color: '#9c7f5c', workers: 2, needsWater: true, oxTeam: true,
    desc: 'The humped bull — the second beast on the seals, after the one-horned one nobody can name — ' +
      'in a byre with a plow team. Eats 0.4 barley/min as fodder and plows EVERY ploughed field within ' +
      '14 tiles to +20%, however many there are. It breaks even at two fields and is profit after. ' +
      'Site the byre first and lay the fields around it.',
  },

  unicornseal: {
    name: 'Unicorn Seal Stone', tier: 'beauty', era: 6, w: 1, h: 1, cost: 40, upkeep: 0,
    icon: '\u{1FAA7}', color: '#b8a888', cosmetic: true, nameable: true,
    desc: 'A steatite seal stone set upright at a corner — the one-horned beast, a manger, and six ' +
      'signs nobody alive can read. No output, no upkeep. Click it to name the quarter.',
  },

  peepal: {
    name: 'Peepal Tree Court', tier: 'beauty', era: 6, w: 1, h: 1, cost: 70, upkeep: 0,
    icon: '\u{1F333}', color: '#6faf62', cosmetic: true,
    desc: 'A fig tree in a brick surround — the same tree that appears on the seals with a figure ' +
      'standing in its fork. Pure beauty: zero output, zero upkeep, and it was probably sacred.',
  },

  cutbank: {
    name: 'Levigation Cutbank', tier: 'food', era: 6, w: 2, h: 2, cost: 430, upkeep: 0.36,
    icon: '\u{1FAB5}', color: '#8a6c48', workers: 3, nearWater: 3,
    out: { clay: 4.22 },
    desc: 'The bank cut back in courses and the spoil washed through three settling tanks instead of ' +
      'one: 4.22 clay/min, and the fines come out clean enough for a seal blank.',
  },

  cottonrows: {
    name: 'Irrigated Cotton Rows', tier: 'food', era: 6, w: 2, h: 2, cost: 530, upkeep: 0.36,
    icon: '\u{1F33E}', color: '#c9d1b0', workers: 3, needsWater: true, slowSalt: true,
    out: { cotton: 2.64 },
    desc: 'Ridge and furrow, hand-watered from a channel and picked twice: 2.64 cotton/min, still at ' +
      'half the barley\'s salt rate.',
  },

  agateworkings: {
    name: 'Chert Ridge Workings', tier: 'food', era: 6, w: 2, h: 2, cost: 530, upkeep: 0.36,
    icon: '\u{1F5FB}', color: '#a8452c', workers: 3, onRock: true,
    out: { carnelian: 1.60 },
    desc: 'A standing camp on the ridge with fire pits, water and a track down: 1.60 carnelian/min, ' +
      '+50% on the rock. Still gathers nodules rather than cutting the ridge, so it never runs the ' +
      'outcrop out.',
  },

  inundationfield: {
    name: 'Inundation Field', tier: 'food', era: 6, w: 2, h: 2, cost: 410, upkeep: 0.36,
    icon: '\u{1F33E}', color: '#93b85c', workers: 3,
    out: { grain: 3.12 },
    desc: 'Bunded on all four sides so the flood is held on the plot and let off once the seed is in: ' +
      '3.12 barley/min, and still not one drop of it comes from a well.',
  },

  chankbank: {
    name: 'Chank Dredging Bank', tier: 'food', era: 6, w: 2, h: 2, cost: 530, upkeep: 0.36,
    icon: '\u{1F41A}', color: '#cbbda0', workers: 3, nearWater: 2,
    out: { shell: 2.64 },
    desc: 'Weighted rakes worked from a moored boat instead of divers holding their breath: 2.64 ' +
      'shell/min, and it works the deep beds a diver cannot reach.',
  },

  tilterrace: {
    name: 'Banked Til Beds', tier: 'food', era: 6, w: 2, h: 2, cost: 430, upkeep: 0.29,
    icon: '\u{1F33B}', color: '#c9b672', workers: 3, needsWater: true, slowSalt: true,
    out: { sesame: 1.58 },
    desc: 'Levelled beds with a lip that holds the water a day longer: 1.58 sesame/min — ★ one of ' +
      'these keeps a Sesame Oil Mill fed on its own, so the 2:1:1 chain becomes 1:1:1.',
  },

  canebeds: {
    name: 'Managed Cane Beds', tier: 'food', era: 6, w: 2, h: 2, cost: 410, upkeep: 0.24,
    icon: '\u{1F33E}', color: '#8fae72', workers: 3, nearWater: 2,
    out: { reeds: 3.16 },
    desc: 'Cut on a three-year rotation instead of stripped bare: 3.16 cane/min, and the bed comes ' +
      'back every year instead of once.',
  },

  weirpens: {
    name: 'Sluiced Weir & Pens', tier: 'food', era: 6, w: 1, h: 3, cost: 650, upkeep: 0.36,
    icon: '\u{1F420}', color: '#5f93aa', workers: 3, onWater: true,
    out: { fish: 3.74 },
    desc: 'A permanent weir with brick sluices and holding pens, so the catch stays alive until it is ' +
      'wanted: 3.74 fish/min. Still stands IN the water, so it still cannot be part of a block — and ' +
      'still cannot lose one.',
  },

  berorchard: {
    name: 'Walled Ber Orchard', tier: 'food', era: 6, w: 3, h: 3, cost: 1010, upkeep: 0.48,
    icon: '\u{1F334}', color: '#7f9e54', workers: 4,
    out: { dates: 4.68 }, saltProof: true,
    desc: 'Walled, watered by hand from a stepped well and underplanted with melon and gourd — the ' +
      'three-storey orchard the valley actually ran: 4.68/min. Still no water coverage, no road and ' +
      'no street. Still the food nothing can take away.',
  },

  doublekiln: {
    name: 'Double-Chamber Kiln', tier: 'craft', era: 6, w: 2, h: 2, cost: 710, upkeep: 0.62,
    icon: '\u{1F525}', color: '#96522f', workers: 4, needsWater: true, industry: true,
    procIn: 'clay', procOut: 'brick', procRate: 3.70, procRatio: 0.5,
    desc: 'Two chambers on one flue, so the second is drying while the first is firing: 3.70 clay/min ' +
      'into 1.85 brick, and far fewer warped courses.',
  },

  whorlhall: {
    name: 'Whorl Hall', tier: 'craft', era: 6, w: 2, h: 2, cost: 830, upkeep: 0.68,
    icon: '\u{1F9F5}', color: '#cbbf94', workers: 4, needsWater: true, industry: true,
    procIn: 'cotton', procOut: 'cottoncloth', procRate: 2.95, procRatio: 0.5,
    desc: 'Roofed, lit and worked in shifts: 2.95 cotton/min into 1.48 cloth, by people who own their ' +
      'own whorls.',
  },

  drillhall: {
    name: 'Ernestite Drill Hall', tier: 'craft', era: 6, w: 2, h: 2, cost: 990, upkeep: 0.77,
    icon: '\u{1F4FF}', color: '#8f3d4c', workers: 4, needsWater: true, industry: true,
    procIn: 'carnelian', procOut: 'beads', procRate: 1.76, procRatio: 0.5,
    desc: 'Bow drills in a row, tipped with the hardest stone anyone in the Bronze Age has: 1.76 ' +
      'carnelian/min into 0.88 beads. ★ 1.76 takes TWO Agate Camps, or one Chert Ridge Workings.',
  },

  millingcourt: {
    name: 'The Milling Court', tier: 'food', era: 6, w: 2, h: 2, cost: 690, upkeep: 0.60,
    icon: '\u{1F35E}', color: '#c4ab86', workers: 4, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procOut: 'flour', procRate: 6.55, procRatio: 0.6,
    desc: 'A walled court of querns worked in shifts by the granary gang: 6.55 barley/min into 3.93 ' +
      'flour. Still raises an adjacent field +25%, both ways.',
  },

  sawyershall: {
    name: "Sawyers' Hall", tier: 'craft', era: 6, w: 2, h: 2, cost: 830, upkeep: 0.68,
    icon: '\u{1F4BF}', color: '#bfb192', workers: 4, needsWater: true, industry: true,
    procIn: 'shell', procOut: 'bangles', procRate: 2.95, procRatio: 0.5,
    desc: 'Fixed jigs, a copper saw kept wet, and a boy whose whole job is the sand: 2.95 shell/min ' +
      'into 1.48 bangles, and the cores go out as inlay instead of spoil.',
  },

  beammill: {
    name: 'Beam Oil Mill', tier: 'craft', era: 6, w: 2, h: 2, cost: 710, upkeep: 0.62,
    icon: '\u{1FAD2}', color: '#b59a5f', workers: 4, needsWater: true, industry: true,
    procIn: 'sesame', procOut: 'oil', procRate: 3.70, procRatio: 0.5,
    desc: 'A weighted beam over the mortar instead of an ox walking in a circle: 3.70 sesame/min into ' +
      '1.85 oil, and the cake comes out dry enough to feed the byre.',
  },

  cordagecourt: {
    name: 'Crate & Cordage Court', tier: 'craft', era: 6, w: 2, h: 2, cost: 710, upkeep: 0.60,
    icon: '\u{1FAA2}', color: '#b59a70', workers: 4, needsWater: true, industry: true,
    procIn: 'reeds', procOut: 'baskets', procRate: 3.70, procRatio: 0.5,
    desc: 'Cane split, retted and laid up into rope as well as woven flat: 3.70 cane/min into 1.85 ' +
      'finished goods, and rope is what a boat is actually made of.',
  },

  coursemarket: {
    name: 'Graded Course Market', tier: 'shop', era: 6, w: 2, h: 2, cost: 800, upkeep: 0.73,
    icon: '\u{1F9F1}', color: '#c98f5f', workers: 3, needsRoad: true, needsWater: true,
    sells: 'brick', sellRate: 1.32, sellPrice: 14.95, custRadius: 7, custMin: 7,
    desc: 'Brick graded by course and sold against a sealed tally: 1.32/min, double the yard. Your ' +
      'monument still eats out of the same pile.',
  },

  balewharf: {
    name: 'Bale Wharf', tier: 'shop', era: 6, w: 2, h: 2, cost: 1060, upkeep: 0.84,
    icon: '\u{1F6A2}', color: '#a87f60', workers: 3, needsRoad: true, needsWater: true,
    sells: 'cottoncloth', sellRate: 1.06, sellPrice: 24.38, custRadius: 7, custMin: 10,
    desc: 'A brick quay with a warehouse behind it and a boat waiting: 1.06 bales/min out to Lothal ' +
      'and Dilmun, twice the house it replaces.',
  },

  sealbeadhall: {
    name: 'Seal & Bead Hall', tier: 'shop', era: 6, w: 2, h: 2, cost: 1060, upkeep: 0.84,
    icon: '\u{1F48E}', color: '#a8452c', workers: 3, needsRoad: true, needsWater: true,
    sells: 'beads', sellRate: 0.80, sellPrice: 33.81, custRadius: 7, custMin: 10,
    desc: 'A hall with a standing stock and a weighman at the door: 0.80 beads/min at $33.81. Still ' +
      'the richest counter in the era, now moving twice as much.',
  },

  grainarcade: {
    name: 'Arterial Grain Arcade', tier: 'shop', era: 6, w: 2, h: 2, cost: 840, upkeep: 0.73,
    icon: '\u{1F3EA}', color: '#c07070', workers: 3, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 1.88, sellPrice: 5.72, custRadius: 6, custMin: 6,
    desc: 'A roofed arcade the length of the arterial street rather than a row of barrows: 1.88 ' +
      'flour/min. Bread is still the cheapest thing in the city.',
  },

  bangleexchange: {
    name: 'Bangle Exchange', tier: 'shop', era: 6, w: 2, h: 2, cost: 1060, upkeep: 0.84,
    icon: '\u{1F48D}', color: '#bfb192', workers: 3, needsRoad: true, needsWater: true,
    sells: 'bangles', sellRate: 1.32, sellPrice: 19.50, custRadius: 7, custMin: 8,
    desc: 'Bangles graded by bore and sold by the hundred: 1.32/min. Volume was always this chain\'s ' +
      'argument and now it has twice as much of it.',
  },

  oilwharf: {
    name: 'Oil Jar Wharf', tier: 'shop', era: 6, w: 2, h: 2, cost: 1080, upkeep: 0.98,
    icon: '\u{1FAD9}', color: '#a8912f', workers: 3, needsRoad: true, needsWater: true,
    sells: 'oil', sellRate: 1.58, sellPrice: 16.90, custRadius: 6, custMin: 6,
    desc: 'Sealed jars stacked four deep against a loading quay: 1.58 oil/min. It wants four Til ' +
      'Fields behind it, or two of the banked beds.',
  },

  cratewharf: {
    name: 'Crate & Mat Wharf', tier: 'shop', era: 6, w: 2, h: 2, cost: 800, upkeep: 0.73,
    icon: '\u{1F4E6}', color: '#b59a6b', workers: 3, needsRoad: true, needsWater: true,
    sells: 'baskets', sellRate: 1.58, sellPrice: 11.57, custRadius: 6, custMin: 6,
    desc: 'Crates stamped and stacked on the quay for the river boats: 1.58/min. Still the cheapest ' +
      'chain in the era, still nobody\'s fortune.',
  },

  greatdrain: {
    name: 'Great Corbelled Drain', tier: 'infra', era: 6, w: 1, h: 2, cost: 420, upkeep: 0.29,
    icon: '\u{1F573}\u{FE0F}', color: '#7e94a0', needsRoad: true, drainRadius: 15,
    desc: 'A man-high corbelled sewer with brick manholes and a sump at every junction: it drains 15 ' +
      'tiles instead of 10 — two and a quarter times the ground, which is four or five blocks off one ' +
      'building. Still needs no water and no workers.',
  },

  surveyoffice: {
    name: "Surveyor's Office", tier: 'civic', era: 6, w: 1, h: 1, cost: 1220, upkeep: 0.75,
    icon: '\u{1F4CF}', color: '#b39c72', needsRoad: true,
    blockRadius: 35, blockMaxSide: 12, blockTolerance: 2,
    desc: 'A standing office with a chest of measuring cords, plumb bobs and a bronze level. Blocks ' +
      'within 35 tiles may run to 12 tiles a side and leave TWO interior tiles unbuilt. A 12x12 builds ' +
      'on 85.2% of its ground — the best geometry available in the era.',
  },

  sealedjarvault: {
    name: 'Sealed Jar Vault', tier: 'infra', era: 6, w: 1, h: 1, cost: 270, upkeep: 0.10,
    icon: '\u{1F3FA}', color: '#c2a06b', storeGrain: 57, storeFlour: 33,
    desc: 'Pitch-sealed jars in a brick-lined cellar, each one stamped: +57 barley and +33 flour. ' +
      'Still no workers, still no road.',
  },

  sealingrooms: {
    name: 'The Sealing Rooms', tier: 'infra', era: 6, w: 2, h: 2, cost: 690, upkeep: 0.49,
    icon: '\u{1F4D2}', color: '#9c8460', workers: 3, needsRoad: true, depot: true, storeCraft: 38,
    desc: 'Racks, sealed bales and a clerk who knows what is in each one: +38 capacity for every craft ' +
      'good, and still a supply point.',
  },

  cartyard: {
    name: 'Bullock-Cart Yard', tier: 'infra', era: 6, w: 1, h: 2, cost: 690, upkeep: 0.62,
    icon: '\u{1F69A}', color: '#96794f', workers: 2, needsRoad: true, depot: true, storeCraft: 26,
    desc: 'A walled yard with a repair shed, a spare axle rack and a night watchman: still a SUPPLY ' +
      'POINT, and now +26 capacity for every craft good as well. The frontier stops being a place you ' +
      'have to come home from every trip.',
  },

  bathinghall: {
    name: 'Great Bathing Court', tier: 'civic', era: 6, w: 1, h: 1, cost: 320, upkeep: 0.20,
    icon: '\u{1F6C1}', color: '#93aeb8', amenityRadius: 13,
    desc: 'A colonnaded court with a sunk floor, a drain of its own and hot water carried in: homes ' +
      'within 13 tiles can climb their rungs.',
  },

  weightsoffice: {
    name: 'Office of Weights & Measures', tier: 'civic', era: 6, w: 2, h: 3, cost: 1740, upkeep: 1.32,
    icon: '\u{2696}\u{FE0F}', color: '#d1bd76', workers: 5, needsRoad: true, needsWater: true,
    weighRadius: 17,
    desc: 'The full binary series in chert, checked against a master set and stamped: every shop within ' +
      '17 tiles sells higher. The weights really were this consistent across a thousand miles, which is ' +
      'the part nobody can explain.',
  },

  sealarchive: {
    name: 'Seal Archive', tier: 'civic', era: 6, w: 1, h: 2, cost: 690, upkeep: 0.36,
    icon: '\u{1F5C3}\u{FE0F}', color: '#c2ae7e', workers: 1, needsRoad: true,
    keepsTally: true, storeCraft: 26,
    desc: 'Every seal impression kept, filed and cross-checked — the closest thing this civilisation ' +
      'has to a state archive. Still +10% throughput within 20 tiles, and now +26 craft capacity, ' +
      'because a sealed bale is a bale somebody is answerable for.',
  },

  twinpodium: {
    name: 'Twin-Podium Granary', tier: 'civic', era: 6, w: 4, h: 4, cost: 3150, upkeep: 1.03,
    icon: '\u{1F3DB}\u{FE0F}', color: '#d1b077', workers: 7, needsRoad: true, needsWater: true,
    depot: true, storeGrain: 542, storeFlour: 339,
    desc: 'A second ventilated podium raised alongside the first and joined by a covered ramp: 542 ' +
      'barley and 339 flour under seal, and the dole never runs dry mid-famine.',
  },

  inundationcut: {
    name: 'Inundation Cut', tier: 'infra', era: 6, w: 1, h: 1, cost: 320, upkeep: 0.20,
    icon: '\u{1F30A}', color: '#7d8f76', soilRadius: 9,
    desc: 'A gated cut with a sluice, so the flood can be let onto tired ground on purpose and let off ' +
      'again before it drowns the seed: land within 9 tiles recovers three times as fast.',
  },

  zebuspan: {
    name: 'Great Zebu Span', tier: 'food', era: 6, w: 2, h: 4, cost: 1410, upkeep: 0.90,
    icon: '\u{1F404}', color: '#8a6f4e', workers: 3, needsWater: true,
    oxTeam: true, oxRadius: 20, oxFodder: 0.60, oxBonus: 0.20,
    desc: 'Four spans working in rotation with a proper byre, a fodder store and a man who does ' +
      'nothing but the yokes: plows every ploughed field within 20 tiles to +20%, and eats 0.6 ' +
      'barley/min doing it.',
  },

  brickcauseway: {
    name: 'Brick Causeway', tier: 'infra', era: 6, w: 1, h: 1, cost: 420, upkeep: 0.13,
    icon: '\u{1F309}', color: '#8a5c3e', onWater: true, bridge: true, depot: true,
    desc: 'A built causeway on brick piers rather than a raft that has to be re-moored every flood: it ' +
      'carries the road across AND counts as a SUPPLY POINT, so the far bank stops paying the carting ' +
      'premium the moment the crossing is finished.',
  },

  springhouse: {
    name: 'Spring House', tier: 'infra', era: 7, w: 1, h: 1, cost: 130, upkeep: 0.23,
    icon: '\u{26F2}', color: '#7fb9c4', waterRadius: 7,
    desc: 'A vaulted chamber built over a karst spring, with a settling basin and a lion-head spout. ' +
      'Waters 7 tiles. ★ THE SEA WATERS NOTHING. This island is ringed with water and none of it is ' +
      'drinkable — coverage is stamped by a building, never by the ground, so a workshop on the ' +
      'tideline still needs one of these.',
  },

  conduithouse: {
    name: 'The Conduit House', tier: 'infra', era: 7, w: 1, h: 1, cost: 430, upkeep: 0.36,
    icon: '\u{1F6B0}', color: '#6fa8c4', waterRadius: 10,
    desc: 'Tapered terracotta pipe, each section socketed into the next so the flow scours its own ' +
      'silt out instead of settling it. Waters 10 tiles — the plumbing that is genuinely the best in ' +
      'the world for the next fifteen hundred years.',
  },

  stonemole: {
    name: 'Stone Mole', tier: 'infra', era: 7, w: 1, h: 1, cost: 260, upkeep: 0.11,
    icon: '\u{1F6E4}\u{FE0F}', color: '#9a9384', onWater: true, bridge: true,
    desc: 'Rubble and dressed blocks tipped into the shallows until there is a road where there was a ' +
      'bay. Carries the road over water — lay a line of them headland to headland.',
  },

  pithosrow: {
    name: 'Sunken Pithos Row', tier: 'infra', era: 7, w: 1, h: 1, cost: 170, upkeep: 0.09,
    icon: '\u{1F3FA}', color: '#b08a5a', storeGrain: 49, storeFlour: 29,
    desc: 'Storage jars taller than a man, sunk to the shoulder in a cut floor and roped at the belly. ' +
      '+49 emmer and +29 meal, NO workers and no road — the famine buffer that does not eat.',
  },

  stirrupstore: {
    name: 'Stirrup-Jar Store', tier: 'infra', era: 7, w: 2, h: 2, cost: 430, upkeep: 0.45,
    icon: '\u{1F4E6}', color: '#a88f68', workers: 2, needsRoad: true, depot: true, storeCraft: 30,
    desc: 'Racks of coarse stirrup jars, each painted with what is in it and whose it is. +30 capacity ' +
      'for EVERY craft good while staffed, and it counts as a SUPPLY POINT for carting.',
  },

  mulepost: {
    name: 'Mule Train Post', tier: 'infra', era: 7, w: 1, h: 2, cost: 430, upkeep: 0.56,
    icon: '\u{1F40E}', color: '#a58c62', workers: 1, needsRoad: true, depot: true,
    desc: 'Pack mules and a tally board, stationed where the terrace road turns inland. Counts as a ' +
      'SUPPLY POINT — one post up on the spine erases the carting premium that makes the Copper Adit ' +
      'look unaffordable from down at the bay.',
  },

  amurcapits: {
    name: 'The Amurca Pits', tier: 'infra', era: 7, w: 1, h: 1, cost: 190, upkeep: 0.18,
    icon: '\u{1FAD9}', color: '#8f8354', soilRadius: 7,
    desc: 'Sunk jars of the black lees drawn off under the pressed oil, carried out and poured along ' +
      'the terrace risers. Land within 7 tiles recovers from salt 3× faster. NO workers and no road. ' +
      '★ Pair it with a spell of fallow — the emmer will exhaust one plot if you crop it forever.',
  },

  emmerplot: {
    name: 'Emmer Plot', tier: 'food', era: 7, w: 2, h: 2, cost: 210, upkeep: 0.34,
    icon: '\u{1F33E}', color: '#c8b45c', workers: 2, needsWater: true,
    out: { grain: 1.95 },
    desc: 'Hulled emmer on terra rossa, sown between the olive rows. 1.95/min, +50% on FERTILE soil. ' +
      'On the ledger like everything else that grows — if the palace cannot issue to it, it stops.',
  },

  palacemill: {
    name: 'Palace Mill', tier: 'food', era: 7, w: 2, h: 2, cost: 540, upkeep: 0.56,
    icon: '\u{2699}\u{FE0F}', color: '#b9a373', workers: 3, needsWater: true, industry: true,
    procIn: 'grain', procOut: 'flour', procRate: 4.55, procRatio: 0.6,
    desc: 'Saddle querns in a colonnade off the west court, and a tablet recording every woman at ' +
      'them by name. 4.55 emmer/min into 2.73 meal.',
  },

  ovencourt: {
    name: 'Oven Court', tier: 'food', era: 7, w: 2, h: 2, cost: 170, upkeep: 0.11,
    icon: '\u{1F35E}', color: '#c6a06a', selfRun: true, ovenRadius: 8,
    desc: 'A domed clay oven in a shared yard. Every home within 8 tiles eats 15% less, because bread ' +
      'baked together goes further than bread baked eight times over. No workers.',
  },

  figorchard: {
    name: 'Fig Orchard', tier: 'food', era: 7, w: 3, h: 3, cost: 540, upkeep: 0.45,
    icon: '\u{1FAD2}', color: '#7f9c5a', workers: 3, offLedger: true, saltProof: true,
    out: { dates: 2.92 },
    desc: 'Figs on the terrace risers, where the soil is a hand deep and nothing else will hold. ' +
      '2.92/min, +50% on ruined ground. ★ NEEDS NO WATER, NO ROAD AND NO PALACE — the one food that ' +
      'is never on the roll, and the reason a city that has lost its issue can climb back.',
  },

  seinenet: {
    name: 'Seine Net Station', tier: 'food', era: 7, w: 1, h: 3, cost: 340, upkeep: 0.34,
    icon: '\u{1F41F}', color: '#6f93a8', workers: 2, onWater: true, offLedger: true,
    out: { fish: 2.34 },
    desc: 'A long net walked out from the beach by two crews and closed on the shoal. 2.34/min. ' +
      '★ ALSO OFF THE ROLL: fish landed on the sand were never issued from a magazine, and a second ' +
      'food outside the mechanic is what makes a bad minute a squeeze instead of a guillotine.',
  },

  oliveterrace: {
    name: 'Olive Terrace', tier: 'food', era: 7, w: 2, h: 2, cost: 240, upkeep: 0.27,
    icon: '\u{1FAD2}', color: '#8d9c6a', workers: 2, dryLand: true, offLedger: true,
    out: { olives: 2.28 },
    desc: 'Grafted olives on dry-stone risers up the limestone slope, beaten onto cloths in autumn. ' +
      '2.28/min, +50% on dry ground. ★ OFF THE ROLL — the palace does not issue to its own groves, ' +
      'and this is where the oil the roll is priced in comes from.',
  },

  pressroom: {
    name: 'The Press Room', tier: 'food', era: 7, w: 2, h: 2, cost: 600, upkeep: 0.63,
    icon: '\u{1FAD2}', color: '#a89a5e', workers: 3, industry: true, offLedger: true,
    procIn: 'olives', procOut: 'oil', procRate: 3.03, procRatio: 0.5,
    desc: 'A stone beam weighted with rubble, bearing down on stacked mats of crushed olives; the ' +
      'must runs to a sunk vat and the oil is skimmed off the top. 3.03 olives/min into 1.52 oil. ' +
      '★ ONE PRESS CARRIES FIFTEEN NAMES ON THE ROLL — that is the rule this age turns on.',
  },

  perfumery: {
    name: 'Perfumery', tier: 'food', era: 7, w: 2, h: 2, cost: 640, upkeep: 0.68,
    icon: '\u{1F9F4}', color: '#c9a6b8', workers: 3, industry: true, needsWater: true,
    procIn: 'oil', procOut: 'unguent', procRate: 2.43, procRatio: 0.5,
    desc: 'Oil steeped with coriander, cyperus and rose, boiled down and decanted into false-necked ' +
      'jars. 2.43 oil/min into 1.22 unguent at $19.28 — the dearest thing the island ships, and it ' +
      'competes for the same oil the roll is paid in.',
  },

  crocusmeadow: {
    name: 'Crocus Meadow', tier: 'food', era: 7, w: 2, h: 2, cost: 210, upkeep: 0.23,
    icon: '\u{1F337}', color: '#b48ac0', workers: 2, onSalt: true,
    out: { saffron: 1.82 },
    desc: 'Crocus sativus on the tephra upland, and three stigmas picked from each flower by hand at ' +
      'dawn. 1.82/min, +50% on the ash. A raw the island never processes — the Saffron Gatherers of ' +
      'the Thera fresco are picking exactly this and handing it straight to a seated woman.',
  },

  hillpasture: {
    name: 'Hill Pasture', tier: 'food', era: 7, w: 2, h: 2, cost: 280, upkeep: 0.34,
    icon: '\u{1F411}', color: '#b6ae94', workers: 2, dryLand: true,
    out: { wool: 1.52 },
    desc: 'Flocks walked up to the summer grazing and back down in autumn. 1.52 fleece/min, +50% on ' +
      'dry ground. The Knossos tablets count around a hundred thousand sheep; this is one flock of them.',
  },

  spinningshed: {
    name: 'Spinning Shed', tier: 'food', era: 7, w: 2, h: 2, cost: 640, upkeep: 0.68,
    icon: '\u{1F9F5}', color: '#a8998a', workers: 3, industry: true,
    procIn: 'wool', procOut: 'cloth', procRate: 2.43, procRatio: 0.5,
    desc: 'Warp-weighted looms in a long room, wool issued to each weaver by weight and the finished ' +
      'bolt weighed back in. 2.43 fleece/min into 1.22 cloth.',
  },

  purplevat: {
    name: 'Purple Vat', tier: 'food', era: 7, w: 2, h: 2, cost: 690, upkeep: 0.79,
    icon: '\u{1FAD9}', color: '#7a4f7d', workers: 3, industry: true, nearWater: 2,
    procIn: 'cloth', procOut: 'purplecloth', procRate: 2.43, procRatio: 0.5,
    desc: 'Crushed murex left to rot in lead-lined vats until the liquor turns; cloth steeped twice ' +
      'comes out the colour of clotted blood. 2.43 cloth/min into 1.22 purple at $38.55. Ten thousand ' +
      'shells to the gram, and the smell is why it is down on the shore.',
  },

  copperadit: {
    name: 'Copper Adit', tier: 'food', era: 7, w: 2, h: 2, cost: 990, upkeep: 1.01,
    icon: '\u{26CF}\u{FE0F}', color: '#9c7a52', workers: 3, onRock: true, rockRadius: 6,
    quarried: true, out: { copper: 1.37 },
    desc: 'A gallery driven into the malachite banding on the spine, worked with fire and stone mauls. ' +
      '1.37/min. ★ IT EATS THE OUTCROP — the ledger is finite, it does not come back, and a worked-out ' +
      'adit says so instead of reading "ok".',
  },

  tinlanding: {
    name: 'Tin Landing', tier: 'food', era: 7, w: 2, h: 3, cost: 430, upkeep: 0.45,
    icon: '\u{2693}', color: '#8a9099', workers: 2, onWater: true,
    out: { tin: 1.67 },
    desc: 'A beach where ingots come ashore off somebody else\'s ship. 1.67/min. ★ THE ISLAND HAS NO ' +
      'TIN. Every gram of it crossed four thousand kilometres from Central Asia to get here, which is ' +
      'the whole reason a Bronze Age is a TRADING age — and why this must sit on open water.',
  },

  bronzefoundry: {
    name: 'Bronze Foundry', tier: 'food', era: 7, w: 2, h: 2, cost: 730, upkeep: 0.77,
    icon: '\u{1F525}', color: '#a5713f', workers: 3, industry: true,
    procIn: 'copper', procOut: 'bronze', procRate: 3.03, procRatio: 0.5,
    desc: 'Crucibles, a stone mould and a pair of skin bellows worked by boys. 3.03 copper/min into ' +
      '1.52 bronze at $7.89 — worth more than the metal that went into it, which is the only reason ' +
      'anybody bothered.',
  },

  claybank: {
    name: 'Clay Bank', tier: 'food', era: 7, w: 2, h: 2, cost: 240, upkeep: 0.34,
    icon: '\u{1F9F1}', color: '#a9744f', workers: 2, nearWater: 3,
    out: { clay: 2.43 },
    desc: 'Clay cut out of a stream bank and left to weather over winter. 2.43/min, +50% within 3 ' +
      'tiles of water.',
  },

  wheelshop: {
    name: 'Wheel Workshop', tier: 'food', era: 7, w: 2, h: 2, cost: 560, upkeep: 0.63,
    icon: '\u{1FAD6}', color: '#c08a5a', workers: 3, industry: true,
    procIn: 'clay', procOut: 'pottery', procRate: 3.03, procRatio: 0.5,
    desc: 'The fast wheel, a kiln with a proper firebox, and a shape repeated until the potter can ' +
      'throw it without looking. 3.03 clay/min into 1.52 finished ware.',
  },

  gypsumcutter: {
    name: 'Gypsum Cutter', tier: 'food', era: 7, w: 2, h: 2, cost: 640, upkeep: 0.68,
    icon: '\u{1FAA8}', color: '#cfc9bd', workers: 3, onRock: true, rockRadius: 6,
    quarried: true, out: { stone: 2.02 },
    desc: 'Gypsum sawn out of the scarp in slabs, soft enough to cut with a toothless copper blade and ' +
      'wet sand. 2.02/min. ★ THIS IS THE BUILDING THE AGE CANNOT BE LEFT WITHOUT — the next rung is ' +
      'the first on the whole ladder to ask for stone. It eats the scarp, and the scarp is finite.',
  },

  ashlaryard: {
    name: 'Ashlar Yard', tier: 'food', era: 7, w: 2, h: 2, cost: 820, upkeep: 0.86,
    icon: '\u{1F9F1}', color: '#c4bda8', workers: 3, industry: true,
    procIn: 'stone', procOut: 'blocks', procRate: 3.03, procRatio: 0.5,
    desc: 'Slabs squared to a mason\'s mark and stacked by course. 3.03 stone/min into 1.52 dressed ' +
      'blocks. ★ Squaring stone does not un-quarry it: the exit gate counts what came OUT of the ' +
      'scarp, so working it up here costs the gate nothing.',
  },

  villamagazine: {
    name: 'Villa Magazine', tier: 'commerce', era: 7, w: 2, h: 2, cost: 410, upkeep: 0.45,
    icon: '\u{1F3E1}', color: '#b9a67e', workers: 2, needsRoad: true, depot: true,
    offLedger: true, magazineRadius: 7,
    sellsRaw: ['unguent', 'purplecloth', 'bronze', 'saffron', 'pottery', 'oil', 'tin', 'blocks'],
    sellRate: 0.91, custRadius: 7, custMin: 7,
    desc: 'A country house with a storeroom, a seal and somebody who can write. Administers 7 tiles ' +
      'and ships 0.91 units/min. ★ THE FIRST ONE YOU BUILD — the palace itself comes later, and ' +
      'nothing inside a disc runs until something is administering it.',
  },

  outmagazine: {
    name: 'Outlying Magazine', tier: 'commerce', era: 7, w: 3, h: 3, cost: 690, upkeep: 0.72,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c2b183', workers: 4, needsRoad: true, depot: true,
    offLedger: true, magazineRadius: 10,
    sellsRaw: ['unguent', 'purplecloth', 'bronze', 'saffron', 'pottery', 'oil', 'tin', 'blocks'],
    sellRate: 1.82, custRadius: 10, custMin: 10,
    desc: 'A walled block of long rooms out at the edge of the estate, with its own scribe. ' +
      'Administers 10 tiles and ships 1.82/min. Chain these outward — each one brings a quarter onto ' +
      'the roll, and the roll is only as long as the oil pays for.',
  },

  palacemagazine: {
    name: 'Palace Magazine', tier: 'commerce', era: 7, w: 4, h: 4, cost: 1330, upkeep: 1.40,
    icon: '\u{1F3DB}\u{FE0F}', color: '#d6c48f', workers: 7, needsRoad: true, depot: true,
    offLedger: true, magazineRadius: 14,
    sellsRaw: ['unguent', 'purplecloth', 'bronze', 'saffron', 'pottery', 'oil', 'tin', 'blocks'],
    sellRate: 3.64, custRadius: 14, custMin: 14,
    desc: 'The west wing: eighteen parallel magazines, four hundred pithoi, and a clay tablet for ' +
      'every jar. Administers 14 tiles and ships 3.64/min. ★ SEVEN WORKERS, AND THEY STAFF BEFORE ' +
      'EVERY FIELD IN THE CITY — a magazine with nobody in it stamps no disc at all.',
  },

  tabletarchive: {
    name: 'Tablet Archive', tier: 'civic', era: 7, w: 2, h: 2, cost: 430, upkeep: 0.27,
    icon: '\u{1F4DC}', color: '#c3b58e', selfRun: true, keepsTally: true, scribeRadius: 20,
    desc: 'Unfired clay tablets in baskets, filed by the month. Every magazine within 20 tiles ships ' +
      'faster for being counted. ★ These survived only because the palace burned — a fired tablet is ' +
      'a permanent tablet, and that is why the age can be read at all.',
  },

  sealoffice: {
    name: 'Sealstone Office', tier: 'civic', era: 7, w: 2, h: 3, cost: 560, upkeep: 0.36,
    icon: '\u{1F48D}', color: '#b8a9c9', workers: 1, weighRadius: 10,
    desc: 'Engraved sealstones and a set of balance weights. Everything shipped within 10 tiles fetches ' +
      'a better price, because a sealed consignment is a consignment nobody has been into.',
  },

  theatralcourt: {
    name: 'Theatral Court', tier: 'civic', era: 7, w: 2, h: 2, cost: 170, upkeep: 0.11,
    icon: '\u{1F3AD}', color: '#cfc3a4', selfRun: true, capRadius: 22, amenityRadius: 11,
    desc: 'Shallow stone steps on two sides of a paved rectangle, facing nothing in particular. ' +
      'Homes within 22 tiles hold more. Nobody knows what happened here and that is most of its charm.',
  },

  ashlarhouse: {
    name: 'Ashlar House', tier: 'housing', era: 7, w: 1, h: 1, cost: 260, upkeep: 0.11,
    icon: '\u{1F3E0}', color: '#c9bda2', cap: 5, needsRoad: true, needsWater: true,
    desc: 'Squared blocks at the corners, rubble and timber between, a flat roof used as a room. ' +
      'Homes 5 at its second rung — it opens at half that.',
  },

  townhouse: {
    name: 'Town House', tier: 'housing', era: 7, w: 2, h: 2, cost: 640, upkeep: 0.25,
    icon: '\u{1F3D8}\u{FE0F}', color: '#d3c7a8', cap: 9, needsRoad: true, needsWater: true,
    needsIssueGround: true,
    levels: ['Room Block', 'Town House', 'Pillared House', 'House of the Frescoes', 'Little Palace'],
    desc: 'Two storeys round a light well, with a stair, a drain and painted plaster. Homes 9 at its ' +
      'second rung. ★ CAN ONLY BE BUILT INSIDE A MAGAZINE\'S DISC — a town house is a house in the ' +
      'administered quarter, and that is the only thing that makes it a town.',
  },

  horns: {
    name: 'Horns of Consecration', tier: 'beauty', era: 7, w: 1, h: 1, cost: 130, upkeep: 0.07,
    icon: '\u{1F402}', color: '#ddd2b4', amenityRadius: 7,
    desc: 'A pair of stylised bull\'s horns cut from soft stone and set on a parapet. Every roofline ' +
      'in the city carries them. ★ No shrine has been identified inside the palaces — what there is ' +
      'is this shape, on everything, and a bench in a small room.',
  },

  temenosfield: {
    name: 'Temenos Field', tier: 'food', era: 7, w: 2, h: 2, cost: 500, upkeep: 0.48,
    icon: '\u{1F33E}', color: '#d4bf63', workers: 3, needsWater: true,
    out: { grain: 3.90 },
    desc: 'The sanctuary\'s own plot, ploughed first and reaped first: 3.90 emmer/min. The tablets ' +
      'record land held "of the god" beside land held of the people, and this is that land.',
  },

  vinefiggarden: {
    name: 'Vine and Fig Garden', tier: 'food', era: 7, w: 3, h: 3, cost: 1300, upkeep: 0.63,
    icon: '\u{1FAD2}', color: '#8fae5f', workers: 4, offLedger: true, saltProof: true,
    out: { dates: 5.84 },
    desc: 'Figs under-planted with vines and a low wall against the goats: 5.84/min, +50% on ruined ' +
      'ground. ★ STILL OFF THE ROLL, still no water and still no road — the improvement must not ' +
      'acquire a predicate the original deliberately lacks.',
  },

  tunnywatch: {
    name: 'Tunny Watch', tier: 'food', era: 7, w: 1, h: 3, cost: 820, upkeep: 0.48,
    icon: '\u{1F41F}', color: '#7fa5bc', workers: 3, onWater: true, offLedger: true,
    out: { fish: 4.68 },
    desc: 'A lookout on the headland who signals the shoal down to the boats: 4.68/min. ★ Still off ' +
      'the roll — the second food outside the mechanic stays outside it.',
  },

  graftedgrove: {
    name: 'Grafted Grove', tier: 'food', era: 7, w: 2, h: 2, cost: 580, upkeep: 0.38,
    icon: '\u{1FAD2}', color: '#9aab72', workers: 3, dryLand: true, offLedger: true,
    out: { olives: 4.56 },
    desc: 'Cuttings of a heavy-bearing tree grafted onto wild rootstock, which is the single most ' +
      'valuable thing anyone learned to do with an olive: 4.56/min. ★ ONE GROVE AND ONE PRESS NOW ' +
      'CARRY THIRTY NAMES — this is how the roll grows.',
  },

  pickingfloors: {
    name: 'The Picking Floors', tier: 'food', era: 7, w: 2, h: 2, cost: 500, upkeep: 0.32,
    icon: '\u{1F337}', color: '#c49ad0', workers: 3, onSalt: true,
    out: { saffron: 3.64 },
    desc: 'Shaded trestles where the stigmas are drawn and dried the same morning they are picked: ' +
      '3.64/min, +50% on the ash. Dried within hours or the colour is gone.',
  },

  transhumancerun: {
    name: 'Transhumance Run', tier: 'food', era: 7, w: 2, h: 2, cost: 670, upkeep: 0.48,
    icon: '\u{1F411}', color: '#c4bc9e', workers: 3, dryLand: true,
    out: { wool: 3.04 },
    desc: 'A driving lane, watering points and a summer fold up on the spine: 3.04 fleece/min, +50% ' +
      'on dry ground. The flock is worked as one animal across a whole mountain.',
  },

  deepgallery: {
    name: 'Deep Gallery', tier: 'food', era: 7, w: 2, h: 2, cost: 2380, upkeep: 1.41,
    icon: '\u{26CF}\u{FE0F}', color: '#8a6a44', workers: 4, onRock: true, rockRadius: 8,
    quarried: true, out: { copper: 2.74 },
    desc: 'Timbered galleries following the ore down, with ventilation shafts and a hoist: 2.74/min ' +
      'and eight tiles of reach. ★ It still eats the outcrop, only faster.',
  },

  merchantquay: {
    name: 'Merchantman Quay', tier: 'food', era: 7, w: 2, h: 3, cost: 1030, upkeep: 0.63,
    icon: '\u{2693}', color: '#7d858f', workers: 3, onWater: true,
    out: { tin: 3.34 },
    desc: 'A dressed-stone quay a deep-hulled ship can lie against instead of beaching: 3.34/min. ' +
      'The Uluburun ship carried ten tonnes of copper and a tonne of tin, and it wanted somewhere ' +
      'like this to put it.',
  },

  levigationpits: {
    name: 'Levigation Pits', tier: 'food', era: 7, w: 2, h: 2, cost: 580, upkeep: 0.48,
    icon: '\u{1F9F1}', color: '#b58058', workers: 3, nearWater: 3,
    out: { clay: 4.86 },
    desc: 'The clay slurried and run through three settling tanks so only the finest fraction is ' +
      'kept: 4.86/min, +50% within 3 tiles of water. This is what makes eggshell ware possible.',
  },

  sawpit: {
    name: 'The Saw-Pit', tier: 'food', era: 7, w: 2, h: 2, cost: 1540, upkeep: 0.95,
    icon: '\u{1FAA8}', color: '#dad5c9', workers: 4, onRock: true, rockRadius: 8,
    quarried: true, out: { stone: 4.04 },
    desc: 'A two-man saw over a pit, wet sand under the blade, and slabs coming out true enough to ' +
      'lay without mortar: 4.04/min and eight tiles of scarp in reach. ★ Twice the stone toward the ' +
      'one gate this age has that no city below it ever had to fill.',
  },

  querncolonnade: {
    name: 'Quern Colonnade', tier: 'food', era: 7, w: 2, h: 2, cost: 890, upkeep: 0.78,
    icon: '\u{2699}\u{FE0F}', color: '#c8b381', workers: 4, needsWater: true, industry: true,
    procIn: 'grain', procOut: 'flour', procRate: 6.37, procRatio: 0.6,
    desc: 'A roofed run of thirty querns with the meal swept to a common bin: 6.37 emmer/min into ' +
      '3.82 meal.',
  },

  windlasshouse: {
    name: 'The Windlass House', tier: 'food', era: 7, w: 2, h: 2, cost: 990, upkeep: 0.88,
    icon: '\u{1FAD2}', color: '#b8a968', workers: 4, industry: true, offLedger: true,
    procIn: 'olives', procOut: 'oil', procRate: 4.24, procRatio: 0.5,
    desc: 'A windlass and rope taking the beam down instead of a heap of rubble, so the pressing is ' +
      'controlled and the second pressing is worth having: 4.24 olives/min into 2.12 oil. ★ ONE OF ' +
      'THESE CARRIES TWENTY-ONE NAMES. Still off the roll — it is the roll\'s own source.',
  },

  unguentboilery: {
    name: 'Unguent Boilery', tier: 'food', era: 7, w: 2, h: 2, cost: 1060, upkeep: 0.95,
    icon: '\u{1F9F4}', color: '#d5b4c4', workers: 4, industry: true, needsWater: true,
    procIn: 'oil', procOut: 'unguent', procRate: 3.40, procRatio: 0.5,
    desc: 'Copper cauldrons over a controlled fire, the oil held just under a simmer for a day: ' +
      '3.40 oil/min into 1.70 unguent. The Pylos tablets name the boiler, the recipe and the god ' +
      'it went to.',
  },

  weavinghall: {
    name: 'Weaving Hall', tier: 'food', era: 7, w: 2, h: 2, cost: 1060, upkeep: 0.95,
    icon: '\u{1F9F5}', color: '#b6a798', workers: 4, industry: true,
    procIn: 'wool', procOut: 'cloth', procRate: 3.40, procRatio: 0.5,
    desc: 'Forty looms under one roof and a supervisor with a tablet: 3.40 fleece/min into 1.70 ' +
      'cloth. The word for the allocation is ta-ra-si-ja and it is on hundreds of tablets.',
  },

  dyerstanks: {
    name: 'Dyer\'s Tanks', tier: 'food', era: 7, w: 2, h: 2, cost: 1140, upkeep: 1.10,
    icon: '\u{1FAD9}', color: '#8b5b8e', workers: 4, industry: true, nearWater: 2,
    procIn: 'cloth', procOut: 'purplecloth', procRate: 3.40, procRatio: 0.5,
    desc: 'Rock-cut tanks stepped down to the tideline so the liquor can be drawn off clean and the ' +
      'shell waste flushed: 3.40 cloth/min into 1.70 purple. The waste heaps outnumber everything ' +
      'else on the site.',
  },

  smithscourt: {
    name: 'Smiths\' Court', tier: 'food', era: 7, w: 2, h: 2, cost: 1200, upkeep: 1.08,
    icon: '\u{1F525}', color: '#b57f47', workers: 4, industry: true,
    procIn: 'copper', procOut: 'bronze', procRate: 4.24, procRatio: 0.5,
    desc: 'A yard of hearths worked by named smiths, each issued his bronze by weight and answering ' +
      'for it: 4.24 copper/min into 2.12 bronze.',
  },

  pottersquarter: {
    name: 'Potters\' Quarter', tier: 'food', era: 7, w: 2, h: 2, cost: 920, upkeep: 0.88,
    icon: '\u{1FAD6}', color: '#cf9865', workers: 4, industry: true,
    procIn: 'clay', procOut: 'pottery', procRate: 4.24, procRatio: 0.5,
    desc: 'A street of wheels, a shared updraught kiln and a painter who does nothing else: 4.24 ' +
      'clay/min into 2.12 ware.',
  },

  masonslodge: {
    name: 'Masons\' Lodge', tier: 'food', era: 7, w: 2, h: 2, cost: 1350, upkeep: 1.20,
    icon: '\u{1F9F1}', color: '#d0c9b4', workers: 4, industry: true,
    procIn: 'stone', procOut: 'blocks', procRate: 4.24, procRatio: 0.5,
    desc: 'Templates, a set square and a mason\'s mark cut into every finished course: 4.24 stone/min ' +
      'into 2.12 blocks.',
  },

  sealedcellar: {
    name: 'Sealed Cellar', tier: 'commerce', era: 7, w: 2, h: 2, cost: 820, upkeep: 0.63,
    icon: '\u{1F3E1}', color: '#c6b189', workers: 3, needsRoad: true, depot: true,
    offLedger: true, magazineRadius: 9,
    sellsRaw: ['unguent', 'purplecloth', 'bronze', 'saffron', 'pottery', 'oil', 'tin', 'blocks'],
    sellRate: 1.82, custRadius: 9, custMin: 7,
    desc: 'A cellar with a door that is corded and sealed with a stamped clay nodule, so it is ' +
      'obvious whether it has been opened. Administers 9 tiles and ships 1.82/min.',
  },

  chariotdepot: {
    name: 'Chariot Depot', tier: 'commerce', era: 7, w: 3, h: 3, cost: 1380, upkeep: 1.01,
    icon: '\u{1F3DB}\u{FE0F}', color: '#cdbb8b', workers: 5, needsRoad: true, depot: true,
    offLedger: true, magazineRadius: 13,
    sellsRaw: ['unguent', 'purplecloth', 'bronze', 'saffron', 'pottery', 'oil', 'tin', 'blocks'],
    sellRate: 3.64, custRadius: 13, custMin: 10,
    desc: 'Chariot bodies on trestles, wheels stacked separately, and a tablet listing every one as ' +
      'assembled or as awaiting a part. Administers 13 tiles and ships 3.64/min — the tablets really ' +
      'do inventory them wheel by wheel.',
  },

  sealingwing: {
    name: 'The Sealing Wing', tier: 'commerce', era: 7, w: 4, h: 4, cost: 2660, upkeep: 1.96,
    icon: '\u{1F3DB}\u{FE0F}', color: '#e0cf99', workers: 9, needsRoad: true, depot: true,
    offLedger: true, magazineRadius: 18,
    sellsRaw: ['unguent', 'purplecloth', 'bronze', 'saffron', 'pottery', 'oil', 'tin', 'blocks'],
    sellRate: 7.28, custRadius: 18, custMin: 14,
    desc: 'The whole west range given over to sealing, weighing and recording, with a room that does ' +
      'nothing but store the nodules. Administers 18 tiles and ships 7.28/min.',
  },

  harbourarm: {
    name: 'Harbour Arm', tier: 'infra', era: 7, w: 1, h: 1, cost: 550, upkeep: 0.16,
    icon: '\u{1F6E4}\u{FE0F}', color: '#aaa294', onWater: true, bridge: true, depot: true,
    desc: 'The mole carried out and returned, so there is water behind it a ship can lie in. Carries ' +
      'the road AND counts as a SUPPLY POINT — the far headland stops paying the carting premium the ' +
      'moment the arm closes.',
  },

  capstonevault: {
    name: 'The Capstone Vault', tier: 'infra', era: 7, w: 1, h: 1, cost: 360, upkeep: 0.13,
    icon: '\u{1F3FA}', color: '#bd9865', storeGrain: 71, storeFlour: 42,
    desc: 'The jar pit roofed with a corbelled slab and floored with pebbles so the damp cannot reach ' +
      'the grain. +71 emmer and +42 meal, still no workers and no road.',
  },

  cordedracks: {
    name: 'The Corded Racks', tier: 'infra', era: 7, w: 2, h: 2, cost: 900, upkeep: 0.65,
    icon: '\u{1F4E6}', color: '#b39a72', workers: 3, needsRoad: true, depot: true, storeCraft: 44,
    desc: 'Every rack corded and sealed, and a nodule filed for each. +44 capacity for EVERY craft ' +
      'good while staffed, and still a SUPPLY POINT.',
  },

  caravanyard: {
    name: 'Caravan Yard', tier: 'infra', era: 7, w: 1, h: 2, cost: 900, upkeep: 0.81,
    icon: '\u{1F42B}', color: '#b09873', workers: 2, needsRoad: true, depot: true,
    desc: 'Standing corrals, fodder and a night watch, so a train can leave at first light instead of ' +
      'being made up first. A stronger SUPPLY POINT: the spine and the bay stop being two economies.',
  },

  foldingground: {
    name: 'The Folding Ground', tier: 'infra', era: 7, w: 1, h: 1, cost: 400, upkeep: 0.26,
    icon: '\u{1F411}', color: '#9a8f5f', soilRadius: 9,
    desc: 'Hurdles moved down the terrace a strip at a time, so the flock beds on the fallow and ' +
      'dungs it where it stands, and the lees go on behind them. Land within 9 tiles recovers three ' +
      'times as fast. Still no workers and no road.',
  },

  bakequarter: {
    name: 'Bake-House Quarter', tier: 'food', era: 7, w: 2, h: 2, cost: 360, upkeep: 0.16,
    icon: '\u{1F35E}', color: '#d1ab73', selfRun: true, ovenRadius: 12,
    desc: 'Four ovens and a fuel store on one yard, fired in rotation so one is always hot. Homes ' +
      'within 12 tiles eat 15% less. No workers.',
  },

  scribalschool: {
    name: 'Scribal School', tier: 'civic', era: 7, w: 2, h: 2, cost: 900, upkeep: 0.39,
    icon: '\u{1F4DC}', color: '#cdbf98', selfRun: true, keepsTally: true, scribeRadius: 29,
    desc: 'Practice tablets, a standard hand and enough scribes that losing one does not lose the ' +
      'accounts. Every magazine within 29 tiles ships faster. ★ Perhaps a hundred people on the ' +
      'island could read this script, and when they died it stayed unread for three thousand years.',
  },

  houseofstandards: {
    name: 'House of Standards', tier: 'civic', era: 7, w: 2, h: 3, cost: 1180, upkeep: 0.52,
    icon: '\u{2696}\u{FE0F}', color: '#c4b3d4', workers: 2, weighRadius: 15,
    desc: 'A master set of weights nobody may take away and a room to check against them. Everything ' +
      'shipped within 15 tiles fetches a better price.',
  },

  grandstaircase: {
    name: 'Grand Staircase', tier: 'civic', era: 7, w: 2, h: 2, cost: 360, upkeep: 0.16,
    icon: '\u{1F3AD}', color: '#dbd0b2', selfRun: true, capRadius: 32, amenityRadius: 16,
    desc: 'A broad stair rising through three storeys around a light well, with a colonnade at every ' +
      'landing. Homes within 32 tiles hold more. It is the single most convincing argument that ' +
      'these buildings were meant to be walked through and looked at.',
  },

  labyrinth: {
    name: 'The Labyrinth', tier: 'monument', era: 7, w: 3, h: 3, cost: 3400, upkeep: 0.90,
    icon: '\u{1F300}', color: '#d8c9a0', unique: true, monument: true, needsWater: true,
    desc: 'Not a maze — a building so large and so many-roomed that walking it feels like one. ' +
      'Twelve hundred rooms on five storeys around a central court, with light wells, stairs that ' +
      'double back, and no defensive wall anywhere. ★ Its own name is a guess: labrys is the double ' +
      'axe, and the mason\'s marks are full of them.',
  },

  cenote: {
    name: 'Cenote Steps', tier: 'infra', era: 14, w: 2, h: 2, cost: 560, upkeep: 0.50,
    icon: '\u{1F573}\u{FE0F}', color: '#4f9ab5', workers: 2, onWater: true,
    out: { water: 1.8 },

    desc: 'Steps cut down through a collapsed cave roof to the water table. 1.8 water/min ' +
      'IN THE WET AND THE DRY ALIKE — the only source on this map that never stops, and nowhere ' +
      'near enough to live on. Must stand IN a cenote pool. There is no second cenote for sale: ' +
      'rank this one.',
  },
  catchment: {
    name: 'Plastered Catchment Court', tier: 'infra', era: 14, w: 4, h: 4, cost: 900, upkeep: 0.40,
    icon: '\u{1F9F4}', color: '#cfd6cd', workers: 1, dryLand: true, wetOnly: true,
    out: { water: 5.5 },
    desc: 'A lime-plastered plaza, sloped and swept, draining into your tank. 5.5 water/min while ' +
      'the rains fall and NOTHING AT ALL in the dry — which is why every Maya plaza was plastered. ' +
      'Build the storage before you build the court.',
  },
  aguada: {
    name: 'Aguada Reservoir', tier: 'infra', era: 14, w: 4, h: 4, cost: 2000, upkeep: 1.00,
    icon: '\u{1F30A}', color: '#3f7f96', workers: 2, wetOnly: true,
    out: { water: 7.0 }, storeWater: 26,
    desc: 'An excavated, clay-lined basin. Catches 7 water/min in the rains and HOLDS 260 — ' +
      'roughly one dry season for a hundred residents. The single most important building in this age.',
  },
  chultun: {
    name: 'Chultun', tier: 'infra', era: 14, w: 1, h: 1, cost: 400, upkeep: 0.12,
    icon: '\u{1FAD9}', color: '#a89880', storeWater: 8,
    desc: 'A bottle-shaped cistern cut into the bedrock under the house floor. +80 water capacity, ' +
      'no workers, no mouths — the tank that does not drink. Three of these are one Aguada for a ' +
      'fraction of the land.',
  },
  aqueduct: {
    name: 'Aqueduct', tier: 'infra', era: 14, w: 1, h: 1, cost: 520, upkeep: 0.44,
    icon: '\u{1F3D7}️', color: '#9db3c9', waterRadius: 11, tankFed: true,
    desc: 'Plastered channel and stone kerb: waters everything within 11 tiles — BUT ONLY WHILE ' +
      'THE CITY\'S TANK HAS WATER IN IT. When the reservoirs run dry every building it serves goes ' +
      'dark at once. This is the only water distributor in the age.',
  },
  sacbe: {
    name: 'Sacbé Causeway', tier: 'infra', era: 14, w: 1, h: 1, cost: 40, upkeep: 0,
    icon: '\u{1F6E3}\u{FE0F}', color: '#e6e0d2', onWater: true, bridge: true,
    desc: 'A raised white road, dead straight, plastered end to end. Laid ON water, it carries the ' +
      'road across a cenote or a flooded bajo. With no carts and no draft animals, the causeway IS ' +
      'the logistics.',
  },

  milpa: {
    name: 'Milpa Plot', tier: 'food', era: 14, w: 3, h: 3, cost: 500, upkeep: 0.48,
    icon: '\u{1F33D}', color: '#9fc157', workers: 3, dryLand: true,
    out: { grain: 4.2 },
    desc: 'Burn the bush, plant maize, beans and squash in the ash: 4.2 maize/min on the thin ' +
      'upland. RAIN-FED — it draws nothing from your tank and needs no aqueduct, so it is the one ' +
      'chain that keeps running through a brown-out. Needs dry ground, and its nine tiles cleared.',
  },
  raisedfield: {
    name: 'Raised Field', tier: 'food', era: 14, w: 3, h: 3, cost: 600, upkeep: 0.55,
    icon: '\u{1F33E}', color: '#7fae5c', workers: 3, needsWater: true,
    out: { grain: 3.4 },
    desc: 'Canals dug, muck heaped into planting beds: 3.4 maize/min — and 5.1 on fertile bajo soil, ' +
      'the richest food in the age. It drinks from the tank, so a dry season stops it dead. ' +
      'The Milpa\'s opposite in every way.',
  },
  nixtamal: {
    name: 'Nixtamal House', tier: 'food', era: 14, w: 2, h: 2, cost: 970, upkeep: 0.84,
    icon: '\u{1FAD8}', color: '#d6b877', workers: 3, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 9.2, procOut: 'flour', procRatio: 0.65,
    desc: 'Maize soaked in lime water, hulled, then ground on the metate: 9.2 maize/min into 6 masa — ' +
      'a better yield than any mill, because nixtamalisation frees what plain grinding leaves behind. ' +
      'Two Milpas feed one of these. Industry: a poor neighbour for houses.',
  },
  tortillaplaza: {
    name: 'Tortilla Plaza', tier: 'commerce', era: 14, w: 2, h: 2, cost: 1150, upkeep: 0.90,
    icon: '\u{1FAD3}', color: '#c98f6a', workers: 3, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 2.6, sellPrice: 9.5, custRadius: 7, custMin: 12,
    desc: 'Sells 2.6 masa/min at $9.50. Needs ≥12 residents, at any distance — hauls over 20 tiles cost carting.',
  },

  apiary: {
    name: 'Melipona Apiary', tier: 'food', era: 14, w: 2, h: 2, cost: 560, upkeep: 0.44,
    icon: '\u{1F41D}', color: '#c9a24e', workers: 2, nearTrees: 4,
    out: { honey: 1.5 },
    desc: 'Hollow-log hives for the stingless bee, stacked in the shade: 1.5 honey/min, eaten at 60% ' +
      'of bread\'s worth. Needs FOUR STANDING TREE TILES within 3 — and no water at all, so the ' +
      'hives keep working through a drought.',
  },

  quarry: {
    name: 'Limestone Quarry', tier: 'food', era: 14, w: 3, h: 3, cost: 690, upkeep: 0.68,
    icon: '⛰️', color: '#8f939c', workers: 3, industry: true,
    out: { stone: 4.0 }, onRock: true,
    desc: 'Cuts 4 stone/min, scaled by how much rock is under it. MUST sit on rock (≥2 rocky tiles), ' +
      'and NEEDS NO WATER — quarrying is dry work, so it keeps cutting straight through a drought. ' +
      'Every rock tile holds a finite quantity of stone and there is no recovery.',
  },
  stonecutter: {
    name: "Stonecutter's Lodge", tier: 'food', era: 14, w: 2, h: 2, cost: 1100, upkeep: 1.00,
    icon: '\u{1FAA8}', color: '#a8a29a', workers: 4, needsWater: true, industry: true,
    procIn: 'stone', procRate: 5.3, procOut: 'blocks', procRatio: 0.5,
    desc: 'Dresses 5.3 stone/min into 2.65 blocks — squared with stone hammers and sand, because ' +
      'there is no metal tool in this age at all. The Temple-Pyramid is built out of this building.',
  },
  stoneyard: {
    name: 'Stone Yard', tier: 'commerce', era: 14, w: 2, h: 2, cost: 1200, upkeep: 0.96,
    icon: '\u{1F9F1}', color: '#b08968', workers: 3, needsWater: true, needsRoad: true,
    sells: 'blocks', sellRate: 1.3, sellPrice: 16.2, custRadius: 7, custMin: 14,
    desc: 'Sells 1.3 blocks/min at $16.20 — but every block sold is one the Temple-Pyramid does not get. ' +
      'Needs ≥14 residents, at any distance.',
  },

  marlpit: {
    name: 'Marl Pit', tier: 'food', era: 14, w: 2, h: 2, cost: 530, upkeep: 0.48,
    icon: '\u{1FAB5}', color: '#a08a63', workers: 2,
    out: { clay: 5.7 },
    desc: 'Sascab — white marl dug straight out of the karst: 5.7 clay/min. It is under almost ' +
      'everything here, so this is the one raw producer with no siting demand at all.',
  },
  polykiln: {
    name: 'Polychrome Kiln', tier: 'food', era: 14, w: 2, h: 2, cost: 875, upkeep: 0.76,
    icon: '\u{1F3FA}', color: '#b5623a', workers: 3, needsWater: true, industry: true, nearTrees: 4,
    procIn: 'clay', procRate: 7.0, procOut: 'pottery', procRatio: 0.5,
    desc: 'Fires 7 clay/min into 3.5 painted vessels. Needs FOUR STANDING TREE TILES within 3 — ' +
      'firing ate wood by the hectare, so the kiln must stand in the woods and competes with your ' +
      'Milpas for them.',
  },
  vasemarket: {
    name: 'Vase Market', tier: 'commerce', era: 14, w: 2, h: 2, cost: 1270, upkeep: 1.20,
    icon: '\u{1F3FA}', color: '#c47a52', workers: 2, needsWater: true, needsRoad: true,
    sells: 'pottery', sellRate: 2.4, sellPrice: 21, custRadius: 7, custMin: 12,
    desc: 'Sells 2.4 painted vessels/min at $21. Maya polychrome was signed by its painters and ' +
      'traded between cities as prestige goods, not crockery.',
  },

  cacaogrove: {
    name: 'Rejollada Cacao Grove', tier: 'food', era: 14, w: 3, h: 3, cost: 760, upkeep: 0.60,
    icon: '\u{1F36B}', color: '#6f8f4e', workers: 3, nearWater: 3,
    out: { cacao: 2.4 },
    desc: 'Cacao will not grow on open karst. Planted in a rejollada — a dry sinkhole floor that ' +
      'holds humidity and shade — it yields 2.4 beans/min. Must sit within 3 tiles of water, which ' +
      'puts the richest crop in the age in direct competition with your own reservoirs for the ' +
      'scarcest land on the map.',
  },
  grindinghouse: {
    name: 'Cacao Grinding House', tier: 'food', era: 14, w: 2, h: 2, cost: 1590, upkeep: 1.20,
    icon: '\u{1F944}', color: '#7a5237', workers: 3, needsWater: true, industry: true,
    procIn: 'cacao', procRate: 3.1, procOut: 'chocolate', procRatio: 0.5,
    desc: 'Fermented, roasted, ground on the metate and whisked with water, chilli and maize: ' +
      '3.1 beans/min into 1.55 chocolate. Cacao beans were money — this building turns currency ' +
      'into a luxury and doubles its value doing it.',
  },
  chocolatehouse: {
    name: 'Chocolate House', tier: 'commerce', era: 14, w: 2, h: 2, cost: 1700, upkeep: 1.40,
    icon: '\u{1F375}', color: '#8f5a3c', workers: 2, needsWater: true, needsRoad: true,
    sells: 'chocolate', sellRate: 1.5, sellPrice: 52, custRadius: 7, custMin: 14,
    desc: 'Sells 1.5 chocolate/min at $52 — by a wide margin the richest thing this age makes. ' +
      'Drunk frothed and cold from a tall cylinder vase by everyone who could afford it, and buried ' +
      'with them afterwards.',
  },

  stonehouse: {
    name: 'Stone House', tier: 'housing', era: 14, w: 1, h: 1, cost: 700, upkeep: 0.20,
    icon: '\u{1F3F0}', color: '#c9b8a0', cap: 12, needsWater: true,
    desc: 'Corbelled Maya stonework on a low platform: homes 12 residents. Needs water — which in ' +
      'this age means an Aqueduct with a full tank behind it.',
  },
  marketplaza: {
    name: 'Market Plaza', tier: 'commerce', era: 14, w: 2, h: 2, cost: 740, upkeep: 0.60,
    icon: '\u{1F9FA}', color: '#bd9a70', workers: 2, needsWater: true,
    sellsRaw: ['stone', 'clay', 'cacao', 'honey', 'pottery'], sellRate: 7.3,
    custRadius: 7, custMin: 8,
    desc: 'Sells whatever raw good you have most of — stone, marl, cacao, honey or vessels — at 80% ' +
      'of list, 7.3 units/min. Strictly worse than finishing a chain, strictly better than the ' +
      'half-price export dump. Knowing when to demolish it is the real decision.',
  },
  tributestore: {
    name: 'Tribute Storehouse', tier: 'infra', era: 14, w: 2, h: 2, cost: 1610, upkeep: 0.60,
    icon: '\u{1F3EF}', color: '#c9a558', needsRoad: true, depot: true,
    storeGrain: 3600, storeFlour: 900, storeCraft: 40,
    desc: 'The lineage\'s tribute store: massive maize and masa capacity, extra craft storage, and a ' +
      'SUPPLY POINT for carting — which matters more here than anywhere, because five chains want ' +
      'five different grounds and there are no carts to shorten the haul.',
  },
  codexhouse: {
    name: 'House of Codices', tier: 'civic', era: 14, w: 1, h: 1, cost: 740, upkeep: 0.28,
    icon: '\u{1F4DA}', color: '#cfbd8e', needsWater: true, keepsTally: true,
    desc: 'Bark-paper screenfolds of the count of days, the tribute and the dynasty. +10% sales at ' +
      'every shop within 20 tiles, and the city can read its own numbers.',
  },
  ashspread: {
    name: 'Ash Spread', tier: 'food', era: 14, w: 1, h: 1, cost: 345, upkeep: 0.16,
    icon: '\u{1F525}', color: '#6b6257', soilRadius: 7,
    desc: 'The burnt bush raked back over the plot: land within 7 tiles recovers 3× faster. ' +
      'Swidden maize exhausts its ground and then moves — this is what lets you stay.',
  },
  terracewall: {
    name: 'Terrace Wall', tier: 'food', era: 14, w: 2, h: 2, cost: 440, upkeep: 0.20,
    icon: '\u{1F9F1}', color: '#9a9384', threshing: true,
    desc: 'Dry-laid stone across the slope, holding the soil where the rain would take it. +25% to ' +
      'every field it touches, and being 2×2 it can touch four. Does not stack with a Nixtamal House.',
  },
  temazcal: {
    name: 'Temazcal', tier: 'civic', era: 14, w: 1, h: 1, cost: 505, upkeep: 0.12,
    icon: '\u{2668}\u{FE0F}', color: '#b09a86', amenityRadius: 8,
    desc: 'The steam bath: a low vaulted room, heated stones, water poured. Pleases the neighbourhood ' +
      'and lets houses rise a rung. The small version of the Ballcourt.',
  },
  ballcourt: {
    name: 'Ballcourt', tier: 'civic', era: 14, w: 2, h: 4, cost: 1400, upkeep: 0.60,
    icon: '\u{1F3DF}\u{FE0F}', color: '#c9b48a', capRadius: 20,
    desc: 'Two parallel platforms, a stone ring, and a rubber ball that may not touch the ground. ' +
      '+1 housing capacity for EVERY home within 20 tiles — the shared ground a Maya city forms ' +
      'around. One is enough; a second adds nothing to a home already covered.',
  },

  deepcenote: {
    name: 'Deep Cenote Stair', tier: 'infra', era: 14, w: 2, h: 2, cost: 1120, upkeep: 0.86,
    icon: '\u{1F573}\u{FE0F}', color: '#5da4c9', workers: 3, onWater: true,
    out: { water: 3.6 },
    desc: 'Cut further down to the water table, with a second stair: 3.6 water/min, and it still ' +
      'ignores the season entirely.',
  },
  swiddenfield: {
    name: 'Swidden Field', tier: 'food', era: 14, w: 3, h: 3, cost: 1000, upkeep: 0.82,
    icon: '\u{1F33D}', color: '#9cb464', workers: 4, dryLand: true,
    out: { grain: 8.4 },
    desc: 'Cut, burned and cropped on a proper rotation: 8.4 maize/min. Rain-fed like the Milpa, ' +
      'so it keeps feeding the city straight through a brown-out.',
  },
  chinampa: {
    name: 'Chinampa Bed', tier: 'food', era: 14, w: 3, h: 3, cost: 1200, upkeep: 0.94,
    icon: '\u{1F33E}', color: '#7fae72', workers: 4, needsWater: true,
    out: { grain: 6.8 },
    desc: 'Muck dredged onto staked beds in standing water: 6.8 maize/min off ground that never dries.',
  },
  hiverow: {
    name: 'Stacked Hive Row', tier: 'food', era: 14, w: 2, h: 2, cost: 1120, upkeep: 0.74,
    icon: '\u{1F41D}', color: '#c9a24e', workers: 3,
    out: { honey: 3.0 },
    desc: 'Log hives stacked three high: 3 honey/min. Needs no water and no road — still the one ' +
      'thing the city eats when the tank is dry.',
  },
  deepquarry: {
    name: 'Terraced Quarry', tier: 'food', era: 14, w: 3, h: 3, cost: 1380, upkeep: 1.16,
    icon: '\u{26CF}\u{FE0F}', color: '#c2b9a4', workers: 4, onRock: true, industry: true,
    out: { stone: 8.0 },
    desc: 'Worked in benches instead of scraped off the top: 8 stone/min. The rock still runs out.',
  },
  marlworks: {
    name: 'Marl Works', tier: 'food', era: 14, w: 2, h: 2, cost: 1060, upkeep: 0.82,
    icon: '\u{1FAB5}', color: '#a89478', workers: 3, industry: true,
    out: { clay: 11.4 },
    desc: 'Sascab dug from a proper shaft and screened: 11.4 marl/min.',
  },
  cacaoterrace: {
    name: 'Shaded Cacao Walk', tier: 'food', era: 14, w: 3, h: 3, cost: 1520, upkeep: 1.02,
    icon: '\u{1F36B}', color: '#7a5a3f', workers: 4, nearWater: 3,
    out: { cacao: 4.8 },
    desc: 'Cacao under a canopy of planted shade trees, watered from the rejollada: 4.8 cacao/min.',
  },

  limehouse: {
    name: 'Lime House', tier: 'food', era: 14, w: 2, h: 2, cost: 1630, upkeep: 1.14,
    icon: '\u{1F35E}', color: '#e0c9a0', workers: 4, needsWater: true, industry: true, grainMill: true,
    procIn: 'grain', procRate: 12.88, procOut: 'flour', procRatio: 0.65,
    desc: 'Maize boiled with lime in bulk and ground on fresh metates: 12.88 masa/min.',
  },
  sculptorscourt: {
    name: 'Sculptors\' Court', tier: 'craft', era: 14, w: 2, h: 2, cost: 1840, upkeep: 1.34,
    icon: '\u{1F5FF}', color: '#b8b0a0', workers: 5, needsWater: true, industry: true,
    procIn: 'stone', procRate: 7.42, procOut: 'blocks', procRatio: 0.5,
    desc: 'Dressed and carved to a line rather than squared off: 7.42 blocks/min.',
  },
  twinkiln: {
    name: 'Twin-Chamber Kiln', tier: 'craft', era: 14, w: 2, h: 2, cost: 1460, upkeep: 1.02,
    icon: '\u{1F3FA}', color: '#c47a52', workers: 4, needsWater: true, industry: true, nearTrees: 4,
    procIn: 'clay', procRate: 9.8, procOut: 'pottery', procRatio: 0.5,
    desc: 'Two chambers fired in alternation so one is always cooling: 9.8 vessels/min. Still wants ' +
      'four standing tree tiles within 3.',
  },
  frothhouse: {
    name: 'Frothing House', tier: 'craft', era: 14, w: 2, h: 2, cost: 2650, upkeep: 1.62,
    icon: '\u{1F36B}', color: '#5f4030', workers: 4, needsWater: true, industry: true,
    procIn: 'cacao', procRate: 4.34, procOut: 'chocolate', procRatio: 0.5,
    desc: 'Poured from height between vessels until it stands in foam: 4.34 chocolate/min.',
  },

  masaarcade: {
    name: 'Masa Arcade', tier: 'commerce', era: 14, w: 2, h: 2, cost: 2300, upkeep: 1.34,
    icon: '\u{1F32E}', color: '#d8b878', workers: 4, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 5.2, sellPrice: 9.5, custRadius: 7, custMin: 8,
    desc: 'A colonnade of griddles rather than a square: 5.2 masa/min sold.',
  },
  blockexchange: {
    name: 'Cut-Stone Exchange', tier: 'commerce', era: 14, w: 2, h: 2, cost: 2400, upkeep: 1.42,
    icon: '\u{1F3D7}\u{FE0F}', color: '#b8b0a0', workers: 4, needsWater: true, needsRoad: true,
    sells: 'blocks', sellRate: 2.6, sellPrice: 16.2, custRadius: 7, custMin: 10,
    desc: 'Blocks sold against a standing order book: 2.6 blocks/min.',
  },
  polychromegallery: {
    name: 'Painters\' Gallery', tier: 'commerce', era: 14, w: 2, h: 2, cost: 2540, upkeep: 1.72,
    icon: '\u{1F3FA}', color: '#c47a52', workers: 3, needsWater: true, needsRoad: true,
    sells: 'pottery', sellRate: 4.8, sellPrice: 21, custRadius: 7, custMin: 12,
    desc: 'Signed work shown under a roof: 4.8 painted vessels/min.',
  },
  cacaocourt: {
    name: 'Cacao Court', tier: 'commerce', era: 14, w: 2, h: 2, cost: 3400, upkeep: 2.0,
    icon: '\u{1F36B}', color: '#5f4030', workers: 3, needsWater: true, needsRoad: true,
    sells: 'chocolate', sellRate: 3.0, sellPrice: 52, custRadius: 7, custMin: 14,
    desc: 'Where the beans are also the money: 3 chocolate/min at $52. The richest thing in the age.',
  },
  tributeplaza: {
    name: 'Tribute Arcade', tier: 'commerce', era: 14, w: 2, h: 2, cost: 1480, upkeep: 1.0,
    icon: '\u{1F6D2}', color: '#c2a878', workers: 3, needsWater: true,
    sellsRaw: ['stone', 'clay', 'cacao', 'honey', 'pottery'], sellRate: 14.6,
    custRadius: 7, custMin: 8,
    desc: 'The whole plaza given over to raw tribute: clears 14.6 goods/min.',
  },

  bottlecistern: {
    name: 'Bottle Cistern', tier: 'infra', era: 14, w: 1, h: 1, cost: 800, upkeep: 0.22,
    icon: '\u{1F4A7}', color: '#8fb4c4', storeWater: 176,
    desc: 'Plastered wider at the belly than the neck: holds 176 water, and it still needs no road, ' +
      'no water coverage and no workers — the thing that holds the water cannot require the water.',
  },
  raisedchannel: {
    name: 'Raised Channel', tier: 'infra', era: 14, w: 1, h: 1, cost: 1040, upkeep: 0.64,
    icon: '\u{1F309}', color: '#9db3c9', waterRadius: 16, tankFed: true,
    desc: 'Carried on piers to hold its fall: waters 16 tiles. Goes dark with the tank, like every channel.',
  },
  whiteroad: {
    name: 'White Road', tier: 'infra', era: 14, w: 1, h: 1, cost: 100, upkeep: 0,
    icon: '\u{1F6E3}\u{FE0F}', color: '#ddd6c4', onWater: true, bridge: true,
    desc: 'Limestone-surfaced and raised above the wet: carries the road across, and shows at night.',
  },
  burnbeds: {
    name: 'Burn Beds', tier: 'infra', era: 14, w: 1, h: 1, cost: 690, upkeep: 0.24,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a7a5c', soilRadius: 10,
    desc: 'Ash and muck carted and turned in beds: fields within 10 tiles recover x3.',
  },
  hillsidesteps: {
    name: 'Hillside Steps', tier: 'food', era: 14, w: 2, h: 2, cost: 880, upkeep: 0.30,
    icon: '\u{1F9F1}', color: '#9a9384', threshing: true,
    desc: 'Terraces stepped up the whole slope: +25% to every field they touch.',
  },
  vaultedbath: {
    name: 'Vaulted Bath', tier: 'civic', era: 14, w: 1, h: 1, cost: 1010, upkeep: 0.18,
    icon: '\u{2668}\u{FE0F}', color: '#b09a86', amenityRadius: 12,
    desc: 'A corbel-vaulted sweat house with its own furnace: contentment out to 12 tiles.',
  },
  ringcourt: {
    name: 'Ring Court', tier: 'civic', era: 14, w: 2, h: 4, cost: 2800, upkeep: 0.88,
    icon: '\u{1F3DF}\u{FE0F}', color: '#c9b48a', capRadius: 29,
    desc: 'Sloping benches, stone rings, and room for the whole city: +1 housing capacity within 29 tiles.',
  },
  royaltreasury: {
    name: 'Royal Treasury', tier: 'civic', era: 14, w: 2, h: 2, cost: 3200, upkeep: 0.88,
    icon: '\u{1F3E6}', color: '#c9a878', needsRoad: true,
    depot: true, storeGrain: 63000, storeFlour: 15750, storeCraft: 700,
    desc: 'The whole tribute of a polity under one roof: 63,000 maize, 15,750 masa and 700 craft goods.',
  },
  scribalacademy: {
    name: 'Scribal Academy', tier: 'civic', era: 14, w: 1, h: 1, cost: 1480, upkeep: 0.42,
    icon: '\u{1F4D6}', color: '#d8c9a0', needsWater: true, keepsTally: true,
    desc: 'Where the day-count and the tribute rolls are kept and taught: the city reads its own books.',
  },

  plasterrange: {
    name: 'Plaster Range', tier: 'housing', era: 14, w: 1, h: 1, cost: 1400, upkeep: 0.30,
    icon: '\u{1F3E0}', color: '#c9bda4', cap: 17, needsWater: true, needsRoad: true,
    levels: ['Plaster Room', 'Plaster Range', 'Vaulted Range', 'Painted Range',
             'Lord\'s Range', 'Ancestor Range'],
    desc: 'A true corbel vault over plastered walls: houses 17.',
  },

  stela: {
    name: 'Stela', tier: 'beauty', era: 14, w: 1, h: 1, cost: 130, upkeep: 0,
    icon: '\u{1F5FC}', color: '#bdb49c',
    desc: 'A carved limestone shaft: a ruler, a date, and what he did on it. Purely for the look ' +
      'of the place — no upkeep, no workers.',
  },
  copalbrazier: {
    name: 'Copal Brazier', tier: 'beauty', era: 14, w: 1, h: 1, cost: 105, upkeep: 0,
    icon: '\u{1F56F}\u{FE0F}', color: '#c98f5a',
    desc: 'Resin smoking in a spiked incensario. Purely for the look of the place.',
  },

  prospectpit: {

    name: 'Prospect Pit', tier: 'food', era: 2, w: 2, h: 2, cost: 55, upkeep: 0.06,
    icon: '\u{26CF}\u{FE0F}', color: '#8f8578', workers: 1,

    mines: true, rockRadius: 14, onRock: true,
    out: { ore: 0.45 },
    desc: 'A trial working and its spoil heap, one man with a maul: 0.45 ore/min, barely worth the wage. ' +
      'It works any outcrop within 14 tiles and stands anywhere — put it ON the rock for +50%. Its real job ' +
      'is to tell you whether the seam under it is worth an Adit before you commit two backs to it, and it ' +
      'becomes that Adit in place.',
  },
  adit: {
    name: 'Adit', tier: 'food', era: 2, w: 2, h: 2, cost: 90, upkeep: 0.10,
    icon: '\u{1F573}\u{FE0F}', color: '#7d7468', workers: 2,
    mines: true, rockRadius: 20, onRock: true,

    out: { ore: 0.90 },
    desc: 'A gallery driven into the ridge face on timber props: 0.90 ore/min, from any outcrop within ' +
      '20 tiles, nearest first. +50% standing on the rock, +50% again inside a LAMP HOUSE ring. It EATS the ' +
      'rock it works and a worked-out tile stops being rock forever — the ridge does not grow back.',
  },
  washingfloor: {
    name: 'Washing Floor', tier: 'food', era: 2, w: 2, h: 3, cost: 235, upkeep: 0.13,
    icon: '\u{1F30A}', color: '#8d9aa2', workers: 2, nearWater: 2, industry: true,
    procIn: 'ore', procOut: 'concentrate', procRate: 2.70, procRatio: 0.45,
    desc: 'Sluices and a riffled board: 2.70 ore/min washed down to 1.215 of heavy concentrate. It wants to ' +
      'sit within 2 tiles of running water, which is at the bottom of the gorge — and your ore is at the top ' +
      'of it. Three Adits fill exactly one floor.',
  },
  smeltinghearth: {
    name: 'Smelting Hearth', tier: 'food', era: 2, w: 2, h: 2, cost: 340, upkeep: 0.19,
    icon: '\u{1F525}', color: '#b5713f', workers: 3, industry: true,

    mines: true, levied: true,
    procIn: 'concentrate', procOut: 'gold', procRate: 1.215, procRatio: 0.40,
    desc: 'A clay-lined bowl furnace and two men on the bellows: 1.215 concentrate/min into 0.486 gold. ' +
      '\u{2605} The masters take 35% of every button poured, before it ever reaches your storehouse — 0.170 ' +
      'walks up the hill, 0.316 is yours. One Hearth running a full count is exactly the first quota. Bad ' +
      'neighbour for houses.',
  },
  goldsmithbench: {
    name: "Goldsmith's Bench", tier: 'commerce', era: 2, w: 2, h: 2, cost: 385, upkeep: 0.20,
    icon: '\u{1F48D}', color: '#c9a83f', workers: 2, needsWater: true,
    procIn: 'gold', procOut: 'goldleaf', procRate: 0.316, procRatio: 1.30,
    sells: 'goldleaf', sellRate: 0.41, sellPrice: 21.30, custRadius: 6, custMin: 6,

    desc: 'Gold beaten between hide until one button becomes 1.3 leaves, sold at $21.30 — the richest trade ' +
      'in the age. It works the metal AFTER the levy, so every rank you buy here is entirely yours, and every ' +
      'rank on the Hearth is 35% the masters\'. It draws exactly what one Hearth retains: raise one and you ' +
      'must raise the other.',
  },
  lamphouse: {
    name: 'Lamp House', tier: 'infra', era: 2, w: 1, h: 1, cost: 125, upkeep: 0.10,
    icon: '\u{1F3EE}', color: '#c9903f', workers: 1,
    lampRadius: 9, fuelIn: 'pitch', fuelRate: 0.13,

    desc: 'A rack of pitch lamps and the boy who keeps them lit: every mine within 9 tiles works +50%. ' +
      'Burns 0.13 pitch/min — one Pitch Boilery keeps exactly one Lamp House, with 3% to spare, which is ' +
      'why every new mine district costs you a shop\'s margin somewhere else.',
  },

  malachitecut: {
    name: 'Malachite Cut', tier: 'food', era: 2, w: 2, h: 2, cost: 80, upkeep: 0.09,
    icon: '\u{1F7E2}', color: '#5f8f6a', workers: 2,
    mines: true, rockRadius: 20, onRock: true,
    out: { malachite: 0.90 },
    desc: 'Green stone hacked out of daylight — no gallery, no props, no lamp: 0.90 malachite/min from any ' +
      'outcrop within 20 tiles. Poorer than the Adit and UNTAXED, because the masters did not come here for ' +
      'copper. It takes the same finite rock your gold takes — and it is worked by the same gangs, so when ' +
      'the picks go down they go down here too. The hedge is against the LEVY, not against the strike.',
  },
  copperfurnace: {
    name: 'Copper Furnace', tier: 'commerce', era: 2, w: 2, h: 2, cost: 300, upkeep: 0.16,
    icon: '\u{1F7EB}', color: '#a06a45', workers: 3, industry: true,
    procIn: 'malachite', procOut: 'copper', procRate: 1.80, procRatio: 0.35,
    sells: 'copper', sellRate: 0.63, sellPrice: 5.32, custRadius: 5, custMin: 5,

    desc: 'Smelts 1.80 malachite/min into 0.63 copper and sells it on the spot at $5.32. Untaxed and ' +
      'unlevied — every button is yours, where 35% of the gold is not. The furnace never strikes, but the ' +
      'Cut that feeds it does: what pays for you while the picks are down is bread, charcoal, pitch, ' +
      'limestone and hair, none of which the masters ever wanted.',
  },

  terraceplot: {
    name: 'Terrace Plot', tier: 'food', era: 2, w: 2, h: 2, cost: 60, upkeep: 0.09,
    icon: '\u{1F33E}', color: '#a8b96a', workers: 2, needsWater: true,

    out: { grain: 1.0 },
    desc: 'Six courses of dry-stone wall and a strip of borrowed soil: 1.0 barley/min. +50% on fertile ' +
      'ground, +25% touching a Quern Shed. It needs a ROCK-CUT WELL in range — the gorge below waters ' +
      'nothing. Salts like any field, and beside the stream it heals three times over.',
  },
  quernhouse2: {

    name: 'Saddle-Quern Shed', tier: 'food', era: 2, w: 2, h: 2, cost: 150, upkeep: 0.15,
    icon: '\u{1F35E}', color: '#c9a878', workers: 3, needsWater: true, industry: true, grainMill: true,
    procIn: 'grain', procOut: 'flour', procRate: 3.0, procRatio: 0.60,
    desc: 'Twenty saddle querns under one reed roof: 3.0 barley/min into 1.8 rations — and 3.75 when it ' +
      'touches a Terrace Plot, because the +25% lifts both sides. Bad neighbour for houses.',
  },
  rationshed: {
    name: 'Ration Shed', tier: 'commerce', era: 2, w: 2, h: 2, cost: 150, upkeep: 0.18,
    icon: '\u{1F3E4}', color: '#bd8f6a', workers: 2, needsWater: true,
    sells: 'flour', sellRate: 0.455, sellPrice: 4.00, custRadius: 5, custMin: 4,
    desc: 'Issues 0.455 rations/min at $4.00 a measure. Needs \u{2265}4 residents, at any distance — hauls ' +
      'over 20 tiles cost carting. Bread here is a wage, not a trade, and it is priced like one.',
  },

  timbercamp: {
    name: 'Timber Camp', tier: 'food', era: 2, w: 2, h: 2, cost: 85, upkeep: 0.09,
    icon: '\u{1FA93}', color: '#7f7a55', workers: 2, dryLand: true,

    out: { deadwood: 0.90 },
    desc: 'Juniper and terebinth felled on the dry slope: 0.90 timber/min from the standing scrub anywhere ' +
      'on the map, nearest first, +50% sited on dry ground. The scrub is 9% of this landscape and it does ' +
      'not grow back — the wood is always far from the fire.',
  },
  charcoalclamp2: {
    name: 'Turf Clamp', tier: 'commerce', era: 2, w: 2, h: 2, cost: 190, upkeep: 0.12,
    icon: '\u{1F311}', color: '#5e574c', workers: 3, industry: true,
    procIn: 'deadwood', procOut: 'charcoal', procRate: 0.90, procRatio: 0.50,
    sells: 'charcoal', sellRate: 0.45, sellPrice: 6.33, custRadius: 5, custMin: 4,
    desc: 'A turfed mound smouldering for three days: 0.90 timber/min into 0.45 charcoal, sold at $6.33. ' +
      'Two buildings and five mouths where the gold chain needs seven and fourteen — chain length is a strategy.',
  },

  bitumenseep: {
    name: 'Bitumen Seep Works', tier: 'food', era: 2, w: 2, h: 2, cost: 85, upkeep: 0.08,
    icon: '\u{1F5A4}', color: '#3f3a38', workers: 2, onSalt: true,

    out: { bitumen: 0.79 },
    desc: 'Tar skimmed off a cold black pool: 0.79 bitumen/min, +50% standing on the seeps — the flats ' +
      'nobody else can use become the reason your mines have light.',
  },
  pitchboilery: {
    name: 'Pitch Boilery', tier: 'commerce', era: 2, w: 2, h: 2, cost: 200, upkeep: 0.16,
    icon: '\u{1F6E2}\u{FE0F}', color: '#4a463f', workers: 3, industry: true,
    procIn: 'bitumen', procOut: 'pitch', procRate: 0.79, procRatio: 0.55,
    sells: 'pitch', sellRate: 0.30, sellPrice: 9.50, custRadius: 5, custMin: 4,
    desc: 'Boils 0.79 bitumen/min down to 0.4345 pitch and sells 0.30 of it at $9.50. What is left over — ' +
      '0.1345 — is ONE LAMP HOUSE (0.13) with 3% to spare. Every extra mine district costs you a shop\'s ' +
      'margin, permanently. It is the only chain whose product the city itself burns.',
  },

  limestonecut: {
    name: 'Limestone Cut', tier: 'food', era: 2, w: 2, h: 2, cost: 85, upkeep: 0.09,
    icon: '\u{1FAA8}', color: '#b8b2a2', workers: 2,
    rockRadius: 20, onRock: true,

    out: { stone: 1.03 },
    desc: 'Blocks levered off the bedding planes: up to 1.03 stone/min from any outcrop within 20 tiles, ' +
      'scaled by how much rock is actually under the shed — three tiles of four is 0.90. It takes the same ' +
      'finite ridge the gold takes, and unlike the gold, nobody counts it.',
  },
  dressingshed: {
    name: 'Dressing Shed', tier: 'food', era: 2, w: 2, h: 2, cost: 185, upkeep: 0.16,
    icon: '\u{1F528}', color: '#a49c8c', workers: 3, industry: true,
    procIn: 'stone', procOut: 'blocks', procRate: 0.90, procRatio: 0.50,
    desc: 'Points, drags and a levelled banker: 0.90 stone/min squared into 0.45 dressed blocks.',
  },
  blockyard: {
    name: 'Block Yard', tier: 'commerce', era: 2, w: 2, h: 2, cost: 225, upkeep: 0.18,
    icon: '\u{1F9F1}', color: '#c2b9a4', workers: 2,
    sells: 'blocks', sellRate: 0.45, sellPrice: 7.45, custRadius: 5, custMin: 5,
    desc: 'Dressed stone stacked and sold by the course at $7.45 — the camp is building itself walls, and ' +
      'the masters are not paying for them.',
  },

  goatpen: {
    name: 'Scree Goat Pen', tier: 'food', era: 2, w: 2, h: 2, cost: 78, upkeep: 0.09,
    icon: '\u{1F410}', color: '#a89a80', workers: 2, dryLand: true,
    out: { wool: 0.76 },
    desc: 'Black goats worked over the scree for hair, not fleece: 0.76 wool/min, +50% on dry ground. It ' +
      'wants the SAME slope the Timber Camp wants — graze it or fell it, and whichever you choose is the ' +
      'one that deforested this landscape for real.',
  },
  hairclothshed: {
    name: 'Hair-Cloth Shed', tier: 'commerce', era: 2, w: 2, h: 2, cost: 230, upkeep: 0.18,
    icon: '\u{1F9F6}', color: '#8a7f6a', workers: 3, needsWater: true, industry: true,
    procIn: 'wool', procOut: 'cloth', procRate: 0.76, procRatio: 0.50,
    sells: 'cloth', sellRate: 0.38, sellPrice: 7.50, custRadius: 5, custMin: 5,
    desc: 'Ground looms weaving 0.76 hair/min into 0.38 of coarse black sacking, sold at $7.50 — tents, ' +
      'ore sacks and every rope on the ridge. Not Sumer\'s broadcloth, and it never will be.',
  },

  gatheringground: {
    name: 'Gathering Ground', tier: 'food', era: 2, w: 2, h: 2, cost: 55, upkeep: 0.07,
    icon: '\u{1F33F}', color: '#8a9a6a', workers: 1,
    out: { forage: 1.5 },
    desc: 'Wild pistachio, almond, acorn and vetch off the thorn scrub: 1.5 forage/min, eaten at 80% of a ' +
      'ration. It needs no well, no road, no lamp and no permission, and ONE person can work it — so it is ' +
      'still feeding you when the counts have been missed and the picks are down.',
  },
  fishtrap: {
    name: 'Gorge Fish Trap', tier: 'food', era: 2, w: 1, h: 3, cost: 95, upkeep: 0.09,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 2, onWater: true,
    out: { fish: 1.2 },
    desc: 'A stone weir set across the cold stream: 1.2 fish/min, eaten at 75% of a ration. It stands IN ' +
      'the water, so it needs no Rock-Cut Well — the second food that keeps working when everything else stops.',
  },

  shelter: {
    name: 'Reed-Roof Shelter', tier: 'housing', era: 2, w: 1, h: 1, cost: 70, upkeep: 0.03,
    icon: '\u{26FA}', color: '#c2a882', cap: 4, needsWater: true,

    desc: 'Homes 2 when it goes up, rising to 14 as it earns its rungs. +1 near Common Ground, \u{2212}1 ' +
      'beside industry. Every resident is a back the masters can count.',
  },
  grainpit: {
    name: 'Grain Pit', tier: 'infra', era: 2, w: 1, h: 1, cost: 50, upkeep: 0.02,
    icon: '\u{1F573}\u{FE0F}', color: '#9a8a6a', storeGrain: 19, storeFlour: 11,
    desc: 'A stone-lidded pit cut into the terrace wall. +19 barley and +11 rations of capacity, NO workers ' +
      '\u{2014} the famine buffer that does not eat.',
  },
  oreheap: {
    name: 'Ore Heap', tier: 'infra', era: 2, w: 2, h: 2, cost: 120, upkeep: 0.12,
    icon: '\u{1FAA8}', color: '#8a7f70', workers: 2, depot: true, storeCraft: 15,
    desc: 'Sorted stockpiles under matting: +15 capacity for EVERY mine good while staffed, and it counts ' +
      'as a supply point for carting. Bank a count\'s worth instead of dumping it abroad at half price.',
  },
  overseerpost: {
    name: "Overseer's Post", tier: 'infra', era: 2, w: 1, h: 1, cost: 120, upkeep: 0.15,
    icon: '\u{1F3C3}', color: '#9a8060', workers: 1, depot: true,
    desc: 'A hut, a whip and a sack of tallies at the head of the ridge track. Counts as a SUPPLY POINT — ' +
      'one post erases a mine district\'s carting premium, and in this age the mine district is over the ' +
      'free radius the moment it exists.',
  },
  tributeyard: {
    name: 'Tribute Yard', tier: 'civic', era: 2, w: 3, h: 3, cost: 680, upkeep: 0.20,
    icon: '\u{2696}\u{FE0F}', color: '#b5a06a', workers: 3, needsWater: true, depot: true,
    storeCraft: 28, levyYard: true,

    desc: 'A scale, a tally board and a locked door. The masters take their 35% whether this stands or not ' +
      '\u{2014} but NOTHING counts toward the quota unless it is running. It is where you settle a count, ' +
      'where you overpay for peace, and where you refuse.',
  },
  tallystone: {
    name: 'Tally Stone', tier: 'civic', era: 2, w: 1, h: 1, cost: 120, upkeep: 0.07,
    icon: '\u{1FAA8}', color: '#a89a8a', keepsTally: true,
    desc: 'Notches cut in a standing rock: the accounts, before anyone thought to write them down. +10% ' +
      'throughput at every shop within 20 tiles. One covers a camp; a second adds nothing to a shop already counted.',
  },
  commonground: {
    name: 'Common Ground', tier: 'civic', era: 2, w: 1, h: 1, cost: 55, upkeep: 0.05,
    icon: '\u{1F525}', color: '#b5a888', amenityRadius: 12,
    desc: 'Swept dirt, a fire ring, a place to sit that nobody is watching. +1 housing capacity for every ' +
      'home within 12 tiles. One is enough — it does not stack with itself.',
  },
  ashheap: {
    name: 'Ash Heap', tier: 'food', era: 2, w: 1, h: 1, cost: 55, upkeep: 0.05,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a8478', soilRadius: 5,
    desc: 'Hearth ash and night soil tipped over the terrace edge. Land within 5 tiles recovers from salt ' +
      '3\u{00D7} faster — pair it with fallow strips, because cropping one terrace forever will finish it.',
  },
  rockwell: {
    name: 'Rock-Cut Well', tier: 'infra', era: 2, w: 1, h: 1, cost: 40, upkeep: 0.06,
    icon: '\u{26F2}', color: '#7fb4c9', waterRadius: 5,
    desc: 'A shaft sunk to the water table and steined with dry stone. \u{2605} The ONLY thing in this age ' +
      'that satisfies a building\'s thirst — the gorge below does not count. Buildings without water shut down.',
  },
  rockladder: {
    name: 'Rock Ladder', tier: 'infra', era: 2, w: 1, h: 1, cost: 40, upkeep: 0.03,
    icon: '\u{1FA9C}', color: '#8a7a5c', onWater: true, bridge: true,
    desc: 'Notched logs pinned across the gorge. Placed ON water, it carries the road network to the far ' +
      'bank — lay a line of them and the other ridge joins your camp without terraforming a river.',
  },
  rawbarrow: {
    name: 'Raw Goods Barrow', tier: 'commerce', era: 2, w: 1, h: 2, cost: 105, upkeep: 0.11,
    icon: '\u{1F6D2}', color: '#b59a78', workers: 1, needsWater: true,
    sellsRaw: ['ore', 'malachite', 'deadwood', 'bitumen', 'grain', 'stone'],
    sellRate: 1.14, custRadius: 5, custMin: 3,

    desc: 'Sells whatever raw you have most of at 80% of list, 1.14 a minute. Strictly worse than finishing ' +
      'a chain, strictly better than the half-price dump — and it is income from the first hour, before a ' +
      'single Hearth is lit.',
  },
  spoilmarker: {
    name: 'Spoil-Heap Marker', tier: 'beauty', era: 2, w: 1, h: 1, cost: 15, upkeep: 0,
    icon: '\u{1FAA8}', color: '#a09484', cosmetic: true, nameable: true,
    desc: 'A cairn on the tip that names a working — "The Deep Cut", "Ninth Gallery". No output, no upkeep: ' +
      'the name is the point. Click it to name the working.',
  },
  stencilledhand: {
    name: 'The Stencilled Hand', tier: 'beauty', era: 2, w: 1, h: 1, cost: 15, upkeep: 0,
    icon: '\u{1F590}\u{FE0F}', color: '#a8482f', cosmetic: true,
    desc: 'A hand blown in red ochre on the gallery wall, at the end of a shift that was not yours. Purely ' +
      'for the look of the place — zero output, zero upkeep.',
  },

  deeplevel: {
    name: 'The Deep Level', tier: 'food', era: 2, w: 2, h: 2, cost: 180, upkeep: 0.14,
    icon: '\u{1F573}\u{FE0F}', color: '#6d6459', workers: 3,
    mines: true, rockRadius: 20, onRock: true,
    out: { ore: 1.80 },
    desc: 'The gallery driven below the water line, with a bailing crew and a winze: 1.80 ore/min. Twice ' +
      'the Adit, and twice the rock eaten to get it.',
  },
  openstope: {
    name: 'Open Stope', tier: 'food', era: 2, w: 2, h: 2, cost: 160, upkeep: 0.13,
    icon: '\u{1F7E2}', color: '#4f7f5a', workers: 3,
    mines: true, rockRadius: 20, onRock: true,
    out: { malachite: 1.80 },
    desc: 'The whole face taken down in benches instead of picked at: 1.80 malachite/min, and still ' +
      'nobody is counting it.',
  },
  benchquarry: {
    name: 'Bench Quarry', tier: 'food', era: 2, w: 2, h: 2, cost: 170, upkeep: 0.13,
    icon: '\u{1FAA8}', color: '#c9c2b0', workers: 3,
    rockRadius: 20, onRock: true,
    out: { stone: 2.06 },
    desc: 'Worked in proper lifts with wedges and a plug drill: up to 2.06 stone/min, and 1.80 on three ' +
      'tiles of rock out of four.',
  },
  fellinggang: {
    name: 'Felling Gang', tier: 'food', era: 2, w: 2, h: 2, cost: 170, upkeep: 0.13,
    icon: '\u{1FA93}', color: '#6f6a48', workers: 3, dryLand: true,
    out: { deadwood: 1.80 },
    desc: 'A standing crew with saws and a skid road: 1.80 timber/min off the same bare slope, and it runs ' +
      'out of scrub twice as fast.',
  },
  tarpits: {
    name: 'The Tar Pits', tier: 'food', era: 2, w: 2, h: 2, cost: 170, upkeep: 0.12,
    icon: '\u{1F5A4}', color: '#2f2c2a', workers: 3, onSalt: true,
    out: { bitumen: 1.58 },
    desc: 'The seeps dug out, banked and worked as pits rather than skimmed: 1.58 bitumen/min — two Lamp ' +
      'Houses and a shop\'s margin left over.',
  },
  highpasture: {
    name: 'High Pasture', tier: 'food', era: 2, w: 2, h: 2, cost: 155, upkeep: 0.13,
    icon: '\u{1F410}', color: '#9a9078', workers: 3, dryLand: true,
    out: { wool: 1.52 },
    desc: 'The herd taken up to the summer grazing and brought down shorn: 1.52 hair/min.',
  },
  irrigatedbank: {
    name: 'Irrigated Bank', tier: 'food', era: 2, w: 2, h: 2, cost: 120, upkeep: 0.13,
    icon: '\u{1F33E}', color: '#8fb95a', workers: 3, needsWater: true,
    out: { grain: 2.0 },

    desc: 'Cut leats off the spring line and a puddled floor to the terrace: 2.0 barley/min, double the plot.',
  },
  orchardslope: {
    name: 'Orchard Slope', tier: 'food', era: 2, w: 2, h: 2, cost: 110, upkeep: 0.10,
    icon: '\u{1F333}', color: '#7a9a5a', workers: 2,
    out: { forage: 3.0 },
    desc: 'The wild stands grafted, walled and tended instead of merely picked over: 3.0 forage/min — and ' +
      'it still needs no well, no road and no lamp, so it is still what feeds you when the counts stop.',
  },
  standingweir: {
    name: 'Standing Weir', tier: 'food', era: 2, w: 1, h: 3, cost: 190, upkeep: 0.14,
    icon: '\u{1F41F}', color: '#5f8fa8', workers: 3, onWater: true,
    out: { fish: 2.4 },
    desc: 'A built weir with sluices and holding pens: 2.4 fish/min, and it fishes through a strike.',
  },

  buddlehouse: {
    name: 'Buddle House', tier: 'food', era: 2, w: 2, h: 3, cost: 235, upkeep: 0.18,
    icon: '\u{1F30A}', color: '#78868f', workers: 3, nearWater: 2, industry: true,
    procIn: 'ore', procOut: 'concentrate', procRate: 3.78, procRatio: 0.45,
    desc: 'Round buddles turned by hand instead of a plank and a bucket: 3.78 ore/min into 1.70 concentrate.',
  },
  cupelfurnace: {
    name: 'Cupellation Furnace', tier: 'food', era: 2, w: 2, h: 2, cost: 340, upkeep: 0.26,
    icon: '\u{1F525}', color: '#a05a33', workers: 4, industry: true,
    mines: true, levied: true,
    procIn: 'concentrate', procOut: 'gold', procRate: 1.70, procRatio: 0.40,
    desc: 'A bone-ash cupel and a forced draught: 1.70 concentrate/min into 0.68 gold. The masters still ' +
      'take 35% of it — every rank you buy on this building, they buy 35% of too.',
  },
  rotarymill: {
    name: 'Rotary Mill', tier: 'food', era: 2, w: 2, h: 2, cost: 150, upkeep: 0.21,
    icon: '\u{1F35E}', color: '#d8bf8f', workers: 4, needsWater: true, industry: true, grainMill: true,
    procIn: 'grain', procOut: 'flour', procRate: 4.2, procRatio: 0.60,
    desc: 'A hopper-rubber turned by a beam and two people leaning on it: 4.2 barley/min into 2.52 rations.',
  },
  retortkiln: {
    name: 'Retort Kiln', tier: 'commerce', era: 2, w: 2, h: 2, cost: 190, upkeep: 0.17,
    icon: '\u{1F311}', color: '#4a443a', workers: 4, industry: true,
    procIn: 'deadwood', procOut: 'charcoal', procRate: 1.26, procRatio: 0.50,
    sells: 'charcoal', sellRate: 0.63, sellPrice: 6.33, custRadius: 5, custMin: 4,
    desc: 'A sealed retort instead of a turfed mound — nothing burns away: 1.26 timber/min into 0.63 charcoal.',
  },
  asphaltworks: {
    name: 'Asphalt Works', tier: 'commerce', era: 2, w: 2, h: 2, cost: 200, upkeep: 0.22,
    icon: '\u{1F6E2}\u{FE0F}', color: '#38352f', workers: 4, industry: true,
    procIn: 'bitumen', procOut: 'pitch', procRate: 1.11, procRatio: 0.55,
    sells: 'pitch', sellRate: 0.42, sellPrice: 9.50, custRadius: 5, custMin: 4,
    desc: 'Settling pans and a stone still: 1.11 bitumen/min into 0.61 pitch. Two Lamp Houses and change.',
  },
  crucibleyard: {
    name: 'Crucible Yard', tier: 'commerce', era: 2, w: 2, h: 2, cost: 300, upkeep: 0.22,
    icon: '\u{1F7EB}', color: '#8f5a38', workers: 4, industry: true,
    procIn: 'malachite', procOut: 'copper', procRate: 2.52, procRatio: 0.35,
    sells: 'copper', sellRate: 0.88, sellPrice: 5.32, custRadius: 5, custMin: 5,
    desc: 'Sealed crucibles and a bellows row: 2.52 malachite/min into 0.88 copper. Still untaxed, still ' +
      'full speed when the picks are down.',
  },
  ashlarfloor: {
    name: 'Ashlar Floor', tier: 'food', era: 2, w: 2, h: 2, cost: 185, upkeep: 0.22,
    icon: '\u{1F528}', color: '#8f887a', workers: 4, industry: true,
    procIn: 'stone', procOut: 'blocks', procRate: 1.26, procRatio: 0.50,
    desc: 'Squared to a template on a levelled floor: 1.26 stone/min into 0.63 blocks.',
  },
  tentweavers: {
    name: "Tent-Weavers' Row", tier: 'commerce', era: 2, w: 2, h: 2, cost: 230, upkeep: 0.25,
    icon: '\u{1F9F5}', color: '#736853', workers: 4, needsWater: true, industry: true,
    procIn: 'wool', procOut: 'cloth', procRate: 1.06, procRatio: 0.50,
    sells: 'cloth', sellRate: 0.53, sellPrice: 7.50, custRadius: 5, custMin: 5,
    desc: 'A row of ground looms under one awning: 1.06 hair/min into 0.53 of sacking.',
  },
  gildinghall: {
    name: 'The Gilding Hall', tier: 'commerce', era: 2, w: 2, h: 2, cost: 385, upkeep: 0.28,
    icon: '\u{1F48D}', color: '#d8b84a', workers: 3, needsWater: true,
    procIn: 'gold', procOut: 'goldleaf', procRate: 0.442, procRatio: 1.30,
    sells: 'goldleaf', sellRate: 0.575, sellPrice: 21.30, custRadius: 6, custMin: 6,
    desc: 'Beaters, burnishers and a locked door: 0.442 gold/min into 0.575 leaf. It draws MORE than one ' +
      'Smelting Hearth retains, so it is the upgrade that only pays once the Hearth is ranked or a second ' +
      'one is lit — the two halves of this chain climb together or not at all.',
  },

  dolehouse: {
    name: 'The Dole House', tier: 'commerce', era: 2, w: 2, h: 2, cost: 225, upkeep: 0.26,
    icon: '\u{1F3E4}', color: '#a87f5a', workers: 3, needsWater: true,
    sells: 'flour', sellRate: 0.91, sellPrice: 4.00, custRadius: 5, custMin: 4,
    desc: 'Issue twice a day off a proper counter and a ledger: 0.91 rations/min out the door.',
  },
  masonsquay: {
    name: "Masons' Quay", tier: 'commerce', era: 2, w: 2, h: 2, cost: 340, upkeep: 0.26,
    icon: '\u{1F9F1}', color: '#b0a68e', workers: 3,
    sells: 'blocks', sellRate: 0.90, sellPrice: 7.45, custRadius: 5, custMin: 5,
    desc: 'Sledges, a ramp and a standing stock: 0.90 dressed blocks/min.',
  },
  pedlarsrow: {
    name: "The Pedlars' Row", tier: 'commerce', era: 2, w: 1, h: 2, cost: 160, upkeep: 0.16,
    icon: '\u{1F6D2}', color: '#a88f6a', workers: 2, needsWater: true,
    sellsRaw: ['ore', 'malachite', 'deadwood', 'bitumen', 'grain', 'stone'],
    sellRate: 2.28, custRadius: 5, custMin: 3,
    desc: 'A whole row of barrows rather than one: clears raw goods at 2.28/min.',
  },

  rockcistern: {
    name: 'Rock-Cut Cistern', tier: 'infra', era: 2, w: 1, h: 1, cost: 120, upkeep: 0.09,
    icon: '\u{1F4A7}', color: '#6fa8c2', waterRadius: 8,

    desc: 'A plastered rock chamber catching the winter melt. Waters a far wider ring than a well, and ' +
      'reaches the terraces no well can.',
  },
  lamprow: {
    name: 'Gallery Lamp-Row', tier: 'infra', era: 2, w: 1, h: 1, cost: 190, upkeep: 0.15,
    icon: '\u{1F3EE}', color: '#d8a04a', workers: 2,
    lampRadius: 13, fuelIn: 'pitch', fuelRate: 0.19,
    desc: 'Lamps set in cut niches the whole length of the drive: mines within 13 tiles work +50%. Burns ' +
      '0.19 pitch/min — one Asphalt Works keeps three of these.',
  },
  sortingfloors: {
    name: 'The Sorting Floors', tier: 'infra', era: 2, w: 2, h: 2, cost: 180, upkeep: 0.18,
    icon: '\u{1FAA8}', color: '#736a5e', workers: 3, depot: true, storeCraft: 22,
    desc: 'Cobbing, bucking and a picking belt of hands: +22 capacity for every mine good, and a supply point.',
  },
  sealedbin: {
    name: 'The Sealed Bin', tier: 'infra', era: 2, w: 1, h: 1, cost: 75, upkeep: 0.03,
    icon: '\u{1F573}\u{FE0F}', color: '#8a7a58', storeGrain: 28, storeFlour: 17,
    desc: 'Lined, lidded and pitched against the damp: 28 barley and 17 rations, and still no mouths.',
  },
  assemblyyard: {
    name: 'The Assembly Yard', tier: 'civic', era: 2, w: 1, h: 1, cost: 85, upkeep: 0.07,
    icon: '\u{1F465}', color: '#c2b294', amenityRadius: 17,
    desc: 'Levelled, walled and swept, with a bench along one side: +1 housing capacity out to 17 tiles. ' +
      'It is also where a strike is decided, which the masters have not thought about.',
  },
  nightsoilrounds: {
    name: 'The Night-Soil Rounds', tier: 'food', era: 2, w: 1, h: 1, cost: 85, upkeep: 0.07,
    icon: '\u{1F5D1}\u{FE0F}', color: '#7a7468', soilRadius: 7,
    desc: 'Collected and carted rather than tipped: fields within 7 tiles recover \u{00D7}3.',
  },
  reckoningpost: {
    name: 'The Reckoning Post', tier: 'civic', era: 2, w: 1, h: 1, cost: 180, upkeep: 0.10,
    icon: '\u{1F4CF}', color: '#b5a68f', workers: 1, keepsTally: true, depot: true,
    desc: 'A notched post, a beam scale and someone who is paid to stand beside them. Keeps the accounts ' +
      'AND counts as a supply point — the tally becomes a weighing station.',
  },
  ridgerelay: {
    name: 'The Ridge Relay', tier: 'infra', era: 2, w: 1, h: 1, cost: 180, upkeep: 0.22,
    icon: '\u{1F3C3}', color: '#8a7050', workers: 2, depot: true, storeCraft: 10,
    desc: 'Two huts and a rotating gang working the track in shifts: a supply point that also holds +10 of ' +
      'every mine good at the head of the incline.',
  },
  countinghouse: {
    name: 'The Counting House', tier: 'civic', era: 2, w: 3, h: 3, cost: 1020, upkeep: 0.29,
    icon: '\u{2696}\u{FE0F}', color: '#c9b47a', workers: 4, needsWater: true, depot: true,
    storeCraft: 41, levyYard: true,

    desc: 'Sealed weights, a duplicate tally and a clerk who keeps a running reserve. It does not lower the ' +
      'quota — it lowers the cliff, by holding the skim that a smaller yard would have spilled.',
  },
  cutstair: {
    name: 'The Cut Stair', tier: 'infra', era: 2, w: 1, h: 1, cost: 60, upkeep: 0.05,
    icon: '\u{1FA9C}', color: '#9a8a6c', onWater: true, bridge: true, depot: true,
    desc: 'Steps cut into the gorge wall with a landing wide enough to set a load down. Carries the road ' +
      'AND counts as a supply point on the far bank.',
  },

  coal: {
    name: 'Coal Plant', tier: 'infra', era: 30, w: 2, h: 2, cost: 800, upkeep: 1.0,
    icon: '\u{1F3ED}', color: '#8d8d99', workers: 4, needsWater: true, industry: true,
    powerRadius: 7,
    desc: 'Generates power in a radius. Industrial-era buildings need it.',
  },
  bakery: {
    name: 'Bakery', tier: 'commerce', era: 30, w: 2, h: 2, cost: 600, upkeep: 0.5,
    icon: '\u{1F956}', color: '#d9b06a', workers: 4, needsWater: true, needsPower: true,
    sells: 'flour', sellRate: 1.0, sellPrice: 9, custRadius: 7, custMin: 8,
    desc: 'Industrial bakery: sells 1 flour/min at $9. Needs power.',
  },
  farm2: {
    name: 'Steam Farm', tier: 'food', era: 30, w: 2, h: 2, cost: 0, upkeep: 0.40,
    icon: '\u{1F69C}', color: '#8fbf5a', workers: 2, needsWater: true, needsPower: true,
    out: { grain: 3.5 }, noBuild: true,
    desc: 'Steam-powered estate: 3.5 grain/min. Needs power.',
  },
};

const HOUSE_CAP_MULT = [0.5, 1.0, 1.75, 2.5, 3.5];
const HOUSE_MAX_LEVEL = HOUSE_CAP_MULT.length;

const HOUSE_GIFT_STEP = 1.0;
function houseCapMult(level) {
  const l = Math.max(1, Math.round(level || 1));
  if (l <= HOUSE_MAX_LEVEL) return HOUSE_CAP_MULT[l - 1];
  return HOUSE_CAP_MULT[HOUSE_MAX_LEVEL - 1] + HOUSE_GIFT_STEP * (l - HOUSE_MAX_LEVEL);
}

function houseMaxLevel(s) {
  return HOUSE_MAX_LEVEL + (((s || G.s) && ((s || G.s).giftHousing | 0)) || 0);
}

const HOUSE_LEVELS = {

  0: ['Scrape', 'Nest Mound', 'Guarded Mound', 'Nest Ring', 'Colony Mound', 'Ancestral Mound'],
  1: ['Windbreak', 'Hide Tent', 'Banked Tent', 'Sunken Hut', 'Winter Hut', "Elder's Hut"],

  2: ['Brush Lean-To', 'Reed-Roof Shelter', 'Stone-Walled House', 'Terrace House',
      "Overseer's House", 'Court House'],

  3: ['Windbreak', 'Brush Shelter', 'Walled Shelter', 'Banked Shelter',
      'Hearth Shelter', "Elder's Shelter"],

  4: ['Reed Hut', 'Mudbrick House', 'Courtyard House', 'Two-Storey House', "Merchant's Compound", 'Anunnaki Hall'],
  5: ['Mud Hut', 'Mudbrick Villa', 'Columned Villa', 'Garden Villa', "Nomarch's House", 'Temple Villa'],

  7: ['Rubble Hut', 'Ashlar House', 'Pier-and-Door House', 'Frescoed House', 'Villa of the Court', 'House of the Sealings'],

  6: ['Reed-Mat Shelter', 'Brick Courtyard House', 'Bathing-Room House',
      'Two-Storey Court House', "Merchant's House", 'Citadel House'],
  14: ['Thatch House', 'Stone House', 'Corbelled House', 'Terraced House', 'Noble Compound', 'Lineage Palace'],
  30: ['Tenement Room', 'Brick Terrace', 'Merchant Townhouse', 'Mansion Flat', 'City Mansion', 'Merchant Palace'],
};

const HOUSE_NEEDS = [
  null,
  { key: 'market',  label: 'Market in range' },
  { key: 'amenity', label: 'Park or temple nearby' },
  { key: 'amenity', label: 'Park or temple nearby' },
  { key: 'amenity', label: 'Park or temple nearby' },
];

function houseLevelName(era, level, d) {
  const rung = rungOf(era);
  let row = d && d.levels;
  if (!row) {
    const keys = Object.keys(HOUSE_LEVELS).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= rung) pick = k;
    row = HOUSE_LEVELS[pick];
  }

  return row[Util.clamp((level || 1) - 1, 0, row.length - 1)];
}

function houseCap(d, b) {
  return Math.max(1, Math.round(d.cap * houseCapMult(b.level || 1)));
}

const MONUMENT_GIFT = {

  0: {
    key: 'seams',
    icon: '\u{1F9B4}',
    title: 'The Nesting Ground',
    lead: 'The sky changes colour, and then it is over.',
    body: 'Nothing you laid out survives — not the nests, not the trail, not the ground itself. What ' +
          'survives is the record: a colony that came back to the same mud year after year and stayed ' +
          'with the eggs. Sixty-six million years from now somebody digs it up and gives it a name.',
    grant: '<b>Every seam of stone in every age after this one runs 25% richer — because this is the ' +
           'age that laid it down.</b>',
    toast: '\u{1F9B4} A nesting ground is preserved. Every seam of stone in every age after this one ' +
           'runs 25% richer.',
    log: 'Their gift: the ground itself. Everything the ladder digs up, this age put down.',
    apply(s) { s.giftSeams = (s.giftSeams | 0) + 1; },
  },

  2: {
    key: 'crew',
    icon: '\u{1F6E0}\u{FE0F}',
    title: 'The Substitute',
    lead: 'The court is levelled and the storerooms are sealed. Nobody comes down to inspect it.',
    body: 'The masters do not punish and they do not stay. Their answer is the one the tablets actually ' +
          'record: let a substitute be made, let it bear the load. They leave behind the clay, the pattern, ' +
          'and the work they no longer intend to do — and the people who were made to carry it are yours now.',
    grant: '<b>Every city you found, in this age and every age after it, arrives with FOUR more ' +
           'people already alive and working.</b>',
    toast: '\u{1F6E0}\u{FE0F} The substitute is made. Every founding party from here on is four backs ' +
           'larger — in this age and in every age after.',
    log: 'Their gift: the load, and the hands to carry it. The founding party is larger from now on.',
    apply(s) { s.giftCrew = (s.giftCrew | 0) + 1; },
  },

  3: {
    key: 'land',
    icon: '\u{1F5FF}',
    title: 'The Ring Is Closed',
    lead: 'The last pillar is set and the ring stands. Nobody was made to raise it.',
    body: 'There is no king here, no granary, no field and no writing. What raised this was several ' +
          'hundred people who did not have to come, fed on meat they hunted and brew they made, working ' +
          'for a reason nobody had to explain to them — and then, having built it, they STAYED. Nobody ' +
          'on this ridge sowed anything. What they invented was not the harvest. It was the address.',
    grant: '<b>Every parcel of ground you ever buy, in this age and every age after it, costs 15% less.</b>',
    toast: '\u{1F5FF} The ring is closed, and the town around it stayed. Ground is 15% cheaper from ' +
           'here on — in this age and in every age after.',
    log: 'Their gift: the address. The first people who did not move on, and every ring of land is ' +
         'cheaper for it.',
    apply(s) { s.giftLand = (s.giftLand | 0) + 1; },
  },
  4: {
    key: 'housing',
    icon: '\u{1F3E0}',
    title: 'The Anunnaki Depart',
    lead: 'The Ziggurat stands. Their work here is done.',
    body: 'From its summit a boat of the sky rises. The teachers who handed your people grain, water and walls ' +
          'are leaving the world to you — and they leave behind the plan of a house nobody here could have drawn.',
    grant: '<b>Every home you ever build, in this age and every age after it, can rise ONE RUNG further ' +
           'than its people could manage alone.</b>',
    toast: '\u{1F3E0} The Anunnaki\'s plan is yours. Housing can now reach one rung past its natural ceiling — ' +
           'in this age and in every age after.',
    log: 'Their gift: the plan of a house beyond anything the city could have drawn for itself.',
    apply(s) { s.giftHousing = (s.giftHousing | 0) + 1; },
  },

  5: {
    key: 'store',
    icon: '\u{1F33E}',
    title: 'The Granaries of the Two Lands',
    lead: 'The Pyramid is closed. The last casing stone is set, and the scribes go back to counting grain.',
    body: 'What outlasts the king is not the mountain on the west bank — it is the ledger. Seven fat years ' +
          'and seven lean ones taught this valley to hold a surplus, and the men who measured the ' +
          'Pyramid measured the harvest first.',
    grant: '<b>Every store you own, in this age and every age after it, holds 25% more — grain, flour, ' +
           'water and craft goods alike.</b>',
    toast: '\u{1F33E} The granary ledger is yours. Every store in this age and every age after it holds ' +
           '25% more.',
    log: 'Their gift: the administration of a surplus — every store the city will ever build holds more.',
    apply(s) { s.giftStore = (s.giftStore | 0) + 1; },
  },

  14: {
    key: 'rank',
    icon: '\u{1F5FF}',
    title: 'The Count Goes On',
    lead: 'The Temple-Pyramid is finished. The last stela is carved, and the date on it runs past the end of the world.',
    body: 'They counted in millions of days — forward past every king who would ever stand here, and back to a ' +
          'morning before the sky was raised. A people who measure that far do not build a thing once. They ' +
          'build it, and cut the date, and build it better, and cut that date too.',
    grant: '<b>Every building you own, in this age and every age after it, can be refined ONE RANK further ' +
           'than its craft would otherwise allow.</b>',
    toast: '\u{1F5FF} The Long Count is yours. Every building can now take one more rank than before — ' +
           'in this age and in every age after.',
    log: 'Their gift: the habit of measuring again — every building can be refined one rank further.',
    apply(s) { s.giftRank = (s.giftRank | 0) + 1; },
  },

  6: {
    key: 'drain',
    icon: '\u{1F6BF}',
    title: 'The Covered Street',
    lead: 'The Bath is sealed. Two courses of fired brick, gypsum mortar, and a damp-course of bitumen between them.',
    body: 'There is no palace in this record, no royal tomb, no army and no name. What this city built ' +
          'instead was a tank the whole town could stand in, a weight that meant the same thing a ' +
          'thousand miles away, and a drain under every street. The tank is what you will be remembered ' +
          'for. The drain is what you actually leave behind.',
    grant: '<b>Every home you ever build, in this age and every age after it, holds ONE MORE RESIDENT — ' +
           'whether or not it stands in a block.</b>',
    toast: '\u{1F6BF} The covered street is yours. Every home in this age and every age after it holds ' +
           'one more resident.',
    log: 'Their gift: the drain under the street — every home the city will ever build holds one more.',
    apply(s) { s.giftDrain = (s.giftDrain | 0) + 1; },
  },

  7: {
    key: 'issue',
    icon: '\u{1F4DC}',
    title: 'The Tablets Are Baked',
    lead: 'The Labyrinth stands. Twelve hundred rooms, five storeys, and not one defensive wall.',
    body: 'Everything in this palace was written down and none of it was meant to last. The tablets ' +
          'are river clay dried in the sun, scraped and reused when the year closed. What you leave ' +
          'is not the building — it is a filing system so complete that when the fire came it baked ' +
          'the year\u2019s accounts hard and handed them, unread, to somebody three thousand years off.',
    grant: '<b>Every magazine you ever build, in this age and every age after it, administers ONE TILE ' +
           'FURTHER.</b>',
    toast: '\u{1F4DC} The tablets are baked. Every magazine reaches one tile further, in this age and ' +
           'every age after it.',
    log: 'Their gift: the fired archive — every magazine the dynasty builds reaches one tile further.',
    apply(s) { s.giftIssue = (s.giftIssue | 0) + 1; },
  },

};
function monumentGift(era) { return MONUMENT_GIFT[rungOf(era)] || null; }

const ERA_POLICY = {

  0: {
    key: 'policyHuddle', icon: '\u{1F995}', name: 'The Huddle',
    tip: 'The colony packs nest to nest: predators take ' +
      Math.round(TUNE.HUDDLE.cullCut * 100) + '% less and every nest holds ' +
      Math.round(TUNE.HUDDLE.capCut * 100) + '% fewer while it lasts. Costs no goods and never runs ' +
      'out. Pull it when the herd is falling; drop it the moment it is safe.',
    on: 'The range closes up. Fewer are taken — and nothing grows while you are bunched.',
    off: 'The colony spreads back out over the floodplain.',
  },

  2: {
    key: 'policyDoubleShift', icon: '\u{26CF}\u{FE0F}', name: 'The Double Shift',
    tip: 'Every mine and hearth works +' + Math.round(TUNE.SHIFT.bonus * 100) + '% — and the people ' +
      'working them go hungry ' + Math.round((TUNE.SHIFT.hungerMult - 1) * 100) + '% faster and grow +' +
      TUNE.SHIFT.unrestPerLevy.toFixed(2) + ' more resentful at every count they miss. Costs no goods and ' +
      'never runs out; it costs PEOPLE.',
    on: 'The shift is doubled. More gold, and they will remember it.',
    off: 'The double shift is lifted. The galleries empty on time again.',
  },

  3: {
    key: 'policyMoveCamps', icon: '\u{26FA}', name: 'The Moving Camp',
    tip: 'The camps stop standing still: every camp\'s territory counts as ' +
      Math.round(TUNE.MOVING.radiusCut * 100) + '% of its range, so crowded camps stop taking each ' +
      'other\'s ground — and every camp works ' + Math.round(TUNE.MOVING.slow * 100) + '% slower, ' +
      'because half the crew is always walking. Costs nothing and never runs out. Useless on a spread ' +
      'town; it is what you pull when the land is full and the next ring is not affordable yet.',
    on: 'The camps come down and go up again a mile on. Less ground shared, less work done.',
    off: 'The camps settle. Full work — now keep them apart yourself.',
  },
  4: {
    key: 'policyBeerRation', icon: '\u{1F37A}', name: 'Beer Ration Decree',
    tip: 'The city drinks ' + (TUNE.BEER_RATION.perResident * TUNE.TEMPO).toFixed(1) +
      ' beer per resident per minute and every building works +' +
      Math.round(TUNE.BEER_RATION.bonus * 100) + '%. Stops the moment the beer runs dry.',
    on: 'The jars go out. Every building works +' + Math.round(TUNE.BEER_RATION.bonus * 100) + '% while the beer lasts.',
    off: 'The ration is stopped. The breweries can stockpile again.',
  },
  5: {
    key: 'policyCorvee', icon: '\u{26CF}\u{FE0F}', name: 'The Corvée',
    tip: 'While the flood is in (AKHET only), the state feeds the idle field hands ' +
      (TUNE.CORVEE.perResident * TUNE.TEMPO).toFixed(1) + ' flour per resident per minute and every ' +
      'building works +' + Math.round(TUNE.CORVEE.bonus * 100) + '%. Costs the thing the city eats, ' +
      'exactly when the fields have stopped. Dead for the rest of the year.',
    on: 'The corvée is called. When Akhet comes, the works get the labour — and the bread.',
    off: 'The corvée is stood down. The flood will be idle time.',
  },

  6: {
    key: 'policySweep', icon: '\u{1F9F9}', name: 'The Sweeping Order',
    tip: 'The drains are swept and re-kerbed daily: every Covered Drain reaches ' +
      TUNE.SWEEP.radius + ' tiles instead of ' + TUNE.GRID.drainRadius + ' — nearly twice the ground — ' +
      'for ' + (TUNE.SWEEP.perDrain * TUNE.TEMPO).toFixed(1) + ' brick per drain per minute. It stops ' +
      'the moment the brick runs dry, and the blocks it was holding stop counting with it.',
    on: 'The sweepers go out. Every drain reaches further, and every rectangle inside the new circles counts.',
    off: 'The order is lifted. The drains go back to ten tiles — check the \u{1F4D0} chip before the streets do.',
  },

  7: {
    key: 'policyWideIssue', icon: '\u{1F4DC}', name: 'The Wide Issue',
    tip: 'The scribes ride further and write more names down: every magazine administers ' +
      TUNE.WIDEISSUE.widen + ' tiles further, and every building on the roll draws ' +
      TUNE.WIDEISSUE.mult + 'x its ration. It stops the moment the oil runs short, and the names ' +
      'it was carrying come off the roll with it.',
    on: 'The order goes out. Every disc widens \u2014 and every ration doubles with it.',
    off: 'The wide issue is lifted. Watch the \u{1F4DC} chip: the outermost quarter may have just come off the roll.',
  },

  14: {
    key: 'policyRation', icon: '\u{1F4A7}', name: 'The Reservoir Ration',
    tip: 'The city draws ' + Math.round(TUNE.RATION.drawCut * 100) + '% less water — and every ' +
      'building works ' + Math.round(TUNE.RATION.slow * 100) + '% slower for it. Costs no goods and ' +
      'never runs out. Turn it on when the tank will not reach the rains, and off the moment they come.',
    on: 'The reservoirs are rationed. Less water drawn, slower work — the city will reach the rains.',
    off: 'The ration is lifted. Full work, full draw — watch the tank.',
  },
};
function eraPolicy(era) { return ERA_POLICY[rungOf(era)] || null; }

function eraImport(era) {
  const rung = rungOf(era);
  const keys = Object.keys(TUNE.ERA_IMPORT).map(Number).sort((a, b) => a - b);
  let pick = keys[0];
  for (const k of keys) if (k <= rung) pick = k;
  return TUNE.ERA_IMPORT[pick];
}

const ERA_ROAD = {

  0: { flavour: 'Game Trail', color: 0xcbbfa6, hw: 0.36,
       desc: 'Where the herd walks the same line twice a day the fern stops coming back and the marl ' +
             'comes up white. Only SOME things need one — nests and the places the surplus is laid ' +
             'down; prairies, shoals, seeps and knolls never do. $10 a tile, nothing to keep.' },

  1: { flavour: 'Snow Track', color: 0x6d6459, hw: 0.31,
       desc: 'Snow trodden through to the frozen loess beneath, staked out with markers so it can be ' +
             'found after a blow. Only SOME buildings need one — homes, stalls and stores must reach the ' +
             'Long Hearth; camps, cutters and weirs never do. $10 a tile, nothing to keep.' },

  2: { flavour: 'Cut Track', color: 0x8a4a33, hw: 0.28,
       desc: 'A path graded into the slope by feet and baskets, red with spoil. Only SOME buildings need ' +
             'one — shelters, the sheds that sell, the stores and the Tribute Yard must reach the ' +
             'Overseer\'s Compound; adits, cuts, camps and wells never do. $10 a tile, nothing to keep.' },

  3: { flavour: 'Ridge Track', color: 0x6b4a35, hw: 0.28,
       desc: 'Feet worn down through the pale limestone to the red dirt beneath, and cairned so it can ' +
             'be followed in a haze. Only SOME buildings need one — shelters, the huts, the shares, the ' +
             'rocks and the posts must reach the Enclosure; camps, stands, groves, quarries and springs ' +
             'never do — and neither does the Carrier\'s Cairn, which is the whole point of it. ' +
             '$10 a tile, nothing to keep.' },
  4: { flavour: 'Beaten Track', color: 0x8a6a3f, hw: 0.30,
       desc: 'Earth packed hard by feet and sledges. Only SOME buildings need one — homes, ' +
             'markets and stores must reach the seat of power; fields, mills, wells and quarries never do. $10 a tile, nothing to keep.' },

  5: { flavour: 'Processional Way', color: 0xf0e8dc, hw: 0.34,
       desc: 'Dressed limestone laid flat and swept white. Egypt built roads to move stone and ' +
             'to walk gods along — wider than a track, and it shows. $10 a tile, nothing to keep.' },

  6: { flavour: 'Paved Street', color: 0x7a3d2a, hw: 0.36,
       desc: 'Fired brick laid on edge in a herringbone, with a covered drain running under the middle ' +
             'of it and inspection slabs every few metres. ★ IN THIS AGE THE STREET COMES FIRST: a ' +
             'rectangle of ground with road on all four sides is a BLOCK, and everything inside it ' +
             'works harder. $10 a tile, nothing to keep.' },

  7: { flavour: 'Palace Road', color: 0xd9d2bd, hw: 0.34,
       desc: 'A causeway of crushed limestone laid between kerbs, running from the palace out to the ' +
             'harbour and up to the summit shrine. ★ IT IS NOT A TRADE ROUTE: there is no market at ' +
             'the end of it. Everything on this road is going to or from a magazine. $10 a tile, ' +
             'nothing to keep.' },
  14: { flavour: 'Sacbé', color: 0xe6e0d2, hw: 0.38,
        desc: 'A raised roadbed of rubble faced with cut stone and finished in white lime plaster — ' +
              'dead straight, and visible from a long way off. With no carts and no draft animals, ' +
              'the road IS the logistics. $10 a tile, nothing to keep.' },
};

function starterFor(era) {
  return TUNE.ERA_STARTER[rungOf(era)] || null;
}

function roadFor(era) {
  const rung = rungOf(era);
  const keys = Object.keys(ERA_ROAD).map(Number).sort((a, b) => a - b);
  let pick = keys[0];
  for (const k of keys) if (k <= rung) pick = k;
  return ERA_ROAD[pick];
}

const MONUMENTS = [
  { id: 'paintedcave', name: 'The Painted Cave', era: 1, cost: 4000,      icon: '\u{1F3A8}', desc: 'Horses and lions on a wall four hundred metres inside the earth, in absolute dark.' },

  { id: 'enclosure', name: 'The Enclosure of the Pillars', era: 3, cost: 3053, icon: '\u{1F5FF}',
    desc: 'T-shaped limestone pillars to five and a half metres and ten tonnes, cut with flint, dragged ' +
      'uphill and set in a ring — with arms, hands and a belt carved on the two at the centre, because ' +
      'they are people.' },
  { id: 'levelledcourt', name: 'The Levelled Court', era: 2, cost: 2330,  icon: '\u{1F3DB}\u{FE0F}', desc: 'A walled precinct with gold-sheathed lintels, storerooms the camp cannot open, and a court levelled flat for something to arrive on.' },
  { id: 'ziggurat',    name: 'Ziggurat',        era: 4,  cost: 4000,      icon: '\u{1F53A}', desc: 'The first temple-mountain. Anchors the Anunnaki economy.' },
  { id: 'pyramid',     name: 'Great Pyramid',   era: 5,  cost: 14000,     icon: '\u{1F3DC}️', desc: 'A mountain of casing stone on the west bank.' },

  { id: 'greatbath',   name: 'The Great Bath',  era: 6,  cost: 8690,      icon: '\u{1F6C1}',
    desc: 'A watertight tank twelve metres by seven, sunk into a brick platform — two courses of fired ' +
      'brick in gypsum mortar with a damp-course of bitumen between them, steps at both ends, and a ' +
      'corbelled outlet drain. The oldest public water tank anyone has excavated.' },

  { id: 'labyrinth',   name: 'The Labyrinth',   era: 7,  cost: 11390,     icon: '\u{1F300}',
    desc: 'Twelve hundred rooms on five storeys round a central court, with light wells, stairs ' +
      'that double back on themselves, and no defensive wall anywhere on the site. Nobody has ' +
      'established what most of it was for.' },
  { id: 'templePyr',   name: 'Temple-Pyramid',  era: 14, cost: 46000,     icon: '\u{1F3EF}', desc: 'Stepped limestone crowned with a roof-comb.' },
  { id: 'temploMayor', name: 'Templo Mayor',    era: 26, cost: 150000,    icon: '⛩️', desc: 'Twin shrines above the sacred precinct.' },
  { id: 'parthenon',   name: 'Parthenon',       era: 10, cost: 480000,    icon: '\u{1F3DB}️', desc: 'Pentelic marble, refined to the millimetre.' },
  { id: 'colosseum',   name: 'Colosseum',       era: 13, cost: 1500000,   icon: '\u{1F3DF}️', desc: 'Concrete vaults seating fifty thousand.' },
  { id: 'cathedral',   name: 'Cathedral',       era: 22, cost: 4600000,   icon: '⛪', desc: 'A lodge of masons, working for a century.' },
  { id: 'duomo',       name: 'Grand Duomo',     era: 28, cost: 14000000,  icon: '\u{1F54C}', desc: 'A dome raised without centring.' },
  { id: 'crystalPal',  name: 'Crystal Palace',  era: 30, cost: 42000000,  icon: '\u{1F3ED}', desc: 'Iron and plate glass, prefabricated.' },
  { id: 'spire',       name: 'Financial Spire', era: 33, cost: 130000000, icon: '\u{1F3E2}', desc: 'The skyline declares the city solvent.' },
  { id: 'dataNexus',   name: 'Data Nexus',      era: 34, cost: 400000000, icon: '\u{1F5A5}️', desc: 'The exchange every network route passes through.' },
  { id: 'orbitalRing', name: 'Orbital Ring',    era: 35, cost: 1.2e9,     icon: '\u{1FA90}', desc: 'A band of steel in geostationary orbit.' },
  { id: 'dysonSwarm',  name: 'Dyson Swarm',     era: 36, cost: 3.6e9,     icon: '☀️', desc: 'Collectors thickening around the star.' },
  { id: 'lookingGlass',name: 'Looking Glass',   era: 37, cost: 1.1e10,    icon: '\u{1F52E}', desc: 'The aperture that edits the rules themselves.' },
];

const MON_TRICKLE_GROWTH = Math.pow(2.6, 12 / 35);
function monumentTrickle(era) {
  return +(5 * Math.pow(MON_TRICKLE_GROWTH, era - 4)).toFixed(2);
}

for (const m of MONUMENTS) {
  const e = m.era;
  BUILDINGS[m.id] = {
    name: m.name, tier: 'monument', era: e, w: 3, h: 3,

    cost: Math.round(m.cost * 0.1), upkeep: +(m.cost * 0.000004).toFixed(3),
    icon: m.icon, color: '#d8c9a0', monument: true, unique: true,

    needsWater: e <= 34,
    trickle: monumentTrickle(e),
    desc: m.desc + ' Once finished it pays $' + Math.round(monumentTrickle(e) * TUNE.TEMPO) +
      '/min, lifts your city\'s ENTIRE income by ' + Math.round(TUNE.MONUMENT_BOOST * 100) +
      '%, and is by far the largest contributor to real rent in this age. It earns nothing until it is topped out.',
  };
}

const RP_WEIGHT = {
  farm: 1.0, estate: 1.4, farm2: 2.0, claypit: 1.0, sheepfold: 1.0, quarry: 1.2,
  mill: 1.6, kiln: 1.6, weaver: 1.8, brewery: 1.6, stonecutter: 1.8,
  market: 2.4, potterystall: 2.6, tavern: 2.4, clothhall: 3.0,
  bazaar: 3.2, stoneyard: 3.4, bakery: 3.0,
  templeGranary: 1.2, granary: 0.8, temple: 0.6, scribe: 0.5, threshing: 0.3,
  house: 0.3, villa: 0.3, stonehouse: 0.3,
  well: 0.1, cistern: 0.15, canalwell: 0.15, aqueduct: 0.2, coal: 1.0,

  dredgecrew: 0.2,
  park: 0.2, midden: 0.2, road: 0,

  datepalm: 1.0, saltpan: 1.0, fishweir: 1.0, sesamefield: 1.0, reedcutter: 1.0,
  oxbyre: 0.8, breadoven: 0.6, rawstall: 1.2, basketweaver: 2.0, oilpress: 2.2,
  dyeworks: 2.8, brickyard: 1.4, storehouse: 0.6, jarcluster: 0.2, shaduf: 0.2,
  runnerpost: 0.3, weighhouse: 1.0, tablethouse: 0.6, woolbureau: 0.6,
  shrine: 0.2, jetty: 0.1, stele: 0, bannerpole: 0, gardenplot: 0,

  emmerfield: 1.0, papyrusmarsh: 1.0, nileclay: 1.0, desertquarry: 1.2,
  palmgrove: 1.0, nilefishery: 1.0,
  winnowingfloor: 0.3, siltspread: 0.2, houseofbooks: 0.5, ferryquay: 0.1,
  quernhouse: 1.6, scriptorium: 1.8, brickfield: 1.6, masonsyard: 1.8,
  scrollmarket: 3.0, brickwharf: 2.6, blockwharf: 2.8,
  basin: 0.2, nomarchgranary: 0.8, obelisk: 0.2,

  hearth: 0.1, longfire: 0.15, icehole: 0.1, cache: 0.2, storepit: 0.6, sleddogpost: 0.3,
  deadwoodcutter: 1.0, reindeerdrive: 1.0, iceweir: 1.0, flintquarry: 1.0, boneyard: 1.0, ochrepit: 1.0,
  foragecamp: 1.0, tendedground: 1.3,
  smokelodge: 2.0, pressurefloor: 2.0, deepcache: 0.4, tradering: 1.8,
  charclamp: 1.6, dryrack: 1.6, tannery: 1.8, knapfloor: 1.6,
  meatstall: 2.4, fuelstack: 2.4, bladestall: 2.6, carverlodge: 2.2, furhall: 2.8, tradepost: 1.2,
  hunterscamp: 0.8, hidetent: 0.3, bonelodge: 0.3,
  danceground: 0.2, shaman: 0.5, firekeeper: 1.0, handprint: 0,
  cenote: 1.0, catchment: 0.6, aguada: 0.5, chultun: 0.3, sacbe: 0,
  milpa: 1.2, raisedfield: 1.2, nixtamal: 1.6, tortillaplaza: 2.6, apiary: 1.0,
  marlpit: 1.0, polykiln: 1.6, vasemarket: 2.6,
  cacaogrove: 1.0, grindinghouse: 1.8, chocolatehouse: 3.4,
  marketplaza: 1.2, tributestore: 0.8, codexhouse: 0.5,
  ashspread: 0.2, terracewall: 0.3, temazcal: 0.2, ballcourt: 0.4,
  stela: 0, copalbrazier: 0,

  prospectpit: 0.5, adit: 1.0, malachitecut: 1.0, limestonecut: 1.0,
  timbercamp: 1.0, goatpen: 1.0, bitumenseep: 1.0, terraceplot: 1.0,
  gatheringground: 1.0, fishtrap: 1.0,
  washingfloor: 1.5, smeltinghearth: 1.8, quernhouse2: 1.6, dressingshed: 1.6,
  charcoalclamp2: 2.0, pitchboilery: 2.1, copperfurnace: 1.7, hairclothshed: 1.8,
  goldsmithbench: 2.8, rationshed: 2.4, blockyard: 2.4, rawbarrow: 1.2,
  shelter: 0.3, rockwell: 0.1, rockcistern: 0.15, lamphouse: 0.2,
  grainpit: 0.2, oreheap: 0.6, overseerpost: 0.3, rockladder: 0.1,

  tributeyard: 0.4, tallystone: 0.5, commonground: 0.2, ashheap: 0.2,
  spoilmarker: 0, stencilledhand: 0,

  deeplevel: 1.3, openstope: 1.3, benchquarry: 1.3, fellinggang: 1.3,
  highpasture: 1.3, tarpits: 1.3, irrigatedbank: 1.3, orchardslope: 1.3,
  standingweir: 1.3, buddlehouse: 1.9, cupelfurnace: 2.2, rotarymill: 2.0,
  retortkiln: 2.4, asphaltworks: 2.5, crucibleyard: 2.1, ashlarfloor: 2.0,
  tentweavers: 2.2, gildinghall: 3.2, dolehouse: 2.8, masonsquay: 2.8,
  pedlarsrow: 1.6, lamprow: 0.3, sortingfloors: 0.8, sealedbin: 0.3,
  assemblyyard: 0.3, nightsoilrounds: 0.3, reckoningpost: 0.7, ridgerelay: 0.4,
  countinghouse: 0.6, cutstair: 0.15,

  brickwell: 0.1, stepwell: 0.15, drain: 0.2, greatdrain: 0.3,
  gridpost: 0.6, surveyoffice: 0.8, riverjetty: 0.1, brickcauseway: 0.2,
  jarrow: 0.2, sealedjarvault: 0.3, balestore: 0.6, sealingrooms: 0.9,
  cartstation: 0.3, cartyard: 0.5, siltditch: 0.2, inundationcut: 0.3,
  brickhouse: 0.3, blockhouse: 0.3,
  bathcourt: 0.2, bathinghall: 0.3, hallstandards: 1.0, weightsoffice: 1.4,
  sealcutter: 0.5, sealarchive: 0.7, greatgranary: 1.2, twinpodium: 1.6,
  claycut: 1.0, cutbank: 1.3, brickkiln: 1.6, doublekiln: 2.0,
  standardyard: 2.6, coursemarket: 3.4,
  cottonfield: 1.0, cottonrows: 1.3, spinnery: 1.8, whorlhall: 2.2,
  balehouse: 3.0, balewharf: 3.8,
  agatecamp: 1.0, agateworkings: 1.3, beadworks: 2.8, drillhall: 3.3,
  beadhouse: 3.0, sealbeadhall: 3.8,
  leveefield: 1.0, inundationfield: 1.3, quernmill: 1.6, millingcourt: 2.0,
  grainstreet: 2.4, grainarcade: 3.1,
  shellbed: 1.0, chankbank: 1.3, banglecourt: 1.8, sawyershall: 2.2,
  banglecounter: 3.0, bangleexchange: 3.8,
  tilfield: 1.0, tilterrace: 1.3, oilmill: 2.2, beammill: 2.6,
  oilrow: 2.8, oilwharf: 3.5,
  canecut: 1.0, canebeds: 1.3, mattingcourt: 2.0, cordagecourt: 2.4,
  cratecounter: 2.4, cratewharf: 3.1,
  brickweir: 1.0, weirpens: 1.3, bergarden: 1.0, berorchard: 1.3,
  zebubyre: 0.8, zebuspan: 1.0,
  unicornseal: 0, peepal: 0,
};
for (const k in RP_WEIGHT) if (BUILDINGS[k]) BUILDINGS[k].rp = RP_WEIGHT[k];

for (const t of ROAD_REQUIRED) if (BUILDINGS[t]) BUILDINGS[t].needsRoad = true;
for (const k in BUILDINGS) if (BUILDINGS[k].monument) BUILDINGS[k].needsRoad = true;

const PLOWED = ['farm', 'estate', 'farm2', 'sesamefield', 'terraceplot', 'irrigatedbank',
                'leveefield', 'inundationfield', 'tilfield', 'tilterrace'];
for (const t of PLOWED) if (BUILDINGS[t]) BUILDINGS[t].plowed = true;

const QUARRIED = ['quarry', 'deepquarry', 'granitequarry', 'desertquarry',
  'gypsumcutter', 'sawpit', 'copperadit', 'deepgallery',
  'flintquarry', 'bonebed', 'deeplens',

  'prospectpit', 'adit', 'deeplevel', 'malachitecut', 'openstope',
  'limestonecut', 'benchquarry',

  'pillarquarry', 'flintdiggings', 'beddingtrench', 'chertadit'];
for (const t of QUARRIED) if (BUILDINGS[t]) BUILDINGS[t].quarried = true;

const MONUMENT_BUILD = {

  paintedcave: { money: 3600, ochre: 900, charcoal: 300, carvings: 100 },

  levelledcourt: { money: 2100, gold: 160, deadwood: 450 },

  enclosure: { money: 2791, stone: 783, carvings: 87, beer: 261 },

  greatbath: { money: 7820, brick: 980, beads: 196 },

  labyrinth: { money: 10250, blocks: 1280, unguent: 214 },
  ziggurat:  { money: 3600, clay: 900, beer: 300 },
  pyramid:   { money: 12000, clay: 2200, stone: 900 },
  templePyr: { money: 40000, stone: 3000, blocks: 1200 },
};

const MONUMENT_RATE = { money: 24, clay: 6, beer: 2, stone: 6, blocks: 3, pottery: 2, cloth: 1,
                        ochre: 6, charcoal: 2, carvings: 1,

                        gold: 1.06, deadwood: 3,

                        brick: 3, beads: 0.6,

                        unguent: 0.5, purplecloth: 0.3, saffron: 0.5,
                        olives: 4, tin: 1, bronze: 0.8 };

function monumentBuild(type, era) {
  return MONUMENT_BUILD[type] || { money: Math.round((BUILDINGS[type] || {}).cost * 0.9) || 1000 };
}

const RANK = {
  max: 4,
  outPerRank: 0.35,
  upkeepPerRank: 0.25,
  radiusPerRank: 1,

  storePerRank: 0.5,
  costBase: 1.0,
  costGrowth: 1.8,
  numerals: ['', '', ' II', ' III', ' IV'],
};

function rankStoreMult(b) { return 1 + RANK.storePerRank * (rankOf(b) - 1); }
function hasStore(d) {
  return !!(d.storeGrain || d.storeFlour || d.storeCraft || d.storeWater ||
            d.storeGame || d.storePemmican || d.depot);
}

function rankUpgradable(d) {
  if (!d) return false;
  if (d.fixed || d.monument) return false;
  if (d.tier === 'beauty') return false;
  if (d.cap) return false;

  if (hasStore(d)) return true;
  if (d.tier === 'civic') return !!(d.capRadius || d.amenityRadius || d.soilRadius ||
                                    d.keepsTally || d.fuelKeeper);

  return !!(d.out || d.procIn || d.sells || d.waterRadius || d.warmRadius || d.lampRadius ||
            d.soilRadius || d.threshing);
}

function rankMax(s) {
  return RANK.max + (((s || G.s) && ((s || G.s).giftRank | 0)) || 0);
}
function rankOf(b) { return Util.clamp(Math.round(b && b.rank || 1), 1, rankMax()); }

function rankOutMult(b) {
  const rateRanks = Math.max(0, rankOf(b) - 1 - (b && b.rankPrice || 0));
  return 1 + RANK.outPerRank * rateRanks;
}
function rankPriceMult(b) {
  return Math.pow(1 + TUNE.RANK_PRICE_BONUS, (b && b.rankPrice || 0));
}
function rankUpkeepMult(b) { return 1 + RANK.upkeepPerRank * (rankOf(b) - 1); }
function rankRadiusBonus(b) { return RANK.radiusPerRank * (rankOf(b) - 1); }
function rankLabel(b) { return RANK.numerals[rankOf(b)] || ''; }

function rankUpCost(d, fromRank) {
  return Math.round((d.cost || 100) * RANK.costBase * Math.pow(RANK.costGrowth, fromRank - 1) / 10) * 10;
}

const UPGRADES = {

  well:      { to: 'cistern',    cost: 160, era: 4, label: 'Cistern' },

  aurochsblind:    { to: 'desertkite',     cost: 200,  era: 3, label: 'The Desert Kite' },
  wildstand:       { to: 'sickleground',   cost: 160,  era: 3, label: 'The Sickle Ground' },
  pillarquarry:    { to: 'beddingtrench',  cost: 170,  era: 3, label: 'The Bedding Trench' },
  flintdiggings:   { to: 'chertadit',      cost: 170,  era: 3, label: 'The Chert Adit' },
  osierbeds:       { to: 'coppicerows',    cost: 160,  era: 3, label: 'The Coppice Rows' },
  stonefishtrap:   { to: 'sluicepens',     cost: 250,  era: 3, label: 'The Sluice Pens' },
  terebinthgrove:  { to: 'nuttingslopes',  cost: 390,  era: 3, label: 'The Nutting Slopes' },
  snailbeds:       { to: 'shellterraces',  cost: 140,  era: 3, label: 'The Shell Terraces' },
  smokingtrench:   { to: 'emberpits',      cost: 194,  era: 3, label: 'The Ember Pits' },
  peggingground:   { to: 'curriersyard',   cost: 233,  era: 3, label: "The Currier's Yard" },
  parchingfloor:   { to: 'grindingslabs',  cost: 194,  era: 3, label: 'The Grinding Slabs' },
  brewvats:        { to: 'troughrow',      cost: 186,  era: 3, label: 'The Trough Row' },
  coreshed:        { to: 'punchfloor',     cost: 202,  era: 3, label: 'The Punch Floor' },
  reliefshed:      { to: 'sculptorsbay',   cost: 171,  era: 3, label: "The Sculptors' Bay" },
  resinhearth:     { to: 'tarhearths',     cost: 202,  era: 3, label: 'The Tar Hearths' },
  cordagewalk:     { to: 'nettingsheds',   cost: 194,  era: 3, label: 'The Netting Sheds' },
  killshare:       { to: 'butchersrock',   cost: 290,  era: 3, label: "The Butchers' Rock" },
  groatshare:      { to: 'mealrows',       cost: 290,  era: 3, label: 'The Meal Rows' },
  hidepost:        { to: 'skinroute',      cost: 370,  era: 3, label: 'The Skin Route' },
  feastground:     { to: 'longfeast',      cost: 260,  era: 3, label: 'The Long Feast' },
  tradersrock:     { to: 'flintroute',     cost: 280,  era: 3, label: 'The Flint Route' },
  beaststones:     { to: 'effigyroute',    cost: 250,  era: 3, label: 'The Effigy Route' },
  resinpost:       { to: 'pitchroute',     cost: 280,  era: 3, label: 'The Pitch Route' },
  barterrock:      { to: 'exchangeslabs',  cost: 160,  era: 3, label: 'The Exchange Slabs' },
  springhead:      { to: 'rockbasin',      cost: 124,  era: 3, label: 'Rock-Cut Basin' },
  sunkensilo:      { to: 'plastervault',   cost: 93,   era: 3, label: 'The Plaster Vault' },
  skintentstore:   { to: 'rackedlofts',    cost: 230,  era: 3, label: 'The Racked Lofts' },
  carriercairn:    { to: 'relaycairns',    cost: 230,  era: 3, label: 'The Relay Cairns' },
  logcrossing:     { to: 'stoneford',      cost: 140,  era: 3, label: 'The Stone Ford' },
  gatheringcircle: { to: 'pillaredcourt',  cost: 93,   era: 3, label: 'The Pillared Court' },
  skullshrine:     { to: 'ancestorniche',  cost: 105,  era: 3, label: 'The Ancestor Niche' },
  boneheap:        { to: 'charredspread',  cost: 105,  era: 3, label: 'The Charred Spread' },
  bonetally:       { to: 'reckoningstone', cost: 230,  era: 3, label: 'The Reckoning Stone' },

  claypit:      { to: 'claybeds',         cost: 220, era: 4, label: 'Levee Clay Beds' },
  sheepfold:    { to: 'woolflock',        cost: 260, era: 4, label: 'Great Flock' },
  saltpan:      { to: 'saltworks',        cost: 240, era: 4, label: 'Salt Boiling Works' },
  reedcutter:   { to: 'reedbeds',         cost: 200, era: 4, label: 'Managed Reed Beds' },
  sesamefield:  { to: 'sesameterrace',    cost: 220, era: 4, label: 'Sesame Terraces' },
  datepalm:     { to: 'palmterrace',      cost: 500, era: 4, label: 'Terraced Orchard' },
  fishweir:     { to: 'fishtraps',        cost: 320, era: 4, label: 'Standing Fish Traps' },
  mill:         { to: 'templemill',       cost: 260, era: 4, label: 'Temple Mill' },
  kiln:         { to: 'updraftkiln',      cost: 260, era: 4, label: 'Updraft Kiln' },
  weaver:       { to: 'loomhouse',        cost: 300, era: 4, label: 'Loom House' },
  brewery:      { to: 'ninkasibrewhouse', cost: 240, era: 4, label: 'Ninkasi Brewhouse' },
  brickyard:    { to: 'firedbrickyard',   cost: 220, era: 4, label: 'Fired-Brick Yard' },
  basketweaver: { to: 'matworks',         cost: 250, era: 4, label: 'Mat & Basket Works' },
  oilpress:     { to: 'beampress',        cost: 340, era: 4, label: 'Beam Press' },
  dyeworks:     { to: 'purplehouse',      cost: 440, era: 4, label: 'Purple Dye House' },
  potterystall: { to: 'potteryhall',      cost: 360, era: 4, label: 'Pottery Hall' },
  clothhall:    { to: 'clothexchange',    cost: 480, era: 4, label: 'Cloth Exchange' },
  tavern:       { to: 'greatalehouse',    cost: 330, era: 4, label: 'Great Alehouse' },
  rawstall:     { to: 'rawmarket',        cost: 210, era: 4, label: 'Raw Goods Row' },
  park:         { to: 'gardencourt',      cost: 120, era: 4, label: 'Garden Court' },
  midden:       { to: 'compostyard',      cost: 140, era: 4, label: 'Compost Yard' },
  shrine:       { to: 'terracedshrine',   cost: 140, era: 4, label: 'Terraced Shrine' },
  breadoven:    { to: 'districtbakehouse', cost: 360, era: 4, label: 'District Bakehouse' },
  weighhouse:   { to: 'silvermint',       cost: 750, era: 4, label: 'Silver Mint' },
  shaduf:       { to: 'chainshaduf',      cost: 180, era: 4, label: 'Chain Shaduf' },
  jarcluster:   { to: 'sealedjarstore',   cost: 120, era: 4, label: 'Sealed Jar Store' },
  templeGranary:{ to: 'greatstorehouse',  cost: 900, era: 4, label: 'Great Storehouse of the É' },
  storehouse:   { to: 'craftwarehouse',   cost: 300, era: 4, label: 'Craft Warehouse' },
  dredgecrew:   { to: 'canalcorps',       cost: 210, era: 4, label: 'Canal Corps' },
  farm:      { to: 'estate',     cost: 280, era: 5, label: 'Estate Farm', legacy: true },
  house:     { to: 'villa',      cost: 220, era: 5, label: 'Villa', legacy: true },
  market:    { to: 'bazaar',     cost: 320, era: 5, label: 'Bazaar', legacy: true },

  cistern:   { to: 'canalwell',  cost: 140, era: 5, label: 'Canal Well', legacy: true },
  villa:     { to: 'stonehouse', cost: 320, era: 14, label: 'Stone House', legacy: true },
  canalwell: { to: 'aqueduct',   cost: 260, era: 14, label: 'Aqueduct', legacy: true },
  estate:    { to: 'farm2',      cost: 400, era: 30, label: 'Steam Farm', legacy: true },

  emmerfield: { to: 'estate',    cost: 400, era: 5, label: 'Estate Farm' },

  papyrusmarsh:  { to: 'papyrusbeds',       cost: 480, era: 5, label: 'Managed Papyrus Beds' },
  nileclay:      { to: 'niledredge',        cost: 460, era: 5, label: 'Nile Dredge Works' },
  desertquarry:  { to: 'granitequarry',     cost: 600, era: 5, label: 'Granite Quarry' },
  palmgrove:     { to: 'palmterracegrove',  cost: 480, era: 5, label: 'Walled Palm Garden' },
  nilefishery:   { to: 'deltafishery',      cost: 500, era: 5, label: 'Delta Fishery' },
  quernhouse:    { to: 'granarymill',        cost: 420, era: 5, label: 'Granary Mill' },
  scriptorium:   { to: 'houseoflife',       cost: 460, era: 5, label: 'House of Life' },
  brickfield:    { to: 'nomebrickworks',   cost: 380, era: 5, label: 'Nome Brickworks' },
  masonsyard:    { to: 'dressingfloor',       cost: 480, era: 5, label: 'Dressing Floor' },
  scrollmarket:  { to: 'greatscrollmarket', cost: 840, era: 5, label: 'Scroll Exchange' },
  brickwharf:    { to: 'greatbrickwharf',   cost: 720, era: 5, label: 'Brick Harbour' },
  blockwharf:    { to: 'greatblockwharf',   cost: 780, era: 5, label: 'Block Harbour' },
  bazaar:        { to: 'greatbazaar',       cost: 750, era: 5, label: 'Grand Bazaar' },
  basin:         { to: 'floodreservoir',        cost: 450, era: 5, label: 'Flood Reservoir' },
  nomarchgranary:{ to: 'royalgranary',      cost: 1050, era: 5, label: 'Royal Granary' },
  granary:       { to: 'greatgranaryeg',    cost: 600, era: 5, label: 'Double Granary' },
  obelisk:       { to: 'greatobelisk',      cost: 330, era: 5, label: 'Paired Obelisks' },
  winnowingfloor:{ to: 'threshingcourt',    cost: 285, era: 5, label: 'Threshing Court' },
  siltspread:    { to: 'marlbeds',   cost: 225, era: 5, label: 'Marl Beds' },
  houseofbooks:  { to: 'templearchive', cost: 480, era: 5, label: 'Temple Archive' },
  ferryquay:     { to: 'stonecauseway',        cost: 225, era: 5, label: 'Stone Causeway' },
  temple:        { to: 'greattemple',       cost: 900, era: 5, label: 'Great Temple' },

  brickwell:     { to: 'stepwell',        cost: 270,  era: 6, label: 'Stepped Well' },
  drain:         { to: 'greatdrain',      cost: 300,  era: 6, label: 'Great Corbelled Drain' },
  gridpost:      { to: 'surveyoffice',    cost: 870,  era: 6, label: "Surveyor's Office" },
  riverjetty:    { to: 'brickcauseway',   cost: 300,  era: 6, label: 'Brick Causeway' },

  claycut:       { to: 'cutbank',         cost: 360,  era: 6, label: 'Levigation Cutbank' },
  cottonfield:   { to: 'cottonrows',      cost: 440,  era: 6, label: 'Irrigated Cotton Rows' },
  agatecamp:     { to: 'agateworkings',   cost: 440,  era: 6, label: 'Chert Ridge Workings' },
  leveefield:    { to: 'inundationfield', cost: 340,  era: 6, label: 'Inundation Field' },
  shellbed:      { to: 'chankbank',       cost: 440,  era: 6, label: 'Chank Dredging Bank' },
  tilfield:      { to: 'tilterrace',      cost: 360,  era: 6, label: 'Banked Til Beds' },
  canecut:       { to: 'canebeds',        cost: 340,  era: 6, label: 'Managed Cane Beds' },
  brickweir:     { to: 'weirpens',        cost: 540,  era: 6, label: 'Sluiced Weir & Pens' },
  bergarden:     { to: 'berorchard',      cost: 840,  era: 6, label: 'Walled Ber Orchard' },

  brickkiln:     { to: 'doublekiln',      cost: 430,  era: 6, label: 'Double-Chamber Kiln' },
  spinnery:      { to: 'whorlhall',       cost: 500,  era: 6, label: 'Whorl Hall' },
  beadworks:     { to: 'drillhall',       cost: 600,  era: 6, label: 'Ernestite Drill Hall' },
  quernmill:     { to: 'millingcourt',      cost: 420,  era: 6, label: 'The Milling Court' },
  banglecourt:   { to: 'sawyershall',     cost: 500,  era: 6, label: "Sawyers' Hall" },
  oilmill:       { to: 'beammill',        cost: 430,  era: 6, label: 'Beam Oil Mill' },
  mattingcourt:  { to: 'cordagecourt',    cost: 430,  era: 6, label: 'Crate & Cordage Court' },

  standardyard:  { to: 'coursemarket',    cost: 600,  era: 6, label: 'Graded Course Market' },
  balehouse:     { to: 'balewharf',       cost: 800,  era: 6, label: 'Bale Wharf' },
  beadhouse:     { to: 'sealbeadhall',    cost: 800,  era: 6, label: 'Seal & Bead Hall' },
  grainstreet:   { to: 'grainarcade',     cost: 630,  era: 6, label: 'Arterial Grain Arcade' },
  banglecounter: { to: 'bangleexchange',  cost: 800,  era: 6, label: 'Bangle Exchange' },
  oilrow:        { to: 'oilwharf',        cost: 810,  era: 6, label: 'Oil Jar Wharf' },
  cratecounter:  { to: 'cratewharf',      cost: 600,  era: 6, label: 'Crate & Mat Wharf' },

  jarrow:        { to: 'sealedjarvault',  cost: 200,  era: 6, label: 'Sealed Jar Vault' },
  balestore:     { to: 'sealingrooms', cost: 500,  era: 6, label: 'The Sealing Rooms' },
  cartstation:   { to: 'cartyard',        cost: 500,  era: 6, label: 'Bullock-Cart Yard' },
  bathcourt:     { to: 'bathinghall',     cost: 230,  era: 6, label: 'Great Bathing Court' },
  hallstandards: { to: 'weightsoffice',   cost: 1250, era: 6, label: 'Office of Weights & Measures' },
  sealcutter:    { to: 'sealarchive',     cost: 500,  era: 6, label: 'Seal Archive' },
  greatgranary:  { to: 'twinpodium',      cost: 2250, era: 6, label: 'Twin-Podium Granary' },
  siltditch:     { to: 'inundationcut',   cost: 230,  era: 6, label: 'Inundation Cut' },
  zebubyre:      { to: 'zebuspan',        cost: 1010, era: 6, label: 'Great Zebu Span' },

  springhouse:   { to: 'conduithouse',    cost: 270,  era: 7, label: 'The Conduit House' },
  stonemole:     { to: 'harbourarm',      cost: 520,  era: 7, label: 'Harbour Arm' },
  pithosrow:     { to: 'capstonevault',   cost: 340,  era: 7, label: 'The Capstone Vault' },
  stirrupstore:  { to: 'cordedracks',     cost: 860,  era: 7, label: 'The Corded Racks' },
  mulepost:      { to: 'caravanyard',     cost: 860,  era: 7, label: 'Caravan Yard' },
  ovencourt:     { to: 'bakequarter',     cost: 340,  era: 7, label: 'Bake-House Quarter' },

  amurcapits:    { to: 'foldingground',   cost: 380,  era: 7, label: 'The Folding Ground' },

  emmerplot:     { to: 'temenosfield',    cost: 420,  era: 7, label: 'Temenos Field' },
  figorchard:    { to: 'vinefiggarden',   cost: 1080, era: 7, label: 'Vine and Fig Garden' },
  seinenet:      { to: 'tunnywatch',      cost: 680,  era: 7, label: 'Tunny Watch' },
  oliveterrace:  { to: 'graftedgrove',    cost: 480,  era: 7, label: 'Grafted Grove' },
  crocusmeadow:  { to: 'pickingfloors',   cost: 420,  era: 7, label: 'The Picking Floors' },
  hillpasture:   { to: 'transhumancerun', cost: 560,  era: 7, label: 'Transhumance Run' },
  copperadit:    { to: 'deepgallery',     cost: 1980, era: 7, label: 'Deep Gallery' },
  tinlanding:    { to: 'merchantquay',    cost: 860,  era: 7, label: 'Merchantman Quay' },
  claybank:      { to: 'levigationpits',  cost: 480,  era: 7, label: 'Levigation Pits' },
  gypsumcutter:  { to: 'sawpit',          cost: 1280, era: 7, label: 'The Saw-Pit' },

  palacemill:    { to: 'querncolonnade',  cost: 890,  era: 7, label: 'Quern Colonnade' },
  pressroom:     { to: 'windlasshouse',   cost: 990,  era: 7, label: 'The Windlass House' },
  perfumery:     { to: 'unguentboilery',  cost: 1060, era: 7, label: 'Unguent Boilery' },
  spinningshed:  { to: 'weavinghall',     cost: 1060, era: 7, label: 'Weaving Hall' },
  purplevat:     { to: 'dyerstanks',      cost: 1140, era: 7, label: 'Dyer\'s Tanks' },
  bronzefoundry: { to: 'smithscourt',     cost: 1200, era: 7, label: 'Smiths\' Court' },
  wheelshop:     { to: 'pottersquarter',  cost: 920,  era: 7, label: 'Potters\' Quarter' },
  ashlaryard:    { to: 'masonslodge',     cost: 1350, era: 7, label: 'Masons\' Lodge' },

  villamagazine: { to: 'sealedcellar',    cost: 820,  era: 7, label: 'Sealed Cellar' },
  outmagazine:   { to: 'chariotdepot',    cost: 1380, era: 7, label: 'Chariot Depot' },
  palacemagazine: { to: 'sealingwing',    cost: 2660, era: 7, label: 'The Sealing Wing' },

  tabletarchive: { to: 'scribalschool',   cost: 900,  era: 7, label: 'Scribal School' },
  sealoffice:    { to: 'houseofstandards', cost: 1180, era: 7, label: 'House of Standards' },
  theatralcourt: { to: 'grandstaircase',  cost: 360,  era: 7, label: 'Grand Staircase' },

  cenote:        { to: 'deepcenote',        cost: 1120, era: 14, label: 'Deep Cenote Stair' },
  milpa:         { to: 'swiddenfield',      cost: 1000, era: 14, label: 'Swidden Field' },
  raisedfield:   { to: 'chinampa',          cost: 1200, era: 14, label: 'Chinampa Bed' },
  apiary:        { to: 'hiverow',       cost: 1120, era: 14, label: 'Stacked Hive Row' },
  quarry:        { to: 'deepquarry',        cost: 1380, era: 14, label: 'Terraced Quarry' },
  marlpit:       { to: 'marlworks',         cost: 1060, era: 14, label: 'Marl Works' },
  cacaogrove:    { to: 'cacaoterrace',      cost: 1520, era: 14, label: 'Shaded Cacao Walk' },
  nixtamal:      { to: 'limehouse',    cost: 970,  era: 14, label: 'Lime House' },
  stonecutter:   { to: 'sculptorscourt',       cost: 1100, era: 14, label: 'Sculptors\' Court' },
  polykiln:      { to: 'twinkiln',          cost: 875,  era: 14, label: 'Twin-Chamber Kiln' },
  grindinghouse: { to: 'frothhouse',        cost: 1590, era: 14, label: 'Frothing House' },
  tortillaplaza: { to: 'masaarcade',    cost: 1725, era: 14, label: 'Masa Arcade' },
  stoneyard:     { to: 'blockexchange',     cost: 1800, era: 14, label: 'Cut-Stone Exchange' },
  vasemarket:    { to: 'polychromegallery', cost: 1905, era: 14, label: 'Painters\' Gallery' },
  chocolatehouse:{ to: 'cacaocourt',        cost: 2550, era: 14, label: 'Cacao Court' },
  marketplaza:   { to: 'tributeplaza',      cost: 1110, era: 14, label: 'Tribute Arcade' },
  chultun:       { to: 'bottlecistern',      cost: 600,  era: 14, label: 'Bottle Cistern' },
  aqueduct:      { to: 'raisedchannel',     cost: 780,  era: 14, label: 'Raised Channel' },
  sacbe:         { to: 'whiteroad',        cost: 60,   era: 14, label: 'White Road' },
  ashspread:     { to: 'burnbeds',    cost: 520,  era: 14, label: 'Burn Beds' },
  terracewall:   { to: 'hillsidesteps',      cost: 660,  era: 14, label: 'Hillside Steps' },
  temazcal:      { to: 'vaultedbath',     cost: 760,  era: 14, label: 'Vaulted Bath' },
  ballcourt:     { to: 'ringcourt',    cost: 2100, era: 14, label: 'Ring Court' },
  tributestore:  { to: 'royaltreasury', cost: 2415, era: 14, label: 'Royal Treasury' },
  codexhouse:    { to: 'scribalacademy',   cost: 1110, era: 14, label: 'Scribal Academy' },
  stonehouse:    { to: 'plasterrange',   cost: 1050, era: 14, label: 'Plaster Range' },
  catchment: { to: 'aguada',     cost: 1150, era: 14, label: 'Aguada Reservoir' },

  fernprairie:     { to: 'deepbrake',     cost: 72,  era: 0, label: 'The Deep Brake' },
  coccolithshoal:  { to: 'bloomshelf',    cost: 80,  era: 0, label: 'The Bloom Shelf' },
  resinconifer:    { to: 'bledgrove',     cost: 94,  era: 0, label: 'The Bled Grove' },
  horsetailmarsh:  { to: 'oxbowbed',      cost: 72,  era: 0, label: 'The Oxbow Bed' },
  bonebed:         { to: 'deeplens',      cost: 86,  era: 0, label: 'The Deep Lens' },
  magnoliathicket: { to: 'blossomfall',   cost: 180, era: 0, label: 'The Blossom Fall' },
  rotwoodbed:      { to: 'sunklog',       cost: 116, era: 0, label: 'The Sunk Log' },
  grazinglawn:     { to: 'trampleflat',   cost: 90,  era: 0, label: 'The Trample Flat' },
  chalkbank:       { to: 'whitecliff',    cost: 94,  era: 0, label: 'The White Cliff' },
  amberseep:       { to: 'slowwound',     cost: 108, era: 0, label: 'The Slow Wound' },
  clutchmound:     { to: 'broodbank',     cost: 87,  era: 0, label: 'The Brood Bank' },
  mineralseep:     { to: 'silicaspring',  cost: 94,  era: 0, label: 'The Silica Spring' },
  peatswamp:       { to: 'sunkenmire',    cost: 90,  era: 0, label: 'The Sunken Mire' },
  leafmat:         { to: 'blackmud',      cost: 135, era: 0, label: 'The Black Mud' },
  chalkdowns:      { to: 'marlfloor',     cost: 131, era: 0, label: 'The Marl Floor' },
  amberbed:        { to: 'buriedfall',    cost: 174, era: 0, label: 'The Buried Fall' },
  eggbed:          { to: 'floodlayer',    cost: 120, era: 0, label: 'The Flood Layer' },
  channellag:      { to: 'scourpool',     cost: 77,  era: 0, label: 'The Scour Pool' },
  petrifiedbar:    { to: 'stoneforest',   cost: 131, era: 0, label: 'The Stone Forest' },
  waterhole:       { to: 'seep',          cost: 33,  era: 0, label: 'Spring Seep' },
  logjam:          { to: 'driftbank',     cost: 108, era: 0, label: 'The Drift Bank' },
  wallow:          { to: 'churnedhollow', cost: 44,  era: 0, label: 'The Churned Hollow' },
  sentinelknoll:   { to: 'watchrise',     cost: 50,  era: 0, label: 'The Watch Rise' },
  carrionground:   { to: 'openkill',      cost: 218, era: 0, label: 'The Open Kill' },
  refuge:          { to: 'siltbank',      cost: 488, era: 0, label: 'The Silt Bank' },

  hearth:   { to: 'longfire',  cost: 160, era: 1, label: 'Longfire & Melt Row' },

  foragecamp: { to: 'tendedground',  cost: 190, era: 1, label: 'Tended Ground' },
  dryrack:    { to: 'smokelodge',    cost: 260, era: 1, label: 'Smoke Lodge' },
  knapfloor:  { to: 'pressurefloor', cost: 250, era: 1, label: 'Pressure-Flake Floor' },
  cache:      { to: 'deepcache',     cost: 150, era: 1, label: 'Deep Cache' },
  tradepost:  { to: 'tradering',     cost: 210, era: 1, label: 'Trade Ring' },

  hunterscamp:   { to: 'spearlodge',   cost: 260, era: 1, label: 'Spear Lodge' },
  spearlodge:    { to: 'mammothblind', cost: 400, era: 1, label: 'Mammoth Blind' },
  mammothblind:  { to: 'catlodge',     cost: 620, era: 1, label: 'Sabretooth Lodge' },

  prospectpit:    { to: 'adit',            cost: 45,   era: 2, label: 'Adit' },
  adit:           { to: 'deeplevel',       cost: 180,  era: 2, label: 'The Deep Level' },
  malachitecut:   { to: 'openstope',       cost: 160,  era: 2, label: 'Open Stope' },
  limestonecut:   { to: 'benchquarry',     cost: 170,  era: 2, label: 'Bench Quarry' },
  timbercamp:     { to: 'fellinggang',     cost: 170,  era: 2, label: 'Felling Gang' },
  bitumenseep:    { to: 'tarpits',         cost: 170,  era: 2, label: 'The Tar Pits' },
  goatpen:        { to: 'highpasture',     cost: 155,  era: 2, label: 'High Pasture' },
  terraceplot:    { to: 'irrigatedbank',   cost: 120,  era: 2, label: 'Irrigated Bank' },
  gatheringground:{ to: 'orchardslope',    cost: 110,  era: 2, label: 'Orchard Slope' },
  fishtrap:       { to: 'standingweir',    cost: 190,  era: 2, label: 'Standing Weir' },
  washingfloor:   { to: 'buddlehouse',     cost: 235,  era: 2, label: 'Buddle House' },
  smeltinghearth: { to: 'cupelfurnace',    cost: 340,  era: 2, label: 'Cupellation Furnace' },
  quernhouse2:    { to: 'rotarymill',      cost: 150,  era: 2, label: 'Rotary Mill' },
  charcoalclamp2: { to: 'retortkiln',      cost: 190,  era: 2, label: 'Retort Kiln' },
  pitchboilery:   { to: 'asphaltworks',    cost: 200,  era: 2, label: 'Asphalt Works' },
  copperfurnace:  { to: 'crucibleyard',    cost: 300,  era: 2, label: 'Crucible Yard' },
  dressingshed:   { to: 'ashlarfloor',     cost: 185,  era: 2, label: 'Ashlar Floor' },
  hairclothshed:  { to: 'tentweavers',     cost: 230,  era: 2, label: "Tent-Weavers' Row" },
  goldsmithbench: { to: 'gildinghall',     cost: 385,  era: 2, label: 'The Gilding Hall' },
  rationshed:     { to: 'dolehouse',       cost: 225,  era: 2, label: 'The Dole House' },
  blockyard:      { to: 'masonsquay',      cost: 340,  era: 2, label: "Masons' Quay" },
  rawbarrow:      { to: 'pedlarsrow',      cost: 160,  era: 2, label: "The Pedlars' Row" },
  rockwell:       { to: 'rockcistern',     cost: 95,   era: 2, label: 'Rock-Cut Cistern' },
  lamphouse:      { to: 'lamprow',         cost: 190,  era: 2, label: 'Gallery Lamp-Row' },
  oreheap:        { to: 'sortingfloors',   cost: 180,  era: 2, label: 'The Sorting Floors' },
  grainpit:       { to: 'sealedbin',       cost: 75,   era: 2, label: 'The Sealed Bin' },
  commonground:   { to: 'assemblyyard',    cost: 85,   era: 2, label: 'The Assembly Yard' },
  ashheap:        { to: 'nightsoilrounds', cost: 85,   era: 2, label: 'The Night-Soil Rounds' },
  tallystone:     { to: 'reckoningpost',   cost: 180,  era: 2, label: 'The Reckoning Post' },
  overseerpost:   { to: 'ridgerelay',      cost: 180,  era: 2, label: 'The Ridge Relay' },
  tributeyard:    { to: 'countinghouse',   cost: 1020, era: 2, label: 'The Counting House' },
  rockladder:     { to: 'cutstair',        cost: 60,   era: 2, label: 'The Cut Stair' },
};

const UPGRADE_TARGETS = (function () {
  const t = new Set();
  for (const from in UPGRADES) {
    const u = UPGRADES[from], a = BUILDINGS[from], b = BUILDINGS[u.to];
    if (!a || !b || u.legacy) continue;
    if (defEra(a) !== defEra(b)) continue;
    t.add(u.to);
    b.noBuild = true;
  }
  return t;
})();

const TERRA_TOOLS = [
  { kind: 'grass',    icon: '\u{1F331}', name: 'Grass' },
  { kind: 'fertile',  icon: '\u{1F33E}', name: 'Fertile' },
  { kind: 'water',    icon: '\u{1F30A}', name: 'Water' },
  { kind: 'rock',     icon: '\u{1FAA8}', name: 'Rock' },
  { kind: 'mountain', icon: '⛰️', name: 'Mountain' },
  { kind: 'tree',     icon: '\u{1F333}', name: 'Tree' },
];

const PALETTE_TABS = [
  { key: 'tools',    name: 'Tools',    items: [] },
  { key: 'terra',    name: 'Terraform', items: [] },
  { key: 'infra',    name: 'Infrastructure', items: ['road', 'well', 'cistern', 'canalwell', 'aqueduct', 'granary', 'coal'] },
  { key: 'food',     name: 'Food & Industry', items: ['farm', 'estate', 'threshing', 'midden', 'mill', 'brewery',
                                                      'claypit', 'kiln', 'sheepfold', 'weaver', 'quarry', 'stonecutter'] },
  { key: 'housing',  name: 'Housing',  items: ['house', 'villa', 'stonehouse'] },
  { key: 'commerce', name: 'Commerce', items: ['market', 'tavern', 'potterystall', 'clothhall', 'bazaar', 'stoneyard', 'bakery'] },
  { key: 'civic',    name: 'Civic',    items: ['park', 'scribe', 'templeGranary', 'temple'] },

];

function upgradeSourceOf(type) {
  let legacySrc = null;
  for (const from in UPGRADES) {
    if (UPGRADES[from].to !== type) continue;
    if (!UPGRADES[from].legacy) return from;
    if (!legacySrc) legacySrc = from;
  }
  return legacySrc;
}
function paidCost(type) {
  const seen = new Set([type]);
  let cur = type, sum = 0;
  while (BUILDINGS[cur] && BUILDINGS[cur].noBuild) {
    const src = upgradeSourceOf(cur);
    if (!src || seen.has(src)) break;
    sum += UPGRADES[src].cost || 0;
    seen.add(src);
    cur = src;
  }
  const base = BUILDINGS[cur] && BUILDINGS[cur].cost;
  return (base != null ? base : 100) + sum;
}

function DEF(type) { return BUILDINGS[type]; }

(function scaleForTempo() {
  const T = TUNE.TEMPO, S = TUNE.SPEEDUP;
  if (T !== 1) {

    const capKeys = Object.keys(TUNE).filter(k => /_CAP$/.test(k));
    for (const k of capKeys.concat(['GRANARY_GRAIN', 'GRANARY_FLOUR'])) {
      TUNE[k] = Math.round(TUNE[k] * T);
    }
    TUNE.FOUNDING.purse = Math.round(TUNE.FOUNDING.purse * T);

    TUNE.IMPORT_GRAIN.units = Math.round(TUNE.IMPORT_GRAIN.units * T);
    for (const m in MONUMENT_BUILD) {
      for (const kind in MONUMENT_BUILD[m]) {
        MONUMENT_BUILD[m][kind] = Math.round(MONUMENT_BUILD[m][kind] * T);
      }
    }

    for (const k in TUNE.START_STOCK) TUNE.START_STOCK[k] = Math.round(TUNE.START_STOCK[k] * T);

    for (const k in BUILDINGS) {
      const d = BUILDINGS[k];
      if (d.storeGrain) d.storeGrain = Math.round(d.storeGrain * T);
      if (d.storeFlour) d.storeFlour = Math.round(d.storeFlour * T);
      if (d.storeCraft) d.storeCraft = Math.round(d.storeCraft * T);

      if (d.storeWater) d.storeWater = Math.round(d.storeWater * T);

      if (d.storeGame) d.storeGame = Math.round(d.storeGame * T);
      if (d.storePemmican) d.storePemmican = Math.round(d.storePemmican * T);
    }

    if (BUILDINGS.granary) {
      BUILDINGS.granary.desc = 'Storage: +' + BUILDINGS.granary.storeGrain + ' grain and +' +
        BUILDINGS.granary.storeFlour + ' flour capacity while connected.';
    }
  }

  if (S > 1) {
    TUNE.SOIL.saltMinutes = Math.max(60, Math.round(TUNE.SOIL.saltMinutes / 3.3));
    TUNE.SOIL.fallowMinutes = Math.max(40, Math.round(TUNE.SOIL.fallowMinutes / 3.3));
  }

  if (T !== 1) {

    TUNE.STARVE_MINUTES = Math.max(6, TUNE.STARVE_MINUTES / T);
    TUNE.HUNGER_RECOVER = Math.min(0.1, TUNE.HUNGER_RECOVER * T);

    TUNE.COLD.freezeMinutes = Math.max(TUNE.COLD.freezeFloor, TUNE.COLD.freezeMinutes / T);
    TUNE.COLD.recover = Math.min(0.1, TUNE.COLD.recover * T);
  }
})();

function gateMult() { return TUNE.TEMPO / TUNE.SPEEDUP; }

const FOOD_EFF = (function () {
  const m = Object.create(null);
  for (const f of TUNE.FOODS) m[f.kind] = f.eff;
  return m;
})();
function foodEff(kind) { return FOOD_EFF[kind] || 0; }

const FOOD_CHAIN = (function () {
  const m = Object.create(null);
  for (const k in FOOD_EFF) m[k] = 1;
  for (const key in BUILDINGS) {
    const d = BUILDINGS[key];
    if (d.procIn && foodEff(d.procOut) > 0) m[d.procIn] = 1;
  }
  return m;
})();
function inFoodChain(kind) { return !!kind && !!FOOD_CHAIN[kind]; }

function auditDataTables() {
  const bad = [];
  const say = m => bad.push(m);

  for (const rung in TUNE.ERA_STARTER) {
    const k = TUNE.ERA_STARTER[rung], d = BUILDINGS[k];
    if (!d) say('ERA_STARTER[' + rung + '] = "' + k + '" is not a building');
    else if (defEra(d) !== +rung)
      say('ERA_STARTER[' + rung + '] = "' + k + '" is era ' + defEra(d) +
          ' — a rung-' + rung + ' city can never build it, so the crew is held forever');
  }

  for (const k in TUNE.PRICES)
    if (!(k in TUNE.START_STOCK)) say('good "' + k + '" is in PRICES but not START_STOCK (NaN on first addStock)');
  for (const k in TUNE.START_STOCK)
    if (!(k in TUNE.PRICES)) say('good "' + k + '" is in START_STOCK but has no price');

  for (const g in TUNE.PRICES)
    if (TUNE[g.toUpperCase() + '_CAP'] === undefined)
      say('good "' + g + '" has no TUNE.' + g.toUpperCase() + '_CAP — capOf falls back to 30 ' +
          'and scaleForTempo has nothing to scale');
  for (const k in TUNE)
    if (/_CAP$/.test(k) && !(k.slice(0, -4).toLowerCase() in TUNE.PRICES))
      say('TUNE.' + k + ' ends in _CAP but "' + k.slice(0, -4).toLowerCase() +
          '" is not a good — scaleForTempo multiplies it by TEMPO on that suffix alone');

  {
    const quarriedGoods = new Set();
    for (const k in BUILDINGS) {
      const d = BUILDINGS[k];
      if (d.quarried && d.out) for (const g in d.out) quarriedGoods.add(g);
    }
    for (const k in BUILDINGS) {
      const d = BUILDINGS[k];
      if (d.quarried) continue;
      if (d.rockRadius)
        say(k + ' declares rockRadius but is not in QUARRIED — it works the finite ROCK ledger ' +
            'and would never deplete it');
      if (d.out) for (const g in d.out) if (quarriedGoods.has(g))
        say(k + ' emits "' + g + '", which quarried buildings take out of the finite ROCK ledger, ' +
            'but is not in QUARRIED — it would mint that good out of nothing');
    }
  }

  for (const key in BUILDINGS) {
    const d = BUILDINGS[key];
    if (d.sells && !(d.sellPrice > 0) && !TUNE.PRICES[d.sells])
      say(key + ' sells "' + d.sells + '" with no sellPrice and no list price — income would be NaN');
    if (d.sells && !(d.sellRate > 0)) say(key + ' declares sells but no sellRate');
    if (d.procIn && !(d.procRate > 0 && d.procOut && d.procRatio > 0))
      say(key + ' declares procIn but is missing procRate/procOut/procRatio');
    if (d.out) for (const g in d.out) if (!(g in TUNE.PRICES)) say(key + ' outputs unpriced good "' + g + '"');
  }

  for (const from in UPGRADES) {
    const u = UPGRADES[from], a = BUILDINGS[from], b = BUILDINGS[u.to];
    if (!a) { say('UPGRADES has no source building "' + from + '"'); continue; }
    if (!b) { say('UPGRADES["' + from + '"] targets missing building "' + u.to + '"'); continue; }

    if (a.w !== b.w || a.h !== b.h)
      say(from + ' -> ' + u.to + ' RESIZES ' + a.w + 'x' + a.h + ' -> ' + b.w + 'x' + b.h +
          ' (structural rule 5: an upgrade must not demand ground you did not commit)');

    if (!u.legacy && defEra(u) !== defEra(a))
      say(from + ' (era ' + defEra(a) + ') -> ' + u.to + ' is tagged era ' + defEra(u) +
          ' — under the prestige turn this upgrade can never fire');

    if (!u.legacy && defEra(a) === defEra(b) && !b.noBuild)
      say(from + ' -> ' + u.to + ' is an in-era upgrade target but is still PURCHASABLE ' +
          '(noBuild not set) — it can be bought outright instead of earned');
  }

  const nrm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');

  {
    const byName = {};
    for (const key in BUILDINGS) {
      const n = nrm(BUILDINGS[key].name);
      if (!n) continue;
      (byName[n] = byName[n] || []).push(key);
    }
    for (const n in byName)
      if (byName[n].length > 1)
        say('display name "' + BUILDINGS[byName[n][0]].name + '" is shared by ' +
            byName[n].join(' and ') + ' — two buildings cannot answer to one name');
  }

  {
    const homesOf = {};
    for (const key in BUILDINGS) {
      const d = BUILDINGS[key];
      if (!d.cap) continue;
      (homesOf[defEra(d)] = homesOf[defEra(d)] || []).push(key);
    }
    for (const era in homesOf) {
      const shared = homesOf[era].filter(k => !BUILDINGS[k].levels);
      if (homesOf[era].length > 1 && shared.length > 1)
        say('era ' + era + ' housing ' + shared.join(' + ') + ' share ONE HOUSE_LEVELS ' +
            'ladder — each will be renamed into the other as it climbs its rungs. ' +
            'Give all but one its own `levels` row.');
    }
  }

  for (const from in UPGRADES) {
    const t = BUILDINGS[UPGRADES[from].to], a = BUILDINGS[from];
    if (a && t && nrm(a.name) === nrm(t.name))
      say(from + ' -> ' + UPGRADES[from].to + ' produces a building with the SAME ' +
          'name "' + a.name + '"');
  }

  {
    for (const rung of WRITTEN_RUNGS) {
      const defs = Object.keys(BUILDINGS).map(k => BUILDINGS[k]).filter(d => defEra(d) === rung);
      const salts = defs.some(d => d.out && (d.out.grain || d.slowSalt));
      if (!salts) continue;
      const v = eraVoice(rung);
      if (!v || !v.saltAnswers)
        say('rung ' + rung + ' salts its own ground (a d.out.grain producer) but eraVoice(' + rung +
            ') has no `saltAnswers` — Econ.soilTick\'s crisis toast prints "undefined" to the player');
      if (!defs.some(d => d.soilRadius) && !defs.some(d => d.saltProof))
        say('rung ' + rung + ' salts its own ground and has NEITHER a `soilRadius` manuring ' +
            'building NOR a `saltProof` crop — the staple fades to TUNE.SOIL.minYield with no answer');
    }
  }

  if (bad.length) {
    console.warn('EPOCH DATA INTEGRITY — ' + bad.length + ' problem(s):');
    for (const m of bad) console.warn('  · ' + m);
  }
  return bad;
}

const ERA_FOOD_LABEL = { 7: 'Meal issued this age',
                         0: 'Forage laid down this age',
                         1: 'Food put by this age', 2: 'Rations milled this age',
                         3: 'Food gathered this age',
                         4: 'Flour milled this age',
                         5: 'Flour milled this age',
                         6: 'Flour milled this age', 14: 'Food ground this age' };
function eraFoodLabel(era) { return ERA_FOOD_LABEL[rungOf(era)] || 'Food produced this age'; }

const ERA_VOICE = {
  0: {

    settlers: ['Pale-Crest', 'Broken-Frill', 'Long-Stride', 'Ash-Back', 'Two-Notch', 'Mud-Foot'],
    place: 'range',
    mill: 'Grazing Lawn',
    tally: 'the record in the mud',
    tallyLine: 'Nothing here writes anything down. The record is the ground: every layer you lay is ' +
      'counted, and it will still be there in ninety million years.',
    ration: 'The last of what the range arrived carrying is gone. It feeds itself now.',

    saltName: 'ground the ash has buried',
    saltAnswers: 'or leave it, and let the next flood lay new silt over it',
  },
  1: {

    settlers: ['Flint-Hand', 'Antler', 'Ochre', 'Ash-Foot', 'Long-Shadow', 'Cold-Water'],
    place: 'camp',
    mill: 'Drying Rack',
    tally: "Shaman's Tent",
    tallyLine: 'The count is cut into bone. The shaman keeps the tally of the season — and now ' +
      'you can read your own numbers.',
    ration: 'The founding stores are finished — the last of the dried meat is issued.',

    saltName: 'ground worked out from under you',
    saltAnswers: 'or leave it to lie until it comes back on its own',
  },
  2: {

    settlers: ['Bent-Back', 'Ash-Palm', 'Ninth-Gallery', 'Cold-Water', 'Red-Hand', 'Short-Measure'],
    place: 'camp',
    mill: 'Saddle-Quern Shed',
    tally: 'Tally Stone',
    tallyLine: 'The notches are cut and the count is kept. It is the masters\' tally — but a tally read ' +
      'both ways is a tally you can read too.',
    ration: 'The founding issue is finished — the last of the carried barley is handed out.',
    saltName: 'the terraces going white',
    saltAnswers: 'an ASH HEAP in range (x3 recovery), a spell fallow, or a plot beside the stream — and ' +
      'note that this age has NO salt-proof crop, so a terrace worked out is a terrace you move',
  },
  3: {

    settlers: ['Fox-Mark', 'Crane', 'Boar-Tooth', 'Snake-Hand', 'Vulture', 'Stone-Cutter'],
    place: 'town',
    mill: 'Parching Floor',
    tally: 'Notched Bone Tally',
    tallyLine: 'The rib is scored, one notch a load. Counting is nine thousand years older than ' +
      'writing — and now you can read your own numbers.',
    ration: 'The carried stores are finished — the last of the packed groats is handed out.',

    saltName: 'the stands going thin under you',
    saltAnswers: 'a BONE HEAP or a CHARRED SPREAD in range (x3 recovery), or rest the stand and cut ' +
      'somewhere else — and note that this age has NO crop that ignores it, because this age has no crop',
  },
  4: {
    settlers: ['Enheduanna', 'Ur-Nammu', 'Ninlil', 'Gilgamesh', 'Shulgi', 'Kubaba'],
    place: 'city',
    mill: 'Mill',
    tally: "Scribe's House",
    tallyLine: 'The scribes have begun the tally. Writing was invented here to count grain — and ' +
      'now you can see your own numbers.',
    ration: 'The Anunnaki ration is finished — the last of the founding grain is issued.',
    saltName: "Sumer's oldest enemy",
    saltAnswers: 'a MIDDEN or SHADUF in range (×3 recovery), or convert to Date Palms, ' +
      'which thrive on ruined ground',
  },
  5: {

    settlers: ['Ahmose', 'Merit', 'Khay', 'Senet', 'Ipuy', 'Nefret'],
    place: 'city',
    mill: 'Quern House',
    tally: 'House of Books',
    tallyLine: 'The per-medjat is open and the accounts are kept — the scribes can tell you what ' +
      'the estate is actually worth.',
    ration: "The nomarch's issue is finished — the last of the founding grain is handed out.",
    saltName: 'the black land going white',
    saltAnswers: 'a SILT SPREAD in range (×3 recovery), or a PALM GROVE, which ignores the salt ' +
      'clock entirely — and the flood renews whatever it reaches',
  },
  7: {

    settlers: ['Ko-ma-we-te', 'A-ke-ro', 'E-ri-ta', 'Pi-ro-ta-wo', 'Ku-pi-ri-jo', 'Ne-da-wa-ta'],
    place: 'palace',
    mill: 'The Palace Mill',
    tally: 'Tablet Archive',
    tallyLine: 'Every jar, every fleece and every name, written in wet clay and filed by the month. ' +
      'None of it was meant to outlast the year.',
    ration: 'The founding issue is finished — from here the magazine feeds the roll.',
    saltName: 'the terrace soil thinning under the vines',

    saltAnswers: 'the AMURCA PITS in range (×3 recovery), a spell fallow — the plot will rest itself ' +
      'if you leave it — or convert to FIG ORCHARDS, which thrive on ruined ground and are never on ' +
      'the roll either',
  },
  6: {

    settlers: ['Cord-Setter', 'Kiln-Hand', 'Bath-Keeper', 'Straight-Street', 'Bangle-Wrist', 'Salt-Walker'],
    place: 'city',
    mill: 'The Quern Mill',
    tally: "Seal Cutter's Office",
    tallyLine: 'The seals are cut and the bales are stamped. Nobody will ever read the six signs on ' +
      'them — but the count underneath is yours to see.',
    ration: 'The founding stores are finished — the last of the issue goes out.',
    saltName: 'the interfluve going white behind you',
    saltAnswers: 'a SILT DITCH in range (×3 recovery), a TIL FIELD, which salts at half the rate, or ' +
      'a BER & DATE GARDEN, which ignores the salt entirely — and note that ruined ground is still ' +
      'perfectly good ground to PAVE, which is where your grid should have gone anyway',
  },
  14: {

    settlers: ['Yax Bahlam', 'Sak Nik', 'Chan Ek', 'Ix Kanil', 'Muwan', 'Ix Nab'],
    place: 'city',
    mill: 'Nixtamal House',
    tally: 'House of Codices',
    tallyLine: 'The codex is opened and the count begins — bark paper, lime plaster, and a scribe ' +
      'who can read it back.',
    ration: 'The founding tribute is finished — the last of the stored maize is handed out.',
    saltName: 'what swidden maize does to its own ground',
    saltAnswers: 'or an ASH SPREAD in range (×3 recovery) — and note that this age has NO ' +
      'salt-proof crop, so a plot worked out is a plot you move',
  },
};

function eraVoice(era) {
  const rung = rungOf(era);
  const keys = Object.keys(ERA_VOICE).map(Number).sort((a, b) => a - b);
  let pick = keys[0];
  for (const k of keys) if (k <= rung) pick = k;
  return ERA_VOICE[pick];
}

function settlerName(s) {
  const names = eraVoice(s.era).settlers;
  return names[(s.seed || 0) % names.length];
}

const ERA_STAPLE = {

  _default: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Raw food', cookedName: 'Prepared food',
    cookedVerb: 'prepared', rawFrom: 'the land', rawNote: '',
    shortNote: 'Every chain you add brings mouths and no food — grow the food chain before you grow anything that eats.',
    hungerFix: 'grow this age’s food chain',
    goodNames: null,
  },
  0: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33F}', cookedIcon: '\u{1F342}',
    rawName: 'Browse', cookedName: 'Forage',
    cookedVerb: 'laid down', rawFrom: 'the fern prairies',
    rawNote: 'the Clutch Mounds draw on it too, and only one of the two feeds anyone',
    shortNote: 'Every chain you add brings mouths and no browse — add prairies and a Lawn, or plant a ' +
      'Magnolia Thicket, which needs nothing at all.',
    hungerFix: 'lay out a Fern Prairie and a Grazing Lawn, or plant a Magnolia Thicket',

    goodNames: { grain: 'Browse', flour: 'Forage', clay: 'Marl', pottery: 'Chalk',
                 wool: 'Resin', cloth: 'Amber', beer: 'Clutches', reeds: 'Horsetail',
                 baskets: 'Lignite', stone: 'Bone', blocks: 'Fossil',
                 dates: 'Fruit', fish: 'Crustaceans' },
  },
  1: {
    raw: 'game', cooked: 'pemmican',
    rawIcon: '\u{1F98C}', cookedIcon: '\u{1F356}',
    rawName: 'Game', cookedName: 'Dried meat',
    cookedVerb: 'dried', rawFrom: 'the drives and the hunts',
    rawNote: 'the Drying Rack and the Hide Frames both draw on it, and only one of them feeds anyone',
    shortNote: 'Every chain adds mouths and no meat — add Reindeer Drives and a Drying Rack, or fish the ice.',
    hungerFix: 'put up a Forage Ground, get a Drying Rack smoking, fish the ice, or send a hunt',
    goodNames: null,
  },
  2: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Barley', cookedName: 'Rations',
    cookedVerb: 'milled', rawFrom: 'the terraces',
    rawNote: 'the quern sheds draw on it before anything else',
    shortNote: 'Every chain adds mouths and no bread — cut more Terrace Plots and a Quern Shed, or feed ' +
      'them off the Gathering Ground and the gorge.',
    hungerFix: 'cut a Terrace Plot and set a Saddle-Quern Shed grinding',

    goodNames: { grain: 'Barley', flour: 'Rations', deadwood: 'Timber',
                 concentrate: 'Concentrate', goldleaf: 'Gold Leaf', wool: 'Goat Hair',
                 cloth: 'Sacking', stone: 'Limestone' },
  },
  3: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35A}',
    rawName: 'Wild Einkorn', cookedName: 'Groats',
    cookedVerb: 'parched', rawFrom: 'the wild stands',
    rawNote: 'the Brew Vats draw on it too, and only one of the two feeds anybody',
    shortNote: 'Every chain adds mouths and no food — cut more Wild Stands EIGHT TILES APART, or put ' +
      'up Snail Beds, which no camp can ever crowd.',
    hungerFix: 'cut a Wild Stand and set a Parching Floor going — or put up Snail Beds, which need ' +
      'nothing and which nothing can take away',

    goodNames: {
      grain: 'Wild Einkorn', flour: 'Groats',
      game: 'Game', pemmican: 'Smoked Meat',
      dates: 'Nuts', forage: 'Snails & Greens',
      cloth: 'Worked Hide', oil: 'Terebinth Pitch',
      stone: 'Limestone', flint: 'Chert', blades: 'Blade Cores', carvings: 'Carved Stone',
      reeds: 'Withies', baskets: 'Cordage', beer: 'Wild-Grain Brew',
    },
  },
  4: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Grain', cookedName: 'Flour',
    cookedVerb: 'milled', rawFrom: 'the fields',
    rawNote: 'mills always draw before breweries',
    shortNote: 'Each craft chain adds ~7 mouths and no flour — add farms and a mill, or food from dates and fish.',
    hungerFix: 'build a Farm and a Mill',
    goodNames: null,
  },
  5: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Emmer', cookedName: 'Flour',
    cookedVerb: 'milled', rawFrom: 'the emmer fields',
    rawNote: 'the quern houses draw on it before anything else',
    shortNote: 'Each chain adds mouths and no flour — sow more Emmer Fields and a Quern House, or feed them from the palm groves and the fishery.',
    hungerFix: 'sow an Emmer Field and set a Quern House grinding',
    goodNames: { grain: 'Emmer' },
  },
  7: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Emmer', cookedName: 'Meal',
    cookedVerb: 'ground', rawFrom: 'the terrace plots',
    rawNote: 'the staple chain is ON THE ROLL — if the palace cannot issue to it, it stops',
    shortNote: 'Each chain adds mouths and the emmer is administered like everything else \u2014 sow ' +
      'more Emmer Plots and a Palace Mill, or plant a Fig Orchard, which needs no issue at all.',
    hungerFix: 'plant a Fig Orchard \u2014 it needs no water, no road and no magazine',
    goodNames: { grain: 'Emmer', flour: 'Meal', dates: 'Figs', oil: 'Olive Oil', wool: 'Fleece',
                 cloth: 'Aegean Cloth', clay: 'Potter\u2019s Clay', pottery: 'Stirrup Jars',
                 stone: 'Gypsum', blocks: 'Ashlar' },
  },
  6: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Barley', cookedName: 'Flour',
    cookedVerb: 'milled', rawFrom: 'the levee fields',
    rawNote: 'nothing else in this age drinks grain — there is no brewery here',
    shortNote: 'Each chain adds mouths and no flour — sow more Levee Fields and a Quern Mill, or feed them from the Brick Weir and the ber garden.',
    hungerFix: 'sow a Levee Field and set a Quern Mill grinding',
    goodNames: { grain: 'Barley' },
  },
  14: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33D}', cookedIcon: '\u{1F32E}',
    rawName: 'Maize', cookedName: 'Masa',
    cookedVerb: 'ground', rawFrom: 'the milpas',
    rawNote: 'the nixtamal houses draw on it before anything else',
    shortNote: 'Each chain adds mouths and no masa — clear more Milpa Plots and a Nixtamal House, or hang a Melipona Apiary in the forest.',
    hungerFix: 'clear a Milpa Plot and set a Nixtamal House grinding',
    goodNames: { grain: 'Maize', flour: 'Masa' },
  },
};
function eraStaple(era) { return ERA_STAPLE[rungOf(era)] || ERA_STAPLE._default; }

function goodLabel(era, key) {
  const a = eraStaple(era).goodNames;
  return (a && a[key]) || (key.charAt(0).toUpperCase() + key.slice(1));
}

auditDataTables();
