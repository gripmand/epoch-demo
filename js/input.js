'use strict';

const Input = {
  tool: { mode: 'select', type: null, payload: null },
  selected: null,
  hoverB: null,
  hoverT: null,
  drag: null,
  leftDown: null,
  painting: false,
  lastPaint: null,
  tt: null,

  rot: 0,

  keepPlacing: (() => { try { return localStorage.getItem('epoch_keepplacing') === '1'; } catch (e) { return false; } })(),

  setKeepPlacing(on) {
    Input.keepPlacing = !!on;
    try { localStorage.setItem('epoch_keepplacing', on ? '1' : '0'); } catch (e) {}
    UI.reflectKeepPlacing();
  },

  setTool(mode, type) {
    Input.tool = { mode, type: type || null, payload: null };
    if (mode !== 'select') { Input.selected = null; UI.hideInspector(); }
    UI.reflectTool();
    Rend._overlayDirty = true;
  },

  strandedCount(s) {
    let n = 0;
    for (const b of s.buildings) {
      const d = DEF(b.type);
      if (!d || !d.needsRoad || d.fixed || b.done === false) continue;
      if (!b.conn) n++;
    }
    return n;
  },

  startRelic(i) {
    const r = (G.s.relics || [])[i];
    if (!r || !DEF(r.type)) return;
    Input.tool = { mode: 'relic', type: r.type, payload: i };
    Input.rot = 0;
    Input.selected = null;
    UI.hideInspector();
    UI.toast('\u{1F3DB}\u{FE0F} Placing the ' + DEF(r.type).name + ' — click where it should stand. ' +
      'It arrives finished. Esc or right-click to put it back.', 10000);
  },

  startMove(b) {
    Input.tool = { mode: 'move', type: b.type, payload: b };
    Input.rot = b.rot || 0;
    Input.selected = null;
    UI.hideInspector();
    UI.toast('Moving ' + DEF(b.type).name + ' — click a valid spot to set it down. ' +
      'Press R to rotate it. Esc or right-click to cancel.');
  },

  init(canvas) {
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('mousedown', Input.onDown);
    window.addEventListener('mousemove', Input.onMove);
    window.addEventListener('mouseup', Input.onUp);
    canvas.addEventListener('wheel', Input.onWheel, { passive: false });
    window.addEventListener('keydown', Input.onKey);

    Input.tt = document.createElement('div');
    Input.tt.id = 'tt';
    Input.tt.className = 'hidden';
    document.body.appendChild(Input.tt);

    canvas.addEventListener('dblclick', e => {
      const p = Rend.pick(e.clientX, e.clientY);
      if (p) { Rend.tgt.tx = p.point.x; Rend.tgt.tz = p.point.z; }
    });

    const mini = document.getElementById('minimap');
    if (mini) {
      let down = false;
      const jump = e => {
        const r = mini.getBoundingClientRect();
        Rend.tgt.tx = (e.clientX - r.left) / r.width * TUNE.WORLD;
        Rend.tgt.tz = (e.clientY - r.top) / r.height * TUNE.WORLD;
      };
      mini.addEventListener('mousedown', e => { down = true; jump(e); e.stopPropagation(); });
      mini.addEventListener('mousemove', e => { if (down) jump(e); });
      window.addEventListener('mouseup', () => { down = false; });
    }
  },

  groundHit(e, planeY) {

    const r = Rend.canvas.getBoundingClientRect();
    const v = new THREE.Vector2(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1
    );
    const rc = new THREE.Raycaster();
    rc.setFromCamera(v, Rend.camera);
    const out = new THREE.Vector3();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -planeY);
    return rc.ray.intersectPlane(plane, out) ? out : null;
  },

  onDown(e) {
    const s = G.s;
    if (e.button === 2 || e.button === 1) {

      Rend.vel.x = Rend.vel.z = Rend.vel.az = 0;
      Input.drag = {
        kind: 'orbit', sx: e.clientX, sy: e.clientY,
        az: Rend.tgt.az, polar: Rend.tgt.po,
        pt: performance.now(), pv: Rend.tgt.az,
        moved: false, cancelTool: Input.tool.mode !== 'select',
      };
      return;
    }
    if (e.button !== 0) return;
    const p = Rend.pick(e.clientX, e.clientY);
    Input.hoverT = p;

    switch (Input.tool.mode) {
      case 'select':

        if (e.altKey && p) {
          const eb = Grid.buildingAt(p.x, p.y);

          if (eb && !DEF(eb.type).fixed && !DEF(eb.type).monument && !DEF(eb.type).noBuild) {
            const ed = DEF(eb.type);
            if ((ed.era || 1) <= s.era || (window.Dev && Dev.flags.freeBuild)) {
              Input.setTool(eb.type === 'road' ? 'road' : 'build', eb.type);
              UI.firstToast('eyedrop', '✎ Alt+click copies a building into your hand — ' + ed.name + ' armed.');
              return;
            }
          }
        }
        Input.leftDown = { sx: e.clientX, sy: e.clientY, tile: p, planeY: p ? p.point.y : 0, moved: false, shift: e.shiftKey };
        break;
      case 'road':
        if (!p) return;
        Input.painting = true;
        Input.lastPaint = p;
        Input.paintStart = { x: p.x, y: p.y };
        Input.stroke = { kind: 'road', tiles: [], cost: 0, t: performance.now() };
        Input.placeRoad(s, p.x, p.y);
        break;
      case 'terra':
        if (!p) return;
        Input.painting = true;
        Input.lastPaint = p;
        Input.terraApply(s, p.x, p.y);
        break;
      case 'build':

        if (p && Input.place(s, Input.tool.type, p.x, p.y) !== false && !Input.keepPlacing) {
          Input.setTool('select');
        }
        break;
      case 'relic': {
        if (!p) return;
        const idx = Input.tool.payload;
        const r = (s.relics || [])[idx];
        if (!r) { Input.setTool('select'); return; }

        const d = DEF(r.type);
        const added = [];
        const p0 = Grid.chunkOf(p.x, p.y), p1 = Grid.chunkOf(p.x + (d.w || 1) - 1, p.y + (d.h || 1) - 1);
        for (let cx = p0.cx; cx <= p1.cx; cx++)
          for (let cy = p0.cy; cy <= p1.cy; cy++) {
            const k = cx + ',' + cy;
            if (G.cache.ownedSet.has(k)) continue;
            s.owned.push(k); G.cache.ownedSet.add(k); added.push(k);
          }
        if (!Grid.canPlace(s, r.type, p.x, p.y, null, Input.rot)) {
          for (const k of added) {
            G.cache.ownedSet.delete(k);
            const i2 = s.owned.indexOf(k); if (i2 >= 0) s.owned.splice(i2, 1);
          }
          UI.toast('Can’t stand it there — ' + Grid.whyBlocked(s, r.type, p.x, p.y, Input.rot) + '.', 9000);
          return;
        }
        const b = Grid.addBuilding(s, r.type, p.x, p.y, Input.rot);
        if (!b) { Input.setTool('select'); return; }
        b.complete = true; b.done = true; b.relic = true; b.relicEra = r.era;
        s.relics.splice(idx, 1);
        Grid.rebuild(s);
        Econ.log(s, '\u{1F3DB}\u{FE0F}', 'The ' + d.name + ' stands again, in a new age.');
        UI.toast('\u{1F3DB}\u{FE0F} The ' + d.name + ' stands. It pays its trickle and its city dividend ' +
          'from now on, and needs no road or water.', 10000);
        Input.setTool('select');
        Input.selected = b;
        UI.showInspector(b);
        break;
      }
      case 'move': {
        if (!p) return;
        const b = Input.tool.payload;
        if (!b || !s.buildings.includes(b)) { Input.setTool('select'); return; }
        if (Grid.canPlace(s, b.type, p.x, p.y, b.id, Input.rot)) {

          const isAnchor = !!DEF(b.type).fixed;
          const before = isAnchor ? Input.strandedCount(s) : 0;
          Grid.moveBuilding(s, b, p.x, p.y, Input.rot);
          Grid.rebuild(s);
          if (isAnchor) {
            const lost = Input.strandedCount(s) - before;
            if (lost > 0) {
              UI.toast('\u{26A0}\u{FE0F} ' + lost + (lost === 1 ? ' building has' : ' buildings have') +
                ' lost road access. Every road is measured outward from the ' +
                DEF(b.type).name + ', so it has to touch your network — move it back, ' +
                'or run a road out to it.', 12000);
            }
          }
          Input.setTool('select');
          Input.selected = b;
          UI.showInspector(b);
        } else {
          UI.toast('Can’t place it there — ' + Grid.whyBlocked(s, b.type, p.x, p.y, Input.rot) + '.', 9000);
        }
        break;
      }
      case 'demolish': {
        if (!p) return;
        const b = Grid.buildingAt(p.x, p.y);
        if (b) { Input.demolish(b); break; }
        if (Grid.treeAt(s, p.x, p.y)) Input.clearTree(s, p.x, p.y);
        break;
      }
      case 'buyland': {
        if (!p) return;
        const c = Grid.chunkOf(p.x, p.y);
        if (G.cache.ownedSet.has(c.cx + ',' + c.cy)) {

          const why = Grid.sellChunkWhy(s, c.cx, c.cy);
          if (why) { UI.toast('Cannot sell that parcel — ' + why + '.'); break; }
          const key = c.cx + ',' + c.cy;
          const offer = Math.round(Grid.chunkPrice(c.cx, c.cy) * TUNE.SELL_LAND);
          if (Input.confirmSell !== key || performance.now() - (Input.confirmSellT || 0) > 5000) {
            Input.confirmSell = key;
            Input.confirmSellT = performance.now();
            UI.toast('\u{1F5FA}️ Sell this empty frontier parcel back to the steppe for ' + Util.fmtMoney(offer) +
              ' (60% of its price)? Click it again to confirm.', 8000);
            break;
          }
          Input.confirmSell = null;
          const got = Grid.sellChunk(s, c.cx, c.cy);
          if (got) {
            Grid.rebuild(s);
            Econ.log(s, '\u{1F5FA}️', 'A frontier parcel was sold back to the steppe for ' + Util.fmtMoney(got) + '.');
            UI.toast('Sold. ' + Util.fmtMoney(got) + ' back in the treasury — land is liquid now, at a loss.');
            Rend._overlayDirty = true;
          }
          break;
        }
        if (!Grid.chunkBuyable(s, c.cx, c.cy)) { UI.toast('Land must border territory you already own.'); break; }
        const price = Grid.chunkPrice(c.cx, c.cy);
        if (Grid.buyChunk(s, c.cx, c.cy)) {
          Econ.log(s, '\u{1F5FA}️', 'The city bought a new parcel for ' + Util.fmtMoney(price) + '.');
          UI.toast('Bought a 4×4 chunk for ' + Util.fmtMoney(price) + '. Clear its trees and rocks before building.');
          UI.firstToast('land', 'New land keeps its wild trees — use the Demolish tool to clear them ($' + TUNE.CLEAR_TREE + ' each), or Terraform to reshape it. Owned EMPTY frontier parcels can be sold back with this same tool.');
          Rend._overlayDirty = true;
        } else UI.toast('Not enough money — that chunk is ' + Util.fmtMoney(price) + '.');
        break;
      }
    }
  },

  onMove(e) {
    const d = Input.drag;
    if (d && d.kind === 'orbit') {
      if (!d.moved && Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 4) d.moved = true;
      const now = performance.now();
      const newAz = d.az - (e.clientX - d.sx) * 0.006;
      const dts = Math.max(0.008, (now - d.pt) / 1000);
      Rend.vel.az = Util.clamp((newAz - d.pv) / dts, -3, 3);
      d.pt = now; d.pv = newAz;
      Rend.tgt.az = newAz;
      Rend.tgt.po = Util.clamp(d.polar - (e.clientY - d.sy) * 0.004, Rend.POLAR_MIN, Rend.POLAR_MAX);
      return;
    }
    if (d && d.kind === 'pan') {

      const now = performance.now();
      const wpp = 2 * d.dist * Math.tan(d.fov / 2) / window.innerHeight;
      const gx = (e.clientX - d.sx) * wpp;
      const gz = (e.clientY - d.sy) * wpp / Math.max(0.35, Math.cos(d.polar));
      const rx = Math.cos(d.az), rz = -Math.sin(d.az);
      const fx = -Math.sin(d.az), fz = -Math.cos(d.az);

      const sx = TUNE.INVERT_PAN_X ? -1 : 1;
      const sy = TUNE.INVERT_PAN_Y ? -1 : 1;
      const nx = d.camTx - (sx * gx * rx + sy * gz * fx);
      const nz = d.camTz - (sx * gx * rz + sy * gz * fz);
      const dts = Math.max(0.008, (now - d.pt) / 1000);
      Rend.vel.x = Util.clamp((nx - d.px) / dts, -90, 90);
      Rend.vel.z = Util.clamp((nz - d.pz) / dts, -90, 90);
      d.pt = now; d.px = nx; d.pz = nz;
      Rend.tgt.tx = nx;
      Rend.tgt.tz = nz;
      return;
    }
    if (Input.leftDown && Input.tool.mode === 'select') {
      const dx = e.clientX - Input.leftDown.sx, dy = e.clientY - Input.leftDown.sy;
      if (dx * dx + dy * dy > 30) {
        Rend.vel.x = Rend.vel.z = Rend.vel.az = 0;
        if (Input.leftDown.shift) {

          Input.drag = {
            kind: 'orbit', sx: Input.leftDown.sx, sy: Input.leftDown.sy,
            az: Rend.tgt.az, polar: Rend.tgt.po,
            pt: performance.now(), pv: Rend.tgt.az, moved: true, cancelTool: false,
          };
        } else {

          Input.drag = {
            kind: 'pan',
            sx: Input.leftDown.sx, sy: Input.leftDown.sy,
            az: Rend.cam.azimuth, polar: Rend.cam.polar, dist: Rend.cam.dist,
            fov: Rend.camera.fov * Math.PI / 180,
            camTx: Rend.tgt.tx, camTz: Rend.tgt.tz,
            pt: performance.now(), px: Rend.tgt.tx, pz: Rend.tgt.tz,
          };
        }
        Input.leftDown = null;
        return;
      }
    }
    const p = Rend.pick(e.clientX, e.clientY);
    Input.hoverT = p;
    Input.hoverB = p ? Grid.buildingAt(p.x, p.y) : null;
    Rend._overlayDirty = true;

    const showTT = txt => {
      Input.tt.textContent = txt;
      Input.tt.classList.remove('hidden');
      Input.tt.style.left = (e.clientX + 14) + 'px';
      Input.tt.style.top = (e.clientY - 10) + 'px';
    };

    if (Input.tool.mode === 'buyland' && p) {
      const c = Grid.chunkOf(p.x, p.y);
      if (!G.cache.ownedSet.has(c.cx + ',' + c.cy) && Grid.chunkBuyable(G.s, c.cx, c.cy)) {
        showTT(Util.fmtMoney(Grid.chunkPrice(c.cx, c.cy)));
      } else if (G.cache.ownedSet.has(c.cx + ',' + c.cy) && !Grid.sellChunkWhy(G.s, c.cx, c.cy)) {
        showTT('sell +' + Util.fmtMoney(Math.round(Grid.chunkPrice(c.cx, c.cy) * TUNE.SELL_LAND)));
      } else Input.tt.classList.add('hidden');
    } else if (Input.tool.mode === 'terra' && p) {
      showTT('$' + terraCost(Input.tool.type, G.s.era));
    } else if (Input.tool.mode === 'road' && Input.painting && Input.stroke) {

      showTT('$' + Input.stroke.cost + ' · ' + Input.stroke.tiles.length + ' tiles' +
        (e.shiftKey ? ' · straight' : ''));
    } else if (Input.tool.mode === 'build' && p && Input.tool.type) {

      const depots = Econ.supplyDepots(G.s);
      let best = Infinity;
      for (const m of depots) {
        const md = DEF(m.type);
        const dist = Math.hypot(p.x - (m.x + md.w / 2), p.y - (m.y + md.h / 2));
        if (dist < best) best = dist;
      }
      const mult = best === Infinity || best <= TUNE.SUPPLY.freeRadius ? 1
        : Math.min(TUNE.SUPPLY.maxMultiplier, 1 + (best - TUNE.SUPPLY.freeRadius) / TUNE.SUPPLY.premiumPer);
      const d2 = DEF(Input.tool.type);
      showTT('$' + d2.cost + (mult > 1.01
        ? ' · carting ×' + mult.toFixed(2) + ' (' + Math.round(best) + ' tiles out)'
        : ''));
    } else if (Input.tool.mode === 'select' && p && !Input.hoverB) {

      const t = G.cache.terrain[Grid.key(p.x, p.y)];
      const soil = Grid.soilAt(p.x, p.y);
      let txt = '';
      if (t === TERRAIN.FERTILE) txt = 'fertile silt — farms +50% here';
      else if (t === TERRAIN.SALT) txt = 'salt flats — folds and salt pans thrive, barley dies';
      else if (t === TERRAIN.ROCK) txt = 'rock — finite stone, quarried from Era 3';
      else if (t === TERRAIN.WATER) txt = 'the channel — clay pits near it, weirs and jetties on it';
      else if (t === TERRAIN.MOUNTAIN) txt = 'mountain — nothing builds here';
      else if (Grid.treeAt(G.s, p.x, p.y)) txt = 'wild growth — $' + TUNE.CLEAR_TREE + ' to clear';
      else if (soil < 0.999) txt = 'worked ground — soil ' + Math.round(soil * 100) + '%';
      if (txt) showTT(txt); else Input.tt.classList.add('hidden');
    } else Input.tt.classList.add('hidden');

    if (Input.painting && p) {

      let target = p;
      if (Input.tool.mode === 'road' && e.shiftKey && Input.paintStart) {
        const ps = Input.paintStart;
        target = Math.abs(p.x - ps.x) >= Math.abs(p.y - ps.y)
          ? { x: p.x, y: ps.y } : { x: ps.x, y: p.y };
      }
      let { x, y } = Input.lastPaint;
      const dx = Math.abs(target.x - x), dy = Math.abs(target.y - y);
      const sx = x < target.x ? 1 : -1, sy = y < target.y ? 1 : -1;
      let err = dx - dy, guard = 0;
      while ((x !== target.x || y !== target.y) && guard++ < 512) {
        const e2 = err * 2;
        if (e2 > -dy) { err -= dy; x += sx; }
        else if (e2 < dx) { err += dx; y += sy; }
        if (Input.tool.mode === 'road') Input.placeRoad(G.s, x, y);
        else if (Input.tool.mode === 'terra') Input.terraApply(G.s, x, y);
      }
      Input.lastPaint = target;
    }
  },

  onUp(e) {
    if (Input.drag && Input.drag.kind === 'orbit' && !Input.drag.moved && Input.drag.cancelTool) {
      Input.setTool('select');
    }
    if (Input.leftDown && !Input.leftDown.moved && Input.tool.mode === 'select') {
      const t = Input.leftDown.tile;
      const b = t ? Grid.buildingAt(t.x, t.y) : null;
      Input.selected = b || null;
      if (b) { UI.showInspector(b); Rend.focusOn(b); } else UI.hideInspector();
    }

    if (Input.stroke && Input.stroke.tiles.length) {
      Input.lastAction = { kind: 'road', ids: Input.stroke.tiles.slice(),
        cost: Input.stroke.cost, t: performance.now() };
    }
    Input.stroke = null;
    Input.paintStart = null;
    Input.leftDown = null;
    Input.drag = null;
    Input.painting = false;
    Input.lastPaint = null;
  },

  onWheel(e) {
    e.preventDefault();
    const f = e.deltaY < 0 ? 1 / 1.16 : 1.16;
    Rend.tgt.di = Util.clamp(Rend.tgt.di * f, Rend.DIST_MIN, Rend.DIST_MAX);

    if (f < 1) {
      const p = Rend.pick(e.clientX, e.clientY);
      if (p) {
        const pull = (1 - f) * 1.15;
        Rend.tgt.tx += (p.point.x - Rend.tgt.tx) * pull;
        Rend.tgt.tz += (p.point.z - Rend.tgt.tz) * pull;
      }
    }
  },

  onKey(e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      UI.saveNow();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      const a = Input.lastAction;
      if (!a || performance.now() - a.t > 10000) {
        UI.toast('Nothing to undo — the window is 10 seconds after a placement.');
        return;
      }
      Input.lastAction = null;
      const s2 = G.s;
      const ids = a.kind === 'road' ? a.ids : [a.id];
      let removed = 0;
      for (const id of ids) {
        const b = G.cache.byId.get(id) || s2.buildings.find(x => x.id === id);
        if (b) { Grid.removeBuilding(s2, b); removed++; }
      }
      if (removed) {
        s2.money += a.cost;
        Grid.rebuild(s2);
        if (Input.selected && ids.includes(Input.selected.id)) { Input.selected = null; UI.hideInspector(); }
        UI.toast('↩️ Undone — ' + (a.kind === 'road' ? removed + ' road tiles' : 'the building') +
          ' removed, full ' + Util.fmtMoney(a.cost) + ' refunded.');
      }
      return;
    }

    if (e.key >= '1' && e.key <= '9' && !e.ctrlKey && !e.altKey) {
      const btns = UI.els.palBody ? UI.els.palBody.querySelectorAll('.pal-btn:not(.locked)') : [];
      const idx = +e.key - 1;
      if (btns[idx]) { btns[idx].click(); return; }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const tabs = UI.tabsFor();
      const cur = tabs.findIndex(t => t.key === UI.activeTab);
      const nxt = tabs[(cur + (e.shiftKey ? tabs.length - 1 : 1)) % tabs.length];
      UI.activeTab = nxt.key;
      UI.renderTab();
      return;
    }
    const step = Rend.tgt.di * 0.09;
    const az = Rend.tgt.az;
    const fwd = [-Math.sin(az) * step, -Math.cos(az) * step];
    const right = [Math.cos(az) * step, -Math.sin(az) * step];
    switch (e.key) {
      case 'Escape': Input.setTool('select'); Input.selected = null; UI.hideInspector();
        for (const p of document.querySelectorAll('.panel')) p.remove(); break;
      case ' ': e.preventDefault(); Main.setSpeed(0); break;

      case 'h': case 'H': UI.togglePanel('help-panel', UI.helpHTML); break;
      case 'g': case 'G': UI.togglePanel('guide-panel', UI.guideHTML); break;
      case 'o': case 'O': UI.toggleOverlays(); break;

      case 'k': case 'K':
        Input.setKeepPlacing(!Input.keepPlacing);
        UI.toast(Input.keepPlacing
          ? '\u{1F4CC} Keep placing ON — the tool stays armed after each building.'
          : '\u{1F446} One at a time — your hand empties after each building.', 4000);
        break;

      case 't': case 'T':
        if (UI.literate(G.s)) UI.togglePanel('tally-panel', UI.tallyHTML);
        else UI.toast('\u{1F4DC} Nobody in this city can write. Build a Scribe\'s House and the numbers appear.', 7000);
        break;
      case 'c': case 'C': UI.togglePanel('chron-panel', UI.chronicleHTML); break;
      case 'p': case 'P': UI.photoMode(); break;

      case 'r': case 'R': {
        if (Input.tool.mode !== 'build' && Input.tool.mode !== 'move') {
          UI.firstToast('rotate', 'R turns a building — pick one from the palette (or Move an existing one) and press R.');
          break;
        }
        Input.rot = ((Input.rot | 0) + 1) & 3;
        const rt = Input.tool.mode === 'move' ? Input.tool.payload.type : Input.tool.type;
        const rs = Grid.dims(rt, Input.rot);
        Rend._overlayDirty = true;
        if (window.Sfx) Sfx.play('road');
        UI.toast('↻ ' + DEF(rt).name + ' turned ' + (Input.rot * 90) + '° — footprint ' +
          rs.w + '×' + rs.h + '.', 2500);
        break;
      }
      case 'q': case 'Q': Rend.tgt.az += 0.12; break;
      case 'e': case 'E': Rend.tgt.az -= 0.12; break;
      case 'ArrowUp': case 'w': case 'W': Rend.tgt.tx += fwd[0]; Rend.tgt.tz += fwd[1]; break;
      case 'ArrowDown': case 's': case 'S': Rend.tgt.tx -= fwd[0]; Rend.tgt.tz -= fwd[1]; break;
      case 'ArrowLeft': case 'a': case 'A': Rend.tgt.tx -= right[0]; Rend.tgt.tz -= right[1]; break;
      case 'ArrowRight': case 'd': case 'D': Rend.tgt.tx += right[0]; Rend.tgt.tz += right[1]; break;
    }
  },

  place(s, type, x, y) {
    const d = DEF(type);
    const dev = window.Dev && Dev.flags;

    if (d.noBuild && !(dev && dev.freeBuild)) return false;
    if ((d.era || 1) > s.era && !(dev && dev.freeBuild)) return false;
    if (d.unique && s.buildings.some(b => b.type === type) && !(dev && dev.freeBuild)) {
      UI.toast(d.name + ' is a monument — you may only raise one.');
      return false;
    }

    if (dev && dev.freeBuild) {
      let changed = false;
      Grid.footTiles(type, x, y, (tx, ty) => {
        if (!Grid.inB(tx, ty)) return;
        const c = Grid.chunkOf(tx, ty), k = c.cx + ',' + c.cy;
        if (!G.cache.ownedSet.has(k)) { s.owned.push(k); G.cache.ownedSet.add(k); changed = true; }
        if (Grid.treeAt(s, tx, ty)) { Grid.clearTree(s, tx, ty); changed = true; }
        const tk = Grid.key(tx, ty), t = G.cache.terrain[tk];
        const bad = d.onRock ? (t === TERRAIN.WATER) : (t !== TERRAIN.GRASS && t !== TERRAIN.FERTILE);
        if (bad && type !== 'road') {
          G.cache.terrain[tk] = d.onRock ? TERRAIN.ROCK : TERRAIN.GRASS;
          s.terraEdits[tk] = G.cache.terrain[tk];
          changed = true;
        }
      }, (Input.rot | 0) & 3);
      if (changed) { Grid.rebuild(s); Rend.layerDirty = true; }
    }
    const useRot = (Input.rot | 0) & 3;
    if (!Grid.canPlace(s, type, x, y, undefined, useRot)) {

      if (window.Sfx) Sfx.play('deny');
      UI.toast('Can’t build the ' + d.name + ' there — ' + Grid.whyBlocked(s, type, x, y, useRot) + '.', 10000);
      return false;
    }
    if (!(dev && dev.freeBuild)) {
      if (s.money < d.cost) { if (window.Sfx) Sfx.play('deny'); UI.toast('Not enough money — ' + d.name + ' costs $' + d.cost + '.'); return false; }
      s.money -= d.cost;
    }
    if (window.Sfx) Sfx.play('place', { size: d.w * d.h });
    const nb = Grid.addBuilding(s, type, x, y, useRot);
    Grid.rebuild(s);

    if (nb && !(dev && dev.freeBuild)) {
      Input.lastAction = { kind: 'place', id: nb.id, cost: d.cost, t: performance.now() };
    }

    if (d.monument && nb) {
      nb.delivered = {}; nb.complete = false; nb.stage = 0; nb.buildFrac = 0;
      Econ.log(s, '\u{1F3D7}️', 'The foundation of the ' + d.name + ' was laid.');
      const need = monumentBuild(type, d.era || 1);
      const list = Object.keys(need).map(k => Math.round(need[k]) + ' ' + (k === 'money' ? '' : k)).join(', ');
      UI.toast('\u{1F3D7}️ Foundation laid. The ' + d.name + ' will rise as your city delivers ' +
        list.replace(/, ([^,]*)$/, ' and $1') + '. It earns nothing until it is finished.', 12000);
    }

    const F = UI.firstToast;
    if (type === 'well') F('well', 'Well placed. It waters a radius (press O to see it) — and needs a road like everything else.');

    if (type === 'farm') F('farm', 'Farm placed. It needs water coverage and 2 workers — no road required. Grain does nothing until a Mill grinds it.');

    if (type === 'mill') F('mill', 'Mill placed — put it touching a Farm for +25% both ways, which also makes it grind ' +
      'FASTER: 3.75 grain/min instead of 3. That is two fertile Farms, or three on plain grass. ' +
      'One Mill makes 1.8 flour/min — your Market drinks 0.6 of it to sell, and the rest feeds about twenty people.');
    if (type === 'house') F('house', 'House placed — it holds 2 to start, and DOUBLES to 4 once two more homes stand ' +
      'within 2 tiles. Every resident is also a worker, so a farm and a mill together need about six houses.');
    if (type === 'market') F('market', 'Market placed. It sells flour to residents within range: keep houses close.');
    if (type === 'coal') F('coal', 'Coal Plant placed. Power flows in a radius (press O). Industrial buildings need it.');
  },

  placeRoad(s, x, y) {
    const dev = window.Dev && Dev.flags;
    if (dev && dev.freeBuild && Grid.inB(x, y)) {
      const c = Grid.chunkOf(x, y), k = c.cx + ',' + c.cy;
      if (!G.cache.ownedSet.has(k)) { s.owned.push(k); G.cache.ownedSet.add(k); Rend.layerDirty = true; }
      if (Grid.treeAt(s, x, y)) { Grid.clearTree(s, x, y); Rend.layerDirty = true; }
    }
    if (!Grid.canPlace(s, 'road', x, y)) return;
    if (!(dev && dev.freeBuild) && DEF('road').cost > 0) {
      if (s.money < DEF('road').cost) { UI.firstToast('roadbroke', 'Out of money for roads — each tile is $' + DEF('road').cost + '.'); return; }
      s.money -= DEF('road').cost;
    }
    const rb = Grid.addBuilding(s, 'road', x, y);

    if (Input.stroke && Input.stroke.kind === 'road') {
      Input.stroke.tiles.push(rb.id);
      Input.stroke.cost += DEF('road').cost;
    }
    if (window.Sfx) Sfx.play('road');
    Grid.rebuild(s);
    UI.firstToast('road', 'Roads connect buildings to the Town Hall. $10 a tile, and NO upkeep — ' +
      'so lay them out properly; a good layout costs you nothing to keep.');
  },

  clearTree(s, x, y) {
    if (!Grid.owned(x, y)) { UI.toast('You can only clear trees on land you own.'); return; }
    if (s.money < TUNE.CLEAR_TREE) { UI.toast('Clearing trees costs $' + TUNE.CLEAR_TREE + '.'); return; }
    s.money -= TUNE.CLEAR_TREE;
    Grid.clearTree(s, x, y);
    Rend.onWorldChange();
    UI.firstToast('clear', 'Land cleared. Wild growth must be removed before you can build on it.');
  },

  terraApply(s, x, y) {
    const kind = Input.tool.type;
    const r = Grid.terraform(s, kind, x, y);
    if (r === 'unowned') UI.firstToast('terraown', 'Terraforming only works on land you own.');
    else if (r === 'occupied') UI.firstToast('terraocc', 'Demolish structures before reshaping the ground under them.');
    else if (r === 'money') UI.toast('Not enough money — ' + kind + ' costs $' + terraCost(kind, s.era) + ' per tile.');
    else if (r === 'locked') UI.toast('\u{1F6AB} ' + (terraLocked(kind, s.era) ||
      'that brush is not available in this age') + '.', 9000);
    else if (r === 'ash') UI.firstToast('ash', '\u{1F525} Ash cannot be reshaped — not for money, not ever. ' +
      'That ground is where a forest was, and the forest is not coming back.');
    else if (r === true) UI.firstToast('terra', 'Terraforming! Sculpt grass, water, rock, mountains and trees to design your world.');
  },

  demolish(b) {
    if (DEF(b.type).fixed) { UI.toast('The Town Hall is permanent — it’s the anchor everything connects to.'); return; }

    if (DEF(b.type).monument && !b.complete && Object.keys(b.delivered || {}).length) {
      const p = Econ.monumentProgress(G.s, b);

      if (Input.confirmRaze !== b.id || performance.now() - (Input.confirmRazeT || 0) > 5000) {
        Input.confirmRaze = b.id;
        Input.confirmRazeT = performance.now();
        UI.toast('⚠️ That site is ' + Math.round(p.frac * 100) + '% built. Tearing it down returns the ' +
          'foundation fee only — every delivery is lost. Click Demolish again within 5s to confirm.', 9000);
        return;
      }
    }
    Input.confirmRaze = null;
    const base = b.type === 'farm2' ? DEF('estate').cost + UPGRADES.estate.cost : DEF(b.type).cost;

    const refund = Math.floor((base != null ? base : 100) * TUNE.DEMOLISH_REFUND);
    G.s.money += refund;
    if (window.Sfx) Sfx.play('demolish');

    const la = Input.lastAction;
    if (la && (la.id === b.id || (la.ids || []).includes(b.id))) Input.lastAction = null;
    Grid.removeBuilding(G.s, b);
    Grid.rebuild(G.s);
    if (Input.selected === b) { Input.selected = null; UI.hideInspector(); }
  },
};
