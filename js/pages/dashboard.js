/* ═══════════════════════════════════════════════════════════════════
   MAIN DASHBOARD — Master Overview & Real-Time Command Center
   ═══════════════════════════════════════════════════════════════════ */

function DashboardPage() {
  const profile = Store.get('profile') || {};
  const identity = Store.get('identity') || 'student';
  const scores = Store.get('scores') || {};
  const tasks = Store.get('tasks') || [];
  const finances = Store.get('finances') || {};
  const urgentTasks = tasks.filter(t => !t.completed && (t.quadrant === 'q1' || t.priority === 'high'));

  const income = Number(finances.monthlyIncome) || 75000;

  // Tailored Identity Details
  let roleBadge = '🎓 Student Track';
  let primaryActionButtons = `
    <button class="btn btn-secondary" onclick="Router.navigate('/student/colleges')">🎓 Colleges & Cutoffs</button>
    <button class="btn btn-primary" onclick="Router.navigate('/student/scholarships')">🏆 Govt Scholarships</button>
  `;
  let domain1Title = 'Indian Colleges';
  let domain1Sub = 'Filtered by NIRF & Streams';
  let domain1Route = '/student/colleges';

  if (identity === 'employee') {
    roleBadge = '💼 Working Professional';
    primaryActionButtons = `
      <button class="btn btn-secondary" onclick="Router.navigate('/employee/salary')">💼 Salary Intel & CTC</button>
      <button class="btn btn-primary" onclick="Router.navigate('/dashboard/finance')">💰 SIP & Tax Shield</button>
    `;
    domain1Title = 'Career & Salary Growth';
    domain1Sub = 'Salary benchmarking & promotion';
    domain1Route = '/employee/salary';
  } else if (identity === 'business') {
    roleBadge = '🏢 Founder / Business Owner';
    primaryActionButtons = `
      <button class="btn btn-secondary" onclick="Router.navigate('/business/overview')">🏢 Business Hub</button>
      <button class="btn btn-primary" onclick="Router.navigate('/business/fundraising')">📈 Cap Table & Pitch</button>
    `;
    domain1Title = 'Venture & Scale';
    domain1Sub = 'Cap table, runway & revenue';
    domain1Route = '/business/overview';
  }

  setTimeout(() => {
    if (typeof TourEngine !== 'undefined') {
      if (!Store.hasSeenTour()) {
        TourEngine.start();
      }
    }
  }, 400);

  const content = `
    <div class="dashboard-page">
      ${UI.sectionHeader(
        `Welcome, ${profile.name || 'Saladi Siddharth'}! 👋`,
        `Here is your real-time BioVerse overview tailored for ${roleBadge}. Master Life Score is ${scores.life || 78}/100.`,
        `<div style="display:flex;gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="TourEngine.start(true)" style="border-color:#00f2fe;color:#00f2fe;font-weight:700;"><i class="fas fa-magic"></i> Guided Tour</button>
          <button class="btn btn-primary btn-sm" onclick="Router.navigate('/dashboard/coach')">🤖 Ask AI Coach</button>
        </div>`
      )}

      <!-- Overall Life Score Hero Banner -->
      <div class="card card-glass" id="life-score-card" style="margin-bottom:var(--space-xl);padding:28px;background:linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15));border:1px solid rgba(99,102,241,0.3);">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
          <div>
            <span class="badge badge-primary" style="margin-bottom:8px;">${roleBadge} • ${profile.lifeStage || 'Active Goal Build'}</span>
            <h2 style="margin:0;font-size:32px;">Master Life Score: <span style="color:var(--cyan);">${scores.life || 78}/100</span></h2>
            <p style="margin:6px 0 0 0;color:var(--text-secondary);font-size:var(--text-sm);">
              Monthly Income: <strong style="color:var(--emerald);">₹${income.toLocaleString()}</strong> • Dynamically computed across Career (${scores.career}), Health (${scores.health}), Finance (${scores.finance}), Work (${scores.work}), and Life Success (${scores.success}).
            </p>
          </div>
          <div style="display:flex;gap:10px;">
            ${primaryActionButtons}
          </div>
        </div>
      </div>

      <!-- 5 Main Domain Cards -->
      <div class="grid grid-5" style="gap:14px;margin-bottom:var(--space-xl);">
        
        <div class="card card-glass card-hover" id="career-pillar-card" onclick="Router.navigate('${domain1Route}')" style="cursor:pointer;padding:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:24px;">${identity === 'student' ? '🎓' : identity === 'employee' ? '💼' : '🏢'}</span>
            <span class="badge badge-info">${scores.career}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0;">${domain1Title}</h4>
          <p style="margin:0;font-size:11px;color:var(--text-muted);">${domain1Sub}</p>
        </div>

        <div class="card card-glass card-hover" id="health-pillar-card" onclick="Router.navigate('/dashboard/health')" style="cursor:pointer;padding:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:24px;">💪</span>
            <span class="badge badge-success">${scores.health}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0;">Health & Wellness</h4>
          <p style="margin:0;font-size:11px;color:var(--text-muted);">Water gauge & sleep recovery</p>
        </div>

        <div class="card card-glass card-hover" id="finance-pillar-card" onclick="Router.navigate('/dashboard/finance')" style="cursor:pointer;padding:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:24px;">💰</span>
            <span class="badge badge-purple">${scores.finance}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0;">Finance & Ledger</h4>
          <p style="margin:0;font-size:11px;color:var(--text-muted);">Dynamic income re-analysis</p>
        </div>

        <div class="card card-glass card-hover" id="ai-coach-card" onclick="Router.navigate('/dashboard/work')" style="cursor:pointer;padding:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:24px;">⚡</span>
            <span class="badge badge-warning">${scores.work}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0;">Work Execution</h4>
          <p style="margin:0;font-size:11px;color:var(--text-muted);">Eisenhower matrix & Pomodoro</p>
        </div>

        <div class="card card-glass card-hover" id="journey-continuum-btn" onclick="Router.navigate('/dashboard/life')" style="cursor:pointer;padding:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:24px;">🌟</span>
            <span class="badge badge-primary">${scores.success}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0;">Life Success</h4>
          <p style="margin:0;font-size:11px;color:var(--text-muted);">Life Wheel 5 Pillars & Goals</p>
        </div>

      </div>

      <!-- Urgent Priority Tasks Section -->
      <div class="card card-glass">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-tasks" style="color:var(--indigo-light);"></i> High Priority Action Items</h3>
          <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/dashboard/work')">View All Matrix Tasks →</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${urgentTasks.map(t => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);">
              <div style="display:flex;align-items:center;gap:10px;">
                <input type="checkbox" onchange="toggleTaskDone('${t.id}')">
                <span style="font-weight:600;font-size:var(--text-sm);">${t.title}</span>
              </div>
              <span class="badge badge-danger">URGENT</span>
            </div>
          `).join('') || '<p style="color:var(--text-muted);">No urgent tasks pending! Great job staying ahead.</p>'}
        </div>
      </div>

    </div>
  `;

  return UI.dashboardLayout('/dashboard', content);
}

function toggleTaskDone(id) {
  Store.toggleTask(id);
  Router.render();
}
window.toggleTaskDone = toggleTaskDone;

