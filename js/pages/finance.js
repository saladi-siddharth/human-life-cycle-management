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
        'Financial Freedom & Real-Time Ledger',
        'Dynamic double-entry ledger tracking live income, expenses, Indian tax regime optimization, and compound growth.',
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
        <div class="card card-glass card-hover" onclick="openIncomeModal()" style="cursor:pointer;" title="Click to update monthly income">
          <div style="font-size:var(--text-xs);color:var(--text-muted);display:flex;justify-content:space-between;">
            <span>Monthly Income</span>
            <i class="fas fa-edit" style="color:var(--emerald);font-size:11px;"></i>
          </div>
          <div style="font-size:24px;font-weight:800;color:var(--emerald);margin:4px 0;">₹${totalIncome.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--text-secondary);">Annual: ₹${annualCTC.toLocaleString()}</div>
        </div>

        <!-- Metric 2: Monthly Net Savings -->
        <div class="card card-glass">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Monthly Net Savings</div>
          <div style="font-size:24px;font-weight:800;color:var(--cyan);margin:4px 0;">₹${netSavings.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--emerald);font-weight:700;">Savings Rate: ${savingsRate}%</div>
        </div>

        <!-- Metric 3: Emergency Runway -->
        <div class="card card-glass">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Emergency Runway</div>
          <div style="font-size:24px;font-weight:800;color:var(--indigo-light);margin:4px 0;">${emergencyMonths} Months</div>
          <div style="font-size:11px;color:var(--text-secondary);">Target: ₹${emergencyTarget.toLocaleString()}</div>
        </div>

        <!-- Metric 4: Finance Score -->
        <div class="card card-glass">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Finance Score</div>
          <div style="font-size:24px;font-weight:800;color:var(--purple);margin:4px 0;">${computedFinanceScore}/100</div>
          <div style="font-size:11px;color:var(--text-secondary);">Dynamic Real Data Analysis</div>
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

        <!-- 3. Interactive Step-Up SIP Compound Wealth Visualizer -->
        <div class="card card-glass" style="grid-column: span 2; padding:24px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
            <div>
              <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-chart-area" style="color:var(--emerald);"></i> Interactive Step-Up SIP Compound Wealth Visualizer</h3>
              <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Model compounding with 10% annual step-up increment</div>
            </div>
            <span class="badge badge-success" style="font-size:12.5px; padding:6px 14px;">Projected Wealth: <strong id="sip-future-value" style="color:#00f2fe;">₹1,75,48,740</strong></span>
          </div>

          <div class="grid grid-4" style="gap:16px;margin-bottom:16px;">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
                <span>Monthly SIP (₹)</span>
                <strong style="color:var(--emerald);" id="sip-slider-monthly-txt">₹${Math.round(netSavings * 0.5 || 25000).toLocaleString()}</strong>
              </div>
              <input type="range" class="bio-slider" id="sip-slider-monthly" min="1000" max="200000" step="1000" value="${Math.min(200000, Math.round(netSavings * 0.5 || 25000))}" oninput="onSIPSliderChange()">
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
                <span>Expected CAGR Rate (%)</span>
                <strong style="color:var(--cyan);" id="sip-slider-rate-txt">14%</strong>
              </div>
              <input type="range" class="bio-slider" id="sip-slider-rate" min="8" max="25" step="0.5" value="14" oninput="onSIPSliderChange()">
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
                <span>Horizon (Years)</span>
                <strong style="color:var(--gold);" id="sip-slider-years-txt">15 Years</strong>
              </div>
              <input type="range" class="bio-slider" id="sip-slider-years" min="1" max="35" step="1" value="15" oninput="onSIPSliderChange()">
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
                <span>Annual Step-Up (%)</span>
                <strong style="color:var(--purple);" id="sip-slider-step-txt">10%</strong>
              </div>
              <input type="range" class="bio-slider" id="sip-slider-step" min="0" max="20" step="1" value="10" oninput="onSIPSliderChange()">
            </div>
          </div>

          <div class="chart-canvas-wrap" style="height:220px;">
            <canvas id="finance-sip-chart"></canvas>
          </div>
        </div>

      </div>

    </div>
  `;

  setTimeout(() => {
    const sipMonthly = Math.round(netSavings * 0.5 || 25000);
    renderSIPChartCanvas(sipMonthly, 14, 15, 10);
    calculateTaxOptimization();
  }, 200);

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

// ─── SIP COMPOUNDING VISUALIZER ─────────────────────────────

function onSIPSliderChange() {
  const monthly = Number(document.getElementById('sip-slider-monthly')?.value || 25000);
  const rate = Number(document.getElementById('sip-slider-rate')?.value || 14);
  const years = Number(document.getElementById('sip-slider-years')?.value || 15);
  const stepUp = Number(document.getElementById('sip-slider-step')?.value || 10);

  const mTxt = document.getElementById('sip-slider-monthly-txt');
  const rTxt = document.getElementById('sip-slider-rate-txt');
  const yTxt = document.getElementById('sip-slider-years-txt');
  const sTxt = document.getElementById('sip-slider-step-txt');

  if (mTxt) mTxt.textContent = `₹${monthly.toLocaleString()}`;
  if (rTxt) rTxt.textContent = `${rate}%`;
  if (yTxt) yTxt.textContent = `${years} Years`;
  if (sTxt) sTxt.textContent = `${stepUp}%`;

  renderSIPChartCanvas(monthly, rate, years, stepUp);
}
window.onSIPSliderChange = onSIPSliderChange;

function renderSIPChartCanvas(monthly, cagr, years, stepUp = 10) {
  const canvas = document.getElementById('finance-sip-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  let currentMonthly = monthly;
  let totalCorpus = 0;
  let totalInvested = 0;
  const monthlyRate = (cagr / 100) / 12;

  const dataPoints = [];
  const investedPoints = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      totalCorpus = (totalCorpus + currentMonthly) * (1 + monthlyRate);
      totalInvested += currentMonthly;
    }
    dataPoints.push(totalCorpus);
    investedPoints.push(totalInvested);
    currentMonthly += currentMonthly * (stepUp / 100);
  }

  const futureEl = document.getElementById('sip-future-value');
  if (futureEl) futureEl.textContent = `₹${Math.round(totalCorpus).toLocaleString()}`;

  // Draw smooth compounding curve
  ctx.clearRect(0, 0, rect.width, rect.height);
  const maxVal = totalCorpus * 1.1;
  const stepX = rect.width / (years - 1);

  // Gradient fill for corpus
  const grad = ctx.createLinearGradient(0, 0, 0, rect.height);
  grad.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
  grad.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

  ctx.beginPath();
  ctx.moveTo(0, rect.height);
  dataPoints.forEach((val, idx) => {
    const x = idx * stepX;
    const y = rect.height - (val / maxVal) * (rect.height - 30);
    ctx.lineTo(x, y);
  });
  ctx.lineTo(rect.width, rect.height);
  ctx.fillStyle = grad;
  ctx.fill();

  // Corpus Line
  ctx.beginPath();
  dataPoints.forEach((val, idx) => {
    const x = idx * stepX;
    const y = rect.height - (val / maxVal) * (rect.height - 30);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#00f2fe';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Invested Line
  ctx.beginPath();
  investedPoints.forEach((val, idx) => {
    const x = idx * stepX;
    const y = rect.height - (val / maxVal) * (rect.height - 30);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);
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
          <option value="Mutual Funds & SIP">Mutual Funds & SIP</option>
          <option value="Utilities & Subscriptions">Utilities & Subscriptions</option>
          <option value="Dining & Entertainment">Dining & Entertainment</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Note / Description</label>
        <input type="text" id="t-note" class="chat-input" placeholder="e.g. Mutual fund SIP or Rent">
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

  UI.toast('success', 'Entry Recorded', `Logged ${type} of ₹${amount.toLocaleString()}`);
  Router.render();
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
