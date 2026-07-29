/* ═══════════════════════════════════════════════════════════════════
   BILLING PAGE
   ═══════════════════════════════════════════════════════════════════ */

function BillingPage() {
  const content = `
    ${UI.sectionHeader('💳 Billing & Subscription', 'Manage your plan and payment methods')}

    <!-- Current Plan -->
    <div class="plan-card">
      <div class="plan-info">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <h3>Growth Plan</h3>
          <span class="badge badge-primary">Current</span>
        </div>
        <p style="font-size:14px;color:var(--text-muted);">$9.99/month · Billed monthly · Renews Aug 1, 2026</p>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-primary btn-sm" onclick="Router.navigate('/pricing')">Upgrade</button>
        <button class="btn btn-ghost btn-sm">Cancel</button>
      </div>
    </div>

    <div class="grid-dashboard">
      <div>
        <!-- Payment Method -->
        <div class="card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">💳 Payment Methods</h4>
          <div class="card" style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
            <div style="font-size:24px;">💳</div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:14px;">Visa ending in 4242</div>
              <div style="font-size:12px;color:var(--text-muted);">Expires 12/2028</div>
            </div>
            <span class="badge badge-success">Default</span>
          </div>
          <button class="btn btn-sm btn-secondary"><i class="fas fa-plus"></i> Add Payment Method</button>
        </div>

        <!-- Invoices -->
        <div class="card-glass">
          <h4 style="margin-bottom:16px;">📄 Invoice History</h4>
          <div class="invoice-list">
            ${[
              { date: 'Jul 1, 2026', amount: '$9.99', status: 'Paid', id: 'INV-2026-007' },
              { date: 'Jun 1, 2026', amount: '$9.99', status: 'Paid', id: 'INV-2026-006' },
              { date: 'May 1, 2026', amount: '$9.99', status: 'Paid', id: 'INV-2026-005' },
              { date: 'Apr 1, 2026', amount: '$9.99', status: 'Paid', id: 'INV-2026-004' },
              { date: 'Mar 1, 2026', amount: '$9.99', status: 'Paid', id: 'INV-2026-003' },
            ].map(inv => `
              <div class="invoice-item">
                <div>
                  <div style="font-size:13px;font-weight:500;">${inv.id}</div>
                  <div style="font-size:12px;color:var(--text-muted);">${inv.date}</div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="font-family:var(--font-mono);font-weight:600;">${inv.amount}</span>
                  <span class="badge badge-success">${inv.status}</span>
                  <button class="btn btn-ghost btn-sm btn-icon"><i class="fas fa-download"></i></button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div>
        <!-- Usage -->
        <div class="card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">📊 Usage This Month</h4>
          ${[
            { feature: 'AI Coach Messages', used: 42, limit: 100, color: '#6366f1' },
            { feature: 'Goal Tracking', used: 12, limit: 25, color: '#10b981' },
            { feature: 'Report Exports', used: 3, limit: 10, color: '#06b6d4' },
            { feature: 'Storage Used', used: 120, limit: 500, color: '#f59e0b', unit: 'MB' },
          ].map(u => {
            const pct = Math.round((u.used / u.limit) * 100);
            return `
              <div style="margin-bottom:16px;">
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                  <span>${u.feature}</span>
                  <span style="color:var(--text-muted);">${u.used}${u.unit||''}/${u.limit}${u.unit||''}</span>
                </div>
                <div class="progress-bar" style="height:6px;">
                  <div class="progress-fill" style="width:${pct}%;background:${u.color};"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Plan Comparison -->
        <div class="card-glass">
          <h4 style="margin-bottom:16px;">🚀 Upgrade Benefits</h4>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Upgrade to Pro for unlimited access</p>
          ${[
            'Unlimited AI Coach messages',
            'Unlimited goal tracking',
            'Priority support',
            'Advanced analytics',
            'Custom integrations',
            'Export all data',
          ].map(b => `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:13px;">
              <i class="fas fa-check" style="color:var(--emerald);font-size:11px;"></i>
              <span>${b}</span>
            </div>
          `).join('')}
          <button class="btn btn-primary btn-full" style="margin-top:16px;" onclick="Router.navigate('/pricing')">
            Upgrade to Pro — $29.99/mo
          </button>
        </div>
      </div>
    </div>
  `;
  return UI.dashboardLayout('/dashboard/billing', content);
}
