'use strict';

const ERA_ANCHOR = {

  0:  { name: 'The Landmark',       short: 'Landmark',   note: 'A sixty-metre araucaria on a rise, standing alone above the fern. The whole range is organised around it and nothing on this floodplain is out of sight of it.' },

  1:  { name: 'The Long Hearth',    short: 'Hearth',     note: 'Not a government — a fire that is never allowed to go out. The band sleeps in its heat and the tally of the season is cut into bone beside it.' },
  2:  { name: 'The Overseer\'s Compound', short: 'Compound', note: 'In the Atrahasis the lesser gods dug the canals, rebelled, and people were made from clay to bear the labour instead. This is where the quota is set. The gold is not yours.' },

  3:  { name: 'The Enclosure',      short: 'Enclosure',  note: 'A ring of carved T-shaped pillars — and around it houses, hearths, rock-cut basins and seven thousand grinding stones. People lived here. What they never did was sow anything: every mouth in this town is fed by a harvest nobody planted.' },

  4:  { name: 'Temple Household',   short: 'É',          note: 'The É — the god\'s house. In Sumer the temple, not a palace, collected the harvest, stored the seed and issued the rations.' },
  5:  { name: 'Nomarch\'s Estate',  short: 'Per-Nesu',   note: 'The provincial governor\'s seat, which assessed the flood, counted the cattle and set the grain tax.' },

  6:  { name: 'The Granary Platform', short: 'Platform', note: 'No palace, no temple and no royal tomb has ever been identified here. What governed was a raised brick podium nobody can put a name to, the standard brick and the drains — administration as plumbing.' },
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

const ERA_RECORD = {

  _default: { icon: '\u{1F4DC}', tally: 'The Tally', tallyBtn: 'Tally',
        tallySub: 'What this city keeps count of.',
        chronicle: 'The Chronicle', chronBtn: 'Chronicle',
        chronSub: 'Set down as it happened. The record keeps the last 200 entries.',
        keeper: 'whoever keeps this city’s records' },
  0:  { icon: '\u{1FAA8}', tally: 'The Layer Count', tallyBtn: 'Layers',
        tallySub: 'What this range has laid down, and what is left of it.',
        chronicle: 'The Seam', chronBtn: 'The Seam',
        chronSub: 'Nothing here writes anything down. The record is the ground — the last 200 layers.',
        keeper: 'the mud, which forgets nothing' },
  1:  { icon: '\u{1F9B4}', tally: 'The Bone Tally', tallyBtn: 'Bone Tally',
        tallySub: 'Notches cut into bone beside the fire.',
        chronicle: 'The Winter Count', chronBtn: 'Winter Count',
        chronSub: 'One mark cut for each thing worth remembering. The count keeps the last 200.',
        keeper: 'a Shaman’s Tent' },
  2:  { icon: '\u{1FAA8}', tally: 'The Notched Tally', tallyBtn: 'Tally',
        tallySub: 'Cut into standing rock, where anyone can check it.',
        chronicle: 'The Overseers’ Record', chronBtn: 'Record',
        chronSub: 'Kept by the masters, in their own hand. It keeps the last 200 entries.',
        keeper: 'a Tally Stone' },
  3:  { icon: '\u{1F9B4}', tally: 'The Notched Tally', tallyBtn: 'Tally',
        tallySub: 'Cut into a split rib, one notch a load.',
        chronicle: 'The Scored Bone', chronBtn: 'Scored Bone',
        chronSub: 'One notch for each thing worth remembering. It keeps the last 200.',
        keeper: 'a Notched Bone Tally' },
  4:  { icon: '\u{1F4DC}', tally: 'The Scribe’s Tally', tallyBtn: 'Tally',
        tallySub: 'Reckoned in the temple, in wet clay.',
        chronicle: 'The Clay Tablet Chronicle', chronBtn: 'Chronicle',
        chronSub: 'Pressed into clay as it happened. The tablets keep the last 200 entries.',
        keeper: 'a Scribe’s House' },
  5:  { icon: '\u{1F4DC}', tally: 'The Papyrus Tally', tallyBtn: 'Tally',
        tallySub: 'Reed pen on papyrus, in the nomarch’s own hand.',
        chronicle: 'The Papyrus Annals', chronBtn: 'Annals',
        chronSub: 'Written in ink as it happened. The rolls keep the last 200 entries.',
        keeper: 'a House of Books' },

  6:  { icon: '\u{1FAA7}', tally: 'The Sealed Tally', tallyBtn: 'Sealed Tally',
        tallySub: 'Stamped into clay at the mouth of every bale, in a script nobody has read.',
        chronicle: 'The Seal Impressions', chronBtn: 'Impressions',
        chronSub: 'Pressed into clay as it happened, under six signs nobody alive can read. The impressions keep the last 200 entries.',
        keeper: 'a Seal Cutter’s Office' },
  14: { icon: '\u{1F4D6}', tally: 'The Codex Tally', tallyBtn: 'Codex Tally',
        tallySub: 'Painted on bark paper, against the day-count.',
        chronicle: 'The Long Count', chronBtn: 'Long Count',
        chronSub: 'Painted into the codices as it happened. They keep the last 200 entries.',
        keeper: 'a House of Codices' },
};
function eraRecord(era) {
  const e = Math.max(0, rungOf(era));
  for (let i = e; i >= 0; i--) if (ERA_RECORD[i]) return ERA_RECORD[i];
  return ERA_RECORD._default;
}

const ERA_FOUNDING = {
  _default: { icon: '\u{1F3DB}\u{FE0F}', title: 'Name Your City',
        sub: 'It needs a name before anyone can speak of it.',
        placeholder: '', ok: 'Found the city', skip: 'It needs no name yet',
        founded: ' was founded.',
        toast: ' is founded. May its tally always run positive.' },

  0:  { icon: '\u{1F332}', title: 'Name This Range',
        sub: 'Nothing here can name it. Sixty-six million years from now, somebody will.',
        placeholder: 'The Landmark Beds', ok: 'Name the range', skip: 'Leave it unnamed',
        founded: ' was laid down, layer on layer, in the same mud.',
        toast: ' is named — by the people who will one day dig it up.' },
  1:  { icon: '\u{1F525}', title: 'Name Your Camp',
        sub: 'The band needs a word for this place — the word they will use when they are somewhere else.',
        placeholder: 'Long-Hearth-by-the-Ford', ok: 'Name the camp', skip: 'It needs no name yet',
        founded: ' was named, and the fire was carried to it.',
        toast: ' is named. May the fire never go out.' },
  2:  { icon: '\u{26CF}\u{FE0F}', title: 'Name Your Camp',
        sub: 'The overseers need something to head the tally with.',
        placeholder: 'Ninth-Gallery', ok: 'Name the camp', skip: 'It needs no name yet',
        founded: ' was entered on the tally, under the ridge.',
        toast: ' is named. May the count come out even.' },
  3:  { icon: '\u{1F5FF}', title: 'Name Your Town',
        sub: 'It needs a word before anyone somewhere else can speak of it.',
        placeholder: 'Ridge-of-the-Pillars', ok: 'Found the town', skip: 'It needs no name yet',
        founded: ' was named, on the ridge above the plain.',
        toast: ' is named. May the herds stay on this ridge.' },
  4:  { icon: '\u{1F3DB}\u{FE0F}', title: 'Name Your City',
        sub: 'The scribes need something to carve on the founding tablet.',
        placeholder: 'Uruk-by-the-River', ok: 'Found the city', skip: 'It needs no name yet',
        founded: ' was founded on the banks of the great river.',
        toast: ' is founded. May its tally always run positive.' },
  5:  { icon: '\u{1F3DB}\u{FE0F}', title: 'Name Your Nome',
        sub: 'The nomarch’s scribes will cut it into the boundary stela.',
        placeholder: 'Per-Hapi', ok: 'Found the nome', skip: 'It needs no name yet',
        founded: ' was founded on the black land, between the flood and the desert.',
        toast: ' is founded. May the river rise kindly on it.' },
  14: { icon: '\u{1F3DB}\u{FE0F}', title: 'Name Your City',
        sub: 'The scribes will paint it on the first stela, with the day it was raised.',
        placeholder: 'Three-Cenote', ok: 'Found the city', skip: 'It needs no name yet',
        founded: ' was founded above the water in the stone.',
        toast: ' is founded. May its tanks reach the rains.' },
};
function eraFounding(era) {
  const e = Math.max(0, rungOf(era));
  for (let i = e; i >= 0; i--) if (ERA_FOUNDING[i]) return ERA_FOUNDING[i];
  return ERA_FOUNDING._default;
}

const ERA_SITE = {

  _default: {
    roadYes: '<b>housing, the places that sell, the places that store and the age’s monument</b>',
    roadNo: 'Fields, workshops and the things that work the land where the land is',
    water: 'Most buildings must sit inside this age’s water coverage. Press <b>O</b> to see it.',
    extra: [],
  },
  0: {
    roadYes: '<b>Nest Mounds, Rookery Terraces, the Leaf Mat, Chalk Downs, the Petrified Bar, the ' +
      'Amber Bed, the Egg Bed, the Peat Swamp, the Channel Lag and the Refuge</b>',
    roadNo: 'Fern Prairies, Grazing Lawns, Coccolith Shoals, Chalk Banks, Bone Beds, Mineral Seeps, ' +
      'Resin Conifer Stands, Amber Seeps, Clutch Mounds, Horsetail Marshes, Waterholes, Spring Seeps, ' +
      'the Ford, the Log Jam, the Wallow, the Sentinel Knoll and the Carrion Ground — and, less ' +
      'obviously, the Magnolia Thicket and the Rot-Wood Bed, which need nothing at all',
    water: 'Most buildings must sit inside a <b>Waterhole’s</b> three tiles or a <b>Spring Seep’s</b> ' +
      'five. ★ THE SEA DOES NOT COUNT: coverage is stamped only by a placed building, never by the ' +
      'water you are standing beside. Press <b>O</b> to see it.',
    extra: [
      '<b>The trophic loop.</b> Every nest loses a share of its head every minute, and the share rises ' +
      'with the TREE COVER within six tiles of it. Nest in the open and browse in the shelter — the ' +
      'opposite of what a city builder trains. A <b>Sentinel Knoll</b> cuts it by a quarter and costs ' +
      'no food; a <b>Carrion Ground</b> cuts it by nearly half and is paid for in clutches. The ' +
      '<b>Magnolia Thicket</b> and the <b>Rot-Wood Bed</b> feed you either way. Watch the ' +
      '\u{1F995} chip.',
    ],
  },
  1: {
    roadYes: '<b>Hide Tents, Mammoth-Bone Lodges, the Permafrost Store, the Sled Dog Post, the Meat Stall, ' +
      'the Fuel Stack, the Blade Trader, the Carver’s Lodge, the Fur Hall, the Trade Post, the Trade Ring ' +
      'and the Painted Cave</b>',
    roadNo: 'The Great Hearth, Melt Pits, Deadwood Cutters, Reindeer Drives, Ice Weirs, the Flint Quarry, ' +
      'the Boneyard, the Ochre Bank, Forage Grounds, the Charcoal Clamp, the Drying Rack, the Hide Frames ' +
      'and the Knapping Floor',
    water: 'Most sheltered buildings must stand inside a <b>Melt Pit’s</b> five-tile circle — that is ' +
      'where water comes from here, and it goes anywhere; there is no river to find. Press <b>O</b> to see it.',
    extra: [
      '<b>Warmth.</b> Anything that houses or employs people must also stand inside a hearth circle, and ' +
      'those fires burn fuel every minute. If the fuel cannot cover the draw, every fire goes dark at once — ' +
      'though your outdoor camps keep working through it. Watch the \u{1F525} chip.',
    ],
  },
  2: {
    roadYes: '<b>Reed-Roof Shelters, the Ration Shed, the Raw Goods Barrow, the Goldsmith\'s Bench, the ' +
      'Copper Furnace, the Turf Clamp, the Pitch Boilery, the Hair-Cloth Shed, the Block Yard, the Tribute ' +
      'Yard, the Ore Heap, the Overseer\'s Post, the Tally Stone and the Levelled Court</b>',
    roadNo: 'Prospect Pits, Adits, Malachite Cuts, Limestone Cuts, Timber Camps, Goat Pens, Bitumen Seep ' +
      'Works, Terrace Plots, Quern Sheds, Washing Floors, Smelting Hearths, Dressing Sheds, Lamp Houses, ' +
      'wells, the Ash Heap — and, less obviously, the Gathering Ground and the Gorge Fish Trap, which need ' +
      'nothing at all',
    water: 'Most buildings in the CAMP must sit inside a <b>Rock-Cut Well\'s</b> five tiles, or a ' +
      '<b>Cistern\'s</b> eight. ★ The gorge waters NOTHING — it washes ore and it feeds the fish trap, and ' +
      'that is all it does. Press <b>O</b> to see the rings.',
    extra: [
      '<b>The levy.</b> Every ' + TUNE.TRIBUTE.periodMin + ' minutes the masters count, and every count is ' +
      Math.round((TUNE.TRIBUTE.growth - 1) * 100) + '% larger than the last. ' +
      Math.round(TUNE.TRIBUTE.share * 100) + '% of your gold is taken as it is poured — build the ' +
      '<b>Tribute Yard</b> or none of it counts toward the quota. Watch the ⚖️ chip.',
      '<b>The ridge is finite.</b> Adits, Malachite Cuts and Limestone Cuts all eat the same rock, 20 tiles ' +
      'around them, and a worked-out tile stops being rock forever. You cannot paint more — the ROCK brush ' +
      'is locked in this age. Plan the second working before you build the first.',
      '<b>Everything up the hill is over the free carting radius.</b> An <b>Overseer\'s Post</b> is not ' +
      'optional infrastructure here, it is the second thing you place.',
    ],
  },
  3: {
    roadYes: '<b>Brush Shelters, Round Huts, the Kill Share, the Groat Share, the Hide Traders\' Post, ' +
      'the Feast Ground, the Traders\' Rock, the Beast Stones, the Resin Post, the Cordage Walk, the ' +
      'Barter Rock and the Enclosure</b>',
    roadNo: 'Aurochs Blinds, Wild Stands, Snail Beds, the groves, the fish traps, the osier beds, the ' +
      'Pillar Quarry, the Flint Diggings, the Smoking Trench, the Pegging Ground, the Parching Floor, ' +
      'the Brew Vats, the Core Shed, the Relief Shed, the Resin Hearth, Spring Heads — and the ' +
      'Carrier\'s Cairn, which is the whole point of it',
    water: 'Shelters, huts and the shares must stand inside a <b>Spring Head\'s</b> four tiles or a ' +
      '<b>Rock-Cut Basin\'s</b> seven. There is no river up here and you cannot dig one: the water comes ' +
      'out of the karst where it comes out, and the WATER brush is locked in this age. Press <b>O</b> to ' +
      'see the rings.',
    extra: [
      '<b>Territory.</b> Two camps of the SAME KIND within reach of each other are working the same herd, ' +
      'the same hillside or the same bend of stream, and they split it: two take two thirds each, three ' +
      'take a half each, four take 40%. DIFFERENT KINDS NEVER INTERFERE — a blind and a stand can sit on ' +
      'top of each other. Nothing here recovers by waiting and no building fixes it; the only answer is ' +
      'ground. Buy the ring before you build the second blind, watch the \u{1F3F9} chip, and read the ' +
      'disc the placement ghost draws before you spend.',
      '<b>The ridge is finite.</b> The Pillar Quarry and the Flint Diggings eat the same rock, 20 tiles ' +
      'around them, and a worked-out tile stops being rock forever. You cannot paint more — the ROCK ' +
      'brush is locked in this age — and the Enclosure alone wants about ten and a half tiles of it.',
      '<b>Spread costs carting.</b> Five blinds twelve tiles apart span the whole free radius exactly, ' +
      'so the sixth starts paying a premium. A <b>Carrier\'s Cairn</b> is not optional infrastructure ' +
      'here: it needs no road and no water, so it can stand out where the camps are.',
    ],
  },
  4: {
    roadYes: '<b>Houses, the Market, the Temple Granary, the Bread Oven, the Raw Goods Stall, the Weigh-House, ' +
      'the Runner Post, the Tablet House, the Craft Storehouse, the Basket Weaver, the Oil Press, the Dye Works, ' +
      'the Wool Bureau and the Ziggurat</b>',
    roadNo: 'Farms, mills, wells, middens, threshing floors, clay pits, kilns, sheepfolds, weavers, breweries, ' +
      'Dredging Crews, Date-Palm Orchards and Fish Weirs — and, less obviously, the Pottery Stall, ' +
      'the Cloth Hall and the Tavern',
    water: 'Most buildings must sit inside a <b>Well’s</b> five tiles, or a <b>Cistern’s</b> eight — ' +
      'and those rings SHRINK as the canals silt up. Press <b>O</b> to see them.',

    extra: ['<b>The canals.</b> Every well silts the channels a little every minute, and a silted ' +
      'channel reaches less ground, so buildings drop out of coverage from the edge inward. A <b>Dredging ' +
      'Crew</b> clears it — roughly one per two wells — and it needs no road and no water, so it still ' +
      'works when everything else has stopped. The <b>Date-Palm Orchard</b> and the <b>Fish Weir</b> need ' +
      'no water either: they are what feed you while you dig out. Watch the 🛶 chip.'],
  },
  5: {
    roadYes: '<b>Villas, the Bazaar, the Granary, the Nomarch’s Granary, the Temple, the Scroll Market, ' +
      'the Brick Wharf, the Block Wharf and the Great Pyramid</b>',
    roadNo: 'Emmer Fields, Estate Farms, Quern Houses, papyrus marshes, the clay beds, the Desert Quarry, ' +
      'palm groves, the fishery, the Scriptorium, the Brick Field, the Masons’ Yard, the House of Books ' +
      'and the Canal Well',
    water: 'Most buildings must sit inside a <b>Canal Well’s</b> eight tiles, or an ' +
      '<b>Inundation Basin’s</b> eleven. Press <b>O</b> to see it.',
    extra: [],
  },
  6: {
    roadYes: '<b>Courtyard Houses, Merchant Block Houses, the Covered Drain, the Cord &amp; Peg Post, ' +
      'the Bale Warehouse, the Bullock-Cart Station, the Hall of Standards, the Seal Cutter’s Office, ' +
      'the Great Granary, every shop, and the Great Bath</b>',
    roadNo: 'Levee Fields, Cotton Fields, Til Fields, the Clay Cut, the Shell Bed, the Cane Cut, the ' +
      'Agate Camp, the Quern Mill, the Kiln, the Spinner’s Court, the Bead Works, the Zebu Byre, the ' +
      'Silt Ditch, the Brick Weir, the Ber &amp; Date Garden and the wells',
    water: 'Most buildings must sit inside a <b>Brick-Lined Well’s</b> six tiles or a <b>Stepped ' +
      'Well’s</b> nine. ★ THE RIVER WATERS NOTHING — only a well does. Press <b>O</b> to see the rings.',
    extra: [
      '<b>The grid.</b> A rectangle 5–8 tiles a side, road on ALL FOUR SIDES, every interior tile ' +
      'built, and the whole thing inside a Covered Drain’s ten tiles: that is a BLOCK, and everything ' +
      'in it runs +30% for −10% upkeep with +1 resident a home. Streets cost 21–31% of your ground, ' +
      'so lay them BEFORE you buy anything — a 5×5 barely pays, an 8×8 pays well, and blocks laid ' +
      'against each other SHARE their streets, so the second one costs half what the first did.',
      '<b>The drain is the fragile part.</b> Mothball one and every block in its circle stops counting ' +
      'at once. The \u{1F4D0} chip shows how many buildings are standing on a single drain.',
    ],
  },
  14: {
    roadYes: '<b>Stone Houses, the Tortilla Plaza, the Stone Yard, the Vase Market, the Chocolate House, ' +
      'the Tribute Storehouse and the Temple-Pyramid</b>',
    roadNo: 'The Cenote Steps, Catchment Courts, Aguadas, Chultuns, Aqueducts, Milpas, Raised Fields, ' +
      'the Nixtamal House, the Apiary, the Limestone Quarry, the Stonecutter’s Lodge, the Marl Pit, ' +
      'the Polychrome Kiln, the cacao groves, the Grinding House and the Market Plaza',
    water: 'Most buildings must sit inside an <b>Aqueduct’s</b> eleven tiles — and the aqueduct only ' +
      'runs while the city’s tank has water in it. Press <b>O</b> to see it.',
    extra: [
      '<b>The tank.</b> Water is a GOOD here, not a free circle. Everything that needs it goes dark the ' +
      'moment the tank hits zero, so buy storage before you buy industry. Watch the \u{1F4A7} chip.',
    ],
  },
};
function eraSite(era) { return ERA_SITE[rungOf(era)] || ERA_SITE._default; }

const ERA_GUIDES = {
  0: {
    headline: 'You are not the chief. You are the thing being watched.',
    mechanic: 'The colony IS the food. A second population you never place takes a share of the herd ' +
      'every minute, and the share depends on the ground you nested on: every tree within 6 tiles of a ' +
      'nest is cover for something. Growing is the defence — a big herd is safer PER HEAD than a small ' +
      'one. Watch the \u{1F995} chip: if nests stand empty, the treeline is why.',
    chain: [
      'Fern Prairie ×3 → Grazing Lawn → Leaf Mat  ·  ~$10/min. Dinner, and it barely pays',
      'Coccolith Shoal ×2 → Chalk Bank → Chalk Downs  ·  ~$19/min. The volume earner, on the sea margin',
      'Bone Bed → Mineral Seep → Petrified Bar  ·  ~$22/min. On the gravel, the one ground you cannot make more of',
      'Resin Conifer Stand ×2 → Amber Seep → Amber Bed  ·  ~$25/min. The ridge — a Spring Seep has to walk up there first',
      'Horsetail Marsh → Peat Swamp  ·  ~$16/min. Two buildings and one landform',
    ],
    firstSteps: [
      'A WATERHOLE first, on open floodplain: 3 tiles, and the sea does not count — coverage comes from a building.',
      'Three FERN PRAIRIES and a GRAZING LAWN: one Lawn is exactly three prairies, and it feeds ten head.',
      'Then trail out and drop NEST MOUNDS in the OPEN. They are $12 — build far more than you think you need.',
      'A MAGNOLIA THICKET on the ash beds: no water, no road, no herd, and it feeds you when the rest goes wrong.',
      'A SENTINEL KNOLL before the fourth chain. $33 buys back a third of a colony nesting in cover.',
    ],
    mistake: 'Nesting in the trees. Every tree within 6 tiles of a nest raises what is taken from it by ' +
      'up to half — and clearing one nest\'s cover costs about $540 at $15 a tile, so the answer is ' +
      'usually to move, or to put a Sentinel Knoll on it. Another nest is never the answer.',
  },
  1: {
    headline: 'Keep the fire alive. Everything else is detail.',

    mechanic: 'Warmth is a utility you MAKE. One Great Hearth warms 18 tiles — the whole camp — but ' +
      'everything inside it burns fuel every minute (wood ×1, bone ×1, charcoal ×3). Run out and every ' +
      'fire dies at once; only outdoor camps keep working. Watch the \u{1F525} chip.',

    chain: [
      'Great Hearth + Melt Pit  ·  warmth and water. Nothing warm-blooded runs without both',
      'Reindeer Drive ×3 → Drying Rack → Meat Stall  ·  ~$31/min. Dinner',
      'Deadwood Cutter → Charcoal Clamp → Fuel Stack  ·  ~$48/min. Fuel, and money',
      'Reindeer Drive ×2 → Hide Frames → Fur Hall  ·  ~$78/min, the richest thing here',
      'Flint Quarry → Knapping Floor → Blade Trader  ·  ~$58/min. Bone carves for ~$52/min',
    ],

    firstSteps: [
      'GREAT HEARTH first, dead centre: its 18-tile circle holds the whole camp, so you only need one.',

      'A DEADWOOD CUTTER second, before any tent — it reaches any distance, eats 500 a tree tile, and leaves ash.',
      'Then a MELT PIT: water goes anywhere here, 5 tiles, no river to find.',
      'Then a FORAGE GROUND on scrub (+50%) — it needs no fire, so it feeds you when the hearths die.',
      'Then road out from the Hearth, raise Hide Tents, and work toward the Painted Cave: 900 ochre, 100 carvings.',
    ],

    mistake: 'Selling charcoal. The Fuel Stack pays $47.60 a real minute — about half your fire — and ' +
      'the Painted Cave wants 300 of it.',
  },
  2: {
    headline: 'A share of what you dig is not yours. The share is fixed; the quota is not.',
    mechanic: 'PAY THE LEVY. Every ' + TUNE.TRIBUTE.periodMin + ' minutes the masters count what they are ' +
      'owed, and every count is ' + Math.round((TUNE.TRIBUTE.growth - 1) * 100) + '% larger than the last ' +
      '— forever, on a curve no camp outgrows. ' + Math.round(TUNE.TRIBUTE.share * 100) + '% of all gold ' +
      'is taken as it is poured, and that is what the quota is paid from. Watch the ⚖️ chip. Miss three ' +
      'counts and the picks go down.',
    chain: [
      'Terrace Plot ×3 → Saddle-Quern Shed → Ration Shed  ·  ~$18/min. Feeds the camp; it does not enrich it',
      'Adit ×3 → Washing Floor → Smelting Hearth → Goldsmith\'s Bench  ·  ~$87/min, and 35% of the gold never arrives',
      'Malachite Cut ×2 → Copper Furnace  ·  ~$34/min. UNTAXED, and it keeps full speed when the picks are down',
      'Timber Camp → Turf Clamp  ·  ~$28/min · Bitumen Seep → Pitch Boilery  ·  ~$29/min, and it lights the mines',
      'Limestone Cut → Dressing Shed → Block Yard  ·  ~$34/min · Goat Pen → Hair-Cloth Shed  ·  ~$29/min',
    ],

    firstSteps: [
      'ROCK-CUT WELL first — the gorge waters nothing here, and the terraces need a ring.',
      'Then TWO TERRACE PLOTS and a SADDLE-QUERN SHED touching one of them (+25% both ways).',
      'Then a GATHERING GROUND. One worker, no well, no road — it is what feeds you when everything else stops.',
      'Then FOUR SHELTERS and a RATION SHED. Bread is a wage here, not a trade: it feeds the camp and barely pays.',
      '★ Then TIMBER CAMP → TURF CLAMP, and only THEN the gold. Two buildings and five mouths earn from the first minute; the gold chain is FOUR deep and pays NOTHING until the Goldsmith\'s Bench at the end of it. Open short, then commit.',
      'PROSPECT PIT → ADIT → WASHING FLOOR → SMELTING HEARTH → GOLDSMITH\'S BENCH, then the OVERSEER\'S POST and the TRIBUTE YARD — the masters skim whether the Yard runs or not, but nothing counts toward the quota unless it does.',
    ],
    mistake: 'Sinking the whole founding purse into the gold chain before anything else sells. It is four ' +
      'buildings deep and earns nothing until the last of them — measured, that opening is bankrupt by ' +
      'minute twenty. The other mistake is the opposite one, later: grinding the levy forever. It compounds ' +
      Math.round((TUNE.TRIBUTE.growth - 1) * 100) + '% a count and your camp does not. Once the gate is ' +
      'met, STOP PAYING — that is how this age ends.',
  },
  3: {
    headline: 'Nobody here plants anything. The harvest is a PLACE, not a field.',
    mechanic: 'KEEP THE CAMPS APART. Two camps of the same kind within reach of each other work the same ' +
      'herd or the same hillside and split it — two take two thirds each, three take a half. DIFFERENT ' +
      'KINDS NEVER INTERFERE. It never recovers by waiting and no building cures it: the only fix is ' +
      'DISTANCE, so this age is bought in RINGS, not blocks. Ranking a camp reaches one tile further, so ' +
      'RANK THE OUTERMOST ONES — ranking the middle of a spread robs its own neighbours. Watch the ' +
      '\u{1F3F9} chip and the disc on the placement ghost, which shows you the cost before you pay it.',
    chain: [
      'Aurochs Blind ×3 → Smoking Trench → Kill Share  ·  ~$24/min. Dinner — and the blinds must be 12 apart',
      'Aurochs Blind ×2 → Pegging Ground → Hide Traders\' Post  ·  ~$57/min, the richest thing here',
      'Wild Stand ×3 → Parching Floor → Groat Share  ·  ~$24/min. The other dinner',
      'Wild Stand ×2 → Limestone Brew Vats → Feast Ground  ·  ~$36/min — and the Enclosure drinks it too',
      'Flint Diggings → Core Shed → Traders\' Rock  ·  ~$44/min. The ridge does not grow back',
      'Pillar Quarry → Relief Shed → Beast Stones  ·  ~$40/min, OR send the carvings to the Enclosure',
      'Osier Beds → Cordage Walk  ·  ~$37/min. The SHORT chain: two buildings, five mouths',
      'Grove ×2 → Resin Hearth → Resin Post  ·  ~$40/min, and the nuts were food before they were pitch',
    ],

    firstSteps: [
      'SNAIL BEDS first, before anything. No water, no track, no herd, no stand — and no camp can ever crowd it. It is the only food in this age nothing can take away.',
      'An AUROCHS BLIND second, out on dry open ground, and REMEMBER WHERE IT IS: nothing else of its kind may come within twelve tiles.',
      'A SMOKING TRENCH touching it (+25% both ways). It needs no water, so it lives out there with the blinds. Game is not dinner until it is smoked.',
      'Then a SPRING HEAD, a track from the Enclosure, and BRUSH SHELTERS inside its four tiles — beds are what turn the crew into a town.',
      '★ Then OSIER BEDS → CORDAGE WALK, and only THEN the deep chains. Two buildings and five mouths that SELL from the first minute; hide is three deep and blades are three deep behind a finite ridge. Open short, then commit.',
      'A KILL SHARE once four people are housed, then a CARRIER\'S CAIRN — before the second Aurochs Blind, not after. Five blinds twelve tiles apart already span the whole free carting radius, and the sixth is what the Cairn is for.',
    ],
    mistake: 'Building the second Aurochs Blind beside the first. It costs the full $101 and returns a ' +
      'THIRD of a camp — and the ring of land that would have made it a whole camp costs less than the ' +
      'camp does. In this age you buy the ground first and the building second.',
  },
  4: {

    headline: 'Grain feeds your people. CRAFT GOODS make you rich.',

    mechanic: 'KEEP THE CANALS OPEN. Every well you sink silts up the channels a little faster, and as the ' +
      'silt rises every well reaches LESS GROUND — watch the 🛶 chip, which shows how choked they are and how ' +
      'long you have. A DREDGING CREW clears it: about one per two wells. Another well makes it worse, not ' +
      'better. Let it choke and everything that needs water stops — but Date Palms and Fish Weirs need none, ' +
      'so the city still eats while you dig out. ' +
      'And cropped ground separately turns salty and yields less — press O twice for the SALT MAP. ' +
      'Leave a field fallow and it recovers; a Midden or Shaduf in range, or a spot beside water, speeds that up ×3; ' +
      'Date Palms ignore the salt and thrive on ruined ground; Sesame salts it at half rate.',
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

  6: {
    headline: 'Lay the streets first. The buildings go in the holes.',
    mechanic: 'THE GRID. A rectangle 5 to 8 tiles a side, ROAD ON ALL FOUR SIDES, every tile inside ' +
      'it built, and the whole rectangle inside a COVERED DRAIN’s ten tiles, is a BLOCK: +30% output, ' +
      '−10% upkeep, +1 resident in every home, and it is the only place a Merchant Block House can ' +
      'stand. Streets take 21–31% of your ground, so a 5×5 barely pays and an 8×8 pays well — and a ' +
      'block laid against one you already have shares its street, so the second costs half the first. ' +
      'Mothball the drain and every block in its circle stops counting at once. Watch the 📐 chip.',
    chain: [
      'Levee Field → Quern Mill → Grain Street Market  ·  $54/min. Feeds the city, and it needs no well',
      'Sarkanda Cane Cut → Matting Court → Crate Counter  ·  $91/min. Cheapest to stand up, and it never made anyone rich',
      'Clay Cut → Fired-Brick Kiln → Standard Brick Yard  ·  $99/min. Your drains and your Bath eat from this pile',
      'Cotton Field → Spinner’s Court → Bale House  ·  $129/min. Sold to Mesopotamia, which called this place Meluhha',
      'Chank Shell Bed → Bangle Sawyer’s Court → Bangle Counter  ·  $129/min. Cotton’s money, off the bank instead of the levee',
      'Til Field ×2 → Sesame Oil Mill → Oil Row  ·  $134/min. TWO fields per mill — the one chain that is not 1:1:1',
      'Agate Camp → Bead Drilling Works → Seal & Bead House  ·  $135/min. +50% on the chert ridge, at the far edge of the map',
    ],
    firstSteps: [
      'LEVEE FIELDS first. They need no well, no road and no street, so the founding party can work them the moment you place them — which is what releases the other eight into the labour pool.',
      'Then PAINT THE ROAD: a 7×7 ring with a 5×5 hole in it, 24 tiles, $240. This is the first age where the street comes BEFORE the building, and it is the whole idea.',
      'Then a COVERED DRAIN beside the street. It needs a road and no workers, its ten tiles cover the whole block and more — and WITHOUT IT THE BLOCK EARNS NOTHING AT ALL. It is the step a first player skips, and it is $200.',
      'Now FILL THE HOLE, EXACTLY 25 TILES. Four 2×2s in the corners — QUERN MILL, GRAIN STREET MARKET, TIL FIELD and a second LEVEE FIELD — and the nine tiles left in the middle make a cross.',
      '★ THE FOUR ARMS OF THAT CROSS TOUCH THE STREET AND THE CENTRE FIVE DO NOT, which decides what goes where: COURTYARD HOUSES on the arms, because a house needs a road — and in the middle a BRICK-LINED WELL, a BATHING PLATFORM, a SUNKEN JAR ROW, a SILT DITCH and a PEEPAL TREE COURT, because none of those does. That is a Harappan block: doors on the lane, the well and the tree in the courtyard.',
      'Then a BER & DATE GARDEN outside, on the worst ground you own. It needs no water, no road and no street, and it is what feeds you through anything.',
      'Grow by laying the NEXT block against the first. Its ring shares your existing street, so it costs 13 tiles instead of 24 — the grid gets cheaper the more of it you have.',
    ],
    mistake: 'Filling a block with houses. Twenty-five Courtyard Houses is $5,000 and the block still ' +
      'only pays +30% — put the mill, the market and a field INSIDE it and the houses in the next one.',
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

  const g = ERA_GUIDES[Util.clamp(rungOf(era), 0, MAX_ERA)];
  if (g) return g;
  return {
    headline: 'This age is still being carved.',

    mechanic: 'The rung exists on the ladder, but its guide, chains and mechanic have not been written yet. ' +
      'Siting still works the same way, and H shows you what this city is short of.',
    chain: ['Build food first, then the earning chains — every age keeps that shape.'],
    firstSteps: ['Water (or its era\'s equivalent) first.', 'Roads from the seat of power.', 'Housing near the work.'],
    mistake: 'Assuming this age plays like the last one. When it is written, it will not.',
  };
}
