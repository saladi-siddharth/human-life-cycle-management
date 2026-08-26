/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE CONTINUUM BRIDGE — Spatial 3D Telemetry Canvas & Route Camera Engine
   - Persistent Low-Overhead Three.js WebGL Particle Pavilion in Dashboard Background
   - Smooth Camera Vector Lerp on Route Transitions (gsap / RAF interpolation)
   - Real-Time Kinetic Telemetry Shockwaves (Hydration, Skills, Workouts, Wealth)
   - Automatic 60 FPS RAF Clamping & Visibility Throttling
   ═══════════════════════════════════════════════════════════════════ */

const ContinuumBridge = {
  scene: null,
  camera: null,
  renderer: null,
  particles: null,
  pillars: [],
  targetCameraPos: { x: 0, y: 12, z: 35 },
  targetLookAt: { x: 0, y: 0, z: 0 },
  currentLookAt: { x: 0, y: 0, z: 0 },
  initialized: false,
  canvas: null,

  // Route Waypoints for Cinematic Camera Transitions
  WAYPOINTS: {
    '/dashboard': { x: 0, y: 12, z: 35, lookX: 0, lookY: 0, lookZ: 0, color: '#6366f1' },
    '/dashboard/career': { x: -18, y: 6, z: 22, lookX: -10, lookY: 0, lookZ: 0, color: '#00f2fe' },
    '/student/colleges': { x: -20, y: 8, z: 24, lookX: -12, lookY: 0, lookZ: 0, color: '#00f2fe' },
    '/student/scholarships': { x: -22, y: 7, z: 22, lookX: -12, lookY: 0, lookZ: 0, color: '#10b981' },
    '/student/internships': { x: -18, y: 5, z: 20, lookX: -10, lookY: 0, lookZ: 0, color: '#f59e0b' },
    '/employee/salary': { x: -15, y: 6, z: 22, lookX: -8, lookY: 0, lookZ: 0, color: '#10b981' },
    '/employee/jobs': { x: -18, y: 7, z: 24, lookX: -10, lookY: 0, lookZ: 0, color: '#00f2fe' },
    '/business/overview': { x: 0, y: 18, z: 30, lookX: 0, lookY: 2, lookZ: 0, color: '#00f2fe' },
    '/business/fundraising': { x: 8, y: -4, z: 25, lookX: 4, lookY: 0, lookZ: 0, color: '#f59e0b' },
    '/dashboard/health': { x: 18, y: 6, z: 22, lookX: 10, lookY: 0, lookZ: 0, color: '#10b981' },
    '/dashboard/finance': { x: 0, y: -8, z: 26, lookX: 0, lookY: -2, lookZ: 0, color: '#f59e0b' },
    '/dashboard/work': { x: 0, y: 22, z: 20, lookX: 0, lookY: 0, lookZ: 0, color: '#ec4899' },
    '/dashboard/life': { x: 0, y: 26, z: 24, lookX: 0, lookY: 4, lookZ: 0, color: '#8b5cf6' }
  },

  init() {
    if (this.initialized || typeof THREE === 'undefined') return;

    // 1. Create or get Background Canvas
    let canvas = document.getElementById('continuum-bg-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'continuum-bg-canvas';
      canvas.style.position = 'fixed';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.opacity = '0.45';
      canvas.style.transition = 'opacity 0.8s ease';
      document.body.prepend(canvas);
    }
    this.canvas = canvas;

    // 2. Setup Three.js Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070a14, 0.025);

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 12, 35);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Build Monolith Pillars & Kinetic Particle Field
    this.buildParticleField();
    this.buildPillars();
    this.buildKineticVortex();

    // 4. Resize and Visibility Listeners
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.isPaused = true;
      else this.isPaused = false;
    });

    // 5. Telemetry Listener
    window.addEventListener('bioverse:action', (e) => this.onTelemetryAction(e.detail));

    this.initialized = true;
    this.animate();
  },

  buildParticleField() {
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color(0x00f2fe);
    const accentColor = new THREE.Color(0x6366f1);
    const emeraldColor = new THREE.Color(0x10b981);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const choice = Math.random();
      const col = choice < 0.4 ? baseColor : choice < 0.7 ? accentColor : emeraldColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  },

  buildPillars() {
    const pillarConfigs = [
      { x: -16, y: 0, z: -5, color: 0x00f2fe, name: 'Career' },
      { x: 16, y: 0, z: -5, color: 0x10b981, name: 'Health' },
      { x: 0, y: -6, z: -10, color: 0xf59e0b, name: 'Wealth' },
      { x: 0, y: 12, z: -12, color: 0x8b5cf6, name: 'Purpose' }
    ];

    pillarConfigs.forEach(cfg => {
      const geo = new THREE.CylinderGeometry(0.8, 1.2, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      this.scene.add(mesh);
      this.pillars.push(mesh);
    });
  },

  buildKineticVortex() {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-25, 0, 10),
      new THREE.Vector3(-10, 8, -5),
      new THREE.Vector3(0, -4, -15),
      new THREE.Vector3(10, 8, -5),
      new THREE.Vector3(25, 0, 10),
      new THREE.Vector3(0, 18, 0)
    ], true);

    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.15, 8, true);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.28,
      wireframe: true
    });
    this.vortex = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(this.vortex);
  },

  onResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  },

  syncToRoute(route) {
    const wp = this.WAYPOINTS[route] || this.WAYPOINTS['/dashboard'];
    this.targetCameraPos = { x: wp.x, y: wp.y, z: wp.z };
    this.targetLookAt = { x: wp.lookX, y: wp.lookY, z: wp.lookZ };
  },

  onTelemetryAction(detail) {
    if (!this.particles) return;
    const { type, magnitude = 1.0 } = detail || {};

    // Temporary shockwave boost in particle scale & speed
    this.shockwaveTime = Date.now() + 1200;
    if (this.particles.material) {
      this.particles.material.size = 2.4 * magnitude;
      setTimeout(() => {
        if (this.particles && this.particles.material) {
          this.particles.material.size = 1.4;
        }
      }, 900);
    }
  },

  animate() {
    if (this.isPaused) {
      requestAnimationFrame(() => this.animate());
      return;
    }

    // Smooth Camera Vector Lerp
    this.camera.position.x += (this.targetCameraPos.x - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.targetCameraPos.y - this.camera.position.y) * 0.05;
    this.camera.position.z += (this.targetCameraPos.z - this.camera.position.z) * 0.05;

    this.currentLookAt.x += (this.targetLookAt.x - this.currentLookAt.x) * 0.05;
    this.currentLookAt.y += (this.targetLookAt.y - this.currentLookAt.y) * 0.05;
    this.currentLookAt.z += (this.targetLookAt.z - this.currentLookAt.z) * 0.05;
    this.camera.lookAt(this.currentLookAt.x, this.currentLookAt.y, this.currentLookAt.z);

    // Rotate Particles & Pillars gently
    if (this.particles) {
      this.particles.rotation.y += 0.0008;
      this.particles.rotation.x += 0.0003;
    }

    if (this.pillars) {
      this.pillars.forEach((p, idx) => {
        p.rotation.y += 0.004 * (idx % 2 === 0 ? 1 : -1);
      });
    }

    if (this.vortex) {
      this.vortex.rotation.y += 0.0012;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
};

window.ContinuumBridge = ContinuumBridge;
