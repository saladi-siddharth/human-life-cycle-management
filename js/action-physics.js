/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE ACTION PHYSICS ENGINE — Cute Sloth "Hurray!", Typing Feedback & 3D Creations
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

  playSound(type = 'sloth') {
    try {
      if (typeof Store !== 'undefined' && Store.get('soundEnabled') === false) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'type') {
        // Soft mechanical typewriter keypress chime
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
      } else if (type === 'sloth') {
        // Joyful 3-tone victory melody chime for Cute Sloth Hurray
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);

          gain.gain.setValueAtTime(0.25, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.25);
        });
      } else if (type === 'rocket') {
        // Rocket launch engine sweep whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.5);

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
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'moon') {
        // Soft soothing lullaby bell
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
      } else if (type === 'wand') {
        // Magic wand starburst chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(3000, now + 0.2);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'waterSplash') {
        // Liquid water pour and splash sound
        [440, 580, 720, 880, 1100].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq + Math.random() * 80, now + idx * 0.04);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.04 + 0.08);

          gain.gain.setValueAtTime(0.18, now + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.09);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.09);
        });
      } else if (type === 'coinDrop') {
        // Metallic coin clink audio chime
        [3200, 4800, 2400].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + idx * 0.05 + 0.12);

          gain.gain.setValueAtTime(0.22, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.12);
        });
      } else if (type === 'pomodoroBell') {
        // Harmonic Tibetan singing bowl gong
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
    } catch (e) {
      // Silent fallback
    }
  },

  // ─── Continuous Ambient Focus Soundscapes ─────────────────
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
          // Soft rain / white noise
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

  // ─── 1. CUTE SLOTH "HURRAY!" GOAL CELEBRATION ───────────────
  slothCelebration(goalTitle = 'New Milestone') {
    this.playSound('sloth');

    const overlay = document.createElement('div');
    overlay.className = 'sloth-celebration-overlay';
    overlay.innerHTML = `
      <div class="sloth-modal-card">
        <div class="confetti-container-sloth" id="sloth-confetti-box"></div>
        
        <!-- Speech Bubble -->
        <div class="sloth-speech-bubble">
          <span>Hurray! 🦥🎉 Goal Unlocked!</span>
          <strong class="sloth-goal-title">"${goalTitle}"</strong>
        </div>

        <!-- Cute Animated SVG Sloth Character -->
        <div class="sloth-character-wrapper">
          <svg class="cute-sloth-svg" viewBox="0 0 200 200">
            <!-- Party Hat -->
            <polygon points="100,20 85,60 115,60" fill="#f43f5e" />
            <circle cx="100" cy="18" r="7" fill="#fbbf24" />
            <path d="M 85,60 Q 100,65 115,60" stroke="#f59e0b" stroke-width="3" fill="none" />

            <!-- Sloth Body -->
            <ellipse cx="100" cy="130" rx="45" ry="50" fill="#a88b68" />
            <ellipse cx="100" cy="130" rx="32" ry="38" fill="#e6d5bc" />

            <!-- Sloth Head -->
            <circle cx="100" cy="90" r="35" fill="#a88b68" />
            <ellipse cx="100" cy="92" rx="28" ry="22" fill="#e6d5bc" />

            <!-- Eye Patches -->
            <ellipse cx="86" cy="90" rx="10" ry="7" fill="#785d3f" transform="rotate(-10 86 90)" />
            <ellipse cx="114" cy="90" rx="10" ry="7" fill="#785d3f" transform="rotate(10 114 90)" />

            <!-- Happy Eyes -->
            <path d="M 82,90 Q 86,85 90,90" stroke="#2d1e18" stroke-width="3" fill="none" stroke-linecap="round" />
            <path d="M 110,90 Q 114,85 118,90" stroke="#2d1e18" stroke-width="3" fill="none" stroke-linecap="round" />

            <!-- Cute Nose & Smile -->
            <ellipse cx="100" cy="96" rx="5" ry="4" fill="#2d1e18" />
            <path d="M 94,101 Q 100,107 106,101" stroke="#2d1e18" stroke-width="2.5" fill="none" stroke-linecap="round" />

            <!-- Cheeks -->
            <circle cx="78" cy="96" r="4" fill="#f43f5e" opacity="0.6" />
            <circle cx="122" cy="96" r="4" fill="#f43f5e" opacity="0.6" />

            <!-- Waving Arms (Hurray pose) -->
            <g class="sloth-arm-left">
              <path d="M 60,110 Q 35,80 25,60" stroke="#a88b68" stroke-width="12" stroke-linecap="round" fill="none" />
              <circle cx="23" cy="58" r="6" fill="#785d3f" />
            </g>
            <g class="sloth-arm-right">
              <path d="M 140,110 Q 165,80 175,60" stroke="#a88b68" stroke-width="12" stroke-linecap="round" fill="none" />
              <circle cx="177" cy="58" r="6" fill="#785d3f" />
            </g>
          </svg>
        </div>

        <button class="btn btn-primary btn-sm sloth-close-btn" onclick="this.closest('.sloth-celebration-overlay').remove()">
          Awesome! 🚀
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Generate Confetti Particles
    const confettiBox = overlay.querySelector('#sloth-confetti-box');
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#fbbf24', '#a855f7', '#06b6d4'];
    for (let i = 0; i < 35; i++) {
      const c = document.createElement('div');
      c.className = 'sloth-confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const duration = 1.8 + Math.random() * 1.2;

      c.style.cssText = `
        position: absolute;
        top: -10px;
        left: ${left}%;
        width: ${Math.random() * 8 + 6}px;
        height: ${Math.random() * 12 + 6}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation: confettiDrop ${duration}s linear ${delay}s infinite;
      `;
      confettiBox.appendChild(c);
    }

    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.4s ease';
        setTimeout(() => overlay.remove(), 400);
      }
    }, 4500);
  },

  // ─── 2. 3D ROCKET LAUNCH PHYSICS (Job Application) ──────────
  rocketLaunch(company = 'Top Company', role = 'Role') {
    this.playSound('rocket');

    const rocket = document.createElement('div');
    rocket.className = 'action-rocket-3d';
    rocket.innerHTML = `
      <div class="rocket-body">🚀</div>
      <div class="rocket-flame"></div>
      <div class="rocket-smoke"></div>
    `;

    const startX = window.innerWidth / 2 - 25;
    rocket.style.cssText = `
      position: fixed;
      bottom: -100px;
      left: ${startX}px;
      font-size: 48px;
      pointer-events: none;
      z-index: 10000;
      transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s ease-in;
    `;

    document.body.appendChild(rocket);

    requestAnimationFrame(() => {
      rocket.style.transform = `translate3d(0, -${window.innerHeight + 150}px, 0) scale(1.3) rotate(-5deg)`;
    });

    setTimeout(() => {
      if (rocket.parentNode) rocket.parentNode.removeChild(rocket);
    }, 1300);
  },

  // ─── 3. DUMBBELL MUSCLE POWER FLEX PHYSICS (Workout) ────────
  dumbbellFlex(workoutType = 'Workout') {
    this.playSound('flex');

    const flexEl = document.createElement('div');
    flexEl.className = 'action-flex-dumbbell';
    flexEl.innerHTML = `
      <div class="flex-icon">🏋️‍♂️</div>
      <div class="flex-aura"></div>
      <div class="flex-label">Power Session: ${workoutType}!</div>
    `;

    flexEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
    `;

    document.body.appendChild(flexEl);

    requestAnimationFrame(() => {
      flexEl.style.transform = 'translate(-50%, -50%) scale(1.4)';
    });

    setTimeout(() => {
      flexEl.style.transform = 'translate(-50%, -50%) scale(0) rotate(20deg)';
      flexEl.style.opacity = '0';
      setTimeout(() => {
        if (flexEl.parentNode) flexEl.parentNode.removeChild(flexEl);
      }, 400);
    }, 1400);
  },

  // ─── 4. FLOATING MOON & DRIFTING ZZZ PHYSICS (Sleep) ────────
  moonSleep(hours = 8) {
    this.playSound('moon');

    const moonEl = document.createElement('div');
    moonEl.className = 'action-moon-sleep';
    moonEl.innerHTML = `
      <div class="moon-body">🌙</div>
      <div class="zzz-bubble z1">Z</div>
      <div class="zzz-bubble z2">z</div>
      <div class="zzz-bubble z3">z</div>
    `;

    moonEl.style.cssText = `
      position: fixed;
      bottom: 20%;
      right: 20%;
      pointer-events: none;
      z-index: 10000;
      transition: transform 1.5s ease-out, opacity 1.5s ease-out;
    `;

    document.body.appendChild(moonEl);

    requestAnimationFrame(() => {
      moonEl.style.transform = 'translate3d(-40px, -120px, 0) scale(1.3)';
    });

    setTimeout(() => {
      moonEl.style.opacity = '0';
      setTimeout(() => {
        if (moonEl.parentNode) moonEl.parentNode.removeChild(moonEl);
      }, 500);
    }, 1600);
  },

  // ─── 5. MAGIC WAND STARBURST PHYSICS (Task) ─────────────────
  magicTask(title = 'Task') {
    this.playSound('wand');

    const wandEl = document.createElement('div');
    wandEl.className = 'action-magic-wand';
    wandEl.innerHTML = `
      <div class="wand-icon">🪄</div>
      <div class="starburst-ring"></div>
    `;

    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    wandEl.style.cssText = `
      position: fixed;
      left: ${startX - 20}px;
      top: ${startY - 20}px;
      font-size: 36px;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
    `;

    document.body.appendChild(wandEl);

    requestAnimationFrame(() => {
      wandEl.style.transform = 'scale(1.5) rotate(-20deg)';
    });

    setTimeout(() => {
      wandEl.style.transform = 'scale(0.2) rotate(45deg)';
      wandEl.style.opacity = '0';
      setTimeout(() => {
        if (wandEl.parentNode) wandEl.parentNode.removeChild(wandEl);
      }, 400);
    }, 800);
  },

  // ─── 6. 3D GRADUATION CAP LAUNCH PHYSICS (College Portal) ────
  gradCapLaunch(name = 'Institute') {
    this.playSound('sloth');

    const cap = document.createElement('div');
    cap.className = 'action-grad-cap-3d';
    cap.innerHTML = `🎓✨`;

    const startX = window.innerWidth / 2 - 30;
    const startY = window.innerHeight / 2 + 50;

    cap.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      font-size: 56px;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease;
    `;

    document.body.appendChild(cap);

    requestAnimationFrame(() => {
      cap.style.transform = 'translate3d(0, -180px, 0) scale(1.4) rotate(360deg)';
    });

    setTimeout(() => {
      cap.style.opacity = '0';
      setTimeout(() => {
        if (cap.parentNode) cap.parentNode.removeChild(cap);
      }, 400);
    }, 900);
  },

  // ─── 7. 3D GOLD TROPHY SHINE PHYSICS (Scholarship Portal) ───
  trophyShine(name = 'Scholarship', amount = '') {
    this.playSound('sloth');

    const trophy = document.createElement('div');
    trophy.className = 'action-trophy-3d';
    trophy.innerHTML = `
      <div style="font-size:64px;">🏆</div>
      <div style="font-size:14px;font-weight:800;color:#fbbf24;margin-top:4px;">${name}</div>
      ${amount ? `<div style="font-size:12px;color:#10b981;font-weight:700;">${amount}</div>` : ''}
    `;

    trophy.style.cssText = `
      position: fixed;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: rgba(15, 23, 42, 0.9);
      border: 2px solid #fbbf24;
      border-radius: 20px;
      padding: 20px 30px;
      text-align: center;
      pointer-events: none;
      z-index: 10000;
      box-shadow: 0 0 40px rgba(251, 191, 36, 0.5);
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease;
    `;

    document.body.appendChild(trophy);

    requestAnimationFrame(() => {
      trophy.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });

    setTimeout(() => {
      trophy.style.transform = 'translate(-50%, -50%) scale(0) rotate(15deg)';
      trophy.style.opacity = '0';
      setTimeout(() => {
        if (trophy.parentNode) trophy.parentNode.removeChild(trophy);
      }, 400);
    }, 1400);
  },

  // ─── 6. LIVE INTERACTIVE TYPING FEEDBACK FOR MODALS ──────────
  attachTypingFeedback(formEl) {
    if (!formEl) return;
    const inputs = formEl.querySelectorAll('input[type="text"], input[type="number"], textarea, select');

    inputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        // Ignore non-printable keys
        if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Tab') return;

        this.playSound('type');

        // Spawn tiny typing spark particle near active field
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
          z-index: 10000;
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
