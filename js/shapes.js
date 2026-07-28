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
    1: 0xbd9967,
    2: 0xdcc196,
    3: 0xcfd0c2,
    4: 0x9a9a8c,
    5: 0xe0dcd0,
    6: 0xc9b9a2,
    7: 0xa8a49a,
    9: 0x6e6459,
    12: 0xb0aaa2,
  },

  rockTint(era) {
    const keys = Object.keys(Shapes.ROCK_TINT).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= (era || 1)) pick = k;
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
    const e = era || 1;
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
        const heap = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15 + hh * 0.05, 0), Shapes.m('earth'));
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

  citizenGeo() {
    const g = new THREE.Group();

    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.046, 0.085, 6),
      Shapes.m('plaster'));
    skirt.position.y = 0.043;
    g.add(skirt);
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.031, 0.055, 6),
      Shapes.m('mudPale'));
    torso.position.y = 0.113;
    g.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.027, 7, 5), Shapes.m('timber'));
    head.position.y = 0.163;
    g.add(head);
    return Shapes.mergeGroup(g);
  },

  LEDGER_SKINS: { 1: 'clayTablet' },

  ledgerSkin(era) {
    const keys = Object.keys(Shapes.LEDGER_SKINS).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= (era || 1)) pick = k;
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
    1: { townhall: 'templeHousehold', house: 'reedHouse', well: 'well', farm: 'farmPlot',
         mill: 'millHouse', market: 'marketStalls', park: 'publicSquare',
         templeGranary: 'templeGranary', estate: 'farmPlot', midden: 'midden',
         claypit: 'clayPit', kiln: 'kiln', potterystall: 'potteryStall',
         sheepfold: 'sheepfold', weaver: 'weaverShed', clothhall: 'clothHall',
         brewery: 'brewery', tavern: 'tavern', scribe: 'scribeHouse',
         cistern: 'cistern', threshing: 'threshingFloor' },
    2: { townhall: 'nomarchEstate', house: 'egyptHouse', villa: 'egyptHouse',
         granary: 'granaryEgypt', canalwell: 'well', estate: 'farmPlot', bazaar: 'marketStalls' },
    3: { townhall: 'councilHouse', house: 'mayaHouse', villa: 'mayaHouse', stonehouse: 'mayaHouse',
         aqueduct: 'well', stoneyard: 'marketStalls' },
    9: { coal: 'coalPlant' },
  },

  HOUSE_SKINS: {
    1: ['reedHouse', 'mudbrickHouse', 'courtyardHouse'],
    2: ['egyptHouse', 'egyptHouse', 'nomarchEstate'],
    3: ['mayaHouse', 'mayaHouse', 'councilHouse'],
  },

  houseSkin(era, level) {
    const keys = Object.keys(Shapes.HOUSE_SKINS).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= (era || 1)) pick = k;
    const row = Shapes.HOUSE_SKINS[pick];
    return row[Math.max(0, Math.min(row.length - 1, (level || 1) - 1))];
  },

  skinFor(type, era, level) {
    const e = era || (G.s && G.s.era) || 1;
    const d = BUILDINGS[type];
    if (d && d.cap) {
      const s = Shapes.houseSkin(e, level);
      if (s && Shapes.RECIPES[s]) return s;
    }
    const keys = Object.keys(Shapes.ERA_SKINS).map(Number).sort((a, b) => a - b);

    for (let i = keys.length - 1; i >= 0; i--) {
      if (keys[i] > e) continue;
      const s = Shapes.ERA_SKINS[keys[i]][type];
      if (s && Shapes.RECIPES[s]) return s;
    }
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
    const e = era || (G.s && G.s.era) || 1;
    let g;
    if (d.monument) {
      if (type === 'ziggurat') g = Shapes.ziggurat(d);
      else if (type === 'pyramid') g = Shapes.greatPyramid(d);
      else if (type === 'templePyr') g = Shapes.templePyramid(d);
      else g = Shapes.genericMonument(d, d.era || e);

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

  auditFootprints() {
    const bad = [];
    for (const type in BUILDINGS) {
      if (type === 'road') continue;
      const d = DEF(type);
      const g = Shapes.forType(type, d.era || 1);
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
