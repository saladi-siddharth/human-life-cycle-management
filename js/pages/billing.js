/* ═══════════════════════════════════════════════════════════════════
   BILLING PAGE
   ═══════════════════════════════════════════════════════════════════ */

function BillingPage() {
  const state = Store.getState();
  const currentTier = BillingEngine.getCurrentTier();
  const sub = state.subscription || {
    tier: 'pro',
    active: true,
    billingCycle: 'monthly',
    renewsOn: '30 Sep 2026',
    invoices: [
      { id: 'BV-INV-99021', date: '01 Aug 2026', amount: '₹353', status: 'Paid', tier: 'pro' },
      { id: 'BV-INV-88102', date: '01 Jul 2026', amount: '₹353', status: 'Paid', tier: 'pro' }
    ]
  };

  const invoices = sub.invoices || [];

  const content = `
    ${UI.sectionHeader('💳 Billing & Subscription', 'Manage your SaaS plan, Razorpay payment rails, and GST tax invoices')}

    <!-- Current Plan -->
    <div class="plan-card" style="background:linear-gradient(135deg, rgba(0,242,254,0.12) 0%, rgba(99,102,241,0.15) 100%); border:1px solid rgba(0,242,254,0.35); border-radius:16px; padding:24px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
      <div class="plan-info">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <h2 style="margin:0; font-size:22px; font-weight:800;">${currentTier.name}</h2>
          <span class="badge badge-success" style="font-weight:700;">Active via Razorpay UPI</span>
        </div>
        <p style="font-size:13px;color:var(--text-muted); margin:0;">
          ₹${currentTier.priceMonthlyINR}/month · Billed ${sub.billingCycle || 'monthly'} · Next billing date: <strong>${sub.renewsOn || '30 Sep 2026'}</strong>
        </p>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-primary btn-sm" onclick="Router.navigate('/pricing')"><i class="fas fa-arrow-up"></i> Change Plan</button>
        <button class="btn btn-secondary btn-sm" onclick="BillingEngine.downloadInvoicePDF('${invoices[0]?.id || 'BV-INV-99021'}')"><i class="fas fa-file-pdf"></i> Download Tax Receipt</button>
      </div>
    </div>

    <div class="grid-dashboard">
      <div>
        <!-- Payment Method -->
        <div class="card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            <span>💳</span> Active Payment Rails
          </h4>
          <div class="card" style="display:flex;align-items:center;gap:16px;margin-bottom:12px; border:1px solid #1e293b;">
            <div style="font-size:26px;">📱</div>
            <div style="flex:1;">
              <div style="font-weight:700;font-size:14px; color:#fff;">Unified Payments Interface (UPI AutoPay)</div>
              <div style="font-size:12px;color:var(--text-muted);">VPA: ${state.profile?.email ? state.profile.email.split('@')[0] + '@okaxis' : 'saladi@okaxis'}</div>
            </div>
            <span class="badge badge-success">Primary Rail</span>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="BillingEngine.openCheckout('${currentTier.id}')"><i class="fas fa-plus"></i> Add New Payment Method</button>
        </div>

        <!-- Invoices -->
        <div class="card-glass">
          <h4 style="margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            <span>📄</span> GST Tax Invoices History
          </h4>
          <div class="invoice-list">
            ${invoices.map(inv => `
              <div class="invoice-item" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.06);">
                <div>
                  <div style="font-size:13.5px;font-weight:700; color:#fff;">${inv.id}</div>
                  <div style="font-size:11.5px;color:var(--text-muted);">${inv.date} • ${inv.tier ? inv.tier.toUpperCase() : 'PRO'} SUBSCRIPTION</div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="font-family:var(--font-mono);font-weight:700; color:#00f2fe;">${inv.amount}</span>
                  <span class="badge badge-success">${inv.status}</span>
                  <button class="btn btn-ghost btn-sm btn-icon" title="Download GST PDF Invoice" onclick="BillingEngine.downloadInvoicePDF('${inv.id}')">
                    <i class="fas fa-download" style="color:#00f2fe;"></i>
                  </button>
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
