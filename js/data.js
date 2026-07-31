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
                 bone: 0, ochre: 0, carvings: 0, ivory: 0 },

  FOUNDING_CREW: 10,

  ERA_STARTER: { 1: 'deadwoodcutter', 4: 'farm', 5: 'emmerfield', 14: 'milpa' },

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
  PRICES: { grain: 0.5, flour: 2, stone: 1, blocks: 4,
            clay: 0.6, pottery: 4, wool: 1.2, cloth: 7, beer: 3,
            dates: 1.8, fish: 1.5, salt: 1.5, reeds: 0.35, baskets: 8.9,
            sesame: 1.0, oil: 13, dyedcloth: 26, mudbrick: 3,

            water: 0, cacao: 9, chocolate: 24, honey: 2.4,

            deadwood: 0.6, charcoal: 3, game: 0.5, pemmican: 2, forage: 1.1,
            hide: 1.2, parka: 7, flint: 0.6, blades: 4,
            bone: 1.2, ochre: 1.5, carvings: 13, ivory: 18 },

  NO_EXPORT: { water: 1 },

  FOODS: [ { kind: 'flour', eff: 1.0 }, { kind: 'pemmican', eff: 1.0 },
           { kind: 'dates', eff: 1.0 }, { kind: 'forage', eff: 0.8 },
           { kind: 'fish', eff: 0.75 }, { kind: 'honey', eff: 0.6 } ],
  LAND_BASE: 150,
  LAND_EXP: 1.35,
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

  DEADWOOD_YIELD: 500,

  FUEL: { deadwood: 1.0, charcoal: 3.0, bone: 1.0 },

  COLD: {
    freezeMinutes: 12,
    freezeFloor: 4,
    stopGrowth: 0.20,
    warnAt: 0.40,
    recover: 0.04,
  },

  FIREKEEPER: { radius: 20, save: 0.15 },

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
    1: { kind: 'pemmican', price: 8, who: 'A passing band traded the camp', unit: 'bundle' },
    4: { kind: 'grain', price: 2, who: 'A caravan sold the city', unit: 'sack' },
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
function houseUpgradeCost(era, level) {
  const step = HOUSE_RUNG_COST_MULT[Util.clamp((level || 1) - 1, 0, HOUSE_RUNG_COST_MULT.length - 1)];

  return Math.round(TUNE.HOUSE_UPGRADE_COST *
    Math.pow(TUNE.HOUSE_UPGRADE_ERA_MULT, (era || 1) - 4) * step / 10) * 10;
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

const WRITTEN_RUNGS = [1, 4, 5, 14];

const START_ERA = WRITTEN_RUNGS[0];
function nextWrittenEra(era) {
  for (const r of WRITTEN_RUNGS) if (r > era) return r;
  return null;
}

const MIGRATE_RUNG = {
  1: 4, 2: 5, 3: 14, 4: 26, 5: 10, 6: 13, 7: 22,
  8: 28, 9: 30, 10: 33, 11: 34, 12: 35, 13: 36, 14: 37,
};

function rungOf(era) {
  return Math.max(0, Math.round(era || 1));
}

const ERA_GROWTH = Math.pow(3.6, 12 / 35);

const POP_GROWTH = Math.pow(1.38, 12 / 35);

function eraReq(n) {

  const g = gateMult();

  return {
    pop: Math.round(55 * Math.pow(POP_GROWTH, n - 5)),

    money: Math.round(100000 * Math.pow(ERA_GROWTH, n - 5) * g),

    food: Math.round(3500 * Math.pow(ERA_GROWTH, n - 5) * g),

    stone: n >= 7 ? Math.round(2500 * Math.pow(ERA_GROWTH, n - 7) * g) : 0,
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
  return RP.buildingBase * w * Math.pow(RP.buildingGrowth, (era || 1) - 1);
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
  1: {
    tree: 'nothing grows here — the standing forest has been dead a thousand years, and no sapling takes in frozen loess',
    fertile: 'no ground on the glacial steppe will take a crop — this age eats what it hunts and gathers',
  },
};
function terraCost(kind, era) {
  const e = rungOf(era || (window.G && G.s && G.s.era) || START_ERA);
  return Math.max(5, Math.round(TUNE.TERRA[kind] * Math.pow(HALL_COST_GROWTH, e - 4)));
}
function terraLocked(kind, era) {
  const L = ERA_TERRA_LOCK[rungOf(era || (window.G && G.s && G.s.era) || START_ERA)];
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
  'woolbureau', 'storehouse', 'breadoven', 'runnerpost'];

const BUILDINGS = {
  townhall: {
    name: 'Town Hall', tier: 'civic', w: 3, h: 3, cost: 0, upkeep: 0,
    icon: '\u{1F3DB}️', color: '#c9a86a', fixed: true,
    desc: 'Your permanent flagship. Pays an in-game trickle AND accrues real rent every second. One upgrade unlocks per era — rent compounds all the way to the Transdimensional age.',
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
      'this is the camp that other camps walk to. Sells 3 raw a minute at 80% of list, out to 9 tiles.',
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
      'correctly. Every hearth within 20 tiles burns 15% less. Worth nothing at one chain and worth ' +
      'eight parcels at three.',
  },
  handprint: {
    name: 'Ochre Handprint Panel', tier: 'beauty', era: 1, w: 1, h: 1, cost: 25, upkeep: 0,
    icon: '\u{1F91A}', color: '#b5502f',
    desc: 'A hand, a mouthful of ochre, a wall. Names a quarter. No output and no upkeep — being here ' +
      'is the point.',
  },

  road: {

    universal: true,
    name: 'Road', tier: 'infra', w: 1, h: 1, cost: 10, upkeep: 0,
    icon: '\u{1F6E4}️', color: '#8a7a5c',
    desc: 'Connects buildings to the Town Hall. Every building needs road access. $10 a tile to lay, and nothing to keep — drag to paint.',
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
    icon: '\u{1F334}', color: '#8fae62', workers: 3, needsWater: true,
    out: { dates: 0.5 }, saltProof: true,
    desc: 'Grows 0.5 dates/min, eaten like flour — and it IGNORES the salt clock entirely. On badly salted ' +
      'ground (soil under 30%) it yields +50%: the palm was Sumer\'s answer to land the barley had ruined.',
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
    out: { fish: 0.7 },
    desc: 'A reed fence across the current: 0.7 fish/min, eaten at 75% of flour\'s worth. The first building ' +
      'that stands IN the water — food with no field, no mill and no salt clock. Bank frontage is now contested.',
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
    icon: '\u{1F402}', color: '#9c7f5c', workers: 2, needsWater: true,
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
    icon: '\u{1F9F6}', color: '#b9a883', workers: 2, needsWater: true,
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
    procIn: 'grain', procOut: 'flour', procRate: 4.2, procRatio: 0.6,
    desc: 'Grinds 4.2 grain/min into flour. Egypt paid its wages in bread — this is the payroll.',
  },
  scriptorium: {
    name: 'Scriptorium', tier: 'food', era: 5, w: 2, h: 2, cost: 460, upkeep: 0.46,
    icon: '\u{1F4DC}', color: '#cfc09a', workers: 3, needsWater: true,
    procIn: 'reeds', procOut: 'baskets', procRate: 2.8, procRatio: 0.5,
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
  1: ['Windbreak', 'Hide Tent', 'Sunken Hut', 'Bone-Frame Lodge', 'Clan Longhouse', 'Elder Longhouse'],

  4: ['Reed Hut', 'Mudbrick House', 'Courtyard House', 'Two-Storey House', "Merchant's Compound", 'Anunnaki Hall'],
  5: ['Mud Hut', 'Mudbrick Villa', 'Columned Villa', 'Garden Villa', "Nomarch's House", 'Temple Villa'],
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

function houseLevelName(era, level) {
  const rung = rungOf(era);
  const keys = Object.keys(HOUSE_LEVELS).map(Number).sort((a, b) => a - b);
  let pick = keys[0];
  for (const k of keys) if (k <= rung) pick = k;
  const row = HOUSE_LEVELS[pick];

  return row[Util.clamp((level || 1) - 1, 0, row.length - 1)];
}

function houseCap(d, b) {
  return Math.max(1, Math.round(d.cap * houseCapMult(b.level || 1)));
}

const MONUMENT_GIFT = {
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

};
function monumentGift(era) { return MONUMENT_GIFT[rungOf(era)] || null; }

const ERA_POLICY = {
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

  1: { flavour: 'Snow Track', color: 0x6d6459, hw: 0.31,
       desc: 'Snow trodden through to the frozen loess beneath, staked out with markers so it can be ' +
             'found after a blow. Connects buildings to the Great Hearth — every building needs road ' +
             'access. $10 a tile, nothing to keep.' },
  4: { flavour: 'Beaten Track', color: 0x8a6a3f, hw: 0.30,
       desc: 'Earth packed hard by feet and sledges. Connects buildings to the ' +
             'seat of power — every building needs road access. $10 a tile, nothing to keep.' },

  5: { flavour: 'Processional Way', color: 0xf0e8dc, hw: 0.34,
       desc: 'Dressed limestone laid flat and swept white. Egypt built roads to move stone and ' +
             'to walk gods along — wider than a track, and it shows. $10 a tile, nothing to keep.' },
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
  { id: 'ziggurat',    name: 'Ziggurat',        era: 4,  cost: 4000,      icon: '\u{1F53A}', desc: 'The first temple-mountain. Anchors the Anunnaki economy.' },
  { id: 'pyramid',     name: 'Great Pyramid',   era: 5,  cost: 14000,     icon: '\u{1F3DC}️', desc: 'A mountain of casing stone on the west bank.' },
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
};
for (const k in RP_WEIGHT) if (BUILDINGS[k]) BUILDINGS[k].rp = RP_WEIGHT[k];

for (const t of ROAD_REQUIRED) if (BUILDINGS[t]) BUILDINGS[t].needsRoad = true;
for (const k in BUILDINGS) if (BUILDINGS[k].monument) BUILDINGS[k].needsRoad = true;

const PLOWED = ['farm', 'estate', 'farm2', 'sesamefield'];
for (const t of PLOWED) if (BUILDINGS[t]) BUILDINGS[t].plowed = true;

const MONUMENT_BUILD = {

  paintedcave: { money: 3600, ochre: 900, charcoal: 300, carvings: 100 },
  ziggurat:  { money: 3600, clay: 900, beer: 300 },
  pyramid:   { money: 12000, clay: 2200, stone: 900 },
  templePyr: { money: 40000, stone: 3000, blocks: 1200 },
};

const MONUMENT_RATE = { money: 24, clay: 6, beer: 2, stone: 6, blocks: 3, pottery: 2, cloth: 1,
                        ochre: 6, charcoal: 2, carvings: 1 };

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

  return !!(d.out || d.procIn || d.sells || d.waterRadius || d.warmRadius || d.soilRadius || d.threshing);
}
function rankOf(b) { return Util.clamp(Math.round(b && b.rank || 1), 1, RANK.max); }

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
  farm:      { to: 'estate',     cost: 280, era: 5, label: 'Estate Farm', legacy: true },
  house:     { to: 'villa',      cost: 220, era: 5, label: 'Villa', legacy: true },
  market:    { to: 'bazaar',     cost: 320, era: 5, label: 'Bazaar', legacy: true },

  cistern:   { to: 'canalwell',  cost: 140, era: 5, label: 'Canal Well', legacy: true },
  villa:     { to: 'stonehouse', cost: 320, era: 14, label: 'Stone House', legacy: true },
  canalwell: { to: 'aqueduct',   cost: 260, era: 14, label: 'Aqueduct', legacy: true },
  estate:    { to: 'farm2',      cost: 400, era: 30, label: 'Steam Farm', legacy: true },

  emmerfield: { to: 'estate',    cost: 400, era: 5, label: 'Estate Farm' },

  catchment: { to: 'aguada',     cost: 1150, era: 14, label: 'Aguada Reservoir' },

  hearth:   { to: 'longfire',  cost: 160, era: 1, label: 'Longfire & Melt Row' },

  foragecamp: { to: 'tendedground',  cost: 190, era: 1, label: 'Tended Ground' },
  dryrack:    { to: 'smokelodge',    cost: 260, era: 1, label: 'Smoke Lodge' },
  knapfloor:  { to: 'pressurefloor', cost: 250, era: 1, label: 'Pressure-Flake Floor' },
  cache:      { to: 'deepcache',     cost: 150, era: 1, label: 'Deep Cache' },
  tradepost:  { to: 'tradering',     cost: 210, era: 1, label: 'Trade Ring' },

  hunterscamp:   { to: 'spearlodge',   cost: 260, era: 1, label: 'Spear Lodge' },
  spearlodge:    { to: 'mammothblind', cost: 400, era: 1, label: 'Mammoth Blind' },
  mammothblind:  { to: 'catlodge',     cost: 620, era: 1, label: 'Sabretooth Lodge' },
};

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

function DEF(type) { return BUILDINGS[type]; }

(function scaleForTempo() {
  const T = TUNE.TEMPO, S = TUNE.SPEEDUP;
  if (T !== 1) {
    for (const k of ['GRAIN_CAP', 'FLOUR_CAP', 'STONE_CAP', 'BLOCKS_CAP', 'CLAY_CAP',
                     'POTTERY_CAP', 'WOOL_CAP', 'CLOTH_CAP', 'BEER_CAP',
                     'GRANARY_GRAIN', 'GRANARY_FLOUR',
                     'DATES_CAP', 'FISH_CAP', 'SALT_CAP', 'REEDS_CAP', 'BASKETS_CAP',
                     'SESAME_CAP', 'OIL_CAP', 'DYEDCLOTH_CAP', 'MUDBRICK_CAP',

                     'WATER_CAP', 'CACAO_CAP', 'CHOCOLATE_CAP', 'HONEY_CAP',

                     'DEADWOOD_CAP', 'CHARCOAL_CAP', 'GAME_CAP', 'PEMMICAN_CAP',
                     'HIDE_CAP', 'PARKA_CAP', 'FLINT_CAP', 'BLADES_CAP',
                     'BONE_CAP', 'OCHRE_CAP', 'CARVINGS_CAP', 'IVORY_CAP']) {
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

(function auditDataTables() {
  const bad = [];
  const say = m => bad.push(m);

  for (const rung in TUNE.ERA_STARTER) {
    const k = TUNE.ERA_STARTER[rung], d = BUILDINGS[k];
    if (!d) say('ERA_STARTER[' + rung + '] = "' + k + '" is not a building');
    else if ((d.era || 1) !== +rung)
      say('ERA_STARTER[' + rung + '] = "' + k + '" is era ' + (d.era || 1) +
          ' — a rung-' + rung + ' city can never build it, so the crew is held forever');
  }

  for (const k in TUNE.PRICES)
    if (!(k in TUNE.START_STOCK)) say('good "' + k + '" is in PRICES but not START_STOCK (NaN on first addStock)');
  for (const k in TUNE.START_STOCK)
    if (!(k in TUNE.PRICES)) say('good "' + k + '" is in START_STOCK but has no price');

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

    if (!u.legacy && (u.era || 1) !== (a.era || 1))
      say(from + ' (era ' + (a.era || 1) + ') -> ' + u.to + ' is tagged era ' + (u.era || 1) +
          ' — under the prestige turn this upgrade can never fire');
  }

  if (bad.length) {
    console.warn('EPOCH DATA INTEGRITY — ' + bad.length + ' problem(s):');
    for (const m of bad) console.warn('  · ' + m);
  }
  return bad;
})();

const ERA_FOOD_LABEL = { 1: 'Food put by this age', 4: 'Flour milled this age',
                         5: 'Flour milled this age', 14: 'Food ground this age' };
function eraFoodLabel(era) { return ERA_FOOD_LABEL[rungOf(era)] || 'Food produced this age'; }
