/* ═══════════════════════════════════════════════════════════════════
   ADMIN PANEL PAGE
   ═══════════════════════════════════════════════════════════════════ */

function AdminPage() {
  const content = `
    ${UI.sectionHeader('🛡️ Admin Dashboard', 'Platform overview and management')}

    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));">
      ${UI.statCard('👥', 'Total Users', '52,340', '+2,100 this month', 'up', '#6366f1')}
      ${UI.statCard('📈', 'Active Today', '8,420', '+340 vs yesterday', 'up', '#10b981')}
      ${UI.statCard('💰', 'MRR', '$124,500', '+$8,200 MoM', 'up', '#f59e0b')}
      ${UI.statCard('⭐', 'Avg Rating', '4.9', '+0.1 this quarter', 'up', '#ec4899')}
      ${UI.statCard('🔄', 'Retention', '94%', '+2% this quarter', 'up', '#06b6d4')}
    </div>

    <div class="grid-dashboard">
      <div>
        <!-- User Growth Chart -->
        <div class="chart-container" style="margin-bottom:16px;">
          <div class="chart-header">
            <span class="chart-title">User Growth</span>
            <div class="tabs" style="background:transparent;padding:0;">
              <button class="tab-item active btn-sm" style="padding:6px 12px;">Monthly</button>
              <button class="tab-item btn-sm" style="padding:6px 12px;">Quarterly</button>
            </div>
          </div>
          <div class="chart-canvas-wrap"><canvas id="admin-growth-chart"></canvas></div>
        </div>

        <!-- Revenue Chart -->
        <div class="chart-container" style="margin-bottom:16px;">
          <div class="chart-header">
            <span class="chart-title">Revenue (MRR)</span>
          </div>
          <div class="chart-canvas-wrap"><canvas id="admin-revenue-chart"></canvas></div>
        </div>

        <!-- Recent Users -->
        <div class="card-glass">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h4>Recent Users</h4>
            <button class="btn btn-ghost btn-sm">View All</button>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>User</th><th>Type</th><th>Plan</th><th>Joined</th><th>Status</th></tr></thead>
              <tbody>
                ${[
                  { name: 'Ravi Kumar', email: 'ravi@gmail.com', type: 'Student', plan: 'Pro', date: 'Jul 14', status: 'Active' },
                  { name: 'Sarah Johnson', email: 'sarah@outlook.com', type: 'Employee', plan: 'Growth', date: 'Jul 14', status: 'Active' },
                  { name: 'Mike Chen', email: 'mike@company.com', type: 'Business', plan: 'Elite', date: 'Jul 13', status: 'Active' },
                  { name: 'Priya Patel', email: 'priya@icloud.com', type: 'Student', plan: 'Free', date: 'Jul 13', status: 'Trial' },
                  { name: 'John Smith', email: 'john@work.com', type: 'Employee', plan: 'Pro', date: 'Jul 12', status: 'Active' },
                  { name: 'Lisa Wang', email: 'lisa@startup.io', type: 'Business', plan: 'Growth', date: 'Jul 12', status: 'Active' },
                  { name: 'Alex Rivera', email: 'alex@uni.edu', type: 'Student', plan: 'Free', date: 'Jul 11', status: 'Churned' },
                ].map(u => `<tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <div class="avatar avatar-sm">${u.name.split(' ').map(w=>w[0]).join('')}</div>
                      <div><div style="font-weight:500;font-size:13px;">${u.name}</div><div style="font-size:11px;color:var(--text-muted);">${u.email}</div></div>
                    </div>
                  </td>
                  <td><span class="badge ${u.type==='Student'?'badge-primary':u.type==='Employee'?'badge-info':'badge-warning'}">${u.type}</span></td>
                  <td style="font-size:13px;">${u.plan}</td>
                  <td style="font-size:13px;color:var(--text-muted);">${u.date}</td>
                  <td><span class="badge ${u.status==='Active'?'badge-success':u.status==='Trial'?'badge-warning':'badge-danger'}">${u.status}</span></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <!-- User Distribution -->
        <div class="card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">📊 User Distribution</h4>
          <div style="display:flex;justify-content:center;margin-bottom:16px;">
            <canvas id="admin-users-donut"></canvas>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${[
              { label: 'Students', count: '28,400', pct: '54%', color: '#6366f1' },
              { label: 'Employees', count: '18,200', pct: '35%', color: '#10b981' },
              { label: 'Business Owners', count: '5,740', pct: '11%', color: '#f59e0b' },
            ].map(d => `
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;">
                <div style="width:10px;height:10px;border-radius:3px;background:${d.color};"></div>
                <span style="flex:1;">${d.label}</span>
                <span style="font-weight:600;">${d.count}</span>
                <span style="color:var(--text-muted);min-width:30px;text-align:right;">${d.pct}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Plan Distribution -->
        <div class="card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">💎 Plan Distribution</h4>
          ${[
            { plan: 'Free', users: '31,200', pct: 60, color: 'var(--text-muted)' },
            { plan: 'Growth ($9.99)', users: '12,400', pct: 24, color: '#06b6d4' },
            { plan: 'Pro ($29.99)', users: '6,800', pct: 13, color: '#6366f1' },
            { plan: 'Elite ($99)', users: '1,940', pct: 3, color: '#f59e0b' },
          ].map(p => `
            <div style="margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                <span style="font-weight:500;">${p.plan}</span>
                <span style="color:var(--text-muted);">${p.users} users</span>
              </div>
              <div class="progress-bar" style="height:6px;">
                <div class="progress-fill" style="width:${p.pct}%;background:${p.color};"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- System Health -->
        <div class="card-glass">
          <h4 style="margin-bottom:16px;">🖥️ System Health</h4>
          ${[
            { name: 'API Response', value: '45ms', status: 'Healthy', color: 'var(--emerald)' },
            { name: 'Database', value: '99.99%', status: 'Healthy', color: 'var(--emerald)' },
            { name: 'CDN', value: '99.95%', status: 'Healthy', color: 'var(--emerald)' },
            { name: 'AI Engine', value: '340ms avg', status: 'Normal', color: 'var(--amber)' },
            { name: 'Error Rate', value: '0.02%', status: 'Low', color: 'var(--emerald)' },
          ].map(s => `
            <div style="display:flex;align-items:center;padding:8px 0;border-bottom:1px solid var(--glass-border);font-size:13px;">
              <div style="width:8px;height:8px;border-radius:50%;background:${s.color};margin-right:10px;"></div>
              <span style="flex:1;">${s.name}</span>
              <span style="font-family:var(--font-mono);font-weight:500;margin-right:12px;">${s.value}</span>
              <span class="badge ${s.status==='Healthy'?'badge-success':'badge-warning'}" style="font-size:10px;">${s.status}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    Charts.line('admin-growth-chart', {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      values: [32000, 36000, 39000, 42500, 46000, 50200, 52340]
    }, { height: 180, colors: ['#6366f1'] });

    Charts.line('admin-revenue-chart', {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      values: [82000, 90000, 96000, 105000, 112000, 116300, 124500]
    }, { height: 180, colors: ['#10b981'] });

    Charts.doughnut('admin-users-donut', {
      values: [54, 35, 11],
      colors: ['#6366f1', '#10b981', '#f59e0b']
    }, { size: 140, lineWidth: 16, centerText: '52.3K', centerSub: 'Total Users' });
  }, 300);

  return UI.dashboardLayout('/admin', content);
}
