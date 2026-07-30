'use strict';

const ERA_ANCHOR = {

  0:  { name: 'The Landmark',       short: 'Landmark',   note: 'A sixty-metre araucaria on a rise, standing alone above the fern. The whole range is organised around it and nothing on this floodplain is out of sight of it.' },

  1:  { name: 'The Long Hearth',    short: 'Hearth',     note: 'Not a government — a fire that is never allowed to go out. The band sleeps in its heat and the tally of the season is cut into bone beside it.' },
  2:  { name: 'The Overseer\'s Compound', short: 'Compound', note: 'In the Atrahasis the lesser gods dug the canals, rebelled, and people were made from clay to bear the labour instead. This is where the quota is set. The gold is not yours.' },
  3:  { name: 'The Enclosure',      short: 'Enclosure',  note: 'A ring of carved T-pillars raised before anyone farmed anything. People gathered here first and settled afterwards — the monument came before the village.' },

  4:  { name: 'Temple Household',   short: 'É',          note: 'The É — the god\'s house. In Sumer the temple, not a palace, collected the harvest, stored the seed and issued the rations.' },
  5:  { name: 'Nomarch\'s Estate',  short: 'Per-Nesu',   note: 'The provincial governor\'s seat, which assessed the flood, counted the cattle and set the grain tax.' },
  6:  { name: 'The Granary Platform', short: 'Platform', note: 'Harappa left no palace and no temple anyone has identified. What governed was the raised granary, the standard brick and the drains — administration as plumbing.' },
  7:  { name: 'The Palace Store',   short: 'Palace',     note: 'Everything comes in and everything goes back out. The Linear B tablets are not literature; they are stock lists.' },
  8:  { name: 'The Ancestral Hall', short: 'Ancestral Hall', note: 'Shang kingship ran on divination and rite. The cracked oracle bones under the floor are the state archive.' },
  9:  { name: 'The Marae',          short: 'Marae',      note: 'Open ground, not a building. Lineage is recited here and a voyage is sanctioned here before a hull is ever cut.' },
  10: { name: 'Prytaneion',         short: 'Prytaneion', note: 'The civic hearth of the polis. Its fire was never allowed to go out.' },
  11: { name: 'The Comitium',       short: 'Comitium',   note: 'Open assembly ground, before anyone thought to roof it. The Republic is argued standing up.' },
  12: { name: 'The Founder\'s Agora', short: 'Agora',    note: 'A city planted deliberately, a long way from home. The grid and the founder\'s cult were laid out in the same week.' },
  13: { name: 'Curia',              short: 'Curia',      note: 'The senate house on the forum, from which the censors let the public contracts. This is the empire that built the aqueducts, not the one that lost them.' },
  14: { name: 'Council House',      short: 'Popol Nah',  note: 'The popol nah — the mat house — where lineage heads met beneath a woven-mat frieze.' },

  15: { name: 'The Praetorium',     short: 'Praetorium', note: 'The governor\'s residence inside a wall that was not needed when the city was built. It now administers only what can still be defended.' },
  16: { name: 'The Great Palace',   short: 'Palace',     note: 'It outlasted the west by 977 years. The silk monopoly and the recipe for Greek fire were both state secrets, kept here.' },
  17: { name: 'The Monastery',      short: 'Monastery',  note: 'The estate is run from the cloister, because the cloister is what is left. The record survives here or it does not survive.' },
  18: { name: 'The House of Wisdom', short: 'Bayt al-Hikma', note: 'Translation, astronomy, algebra and paper. The library IS the administration — and none of it is a dark age.' },
  19: { name: 'The Longhouse',      short: 'Longhouse',  note: 'The jarl\'s hall: the thing the ships are pulled up in front of, and the only reason they come back.' },
  20: { name: 'The Manor',          short: 'Manor',      note: 'Demesne, strip field and dovecote. Whether any of this was a coherent "system" is still argued — treat it as a landscape, not a claim.' },
  21: { name: 'Palazzo Comunale',   short: 'Palazzo',    note: 'Banking hall below, council chamber above. Double-entry bookkeeping is invented in this building and it changes more than any war.' },
  22: { name: 'Guildhall',          short: 'Guildhall',  note: 'The chartered corporation of the town, holding its market rights and its weights. A mason is not a farmer and will not be treated as one.' },
  23: { name: 'The Great Ger',      short: 'Ordu',       note: 'The ordu — the moving court. Nothing here is founded. Everything is struck, carried, and raised again somewhere better.' },
  24: { name: 'The Sankore Madrasa', short: 'Sankore',   note: 'Gold went north and salt came south, and what the trade actually bought was manuscripts. Its scholarly peak is under Songhai, 1468–1591 — a later empire than Mali.' },
  25: { name: 'The Divan',          short: 'Divan',      note: 'The imperial council. The caravanserai network is administered from here — and after about 1555, so is the coffee.' },
  26: { name: 'Tecpan Palace',      short: 'Tecpan',     note: 'The calpulli\'s administrative palace, where tribute was received and redistributed.' },
  27: { name: 'The Pest House',     short: 'Pest House', note: 'What administration looks like when between a third and two thirds of the people are gone. Every building still stands. Nobody is left to work them — and the labour that survived can name its price.' },

  28: { name: 'The Signoria',       short: 'Signoria',   note: 'The ruling council of the commune, and the largest single patron of every workshop in the city.' },
  29: { name: 'The Admiralty Yard', short: 'Yard',       note: 'The dockyard is the government. Charters, prize law and bottomry loans are all signed within sight of the slip.' },
  30: { name: 'Exchange & Vestry',  short: 'Exchange',   note: 'The corn exchange and parish vestry: the Victorian city\'s real administration.' },
  31: { name: 'The Terminus Office', short: 'Terminus',  note: 'The timetable governs. Distance has stopped being a penalty and become a thing you can buy.' },
  32: { name: 'The Generating Station', short: 'Station', note: 'Godalming 1881, Pearl Street 1882. The city\'s administration is now a load curve, and the load curve does not care what you intended.' },
  33: { name: 'City Hall',          short: 'City Hall',  note: 'Zoning, utilities and the municipal bond — the modern city\'s balance sheet.' },
  34: { name: 'Civic Data Hub',     short: 'Data Hub',   note: 'Governance as a service. The city runs on dashboards and the fibre exchange next door.' },

  35: { name: 'Station Command',    short: 'Command',    note: 'Every gram lifted and every joule spent is logged here.' },
  36: { name: 'Departure Admiralty', short: 'Admiralty', note: 'It no longer governs a city. It dispatches colony charters to other stars.' },
  37: { name: 'The Nexus',          short: 'Nexus',      note: 'The aperture. From here you edit the rules the world runs on.' },
};

function anchorFor(era) {

  const e = Math.max(0, rungOf(era));
  for (let i = e; i >= 0; i--) if (ERA_ANCHOR[i]) return ERA_ANCHOR[i];
  return ERA_ANCHOR[0];
}

const ERA_GUIDES = {
  1: {
    headline: 'Keep the fire alive. Everything else is detail.',
    mechanic: 'Warmth is a utility you MAKE. ONE Great Hearth warms an 18-tile circle — the whole ' +
      'camp — so place it centrally, build outward, and forget about it. What matters is the BILL: ' +
      'everything inside that circle — homes, workshops, counters — draws fuel every minute from your ' +
      'stock (wood ×1, bone ×1, charcoal ×3). If the fuel cannot cover the draw, EVERY fire goes dark ' +
      'at once and the whole camp stops. Your outdoor camps — Cutters, Drives, Weirs, Quarries — keep ' +
      'working through it. And the fuel is the map: every tree tile holds 500 deadwood, and a spent ' +
      'tile is ASH forever. The forest does not grow back. Watch the \u{1F525} chip: it shows your ' +
      'warmth and the seconds of fire left at the current draw.',
    chain: [
      'Great Hearth + Melt Pit  ·  the warmth and the water. Nothing warm-blooded runs without both',
      'Reindeer Drive ×3 → Drying Rack → Meat Stall  ·  ~$31/min. The food chain — three Drives feed one Rack exactly',
      'Deadwood Cutter → Charcoal Clamp → Fuel Stack  ·  ~$48/min — and every bag sold is 3 warmth your hearths do not get',
      'Reindeer Drive ×2 → Hide Frames → Fur Hall  ·  ~$78/min, the top of the age — and it eats the carcasses dinner wanted',
      'Flint Quarry → Knapping Floor → Blade Trader  ·  ~$58/min on the moraine ridge, far from everything',
      'Mammoth Boneyard → Carver\'s Lodge  ·  ~$52/min — or burn the bone as fuel. The fork is the point',
      'Ice Weir  ·  fish, eaten at 75%. Needs no fire, no herd, no wood — the food nothing can take from you',
      'Ochre Bank  ·  nearly worthless to sell. The Painted Cave wants 900 of it',
    ],
    firstSteps: [
      'Place the GREAT HEARTH first, and place it where you want the middle of your camp. Its 18-tile circle is big enough to hold the whole age, so you only ever need one — everything that houses or employs people goes inside it. Outside it, nothing warm-blooded runs.',
      'A DEADWOOD CUTTER second — before any tent. You arrive with NO fuel, and a home inside the circle starts drawing the moment someone moves in. The Cutter must sit ON a dead stand (≥2 tree tiles under it); it eats 500 per tile and the tile becomes ash forever. Plan its replacement before you build it.',
      'A MELT PIT for water. It goes anywhere — no river needed — and covers 5 tiles, so drop one wherever a workshop cluster grows. Later the Longfire upgrade gives warmth and water from the same object.',
      'A road from the Hearth, then Hide Tents inside the circle, then TWO OR THREE Reindeer Drives anywhere on the open steppe and a Drying Rack. Pemmican is bread here.',
      'The Charcoal Clamp is how fire becomes money: 2 wood in, 1 charcoal out — 50% more warmth from the same tree, or $6.80 a bag at the Fuel Stack. Every bag you sell is warmth you no longer have. That choice never stops being asked.',
      'Watch the steppe. Mammoth herds drift past — a HUNTERS\' CAMP can send 6 hunters after the nearest one. A good hunt is meat, hide, bone and ivory; a bad one buries people. The odds are on the button.',
      'The Boneyard (on the white bonebeds by the river) gives you the era\'s question in one good: burn the bone, or carve it at the Lodge for $13. Carving wins by 15% — and the Cave will want 100 carvings.',
      'When the fuel chip turns amber: mothball a workshop (it stops drawing warmth entirely), stop the Fuel Stack, burn bone. Mothball is your thermostat here, not your bankruptcy tool.',
      'The Painted Cave is the exit. Its bill is ochre, charcoal and carvings — the paint, the light, and the things you did not burn. You raise it by being colder, on purpose.',
    ],
    mistake: 'Selling too much charcoal. The Fuel Stack pays $47.60 a real minute, which makes it the ' +
      'most profitable way there is to freeze: exactly half of what your fire chain makes goes out its ' +
      'door, and your margin over the hearths\' draw is ~12%. One extra tent, one cold snap, one greedy ' +
      'minute — and the fires go dark. Grow the fire chain BEFORE you grow anything that draws on it.',
  },
  4: {

    headline: 'Grain feeds your people. CRAFT GOODS make you rich.',
    mechanic: 'Cropped ground slowly turns salty and yields less — press O twice for the SALT MAP. ' +
      'Leave a field fallow and it recovers; a Midden or Shaduf in range, or a spot beside water, speeds that up ×3; ' +
      'Date Palms simply ignore the salt and thrive on ruined ground; Sesame salts it at half rate. ' +
      'So you rotate fields, convert the worst ground, and buy more land. Stone, when you reach it, has no recovery at all.',
    chain: [

      'Farm → Mill → Market  ·  $36/min. Feeds the city; the food chain barely pays, it just keeps everyone alive',
      'Reed Cutter → Basket Weaver  ·  ~$49/min. The LIGHT chain: two buildings, five mouths — for a town watching its flour',
      'Brewery → Tavern  ·  $52/min. A luxury — but it drinks the grain your Mill wanted. "Bread before beer" (a Hall policy, ON by default) makes sure the Mill eats first',
      'Sesame Field → Oil Press  ·  ~$52/min, and it salts the soil at only half rate',
      'Clay Pit → Potter\'s Kiln → Pottery Stall  ·  $62/min. Three buildings, and the pit must sit within 3 tiles of water',
      'Shepherd\'s Fold → Weaver\'s Shed → Cloth Hall  ·  $80/min. The Fold demands DRY ground — the salt flats nobody else wants',
      '…→ Dye Works  ·  $78/min on top of the wool chain: it buys your cloth and sells it dyed at $26 — the new top of the ladder',
    ],
    firstSteps: [
      'Place your Well first — nothing works without water coverage, and its radius is only 5 tiles. Every building now shows its RING while you place it.',
      'Run a road from the É, then put TWO OR THREE Farms and a Mill touching one of them (+25% both ways). One farm cannot keep a mill busy.',
      'Add FOUR OR FIVE Houses per Mill — no more. One Mill feeds about twenty people; houses past that starve the town. Watch the FLOUR chip: it shows milled vs eaten, and goes red the moment you are short.',
      'Add a Market EARLY — it is the only thing in the food chain that turns flour into money. Until one is standing and road-connected, your only income is the Hall.',
      'Now build a craft chain. This is the actual economy — the food chain only keeps it alive. EVERY chain\'s producer and workshop boost each other +25% when adjacent.',
      'Every craft chain brings about SEVEN more workers, and workers are mouths. Feed them without more barley: a Fish Weir in the channel, a Date-Palm Orchard on tired ground, a Communal Bread Oven (−15% flour for homes in range).',
      'When money runs ahead of your workers, buy RANKS on a building\'s own panel — they never cost a worker. ' +
        'A PRODUCER ranks up to +35% output; a SHOP ranks up to +20% price on the same goods. ' +
        'Ranks are your MARGIN; to move more volume, open a second shop — and that one does cost mouths.',
      'Lay the Ziggurat foundation once TWO chains run. Its panel forecasts the bottleneck — it eats clay, beer and wages, and a Brickyard or "pay the builders in beer" can carry half the bill.',
      'If famine hits anyway: the Hall can IMPORT grain at 4× (always), the Temple Granary opens its dole, the Festival of Ninkasi buys back the town\'s mood in beer — and anything bleeding can be MOTHBALLED at 20% upkeep.',
    ],
    mistake: 'Building only the food chain. Measured: a food-only village nets about $3/min and the era-2 gate ' +
      'is $45,000 — that is most of a week. Three craft chains net ten times as much. And your city KEEPS EARNING ' +
      'WHILE YOU ARE AWAY, at roughly $2,000 an hour once it is built, so an overnight is worth more than an ' +
      'evening of clicking. Build the chains, then leave it running.',
  },
  5: {
    headline: 'The river decides your year.',
    mechanic: 'The year splits into Akhet (flood), Peret (growing) and Shemu (harvest). At the start of Akhet the Nilometer rolls the flood height and shows it to you before you commit seed. A low Nile is famine — a high one is a windfall.',
    chain: ['Estate Farm → Mill → Bazaar', 'Flax → Linen House (the first real luxury export)'],
    firstSteps: [
      'Upgrade your Well to a Canal Well — the reach is far larger.',
      'Build a Granary before you expand farming, or the surplus simply rots.',
      'Put a Temple within two tiles of your housing for the population bonus.',
    ],
    mistake: 'Expanding farmland without storage. A good flood you cannot store is wasted.',
  },
  14: {

    headline: 'There is no river. WATER IS A GOOD now — collect it, store it, ration it.',
    mechanic: 'For two ages water was a free blue circle that could never switch off. Here the ' +
      'Aqueduct is only a channel: it waters an 11-tile radius ONLY while the city\'s tank has water ' +
      'in it, and when the tank hits zero every building that needs water goes dark at once. ' +
      'The year is ' + Math.round(TUNE.SEASON.wet) + 's of rain and ' + Math.round(TUNE.SEASON.dry) +
      's of dry. Catchment Courts and Aguadas collect only in the rains; the Cenote Steps runs all ' +
      'year, and is the only thing that does. Watch the 💧 chip: it shows the tank AND how many ' +
      'seconds of water are left at your current draw.',
    chain: [
      'Cenote Steps + Catchment Court → Chultun / Aguada  ·  earns NOTHING, and nothing else runs without it',
      'Milpa → Nixtamal House → Tortilla Plaza  ·  ~$247/min. The Milpa is RAIN-FED — this chain keeps running through a brown-out',
      'Limestone Quarry → Stonecutter\'s Lodge → Stone Yard  ·  ~$211/min, and quarrying is DRY WORK, so it survives a drought too',
      'Marl Pit → Polychrome Kiln → Vase Market  ·  ~$504/min. The kiln must stand in the trees — firing ate wood by the hectare',
      'Rejollada Cacao Grove → Grinding House → Chocolate House  ·  ~$780/min, the richest thing this age makes. Wants the cenote rim',
      'Melipona Apiary  ·  the second food, in the forest, and it drinks nothing at all',
    ],
    firstSteps: [
      'Cenote Steps FIRST, before anything. There is a cenote pool inside your starting land — find the water and build ON it. Until it runs and an Aqueduct carries it, you have no water, so no houses, so no workers.',
      'Then an Aqueduct, then a CATCHMENT COURT — in that order, before the third house. One Cenote Steps collects 18/min and a Stone House holds 12 residents drinking ~0.9 each, so the cenote alone runs out of water at about twenty people. The court collects 55/min in the rains. It is not optional.',
      'Then housing. Watch the 💧 chip as you place each one: it tells you the seconds of water left at your current draw, and it turns amber before it turns red.',
      'Buy TANK before you buy industry. A Catchment Court collects nothing in the dry; a Chultun or an Aguada is what carries you across it. Roughly one Aguada, or three Chultuns, per hundred residents.',
      'Now a chain. Start with the Milpa — it needs dry ground and NO water, so it is the one thing a brown-out cannot stop, and its nine tiles must be cleared of trees first at $' + TUNE.CLEAR_TREE + ' each.',
      'Leave some forest standing. The Apiary and the Polychrome Kiln both demand four tree tiles within 3, so clearing everything for Milpas costs you two chains.',
      'Every worker in a watered building drinks on top of every resident. Growth costs water TWICE — once for the mouth, once for the job — so hiring is now a water decision.',
      'When the dry season is longer than your tank: MOTHBALL the kilns and grinding houses (20% upkeep, no water at all), and turn on the Reservoir Ration at the Council House — −40% draw for −15% work, costs no goods, never runs out.',
      'Lay the Temple-Pyramid foundation once the stone chain runs. It eats 3,000 stone and 1,200 blocks, so the quarry district IS the monument.',
    ],
    mistake: 'Growing through the rains without buying storage. Every reading looks healthy while it ' +
      'is raining — supply covers the draw, the tank is full — and then the catchments stop, the tank ' +
      'empties in a minute, and the whole city browns out at once. Buy capacity when you do not need it. ' +
      'That is the entire age.',
  },
  26: {
    headline: 'Most of your wealth is not grown at home.',
    mechanic: 'The basin cannot grow cacao or cotton and has no gold, jade or feathers — yet cloaks and cacao beans ARE the currency. Tribute and trade routes bring in what your land cannot.',
    chain: ['Chinampa raised fields → the most productive farmland in the game', 'Tribute routes → luxury goods → enormous margins'],
    firstSteps: ['Build chinampas on water edges.', 'Secure a trade route before investing in luxury workshops.'],
    mistake: 'Trying to be self-sufficient. This era rewards dependency on trade.',
  },
  10: {
    headline: 'Money becomes a physical substance you manufacture.',
    mechanic: 'Silver ore is dug, washed, cupelled into bullion and struck into coin at the Mint. From here on, workers are paid an actual wage drawn from actual coin — if the mint stops, the city stops.',
    chain: ['Silver Mine → Washery → Cupellation → Mint', 'Olive Grove → Oil Press → export'],
    firstSteps: ['Get the mint chain running before you expand the workforce.', 'Amphorae cap how much liquid you can export — build the pottery.'],
    mistake: 'Hiring a workforce you cannot pay. Wages are now a real cost.',
  },
  13: {
    headline: 'Utilities become networks with gradients, not radii.',
    mechanic: 'Water enters at a high point and runs downhill through the aqueduct at a fixed gradient into a castellum, which divides it by nozzle size between public fountains, baths and private buyers. You can sell water rights.',
    chain: ['Aqueduct → Castellum → sold water rights', 'Brickworks and concrete unlock everything else'],
    firstSteps: ['Plan the water gradient before you build downhill.', 'Concrete unlocks vaults — it gates the big civic buildings.'],
    mistake: 'Treating water as a radius. It now flows, and downhill matters.',
  },
  22: {
    headline: 'You start earning by owning rights, not selling goods.',
    mechanic: 'Buy a monopoly right — mill soke, oven, winepress, market or bridge toll — and every household in its radius is compelled to use yours and pay for it. Income without a sale.',
    chain: ['Watermill + mill soke right', 'Manor → three-field rotation'],
    firstSteps: ['Buy the mill right early; it pays passively.', 'Rotate fields — continuous cropping exhausts them.'],
    mistake: 'Building more mills instead of buying the right to the one you have.',
  },
  28: {
    headline: 'Money stops being a stock and becomes leverage.',
    mechanic: 'The Banking House turns idle treasury into credit at roughly 1.6×, and credit pays for construction immediately. Enormous upside — and the first era where you can genuinely over-extend.',
    chain: ['Banking House → credit → simultaneous megaprojects', 'Printing House → knowledge'],
    firstSteps: ['Bank idle cash rather than sitting on it.', 'Alum first — without it no dye holds, and dyed cloth is the margin.'],
    mistake: 'Borrowing against income you have not secured.',
  },
  30: {
    headline: 'Every industry emits something another industry eats.',
    mechanic: 'Coke ovens throw off coal tar, the gasworks throws off coke and ammonia, the abattoir throws off hides and bone. Sell the by-products or chain them. The other half is pollution: plumes drift downwind and wreck housing.',
    chain: ['Colliery → Coke Ovens → Blast Furnace → Steel', 'Gasworks → town gas, tar, ammonia'],
    firstSteps: ['Put industry downwind of your housing.', 'Chain by-products rather than dumping them.'],
    mistake: 'Placing housing next to the works. Industry poisons its neighbours.',
  },
  33: {
    headline: 'Electricity is one network with a daily peak.',
    mechanic: 'Housing peaks morning and evening, industry runs flat, commerce peaks midday. Your fleet must cover the PEAK, not the average — and idle capacity still costs money.',
    chain: ['Power plants → grid → every modern building', 'Financial District — the flagship earner'],
    firstSteps: ['Size generation for peak load.', 'The Financial District needs a real city beneath it.'],
    mistake: 'Building for average demand and browning out at 7pm.',
  },
  34: {
    headline: 'A second graph carries value: fibre.',
    mechanic: 'Every building gains a latency figure based on fibre hops to the nearest exchange. Digital revenue is multiplied by a latency curve — 10ms is full value, 80ms is worth under a third.',
    chain: ['Fibre Exchange → trunk → data centre', 'Compute → models → the highest-value output of the era'],
    firstSteps: ['Build the exchange centrally.', 'Keep high-value digital buildings within a few hops.'],
    mistake: 'Sprawling your data centres far from the exchange.',
  },
  35: {
    headline: 'Land stops being the constraint. Mass does.',
    mechanic: 'Above the atmosphere everything is denominated in tonnes-to-orbit. Construction cannot start unless launch infrastructure has spare throughput, and build time is mass divided by throughput.',
    chain: ['Launch infrastructure → orbital construction', 'ISRU → oxygen and water from regolith and ice'],
    firstSteps: ['Build launch throughput before orbital projects.', 'Make oxygen locally — lifting it is ruinous.'],
    mistake: 'Designing as if land were still scarce. It is mass now.',
  },
  36: {
    headline: 'The city becomes a port of exit.',
    mechanic: 'You stop making money by housing people and start making it by sending them away. Assemble a colony charter from berths, germplasm, hull, beam-time, a magsail brake and a cultural payload, then sell it.',
    chain: ['Charter components → colony ship → sale', 'Fusion and antimatter fuel the departures'],
    firstSteps: ['Build the six charter components in parallel.', 'Beam-time is auctioned — plan around the schedule.'],
    mistake: 'Growing population for its own sake. Population is now cargo.',
  },
  37: {
    headline: 'Money buys the rules themselves.',
    mechanic: 'Every previous era spent money on objects. This one spends it on axioms — permanent global modifiers bought outright. "Roads are no longer required." "Upkeep −25% everywhere." "Construction is instantaneous."',
    chain: ['Axiom Exchange → permanent rule modifiers'],
    firstSteps: ['Buy the axiom that removes your worst bottleneck first.'],
    mistake: 'Hoarding. Axioms compound — the earlier you buy, the longer they pay.',
  },
};

function eraGuide(era) {
  const g = ERA_GUIDES[Util.clamp(rungOf(era), 1, MAX_ERA)];
  if (g) return g;
  return {
    headline: 'This age is still being carved.',
    mechanic: 'The rung exists on the ladder, but its guide, chains and mechanic have not been written yet. ' +
      'The rules that never change (below) all still apply.',
    chain: ['Build food first, then the earning chains — every age keeps that shape.'],
    firstSteps: ['Water (or its era\'s equivalent) first.', 'Roads from the seat of power.', 'Housing near the work.'],
    mistake: 'Assuming this age plays like the last one. When it is written, it will not.',
  };
}
