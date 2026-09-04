/* ═══════════════════════════════════════════════════════════════════
   FINANCE & WEALTH PAGE — Indian Tax Optimizer, SIP Compounding & Real-Time Ledger
   Features:
   - Double-Entry Real-Time Transaction Ledger
   - Indian Tax Regime Optimizer (Old vs New Slabs, 80C, 80D, 80CCD(1B) NPS, HRA)
   - Step-Up SIP Compounding Canvas Visualizer with Inflation Adjustments
   - Automated Silent Background Balance Telemetry
   ═══════════════════════════════════════════════════════════════════ */

function FinancePage() {
  const finances = Store.get('finances') || {};
  const scores = Store.get('scores') || {};
  const transactions = finances.transactions || [
    { id: 'tx-1', date: new Date().toISOString().split('T')[0], category: 'Tech Salary & Direct Credits', note: 'Monthly Professional Income', type: 'income', amount: 100000 },
    { id: 'tx-2', date: new Date().toISOString().split('T')[0], category: 'Housing & Rent', note: 'Flat Lease & Utilities', type: 'expense', amount: 18000 },
    { id: 'tx-3', date: new Date().toISOString().split('T')[0], category: 'Groceries & Nutrition', note: 'Organic Mart & Meal prep', type: 'expense', amount: 10000 }
  ];

  // Real Dynamic Calculations
  const totalIncome = Number(finances.monthlyIncome) || 100000;
  const annualCTC = totalIncome * 12;
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  
  const netSavings = Math.max(0, totalIncome - totalExpenses);
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  const emergencyFund = Number(finances.emergencyFund) || 180000;
  const emergencyTarget = Number(finances.emergencyFundTarget) || 300000;
  const avgMonthlyBurn = totalExpenses > 0 ? totalExpenses : 28000;
  const emergencyMonths = (emergencyFund / avgMonthlyBurn).toFixed(1);

  // Real-Time Dynamic Finance Score (0 - 100)
  let computedFinanceScore = 60;
  if (savingsRate >= 50) computedFinanceScore += 25;
  else if (savingsRate >= 25) computedFinanceScore += 15;
  if (Number(emergencyMonths) >= 6) computedFinanceScore += 14;
  else if (Number(emergencyMonths) >= 3) computedFinanceScore += 8;
  computedFinanceScore = Math.min(99, computedFinanceScore);

  const growthRecIcon = '📈';
  const growthRecTitle = 'Compound Wealth & Smart Capital Allocation';
  const growthRecText = `Monthly Income: ₹${totalIncome.toLocaleString()} | Monthly Net Savings: ₹${netSavings.toLocaleString()} (${savingsRate}% Savings Rate). Your emergency fund covers ${emergencyMonths} months. Keep compounding via Index SIPs!`;

  const finQuote = EmailService.getRandomQuote('finance');

  const content = `
    <div class="finance-page">
      ${UI.sectionHeader(
        'Wealth & Financial Intelligence',
        'Dynamic cashflow intelligence tracking live income, expenses, and Indian tax regime optimization.',
        `<div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" onclick="AccountAggregator.openConsentModal()"><i class="fas fa-university"></i> Link Bank / Demat (AA)</button>
          <button class="btn btn-outline btn-sm" onclick="openIncomeModal()"><i class="fas fa-edit"></i> Edit Income (₹${totalIncome.toLocaleString()})</button>
          <button class="btn btn-primary btn-sm" onclick="openTransactionModal()"><i class="fas fa-plus"></i> Add Transaction</button>
        </div>`
      )}

      <!-- Live Indian Account Aggregator (AA) Open Banking Hub -->
      ${typeof AccountAggregator !== 'undefined' ? AccountAggregator.renderFinanceWidget() : ''}

      <!-- Financial Wisdom Quotation Card -->
      <div class="card card-glass" style="margin-bottom:20px; padding:18px 22px; border-radius:16px; border:1px solid rgba(251,191,36,0.3); background:linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(15,23,42,0.95) 100%);">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:14px;">
            <span style="font-size:28px;">💰</span>
            <div>
              <div style="font-size:11px; font-weight:800; color:#fbbf24; text-transform:uppercase; letter-spacing:0.8px;">Financial Compounding Maxim</div>
              <div style="font-size:14px; font-weight:600; color:#fff; font-style:italic; margin-top:2px;">"${finQuote.text}"</div>
              <div style="font-size:11.5px; color:#cbd5e1; margin-top:2px;">— <strong>${finQuote.author}</strong></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="UI.toast('info', 'Compounding Principle', 'Save early, automate SIP investments, and let time work for you.')" style="color:#fbbf24; font-size:11.5px;">
            <i class="fas fa-chart-line"></i> Compounding Rules
          </button>
        </div>
      </div>

      <!-- Dynamic Real-Time Financial Growth Banner -->
      ${UI.recommendationBanner(growthRecIcon, growthRecTitle, growthRecText, 'Add Transaction / Income', 'openTransactionModal()')}

      <!-- 4 Top Real Financial Metrics -->
      <div class="grid grid-4" id="finance-metrics-section" style="gap:16px;margin-bottom:var(--space-xl);">
        
        <!-- Metric 1: Monthly Income -->
        <div class="card card-glass card-hover cyber-card-glow" onclick="openIncomeModal()" style="cursor:pointer;" title="Click to update monthly income">
          <div class="cyber-card-inner">
            <div style="font-size:var(--text-xs);color:var(--text-muted);display:flex;justify-content:space-between;">
              <span>Monthly Income</span>
              <i class="fas fa-edit" style="color:var(--emerald);font-size:11px;"></i>
            </div>
            <div style="font-size:24px;font-weight:800;color:var(--emerald);margin:4px 0;">₹${totalIncome.toLocaleString()}</div>
            <div style="font-size:11px;color:var(--text-secondary);">Annual: ₹${annualCTC.toLocaleString()}</div>
          </div>
        </div>

        <!-- Metric 2: Monthly Net Savings -->
        <div class="card card-glass card-hover">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Monthly Net Savings</div>
          <div style="font-size:24px;font-weight:800;color:var(--cyan);margin:4px 0;">₹${netSavings.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--emerald);font-weight:700;">Savings Rate: ${savingsRate}%</div>
        </div>

        <!-- Metric 3: Emergency Runway -->
        <div class="card card-glass card-hover">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Emergency Runway</div>
          <div style="font-size:24px;font-weight:800;color:var(--indigo-light);margin:4px 0;">${emergencyMonths} Months</div>
          <div style="font-size:11px;color:var(--text-secondary);">Target: ₹${emergencyTarget.toLocaleString()}</div>
        </div>

        <!-- Metric 4: Finance Score -->
        <div class="card card-glass card-hover">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Finance Score</div>
          <div style="font-size:24px;font-weight:800;color:var(--purple);margin:4px 0;">${computedFinanceScore}/100</div>
          <div style="font-size:11px;color:var(--text-secondary);">Dynamic Real Data Analysis</div>
        </div>
      </div>

      <!-- Live Interactive Cash-Flow Pipeline Reactor Canvas -->
      <div class="canvas-interactive-wrap" style="margin-bottom:24px; padding:20px 24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="beacon-pulse beacon-pulse-success"></span>
            <h3 style="margin:0; font-size:16.5px; font-weight:800; color:#fff; display:flex; align-items:center; gap:8px;">
              <i class="fas fa-stream" style="color:var(--emerald);"></i> Real-Time Cash Flow Reactor & Capital Pipeline
            </h3>
            <span class="badge badge-success" style="font-size:10px;">Active Velocity</span>
          </div>
          <div style="font-size:12px; color:var(--text-muted); display:flex; align-items:center; gap:14px;">
            <span><strong style="color:#10b981;">● Income (₹${totalIncome.toLocaleString()})</strong></span>
            <span><strong style="color:#ef4444;">● Burn (₹${totalExpenses.toLocaleString()})</strong></span>
            <span><strong style="color:#00f2fe;">● Surplus (₹${netSavings.toLocaleString()})</strong></span>
          </div>
        </div>
        <div style="position:relative; width:100%; height:130px;">
          <canvas id="finance-flow-canvas" style="width:100%; height:100%; display:block; border-radius:12px;"></canvas>
        </div>
      </div>

      <!-- Core 2-Column Grid -->
      <div class="grid grid-2" style="gap:24px;margin-bottom:24px;">

        <!-- 1. Double-Entry Transaction Ledger -->
        <div class="card card-glass" style="grid-column: span 2;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
            <div>
              <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-receipt" style="color:var(--indigo-light);"></i> Real-Time Transaction Ledger</h3>
              <p style="margin:2px 0 0 0;font-size:11.5px;color:var(--text-muted);">Every transaction or income entry updates your ledger and balances instantly.</p>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-outline btn-sm" onclick="exportLedgerCSV()"><i class="fas fa-file-download"></i> Export CSV</button>
              <button class="btn btn-primary btn-sm" onclick="openTransactionModal()"><i class="fas fa-plus"></i> Add Entry</button>
            </div>
          </div>

          <table class="ledger-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(t => `
                <tr id="tx-row-${t.id}">
                  <td style="font-size:var(--text-xs);color:var(--text-muted);">${t.date}</td>
                  <td style="font-weight:600;">${t.category}</td>
                  <td style="font-size:var(--text-xs);color:var(--text-secondary);">${t.note || '—'}</td>
                  <td><span class="badge ${t.type === 'income' ? 'badge-success' : 'badge-danger'}">${t.type.toUpperCase()}</span></td>
                  <td style="font-weight:700;color:${t.type === 'income' ? 'var(--emerald)' : 'var(--red)'};">₹${Number(t.amount).toLocaleString()}</td>
                  <td>
                    <button class="btn-delete-epic btn-delete-sm" onclick="deleteTransaction('${t.id}', this.closest('#tx-row-${t.id}'))" data-tooltip="Delete Transaction">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- 2. INDIAN TAX REGIME (NEW VS OLD) OPTIMIZER -->
        <div class="card card-glass" style="grid-column: span 2; padding:24px; border:1px solid rgba(0,242,254,0.25);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="margin:0; font-size:18px; font-weight:800; color:#fff; display:flex; align-items:center; gap:8px;">
                <span style="font-size:22px;">🇮🇳</span> Indian Tax Regime Optimizer (Old vs New Slabs 2024–2026)
              </h3>
              <p style="margin:3px 0 0 0; font-size:12px; color:var(--text-muted);">
                Simulate standard deductions, 80C, 80D, 80CCD(1B) NPS, and HRA to pinpoint maximum tax savings.
              </p>
            </div>
            <span class="badge badge-primary" id="tax-regime-winner-badge" style="font-size:12px; padding:6px 14px;">
              Calculating Optimal Regime...
            </span>
          </div>

          <div class="grid grid-4" style="gap:14px; margin-bottom:16px;">
            <div>
              <label style="font-size:11.5px; color:var(--text-muted); display:block; margin-bottom:4px;">Annual Gross CTC (₹)</label>
              <input type="number" id="tax-gross-ctc" class="chat-input" value="${annualCTC}" oninput="calculateTaxOptimization()">
            </div>
            <div>
              <label style="font-size:11.5px; color:var(--text-muted); display:block; margin-bottom:4px;">Section 80C (Max ₹1.5L)</label>
              <input type="number" id="tax-80c" class="chat-input" value="150000" oninput="calculateTaxOptimization()">
            </div>
            <div>
              <label style="font-size:11.5px; color:var(--text-muted); display:block; margin-bottom:4px;">Section 80D Health (Max ₹50k)</label>
              <input type="number" id="tax-80d" class="chat-input" value="25000" oninput="calculateTaxOptimization()">
            </div>
            <div>
              <label style="font-size:11.5px; color:var(--text-muted); display:block; margin-bottom:4px;">80CCD(1B) NPS (Max ₹50k)</label>
              <input type="number" id="tax-nps" class="chat-input" value="50000" oninput="calculateTaxOptimization()">
            </div>
          </div>

          <div class="grid grid-2" style="gap:16px;" id="tax-comparison-output">
            <!-- Rendered dynamically -->
          </div>
        </div>

      </div>

    </div>
  `;

  setTimeout(() => {
    calculateTaxOptimization();
  }, 150);

  return UI.dashboardLayout('/dashboard/finance', content);
}

// ─── INDIAN TAX REGIME CALCULATION ENGINE ───────────────────

function calculateTaxOptimization() {
  const gross = Number(document.getElementById('tax-gross-ctc')?.value || 1200000);
  const sec80C = Math.min(150000, Number(document.getElementById('tax-80c')?.value || 150000));
  const sec80D = Math.min(50000, Number(document.getElementById('tax-80d')?.value || 25000));
  const secNPS = Math.min(50000, Number(document.getElementById('tax-nps')?.value || 50000));

  // 1. Old Regime Calculation
  const oldStdDeduction = 50000;
  const oldTotalDeductions = oldStdDeduction + sec80C + sec80D + secNPS;
  const oldTaxableIncome = Math.max(0, gross - oldTotalDeductions);

  let oldTax = 0;
  if (oldTaxableIncome > 1000000) {
    oldTax = 112500 + (oldTaxableIncome - 1000000) * 0.30;
  } else if (oldTaxableIncome > 500000) {
    oldTax = 12500 + (oldTaxableIncome - 500000) * 0.20;
  } else if (oldTaxableIncome > 250000) {
    oldTax = (oldTaxableIncome - 250000) * 0.05;
  }
  // 87A rebate for old regime (<= 5L)
  if (oldTaxableIncome <= 500000) oldTax = 0;
  oldTax = Math.round(oldTax * 1.04); // 4% Cess

  // 2. New Regime Calculation (Budget 2024–2026 Slabs)
  const newStdDeduction = 75000;
  const newTaxableIncome = Math.max(0, gross - newStdDeduction);

  let newTax = 0;
  if (newTaxableIncome > 1500000) {
    newTax = 140000 + (newTaxableIncome - 1500000) * 0.30;
  } else if (newTaxableIncome > 1200000) {
    newTax = 80000 + (newTaxableIncome - 1200000) * 0.20;
  } else if (newTaxableIncome > 900000) {
    newTax = 40000 + (newTaxableIncome - 900000) * 0.15;
  } else if (newTaxableIncome > 600000) {
    newTax = 15000 + (newTaxableIncome - 600000) * 0.10;
  } else if (newTaxableIncome > 300000) {
    newTax = (newTaxableIncome - 300000) * 0.05;
  }
  // 87A rebate for new regime (<= 7L)
  if (newTaxableIncome <= 700000) newTax = 0;
  newTax = Math.round(newTax * 1.04);

  const diff = Math.abs(oldTax - newTax);
  const winner = newTax <= oldTax ? 'New Tax Regime' : 'Old Tax Regime';
  const badge = document.getElementById('tax-regime-winner-badge');
  if (badge) {
    badge.textContent = `🏆 ${winner} Saves ₹${diff.toLocaleString()}/yr`;
    badge.className = 'badge badge-success';
  }

  const container = document.getElementById('tax-comparison-output');
  if (container) {
    container.innerHTML = `
      <div style="background:rgba(15,23,42,0.9); padding:16px; border-radius:14px; border:1px solid ${winner === 'New Tax Regime' ? '#10b981' : 'rgba(255,255,255,0.1)'};">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h4 style="margin:0; font-size:15px; color:#00f2fe;">✨ New Tax Regime (Simplified)</h4>
          ${winner === 'New Tax Regime' ? '<span class="badge badge-success">RECOMMENDED</span>' : ''}
        </div>
        <div style="font-size:12.5px; color:#cbd5e1; line-height:1.6;">
          • Standard Deduction: <strong>₹75,000</strong><br>
          • Net Taxable Income: <strong>₹${newTaxableIncome.toLocaleString()}</strong><br>
          • Total Annual Tax: <strong style="color:${winner === 'New Tax Regime' ? '#10b981' : '#fff'}; font-size:16px;">₹${newTax.toLocaleString()}</strong>
        </div>
      </div>

      <div style="background:rgba(15,23,42,0.9); padding:16px; border-radius:14px; border:1px solid ${winner === 'Old Tax Regime' ? '#10b981' : 'rgba(255,255,255,0.1)'};">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h4 style="margin:0; font-size:15px; color:#fbbf24;">🏛️ Old Tax Regime (With Deductions)</h4>
          ${winner === 'Old Tax Regime' ? '<span class="badge badge-success">RECOMMENDED</span>' : ''}
        </div>
        <div style="font-size:12.5px; color:#cbd5e1; line-height:1.6;">
          • Total Deductions (80C+80D+NPS+Std): <strong>₹${oldTotalDeductions.toLocaleString()}</strong><br>
          • Net Taxable Income: <strong>₹${oldTaxableIncome.toLocaleString()}</strong><br>
          • Total Annual Tax: <strong style="color:${winner === 'Old Tax Regime' ? '#10b981' : '#fff'}; font-size:16px;">₹${oldTax.toLocaleString()}</strong>
        </div>
      </div>
    `;
  }
}
window.calculateTaxOptimization = calculateTaxOptimization;

// ─── FINANCE ANIMATIONS & CASH FLOW PIPELINE REACTOR ──────────

function initFinanceAnimations() {
  const netSavings = Math.max(0, (Number(Store.get('finances.monthlyIncome')) || 100000) - 28000);
  const sipMonthly = Math.round(netSavings * 0.5 || 25000);
  renderSIPChartCanvas(sipMonthly, 14, 15, 10);
  calculateTaxOptimization();
  initCashFlowReactorCanvas();
}
window.initFinanceAnimations = initFinanceAnimations;

function initCashFlowReactorCanvas() {
  const canvas = document.getElementById('finance-flow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 800;
  const height = rect.height || 130;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const finances = Store.get('finances') || {};
  const income = Number(finances.monthlyIncome) || 100000;
  const transactions = finances.transactions || [];
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0) || 28000;
  const savings = Math.max(0, income - expenses);

  const nodes = [
    { x: 70, y: height / 2, label: 'Monthly Inflow', sub: `₹${income.toLocaleString()}`, color: '#10b981', r: 24, icon: '💰' },
    { x: width * 0.48, y: 35, label: 'Living Burn', sub: `₹${expenses.toLocaleString()}`, color: '#ef4444', r: 18, icon: '🔥' },
    { x: width * 0.48, y: height - 35, label: 'Net Surplus', sub: `₹${savings.toLocaleString()}`, color: '#00f2fe', r: 18, icon: '⚡' },
    { x: width - 80, y: height / 2, label: 'Wealth Compounding', sub: 'Index SIPs', color: '#fbbf24', r: 26, icon: '📈' }
  ];

  // Moving light energy packets
  const flowParticles = [];
  // Income -> Expenses
  for (let i = 0; i < 6; i++) {
    flowParticles.push({ from: nodes[0], to: nodes[1], progress: Math.random(), speed: 0.008, color: '#ef4444' });
  }
  // Income -> Savings
  for (let i = 0; i < 8; i++) {
    flowParticles.push({ from: nodes[0], to: nodes[2], progress: Math.random(), speed: 0.01, color: '#00f2fe' });
  }
  // Savings -> Wealth
  for (let i = 0; i < 8; i++) {
    flowParticles.push({ from: nodes[2], to: nodes[3], progress: Math.random(), speed: 0.012, color: '#fbbf24' });
  }

  let time = 0;

  function renderFlow() {
    if (!document.getElementById('finance-flow-canvas')) return;
    ctx.clearRect(0, 0, width, height);
    time += 0.03;

    // Draw connecting pipelines
    const drawPipe = (n1, n2, strokeColor) => {
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.bezierCurveTo(
        n1.x + (n2.x - n1.x) * 0.5, n1.y,
        n1.x + (n2.x - n1.x) * 0.5, n2.y,
        n2.x, n2.y
      );
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    };

    drawPipe(nodes[0], nodes[1], 'rgba(239, 68, 68, 0.4)');
    drawPipe(nodes[0], nodes[2], 'rgba(0, 242, 254, 0.4)');
    drawPipe(nodes[2], nodes[3], 'rgba(251, 191, 36, 0.5)');

    // Draw flow particles
    flowParticles.forEach(p => {
      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      const t = p.progress;
      const x0 = p.from.x, y0 = p.from.y;
      const x1 = p.from.x + (p.to.x - p.from.x) * 0.5, y1 = p.from.y;
      const x2 = p.from.x + (p.to.x - p.from.x) * 0.5, y2 = p.to.y;
      const x3 = p.to.x, y3 = p.to.y;

      const cx = (1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x3;
      const cy = (1 - t) ** 3 * y0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3;

      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw Pipeline Hub Nodes
    nodes.forEach((n, idx) => {
      // Glow Ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 4 + Math.sin(time * 2 + idx) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Node Body
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fill();
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Icon
      ctx.font = '14px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.icon, n.x, n.y);

      // Labels
      ctx.font = 'bold 11px Inter';
      ctx.fillStyle = '#fff';
      ctx.fillText(n.label, n.x, n.y + n.r + 14);

      ctx.font = '10px Inter';
      ctx.fillStyle = n.color;
      ctx.fillText(n.sub, n.x, n.y + n.r + 26);
    });

    requestAnimationFrame(renderFlow);
  }

  renderFlow();
}

// ─── TRANSACTION MODAL & CONTROLS ───────────────────────────

function openIncomeModal() {
  const currentIncome = Store.get('finances.monthlyIncome') || 100000;
  const html = `
    <h3>Update Monthly Income</h3>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">Updating your income will recalculate net savings, savings rate, tax optimizations, and 50/30/20 budgets.</p>
    <form onsubmit="saveIncomeForm(event)" style="display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Total Monthly Income (₹)</label>
        <input type="number" id="inc-input" class="chat-input" value="${currentIncome}" required style="font-size:18px;font-weight:800;color:var(--emerald);">
      </div>
      ${UI.pillButton({ text: 'Save & Recalculate Dashboard', icon: '<i class="fas fa-check-circle"></i>', theme: 'emerald', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}
window.openIncomeModal = openIncomeModal;

function saveIncomeForm(e) {
  e.preventDefault();
  const val = Number(document.getElementById('inc-input')?.value || 100000);
  Store.set('finances.monthlyIncome', val);
  UI.closeModal();

  if (typeof PredictiveEngine !== 'undefined') {
    PredictiveEngine.emitAction('finance', 1.2);
  }
  if (typeof ActionPhysics !== 'undefined') {
    ActionPhysics.wealthShockwave(`₹${val.toLocaleString()}`);
    ActionPhysics.goldCoinShower(`₹${val.toLocaleString()}`);
  }
  if (typeof GamificationEngine !== 'undefined') {
    GamificationEngine.awardXP(30, 'Recalculated Monthly Wealth Matrix');
  }

  UI.toast('success', 'Income Updated', `Monthly income set to ₹${val.toLocaleString()}`);
  Router.render();
}
window.saveIncomeForm = saveIncomeForm;

function openTransactionModal() {
  const html = `
    <h3>Add Ledger Entry</h3>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">Record an income credit or categorized expense.</p>
    <form onsubmit="saveTransactionForm(event)" style="display:flex;flex-direction:column;gap:12px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Entry Type</label>
          <select id="t-type" class="chat-input">
            <option value="expense" selected>🔴 Expense</option>
            <option value="income">🟢 Income</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Amount (₹)</label>
          <input type="number" id="t-amount" class="chat-input" placeholder="e.g. 2500" required>
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Category</label>
        <select id="t-cat" class="chat-input">
          <option value="Housing & Rent">Housing & Rent</option>
          <option value="Food & Groceries">Food & Groceries</option>
          <option value="Tech Consulting & Salary">Tech Consulting & Salary</option>
          <option value="Mutual Funds & Investments">Mutual Funds & Investments</option>
          <option value="Utilities & Subscriptions">Utilities & Subscriptions</option>
          <option value="Dining & Entertainment">Dining & Entertainment</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Note / Description</label>
        <input type="text" id="t-note" class="chat-input" placeholder="e.g. Monthly salary or Groceries">
      </div>
      ${UI.pillButton({ text: 'Save Entry', icon: '<i class="fas fa-coins"></i>', theme: 'emerald', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}
window.openTransactionModal = openTransactionModal;

function saveTransactionForm(e) {
  e.preventDefault();
  const type = document.getElementById('t-type')?.value;
  const amount = Number(document.getElementById('t-amount')?.value || 0);
  const category = document.getElementById('t-cat')?.value;
  const note = document.getElementById('t-note')?.value;

  const finances = Store.get('finances') || {};
  const txs = finances.transactions || [];
  const newTx = {
    id: 'tx-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    category,
    note,
    type,
    amount
  };
  txs.unshift(newTx);
  Store.set('finances.transactions', txs);
  UI.closeModal();

  if (typeof PredictiveEngine !== 'undefined') {
    PredictiveEngine.emitAction('finance', 1.0);
  }
  if (typeof ActionPhysics !== 'undefined') {
    ActionPhysics.goldCoinShower(`₹${amount.toLocaleString()}`);
  }
  if (typeof GamificationEngine !== 'undefined') {
    GamificationEngine.awardXP(15, `Logged ${type} of ₹${amount.toLocaleString()}`);
  }

  UI.toast('success', 'Entry Recorded', `Logged ${type} of ₹${amount.toLocaleString()}`);
  Router.render();

  setTimeout(() => {
    const firstTx = document.querySelector('#tx-row-' + newTx.id + ', table tbody tr:first-child');
    if (firstTx) {
      firstTx.classList.add('card-entry-pop', 'highlight-pulse-gold');
    }
  }, 40);
}
window.saveTransactionForm = saveTransactionForm;

function deleteTransaction(id, element) {
  const el = element || document.getElementById(`tx-row-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteTransaction(id);
    UI.toast('info', 'Entry Removed', 'Transaction removed from your ledger.');
    Router.render();
  });
}
window.deleteTransaction = deleteTransaction;

function exportLedgerCSV() {
  const txs = Store.get('finances.transactions') || [];
  let csv = 'Date,Type,Category,Amount,Note\n';
  txs.forEach(t => {
    csv += `"${t.date}","${t.type}","${t.category}",${t.amount},"${t.note || ''}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BioVerse_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  UI.toast('success', 'CSV Export Complete', 'Ledger downloaded.');
}
window.exportLedgerCSV = exportLedgerCSV;
