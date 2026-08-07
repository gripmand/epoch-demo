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
    UI.els.siltChip = document.getElementById('chip-silt');
    UI.els.silt = document.getElementById('hud-silt');
    UI.els.rangeChip = document.getElementById('chip-range');
    UI.els.range = document.getElementById('hud-range');
    UI.els.gridChip = document.getElementById('chip-grid');
    UI.els.grid = document.getElementById('hud-grid');
    UI.els.rollChip = document.getElementById('chip-roll');
    UI.els.roll = document.getElementById('hud-roll');
    UI.els.headChip = document.getElementById('chip-head');
    UI.els.head = document.getElementById('hud-head');
    UI.els.reachChip = document.getElementById('chip-reach');
    UI.els.reach = document.getElementById('hud-reach');
    UI.els.herdChip = document.getElementById('chip-herd');
    UI.els.herd = document.getElementById('hud-herd');
    UI.els.levyChip = document.getElementById('chip-levy');
    UI.els.levy = document.getElementById('hud-levy');
    UI.els.unrestChip = document.getElementById('chip-unrest');
    UI.els.unrest = document.getElementById('hud-unrest');
    UI.els.tableChip = document.getElementById('chip-table');
    UI.els.table = document.getElementById('hud-table');
    UI.els.censusChip = document.getElementById('chip-census');
    UI.els.census = document.getElementById('hud-census');
    UI.els.passageChip = document.getElementById('chip-passage');
    UI.els.passage = document.getElementById('hud-passage');
    UI.els.annonaChip = document.getElementById('chip-annona');
    UI.els.annona = document.getElementById('hud-annona');

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
    on('btn-backups', () => UI.togglePanel('backups-panel', UI.backupsHTML));
    on('btn-chron', () => UI.togglePanel('chron-panel', UI.chronicleHTML));

    on('spd-pause', () => Main.setSpeed(0));
    UI.reflectSpeed();
  },

  search: '',

  showLocked: !!window.EPOCH_DEV,

  reflectKeepPlacing() {
    const b = UI.els && UI.els.keepBtn;
    if (!b) return;
    const on = Input.keepPlacing;
    b.classList.toggle('active', on);
    b.textContent = on ? '\u{1F4CC} Keep placing' : '\u{1F446} One at a time';
    b.title = on
      ? 'The tool STAYS ARMED after you place — click again to lay another. Good for a row of tents. (K)'
      : 'Your hand EMPTIES after you place, so a stray click cannot cost you a building. (K)';
  },

  tabsFor() {
    const seen = new Map();
    for (const t of PALETTE_TABS) if (t.key === 'tools' || t.key === 'terra') seen.set(t.key, t.name);
    const NAMES = {
      infra: 'Infrastructure', food: 'Food & Industry', housing: 'Housing',
      commerce: 'Commerce', civic: 'Civic', industry: 'Industry',
      knowledge: 'Knowledge', logistics: 'Logistics', luxury: 'Luxury', military: 'Military',

      craft: 'Workshops', shop: 'Shops',
      monument: 'Monuments', beauty: 'Beautify',
    };
    const order = ['infra', 'food', 'craft', 'industry', 'housing', 'commerce', 'shop', 'civic', 'monument', 'beauty', 'knowledge', 'logistics', 'luxury', 'military'];
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
    filt.appendChild(inp);

    const keepBtn = document.createElement('button');
    keepBtn.className = 'pal-keepbtn';
    keepBtn.id = 'pal-keep';
    keepBtn.onclick = () => Input.setKeepPlacing(!Input.keepPlacing);
    filt.appendChild(keepBtn);
    UI.els.keepBtn = keepBtn;
    UI.reflectKeepPlacing();

    if (window.EPOCH_DEV) {
      const lockBtn = document.createElement('button');
      lockBtn.className = 'pal-lockbtn';
      lockBtn.onclick = () => { UI.showLocked = !UI.showLocked; UI.renderTab(); };
      filt.appendChild(lockBtn);
      UI.els.lockBtn = lockBtn;
    } else {
      UI.els.lockBtn = null;
    }

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

      const terraOrder = TERRA_TOOLS.slice().sort((a, b) =>
        (terraLocked(a.kind, G.s.era) ? 1 : 0) - (terraLocked(b.kind, G.s.era) ? 1 : 0) ||
        terraCost(a.kind, G.s.era) - terraCost(b.kind, G.s.era) ||
        a.name.localeCompare(b.name));
      for (const t of terraOrder) {

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

      const tier = d.tier || 'infra';
      const alsoIndustry = UI.activeTab === 'food' && !!d.procIn;
      if (tier !== UI.activeTab && !alsoIndustry) continue;
      const era = defEra(d);

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

    const priceOf = (it) => (it.d.cost || 0) + (it.mon ? (it.mon.money || 0) : 0);
    items.sort((a, b) => a.era - b.era || priceOf(a) - priceOf(b) ||
                         a.d.name.localeCompare(b.d.name));

    if (UI.els.lockBtn) {
      const hidden = Object.keys(BUILDINGS).filter(k => {
        const d = BUILDINGS[k];
        return !d.noBuild && !d.fixed && (d.tier || 'infra') === UI.activeTab && defEra(d) > G.s.era;
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
        body.appendChild(UI.el('div', 'pal-era', 'Era ' + era + ' · ' + eraInfo(era).name));
      }
      const bill = mon ? UI.billText(mon) : '';
      const btn = document.createElement('button');
      btn.className = 'pal-btn' + (locked ? ' locked' : '');
      btn.dataset.type = type;
      btn.title = locked
        ? 'Unlocks in Era ' + era + ' — ' + eraInfo(era).name
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
        if (locked && !devFree) { UI.toast('\u{1F512} ' + shownName + ' unlocks in Era ' + era + ' — ' + eraInfo(era).name + '.'); return; }
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

  backupsHTML() {
    const list = Game.snapshotList();
    const ago = t => {
      if (!t) return 'unknown age';
      const m = Math.max(0, Math.round((Date.now() - t) / 60000));
      if (m < 1) return 'just now';
      if (m < 60) return m + ' min ago';
      const h = Math.floor(m / 60);
      return h + 'h ' + (m % 60) + 'm ago';
    };
    let h = '<h2>\u{1F5C4}\u{FE0F} Backups</h2>' +
      '<div class="panel-sub">Your city lives in THIS BROWSER, at THIS address. It is not in the ' +
      'cloud and it is not in the code — clearing site data, a new browser or another machine will not ' +
      'find it. <b>The downloaded file is the only copy that outlives any of that.</b></div>';

    h += '<div class="adv-btns" style="margin:10px 0">' +
      '<button id="bk-export" class="btn-gold">\u{2B07}\u{FE0F} Download my city</button>' +
      '<button id="bk-import" class="btn-primary">\u{2B06}\u{FE0F} Load from a file</button></div>' +
      '<input type="file" id="bk-file" accept="application/json,.json" style="display:none">';

    h += '<div class="panel-title2">Automatic backups in this browser</div>';
    if (!list.length) {
      h += '<div class="panel-sub">None yet — the first one is taken within a few minutes of play.</div>';
    } else {
      h += '<table class="tally"><tr><th>What</th><th>Age</th><th>City</th><th></th></tr>';
      for (const b of list) {
        const desc = b.corrupt ? '<span class="bad">unreadable</span>'
          : 'era ' + b.era + ' · ' + b.buildings + ' buildings · ' + b.pop + ' pop';
        h += '<tr><td>' + UI.esc(b.label) + (b.name ? ' <span class="gold-dim">' + UI.esc(b.name) + '</span>' : '') +
          '</td><td class="gold-dim">' + ago(b.at) + '</td><td>' + desc + '</td>' +
          '<td>' + (b.corrupt ? '' : '<button class="bk-restore" data-key="' + UI.esc(b.key) +
            '">Restore</button>') + '</td></tr>';
      }
      h += '</table>';
      h += '<div class="panel-sub">Restoring reloads the page. The city you are in now is backed up ' +
        'first, so a restore is itself undoable.</div>';
    }
    if (typeof Main !== 'undefined' && Main.saveBlocked) {
      h += '<div class="panel-sub bad">\u{26A0}\u{FE0F} AUTOSAVE IS OFF because a save could not be read on ' +
        'this page load. Nothing is being written over it. Restore one of the entries above, or download ' +
        'the rescued file, before you play on.</div>';
    }
    return h;
  },

  wireBackupsPanel(p) {
    const ex = p.querySelector('#bk-export');
    if (ex) ex.onclick = () => {
      const f = Game.exportSave();
      UI.toast(f ? '\u{2B07}\u{FE0F} Saved to your downloads as ' + f + '. That file is the copy nothing here can touch.'
                 : 'Could not build the file — this browser is blocking downloads.', 10000);
    };
    const im = p.querySelector('#bk-import'), file = p.querySelector('#bk-file');
    if (im && file) {
      im.onclick = () => file.click();
      file.onchange = () => {
        const f = file.files && file.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => {
          const err = Game.importSave(String(r.result));
          if (err) { UI.toast('\u{26A0}\u{FE0F} ' + err, 10000); return; }
          UI.toast('\u{2705} Loaded. Reloading…', 4000);
          setTimeout(() => location.reload(), 700);
        };
        r.readAsText(f);
      };
    }
    for (const b of p.querySelectorAll('.bk-restore')) {
      b.onclick = () => {
        if (!Game.restoreSnapshot(b.dataset.key)) { UI.toast('That backup could not be restored.', 8000); return; }
        UI.toast('\u{2705} Restored. Reloading…', 4000);
        setTimeout(() => location.reload(), 700);
      };
    }
  },

  saveNow() {
    const ok = Game.save();
    if (!ok) {
      UI.toast('Could not save - this browser is blocking storage. Private windows often do.', 12000);
      return;
    }
    const s = G.s;
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

  saltActive(s) {
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (d && ((d.out && d.out.grain) || d.slowSalt)) return true;
    }
    return false;
  },

  toggleBlocks() {
    if (!Econ.gridActive(G.s)) return;
    Rend.showBlocks = !Rend.showBlocks;
    Rend.refreshBlockSets();
    UI.firstToast('overlayblocks', '\u{1F4D0} Block map: GREEN is a qualifying block. AMBER is a ' +
      'rectangle that is the right size and fully ringed and is only short of built tiles — fill ' +
      'those and it counts. Press G again to turn it off.');
    Rend.rebakeAll(G.s);
    Rend._overlayDirty = true;
  },

  toggleOverlays() {
    const btn = document.getElementById('btn-overlay');
    const salt = UI.saltActive(G.s);
    const head = Econ.cascadeActive(G.s);
    if (!Rend.showWater && !Rend.showSoil && !Rend.showHead) {
      Rend.showWater = true; Rend.showPower = true; Rend.showSoil = false; Rend.showHead = false;
      if (btn) { btn.classList.add('active'); btn.textContent = 'Coverage'; }
      UI.firstToast('overlaycov', 'Coverage overlay: blue = watered ground.' +
        (head ? ' Press O again for the HEAD MAP — which way the ground falls.'
              : salt ? ' Press O again for the SALT map.' : ' Press O again to turn it off.'));
    } else if (Rend.showWater && head) {
      Rend.showWater = false; Rend.showPower = false; Rend.showSoil = false; Rend.showHead = true;
      if (btn) { btn.classList.add('active'); btn.textContent = 'Head map'; }
      UI.firstToast('overlayhead', '\u{1F30A} Head map: DARK is low ground and PALE is high. Head runs ' +
        'from a Diversion Gate to any tile level with the last one or ONE STEP BELOW it, and never a ' +
        'step above — so a ditch has to go from pale to dark, one shade at a time.');
    } else if ((Rend.showWater || Rend.showHead) && salt) {
      Rend.showWater = false; Rend.showPower = false; Rend.showHead = false; Rend.showSoil = true;
      if (btn) { btn.classList.add('active'); btn.textContent = 'Salt map'; }
      UI.firstToast('overlaysalt', 'Salt map: the whiter a tile, the more the salt has taken it. Fields fade as they crop; fallow, middens, shadufs and water bring them back.');
    } else {
      Rend.showWater = false; Rend.showPower = false; Rend.showSoil = false; Rend.showHead = false;
      if (btn) { btn.classList.remove('active'); btn.textContent = 'Coverage'; }
    }
    Rend.rebakeAll(G.s);
    Rend._overlayDirty = true;
  },

  themeFor(era) {

    if (era <= 0) return 'cretaceous';
    if (era === 1) return 'glacial';

    if (era === 2) return 'oregorge';

    if (era === 3) return 'ridge';
    if (era <= 4) return 'anunnaki';

    if (era === 6) return 'indus';

    if (era === 7) return 'aegean';

    if (era === 8) return 'shang';

    if (era === 9) return 'oceanic';
    if (era <= 9) return 'egypt';

    if (era === 10) return 'attic';

    if (era === 11) return 'republic';
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

    nofood: 'Every house is full — and this city is growing NO food. More housing would only add ' +
          'mouths to a larder nothing is refilling.',
    blocked: 'Your housing has no road access or no water, so nobody will move in.',

    cold: 'The camp is freezing, so nobody new is arriving. Feed the fires — cut wood, burn bone, ' +
          'stop selling charcoal — and cover every home with a hearth circle.',

    nopassage: 'Your houses are ready and empty — a citizen of this city is SENT, and you have no ' +
          'crossings left to send one on. Cut pine and run a Shipyard: a berth is spent the moment ' +
          'somebody steps off the boat.',
  },

  migrateHint(why) {
    if (why === 'hungry') {
      return 'The ' + eraVoice(G.s.era).place + ' is hungry, so nobody new is arriving. People will hold on for up to ' +
        TUNE.STARVE_MINUTES + ' minutes — ' + eraStaple(G.s.era).hungerFix + ' before then.';
    }

    if (why === 'nofood') {
      return UI.MIGRATE_HINT.nofood + ' Before you add another bed: ' +
        eraStaple(G.s.era).hungerFix + '.';
    }
    return UI.MIGRATE_HINT[why] || UI.MIGRATE_HINT.ok;
  },

  BUILD: '2026-07-28.6-depthwave',

  literate(s) { return !!(s && s.literate); },
  UNLIT: '—',

  perMin(rate) { return Util.fmtNum((rate || 0) * 60); },

  dressChrome(s) {
    const R = eraRecord(s.era);
    const t = UI.els.tallyBtn;
    if (t) { t.textContent = R.tallyBtn; t.title = R.tally + ' — what this city produces (T)'; }
    const c = document.getElementById('btn-chron');
    if (c) { c.textContent = R.chronBtn; c.title = R.chronicle + ' — this city’s own history (C)'; }
  },

  updateHUD(s) {
    const C = G.cache;
    const lit = UI.literate(s);
    const theme = UI.themeFor(s.era);
    if (document.body.dataset.eraTheme !== theme) document.body.dataset.eraTheme = theme;

    if (UI._dressedEra !== s.era) { UI._dressedEra = s.era; UI.dressChrome(s); }
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
        UI.els.net.title = 'Includes the founding ration: +$' + TUNE.FOUNDING.perMinute +
          '/min while it lasts, and $' + Math.round(s.foundingLeft) +
          ' of it is left. Build your craft chains before it runs out.';
      }
    } else {
      UI.els.net.textContent = 'no tally kept';
      UI.els.net.className = 'hud-sub gold-dim';
      UI.els.net.title = 'Nobody is writing anything down. Build ' + eraRecord(s.era).keeper + ' to see rates.';
    }

    if (UI.els.cp) UI.els.cp.parentElement.style.display = 'none';
    if (UI.els.builders) UI.els.builders.parentElement.style.display = 'none';

    const ri = Econ.rentInfo(s);
    UI.els.rent.innerHTML = '<span class="rent-dim">Standing </span>' + ri.section +
      '<span class="rent-dim"> / ' + ri.sections + '</span>';
    UI.els.rent.classList.remove('locked-rent');

    const rateEl = UI.els['rent-rate'];
    if (rateEl) {
      rateEl.style.display = 'block';
      rateEl.textContent = ri.section >= ri.sections
        ? 'this age is fully built'
        : '+' + Math.ceil(ri.toNext) + ' to ' + (ri.section + 1);
    }

    const rentChip = UI.els.rent.parentElement;
    if (rentChip) {
      rentChip.title = 'City standing — section ' + ri.section + ' of ' + ri.sections +
        ' for this age. ' + Math.round(ri.rp) + ' points from ' + ri.working +
        ' working buildings and ' + ri.monuments + ' monument' +
        (ri.monuments === 1 ? '' : 's') +
        (ri.idle ? ', with ' + ri.idle + ' idle and earning nothing' : '') +
        '. Click the ' + anchorFor(s.era).name + ' for how it is earned.';
    }

    const housed = Game.housedResidents(s), crew = Game.totalResidents(s) - housed;
    UI.els.pop.textContent = housed + ' / ' + Game.totalCapacity(s) +
      (crew > 0 ? ' +' + crew : '');
    const chip = UI.els.pop.parentElement;
    if (chip) {
      const why = C.migrateWhy;
      chip.title = (crew > 0
        ? 'The band: ' + crew + ' at the ' + anchorFor(s.era).name +
          ' who need no beds and cannot die, plus ' + housed + ' housed. ' +
          'The era gate counts the HOUSED only. '
        : '') + UI.migrateHint(why);
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

    const ST = eraStaple(s.era);
    const RAW = ST.raw, COOKED = ST.cooked;
    const gIco = UI.els.grain.parentElement && UI.els.grain.parentElement.querySelector('.res-ico');
    const fIco = UI.els.flour.parentElement && UI.els.flour.parentElement.querySelector('.res-ico');
    if (gIco) gIco.textContent = ST.rawIcon;
    if (fIco) fIco.textContent = ST.cookedIcon;
    UI.els.grain.textContent = Util.fmtNum(s.stock[RAW] || 0) + ' / ' + Econ.capOf(s, RAW);
    UI.els.flour.textContent = Util.fmtNum(s.stock[COOKED] || 0) + ' / ' + Econ.capOf(s, COOKED);

    if (lit) {
      const made = (C.tally[COOKED] && C.tally[COOKED].made) || 0;
      const demandMin = Game.totalResidents(s) * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO;
      const fchip = UI.els.flour.parentElement;
      if (fchip) {
        const bal = made - demandMin;
        fchip.title = ST.cookedName + ': ' + ST.cookedVerb + ' +' + Util.fmtNum(made) +
          '/min · eaten −' + Util.fmtNum(demandMin) +
          '/min → ' + (bal >= 0 ? 'surplus +' : 'SHORT −') + Util.fmtNum(Math.abs(bal)) + '/min' +
          (bal < 0 ? '. ' + ST.shortNote : '');
        fchip.classList.toggle('bad', bal < -0.05 && demandMin > 0);
      }

      const gchip = UI.els.grain.parentElement;
      if (gchip) {
        const gd = C.grainDrawAvg || {};
        const made2 = (C.tally[RAW] && C.tally[RAW].made) || 0;
        const draws = [];
        if (gd.mill > 0.005) draws.push('mills −' + Util.fmtNum(gd.mill));
        if (gd.brewery > 0.005) draws.push('breweries −' + Util.fmtNum(gd.brewery));
        if (gd.oxen > 0.005) draws.push('oxen −' + Util.fmtNum(gd.oxen));
        if (gd.dole > 0.005) draws.push('the dole −' + Util.fmtNum(gd.dole));
        gchip.title = ST.rawName + ': +' + Util.fmtNum(made2) + '/min from ' + ST.rawFrom +
          (draws.length ? ' · ' + draws.join(' · ') : '') +
          (ST.rawNote ? ' — ' + ST.rawNote : '');
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
      if (h > 0.01) pchip.title = UI.migrateHint(C.migrateWhy) +
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
        UI._migStrip.querySelector('#mig-msg').textContent = '\u{1F6B6} ' + UI.migrateHint(why);
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

    const showSilt = Econ.canalActive(s);
    if (UI.els.siltChip) {
      UI.els.siltChip.classList.toggle('hidden', !showSilt);
      UI.els.siltChip.style.display = showSilt ? '' : 'none';
    }
    if (showSilt && UI.els.silt) {
      const f = Econ.siltForecast(s);
      let txt = Math.round(f.silt * 100) + '%';
      if (f.secs !== Infinity && f.secs < 3600) txt += ' · ' + Math.round(f.secs) + 's';
      UI.els.silt.textContent = txt;
      UI.els.siltChip.classList.toggle('bad', f.silt >= 0.75);
      UI.els.siltChip.classList.toggle('warn', f.silt < 0.75 && (f.silt >= TUNE.SILT.warnAt || f.secs < 180));
      UI.els.siltChip.title = 'The canals are ' + Math.round(f.silt * 100) + '% silted. ' +
        Econ.siltSources(s) + ' wells lay down ' + (f.gain * TUNE.TEMPO).toFixed(2) +
        '/min; your dredging crews clear ' + (f.clear * TUNE.TEMPO).toFixed(2) + '/min — ' + f.text +
        '. Every well reaches ' + Math.round(Econ.canalReach(s) * 100) + '% of its range at this level. ' +
        'One Dredging Crew per two wells keeps it open; another WELL makes it worse.';
    }

    const showLevy = Econ.levyActive(s);
    for (const el of [UI.els.levyChip, UI.els.unrestChip]) {
      if (!el) continue;
      el.classList.toggle('hidden', !showLevy);
      el.style.display = showLevy ? '' : 'none';
    }
    if (showLevy && UI.els.levy) {
      const f = Econ.levyForecast(s);
      const mm = Math.floor(f.secs / 60), ss = Math.round(f.secs % 60);
      UI.els.levy.textContent = f.missed
        ? 'MISSED \u{00D7}' + f.missed
        : Math.round(f.bank) + ' / ' + Math.round(f.quota) + ' \u{00B7} ' +
          mm + ':' + (ss < 10 ? '0' : '') + ss;
      UI.els.levyChip.classList.toggle('bad', f.missed > 0);
      UI.els.levyChip.classList.toggle('warn', !f.missed && f.short > 0 && f.secs < 60);
      UI.els.levyChip.title = 'Count ' + f.count + ' wants ' + Math.round(f.quota) +
        ' gold and ' + Math.round(f.bank) + ' is weighed' +
        (f.short > 0 ? ' \u{2014} SHORT BY ' + Math.round(f.short) + ', which the Hall will sell you for ' +
          Util.fmtMoney(Econ.levyBuyoutPrice(s, f.short)) : ' \u{2014} covered') +
        '. Called in ' + mm + 'm ' + ss + 's. The next count wants ' +
        Math.round(Econ.levyQuota(f.count)) + '. ' +
        (Econ.levyYardLive(s) ? '' : '\u{2605} NOTHING IS BEING CREDITED: the masters skim whether the ' +
          'Tribute Yard runs or not, but the quota only counts what a staffed, connected Yard weighs.');
    }
    if (showLevy && UI.els.unrest) {
      const U = TUNE.UNREST, u = s.unrest || 0;
      UI.els.unrest.textContent = Math.round(u * 100) + '%' +
        (s.conscripted ? ' \u{00B7} ' + s.conscripted + ' taken' : '');
      UI.els.unrestChip.classList.toggle('bad', u >= U.strikeAt);
      UI.els.unrestChip.classList.toggle('warn', u < U.strikeAt && u >= U.conscriptAt);
      UI.els.unrestChip.title = s.struck
        ? 'THE PICKS ARE DOWN. "We have put a stop to the digging." Nothing on the ridge is working ' +
          'and nothing will start it again. The age can turn.'
        : 'Unrest ' + Math.round(u * 100) + '%. Every missed count adds ' +
          Math.round(U.missed * 100) + '; settling one takes off ' + Math.round(-U.paid * 100) +
          ', and overpaying by half again takes off ' + Math.round(-U.appeased * 100) + '. ' +
          'At ' + Math.round(U.conscriptAt * 100) + '% they start taking people (' +
          (s.conscripted | 0) + ' so far). At ' + Math.round(U.strikeAt * 100) +
          '% the mines slow \u{2014} and ONLY the mines: bread, charcoal, pitch, limestone and hair ' +
          'keep full speed, which is what pays for the buyout.';
    }

    const showRange = Econ.rangeActive(s);
    if (UI.els.rangeChip) {
      UI.els.rangeChip.classList.toggle('hidden', !showRange);
      UI.els.rangeChip.style.display = showRange ? '' : 'none';
    }
    if (showRange && UI.els.range) {
      const h = Econ.forageHarvest(s);
      UI.els.range.textContent = Math.round(h.frac * 100) + '%' +
        (h.crowded > 0 ? ' · ' + h.crowded + '/' + h.camps : '');
      UI.els.rangeChip.classList.toggle('bad', h.frac < TUNE.FORAGE.badAt);
      UI.els.rangeChip.classList.toggle('warn',
        h.frac >= TUNE.FORAGE.badAt && h.frac < TUNE.FORAGE.warnAt);

      const lost = Object.keys(h.lost).filter(k => h.lost[k] > 0.0005)
        .sort((a, b) => h.lost[b] - h.lost[a])
        .map(k => (h.lost[k] * TUNE.TEMPO).toFixed(2) + ' ' + goodLabel(s.era, k) + '/min');
      UI.els.rangeChip.title = h.crowded === 0
        ? 'Every camp has its ground to itself. ' + h.camps + ' camp' + (h.camps === 1 ? '' : 's') +
          ', all at full yield. Two camps of the SAME KIND within reach of each other split what is ' +
          'there — different kinds never interfere.'
        : h.crowded + ' of ' + h.camps + ' camps are sharing ground. You are losing ' +
          (lost.join(', ') || 'nothing measurable') + ' to camps working the same ground as each other. ' +
          'Two take two thirds each, three take a half, four take 40%. NOTHING HERE RECOVERS BY ' +
          'WAITING and no building cures it — move them apart, or buy the ring.' +
          (s.policyMoveCamps ? ' The Moving Camp is ON: half the reach, ' +
            Math.round(TUNE.MOVING.slow * 100) + '% less work.' : '');
    }

    const showRoll = Econ.magazineActive(s);
    if (UI.els.rollChip) {
      UI.els.rollChip.classList.toggle('hidden', !showRoll);
      UI.els.rollChip.style.display = showRoll ? '' : 'none';
    }
    if (showRoll && UI.els.roll) {
      const r = Econ.rationForecast(s);
      UI.els.roll.textContent = r.billable
        ? r.administered + '/' + r.billable + (r.short ? ' ⚠' + r.short : ' +' + r.room)
        : '—';

      UI.els.rollChip.classList.toggle('bad', r.short > 0);
      UI.els.rollChip.classList.toggle('warn', r.short === 0 && r.room === 0 && r.billable > 0);
      const wide = G.cache.wideIssue
        ? ' The Wide Issue is PAYING: every disc reaches ' + TUNE.WIDEISSUE.widen +
          ' tiles further and every ration is ' + TUNE.WIDEISSUE.mult + '×.'
        : (s.policyWideIssue ? ' The Wide Issue is ON BUT NOT PAYING — not enough oil in the ' +
            'magazine to hold the doubled ration, so the discs are back to their own reach.' : '');
      UI.els.rollChip.title = (r.mags === 0
        ? 'NO MAGAZINE YET. Nothing that produces or ships will run until one stands — build a Villa ' +
          'Magazine and put your workshops inside its seven tiles.'
        : r.administered + ' of ' + r.billable + ' producers are on the roll' +
          (r.short ? ', and ' + r.short + ' ' + (r.short === 1 ? 'is' : 'are') +
            ' off it — the furthest from a magazine go first. Make more oil, or mothball something.'
                   : ', with room for ' + r.room + ' more.') +
          ' The ration is ' + TUNE.MAGAZINE.issuePer.oil + ' oil and ' +
          TUNE.MAGAZINE.issuePer.dates + ' figs per building per minute; the first ' +
          TUNE.MAGAZINE.freeAdmin + ' are carried free. ' +
          (r.bind ? 'The ' + goodLabel(s.era, r.bind) + ' is what is binding right now.' : '') +
          (r.secs > 0 ? ' At this draw the magazine holds the roll for ' + Math.round(r.secs) +
            's if production stopped.' : '')) + wide;
    }

    const showHead = Econ.cascadeActive(s);
    if (UI.els.headChip) {
      UI.els.headChip.classList.toggle('hidden', !showHead);
      UI.els.headChip.style.display = showHead ? '' : 'none';
    }
    if (showHead && UI.els.head) {
      const h = Econ.cascadeForecast(s);
      UI.els.head.textContent = h.drawers
        ? (h.drawers - h.dry) + '/' + h.drawers + (h.dry ? ' ⚠' + h.dry : ' +' + h.spare.toFixed(1))
        : '—';

      UI.els.headChip.classList.toggle('bad', h.dry > 0);
      UI.els.headChip.classList.toggle('warn',
        h.dry === 0 && h.drawers > 0 && h.spare < TUNE.CASCADE.warnSpare);
      const revet = G.cache.revetAdd
        ? ' The Revetted Ditch Order is PAYING: every gate emits ' + TUNE.REVET.add.toFixed(1) +
          ' more.'
        : (s.policyRevet ? ' The Revetted Ditch Order is ON BUT NOT PAYING — no blocks in store, so ' +
            'every sluice is back to its own head.' : '');
      UI.els.headChip.title = (h.gates === 0
        ? 'NO DIVERSION GATE YET. A Bunded Rice Field does not want a well — it wants a gate above it, ' +
          'and a run of Field Ditches that only ever goes downhill.'
        : h.gates + (h.gates === 1 ? ' gate emits ' : ' gates emit ') + h.emitted.toFixed(1) +
          ' head a minute; ' + (h.drawers - h.dry) + ' of ' + h.drawers + ' bunds draw ' +
          h.drawn.toFixed(1) + '. Spare ' + h.spare.toFixed(1) + ' — ' +
          (h.spare >= TUNE.CASCADE.warnSpare
            ? 'room for one more field somewhere on the fan.'
            : 'NOT ENOUGH FOR ANOTHER FIELD. Upgrade a gate to a King\'s Weir, or find a second fall.') +
          (h.dry ? ' ' + h.dry + ' bund' + (h.dry === 1 ? ' is' : 's are') + ' running on rain at ' +
            Math.round(TUNE.CASCADE.dryYield * 100) + '% — click the amber marker and it names the ' +
            'tile the run broke at.' : '')) + revet;
    }

    const showReach = Econ.reachActive(s);
    if (UI.els.reachChip) {
      UI.els.reachChip.classList.toggle('hidden', !showReach);
      UI.els.reachChip.style.display = showReach ? '' : 'none';
    }
    if (showReach && UI.els.reach) {
      const r = Econ.reachForecast(s);
      UI.els.reach.textContent = r.landings
        ? r.best + 'T · ' + r.open + (r.landfalls < r.need ? ' · ' + r.landfalls + '/' + r.need : '')
        : '—';

      UI.els.reachChip.classList.toggle('bad', r.landings === 0);
      UI.els.reachChip.classList.toggle('warn', r.landings > 0 && r.open === 0);
      const lash = G.cache.lashAdd
        ? ' The Lashing Order is PAYING: every Landing crosses ' + TUNE.LASH.add + ' further.'
        : (s.policyLash ? ' The Lashing Order is ON BUT NOT PAYING — no sennit in store, so every ' +
            'hull is back to its own reach.' : '');
      UI.els.reachChip.title = (r.landings === 0
        ? 'NO CANOE LANDING YET. Land across the water is drawn and priced and will not sell. A Canoe ' +
          'Landing on your own shore — touching open sea, needing no road and no spring — opens every ' +
          'shore within ' + TUNE.VOYAGE.range + ' tiles of water as ground you may buy.'
        : r.landings + (r.landings === 1 ? ' landing crosses ' : ' landings cross ') + r.best +
          ' tiles of open water' + (r.court ? ' (including the Court\'s +' + r.courtAdd + ')' : '') +
          ', and that opens ' + r.open + ' parcel' + (r.open === 1 ? '' : 's') +
          ' ordinary sprawl cannot reach. ' +
          (r.open === 0
            ? 'NOTHING NEW IS OPEN. Build a WAYFINDING COURT (+' + TUNE.VOYAGE.courtBonus +
              ' to every Landing at once), rank a Landing (+' + TUNE.VOYAGE.rangePerRank +
              ' a rank), or put a Landing on a shore that faces the island you want.'
            : 'A landfall costs ' + (r.court ? TUNE.VOYAGE.courtLandfall : TUNE.VOYAGE.landfallMult) +
              '× the ordinary parcel price — and it is yours permanently.')) +
        ' — ' + r.landfalls + ' of ' + r.need + ' crossings made this age.' + lash;
    }

    const showTable = Econ.opsonActive(s);
    if (UI.els.tableChip) {
      UI.els.tableChip.classList.toggle('hidden', !showTable);
      UI.els.tableChip.style.display = showTable ? '' : 'none';
    }
    if (showTable && UI.els.table) {
      const t = Econ.opsonTable(s);
      const pct = Math.round(t.laid * 100);
      const shortName = t.missing.length ? t.missing[0].name
                      : (t.soon ? t.soon.name : null);
      const mm = Math.floor(t.secs / 60), ss = Math.round(t.secs % 60);
      const clock = (t.missing.length || !isFinite(t.secs)) ? ''
                  : ' ' + mm + ':' + (ss < 10 ? '0' : '') + ss;
      UI.els.table.textContent = pct + '%' +
        (pct >= 100 ? '' : ' \u{00B7} ' + (shortName || '?').toLowerCase() + clock);

      const short = t.laid < 0.999;

      const doomedLegs = t.legs.filter(l => l.coverEquiv > 0.0001 &&
        l.secs < TUNE.OPSON.warnSecs && (t.met - l.share) < 0.999);
      const doom = doomedLegs.length
        ? doomedLegs.reduce((a, b) => a.secs < b.secs ? a : b) : null;
      const doomed = !!doom;
      UI.els.tableChip.classList.toggle('bad', short && t.missing.length > 0);
      UI.els.tableChip.classList.toggle('warn',
        !(short && t.missing.length > 0) &&
        (doomed || (short && (t.missing.length === 0 || t.secs < TUNE.OPSON.warnSecs))));

      const clockOf = (secs) => {
        const n = Math.round(secs);
        if (!isFinite(n) || n >= 5940) return 'plenty';
        return Math.floor(n / 60) + 'm' + (n % 60 < 10 ? '0' : '') + (n % 60) + 's';
      };
      const legs = t.legs.map(l => l.name + ' ' + Math.round(l.share * 100) + '%' +
        (l.coverEquiv <= 0.0001 ? ' (none)' : ' (' + clockOf(l.secs) + ')')).join(' \u{00B7} ');
      const ceiling = Math.round(stapleCap(s) * 100);
      UI.els.tableChip.title =
        'YOUR TABLE IS ' + pct + '% LAID. ' + legs + '.' +

        (!short

          ? (doomed
              ? ' \u{2014} laid, but not for long: the ' + doom.name.toUpperCase() +
                ' leg empties in ' + clockOf(doom.secs) +
                ' and there is not enough of the rest to cover it.'
              : t.missing.length
                ? ' \u{2014} laid in full, with no ' +
                  t.missing.map(l => l.name.toLowerCase()).join(' and no ') +
                  ' on it at all. The four ceilings come to 125% of a meal, so one leg is always spare.'
                : ' \u{2014} every leg is stocked.')
          : t.missing.length
            ? ' \u{2014} YOUR TABLE HAS NO ' + t.missing.map(l => l.name.toUpperCase()).join(' AND NO ') +
              ' ON IT, and no amount of bread will stand in: a BEAN & LENTIL PLOT or a FIG TERRACE ' +
              'needs no water, no road and nothing off a quay, and either one closes a whole quarter.'
            : ' \u{2014} the ' + (t.soon ? t.soon.name.toLowerCase() : 'shortest leg') +
              ' runs out first.') +
        ' Bread may cover ' + ceiling + '% of it' +
        (s.policyPublicTable ? ' (THE PUBLIC TABLE is keeping the common mess, +' +
          Math.round(TUNE.OPSON.lawStaple * 100) + ' points, and every shop moves ' +
          Math.round(TUNE.OPSON.lawShopCut * 100) + '% fewer goods for it)'
         : (s.giftTable ? ' (the Parthenon’s reckoning is worth +' +
             Math.round(TUNE.OPSON.giftStep * 100 * (s.giftTable | 0)) + ')' : '')) +
        '; everything else is capped at ' + Math.round(TUNE.OPSON.other * 100) + '%. ' +
        'A city that specialises is a city that is half fed with every store full.';
    }

    const showGrid = Econ.gridActive(s);
    if (UI.els.gridChip) {
      UI.els.gridChip.classList.toggle('hidden', !showGrid);
      UI.els.gridChip.style.display = showGrid ? '' : 'none';
    }

    const showCensus = Econ.censusActive(s);
    if (UI.els.censusChip) {
      UI.els.censusChip.classList.toggle('hidden', !showCensus);
      UI.els.censusChip.style.display = showCensus ? '' : 'none';
    }
    if (showCensus && UI.els.census) {
      const c = Econ.censusState(s);
      const mm = Math.floor(c.ageSecs / 60), ss = Math.round(c.ageSecs % 60);
      const age = mm + 'm' + (ss < 10 ? '0' : '') + ss + 's';
      UI.els.census.textContent = c.counted + (c.uncounted > 0 ? ' · +' + c.uncounted : '') +
        ' · ' + age;
      UI.els.censusChip.classList.toggle('bad', false);
      UI.els.censusChip.classList.toggle('warn', c.warn);
      const gateShort = c.frac < TUNE.CENSUS.gateFrac;
      UI.els.censusChip.title =
        c.counted + ' citizen' + (c.counted === 1 ? '' : 's') + ' on the register · ' +
        c.mouths + ' mouth' + (c.mouths === 1 ? '' : 's') + ' in the city · the roll is ' +
        age + ' old · a lustrum costs ' + Util.fmtMoney(c.cost) + '.' +
        (c.uncounted > 0

          ? ' — ' + c.uncounted + ' HEAD' + (c.uncounted === 1 ? '' : 'S') +
            ' ARE EATING AND NOT BUYING. They are housed, fed, staffed and working; ' +
            'the state simply cannot see them, so no shop sells to them, the Aerarium ' +
            'collects nothing from them and the era gate does not count them.'
          : ' — every mouth in the city is on the register.') +
        (gateShort
          ? ' The age turns at ' + Math.round(TUNE.CENSUS.gateFrac * 100) +
            '% counted; you are at ' + Math.round(c.frac * 100) + '%.'
          : '') +
        ' Order it at the Hall. ' + (c.offices
          ? c.offices + ' record office' + (c.offices === 1 ? '' : 's') + ' at work, so a head costs $' +
            c.perHead.toFixed(2) + ' instead of $' + TUNE.CENSUS.per.toFixed(2) + '.'
          : 'A TABULARIUM takes 25% off the per-head cost; two is the ceiling.') +

        ' A head costs $' + c.perHead.toFixed(2) + ' and the fee is $' + TUNE.CENSUS.base +
        ' whatever happens, so under ' + Math.round(TUNE.CENSUS.base / c.perHead) +
        ' heads most of what you pay is the fee. IT COUNTS HOUSES, NOT PEOPLE — ' +
        'the cheapest minute to enter a new quarter is the one it goes up in.';
    }

    const showPassage = Econ.passageActive(s);
    if (UI.els.passageChip) {
      UI.els.passageChip.classList.toggle('hidden', !showPassage);
      UI.els.passageChip.style.display = showPassage ? '' : 'none';
    }
    if (showPassage && UI.els.passage) {
      const p = Econ.passageState(s);
      UI.els.passage.textContent = p.left + (p.short > 0 ? ' · −' + p.short : '') +
        (p.rate > 0 ? ' · +' + p.rate.toFixed(1) : '');
      UI.els.passageChip.classList.toggle('bad', p.left < 1);
      UI.els.passageChip.classList.toggle('warn', p.left >= 1 && p.warn);
      const landed = Math.max(0, (s.cum.passage || 0) - ((s.eraBase && s.eraBase.passage) || 0));
      UI.els.passageChip.title =
        p.left + ' crossing' + (p.left === 1 ? '' : 's') + ' in the store · ' +
        p.open + ' bed' + (p.open === 1 ? '' : 's') + ' standing open · the yards land ' +
        p.rate.toFixed(1) + ' a minute.' +
        (p.left < 1

          ? ' — NOBODY IS COMING. Your houses are built, fed, watered and reached, ' +
            'and there is no berth to seat anyone on. Every minute one stands empty ' +
            'is a minute of rent, custom and labour you are paying ground rent for ' +
            'and not collecting.'
          : p.short > 0
            ? ' — YOU HAVE OPENED ' + p.short + ' MORE BED' + (p.short === 1 ? '' : 'S') +
              ' THAN YOU CAN FILL. Nothing is wrong yet; the store simply runs out ' +
              'before the street does.'
            : ' — every open bed in the city has a crossing waiting for it.') +
        ' The age turns at ' + TUNE.PASSAGE.gateLanded + ' crossings landed; you have landed ' +
        Math.round(landed) + '.';
    }

    const showAnnona = Econ.annonaActive(s);
    if (UI.els.annonaChip) {
      UI.els.annonaChip.classList.toggle('hidden', !showAnnona);
      UI.els.annonaChip.style.display = showAnnona ? '' : 'none';
    }
    if (showAnnona && UI.els.annona) {
      const a = Econ.annonaState(s);
      UI.els.annona.textContent = '×' + a.premium.toFixed(1) +
        (a.bill > 0 ? ' · $' + Math.round(a.bill * TUNE.TEMPO) : '') +
        (a.short > 0.001 ? ' · −' + a.short.toFixed(1) : '');
      UI.els.annonaChip.classList.toggle('bad', a.bad);
      UI.els.annonaChip.classList.toggle('warn', !a.bad && a.warn);

      const cover = (a.bill > 0 && isFinite(a.secs))
        ? ' The treasury carries this bill for ' +
          (a.secs >= 90 ? Math.round(a.secs / 60) + ' minutes' : Math.round(a.secs) + ' seconds') + '.'
        : '';
      UI.els.annonaChip.title =
        'Buying ' + a.need.toFixed(1) + ' rations a minute against works that land ' +
        a.cap.toFixed(1) + ' — ×' + a.premium.toFixed(2) + ', $' +
        Math.round(a.bill * TUNE.TEMPO) + ' a minute.' + cover +
        (a.bad

          ? ' — THE SHIPS ARE SHORT ' + a.short.toFixed(1) + ' A MINUTE AND IT IS NOT A ' +
            'HARVEST PROBLEM. There is bread to be had and this city cannot pay for it. ' +
            'Sell something, or grow it yourself.'
          : a.warn
            ? ' — YOU HAVE OUTGROWN YOUR LANDINGS. Nothing is failing yet; the whole ' +
              'shipment is simply repricing, and it reprices again with every house. ' +
              'A STATIO ANNONAE lands 1.5 more a minute; a CENTURIATED FIELD means you ' +
              'do not have to buy it at all.'
            : ' — your landings keep up, so the grain costs the fair price.') +

        (G.cache.fleetLift
          ? ' THE STANDING FLEET IS PAYING: those landings include +' +
            Math.round(TUNE.FLEET.lift * 100) + '%, bought with ' +
            (a.got * TUNE.FLEET.perLanded * TUNE.TEMPO).toFixed(2) + ' sailcloth a minute.'
          : s.policyFleet
            ? ' The Standing Fleet is ON BUT NOT PAYING — no sailcloth on the shelf, so the ' +
              'landings above are the bare works. Weave more, or stop selling it.'
            : '') +
        ' Bought bread does NOT count toward the age gate: that leg is what you GREW.';
    }

    if (showGrid && UI.els.grid) {
      const g = Econ.gridForecast(s);
      UI.els.grid.textContent = Math.round(g.frac * 100) + '%' +
        (g.blocks ? ' · ' + g.inBlocks : '') +
        (g.atRiskBuildings > 0 ? ' · ⚠' + g.atRiskBuildings : '');

      const short = g.frac < TUNE.GRID.gateFrac;
      UI.els.gridChip.classList.toggle('bad', short && g.atRiskBuildings > 0);
      UI.els.gridChip.classList.toggle('warn',
        (short || g.atRiskBuildings > 0) && !(short && g.atRiskBuildings > 0));
      const swept = G.cache.swept
        ? ' The Sweeping Order is PAYING: every drain reaches ' + TUNE.SWEEP.radius + ' tiles.'
        : (s.policySweep ? ' The Sweeping Order is ON BUT NOT PAYING — no brick in store, so the ' +
            'drains are back to ' + TUNE.GRID.drainRadius + ' tiles.' : '');
      UI.els.gridChip.title = (g.blocks
        ? g.blocks + ' qualifying block' + (g.blocks === 1 ? '' : 's') + ', holding ' + g.inBlocks +
          ' building' + (g.inBlocks === 1 ? '' : 's') + ' at +' +
          Math.round(TUNE.GRID.bonus * 100) + '% output and −' +
          Math.round(TUNE.GRID.upkeepCut * 100) + '% upkeep. ' +
          Math.round(g.frac * 100) + '% of your built ground is planned; the age turns at ' +
          Math.round(TUNE.GRID.gateFrac * 100) + '%.'
        : 'NO BLOCKS YET. A rectangle 5–8 tiles a side, road on ALL FOUR SIDES, every tile inside it ' +
          'built, and the whole thing inside a Covered Drain’s reach.' +
          (g.best ? ' Closest: a ' + g.best.short + ' that is ' + g.best.missing +
            ' tile' + (g.best.missing === 1 ? '' : 's') + ' short of being filled.' : '')) +
        (g.atRiskBuildings > 0
          ? ' ⚠ ' + g.atRiskBuildings + ' of them are standing on a SINGLE drain — mothball or ' +
            'demolish it and they all stop counting at once.'
          : '') + swept;
    }

    const showHerd = Econ.trophicActive(s);
    if (UI.els.herdChip) {
      UI.els.herdChip.classList.toggle('hidden', !showHerd);
      UI.els.herdChip.style.display = showHerd ? '' : 'none';
    }
    if (showHerd && UI.els.herd) {
      const f = Econ.herdForecast(s);
      const ceil = Math.round(f.ceiling);
      let txt = f.head + (f.beds ? ' / ' + (f.grace > 0 ? f.beds : ceil) : '');
      if (f.grace > 0) txt += ' · ' + Math.ceil(f.grace) + 's';
      else if (f.empty >= 1) txt += ' · ' + f.empty + ' empty';
      UI.els.herd.textContent = txt;

      const starved = f.beds > 0 && ceil < f.beds * 0.75;
      UI.els.herdChip.classList.toggle('bad', !f.grace && starved);
      UI.els.herdChip.classList.toggle('warn', !f.grace && !starved && f.empty >= 1 &&
        f.head >= f.ceiling * TUNE.PRED.warnAt);

      const nests = s.buildings.filter(b => DEF(b.type) && DEF(b.type).cap && !b.mothballed);
      const c = nests.length ? Econ.nestCull(s, nests[0], f.head) : null;

      UI.els.herdChip.title = f.grace > 0
        ? 'Nothing is hunting yet — ' + Math.ceil(f.grace) + ' seconds of grace left. ' +
          'Camp in the OPEN before it starts: every tree within ' + TUNE.PRED.coverRadius +
          ' tiles of a shelter is cover for something.'
        : 'The camp holds ' + f.head + ' and this ground can carry about ' + ceil +
          '; you have ' + f.beds + ' places to sleep.' +
          (c ? '\ncover    ×' + c.coverMult.toFixed(2) + '   ' + Math.round(c.cover * 100) +
               '% of the ground within ' + TUNE.PRED.coverRadius + ' tiles is treed' +
               '\ndilution ×' + c.diluteMult.toFixed(2) + '   a small camp is watched harder — ' +
               f.head + ' people' +
               '\nsentinel ×' + c.sentinelMult.toFixed(2) + '   ' +
               (c.sentinelMult < 1 ? 'a Sentinel Knoll covers these shelters' : 'no Sentinel Knoll covers these shelters') +
               '\noffering ×' + c.offerMult.toFixed(2) + '   ' +
               (c.offerMult < 1 ? 'a Carrion Ground is supplied' : 'no Carrion Ground supplied') +
               (c.huddleMult < 1 ? '\nhuddle   ×' + c.huddleMult.toFixed(2) + '   the camp is packed in' : '')
             : '') +
          '\nPredators take ' + (f.take * TUNE.TEMPO).toFixed(1) + ' a minute. ' +
          'Another shelter does not help; open ground and a Sentinel Knoll do.';
    }

    const era = eraInfo(s.era);
    const ready = Econ.eraReady(s);
    UI.els.era.classList.toggle('ready', ready);

    UI.els.era.querySelector('.era-name').textContent =
      ready ? '⬆ THE AGE CAN TURN — click' : 'Era ' + s.era + ' · ' + era.name;

    if (!Econ.nextEra(s)) UI.els.eraBar.style.width = '100%';

    else if (Econ.trophicActive(s)) {
      const g = Econ.prologueGate(s);
      const f = Math.min((TUNE.PRED.stageSeconds - g.left) / TUNE.PRED.stageSeconds,
                         g.head / g.needHead);
      UI.els.eraBar.style.width = Math.round(Util.clamp(f, 0, 1) * 100) + '%';
    } else {
      const r = eraReq(s.era + 1);

      const base = s.eraBase || {};
      const site = s.buildings.find(b => DEF(b.type) && DEF(b.type).monument && defEra(DEF(b.type)) === s.era);
      const monFrac = Econ.monumentDone(s, s.era) ? 1
        : (site ? (Econ.monumentProgress(s, site) || {}).frac || 0 : 0);

      const f = Math.min(
        Game.housedResidents(s) / r.pop,
        Math.max(0, s.money) / r.money,
        Math.max(0, Econ.cumFood(s) - Econ.baseFood(base)) / r.food,
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
      '<p>You will start again on fresh ground with your ' + anchorFor(START_ERA).name + ' and ' +
      Util.fmtMoney(TUNE.START_MONEY) + '.</p>' +
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

      const ns = G.s;
      const eraName = eraInfo(ns.era).name;
      const ng = (typeof ERA_GUIDES !== 'undefined' && ERA_GUIDES[rungOf(ns.era)]) || null;
      const opener = ng && ng.firstSteps && ng.firstSteps.length ? ng.firstSteps[0] : '';
      UI.toast(eraName.toUpperCase() + '. A new world, and ' + Util.fmtMoney(TUNE.START_MONEY) +
        ' to start. ' + opener + ' Press G for the guide.', 16000);
      setTimeout(() => UI.promptNaming(), 900);
    };
    document.getElementById('reset-no').onclick = close;
  },

  promptAdvance(next) {
    const era = eraInfo(next);

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
      '<p>Advancing unlocks new buildings and upgrades, raises the ceiling on your ' +
      anchorFor(G.s.era).name + ', and increases real rent. Your city carries forward — nothing resets.</p>' +
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

  AMBER_STATUS: { understaffed: 1, resting: 1, flooded: 1, dry_season: 1,
                  halted: 1, building: 1, crowded: 1, no_head: 1 },

  statusText(b) {
    const M = {

      ok: ['RUNNING', 'good'], no_road: ['NO ROAD to ' + anchorFor(G.s.era).name, 'bad'],

      no_water: [Econ.canalActive(G.s) && (G.s.silt || 0) > 0.15
        ? 'THE CANALS ARE ' + Math.round((G.s.silt || 0) * 100) + '% SILTED — out of what the wells still reach'
        : G.cache.brownout ? 'BROWNED OUT — the tank is empty' : 'NO WATER coverage', 'bad'],
      no_power: ['NO POWER', 'bad'],

      no_magazine: [(() => {
        const s7 = G.s, r = Econ.rationForecast(s7), b7 = Input.selected;
        const covered = b7 && G.cache.magazine && Grid.covered(G.cache.magazine, b7);
        if (!covered) return r.mags === 0
          ? 'NO MAGAZINE ANYWHERE — nothing that produces or ships runs until one stands. A Villa Magazine administers 7 tiles'
          : 'OUTSIDE every magazine’s disc — build one nearer, or move this. Press O to see the discs';
        return 'ON THE GROUND BUT OFF THE ROLL — the palace is carrying ' + r.administered + ' of ' +
          r.billable + ' and this one is furthest from a magazine. ANOTHER MAGAZINE WILL NOT HELP: ' +
          'make more oil (a Press Room carries fifteen names), or mothball something you can spare';
      })(), 'bad'],
      no_block: [(() => {
        const g = Econ.gridForecast(G.s);
        if (g.best) return 'NOT IN A BLOCK — the nearest ' + g.best.short + ' is ' + g.best.missing +
          ' tile' + (g.best.missing === 1 ? '' : 's') + ' short of being filled';
        return 'NOT IN A BLOCK — it needs a rectangle 5–8 tiles a side with road on all four sides, ' +
          'every tile inside it built, and a Covered Drain in reach';
      })(), 'bad'],

      no_warmth: [G.cache.dark ? 'THE FIRES ARE DARK — no fuel' : 'OUTSIDE every hearth circle', 'bad'],

      stand_spent: [(() => {
        const b = Input.selected, d = b && DEF(b.type);
        if (d && d.out && d.out.deadwood) return 'NO TIMBER LEFT ANYWHERE IN REACH — every stand it can walk to is ash';
        if (d && d.rockRadius) return 'THE ROCK IS WORKED OUT — nothing left within ' + d.rockRadius + ' tiles. Move it';
        return 'WORKED OUT — nothing left in reach. Move it';
      })(), 'warn'],

      struck: ['THE PICKS ARE DOWN — this is a refusal, not a staffing problem. The age can turn', 'bad'],

      no_head: [(() => {
        const w = Econ.headWhy(G.s, Input.selected);
        return 'DRY — running on rain at ' + Math.round(TUNE.CASCADE.dryYield * 100) + '%. ' +
          (w || 'No head reaches it.');
      })(), 'warn'],
      no_staff: ['NO WORKERS available', 'bad'], understaffed: ['UNDERSTAFFED', 'warn'],
      no_input: ['NO INPUT in stock', 'bad'], no_customers: ['NOT ENOUGH CUSTOMERS', 'bad'],
      hungry: ['RESIDENTS HUNGRY', 'bad'],

      resting: ['RESTING — ground recovering', 'warn'],

      flooded: ['UNDER THE FLOOD — renewing', 'warn'],

      dry_season: ['THE DRY — collecting nothing', 'warn'],
      halted: ['HALTED — deliveries paused', 'warn'],
      building: ['UNDER CONSTRUCTION', 'warn'],

      crowded: [(() => {
        const b2 = Input.selected, n = (b2 && b2.forageCrowd) | 0;
        const m = Math.max(TUNE.FORAGE.floor, 1 / (1 + TUNE.FORAGE.crowd * n));
        const m2 = Math.max(TUNE.FORAGE.floor, 1 / (1 + TUNE.FORAGE.crowd * (n + 1)));
        return 'SHARING THIS GROUND with ' + n + ' other camp' + (n === 1 ? '' : 's') +
          ' of its kind — each takes ' + Math.round(m * 100) + '% of one camp. Another here would ' +
          'take it to ' + Math.round(m2 * 100) + '%. This does not recover by waiting; the fix is distance';
      })(), 'warn'],
    };
    const r = M[b.status] || ['—', ''];

    return [r[0], b.status === 'ok' ? 'good' : (UI.AMBER_STATUS[b.status] ? 'warn' : r[1])];
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
    } else if (d.warmRadius || d.waterRadius || d.soilRadius || d.amenityRadius || d.capRadius) {
      const rad = (d.warmRadius || d.waterRadius || d.soilRadius ||
                   d.amenityRadius || d.capRadius) + rankRadiusBonus(b);
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
        r + ' of ' + rankMax(G.s) + (rBits.length ? ' · ' + rBits.join(' · ') : ' (base)') +
        '</span></div>';
    }
    const row = (l, v) => '<div class="insp-row"><span>' + l + '</span><span>' + v + '</span></div>';

    const mrow = (l, v) => '<div class="insp-row"><span>' + l + '</span><span>' +
      (lit ? v : '<span class="gold-dim" title="No records kept — build ' + eraRecord(s.era).keeper + ' for the numbers">'
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

          perMin = Math.min(perMin, Econ.monumentRate(s, part.kind) * TUNE.TEMPO);
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
      rows += row('Rent points', monumentRP(defEra(d)) +
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

      if (Econ.trophicActive(s)) {
        const c = Econ.nestCull(s, b, Game.housedResidents(s));
        const taken = (c.frac * (b.residents || 0) * TUNE.TEMPO);
        rows += '<div class="insp-row"><span>Taken from this nest</span><span class="' +
          (c.coverMult > 1.2 ? 'bad' : taken > 0 ? 'warn' : '') + '">' +
          taken.toFixed(2) + ' head/min</span></div>';
        rows += '<div class="insp-row insp-note"><span>' +
          (c.cover > 0.15
            ? 'This nest sits in <b>' + Math.round(c.cover * 100) + '% cover</b> — the treeline within ' +
              TUNE.PRED.coverRadius + ' tiles is what takes the hatchlings. A <b>Sentinel Knoll</b>, ' +
              'or open ground, is the fix. <b>Another nest is not.</b>'
            : 'Open ground within ' + TUNE.PRED.coverRadius + ' tiles — this nest is about as safe as ' +
              'this age gets. A bigger colony is safer still: predators find a small herd more easily ' +
              'than a large one.') +
          '</span></div>';
      }

      const lvl = b.level || 1;
      rows += '<div class="insp-row"><span>Dwelling</span><span class="gold">' +
        houseLevelName(s.era, lvl, d) + ' <span class="gold-dim">(rung ' + lvl + ' of ' + HOUSE_MAX_LEVEL + ')</span></span></div>';

      let ladder = '';
      for (let i = 1; i <= HOUSE_MAX_LEVEL; i++) {
        const nm = houseLevelName(s.era, i, d);
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

      const crew = Game.crewSize(s);
      if (crew > 0) {

        const cc = G.cache || {};
        const st = cc.starter && BUILDINGS[cc.starter] ? DEF(cc.starter) : null;
        rows += '<div class="insp-row"><span>The founding band</span><span class="gold">' +
          crew + ' — no home needed</span></div>';
        if ((cc.crewHeld | 0) > 0 && st) {
          rows += '<div class="insp-row insp-note"><span>\u{1F525} ' + cc.crewHeld +
            ' of them wait by the fire. They will work nothing until a <b>' + st.name +
            '</b> stands — without it there is no fuel, and without fuel nothing here is warm ' +
            'enough to live in. Build that first; everything else can wait.</span></div>';
        } else if (st) {
          rows += '<div class="insp-row insp-note"><span>The band is at work. They can be put to ' +
            'anything now — the camp is founded.</span></div>';
        }
      }
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

          ((() => {
            const outs = s.buildings.filter(x => x.hunt);
            if (!outs.length) return '';
            const soon = Math.max(0, Math.min.apply(null, outs.map(x => x.hunt.left)));
            return ' <span class="gold-dim">· ' + outs.length + ' hunt' + (outs.length === 1 ? '' : 's') +
              ' out (next back in ' + soon + 's)</span>';
          })()) +
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
               : UI.migrateHint(why)) + '</span></div>';
    } else if (d.warmRadius) {

      rows += row('Warmth radius', (d.warmRadius + rankRadiusBonus(b)) + ' tiles');
      if (d.waterRadius) rows += row('Water radius', (d.waterRadius + rankRadiusBonus(b)) + ' tiles');
    } else if (d.waterRadius) {
      rows += row('Water radius', (d.waterRadius + rankRadiusBonus(b)) + ' tiles');
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
      rows += row('Soil recovery', '×' + TUNE.SOIL.middenBonus + ' within ' + (d.soilRadius + rankRadiusBonus(b)) + ' tiles');
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
      rows += '<div class="insp-row"><span>' + UI.esc(eraVoice(s.era).tally) + ' accounts</span><span class="' + (b.scribed ? 'good' : '') + '">' +
        (b.scribed ? '+' + Math.round(TUNE.SCRIBE.bonus * 100) + '% sales'
                   : 'none in range') + '</span></div>';

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
        ' tiles from the nearest market. Anything past ' + supplyFree(G.s) +
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

        ' title="' + UI.esc(goodLabel(s.era, imp.kind)) + ' lists at $' + TUNE.PRICES[imp.kind] + ' and exports at $' +

        (TUNE.PRICES[imp.kind] * exportMult(s)).toFixed(2) + ' — importing costs $' + imp.price +
        ' a ' + imp.unit + '. Ruinous on purpose: it is a famine valve, not a strategy.">' +
        '\u{1F6B6} Import ' + TUNE.IMPORT_GRAIN.units + ' ' + UI.esc(goodLabel(s.era, imp.kind).toLowerCase()) +
        ' — ' + Util.fmtMoney(impCost) + '</button>';
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

      if (Econ.censusActive(s)) {
        const cs = Econ.censusState(s);
        const current = cs.uncounted <= 0;
        const canCensus = !current && cs.afford;
        buttons += '<button id="insp-census" class="btn-primary" ' + (canCensus ? '' : 'disabled') +
          ' title="The censors close the roll: every household in the city is entered, and from ' +
          'that moment your shops sell to all of them, the Aerarium taxes all of them and the era ' +
          'gate counts all of them. Costs $' + TUNE.CENSUS.base + ' plus $' + cs.perHead.toFixed(2) +
          ' a head for the ' + cs.uncounted + ' not yet on it' +
          (cs.offices ? ' (' + cs.offices + ' record office' + (cs.offices === 1 ? '' : 's') +
            ' already taking 25% off each)' : '') +
          '. ★ IT COUNTS HOUSES, NOT PEOPLE, so the cheapest minute to enter a new quarter is the ' +
          'one it goes up in, while it is still empty. Under ' +
          Math.round(TUNE.CENSUS.base / cs.perHead) + ' heads most of what you pay is the flat ' +
          'fee. Waiting costs you nothing but the trade you are not doing.">' +
          (current
            ? '\u{1F3DB}\u{FE0F} The register is current — ' + cs.counted + ' counted'
            : '\u{1F3DB}\u{FE0F} Take the census — ' + cs.uncounted + ' uncounted, ' +
              Util.fmtMoney(cs.cost)) + '</button>';
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

            const live = ep.liveFlag ? !!G.cache[ep.liveFlag] : (G.cache.beerBonus || 0) > 0;
            buttons += '<div class="insp-row"><span>' + UI.esc(ep.name) + '</span><span class="' +
              (live ? 'good' : 'gold-dim') + '">' +
              (live
                ? (ep.liveFlag ? 'paying now' : 'paying +' + Math.round(G.cache.beerBonus * 100) + '% now')
                : ep.idle ? ep.idle
                  : ep.key === 'policyCorvee' ? 'idle — waits for the flood' : 'idle — nothing to ration')
              + '</span></div>';
          }
        }
      }
    }

    if (DEF(b.type).huntBase) {

      const autoOn = b.autoHunt !== false;
      buttons += '<button id="insp-autohunt" class="' + (autoOn ? 'btn-gold' : '') + '" title="' +

        (autoOn ? 'The camp sends its own hunts: only at odds of ' +
           Math.round(TUNE.HUNT.autoMinOdds * 100) + '% or better, never if it would ' +
           'leave fewer than ' + TUNE.HUNT.autoSpare + ' workers at home, never when the stores ' +
           'are too full to take the haul, and it rests between.'
                : 'The camp hunts only when you send it.') + '">' +
        (autoOn ? '\u{1F504} Hunting on its own' : '\u{270B} Hunts only when sent') + '</button>';

      if (b.hunt) {
        buttons += '<button class="btn-primary" disabled>\u{1F3F9} This camp\'s hunt is out — ' +
          Math.max(0, b.hunt.left) + 's · ' + b.hunt.party + ' hunters after the ' +
          Econ.HERD_NAMES[b.hunt.kind] + '</button>';
      } else {
        const t = Econ.nearestHerd(s, b);
        if (!t) {
          buttons += '<button class="btn-primary" disabled>\u{1F3F9} No herd within ' +
            TUNE.HUNT.range + ' tiles — watch the steppe</button>';
        } else {

          const odds = Econ.huntOdds(s, t.herd, t.dist, b);
          const cat = Econ.sabertoothNear(s, t.herd);

          const room = Econ.huntHaulRoom(s, t.herd.kind);
          buttons += '<button id="insp-hunt" class="btn-gold" title="' + TUNE.HUNT.party +
            ' hunters leave your labour pool for ' + TUNE.HUNT.ticks + 's. They can DIE out there — ' +
            'a failed hunt is more dangerous than a successful one, and a shadowing sabertooth is ' +
            'more dangerous than both.' +
            (room < 0.999 ? ' YOUR STORES CAN ONLY TAKE ' + Math.round(room * 100) +
              '% OF THIS HAUL — the rest is sold abroad at half price, and the animal is gone ' +
              'either way. Build a Frozen Cache first.' : '') + '">' +
            '\u{1F3F9} Send the hunt — ' + Econ.HERD_NAMES[t.herd.kind] + ', ' + Math.round(t.dist) +
            ' tiles · odds ' + Math.round(odds * 100) + '%' + (cat ? ' · \u{1F405} SHADOWED' : '') +
            (room < 0.999 ? ' · \u{26A0}\u{FE0F} STORES ' + Math.round(room * 100) + '%' : '') +
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
      if (r < rankMax(G.s)) {

        const disc = Econ.rankDiscount(s);
        const cost = Math.round(rankUpCost(d, r) * disc / 10) * 10;
        const can = s.money >= cost;
        const discNote = disc < 1 ? ' <small>(Tablet House −15%)</small>' : '';

        const isShop = !!(d.sells || d.sellsRaw);
        const isMaker = !!(d.out || d.procIn);
        const isRadius = !!(d.warmRadius || d.waterRadius || d.soilRadius || d.amenityRadius || d.capRadius);
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
          const rad = (d.warmRadius || d.waterRadius || d.soilRadius ||
                       d.amenityRadius || d.capRadius) + rankRadiusBonus(b);
          gainTxt = 'radius ' + rad + ' → ' + (rad + RANK.radiusPerRank);
          tip = 'Reaches one tile further in every direction — worth it when a second one would only ' +
            'cover ground you already have.';
        } else if (hasStore(d)) {

          gainTxt = '+' + Math.round(RANK.storePerRank * 100) + '% storage';
          tip = 'A ranked store holds +' + Math.round(RANK.storePerRank * 100) +
            '% of its base capacity per rank. No extra output, no extra radius, no extra workers.';
        } else if (d.keepsTally && TUNE.SCRIBE) {

          const srad = TUNE.SCRIBE.radius + rankRadiusBonus(b);
          gainTxt = 'radius ' + srad + ' → ' + (srad + RANK.radiusPerRank);
          tip = 'Keeps the accounts of shops one tile further out in every direction: +' +
            Math.round(TUNE.SCRIBE.bonus * 100) + '% sales at every counter it reaches.';
        } else if (d.fuelKeeper && TUNE.FIREKEEPER) {

          const now = TUNE.FIREKEEPER.save * (1 + 0.5 * (rankOf(b) - 1));
          const next = TUNE.FIREKEEPER.save * (1 + 0.5 * r);
          gainTxt = 'fuel −' + Math.round(now * 100) + '% → −' + Math.round(Math.min(0.9, next) * 100) + '%';
          tip = 'Better banking, better tending: the whole camp\'s fuel draw falls from −' +
            Math.round(now * 100) + '% to −' + Math.round(Math.min(0.9, next) * 100) +
            '%. It applies city-wide, not in a circle, so there is no ground to cover and ' +
            'a second Lodge adds nothing — this rank is its only progression.';
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

      const base = paidCost(b.type);
      const refund = Math.floor((base != null ? base : 100) * TUNE.DEMOLISH_REFUND);
      buttons += '<button id="insp-demolish" class="btn-danger">Demolish (+$' + refund + ')</button>';
    }

    const blurb = b.type === 'townhall' ? anchorFor(s.era).note

      : b.type === 'road' ? roadFor(s.era).desc
      : d.desc;

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
      UI.toast('\u{1F3DB}️ ' + anchorFor(s.era).name + ' is now chapter ' + s.hallLevel +
        ' — income floor and rent both raised.', 9000);
      UI.showInspector(b);
    };
    const autoBtn = document.getElementById('insp-autohunt');
    if (autoBtn) autoBtn.onclick = () => {
      b.autoHunt = b.autoHunt === false ? undefined : false;
      UI.toast(b.autoHunt === false
        ? '\u{270B} ' + d.name + ' will now hunt only when you send it.'
        : '\u{1F504} ' + d.name + ' will hunt on its own again.', 7000);
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
      if (r >= rankMax(G.s)) return;

      const cost = s.freeRank ? 0 : Math.round(rankUpCost(d, r) * Econ.rankDiscount(s) / 10) * 10;
      if (s.money < cost) return;
      if (s.freeRank) { s.freeRank = 0; UI.toast('⚙️ The Anunnaki\'s gift is spent — this rank cost nothing.', 8000); }
      s.money -= cost;
      b.rank = r + 1;
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

      const imp = eraImport(G.s.era);
      UI.toast('\u{1F6B6} ' + imp.who.charAt(0).toUpperCase() + imp.who.slice(1) + ' ' +
        TUNE.IMPORT_GRAIN.units + ' ' + goodLabel(G.s.era, imp.kind).toLowerCase() + ' for ' + Util.fmtMoney(paid) +
        ' — four times the fair price, and worth it in a famine.', 9000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };
    const fest = document.getElementById('insp-festival');
    if (fest) fest.onclick = () => {
      const r = Econ.declareFestival(G.s);
      if (r !== true) { if (typeof r === 'string') UI.toast('\u{1F37A} No festival: ' + r + '.'); return; }
      UI.toast('\u{1F37A} THE FESTIVAL OF NINKASI! Beer and cloth pour out, hunger falls at once, and word ' +
        'spreads down the river — settlers arrive at ' + TUNE.FESTIVAL.migMult + '× until ' +
        TUNE.FESTIVAL.settlers + ' newcomers have come.', 12000);
      UI.showInspector(b);
      UI.updateHUD(G.s);
    };

    const cen = document.getElementById('insp-census');
    if (cen) cen.onclick = () => {
      const before = Econ.censusState(G.s);
      const r = Econ.takeCensus(G.s);
      if (r !== true) { if (typeof r === 'string') UI.toast('\u{1F3DB}\u{FE0F} No lustrum: ' + r + '.'); return; }
      UI.toast('\u{1F3DB}\u{FE0F} THE CENSORS HAVE CLOSED THE ROLL. ' + before.mouths +
        ' citizens are on the register — ' + before.uncounted + ' of them for the first time. ' +
        'Every shop in the city sells to them from this tick, the Aerarium taxes them, and the ' +
        'era gate counts them.', 11000);
      Grid.rebuild(G.s);
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

        Grid.recomputeAdjacency(G.s);
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
    const e = eraInfo(era);
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
      no_road: 'no road to the ' + anchorFor(s.era).short, no_water: 'no water coverage', no_power: 'no power',
      no_block: 'not inside a qualifying block',
      no_magazine: 'off the palace roll',
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

    if (a.flourMade) rows.push([goodLabel(s.era, 'flour') + ' ' + eraStaple(s.era).cookedVerb,
                                Util.fmtNum(a.flourMade), '']);
    if (a.flourEaten) rows.push(['…eaten by your people', Util.fmtNum(a.flourEaten), 'gold-dim']);
    if (a.rent > 0.0000005) rows.push(['Real rent accrued', '$' + a.rent.toFixed(6), 'gold']);
    if (rows.length) {
      h += '<table class="tally">' + rows.map(([l, v, c]) =>
        '<tr><td>' + l + '</td><td class="' + c + '">' + v + '</td></tr>').join('') + '</table>';
    }

    if (a.goods.length) {
      h += '<div class="panel-title2">In store now</div><table class="tally">' +
        '<tr><th>Good</th><th>Change</th><th>Stored</th></tr>' +
        a.goods.map(g => '<tr><td>' + goodLabel(s.era, g.kind) + '</td>' +
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

      h += '<div class="panel-sub bad">Your city is going hungry. ' +
        eraStaple(s.era).hungerFix.replace(/^./, c => c.toUpperCase()) +
        ' before you add anything else.</div>';
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
    UI.wireBackupsPanel(p);
  },

  tallyHTML() {
    const s = G.s, C = G.cache;

    const LABELS = {
      grain: 'Grain', flour: 'Flour', dates: 'Dates', fish: 'Fish', honey: 'Honey',
      clay: 'Clay', pottery: 'Pottery', mudbrick: 'Mudbrick', wool: 'Wool', cloth: 'Cloth',
      dyedcloth: 'Dyed cloth', beer: 'Beer', reeds: 'Reeds', baskets: 'Baskets',
      sesame: 'Sesame', oil: 'Oil', salt: 'Salt', stone: 'Stone', blocks: 'Blocks',
      cacao: 'Cacao', chocolate: 'Chocolate',
      deadwood: 'Deadwood', charcoal: 'Charcoal', game: 'Game', pemmican: 'Dried meat',
      forage: 'Forage', hide: 'Hide', parka: 'Parkas', flint: 'Flint', blades: 'Blades',
      bone: 'Bone', ochre: 'Ochre', carvings: 'Carvings', ivory: 'Ivory',
    };

    const ALIAS = eraStaple(s.era).goodNames || {};
    const GOODS = Object.keys(TUNE.PRICES)
      .filter(k => !(TUNE.NO_EXPORT && TUNE.NO_EXPORT[k]))
      .map(k => [k, ALIAS[k] || LABELS[k] || (k.charAt(0).toUpperCase() + k.slice(1))]);
    const REC = eraRecord(s.era);
    let h = '<div class="panel-title">' + REC.icon + ' ' + UI.esc(REC.tally) + '</div>' +
      '<div class="panel-sub">' + UI.esc(REC.tallySub) +
      ' Rates are per minute, averaged over the last ~20 seconds.</div>';

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
        ' is spilling over and being sold abroad at ' + Math.round(exportMult(s) * 100) +
        '% of list. Build more storage, or the outlet that sells it properly.</div>';
    }

    const ri = Econ.rentInfo(s);

    const $ = v => '$' + (Math.abs(v) < 0.005 ? '0.00' : Math.abs(v).toFixed(2));
    h += '<div class="panel-title2">The money</div><table class="tally">' +
      '<tr><td>Gross income</td><td class="good">+' + $(C.incomeRate) + '/min</td></tr>' +

      ((C.exportRate || 0) > 0.005

        ? '<tr><td class="gold-dim">…of which sold abroad (overflow @ ' + Math.round(exportMult(s) * 100) +
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

    const pop = Game.housedResidents(s);
    let html = '<h2>The Era Ladder</h2>';

    if (Econ.nextEra(s) && Econ.trophicActive(s)) {
      const g = Econ.prologueGate(s);
      html += '<div class="panel-sub">The sky changes when this range has:</div>';
      html += '<div class="insp-row"><span>Time on this ground</span><span class="' +
        (g.left <= 0 ? 'good' : '') + '">' + Math.max(0, TUNE.PRED.stageSeconds - g.left) + ' / ' +
        TUNE.PRED.stageSeconds + 's ' + (g.left <= 0 ? '✓' : '') + '</span></div>';
      html += '<div class="insp-row"><span>Head held in nests</span><span class="' +
        (g.head >= g.needHead ? 'good' : '') + '">' + g.head + ' / ' + g.needHead + ' ' +
        (g.head >= g.needHead ? '✓' : '') + '</span></div>';
      html += '<div class="panel-note">There is no monument here and no money gate. The prologue ends ' +
        'the way it really ended, and what it asks of you is only that the colony held.</div>';
      if (Econ.eraReady(s)) html += '<div class="panel-note good">The age can turn.</div>';
      return html;
    }
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

      const foodPerMin = Econ.foodRate();

      html += '<div class="panel-sub">The age can turn when this city has:</div>';

      const eb = s.eraBase || {};
      const foodNow = Math.max(0, Econ.cumFood(s) - Econ.baseFood(eb));
      const stoneNow = Math.max(0, s.cum.stone - (eb.stone || 0));
      html += rrow('Population (housed)', pop, r.pop, migPerMin, '+' + migPerMin.toFixed(1) + '/min');
      html += rrow('Treasury ($)', Math.max(0, s.money), r.money, netPerMin, (netPerMin >= 0 ? '+' : '') + '$' + netPerMin.toFixed(0) + '/min');
      html += rrow(eraFoodLabel(s.era), foodNow, r.food, foodPerMin, '+' + foodPerMin.toFixed(1) + '/min');
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

      const xLabel = Econ.eraExtraLabel(s);
      const xOK = xLabel ? Econ.eraExtraGate(s) : true;

      if (xLabel) html += '<div class="insp-row"><span>' + UI.esc(xLabel) +
        '</span><span class="' + (xOK ? 'good' : 'warn') + '">' +
        (xOK ? 'met ✓' : 'not yet') + '</span></div>';

      const fr = [
        ['population', pop / r.pop], ['money', Math.max(0, s.money) / r.money],

        ['food', foodNow / r.food],
      ];
      if (r.stone) fr.push(['stone', stoneNow / r.stone]);
      if (mon) fr.push([mon.def.name, monFrac]);

      if (xLabel) fr.push([xLabel.toLowerCase(), xOK ? 1 : 0]);
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
    const site = eraSite(s.era);
    const era = eraInfo(s.era);
    let h = '<h2>Era ' + s.era + ' · ' + era.name + '</h2>';
    h += '<div class="panel-sub">' + g.headline + '</div>';

    h += '<div class="guide-block"><b>This age</b><br>' + g.mechanic + '</div>';

    h += '<div class="guide-block"><b>Build these</b><ol class="guide-list">';
    for (const c of g.chain) h += '<li>' + c + '</li>';
    h += '</ol></div>';

    h += '<div class="guide-block"><b>Do this first</b><ol class="guide-list">';
    for (const f of g.firstSteps) h += '<li>' + f + '</li>';
    h += '</ol></div>';

    h += '<div class="guide-warn"><b>The trap:</b> ' + g.mistake + '</div>';

    h += '<div class="guide-block"><b>Siting</b><ul class="guide-list">' +

      '<li><b>Roads</b> only for ' + site.roadYes + ', each tracing back to your ' +
        a.short + '. Nothing else needs paving.</li>' +
      '<li><b>Water.</b> ' + site.water + '</li>' +
      '</ul></div>';
    return h;
  },

  helpHTML() {
    const s = G.s, C = G.cache || {}, E = UI.esc;
    const era = s.era, A = anchorFor(era), STAP = eraStaple(era);
    const B = s.buildings || [], STK = s.stock || {}, T = C.tally || {};
    const rows = [], RANK = { bad: 0, warn: 1, '': 2, good: 3 };

    const add = (label, cls, val, fix) =>
      rows.push({ label, cls, val, fix: cls === 'good' ? '' : (fix || '') });
    const mn = v => !isFinite(v) ? 'no draw yet' : v >= 90 ? '90+ min' : Math.max(0, Math.round(v)) + ' min';
    const sc = v => !isFinite(v) ? 'no draw yet' : Math.max(0, Math.round(v)) + 's';
    const num = v => Util.fmtNum(v || 0);
    const cash = v => (v < 0 ? '−' : '') + '$' + Math.round(Math.abs(v)).toLocaleString('en-US');

    if (Econ.hearthActive(s)) {
      const f = Econ.warmForecast(s), dark = !!C.dark;
      add('Fires', dark || f.secs < 60 ? 'bad' : f.secs < 180 ? 'warn' : 'good',
        dark ? 'DARK — the draw went unpaid'
             : !isFinite(f.secs) ? 'lit, nothing drawing yet'
             : sc(f.secs) + ' left, burning ' + num(f.demand * TUNE.TEMPO) + '/min',
        'Cut more fuel, or mothball one building inside the ' + A.short + ' circle.');
      const ch = s.chill || 0;
      add('Exposure', ch >= TUNE.COLD.warnAt ? 'bad' : ch >= TUNE.COLD.stopGrowth ? 'warn' : 'good',
        Math.round(ch * 100) + '%' + (ch >= TUNE.COLD.stopGrowth ? ' — nobody is moving in' : ''),
        'Every home inside the ' + A.short + ' circle, and keep fuel above the draw.');
    }

    if (Econ.tankActive(s)) {
      const w = Econ.waterForecast(s), out = !!C.brownout, pol = eraPolicy(era);
      add('Water', out || w.secs < 60 ? 'bad'
            : (w.secs < 180 || (w.net < 0 && C.seasonPhase === 'dry')) ? 'warn' : 'good',
        out ? 'EMPTY — browned out'
            : Math.round(STK.water || 0) + ' / ' + Econ.capOf(s, 'water') + ' · ' + sc(w.secs) +
              ' · ' + (w.net >= 0 ? '+' : '') + num(w.net) + '/min',
        'Turn on ' + (pol ? pol.name : 'the ration') + ' at the ' + A.short + ', then buy tank.');
    }

    {
      const eat = Game.totalResidents(s) * TUNE.FLOUR_PER_RESIDENT * TUNE.TEMPO;
      const left = eat > 0 ? Econ.foodEquiv(s) / eat : Infinity;
      const made = Econ.foodRate(), hun = s.hunger || 0;
      add('Larder', (hun >= TUNE.HUNGER_WARN || (eat > 0 && made < eat)) ? 'bad'
            : (left < 5 || hun > 0.05) ? 'warn' : 'good',
        (eat > 0 ? mn(left) + ' of food · ' + num(made) + ' made vs ' + num(eat) + ' eaten /min'
                 : 'nobody to feed') +
          (hun > 0.01 ? ' · hunger ' + Math.round(hun * 100) + '%' : ''),
        'Now: ' + STAP.hungerFix + '.');
    }

    const LOUD = { no_road: 1, no_water: 1, no_power: 1, no_warmth: 1, no_staff: 1, no_block: 1,
      no_magazine: 1,
                   no_input: 1, no_customers: 1, stand_spent: 1, hungry: 1 };
    const fmap = {};
    for (const b of B) {
      const d = DEF(b.type);
      if (!d || b.type === 'road' || d.fixed || b.done === false || b.mothballed) continue;
      if (!b.status || b.status === 'ok') continue;
      fmap[b.status] = (fmap[b.status] || 0) + 1;
    }
    const faults = Object.keys(fmap).map(k => ({
      k, n: fmap[k],
      label: (UI.statusText({ status: k })[0] || k).split(' — ')[0],
    })).sort((x, y) => y.n - x.n);
    add('Faults', !faults.length ? 'good' : faults.some(f => LOUD[f.k]) ? 'bad' : 'warn',
      faults.length ? faults.map(f => f.n + '× ' + f.label).join(' · ') : 'none',
      faults.length ? 'Biggest first — ' + faults[0].n + '× ' + faults[0].label +
        '. Click one red ! and fix that cause.' : '');

    {
      let bare = 0, thin = 0, stuck = 0;
      for (const b of B) {
        const d = DEF(b.type);
        if (!d || !d.workers || b.done === false || b.mothballed) continue;
        if (b.block) { stuck++; continue; }
        if (!(b.staff || 0)) bare++; else if (b.staff < d.workers) thin++;
      }
      const free = (C.workersTotal || 0) - (C.workersUsed || 0);
      add('Hands', (bare > 0 && free <= 0) ? 'bad' : (thin > 0 || (free > 0 && bare > 0)) ? 'warn' : 'good',
        (C.workersUsed || 0) + ' of ' + (C.workersTotal || 0) + ' at work' +
          (bare ? ' · ' + bare + ' empty' : '') + (thin ? ' · ' + thin + ' short' : '') +
          (stuck ? ' · ' + stuck + ' blocked' : ''),
        free > 0 ? 'Hands are spare, so those are blocked, not empty. Fix the block.'
                 : 'Nobody spare. Add housing before the next workshop.');
    }

    {
      const why = C.migrateWhy || 'ok';
      add('Arrivals',
        ({ nohouse: 'bad', hungry: 'bad', cold: 'bad', blocked: 'bad', full: 'warn' })[why] || 'good',
        (why === 'ok' ? '+' + num((C.migrateRate || 0) * TUNE.TEMPO) + '/min' : 'stopped') +
          ' · ' + Game.housedResidents(s) + ' housed of ' + Game.totalCapacity(s),
        UI.migrateHint(why));
    }

    {
      const net = (C.net || 0) * 60;
      const cart = (C.upkeepRate > 0) ? (C.premiumRate || 0) / C.upkeepRate : 0;
      const working = (Econ.rentInfo(s) || {}).working || 0;

      if (working > 0 || net < 0) {

        const fix = net < 0
          ? 'Spending more than you earn. Mothball or demolish whatever is idle.'
          : cart > 0.25
            ? 'A quarter of your upkeep is carting — move the outlet nearer, or build a depot.'
            : 'Thin margin. Rank a shop, or open the next chain.';
        add('Treasury', net < 0 ? 'bad' : (net < 5 || cart > 0.25) ? 'warn' : 'good',
          cash(s.money) + ' · ' + (net >= 0 ? '+' : '') + cash(net) + '/min' +
            (cart > 0.005 ? ' · ' + Math.round(cart * 100) + '% of upkeep is carting' : ''),
          fix);
      }
    }

    const prod = {}, cons = {};
    for (const b of B) {
      const d = DEF(b.type);
      if (!d || b.done === false || b.mothballed) continue;
      if (d.out) for (const k in d.out) prod[k] = (prod[k] || 0) + 1;
      if (d.procOut) prod[d.procOut] = (prod[d.procOut] || 0) + 1;
      if (d.procIn) cons[d.procIn] = (cons[d.procIn] || 0) + 1;
      if (d.sells) cons[d.sells] = (cons[d.sells] || 0) + 1;
      if (d.sellsRaw) for (const k of d.sellsRaw) cons[k] = (cons[k] || 0) + 1;
      if (d.monument && !b.complete) {
        const nd = monumentBuild(b.type, defEra(d)) || {};
        for (const k in nd) if (k !== 'money') cons[k] = (cons[k] || 0) + 1;
      }
    }

    const pick = (test) => {
      let best = null;
      for (const t in BUILDINGS) {
        const e = BUILDINGS[t];
        if (e.noBuild || e.fixed || defEra(e) !== era) continue;
        if (test(e) && (!best || (e.cost || 0) < (best.cost || 0))) best = e;
      }
      return best;
    };
    const dead = [];
    for (const k in prod) {
      if (cons[k] || foodEff(k) > 0) continue;
      if (TUNE.FUEL[k] && Econ.hearthActive(s)) continue;
      if (TUNE.NO_EXPORT[k]) continue;
      const cap = Econ.capOf(s, k) || 0, hv = STK[k] || 0;
      const buy = pick(e => e.procIn === k || e.sells === k ||
        (e.sellsRaw && e.sellsRaw.indexOf(k) >= 0));
      dead.push({ label: goodLabel(era, k), frac: cap > 0 ? hv / cap : 0,
        full: cap > 0 && hv >= cap * 0.95, made: (T[k] && T[k].made) || 0,
        next: buy ? buy.name : null, cost: buy ? (buy.cost || 0) : 0 });
    }
    dead.sort((x, y) => y.frac - x.frac);
    if (dead.length) {
      const d0 = dead[0];
      add('No buyer', dead.some(x => x.full) ? 'bad' : dead.some(x => x.made > 0.005) ? 'warn' : '',
        dead.map(x => x.label + (x.full ? ' (full)' : '')).join(', '),

        d0.next ? 'Nothing buys ' + d0.label + ' — build a ' + d0.next + ' ($' + d0.cost + ').'
                : 'Nothing in this age buys ' + d0.label + '. Stop making it.');
    }

    const dry = [];
    for (const k in T) {
      const t = T[k] || {};
      const net = (t.made || 0) - (t.used || 0) - (t.exported || 0);
      if (net >= -0.01) continue;
      dry.push({ label: goodLabel(era, k), left: (STK[k] || 0) / -net });
    }
    dry.sort((x, y) => x.left - y.left);
    if (dry.length) {
      const y0 = dry[0];
      add('Running dry', y0.left < 2 ? 'bad' : y0.left < 10 ? 'warn' : 'good',
        dry.slice(0, 3).map(x => x.label + ' ' + mn(x.left)).join(' · '),
        y0.label + ' runs out in ' + mn(y0.left) + ' — add a producer, or close a buyer.');
    }

    const spill = [];
    for (const k in STK) {
      const cap = Econ.capOf(s, k) || 0, hv = STK[k] || 0, t = T[k] || {};
      if (cap <= 0 || hv < cap * 0.98 || (t.made || 0) <= 0.01) continue;
      spill.push({ label: goodLabel(era, k), leak: (t.exported || 0) + (t.held || 0), made: t.made || 0 });
    }
    spill.sort((x, y) => y.leak - x.leak);
    if (spill.length) {
      const p0 = spill[0];
      add('At cap', p0.leak > p0.made * 0.25 ? 'bad' : 'warn',
        spill.map(x => x.label).join(', '),
        p0.label + ' is full — the overflow leaves at ' + Math.round(exportMult(s) * 100) +
          '% of list. Add storage, or a buyer.');
    }

    {
      let jobs = 0;
      for (const b of B) {
        const d = DEF(b.type);
        if (!d || !d.workers || b.done === false || b.mothballed) continue;
        jobs += d.workers;
      }
      const hands = C.workersTotal || 0, gap = jobs - hands;
      add('Jobs', (gap > 0 || (jobs > 0 && gap < -0.25 * jobs)) ? 'warn' : 'good',
        jobs + ' posts for ' + hands + ' hands',
        gap > 0 ? 'More posts than people, and the last built staff last. Add housing.'
                : 'More mouths than posts. They eat anyway — open another chain.');
    }

    {
      const cut = B.filter(b => {
        const d = DEF(b.type);
        return d && d.out && d.out.deadwood && b.done !== false;
      });
      if (cut.length && typeof C.forestLeft === 'number') {
        const made = (T.deadwood && T.deadwood.made) || 0;
        const ash = cut.filter(b => b.status === 'stand_spent').length;
        const life = made > 0 ? C.forestLeft / made : Infinity;
        add('Timber', ash >= cut.length ? 'bad' : (ash > 0 || life < 20) ? 'warn' : 'good',
          Math.round(C.forestLeft).toLocaleString('en-US') + ' standing · ' + mn(life) +
            (ash ? ' · ' + ash + ' of ' + cut.length + ' on ash' : ''),
          'It never grows back. Site the next ' + DEF(cut[0].type).name + ' before this one is ash.');
      }
    }

    const MON = Econ.monumentFor(era);
    let monFrac = 1;
    if (MON) {
      const site = B.find(b => b.type === MON.key && b.done !== false) || null;
      const pr = site ? (Econ.monumentProgress(s, site) || { parts: [], frac: 0 }) : null;
      const legs = pr ? pr.parts.slice().sort((x, y) => x.frac - y.frac) : [];
      const slow = legs.length ? legs[0] : null;
      const done = !!(site && site.complete), stalled = !!(site && (site.halted || site.block));
      monFrac = Econ.monumentDone(s, era) ? 1 : (pr ? (pr.frac || 0) : 0);
      add(MON.def.name, stalled ? 'bad' : !site ? 'warn' : done ? 'good' : '',
        !site ? 'not begun' : done ? 'standing'
          : Math.round(monFrac * 100) + '%' + (slow ? ' · ' + goodLabel(era, slow.kind) + ' ' +
              slow.have + ' of ' + slow.need : ''),
        !site ? 'Not begun — this age’s exit runs through it.'
          : stalled ? 'The site is stalled. Clear its fault before anything else.'
          : slow ? goodLabel(era, slow.kind) + ' is the slow leg. Point the city at it.' : '');
    }

    {
      const ri = Econ.rentInfo(s);
      add('Idle', ri.idle > ri.working ? 'bad' : ri.idle > 0 ? 'warn' : 'good',
        ri.idle + ' idle · ' + ri.working + ' earning' +
          (ri.monuments ? ' · ' + ri.monuments + ' monument' : ''),
        ri.idle + ' buildings earn no standing. Fix them, or demolish them.');
    }

    let gate = null;

    if (Econ.nextEra(s) && Econ.trophicActive(s)) {
      const g = Econ.prologueGate(s);
      gate = { ready: g.ready, binds: { k: g.binds === 'head' ? 'head held in nests' : 'time on this ground',
        f: g.binds === 'head' ? g.head / g.needHead
          : (TUNE.PRED.stageSeconds - g.left) / TUNE.PRED.stageSeconds } };
    } else if (Econ.nextEra(s)) {
      const r = eraReq(era + 1), eb = s.eraBase || {}, cum = s.cum || {};
      const legs = [
        { k: 'population', f: r.pop > 0 ? Game.housedResidents(s) / r.pop : 1 },
        { k: 'money', f: r.money > 0 ? Math.max(0, s.money) / r.money : 1 },
        { k: eraFoodLabel(era),
          f: r.food > 0 ? Math.max(0, Econ.cumFood(s) - Econ.baseFood(eb)) / r.food : 1 },
      ];
      if (r.stone) legs.push({ k: 'stone', f: Math.max(0, (cum.stone || 0) - (eb.stone || 0)) / r.stone });
      if (MON) legs.push({ k: MON.def.name, f: monFrac });
      legs.sort((x, y) => x.f - y.f);
      gate = { ready: Econ.eraReady(s), binds: legs[0] };
    }

    let nextUp = '';
    if (dead.length && dead[0].next) nextUp = dead[0].next + ' — nothing buys ' + dead[0].label + ' yet';
    if (!nextUp) {
      let want = null;
      for (const k in cons) {
        if (prod[k]) continue;
        const mk = pick(e => (e.out && e.out[k]) || e.procOut === k);
        if (mk && (!want || (mk.cost || 0) < (want.cost || 0))) want = mk;
      }
      if (want) nextUp = want.name + ' ($' + (want.cost || 0) + ')';
    }
    if (!nextUp) {
      const step = (eraGuide(era).firstSteps || [])[0] || '';
      nextUp = step ? step.split('. ')[0].replace(/\.$/, '') : 'press G for this age’s opening moves';
    }

    rows.sort((x, y) => RANK[x.cls] - RANK[y.cls]);
    const worst = rows.find(r => r.cls === 'bad') || rows.find(r => r.cls === 'warn') || null;
    const eraName = eraInfo(era).name;

    let h = '<div class="panel-title">\u{1F50D} The Scout</div>';
    h += worst
      ? '<div class="guide-warn"><b>' + E(worst.label) + ' — ' + E(worst.val) + '</b><br>' +
        E(worst.fix) + '</div>'
      : '<div class="guide-block"><b>Nothing is broken.</b> ' +
        (!gate ? 'The written ladder ends here.' : gate.ready ? 'Turn the age.' : 'Push the gate.') +
        '</div>';

    h += '<div class="guide-block"><b>' + E(eraName) + '</b> · ' + E(A.name) +
      '<br><b>Build next:</b> ' + E(nextUp) +
      '<br><b>Gate:</b> ' + (!gate ? 'none left'
        : gate.ready ? 'ready — turn the age'
        : E(String(gate.binds.k)) + ' at ' + Math.round(Math.min(1, gate.binds.f) * 100) + '%') +
      '</div>';

    const fine = [];
    for (const r of rows) {
      if (r.cls === 'good') { fine.push(r.label); continue; }
      h += '<div class="insp-row' + (r.cls ? ' scout-' + r.cls : '') + '"><span>' + E(r.label) +
        '</span><span class="' + r.cls + '">' + E(r.val) + '</span></div>' +
        (r.fix ? '<div class="scout-fix">' + E(r.fix) + '</div>' : '');
    }
    if (fine.length)
      h += '<div class="insp-row"><span>\u{2714} fine</span><span class="gold-dim">' +
        E(fine.join(' · ')) + '</span></div>';

    const REC = eraRecord(era);
    h += '<div class="panel-sub" style="margin-top:12px"><b>Keys</b> Esc select · Space pause · ' +
      'O overlays' + (UI.saltActive(s) ? '/salt' : '') + ' · T ' + E(REC.tallyBtn) +
      ' · C ' + E(REC.chronBtn) + ' · G guide · H this · K keep placing · P photo' +
      '<br>1–9 palette · Tab tab · R rotate · Alt+click copy · Shift straight road · ' +
      'Ctrl+Z undo · Ctrl+S save · <span class="gold-dim">build ' + UI.BUILD + '</span></div>';
    return h;
  },

  workersHTML() {
    const s = G.s, C = G.cache;
    let h = '<div class="panel-title">\u{1F528} The Staffing List</div>' +
      '<div class="panel-sub">Buildings staff in PLACEMENT order — first built, first served. ' +

      'While hunger is at or past 50% this age’s FOOD chain is promoted automatically.' + '</div>';
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
    const REC = eraRecord(s.era);
    let h = '<div class="panel-title">' + REC.icon + ' ' + UI.esc(REC.chronicle) +
      (s.cityName ? ' of ' + UI.esc(s.cityName) : '') + '</div>' +
      '<div class="panel-sub">' + UI.esc(REC.chronSub) + '</div>';
    const log = (s.chronicle || []).slice().reverse();
    if (!log.length) {
      h += '<div class="panel-sub gold-dim">Nothing yet worth carving. Found something.</div>';
      return h;
    }
    h += '<table class="tally">';
    for (const e of log) {
      const mins = Math.round(e.tick / 60);
      h += '<tr><td class="gold-dim" style="white-space:nowrap">era ' + defEra(e) + ' · min ' + mins +
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
            ' <span class="gold-dim">(from era ' + (r.era != null ? r.era : 1) + ')</span></button>';
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

    const F = eraFounding(G.s.era);
    UI.togglePanel('naming-panel', () =>
      '<h2>' + F.icon + ' ' + UI.esc(F.title) + '</h2>' +
      '<div class="panel-sub">' + UI.esc(F.sub) + '</div>' +
      '<input id="city-name-input" type="text" maxlength="30" placeholder="' + UI.esc(F.placeholder) + '" ' +
      'style="width:100%;padding:8px;font:15px system-ui;border-radius:6px;border:1px solid #c9a86a;background:rgba(0,0,0,0.3);color:#e8dcc0">' +
      '<div class="adv-btns"><button id="city-name-ok" class="btn-gold">' + UI.esc(F.ok) + '</button>' +
      '<button id="city-name-skip" class="btn-plain">' + UI.esc(F.skip) + '</button></div>');
    const okB = document.getElementById('city-name-ok');
    if (!okB) return;
    const inp = document.getElementById('city-name-input');
    inp.focus();
    const close = () => { const p = document.getElementById('naming-panel'); if (p) p.remove(); };
    okB.onclick = () => {
      const v = (inp.value || '').trim().slice(0, 30);
      if (v) {
        G.s.cityName = v;
        Econ.log(G.s, F.icon, v + F.founded);
        UI.toast(F.icon + ' ' + v + F.toast, 9000);
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
  },

  firstToast(key, msg) {
    if (!G.s.firsts[key]) { G.s.firsts[key] = 1; UI.toast(msg, 9000); }
  },
};
