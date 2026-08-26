/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE CELESTIAL ACTION PHYSICS & CANVAS CELEBRATION ENGINE
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
    // 1. Play Sound
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

    // 2. Setup Fullscreen Canvas
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

    // 3. Theme Color Palettes & Iconography
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

    // 4. Spawn 90 Kinetic Physics Particles
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

    // 5. Central 3D Kinetic Glass Badge State
    const badge = {
      scale: 0.1,
      targetScale: 1.0,
      opacity: 1.0,
      shockwaveRadius: 10,
      shockwaveAlpha: 1.0,
      iconY: 0
    };

    let animationFrameId = null;
    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds celebration

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, width, height);

      // A. Draw Shockwave Expanding Ring
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

      // B. Render Particles with Kinetic Physics
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
          // 🪙 3D Spinning Coin Ellipse
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
          // ✨ Glowing Starburst / Energy Orb
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.sparkle ? 14 : 6;
          ctx.fill();
        }
        ctx.restore();
      });

      // C. Render Floating 3D Central Glass Badge
      badge.scale += (badge.targetScale - badge.scale) * 0.15;
      if (elapsed > 1600) {
        badge.opacity = Math.max(0, 1 - (elapsed - 1600) / 500);
      }

      if (badge.opacity > 0) {
        ctx.save();
        ctx.translate(originX, originY);
        ctx.scale(badge.scale, badge.scale);
        ctx.globalAlpha = badge.opacity;

        // Glowing Background Card
        const cardW = Math.min(width - 40, 360);
        const cardH = 110;
        const radius = 22;

        // Card Glow
        ctx.shadowColor = cfg.auraGlow;
        ctx.shadowBlur = 35;
        ctx.fillStyle = 'rgba(7, 10, 20, 0.94)';
        ctx.beginPath();
        ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, radius);
        ctx.fill();

        // Card Hairline Border
        ctx.shadowBlur = 0;
        ctx.strokeStyle = cfg.badgeBorder;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Icon
        ctx.font = '36px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cfg.icon, -cardW / 2 + 45, 0);

        // Title Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(title.length > 26 ? title.substring(0, 24) + '...' : title, -cardW / 2 + 82, -8);

        // Subtitle Text
        ctx.fillStyle = cfg.badgeBorder;
        ctx.font = '600 12px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText(subtitle, -cardW / 2 + 82, 14);

        // XP / Status Badge Chip
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

  // ─── Backwards-Compatible Specialized Trigger Wrappers ─────
  supernovaBurst(type = 'skill', label = 'Skill Mastered!') {
    this.launchCelebration('career', label, 'Career Matrix Level Up 🚀');
  },

  goldCoinShower(amount = '₹25,000') {
    this.launchCelebration('finance', `${amount} Recorded`, 'Compounding Wealth Multiplier 💰');
  },

  emeraldPulse(label = 'Health Synchronized') {
    this.launchCelebration('health', label, 'Vitality & Hydration Compounded 💪');
  },

  quantumPortal(title = 'Task Scheduled') {
    this.launchCelebration('work', title, 'Priority Scheduled in Focus Matrix ⚡');
  },

  slothCelebration(goalTitle = 'New Milestone') {
    this.launchCelebration('life', goalTitle, '5-Pillar Equilibrium Achieved 🌟');
  },

  rocketLaunch(company = 'Top Company', role = 'Role') {
    this.launchCelebration('career', `${role} @ ${company}`, 'Application Tracked & Launched 🚀');
  },

  dumbbellFlex(workoutType = 'Workout') {
    this.launchCelebration('health', `${workoutType} Complete`, 'Muscle Hypertrophy & Vitality 💪');
  },

  moonSleep(hours = 8) {
    this.launchCelebration('health', `${hours}h Rest Logged`, 'Circadian Rhythm Restored 🌙');
  },

  magicTask(title = 'Task Complete') {
    this.launchCelebration('work', title, 'Execution Velocity +20 XP 🏆');
  },

  gradCapLaunch(name = 'Institute') {
    this.launchCelebration('student', name, 'NIRF Academic Target Updated 🎓');
  },

  trophyReward(title = 'Achievement') {
    this.launchCelebration('life', title, 'Master Badge Unlocked 🏆');
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
