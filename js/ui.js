'use strict';

const UI = {
  els: {},
  activeTab: 'infra',

  init() {
    for (const id of ['money', 'net', 'rent', 'rent-rate', 'pop', 'workers', 'grain', 'flour', 'stone', 'blocks', 'cp', 'builders'])
      UI.els[id] = document.getElementById('hud-' + id);
    UI.els.era = document.getElementById('era-chip');
    UI.els.eraBar = document.getElementById('era-bar');
    UI.els.palette = document.getElementById('palette');
    UI.els.inspector = document.getElementById('inspector');
    UI.els.toasts = document.getElementById('toasts');
    UI.els.stoneChip = document.getElementById('chip-stone');
    UI.els.blocksChip = document.getElementById('chip-blocks');

    UI.buildPalette();

    const on = (id, fn) => { const el = document.getElementById(id); if (el) el.onclick = fn; return el; };
    if (UI.els.era) UI.els.era.onclick = () => UI.togglePanel('era-panel', UI.eraPanelHTML);
    on('btn-guide', () => UI.togglePanel('guide-panel', UI.guideHTML));
    on('btn-help', () => UI.togglePanel('help-panel', UI.helpHTML));
    on('btn-overlay', UI.toggleOverlays);
    UI.els.tallyBtn = on('btn-tally', () => UI.togglePanel('tally-panel', UI.tallyHTML));
    on('btn-reset', UI.promptReset);

    on('spd-pause', () => Main.setSpeed(0));
    UI.reflectSpeed();
  },

  search: '',

  showLocked: !!window.EPOCH_DEV,

  tabsFor() {
    const seen = new Map();
    for (const t of PALETTE_TABS) if (t.key === 'tools' || t.key === 'terra') seen.set(t.key, t.name);
    const NAMES = {
      infra: 'Infrastructure', food: 'Food & Industry', housing: 'Housing',
      commerce: 'Commerce', civic: 'Civic', industry: 'Industry',
      knowledge: 'Knowledge', logistics: 'Logistics', luxury: 'Luxury', military: 'Military',
      monument: 'Monuments',
    };
    const order = ['infra', 'food', 'industry', 'housing', 'commerce', 'civic', 'monument', 'knowledge', 'logistics', 'luxury', 'military'];
    const present = new Set();
    for (const k in BUILDINGS) {
      const d = BUILDINGS[k];
      if (d.noBuild || d.fixed) continue;
      present.add(d.tier || 'infra');
    }
    const out = [{ key: 'tools', name: 'Tools' }, { key: 'terra', name: 'Terraform' }];
    for (const c of order) if (present.has(c)) out.push({ key: c, name: NAMES[c] || c });
    for (const c of present) if (!order.includes(c)) out.push({ key: c, name: NAMES[c] || c });
    return out;
  },

  buildPalette() {
    const pal = UI.els.palette;
    pal.innerHTML = '';

    const bar = document.createElement('div');
    bar.className = 'pal-tabs';
    for (const tab of UI.tabsFor()) {
      const tb = document.createElement('button');
      tb.className = 'pal-tab';
      tb.dataset.tab = tab.key;
      tb.textContent = tab.name;
      tb.onclick = () => { UI.activeTab = tab.key; UI.renderTab(); };
      bar.appendChild(tb);
    }

    const filt = document.createElement('div');
    filt.className = 'pal-filter';
    const inp = document.createElement('input');
    inp.type = 'search';
    inp.placeholder = 'Search buildings…';
    inp.value = UI.search;
    inp.oninput = () => { UI.search = inp.value.trim().toLowerCase(); UI.renderTab(); };
    const lockBtn = document.createElement('button');
    lockBtn.className = 'pal-lockbtn';
    lockBtn.onclick = () => { UI.showLocked = !UI.showLocked; UI.renderTab(); };
    filt.appendChild(inp);
    filt.appendChild(lockBtn);
    UI.els.lockBtn = lockBtn;

    const body = document.createElement('div');
    body.className = 'pal-body';

    pal.appendChild(bar);
    pal.appendChild(body);
    pal.appendChild(filt);
    UI.els.palBody = body;
    UI.els.palBar = bar;
    UI.renderTab();
  },

  renderTab() {
    const body = UI.els.palBody;
    body.innerHTML = '';
    for (const tb of UI.els.palBar.children)
      tb.classList.toggle('active', tb.dataset.tab === UI.activeTab);

    if (UI.activeTab === 'tools') {
      body.appendChild(UI.toolBtn('sel', '↖', 'Select', () => Input.setTool('select')));
      body.appendChild(UI.toolBtn('land', '\u{1F5FA}️', 'Buy Land', () => Input.setTool('buyland')));
      body.appendChild(UI.toolBtn('demo', '⛏️', 'Demolish / Clear', () => Input.setTool('demolish')));
      UI.reflectTool();
      return;
    }

    if (UI.activeTab === 'terra') {
      for (const t of TERRA_TOOLS) {
        const btn = document.createElement('button');
        btn.className = 'pal-btn';
        btn.dataset.terra = t.kind;
        btn.title = 'Paint ' + t.name.toLowerCase() + ' — $' + TUNE.TERRA[t.kind] + ' per tile. Drag to sculpt. Only on owned, empty land.';
        btn.innerHTML = '<span class="pal-ico">' + t.icon + '</span>' +
          '<span class="pal-name">' + t.name + '</span>' +
          '<span class="pal-cost">$' + TUNE.TERRA[t.kind] + '</span>';
        btn.onclick = () => Input.setTool('terra', t.kind);
        body.appendChild(btn);
      }
      UI.reflectTool();
      return;
    }

    const items = [];
    for (const type in BUILDINGS) {
      const d = BUILDINGS[type];
      if (d.noBuild || d.fixed) continue;
      if ((d.tier || 'infra') !== UI.activeTab) continue;
      const era = d.era || 1;
      const locked = era > G.s.era;
      if (locked && !UI.showLocked) continue;
      if (UI.search && !(d.name + ' ' + (d.desc || '')).toLowerCase().includes(UI.search)) continue;

      const mon = d.monument ? monumentBuild(type, era) : null;
      items.push({ type, d, era, locked, mon });
    }
    items.sort((a, b) => a.era - b.era || a.d.name.localeCompare(b.d.name));

    if (UI.els.lockBtn) {
      const hidden = Object.keys(BUILDINGS).filter(k => {
        const d = BUILDINGS[k];
        return !d.noBuild && !d.fixed && (d.tier || 'infra') === UI.activeTab && (d.era || 1) > G.s.era;
      }).length;
      UI.els.lockBtn.textContent = UI.showLocked ? 'Hide locked' : (hidden ? 'Show ' + hidden + ' locked' : 'All unlocked');
      UI.els.lockBtn.classList.toggle('on', UI.showLocked);
      UI.els.lockBtn.disabled = !hidden && !UI.showLocked;
    }

    if (!items.length) {
      body.appendChild(UI.el('div', 'pal-empty', UI.search ? 'No match for “' + UI.search + '”' : 'Nothing available here yet.'));
      UI.reflectTool();
      return;
    }

    let lastEra = null;
    for (const { type, d, era, locked, mon } of items) {
      if (era !== lastEra) {
        lastEra = era;
        body.appendChild(UI.el('div', 'pal-era', 'Era ' + era + ' · ' + ERAS[era - 1].name));
      }
      const bill = mon ? UI.billText(mon) : '';
      const btn = document.createElement('button');
      btn.className = 'pal-btn' + (locked ? ' locked' : '');
      btn.dataset.type = type;
      btn.title = locked
        ? 'Unlocks in Era ' + era + ' — ' + ERAS[era - 1].name
        : mon
          ? '$' + d.cost + ' lays the foundation. Your city then delivers ' + bill +
            ' over time — it earns nothing until it is finished.'
          : (d.desc || '') + (d.upkeep ? '  (upkeep $' + d.upkeep + '/min)' : '');
      const cost = locked ? '\u{1F512} E' + era : '$' + d.cost + (mon ? '+' : '');
      btn.innerHTML = '<span class="pal-ico">' + (d.icon || '─') + '</span>' +
        '<span class="pal-name">' + d.name + '</span>' +
        '<span class="pal-cost">' + cost + '</span>';
      btn.onclick = () => {

        const devFree = window.Dev && Dev.flags.freeBuild;
        if (locked && !devFree) { UI.toast('\u{1F512} ' + d.name + ' unlocks in Era ' + era + ' — ' + ERAS[era - 1].name + '.'); return; }
        Input.setTool(type === 'road' ? 'road' : 'build', type);
      };
      body.appendChild(btn);
    }
    UI.reflectTool();
  },

  billText(need) {
    const bits = [];
    for (const k in need) {
      const n = Math.round(need[k]).toLocaleString();
      bits.push(k === 'money' ? '$' + n + ' in wages' : n + ' ' + k);
    }
    return bits.join(', ').replace(/, ([^,]*)$/, ' and $1');
  },

  el(tag, cls, text) {
    const e = document.createElement(tag);
    e.className = cls;
    e.textContent = text;
    return e;
  },

  toolBtn(id, ico, name, fn) {
    const btn = document.createElement('button');
    btn.className = 'pal-btn'; btn.id = 'tool-' + id;
    btn.innerHTML = '<span class="pal-ico">' + ico + '</span><span class="pal-name">' + name + '</span>';
    btn.onclick = fn;
    return btn;
  },

  refreshPalette() { UI.renderTab(); },

  reflectTool() {
    const t = Input.tool;
    for (const btn of UI.els.palBody.querySelectorAll('.pal-btn')) btn.classList.remove('active');
    const byId = id => { const b = document.getElementById(id); if (b) b.classList.add('active'); };
    if (t.mode === 'buyland') byId('tool-land');
    else if (t.mode === 'demolish') byId('tool-demo');
    else if (t.mode === 'select') byId('tool-sel');
    else if (t.mode === 'terra') {
      const btn = UI.els.palBody.querySelector('.pal-btn[data-terra="' + t.type + '"]');
      if (btn) btn.classList.add('active');
    }
    else if (t.mode === 'build' || t.mode === 'road') {
      const type = t.mode === 'road' ? 'road' : t.type;
      const btn = UI.els.palBody.querySelector('.pal-btn[data-type="' + type + '"]');
      if (btn) btn.classList.add('active');
    }
  },

  reflectSpeed() {

    const el = document.getElementById('spd-pause');
    if (!el) return;
    el.classList.toggle('active', !!Main.paused);
    el.textContent = Main.paused ? '▶' : '❚❚';
    el.title = (Main.paused ? 'Resume' : 'Pause') + ' (Space)';
  },

  toggleOverlays() {
    const on = !Rend.showWater;
    Rend.showWater = on; Rend.showPower = on;
    document.getElementById('btn-overlay').classList.toggle('active', on);
  },

  themeFor(era) {
    if (era <= 1) return 'anunnaki';
    if (era === 2) return 'egypt';
    if (era <= 4) return 'jungle';
    if (era <= 6) return 'classical';
    if (era <= 8) return 'medieval';
    if (era === 9) return 'industrial';
    if (era <= 11) return 'modern';
    return 'cosmic';
  },

  MIGRATE_HINT: {
    ok: 'Settlers are arriving.',
    nohouse: 'Nobody can move in — you have no housing yet.',
    full: 'Every house is full. Build more housing to keep growing.',
    blocked: 'Your housing has no road access or no water, so nobody will move in.',
    hungry: 'The city is hungry, so nobody new is arriving. Residents will hold on for up to ' +
            TUNE.STARVE_MINUTES + ' minutes — build a Farm and a Mill before then.',
  },

  BUILD: '2026-07-28.5-tempo',

  literate(s) { return !!(s && s.literate); },
  UNLIT: '—',

  perMin(rate) { return Util.fmtNum((rate || 0) * 60); },

  updateHUD(s) {
    const C = G.cache;
    const lit = UI.literate(s);
    const theme = UI.themeFor(s.era);
    if (document.body.dataset.eraTheme !== theme) document.body.dataset.eraTheme = theme;
    if (UI.els.tallyBtn) UI.els.tallyBtn.classList.toggle('hidden', !lit);
    UI.els.money.textContent = Util.fmtMoney(s.money);
    UI.els.money.classList.toggle('bad', s.money < 0);

    if (lit) {
      UI.els.net.textContent = Util.fmtRate(C.net * 60) + '/min';
      UI.els.net.className = 'hud-sub ' + (C.net >= 0 ? 'good' : 'bad');
      UI.els.net.title = '';

      if (s.foundingLeft > 0) {
        UI.els.net.textContent += '  \u{1F33E}+' + TUNE.FOUNDING.perMinute;
        UI.els.net.title = 'Includes the Anunnaki ration: +$' + TUNE.FOUNDING.perMinute +
          '/min while it lasts, and $' + Math.round(s.foundingLeft) +
          ' of it is left. Build your craft chains before it runs out.';
      }
    } else {
      UI.els.net.textContent = 'no tally kept';
      UI.els.net.className = 'hud-sub gold-dim';
      UI.els.net.title = 'Nobody is writing anything down. Build a Scribe’s House to see rates.';
    }

    if (UI.els.cp) UI.els.cp.parentElement.style.display = 'none';
    if (UI.els.builders) UI.els.builders.parentElement.style.display = 'none';

    UI.els.rent.textContent = '$' + s.realRent.toFixed(8);
    const t = subTier(s);
    const ri = Econ.rentInfo(s);
    const mine = ri.monthly;
    if (t.key === 'free') {

      const asSub = rentMonthly(s.era, s.hallLevel, 'citizen', ri.rp);
      UI.els['rent-rate'].textContent = 'accruing $' + mine.toFixed(6) + '/mo · ' +
        Math.round(ri.achievement * 100) + '% of era cap · Citizen earns $' + asSub.toFixed(6);
      UI.els['rent-rate'].className = 'hud-sub gold-dim';
      UI.els['rent-rate'].title = 'Your Town Hall is earning real-money rent right now, at the free ' +
        'Settler rate (' + Math.round(SUB_TIERS.free.rentMult * 100) + '% of the Citizen rate). The balance ' +
        'is yours and keeps growing; withdrawing it is what a Citizen subscription unlocks.';
      UI.els.rent.classList.add('locked-rent');
    } else {
      UI.els.rent.classList.remove('locked-rent');
      const net = mine - t.price;
      UI.els['rent-rate'].textContent = '$' + mine.toFixed(2) + '/mo · ' +
        Math.round(ri.achievement * 100) + '% of era cap';
      UI.els['rent-rate'].className = 'hud-sub ' + (net >= 0 ? 'good' : 'gold-dim');
    }

    UI.els.pop.textContent = Game.totalResidents(s) + ' / ' + Game.totalCapacity(s);
    const chip = UI.els.pop.parentElement;
    if (chip) {
      const why = C.migrateWhy;
      chip.title = UI.MIGRATE_HINT[why] || UI.MIGRATE_HINT.ok;
      chip.classList.toggle('warn', why === 'full' || why === 'blocked');
      chip.classList.toggle('bad', why === 'hungry');
    }
    UI.els.workers.textContent = C.workersUsed + ' / ' + C.workersTotal;

    UI.els.grain.textContent = Util.fmtNum(s.stock.grain) + ' / ' + Econ.capOf(s, 'grain');
    UI.els.flour.textContent = Util.fmtNum(s.stock.flour) + ' / ' + Econ.capOf(s, 'flour');

    const showStone = s.era >= 3;
    UI.els.stoneChip.classList.toggle('hidden', !showStone);
    UI.els.blocksChip.classList.toggle('hidden', !showStone);
    UI.els.stoneChip.style.display = showStone ? '' : 'none';
    UI.els.blocksChip.style.display = showStone ? '' : 'none';
    if (showStone) {
      UI.els.stone.textContent = Util.fmtNum(s.stock.stone) + ' / ' + Econ.capOf(s, 'stone');
      UI.els.blocks.textContent = Util.fmtNum(s.stock.blocks) + ' / ' + Econ.capOf(s, 'blocks');
    }

    const era = ERAS[s.era - 1];
    const ready = Econ.eraReady(s);
    UI.els.era.classList.toggle('ready', ready);
    UI.els.era.querySelector('.era-name').textContent =
      ready ? '⬆ Era ' + (s.era + 1) + ' READY — click!' : 'Era ' + s.era + ' · ' + era.name;
    if (s.era >= MAX_ERA) UI.els.eraBar.style.width = '100%';
    else {
      const r = eraReq(s.era + 1);
      const f = Math.min(
        Game.totalResidents(s) / r.pop,
        Math.max(0, s.money) / r.money,
        s.cum.flour / r.food,
        r.stone ? s.cum.stone / r.stone : 1
      );
      UI.els.eraBar.style.width = Math.round(Math.min(1, f) * 100) + '%';
    }

    if (Input.selected) UI.showInspector(Input.selected);
  },

  promptReset() {
    UI.togglePanel('reset-panel', () =>
      '<h2>\u{1F5FA}️ Start a New World</h2>' +
      '<div class="panel-sub">This cannot be undone.</div>' +
      '<p><b>Your current city will be permanently deleted</b> — every building, all your money, and the saved game behind it.</p>' +
      '<p>You will start again on fresh ground with your Town Hall and ' + Util.fmtMoney(TUNE.START_MONEY) + '.</p>' +
      '<div class="adv-btns">' +
      '<button id="reset-yes" class="btn-gold">Delete my city and start over</button>' +
      '<button id="reset-no" class="btn-plain">Keep playing</button></div>'
    );

    const yes = document.getElementById('reset-yes');
    if (!yes) return;
    const close = () => { const p = document.getElementById('reset-panel'); if (p) p.remove(); };
    yes.onclick = () => {
      close();
      Game.reset(); Input.selected = null; UI.hideInspector(); UI.refreshPalette();
      if (window.Rend && Rend.onWorldChange) Rend.onWorldChange();
      UI.updateHUD(G.s);

      UI.toast('A new world, and ' + Util.fmtMoney(TUNE.START_MONEY) + ' to start. Lay a road from your Hall, ' +
        'then a Well, THREE Farms, a Mill touching a Farm, and a MARKET — the Market is your only income. ' +
        'Then three Houses. Press G for the guide.', 16000);
    };
    document.getElementById('reset-no').onclick = close;
  },

  promptAdvance(next) {
    const era = ERAS[next - 1];
    UI.togglePanel('advance-panel', () =>
      '<h2>\u{1F30D} Civilization Awaits</h2>' +
      '<div class="panel-sub">All requirements met.</div>' +
      '<p><b>Are you ready to advance civilization to its next step?</b></p>' +
      '<p class="era-next"><b>Era ' + next + ' · ' + era.name + '</b><br>' + era.blurb + '</p>' +
      '<p>Advancing unlocks new buildings and upgrades, raises your Town Hall cap, and increases real rent. Your city carries forward — nothing resets.</p>' +
      '<div class="adv-btns">' +
      '<button id="adv-yes" class="btn-gold">Yes — advance to ' + era.name + '</button>' +
      '<button id="adv-no" class="btn-plain">Not yet</button></div>'
    );

    const yes = document.getElementById('adv-yes');
    if (!yes) return;
    yes.onclick = () => {
      Econ.advanceEra(G.s);
      const p = document.getElementById('advance-panel');
      if (p) p.remove();
    };
    document.getElementById('adv-no').onclick = () => {
      document.getElementById('advance-panel').remove();
      UI.toast('Take your time. When you’re ready, click the glowing era chip (top left) to advance.', 9000);
    };
  },

  statusText(b) {
    const M = {
      ok: ['RUNNING', 'good'], no_road: ['NO ROAD to Town Hall', 'bad'],
      no_water: ['NO WATER coverage', 'bad'], no_power: ['NO POWER', 'bad'],
      no_staff: ['NO WORKERS available', 'bad'], understaffed: ['UNDERSTAFFED', 'warn'],
      no_input: ['NO INPUT in stock', 'bad'], no_customers: ['NOT ENOUGH CUSTOMERS', 'bad'],
      hungry: ['RESIDENTS HUNGRY', 'bad'],

      resting: ['RESTING — ground recovering', 'warn'],
      halted: ['HALTED — deliveries paused', 'warn'],
      building: ['UNDER CONSTRUCTION', 'warn'],
    };
    return M[b.status] || ['—', ''];
  },

  showInspector(b) {
    const s = G.s;
    const d = DEF(b.type);

    const title = b.type === 'townhall' ? anchorFor(s.era).name : d.name;
    const [st, cls] = UI.statusText(b);
    const lit = UI.literate(s);
    let rows = '';

    const rpNow = Econ.rentContribution(s, b);
    if (rankUpgradable(d)) {
      const r = rankOf(b);
      rows += '<div class="insp-row"><span>Rank</span><span class="' + (r > 1 ? 'good' : '') + '">' +
        r + ' of ' + RANK.max + (r > 1 ? ' · +' + Math.round((rankOutMult(b) - 1) * 100) + '% output' : ' (base)') +
        '</span></div>';
    }
    const row = (l, v) => '<div class="insp-row"><span>' + l + '</span><span>' + v + '</span></div>';

    const mrow = (l, v) => '<div class="insp-row"><span>' + l + '</span><span>' +
      (lit ? v : '<span class="gold-dim" title="No records kept — build a Scribe’s House for the numbers">'
        + UI.UNLIT + '</span>') + '</span></div>';
    const req = (label, ok) => '<div class="insp-row"><span>' + label + '</span><span class="' + (ok ? 'good' : 'bad') + '">' + (ok ? '✓' : '✗') + '</span></div>';

    if (!d.fixed && d.needsRoad) rows += req('Road access', !!b.conn);
    if (d.needsWater) rows += req('Water', Grid.covered(G.cache.water, b));
    if (d.needsPower) rows += req('Power', Grid.covered(G.cache.power, b));
    if (d.workers) rows += row('Staff', (b.staff || 0) + ' / ' + d.workers);

    if (d.monument && !b.complete) {
      const p = Econ.monumentProgress(s, b);
      rows += '<div class="insp-row"><span>Construction</span><span class="gold">' +
        Math.round(p.frac * 100) + '% · course ' + Math.min(3, (b.stage || 0) + 1) + ' of 4</span></div>';
      for (const part of p.parts) {
        const label = part.kind === 'money' ? 'Wages paid' : part.kind.charAt(0).toUpperCase() + part.kind.slice(1) + ' delivered';
        const have = part.kind === 'money' ? Util.fmtMoney(part.have) : Math.round(part.have).toLocaleString();
        const need = part.kind === 'money' ? Util.fmtMoney(part.need) : part.need.toLocaleString();
        const stocked = part.kind === 'money' ? s.money : (s.stock[part.kind] || 0);
        const starved = part.have < part.need && stocked < 1;
        rows += '<div class="insp-row"><span>' + label + '</span><span class="' +
          (part.have >= part.need ? 'good' : starved ? 'bad' : '') + '">' + have + ' / ' + need +
          (starved ? ' — none in stock' : '') + '</span></div>';
      }
      const waiting = p.parts.filter(x => x.have < x.need)
        .filter(x => (x.kind === 'money' ? s.money : (s.stock[x.kind] || 0)) < 1).map(x => x.kind);
      rows += '<div class="insp-row insp-note"><span>' + (
        b.block === 'no_road' ? 'No road — nothing can be carted to the site.'
        : waiting.length ? 'Stalled: the site has run out of ' + waiting.join(' and ') +
            '. Build the chain that makes it, or stop selling it.'
        : 'Rising. It earns nothing — no trickle, no rent — until it is topped out.'
      ) + '</span></div>';
    }

    if (d.out && d.out.grain) {
      const bon = [];
      if (b.fertile) bon.push('fertile +' + Math.round(b.fertile * TUNE.FERTILE_BONUS * 100) + '%');
      if (b.adjBoost) bon.push('mill +25%');
      rows += mrow('Output', UI.perMin(b.rate) + ' grain/min');
      if (bon.length) rows += '<div class="insp-row"><span>Bonuses</span><span class="good">' + bon.join(', ') + '</span></div>';

      const soil = b.soil !== undefined ? b.soil : Grid.soilUnder(b);
      const pct = Math.round(soil * 100);
      const cls = soil > 0.66 ? 'good' : soil > 0.33 ? 'warn' : 'bad';
      rows += mrow('Soil', '<span class="' + cls + '">' + pct + '%' +
        (soil < 0.999 ? ' — yield ' + Math.round((TUNE.SOIL.minYield + (1 - TUNE.SOIL.minYield) * soil) * 100) + '%' : '') +
        '</span>');
      const working = !b.block && b.staff > 0;
      const mid = G.cache.midden[Grid.key(b.x, b.y)];
      const wet = Econ.nearChannel(b.x, b.y, TUNE.SOIL.waterLeach);
      if (working) {
        rows += '<div class="insp-row insp-note"><span>Cropping salinizes this ground. Leave it fallow to recover, or put a Midden in range.</span></div>';
      } else {
        const boosts = [];
        if (mid) boosts.push('midden ×' + TUNE.SOIL.middenBonus);
        if (wet) boosts.push('beside water ×' + TUNE.SOIL.waterBonus);
        rows += '<div class="insp-row"><span>Fallow</span><span class="good">recovering' +
          (boosts.length ? ' (' + boosts.join(', ') + ')' : '') + '</span></div>';
      }
    } else if (d.out && d.out.stone) {
      rows += mrow('Output', UI.perMin(b.rate) + ' stone/min');
      rows += mrow('Rock underfoot', Math.round((b.rockFrac || 0) * 100) + '%');

      const left = b.stoneLeft !== undefined ? b.stoneLeft : Econ.quarryStoneLeft(b);
      rows += mrow('Stone remaining', '<span class="' +
        (left > 200 ? '' : left > 0 ? 'warn' : 'bad') + '">' + Math.round(left) +
        (left <= 0 ? ' — worked out' : '') + '</span>');
      rows += '<div class="insp-row insp-note"><span>Stone does not grow back. When this outcrop is spent, buy land that has more rock.</span></div>';
      if (b.adjBoost) rows += '<div class="insp-row"><span>Bonuses</span><span class="good">stonecutter +25%</span></div>';
    } else if (b.type === 'midden') {
      rows += row('Soil recovery', '×' + TUNE.SOIL.middenBonus + ' within ' + DEF('midden').soilRadius + ' tiles');
      rows += '<div class="insp-row insp-note"><span>Manured ground recovers from salt faster. It does nothing to a field that is still being cropped — rotate your farms.</span></div>';
    } else if (d.procIn) {
      rows += mrow('Output', UI.perMin(b.rate) + ' ' + d.procOut + '/min');
      if (b.adjBoost) rows += '<div class="insp-row"><span>Bonuses</span><span class="good">' + (d.procIn === 'grain' ? 'farm' : 'quarry') + ' +25%</span></div>';
    } else if (d.sells) {

      rows += row('Customers', (b.customers || 0) + ' (need ≥' + d.custMin + ')');
      rows += mrow('Average haul', Util.fmtNum(b.custDist || 0) + ' tiles');
      if (b.trade > 1.001) {
        rows += '<div class="insp-row"><span>Distance premium</span><span class="bad">×' +
          (b.trade).toFixed(2) + ' upkeep</span></div>';
      } else {
        rows += '<div class="insp-row"><span>Distance premium</span><span class="good">none (under ' +
          TUNE.TRADE.freeRadius + ' tiles)</span></div>';
      }
      rows += '<div class="insp-row"><span>Scribe\'s accounts</span><span class="' + (b.scribed ? 'good' : '') + '">' +
        (b.scribed ? '+' + Math.round(TUNE.SCRIBE.bonus * 100) + '% sales'
                   : 'none within ' + TUNE.SCRIBE.radius + ' tiles') + '</span></div>';
      rows += mrow('Sales', UI.perMin(b.rate) + ' ' + d.sells + '/min → $' +
        Util.fmtNum((b.rate || 0) * 60 * d.sellPrice) + '/min');
    } else if (d.cap) {
      const tags = [];
      if (b.nearPark) tags.push('<span class="good">+1 park</span>');
      if (b.nearTemple) tags.push('<span class="good">+1 temple</span>');
      if (b.nearInd) tags.push('<span class="bad">−1 industry</span>');
      rows += '<div class="insp-row"><span>Residents</span><span>' + (b.residents || 0) + ' / ' + (b.cap != null ? b.cap : d.cap) + ' ' + tags.join(' ') + '</span></div>';

      const lvl = b.level || 1;
      rows += '<div class="insp-row"><span>Dwelling</span><span class="gold">' +
        houseLevelName(s.era, lvl) + ' <span class="gold-dim">(rung ' + lvl + ' of ' + HOUSE_MAX_LEVEL + ')</span></span></div>';
      rows += row('Neighbouring homes', (b.nearHomes || 0) + ' within 2 tiles');
      if (lvl === 1) {
        const met = (b.nearHomes || 0) >= Econ.NEIGHBOURS_FOR_RUNG2;
        rows += req('Becomes a house at ' + Econ.NEIGHBOURS_FOR_RUNG2 + ' neighbours', met);
        if (met) rows += '<div class="insp-row"><span>Improving</span><span class="good">' +
          Math.round(Util.clamp(b.evolve || 0, 0, 1) * 100) + '%</span></div>';
      }
      if ((b.evolve || 0) < -0.02) {
        rows += '<div class="insp-row"><span>Declining</span><span class="bad">' +
          Math.round(Util.clamp(-b.evolve, 0, 1) * 100) + '% — its neighbours are gone</span></div>';
      }
    } else if (b.type === 'townhall') {
      rows += '<div class="insp-row insp-note"><span>' + anchorFor(s.era).note + '</span></div>';
      rows += '<div class="insp-row"><span>Chapter</span><span class="gold">' + s.hallLevel + ' / ' + MAX_ERA + '</span></div>';
      rows += '<div class="insp-row"><span>Income floor</span><span class="good">+$' + HALLS[s.hallLevel].trickle + '/min</span></div>';
      const tier = subTier(s);
      const ri = Econ.rentInfo(s);
      rows += '<div class="insp-row"><span>Account</span><span class="' + (tier.key === 'free' ? '' : 'gold') + '">' + tier.name + '</span></div>';
      rows += '<div class="insp-row"><span>Rent points</span><span>' + Math.round(ri.rp) +
        ' <span class="gold-dim">(' + ri.monuments + ' monument' + (ri.monuments === 1 ? '' : 's') + ', ' + ri.working + ' working)</span></span></div>';
      rows += '<div class="insp-row"><span>Era earning cap</span><span>' + Math.round(ri.achievement * 100) + '% of $' + ri.ceiling.toFixed(2) + '/mo</span></div>';
      if (ri.idle) rows += '<div class="insp-row"><span>Idle buildings</span><span class="bad">' + ri.idle + ' earning nothing</span></div>';
      rows += '<div class="insp-row"><span>Real rent</span><span class="gold">$' + ri.monthly.toFixed(3) + '/month</span></div>';
      if (tier.key === 'free') {
        rows += '<div class="insp-row"><span>Withdrawable</span><span class="bad">No — Settler accounts accrue only</span></div>';
        rows += '<div class="insp-row"><span>As a Citizen</span><span class="good">$' + rentMonthly(s.era, s.hallLevel, 'citizen', ri.rp).toFixed(2) + '/month, withdrawable</span></div>';
      }
      rows += '<div class="insp-row"><span>Real rent accrued</span><span class="gold">$' + s.realRent.toFixed(8) + '</span></div>';

      const why = G.cache.migrateWhy || 'nohouse';
      const okNow = why === 'ok';
      rows += '<div class="insp-row"><span>Settlers</span><span class="' + (okNow ? 'good' : 'bad') + '">' +
        (okNow ? '+' + (G.cache.migrateRate || 0).toFixed(1) + '/min · ' + (G.cache.openHousing || 0) + ' beds free'
               : UI.MIGRATE_HINT[why]) + '</span></div>';
    } else if (d.waterRadius) {
      rows += row('Water radius', d.waterRadius + ' tiles');
    } else if (b.type === 'granary') {
      rows += row('Storage', '+' + TUNE.GRANARY_GRAIN + ' grain, +' + TUNE.GRANARY_FLOUR + ' flour');
    } else if (b.type === 'coal') {
      rows += row('Power radius', DEF('coal').powerRadius + ' tiles');
    }

    const sup = b.supply || 1;
    const perMin = (d.upkeep * sup).toFixed(2);
    if (sup > 1.01) {
      rows += '<div class="insp-row"><span>Supply</span><span class="warn">−$' + perMin + '/min · ×' +
        sup.toFixed(2) + ' carting</span></div>';
      rows += '<div class="insp-row insp-note"><span>' + Math.round(b.supplyDist || 0) +
        ' tiles from the nearest market. Anything past ' + TUNE.SUPPLY.freeRadius +
        ' costs more to keep supplied — build a market out here.</span></div>';
    } else {
      rows += '<div class="insp-row"><span>Supply</span><span>−$' + perMin + '/min</span></div>';
    }

    let buttons = '';

    if (d.cap) {
      const up = Econ.houseUpgrade(s, b);
      if (!up) {
        buttons += '<button class="btn-gold" disabled>Finest dwelling of this age</button>';
      } else if (up.blocked === 'neighbours') {
        buttons += '<button class="btn-gold" disabled>Needs ' + up.need +
          ' neighbouring homes to become a house<br><small>' + up.have + ' of ' + up.need + ' within 2 tiles</small></button>';
      } else {
        const ok = s.money >= up.cost;
        buttons += '<button id="insp-houseup" class="btn-gold" ' + (ok ? '' : 'disabled') + '>Rebuild as a ' +
          up.name + ' — ' + Util.fmtMoney(up.cost) + '<br><small>houses ' +
          Math.max(1, houseCap(d, { level: up.level })) + ' residents</small></button>';
      }
    }
    if (b.type === 'townhall') {
      const n = Econ.hallNext(s);
      if (!n) {
        buttons += '<button class="btn-gold" disabled>Final chapter reached</button>';
      } else if (n.locked === 'era') {
        buttons += '<button class="btn-gold" disabled>\u{1F512} Reach Era ' + (s.era + 1) + ' for the next chapter</button>';
      } else {
        const ok = s.money >= n.money;
        buttons += '<button id="insp-hallup" class="btn-gold" ' + (ok ? '' : 'disabled') + '>Upgrade to chapter ' +
          n.level + ' — ' + Util.fmtMoney(n.money) + '<br><small>+$' + n.trickle + '/min · $' +
          rentMonthly(s.era, n.level, s.subTier).toFixed(2) + '/mo rent</small></button>';
      }
    }
    const up = UPGRADES[b.type];
    if (up) {
      const unlocked = s.era >= up.era;
      const can = unlocked && s.money >= up.cost;
      buttons += '<button id="insp-upgrade" class="btn-primary" ' + (can ? '' : 'disabled') + '>' +
        (unlocked ? 'Upgrade → ' + up.label + ' ($' + up.cost + ')' : '\u{1F512} ' + up.label + ' — Era ' + up.era) + '</button>';
    }

    if (rankUpgradable(d)) {
      const r = rankOf(b);
      if (r < RANK.max) {
        const cost = rankUpCost(d, r);
        const can = s.money >= cost;
        const gain = Math.round(RANK.outPerRank * 100);
        buttons += '<button id="insp-rank" class="btn-primary" ' + (can ? '' : 'disabled') + '>' +
          '⚙️ Upgrade to ' + d.name + ' ' + RANK.numerals[r + 1].trim() + ' — $' + cost +
          ' (+' + gain + '% output)</button>';
      }
    }

    if (d.monument && !b.complete) {
      const p = Econ.monumentProgress(G.s, b);
      const pct = p ? Math.round(p.frac * 100) : 0;
      buttons += b.halted
        ? '<button id="insp-halt" class="btn-gold">▶️ Resume building — ' + pct + '% delivered</button>'
        : '<button id="insp-halt" class="btn-plain">⏸️ Halt construction — ' + pct + '% delivered</button>';
    }
    if (d.out && d.out.grain) {
      const soil = Math.round((b.soil !== undefined ? b.soil : 1) * 100);
      buttons += b.resting
        ? '<button id="insp-rest" class="btn-gold">\u{1F33E} Resume cropping — soil ' + soil + '%</button>'
        : '<button id="insp-rest" class="btn-plain">\u{1F4A4} Rest this field — soil ' + soil + '%</button>';

      const fields = G.s.buildings.filter(x => { const xd = DEF(x.type); return xd.out && xd.out.grain; });
      const anyWorking = fields.some(x => !x.resting);
      buttons += anyWorking
        ? '<button id="insp-rest-all" class="btn-plain">\u{1F4A4} Rest ALL ' + fields.length + ' fields</button>'
        : '<button id="insp-rest-all" class="btn-gold">\u{1F33E} Resume ALL ' + fields.length + ' fields</button>';
    }
    if (!d.fixed && b.type !== 'road') {
      buttons += '<button id="insp-move" class="btn-primary">\u{1F4E6} Move building</button>';
    }
    if (!d.fixed) {

      const refund = Math.floor((d.cost != null ? d.cost : 100) * TUNE.DEMOLISH_REFUND);
      buttons += '<button id="insp-demolish" class="btn-danger">Demolish (+$' + refund + ')</button>';
    }

    const blurb = b.type === 'townhall' ? anchorFor(s.era).note : d.desc;

    if (b.type !== 'road') {
      rows += '<div class="insp-row"><span>Rent contribution</span><span class="' + (rpNow ? 'good' : 'bad') + '">' +
        (rpNow === null
          ? 'not earning — idle buildings pay none'
          : '+' + (+rpNow.toFixed(2)) + ' rent points') + '</span></div>';
    }

    UI.els.inspector.innerHTML =
      '<div class="insp-head"><span class="insp-ico">' + (d.icon || '─') + '</span>' +
      '<span class="insp-name">' + title + '</span>' +
      '<button id="insp-close">✕</button></div>' +
      '<div class="insp-status ' + cls + '">' + st + '</div>' +
      (blurb ? '<div class="insp-desc">' + blurb + '</div>' : '') +
      rows + '<div class="insp-btns">' + buttons + '</div>';
    UI.els.inspector.classList.remove('hidden');

    document.getElementById('insp-close').onclick = () => { Input.selected = null; UI.hideInspector(); };
    const hu = document.getElementById('insp-hallup');
    if (hu) hu.onclick = () => {
      if (!Econ.startHall(s)) return;
      UI.toast('\u{1F3DB}️ Town Hall is now chapter ' + s.hallLevel + ' — income floor and rent both raised.', 9000);
      UI.showInspector(b);
    };
    const ug = document.getElementById('insp-upgrade');
    if (ug) ug.onclick = () => {
      if (s.era < up.era || s.money < up.cost) return;
      s.money -= up.cost;
      b.type = up.to;
      G.cache.dirty = true; Grid.rebuild(s);
      UI.toast(d.name + ' upgraded to ' + up.label + '. Same land, better numbers — cities transform, they never reset.');
      UI.showInspector(b);
    };
    const rank = document.getElementById('insp-rank');
    if (rank) rank.onclick = () => {
      const r = rankOf(b);
      if (r >= RANK.max) return;
      const cost = rankUpCost(d, r);
      if (s.money < cost) return;
      s.money -= cost;
      b.rank = r + 1;
      Grid.rebuild(s);
      UI.toast('⚙️ ' + d.name + ' upgraded to rank ' + RANK.numerals[b.rank].trim() + ' — +' +
        Math.round(RANK.outPerRank * 100) + '% output for +' + Math.round(RANK.upkeepPerRank * 100) +
        '% upkeep, and NOT ONE extra worker. That is what a rank is for: more from the same ' +
        'ground and the same mouths.', 11000);
      UI.showInspector(b);
      UI.updateHUD(s);
    };
    const halt = document.getElementById('insp-halt');
    if (halt) halt.onclick = () => {
      b.halted = !b.halted;
      b.status = b.halted ? 'halted' : 'building';
      UI.toast(b.halted
        ? '⏸️ Construction halted. Everything already delivered stays in the foundation — the site simply ' +
          'stops drawing money and materials. Resume whenever your treasury can carry it.'
        : '▶️ Construction resumed. The site will draw from your stores again.', 10000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };
    const restAll = document.getElementById('insp-rest-all');
    if (restAll) restAll.onclick = () => {
      const fields = G.s.buildings.filter(x => { const xd = DEF(x.type); return xd.out && xd.out.grain; });
      const rest = fields.some(x => !x.resting);
      let workers = 0;
      for (const f of fields) {
        if (rest && !f.resting) workers += f.staff || 0;
        f.resting = rest; f.staff = 0; f.rate = 0;
        f.status = rest ? 'resting' : 'ok';
      }
      Grid.rebuild(G.s);
      UI.toast(rest
        ? '\u{1F4A4} All ' + fields.length + ' fields resting — ' + workers + ' workers back in the pool. ' +
          'Each one resumes on its own at 100% soil. Grain production is now ZERO, so watch your flour.'
        : '\u{1F33E} All ' + fields.length + ' fields back to work.', 11000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };
    const rest = document.getElementById('insp-rest');
    if (rest) rest.onclick = () => {
      b.resting = !b.resting;
      b.staff = 0; b.rate = 0;
      b.status = b.resting ? 'resting' : 'ok';
      Grid.rebuild(G.s);
      const S = TUNE.SOIL;

      let mult = 1;
      if (Econ.nearChannel(b.x, b.y, S.waterLeach)) mult *= S.waterBonus;
      if (G.cache.midden[Grid.key(b.x, b.y)]) mult *= S.middenBonus;
      const mins = Math.max(1, Math.round(S.fallowMinutes / mult * (1 - (b.soil || 1))));
      UI.toast(b.resting
        ? '\u{1F4A4} Field rested. Its 2 workers are back in the pool and the ground is recovering' +
          (mult > 1 ? ' at ' + mult + '× speed (' + (mult >= 9 ? 'water and midden' : mult === 3 ? 'water or midden' : '') + ')' : '') +
          ' — about ' + mins + ' min to full. It will start cropping again by itself at 100%. Upkeep still runs.'
        : '\u{1F33E} Cropping resumed at ' + Math.round((b.soil || 1) * 100) + '% soil.', 10000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };
    const mv = document.getElementById('insp-move');
    if (mv) mv.onclick = () => Input.startMove(b);
    const hup = document.getElementById('insp-houseup');
    if (hup) hup.onclick = () => {
      if (!Econ.buyHouseUpgrade(G.s, b)) return;
      Grid.rebuild(G.s);
      UI.updateHUD(G.s);
      UI.showInspector(b);
      UI.firstToast('houseup', 'Rebuilt. Past the first improvement, better housing is bought — it is one of the main things your treasury is for.');
    };
    const dm = document.getElementById('insp-demolish');
    if (dm) dm.onclick = () => Input.demolish(b);
  },

  hideInspector() { UI.els.inspector.classList.add('hidden'); },

  eraCeremony(era, land) {
    const e = ERAS[era - 1];
    if (!e) return;
    const u = Econ.eraUnlocks(era);
    const g = eraGuide(era);

    if (window.Rend) {
      Rend.tgt.di = Math.min(70, Math.max(Rend.tgt.di * 1.9, 40));
      Rend.tgt.po = 0.85;
      Rend._ceremonyDrift = 1;
    }

    for (const old of document.querySelectorAll('.era-ceremony')) old.remove();
    const w = document.createElement('div');
    w.className = 'era-ceremony';

    const list = (label, items) => items.length
      ? '<div class="cer-group"><div class="cer-label">' + label + '</div><div class="cer-items">' +
        items.map(i => '<span class="cer-item">' + (i.icon ? i.icon + ' ' : '') +
          (i.name || i.label) + '</span>').join('') + '</div></div>'
      : '';

    w.innerHTML =
      '<div class="cer-card">' +
        '<div class="cer-kicker">The age turns</div>' +
        '<div class="cer-numeral">' + era + '</div>' +
        '<div class="cer-name">' + e.name.toUpperCase() + '</div>' +
        '<div class="cer-blurb">' + (g && g.headline ? g.headline : e.blurb) + '</div>' +
        '<div class="cer-rule"></div>' +
        (land && land.parcels
          ? '<div class="cer-group"><div class="cer-label">The frontier opens</div>' +
            '<div class="cer-items"><span class="cer-item cer-land">\u{1F5FA}\u{FE0F} ' + land.parcels +
            ' parcels granted · ' + land.tiles.toLocaleString() + ' tiles</span></div></div>'
          : '') +
        list('Now buildable', u.buildings) +
        list('Now upgradable', u.upgrades) +
        (u.monument ? list('The monument of this age', [u.monument]) : '') +
        '<div class="cer-note">Your city was not replaced. Every building you raised is still ' +
          'standing — it is wearing this age instead.</div>' +
        '<button class="cer-go">Begin</button>' +
      '</div>';
    document.body.appendChild(w);
    requestAnimationFrame(() => w.classList.add('in'));

    const close = () => {
      w.classList.remove('in');
      if (window.Rend) Rend._ceremonyDrift = 0;
      setTimeout(() => w.remove(), 420);

      setTimeout(() => UI.togglePanel('guide-panel', UI.guideHTML), 460);
    };
    w.querySelector('.cer-go').onclick = close;

    w.onclick = ev => { if (ev.target === w) close(); };
  },

  awayHTML(a) {
    const s = G.s;
    const STATUS = {
      no_road: 'no road to the Hall', no_water: 'no water coverage', no_power: 'no power',
      no_staff: 'no workers', no_input: 'nothing to work with',
      no_customers: 'not enough customers nearby', building: 'still under construction',
    };
    let h = '<div class="panel-title">\u{1F31E} While you were away</div>' +
      '<div class="panel-sub">' + a.hours + ' hours of city time' +
      (a.cappedFrom ? ' — capped from ' + a.cappedFrom + 'h at your ' + a.capHours +
        'h offline limit' : '') + '.</div>';

    h += '<div class="away-hero"><div class="away-money">' +
      (a.money >= 0 ? '+' : '−') + Util.fmtMoney(Math.abs(a.money)) + '</div>' +
      '<div class="away-rate">' + (a.perHour >= 0 ? '+' : '−') + Util.fmtMoney(Math.abs(a.perHour)) +
      ' per hour away</div></div>';

    if (a.cappedFrom && subTier(s).key === 'free') {
      h += '<div class="panel-sub gold-dim">Citizen raises the offline limit to ' +
        SUB_TIERS.citizen.offlineH + 'h, so nothing is left on the table overnight.</div>';
    }

    const rows = [];
    if (a.popAfter !== a.popBefore) {
      const d = a.popAfter - a.popBefore;
      rows.push(['Residents', (d > 0 ? '+' + d + ' arrived' : d + ' left'),
                 d > 0 ? 'good' : 'bad']);
    }
    if (a.flourMade) rows.push(['Flour milled', Util.fmtNum(a.flourMade), '']);
    if (a.flourEaten) rows.push(['…eaten by your people', Util.fmtNum(a.flourEaten), 'gold-dim']);
    if (a.rent > 0.0000005) rows.push(['Real rent accrued', '$' + a.rent.toFixed(6), 'gold']);
    if (rows.length) {
      h += '<table class="tally">' + rows.map(([l, v, c]) =>
        '<tr><td>' + l + '</td><td class="' + c + '">' + v + '</td></tr>').join('') + '</table>';
    }

    if (a.goods.length) {
      h += '<div class="panel-title2">In store now</div><table class="tally">' +
        '<tr><th>Good</th><th>Change</th><th>Stored</th></tr>' +
        a.goods.map(g => '<tr><td>' + g.kind.charAt(0).toUpperCase() + g.kind.slice(1) + '</td>' +
          '<td class="' + (g.delta > 0 ? 'good' : g.delta < 0 ? 'bad' : 'gold-dim') + '">' +
          (g.delta > 0 ? '+' : '') + Util.fmtNum(g.delta) + '</td>' +
          '<td class="' + (g.inStore >= g.cap - 0.01 ? 'warn' : '') + '">' +
          Util.fmtNum(g.inStore) + ' / ' + g.cap + '</td></tr>').join('') + '</table>';
    }

    if (a.stalls.length) {
      h += '<div class="panel-title2 warn">Stalled while you were gone</div><table class="tally">' +
        a.stalls.map(x => '<tr><td>' + (x.n > 1 ? x.n + '× ' : '') + x.name + '</td>' +
          '<td class="bad">' + (STATUS[x.status] || x.status) + '</td></tr>').join('') + '</table>' +
        '<div class="panel-sub">Anything on that list earned nothing the whole time, and paid upkeep anyway.</div>';
    } else {
      h += '<div class="panel-title2 good">Nothing stalled</div>' +
        '<div class="panel-sub">Every building ran the whole time.</div>';
    }

    if (a.hunger >= TUNE.HUNGER_WARN) {
      h += '<div class="panel-sub bad">Your city is going hungry. Add farms and mills before you add anything else.</div>';
    }
    h += '<div class="panel-sub gold-dim">Your city always works while you are gone. Once the craft chains ' +
      'are running, an overnight is worth more than an evening of clicking.</div>';
    return h;
  },

  showAway(a) {
    UI._lastAway = a;
    UI.togglePanel('away-panel', () => UI.awayHTML(a));
  },

  togglePanel(id, htmlFn) {
    let p = document.getElementById(id);
    if (p) { p.remove(); return; }
    for (const other of document.querySelectorAll('.panel')) other.remove();
    p = document.createElement('div');
    p.className = 'panel'; p.id = id;
    p.innerHTML = htmlFn() + '<button class="panel-close">✕</button>';
    document.body.appendChild(p);
    p.querySelector('.panel-close').onclick = () => p.remove();
    UI.wireEraPanel(p);
  },

  tallyHTML() {
    const s = G.s, C = G.cache;
    const GOODS = [
      ['grain', 'Grain'], ['flour', 'Flour'], ['clay', 'Clay'], ['pottery', 'Pottery'],
      ['wool', 'Wool'], ['cloth', 'Cloth'], ['beer', 'Beer'], ['stone', 'Stone'], ['blocks', 'Blocks'],
    ];
    let h = '<div class="panel-title">\u{1F4DC} The Scribe\'s Tally</div>' +
      '<div class="panel-sub">Rates are per minute, averaged over the last ~20 seconds.</div>';

    h += '<table class="tally"><tr><th>Good</th><th>Made</th><th>Used</th><th>Net</th>' +
         '<th>Stored</th><th>Exported</th></tr>';
    let anyRow = false;
    for (const [k, label] of GOODS) {
      const r = C.tally[k];
      const stored = s.stock[k] || 0;

      if ((!r || (r.made < 0.005 && r.used < 0.005)) && stored < 0.5) continue;
      anyRow = true;
      const made = r ? r.made : 0, used = r ? r.used : 0, exp = r ? r.exported : 0;
      const net = made - used;
      const cap = Econ.capOf(s, k);

      const netCell = Math.abs(net) < 0.05
        ? '<span class="gold-dim">balanced</span>'
        : '<span class="' + (net > 0 ? 'good' : 'bad') + '">' + (net > 0 ? '+' : '−') +
          Util.fmtNum(Math.abs(net)) + '</span>';
      h += '<tr><td>' + label + '</td>' +
        '<td>' + Util.fmtNum(made) + '</td>' +
        '<td>' + Util.fmtNum(used) + '</td>' +
        '<td>' + netCell + '</td>' +
        '<td class="' + (stored >= cap - 0.01 ? 'warn' : '') + '">' + Util.fmtNum(stored) + ' / ' + cap + '</td>' +
        '<td class="' + (exp > 0.02 ? 'warn' : 'gold-dim') + '">' + (exp > 0.005 ? Util.fmtNum(exp) : '·') + '</td></tr>';
    }
    if (!anyRow) h += '<tr><td colspan="6" class="gold-dim">Nothing has moved yet.</td></tr>';
    h += '</table>';

    const dumping = GOODS.filter(([k]) => (C.tally[k] || {}).exported > 0.02).map(([, l]) => l);
    if (dumping.length) {
      h += '<div class="panel-sub warn">Storage full: ' + dumping.join(', ') +
        ' is spilling over and being sold abroad at ' + Math.round(TUNE.EXPORT_MULT * 100) +
        '% of list. Build more storage, or the outlet that sells it properly.</div>';
    }

    const ri = Econ.rentInfo(s);

    const $ = v => '$' + (Math.abs(v) < 0.005 ? '0.00' : Math.abs(v).toFixed(2));
    h += '<div class="panel-title2">The money</div><table class="tally">' +
      '<tr><td>Gross income</td><td class="good">+' + $(C.incomeRate) + '/min</td></tr>' +
      '<tr><td>Upkeep</td><td class="bad">−' + $(C.upkeepRate) + '/min</td></tr>' +
      '<tr><td class="gold-dim">…of which carting premium</td><td class="gold-dim">−' +
        $(C.premiumRate) + '/min</td></tr>' +
      '<tr><td><b>Net</b></td><td class="' + (C.net >= 0 ? 'good' : 'bad') + '"><b>' +
        (C.net >= 0 ? '+' : '−') + $(C.net * 60) + '/min</b></td></tr>' +
      '<tr><td>Income ÷ upkeep</td><td class="' +
        (C.upkeepRate > 0 && C.incomeRate / C.upkeepRate >= 1 ? 'good' : 'bad') + '">' +
        (C.upkeepRate > 0.001 ? (C.incomeRate / C.upkeepRate).toFixed(2) + '×' : '—') + '</td></tr>' +
      '</table>';

    h += '<div class="panel-title2">Real rent</div><table class="tally">' +
      '<tr><td>Rent points</td><td>' + ri.rp.toFixed(1) + '</td></tr>' +
      '<tr><td>Earning buildings</td><td>' + ri.working + (ri.monuments ? ' + ' + ri.monuments + ' monument' + (ri.monuments === 1 ? '' : 's') : '') + '</td></tr>' +
      '<tr><td class="' + (ri.idle ? 'warn' : 'gold-dim') + '">Idle, earning nothing</td><td class="' +
        (ri.idle ? 'warn' : 'gold-dim') + '">' + ri.idle + '</td></tr>' +
      '<tr><td>Of this era\'s cap</td><td class="gold">' + Math.round(ri.achievement * 100) + '%</td></tr>' +
      '</table>' +
      '<div class="panel-sub">Buildings carrying a gold mote are the ones earning. Idle ones are not — ' +
      'find them by what is missing on their panel.</div>';
    return h;
  },

  wireEraPanel(p) {
    const adv = p.querySelector('#era-advance-btn');
    if (adv) adv.onclick = () => {
      if (Econ.advanceEra(G.s)) { p.remove(); UI.updateHUD(G.s); }
    };
  },

  eraPanelHTML() {
    const s = G.s;
    const pop = Game.totalResidents(s);
    let html = '<h2>The Era Ladder</h2>';
    if (s.era < MAX_ERA) {
      const n = s.era + 1, r = eraReq(n);
      const rrow = (label, cur, need) => {
        const done = cur >= need;
        return '<div class="insp-row"><span>' + label + '</span><span class="' + (done ? 'good' : '') + '">' +
          (typeof cur === 'number' && cur > 9999 ? Math.round(cur).toLocaleString('en-US') : Math.floor(cur)) + ' / ' + need.toLocaleString('en-US') + ' ' + (done ? '✓' : '') + '</span></div>';
      };
      html += '<div class="panel-sub">Era ' + n + ' — ' + ERAS[n - 1].name + ' requires:</div>';
      html += rrow('Population', pop, r.pop);
      html += rrow('Treasury ($)', Math.max(0, s.money), r.money);
      html += rrow('Total flour milled', s.cum.flour, r.food);
      if (r.stone) html += rrow('Total stone quarried', s.cum.stone, r.stone);
      if (Econ.eraReady(s))
        html += '<button id="era-advance-btn" class="btn-gold" style="width:100%;margin-top:8px">⬆ Advance to ' + ERAS[n - 1].name + '</button>';
    } else {
      html += '<div class="panel-sub gold">The Looking Glass is open. You finished the ladder.</div>';
    }
    html += '<div class="era-list">';
    for (const e of ERAS) {
      const here = e.n === s.era;
      const locked = e.n > s.era;
      html += '<div class="era-item' + (here ? ' here' : '') + (locked ? ' locked' : '') + '">' +
        '<b>' + e.n + ' · ' + e.name + '</b><span>' + e.blurb + '</span></div>';
    }
    html += '</div>';
    return html;
  },

  guideHTML() {
    const s = G.s;
    const g = eraGuide(s.era);
    const a = anchorFor(s.era);
    const era = ERAS[s.era - 1];
    let h = '<h2>Era ' + s.era + ' · ' + era.name + '</h2>';
    h += '<div class="panel-sub">' + g.headline + '</div>';

    h += '<div class="guide-block"><b>Your seat of power: the ' + a.name + '</b><br>' +
      '<span class="guide-dim">' + a.note + '</span></div>';

    h += '<div class="guide-block"><b>What makes this era different</b><br>' + g.mechanic + '</div>';

    h += '<div class="guide-block"><b>The chain to build</b><ol class="guide-list">';
    for (const c of g.chain) h += '<li>' + c + '</li>';
    h += '</ol></div>';

    h += '<div class="guide-block"><b>Do this first</b><ol class="guide-list">';
    for (const f of g.firstSteps) h += '<li>' + f + '</li>';
    h += '</ol></div>';

    h += '<div class="guide-warn"><b>The mistake that will cost you:</b> ' + g.mistake + '</div>';

    h += '<div class="guide-block"><b>The rules that never change</b><ul class="guide-list">' +

      '<li><b>Roads</b> carry people and goods, so only some things need one: ' +
        '<b>houses, markets, granaries, temples and monuments</b> must trace a road back to your ' +
        a.short + '. Farms, mills, workshops, wells, middens and threshing floors do <b>not</b> — ' +
        'paving around them is wasted money and upkeep.</li>' +
      '<li><b>Water.</b> Most buildings need to sit inside a well\'s coverage. Press <b>O</b> to see it.</li>' +
      '<li><b>Workers.</b> Buildings need staff, staff live in houses, houses eat food. Grow all three together.</li>' +
      '<li><b>Customers.</b> Shops only sell to residents within range — keep commerce near housing.</li>' +
      '<li><b>Balance beats sprawl.</b> Upkeep scales with every building; income does not. A tight, working city out-earns a huge broken one.</li>' +
      '<li><b>Red <span class="bad">!</span></b> means a building is idle. Click it to see exactly what it is missing — idle buildings earn you nothing.</li>' +
      '</ul></div>';
    return h;
  },

  helpHTML() {
    return '<h2>How to play <span class="gold-dim" style="font-size:11px;font-weight:400">build ' +
      UI.BUILD + '</span></h2>' +
      '<div class="panel-sub">Build a civilization across 14 eras of the real human timeline.</div>' +
      '<p><b>The food chain:</b> \u{1F33E} Farm → ⚙️ Mill → \u{1F3E0} Houses (residents eat flour and work) → \u{1F3EA} Market sells the surplus.</p>' +
      '<p><b>The stone chain (Era 3+):</b> ⛰️ Quarry (on rock!) → \u{1FAA8} Stonecutter → \u{1F9F1} Stone Yard.</p>' +

      '<p><b>Roads are not universal.</b> Only <b>houses, markets, granaries, temples and monuments</b> ' +
      'need to trace a road back to the \u{1F3DB}️ Town Hall. Farms, mills, workshops, wells, middens and ' +
      'threshing floors run perfectly well with no road at all — and every road tile costs upkeep, so do not ' +
      'pave what does not need paving. Most buildings DO need water coverage and workers. Click the red ' +
      '<b>!</b> on a building to see exactly what it is missing.</p>' +
      '<p><b>The Town Hall</b> earns in-game money AND real rent every second. One Hall upgrade unlocks per era — rent compounds all the way to Era 14, so finishing the ladder is where the real money lives.</p>' +
      '<p><b>Advancing:</b> meet an era’s requirements and you’ll be asked to advance. Not ready? The era chip (top left) glows — click it whenever you choose. Cities transform between eras; they never reset.</p>' +
      '<p><b>Adjacency:</b> Farm↔Mill +25%, Quarry↔Stonecutter +25%, Park/Temple boost housing, industry hurts it. Fertile soil (dark green) boosts farms.</p>' +
      '<p><b>The world is yours to shape:</b> newly bought land keeps its wild trees — clear them with ⛏️ Demolish ($' + TUNE.CLEAR_TREE + ' each) before building. The <b>Terraform</b> tab paints grass, fertile soil, water, rock, mountains and trees so you can design the land itself.</p>' +
      '<p><b>Camera — mouse only:</b> left-drag grabs the ground and pans · right-drag looks left, right and up/down · scroll wheel zooms toward your cursor · click any building to focus on it · double-click the ground to center there. (<b>WASD</b> and <b>Q/E</b> also work.)</p>' +
      '<p><b>You start unable to read.</b> A new city keeps no records, so it has no production rates, no soil readings and no dashboard — only what you can see: fields paling as they salt, a crowd or an empty street, the grain in the granary. Build a \u{1F4DC} <b>Scribe’s House</b> and every number in the game appears, along with the <b>Tally</b>. Writing was invented to count grain; here you have to invent it too.</p>' +
      '<p><b>Keys:</b> <b>Esc</b> select · <b>Space</b> pause · <b>1/2/3</b> speed · <b>O</b> coverage · <b>T</b> the Tally · <b>H</b> this guide. Autosaves every 10 seconds.</p>';
  },

  toast(msg, ms) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    UI.els.toasts.appendChild(t);
    while (UI.els.toasts.children.length > 4) UI.els.toasts.firstChild.remove();
    setTimeout(() => { t.classList.add('fade'); setTimeout(() => t.remove(), 600); }, ms || 6000);
  },

  firstToast(key, msg) {
    if (!G.s.firsts[key]) { G.s.firsts[key] = 1; UI.toast(msg, 9000); }
  },
};
