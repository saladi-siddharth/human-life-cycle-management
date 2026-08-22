/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE LUXURY QUANTUM PILL BUTTON ENGINE
   Clean, Elegant, Ultra-Smooth 3D Coil Spring & Fluid State Transitions
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  const TAU = Math.PI * 2;
  const PI = Math.PI;

  class QuantumPillButton {
    constructor(element) {
      this.el = element;
      this.cta = element.querySelector('.pill__cta') || element;
      this.coilSvg = element.querySelector('.pill__coil');
      this.coilPath = element.querySelector('.coil__line');
      this.plate = element.querySelector('.pill__plate');
      this.status = element.querySelector('.pill__status');
      this.submitBtn = element.querySelector('button, input[type="submit"]');

      this.width = 0;
      this.height = 0;
      this.state = element.getAttribute('data-state') || 'idle';
      this.turns = 5;

      // Smooth Spring Physics State
      this.spring = {
        compression: 0.35,
        targetCompression: 0.35,
        stretch: 0.85,
        targetStretch: 0.85,
        phase: 0
      };

      this.mouse = {
        isHovered: false,
        isPressed: false
      };

      this.init();
    }

    init() {
      this.updateDimensions();

      if (!this.coilSvg) {
        this.coilSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.coilSvg.setAttribute('class', 'pill__coil');
        this.cta.prepend(this.coilSvg);
      }

      if (!this.coilPath) {
        this.coilPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.coilPath.setAttribute('class', 'coil__line');
        this.coilSvg.appendChild(this.coilPath);
      }

      this.bindEvents();
      this.renderCoil(0);
      this.startLoop();
    }

    updateDimensions() {
      const rect = this.el.getBoundingClientRect();
      this.width = Math.max(160, rect.width || this.el.offsetWidth || 220);
      this.height = Math.max(40, rect.height || this.el.offsetHeight || 50);
      this.turns = Math.max(4, Math.round(this.width / 44));

      if (this.coilSvg) {
        this.coilSvg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
      }
    }

    bindEvents() {
      this.el.addEventListener('mousemove', (e) => {
        const rect = this.el.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const btnX = (offsetX * 10).toFixed(1);
        this.el.style.setProperty('--btn-x', `${btnX}px`);
      });

      this.el.addEventListener('mouseenter', () => {
        this.mouse.isHovered = true;
        this.spring.targetCompression = 0.55;
        this.spring.targetStretch = 1.0;
        if (this.state === 'idle') this.el.setAttribute('data-state', 'hover');
      });

      this.el.addEventListener('mouseleave', () => {
        this.mouse.isHovered = false;
        this.mouse.isPressed = false;
        this.spring.targetCompression = 0.35;
        this.spring.targetStretch = 0.85;
        this.el.style.setProperty('--btn-x', '0px');
        if (this.state === 'idle' || this.state === 'hover') {
          this.el.setAttribute('data-state', 'idle');
        }
      });

      this.el.addEventListener('mousedown', () => {
        this.mouse.isPressed = true;
        this.spring.targetCompression = 0.85;
        this.spring.targetStretch = 1.25;
        this.el.setAttribute('data-state', 'active');
      });

      window.addEventListener('mouseup', () => {
        if (this.mouse.isPressed) {
          this.mouse.isPressed = false;
          this.spring.targetCompression = this.mouse.isHovered ? 0.55 : 0.35;
          this.spring.targetStretch = this.mouse.isHovered ? 1.0 : 0.85;
          if (this.state === 'active') {
            this.el.setAttribute('data-state', this.mouse.isHovered ? 'hover' : 'idle');
          }
        }
      });

      // Handle Submit Trigger
      this.el.addEventListener('click', (e) => {
        if (this.state === 'loading') {
          e.preventDefault();
          return;
        }

        const customHandler = this.el.getAttribute('data-onclick');
        if (customHandler && typeof window[customHandler] === 'function') {
          e.preventDefault();
          this.triggerSubmit(() => window[customHandler](e));
        } else if (this.el.hasAttribute('onclick')) {
          // Inline callback handler execution
        }
      });
    }

    triggerSubmit(callback) {
      this.setState('loading');
      setTimeout(() => {
        this.setState('success');
        if (typeof ExtraordinaryButtons !== 'undefined' && ExtraordinaryButtons.haptics) {
          ExtraordinaryButtons.haptics.playSuccessChime();
        }
        setTimeout(() => {
          if (typeof callback === 'function') callback();
          setTimeout(() => this.setState('idle'), 1500);
        }, 500);
      }, 700);
    }

    setState(newState) {
      this.state = newState;
      this.el.setAttribute('data-state', newState);
    }

    // ─── Mathematical 3D Coil Path Generator ────────────────────
    renderCoil(time) {
      if (!this.coilPath || this.width === 0) return;

      const w = this.width;
      const h = this.height;
      const r = h / 2 - 5;
      const lx = h / 2;
      const rx = w - h / 2;
      const ly = h / 2;
      const ry = h / 2;

      // Smooth Spring interpolation
      this.spring.compression += (this.spring.targetCompression - this.spring.compression) * 0.12;
      this.spring.stretch += (this.spring.targetStretch - this.spring.stretch) * 0.12;

      const comp = this.spring.compression + Math.sin(time * 2.5) * 0.035;
      const str = this.spring.stretch + Math.cos(time * 2.0) * 0.035;
      const speedMultiplier = this.state === 'loading' ? 8.0 : 1.0;
      const phaseOffset = time * speedMultiplier;

      const steps = Math.round(this.turns * 12);
      let d = '';

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const p = u;

        // Core Mathematical Formula
        const a = -(u - 0.5) * TAU * this.turns - PI / 2 + phaseOffset;
        const cx = lx + (rx - lx) * p;
        const cy = ly + (ry - ly) * p;

        const x = cx + Math.cos(a) * r * comp;
        const y = cy + Math.sin(a) * r * str;

        if (i === 0) {
          d += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        } else {
          d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
        }
      }

      this.coilPath.setAttribute('d', d);
    }

    startLoop() {
      let lastTime = performance.now();
      const loop = (now) => {
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        this.renderCoil(now * 0.001);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  // ─── Auto Discovery & DOM Initializer ─────────────────────────
  function initAllPillButtons() {
    document.querySelectorAll('.pill:not([data-pill-initialized])').forEach((el) => {
      el.setAttribute('data-pill-initialized', 'true');
      new QuantumPillButton(el);
    });
  }

  // ─── Global Helper for Templating ────────────────────────────
  window.PillButton = {
    init: initAllPillButtons,
    create({
      text = 'Submit',
      icon = '<i class="fas fa-arrow-right"></i>',
      theme = 'cyan', // cyan | emerald | amber | purple
      type = 'button',
      fullWidth = true,
      onClick = '',
      id = '',
      extraClass = ''
    }) {
      const fullClass = fullWidth ? 'pill-full' : '';
      const idAttr = id ? `id="${id}"` : '';
      const clickAttr = onClick ? `onclick="${onClick}"` : '';

      return `
        <div class="pill pill--${theme} ${fullClass} ${extraClass}" ${idAttr} data-state="idle" ${clickAttr}>
          <span class="pill__cta">
            <svg class="pill__coil"></svg>
            <span class="pill__plate">
              <span class="pill__label">${text}</span>
              ${icon ? `<span class="pill__icon">${icon}</span>` : ''}
            </span>
            <span class="pill__status">
              <span class="pill__spinner"></span>
              <span class="pill__success-text"><i class="fas fa-check"></i> Success!</span>
            </span>
            <button type="${type}" aria-label="${text}"></button>
          </span>
        </div>
      `;
    }
  };

  // Run on load and on dynamic DOM updates
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllPillButtons);
  } else {
    initAllPillButtons();
  }

  // Observe SPA route changes and dynamically added modals
  const observer = new MutationObserver(() => {
    initAllPillButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();
