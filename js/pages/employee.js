/* ═══════════════════════════════════════════════════════════════════
   EMPLOYEE-SPECIFIC PAGES
   ═══════════════════════════════════════════════════════════════════ */

function EmployeeJobsPage() {
  const content = `
    ${UI.sectionHeader('🔍 Job Search', 'AI-powered job matching and application tracking', '<button class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Add Job</button>')}
    <div class="stats-grid">
      ${UI.statCard('📤', 'Applications', '23', 'sent this month', 'up', '#6366f1')}
      ${UI.statCard('📞', 'Interviews', '7', 'completed', 'up', '#06b6d4')}
      ${UI.statCard('✅', 'Offers', '1', 'pending decision', 'up', '#10b981')}
      ${UI.statCard('🎯', 'Match Score', '87%', 'avg relevance', 'up', '#f59e0b')}
    </div>
    <div class="card-glass">
      <h4 style="margin-bottom:16px;">Recommended Jobs</h4>
      ${[
        { title: 'Senior Software Engineer', company: 'Google', loc: 'Mountain View, CA', salary: '$180K-$250K', match: 95, posted: '2d ago' },
        { title: 'Staff Engineer', company: 'Stripe', loc: 'Remote', salary: '$200K-$280K', match: 92, posted: '3d ago' },
        { title: 'Engineering Manager', company: 'Netflix', loc: 'Los Gatos, CA', salary: '$220K-$350K', match: 88, posted: '1w ago' },
        { title: 'Lead Developer', company: 'Shopify', loc: 'Remote', salary: '$170K-$230K', match: 85, posted: '1w ago' },
        { title: 'Platform Engineer', company: 'Datadog', loc: 'New York, NY', salary: '$175K-$240K', match: 82, posted: '2w ago' },
      ].map(j => `
        <div class="card" style="margin-bottom:12px;display:flex;align-items:center;gap:16px;">
          <div class="avatar" style="background:var(--gradient-cool);font-size:16px;">${j.company[0]}</div>
          <div style="flex:1;">
            <div style="font-weight:600;">${j.title}</div>
            <div style="font-size:12px;color:var(--text-muted);">${j.company} · ${j.loc} · ${j.posted}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--emerald);">${j.salary}</div>
            <span class="badge badge-primary" style="font-size:10px;">${j.match}% match</span>
          </div>
          <button class="btn btn-sm btn-primary">Apply</button>
        </div>
      `).join('')}
    </div>
  `;
  return UI.dashboardLayout('/employee/jobs', content);
}

function EmployeeSalaryPage() {
  const content = `
    ${UI.sectionHeader('💵 Salary Intelligence', 'Market data and negotiation tools')}
    <div class="stats-grid">
      ${UI.statCard('💰', 'Current Salary', '$95,000', 'Annual', '', '#6366f1')}
      ${UI.statCard('📊', 'Market Rate', '$115,000', 'For your role & location', 'up', '#10b981')}
      ${UI.statCard('📈', 'Gap', '+$20,000', 'You may be underpaid', 'up', '#f59e0b')}
      ${UI.statCard('🎯', 'Next Target', '$120,000', 'Based on your trajectory', 'up', '#06b6d4')}
    </div>
    <div class="grid-dashboard">
      <div>
        <div class="chart-container" style="margin-bottom:16px;">
          <div class="chart-header"><span class="chart-title">Salary Growth Trajectory</span></div>
          <div class="chart-canvas-wrap"><canvas id="salary-chart"></canvas></div>
        </div>
        <div class="card-glass">
          <h4 style="margin-bottom:16px;">💡 Negotiation Tips</h4>
          ${[
            'Research shows the best time to negotiate is after completing a major project',
            'Always negotiate total compensation, not just base salary',
            'Have competing offers or market data ready before the conversation',
            'Practice your pitch with the AI Coach before the real meeting',
          ].map((t, i) => `
            <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--glass-border);">
              <span style="font-weight:700;color:var(--indigo-light);min-width:20px;">${i+1}.</span>
              <span style="font-size:13px;color:var(--text-secondary);">${t}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <div class="card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">📊 Market Comparison</h4>
          ${[
            { company: 'Google', salary: '$175K', total: '$320K' },
            { company: 'Meta', salary: '$170K', total: '$300K' },
            { company: 'Amazon', salary: '$165K', total: '$280K' },
            { company: 'Microsoft', salary: '$160K', total: '$260K' },
            { company: 'Average', salary: '$115K', total: '$140K' },
          ].map(c => `
            <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--glass-border);">
              <span style="font-size:13px;font-weight:500;flex:1;">${c.company}</span>
              <span style="font-size:12px;font-family:var(--font-mono);">Base: ${c.salary}</span>
              <span style="font-size:12px;font-family:var(--font-mono);color:var(--emerald);">TC: ${c.total}</span>
            </div>
          `).join('')}
        </div>
        <div class="card-glass">
          <h4 style="margin-bottom:16px;">🎯 Skills That Pay More</h4>
          ${[
            { skill: 'System Design', premium: '+18%' },
            { skill: 'Machine Learning', premium: '+25%' },
            { skill: 'Cloud Architecture', premium: '+15%' },
            { skill: 'Leadership/Management', premium: '+30%' },
          ].map(s => `
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--glass-border);font-size:13px;">
              <span>${s.skill}</span>
              <span style="font-weight:700;color:var(--emerald);">${s.premium}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  setTimeout(() => {
    Charts.line('salary-chart', {
      labels: ['2022', '2023', '2024', '2025', '2026', '2027*'],
      values: [65000, 75000, 82000, 90000, 95000, 120000]
    }, { height: 180, colors: ['#10b981'] });
  }, 300);
  return UI.dashboardLayout('/employee/salary', content);
}

function EmployeeMobilityPage() {
  const content = `
    ${UI.sectionHeader('📈 Internal Mobility', 'Grow within your organization')}
    <div class="card-glass" style="margin-bottom:16px;">
      <h4 style="margin-bottom:16px;">🗺️ Career Path Within Company</h4>
      <div class="roadmap">
        ${[
          { date: '2022', title: 'Junior Developer', desc: 'Started career, learned fundamentals', completed: true },
          { date: '2024', title: 'Software Engineer', desc: 'Current role, leading features', current: true },
          { date: '2026', title: 'Senior Engineer', desc: 'Technical leadership, mentoring', },
          { date: '2028', title: 'Staff Engineer / EM', desc: 'Architecture decisions, team lead', },
        ].map(r => `
          <div class="roadmap-item">
            <div class="roadmap-dot ${r.completed ? 'completed' : ''} ${r.current ? 'current' : ''}"></div>
            <div class="roadmap-content">
              <div class="roadmap-date">${r.date}</div>
              <div class="roadmap-title">${r.title}</div>
              <div class="roadmap-desc">${r.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="card-glass">
      <h4 style="margin-bottom:16px;">🏆 Promotion Readiness</h4>
      ${UI.progressBar('Technical Skills', 80, 100, '#6366f1')}
      ${UI.progressBar('Leadership', 55, 100, '#06b6d4')}
      ${UI.progressBar('Impact & Scope', 65, 100, '#10b981')}
      ${UI.progressBar('Visibility', 45, 100, '#f59e0b')}
      ${UI.progressBar('Peer Relationships', 70, 100, '#ec4899')}
      <div style="margin-top:16px;padding:12px;background:rgba(99,102,241,0.08);border-radius:8px;font-size:13px;color:var(--text-secondary);">
        <strong style="color:var(--indigo-light);">💡 AI Insight:</strong> Focus on increasing visibility and leadership contributions. Consider leading a cross-team project or presenting at team all-hands.
      </div>
    </div>
  `;
  return UI.dashboardLayout('/employee/mobility', content);
}
