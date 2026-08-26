/* ═══════════════════════════════════════════════════════════════════
   MAIN DASHBOARD — Audience-Specific Reactive Life Cockpit
   Tailored dynamically for Student, Employee, and Business Owner personas
   ═══════════════════════════════════════════════════════════════════ */

function DashboardPage() {
  const profile = Store.get('profile') || {};
  const identity = Store.get('identity') || 'student';
  const scores = Store.get('scores') || {};
  const tasks = Store.get('tasks') || [];
  const finances = Store.get('finances') || {};
  const urgentTasks = tasks.filter(t => !t.completed && (t.quadrant === 'q1' || t.priority === 'high'));

  const income = Number(finances.monthlyIncome) || 75000;

  // 🎓 1. STUDENT PERSONA SPECIFIC COMPONENTS
  const renderStudentView = () => `
    <!-- Student Hero Metrics -->
    <div class="grid grid-3" style="gap:16px; margin-bottom:24px;">
      <div class="card card-glass" style="padding:20px; border-left:4px solid #00f2fe;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Academic Performance</div>
        <div style="font-size:28px; font-weight:900; color:#00f2fe; margin:6px 0;">${profile.gpa || '8.9 / 10'}</div>
        <div style="font-size:12px; color:#cbd5e1;">Target: <strong>Tier-1 Placements & Fellowships</strong></div>
      </div>
      <div class="card card-glass" style="padding:20px; border-left:4px solid #6366f1;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Next Competitive Exam</div>
        <div style="font-size:20px; font-weight:800; color:#fff; margin:6px 0;">GATE 2027 / CAT 2026</div>
        <div style="font-size:12px; color:#a5b4fc;"><i class="fas fa-clock"></i> 142 Days Remaining • Syllabus 68%</div>
      </div>
      <div class="card card-glass" style="padding:20px; border-left:4px solid #10b981;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Verified Scholarships</div>
        <div style="font-size:28px; font-weight:900; color:#10b981; margin:6px 0;">₹1.85 Lakhs</div>
        <div style="font-size:12px; color:#cbd5e1;">2 Matching NSP & CSR Schemes Open</div>
      </div>
    </div>

    <!-- Student Quick Launch Cockpit -->
    <div class="grid grid-3" style="gap:16px; margin-bottom:24px;">
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/student/colleges')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">🏛️</span>
          <span class="badge badge-primary">NIRF 2026</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Top Indian Colleges & Cutoffs</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">Explore IITs, NITs, AIIMS, IIMs with placement telemetry</p>
      </div>
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/student/scholarships')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">🏆</span>
          <span class="badge badge-success">Govt & CSR</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Scholarships & Grants Radar</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">Real-time deadlines, eligibility match, direct application</p>
      </div>
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/student/internships')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">💼</span>
          <span class="badge badge-warning">High Stipend</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Internship & Research Quests</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">PM Internship scheme, NITI Aayog & top tech roles</p>
      </div>
    </div>
  `;

  // 💼 2. EMPLOYEE PERSONA SPECIFIC COMPONENTS
  const renderEmployeeView = () => `
    <!-- Employee Hero Metrics -->
    <div class="grid grid-3" style="gap:16px; margin-bottom:24px;">
      <div class="card card-glass" style="padding:20px; border-left:4px solid #10b981;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Annual CTC Benchmark</div>
        <div style="font-size:28px; font-weight:900; color:#10b981; margin:6px 0;">₹${profile.salary || '18,50,000'}</div>
        <div style="font-size:12px; color:#cbd5e1;">Target Band: <strong style="color:var(--cyan);">₹32 LPA (Staff Engineer)</strong></div>
      </div>
      <div class="card card-glass" style="padding:20px; border-left:4px solid #6366f1;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Promotion Readiness Score</div>
        <div style="font-size:28px; font-weight:900; color:#6366f1; margin:6px 0;">84 / 100</div>
        <div style="font-size:12px; color:#a5b4fc;"><i class="fas fa-check-circle"></i> 4 of 5 Core Competencies Achieved</div>
      </div>
      <div class="card card-glass" style="padding:20px; border-left:4px solid #f59e0b;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Tax Shield Optimization</div>
        <div style="font-size:28px; font-weight:900; color:#f59e0b; margin:6px 0;">₹64,200</div>
        <div style="font-size:12px; color:#cbd5e1;">Annual Savings via 80C, 80D & NPS</div>
      </div>
    </div>

    <!-- Employee Quick Launch Cockpit -->
    <div class="grid grid-3" style="gap:16px; margin-bottom:24px;">
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/employee/salary')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">📊</span>
          <span class="badge badge-success">CTC Intel</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Salary & Compensation Matrix</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">In-hand breakdown, ESOP valuations & appraisal calculators</p>
      </div>
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/employee/jobs')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">🎯</span>
          <span class="badge badge-primary">Direct Referral</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Tier-1 Lateral Job Search</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">Filtered high-growth opportunities with salary transparency</p>
      </div>
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/employee/mobility')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">🚀</span>
          <span class="badge badge-warning">Promotion Ladder</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Internal Mobility & Level Up</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">Strategic OKRs and leadership skills for executive growth</p>
      </div>
    </div>
  `;

  // 🏢 3. BUSINESS OWNER PERSONA SPECIFIC COMPONENTS
  const renderBusinessView = () => `
    <!-- Business Hero Metrics -->
    <div class="grid grid-3" style="gap:16px; margin-bottom:24px;">
      <div class="card card-glass" style="padding:20px; border-left:4px solid #10b981;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Monthly Recurring Revenue</div>
        <div style="font-size:28px; font-weight:900; color:#10b981; margin:6px 0;">₹${profile.revenue || '8,50,000'}</div>
        <div style="font-size:12px; color:#cbd5e1;">Growth Rate: <strong style="color:var(--emerald);">+24.5% MoM</strong></div>
      </div>
      <div class="card card-glass" style="padding:20px; border-left:4px solid #00f2fe;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Cash Runway & Burn</div>
        <div style="font-size:28px; font-weight:900; color:#00f2fe; margin:6px 0;">16.4 Months</div>
        <div style="font-size:12px; color:#a5b4fc;"><i class="fas fa-shield-alt"></i> Monthly Net Burn: ₹1,80,000</div>
      </div>
      <div class="card card-glass" style="padding:20px; border-left:4px solid #f59e0b;">
        <div style="font-size:12px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Venture Stage</div>
        <div style="font-size:24px; font-weight:900; color:#f59e0b; margin:6px 0;">${profile.businessStage || 'Seed Stage'}</div>
        <div style="font-size:12px; color:#cbd5e1;">Startup India DPIIT Recognized</div>
      </div>
    </div>

    <!-- Business Quick Launch Cockpit -->
    <div class="grid grid-3" style="gap:16px; margin-bottom:24px;">
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/business/overview')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">🏢</span>
          <span class="badge badge-primary">Ops Hub</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Venture Command Center</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">P&L telemetry, unit economics, and client deal pipeline</p>
      </div>
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/business/fundraising')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">📈</span>
          <span class="badge badge-success">Cap Table</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Cap Table & Dilution Engine</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">Model safe notes, equity splits, and VC term sheets</p>
      </div>
      <div class="card card-glass card-hover" style="cursor:pointer; padding:20px;" onclick="Router.navigate('/business/team')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:28px;">👥</span>
          <span class="badge badge-warning">Team OKRs</span>
        </div>
        <h4 style="margin:0 0 4px 0;">Core Team & Resource Map</h4>
        <p style="margin:0; font-size:12px; color:var(--text-muted);">Sprint execution, payroll allocations, and velocity scores</p>
      </div>
    </div>
  `;

  const roleTitleMap = {
    student: '🎓 Student Lifecycle Overview',
    employee: '💼 Professional Career & Wealth Overview',
    business: '🏢 Founder & Venture Scale Overview'
  };

  const content = `
    <div class="dashboard-page">
      ${UI.sectionHeader(
        `Welcome, ${profile.name || 'Saladi Siddharth'}! 👋`,
        `Your personalized command center is configured for the <strong>${roleTitleMap[identity] || 'BioVerse Life Track'}</strong>. Master Life Score is ${scores.life || 78}/100.`,
        `<div style="display:flex; gap:10px;">
          <button class="btn btn-outline btn-sm" onclick="Router.navigate('/dashboard/career')"><i class="fas fa-file-invoice"></i> Analyze Resume ATS</button>
          <button class="btn btn-primary btn-sm" onclick="Router.navigate('/dashboard/coach')"><i class="fas fa-robot"></i> AI Life Coach</button>
        </div>`
      )}

      <!-- Overall Life Score Hero Banner -->
      <div class="card card-glass" id="life-score-card" style="margin-bottom:24px; padding:24px; background:linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(0,242,254,0.12) 100%); border:1px solid rgba(99,102,241,0.35); border-radius:18px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <span class="badge badge-primary" style="font-size:11px; font-weight:700;">${roleTitleMap[identity] || 'Active Goal Track'}</span>
              <span class="badge badge-success" style="font-size:11px;">Server Status: TiDB Online</span>
            </div>
            <h2 style="margin:0; font-size:30px; font-weight:900;">Master Life Score: <span style="color:var(--cyan);">${scores.life || 78}/100</span></h2>
            <p style="margin:6px 0 0 0; color:var(--text-secondary); font-size:13px;">
              Computed across Career (<strong>${scores.career || 75}</strong>), Health (<strong>${scores.health || 82}</strong>), Finance (<strong>${scores.finance || 70}</strong>), Work (<strong>${scores.work || 80}</strong>), and Life Continuum (<strong>${scores.success || 77}</strong>).
            </p>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-secondary" onclick="Router.navigate('/dashboard/health')"><i class="fas fa-heartbeat"></i> Health & Diet</button>
            <button class="btn btn-primary" onclick="Router.navigate('/dashboard/career')"><i class="fas fa-rocket"></i> Career Matrix</button>
          </div>
        </div>
      </div>

      <!-- DYNAMIC AUDIENCE PERSONA CONTENT -->
      ${identity === 'student' ? renderStudentView() : identity === 'employee' ? renderEmployeeView() : renderBusinessView()}

      <!-- 5 Core Life Pillars Quick Hub -->
      <h3 style="margin:24px 0 14px 0; font-size:18px; display:flex; align-items:center; gap:8px;">
        <i class="fas fa-cubes" style="color:var(--cyan);"></i> Master Life Pillars
      </h3>
      <div class="grid grid-5" style="gap:14px; margin-bottom:24px;">
        <div class="card card-glass card-hover" onclick="Router.navigate('/dashboard/career')" style="cursor:pointer; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:24px;">🚀</span>
            <span class="badge badge-info">${scores.career || 75}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0; font-size:14px;">Career & ATS</h4>
          <p style="margin:0; font-size:11px; color:var(--text-muted);">Skill matrix & resume validation</p>
        </div>

        <div class="card card-glass card-hover" onclick="Router.navigate('/dashboard/health')" style="cursor:pointer; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:24px;">💪</span>
            <span class="badge badge-success">${scores.health || 82}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0; font-size:14px;">Health & Diet</h4>
          <p style="margin:0; font-size:11px; color:var(--text-muted);">AI Diet plan & 1-day checkin</p>
        </div>

        <div class="card card-glass card-hover" onclick="Router.navigate('/dashboard/finance')" style="cursor:pointer; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:24px;">💰</span>
            <span class="badge badge-purple">${scores.finance || 70}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0; font-size:14px;">Finance & SIP</h4>
          <p style="margin:0; font-size:11px; color:var(--text-muted);">SIP calculator & tax shields</p>
        </div>

        <div class="card card-glass card-hover" onclick="Router.navigate('/dashboard/work')" style="cursor:pointer; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:24px;">⚡</span>
            <span class="badge badge-warning">${scores.work || 80}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0; font-size:14px;">Work Execution</h4>
          <p style="margin:0; font-size:11px; color:var(--text-muted);">Eisenhower matrix & Pomodoro</p>
        </div>

        <div class="card card-glass card-hover" onclick="Router.navigate('/dashboard/life')" style="cursor:pointer; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:24px;">🌟</span>
            <span class="badge badge-primary">${scores.success || 77}/100</span>
          </div>
          <h4 style="margin:10px 0 2px 0; font-size:14px;">Life Success</h4>
          <p style="margin:0; font-size:11px; color:var(--text-muted);">Wheel of Life & milestones</p>
        </div>
      </div>

      <!-- Urgent Priority Tasks Section -->
      <div class="card card-glass" style="padding:20px; border-radius:16px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <h3 style="margin:0; font-size:16px; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-tasks" style="color:var(--indigo-light);"></i> Priority Action Items
          </h3>
          <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/dashboard/work')">Open Full Matrix →</button>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px;">
          ${urgentTasks.map(t => `
            <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 14px; background:rgba(15,23,42,0.8); border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
              <div style="display:flex; align-items:center; gap:12px;">
                <input type="checkbox" onchange="toggleTaskDone('${t.id}')" style="accent-color:#00f2fe; width:16px; height:16px; cursor:pointer;">
                <span style="font-weight:600; font-size:13.5px; color:#f1f5f9;">${t.title}</span>
              </div>
              <span class="badge badge-danger" style="font-size:10.5px;">HIGH PRIORITY</span>
            </div>
          `).join('') || '<p style="color:var(--text-muted); font-size:13px; margin:0;">No urgent tasks pending! You are completely on track with your sprint milestones.</p>'}
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
