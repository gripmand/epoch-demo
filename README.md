# EPOCH — Era 1 demo

A city builder that starts at the beginning of civilisation. This is a playable
demo of **Era 1 (Sumer, ~3000 BC)** — the first of fourteen eras.

**▶ Play it in your browser** — no install, no download.

---

## The loop

Grow food → feed workers → workers staff buildings → craft chains make the money.

The food chain barely pays. It exists to keep everyone alive so the craft chains
can run. That's the whole game in one sentence.

## Opening build order

1. **Road** out from your Hall — $10 a tile, no upkeep.
2. **Well** — nothing works without water coverage.
3. **Three Farms**, on the dark fertile ground where you can: +50% yield.
4. **Mill**, placed *touching* a farm — +25% to both sides.
5. **Market** — until one is standing and road-connected, the Hall is your only income.
6. **Three or four Houses.** Every resident is a worker, and every worker eats.

Then a craft chain, which is where the real money is:

| Chain | Notes |
|---|---|
| Clay Pit → Potter's Kiln → Pottery Stall | the pit must sit within 3 tiles of water |
| Shepherd's Fold → Weaver's Shed → Cloth Hall | the Fold needs **dry** ground — the salt flats nobody else wants |
| Brewery → Tavern | competes with your Mill for grain |

## Things that are easy to miss

- **Click any building.** It tells you what it does, what it's earning, and why it has stopped.
- **`G`** opens the era guide, **`H`** the controls.
- **Farmland goes salty as you work it.** Click a farm → *Rest this field*. It recovers and puts itself back to work automatically — faster next to water or a Midden.
- **Every producing building upgrades 3 times** (rank II/III/IV): more output for the *same* number of workers.
- **Houses upgrade 5 times**, Reed Hut (2 people) → Merchant's Compound (14).
- **Watch net income, top left.** Negative means something has stalled — look for a red status.

## Fresh start

Add `?fresh=1` to the URL, or use **New** in the top-right.

## Running it locally

Everything is static — no build step and no server required. Clone it and open
`index.html`, or serve the folder with anything (`py -m http.server`).

---

Feedback welcome, especially where it gets boring or confusing.
