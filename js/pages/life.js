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
              <em>"Consistency in small daily habits outperforms sudden bursts of intensity. Your health, skills, and savings compound in silence."</em>
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
        <div class="card card-glass" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;">
          <h3 style="margin:0 0 16px 0;width:100%;display:flex;align-items:center;justify-content:space-between;">
            <span><i class="fas fa-dharmachakra" style="color:var(--purple);"></i> 5-Pillar Life Wheel Radar</span>
            <span class="badge badge-purple">Harmony: 84%</span>
          </h3>
          <div class="chart-canvas-wrap" style="width:100%;max-width:320px;height:240px;">
            <canvas id="life-radar-chart"></canvas>
          </div>
        </div>

        <!-- 5 Core Pillar Cards -->
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${[
            { icon: '🌱', name: 'Growth & Mastery', score: scores.career || 85, desc: 'Technical depth, system design, and continuous learning.' },
            { icon: '❤️', name: 'Relationships & Family', score: 80, desc: 'Quality time with loved ones and meaningful friendships.' },
            { icon: '🎯', name: 'Purpose & Mission', score: 90, desc: 'Building high-impact software products & mentorship.' },
            { icon: '🧭', name: 'Adventure & Exploration', score: 72, desc: 'Travel, nature treks, and trying new experiences.' },
            { icon: '🏛️', name: 'Legacy & Giving', score: 82, desc: 'Open-source contributions and community scholarship.' }
          ].map(p => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:rgba(15,23,42,0.85);border-radius:12px;border:1px solid var(--glass-border);">
              <span style="font-size:22px;">${p.icon}</span>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-weight:700;font-size:13px;color:#fff;">
                  <span>${p.name}</span>
                  <span style="color:var(--purple);">${p.score}%</span>
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

  setTimeout(() => {
    if (typeof Charts !== 'undefined') {
      Charts.radar('life-radar-chart', {
        labels: ['Growth', 'Relationships', 'Purpose', 'Adventure', 'Legacy'],
        values: [scores.career || 85, 80, 90, 72, 82]
      }, { height: 240 });
    }
  }, 200);

  return UI.dashboardLayout('/dashboard/life', content);
}

function toggleGoalDone(id) {
  Store.toggleLifeGoal(id);
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

  Store.addLifeGoal({ title, category, targetYear, progress: 10, completed: false });
  UI.closeModal();
  UI.toast('success', 'Life Goal Milestone Set 🌟', `Added "${title}" to your Life Success Matrix!`);
  Router.render();
}
window.saveLifeGoalForm = saveLifeGoalForm;
