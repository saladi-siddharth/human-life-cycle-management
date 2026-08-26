/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE CELESTIAL ACTION PHYSICS & 10 HANDCRAFTED DOMAIN ANIMATIONS
   Ultra-Smooth 60FPS Full-Screen Particle Physics, Audio DSP & Micro-Interactions
   ═══════════════════════════════════════════════════════════════════ */

const ActionPhysics = {
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

  _ambientSource: null,
  _ambientGain: null,

  // ─── Web Audio DSP Synthesizer ─────────────────────────────
  playSound(type = 'sloth') {
    try {
      if (typeof Store !== 'undefined' && Store.get('soundEnabled') === false) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'type') {
        // Soft mechanical keypress chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200 + Math.random() * 300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'sloth' || type === 'victory') {
        // Joyful 4-tone victory harmonic chime
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.22, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.28);
        });
      } else if (type === 'rocket') {
        // Rocket launch sweep whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.5);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'flex') {
        // Muscle workout flex power swoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.22);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'moon') {
        // Lullaby bell
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'wand' || type === 'sparkle') {
        // Magic wand starburst chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(3200, now + 0.22);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'waterSplash') {
        // Liquid splash sound
        [440, 600, 780, 960, 1200].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq + Math.random() * 80, now + idx * 0.035);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.035 + 0.08);
          gain.gain.setValueAtTime(0.18, now + idx * 0.035);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.035 + 0.09);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.035);
          osc.stop(now + idx * 0.035 + 0.09);
        });
      } else if (type === 'coinDrop') {
        // Metallic coin clinks
        [3200, 4800, 2400, 3600].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.045);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + idx * 0.045 + 0.12);
          gain.gain.setValueAtTime(0.22, now + idx * 0.045);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.045);
          osc.stop(now + idx * 0.045 + 0.12);
        });
      } else if (type === 'pomodoroBell') {
        // Tibetan singing bowl gong
        [432, 864, 1296].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.3 / (idx + 1), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 2.5);
        });
      }
    } catch (e) {}
  },

  // ─── Ambient Focus Soundscape ──────────────────────────────
  startAmbientNoise(mode = 'pink') {
    try {
      if (this._ambientSource) this.stopAmbientNoise();
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (mode === 'pink') {
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        } else {
          data[i] = white * 0.035;
        }
      }
      this._ambientSource = ctx.createBufferSource();
      this._ambientSource.buffer = buffer;
      this._ambientSource.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(mode === 'pink' ? 800 : 1800, ctx.currentTime);
      this._ambientGain = ctx.createGain();
      this._ambientGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this._ambientGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);
      this._ambientSource.connect(filter);
      filter.connect(this._ambientGain);
      this._ambientGain.connect(ctx.destination);
      this._ambientSource.start(0);
    } catch (e) {}
  },

  stopAmbientNoise() {
    try {
      if (this._ambientGain && this._audioCtx) {
        this._ambientGain.gain.linearRampToValueAtTime(0.001, this._audioCtx.currentTime + 0.8);
      }
      setTimeout(() => {
        if (this._ambientSource) {
          try { this._ambientSource.stop(); } catch (e) {}
          this._ambientSource = null;
        }
      }, 900);
    } catch (e) {}
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🌟 HIGH-PERFORMANCE 60FPS FULL-SCREEN CANVAS CELEBRATION ENGINE 🌟
  // ═══════════════════════════════════════════════════════════════════
  launchCelebration(preset = 'career', title = 'Action Completed!', subtitle = 'Synchronized with BioVerse Matrix') {
    const soundMap = {
      career: 'wand',
      health: 'flex',
      finance: 'coinDrop',
      work: 'wand',
      life: 'sloth',
      student: 'sloth',
      business: 'coinDrop'
    };
    this.playSound(soundMap[preset] || 'wand');

    let canvas = document.getElementById('bioverse-celebration-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'bioverse-celebration-canvas';
      canvas.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 999999;
      `;
      document.body.appendChild(canvas);
    }

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const themeConfig = {
      career: {
        colors: ['#00f2fe', '#4facfe', '#6366f1', '#a855f7', '#fbbf24', '#ffffff'],
        icon: '🚀',
        badgeBg: 'rgba(0, 242, 254, 0.18)',
        badgeBorder: '#00f2fe',
        auraGlow: 'rgba(0, 242, 254, 0.85)'
      },
      health: {
        colors: ['#10b981', '#059669', '#00f2fe', '#34d399', '#6ee7b7', '#ffffff'],
        icon: '💧',
        badgeBg: 'rgba(16, 185, 129, 0.18)',
        badgeBorder: '#10b981',
        auraGlow: 'rgba(16, 185, 129, 0.85)'
      },
      finance: {
        colors: ['#fbbf24', '#f59e0b', '#10b981', '#ffd700', '#fef08a', '#ffffff'],
        icon: '🪙',
        badgeBg: 'rgba(251, 191, 36, 0.18)',
        badgeBorder: '#fbbf24',
        auraGlow: 'rgba(251, 191, 36, 0.85)'
      },
      work: {
        colors: ['#38bdf8', '#6366f1', '#ec4899', '#c084fc', '#818cf8', '#ffffff'],
        icon: '⚡',
        badgeBg: 'rgba(56, 189, 248, 0.18)',
        badgeBorder: '#38bdf8',
        auraGlow: 'rgba(56, 189, 248, 0.85)'
      },
      life: {
        colors: ['#ec4899', '#f43f5e', '#a855f7', '#fbbf24', '#00f2fe', '#10b981'],
        icon: '🌟',
        badgeBg: 'rgba(236, 72, 153, 0.18)',
        badgeBorder: '#ec4899',
        auraGlow: 'rgba(236, 72, 153, 0.85)'
      },
      student: {
        colors: ['#6366f1', '#8b5cf6', '#00f2fe', '#fbbf24', '#10b981', '#ffffff'],
        icon: '🎓',
        badgeBg: 'rgba(99, 102, 241, 0.18)',
        badgeBorder: '#6366f1',
        auraGlow: 'rgba(99, 102, 241, 0.85)'
      },
      business: {
        colors: ['#00f2fe', '#10b981', '#fbbf24', '#6366f1', '#38bdf8', '#ffffff'],
        icon: '🏢',
        badgeBg: 'rgba(0, 242, 254, 0.18)',
        badgeBorder: '#00f2fe',
        auraGlow: 'rgba(0, 242, 254, 0.85)'
      }
    };

    const cfg = themeConfig[preset] || themeConfig.career;

    const particles = [];
    const originX = width / 2;
    const originY = height / 2;

    for (let i = 0; i < 95; i++) {
      const angle = (i / 95) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = 4 + Math.random() * 12;
      const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
      const size = Math.random() * 8 + 4;
      const isCoin = preset === 'finance' && Math.random() > 0.4;
      const isRibbon = (preset === 'life' || preset === 'student') && Math.random() > 0.5;

      particles.push({
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        gravity: 0.18 + Math.random() * 0.12,
        drag: 0.97,
        size: size,
        color: color,
        alpha: 1.0,
        decay: 0.012 + Math.random() * 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        wobble: Math.random() * Math.PI * 2,
        isCoin: isCoin,
        isRibbon: isRibbon,
        sparkle: Math.random() > 0.6
      });
    }

    const badge = {
      scale: 0.1,
      targetScale: 1.0,
      opacity: 1.0,
      shockwaveRadius: 10,
      shockwaveAlpha: 1.0
    };

    let animationFrameId = null;
    const startTime = performance.now();
    const duration = 2200;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, width, height);

      // Expanding Shockwave Ring
      if (badge.shockwaveAlpha > 0) {
        badge.shockwaveRadius += (width * 0.55 - badge.shockwaveRadius) * 0.08;
        badge.shockwaveAlpha = Math.max(0, 1 - (badge.shockwaveRadius / (width * 0.45)));

        ctx.save();
        ctx.beginPath();
        ctx.arc(originX, originY, badge.shockwaveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = cfg.auraGlow;
        ctx.lineWidth = Math.max(1, 4 * badge.shockwaveAlpha);
        ctx.shadowColor = cfg.badgeBorder;
        ctx.shadowBlur = 25;
        ctx.globalAlpha = badge.shockwaveAlpha * 0.75;
        ctx.stroke();
        ctx.restore();
      }

      // Kinetic Physics Particles
      particles.forEach(p => {
        if (p.alpha <= 0) return;

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.wobble += 0.1;
        p.alpha -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.isCoin) {
          // 🪙 3D Spinning Coin
          const coinWidth = p.size * 1.8 * Math.cos(p.wobble);
          ctx.beginPath();
          ctx.ellipse(0, 0, Math.abs(coinWidth) + 1, p.size * 1.4, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.isRibbon) {
          // 🎉 Confetti Ribbon
          const ribbonW = p.size * 1.6;
          const ribbonH = p.size * 2.8 * Math.sin(p.wobble);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillRect(-ribbonW / 2, -Math.abs(ribbonH) / 2, ribbonW, Math.abs(ribbonH) + 1);
        } else {
          // ✨ Starburst / Orb
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.sparkle ? 14 : 6;
          ctx.fill();
        }
        ctx.restore();
      });

      // Floating 3D Central Glass Badge
      badge.scale += (badge.targetScale - badge.scale) * 0.15;
      if (elapsed > 1600) {
        badge.opacity = Math.max(0, 1 - (elapsed - 1600) / 500);
      }

      if (badge.opacity > 0) {
        ctx.save();
        ctx.translate(originX, originY);
        ctx.scale(badge.scale, badge.scale);
        ctx.globalAlpha = badge.opacity;

        const cardW = Math.min(width - 40, 360);
        const cardH = 110;
        const radius = 22;

        ctx.shadowColor = cfg.auraGlow;
        ctx.shadowBlur = 35;
        ctx.fillStyle = 'rgba(7, 10, 20, 0.94)';
        ctx.beginPath();
        ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, radius);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = cfg.badgeBorder;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '36px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cfg.icon, -cardW / 2 + 45, 0);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(title.length > 26 ? title.substring(0, 24) + '...' : title, -cardW / 2 + 82, -8);

        ctx.fillStyle = cfg.badgeBorder;
        ctx.font = '600 12px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText(subtitle, -cardW / 2 + 82, 14);

        ctx.fillStyle = cfg.badgeBg;
        ctx.beginPath();
        ctx.roundRect(-cardW / 2 + 82, 24, 150, 18, 9);
        ctx.fill();
        ctx.strokeStyle = cfg.badgeBorder;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9.5px "Inter", monospace';
        ctx.fillText('✨ TELEMETRY RECORDED', -cardW / 2 + 90, 37);

        ctx.restore();
      }

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(animate);
  },

  // ═══════════════════════════════════════════════════════════════════
  // 🎨 10 HANDCRAFTED DOMAIN SUBMISSION ANIMATION RENDERERS 🎨
  // ═══════════════════════════════════════════════════════════════════

  // 1. 🚀 Career: Supernova Celestial Burst (32 glowing radial particles)
  supernovaBurst(type = 'skill', label = 'Skill Mastered!') {
    this.launchCelebration('career', label, 'Career Skills Matrix Level Up 🚀');

    const overlay = document.createElement('div');
    overlay.className = 'action-supernova-overlay';
    overlay.innerHTML = `
      <div class="supernova-center">
        <span>🚀</span>
      </div>
    `;
    document.body.appendChild(overlay);

    const colors = ['#00f2fe', '#6366f1', '#a855f7', '#38bdf8', '#fbbf24', '#ffffff'];
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const dist = 140 + Math.random() * 110;
      const p = document.createElement('div');
      p.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: ${colors[i % colors.length]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000000;
        box-shadow: 0 0 14px currentColor;
        transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out;
      `;
      document.body.appendChild(p);

      requestAnimationFrame(() => {
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        p.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 900);
    }

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1200);
  },

  // 2. 🚀 Career: 3D Rocket Launch
  rocketLaunch(company = 'Top Company', role = 'Role') {
    this.launchCelebration('career', `${role} @ ${company}`, 'Opportunity Tracked & Launched 🚀');

    const overlay = document.createElement('div');
    overlay.className = 'action-rocket-overlay';
    overlay.innerHTML = `
      <div class="rocket-launch-vehicle">
        <div style="font-size:56px;filter:drop-shadow(0 0 20px #00f2fe);">🚀</div>
        <div class="rocket-flame-exhaust"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1800);
  },

  // 3. 💪 Health: Dumbbell Power Flex
  dumbbellFlex(workoutType = 'Workout') {
    this.launchCelebration('health', `${workoutType} Complete`, 'Muscle Hypertrophy & Vitality 💪');

    const overlay = document.createElement('div');
    overlay.className = 'action-flex-overlay';
    overlay.innerHTML = `
      <div class="flex-power-card">
        <div style="font-size:58px;filter:drop-shadow(0 0 25px #10b981);">🏋️‍♂️</div>
        <div style="font-size:18px;font-weight:900;color:#fff;margin-top:10px;">POWER FLEX COMPLETE!</div>
        <div style="font-size:13px;color:#10b981;font-weight:700;">+25 Physical Vitality XP</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1400);
  },

  // 4. 💧 Health: Emerald Bioluminescence Pulse (24 droplets)
  emeraldPulse(label = 'Health Synchronized') {
    this.launchCelebration('health', label, 'Hydration & Vitality Compounded 💧');

    const overlay = document.createElement('div');
    overlay.className = 'action-emerald-overlay';
    overlay.innerHTML = `
      <div class="emerald-ripple-core">
        <div style="font-size:46px;">💧</div>
      </div>
    `;
    document.body.appendChild(overlay);

    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const dist = 110 + Math.random() * 90;
      const drop = document.createElement('div');
      drop.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background: ${i % 2 === 0 ? '#10b981' : '#00f2fe'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000000;
        box-shadow: 0 0 12px #10b981;
        transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease;
      `;
      document.body.appendChild(drop);

      requestAnimationFrame(() => {
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        drop.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(0)`;
        drop.style.opacity = '0';
      });

      setTimeout(() => {
        if (drop.parentNode) drop.parentNode.removeChild(drop);
      }, 800);
    }

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1400);
  },

  // 5. 🌙 Health: Lunar Circadian Rest
  moonSleep(hours = 8) {
    this.launchCelebration('health', `${hours}h Rest Logged`, 'Circadian Rhythm Restored 🌙');

    const overlay = document.createElement('div');
    overlay.className = 'action-moon-overlay';
    overlay.innerHTML = `
      <div class="moon-sphere">
        <span>🌙</span>
        <span class="zzz-bubble z1">Z</span>
        <span class="zzz-bubble z2">z</span>
        <span class="zzz-bubble z3">z</span>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1800);
  },

  // 6. 🪙 Finance: 3D Gold Coin Rain (18 coins)
  goldCoinShower(amount = '₹25,000') {
    this.launchCelebration('finance', `${amount} Recorded`, 'Compounding Wealth Multiplier 💰');

    const overlay = document.createElement('div');
    overlay.className = 'action-coin-overlay';
    document.body.appendChild(overlay);

    for (let i = 0; i < 18; i++) {
      const coin = document.createElement('div');
      coin.className = 'gold-coin-falling';
      const startLeft = Math.random() * (window.innerWidth - 60) + 30;
      const delay = Math.random() * 0.4;
      coin.style.left = `${startLeft}px`;
      coin.style.animationDelay = `${delay}s`;
      coin.innerHTML = '🪙';
      overlay.appendChild(coin);
    }

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1800);
  },

  // 7. 💰 Finance: Wealth Shockwave Ring
  wealthShockwave(amount = '₹1,00,000') {
    this.launchCelebration('finance', `${amount} Compounding`, 'Wealth Boundary Shockwave 🪙');

    const ring = document.createElement('div');
    ring.className = 'wealth-shockwave-ring';
    document.body.appendChild(ring);

    setTimeout(() => {
      if (ring.parentNode) ring.parentNode.removeChild(ring);
    }, 1600);
  },

  // 8. ⚡ Work: Quantum Vortex Focus Portal
  quantumPortal(title = 'Task Scheduled') {
    this.launchCelebration('work', title, 'Priority Scheduled in Focus Matrix ⚡');

    const portal = document.createElement('div');
    portal.className = 'quantum-vortex-portal';
    portal.innerHTML = `
      <div style="font-size:46px;">⚡</div>
      <div style="font-size:12px;font-weight:800;color:#38bdf8;margin-top:6px;">FOCUS PORTAL</div>
    `;
    document.body.appendChild(portal);

    setTimeout(() => {
      portal.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      portal.style.transform = 'translate(-50%, -50%) scale(0)';
      portal.style.opacity = '0';
      setTimeout(() => {
        if (portal.parentNode) portal.parentNode.removeChild(portal);
      }, 400);
    }, 1400);
  },

  // 9. 🪄 Work: Magic Wand Starburst
  magicTask(title = 'Task Complete') {
    this.launchCelebration('work', title, 'Execution Velocity +20 XP 🏆');

    const wand = document.createElement('div');
    wand.className = 'wand-starburst-center';
    wand.innerHTML = '🪄✨';
    document.body.appendChild(wand);

    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const dist = 100 + Math.random() * 80;
      const spark = document.createElement('div');
      spark.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        background: #a855f7;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000000;
        box-shadow: 0 0 10px #c084fc;
        transition: transform 0.65s ease-out, opacity 0.65s ease-out;
      `;
      document.body.appendChild(spark);

      requestAnimationFrame(() => {
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        spark.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => {
        if (spark.parentNode) spark.parentNode.removeChild(spark);
      }, 700);
    }

    setTimeout(() => {
      if (wand.parentNode) wand.parentNode.removeChild(wand);
    }, 1200);
  },

  // 10. 🌟 Life: Cute Sloth "Hurray!" Party Mascot (35 confetti pieces)
  slothCelebration(goalTitle = 'New Milestone') {
    this.playSound('sloth');
    this.launchCelebration('life', goalTitle, '5-Pillar Equilibrium Achieved 🌟');

    const overlay = document.createElement('div');
    overlay.className = 'sloth-celebration-overlay';
    overlay.innerHTML = `
      <div class="sloth-modal-card">
        <div class="confetti-container-sloth" id="sloth-confetti-box"></div>
        
        <!-- Celebratory Speech Bubble -->
        <div class="sloth-speech-bubble">
          <span>🎉 HURRAY! GOAL UNLOCKED! 🦥</span>
          <span class="sloth-goal-title">${goalTitle}</span>
        </div>

        <!-- Animated SVG Sloth Wearing Party Hat with Waving Arms -->
        <div class="sloth-character-wrapper">
          <svg class="cute-sloth-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="130" rx="55" ry="45" fill="#8B5A2B"/>
            <ellipse cx="100" cy="135" rx="38" ry="32" fill="#D2B48C"/>
            
            <circle cx="100" cy="75" r="42" fill="#8B5A2B"/>
            <ellipse cx="100" cy="80" rx="34" ry="26" fill="#F5DEB3"/>
            
            <ellipse cx="82" cy="74" rx="12" ry="7" fill="#5C3A21" transform="rotate(-15 82 74)"/>
            <ellipse cx="118" cy="74" rx="12" ry="7" fill="#5C3A21" transform="rotate(15 118 74)"/>
            
            <circle cx="82" cy="74" r="4" fill="#000"/>
            <circle cx="118" cy="74" r="4" fill="#000"/>
            <circle cx="80" cy="72" r="1.5" fill="#FFF"/>
            <circle cx="116" cy="72" r="1.5" fill="#FFF"/>
            
            <ellipse cx="100" cy="84" rx="7" ry="5" fill="#3D2314"/>
            <path d="M 94 90 Q 100 96 106 90" stroke="#3D2314" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <circle cx="72" cy="84" r="5" fill="#FFB6C1" opacity="0.6"/>
            <circle cx="128" cy="84" r="5" fill="#FFB6C1" opacity="0.6"/>
            
            <!-- Festive Party Cone Hat -->
            <polygon points="100,20 80,55 120,55" fill="#EC4899"/>
            <polygon points="100,20 88,55 112,55" fill="#FBBF24"/>
            <circle cx="100" cy="18" r="6" fill="#00F2FE"/>
            
            <!-- Celebratory Left Waving Arm -->
            <g class="sloth-arm-left">
              <path d="M 60 110 Q 30 75 25 50" stroke="#8B5A2B" stroke-width="18" stroke-linecap="round" fill="none"/>
              <path d="M 25 50 L 22 42 M 25 50 L 27 40 M 25 50 L 32 43" stroke="#D2B48C" stroke-width="3" stroke-linecap="round"/>
            </g>
            
            <!-- Celebratory Right Waving Arm -->
            <g class="sloth-arm-right">
              <path d="M 140 110 Q 170 75 175 50" stroke="#8B5A2B" stroke-width="18" stroke-linecap="round" fill="none"/>
              <path d="M 175 50 L 178 42 M 175 50 L 173 40 M 175 50 L 168 43" stroke="#D2B48C" stroke-width="3" stroke-linecap="round"/>
            </g>
          </svg>
        </div>

        <button class="btn sloth-close-btn" onclick="this.closest('.sloth-celebration-overlay').remove()">
          Awesome, Let's Keep Growing! 🚀
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    // Spawn 35 Colorful Confetti Ribbons
    const confettiBox = overlay.querySelector('#sloth-confetti-box');
    if (confettiBox) {
      const colors = ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#00f2fe', '#ffd700'];
      for (let i = 0; i < 35; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
          position: absolute;
          width: ${Math.random() * 8 + 6}px;
          height: ${Math.random() * 12 + 8}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: -20px;
          left: ${Math.random() * 100}%;
          border-radius: 2px;
          animation: confettiDrop ${1.2 + Math.random() * 1.5}s linear infinite;
          animation-delay: ${Math.random() * 0.8}s;
        `;
        confettiBox.appendChild(piece);
      }
    }

    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 400);
      }
    }, 4500);
  },

  // ─── Extended Ecosystem Handcrafted Animation Helpers ─────
  
  // 11. 🎓 Student: Graduation Cap Tossing Vortex
  gradCapLaunch(name = 'Institute') {
    this.launchCelebration('student', name, 'NIRF Academic Target Updated 🎓');
    
    const overlay = document.createElement('div');
    overlay.className = 'action-gradcap-overlay';
    document.body.appendChild(overlay);

    for (let i = 0; i < 14; i++) {
      const cap = document.createElement('div');
      cap.className = 'grad-cap-toss';
      cap.innerHTML = '🎓';
      cap.style.left = `${Math.random() * 85 + 5}%`;
      cap.style.animationDelay = `${Math.random() * 0.4}s`;
      overlay.appendChild(cap);
    }

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1800);
  },

  // 12. 🏆 Student: Scholarship Golden Trophy Award
  trophyReward(title = 'Scholarship Awarded') {
    this.launchCelebration('student', title, 'Academic Scheme & Grant Synchronized 🏆');

    const overlay = document.createElement('div');
    overlay.className = 'action-trophy-overlay';
    overlay.innerHTML = `
      <div class="golden-trophy-card">
        <div style="font-size:64px;filter:drop-shadow(0 0 25px #fbbf24);">🏆</div>
        <div style="font-size:18px;font-weight:900;color:#fff;margin-top:10px;">SCHOLARSHIP VERIFIED!</div>
        <div style="font-size:13px;color:#fbbf24;font-weight:700;">+50 Merit Grant XP</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1600);
  },

  trophyShine(title = 'Scholarship', amount = '') {
    this.trophyReward(`${title} ${amount ? '(' + amount + ')' : ''}`);
  },

  // 13. 🦄 Business: Unicorn Surge
  unicornSurge(valuation = 'Seed Scale') {
    this.launchCelebration('business', valuation, 'Venture Valuation & Term Sheet Active 🦄');

    const overlay = document.createElement('div');
    overlay.className = 'action-unicorn-overlay';
    overlay.innerHTML = `
      <div class="unicorn-rocket-surge">🦄✨</div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1800);
  },

  // 14. 🧠 Coach: Quantum Neural Synapse Spark
  neuralPulse(query = 'AI Life Coach') {
    this.playSound('wand');
    this.launchCelebration('work', query, 'Gemini Neural Co-Pilot Synchronized 🧠');

    const overlay = document.createElement('div');
    overlay.className = 'action-neural-overlay';
    overlay.innerHTML = `
      <div class="neural-brain-synapse">
        <span>🧠</span>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1400);
  },

  // 15. 🛡️ Auth: Biometric Cyber Shield Unlock
  cyberShieldUnlock(user = 'Authenticated') {
    this.playSound('victory');
    this.launchCelebration('career', `Access Granted: ${user}`, 'TLS 1.2 Cryptographic Session Active 🛡️');

    const overlay = document.createElement('div');
    overlay.className = 'action-shield-overlay';
    overlay.innerHTML = `
      <div class="cyber-shield-card">
        <div style="font-size:60px;filter:drop-shadow(0 0 25px #10b981);">🛡️</div>
        <div style="font-size:18px;font-weight:900;color:#fff;margin-top:10px;">SESSION SECURED</div>
        <div style="font-size:13px;color:#10b981;font-weight:700;">DPDP & GDPR Vault Active</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1600);
  },

  // 16. 🎆 Gamification: Level Up Master Fanfare
  levelUpBlast(level = 2) {
    this.playSound('victory');
    this.launchCelebration('life', `Tier ${level} Unlocked!`, 'Master Level Progression Milestone 🎆');

    const overlay = document.createElement('div');
    overlay.className = 'action-levelup-overlay';
    overlay.innerHTML = `
      <div class="level-up-fanfare-card">
        <div style="font-size:68px;filter:drop-shadow(0 0 30px #fbbf24);">🎆⭐</div>
        <div style="font-size:22px;font-weight:900;color:#fbbf24;margin-top:12px;">LEVEL UP ACHIEVED!</div>
        <div style="font-size:14px;color:#cbd5e1;font-weight:700;margin-top:4px;">You have ascended to Level ${level} in BioVerse!</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1800);
  },

  // 17. 🔥 Gamification: Daily Streak Flame Surge
  streakFlameSurge(days = 7) {
    this.playSound('flex');
    this.launchCelebration('health', `${days} Day Streak!`, 'Unstoppable Daily Consistency 🔥');

    const overlay = document.createElement('div');
    overlay.className = 'action-streak-overlay';
    overlay.innerHTML = `
      <div class="streak-flame-card">
        <div style="font-size:60px;filter:drop-shadow(0 0 30px #f97316);">🔥</div>
        <div style="font-size:19px;font-weight:900;color:#f97316;margin-top:10px;">${days} DAYS ON FIRE!</div>
        <div style="font-size:13px;color:#cbd5e1;font-weight:700;">Daily Routine Compounding Streak</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1500);
  },

  // 18. 📑 PDF: Dossier Laser Hologram Scan
  dossierScan() {
    this.playSound('sparkle');
    const overlay = document.createElement('div');
    overlay.className = 'action-dossier-overlay';
    overlay.innerHTML = `<div class="dossier-scanner-line"></div>`;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1600);
  },

  // 19. 🏦 Banking: RBI Cryptographic Vault Sync
  vaultSync(bank = 'HDFC Bank') {
    this.playSound('coinDrop');
    this.launchCelebration('finance', `${bank} Linked`, 'RBI Account Aggregator Synced 🏦🔒');

    const overlay = document.createElement('div');
    overlay.className = 'action-vault-overlay';
    overlay.innerHTML = `
      <div class="rbi-vault-card">
        <div style="font-size:56px;filter:drop-shadow(0 0 25px #00f2fe);">🏦🔒</div>
        <div style="font-size:18px;font-weight:900;color:#00f2fe;margin-top:10px;">RBI AA CONSENT VERIFIED</div>
        <div style="font-size:13px;color:#cbd5e1;font-weight:700;">${bank} Telemetry Synchronized</div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 1800);
  },

  // ─── Live Typing Audio & Particle Feedback ─────────────────
  attachTypingFeedback(formEl) {
    if (!formEl) return;
    const inputs = formEl.querySelectorAll('input[type="text"], input[type="number"], textarea, select');

    inputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Tab') return;
        this.playSound('type');

        const rect = input.getBoundingClientRect();
        const spark = document.createElement('div');
        spark.className = 'typing-spark-particle';
        const x = rect.left + Math.random() * (rect.width - 20) + 10;
        const y = rect.top + rect.height / 2;

        spark.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: 6px;
          height: 6px;
          background: #38bdf8;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000000;
          box-shadow: 0 0 8px #38bdf8;
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        `;
        document.body.appendChild(spark);

        requestAnimationFrame(() => {
          spark.style.transform = `translate3d(${(Math.random() - 0.5) * 30}px, -${Math.random() * 25 + 10}px, 0) scale(0)`;
          spark.style.opacity = '0';
        });

        setTimeout(() => {
          if (spark.parentNode) spark.parentNode.removeChild(spark);
        }, 350);
      });
    });
  }
};

window.ActionPhysics = ActionPhysics;
