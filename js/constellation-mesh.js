/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE CELESTIAL CONSTELLATION & STARDUST MESH ENGINE
   Ultra-Smooth 60FPS Interactive Node Physics, Mouse Gravity & Ambient Glow
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  class ConstellationMesh {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.width = 0;
      this.height = 0;
      this.particles = [];
      this.mouse = { x: -1000, y: -1000, radius: 160 };
      this.animationFrameId = null;
      this.dpr = window.devicePixelRatio || 1;
      this.particleCount = 55;
      this.maxConnectDist = 140;

      this.init();
    }

    init() {
      this.canvas = document.getElementById('bioverse-constellation-canvas');
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'bioverse-constellation-canvas';
        this.canvas.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        `;
        document.body.prepend(this.canvas);
      }

      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.createParticles();
      this.bindEvents();
      this.startLoop();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dpr = window.devicePixelRatio || 1;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.scale(this.dpr, this.dpr);

      // Adjust particle count for mobile vs desktop
      this.particleCount = this.width < 768 ? 28 : 55;
    }

    createParticles() {
      this.particles = [];
      const colors = ['#00f2fe', '#6366f1', '#a855f7', '#10b981', '#fbbf24'];

      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.3,
          baseAlpha: Math.random() * 0.5 + 0.3,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          pulseVal: Math.random() * Math.PI
        });
      }
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.resize();
        this.createParticles();
      });

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });

      // Pause rendering when tab is hidden to save 100% battery
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        } else {
          this.startLoop();
        }
      });
    }

    startLoop() {
      const render = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update & Render Particles
        for (let i = 0; i < this.particles.length; i++) {
          const p = this.particles[i];

          // Movement
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off borders
          if (p.x < 0 || p.x > this.width) p.vx *= -1;
          if (p.y < 0 || p.y > this.height) p.vy *= -1;

          // Mouse Gravity Attraction
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.mouse.radius && dist > 0) {
            const force = (this.mouse.radius - dist) / this.mouse.radius;
            p.x += (dx / dist) * force * 1.8;
            p.y += (dy / dist) * force * 1.8;
            p.alpha = Math.min(1, p.baseAlpha + force * 0.5);
          } else {
            p.pulseVal += p.pulseSpeed;
            p.alpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.15;
          }

          // Draw Particle Core
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
          this.ctx.shadowColor = p.color;
          this.ctx.shadowBlur = 8;
          this.ctx.fill();

          // Draw Constellation Lines Between Nearby Nodes
          for (let j = i + 1; j < this.particles.length; j++) {
            const p2 = this.particles[j];
            const connDx = p.x - p2.x;
            const connDy = p.y - p2.y;
            const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

            if (connDist < this.maxConnectDist) {
              const lineAlpha = (1 - connDist / this.maxConnectDist) * 0.22;
              this.ctx.beginPath();
              this.ctx.moveTo(p.x, p.y);
              this.ctx.lineTo(p2.x, p2.y);
              this.ctx.strokeStyle = p.color;
              this.ctx.globalAlpha = lineAlpha;
              this.ctx.lineWidth = 0.75;
              this.ctx.stroke();
            }
          }
        }

        this.ctx.globalAlpha = 1.0;
        this.ctx.shadowBlur = 0;
        this.animationFrameId = requestAnimationFrame(render);
      };

      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = requestAnimationFrame(render);
    }
  }

  // Auto-initialize on load
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        window.Constellation = new ConstellationMesh();
      });
    } else {
      window.Constellation = new ConstellationMesh();
    }
  }
})();
