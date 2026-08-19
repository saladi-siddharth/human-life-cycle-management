/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE 3D WATER GLASS & LIQUID PHYSICS ENGINE
   ═══════════════════════════════════════════════════════════════════ */

const WaterPhysicsEngine = {
  _audioCtx: null,

  getAudioContext() {
    if (!this._audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this._audioCtx = new AudioCtx();
    }
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      this._audioCtx.resume().catch(() => {});
    }
    return this._audioCtx;
  },

  playSound(type = 'pour') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'pour') {
        // Water stream gurgle noise
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.sin(i * 0.05);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.35);
        filter.Q.setValueAtTime(4.0, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'splash') {
        // Liquid surface splash impact
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'ice') {
        // High-pitched crystal ice clink chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // Audio fallback
    }
  },

  // Trigger Liquid Wave Sloshing Surface Tilt
  sloshGlass() {
    const glass = document.getElementById('tumbler-3d-container');
    const surface = document.getElementById('water-surface-3d');
    if (!glass || !surface) return;

    glass.classList.add('glass-slosh-anim');
    surface.classList.add('surface-wave-active');

    this.playSound('ice');

    setTimeout(() => {
      glass.classList.remove('glass-slosh-anim');
      surface.classList.remove('surface-wave-active');
    }, 800);
  },

  // Pour Water with 3D Stream & Particle Splash
  pourWater(amountMl) {
    const glass = document.getElementById('tumbler-3d-container');
    if (!glass) {
      Store.logWater(amountMl);
      Router.render();
      return;
    }

    this.playSound('pour');

    // Create 3D Liquid Stream overlay
    const rect = glass.getBoundingClientRect();
    const stream = document.createElement('div');
    stream.className = 'liquid-pour-stream-3d';
    stream.style.left = `${rect.left + rect.width / 2 - 4}px`;
    stream.style.top = `${rect.top - 80}px`;
    stream.style.height = `120px`;

    document.body.appendChild(stream);

    // Trigger Stream Animation
    requestAnimationFrame(() => {
      stream.style.opacity = '1';
      stream.style.transform = 'scaleY(1)';
    });

    setTimeout(() => {
      this.playSound('splash');
      this.createWaterSplashes(rect.left + rect.width / 2, rect.top + 30);

      // Remove Stream
      stream.style.opacity = '0';
      setTimeout(() => {
        if (stream.parentNode) stream.parentNode.removeChild(stream);
      }, 200);

      // Perform Store Update & Slosh
      Store.logWater(amountMl);
      this.sloshGlass();
      Router.render();

      UI.toast('success', 'Hydrated! 🚰', `Added +${amountMl}ml of pure water to your 3D glass.`);
    }, 350);
  },

  createWaterSplashes(x, y) {
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div');
      p.className = 'water-splash-droplet';
      const size = Math.random() * 6 + 3;
      const angle = Math.random() * Math.PI - Math.PI; // upward arc
      const speed = Math.random() * 40 + 20;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      p.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: #38bdf8;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 8px #0284c7;
        transition: transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease-out;
      `;

      document.body.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate3d(${vx}px, ${vy}px, 0) scale(0.2)`;
        p.style.opacity = '0';
      });

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 450);
    }
  },

  render3DWaterGlass() {
    const healthData = Store.get('health') || {};
    const waterIntake = healthData.waterIntake || 0;
    const waterTarget = healthData.waterTarget || 2500;
    const fillPercent = Math.min(100, Math.round((waterIntake / waterTarget) * 100));

    return `
      <div class="glass-tracker-card" style="display:flex;flex-direction:column;align-items:center;padding:24px;background:var(--bg-secondary);border-radius:var(--radius-xl);border:1px solid var(--glass-border);position:relative;">
        <div style="width:100%;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h3 style="margin:0;display:flex;align-items:center;gap:10px;">
            <span class="badge badge-cyan" style="font-size:14px;padding:4px 10px;">3D Fluid Physics</span>
            Hydration Tumbler
          </h3>
          <span style="font-size:var(--text-sm);font-weight:700;color:var(--cyan);font-family:var(--font-mono);">
            ${waterIntake} / ${waterTarget} ml (${fillPercent}%)
          </span>
        </div>

        <!-- 3D Glass Container -->
        <div id="tumbler-3d-container" class="tumbler-3d-outer" onclick="WaterPhysicsEngine.sloshGlass()" data-tooltip="Click glass to slosh liquid!">
          
          <!-- Top Glass Rim Refraction Ring -->
          <div class="glass-rim-3d"></div>
          
          <!-- Specular Light Highlights -->
          <div class="glass-glare glare-left"></div>
          <div class="glass-glare glare-right"></div>

          <!-- Water Liquid Fill -->
          <div class="water-liquid-3d" style="height:${fillPercent}%;">
            
            <!-- Dynamic 3D Liquid Wave Surface -->
            <div id="water-surface-3d" class="water-surface-3d">
              <div class="wave-layer wave-1"></div>
              <div class="wave-layer wave-2"></div>
            </div>

            <!-- Floating 3D Buoyant Ice Cubes -->
            <div class="ice-cube-3d ice-1"></div>
            <div class="ice-cube-3d ice-2"></div>

            <!-- Rising Air Bubbles -->
            <div class="bubble-3d b1"></div>
            <div class="bubble-3d b2"></div>
            <div class="bubble-3d b3"></div>
            <div class="bubble-3d b4"></div>
          </div>

          <!-- Thick Heavy Glass Base -->
          <div class="glass-base-3d"></div>
        </div>

        <!-- Quick Log Action Controls -->
        <div style="display:flex;gap:12px;margin-top:20px;width:100%;justify-content:center;">
          <button class="btn btn-outline btn-sm hover-lift" onclick="WaterPhysicsEngine.pourWater(250)">
            <i class="fas fa-glass-water"></i> +250ml Glass
          </button>
          <button class="btn btn-primary btn-sm hover-lift" onclick="WaterPhysicsEngine.pourWater(500)">
            <i class="fas fa-bottle-water"></i> +500ml Bottle
          </button>
          <button class="btn btn-accent btn-sm hover-lift" onclick="WaterPhysicsEngine.pourWater(750)">
            <i class="fas fa-wine-bottle"></i> +750ml Flask
          </button>
          <button class="btn btn-ghost btn-sm" onclick="Store.set('health.waterIntake', 0); Router.render(); UI.toast('info','Reset','Water intake reset to 0ml.')" data-tooltip="Reset Intake">
            <i class="fas fa-rotate-left"></i>
          </button>
        </div>
      </div>
    `;
  }
};
