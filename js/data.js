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
                 saffron: 0, tin: 0, bronze: 0,

                 rice: 0, mulberry: 0, cocoon: 0, silk: 0,
                 brocade: 0, copperore: 0, ritualbronze: 0, brine: 0,

                 coir: 0, sennit: 0, bast: 0, tapa: 0, nacre: 0,
                 lure: 0, adze: 0, feathers: 0, cloak: 0,

                 grapes: 0, wine: 0, silver: 0,

                 salsamentum: 0, tegula: 0, silex: 0,

                 passage: 6,

                 natron: 0, glass: 0, pergamena: 0, epistyle: 0,

                 sigillata: 0, marmor: 0, pozzolana: 0, concrete: 0,
                 galena: 0, plumbum: 0, linum: 0, velum: 0,

                 iron: 0, spolia: 0, arma: 0, calx: 0,

                 blattion: 0, naphtha: 0, greekfire: 0,

                 bogore: 0, codex: 0, pork: 0 },

  FOUNDING_CREW: 10,

  ERA_STARTER: { 15: 'oleastrum',
    17: 'spoilgang',

  16: 'thynneion',
                 10: 'olivegrove',
    1: 'deadwoodcutter', 2: 'terraceplot', 3: 'snailbeds', 4: 'farm',
                 5: 'emmerfield', 6: 'leveefield',

                 7: 'figorchard', 8: 'milletfield', 9: 'breadfruitgrove',
                 11: 'arvum',

                 12: 'kleros',

                 13: 'centuria', 14: 'milpa' },

  ERA_START_MONEY: {
    0: 1080, 1: 3000, 2: 3000, 3: 3000, 4: 3000, 5: 3000, 6: 3000, 7: 3000,
    8: 8850, 9: 11590, 10: 15190, 11: 19900, 12: 26100, 14: 3000,
  },

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

  RICE_CAP: 146, MULBERRY_CAP: 70, COCOON_CAP: 70, SILK_CAP: 44,
  BROCADE_CAP: 35, COPPERORE_CAP: 87, RITUALBRONZE_CAP: 52, BRINE_CAP: 70,

  COIR_CAP: 100, SENNIT_CAP: 50, BAST_CAP: 80, TAPA_CAP: 50, NACRE_CAP: 100,
  LURE_CAP: 60, ADZE_CAP: 50, FEATHERS_CAP: 80, CLOAK_CAP: 40,

  GRAPES_CAP: 92, WINE_CAP: 58, SILVER_CAP: 46,

  SALSAMENTUM_CAP: 79, TEGULA_CAP: 159, SILEX_CAP: 106,

  NATRON_CAP: 122, GLASS_CAP: 91, PERGAMENA_CAP: 61, EPISTYLE_CAP: 122,

  SIGILLATA_CAP: 105, MARMOR_CAP: 70, POZZOLANA_CAP: 175, CONCRETE_CAP: 140,
  GALENA_CAP: 175, PLUMBUM_CAP: 87, LINUM_CAP: 140, VELUM_CAP: 87,

  IRON_CAP: 230, SPOLIA_CAP: 230, ARMA_CAP: 90, CALX_CAP: 140,

  SEAL: {

    premium: 2.00,

    spill: 0.35,

    quotaPerSeal: { blattion: 3.30, greekfire: 1.65 },

    tithe: [0, 0.20, 0.30, 0.40],
    maxSeals: 3,
  },

  CHRYSOBULL: { step: 0.50, per: 60 },

  GIFT_VAULT_STEP: 0.20,

  BLATTION_CAP: 60, NAPHTHA_CAP: 180, GREEKFIRE_CAP: 45,

  BOGORE_CAP: 380, CODEX_CAP: 55, PORK_CAP: 540,

  OCCUPY: {

    deepest: 0.28,

    roads: true,
  },

  WARRANT: { bonus: 0.25, waste: 0.50 },

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
            saffron: 2.22, tin: 1.63, bronze: 7.89,

            rice: 0.61, mulberry: 0.59, cocoon: 2.03, silk: 11.84,
            brocade: 31.70, copperore: 1.45, ritualbronze: 6.76, brine: 1.01,

            coir: 0.68, sennit: 17.16, bast: 1.93, tapa: 13.50, nacre: 1.16,
            lure: 7.71, adze: 25.07, feathers: 2.31, cloak: 50.13,

            grapes: 2.20, wine: 15.39, silver: 57.17,

            salsamentum: 22.31, tegula: 28.83, silex: 32.59,

            natron: 1.72, glass: 32.88, pergamena: 53.61, epistyle: 37.16,
            passage: 0,

            sigillata: 13, marmor: 85, pozzolana: 1.15, concrete: 10,
            galena: 1.96, plumbum: 42, linum: 3.91, velum: 23,

            iron: 2.55, spolia: 1.50, arma: 110.53, calx: 16.90,

            blattion: 24.60, naphtha: 3.20, greekfire: 34.30,

            bogore: 5.99, codex: 154.00, pork: 2.80 },

  NO_EXPORT: { water: 1, passage: 1 },

  FOODS: [ { kind: 'flour', eff: 1.0 }, { kind: 'pemmican', eff: 1.0 },
           { kind: 'dates', eff: 1.0 }, { kind: 'forage', eff: 0.8 },
           { kind: 'fish', eff: 0.75 }, { kind: 'honey', eff: 0.6 },

           { kind: 'pork', eff: 1.0 } ],
  LAND_BASE: 150,
  LAND_EXP: 1.35,

  GIFT_LAND_STEP: 0.15,

  GIFT_TERRA_STEP: 0.20,

  GIFT_SUPPLY_STEP: 12,

  GIFT_EXPORT_STEP: 0.10,

  GIFT_BEACON_STEP: 0.12,

  GIFT_ARENA_STEP: 0.20,

  GIFT_KEEP_STEP: 0.25,
  DEMOLISH_REFUND: 0.5,
  CLEAR_TREE: 15,

  TERRA: { grass: 20, fertile: 45, water: 80, rock: 60, mountain: 150, tree: 25,
           ram: 45, cut: 35 },

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

  CASCADE: {

    maxDrop: 1,

    hopLimit: 60,

    dryYield: 0.15,

    warnSpare: 2.0,

    rearmSpare: 4.0,

    gateFields: 3,
    gateFrac: 0.75,
  },

  REVET: { per: 0.60, add: 2.0 },

  VOYAGE: {
    range: 26,
    courtBonus: 6,
    rangePerRank: 2,

    landfallMult: 2.5,
    courtLandfall: 1.8,

    tell: 30,

    gateLandfalls: 3,
  },

  LASH: { per: 0.25, add: 4 },

  OPSON: {

    staple: 0.50,

    giftStep: 0.08,
    lawStaple: 0.15,
    lawShopCut: 0.08,

    share: { dates: 0.25, forage: 0.25, fish: 0.25 },
    other: 0.25,

    warnSecs: 180,
    badSecs: 60,

    toastSecs: 240,
    rearmSecs: 600,
  },

  CENSUS: {

    base: 100,
    per: 10,

    warnFrac: 0.15,

    gateFrac: 0.90,

    officeCut: 0.25,
    officeMax: 2,
  },

  PROFESSIO: { feeCut: 0.5, duesCut: 0.75 },

  ATELEIA: { pull: 0.25, duesCut: 0.40 },

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

  BONEFIRE: { hot: 1.5 },

  FUEL_RESERVE_MIN: 2,

  ERA_HERDS: {

    0: {
      counts: { titanosaur: 5, hadrosaur: 12, ceratopsian: 7, raptor: 10 },
      speed: { titanosaur: 0.05, hadrosaur: 0.11, ceratopsian: 0.08, raptor: 0.26 },
      standoff: 20,
      seedRing: [24, 92],
      nearRing: [26, 44],
      returnRing: [40, 80],
      returnEvery: { titanosaur: 0, hadrosaur: 0, ceratopsian: 0, raptor: 0 },
      announce: {},
    },

    1: {
      counts: { mammoth: 8, bison: 22, rhino: 4, sabertooth: 5 },
      speed: { mammoth: 0.09, bison: 0.13, rhino: 0.10, sabertooth: 0.17 },
      standoff: 24,

      seedRing: [28, 100],

      nearRing: [30, 48],

      returnRing: [45, 85],

      returnEvery: { bison: 180, sabertooth: 900, rhino: 1500, mammoth: 3600 },

      announce: { mammoth: true, rhino: true },
    },

    2: null,
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

    17: { kind: 'grain', price: 4, who: 'A pedlar sold the vill', unit: 'sack' },

    16: { kind: 'grain', price: 12, who: 'A Genoese factor sold the city', unit: 'modios' },

    10: { kind: 'grain', price: 2, who: 'A Pontic grain ship sold the city', unit: 'measure' },

    11: { kind: 'grain', price: 4, who: 'A Sicilian corn factor sold the city', unit: 'modius' },

    12: { kind: 'grain', price: 4, who: 'A factor off an Alexandrian grain ship sold the city', unit: 'artaba' },

    13: { kind: 'grain', price: 5, who: 'The African fleet broke bulk for the city', unit: 'modius' },

    15: { kind: 'grain', price: 8, who: 'A speculator sold the city', unit: 'modius' },

    0: { kind: 'flour', price: 8, who: 'A week grazing beyond the range brought back', unit: 'load' },
    1: { kind: 'pemmican', price: 8, who: 'A passing band traded the camp', unit: 'bundle' },

    2: { kind: 'grain', price: 2, who: 'A supply train sold the camp', unit: 'sack' },

    3: { kind: 'grain', price: 2, who: 'A band down from Karahan Tepe traded the town', unit: 'basket' },
    4: { kind: 'grain', price: 2, who: 'A caravan sold the city', unit: 'sack' },

    7: { kind: 'grain', price: 2, who: 'A ship out of Egypt put in and left the palace', unit: 'measure' },

    5: { kind: 'grain', price: 2, who: 'A river barge sold the estate', unit: 'sack' },

    6: { kind: 'grain', price: 2, who: 'A boat up from Lothal sold the city', unit: 'sack' },

    8: { kind: 'grain', price: 2, who: 'A tribute train from the western marches sold the city', unit: 'load' },

    9: { kind: 'grain', price: 2, who: 'A double hull put in from windward and traded the village', unit: 'load' },
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

  PASSAGE_CAP: 12,

  PASSAGE: { per: 1, warnBeds: 6, gateLanded: 240 },

  ANNONA: { price: 2.72, base: 0.9, bite: 1.35, maxPremium: 8.0,
            warnAt: 1.8, rearmAt: 1.3, gatePremium: 1.8 },

  FLEET: { lift: 0.60, perLanded: 0.05 },

  ARREARS: {

    fabricFrac: 0.25,

    order: 'upkeepShare',

    mothballFreeze: true,

    protectFree: 3,
    protectPerCurator: 4,

    repairPrice: 0.60,

    repairPerWorker: 12.0,
    warnAt: 0.35,
    rearmMinutes: 60,

    ruinRefund: 0.0,

    spoliaFrac: 0.30,

    ruinTileSpolia: 700,
  },

  MUNUS: {
    per: 0.001333,
    relief: 0.40,
    crossoverMin: 500,
  },

  WATER_PER_RESIDENT: 0.09,
  WATER_PER_WORKER: 0.045,

  RATION: { drawCut: 0.40, slow: 0.15 },

  MONUMENT_BOOST: 0.20,

  PRESTIGE_PURSE_MULT: Math.pow(2.2, 12 / 35),

  RELIC_RING: 7,

  RANK_PRICE_BONUS: 0.20,
};

const HOUSE_RUNG_COST_MULT = [0.6, 1.0, 1.8, 3.0];

const HOUSE_RUNG_REF = { 0: 'nestmound', 1: 'hidetent', 2: 'shelter', 3: 'brushshelter', 4: 'house',
  17: 'wattlehut',
                         5: 'villa', 6: 'brickhouse', 7: 'ashlarhouse',
                         8: 'courtyardcompound', 9: 'halepili', 10: 'oikos',

                         11: 'casacolonica', 12: 'katoikia', 13: 'cenaculum',

                         15: 'meritorium',

                         16: 'oikema',
                         14: 'stonehouse' };
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

  { n: 10, name: 'Ancient Greece',     blurb: 'Bread is half a table. Set the rest of it.' },

  { n: 11, name: 'Roman Republic',     blurb: 'The city is governed by the last census it took. The uncounted still eat.' },
  { n: 12, name: 'Hellenistic',        blurb: 'A city at the far end of somebody else’s rope.' },

  { n: 13, name: 'Roman Age',          blurb: 'A city too big for its fields, fed by an empire of law.' },
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

const WRITTEN_RUNGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

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

  17: {
    rock: 'there is no quarry-grade stone in this landscape and there must be no way to make any — ' +
      'every dressed block in this world already exists, standing in something somebody else built. ' +
      'Painting an outcrop would print the one thing this age cannot replace',
  },

  16: { fertile: 'nothing on this peninsula has been fallow since Constantine walled it, and painting ' +
        'a tile green buys the BONUS, never the soil. THE METAXEION is the answer: it ignores the ' +
        'salt clock outright and yields MORE on the ground the wheat has already killed' },

  15: {
    fertile: 'you did not inherit tired ground because it was the wrong colour -- this valley has ' +
      'been cropped for four hundred years, and painting a tile green buys the BONUS, never the ' +
      'soil. A BUBILE is the only thing on this map that gives any of it back',
  },

  10: {
    fertile: 'this is karst limestone over a few pockets of terra rossa — Attica does not ' +
      'become the black land because you paid for it, and a city that could paint its own ' +
      'cornfields would never have needed a fleet',
  },

  11: {
    water: 'the Tiber is the drain, the road and the frontage of this city all at once, and the ' +
      'censors let no man fill it — the priests would not even let iron into the bridge over it',
  },

  13: {
    fertile: 'the good soil is where it is, and there is not enough of it -- that sentence is ' +
      'the whole age. A city that could paint its own black earth would never need a grain ' +
      'fleet, and this one is built on needing one.',
  },
  12: {
    water: 'the gulf is the whole reason this city stands where it stands — every citizen in it ' +
      'arrived across water somebody else owned, and a founder who fills his own harbour has ' +
      'founded nothing',
  },

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

  8: {
    water: 'the river is the river, and a pond you dug yourself has no fall in it — this age is about ' +
      'where the water goes, not where it is. Ram the ground instead, and cut through what is in the way',
  },

  9: {},

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
  const n = rungOf(era);
  const v = TUNE.ERA_START_MONEY[n];
  if (v !== undefined) return v;
  return Math.round(TUNE.START_MONEY * Math.pow(TUNE.PRESTIGE_PURSE_MULT, n - 4));
}

function terraGift(s) {
  const st = s || (typeof G !== 'undefined' && G ? G.s : null);
  return Math.pow(1 - TUNE.GIFT_TERRA_STEP, (st && st.giftTerra) | 0);
}

function terraCost(kind, era) {
  const e = rungOf(curEra(era));
  return Math.max(5, Math.round(TUNE.TERRA[kind] * Math.pow(HALL_COST_GROWTH, e - 4) * terraGift()));
}

const TERRA_ONLY = { ram: 8, cut: 8 };
const TERRA_ONLY_WHY = 'moving the earth itself is one age’s art. Only the rammed-earth builders ' +
  'of the Huan valley cut and raised the ground to run water across it, and nothing before or after ' +
  'them on this ladder reshapes a hillside to feed a field';
function terraLocked(kind, era) {
  const rung = rungOf(curEra(era));
  const only = TERRA_ONLY[kind];
  if (only !== undefined && only !== rung) return TERRA_ONLY_WHY;
  const L = ERA_TERRA_LOCK[rung];
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

  'wattlehut', 'toft', 'thegnhall', 'aisledhouse', 'bowerrange',
  'stanhithe', 'blockstaithe', 'irenstall', 'irenbooth', 'quirestall', 'bookhoard',
  'chepe', 'chepecross', 'brewhouse', 'guesthall', 'webbery', 'fairbooth',
  'sokebarn', 'grange',
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
  'overseerpost', 'ridgerelay', 'tallystone', 'reckoningpost',

  'courtyardcompound', 'clancompound',
  'mealcounter', 'granarycourt', 'silkhall', 'bolttreasury',
  'bronzemarket', 'vesselhall', 'weighingfloor', 'saltcommission',
  'alehall', 'libationhall', 'wallworks', 'gangcommissary',
  'bonestall', 'awlcombrow',
  'timbergranary', 'platformgranary', 'clanstore', 'sealedvault',
  'cauldroncourt', 'lineagetemple', 'cowrietreasury', 'standardhouse',
  'divinercourt', 'oraclearchive', 'rammedyard', 'courseyard',

  'casacolonica', 'atriumdomus',
  'macellum', 'forumholitorium', 'forumpiscarium', 'tabernavestiaria',
  'mercatustegularum', 'crepidines',
  'nundinae', 'cuppedinis', 'velabrum', 'togaria', 'portustiberinus', 'milliaria',
  'porticusaemilia', 'horreagalbana', 'stabulum', 'hospitium',
  'tabularium', 'libraria', 'aerarium', 'quaestorium', 'moneta', 'argentaria',

  'mansio', 'stativa',
  'ecclesia', 'episcopium', 'scrinium', 'notitia', 'castrum', 'burgus',
  'catabolum', 'annonaria', 'vestiarium', 'emporiumvestium',
  'praebitorium', 'sagittaria', 'structoris', 'redemptorum',
  'ripamarmorata', 'navalia', 'penuaria', 'cupedinaria',
  'meritorium', 'canaba', 'turris'];

const BUILDINGS = {

  phiale: {
    name: 'Phiale Fountain', tier: 'infra', era: 16, w: 1, h: 1, cost: 1520, upkeep: 3.06,
    icon: '\u26F2', color: '#7fb4c9', waterRadius: 8,
    desc: 'A public basin on a lead main, fed by an aqueduct from sixty miles away. Waters 8 tiles. ' +
      'Nothing on this map drinks the sea: without a fountain in range, a building shuts down.',
  },
  sitonikon: {
    name: 'The Sitonikon', tier: 'infra', era: 16, w: 2, h: 3, cost: 7620, upkeep: 7.28,
    icon: '\u{1F33E}', color: '#c4a35a', storeGrain: 1200, storeFlour: 750, depot: true, needsRoad: true,
    desc: 'The grain office and its public granary. +1,200 grain and +750 bread while connected, and a ' +
      'SUPPLY POINT for carting - one out on the Thracian plain erases a whole district\'s premium.',
  },
  mitaton: {
    name: 'The Mitaton', tier: 'infra', era: 16, w: 2, h: 4, cost: 8250, upkeep: 4.75,
    icon: '\u{1F4E6}', color: '#a88f68', workers: 3, storeCraft: 110, depot: true, needsRoad: true,
    desc: 'The lodging and bonded warehouse the Book of the Eparch assigned to foreign merchants: ' +
      '+110 capacity for EVERY craft good while staffed. ★ BANK BLATTION THROUGH A LAPSED LICENCE ' +
      'instead of spilling it - this is the building that makes a quota survivable, and it costs money.',
  },

  metaxeion: {
    name: 'The Metaxeion', tier: 'food', era: 16, w: 2, h: 2, cost: 4900, upkeep: 5.76,
    icon: '\u{1F41B}', color: '#8fae62', workers: 3, dryLand: true, saltProof: true,
    out: { cocoon: 8.24 }, rp: 1.0,
    desc: 'White mulberry on dry terraces and the trays of worm beneath them, reeled at the cocoon: ' +
      '8.24 cocoons/min. It IGNORES the erosion clock and yields +50% on ground the grain has ruined ' +
      '(soil under 30%) - the terrace is what exhausted fields are for.',
  },
  serikarion: {
    name: 'The Serikarion', tier: 'craft', era: 16, w: 3, h: 3, cost: 11500, upkeep: 13.70,
    icon: '\u{1F9F5}', color: '#8e4a86', workers: 5, needsWater: true, needsRoad: true, industry: true,
    procIn: 'cocoon', procRate: 8.24, procOut: 'blattion', procRatio: 0.40, rp: 1.8,

    desc: 'The sealed workshop of the serikarioi, who alone may weave the imperial cloth: 8.24 cocoons ' +
      'into 3.30 bolts a minute - exactly one Eparch\'s licence. Ranking this building buys throughput ' +
      'you may not be allowed to sell.',
  },
  vestiopration: {
    name: 'The Vestiopration', tier: 'commerce', era: 16, w: 2, h: 2, cost: 11400, upkeep: 14.86,
    icon: '\u{1F3EA}', color: '#a4568f', workers: 4, needsWater: true, needsRoad: true,
    sells: 'blattion', sellRate: 3.30, sellPrice: 123.06, custRadius: 7, custMin: 24, rp: 3.0,
    desc: 'The stall of the vestiopratai, who alone may sell the finished bolt. 3.30 blattion/min at ' +
      '$246.12 UNDER THE LICENCE and $43.07 past it. Needs 24 residents. Rank THIS, not the loom.',
  },

  naphthaseep: {
    name: 'Naphtha Seep', tier: 'food', era: 16, w: 2, h: 2, cost: 4900, upkeep: 5.76,
    icon: '\u{1F6E2}\uFE0F', color: '#4a4740', workers: 3, onRock: true, industry: true,
    out: { naphtha: 4.12 }, rp: 1.2,
    desc: 'Crude petroleum welling from a rock fissure, skimmed and barrelled: 4.12 naphtha/min, the ' +
      'scarcest raw on the map. Must sit on rock, and it wants the same ridges your marble does. ' +
      'Nobody now knows what else went into the fire. Nobody then was allowed to.',
  },
  cheirosiphon: {
    name: 'The Cheirosiphon', tier: 'craft', era: 16, w: 3, h: 3, cost: 11500, upkeep: 13.70,
    icon: '\u{1F525}', color: '#a8412a', workers: 5, needsWater: true, needsRoad: true, industry: true,
    procIn: 'naphtha', procRate: 4.12, procOut: 'greekfire', procRatio: 0.40, rp: 1.8,
    desc: 'Naphtha, resin, and whatever else - the recipe died with the empire. 4.12 naphtha/min into ' +
      '1.65 measures of fire that burns on water. Licensed like the silk and for a better reason: ' +
      'this one was a state secret, and the penalty for telling it was not commercial.',
  },
  arsenalwharf: {
    name: 'Arsenal Wharf', tier: 'commerce', era: 16, w: 2, h: 2, cost: 7390, upkeep: 9.11,
    icon: '\u{1F6A2}', color: '#8a5a3a', workers: 4, nearWater: 1, needsRoad: true,
    sells: 'greekfire', sellRate: 1.65, sellPrice: 171.50, custRadius: 7, custMin: 30, rp: 3.0,
    desc: 'The fleet\'s own quay. 1.65 measures/min at $343.00 under the licence - the highest unit ' +
      'price in the age, sold to one customer, who is the state. Needs 30 residents: a navy needs a ' +
      'city behind it.',
  },

  thracianplain: {
    name: 'The Thracian Plain', tier: 'food', era: 16, w: 4, h: 4, cost: 9110, upkeep: 16.46,
    icon: '\u{1F33E}', color: '#a8c26a', workers: 3, needsWater: true,
    out: { grain: 64.43 }, rp: 1.0,
    desc: 'The open country beyond the walls: 64.43 grain/min, +50% on loam. The Egyptian grain fleet ' +
      'stopped in 618 and never resumed after 641; from then to 1453 the city ate Thrace and Bithynia.',
  },
  horizmill: {
    name: 'Horizontal Water Mill', tier: 'food', era: 16, w: 2, h: 2, cost: 7630, upkeep: 9.14,
    icon: '\u2699\uFE0F', color: '#b09a7e', workers: 4, nearWater: 1, industry: true, grainMill: true,
    procIn: 'grain', procRate: 64.43, procOut: 'flour', procRatio: 0.60, rp: 1.6,
    desc: '64.43 grain/min into 38.66 bread - ONE MILL FEEDS THE WHOLE CITY. It must stand within a ' +
      'tile of water, which here means the Horn or the strait, so your bread travels.',
  },
  mankipeion: {
    name: 'The Mankipeion', tier: 'commerce', era: 16, w: 3, h: 3, cost: 11450, upkeep: 16.38,
    icon: '\u{1F35E}', color: '#c98f5f', workers: 6, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 19.33, sellPrice: 13.65, custRadius: 7, custMin: 15, rp: 2.4,
    desc: 'The bakers\' corporation, whose price the Eparch fixed and who alone were forbidden to leave ' +
      'the city. Sells 19.33 bread/min at $13.65, leaving 19.33 to eat - 322 residents fed.',
  },

  proconnesus: {
    name: 'Proconnesian Quarry', tier: 'food', era: 16, w: 3, h: 3, cost: 12750, upkeep: 11.85,
    icon: '\u26F0\uFE0F', color: '#cfcac2', workers: 5, onRock: true, industry: true,
    out: { stone: 20.00 }, rp: 1.2,
    desc: 'White marble with grey veining, cut in beds on the island: 20.00 stone/min, scaled by the ' +
      'rock under it. ★ THE ROCK IS FINITE AND NEVER COMES BACK, and Hagia Sophia wants most of it - ' +
      'quarry the ridge flat and you have destroyed your own naphtha seep.',
  },
  marmarion: {
    name: 'The Marmarion', tier: 'food', era: 16, w: 3, h: 3, cost: 13390, upkeep: 15.95,
    icon: '\u{1FAA8}', color: '#b8b2a8', workers: 7, needsWater: true, needsRoad: true, industry: true,
    procIn: 'stone', procRate: 20.00, procOut: 'blocks', procRatio: 0.50, rp: 1.6,
    desc: 'Sand-and-water saws on a levelled floor: 20.00 stone/min into 10.00 dressed blocks - ONE ' +
      'QUARRY FEEDS ONE YARD EXACTLY. Every block it dresses is stone the dome does not get.',
  },
  lithoskala: {
    name: 'The Lithoskala', tier: 'commerce', era: 16, w: 2, h: 2, cost: 8050, upkeep: 9.93,
    icon: '\u{1F9F1}', color: '#a89a84', workers: 4, nearWater: 1, needsRoad: true,
    sells: 'blocks', sellRate: 3.13, sellPrice: 84.72, custRadius: 7, custMin: 19, rp: 2.4,
    desc: 'Lighters loading dressed marble for every church on the Marmara: 3.13 blocks/min at $84.72. ' +
      'The dome is the other customer, and it does not pay. Needs 19 residents.',
  },

  thynneion: {
    name: 'The Thynneion', tier: 'food', era: 16, w: 2, h: 3, cost: 4610, upkeep: 5.15,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 3, onWater: true, bridge: true,
    out: { fish: 23.89 }, rp: 1.0,

    desc: 'A fixed net across the current at the turn of the year: 23.89 fish/min, eaten at 75% of ' +
      'bread\'s worth - 298 residents fed from one building. Food with no field, no mill, no water ' +
      'coverage and no licence, and being planted in the water it carries the road to the far shore.',
  },

  kommerkion: {
    name: 'The Kommerkion', tier: 'commerce', era: 16, w: 1, h: 3, cost: 2890, upkeep: 2.73,
    icon: '\u{1F9FA}', color: '#bd9a70', workers: 2, needsRoad: true,
    sellsRaw: ['grain', 'cocoon', 'stone', 'naphtha', 'fish'],
    sellRate: 12.34, custRadius: 6, custMin: 15, rp: 1.2,
    desc: 'The customs stall, selling whatever raw good you have most of at 80% of list, 12.34 ' +
      'units/min. First income the hour your first terrace opens; knowing when to pull it down is the ' +
      'decision. It will happily sell your Proconnesian marble for $0.80 a block - don\'t.',
  },
  eparchate: {
    name: 'Office of the Eparch', tier: 'civic', era: 16, w: 3, h: 3, cost: 22950, upkeep: 15.39,
    icon: '\u{1F50F}', color: '#8f7ab5', workers: 8, needsRoad: true, needsWater: true,

    seal: true, rp: 1.0,
    desc: 'The Book of the Eparch, and the man who enforces it. Licenses 3.30 blattion and 1.65 fire a ' +
      'minute at DOUBLE price; everything past the licence goes for a third. A second Office doubles ' +
      'the licence and takes 30% of every licensed sale, a third takes 40%. Three is the legal ' +
      'maximum. A LICENCE YOU CANNOT FILL STILL TAXES THE ONES YOU CAN.',
  },
  hippodrome: {
    name: 'The Hippodrome', tier: 'civic', era: 16, w: 3, h: 4, cost: 15950, upkeep: 10.27,
    icon: '\u{1F3DF}\uFE0F', color: '#b5a07a',

    amenityRadius: 24, amenityBonus: 1, needsRoad: true, rp: 0.2,
    desc: 'Blues and Greens, four chariots a race, and a city that riots about it. +1 housing capacity ' +
      'for EVERY home within 24 tiles. One is enough; a second adds nothing to a home already covered.',
  },
  kommerkiarios: {
    name: "Kommerkiarios' Scale", tier: 'commerce', era: 16, w: 2, h: 3, cost: 6380, upkeep: 6.84,
    icon: '\u2696\uFE0F', color: '#c9b46a', workers: 3, needsRoad: true, needsWater: true,

    weighRadius: 10, keepsTally: true, rp: 1.0,
    desc: 'The customs officer\'s sealed weights and his ledger. Shops within 10 tiles sell at +12%. ' +
      'On a LICENSED price those twelve per cent are the best civic money in the age.',
  },
  patriarchate: {
    name: 'Patriarchal Almonry', tier: 'civic', era: 16, w: 4, h: 4, cost: 21690, upkeep: 12.29,
    icon: '\u26EA', color: '#c9a878', workers: 7, needsRoad: true, needsWater: true,
    depot: true, storeGrain: 3600, storeFlour: 2250, amenityRadius: 10, rp: 1.2,
    desc: 'The Church\'s own storehouse and bread dole: +3,600 grain, +2,250 bread, a supply point for ' +
      'carting, and +1 housing capacity within 10 tiles.',
  },

  oikema: {
    name: 'Rented Oikema', tier: 'housing', era: 16, w: 1, h: 1, cost: 3070, upkeep: 1.49,
    icon: '\u{1F3E0}', color: '#d8a37a', cap: 14, needsWater: true, needsRoad: true, rp: 0.3,
    desc: 'A rented room off a courtyard stair. Homes 14, rising as it earns its rungs.',
  },
  peristylon: {
    name: 'The Peristylon', tier: 'housing', era: 16, w: 1, h: 1, cost: 7690, upkeep: 3.72,
    icon: '\u{1F3E1}', color: '#e0b284', cap: 26, needsWater: true, needsRoad: true, rp: 0.3,
    levels: ['Unroofed Court', 'The Peristylon', 'Colonnaded Peristylon', 'Marbled Peristylon',
             "Merchant's Peristylon", 'Patrician Peristylon'],
    desc: 'Rooms on four sides of a private colonnaded court with a well-head at its centre: homes 26.',
  },
  archontikon: {
    name: 'The Archontikon', tier: 'housing', era: 16, w: 2, h: 2, cost: 15790, upkeep: 7.56,
    icon: '\u{1F3F0}', color: '#c9b8a0', cap: 62, needsWater: true, needsRoad: true, rp: 0.3,
    levels: ['Vaulted Undercroft', 'The Archontikon', 'Balconied Archontikon', 'Chapelled Archontikon',
             "Logothete's Archontikon", 'Palatine Archontikon'],
    desc: 'A galleried house on a vaulted undercroft, with its own cistern and its own chapel: homes 62.',
  },

  porphyrycolumn: {
    name: 'Porphyry Column', tier: 'beauty', era: 16, w: 1, h: 1, cost: 1270, upkeep: 0,
    icon: '\u{1FAA8}', color: '#7a3a4a', cosmetic: true, nameable: true,
    desc: 'A shaft of imperial purple stone on a stepped base, with a statue on top that fell off ' +
      'centuries ago. No output, no upkeep. Click it to name the quarter.',
  },

  koukoularion: {
    name: 'The Koukoularion', tier: 'food', era: 16, w: 2, h: 2, cost: 9800, upkeep: 9.79,
    icon: '\u{1F41B}', color: '#9fbe72', workers: 4, dryLand: true, saltProof: true,
    out: { cocoon: 16.48 }, rp: 1.0,
    desc: 'Tiered trays under a raised roof, and mulberry grafted for leaf rather than fruit: 16.48 ' +
      'cocoons/min. Still ignores the erosion clock; still thrives on ruined ground.',
  },
  cornlands: {
    name: 'Bithynian Corn Lands', tier: 'food', era: 16, w: 4, h: 4, cost: 18220, upkeep: 27.98,
    icon: '\u{1F33E}', color: '#b8d07a', workers: 4, needsWater: true,
    out: { grain: 128.86 }, rp: 1.0,
    desc: 'The far shore under plough as well as the near one: 128.86 grain/min, +50% on loam.',
  },
  tappedfissure: {
    name: 'The Tapped Fissure', tier: 'food', era: 16, w: 2, h: 2, cost: 9800, upkeep: 9.79,
    icon: '\u{1F6E2}\uFE0F', color: '#57534b', workers: 4, onRock: true, industry: true,
    out: { naphtha: 8.24 }, rp: 1.2,
    desc: 'The seep cased, sunk and pumped: 8.24 naphtha/min off the same fissure.',
  },
  marmarabeds: {
    name: 'The Marmara Beds', tier: 'food', era: 16, w: 3, h: 3, cost: 25500, upkeep: 20.14,
    icon: '\u26F0\uFE0F', color: '#dad5cd', workers: 7, onRock: true, industry: true,
    out: { stone: 40.00 }, rp: 1.2,
    desc: 'Every bed on the island worked at once: 40.00 stone/min. The rock still never comes back.',
  },
  thynnoskopeion: {
    name: 'The Thynnoskopeion', tier: 'food', era: 16, w: 2, h: 3, cost: 9220, upkeep: 8.76,
    icon: '\u{1F41F}', color: '#7fb0c6', workers: 4, onWater: true, bridge: true,
    out: { fish: 47.78 }, rp: 1.0,
    desc: 'A watchman on a mast above the net, calling the shoal down onto it: 47.78 fish/min. ' +
      'Still no field, no mill, no water coverage and no licence.',
  },
  histourgeion: {
    name: 'The Histourgeion', tier: 'craft', era: 16, w: 3, h: 3, cost: 11500, upkeep: 18.50,
    icon: '\u{1F9F5}', color: '#9c5494', workers: 6, needsWater: true, needsRoad: true, industry: true,
    procIn: 'cocoon', procRate: 11.54, procOut: 'blattion', procRatio: 0.40, rp: 1.8,
    desc: 'Drawlooms in a hall the guild inspects: 11.54 cocoons into 4.62 bolts a minute. ' +
      '★ THAT IS 1.40 LICENCES\' WORTH OFF ONE OFFICE. Buy the licence before you buy the loom.',
  },
  siphonfoundry: {
    name: 'Siphon Foundry', tier: 'craft', era: 16, w: 3, h: 3, cost: 11500, upkeep: 18.50,
    icon: '\u{1F525}', color: '#b8492f', workers: 6, needsWater: true, needsRoad: true, industry: true,
    procIn: 'naphtha', procRate: 5.77, procOut: 'greekfire', procRatio: 0.40, rp: 1.8,
    desc: 'Bronze siphons cast and proofed on the premises: 5.77 naphtha into 2.31 measures a minute.',
  },
  shipmills: {
    name: 'Moored Ship-Mills', tier: 'food', era: 16, w: 2, h: 2, cost: 7630, upkeep: 12.34,
    icon: '\u2699\uFE0F', color: '#c0a98d', workers: 5, nearWater: 1, industry: true, grainMill: true,
    procIn: 'grain', procRate: 90.20, procOut: 'flour', procRatio: 0.60, rp: 1.6,
    desc: 'Wheels slung between moored hulls in the current of the Horn: 90.20 grain/min into 54.12 bread.',
  },
  hydropriston: {
    name: 'The Hydropriston', tier: 'craft', era: 16, w: 3, h: 3, cost: 13390, upkeep: 21.53,
    icon: '\u{1FAA8}', color: '#c4beb4', workers: 8, needsWater: true, needsRoad: true, industry: true,
    procIn: 'stone', procRate: 28.00, procOut: 'blocks', procRatio: 0.50, rp: 1.6,
    desc: 'A crank-and-connecting-rod saw driven off the wheel - the machine on the Hierapolis relief: ' +
      '28.00 stone/min into 14.00 blocks.',
  },
  vestiopratai: {
    name: 'Vestiopratai Exchange', tier: 'commerce', era: 16, w: 2, h: 2, cost: 17100, upkeep: 20.80,
    icon: '\u{1F3EA}', color: '#b3629d', workers: 5, needsWater: true, needsRoad: true,
    sells: 'blattion', sellRate: 6.60, sellPrice: 123.06, custRadius: 8, custMin: 24, rp: 3.0,
    desc: 'The guild\'s own hall on the Mese. 6.60 blattion/min - ★ TWO FULL LICENCES, and it will ' +
      'dump every bolt of the second one unless you have the Offices to cover it.',
  },
  ploimon: {
    name: 'The Ploimon', tier: 'commerce', era: 16, w: 2, h: 2, cost: 11090, upkeep: 12.75,
    icon: '\u{1F6A2}', color: '#9a6844', workers: 5, nearWater: 1, needsRoad: true,
    sells: 'greekfire', sellRate: 3.30, sellPrice: 171.50, custRadius: 8, custMin: 30, rp: 3.0,
    desc: 'The imperial fleet\'s own establishment. 3.30 measures/min - two licences, and the same warning.',
  },
  psomotheke: {
    name: 'The Psomotheke', tier: 'commerce', era: 16, w: 3, h: 3, cost: 17180, upkeep: 22.93,
    icon: '\u{1F35E}', color: '#d69a6a', workers: 7, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 38.66, sellPrice: 13.65, custRadius: 8, custMin: 15, rp: 2.4,
    desc: 'Bread halls along the colonnade, at the price the Eparch set. 38.66 bread/min at $13.65.',
  },
  customsarcade: {
    name: 'Customs Arcade', tier: 'commerce', era: 16, w: 1, h: 3, cost: 4340, upkeep: 3.82,
    icon: '\u{1F9FA}', color: '#c9a87e', workers: 3, needsRoad: true,
    sellsRaw: ['grain', 'cocoon', 'stone', 'naphtha', 'fish'],
    sellRate: 24.68, custRadius: 7, custMin: 15, rp: 1.2,
    desc: 'The stall grown into a colonnade of them: 24.68 raw units/min at 80% of list.',
  },
  marbleslipways: {
    name: 'Marble Slipways', tier: 'commerce', era: 16, w: 2, h: 2, cost: 12080, upkeep: 13.90,
    icon: '\u{1F9F1}', color: '#b5a893', workers: 5, nearWater: 1, needsRoad: true,
    sells: 'blocks', sellRate: 6.26, sellPrice: 84.72, custRadius: 8, custMin: 19, rp: 2.4,
    desc: 'Cradles and winches down to the water: 6.26 blocks/min at $84.72. The dome still does not pay.',
  },
  kinsterna: {
    name: 'The Kinsterna', tier: 'infra', era: 16, w: 1, h: 1, cost: 2280, upkeep: 4.59,
    icon: '\u{1F3DB}\uFE0F', color: '#6f9aa8', waterRadius: 16,

    desc: 'A roofed reservoir on three hundred columns, filled from an aqueduct sixty miles long. ' +
      'Waters 16 tiles - the widest reach on the ladder, and what every Phiale wants to become.',
  },
  lamiavaults: {
    name: 'Lamia Grain Vaults', tier: 'infra', era: 16, w: 2, h: 3, cost: 11430, upkeep: 10.56,
    icon: '\u{1F33E}', color: '#d0af62', storeGrain: 1740, storeFlour: 1090, depot: true, needsRoad: true,
    desc: 'The vaults under the Lamia quarter: +1,740 grain and +1,090 bread, and still a supply point.',
  },
  embolos: {
    name: 'Vaulted Embolos', tier: 'infra', era: 16, w: 2, h: 4, cost: 12380, upkeep: 6.89,
    icon: '\u{1F4E6}', color: '#b59a73', workers: 4, storeCraft: 160, depot: true, needsRoad: true,
    desc: 'Bonded vaults under a colonnaded street: +160 for EVERY craft good while staffed. ' +
      'The deepest place to sit out a licence you cannot fill.',
  },
  kathisma: {
    name: 'The Kathisma', tier: 'civic', era: 16, w: 3, h: 4, cost: 23930, upkeep: 14.89,
    icon: '\u{1F3DF}\uFE0F', color: '#c2ad86',
    amenityRadius: 35, amenityBonus: 1, needsRoad: true, rp: 0.2,
    desc: 'The imperial box, joined to the palace by its own stair. +1 housing capacity within 35 tiles.',
  },
  customsbasilica: {
    name: 'Customs Basilica', tier: 'commerce', era: 16, w: 2, h: 3, cost: 9570, upkeep: 9.92,
    icon: '\u2696\uFE0F', color: '#d4c078', workers: 4, needsRoad: true, needsWater: true,
    weighRadius: 15, keepsTally: true, rp: 1.0,
    desc: 'The whole customs establishment under one roof. Shops within 15 tiles sell at +12%.',
  },
  diakonia: {
    name: 'The Diakonia', tier: 'civic', era: 16, w: 4, h: 4, cost: 32540, upkeep: 17.82,
    icon: '\u26EA', color: '#d4b384', workers: 9, needsRoad: true, needsWater: true,
    depot: true, storeGrain: 5220, storeFlour: 3260, amenityRadius: 15, rp: 1.2,
    desc: 'The Church\'s charitable establishment at full extent: +5,220 grain, +3,260 bread, and +1 ' +
      'housing capacity within 15 tiles.',
  },
  sekreton: {
    name: 'The Sekreton', tier: 'civic', era: 16, w: 3, h: 3, cost: 34430, upkeep: 22.31,
    icon: '\u{1F50F}', color: '#a08cc4', workers: 10, needsRoad: true, needsWater: true,

    seal: true, sealWeight: 1.5, rp: 1.0,
    desc: 'The Eparch\'s full bureau, its logothetes and its archive. Counts as ONE AND A HALF ' +
      'Offices - the only thing in the age that raises the ceiling instead of the throughput.',
  },
  xenodocheion: {
    name: 'The Xenodocheion', tier: 'housing', era: 16, w: 1, h: 1, cost: 4610, upkeep: 2.24,
    icon: '\u{1F3E0}', color: '#e0af86', cap: 21, needsWater: true, needsRoad: true, rp: 0.3,

    levels: ['Pilgrim Room', 'The Xenodocheion', 'Warded Xenodocheion', 'Storeyed Xenodocheion',
             "Almoner's Xenodocheion", 'Patriarchal Xenodocheion'],
    desc: 'The rented room become a licensed lodging house with a warden. Homes 21.',
  },
  mesaulion: {
    name: 'The Mesaulion', tier: 'housing', era: 16, w: 1, h: 1, cost: 11540, upkeep: 5.58,
    icon: '\u{1F3E1}', color: '#e8be91', cap: 38, needsWater: true, needsRoad: true, rp: 0.3,

    levels: ['Screened Walk', 'The Mesaulion', 'Galleried Mesaulion', 'Roofed Mesaulion',
             "Notary's Mesaulion", 'Senatorial Mesaulion'],
    desc: 'The inner court roofed over and the upper storey carried on it: homes 38.',
  },
  kouropalation: {
    name: 'The Kouropalation', tier: 'housing', era: 16, w: 2, h: 2, cost: 23690, upkeep: 11.34,
    icon: '\u{1F3F0}', color: '#d6c5ad', cap: 90, needsWater: true, needsRoad: true, rp: 0.3,
    levels: ['Stepped Terrace', 'The Kouropalation', 'Porphyry Kouropalation', 'Domed Kouropalation',
             "Caesar's Kouropalation", 'Imperial Kouropalation'],
    desc: 'The house of a man with a court title and the staff that comes with it: homes 90.',
  },

  townhall: {
    name: 'Town Hall', tier: 'civic', w: 3, h: 3, cost: 0, upkeep: 0,
    icon: '\u{1F3DB}️', color: '#c9a86a', fixed: true,
    desc: 'Your permanent flagship. Pays an in-game trickle AND accrues real rent every second. One upgrade unlocks per era — rent compounds all the way to the Transdimensional age.',
  },

  waterhole: {
    name: 'Waterhole', tier: 'infra', era: 0, w: 1, h: 1, cost: 22, upkeep: 0.033,
    icon: '\u{1F573}\u{FE0F}', color: '#7fb4c9', selfRun: true, waterRadius: 5,

    desc: 'A hoof-punched hollow that holds water through the dry weeks. Waters 5 tiles. Everything ' +
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
      'lay a line of them and the far braid joins your ground.',
  },

  fernprairie: {
    name: 'Fern Prairie', tier: 'food', era: 0, w: 2, h: 2, cost: 36, upkeep: 0.050,
    icon: '\u{1F33F}', color: '#7d9a55', selfRun: true, needsWater: true,
    out: { grain: 0.33 },

    desc: '0.33 frond/min off a stand of tree fern and horsetail. +50% on floodplain silt, +25% ' +
      'touching a Drying Lawn. THREE of these feed one Lawn on plain ground, two on silt.',
  },

  grazinglawn: {
    name: 'The Drying Lawn', tier: 'food', era: 0, w: 2, h: 2, cost: 90, upkeep: 0.083,
    icon: '\u{1F343}', color: '#8fae62', selfRun: true, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 1.00, procOut: 'flour', procRatio: 0.6,

    desc: 'Fronds beaten flat and left to dry: 1.00 standing frond/min becomes 0.60 fern meal — 1.25 ' +
      'and 0.75 when it touches a Prairie, because the +25% raises both sides. ONE LAWN FEEDS TEN. ' +
      'Industry: nobody sleeps beside a lawn with no cover on it.',
  },
  leafmat: {
    name: 'The Leaf Mat', tier: 'commerce', era: 0, w: 2, h: 2, cost: 90, upkeep: 0.100,
    icon: '\u{1F342}', color: '#6a7a4a', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 0.338, sellPrice: 3.07, custRadius: 6, custMin: 3,

    desc: 'Surplus the camp cannot eat now, trodden into airless mud and kept. 0.338 fern meal/min at $3.07. ' +
      'Needs 3 people. Fern meal sustains the camp; it is not what makes it rich.',
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

    desc: '0.67 frond/min becomes 0.34 clutches. It drinks the same fern your Drying Lawn wants, so ' +
      'the eggs you gather compete with the dinner you dry — grow more prairie, or ' +
      'choose. Clutches are also what a Carrion Ground gives away.',
  },
  eggbed: {
    name: 'Egg Bed', tier: 'commerce', era: 0, w: 2, h: 2, cost: 80, upkeep: 0.093,
    icon: '\u{1F423}', color: '#c9a86a', selfRun: true, needsWater: true, needsRoad: true,
    sells: 'beer', sellRate: 0.394, sellPrice: 4.02, custRadius: 6, custMin: 3,

    desc: '0.394 clutches/min at $4.02, buried in successive flood layers. Auca Mahuevo is thousands ' +
      'of eggs across four such layers, and every one of them is a year the nesting grounds came back to the ' +
      'same mud.',
  },

  magnoliathicket: {
    name: 'Magnolia Thicket', tier: 'food', era: 0, w: 3, h: 3, cost: 90, upkeep: 0.067,
    icon: '\u{1F338}', color: '#b5849c', selfRun: true, saltProof: true,
    out: { dates: 0.50 },

    desc: 'The first flowers in the world, and a hadrosaur eats them: 0.50 fruit/min, eaten like fern ' +
      'meal. Needs NO water coverage and no road, ignores the trophic loop entirely, and takes +50% ' +
      'standing on ash-buried ground nobody else wants. It is what feeds the camp while the ' +
      'predators are being paid.',
  },
  rotwoodbed: {
    name: 'Rot-Wood Bed', tier: 'food', era: 0, w: 2, h: 2, cost: 58, upkeep: 0.050,
    icon: '\u{1F980}', color: '#7a6a4a', selfRun: true, nearWater: 2,
    out: { fish: 0.40 },

    desc: '0.40 crustaceans/min out of rotted conifer logs on the bar. Hadrosaur dung from this exact ' +
      'formation is full of decayed wood AND crustacean shell (Chin et al. 2017) — the duckbills were not ' +
      'pure browsers. Eaten at 75% of fern meal. Needs no water, no road and nobody to staff it.',
  },

  channellag: {
    name: 'Channel Lag', tier: 'commerce', era: 0, w: 1, h: 2, cost: 51, upkeep: 0.050,
    icon: '\u{1F30A}', color: '#a89a7a', selfRun: true, needsWater: true, needsRoad: true,
    sellsRaw: ['stone', 'grain', 'clay', 'wool', 'reeds'], sellRate: 0.845,
    custRadius: 6, custMin: 3,

    desc: 'A bend where everything the flood carried settles out. Sells whichever raw the camp has ' +
      'most of — bone, frond, marl, resin, horsetail — at 80% of list, 0.845/min. Your first income ' +
      'the minute the first shoal opens; knowing when to demolish it is the real decision.',
  },

  nestmound: {
    name: 'Fern Bower', tier: 'housing', era: 0, w: 1, h: 1, cost: 12, upkeep: 0.017,
    icon: '\u{1F6D6}', color: '#b09a72', selfRun: true, cap: 2, needsWater: true, needsRoad: true,

    desc: 'Bent boughs over a scraped hollow, banked with fern and warm from the inside. Holds 1, and 2 ' +
      'once it has earned a rung. +1 near a Soak or a Sentinel Knoll, −1 next to industry — nobody ' +
      'sleeps beside a lawn with no cover on it.',
  },
  rookeryterrace: {
    name: 'Thatch Row', tier: 'housing', era: 0, w: 2, h: 2, cost: 30, upkeep: 0.043,
    icon: '\u{1F3D8}\u{FE0F}', color: '#c2a878', selfRun: true, cap: 6, needsWater: true, needsRoad: true,

    levels: ['Bough Line', 'Thatch Row', 'Packed Row', 'Screened Row',
             'Long Thatch', 'Ancestral Thatch'],

    desc: 'One long thatch with the doors all on the same side: 3 in four tiles, 6 once it has ' +
      'earned a rung. Sleeping packed IS the defence — a hundred people see a predator a hundred ' +
      'times sooner, and the dilution term is not a metaphor.',
  },

  wallow: {
    name: 'The Soak', tier: 'civic', era: 0, w: 1, h: 1, cost: 29, upkeep: 0.017,
    icon: '\u{1F4A7}', color: '#8a7a5f', selfRun: true, capRadius: 11,

    desc: 'Churned warm mud at the water’s edge that the whole camp comes back to: washing, the sting ' +
      'taken out of bites, and the only hour everybody is in one place. +1 capacity for EVERY shelter ' +
      'within 11 tiles. One is enough; a second adds nothing to a shelter already covered.',
  },
  sentinelknoll: {
    name: 'Sentinel Knoll', tier: 'civic', era: 0, w: 1, h: 1, cost: 33, upkeep: 0.027,
    icon: '\u{1F441}\u{FE0F}', color: '#9a8f6a', selfRun: true,
    amenityRadius: 4, sentinelRelief: 0.25,

    desc: 'A rise with a clear line to the treeline. +1 capacity within 4 tiles, and shelters it covers ' +
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

    desc: 'A deep bank hollow the whole camp shelters under: far more frond and fern-meal capacity, and ' +
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
    desc: 'The stand let to grow deep and cut in strips instead of stripped bare, so it comes back ' +
      'behind you: 0.66 frond/min, double the open prairie.',
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
      'Needs no water coverage and nobody to staff it.',
  },

  trampleflat: {
    name: 'The Trample Flat', tier: 'food', era: 0, w: 2, h: 2, cost: 180, upkeep: 0.113,
    icon: '\u{1F343}', color: '#7d9a52', selfRun: true, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 1.40, procOut: 'flour', procRatio: 0.6,
    desc: 'Ground worked flat by the whole camp passing over it twice a day: 1.40 frond/min into ' +
      '0.84 fern meal. Fourteen fed off one flat.',
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
    desc: 'A whole bank of mounds, laid and re-laid in the same season: 0.94 frond/min into 0.47 ' +
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
    desc: 'Four seasons of clutches one layer on top of the other, each sealed by the flood that ended it: ' +
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
    icon: '\u{1F4A7}', color: '#7fb4c9', selfRun: true, waterRadius: 8,

    desc: 'A true seep at the foot of the ridge: waters 8 tiles and it does not go down in a drought. ' +
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
    desc: 'Generations of washing in one hollow until it is a pond: +1 capacity for every shelter ' +
      'within 16 tiles.',
  },
  watchrise: {
    name: 'The Watch Rise', tier: 'civic', era: 0, w: 1, h: 1, cost: 83, upkeep: 0.049,
    icon: '\u{1F441}\u{FE0F}', color: '#a89a72', selfRun: true,
    amenityRadius: 6, sentinelRelief: 0.36,

    desc: 'A rise with sight of the whole floodplain and somebody on it at all hours: +1 capacity within ' +
      '6 tiles, and shelters it covers lose 36% less to predators.',
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
    desc: 'A whole cut bank of layered flood silt, hollowed out along the seams: half again the frond ' +
      'and fern meal the Refuge holds, and still a supply point.',
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
    icon: '\u{1F4D0}', color: '#cbb98a', workers: 3, needsWater: true, rankDiscount: 0.15,

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

  sluicegate: {
    name: 'Diversion Gate', tier: 'infra', era: 8, w: 1, h: 2, cost: 170, upkeep: 0.29,
    icon: '\u{1F6AA}', color: '#6f9ec9', nearWater: 1,
    cascadeSource: 6.0, waterRadius: 5,

    desc: 'A timber gate in a channel bank. Emits 6.0 HEAD a minute into any ditch or field it can ' +
      'reach — and head only ever runs downhill or level, ONE STEP AT A TIME, never up. A field draws ' +
      '2.0, so THREE FIELDS TO A GATE, at any distance. On the bank it also waters 5 tiles, and ' +
      'standing beside water pays +50%.',
  },
  fieldditch: {
    name: 'Field Ditch', tier: 'infra', era: 8, w: 1, h: 1, cost: 30, upkeep: 0,
    icon: '\u{1F4A6}', color: '#7fa8c2', cascadeCarry: true,

    desc: 'A cut and puddled ditch on the contour. Carries head one tile — level, or ONE step down, ' +
      'never up — and loses NOTHING doing it. $30 to dig and nothing to keep. Drag to paint, and mind ' +
      'which way the ground goes.',
  },
  cutchannel: {
    name: 'Cut Channel', tier: 'infra', era: 8, w: 1, h: 2, cost: 330, upkeep: 0.41,
    icon: '\u{26CF}\u{FE0F}', color: '#5f8aa8', workers: 1, nearWater: 1,
    cascadeCut: 1, cascadeThrough: 6.0,

    desc: 'Dug deep enough to pass THROUGH a rise instead of over it: carries up to 6.0 head across ONE ' +
      'step of rising ground — the only thing in this age that can, and a well never is. One person to ' +
      'keep it clear, forever. It cannot lift water above its source; nothing can.',
  },
  windlasswell: {
    name: 'Windlass Well', tier: 'infra', era: 8, w: 1, h: 1, cost: 170, upkeep: 0.29,
    icon: '\u{26F2}', color: '#7fb4c9', waterRadius: 9,

    desc: 'Rope, drum and a rammed kerb. Waters 9 tiles for homes, shops and workshops — and does ' +
      'NOTHING WHATEVER for a bunded field. Rice does not want a radius; it wants head. This is the ' +
      'trap of the age and it is worth falling into once.',
  },
  pitgranary: {
    name: 'Pit Granary', tier: 'infra', era: 8, w: 1, h: 1, cost: 220, upkeep: 0.12,
    icon: '\u{1F573}\u{FE0F}', color: '#b08a5a', storeGrain: 61, storeFlour: 37,

    desc: 'A bell-shaped pit cut into the loess, lined and lidded — the storage this landscape gives ' +
      'you for free. +61 grain and +37 meal, NO workers: the famine buffer that does not eat.',
  },
  timbergranary: {
    name: 'Raised Timber Granary', tier: 'infra', era: 8, w: 3, h: 3, cost: 1400, upkeep: 0.58,
    icon: '\u{1F33E}', color: '#c9a878', workers: 4, needsRoad: true,
    storeGrain: 329, storeFlour: 205, threshing: true, depot: true,

    desc: 'Timber cribs on a rammed platform with a threshing floor at their foot. +329 grain, +205 ' +
      'meal, and a supply point for carting. The +25% reaches every MILLET FIELD it touches — a ' +
      'flooded bund has nothing to thresh, and you do not thresh rice on a floor.',
  },
  clanstore: {
    name: 'Clan Store Room', tier: 'infra', era: 8, w: 2, h: 2, cost: 550, upkeep: 0.59,
    icon: '\u{1F4E6}', color: '#b59a72', workers: 2, needsWater: true, needsRoad: true,
    depot: true, storeCraft: 35,

    desc: 'Racked shelves and sealed jars behind the compound wall: +35 capacity for EVERY craft good ' +
      '(silk, cocoon, ritual bronze, salt, brine and the rest). Bank goods through a shop’s bad ' +
      'spell instead of dumping them abroad at half price — and it is a supply point for carting.',
  },

  bundedfield: {
    name: 'Bunded Rice Field', tier: 'food', era: 8, w: 2, h: 3, cost: 360, upkeep: 0.59,
    icon: '\u{1F33E}', color: '#7fae62', workers: 2,
    out: { rice: 3.65 }, needsHead: true, cascadeDraw: 2.0,

    desc: 'A levelled, bunded, flooded plot: 3.65 rice a minute at full head, and it does not want a ' +
      'well — it wants a GATE ABOVE IT. Draws 2.0 head; a gate emits 6.0, so three of these to a gate. ' +
      'With no head it still takes 15% off the rain, so a mistake bleeds rather than kills. It never ' +
      'salts its ground, because the water washes the salt down past the roots.',
  },

  milletfield: {
    name: 'Millet Field', tier: 'food', era: 8, w: 2, h: 2, cost: 280, upkeep: 0.44,
    icon: '\u{1F33E}', color: '#c9b872', workers: 2, needsWater: true, plowed: true,
    out: { grain: 2.43 },

    desc: 'The northern staple and this state’s actual bread: 2.43 grain a minute. +50% on silt, ' +
      '+20% under an Ox Byre, +25% beside a granary floor. A well, a plough, dry ground — everything ' +
      'the rice field is not, and it keeps feeding you when the head does not reach. It DOES salt its ' +
      'ground; the rice field does not.',
  },
  mulberrygrove: {
    name: 'Mulberry Grove', tier: 'food', era: 8, w: 3, h: 3, cost: 690, upkeep: 0.74,
    icon: '\u{1F343}', color: '#6faf62', workers: 4, dryLand: true,
    out: { mulberry: 6.98 },

    desc: 'Hard-pollarded mulberry on the loess above the fields: 6.98 leaf a minute. Wants DRY ground ' +
      '(+50%) — never your field silt, never a ditch bank. Silk starts on the worst soil you own, and ' +
      'it is above the rice on purpose: expanding one eats the other.',
  },

  oreadit: {
    name: 'Ore Adit', tier: 'food', era: 8, w: 2, h: 3, cost: 440, upkeep: 0.44,
    icon: '\u{26CF}\u{FE0F}', color: '#a8794a', workers: 2, onRock: true, industry: true,
    out: { copperore: 2.79 },

    desc: 'A timbered gallery driven into the ridge: 2.79 copper ore a minute, +50% standing on rock. ' +
      'It fights the quarry for the same outcrops, and this civilisation is remembered for what comes ' +
      'out of it.',
  },
  saltlakepan: {
    name: 'Salt-Lake Pan', tier: 'food', era: 8, w: 2, h: 2, cost: 330, upkeep: 0.35,
    icon: '\u{1F9C2}', color: '#dcd8c8', workers: 2, onSalt: true,
    out: { brine: 1.74 },

    desc: 'Shallow pans scraped into the lake crust and worked by sun and wind: 1.74 brine a minute, ' +
      '+50% on the crust itself. The salt basin is 1% of this map and it is the ONE piece of ground in ' +
      'the age you cannot manufacture — there is no salt brush, and there never will be.',
  },

  stonequarry: {
    name: 'Rubble & Tamping Quarry', tier: 'food', era: 8, w: 3, h: 3, cost: 1240, upkeep: 1.03,
    icon: '\u{1FAA8}', color: '#b0a894', workers: 5, onRock: true, industry: true, quarried: true,
    out: { stone: 4.0 },

    desc: 'Broken rock for wall footings and tamping grit for the courses above: 4.0 stone a minute. ' +
      'STAND IT ON THE ROCK — off the outcrop it runs at half and eats nothing. The seam is FINITE and ' +
      'a worked-out face is worked out forever. This is the first age on the ladder that is asked for ' +
      'stone at all, and this is the building that answers.',
  },

  apricotgrove: {
    name: 'Apricot Orchard', tier: 'food', era: 8, w: 2, h: 2, cost: 310, upkeep: 0.26,
    icon: '\u{1F338}', color: '#c98f8f', workers: 2,
    out: { dates: 1.62 }, saltProof: true,

    desc: 'Apricots in rows behind the compound: 1.62 fruit a minute, eaten like grain. Needs NO water, ' +
      'NO head and NO road, and it IGNORES the salt clock — the one thing you can plant when a fan has ' +
      'gone dry and you have not found the break yet. On ruined ground it yields +50%.',
  },
  riverweir: {
    name: 'Huan River Weir', tier: 'food', era: 8, w: 1, h: 3, cost: 440, upkeep: 0.44,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 2, onWater: true,
    out: { fish: 2.92 },

    desc: 'Stake and wattle set across the Huan: 2.92 fish a minute. It stands IN the channel, owes the ' +
      'cascade nothing, and the oracle bones ask about the fishing as often as about the rain.',
  },

  oxpens: {
    name: 'Ox & Cattle Pens', tier: 'food', era: 8, w: 2, h: 4, cost: 1110, upkeep: 0.88,
    icon: '\u{1F402}', color: '#9c7f5c', workers: 2, dryLand: true, needsWater: true,
    oxTeam: true,

    desc: 'The state’s herd, kept for the plough, the table and the altar. It eats 0.4 grain a ' +
      'minute as fodder and ploughs EVERY Millet Field within 14 tiles to +20%. It makes no bone ' +
      'itself: that is what the midden beside it is for.',
  },
  bonemidden: {
    name: 'Bone Midden', tier: 'food', era: 8, w: 2, h: 2, cost: 360, upkeep: 0.44,
    icon: '\u{1F9B4}', color: '#cfc4ae', workers: 2, dryLand: true,
    out: { bone: 1.74 },

    desc: 'The pit the pens throw their waste into, worked over for scapulae, long bones and horn: 1.74 ' +
      'a minute. Anyang’s bone workshops counted their waste in the tens of thousands and nobody ' +
      'expects them; the scapulae go to the diviners and the rest becomes pins and arrowheads.',
  },

  loesspits: {
    name: 'Loess Manure Pits', tier: 'food', era: 8, w: 1, h: 1, cost: 250, upkeep: 0.24,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a7a5c', soilRadius: 6,

    desc: 'Pits of stable sweepings and night soil dug into the loess and turned back over the strips. ' +
      'Land within 6 tiles recovers from the salt 3x faster. Pair it with a fallow field — cropping one ' +
      'plot forever will exhaust it, and the bunds cannot help the upland.',
  },

  troughhammer: {
    name: 'Trough Hammer', tier: 'food', era: 8, w: 2, h: 3, cost: 690, upkeep: 0.74,
    icon: '\u{1F35A}', color: '#b09a7e', workers: 2, nearWater: 1, industry: true,
    procIn: 'rice', procOut: 'flour', procRate: 7.30, procRatio: 0.62,

    desc: 'A cam on a waterwheel drops a stone pestle: 7.30 rice a minute hulled into 4.53 meal. TWO ' +
      'hands where a Pestle Yard takes four, because the river is doing the work — which is the whole ' +
      'argument for water power, and why it wants to stand on the stream (+50%).',
  },
  pestleyard: {
    name: 'Pestle Yard', tier: 'food', era: 8, w: 2, h: 2, cost: 690, upkeep: 0.74,
    icon: '\u{2699}\u{FE0F}', color: '#c9b48a', workers: 4, needsWater: true,
    grainMill: true, industry: true,
    procIn: 'grain', procOut: 'flour', procRate: 7.30, procRatio: 0.60,

    desc: 'Wooden pestles, stone mortars and four people swinging them: 7.30 grain into 4.38 meal. ' +
      'Slightly worse yield, twice the mouths, and it stands anywhere a well reaches. The building you ' +
      'use until you find a stream — and the one that keeps grinding when the head does not.',
  },
  aleshed: {
    name: 'Millet Ale Shed', tier: 'craft', era: 8, w: 2, h: 2, cost: 660, upkeep: 0.77,
    icon: '\u{1F376}', color: '#c9a24a', workers: 4, needsWater: true, industry: true,
    procIn: 'grain', procOut: 'beer', procRate: 3.49, procRatio: 0.5,

    desc: 'Millet mashed, fermented and strained for the ancestral libation: 3.49 grain into 1.74 ale. ' +
      'It drinks the grain your Pestle Yard wanted — the jue and the gu exist for exactly this, and the ' +
      'bones record the offering.',
  },
  wormshed: {
    name: 'Silkworm Shed', tier: 'craft', era: 8, w: 2, h: 3, cost: 750, upkeep: 0.83,
    icon: '\u{1F41B}', color: '#cdbb92', workers: 4, needsWater: true, industry: true,
    procIn: 'mulberry', procOut: 'cocoon', procRate: 6.98, procRatio: 0.5,

    desc: 'Tiered trays in a warmed, draught-free room; the worms are fed chopped leaf every two hours ' +
      'for a month. 6.98 leaf into 3.49 cocoons. One grove feeds one shed exactly.',
  },
  reelinghouse: {
    name: 'Reeling House', tier: 'craft', era: 8, w: 2, h: 2, cost: 830, upkeep: 0.88,
    icon: '\u{1F9F5}', color: '#e2d8c0', workers: 4, nearWater: 1, industry: true,
    procIn: 'cocoon', procOut: 'silk', procRate: 3.49, procRatio: 0.5,

    desc: 'Cocoons in near-boiling basins, the filament caught and wound several strands at a time: ' +
      '3.49 cocoons into 1.74 raw silk. The basins ARE the process, so it wants the water (+50%).',
  },
  patternloom: {
    name: 'Patterned-Silk Loom Shed', tier: 'craft', era: 8, w: 2, h: 3, cost: 1000, upkeep: 0.94,
    icon: '\u{1F9F6}', color: '#b58fc9', workers: 5, needsWater: true, industry: true,
    procIn: 'silk', procOut: 'brocade', procRate: 1.74, procRatio: 0.6667,

    desc: 'Warp-patterned weaving on a shedding frame: 1.74 silk into 1.16 bolts. It loses a third to ' +
      'waste, because that is what reeling and weaving cost. Fragments of exactly this cloth survive ' +
      'stuck to the corrosion on Shang bronzes.',
  },

  piecemould: {
    name: 'Piece-Mould Foundry', tier: 'craft', era: 8, w: 3, h: 3, cost: 830, upkeep: 1.03,
    icon: '\u{1F3FA}', color: '#7f8a5c', workers: 5, needsWater: true, industry: true,
    procIn: 'copperore', procOut: 'ritualbronze', procRate: 3.49, procRatio: 0.5,

    desc: 'Fired clay section-moulds assembled around a core — the Chinese method, and the reason Shang ' +
      'bronzes carry decoration no lost-wax casting could produce. 3.49 ore a minute into 1.74 vessels. ' +
      'Two adits keep one foundry busy.',
  },
  boilingshed: {
    name: 'Salt Boiling Shed', tier: 'craft', era: 8, w: 2, h: 2, cost: 610, upkeep: 0.65,
    icon: '\u{1F525}', color: '#d8c9a8', workers: 2, industry: true,
    procIn: 'brine', procOut: 'salt', procRate: 3.49, procRatio: 0.5,

    desc: 'Brine boiled down over long fires in rows of pottery moulds — there is no iron yet, so the ' +
      'pans are clay. 3.49 brine into 1.74 salt. Two pans feed one shed, and at Shouguang the broken ' +
      'moulds are counted in the thousands.',
  },
  rammedyard: {
    name: 'Rammed-Earth Yard', tier: 'craft', era: 8, w: 2, h: 2, cost: 830, upkeep: 0.88,
    icon: '\u{1F9F1}', color: '#c2ac8a', workers: 5, needsRoad: true, industry: true,
    procIn: 'stone', procOut: 'blocks', procRate: 8.0, procRatio: 0.5,

    desc: 'Boards, rammers and a gang: 8.0 stone a minute beaten into 4.0 courses of finished walling. ' +
      'Two quarries keep one yard busy. This is the chain the Wall eats, and it is the only reason this ' +
      'age wants stone at all.',
  },
  bonecarver: {
    name: "Bone Carver's Yard", tier: 'craft', era: 8, w: 2, h: 2, cost: 500, upkeep: 0.59,
    icon: '\u{1FAA1}', color: '#cfc4ae', workers: 3, needsWater: true, industry: true,
    procIn: 'bone', procOut: 'carvings', procRate: 3.49, procRatio: 0.5,

    desc: 'Hairpins, awls, arrowheads and inlaid handles, sawn and polished: 3.49 bone a minute into ' +
      '1.74 finished pieces. Two middens feed one yard.',
  },

  mealcounter: {
    name: 'The Meal Counter', tier: 'commerce', era: 8, w: 2, h: 3, cost: 690, upkeep: 0.88,
    icon: '\u{1F3EA}', color: '#c97f7f', workers: 2, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 1.46, sellPrice: 6.30, custRadius: 8, custMin: 8,

    desc: 'Sells 1.46 meal a minute at $6.30 — rice or millet, the counter does not care, which is ' +
      'exactly why it is one counter. Needs 8 residents at any distance; hauls over 20 tiles cost carting.',
  },
  silkhall: {
    name: 'Silk Gift Hall', tier: 'commerce', era: 8, w: 2, h: 3, cost: 890, upkeep: 1.03,
    icon: '\u{1F380}', color: '#b98b6a', workers: 2, needsRoad: true, needsWater: true,
    sells: 'brocade', sellRate: 0.70, sellPrice: 31.70, custRadius: 9, custMin: 12,

    desc: 'Bolts weighed, wrapped and given — there is no Silk Road in 1600 BCE, so this is less a shop ' +
      'than a treasury of gifts. 0.70 bolts a minute at $31.70, the richest thing the age makes.',
  },
  bronzemarket: {
    name: 'Ancestral Bronze Market', tier: 'commerce', era: 8, w: 2, h: 2, cost: 660, upkeep: 0.88,
    icon: '\u{1F3FA}', color: '#7f8a5c', workers: 2, needsRoad: true, needsWater: true,
    sells: 'ritualbronze', sellRate: 0.87, sellPrice: 19.45, custRadius: 9, custMin: 9,

    desc: 'Ding, gui, jue and gu, sold by weight and by lineage: 0.87 vessels a minute at $19.45. The ' +
      'most recognisable thing this state made, and the second-richest thing it sells.',
  },

  weighingfloor: {
    name: 'The Weighing Floor', tier: 'commerce', era: 8, w: 2, h: 2, cost: 610, upkeep: 0.83,
    icon: '\u{1F9C2}', color: '#d8d4c4', workers: 2, needsRoad: true, needsWater: true,
    sells: 'salt', sellRate: 1.22, sellPrice: 7.30, custRadius: 8, custMin: 8,

    desc: 'Salt weighed into the court’s account and carried inland: 1.22 a minute at $7.30. It ' +
      'pays least of anything here, and it is the only chain in the age whose ground cannot be ' +
      'manufactured.',
  },
  alehall: {
    name: 'Ancestral Ale Hall', tier: 'commerce', era: 8, w: 2, h: 2, cost: 610, upkeep: 0.83,
    icon: '\u{1F376}', color: '#c9a05f', workers: 2, needsRoad: true, needsWater: true,
    sells: 'beer', sellRate: 1.22, sellPrice: 11.50, custRadius: 8, custMin: 8,

    desc: 'Ale poured for the ancestors and then for the living: 1.22 a minute at $11.50. It drinks the ' +
      'grain your Pestle Yard wanted, so every hall is a decision about dinner.',
  },
  wallworks: {
    name: 'Wall Works Yard', tier: 'commerce', era: 8, w: 2, h: 2, cost: 660, upkeep: 0.88,
    icon: '\u{1F3D7}\u{FE0F}', color: '#c2ac8a', workers: 2, needsRoad: true, needsWater: true,
    sells: 'blocks', sellRate: 1.22, sellPrice: 12.10, custRadius: 8, custMin: 9,

    desc: 'Finished walling sold to whoever is building: 1.22 courses a minute at $12.10. It pays less ' +
      'than silk and does not care — the real return on this chain is the Wall and the stone gate, and ' +
      'this counter is what keeps the quarry paying its own upkeep in between.',
  },
  bonestall: {
    name: 'Bone & Horn Stall', tier: 'commerce', era: 8, w: 2, h: 2, cost: 610, upkeep: 0.83,
    icon: '\u{1F9B4}', color: '#cfc4ae', workers: 2, needsRoad: true, needsWater: true,
    sells: 'carvings', sellRate: 0.70, sellPrice: 22.00, custRadius: 7, custMin: 6,

    desc: 'Pins, combs, inlaid hafts and turquoise-set handles: 0.70 a minute at $22.00. Three ' +
      'buildings on ground nobody is fighting you for, and the pens at the head of it plough your ' +
      'millet as well.',
  },

  clanground: {
    name: 'Clan Ground', tier: 'civic', era: 8, w: 1, h: 1, cost: 220, upkeep: 0.15,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c9a86a', capRadius: 20, amenityRadius: 20,

    desc: 'The swept ground at the compound gate, where the drum is. +1 housing capacity and a ' +
      'contentment lift for every home within 20 tiles. One is enough; a second adds nothing to a home ' +
      'already covered.',
  },
  cauldroncourt: {
    name: 'Cauldron Court', tier: 'civic', era: 8, w: 2, h: 2, cost: 1110, upkeep: 0.74,
    icon: '\u{1F372}', color: '#b5713f', workers: 2, needsRoad: true, needsWater: true,
    ovenRadius: 10,

    desc: 'One bank of bronze cauldrons instead of a hundred cold hearths, kept for the lineage feast ' +
      'and used by everyone in between. Homes within 10 tiles eat 15% less.',
  },
  cowrietreasury: {
    name: 'Cowrie Treasury', tier: 'civic', era: 8, w: 2, h: 3, cost: 1380, upkeep: 1.33,
    icon: '\u{1FA99}', color: '#c9b48f', workers: 5, needsRoad: true, needsWater: true,
    weighRadius: 10,

    desc: 'Strings of cowrie shells, ten to a peng, and bronze ingots weighed against a standard. Shops ' +
      'within 10 tiles sell at +12%. Stacks with the Diviner’s Court’s +10% throughput — ' +
      'throughput wide, price tight.',
  },
  divinercourt: {
    name: "Diviner's Court", tier: 'civic', era: 8, w: 2, h: 2, cost: 970, upkeep: 0.88,
    icon: '\u{1F4DC}', color: '#cbb98a', workers: 4, needsRoad: true, needsWater: true,
    keepsTally: true, scribeRadius: 20, rankDiscount: 0.15,

    desc: 'Scapulae and turtle plastrons, scored, heated, cracked and then written on — the earliest ' +
      'Chinese writing, and the state’s only archive. Keeps the books for every shop within 20 ' +
      'tiles (+10% throughput) AND makes every rank upgrade in the city cost 15% less. Ranking a ' +
      'cascade is expensive, so read the bund’s own note before you buy it.',
  },

  courtyardcompound: {
    name: 'Courtyard Compound', tier: 'housing', era: 8, w: 2, h: 2, cost: 330, upkeep: 0.15,
    icon: '\u{1F3E0}', color: '#c9a878', cap: 6, needsWater: true, needsRoad: true,

    desc: 'Ranges around a swept court on a rammed-earth platform. Homes 3 residents when it goes up, ' +
      'rising to 21 as it earns its rungs. +1 capacity near a Clan Ground, −1 next to industry.',
  },

  clancompound: {
    name: 'Clan Compound', tier: 'housing', era: 8, w: 3, h: 3, cost: 830, upkeep: 0.29,
    icon: '\u{1F3E1}', color: '#b58f6a', cap: 9, needsWater: true, needsRoad: true,
    levels: ['Clan Compound', 'Walled Clan Compound', 'Twin-Court Compound',
             'Lineage Compound', 'Great Lineage Seat', 'Royal Clan Terrace'],

    desc: 'The courtyard plan repeated behind one wall, with its own storerooms and its own gate. Homes ' +
      '5 residents when it goes up, rising to 31. This is what a lineage looks like when it stops being ' +
      'a household — two and a half times the price of a compound for one and a half times the room.',
  },
  altarterrace: {
    name: 'Rammed-Earth Altar Terrace', tier: 'beauty', era: 8, w: 1, h: 2, cost: 70, upkeep: 0,
    icon: '\u{26E9}\u{FE0F}', color: '#c9b48f', cosmetic: true,

    desc: 'A tamped earth platform with a stair up one side and nothing on top of it but the sky. No ' +
      'output and no upkeep — it is here because a city that only makes things is not a city.',
  },

  kingsweir: {
    name: "King's Weir", tier: 'infra', era: 8, w: 1, h: 2, cost: 430, upkeep: 0.46,
    icon: '\u{1F6AA}', color: '#5f8fc9', nearWater: 1,
    cascadeSource: 8.70, waterRadius: 7,
    desc: 'The bank cut back and revetted, with a sill and a proper sluice: 8.70 head a minute — FOUR ' +
      'fields at the gate instead of three, on the ditches you already dug. Waters 7 tiles while it is there.',
  },
  deepcut: {
    name: 'Twin Cut', tier: 'infra', era: 8, w: 1, h: 2, cost: 830, upkeep: 0.66,
    icon: '\u{26CF}\u{FE0F}', color: '#5f8aa8', workers: 2, nearWater: 1,
    cascadeCut: 1, cascadeThrough: 8.70,

    desc: 'Two channels driven through the same swell and revetted: 8.70 head across ONE step of rise, ' +
      'up from 6.0. It carries more, not higher — nothing here lifts water.',
  },
  tiledcistern: {
    name: 'Lined Cistern', tier: 'infra', era: 8, w: 1, h: 1, cost: 550, upkeep: 0.47,
    icon: '\u{1F4A7}', color: '#6fa8c9', waterRadius: 16,

    desc: 'A sunken, clay-lined tank fed off a ditch: 16 tiles of coverage. The widest water reach in ' +
      'the age so far — and it still does nothing at all for a bunded field.',
  },
  battercistern: {
    name: 'Battered Well-House', tier: 'infra', era: 8, w: 1, h: 1, cost: 1380, upkeep: 0.75,
    icon: '\u{1F4A7}', color: '#5f9ec2', waterRadius: 23,
    desc: 'Roofed, battered and kept clean by the ward: 23 tiles. Past this the age has no more water ' +
      'to give you — the rest is head.',
  },
  sealedpit: {
    name: 'Sealed Pit Store', tier: 'infra', era: 8, w: 1, h: 1, cost: 550, upkeep: 0.19,
    icon: '\u{1F573}\u{FE0F}', color: '#b08a5a', storeGrain: 88, storeFlour: 54,
    desc: 'Lined, capped and sealed with clay against damp and rats: +88 grain, +54 meal, still no workers.',
  },
  platformgranary: {
    name: 'Platform Granary Range', tier: 'infra', era: 8, w: 3, h: 3, cost: 3500, upkeep: 0.93,
    icon: '\u{1F33E}', color: '#c9a878', workers: 5, needsRoad: true,
    storeGrain: 477, storeFlour: 297, threshing: true, depot: true,
    desc: 'A second range raised on the same platform: +477 grain and +297 meal, still +25% to every ' +
      'Millet Field it touches, still a supply point.',
  },
  sealedvault: {
    name: 'Sealed Tribute Vault', tier: 'infra', era: 8, w: 2, h: 2, cost: 1380, upkeep: 0.94,
    icon: '\u{1F4E6}', color: '#b59a72', workers: 3, needsWater: true, needsRoad: true,
    depot: true, storeCraft: 51,
    desc: 'Sealed, stamped and inventoried: +51 for every craft good. Bank a whole season of silk ' +
      'against a slow hall.',
  },

  terracedbund: {
    name: 'Levelled Bund Terrace', tier: 'food', era: 8, w: 2, h: 3, cost: 860, upkeep: 1.03,
    icon: '\u{1F33E}', color: '#7fae62', workers: 3,
    out: { rice: 7.30 }, needsHead: true, cascadeDraw: 2.0,
    desc: 'The plot re-cut, re-levelled and double-bunded: 7.30 rice a minute — twice the yield on THE ' +
      'SAME 2.0 HEAD. This is how you grow a cascade without finding another fall.',
  },
  oxploughfield: {
    name: 'Ox-Plough Millet Strips', tier: 'food', era: 8, w: 2, h: 2, cost: 670, upkeep: 0.77,
    icon: '\u{1F33E}', color: '#c9b872', workers: 3, needsWater: true, plowed: true,
    out: { grain: 4.86 },
    desc: 'Paired oxen on a long strip instead of a hoe on a patch: 4.86 grain a minute, and it still ' +
      'owes the cascade nothing at all.',
  },
  pollardgrove: {
    name: 'Pollarded Mulberry Rows', tier: 'food', era: 8, w: 3, h: 3, cost: 1660, upkeep: 1.30,
    icon: '\u{1F343}', color: '#6faf62', workers: 5, dryLand: true,
    out: { mulberry: 13.96 },
    desc: 'Cut back hard every year and set in rows a cart can pass: 13.96 leaf a minute, enough for two sheds.',
  },
  lodegallery: {
    name: 'The Lode Gallery', tier: 'food', era: 8, w: 2, h: 3, cost: 1060, upkeep: 0.77,
    icon: '\u{26CF}\u{FE0F}', color: '#a8794a', workers: 3, onRock: true, industry: true,
    out: { copperore: 5.58 },
    desc: 'Timbered, laddered and driven far enough in to need lamps: 5.58 ore a minute.',
  },
  brinepanrow: {
    name: 'Terraced Brine Pans', tier: 'food', era: 8, w: 2, h: 2, cost: 790, upkeep: 0.61,
    icon: '\u{1F9C2}', color: '#dcd8c8', workers: 3, onSalt: true,
    out: { brine: 3.48 },
    desc: 'Pans cut in steps so the brine concentrates as it falls: 3.48 a minute, and one row now ' +
      'feeds two sheds.',
  },

  rubbleface: {
    name: 'Benched Rubble Face', tier: 'food', era: 8, w: 3, h: 3, cost: 2980, upkeep: 1.80,
    icon: '\u{1FAA8}', color: '#b0a894', workers: 6, onRock: true, industry: true, quarried: true,
    out: { stone: 8.0 },
    desc: 'Worked in benches with a ramp down to the carts: 8.0 stone a minute — and it eats the seam ' +
      'twice as fast, which is the honest cost of a finite thing.',
  },
  walledorchard: {
    name: 'Walled Fruit Garden', tier: 'food', era: 8, w: 2, h: 2, cost: 740, upkeep: 0.46,
    icon: '\u{1F338}', color: '#c98f8f', workers: 3,
    out: { dates: 3.24 }, saltProof: true,
    desc: 'Walled, underplanted and watered by hand: 3.24 fruit a minute, and it STILL needs no water ' +
      'coverage, no head and no road. It is what feeds you while you find the break.',
  },
  fishgarth: {
    name: 'The Fish Garth', tier: 'food', era: 8, w: 1, h: 3, cost: 1060, upkeep: 0.77,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 3, onWater: true,
    out: { fish: 5.84 },
    desc: 'A permanent stake-and-wattle enclosure with holding pens: 5.84 fish a minute, and the river ' +
      'does not care which way your ditches run.',
  },
  royalherd: {
    name: 'Royal Herd Enclosure', tier: 'food', era: 8, w: 2, h: 4, cost: 2780, upkeep: 1.41,
    icon: '\u{1F402}', color: '#9c7f5c', workers: 3, dryLand: true, needsWater: true,
    oxTeam: true, oxRadius: 20, oxBonus: 0.29,

    desc: 'The herd the divinations are made from and the plough teams are drawn from. It ploughs every ' +
      'Millet Field within 20 tiles to +29%, up from 14 and +20%.',
  },
  hornpits: {
    name: 'The Horn Pits', tier: 'food', era: 8, w: 2, h: 2, cost: 860, upkeep: 0.77,
    icon: '\u{1F9B4}', color: '#cfc4ae', workers: 3, dryLand: true,
    out: { bone: 3.48 },
    desc: 'Sorted, stacked and worked in pits under the yard: 3.48 a minute, and the scapulae come out ' +
      'graded for the diviners.',
  },
  compostwalks: {
    name: 'The Compost Walks', tier: 'food', era: 8, w: 1, h: 1, cost: 630, upkeep: 0.38,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a7a5c', soilRadius: 9,
    desc: 'The whole ward’s sweepings carted, composted and turned out on the strips: land within 9 ' +
      'tiles recovers from the salt 3x faster.',
  },

  hammerrow: {
    name: 'Trip-Hammer Row', tier: 'food', era: 8, w: 2, h: 3, cost: 1170, upkeep: 1.01,
    icon: '\u{1F35A}', color: '#b09a7e', workers: 3, nearWater: 1, industry: true,
    procIn: 'rice', procOut: 'flour', procRate: 10.22, procRatio: 0.62,
    desc: 'Four hammers off one shaft: 10.22 rice a minute hulled into 6.34 meal, and still only three hands.',
  },
  mortargang: {
    name: 'Mortar Gang Yard', tier: 'food', era: 8, w: 2, h: 2, cost: 1170, upkeep: 1.01,
    icon: '\u{2699}\u{FE0F}', color: '#c9b48a', workers: 5, needsWater: true,
    grainMill: true, industry: true,
    procIn: 'grain', procOut: 'flour', procRate: 10.22, procRatio: 0.60,
    desc: 'A whole gang on the mortars, working in shifts: 10.22 grain into 6.13 meal — and it still ' +
      'stands wherever a well reaches.',
  },
  mashbrewhouse: {
    name: 'The Mash Brewhouse', tier: 'craft', era: 8, w: 2, h: 2, cost: 1120, upkeep: 1.05,
    icon: '\u{1F376}', color: '#c9a24a', workers: 5, needsWater: true, industry: true,
    procIn: 'grain', procOut: 'beer', procRate: 4.89, procRatio: 0.5,
    desc: 'Brewed to a rite and to a schedule: 4.89 grain into 2.44 ale. It drinks even more of your ' +
      'dinner, which is the decision.',
  },
  tieredwormhouse: {
    name: 'Tiered Rearing House', tier: 'craft', era: 8, w: 2, h: 3, cost: 1280, upkeep: 1.13,
    icon: '\u{1F41B}', color: '#cdbb92', workers: 5, needsWater: true, industry: true,
    procIn: 'mulberry', procOut: 'cocoon', procRate: 9.77, procRatio: 0.5,
    desc: 'Eight tiers of trays and a charcoal brazier to hold the room: 9.77 leaf into 4.89 cocoons.',
  },
  filamenthall: {
    name: 'The Filament Hall', tier: 'craft', era: 8, w: 2, h: 2, cost: 1410, upkeep: 1.20,
    icon: '\u{1F9F5}', color: '#e2d8c0', workers: 5, nearWater: 1, industry: true,
    procIn: 'cocoon', procOut: 'silk', procRate: 4.89, procRatio: 0.5,
    desc: 'Basins kept at a steady heat and reeled six strands at a time: 4.89 cocoons into 2.44 raw silk.',
  },
  damaskloom: {
    name: 'Damask Frame Shed', tier: 'craft', era: 8, w: 2, h: 3, cost: 1700, upkeep: 1.28,
    icon: '\u{1F9F6}', color: '#b58fc9', workers: 6, needsWater: true, industry: true,
    procIn: 'silk', procOut: 'brocade', procRate: 2.44, procRatio: 0.6667,
    desc: 'A shedding frame with a second harness and a drawboy: 2.44 silk into 1.63 bolts of figured cloth.',
  },
  sectionalfoundry: {
    name: 'Sectional Casting Hall', tier: 'craft', era: 8, w: 3, h: 3, cost: 1410, upkeep: 1.40,
    icon: '\u{1F3FA}', color: '#7f8a5c', workers: 6, needsWater: true, industry: true,
    procIn: 'copperore', procOut: 'ritualbronze', procRate: 4.89, procRatio: 0.5,
    desc: 'Moulds built in numbered sections and poured from three crucibles at once — this is how an ' +
      '800-kilogram ding gets made. 4.89 ore a minute into 2.44 vessels.',
  },
  moundhearths: {
    name: 'Banked Boiling Hearths', tier: 'craft', era: 8, w: 2, h: 2, cost: 1040, upkeep: 0.88,
    icon: '\u{1F525}', color: '#d8c9a8', workers: 3, industry: true,
    procIn: 'brine', procOut: 'salt', procRate: 4.89, procRatio: 0.5,
    desc: 'Hearths banked in a long mound so one fire serves six moulds: 4.89 brine into 2.44 salt.',
  },
  courseyard: {
    name: 'Coursed Tamping Yard', tier: 'craft', era: 8, w: 2, h: 2, cost: 1410, upkeep: 1.20,
    icon: '\u{1F9F1}', color: '#c2ac8a', workers: 6, needsRoad: true, industry: true,
    procIn: 'stone', procOut: 'blocks', procRate: 11.20, procRatio: 0.5,
    desc: 'Shuttering re-used down a whole run and a gang that never stops: 11.20 stone a minute into ' +
      '5.60 courses. The Wall wants 3,352 stone of its own; this is how you get there before the age turns.',
  },
  inlayworkshop: {
    name: 'Turquoise-Inlay Workshop', tier: 'craft', era: 8, w: 2, h: 2, cost: 850, upkeep: 0.80,
    icon: '\u{1FAA1}', color: '#cfc4ae', workers: 4, needsWater: true, industry: true,
    procIn: 'bone', procOut: 'carvings', procRate: 4.89, procRatio: 0.5,
    desc: 'Bone and ivory cut, polished and set with turquoise: 4.89 a minute into 2.44 finished ' +
      'pieces. The cups out of Fu Hao’s tomb are made exactly here.',
  },

  granarycourt: {
    name: 'The Granary Court', tier: 'commerce', era: 8, w: 2, h: 3, cost: 1380, upkeep: 1.23,
    icon: '\u{1F3EA}', color: '#c97f7f', workers: 3, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 2.92, sellPrice: 6.30, custRadius: 8, custMin: 8,
    desc: 'A walled square with its own gate and its own weights: 2.92 meal a minute, double the counter.',
  },
  bolttreasury: {
    name: 'The Bolt Treasury', tier: 'commerce', era: 8, w: 2, h: 3, cost: 1780, upkeep: 1.44,
    icon: '\u{1F380}', color: '#b98b6a', workers: 3, needsRoad: true, needsWater: true,
    sells: 'brocade', sellRate: 1.40, sellPrice: 31.70, custRadius: 9, custMin: 12,
    desc: 'Bolts counted into the court’s own inventory: 1.40 a minute at $31.70 — $44 a minute, the ' +
      'richest single building in the age.',
  },
  vesselhall: {
    name: 'Ritual Vessel Hall', tier: 'commerce', era: 8, w: 2, h: 2, cost: 1320, upkeep: 1.23,
    icon: '\u{1F3FA}', color: '#7f8a5c', workers: 3, needsRoad: true, needsWater: true,
    sells: 'ritualbronze', sellRate: 1.74, sellPrice: 19.45, custRadius: 9, custMin: 9,
    desc: 'A roofed hall with standing stock and an inscribed inventory: 1.74 vessels a minute.',
  },
  saltcommission: {
    name: 'The Salt Commission', tier: 'commerce', era: 8, w: 2, h: 2, cost: 1220, upkeep: 1.16,
    icon: '\u{1F9C2}', color: '#d8d4c4', workers: 3, needsRoad: true, needsWater: true,
    sells: 'salt', sellRate: 2.44, sellPrice: 7.30, custRadius: 8, custMin: 8,
    desc: 'A standing account, a sealed measure and a road inland: 2.44 salt a minute out to the interior.',
  },
  libationhall: {
    name: 'Libation Hall', tier: 'commerce', era: 8, w: 2, h: 2, cost: 1220, upkeep: 1.16,
    icon: '\u{1F376}', color: '#c9a05f', workers: 3, needsRoad: true, needsWater: true,
    sells: 'beer', sellRate: 2.44, sellPrice: 11.50, custRadius: 8, custMin: 8,
    desc: 'Ale poured at the rite and sold at the gate: 2.44 a minute. It also drinks twice the grain, ' +
      'so check your meal before you buy it.',
  },
  gangcommissary: {
    name: 'The Gang Commissary', tier: 'commerce', era: 8, w: 2, h: 2, cost: 1320, upkeep: 1.23,
    icon: '\u{1F3D7}\u{FE0F}', color: '#c2ac8a', workers: 3, needsRoad: true, needsWater: true,
    sells: 'blocks', sellRate: 2.44, sellPrice: 12.10, custRadius: 8, custMin: 9,
    desc: 'The works office: it issues to the gangs, sells the surplus and keeps the tally. 2.44 ' +
      'courses a minute out the gate.',
  },
  awlcombrow: {
    name: 'Awl & Comb Row', tier: 'commerce', era: 8, w: 2, h: 2, cost: 1220, upkeep: 1.16,
    icon: '\u{1F9B4}', color: '#cfc4ae', workers: 3, needsRoad: true, needsWater: true,
    sells: 'carvings', sellRate: 1.40, sellPrice: 22.00, custRadius: 7, custMin: 6,
    desc: 'A row of benches under one roof rather than a stall: 1.40 pieces a minute at $22.00.',
  },

  drumground: {
    name: 'Drum Ground', tier: 'civic', era: 8, w: 1, h: 1, cost: 550, upkeep: 0.24,
    icon: '\u{1F941}', color: '#c9a86a', capRadius: 29, amenityRadius: 29,
    desc: 'A bronze drum on a stand and ground swept for a crowd: capacity and contentment out to 29 tiles.',
  },
  lineagetemple: {
    name: 'Lineage Temple', tier: 'civic', era: 8, w: 2, h: 2, cost: 2780, upkeep: 1.18,
    icon: '\u{1F372}', color: '#b5713f', workers: 3, needsRoad: true, needsWater: true,
    ovenRadius: 15,
    desc: 'The full temple and its kitchen, feeding the dead and the living on the same fires: homes ' +
      'within 15 tiles eat 15% less.',
  },
  standardhouse: {
    name: 'Standard-Weight House', tier: 'civic', era: 8, w: 2, h: 3, cost: 3450, upkeep: 2.13,
    icon: '\u{1FA99}', color: '#c9b48f', workers: 6, needsRoad: true, needsWater: true,
    weighRadius: 15,
    desc: 'One set of weights everybody has to use, kept under seal: +12% price for shops out to 15 tiles.',
  },
  oraclearchive: {
    name: 'Oracle Bone Archive', tier: 'civic', era: 8, w: 2, h: 2, cost: 2430, upkeep: 1.41,
    icon: '\u{1F4DC}', color: '#cbb98a', workers: 5, needsRoad: true, needsWater: true,
    keepsTally: true, scribeRadius: 29, rankDiscount: 0.22,

    desc: 'The used bones filed in pits under the floor, in order, by year — which is why we can read ' +
      'them at all. +10% throughput out to 29 tiles, and every rank in the city costs 22% less.',
  },

  lopondfield: {
    name: 'Loʻi Pondfield', tier: 'food', era: 9, w: 2, h: 2, cost: 360, upkeep: 0.58,
    icon: '\u{1F33F}', color: '#7fa86a', workers: 2, needsWater: true,
    out: { grain: 3.0 },
    desc: 'A walled terrace with fresh water led through it: 3.0 taro/min. THE SEA IS NOT WATER — it ' +
      'wants a Punawai like everything else. +25% beside a Pounding Shed. There are no oxen in this ' +
      'ocean: rank it, or dig another.',
  },

  poipound: {
    name: 'Poi Pounding Shed', tier: 'food', era: 9, w: 2, h: 2, cost: 890, upkeep: 0.97,

    grainMill: true,
    icon: '\u{1F35A}', color: '#c9b489', workers: 4, needsWater: true, industry: true,
    procIn: 'grain', procRate: 9.0, procOut: 'flour', procRatio: 0.6,
    desc: 'Stone pounders on a wet board: 9.0 taro/min into 5.4 poi — 11.3 into 6.8 when it touches a ' +
      'Pondfield, because the +25% raises both sides. One shed wants three terraces. Industry: a poor ' +
      'neighbour for homes.',
  },

  haleaha: {
    name: 'Hale ʻAha (Feast House)', tier: 'commerce', era: 9, w: 2, h: 2, cost: 890, upkeep: 1.16,
    icon: '\u{1F372}', color: '#c98f6a', workers: 2, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 1.8, sellPrice: 6.61, custRadius: 6, custMin: 9,
    desc: 'Sells 1.8 poi/min at $6.61 to any 9 residents, at any distance. The only thing in the food ' +
      'chain that turns poi into money — and on an archipelago every haul is long, so a district far ' +
      'from a supply point pays carting on top.',
  },

  coconutgrove: {
    name: 'Coconut Grove', tier: 'food', era: 9, w: 2, h: 2, cost: 460, upkeep: 0.58,
    icon: '\u{1F334}', color: '#9cb066', workers: 2, dryLand: true,
    out: { coir: 2.0 },
    desc: '2.0 husk fibre/min off the strand. +50% on DRY ground — plain sand or leeward scrub, never ' +
      'the irrigated valley, which the taro wants. Every hull on this map is lashed together with what ' +
      'comes out of here.',
  },

  sennithouse: {
    name: 'Sennit Braiding House', tier: 'craft', era: 9, w: 2, h: 2, cost: 1070, upkeep: 1.16,
    icon: '\u{1FAA2}', color: '#b59a6b', workers: 4, needsWater: true, industry: true,
    procIn: 'coir', procRate: 3.2, procOut: 'sennit', procRatio: 0.5,
    desc: 'Husk retted in the shallows and rolled on the thigh into cable: 3.2 husk/min into 1.6 sennit. ' +
      'Two groves keep it fed with a little to spare. Nothing in this city is nailed; it is all tied.',
  },

  cordagestall: {
    name: 'Cordage Stall', tier: 'commerce', era: 9, w: 2, h: 2, cost: 860, upkeep: 1.16,
    icon: '\u{1F9F5}', color: '#c2a878', workers: 2, needsWater: true, needsRoad: true,
    sells: 'sennit', sellRate: 1.0, sellPrice: 22.17, custRadius: 7, custMin: 10,
    desc: 'Coils graded by lay and thickness: 1.0/min at $22.17. The most reliable money in the age, ' +
      'because the ground it comes off is ground nothing else wants.',
  },

  waukegarden: {
    name: 'Wauke Garden', tier: 'food', era: 9, w: 2, h: 2, cost: 390, upkeep: 0.46,
    icon: '\u{1F343}', color: '#8fb07a', workers: 2, needsWater: true, slowSalt: true,
    out: { bast: 1.2 },
    desc: 'Paper mulberry grown for its inner bark: 1.2 bast/min, souring the ground at HALF the taro ' +
      'rate. It grows exactly where the taro grows, on the same scarce windward loam. Every terrace now ' +
      'asks the same question: dinner, or cloth?',
  },

  tapahouse: {
    name: 'Tapa Beating House', tier: 'craft', era: 9, w: 2, h: 2, cost: 930, upkeep: 1.08,
    icon: '\u{1FAB5}', color: '#c9b8a0', workers: 4, needsWater: true, industry: true,
    procIn: 'bast', procRate: 3.6, procOut: 'tapa', procRatio: 0.5,
    desc: 'Soaked bast beaten thin on an anvil log and felted into sheet: 3.6 bast/min into 1.8 ' +
      'barkcloth. One house wants three gardens. You can hear a village by its beaters.',
  },

  tapahall: {
    name: 'Tapa Hall', tier: 'commerce', era: 9, w: 2, h: 2, cost: 1140, upkeep: 1.35,
    icon: '\u{1F9F6}', color: '#b8a894', workers: 2, needsWater: true, needsRoad: true,
    sells: 'tapa', sellRate: 0.8, sellPrice: 36.15, custRadius: 7, custMin: 14,
    desc: 'Sells 0.8 bolts/min at $36.15 — paid for out of terraces that would otherwise have been ' +
      'dinner. The fussiest ground in the age and therefore the second-best price.',
  },

  pearlbeds: {
    name: 'Pearl-Shell Beds', tier: 'food', era: 9, w: 2, h: 2, cost: 390, upkeep: 0.58,
    icon: '\u{1F41A}', color: '#c9c2b0', workers: 2, onWater: true,
    out: { nacre: 3.2 },
    desc: 'Divers working a marked reef: 3.2 pearl shell/min. Worth almost nothing raw and a great deal ' +
      'worked. Stands IN the lagoon — every tile of it on water — and wants the same quiet water your ' +
      'fishpond does.',
  },

  lurework: {
    name: 'Pearl-Shell Lure Works', tier: 'commerce', era: 9, w: 2, h: 2, cost: 680, upkeep: 0.77,
    icon: '\u{1FA9D}', color: '#c9b8c2', workers: 4, needsWater: true, needsRoad: true, industry: true,
    procIn: 'nacre', procRate: 4.0, procOut: 'lure', procRatio: 0.5,
    sells: 'lure', sellRate: 1.1, sellPrice: 17.16, custRadius: 6, custMin: 9,
    desc: 'Shell cut, ground and lashed into trolling lures that take a fish with no bait at all. Sells ' +
      'on the spot at $17.16 — a deliberately SHORT chain: two buildings and six mouths where barkcloth ' +
      'needs three and eight. Chain length is a strategy.',
  },

  adzequarry: {
    name: 'Basalt Adze Quarry', tier: 'food', era: 9, w: 3, h: 3, cost: 1600, upkeep: 1.35,
    icon: '\u{26CF}\u{FE0F}', color: '#6a655e', workers: 5, onRock: true, industry: true,
    quarried: true, out: { stone: 5.0 },
    desc: '5.0 basalt/min off a fine-grained flow, scaled by how much rock is actually under it (+50% ' +
      'on a properly rocky pad). Every tile it works is gone for good and comes back as grass — there ' +
      'is no midden for basalt. It needs no water: quarrying is dry work.',
  },

  adzeshed: {
    name: 'Adze Grinding Shed', tier: 'commerce', era: 9, w: 2, h: 2, cost: 1000, upkeep: 1.08,
    icon: '\u{1FA93}', color: '#8a8279', workers: 4, needsWater: true, needsRoad: true, industry: true,
    procIn: 'stone', procRate: 4.0, procOut: 'adze', procRatio: 0.5,
    sells: 'adze', sellRate: 0.8, sellPrice: 25.06, custRadius: 6, custMin: 10,
    desc: 'Blanks flaked, then ground for days against wet sandstone: 4.0 basalt/min into 2.0 adzes, ' +
      'sold at $25.06 — and the whole ocean bought them, which is how we know the canoes came back. ' +
      'Every blade sold is basalt your era gate does not get.',
  },

  birdcatcher: {
    name: "Birdcatcher's Camp", tier: 'food', era: 9, w: 2, h: 2, cost: 430, upkeep: 0.46,
    icon: '\u{1FAB6}', color: '#a8452f', workers: 2, onRock: true,
    out: { feathers: 0.6 },
    desc: 'Gum on a branch above the tree line: 0.6 feathers/min, the scarcest yield in the age. It ' +
      'wants upland lava — the same band your quarry wants — and TWO camps feed one Featherwork House. ' +
      'Cut the hill away and the birds go with it.',
  },

  featherhouse: {
    name: 'Featherwork House', tier: 'craft', era: 9, w: 2, h: 2, cost: 1280, upkeep: 1.24,
    icon: '\u{1F9E5}', color: '#b83c2a', workers: 4, needsWater: true, needsRoad: true, industry: true,
    procIn: 'feathers', procRate: 1.2, procOut: 'cloak', procRatio: 0.6667,
    sells: 'cloak', sellRate: 0.6, sellPrice: 50.13, custRadius: 7, custMin: 14,
    desc: 'Feathers knotted into an olonā net on a curved wicker frame: 0.8 cloaks/min at $50.13 — the ' +
      'richest object in the age and the slowest chain to feed. Two camps keep one house busy and ' +
      'neither of them is quick.',
  },

  breadfruitgrove: {
    name: 'Breadfruit Grove', tier: 'food', era: 9, w: 3, h: 3, cost: 890, upkeep: 0.77,
    icon: '\u{1F332}', color: '#6f9c5a', workers: 4,
    out: { dates: 4.6 }, saltProof: true,
    desc: '4.6 breadfruit/min from a tree that wants NO water coverage, NO road and NO processing — and ' +
      'yields +50% on ground already gone brackish. It is what feeds an island the week you land on it, ' +
      'and it is the first thing to plant on one.',
  },

  reefstation: {
    name: 'Lagoon Reef Station', tier: 'food', era: 9, w: 1, h: 3, cost: 570, upkeep: 0.58,
    icon: '\u{1F41F}', color: '#5f9fb0', workers: 2, onWater: true,
    out: { fish: 3.6 },
    desc: 'A stone trap on the reef flat that empties itself on the falling tide: 3.6 fish/min, eaten at ' +
      '75% of poi\'s worth. Stands IN the lagoon, every tile of it on water, and owes the springs nothing.',
  },

  fishpond: {
    name: 'Loko Iʻa (Walled Fishpond)', tier: 'food', era: 9, w: 4, h: 4, cost: 2400, upkeep: 1.61,
    icon: '\u{1F420}', color: '#4f8fa0', workers: 5, onWater: true,
    out: { fish: 10.0 },
    desc: 'A basalt wall across a bay with a grating the fry swim in through and the grown fish cannot ' +
      'swim out of: 10.0 fish/min for five mouths. The largest food building in the age and the one that ' +
      'needs the most sheltered water — sixteen tiles of it, all lagoon.',
  },

  reefsaltpans: {
    name: 'Reef Salt Pans', tier: 'food', era: 9, w: 2, h: 2, cost: 430, upkeep: 0.46,
    icon: '\u{1F9C2}', color: '#e2ded0', workers: 2, onSalt: true,
    out: { salt: 3.0 },
    desc: 'Sea water raked down in shallow pans on the leeward flats: 3.0 salt/min, +50% on a real pan. ' +
      'The dead ground on the dry side of the island turns out to be an extraction zone.',
  },

  strandstall: {
    name: 'Strand Stall', tier: 'commerce', era: 9, w: 1, h: 2, cost: 500, upkeep: 0.58,
    icon: '\u{1F6D2}', color: '#bd9a70', workers: 1, needsWater: true, needsRoad: true,
    sellsRaw: ['nacre', 'coir', 'bast', 'salt', 'fish', 'feathers'], sellRate: 3.0,
    custRadius: 6, custMin: 7,
    desc: 'Sells whatever raw good you have most of — shell, husk, bast, salt, fish or feathers — at 80% ' +
      'of list, 3.0 units/min. Your first income the minute the first bed opens; knowing when to ' +
      'demolish it is the real decision.',
  },

  halepili: {
    name: 'Hale Pili', tier: 'housing', era: 9, w: 1, h: 1, cost: 430, upkeep: 0.19,
    icon: '\u{1F3E1}', color: '#c9a878', cap: 7, needsWater: true, needsRoad: true,
    desc: 'Pili grass thatched over a pole frame. Homes 4 when it goes up, rising to 25 as it earns its ' +
      'rungs. Needs a Punawai and a path to the marae — the ocean at the door is not water.',
  },

  halenoa: {
    name: 'Hale Noa', tier: 'housing', era: 9, w: 2, h: 2, cost: 1470, upkeep: 0.65,
    icon: '\u{1F3D8}\u{FE0F}', color: '#b8946a', cap: 24, needsWater: true, needsRoad: true,
    levels: ['Family Compound', 'Walled Compound', 'Long Compound', "Chief's Compound",
             'Ancestral Seat', 'Seat of the Line'],
    desc: 'The walled family cluster: a sleeping house, a cook house, an eating house and the ground ' +
      'between them. Homes 12 when it goes up, rising to 84. Four Hale Pili on the same four tiles hold ' +
      'more — but they want four paths to the marae, and this wants one.',
  },

  punawai: {
    name: 'Punawai (Spring Basin)', tier: 'infra', era: 9, w: 1, h: 1, cost: 210, upkeep: 0.39,
    icon: '\u{26F2}', color: '#6fb0c2', waterRadius: 5,
    desc: 'A stone-lined basin cut where the water comes out of the hill: waters everything within 5 ' +
      'tiles. No workers, no road. THE OCEAN IS NOT WATER — nothing on this map drinks the sea, and a ' +
      'building on the beach is as dry as one on the ridge.',
  },

  mulchpit: {
    name: 'Mulch Pit', tier: 'infra', era: 9, w: 1, h: 1, cost: 320, upkeep: 0.31,
    icon: '\u{1F33F}', color: '#7a6a4a', soilRadius: 5,
    desc: 'Cut banana trash, seaweed and ash turned into a pit at the head of the terraces. Ground ' +
      'within 5 tiles recovers from brackishness 3x faster. No workers, no road.',
  },

  halepaa: {
    name: 'Hale Pāʻā (Walled Store)', tier: 'infra', era: 9, w: 2, h: 2, cost: 710, upkeep: 0.77,
    icon: '\u{1F4E6}', color: '#a8916a', workers: 2, needsWater: true, needsRoad: true,
    depot: true, storeCraft: 40,
    desc: 'Racked shelves, sealed gourds and a poi pit sunk in the floor: +40 capacity for every craft ' +
      'good, and it counts as a SUPPLY POINT. On an archipelago that second half is the important one — ' +
      'a district with no supply point pays triple upkeep on every building in it.',
  },

  gourdstore: {
    name: 'Gourd Store', tier: 'infra', era: 9, w: 1, h: 1, cost: 290, upkeep: 0.15,
    icon: '\u{1FAD9}', color: '#b09a62', storeGrain: 76, storeFlour: 46,
    desc: 'Sealed calabashes on a rack under the eaves: +76 taro and +46 poi capacity, NO workers — the ' +
      'famine buffer that does not eat.',
  },

  canoelanding: {
    name: 'Canoe Landing (Kahua Waʻa)', tier: 'infra', era: 9, w: 2, h: 3, cost: 2140, upkeep: 1.35,
    icon: '\u{1F6F6}', color: '#8a7f63', workers: 3,
    depot: true, voyageRange: 26, nearWater: 1, needsRoad: false, needsWater: false,
    desc: 'Cleared coral, a hauling ramp and a stone marker on the point. IT MUST TOUCH OPEN WATER. ' +
      'Every shore within 26 tiles of sea becomes ground you are allowed to buy — that is the whole age ' +
      'in one sentence. It is also a SUPPLY POINT, so the district around it stops paying the carting ' +
      'premium. Rank it and it crosses two tiles further each time.',
  },

  wayfindingcourt: {
    name: 'Wayfinding Court', tier: 'civic', era: 9, w: 3, h: 3, cost: 1780, upkeep: 1.74,
    icon: '\u{2B50}', color: '#7a7f8c', workers: 5, needsRoad: true,
    voyageBonus: 6,
    desc: 'Upright stones set to the rising and setting points of thirty-two stars, and the people who ' +
      'can still name them. While it stands and is staffed EVERY Landing you own crosses 6 tiles ' +
      'further, and a landfall costs 1.8x instead of 2.5x. It produces nothing. It is the two islands ' +
      'you could not otherwise have reached.',
  },

  coralcauseway: {
    name: 'Coral Causeway', tier: 'infra', era: 9, w: 1, h: 1, cost: 430, upkeep: 0.19,
    icon: '\u{1F6E4}\u{FE0F}', color: '#c4bda6', onWater: true, bridge: true,
    desc: 'Coral heads levered up and tipped into the shallows until there is a path where there was a ' +
      'channel. Carries the road across water — lay a line of them shore to shore. It only ever answers ' +
      'a SHORT strait: you must own every tile you lay one on, and the open sea is not for sale.',
  },

  halau: {
    name: 'Hālau (Long-House)', tier: 'civic', era: 9, w: 2, h: 2, cost: 290, upkeep: 0.19,
    icon: '\u{1F6D6}', color: '#b09a72', capRadius: 20,
    desc: 'The open-sided long-house where the hull is built, the dances are learned and the village ' +
      'argues. +1 housing capacity for EVERY home within 20 tiles. One covers a district; a second adds ' +
      'nothing to a home already covered.',
  },

  reefshrine: {
    name: 'Reef Shrine', tier: 'civic', era: 9, w: 1, h: 1, cost: 320, upkeep: 0.31,
    icon: '\u{1FAA8}', color: '#8a9c8f', amenityRadius: 8,
    desc: 'A coral slab and an offering gourd on the point above the fishing ground. Contentment out to ' +
      '8 tiles — what a satellite hamlet has instead of a long-house.',
  },

  konohiki: {
    name: "Konohiki's House", tier: 'civic', era: 9, w: 2, h: 2, cost: 710, upkeep: 0.46,
    icon: '\u{1F4CB}', color: '#c2b08a', needsWater: true, keepsTally: true,
    desc: 'The land steward who knows every terrace in the wedge — what it owes, what it grew last year ' +
      'and who owes days on it. +10% sales throughput at every shop within 20 tiles. One covers a ' +
      'district; a second adds nothing to a shop already counted.',
  },

  adzestandard: {
    name: 'The Adze Standard', tier: 'civic', era: 9, w: 2, h: 3, cost: 1780, upkeep: 1.74,
    icon: '\u{2696}\u{FE0F}', color: '#9c968c', workers: 5, needsWater: true, needsRoad: true,
    weighRadius: 10,
    desc: 'A rack of master blanks, ground true and kept under the eaves, that every trade is checked ' +
      'against. Shops within 10 tiles sell at a better price. It stacks with the Konohiki\'s throughput ' +
      'at radius 20 — throughput wide, price tight.',
  },

  imu: {
    name: 'Imu (Earth Oven)', tier: 'food', era: 9, w: 2, h: 2, cost: 860, upkeep: 0.85,
    icon: '\u{1F525}', color: '#8a6a4a', workers: 2, needsWater: true, needsRoad: true, ovenRadius: 8,
    desc: 'One pit of hot stones under wet leaves beats twenty cook fires: homes within 8 tiles eat 15% ' +
      'less. The cheapest food in the age is the food you stop wasting.',
  },

  kii: {
    name: 'Kiʻi (Carved Image)', tier: 'beauty', era: 9, w: 1, h: 1, cost: 70, upkeep: 0,
    icon: '\u{1F5FF}', color: '#7a6a52', cosmetic: true,
    desc: 'A carved figure on a post, teeth bared, facing the sea. No output, no upkeep. A city is ' +
      'allowed to be frightening.',
  },

  boundarycairn: {
    name: 'Ahu (Boundary Cairn)', tier: 'beauty', era: 9, w: 1, h: 1, cost: 90, upkeep: 0,
    icon: '\u{1FAA8}', color: '#8f8a80', cosmetic: true,
    desc: 'A stacked cairn on the ridge line where one wedge of the island ends and the next begins. No ' +
      'output, no upkeep — but everyone on both sides knows exactly what it means.',
  },

  terraceflight: {
    name: 'Valley Terrace Flight', tier: 'food', era: 9, w: 2, h: 2, cost: 880, upkeep: 1.16,
    icon: '\u{1F33E}', color: '#6f9c5f', workers: 3, needsWater: true,
    out: { grain: 6.0 },
    desc: 'A whole staircase of terraces down one valley off a single ditch head: 6.0 taro/min. The ' +
      'water that leaves the top pond is the water that fills the next.',
  },
  coconutwalk: {
    name: 'Coconut Walk', tier: 'food', era: 9, w: 2, h: 2, cost: 1130, upkeep: 1.16,
    icon: '\u{1F334}', color: '#8fa85c', workers: 3, dryLand: true,
    out: { coir: 4.0 },
    desc: 'Planted in ranks with the ground kept clear beneath: 4.0 husk fibre/min. A grove is what ' +
      'grows; a walk is what somebody laid out.',
  },
  waukestand: {
    name: 'Wauke Stand', tier: 'food', era: 9, w: 2, h: 2, cost: 960, upkeep: 0.92,
    icon: '\u{1F343}', color: '#7fa86a', workers: 3, needsWater: true, slowSalt: true,
    out: { bast: 2.4 },
    desc: 'Coppiced on a two-year rotation and stripped young, when the bark still comes away whole: ' +
      '2.4 bast/min, and it still sours the terrace at half the taro rate.',
  },
  diversreef: {
    name: "Diver's Reef", tier: 'food', era: 9, w: 2, h: 2, cost: 960, upkeep: 1.16,
    icon: '\u{1F41A}', color: '#b8b2a0', workers: 3, onWater: true,
    out: { nacre: 6.4 },
    desc: 'The whole reef mapped, quartered and worked in rotation so no quarter is stripped: 6.4 pearl ' +
      'shell/min, and there will still be shell here next year.',
  },
  basaltface: {
    name: 'The Basalt Face', tier: 'food', era: 9, w: 3, h: 3, cost: 3920, upkeep: 2.70,
    icon: '\u{26CF}\u{FE0F}', color: '#5c5852', workers: 6, onRock: true, industry: true,
    quarried: true, out: { stone: 10.0 },
    desc: 'A working face rather than a scatter of pits: 10.0 basalt/min off a fine-grained flow. It ' +
      'eats the hill twice as fast, and the hill is where the birds are.',
  },
  fowlerstation: {
    name: "Fowler's Station", tier: 'food', era: 9, w: 2, h: 2, cost: 1050, upkeep: 0.92,
    icon: '\u{1FAB6}', color: '#94402c', workers: 3, onRock: true,
    out: { feathers: 1.2 },
    desc: 'A hut on the ridge, gum boiled on the spot, and birds released alive with three feathers ' +
      'gone: 1.2 feathers/min from the same ground.',
  },
  ulustand: {
    name: 'Ulu Stand', tier: 'food', era: 9, w: 3, h: 3, cost: 2180, upkeep: 1.54,
    icon: '\u{1F332}', color: '#5f8f4a', workers: 5,
    out: { dates: 9.2 }, saltProof: true,
    desc: 'Grafted, underplanted with banana and thinned so every tree gets sun: 9.2 breadfruit/min — ' +
      'and it STILL wants no water coverage, no road and no processing.',
  },
  tidalweir: {
    name: 'Tidal Weir', tier: 'food', era: 9, w: 1, h: 3, cost: 1400, upkeep: 1.16,
    icon: '\u{1F41F}', color: '#4f8fa8', workers: 3, onWater: true,
    out: { fish: 7.2 },
    desc: 'Wings run out along the reef so the whole falling tide is funnelled through one gate: 7.2 ' +
      'fish/min, and nobody has to swim.',
  },
  kuapawall: {
    name: 'Kuapā Wall', tier: 'food', era: 9, w: 4, h: 4, cost: 5880, upkeep: 3.22,
    icon: '\u{1F420}', color: '#3f7f90', workers: 6, onWater: true,
    out: { fish: 20.0 },
    desc: 'The pond wall carried right around the bay with sluice gates at both ends, so the tide flushes ' +
      'it twice a day and the fish never stop feeding: 20.0 fish/min. The largest thing in the age.',
  },
  rakerflats: {
    name: "Rakers' Flats", tier: 'food', era: 9, w: 2, h: 2, cost: 1050, upkeep: 0.92,
    icon: '\u{1F9C2}', color: '#d8d4c4', workers: 3, onSalt: true,
    out: { salt: 6.0 },
    desc: 'Terraced pans, each one draining into the next as it concentrates: 6.0 salt/min. The last pan ' +
      'is the one worth raking.',
  },

  olivegrove: {
    name: 'Olive Grove', tier: 'food', era: 10, w: 2, h: 2, cost: 520, upkeep: 0.61,
    icon: '\u{1FAD2}', color: '#8d9b62', workers: 2, dryLand: true,
    out: { olives: 3.46 },
    desc: 'Grows 3.46 olives/min on the thyme scree nothing else wants, and needs no water and no ' +
      'road. THREE GROVES KEEP TWO TRAPETA RUNNING. Half of what this city eats starts here — and ' +
      'so does all of what it sells.',
  },

  trapetum: {
    name: 'Trapetum', tier: 'craft', era: 10, w: 2, h: 2, cost: 1290, upkeep: 1.42,
    icon: '\u{1F6E2}\u{FE0F}', color: '#a8943f', workers: 4, needsWater: true, industry: true,
    procIn: 'olives', procRate: 4.60, procOut: 'oil', procRatio: 0.5,
    desc: 'The rotary olive mill: crushes 4.60 olives/min into 2.30 oil. One building is both the ' +
      'richest export in the age and the only thing that buys wheat. +25% both ways beside a grove.',
  },

  emporion: {
    name: 'Emporion', tier: 'commerce', era: 10, w: 2, h: 3, cost: 1840, upkeep: 1.72,
    icon: '\u{1F6A2}', color: '#b58f5a', workers: 6, nearWater: 1, needsRoad: true,
    depot: true, quay: true, storeGrain: 228,
    procIn: 'oil', procRate: 0.64, procOut: 'grain', procRatio: 19.8,
    desc: 'The grain quay. One measure of oil buys twenty of Pontic wheat — 0.64 oil/min in, ' +
      '12.67 wheat out, and 2,280 more wheat of storage besides. It is also a SUPPLY POINT. ' +
      'YOUR CITY DOES NOT GROW ITS BREAD; IT SELLS FOR IT — and bread is still only half a table.',
  },

  donkeymill: {
    name: 'Donkey Mill', tier: 'food', era: 10, w: 2, h: 2, cost: 1150, upkeep: 1.27,
    icon: '\u{1F35E}', color: '#c9a878', workers: 4, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 11.39, procOut: 'flour', procRatio: 0.6,
    desc: 'The hourglass mill, turned by a donkey on a pole: 11.39 wheat/min into 6.84 bread — ' +
      'the STAPLE LEG of about 228 people, and never more than half of anybody\u2019s table. ' +
      'Put it beside the QUAY, not beside a field: at this rung the wheat arrives by sea.',
  },

  figterrace: {
    name: 'Fig Terrace', tier: 'food', era: 10, w: 3, h: 3, cost: 1160, upkeep: 1.01,
    icon: '\u{1F33F}', color: '#7d8f55', workers: 4, dryLand: true, saltProof: true,
    out: { dates: 5.69 },
    desc: 'Figs on a dry walled terrace: 5.69/min, and +50% on ground already worked out. It wants ' +
      'no water and no road. A QUARTER OF THE TABLE IS FIGS, and no amount of bread will stand in ' +
      'for them.',
  },

  lentilplot: {
    name: 'Bean & Lentil Plot', tier: 'food', era: 10, w: 2, h: 2, cost: 460, upkeep: 0.76,
    icon: '\u{1FAD8}', color: '#7fa05a', workers: 2, dryLand: true,
    out: { forage: 3.60 },
    desc: 'Broad beans, lentils and chickpeas: 3.60 pulses/min, eaten at 80% of bread\u2019s worth. ' +
      'It needs NO water, NO road and NOTHING from the quay, and it closes a quarter of the table ' +
      'on the first tick. It sells to nobody; that is the price.',
  },

  slipway: {
    name: "Fisher's Slipway", tier: 'food', era: 10, w: 1, h: 3, cost: 740, upkeep: 0.76,
    icon: '\u{1F41F}', color: '#5f93b0', workers: 2, onWater: true,
    out: { fish: 4.50 },
    desc: 'Hulls drawn up on the shingle, nets drying on the wall: 4.50 fish/min, eaten at 75% of ' +
      'bread\u2019s worth. Every tile of it stands IN the water, so the coast decides how many you ' +
      'get — which is why the BEAN PLOT and not this is the leg that cannot fail.',
  },

  agora: {
    name: 'The Agora', tier: 'commerce', era: 10, w: 3, h: 3, cost: 1150, upkeep: 1.52,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c9a86a', workers: 3, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 2.28, sellPrice: 6.93, custRadius: 10, custMin: 10,
    desc: 'Sells 2.28 bread/min at $6.93 — what the city did not eat. Needs 10+ residents at any ' +
      'distance; hauls past 20 tiles pay carting. The bread it sells was bought, not grown.',
  },

  oilmerchant: {
    name: "Oil Merchant's Stoa", tier: 'commerce', era: 10, w: 2, h: 2, cost: 1330, upkeep: 1.52,
    icon: '\u{1FAD9}', color: '#b8a24e', workers: 3, needsWater: true, needsRoad: true,
    sells: 'oil', sellRate: 0.92, sellPrice: 28.58, custRadius: 10, custMin: 12,
    desc: 'Sells 0.92 oil/min at $28.58 — the richest trade in the age, out of the SAME oil your ' +
      'Emporion eats. The quay draws first every tick. What is sold here is what your dinner ' +
      'did not want.',
  },

  marblequarry: {
    name: 'Pentelic Quarry', tier: 'food', era: 10, w: 3, h: 3, cost: 2060, upkeep: 1.77,
    icon: '⛏\u{FE0F}', color: '#cfcbbf', workers: 5, onRock: true, industry: true,
    quarried: true,
    out: { stone: 5.75 },
    desc: 'Cuts 5.75 marble/min, scaled by how much rock is under it, and needs no water. Every ' +
      'rock tile holds 900 and there is NO recovery: a worked-out outcrop becomes grass forever, ' +
      'and it was somebody\u2019s terrace. The gate wants 4,243 — more than one quarry holds.',
  },

  marbleworks: {
    name: 'Marble Works', tier: 'craft', era: 10, w: 2, h: 2, cost: 2450, upkeep: 2.12,
    icon: '\u{1F5FF}', color: '#c4c0b4', workers: 5, industry: true,
    procIn: 'stone', procRate: 6.43, procOut: 'blocks', procRatio: 0.5,
    desc: 'Saw, sand and a levelled floor: 6.43 marble/min into 3.22 dressed blocks. Needs no ' +
      'water. The Parthenon is built out of this building.',
  },

  oikos: {
    name: 'Oikos', tier: 'housing', era: 10, w: 1, h: 1, cost: 550, upkeep: 0.25,
    icon: '\u{1F3E0}', color: '#d8c9a8', cap: 7, needsWater: true, needsRoad: true,
    desc: 'Rubble, mudbrick and tile around a small court. It holds no more than the houses of the ' +
      'age before it — this rung grows UPWARD instead, in the SYNOIKIA. Needs a cistern in range: ' +
      'nothing here drinks the sea.',
  },

  synoikia: {
    name: 'Synoikia', tier: 'housing', era: 10, w: 2, h: 2, cost: 1900, upkeep: 0.84,
    icon: '\u{1F3D8}\u{FE0F}', color: '#cdbc9a', cap: 30, needsWater: true, needsRoad: true,
    levels: ['Tenement Row', 'Synoikia', 'Upper Synoikia', 'Court Synoikia', 'Great Synoikia',
             'Insula of the Metics'],
    desc: 'A block let room by room to metics, sailors and men off the ships — Athens housed half ' +
      'its working population this way. Holds 15 when it goes up, rising to 105. THIS is where the ' +
      'age puts its people.',
  },

  krene: {
    name: 'Krene', tier: 'infra', era: 10, w: 1, h: 1, cost: 280, upkeep: 0.51,
    icon: '⛲', color: '#7fb4c9', nearWater: 2, waterRadius: 9,
    desc: 'A fountain-house over a karst spring: waters 9 tiles for under a third of a cistern. ' +
      'Fresh or salt, the engine does not care — this is the cheap water, not the clever one.',
  },

  publiccistern: {
    name: 'Public Cistern', tier: 'infra', era: 10, w: 1, h: 1, cost: 920, upkeep: 0.81,
    icon: '\u{1F4A7}', color: '#6fa8c4', waterRadius: 13,
    desc: 'A plastered rock-cut cistern fed by winter rain. Waters 13 tiles and needs no water ' +
      'anywhere near it — the answer to a limestone country.',
  },

  pithoi: {
    name: 'Pithos Store', tier: 'infra', era: 10, w: 1, h: 1, cost: 370, upkeep: 0.20,
    icon: '\u{1F3FA}', color: '#b08a5a', storeGrain: 95, storeFlour: 57,
    desc: 'Man-high jars sunk to the shoulder. +950 wheat and +570 bread, NO workers and no road — ' +
      'the buffer that carries you between ships. Buy it before you need it.',
  },

  stoa: {
    name: 'Stoa Warehouse', tier: 'infra', era: 10, w: 3, h: 2, cost: 920, upkeep: 1.01,
    icon: '\u{1F3EC}', color: '#c2b48f', workers: 3, needsRoad: true, depot: true, storeCraft: 46,
    desc: 'A colonnaded shed on the harbour front: +460 capacity for every traded good while ' +
      'staffed — olives, oil, marble and blocks — and a SUPPLY POINT for carting.',
  },

  agorasquare: {
    name: 'Agora Precinct', tier: 'civic', era: 10, w: 2, h: 2, cost: 370, upkeep: 0.25,
    icon: '\u{1F5FF}', color: '#cbbf9a', capRadius: 20,
    desc: 'Swept gravel, boundary stones, shade. +1 housing capacity for every home within 20 ' +
      'tiles. One is enough; a second adds nothing to a home already covered.',
  },

  peribolos: {
    name: 'Peribolos Wall', tier: 'infra', era: 10, w: 2, h: 1, cost: 410, upkeep: 0.41,
    icon: '\u{1F9F1}', color: '#b5ad96', soilRadius: 7,
    desc: 'Dry-laid field wall holding the hillside where it is. Ground within 7 tiles recovers 3x ' +
      'faster — the only thing standing between a terrace and the sea.',
  },

  mole: {
    name: 'Harbour Mole', tier: 'infra', era: 10, w: 1, h: 1, cost: 550, upkeep: 0.25,
    icon: '\u{1F6DF}', color: '#a8a294', onWater: true, bridge: true,
    desc: 'Rubble and squared blocks thrown out into the bay. Carries the road across the water — ' +
      'lay a line of them and the far headland joins the city.',
  },

  herm: {
    name: 'Herm', tier: 'beauty', era: 10, w: 1, h: 1, cost: 115, upkeep: 0,
    icon: '\u{1F5FF}', color: '#c4bda6', cosmetic: true,
    desc: 'A square pillar, a bearded head, a boundary stone. No output and no upkeep — it marks ' +
      'the corner of a quarter, which is the whole job.',
  },

  vineyard: {
    name: 'Terraced Vineyard', tier: 'food', era: 10, w: 2, h: 2, cost: 600, upkeep: 0.76,
    icon: '\u{1F347}', color: '#7a6f8c', workers: 2, dryLand: true,
    out: { grapes: 2.30 },
    desc: 'Vines trained low on dry stone terraces: 2.30 grapes/min, on the same scree the olives want ' +
      'and no water needed. It is NOT dinner — nothing in this age drinks its way to a full table — ' +
      'it is the second-richest thing you can put on a ship.',
  },

  lenos: {
    name: 'The Lenos', tier: 'craft', era: 10, w: 2, h: 2, cost: 1380, upkeep: 1.52,
    icon: '\u{1F377}', color: '#8c5f6f', workers: 4, needsWater: true, industry: true,
    procIn: 'grapes', procRate: 3.68, procOut: 'wine', procRatio: 0.5,
    desc: 'A plastered treading floor with a spout and a sunk jar: 3.68 grapes/min trodden into 1.84 ' +
      'wine. +25% both ways beside a vineyard. It sells nothing — the Kapeleion does that, and keeping ' +
      'them apart is what stops your wine leaving before you have decided it should.',
  },

  kapeleion: {
    name: 'The Kapeleion', tier: 'commerce', era: 10, w: 2, h: 2, cost: 1470, upkeep: 1.77,
    icon: '\u{1F3FA}', color: '#9c6a78', workers: 3, needsWater: true, needsRoad: true,
    sells: 'wine', sellRate: 0.92, sellPrice: 41.22, custRadius: 10, custMin: 14,
    desc: 'The wine shop on the corner: 0.92 wine/min at $41.22, the richest per-unit trade in the age ' +
      'until the silver comes in. Wants 14+ residents within 10 tiles — a quarter, not a hamlet.',
  },

  kolonosclay: {
    name: 'Kolonos Clay Beds', tier: 'food', era: 10, w: 2, h: 2, cost: 510, upkeep: 0.76,
    icon: '\u{1F9F1}', color: '#b8724a', workers: 2, nearWater: 2,
    out: { clay: 3.68 },
    desc: 'Iron-rich marl cut from the potters’ hill and left to weather: 3.68 clay/min, +50% within ' +
      'two tiles of water. It fires ORANGE, which is the only reason anyone has ever heard of Attic pots.',
  },

  kerameikos: {
    name: 'The Kerameikos', tier: 'craft', era: 10, w: 2, h: 2, cost: 1200, upkeep: 1.42,
    icon: '\u{1F3FA}', color: '#a8603a', workers: 4, needsWater: true, industry: true,
    procIn: 'clay', procRate: 4.61, procOut: 'pottery', procRatio: 0.5,
    desc: 'The potters’ quarter outside the gate: wheels, drying sheds and updraught kilns turning ' +
      '4.61 clay/min into 2.31 finished ware. +25% both ways beside a clay bed. Every jar of oil and ' +
      'every measure of wine you export leaves in one of these.',
  },

  kylixrow: {
    name: 'The Kylix Row', tier: 'commerce', era: 10, w: 2, h: 2, cost: 1100, upkeep: 1.52,
    icon: '\u{1F942}', color: '#c07a4a', workers: 3, needsWater: true, needsRoad: true,
    sells: 'pottery', sellRate: 1.15, sellPrice: 25.28, custRadius: 10, custMin: 10,
    desc: 'Cups, mixing bowls and oil flasks sold off the shelf: 1.15/min at $25.28. The cheapest of the ' +
      'three export shops to run and the one that never stops — everybody needs a pot.',
  },

  laurion: {
    name: 'The Laurion Galleries', tier: 'food', era: 10, w: 2, h: 2, cost: 1380, upkeep: 1.22,
    icon: '\u{1F573}\u{FE0F}', color: '#6f6a72', workers: 3, onRock: true,
    rockRadius: 20, quarried: true, industry: true,
    out: { ore: 5.47 },
    desc: 'Galleries driven into the argentiferous lead of the southern hills, worked by lamp: 5.47 ore/min ' +
      'from any outcrop within 20 tiles, nearest first. THE ROCK IS FINITE and the marble quarry is ' +
      'eating the same hill — 900 to a tile, then it is grass and it was somebody’s terrace. Four ' +
      'buildings stand between this and a single drachma.',
  },

  washingtables: {
    name: 'The Washing Tables', tier: 'craft', era: 10, w: 2, h: 3, cost: 1800, upkeep: 1.13,
    icon: '\u{1F30A}', color: '#8d9aa2', workers: 3, needsWater: true, nearWater: 2, industry: true,
    procIn: 'ore', procRate: 8.21, procOut: 'concentrate', procRatio: 0.45,
    desc: 'Sluices, settling tanks and a helicoidal channel that uses the same water twice: 8.21 ore/min ' +
      'washed down to 3.69 of clean galena. Needs a cistern in range — this district has no river, which ' +
      'is exactly why the circuit is closed.',
  },

  skimminghearths: {
    name: 'The Skimming Hearths', tier: 'craft', era: 10, w: 2, h: 2, cost: 2300, upkeep: 1.39,
    icon: '\u{1F525}', color: '#9a8a7a', workers: 4, industry: true,
    procIn: 'concentrate', procRate: 5.47, procOut: 'silver', procRatio: 0.35,
    desc: 'Bone-ash hearths and a bellows crew blowing the lead off molten galena: 5.47 concentrate/min ' +
      'down to 1.91 silver. Two thirds of it goes up the flue as litharge and always did. Needs no water ' +
      'and no road — put it on the hill beside the washery.',
  },

  silverstoa: {
    name: 'The Silver Stoa', tier: 'commerce', era: 10, w: 2, h: 2, cost: 1660, upkeep: 1.62,
    icon: '\u{1FA99}', color: '#b6bac2', workers: 3, needsWater: true, needsRoad: true,
    sells: 'silver', sellRate: 0.69, sellPrice: 57.17, custRadius: 10, custMin: 14,
    desc: 'Weighed, assayed and sold by the talent: 0.69 silver/min at $57.17, the dearest thing in the ' +
      'age. It is a SHOP and nothing more — nobody in this city is paid a wage out of it, and the ' +
      'furnace will happily out-produce it, which is what the Stoa Warehouse is for.',
  },

  bouleuterion: {
    name: 'The Bouleuterion', tier: 'civic', era: 10, w: 2, h: 2, cost: 1610, upkeep: 1.52,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c4b48f', workers: 4, needsWater: true, needsRoad: true,
    rankDiscount: 0.15,
    desc: 'Five hundred men drawn by lot, sitting in rotation. While staffed and road-connected every ' +
      'RANK upgrade in the city costs 15% less — a council that meets is a council that decides ' +
      'cheaply.',
  },

  palaestra: {
    name: 'The Palaestra', tier: 'civic', era: 10, w: 2, h: 2, cost: 410, upkeep: 0.41,
    icon: '\u{1F93C}', color: '#c9bfa0', amenityRadius: 8,
    desc: 'A sanded court, a well and a colonnade to sit under. +1 housing capacity for homes within 8 ' +
      'tiles, no workers and no road — the quarter’s own front room.',
  },

  deigma: {
    name: 'The Deigma', tier: 'civic', era: 10, w: 2, h: 3, cost: 2300, upkeep: 2.28,
    icon: '⚖\u{FE0F}', color: '#c2b070', workers: 5, needsWater: true, needsRoad: true,
    weighRadius: 10,
    desc: 'The sample table on the quay: every cargo in the harbour laid out, graded and priced in the ' +
      'open. Shops within 10 tiles sell at +12%. It is the building that makes a port a MARKET rather ' +
      'than a beach with ships on it.',
  },

  metroon: {
    name: 'The Metroon', tier: 'civic', era: 10, w: 2, h: 2, cost: 920, upkeep: 0.61,
    icon: '\u{1F4DC}', color: '#cbbf9a', needsWater: true, keepsTally: true,
    desc: 'The city’s archive in the sanctuary of the Mother: decrees, accounts and the audit of ' +
      'every official, cut in stone where anyone may read them. +10% sales at every shop in range — an ' +
      'Athenian city audits its own magistrates, and a market that is trusted moves more.',
  },

  moriai: {
    name: 'The Moriai', tier: 'food', era: 10, w: 2, h: 2, cost: 1270, upkeep: 1.22,
    icon: '\u{1FAD2}', color: '#7d8b52', workers: 3, dryLand: true,
    out: { olives: 6.92 },
    desc: 'The sacred olives of the goddess, tended under state protection and never uprooted: 6.92/min. ' +
      'Cutting one down was a capital charge, which is a strong hint about what this city ran on.',
  },
  sykeon: {
    name: 'The Sykeon', tier: 'food', era: 10, w: 3, h: 3, cost: 2840, upkeep: 2.02,
    icon: '\u{1F33F}', color: '#6f8149', workers: 5, dryLand: true, saltProof: true,
    out: { dates: 11.38 },
    desc: 'A walled fig orchard with its own drying floors: 11.38/min, still +50% on ground already worked ' +
      'out. A quarter of the table, doubled, off land no field would take.',
  },
  fallowrotation: {
    name: 'The Fallow Rotation', tier: 'food', era: 10, w: 2, h: 2, cost: 1130, upkeep: 1.52,
    icon: '\u{1FAD8}', color: '#72954d', workers: 3, dryLand: true,
    out: { forage: 7.20 },
    desc: 'Beans on the resting half, cereal on the other, turned about each year: 7.20 pulses/min. ' +
      'Still no water, no road and nothing off a quay — the leg of the table that cannot be taken away ' +
      'from you.',
  },
  neosoikoi: {
    name: 'The Neosoikoi', tier: 'food', era: 10, w: 1, h: 3, cost: 1810, upkeep: 1.52,
    icon: '\u{1F41F}', color: '#54849f', workers: 3, onWater: true,
    out: { fish: 9.00 },
    desc: 'Stone ship-sheds with their sterns in the water, the boats hauled up between tides: 9.00 ' +
      'fish/min. Still every tile in the water, and still capped at a quarter of anybody’s table.',
  },
  hymettosface: {
    name: 'The Hymettos Face', tier: 'food', era: 10, w: 3, h: 3, cost: 5050, upkeep: 3.54,
    icon: '⛏\u{FE0F}', color: '#c4c0b2', workers: 6, onRock: true, industry: true,
    quarried: true,
    out: { stone: 11.50 },
    desc: 'The whole hillside taken down in benches: 11.50 marble/min, still scaled by the rock beneath ' +
      'it and still finite. It clears the 4,243-stone gate roughly twice as fast and empties the ridge ' +
      'roughly twice as fast with it.',
  },
  trellisrows: {
    name: 'The Trellis Rows', tier: 'food', era: 10, w: 2, h: 2, cost: 1470, upkeep: 1.52,
    icon: '\u{1F347}', color: '#6d6480', workers: 3, dryLand: true,
    out: { grapes: 4.60 },
    desc: 'Vines lifted off the ground onto stakes and cross-poles: 4.60 grapes/min, twice the yield off ' +
      'the same terrace because the fruit no longer rots where it lies.',
  },
  puddlingfloors: {
    name: 'The Puddling Floors', tier: 'food', era: 10, w: 2, h: 2, cost: 1250, upkeep: 1.52,
    icon: '\u{1F9F1}', color: '#a86540', workers: 3, nearWater: 2,
    out: { clay: 7.36 },
    desc: 'Marl slaked in shallow tanks, the grit settled out and the fine slip drawn off the top: 7.36 ' +
      'clay/min, and it throws far better than what comes straight out of the bank.',
  },
  maroneiaworkings: {
    name: 'The Maroneia Workings', tier: 'food', era: 10, w: 2, h: 2, cost: 3380, upkeep: 2.44,
    icon: '\u{1F573}\u{FE0F}', color: '#5f5a63', workers: 4, onRock: true,
    rockRadius: 20, quarried: true, industry: true,
    out: { ore: 10.94 },
    desc: 'The rich seam struck in 483 BC, which Themistokles talked the assembly into spending on ' +
      'triremes instead of dividing among themselves: 10.94 ore/min. It eats the ridge twice as fast, ' +
      'and the marble is still eating it too.',
  },

  presscourt: {
    name: 'The Press Court', tier: 'craft', era: 10, w: 2, h: 2, cost: 2130, upkeep: 1.99,
    icon: '\u{1F6E2}\u{FE0F}', color: '#9e8a3a', workers: 5, needsWater: true, industry: true,
    procIn: 'olives', procRate: 6.44, procOut: 'oil', procRatio: 0.5,
    desc: 'Four beam presses under one roof and a yard to stack the frails in: 6.44 olives/min into 3.22 ' +
      'oil. Still +25% both ways beside a grove — and the quay still drinks first.',
  },
  bakersrow: {
    name: 'The Bakers’ Row', tier: 'food', era: 10, w: 2, h: 2, cost: 1900, upkeep: 1.78,
    icon: '\u{1F950}', color: '#c29d6e', workers: 5, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 15.95, procOut: 'flour', procRatio: 0.6,
    desc: 'Mill and oven in the same yard, the donkeys turning through the night: 15.95 wheat/min into ' +
      '9.57 bread. Feeds the staple leg of about 320 people, and still only half of each of them.',
  },
  treadingvats: {
    name: 'The Treading Vats', tier: 'craft', era: 10, w: 2, h: 2, cost: 2280, upkeep: 2.13,
    icon: '\u{1F377}', color: '#7f5462', workers: 5, needsWater: true, industry: true,
    procIn: 'grapes', procRate: 5.15, procOut: 'wine', procRatio: 0.5,
    desc: 'A range of sunk vats with a screw beam over the marc: 5.15 grapes/min into 2.58 wine, and the ' +
      'second pressing is where the profit was.',
  },
  redfigureworks: {
    name: 'The Red-Figure Works', tier: 'craft', era: 10, w: 2, h: 2, cost: 1980, upkeep: 1.99,
    icon: '\u{1F3FA}', color: '#9c5230', workers: 5, needsWater: true, industry: true,
    procIn: 'clay', procRate: 6.45, procOut: 'pottery', procRatio: 0.5,
    desc: 'The figures reserved in the clay and the ground painted black around them — harder, ' +
      'slower and worth far more: 6.45 clay/min into 3.23 finished ware.',
  },
  columndrums: {
    name: 'The Column Drums', tier: 'craft', era: 10, w: 2, h: 2, cost: 4040, upkeep: 2.97,
    icon: '\u{1F5FF}', color: '#bcb8ab', workers: 6, industry: true,
    procIn: 'stone', procRate: 9.00, procOut: 'blocks', procRatio: 0.5,
    desc: 'Drums turned true on a fixed pivot and their beds ground flat against each other: 9.00 ' +
      'marble/min into 4.50 dressed blocks. This is the shop the Parthenon is actually built in.',
  },
  thorikosworks: {
    name: 'The Thorikos Works', tier: 'craft', era: 10, w: 2, h: 3, cost: 2970, upkeep: 1.58,
    icon: '\u{1F30A}', color: '#7d8a94', workers: 4, needsWater: true, nearWater: 2, industry: true,
    procIn: 'ore', procRate: 11.49, procOut: 'concentrate', procRatio: 0.45,
    desc: 'The great washery above the port, its cisterns cut into the rock and its channels running in ' +
      'a closed loop: 11.49 ore/min washed to 5.17. Water was always the scarce thing here, never ore.',
  },
  lithargehearths: {
    name: 'The Litharge Hearths', tier: 'craft', era: 10, w: 2, h: 2, cost: 3800, upkeep: 1.95,
    icon: '\u{1F525}', color: '#8a7a6a', workers: 5, industry: true,
    procIn: 'concentrate', procRate: 7.66, procOut: 'silver', procRatio: 0.35,
    desc: 'A row of hearths with the litharge skimmed and re-smelted for its lead instead of thrown: ' +
      '7.66 concentrate/min down to 2.68 silver. Nothing about the loss changes; the volume does.',
  },

  sitopolion: {
    name: 'The Sitopolion', tier: 'commerce', era: 10, w: 3, h: 3, cost: 2300, upkeep: 2.28,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c2a15e', workers: 4, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 4.56, sellPrice: 6.93, custRadius: 10, custMin: 10,
    desc: 'The corn market with its own inspectors and a fixed measure: 4.56 bread/min at $6.93. Athens ' +
      'put a death penalty on hoarding here, which tells you how much of this city’s dinner came ' +
      'off a ship.',
  },
  amphorayard: {
    name: 'The Amphora Yard', tier: 'commerce', era: 10, w: 2, h: 2, cost: 2660, upkeep: 2.28,
    icon: '\u{1FAD9}', color: '#a89440', workers: 4, needsWater: true, needsRoad: true,
    sells: 'oil', sellRate: 1.84, sellPrice: 28.58, custRadius: 10, custMin: 12,
    desc: 'Jars stamped, sealed and stacked six deep against the wall: 1.84 oil/min at $28.58. The quay ' +
      'still draws before this does, every single tick.',
  },
  symposion: {
    name: 'The Symposion', tier: 'commerce', era: 10, w: 2, h: 2, cost: 2940, upkeep: 2.66,
    icon: '\u{1F3FA}', color: '#8d5c69', workers: 4, needsWater: true, needsRoad: true,
    sells: 'wine', sellRate: 1.84, sellPrice: 41.22, custRadius: 10, custMin: 14,
    desc: 'Couches, a mixing bowl and a man appointed to decide how much water goes in: 1.84 wine/min at ' +
      '$41.22. The drinking party was a market as much as a party.',
  },
  panathenaicprizes: {
    name: 'The Panathenaic Prizes', tier: 'commerce', era: 10, w: 2, h: 2, cost: 2200, upkeep: 2.28,
    icon: '\u{1F942}', color: '#b06a3c', workers: 4, needsWater: true, needsRoad: true,
    sells: 'pottery', sellRate: 2.30, sellPrice: 25.28, custRadius: 10, custMin: 10,
    desc: 'The great prize amphorae — a hundred and forty of them to the winner, each one full of ' +
      'sacred oil: 2.30/min at $25.28. The pot and what is in it were the same prize.',
  },
  argyrokopeion: {
    name: 'The Argyrokopeion', tier: 'commerce', era: 10, w: 2, h: 2, cost: 3320, upkeep: 2.43,
    icon: '\u{1FA99}', color: '#a8adb8', workers: 4, needsWater: true, needsRoad: true,
    sells: 'silver', sellRate: 1.38, sellPrice: 57.17, custRadius: 10, custMin: 14,
    desc: 'The silver-cutting works behind the Agora, where the bullion is struck into owls: 1.38/min at ' +
      '$57.17. It is still only a SHOP — nobody here is paid out of it, and the city does not stop ' +
      'if it does.',
  },

  nymphaeum: {
    name: 'The Nymphaeum', tier: 'infra', era: 10, w: 1, h: 1, cost: 590, upkeep: 0.79,
    icon: '⛲', color: '#6aa8c2', nearWater: 2, waterRadius: 15,
    desc: 'The spring built up into a basin and a niche with a god in it: waters 15 tiles. Fresh or salt ' +
      'is still not a question the engine asks.',
  },
  klepsydra: {
    name: 'The Klepsydra', tier: 'infra', era: 10, w: 1, h: 1, cost: 1930, upkeep: 1.26,
    icon: '\u{1F4A7}', color: '#5f9cbc', waterRadius: 22,
    desc: 'The hidden spring under the north-west shoulder of the rock, cut down to and roofed: waters 22 ' +
      'tiles and still needs no water anywhere near it. This is the one that carries a whole quarter.',
  },
  hypogeion: {
    name: 'The Hypogeion', tier: 'infra', era: 10, w: 1, h: 1, cost: 780, upkeep: 0.31,
    icon: '\u{1F3FA}', color: '#a07a4d', storeGrain: 190, storeFlour: 114,
    desc: 'A cut cellar with the jars sunk to their necks in the floor and a slab over the mouth: +1,900 ' +
      'wheat and +1,140 bread, no workers, no road. Buy it before the ships are late, not after.',
  },
  piraeussheds: {
    name: 'The Piraeus Sheds', tier: 'infra', era: 10, w: 3, h: 2, cost: 1930, upkeep: 1.57,
    icon: '\u{1F3EC}', color: '#b3a681', workers: 4, needsRoad: true, depot: true, storeCraft: 92,
    desc: 'The bonded ranges along the harbour front: +920 capacity for every traded good while staffed ' +
      '— olives, oil, grapes, wine, clay, ware, ore, bullion and marble — and a SUPPLY POINT ' +
      'for carting. The silver chain out-produces its own shop; this is where the difference waits.',
  },
  orchestra: {
    name: 'The Orchestra', tier: 'civic', era: 10, w: 2, h: 2, cost: 780, upkeep: 0.39,
    icon: '\u{1F5FF}', color: '#c2b591', capRadius: 29,
    desc: 'The beaten dancing-floor at the centre of the Agora, where the tribes gathered and the plays ' +
      'were first put on. +1 housing capacity for every home within 29 tiles.',
  },
  analemma: {
    name: 'The Analemma', tier: 'infra', era: 10, w: 2, h: 1, cost: 860, upkeep: 0.64,
    icon: '\u{1F9F1}', color: '#a9a189', soilRadius: 14,
    desc: 'A proper retaining wall — coursed, battered and drained — instead of a heap of ' +
      'field stones. Ground within 14 tiles recovers 3x faster. Attica lost its soil to the sea for a ' +
      'thousand years before anyone built these.',
  },
  diolkos: {
    name: 'The Diolkos', tier: 'infra', era: 10, w: 1, h: 1, cost: 1160, upkeep: 0.39,
    icon: '\u{1F6DF}', color: '#9c9789', onWater: true, bridge: true,
    desc: 'A paved way with cut grooves for the trolley wheels, laid out across the water on piers. ' +
      'Carries the road exactly as the mole does and looks like it was meant to be there.',
  },
  cornroute: {
    name: 'The Corn Route', tier: 'commerce', era: 10, w: 2, h: 3, cost: 3860, upkeep: 2.66,
    icon: '\u{1F6A2}', color: '#a87f4a', workers: 8, nearWater: 1, needsRoad: true,
    depot: true, quay: true, storeGrain: 456,
    procIn: 'oil', procRate: 0.90, procOut: 'grain', procRatio: 19.8,
    desc: 'The run to the Black Sea kept open all season, with guard ships and a treaty at the far end: ' +
      '0.90 oil/min out, 17.82 wheat in, and 4,560 more wheat of storage. Half of what this city eats ' +
      'has crossed the Hellespont.',
  },
  tholos: {
    name: 'The Tholos', tier: 'civic', era: 10, w: 2, h: 2, cost: 2420, upkeep: 2.28,
    icon: '\u{1F3DB}\u{FE0F}', color: '#bcab84', workers: 5, needsWater: true, needsRoad: true,
    rankDiscount: 0.22,
    desc: 'The round house beside the council chamber where a third of the Boule ate and slept in shifts, ' +
      'so that the city was never without a quorum. Every RANK upgrade costs 22% less.',
  },
  xystos: {
    name: 'The Xystos', tier: 'civic', era: 10, w: 2, h: 2, cost: 860, upkeep: 0.64,
    icon: '\u{1F93C}', color: '#c4b995', amenityRadius: 12,
    desc: 'A roofed running track for the winter and a grove of planes to walk in afterwards: ' +
      'contentment out to 12 tiles.',
  },
  metronomoi: {
    name: 'The Metronomoi', tier: 'civic', era: 10, w: 2, h: 3, cost: 4830, upkeep: 3.53,
    icon: '⚖\u{FE0F}', color: '#b8a662', workers: 6, needsWater: true, needsRoad: true,
    weighRadius: 15,
    desc: 'Ten appointed inspectors with the standard weights chained to the table and the authority to ' +
      'smash a false one. Shops within 15 tiles sell at +12%.',
  },

  anagrapheis: {
    name: 'The Anagrapheis', tier: 'civic', era: 10, w: 2, h: 2, cost: 1930, upkeep: 0.95,
    icon: '\u{1F4DC}', color: '#c4b78f', needsWater: true, keepsTally: true, scribeRadius: 29,
    desc: 'The recorders, and the stone-cutters who publish what they record: every account in the city ' +
      'set up in the open where it can be checked, out to 29 tiles. An Athenian magistrate left office ' +
      'by being audited, and a market that is trusted moves more.',
  },

  poiboards: {
    name: 'The Poi Boards', tier: 'food', era: 9, w: 2, h: 2, cost: 1470, upkeep: 1.36,
    grainMill: true,
    icon: '\u{1F35A}', color: '#bda878', workers: 5, needsWater: true, industry: true,
    procIn: 'grain', procRate: 12.6, procOut: 'flour', procRatio: 0.6,
    desc: 'Six boards under one roof, each with its own stone and its own pounder: 12.6 taro/min into ' +
      '7.6 poi. Still +25% beside a Pondfield, on both sides.',
  },
  cableloft: {
    name: 'Cable Loft', tier: 'craft', era: 9, w: 2, h: 2, cost: 1770, upkeep: 1.62,
    icon: '\u{1FAA2}', color: '#a88e5f', workers: 5, needsWater: true, industry: true,
    procIn: 'coir', procRate: 4.5, procOut: 'sennit', procRatio: 0.5,
    desc: 'A long loft where the strands are walked out to full length before they are laid up: 4.5 ' +
      'husk/min into 2.25 sennit, and the cable comes out even.',
  },
  beatersrow: {
    name: "Beaters' Row", tier: 'craft', era: 9, w: 2, h: 2, cost: 1530, upkeep: 1.51,
    icon: '\u{1FAB5}', color: '#bfae96', workers: 5, needsWater: true, industry: true,
    procIn: 'bast', procRate: 5.0, procOut: 'tapa', procRatio: 0.5,
    desc: 'Five anvil logs in a line, each beater tuned to a different note so the row can keep time: ' +
      '5.0 bast/min into 2.5 barkcloth. The village can hear how well the day is going.',
  },

  hookbench: {
    name: 'The Hook Bench', tier: 'commerce', era: 9, w: 2, h: 2, cost: 1290, upkeep: 1.08,
    icon: '\u{1FA9D}', color: '#bfa8b5', workers: 5, needsWater: true, needsRoad: true, industry: true,
    procIn: 'nacre', procRate: 5.6, procOut: 'lure', procRatio: 0.5,
    sells: 'lure', sellRate: 2.2, sellPrice: 17.16, custRadius: 6, custMin: 9,
    desc: 'Blanks roughed by one hand and finished by another, with a bench of masters at the end: 5.6 ' +
      'shell/min into 2.8 lures, and 2.2 of them out the door every minute.',
  },
  bladefloor: {
    name: 'The Blade Floor', tier: 'commerce', era: 9, w: 2, h: 2, cost: 1900, upkeep: 1.62,
    icon: '\u{1FA93}', color: '#7a736b', workers: 5, needsWater: true, needsRoad: true, industry: true,
    procIn: 'stone', procRate: 5.6, procOut: 'adze', procRatio: 0.5,
    sells: 'adze', sellRate: 1.6, sellPrice: 25.06, custRadius: 6, custMin: 10,
    desc: 'A floor of wet sandstone slabs kept running with a channel, so nobody stops to fetch water: ' +
      '5.6 basalt/min into 2.8 adzes and 1.6 sold. It eats the hill faster than one quarry feeds it.',
  },
  plumeloft: {
    name: 'The Plume Loft', tier: 'craft', era: 9, w: 2, h: 2, cost: 2430, upkeep: 2.11,
    icon: '\u{1F9E5}', color: '#a8352a', workers: 5, needsWater: true, needsRoad: true, industry: true,
    procIn: 'feathers', procRate: 1.7, procOut: 'cloak', procRatio: 0.6667,
    sells: 'cloak', sellRate: 1.2, sellPrice: 50.13, custRadius: 7, custMin: 14,
    desc: 'Feathers sorted by size and shade before a single one is tied, so the ranks of colour run ' +
      'true: 1.7 feathers/min into 1.13 cloaks, and 1.2 sold. Everything here is somebody\'s ancestor.',
  },

  feastterrace: {
    name: 'The Feast Terrace', tier: 'commerce', era: 9, w: 2, h: 2, cost: 1780, upkeep: 1.74,
    icon: '\u{1F372}', color: '#bf8260', workers: 3, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 3.6, sellPrice: 6.61, custRadius: 6, custMin: 9,
    desc: 'A paved terrace with standing ovens and room for the whole wedge to sit down: 3.6 poi/min. ' +
      'An age this far from anywhere eats together or not at all.',
  },
  coilyard: {
    name: 'The Coil Yard', tier: 'commerce', era: 9, w: 2, h: 2, cost: 1720, upkeep: 1.74,
    icon: '\u{1F9F5}', color: '#b59c6e', workers: 3, needsWater: true, needsRoad: true,
    sells: 'sennit', sellRate: 2.0, sellPrice: 22.17, custRadius: 7, custMin: 10,
    desc: 'Coils racked by lay, thickness and age, with a yard big enough to run a cable out and look ' +
      'down it: 2.0/min at $22.17.',
  },
  kaparoom: {
    name: 'The Kapa Room', tier: 'commerce', era: 9, w: 2, h: 2, cost: 2280, upkeep: 2.03,
    icon: '\u{1F9F6}', color: '#a89a86', workers: 3, needsWater: true, needsRoad: true,
    sells: 'tapa', sellRate: 1.6, sellPrice: 36.15, custRadius: 7, custMin: 14,
    desc: 'A dry room where bolts are kept flat, scented with maile and shown one at a time: 1.6 ' +
      'bolts/min at $36.15. Damp barkcloth is worth nothing and everyone knows it.',
  },
  shorecounter: {
    name: 'The Shore Counter', tier: 'commerce', era: 9, w: 1, h: 2, cost: 1000, upkeep: 0.87,
    icon: '\u{1F6D2}', color: '#ad8a60', workers: 2, needsWater: true, needsRoad: true,
    sellsRaw: ['nacre', 'coir', 'bast', 'salt', 'fish', 'feathers'], sellRate: 6.0,
    custRadius: 6, custMin: 7,
    desc: 'A proper counter with a roof, a scale and somebody who knows what things are worth: 6.0 ' +
      'units/min of whatever you have most of, still at 80% of list.',
  },

  stonetank: {
    name: 'The Stone Tank', tier: 'infra', era: 9, w: 1, h: 1, cost: 440, upkeep: 0.62,
    icon: '\u{26F2}', color: '#5f9fb5', waterRadius: 8,
    desc: 'The spring caught, roofed and led out along a stone-lined race: waters everything within 8 ' +
      'tiles instead of 5. Still no workers and still no road.',
  },
  ashbeds: {
    name: 'The Ash Beds', tier: 'infra', era: 9, w: 1, h: 1, cost: 670, upkeep: 0.48,
    icon: '\u{1F33F}', color: '#6a5c40', soilRadius: 7,
    desc: 'Burnt coral, wood ash and pounded seaweed layered and turned: ground within 7 tiles recovers ' +
      'from brackishness 3x faster.',
  },
  halemua: {
    name: "Hale Mua (Men's House)", tier: 'civic', era: 9, w: 2, h: 2, cost: 610, upkeep: 0.29,
    icon: '\u{1F6D6}', color: '#a08a62', capRadius: 29,
    desc: 'The eating house where the men of the wedge take their meals apart, and where the hull gets ' +
      'argued over for a year before it is cut. +1 housing capacity within 29 tiles.',
  },
  pointheiau: {
    name: 'The Point Heiau', tier: 'civic', era: 9, w: 1, h: 1, cost: 670, upkeep: 0.48,
    icon: '\u{1FAA8}', color: '#7a8c7f', amenityRadius: 12,
    desc: 'A walled platform of stacked stone with an oracle tower and a drum: contentment out to 12 ' +
      'tiles. Somebody with authority is watching the sea now.',
  },
  tradestones: {
    name: 'The Trade Stones', tier: 'civic', era: 9, w: 2, h: 3, cost: 3740, upkeep: 2.61,
    icon: '\u{2696}\u{FE0F}', color: '#8c8680', workers: 6, needsWater: true, needsRoad: true,
    weighRadius: 14,
    desc: 'Master blanks set in the ground where everyone passes, so a trade is checked without anyone ' +
      'having to ask. Shops within 14 tiles sell at a better price.',
  },
  kaluapits: {
    name: 'Kālua Pits', tier: 'food', era: 9, w: 2, h: 2, cost: 1810, upkeep: 1.28,
    icon: '\u{1F525}', color: '#7a5c40', workers: 3, needsWater: true, needsRoad: true, ovenRadius: 12,
    desc: 'Three pits on a rota so one is always hot and one is always cooling: homes within 12 tiles ' +
      'eat 15% less.',
  },

  halewaa: {
    name: 'Hale Waʻa (Canoe House)', tier: 'infra', era: 9, w: 2, h: 2, cost: 1490, upkeep: 1.16,
    icon: '\u{1F4E6}', color: '#9c8560', workers: 3, needsWater: true, needsRoad: true,
    depot: true, storeCraft: 80,
    desc: 'The long shed where the hulls live between voyages, and everything that goes in them: +80 ' +
      'capacity for every craft good, and still a SUPPLY POINT.',
  },
  ipurack: {
    name: 'Ipu Rack', tier: 'infra', era: 9, w: 1, h: 1, cost: 610, upkeep: 0.23,
    icon: '\u{1FAD9}', color: '#a08a52', storeGrain: 152, storeFlour: 92,
    desc: 'Gourds grown to shape on a frame, dried hard, sealed with breadfruit gum and racked in tiers: ' +
      '+152 taro and +92 poi capacity, and it still eats nothing.',
  },

  haulingslipway: {
    name: 'The Hauling Slipway', tier: 'infra', era: 9, w: 2, h: 3, cost: 4490, upkeep: 2.03,
    icon: '\u{1F6F6}', color: '#7a7057', workers: 4,
    depot: true, voyageRange: 26, nearWater: 1, needsRoad: false, needsWater: false,
    storeCraft: 40,
    desc: 'A stone ramp, rollers and a shed at the head of it, so a hull comes out of the water without ' +
      'thirty people. It crosses the SAME 26 tiles — distance is bought at the Court and at the rank — ' +
      'and what it adds is +40 craft capacity on a shore that had none.',
  },
  starcompass: {
    name: 'The Star Compass', tier: 'civic', era: 9, w: 3, h: 3, cost: 3740, upkeep: 2.61,
    icon: '\u{2B50}', color: '#6a7080', workers: 6, needsRoad: true,
    voyageBonus: 9,
    desc: 'The full thirty-two houses set out in stone, with the swell directions and the bird flights ' +
      'named between them. Every Landing you own crosses 9 tiles further instead of 6.',
  },
  basaltmole: {
    name: 'The Basalt Mole', tier: 'infra', era: 9, w: 1, h: 1, cost: 900, upkeep: 0.29,
    icon: '\u{1F6E4}\u{FE0F}', color: '#b0a894', onWater: true, bridge: true, depot: true,
    desc: 'The causeway squared off and carried out far enough to lie behind: carries the road AND ' +
      'counts as a SUPPLY POINT, so the far shore stops paying the carting premium.',
  },

  arvum: {
    name: 'Arvum', tier: 'food', era: 11, w: 2, h: 2, cost: 590, upkeep: 1.00,
    icon: '\u{1F33E}', color: '#c2a54e', workers: 2,
    out: { grain: 4.74 },
    desc: 'The ploughland: 4.74 far/min off dry Latian tufa, and it needs NO water, NO road and ' +
      'nothing from anybody. THREE ARVA FEED ONE MOLA EXACTLY. It is what the founding crew works ' +
      'first, and it is the only field on the ladder that asks for nothing.',
  },

  molaasinaria: {
    name: 'Mola Asinaria', tier: 'food', era: 11, w: 2, h: 2, cost: 1480, upkeep: 1.66,
    icon: '\u{2699}\u{FE0F}', color: '#b9a483', workers: 4, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 14.23, procOut: 'flour', procRatio: 0.6,
    desc: 'Two stones and a donkey on a pole: 14.23 far/min into 8.54 farina — the bread of about ' +
      '142 people. One mill feeds the whole city the exit gate asks for, with a little over. ' +
      '+25% both ways beside an Arvum.',
  },

  macellum: {
    name: 'The Macellum', tier: 'commerce', era: 11, w: 2, h: 2, cost: 1480, upkeep: 1.99,
    icon: '\u{1F956}', color: '#c9a45e', workers: 4, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 2.85, sellPrice: 7.27, custRadius: 10, custMin: 11,
    desc: 'The provision market: 2.85 farina/min at $7.27. IT SELLS TO CITIZENS, AND A CITIZEN IS ' +
      'SOMEBODY THE LAST CENSUS COUNTED — the uncounted eat here and buy nothing. Watch the 🏛️ ' +
      'chip; the gap is the shortfall.',
  },

  hortus: {
    name: 'Hortus', tier: 'food', era: 11, w: 2, h: 2, cost: 590, upkeep: 1.00,
    icon: '\u{1F966}', color: '#7ea24e', workers: 2, dryLand: true,
    out: { forage: 4.50 },
    desc: 'Cabbage, leeks, beans and garlic behind the house — 4.50/min, eaten at 80% of bread’s ' +
      'worth. NO water, NO road, NOTHING from anywhere. Cato wrote a book about this plot; it is ' +
      'the reason a Roman smallholding could not be starved out.',
  },

  forumholitorium: {
    name: 'Forum Holitorium', tier: 'commerce', era: 11, w: 2, h: 2, cost: 820, upkeep: 1.10,
    icon: '\u{1F9FA}', color: '#9bb05c', workers: 3, needsRoad: true,
    sells: 'forage', sellRate: 2.85, sellPrice: 4.00, custRadius: 10, custMin: 9,
    desc: 'The vegetable market under the temples of Janus and Spes: 2.85 greens/min at $4.00. Half ' +
      'the price of bread and none of the chain — no field to plough, no mill to turn, no water. ' +
      'It reads the register like every other shop.',
  },

  vivarium: {
    name: 'The Vivarium', tier: 'food', era: 11, w: 1, h: 3, cost: 950, upkeep: 1.00,
    icon: '\u{1F41F}', color: '#5f8fa8', workers: 2, onWater: true,
    out: { fish: 5.62 },
    desc: 'Stakes, wicker and a stilled corner of the Tiber: 5.62 fish/min, eaten at 75% of bread’s ' +
      'worth. Every tile of it stands IN the water — the river decides how many you get, which is ' +
      'why the HORTUS and not this is the leg that cannot fail.',
  },

  salinae: {
    name: 'The Salinae', tier: 'food', era: 11, w: 2, h: 4, cost: 1430, upkeep: 1.58,
    icon: '\u{1F9C2}', color: '#e0dcc8', workers: 4, onSalt: true, industry: true,
    out: { salt: 7.92 },
    desc: 'Pans cut into the flats and let flood: 7.92 salt/min. Ancus Marcius took these before he ' +
      'took anything else, and the road out of them is called the SALARIA. One pan keeps one and a ' +
      'half salting houses, and the Capitolium wants 3,600 besides.',
  },

  salsamentaria: {
    name: 'Salsamentaria', tier: 'craft', era: 11, w: 2, h: 2, cost: 1540, upkeep: 1.86,
    icon: '\u{1FAD9}', color: '#a8845e', workers: 4, needsWater: true, industry: true,
    procIn: 'salt', procRate: 5.29, procOut: 'salsamentum', procRatio: 0.5,
    desc: 'Vats, brine and a stone floor: 5.29 salt/min into 2.65 salted fish. The catch comes off ' +
      'the river in baskets and costs nothing; THE SALT IS WHAT YOU HAVE TO BUY AND CART, and that ' +
      'is the whole economics of a Roman fish sauce.',
  },

  forumpiscarium: {
    name: 'Forum Piscarium', tier: 'commerce', era: 11, w: 2, h: 2, cost: 1420, upkeep: 1.99,
    icon: '\u{1F980}', color: '#7f9bb0', workers: 3, needsWater: true, needsRoad: true,
    sells: 'salsamentum', sellRate: 1.46, sellPrice: 22.31, custRadius: 10, custMin: 12,
    desc: 'The fish market on the river side of the Forum: 1.46 salted fish/min at $22.31. The ' +
      'cheapest export in the age and the one a poor quarter actually buys — if the censors have ' +
      'entered that quarter on the register.',
  },

  ovile: {
    name: 'The Ovile', tier: 'food', era: 11, w: 3, h: 3, cost: 1160, upkeep: 1.49,
    icon: '\u{1F411}', color: '#b6b39a', workers: 3, dryLand: true,
    out: { wool: 3.97 },
    desc: 'The fold and the summer range above it: 3.97 fleece/min off ground too thin for anything ' +
      'else, +50% on ground already worked out. No water, no road, no river. The richest chain in ' +
      'the age starts on the worst land in it.',
  },

  fullonica: {
    name: 'The Fullonica', tier: 'craft', era: 11, w: 2, h: 2, cost: 1780, upkeep: 1.99,
    icon: '\u{1F9F6}', color: '#c8c0aa', workers: 4, needsWater: true, industry: true,
    procIn: 'wool', procRate: 4.23, procOut: 'cloth', procRatio: 0.5,
    desc: 'Treading tubs, fuller’s earth and a press: 4.23 fleece/min into 2.12 finished cloth. It ' +
      'wants water and it wants it constantly. +25% both ways beside an Ovile.',
  },

  tabernavestiaria: {
    name: 'Taberna Vestiaria', tier: 'commerce', era: 11, w: 2, h: 2, cost: 1900, upkeep: 2.32,
    icon: '\u{1F9E5}', color: '#cbb6a0', workers: 3, needsWater: true, needsRoad: true,
    sells: 'cloth', sellRate: 1.06, sellPrice: 47.01, custRadius: 10, custMin: 16,
    desc: 'The clothiers’ row: 1.06 cloth/min at $47.01, the richest trade on the board. It wants ' +
      '16 counted residents in reach — the one shop in the age a stale register can switch off ' +
      'outright.',
  },

  cretifodina: {
    name: 'Cretifodina', tier: 'food', era: 11, w: 2, h: 2, cost: 660, upkeep: 1.00,
    icon: '\u{1FAA8}', color: '#a8825e', workers: 2, nearWater: 2,
    out: { clay: 4.23 },
    desc: 'The clay cut: 4.23/min, and the yellow Tiber bank is the reason Rome roofed itself in ' +
      'tile while everyone else was still thatching. Near water for the washing, not in it.',
  },

  officinategularia: {
    name: 'Officina Tegularia', tier: 'craft', era: 11, w: 2, h: 2, cost: 1540, upkeep: 1.86,
    icon: '\u{1F9F1}', color: '#b06a4e', workers: 4, needsWater: true, industry: true,
    procIn: 'clay', procRate: 5.29, procOut: 'tegula', procRatio: 0.5,
    desc: 'Flat pan-tile and curved cover-tile, stamped with the yard’s own name: 5.29 clay/min ' +
      'into 2.65 tegulae. Two tile yards keep four markets. Every roof in the city is downstream ' +
      'of this building.',
  },

  mercatustegularum: {
    name: 'Mercatus Tegularum', tier: 'commerce', era: 11, w: 2, h: 2, cost: 1420, upkeep: 1.99,
    icon: '\u{1F3E0}', color: '#b8794e', workers: 3, needsRoad: true,
    sells: 'tegula', sellRate: 1.32, sellPrice: 28.83, custRadius: 10, custMin: 12,
    desc: 'The tile yard on the road out: 1.32 tegulae/min at $28.83. No water — tile leaves by ' +
      'cart. It is the least glamorous money in the age and the most reliable.',
  },

  silicaria: {
    name: 'Silicaria', tier: 'food', era: 11, w: 3, h: 3, cost: 2660, upkeep: 2.32,
    icon: '\u{26CF}\u{FE0F}', color: '#6e6e70', workers: 5, onRock: true, industry: true,
    quarried: true,
    out: { stone: 6.61 },
    desc: 'Alban lava cut into blocks: 6.61 silex/min, scaled by how much rock is under it. Every ' +
      'rock tile holds 900 and there is NO recovery — a worked-out flow is grass forever. The gate ' +
      'wants 6,583, which is more than one quarry holds.',
  },

  officinasilicis: {
    name: 'Officina Silicis', tier: 'craft', era: 11, w: 2, h: 2, cost: 3160, upkeep: 2.78,
    icon: '\u{1F5FF}', color: '#7a787c', workers: 5, industry: true,
    procIn: 'stone', procRate: 7.39, procOut: 'silex', procRatio: 0.5,
    desc: 'Wedges, a levelled floor and a gauge: 7.39 stone/min into 3.70 dressed polygons. The ' +
      'Capitolium eats 3.00 of that a minute and the yard sells 1.06 — ONE WORKS DOES NOT COVER ' +
      'BOTH. Needs no water.',
  },

  crepidines: {
    name: 'Crepidines', tier: 'commerce', era: 11, w: 2, h: 2, cost: 1720, upkeep: 1.99,
    icon: '\u{1F6E3}\u{FE0F}', color: '#8a8890', workers: 3, needsRoad: true,
    sells: 'silex', sellRate: 1.06, sellPrice: 32.59, custRadius: 10, custMin: 12,
    desc: 'Kerbstone and paving sold by the cartload at $32.59 — to the censors, who let the ' +
      'contracts, and to anybody else laying a street. It competes with your own monument for ' +
      'every polygon the yard dresses.',
  },

  casacolonica: {
    name: 'Casa Colonica', tier: 'housing', era: 11, w: 1, h: 1, cost: 710, upkeep: 0.33,
    icon: '\u{1F3E0}', color: '#d0bb95', cap: 8, needsWater: true, needsRoad: true,
    desc: 'Tufa footings, mudbrick, a tiled roof and a yard. Holds 8 — one more than the age below ' +
      'it, on the same single tile. The growth in this rung is UPWARD, in the Atrium Domus.',
  },

  atriumdomus: {
    name: 'Atrium Domus', tier: 'housing', era: 11, w: 2, h: 2, cost: 2450, upkeep: 1.10,
    icon: '\u{1F3D8}\u{FE0F}', color: '#c6ae8c', cap: 34, needsWater: true, needsRoad: true,
    levels: ['Tabernae', 'Atrium Domus', 'Domus with a Peristyle', 'Double-Court Domus',
             'Domus of the Fasti', 'Domus Publica'],
    desc: 'One roof over a courtyard, and shops let into the street front. Holds 17 when it goes ' +
      'up, rising to 119 — the densest housing on the ladder. THIS is where the age puts its ' +
      'people, and every one of them is a mouth the moment the roof is on.',
  },

  lacus: {
    name: 'Lacus', tier: 'infra', era: 11, w: 1, h: 1, cost: 360, upkeep: 0.67,
    icon: '\u{26F2}', color: '#7fb0c4', nearWater: 2, waterRadius: 10,
    desc: 'A street basin running day and night off a spring: waters 10 tiles for a third of a ' +
      'settling tank. This is the cheap water, not the clever one.',
  },

  piscinalimaria: {
    name: 'Piscina Limaria', tier: 'infra', era: 11, w: 1, h: 1, cost: 1190, upkeep: 1.06,
    icon: '\u{1F4A7}', color: '#6f9fc0', waterRadius: 15,
    desc: 'A settling tank: water stands until the silt drops out of it, then goes on. Waters 15 ' +
      'tiles and needs no water anywhere near it. Not an aqueduct — this city carries its own.',
  },

  doliarium: {
    name: 'The Doliarium', tier: 'infra', era: 11, w: 1, h: 1, cost: 480, upkeep: 0.26,
    icon: '\u{1F3FA}', color: '#b08258', storeGrain: 119, storeFlour: 71,
    desc: 'Great jars sunk to the shoulder in a paved floor. +1,190 far and +710 farina, NO workers ' +
      'and no road — the buffer that carries you from harvest to harvest. Buy it before you need it.',
  },

  porticusaemilia: {
    name: 'Porticus Aemilia', tier: 'infra', era: 11, w: 3, h: 2, cost: 1190, upkeep: 1.32,
    icon: '\u{1F3EC}', color: '#c0a882', workers: 3, needsRoad: true, nearWater: 1,
    depot: true, storeCraft: 53,
    desc: 'The river warehouse: +530 capacity for every traded good while staffed — salt, salt ' +
      'fish, tile, cloth, stone and paving — and a SUPPLY POINT, so the far bank stops paying the ' +
      'carting premium.',
  },

  saepta: {
    name: 'The Saepta', tier: 'civic', era: 11, w: 2, h: 2, cost: 480, upkeep: 0.33,
    icon: '\u{1F3DB}', color: '#c4b894', capRadius: 20,
    desc: 'Hurdles, swept gravel and room for the centuries to stand. +1 housing capacity for every ' +
      'home within 20 tiles. One is enough; a second adds nothing to a home already covered.',
  },

  sterquilinium: {
    name: 'Sterquilinium', tier: 'infra', era: 11, w: 2, h: 1, cost: 530, upkeep: 0.54,
    icon: '\u{1F4A9}', color: '#8e7a52', soilRadius: 8,
    desc: 'The dung-heap, sited downwind and turned twice a year — Cato tells you exactly how big ' +
      'to make it. Ground within 8 tiles recovers 3x faster. Unglamorous, and it is why the same ' +
      'field is still there in a hundred years.',
  },

  tabularium: {
    name: 'The Tabularium', tier: 'civic', era: 11, w: 3, h: 2, cost: 2400, upkeep: 2.40,
    icon: '\u{1F4DC}', color: '#a89878', workers: 4, needsRoad: true,
    censusOffice: true, scribeRadius: 22,
    desc: 'The record office in the saddle of the Capitol, with the bronze laws on the wall and the ' +
      'tabulae in the vaults. A staffed office takes 25% off the per-head cost of a census; two is ' +
      'the ceiling. IT DOES NOT COUNT ANYBODY — you still have to order it.',
  },

  aerarium: {
    name: 'The Aerarium', tier: 'civic', era: 11, w: 2, h: 2, cost: 2140, upkeep: 2.12,
    icon: '\u{1FA99}', color: '#c9b06a', workers: 3, needsRoad: true,
    dues: 0.265,
    desc: 'The treasury under the temple of Saturn, with the quaestors and the tally. Collects the ' +
      'tributum from every COUNTED resident within 20 tiles — about $26.50/min at a hundred ' +
      'citizens. THE UNCOUNTED PAY NOTHING, and they still eat.',
  },

  basilica: {
    name: 'Basilica Porcia', tier: 'civic', era: 11, w: 2, h: 2, cost: 530, upkeep: 0.54,
    icon: '\u{1F3DB}\u{FE0F}', color: '#bfb59c', amenityRadius: 10,
    desc: 'A roofed hall beside the Forum: shade, benches, and somewhere to argue out of the rain. ' +
      'Homes within 10 tiles are worth more. Cato built the first one while he was censor, which ' +
      'is the office this whole age is about.',
  },

  moneta: {
    name: 'The Moneta', tier: 'civic', era: 11, w: 2, h: 3, cost: 2970, upkeep: 2.99,
    icon: '\u{1FA99}', color: '#b8a45e', workers: 5, needsRoad: true, needsWater: true,
    weighRadius: 12,
    desc: 'The mint in the temple of Juno Moneta, where the standard weights are kept and the coin ' +
      'is struck. Trade within 12 tiles is measured honestly and priced accordingly — and the word ' +
      'MONEY is this building’s name.',
  },

  ponssublicius: {
    name: 'Pons Sublicius', tier: 'infra', era: 11, w: 1, h: 1, cost: 710, upkeep: 0.33,
    icon: '\u{1F309}', color: '#a89474', onWater: true, bridge: true,
    desc: 'Timber piles and not one nail of iron, so the priests could take it apart in a morning. ' +
      'Carries the road across the water — lay a line of them and the far bank joins the city.',
  },

  stabulum: {
    name: 'The Stabulum', tier: 'infra', era: 11, w: 2, h: 2, cost: 780, upkeep: 0.66,
    icon: '\u{1F40E}', color: '#9a8460', workers: 2, needsRoad: true, depot: true, storeGrain: 60,
    desc: 'Mules, a yard and a shed at the milestone. A SUPPLY POINT with +600 far of storage, ' +
      'placed where the carts already stop — the cheapest way to push the free haul out past the ' +
      'edge of the built city.',
  },

  rostra: {
    name: 'The Rostra', tier: 'beauty', era: 11, w: 1, h: 1, cost: 150, upkeep: 0,
    icon: '\u{1F6A2}', color: '#b5aa8e', cosmetic: true,
    desc: 'The speakers’ platform, faced with the beaks cut off the ships taken at Antium. No ' +
      'output and no upkeep — it marks the place where the Republic argued, which is the whole job.',
  },

  iugera: {
    name: 'The Iugera', tier: 'food', era: 11, w: 2, h: 2, cost: 1450, upkeep: 2.00,
    icon: '\u{1F33E}', color: '#c9ae55', workers: 3, noBuild: true,
    out: { grain: 9.48 },
    desc: 'The strip squared off, ditched and rotated: 9.48 far/min off the same two tiles, for one ' +
      'more pair of hands. Still no water and still no road.',
  },
  turningfloor: {
    name: 'The Turning Floor', tier: 'food', era: 11, w: 2, h: 2, cost: 2440, upkeep: 2.32,
    icon: '\u{2699}\u{FE0F}', color: '#c4b08e', workers: 5, needsWater: true, industry: true,
    grainMill: true, noBuild: true,
    procIn: 'grain', procRate: 19.92, procOut: 'flour', procRatio: 0.6,
    desc: 'Three stones on one paved floor with the donkeys walking in relay: 19.92 far/min into ' +
      '11.95 farina. It never stops, which is the only way a mill gets faster.',
  },
  nundinae: {
    name: 'The Nundinae', tier: 'commerce', era: 11, w: 2, h: 2, cost: 2960, upkeep: 2.98,
    icon: '\u{1F956}', color: '#d2ad63', workers: 5, needsWater: true, needsRoad: true,
    noBuild: true,
    sells: 'flour', sellRate: 5.70, sellPrice: 7.27, custRadius: 10, custMin: 11,
    desc: 'The eight-day market, when the country comes in: 5.70 farina/min at $7.27. Twice the ' +
      'stalls and the same register — it can only sell to people the censors have counted.',
  },
  olitores: {
    name: 'The Olitores', tier: 'food', era: 11, w: 2, h: 2, cost: 1450, upkeep: 2.00,
    icon: '\u{1F966}', color: '#8bb055', workers: 3, dryLand: true, noBuild: true,
    out: { forage: 9.00 },
    desc: 'The market-gardeners take the plot over properly — beds, a well-sweep, three crops a ' +
      'year: 9.00 greens/min. It still needs nothing from anybody.',
  },
  cuppedinis: {
    name: 'The Cuppedinis', tier: 'commerce', era: 11, w: 2, h: 2, cost: 1640, upkeep: 2.20,
    icon: '\u{1F9FA}', color: '#a9be68', workers: 4, needsRoad: true, noBuild: true,
    sells: 'forage', sellRate: 5.70, sellPrice: 4.00, custRadius: 10, custMin: 9,
    desc: 'The delicacies market: 5.70 greens/min at $4.00. Cheap food sold at volume is what feeds ' +
      'a quarter the export shops will not look at.',
  },
  nassae: {
    name: 'The Nassae', tier: 'food', era: 11, w: 1, h: 3, cost: 2330, upkeep: 2.00,
    icon: '\u{1F41F}', color: '#6f9fb8', workers: 3, onWater: true, noBuild: true,
    out: { fish: 11.24 },
    desc: 'Wicker traps set in a line across the current and lifted twice a day: 11.24 fish/min. ' +
      'The river does the work; you only have to empty them.',
  },
  campiostienses: {
    name: 'The Campi Ostienses', tier: 'food', era: 11, w: 2, h: 4, cost: 3500, upkeep: 3.16,
    icon: '\u{1F9C2}', color: '#eae6d4', workers: 5, onSalt: true, industry: true, noBuild: true,
    out: { salt: 15.84 },
    desc: 'The whole flat under one channel and one gate: 15.84 salt/min. This is the works that ' +
      'paid for the Via Salaria, and the wage word SALARIUM is what it paid in.',
  },
  garumvats: {
    name: 'The Garum Vats', tier: 'craft', era: 11, w: 2, h: 2, cost: 2540, upkeep: 2.60,
    icon: '\u{1FAD9}', color: '#b08e5e', workers: 5, needsWater: true, industry: true,
    noBuild: true,
    procIn: 'salt', procRate: 7.41, procOut: 'salsamentum', procRatio: 0.5,
    desc: 'Open vats left in the sun for three months: 7.41 salt/min into 3.70. It smells like a ' +
      'crime and it sells like nothing else in the age.',
  },
  velabrum: {
    name: 'The Velabrum', tier: 'commerce', era: 11, w: 2, h: 2, cost: 2840, upkeep: 2.98,
    icon: '\u{1F980}', color: '#8fa8bc', workers: 4, needsWater: true, needsRoad: true,
    noBuild: true,
    sells: 'salsamentum', sellRate: 2.92, sellPrice: 22.31, custRadius: 10, custMin: 12,
    desc: 'The whole market quarter between the Forum and the river: 2.92 salted fish/min at ' +
      '$22.31. Twice the trade, and twice the exposure to a register nobody has closed.',
  },
  saltus: {
    name: 'The Saltus', tier: 'food', era: 11, w: 3, h: 3, cost: 2320, upkeep: 2.98,
    icon: '\u{1F411}', color: '#c2bfa4', workers: 4, dryLand: true, noBuild: true,
    out: { wool: 7.94 },
    desc: 'The flock goes up to the high pasture in summer and comes down in autumn: 7.94 ' +
      'fleece/min. The road it walks is older than the Republic.',
  },
  sulphurhouse: {
    name: 'The Sulphur House', tier: 'craft', era: 11, w: 2, h: 2, cost: 2940, upkeep: 2.79,
    icon: '\u{1F9F6}', color: '#d4cdb2', workers: 5, needsWater: true, industry: true,
    noBuild: true,
    procIn: 'wool', procRate: 5.92, procOut: 'cloth', procRatio: 0.5,
    desc: 'Cloth hung over burning sulphur to bleach, then napped and pressed: 5.92 fleece/min into ' +
      '2.96 cloth. Whiter wool is dearer wool, and white is what a toga has to be.',
  },
  togaria: {
    name: 'The Togaria', tier: 'commerce', era: 11, w: 2, h: 2, cost: 3800, upkeep: 3.48,
    icon: '\u{1F9E5}', color: '#d5c2ac', workers: 4, needsWater: true, needsRoad: true,
    noBuild: true,
    sells: 'cloth', sellRate: 2.12, sellPrice: 47.01, custRadius: 10, custMin: 16,
    desc: 'Where the toga virilis is bought, and it is bought once and remembered: 2.12 cloth/min ' +
      'at $47.01. The richest counter on the board wants 16 counted citizens in reach.',
  },
  puteolibeds: {
    name: 'The Puteoli Beds', tier: 'food', era: 11, w: 2, h: 2, cost: 1620, upkeep: 2.00,
    icon: '\u{1FAA8}', color: '#b8926a', workers: 3, nearWater: 2, noBuild: true,
    out: { clay: 8.46 },
    desc: 'Volcanic clay off the bay of Naples, washed and levigated on site: 8.46/min. It fires ' +
      'harder and it fires redder, and every tile yard in Italy wants it.',
  },
  imbrexworks: {
    name: 'The Imbrex Works', tier: 'craft', era: 11, w: 2, h: 2, cost: 2540, upkeep: 2.60,
    icon: '\u{1F9F1}', color: '#bd7452', workers: 5, needsWater: true, industry: true,
    noBuild: true,
    procIn: 'clay', procRate: 7.41, procOut: 'tegula', procRatio: 0.5,
    desc: 'Two kilns and a drying shed under one roof: 7.41 clay/min into 3.70 tegulae. The stamp ' +
      'on the tile is the yard’s name, the consul’s year and a receipt that outlives both.',
  },
  portustiberinus: {
    name: 'The Portus Tiberinus', tier: 'commerce', era: 11, w: 2, h: 2, cost: 2840, upkeep: 2.98,
    icon: '\u{1F3E0}', color: '#c58a5c', workers: 4, needsRoad: true, noBuild: true,
    sells: 'tegula', sellRate: 2.64, sellPrice: 28.83, custRadius: 10, custMin: 12,
    desc: 'The old river landing turned over to the tile trade: 2.64 tegulae/min at $28.83. Barges ' +
      'in, carts out, and a roof over half the city inside a generation.',
  },
  lapisalbanus: {
    name: 'The Lapis Albanus', tier: 'food', era: 11, w: 3, h: 3, cost: 6520, upkeep: 4.64,
    icon: '\u{26CF}\u{FE0F}', color: '#5e5e62', workers: 6, onRock: true, industry: true,
    quarried: true, noBuild: true,
    out: { stone: 13.22 },
    desc: 'The Alban flow opened properly, with a ramp and a crane: 13.22 silex/min. It eats the ' +
      'rock twice as fast as the cut below it and the rock does not come back.',
  },
  nucleusbeds: {
    name: 'The Nucleus Beds', tier: 'craft', era: 11, w: 2, h: 2, cost: 5210, upkeep: 3.89,
    icon: '\u{1F5FF}', color: '#6c6a6e', workers: 6, industry: true, noBuild: true,
    procIn: 'stone', procRate: 10.35, procOut: 'silex', procRatio: 0.5,
    desc: 'Statumen, rudus, nucleus and then the polygons laid on top: 10.35 stone/min into 5.18 ' +
      'dressed silex. One of these covers the monument AND the yard, which the works below it does ' +
      'not.',
  },
  milliaria: {
    name: 'The Milliaria', tier: 'commerce', era: 11, w: 2, h: 2, cost: 3440, upkeep: 2.98,
    icon: '\u{1F6E3}\u{FE0F}', color: '#9a98a0', workers: 4, needsRoad: true, noBuild: true,
    sells: 'silex', sellRate: 2.12, sellPrice: 32.59, custRadius: 10, custMin: 12,
    desc: 'Milestones cut, numbered and sold with the paving that goes between them: 2.12 silex/min ' +
      'at $32.59. Every one carries the name of the man who let the contract.',
  },
  fonspublicus: {
    name: 'The Fons Publicus', tier: 'infra', era: 11, w: 1, h: 1, cost: 760, upkeep: 0.88,
    icon: '\u{26F2}', color: '#8fc0d2', nearWater: 2, waterRadius: 16, noBuild: true,
    desc: 'The basin rebuilt in stone with four spouts and a standing overflow: waters 16 tiles. ' +
      'Still the cheap water — it is just a great deal more of it.',
  },
  favissae: {
    name: 'The Favissae', tier: 'infra', era: 11, w: 1, h: 1, cost: 2500, upkeep: 1.63,
    icon: '\u{1F4A7}', color: '#5f8fb4', waterRadius: 23, noBuild: true,
    desc: 'The vaults cut into the Capitoline rock below the temple, plastered and roofed. Waters ' +
      '23 tiles off winter rain alone, and it still needs no water anywhere near it.',
  },
  cellapenaria: {
    name: 'The Cella Penaria', tier: 'infra', era: 11, w: 1, h: 1, cost: 1010, upkeep: 0.41,
    icon: '\u{1F3FA}', color: '#bd8f60', storeGrain: 238, storeFlour: 142, noBuild: true,
    desc: 'The store-room proper: rows of dolia, a tiled floor and a door with a lock on it. ' +
      '+2,380 far and +1,420 farina, and still no workers and no road.',
  },
  horreagalbana: {
    name: 'The Horrea Galbana', tier: 'infra', era: 11, w: 3, h: 2, cost: 2500, upkeep: 2.05,
    icon: '\u{1F3EC}', color: '#cbb58c', workers: 4, needsRoad: true, nearWater: 1,
    depot: true, storeCraft: 106, noBuild: true,
    desc: 'Three courtyards of vaulted cells behind the wharf: +1,060 capacity for every traded ' +
      'good while staffed, and a SUPPLY POINT. The largest warehouse in the ancient world, and it ' +
      'was a private speculation.',
  },
  campusmartius: {
    name: 'The Campus Martius', tier: 'civic', era: 11, w: 2, h: 2, cost: 1010, upkeep: 0.51,
    icon: '\u{1F3DB}', color: '#cec3a2', capRadius: 29, noBuild: true,
    desc: 'The whole field outside the wall — drill ground, voting ground, and the place the ' +
      'censors take the count. +1 housing capacity for every home within 29 tiles.',
  },
  fimetum: {
    name: 'The Fimetum', tier: 'infra', era: 11, w: 2, h: 1, cost: 1110, upkeep: 0.85,
    icon: '\u{1F4A9}', color: '#7f6c48', soilRadius: 15, noBuild: true,
    desc: 'Pits, cover and a rota, run the way the agronomists wrote it down: ground within 15 ' +
      'tiles recovers 3x faster. Columella devotes a chapter to this; so should you.',
  },
  libraria: {
    name: 'The Libraria', tier: 'civic', era: 11, w: 3, h: 2, cost: 3600, upkeep: 3.14,
    icon: '\u{1F4DC}', color: '#b8a888', workers: 5, needsRoad: true,
    censusOffice: true, scribeRadius: 32, noBuild: true,
    desc: 'The clerks’ hall: copies of every declaration, filed by tribe and by century, with a ' +
      'staff that can find one. Still 25% off the per-head cost, and it reaches 32 tiles — but two ' +
      'offices is the ceiling however good they are.',
  },
  quaestorium: {
    name: 'The Quaestorium', tier: 'civic', era: 11, w: 2, h: 2, cost: 3210, upkeep: 2.78,
    icon: '\u{1FA99}', color: '#d5bd76', workers: 4, needsRoad: true,
    dues: 0.53, noBuild: true,
    desc: 'The quaestors’ own offices beside the treasury, with the tribunes’ benches outside. ' +
      'Doubles the tributum — $53.00/min at a hundred counted citizens. It still cannot see a ' +
      'household nobody has entered.',
  },
  porticusmetelli: {
    name: 'The Porticus Metelli', tier: 'civic', era: 11, w: 2, h: 2, cost: 1110, upkeep: 0.85,
    icon: '\u{1F3DB}\u{FE0F}', color: '#cdc4ab', amenityRadius: 15, noBuild: true,
    desc: 'The first marble colonnade in Rome, put up out of a triumph in 146 BCE and full of ' +
      'looted Greek bronzes. Homes within 15 tiles are worth more, and everybody knows who paid.',
  },
  argentaria: {
    name: 'The Argentaria', tier: 'civic', era: 11, w: 2, h: 3, cost: 6240, upkeep: 4.49,
    icon: '\u{1FA99}', color: '#c8b06a', workers: 6, needsRoad: true, needsWater: true,
    weighRadius: 18, noBuild: true,
    desc: 'The bankers’ tables along the north side of the Forum, with the assay, the scales and ' +
      'the ledgers. Trade within 18 tiles is weighed, changed and recorded honestly.',
  },
  pilaesaxeae: {
    name: 'The Pilae Saxeae', tier: 'infra', era: 11, w: 1, h: 1, cost: 1490, upkeep: 0.51,
    icon: '\u{1F309}', color: '#b09c7c', onWater: true, bridge: true, noBuild: true,
    desc: 'Stone piers under the same timber deck, cut-waters upstream and a paved approach. ' +
      'Carries the road, and it carries it through a flood.',
  },
  hospitium: {
    name: 'The Hospitium', tier: 'infra', era: 11, w: 2, h: 2, cost: 1640, upkeep: 1.32,
    icon: '\u{1F40E}', color: '#a89068', workers: 3, needsRoad: true, depot: true,
    storeGrain: 126, noBuild: true,
    desc: 'Beds, stabling and a granary at the milestone. A SUPPLY POINT with +1,260 far — the ' +
      'road station that made the Roman road worth having, a century before anyone called it a ' +
      'cursus publicus.',
  },

  hyle: {
    name: 'The Hyle', tier: 'craft', era: 12, w: 2, h: 2, cost: 980, upkeep: 1.10,

    icon: '\u{1F332}', color: '#4d6b42', workers: 2,
    out: { bitumen: 4.86 },
    desc: 'Tapped pine on the seaward slopes: 4.86 resin/min, and it needs no water and no road. ' +
      'TWO HYLE KEEP ONE NEORION RUNNING, with a little to spare. It is the first half of the only ' +
      'chain in this city that will never earn a coin.',
  },
  xylagogia: {
    name: 'The Xylagogia', tier: 'craft', era: 12, w: 2, h: 2, cost: 2400, upkeep: 2.20,
    icon: '\u{1F332}', color: '#5c7a4e', workers: 3, noBuild: true,
    out: { bitumen: 9.72 },
    desc: 'A greased timber-way down to the water, so the slopes above the cliff are worth working ' +
      'at all: 9.72 resin/min off the same ground. One of these feeds two Neoria outright.',
  },

  neorion: {
    name: 'The Neorion', tier: 'craft', era: 12, w: 2, h: 2, cost: 3890, upkeep: 4.36,
    icon: '\u{26F5}', color: '#7a6a4f', workers: 4, industry: true, needsRoad: true,
    procIn: 'bitumen', procRate: 8.49, procOut: 'passage', procRatio: 0.5,
    desc: 'Ship-sheds on the strand: 8.49 resin into 4.245 CROSSINGS a minute. A crossing is what a ' +
      'settler arrives on, and it is spent the moment they step off — this city does not breed its ' +
      'citizens, it is sent them. Bank crossings BEFORE you build the houses that will need them. ' +
      '+25% both ways beside a Hyle.',
  },
  naustathmos: {
    name: 'The Naustathmos', tier: 'craft', era: 12, w: 2, h: 2, cost: 6420, upkeep: 6.10,
    icon: '\u{26F5}', color: '#8a7a5c', workers: 5, industry: true, needsRoad: true, noBuild: true,
    procIn: 'bitumen', procRate: 11.89, procOut: 'passage', procRatio: 0.5,
    desc: 'A standing naval station — slipways, a mole and a wintering basin — turning 11.89 resin ' +
      'into 5.945 crossings a minute. The kings kept their fleets in one of these and their colonies ' +
      'alive with it.',
  },

  pissopolion: {
    name: 'The Pissopolion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 980, upkeep: 1.44,
    icon: '\u{1FAA3}', color: '#6b5a3e', workers: 3, needsRoad: true,
    sells: 'bitumen', sellRate: 3.04, sellPrice: 4.58, custRadius: 10, custMin: 10,
    desc: 'The pitch stall: 3.04 resin/min at $4.58, to anyone with a hull to caulk. THE YARD DRAWS ' +
      'FIRST and this sells what is left — so a city that runs three slopes to two ship-sheds is ' +
      'paid for the difference. Sell too much and you are selling your own growth.',
  },

  kleros: {
    name: 'The Kleros', tier: 'food', era: 12, w: 2, h: 2, cost: 760, upkeep: 1.31,
    icon: '\u{1F33E}', color: '#c8a94f', workers: 2,
    out: { grain: 5.92 },
    desc: 'The allotment: 5.92 sitos/min, and it needs NO water, NO road and nothing from anybody. ' +
      'THREE KLEROI FEED ONE HYDROMYLOS EXACTLY. A kleros is not land you took — it is land a king ' +
      'you will never meet wrote your name against, which is what everyone here has in common.',
  },

  hydromylos: {
    name: 'The Hydromylos', tier: 'food', era: 12, w: 2, h: 2, cost: 1910, upkeep: 2.18,
    icon: '\u{2699}\u{FE0F}', color: '#a8b0a4', workers: 4, needsWater: true, industry: true,
    grainMill: true,
    procIn: 'grain', procRate: 17.77, procOut: 'flour', procRatio: 0.6,
    desc: 'A wheel in the race and a train of gears: 17.77 sitos/min into 10.66 aleuron — the bread ' +
      'of about 178 people. NOTHING WALKS IN A CIRCLE TO TURN IT, which is new. +25% both ways ' +
      'beside a Kleros.',
  },

  artopolion: {
    name: 'The Artopolion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 1910, upkeep: 2.61,
    icon: '\u{1F956}', color: '#cfa963', workers: 4, needsWater: true, needsRoad: true,
    sells: 'flour', sellRate: 3.56, sellPrice: 7.63, custRadius: 10, custMin: 12,
    desc: 'The bread market: 3.56 aleuron/min at $7.63. It wants twelve residents within ten tiles — ' +
      'and in this age residents are a SUPPLY, not a certainty, so a shop built ahead of your ' +
      'crossings stands there counting to eleven.',
  },

  paradeisos: {
    name: 'The Paradeisos', tier: 'food', era: 12, w: 2, h: 2, cost: 760, upkeep: 1.31,
    icon: '\u{1F966}', color: '#83a84f', workers: 2, dryLand: true,
    out: { forage: 5.62 },
    desc: 'A walled garden on the dry side of the city: 5.62/min, eaten at 80% of bread’s worth. NO ' +
      'water, NO road, NOTHING from anywhere. The Great King’s parks became somebody’s vegetables, ' +
      'and this is the plot that cannot be shut off.',
  },

  lachanopolion: {
    name: 'The Lachanopolion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 1050, upkeep: 1.44,
    icon: '\u{1F9FA}', color: '#9fb45f', workers: 3, needsRoad: true,
    sells: 'forage', sellRate: 3.56, sellPrice: 4.20, custRadius: 10, custMin: 10,
    desc: 'The greengrocers’ row: 3.56 greens/min at $4.20. Half the price of bread and none of the ' +
      'chain — no allotment to plough, no mill, no water. It is the first shop a new quarter gets ' +
      'and the last one to close.',
  },

  mareotis: {
    name: 'The Mareotis', tier: 'food', era: 12, w: 1, h: 3, cost: 1230, upkeep: 1.31,
    icon: '\u{1F41F}', color: '#4f93a4', workers: 2, onWater: true,
    out: { fish: 7.02 },
    desc: 'Stake nets in the shallow water behind the city: 7.02 fish/min, eaten at 75% of bread’s ' +
      'worth. Every tile of it stands IN the water, so the harbour decides how many you get — which ' +
      'is why the PARADEISOS and not this is the leg that cannot fail.',
  },

  natronflats: {
    name: 'The Natron Flats', tier: 'food', era: 12, w: 2, h: 4, cost: 1840, upkeep: 2.07,
    icon: '\u{1F9C2}', color: '#e6e2d0', workers: 4, onSalt: true, industry: true,
    out: { natron: 9.10 },
    desc: 'Soda crust lifted off a dry lake bed: 9.10 natron/min. It is not salt and you cannot eat ' +
      'it — it is the flux that lets sand melt, and the kings held every pan of it. ONE FLAT KEEPS ' +
      'ONE AND A HALF GLASSHOUSES.',
  },

  hyalourgeion: {
    name: 'The Hyalourgeion', tier: 'craft', era: 12, w: 2, h: 2, cost: 1990, upkeep: 2.44,
    icon: '\u{1F52E}', color: '#7fa8a0', workers: 4, needsWater: true, industry: true,
    procIn: 'natron', procRate: 6.08, procOut: 'glass', procRatio: 0.5,
    desc: 'A tank furnace, a marver and a mould: 6.08 natron/min into 3.04 hyalos. THE SAND COSTS ' +
      'NOTHING AND THE SODA COSTS EVERYTHING. +25% both ways beside a Natron Flat.',
  },

  hyalopolion: {
    name: 'The Hyalopolion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 1830, upkeep: 2.61,
    icon: '\u{1F376}', color: '#8fbcb4', workers: 3, needsRoad: true,
    sells: 'glass', sellRate: 1.52, sellPrice: 32.88, custRadius: 10, custMin: 13,
    desc: 'Cast bowls, mosaic canes and gold-band alabastra, sold by the crate at $32.88. No water — ' +
      'glass leaves by cart and by ship, and half of what Alexandria made was on somebody else’s ' +
      'table within a year.',
  },

  aipolion: {
    name: 'The Aipolion', tier: 'food', era: 12, w: 3, h: 3, cost: 1500, upkeep: 1.95,
    icon: '\u{1F410}', color: '#b0a68c', workers: 3, dryLand: true,
    out: { hide: 4.56 },
    desc: 'The goat range above the city: 4.56 skins/min off ground too thin for anything else, +50% ' +
      'on ground already worked out. No water, no road, no harbour. THE RICHEST CHAIN IN THE AGE ' +
      'STARTS ON THE WORST LAND IN IT.',
  },

  diphtheron: {
    name: 'The Diphtheron', tier: 'craft', era: 12, w: 2, h: 2, cost: 2300, upkeep: 2.61,
    icon: '\u{1F4DC}', color: '#d8cdb0', workers: 4, needsWater: true, industry: true,
    procIn: 'hide', procRate: 4.86, procOut: 'pergamena', procRatio: 0.5,
    desc: 'Lime pits, a stretching frame and a half-moon knife: 4.86 skins/min into 2.43 pergamene ' +
      'sheets. It wants water constantly and it smells like it. +25% both ways beside an Aipolion.',
  },

  chartopoleion: {
    name: 'The Chartopoleion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 2450, upkeep: 3.04,
    icon: '\u{1F4D6}', color: '#c9b894', workers: 3, needsWater: true, needsRoad: true,
    sells: 'pergamena', sellRate: 1.22, sellPrice: 53.61, custRadius: 10, custMin: 18,
    desc: 'The booksellers’ street: 1.22 sheets/min at $53.61, the richest trade on the board. It ' +
      'wants EIGHTEEN residents in reach — the one shop in the age that a city short of crossings ' +
      'simply cannot switch on.',
  },

  latomia: {
    name: 'The Latomia', tier: 'food', era: 12, w: 3, h: 3, cost: 3430, upkeep: 3.04,
    icon: '\u{26CF}\u{FE0F}', color: '#8c8478', workers: 5, onRock: true, industry: true,
    out: { stone: 7.60 },
    desc: 'A stepped quarry worked in benches: 7.60 stone/min, scaled by how much rock is under it. ' +
      'Every rock tile holds 900 and there is NO recovery. The gate wants 10,214 and the PHAROS ' +
      'WANTS NINE TIMES THAT — about twenty quarries of ridge across the age, gone for good.',
  },

  lithoxoeion: {
    name: 'The Lithoxoeion', tier: 'craft', era: 12, w: 2, h: 2, cost: 4080, upkeep: 3.64,
    icon: '\u{1F3DB}\u{FE0F}', color: '#98928a', workers: 5, industry: true,
    procIn: 'stone', procRate: 8.49, procOut: 'epistyle', procRatio: 0.5,
    desc: 'Anathyrosis: the joint face dressed dead flat and the middle left rough, so a drum sits on ' +
      'a drum without mortar. 8.49 stone/min into 4.245 finished courses. The Pharos eats 3.00 of ' +
      'that a minute and the Dromos wants 1.22 — ONE YARD DOES NOT COVER BOTH.',
  },

  dromos: {
    name: 'The Dromos', tier: 'commerce', era: 12, w: 2, h: 2, cost: 2220, upkeep: 2.61,
    icon: '\u{1F6E4}\u{FE0F}', color: '#a8a29a', workers: 3, needsRoad: true,
    sells: 'epistyle', sellRate: 1.22, sellPrice: 37.16, custRadius: 10, custMin: 13,
    desc: 'Column drums, architrave blocks and steps, sold by the course at $37.16 to everyone laying ' +
      'out a quarter along the great street. It competes with your own lighthouse for every stone ' +
      'the yard dresses.',
  },

  katoikia: {
    name: 'The Katoikia', tier: 'housing', era: 12, w: 1, h: 1, cost: 920, upkeep: 0.43,
    icon: '\u{1F3E0}', color: '#d4c19c', cap: 9, needsWater: true, needsRoad: true,
    desc: 'A settler’s allotment house: mudbrick on a stone footing, a yard, a vine. Holds 9 — one ' +
      'more than the age below it on the same single tile. AN EMPTY ONE IS NOT A BUG: it is waiting ' +
      'for a crossing, and the red ! says so.',
  },

  amphodon: {
    name: 'The Amphodon', tier: 'housing', era: 12, w: 2, h: 2, cost: 3160, upkeep: 1.44,
    icon: '\u{1F3D8}\u{FE0F}', color: '#cdb894', cap: 38, needsWater: true, needsRoad: true,
    levels: ['Insula Blocks', 'The Amphodon', 'Colonnaded Amphodon', 'Double-Court Amphodon',
             'Lettered Quarter', 'The Alpha Quarter'],
    desc: 'A whole lettered block on the grid, four ranges round two courts. Holds 19 when it goes ' +
      'up, rising to 133 — the densest housing on the ladder. EVERY BED IN IT IS A CROSSING YOU ' +
      'HAVE TO HAVE ALREADY BOUGHT.',
  },

  hydreion: {
    name: 'The Hydreion', tier: 'infra', era: 12, w: 1, h: 1, cost: 460, upkeep: 0.88,
    icon: '\u{26F2}', color: '#77b4c8', nearWater: 2, waterRadius: 11,
    desc: 'A draw-basin fed off the channel: waters 11 tiles for a third of a Dexamene. This is the ' +
      'cheap water, not the clever one, and it has to touch the bank.',
  },

  dexamene: {
    name: 'The Dexamene', tier: 'infra', era: 12, w: 1, h: 1, cost: 1530, upkeep: 1.39,
    icon: '\u{1F4A7}', color: '#6aa0c4', waterRadius: 16,
    desc: 'A plastered underground cistern with a settling chamber: waters 16 tiles and needs no ' +
      'water anywhere near it. Rain and hand-carried, the way a city on a limestone shelf actually ' +
      'drank. Not an aqueduct — that is somebody else’s age.',
  },

  thesauros: {
    name: 'The Thesauros', tier: 'infra', era: 12, w: 1, h: 1, cost: 620, upkeep: 0.34,
    icon: '\u{1F3FA}', color: '#b8895c', storeGrain: 149, storeFlour: 89,
    desc: 'A sunk stone chamber with a sealed mouth. +1,490 sitos and +890 aleuron, NO workers and ' +
      'no road — the buffer that carries a city from one harvest to the next. Buy it before you ' +
      'need it.',
  },

  apotheke: {
    name: 'The Apotheke', tier: 'infra', era: 12, w: 3, h: 2, cost: 1530, upkeep: 1.73,
    icon: '\u{1F3EC}', color: '#c4ab84', workers: 3, needsRoad: true, nearWater: 1,
    depot: true, storeCraft: 61,
    desc: 'The harbour warehouse: +610 capacity for every traded good while staffed — resin, natron, ' +
      'glass, skins, parchment, stone AND CROSSINGS — and a SUPPLY POINT, so the far side of the ' +
      'gulf stops paying the carting premium. THIS IS WHERE YOU BANK BERTHS.',
  },

  katagogion: {
    name: 'The Katagogion', tier: 'infra', era: 12, w: 2, h: 2, cost: 1010, upkeep: 0.86,
    icon: '\u{1F6CF}\u{FE0F}', color: '#a89070', workers: 2, needsRoad: true, depot: true, storeGrain: 75,
    desc: 'Beds, a yard and a grain shed for people who have just got off a ship. A SUPPLY POINT with ' +
      '+750 sitos, put where the carts already stop — the cheapest way to push the free haul out ' +
      'past the edge of the built city.',
  },

  plateia: {
    name: 'The Plateia', tier: 'civic', era: 12, w: 2, h: 2, cost: 620, upkeep: 0.43,
    icon: '\u{1F3DB}', color: '#cabf9c', capRadius: 22,
    desc: 'The thirty-metre avenue the surveyors pegged out before anything was built on it. +1 ' +
      'housing capacity for every home within 22 tiles. IT MAKES ROOM, NOT PEOPLE — the crossings ' +
      'are still yours to build.',
  },

  kopron: {
    name: 'The Kopron', tier: 'infra', era: 12, w: 2, h: 1, cost: 680, upkeep: 0.71,
    icon: '\u{1F4A9}', color: '#8a7550', workers: 0,
    soilRadius: 9,
    desc: 'The dung court, carted out to the allotments on a rota the estate manager wrote down. ' +
      'Ground within 9 tiles recovers 3x faster. Zenon’s archive is mostly letters about this.',
  },

  bibliotheke: {
    name: 'The Bibliotheke', tier: 'civic', era: 12, w: 3, h: 2, cost: 3100, upkeep: 3.14,
    icon: '\u{1F4DA}', color: '#b0a082', workers: 4, needsRoad: true,
    scribeRadius: 24,
    desc: 'Shelved halls, a catalogue and a standing order to copy every book off every ship that ' +
      'puts in. Records within 24 tiles are kept properly. It buys nothing and grows nothing — it is ' +
      'the reason anyone remembers this age at all.',
  },

  trapeza: {
    name: 'The Trapeza', tier: 'civic', era: 12, w: 2, h: 2, cost: 2760, upkeep: 2.78,
    icon: '\u{1FA99}', color: '#c8ac66', workers: 3, needsRoad: true,
    dues: 0.348,
    desc: 'The royal bank: a table, a strongroom and a monopoly on changing money. Collects from ' +
      'every resident within 20 tiles — about $41/min at a hundred and twenty of them. IT TAXES THE ' +
      'PEOPLE YOU HAVE, which is why the crossings pay for themselves twice.',
  },

  gymnasion: {
    name: 'The Gymnasion', tier: 'civic', era: 12, w: 2, h: 2, cost: 680, upkeep: 0.71,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c3bda4', amenityRadius: 12,
    desc: 'A running track, a wrestling ground, oil, shade and a teacher. Homes within 12 tiles are ' +
      'worth more. In a city this far from home it is not a luxury — it is the thing that tells you ' +
      'the city is Greek.',
  },

  agoranomion: {
    name: 'The Agoranomion', tier: 'civic', era: 12, w: 2, h: 3, cost: 3830, upkeep: 3.92,
    icon: '\u{2696}\u{FE0F}', color: '#b09c6e', workers: 5, needsRoad: true, needsWater: true,
    weighRadius: 14,
    desc: 'The market inspectors’ office, with the official measures cut into a stone table outside ' +
      'it. Trade within 14 tiles is measured honestly and priced accordingly. Half the surviving ' +
      'Hellenistic decrees are about who gets to hold this job.',
  },

  heptastadion: {
    name: 'The Heptastadion', tier: 'infra', era: 12, w: 1, h: 1, cost: 920, upkeep: 0.43,
    icon: '\u{1F309}', color: '#9a927e', onWater: true, bridge: true,
    desc: 'Rubble and dressed facing, tipped into the water and walked on. Carries the road across ' +
      'the harbour — lay a line of them and the far shore joins the city. The real one was seven ' +
      'stades long and made Alexandria two harbours instead of one.',
  },

  heroon: {
    name: 'The Heroon', tier: 'beauty', era: 12, w: 1, h: 1, cost: 190, upkeep: 0,
    icon: '\u{1F5FF}', color: '#c0b498', cosmetic: true,
    desc: 'The founder’s tomb at the crossing of the two great streets, with his cult and his name ' +
      'day. No output and no upkeep. Every city in this age was somebody’s idea, and this is where ' +
      'they put him afterwards.',
  },

  dorea: {
    name: 'The Dorea', tier: 'food', era: 12, w: 2, h: 2, cost: 1870, upkeep: 2.62,
    icon: '\u{1F33E}', color: '#d0b055', workers: 3, noBuild: true,
    out: { grain: 11.84 },
    desc: 'The allotment absorbed into a royal grant and worked by a manager who writes everything ' +
      'down: 11.84 sitos/min off the same two tiles for one more pair of hands. Zenon ran one of ' +
      'these for Apollonios and we still have his post.',
  },
  aletrion: {
    name: 'The Aletrion', tier: 'food', era: 12, w: 2, h: 2, cost: 3150, upkeep: 3.05,
    icon: '\u{2699}\u{FE0F}', color: '#b8bdb0', workers: 5, needsWater: true, industry: true,
    grainMill: true, noBuild: true,
    procIn: 'grain', procRate: 24.88, procOut: 'flour', procRatio: 0.6,
    desc: 'Two wheels on one race with a common gear train and a bolting floor above: 24.88 sitos/min ' +
      'into 14.93 aleuron. The water never stops, so neither does this.',
  },
  thermopolion: {
    name: 'The Thermopolion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 3820, upkeep: 3.91,
    icon: '\u{1F372}', color: '#d8b06b', workers: 5, needsWater: true, needsRoad: true,
    noBuild: true,
    sells: 'flour', sellRate: 7.12, sellPrice: 7.63, custRadius: 10, custMin: 12,
    desc: 'The counter with the sunk jars and a fire under them, selling it hot and cooked: 7.12 ' +
      'aleuron/min at $7.63. Twice the trade off the same twelve neighbours.',
  },
  opora: {
    name: 'The Opora', tier: 'food', era: 12, w: 2, h: 2, cost: 1870, upkeep: 2.62,
    icon: '\u{1F966}', color: '#8fb455', workers: 3, dryLand: true, noBuild: true,
    out: { forage: 11.24 },
    desc: 'The garden replanted for the whole year — greens under the fruit, and something coming ' +
      'off it in every month: 11.24/min. Still no water, still no road, still nothing from anybody.',
  },
  pantopolion: {
    name: 'The Pantopolion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 2100, upkeep: 2.16,
    icon: '\u{1F9FA}', color: '#adc06a', workers: 4, needsRoad: true, noBuild: true,
    sells: 'forage', sellRate: 7.12, sellPrice: 4.20, custRadius: 10, custMin: 10,
    desc: 'The stall that gave up specialising: 7.12 greens/min at $4.20, plus everything else ' +
      'nobody else could be bothered to carry. Ten neighbours is still all it asks.',
  },
  sagenai: {
    name: 'The Sagenai', tier: 'food', era: 12, w: 1, h: 3, cost: 3020, upkeep: 2.62,
    icon: '\u{1F41F}', color: '#5aa3b4', workers: 3, onWater: true, noBuild: true,
    out: { fish: 14.04 },
    desc: 'Two long seines worked from the shore on a rota, so the water is never rested and never ' +
      'emptied: 14.04 fish/min. It still stands in the water and the water still decides.',
  },
  nitrai: {
    name: 'The Nitrai', tier: 'food', era: 12, w: 2, h: 4, cost: 4500, upkeep: 4.14,
    icon: '\u{1F9C2}', color: '#f0ecdc', workers: 5, onSalt: true, industry: true, noBuild: true,
    out: { natron: 18.20 },
    desc: 'The pans cut into steps and drained in sequence, so the crust comes off clean and the bed ' +
      'refills behind it: 18.20 natron/min. The whole lake, held as one lease.',
  },
  physeterion: {
    name: 'The Physeterion', tier: 'craft', era: 12, w: 2, h: 2, cost: 3280, upkeep: 3.41,
    icon: '\u{1F52E}', color: '#8fbcb2', workers: 5, needsWater: true, industry: true,
    noBuild: true,
    procIn: 'natron', procRate: 8.51, procOut: 'glass', procRatio: 0.5,
    desc: 'An iron pipe, a gather of metal and a lungful of air: 8.51 natron/min into 4.26 hyalos. ' +
      'Blowing a vessel takes a minute where casting one took a week, and the whole trade changed.',
  },
  skeuotheke: {
    name: 'The Skeuotheke', tier: 'commerce', era: 12, w: 2, h: 2, cost: 3660, upkeep: 3.91,
    icon: '\u{1F376}', color: '#a0cbc2', workers: 4, needsRoad: true, noBuild: true,
    sells: 'glass', sellRate: 3.04, sellPrice: 32.88, custRadius: 10, custMin: 13,
    desc: 'A bonded store with the crates racked by pattern and a clerk who knows what is in each ' +
      'one: 3.04 hyalos/min at $32.88. Twice the trade and not one drachma more a piece.',
  },
  epinomia: {
    name: 'The Epinomia', tier: 'food', era: 12, w: 3, h: 3, cost: 3000, upkeep: 3.90,
    icon: '\u{1F410}', color: '#bcb296', workers: 4, dryLand: true, noBuild: true,
    out: { hide: 9.12 },
    desc: 'A grant of pasture rights over the whole hill, in writing, with the summer range attached: ' +
      '9.12 skins/min. The paper is the improvement — the goats were always going to go up there.',
  },
  xysterion: {
    name: 'The Xysterion', tier: 'craft', era: 12, w: 2, h: 2, cost: 3790, upkeep: 3.65,
    icon: '\u{1F4DC}', color: '#e2d9be', workers: 5, needsWater: true, industry: true,
    noBuild: true,
    procIn: 'hide', procRate: 6.80, procOut: 'pergamena', procRatio: 0.5,
    desc: 'Pumice, chalk and a curved scraper taken to both sides until the sheet is the same colour ' +
      'through: 6.80 skins/min into 3.40 sheets. A page you can write on twice.',
  },
  kalligrapheion: {
    name: 'The Kalligrapheion', tier: 'commerce', era: 12, w: 2, h: 2, cost: 4900, upkeep: 4.56,
    icon: '\u{1F4D6}', color: '#d6c5a2', workers: 4, needsWater: true, needsRoad: true,
    noBuild: true,
    sells: 'pergamena', sellRate: 2.44, sellPrice: 53.61, custRadius: 10, custMin: 18,
    desc: 'A room of copyists working from one reader, so twenty books leave where one did: 2.44 ' +
      'sheets/min at $53.61. It still needs eighteen people in reach to have anyone to sell to.',
  },
  metallon: {
    name: 'The Metallon', tier: 'food', era: 12, w: 3, h: 3, cost: 8410, upkeep: 6.08,
    icon: '\u{26CF}\u{FE0F}', color: '#7c766c', workers: 6, onRock: true, industry: true,
    noBuild: true,
    out: { stone: 15.20 },
    desc: 'The quarry opened out with ramps, a crane and a gang on each bench: 15.20 stone/min. It ' +
      'eats the rock twice as fast as the cut below it AND THE ROCK DOES NOT COME BACK.',
  },
  glypheion: {
    name: 'The Glypheion', tier: 'craft', era: 12, w: 2, h: 2, cost: 6730, upkeep: 5.09,
    icon: '\u{1F3DB}\u{FE0F}', color: '#aaa49c', workers: 6, industry: true, noBuild: true,
    procIn: 'stone', procRate: 11.89, procOut: 'epistyle', procRatio: 0.5,
    desc: 'Templates, a setting-out floor and a master who checks every joint against a drawing: ' +
      '11.89 stone/min into 5.945 courses. ONE OF THESE COVERS THE PHAROS AND THE STREET, which the ' +
      'yard below it does not.',
  },
  tetrapylon: {
    name: 'The Tetrapylon', tier: 'commerce', era: 12, w: 2, h: 2, cost: 4440, upkeep: 3.91,
    icon: '\u{1F6E4}\u{FE0F}', color: '#b8b2aa', workers: 4, needsRoad: true, noBuild: true,
    sells: 'epistyle', sellRate: 2.44, sellPrice: 37.16, custRadius: 10, custMin: 13,
    desc: 'The four-way arch where the two great streets cross, and the place every contract in the ' +
      'city is let: 2.44 courses/min at $37.16. Everyone building anything walks past it.',
  },
  kadoi: {
    name: 'The Kadoi', tier: 'commerce', era: 12, w: 2, h: 2, cost: 1960, upkeep: 2.16,
    icon: '\u{1FAA3}', color: '#7d6a48', workers: 4, needsRoad: true, noBuild: true,
    sells: 'bitumen', sellRate: 6.08, sellPrice: 4.58, custRadius: 10, custMin: 10,
    desc: 'Casks, a gauge and a standing order from every shipwright on the coast: 6.08 resin/min at ' +
      '$4.58. THE YARD STILL DRAWS FIRST — this only ever sells the surplus, and it will sell all ' +
      'of it if you let it.',
  },
  krounion: {
    name: 'The Krounion', tier: 'infra', era: 12, w: 1, h: 1, cost: 970, upkeep: 1.16,
    icon: '\u{26F2}', color: '#8ac4d6', nearWater: 2, waterRadius: 18, noBuild: true,
    desc: 'The basin rebuilt in stone with lion-head spouts and a standing overflow: waters 18 tiles. ' +
      'Still the cheap water and still on the bank — there is simply a great deal more of it.',
  },
  phrear: {
    name: 'The Phrear', tier: 'infra', era: 12, w: 1, h: 1, cost: 3230, upkeep: 1.83,
    icon: '\u{1F4A7}', color: '#5f96bc', waterRadius: 25, noBuild: true,
    desc: 'A shaft sunk to the water table with a stair round it and the cistern vaulted over the ' +
      'top. Waters 25 tiles off rain and groundwater, and it still needs no water near it.',
  },
  stamnoi: {
    name: 'The Stamnoi', tier: 'infra', era: 12, w: 1, h: 1, cost: 1300, upkeep: 0.54,
    icon: '\u{1F3FA}', color: '#c69465', storeGrain: 298, storeFlour: 178, noBuild: true,
    desc: 'The chamber lined, sealed and racked out properly: +2,980 sitos and +1,780 aleuron, and ' +
      'still no workers and no road.',
  },
  tameion: {
    name: 'The Tameion', tier: 'infra', era: 12, w: 3, h: 2, cost: 3220, upkeep: 2.69,
    icon: '\u{1F3EC}', color: '#d0b98e', workers: 4, needsRoad: true, nearWater: 1,
    depot: true, storeCraft: 122, noBuild: true,
    desc: 'The bonded warehouse with a customs office at the gate: +1,220 capacity for every traded ' +
      'good while staffed — INCLUDING CROSSINGS — and a SUPPLY POINT. Twice the bank, on the same ' +
      'six tiles.',
  },
  pandokeion: {
    name: 'The Pandokeion', tier: 'infra', era: 12, w: 2, h: 2, cost: 2120, upkeep: 1.72,
    icon: '\u{1F6CF}\u{FE0F}', color: '#b89c78', workers: 3, needsRoad: true, depot: true,
    storeGrain: 158, noBuild: true,
    desc: 'The inn proper — a courtyard, stabling, a cook and a granary. A SUPPLY POINT with +1,580 ' +
      'sitos. Everyone who arrives in this city sleeps somewhere on their first night.',
  },
  stadion: {
    name: 'The Stadion', tier: 'civic', era: 12, w: 2, h: 2, cost: 1300, upkeep: 0.66,
    icon: '\u{1F3DB}', color: '#d6cca8', capRadius: 32, noBuild: true,
    desc: 'Six hundred feet of track with banked seating cut along one side, and the whole city in ' +
      'it four times a year. +1 housing capacity for every home within 32 tiles.',
  },
  chomation: {
    name: 'The Chomation', tier: 'infra', era: 12, w: 2, h: 1, cost: 1420, upkeep: 1.12,
    icon: '\u{1F4A9}', color: '#7c6748', soilRadius: 17, noBuild: true,
    desc: 'Pits, cover, a rota and a cart on it: ground within 17 tiles recovers 3x faster. The ' +
      'estate letters that survive are half about grain and half about this.',
  },
  serapeion: {
    name: 'The Serapeion', tier: 'civic', era: 12, w: 3, h: 2, cost: 4650, upkeep: 4.11,
    icon: '\u{1F4DA}', color: '#bfae8e', workers: 5, needsRoad: true,
    scribeRadius: 35, noBuild: true,
    desc: 'The daughter library on the hill, in the god’s own precinct, with the overflow of every ' +
      'shelf below it. Records within 35 tiles are kept properly. It outlived the first one by three ' +
      'hundred years.',
  },
  basilikon: {
    name: 'The Basilikon', tier: 'civic', era: 12, w: 2, h: 2, cost: 4140, upkeep: 3.64,
    icon: '\u{1FA99}', color: '#d6bc76', workers: 4, needsRoad: true,
    dues: 0.696, noBuild: true,
    desc: 'The royal account, with the banker made an official and the monopoly written into law. ' +
      'Doubles the take — about $83/min at a hundred and twenty residents. Every drachma in the city ' +
      'is changed here whether you like it or not.',
  },
  ephebeion: {
    name: 'The Ephebeion', tier: 'civic', era: 12, w: 2, h: 2, cost: 1420, upkeep: 1.12,
    icon: '\u{1F3DB}\u{FE0F}', color: '#d0cbb2', amenityRadius: 18, noBuild: true,
    desc: 'The hall where the year’s intake is enrolled, taught, listed on stone and handed a shield. ' +
      'Homes within 18 tiles are worth more, and the list on the wall is who counts.',
  },
  sekoma: {
    name: 'The Sekoma', tier: 'civic', era: 12, w: 2, h: 3, cost: 8050, upkeep: 5.89,
    icon: '\u{2696}\u{FE0F}', color: '#c0ac7e', workers: 6, needsRoad: true, needsWater: true,
    weighRadius: 21, noBuild: true,
    desc: 'The official measures cut into a marble slab in the middle of the market, with the ' +
      'inspectors’ office behind it. Trade within 21 tiles is measured against the stone itself.',
  },
  gephyra: {
    name: 'The Gephyra', tier: 'infra', era: 12, w: 1, h: 1, cost: 1930, upkeep: 0.66,
    icon: '\u{1F309}', color: '#aaa28a', onWater: true, bridge: true, noBuild: true,
    desc: 'The mole faced in dressed stone with arched openings left in it, so the water moves and ' +
      'the harbour does not silt. Carries the road, and carries it through a storm.',
  },

  statioannonae: {
    name: 'The Statio Annonae', tier: 'infra', era: 13, w: 2, h: 2, cost: 2240, upkeep: 2.05,
    icon: '\u{1F33E}', color: '#c9a86a', workers: 3, needsRoad: true, annonaCap: 1.5,
    desc: 'The grain office on the road in: a weigh-floor, a tally-clerk and a bonded shed. Lands ' +
      '1.5 rations a minute at the fair price. It sells nothing and makes nothing — what it earns ' +
      'is the bill that does not arrive.',
  },
  navicularium: {
    name: 'The Navicularium', tier: 'infra', era: 13, w: 3, h: 3, cost: 4780, upkeep: 4.30,
    icon: '\u{1F6E5}\u{FE0F}', color: '#b08f5e', workers: 6, needsRoad: true, nearWater: 3,
    annonaCap: 3.0,
    desc: 'The river landing with its own quay, cranes and bonded vaults: 3.0 rations a minute, two ' +
      'Statios in one footprint, and it must stand within 3 tiles of water. A city that eats what ' +
      'other provinces grow is a city that lives on its wharf.',
  },

  thermae: {
    name: 'Thermae', tier: 'civic', era: 13, w: 4, h: 4, cost: 3510, upkeep: 3.72,
    icon: '\u{1F6C1}', color: '#c9b9a0', workers: 6,
    needsRoad: true, needsWater: true, amenityRadius: 14,
    desc: 'Caldarium, tepidarium, frigidarium and a furnace that never goes out. +1 housing capacity ' +
      'within 14 tiles — the widest amenity on the ladder, and the cheapest way to hold a city ' +
      'together while its bread comes off somebody else\'s ships.',
  },

  atriumlibertatis: {
    name: 'Atrium Libertatis', tier: 'civic', era: 13, w: 4, h: 4, cost: 9880, upkeep: 10.27,
    icon: '\u{1F4DC}', color: '#dcd2b8', workers: 8,
    needsRoad: true, needsWater: true, keepsTally: true, amenityRadius: 12,
    desc: 'The censors\' own archive, where the register of citizens and the public contracts were ' +
      'kept. Keeps the city\'s books: +10% sales at every shop in range, and +1 housing capacity ' +
      'within 12. One covers a quarter; a second adds nothing to a shop already counted.',
  },

  horreum: {
    name: 'Horreum', tier: 'infra', era: 13, w: 3, h: 3, cost: 7200, upkeep: 4.01,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c2a878', workers: 6,
    needsRoad: true, needsWater: true, depot: true,
    storeGrain: 16750, storeFlour: 10000, storeCraft: 700,
    desc: 'The state warehouse: raised floors, buttressed walls and a clerk on the door. +16,750 ' +
      'grain, +10,000 farina and +700 of every craft good, and it counts as a SUPPLY POINT. ' +
      'Without one your mill fills its shelf in two and a half minutes and sells the rest abroad ' +
      'at half price.',
  },

  castellum: {
    name: 'Castellum Aquae', tier: 'infra', era: 13, w: 1, h: 1, cost: 1970, upkeep: 1.82,
    icon: '\u{1F3E7}', color: '#9ec4d2', needsRoad: true, waterRadius: 18,
    desc: 'The distribution tank where the line from the hills ends and the city begins. Waters 18 ' +
      'tiles — the widest coverage on the ladder — and needs a road so the fountaineers can reach ' +
      'the taps.',
  },

  puteus: {
    name: 'Puteus', tier: 'infra', era: 13, w: 1, h: 1, cost: 590, upkeep: 1.15,
    icon: '\u{26F2}', color: '#8fc2cf', waterRadius: 12,
    desc: 'A shaft well with a stone kerb and a bucket on a rope. Waters 12 tiles for $590 and needs ' +
      'no road at all — the cheapest coverage in the age, and what the first squares drink from ' +
      'while you are still finding a spring.',
  },

  centuria: {
    name: 'Centuriated Field', tier: 'food', era: 13, w: 4, h: 4, cost: 3530, upkeep: 6.18,
    icon: '\u{1F33E}', color: '#a8ab45', workers: 3, needsWater: true,
    out: { grain: 26.62 },
    desc: 'One registered square of the survey, ploughed and cropped: 26.62 grain/min — exactly one ' +
      'Pistrinum\'s appetite. Wants FERTILE ground (+50%) but grows on plain grass. It is the whole ' +
      'of what this city can feed itself, and it is not enough.',
  },

  pistrinum: {
    name: 'Pistrinum', tier: 'food', era: 13, w: 2, h: 2, cost: 2960, upkeep: 3.43,
    icon: '\u{1F35E}', color: '#c9b478', workers: 4,
    needsWater: true, industry: true, grainMill: true,
    procIn: 'grain', procRate: 26.62, procOut: 'flour', procRatio: 0.60,
    desc: 'Lava millstones turned by a blindfolded donkey, and the ovens against the back wall: ' +
      '26.62 grain/min into 15.97 farina. +25% both ways with an adjacent square.',
  },

  panificium: {
    name: 'Panificium', tier: 'commerce', era: 13, w: 2, h: 2, cost: 2960, upkeep: 4.10,
    icon: '\u{1F956}', color: '#c98f5f', workers: 4,
    needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 5.324, sellPrice: 8.00, custRadius: 8, custMin: 13,
    desc: 'The bread counter opening onto the street: 5.324 farina/min at $8. Three of these clear ' +
      'one Pistrinum exactly — and then your own bread is all SOLD. What the city eats comes off ' +
      'the ponds, the orchards and the grain ships. That is the age.',
  },

  stercorarium: {
    name: 'Stercorarium', tier: 'food', era: 13, w: 2, h: 2, cost: 1750, upkeep: 1.86,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a7a5c', workers: 1, soilRadius: 9,
    desc: 'The dung yard, carted out to the squares. Ground within 9 tiles recovers from exhaustion ' +
      'x3 faster — which is the only way a centuriated square keeps cropping year after year.',
  },

  lucrinum: {
    name: 'Stagnum Lucrinum', tier: 'food', era: 13, w: 1, h: 3, cost: 1190, upkeep: 1.29,
    icon: '\u{1F41F}', color: '#5f9eb5', workers: 2, onWater: true,
    out: { fish: 6.58 },
    desc: 'The walled lagoon at Baiae, sluiced with the tide and netted daily: 6.58 fish/min, eaten ' +
      'at 75% of bread\'s worth. It stands IN the water and it is the single largest thing this ' +
      'city grows for itself.',
  },

  pomarium: {
    name: 'Pomarium', tier: 'food', era: 13, w: 3, h: 3, cost: 690, upkeep: 1.20,
    icon: '\u{1F333}', color: '#7f9a55', workers: 3, dryLand: true,
    out: { dates: 4.91 },
    desc: 'Figs on the dry ground above the vines, picked and laid out to dry: 4.91/min, eaten like ' +
      'bread. It costs almost nothing to plant and it eats NINE TILES to do it — which is the ' +
      'whole trade this age offers you, stated in one building.',
  },

  olivetum: {
    name: 'Olivetum', tier: 'food', era: 13, w: 3, h: 3, cost: 2900, upkeep: 3.83,
    icon: '\u{1FAD2}', color: '#8a9a62', workers: 4, dryLand: true,
    out: { olives: 7.86 },
    desc: 'Olives on the dry interfluve: 7.86/min, +50% on ground with no fertile silt and no water ' +
      'under it. ★ dryLand accepts ROCK too, so a careless grove will sit on the tuff your quarry ' +
      'and your lead mine both wanted.',
  },

  torcularium: {
    name: 'Torcularium', tier: 'food', era: 13, w: 2, h: 2, cost: 4180, upkeep: 4.82,
    icon: '\u{2699}\u{FE0F}', color: '#a89143', workers: 5,
    needsWater: true, industry: true,
    procIn: 'olives', procRate: 7.86, procOut: 'oil', procRatio: 0.50,
    desc: 'The press room proper — beam, windlass and stone weights over a paved floor with a ' +
      'run-off channel: 7.86 olives/min into 3.93 oil. Two Oleariae clear one exactly.',
  },

  olearia: {
    name: 'Olearia', tier: 'commerce', era: 13, w: 2, h: 2, cost: 4420, upkeep: 5.58,
    icon: '\u{1F6E2}\u{FE0F}', color: '#b5a04a', workers: 4,
    needsRoad: true, needsWater: true,
    sells: 'oil', sellRate: 1.965, sellPrice: 42, custRadius: 8, custMin: 16,
    desc: 'Amphorae racked in sand and sold by the sextarius: 1.965 oil/min at $42. Lamp fuel, ' +
      'cooking fat, soap, and the stuff you scrape off at the baths.',
  },

  argilla: {
    name: 'Argilla', tier: 'food', era: 13, w: 2, h: 2, cost: 1900, upkeep: 2.16,
    icon: '\u{1FAA8}', color: '#a5643c', workers: 3, nearWater: 3,
    out: { clay: 8.38 },
    desc: 'The river bank cut back and worked in courses: 8.38 clay/min, +50% within 3 tiles of ' +
      'water. One bed feeds one kiln exactly — and the flax fields want the same bank.',
  },

  figlina: {
    name: 'Figlina', tier: 'food', era: 13, w: 3, h: 3, cost: 3080, upkeep: 3.84,
    icon: '\u{1F3FA}', color: '#b5713f', workers: 5,
    needsWater: true, industry: true,
    procIn: 'clay', procRate: 8.38, procOut: 'sigillata', procRatio: 0.50,
    desc: 'The muffle kiln that made red gloss possible — the load fired in a sealed chamber so the ' +
      'flame never touches it: 8.38 clay/min into 4.19 samian. Two Officinae sell one kiln.',
  },

  officinasamia: {
    name: 'Officina Samia', tier: 'commerce', era: 13, w: 2, h: 2, cost: 2830, upkeep: 4.10,
    icon: '\u{1F37D}\u{FE0F}', color: '#c05c3a', workers: 4,
    needsRoad: true, needsWater: true,
    sells: 'sigillata', sellRate: 2.095, sellPrice: 37, custRadius: 8, custMin: 15,
    desc: 'Stamped red tableware sold by the crate and shipped to the ends of the empire: 2.095 ' +
      'samian/min at $37. Two of these clear one Figlina.',
  },

  lapicidina: {

    name: 'Lapicidina', tier: 'food', era: 13, w: 3, h: 3, cost: 4940, upkeep: 4.45,
    icon: '\u{26CF}\u{FE0F}', color: '#c9bfa0', workers: 5,
    onRock: true, industry: true,
    out: { stone: 9.76 },
    desc: 'Travertine cut in benches out of the mountain flank: 9.76 stone/min, scaled by how much ' +
      'rock is under it. Every rock tile holds 900 and there is NO recovery — no brush brings it ' +
      'back. Three trades want this ground and TWO of them eat it.',
  },

  marmoraria: {
    name: 'Officina Marmoraria', tier: 'food', era: 13, w: 2, h: 2, cost: 5260, upkeep: 4.77,
    icon: '\u{1FA9A}', color: '#d8d2c4', workers: 5,
    needsWater: true, industry: true,
    procIn: 'stone', procRate: 9.76, procOut: 'marmor', procRatio: 0.50,
    desc: 'A gang saw fed with sand and water — crank, connecting rod, eight blades at once: 9.76 ' +
      'stone/min into 4.88 dressed marble. Your Statuaria sells 0.911 of it and the Colosseum takes ' +
      '3.00 — one saw covers both, with 0.969 to spare. The squeeze is behind it: 9.76 stone/min is ' +
      'exactly one Lapicidina, standing on rock your lead mine also wants.',
  },

  statuaria: {
    name: 'Officina Statuaria', tier: 'commerce', era: 13, w: 2, h: 2, cost: 2860, upkeep: 3.42,
    icon: '\u{1F5FF}', color: '#e2ded2', workers: 4,
    needsRoad: true, needsWater: true,
    sells: 'marmor', sellRate: 0.911, sellPrice: 85, custRadius: 8, custMin: 20,
    desc: 'Portrait busts, veneer, table tops and a copy of a Greek original for anyone who asks: ' +
      '0.911 marmor/min at $85 — the most valuable good in the age. It sells SLOWLY on purpose. ' +
      'The marble it does not sell is the only marble your Colosseum will ever see.',
  },

  pozzolana: {
    name: 'Pozzolana Pit', tier: 'food', era: 13, w: 2, h: 2, cost: 1900, upkeep: 2.16,
    icon: '\u{1F30B}', color: '#8a7a6a', workers: 3, onRock: true,
    out: { pozzolana: 8.38 },
    desc: 'Volcanic ash out of the beds at Puteoli — nearly worthless raw, and the reason Roman ' +
      'concrete sets under sea water. 8.38/min, +50% on rock. It does NOT eat the outcrop; the ' +
      'quarry and the lead mine beside it do.',
  },

  caementicia: {
    name: 'Officina Caementicia', tier: 'food', era: 13, w: 3, h: 3, cost: 3080, upkeep: 3.84,
    icon: '\u{1F9F1}', color: '#a89e8a', workers: 5,
    needsWater: true, industry: true,
    procIn: 'pozzolana', procRate: 8.38, procOut: 'concrete', procRatio: 0.50,
    desc: 'Ash, lime and rubble turned in a pit: 8.38 pozzolana/min into 4.19 concrete. NOTHING ' +
      'BUYS CONCRETE. Its only customer is the Colosseum, which absorbs 4.00/min for the whole ' +
      'build — one of these, running flat out, from foundation to topping out.',
  },

  plumbaria: {
    name: 'Plumbaria', tier: 'food', era: 13, w: 3, h: 3, cost: 4420, upkeep: 3.98,
    icon: '\u{2692}\u{FE0F}', color: '#7c7f86', workers: 5,
    onRock: true, industry: true,
    out: { galena: 8.73 },
    desc: 'Galena — lead ore, bright as a mirror on a fresh break — cut out of the flank in ' +
      'stepped galleries: 8.73/min. It EATS THE OUTCROP, 900 to a tile and gone for good, and it ' +
      'is competing with your travertine for the same rock.',
  },

  ustrina: {
    name: 'Ustrina', tier: 'food', era: 13, w: 2, h: 2, cost: 4710, upkeep: 4.27,
    icon: '\u{1F525}', color: '#8f7a6a', workers: 5,
    needsWater: true, industry: true,
    procIn: 'galena', procRate: 8.73, procOut: 'plumbum', procRatio: 0.35,
    desc: 'The smelting hearth: ore roasted on a bed of charcoal, the metal run off into moulds and ' +
      'the slag thrown out behind. 8.73 galena/min into just 3.056 lead — the poorest yield on the ' +
      'rung, and the reason lead is bulk and not treasure.',
  },

  fistularia: {
    name: 'Fistularia', tier: 'commerce', era: 13, w: 2, h: 2, cost: 3120, upkeep: 3.73,
    icon: '\u{1F6B0}', color: '#9aa3ad', workers: 4,
    needsRoad: true, needsWater: true,
    sells: 'plumbum', sellRate: 1.528, sellPrice: 42, custRadius: 8, custMin: 15,
    desc: 'The pipe works: sheet rolled round a mandrel and seamed, stamped with the maker\'s name ' +
      'and the ward it serves. 1.528 lead/min at $42 — pipe for the city, sheet for the roofs, and ' +
      'sheathing for the hulls that bring the grain.',
  },

  linarius: {
    name: 'Ager Linarius', tier: 'food', era: 13, w: 3, h: 3, cost: 2900, upkeep: 3.83,
    icon: '\u{1F33F}', color: '#8fa88a', workers: 4, nearWater: 3,
    out: { linum: 7.86 },
    desc: 'Flax sown thick for fibre rather than seed, pulled by the root and retted in standing ' +
      'water: 7.86 linum/min, +50% within 3 tiles of water. It wants the same bank your clay beds ' +
      'do, and there is only one river.',
  },

  textrinum: {
    name: 'Textrinum', tier: 'food', era: 13, w: 3, h: 3, cost: 4180, upkeep: 4.82,
    icon: '\u{1F9F5}', color: '#b0a68f', workers: 5,
    needsWater: true, industry: true,
    procIn: 'linum', procRate: 7.86, procOut: 'velum', procRatio: 0.50,
    desc: 'The weaving shed: retted flax scutched, hackled, spun and thrown across a warp-weighted ' +
      'loom twenty feet wide. 7.86 linum/min into 3.93 bolts of sailcloth.',
  },

  armamentarium: {
    name: 'Armamentarium', tier: 'commerce', era: 13, w: 2, h: 2, cost: 4420, upkeep: 5.58,
    icon: '\u{26F5}', color: '#8aa4b5', workers: 4,
    needsRoad: true, needsWater: true,
    sells: 'velum', sellRate: 1.965, sellPrice: 61, custRadius: 8, custMin: 20,
    desc: 'The ship-gear store: sail, rigging, sheets and a sailmaker\'s bench at the back. 1.965 ' +
      'bolts/min at $61, the richest counter in the age. Every grain ship on the Alexandria run ' +
      'was fitted out of a shop like this one.',
  },

  cenaculum: {
    name: 'Cenaculum', tier: 'housing', era: 13, w: 1, h: 1, cost: 1190, upkeep: 0.56,
    icon: '\u{1F3E0}', color: '#c4a98a', cap: 10, needsRoad: true, needsWater: true,
    desc: 'A let room on an upper floor, reached by an outside stair: 10 residents on one tile. ' +
      'What most of Rome actually lived in, and the cheapest bed in the age.',
  },

  insula: {
    name: 'Insula', tier: 'housing', era: 13, w: 2, h: 2, cost: 4080, upkeep: 1.89,
    icon: '\u{1F3E2}', color: '#b58a6a', cap: 42, needsRoad: true, needsWater: true,
    levels: ['Canaba', 'Insula', 'Brick Insula', 'Five-Storey Insula', 'Balconied Insula',
             'Regio Insula'],
    desc: 'Five storeys of let rooms over shops, timber-framed above the second floor and a fire ' +
      'brigade\'s nightmare: 42 residents on four tiles. Every one of them is a mouth the annona ' +
      'has to feed.',
  },

  columna: {
    name: 'Columna', tier: 'beauty', era: 13, w: 1, h: 1, cost: 490, upkeep: 0,
    icon: '\u{1F5FC}', color: '#d8d2c4', cosmetic: true,
    desc: 'A fluted column with somebody\'s name cut into the base. No output and no upkeep: the ' +
      'label on the quarter is the entire point of it.',
  },

  latifundium: {
    name: 'Latifundium', tier: 'food', era: 13, w: 4, h: 4, cost: 8680, upkeep: 12.36,
    icon: '\u{1F33E}', color: '#b8a45c', workers: 4, needsWater: true,
    out: { grain: 53.24 },
    desc: 'Four squares thrown together and worked by a gang under a bailiff: 53.24 grain/min, two ' +
      'mills\' worth off one holding.',
  },
  ficulnea: {
    name: 'Ficulnea', tier: 'food', era: 13, w: 3, h: 3, cost: 1700, upkeep: 2.40,
    icon: '\u{1F333}', color: '#8fa85c', workers: 4, dryLand: true,
    out: { dates: 9.82 },
    desc: 'The grove grafted, pruned and manured instead of merely standing there: 9.82 figs/min ' +
      'off the same nine tiles. Still the cheapest food in the age and still the greediest for ground.',
  },
  ostrearia: {
    name: 'Ostrearia', tier: 'food', era: 13, w: 1, h: 3, cost: 2930, upkeep: 2.58,
    icon: '\u{1F41F}', color: '#4f8ea5', workers: 3, onWater: true,
    out: { fish: 13.16 },
    desc: 'Sergius Orata\'s oyster beds: stakes, tiles and rope hung in the tide so the spat has ' +
      'something to grip. 13.16/min out of the same lagoon.',
  },
  praedium: {
    name: 'Praedium', tier: 'food', era: 13, w: 3, h: 3, cost: 7130, upkeep: 7.66,
    icon: '\u{1FAD2}', color: '#9aa672', workers: 5, dryLand: true,
    out: { olives: 15.72 },
    desc: 'The working estate Cato wrote the manual for — press room, oil store, a bailiff and a ' +
      'rota: 15.72 olives/min.',
  },
  cretaria: {
    name: 'Cretaria', tier: 'food', era: 13, w: 2, h: 2, cost: 4670, upkeep: 4.32,
    icon: '\u{1FAA8}', color: '#b06a3c', workers: 4, nearWater: 3,
    out: { clay: 16.76 },
    desc: 'The clay washed, levigated and settled in stepped tanks so only the finest fraction ' +
      'goes to the kiln: 16.76/min — two kilns\' worth.',
  },
  lautumiae: {
    name: 'Lautumiae', tier: 'food', era: 13, w: 3, h: 3, cost: 12150, upkeep: 8.90,
    icon: '\u{26CF}\u{FE0F}', color: '#c2b894', workers: 6, onRock: true, industry: true,
    out: { stone: 19.52 },
    desc: 'Quarry galleries worked in benches on a state contract: 19.52 stone/min — and it eats ' +
      'the outcrop twice as fast. The travertine still does not come back.',
  },
  harenaria: {
    name: 'Harenaria', tier: 'food', era: 13, w: 2, h: 2, cost: 4670, upkeep: 4.32,
    icon: '\u{1F30B}', color: '#8f7f6a', workers: 4, onRock: true,
    out: { pozzolana: 16.76 },
    desc: 'The ash pits driven in under the hill as galleries rather than scraped off the top: ' +
      '16.76/min. Two Officinae\' worth, and it still does not touch the outcrop ledger.',
  },
  cuniculus: {
    name: 'Cuniculus', tier: 'food', era: 13, w: 3, h: 3, cost: 10870, upkeep: 7.96,
    icon: '\u{2692}\u{FE0F}', color: '#6f737a', workers: 6, onRock: true, industry: true,
    out: { galena: 17.46 },
    desc: 'A driven adit following the vein into the hill, timbered and drained by an Archimedes ' +
      'screw: 17.46 galena/min, and twice the bite out of a ridge that never grows back.',
  },
  agercumanus: {
    name: 'Ager Cumanus', tier: 'food', era: 13, w: 3, h: 3, cost: 7130, upkeep: 7.66,
    icon: '\u{1F33F}', color: '#7f9a7a', workers: 5, nearWater: 3,
    out: { linum: 15.72 },
    desc: 'The Campanian flax the sailmakers asked for by name — sown thicker, retted longer, ' +
      'combed finer: 15.72/min off the same bank.',
  },

  barbegal: {
    name: 'Barbegal Cascade', tier: 'food', era: 13, w: 2, h: 2, cost: 4880, upkeep: 4.80,
    icon: '\u{1F35E}', color: '#d2bf88', workers: 5,
    needsWater: true, industry: true, grainMill: true,
    procIn: 'grain', procRate: 37.27, procOut: 'flour', procRatio: 0.60,
    desc: 'Sixteen wheels in a stepped cascade down one slope, all turning off one channel — the ' +
      'largest mill complex in the ancient world: 37.27 grain/min into 22.36 farina.',
  },
  prelum: {
    name: 'Prelum', tier: 'food', era: 13, w: 2, h: 2, cost: 6900, upkeep: 6.75,
    icon: '\u{2699}\u{FE0F}', color: '#b59a4a', workers: 6, needsWater: true, industry: true,
    procIn: 'olives', procRate: 11.00, procOut: 'oil', procRatio: 0.50,
    desc: 'The screw press behind the beam, so the paste is worked twice and the third pressing is ' +
      'worth having: 11.00 olives/min into 5.50 oil.',
  },
  mufflekiln: {
    name: 'Muffle Kiln', tier: 'food', era: 13, w: 3, h: 3, cost: 5080, upkeep: 5.38,
    icon: '\u{1F3FA}', color: '#c07a44', workers: 6, needsWater: true, industry: true,
    procIn: 'clay', procRate: 11.73, procOut: 'sigillata', procRatio: 0.50,
    desc: 'A double-chambered kiln with a sealed muffle and a controlled draught, so the gloss comes ' +
      'out even across the whole load: 11.73 clay/min into 5.865 samian.',
  },
  serraaquaria: {
    name: 'Serra Aquaria', tier: 'food', era: 13, w: 2, h: 2, cost: 8680, upkeep: 6.68,
    icon: '\u{1FA9A}', color: '#e2ded2', workers: 6, needsWater: true, industry: true,
    procIn: 'stone', procRate: 13.66, procOut: 'marmor', procRatio: 0.50,
    desc: 'The Hierapolis saw: a crank and connecting rod turning rotation into a stroke, eight ' +
      'blades at once. 13.66 stone/min into 6.83 marble — 5.92 of it for the arena.',
  },
  calcaria: {
    name: 'Fornax Calcaria', tier: 'food', era: 13, w: 3, h: 3, cost: 5080, upkeep: 5.38,
    icon: '\u{1F9F1}', color: '#b0a692', workers: 6, needsWater: true, industry: true,
    procIn: 'pozzolana', procRate: 11.73, procOut: 'concrete', procRatio: 0.50,
    desc: 'The lime kiln built against the pit, so the mortar is burnt where the ash is dug: 11.73 ' +
      'pozzolana/min into 5.865 concrete. The arena finishes a third faster.',
  },
  cupella: {
    name: 'Cupella', tier: 'food', era: 13, w: 2, h: 2, cost: 7770, upkeep: 5.98,
    icon: '\u{1F525}', color: '#a08a6a', workers: 6, needsWater: true, industry: true,
    procIn: 'galena', procRate: 12.22, procOut: 'plumbum', procRatio: 0.35,
    desc: 'Cupellation: the lead blown across a bone-ash bed so the silver in it separates and the ' +
      'metal runs clean. 12.22 galena/min into 4.277 lead — the same poor yield, done properly.',
  },
  linteonum: {
    name: 'Linteonum', tier: 'food', era: 13, w: 3, h: 3, cost: 6900, upkeep: 6.75,
    icon: '\u{1F9F5}', color: '#c2b89f', workers: 6, needsWater: true, industry: true,
    procIn: 'linum', procRate: 11.00, procOut: 'velum', procRatio: 0.50,
    desc: 'The linen-weavers\' hall: hackling benches, a spinning floor and four looms wide enough ' +
      'for a mainsail. 11.00 linum/min into 5.50 bolts.',
  },

  porticusminucia: {
    name: 'Porticus Minucia', tier: 'commerce', era: 13, w: 2, h: 2, cost: 5920, upkeep: 6.15,
    icon: '\u{1F956}', color: '#d29a5f', workers: 5, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 10.648, sellPrice: 8.00, custRadius: 8, custMin: 13,
    desc: 'The portico where the grain tesserae were presented and the ration drawn — forty-five ' +
      'doors and a queue at every one. 10.648 farina/min. The bread chain is still thin; it is ' +
      'just thin at twice the volume.',
  },
  testaceus: {
    name: 'Mons Testaceus', tier: 'commerce', era: 13, w: 2, h: 2, cost: 8840, upkeep: 8.37,
    icon: '\u{1F6E2}\u{FE0F}', color: '#c2ac52', workers: 5, needsRoad: true, needsWater: true,
    sells: 'oil', sellRate: 3.930, sellPrice: 42, custRadius: 8, custMin: 16,
    desc: 'The riverside oil store, dolia sunk to the neck in a cool vaulted cellar: 3.930 oil/min. ' +
      'One of these clears a Torcularium on its own.',
  },
  sigillariae: {
    name: 'Sigillariae', tier: 'commerce', era: 13, w: 2, h: 2, cost: 5660, upkeep: 6.15,
    icon: '\u{1F37D}\u{FE0F}', color: '#c9663f', workers: 5, needsRoad: true, needsWater: true,
    sells: 'sigillata', sellRate: 4.190, sellPrice: 37, custRadius: 8, custMin: 15,
    desc: 'The street of stalls that sold Rome its Saturnalia presents, and red gloss ware by the ' +
      'crate the rest of the year: 4.190 samian/min at $37.',
  },
  statiomarmorum: {
    name: 'Statio Marmorum', tier: 'commerce', era: 13, w: 2, h: 2, cost: 5720, upkeep: 5.13,
    icon: '\u{1F5FF}', color: '#eae6dc', workers: 5, needsRoad: true, needsWater: true,
    sells: 'marmor', sellRate: 1.822, sellPrice: 85, custRadius: 8, custMin: 20,
    desc: 'The imperial marble yard on the Tiber, blocks numbered with the quarry marks still on ' +
      'them: 1.822 marmor/min at $85. ★ It sells twice as fast — which is exactly twice as much ' +
      'marble your Colosseum will never see. Read the arena\'s panel before you buy this.',
  },
  statioplumbi: {
    name: 'Statio Plumbi', tier: 'commerce', era: 13, w: 2, h: 2, cost: 6240, upkeep: 5.60,
    icon: '\u{1F6B0}', color: '#8a939d', workers: 5, needsRoad: true, needsWater: true,
    sells: 'plumbum', sellRate: 3.056, sellPrice: 42, custRadius: 8, custMin: 15,
    desc: 'One of the trade offices around the square at Ostia, with the provinces\' marks in mosaic ' +
      'on the floor: 3.056 lead/min. One of these clears an Ustrina exactly.',
  },
  velariorum: {
    name: 'Corpus Velariorum', tier: 'commerce', era: 13, w: 2, h: 2, cost: 8840, upkeep: 8.37,
    icon: '\u{26F5}', color: '#7a97ad', workers: 5, needsRoad: true, needsWater: true,
    sells: 'velum', sellRate: 3.930, sellPrice: 61, custRadius: 8, custMin: 20,
    desc: 'The sailmakers\' guild hall, with a cutting floor long enough to lay out a mainsail and ' +
      'the fleet\'s standing order on the wall: 3.930 bolts/min at $61.',
  },

  natatio: {
    name: 'Natatio', tier: 'civic', era: 13, w: 4, h: 4, cost: 7370, upkeep: 5.58,
    icon: '\u{1F3CA}', color: '#d2c2a8', workers: 7,
    needsRoad: true, needsWater: true, amenityRadius: 20,
    desc: 'The open-air swimming pool added along the whole north front, big enough to lose a ' +
      'crowd in: amenity out to 20 tiles.',
  },
  templumpacis: {
    name: 'Templum Pacis', tier: 'civic', era: 13, w: 4, h: 4, cost: 20750, upkeep: 15.41,
    icon: '\u{1F4DC}', color: '#dcd2b8', workers: 9,
    needsRoad: true, needsWater: true, keepsTally: true, amenityRadius: 17,
    desc: 'Vespasian\'s temple, library and record hall, with the marble plan of the whole city cut ' +
      'into one wall. Still keeps the books; amenity out to 17.',
  },
  piperataria: {
    name: 'Horrea Piperataria', tier: 'infra', era: 13, w: 3, h: 3, cost: 15120, upkeep: 6.02,
    icon: '\u{1F3EC}', color: '#cbb48a', workers: 7,
    needsRoad: true, needsWater: true, depot: true,
    storeGrain: 33500, storeFlour: 20000, storeCraft: 1400,
    desc: 'Domitian\'s bonded warehouse for the eastern trade, vaulted in brick-faced concrete: ' +
      '+33,500 grain, +20,000 farina and +1,400 of every craft good. Still a supply point.',
  },
  septemcellae: {
    name: 'Septem Cellae', tier: 'infra', era: 13, w: 1, h: 1, cost: 4140, upkeep: 2.73,
    icon: '\u{1F3E7}', color: '#b0d2dc', needsRoad: true, waterRadius: 26,
    desc: 'Nine parallel vaulted chambers cut into the hill above the baths, the largest reservoir ' +
      'in the city. Waters 26 tiles.',
  },
  salientes: {
    name: 'Salientes', tier: 'infra', era: 13, w: 1, h: 1, cost: 1240, upkeep: 1.73,
    icon: '\u{26F2}', color: '#a8d2d8', waterRadius: 17,
    desc: 'The aquae salientes — leaping water at a street corner, running day and night with a ' +
      'basin under it. Waters 17 tiles and still needs no road.',
  },
  margarium: {
    name: 'Margarium', tier: 'food', era: 13, w: 2, h: 2, cost: 3680, upkeep: 2.79,
    icon: '\u{26CF}\u{FE0F}', color: '#9a8a68', workers: 2, soilRadius: 17,
    desc: 'Marl pits and a cart rota — the chalky clay Pliny says the Gauls taught Italy to spread: ' +
      'ground within 17 tiles recovers x3.',
  },
  tropaeum: {
    name: 'Tropaeum', tier: 'beauty', era: 13, w: 1, h: 1, cost: 1030, upkeep: 0,
    icon: '\u{1F3C6}', color: '#e2ddd0', cosmetic: true,
    desc: 'A trophy monument: captured arms carved in stone on a stepped drum. No output, no ' +
      'upkeep, no excuses needed.',
  },

  praefectura: {
    name: 'Praefectura Annonae', tier: 'infra', era: 13, w: 2, h: 2, cost: 4700, upkeep: 3.08,
    icon: '\u{1F33E}', color: '#d2b478', workers: 4, needsRoad: true, annonaCap: 2.2,
    desc: 'The grain prefect\'s own office: contracts with the shippers, a fleet register and the ' +
      'power to requisition. Lands 2.2 rations a minute at the fair price. It still sells nothing.',
  },
  traiani: {
    name: 'Portus Traiani', tier: 'infra', era: 13, w: 3, h: 3, cost: 10040, upkeep: 6.45,
    icon: '\u{1F6E5}\u{FE0F}', color: '#a8845e', workers: 7, needsRoad: true, nearWater: 3,
    annonaCap: 4.35,
    desc: 'The hexagonal basin Trajan cut behind the Claudian harbour, ringed with bonded vaults and ' +
      'dug for one purpose: 4.35 rations a minute. This is the building the whole age is about.',
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

  aquavetus: {
    name: 'Aqua Vetus', tier: 'infra', era: 15, w: 2, h: 2, cost: 4910, upkeep: 4.69,
    icon: '\u{1F309}', color: '#9aa8a0', waterRadius: 15, fabricMult: 4,
    desc: 'The arcade your grandfather\'s city paid for, still running. Waters 15 tiles, needs no road and ' +
      'no crew — and masonry keeps FOUR TIMES longer than anything else you own: 1,047 minutes of total ' +
      'neglect. Nothing on this map draws water from the sea. It draws it from here.',
  },

  fontinalis: {
    name: 'Fontinalis', tier: 'infra', era: 15, w: 1, h: 1, cost: 980, upkeep: 1.97,
    icon: '\u{1F573}\u{FE0F}', color: '#7fb4c9', waterRadius: 7,
    desc: 'A shaft, a bucket and a rope. Cheap to sink and the fastest thing in the city to lose — 124 ' +
      'minutes of neglect and it is a hole in the ground. Wells silt; aqueducts endure.',
  },

  mansio: {
    name: 'Mansio', tier: 'infra', era: 15, w: 2, h: 2, cost: 5320, upkeep: 3.06,
    icon: '\u{1F3E4}', color: '#a89878', workers: 3, needsRoad: true, depot: true, storeCraft: 410,
    desc: 'A staging inn on the imperial post: stables, a clerk and a strongroom. A SUPPLY POINT — every ' +
      'building within 48 tiles stops paying the carting premium — and it needs no water, so it is still ' +
      'standing when the arcade is not. In this age one of these is worth ten buildings mothballed.',
  },

  granarium: {
    name: 'Granarium', tier: 'infra', era: 15, w: 1, h: 1, cost: 1330, upkeep: 0.77,
    icon: '\u{1F3FA}', color: '#b08a5a', storeGrain: 2900, storeFlour: 1730,
    desc: 'Great jars sunk to the shoulder in a walled yard: +2,900 grain and +1,730 bread. No crew, no ' +
      'water, no road — and it outlasts almost everything above it because there is nothing to maintain.',
  },

  bubile: {
    name: 'Bubile', tier: 'food', era: 15, w: 2, h: 2, cost: 2910, upkeep: 3.19,
    icon: '\u{1F5D1}\u{FE0F}', color: '#8a7a5c', workers: 1, soilRadius: 9,
    desc: 'The byre and the dung heap at the villa\'s edge. Ground within 9 tiles recovers three times ' +
      'faster. You inherited fields that have been cropped for four hundred years, and this is the only ' +
      'thing on the map that gives any of it back — painting a tile fertile buys the BONUS, never the soil.',
  },

  curator: {
    name: 'Curator Operum', tier: 'civic', era: 15, w: 2, h: 2, cost: 5590, upkeep: 5.28,
    icon: '\u{1F6E0}\u{FE0F}', color: '#b0a184', workers: 5,
    repairRadius: 24, repairPrice: 0.60, fabricProof: true,

    desc: 'The office that exists because the buildings were coming down while the city was still rich. ' +
      'Restores 60 dollars of condition a minute within 24 tiles, for $36 of cash — one dollar buys $1.67 ' +
      'of building, against nothing at all if you let it fall. It holds four more buildings back from the ' +
      'ledger. It needs no water and no road and it cannot itself fall. And it can only spend money you ' +
      'HAVE: in a deficit it does literally nothing. This is the building you buy AFTER you have won, to ' +
      'undo what winning cost.',
  },

  ecclesia: {
    name: 'Ecclesia', tier: 'civic', era: 15, w: 3, h: 3, cost: 14790, upkeep: 9.92,
    icon: '\u{26EA}', color: '#cfc4a8', workers: 8, needsRoad: true,
    fabricShield: 0.5, shieldRadius: 16, amenityRadius: 10, fabricMult: 2,
    desc: 'The bishop maintains what the curia cannot. Everything within 16 tiles decays at HALF rate, and ' +
      'homes within 10 hold one more. It is the best building in the age by a distance, and the shape it ' +
      'produces — a small working core clustered round a church — is exactly what a sixth-century town was.',
  },

  scrinium: {
    name: 'Scrinium', tier: 'civic', era: 15, w: 2, h: 2, cost: 4110, upkeep: 4.41,
    icon: '\u{1F4DC}', color: '#c9bfa4', workers: 3, needsRoad: true,
    keepsTally: true, amenityRadius: 8, fabricMult: 2,
    desc: 'The record office: registers, rescripts and the assessment rolls. +10% sales at every counter ' +
      'within 20 tiles, contentment out to 8 — and it is the room the curial class is ruined in, because ' +
      'the men who sit in it are personally liable for the repairs.',
  },

  castrum: {
    name: 'Castrum', tier: 'military', era: 15, w: 4, h: 4, cost: 19720, upkeep: 21.16,
    icon: '\u{1F6E1}\u{FE0F}', color: '#8f8a7a', workers: 10, needsRoad: true,
    depot: true, feeds: { arma: 1.20 }, fabricMult: 2,
    desc: 'A walled fort on the road with a real garrison in it. Eats 1.20 arms a minute and counts as a ' +
      'SUPPLY POINT while it is fed — a garrisoned road is a cheap road. Stop feeding it and it is ten ' +
      'mouths and $21.16 a minute of nothing, which is the most expensive silence in the age.',
  },

  iugatio: {
    name: 'Iugatio', tier: 'food', era: 15, w: 4, h: 4, cost: 5870, upkeep: 10.61,
    icon: '\u{1F33E}', color: '#b9a962', workers: 3, needsWater: true,
    out: { grain: 41.53 },
    desc: 'One squared field of the old survey, assessed in iuga and worked by tenants who cannot legally ' +
      'leave it. 41.53 grain a minute, +50% on fertile ground, +25% touching a mill — and the soil under ' +
      'it was already half spent when you arrived. It is named for the tax, not for the crop.',
  },

  aquimolae: {
    name: 'Aquimolae', tier: 'food', era: 15, w: 2, h: 2, cost: 4920, upkeep: 5.89,
    icon: '\u{1F35E}', color: '#c9b078', workers: 4, nearWater: 1, industry: true, grainMill: true,
    procIn: 'grain', procRate: 41.53, procOut: 'flour', procRatio: 0.6,
    desc: 'The undershot mills on the channel. Grinds 41.53 grain into 24.92 bread a minute — one Iugatio ' +
      'feeds it exactly. Standing on the water pays +50%, and half the channels on this map silted up ' +
      'before you inherited them.',
  },

  catabolum: {
    name: 'Catabolum', tier: 'commerce', era: 15, w: 3, h: 3, cost: 7380, upkeep: 10.56,
    icon: '\u{1F3EC}', color: '#c9a878', workers: 6, needsRoad: true, needsWater: true,
    depot: true,
    sells: 'flour', sellRate: 12.46, sellPrice: 8.80, custRadius: 8, custMin: 16,
    desc: 'The unloading yard and the bread window in one block, built for a shipment that no longer ' +
      'arrives. 12.46 measures a minute at $8.80, and a SUPPLY POINT — which in this age is the more ' +
      'valuable half. Needs 16 residents somewhere in the city.',
  },

  pascua: {
    name: 'Pascua', tier: 'food', era: 15, w: 3, h: 3, cost: 4820, upkeep: 6.58,
    icon: '\u{1F411}', color: '#c9bda0', workers: 4, dryLand: true,
    out: { wool: 10.38 },
    desc: 'Sheep on the interfluve nobody ploughs any more. 10.38 wool a minute, no water, no soil clock — ' +
      'the land that fell out of cultivation is the land that still earns. Dry ground is +50%, never a wall.',
  },

  gynaeceum: {
    name: 'Gynaeceum', tier: 'food', era: 15, w: 3, h: 3, cost: 6950, upkeep: 8.28,
    icon: '\u{1F9F5}', color: '#a89060', workers: 5, needsWater: true, industry: true,
    procIn: 'wool', procRate: 10.38, procOut: 'cloth', procRatio: 0.5,
    desc: 'An imperial weaving works staffed by people legally bound to it and listed in the Notitia by ' +
      'city. 10.38 wool into 5.19 bolts a minute; one Pascua runs it exactly.',
  },

  vestiarium: {
    name: 'Vestiarium', tier: 'commerce', era: 15, w: 2, h: 2, cost: 7350, upkeep: 9.58,
    icon: '\u{1F9E5}', color: '#b98b6a', workers: 4, needsRoad: true, needsWater: true,
    sells: 'cloth', sellRate: 2.59, sellPrice: 79.32, custRadius: 8, custMin: 25,
    desc: 'The clothing store, still issuing to an army that has not been paid in two years. 2.59 bolts a ' +
      'minute at $79.32 — the richest counter in the age — and it needs 25 residents in the city to trade.',
  },

  ferraria: {
    name: 'Ferraria', tier: 'food', era: 15, w: 2, h: 2, cost: 3160, upkeep: 3.71,
    icon: '\u{26CF}\u{FE0F}', color: '#8a7d72', workers: 3, onRock: true,
    out: { iron: 11.07 },
    desc: 'Ore workings cut into the flank. 11.07 iron a minute, no water and no soil — and the rock is a ' +
      'place to STAND, not a grade: a thin seam pays exactly what a rich one does, +50% either way.',
  },

  fabrica: {
    name: 'Fabrica Armorum', tier: 'food', era: 15, w: 3, h: 3, cost: 7410, upkeep: 8.83,
    icon: '\u{2694}\u{FE0F}', color: '#7f8590', workers: 6, needsWater: true, industry: true,
    procIn: 'iron', procRate: 11.07, procOut: 'arma', procRatio: 0.5,
    desc: 'A state arms factory of the kind the Notitia lists by name and city — shields, mail, spathae. ' +
      '11.07 iron into 5.54 arms a minute. Industry: a poor neighbour for houses, and the only thing that ' +
      'keeps a Castrum fed.',
  },

  praebitorium: {
    name: 'Praebitorium', tier: 'commerce', era: 15, w: 2, h: 2, cost: 4760, upkeep: 5.87,
    icon: '\u{1F5E1}\u{FE0F}', color: '#96938a', workers: 4, needsRoad: true, needsWater: true,
    sells: 'arma', sellRate: 1.20, sellPrice: 110.53, custRadius: 8, custMin: 25,
    desc: 'The issue counter: 1.20 pieces a minute at $110.53, the highest unit price in the age. Every one ' +
      'you sell is one the Wall does not get and one the garrison does not carry — this is the chain where ' +
      'the money and the survival point in opposite directions.',
  },

  ruderatio: {
    name: 'Ruderatio', tier: 'food', era: 15, w: 2, h: 2, cost: 3160, upkeep: 3.71,
    icon: '\u{1F9F1}', color: '#9c9186', workers: 3, onRuin: true, salvaged: true,
    out: { spolia: 11.07 },
    desc: 'A salvage yard standing on something that fell down. 11.07 blocks a minute, +50% on ruin. A ruin ' +
      'holds 30% of what the building cost — and a building you demolish on purpose refunds 50% and sells ' +
      'its parcel for 60% more. Letting one fall is always the worse deal; this is what it pays you when ' +
      'you were too slow. Worked out, it is a yard full of nothing.',
  },

  caminus: {
    name: 'Caminus', tier: 'food', era: 15, w: 3, h: 3, cost: 7410, upkeep: 8.83,
    icon: '\u{1F525}', color: '#c2b8a4', workers: 6, needsWater: true, industry: true,
    procIn: 'spolia', procRate: 11.07, procOut: 'calx', procRatio: 0.5,
    desc: 'A lime kiln. It burns cut marble — statues, inscriptions, cornices — into mortar, at 11.07 ' +
      'blocks a minute for 5.54 of lime. The most historically exact building in the game, and not a ' +
      'pleasant one.',
  },

  structoris: {
    name: 'Officina Structoris', tier: 'commerce', era: 15, w: 2, h: 2, cost: 4710, upkeep: 7.04,
    icon: '\u{1F528}', color: '#b5a891', workers: 4, needsRoad: true, needsWater: true,
    sells: 'calx', sellRate: 2.77, sellPrice: 48.11, custRadius: 8, custMin: 19,
    desc: 'The builders\' yard: 2.77 measures of lime a minute at $48.11. Cheaper than arms and cheaper ' +
      'than cloth — and the only trade in the age whose supply goes UP when everything else goes down.',
  },

  saxifodina: {
    name: 'Saxifodina', tier: 'food', era: 15, w: 3, h: 3, cost: 8220, upkeep: 7.64,
    icon: '\u{1FAA8}', color: '#a8a29a', workers: 5, onRock: true, industry: true,
    out: { stone: 12.89 },
    desc: 'A working face cut into the flank: wedges, a crane and a spoil ramp. 12.89 stone a minute, ' +
      'scaled by how much rock is actually under it and +50% on a full outcrop. Every rock tile holds 900 ' +
      'stone and there is NO recovery — when the face is worked out you move the quarry, not the men. It ' +
      'is also the one building in the age that has nothing to do with the ledger, and the age cannot be ' +
      'left without it.',
  },

  lapidaria: {
    name: 'Officina Lapidaria', tier: 'food', era: 15, w: 3, h: 3, cost: 8630, upkeep: 10.28,
    icon: '\u{1F5FF}', color: '#b4b0a8', workers: 7, needsWater: true, industry: true,
    procIn: 'stone', procRate: 12.89, procOut: 'blocks', procRatio: 0.5,
    desc: 'Saws, sand abrasive and a levelled dressing floor: 12.89 stone into 6.45 dressed blocks a ' +
      'minute. The Wall is built out of this building and out of the Caminus beside it.',
  },

  ripamarmorata: {
    name: 'Ripa Marmorata', tier: 'commerce', era: 15, w: 2, h: 2, cost: 5190, upkeep: 6.40,
    icon: '\u{1F3D7}\u{FE0F}', color: '#c2bdb2', workers: 4, needsRoad: true, needsWater: true,
    sells: 'blocks', sellRate: 2.02, sellPrice: 54.61, custRadius: 8, custMin: 19,
    desc: 'The stone landing on the riverbank, cranes and all: 2.02 dressed blocks a minute at $54.61. The ' +
      'one trade in this age that is still about building something.',
  },

  oleastrum: {
    name: 'Oleastrum', tier: 'food', era: 15, w: 3, h: 3, cost: 2300, upkeep: 0,
    icon: '\u{1FAD2}', color: '#7f8f5c', workers: 3,
    out: { dates: 7.66 }, saltProof: true, fabricProof: true,
    desc: 'Old grafted trees on a terrace nobody built. 7.66 measures a minute — and it needs NO water, NO ' +
      'road, and costs NOTHING to keep. Zero upkeep means zero share of the deficit, so it is the one ' +
      'building in the age the ledger cannot touch, which is exactly why it is the one that feeds you. On ' +
      'ruined ground (soil under 30%) it yields +50%: the olive thrives on what the wheat killed.',
  },

  piscatio: {
    name: 'Piscatio', tier: 'food', era: 15, w: 2, h: 3, cost: 2970, upkeep: 3.32,
    icon: '\u{1F41F}', color: '#6f9fb5', workers: 3, onWater: true,
    out: { fish: 15.40 },
    desc: 'Stone tanks flooded off the channel. 15.40 fish a minute, eaten at 75% of bread\'s worth — and ' +
      'it needs no aqueduct, because it stands IN the water. When the arcade goes this and the grove are ' +
      'what is left.',
  },

  penuaria: {
    name: 'Penuaria', tier: 'commerce', era: 15, w: 2, h: 2, cost: 1860, upkeep: 1.76,
    icon: '\u{1F9FA}', color: '#bd9a70', workers: 2, needsRoad: true,
    sellsRaw: ['dates', 'fish', 'grain', 'wool', 'stone'], sellRate: 8.31,
    custRadius: 8, custMin: 19,
    desc: 'A provision counter that sells whatever you have most of — olives, fish, grain, wool or stone — ' +
      'at 80% of list, 8.31 units a minute. It needs no chain behind it and no water, so it is the last ' +
      'counter still trading in a quarter you have switched off. It will not sell the city\'s dinner.',
  },

  meritorium: {
    name: 'Meritorium', tier: 'housing', era: 15, w: 1, h: 1, cost: 1980, upkeep: 0.96,
    icon: '\u{1F3E2}', color: '#b09a86', cap: 12, needsRoad: true, needsWater: true,
    fabricMult: 0.5,
    levels: ['Squatted Cell', 'Meritorium', 'Let Meritorium', 'Stacked Meritorium',
             'Galleried Meritorium', 'Deacon\'s Meritorium'],
    desc: 'Five storeys of let rooms built by somebody who is dead. Homes 12 for $0.08 a head a minute — ' +
      'and it is timber above the second floor, so it decays TWICE as fast as anything else you own.',
  },

  canaba: {
    name: 'Canabae', tier: 'housing', era: 15, w: 1, h: 1, cost: 340, upkeep: 0.19,
    icon: '\u{1F6D6}', color: '#9c8f78', cap: 5, needsRoad: true, maxLevel: 2, rp: 0.1,
    desc: 'The shanty outside the fort wall. Homes 5 for $0.038 a head a minute — five times cheaper to ' +
      'keep than a Meritorium, and it lasts nearly twice as long because there is nothing in it to ' +
      'maintain. It is also worth a third of the standing. This is what actually happened to Rome, Ostia ' +
      'and Trier, and the game will not pretend otherwise.',
  },

  turris: {
    name: 'Turris', tier: 'housing', era: 15, w: 3, h: 3, cost: 10180, upkeep: 4.87,
    icon: '\u{1F3F0}', color: '#c9a878', cap: 52, needsRoad: true, needsWater: true,
    fabricMult: 3,
    levels: ['Barred Keep', 'Turris', 'Bastioned Turris', 'Fortified Turris',
             'Curial Turris', 'Bishop\'s Turris'],
    desc: 'The house that turned its back on the street: blank wall outside, a courtyard and a stair ' +
      'within. 52 residents for less upkeep than five Meritoria holding 60, and SIX TIMES the life. It is ' +
      'why a solvent Late Roman city is small and tall rather than wide.',
  },

  cippus: {
    name: 'Cippus', tier: 'beauty', era: 15, w: 1, h: 1, cost: 820, upkeep: 0,
    icon: '\u{1F5FF}', color: '#c2b8a0', cosmetic: true, nameable: true,
    desc: 'A boundary stone with somebody\'s name recut over somebody else\'s. No output, no upkeep and — ' +
      'uniquely in this age — nothing to maintain: zero upkeep means zero share of the deficit, so it and ' +
      'the groves are the only things you own that cannot fall down.',
  },

  possessio: {
    name: 'Possessio', tier: 'food', era: 15, w: 4, h: 4, cost: 17610, upkeep: 21.22,
    icon: '\u{1F3DB}\u{FE0F}', color: '#c2b06a', workers: 4, needsWater: true,
    out: { grain: 83.06 },
    desc: 'The estate reassessed and taken into the imperial fisc, with a resident procurator and a ' +
      'threshing floor of its own: 83.06 grain a minute off the same sixteen tiles.',
  },
  compascuum: {
    name: 'Compascuum', tier: 'food', era: 15, w: 3, h: 3, cost: 14460, upkeep: 13.16,
    icon: '\u{1F411}', color: '#d8cdb4', workers: 5, dryLand: true,
    out: { wool: 20.76 },
    desc: 'Common grazing held in undivided shares and worked as one flock: 20.76 wool a minute off the ' +
      'same dry ground, and nobody can enclose it.',
  },
  ferrifodina: {
    name: 'Ferrifodina', tier: 'food', era: 15, w: 2, h: 2, cost: 9480, upkeep: 7.42,
    icon: '\u{26CF}\u{FE0F}', color: '#7a7268', workers: 4, onRock: true,
    out: { iron: 22.14 },
    desc: 'A mining district under a procurator, with adits, drainage wheels and a night shift: 22.14 iron ' +
      'a minute. The rock is still a place to stand and not a grade.',
  },

  demolitio: {
    name: 'Demolitio', tier: 'food', era: 15, w: 2, h: 2, cost: 9480, upkeep: 7.42,
    icon: '\u{1F9F1}', color: '#8f8880', workers: 4, onRuin: true, salvaged: true,
    out: { spolia: 22.14 },
    desc: 'A licensed demolition gang with sorting bays, a crane and a contract: 22.14 blocks a minute out ' +
      'of the same fallen wall. It still runs out — twice as fast.',
  },

  caesura: {
    name: 'Caesura', tier: 'food', era: 15, w: 3, h: 3, cost: 24660, upkeep: 15.28,
    icon: '\u{26F0}\u{FE0F}', color: '#9c9890', workers: 6, onRock: true, industry: true,
    out: { stone: 25.78 },
    desc: 'A worked gallery rather than an open face, with a lewis crane and a spoil tramway: 25.78 stone a ' +
      'minute — and it eats the outcrop twice as fast, so the face is gone in half the time.',
  },

  arbustum: {
    name: 'Arbustum', tier: 'food', era: 15, w: 3, h: 3, cost: 6900, upkeep: 0,
    icon: '\u{1F334}', color: '#8f9f6a', workers: 4,
    out: { dates: 15.32 }, saltProof: true, fabricProof: true,
    desc: 'Grafted, terraced and underplanted between the trees: 15.32 measures a minute. Still costs ' +
      'NOTHING to keep and still cannot be charged — the one food the ledger will never reach, doubled.',
  },
  excipula: {
    name: 'Excipula', tier: 'food', era: 15, w: 2, h: 3, cost: 8910, upkeep: 6.64,
    icon: '\u{1F420}', color: '#5f93a8', workers: 4, onWater: true,
    out: { fish: 30.80 },
    desc: 'Sluiced tanks with a gate on the current and stock kept alive to order: 30.80 fish a minute, ' +
      'and it still needs no aqueduct.',
  },

  catillus: {
    name: 'Catillus', tier: 'food', era: 15, w: 2, h: 2, cost: 9840, upkeep: 8.25,
    icon: '\u{1F30A}', color: '#b9a878', workers: 5, nearWater: 1, industry: true, grainMill: true,
    procIn: 'grain', procRate: 58.14, procOut: 'flour', procRatio: 0.6,
    desc: 'Sixteen wheels in cascade down one race, the way Barbegal ran: 58.14 grain into 34.88 bread a ' +
      'minute.',
  },
  textoria: {
    name: 'Textoria', tier: 'food', era: 15, w: 3, h: 3, cost: 13900, upkeep: 11.59,
    icon: '\u{1F9F5}', color: '#b8a884', workers: 6, needsWater: true, industry: true,
    procIn: 'wool', procRate: 14.53, procOut: 'cloth', procRatio: 0.5,
    desc: 'Warp-weighted looms replaced with the two-beam frame and a fulling floor behind: 14.53 wool ' +
      'into 7.27 bolts a minute.',
  },
  scutaria: {
    name: 'Scutaria', tier: 'food', era: 15, w: 3, h: 3, cost: 14820, upkeep: 12.36,
    icon: '\u{1F6E1}\u{FE0F}', color: '#6f7580', workers: 7, needsWater: true, industry: true,
    procIn: 'iron', procRate: 15.50, procOut: 'arma', procRatio: 0.5,
    desc: 'A shield works with its own water-driven hammers and a hide store: 15.50 iron into 7.75 arms a ' +
      'minute.',
  },
  fornacula: {
    name: 'Fornacula', tier: 'food', era: 15, w: 3, h: 3, cost: 14820, upkeep: 12.36,
    icon: '\u{1F525}', color: '#cfc2a8', workers: 7, needsWater: true, industry: true,
    procIn: 'spolia', procRate: 15.50, procOut: 'calx', procRatio: 0.5,
    desc: 'A permanent draw-kiln burning day and night instead of a clamp fired twice a year: 15.50 blocks ' +
      'into 7.75 of lime.',
  },
  sectilia: {
    name: 'Sectilia', tier: 'food', era: 15, w: 3, h: 3, cost: 17260, upkeep: 14.39,
    icon: '\u{2699}\u{FE0F}', color: '#c2beb4', workers: 8, needsWater: true, industry: true,
    procIn: 'stone', procRate: 18.05, procOut: 'blocks', procRatio: 0.5,
    desc: 'A water-driven gang saw with a crank and connecting rod — the real thing, at Hierapolis, in the ' +
      'third century: 18.05 stone into 9.02 dressed blocks a minute.',
  },

  annonaria: {
    name: 'Annonaria', tier: 'commerce', era: 15, w: 3, h: 3, cost: 18450, upkeep: 15.84,
    icon: '\u{1F35E}', color: '#d8b878', workers: 7, needsRoad: true, needsWater: true,
    depot: true,
    sells: 'flour', sellRate: 24.92, sellPrice: 8.80, custRadius: 8, custMin: 16,
    desc: 'The dole office reopened with a full staff and a second window: 24.92 measures a minute out of ' +
      'the same yard, and still a SUPPLY POINT.',
  },
  emporiumvestium: {
    name: 'Emporium Vestium', tier: 'commerce', era: 15, w: 2, h: 2, cost: 18380, upkeep: 14.37,
    icon: '\u{1F9F5}', color: '#c99a86', workers: 5, needsRoad: true, needsWater: true,
    sells: 'cloth', sellRate: 5.18, sellPrice: 79.32, custRadius: 8, custMin: 25,
    desc: 'Bolts sold by weight against sealed warrants, with a bonded back room: 5.18 a minute, twice the ' +
      'counter it replaces and at the same price.',
  },
  sagittaria: {
    name: 'Sagittaria', tier: 'commerce', era: 15, w: 2, h: 2, cost: 11900, upkeep: 8.81,
    icon: '\u{1F3F9}', color: '#8a8a84', workers: 5, needsRoad: true, needsWater: true,
    sells: 'arma', sellRate: 2.40, sellPrice: 110.53, custRadius: 8, custMin: 25,
    desc: 'The arrow works and its counter, listed in the Notitia beside the shield factories: 2.40 pieces ' +
      'a minute at the same price.',
  },
  redemptorum: {
    name: 'Redemptorum', tier: 'commerce', era: 15, w: 2, h: 2, cost: 11780, upkeep: 10.56,
    icon: '\u{1F528}', color: '#c2b49a', workers: 5, needsRoad: true, needsWater: true,
    sells: 'calx', sellRate: 5.54, sellPrice: 48.11, custRadius: 8, custMin: 19,
    desc: 'The contractors\' station, where the public works are actually let and the lime is weighed out: ' +
      '5.54 measures a minute.',
  },
  navalia: {
    name: 'Navalia', tier: 'commerce', era: 15, w: 2, h: 2, cost: 12980, upkeep: 9.60,
    icon: '\u{1F6A2}', color: '#cfcac0', workers: 5, needsRoad: true, needsWater: true,
    sells: 'blocks', sellRate: 4.04, sellPrice: 54.61, custRadius: 8, custMin: 19,
    desc: 'Covered slips and a crane gantry where the stone comes off the barge under cover: 4.04 dressed ' +
      'blocks a minute.',
  },
  cupedinaria: {
    name: 'Cupedinaria', tier: 'commerce', era: 15, w: 2, h: 2, cost: 4650, upkeep: 2.64,
    icon: '\u{1F9FA}', color: '#cfab86', workers: 3, needsRoad: true,
    sellsRaw: ['dates', 'fish', 'grain', 'wool', 'stone'], sellRate: 16.62,
    custRadius: 8, custMin: 19,
    desc: 'A proper provision market with scales, a licence and a street frontage: 16.62 units a minute at ' +
      '80% of list, and it still needs no chain and no water behind it.',
  },

  rivusherculaneus: {
    name: 'Rivus Herculaneus', tier: 'infra', era: 15, w: 2, h: 2, cost: 12280, upkeep: 7.04,
    icon: '\u{1F309}', color: '#a8b4ab', waterRadius: 22, fabricMult: 4,
    desc: 'The channel relined, the arches underpinned and a second branch opened: 22 tiles, and 1,745 ' +
      'minutes of total neglect before it goes.',
  },
  specus: {
    name: 'Specus', tier: 'infra', era: 15, w: 1, h: 1, cost: 2450, upkeep: 2.96,
    icon: '\u{1F573}\u{FE0F}', color: '#8fc0d2', waterRadius: 10, fabricMult: 2,
    desc: 'The shaft lined, vaulted and given a cut access gallery: 10 tiles instead of 7, and it lasts ' +
      'twice as long.',
  },
  stativa: {
    name: 'Stativa', tier: 'infra', era: 15, w: 2, h: 2, cost: 13300, upkeep: 4.59,
    icon: '\u{1F3E4}', color: '#c2b092', workers: 4, needsRoad: true, depot: true, storeCraft: 595,
    desc: 'A standing post with barracks, a farrier and a strongroom that is actually guarded: +595 craft ' +
      'storage, and still a SUPPLY POINT that needs no water.',
  },
  condita: {
    name: 'Condita', tier: 'infra', era: 15, w: 1, h: 1, cost: 3330, upkeep: 1.16,
    icon: '\u{1F3FA}', color: '#a89272', storeGrain: 4210, storeFlour: 2510,
    desc: 'A bell-mouthed pit cut in dry ground, sealed with chaff and plastered: +4,210 grain and +2,510 ' +
      'bread, no crew, nothing to keep.',
  },
  laetamen: {
    name: 'Laetamen', tier: 'food', era: 15, w: 2, h: 2, cost: 7280, upkeep: 4.79,
    icon: '\u{1F69C}', color: '#948468', workers: 2, soilRadius: 13,
    desc: 'The muck worked properly, with carts, a marl pit and a spreading gang: fields within 13 tiles ' +
      'recover three times faster.',
  },

  collegiumfabrum: {
    name: 'Collegium Fabrum', tier: 'civic', era: 15, w: 2, h: 2, cost: 13980, upkeep: 7.92,
    icon: '\u{1F3D7}\u{FE0F}', color: '#c2b092', workers: 7,
    repairRadius: 35, repairPrice: 0.60, fabricProof: true,
    desc: 'The builders\' guild chartered and quartered at public expense: 84 dollars of condition a minute ' +
      'out to 35 tiles, and four more buildings held back from the ledger. Still needs no water and no ' +
      'road, and still cannot fall.',
  },

  episcopium: {
    name: 'Episcopium', tier: 'civic', era: 15, w: 3, h: 3, cost: 36980, upkeep: 14.88,
    icon: '\u{26EA}', color: '#dad0b4', workers: 10, needsRoad: true,
    fabricShield: 0.35, shieldRadius: 23, amenityRadius: 14, fabricMult: 3,
    desc: 'The bishop\'s whole complex — church, house, alms hall and works yard. Decay inside 23 tiles ' +
      'runs at 35% rather than 50%, and it is the last building in the city anybody will let fall.',
  },
  notitia: {
    name: 'Notitia', tier: 'civic', era: 15, w: 2, h: 2, cost: 10280, upkeep: 6.62,
    icon: '\u{1F4D6}', color: '#d0c6ab', workers: 4, needsRoad: true,
    keepsTally: true, amenityRadius: 12, fabricMult: 3,
    desc: 'The register of every office, unit and factory in the province, kept current and copied fair. ' +
      '+10% sales at every counter within 20 tiles, contentment out to 12.',
  },
  burgus: {
    name: 'Burgus', tier: 'military', era: 15, w: 4, h: 4, cost: 49300, upkeep: 31.74,
    icon: '\u{1F3F0}', color: '#7f7a6c', workers: 14, needsRoad: true,
    depot: true, feeds: { arma: 1.74 }, fabricMult: 3,
    desc: 'Projecting towers, a ditch and a numerus that is actually paid. Eats 1.74 arms a minute and ' +
      'holds the road out to a longer reach — the frontier post that is still there in the seventh century.',
  },
  terminus: {
    name: 'Terminus', tier: 'beauty', era: 15, w: 1, h: 1, cost: 2050, upkeep: 0,
    icon: '\u{1F3DB}\u{FE0F}', color: '#d2c8b0', cosmetic: true, nameable: true,
    desc: 'The boundary stone re-cut, sworn to and set in mortar, with the survey line inscribed on its ' +
      'flank. Still no output, still no upkeep, still cannot fall down.',
  },

  spoilgang: {
    name: 'Spoliation Gang', tier: 'food', era: 17, w: 2, h: 2, cost: 7600, upkeep: 8.94,
    icon: '\u{1F9F1}', color: '#a09585', workers: 4, onRuin: true, salvaged: true,
    out: { stone: 20.00 }, rp: 1.2,
    desc: 'Four men with crowbars and a cart, taking a dead town apart: 20.00 stone a minute, +50% ' +
      'standing on ruin. THE RUBBLE UNDER THEM IS FINITE AND NOTHING PUTS IT BACK. Needs no road, no ' +
      'water and no outcrop — it is the one building in this age you can raise on turn one, anywhere.',
  },
  stonewright: {
    name: 'The Stonewright', tier: 'craft', era: 17, w: 3, h: 3, cost: 20770, upkeep: 24.74,
    icon: '\u{1F528}', color: '#b3a794', workers: 8, industry: true,
    procIn: 'stone', procRate: 20.00, procOut: 'blocks', procRatio: 0.5,
    desc: 'Roman ashlar squared down to something a Saxon mason can lift: 20.00 stone a minute into ' +
      '10.00 blocks. ★ Sized to eat EXACTLY ONE Spoliation Gang — a declared deviation from the +55% ' +
      'curve, because a one-to-one opening is what teaches the chain.',
  },
  stanhithe: {
    name: 'Stone Hithe', tier: 'commerce', era: 17, w: 2, h: 2, cost: 12490, upkeep: 15.41,
    icon: '\u2693', color: '#9fa89b', workers: 6, needsRoad: true,
    sells: 'blocks', sellRate: 4.86, sellPrice: 131.44, custRadius: 8, custMin: 21,
    desc: 'A landing on the river where dressed stone goes downstream to somebody rebuilding: 4.86 ' +
      'blocks a minute at $131.44. Two hithes drink one Stonewright.',
  },

  bogpit: {
    name: 'Bog Ore Pit', tier: 'food', era: 17, w: 2, h: 2, cost: 7600, upkeep: 8.94,
    icon: '\u{1FAA8}', color: '#7a6a4f', workers: 4, onSalt: true,
    out: { bogore: 6.39 },
    desc: 'Iron pans out of standing water and settles as nodules you can lift with a rake: 6.39 bog ' +
      'ore a minute off the peat. ★ THE ONE GROUND IN THIS AGE THAT DOES NOT RUN OUT — slower per ' +
      'unit than the ruins and still there when they are gone.',
  },
  bloomhearth: {
    name: 'The Bloom Hearth', tier: 'craft', era: 17, w: 3, h: 3, cost: 17840, upkeep: 21.26,
    icon: '\u{1F525}', color: '#8a6b52', workers: 7, industry: true,
    procIn: 'bogore', procRate: 6.39, procOut: 'iron', procRatio: 0.4,
    desc: 'A clay shaft, a goatskin bellows and a day of charcoal for a lump the size of a fist: 6.39 ' +
      'ore into 2.56 iron. Nobody here can cast it — it is hammered, and that is why it is worth what ' +
      'it is worth.',
  },
  irenstall: {
    name: 'The Iren Stall', tier: 'commerce', era: 17, w: 2, h: 2, cost: 11460, upkeep: 14.13,
    icon: '\u2692\uFE0F', color: '#6f6a63', workers: 6, needsRoad: true,
    sells: 'iron', sellRate: 2.56, sellPrice: 266.06, custRadius: 8, custMin: 34,
    desc: 'Bar iron sold by weight to anybody with a plough to mend: 2.56 a minute at $266.06. The ' +
      'age has no arms industry and no market for one; what it has is edge tools and horseshoes.',
  },

  calfcroft: {
    name: 'The Calf Croft', tier: 'food', era: 17, w: 2, h: 4, cost: 11800, upkeep: 13.87,
    icon: '\u{1F404}', color: '#a89a7d', workers: 5, needsWater: true, soilRadius: 5,
    out: { pergamena: 6.39 },
    desc: 'The close behind the church: calves, a liming pit and a stretching frame. 6.39 skins a ' +
      'minute, scraped thin enough to write on. One animal, one bifolium, and the abbey needs two ' +
      'hundred for a Bible.',
  },
  copyingroom: {
    name: 'The Copying Room', tier: 'craft', era: 17, w: 3, h: 3, cost: 17840, upkeep: 21.26,
    icon: '\u{1F4DC}', color: '#c8b99a', workers: 7, needsWater: true, industry: true,
    procIn: 'pergamena', procRate: 6.39, procOut: 'codex', procRatio: 0.4,
    desc: 'Cold hands, north light and no talking: 6.39 skins into 2.56 bound codices. Nothing in ' +
      'this room was invented here. Every sentence came from somewhere else and survives only ' +
      'because somebody who did not understand it copied it out anyway.',
  },
  quirestall: {
    name: 'The Quire Stall', tier: 'commerce', era: 17, w: 3, h: 3, cost: 17690, upkeep: 23.05,
    icon: '\u{1F4D6}', color: '#b8a684', workers: 6, needsRoad: true,
    sells: 'codex', sellRate: 2.56, sellPrice: 246.16, custRadius: 9, custMin: 27,
    desc: 'Gatherings sold to other houses, sewn or loose: 2.56 codices a minute at $246.16. The ' +
      'dearest thing this age makes, and the only one that is worth more in four hundred years than ' +
      'it is today.',
  },

  assart: {
    name: 'Assart Field', tier: 'food', era: 17, w: 4, h: 4, cost: 14130, upkeep: 25.53,
    icon: '\u{1F33E}', color: '#b6a75e', workers: 5, needsWater: true,
    out: { grain: 99.96 },
    desc: 'Woodland grubbed out by hand and put under corn: 99.96 a minute. An assart is land taken ' +
      'BACK from the forest — which is also where the forest goes when you finish a ruin.',
  },
  watermill: {
    name: 'The Leat Mill', tier: 'food', era: 17, w: 2, h: 2, cost: 11840, upkeep: 14.18,
    icon: '\u2699\uFE0F', color: '#8f9a7d', workers: 6, nearWater: 2, grainMill: true,
    procIn: 'grain', procRate: 99.96, procOut: 'flour', procRatio: 0.6,
    desc: 'A horizontal wheel in a leat off the stream: 99.96 corn into 59.98 meal. The one machine ' +
      'this age has more of than Rome did — six thousand of them by Domesday, and each one is a ' +
      'village that stopped grinding by hand.',
  },
  chepe: {
    name: 'The Chepe', tier: 'commerce', era: 17, w: 3, h: 3, cost: 17760, upkeep: 25.41,
    icon: '\u{1F35E}', color: '#c9a96a', workers: 9, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 29.99, sellPrice: 21.17, custRadius: 7, custMin: 17,
    desc: 'The market place, which in this age is a wide spot in the road with a cross in it: 29.99 ' +
      'measures of meal a minute at $21.17.',
  },
  brewhouse: {
    name: 'Brewhouse', tier: 'commerce', era: 17, w: 2, h: 3, cost: 21400, upkeep: 26.00,
    icon: '\u{1F37A}', color: '#b98d4e', workers: 9, needsRoad: true, needsWater: true,
    procIn: 'grain', procRate: 66.64, procOut: 'beer', procRatio: 0.17,
    sells: 'beer', sellRate: 11.33, sellPrice: 58.16, custRadius: 8, custMin: 23,
    desc: 'Ale is food here, and it is safer than the stream. 66.64 corn into 11.33 of ale at $58.16. ' +
      '★ THE AGE\'S ONE AXIS CROSSING: it drinks the same corn the Water Mill wants, so bread and ' +
      'beer are the same decision — as they were at Sumer, twelve rungs down.',
  },

  sheeprun: {
    name: 'Sheep Run', tier: 'food', era: 17, w: 3, h: 3, cost: 7600, upkeep: 8.94,
    icon: '\u{1F411}', color: '#c3bda8', workers: 4, dryLand: true,
    out: { wool: 9.59 },
    desc: 'Small horned sheep on the heath, kept for the fleece and not the meat: 9.59 wool a minute. ' +
      'Dry ground only — you do not run sheep on your own corn.',
  },
  fullingshed: {
    name: 'Fulling Shed', tier: 'craft', era: 17, w: 2, h: 2, cost: 12710, upkeep: 16.75,
    icon: '\u{1F9F6}', color: '#9aa08c', workers: 6, needsWater: true, industry: true,
    procIn: 'wool', procRate: 9.59, procOut: 'cloth', procRatio: 0.5,
    desc: 'Woven cloth trodden in stale urine and fuller\'s earth until it felts: 9.59 wool into 4.80 ' +
      'of cloth. It is done by foot in this age and it stinks; site it downwind of nothing, because ' +
      'nobody here has the word for downwind.',
  },
  webbery: {
    name: 'The Webbery', tier: 'commerce', era: 17, w: 2, h: 2, cost: 13570, upkeep: 16.75,
    icon: '\u{1F9F5}', color: '#a8917a', workers: 6, needsRoad: true,
    sells: 'cloth', sellRate: 4.80, sellPrice: 131.44, custRadius: 8, custMin: 27,
    desc: 'Cloth sold by the ell off a trestle: 4.80 a minute at $131.44. Steady, unglamorous, and ' +
      'the only trade in the age that is exactly as good on the last day as on the first.',
  },

  pannage: {
    name: 'Pannage Wood', tier: 'food', era: 17, w: 2, h: 2, cost: 10590, upkeep: 12.00,
    icon: '\u{1F437}', color: '#6f7d4e', workers: 4,
    out: { pork: 14.00 },
    desc: 'Swine turned into the oaks in autumn to fatten on mast: 14.00 of pork a minute. ★ NEEDS ' +
      'NOTHING — no road, no water, no ruin. It is what feeds you when either of the others fails, ' +
      'and the forest it wants is the forest a worked-out ruin becomes.',
  },
  cruive: {
    name: 'The Cruive', tier: 'food', era: 17, w: 1, h: 3, cost: 7150, upkeep: 7.99,
    icon: '\u{1F41F}', color: '#6d8794', workers: 4, onWater: true,
    out: { fish: 37.06 },
    desc: 'A wattle trap set in a gap in a stone weir: 37.06 fish a minute. Owes the ground nothing ' +
      'at all, which in this age is the whole of its argument.',
  },

  wattlehut: {
    name: 'Wattle Hut', tier: 'housing', era: 17, w: 1, h: 1, cost: 2860, upkeep: 1.39,
    icon: '\u{1F6D6}', color: '#a8926f', cap: 13, needsWater: true, needsRoad: true, rp: 0.3,
    desc: 'Hazel rods, daub and thatch, raised in a day: homes 13. ★ A DELIBERATE 0.6x ON THE CURVE ' +
      '— the first building this age asks you to place is worse than the one the last age retired, ' +
      'and it should say so in its price.',
  },
  toft: {
    name: 'The Toft', tier: 'housing', era: 17, w: 1, h: 1, cost: 11930, upkeep: 5.77,
    icon: '\u{1F3E1}', color: '#b8a077', cap: 40, needsWater: true, needsRoad: true, rp: 0.3,
    levels: ['Toft Row', 'The Toft', 'Walled Toft', 'Toft and Garth',
             "Reeve's Toft", "Sokeman's Toft"],
    desc: 'A house and the fenced ground behind it — pigsty, midden, a few apples: homes 40.',
  },
  thegnhall: {
    name: "Thegn's Hall", tier: 'housing', era: 17, w: 2, h: 2, cost: 24500, upkeep: 11.73,
    icon: '\u{1F3DB}\uFE0F', color: '#9c8055', cap: 96, needsWater: true, needsRoad: true, rp: 0.3,
    levels: ['Bower', "Thegn's Hall", 'Aisled Hall', 'Timbered Hall',
             'Painted Hall', 'Burh Hall'],
    desc: 'One long room with a hearth in the middle and a bench down each side, and everybody who ' +
      'matters sleeps in it: homes 96.',
  },

  drawwell: {
    name: 'Draw Well', tier: 'infra', era: 17, w: 1, h: 1, cost: 2360, upkeep: 4.75,
    icon: '\u{1F573}\uFE0F', color: '#8d9aa2', waterRadius: 6,
    desc: 'A shaft, a windlass and a bucket. Waters 6 tiles. It is what is left when nobody can ' +
      'maintain a channel any more.',
  },
  roofedcistern: {
    name: 'Roofed Cistern', tier: 'infra', era: 17, w: 1, h: 1, cost: 5460, upkeep: 8.00,
    icon: '\u{1F6E2}\uFE0F', color: '#7f8d96', waterRadius: 9,
    desc: 'A stone tank under a shingled roof, fed off the church gutters. Waters 9.',
  },
  tappedaqueduct: {
    name: 'Tapped Aqueduct', tier: 'infra', era: 17, w: 1, h: 1, cost: 4750, upkeep: 6.00,
    icon: '\u{1F309}', color: '#94908a', waterRadius: 12, onRuin: true,
    desc: 'Somebody has knocked a hole in a Roman arcade and hung a lead pipe out of it. Waters 12 — ' +
      'the widest reach in the age. ★ IT WANTS RUIN UNDER IT, so raising one FORFEITS that ' +
      'footprint\'s stone forever. The stone in an arcade is worth about ninety seconds of a Webbery; ' +
      'the water is worth the age.',
  },

  cornstead: {
    name: 'The Corn Stead', tier: 'infra', era: 17, w: 1, h: 1, cost: 3390, upkeep: 3.20,
    icon: '\u{1F33F}', color: '#a99a72', storeGrain: 4500, storeFlour: 2800,
    desc: 'A sunken pit lined with straw and capped with turf. Holds 4,500 corn and 2,800 meal.',
  },
  packstation: {
    name: 'Pack Station', tier: 'infra', era: 17, w: 1, h: 1, cost: 8480, upkeep: 5.20,
    icon: '\u{1F40E}', color: '#8b7f6b', workers: 3, depot: true,
    desc: 'Ponies, panniers and a man who knows the fords. Everything within reach of it carts at the ' +
      'near rate instead of the far one.',
  },
  sokebarn: {
    name: 'The Soke Barn', tier: 'infra', era: 17, w: 4, h: 4, cost: 11820, upkeep: 11.29,
    icon: '\u{1F3DA}\uFE0F', color: '#9d8a63', needsRoad: true, depot: true,
    storeGrain: 18620, storeFlour: 11640, storeCraft: 190,
    desc: 'Where the renders of a whole jurisdiction come in and sit. Holds 18,620 corn, 11,640 meal ' +
      'and 190 of craft, and carts at the near rate.',
  },

  mootgreen: {
    name: 'The Moot Green', tier: 'civic', era: 17, w: 1, h: 1, cost: 3390, upkeep: 2.00,
    icon: '\u{1F333}', color: '#7f9460', capRadius: 20, keepsTally: true,
    desc: 'The open ground where the hundred meets, and where the reeve says out loud what is owed. ' +
      '+1 housing rung within 20 tiles, and it keeps your tally.',
  },
  waysidechapel: {
    name: 'Wayside Chapel', tier: 'civic', era: 17, w: 1, h: 1, cost: 3820, upkeep: 2.30,
    icon: '\u26EA', color: '#b0a894', amenityRadius: 8,
    desc: 'A single cell of dry stone at a crossing, with a priest in it three days a month.',
  },
  boundarycross: {
    name: 'Boundary Cross', tier: 'beauty', era: 17, w: 1, h: 1, cost: 1970, upkeep: 0,
    icon: '\u271D\uFE0F', color: '#a5a096', cosmetic: true,
    desc: 'A carved shaft at the edge of the estate. It marks where one man\'s claim stops, which in ' +
      'this age is the only document there is.',
  },

  robbingcrew: {
    name: 'Robbing Crew', tier: 'food', era: 17, w: 2, h: 2, cost: 15200, upkeep: 17.88,
    icon: '\u{1F9F1}', color: '#948977', workers: 6, onRuin: true, salvaged: true,
    out: { stone: 40.00 }, rp: 1.2,
    desc: 'Now they bring down what is still standing instead of picking up what has fallen: 40.00 ' +
      'stone a minute. ★ TWICE THE RATE IS TWICE THE SPEED AT WHICH THE AGE ENDS.',
  },
  cuttingshed: {
    name: 'Cutting Shed', tier: 'craft', era: 17, w: 3, h: 3, cost: 20770, upkeep: 33.42,
    icon: '\u{1F528}', color: '#a89c88', workers: 9, industry: true,
    procIn: 'stone', procRate: 28.00, procOut: 'blocks', procRatio: 0.5,
    desc: 'Frame saws and a sand slurry: 28.00 stone a minute into 14.00 blocks.',
  },
  blockstaithe: {
    name: 'Block Staithe', tier: 'commerce', era: 17, w: 2, h: 2, cost: 18740, upkeep: 21.56,
    icon: '\u2693', color: '#93a08f', workers: 7, needsRoad: true,
    sells: 'blocks', sellRate: 9.72, sellPrice: 131.44, custRadius: 8, custMin: 21,
    desc: 'Planked over, with a crane. 9.72 blocks a minute at $131.44.',
  },
  fendiggings: {
    name: 'Fen Diggings', tier: 'food', era: 17, w: 2, h: 2, cost: 15200, upkeep: 17.88,
    icon: '\u{1FAA8}', color: '#6d5f47', workers: 6, onSalt: true,
    out: { bogore: 12.78 },
    desc: 'Drained, cut in baulks and worked in courses: 12.78 bog ore a minute, forever.',
  },
  shaftfurnace: {
    name: 'Shaft Furnace', tier: 'craft', era: 17, w: 3, h: 3, cost: 17840, upkeep: 28.70,
    icon: '\u{1F525}', color: '#7d6049', workers: 9, industry: true,
    procIn: 'bogore', procRate: 8.95, procOut: 'iron', procRatio: 0.4,
    desc: 'Taller, hotter, and tapped from the bottom: 8.95 ore into 3.58 iron.',
  },
  irenbooth: {
    name: 'The Iren Booth', tier: 'commerce', era: 17, w: 2, h: 2, cost: 17190, upkeep: 19.78,
    icon: '\u2692\uFE0F', color: '#645f58', workers: 7, needsRoad: true,
    sells: 'iron', sellRate: 5.12, sellPrice: 266.06, custRadius: 8, custMin: 34,
    desc: 'A roofed booth with a weighbeam. 5.12 of bar iron a minute at $266.06.',
  },
  vaccary: {
    name: 'The Vaccary', tier: 'food', era: 17, w: 2, h: 4, cost: 23600, upkeep: 23.57,
    icon: '\u{1F404}', color: '#9b8e72', workers: 6, needsWater: true, soilRadius: 5,
    out: { pergamena: 12.78 },
    desc: 'A cattle farm run for the skins as much as the milk: 12.78 scraped skins a minute.',
  },
  scrivenry: {
    name: 'The Scrivenry', tier: 'craft', era: 17, w: 3, h: 3, cost: 17840, upkeep: 28.70,
    icon: '\u{1F4DC}', color: '#bcae90', workers: 9, needsWater: true, industry: true,
    procIn: 'pergamena', procRate: 8.95, procOut: 'codex', procRatio: 0.4,
    desc: 'Carrels, a rubricator and a man who does nothing but rule lines: 8.95 skins into 3.58.',
  },
  bookhoard: {
    name: 'The Book Hoard', tier: 'commerce', era: 17, w: 3, h: 3, cost: 26540, upkeep: 32.27,
    icon: '\u{1F4D6}', color: '#ad9b78', workers: 8, needsRoad: true,
    sells: 'codex', sellRate: 5.12, sellPrice: 246.16, custRadius: 9, custMin: 27,
    desc: 'A chained press with a catalogue on the inside of the lid: 5.12 codices a minute.',
  },
  openfield: {
    name: 'Open Field', tier: 'food', era: 17, w: 4, h: 4, cost: 28260, upkeep: 43.40,
    icon: '\u{1F33E}', color: '#c0b063', workers: 6, needsWater: true,
    out: { grain: 199.92 },
    desc: 'Strips in two great fields with one lying fallow: 199.92 corn a minute.',
  },
  tidemill: {
    name: 'Tide Mill', tier: 'food', era: 17, w: 2, h: 2, cost: 11840, upkeep: 19.15,
    icon: '\u2699\uFE0F', color: '#7f8f74', workers: 8, nearWater: 2, grainMill: true,
    procIn: 'grain', procRate: 139.94, procOut: 'flour', procRatio: 0.6,
    desc: 'A pond filled on the flood and let go on the ebb: 139.94 corn into 83.96 of meal. Nendrum ' +
      'built one in 619 and it is still there.',
  },
  chepecross: {
    name: 'The Chepe Cross', tier: 'commerce', era: 17, w: 3, h: 3, cost: 26640, upkeep: 35.57,
    icon: '\u{1F35E}', color: '#d0b16f', workers: 11, needsRoad: true, needsWater: true,
    sells: 'flour', sellRate: 59.98, sellPrice: 21.17, custRadius: 7, custMin: 17,
    desc: 'A market with a charter, a standing cross and a court to settle it: 59.98 a minute.',
  },
  guesthall: {
    name: 'The Guest Hall', tier: 'commerce', era: 17, w: 2, h: 3, cost: 32100, upkeep: 36.40,
    icon: '\u{1F37A}', color: '#c2954f', workers: 12, needsRoad: true, needsWater: true,
    procIn: 'grain', procRate: 66.64, procOut: 'beer', procRatio: 0.17,
    sells: 'beer', sellRate: 22.66, sellPrice: 58.16, custRadius: 8, custMin: 23,
    desc: 'The house obliged to feed anybody who arrives, which turns out to be a business: 22.66 of ' +
      'ale a minute at $58.16.',
  },
  wetherflock: {
    name: 'Wether Flock', tier: 'food', era: 17, w: 3, h: 3, cost: 15200, upkeep: 17.88,
    icon: '\u{1F411}', color: '#cec8b2', workers: 6, dryLand: true,
    out: { wool: 19.18 },
    desc: 'Castrated males kept four years for the heaviest fleece: 19.18 wool a minute.',
  },
  tenteryard: {
    name: 'Tenter Yard', tier: 'craft', era: 17, w: 2, h: 2, cost: 12710, upkeep: 26.00,
    icon: '\u{1F9F6}', color: '#8f9682', workers: 8, needsWater: true, industry: true,
    procIn: 'wool', procRate: 13.43, procOut: 'cloth', procRatio: 0.5,
    desc: 'Frames and hooks to dry the cloth on stretch so it does not shrink: 13.43 into 6.72.',
  },
  fairbooth: {
    name: 'Fair Booth', tier: 'commerce', era: 17, w: 2, h: 2, cost: 20360, upkeep: 25.13,
    icon: '\u{1F9F5}', color: '#b59b7f', workers: 7, needsRoad: true,
    sells: 'cloth', sellRate: 9.60, sellPrice: 131.44, custRadius: 8, custMin: 27,
    desc: 'A booth at a saint\'s-day fair with a licence to keep it up all week: 9.60 a minute.',
  },
  swinepark: {
    name: 'The Swine Park', tier: 'food', era: 17, w: 2, h: 2, cost: 21180, upkeep: 24.00,
    icon: '\u{1F437}', color: '#657444', workers: 6,
    out: { pork: 28.00 },
    desc: 'Enclosed woodland kept for mast, with a swineherd who lives in it: 28.00 pork a minute.',
  },
  yairdyke: {
    name: 'The Yair Dyke', tier: 'food', era: 17, w: 1, h: 3, cost: 14300, upkeep: 15.98,
    icon: '\u{1F41F}', color: '#5f7c8a', workers: 6, onWater: true,
    out: { fish: 74.12 },
    desc: 'A stone V across the whole channel with the trap at the point: 74.12 fish a minute.',
  },
  aisledhouse: {
    name: 'The Aisled House', tier: 'housing', era: 17, w: 1, h: 1, cost: 17900, upkeep: 8.66,
    icon: '\u{1F3E1}', color: '#c4ac81', cap: 62, needsWater: true, needsRoad: true, rp: 0.3,
    levels: ['Toft Row', 'The Toft', 'Walled Toft', 'Toft and Garth',
             "Reeve's Toft", "Sokeman's Toft"],
    desc: 'Two rows of posts down the inside carry the roof, so the walls no longer have to: homes 62.',
  },
  bowerrange: {
    name: 'The Bower Range', tier: 'housing', era: 17, w: 2, h: 2, cost: 36750, upkeep: 17.60,
    icon: '\u{1F3DB}\uFE0F', color: '#a88a5c', cap: 144, needsWater: true, needsRoad: true, rp: 0.3,
    levels: ['Bower', "Thegn's Hall", 'Aisled Hall', 'Timbered Hall',
             'Painted Hall', 'Burh Hall'],
    desc: 'Private chambers built off the hall for the family and their people: homes 144.',
  },
  leadenpipe: {
    name: 'The Leaden Pipe', tier: 'infra', era: 17, w: 1, h: 1, cost: 8190, upkeep: 12.00,
    icon: '\u{1F6E2}\uFE0F', color: '#77848d', waterRadius: 12,
    desc: 'Lead run from the cistern to a cluster of standpipes. Waters 12.',
  },
  tappedhead: {
    name: 'The Tapped Head', tier: 'infra', era: 17, w: 1, h: 1, cost: 7130, upkeep: 9.00,
    icon: '\u{1F309}', color: '#8b8781', waterRadius: 17, onRuin: true,
    desc: 'The arcade cleared back to the springing and re-rendered: waters 17, the widest reach the ' +
      'age will ever have. ★ AND IT IS STILL THE SAME ONE PIECE OF RUIN YOU DECIDED NOT TO ROB.',
  },
  cornkist: {
    name: 'Corn Kist', tier: 'infra', era: 17, w: 1, h: 1, cost: 5090, upkeep: 4.80,
    icon: '\u{1F33F}', color: '#b8a97e', storeGrain: 6800, storeFlour: 4200,
    desc: 'A raised chest on staddle stones, out of reach of the rats. 6,800 corn, 4,200 meal.',
  },
  drovestand: {
    name: 'Drove Stand', tier: 'infra', era: 17, w: 1, h: 1, cost: 12720, upkeep: 7.80,
    icon: '\u{1F40E}', color: '#7d7260', workers: 4, depot: true, storeCraft: 190,
    desc: 'A walled stance on the drove road with water and a night\'s grazing.',
  },
  grange: {
    name: 'The Grange', tier: 'civic', era: 17, w: 4, h: 4, cost: 38130, upkeep: 27.65,
    icon: '\u{1F3DA}\uFE0F', color: '#8d7b56', workers: 11, needsRoad: true, depot: true,
    storeGrain: 28800, storeFlour: 18000, storeCraft: 275,
    desc: 'An outfarm of the abbey, run by lay brothers and answerable to nobody local: 28,800 corn, ' +
      '18,000 meal, 275 of craft.',
  },
  hundredcourt: {
    name: 'The Hundred Court', tier: 'civic', era: 17, w: 1, h: 1, cost: 5090, upkeep: 3.00,
    icon: '\u{1F333}', color: '#6f8754', capRadius: 29, keepsTally: true,
    desc: 'The moot with a written custom behind it now. +1 housing rung within 29 tiles.',
  },
  preachingcross: {
    name: 'The Preaching Cross', tier: 'civic', era: 17, w: 1, h: 1, cost: 5730, upkeep: 3.45,
    icon: '\u26EA', color: '#bab29c', amenityRadius: 12,
    desc: 'A carved standing cross where a church has not been built yet, and a priest who walks a ' +
      'circuit to it. Reaches 12.',
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

  17: ['Turf Shelter', 'Wattle Hut', 'Daubed Hut', 'Sunken Croft',
       "Crofter's Croft", 'Free Croft'],

  16: ['Lodging Cell', 'Rented Oikema', 'Tiled Oikema', 'Upper Oikema',
       'Galleried Oikema', "Guildsman's Oikema"],

  10: ['Kalyba', 'Oikos', 'Pastas House', 'Prostas House', 'Peristyle House',
       'Peristyle Court'],

  11: ['Casula', 'Casa Colonica', 'Tiled Casa', 'Courtyard Casa', 'Fundus',
       'Greater Fundus'],

  13: ['Pergula', 'Cenaculum', 'Solarium', 'Contignatio', 'Maenianum', 'Diaeta'],

  15: ['Bough Lean-To', 'Canabae', 'Mud Canabae', 'Tiled Canabae',
       'Walled Canabae', "Vicomagister's Canabae"],
  12: ['Skene', 'The Katoikia', 'Tiled Katoikia', 'Courtyard Katoikia', 'The Oikia',
       'The Great Oikia'],

  0: ['Scrape', 'Fern Bower', 'Banked Bower', 'Fenced Bower', 'Walled Bower', 'Elder Bower'],
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

  8: ['Pit Dwelling', 'Courtyard Compound', 'Two-Court Compound',
      'Walled Compound', 'Royal Terrace House', 'Ancestral Seat'],

  9: ['Beach Shelter', 'Hale Pili', 'Raised-Floor House',
      'Kauhale (Household)', "Konohiki's Hale", 'Chiefly Hale'],
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

  17: {
    key: 'copy',
    icon: '\u{1F4D6}',
    title: 'The Second Copy',
    lead: 'The Monastery is closed and the last quire is sewn in.',
    body: 'Nothing here was invented. Every sentence in that room came from somewhere else, and the ' +
          'only reason any of it still exists is that a man who did not understand it copied it out ' +
          'anyway, and then somebody copied his copy. That habit is worth more than the building.',
    grant: '<b>Every upgrade you ever buy, in this age and every age after it, costs 15% less — ' +
           'because somebody already worked out how, and wrote it down.</b>',
    toast: '\u{1F4D6} The habit of the second copy is yours. Every upgrade in this age and every ' +
           'age after it costs 15% less.',
    log: 'Their gift: the copy. What is written twice does not die with the man who wrote it.',
    apply(s) { s.giftCopy = (s.giftCopy | 0) + 1; },
  },

  16: {
    key: 'vault',
    icon: '\u26EA',
    title: 'The Great Church',
    lead: 'The dome is closed. Forty windows at its base, and the whole weight of it standing on light.',
    body: 'It was raised in five years by a city that could not feed itself without a licence, and it ' +
      'outlasted the empire that built it by five hundred years, the faith that built it by another ' +
      'five, and every quota the Eparch ever set. What it taught was not how to make more of ' +
      'something. It was how much a city can be allowed to HOLD.',
    grant: '<b>Every store in your city -- and in every city you found after this one -- holds 20% ' +
      'more, in this age and every age after it.</b>',
    toast: '\u26EA The dome is closed. Every store holds 20% more, in this age and every age after it.',
    log: 'Their gift: capacity. The city learns how much it is allowed to hold.',
    apply(s) { s.giftVault = (s.giftVault | 0) + 1; },
  },

  15: {
    key: 'supply',
    icon: '\u{1F9F1}',
    title: 'The Circuit Is Closed',
    lead: 'The Wall is finished. The gates are hung, and for the first time the city has an inside.',
    body: 'It saved nobody. The province went anyway, the ships stopped coming anyway, and the men ' +
          'who paid for the stone were assessed for it in a currency they no longer had. What the ' +
          'wall did was smaller and it lasted a thousand years: it taught a city to hold a ' +
          'PERIMETER instead of a province -- to supply what it can reach, and to let the rest go.',
    grant: '<b>Every city you found, in this age and every age after it, hauls ' +
           TUNE.GIFT_SUPPLY_STEP + ' tiles further before the carting premium starts.</b>',
    toast: '\u{1F9F1} The circuit is closed. Supply reaches ' + TUNE.GIFT_SUPPLY_STEP +
           ' tiles further, in this age and in every age after it.',
    log: 'Their gift: a perimeter. The city learns to supply what it can reach.',
    apply(s) { s.giftSupply = (s.giftSupply | 0) + 1; },
  },

  10: {
    key: 'table',
    icon: '⚖\u{FE0F}',
    title: 'What a Meal Is',
    lead: 'The temple is finished, the scaffolding is down, and the accounts are published on stone.',
    body: 'The city that built it could not feed itself and never pretended otherwise. What it ' +
      'worked out instead was how to eat well anyway — grain off a ship, oil off its own hills, ' +
      'figs, pulses and fish — and how to write down exactly what that cost and who paid it. The ' +
      'temple is what the trade bought. The idea that a city’s table is a thing you PLAN, and ' +
      'audit, is what outlasts it.',
    grant: '<b>In this age and every age after it, your staple feeds 8 points more of every ' +
      'citizen’s table.</b>',
    toast: '⚖\u{FE0F} The Athenian reckoning is yours. Bread covers 8 points more of the ' +
      'table, in this age and every age after it.',
    log: 'Their gift: an honest account of what a city eats — bread goes further now, forever.',
    apply(s) { s.giftTable = (s.giftTable | 0) + 1; },
  },

  11: {
    key: 'export',
    icon: '\u{1F3DB}\u{FE0F}',
    title: 'What the Outside World Is Worth',
    lead: 'The temple is dedicated, the year is named for it, and the tabulae go down into the vaults.',
    body: 'The Republic did not invent counting people. What it invented was doing it on a ' +
      'schedule, writing it down, and keeping the copy — and once a state knows what it has, it ' +
      'can find out what everyone else will pay for it. The contracts were let at the Capitol, ' +
      'against the register, to men who had read it. The temple burned twice and was rebuilt ' +
      'twice; the list is what actually survived.',
    grant: '<b>In this age and every age after it, everything that overflows your stores and ' +
      'is sold abroad fetches ' + Math.round(TUNE.GIFT_EXPORT_STEP * 100) + ' points more.</b>',
    toast: '\u{1F3DB}\u{FE0F} The register is yours. Every surplus you ever dump abroad fetches ' +
      Math.round(TUNE.GIFT_EXPORT_STEP * 100) + ' points more, in this age and every age after it.',
    log: 'Their gift: a written answer to what the world outside will pay — every surplus you ' +
      'ever have is worth more for it.',
    apply(s) { s.giftExport = (s.giftExport | 0) + 1; },
  },

  12: {
    key: 'beacon',
    icon: '\u{1F5FC}',
    title: 'What the Sea Is Worth Knowing',
    lead: 'The mirror is set, the fire is lit, and the light stands up off the water for thirty miles.',
    body: 'Sostratos of Knidos cut his own name into the stone and plastered the king’s over it, ' +
      'on the theory that the plaster would fall off first. It took twelve years and it stood for ' +
      'sixteen hundred. What it was actually for is duller and larger than the wonder: the coast ' +
      'here is flat, featureless and unlit for a hundred miles either way, and a captain who ' +
      'cannot find the harbour does not sail. A city that is only reachable in daylight in good ' +
      'weather is a city half the year.',
    grant: '<b>In this age and every age after it, ' +
      Math.round(TUNE.GIFT_BEACON_STEP * 100) + '% more people set out for your city.</b>',
    toast: '\u{1F5FC} The light is up. From now on, in this age and every age after it, ' +
      Math.round(TUNE.GIFT_BEACON_STEP * 100) + '% more people set out for your city — because ' +
      'they can find it in the dark.',
    log: 'Their gift: a fire on a tower that can be seen from over the horizon — and every year ' +
      'after this one, more of them come.',
    apply(s) { s.giftBeacon = (s.giftBeacon | 0) + 1; },
  },

  13: {
    key: 'arena',
    icon: '\u{1F3DF}\u{FE0F}',
    title: 'How to Raise Something Enormous',
    lead: 'The awnings go up over fifty thousand seats, and the sand is laid.',
    body: 'It took eight years, which for a building of that size is a fact stranger than the ' +
      'building. What made it possible was not stone and not money: it was contractors who had ' +
      'done it before, gangs who stayed together between jobs, cranes that were designed rather ' +
      'than improvised, and a written schedule that said which stone arrived in which month. The ' +
      'arena is the demonstration. The method is the thing that leaves with you.',
    grant: '<b>In this age and every age after it, every monument you raise takes deliveries ' +
      Math.round(TUNE.GIFT_ARENA_STEP * 100) + '% faster.</b>',
    toast: '\u{1F3DF}\u{FE0F} The method is yours. Every monument you ever build, in this age and ' +
      'every age after it, takes deliveries ' + Math.round(TUNE.GIFT_ARENA_STEP * 100) +
      '% faster — the same gangs, the same cranes, the same schedule.',
    log: 'Their gift: how to organise a very large building site — every monument after this one ' +
      'goes up faster for it.',
    apply(s) { s.giftArena = (s.giftArena | 0) + 1; },
  },

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

  8: {
    key: 'terra',
    icon: '📏',
    title: 'The Line Runs True',
    lead: 'The Wall is closed. Seven kilometres of tamped earth, and the two ends met.',
    body: 'To ram a wall in level courses over seven kilometres of falling ground the gangs had to be ' +
          'able to carry a line across country and still know it was level when it got there. Nobody ' +
          'built the wall in order to learn that. It is simply what they had to work out to build it ' +
          'at all — and it outlasts the wall by three thousand years.',
    grant: '<b>Every terraform brush costs 20% less, in this age and in every age after it — ' +
           'ramming, cutting, water, rock, soil and trees alike.</b>',
    toast: '📏 The surveyors’ line is yours. Every brush costs 20% less, in this age and ' +
           'every age after it.',
    log: 'Their gift: a level line carried across country — the ground is cheaper to move now, forever.',
    apply(s) { s.giftTerra = (s.giftTerra | 0) + 1; },
  },

  9: {
    key: 'supply',
    icon: '\u{1F6F6}',
    title: 'The Ground You Cannot See',
    lead: 'The platform is faced and the uprights are set. The sea in front of it is not a wall any more.',
    body: 'Every other people on this ladder grew by walking outward until walking got expensive. This ' +
          'one worked out how to hold a place together across water it could not see across — the ' +
          'stars, the swells, the flights of birds, and the certainty that there was something out ' +
          'there worth aiming at. What survives is not the canoe. It is the idea that a city is not ' +
          'the same thing as the ground it is standing on.',
    grant: '<b>Every city you found, in this age and every age after it, hauls ' +
           TUNE.GIFT_SUPPLY_STEP + ' tiles further before the carting premium starts.</b>',
    toast: '\u{1F6F6} The wayfinders’ reckoning is yours. Every city you found from now on hauls ' +
           TUNE.GIFT_SUPPLY_STEP + ' tiles further for nothing.',
    log: 'Their gift: distance made cheap. A city can be spread out now, in every age after this one.',
    apply(s) { s.giftSupply = (s.giftSupply | 0) + 1; },
  },

  1: {
    key: 'keep',
    icon: '\u{1F58C}\u{FE0F}',
    title: 'What You Leave Standing',
    lead: 'The last hand is pressed on the wall, the lamps are carried back up the passage, and the ' +
          'hole in the ground is left exactly as it was found.',
    body: 'Nobody lived down here. There is no hearth in the painted chamber, no bones, no tools left ' +
          'lying — people walked four hundred metres into absolute dark carrying fire, drew horses, ' +
          'and walked out. At Chauvet the charcoal in two of the panels is five thousand years apart, ' +
          'which means the place was empty for fifty centuries and somebody still knew how to find ' +
          'it, and still came back. That is the thing this age is actually good at: leaving a thing ' +
          'standing, spending almost nothing to keep it, and returning.',
    grant: '<b>Every building you switch off, in this age and every age after it, costs ' +
           Math.round(TUNE.GIFT_KEEP_STEP * 100) + '% less to keep standing.</b>',
    toast: '\u{1F58C}\u{FE0F} The passage is closed and the wall keeps. From now on, in this age and ' +
           'every age after it, anything you mothball costs ' + Math.round(TUNE.GIFT_KEEP_STEP * 100) +
           '% less to hold.',
    log: 'Their gift: the habit of coming back. What you switch off is cheaper to keep, forever.',
    apply(s) { s.giftKeep = (s.giftKeep | 0) + 1; },
  },

};
function monumentGift(era) { return MONUMENT_GIFT[rungOf(era)] || null; }

const ERA_POLICY = {

  17: {
    key: 'policyWarrant', icon: '\u{1FA93}', name: 'The Spolia Warrant',
    tip: 'Every Spoliation Gang works +25% — and takes the good stone and leaves the rubble, so ' +
      'each ruin tile gives up 33% LESS in total before it is finished. Costs no money and no ' +
      'goods. It is the only lever in the game that spends something you cannot make again.',
    on: 'The warrant is sealed. Take what is good and leave the rest — the walls come down faster now.',
    off: 'The warrant is withdrawn. The gangs go back to working a ruin out properly.',
  },

  16: {
    key: 'policyChrysobull',
    icon: '\u{1F4DC}',
    name: 'The Chrysobull',
    tip: 'A golden bull seals HALF AS MUCH LICENCE AGAIN onto every good, at $60 an authored minute ' +
      'per unit of licence granted -- PAID WHETHER YOU FILL IT OR NOT. It cannot be mothballed away ' +
      'and demolishing does not touch it. Take it only when your workshops are already over quota; ' +
      'take it early and you are paying rent on permission you are not using.',
    on: 'The bull is sealed and read in the Forum. The licence is half as large again, and so is the bill.',
    off: 'The bull is revoked. The city goes back to what the Book allows it.',
  },

  15: {
    key: 'policyMunus', icon: '\u{1F4DC}', name: 'The Munus',

    tip: 'The curia is assessed on its PROPERTY, not its people: ' +
      (TUNE.MUNUS.per * TUNE.TEMPO * 1000).toFixed(1) + ' cents a minute per $1,000 of standing ' +
      'building, and every building decays ' + Math.round(TUNE.MUNUS.relief * 100) +
      '% slower for it. It pays only while your whole fabric would last under ' +
      TUNE.MUNUS.crossoverMin + ' authored minutes at the deficit you are running -- so it saves ' +
      'a city that is falling and RUINS one that has recovered. Mothballing does not reduce it. ' +
      'Only demolishing does.',
    on: 'The munus is called. The curiales will pay for the roofs, and they will not thank you.',
    off: 'The munus is lifted. The buildings are the city\'s problem again.',
  },

  10: {
    key: 'policyPublicTable', icon: '⚖️', name: 'The Public Table',
    tip: 'The Prytaneion keeps a common mess: bread may cover ' +
      Math.round((TUNE.OPSON.staple + TUNE.OPSON.lawStaple) * 100) + '% of the city’s ' +
      'table instead of ' + Math.round(TUNE.OPSON.staple * 100) + '%, so a shortage of figs, ' +
      'pulses or fish costs you less. Every shop in the city moves ' +
      Math.round(TUNE.OPSON.lawShopCut * 100) + '% fewer goods for it. Costs nothing and ' +
      'never runs out — it buys you TIME to build the leg you are missing, not a way to skip it.',
    on: 'The common mess is kept. More of the city eats bread, and the stoas are quieter for it.',
    off: 'The mess is closed. Watch the ⚖️ chip — a table that was laid may not be now.',
  },

  12: {
    key: 'policyAteleia', icon: '\u{1F4DC}', name: 'The Ateleia',
    tip: 'The founder’s charter exempts every settler from the head-money for as long as it ' +
      'stands, and a city that taxes nobody is a city people set out for: ' +
      Math.round(TUNE.ATELEIA.pull * 100) + '% more of them do. The Trapeza then collects only ' +
      Math.round(TUNE.ATELEIA.duesCut * 100) + '% of the tributum. ★ IT MOVES THE PULL, NOT THE ' +
      'SUPPLY — with no crossings in store it buys you nothing at all. A foundation short of ' +
      'people wants this ON; a full one is paying for ships it has no berths for.',
    on: 'The exemption is proclaimed on stone at the gate. More of them set out — and the ' +
      'treasury goes quiet.',
    off: 'The exemption lapses. The head-money is collected in full, and the harbour is a little ' +
      'emptier for it.',
  },

  13: {
    key: 'policyFleet', icon: '\u{26F4}', name: 'The Standing Fleet',
    liveFlag: 'fleetLift', idle: 'idle — no sailcloth on the shelf',
    tip: 'The city keeps the grain ships fitted out of its own stores: every landing works — ' +
      'STATIO ANNONAE, NAVICULARIUM and anything they become — lands +' +
      Math.round(TUNE.FLEET.lift * 100) + '% more, for ' + TUNE.FLEET.perLanded.toFixed(2) +
      ' sailcloth per ration landed. ★ It is the only lever in the game whose cost rises with ' +
      'how much the mechanic is moving, so a city buying twice as much pays twice as much cloth. ' +
      'AT PAR IT BUYS NOTHING — the price is already fair — and it stops the moment the ' +
      'sailcloth runs short. One Textrinum weaves enough for it; one Armamentarium sells ' +
      'enough to leave you with none.',
    on: 'The charters are signed and the hulls are fitted. Every landing lands more — and the ' +
      'sailmakers are working for the city now.',
    off: 'The fleet is stood down. Watch the \u{1F33E} chip: the premium may have just risen.',
  },
  11: {
    key: 'policyProfessio', icon: '\u{1F3DB}\u{FE0F}', name: 'The Professio',
    tip: 'Every householder must declare himself, his family and his property to the censor. ' +
      'A census costs ' + Math.round(TUNE.PROFESSIO.feeCut * 100) + '% of list — counting is ' +
      'cheap, so you can afford to do it often. But the CAPITE CENSI are entered on the roll and ' +
      'assessed at nothing, so the Aerarium collects only ' +
      Math.round(TUNE.PROFESSIO.duesCut * 100) + '% of the tributum. Cheap to count, dearer to ' +
      'have counted. A growing city wants this ON; a settled one wants it OFF.',
    on: 'The declaration is required. Lustra are half price, and the treasury takes a quarter less.',
    off: 'The declaration lapses. The tributum is collected in full — and so is the census fee.',
  },

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

  1: {
    key: 'policyBoneFire', icon: '\u{1F9B4}', name: 'The Bone Fire',
    liveFlag: 'boneFire', idle: 'idle — no bone in the store',
    tip: 'The fires are banked on rendered bone. Bone is held back from the benches, burned FIRST, ' +
      'and delivers ' + TUNE.BONEFIRE.hot.toFixed(1) + '× the warmth it does cold — so the wood you ' +
      'have left is not touched, and the same store carries the camp ' +
      Math.round((TUNE.BONEFIRE.hot - 1) * 100) + '% further. It costs no coin and spends no extra ' +
      'good. It spends BONE: the Carver’s bench, the Trade Post’s best raw, and the Painted Cave’s ' +
      'own hundred carvings. ★ MEASURED: a camp whose stands are worked out goes from dark one tick ' +
      'in THREE to never dark, and its carvings barely move — the Lodge needs the fire too. A camp ' +
      'that was never short pays 31% of its carvings for nothing. Pull it when the \u{1F525} chip ' +
      'flickers; drop it the moment it stops.',
    on: 'The fires are banked on bone. The wood can stand — and the benches wait their turn.',
    off: 'The bone comes off the fire. Watch the \u{1F525} chip: the store you were counting on just ' +
      'got a third smaller.',
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

    liveFlag: 'swept', idle: 'idle — no brick in store',
    tip: 'The drains are swept and re-kerbed daily: every Covered Drain reaches ' +
      TUNE.SWEEP.radius + ' tiles instead of ' + TUNE.GRID.drainRadius + ' — nearly twice the ground — ' +
      'for ' + (TUNE.SWEEP.perDrain * TUNE.TEMPO).toFixed(1) + ' brick per drain per minute. It stops ' +
      'the moment the brick runs dry, and the blocks it was holding stop counting with it.',
    on: 'The sweepers go out. Every drain reaches further, and every rectangle inside the new circles counts.',
    off: 'The order is lifted. The drains go back to ten tiles — check the \u{1F4D0} chip before the streets do.',
  },

  7: {
    key: 'policyWideIssue', icon: '\u{1F4DC}', name: 'The Wide Issue',
    liveFlag: 'wideIssue', idle: 'idle — not enough oil to double the issue',
    tip: 'The scribes ride further and write more names down: every magazine administers ' +
      TUNE.WIDEISSUE.widen + ' tiles further, and every building on the roll draws ' +
      TUNE.WIDEISSUE.mult + 'x its ration. It stops the moment the oil runs short, and the names ' +
      'it was carrying come off the roll with it.',
    on: 'The order goes out. Every disc widens \u2014 and every ration doubles with it.',
    off: 'The wide issue is lifted. Watch the \u{1F4DC} chip: the outermost quarter may have just come off the roll.',
  },

  8: {
    key: 'policyRevet', icon: '\u{1F30A}', name: 'The Revetted Ditch Order',
    liveFlag: 'revetAdd', idle: 'idle — no blocks in store',
    tip: 'The ward turns out and lines every run below a gate in tamped courses, so the sluice can be ' +
      'opened wider: each DIVERSION GATE emits ' + TUNE.REVET.add.toFixed(1) + ' more head — one more ' +
      'BUNDED FIELD per gate, on the ditches you already dug. It costs ' + TUNE.REVET.per.toFixed(2) +
      ' blocks a minute PER LIVE GATE and stops the moment the blocks run short — and those are the ' +
      'same blocks the Wall is waiting for.',
    on: 'The order is called. Every run below a gate is lined and beaten, and every sluice opens wider.',
    off: 'The order is stood down. Watch the \u{1F30A} chip — the outermost field on each fan may have ' +
      'just gone dry.',
  },

  9: {
    key: 'policyLash', icon: '\u{1FAA2}', name: 'The Lashing Order',
    liveFlag: 'lashAdd', idle: 'idle — no sennit in store',
    tip: 'Every hull in the city is stripped and re-lashed, and the crews are kept at it: each CANOE ' +
      'LANDING crosses ' + TUNE.LASH.add + ' tiles further while the order is paid. It costs ' +
      TUNE.LASH.per.toFixed(2) + ' sennit a minute PER LIVE LANDING and stops the moment the coils run ' +
      'short. Turn it on to make ONE crossing you could not otherwise make — the ground you buy with it ' +
      'stays yours at the ordinary reach.',
    on: 'The order is called. Every hull comes out, and the lashings go on green and tight.',
    off: 'The order is stood down. Watch the \u{1F6F6} chip — an island that was open may have just closed.',
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
  17: { flavour: 'Rutted Track', color: 0xcfc6ae, hw: 0.28,
        desc: 'Chalk and flint rammed into the mud and re-laid every spring. Only SOME buildings ' +
              'need one — homes, shops, stores and the Monastery must reach the seat of power; ' +
              'gangs, pits, crofts, fields, mills and wells never do. Rome laid fifty thousand ' +
              'miles of it; you are laying twelve.' },

  16: {
    flavour: 'The Mese',

    color: 0x5c5a54, hw: 0.44,
    desc: 'The great colonnaded street and every lane that feeds it, marble-kerbed and porticoed both ' +
      'sides. Only SOME buildings need one: homes, shops, stores and the civics must reach the Great ' +
      'Palace; terraces, seeps, quarries and the weirs never do. $10 a tile, nothing to keep.',
  },

  15: { flavour: 'Via Vetus', color: 0x4a4a46, hw: 0.42,
        desc: 'Polygonal basalt setts on a rubble bed, cambered and kerbed -- the widest road on ' +
          'the ladder and the only thing in this age that needs no maintenance at all. Only SOME ' +
          'buildings need one: homes, counters, stores and the civics must reach the Praetorium; ' +
          'fields, groves, quarries, kilns, the aqueduct and the Curator never do. $10 a tile, ' +
          'nothing to keep.' },

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

  8: { flavour: 'Rammed Way', color: 0x4a4034, hw: 0.32,
       desc: 'Earth wetted, laid in courses and beaten flat with the same rammers that raise the wall. ' +
             'Only SOME buildings need one — homes, markets, stores, the civic buildings and the two ' +
             'yards that ship walling; fields, ditches, gates, wells, groves, adits, pans, middens and ' +
             'the quarry never do. $10 a tile, nothing to keep.' },

  9: { flavour: 'Coral Path', color: 0xd8cfba, hw: 0.30,
       desc: 'Beach coral broken small and raked flat between the houses, blinding at midday and easy ' +
             'to follow at night. Only SOME buildings need one — homes, the shops and halls, the store ' +
             'and the civic buildings; terraces, groves, beds, pans, springs, mulch pits, the quarry ' +
             'and THE CANOE LANDING never do. $10 a tile, nothing to keep.' },

  13: { flavour: 'Via', color: 0x4f5250, hw: 0.36,
        desc: 'Polygonal basalt blocks set in mortar over a rubble core, kerbed and cambered, ' +
              'with the ruts of four centuries in it. Only SOME buildings need one -- homes, ' +
              'shops, stores and the civics; fields, orchards, groves, quarries, mines and the ' +
              'clay beds never do. $10 a tile, nothing to keep.' },
  12: { flavour: 'The Plateiai', color: 0x5c5348, hw: 0.38,
        desc: 'The grid, pegged out by a surveyor before a single house went up: two great streets ' +
              'thirty metres wide, packed limestone chip over a rubble bed, and everything else ' +
              'squared off them. Only SOME buildings need one — the houses, every shop, the ' +
              'warehouses, the Katagogion and the four civic buildings; the Kleros, the ' +
              'Paradeisos, the Aipolion, the Mareotis, the natron flats, the quarry, the water and ' +
              'the dung court never do. $10 a tile, nothing to keep.' },
  11: { flavour: 'Via Silice Strata', color: 0x3d4247, hw: 0.38,
        desc: 'Polygonal Alban basalt laid on four courses of bedding, cambered, with raised kerbs ' +
              'and stepping stones at the crossings. Only SOME buildings need one — the houses, ' +
              'every shop, the warehouses, the mule stations and the four civic buildings; the ' +
              'Arvum, the Hortus, the Ovile, the Vivarium, the salt pans, the clay cut, the ' +
              'quarry, the water and the dung-heap never do. $10 a tile, nothing to keep.' },
  10: { flavour: 'Flagged Lane', color: 0x59646e, hw: 0.30,
        desc: 'Blue-grey Piraeus limestone laid in slabs, with a gutter cut down one side. Only SOME ' +
              'buildings need one — the Oikos and the Synoikia, the Agora and the three export shops, ' +
              'the Emporion, the Stoa Warehouse, the Bouleuterion and the Deigma; groves, vineyards, ' +
              'fig terraces, bean plots, slipways, clay beds, the quarry, the galleries, the hearths, ' +
              'the fountains and the cisterns never do. $10 a tile, nothing to keep.' },
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

  { id: 'monastery', name: 'The Monastery', era: 17, cost: 960000, icon: '\u26EA',
    desc: 'Church, cloister, dorter, barn and gatehouse, raised out of an empire that is not ' +
          'coming back. The record survives here or it does not survive at all.' },
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

  { id: 'rammedwall',  name: 'The Rammed-Earth Wall', era: 8, cost: 14900, icon: '\u{1F9F1}',
    desc: 'Seven kilometres of tamped earth round the settlement, raised one eight-centimetre course ' +
      'at a time between shuttering boards and beaten until a rammer rings on it. The gangs had to ' +
      'carry a level line across seven kilometres of falling ground and have the two ends meet.' },

  { id: 'greatahu',    name: 'The Great Ahu',   era: 9,  cost: 19500, icon: '\u{1F5FF}',
    desc: 'A dressed basalt platform at the seaward end of the marae, faced in fitted slabs brought ' +
      'from a quarry on the far side of the island and carried by sea. The uprights on it are the ' +
      'lineage, one stone a generation, and the ground in front of it is where a voyage is sanctioned.' },
  { id: 'templePyr',   name: 'Temple-Pyramid',  era: 14, cost: 46000,     icon: '\u{1F3EF}', desc: 'Stepped limestone crowned with a roof-comb.' },
  { id: 'temploMayor', name: 'Templo Mayor',    era: 26, cost: 150000,    icon: '⛩️', desc: 'Twin shrines above the sacred precinct.' },

  { id: 'parthenon',   name: 'Parthenon',       era: 10, cost: 25520,     icon: '\u{1F3DB}️', desc: 'Pentelic marble, refined to the millimetre.' },

  { id: 'capitolium',  name: 'The Capitolium',  era: 11, cost: 33400,     icon: '\u{1F3DB}️', desc: 'Jupiter Best and Greatest, over the whole city, from its first year.' },

  { id: 'pharos',      name: 'The Pharos',      era: 12, cost: 43710,     icon: '\u{1F5FC}', desc: 'A fire on a tower, seen from over the horizon, so a ship can find this coast at night.' },

  { id: 'colosseum',   name: 'Colosseum',       era: 13, cost: 57200,     icon: '\u{1F3DF}️', desc: 'Concrete vaults seating fifty thousand -- the first monument on this ladder built for the population rather than for the heavens.' },

  { id: 'murus',       name: 'Murus Aurelianus', era: 15, cost: 95140,    icon: '\u{1F9F1}', desc: 'A circuit raised in fear, out of the city that used to be inside it.' },

  { id: 'hagiasophia', name: 'Hagia Sophia',    era: 16, cost: 147600,   icon: '\u26EA', desc: 'A dome on forty windows, raised in five years, standing on light.' },
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

  aquavetus: 0.1, fontinalis: 0.1, mansio: 0.6, granarium: 0.2, bubile: 0.3,
  curator: 0.5, ecclesia: 1.2, scrinium: 0.6, castrum: 0.8,
  iugatio: 1.0, aquimolae: 1.6, catabolum: 2.6,
  pascua: 1.0, gynaeceum: 1.8, vestiarium: 3.0,
  ferraria: 1.0, fabrica: 1.8, praebitorium: 2.8,
  ruderatio: 1.0, caminus: 1.8, structoris: 2.4,
  saxifodina: 1.2, lapidaria: 1.8, ripamarmorata: 2.4,
  oleastrum: 1.0, piscatio: 1.0, penuaria: 1.2,
  meritorium: 0.3, turris: 0.5, cippus: 0,

  possessio: 1.3, compascuum: 1.3, ferrifodina: 1.3, demolitio: 1.3, caesura: 1.5,
  arbustum: 1.3, excipula: 1.3,
  catillus: 2.0, textoria: 2.2, scutaria: 2.2, fornacula: 2.2, sectilia: 2.2,
  annonaria: 3.2, emporiumvestium: 3.6, sagittaria: 3.4, redemptorum: 3.0,
  navalia: 3.0, cupedinaria: 1.6,
  rivusherculaneus: 0.15, specus: 0.15, stativa: 0.8, condita: 0.3, laetamen: 0.4,
  collegiumfabrum: 0.7, episcopium: 1.6, notitia: 0.8, burgus: 1.0, terminus: 0,

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

  sluicegate: 0.15, fieldditch: 0, cutchannel: 0.2, windlasswell: 0.1,
  tiledcistern: 0.15, battercistern: 0.2, kingsweir: 0.2, deepcut: 0.25,
  pitgranary: 0.1, sealedpit: 0.15, timbergranary: 0.8, platformgranary: 1.0,
  clanstore: 0.4, sealedvault: 0.5,
  bundedfield: 1.0, terracedbund: 1.4, milletfield: 1.0, oxploughfield: 1.4,
  mulberrygrove: 1.0, pollardgrove: 1.4, oreadit: 1.0, lodegallery: 1.4,
  saltlakepan: 1.0, brinepanrow: 1.4, stonequarry: 1.2, rubbleface: 1.6,
  apricotgrove: 1.0, walledorchard: 1.4, riverweir: 1.0, fishgarth: 1.4,
  bonemidden: 1.0, hornpits: 1.4,

  oxpens: 0.4, royalherd: 0.5, loesspits: 0.2, compostwalks: 0.3,
  troughhammer: 1.6, hammerrow: 1.8, pestleyard: 1.6, mortargang: 1.8,
  aleshed: 1.6, mashbrewhouse: 1.8, wormshed: 1.6, tieredwormhouse: 1.8,
  reelinghouse: 1.8, filamenthall: 2.0, patternloom: 1.8, damaskloom: 2.0,
  piecemould: 1.6, sectionalfoundry: 1.8, boilingshed: 1.6, moundhearths: 1.8,
  rammedyard: 1.6, courseyard: 1.8, bonecarver: 1.6, inlayworkshop: 1.8,
  mealcounter: 2.4, granarycourt: 2.8, silkhall: 3.0, bolttreasury: 3.4,
  bronzemarket: 2.6, vesselhall: 3.0, weighingfloor: 2.4, saltcommission: 2.8,
  alehall: 2.4, libationhall: 2.8, wallworks: 2.4, gangcommissary: 2.8,
  bonestall: 2.4, awlcombrow: 2.8,
  clanground: 0.2, drumground: 0.3, cauldroncourt: 0.6, lineagetemple: 0.8,
  cowrietreasury: 1.0, standardhouse: 1.2, divinercourt: 0.6, oraclearchive: 0.8,
  courtyardcompound: 0.3, clancompound: 0.3, altarterrace: 0.1,

  hyle: 1.0, xylagogia: 1.4, neorion: 1.6, naustathmos: 1.8,
  arvum: 1.0, iugera: 1.4, hortus: 1.0, olitores: 1.4,
  vivarium: 1.0, nassae: 1.4, salinae: 1.0, campiostienses: 1.4,
  ovile: 1.0, saltus: 1.4, cretifodina: 1.0, puteolibeds: 1.4,
  silicaria: 1.2, lapisalbanus: 1.6,
  molaasinaria: 1.6, turningfloor: 1.8, salsamentaria: 1.6, garumvats: 1.8,
  fullonica: 1.6, sulphurhouse: 1.8, officinategularia: 1.6, imbrexworks: 1.8,
  officinasilicis: 1.6, nucleusbeds: 1.8,
  macellum: 2.4, nundinae: 2.8, forumholitorium: 2.2, cuppedinis: 2.6,
  forumpiscarium: 2.4, velabrum: 2.8, tabernavestiaria: 3.0, togaria: 3.4,
  mercatustegularum: 2.6, portustiberinus: 3.0, crepidines: 2.6, milliaria: 3.0,
  casacolonica: 0.3, atriumdomus: 0.3,
  lacus: 0.1, fonspublicus: 0.15, piscinalimaria: 0.15, favissae: 0.2,
  doliarium: 0.1, cellapenaria: 0.15,
  porticusaemilia: 0.8, horreagalbana: 1.0, stabulum: 0.4, hospitium: 0.5,
  saepta: 0.2, campusmartius: 0.3, sterquilinium: 0.2, fimetum: 0.3,
  tabularium: 0.8, libraria: 1.0, aerarium: 1.0, quaestorium: 1.2,
  basilica: 0.2, porticusmetelli: 0.3, moneta: 1.0, argentaria: 1.2,
  rostra: 0.1,
};
for (const k in RP_WEIGHT) if (BUILDINGS[k]) BUILDINGS[k].rp = RP_WEIGHT[k];

if (BUILDINGS.templeGranary) BUILDINGS.templeGranary.dues = TUNE.DUES.per;

for (const t of ROAD_REQUIRED) if (BUILDINGS[t]) BUILDINGS[t].needsRoad = true;
for (const k in BUILDINGS) if (BUILDINGS[k].monument) BUILDINGS[k].needsRoad = true;

const PLOWED = ['farm', 'estate', 'farm2', 'sesamefield', 'terraceplot', 'irrigatedbank',
                'leveefield', 'inundationfield', 'tilfield', 'tilterrace',

                'milletfield', 'oxploughfield'];
for (const t of PLOWED) if (BUILDINGS[t]) BUILDINGS[t].plowed = true;

const QUARRIED = ['quarry', 'deepquarry', 'granitequarry', 'desertquarry',

  'proconnesus', 'marmarabeds',
  'gypsumcutter', 'sawpit', 'copperadit', 'deepgallery',
  'flintquarry', 'bonebed', 'deeplens',

  'prospectpit', 'adit', 'deeplevel', 'malachitecut', 'openstope',
  'limestonecut', 'benchquarry',

  'pillarquarry', 'flintdiggings', 'beddingtrench', 'chertadit',

  'adzequarry',

  'marblequarry',

  'stonequarry', 'rubbleface',

  'silicaria', 'lapisalbanus',

  'latomia', 'metallon',

  'lapicidina', 'lautumiae', 'plumbaria', 'cuniculus',

  'saxifodina', 'caesura',

  'basaltface', 'laurion', 'hymettosface', 'maroneiaworkings'];
for (const t of QUARRIED) if (BUILDINGS[t]) BUILDINGS[t].quarried = true;

const MONUMENT_BUILD = {
  monastery:  { money: 206070, blocks: 14740, codex: 850, iron: 1300 },

  paintedcave: { money: 3600, ochre: 900, charcoal: 300, carvings: 100 },

  levelledcourt: { money: 2100, gold: 160, deadwood: 450 },

  enclosure: { money: 2791, stone: 783, carvings: 87, beer: 261 },

  greatbath: { money: 7820, brick: 980, beads: 196 },

  labyrinth: { money: 10250, blocks: 1280, unguent: 214 },

  rammedwall: { money: 13410, stone: 3352, ritualbronze: 447 },

  greatahu:  { money: 17550, stone: 4187, sennit: 514 },

  parthenon: { money: 22970, stone: 5480, oil: 400 },

  capitolium: { money: 30060, stone: 7170, silex: 360 },

  colosseum:  { money: 51480, concrete: 8580, marmor: 6435, velum: 2145 },

  murus:      { money: 85620, calx: 11330, arma: 8500, spolia: 2830 },

  hagiasophia:{ money: 132830, blocks: 9500, blattion: 900, calx: 5200 },
  ziggurat:  { money: 3600, clay: 900, beer: 300 },
  pyramid:   { money: 12000, clay: 2200, stone: 900 },
  templePyr: { money: 40000, stone: 3000, blocks: 1200 },
};

const MONUMENT_RATE = { money: 24, clay: 6, beer: 2, stone: 6, blocks: 3, pottery: 2, cloth: 1,
                        ochre: 6, charcoal: 2, carvings: 1,

                        gold: 1.06, deadwood: 3,

                        brick: 3, beads: 0.6,

                        unguent: 0.5, purplecloth: 0.3, saffron: 0.5,
                        olives: 4, tin: 1, bronze: 0.8,

                        ritualbronze: 0.8,

                        sennit: 1,

                        silex: 3,

                        epistyle: 3,

                        concrete: 4, marmor: 3, velum: 1 };

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

function supplyFree(s) {
  const st = s || (typeof G !== 'undefined' && G ? G.s : null);
  return TUNE.SUPPLY.freeRadius + TUNE.GIFT_SUPPLY_STEP * ((st && st.giftSupply) | 0);
}

function stapleCap(s) {
  const st = s || (typeof G !== 'undefined' && G ? G.s : null);
  return TUNE.OPSON.staple +
    TUNE.OPSON.giftStep * ((st && st.giftTable) | 0) +
    (st && st.policyPublicTable ? TUNE.OPSON.lawStaple : 0);
}

function exportMult(s) {
  const st = s || (typeof G !== 'undefined' && G ? G.s : null);
  return Math.min(0.90, TUNE.EXPORT_MULT + TUNE.GIFT_EXPORT_STEP * ((st && st.giftExport) | 0));
}

function mothballKeep(s) {
  const st = s || (typeof G !== 'undefined' && G ? G.s : null);
  return TUNE.MOTHBALL_UPKEEP * Math.pow(1 - TUNE.GIFT_KEEP_STEP, ((st && st.giftKeep) | 0));
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

  spoilgang:      { to: 'robbingcrew',       cost: 15200 , era: 17, label: "Robbing Crew" },
  stonewright:    { to: 'cuttingshed',       cost: 20770 , era: 17, label: "Cutting Shed" },
  stanhithe:      { to: 'blockstaithe',      cost: 18740 , era: 17, label: "Block Staithe" },
  bogpit:         { to: 'fendiggings',       cost: 15200 , era: 17, label: "Fen Diggings" },
  bloomhearth:    { to: 'shaftfurnace',      cost: 17840 , era: 17, label: "Shaft Furnace" },
  irenstall:      { to: 'irenbooth',         cost: 17190 , era: 17, label: "The Iren Booth" },
  calfcroft:      { to: 'vaccary',           cost: 23600 , era: 17, label: "The Vaccary" },
  copyingroom:    { to: 'scrivenry',         cost: 17840 , era: 17, label: "The Scrivenry" },
  quirestall:     { to: 'bookhoard',         cost: 26540 , era: 17, label: "The Book Hoard" },
  assart:         { to: 'openfield',         cost: 28260 , era: 17, label: "Open Field" },
  watermill:      { to: 'tidemill',          cost: 11840 , era: 17, label: "Tide Mill" },
  chepe:          { to: 'chepecross',        cost: 26640 , era: 17, label: "The Chepe Cross" },
  brewhouse:      { to: 'guesthall',         cost: 32100 , era: 17, label: "The Guest Hall" },
  sheeprun:       { to: 'wetherflock',       cost: 15200 , era: 17, label: "Wether Flock" },
  fullingshed:    { to: 'tenteryard',        cost: 12710 , era: 17, label: "Tenter Yard" },
  webbery:        { to: 'fairbooth',         cost: 20360 , era: 17, label: "Fair Booth" },
  pannage:        { to: 'swinepark',         cost: 21180 , era: 17, label: "The Swine Park" },
  cruive:         { to: 'yairdyke',          cost: 14300 , era: 17, label: "The Yair Dyke" },
  toft:           { to: 'aisledhouse',       cost: 17900 , era: 17, label: "The Aisled House" },
  thegnhall:      { to: 'bowerrange',        cost: 36750 , era: 17, label: "The Bower Range" },
  roofedcistern:  { to: 'leadenpipe',        cost: 8190  , era: 17, label: "The Leaden Pipe" },
  tappedaqueduct: { to: 'tappedhead',        cost: 7130  , era: 17, label: "The Tapped Head" },
  cornstead:      { to: 'cornkist',          cost: 5090  , era: 17, label: "Corn Kist" },
  packstation:    { to: 'drovestand',        cost: 12720 , era: 17, label: "Drove Stand" },
  sokebarn:       { to: 'grange',            cost: 38130 , era: 17, label: "The Grange" },
  mootgreen:      { to: 'hundredcourt',      cost: 5090  , era: 17, label: "The Hundred Court" },
  waysidechapel:  { to: 'preachingcross',    cost: 5730  , era: 17, label: "The Preaching Cross" },

  metaxeion:      { to: 'koukoularion',   cost:  9800, era: 16, label: 'The Koukoularion' },
  thracianplain:  { to: 'cornlands',      cost: 18220, era: 16, label: 'Bithynian Corn Lands' },
  naphthaseep:    { to: 'tappedfissure',  cost:  9800, era: 16, label: 'The Tapped Fissure' },
  proconnesus:    { to: 'marmarabeds',    cost: 25500, era: 16, label: 'The Marmara Beds' },
  thynneion:      { to: 'thynnoskopeion', cost:  9220, era: 16, label: 'The Thynnoskopeion' },
  serikarion:     { to: 'histourgeion',   cost: 11500, era: 16, label: 'The Histourgeion' },
  cheirosiphon:   { to: 'siphonfoundry',  cost: 11500, era: 16, label: 'Siphon Foundry' },
  horizmill:      { to: 'shipmills',      cost:  7630, era: 16, label: 'Moored Ship-Mills' },
  marmarion:      { to: 'hydropriston',   cost: 13390, era: 16, label: 'The Hydropriston' },
  vestiopration:  { to: 'vestiopratai',   cost: 17100, era: 16, label: 'Vestiopratai Exchange' },
  arsenalwharf:   { to: 'ploimon',        cost: 11090, era: 16, label: 'The Ploimon' },
  mankipeion:     { to: 'psomotheke',     cost: 17180, era: 16, label: 'The Psomotheke' },
  kommerkion:     { to: 'customsarcade',  cost:  4340, era: 16, label: 'Customs Arcade' },
  lithoskala:     { to: 'marbleslipways', cost: 12080, era: 16, label: 'Marble Slipways' },
  phiale:         { to: 'kinsterna',      cost:  2280, era: 16, label: 'The Kinsterna' },
  sitonikon:      { to: 'lamiavaults',    cost: 11430, era: 16, label: 'Lamia Grain Vaults' },
  mitaton:        { to: 'embolos',        cost: 12380, era: 16, label: 'Vaulted Embolos' },
  hippodrome:     { to: 'kathisma',       cost: 23930, era: 16, label: 'The Kathisma' },
  kommerkiarios:  { to: 'customsbasilica',cost:  9570, era: 16, label: 'Customs Basilica' },
  patriarchate:   { to: 'diakonia',       cost: 32540, era: 16, label: 'The Diakonia' },
  eparchate:      { to: 'sekreton',       cost: 34430, era: 16, label: 'The Sekreton' },
  oikema:         { to: 'xenodocheion',   cost:  4610, era: 16, label: 'The Xenodocheion' },
  peristylon:     { to: 'mesaulion',      cost: 11540, era: 16, label: 'The Mesaulion' },
  archontikon:    { to: 'kouropalation',  cost: 23690, era: 16, label: 'The Kouropalation' },

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

  sluicegate:     { to: 'kingsweir',        cost: 260,  era: 8, label: "King's Weir" },
  cutchannel:     { to: 'deepcut',          cost: 500,  era: 8, label: 'Twin Cut' },
  windlasswell:   { to: 'tiledcistern',     cost: 260,  era: 8, label: 'Lined Cistern' },
  tiledcistern:   { to: 'battercistern',    cost: 830,  era: 8, label: 'Battered Well-House' },
  pitgranary:     { to: 'sealedpit',        cost: 330,  era: 8, label: 'Sealed Pit Store' },
  timbergranary:  { to: 'platformgranary',  cost: 2100, era: 8, label: 'Platform Granary Range' },
  clanstore:      { to: 'sealedvault',      cost: 830,  era: 8, label: 'Sealed Tribute Vault' },
  bundedfield:    { to: 'terracedbund',     cost: 720,  era: 8, label: 'Levelled Bund Terrace' },
  milletfield:    { to: 'oxploughfield',    cost: 560,  era: 8, label: 'Ox-Plough Millet Strips' },
  mulberrygrove:  { to: 'pollardgrove',     cost: 1380, era: 8, label: 'Pollarded Mulberry Rows' },
  oreadit:        { to: 'lodegallery',      cost: 880,  era: 8, label: 'The Lode Gallery' },
  saltlakepan:    { to: 'brinepanrow',      cost: 660,  era: 8, label: 'Terraced Brine Pans' },
  stonequarry:    { to: 'rubbleface',       cost: 2480, era: 8, label: 'Benched Rubble Face' },
  apricotgrove:   { to: 'walledorchard',    cost: 620,  era: 8, label: 'Walled Fruit Garden' },
  riverweir:      { to: 'fishgarth',        cost: 880,  era: 8, label: 'The Fish Garth' },
  oxpens:         { to: 'royalherd',        cost: 1670, era: 8, label: 'Royal Herd Enclosure' },
  bonemidden:     { to: 'hornpits',         cost: 720,  era: 8, label: 'The Horn Pits' },
  loesspits:      { to: 'compostwalks',     cost: 380,  era: 8, label: 'The Compost Walks' },
  troughhammer:   { to: 'hammerrow',        cost: 690,  era: 8, label: 'Trip-Hammer Row' },
  pestleyard:     { to: 'mortargang',       cost: 690,  era: 8, label: 'Mortar Gang Yard' },
  aleshed:        { to: 'mashbrewhouse',    cost: 660,  era: 8, label: 'The Mash Brewhouse' },
  wormshed:       { to: 'tieredwormhouse',  cost: 750,  era: 8, label: 'Tiered Rearing House' },
  reelinghouse:   { to: 'filamenthall',     cost: 830,  era: 8, label: 'The Filament Hall' },
  patternloom:    { to: 'damaskloom',       cost: 1000, era: 8, label: 'Damask Frame Shed' },
  piecemould:     { to: 'sectionalfoundry', cost: 830,  era: 8, label: 'Sectional Casting Hall' },
  boilingshed:    { to: 'moundhearths',     cost: 610,  era: 8, label: 'Banked Boiling Hearths' },
  rammedyard:     { to: 'courseyard',       cost: 830,  era: 8, label: 'Coursed Tamping Yard' },
  bonecarver:     { to: 'inlayworkshop',    cost: 500,  era: 8, label: 'Turquoise-Inlay Workshop' },
  mealcounter:    { to: 'granarycourt',     cost: 1040, era: 8, label: 'The Granary Court' },
  silkhall:       { to: 'bolttreasury',     cost: 1340, era: 8, label: 'The Bolt Treasury' },
  bronzemarket:   { to: 'vesselhall',       cost: 990,  era: 8, label: 'Ritual Vessel Hall' },
  weighingfloor:    { to: 'saltcommission',   cost: 920,  era: 8, label: 'The Salt Commission' },
  alehall:        { to: 'libationhall',     cost: 920,  era: 8, label: 'Libation Hall' },
  wallworks:      { to: 'gangcommissary',   cost: 990,  era: 8, label: 'The Gang Commissary' },
  bonestall:      { to: 'awlcombrow',       cost: 920,  era: 8, label: 'Awl & Comb Row' },
  clanground:     { to: 'drumground',       cost: 330,  era: 8, label: 'Drum Ground' },
  cauldroncourt:  { to: 'lineagetemple',    cost: 1670, era: 8, label: 'Lineage Temple' },
  cowrietreasury: { to: 'standardhouse',    cost: 2070, era: 8, label: 'Standard-Weight House' },
  divinercourt:   { to: 'oraclearchive',    cost: 1460, era: 8, label: 'Oracle Bone Archive' },

  lopondfield:    { to: 'terraceflight',    cost: 720,  era: 9, label: 'Valley Terrace Flight' },
  coconutgrove:   { to: 'coconutwalk',      cost: 920,  era: 9, label: 'Coconut Walk' },
  waukegarden:    { to: 'waukestand',       cost: 780,  era: 9, label: 'Wauke Stand' },
  pearlbeds:      { to: 'diversreef',       cost: 780,  era: 9, label: "Diver's Reef" },
  adzequarry:     { to: 'basaltface',       cost: 3200, era: 9, label: 'The Basalt Face' },
  birdcatcher:    { to: 'fowlerstation',    cost: 860,  era: 9, label: "Fowler's Station" },
  breadfruitgrove:{ to: 'ulustand',         cost: 1780, era: 9, label: 'Ulu Stand' },
  reefstation:    { to: 'tidalweir',        cost: 1140, era: 9, label: 'Tidal Weir' },
  fishpond:       { to: 'kuapawall',        cost: 4800, era: 9, label: 'Kuapā Wall' },
  reefsaltpans:   { to: 'rakerflats',       cost: 860,  era: 9, label: "Rakers' Flats" },
  poipound:       { to: 'poiboards',        cost: 890,  era: 9, label: 'The Poi Boards' },
  sennithouse:    { to: 'cableloft',        cost: 1070, era: 9, label: 'Cable Loft' },
  tapahouse:      { to: 'beatersrow',       cost: 930,  era: 9, label: "Beaters' Row" },
  lurework:       { to: 'hookbench',        cost: 850,  era: 9, label: 'The Hook Bench' },
  adzeshed:       { to: 'bladefloor',       cost: 1250, era: 9, label: 'The Blade Floor' },
  featherhouse:   { to: 'plumeloft',        cost: 1600, era: 9, label: 'The Plume Loft' },
  haleaha:        { to: 'feastterrace',     cost: 1340, era: 9, label: 'The Feast Terrace' },
  cordagestall:   { to: 'coilyard',         cost: 1290, era: 9, label: 'The Coil Yard' },
  tapahall:       { to: 'kaparoom',         cost: 1710, era: 9, label: 'The Kapa Room' },
  strandstall:    { to: 'shorecounter',     cost: 750,  era: 9, label: 'The Shore Counter' },
  punawai:        { to: 'stonetank',        cost: 320,  era: 9, label: 'The Stone Tank' },
  mulchpit:       { to: 'ashbeds',          cost: 480,  era: 9, label: 'The Ash Beds' },
  halau:          { to: 'halemua',          cost: 440,  era: 9, label: "Hale Mua (Men's House)" },
  reefshrine:     { to: 'pointheiau',       cost: 480,  era: 9, label: 'The Point Heiau' },
  adzestandard:   { to: 'tradestones',      cost: 2670, era: 9, label: 'The Trade Stones' },
  imu:            { to: 'kaluapits',        cost: 1290, era: 9, label: 'Kālua Pits' },
  halepaa:        { to: 'halewaa',          cost: 1070, era: 9, label: 'Hale Waʻa (Canoe House)' },
  gourdstore:     { to: 'ipurack',          cost: 440,  era: 9, label: 'Ipu Rack' },
  canoelanding:   { to: 'haulingslipway',   cost: 3210, era: 9, label: 'The Hauling Slipway' },
  wayfindingcourt:{ to: 'starcompass',      cost: 2670, era: 9, label: 'The Star Compass' },
  coralcauseway:  { to: 'basaltmole',       cost: 650,  era: 9, label: 'The Basalt Mole' },

  olivegrove:     { to: 'moriai',            cost: 1040, era: 10, label: 'The Moriai' },
  figterrace:     { to: 'sykeon',            cost: 2320, era: 10, label: 'The Sykeon' },
  lentilplot:     { to: 'fallowrotation',    cost: 920,  era: 10, label: 'The Fallow Rotation' },
  slipway:        { to: 'neosoikoi',         cost: 1480, era: 10, label: 'The Neosoikoi' },
  marblequarry:   { to: 'hymettosface',      cost: 4120, era: 10, label: 'The Hymettos Face' },
  vineyard:       { to: 'trellisrows',       cost: 1200, era: 10, label: 'The Trellis Rows' },
  kolonosclay:    { to: 'puddlingfloors',    cost: 1020, era: 10, label: 'The Puddling Floors' },
  laurion:        { to: 'maroneiaworkings',  cost: 2760, era: 10, label: 'The Maroneia Workings' },
  trapetum:       { to: 'presscourt',        cost: 1290, era: 10, label: 'The Press Court' },
  donkeymill:     { to: 'bakersrow',         cost: 1150, era: 10, label: 'The Bakers’ Row' },
  lenos:          { to: 'treadingvats',      cost: 1380, era: 10, label: 'The Treading Vats' },
  kerameikos:     { to: 'redfigureworks',    cost: 1200, era: 10, label: 'The Red-Figure Works' },
  marbleworks:    { to: 'columndrums',       cost: 2450, era: 10, label: 'The Column Drums' },
  washingtables:  { to: 'thorikosworks',     cost: 1800, era: 10, label: 'The Thorikos Works' },
  skimminghearths:     { to: 'lithargehearths',   cost: 2300, era: 10, label: 'The Litharge Hearths' },
  agora:          { to: 'sitopolion',        cost: 1730, era: 10, label: 'The Sitopolion' },
  oilmerchant:    { to: 'amphorayard',       cost: 2000, era: 10, label: 'The Amphora Yard' },
  kapeleion:      { to: 'symposion',         cost: 2210, era: 10, label: 'The Symposion' },
  kylixrow:       { to: 'panathenaicprizes', cost: 1650, era: 10, label: 'The Panathenaic Prizes' },
  silverstoa:     { to: 'argyrokopeion',     cost: 2490, era: 10, label: 'The Argyrokopeion' },

  emporion:       { to: 'cornroute',         cost: 2300, era: 10, label: 'The Corn Route' },
  krene:          { to: 'nymphaeum',         cost: 420,  era: 10, label: 'The Nymphaeum' },
  publiccistern:  { to: 'klepsydra',         cost: 1380, era: 10, label: 'The Klepsydra' },
  pithoi:         { to: 'hypogeion',         cost: 560,  era: 10, label: 'The Hypogeion' },
  stoa:           { to: 'piraeussheds',      cost: 1380, era: 10, label: 'The Piraeus Sheds' },
  agorasquare:    { to: 'orchestra',         cost: 560,  era: 10, label: 'The Orchestra' },
  peribolos:      { to: 'analemma',          cost: 620,  era: 10, label: 'The Analemma' },
  mole:           { to: 'diolkos',           cost: 830,  era: 10, label: 'The Diolkos' },
  bouleuterion:   { to: 'tholos',            cost: 2420, era: 10, label: 'The Tholos' },
  palaestra:      { to: 'xystos',            cost: 620,  era: 10, label: 'The Xystos' },
  deigma:         { to: 'metronomoi',        cost: 3450, era: 10, label: 'The Metronomoi' },
  metroon:        { to: 'anagrapheis',       cost: 1380, era: 10, label: 'The Anagrapheis' },

  hyle:               { to: 'xylagogia',        cost: 1960, era: 12, label: 'The Xylagogia' },
  neorion:            { to: 'naustathmos',      cost: 3890, era: 12, label: 'The Naustathmos' },
  arvum:              { to: 'iugera',           cost: 1180, era: 11, label: 'The Iugera' },
  molaasinaria:       { to: 'turningfloor',     cost: 1480, era: 11, label: 'The Turning Floor' },
  macellum:           { to: 'nundinae',         cost: 2220, era: 11, label: 'The Nundinae' },
  hortus:             { to: 'olitores',         cost: 1180, era: 11, label: 'The Olitores' },
  forumholitorium:    { to: 'cuppedinis',       cost: 1230, era: 11, label: 'The Cuppedinis' },
  vivarium:           { to: 'nassae',           cost: 1900, era: 11, label: 'The Nassae' },
  salinae:            { to: 'campiostienses',   cost: 2860, era: 11, label: 'The Campi Ostienses' },
  salsamentaria:      { to: 'garumvats',        cost: 1540, era: 11, label: 'The Garum Vats' },
  forumpiscarium:     { to: 'velabrum',         cost: 2130, era: 11, label: 'The Velabrum' },
  ovile:              { to: 'saltus',           cost: 2320, era: 11, label: 'The Saltus' },
  fullonica:          { to: 'sulphurhouse',     cost: 1780, era: 11, label: 'The Sulphur House' },
  tabernavestiaria:   { to: 'togaria',          cost: 2850, era: 11, label: 'The Togaria' },
  cretifodina:        { to: 'puteolibeds',      cost: 1320, era: 11, label: 'The Puteoli Beds' },
  officinategularia:  { to: 'imbrexworks',      cost: 1540, era: 11, label: 'The Imbrex Works' },
  mercatustegularum:  { to: 'portustiberinus',  cost: 2130, era: 11, label: 'The Portus Tiberinus' },
  silicaria:          { to: 'lapisalbanus',     cost: 5320, era: 11, label: 'The Lapis Albanus' },
  officinasilicis:    { to: 'nucleusbeds',      cost: 3160, era: 11, label: 'The Nucleus Beds' },
  crepidines:         { to: 'milliaria',        cost: 2580, era: 11, label: 'The Milliaria' },
  lacus:              { to: 'fonspublicus',     cost: 540,  era: 11, label: 'The Fons Publicus' },
  piscinalimaria:     { to: 'favissae',         cost: 1790, era: 11, label: 'The Favissae' },
  doliarium:          { to: 'cellapenaria',     cost: 720,  era: 11, label: 'The Cella Penaria' },
  porticusaemilia:    { to: 'horreagalbana',    cost: 1790, era: 11, label: 'The Horrea Galbana' },
  saepta:             { to: 'campusmartius',    cost: 720,  era: 11, label: 'The Campus Martius' },
  sterquilinium:      { to: 'fimetum',          cost: 800,  era: 11, label: 'The Fimetum' },
  tabularium:         { to: 'libraria',         cost: 3600, era: 11, label: 'The Libraria' },
  aerarium:           { to: 'quaestorium',      cost: 3210, era: 11, label: 'The Quaestorium' },
  basilica:           { to: 'porticusmetelli',  cost: 800,  era: 11, label: 'The Porticus Metelli' },
  moneta:             { to: 'argentaria',       cost: 4460, era: 11, label: 'The Argentaria' },
  ponssublicius:      { to: 'pilaesaxeae',      cost: 1070, era: 11, label: 'The Pilae Saxeae' },
  stabulum:           { to: 'hospitium',        cost: 1170, era: 11, label: 'The Hospitium' },

  kleros:             { to: 'dorea',            cost: 1520, era: 12, label: 'The Dorea' },
  hydromylos:         { to: 'aletrion',         cost: 1910, era: 12, label: 'The Aletrion' },
  artopolion:         { to: 'thermopolion',     cost: 2870, era: 12, label: 'The Thermopolion' },
  paradeisos:         { to: 'opora',            cost: 1520, era: 12, label: 'The Opora' },
  lachanopolion:      { to: 'pantopolion',      cost: 1580, era: 12, label: 'The Pantopolion' },
  mareotis:           { to: 'sagenai',          cost: 2460, era: 12, label: 'The Sagenai' },
  natronflats:        { to: 'nitrai',           cost: 3680, era: 12, label: 'The Nitrai' },
  hyalourgeion:       { to: 'physeterion',      cost: 1990, era: 12, label: 'The Physeterion' },
  hyalopolion:        { to: 'skeuotheke',       cost: 2750, era: 12, label: 'The Skeuotheke' },
  aipolion:           { to: 'epinomia',         cost: 3000, era: 12, label: 'The Epinomia' },
  diphtheron:         { to: 'xysterion',        cost: 2300, era: 12, label: 'The Xysterion' },
  chartopoleion:      { to: 'kalligrapheion',   cost: 3680, era: 12, label: 'The Kalligrapheion' },
  latomia:            { to: 'metallon',         cost: 6860, era: 12, label: 'The Metallon' },
  lithoxoeion:        { to: 'glypheion',        cost: 4080, era: 12, label: 'The Glypheion' },
  dromos:             { to: 'tetrapylon',       cost: 3330, era: 12, label: 'The Tetrapylon' },
  pissopolion:        { to: 'kadoi',            cost: 1470, era: 12, label: 'The Kadoi' },
  hydreion:           { to: 'krounion',         cost: 690,  era: 12, label: 'The Krounion' },
  dexamene:           { to: 'phrear',           cost: 2300, era: 12, label: 'The Phrear' },
  thesauros:          { to: 'stamnoi',          cost: 930,  era: 12, label: 'The Stamnoi' },
  apotheke:           { to: 'tameion',          cost: 2300, era: 12, label: 'The Tameion' },
  katagogion:         { to: 'pandokeion',       cost: 1520, era: 12, label: 'The Pandokeion' },
  plateia:            { to: 'stadion',          cost: 930,  era: 12, label: 'The Stadion' },
  kopron:             { to: 'chomation',        cost: 1020, era: 12, label: 'The Chomation' },
  bibliotheke:        { to: 'serapeion',        cost: 4650, era: 12, label: 'The Serapeion' },
  trapeza:            { to: 'basilikon',        cost: 4140, era: 12, label: 'The Basilikon' },
  gymnasion:          { to: 'ephebeion',        cost: 1020, era: 12, label: 'The Ephebeion' },
  agoranomion:        { to: 'sekoma',           cost: 5750, era: 12, label: 'The Sekoma' },
  heptastadion:       { to: 'gephyra',          cost: 1380, era: 12, label: 'The Gephyra' },

  centuria:           { to: 'latifundium',      cost: 7060,  era: 13, label: 'Latifundium' },
  pomarium:           { to: 'ficulnea',         cost: 1380,  era: 13, label: 'Ficulnea' },
  lucrinum:           { to: 'ostrearia',        cost: 2380,  era: 13, label: 'Ostrearia' },
  olivetum:           { to: 'praedium',         cost: 5800,  era: 13, label: 'Praedium' },
  argilla:            { to: 'cretaria',         cost: 3800,  era: 13, label: 'Cretaria' },
  lapicidina:         { to: 'lautumiae',        cost: 9880,  era: 13, label: 'Lautumiae' },
  pozzolana:          { to: 'harenaria',        cost: 3800,  era: 13, label: 'Harenaria' },
  plumbaria:          { to: 'cuniculus',        cost: 8840,  era: 13, label: 'Cuniculus' },
  linarius:           { to: 'agercumanus',      cost: 5800,  era: 13, label: 'Ager Cumanus' },

  pistrinum:          { to: 'barbegal',         cost: 2960,  era: 13, label: 'Barbegal Cascade' },
  torcularium:        { to: 'prelum',           cost: 4180,  era: 13, label: 'Prelum' },
  figlina:            { to: 'mufflekiln',       cost: 3080,  era: 13, label: 'Muffle Kiln' },
  marmoraria:         { to: 'serraaquaria',     cost: 5260,  era: 13, label: 'Serra Aquaria' },
  caementicia:       { to: 'calcaria',         cost: 3080,  era: 13, label: 'Fornax Calcaria' },
  ustrina:            { to: 'cupella',          cost: 4710,  era: 13, label: 'Cupella' },
  textrinum:          { to: 'linteonum',        cost: 4180,  era: 13, label: 'Linteonum' },

  panificium:         { to: 'porticusminucia',  cost: 4440,  era: 13, label: 'Porticus Minucia' },
  olearia:            { to: 'testaceus',     cost: 6630,  era: 13, label: 'Mons Testaceus' },
  officinasamia:      { to: 'sigillariae',      cost: 4250,  era: 13, label: 'Sigillariae' },
  statuaria:          { to: 'statiomarmorum',   cost: 4290,  era: 13, label: 'Statio Marmorum' },
  fistularia:         { to: 'statioplumbi',     cost: 4680,  era: 13, label: 'Statio Plumbi' },
  armamentarium:      { to: 'velariorum',       cost: 6630,  era: 13, label: 'Corpus Velariorum' },

  thermae:            { to: 'natatio',          cost: 5270,  era: 13, label: 'Natatio' },
  atriumlibertatis:   { to: 'templumpacis',     cost: 14820, era: 13, label: 'Templum Pacis' },
  horreum:            { to: 'piperataria',      cost: 10800, era: 13, label: 'Horrea Piperataria' },
  castellum:          { to: 'septemcellae',     cost: 2960,  era: 13, label: 'Septem Cellae' },
  puteus:             { to: 'salientes',        cost: 890,   era: 13, label: 'Salientes' },
  stercorarium:       { to: 'margarium',        cost: 2630,  era: 13, label: 'Margarium' },
  columna:            { to: 'tropaeum',         cost: 740,   era: 13, label: 'Tropaeum' },

  statioannonae:      { to: 'praefectura',      cost: 3360,  era: 13, label: 'Praefectura Annonae' },
  navicularium:       { to: 'traiani',         cost: 7170,  era: 13, label: 'Portus Traiani' },

  iugatio:            { to: 'possessio',        cost: 11740, era: 15, label: 'Possessio' },
  pascua:             { to: 'compascuum',       cost: 9640,  era: 15, label: 'Compascuum' },
  ferraria:           { to: 'ferrifodina',      cost: 6320,  era: 15, label: 'Ferrifodina' },
  ruderatio:          { to: 'demolitio',        cost: 6320,  era: 15, label: 'Demolitio' },
  saxifodina:         { to: 'caesura',          cost: 16440, era: 15, label: 'Caesura' },
  oleastrum:          { to: 'arbustum',         cost: 4600,  era: 15, label: 'Arbustum' },
  piscatio:           { to: 'excipula',         cost: 5940,  era: 15, label: 'Excipula' },

  aquimolae:          { to: 'catillus',         cost: 4920,  era: 15, label: 'Catillus' },
  gynaeceum:          { to: 'textoria',         cost: 6950,  era: 15, label: 'Textoria' },
  fabrica:            { to: 'scutaria',         cost: 7410,  era: 15, label: 'Scutaria' },
  caminus:            { to: 'fornacula',        cost: 7410,  era: 15, label: 'Fornacula' },
  lapidaria:          { to: 'sectilia',         cost: 8630,  era: 15, label: 'Sectilia' },

  catabolum:          { to: 'annonaria',        cost: 11070, era: 15, label: 'Annonaria' },
  vestiarium:         { to: 'emporiumvestium',  cost: 11030, era: 15, label: 'Emporium Vestium' },
  praebitorium:       { to: 'sagittaria',       cost: 7140,  era: 15, label: 'Sagittaria' },
  structoris:         { to: 'redemptorum',      cost: 7070,  era: 15, label: 'Redemptorum' },
  ripamarmorata:      { to: 'navalia',          cost: 7790,  era: 15, label: 'Navalia' },
  penuaria:           { to: 'cupedinaria',      cost: 2790,  era: 15, label: 'Cupedinaria' },

  aquavetus:          { to: 'rivusherculaneus', cost: 7370,  era: 15, label: 'Rivus Herculaneus' },
  fontinalis:         { to: 'specus',           cost: 1470,  era: 15, label: 'Specus' },
  mansio:             { to: 'stativa',          cost: 7980,  era: 15, label: 'Stativa' },
  granarium:          { to: 'condita',          cost: 2000,  era: 15, label: 'Condita' },
  bubile:             { to: 'laetamen',         cost: 4370,  era: 15, label: 'Laetamen' },
  curator:            { to: 'collegiumfabrum',  cost: 8390,  era: 15, label: 'Collegium Fabrum' },
  ecclesia:           { to: 'episcopium',       cost: 22190, era: 15, label: 'Episcopium' },
  scrinium:           { to: 'notitia',          cost: 6170,  era: 15, label: 'Notitia' },
  castrum:            { to: 'burgus',           cost: 29580, era: 15, label: 'Burgus' },
  cippus:             { to: 'terminus',         cost: 1230,  era: 15, label: 'Terminus' },
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

  { kind: 'ram',      icon: '\u{1F3D4}\u{FE0F}', name: 'Ram (+1)' },
  { kind: 'cut',      icon: '\u{26CF}\u{FE0F}', name: 'Cut (−1)' },
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

  {
    const M = TUNE.MUNUS;
    const want = M.relief / ((1 - M.relief) * M.crossoverMin);
    if (Math.abs(M.per - want) > want * 0.01)
      say('TUNE.MUNUS.per is ' + M.per + ' but relief ' + M.relief + ' and crossoverMin ' +
          M.crossoverMin + ' derive ' + want.toFixed(6) + ' — the tip would print a crossover ' +
          'the arithmetic does not honour');
  }

  for (const k in BUILDINGS) {
    const d = BUILDINGS[k];
    if (d.onRuin && d.out && !d.salvaged)
      say(k + ' declares onRuin and emits a good but is not `salvaged` — it would work an ' +
          'infinite ruin field through the generic tail');
    if (d.salvaged && !d.out)
      say(k + ' is `salvaged` but emits nothing — the flag has no branch to reach');
  }

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
      if (d.salvaged) continue;
      if (d.out) for (const g in d.out) if (quarriedGoods.has(g))
        say(k + ' emits "' + g + '", which quarried buildings take out of the finite ROCK ledger, ' +
            'but is neither `quarried` nor `salvaged` — it would mint that good out of nothing');
    }

    for (const k in BUILDINGS)
      if (BUILDINGS[k].quarried && QUARRIED.indexOf(k) < 0)
        say(k + ' sets quarried in its own def literal but is not on the QUARRIED roster — ' +
            'the roster is the single source and twelve comments in this file say so');
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

const ERA_FOOD_LABEL = { 10: 'Bread, figs, pulses and fish this age',
  17: 'Meal, pork and fish this age',

  16: 'Bread and fish GROWN this age',

                         15: 'Bread, olives and fish GROWN this age',

                         13: 'Fish, figs and farina GROWN this age',

                         11: 'Farina, greens and fish this age',
                         12: 'Aleuron, greens and fish this age',
  7: 'Meal issued this age',
                         0: 'Forage laid down this age',
                         1: 'Food put by this age', 2: 'Rations milled this age',
                         3: 'Food gathered this age',
                         4: 'Flour milled this age',
                         5: 'Flour milled this age',
                         6: 'Flour milled this age',

                         8: 'Meal husked this age',

                         9: 'Poi pounded this age', 14: 'Food ground this age' };
function eraFoodLabel(era) { return ERA_FOOD_LABEL[rungOf(era)] || 'Food produced this age'; }

const ERA_VOICE = {
  17: {

    settlers: ['Wulfric', 'Eadgyth', 'Cuthbert', 'Aelfwyn', 'Osric', 'Hild'],
    place: 'vill',
    mill: 'Leat Mill',
    tally: 'The Moot Green',
    tallyLine: 'The reeve has begun the count on the moot green. There is no clerk in this vill, ' +
      'so the tally is a stick and a memory — and now you can read your own numbers.',
    ration: 'The founding stores are finished — the last of the carried grain is handed out.',
    saltName: 'an assart cropped back to scrub',
    saltAnswers: 'let the field lie fallow — and note that the PANNAGE WOOD and THE CRUIVE owe the ' +
      'ground nothing at all, because a pig eats acorns and a fish does not need a field',
  },

  16: {
    settlers: ['Anna', 'Theodoros', 'Eirene', 'Nikephoros', 'Zoe', 'Bardas'],
    place: 'city',
    mill: 'Horizontal Water Mill',
    tally: "The Kommerkiarios' Scale",
    tallyLine: 'The sealed weights come out and the ledger is read across. Every shop in reach is ' +
      'checked against the Book — and now you can see exactly what this city is licensed for.',
    ration: 'The last of the Genoese grain is issued. No fleet is coming; the city eats Thrace.',
    saltName: 'a thousand years of the same furrow behind the same walls',
    saltAnswers: 'a METAXEION, which ignores the salt clock entirely and yields MORE on ground the ' +
      'wheat has killed, or a spell fallow -- and note that painting a tile fertile buys the BONUS, ' +
      'never the soil',
  },

  15: {
    settlers: ['Aurelia', 'Victorinus', 'Sabina', 'Maximus', 'Placidia', 'Faustinus'],
    place: 'city',
    mill: 'Aquimolae',
    tally: 'The Scrinium',
    tallyLine: 'The Scrinium is reopened and the assessment rolls are read out. The census is ' +
      're-taken — and now you can see exactly what this city costs.',
    ration: 'The last of the annona is issued. No ship is coming; the city eats what it grows.',
    saltName: 'four hundred years of the same crop in the same furrow',
    saltAnswers: 'a BUBILE in range (x3 recovery), a spell fallow, or an OLEASTRUM, which ignores ' +
      'the salt clock entirely and thrives on the ground the wheat killed -- and note that ' +
      'painting a tile fertile buys the BONUS, never the soil',
  },

  10: {
    settlers: ['Kleito', 'Demetrios', 'Myrrhine', 'Aristion', 'Thargelia', 'Philon'],
    place: 'city',
    mill: 'Donkey Mill',
    tally: 'The Metroon',
    tallyLine: 'The Metroon is open and the accounts are cut in stone — an Athenian city ' +
      'audits its own officials, and now you can audit yours.',
    ration: 'The settlers’ issue is finished — the last of the founding wheat is measured out.',
    saltName: 'thin ground getting thinner',

    saltAnswers: 'a PERIBOLOS WALL in range (×3 recovery), or OLIVE GROVES and ' +
      'FIG TERRACES, which want the ground the fields ruined — and note that this city does ' +
      'not grow its own bread anyway',
  },

  11: {
    settlers: ['Marcus', 'Fulvia', 'Quintus', 'Tertia', 'Publius', 'Vibia'],
    place: 'city',
    mill: 'Mola Asinaria',
    tally: 'The Tabularium',
    tallyLine: 'The Tabularium is open and the tabulae are in the vaults — the censors can find ' +
      'any household in the city in an afternoon, and a census costs you a quarter less a head.',
    ration: 'The settlers’ issue is finished — the last of the founding far is measured out.',
    saltName: 'ground going sour under the plough',

    saltAnswers: 'a STERQUILINIUM in range (×3 recovery — Cato tells you how big to build it), ' +
      'or an OVILE, which takes its +50% on exactly the ground the ploughland ruined',
  },

  13: {
    settlers: ['Verecundus', 'Lucilla', 'Faustinus', 'Severa', 'Candidus', 'Postuma'],
    place: 'city',
    mill: 'Pistrinum',
    tally: 'The Atrium Libertatis',
    tallyLine: 'The Atrium Libertatis is opened and the censors let the contracts -- the city ' +
      'can read its own accounts now, down to the last modius that came off a ship.',
    ration: 'The founding grant is spent -- the last of the state grain goes out at the Pistrinum.',
    saltName: 'ground worked out under continuous cropping',
    saltAnswers: 'a STERCORARIUM in range (x3 recovery), or simply rest the square -- and note ' +
      'that a rested square grows nothing, which at this rung is a bill rather than a pause',
  },
  12: {
    settlers: ['Sostratos', 'Berenike', 'Kleitos', 'Arsinoe', 'Demetrios', 'Lysandra'],
    place: 'foundation',
    mill: 'Hydromylos',
    tally: 'The Bibliotheke',
    tallyLine: 'The Bibliotheke is open and the shelves are catalogued — every ship that puts in ' +
      'is copied before it leaves, and the clerks can find any record in the city in an afternoon.',
    ration: 'The founding issue is finished — the last of the sitos the fleet landed with is ' +
      'measured out.',
    saltName: 'ground going sour under the plough',
    saltAnswers: 'a KOPRON in range (×3 recovery), or an AIPOLION, which takes its +50% on ' +
      'exactly the ground the allotment ruined',
  },
  0: {

    settlers: ['Ash-Back', 'Two-Notch', 'Long-Stride', 'Mud-Foot', 'Reed-Hand', 'Far-Walker'],

    place: 'camp',
    mill: 'The Drying Lawn',
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
  8: {

    settlers: ['Bin', 'Zheng', 'Que', 'Xing', 'Li', 'Chu'],
    place: 'city',

    mill: 'Pestle Yard',
    tally: "Diviner's Court",
    tallyLine: 'The plastron is scored, heated until it cracks, and then written on beside the crack. ' +
      'The state has a memory now — and so do your accounts.',
    ration: 'The founding tribute is finished — the last of the stored millet is issued.',
    saltName: 'the loess going white under the millet',

    saltAnswers: 'LOESS MANURE PITS in range (×3 recovery), a spell fallow — the strip will rest ' +
      'itself if you leave it — or plant an APRICOT ORCHARD, which ignores the salt clock entirely. ' +
      'A BUNDED RICE FIELD never salts its ground either, but it wants a gate above it and the ' +
      'millet is up on the loess',
  },

  9: {
    settlers: ['Line-Holder', 'Reef-Walker', 'Bark-Beater', 'Star-Reader', 'Ramp-Hand', 'Pond-Keeper'],
    place: 'village',
    mill: 'Poi Pounding Shed',
    tally: "Konohiki's House",
    tallyLine: 'The steward can name every terrace on the wedge, what it grew last year and who owes ' +
      'days on it — and nothing of it is written down. The account is a person.',
    ration: 'The founding stores are finished — the last of the carried taro is pounded out.',
    saltName: 'the terraces going brackish where the sea gets in',

    saltAnswers: 'a MULCH PIT in range (×3 recovery — banana trash, seaweed and ash), a spell fallow, ' +
      'or plant a BREADFRUIT GROVE, which ignores the salt clock entirely and yields +50% on ground ' +
      'already gone brackish. A WAUKE GARDEN sours a terrace at HALF the taro rate, so cloth is what ' +
      'belongs on ground you have half spent',
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
  17: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Corn', cookedName: 'Meal',
    cookedVerb: 'milled', rawFrom: 'the assarts',
    rawNote: 'the leat mills draw on it before the brewhouses do',
    shortNote: 'Every chain adds mouths and no meal — assart a field and set a Leat Mill turning, ' +
      'or turn pigs into the oaks and set a cruive in the stream.',
    hungerFix: 'assart a field and set a Leat Mill turning, or put a Pannage Wood in the oaks',
    goodNames: { grain: 'Corn', flour: 'Meal', stone: 'Spolia', blocks: 'Dressed Blocks',
                 bogore: 'Bog Ore', iron: 'Bar Iron', pergamena: 'Parchment', codex: 'Codices',
                 pork: 'Pork', wool: 'Fleece', cloth: 'Cloth', beer: 'Ale' },
  },

  16: {
    raw: 'grain', cooked: 'flour', rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Grain', cookedName: 'Bread', cookedVerb: 'milled',
    rawFrom: 'the Thracian plain',
    rawNote: 'the mills always draw before anything else',
    shortNote: 'Every licence adds mouths and only one chain adds bread -- set a THYNNEION across the ' +
      'current. It needs no field, no mill, no water coverage and NO LICENCE, so it is the one food ' +
      'the Eparch cannot touch.',
    hungerFix: 'set a Thynneion in the strait, or plough the Thracian Plain and put a mill on the water',
    goodNames: {
      flour: 'Bread', fish: 'Fish', grain: 'Grain',
      cocoon: 'Cocoons', blattion: 'Imperial Silk', naphtha: 'Naphtha',
      greekfire: 'Greek Fire', blocks: 'Dressed Marble', stone: 'Marble',
    },
  },

  15: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Grain', cookedName: 'Bread',
    cookedVerb: 'milled', rawFrom: 'the squared fields',
    rawNote: 'the mills always draw before anything else',
    shortNote: 'Every chain adds mouths and only one adds bread -- plant OLEASTRA. They need no ' +
      'water, no road and no upkeep, so they are the one food a failing ledger cannot take away.',
    hungerFix: 'plant an Oleastrum, or sow a Iugatio and set an Aquimolae grinding',
    goodNames: { flour: 'Bread', dates: 'Olives', spolia: 'Spolia', calx: 'Lime',
                 arma: 'Arms', iron: 'Iron', blocks: 'Dressed Stone' },
  },

  10: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '🌾', cookedIcon: '🍞',
    rawName: 'Wheat', cookedName: 'Bread',
    cookedVerb: 'milled',
    rawFrom: 'the quays',
    rawNote: 'it is BOUGHT, not grown — the Emporion pays for Pontic wheat in olive oil, ' +
      'and a Greek table is only half bread anyway',
    shortNote: 'Bread is HALF a table here and never more, however full the granary is. ' +
      'The other half is figs, pulses and fish — see the ⚖️ chip for which leg is short.',
    hungerFix: 'look at the ⚖️ chip and build the leg it names — a FIG TERRACE or a BEAN & ' +
      'LENTIL PLOT needs no water, no road and nothing off a quay, and either closes a whole ' +
      'quarter of the table',
    goodNames: { grain: 'Wheat', flour: 'Bread', dates: 'Figs', forage: 'Pulses',
                 fish: 'Fish', stone: 'Marble', blocks: 'Dressed Marble', oil: 'Olive Oil',
                 olives: 'Olives' },
  },

  11: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Far', cookedName: 'Farina',
    cookedVerb: 'milled',
    rawFrom: 'the ploughlands',
    rawNote: 'and it is GROWN here, not landed — an Arvum needs no water, no road and nothing ' +
      'from anybody, which is the whole reason the founding crew can work one on tick one',
    shortNote: 'The city eats what it grows and BUYS what it eats. A shop sells only to citizens ' +
      'the last census counted — see the 🏛️ chip for the gap.',
    hungerFix: 'plough another ARVUM, or sow a HORTUS — the kitchen garden needs no water, no ' +
      'road and nothing off a quay, and it feeds at 80% of bread',
    goodNames: { grain: 'Far', flour: 'Farina', forage: 'Greens', fish: 'Fish',
                 salt: 'Sal', salsamentum: 'Salsamentum', wool: 'Lana', cloth: 'Cloth',
                 clay: 'Creta', tegula: 'Tegulae', stone: 'Silex', silex: 'Dressed Silex' },
  },

  13: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F956}',
    rawName: 'Frumentum', cookedName: 'Farina',
    cookedVerb: 'milled',
    rawFrom: 'the centuriated squares',
    rawNote: 'and the squares are not enough and never will be -- what the city cannot grow it ' +
      'BUYS, at a price that climbs with the number of mouths. Watch the \u{1F33E} chip',
    shortNote: 'Every chain you add adds mouths. The bread you bake is SOLD; what the city eats ' +
      'comes off the ponds, the orchards and the grain fleet. Land more, or grow slower.',
    hungerFix: 'sow another CENTURIATED FIELD, hang a POMARIUM on the dry ground, or -- the ' +
      'answer this age is actually about -- build a STATIO ANNONAE and land more of it',
    goodNames: { grain: 'Frumentum', flour: 'Farina', dates: 'Figs', fish: 'Fish',
                 olives: 'Olives', oil: 'Oil', clay: 'Clay', sigillata: 'Samian',
                 stone: 'Travertine', marmor: 'Marble', pozzolana: 'Pozzolana',
                 concrete: 'Concrete', galena: 'Galena', plumbum: 'Lead',
                 linum: 'Flax', velum: 'Sailcloth' },
  },
  12: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35E}',
    rawName: 'Sitos', cookedName: 'Aleuron',
    cookedVerb: 'milled',
    rawFrom: 'the allotments',
    rawNote: 'and it is GROWN here, not landed — a Kleros needs no water, no road and nothing ' +
      'from anybody, which is the whole reason the founding crew can work one on tick one',
    shortNote: 'The city eats what it grows. WHAT IT CANNOT GROW IS PEOPLE — every citizen ' +
      'arrives on a crossing the yards built. Watch the \u{26F5} chip.',
    hungerFix: 'plough another KLEROS, or plant a PARADEISOS — the walled garden needs no water, ' +
      'no road and nothing off a quay, and it feeds at 80% of bread',
    goodNames: { grain: 'Sitos', flour: 'Aleuron', forage: 'Greens', fish: 'Fish',
                 hide: 'Skins', pergamena: 'Pergamene', natron: 'Natron', glass: 'Hyalos',
                 stone: 'Stone', epistyle: 'Courses', bitumen: 'Pine Resin',
                 passage: 'Crossings' },
  },

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

    rawName: 'Frond', cookedName: 'Fern Meal',
    cookedVerb: 'laid down', rawFrom: 'the fern prairies',
    rawNote: 'the Clutch Mounds draw on it too, and only one of the two feeds anyone',
    shortNote: 'Every chain you add brings mouths and no fronds — add prairies and a Lawn, or plant a ' +
      'Magnolia Thicket, which needs nothing at all.',
    hungerFix: 'lay out a Fern Prairie and a Drying Lawn, or plant a Magnolia Thicket',

    goodNames: { grain: 'Frond', flour: 'Fern Meal', clay: 'Marl', pottery: 'Chalk',
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
  8: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33E}', cookedIcon: '\u{1F35A}',
    rawName: 'Millet', cookedName: 'Meal',
    cookedVerb: 'husked', rawFrom: 'the millet strips and the bunded fields',
    rawNote: 'the pestle yards draw on it before the ale sheds do',
    shortNote: 'Each chain adds mouths and no meal — sow more MILLET FIELDS, or plumb another ' +
      'BUNDED FIELD, or fall back on the orchard and the weir.',
    hungerFix: 'sow a Millet Field and set a Pestle Yard grinding — neither wants a drop of head',

    goodNames: { grain: 'Millet', flour: 'Meal', dates: 'Apricots', bone: 'Scapulae',
                 carvings: 'Bone Work', stone: 'Rubble', blocks: 'Rammed Courses',
                 beer: 'Millet Ale', salt: 'Pan Salt' },
  },

  9: {
    raw: 'grain', cooked: 'flour',
    rawIcon: '\u{1F33F}', cookedIcon: '\u{1F35A}',
    rawName: 'Taro', cookedName: 'Poi',
    cookedVerb: 'pounded', rawFrom: 'the loʻi terraces',
    rawNote: 'nothing else in this age eats taro — there is no brewery and no ale here',
    shortNote: 'Each chain adds mouths and no poi — dig more LOʻI PONDFIELDS and set a POUNDING SHED ' +
      'going, or fall back on the BREADFRUIT GROVE and the reef, which need no spring at all.',
    hungerFix: 'plant a Breadfruit Grove — it wants no spring, no road and no shed — and dig a Loʻi ' +
      'Pondfield with a Pounding Shed beside it for the long run',
    goodNames: { grain: 'Taro', flour: 'Poi', dates: 'Breadfruit', stone: 'Basalt',
                 salt: 'Paʻakai', fish: 'Reef Fish' },
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
