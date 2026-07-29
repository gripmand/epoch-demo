'use strict';

const Rend = {
  renderer: null, scene: null, camera: null, canvas: null,

  cam: { tx: 256, tz: 256, azimuth: 0, polar: 0.85, dist: 46 },
  tgt: { tx: 256, tz: 256, az: 0, po: 0.85, di: 46 },
  vel: { x: 0, z: 0, az: 0 },
  _camT: 0,
  POLAR_MIN: 0.32, POLAR_MAX: 1.15,
  DIST_MIN: 7, DIST_MAX: 170,

  CH: 32,
  SUB: 2,
  OVP: 512,
  VIEW: 2,
  SPLAT_RES: 4,

  FAR_STEP: 2,

  chunks: new Map(),
  buildingObjs: new Map(),
  heights: null,
  showWater: false, showPower: false, showSoil: false,

  layerDirty: true,
  chunksStale: false,
  materialsStale: false,
  _worldDirty: true, _roadsDirty: true, _overlayDirty: true,
  _chunkKeyAt: '',

  ERA_GROUND: {
    1: {
      base:     { color: 0xe9a952, tex: 'silt' },
      fertile:  { color: 0x8f9a3c, tex: 'field' },

      salt:     { color: 0xd8bf96, tex: 'salt' },
      saltRidge: 0xe8d5ab,
      rock:     { color: 0xa8875a, tex: 'rock' },
      cliff:    0x826047,
      bed:      0x5c5730,

      grain: 0.16, macro: 0.14,
    },
    2: {
      base:     { color: 0xd9b271, tex: 'silt' },
      fertile:  { color: 0x7f9440, tex: 'field' },
      salt:     { color: 0xf0e2c0, tex: 'salt' },
      rock:     { color: 0xc0a273, tex: 'rock' },
      cliff: 0x8a6d4a, bed: 0x4a5a46, grain: 0.18, macro: 0.20,
    },
    3: {
      base:     { color: 0x9aad63, tex: 'silt' },
      fertile:  { color: 0x6d9440, tex: 'field' },
      salt:     { color: 0xd8d9be, tex: 'salt' },
      rock:     { color: 0xbfc0b0, tex: 'rock' },
      cliff: 0x8e9184, bed: 0x2f6a63, grain: 0.16, macro: 0.22,
    },
    9: {
      base:     { color: 0x8f8a76, tex: 'silt' },
      fertile:  { color: 0x77864a, tex: 'field' },
      salt:     { color: 0xb9b3a4, tex: 'salt' },
      rock:     { color: 0x6e6459, tex: 'rock' },
      cliff: 0x554e46, bed: 0x3c4249, grain: 0.14, macro: 0.24,
    },
    12: {
      base:     { color: 0x9a938a, tex: 'silt' },
      fertile:  { color: 0x6f7a74, tex: 'field' },
      salt:     { color: 0xcfc9c0, tex: 'salt' },
      rock:     { color: 0xb0aaa2, tex: 'rock' },
      cliff: 0x7b7670, bed: 0x223d55, grain: 0.12, macro: 0.18,
    },
  },

  groundFor(era) {
    const keys = Object.keys(Rend.ERA_GROUND).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= (era || 1)) pick = k;
    return Rend.ERA_GROUND[pick];
  },

  tex: {},
  loadGroundTextures() {
    for (const name of ['silt', 'field', 'salt', 'rock', 'road']) {
      if (Rend.tex[name] !== undefined) continue;
      Rend.tex[name] = null;
      const img = new Image();
      img.onload = () => {
        const t = new THREE.Texture(img);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.encoding = THREE.sRGBEncoding;
        t.anisotropy = 8;
        t.needsUpdate = true;
        Rend.tex[name] = t;
        Rend.chunksStale = true;
      };
      img.onerror = () => {};
      img.src = 'textures/' + name + '.png';
    }
  },

  init(canvas) {
    Rend.canvas = canvas;
    Rend.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    Rend.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    Rend.scene = new THREE.Scene();
    Rend.camera = new THREE.PerspectiveCamera(46, 1, 0.5, 900);

    Gfx.init(Rend.renderer, Rend.scene);
    Rend.loadGroundTextures();

    Rend.apron = new THREE.Mesh(
      new THREE.PlaneGeometry(6000, 6000),
      Gfx.unlit(0xc08340, { fog: true })
    );
    Rend.apron.rotation.x = -Math.PI / 2;
    Rend.apron.position.set(TUNE.WORLD / 2, -1.5, TUNE.WORLD / 2);
    Rend.scene.add(Rend.apron);

    Rend.mini = document.getElementById('minimap');
    Rend.miniCtx = Rend.mini ? Rend.mini.getContext('2d') : null;
    Rend.miniFrame = 0;
    Rend.statusTex = { bad: Rend.makeStatusTex('#d64545'), warn: Rend.makeStatusTex('#d69a3c') };

    Rend.applyEra((G.s && G.s.era) || 1);
    Rend.computeHeights(G.s);
    Rend.updateChunks(G.s, true);
    Rend.buildWorldSplat();
    Rend.buildFarField();

    Rend.chunksStale = false;
    Rend.layerDirty = false;
    Rend._overlayDirty = false;
    Rend._roadsDirty = false;
    Rend.resize();
    window.addEventListener('resize', Rend.resize);
  },

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    Rend.renderer.setSize(w, h, false);
    Rend.camera.aspect = w / h;
    Rend.camera.updateProjectionMatrix();
    Gfx.resize(w, h);
  },

  applyEra(era) {
    const gr = Gfx.applyGrade(era);
    Rend._era = era;
    Rend.ground = Rend.groundFor(era);
    Rend._scatterDefs = null;
    if (Rend.apron) Rend.apron.material.color.copy(Gfx.color(gr.apron || gr.fog));

    if (Rend.farMesh) {
      Rend.scene.remove(Rend.farMesh);
      Rend.farMesh.geometry.dispose();
      Rend.farMesh.material.dispose();
      Rend.farMesh = null;
    }
    Rend._farStale = true;
    if (Rend.waterMesh) {
      const w = gr.water;
      Rend.waterMesh.material.color.copy(Gfx.color(w.color));
      Rend.waterMesh.material.opacity = w.opacity;
      Rend.waterMesh.material.needsUpdate = true;
    }
    Rend.chunksStale = true;
  },

  makeStatusTex(color) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = color;
    g.beginPath(); g.arc(32, 32, 28, 0, 7); g.fill();
    g.strokeStyle = 'rgba(0,0,0,0.45)'; g.lineWidth = 3; g.stroke();
    g.fillStyle = '#fff';
    g.font = 'bold 40px system-ui';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('!', 32, 35);
    return new THREE.CanvasTexture(c);
  },

  TERRAIN_SHAPE: {
    scale: 26,
    relief: 0.85,
    duneScale: 7.5,
    dunes: 0.26,
    smooth: 2,

    dryFloor: -0.12,

    shoreFloor: -0.27,

    channelFloor: -0.62,
  },

  noise(u, v) {
    const iu = Math.floor(u), iv = Math.floor(v);
    const fu = u - iu, fv = v - iv;
    const lerp = (a, b, t) => a + (b - a) * (t * t * (3 - 2 * t));
    return lerp(
      lerp(Util.hash2(iu, iv), Util.hash2(iu + 1, iv), fu),
      lerp(Util.hash2(iu, iv + 1), Util.hash2(iu + 1, iv + 1), fu), fv);
  },

  ERA_LIFT: {
    1: { water: -0.75, rock: 0.42, mountain: 0.95 },
    2: { water: -0.75, rock: 0.60, mountain: 1.90 },
    3: { water: -0.60, rock: 0.95, mountain: 2.60 },
    4: { water: -0.85, rock: 0.90, mountain: 3.40 },
    5: { water: -0.80, rock: 1.10, mountain: 3.20 },
    7: { water: -0.75, rock: 0.90, mountain: 3.40 },
  },

  liftSet(era) {
    const keys = Object.keys(Rend.ERA_LIFT).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= (era || 1)) pick = k;
    return Rend.ERA_LIFT[pick];
  },

  tileLift(t) {
    const L = Rend.liftSet((G.s && G.s.era) || 1);
    if (t === TERRAIN.WATER) return L.water;
    if (t === TERRAIN.ROCK) return L.rock;
    if (t === TERRAIN.MOUNTAIN) return L.mountain;
    if (t === TERRAIN.SALT) return -0.05;
    return 0;
  },

  computeHeights(s) {
    const W = TUNE.WORLD, SUB = Rend.SUB, N = W * SUB + 1;
    const t = G.cache.terrain;
    const L = new Float32Array(W * W);
    for (let y = 0; y < W; y++)
      for (let x = 0; x < W; x++) L[y * W + x] = Rend.tileLift(t[Grid.key(x, y)]);

    const LB = new Float32Array(L);
    for (let pass = 0; pass < 2; pass++) {
      const S = LB.slice();
      for (let y = 1; y < W - 1; y++)
        for (let x = 1; x < W - 1; x++) {
          const k = y * W + x;
          LB[k] = (S[k] * 4 + S[k - 1] + S[k + 1] + S[k - W] + S[k + W]) / 8;
        }
    }
    const sample = (A, x, y) => {
      const u = Util.clamp(x - 0.5, 0, W - 1.001), v = Util.clamp(y - 0.5, 0, W - 1.001);
      const iu = Math.min(W - 2, Math.floor(u)), iv = Math.min(W - 2, Math.floor(v));
      const fu = u - iu, fv = v - iv;
      return A[iv * W + iu] * (1 - fu) * (1 - fv) + A[iv * W + iu + 1] * fu * (1 - fv) +
             A[(iv + 1) * W + iu] * (1 - fu) * fv + A[(iv + 1) * W + iu + 1] * fu * fv;
    };
    const liftAt = (x, y) => sample(L, x, y);
    const liftBlur = (x, y) => sample(LB, x, y);

    const TER = Rend.TERRAIN_SHAPE;
    const fbm = (x, y) => {
      let amp = 1, frq = 1, sum = 0, norm = 0;
      for (let o = 0; o < 4; o++) {
        sum += Rend.noise(x * frq / TER.scale, y * frq / TER.scale) * amp;
        norm += amp;
        amp *= 0.5; frq *= 2.07;
      }
      return sum / norm;
    };
    const ridge = (x, y) => 1 - Math.abs(Rend.noise(x / TER.duneScale, y / TER.duneScale) * 2 - 1);

    const H = new Float32Array(N * N);
    for (let iy = 0; iy < N; iy++) {
      const y = iy / SUB;
      for (let ix = 0; ix < N; ix++) {
        const x = ix / SUB;
        const roll = (fbm(x, y) - 0.5) * TER.relief + (ridge(x, y) - 0.5) * TER.dunes;
        const ls = liftAt(x, y), lb = liftBlur(x, y);

        let h = roll + Math.min(ls, lb);
        if (ls > -0.45) {

          const shore = Util.clamp(-lb / 0.45, 0, 1);
          h = Math.max(h, TER.dryFloor + shore * (TER.shoreFloor - TER.dryFloor));
        } else {

          h = Math.min(h, TER.channelFloor);
        }
        H[iy * N + ix] = h;
      }
    }
    for (let pass = 0; pass < TER.smooth; pass++) {
      const S = H.slice();
      for (let iy = 1; iy < N - 1; iy++)
        for (let ix = 1; ix < N - 1; ix++)
          H[iy * N + ix] = (S[iy * N + ix] * 2 + S[iy * N + ix - 1] + S[iy * N + ix + 1] +
                            S[(iy - 1) * N + ix] + S[(iy + 1) * N + ix]) / 6;
    }

    const wet = (x, y) => Grid.inB(x, y) && t[Grid.key(x, y)] === TERRAIN.WATER;
    for (let iy = 0; iy < N; iy++)
      for (let ix = 0; ix < N; ix++) {
        const tx = Math.floor(ix / SUB), ty = Math.floor(iy / SUB);
        if (wet(tx, ty) && wet(tx + 1, ty) && wet(tx - 1, ty) && wet(tx, ty + 1) && wet(tx, ty - 1))
          H[iy * N + ix] = Math.min(H[iy * N + ix], -0.46);
      }

    for (const b of (s ? s.buildings : [])) {
      if (b.type === 'road') continue;
      const d = Grid.dimsOf(b);
      let sum = 0, cnt = 0;
      for (let iy = b.y * SUB; iy <= (b.y + d.h) * SUB; iy++)
        for (let ix = b.x * SUB; ix <= (b.x + d.w) * SUB; ix++) { sum += H[iy * N + ix]; cnt++; }
      const avg = sum / cnt;
      for (let iy = b.y * SUB; iy <= (b.y + d.h) * SUB; iy++)
        for (let ix = b.x * SUB; ix <= (b.x + d.w) * SUB; ix++) H[iy * N + ix] = avg;
    }
    Rend.heights = H;
    Rend.N = N;
    return H;
  },

  groundY(x, z) {
    const H = Rend.heights;
    if (!H) return 0;
    const SUB = Rend.SUB, N = Rend.N;
    const gx = Util.clamp(x * SUB, 0, N - 1.001), gz = Util.clamp(z * SUB, 0, N - 1.001);
    const ix = Math.floor(gx), iz = Math.floor(gz);
    const fx = gx - ix, fz = gz - iz;
    const h00 = H[iz * N + ix], h10 = H[iz * N + ix + 1];
    const h01 = H[(iz + 1) * N + ix], h11 = H[(iz + 1) * N + ix + 1];
    return (h00 * (1 - fx) + h10 * fx) * (1 - fz) + (h01 * (1 - fx) + h11 * fx) * fz;
  },

  floodFraction() {
    const W = TUNE.WORLD;
    let under = 0;
    for (let y = 0; y < W; y += 2)
      for (let x = 0; x < W; x += 2) if (Rend.groundY(x + 0.5, y + 0.5) < -0.3) under++;
    return under / ((W / 2) * (W / 2));
  },

  wetFraction() {
    const W = TUNE.WORLD;
    let water = 0, wet = 0;
    for (let y = 0; y < W; y += 2)
      for (let x = 0; x < W; x += 2) {
        if (G.cache.terrain[Grid.key(x, y)] !== TERRAIN.WATER) continue;
        water++;
        if (Rend.groundY(x + 0.5, y + 0.5) < -0.3) wet++;
      }
    return water ? wet / water : 0;
  },

  chunkKey(cx, cz) { return cx + ',' + cz; },

  liveRadius() {
    return Rend.VIEW + (Rend.cam.dist > 70 ? 2 : Rend.cam.dist > 40 ? 1 : 0);
  },

  updateChunks(s, force) {
    const CH = Rend.CH, nC = Math.ceil(TUNE.WORLD / CH);
    const ccx = Util.clamp(Math.floor(Rend.cam.tx / CH), 0, nC - 1);
    const ccz = Util.clamp(Math.floor(Rend.cam.tz / CH), 0, nC - 1);
    const R = Rend.liveRadius();
    const stamp = ccx + ':' + ccz + ':' + R;
    if (!force && stamp === Rend._chunkKeyAt) return;
    Rend._chunkKeyAt = stamp;

    const want = new Set();
    for (let dz = -R; dz <= R; dz++)
      for (let dx = -R; dx <= R; dx++) {
        const cx = ccx + dx, cz = ccz + dz;
        if (cx < 0 || cz < 0 || cx >= nC || cz >= nC) continue;
        want.add(Rend.chunkKey(cx, cz));
      }

    Rend._liveRect = {
      x0: Math.max(0, ccx - R) * CH, x1: Math.min(nC, ccx + R + 1) * CH,
      z0: Math.max(0, ccz - R) * CH, z1: Math.min(nC, ccz + R + 1) * CH,
    };
    Rend._farStale = true;

    let budget = force ? 999 : 2;
    for (const k of want) {
      if (Rend.chunks.has(k)) continue;
      if (budget-- <= 0) { Rend._chunkKeyAt = ''; break; }
      const [cx, cz] = k.split(',').map(Number);
      Rend.chunks.set(k, Rend.buildChunk(s, cx, cz));
    }
    for (const [k, c] of Rend.chunks)
      if (!want.has(k)) { Rend.disposeChunk(c); Rend.chunks.delete(k); }
  },

  buildChunk(s, cx, cz) {
    const CH = Rend.CH, SUB = Rend.SUB;
    const c = { cx, cz, scatter: [] };

    const geo = new THREE.PlaneGeometry(CH, CH, CH * SUB, CH * SUB);
    c.base = new THREE.Mesh(geo, Rend.makeGroundMaterial(c));
    c.base.receiveShadow = true;
    Rend.scene.add(c.base);

    c.canvas = document.createElement('canvas');
    c.canvas.width = c.canvas.height = Rend.OVP;
    c.tex = new THREE.CanvasTexture(c.canvas);
    c.tex.encoding = THREE.sRGBEncoding;
    c.tex.anisotropy = 4;
    c.overlay = new THREE.Mesh(geo.clone(), Gfx.unlit(0xffffff, {
      map: c.tex, transparent: true, depthWrite: false, fog: false,
    }));
    c.overlay.material.polygonOffset = true;
    c.overlay.material.polygonOffsetFactor = -1;
    c.overlay.renderOrder = 2;
    Rend.scene.add(c.overlay);

    Rend.applyChunkHeights(c);
    Rend.bakeOverlay(s, c);
    Rend.buildChunkRoads(s, c);
    c.scatter = Rend.buildChunkScatter(s, cx, cz);
    return c;
  },

  applyChunkHeights(c) {
    const SUB = Rend.SUB, CH = Rend.CH, N = Rend.N;
    const n2 = CH * SUB + 1;
    const pos = c.base.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const ix = i % n2, iz = Math.floor(i / n2);
      const gx = c.cx * CH * SUB + ix, gz = c.cz * CH * SUB + iz;
      const y = (gx <= N - 1 && gz <= N - 1) ? Rend.heights[gz * N + gx] : 0;
      pos.setXYZ(i, c.cx * CH + ix / SUB, y, c.cz * CH + iz / SUB);
    }
    pos.needsUpdate = true;
    c.base.geometry.computeVertexNormals();

    c.base.geometry.computeBoundingSphere();
    c.base.geometry.computeBoundingBox();
    c.overlay.geometry.copy(c.base.geometry);
    c.overlay.geometry.computeBoundingSphere();
  },

  disposeChunk(c) {
    for (const m of [c.base, c.overlay, c.roads]) {
      if (!m) continue;
      Rend.scene.remove(m);
      m.geometry.dispose();
    }
    if (c.base.material.map) c.base.material.map.dispose();
    if (c.splatTex) c.splatTex.dispose();
    c.base.material.dispose();
    c.overlay.material.dispose();
    c.tex.dispose();
    for (const e of c.scatter) { Rend.scene.remove(e.im); }
  },

  buildChunkSplat(c) {
    const CH = Rend.CH, R = Rend.SPLAT_RES, P = CH * R;
    if (!Rend._stripField) Rend.buildStripField();
    const cv = document.createElement('canvas');
    cv.width = cv.height = P;
    const g = cv.getContext('2d');
    const img = g.createImageData(P, P);
    const d = img.data;
    for (let py = 0; py < P; py++)
      for (let px = 0; px < P; px++) {
        const wx = c.cx * CH + Math.floor(px / R), wy = c.cz * CH + Math.floor(py / R);

        let r = 0, gg = 0, b = 0;
        if (Grid.inB(wx, wy)) {
          const t = G.cache.terrain[Grid.key(wx, wy)];
          if (t === TERRAIN.FERTILE) r = 255;
          else if (t === TERRAIN.SALT) gg = 255;
          else if (t === TERRAIN.ROCK || t === TERRAIN.MOUNTAIN) b = 255;

          if (t !== TERRAIN.WATER && t !== TERRAIN.ROCK && t !== TERRAIN.MOUNTAIN) {
            const soil = Grid.soilAt(wx, wy);
            if (soil < 0.999) { r = r * soil; gg = Math.max(gg, 255 * (1 - soil)); }
          }
        }
        const i = (py * P + px) * 4;
        d[i] = r; d[i + 1] = gg; d[i + 2] = b; d[i + 3] = 255;
      }
    g.putImageData(img, 0, 0);

    const blur = document.createElement('canvas');
    blur.width = blur.height = P;
    const bg = blur.getContext('2d');
    bg.filter = 'blur(' + (R * 0.35) + 'px)';
    bg.drawImage(cv, 0, 0);

    const tex = new THREE.CanvasTexture(blur);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.flipY = false;
    tex.needsUpdate = true;
    return tex;
  },

  TILING: 0.42,
  DETAIL: 1.7,

  makeGroundMaterial(c) {
    const GR = Rend.ground || Rend.groundFor(1);
    const mat = Gfx.mat(0xffffff, { cache: false });
    c.splatTex = Rend.buildChunkSplat(c);

    const u = {
      tSplat: { value: c.splatTex },
      splatOrigin: { value: new THREE.Vector2(c.cx * Rend.CH, c.cz * Rend.CH) },
      splatSize: { value: Rend.CH },
      cBase: { value: Gfx.color(GR.base.color) },
      cField: { value: Gfx.color(GR.fertile.color) },
      cSalt: { value: Gfx.color(GR.salt.color) },
      cRock: { value: Gfx.color(GR.rock.color) },
      cCliff: { value: Gfx.color(GR.cliff) },
      cBed: { value: Gfx.color(GR.bed) },
      grainAmt: { value: GR.grain },
      macroAmt: { value: GR.macro },
      detailFreq: { value: Rend.DETAIL },
      tileRepeat: { value: Rend.TILING },
      tCrust: { value: Rend.makeCrustTexture() },
      crustScale: { value: 0.14 },
      cSaltRidge: { value: Gfx.color(GR.saltRidge || 0xfff0cf) },
      tStrip: { value: Rend._stripTex || Rend.buildStripTexture() },
      worldW: { value: TUNE.WORLD },
      stripAmt: { value: GR.strip === undefined ? 0.22 : GR.strip },
      tBase: { value: Rend.tex.silt || null },
      tField: { value: Rend.tex.field || null },
      tSalt: { value: Rend.tex.salt || null },
      tRock: { value: Rend.tex.rock || null },
      useTex: { value: new THREE.Vector4(
        Rend.tex.silt ? 1 : 0, Rend.tex.field ? 1 : 0,
        Rend.tex.salt ? 1 : 0, Rend.tex.rock ? 1 : 0) },
    };
    mat.userData.splat = u;

    const prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (shader, renderer) => {
      if (prev) prev(shader, renderer);
      Object.assign(shader.uniforms, u);

      shader.vertexShader = shader.vertexShader
        .replace('void main() {', 'varying vec2 vGW; varying vec3 vGN; varying float vGY;\nvoid main() {')
        .replace('#include <begin_vertex>',
          '#include <begin_vertex>\n  vGW = position.xz;\n  vGN = normal;\n  vGY = position.y;');

      shader.fragmentShader = shader.fragmentShader
        .replace('void main() {', `
          varying vec2 vGW; varying vec3 vGN; varying float vGY;
          uniform sampler2D tSplat;
          uniform vec2 splatOrigin; uniform float splatSize;
          uniform vec3 cBase, cField, cSalt, cRock, cCliff, cBed;
          uniform float grainAmt, macroAmt, detailFreq, tileRepeat;
          uniform sampler2D tBase, tField, tSalt, tRock;
          uniform sampler2D tCrust; uniform float crustScale; uniform vec3 cSaltRidge;
          uniform sampler2D tStrip; uniform float worldW; uniform float stripAmt;
          uniform vec4 useTex;

          float gHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float gNoise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(gHash(i), gHash(i + vec2(1.0, 0.0)), f.x),
                       mix(gHash(i + vec2(0.0, 1.0)), gHash(i + vec2(1.0, 1.0)), f.x), f.y);
          }
          // ★ The ground's own detail is QUANTISED, exactly like the lighting.
          // A smooth grain under a cel ramp is a photoreal surface wearing a
          // cel hat: the value steps have to go all the way down.
          float celSteps3(float v) { return floor(v * 3.0) / 3.0 + 0.1667; }
          void main() {`)
        .replace('#include <map_fragment>', `
          #include <map_fragment>
          {
            vec2 wp = vGW;
            // jitter the mask lookup so region edges interlock organically
            // instead of following the splat map's own pixel grid
            vec2 jit = vec2(gNoise(wp * 1.3), gNoise(wp * 1.3 + 37.0)) - 0.5;
            vec2 suv = (wp - splatOrigin) / splatSize + jit * (0.9 / splatSize);
            vec4 sw = texture2D(tSplat, clamp(suv, 0.002, 0.998));

            float wF = sw.r, wS = sw.g, wR = sw.b;
            float wB = max(0.0, 1.0 - (wF + wS + wR));

            // salt dries into polygons with the crust pushed up pale along the
            // cracks — the signature surface of a salinized interfluve
            vec3 saltCol = cSalt;
            if (wS > 0.004) {
              float ridge = texture2D(tCrust, wp * crustScale).r;
              saltCol = mix(cSalt, cSaltRidge, ridge * 0.55);
            }

            // ★ THE FIELD STRIPS. Long narrow plots laid perpendicular to the
            // canal so each one has its own water frontage — the single most
            // historically specific thing in this landscape, and invisible
            // until now because the baulks between them are less than a tile
            // wide. Two hard steps, so cultivated ground reads as worked
            // without turning into corduroy.
            vec3 fieldCol = cField;
            if (wF > 0.004) {
              float ph = texture2D(tStrip, wp / worldW).r;
              fieldCol *= 1.0 + (floor(ph * 2.0) / 1.0 - 0.5) * stripAmt;
            }

            vec3 col = cBase * wB + fieldCol * wF + saltCol * wS + cRock * wR;

            // a texture, where one exists, replaces its flat fill in the blend
            vec2 duv = wp * tileRepeat;
            if (useTex.x > 0.5) col += (texture2D(tBase,  duv).rgb - cBase)  * wB;
            if (useTex.y > 0.5) col += (texture2D(tField, duv).rgb - cField) * wF;
            if (useTex.z > 0.5) col += (texture2D(tSalt,  duv).rgb - cSalt)  * wS;
            if (useTex.w > 0.5) col += (texture2D(tRock,  duv).rgb - cRock)  * wR;

            // MACRO variation: real ground varies at a scale far larger than a
            // tile. Hollows read damp, crests bleach out. Without this, one
            // material across 512 tiles reads as a single flat sheet.
            float macro = celSteps3(gNoise(wp * 0.038));
            col *= 1.0 + (macro - 0.5) * macroAmt * 2.0;

            // GRAIN: per-pixel, so it is as sharp at ground level as it is from
            // orbit. This is the detail the 16px-per-tile canvas could never
            // deliver, and it costs no art at all.
            float grain = celSteps3(gNoise(wp * detailFreq) * 0.65 + gNoise(wp * detailFreq * 3.1) * 0.35);
            col *= 1.0 + (grain - 0.5) * grainAmt * 2.0;

            // steep faces are bare rock whatever the tile says they are
            float slope = 1.0 - clamp(vGN.y, 0.0, 1.0);
            col = mix(col, cCliff, smoothstep(0.28, 0.62, slope));

            // channel beds, so water reads as depth rather than as a decal
            col = mix(col, cBed, smoothstep(-0.10, -0.45, vGY));

            diffuseColor.rgb = col;
          }`);
    };
    mat.needsUpdate = true;
    return mat;
  },

  buildWorldSplat() {
    const W = TUNE.WORLD;
    if (!Rend._stripField) Rend.buildStripField();
    const data = new Uint8Array(W * W * 4);
    for (let y = 0; y < W; y++)
      for (let x = 0; x < W; x++) {
        const t = G.cache.terrain[Grid.key(x, y)];
        const i = (y * W + x) * 4;
        data[i] = t === TERRAIN.FERTILE ? 255 : 0;
        data[i + 1] = t === TERRAIN.SALT ? 255 : 0;
        data[i + 2] = (t === TERRAIN.ROCK || t === TERRAIN.MOUNTAIN) ? 255 : 0;
        data[i + 3] = 255;
      }
    return (Rend._worldSplat = Rend._dataTex(Rend._worldSplat, data, W));
  },

  buildStripField() {
    const W = TUNE.WORLD;
    const t = G.cache.terrain;

    const dist = new Int16Array(W * W).fill(-1);
    let q = [];
    for (let i = 0; i < W * W; i++) if (t[i] === TERRAIN.WATER) { dist[i] = 0; q.push(i); }
    for (let d = 0; q.length && d < 40; d++) {
      const next = [];
      for (const k of q) {
        const x = k % W, y = (k / W) | 0;
        for (let n = 0; n < 4; n++) {
          const nx = x + (n === 0 ? 1 : n === 1 ? -1 : 0);
          const ny = y + (n === 2 ? 1 : n === 3 ? -1 : 0);
          if (nx < 0 || ny < 0 || nx >= W || ny >= W) continue;
          const nk = ny * W + nx;
          if (dist[nk] !== -1) continue;
          dist[nk] = d + 1;
          next.push(nk);
        }
      }
      q = next;
    }

    const dOf = (x, y) => (x >= 0 && y >= 0 && x < W && y < W ? dist[y * W + x] : 0);
    const out = new Uint8Array(W * W);
    const PERIOD = 7;
    for (let y = 0; y < W; y++)
      for (let x = 0; x < W; x++) {
        const gx = dOf(x + 1, y) - dOf(x - 1, y);
        const gy = dOf(x, y + 1) - dOf(x, y - 1);
        const len = Math.hypot(gx, gy) || 1;

        const s = x * (-gy / len) + y * (gx / len);
        out[y * W + x] = Math.round((0.5 + 0.5 * Math.sin(s * (Math.PI * 2 / PERIOD))) * 255);
      }
    Rend._stripField = out;
    return out;
  },

  buildStripTexture() {
    const W = TUNE.WORLD;
    if (!Rend._stripField) Rend.buildStripField();
    const data = new Uint8Array(W * W * 4);
    for (let i = 0; i < W * W; i++) {
      const v = Rend._stripField[i];
      data[i * 4] = data[i * 4 + 1] = data[i * 4 + 2] = v;
      data[i * 4 + 3] = 255;
    }
    return (Rend._stripTex = Rend._dataTex(Rend._stripTex, data, W));
  },

  _dataTex(existing, data, size) {
    if (existing && existing.image.width === size) {
      existing.image.data.set(data);
      existing.needsUpdate = true;
      return existing;
    }
    if (existing) existing.dispose();
    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.minFilter = tex.magFilter = THREE.LinearFilter;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  },

  buildWaterDepth() {
    const W = TUNE.WORLD, S = 2, n = W / S;

    const planeY = -0.3, RANGE = 0.34;
    const data = new Uint8Array(n * n * 4);
    for (let iz = 0; iz < n; iz++)
      for (let ix = 0; ix < n; ix++) {
        const d = Util.clamp((planeY - Rend.groundY(ix * S + 1, iz * S + 1)) / RANGE, 0, 1);
        const i = (iz * n + ix) * 4;
        data[i] = data[i + 1] = data[i + 2] = Math.round(d * 255);
        data[i + 3] = 255;
      }
    return (Rend._depthTex = Rend._dataTex(Rend._depthTex, data, n));
  },

  makeCrustTexture() {
    if (Rend._crustTex) return Rend._crustTex;
    const P = 256, CELLS = 9;
    const pts = [];
    for (let cy = 0; cy < CELLS; cy++)
      for (let cx = 0; cx < CELLS; cx++)
        pts.push([(cx + 0.2 + Util.hash2(cx, cy) * 0.6) / CELLS,
                  (cy + 0.2 + Util.hash2(cy + 31, cx + 17) * 0.6) / CELLS]);
    const cv = document.createElement('canvas');
    cv.width = cv.height = P;
    const g = cv.getContext('2d');
    const img = g.createImageData(P, P);
    for (let y = 0; y < P; y++)
      for (let x = 0; x < P; x++) {
        const u = x / P, v = y / P;
        let d1 = 9, d2 = 9;
        for (const [px, py] of pts) {

          let dx = Math.abs(u - px), dy = Math.abs(v - py);
          if (dx > 0.5) dx = 1 - dx;
          if (dy > 0.5) dy = 1 - dy;
          const d = dx * dx + dy * dy;
          if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
        }

        const edge = Math.sqrt(d2) - Math.sqrt(d1);
        const ridge = 1 - Util.clamp(edge / 0.045, 0, 1);
        const i = (y * P + x) * 4;
        const q = Math.round(Math.floor(ridge * 2.999) / 2 * 255);
        img.data[i] = img.data[i + 1] = img.data[i + 2] = q;
        img.data[i + 3] = 255;
      }
    g.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    Rend._crustTex = tex;
    return tex;
  },

  makeFarMaterial() {
    const GR = Rend.ground || Rend.groundFor(1);
    const mat = Gfx.mat(0xffffff, { cache: false });
    const u = {
      tWorldSplat: { value: Rend._worldSplat },
      worldSize: { value: TUNE.WORLD },
      cBase: { value: Gfx.color(GR.base.color) },
      cField: { value: Gfx.color(GR.fertile.color) },
      cSalt: { value: Gfx.color(GR.salt.color) },
      cRock: { value: Gfx.color(GR.rock.color) },
      cCliff: { value: Gfx.color(GR.cliff) },
      cBed: { value: Gfx.color(GR.bed) },
      macroAmt: { value: GR.macro },
    };
    mat.userData.far = u;
    const prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (shader, renderer) => {
      if (prev) prev(shader, renderer);
      Object.assign(shader.uniforms, u);
      shader.vertexShader = shader.vertexShader
        .replace('void main() {', 'varying vec2 vFW; varying vec3 vFN; varying float vFY;\nvoid main() {')
        .replace('#include <begin_vertex>',
          '#include <begin_vertex>\n  vFW = position.xz;\n  vFN = normal;\n  vFY = position.y;');
      shader.fragmentShader = shader.fragmentShader
        .replace('void main() {', `
          varying vec2 vFW; varying vec3 vFN; varying float vFY;
          uniform sampler2D tWorldSplat; uniform float worldSize;
          uniform vec3 cBase, cField, cSalt, cRock, cCliff, cBed;
          uniform float macroAmt;
          float fHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float fNoise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(fHash(i), fHash(i + vec2(1.0, 0.0)), f.x),
                       mix(fHash(i + vec2(0.0, 1.0)), fHash(i + vec2(1.0, 1.0)), f.x), f.y);
          }
          void main() {`)
        .replace('#include <map_fragment>', `
          #include <map_fragment>
          {
            vec4 sw = texture2D(tWorldSplat, vFW / worldSize);
            float wF = sw.r, wS = sw.g, wR = sw.b;
            vec3 col = cBase * max(0.0, 1.0 - (wF + wS + wR)) + cField * wF + cSalt * wS + cRock * wR;
            // only the MACRO band of variation out here — the fine grain would
            // alias into shimmer at this vertex density and costs nothing to skip
            float macro = floor(fNoise(vFW * 0.038) * 3.0) / 3.0 + 0.1667;
            col *= 1.0 + (macro - 0.5) * macroAmt * 2.0;
            col = mix(col, cCliff, smoothstep(0.28, 0.62, 1.0 - clamp(vFN.y, 0.0, 1.0)));
            col = mix(col, cBed, smoothstep(-0.10, -0.45, vFY));
            diffuseColor.rgb = col;
          }`);
    };
    mat.needsUpdate = true;
    return mat;
  },

  buildFarBase() {
    const W = TUNE.WORLD, S = Rend.FAR_STEP;
    const n = Rend._farN = Math.floor(W / S) + 1;
    const pos = new Float32Array(n * n * 3);
    const nor = new Float32Array(n * n * 3);
    for (let iz = 0; iz < n; iz++)
      for (let ix = 0; ix < n; ix++) {
        const x = Math.min(W, ix * S), z = Math.min(W, iz * S);
        const o = (iz * n + ix) * 3;
        const y = Rend.groundY(x, z);
        pos[o] = x; pos[o + 1] = y; pos[o + 2] = z;
        const dx = (Rend.groundY(Math.min(W, x + S), z) - Rend.groundY(Math.max(0, x - S), z)) / (2 * S);
        const dz = (Rend.groundY(x, Math.min(W, z + S)) - Rend.groundY(x, Math.max(0, z - S))) / (2 * S);
        const len = Math.hypot(dx, 1, dz);
        nor[o] = -dx / len; nor[o + 1] = 1 / len; nor[o + 2] = -dz / len;
      }
    Rend._farPos = pos;
    Rend._farNor = nor;
    Rend._farIdx = new Uint32Array((n - 1) * (n - 1) * 6);
  },

  buildFarField() {
    Rend._farStale = false;
    if (!Rend._worldSplat) Rend.buildWorldSplat();
    if (!Rend._farPos) Rend.buildFarBase();

    const S = Rend.FAR_STEP, n = Rend._farN, live = Rend._liveRect;

    const hx0 = live ? live.x0 + S : 1e9, hx1 = live ? live.x1 - S : -1e9;
    const hz0 = live ? live.z0 + S : 1e9, hz1 = live ? live.z1 - S : -1e9;
    const idx = Rend._farIdx;
    let k = 0;
    for (let iz = 0; iz < n - 1; iz++) {
      const z = iz * S;
      const zIn = z >= hz0 && z + S <= hz1;
      for (let ix = 0; ix < n - 1; ix++) {
        const x = ix * S;
        if (zIn && x >= hx0 && x + S <= hx1) continue;
        const a = iz * n + ix, b = a + 1, c = a + n, d = c + 1;
        idx[k++] = a; idx[k++] = c; idx[k++] = b;
        idx[k++] = b; idx[k++] = c; idx[k++] = d;
      }
    }

    if (!Rend.farMesh) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(Rend._farPos, 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(Rend._farNor, 3));
      geo.setIndex(new THREE.BufferAttribute(idx, 1));
      geo.boundingSphere = new THREE.Sphere(
        new THREE.Vector3(TUNE.WORLD / 2, 0, TUNE.WORLD / 2), TUNE.WORLD);
      Rend.farMesh = new THREE.Mesh(geo, Rend.makeFarMaterial());
      Rend.farMesh.renderOrder = -1;
      Rend.farMesh.castShadow = false;
      Rend.farMesh.receiveShadow = false;
      Rend.farMesh.frustumCulled = false;
      Rend.scene.add(Rend.farMesh);
    } else {
      const g = Rend.farMesh.geometry;
      g.attributes.position.array.set(Rend._farPos);
      g.attributes.position.needsUpdate = true;
      g.attributes.normal.array.set(Rend._farNor);
      g.attributes.normal.needsUpdate = true;
      g.index.needsUpdate = true;
    }

    Rend.farMesh.geometry.setDrawRange(0, k);
    return k / 3;
  },

  buildChunkRoads(s, c) {
    if (c.roads) { Rend.scene.remove(c.roads); c.roads.geometry.dispose(); c.roads = null; }
    const CH = Rend.CH;
    const pos = [], idx = [];
    const HW = 0.30;
    const LIFT = 0.035;

    const quad = (x0, z0, x1, z1) => {
      const base = pos.length / 3;
      const pts = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
      for (const [px, pz] of pts) pos.push(px, Rend.groundY(px, pz) + LIFT, pz);
      idx.push(base, base + 2, base + 1, base, base + 3, base + 2);
    };

    for (let y = 0; y < CH; y++)
      for (let x = 0; x < CH; x++) {
        const wx = c.cx * CH + x, wy = c.cz * CH + y;
        if (!Grid.inB(wx, wy)) continue;
        const b = Grid.buildingAt(wx, wy);
        if (!b || b.type !== 'road') continue;
        const cxw = wx + 0.5, czw = wy + 0.5;
        quad(cxw - HW, czw - HW, cxw + HW, czw + HW);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nb = Grid.buildingAt(wx + dx, wy + dz);
          if (!nb || (nb.type !== 'road' && nb.type !== 'townhall')) continue;
          if (dx) quad(cxw + (dx > 0 ? HW : -0.52), czw - HW, cxw + (dx > 0 ? 0.52 : -HW), czw + HW);
          else quad(cxw - HW, czw + (dz > 0 ? HW : -0.52), cxw + HW, czw + (dz > 0 ? 0.52 : -HW));
        }
      }
    if (!pos.length) return;

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    g.computeBoundingSphere();
    const mat = Gfx.mat(0x8a6a3f, { cache: false });
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -2;
    c.roads = new THREE.Mesh(g, mat);
    c.roads.receiveShadow = true;
    c.roads.renderOrder = 1;
    Rend.scene.add(c.roads);
  },

  bakeOverlay(s, c) {
    const CH = Rend.CH, P = Rend.OVP, px = P / CH;
    const g = c.canvas.getContext('2d');
    g.clearRect(0, 0, P, P);

    const tool = Input.tool;
    const bt = tool.mode === 'build' && tool.type ? DEF(tool.type) : null;
    const showW = Rend.showWater || (bt && (bt.waterRadius || bt.needsWater));
    const showP = s.era >= 9 && (Rend.showPower || (bt && (bt.powerRadius || bt.needsPower)));

    for (let y = 0; y < CH; y++)
      for (let x = 0; x < CH; x++) {
        const wx = c.cx * CH + x, wy = c.cz * CH + y;
        if (!Grid.inB(wx, wy)) continue;
        const k = Grid.key(wx, wy);

        if (showW && G.cache.water[k]) { g.fillStyle = 'rgba(90,170,230,0.22)'; g.fillRect(x * px, y * px, px, px); }
        if (showP && G.cache.power[k]) { g.fillStyle = 'rgba(240,210,80,0.18)'; g.fillRect(x * px, y * px, px, px); }

        if (Rend.showSoil) {
          const soil = Grid.soilAt(wx, wy);
          if (soil < 0.999) {
            g.fillStyle = 'rgba(240,238,225,' + (0.55 * (1 - soil)).toFixed(3) + ')';
            g.fillRect(x * px, y * px, px, px);
          }
        }
        if (!Grid.owned(wx, wy)) { g.fillStyle = 'rgba(12,16,20,0.16)'; g.fillRect(x * px, y * px, px, px); }
        else if (tool.mode === 'buyland') { g.fillStyle = 'rgba(255,255,255,0.05)'; g.fillRect(x * px, y * px, px, px); }
      }

    if (tool.mode === 'buyland') {
      const PC = TUNE.CHUNK;
      for (let y = 0; y < CH; y += PC)
        for (let x = 0; x < CH; x += PC) {
          const wx = c.cx * CH + x, wy = c.cz * CH + y;
          if (!Grid.inB(wx, wy)) continue;
          const pc = Grid.chunkOf(wx, wy);
          if (G.cache.ownedSet.has(pc.cx + ',' + pc.cy)) continue;
          const buyable = Grid.chunkBuyable(s, pc.cx, pc.cy);
          g.fillStyle = !buyable ? 'rgba(0,0,0,0.18)'
            : (s.money >= Grid.chunkPrice(pc.cx, pc.cy) ? 'rgba(120,220,120,0.26)' : 'rgba(220,120,120,0.22)');
          g.fillRect(x * px, y * px, PC * px, PC * px);
          g.strokeStyle = 'rgba(255,255,255,0.30)'; g.lineWidth = 2;
          g.strokeRect(x * px + 1, y * px + 1, PC * px - 2, PC * px - 2);
        }
    }
    c.tex.needsUpdate = true;
  },

  rebakeAll(s) { for (const [, c] of Rend.chunks) Rend.bakeOverlay(s || G.s, c); },

  _soilQueue: new Set(),
  markSoilDirty(keys) { for (const k of keys) Rend._soilQueue.add(k); },

  drainSoilQueue() {
    if (!Rend._soilQueue.size) return;
    let budget = 2;
    for (const k of Rend._soilQueue) {
      Rend._soilQueue.delete(k);
      const c = Rend.chunks.get(k);
      if (c) {
        if (c.splatTex) c.splatTex.dispose();
        c.splatTex = Rend.buildChunkSplat(c);
        c.base.material.userData.splat.tSplat.value = c.splatTex;
      }
      if (--budget <= 0) break;
    }

    if ((Rend._soilFar = (Rend._soilFar || 0) + 1) % 120 === 0) Rend.buildWorldSplat();
  },

  ERA_SCATTER: {
    1:  { tree: ['palm', 'poplar'], scrub: ['tamarisk'], scrubDensity: 0.055, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    2:  { tree: ['palm', 'acacia'], scrub: ['tamarisk'], scrubDensity: 0.05, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    3:  { tree: ['ceiba', 'jungle'], scrub: ['jungle'], scrubDensity: 0.18, marsh: ['reed'],
          rock: ['karst'], crag: ['karst'] },
    4:  { tree: ['ahuehuete', 'jungle'], scrub: ['agave'], scrubDensity: 0.14, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    5:  { tree: ['olive', 'cypress'], scrub: ['bush'], scrubDensity: 0.12, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    6:  { tree: ['umbrella', 'cypress', 'olive'], scrub: ['bush'], scrubDensity: 0.11, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    7:  { tree: ['olive', 'cypress'], scrub: ['bush'], scrubDensity: 0.13, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    8:  { tree: ['cypress', 'poplar', 'olive'], scrub: ['bush'], scrubDensity: 0.10, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    9:  { tree: ['deadTree'], scrub: ['deadTree'], scrubDensity: 0.06, marsh: ['reed'],
          rock: ['slag'], crag: ['slag'] },
    10: { tree: ['streetTree'], scrub: ['bush'], scrubDensity: 0.07, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    11: { tree: ['streetTree'], scrub: ['bush'], scrubDensity: 0.06, marsh: ['reed'],
          rock: ['boulder'], crag: ['crag'] },
    12: { tree: ['pod'], scrub: [], scrubDensity: 0, marsh: [], rock: ['regolith'], crag: ['regolith'] },
    13: { tree: ['pod'], scrub: [], scrubDensity: 0, marsh: [], rock: ['regolith'], crag: ['regolith'] },
    14: { tree: ['crystal'], scrub: ['crystal'], scrubDensity: 0.05, marsh: [],
          rock: ['regolith'], crag: ['crystal'] },
  },

  scatterFor(era) {
    const keys = Object.keys(Rend.ERA_SCATTER).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= era) pick = k;
    return Rend.ERA_SCATTER[pick];
  },

  buildScatterDefs(era) {
    const e = Rend.scatterFor(era || 1);
    const defs = [];
    if (e.tree && e.tree.length)
      defs.push({ variants: e.tree, place: (s, x, y) => Grid.treeAt(s, x, y) });
    if (e.scrub && e.scrub.length && e.scrubDensity > 0)
      defs.push({ variants: e.scrub,

        place: (s, x, y, t) => {
          if (t !== TERRAIN.GRASS || Grid.treeAt(s, x, y)) return false;

          const patch = Rend.noise(x / 11, y / 11);
          return Util.hash2(x * 13 + 5, y * 17 + 9) < e.scrubDensity * (0.05 + 2.8 * patch * patch * patch);
        } });
    if (e.marsh && e.marsh.length)
      defs.push({ variants: e.marsh,

        place: (s, x, y, t) => {

          if (t !== TERRAIN.GRASS && t !== TERRAIN.FERTILE) return false;
          if (!Grid.nextToWater(x, y) || Grid.treeAt(s, x, y)) return false;
          const bed = Rend.noise(x / 7 + 13, y / 7 - 5);
          return Util.hash2(x * 19 + 7, y * 23 + 13) < 0.04 + 0.26 * bed * bed;
        } });
    if (e.rock && e.rock.length)
      defs.push({ variants: e.rock,
        place: (s, x, y, t) => t === TERRAIN.ROCK && Util.hash2(x * 7 + 1, y * 11 + 3) < 0.32 });
    if (e.crag && e.crag.length)
      defs.push({ variants: e.crag, sink: 0.4,
        place: (s, x, y, t) => t === TERRAIN.MOUNTAIN && Util.hash2(x * 5 + 2, y * 7 + 4) < 0.5 });
    return defs;
  },

  get SCATTER() {
    if (!Rend._scatterDefs) Rend._scatterDefs = Rend.buildScatterDefs(Rend._era || 1);
    return Rend._scatterDefs;
  },

  _up: new THREE.Vector3(0, 1, 0),

  buildChunkScatter(s, cx, cz) {
    const CH = Rend.CH, era = Rend._era || 1;
    const out = [];
    const m4 = new THREE.Matrix4();
    const vpos = new THREE.Vector3(), vsc = new THREE.Vector3(), q = new THREE.Quaternion();
    for (const def of Rend.SCATTER) {
      const variants = def.variants;
      const buckets = variants.map(() => []);
      for (let y = cz * CH; y < (cz + 1) * CH; y++)
        for (let x = cx * CH; x < (cx + 1) * CH; x++) {
          if (!Grid.inB(x, y)) continue;
          const k = Grid.key(x, y);
          if (G.cache.occ[k] >= 0) continue;
          if (def.place(s, x, y, G.cache.terrain[k]))
            buckets[(Util.hash2(x * 3, y * 5) * 61 | 0) % variants.length].push([x, y]);
        }
      for (let vi = 0; vi < variants.length; vi++) {
        const list = buckets[vi];
        if (!list.length) continue;
        const kind = variants[vi];
        const im = new THREE.InstancedMesh(Shapes.proto(kind), Shapes.protoMat(kind, era), list.length);
        for (let i = 0; i < list.length; i++) {
          const [x, y] = list[i];
          const hh = Util.hash2(x * 7, y * 13);
          const px = x + 0.3 + (hh * 5) % 0.4, pz = y + 0.35 + (hh * 9) % 0.4;
          const sc = 0.78 + (hh * 11) % 0.5;
          const gy = Rend.groundY(px, pz) - (def.sink || 0) * sc;
          q.setFromAxisAngle(Rend._up, hh * Math.PI * 2);
          m4.compose(vpos.set(px, gy, pz), q, vsc.set(sc, sc, sc));
          im.setMatrixAt(i, m4);
        }
        im.instanceMatrix.needsUpdate = true;
        im.castShadow = true;
        im.receiveShadow = true;

        im.frustumCulled = false;
        Rend.scene.add(im);
        out.push({ im, list });
      }
    }
    return out;
  },

  rebuildScatter(s) {
    for (const [, c] of Rend.chunks) {
      for (const e of c.scatter) Rend.scene.remove(e.im);
      c.scatter = Rend.buildChunkScatter(s, c.cx, c.cz);
    }
  },

  syncBuildings(s) {
    const seen = new Set();
    for (const b of s.buildings) {
      if (b.type === 'road') continue;
      seen.add(b.id);
      const d = DEF(b.type);
      let o = Rend.buildingObjs.get(b.id);

      const skin = Shapes.skinFor(b.type, s.era, b.level);

      const stage = d.monument ? (b.complete ? 3 : (b.stage || 0)) : -1;
      if (o && (o.type !== b.type || o.skin !== skin || o.stage !== stage)) {
        Rend.removeObj(o); Rend.buildingObjs.delete(b.id); o = null;
      }
      if (!o) {
        const mesh = Shapes.forType(b.type, s.era, b.level,
          d.monument ? (b.complete ? 1 : (stage + 0.5) / 4) : undefined);
        const status = new THREE.Sprite(new THREE.SpriteMaterial({ map: Rend.statusTex.bad, depthTest: false }));
        status.scale.set(0.65, 0.65, 1);
        status.visible = false;
        Rend.scene.add(mesh); Rend.scene.add(status);
        o = { type: b.type, skin, stage, mesh, status, top: Shapes.measure(mesh).top };

        if (Rend._hadFirstSync) { o.bornAt = performance.now(); mesh.scale.setScalar(0.7); }
        Rend.buildingObjs.set(b.id, o);
      }

      const sz = Grid.dimsOf(b);
      const cx = b.x + sz.w / 2, cz = b.y + sz.h / 2;
      const gy = Rend.groundY(cx, cz);
      o.mesh.position.set(cx, gy, cz);
      o.mesh.rotation.y = (b.rot || 0) * Math.PI / 2;
      o.status.position.set(cx + sz.w * 0.34, gy + o.top + 0.42, cz);
      o.b = b;
    }
    for (const [id, o] of Rend.buildingObjs)
      if (!seen.has(id)) { Rend.removeObj(o); Rend.buildingObjs.delete(id); }
    Rend._hadFirstSync = true;
  },

  removeObj(o) {
    Rend.scene.remove(o.mesh);
    Rend.scene.remove(o.status);
    o.mesh.traverse(m => { if (m.isMesh) m.geometry.dispose(); });
  },

  GLINT_GEO: null,
  GLINT_MAT: null,
  glintMesh: null,
  glintCap: 0,

  GLINT_MIN: 0.25,

  glintBase(b) {
    return buildingRP(DEF(b.type).era || 1, { rp: 1 }) || 1;
  },

  glintScale(rel) {

    return rel >= 20 ? 1.35 + Math.log10(rel) * 0.30
                     : 0.34 + Math.min(rel, 4) * 0.13;
  },

  _glintM: null,
  _glintV: null,
  _glintQ: null,
  _glintS: null,

  syncGlints(s, time) {
    if (!Rend.GLINT_GEO) {
      Rend.GLINT_GEO = new THREE.OctahedronGeometry(0.085, 0);

      Rend.GLINT_MAT = Gfx.unlit(0xfab11d, {
        transparent: true, opacity: 0.9, depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      Rend._glintM = new THREE.Matrix4();
      Rend._glintV = new THREE.Vector3();
      Rend._glintQ = new THREE.Quaternion();
      Rend._glintS = new THREE.Vector3();
    }
    const want = Rend.buildingObjs.size;
    if (!Rend.glintMesh || Rend.glintCap < want) {
      if (Rend.glintMesh) { Rend.scene.remove(Rend.glintMesh); Rend.glintMesh.dispose(); }
      Rend.glintCap = Math.max(64, want * 2);
      Rend.glintMesh = new THREE.InstancedMesh(Rend.GLINT_GEO, Rend.GLINT_MAT, Rend.glintCap);

      Rend.glintMesh.frustumCulled = false;
      Rend.glintMesh.castShadow = false;
      Rend.glintMesh.receiveShadow = false;

      const z = new THREE.Matrix4().compose(
        new THREE.Vector3(0, -1000, 0), new THREE.Quaternion(), new THREE.Vector3(0, 0, 0));
      for (let i = 0; i < Rend.glintCap; i++) Rend.glintMesh.setMatrixAt(i, z);
      Rend.glintCount = 0;
      Rend.scene.add(Rend.glintMesh);
    }
    const M = Rend._glintM, V = Rend._glintV, Q = Rend._glintQ, S = Rend._glintS;
    const carrying = Input.tool.mode === 'move' ? Input.tool.payload : null;
    let n = 0;
    for (const [, o] of Rend.buildingObjs) {
      const b = o.b;
      if (!b) continue;
      const rp = Econ.rentContribution(s, b);

      if (rp === null || s.tick <= 0 || b === carrying) continue;
      const base = Rend.glintBase(b);
      if (rp < Rend.GLINT_MIN * base) continue;
      const d = DEF(b.type);

      const t = time * 0.9 + (b.id % 32) * 0.618;
      const gd = Grid.dimsOf(b);
      const cx = b.x + gd.w / 2, cz = b.y + gd.h / 2;
      const sc = Rend.glintScale(rp / base) * (0.86 + Math.sin(t * 1.7) * 0.14);
      Q.setFromAxisAngle(Rend._up, t * 0.55);
      M.compose(V.set(cx, Rend.groundY(cx, cz) + o.top + 0.30 + Math.sin(t) * 0.06, cz),
                Q, S.setScalar(sc));
      Rend.glintMesh.setMatrixAt(n++, M);
    }

    const stale = Math.max(Rend.glintCount || 0, n);
    if (stale > n) {
      M.compose(V.set(0, -1000, 0), Q.identity(), S.setScalar(0));
      for (let i = n; i < stale; i++) Rend.glintMesh.setMatrixAt(i, M);
    }
    Rend.glintMesh.instanceMatrix.needsUpdate = true;
    Rend.glintCount = n;
  },

  CITIZEN_CAP: 240,

  syncCitizens(s, time) {
    if (!Rend._citGeo) {
      Rend._citGeo = Shapes.citizenGeo();

      Rend._citMat = Gfx.mat(0xffffff, { vertexColors: true, cache: false });
      Rend._citM = new THREE.Matrix4();
      Rend._citV = new THREE.Vector3();
      Rend._citQ = new THREE.Quaternion();
      Rend._citS = new THREE.Vector3();
    }
    if (!Rend.citizens) {
      Rend.citizens = new THREE.InstancedMesh(Rend._citGeo, Rend._citMat, Rend.CITIZEN_CAP);
      Rend.citizens.frustumCulled = false;
      Rend.citizens.castShadow = true;
      const z = new THREE.Matrix4().compose(new THREE.Vector3(0, -1000, 0),
        new THREE.Quaternion(), new THREE.Vector3(0, 0, 0));
      for (let i = 0; i < Rend.CITIZEN_CAP; i++) Rend.citizens.setMatrixAt(i, z);
      Rend.citCount = 0;
      Rend.scene.add(Rend.citizens);
    }

    if (Rend._citKey !== s.buildings.length + ':' + s.era) {
      Rend._citKey = s.buildings.length + ':' + s.era;
      Rend._homes = [];
      Rend._works = [];
      for (const b of s.buildings) {
        const d = DEF(b.type);
        if (!d || b.type === 'road' || b.done === false) continue;
        const c = [b.x + d.w / 2, b.y + d.h / 2];
        if (d.cap) Rend._homes.push(c);
        if (d.workers || d.sells || d.fixed) Rend._works.push(c);
      }
    }
    const homes = Rend._homes, works = Rend._works;
    const pop = Math.min(Rend.CITIZEN_CAP, Game.totalResidents(s));
    const M = Rend._citM, V = Rend._citV, Q = Rend._citQ, S = Rend._citS;
    let n = 0;
    if (homes.length && pop > 0) {
      for (let i = 0; i < pop; i++) {
        const h = homes[i % homes.length];
        const w = works.length ? works[(i * 7 + 3) % works.length] : h;

        const speed = 0.055 + (i % 13) * 0.006;
        const ph = (i * 0.618) % 1;
        const raw = (time * speed + ph) % 2;
        const t = raw > 1 ? 2 - raw : raw;
        const ease = t * t * (3 - 2 * t);
        const x = h[0] + (w[0] - h[0]) * ease;
        const z = h[1] + (w[1] - h[1]) * ease;

        const dir = raw > 1 ? -1 : 1;
        Q.setFromAxisAngle(Rend._up, Math.atan2((w[0] - h[0]) * dir, (w[1] - h[1]) * dir));

        const bob = Math.abs(Math.sin(time * 6 + i)) * 0.012;
        M.compose(V.set(x, Rend.groundY(x, z) + bob, z), Q, S.setScalar(1));
        Rend.citizens.setMatrixAt(n++, M);
      }
    }
    const stale = Math.max(Rend.citCount || 0, n);
    if (stale > n) {
      M.compose(V.set(0, -1000, 0), Q.identity(), S.setScalar(0));
      for (let i = n; i < stale; i++) Rend.citizens.setMatrixAt(i, M);
    }
    Rend.citizens.instanceMatrix.needsUpdate = true;
    Rend.citCount = n;
  },

  LEDGER_W: 320,

  ledgerFace(s) {
    if (!Rend._ledgerCv) {
      Rend._ledgerCv = document.createElement('canvas');
      Rend._ledgerCv.width = Rend._ledgerCv.height = Rend.LEDGER_W;
      Rend._ledgerTex = new THREE.CanvasTexture(Rend._ledgerCv);
      Rend._ledgerTex.anisotropy = 4;
      if (Rend._ledgerTex.encoding !== undefined) Rend._ledgerTex.encoding = THREE.sRGBEncoding;
    }
    const ri = Econ.rentInfo(s);
    const t = subTier(s);

    const key = s.realRent.toFixed(6) + '|' + ri.monthly.toFixed(4) + '|' +
                Math.round(ri.achievement * 100) + '|' + t.key + '|' + s.era;
    if (key === Rend._ledgerKey) return Rend._ledgerTex;
    Rend._ledgerKey = key;

    const W = Rend.LEDGER_W, g = Rend._ledgerCv.getContext('2d');

    g.fillStyle = '#c8a874'; g.fillRect(0, 0, W, W);
    const grd = g.createLinearGradient(0, 0, 0, W);
    grd.addColorStop(0, 'rgba(255,238,200,0.30)');
    grd.addColorStop(1, 'rgba(90,60,25,0.22)');
    g.fillStyle = grd; g.fillRect(0, 0, W, W);
    g.strokeStyle = 'rgba(84,58,24,0.55)'; g.lineWidth = W * 0.035;
    g.strokeRect(g.lineWidth / 2, g.lineWidth / 2, W - g.lineWidth, W - g.lineWidth);

    g.textAlign = 'center';
    g.fillStyle = '#4a3312';
    g.font = '600 ' + Math.round(W * 0.075) + 'px Georgia, serif';
    g.fillText('THE ACCOUNT', W / 2, W * 0.145);

    const dp = s.realRent >= 1 ? 2 : s.realRent >= 0.01 ? 4 : 8;
    g.fillStyle = '#3a2708';
    g.font = '700 ' + Math.round(W * (dp > 4 ? 0.115 : 0.155)) + 'px Georgia, serif';
    g.fillText('$' + s.realRent.toFixed(dp), W / 2, W * 0.325);

    g.fillStyle = 'rgba(58,39,8,0.72)';
    g.font = '500 ' + Math.round(W * 0.062) + 'px Georgia, serif';
    const asSub = rentMonthly(s.era, s.hallLevel, 'citizen', ri.rp);
    g.fillText(t.key === 'free'
      ? 'locked · Citizen earns $' + (asSub >= 0.01 ? asSub.toFixed(2) : asSub.toFixed(5)) + '/mo'
      : '$' + (ri.monthly >= 0.01 ? ri.monthly.toFixed(2) : ri.monthly.toFixed(5)) + ' per month',
      W / 2, W * 0.425);

    const filled = Math.max(0, Math.min(50, Math.round(ri.achievement * 50)));
    const cols = 10, x0 = W * 0.13, y0 = W * 0.52, dx = (W * 0.74) / cols, dy = W * 0.082;
    for (let i = 0; i < 50; i++) {
      const cx = x0 + (i % cols) * dx, cy = y0 + Math.floor(i / cols) * dy;
      g.beginPath();
      g.moveTo(cx, cy);
      g.lineTo(cx + dx * 0.34, cy + dy * 0.30);
      g.lineTo(cx, cy + dy * 0.60);
      g.closePath();
      if (i < filled) { g.fillStyle = 'rgba(48,32,8,0.88)'; g.fill(); }
      else { g.strokeStyle = 'rgba(90,66,30,0.30)'; g.lineWidth = W * 0.006; g.stroke(); }
    }
    g.fillStyle = 'rgba(58,39,8,0.80)';
    g.font = '600 ' + Math.round(W * 0.058) + 'px Georgia, serif';
    g.fillText(Math.round(ri.achievement * 100) + '% of what this age can pay', W / 2, W * 0.955);

    Rend._ledgerTex.needsUpdate = true;
    return Rend._ledgerTex;
  },

  syncLedger(s) {

    const hall = s.literate ? s.buildings.find(b => b.type === 'townhall') : null;
    if (!hall) { if (Rend.ledger) Rend.ledger.visible = false; return; }
    const tex = Rend.ledgerFace(s);

    const skin = Shapes.ledgerSkin(s.era);
    if (Rend.ledger && Rend._ledgerSkin !== skin) {
      Rend.scene.remove(Rend.ledger);
      Rend.ledger.traverse(m => { if (m.isMesh) m.geometry.dispose(); });
      Rend.ledger = null;
    }
    if (!Rend.ledger) {
      Rend._ledgerSkin = skin;
      Rend.ledger = Shapes.ledger(s.era, tex);
      Rend.scene.add(Rend.ledger);
    }
    Rend.ledger.visible = true;

    const d = DEF('townhall');
    const lx = hall.x + d.w - 0.42, lz = hall.y + d.h - 0.34;
    Rend.ledger.position.set(lx, Rend.groundY(lx, lz), lz);

    Rend.ledger.rotation.y = Rend.cam.azimuth;
  },

  syncSelectRing(time) {
    const b = Input.selected;
    if (!b) { if (Rend.selRing) Rend.selRing.visible = false; return; }
    if (!Rend.selRing) {
      Rend.selRing = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.78, 32),
        Gfx.unlit(0xf0cd6e, { transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }));
      Rend.selRing.rotation.x = -Math.PI / 2;
      Rend.scene.add(Rend.selRing);
    }
    const d = Grid.dimsOf(b);
    const cx = b.x + d.w / 2, cz = b.y + d.h / 2;
    Rend.selRing.visible = true;
    Rend.selRing.scale.setScalar(Math.max(d.w, d.h) * (0.62 + 0.03 * Math.sin(time * 3.5)));
    Rend.selRing.position.set(cx, Rend.groundY(cx, cz) + 0.07, cz);
  },

  syncHover(s) {
    const tool = Input.tool;
    if (!Input.hoverT || tool.mode === 'select') {
      if (Rend.hoverMesh) Rend.hoverMesh.visible = false;
      return;
    }
    let w = 1, h = 1, ok = true;
    if (tool.mode === 'build' || tool.mode === 'move') {
      const type = tool.mode === 'move' ? tool.payload.type : tool.type;
      const d = DEF(type);
      const sz = Grid.dims(type, Input.rot);
      w = sz.w; h = sz.h;
      ok = Grid.canPlace(s, type, Input.hoverT.x, Input.hoverT.y,
        tool.mode === 'move' ? tool.payload.id : undefined, Input.rot)
        && (tool.mode === 'move' || s.money >= d.cost);
    } else if (tool.mode === 'terra') {
      ok = Grid.owned(Input.hoverT.x, Input.hoverT.y);
    }
    if (!Rend.hoverMesh) {
      Rend.hoverMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
        Gfx.unlit(0xffffff, { transparent: true, opacity: 0.38, depthWrite: false }));
      Rend.hoverMesh.rotation.x = -Math.PI / 2;
      Rend.hoverMesh.renderOrder = 3;
      Rend.scene.add(Rend.hoverMesh);
    }
    const m = Rend.hoverMesh;
    m.visible = true;
    m.scale.set(w, h, 1);
    const cx = Input.hoverT.x + w / 2, cz = Input.hoverT.y + h / 2;
    m.position.set(cx, Rend.groundY(cx, cz) + 0.09, cz);
    m.material.color.copy(Gfx.color(ok ? 0x8cf08c : 0xf07272));
  },

  syncGhost(s) {
    const tool = Input.tool;
    const active = (tool.mode === 'build' || tool.mode === 'move') && Input.hoverT;
    if (!active) {
      if (Rend.ghost) {
        Rend.scene.remove(Rend.ghost);
        Rend.ghost.traverse(m => { if (m.isMesh) m.geometry.dispose(); });
        Rend.ghost = null;
      }
      if (Rend.ring) { Rend.scene.remove(Rend.ring); Rend.ring = null; }
      return;
    }
    const type = tool.mode === 'move' ? tool.payload.type : tool.type;
    if (!Rend.ghost || Rend.ghost.userData.type !== type) {
      if (Rend.ghost) {
        Rend.scene.remove(Rend.ghost);
        Rend.ghost.traverse(m => { if (m.isMesh) m.geometry.dispose(); });
      }
      Rend.ghost = Shapes.forType(type, s.era);
      Rend.ghost.traverse(m => {
        if (!m.isMesh) return;
        m.castShadow = false; m.receiveShadow = false;
        m.material = m.material.clone();
        m.material.transparent = true;
        m.material.opacity = 0.55;
        m.material.depthWrite = false;
      });
      Rend.ghost.userData.type = type;
      Rend.scene.add(Rend.ghost);
    }
    const d = DEF(type);

    const gsz = Grid.dims(type, Input.rot);
    const cx = Input.hoverT.x + gsz.w / 2, cz = Input.hoverT.y + gsz.h / 2;
    Rend.ghost.position.set(cx, Rend.groundY(cx, cz) + 0.02, cz);
    Rend.ghost.rotation.y = (Input.rot || 0) * Math.PI / 2;

    let rad = 0, ringCol = 0x5aaae6;
    if (d.waterRadius) { rad = d.waterRadius; ringCol = 0x5aaae6; }
    else if (d.powerRadius) { rad = d.powerRadius; ringCol = 0xf0d250; }
    else if (d.soilRadius) { rad = d.soilRadius; ringCol = 0x9c7b52; }
    else if (d.capRadius) { rad = d.capRadius; ringCol = 0x8cd98c; }
    else if (d.amenityRadius) { rad = d.amenityRadius; ringCol = 0x8cd98c; }
    else if (d.ovenRadius) { rad = d.ovenRadius; ringCol = 0xe0a45f; }
    else if (type === 'weighhouse') { rad = TUNE.WEIGH.radius; ringCol = 0xd8d8e0; }
    else if (type === 'scribe') { rad = TUNE.SCRIBE.radius; ringCol = 0xd8c9a0; }
    else if (type === 'templeGranary') { rad = TUNE.DUES.radius; ringCol = 0xe6c65a; }
    else if (type === 'oxbyre') { rad = TUNE.OX.radius; ringCol = 0xa8b46a; }
    else if (type === 'woolbureau') { rad = TUNE.BUREAU.radius; ringCol = 0xc9a0c0; }
    if (rad) {

      const key = ringCol + ':' + gsz.w + 'x' + gsz.h + ':' + rad;
      if (!Rend.ring || Rend.ring.userData.key !== key) {
        if (Rend.ring) { Rend.scene.remove(Rend.ring); Rend.ring.geometry.dispose(); }
        Rend.ring = new THREE.Mesh(Rend.auraBandGeo(gsz.w, gsz.h, rad, 0.35),
          Gfx.unlit(ringCol, { transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }));
        Rend.ring.userData.key = key;
        Rend.scene.add(Rend.ring);
      }
      Rend.ring.position.set(cx, Rend.groundY(cx, cz) + 0.1, cz);
    } else if (Rend.ring) { Rend.scene.remove(Rend.ring); Rend.ring = null; }
  },

  auraBandGeo(w, h, rad, thick) {
    const R = rad + 1, inner = Math.max(0.05, R - thick);
    const hw = w / 2, hh = h / 2, SEG = 10;
    const corners = [[hw, hh, 0], [-hw, hh, Math.PI / 2],
                     [-hw, -hh, Math.PI], [hw, -hh, Math.PI * 1.5]];
    const out = [], inn = [];
    for (const [ccx, ccz, a0] of corners) {
      for (let i = 0; i <= SEG; i++) {
        const a = a0 + (Math.PI / 2) * (i / SEG), c = Math.cos(a), s = Math.sin(a);
        out.push(ccx + c * R, ccz + s * R);
        inn.push(ccx + c * inner, ccz + s * inner);
      }
    }
    const n = out.length / 2, pos = [];
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, a = i * 2, b2 = j * 2;
      pos.push(out[a], 0, out[a + 1], inn[a], 0, inn[a + 1], out[b2], 0, out[b2 + 1]);
      pos.push(inn[a], 0, inn[a + 1], inn[b2], 0, inn[b2 + 1], out[b2], 0, out[b2 + 1]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    return g;
  },

  ensureWater() {
    if (Rend.waterMesh) return;
    const gr = Gfx.gradeFor(Rend._era || 1);
    const geo = new THREE.PlaneGeometry(TUNE.WORLD, TUNE.WORLD, 1, 1);
    geo.rotateX(-Math.PI / 2);
    const mat = Gfx.mat(gr.water.color, {
      cache: false, transparent: true, opacity: gr.water.opacity, depthWrite: false,
    });

    const prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (sh, r) => {
      if (prev) prev(sh, r);
      sh.uniforms.wTime = Rend._waterTime = Rend._waterTime || { value: 0 };
      sh.uniforms.wGlint = { value: Gfx.color(gr.water.glint || 0xbfd8d2) };
      sh.uniforms.wGlintAmt = { value: gr.water.glintAmt === undefined ? 0.20 : gr.water.glintAmt };
      sh.uniforms.tDepth = { value: Rend.buildWaterDepth() };
      sh.uniforms.wShallow = { value: Gfx.color(gr.water.shallow || 0x7d9464) };
      sh.uniforms.worldW = { value: TUNE.WORLD };
      sh.vertexShader = sh.vertexShader
        .replace('void main() {', 'varying vec2 vWW;\nvoid main() {')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\n  vWW = position.xz;');
      sh.fragmentShader = sh.fragmentShader
        .replace('void main() {', `
          varying vec2 vWW; uniform float wTime;
          uniform vec3 wGlint; uniform float wGlintAmt;
          uniform sampler2D tDepth; uniform vec3 wShallow; uniform float worldW;
          float wHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float wNoise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(wHash(i), wHash(i + vec2(1.0, 0.0)), f.x),
                       mix(wHash(i + vec2(0.0, 1.0)), wHash(i + vec2(1.0, 1.0)), f.x), f.y);
          }
          void main() {`)
        .replace('#include <map_fragment>', `
          #include <map_fragment>
          {
            // ★ NOISE, NOT SINES. Summed sine waves across a surface this large
            // do not read as water — they read as diagonal CORDUROY, because
            // two sines with fixed frequencies interfere into a regular lattice
            // and the eye finds a lattice instantly. Drifting value noise,
            // quantised into three hard bands, gives the same cel treatment
            // with nothing for the eye to lock onto.
            // ★ DEPTH FIRST. The plane is one quad and knows nothing about what
            // is under it, so the trunk river and a shin-deep distributary
            // rendered as identical colour. Reading a depth field turns the
            // channel network into something with a middle and an edge — and
            // quantised into three bands it stays cel rather than becoming a
            // photographic gradient.
            float depth = texture2D(tDepth, vWW / worldW + 0.5).r;
            float dBand = floor(clamp(depth, 0.0, 0.999) * 3.0) / 3.0;
            diffuseColor.rgb = mix(wShallow, diffuseColor.rgb, dBand);

            vec2 flow = vWW * 0.42 + vec2(wTime * 0.045, wTime * 0.028);
            float n = wNoise(flow) * 0.62 + wNoise(flow * 2.4 + 11.0) * 0.38;
            float band = floor(n * 3.0) / 3.0;
            diffuseColor.rgb = mix(diffuseColor.rgb, wGlint, clamp(band, 0.0, 1.0) * wGlintAmt);
          }`);
    };
    Rend.waterMesh = new THREE.Mesh(geo, mat);
    Rend.waterMesh.position.set(TUNE.WORLD / 2, -0.3, TUNE.WORLD / 2);
    Rend.waterMesh.receiveShadow = true;
    Rend.scene.add(Rend.waterMesh);
  },

  focusOn(b) {
    const d = Grid.dimsOf(b);
    Rend.tgt.tx = b.x + d.w / 2;
    Rend.tgt.tz = b.y + d.h / 2;
    Rend.tgt.di = Util.clamp(Math.min(Rend.tgt.di, 22), Rend.DIST_MIN, Rend.DIST_MAX);
    Rend.vel.x = Rend.vel.z = 0;
  },

  invalidateTerrain() { Rend.layerDirty = true; Rend._worldDirty = true; },
  repaintChunk() { Rend._overlayDirty = true; Rend.miniDirty = true; },
  onWorldChange() { Rend._worldDirty = true; Rend._roadsDirty = true; Rend.miniDirty = true; },

  _ray: null,
  pick(clientX, clientY) {
    if (!Rend.chunks.size) return null;
    Rend._ray = Rend._ray || new THREE.Raycaster();
    const r = Rend.canvas.getBoundingClientRect();
    const v = new THREE.Vector2(
      ((clientX - r.left) / r.width) * 2 - 1,
      -((clientY - r.top) / r.height) * 2 + 1
    );
    Rend._ray.setFromCamera(v, Rend.camera);
    const meshes = [];
    for (const [, c] of Rend.chunks) meshes.push(c.base);
    const hit = Rend._ray.intersectObjects(meshes, false)[0];
    if (!hit) return null;
    const x = Math.floor(hit.point.x), y = Math.floor(hit.point.z);
    if (!Grid.inB(x, y)) return null;
    return { x, y, point: hit.point };
  },

  _ceremonyDrift: 0,

  applyCamera() {
    if (Rend._ceremonyDrift) Rend.tgt.az += 0.0022;
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (now - Rend._camT) / 1000 || 0.016));
    Rend._camT = now;
    const c = Rend.cam, t = Rend.tgt, v = Rend.vel;
    if (Rend._camInit !== true) {
      Rend._camInit = true;
      c.tx = t.tx = TUNE.WORLD / 2; c.tz = t.tz = TUNE.WORLD / 2;
    }

    if (!Input.drag) {
      t.tx += v.x * dt; t.tz += v.z * dt; t.az += v.az * dt;
      const dcy = Math.exp(-3.4 * dt);
      v.x *= dcy; v.z *= dcy; v.az *= dcy;
      if (Math.abs(v.x) < 0.01) v.x = 0;
      if (Math.abs(v.z) < 0.01) v.z = 0;
      if (Math.abs(v.az) < 0.001) v.az = 0;
    }
    t.tx = Util.clamp(t.tx, 0, TUNE.WORLD);
    t.tz = Util.clamp(t.tz, 0, TUNE.WORLD);
    t.po = Util.clamp(t.po, Rend.POLAR_MIN, Rend.POLAR_MAX);
    t.di = Util.clamp(t.di, Rend.DIST_MIN, Rend.DIST_MAX);

    const f = 1 - Math.exp(-9 * dt);
    c.tx += (t.tx - c.tx) * f;
    c.tz += (t.tz - c.tz) * f;
    c.azimuth += (t.az - c.azimuth) * f;
    c.polar += (t.po - c.polar) * f;
    c.dist += (t.di - c.dist) * f;

    const ty = Rend.groundY(c.tx, c.tz);
    const px = c.tx + c.dist * Math.sin(c.polar) * Math.sin(c.azimuth);
    const pz = c.tz + c.dist * Math.sin(c.polar) * Math.cos(c.azimuth);
    let py = ty + c.dist * Math.cos(c.polar);
    const minY = Rend.groundY(Util.clamp(px, 0, TUNE.WORLD), Util.clamp(pz, 0, TUNE.WORLD)) + 1.2;
    if (py < minY) py = minY;
    Rend.camera.position.set(px, py, pz);
    Rend.camera.lookAt(c.tx, ty + 0.5, c.tz);
  },

  draw(s, time) {
    if (!Rend.renderer) return;
    if (s && s.era !== Rend._era) Rend.applyEra(s.era);
    Rend.ensureWater();
    if (Rend._waterTime) Rend._waterTime.value = time;
    Shapes.WIND.time.value = time;
    Gfx.followShadow(Rend.cam.tx, Rend.cam.tz);

    if ((Rend._celFrame = (Rend._celFrame || 0) + 1) % 30 === 1) Gfx.patchScene(Rend.scene);

    if (Rend.materialsStale) {
      Rend.materialsStale = false;
      Shapes._protos = {}; Shapes._protoMats = {};
      for (const [, o] of Rend.buildingObjs) Rend.removeObj(o);
      Rend.buildingObjs.clear();
      if (Rend.ghost) { Rend.scene.remove(Rend.ghost); Rend.ghost = null; }
      Rend._worldDirty = true;
      Rend.chunksStale = true;
    }
    if (Rend.chunksStale) {
      Rend.chunksStale = false;
      for (const [, c] of Rend.chunks) Rend.disposeChunk(c);
      Rend.chunks.clear();
      Rend._chunkKeyAt = '';
      Rend.updateChunks(s, true);
      Rend.miniDirty = true;
    }
    if (Rend.layerDirty) {
      Rend.computeHeights(s);
      for (const [, c] of Rend.chunks) {
        Rend.applyChunkHeights(c);
        if (c.splatTex) c.splatTex.dispose();
        c.splatTex = Rend.buildChunkSplat(c);
        c.base.material.userData.splat.tSplat.value = c.splatTex;
        Rend.buildChunkRoads(s, c);
      }
      Rend.rebuildScatter(s);
      Rend.rebakeAll(s);

      Rend._stripField = null;
      Rend.buildStripField();
      Rend.buildStripTexture();
      Rend.buildWorldSplat();
      Rend.buildWaterDepth();
      Rend._farPos = null;
      Rend._farStale = true;
      Rend.miniDirty = true;
      Rend.layerDirty = false;
      Rend._roadsDirty = false;
      Rend._overlayDirty = false;
    }
    if (Rend._worldDirty) {
      Rend.syncBuildings(s);
      Rend.rebuildScatter(s);
      Rend._worldDirty = false;
    }
    if (Rend._roadsDirty) {
      for (const [, c] of Rend.chunks) Rend.buildChunkRoads(s, c);
      Rend.miniDirty = true;
      Rend._roadsDirty = false;
    }
    Rend.updateChunks(s);

    if (Rend._farStale) Rend.buildFarField();
    Rend.drainSoilQueue();

    const toolKey = Input.tool.mode + ':' + (Input.tool.type || '') + ':' +
                    (Rend.showWater ? 1 : 0) + ':' + (Rend.showPower ? 1 : 0) + ':' +
                    (Rend.showSoil ? 1 : 0);
    if (toolKey !== Rend._toolKey || Rend._overlayDirty) {
      Rend._toolKey = toolKey;
      Rend._overlayDirty = false;
      Rend.rebakeAll(s);
    }

    if (Rend.showSoil) {
      Rend._soilBakeAt = Rend._soilBakeAt || 0;
      if (time - Rend._soilBakeAt > 4) { Rend._soilBakeAt = time; Rend.rebakeAll(s); }
    }

    const carrying = Input.tool.mode === 'move' ? Input.tool.payload : null;

    for (const [, o] of Rend.buildingObjs) {
      const b = o.b;
      if (!b) continue;
      if (b === carrying) { o.mesh.visible = false; o.status.visible = false; continue; }
      o.mesh.visible = true;
      const bad = b.status && b.status !== 'ok' && s.tick > 0;
      o.status.visible = !!bad;
      if (bad) o.status.material.map = b.status === 'understaffed' ? Rend.statusTex.warn : Rend.statusTex.bad;
      let want = b === Input.selected ? 1.04 : (Input.hoverB === b && Input.tool.mode === 'select') ? 1.02 : 1;

      if (o.bornAt) {
        const age = (performance.now() - o.bornAt) / 1000;
        if (age < 0.3) want = age < 0.16 ? 0.72 + (age / 0.16) * 0.36 : 1.08;
        else o.bornAt = 0;
      }
      o.mesh.scale.lerp(Rend._tmpScale.setScalar(want), 0.25);
    }
    Rend.syncGlints(s, time);
    Rend.syncCitizens(s, time);
    Rend.syncLedger(s);
    Rend.syncSelectRing(time);
    Rend.syncGhost(s);
    Rend.syncHover(s);
    Rend.applyCamera();
    Gfx.render(Rend.scene, Rend.camera);
    Rend.drawMinimap(s);
  },

  _tmpScale: new THREE.Vector3(),

  drawMinimap(s) {
    if (!Rend.miniCtx) return;
    const M = Rend.mini.width, W = TUNE.WORLD;
    if (Rend.miniFrame++ % 45 === 0 || Rend.miniDirty || !Rend.miniBase) {
      if (!Rend.miniBase) {
        Rend.miniBase = document.createElement('canvas');
        Rend.miniBase.width = Rend.miniBase.height = M;
      }
      const g = Rend.miniBase.getContext('2d');
      const img = g.createImageData(M, M);
      const GR = Rend.ground || Rend.groundFor(1);
      const rgb = hex => [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
      const COL = {
        [TERRAIN.GRASS]: rgb(GR.base.color),
        [TERRAIN.FERTILE]: rgb(GR.fertile.color),
        [TERRAIN.SALT]: rgb(GR.salt.color),
        [TERRAIN.ROCK]: rgb(GR.rock.color),
        [TERRAIN.MOUNTAIN]: rgb(GR.cliff),
        [TERRAIN.WATER]: rgb(Gfx.gradeFor(Rend._era || 1).water.color),
      };
      for (let py = 0; py < M; py++)
        for (let px = 0; px < M; px++) {
          const tx = Math.floor(px * W / M), ty = Math.floor(py * W / M);
          const c = COL[G.cache.terrain[Grid.key(tx, ty)]] || COL[0];
          const o = (py * M + px) * 4;
          const dim = Grid.owned(tx, ty) ? 1 : 0.62;
          img.data[o] = c[0] * dim; img.data[o + 1] = c[1] * dim; img.data[o + 2] = c[2] * dim;
          img.data[o + 3] = 255;
        }
      g.putImageData(img, 0, 0);
      const sc = M / W;
      for (const b of s.buildings) {
        const d = DEF(b.type);
        g.fillStyle = b.type === 'townhall' ? '#ffd76a' : (b.type === 'road' ? '#8a6a3f' : '#f0ede6');
        g.fillRect(b.x * sc, b.y * sc, Math.max(1, d.w * sc), Math.max(1, d.h * sc));
      }
      Rend.miniDirty = false;
    }
    const g = Rend.miniCtx;
    g.clearRect(0, 0, M, M);
    g.drawImage(Rend.miniBase, 0, 0);
    const sc = M / TUNE.WORLD;
    g.fillStyle = '#fff';
    g.beginPath(); g.arc(Rend.cam.tx * sc, Rend.cam.tz * sc, 4, 0, 7); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.9)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(Rend.cam.tx * sc, Rend.cam.tz * sc);
    g.lineTo(Rend.cam.tx * sc - Math.sin(Rend.cam.azimuth) * 10, Rend.cam.tz * sc - Math.cos(Rend.cam.azimuth) * 10);
    g.stroke();
  },
};

window.Rend = Rend;
