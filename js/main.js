'use strict';

const Main = {
  speed: 1,
  paused: false,
  acc: 0,
  last: 0,

  setSpeed(v) {

    const max = window.EPOCH_DEV ? 100000 : 1;
    if (v === 0) Main.paused = !Main.paused;
    else { Main.speed = Util.clamp(v, 1, max); Main.paused = false; }
    UI.reflectSpeed();
  },

  loop(now) {
    const dt = Math.min(250, now - Main.last);
    Main.last = now;

    Econ.realTime(G.s, Date.now());
    if (!Main.paused) {
      Main.acc += dt * Main.speed;
      let guard = 0;
      const maxTicks = window.EPOCH_DEV ? 4000 : 30;
      while (Main.acc >= 1000 && guard++ < maxTicks) {
        Econ.tick(G.s);
        Main.acc -= 1000;
      }
    }
    Rend.draw(G.s, now / 1000);
    if (now - Main.lastHud > 200) { UI.updateHUD(G.s); Main.lastHud = now; }
    requestAnimationFrame(Main.loop);
  },
  lastHud: 0,

  boot() {
    const canvas = document.getElementById('game');

    const wantsFresh = /[?&](fresh|new)\b/.test(location.search);

    let hasSave = false;
    try { hasSave = !!Game.rawSave(); } catch (e) {}
    const fresh = wantsFresh && !hasSave;
    const askFresh = wantsFresh && hasSave;
    if (wantsFresh && window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname);
    }
    let loaded = fresh ? false : Game.load();
    if (!loaded) Game.newGame();

    let recalled = false;
    if (loaded && ERA1_CALL > 0 && (G.s.era1Call | 0) !== ERA1_CALL) {
      const was = { era: G.s.era, buildings: G.s.buildings.length };
      if (Game.archiveAndRestart()) { recalled = was; loaded = false; }
    }

    Rend.init(canvas);
    UI.init();
    Input.init(canvas);
    if (window.Sfx) Sfx.init();

    let away = null;
    let healed = null;
    if (loaded) {

      healed = Econ.migrateStalePrestige(G.s);
      away = healed ? null : Econ.catchUp(G.s);
      Econ.realTime(G.s);
      Grid.rebuild(G.s);
    } else {
      G.s.lastSeenMs = Date.now();
    }

    if (recalled) {
      setTimeout(() => UI.recallNotice(recalled), 600);
    }
    if (away) {
      if (away.hours >= 0.5) setTimeout(() => UI.showAway(away), 500);
      else UI.toast('Welcome back — ' + away.hours + 'h away, ' +
        (away.money ? Util.fmtMoney(away.money) + ' earned.' : 'nothing earned. Check for stalled buildings.'), 9000);
    }

    if (healed) {
      setTimeout(() => UI.toast('\u{1F30D} This city turned the age before the ground did. Its ' +
        healed.before.stale + ' buildings from the previous era have been left behind, ' +
        healed.relics + ' monument' + (healed.relics === 1 ? '' : 's') +
        ' came with you, and you have been re-founded on new ground with ' +
        Util.fmtMoney(G.s.money) + '. This happens once.', 15000), 600);
    }

    if (!loaded) {

      setTimeout(() => UI.togglePanel('guide-panel', UI.guideHTML), 700);
      const askName = () => {
        if (G.s.cityName || G.s.tick > 1200) return;
        if (document.querySelector('.panel')) { setTimeout(askName, 2500); return; }
        UI.promptNaming();
      };
      setTimeout(askName, 4000);

      const eraName = (ERAS[G.s.era - 1] || {}).name || 'A NEW AGE';
      const g = (typeof ERA_GUIDES !== 'undefined' && ERA_GUIDES[rungOf(G.s.era)]) || null;

      const opener = g && g.firstSteps && g.firstSteps.length ? g.firstSteps[0] : '';
      UI.toast(eraName.toUpperCase() + '. ' + (TUNE.FOUNDING_GRANT
        ? 'You are handed a founding village and ' + Util.fmtMoney(TUNE.FOUNDING.purse) +
          ' in rations — spend the ' + Util.fmtMoney(TUNE.START_MONEY) +
          ' in your treasury on a CRAFT CHAIN, because the rations run out and the food chain ' +
          'will not make you rich. '
        : 'Bare ground, your ' + anchorFor(G.s.era).name + ', and ' +
          Util.fmtMoney(TUNE.START_MONEY) + ' — no village, no rations, an EMPTY store. ') +
        opener + ' Press G for the guide.', 16000);
    } else if (Game.migratedFrom) {

      setTimeout(() => {
        let dry = 0;
        for (const b of G.s.buildings) {
          const d = DEF(b.type);
          if (d && d.needsWater && !Grid.covered(G.cache.water, b)) dry++;
        }
        UI.toast('\u{1F3DB}️ Your city carried over — and the whole Era 1 update is now live: new buildings ' +
          'and chains, Town Hall policies, the Chronicle (C), the salt map (O), and R to rotate. Press G for the guide.',
          20000);
        if (dry) {
          UI.toast('⚠️ ' + dry + ' building' + (dry === 1 ? ' is' : 's are') + ' out of water. Coverage is now a ' +
            'true CIRCLE rather than a square, so anything that sat in a corner of the old radius needs a well ' +
            'nudged closer — or ranked, which adds a tile of reach. Press O to see the coverage.', 24000);
        }
      }, 1500);
    } else {
      UI.toast('City loaded — Era ' + G.s.era + ' · ' + ERAS[G.s.era - 1].name + '. Autosaves every 10s.');
    }

    if (askFresh) setTimeout(() => UI.promptReset(), 700);

    setInterval(Game.save, TUNE.AUTOSAVE_MS);
    window.addEventListener('beforeunload', Game.save);
    UI.updateHUD(G.s);

    Main.last = performance.now();
    requestAnimationFrame(Main.loop);
  },
};

if (window.EPOCH_DEV) {
  window.EPOCH = {
    G,
    state: () => G.s,
    runTicks(n) { for (let i = 0; i < n; i++) Econ.tick(G.s); UI.updateHUD(G.s); },
    grant(m) { G.s.money += m; },
    place(type, x, y) { return Input.place(G.s, type, x, y); },
    save: () => Game.save(),
    reset: () => Game.reset(),
  };
}

window.addEventListener('DOMContentLoaded', () => {
  Main.boot();
  if (window.EPOCH_DEV && window.Dev) Dev.init();
});
