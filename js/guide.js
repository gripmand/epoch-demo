'use strict';

const ERA_ANCHOR = {

  0:  { name: 'The Landmark',       short: 'Landmark',   note: 'A sixty-metre araucaria on a rise, standing alone above the fern. The whole camp is laid out around it, and nothing on this floodplain is out of sight of it. It is not a seat of power — it is the thing everyone can find their way back to.' },

  1:  { name: 'The Long Hearth',    short: 'Hearth',     note: 'Not a government — a fire that is never allowed to go out. The band sleeps in its heat and the tally of the season is cut into bone beside it.' },
  2:  { name: 'The Overseer\'s Compound', short: 'Compound', note: 'In the Atrahasis the lesser gods dug the canals, rebelled, and people were made from clay to bear the labour instead. This is where the quota is set. The gold is not yours.' },

  3:  { name: 'The Enclosure',      short: 'Enclosure',  note: 'A ring of carved T-shaped pillars — and around it houses, hearths, rock-cut basins and seven thousand grinding stones. People lived here. What they never did was sow anything: every mouth in this town is fed by a harvest nobody planted.' },

  4:  { name: 'Temple Household',   short: 'É',          note: 'The É — the god\'s house. In Sumer the temple, not a palace, collected the harvest, stored the seed and issued the rations.' },
  5:  { name: 'Nomarch\'s Estate',  short: 'Per-Nesu',   note: 'The provincial governor\'s seat, which assessed the flood, counted the cattle and set the grain tax.' },

  6:  { name: 'The Granary Platform', short: 'Platform', note: 'No palace, no temple and no royal tomb has ever been identified here. What governed was a raised brick podium nobody can put a name to, the standard brick and the drains — administration as plumbing.' },
  7:  { name: 'The Palace Store',   short: 'Palace',     note: 'Everything comes in and everything goes back out. No marketplace, no coinage and no shop has been identified anywhere in the Bronze Age Aegean — what has been read off the tablets is a list of names and what each was issued. They are not literature; they are receipts.' },
  8:  { name: 'The Ancestral Hall', short: 'Ancestral Hall', note: 'Shang kingship ran on divination and rite. The cracked oracle bones under the floor are the state archive.' },
  9:  { name: 'The Marae',          short: 'Marae',      note: 'Open ground, not a building. Lineage is recited here and a voyage is sanctioned here before a hull is ever cut.' },
  10: { name: 'Prytaneion',         short: 'Prytaneion', note: 'The civic hearth of the polis. Its fire was never allowed to go out.' },
  11: { name: 'The Comitium',       short: 'Comitium',   note: 'Open assembly ground, before anyone thought to roof it. The Republic is argued standing up.' },
  12: { name: 'The Founder\'s Agora', short: 'Agora',    note: 'A city planted deliberately, a long way from home. The grid and the founder\'s cult were laid out in the same week.' },

  13: { name: 'Curia',              short: 'Curia',      note: 'The senate house on the forum, where the prefect of the annona answered for the bread. The city below it has outgrown every field within a day\'s cart, and somebody has to sign for the difference.' },
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

  9:  { icon: '\u{1F4CB}', tally: 'The Steward’s Count', tallyBtn: "Steward's Count",
        tallySub: 'Every terrace on the wedge, what it grew and who owes days on it — all of it in ' +
                  'one person’s head.',
        chronicle: 'The Genealogy', chronBtn: 'Genealogy',
        chronSub: 'Recited, not written. It keeps the last 200 things worth saying aloud.',
        keeper: "a Konohiki's House" },
  8:  { icon: '\u{1FAA1}', tally: 'The Bone Tally', tallyBtn: 'Bone Tally',
        tallySub: 'Scored into scapula and plastron, heated until it cracks, then read.',
        chronicle: 'The Oracle Record', chronBtn: 'Oracle Record',
        chronSub: 'Cut into the bone beside the crack, after the answer was read. The archive keeps ' +
                  'the last 200 entries.',
        keeper: "a Diviner's Court" },
  7:  { icon: '\u{1F4DC}', tally: 'The Tablets', tallyBtn: 'Tablets',
        tallySub: 'What was issued, to whom, and what came back in.',
        chronicle: 'The Archive', chronBtn: 'Archive', chronSub: 'Set down in wet clay and filed by the month. The record keeps the last 200 entries.',
        keeper: 'the scribe of the west magazine' },
  0:  { icon: '\u{1FAA8}', tally: 'The Layer Count', tallyBtn: 'Layers',
        tallySub: 'What this camp has laid down, and what is left of it.',
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

  10: { icon: '\u{1F5D2}\u{FE0F}', tally: 'The Deme Register', tallyBtn: 'Deme Register',
        tallySub: 'Whitewashed boards in the agora, repainted each year.',
        chronicle: 'The Archon List', chronBtn: 'Archon List',
        chronSub: 'Cut into stone under the year’s archon. It keeps the last 200 entries.',
        keeper: 'an Anagrapheis Office' },
  11: { icon: '\u{1F4DC}', tally: 'The Tabulae', tallyBtn: 'Tabulae',
        tallySub: 'Wax and wood, closed at the lustrum and filed by tribe.',
        chronicle: 'The Fasti', chronBtn: 'Fasti',
        chronSub: 'Entered under the year’s consuls, on stone. It keeps the last 200 entries.',
        keeper: 'a Tabularium' },
  12: { icon: '\u{1F4C3}', tally: 'The Roll', tallyBtn: 'The Roll',
        tallySub: 'Reed pen on papyrus, in the hand of a clerk who was sent here too.',
        chronicle: 'The Ephemeris', chronBtn: 'Ephemeris',
        chronSub: 'A day-book, written up each evening and shelved. It keeps the last 200 entries.',
        keeper: 'a Bibliotheke' },

  13: { icon: '\u{1F33E}', tally: 'The Incisio', tallyBtn: 'The Incisio',
        tallySub: 'The grain roll, cut on bronze tesserae. Heads, not citizens.',
        chronicle: 'The Acta Diurna', chronBtn: 'Acta Diurna',
        chronSub: 'Whitewashed and posted in the forum each morning. It keeps the last 200 entries.',
        keeper: 'an Atrium Libertatis' },
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
  9:  { icon: '\u{1F6F6}', title: 'Name This Island',
        sub: 'Somebody sailed here on purpose, without knowing it was here. The name goes on the marae.',
        placeholder: 'Hiva-of-the-Long-Reef', ok: 'Name the island', skip: 'It needs no name yet',
        founded: ' was named, and the hull was hauled up the ramp and left there.',
        toast: ' is named. May every crossing come back.' },
  8:  { icon: '\u{1F3DB}\u{FE0F}', title: 'Name Your City',
        sub: 'The diviners will put the question to the ancestors and cut the answer into bone.',
        placeholder: 'Great Settlement Shang', ok: 'Found the city', skip: 'It needs no name yet',
        founded: ' was founded on the break of slope — above the wet ground and below the ridge.',
        toast: ' is founded. May the water run the way you send it.' },

  0:  { icon: '\u{1F332}', title: 'Name This Camp',
        sub: 'Nothing here can write it down. Sixty-six million years from now, somebody will read it out of the mud anyway.',
        placeholder: 'The Landmark Beds', ok: 'Name the camp', skip: 'Leave it unnamed',
        founded: ' was laid down, layer on layer, in the same mud.',
        toast: ' is named — and the ground is already keeping the record.' },
  7:  { icon: '\u{1F300}', title: 'Name This Palace',
        sub: 'Whatever the people here called it, the name we use is the one a stranger wrote down.',
        placeholder: 'Ka-no-so', ok: 'Name the palace', skip: 'Leave it unnamed',
        founded: ' was founded, and the first tablet was filed the same day.',
        toast: ' is founded. Every jar in it will be counted.' },
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

  13: {
    roadYes: '<b>the Cenaculum and the Insula, the Panificium, the Olearia, the Officina Samia, ' +
      'the Officina Statuaria, the Fistularia, the Armamentarium, the STATIO ANNONAE and the ' +
      'NAVICULARIUM, the Castellum Aquae, the Horreum, the Thermae, the Atrium Libertatis and the ' +
      'Colosseum</b>',
    roadNo: 'the Puteus, the Centuriated Field, the Pistrinum, the Stercorarium, the Stagnum ' +
      'Lucrinum, the Pomarium, the Olivetum, the Torcularium, the Argilla, the Figlina, the ' +
      'Lapicidina, the Officina Marmoraria, the Pozzolana Pit, the Officina Caementicia, the ' +
      'Plumbaria, the Ustrina, the Ager Linarius, the Textrinum and the Columna — and note ' +
      'especially <b>the PUTEUS and the POMARIUM, which between them need no road, no water ' +
      'near them and nothing from anybody, and which are the first two things you should put ' +
      'down</b>.',
    water: 'Twenty of the thirty-four want to be inside a <b>Puteus</b>’s twelve tiles or a ' +
      '<b>Castellum Aquae</b>’s eighteen — homes, the field, the mill, every workshop and every ' +
      'counter. ★ NEITHER OF THEM NEEDS TO STAND NEAR WATER: a shaft well is sunk where the ' +
      'people are, and the castellum is where the line from the hills ENDS. The Puteus costs ' +
      '$590 and needs no road either; the Castellum costs $1,970, needs one, and reaches the ' +
      'widest circle on the ladder. Press <b>O</b> to see the rings. ★ There is no aqueduct to ' +
      'plan and no gradient to solve — water here is a DISC, exactly as it was at rung 12.',
    extra: [
      '<b>Whatever dinner cannot cover out of your own stores is BOUGHT, automatically, every ' +
      'minute, out of the treasury</b> — and the price rises with how much of it there is. ' +
      'Nothing turns red and nothing stops; the money simply goes. The 🌾 chip prints the ' +
      'multiplier, what you are buying against what your works can land, and how long the ' +
      'treasury carries the bill at today’s price.',
      '<b>Landings are the only thing that makes the grain cheaper, and they are BUILDINGS.</b> ' +
      'A STATIO ANNONAE lands 1.5 rations a minute and needs a road and nothing else; a ' +
      'NAVICULARIUM lands 3.0 and wants to be within three tiles of the river. Every ration ' +
      'above what they can land reprices <b>the whole shipment</b>, not just the excess.',
      '<b>Bought bread does not open the age.</b> The food gate counts what this city GREW — ' +
      'the Centuriated Field, the Stagnum Lucrinum and the Pomarium — and the annona is credited ' +
      'to none of it. A city that buys its way through rung 13 survives forever and never leaves.',
      '★ <b>Two things are not in the founding parcels and the map says so on every seed:</b> ' +
      'open water for the STAGNUM LUCRINUM (7-9 tiles, one parcel out) and an outcrop for the ' +
      'LAPICIDINA (eleven tiles, three parcels). The quarry is your EXIT — 15,846 stone, and the ' +
      'Colosseum’s marble wants eight times that again — so it is worth walking to early. ' +
      'Nothing in the age deadlocks on either.',
    ],
  },
  12: {
    roadYes: '<b>the Katoikia and the Amphodon, the Artopolion, the Lachanopolion, the ' +
      'Hyalopolion, the Chartopoleion, the Dromos, the Pissopolion, the NEORION, the Apotheke, ' +
      'the Katagogion, the Bibliotheke, the Trapeza, the Agoranomion and the Pharos</b>',
    roadNo: 'the Kleros, the Paradeisos, the Aipolion, the Mareotis, the natron flats, the ' +
      'Latomia, the Hyle, the Hydromylos, the Hyalourgeion, the Diphtheron, the Lithoxoeion, the ' +
      'Hydreion and the Dexamene, the Thesauros, the Plateia, the Kopron, the Gymnasion, the ' +
      'Heptastadion and the Heroon — and note especially <b>the KLEROS and the PARADEISOS, which ' +
      'need no road, no water and nothing from anybody, and which between them are the whole ' +
      'dinner of a founding city</b>',
    water: 'Homes, the mill, the glasshouse, the parchment works, the Agoranomion and three of ' +
      'the shops must sit inside a <b>Hydreion’s</b> eleven tiles or a <b>Dexamene’s</b> sixteen. ' +
      '★ THE DEXAMENE NEEDS NO WATER NEAR IT AT ALL — a plastered cistern is filled by rain and by ' +
      'hand, and it is what lets a founding city put its water where its people are instead of ' +
      'where the harbour is. The Hydreion is the cheap one and must touch the bank. Press ' +
      '<b>O</b> to see the rings. ★ And there is no aqueduct in this age and will not be one: ' +
      'water here is a DISC, not a quantity.',
    extra: [
      '<b>A citizen of this city is not born here and does not wander in. A citizen is SENT.</b> ' +
      'Every settler who arrives spends one CROSSING out of your store, and when the store is ' +
      'empty nobody comes — your houses stand built, fed, watered, connected and EMPTY, with a red ' +
      '! on every one of them. The ⛵ chip counts what you are holding and how many beds are ' +
      'waiting on it. Nothing else in the game is subtracted; the city simply stops growing.',
      '<b>Crossings are made by a chain like any other, and they can never be sold.</b> THE HYLE ' +
      'taps resin on any dry slope and THE NEORION turns it into berths — 4.245 a minute, against ' +
      'a natural pull of 8. ★ ONE CHAIN RUNS YOUR CITY AT HALF SPEED AND TWO IS THE AGE. The ' +
      'labour and the ground you spend on them earn NOTHING directly: `passage` has no shelf price ' +
      'anywhere and cannot be dumped abroad. What you can sell is the surplus RESIN, at the ' +
      'Pissopolion — and the yard always draws first.',
      '<b>Bank crossings before you build the houses that will need them.</b> This is the age’s ' +
      'one real skill and it costs exactly what it looks like it costs. Fill the store while ' +
      'ground is cheap and hands are spare; an APOTHEKE raises what you can hold, because a berth ' +
      'banks like any other traded good. A city that builds an Amphodon first has thirty-eight ' +
      'beds and no way to fill them.',
      '<b>The natron is not in the city and the quarry is not either.</b> The NATRON FLATS want a ' +
      '2×4 of pan and the nearest is 19 to 39 tiles out on three seeds; a quarry-grade 3×3 of rock ' +
      'is 12 to 13. Neither is in the founding grant and nothing deadlocks on either — the glass ' +
      'chain is an export and the stone is your EXIT, so walk to the rock early and to the pans ' +
      'when you can afford the ground.',
      '<b>One stone yard cannot cover the tower and the trade.</b> The LITHOXOEION dresses 4.245 ' +
      'courses a minute; the Pharos draws 3.00 of it and the DROMOS wants 1.22 to sell. That is ' +
      'the age’s one real production squeeze and it is deliberate — a second yard, a rank, or a ' +
      'decision about which of the two you would rather have waiting.',
    ],
  },
  11: {
    roadYes: '<b>the Casa Colonica and the Atrium Domus, the Macellum, the Forum Holitorium, the Forum ' +
      'Piscarium, the Taberna Vestiaria, the Mercatus Tegularum, the Crepidines, the Porticus Aemilia, ' +
      'the Stabulum, the Tabularium, the Aerarium, the Moneta and the Capitolium</b>',

    roadNo: 'Arva, the Hortus, the Ovile, the Vivarium, the Salinae, the Cretifodina, the Silicaria, ' +
      'the Mola Asinaria, the Salsamentaria, the Fullonica, the Officina Tegularia, the Officina ' +
      'Silicis, the Lacus and the Piscina Limaria, the Doliarium, the Saepta, the Sterquilinium, the ' +
      'Basilica, the Pons Sublicius and the Rostra — and note especially <b>the ARVUM and the HORTUS, ' +
      'which need no road, no water and nothing from anybody, and which between them are the whole ' +
      'dinner of a founding city</b>',
    water: 'Homes, the mill, the salting house, the fullery, the tile works and the shops must sit ' +
      'inside a <b>Lacus’s</b> ten tiles or a <b>Piscina Limaria’s</b> fifteen. ★ THE PISCINA NEEDS NO ' +
      'WATER NEAR IT AT ALL — a settling tank is filled by hand and by winter rain, and it is what ' +
      'lets a founding city put its water where its people are instead of where the river is. The ' +
      'Lacus is the cheap one and must touch the bank. Press <b>O</b> to see the rings. ★ And there ' +
      'is no aqueduct in this age and will not be one: water here is a DISC, not a quantity.',
    extra: [
      '<b>Your city is governed by the last census it took.</b> A building finished since the censors ' +
      'closed the roll works perfectly and is invisible: no shop sells to the people in it, the ' +
      'Aerarium collects nothing from them, the era gate does not count them — and they still eat. ' +
      'Nothing turns red, because nothing is wrong. The 🏛️ chip prints who pays you and who eats, and ' +
      'the gap between them is the whole age. Order the lustrum at the Hall.',
      '<b>The register counts HOUSES, not heads — so count them while they are empty.</b> A lustrum ' +
      'costs $100 flat plus $10 for every uncounted person, and a house that went up a minute ago has ' +
      'nobody in it yet. Enter a new quarter the day you build it and you pay close to the flat fee; ' +
      'let it fill first and you pay for all of them. Two ways to play it and they cost about the ' +
      'same in fees — count often and pay the $100 more times, or batch and pay the heads. ★ THE FEE ' +
      'IS NOT THE EXPENSIVE PART EITHER WAY: six lustra across the age is about $1,700 against a ' +
      '$983,339 exit. What costs you is the share of your own city that is eating and not buying, ' +
      'every minute you leave it uncounted. A TABULARIUM takes a quarter off each head; two is the ' +
      'ceiling.',
      '<b>One paving works cannot cover the temple and the trade.</b> The OFFICINA SILICIS dresses ' +
      '3.70 silex a minute; the Capitolium draws 3.00 of it and the CREPIDINES wants 1.06 to sell. ' +
      'That is the age’s one real production squeeze and it is deliberate — a second works, a rank, or ' +
      'a decision about which of the two you would rather have waiting.',
      '<b>The salt is not in the city and it never was.</b> The SALINAE wants a 2×4 of salt flat, and ' +
      'measured on three seeds the nearest one is 34 to 39 tiles out — about nine parcels and $12,500 ' +
      'of ground. That is a mid-age expansion, not an opening: nothing in the age deadlocks on it, the ' +
      'monument’s third leg is SILEX and not salt, and the reason the road out to the flats has a name ' +
      'is precisely that the salt was fifteen miles down the river.',
    ],
  },
  10: {
    roadYes: '<b>the Oikos and the Synoikia, the Agora, both merchant stoas, the Kapeleion, the Kylix ' +
      'Row, the Emporion, the Stoa Warehouse, the Bouleuterion, the Deigma and the Parthenon</b>',

    roadNo: 'Olive Groves, Terraced Vineyards, Fig Terraces, Bean & Lentil Plots, Fisher’s Slipways, ' +
      'Kolonos Clay Beds, the Pentelic Quarry, the Laurion Galleries, the Skimming Hearths, the Marble ' +
      'Works, the Krene and the Public Cistern, Pithos Stores, the Peribolos Wall, the Agora Precinct, ' +
      'the Palaestra, the Metroon, the Harbour Mole and the Herm — and note especially <b>the BEAN & ' +
      'LENTIL PLOT and the FIG TERRACE, which need no road, no water and nothing off a quay, and which ' +
      'between them close HALF the table</b>',
    water: 'Homes, shops, the mills and presses, the washery and the civic buildings must sit inside a ' +
      '<b>Krene’s</b> nine tiles or a <b>Public Cistern’s</b> thirteen. ★ THE CISTERN NEEDS NO WATER ' +
      'NEAR IT AT ALL — this is a limestone country that catches winter rain, and the answer to a dry ' +
      'hill is a cistern on top of it rather than a longer walk. The Krene is the cheap water; the ' +
      'Cistern is the one that goes where there is none. Press <b>O</b> to see the rings.',
    extra: [
      '<b>Bread is half a table and never more.</b> No single food may cover more than its share of a ' +
      'citizen’s meal — bread 50%, figs, pulses and fish a quarter each, and anything carried in from ' +
      'another age a quarter. A city with a full granary and nothing else feeds HALF of itself and the ' +
      'hunger clock runs on the rest. Watch the ⚖️ chip: it prints every leg, names the shortest, and ' +
      'the answer it is asking for is never more of what you already have.',
      '<b>Your bread is bought, not grown.</b> The EMPORION turns 0.64 oil a minute into 12.67 wheat — ' +
      'one measure of oil for twenty of Pontic grain — and it is the only wheat in the age. It shares ' +
      'that oil with the Oil Merchant’s Stoa, and <b>the quay draws first every tick</b>, so what the ' +
      'stoa sells is what your dinner did not want. You can still starve with a full olive press if you ' +
      'build four stoas and one quay.',
      '<b>The ridge is finite and two chains are eating it.</b> The PENTELIC QUARRY cuts marble and the ' +
      'LAURION GALLERIES mine silver ore, and both spend the same rock: 900 to a tile and then it is ' +
      'grass forever. The quarry is your EXIT (4,243 marble) and the galleries are your richest chain; ' +
      'they are not friends. A worked-out outcrop was somebody’s terrace, and the Peribolos Wall is ' +
      'what stops the hillside following it into the sea.',
      '<b>Terrain is thin and that is a gift here.</b> Only a narrow band beside the water is FERTILE, ' +
      'and the Olive Grove, the Vineyard, the Fig Terrace and the Bean Plot all want <b>dry land</b> — ' +
      'they are refused on the fertile ribbon, not helped by it. The scree nothing else wants is where ' +
      'three quarters of your table and all of your export grows. ★ And FERTILE cannot be painted in ' +
      'this age at any price: Attica does not become the black land because you paid for it.',
    ],
  },
  9: {
    roadYes: '<b>Hale Pili and Hale Noa, every stall, hall and works, the Hale Pāʻā, the Imu, the ' +
      'Wayfinding Court and the Adze Standard</b>',

    roadNo: 'Loʻi Pondfields, Coconut Groves, Wauke Gardens, Breadfruit Groves, Pearl-Shell Beds, ' +
      'Reef Stations, the Loko Iʻa, Reef Salt Pans, Birdcatchers’ Camps, the Basalt Adze Quarry, ' +
      'Punawai, Mulch Pits, Gourd Stores, Hālau, Reef Shrines — and <b>the CANOE LANDING, which needs ' +
      'neither a road nor a spring, because it is what you put on an island the day you land on it</b>',
    water: 'Homes, shops, workshops and the stores must sit inside a <b>Punawai’s</b> five tiles or a ' +
      '<b>Stone Tank’s</b> eight. ★ THE OCEAN IS NOT WATER — three quarters of this map is sea and none ' +
      'of it counts; coverage comes from a spring and never from water on the ground. A hut on the ' +
      'beach is as dry as one on the ridge. Press <b>O</b> to see the rings.',
    extra: [
      '<b>Land is not always for sale.</b> Everywhere else on the ladder a parcel can be bought if it ' +
      'touches ground you own. Here the next parcel is usually water — so a <b>CANOE LANDING</b>, ' +
      'standing where open sea actually touches it, opens every shore within <b>26 tiles of water</b> ' +
      'as ground you may buy. A <b>WAYFINDING COURT</b> adds 6 tiles to every Landing at once; each ' +
      '<b>RANK</b> on a Landing adds 2 more. Click a parcel the age refuses and it tells you exactly ' +
      'how many tiles short you are.',
      '<b>A landfall costs 2.5×, and the Court makes it 1.8×.</b> Ground nobody walked to is ground ' +
      'every stone and every person on it arrived by canoe. It is also <b>permanent</b> — a Landing ' +
      'that stops running takes back nothing you have already bought, which is why the LASHING ORDER ' +
      'is worth switching on for one crossing and off again afterwards.',
      '<b>The sea cannot be filled and it cannot be walked across.</b> Every terraform brush refuses a ' +
      'water tile in this age, at any price — the same refusal ash gets in every age. And open water ' +
      'does not carry your border: you may buy the lagoon at your own shore, but the parcel past it ' +
      'is refused, so a chain of ocean parcels never reaches anything.',
      '<b>A CORAL CAUSEWAY answers a SHORT strait and nothing else.</b> Laid on water you own, it ' +
      'counts as road, so a line of them joins a near island to your network — which matters, because ' +
      'a far island’s homes and shops read <i>no road</i> until something carries the road to them. ' +
      'Anything you cannot own the water for is a job for a Landing.',
    ],
  },

  _default: {
    roadYes: '<b>housing, the places that sell, the places that store and the age’s monument</b>',
    roadNo: 'Fields, workshops and the things that work the land where the land is',
    water: 'Most buildings must sit inside this age’s water coverage. Press <b>O</b> to see it.',
    extra: [],
  },
  0: {

    roadYes: '<b>Fern Bowers, Thatch Rows, the Leaf Mat, Chalk Downs, the Petrified Bar, the ' +
      'Amber Bed, the Egg Bed, the Peat Swamp, the Channel Lag and the Refuge</b>',
    roadNo: 'Fern Prairies, Drying Lawns, Coccolith Shoals, Chalk Banks, Bone Beds, Mineral Seeps, ' +
      'Resin Conifer Stands, Amber Seeps, Clutch Mounds, Horsetail Marshes, Waterholes, Spring Seeps, ' +
      'the Ford, the Log Jam, the Soak, the Sentinel Knoll and the Carrion Ground — and, less ' +
      'obviously, the Magnolia Thicket and the Rot-Wood Bed, which need nothing at all',
    water: 'Most buildings must sit inside a <b>Waterhole’s</b> five tiles or a <b>Spring Seep’s</b> ' +
      'eight — and <b>thirty of this age’s buildings need water</b>, more of them than in any other. ' +
      '★ THE SEA DOES NOT COUNT: coverage is stamped only by a placed building, never by the ' +
      'water you are standing beside. Press <b>O</b> to see it. ★ A prairie sited two tiles too far ' +
      'looks built, costs upkeep and makes NOTHING — that is what the red <b>!</b> is telling you.',
    extra: [
      '<b>The trophic loop.</b> Every shelter loses a share of the people in it every minute, and the ' +
      'share rises with the TREE COVER within six tiles of it. Camp in the open and forage in the ' +
      'shelter — the opposite of what a city builder trains. A <b>Sentinel Knoll</b> cuts it by a ' +
      'quarter and costs no food; a <b>Carrion Ground</b> cuts it by nearly half and is paid for in ' +
      'clutches, which is a bribe laid where you are not. The <b>Magnolia Thicket</b> and the ' +
      '<b>Rot-Wood Bed</b> feed you either way. Watch the \u{1F995} chip.',
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
  8: {
    roadYes: '<b>Courtyard and Clan Compounds, every counter and hall, the granaries and stores, the ' +
      'Cauldron Court, the Cowrie Treasury, the Diviner’s Court and the two yards that ship walling</b>',
    roadNo: 'Diversion Gates, Field Ditches, Cut Channels, wells and cisterns, Bunded Rice Fields, ' +
      'Millet Fields, Mulberry Groves, the Ore Adit, Salt-Lake Pans, the Quarry, Apricot Orchards, the ' +
      'River Weir, the Ox Pens, the Bone Midden, the Manure Pits, the Trough Hammer, the Pestle Yard, ' +
      'the Ale Shed, the Silkworm Shed, the Reeling House, the Loom Shed, the Foundry, the Boiling ' +
      'Shed, the Bone Carver’s Yard, the Pit Granary and the Altar Terrace',
    water: 'Homes, shops and workshops must sit inside a <b>Windlass Well’s</b> nine tiles or a ' +
      '<b>Lined Cistern’s</b> sixteen. ★ STANDING BESIDE THE RIVER DOES NOT COUNT — coverage comes ' +
      'from a well and never from water on the ground. Press <b>O</b> to see the rings.',
    extra: [
      '<b>Head runs downhill.</b> A Bunded Rice Field does not want a radius, it wants HEAD. A ' +
      '<b>Diversion Gate</b> emits 6.0 a minute and a field draws 2.0, so <b>THREE FIELDS TO A ' +
      'GATE</b> — at any distance, because a ditch loses nothing to length. What stops it is the ' +
      'GROUND: head reaches a tile level with the last one or ONE STEP BELOW it, and never a step ' +
      'above. A rise in the way stops everything past that tile dead, and the only things that answer ' +
      'a rise are the <b>CUT</b> brush and a <b>Cut Channel</b>. A well never is.',
      '<b>You can move the earth here, and nowhere else on the ladder.</b> <b>RAM</b> raises a tile ' +
      'one step and <b>CUT</b> drops it one, in the Terraform palette. That is how a flat corner of ' +
      'the map becomes a fan, and how a fan you broke gets fixed. It is also how you break one: ram a ' +
      'platform above your own ditch and everything below it goes dry on that tick.',
      '<b>A dry field is not a dead field.</b> With no head at all a bund still takes 15% off the ' +
      'rain, so a mistake bleeds instead of killing — and it flies an amber marker, never a red !. ' +
      'Click it and it names the tile the run broke at.',
      '<b>The two staples run opposite clocks.</b> A Bunded Field never salts its ground, because the ' +
      'standing water washes the salt down past the roots. A Millet Field salts up normally and wants ' +
      'the LOESS MANURE PITS beside it. Build one of each and watch.',
    ],
  },
  7: {
    roadYes: '<b>Ashlar Houses, Town Houses, every magazine, the Stirrup-Jar Store and the Mule Train ' +
      'Post</b> — and that is nearly the whole list, because in this age the road is what connects a ' +
      'building to a STOREROOM rather than to a customer',
    roadNo: 'Emmer Plots, Fig Orchards, Olive Terraces, the Press Room, the Perfumery, Hill Pastures, ' +
      'Crocus Meadows, the Copper Adit, the Gypsum Cutter, the Clay Bank, the Seine Net Station and ' +
      'the Spring Houses',
    water: 'Most buildings must sit inside a <b>Spring House’s</b> seven tiles or a <b>Conduit ' +
      'House’s</b> ten. ★ THE SEA WATERS NOTHING — this island is ringed with undrinkable water and ' +
      'only a well counts. Press <b>O</b> to see the rings.',
    extra: [
      '<b>The roll.</b> Anything that PRODUCES or SHIPS must stand inside a magazine’s disc, and the ' +
      'palace can only carry as many of them as it can hand a ration to — <b>oil and figs, every ' +
      'minute, per building on the roll</b>. When it runs short it drops the buildings FURTHEST from ' +
      'a magazine first. So what you put closest to a storeroom is what survives a bad minute. Watch ' +
      'the 📜 chip: it reads how many of your producers are on the roll and how much room is left.',
      '<b>Nothing here is off the roll except the palace’s own estate.</b> The Olive Terrace, the ' +
      'Press Room, the Fig Orchard, the Seine Net Station and every magazine are never billed and can ' +
      'never be dropped — they ARE the administration. That is why a city that has lost its issue can ' +
      'always climb back: the olives still press and the figs still ripen.',
      '<b>Mothballing is a real move here and nowhere else.</b> A mothballed building draws no ration, ' +
      'so shutting a quarter deliberately is how you keep the rest of the city on the roll while you ' +
      'build another Press Room. This is the one age whose answer can be to run LESS.',
      '<b>The scarp is the exit.</b> The next age is the first on the whole ladder that asks this one ' +
      'for STONE. The Gypsum Cutter is the only building that makes it, it has to stand on the ' +
      'limestone spine, and the spine does not grow back.',
    ],
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

  9: {
    headline: 'You can see land you are not allowed to buy. That is the whole age.',
    mechanic: 'REACH. Ownership has always grown from ground you already own — and here it cannot, ' +
      'because the next parcel is water. A CANOE LANDING on your own shore, touching open sea, opens ' +
      'EVERY SHORE WITHIN 26 TILES OF WATER as ground you may buy, at 2.5× the normal parcel price. A ' +
      'WAYFINDING COURT adds 6 tiles to every Landing you own and drops that premium to 1.8×; each RANK ' +
      'on a Landing adds 2 more. Nothing you buy is ever taken back. And the sea cannot be filled in — ' +
      'not for money, not ever: this is the one age on the ladder that cannot dig its way out of its ' +
      'own geography. Watch the 🛶 chip: it prints how far you cross and how much ground that opens.',
    chain: [
      'Loʻi Pondfield ×3 → Poi Pounding Shed → Hale ʻAha  ·  the staple. Every one of them wants a Punawai — the sea is not water',
      'Coconut Grove ×2 → Sennit Braiding House → Cordage Stall  ·  $22/min on ground nothing else wants, and it is what the Lashing Order burns',
      'Wauke Garden ×3 → Tapa Beating House → Tapa Hall  ·  $29/min, and it grows on the same terraces as the taro. Dinner, or cloth?',
      'Pearl-Shell Beds → Pearl-Shell Lure Works  ·  $19/min. Two buildings and six mouths — chain length is a strategy',
      'Basalt Adze Quarry → Adze Grinding Shed  ·  $20/min. ★ THE EXIT: 2,735 stone, and the Great Ahu wants 4,187 more',
      "Birdcatcher's Camp ×2 → Featherwork House  ·  $30/min, the richest thing here and the slowest to feed. It wants the same upland the quarry does",
      'Breadfruit Grove · Reef Station · Loko Iʻa · Reef Salt Pans → Strand Stall  ·  the strand: no spring, no road, no processing',
    ],
    firstSteps: [
      'A BREADFRUIT GROVE first ($890 of your $11,590), anywhere on dry land. It needs no spring, no road and no shed, so your founding party can work it the moment it is placed — which is what releases the rest of them into the labour pool. It is also what will feed the first island you land on.',
      'Then a PUNAWAI ($210) inland of the beach. THE OCEAN IS NOT WATER: coverage comes from a spring and never from the sea, so a hut on the sand is as dry as one on the ridge. Everything below wants to be inside its five tiles.',
      'Then TWO LOʻI PONDFIELDS ($720) and a POI POUNDING SHED ($890) touching one of them — the +25% raises both sides. Three terraces feed one shed exactly; two is the honest start.',
      'FOUR HALE PILI ($1,720) on a coral path back to the Marae, and a HALE ʻAHA ($890). Four huts open at four residents each and the feast house wants nine.',
      'A STRAND STALL ($500). That is your first money and it arrives within a minute — a village that feeds itself and earns.',
      '★ NOW WALK TO THE WATER. Your founding ground stops about thirteen tiles short of the beach, and NOTHING THAT TOUCHES THE SEA CAN BE BUILT ON IT — the Pearl-Shell Beds stand IN the lagoon and a Canoe Landing has to touch open water. Two to four parcels of ordinary land toward the shore costs $760–$2,080. Walked on three seeds, this is the step everything after it waits on.',
      'PEARL-SHELL BEDS ($390) in the lagoon you just bought, and then the mechanic — a CANOE LANDING ($2,140) on the point, with open water actually touching it. It needs no road and no spring, and it is a supply point, so the quarter around it stops paying the carting premium. STAFF IT: an unmanned hauling ramp crosses nothing. Then open the buy-land tool and look — every shore within 26 tiles of sea is green now, and it was not a minute ago.',
      'That is the whole purse. THE FIRST CROSSING IS BOUGHT OUT OF EARNINGS, NOT OUT OF THE GRANT: walked on three seeds, the nearest open parcel costs $1,650–$2,425 and the city can afford it between minute 1 and minute 11. Buy the NEAREST one, not the best one — and the moment it is yours put a BREADFRUIT GROVE and a second CANOE LANDING on it. That second Landing is what opens the island after that; a landfall with no Landing on it is a dead end.',
      'Then the WAYFINDING COURT ($1,780) when you can carry it. It reaches 6 tiles further from EVERY Landing you own at once and drops the landfall premium to 1.8×, which is why it is a key and not a statistic.',
      'After that: your second earning chain (COCONUT ($2,390) or TAPA ($2,460) both fit the ground you have), a MULCH PIT beside the terraces before they sour, and the BASALT ADZE QUARRY ($1,600) on a real 3×3 of rock. The age cannot be left without 2,735 basalt and the Great Ahu wants 4,187 more on top.',
    ],
    mistake: 'Trying to fill the sea. The grass brush is $71 a tile here and a twenty-tile causeway looks ' +
      'like $1,426 against a $14,500 landfall parcel — but the brush REFUSES a water tile in this age, ' +
      'at any price, the same way ash refuses one in every age. The other version of the same mistake is ' +
      'buying a line of ocean parcels toward an island: open water does not carry your border, so the ' +
      'second one out is always refused. You cross in a hull or you do not cross.',
  },
  0: {

    headline: 'You are not the chief. You are the thing being watched.',
    mechanic: 'You are not the top of anything here. Something you never place takes a share of your ' +
      'people every minute, and the share depends on the ground you camped on: every tree within 6 ' +
      'tiles of a shelter is cover for something. Numbers are the defence — a big camp is safer PER ' +
      'HEAD than a small one, because there are more eyes and worse odds of being the one taken. ' +
      'Watch the \u{1F995} chip: if shelters stand empty, the treeline is why.',
    chain: [
      'Fern Prairie ×3 → Drying Lawn → Leaf Mat  ·  ~$10/min. Dinner, and it barely pays',
      'Coccolith Shoal ×2 → Chalk Bank → Chalk Downs  ·  ~$19/min. The volume earner, on the sea margin',
      'Bone Bed → Mineral Seep → Petrified Bar  ·  ~$22/min. On the gravel, the one ground you cannot make more of',
      'Resin Conifer Stand ×2 → Amber Seep → Amber Bed  ·  ~$25/min. The ridge — a Spring Seep has to walk up there first',
      'Horsetail Marsh → Peat Swamp  ·  ~$16/min. Two buildings and one landform',
    ],

    firstSteps: [
      'A WATERHOLE first, on open floodplain: it waters 5 tiles, and the sea does not count — coverage comes from a building, never from the ground you stand on. Everything you are about to place lives inside that disc.',
      'A GAME TRAIL out of the Landmark, straight through the Waterhole\'s five tiles. About thirteen tiles of it, $10 each. A shelter here needs BOTH the water and the trail, so the trail is not decoration — lay it before you lay a bower, not after.',
      'FERN BOWERS along that trail, INSIDE the disc, on ground with no tree within 6 tiles. They are $12 and hold two each, so build nine. ★ "In the open" means open GROUND — the treeline is what takes your people. It does NOT mean out in the open country: a bower off the trail or outside the water simply stands there empty, and the camp grows by nobody.',
      'Three FERN PRAIRIES and a DRYING LAWN beside them: one Lawn is exactly three prairies, and it feeds ten. Keep them in the disc with everything else — the ground you have already watered is the cheapest ground you own.',
      'A MAGNOLIA THICKET on the ash beds: no water, no road, nobody to staff it, and it feeds you when the rest goes wrong.',
      'A SENTINEL KNOLL before the fourth chain. $33 buys back a third of what a camp pitched in cover loses. That is about half your purse spent; the chalk on the sea margin is what pays for the rest.',
    ],
    mistake: 'Camping in the trees. Every tree within 6 tiles of a shelter raises what is taken from it ' +
      'by up to half — and clearing one shelter\'s cover costs about $540 at $15 a tile, so the answer ' +
      'is usually to move, or to put a Sentinel Knoll on it. Another shelter is never the answer.',
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

  8: {
    headline: 'Water is not a circle here. It is a budget, and it only ever runs downhill.',
    mechanic: 'ROUTE THE WATER DOWNHILL. A DIVERSION GATE emits 6.0 head a minute; a BUNDED RICE ' +
      'FIELD draws 2.0 — so THREE FIELDS TO A GATE, at any distance, because a ditch loses nothing to ' +
      'length. What costs you is the GROUND: head reaches a tile level with the last one or ONE STEP ' +
      'BELOW it, never a step above. A rise between your gate and your field stops everything past ' +
      'that tile, and the only answers are the CUT brush or a CUT CHANNEL. A WINDLASS WELL waters ' +
      'homes and workshops and does NOTHING for a field. A field with no head still takes 15% off the ' +
      'rain, so a mistake bleeds instead of killing — watch the 🌊 chip and find the break.',
    chain: [
      'Millet Field → Pestle Yard → The Meal Counter  ·  $92/min. The staple, and it owes the cascade nothing',
      'Bunded Rice Field → Trough Hammer → The Meal Counter  ·  same counter, 50% more food per tile — if you can plumb it',
      'Mulberry Grove → Silkworm Shed → Reeling House → Loom Shed → Silk Gift Hall  ·  $222/min, the richest thing here',
      'Ore Adit → Piece-Mould Foundry → Ancestral Bronze Market  ·  $169/min. What this civilisation IS',
      'Ox Pens + Bone Midden → Bone Carver’s Yard → Bone &amp; Horn Stall  ·  $154/min — and the pens plough your millet',
      'Millet → Ale Shed → Ancestral Ale Hall  ·  $140/min, and it drinks the grain you were going to eat',
      'Rubble Quarry → Rammed-Earth Yard → Wall Works Yard  ·  $148/min. ★ THE EXIT: 1,763 stone, and the Wall wants 3,352 more',
      'Salt-Lake Pan → Boiling Shed → The Weighing Floor  ·  $89/min, on the only ground you cannot buy',
    ],
    firstSteps: [
      'A WINDLASS WELL first ($170), dead centre. It has no siting rule at all, and homes, shops and workshops all need it. It has nothing whatever to do with the fields.',
      'Then TWO MILLET FIELDS ($560). Your founding party works these before anything else and they need no head — which is what releases the other six into the labour pool.',
      'Then a PESTLE YARD ($690) inside the well’s ring, FOUR COURTYARD COMPOUNDS ($1,320) on a road from the Ancestral Hall, and THE MEAL COUNTER ($690). Four compounds open at three residents each, and the counter needs eight.',
      'Then an APRICOT ORCHARD ($310). No water, no head, no road, no ground — it is what feeds you the first time a fan goes dry.',
      'NOW the cascade — ONE field first, because the lesson is worth more than the rice. Press O twice for the HEAD MAP (dark is low, pale is high), find a fall inside your own land, and put a DIVERSION GATE at the top, four FIELD DITCHES running down it, and ONE BUNDED RICE FIELD at the bottom. $650, and it either runs or it does not.',
      'If it does not, the ground RISES somewhere along the run and nothing past that tile gets a drop. CUT the tile (−1 step, $97) or drive a CUT CHANNEL through it ($330). If the corner you picked is dead flat, RAM a tile at the top (+1 step, $124) and make your own fall — this is the one age on the ladder that lets you.',
      'Once it runs, add the SECOND AND THIRD FIELDS off the same gate as the ground allows, and a TROUGH HAMMER on the stream ($690). A gate emits 6.0 and a field draws 2.0, so THREE TO A GATE and not one more — read the 🌊 chip before the fourth. To go past three: upgrade the gate to a KING’S WEIR (8.70 head = four fields) or buy a parcel toward a second fall. And RANK FROM THE TAIL UPWARD — a rank multiplies a field’s yield AND its draw, so ranking the field nearest the gate takes the water off everything below it. The UPGRADE does not: a Levelled Bund Terrace doubles the yield on the same 2.0.',
      'Then your second earning chain — SALT ($1,550) or BONE ($1,470) both fit what is left — a second MEAL COUNTER once the store fills, and the RUBBLE & TAMPING QUARRY on an outcrop. Stand it ON the rock: the age cannot be left without 1,763 stone, and the Rammed-Earth Wall wants 3,352 more on top.',
    ],
    mistake: 'Answering a dry field with another well. It is the one action that cannot possibly help — ' +
      'a well stamps a circle and a field wants a flow. The cause is always upstream: a ditch that ' +
      'climbs a step, a fourth field on a gate that only pays for three, or a run past sixty tiles. ' +
      'Click the amber marker and it names the tile.',
  },
  7: {
    headline: 'There is no market. Everything goes to the palace, and the palace has to feed it.',
    mechanic: 'THE ROLL. Every building that PRODUCES or SHIPS must stand inside a magazine’s disc — ' +
      'and the palace can only carry as many of them as it can issue a ration to: OIL and FIGS, every ' +
      'minute, per building on the roll. One Press Room carries fifteen names; one Fig Orchard ' +
      'carries twenty. When the issue runs short the palace drops the buildings FURTHEST from a ' +
      'magazine, so what you site closest to a storeroom is what survives. Its own estate — the ' +
      'Olive Terraces, the Press Room, the Fig Orchards and the magazines themselves — is never on ' +
      'the roll, which is why you can always climb back. Watch the 📜 chip.',
    chain: [
      'Emmer Plot → Palace Mill  ·  the staple, and it is on the roll like everything else',
      'Olive Terrace → Press Room  ·  OFF THE ROLL. This is where the ration itself comes from — build it before you build anything that needs feeding',
      'Press Room → Perfumery  ·  unguent at $19.28, the dearest thing the island ships, out of the same oil the roll eats',
      'Hill Pasture → Spinning Shed → Purple Vat  ·  purple at $38.55. The vat wants the tideline',
      'Copper Adit + Tin Landing → Bronze Foundry  ·  the adit eats the spine; the tin comes off somebody else’s ship',
      'Clay Bank → Wheel Workshop  ·  stirrup jars, and the clay wants a stream bank',
      'Crocus Meadow  ·  saffron off the Theran ash, gathered and shipped raw. Nothing else wants that ground',
      'Gypsum Cutter → Ashlar Yard  ·  ★ THE EXIT. The next age is the first that asks for stone',
    ],
    firstSteps: [
      'A FIG ORCHARD first, and it is $540 of your $6,750. It needs no water, no road and no magazine, so the founding party can work it the moment you place it — which is what releases the other nine into the labour pool. It is also the one food that is never on the roll.',
      'Then a SPRING HOUSE ($130). The sea is right there and none of it counts: only a well waters anything, and the emmer, the mill and the houses all need it.',
      'Then a VILLA MAGAZINE ($410) with a short road to the Hall. It administers seven tiles and it SHIPS — until one stands, nothing you build inside it will run and nothing you make can become money. The palace itself costs $1,330 and comes much later.',
      'Now an OLIVE TERRACE ($240) and a PRESS ROOM ($600) inside the disc. They are off the roll, so they run whatever happens — and the oil they make is what lets the roll grow past the four names the throne carries for free.',
      'Then TWO ASHLAR HOUSES ($520) inside the well’s ring and the magazine’s disc, and an EMMER PLOT ($210). That is $2,650 spent and a city that feeds itself, ships something, and can lengthen its own roll.',
      'After that: a second terrace and press before every third producer. The rule to hold in your head is ONE PRESS ROOM PER FIFTEEN NAMES.',
    ],
    mistake: 'Building producers before the oil that pays for them. Four buildings run for free; the ' +
      'fifth needs a Press Room, and a city with ten workshops and one press has six of them standing ' +
      'idle with a red ! reading “off the roll”. The other half of the same mistake is siting the ' +
      'Press Room out on the terraces far from the magazine — when the issue runs short the palace ' +
      'drops the FURTHEST buildings first, and the things you least want dropped are the ones that ' +
      'make the ration.',
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

  12: {
    headline: 'Your houses are built, fed, watered, joined to the street — and empty.',
    mechanic: 'SEND FOR THEM. A citizen of this city is not born here and does not wander in. A ' +
      'citizen is SENT, and somebody has to pay their passage. Every settler who arrives spends ' +
      'one CROSSING out of your store; when the store is empty, nobody comes. Nothing is ' +
      'subtracted and nothing starves — the city produces, eats, earns and holds exactly as it ' +
      'did. It simply STOPS GROWING, with a red ! on every empty house and `nopassage` on the ' +
      'population chip. ★ CROSSINGS ARE MADE BY A CHAIN LIKE ANY OTHER: a HYLE taps resin on a ' +
      'dry slope, a NEORION turns it into berths at 4.245 a minute against a natural pull of ' +
      'eight. ONE CHAIN RUNS YOUR CITY AT HALF SPEED AND TWO IS THE AGE. ★★ AND A BERTH CAN ' +
      'NEVER BECOME MONEY: `passage` has no shelf price anywhere in the game and cannot be dumped ' +
      'abroad, so the ground and the hands you spend on growth earn NOTHING directly — and you ' +
      'can watch them not earning. You arrive holding 60 crossings, which is about seven and a ' +
      'half minutes of unimpeded growth. Spend them building the thing that makes more.',
    chain: [
      'The Hyle ×2 → The Neorion  ·  ★ THE AGE. 4.245 crossings/min, and NOT ONE OF THEM IS FOR SALE. Two Hyle keep one yard with a little spare',
      'The Pissopolion  ·  the spare resin, at $4.58 — the yard always draws first, and selling too much is selling your own growth',
      'The Kleros ×3 → The Hydromylos → The Artopolion  ·  THE STAPLE. Three allotments feed one water-mill exactly; nothing walks in a circle to turn it',
      'The Paradeisos → The Lachanopolion  ·  the leg that cannot fail: no water, no road, nothing from anybody',
      'The Mareotis  ·  fish off the harbour, and the only food that wants the water. One parcel out on every seed',
      'The Natron Flats → The Hyalourgeion → The Hyalopolion  ·  the flux, and then GLASS at $32.88. The pans are 19-39 tiles out — a mid-age expansion',
      'The Aipolion → The Diphtheron → The Chartopoleion  ·  $65/min in parchment, the richest chain on the board, and it never touches the water',
      'The Latomia → The Lithoxoeion → The Dromos  ·  ★ THE EXIT: 10,214 stone, and the Pharos wants nine times that. One yard cannot cover the tower AND the street',
      'The Dexamene · The Katoikia + The Amphodon · the Apotheke, the Trapeza, the Bibliotheke  ·  water, homes, and the warehouse that BANKS CROSSINGS',
    ],
    firstSteps: [
      'A KLEROS first ($760 of your $26,100), anywhere at all. It is the one grain field in this age with no water predicate and no road — a settler’s allotment, dry-farmed — so your founding party can work it the moment it is down, and nothing can hold them waiting.',
      'A DEXAMENE ($1,530) next. It waters sixteen tiles and it needs NO WATER ANYWHERE NEAR IT — a plastered cistern is filled by rain and by hand. Everything below wants to be inside its ring. (The HYDREION at $460 is the cheap version, but it must touch the bank.)',
      'A second KLEROS ($760) and a HYDROMYLOS ($1,910) inside the cistern’s sixteen tiles. THE MILL IS A WATER-WHEEL — nothing walks in a circle to turn it, which is new — and three allotments would feed it exactly. You have hands for two.',
      'A PARADEISOS ($760) on dry ground. No water, no road, nothing off anybody’s quay, and it feeds at 80% of bread. THIS IS THE LEG THAT CANNOT FAIL, and it is the last building your founding crew can staff: two Kleroi (4) + the Hydromylos (4) + the Paradeisos (2) is EXACTLY TEN.',
      'A LANE out of the Hall ($10 a tile — about $120). It has to TOUCH THE HALL: a building is connected when it stands on a road network that reaches the Hall, not when it happens to be beside a road tile.',
      'Three KATOIKIAI ($2,760) on the lane, and an ARTOPOLION ($1,910) on it too. The bread market wants TWELVE residents within ten tiles. You have twenty-seven beds and sixty crossings, so they fill.',
      '★ NOW BUILD THE THING THAT MAKES MORE. A HYLE ($980) on any dry slope — no water, no road — and a NEORION ($3,890) on the lane. That is $4,870 and SIX HANDS, and the hands come from the people who have just arrived: the founding crew is already spent, which is the whole shape of this age.',
      '★★ MEASURED on three seeds: eleven buildings for $15,380 of your $26,100, every one of them working, hunger 0.00, twenty-three housed, and the treasury at $11,294 / $11,940 / $13,376 at forty, eighty and a hundred and sixty authored minutes. The store sits at its cap of 120 crossings, which means the yard is already outrunning the pull — and that is what a SECOND chain is for.',
      '★ THREE THINGS ARE NOT IN THE FOUNDING GRANT AND THE MAP SAYS SO ON EVERY SEED: the MAREOTIS (open water, ring 2 — one parcel), a quarry-grade outcrop for the LATOMIA (12-13 tiles, three or four parcels), and the NATRON FLATS (19-39 tiles, about nine). The quarry is your EXIT and is worth walking to early; the natron is an export chain and can wait. Nothing in this age deadlocks on either.',
      '★ AND WHEN YOU CAN AFFORD IT, AN APOTHEKE ($1,530). A berth banks like any other traded good, so a warehouse raises how many crossings you can hold — which is what turns "build houses and hope" into "fill the bank while the ground is cheap, then build the quarter in one go".',
    ],
    mistake: 'Building the houses first. An AMPHODON is thirty-eight beds for $3,160 and it will sit ' +
      'there empty with a red ! on it, because beds were never the constraint — CROSSINGS are, and ' +
      'the only place they come from is a Neorion. Watch the ⛵ chip: it prints what you are ' +
      'holding and how many beds are waiting on it. When the second number runs away from the ' +
      'first, you are short a chain.',
  },
  11: {
    headline: 'Every stock is full, nothing is red, and a third of your city is invisible.',
    mechanic: 'TAKE THE CENSUS. Your city is governed by the LAST CENSUS IT TOOK, not by what it is ' +
      'now. A building finished since the censors closed the roll is built, staffed, producing, ' +
      'selling, housing and EATING at full rate — and the state cannot see it. No shop sells to the ' +
      'people in it, the AERARIUM collects no tributum from them, they count for nothing at the era ' +
      'gate, and NOTHING ANYWHERE ON THE MAP TURNS RED. What you get instead is a city with more ' +
      'mouths than citizens, and the 🏛️ chip prints both numbers. A lustrum is ordered at the Hall ' +
      'and costs $100 flat plus $10 a head. ★ IT COUNTS HOUSES, NOT PEOPLE, so the cheapest moment ' +
      'to enter a new quarter is the minute it goes up, while it is still empty — and the expensive ' +
      'one is after it has filled. A TABULARIUM takes a quarter off each head; two is the ceiling.',
    chain: [
      'Arvum ×3 → Mola Asinaria → The Macellum  ·  THE STAPLE, and it is GROWN here. Three ploughlands feed one mill exactly',
      'Hortus → Forum Holitorium  ·  the leg that cannot fail: no water, no road, nothing from anybody',
      'The Vivarium  ·  fish off the Tiber, and the only food that wants the river',
      'The Salinae → Salsamentaria → Forum Piscarium  ·  salt is 34-39 tiles out on every seed — a MID-AGE expansion, and the road to it is why the Salaria is called the Salaria',
      'Ovile ×1 → The Fullonica → Taberna Vestiaria  ·  $49.76/min, the richest chain on the board, and it never touches the river',
      'Cretifodina → Officina Tegularia → Mercatus Tegularum  ·  $38/min in roof tile, and it wants no road to the clay',
      'Silicaria → Officina Silicis → Crepidines  ·  ★ THE EXIT: 6,583 silex, and the Capitolium wants 3,600 DRESSED on top of it. One works cannot cover both',
      'Piscina Limaria · Casa Colonica + Atrium Domus · the Tabularium, the Aerarium, the Moneta  ·  water, homes, and the three buildings the register turns into money',
    ],
    firstSteps: [
      'An ARVUM first ($590 of your $19,900), anywhere at all. It is the ONE grain field on the ladder with no water predicate and no road — dry-farmed far, the way Latium actually grew it — so your founding party can work it the moment it is down, and nothing can hold them waiting.',
      'A PISCINA LIMARIA ($1,190) next. It waters fifteen tiles and it needs NO WATER ANYWHERE NEAR IT — a settling tank is filled by hand and by rain. Everything below wants to be inside its ring. (The LACUS at $360 is the cheap version, but it must touch the river.)',
      'Two more ARVA ($1,180) and a MOLA ASINARIA ($1,480) inside the tank’s fifteen tiles. THREE PLOUGHLANDS FEED ONE MILL EXACTLY — 14.23 far in, 8.54 farina out, which is the bread of about 142 people.',
      'A HORTUS ($590) on dry ground. It needs no water, no road and nothing off anybody’s quay, and it feeds at 80% of bread. THIS IS THE LEG THAT CANNOT FAIL — Cato wrote a book about it, and it is why a Roman smallholding could not be starved out.',
      'A LANE out of the Hall ($10 a tile) and THREE PARCELS beyond the founding grant ($380 each at the second ring). The grant is twelve tiles a side with a Hall in the middle of it, and once the water, the mill and the garden are down there is not enough frontage left for a market that touches a road. Buying out is the answer and it is cheap here.',
      'Three CASA COLONICA ($2,130) on the lane, and THE MACELLUM ($1,480) on it too. The market wants ELEVEN CITIZENS WITHIN TEN TILES.',
      '★★ AND NOW IT WILL NOT SELL. The Macellum reads TEN customers — your founding party, and nobody else. Three houses are standing on the map, roofed, watered and joined to the lane, and THE STATE HAS NOT BEEN TOLD THEY EXIST. Nothing is red. Nothing is broken. The shop simply has ten of the eleven people it needs.',
      '★ SO TAKE THE CENSUS. Open the Hall and order the lustrum. It costs $100 flat plus $10 a head, and RIGHT NOW THE HOUSES ARE STILL EMPTY — about $110 all in. The Macellum sells on the next tick, and everybody who moves in afterwards is counted from the day they arrive. ★★ THE REGISTER COUNTS HOUSES, NOT HEADS: enter a quarter the day you build it, while it is empty and nearly free, not the day it fills.',
      'THE AERARIUM ($2,140) on the lane, and a third ARVUM ($590). The treasury collects the tributum from every COUNTED resident within twenty tiles — about $6/min at twenty-four of them, and it scales with every household you enter afterwards. ★ MEASURED on three seeds: fourteen items for about $12,350 of your $19,900, and the city holds $32,000-$35,000 at minute 160 with twenty-four housed and no hunger.',
      '★ TWO THINGS ARE NOT IN THE FOUNDING PARCELS AND THE MAP SAYS SO ON EVERY SEED: the SALT (34-39 tiles out, about nine parcels and $12,500 of ground) and an outcrop big enough for the SILICARIA (12-20 tiles, three to five parcels). The quarry is your EXIT and is worth walking to early; the salt is an export chain and a monument leg and can wait. Nothing in this age deadlocks on either.',
    ],
    mistake: 'Building for an hour without ordering a lustrum. Nothing warns you — every store is full, ' +
      'every building says ok, and the only symptom is that your shops and your treasury have quietly ' +
      'stopped growing while your food bill has not. Watch the two numbers on the 🏛️ chip: the first ' +
      'is who pays you and the second is who eats.',
  },
  10: {
    headline: 'Your granary is full and half your city is hungry.',
    mechanic: 'SET THE TABLE. Every age until now let one food feed everybody — a city with nothing but ' +
      'bread was fed exactly as well as a city with six things in the store. Here NO SINGLE FOOD MAY ' +
      'COVER MORE THAN ITS SHARE of a citizen’s table: bread 50%, and figs, pulses and fish a quarter ' +
      'each. Grain alone feeds half your people no matter how much of it you have, and the hunger clock ' +
      'runs on the rest at its ordinary rate. It is not a wall — it is a CEILING ON A SHARE, and the ' +
      'answer is never more of what you already had. The ⚖️ chip prints every leg and names the ' +
      'shortest one. THE PUBLIC TABLE lifts bread to 65% while you build the leg you are missing; the ' +
      'PARTHENON adds 8 points to it forever.',
    chain: [
      'Emporion → Donkey Mill → The Agora  ·  THE STAPLE, and this city does not grow it: one measure of oil buys twenty of Pontic wheat',
      'Olive Grove ×3 → Trapetum → Oil Merchant’s Stoa  ·  $26/min, and the same oil the quay drinks. The quay draws FIRST, every tick',
      'Fig Terrace · Bean & Lentil Plot · Fisher’s Slipway  ·  the other half of the table. The first two want no water, no road and nothing off a quay',
      'Terraced Vineyard ×2 → The Lenos → The Kapeleion  ·  $41.22 a measure, the richest per-unit trade until the silver lands',
      'Kolonos Clay Beds ×2 → The Kerameikos → The Kylix Row  ·  $29/min, and it is what the oil and the wine leave in',
      'Laurion Galleries ×2 → Washing Tables → Skimming Hearths → Silver Stoa  ·  FOUR links, the deepest chain in the game, $39/min at the end of it',
      'Pentelic Quarry → Marble Works  ·  ★ THE EXIT: 4,243 marble, and the Parthenon wants dressed blocks on top of that. The Laurion is eating the same ridge',
      'Krene / Public Cistern · Oikos + Synoikia · the Deigma, the Metroon, the Bouleuterion  ·  water, homes and the three buildings that make the rest earn more',
    ],
    firstSteps: [
      'An OLIVE GROVE first ($520 of your $15,190), on any dry scree. It needs no water and no road, so your founding party can work it the moment it is down — which is what releases the rest of them into the labour pool. Everything this city sells, and half of what it eats, is downstream of it.',
      'Then a BEAN & LENTIL PLOT ($460) and a FIG TERRACE ($1,160), both on dry land, both needing nothing at all. THIS IS THE WHOLE LESSON, bought in the first two minutes: those two close half the table between them, and no amount of bread will ever stand in for them.',
      'Then a KRENE ($280). It waters nine tiles for under a third of a cistern and it does NOT have to stand on water — everything below wants to be inside its ring.',
      'A TRAPETUM ($1,290) touching the grove (+25% both ways), then the EMPORION ($1,840) with a short road to it ($10 a tile). The quay is the only wheat in this age; site it near water for the bonus, but it does not need to touch any.',
      'A DONKEY MILL ($1,150) beside the QUAY, not beside a field — at this rung the wheat arrives by sea. Then four OIKOS ($2,200) and THE AGORA ($1,150), which wants 10+ residents within 10 tiles.',
      'An OIL MERCHANT’S STOA ($1,330) last of the opening — thirteen buildings and a short road for about $11,450, leaving you $3,740. ★ NOW WATCH THE ⚖️ CHIP FOR A MINUTE. It reads 50% the moment the last building goes down, because your founding wheat is the only thing in the store and bread stops at half; then the first figs and the first beans land and it climbs to 100% and stays there. That minute is the whole age, and it costs you nothing to watch it happen.',
      '★ TWO THINGS ARE NOT IN THE FOUNDING PARCELS AND THE MAP SAYS SO ON EVERY SEED: nothing that stands IN water (the Fisher’s Slipway, the Harbour Mole) and no outcrop big enough for the PENTELIC QUARRY. Both are one or two parcels out — about $380 at the second ring, $660 at the third. Neither is urgent; the table closes without them, and the quarry is the EXIT rather than the opening.',
    ],
    mistake: 'Answering hunger with more of your best crop. Bread stops at half a table and stays there — ' +
      'a second Donkey Mill feeds nobody new, and the ⚖️ chip has been naming the leg you are actually ' +
      'short of the whole time.',
  },

  13: {
    headline: 'Your fields are full, your mills are running, and the city eats more than the valley grows.',
    mechanic: 'BUY THE DIFFERENCE. Whatever dinner cannot cover out of your own stores is bought — ' +
      'automatically, every minute, out of the treasury — and THE PRICE RISES WITH HOW MUCH OF IT ' +
      'THERE IS. Not the excess: the WHOLE SHIPMENT reprices. Land 5.4 rations a minute and buy 4 ' +
      'and you pay the fair $2.72 each; grow to buy 12 against the same landings and every one of ' +
      'those twelve costs ×2.9. ★ Nothing turns red and nothing stops — the money simply goes, and ' +
      'the 🌾 chip prints the multiplier, the two numbers behind it and how many seconds the ' +
      'treasury carries the bill. ★★ THE ONLY THINGS THAT MAKE IT CHEAPER ARE BUILDINGS: a STATIO ' +
      'ANNONAE lands 1.5 a minute for a road and $2,240, a NAVICULARIUM 3.0 for a road and a river ' +
      'bank. ★★★ AND WHAT YOU BUY DOES NOT OPEN THE AGE. The food gate counts what this city GREW. ' +
      'A city that buys its way through rung 13 survives forever and never leaves it.',
    chain: [
      'The Centuriated Field → The Pistrinum → The Panificium  ·  ★ AN EARNER, NOT A LARDER. One survey square is 26.62 grain, exactly one mill\'s appetite; three counters sell all 15.97 of the flour at $8',
      'The Pomarium  ·  THE LEG THAT CANNOT FAIL — figs on dry ground for $690, no water, no road, nothing from anybody. Nine tiles to feed 4.91 a minute, which is the whole trade this age offers you',
      'The Stagnum Lucrinum  ·  oysters and fish standing IN the water, 6.58 a minute. One parcel out on every seed, and the largest thing you actually grow',
      'The Olivetum → The Torcularium → The Olearia  ·  oil at $42 off the dry interfluve. Two Oleariae clear one press exactly',
      'The Argilla → The Figlina → The Officina Samia  ·  red gloss at $37, and the river bank it wants is the bank the flax wants',
      'The Lapicidina → The Officina Marmoraria → The Officina Statuaria  ·  ★ THE EXIT: 15,846 stone, and the Colosseum\'s marble wants 128,700 more. The saw sells 0.911 and banks the rest for the arena',
      'The Pozzolana Pit → The Officina Caementicia  ·  concrete, and NOTHING BUYS IT. Its only customer is the Colosseum, which takes 4.00/min for the whole build',
      'The Plumbaria → The Ustrina → The Fistularia  ·  lead: pigs, pipes and hull sheathing at $42. The mine eats the same outcrop the quarry does',
      'The Ager Linarius → The Textrinum → The Armamentarium  ·  ★ SAILCLOTH at $61, the richest counter in the age — and the same bolts the STANDING FLEET and the Colosseum both want',
      'The Puteus and the Castellum Aquae · The Cenaculum + The Insula · the Horreum, the Thermae, the Atrium Libertatis  ·  water, homes, and the store that stops one mill filling the shelf in two minutes',
    ],
    firstSteps: [
      'A PUTEUS first ($590 of your $34,177). A shaft well needs NO ROAD, NO WATER ANYWHERE NEAR IT and NO WORKERS, and it waters twelve tiles — so it is the cheapest thing in the game that unlocks anything, and everything below wants to be inside its ring.',
      'A POMARIUM ($690) on dry ground. Figs, three hands, no water, no road, no chain. THIS IS THE LEG THAT CANNOT FAIL, and it is nine tiles for one small food — which is this age telling you what its land is worth before it charges you for the rest.',
      'A CENTURIATED FIELD ($3,530) inside the well’s ring, on the greenest sixteen tiles you can find. It has no ground requirement, but it grows +50% on FERTILE — and the fertile ribbon here is the narrowest on the ladder, about three tiles either side of the river. MEASURED: the best 4×4 in the founding parcels is 75-88% fertile on three seeds.',
      'A PISTRINUM ($2,960), also inside the ring. Three hands and three hands and four is TEN — your whole founding crew, spent exactly, and the mill turns all 26.62 grain into 15.97 flour.',
      'A LANE out of the Hall ($10 a tile, about $120). It has to TOUCH THE HALL: a building is connected when it stands on a network that reaches the Hall, not when it happens to be beside a road tile.',
      'Four CENACULA ($4,760) on the lane — forty beds on four tiles, at $119 a head, the cheapest housing in the game. Then a PANIFICIUM ($2,960) on the lane too; the bread counter wants thirteen residents within eight tiles and it now has forty.',
      'An ARGILLA ($1,900) on the river bank — no road needed, but it must be within three tiles of water — then a FIGLINA ($3,080) and an OFFICINA SAMIA ($2,830) inside the well. That is the earner: 2.095 samian a minute at $37.',
      '★ A STATIO ANNONAE ($2,240) LAST, AND BEFORE YOU NEED IT. It needs a road and nothing else. At fifty residents your fields still cover dinner and the 🌾 chip reads ×1.00 — build the landing while that is true, because the price is decided by the gap and the gap opens the moment you lay more beds.',
      '★★ MEASURED on three seeds, freeBuild off: thirteen buildings for $25,660 of your $34,177, every one of them working, hunger 0.00, fifty housed, the annona at ×1.00 — and the treasury at $9,267 / $10,212 / $11,158 / $12,108 at ten, twenty, thirty and forty authored minutes. It earns about $95 a minute and it is never short.',
      '★ TWO THINGS ARE NOT IN THE FOUNDING PARCELS AND THE MAP SAYS SO ON EVERY SEED: open water for the STAGNUM LUCRINUM (7-9 tiles, one parcel) and an outcrop for the LAPICIDINA (eleven tiles, three parcels). The fishery is your biggest home-grown food and the quarry is your EXIT; neither is urgent, and nothing in the age deadlocks on either.',
    ],
    mistake: 'Answering the bill with houses. Four more Insulae is 168 more mouths for $16,320, and ' +
      'every one of them reprices the WHOLE shipment — the bill will roughly triple for a 44% rise ' +
      'in population, which is the one thing on this ladder that has never happened before. The ' +
      'answer is always the other two: LAND more (a Statio Annonae, a Navicularium) or GROW more ' +
      '(a Centuriated Field, a Stagnum Lucrinum, a Pomarium). Watch the 🌾 chip before you lay a ' +
      'bed, not after.',
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
