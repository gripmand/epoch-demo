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
    try { hasSave = !!localStorage.getItem(SAVE_KEY); } catch (e) {}
    const fresh = wantsFresh && !hasSave;
    const askFresh = wantsFresh && hasSave;
    if (wantsFresh && window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname);
    }
    const loaded = fresh ? false : Game.load();
    if (!loaded) Game.newGame();

    Rend.init(canvas);
    UI.init();
    Input.init(canvas);

    let away = null;
    if (loaded) {
      away = Econ.catchUp(G.s);
      Econ.realTime(G.s);
      Grid.rebuild(G.s);
    } else {
      G.s.lastSeenMs = Date.now();
    }

    if (away) {
      if (away.hours >= 0.5) setTimeout(() => UI.showAway(away), 500);
      else UI.toast('Welcome back — ' + away.hours + 'h away, ' +
        (away.money ? Util.fmtMoney(away.money) + ' earned.' : 'nothing earned. Check for stalled buildings.'), 9000);
    }

    if (!loaded) {

      setTimeout(() => UI.togglePanel('guide-panel', UI.guideHTML), 700);

      UI.toast(TUNE.FOUNDING_GRANT
        ? 'ERA 1 — ANUNNAKI. The sky-teachers hand you a founding village and ' +
          Util.fmtMoney(TUNE.FOUNDING.purse) + ' of grain rations — spend the ' +
          Util.fmtMoney(TUNE.START_MONEY) + ' in your treasury on a CRAFT CHAIN, because the rations run out ' +
          'and the food chain will not make you rich. Press G for the guide.'
        : 'ERA 1 — ANUNNAKI. Bare ground, your Hall, and ' + Util.fmtMoney(TUNE.START_MONEY) + ' — ' +
          'no village, no rations, an EMPTY granary. Build a Well, 2-3 Farms, a Mill touching a Farm, ' +
          'then Houses and a Market. Food before people: houses with nothing milled go hungry. ' +
          'Press G for the guide.', 16000);
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
