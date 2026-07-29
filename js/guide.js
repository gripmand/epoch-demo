'use strict';

const ERA_ANCHOR = [
  null,
  { name: 'Temple Household',   short: 'É',          note: 'The É — the god\'s house. In Sumer the temple, not a palace, collected the harvest, stored the seed and issued the rations.' },
  { name: 'Nomarch\'s Estate',  short: 'Per-Nesu',   note: 'The provincial governor\'s seat, which assessed the flood, counted the cattle and set the grain tax.' },
  { name: 'Council House',      short: 'Popol Nah',  note: 'The popol nah — the mat house — where lineage heads met beneath a woven-mat frieze.' },
  { name: 'Tecpan Palace',      short: 'Tecpan',     note: 'The calpulli\'s administrative palace, where tribute was received and redistributed.' },
  { name: 'Prytaneion',         short: 'Prytaneion', note: 'The civic hearth of the polis. Its fire was never allowed to go out.' },
  { name: 'Curia',              short: 'Curia',      note: 'The senate house on the forum, from which the censors let the public contracts.' },
  { name: 'Guildhall',          short: 'Guildhall',  note: 'The chartered corporation of the town, holding its market rights and its weights.' },
  { name: 'Palazzo Comunale',   short: 'Palazzo',    note: 'The commune\'s palace — banking hall below, council chamber above.' },
  { name: 'Exchange & Vestry',  short: 'Exchange',   note: 'The corn exchange and parish vestry: the Victorian city\'s real administration.' },
  { name: 'City Hall',          short: 'City Hall',  note: 'Zoning, utilities and the municipal bond — the modern city\'s balance sheet.' },
  { name: 'Civic Data Hub',     short: 'Data Hub',   note: 'Governance as a service. The city runs on dashboards and the fibre exchange next door.' },
  { name: 'Station Command',    short: 'Command',    note: 'Every gram lifted and every joule spent is logged here.' },
  { name: 'Departure Admiralty', short: 'Admiralty', note: 'It no longer governs a city. It dispatches colony charters to other stars.' },
  { name: 'The Nexus',          short: 'Nexus',      note: 'The aperture. From here you edit the rules the world runs on.' },
];

function anchorFor(era) { return ERA_ANCHOR[Util.clamp(era, 1, MAX_ERA)] || ERA_ANCHOR[1]; }

const ERA_GUIDES = [
  null,
  {

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
  {
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
  {
    headline: 'No rivers. You live on what you caught in the wet season.',
    mechanic: 'Seven wet months, five dry ones, and no river at all. Every drop the city drinks in the dry season must be caught and stored while it rains. Stone is the new wealth.',
    chain: ['Quarry (must sit on rock) → Stonecutter → Stone Yard', 'Stone sells for far more than flour ever did'],
    firstSteps: [
      'Find rock. Quarries can only be placed on it, and output scales with how much rock is underneath.',
      'Put the Stonecutter directly beside the Quarry for the adjacency bonus.',
      'Build an Aqueduct — its reach dwarfs the canal well and it can water the quarry district.',
    ],
    mistake: 'Building the stone chain far from your housing. The Stone Yard still needs customers in range.',
  },
  {
    headline: 'Most of your wealth is not grown at home.',
    mechanic: 'The basin cannot grow cacao or cotton and has no gold, jade or feathers — yet cloaks and cacao beans ARE the currency. Tribute and trade routes bring in what your land cannot.',
    chain: ['Chinampa raised fields → the most productive farmland in the game', 'Tribute routes → luxury goods → enormous margins'],
    firstSteps: ['Build chinampas on water edges.', 'Secure a trade route before investing in luxury workshops.'],
    mistake: 'Trying to be self-sufficient. This era rewards dependency on trade.',
  },
  {
    headline: 'Money becomes a physical substance you manufacture.',
    mechanic: 'Silver ore is dug, washed, cupelled into bullion and struck into coin at the Mint. From here on, workers are paid an actual wage drawn from actual coin — if the mint stops, the city stops.',
    chain: ['Silver Mine → Washery → Cupellation → Mint', 'Olive Grove → Oil Press → export'],
    firstSteps: ['Get the mint chain running before you expand the workforce.', 'Amphorae cap how much liquid you can export — build the pottery.'],
    mistake: 'Hiring a workforce you cannot pay. Wages are now a real cost.',
  },
  {
    headline: 'Utilities become networks with gradients, not radii.',
    mechanic: 'Water enters at a high point and runs downhill through the aqueduct at a fixed gradient into a castellum, which divides it by nozzle size between public fountains, baths and private buyers. You can sell water rights.',
    chain: ['Aqueduct → Castellum → sold water rights', 'Brickworks and concrete unlock everything else'],
    firstSteps: ['Plan the water gradient before you build downhill.', 'Concrete unlocks vaults — it gates the big civic buildings.'],
    mistake: 'Treating water as a radius. It now flows, and downhill matters.',
  },
  {
    headline: 'You start earning by owning rights, not selling goods.',
    mechanic: 'Buy a monopoly right — mill soke, oven, winepress, market or bridge toll — and every household in its radius is compelled to use yours and pay for it. Income without a sale.',
    chain: ['Watermill + mill soke right', 'Manor → three-field rotation'],
    firstSteps: ['Buy the mill right early; it pays passively.', 'Rotate fields — continuous cropping exhausts them.'],
    mistake: 'Building more mills instead of buying the right to the one you have.',
  },
  {
    headline: 'Money stops being a stock and becomes leverage.',
    mechanic: 'The Banking House turns idle treasury into credit at roughly 1.6×, and credit pays for construction immediately. Enormous upside — and the first era where you can genuinely over-extend.',
    chain: ['Banking House → credit → simultaneous megaprojects', 'Printing House → knowledge'],
    firstSteps: ['Bank idle cash rather than sitting on it.', 'Alum first — without it no dye holds, and dyed cloth is the margin.'],
    mistake: 'Borrowing against income you have not secured.',
  },
  {
    headline: 'Every industry emits something another industry eats.',
    mechanic: 'Coke ovens throw off coal tar, the gasworks throws off coke and ammonia, the abattoir throws off hides and bone. Sell the by-products or chain them. The other half is pollution: plumes drift downwind and wreck housing.',
    chain: ['Colliery → Coke Ovens → Blast Furnace → Steel', 'Gasworks → town gas, tar, ammonia'],
    firstSteps: ['Put industry downwind of your housing.', 'Chain by-products rather than dumping them.'],
    mistake: 'Placing housing next to the works. Industry poisons its neighbours.',
  },
  {
    headline: 'Electricity is one network with a daily peak.',
    mechanic: 'Housing peaks morning and evening, industry runs flat, commerce peaks midday. Your fleet must cover the PEAK, not the average — and idle capacity still costs money.',
    chain: ['Power plants → grid → every modern building', 'Financial District — the flagship earner'],
    firstSteps: ['Size generation for peak load.', 'The Financial District needs a real city beneath it.'],
    mistake: 'Building for average demand and browning out at 7pm.',
  },
  {
    headline: 'A second graph carries value: fibre.',
    mechanic: 'Every building gains a latency figure based on fibre hops to the nearest exchange. Digital revenue is multiplied by a latency curve — 10ms is full value, 80ms is worth under a third.',
    chain: ['Fibre Exchange → trunk → data centre', 'Compute → models → the highest-value output of the era'],
    firstSteps: ['Build the exchange centrally.', 'Keep high-value digital buildings within a few hops.'],
    mistake: 'Sprawling your data centres far from the exchange.',
  },
  {
    headline: 'Land stops being the constraint. Mass does.',
    mechanic: 'Above the atmosphere everything is denominated in tonnes-to-orbit. Construction cannot start unless launch infrastructure has spare throughput, and build time is mass divided by throughput.',
    chain: ['Launch infrastructure → orbital construction', 'ISRU → oxygen and water from regolith and ice'],
    firstSteps: ['Build launch throughput before orbital projects.', 'Make oxygen locally — lifting it is ruinous.'],
    mistake: 'Designing as if land were still scarce. It is mass now.',
  },
  {
    headline: 'The city becomes a port of exit.',
    mechanic: 'You stop making money by housing people and start making it by sending them away. Assemble a colony charter from berths, germplasm, hull, beam-time, a magsail brake and a cultural payload, then sell it.',
    chain: ['Charter components → colony ship → sale', 'Fusion and antimatter fuel the departures'],
    firstSteps: ['Build the six charter components in parallel.', 'Beam-time is auctioned — plan around the schedule.'],
    mistake: 'Growing population for its own sake. Population is now cargo.',
  },
  {
    headline: 'Money buys the rules themselves.',
    mechanic: 'Every previous era spent money on objects. This one spends it on axioms — permanent global modifiers bought outright. "Roads are no longer required." "Upkeep −25% everywhere." "Construction is instantaneous."',
    chain: ['Axiom Exchange → permanent rule modifiers'],
    firstSteps: ['Buy the axiom that removes your worst bottleneck first.'],
    mistake: 'Hoarding. Axioms compound — the earlier you buy, the longer they pay.',
  },
];

function eraGuide(era) { return ERA_GUIDES[Util.clamp(era, 1, MAX_ERA)] || ERA_GUIDES[1]; }
