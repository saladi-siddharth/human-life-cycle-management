/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE DELETE ENGINE — Epic Crumpled Ball Arc Toss & Live Storage Meter
   ═══════════════════════════════════════════════════════════════════ */

const DeleteEngine = {
  // Sound synthesizer using Web Audio API (Zero external assets needed)
  _audioCtx: null,

  getAudioContext() {
    if (!this._audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this._audioCtx = new AudioCtx();
      }
    }
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      this._audioCtx.resume().catch(() => {});
    }
    return this._audioCtx;
  },

  playSound(type = 'toss') {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'crumple') {
        // Noise buffer for paper crumpling effect
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.Q.setValueAtTime(3.0, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'whoosh') {
        // Pitch sweep whoosh for parabolic toss
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.45);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'bin') {
        // Satisfaction impact thud / bin lid click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'coin') {
        // Metallic coin clink audio chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(3200, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (e) {
      // Audio fallback silent
    }
  },

  // ─── 3D Gold Coin Rain Physics Engine ────────────────────────
  dropCoins(count = 8) {
    const startX = window.innerWidth / 2;
    const startY = 100;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.playSound('coin');
        const coin = document.createElement('div');
        coin.className = 'gold-coin-3d-particle';
        coin.innerHTML = '🪙';

        const offsetX = (Math.random() - 0.5) * 280;
        const targetY = window.innerHeight - 150 - Math.random() * 100;
        const rot = Math.random() * 720 - 360;

        coin.style.cssText = `
          position: fixed;
          left: ${startX + offsetX}px;
          top: ${startY}px;
          font-size: 28px;
          pointer-events: none;
          z-index: 10000;
          filter: drop-shadow(0 4px 10px rgba(234, 179, 8, 0.6));
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease-out;
        `;

        document.body.appendChild(coin);

        requestAnimationFrame(() => {
          coin.style.transform = `translate3d(0, ${targetY - startY}px, 0) rotate(${rot}deg) scale(1.2)`;
        });

        setTimeout(() => {
          coin.style.transform = `translate3d(0, ${targetY - startY - 30}px, 0) rotate(${rot + 180}deg) scale(0.9)`;
          setTimeout(() => {
            coin.style.opacity = '0';
            setTimeout(() => {
              if (coin.parentNode) coin.parentNode.removeChild(coin);
            }, 300);
          }, 150);
        }, 650);
      }, i * 60);
    }
  },

  // Helper utility functions
  lerp(start, end, p) {
    return start + (end - start) * p;
  },

  fmt(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // ─── Crumpled Ball Arc Toss Engine ──────────────────────────
  toss(from, targetBinEl, onComplete) {
    this.playSound('crumple');

    // Default bin target if not specified
    let bin = targetBinEl ? targetBinEl.getBoundingClientRect() : null;
    if (!bin || bin.width === 0) {
      const globalBin = document.getElementById('global-trash-bin');
      if (globalBin) {
        bin = globalBin.getBoundingClientRect();
      } else {
        bin = { left: window.innerWidth - 70, top: window.innerHeight - 70, width: 50, height: 50 };
      }
    }

    const binCenter = {
      x: bin.left + bin.width / 2,
      y: bin.top + bin.height / 2
    };

    // Create 3D crumpled ball overlay element
    const ball = document.createElement('div');
    ball.className = 'epic-crumpled-ball';
    ball.innerHTML = `
      <div class="ball-mesh">
        <span class="ball-icon">🗑️</span>
        <div class="ball-wrinkle w1"></div>
        <div class="ball-wrinkle w2"></div>
        <div class="ball-wrinkle w3"></div>
      </div>
    `;

    document.body.appendChild(ball);

    const DUR = 550; // duration in ms
    const arc = Math.min(220, Math.max(100, Math.abs(from.x - binCenter.x) * 0.45));
    const spin = 720 + Math.random() * 360; // multi-rotation spin
    const startTime = performance.now();

    // Trigger whoosh sound after short paper crumple delay
    setTimeout(() => this.playSound('whoosh'), 80);

    // Open target bin lid if available
    if (targetBinEl) {
      targetBinEl.classList.add('bin-open');
    }

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed, DUR);
      const p = t / DUR;

      // Parabolic Arc Physics Formula (Requested formula transformed)
      const x = this.lerp(from.x, binCenter.x, p);
      const y = this.lerp(from.y, binCenter.y, p) - arc * Math.sin(Math.PI * p);
      const scale = 1.1 - p * 0.5; // Crumple scale down into bin

      ball.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${spin * p}deg) scale(${scale})`;
      ball.style.opacity = p > 0.85 ? `${(1 - p) / 0.15}` : '1';

      if (t < DUR) {
        requestAnimationFrame(animate);
      } else {
        // Animation finished: impact!
        if (ball.parentNode) ball.parentNode.removeChild(ball);

        this.playSound('bin');
        this.createParticles(binCenter.x, binCenter.y);

        if (targetBinEl) {
          targetBinEl.classList.remove('bin-open');
          targetBinEl.classList.add('bin-impact');
          setTimeout(() => targetBinEl.classList.remove('bin-impact'), 400);
        }

        // Trigger Live Storage Meter Update
        this.updateMeter();

        if (typeof onComplete === 'function') {
          onComplete();
        }
      }
    };

    requestAnimationFrame(animate);
  },

  createParticles(x, y) {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
    const particleCount = 14;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'delete-spark-particle';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 6 + 4;
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5);
      const speed = Math.random() * 60 + 40;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      p.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 10px ${color};
        transition: transform 0.45s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.45s ease-out;
      `;

      document.body.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate3d(${vx}px, ${vy}px, 0) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 500);
    }
  },

  // ─── High-Level Element Delete Trigger ─────────────────────
  tossAndDelete(element, deleteCallback, targetBinId = null) {
    if (!element) {
      if (typeof deleteCallback === 'function') deleteCallback();
      return;
    }

    const rect = element.getBoundingClientRect();
    const fromPos = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    let binEl = targetBinId ? document.getElementById(targetBinId) : null;
    if (!binEl) binEl = document.getElementById('storage-bin-target');
    if (!binEl) binEl = document.getElementById('global-trash-bin');

    // Item crumple effect keyframe on original element before toss
    element.style.transition = 'all 0.25s ease-out';
    element.style.transform = 'scale(0.85) rotate(-4deg)';
    element.style.opacity = '0.4';

    this.toss(fromPos, binEl, () => {
      element.style.height = '0px';
      element.style.margin = '0px';
      element.style.padding = '0px';
      element.style.opacity = '0';
      setTimeout(() => {
        if (typeof deleteCallback === 'function') {
          deleteCallback();
        }
      }, 150);
    });
  },

  // ─── Live Storage Meter JS Logic ────────────────────────────
  getStorageRows() {
    const state = Store.getState();
    const tasks = state.tasks || [];
    const lifeGoals = state.lifeGoals || [];
    const transactions = state.finances?.transactions || [];
    const workoutLogs = state.health?.workoutLogs || [];
    const emailLogs = state.emailLogs || [];

    const jsonStr = JSON.stringify(state);
    const totalStateBytes = new Blob([jsonStr]).size;

    return [
      { id: 'tasks', name: 'Tasks & Projects Data', category: 'Work', count: tasks.length, bytes: Math.max(512, tasks.length * 340) },
      { id: 'life', name: 'Life Goals & Milestones', category: 'Life', count: lifeGoals.length, bytes: Math.max(380, lifeGoals.length * 290) },
      { id: 'finance', name: 'Financial Ledger & Transactions', category: 'Finance', count: transactions.length, bytes: Math.max(890, transactions.length * 420) },
      { id: 'health', name: 'Health & Workout Logs', category: 'Health', count: workoutLogs.length, bytes: Math.max(300, workoutLogs.length * 210) },
      { id: 'email', name: 'SMTP Activity Logs', category: 'System', count: emailLogs.length, bytes: Math.max(250, emailLogs.length * 180) },
      { id: 'profile', name: 'Profile & Identity State', category: 'Core', count: 1, bytes: Math.max(1200, Math.round(totalStateBytes * 0.25)) }
    ];
  },

  updateMeter() {
    const TOTAL = 5 * 1024 * 1024; // 5 MB standard LocalStorage capacity
    const rows = () => this.getStorageRows();
    const fmt = (bytes) => this.fmt(bytes);

    // Exact user JS code logic transform:
    const used = rows().reduce((s, li) => s + li.bytes, 0);
    const freed = TOTAL - used;

    const fill = document.getElementById('meter-fill-bar');
    const used$ = document.getElementById('meter-used-text');
    const freed$ = document.getElementById('meter-freed-text');

    if (fill) {
      const ratio = Math.min(1, used / TOTAL);
      fill.style.transform = `scaleX(${ratio})`;
      fill.style.transformOrigin = 'left center';
    }
    if (used$) used$.textContent = fmt(used);
    if (freed$) freed$.textContent = fmt(freed);

    const percentEl = document.getElementById('meter-percent-text');
    if (percentEl) {
      percentEl.textContent = ((used / TOTAL) * 100).toFixed(1) + '%';
    }
  },

  renderStorageMeterCard() {
    const TOTAL = 5 * 1024 * 1024;
    const rows = this.getStorageRows();
    const used = rows.reduce((s, li) => s + li.bytes, 0);
    const freed = TOTAL - used;
    const ratio = Math.min(1, used / TOTAL);

    return `
      <div class="card card-glass storage-meter-card" style="position:relative;overflow:hidden;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <div>
            <h3 style="margin:0;display:flex;align-items:center;gap:10px;">
              <span id="storage-bin-target" class="interactive-trash-bin" data-tooltip="Toss zone for deleted items">
                <i class="fas fa-trash-alt bin-icon"></i>
                <span class="bin-lid"></span>
              </span>
              Live Storage Usage Meter
            </h3>
            <p style="font-size:var(--text-xs);color:var(--text-secondary);margin:4px 0 0 0;">
              Real-time LocalStorage memory optimization & interactive toss-to-delete bin.
            </p>
          </div>
          <div style="text-align:right;">
            <span id="meter-percent-text" class="badge badge-primary" style="font-size:14px;padding:4px 10px;">
              ${((used / TOTAL) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <!-- Meter Bar Graphic -->
        <div class="meter-bar-container" style="background:var(--bg-tertiary);height:14px;border-radius:10px;overflow:hidden;position:relative;border:1px solid var(--glass-border);margin-bottom:12px;">
          <div id="meter-fill-bar" class="meter-bar-fill" style="height:100%;width:100%;background:linear-gradient(90deg, #10b981 0%, #3b82f6 50%, #f43f5e 100%);transform:scaleX(${ratio});transform-origin:left center;transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
        </div>

        <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);color:var(--text-muted);margin-bottom:20px;">
          <div>Used Space: <strong id="meter-used-text" style="color:var(--text-primary);">${this.fmt(used)}</strong></div>
          <div>Freed Space: <strong id="meter-freed-text" style="color:var(--emerald);">${this.fmt(freed)}</strong></div>
          <div>Total Capacity: <strong>5.00 MB</strong></div>
        </div>

        <!-- Storage Row Items Breakdown -->
        <h4 style="font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin:0 0 10px 0;">Stored Component Data</h4>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${rows.map(row => `
            <div id="storage-row-${row.id}" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-tertiary);border-radius:var(--radius-sm);border:1px solid var(--glass-border);transition:all 0.2s ease;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span class="badge badge-secondary" style="font-size:10px;">${row.category}</span>
                <span style="font-size:var(--text-xs);font-weight:600;">${row.name}</span>
                <span style="font-size:11px;color:var(--text-muted);">(${row.count} items)</span>
              </div>
              <div style="display:flex;align-items:center;gap:12px;">
                <span style="font-family:var(--font-mono);font-size:12px;color:var(--cyan);">${this.fmt(row.bytes)}</span>
                ${row.id !== 'profile' ? `
                  <button class="btn-delete-epic btn-delete-sm" onclick="DeleteEngine.deleteStorageCategory('${row.id}', this.closest('#storage-row-${row.id}'))" data-tooltip="Clear category data">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                ` : '<span style="font-size:10px;color:var(--text-muted);padding:2px 6px;">System Lock</span>'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  deleteStorageCategory(catId, element) {
    this.tossAndDelete(element, () => {
      if (catId === 'tasks') {
        Store.set('tasks', []);
      } else if (catId === 'life') {
        Store.set('lifeGoals', []);
      } else if (catId === 'finance') {
        Store.set('finances.transactions', []);
      } else if (catId === 'health') {
        Store.set('health.workoutLogs', []);
      } else if (catId === 'email') {
        Store.set('emailLogs', []);
      }
      Store.recalculateScores();
      UI.toast('info', 'Storage Cleared', `${catId.toUpperCase()} data cleared with paper toss animation.`);
      Router.render();
    });
  }
};

// Global Floating Trash Bin Widget
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('global-trash-bin')) {
      const globalBin = document.createElement('div');
      globalBin.id = 'global-trash-bin';
      globalBin.className = 'global-trash-widget';
      globalBin.innerHTML = `
        <div class="bin-widget-inner" data-tooltip="Drop Zone / Trash Bin">
          <i class="fas fa-trash-alt bin-icon"></i>
          <div class="bin-lid-glow"></div>
        </div>
      `;
      document.body.appendChild(globalBin);
    }
  });
}
