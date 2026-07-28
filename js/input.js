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

  setTool(mode, type) {
    Input.tool = { mode, type: type || null, payload: null };
    if (mode !== 'select') { Input.selected = null; UI.hideInspector(); }
    UI.reflectTool();
    Rend._overlayDirty = true;
  },

  startMove(b) {
    Input.tool = { mode: 'move', type: b.type, payload: b };
    Input.selected = null;
    UI.hideInspector();
    UI.toast('Moving ' + DEF(b.type).name + ' — click a valid spot to set it down. Esc or right-click to cancel.');
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
        Input.leftDown = { sx: e.clientX, sy: e.clientY, tile: p, planeY: p ? p.point.y : 0, moved: false, shift: e.shiftKey };
        break;
      case 'road':
        if (!p) return;
        Input.painting = true;
        Input.lastPaint = p;
        Input.placeRoad(s, p.x, p.y);
        break;
      case 'terra':
        if (!p) return;
        Input.painting = true;
        Input.lastPaint = p;
        Input.terraApply(s, p.x, p.y);
        break;
      case 'build':
        if (p) Input.place(s, Input.tool.type, p.x, p.y);
        break;
      case 'move': {
        if (!p) return;
        const b = Input.tool.payload;
        if (!b || !s.buildings.includes(b)) { Input.setTool('select'); return; }
        if (Grid.canPlace(s, b.type, p.x, p.y, b.id)) {
          Grid.moveBuilding(s, b, p.x, p.y);
          Grid.rebuild(s);
          Input.setTool('select');
          Input.selected = b;
          UI.showInspector(b);
        } else {
          UI.toast('Can’t place it there — needs owned, cleared, buildable ground' + (DEF(b.type).onRock ? ' with rock' : '') + '.');
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
        if (G.cache.ownedSet.has(c.cx + ',' + c.cy)) break;
        if (!Grid.chunkBuyable(s, c.cx, c.cy)) { UI.toast('Land must border territory you already own.'); break; }
        const price = Grid.chunkPrice(c.cx, c.cy);
        if (Grid.buyChunk(s, c.cx, c.cy)) {
          UI.toast('Bought a 4×4 chunk for ' + Util.fmtMoney(price) + '. Clear its trees and rocks before building.');
          UI.firstToast('land', 'New land keeps its wild trees — use the Demolish tool to clear them ($' + TUNE.CLEAR_TREE + ' each), or Terraform to reshape it.');
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

    if (Input.tool.mode === 'buyland' && p) {
      const c = Grid.chunkOf(p.x, p.y);
      if (!G.cache.ownedSet.has(c.cx + ',' + c.cy) && Grid.chunkBuyable(G.s, c.cx, c.cy)) {
        Input.tt.textContent = Util.fmtMoney(Grid.chunkPrice(c.cx, c.cy));
        Input.tt.classList.remove('hidden');
        Input.tt.style.left = (e.clientX + 14) + 'px';
        Input.tt.style.top = (e.clientY - 10) + 'px';
      } else Input.tt.classList.add('hidden');
    } else if (Input.tool.mode === 'terra' && p) {
      Input.tt.textContent = '$' + TUNE.TERRA[Input.tool.type];
      Input.tt.classList.remove('hidden');
      Input.tt.style.left = (e.clientX + 14) + 'px';
      Input.tt.style.top = (e.clientY - 10) + 'px';
    } else Input.tt.classList.add('hidden');

    if (Input.painting && p) {
      let { x, y } = Input.lastPaint;
      const dx = Math.abs(p.x - x), dy = Math.abs(p.y - y);
      const sx = x < p.x ? 1 : -1, sy = y < p.y ? 1 : -1;
      let err = dx - dy, guard = 0;
      while ((x !== p.x || y !== p.y) && guard++ < 512) {
        const e2 = err * 2;
        if (e2 > -dy) { err -= dy; x += sx; }
        else if (e2 < dx) { err += dx; y += sy; }
        if (Input.tool.mode === 'road') Input.placeRoad(G.s, x, y);
        else if (Input.tool.mode === 'terra') Input.terraApply(G.s, x, y);
      }
      Input.lastPaint = p;
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
    const step = Rend.tgt.di * 0.09;
    const az = Rend.tgt.az;
    const fwd = [-Math.sin(az) * step, -Math.cos(az) * step];
    const right = [Math.cos(az) * step, -Math.sin(az) * step];
    switch (e.key) {
      case 'Escape': Input.setTool('select'); Input.selected = null; UI.hideInspector();
        for (const p of document.querySelectorAll('.panel')) p.remove(); break;
      case ' ': e.preventDefault(); Main.setSpeed(Main.paused ? Main.speed : 0); break;
      case '1': Main.setSpeed(1); break;
      case '2': Main.setSpeed(2); break;
      case '3': Main.setSpeed(4); break;
      case 'h': case 'H': UI.togglePanel('help-panel', UI.helpHTML); break;
      case 'g': case 'G': UI.togglePanel('guide-panel', UI.guideHTML); break;
      case 'o': case 'O': UI.toggleOverlays(); break;

      case 't': case 'T':
        if (UI.literate(G.s)) UI.togglePanel('tally-panel', UI.tallyHTML);
        else UI.toast('\u{1F4DC} Nobody in this city can write. Build a Scribe\'s House and the numbers appear.', 7000);
        break;
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
    if ((d.era || 1) > s.era && !(dev && dev.freeBuild)) return;
    if (d.unique && s.buildings.some(b => b.type === type) && !(dev && dev.freeBuild)) {
      UI.toast(d.name + ' is a monument — you may only raise one.');
      return;
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
      });
      if (changed) { Grid.rebuild(s); Rend.layerDirty = true; }
    }
    if (!Grid.canPlace(s, type, x, y)) {

      UI.toast('Can’t build the ' + d.name + ' there — ' + Grid.whyBlocked(s, type, x, y) + '.', 10000);
      return;
    }
    if (!(dev && dev.freeBuild)) {
      if (s.money < d.cost) { UI.toast('Not enough money — ' + d.name + ' costs $' + d.cost + '.'); return; }
      s.money -= d.cost;
    }
    const nb = Grid.addBuilding(s, type, x, y);
    Grid.rebuild(s);

    if (d.monument && nb) {
      nb.delivered = {}; nb.complete = false; nb.stage = 0; nb.buildFrac = 0;
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
    Grid.addBuilding(s, 'road', x, y);
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
    else if (r === 'money') UI.toast('Not enough money — ' + kind + ' costs $' + TUNE.TERRA[kind] + ' per tile.');
    else if (r === true) UI.firstToast('terra', 'Terraforming! Sculpt grass, water, rock, mountains and trees to design your world.');
  },

  demolish(b) {
    if (DEF(b.type).fixed) { UI.toast('The Town Hall is permanent — it’s the anchor everything connects to.'); return; }

    if (DEF(b.type).monument && !b.complete && Object.keys(b.delivered || {}).length) {
      const p = Econ.monumentProgress(G.s, b);
      if (Input.confirmRaze !== b.id) {
        Input.confirmRaze = b.id;
        UI.toast('⚠️ That site is ' + Math.round(p.frac * 100) + '% built. Tearing it down returns the ' +
          'foundation fee only — every delivery is lost. Click Demolish again to confirm.', 9000);
        return;
      }
    }
    Input.confirmRaze = null;
    const base = b.type === 'farm2' ? DEF('estate').cost + UPGRADES.estate.cost : DEF(b.type).cost;

    const refund = Math.floor((base != null ? base : 100) * TUNE.DEMOLISH_REFUND);
    G.s.money += refund;
    Grid.removeBuilding(G.s, b);
    Grid.rebuild(G.s);
    if (Input.selected === b) { Input.selected = null; UI.hideInspector(); }
  },
};
