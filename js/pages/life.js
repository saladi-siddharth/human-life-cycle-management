/* ═══════════════════════════════════════════════════════════════════
   LIFE SUCCESS PAGE — Life Wheel, Goal Matrix & Functional Life Goal Creation
   ═══════════════════════════════════════════════════════════════════ */

function LifePage() {
  const goals = Store.get('lifeGoals') || [];
  const scores = Store.get('scores') || {};

  const completedCount = goals.filter(g => g.completed).length;

  const content = `
    <div class="life-page">
      ${UI.sectionHeader(
        '🌟 Life Success & Purpose Matrix',
        'Balance your life wheel across Relationships, Growth, Purpose, Adventure, and Legacy.',
        `<button class="btn btn-primary btn-sm" onclick="openLifeGoalModal()"><i class="fas fa-plus"></i> Add New Life Goal</button>`
      )}

      <!-- Hero Score & Life Wheel Balance -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="font-size:42px;background:rgba(168,85,247,0.15);width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;">🌟</div>
          <div>
            <h2 style="margin:0;font-size:24px;">Life Success Score: <span style="color:var(--purple);">${scores.success || 77}/100</span></h2>
            <p style="margin:4px 0 0 0;color:var(--text-secondary);font-size:var(--text-sm);">
              ${completedCount} of ${goals.length} lifetime milestones achieved.
            </p>
          </div>
        </div>
        <button class="btn btn-primary" onclick="openLifeGoalModal()"><i class="fas fa-bullseye"></i> Add Life Goal</button>
      </div>

      <!-- Life Wheel 5 Pillars Grid -->
      <h3 style="margin:0 0 16px 0;">5 Core Pillars of Life Balance</h3>
      <div class="grid grid-5" style="gap:14px;margin-bottom:var(--space-xl);">
        <div class="card card-glass" style="text-align:center;padding:16px;">
          <div style="font-size:24px;margin-bottom:6px;">🌱</div>
          <div style="font-weight:700;font-size:var(--text-sm);">Growth</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Continuous Learning</div>
        </div>

        <div class="card card-glass" style="text-align:center;padding:16px;">
          <div style="font-size:24px;margin-bottom:6px;">❤️</div>
          <div style="font-weight:700;font-size:var(--text-sm);">Relationships</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Family & Bonds</div>
        </div>

        <div class="card card-glass" style="text-align:center;padding:16px;">
          <div style="font-size:24px;margin-bottom:6px;">🎯</div>
          <div style="font-weight:700;font-size:var(--text-sm);">Purpose</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Meaningful Impact</div>
        </div>

        <div class="card card-glass" style="text-align:center;padding:16px;">
          <div style="font-size:24px;margin-bottom:6px;">🧭</div>
          <div style="font-weight:700;font-size:var(--text-sm);">Adventure</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Travel & Exploration</div>
        </div>

        <div class="card card-glass" style="text-align:center;padding:16px;">
          <div style="font-size:24px;margin-bottom:6px;">🏛️</div>
          <div style="font-weight:700;font-size:var(--text-sm);">Legacy</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Mentorship & Giving</div>
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
            <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);">
              <div style="display:flex;align-items:center;gap:12px;">
                <input type="checkbox" ${g.completed ? 'checked' : ''} onchange="toggleGoalDone('${g.id}')">
                <div>
                  <div style="font-weight:700;font-size:var(--text-sm);${g.completed ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${g.title}</div>
                  <div style="font-size:11px;color:var(--indigo-light);margin-top:2px;">Category: ${g.category} • Target Year: ${g.targetYear}</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;">
                <span class="badge ${g.completed ? 'badge-success' : 'badge-primary'}">${g.completed ? 'Achieved 🎉' : `${g.progress}% Done`}</span>
                <button class="btn btn-ghost btn-sm" style="padding:2px 6px;" onclick="deleteGoalItem('${g.id}')">✕</button>
              </div>
            </div>
          `).join('') || '<p style="color:var(--text-muted);">No life goals created yet. Click "Add New Life Goal" above!</p>'}
        </div>
      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/life', content);
}

// ─── Life Goals Interactive Handlers ───────────────────────
function toggleGoalDone(id) {
  Store.toggleLifeGoal(id);
  Router.render();
}

function deleteGoalItem(id) {
  Store.deleteLifeGoal(id);
  Router.render();
}

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
            <option value="Growth">Growth & Learning</option>
            <option value="Relationships">Relationships & Family</option>
            <option value="Purpose">Purpose & Career</option>
            <option value="Adventure">Adventure & Travel</option>
            <option value="Legacy">Legacy & Giving</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Target Year</label>
          <input type="number" id="g-year" class="chat-input" value="2026" required>
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Current Progress (%)</label>
        <input type="range" min="0" max="100" step="5" value="20" class="slider" id="g-prog" oninput="document.getElementById('prog-val').textContent = this.value + '%'">
        <span id="prog-val" style="font-size:12px;font-weight:700;color:var(--purple);display:block;text-align:right;">20%</span>
      </div>
      <button type="submit" class="btn btn-primary">Save Life Goal</button>
    </form>
  `;
  UI.modal(html);
}

function saveLifeGoalForm(e) {
  e.preventDefault();
  const title = document.getElementById('g-title').value;
  const category = document.getElementById('g-cat').value;
  const targetYear = document.getElementById('g-year').value;
  const progress = document.getElementById('g-prog').value;

  Store.addLifeGoal({ title, category, targetYear, progress });
  UI.closeModal();
  UI.toast('success', 'Life Goal Added!', `Saved "${title}" under ${category}.`);
  Router.render();
}

window.openLifeGoalModal = openLifeGoalModal;
window.saveLifeGoalForm = saveLifeGoalForm;
window.toggleGoalDone = toggleGoalDone;
window.deleteGoalItem = deleteGoalItem;

