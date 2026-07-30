'use strict';

const UI = {
  els: {},
  activeTab: 'infra',

  init() {
    for (const id of ['money', 'net', 'rent', 'rent-rate', 'pop', 'workers', 'grain', 'flour', 'stone', 'blocks',
                      'water', 'season', 'fuel', 'cp', 'builders'])
      UI.els[id] = document.getElementById('hud-' + id);
    UI.els.era = document.getElementById('era-chip');
    UI.els.eraBar = document.getElementById('era-bar');
    UI.els.palette = document.getElementById('palette');
    UI.els.inspector = document.getElementById('inspector');
    UI.els.toasts = document.getElementById('toasts');
    UI.els.stoneChip = document.getElementById('chip-stone');
    UI.els.blocksChip = document.getElementById('chip-blocks');
    UI.els.waterChip = document.getElementById('chip-water');
    UI.els.seasonChip = document.getElementById('chip-season');
    UI.els.fuelChip = document.getElementById('chip-fuel');

    UI.buildPalette();

    if (UI.els.inspector) {
      UI.els.inspector.addEventListener('pointerenter', () => { UI._inspHover = true; });
      UI.els.inspector.addEventListener('pointerleave', () => { UI._inspHover = false; });
    }

    const on = (id, fn) => { const el = document.getElementById(id); if (el) el.onclick = fn; return el; };
    if (UI.els.era) UI.els.era.onclick = () => UI.togglePanel('era-panel', UI.eraPanelHTML);
    on('btn-guide', () => UI.togglePanel('guide-panel', UI.guideHTML));
    on('btn-help', () => UI.togglePanel('help-panel', UI.helpHTML));
    on('btn-overlay', UI.toggleOverlays);
    UI.els.tallyBtn = on('btn-tally', () => UI.togglePanel('tally-panel', UI.tallyHTML));
    on('btn-reset', UI.promptReset);

    on('btn-save', UI.saveNow);
    on('btn-chron', () => UI.togglePanel('chron-panel', UI.chronicleHTML));

    const snd = on('btn-sound', () => {
      if (!window.Sfx) return;
      Sfx.setMuted(!Sfx.muted);
      snd.textContent = Sfx.muted ? '\u{1F507}' : '\u{1F50A}';
    });
    if (snd && window.Sfx) snd.textContent = Sfx.muted ? '\u{1F507}' : '\u{1F50A}';

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
      monument: 'Monuments', beauty: 'Beautify',
    };
    const order = ['infra', 'food', 'industry', 'housing', 'commerce', 'civic', 'monument', 'beauty', 'knowledge', 'logistics', 'luxury', 'military'];
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

        const lock = terraLocked(t.kind, G.s.era);
        const cost = terraCost(t.kind, G.s.era);
        const btn = document.createElement('button');
        btn.className = 'pal-btn';
        btn.dataset.terra = t.kind;
        if (lock) {
          btn.disabled = true;
          btn.classList.add('locked');
          btn.title = 'Not in this age: ' + lock + '.';
        } else {
          btn.title = 'Paint ' + t.name.toLowerCase() + ' — $' + cost + ' per tile. Drag to sculpt. Only on owned, empty land.';
        }
        btn.innerHTML = '<span class="pal-ico">' + t.icon + '</span>' +
          '<span class="pal-name">' + t.name + '</span>' +
          '<span class="pal-cost">' + (lock ? '\u{1F512}' : '$' + cost) + '</span>';
        btn.onclick = () => { if (!lock) Input.setTool('terra', t.kind); };
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

      if (era !== G.s.era && !d.universal) {

        if (!(era > G.s.era && UI.showLocked)) continue;
      }
      const locked = era > G.s.era;
      if (locked && !UI.showLocked) continue;
      if (UI.search && !(d.name + ' ' + (d.desc || '')).toLowerCase().includes(UI.search)) continue;

      const mon = d.monument ? monumentBuild(type, era) : null;

      if (type === 'road') {
        const rd = roadFor(G.s.era);
        items.push({ type, d, era: G.s.era, locked: false, mon,
                     nameOverride: 'Road',
                     labelOverride: 'Road <span class="gold-dim">\u{00B7} ' +
                       UI.esc(rd.flavour) + '</span>',
                     descOverride: rd.desc });
        continue;
      }
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
    for (const { type, d, era, locked, mon, nameOverride, labelOverride, descOverride } of items) {
      const shownName = nameOverride || d.name;
      const shownLabel = labelOverride || UI.esc(shownName);
      const shownDesc = descOverride || d.desc;
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
          : (shownDesc || '') + (d.upkeep ? '  (upkeep $' + (d.upkeep * TUNE.TEMPO).toFixed(2) + '/min)' : '');
      const cost = locked ? '\u{1F512} E' + era : '$' + d.cost + (mon ? '+' : '');
      btn.innerHTML = '<span class="pal-ico">' + (d.icon || '─') + '</span>' +
        '<span class="pal-name">' + shownLabel + '</span>' +
        '<span class="pal-cost">' + cost + '</span>';
      btn.onclick = () => {

        const devFree = window.Dev && Dev.flags.freeBuild;
        if (locked && !devFree) { UI.toast('\u{1F512} ' + shownName + ' unlocks in Era ' + era + ' — ' + ERAS[era - 1].name + '.'); return; }
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

  esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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

  saveNow() {
    const ok = Game.save();
    if (!ok) {
      UI.toast('Could not save - this browser is blocking storage. Private windows often do.', 12000);
      return;
    }
    const s = G.s;
    if (window.Sfx) Sfx.play('save');
    const t = new Date();
    const hh = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');
    UI.toast('Saved at ' + hh + ' - ' + (s.cityName ? s.cityName + ': ' : '') + s.buildings.length +
      ' buildings, ' + Game.totalResidents(s) + ' residents, ' + Util.fmtMoney(s.money) + '.', 6000);
  },

  reflectSpeed() {

    const el = document.getElementById('spd-pause');
    if (!el) return;
    el.classList.toggle('active', !!Main.paused);
    el.textContent = Main.paused ? '▶' : '❚❚';
    el.title = (Main.paused ? 'Resume' : 'Pause') + ' (Space)';
  },

  toggleOverlays() {
    const btn = document.getElementById('btn-overlay');
    if (!Rend.showWater && !Rend.showSoil) {
      Rend.showWater = true; Rend.showPower = true; Rend.showSoil = false;
      if (btn) { btn.classList.add('active'); btn.textContent = 'Coverage'; }
      UI.firstToast('overlaycov', 'Coverage overlay: blue = watered ground. Press O again for the SALT map.');
    } else if (Rend.showWater) {
      Rend.showWater = false; Rend.showPower = false; Rend.showSoil = true;
      if (btn) { btn.classList.add('active'); btn.textContent = 'Salt map'; }
      UI.firstToast('overlaysalt', 'Salt map: the whiter a tile, the more the salt has taken it. Fields fade as they crop; fallow, middens, shadufs and water bring them back.');
    } else {
      Rend.showWater = false; Rend.showPower = false; Rend.showSoil = false;
      if (btn) { btn.classList.remove('active'); btn.textContent = 'Coverage'; }
    }
    Rend.rebakeAll(G.s);
    Rend._overlayDirty = true;
  },

  themeFor(era) {
    if (era <= 4) return 'anunnaki';
    if (era <= 9) return 'egypt';
    if (era <= 13) return 'classical';
    if (era <= 14) return 'jungle';
    if (era <= 27) return 'medieval';
    if (era <= 29) return 'classical';
    if (era <= 32) return 'industrial';
    if (era <= 34) return 'modern';
    return 'cosmic';
  },

  MIGRATE_HINT: {
    ok: 'Settlers are arriving.',
    nohouse: 'Nobody can move in — you have no housing yet.',
    full: 'Every house is full. Build more housing to keep growing.',
    blocked: 'Your housing has no road access or no water, so nobody will move in.',
    hungry: 'The city is hungry, so nobody new is arriving. Residents will hold on for up to ' +
            TUNE.STARVE_MINUTES + ' minutes — build a Farm and a Mill before then.',
    cold: 'The camp is freezing, so nobody new is arriving. Feed the fires — cut wood, burn bone, ' +
          'stop selling charcoal — and cover every home with a hearth circle.',
  },

  BUILD: '2026-07-28.6-depthwave',

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

      UI.els.net.title = 'Income $' + (C.incomeRate || 0).toFixed(2) + '/min − upkeep $' +
        (C.upkeepRate || 0).toFixed(2) + '/min' +
        ((C.exportRate || 0) > 0.01 ? ' · includes sold-abroad +$' + C.exportRate.toFixed(2) : '') +
        ((C.monSpendRate || 0) > 0.01 ? ' · monument deliveries −$' + C.monSpendRate.toFixed(2) : '') +
        ((C.duesRate || 0) > 0.01 ? ' · temple dues +$' + C.duesRate.toFixed(2) : '') +
        ' — press T for the full Tally';

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

    const ri = Econ.rentInfo(s);
    UI.els.rent.innerHTML = '<span class="rent-dim">Standing </span>' + ri.section +
      '<span class="rent-dim"> / ' + ri.sections + '</span>';
    UI.els.rent.classList.remove('locked-rent');
    const rateEl = UI.els['rent-rate'];
    if (rateEl) {
      if (ri.section >= ri.sections) {
        rateEl.style.display = '';
        rateEl.textContent = 'this age is fully built';
      } else {
        rateEl.style.display = '';
        rateEl.textContent = '+' + Math.ceil(ri.toNext) + ' to ' + (ri.section + 1);
      }
    }

    const rentChip = UI.els.rent.parentElement;
    if (rentChip) {
      rentChip.title = 'City standing — section ' + ri.section + ' of ' + ri.sections +
        ' for this age. ' + Math.round(ri.rp) + ' points from ' + ri.working +
        ' working buildings and ' + ri.monuments + ' monument' +
        (ri.monuments === 1 ? '' : 's') +
        (ri.idle ? ', with ' + ri.idle + ' idle and earning nothing' : '') +
        '. Click the Town Hall for how it is earned.';
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

    const wchip = UI.els.workers.parentElement;
    if (wchip && !wchip._wired) {
      wchip._wired = true;
      wchip.style.cursor = 'pointer';
      wchip.title = 'Click for the staffing list — buildings staff in placement order';
      wchip.onclick = () => UI.togglePanel('workers-panel', UI.workersHTML);
    }

    const ice = Econ.hearthActive(s);
    const RAW = ice ? 'game' : 'grain', COOKED = ice ? 'pemmican' : 'flour';
    const gIco = UI.els.grain.parentElement && UI.els.grain.parentElement.querySelector('.res-ico');
    const fIco = UI.els.flour.parentElement && UI.els.flour.parentElement.querySelector('.res-ico');
    if (gIco) gIco.textContent = ice ? '\u{1F98C}' : '\u{1F33E}';
    if (fIco) fIco.textContent = ice ? '\u{1F356}' : '\u{1F35E}';
    UI.els.grain.textContent = Util.fmtNum(s.stock[RAW] || 0) + ' / ' + Econ.capOf(s, RAW);
    UI.els.flour.textContent = Util.fmtNum(s.stock[COOKED] || 0) + ' / ' + Econ.capOf(s, COOKED);

    if (lit) {
      const made = (C.tally[COOKED] && C.tally[COOKED].made) || 0;
      const demandMin = Game.totalResidents(s) * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO;
      const fchip = UI.els.flour.parentElement;
      if (fchip) {
        const bal = made - demandMin;
        fchip.title = (ice ? 'Pemmican: dried +' : 'Flour: milled +') + Util.fmtNum(made) +
          '/min · eaten −' + Util.fmtNum(demandMin) +
          '/min → ' + (bal >= 0 ? 'surplus +' : 'SHORT −') + Util.fmtNum(Math.abs(bal)) + '/min' +
          (bal < 0 ? (ice
            ? '. Every chain adds mouths and no meat — add Reindeer Drives and a Drying Rack, or fish the ice.'
            : '. Each craft chain adds ~7 mouths and no flour — add farms and a mill, or food from dates and fish.') : '');
        fchip.classList.toggle('bad', bal < -0.05 && demandMin > 0);
      }
      const gchip = UI.els.grain.parentElement;
      if (gchip && ice) {
        const made2 = (C.tally.game && C.tally.game.made) || 0;
        gchip.title = 'Game: +' + Util.fmtNum(made2) + '/min from the drives and the hunts — ' +
          'the Drying Rack and the Hide Frames both draw on it, and only one of them feeds anyone';
      } else if (gchip && C.grainDrawAvg) {
        const gd = C.grainDrawAvg;
        const made2 = (C.tally.grain && C.tally.grain.made) || 0;
        gchip.title = 'Grain: +' + Util.fmtNum(made2) + '/min from fields · mills −' + Util.fmtNum(gd.mill) +
          ' · breweries −' + Util.fmtNum(gd.brewery) +
          (gd.oxen > 0.01 ? ' · oxen −' + Util.fmtNum(gd.oxen) : '') +
          (gd.dole > 0.01 ? ' · the dole −' + Util.fmtNum(gd.dole) : '') +
          ' — mills always draw before breweries';
      }
    }

    const pchip = UI.els.pop.parentElement;
    if (pchip) {
      if (!UI._hungerBar) {
        UI._hungerBar = document.createElement('div');
        UI._hungerBar.style.cssText = 'position:absolute;left:2px;right:2px;bottom:1px;height:3px;' +
          'border-radius:2px;background:linear-gradient(90deg,#d9a441,#c94f3f);transform-origin:left;display:none;';
        pchip.style.position = 'relative';
        pchip.appendChild(UI._hungerBar);
      }
      const h = s.hunger || 0;
      UI._hungerBar.style.display = h > 0.01 ? 'block' : 'none';
      UI._hungerBar.style.transform = 'scaleX(' + Math.min(1, h).toFixed(3) + ')';
      if (h > 0.01) pchip.title = (UI.MIGRATE_HINT[C.migrateWhy] || '') +
        ' If the bar fills, residents start leaving (~' + Math.round(TUNE.STARVE_MINUTES * (1 - h)) +
        ' min at this rate). It recovers fast once everyone is fed — faster with a real larder banked.';
    }

    const why = C.migrateWhy;
    if (why && why !== 'ok' && Game.totalResidents(s) + C.openHousing > 0) {
      UI._migBad = (UI._migBad || 0) + 1;
      if (UI._migBad > 30 && UI._migDismissed !== why) {
        if (!UI._migStrip) {
          const el = document.createElement('div');
          el.id = 'migrate-strip';
          el.style.cssText = 'position:fixed;top:64px;left:50%;transform:translateX(-50%);z-index:40;' +
            'background:rgba(30,24,16,0.92);border:1px solid #c9a86a;border-radius:8px;padding:8px 12px;' +
            'color:#e8dcc0;font:13px/1.4 system-ui;display:flex;gap:10px;align-items:center;max-width:560px;';
          el.innerHTML = '<span id="mig-msg"></span>' +
            '<button id="mig-show" style="background:#c9a86a;border:0;border-radius:5px;padding:3px 10px;cursor:pointer">Show me</button>' +
            '<button id="mig-x" style="background:none;border:0;color:#e8dcc0;cursor:pointer;font-size:14px">✕</button>';
          document.body.appendChild(el);
          UI._migStrip = el;
          el.querySelector('#mig-x').onclick = () => { UI._migDismissed = C.migrateWhy; el.style.display = 'none'; };
          el.querySelector('#mig-show').onclick = () => {
            const tgt = G.s.buildings.find(b => b.block && DEF(b.type).cap) ||
                        G.s.buildings.find(b => b.type === 'townhall');
            if (tgt && window.Rend) { Rend.focusOn(tgt); Input.selected = tgt; UI.showInspector(tgt); }
          };
        }
        UI._migStrip.style.display = 'flex';
        UI._migStrip.querySelector('#mig-msg').textContent = '\u{1F6B6} ' + (UI.MIGRATE_HINT[why] || '');
      }
    } else {
      UI._migBad = 0;
      UI._migDismissed = null;
      if (UI._migStrip) UI._migStrip.style.display = 'none';
    }

    const showStone = s.era >= 5;
    UI.els.stoneChip.classList.toggle('hidden', !showStone);
    UI.els.blocksChip.classList.toggle('hidden', !showStone);
    UI.els.stoneChip.style.display = showStone ? '' : 'none';
    UI.els.blocksChip.style.display = showStone ? '' : 'none';
    if (showStone) {
      UI.els.stone.textContent = Util.fmtNum(s.stock.stone) + ' / ' + Econ.capOf(s, 'stone');
      UI.els.blocks.textContent = Util.fmtNum(s.stock.blocks) + ' / ' + Econ.capOf(s, 'blocks');
    }

    const showTank = Econ.tankActive(s);
    if (UI.els.waterChip) {
      UI.els.waterChip.classList.toggle('hidden', !showTank);
      UI.els.waterChip.style.display = showTank ? '' : 'none';
    }
    if (UI.els.seasonChip) {
      UI.els.seasonChip.classList.toggle('hidden', !showTank);
      UI.els.seasonChip.style.display = showTank ? '' : 'none';
    }
    if (showTank && UI.els.water) {
      const cap = Econ.capOf(s, 'water');
      const f = Econ.waterForecast(s);
      const have = s.stock.water || 0;
      let txt = Util.fmtNum(have) + ' / ' + cap;
      if (have <= 0) txt += ' · DARK';
      else if (f.secs !== Infinity) txt += ' · ' + Math.round(f.secs) + 's';
      else txt += ' · +' + f.net.toFixed(1) + '/min';
      UI.els.water.textContent = txt;

      const phase = G.cache.seasonPhase;
      const short = have <= 0 ||
        (f.secs !== Infinity && phase === 'dry' && f.secs < (G.cache.seasonLeft || 0));
      UI.els.waterChip.classList.toggle('bad', have <= 0);
      UI.els.waterChip.classList.toggle('warn', !(have <= 0) && short);

      if (UI.els.season) {
        const lbl = Econ.SEASON_LABEL[phase] || '—';
        UI.els.season.textContent = lbl + ' · ' + Math.round(G.cache.seasonLeft || 0) + 's' +
          (s.policyRation ? ' · RATIONED' : '');
        UI.els.seasonChip.classList.toggle('warn', phase === 'dry');
      }
    }

    const showFire = Econ.hearthActive(s);
    if (UI.els.fuelChip) {
      UI.els.fuelChip.classList.toggle('hidden', !showFire);
      UI.els.fuelChip.style.display = showFire ? '' : 'none';
    }
    if (showFire && UI.els.fuel) {
      const f = Econ.warmForecast(s);
      let txt = Util.fmtNum(f.have);
      if (G.cache.dark) txt += ' · DARK';
      else if (f.secs !== Infinity && f.secs < 3600) txt += ' · ' + Math.round(f.secs) + 's';
      UI.els.fuel.textContent = txt;
      UI.els.fuelChip.classList.toggle('bad', !!G.cache.dark || (s.chill || 0) >= TUNE.COLD.warnAt);
      UI.els.fuelChip.classList.toggle('warn', !G.cache.dark && f.secs < 120);
      UI.els.fuelChip.title = 'Fuel in delivered warmth (wood ×1, bone ×1, charcoal ×3): ' +
        Util.fmtNum(f.have) + '. The fires draw ' + (f.demand * TUNE.TEMPO).toFixed(1) +
        '/min — ' + (f.secs === Infinity ? 'no draw yet' : Math.round(f.secs) + 's of fire left') +
        ((s.chill || 0) > 0.02 ? '. CHILL at ' + Math.round(s.chill * 100) + '% — people freeze out at 100%.' : '.');
    }

    const era = ERAS[s.era - 1];
    const ready = Econ.eraReady(s);
    UI.els.era.classList.toggle('ready', ready);

    UI.els.era.querySelector('.era-name').textContent =
      ready ? '⬆ THE AGE CAN TURN — click' : 'Era ' + s.era + ' · ' + era.name;

    if (!Econ.nextEra(s)) UI.els.eraBar.style.width = '100%';
    else {
      const r = eraReq(s.era + 1);

      const base = s.eraBase || {};
      const site = s.buildings.find(b => DEF(b.type) && DEF(b.type).monument && (DEF(b.type).era || 1) === s.era);
      const monFrac = Econ.monumentDone(s, s.era) ? 1
        : (site ? (Econ.monumentProgress(s, site) || {}).frac || 0 : 0);
      const f = Math.min(
        Game.totalResidents(s) / r.pop,
        Math.max(0, s.money) / r.money,
        Math.max(0, s.cum.flour - (base.flour || 0)) / r.food,
        r.stone ? Math.max(0, s.cum.stone - (base.stone || 0)) / r.stone : 1,
        monFrac
      );
      UI.els.eraBar.style.width = Math.round(Math.min(1, f) * 100) + '%';
    }

    if (s.pendingGift && !document.querySelector('.panel') && !document.querySelector('.era-ceremony')) {
      const now = performance.now();
      if (!UI._giftAt || now - UI._giftAt > 8000) {
        UI._giftAt = now;
        UI.anunnakiDepart(s);
      }
    }

    if (Input.selected && !UI._inspHover) UI.showInspector(Input.selected);
  },

  promptReset() {

    const s = G.s;
    UI.togglePanel('reset-panel', () =>
      '<h2>\u{1F5FA}️ Start a New World</h2>' +
      '<div class="panel-sub">This cannot be undone.</div>' +
      '<p><b>' + (s.cityName ? s.cityName : 'Your current city') + ' will be permanently deleted</b> — Era ' +
      s.era + ', ' + s.buildings.length + ' buildings, ' + Game.totalResidents(s) + ' residents, ' +
      Util.fmtMoney(s.money) + ' in the treasury, and the saved game behind it.</p>' +
      '<p>You will start again on fresh ground with your Town Hall and ' + Util.fmtMoney(TUNE.START_MONEY) + '.</p>' +
      '<div class="adv-btns">' +
      '<button id="reset-yes" class="btn-gold" disabled>Delete my city and start over</button>' +
      '<button id="reset-no" class="btn-plain">Keep playing</button></div>'
    );

    const yes = document.getElementById('reset-yes');
    if (!yes) return;
    setTimeout(() => { if (document.getElementById('reset-yes')) yes.disabled = false; }, 400);
    const close = () => { const p = document.getElementById('reset-panel'); if (p) p.remove(); };
    yes.onclick = () => {
      close();
      Game.reset(); Input.selected = null; UI.hideInspector(); UI.refreshPalette();
      if (window.Rend && Rend.onWorldChange) Rend.onWorldChange();
      UI.updateHUD(G.s);

      UI.toast('A new world, and ' + Util.fmtMoney(TUNE.START_MONEY) + ' to start. Lay a road from your Hall, ' +
        'then a Well, THREE Farms, a Mill touching a Farm, and a MARKET — the Market is your only income. ' +
        'Then three Houses. Press G for the guide.', 16000);
      setTimeout(() => UI.promptNaming(), 900);
    };
    document.getElementById('reset-no').onclick = close;
  },

  promptAdvance(next) {
    const era = ERAS[next - 1];

    const site = G.s.buildings.find(b => DEF(b.type).monument && !b.complete);
    let advisory = '';
    if (site) {
      const p = Econ.monumentProgress(G.s, site);
      advisory = '<p class="warn">⚠️ The ' + DEF(site.type).name + ' is only ' +
        Math.round((p ? p.frac : 0) * 100) + '% built — it earns nothing until finished, and its deliveries ' +
        'go on drawing from the same stores in the new era. Consider topping it out first.</p>';
    }
    UI.togglePanel('advance-panel', () =>
      '<h2>\u{1F30D} Civilization Awaits</h2>' +
      '<div class="panel-sub">All requirements met.</div>' +
      '<p><b>Are you ready to advance civilization to its next step?</b></p>' +
      '<p class="era-next"><b>Era ' + next + ' · ' + era.name + '</b><br>' + era.blurb + '</p>' +
      advisory +
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

      no_water: [G.cache.brownout ? 'BROWNED OUT — the tank is empty' : 'NO WATER coverage', 'bad'],
      no_power: ['NO POWER', 'bad'],

      no_warmth: [G.cache.dark ? 'THE FIRES ARE DARK — no fuel' : 'OUTSIDE every hearth circle', 'bad'],
      stand_spent: ['NO TIMBER IN REACH — every stand within 6 tiles is ash. Move it', 'warn'],
      no_staff: ['NO WORKERS available', 'bad'], understaffed: ['UNDERSTAFFED', 'warn'],
      no_input: ['NO INPUT in stock', 'bad'], no_customers: ['NOT ENOUGH CUSTOMERS', 'bad'],
      hungry: ['RESIDENTS HUNGRY', 'bad'],

      resting: ['RESTING — ground recovering', 'warn'],

      flooded: ['UNDER THE FLOOD — renewing', 'warn'],

      dry_season: ['THE DRY — collecting nothing', 'warn'],
      halted: ['HALTED — deliveries paused', 'warn'],
      building: ['UNDER CONSTRUCTION', 'warn'],
    };
    return M[b.status] || ['—', ''];
  },

  rankAdvice(s, b, d) {
    const tiles = d.w * d.h, workers = d.workers || 0;
    const staffNow = d.workers ? (b.staff || 0) / d.workers : 1;
    const beer = 1 + (G.cache.beerBonus || 0);
    const costs = tiles + ' more tile' + (tiles === 1 ? '' : 's') +
      (workers ? ' and ' + workers + ' more mouth' + (workers === 1 ? '' : 's') : ' and no workers');
    let head = '', body = '';

    if (d.sells || d.sellsRaw) {
      const maxSell = d.sellRate * staffNow * (b.scribed ? 1 + TUNE.SCRIBE.bonus : 1) *
        rankOutMult(b) * Econ.M * beer;
      const atCap = maxSell > 1e-6 && (b.rate || 0) >= maxSell * 0.95;
      head = atCap ? 'At capacity.' : 'Starved for goods.';
      body = atCap
        ? 'A SECOND ' + d.name + ' would roughly double these sales — for ' + costs +
          '. A rank costs neither, but only raises the price.'
        : 'It is not selling all it could, so a second ' + d.name + ' would add nothing at all. ' +
          'Feed the chain — or rank THIS one, which earns more on every unit without needing one more.';
    } else if (d.procIn) {
      const slow = b.bureauSlow ? (1 - TUNE.BUREAU.slow) : 1;
      const want = d.procRate * staffNow * (1 + (b.adjBoost || 0)) * rankOutMult(b) * slow * Econ.M * beer;
      const made = (b.prodRate !== undefined ? b.prodRate : b.rate) || 0;
      const used = made / (d.procRatio || 1);
      const atCap = want > 1e-6 && used >= want * 0.95;
      head = atCap ? 'At capacity.' : 'Starved of ' + d.procIn + '.';
      body = atCap
        ? 'It is working through everything it can reach. A SECOND ' + d.name +
          ' would double that — for ' + costs + '. A rank costs neither.'
        : 'There is not enough ' + d.procIn + ' to keep it busy, so a second ' + d.name +
          ' would simply idle beside it. Grow the ' + d.procIn + ' supply first — a rank raises ' +
          'this one\'s ceiling, not its input.';
    } else if (d.out) {
      const short = workers && (b.staff || 0) < workers;
      if (b.resting) {
        head = 'Resting.';
        body = 'Nothing is produced while the ground recovers — neither a rank nor a second one changes that.';
      } else if (short) {
        head = 'Short of workers.';
        body = 'It cannot even staff itself, so more of them will not help. Build housing — or rank this ' +
          'one, which raises output using the workers it already has.';
      } else {
        head = 'Working at full staff.';
        body = 'A second ' + d.name + ' produces twice as much for ' + costs +
          '. A rank gives less, but costs no ground and no mouths — and once your land is a few rings ' +
          'out, that makes it the cheaper output.';
      }
    } else if (d.threshing) {
      body = 'It boosts every Farm it touches, and being ' + d.w + '×' + d.h +
        ' it can touch four at once. A SECOND floor reaches different farms; a RANK strengthens the ' +
        'bonus on the farms this one already touches.';
    } else if (d.waterRadius || d.soilRadius) {
      const rad = (d.waterRadius || d.soilRadius) + rankRadiusBonus(b);
      body = 'A second one covers new ground somewhere else for $' + d.cost + '; a rank widens THIS one ' +
        'from ' + rad + ' to ' + (rad + RANK.radiusPerRank) + ' tiles. Rank when the gap you need filled ' +
        'is right beside it — build another when it is not.';
    } else {
      body = 'A second ' + d.name + ' costs ' + costs + '; a rank costs neither.';
    }
    return '<div class="insp-row insp-note"><span>' + (head ? '<b>' + head + '</b> ' : '') + body + '</span></div>';
  },

  showInspector(b) {
    const s = G.s;
    const d = DEF(b.type);

    const baseTitle = b.type === 'townhall'
      ? (s.cityName ? UI.esc(s.cityName) + ' — ' + anchorFor(s.era).name : anchorFor(s.era).name)
      : d.name;
    const title = b.name ? UI.esc(b.name) + ' \u{00B7} ' + baseTitle : baseTitle;
    const [st, cls] = UI.statusText(b);
    const lit = UI.literate(s);
    let rows = '';

    const rpNow = Econ.rentContribution(s, b);
    if (rankUpgradable(d)) {
      const r = rankOf(b);

      const rBits = [];
      if (rankOutMult(b) > 1.001) rBits.push('+' + Math.round((rankOutMult(b) - 1) * 100) + '% output');
      if (rankPriceMult(b) > 1.001) rBits.push('+' + Math.round((rankPriceMult(b) - 1) * 100) + '% price');
      rows += '<div class="insp-row"><span>Rank</span><span class="' + (r > 1 ? 'good' : '') + '">' +
        r + ' of ' + RANK.max + (rBits.length ? ' · ' + rBits.join(' · ') : ' (base)') +
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

      if (UI.literate(s)) {
        let worst = null;
        for (const part of p.parts) {
          if (part.have >= part.need) continue;
          const remaining = part.need - part.have;
          let perMin;
          if (part.kind === 'money') perMin = Math.max(0, G.cache.net * 60);
          else {
            const t = G.cache.tally[part.kind];
            perMin = Math.max(0, (t ? t.made - t.used : 0));
          }
          perMin = Math.min(perMin, (MONUMENT_RATE[part.kind] || 6) * TUNE.TEMPO);
          const eta = perMin > 0.01 ? remaining / perMin : Infinity;
          if (!worst || eta > worst.eta) worst = { kind: part.kind, eta };
        }
        if (worst) {
          rows += '<div class="insp-row"><span>Forecast</span><span class="' +
            (worst.eta === Infinity ? 'bad' : 'gold') + '">' +
            (worst.eta === Infinity
              ? 'never at current rates — ' + worst.kind + ' is not accumulating'
              : '~' + Math.max(1, Math.round(worst.eta)) + ' min · bottleneck: ' + worst.kind) +
            '</span></div>';
        }
      }
    }

    if (d.monument && b.complete) {
      rows += row('In-game income', '<span class="good">+$' +
        (d.trickle * TUNE.TEMPO).toFixed(0) + '/min</span>');
      rows += row('City dividend', '<span class="gold">+' + Math.round(TUNE.MONUMENT_BOOST * 100) +
        '% on ALL city income</span>');
      rows += mrow('…worth right now', '<span class="gold">+$' +
        ((G.cache.monBonusRate || 0)).toFixed(2) + '/min</span>');
      rows += row('Rent points', monumentRP(d.era || 1) +
        ' <span class="gold-dim">— the largest single source in this age</span>');
      rows += '<div class="insp-row insp-note"><span>The dividend scales with your economy, so it is ' +
        'worth more the more you build. It pays only while this stands finished and connected.</span></div>';
    }

    if (d.out && d.out.grain) {
      const bon = [];
      if (b.fertile) bon.push('fertile +' + Math.round(b.fertile * TUNE.FERTILE_BONUS * 100) + '%');

      if (b.adjBoost) bon.push('mill/threshing +' + Math.round(b.adjBoost * 100) + '%');
      rows += mrow('Output', UI.perMin(b.rate) + ' grain/min');
      if (bon.length) rows += '<div class="insp-row"><span>Bonuses</span><span class="good">' + bon.join(', ') + '</span></div>';

      const soil = b.soil !== undefined ? b.soil : Grid.soilUnder(b);
      const pct = Math.round(soil * 100);
      const cls = soil > 0.66 ? 'good' : soil > 0.33 ? 'warn' : 'bad';
      rows += mrow('Soil', '<span class="' + cls + '">' + pct + '%' +
        (soil < 0.999 ? ' — yield ' + Math.round((TUNE.SOIL.minYield + (1 - TUNE.SOIL.minYield) * soil) * 100) + '%' : '') +
        '</span>');
      const working = !b.block && b.staff > 0;

      const mid = Grid.covered(G.cache.midden, b);
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
      if (b.adjBoost) rows += '<div class="insp-row"><span>Bonuses</span><span class="good">stonecutter +' + Math.round(b.adjBoost * 100) + '%</span></div>';
    } else if (b.type === 'midden') {
      rows += row('Soil recovery', '×' + TUNE.SOIL.middenBonus + ' within ' + DEF('midden').soilRadius + ' tiles');
      rows += '<div class="insp-row insp-note"><span>Manured ground recovers from salt faster. It does nothing to a field that is still being cropped — rotate your farms.</span></div>';
    } else if (d.out) {

      const kind = Object.keys(d.out)[0];
      rows += mrow('Output', UI.perMin(b.rate) + ' ' + kind + '/min');
      if (b.adjBoost) rows += '<div class="insp-row"><span>Bonuses</span><span class="good">workshop beside it +' + Math.round(b.adjBoost * 100) + '%</span></div>';
      if (d.saltProof) {
        const soil = b.soil !== undefined ? b.soil : Grid.soilUnder(b);
        rows += '<div class="insp-row"><span>Soil</span><span class="good">' + Math.round(soil * 100) +
          '% — palms IGNORE the salt clock' + (soil < 0.3 ? ', and thrive here: +50%' : '') + '</span></div>';
      } else if (d.slowSalt) {
        const soil = b.soil !== undefined ? b.soil : Grid.soilUnder(b);
        rows += mrow('Soil', Math.round(soil * 100) + '% — sesame salts the ground at HALF rate');
      }
      if (kind === 'dates' || kind === 'fish') {
        rows += '<div class="insp-row insp-note"><span>' + (kind === 'dates'
          ? 'Dates are eaten like flour, sack for sack — food with no mill and no salt clock.'
          : 'Fish feed the city at 75% of flour\'s worth — food with no field at all.') + '</span></div>';
      }
    } else if (d.procIn) {

      rows += mrow('Output', UI.perMin(b.prodRate !== undefined ? b.prodRate : b.rate) + ' ' + d.procOut + '/min');
      if (b.adjBoost) rows += '<div class="insp-row"><span>Bonuses</span><span class="good">its ' + d.procIn + ' source beside it +' + Math.round(b.adjBoost * 100) + '%</span></div>';
    } else if (d.cap) {
      const tags = [];
      if (b.nearPark) tags.push('<span class="good">+1 square</span>');
      else if (b.nearShrine) tags.push('<span class="good">+1 shrine</span>');
      if (b.nearTemple) tags.push('<span class="good">+1 temple</span>');
      if (b.nearInd) tags.push('<span class="bad">−1 industry</span>');
      if (b.nearOven) tags.push('<span class="good">−15% flour</span>');
      rows += '<div class="insp-row"><span>Residents</span><span>' + (b.residents || 0) + ' / ' + (b.cap != null ? b.cap : d.cap) + ' ' + tags.join(' ') + '</span></div>';

      const lvl = b.level || 1;
      rows += '<div class="insp-row"><span>Dwelling</span><span class="gold">' +
        houseLevelName(s.era, lvl) + ' <span class="gold-dim">(rung ' + lvl + ' of ' + HOUSE_MAX_LEVEL + ')</span></span></div>';

      let ladder = '';
      for (let i = 1; i <= HOUSE_MAX_LEVEL; i++) {
        const nm = houseLevelName(s.era, i);
        const capAt = Math.max(1, houseCap(d, { level: i }));
        const here = i === lvl;
        ladder += '<span class="' + (here ? 'gold' : i < lvl ? 'good' : 'gold-dim') + '">' +
          (here ? '▶ ' : '') + nm + ' (' + capAt + ')</span>' + (i < HOUSE_MAX_LEVEL ? ' → ' : '');
      }
      rows += '<div class="insp-row insp-note"><span>' + ladder + '<br>' +
        'Rung 2 is EARNED — stand among ' + Econ.NEIGHBOURS_FOR_RUNG2 + '+ neighbouring homes. ' +
        'Every rung after that is BOUGHT below. A Square, Shrine or Temple nearby adds capacity on top.</span></div>';
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
      rows += '<div class="insp-row"><span>Income floor</span><span class="good">+$' +
        (HALLS[s.hallLevel].trickle * TUNE.TEMPO).toFixed(1) + '/min</span></div>';

      if (G.cache.nilePhase) {
        const ph = G.cache.nilePhase;
        const left = Math.max(0, Math.round(G.cache.nileLeft || 0));
        rows += '<div class="insp-row"><span>The year</span><span class="' +
          (ph === 'akhet' ? 'warn' : ph === 'peret' ? 'good' : '') + '">' +
          UI.esc(Econ.NILE_LABEL[ph]) + ' <span class="gold-dim">(' + left + 's left)</span></span></div>';
        rows += '<div class="insp-row insp-note"><span>' +
          (ph === 'akhet' ? 'Fields in reach of the river are under water and growing nothing — and will come out on fresh silt. The granary is what the city eats.'
           : ph === 'peret' ? 'The silt is new: +' + Math.round(TUNE.NILE.peretBonus * 100) + '% grain while it lasts.'
           : 'The ground is drying and the salt clock is running. Fill the granary before the river returns.') +
          '</span></div>';
      }

      if (Econ.hearthActive(s)) {
        const f = Econ.warmForecast(s);
        rows += '<div class="insp-row"><span>The fires</span><span class="' +
          (G.cache.dark ? 'bad' : 'good') + '">' + (G.cache.dark ? 'DARK — no fuel' : 'lit') + '</span></div>';
        rows += '<div class="insp-row"><span>Fuel (warmth)</span><span>' + Util.fmtNum(f.have) +
          ' <span class="gold-dim">(wood ×1 · bone ×1 · charcoal ×3)</span></span></div>';
        rows += '<div class="insp-row"><span>Draw</span><span class="bad">−' +
          (f.demand * TUNE.TEMPO).toFixed(1) + '/min' +
          (f.secs !== Infinity ? ' <span class="gold-dim">(' + Math.round(f.secs) + 's of fire left)</span>' : '') +
          '</span></div>';
        rows += '<div class="insp-row"><span>Chill</span><span class="' +
          ((s.chill || 0) >= TUNE.COLD.warnAt ? 'bad' : (s.chill || 0) >= TUNE.COLD.stopGrowth ? 'warn' : 'good') + '">' +
          Math.round((s.chill || 0) * 100) + '%</span></div>';
        const herds = (s.herds || []).length;
        rows += '<div class="insp-row"><span>On the steppe</span><span>' + herds +
          ' animal' + (herds === 1 ? '' : 's') +
          (s.hunt ? ' <span class="gold-dim">· a hunt is out (' + Math.max(0, s.hunt.left) + 's)</span>' : '') +
          '</span></div>';
        rows += '<div class="insp-row insp-note"><span>' +
          (G.cache.dark
            ? 'Everything inside the hearth circles is stopped. The Cutters, Drives, Weirs and Quarries keep working — feed the fires with what they bring in.'
            : 'The fire eats before everything else. Half of what the Clamp makes is warmth and half is money, and choosing the split every minute is the age.') +
          '</span></div>';
      }

      if (G.cache.seasonPhase) {
        const ph = G.cache.seasonPhase;
        const left = Math.max(0, Math.round(G.cache.seasonLeft || 0));
        const f = Econ.waterForecast(s);
        rows += '<div class="insp-row"><span>The year</span><span class="' +
          (ph === 'dry' ? 'warn' : 'good') + '">' + UI.esc(Econ.SEASON_LABEL[ph]) +
          ' <span class="gold-dim">(' + left + 's left)</span></span></div>';
        rows += '<div class="insp-row"><span>The tank</span><span class="' +
          ((s.stock.water || 0) <= 0 ? 'bad' : '') + '">' + Util.fmtNum(s.stock.water || 0) +
          ' / ' + Econ.capOf(s, 'water') + '</span></div>';
        rows += '<div class="insp-row"><span>Collected</span><span class="good">+' +
          (f.supply * TUNE.TEMPO).toFixed(1) + '/min</span></div>';
        rows += '<div class="insp-row"><span>Drunk</span><span class="bad">−' +
          (f.demand * TUNE.TEMPO).toFixed(1) + '/min' +
          (s.policyRation ? ' <span class="gold-dim">(rationed)</span>' : '') + '</span></div>';
        rows += '<div class="insp-row"><span>' + (f.net >= 0 ? 'Filling' : 'Draining') + '</span><span class="' +
          (f.net >= 0 ? 'good' : 'warn') + '">' + (f.net >= 0 ? '+' : '') +
          (f.net * TUNE.TEMPO).toFixed(1) + '/min' +
          (f.secs !== Infinity ? ' <span class="gold-dim">(' + Math.round(f.secs) + 's of water left)</span>' : '') +
          '</span></div>';
        rows += '<div class="insp-row insp-note"><span>' +
          ((s.stock.water || 0) <= 0
            ? 'The aqueducts are dark. Milpas and Quarries keep working; everything else is stopped. Mothball the industry, ration the reservoirs, and buy capacity before the next dry.'
           : ph === 'dry'
            ? 'Only the cenotes are still collecting. Everything else is a roof, and it is not raining.'
            : 'The courts and reservoirs are collecting. Buy tank now — capacity is worthless in the rains and everything in the dry.') +
          '</span></div>';
      }

      const invN = (s.relics || []).length;
      const standN = s.buildings.filter(b => b.relic).length;
      if (invN || standN) {
        rows += '<div class="insp-row"><span>The dynasty</span><span class="' + (invN ? 'warn' : 'good') + '">' +
          (invN ? invN + ' monument' + (invN === 1 ? '' : 's') + ' waiting to be placed'
                : standN + ' monument' + (standN === 1 ? '' : 's') + ' standing') + '</span></div>';
      }
      const ri = Econ.rentInfo(s);
      rows += '<div class="insp-row"><span>City standing</span><span class="gold">Section ' +
        ri.section + ' of ' + ri.sections + '</span></div>';
      rows += '<div class="insp-row"><span>Standing points</span><span>' + Math.round(ri.rp) +
        ' <span class="gold-dim">(' + ri.monuments + ' monument' + (ri.monuments === 1 ? '' : 's') + ', ' + ri.working + ' working)</span></span></div>';
      if (ri.section < ri.sections) {
        rows += '<div class="insp-row"><span>Next section at</span><span>' + Math.round(ri.nextAt) +
          ' <span class="gold-dim">(' + Math.ceil(ri.toNext) + ' more · ' +
          Math.round(ri.progress * 100) + '% of the way)</span></span></div>';
      } else {
        rows += '<div class="insp-row"><span>Next section</span><span class="good">none — this age is fully built</span></div>';
      }

      if (ri.idle) rows += '<div class="insp-row"><span>Idle buildings</span><span class="bad">' + ri.idle + ' contributing nothing</span></div>';

      const why = G.cache.migrateWhy || 'nohouse';
      const okNow = why === 'ok';
      rows += '<div class="insp-row"><span>Settlers</span><span class="' + (okNow ? 'good' : 'bad') + '">' +
        (okNow ? '+' + ((G.cache.migrateRate || 0) * TUNE.TEMPO).toFixed(1) + '/min · ' + (G.cache.openHousing || 0) + ' beds free'
               : UI.MIGRATE_HINT[why]) + '</span></div>';
    } else if (d.waterRadius) {
      rows += row('Water radius', d.waterRadius + ' tiles');
    } else if (b.type === 'granary') {
      rows += row('Storage', '+' + DEF('granary').storeGrain + ' grain, +' + DEF('granary').storeFlour + ' flour');
    } else if (b.type === 'coal') {
      rows += row('Power radius', DEF('coal').powerRadius + ' tiles');
    } else if (b.type === 'templeGranary') {
      rows += row('Storage', '+' + (d.storeGrain || 0) + ' grain, +' + (d.storeFlour || 0) + ' flour');
      rows += mrow('Head money', '+$' + (G.cache.duesRate || 0).toFixed(2) + '/min from residents within ' +
        TUNE.DUES.radius + ' tiles');
      rows += mrow('The dole', (G.cache.doleRate || 0) > 0.01
        ? '<span class="warn">ISSUING ' + Util.fmtNum(G.cache.doleRate) + ' flour-worth of grain/min</span>'
        : 'closed — opens itself at hunger ≥ ' + Math.round(TUNE.DOLE.hungerAt * 100) + '%');
      rows += row('Reserve policy', (s.granaryPolicy || 'lean') + ' — markets keep ' +
        (TUNE.RESERVE_POLICY[s.granaryPolicy || 'lean']) + ' min of flour off the shelves');
    } else if (d.storeGrain || d.storeFlour) {
      rows += row('Storage', '+' + (d.storeGrain || 0) + ' grain, +' + (d.storeFlour || 0) + ' flour');
    } else if (d.storeCraft) {
      rows += row('Storage', '+' + d.storeCraft + ' to EVERY craft good while staffed');
    } else if (d.soilRadius) {
      rows += row('Soil recovery', '×' + TUNE.SOIL.middenBonus + ' within ' + d.soilRadius + ' tiles');
    } else if (d.amenityRadius) {
      rows += row('Blessing', '+1 housing capacity within ' + d.amenityRadius + ' tiles');
    } else if (b.type === 'weighhouse') {
      rows += row('Price aura', '+' + Math.round(TUNE.WEIGH.bonus * 100) + '% sale price, shops within ' + TUNE.WEIGH.radius + ' tiles');
    } else if (b.type === 'woolbureau') {
      rows += row('Grading', 'cloth shops +' + Math.round(TUNE.BUREAU.priceBonus * 100) + '% price · weavers −' +
        Math.round(TUNE.BUREAU.slow * 100) + '% speed, within ' + TUNE.BUREAU.radius + ' tiles');
    } else if (b.type === 'tablethouse') {
      rows += row('Schooling', 'all rank upgrades cost 15% less while staffed');
    } else if (b.type === 'oxbyre') {
      const fed = G.cache.fedByres && G.cache.fedByres.has(b.id);
      const served = G.s.buildings.filter(x => DEF(x.type).plowed &&
        (x.oxNear || []).indexOf(b.id) >= 0).length;
      rows += row('Plow teams', '+' + Math.round(TUNE.OX.bonus * 100) + '% to every plowed field within ' +
        TUNE.OX.radius + ' tiles');
      rows += row('Fields served', served + (served ? ' — no limit; the fodder is the same either way' : ' — none in range yet'));
      rows += '<div class="insp-row"><span>Fodder</span><span class="' + (fed ? 'good' : 'bad') + '">' +
        (fed ? 'fed — ' + TUNE.OX.fodder + ' grain/min' : 'HUNGRY — no grain, no plowing') + '</span></div>';
    } else if (b.type === 'runnerpost') {
      rows += row('Supply point', 'buildings measure carting to their NEAREST depot — this counts');
    }

    if (d.sells || d.sellsRaw) {
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

      const priceBits = [];
      if (b.rankPrice) priceBits.push('rank ' + '+' + Math.round((rankPriceMult(b) - 1) * 100) + '%');
      if (b.weighed) priceBits.push('weigh-house +' + Math.round(TUNE.WEIGH.bonus * 100) + '%');
      if (b.bureau) priceBits.push('wool bureau +' + Math.round(TUNE.BUREAU.priceBonus * 100) + '%');
      if (priceBits.length) {
        rows += '<div class="insp-row"><span>Price bonuses</span><span class="good">' + priceBits.join(' · ') + '</span></div>';
      }
      if (d.sellsRaw) {
        rows += mrow('Selling now', b.rawKind
          ? b.rawKind + ' at 80% of list ($' + (TUNE.PRICES[b.rawKind] * 0.8).toFixed(2) + ')'
          : 'nothing — no raw goods in store');
        rows += mrow('Sales', UI.perMin(b.rate) + '/min → $' + Util.fmtNum((b.lastGain || 0) * 60) + '/min');
      } else {
        rows += mrow('Sales', UI.perMin(b.rate) + ' ' + d.sells + '/min → $' +
          Util.fmtNum((b.lastGain !== undefined ? b.lastGain : (b.rate || 0) * d.sellPrice) * 60) + '/min');
      }
    }

    if (lit && rankUpgradable(d)) rows += UI.rankAdvice(s, b, d);

    const sup = b.supply || 1;
    const isMothed = b.mothballed;
    const realUp = isMothed
      ? d.upkeep * TUNE.MOTHBALL_UPKEEP * TUNE.TEMPO
      : d.upkeep * sup * (b.trade || 1) * rankUpkeepMult(b) * TUNE.TEMPO;
    const perMin = realUp.toFixed(2);
    if (!isMothed && sup > 1.01) {
      rows += '<div class="insp-row"><span>Supply</span><span class="warn">−$' + perMin + '/min · ×' +
        sup.toFixed(2) + ' carting</span></div>';
      rows += '<div class="insp-row insp-note"><span>' + Math.round(b.supplyDist || 0) +
        ' tiles from the nearest market. Anything past ' + TUNE.SUPPLY.freeRadius +
        ' costs more to keep supplied — build a market out here.</span></div>';
    } else {
      rows += '<div class="insp-row"><span>Supply</span><span>−$' + perMin + '/min' +
        (isMothed ? ' (mothballed: 20% caretaker rate)' : '') + '</span></div>';
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

        buttons += '<button class="btn-gold" disabled>\u{1F512} Turn the age to unlock the next chapter</button>';
      } else {
        const ok = s.money >= n.money;
        buttons += '<button id="insp-hallup" class="btn-gold" ' + (ok ? '' : 'disabled') + '>Upgrade to chapter ' +
          n.level + ' — ' + Util.fmtMoney(n.money) + '<br><small>+$' + n.trickle + '/min · $' +
          rentMonthly(s.era, n.level, s.subTier).toFixed(2) + '/mo rent</small></button>';
      }

      const imp = eraImport(s.era);
      const impCost = TUNE.IMPORT_GRAIN.units * imp.price;
      buttons += '<button id="insp-import" class="btn-primary" ' + (s.money >= impCost ? '' : 'disabled') +
        ' title="' + (imp.kind.charAt(0).toUpperCase() + imp.kind.slice(1)) + ' lists at $' + TUNE.PRICES[imp.kind] + ' and exports at $' +
        (TUNE.PRICES[imp.kind] * TUNE.EXPORT_MULT).toFixed(2) + ' — importing costs $' + imp.price +
        ' a ' + imp.unit + '. Ruinous on purpose: it is a famine valve, not a strategy.">' +
        '\u{1F6B6} Import ' + TUNE.IMPORT_GRAIN.units + ' ' + imp.kind + ' — ' + Util.fmtMoney(impCost) + '</button>';
      if (rungOf(s.era) === 4) {
        const fc = Econ.festivalCost(s);
        const fRunning = s.festival && s.festival.left > 0;
        const fOk = !fRunning && (s.stock.beer || 0) >= fc.beer && (s.stock.cloth || 0) >= fc.cloth;
        buttons += '<button id="insp-festival" class="btn-primary" ' + (fOk ? '' : 'disabled') +
          ' title="Pour out the city\'s beer and cloth: hunger drops by ' + Math.round(TUNE.FESTIVAL.hungerDrop * 100) +
          ' points at once and settlers arrive at ' + TUNE.FESTIVAL.migMult + '× until ' + TUNE.FESTIVAL.settlers +
          ' newcomers have come. Count-based — no timer.">' +
          (fRunning ? '\u{1F37A} Festival running — ' + s.festival.left + ' guests still on the road'
                    : '\u{1F37A} Festival of Ninkasi — ' + fc.beer + ' beer + ' + fc.cloth + ' cloth') + '</button>';
      }
      const pol = (id, on, name, tip) =>
        '<button id="' + id + '" class="btn-plain" title="' + tip + '">' +
        (on ? '☑' : '☐') + ' ' + name + '</button>';

      const ep = eraPolicy(s.era);
      if (ep) {
        buttons += pol('insp-pol-era', !!s[ep.key], ep.icon + ' ' + ep.name, ep.tip);

        if (s[ep.key]) {

          if (G.cache.ration) {
            const f = Econ.waterForecast(s);
            buttons += '<div class="insp-row"><span>' + UI.esc(ep.name) + '</span><span class="good">' +
              'saving ' + (Econ.waterDemand(s) / (1 - TUNE.RATION.drawCut) * TUNE.RATION.drawCut * TUNE.TEMPO).toFixed(1) +
              ' water/min for −' + Math.round(TUNE.RATION.slow * 100) + '% work' +
              (f.secs !== Infinity ? ' <span class="gold-dim">(' + Math.round(f.secs) + 's left)</span>' : '') +
              '</span></div>';
          } else {
            const live = (G.cache.beerBonus || 0) > 0;
            buttons += '<div class="insp-row"><span>' + UI.esc(ep.name) + '</span><span class="' +
              (live ? 'good' : 'gold-dim') + '">' +
              (live ? 'paying +' + Math.round(G.cache.beerBonus * 100) + '% now'
                    : ep.key === 'policyCorvee' ? 'idle — waits for the flood' : 'idle — nothing to ration')
              + '</span></div>';
          }
        }
      }
    }

    if (DEF(b.type).huntBase) {
      if (s.hunt) {
        buttons += '<button class="btn-primary" disabled>\u{1F3F9} The hunt is out — ' +
          Math.max(0, s.hunt.left) + 's · ' + s.hunt.party + ' hunters after the ' +
          Econ.HERD_NAMES[s.hunt.kind] + '</button>';
      } else {
        const t = Econ.nearestHerd(s, b);
        if (!t) {
          buttons += '<button class="btn-primary" disabled>\u{1F3F9} No herd within ' +
            TUNE.HUNT.range + ' tiles — watch the steppe</button>';
        } else {
          const odds = Econ.huntOdds(s, t.herd, t.dist);
          const cat = Econ.sabertoothNear(s, t.herd);
          buttons += '<button id="insp-hunt" class="btn-gold" title="' + TUNE.HUNT.party +
            ' hunters leave your labour pool for ' + TUNE.HUNT.ticks + 's. They can DIE out there — ' +
            'a failed hunt is more dangerous than a successful one, and a shadowing sabertooth is ' +
            'more dangerous than both.">' +
            '\u{1F3F9} Send the hunt — ' + Econ.HERD_NAMES[t.herd.kind] + ', ' + Math.round(t.dist) +
            ' tiles · odds ' + Math.round(odds * 100) + '%' + (cat ? ' · \u{1F405} SHADOWED' : '') +
            '</button>';
        }
      }
    }

    if (b.type === 'templeGranary') {
      const cur = s.granaryPolicy || 'lean';
      const next = cur === 'lean' ? 'standard' : cur === 'standard' ? 'deep' : 'lean';
      buttons += '<button id="insp-reserve" class="btn-primary" title="How many minutes of the city\'s eating the ' +
        'markets must keep off the shelves. Lean earns most; Deep rides out the longest dip.">' +
        '\u{1F33E} Reserve: ' + cur.toUpperCase() + ' → set ' + next.toUpperCase() +
        ' (' + TUNE.RESERVE_POLICY[next] + ' min)</button>';
    }
    const up = UPGRADES[b.type];

    if (up && s.era >= up.era) {
      const can = s.money >= up.cost;
      buttons += '<button id="insp-upgrade" class="btn-primary" ' + (can ? '' : 'disabled') + '>' +
        'Upgrade → ' + up.label + ' ($' + up.cost + ')</button>';
    }

    if (rankUpgradable(d)) {
      const r = rankOf(b);
      if (r < RANK.max) {

        const disc = Econ.rankDiscount(s);
        const cost = Math.round(rankUpCost(d, r) * disc / 10) * 10;
        const can = s.money >= cost;
        const discNote = disc < 1 ? ' <small>(Tablet House −15%)</small>' : '';

        const isShop = !!(d.sells || d.sellsRaw);
        const isMaker = !!(d.out || d.procIn);
        const isRadius = !!(d.waterRadius || d.soilRadius);
        let gainTxt, tip;
        if (isShop) {
          gainTxt = '+' + Math.round(TUNE.RANK_PRICE_BONUS * 100) + '% price';
          tip = 'Every unit sells for ' + Math.round(TUNE.RANK_PRICE_BONUS * 100) + '% more. It does NOT ' +
            'draw more goods from your stores, so a rank can never outrun the chain feeding it.';
        } else if (isMaker) {
          gainTxt = '+' + Math.round(RANK.outPerRank * 100) + '% output';
          tip = 'More out of the same ground: +' + Math.round(RANK.outPerRank * 100) + '% output.';
        } else if (d.threshing) {
          const now = TUNE.ADJ_BONUS * rankOutMult(b), next = TUNE.ADJ_BONUS * rankOutMult({ rank: r + 1 });
          gainTxt = 'bonus ' + Math.round(now * 100) + '% → ' + Math.round(next * 100) + '%';
          tip = 'A stronger floor beats more grain from the same ear: every Farm it touches goes from +' +
            Math.round(now * 100) + '% to +' + Math.round(next * 100) + '%.';
        } else if (isRadius) {
          const rad = (d.waterRadius || d.soilRadius) + rankRadiusBonus(b);
          gainTxt = 'radius ' + rad + ' → ' + (rad + RANK.radiusPerRank);
          tip = 'Reaches one tile further in every direction — worth it when a second one would only ' +
            'cover ground you already have.';
        } else { gainTxt = '+' + Math.round(RANK.outPerRank * 100) + '%'; tip = ''; }

        let payback = '';
        if (isShop && b.lastGain > 0.0001) {
          const extraMin = b.lastGain * 60 * TUNE.RANK_PRICE_BONUS;

          const upMin = (d.upkeep * rankUpkeepMult({ rank: r + 1 }) - d.upkeep * rankUpkeepMult(b)) * TUNE.TEMPO;
          const netMin = extraMin - upMin;
          if (netMin > 0.01) payback = ' · payback ~' + Math.max(1, Math.round(cost / netMin)) + ' min';
        }
        buttons += '<button id="' + (isShop ? 'insp-rank-price' : 'insp-rank') + '" class="btn-primary" ' +
          (can ? '' : 'disabled') + ' title="' + tip + ' Costs +' +
          Math.round(RANK.upkeepPerRank * 100) + '% upkeep, NOT ONE extra worker, and NOT ONE extra tile' +
          payback + '">' +
          (isShop ? '\u{1F4B0}' : '⚙️') + ' Upgrade to ' + d.name + ' ' + RANK.numerals[r + 1].trim() +
          ' — $' + cost + ' (' + gainTxt + payback + ')' + discNote + '</button>';
      }
    }

    if (!d.fixed && !d.monument && !d.cap && !d.cosmetic && b.type !== 'road') {
      buttons += b.mothballed
        ? '<button id="insp-mothball" class="btn-gold">\u{1F4A1} Reactivate — it will staff and run again</button>'
        : '<button id="insp-mothball" class="btn-plain">\u{1F56F}️ Mothball — 20% upkeep, no workers, no output</button>';
    }

    if (d.monument && !b.complete) {
      const p = Econ.monumentProgress(G.s, b);
      const pct = p ? Math.round(p.frac * 100) : 0;
      buttons += b.halted
        ? '<button id="insp-halt" class="btn-gold">▶️ Resume building — ' + pct + '% delivered</button>'
        : '<button id="insp-halt" class="btn-plain">⏸️ Halt construction — ' + pct + '% delivered</button>';

      buttons += '<button id="insp-beerwages" class="btn-plain" title="Beyond the required beer leg, every extra ' +
        'beer delivered pays $8 of the wage bill, capped at half of it. A brewery city drinks its monument ' +
        'into existence; a cash city pays coin.">' +
        (b.beerWages ? '☑' : '☐') + ' Pay the builders in beer' +
        (b.beerWageCredit ? ' <small>($' + Math.round(b.beerWageCredit) + ' paid so far)</small>' : '') + '</button>';
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

    if (b.type !== 'road') {
      buttons += '<button id="insp-move" class="btn-primary">\u{1F4E6} Move ' +
        (d.fixed ? UI.esc(anchorFor(G.s.era).name) : 'building') + '</button>';
    }

    if (d.fixed) {
      const nInv = (s.relics || []).length;
      const nAll = nInv + s.buildings.filter(x => x.relic).length;
      buttons += '<button id="insp-dynasty" class="' + (nInv ? 'btn-gold' : 'btn-plain') + '">' +
        '\u{1F3DB}\u{FE0F} The Dynasty' + (nAll ? ' (' + nAll + ')' : '') +
        (nInv ? ' — ' + nInv + ' to place' : '') + '</button>';
    }

    if (b.type !== 'road') {
      buttons += '<button id="insp-rename" class="btn-plain">✎ ' + (b.name ? 'Rename' : 'Name this building') + '</button>';
    }
    if (!d.fixed) {

      const base = b.type === 'farm2' ? DEF('estate').cost + UPGRADES.estate.cost : d.cost;
      const refund = Math.floor((base != null ? base : 100) * TUNE.DEMOLISH_REFUND);
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
    const huntBtn = document.getElementById('insp-hunt');
    if (huntBtn) huntBtn.onclick = () => {
      const err = Econ.launchHunt(s, b);
      if (err) UI.toast('\u{1F3F9} ' + err + '.', 8000);
      UI.showInspector(b);
      UI.updateHUD(s);
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
    const buyRank = asPrice => {
      const r = rankOf(b);
      if (r >= RANK.max) return;

      const cost = s.freeRank ? 0 : Math.round(rankUpCost(d, r) * Econ.rankDiscount(s) / 10) * 10;
      if (s.money < cost) return;
      if (s.freeRank) { s.freeRank = 0; UI.toast('⚙️ The Anunnaki\'s gift is spent — this rank cost nothing.', 8000); }
      s.money -= cost;
      b.rank = r + 1;
      if (window.Sfx) Sfx.play('rank');
      if (asPrice) b.rankPrice = (b.rankPrice || 0) + 1;
      Grid.rebuild(s);
      UI.toast(asPrice
        ? '\u{1F4B0} ' + d.name + ' now sells at +' + Math.round((rankPriceMult(b) - 1) * 100) +
          '% price — a boutique, not a bazaar. Same stock, richer sales, zero new mouths.'
        : '⚙️ ' + d.name + ' upgraded to rank ' + RANK.numerals[b.rank].trim() + ' — +' +
          Math.round(RANK.outPerRank * 100) + '% output for +' + Math.round(RANK.upkeepPerRank * 100) +
          '% upkeep, and NOT ONE extra worker. That is what a rank is for: more from the same ' +
          'ground and the same mouths.', 11000);
      UI.showInspector(b);
      UI.updateHUD(s);
    };
    const rank = document.getElementById('insp-rank');
    if (rank) rank.onclick = () => buyRank(false);
    const rankP = document.getElementById('insp-rank-price');
    if (rankP) rankP.onclick = () => buyRank(true);
    const moth = document.getElementById('insp-mothball');
    if (moth) moth.onclick = () => {
      b.mothballed = !b.mothballed;
      Grid.rebuild(G.s);
      UI.toast(b.mothballed
        ? '\u{1F56F}️ ' + (b.name || d.name) + ' mothballed. Its workers are back in the pool, it makes ' +
          'nothing, and it costs 20% of its upkeep. One click brings it back — nothing is lost.'
        : '\u{1F4A1} ' + (b.name || d.name) + ' reactivated — it will staff and run on the next tick.', 9000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };
    const imp = document.getElementById('insp-import');
    if (imp) imp.onclick = () => {
      const paid = Econ.importGrain(G.s);
      if (paid === false) return;
      UI.toast('\u{1F6B6} A caravan delivered ' + TUNE.IMPORT_GRAIN.units + ' grain for ' + Util.fmtMoney(paid) +
        ' — four times the fair price, and worth every shekel in a famine.', 9000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };
    const fest = document.getElementById('insp-festival');
    if (fest) fest.onclick = () => {
      const r = Econ.declareFestival(G.s);
      if (r !== true) { if (typeof r === 'string') UI.toast('\u{1F37A} No festival: ' + r + '.'); return; }
      if (window.Sfx) Sfx.play('drum');
      UI.toast('\u{1F37A} THE FESTIVAL OF NINKASI! Beer and cloth pour out, hunger falls at once, and word ' +
        'spreads down the river — settlers arrive at ' + TUNE.FESTIVAL.migMult + '× until ' +
        TUNE.FESTIVAL.settlers + ' newcomers have come.', 12000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };
    const wirePol = (id, key, name) => {
      const el = document.getElementById(id);
      if (el) el.onclick = () => {
        G.s[key] = key === 'policyFeedFirst' ? !(G.s[key] !== false) : !G.s[key];
        UI.toast((G.s[key] ? '☑ ' : '☐ ') + name + (G.s[key] ? ' is now ON.' : ' is now OFF.'), 6000);
        UI.showInspector(b);
      };
    };
    const epw = eraPolicy(G.s.era);
    if (epw) {
      const el = document.getElementById('insp-pol-era');
      if (el) el.onclick = () => {
        G.s[epw.key] = !G.s[epw.key];
        UI.toast(epw.icon + ' ' + (G.s[epw.key] ? epw.on : epw.off), 9000);
        UI.showInspector(b);
      };
    }
    const resv = document.getElementById('insp-reserve');
    if (resv) resv.onclick = () => {
      const cur = G.s.granaryPolicy || 'lean';
      G.s.granaryPolicy = cur === 'lean' ? 'standard' : cur === 'standard' ? 'deep' : 'lean';
      UI.toast('\u{1F33E} Reserve policy: ' + G.s.granaryPolicy.toUpperCase() + ' — markets now keep ' +
        TUNE.RESERVE_POLICY[G.s.granaryPolicy] + ' minutes of the city\'s eating off the shelves.', 8000);
      UI.showInspector(b);
    };
    const bw = document.getElementById('insp-beerwages');
    if (bw) bw.onclick = () => {
      b.beerWages = !b.beerWages;
      UI.toast(b.beerWages
        ? '\u{1F37A} The builders will take beer. Every extra jar delivered pays $8 of the wage bill, up to half of it.'
        : 'The builders are back on coin wages.', 8000);
      UI.showInspector(b);
    };
    const ren = document.getElementById('insp-rename');
    if (ren) ren.onclick = () => {
      UI.togglePanel('rename-panel', () =>
        '<h2>✎ Name this building</h2>' +
        '<div class="panel-sub">The Chronicle and every message about it will use the name.</div>' +
        '<input id="rename-input" type="text" maxlength="40" value="' + UI.esc(b.name || '') + '" ' +
        'style="width:100%;padding:6px;font:14px system-ui;border-radius:6px;border:1px solid #c9a86a;background:rgba(0,0,0,0.3);color:#e8dcc0" ' +
        'placeholder="e.g. The Thirsty Ox">' +
        '<div class="adv-btns"><button id="rename-ok" class="btn-gold">Carve it</button>' +
        '<button id="rename-clear" class="btn-plain">Clear</button></div>');
      const okB = document.getElementById('rename-ok');
      if (!okB) return;
      const inp = document.getElementById('rename-input');
      inp.focus();
      const close = () => { const p = document.getElementById('rename-panel'); if (p) p.remove(); };
      okB.onclick = () => {
        const v = (inp.value || '').trim().slice(0, 40);
        if (v) { b.name = v; Econ.log(G.s, '✎', v + ' was named — the ' + d.name + ' by the ' + (b.x < TUNE.WORLD / 2 ? 'west' : 'east') + ' side.'); }
        close(); UI.showInspector(b);
      };
      document.getElementById('rename-clear').onclick = () => { delete b.name; close(); UI.showInspector(b); };
      inp.onkeydown = ev => { if (ev.key === 'Enter') okB.onclick(); ev.stopPropagation(); };
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
      if (Grid.covered(G.cache.midden, b)) mult *= S.middenBonus;
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
    const dyn = document.getElementById('insp-dynasty');
    if (dyn) dyn.onclick = () => { UI.hideInspector(); UI.relicPanel(); };
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
    if (window.Sfx) Sfx.play('horn');

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
      dry_season: 'the dry season — collecting nothing',
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
      ['grain', 'Grain'], ['flour', 'Flour'], ['dates', 'Dates'], ['fish', 'Fish'],
      ['clay', 'Clay'], ['pottery', 'Pottery'], ['mudbrick', 'Mudbrick'],
      ['wool', 'Wool'], ['cloth', 'Cloth'], ['dyedcloth', 'Dyed cloth'], ['beer', 'Beer'],
      ['reeds', 'Reeds'], ['baskets', 'Baskets'], ['sesame', 'Sesame'], ['oil', 'Oil'],
      ['salt', 'Salt'], ['stone', 'Stone'], ['blocks', 'Blocks'],
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

      ((C.exportRate || 0) > 0.005
        ? '<tr><td class="gold-dim">…of which sold abroad (overflow @ ' + Math.round(TUNE.EXPORT_MULT * 100) +
          '%)</td><td class="gold-dim">+' + $(C.exportRate) + '/min</td></tr>' : '') +
      ((C.duesRate || 0) > 0.005
        ? '<tr><td class="gold-dim">…of which temple head money</td><td class="gold-dim">+' +
          $(C.duesRate) + '/min</td></tr>' : '') +
      ((C.monBonusRate || 0) > 0.005
        ? '<tr><td class="gold">…of which the monument dividend (+' +
          Math.round((C.monBoost || 0) * 100) + '%)</td><td class="gold">+' +
          $(C.monBonusRate) + '/min</td></tr>' : '') +
      '<tr><td>Upkeep</td><td class="bad">−' + $(C.upkeepRate) + '/min</td></tr>' +
      '<tr><td class="gold-dim">…of which carting premium</td><td class="gold-dim">−' +
        $(C.premiumRate) + '/min</td></tr>' +
      ((C.monSpendRate || 0) > 0.005
        ? '<tr><td class="warn">Monument deliveries (wages)</td><td class="warn">−' +
          $(C.monSpendRate) + '/min</td></tr>' : '') +
      '<tr><td><b>Net</b></td><td class="' + (C.net >= 0 ? 'good' : 'bad') + '"><b>' +
        (C.net >= 0 ? '+' : '−') + $(C.net * 60) + '/min</b></td></tr>' +
      '<tr><td>Income ÷ upkeep</td><td class="' +
        (C.upkeepRate > 0 && C.incomeRate / C.upkeepRate >= 1 ? 'good' : 'bad') + '">' +
        (C.upkeepRate > 0.001 ? (C.incomeRate / C.upkeepRate).toFixed(2) + '×' : '—') + '</td></tr>' +
      '</table>';
    if ((C.doleRate || 0) > 0.01) {
      h += '<div class="panel-sub warn">The Temple Granary is issuing the dole: ' +
        Util.fmtNum(C.doleRate) + ' flour-worth of grain a minute is feeding the city directly.</div>';
    }

    const R = s.records || {};
    h += '<div class="panel-title2">The Founders\' Ledger</div><table class="tally">' +
      '<tr><td>Peak population</td><td>' + (R.peakPop || 0) + '</td></tr>' +
      '<tr><td>Best net</td><td>' + (R.bestNet ? '+$' + R.bestNet.toFixed(2) + '/min' : '—') + '</td></tr>' +
      '<tr><td>Settlers welcomed</td><td>' + (R.settlers || 0) + '</td></tr>' +
      '<tr><td>Lost to famine</td><td class="' + (R.lostFamine ? 'bad' : 'gold-dim') + '">' + (R.lostFamine || 0) + '</td></tr>' +
      '<tr><td>Longest zero-hunger streak</td><td>' + (R.bestStreak ? Math.round(R.bestStreak / 60) + ' min' : '—') + '</td></tr>' +
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
    const s = G.s, C = G.cache;
    const pop = Game.totalResidents(s);
    let html = '<h2>The Era Ladder</h2>';
    if (Econ.nextEra(s)) {
      const n = s.era + 1, r = eraReq(n);

      const eta = (cur, need, perMin) => {
        if (cur >= need) return '';
        if (!perMin || perMin <= 0.001) return ' <span class="gold-dim">· stalled</span>';
        const m = (need - cur) / perMin;
        return ' <span class="gold-dim">· ~' + (m < 90 ? Math.max(1, Math.round(m)) + ' min' :
          (m / 60).toFixed(1) + ' h') + ' at current rate</span>';
      };
      const rrow = (label, cur, need, rate, rateLabel) => {
        const done = cur >= need;
        return '<div class="insp-row"><span>' + label +
          (rate !== undefined && !done ? ' <span class="gold-dim">(' + rateLabel + ')</span>' : '') +
          '</span><span class="' + (done ? 'good' : '') + '">' +
          (typeof cur === 'number' && cur > 9999 ? Math.round(cur).toLocaleString('en-US') : Math.floor(cur)) +
          ' / ' + need.toLocaleString('en-US') + ' ' + (done ? '✓' : (eta(cur, need, rate) || '')) + '</span></div>';
      };
      const migPerMin = (C.migrateRate || 0) * TUNE.TEMPO;
      const netPerMin = C.net * 60;
      const flourPerMin = (C.tally.flour && C.tally.flour.made) || 0;

      html += '<div class="panel-sub">The age can turn when this city has:</div>';

      const eb = s.eraBase || {};
      const flourNow = Math.max(0, s.cum.flour - (eb.flour || 0));
      const stoneNow = Math.max(0, s.cum.stone - (eb.stone || 0));
      html += rrow('Population', pop, r.pop, migPerMin, '+' + migPerMin.toFixed(1) + '/min');
      html += rrow('Treasury ($)', Math.max(0, s.money), r.money, netPerMin, (netPerMin >= 0 ? '+' : '') + '$' + netPerMin.toFixed(0) + '/min');
      html += rrow('Flour milled this age', flourNow, r.food, flourPerMin, '+' + flourPerMin.toFixed(1) + '/min');
      if (r.stone) html += rrow('Stone quarried this age', stoneNow, r.stone, (C.tally.stone && C.tally.stone.made) || 0, 'rate');

      const mon = Econ.monumentFor(s.era);
      let monFrac = 1;
      if (mon) {
        const site = s.buildings.find(b => b.type === mon.key);
        const monOK = Econ.monumentDone(s, s.era);
        monFrac = monOK ? 1 : (site ? ((Econ.monumentProgress(s, site) || {}).frac || 0) : 0);
        html += '<div class="insp-row"><span>' + UI.esc(mon.def.name) + '</span><span class="' +
          (monOK ? 'good' : 'warn') + '">' +
          (monOK ? 'standing ✓' : site ? Math.round(monFrac * 100) + '% built' : 'not begun') +
          '</span></div>';
      }

      const fr = [
        ['population', pop / r.pop], ['money', Math.max(0, s.money) / r.money],
        ['flour', flourNow / r.food],
      ];
      if (r.stone) fr.push(['stone', stoneNow / r.stone]);
      if (mon) fr.push([mon.def.name, monFrac]);
      fr.sort((a, b) => a[1] - b[1]);
      if (fr[0][1] < 1) {
        html += '<div class="panel-sub warn">The gate that binds right now: <b>' + UI.esc(String(fr[0][0])) +
          '</b> at ' + Math.round(fr[0][1] * 100) + '%. Aim the city at that.</div>';
      }
      if (Econ.eraReady(s))
        html += '<button id="era-advance-btn" class="btn-gold" style="width:100%;margin-top:8px">' +
          '⬆ Turn the age — leave this city behind</button>';
    } else if (s.era >= MAX_ERA) {
      html += '<div class="panel-sub gold">The Looking Glass is open. You finished the ladder.</div>';
    } else {

      html += '<div class="panel-sub gold">You stand at the edge of the written ages. ' +
        'The ladder runs on — those rungs are still being carved.</div>';
    }
    html += '<div class="era-list">';

    for (const e of ERAS) {
      const here = e.n === s.era;
      const lived = e.n <= s.era && (WRITTEN_RUNGS.includes(e.n) || e.n < START_ERA);
      const locked = e.n > s.era;
      html += '<div class="era-item' + (here ? ' here' : '') + (!lived && !here ? ' locked' : '') + '">' +
        (here || lived
          ? '<b>' + e.n + ' · ' + e.name + '</b><span>' + e.blurb + '</span>'
          : locked
            ? '<b>' + e.n + ' · ?</b><span>Unwritten. You find out when the age turns.</span>'
            : '<b>' + e.n + ' · ?</b><span>Unwritten — your dynasty passed this age by. It will be carved one day.</span>') +
        '</div>';
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
      '<p><b>Adjacency:</b> EVERY chain\'s producer and workshop boost each other +25% when touching — Farm↔Mill, ' +
      'Clay Pit↔Kiln, Fold↔Weaver, Reeds↔Baskets, Sesame↔Press, Quarry↔Stonecutter. Square/Shrine/Temple boost housing, industry hurts it. Fertile soil (dark green) boosts farms.</p>' +
      '<p><b>The Hall governs:</b> its panel holds THIS AGE\'S ONE POLICY — a standing decree that spends a good ' +
      'you produce to make every building work harder, and simply stops when you run out. It also holds the ' +
      'dynasty\'s monuments, emergency grain imports and the festival. (Mills always draw grain before breweries, ' +
      'and the food chain always staffs first during a famine — those are not choices, they are just how a city works.)</p>' +
      '<p><b>When things bleed:</b> any working building can be MOTHBALLED from its panel — 20% upkeep, no workers, no output, one click back. ' +
      'Empty frontier parcels sell back at 60% with the Buy Land tool. Ctrl+Z undoes a misplaced building within 10 seconds, full refund.</p>' +
      '<p><b>The world is yours to shape:</b> newly bought land keeps its wild trees — clear them with ⛏️ Demolish ($' + TUNE.CLEAR_TREE + ' each) before building. The <b>Terraform</b> tab paints grass, fertile soil, water, rock, mountains and trees so you can design the land itself.</p>' +
      '<p><b>Saving:</b> the city autosaves every 10 seconds and when you close the tab. The <b>Save</b> button (or <b>Ctrl+S</b>) saves immediately and tells you what it saved.</p>' +
      '<p><b>Camera — mouse only:</b> left-drag grabs the ground and pans · right-drag looks left, right and up/down · scroll wheel zooms toward your cursor · click any building to focus on it · double-click the ground to center there. (<b>WASD</b> and <b>Q/E</b> also work.)</p>' +
      '<p><b>You start unable to read.</b> A new city keeps no records, so it has no production rates, no soil readings and no dashboard — only what you can see: fields paling as they salt, a crowd or an empty street, the grain in the granary. Build a \u{1F4DC} <b>Scribe’s House</b> and every number in the game appears, along with the <b>Tally</b>. Writing was invented to count grain; here you have to invent it too.</p>' +
      '<p><b>Keys:</b> <b>Esc</b> select · <b>Space</b> pause · <b>O</b> overlays (coverage, then the SALT map) · ' +
      '<b>T</b> the Tally · <b>C</b> the Chronicle · <b>G</b> era guide · <b>P</b> photo mode · <b>H</b> this help · ' +
      '<b>1–9</b> the palette\'s buildings · <b>Tab</b> next palette tab · <b>R</b> rotates what you are placing or moving · ' +
      '<b>Alt+click</b> copies a built building into your hand · ' +
      '<b>Shift</b> while dragging a road locks it straight · <b>Ctrl+Z</b> undoes the last placement (10s) · <b>Ctrl+S</b> save. Autosaves every 10 seconds.</p>';
  },

  workersHTML() {
    const s = G.s, C = G.cache;
    let h = '<div class="panel-title">\u{1F528} The Staffing List</div>' +
      '<div class="panel-sub">Buildings staff in PLACEMENT order — first built, first served. ' +
      'While hunger is at or past 50% the flour chain is promoted automatically.' + '</div>';
    h += '<table class="tally"><tr><th>#</th><th>Building</th><th>Staff</th></tr>';
    const workers = s.buildings.filter(b => DEF(b.type).workers && b.done !== false)
      .sort((a, b) => a.placed - b.placed);
    let i = 0;
    for (const b of workers) {
      const d = DEF(b.type);
      const cls = b.mothballed ? 'gold-dim' : b.staff === 0 ? 'bad' : b.staff < d.workers ? 'warn' : 'good';
      h += '<tr><td>' + (++i) + '</td><td>' + (b.name ? UI.esc(b.name) + ' · ' : '') + d.name +
        (b.mothballed ? ' (mothballed)' : '') + '</td>' +
        '<td class="' + cls + '">' + (b.mothballed ? '—' : (b.staff || 0) + ' / ' + d.workers) + '</td></tr>';
    }
    h += '</table>';
    h += '<div class="panel-sub">Pool: ' + C.workersUsed + ' working of ' + C.workersTotal +
      ' residents. Short-staffed buildings at the BOTTOM of this list are starved by the ones above them — ' +
      'housing adds workers, ranks add output without adding workers.</div>';
    return h;
  },

  chronicleHTML() {
    const s = G.s;
    let h = '<div class="panel-title">\u{1F4DC} The Chronicle' +
      (s.cityName ? ' of ' + UI.esc(s.cityName) : '') + '</div>' +
      '<div class="panel-sub">Pressed into clay as it happened. The tablets keep the last 200 entries.</div>';
    const log = (s.chronicle || []).slice().reverse();
    if (!log.length) {
      h += '<div class="panel-sub gold-dim">Nothing yet worth carving. Found something.</div>';
      return h;
    }
    h += '<table class="tally">';
    for (const e of log) {
      const mins = Math.round(e.tick / 60);
      h += '<tr><td class="gold-dim" style="white-space:nowrap">era ' + (e.era || 1) + ' · min ' + mins +
        '</td><td>' + e.icon + ' ' + UI.esc(e.msg) + '</td></tr>';
    }
    h += '</table>';
    return h;
  },

  relicPanel() {
    const s = G.s;
    UI.togglePanel('relic-panel', () => {
      const inv = s.relics || [];
      const standing = s.buildings.filter(b => b.relic);
      let h = '<h2>\u{1F3DB}\u{FE0F} The Dynasty</h2>' +
        '<div class="panel-sub">' +
        (s.cityName ? UI.esc(s.cityName) + ' — ' : '') +
        (inv.length + standing.length) + ' monument' + ((inv.length + standing.length) === 1 ? '' : 's') +
        ' finished across every age you have played.</div>';
      if (!inv.length && !standing.length) {
        h += '<p>Nothing yet. Finish this age\'s monument and it comes with you when the age turns — ' +
          'and every age after that.</p>';
        return h;
      }
      if (inv.length) {
        h += '<div class="panel-title2">Waiting to be placed</div>';
        h += '<div class="adv-btns" style="flex-direction:column">';
        inv.forEach((r, i) => {
          const d = DEF(r.type) || {};
          h += '<button class="btn-gold relic-place" data-i="' + i + '">' +
            (d.icon || '\u{1F3DB}\u{FE0F}') + ' Place the ' + UI.esc(d.name || r.type) +
            ' <span class="gold-dim">(from era ' + (r.era || 1) + ')</span></button>';
        });
        h += '</div>';
        h += '<div class="panel-sub">It arrives finished — no deliveries, no road, no water. ' +
          'It pays its trickle, its +' + Math.round(TUNE.MONUMENT_BOOST * 100) +
          '% city dividend and its standing the moment it stands.</div>';
      }
      if (standing.length) {
        h += '<div class="panel-title2">Standing in this city</div><table class="tally">';
        for (const b of standing) {
          const d = DEF(b.type) || {};
          h += '<tr><td>' + (d.icon || '') + ' ' + UI.esc(d.name || b.type) +
            '</td><td>era ' + (b.relicEra || '?') + ' \u{00B7} +$' +
            ((d.trickle || 0) * TUNE.TEMPO).toFixed(0) + '/min</td></tr>';
        }
        h += '</table>';
      }
      return h;
    });
    const p = document.getElementById('relic-panel');
    if (p) p.querySelectorAll('.relic-place').forEach(btn => {
      btn.onclick = () => { p.remove(); Input.startRelic(+btn.dataset.i); };
    });
  },

  anunnakiDepart(s) {
    const g = monumentGift(s.era);
    if (!g) { s.pendingGift = 0; return; }

    const homes = s.buildings.filter(b => DEF(b.type) && DEF(b.type).cap);
    const topName = houseLevelName(s.era, houseMaxLevel(s));
    UI.togglePanel('depart-panel', () =>
      '<h2>' + g.icon + ' ' + g.title + '</h2>' +
      '<div class="panel-sub">' + g.lead + '</div>' +
      '<p>' + g.body + '</p>' +
      '<p>' + g.grant + '</p>' +
      (g.key === 'housing'
        ? '<div class="insp-row"><span>Housing ceiling</span><span class="gold">rung ' +
          houseMaxLevel(s) + ' — ' + UI.esc(topName) + '</span></div>' +
          '<div class="insp-row"><span>Homes it applies to</span><span>' + homes.length +
          ' standing, and every one you build after</span></div>'
        : '') +
      '<div class="adv-btns" style="flex-direction:column">' +
      '<button id="gift-ok" class="btn-gold">Their work here is done</button>' +
      '</div>');
    const el = document.getElementById('gift-ok');
    if (el) el.onclick = () => {
      s.pendingGift = 0;
      const p = document.getElementById('depart-panel'); if (p) p.remove();
      UI.toast(g.toast, 11000);
      UI.updateHUD(G.s);
    };
  },

  promptNaming() {
    UI.togglePanel('naming-panel', () =>
      '<h2>\u{1F3DB}️ Name Your City</h2>' +
      '<div class="panel-sub">The scribes need something to carve on the founding tablet.</div>' +
      '<input id="city-name-input" type="text" maxlength="30" placeholder="Uruk-by-the-River" ' +
      'style="width:100%;padding:8px;font:15px system-ui;border-radius:6px;border:1px solid #c9a86a;background:rgba(0,0,0,0.3);color:#e8dcc0">' +
      '<div class="adv-btns"><button id="city-name-ok" class="btn-gold">Found the city</button>' +
      '<button id="city-name-skip" class="btn-plain">It needs no name yet</button></div>');
    const okB = document.getElementById('city-name-ok');
    if (!okB) return;
    const inp = document.getElementById('city-name-input');
    inp.focus();
    const close = () => { const p = document.getElementById('naming-panel'); if (p) p.remove(); };
    okB.onclick = () => {
      const v = (inp.value || '').trim().slice(0, 30);
      if (v) {
        G.s.cityName = v;
        Econ.log(G.s, '\u{1F3DB}️', v + ' was founded on the banks of the great river.');
        UI.toast('\u{1F3DB}️ ' + v + ' is founded. May its tally always run positive.', 9000);
      }
      close();
    };
    document.getElementById('city-name-skip').onclick = close;
    inp.onkeydown = ev => { if (ev.key === 'Enter') okB.onclick(); ev.stopPropagation(); };
  },

  photoMode() {
    const ids = ['hud', 'resbar', 'controls', 'inspector', 'palette', 'toasts', 'minimap'];
    UI._photo = !UI._photo;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) el.style.visibility = UI._photo ? 'hidden' : '';
    }
    let bar = document.getElementById('photo-bar');
    if (UI._photo) {
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'photo-bar';
        bar.style.cssText = 'position:fixed;bottom:14px;left:50%;transform:translateX(-50%);z-index:60;display:flex;gap:8px;';
        bar.innerHTML = '<button id="photo-snap" style="background:#c9a86a;border:0;border-radius:6px;padding:6px 14px;cursor:pointer;font:13px system-ui">\u{1F4F7} Save PNG</button>' +
          '<button id="photo-exit" style="background:rgba(30,24,16,0.9);color:#e8dcc0;border:1px solid #c9a86a;border-radius:6px;padding:6px 14px;cursor:pointer;font:13px system-ui">Exit (P)</button>';
        document.body.appendChild(bar);
        bar.querySelector('#photo-exit').onclick = () => UI.photoMode();
        bar.querySelector('#photo-snap').onclick = () => {
          Rend.draw(G.s, performance.now() / 1000);
          const a = document.createElement('a');
          const name = (G.s.cityName || 'EPOCH').replace(/[^\w-]+/g, '_');
          a.download = name + '_era' + G.s.era + '_min' + Math.round(G.s.tick / 60) + '.png';
          a.href = Rend.canvas.toDataURL('image/png');
          a.click();
        };
      }
      bar.style.display = 'flex';
    } else if (bar) bar.style.display = 'none';
  },

  toast(msg, ms) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    UI.els.toasts.appendChild(t);
    while (UI.els.toasts.children.length > 4) UI.els.toasts.firstChild.remove();
    if (window.Sfx) Sfx.play('toast');
    setTimeout(() => { t.classList.add('fade'); setTimeout(() => t.remove(), 600); }, ms || 6000);
  },

  recallNotice(was) {
    const t = document.createElement('div');
    t.className = 'toast recall';
    const line = document.createElement('div');
    line.textContent = '❄️ A new age has been added to EPOCH, and this playtest starts ' +
      'everyone in it. You are in The Ice Age, era 1. Your ' + was.buildings +
      '-building city has been filed away, not deleted.';
    t.appendChild(line);
    const row = document.createElement('div');
    row.className = 'recall-actions';
    const back = document.createElement('button');
    back.textContent = 'Restore my old city';
    back.onclick = () => {
      if (Game.restoreArchive()) {
        Grid.rebuild(G.s);
        if (window.Rend) { Rend.invalidateTerrain && Rend.invalidateTerrain(); Rend.applyEra && Rend.applyEra(G.s.era); }
        UI.refreshPalette(); UI.updateHUD(G.s);
        t.remove();
        UI.toast('Your city is back. Reload if anything looks off.', 8000);
      } else UI.toast('Could not restore — the archive is gone.', 8000);
    };
    const ok = document.createElement('button');
    ok.textContent = 'Play the Ice Age';
    ok.className = 'primary';
    ok.onclick = () => t.remove();
    row.appendChild(ok); row.appendChild(back);
    t.appendChild(row);
    UI.els.toasts.appendChild(t);
    if (window.Sfx) Sfx.play('toast');
  },

  firstToast(key, msg) {
    if (!G.s.firsts[key]) { G.s.firsts[key] = 1; UI.toast(msg, 9000); }
  },
};
