/* ═══════════════════════════════════════════════════════════════════
   LIFE SUCCESS PAGE — 5-Pillar Balance, Goals & Daily Motivation
   ═══════════════════════════════════════════════════════════════════ */

function LifePage() {
  const goals = Store.get('lifeGoals') || [
    { id: 'g-1', title: 'Achieve ₹50L Investment Corpus via Micro-SIPs', category: 'Purpose', targetYear: 2026, progress: 65, completed: false },
    { id: 'g-2', title: 'Mentor 100 Engineering Students in Full-Stack AI', category: 'Legacy', targetYear: 2027, progress: 40, completed: false },
    { id: 'g-3', title: 'Complete High-Altitude Himalayan Trek (Kedarkantha)', category: 'Adventure', targetYear: 2026, progress: 80, completed: true }
  ];
  const scores = Store.get('scores') || {};
  const completedCount = goals.filter(g => g.completed).length;

  const lifeQuote = EmailService.getRandomQuote('general');

  const content = `
    <div class="life-page">
      ${UI.sectionHeader(
        '🌟 Life Success & Purpose Matrix',
        'Balance your life wheel across Relationships, Growth, Purpose, Adventure, and Legacy with daily motivational guidance.',
        `<button class="btn btn-primary btn-sm" onclick="openLifeGoalModal()"><i class="fas fa-plus"></i> Add New Life Goal</button>`
      )}

      <!-- Daily Motivation Banner -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:22px;background:linear-gradient(135deg, rgba(168,85,247,0.15), rgba(6,182,212,0.15));border:1px solid rgba(168,85,247,0.3);">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="font-size:36px;">✨</div>
          <div>
            <h3 style="margin:0;font-size:18px;color:#fff;">Daily Life Vision Motivation</h3>
            <p style="margin:4px 0 0 0;font-size:13px;color:#cbd5e1;line-height:1.5;">
              <em>"${lifeQuote.text}"</em> — <strong>${lifeQuote.author}</strong>
            </p>
          </div>
        </div>
      </div>

      <!-- Hero Score & Life Wheel Balance -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="font-size:42px;background:rgba(168,85,247,0.15);width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;">🌟</div>
          <div>
            <h2 style="margin:0;font-size:24px;">Life Success Score: <span style="color:var(--purple);">${scores.success || 82}/100</span></h2>
            <p style="margin:4px 0 0 0;color:var(--text-secondary);font-size:var(--text-sm);">
              ${completedCount} of ${goals.length} lifetime milestones achieved • Dynamic 5-Pillar Equilibrium
            </p>
          </div>
        </div>
        <button class="btn btn-primary" onclick="openLifeGoalModal()"><i class="fas fa-bullseye"></i> Add Life Goal</button>
      </div>

      <!-- Life Wheel 5 Pillars Radar Chart & Balance Matrix Grid -->
      <div class="grid grid-2" id="life-radar-section" style="gap:24px;margin-bottom:var(--space-xl);">
        
        <!-- Radar Visualizer -->
        <div class="card card-glass cyber-card-glow" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;">
          <div class="cyber-card-inner" style="width:100%; display:flex; flex-direction:column; align-items:center;">
            <h3 style="margin:0 0 16px 0;width:100%;display:flex;align-items:center;justify-content:space-between;">
              <span style="display:flex; align-items:center; gap:8px;"><i class="fas fa-dharmachakra" style="color:var(--purple);"></i> 5-Pillar Living Radar</span>
              <span class="badge badge-purple" style="font-size:11px;">Harmony: 84%</span>
            </h3>
            <div class="chart-canvas-wrap" style="width:100%;max-width:320px;height:260px;position:relative;">
              <canvas id="life-radar-chart" style="width:100%;height:100%;"></canvas>
            </div>
          </div>
        </div>

        <!-- 5 Core Pillar Cards -->
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${[
            { icon: '🌱', name: 'Growth & Mastery', score: scores.career || 85, desc: 'Technical depth, system design, and continuous learning.', color: '#10b981' },
            { icon: '❤️', name: 'Relationships & Family', score: 80, desc: 'Quality time with loved ones and meaningful friendships.', color: '#ec4899' },
            { icon: '🎯', name: 'Purpose & Mission', score: 90, desc: 'Building high-impact software products & mentorship.', color: '#00f2fe' },
            { icon: '🧭', name: 'Adventure & Exploration', score: 72, desc: 'Travel, nature treks, and trying new experiences.', color: '#f59e0b' },
            { icon: '🏛️', name: 'Legacy & Giving', score: 82, desc: 'Open-source contributions and community scholarship.', color: '#a855f7' }
          ].map((p, idx) => `
            <div class="anim-fade-up anim-stagger-${idx + 1}" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(15,23,42,0.85);border-radius:12px;border:1px solid var(--glass-border);transition:all 0.2s ease;">
              <span style="font-size:24px;" class="star-twinkle-burst">${p.icon}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;color:#fff;margin-bottom:4px;">
                  <span>${p.name}</span>
                  <span style="color:${p.color}; font-weight:800;">${p.score}%</span>
                </div>
                <div class="progress-bar" style="height:5px; background:rgba(255,255,255,0.06); border-radius:999px; margin-bottom:4px;">
                  <div class="macro-shimmer-fill" style="width:${p.score}%; background:${p.color};"></div>
                </div>
                <div style="font-size:11px;color:var(--text-muted);">${p.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Life Bucket List & Milestones -->
      <div class="card card-glass">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-flag-checkered" style="color:var(--purple);"></i> Lifetime Bucket List & Goals</h3>
          <button class="btn btn-secondary btn-sm" onclick="openLifeGoalModal()"><i class="fas fa-plus"></i> New Life Goal</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          ${goals.map(g => `
            <div id="goal-row-${g.id}" style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);transition:all 0.2s ease;">
              <div style="display:flex;align-items:center;gap:12px;">
                <input type="checkbox" ${g.completed ? 'checked' : ''} onchange="toggleGoalDone('${g.id}')">
                <div>
                  <div style="font-weight:700;font-size:var(--text-sm);${g.completed ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${g.title}</div>
                  <div style="font-size:11px;color:var(--indigo-light);margin-top:2px;">Category: ${g.category} • Target Year: ${g.targetYear}</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;">
                <span class="badge ${g.completed ? 'badge-success' : 'badge-primary'}">${g.completed ? 'Achieved 🎉' : `${g.progress || 50}% Done`}</span>
                <button class="btn-delete-epic btn-delete-sm" onclick="deleteGoalItem('${g.id}', this.closest('#goal-row-${g.id}'))" data-tooltip="Delete Goal">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          `).join('') || '<p style="color:var(--text-muted);">No life goals created yet. Click "Add New Life Goal" above!</p>'}
        </div>
      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/life', content);
}

// ─── SACRED GEOMETRY 5-PILLAR LIVING RADAR ENGINE ─────────────
function initLifeAnimations() {
  const canvas = document.getElementById('life-radar-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const size = Math.min(rect.width || 300, rect.height || 260);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const scores = Store.get('scores') || {};
  const labels = ['Growth', 'Relationships', 'Purpose', 'Adventure', 'Legacy'];
  const values = [scores.career || 85, 80, 90, 72, 82];
  const count = labels.length;
  const angleStep = (Math.PI * 2) / count;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 38;

  let time = 0;

  function renderRadar() {
    if (!document.getElementById('life-radar-chart')) return;
    ctx.clearRect(0, 0, size, size);
    time += 0.025;

    // Draw concentric polygon grid levels
    const levels = 4;
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (radius / levels) * lvl;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const a = i * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = lvl === levels ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Radial spokes
    for (let i = 0; i < count; i++) {
      const a = i * angleStep - Math.PI / 2;
      const x = cx + radius * Math.cos(a);
      const y = cy + radius * Math.sin(a);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Outer rotating constellation orbit ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 12, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw animated data polygon with subtle breathing
    const breath = Math.sin(time * 2) * 2;
    const dataPoints = values.map((val, i) => {
      const r = (radius * (val / 100)) + breath;
      const a = i * angleStep - Math.PI / 2;
      return {
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a),
        val,
        label: labels[i]
      };
    });

    // Fill data polygon with vibrant gradient
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
    grad.addColorStop(0, 'rgba(168, 85, 247, 0.5)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0.15)');

    ctx.beginPath();
    dataPoints.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Data polygon outline
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw vertex nodes and labels
    dataPoints.forEach((p, idx) => {
      // Outer pulse halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6 + Math.sin(time * 3 + idx) * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.25)';
      ctx.fill();

      // Vertex Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label at spoke tips
      const labelAngle = idx * angleStep - Math.PI / 2;
      const labelX = cx + (radius + 24) * Math.cos(labelAngle);
      const labelY = cy + (radius + 24) * Math.sin(labelAngle);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.label, labelX, labelY);
    });

    requestAnimationFrame(renderRadar);
  }

  renderRadar();
}
window.initLifeAnimations = initLifeAnimations;


function toggleGoalDone(id) {
  Store.toggleLifeGoal(id);
  if (typeof ActionPhysics !== 'undefined') {
    ActionPhysics.slothCelebration('Milestone Achieved! 🏆');
  }
  if (typeof GamificationEngine !== 'undefined') {
    GamificationEngine.awardXP(50, 'Achieved Lifetime Goal Milestone');
  }
  Router.render();
}
window.toggleGoalDone = toggleGoalDone;

function deleteGoalItem(id, element) {
  const el = element || document.getElementById(`goal-row-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteLifeGoal(id);
    UI.toast('info', 'Goal Removed', 'Milestone removed from your life list.');
    Router.render();
  });
}
window.deleteGoalItem = deleteGoalItem;

function openLifeGoalModal() {
  const html = `
    <h3>Add New Life Goal</h3>
    <form onsubmit="saveLifeGoalForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Goal Title / Milestone</label>
        <input type="text" id="g-title" class="chat-input" placeholder="e.g. Mentor 50 students in tech or Trek to Everest Base Camp" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Life Pillar Category</label>
          <select id="g-cat" class="chat-input">
            <option value="Growth">🌱 Growth & Learning</option>
            <option value="Relationships">❤️ Relationships & Family</option>
            <option value="Purpose" selected>🎯 Purpose & Mission</option>
            <option value="Adventure">🧭 Adventure & Exploration</option>
            <option value="Legacy">🏛️ Legacy & Giving</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Target Year</label>
          <input type="number" id="g-year" class="chat-input" value="2027" required>
        </div>
      </div>
      ${UI.pillButton({ text: 'Set Life Milestone', icon: '<i class="fas fa-star"></i>', theme: 'purple', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}
window.openLifeGoalModal = openLifeGoalModal;

function saveLifeGoalForm(e) {
  e.preventDefault();
  const title = document.getElementById('g-title')?.value;
  const category = document.getElementById('g-cat')?.value;
  const targetYear = document.getElementById('g-year')?.value;

  const newGoal = { id: 'g-' + Date.now(), title, category, targetYear, progress: 10, completed: false };
  Store.addLifeGoal(newGoal);
  UI.closeModal();

  if (typeof ActionPhysics !== 'undefined') {
    ActionPhysics.slothCelebration(title);
  }
  if (typeof GamificationEngine !== 'undefined') {
    GamificationEngine.awardXP(30, `Set Milestone: ${title}`);
  }

  UI.toast('success', 'Life Goal Milestone Set 🌟', `Added "${title}" to your Life Success Matrix!`);
  Router.render();

  setTimeout(() => {
    const firstGoal = document.querySelector('#goal-row-' + newGoal.id + ', [id^="goal-row-"]');
    if (firstGoal) {
      firstGoal.classList.add('card-entry-pop', 'highlight-pulse-gold');
    }
  }, 40);
}
window.saveLifeGoalForm = saveLifeGoalForm;
