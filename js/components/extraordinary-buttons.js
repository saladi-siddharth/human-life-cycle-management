/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE EXTRAORDINARY BUTTONS ENGINE
   Magnetic 3D Tilt, Dynamic Specular Light, Shockwaves, Stardust Particles & Web Audio Haptics
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── 1. Procedural Web Audio Haptic Synthesizer ────────────────
  class ProceduralAudioHaptics {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    playHoverChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.06);

        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    }

    playClickSnap() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.07);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    }

    playSuccessChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const now = this.ctx.currentTime + idx * 0.06;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.25);
        });
      } catch (e) {}
    }
  }

  const Haptics = new ProceduralAudioHaptics();

  // ─── 2. Exploding Kinetic Stardust Particle Emitter ─────────────
  function spawnStardustExplosion(x, y, theme = 'cyan') {
    const paletteMap = {
      cyan: ['#00f2fe', '#4facfe', '#00c6ff', '#ffffff', '#a1c4fd'],
      emerald: ['#10b981', '#34d399', '#6ee7b7', '#ffffff', '#059669'],
      amber: ['#fbbf24', '#f59e0b', '#fde047', '#ffffff', '#fb923c'],
      purple: ['#c084fc', '#a855f7', '#e879f9', '#ffffff', '#818cf8'],
      indigo: ['#6366f1', '#818cf8', '#38bdf8', '#ffffff', '#c084fc']
    };

    const colors = paletteMap[theme] || paletteMap.cyan;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const isStar = i % 4 === 0;
      const el = document.createElement(isStar ? 'div' : 'span');
      const color = colors[Math.floor(Math.random() * colors.length)];

      if (isStar) {
        el.className = 'stardust-star';
        el.style.color = color;
        el.innerHTML = `
          <svg viewBox="0 0 24 24" fill="${color}" width="100%" height="100%">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
          </svg>
        `;
      } else {
        el.className = 'stardust-particle';
        const size = Math.random() * 6 + 4;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.backgroundColor = color;
        el.style.color = color;
      }

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed - 2;
      let opacity = 1;
      let curX = x;
      let curY = y;
      let rot = Math.random() * 360;
      let rotSpeed = (Math.random() - 0.5) * 20;
      let scale = 1;

      const startTime = performance.now();
      const duration = Math.random() * 400 + 500; // 500-900ms

      function updateParticle(now) {
        const elapsed = now - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
          el.remove();
          return;
        }

        curX += vx;
        curY += vy;
        vy += 0.35; // gravity
        vx *= 0.96; // air drag
        rot += rotSpeed;
        scale = Math.max(0, 1 - progress * 0.8);
        opacity = Math.max(0, 1 - progress);

        el.style.transform = `translate(-50%, -50%) translate3d(${curX - x}px, ${curY - y}px, 0) rotate(${rot}deg) scale(${scale})`;
        el.style.opacity = opacity;

        requestAnimationFrame(updateParticle);
      }

      requestAnimationFrame(updateParticle);
    }
  }

  // ─── 3. Shockwave Wave Burst on Button Surface ─────────────────
  function triggerShockwave(button, clientX, clientY) {
    const rect = button.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    const wave = document.createElement('div');
    wave.className = 'quantum-shockwave';
    wave.style.left = `${relX}px`;
    wave.style.top = `${relY}px`;

    button.appendChild(wave);
    setTimeout(() => wave.remove(), 700);
  }

  // ─── 4. Magnetic 3D Interactive Spring Controller ───────────────
  class MagneticButton {
    constructor(element) {
      this.el = element;
      this.rect = null;
      this.isHovered = false;

      this.current = { magX: 0, magY: 0, tiltX: 0, tiltY: 0 };
      this.target = { magX: 0, magY: 0, tiltX: 0, tiltY: 0 };
      this.rafId = null;

      this.theme = 'cyan';
      if (element.classList.contains('pill--emerald') || element.classList.contains('btn-success')) this.theme = 'emerald';
      else if (element.classList.contains('pill--amber') || element.classList.contains('btn-warning')) this.theme = 'amber';
      else if (element.classList.contains('pill--purple')) this.theme = 'purple';
      else if (element.classList.contains('btn-primary')) this.theme = 'indigo';

      this.bind();
    }

    bind() {
      const el = this.el;

      el.addEventListener('mouseenter', (e) => {
        this.isHovered = true;
        this.rect = el.getBoundingClientRect();
        Haptics.playHoverChime();
        this.startLoop();
      });

      el.addEventListener('mousemove', (e) => {
        if (!this.rect) this.rect = el.getBoundingClientRect();

        const x = e.clientX - this.rect.left;
        const y = e.clientY - this.rect.top;

        const centerX = this.rect.width / 2;
        const centerY = this.rect.height / 2;

        const percentX = (x / this.rect.width) * 100;
        const percentY = (y / this.rect.height) * 100;

        el.style.setProperty('--cursor-x', `${percentX.toFixed(1)}%`);
        el.style.setProperty('--cursor-y', `${percentY.toFixed(1)}%`);

        // Magnetic Attraction (Max 14px displacement, 16deg 3D tilt)
        const dx = (x - centerX) / centerX;
        const dy = (y - centerY) / centerY;

        this.target.magX = dx * 10;
        this.target.magY = dy * 10;
        this.target.tiltX = -dy * 14;
        this.target.tiltY = dx * 14;
      });

      el.addEventListener('mouseleave', () => {
        this.isHovered = false;
        this.target.magX = 0;
        this.target.magY = 0;
        this.target.tiltX = 0;
        this.target.tiltY = 0;
      });

      el.addEventListener('click', (e) => {
        Haptics.playClickSnap();
        triggerShockwave(el, e.clientX, e.clientY);
        spawnStardustExplosion(e.clientX, e.clientY, this.theme);
      });
    }

    startLoop() {
      const animate = () => {
        // Interpolated spring physics
        this.current.magX += (this.target.magX - this.current.magX) * 0.18;
        this.current.magY += (this.target.magY - this.current.magY) * 0.18;
        this.current.tiltX += (this.target.tiltX - this.current.tiltX) * 0.18;
        this.current.tiltY += (this.target.tiltY - this.current.tiltY) * 0.18;

        this.el.style.setProperty('--mag-x', `${this.current.magX.toFixed(2)}px`);
        this.el.style.setProperty('--mag-y', `${this.current.magY.toFixed(2)}px`);
        this.el.style.setProperty('--tilt-x', `${this.current.tiltX.toFixed(2)}deg`);
        this.el.style.setProperty('--tilt-y', `${this.current.tiltY.toFixed(2)}deg`);

        const isMoving =
          Math.abs(this.target.magX - this.current.magX) > 0.05 ||
          Math.abs(this.target.magY - this.current.magY) > 0.05 ||
          Math.abs(this.target.tiltX - this.current.tiltX) > 0.05 ||
          Math.abs(this.target.tiltY - this.current.tiltY) > 0.05;

        if (this.isHovered || isMoving) {
          this.rafId = requestAnimationFrame(animate);
        } else {
          this.el.style.setProperty('--mag-x', '0px');
          this.el.style.setProperty('--mag-y', '0px');
          this.el.style.setProperty('--tilt-x', '0deg');
          this.el.style.setProperty('--tilt-y', '0deg');
          this.rafId = null;
        }
      };

      if (!this.rafId) {
        this.rafId = requestAnimationFrame(animate);
      }
    }
  }

  // ─── 5. Universal DOM Scanner & Mutation Observer ──────────────
  const BUTTON_SELECTOR = '.btn, .pill, .chat-send-btn, .btn-liquid-glass, .chat-suggestion, button[type="submit"]';

  function initExtraordinaryButtons() {
    document.querySelectorAll(BUTTON_SELECTOR).forEach((el) => {
      if (!el.hasAttribute('data-extraordinary-bound')) {
        el.setAttribute('data-extraordinary-bound', 'true');
        new MagneticButton(el);
      }
    });
  }

  // Global Access
  window.ExtraordinaryButtons = {
    init: initExtraordinaryButtons,
    haptics: Haptics,
    spawnParticles: spawnStardustExplosion
  };

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExtraordinaryButtons);
  } else {
    initExtraordinaryButtons();
  }

  // Observe dynamically created buttons in SPA views and modals
  const observer = new MutationObserver(() => {
    initExtraordinaryButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();
