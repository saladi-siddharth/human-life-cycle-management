/* ═══════════════════════════════════════════════════════════════════
   BUSINESS OWNER-SPECIFIC PAGES — Command Center, Runway & Fundraising CRM
   ═══════════════════════════════════════════════════════════════════ */

let bizCashInBank = 5400000; // ₹54 Lakhs
let bizMonthlyRevenue = 850000; // ₹8.5 Lakhs
let bizMonthlyBurn = 1200000; // ₹12 Lakhs

function BusinessOverviewPage() {
  const netBurn = Math.max(0, bizMonthlyBurn - bizMonthlyRevenue);
  const runwayMonths = netBurn > 0 ? (bizCashInBank / netBurn).toFixed(1) : '∞ (Cashflow Positive)';

  const content = `
    ${UI.sectionHeader('🏢 Business Command Center', 'Real-time MRR, interactive runway simulation, unit economics & hiring pipelines')}
    
    <div class="stats-grid">
      ${UI.statCard('💰', 'Monthly Revenue', '₹8,50,000', '+18% MoM Growth', 'up', '#10b981')}
      ${UI.statCard('🔥', 'Gross Burn Rate', '₹12,00,000', '/month operational', '', '#f43f5e')}
      ${UI.statCard('🛤️', 'Runway', `${runwayMonths} Mo`, 'Net Burn ₹3.5L/mo', '', '#06b6d4')}
      ${UI.statCard('👥', 'Team Size', '8', '+2 hired this quarter', 'up', '#8b5cf6')}
    </div>

    <!-- 🎚️ Interactive Runway & Burn Rate Simulator Card 🎚️ -->
    <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:24px;background:linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9));border:1px solid rgba(0,242,254,0.3);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-sliders-h" style="color:var(--cyan);"></i> Interactive Runway & Cashflow Simulator</h3>
        <span class="badge badge-success" style="font-size:12px;">Live Runway: <strong id="sim-runway-val" style="color:#00f2fe;">${runwayMonths} Months</strong></span>
      </div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:16px;">Adjust bank reserves, monthly revenue growth, and team burn rate to simulate runway extension and capital requirements.</p>

      <div class="grid grid-3" style="gap:16px;">
        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
            <span>Cash in Bank</span>
            <strong style="color:var(--emerald);" id="sim-cash-txt">₹${(bizCashInBank / 100000).toFixed(1)}L</strong>
          </div>
          <input type="range" class="bio-slider" min="1000000" max="20000000" step="500000" value="${bizCashInBank}" oninput="updateRunwaySim('cash', this.value)">
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
            <span>Monthly Revenue</span>
            <strong style="color:var(--cyan);" id="sim-rev-txt">₹${(bizMonthlyRevenue / 100000).toFixed(1)}L</strong>
          </div>
          <input type="range" class="bio-slider" min="100000" max="5000000" step="100000" value="${bizMonthlyRevenue}" oninput="updateRunwaySim('rev', this.value)">
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
            <span>Monthly Burn Rate</span>
            <strong style="color:var(--rose);" id="sim-burn-txt">₹${(bizMonthlyBurn / 100000).toFixed(1)}L</strong>
          </div>
          <input type="range" class="bio-slider" min="300000" max="5000000" step="100000" value="${bizMonthlyBurn}" oninput="updateRunwaySim('burn', this.value)">
        </div>
      </div>
    </div>

    <div class="grid-dashboard">
      <div>
        <div class="chart-container" style="margin-bottom:16px;">
          <div class="chart-header"><span class="chart-title">Revenue Trajectory vs Expenses (INR Lakhs)</span></div>
          <div class="chart-canvas-wrap"><canvas id="biz-revenue-chart"></canvas></div>
        </div>
        <div class="card card-glass">
          <h4 style="margin-bottom:16px;">📊 Startup Growth Metrics</h4>
          ${[
            { metric: 'Annual Recurring Revenue (ARR)', value: '₹1.02 Cr', trend: '+24%', up: true },
            { metric: 'Customer Acquisition Cost (CAC)', value: '₹1,450', trend: '-18%', up: true },
            { metric: 'Lifetime Value (LTV)', value: '₹28,500', trend: '+12%', up: true },
            { metric: 'LTV / CAC Ratio', value: '19.6x', trend: 'Best-in-Class', up: true },
            { metric: 'Net Revenue Retention (NRR)', value: '118%', trend: '+4%', up: true },
            { metric: 'Gross Margin %', value: '82%', trend: '+2%', up: true },
          ].map(m => `
            <div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid var(--glass-border);">
              <span style="flex:1;font-size:13px;color:#fff;">${m.metric}</span>
              <span style="font-weight:700;font-family:var(--font-mono);margin-right:12px;color:var(--cyan);">${m.value}</span>
              <span class="stat-trend ${m.up ? 'up' : 'down'}"><i class="fas fa-arrow-${m.up ? 'up' : 'down'}"></i> ${m.trend}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <div class="card card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">🎯 Venture Milestone Readiness</h4>
          <div style="text-align:center;margin-bottom:16px;">
            ${UI.progressRing(78, 120, 8, '#10b981')}
          </div>
          ${UI.progressBar('Product-Market Fit Velocity', 85, 100, '#10b981')}
          ${UI.progressBar('Unit Economics & Contribution Margin', 80, 100, '#6366f1')}
          ${UI.progressBar('Enterprise Sales Pipeline', 70, 100, '#06b6d4')}
          ${UI.progressBar('Regulatory & Startup India DPIIT', 95, 100, '#f59e0b')}
        </div>

        <div class="card card-glass">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h4 style="margin:0;">📋 Executive Action Items</h4>
            <button class="btn btn-primary btn-sm" onclick="openTaskModal()"><i class="fas fa-plus"></i></button>
          </div>
          ${[
            { task: 'Finalize Seed Extension Pitch Deck with Sequoia India', priority: 'high', due: '15 Aug' },
            { task: 'Deploy AI Inference Microservice to AWS ap-south-1', priority: 'high', due: '20 Aug' },
            { task: 'File Startup India DPIIT Seed Fund Application', priority: 'medium', due: '28 Aug' },
            { task: 'Rollout Self-Serve Billing Portal for Enterprise Clients', priority: 'medium', due: '05 Sep' },
          ].map(t => `
            <div class="task-item">
              <div class="task-checkbox" onclick="this.classList.toggle('checked')"></div>
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
      values: [420000, 510000, 620000, 710000, 780000, 850000]
    }, { height: 200, colors: ['#10b981'] });
  }, 300);
  return UI.dashboardLayout('/business/overview', content);
}

function updateRunwaySim(type, val) {
  const num = Number(val);
  if (type === 'cash') {
    bizCashInBank = num;
    document.getElementById('sim-cash-txt').textContent = `₹${(num / 100000).toFixed(1)}L`;
  } else if (type === 'rev') {
    bizMonthlyRevenue = num;
    document.getElementById('sim-rev-txt').textContent = `₹${(num / 100000).toFixed(1)}L`;
  } else if (type === 'burn') {
    bizMonthlyBurn = num;
    document.getElementById('sim-burn-txt').textContent = `₹${(num / 100000).toFixed(1)}L`;
  }
  const netBurn = Math.max(0, bizMonthlyBurn - bizMonthlyRevenue);
  const months = netBurn > 0 ? (bizCashInBank / netBurn).toFixed(1) : '∞ (Cashflow Positive)';
  document.getElementById('sim-runway-val').textContent = `${months} Months`;
}

function BusinessFundraisingPage() {
  const content = `
    ${UI.sectionHeader('💰 Venture Fundraising CRM', 'Track VC partners, pitch decks, term sheet offers & investor updates', '<button class="btn btn-primary btn-sm" onclick="openAddInvestorModal()"><i class="fas fa-plus"></i> Add Investor</button>')}
    
    <div class="stats-grid">
      ${UI.statCard('🎯', 'Target Round', '₹8.0 Cr', 'Seed Extension', '', '#6366f1')}
      ${UI.statCard('📊', 'Pipeline Total', '₹18.5 Cr', 'In discussions', 'up', '#06b6d4')}
      ${UI.statCard('✅', 'Soft Committed', '₹4.5 Cr', '56% of target', 'up', '#10b981')}
      ${UI.statCard('📞', 'Partner Pitches', '14', 'This month', 'up', '#f59e0b')}
    <!-- 📊 Interactive Cap Table & Round Dilution Simulator 📊 -->
    <div class="card card-glass" style="margin-bottom:20px; padding:22px; border:1px solid rgba(99,102,241,0.3); background:linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(15,23,42,0.95) 100%);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
        <h4 style="margin:0; font-size:16px; display:flex; align-items:center; gap:8px;">
          <span>📊</span> Cap Table & Round Dilution Simulator
        </h4>
        <span class="badge badge-primary" style="font-size:12px;">Post-Money: <strong id="cap-post-money-txt" style="color:#00f2fe;">₹40.0 Cr</strong></span>
      </div>
      <p style="font-size:12px; color:#94a3b8; margin-bottom:16px;">
        Simulate pre-money valuation, target check size, and ESOP pool expansion to dynamically model founder equity retention.
      </p>

      <div class="grid grid-3" style="gap:14px; margin-bottom:16px;">
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
            <span style="color:#94a3b8;">Pre-Money Valuation</span>
            <strong style="color:#fff;" id="cap-pre-txt">₹32.0 Cr</strong>
          </div>
          <input type="range" class="bio-slider" min="100000000" max="1000000000" step="20000000" value="320000000" oninput="updateCapTableSim('pre', this.value)">
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
            <span style="color:#94a3b8;">Investment Round Size</span>
            <strong style="color:#10b981;" id="cap-invest-txt">₹8.0 Cr</strong>
          </div>
          <input type="range" class="bio-slider" min="20000000" max="250000000" step="10000000" value="80000000" oninput="updateCapTableSim('invest', this.value)">
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
            <span style="color:#94a3b8;">ESOP Pool Creation</span>
            <strong style="color:#f59e0b;" id="cap-esop-txt">10.0%</strong>
          </div>
          <input type="range" class="bio-slider" min="5" max="20" step="1" value="10" oninput="updateCapTableSim('esop', this.value)">
        </div>
      </div>

      <div class="grid grid-3" style="gap:10px;">
        <div style="background:#070a14; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
          <div style="font-size:11px; color:#94a3b8;">Founder Ownership</div>
          <div style="font-size:18px; font-weight:900; color:#10b981; margin-top:2px;" id="cap-founder-pct">72.0%</div>
          <div style="font-size:10.5px; color:#64748b;" id="cap-founder-val">Value: ₹28.8 Cr</div>
        </div>
        <div style="background:#070a14; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
          <div style="font-size:11px; color:#94a3b8;">New Investor Stake</div>
          <div style="font-size:18px; font-weight:900; color:#00f2fe; margin-top:2px;" id="cap-invest-pct">20.0%</div>
          <div style="font-size:10.5px; color:#64748b;">Round: ₹8.0 Cr</div>
        </div>
        <div style="background:#070a14; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
          <div style="font-size:11px; color:#94a3b8;">Employee ESOP Pool</div>
          <div style="font-size:18px; font-weight:900; color:#f59e0b; margin-top:2px;" id="cap-esop-pct">8.0%</div>
          <div style="font-size:10.5px; color:#64748b;" id="cap-esop-val">Value: ₹3.2 Cr</div>
        </div>
      </div>
    </div>

    <div class="card card-glass">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h4 style="margin:0;">Venture Capital & Angel Investor Pipeline</h4>
        <button class="btn btn-outline btn-sm" onclick="openAddInvestorModal()"><i class="fas fa-handshake"></i> Log Deal Stage</button>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Investor Fund</th><th>Type</th><th>Check Size</th><th>Stage</th><th>Next Milestone</th></tr></thead>
          <tbody>
            ${[
              { name: 'Peak XV Partners (Sequoia India)', type: 'Lead VC', amount: '₹4.0 Cr', stage: 'Term Sheet', step: 'Legal due diligence & SHA' },
              { name: 'Blume Ventures', type: 'Institutional VC', amount: '₹2.5 Cr', stage: 'Due Diligence', step: 'Customer reference calls' },
              { name: 'Kalaari Capital', type: 'Institutional VC', amount: '₹2.0 Cr', stage: 'Partner Meeting', step: 'Final Investment Committee presentation' },
              { name: 'Indian Angel Network (IAN)', type: 'Angel Syndicate', amount: '₹1.0 Cr', stage: 'Committed', step: 'Wire transfer in escrow' },
              { name: 'Elevation Capital', type: 'Lead VC', amount: '₹3.5 Cr', stage: 'First Meeting', step: 'Send product demo & financial model' },
            ].map(i => `<tr>
              <td style="font-weight:700;color:#fff;">${i.name}</td>
              <td><span class="badge badge-neutral">${i.type}</span></td>
              <td style="font-family:var(--font-mono);font-weight:700;color:var(--emerald);">${i.amount}</td>
              <td><span class="badge ${i.stage === 'Committed' ? 'badge-success' : i.stage === 'Term Sheet' ? 'badge-warning' : 'badge-info'}">${i.stage}</span></td>
              <td style="font-size:12px;color:var(--text-secondary);">${i.step}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  return UI.dashboardLayout('/business/fundraising', content);
}

function openAddInvestorModal() {
  const html = `
    <h3>🤝 Track Venture Investor or Angel</h3>
    <form onsubmit="saveInvestorForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Investor / Fund Name</label>
        <input type="text" id="inv-name" class="chat-input" placeholder="e.g. Peak XV Partners or Blume Ventures" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Check Size (₹)</label>
          <input type="text" id="inv-amount" class="chat-input" value="₹2.5 Cr" required>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Pipeline Stage</label>
          <select id="inv-stage" class="chat-input">
            <option value="First Meeting">First Meeting</option>
            <option value="Partner Meeting">Partner Meeting</option>
            <option value="Due Diligence">Due Diligence</option>
            <option value="Term Sheet" selected>Term Sheet</option>
            <option value="Committed">Committed</option>
          </select>
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Next Step / Action Item</label>
        <input type="text" id="inv-step" class="chat-input" value="Send data room & product metrics" required>
      </div>
      ${UI.pillButton({ text: 'Save to Investor CRM', icon: '<i class="fas fa-handshake"></i>', theme: 'emerald', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}

function saveInvestorForm(e) {
  e.preventDefault();
  UI.closeModal();
  if (typeof ActionPhysics !== 'undefined') {
    ActionPhysics.launchCelebration('business', 'Investor Deal Recorded', 'Venture Pipeline & Cap Table Updated 🤝');
  }
  UI.toast('success', 'Investor Logged 💰', 'Added to Venture Fundraising CRM.');
  Router.render();
}

function BusinessTeamPage() {
  const content = `
    ${UI.sectionHeader('👥 Team Structure & Talent Org Board', 'Manage core startup contributors, equity vesting & hiring requirements')}
    <div class="stats-grid">
      ${UI.statCard('👥', 'Full-Time Core', '8', '+2 open requisitions', 'up', '#8b5cf6')}
      ${UI.statCard('😊', 'Team Engagement', '9.4/10', 'High alignment', 'up', '#10b981')}
      ${UI.statCard('📊', 'Sprint Velocity', '92%', 'On-time delivery', 'up', '#6366f1')}
      ${UI.statCard('🔄', 'Key Retention', '100%', 'Annualized', 'up', '#06b6d4')}
    </div>
    
    <div class="card card-glass">
      <h4 style="margin-bottom:16px;">Core Founding & Engineering Team</h4>
      <div class="grid-2">
        ${[
          { name: 'Saladi Siddharth', role: 'Founder & CEO / Chief Architect', dept: 'Executive Leadership', perf: 98, avatar: 'SS' },
          { name: 'P. Hemanth', role: 'VP Engineering (Backend)', dept: 'Engineering', perf: 95, avatar: 'PH' },
          { name: 'P. Manikanta', role: 'Lead Frontend & UI/UX Architect', dept: 'Product', perf: 94, avatar: 'PM' },
          { name: 'S. Manikanta', role: 'Senior Machine Learning Engineer', dept: 'AI & Data', perf: 92, avatar: 'SM' },
        ].map(m => `
          <div class="card card-hover" style="display:flex;align-items:center;gap:14px;background:rgba(15,23,42,0.85);border:1px solid var(--glass-border);padding:16px;">
            <div class="avatar" style="background:var(--gradient-primary);">${m.avatar}</div>
            <div style="flex:1;">
              <div style="font-weight:700;font-size:14px;color:#fff;">${m.name}</div>
              <div style="font-size:12px;color:var(--cyan);">${m.role}</div>
              <div style="font-size:11px;color:var(--text-muted);">${m.dept}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:14px;font-weight:800;color:var(--emerald);">${m.perf}%</div>
              <div style="font-size:10px;color:var(--text-muted);">Impact Score</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return UI.dashboardLayout('/business/team', content);
}

let capTableState = { pre: 320000000, invest: 80000000, esop: 10 };

function updateCapTableSim(key, val) {
  capTableState[key] = Number(val);
  const pre = capTableState.pre;
  const invest = capTableState.invest;
  const esopPct = capTableState.esop;

  const postMoney = pre + invest;
  const investorPct = (invest / postMoney) * 100;
  const founderPct = (100 - investorPct) * (1 - esopPct / 100);
  const actualEsopPct = 100 - investorPct - founderPct;

  const founderVal = (postMoney * founderPct) / 100;
  const esopVal = (postMoney * actualEsopPct) / 100;

  if (key === 'pre') document.getElementById('cap-pre-txt').textContent = `₹${(pre / 10000000).toFixed(1)} Cr`;
  if (key === 'invest') document.getElementById('cap-invest-txt').textContent = `₹${(invest / 10000000).toFixed(1)} Cr`;
  if (key === 'esop') document.getElementById('cap-esop-txt').textContent = `${esopPct.toFixed(1)}%`;

  document.getElementById('cap-post-money-txt').textContent = `₹${(postMoney / 10000000).toFixed(1)} Cr`;
  document.getElementById('cap-founder-pct').textContent = `${founderPct.toFixed(1)}%`;
  document.getElementById('cap-founder-val').textContent = `Value: ₹${(founderVal / 10000000).toFixed(1)} Cr`;
  document.getElementById('cap-invest-pct').textContent = `${investorPct.toFixed(1)}%`;
  document.getElementById('cap-esop-pct').textContent = `${actualEsopPct.toFixed(1)}%`;
  document.getElementById('cap-esop-val').textContent = `Value: ₹${(esopVal / 10000000).toFixed(1)} Cr`;
}

window.updateRunwaySim = updateRunwaySim;
window.updateCapTableSim = updateCapTableSim;
window.openAddInvestorModal = openAddInvestorModal;
window.saveInvestorForm = saveInvestorForm;

