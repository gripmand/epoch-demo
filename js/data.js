'use strict';

const TUNE = {
  WORLD: 512,
  CHUNK: 4,

  START_MONEY: 3000,
  FLOUR_PER_RESIDENT: 0.06,

  FOUNDING_GRANT: false,

  TALLY_FROM_START: true,

  FOUNDING: {
    purse: 1500,
    perMinute: 12,
  },

  START_STOCK: { grain: 30, flour: 12, stone: 0, blocks: 0,
                 clay: 0, pottery: 0, wool: 0, cloth: 0, beer: 0 },

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
  PRICES: { grain: 0.5, flour: 2, stone: 1, blocks: 4,
            clay: 0.6, pottery: 4, wool: 1.2, cloth: 7, beer: 3 },
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
  },

  ROCK_YIELD: 900,

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
  HOUSE_UPGRADE_ERA_MULT: 2.1,
};

const HOUSE_RUNG_COST_MULT = [0.6, 1.0, 1.8, 3.0];
function houseUpgradeCost(era, level) {
  const step = HOUSE_RUNG_COST_MULT[Util.clamp((level || 1) - 1, 0, HOUSE_RUNG_COST_MULT.length - 1)];
  return Math.round(TUNE.HOUSE_UPGRADE_COST *
    Math.pow(TUNE.HOUSE_UPGRADE_ERA_MULT, (era || 1) - 1) * step / 10) * 10;
}

function buildMinutes() { return 0; }
function hallMinutes() { return 0; }
function hallCP() { return 0; }
function cpCap() { return 0; }
function buildersFor() { return Infinity; }

const ERAS = [
  { n: 1,  name: 'Anunnaki',        blurb: 'The first seed. Sky-teachers hand you grain, water, and walls.' },
  { n: 2,  name: 'Ancient Egypt',   blurb: 'Canals, granaries, temples along the river.' },
  { n: 3,  name: 'Maya',            blurb: 'Stone cities rise — quarry the mountains themselves.' },
  { n: 4,  name: 'Aztec',           blurb: 'An empire of causeways and great markets. (future build)' },
  { n: 5,  name: 'Ancient Greece',  blurb: 'Columns, philosophy, and trade fleets. (future build)' },
  { n: 6,  name: 'Roman Age',       blurb: 'Roads, aqueducts, an empire of law. (future build)' },
  { n: 7,  name: 'Medieval',        blurb: 'Castles, guilds, and walled towns. (future build)' },
  { n: 8,  name: 'Renaissance',     blurb: 'Art, banking, and the printing press. (future build)' },
  { n: 9,  name: 'Industrial',      blurb: 'Steam, coal, and the factory age.' },
  { n: 10, name: 'Modern',          blurb: 'The Financial District — the flagship earner. (future build)' },
  { n: 11, name: 'Information',     blurb: 'Networks, data, automation. (future build)' },
  { n: 12, name: 'Orbital',         blurb: 'Leave the planet. (future build)' },
  { n: 13, name: 'Interstellar',    blurb: 'Other worlds. (future build)' },
  { n: 14, name: 'Transdimensional', blurb: 'The Looking Glass opens. (endgame)' },
];
const MAX_ERA = 14;

const ERA_GROWTH = 3.6;

function eraReq(n) {

  const g = gateMult();
  return {
    pop: Math.round(55 * Math.pow(1.38, n - 2)),

    money: Math.round(100000 * Math.pow(ERA_GROWTH, n - 2) * g),

    food: Math.round(3500 * Math.pow(ERA_GROWTH, n - 2) * g),
    stone: n >= 4 ? Math.round(2500 * Math.pow(ERA_GROWTH, n - 4) * g) : 0,
  };
}

const SUB_MONTHLY = 12.00;
const PROFIT_CAP_MONTHLY = 5.00;

const RENT_MONTHLY = [
  0,
  0.001,
  0.005,
  0.02,
  0.06,
  0.15,
  0.40,
  0.90,
  1.80,
  3.30,
  6.00,
  9.50,
  12.50,
  15.00,
  17.00,
];

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
  monumentGrowth: 1.55,
};
function monumentRP(era) {
  return Math.round(RP.monumentBase * Math.pow(RP.monumentGrowth, era - 1));
}

function buildingRP(era, def) {
  const w = (def && def.rp !== undefined) ? def.rp : 1;
  return RP.buildingBase * w * Math.pow(RP.buildingGrowth, (era || 1) - 1);
}

function rpHalf(era) {
  return 60 * Math.pow(1.62, era - 1);
}

function rentAchievement(rp, era) {
  const k = rpHalf(era);
  return rp / (rp + k);
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

const HALLS = [null];
for (let l = 1; l <= MAX_ERA; l++) {
  HALLS.push({
    cost: l === 1 ? 0 : Math.round(1500 * Math.pow(2.1, l - 2) / 10) * 10,
    trickle: +(0.8 + 0.45 * (l - 1)).toFixed(2),
  });
}

const ROAD_REQUIRED = ['townhall', 'house', 'villa', 'stonehouse', 'market', 'bazaar',
  'stoneyard', 'bakery', 'templeGranary', 'granary', 'temple'];

const BUILDINGS = {
  townhall: {
    name: 'Town Hall', tier: 'civic', w: 3, h: 3, cost: 0, upkeep: 0,
    icon: '\u{1F3DB}️', color: '#c9a86a', fixed: true,
    desc: 'Your permanent flagship. Pays an in-game trickle AND accrues real rent every second. One upgrade unlocks per era — rent compounds all the way to the Transdimensional age.',
  },

  road: {
    name: 'Road', tier: 'infra', w: 1, h: 1, cost: 10, upkeep: 0,
    icon: '\u{1F6E4}️', color: '#8a7a5c',
    desc: 'Connects buildings to the Town Hall. Every building needs road access. $10 a tile to lay, and nothing to keep — drag to paint.',
  },
  well: {
    name: 'Well', tier: 'infra', w: 1, h: 1, cost: 60, upkeep: 0.10,
    icon: '⛲', color: '#7fb4c9', waterRadius: 5,
    desc: 'Supplies water in a radius. Buildings without water shut down.',
  },
  farm: {
    name: 'Farm', tier: 'food', w: 2, h: 2, cost: 100, upkeep: 0.15,
    icon: '\u{1F33E}', color: '#a8c26a', workers: 2, needsWater: true,
    out: { grain: 1.0 },
    desc: 'Grows 1 grain/min. +50% on fertile soil, +25% adjacent to a Mill.',
  },
  mill: {
    name: 'Mill', tier: 'food', w: 2, h: 2, cost: 250, upkeep: 0.25,

    icon: '⚙️', color: '#b09a7e', workers: 3, needsWater: true, industry: true,

    procIn: 'grain', procRate: 3.0, procOut: 'flour', procRatio: 0.6,
    desc: 'Grinds 3 grain/min into 1.8 flour — and 3.75 grain when it touches a Farm, because the +25% raises BOTH sides. So one Mill wants two fertile Farms, or three on plain grass. Industry: bad neighbor for houses.',
  },
  house: {
    name: 'House', tier: 'housing', w: 1, h: 1, cost: 120, upkeep: 0.05,
    icon: '\u{1F3E0}', color: '#d8a37a', cap: 4, needsWater: true,
    desc: 'Homes 4 residents. Residents work buildings and eat flour. +1 capacity near a Park or Temple, −1 next to industry.',
  },
  market: {
    name: 'Market', tier: 'commerce', w: 2, h: 2, cost: 250, upkeep: 0.30,
    icon: '\u{1F3EA}', color: '#c97f7f', workers: 2, needsWater: true,
    sells: 'flour', sellRate: 0.6, sellPrice: 5.2, custRadius: 6, custMin: 5,
    desc: 'Sells 0.6 flour/min at $5.20 each. Needs ≥5 residents, at any distance — hauls over 20 tiles cost carting.',
  },

  park: {
    name: 'Square', tier: 'civic', w: 1, h: 1, cost: 80, upkeep: 0.05, capRadius: 20,
    icon: '\u{1F3DB}', color: '#c9a86a',
    desc: 'A swept public square. +1 housing capacity for EVERY home within 20 tiles — the shared ground a neighbourhood forms around. One is enough; a second Square adds nothing to a home already covered.',
  },

  midden: {
    name: 'Midden', tier: 'food', w: 1, h: 1, cost: 90, upkeep: 0.08,
    icon: '\u{1F4A9}', color: '#8a6a3f', soilRadius: 5,
    desc: 'A dung heap. Land within 5 tiles recovers from salt 3× faster. Pair it with fallow fields — cropping the same plot forever will exhaust it.',
  },
  templeGranary: {
    name: 'Temple Granary', tier: 'civic', era: 1, w: 4, h: 4, cost: 900, upkeep: 0.35,
    icon: '\u{1F33E}', color: '#c9a86a', workers: 6, needsWater: true,
    storeGrain: 240, storeFlour: 150,
    desc: 'The temple household collects and redistributes the harvest. Massive storage: +240 grain, +150 flour while connected. Sealed against shrinkage — the accounting that invented writing.',
  },

  claypit: {
    name: 'Clay Pit', tier: 'food', era: 1, w: 2, h: 2, cost: 110, upkeep: 0.15,
    icon: '\u{1FAA8}', color: '#9c7b52', workers: 2, nearWater: 3,
    out: { clay: 1.6 },
    desc: 'Digs 1.6 clay/min from the riverbank. Must be within 3 tiles of water — Mesopotamia had no stone and no timber, but endless clay.',
  },
  kiln: {
    name: "Potter's Kiln", tier: 'food', era: 1, w: 2, h: 2, cost: 260, upkeep: 0.28,
    icon: '\u{1F3FA}', color: '#b5623a', workers: 3, needsWater: true, industry: true,
    procIn: 'clay', procRate: 2.0, procOut: 'pottery', procRatio: 0.5,
    desc: 'Fires 2 clay/min into 1 pottery. Industry: a poor neighbour for houses.',
  },
  potterystall: {
    name: 'Pottery Stall', tier: 'commerce', era: 1, w: 2, h: 2, cost: 240, upkeep: 0.30,
    icon: '\u{1F3FA}', color: '#c9703f', workers: 2, needsWater: true,

    sells: 'pottery', sellRate: 0.5, sellPrice: 11.5, custRadius: 7, custMin: 6,
    desc: 'Sells 0.5 pottery/min at $11.50. Needs ≥6 residents, at any distance — hauls over 20 tiles cost carting.',
  },
  sheepfold: {
    name: "Shepherd's Fold", tier: 'food', era: 1, w: 2, h: 2, cost: 130, upkeep: 0.15,
    icon: '\u{1F411}', color: '#c9bda0', workers: 2, dryLand: true,
    out: { wool: 1.0 },
    desc: 'Grazes 1.0 wool/min. Wants DRY ground — grass or salt flat, never your irrigated fields. The one building that makes salinized land worth owning.',
  },
  weaver: {
    name: "Weaver's Shed", tier: 'food', era: 1, w: 2, h: 2, cost: 300, upkeep: 0.30,
    icon: '\u{1F9F5}', color: '#a89060', workers: 3, needsWater: true, industry: true,
    procIn: 'wool', procRate: 1.6, procOut: 'cloth', procRatio: 0.5,
    desc: 'Spins 1.6 wool/min into 0.8 cloth. Textiles were Sumer\'s great export.',
  },
  clothhall: {
    name: 'Cloth Hall', tier: 'commerce', era: 1, w: 2, h: 2, cost: 320, upkeep: 0.35,
    icon: '\u{1F9F6}', color: '#b98b6a', workers: 2, needsWater: true,

    sells: 'cloth', sellRate: 0.4, sellPrice: 18.75, custRadius: 7, custMin: 8,
    desc: 'Sells 0.4 cloth/min at $18.75 — the richest trade in the era, and the fussiest to site. Needs ≥8 residents, at any distance — hauls over 20 tiles cost carting.',
  },
  brewery: {
    name: 'Brewery', tier: 'food', era: 1, w: 2, h: 2, cost: 240, upkeep: 0.26,
    icon: '\u{1F37A}', color: '#c9a24a', workers: 3, needsWater: true, industry: true,
    procIn: 'grain', procRate: 2.0, procOut: 'beer', procRatio: 0.5,
    desc: 'Brews 2 grain/min into 1 beer. Sumerian labourers were paid in beer — it competes with your Mill for grain, so grow more.',
  },
  tavern: {
    name: 'Tavern', tier: 'commerce', era: 1, w: 2, h: 2, cost: 220, upkeep: 0.28,
    icon: '\u{1F37B}', color: '#c98a4a', workers: 2, needsWater: true,

    sells: 'beer', sellRate: 0.7, sellPrice: 6.8, custRadius: 6, custMin: 5,
    desc: 'Sells 0.7 beer/min at $6.80 — beer is a luxury, so it out-earns the Market, but the grain it drinks came out of your bread. Needs ≥5 residents, at any distance; hauls over 20 tiles cost carting.',
  },
  scribe: {
    name: "Scribe's House", tier: 'civic', era: 1, w: 1, h: 1, cost: 200, upkeep: 0.12,
    icon: '\u{1F4DC}', color: '#cbb98a', needsWater: true,

    keepsTally: true,
    desc: 'Writing was invented here, to count grain — and a market with its accounts kept sells more of it. ' +
      '+10% sales at every Market, Tavern, Stall and Hall within 20 tiles. One covers a village; ' +
      'a second adds nothing to a shop already counted.',
  },
  cistern: {
    name: 'Cistern', tier: 'infra', era: 1, w: 1, h: 1, cost: 200, upkeep: 0.16,
    icon: '\u{1F4A7}', color: '#7fb4c9', waterRadius: 8,
    desc: 'A lined and roofed reservoir. Waters a much wider radius than a Well.',
  },
  threshing: {
    name: 'Threshing Floor', tier: 'food', era: 1, w: 2, h: 2, cost: 120, upkeep: 0.08,
    icon: '\u{1F33E}', color: '#d8bf86', threshing: true,

    desc: 'A swept clay floor for beating grain from the ear. +25% to every Farm it touches — but it does ' +
      'NOT stack with a Mill, so use it on the farms your Mill cannot reach. Being 2×2 it can touch four at once.',
  },

  canalwell: {
    name: 'Canal Well', tier: 'infra', era: 2, w: 1, h: 1, cost: 180, upkeep: 0.18,
    icon: '\u{1F30A}', color: '#5da4c9', waterRadius: 8,
    desc: 'Egyptian canal engineering: waters a much larger radius.',
  },
  granary: {
    name: 'Granary', tier: 'infra', era: 2, w: 2, h: 2, cost: 400, upkeep: 0.20,
    icon: '\u{1F3FA}', color: '#c4a35a', needsWater: true,
    storeGrain: TUNE.GRANARY_GRAIN, storeFlour: TUNE.GRANARY_FLOUR,
    desc: 'Storage: +' + TUNE.GRANARY_GRAIN + ' grain and +' + TUNE.GRANARY_FLOUR + ' flour capacity while connected.',
  },
  estate: {
    name: 'Estate Farm', tier: 'food', era: 2, w: 2, h: 2, cost: 350, upkeep: 0.30,
    icon: '\u{1F3DE}️', color: '#93bd55', workers: 3, needsWater: true,
    out: { grain: 2.2 },
    desc: 'A wheat estate: 2.2 grain/min. Same soil and Mill bonuses.',
  },
  villa: {
    name: 'Villa', tier: 'housing', era: 2, w: 1, h: 1, cost: 300, upkeep: 0.10,
    icon: '\u{1F3E1}', color: '#e0b284', cap: 8, needsWater: true,
    desc: 'Mudbrick villa: homes 8 residents.',
  },
  bazaar: {
    name: 'Bazaar', tier: 'commerce', era: 2, w: 2, h: 2, cost: 500, upkeep: 0.45,
    icon: '\u{1F3D9}️', color: '#d98a5f', workers: 3, needsWater: true,
    sells: 'flour', sellRate: 1.2, sellPrice: 7, custRadius: 7, custMin: 8,
    desc: 'Sells 1.2 flour/min at $7. Needs ≥8 residents, at any distance — hauls over 20 tiles cost carting.',
  },
  temple: {
    name: 'Temple', tier: 'civic', era: 2, w: 2, h: 2, cost: 600, upkeep: 0.25,
    icon: '\u{1F3EF}', color: '#d9c48a', needsWater: true,
    desc: '+1 housing capacity for Houses within 2 tiles. Stacks with Parks.',
  },

  aqueduct: {
    name: 'Aqueduct', tier: 'infra', era: 3, w: 1, h: 1, cost: 400, upkeep: 0.30,
    icon: '\u{1F3D7}️', color: '#9db3c9', waterRadius: 11,
    desc: 'Stone aqueduct: waters a huge radius. Reaches the quarries.',
  },
  quarry: {
    name: 'Quarry', tier: 'food', era: 3, w: 2, h: 2, cost: 450, upkeep: 0.35,
    icon: '⛰️', color: '#8f939c', workers: 3, needsWater: true, industry: true,
    out: { stone: 0.7 }, onRock: true,
    desc: 'Cuts 0.7 stone/min. MUST be placed on rock (≥2 rocky tiles) — output scales with rock under it.',
  },
  stonecutter: {
    name: 'Stonecutter', tier: 'food', era: 3, w: 2, h: 2, cost: 500, upkeep: 0.35,
    icon: '\u{1FAA8}', color: '#a8a29a', workers: 3, needsWater: true, industry: true,
    procIn: 'stone', procRate: 1.2, procOut: 'blocks', procRatio: 0.5,
    desc: 'Cuts 1.2 stone/min into 0.6 dressed blocks/min.',
  },
  stoneyard: {
    name: 'Stone Yard', tier: 'commerce', era: 3, w: 2, h: 2, cost: 650, upkeep: 0.45,
    icon: '\u{1F9F1}', color: '#b08968', workers: 3, needsWater: true,
    sells: 'blocks', sellRate: 0.5, sellPrice: 18, custRadius: 7, custMin: 10,
    desc: 'Sells 0.5 blocks/min at $18 — stone is a rich trade. Needs ≥10 residents, at any distance — hauls over 20 tiles cost carting.',
  },
  stonehouse: {
    name: 'Stone House', tier: 'housing', era: 3, w: 1, h: 1, cost: 550, upkeep: 0.15,
    icon: '\u{1F3F0}', color: '#c9b8a0', cap: 12, needsWater: true,
    desc: 'Mayan stonework: homes 12 residents.',
  },

  coal: {
    name: 'Coal Plant', tier: 'infra', era: 9, w: 2, h: 2, cost: 800, upkeep: 1.0,
    icon: '\u{1F3ED}', color: '#8d8d99', workers: 4, needsWater: true, industry: true,
    powerRadius: 7,
    desc: 'Generates power in a radius. Industrial-era buildings need it.',
  },
  bakery: {
    name: 'Bakery', tier: 'commerce', era: 9, w: 2, h: 2, cost: 600, upkeep: 0.5,
    icon: '\u{1F956}', color: '#d9b06a', workers: 4, needsWater: true, needsPower: true,
    sells: 'flour', sellRate: 1.0, sellPrice: 9, custRadius: 7, custMin: 8,
    desc: 'Industrial bakery: sells 1 flour/min at $9. Needs power.',
  },
  farm2: {
    name: 'Steam Farm', tier: 'food', era: 9, w: 2, h: 2, cost: 0, upkeep: 0.40,
    icon: '\u{1F69C}', color: '#8fbf5a', workers: 2, needsWater: true, needsPower: true,
    out: { grain: 3.5 }, noBuild: true,
    desc: 'Steam-powered estate: 3.5 grain/min. Needs power.',
  },
};

const HOUSE_CAP_MULT = [0.5, 1.0, 1.75, 2.5, 3.5];
const HOUSE_MAX_LEVEL = HOUSE_CAP_MULT.length;

const HOUSE_LEVELS = {

  1: ['Reed Hut', 'Mudbrick House', 'Courtyard House', 'Two-Storey House', "Merchant's Compound"],
  2: ['Mud Hut', 'Mudbrick Villa', 'Columned Villa', 'Garden Villa', "Nomarch's House"],
  3: ['Thatch House', 'Stone House', 'Corbelled House', 'Terraced House', 'Noble Compound'],
  9: ['Tenement Room', 'Brick Terrace', 'Merchant Townhouse', 'Mansion Flat', 'City Mansion'],
};

const HOUSE_NEEDS = [
  null,
  { key: 'market',  label: 'Market in range' },
  { key: 'amenity', label: 'Park or temple nearby' },
  { key: 'amenity', label: 'Park or temple nearby' },
  { key: 'amenity', label: 'Park or temple nearby' },
];

function houseLevelName(era, level) {
  const keys = Object.keys(HOUSE_LEVELS).map(Number).sort((a, b) => a - b);
  let pick = keys[0];
  for (const k of keys) if (k <= (era || 1)) pick = k;
  return HOUSE_LEVELS[pick][Util.clamp((level || 1) - 1, 0, HOUSE_MAX_LEVEL - 1)];
}

function houseCap(d, b) {
  const mult = HOUSE_CAP_MULT[Util.clamp((b.level || 1) - 1, 0, HOUSE_MAX_LEVEL - 1)];
  return Math.max(1, Math.round(d.cap * mult));
}

const MONUMENTS = [
  null,
  { id: 'ziggurat',    name: 'Ziggurat',        era: 1,  cost: 4000,      icon: '\u{1F53A}', desc: 'The first temple-mountain. Anchors the Anunnaki economy.' },
  { id: 'pyramid',     name: 'Great Pyramid',   era: 2,  cost: 14000,     icon: '\u{1F3DC}️', desc: 'A mountain of casing stone on the west bank.' },
  { id: 'templePyr',   name: 'Temple-Pyramid',  era: 3,  cost: 46000,     icon: '\u{1F3EF}', desc: 'Stepped limestone crowned with a roof-comb.' },
  { id: 'temploMayor', name: 'Templo Mayor',    era: 4,  cost: 150000,    icon: '⛩️', desc: 'Twin shrines above the sacred precinct.' },
  { id: 'parthenon',   name: 'Parthenon',       era: 5,  cost: 480000,    icon: '\u{1F3DB}️', desc: 'Pentelic marble, refined to the millimetre.' },
  { id: 'colosseum',   name: 'Colosseum',       era: 6,  cost: 1500000,   icon: '\u{1F3DF}️', desc: 'Concrete vaults seating fifty thousand.' },
  { id: 'cathedral',   name: 'Cathedral',       era: 7,  cost: 4600000,   icon: '⛪', desc: 'A lodge of masons, working for a century.' },
  { id: 'duomo',       name: 'Grand Duomo',     era: 8,  cost: 14000000,  icon: '\u{1F54C}', desc: 'A dome raised without centring.' },
  { id: 'crystalPal',  name: 'Crystal Palace',  era: 9,  cost: 42000000,  icon: '\u{1F3ED}', desc: 'Iron and plate glass, prefabricated.' },
  { id: 'spire',       name: 'Financial Spire', era: 10, cost: 130000000, icon: '\u{1F3E2}', desc: 'The skyline declares the city solvent.' },
  { id: 'dataNexus',   name: 'Data Nexus',      era: 11, cost: 400000000, icon: '\u{1F5A5}️', desc: 'The exchange every network route passes through.' },
  { id: 'orbitalRing', name: 'Orbital Ring',    era: 12, cost: 1.2e9,     icon: '\u{1FA90}', desc: 'A band of steel in geostationary orbit.' },
  { id: 'dysonSwarm',  name: 'Dyson Swarm',     era: 13, cost: 3.6e9,     icon: '☀️', desc: 'Collectors thickening around the star.' },
  { id: 'lookingGlass',name: 'Looking Glass',   era: 14, cost: 1.1e10,    icon: '\u{1F52E}', desc: 'The aperture that edits the rules themselves.' },
];

for (let e = 1; e <= MAX_ERA; e++) {
  const m = MONUMENTS[e];
  if (!m) continue;
  BUILDINGS[m.id] = {
    name: m.name, tier: 'monument', era: e, w: 3, h: 3,

    cost: Math.round(m.cost * 0.1), upkeep: +(m.cost * 0.000004).toFixed(3),
    icon: m.icon, color: '#d8c9a0', monument: true, unique: true,
    needsWater: e <= 11,
    trickle: +(2 * Math.pow(2.6, e - 1)).toFixed(2),
    desc: m.desc + ' Produces in-game income AND is the largest single contributor to real rent for this era.',
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
};
for (const k in RP_WEIGHT) if (BUILDINGS[k]) BUILDINGS[k].rp = RP_WEIGHT[k];

for (const t of ROAD_REQUIRED) if (BUILDINGS[t]) BUILDINGS[t].needsRoad = true;
for (const k in BUILDINGS) if (BUILDINGS[k].monument) BUILDINGS[k].needsRoad = true;

const MONUMENT_BUILD = {
  ziggurat:  { money: 3600, clay: 900, beer: 300 },
  pyramid:   { money: 12000, clay: 2200, stone: 900 },
  templePyr: { money: 40000, stone: 3000, blocks: 1200 },
};

const MONUMENT_RATE = { money: 24, clay: 6, beer: 2, stone: 6, blocks: 3, pottery: 2, cloth: 1 };

function monumentBuild(type, era) {
  return MONUMENT_BUILD[type] || { money: Math.round((BUILDINGS[type] || {}).cost * 0.9) || 1000 };
}

const RANK = {
  max: 4,
  outPerRank: 0.35,
  upkeepPerRank: 0.25,
  radiusPerRank: 1,
  costBase: 1.0,
  costGrowth: 1.8,
  numerals: ['', '', ' II', ' III', ' IV'],
};

function rankUpgradable(d) {
  if (!d) return false;
  if (d.fixed || d.monument) return false;
  if (d.tier === 'civic') return false;
  if (d.cap) return false;
  return !!(d.out || d.procIn || d.sells || d.waterRadius || d.soilRadius || d.threshing);
}
function rankOf(b) { return Util.clamp(Math.round(b && b.rank || 1), 1, RANK.max); }
function rankOutMult(b) { return 1 + RANK.outPerRank * (rankOf(b) - 1); }
function rankUpkeepMult(b) { return 1 + RANK.upkeepPerRank * (rankOf(b) - 1); }
function rankRadiusBonus(b) { return RANK.radiusPerRank * (rankOf(b) - 1); }
function rankLabel(b) { return RANK.numerals[rankOf(b)] || ''; }

function rankUpCost(d, fromRank) {
  return Math.round((d.cost || 100) * RANK.costBase * Math.pow(RANK.costGrowth, fromRank - 1) / 10) * 10;
}

const UPGRADES = {

  well:      { to: 'cistern',    cost: 160, era: 1, label: 'Cistern' },
  farm:      { to: 'estate',     cost: 280, era: 2, label: 'Estate Farm' },
  house:     { to: 'villa',      cost: 220, era: 2, label: 'Villa' },
  market:    { to: 'bazaar',     cost: 320, era: 2, label: 'Bazaar' },

  cistern:   { to: 'canalwell',  cost: 140, era: 2, label: 'Canal Well' },
  villa:     { to: 'stonehouse', cost: 320, era: 3, label: 'Stone House' },
  canalwell: { to: 'aqueduct',   cost: 260, era: 3, label: 'Aqueduct' },
  estate:    { to: 'farm2',      cost: 400, era: 9, label: 'Steam Farm' },
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
                     'GRANARY_GRAIN', 'GRANARY_FLOUR']) {
      TUNE[k] = Math.round(TUNE[k] * T);
    }
    TUNE.FOUNDING.purse = Math.round(TUNE.FOUNDING.purse * T);
    for (const m in MONUMENT_BUILD) {
      for (const kind in MONUMENT_BUILD[m]) {
        MONUMENT_BUILD[m][kind] = Math.round(MONUMENT_BUILD[m][kind] * T);
      }
    }

    for (const k in TUNE.START_STOCK) TUNE.START_STOCK[k] = Math.round(TUNE.START_STOCK[k] * T);
  }

  if (S > 1) {
    TUNE.SOIL.saltMinutes = Math.max(60, Math.round(TUNE.SOIL.saltMinutes / 3.3));
    TUNE.SOIL.fallowMinutes = Math.max(40, Math.round(TUNE.SOIL.fallowMinutes / 3.3));
  }

  if (T !== 1) {

    TUNE.STARVE_MINUTES = Math.max(6, TUNE.STARVE_MINUTES / T);
    TUNE.HUNGER_RECOVER = Math.min(0.1, TUNE.HUNGER_RECOVER * T);
  }
})();

function gateMult() { return TUNE.TEMPO / TUNE.SPEEDUP; }
