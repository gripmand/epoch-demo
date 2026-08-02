'use strict';

const Shapes = {

  SURF: {
    mud:       0xb7803b,
    mudPale:   0xecc07a,
    plaster:   0xfbd99c,
    thatch:    0xd1880e,
    thatchDim: 0xa6700f,
    timber:    0x826047,
    stone:     0xbd9967,
    stoneDark: 0x7e5712,
    trim:      0x574217,
    gold:      0xfab11d,
    coral:     0xec5f2a,

    leaf:      0x7d8a42,
    leafDark:  0x586633,
    leafDry:   0x9a9a52,
    grain:     0xd9a93f,
    ware:      0xd1880e,

    dung:      0x4e3a22,

    snow:      0xe4ecf0,
    ice:       0xa7c6d6,
    hide:      0xb5875a,
    hidePale:  0xd8b98a,
    hideDark:  0x7a5636,
    bone:      0xdcd2b8,
    boneDim:   0xb0a487,
    fur:       0x6f5240,
    spruce:    0x55634f,
    timberCold:0x6b5747,
    charcoal:  0x3d3a36,
    ember:     0xff8a3d,

    emberDim:  0xc4521f,
    rockCold:  0x8d949b,
    rockDark:  0x5f666d,
    flint:     0x4e565f,
    ochreRaw:  0xb5502f,
  },

  m(role, opts) { return Gfx.mat(Shapes.SURF[role] !== undefined ? Shapes.SURF[role] : role, opts); },

  box(w, h, d, role) {
    const g = new THREE.BoxGeometry(w, h, d);
    g.translate(0, h / 2, 0);
    return new THREE.Mesh(g, Shapes.m(role));
  },

  cyl(r, h, role, seg, taper) {
    const g = new THREE.CylinderGeometry(r * (taper === undefined ? 1 : taper), r, h, seg || 10);
    g.translate(0, h / 2, 0);
    return new THREE.Mesh(g, Shapes.m(role));
  },

  barX(r, len, role, seg) {
    const g = new THREE.CylinderGeometry(r, r, len, seg || 6);
    g.rotateZ(Math.PI / 2);
    return new THREE.Mesh(g, Shapes.m(role));
  },

  cone(r, h, role, seg) {
    const g = new THREE.ConeGeometry(r, h, seg || 8);
    g.translate(0, h / 2, 0);
    return new THREE.Mesh(g, Shapes.m(role));
  },

  gable(w, h, d, role, overhang) {
    const o = overhang === undefined ? 0.12 : overhang;
    const W = w / 2 + o, D = d / 2 + o;
    const pos = [];
    const tri = (a, b, c) => pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    tri([-W, 0, -D], [W, 0, -D], [W, h, 0]);
    tri([-W, 0, -D], [W, h, 0], [-W, h, 0]);
    tri([W, 0, D], [-W, 0, D], [-W, h, 0]);
    tri([W, 0, D], [-W, h, 0], [W, h, 0]);
    tri([W, 0, -D], [W, 0, D], [W, h, 0]);
    tri([-W, 0, D], [-W, 0, -D], [-W, h, 0]);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();

    return new THREE.Mesh(g, Shapes.m(role, { side: THREE.DoubleSide }));
  },

  vault(w, h, d, role, seg) {
    const n = seg || 9;
    const g = new THREE.CylinderGeometry(w / 2, w / 2, d, n * 2, 1, true, -Math.PI / 2, Math.PI);
    g.rotateZ(Math.PI / 2);
    g.rotateY(Math.PI / 2);

    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) p.setY(i, p.getY(i) * (h / (w / 2)));
    g.computeVertexNormals();
    return new THREE.Mesh(g, Shapes.m(role, { side: THREE.DoubleSide }));
  },

  hip(w, h, role, seg) {
    const g = new THREE.ConeGeometry(w * 0.72, h, seg || 4);
    if ((seg || 4) === 4) g.rotateY(Math.PI / 4);
    g.translate(0, h / 2, 0);
    return new THREE.Mesh(g, Shapes.m(role));
  },

  niches(g, w, h, d, count, y) {
    const n = count || 5;
    const mat = Shapes.m('trim');
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      for (const [ax, az, sw, sd] of [[0, -1, w / n * 0.4, 0.06], [0, 1, w / n * 0.4, 0.06],
                                      [-1, 0, 0.06, d / n * 0.4], [1, 0, 0.06, d / n * 0.4]]) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(sw, h * 0.66, sd), mat);
        slot.position.set(
          ax ? ax * w / 2 : (t - 0.5) * w,
          (y || 0) + h * 0.36,
          az ? az * d / 2 : (t - 0.5) * d
        );
        g.add(slot);
      }
    }
  },

  door(g, w, h, z, role) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.10), Shapes.m(role || 'trim'));
    m.position.set(0, h / 2, z);
    g.add(m);
    return m;
  },

  rock(seed, radius, squash) {
    const g = new THREE.IcosahedronGeometry(radius, 1);
    const p = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const n = v.clone().normalize();
      const h1 = Util.hash2(Math.round((n.x + seed) * 7), Math.round((n.y + seed) * 7));
      const h2 = Util.hash2(Math.round((n.z + seed) * 11), Math.round((n.x - seed) * 5));
      v.multiplyScalar(0.74 + h1 * 0.34 + h2 * 0.2);
      v.y *= (squash === undefined ? 0.82 : squash);
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    g.translate(0, radius * 0.34, 0);
    return new THREE.Mesh(g, Shapes.m('stone'));
  },

  crag(seed, radius, height) {
    const g = new THREE.Group();
    let r = radius, y = 0;
    for (let i = 0; i < 3; i++) {
      const m = Shapes.rock(seed + i * 3.1, r, 0.9);
      m.position.set((Util.hash2(seed + i, i) - 0.5) * r * 0.5, y, (Util.hash2(i, seed + i) - 0.5) * r * 0.5);
      g.add(m);
      y += height * 0.24 * (1 - i * 0.1);
      r *= 0.72;
    }
    return g;
  },

  plant(kind, seed) {
    const g = new THREE.Group();
    const h = Util.hash2(seed, seed * 3);
    const h2 = Util.hash2(seed * 5, seed + 11);

    switch (kind) {

      case 'palm': {

        const th = 1.15 + h * 0.5;
        const trunk = Shapes.cyl(0.075, th, 'timber', 6, 0.72);
        trunk.rotation.z = (h2 - 0.5) * 0.20;
        g.add(trunk);
        const crownY = th * 0.97;
        const fmat = Shapes.m(h < 0.5 ? 'leaf' : 'leafDry');
        const hub = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13, 0), fmat);
        hub.position.y = crownY + 0.04;
        g.add(hub);

        for (let i = 0; i < 11; i++) {
          const a = (i / 11) * Math.PI * 2 + h * 3;
          const frond = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), fmat);
          frond.scale.set(2.4, 0.38, 1.15);
          frond.rotation.order = 'YXZ';
          frond.rotation.y = a;

          frond.rotation.z = -0.85 - (i % 3) * 0.17;
          frond.position.set(Math.cos(a) * 0.26, crownY + 0.05, Math.sin(a) * 0.26);
          g.add(frond);
        }

        const dates = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09, 0), Shapes.m('ware'));
        dates.position.set(0.1, crownY - 0.1, 0.06);
        g.add(dates);
        break;
      }

      case 'reed': {

        const mat = Shapes.m('leafDry');
        for (let i = 0; i < 4; i++) {
          const hh = Util.hash2(seed + i * 3, i * 7);
          const r = 0.15 + hh * 0.07;
          const clump = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
          clump.scale.set(1, 1.45 + hh * 0.5, 1);
          clump.position.set((Util.hash2(seed, i) - 0.5) * 0.20, r * 0.85,
                             (Util.hash2(i, seed) - 0.5) * 0.20);
          g.add(clump);
        }
        for (let i = 0; i < 3; i++) {
          const hh = Util.hash2(seed * 2 + i, i);
          const bh = 0.20 + hh * 0.14;
          const blade = new THREE.Mesh(new THREE.ConeGeometry(0.055, bh, 3), mat);
          blade.position.set((hh - 0.5) * 0.24, 0.26 + bh / 2,
                             (Util.hash2(i, seed * 2) - 0.5) * 0.24);
          blade.rotation.z = (hh - 0.5) * 0.4;
          g.add(blade);
        }
        break;
      }

      case 'tamarisk': {

        const mat = Shapes.m('leafDry');
        for (let i = 0; i < 4; i++) {
          const r = 0.21 + h * 0.08 - i * 0.028;
          const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
          b.position.set((Util.hash2(seed, i) - 0.5) * 0.30, r * 0.78 + i * 0.06,
                         (Util.hash2(i, seed) - 0.5) * 0.30);
          g.add(b);
        }
        break;
      }

      case 'poplar': {

        const th = 0.5 + h * 0.2;
        g.add(Shapes.cyl(0.05, th, 'timber', 6, 0.8));
        const mat = Shapes.m('leaf');
        for (let i = 0; i < 3; i++) {
          const r = 0.30 - i * 0.06;
          const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
          b.position.y = th + 0.16 + i * 0.26;
          b.scale.set(1, 1.5, 1);
          g.add(b);
        }
        break;
      }

      case 'acacia': {

        const th = 0.72 + h * 0.3;
        g.add(Shapes.cyl(0.06, th, 'timber', 6, 0.65));
        const mat = Shapes.m('leaf');
        for (let i = 0; i < 3; i++) {
          const c = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34 - i * 0.05, 0), mat);
          c.scale.set(1.5, 0.42, 1.5);
          c.position.set((Util.hash2(seed, i) - 0.5) * 0.3, th + 0.08 + i * 0.11, (Util.hash2(i, seed) - 0.5) * 0.3);
          g.add(c);
        }
        break;
      }

      case 'olive':
      case 'bush': {
        const th = kind === 'olive' ? 0.42 + h * 0.2 : 0;
        if (th) g.add(Shapes.cyl(0.055, th, 'timber', 6, 0.8));
        const mat = Shapes.m(kind === 'olive' ? 'leafDry' : 'leaf');
        for (let i = 0; i < 3; i++) {
          const r = (kind === 'olive' ? 0.30 : 0.22) + h * 0.1 - i * 0.045;
          const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
          b.position.set((Util.hash2(seed, i) - 0.5) * 0.3, th + r * 0.8 + i * 0.14, (Util.hash2(i, seed) - 0.5) * 0.3);
          g.add(b);
        }
        break;
      }

      case 'cypress': {
        const th = 0.3 + h * 0.15;
        g.add(Shapes.cyl(0.05, th, 'timber', 6, 0.8));
        const c = Shapes.cone(0.22, 1.15 + h * 0.35, 'leafDark', 7);
        c.position.y = th;
        g.add(c);
        break;
      }

      case 'jungle':
      case 'ceiba':
      case 'ahuehuete': {
        const th = (kind === 'jungle' ? 0.55 : 1.0) + h * 0.4;
        g.add(Shapes.cyl(kind === 'ceiba' ? 0.11 : 0.075, th, 'timber', 6, 0.72));
        const mat = Shapes.m('leafDark');
        for (let i = 0; i < 4; i++) {
          const r = 0.42 + h * 0.16 - i * 0.06;
          const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat);
          b.position.set((Util.hash2(seed + i, i * 5) - 0.5) * 0.42, th + 0.2 + i * 0.2, (Util.hash2(i * 7, seed + i) - 0.5) * 0.42);
          g.add(b);
        }
        break;
      }

      case 'agave': {
        const mat = Shapes.m('leafDry');
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          const blade = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.42, 3), mat);
          blade.position.set(Math.cos(a) * 0.09, 0.19, Math.sin(a) * 0.09);
          blade.rotation.set(Math.cos(a) * 0.8, -a, Math.sin(a) * 0.8);
          g.add(blade);
        }
        break;
      }

      case 'umbrella':
      case 'streetTree': {
        const th = 0.62 + h * 0.25;
        g.add(Shapes.cyl(0.06, th, 'timber', 6, 0.75));
        const c = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42 + h * 0.1, 1), Shapes.m('leaf'));
        c.scale.set(1.15, kind === 'umbrella' ? 0.55 : 0.85, 1.15);
        c.position.y = th + 0.3;
        g.add(c);
        break;
      }

      case 'deadTree': {
        const th = 0.7 + h * 0.4;
        g.add(Shapes.cyl(0.06, th, 'timber', 5, 0.6));
        for (let i = 0; i < 3; i++) {
          const a = Util.hash2(seed, i) * 6.28;
          const limb = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.03, 0.32, 4), Shapes.m('timber'));
          limb.position.set(Math.cos(a) * 0.11, th * (0.6 + i * 0.16), Math.sin(a) * 0.11);
          limb.rotation.z = Math.cos(a) * 0.9;
          limb.rotation.x = Math.sin(a) * 0.9;
          g.add(limb);
        }
        break;
      }

      case 'pod': {
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 5, 0, 6.3, 0, Math.PI / 2), Shapes.m('plaster'));
        g.add(dome);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.025, 4, 12), Shapes.m('stone'));
        ring.rotation.x = -Math.PI / 2;
        g.add(ring);
        break;
      }

      case 'crystal': {
        const mat = Shapes.m('plaster');
        for (let i = 0; i < 3; i++) {
          const hh = Util.hash2(seed + i, i);
          const s = Shapes.cone(0.09 + hh * 0.05, 0.4 + hh * 0.45, 'plaster', 5);
          s.material = mat;
          s.position.set((hh - 0.5) * 0.24, 0, (Util.hash2(i, seed) - 0.5) * 0.24);
          s.rotation.z = (hh - 0.5) * 0.3;
          g.add(s);
        }
        break;
      }

      default: {
        const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26, 0), Shapes.m('leaf'));
        b.position.y = 0.22;
        g.add(b);
      }
    }
    return g;
  },

  PLANT_KINDS: ['palm', 'reed', 'tamarisk', 'poplar', 'acacia', 'olive', 'bush', 'cypress',
    'jungle', 'ceiba', 'ahuehuete', 'agave', 'umbrella', 'streetTree', 'deadTree', 'pod', 'crystal'],

  mergeGroup(group) {
    group.updateMatrixWorld(true);
    const pos = [], nor = [], col = [];
    group.traverse(o => {
      if (!o.isMesh) return;
      const src = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      src.applyMatrix4(o.matrixWorld);
      if (!src.attributes.normal) src.computeVertexNormals();
      const p = src.attributes.position, n = src.attributes.normal;
      const c = o.material.color;
      for (let i = 0; i < p.count; i++) {
        pos.push(p.getX(i), p.getY(i), p.getZ(i));
        nor.push(n.getX(i), n.getY(i), n.getZ(i));
        col.push(c.r, c.g, c.b);
      }
      src.dispose();
    });
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    out.computeBoundingSphere();
    return out;
  },

  ROCK_TINT: {
    1:  0x8d949b,

    3:  0xd6cfb8,

    4:  0xbd9967,
    5:  0xdcc196,
    6:  0xc9a86e,

    10: 0xe0dcd0,
    13: 0xc9b9a2,
    14: 0xcfd0c2,
    22: 0xa8a49a,
    26: 0x9a9a8c,
    30: 0x6e6459,
    35: 0xb0aaa2,
  },

  rockTint(era) {
    const keys = Object.keys(Shapes.ROCK_TINT).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= rungOf(era)) pick = k;
    return Shapes.ROCK_TINT[pick];
  },

  _protos: {},
  proto(kind) {
    if (Shapes._protos[kind]) return Shapes._protos[kind];
    let g;

    if (kind === 'boulder') g = Shapes.rock(21, 0.34, 0.72).geometry;
    else if (kind === 'crag') g = Shapes.mergeGroup(Shapes.crag(4, 0.46, 0.9));
    else if (kind === 'karst') g = Shapes.rock(9, 0.55, 1.45).geometry;
    else if (kind === 'slag') g = Shapes.rock(31, 0.44, 1.05).geometry;
    else if (kind === 'regolith') g = Shapes.rock(17, 0.3, 0.5).geometry;
    else if (Shapes.PLANT_KINDS.indexOf(kind) >= 0)
      g = Shapes.mergeGroup(Shapes.plant(kind, Shapes.PLANT_KINDS.indexOf(kind) * 7 + 3));
    else g = new THREE.IcosahedronGeometry(0.3, 0);
    Shapes._protos[kind] = g;
    return g;
  },

  WIND: { time: { value: 0 }, amt: { value: 0.045 } },

  _protoMats: {},

  protoMat(kind, era) {
    const e = rungOf(era);
    const key = kind + ':' + e;
    if (Shapes._protoMats[key]) return Shapes._protoMats[key];
    const isRock = ['boulder', 'crag', 'karst', 'slag', 'regolith'].indexOf(kind) >= 0;
    const m = isRock
      ? Gfx.mat(Shapes.rockTint(e))
      : Gfx.mat(0xffffff, { cache: false, vertexColors: true });
    if (!isRock) Shapes.windPatch(m);
    Shapes._protoMats[key] = m;
    return m;
  },

  windPatch(mat) {

    const prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (shader, renderer) => {
      if (prev) prev(shader, renderer);
      shader.uniforms.windTime = Shapes.WIND.time;
      shader.uniforms.windAmt = Shapes.WIND.amt;
      shader.vertexShader = shader.vertexShader
        .replace('void main() {', 'uniform float windTime; uniform float windAmt;\nvoid main() {')
        .replace('#include <begin_vertex>', `
          #include <begin_vertex>
          {
            // the instance's own position gives every plant its own phase, so a
            // grove never sways as one object
            #ifdef USE_INSTANCING
              float ph = instanceMatrix[3][0] * 0.7 + instanceMatrix[3][2] * 0.55;
            #else
              float ph = 0.0;
            #endif
            // QUADRATIC in height above the plant's own base: the trunk stays
            // planted and the crown does the moving. Linear would shear the
            // whole plant sideways like a sliding decal.
            float hh = max(0.0, transformed.y);
            float a = hh * hh * windAmt;
            transformed.x += sin(windTime * 1.7 + ph) * a;
            transformed.z += cos(windTime * 1.31 + ph * 1.4) * a * 0.6;
          }`);
    };
    mat.needsUpdate = true;
    return mat;
  },

  RECIPES: {

    fishweir(d) {
      const g = new THREE.Group();
      const W = d.w * 0.72, D = d.h * 0.80;
      const DECK = 0.78;

      for (const z of [-D * 0.42, -D * 0.14, D * 0.14, D * 0.42]) {
        for (const x of [-W * 0.42, W * 0.42]) {
          const p = Shapes.cyl(0.055, DECK + 0.06, 'timber', 6);
          p.position.set(x, 0, z);
          g.add(p);
        }
      }

      for (let i = 0; i < 7; i++) {
        const s = Shapes.box(0.06, 0.66, 0.06, 'thatchDim');
        s.position.set(-W * 0.62, 0.26, -D * 0.46 + (D * 0.92) * (i / 6));
        g.add(s);
      }
      const rail = Shapes.box(0.05, 0.05, D * 0.95, 'timber');
      rail.position.set(-W * 0.62, 0.88, 0);
      g.add(rail);

      const deck = Shapes.box(W, 0.08, D, 'timber');
      deck.position.y = DECK;
      g.add(deck);

      const hut = Shapes.box(W * 0.86, 0.32, D * 0.30, 'thatch');
      hut.position.set(0, DECK + 0.08, -D * 0.30);
      g.add(hut);
      const roof = Shapes.gable(W * 0.86, 0.20, D * 0.30, 'thatchDim', 0.06);
      roof.position.set(0, DECK + 0.40, -D * 0.30);
      g.add(roof);

      for (const x of [-W * 0.30, W * 0.30]) {
        const post = Shapes.box(0.06, 0.42, 0.06, 'timber');
        post.position.set(x, DECK + 0.08, D * 0.34);
        g.add(post);
      }
      const bar = Shapes.box(W * 0.68, 0.05, 0.05, 'timber');
      bar.position.set(0, DECK + 0.46, D * 0.34);
      g.add(bar);
      for (let i = 0; i < 3; i++) {
        const f = Shapes.box(0.07, 0.17, 0.05, 'ware');
        f.position.set(-W * 0.22 + i * (W * 0.22), DECK + 0.26, D * 0.34);
        g.add(f);
      }
      return g;
    },

    jetty(d) {
      const g = new THREE.Group();
      const W = d.w * 0.92, D = d.h * 0.92;
      const DECK = 0.74;
      for (const x of [-W * 0.34, W * 0.34]) {
        for (const z of [-D * 0.34, D * 0.34]) {
          const p = Shapes.cyl(0.055, DECK + 0.05, 'timber', 6);
          p.position.set(x, 0, z);
          g.add(p);
        }
      }
      const deck = Shapes.box(W, 0.09, D, 'timber');
      deck.position.y = DECK;
      g.add(deck);

      const boat = Shapes.cyl(0.10, D * 0.86, 'thatch', 6);
      boat.rotation.x = Math.PI / 2;
      boat.position.set(W * 0.30, 0.46, -D * 0.43);
      g.add(boat);
      const post = Shapes.box(0.06, 0.30, 0.06, 'timber');
      post.position.set(-W * 0.30, DECK + 0.09, 0);
      g.add(post);
      return g;
    },

    templeHousehold(d) {
      const g = new THREE.Group();
      const w = d.w * 0.88, dp = d.h * 0.88;

      const terrace = Shapes.box(w, 0.22, dp, 'stoneDark');
      g.add(terrace);

      const wall = Shapes.box(w * 0.94, 0.72, dp * 0.94, 'mud');
      wall.position.y = 0.22;
      g.add(wall);
      Shapes.niches(g, w * 0.945, 0.72, dp * 0.945, 5, 0.22);

      const cap = Shapes.box(w * 0.99, 0.09, dp * 0.99, 'mudPale');
      cap.position.y = 0.94;
      g.add(cap);

      const cella = Shapes.box(w * 0.52, 0.42, dp * 0.52, 'mudPale');
      cella.position.y = 1.03;
      g.add(cella);
      const roof = Shapes.box(w * 0.58, 0.07, dp * 0.58, 'thatch');
      roof.position.y = 1.45;
      g.add(roof);

      Shapes.door(g, 0.34, 0.44, dp * 0.47 + 0.01);

      for (const sx of [-1, 1]) {
        const pole = Shapes.cyl(0.035, 0.9, 'timber', 5);
        pole.position.set(sx * w * 0.3, 0.22, dp * 0.5);
        g.add(pole);
        const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.16), Shapes.m('coral', { side: THREE.DoubleSide }));
        flag.position.set(sx * w * 0.3 + sx * 0.11, 1.02, dp * 0.5);
        g.add(flag);
      }
      return g;
    },

    reedHouse(d) {
      const g = new THREE.Group();
      const w = d.w * 0.74, dp = d.h * 0.80;

      const plinth = Shapes.box(w * 1.08, 0.09, dp * 1.02, 'mud');
      g.add(plinth);

      const arch = Shapes.vault(w, 0.82, dp, 'thatch', 5);
      arch.position.y = 0.09;
      g.add(arch);

      const mat = Shapes.m('thatchDim');
      for (const sz of [-1, 1]) {
        const face = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.82), mat);
        face.position.set(0, 0.09 + 0.41, sz * dp / 2);
        face.scale.y = 0.98;
        g.add(face);
        for (let i = 0; i < 4; i++) {
          const rib = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.78, 0.04), Shapes.m('timber'));
          rib.position.set((i / 3 - 0.5) * w * 0.82, 0.09 + 0.36, sz * (dp / 2 + 0.01));
          rib.rotation.z = (i / 3 - 0.5) * 0.5;
          g.add(rib);
        }
      }
      Shapes.door(g, 0.22, 0.4, dp * 0.5 + 0.02, 'trim');
      return g;
    },

    mudbrickHouse(d) {
      const g = new THREE.Group();
      const w = d.w * 0.80, dp = d.h * 0.82;
      g.add(Shapes.box(w * 1.06, 0.07, dp * 1.04, 'stoneDark'));
      const body = Shapes.box(w, 0.74, dp, 'mud');
      body.position.y = 0.07;
      g.add(body);

      const face = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.98, 0.72), Shapes.m('mudPale'));
      face.position.set(0, 0.43, dp / 2 + 0.005);
      g.add(face);
      const par = Shapes.box(w * 1.05, 0.09, dp * 1.05, 'mudPale');
      par.position.y = 0.81;
      g.add(par);

      for (let i = 0; i < 3; i++) {
        const st = Shapes.box(0.13, 0.06, 0.09, 'mud');
        st.position.set(-w * 0.32, 0.07 + i * 0.06, dp * 0.5 - 0.06 - i * 0.09);
        g.add(st);
      }
      Shapes.door(g, 0.19, 0.34, dp * 0.5 + 0.02);

      const win = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.09, 0.04), Shapes.m('trim'));
      win.position.set(w * 0.24, 0.56, dp * 0.5);
      g.add(win);
      return g;
    },

    courtyardHouse(d) {
      const g = new THREE.Group();
      const w = d.w * 0.90, dp = d.h * 0.90;

      g.add(Shapes.box(w * 1.04, 0.09, dp * 1.04, 'stoneDark'));
      const main = Shapes.box(w, 0.82, dp * 0.62, 'mudPale');
      main.position.set(0, 0.09, -dp * 0.17);
      g.add(main);
      const upper = Shapes.box(w * 0.72, 0.44, dp * 0.46, 'plaster');
      upper.position.set(-w * 0.10, 0.91, -dp * 0.20);
      g.add(upper);
      const cap = Shapes.box(w * 0.80, 0.07, dp * 0.54, 'mudPale');
      cap.position.set(-w * 0.10, 1.35, -dp * 0.20);
      g.add(cap);

      const wing = Shapes.box(w * 0.34, 0.52, dp * 0.40, 'mud');
      wing.position.set(-w * 0.31, 0.09, dp * 0.28);
      g.add(wing);
      const wall = Shapes.box(w * 0.62, 0.22, 0.06, 'mud');
      wall.position.set(w * 0.16, 0.09, dp * 0.46);
      g.add(wall);
      const court = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.56, dp * 0.34), Shapes.m('mudPale'));
      court.rotation.x = -Math.PI / 2;
      court.position.set(w * 0.16, 0.10, dp * 0.28);
      g.add(court);
      const jar = new THREE.Mesh(new THREE.IcosahedronGeometry(0.07, 0), Shapes.m('ware'));
      jar.position.set(w * 0.30, 0.15, dp * 0.22);
      g.add(jar);
      Shapes.door(g, 0.18, 0.32, dp * 0.14 + 0.02, 'trim');
      return g;
    },

    well(d) {
      const g = new THREE.Group();
      const curb = Shapes.cyl(0.26, 0.24, 'mud', 10);
      g.add(curb);
      const water = new THREE.Mesh(new THREE.CircleGeometry(0.2, 10), Shapes.m('leafDark'));
      water.rotation.x = -Math.PI / 2;
      water.position.y = 0.20;
      g.add(water);

      const post = Shapes.cyl(0.04, 0.68, 'timber', 5);
      post.position.set(0.16, 0, 0.1);
      g.add(post);
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.045, 0.045), Shapes.m('timber'));
      beam.position.set(0.06, 0.70, 0.1);
      beam.rotation.z = 0.34;
      g.add(beam);
      const weight = new THREE.Mesh(new THREE.IcosahedronGeometry(0.08, 0), Shapes.m('stoneDark'));
      weight.position.set(0.36, 0.59, 0.1);
      g.add(weight);
      return g;
    },

    farmPlot(d) {
      const g = new THREE.Group();
      const w = d.w * 0.94, dp = d.h * 0.94;
      const bed = Shapes.box(w, 0.06, dp, 'stoneDark');
      g.add(bed);
      const rows = 6;
      for (let i = 0; i < rows; i++) {
        const strip = Shapes.box(w * 0.94, 0.11, dp / rows * 0.55, 'grain');
        strip.position.set(0, 0.06, ((i + 0.5) / rows - 0.5) * dp);
        g.add(strip);
      }

      const ditch = Shapes.box(w, 0.03, dp * 0.08, 'leafDark');
      ditch.position.set(0, 0.05, dp * 0.5 - dp * 0.05);
      g.add(ditch);

      const sh = Shapes.vault(0.36, 0.3, 0.42, 'thatch', 5);
      sh.position.set(-w * 0.34, 0.06, -dp * 0.32);
      g.add(sh);
      return g;
    },

    millHouse(d) {
      const g = new THREE.Group();
      const w = d.w * 0.62, dp = d.h * 0.62;
      const body = Shapes.box(w, 0.86, dp, 'mud');
      body.position.set(-d.w * 0.14, 0, -d.h * 0.14);
      g.add(body);
      const roof = Shapes.gable(w, 0.30, dp, 'thatch', 0.1);
      roof.position.set(-d.w * 0.14, 0.86, -d.h * 0.14);
      g.add(roof);

      const floor = new THREE.Mesh(new THREE.CircleGeometry(d.w * 0.30, 12), Shapes.m('stone'));
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(d.w * 0.20, 0.045, d.h * 0.20);
      g.add(floor);
      const stone = Shapes.cyl(0.16, 0.14, 'stoneDark', 10);
      stone.position.set(d.w * 0.20, 0.05, d.h * 0.20);
      g.add(stone);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.04), Shapes.m('timber'));
      arm.position.set(d.w * 0.20 + 0.2, 0.17, d.h * 0.20);
      g.add(arm);

      for (let i = 0; i < 3; i++) {
        const sack = new THREE.Mesh(new THREE.IcosahedronGeometry(0.1, 0), Shapes.m('thatchDim'));
        sack.position.set(d.w * (0.1 + i * 0.09), 0.09, -d.h * 0.34);
        sack.scale.y = 1.3;
        g.add(sack);
      }
      return g;
    },

    marketStalls(d) {
      const g = new THREE.Group();
      const w = d.w * 0.9, dp = d.h * 0.9;
      g.add(Shapes.box(w, 0.05, dp, 'stoneDark'));

      const cloths = ['coral', 'thatch', 'mudPale', 'thatchDim'];
      let i = 0;
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        const ox = sx * w * 0.24, oz = sz * dp * 0.24;
        const bench = Shapes.box(w * 0.38, 0.22, dp * 0.30, 'timber');
        bench.position.set(ox, 0.05, oz);
        g.add(bench);
        for (const px of [-1, 1]) for (const pz of [-1, 1]) {
          const post = Shapes.cyl(0.022, 0.55, 'timber', 4);
          post.position.set(ox + px * w * 0.19, 0.05, oz + pz * dp * 0.15);
          g.add(post);
        }
        const awn = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.42, dp * 0.36),
          Shapes.m(cloths[i % 4], { side: THREE.DoubleSide }));

        awn.rotation.x = -Math.PI / 2 + (i % 2 ? 0.12 : -0.12);
        awn.position.set(ox, 0.62, oz);
        g.add(awn);
        const pot = new THREE.Mesh(new THREE.IcosahedronGeometry(0.07, 0), Shapes.m('ware'));
        pot.position.set(ox + 0.07, 0.29, oz);
        g.add(pot);
        i++;
      }
      return g;
    },

    clayPit(d) {
      const g = new THREE.Group();
      const w = d.w * 0.9, dp = d.h * 0.9;
      const pit = new THREE.Mesh(new THREE.CircleGeometry(w * 0.34, 12), Shapes.m('trim'));
      pit.rotation.x = -Math.PI / 2;
      pit.position.set(-w * 0.12, 0.03, 0);
      g.add(pit);
      for (let i = 0; i < 3; i++) {
        const hh = Util.hash2(i + 3, i);

        const heap = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15 + hh * 0.05, 0), Shapes.m('timber'));
        heap.scale.set(1.3, 0.62, 1.3);
        heap.position.set(w * (0.16 + i * 0.08), 0.05, (hh - 0.5) * dp * 0.5);
        g.add(heap);
      }
      const barrow = Shapes.box(0.24, 0.10, 0.15, 'timber');
      barrow.position.set(w * 0.02, 0.03, dp * 0.30);
      g.add(barrow);
      return g;
    },

    kiln(d) {
      const g = new THREE.Group();
      const w = d.w * 0.60;
      g.add(Shapes.box(d.w * 0.9, 0.07, d.h * 0.9, 'stoneDark'));
      const base = Shapes.cyl(w * 0.44, 0.40, 'mud', 10, 0.9);
      base.position.set(-d.w * 0.14, 0.07, -d.h * 0.10);
      g.add(base);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(w * 0.42, 10, 6, 0, 6.3, 0, Math.PI / 2),
        Shapes.m('mud'));
      dome.scale.y = 1.15;
      dome.position.set(-d.w * 0.14, 0.47, -d.h * 0.10);
      g.add(dome);
      const flue = Shapes.cyl(0.065, 0.24, 'trim', 8);
      flue.position.set(-d.w * 0.14, 0.86, -d.h * 0.10);
      g.add(flue);
      const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.06), Shapes.m('coral'));
      mouth.position.set(-d.w * 0.14, 0.20, -d.h * 0.10 + w * 0.44);
      g.add(mouth);
      const stack = Shapes.box(0.28, 0.15, 0.22, 'ware');
      stack.position.set(d.w * 0.22, 0.07, d.h * 0.20);
      g.add(stack);
      return g;
    },

    potteryStall(d) {
      const g = new THREE.Group();
      const w = d.w * 0.86, dp = d.h * 0.86;
      g.add(Shapes.box(w, 0.05, dp, 'stoneDark'));
      for (let r = 0; r < 3; r++) {
        const shelf = Shapes.box(w * 0.74, 0.05, 0.12, 'timber');
        shelf.position.set(0, 0.05 + r * 0.17, -dp * 0.22 + r * 0.19);
        g.add(shelf);
        for (let i = 0; i < 4; i++) {
          const pot = Shapes.cyl(0.05, 0.10, 'ware', 8, 0.68);
          pot.position.set((i / 3 - 0.5) * w * 0.62, 0.10 + r * 0.17, -dp * 0.22 + r * 0.19);
          g.add(pot);
        }
      }
      const awn = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.88, dp * 0.46),
        Shapes.m('thatch', { side: THREE.DoubleSide }));
      awn.rotation.x = -Math.PI / 2 + 0.12;
      awn.position.set(0, 0.60, -dp * 0.04);
      g.add(awn);
      return g;
    },

    sheepfold(d) {
      const g = new THREE.Group();
      const w = d.w * 0.90, dp = d.h * 0.90;
      g.add(Shapes.box(w, 0.04, dp, 'mudPale'));
      const post = Shapes.m('timber');
      for (let i = 0; i < 5; i++) {
        const t = i / 4 - 0.5;
        for (const [ax, az] of [[t, -0.5], [t, 0.5], [-0.5, t], [0.5, t]]) {
          const p = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.05), post);
          p.position.set(ax * w, 0.16, az * dp);
          g.add(p);
        }
      }
      for (const [ax, az, sw, sd] of [[0, -0.5, w, 0.03], [0, 0.5, w, 0.03],
                                      [-0.5, 0, 0.03, dp], [0.5, 0, 0.03, dp]]) {
        const rail = Shapes.box(sw, 0.03, sd, 'timber');
        rail.position.set(ax * w, 0.21, az * dp);
        g.add(rail);
      }
      for (let i = 0; i < 4; i++) {
        const hh = Util.hash2(i * 5 + 2, i);
        const sheep = new THREE.Mesh(new THREE.IcosahedronGeometry(0.10, 0), Shapes.m('plaster'));
        sheep.scale.set(1.4, 0.9, 1.0);
        sheep.position.set((hh - 0.5) * w * 0.55, 0.13, (Util.hash2(i, i + 7) - 0.5) * dp * 0.55);
        g.add(sheep);
      }
      const shelter = Shapes.gable(0.40, 0.18, 0.30, 'thatch', 0.05);
      shelter.position.set(-w * 0.26, 0.04, -dp * 0.28);
      g.add(shelter);
      return g;
    },

    weaverShed(d) {
      const g = new THREE.Group();
      const w = d.w * 0.62, dp = d.h * 0.62;
      const body = Shapes.box(w, 0.58, dp, 'mud');
      body.position.set(-d.w * 0.14, 0, -d.h * 0.14);
      g.add(body);
      const roof = Shapes.gable(w, 0.22, dp, 'thatch', 0.09);
      roof.position.set(-d.w * 0.14, 0.58, -d.h * 0.14);
      g.add(roof);
      const lw = 0.40;
      for (const px of [-1, 1]) {
        const p = Shapes.cyl(0.03, 0.60, 'timber', 4);
        p.position.set(d.w * 0.20 + px * lw / 2, 0, d.h * 0.20);
        g.add(p);
      }
      for (const y of [0.58, 0.20]) {
        const beam = Shapes.box(lw + 0.08, 0.045, 0.045, 'timber');
        beam.position.set(d.w * 0.20, y, d.h * 0.20);
        g.add(beam);
      }
      const warp = new THREE.Mesh(new THREE.PlaneGeometry(lw, 0.38),
        Shapes.m('plaster', { side: THREE.DoubleSide }));
      warp.position.set(d.w * 0.20, 0.39, d.h * 0.20);
      g.add(warp);
      return g;
    },

    clothHall(d) {
      const g = new THREE.Group();
      const w = d.w * 0.88, dp = d.h * 0.88;
      g.add(Shapes.box(w, 0.06, dp, 'stoneDark'));
      const back = Shapes.box(w, 0.50, dp * 0.24, 'mudPale');
      back.position.set(0, 0.06, -dp * 0.32);
      g.add(back);
      const bench = Shapes.box(w * 0.82, 0.13, dp * 0.28, 'timber');
      bench.position.set(0, 0.06, dp * 0.10);
      g.add(bench);
      const dyes = ['coral', 'ware', 'plaster', 'leafDry'];
      for (let i = 0; i < 4; i++) {
        const bolt = Shapes.cyl(0.058, 0.28, dyes[i], 8);
        bolt.rotation.z = Math.PI / 2;
        bolt.position.set((i / 3 - 0.5) * w * 0.58, 0.25, dp * 0.10);
        g.add(bolt);
      }
      for (const px of [-1, 1]) {
        const p = Shapes.cyl(0.022, 0.56, 'timber', 4);
        p.position.set(px * w * 0.40, 0.06, dp * 0.32);
        g.add(p);
      }
      const awn = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.92, dp * 0.44),
        Shapes.m('mudPale', { side: THREE.DoubleSide }));
      awn.rotation.x = -Math.PI / 2 + 0.10;
      awn.position.set(0, 0.60, dp * 0.12);
      g.add(awn);
      return g;
    },

    brewery(d) {
      const g = new THREE.Group();
      const w = d.w * 0.56, dp = d.h * 0.56;
      const body = Shapes.box(w, 0.54, dp, 'mud');
      body.position.set(-d.w * 0.18, 0, -d.h * 0.16);
      g.add(body);
      const roof = Shapes.box(w * 1.10, 0.07, dp * 1.10, 'mudPale');
      roof.position.set(-d.w * 0.18, 0.54, -d.h * 0.16);
      g.add(roof);
      for (let i = 0; i < 3; i++) {
        const vx = d.w * (0.14 + (i % 2) * 0.16), vz = d.h * (0.08 + Math.floor(i / 2) * 0.24);
        const vat = Shapes.cyl(0.125, 0.22, 'timber', 10, 0.92);
        vat.position.set(vx, 0, vz);
        g.add(vat);
        const brew = new THREE.Mesh(new THREE.CircleGeometry(0.11, 10), Shapes.m('ware'));
        brew.rotation.x = -Math.PI / 2;
        brew.position.set(vx, 0.225, vz);
        g.add(brew);
      }
      return g;
    },

    tavern(d) {
      const g = new THREE.Group();
      const w = d.w * 0.88, dp = d.h * 0.88;
      g.add(Shapes.box(w, 0.05, dp, 'stoneDark'));
      const body = Shapes.box(w * 0.50, 0.52, dp * 0.42, 'mud');
      body.position.set(-w * 0.22, 0.05, -dp * 0.26);
      g.add(body);
      const roof = Shapes.gable(w * 0.54, 0.19, dp * 0.46, 'thatch', 0.07);
      roof.position.set(-w * 0.22, 0.57, -dp * 0.26);
      g.add(roof);
      for (let i = 0; i < 2; i++) {
        const bench = Shapes.box(w * 0.42, 0.09, 0.09, 'timber');
        bench.position.set(w * 0.16, 0.05, dp * (0.04 + i * 0.22));
        g.add(bench);
      }
      const table = Shapes.box(w * 0.36, 0.12, 0.15, 'timber');
      table.position.set(w * 0.16, 0.05, dp * 0.15);
      g.add(table);
      for (let i = 0; i < 3; i++) {
        const cup = Shapes.cyl(0.03, 0.065, 'ware', 6);
        cup.position.set(w * (0.02 + i * 0.13), 0.17, dp * 0.15);
        g.add(cup);
      }
      const awn = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.54, dp * 0.48),
        Shapes.m('coral', { side: THREE.DoubleSide }));
      awn.rotation.x = -Math.PI / 2 + 0.10;
      awn.position.set(w * 0.16, 0.50, dp * 0.14);
      g.add(awn);
      return g;
    },

    scribeHouse(d) {
      const g = new THREE.Group();
      const w = d.w * 0.72, dp = d.h * 0.72;
      g.add(Shapes.box(w * 1.10, 0.07, dp * 1.06, 'stoneDark'));
      const body = Shapes.box(w, 0.60, dp, 'plaster');
      body.position.y = 0.07;
      g.add(body);
      const roof = Shapes.box(w * 1.08, 0.07, dp * 1.08, 'mudPale');
      roof.position.y = 0.67;
      g.add(roof);
      for (let r = 0; r < 3; r++) {
        const shelf = Shapes.box(w * 0.62, 0.035, 0.06, 'timber');
        shelf.position.set(0, 0.15 + r * 0.15, dp * 0.5 + 0.04);
        g.add(shelf);
        for (let i = 0; i < 3; i++) {
          const tab = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.02), Shapes.m('mudPale'));
          tab.position.set((i - 1) * 0.10, 0.21 + r * 0.15, dp * 0.5 + 0.04);
          g.add(tab);
        }
      }
      Shapes.door(g, 0.15, 0.26, dp * 0.5 + 0.01);
      return g;
    },

    cistern(d) {
      const g = new THREE.Group();
      g.add(Shapes.cyl(0.32, 0.28, 'stone', 12));
      const water = new THREE.Mesh(new THREE.CircleGeometry(0.26, 12), Shapes.m('leafDark'));
      water.rotation.x = -Math.PI / 2;
      water.position.y = 0.245;
      g.add(water);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.4;
        const p = Shapes.cyl(0.024, 0.38, 'timber', 4);
        p.position.set(Math.cos(a) * 0.28, 0.28, Math.sin(a) * 0.28);
        g.add(p);
      }

      const lid = Shapes.hip(0.66, 0.20, 'thatch', 8);
      lid.position.y = 0.66;
      g.add(lid);
      return g;
    },

    threshingFloor(d) {
      const g = new THREE.Group();
      const w = d.w * 0.92;
      g.add(Shapes.box(d.w * 0.92, 0.03, d.h * 0.92, 'stoneDark'));
      const floor = new THREE.Mesh(new THREE.CircleGeometry(w * 0.46, 16), Shapes.m('mudPale'));
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0.035;
      g.add(floor);
      const sledge = Shapes.box(0.28, 0.06, 0.18, 'timber');
      sledge.position.set(0.04, 0.04, 0);
      g.add(sledge);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.6;
        const heap = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11, 0), Shapes.m('grain'));
        heap.scale.set(1.2, 0.55, 1.2);
        heap.position.set(Math.cos(a) * w * 0.34, 0.05, Math.sin(a) * w * 0.34);
        g.add(heap);
      }
      return g;
    },

    midden(d) {
      const g = new THREE.Group();
      const pit = Shapes.box(d.w * 0.86, 0.05, d.h * 0.86, 'trim');
      g.add(pit);
      for (let i = 0; i < 3; i++) {
        const hh = Util.hash2(i * 7 + 1, i * 3);
        const r = 0.20 - i * 0.045;
        const heap = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), Shapes.m('dung'));
        heap.scale.set(1.25, 0.72, 1.25);
        heap.position.set((hh - 0.5) * 0.24, 0.05 + r * 0.5, (Util.hash2(i, i + 5) - 0.5) * 0.24);
        g.add(heap);
      }

      const straw = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09, 0), Shapes.m('thatchDim'));
      straw.scale.set(1.3, 0.45, 1.3);
      straw.position.set(-0.17, 0.08, 0.15);
      g.add(straw);

      const fork = Shapes.cyl(0.018, 0.42, 'timber', 4);
      fork.position.set(0.19, 0.06, -0.12);
      fork.rotation.z = -0.32;
      g.add(fork);
      const basket = Shapes.cyl(0.09, 0.11, 'thatch', 8, 0.86);
      basket.position.set(-0.26, 0.05, -0.20);
      g.add(basket);
      return g;
    },

    publicSquare(d) {
      const g = new THREE.Group();
      const w = d.w * 0.94, dp = d.h * 0.94;
      g.add(Shapes.box(w, 0.05, dp, 'mudPale'));

      const rim = Shapes.m('stone');
      for (let i = 0; i < 4; i++) {
        const t = (i + 0.5) / 4 - 0.5;
        for (const [ax, az] of [[t, -0.46], [t, 0.46], [-0.46, t], [0.46, t]]) {
          const stone = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.07), rim);
          stone.position.set(ax * w, 0.06, az * dp);
          g.add(stone);
        }
      }

      const stele = Shapes.box(0.11, 0.44, 0.07, 'stone');
      stele.position.set(-w * 0.22, 0.05, -dp * 0.16);
      g.add(stele);
      const cap = Shapes.box(0.13, 0.04, 0.09, 'plaster');
      cap.position.set(-w * 0.22, 0.49, -dp * 0.16);
      g.add(cap);

      for (const px of [-1, 1]) {
        const post = Shapes.cyl(0.02, 0.34, 'timber', 4);
        post.position.set(w * 0.24 + px * w * 0.16, 0.05, dp * 0.20);
        g.add(post);
      }
      const shade = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.42, dp * 0.30),
        Shapes.m('thatch', { side: THREE.DoubleSide }));
      shade.rotation.x = -Math.PI / 2 + 0.08;
      shade.position.set(w * 0.24, 0.39, dp * 0.20);
      g.add(shade);

      for (let i = 0; i < 2; i++) {
        const jar = Shapes.cyl(0.055, 0.13, 'ware', 8, 0.7);
        jar.position.set(w * 0.10 + i * 0.13, 0.05, -dp * 0.30);
        g.add(jar);
      }
      return g;
    },

    templeGranary(d) {
      const g = new THREE.Group();
      const w = d.w * 0.92, dp = d.h * 0.92;

      g.add(Shapes.box(w, 0.18, dp, 'stoneDark'));

      const th = 0.06;
      for (const [ox, oz, sw, sd] of [[0, -dp / 2, w, th], [-w / 2, 0, th, dp], [w / 2, 0, th, dp]]) {
        const seg = Shapes.box(sw, 0.62, sd, 'mud');
        seg.position.set(ox, 0.18, oz);
        g.add(seg);
      }
      Shapes.niches(g, w, 0.62, dp, 7, 0.18);

      const spots = [[-0.26, -0.26], [0.26, -0.26], [-0.26, 0.22], [0.26, 0.22]];
      for (let i = 0; i < spots.length; i++) {
        const [fx, fz] = spots[i];
        const r = 0.30 + (i % 2) * 0.04;
        const base = Shapes.cyl(r, 0.44, 'mudPale', 12, 0.94);
        base.position.set(fx * w, 0.18, fz * dp);
        g.add(base);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(r * 0.98, 12, 6, 0, 6.3, 0, Math.PI / 2), Shapes.m('mudPale'));
        dome.scale.y = 1.25;
        dome.position.set(fx * w, 0.62, fz * dp);
        g.add(dome);

        const hatch = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.04), Shapes.m('trim'));
        hatch.position.set(fx * w, 0.78, fz * dp + r * 0.9);
        g.add(hatch);
      }

      const sh = Shapes.box(0.5, 0.34, 0.42, 'mud');
      sh.position.set(0, 0.18, dp * 0.30);
      g.add(sh);
      const shRoof = Shapes.gable(0.56, 0.16, 0.48, 'thatch', 0.06);
      shRoof.position.set(0, 0.52, dp * 0.30);
      g.add(shRoof);
      return g;
    },

    nomarchEstate(d) {
      const g = new THREE.Group();
      const w = d.w * 0.86, dp = d.h * 0.86;
      g.add(Shapes.box(w, 0.16, dp, 'stone'));
      const body = Shapes.box(w * 0.9, 0.78, dp * 0.9, 'plaster');
      body.position.y = 0.16;
      g.add(body);

      const cor = Shapes.box(w * 0.98, 0.12, dp * 0.98, 'mudPale');
      cor.position.y = 0.94;
      g.add(cor);
      for (const sx of [-1, 1]) {
        const col = Shapes.cyl(0.09, 0.78, 'stone', 8);
        col.position.set(sx * w * 0.3, 0.16, dp * 0.42);
        g.add(col);
      }
      const upper = Shapes.box(w * 0.5, 0.34, dp * 0.5, 'plaster');
      upper.position.y = 1.06;
      g.add(upper);
      Shapes.door(g, 0.3, 0.42, dp * 0.44);
      return g;
    },

    egyptHouse(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.82;
      const body = Shapes.box(w, 0.78, dp, 'plaster');
      g.add(body);
      const par = Shapes.box(w * 1.06, 0.08, dp * 1.06, 'mudPale');
      par.position.y = 0.78;
      g.add(par);

      for (const px of [-1, 1]) for (const pz of [-1, 1]) {
        const post = Shapes.cyl(0.02, 0.26, 'timber', 4);
        post.position.set(px * w * 0.32, 0.86, pz * dp * 0.32);
        g.add(post);
      }
      const canopy = Shapes.box(w * 0.8, 0.04, dp * 0.8, 'thatch');
      canopy.position.y = 1.12;
      g.add(canopy);
      Shapes.door(g, 0.2, 0.36, dp * 0.5 + 0.01);
      return g;
    },

    granaryEgypt(d) {
      const g = new THREE.Group();
      g.add(Shapes.box(d.w * 0.9, 0.12, d.h * 0.9, 'stoneDark'));
      for (const [fx, fz] of [[-0.24, -0.24], [0.24, -0.24], [-0.24, 0.24], [0.24, 0.24]]) {
        const silo = Shapes.cyl(0.26, 0.6, 'plaster', 12, 0.86);
        silo.position.set(fx * d.w, 0.12, fz * d.h);
        g.add(silo);
        const cap = Shapes.cone(0.2, 0.16, 'thatch', 10);
        cap.position.set(fx * d.w, 0.72, fz * d.h);
        g.add(cap);
      }
      return g;
    },

    councilHouse(d) {
      const g = new THREE.Group();
      const w = d.w * 0.88, dp = d.h * 0.88;
      for (let i = 0; i < 2; i++) {
        const step = Shapes.box(w * (1 - i * 0.1), 0.2, dp * (1 - i * 0.1), 'stone');
        step.position.y = i * 0.2;
        g.add(step);
      }
      const body = Shapes.box(w * 0.72, 0.5, dp * 0.72, 'stone');
      body.position.y = 0.4;
      g.add(body);
      const roof = Shapes.gable(w * 0.8, 0.46, dp * 0.8, 'thatch', 0.14);
      roof.position.y = 0.9;
      g.add(roof);

      const comb = Shapes.box(w * 0.5, 0.3, 0.06, 'stone');
      comb.position.y = 1.36;
      g.add(comb);
      return g;
    },

    mayaHouse(d) {
      const g = new THREE.Group();

      const w = d.w * 0.70, dp = d.h * 0.68;
      g.add(Shapes.box(w * 1.1, 0.14, dp * 1.1, 'stone'));
      const body = Shapes.box(w, 0.44, dp, 'plaster');
      body.position.y = 0.14;
      g.add(body);
      const roof = Shapes.gable(w, 0.55, dp, 'thatch', 0.11);
      roof.position.y = 0.58;
      g.add(roof);
      return g;
    },

    coalPlant(d) {
      const g = new THREE.Group();
      const w = d.w * 0.8, dp = d.h * 0.8;
      const hall = Shapes.box(w, 0.7, dp, 'stoneDark');
      g.add(hall);
      const roof = Shapes.gable(w, 0.26, dp, 'trim', 0.08);
      roof.position.y = 0.7;
      g.add(roof);
      const stack = Shapes.cyl(0.14, 1.5, 'mud', 10, 0.82);
      stack.position.set(w * 0.3, 0.7, -dp * 0.28);
      g.add(stack);
      const band = Shapes.cyl(0.155, 0.1, 'trim', 10);
      band.position.set(w * 0.3, 2.05, -dp * 0.28);
      g.add(band);
      return g;
    },

    longHearth(d) {
      const g = new THREE.Group();

      const HW = 1.10, HD = 1.15;

      const trench = Shapes.box(0.30, 0.04, HD * 1.7, 'charcoal');
      trench.position.set(0, 0.02, 0.05);
      g.add(trench);
      const coals = Shapes.box(0.20, 0.05, HD * 1.5, 'emberDim');
      coals.position.set(0, 0.05, 0.05);
      g.add(coals);

      const fh = [0.30, 0.46, 0.26];
      for (let i = 0; i < 3; i++) {
        const fl = Shapes.cone(0.13, fh[i], 'ember', 6);
        fl.position.set(0, 0.07, (i - 1) * 0.60 + 0.05);
        g.add(fl);
      }

      const WALL = 0.52, R = 0.72;
      for (const sx of [-1, 1]) {
        const wall = Shapes.box(0.10, WALL, 1.30, 'hideDark');
        wall.position.set(sx * R, 0, -0.42);
        g.add(wall);
      }
      const roof = new THREE.Mesh(
        new THREE.CylinderGeometry(R, R, 1.90, 9, 1, false, 0, Math.PI),
        Shapes.m('hide'));
      roof.rotation.z = Math.PI / 2;
      roof.rotation.y = Math.PI / 2;
      roof.position.set(0, WALL, -0.42);
      g.add(roof);

      for (let i = -2; i <= 2; i++) {
        const rib = new THREE.Mesh(
          new THREE.TorusGeometry(R + 0.025, 0.026, 4, 9, Math.PI),
          Shapes.m('boneDim'));
        rib.rotation.y = Math.PI / 2;
        rib.position.set(i * 0.42, WALL, -0.42);
        g.add(rib);
      }

      for (const sx of [-1, 1]) {
        const base = Shapes.cyl(0.055, 0.74, 'bone', 6);
        base.position.set(sx * 0.80, 0, 0.62);
        base.rotation.z = sx * -0.20;
        g.add(base);
        const curve = new THREE.Mesh(
          new THREE.TorusGeometry(0.30, 0.045, 4, 8, Math.PI * 0.8),
          Shapes.m('bone'));
        curve.position.set(sx * 0.62, 0.72, 0.62);
        curve.rotation.set(Math.PI / 2, 0, sx > 0 ? 0.35 : Math.PI - 0.35);
        g.add(curve);
      }

      for (const sx of [-1, 1]) {
        const bench = Shapes.box(0.34, 0.11, 1.10, 'fur');
        bench.position.set(sx * 0.44, 0, -0.42);
        g.add(bench);
      }

      const post = Shapes.cyl(0.05, 0.46, 'timberCold', 5);
      post.position.set(0.92, 0, 0.98);
      g.add(post);
      const blade = Shapes.box(0.05, 0.34, 0.26, 'bone');
      blade.position.set(0.92, 0.42, 0.98);
      g.add(blade);
      for (let i = 0; i < 4; i++) {
        const notch = Shapes.box(0.062, 0.022, 0.20, 'charcoal');
        notch.position.set(0.92, 0.50 + i * 0.07, 0.98);
        g.add(notch);
      }

      const mark = Shapes.box(0.34, 0.10, 0.04, 'ochreRaw');
      mark.position.set(-0.24, WALL + R * 0.55, 0.50);
      g.add(mark);
      return g;
    },

    forageGround(d) {
      const g = new THREE.Group();
      const w = d.w * 0.9, dp = d.h * 0.9;

      for (let i = 0; i < 3; i++) {
        const h = Util.hash2(i * 5 + 1, i);
        const patch = new THREE.Mesh(new THREE.CircleGeometry(0.20 + h * 0.10, 9), Shapes.m('timberCold'));
        patch.rotation.x = -Math.PI / 2;
        patch.position.set((h - 0.5) * w * 0.8, 0.02, (Util.hash2(i, i * 3) - 0.5) * dp * 0.8);
        g.add(patch);
      }

      for (const sx of [-1, 1]) {
        const mat = Shapes.box(w * 0.34, 0.05, dp * 0.30, 'hidePale');
        mat.position.set(sx * w * 0.26, 0.03, -dp * 0.22);
        g.add(mat);
        for (let i = 0; i < 5; i++) {
          const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.035, 0), Shapes.m('ochreRaw'));
          b.position.set(sx * w * 0.26 + (Util.hash2(i, i + 2) - 0.5) * w * 0.28,
                         0.09, -dp * 0.22 + (Util.hash2(i + 4, i) - 0.5) * dp * 0.24);
          g.add(b);
        }
      }

      for (const sx of [-1, 1]) {
        const basket = Shapes.cyl(0.14, 0.20, 'boneDim', 8);
        basket.position.set(sx * w * 0.30, 0, dp * 0.28);
        g.add(basket);
        const rim = Shapes.cyl(0.155, 0.035, 'hideDark', 8);
        rim.position.set(sx * w * 0.30, 0.19, dp * 0.28);
        g.add(rim);
      }

      for (const [ox, rot] of [[-0.05, 0.28], [0.06, -0.22]]) {
        const stick = Shapes.cyl(0.032, 0.62, 'timberCold', 5);
        stick.position.set(ox, 0, dp * 0.05);
        stick.rotation.z = rot;
        g.add(stick);
      }

      const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), Shapes.m('spruce'));
      bush.scale.set(1.2, 0.6, 1.2);
      bush.position.set(w * 0.02, 0.10, -dp * 0.42);
      g.add(bush);
      return g;
    },

    tendedGround(d) {

      const g = Shapes.RECIPES.forageGround(d);
      const w = d.w * 0.9, dp = d.h * 0.9;
      for (const sx of [-1, 1]) {
        const bed = Shapes.box(w * 0.36, 0.06, dp * 0.22, 'timberCold');
        bed.position.set(sx * w * 0.24, 0.03, dp * 0.06);
        g.add(bed);

        for (let i = 0; i < 4; i++) {
          const stake = Shapes.cyl(0.022, 0.20 + (i % 2) * 0.06, 'spruce', 4);
          stake.position.set(sx * w * 0.24 + (i - 1.5) * 0.10, 0.02, dp * 0.18);
          g.add(stake);
        }
      }

      const burn = new THREE.Mesh(new THREE.CircleGeometry(w * 0.22, 10), Shapes.m('charcoal'));
      burn.rotation.x = -Math.PI / 2;
      burn.position.set(-w * 0.02, 0.015, -dp * 0.26);
      g.add(burn);
      return g;
    },

    smokeLodge(d) {

      const g = Shapes.RECIPES.dryingRack(d);
      const w = d.w * 0.9, dp = d.h * 0.9;
      const roof = new THREE.Mesh(
        new THREE.CylinderGeometry(dp * 0.42, dp * 0.42, w * 0.86, 8, 1, false, 0, Math.PI),
        Shapes.m('hideDark'));
      roof.rotation.z = Math.PI / 2;
      roof.rotation.y = Math.PI / 2;
      roof.position.set(0, 0.44, 0);
      g.add(roof);

      const collar = Shapes.cyl(0.10, 0.10, 'timberCold', 7);
      collar.position.set(0, dp * 0.42 + 0.42, 0);
      g.add(collar);
      for (let i = 0; i < 3; i++) {
        const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.09 + i * 0.03, 0), Shapes.m('snow'));
        puff.position.set((i - 1) * 0.07, dp * 0.42 + 0.56 + i * 0.13, (i % 2 ? 0.05 : -0.04));
        g.add(puff);
      }
      return g;
    },

    pressureFloor(d) {

      const g = Shapes.RECIPES.knappingFloor(d);
      const w = d.w * 0.9, dp = d.h * 0.9;
      const bench = Shapes.box(w * 0.44, 0.14, dp * 0.20, 'timberCold');
      bench.position.set(-w * 0.16, 0, dp * 0.26);
      g.add(bench);

      const block = Shapes.box(0.22, 0.10, 0.16, 'hideDark');
      block.position.set(w * 0.30, 0, dp * 0.24);
      g.add(block);
      for (let i = 0; i < 4; i++) {
        const tine = Shapes.cyl(0.020, 0.26 + (i % 2) * 0.07, 'bone', 5);
        tine.position.set(w * 0.30 + (i - 1.5) * 0.055, 0.10, dp * 0.24);
        tine.rotation.z = (i - 1.5) * 0.09;
        g.add(tine);
      }

      for (let i = 0; i < 5; i++) {
        const blade = Shapes.box(0.028, 0.012, 0.15, 'flint');
        blade.position.set(-w * 0.16 + (i - 2) * 0.06, 0.15, dp * 0.26);
        g.add(blade);
      }
      return g;
    },

    deepCache(d) {

      const g = Shapes.RECIPES.frozenCache(d);
      const collar = Shapes.cyl(0.30, 0.16, 'rockDark', 9);
      collar.position.y = 0.02;
      g.add(collar);
      const lid = Shapes.cyl(0.34, 0.07, 'rockCold', 9);
      lid.position.y = 0.18;
      g.add(lid);
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * Math.PI * 2;
        const turf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.10, 0), Shapes.m('spruce'));
        turf.scale.set(1.2, 0.5, 1.2);
        turf.position.set(Math.cos(a) * 0.34, 0.04, Math.sin(a) * 0.34);
        g.add(turf);
      }
      return g;
    },

    tradeRing(d) {

      const g = Shapes.RECIPES.tradePost(d);
      const w = d.w * 0.9, dp = d.h * 0.9;

      for (let i = 0; i < 4; i++) {
        const stone = Shapes.rock(i * 5 + 2, 0.15 - i * 0.024, 0.75);
        stone.position.set(w * 0.30, i * 0.16, -dp * 0.30);
        g.add(stone);
      }

      const roles = ['ochreRaw', 'bone', 'flint', 'hide', 'boneDim'];
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * Math.PI * 2 + 0.4;
        const mat = new THREE.Mesh(new THREE.CircleGeometry(0.11, 8), Shapes.m('hidePale'));
        mat.rotation.x = -Math.PI / 2;
        mat.position.set(Math.cos(a) * w * 0.30, 0.02, Math.sin(a) * dp * 0.22);
        g.add(mat);
        const pile = new THREE.Mesh(new THREE.IcosahedronGeometry(0.06, 0), Shapes.m(roles[i]));
        pile.position.set(Math.cos(a) * w * 0.30, 0.06, Math.sin(a) * dp * 0.22);
        g.add(pile);
      }
      return g;
    },

    glacialHearth(d) {
      const g = new THREE.Group();
      const ring = 0.52;
      for (let i = 0; i < 11; i++) {
        const a = i / 11 * Math.PI * 2;
        const r = Shapes.rock(i * 7 + 3, 0.13, 0.7);
        r.position.set(Math.cos(a) * ring, 0, Math.sin(a) * ring);
        g.add(r);
      }
      const bed = Shapes.cyl(ring * 0.82, 0.05, 'charcoal', 11);
      g.add(bed);
      const coals = Shapes.cyl(ring * 0.6, 0.07, 'emberDim', 11);
      coals.position.y = 0.05;
      g.add(coals);

      for (const rot of [0.6, -0.75]) {
        const log = Shapes.barX(0.055, 0.78, 'timberCold', 6);
        log.rotation.y = rot;
        log.position.set(0, 0.14, 0);
        g.add(log);
      }
      const flame = Shapes.cone(0.2, 0.46, 'ember', 6);
      flame.position.y = 0.18;
      g.add(flame);
      const tip = Shapes.cone(0.1, 0.22, 'ember', 5);
      tip.position.y = 0.56;
      g.add(tip);

      for (const sx of [-1, 1]) {
        const p = Shapes.cyl(0.035, 0.82, 'timberCold', 5);
        p.position.set(sx * 0.62, 0, -0.66); p.rotation.x = -0.16;
        g.add(p);
      }
      const screen = Shapes.box(1.3, 0.6, 0.05, 'hide');
      screen.position.set(0, 0.16, -0.7); screen.rotation.x = -0.16;
      g.add(screen);
      return g;
    },

    longFire(d) {
      const g = new THREE.Group();
      const L = d.h * 0.82;
      const trench = Shapes.box(0.42, 0.06, L, 'charcoal');
      g.add(trench);
      for (const kz of [-0.3, 0, 0.3]) {
        const coals = Shapes.box(0.3, 0.07, L * 0.26, 'emberDim');
        coals.position.set(0, 0.06, kz * L);
        g.add(coals);
        const f = Shapes.cone(0.15, 0.38, 'ember', 6);
        f.position.set(0, 0.1, kz * L);
        g.add(f);
      }

      for (const sx of [-1, 1])
        for (let i = 0; i < 5; i++) {
          const r = Shapes.rock(i * 5 + (sx > 0 ? 40 : 0), 0.1, 0.7);
          r.position.set(sx * 0.3, 0, (i / 4 - 0.5) * L);
          g.add(r);
        }

      for (const kz of [-0.32, 0.32]) {
        for (let i = 0; i < 3; i++) {
          const a = i / 3 * Math.PI * 2;
          const leg = Shapes.cyl(0.025, 0.5, 'timberCold', 4);
          leg.position.set(0.5 + Math.cos(a) * 0.1, 0, kz * L + Math.sin(a) * 0.1);
          leg.rotation.x = Math.sin(a) * 0.2; leg.rotation.z = -Math.cos(a) * 0.2;
          g.add(leg);
        }
        const pot = Shapes.cyl(0.13, 0.16, 'rockDark', 8, 0.8);
        pot.position.set(0.5, 0.44, kz * L);
        g.add(pot);
        const melt = new THREE.Mesh(new THREE.CircleGeometry(0.1, 8), Shapes.m('ice'));
        melt.rotation.x = -Math.PI / 2; melt.position.set(0.5, 0.605, kz * L);
        g.add(melt);
      }
      return g;
    },

    meltPit(d) {
      const g = new THREE.Group();
      const kerb = Shapes.cyl(0.28, 0.2, 'rockCold', 9);
      g.add(kerb);
      const water = new THREE.Mesh(new THREE.CircleGeometry(0.2, 9), Shapes.m('ice'));
      water.rotation.x = -Math.PI / 2; water.position.y = 0.185;
      g.add(water);
      const fire = Shapes.cone(0.075, 0.17, 'ember', 5);
      fire.position.set(0.24, 0.02, 0.2);
      g.add(fire);
      const ash = Shapes.cyl(0.1, 0.03, 'charcoal', 7);
      ash.position.set(0.24, 0, 0.2);
      g.add(ash);

      const bed = Shapes.box(0.26, 0.04, 0.16, 'timberCold');
      bed.position.set(-0.28, 0.06, -0.22);
      g.add(bed);
      for (const sz of [-1, 1]) {
        const run = Shapes.box(0.3, 0.05, 0.03, 'hideDark');
        run.position.set(-0.28, 0, -0.22 + sz * 0.06);
        g.add(run);
      }
      return g;
    },

    frozenCache(d) {
      const g = new THREE.Group();
      const collar = Shapes.cyl(0.3, 0.12, 'rockDark', 8);
      g.add(collar);
      const lid = Shapes.box(0.46, 0.07, 0.4, 'rockCold');
      lid.position.y = 0.12; lid.rotation.y = 0.2;
      g.add(lid);
      const cap = Shapes.box(0.18, 0.05, 0.16, 'snow');
      cap.position.y = 0.19; cap.rotation.y = 0.2;
      g.add(cap);
      for (const [x, z] of [[-0.3, 0.26], [0.32, -0.2]]) {
        const r = Shapes.rock(x * 40 + 9, 0.09, 0.6);
        r.position.set(x, 0, z);
        g.add(r);
      }
      return g;
    },

    permafrostStore(d) {
      const g = new THREE.Group();
      const w = d.w * 0.8, dp = d.h * 0.8;
      const cut = Shapes.box(w, 0.16, dp, 'rockDark');
      g.add(cut);
      const roof = Shapes.gable(w, 0.38, dp * 0.78, 'timberCold', 0.06);
      roof.position.y = 0.16;
      g.add(roof);
      const snowcap = Shapes.gable(w * 0.9, 0.12, dp * 0.7, 'snow', 0.02);
      snowcap.position.y = 0.44;
      g.add(snowcap);

      for (let i = 0; i < 3; i++) {
        const b = Shapes.box(0.17, 0.13, 0.3, i % 2 ? 'hide' : 'hideDark');
        b.position.set((i - 1) * 0.2, 0.16, dp * 0.42);
        g.add(b);
      }
      const stair = Shapes.box(w * 0.3, 0.05, 0.16, 'rockCold');
      stair.position.set(0, 0.1, dp * 0.5 - 0.02);
      g.add(stair);
      return g;
    },

    sledDogPost(d) {
      const g = new THREE.Group();
      for (const sx of [-1, 1]) {
        const p = Shapes.cyl(0.03, 0.4, 'timberCold', 5);
        p.position.set(sx * 0.34, 0, -0.2);
        g.add(p);
      }
      const rope = Shapes.box(0.68, 0.02, 0.02, 'hideDark');
      rope.position.set(0, 0.38, -0.2);
      g.add(rope);

      for (let i = 0; i < 3; i++) {
        const x = (i - 1) * 0.24;
        const body = Shapes.box(0.15, 0.1, 0.09, 'fur');
        body.position.set(x, 0.05, -0.06);
        g.add(body);
        const head = Shapes.box(0.07, 0.07, 0.07, 'fur');
        head.position.set(x + 0.08, 0.11, -0.06);
        g.add(head);
      }
      const bed = Shapes.box(0.34, 0.04, 0.16, 'timberCold');
      bed.position.set(0, 0.05, 0.28);
      g.add(bed);
      for (const sz of [-1, 1]) {
        const run = Shapes.box(0.4, 0.05, 0.03, 'hideDark');
        run.position.set(0, 0, 0.28 + sz * 0.06);
        g.add(run);
      }
      return g;
    },

    deadwoodCutter(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const floor = Shapes.box(w, 0.04, dp, 'charcoal');
      g.add(floor);
      for (const [x, z, h] of [[-0.3, -0.28, 0.2], [0.26, -0.3, 0.14], [0.3, 0.3, 0.24]]) {
        const st = Shapes.cyl(0.1, h, 'timberCold', 7);
        st.position.set(x, 0.04, z);
        g.add(st);
        const top = Shapes.cyl(0.1, 0.02, 'hidePale', 7);
        top.position.set(x, 0.04 + h, z);
        g.add(top);
      }

      for (let r = 0; r < 2; r++)
        for (let i = 0; i < 4; i++) {
          const lg = Shapes.barX(0.055, 0.5, 'timberCold', 6);
          lg.position.set(-0.34, 0.06 + r * 0.11, 0.1 + i * 0.12 - 0.18);
          g.add(lg);
        }
      const block = Shapes.cyl(0.11, 0.16, 'timberCold', 8);
      block.position.set(0.02, 0.04, -0.02);
      g.add(block);
      const axe = Shapes.box(0.03, 0.2, 0.05, 'flint');
      axe.position.set(0.02, 0.18, -0.02); axe.rotation.x = 0.5;
      g.add(axe);
      return g;
    },

    reindeerDrive(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const track = Shapes.box(w * 0.5, 0.03, dp, 'snow');
      g.add(track);
      for (const sx of [-1, 1])
        for (let i = 0; i < 4; i++) {
          const t = i / 3;
          const x = sx * (0.12 + t * 0.36), z = (t - 0.5) * dp;
          const c = Shapes.cone(0.1 - t * 0.02, 0.24 + t * 0.1, 'rockCold', 6);
          c.position.set(x, 0, z);
          g.add(c);
          const cap = Shapes.cone(0.05, 0.07, 'snow', 6);
          cap.position.set(x, 0.24 + t * 0.1, z);
          g.add(cap);
        }

      const pole = Shapes.cyl(0.03, 0.44, 'timberCold', 5);
      pole.position.set(0, 0, -dp * 0.44);
      g.add(pole);
      for (const sx of [-1, 1]) {
        const ant = Shapes.box(0.02, 0.16, 0.02, 'boneDim');
        ant.position.set(sx * 0.06, 0.36, -dp * 0.44); ant.rotation.z = sx * 0.5;
        g.add(ant);
      }
      return g;
    },

    iceWeir(d) {
      const g = new THREE.Group();
      const L = d.h * 0.86;
      const cut = Shapes.box(0.3, 0.03, L, 'ice');
      g.add(cut);
      const open = new THREE.Mesh(new THREE.PlaneGeometry(0.16, L * 0.8), Shapes.m('rockDark'));
      open.rotation.x = -Math.PI / 2; open.position.y = 0.035;
      g.add(open);
      for (let i = 0; i < 7; i++) {
        const z = (i / 6 - 0.5) * L;
        for (const sx of [-1, 1]) {
          const st = Shapes.cyl(0.022, 0.3 + (i % 2) * 0.06, 'timberCold', 4);
          st.position.set(sx * 0.13, 0, z);
          g.add(st);
        }
        if (i < 6) {
          const net = Shapes.box(0.005, 0.16, L / 6 * 0.9, 'hideDark');
          net.position.set(-0.13, 0.1, z + L / 12);
          g.add(net);
        }
      }
      const basket = Shapes.cyl(0.11, 0.14, 'hideDark', 7, 0.7);
      basket.position.set(0, 0.03, L * 0.42);
      g.add(basket);
      const fish = Shapes.box(0.13, 0.04, 0.05, 'hidePale');
      fish.position.set(0, 0.17, L * 0.42);
      g.add(fish);
      return g;
    },

    flintQuarry(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const pad = Shapes.box(w, 0.04, dp, 'rockDark');
      g.add(pad);
      for (let i = 0; i < 3; i++) {
        const b = Shapes.box(w - i * 0.22, 0.12, dp * 0.5 - i * 0.1, 'rockCold');
        b.position.set(0, 0.04 + i * 0.12, -dp * 0.2 - i * 0.04);
        g.add(b);
      }
      for (let i = 0; i < 5; i++) {
        const n = Shapes.rock(i * 11 + 2, 0.07, 0.8);
        n.position.set((i % 3 - 1) * 0.24, 0.04, dp * 0.26 + (i % 2) * 0.1);
        g.add(n);
      }
      const heap = Shapes.cone(0.2, 0.2, 'flint', 6);
      heap.position.set(w * 0.3, 0.04, dp * 0.26);
      g.add(heap);
      return g;
    },

    boneYard(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const bed = Shapes.box(w, 0.04, dp, 'snow');
      g.add(bed);

      for (let i = 0; i < 5; i++) {
        const z = (i / 4 - 0.5) * dp * 0.7;
        const s = 1 - Math.abs(i - 2) * 0.12;
        for (const sx of [-1, 1]) {
          const rib = Shapes.cyl(0.022, 0.44 * s, 'bone', 5);
          rib.position.set(sx * 0.2, 0.04, z);
          rib.rotation.z = sx * 0.55;
          g.add(rib);
          const tipr = Shapes.cyl(0.018, 0.18 * s, 'bone', 5);
          tipr.position.set(sx * (0.2 - 0.22 * s), 0.04 + 0.38 * s, z);
          tipr.rotation.z = sx * 1.1;
          g.add(tipr);
        }
      }

      const skull = Shapes.box(0.28, 0.22, 0.26, 'boneDim');
      skull.position.set(0, 0.04, -dp * 0.4);
      g.add(skull);
      for (const sx of [-1, 1]) {
        const tusk = Shapes.cyl(0.03, 0.36, 'bone', 5, 0.5);
        tusk.position.set(sx * 0.1, 0.1, -dp * 0.44);
        tusk.rotation.x = 1.25; tusk.rotation.z = sx * 0.3;
        g.add(tusk);
      }
      return g;
    },

    ochreBank(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const pad = Shapes.box(w, 0.05, dp, 'ochreRaw');
      g.add(pad);
      for (let i = 0; i < 3; i++) {
        const face = Shapes.box(w - i * 0.16, 0.14, 0.2, 'ochreRaw');
        face.position.set(0, 0.05 + i * 0.13, -dp * 0.3 + i * 0.07);
        g.add(face);
      }
      const overburden = Shapes.box(w * 0.9, 0.06, 0.24, 'snow');
      overburden.position.set(0, 0.44, -dp * 0.2);
      g.add(overburden);
      for (let i = 0; i < 3; i++) {
        const bskt = Shapes.cyl(0.1, 0.13, 'hideDark', 7, 0.72);
        bskt.position.set((i - 1) * 0.26, 0.05, dp * 0.3);
        g.add(bskt);
        const heap = Shapes.cone(0.085, 0.08, 'ochreRaw', 7);
        heap.position.set((i - 1) * 0.26, 0.17, dp * 0.3);
        g.add(heap);
      }
      return g;
    },

    charcoalClamp(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const ring = Shapes.cyl(0.52, 0.06, 'charcoal', 12);
      g.add(ring);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.46, 12, 7, 0, Math.PI * 2, 0, Math.PI / 2),
                                  Shapes.m('hideDark'));
      dome.position.y = 0.06; dome.scale.y = 0.78;
      g.add(dome);
      const vent = Shapes.cyl(0.06, 0.12, 'charcoal', 6);
      vent.position.y = 0.06 + 0.46 * 0.78 - 0.02;
      g.add(vent);
      const smoke = Shapes.cone(0.09, 0.22, 'snow', 6);
      smoke.position.y = 0.06 + 0.46 * 0.78 + 0.08;
      g.add(smoke);

      for (let i = 0; i < 3; i++) {
        const sack = Shapes.box(0.15, 0.13, 0.13, 'charcoal');
        sack.position.set((i - 1) * 0.2, 0, dp * 0.44);
        g.add(sack);
      }
      const spade = Shapes.cyl(0.02, 0.34, 'timberCold', 4);
      spade.position.set(-w * 0.44, 0, -dp * 0.2); spade.rotation.z = 0.3;
      g.add(spade);
      return g;
    },

    dryingRack(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      for (const sz of [-1, 1])
        for (const sx of [-1, 1]) {
          const p = Shapes.cyl(0.03, 0.68, 'timberCold', 5);
          p.position.set(sx * w * 0.42, 0, sz * dp * 0.3);
          g.add(p);
        }
      for (const sz of [-1, 1]) {
        const bar = Shapes.barX(0.025, w * 0.9, 'timberCold', 5);
        bar.position.set(0, 0.66, sz * dp * 0.3);
        g.add(bar);
        for (let i = 0; i < 5; i++) {
          const strip = Shapes.box(0.055, 0.3 - (i % 2) * 0.06, 0.02, 'ochreRaw');
          strip.position.set((i / 4 - 0.5) * w * 0.78, 0.32 + (i % 2) * 0.06, sz * dp * 0.3);
          g.add(strip);
        }
      }
      const fire = Shapes.cyl(0.14, 0.05, 'emberDim', 8);
      g.add(fire);
      const sm = Shapes.cone(0.1, 0.24, 'snow', 6);
      sm.position.y = 0.05;
      g.add(sm);
      return g;
    },

    hideFrames(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const floor = Shapes.box(w, 0.03, dp, 'hideDark');
      g.add(floor);
      for (let i = 0; i < 3; i++) {
        const x = (i - 1) * w * 0.34, lean = (i - 1) * 0.06;
        for (const sz of [-1, 1]) {
          const p = Shapes.cyl(0.026, 0.72, 'timberCold', 4);
          p.position.set(x + sz * 0.16, 0.03, 0); p.rotation.x = lean;
          g.add(p);
        }
        const top = Shapes.barX(0.022, 0.34, 'timberCold', 4);
        top.position.set(x, 0.72, -lean * 0.6);
        g.add(top);
        const skin = Shapes.box(0.28, 0.5, 0.02, i === 1 ? 'hidePale' : 'hide');
        skin.position.set(x, 0.16, -lean * 0.3); skin.rotation.x = lean;
        g.add(skin);
      }
      const scraper = Shapes.box(0.14, 0.03, 0.1, 'flint');
      scraper.position.set(w * 0.34, 0.03, dp * 0.38);
      g.add(scraper);
      return g;
    },

    knappingFloor(d) {
      const g = new THREE.Group();
      const w = d.w * 0.82, dp = d.h * 0.82;
      const floor = Shapes.box(w, 0.05, dp, 'rockDark');
      g.add(floor);
      for (const [x, z] of [[-0.26, -0.2], [0.26, -0.18], [0, 0.26]]) {
        const anvil = Shapes.rock(x * 60 + z * 13 + 5, 0.16, 0.55);
        anvil.position.set(x, 0.05, z);
        g.add(anvil);
        const core = Shapes.rock(x * 31 + 17, 0.07, 0.9);
        core.position.set(x + 0.1, 0.16, z + 0.06);
        g.add(core);
      }
      for (let i = 0; i < 9; i++) {
        const f = Shapes.box(0.05, 0.012, 0.035, 'flint');
        f.position.set(((i * 7) % 9 / 8 - 0.5) * w * 0.9, 0.05, ((i * 5) % 7 / 6 - 0.5) * dp * 0.9);
        f.rotation.y = i * 0.7;
        g.add(f);
      }
      const rack = Shapes.box(0.36, 0.04, 0.1, 'timberCold');
      rack.position.set(0, 0.26, -dp * 0.4);
      g.add(rack);
      for (const sx of [-1, 1]) {
        const leg = Shapes.cyl(0.02, 0.26, 'timberCold', 4);
        leg.position.set(sx * 0.15, 0.05, -dp * 0.4);
        g.add(leg);
      }
      for (let i = 0; i < 3; i++) {
        const bl = Shapes.box(0.03, 0.11, 0.02, 'flint');
        bl.position.set((i - 1) * 0.11, 0.3, -dp * 0.4);
        g.add(bl);
      }
      return g;
    },

    meatStall(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const counter = Shapes.box(w * 0.9, 0.3, 0.24, 'timberCold');
      counter.position.set(0, 0, dp * 0.26);
      g.add(counter);
      for (const sx of [-1, 1]) {
        const p = Shapes.cyl(0.03, 0.76, 'timberCold', 5);
        p.position.set(sx * w * 0.42, 0, dp * 0.3);
        g.add(p);
        const b = Shapes.cyl(0.03, 0.62, 'timberCold', 5);
        b.position.set(sx * w * 0.42, 0, -dp * 0.34);
        g.add(b);
      }
      const awn = Shapes.box(w * 0.94, 0.03, dp * 0.72, 'hide');
      awn.position.set(0, 0.68, -0.02); awn.rotation.x = 0.18;
      g.add(awn);
      const bar = Shapes.barX(0.02, w * 0.8, 'timberCold', 4);
      bar.position.set(0, 0.58, -dp * 0.34);
      g.add(bar);
      for (let i = 0; i < 4; i++) {
        const cut = Shapes.box(0.09, 0.24, 0.06, 'ochreRaw');
        cut.position.set((i / 3 - 0.5) * w * 0.66, 0.32, -dp * 0.34);
        g.add(cut);
      }
      return g;
    },

    fuelStack(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const pad = Shapes.box(w, 0.04, dp, 'charcoal');
      g.add(pad);

      for (const sx of [-1, 1])
        for (let r = 0; r < 4; r++)
          for (let i = 0; i < 3; i++) {
            const lg = Shapes.barX(0.06, 0.42, 'timberCold', 6);
            lg.position.set(sx * 0.34, 0.1 + r * 0.13, -dp * 0.22 + i * 0.14);
            g.add(lg);
          }
      for (let i = 0; i < 4; i++) {
        const sack = Shapes.box(0.16, 0.14, 0.14, 'charcoal');
        sack.position.set((i % 2 - 0.5) * 0.36, (i > 1 ? 0.14 : 0) + 0.04, dp * 0.36);
        g.add(sack);
      }
      const roof = Shapes.box(w * 0.7, 0.03, dp * 0.5, 'hideDark');
      roof.position.set(0, 0.64, -dp * 0.08);
      g.add(roof);
      return g;
    },

    bladeTrader(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const counter = Shapes.box(w * 0.86, 0.32, 0.2, 'rockCold');
      counter.position.set(0, 0, dp * 0.28);
      g.add(counter);
      const board = Shapes.box(w * 0.8, 0.5, 0.04, 'timberCold');
      board.position.set(0, 0.06, -dp * 0.34);
      g.add(board);
      for (let i = 0; i < 6; i++) {
        const bl = Shapes.cone(0.032, 0.2 + (i % 3) * 0.04, 'flint', 4);
        bl.position.set((i / 5 - 0.5) * w * 0.66, 0.16, -dp * 0.34 + 0.03);
        bl.rotation.x = Math.PI;
        bl.position.y = 0.5;
        g.add(bl);
      }
      for (const sx of [-1, 1]) {
        const p = Shapes.cyl(0.028, 0.62, 'timberCold', 5);
        p.position.set(sx * w * 0.4, 0, -dp * 0.34);
        g.add(p);
      }
      const spear = Shapes.cyl(0.02, 0.8, 'timberCold', 4);
      spear.position.set(w * 0.42, 0, dp * 0.3); spear.rotation.z = -0.12;
      g.add(spear);
      return g;
    },

    carverLodge(d) {
      const g = new THREE.Group();
      const w = d.w * 0.72, dp = d.h * 0.72;
      const body = Shapes.box(w, 0.42, dp * 0.8, 'hide');
      g.add(body);
      const roof = Shapes.gable(w * 1.05, 0.3, dp * 0.86, 'hideDark', 0.05);
      roof.position.y = 0.42;
      g.add(roof);

      const bench = Shapes.box(w * 0.8, 0.04, 0.14, 'timberCold');
      bench.position.set(0, 0.3, dp * 0.44);
      g.add(bench);
      for (let i = 0; i < 4; i++) {
        const pc = Shapes.cyl(0.028, 0.13 + (i % 2) * 0.05, 'bone', 6, 0.6);
        pc.position.set((i / 3 - 0.5) * w * 0.6, 0.34, dp * 0.44);
        g.add(pc);
      }

      const sign = Shapes.barX(0.028, 0.34, 'bone', 6);
      sign.position.set(0, 0.56, dp * 0.4);
      sign.rotation.x = 0.3;
      g.add(sign);
      return g;
    },

    furHall(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      const body = Shapes.box(w * 0.9, 0.5, dp * 0.62, 'hideDark');
      body.position.z = -dp * 0.14;
      g.add(body);
      const roof = Shapes.hip(w * 0.98, 0.34, 'fur', 4);
      roof.position.set(0, 0.5, -dp * 0.14);
      g.add(roof);

      for (const sx of [-1, 1]) {
        const p = Shapes.cyl(0.03, 0.66, 'timberCold', 5);
        p.position.set(sx * w * 0.44, 0, dp * 0.36);
        g.add(p);
      }
      const rail = Shapes.barX(0.022, w * 0.88, 'timberCold', 4);
      rail.position.set(0, 0.64, dp * 0.36);
      g.add(rail);
      const tones = ['fur', 'hide', 'hidePale', 'hideDark'];
      for (let i = 0; i < 4; i++) {
        const pelt = Shapes.box(0.15, 0.36 - (i % 2) * 0.05, 0.03, tones[i]);
        pelt.position.set((i / 3 - 0.5) * w * 0.66, 0.26, dp * 0.36);
        g.add(pelt);
      }
      return g;
    },

    tradePost(d) {
      const g = new THREE.Group();
      const dp = d.h * 0.8;
      const base = Shapes.cyl(0.2, 0.14, 'rockCold', 8);
      base.position.z = -dp * 0.18;
      g.add(base);
      const mast = Shapes.cyl(0.035, 0.92, 'timberCold', 6);
      mast.position.set(0, 0.14, -dp * 0.18);
      g.add(mast);
      const arm = Shapes.barX(0.02, 0.36, 'timberCold', 4);
      arm.position.set(0.16, 0.94, -dp * 0.18);
      g.add(arm);
      const flag = Shapes.box(0.3, 0.22, 0.02, 'ochreRaw');
      flag.position.set(0.02, 0.7, -dp * 0.18);
      g.add(flag);
      const crate = Shapes.box(0.3, 0.18, 0.24, 'hideDark');
      crate.position.set(0, 0, dp * 0.3);
      g.add(crate);
      const bundle = Shapes.cyl(0.09, 0.24, 'hide', 7);
      bundle.rotation.x = Math.PI / 2;
      bundle.position.set(-0.14, 0.27, dp * 0.3);
      g.add(bundle);
      return g;
    },

    huntersCamp(d) {
      const g = new THREE.Group();
      const w = d.w * 0.78, dp = d.h * 0.78;
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + 0.4;
        const sp = Shapes.cyl(0.022, 0.86, 'timberCold', 4);
        sp.position.set(-w * 0.26 + Math.cos(a) * 0.1, 0, -dp * 0.2 + Math.sin(a) * 0.1);
        sp.rotation.x = -Math.sin(a) * 0.26; sp.rotation.z = Math.cos(a) * 0.26;
        g.add(sp);
        const head = Shapes.cone(0.028, 0.13, 'flint', 4);
        head.position.set(-w * 0.26 + Math.cos(a) * 0.02, 0.84, -dp * 0.2 + Math.sin(a) * 0.02);
        g.add(head);
      }
      const tent = Shapes.cone(0.32, 0.62, 'hide', 7);
      tent.position.set(w * 0.28, 0, -dp * 0.16);
      g.add(tent);
      const fire = Shapes.cyl(0.13, 0.05, 'emberDim', 8);
      fire.position.set(0, 0, dp * 0.32);
      g.add(fire);
      const fl = Shapes.cone(0.1, 0.24, 'ember', 6);
      fl.position.set(0, 0.05, dp * 0.32);
      g.add(fl);
      for (const sx of [-1, 1]) {
        const st = Shapes.cyl(0.018, 0.3, 'timberCold', 4);
        st.position.set(sx * 0.2, 0, dp * 0.32); st.rotation.z = -sx * 0.4;
        g.add(st);
      }
      return g;
    },

    spearLodge(d) {
      const g = Shapes.RECIPES.huntersCamp(d);
      const w = d.w * 0.78, dp = d.h * 0.78;

      for (let i = 0; i < 5; i++) {
        const sp = Shapes.cyl(0.02, 0.9 + (i % 2) * 0.08, 'timberCold', 4);
        sp.position.set(-w * 0.44 + i * 0.1, 0, dp * 0.42);
        sp.rotation.x = -0.12;
        g.add(sp);
        const hd = Shapes.cone(0.026, 0.12, 'flint', 4);
        hd.position.set(-w * 0.44 + i * 0.1, 0.9 + (i % 2) * 0.08, dp * 0.42);
        g.add(hd);
      }
      return g;
    },

    mammothBlind(d) {
      const g = Shapes.RECIPES.spearLodge(d);
      const w = d.w * 0.78, dp = d.h * 0.78;

      for (const sx of [-1, 1]) {
        const p = Shapes.cyl(0.03, 0.78, 'timberCold', 5);
        p.position.set(sx * w * 0.42, 0, -dp * 0.46);
        g.add(p);
      }
      const screen = Shapes.box(w * 0.9, 0.62, 0.05, 'hide');
      screen.position.set(0, 0.12, -dp * 0.46);
      g.add(screen);
      const skull = Shapes.box(0.24, 0.2, 0.2, 'boneDim');
      skull.position.set(w * 0.2, 0.74, -dp * 0.46);
      g.add(skull);
      for (const sx of [-1, 1]) {
        const tusk = Shapes.cyl(0.028, 0.34, 'bone', 6, 0.5);
        tusk.position.set(w * 0.2 + sx * 0.08, 0.74, -dp * 0.42);
        tusk.rotation.z = sx * 0.7;
        g.add(tusk);
      }
      return g;
    },

    catLodge(d) {
      const g = Shapes.RECIPES.mammothBlind(d);
      const w = d.w * 0.78, dp = d.h * 0.78;

      for (const sx of [-1, 1]) {
        const p = Shapes.cyl(0.026, 0.66, 'timberCold', 4);
        p.position.set(sx * w * 0.24, 0, dp * 0.06);
        g.add(p);
      }
      const bar = Shapes.barX(0.02, w * 0.5, 'timberCold', 4);
      bar.position.set(0, 0.64, dp * 0.06);
      g.add(bar);
      const pelt = Shapes.box(0.34, 0.4, 0.03, 'sabertoothPelt' in Shapes.SURF ? 'sabertoothPelt' : 'ember');
      pelt.position.set(0, 0.22, dp * 0.06);
      g.add(pelt);
      for (const sx of [-1, 1]) {
        const fang = Shapes.cyl(0.026, 0.24, 'bone', 5, 0.4);
        fang.position.set(sx * 0.09, 0.64, dp * 0.02);
        fang.rotation.x = 3.05;
        g.add(fang);
      }
      return g;
    },

    hideTent(d) {
      const g = new THREE.Group();
      const cone = Shapes.cone(0.36, 0.86, 'hide', 8);
      g.add(cone);
      const smokeflap = Shapes.cone(0.14, 0.2, 'hideDark', 6);
      smokeflap.position.y = 0.8;
      g.add(smokeflap);

      for (let i = 0; i < 3; i++) {
        const a = i / 3 * Math.PI * 2;
        const p = Shapes.cyl(0.016, 1.06, 'timberCold', 4);
        p.position.set(Math.cos(a) * 0.06, 0, Math.sin(a) * 0.06);
        p.rotation.x = -Math.sin(a) * 0.16; p.rotation.z = Math.cos(a) * 0.16;
        g.add(p);
      }
      const door = Shapes.box(0.16, 0.28, 0.02, 'hideDark');
      door.position.set(0, 0, 0.33);
      g.add(door);
      return g;
    },

    sunkenHut(d) {
      const g = new THREE.Group();
      const bank = Shapes.cyl(0.44, 0.16, 'snow', 9);
      g.add(bank);
      const cone = Shapes.cone(0.34, 0.66, 'hide', 8);
      cone.position.y = 0.14;
      g.add(cone);
      const cap = Shapes.cone(0.13, 0.18, 'hideDark', 6);
      cap.position.y = 0.66;
      g.add(cap);
      for (let i = 0; i < 3; i++) {
        const a = i / 3 * Math.PI * 2;
        const p = Shapes.cyl(0.015, 0.94, 'timberCold', 4);
        p.position.set(Math.cos(a) * 0.05, 0.14, Math.sin(a) * 0.05);
        p.rotation.x = -Math.sin(a) * 0.14; p.rotation.z = Math.cos(a) * 0.14;
        g.add(p);
      }

      const screen = Shapes.box(0.52, 0.3, 0.04, 'hideDark');
      screen.position.set(0, 0.14, -0.4);
      g.add(screen);
      const door = Shapes.box(0.14, 0.24, 0.02, 'charcoal');
      door.position.set(0, 0.14, 0.32);
      g.add(door);
      return g;
    },

    greatLodge(d) {
      const g = Shapes.RECIPES.boneLodge(d);
      const span = d.w * 0.58, len = d.h * 0.78, sill = d.w * 0.08;
      const wallH = 0.30, roofH = 0.52;

      const bay = Shapes.box(span * 0.66, wallH * 0.9, len * 0.30, 'hide');
      bay.position.set(0, sill, -len * 0.56);
      g.add(bay);
      const bayRoof = Shapes.gable(span * 0.66, roofH * 0.62, len * 0.30, 'hide', 0.05);
      bayRoof.position.set(0, sill + wallH * 0.9, -len * 0.56);
      g.add(bayRoof);

      for (const [ox, oz] of [[-0.20, 0.16], [0.22, -0.10], [-0.06, -0.30]]) {
        const stone = Shapes.rock((ox * 97 + oz * 31) | 0, 0.075, 0.8);
        stone.position.set(ox, sill + wallH + roofH * 0.52, oz * len);
        g.add(stone);
      }

      const collar = Shapes.cyl(0.075, 0.09, 'boneDim', 7);
      collar.position.set(0, sill + wallH + roofH - 0.02, len * 0.12);
      g.add(collar);
      for (let i = 0; i < 3; i++) {
        const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(0.055 + i * 0.022, 0), Shapes.m('snow'));
        puff.position.set((i - 1) * 0.045, sill + wallH + roofH + 0.10 + i * 0.10, len * 0.12 + (i % 2 ? 0.03 : -0.02));
        g.add(puff);
      }

      for (const sx of [-1, 1]) {
        const tusk = Shapes.cyl(0.030, 0.42, 'bone', 6, 0.45);
        tusk.position.set(sx * 0.34, 0, len * 0.42);
        tusk.rotation.z = sx * 0.62;
        g.add(tusk);
      }
      return g;
    },

    boneLodge(d) {
      const g = new THREE.Group();

      const span = d.w * 0.58, len = d.h * 0.78, h = d.w * 0.40, sill = d.w * 0.08;

      for (const sx of [-1, 1])
        for (let i = 0; i < 4; i++) {
          const j = Shapes.box(0.11, sill, len / 4 * 0.86, i % 2 ? 'bone' : 'boneDim');
          j.position.set(sx * span * 0.5, 0, (i / 3 - 0.5) * len * 0.74);
          g.add(j);
        }

      const wallH = 0.30, roofH = 0.52;
      const body = Shapes.box(span, wallH, len, 'hide');
      body.position.y = sill;
      g.add(body);
      const roof = Shapes.gable(span, roofH, len, 'hide', 0.06);
      roof.position.y = sill + wallH;
      g.add(roof);

      const W = span / 2 + 0.06, slope = Math.atan2(roofH, W), runL = Math.hypot(W, roofH);
      for (let r = 0; r < 3; r++) {
        const z = (r / 2 - 0.5) * len * 0.66;
        for (const sx of [-1, 1]) {
          const rib = Shapes.box(runL, 0.05, 0.12, 'boneDim');
          rib.geometry.translate(0, -0.025, 0);
          rib.position.set(sx * W / 2, sill + wallH + roofH / 2, z);
          rib.rotation.z = -sx * slope;
          g.add(rib);
        }
      }

      const ridge = Shapes.box(0.09, 0.06, len * 0.96, 'bone');
      ridge.position.set(0, sill + wallH + roofH - 0.03, 0);
      g.add(ridge);

      for (const sx of [-1, 1]) {
        const tusk = Shapes.cyl(0.036, 0.52, 'bone', 6, 0.45);
        tusk.position.set(sx * 0.21, 0, len * 0.5 + 0.03);
        tusk.rotation.z = sx * 0.5;
        g.add(tusk);
      }
      const lintel = Shapes.barX(0.032, 0.34, 'bone', 6);
      lintel.position.set(0, 0.47, len * 0.5 + 0.03);
      g.add(lintel);
      const mouth = Shapes.box(0.26, 0.4, 0.04, 'charcoal');
      mouth.position.set(0, 0, len * 0.5 - 0.01);
      g.add(mouth);
      const skull = Shapes.box(0.2, 0.16, 0.14, 'boneDim');
      skull.position.set(0, 0.5, len * 0.42);
      g.add(skull);

      const vent = Shapes.cyl(0.07, 0.09, 'charcoal', 6);
      vent.position.set(0, sill + h - 0.02, -len * 0.12);
      g.add(vent);
      const wisp = Shapes.cone(0.06, 0.16, 'snow', 5);
      wisp.position.set(0, sill + h + 0.05, -len * 0.12);
      g.add(wisp);
      return g;
    },

    danceGround(d) {
      const g = new THREE.Group();
      const w = d.w * 0.82;
      const ring = new THREE.Mesh(new THREE.CircleGeometry(w * 0.5, 14), Shapes.m('charcoal'));
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02;
      g.add(ring);
      const inner = new THREE.Mesh(new THREE.CircleGeometry(w * 0.3, 12), Shapes.m('ochreRaw'));
      inner.rotation.x = -Math.PI / 2; inner.position.y = 0.03;
      g.add(inner);
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * Math.PI * 2;
        const h = 0.36 + (i % 3) * 0.14;
        const post = Shapes.cyl(0.045, h, 'timberCold', 6);
        post.position.set(Math.cos(a) * w * 0.44, 0, Math.sin(a) * w * 0.44);
        g.add(post);
        const skull = Shapes.box(0.1, 0.09, 0.09, 'boneDim');
        skull.position.set(Math.cos(a) * w * 0.44, h, Math.sin(a) * w * 0.44);
        g.add(skull);
      }
      return g;
    },

    shamanTent(d) {
      const g = new THREE.Group();
      const cone = Shapes.cone(0.3, 0.6, 'hideDark', 7);
      g.add(cone);

      const band = Shapes.cyl(0.24, 0.09, 'ochreRaw', 7, 1);
      band.position.y = 0.16;
      g.add(band);
      const pole = Shapes.cyl(0.02, 0.98, 'timberCold', 4);
      g.add(pole);

      for (const sx of [-1, 1]) {
        const a1 = Shapes.cyl(0.014, 0.2, 'bone', 4);
        a1.position.set(sx * 0.04, 0.9, 0); a1.rotation.z = sx * 0.6;
        g.add(a1);
        const a2 = Shapes.cyl(0.011, 0.13, 'bone', 4);
        a2.position.set(sx * 0.14, 1.02, 0); a2.rotation.z = sx * 0.15;
        g.add(a2);
      }
      return g;
    },

    firekeeperLodge(d) {
      const g = new THREE.Group();
      const w = d.w * 0.74, dp = d.h * 0.74;
      const body = Shapes.box(w, 0.5, dp * 0.72, 'hideDark');
      body.position.z = -dp * 0.08;
      g.add(body);
      const roof = Shapes.vault(w * 1.02, 0.4, dp * 0.8, 'fur', 7);
      roof.position.set(0, 0.5, -dp * 0.08);
      g.add(roof);

      const ring = Shapes.cyl(0.2, 0.06, 'rockCold', 9);
      ring.position.set(0, 0, dp * 0.4);
      g.add(ring);
      const coals = Shapes.cyl(0.15, 0.05, 'emberDim', 9);
      coals.position.set(0, 0.06, dp * 0.4);
      g.add(coals);
      const fl = Shapes.cone(0.14, 0.36, 'ember', 6);
      fl.position.set(0, 0.09, dp * 0.4);
      g.add(fl);

      for (let r = 0; r < 3; r++)
        for (let i = 0; i < 3; i++) {
          const lg = Shapes.cyl(0.05, 0.3, 'timberCold', 6);
          lg.rotation.x = Math.PI / 2;
          lg.position.set(-w * 0.42 + i * 0.11, 0.05 + r * 0.11, -dp * 0.34);
          g.add(lg);
        }
      return g;
    },

    handprintPanel(d) {
      const g = new THREE.Group();
      const slab = Shapes.rock(21, 0.34, 0.55);
      slab.scale.set(1, 1.5, 0.55);
      g.add(slab);

      for (let i = 0; i < 4; i++) {
        const h = Shapes.box(0.075, 0.09, 0.012, 'ochreRaw');
        h.position.set((i % 2 - 0.5) * 0.2, 0.16 + Math.floor(i / 2) * 0.16, 0.19);
        h.rotation.z = (i % 2 ? 1 : -1) * 0.12;
        g.add(h);
      }
      const base = Shapes.cyl(0.24, 0.05, 'snow', 8);
      g.add(base);
      return g;
    },
  },

  plaza(g, d, tiers) {
    const n = tiers || 2;
    const H = 0.13;
    for (let i = 0; i < n; i++) {
      const f = 1 - i * 0.06;
      const step = Shapes.box(d.w * 0.98 * f, H, d.h * 0.98 * f, 'stone');
      step.position.y = i * H;
      g.add(step);
    }
    const y0 = n * H;
    for (let i = 0; i < 4; i++) {
      const st = Shapes.box(d.w * 0.30, 0.07, 0.14, 'stone');
      st.position.set(0, y0 - 0.07 * (i + 1), d.h * 0.49 - 0.07 - i * 0.14);
      g.add(st);
    }
    return y0;
  },

  CITIZEN_DRESS: {
    1:  { robe: 'fur',     torso: 'hideDark', head: 'hidePale', hood: 'fur', bulk: 1.22 },

    3:  { robe: 'hidePale', torso: 'hideDark', head: 'hidePale', bulk: 1.06 },
    4:  { robe: 'plaster', torso: 'mudPale',  head: 'timber',   bulk: 1 },
    5:  { robe: 'plaster', torso: 'plaster',  head: 'timber',   bulk: 1 },

    6:  { robe: 'ware',    torso: 'plaster',  head: 'timber',   bulk: 1 },
    14: { robe: 'ware',    torso: 'mudPale',  head: 'timber',   bulk: 1 },
  },

  citizenDress(rung) {
    const keys = Object.keys(Shapes.CITIZEN_DRESS).map(Number).sort((a, b) => a - b);
    for (let i = keys.length - 1; i >= 0; i--)
      if (keys[i] <= rung) return Shapes.CITIZEN_DRESS[keys[i]];
    return Shapes.CITIZEN_DRESS[4];
  },

  citizenGeo(rung) {
    const D = Shapes.citizenDress(rung || 4);
    const k = D.bulk || 1;
    const g = new THREE.Group();

    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.030 * k, 0.046 * k, 0.085, 6),
      Shapes.m(D.robe));
    skirt.position.y = 0.043;
    g.add(skirt);
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.026 * k, 0.031 * k, 0.055, 6),
      Shapes.m(D.torso));
    torso.position.y = 0.113;
    g.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.027, 7, 5), Shapes.m(D.head));
    head.position.y = 0.163;
    g.add(head);

    if (D.hood) {
      const hood = new THREE.Mesh(new THREE.SphereGeometry(0.034, 7, 4, 0, Math.PI * 2, 0, Math.PI * 0.62),
        Shapes.m(D.hood));
      hood.position.y = 0.168;
      g.add(hood);
    }
    return Shapes.mergeGroup(g);
  },

  LEDGER_SKINS: { 1: 'boneTally', 4: 'clayTablet' },

  ledgerSkin(era) {
    const keys = Object.keys(Shapes.LEDGER_SKINS).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= rungOf(era)) pick = k;
    return Shapes.LEDGER_SKINS[pick];
  },

  ledger(era, faceTex) {
    const g = new THREE.Group();
    const skin = Shapes.ledgerSkin(era);
    if (skin === 'clayTablet') {

      const plinth = Shapes.box(0.46, 0.20, 0.30, 'stoneDark');
      g.add(plinth);
      const top = Shapes.box(0.52, 0.045, 0.34, 'mud');
      top.position.y = 0.20;
      g.add(top);

      const tilt = 0.9;
      const slab = Shapes.box(0.40, 0.02, 0.30, 'mudPale');
      slab.position.set(0, 0.245, 0.02);
      slab.rotation.x = tilt;
      g.add(slab);

      const off = 0.022;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.28),
        Gfx.unlit(0xffffff, { map: faceTex, transparent: false }));
      face.position.set(0, 0.245 + off * Math.cos(tilt), 0.02 + off * Math.sin(tilt));
      face.rotation.x = tilt - Math.PI / 2;
      g.add(face);

      const stylus = Shapes.cyl(0.012, 0.22, 'timber', 6);
      stylus.rotation.z = Math.PI / 2;
      stylus.position.set(0.04, 0.235, -0.13);
      g.add(stylus);
    } else if (skin === 'boneTally') {

      for (const sx of [-1, 1]) {
        const stone = Shapes.rock(sx > 0 ? 7 : 13, 0.16, 0.8);
        stone.position.set(sx * 0.26, 0, -0.02);
        g.add(stone);
      }

      const tilt = 0.9;
      const blade = Shapes.box(0.44, 0.025, 0.34, 'bone');
      blade.position.set(0, 0.26, 0.02);
      blade.rotation.x = tilt;
      g.add(blade);
      const off = 0.024;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.28),
        Gfx.unlit(0xffffff, { map: faceTex, transparent: false }));
      face.position.set(0, 0.26 + off * Math.cos(tilt), 0.02 + off * Math.sin(tilt));
      face.rotation.x = tilt - Math.PI / 2;
      g.add(face);

      const thong = Shapes.box(0.50, 0.03, 0.05, 'hideDark');
      thong.position.set(0, 0.14, -0.06);
      g.add(thong);
      const crayon = Shapes.cyl(0.016, 0.18, 'ochreRaw', 5);
      crayon.rotation.z = Math.PI / 2;
      crayon.position.set(0.06, 0.055, -0.16);
      g.add(crayon);
    }
    g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  },

  asSite(g, d, frac) {
    g.updateMatrixWorld(true);
    const v = new THREE.Vector3();
    const parts = [];
    let top = 0;
    g.traverse(o => {
      if (!o.isMesh) return;
      const p = o.geometry.attributes.position;
      let lo = Infinity, hi = -Infinity;
      for (let i = 0; i < p.count; i++) {
        const y = v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld).y;
        if (y < lo) lo = y;
        if (y > hi) hi = y;
      }
      parts.push({ o, lo, hi, mid: (lo + hi) * 0.5 });
      if (hi > top) top = hi;
    });

    const base = Math.min(top * 0.25, 0.30);
    const cut = base + Math.max(0, Math.min(1, frac)) * (top - base);

    const org = new THREE.Vector3();
    let built = base;
    for (const p of parts) {
      if (p.hi <= cut) { if (p.hi > built) built = p.hi; continue; }
      const span = p.hi - p.lo;
      p.o.getWorldPosition(org);
      const basePivoted = span > 0.001 && Math.abs(org.y - p.lo) < 0.02;
      if (p.lo < cut && basePivoted) {
        p.o.scale.y *= (cut - p.lo) / span;
        if (cut > built) built = cut;
        continue;
      }
      if (p.mid <= cut) { if (p.hi > built) built = p.hi; continue; }
      if (p.o.parent) p.o.parent.remove(p.o);
    }

    const half = d.w * 0.5;

    const steps = 5, run = d.h * 0.42;
    for (let i = 0; i < steps; i++) {
      const h = Math.max(0.06, built - 0.03) * ((i + 1) / steps);
      const seg = Shapes.box(d.w * 0.26, h, run / steps + 0.01, 'stoneDark');
      seg.position.set(0, 0, d.h * 0.46 - run * ((i + 0.5) / steps));
      g.add(seg);
    }

    for (let i = 0; i < 3; i++) {
      const a = 1.9 + i * 2.1;
      const st = Shapes.box(0.26, 0.10 + i * 0.04, 0.20, 'mud');
      st.position.set(Math.cos(a) * half * 0.58, 0, Math.sin(a) * half * 0.58);
      st.rotation.y = a;
      g.add(st);
    }

    if (frac < 0.995) {
      const spread = Math.max(0.14, half * 0.34 * (1 - frac * 0.5));
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI * 0.5 + 0.4;
        const pole = Shapes.cyl(0.028, 0.40, 'timber', 5);
        pole.position.set(Math.cos(a) * spread, built, Math.sin(a) * spread);
        g.add(pole);
      }
      const plank = Shapes.box(spread * 2.1, 0.035, 0.10, 'timber');
      plank.position.y = built + 0.32;
      g.add(plank);
    }
    return g;
  },

  finial(g, y) {
    const f = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), Gfx.unlit(Shapes.SURF.gold));
    f.position.y = y;
    g.add(f);

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.45, 6),
      Gfx.unlit(Shapes.SURF.gold, { transparent: true, opacity: 0.22, depthWrite: false }));
    shaft.position.y = y + 0.225;
    g.add(shaft);
  },

  ziggurat(d) {
    const g = new THREE.Group();
    let y = Shapes.plaza(g, d, 2);
    const tiers = [[1.00, 0.74], [0.72, 0.64], [0.48, 0.54]];
    for (const [f, th] of tiers) {
      const t = Shapes.box(d.w * 0.92 * f, th, d.h * 0.92 * f, f > 0.9 ? 'mud' : 'mudPale');
      t.position.y = y;
      g.add(t);
      Shapes.niches(g, d.w * 0.92 * f, th, d.h * 0.92 * f, 5, y);
      y += th;
    }

    const run = d.h * 0.5;
    const stair = Shapes.box(d.w * 0.22, 0.06, run, 'stone');
    stair.position.set(0, y * 0.5, d.h * 0.24);
    stair.rotation.x = -Math.atan2(y, run);
    g.add(stair);
    const shrine = Shapes.box(d.w * 0.30, 0.46, d.h * 0.30, 'plaster');
    shrine.position.y = y;
    g.add(shrine);
    const roof = Shapes.box(d.w * 0.34, 0.07, d.h * 0.34, 'gold');
    roof.position.y = y + 0.46;
    g.add(roof);
    Shapes.finial(g, y + 0.66);
    return g;
  },

  greatPyramid(d) {
    const g = new THREE.Group();
    const y = Shapes.plaza(g, d, 1);

    const p = Shapes.hip(d.w * 0.96, 2.55, 'plaster', 4);
    p.position.y = y;
    g.add(p);
    const cap = Shapes.hip(d.w * 0.20, 0.30, 'gold', 4);
    cap.position.y = y + 2.42;
    g.add(cap);
    Shapes.finial(g, y + 2.80);
    return g;
  },

  templePyramid(d) {
    const g = new THREE.Group();
    let y = Shapes.plaza(g, d, 1);
    for (let i = 0; i < 5; i++) {
      const f = 1 - i * 0.15;
      const t = Shapes.box(d.w * 0.94 * f, 0.34, d.h * 0.94 * f, 'stone');
      t.position.y = y;
      g.add(t);
      y += 0.34;
    }
    const shrine = Shapes.box(d.w * 0.34, 0.44, d.h * 0.34, 'plaster');
    shrine.position.y = y;
    g.add(shrine);
    const comb = Shapes.box(d.w * 0.30, 0.44, 0.07, 'stone');
    comb.position.y = y + 0.44;
    g.add(comb);
    Shapes.finial(g, y + 1.00);
    return g;
  },

  paintedCave(d) {
    const g = new THREE.Group();
    const w = d.w * 0.92, dp = d.h * 0.92;

    const HX = 1.30;

    const masses = [[-0.62, 2.05, 0.62], [0.10, 2.95, 0.74], [0.74, 1.70, 0.52]];
    for (const [ox, hh, rr] of masses) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(rr, 0), Shapes.m('rockCold'));
      rock.scale.set(1.0, hh / rr * 0.5, 0.9);
      rock.position.set(ox, hh * 0.5, -dp * 0.20);
      rock.rotation.y = ox * 1.7;
      g.add(rock);
    }

    for (const [ox, hh] of [[-0.34, 1.7], [0.44, 2.2]]) {
      const seam = Shapes.box(0.05, hh, 0.10, 'rockDark');
      seam.position.set(ox, 0.25, -dp * 0.20 + 0.60);
      g.add(seam);
    }

    const cap = new THREE.Mesh(new THREE.DodecahedronGeometry(0.60, 0), Shapes.m('snow'));
    cap.scale.set(1.5, 0.26, 1.0);
    cap.position.set(0.06, 2.92, -dp * 0.22);
    g.add(cap);
    const cap2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42, 0), Shapes.m('snow'));
    cap2.scale.set(1.4, 0.24, 1.0);
    cap2.position.set(-0.62, 2.02, -dp * 0.20);
    g.add(cap2);
    void HX;

    const mouth = new THREE.Mesh(
      new THREE.CylinderGeometry(w * 0.20, w * 0.24, 0.62, 9, 1, false, 0, Math.PI),
      Shapes.m('charcoal'));
    mouth.rotation.y = Math.PI;
    mouth.position.set(-0.02 * w, 0.31, dp * 0.10);
    g.add(mouth);
    const lintel = Shapes.box(w * 0.52, 0.10, 0.16, 'rockDark');
    lintel.position.set(-0.02 * w, 0.62, dp * 0.12);
    g.add(lintel);

    for (let i = 0; i < 4; i++) {
      const t = i / 3;
      const bowl = Shapes.cyl(0.055, 0.05, 'boneDim', 6);
      bowl.position.set(-0.02 * w + (i % 2 ? 0.16 : -0.16), 0, dp * (0.34 - t * 0.30));
      g.add(bowl);
      const fl = Shapes.cone(0.038, 0.11, 'ember', 5);
      fl.position.set(bowl.position.x, 0.05, bowl.position.z);
      g.add(fl);
    }

    const PX = 0.84, PW = 0.40;
    const panel = Shapes.box(PW * 2, 0.46, 0.05, 'hidePale');
    panel.position.set(PX, 0.30, dp * 0.30);
    panel.rotation.y = -0.30;
    g.add(panel);

    const body = Shapes.box(0.44, 0.09, 0.03, 'ochreRaw');
    body.position.set(PX, 0.40, dp * 0.31);
    body.rotation.y = -0.30;
    g.add(body);
    const head = Shapes.box(0.09, 0.07, 0.03, 'ochreRaw');
    head.position.set(PX + 0.20, 0.35, dp * 0.28);
    head.rotation.set(0, -0.30, 0.5);
    g.add(head);
    for (let i = 0; i < 4; i++) {
      const leg = Shapes.box(0.028, 0.10, 0.03, 'ochreRaw');
      leg.position.set(PX - 0.18 + i * 0.12, 0.31, dp * (0.325 - i * 0.017));
      leg.rotation.y = -0.30;
      g.add(leg);
    }

    for (let i = 0; i < 3; i++) {
      const hand = new THREE.Mesh(new THREE.CircleGeometry(0.045, 6), Shapes.m('ochreRaw'));
      hand.position.set(PX - 0.24 + i * 0.20, 0.16 + (i % 2) * 0.05, dp * (0.34 - i * 0.028));
      hand.rotation.y = -0.30;
      g.add(hand);
    }
    return g;
  },

  genericMonument(d, era) {
    const g = new THREE.Group();
    let y = Shapes.plaza(g, d, 2);
    for (let i = 0; i < 4; i++) {
      const f = 1 - i * 0.17;
      const t = Shapes.box(d.w * 0.9 * f, 0.46, d.h * 0.9 * f, i % 2 ? 'plaster' : 'stone');
      t.position.y = y;
      g.add(t);
      y += 0.46;
    }
    const crown = Shapes.cone(d.w * 0.2, 0.46, 'gold', era >= 10 ? 12 : 6);
    crown.position.y = y;
    g.add(crown);
    Shapes.finial(g, y + 0.62);
    return g;
  },

  ERA_SKINS: {

    1: { townhall: 'longHearth', foragecamp: 'forageGround',

         tendedground: 'tendedGround', smokelodge: 'smokeLodge',
         pressurefloor: 'pressureFloor', deepcache: 'deepCache', tradering: 'tradeRing',
         hearth: 'glacialHearth', longfire: 'longFire', icehole: 'meltPit',
         cache: 'frozenCache', storepit: 'permafrostStore', sleddogpost: 'sledDogPost',
         deadwoodcutter: 'deadwoodCutter', reindeerdrive: 'reindeerDrive',
         iceweir: 'iceWeir', flintquarry: 'flintQuarry', boneyard: 'boneYard',
         ochrepit: 'ochreBank', charclamp: 'charcoalClamp', dryrack: 'dryingRack',
         tannery: 'hideFrames', knapfloor: 'knappingFloor',
         meatstall: 'meatStall', fuelstack: 'fuelStack', bladestall: 'bladeTrader',
         carverlodge: 'carverLodge', furhall: 'furHall', tradepost: 'tradePost',
         hunterscamp: 'huntersCamp', spearlodge: 'spearLodge',
         mammothblind: 'mammothBlind', catlodge: 'catLodge', hidetent: 'hideTent', bonelodge: 'boneLodge',
         danceground: 'danceGround', shaman: 'shamanTent',
         firekeeper: 'firekeeperLodge', handprint: 'handprintPanel' },
    4: { townhall: 'templeHousehold', house: 'reedHouse', well: 'well', farm: 'farmPlot',
         mill: 'millHouse', market: 'marketStalls', park: 'publicSquare',
         templeGranary: 'templeGranary', estate: 'farmPlot', midden: 'midden',
         claypit: 'clayPit', kiln: 'kiln', potterystall: 'potteryStall',
         sheepfold: 'sheepfold', weaver: 'weaverShed', clothhall: 'clothHall',
         brewery: 'brewery', tavern: 'tavern', scribe: 'scribeHouse',
         cistern: 'cistern', threshing: 'threshingFloor' },
    5: { townhall: 'nomarchEstate', house: 'egyptHouse', villa: 'egyptHouse',
         granary: 'granaryEgypt', canalwell: 'well', estate: 'farmPlot', bazaar: 'marketStalls' },
    14: { townhall: 'councilHouse', house: 'mayaHouse', villa: 'mayaHouse', stonehouse: 'mayaHouse',
         aqueduct: 'well', stoneyard: 'marketStalls' },
    30: { coal: 'coalPlant' },
  },

  LEVEL_SKINS: {
    bonelodge: ['boneLodge', 'greatLodge'],
  },

  HOUSE_SKINS: {

    1: ['hideTent', 'sunkenHut'],
    4: ['reedHouse', 'mudbrickHouse', 'courtyardHouse'],
    5: ['egyptHouse', 'egyptHouse', 'nomarchEstate'],
    14: ['mayaHouse', 'mayaHouse', 'councilHouse'],
  },

  houseSkin(era, level) {
    const keys = Object.keys(Shapes.HOUSE_SKINS).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= rungOf(era)) pick = k;
    const row = Shapes.HOUSE_SKINS[pick];
    return row[Math.max(0, Math.min(row.length - 1, (level || 1) - 1))];
  },

  eraSkin(type, rung) {
    const keys = Object.keys(Shapes.ERA_SKINS).map(Number).sort((a, b) => a - b);
    for (let i = keys.length - 1; i >= 0; i--) {
      if (keys[i] > rung) continue;
      const s = Shapes.ERA_SKINS[keys[i]][type];
      if (s && Shapes.RECIPES[s]) return s;
    }
    return null;
  },

  skinFor(type, era, level) {

    const e = rungOf(curEra(era));
    const d = BUILDINGS[type];
    const own = Shapes.eraSkin(type, e);

    const own2 = Shapes.LEVEL_SKINS[type];
    if (own2) {
      const pick = own2[Math.max(0, Math.min(own2.length - 1, (level || 1) - 1))];
      if (pick && Shapes.RECIPES[pick]) return pick;
    }
    if (d && d.cap) {
      const hk = Object.keys(Shapes.HOUSE_SKINS).map(Number).sort((a, b) => a - b);
      let pick = hk[0];
      for (const k of hk) if (k <= e) pick = k;
      const ladder = Shapes.HOUSE_SKINS[pick];
      if (!own || (ladder && own === ladder[0])) {
        const s = Shapes.houseSkin(e, level);
        if (s && Shapes.RECIPES[s]) return s;
      }
    }
    if (own) return own;
    return Shapes.RECIPES[type] ? type : '_default';
  },

  _default(d) {
    const g = new THREE.Group();
    const w = d.w * 0.78, dp = d.h * 0.78;
    g.add(Shapes.box(w * 1.06, 0.08, dp * 1.06, 'stoneDark'));
    const body = Shapes.box(w, 0.72, dp, 'mud');
    body.position.y = 0.08;
    g.add(body);
    const roof = Shapes.gable(w, 0.34, dp, 'thatch', 0.1);
    roof.position.y = 0.8;
    g.add(roof);
    Shapes.door(g, 0.2, 0.34, dp * 0.5 + 0.01);
    return g;
  },

  forType(type, era, level, frac) {
    const d = DEF(type);
    const e = curEra(era);
    let g;
    if (d.monument) {
      if (type === 'ziggurat') g = Shapes.ziggurat(d);
      else if (type === 'pyramid') g = Shapes.greatPyramid(d);
      else if (type === 'templePyr') g = Shapes.templePyramid(d);

      else if (type === 'paintedcave') g = Shapes.paintedCave(d);
      else g = Shapes.genericMonument(d, d.era != null ? d.era : e);

      if (frac !== undefined && frac < 0.999) Shapes.asSite(g, d, frac);
    } else {
      const skin = Shapes.skinFor(type, e, level);
      g = skin === '_default' ? Shapes._default(d) : Shapes.RECIPES[skin](d);
    }

    g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  },

  measure(obj) {
    obj.updateMatrixWorld(true);
    const v = new THREE.Vector3();
    let maxX = 0, maxZ = 0, top = 0, bottom = 0, verts = 0;
    obj.traverse(o => {
      if (!o.isMesh) return;
      const p = o.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld);
        if (Math.abs(v.x) > maxX) maxX = Math.abs(v.x);
        if (Math.abs(v.z) > maxZ) maxZ = Math.abs(v.z);
        if (v.y > top) top = v.y;
        if (v.y < bottom) bottom = v.y;
        verts++;
      }
    });
    return { maxX, maxZ, top, bottom, verts };
  },

  HEIGHT_BAND: { monument: [2.9, 3.7], house: [0.9, 1.45], townhall: [1.2, 2.2] },

  auditSkins() {
    const broken = [], gaps = {};
    for (const rung in Shapes.ERA_SKINS)
      for (const type in Shapes.ERA_SKINS[rung]) {
        const rec = Shapes.ERA_SKINS[rung][type];
        if (!Shapes.RECIPES[rec]) broken.push(rung + ':' + type + ' -> ' + rec + ' (no such recipe)');
        if (!BUILDINGS[type]) broken.push(rung + ':' + type + ' is not a building');
      }
    for (const rung of (typeof WRITTEN_RUNGS !== 'undefined' ? WRITTEN_RUNGS : [1])) {
      const miss = [];
      for (const type in BUILDINGS) {
        const d = BUILDINGS[type];

        if (defEra(d) !== rung || d.monument || type === 'road') continue;
        if (d.noBuild && !(typeof UPGRADE_TARGETS !== 'undefined' && UPGRADE_TARGETS.has(type))) continue;
        if (!Shapes.eraSkin(type, rung)) miss.push(type);
      }
      gaps[rung] = miss;
    }
    return { broken, gaps };
  },

  auditFootprints() {
    const bad = [];
    for (const type in BUILDINGS) {
      if (type === 'road') continue;
      const d = DEF(type);
      const g = Shapes.forType(type, defEra(d));
      const m = Shapes.measure(g);
      const issues = [];
      if (m.maxX > d.w / 2 + 0.001) issues.push('overhangs X');
      if (m.maxZ > d.h / 2 + 0.001) issues.push('overhangs Z');
      const band = Shapes.HEIGHT_BAND[d.monument ? 'monument' : (d.cap ? 'house' : type)];
      if (band && (m.top < band[0] || m.top > band[1])) issues.push('height out of band ' + band.join('-'));
      if (issues.length)
        bad.push({ type, w: d.w, h: d.h, maxX: +m.maxX.toFixed(3), maxZ: +m.maxZ.toFixed(3),
                   top: +m.top.toFixed(3), issues });
      g.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
    }
    return bad;
  },
};

window.Shapes = Shapes;
