'use strict';

const Gfx = {

  PAL: {
    bone:      0xfbd99c,
    sandLit:   0xecc07a,
    silt:      0xe9a952,
    gold:      0xfab11d,
    goldMid:   0xd1880e,
    bankOchre: 0xb7803b,
    ochreMid:  0xa6700f,
    ochreDark: 0x7e5712,
    coral:     0xec5f2a,
    rockPale:  0xbd9967,
    earth:     0x826047,
    shadow:    0x574217,
    shadowMax: 0x372d12,
    sunDisc:   0xfcf2d6,
  },

  LADDER: [0xfbd99c, 0xe9a952, 0xa6700f, 0x574217],

  color(hex) { return new THREE.Color(hex).convertSRGBToLinear(); },

  CEL: {
    enabled: true,
    steps: 3.0,
    softness: 0.055,
    floor: 0.30,
    shadowTint: 0x5a6b93,
    shadowAmt: 0.30,
    lightTint: 0xffd9a0,
    lightAmt: 0.13,

    shadeFloor: 0.14,

    shadeTint: 0xb4bcc8,
  },

  _celU: null,
  _celUniforms() {
    if (Gfx._celU) return Gfx._celU;
    const C = Gfx.CEL;
    return (Gfx._celU = {
      celSteps: { value: C.steps },
      celSoft: { value: C.softness },
      celFloor: { value: C.floor },
      celShadowTint: { value: Gfx.color(C.shadowTint) },
      celShadowAmt: { value: C.shadowAmt },
      celLightTint: { value: Gfx.color(C.lightTint) },
      celLightAmt: { value: C.lightAmt },
      celShadeFloor: { value: C.shadeFloor },
      celShadeTint: { value: Gfx._normTint(C.shadeTint) },
    });
  },

  _normTint(hex) {
    const c = Gfx.color(hex);
    const m = Math.max(c.r, c.g, c.b) || 1;
    return c.multiplyScalar(1 / m);
  },

  tune(key, value) {
    Gfx.CEL[key] = value;
    const u = Gfx._celU;
    if (!u) return;
    const map = { steps: 'celSteps', softness: 'celSoft', floor: 'celFloor',
                  shadowAmt: 'celShadowAmt', lightAmt: 'celLightAmt', shadeFloor: 'celShadeFloor' };
    if (map[key]) u[map[key]].value = value;
    else if (key === 'shadeTint') u.celShadeTint.value = Gfx._normTint(value);
    else if (key === 'shadowTint') u.celShadowTint.value = Gfx.color(value);
    else if (key === 'lightTint') u.celLightTint.value = Gfx.color(value);
  },

  celPatch(mat) {
    if (!mat || mat.__cel || !Gfx.CEL.enabled) return mat;
    if (mat.isMeshBasicMaterial || mat.isShaderMaterial) return mat;
    mat.__cel = true;
    const prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (shader, renderer) => {
      if (prev) prev(shader, renderer);
      Object.assign(shader.uniforms, Gfx._celUniforms());

      shader.fragmentShader = shader.fragmentShader
        .replace('void main() {', `
          uniform float celSteps; uniform float celSoft; uniform float celFloor;
          uniform vec3 celShadowTint; uniform float celShadowAmt;
          uniform vec3 celLightTint;  uniform float celLightAmt;
          uniform float celShadeFloor; uniform vec3 celShadeTint;

          // Quantise a 0..1 ramp into hard steps with a controllable edge.
          // ★ The ramp is remapped into [celFloor, 1], not [0, 1]. With a
          // 3-step ramp the lowest band is ZERO direct light, which crushed all
          // foliage to solid black on the first attempt. The canon wants flat
          // colour with cel shadows, not silhouettes — and it is explicit that
          // shadows stay coloured and translucent, never black.
          float celRamp(float x) {
            float s = clamp(x, 0.0, 1.0) * celSteps;
            float i = floor(s);
            float f = fract(s);
            float e = smoothstep(0.5 - celSoft * celSteps, 0.5 + celSoft * celSteps, f);
            float q = (i + e) / celSteps;
            return celFloor + q * (1.0 - celFloor);
          }
          void main() {`)

        .replace('#include <lights_fragment_end>', `
          #include <lights_fragment_end>
          {
            vec3 dl = reflectedLight.directDiffuse;
            float m = max(dl.r, max(dl.g, dl.b));
            if (m > 0.0001) dl *= celRamp(m) / m;
            reflectedLight.directDiffuse = dl;

            // ★ warm the light, cool the shade. This is the canon's
            // "warm-vs-cool" and it is a CONTRAST, not a wash: tinting both
            // halves warm collapses every surface into one orange mass.
            float litness = clamp(m * 1.35, 0.0, 1.0);
            vec3 cool = celShadowTint * celShadowAmt + vec3(1.0 - celShadowAmt);
            vec3 warm = celLightTint  * celLightAmt  + vec3(1.0 - celLightAmt);
            reflectedLight.directDiffuse *= mix(cool, warm, litness);
            reflectedLight.indirectDiffuse *= mix(cool, vec3(1.0), litness);

            // the shade floor: lift total irradiance to a cool minimum so a
            // surface the key never reaches still reads as coloured shadow
            vec3 tot = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
            float tl = max(tot.r, max(tot.g, tot.b));
            reflectedLight.indirectDiffuse += max(0.0, celShadeFloor - tl) * celShadeTint;
          }`);
    };
    mat.needsUpdate = true;
    return mat;
  },

  _mats: {},
  mat(hex, opts) {
    const o = opts || {};
    const cache = o.cache !== false && !o.map;
    let key = null;
    if (cache) {
      key = hex + '|' + (o.flatShading === false ? 0 : 1) + '|' + (o.side || 0) +
            '|' + (o.transparent ? 1 : 0) + '|' + (o.opacity === undefined ? 1 : o.opacity) +
            '|' + (o.depthWrite === false ? 0 : 1);
      if (Gfx._mats[key]) return Gfx._mats[key];
    }
    const params = {

      flatShading: o.flatShading !== false,
    };
    if (o.map) params.map = o.map;

    if (o.vertexColors) params.vertexColors = true;
    if (o.side !== undefined) params.side = o.side;
    if (o.transparent) params.transparent = true;
    if (o.opacity !== undefined) params.opacity = o.opacity;
    if (o.depthWrite !== undefined) params.depthWrite = o.depthWrite;
    if (o.alphaTest !== undefined) params.alphaTest = o.alphaTest;
    if (o.polygonOffset) {
      params.polygonOffset = true;
      params.polygonOffsetFactor = o.polygonOffsetFactor === undefined ? -1 : o.polygonOffsetFactor;
    }
    const m = new THREE.MeshLambertMaterial(params);
    m.color.copy(Gfx.color(hex === undefined ? 0xffffff : hex));
    Gfx.celPatch(m);
    if (cache) Gfx._mats[key] = m;
    return m;
  },

  unlit(hex, opts) {
    const o = opts || {};
    const params = { transparent: !!o.transparent };
    if (o.map) params.map = o.map;
    if (o.opacity !== undefined) params.opacity = o.opacity;
    if (o.side !== undefined) params.side = o.side;
    if (o.depthWrite !== undefined) params.depthWrite = o.depthWrite;
    if (o.depthTest !== undefined) params.depthTest = o.depthTest;
    if (o.alphaTest !== undefined) params.alphaTest = o.alphaTest;
    if (o.fog !== undefined) params.fog = o.fog;
    const m = new THREE.MeshBasicMaterial(params);
    if (hex !== undefined) m.color.copy(Gfx.color(hex));
    return m;
  },

  patchScene(scene) {
    if (!Gfx.CEL.enabled || !scene) return 0;
    let n = 0;
    scene.traverse(o => {
      if (!o.material) return;
      const list = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of list) if (!m.__cel && !m.isMeshBasicMaterial && !m.isShaderMaterial) {
        Gfx.celPatch(m); n++;
      }
    });
    return n;
  },

  ERA_GRADE: {

    0: {
      sky: ['#4f86b0', '#9fc4c0', '#e8ecc9'],
      hemi: [0xdfeacb, 0x6f7a3a, 0.82],
      sun: [0xfff6dc, 1.22], fog: 0xdfe8c8, fogN: 90, fogF: 300, expo: 0.95,
      apron: 0xa8b477,
      sunDir: [-84, 78, -50],
      water: { color: 0x2f8f86, shallow: 0x7fc9b4, opacity: 0.84,
               glint: 0xd6f0e4, glintAmt: 0.22 },
    },
    1: {
      sky: ['#5b7fa8', '#9fb9cc', '#dfe8ee'],
      hemi: [0xdfe9f2, 0x8fa4b5, 0.86],
      sun: [0xfff2e2, 1.18], fog: 0xd9e4ec, fogN: 120, fogF: 400, expo: 0.80,
      apron: 0xd3dde5,

      sunDir: [-92, 58, -66],

      water: { color: 0x3d6274, shallow: 0x8fb4c4, opacity: 0.93,
               glint: 0xdcecf4, glintAmt: 0.26 },
    },

    2: {
      sky: ['#6a86a4', '#a8b6bd', '#ded6c4'],
      hemi: [0xd2dae0, 0x9a8a70, 0.74],
      sun: [0xfff0d8, 1.22], fog: 0xd6d2c6, fogN: 105, fogF: 340, expo: 0.92,
      apron: 0xb9b2a4,
      sunDir: [-88, 66, -54],
      water: { color: 0x35707e, shallow: 0x7fb0b8, opacity: 0.90,
               glint: 0xd8ecef, glintAmt: 0.24 },
    },

    3: {
      sky: ['#5f8fc4', '#a8bcc9', '#e2d9c0'],
      hemi: [0xcfd8e2, 0xb5a482, 0.74],
      sun: [0xfff4de, 1.22], fog: 0xdcd5c2, fogN: 140, fogF: 460, expo: 0.92,
      apron: 0xc4bda6, sunDir: [-88, 66, -56],
      water: { color: 0x4a7f86, shallow: 0x8fb4b2, opacity: 0.90,
               glint: 0xd6e8e6, glintAmt: 0.22 },
    },

    4: {
      sky: ['#6f9dc0', '#b9c9cb', '#f2dcae'],
      hemi: [0x8ea8cc, 0xb08347, 0.78],
      sun: [0xffd995, 1.15],

      fog: 0xe7cfa6, fogN: 110, fogF: 360, expo: 0.875,
      apron: 0xd6bd91,

      sunDir: [-96, 73, -58],

      water: { color: 0x2f5049, shallow: 0x6d9086, opacity: 0.88,
               glint: 0xc8dcd6, glintAmt: 0.20 },
    },
    5: {
      sky: ['#8fb2cf', '#cfd3c8', '#eadcc0'], hemi: [0xe6dcc6, 0xc0a173, 0.60],
      sun: [0xfff1d4, 1.35], fog: 0xe6dcc6, fogN: 95, fogF: 310, expo: 1.02,
      apron: 0xcbb894, sunDir: [-84, 52, -50],
      water: { color: 0x4f7f8e, opacity: 0.88, shininess: 30, specular: 0x1d3140 },
    },
    14: {
      sky: ['#79aecb', '#bfd2c6', '#dfe0c4'], hemi: [0xdfe4cf, 0x8f9a63, 0.68],
      sun: [0xfff3dc, 1.20], fog: 0xdfe4cf, fogN: 100, fogF: 320, expo: 1.05,
      apron: 0xb9c4a0, sunDir: [-70, 76, -46],
      water: { color: 0x3f8f96, opacity: 0.86, shininess: 34, specular: 0x24404a },
    },
    30: {
      sky: ['#8c9aa6', '#bcbdb6', '#d8cfc0'], hemi: [0xd6d4cc, 0x7a7468, 0.72],
      sun: [0xffeed2, 1.05], fog: 0xcfc9bd, fogN: 80, fogF: 280, expo: 1.05,
      apron: 0x9a958a, sunDir: [-72, 60, -48],
      water: { color: 0x4a5560, opacity: 0.90, shininess: 20, specular: 0x181d22 },
    },
    35: {
      sky: ['#2b3a5c', '#5f7391', '#a9b6c4'], hemi: [0xbfd0e8, 0x5a6472, 0.70],
      sun: [0xffffff, 1.15], fog: 0xa9b6c4, fogN: 110, fogF: 340, expo: 1.08,
      apron: 0x7b8794, sunDir: [-80, 70, -40],
      water: { color: 0x2e4a6b, opacity: 0.92, shininess: 60, specular: 0x30506e },
    },
  },

  gradeFor(era) {
    const keys = Object.keys(Gfx.ERA_GRADE).map(Number).sort((a, b) => a - b);
    let pick = keys[0];
    for (const k of keys) if (k <= rungOf(era)) pick = k;
    return Gfx.ERA_GRADE[pick];
  },

  SHADOW_HALF: 42,

  init(renderer, scene) {
    Gfx.renderer = renderer;
    Gfx.scene = scene;

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    Gfx.sun = new THREE.DirectionalLight(0xffffff, 1);
    Gfx.sun.castShadow = true;
    Gfx.sun.shadow.mapSize.set(2048, 2048);
    const SH = Gfx.SHADOW_HALF;
    Gfx.sun.shadow.camera.left = -SH; Gfx.sun.shadow.camera.right = SH;
    Gfx.sun.shadow.camera.top = SH;   Gfx.sun.shadow.camera.bottom = -SH;
    Gfx.sun.shadow.camera.near = 1;
    Gfx.sun.shadow.camera.far = 340;

    Gfx.sun.shadow.bias = -0.0004;
    Gfx.sun.shadow.normalBias = 0.045;
    Gfx.sun.shadow.camera.updateProjectionMatrix();
    scene.add(Gfx.sun);
    scene.add(Gfx.sun.target);

    Gfx.hemi = new THREE.HemisphereLight(0xffffff, 0x808080, 0.5);
    scene.add(Gfx.hemi);

    scene.fog = new THREE.Fog(new THREE.Color(0xd6dcc8), 110, 340);
    Gfx.initPost();
    Gfx.applyGrade(1);
  },

  applyGrade(era) {
    const gr = Gfx.gradeFor(era);
    if (!gr || !Gfx.renderer) return gr;
    Gfx.era = rungOf(era);
    Gfx.renderer.toneMappingExposure = gr.expo;

    const c = document.createElement('canvas');
    c.width = 16; c.height = 512;
    const g = c.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, gr.sky[0]);
    grad.addColorStop(0.55, gr.sky[1]);
    grad.addColorStop(1, gr.sky[2]);
    g.fillStyle = grad;
    g.fillRect(0, 0, 16, 512);
    const tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    if (Gfx.scene.background && Gfx.scene.background.dispose) Gfx.scene.background.dispose();
    Gfx.scene.background = tex;

    Gfx.hemi.color.copy(Gfx.color(gr.hemi[0]));
    Gfx.hemi.groundColor.copy(Gfx.color(gr.hemi[1]));
    Gfx.hemi.intensity = gr.hemi[2];

    Gfx.sun.color.copy(Gfx.color(gr.sun[0]));
    Gfx.sun.intensity = gr.sun[1];
    Gfx._sunDir = gr.sunDir || [-60, 90, -40];

    Gfx.scene.fog.color.copy(Gfx.color(gr.fog));
    Gfx.scene.fog.near = gr.fogN;
    Gfx.scene.fog.far = gr.fogF;
    return gr;
  },

  followShadow(tx, tz) {
    if (!Gfx.sun || !Gfx.sun.castShadow) return;
    const texel = (Gfx.SHADOW_HALF * 2) / Gfx.sun.shadow.mapSize.x;
    const sx = Math.round(tx / texel) * texel;
    const sz = Math.round(tz / texel) * texel;
    const d = Gfx._sunDir || [-60, 90, -40];
    Gfx.sun.target.position.set(sx, 0, sz);
    Gfx.sun.position.set(sx + d[0], d[1], sz + d[2]);
    Gfx.sun.target.updateMatrixWorld();
    Gfx.sun.updateMatrixWorld();
  },

  POST: {
    enabled: true,

    bloomThreshold: 0.68,
    bloomStrength: 0.26,
    bloomRadius: 1.35,
    contrast: 1.11,
    saturation: 1.23,
    lift: 0.004,
    vignette: 0.16,
    warmShift: 0.014,
  },

  setNeutral(on) {
    Gfx._neutral = !!on;
    const u = Gfx.matComposite && Gfx.matComposite.uniforms;
    if (!u) return;
    const P = Gfx.POST;
    u.bloomStrength.value = on ? 0 : P.bloomStrength;
    u.contrast.value = on ? 1 : P.contrast;
    u.saturation.value = on ? 1 : P.saturation;
    u.lift.value = on ? 0 : P.lift;
    u.vignette.value = on ? 0 : P.vignette;
    u.warmShift.value = on ? 0 : P.warmShift;
  },

  initPost() {
    const P = Gfx.POST;
    Gfx._postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const VERT = `varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

    Gfx.matBright = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, threshold: { value: P.bloomThreshold } },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tDiffuse; uniform float threshold; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          float k = max(0.0, l - threshold) / max(0.0001, 1.0 - threshold);
          gl_FragColor = vec4(c * k * k, 1.0);
        }`,
    });

    Gfx.matBlur = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        dir: { value: new THREE.Vector2(1, 0) },
        texel: { value: new THREE.Vector2(1 / 512, 1 / 512) },
        radius: { value: P.bloomRadius },
      },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tDiffuse; uniform vec2 dir; uniform vec2 texel;
        uniform float radius; varying vec2 vUv;
        void main(){
          float w[5]; w[0]=0.2270; w[1]=0.1946; w[2]=0.1216; w[3]=0.0540; w[4]=0.0162;
          vec3 sum = texture2D(tDiffuse, vUv).rgb * w[0];
          for (int i = 1; i < 5; i++) {
            vec2 o = dir * texel * float(i) * radius;
            sum += texture2D(tDiffuse, vUv + o).rgb * w[i];
            sum += texture2D(tDiffuse, vUv - o).rgb * w[i];
          }
          gl_FragColor = vec4(sum, 1.0);
        }`,
    });

    Gfx.matComposite = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null }, tBloom: { value: null },
        bloomStrength: { value: P.bloomStrength },
        contrast: { value: P.contrast }, saturation: { value: P.saturation },
        lift: { value: P.lift }, vignette: { value: P.vignette },
        warmShift: { value: P.warmShift },
      },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tDiffuse; uniform sampler2D tBloom;
        uniform float bloomStrength, contrast, saturation, lift, vignette, warmShift;
        varying vec2 vUv;
        void main(){
          // arrives LINEAR — guaranteed by the half-float linear target rather
          // than hoped for from an sRGB format (see trap #2 in resize()). Bloom
          // accumulates here, which is the correct space for it, and THEN the
          // image is encoded to display space — contrast, saturation and
          // vignette all behave predictably there and wildly otherwise.
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          c += texture2D(tBloom, vUv).rgb * bloomStrength;
          c = max(c, vec3(0.0));
          // exact sRGB transfer, linear toe included (see trap #3)
          c = mix(c * 12.92,
                  1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055,
                  step(vec3(0.0031308), c));

          // filmic S-curve around mid grey: a real black point and a rolled
          // highlight instead of a flat linear ramp
          c = (c - 0.5) * contrast + 0.5;

          // split-tone: warm the highlights, cool the shadows. Most of what
          // makes a render read as "graded" rather than raw.
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c.r += warmShift * l;
          c.b -= warmShift * l * 0.85;
          c.b += warmShift * (1.0 - l) * 0.55;

          float g = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(g), c, saturation);
          c += lift;

          vec2 d = vUv - 0.5;
          float v = 1.0 - dot(d, d) * vignette * 2.2;
          c *= clamp(v, 0.0, 1.0);

          gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
        }`,
    });

    Gfx._postScene = new THREE.Scene();
    Gfx._fsQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), Gfx.matComposite);
    Gfx._postScene.add(Gfx._fsQuad);
  },

  resize(w, h) {
    if (!Gfx.renderer) return;
    const pr = Gfx.renderer.getPixelRatio();
    const W = Math.max(2, Math.floor(w * pr)), H = Math.max(2, Math.floor(h * pr));
    const bW = Math.max(2, W >> 2), bH = Math.max(2, H >> 2);

    const base = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
    if (Gfx.rtScene) { Gfx.rtScene.dispose(); Gfx.rtBloomA.dispose(); Gfx.rtBloomB.dispose(); }

    const hdr = Object.assign({}, base, { type: THREE.HalfFloatType, encoding: THREE.LinearEncoding });
    Gfx.rtScene = new THREE.WebGLRenderTarget(W, H, Object.assign({}, hdr, { samples: 4 }));
    Gfx.rtBloomA = new THREE.WebGLRenderTarget(bW, bH, hdr);
    Gfx.rtBloomB = new THREE.WebGLRenderTarget(bW, bH, hdr);
    Gfx.matBlur.uniforms.texel.value.set(1 / bW, 1 / bH);
  },

  _blit(mat, target) {
    Gfx._fsQuad.material = mat;
    Gfx.renderer.setRenderTarget(target || null);
    Gfx.renderer.render(Gfx._postScene, Gfx._postCam);
  },

  render(scene, camera) {
    const R = Gfx.renderer;
    if (!Gfx.POST.enabled || !Gfx.rtScene) {
      R.setRenderTarget(null);
      R.render(scene, camera);
      return;
    }
    R.setRenderTarget(Gfx.rtScene);
    R.render(scene, camera);

    Gfx.matBright.uniforms.tDiffuse.value = Gfx.rtScene.texture;
    Gfx._blit(Gfx.matBright, Gfx.rtBloomA);

    Gfx.matBlur.uniforms.tDiffuse.value = Gfx.rtBloomA.texture;
    Gfx.matBlur.uniforms.dir.value.set(1, 0);
    Gfx._blit(Gfx.matBlur, Gfx.rtBloomB);

    Gfx.matBlur.uniforms.tDiffuse.value = Gfx.rtBloomB.texture;
    Gfx.matBlur.uniforms.dir.value.set(0, 1);
    Gfx._blit(Gfx.matBlur, Gfx.rtBloomA);

    Gfx.matComposite.uniforms.tDiffuse.value = Gfx.rtScene.texture;
    Gfx.matComposite.uniforms.tBloom.value = Gfx.rtBloomA.texture;
    Gfx._blit(Gfx.matComposite, null);
  },
};

window.Gfx = Gfx;
