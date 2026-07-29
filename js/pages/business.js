/* ═══════════════════════════════════════════════════════════════════
   BUSINESS OWNER-SPECIFIC PAGES
   ═══════════════════════════════════════════════════════════════════ */

function BusinessOverviewPage() {
  const content = `
    ${UI.sectionHeader('🏢 Business Dashboard', 'Your business command center')}
    <div class="stats-grid">
      ${UI.statCard('💰', 'Monthly Revenue', '$52,400', '+12% MoM', 'up', '#10b981')}
      ${UI.statCard('🔥', 'Burn Rate', '$38,000', '/month', '', '#f43f5e')}
      ${UI.statCard('🛤️', 'Runway', '14 months', 'At current burn', '', '#06b6d4')}
      ${UI.statCard('👥', 'Team Size', '12', '+2 this quarter', 'up', '#8b5cf6')}
    </div>
    <div class="grid-dashboard">
      <div>
        <div class="chart-container" style="margin-bottom:16px;">
          <div class="chart-header"><span class="chart-title">Revenue vs Expenses (6 months)</span></div>
          <div class="chart-canvas-wrap"><canvas id="biz-revenue-chart"></canvas></div>
        </div>
        <div class="card-glass">
          <h4 style="margin-bottom:16px;">📊 Key Metrics</h4>
          ${[
            { metric: 'Monthly Recurring Revenue', value: '$42,000', trend: '+8%', up: true },
            { metric: 'Customer Acquisition Cost', value: '$120', trend: '-15%', up: true },
            { metric: 'Lifetime Value', value: '$2,400', trend: '+5%', up: true },
            { metric: 'Churn Rate', value: '3.2%', trend: '+0.5%', up: false },
            { metric: 'Net Promoter Score', value: '72', trend: '+4', up: true },
            { metric: 'Cash on Hand', value: '$540K', trend: '+$40K', up: true },
          ].map(m => `
            <div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid var(--glass-border);">
              <span style="flex:1;font-size:13px;">${m.metric}</span>
              <span style="font-weight:700;font-family:var(--font-mono);margin-right:12px;">${m.value}</span>
              <span class="stat-trend ${m.up ? 'up' : 'down'}"><i class="fas fa-arrow-${m.up ? 'up' : 'down'}"></i> ${m.trend}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <div class="card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">🎯 Growth Stage</h4>
          <div style="text-align:center;margin-bottom:16px;">
            ${UI.progressRing(65, 120, 8, '#10b981')}
          </div>
          ${UI.progressBar('Product-Market Fit', 75, 100, '#10b981')}
          ${UI.progressBar('Revenue Growth', 65, 100, '#6366f1')}
          ${UI.progressBar('Team Building', 55, 100, '#06b6d4')}
          ${UI.progressBar('Market Expansion', 30, 100, '#f59e0b')}
        </div>
        <div class="card-glass">
          <h4 style="margin-bottom:16px;">📋 Action Items</h4>
          ${[
            { task: 'Finalize Series A pitch deck', priority: 'high', due: 'Jul 20' },
            { task: 'Hire senior backend engineer', priority: 'high', due: 'Jul 30' },
            { task: 'Q3 board meeting prep', priority: 'medium', due: 'Aug 5' },
            { task: 'Launch referral program', priority: 'medium', due: 'Aug 15' },
          ].map(t => `
            <div class="task-item">
              <div class="task-checkbox"></div>
              <div class="task-content">
                <div class="task-title">${t.task}</div>
                <div class="task-meta">Due: ${t.due}</div>
              </div>
              <div class="task-priority ${t.priority === 'high' ? 'priority-high' : 'priority-medium'}"></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  setTimeout(() => {
    Charts.line('biz-revenue-chart', {
      labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      values: [35000, 38000, 42000, 45000, 48000, 52400]
    }, { height: 200, colors: ['#10b981'] });
  }, 300);
  return UI.dashboardLayout('/business/overview', content);
}

function BusinessFundraisingPage() {
  const content = `
    ${UI.sectionHeader('💰 Fundraising CRM', 'Track investors, pitches, and funding rounds')}
    <div class="stats-grid">
      ${UI.statCard('🎯', 'Target Raise', '$2M', 'Series A', '', '#6366f1')}
      ${UI.statCard('📊', 'Pipeline', '$4.5M', 'In discussions', 'up', '#06b6d4')}
      ${UI.statCard('✅', 'Committed', '$800K', '40% of target', 'up', '#10b981')}
      ${UI.statCard('📞', 'Meetings', '18', 'This month', 'up', '#f59e0b')}
    </div>
    <div class="card-glass">
      <h4 style="margin-bottom:16px;">Investor Pipeline</h4>
      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Investor</th><th>Type</th><th>Amount</th><th>Stage</th><th>Next Step</th></tr></thead>
          <tbody>
            ${[
              { name: 'Sequoia Capital', type: 'VC', amount: '$500K', stage: 'Term Sheet', step: 'Legal review' },
              { name: 'A16Z', type: 'VC', amount: '$750K', stage: 'Due Diligence', step: 'Financial docs' },
              { name: 'Y Combinator', type: 'Accelerator', amount: '$300K', stage: 'Partner Meeting', step: 'Final pitch' },
              { name: 'Angel Group X', type: 'Angel', amount: '$200K', stage: 'Committed', step: 'Wire transfer' },
              { name: 'Tiger Global', type: 'VC', amount: '$1M', stage: 'First Meeting', step: 'Send deck' },
              { name: 'Local VC Fund', type: 'VC', amount: '$350K', stage: 'Passed', step: '-' },
            ].map(i => `<tr>
              <td style="font-weight:600;">${i.name}</td>
              <td><span class="badge badge-neutral">${i.type}</span></td>
              <td style="font-family:var(--font-mono);font-weight:600;color:var(--emerald);">${i.amount}</td>
              <td><span class="badge ${i.stage === 'Committed' ? 'badge-success' : i.stage === 'Passed' ? 'badge-danger' : i.stage === 'Term Sheet' ? 'badge-warning' : 'badge-info'}">${i.stage}</span></td>
              <td style="font-size:12px;color:var(--text-muted);">${i.step}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  return UI.dashboardLayout('/business/fundraising', content);
}

function BusinessTeamPage() {
  const content = `
    ${UI.sectionHeader('👥 Team Management', 'Build, manage, and grow your team', '<button class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Add Member</button>')}
    <div class="stats-grid">
      ${UI.statCard('👥', 'Team Size', '12', '+2 this quarter', 'up', '#8b5cf6')}
      ${UI.statCard('😊', 'Satisfaction', '8.2/10', '+0.3 this month', 'up', '#10b981')}
      ${UI.statCard('📊', 'Performance', '87%', 'Team average', 'up', '#6366f1')}
      ${UI.statCard('🔄', 'Retention', '92%', 'Annual', 'up', '#06b6d4')}
    </div>
    <div class="card-glass">
      <h4 style="margin-bottom:16px;">Team Directory</h4>
      <div class="grid-2">
        ${[
          { name: 'Alex Chen', role: 'CTO', dept: 'Engineering', perf: 95, avatar: 'AC' },
          { name: 'Sarah Kim', role: 'VP Product', dept: 'Product', perf: 92, avatar: 'SK' },
          { name: 'James Liu', role: 'Sr. Engineer', dept: 'Engineering', perf: 88, avatar: 'JL' },
          { name: 'Priya Patel', role: 'Marketing Lead', dept: 'Marketing', perf: 90, avatar: 'PP' },
          { name: 'David Obi', role: 'Sales Manager', dept: 'Sales', perf: 85, avatar: 'DO' },
          { name: 'Emma Torres', role: 'Designer', dept: 'Product', perf: 91, avatar: 'ET' },
        ].map(m => `
          <div class="card" style="display:flex;align-items:center;gap:12px;">
            <div class="avatar">${m.avatar}</div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:14px;">${m.name}</div>
              <div style="font-size:12px;color:var(--text-muted);">${m.role} · ${m.dept}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:13px;font-weight:700;color:${m.perf >= 90 ? 'var(--emerald)' : 'var(--amber)'};">${m.perf}%</div>
              <div style="font-size:10px;color:var(--text-muted);">Performance</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return UI.dashboardLayout('/business/team', content);
}
