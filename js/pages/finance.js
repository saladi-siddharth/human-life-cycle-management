/* ═══════════════════════════════════════════════════════════════════
   FINANCE & WEALTH PAGE — Real Dynamic Ledger, Income Motivation & Alerts
   ═══════════════════════════════════════════════════════════════════ */

function FinancePage() {
  const finances = Store.get('finances') || {};
  const scores = Store.get('scores') || {};
  const transactions = finances.transactions || [
    { id: 'tx-1', date: new Date().toISOString().split('T')[0], category: 'Tech Salary & Direct Credits', note: 'Monthly Professional Income', type: 'income', amount: 100000 },
    { id: 'tx-2', date: new Date().toISOString().split('T')[0], category: 'Housing & Rent', note: 'Flat Lease & Utilities', type: 'expense', amount: 18000 },
    { id: 'tx-3', date: new Date().toISOString().split('T')[0], category: 'Groceries & Nutrition', note: 'Organic Mart & Meal prep', type: 'expense', amount: 10000 }
  ];
  const assets = finances.assets || [];
  const liabilities = finances.liabilities || [];

  // Real Dynamic Calculations
  const totalIncome = Number(finances.monthlyIncome) || 100000;
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

  // Dynamic Growth Recommendation
  const growthRecIcon = '📈';
  const growthRecTitle = 'Compound Wealth & Smart Capital Allocation';
  const growthRecText = `Monthly Income: ₹${totalIncome.toLocaleString()} | Monthly Net Savings: ₹${netSavings.toLocaleString()} (${savingsRate}% Savings Rate). Your emergency fund covers ${emergencyMonths} months. Keep compounding via Index SIPs!`;

  const finQuote = EmailService.getRandomQuote('finance');

  const content = `
    <div class="finance-page">
      ${UI.sectionHeader(
        'Financial Freedom & Real-Time Ledger',
        'Dynamic double-entry ledger tracking live income, expenses, 50/30/20 budgets, and compound interest growth.',
        `<div style="display:flex;gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="openIncomeModal()"><i class="fas fa-edit"></i> Edit Income (₹${totalIncome.toLocaleString()})</button>
          <button class="btn btn-primary btn-sm" onclick="openTransactionModal()"><i class="fas fa-plus"></i> Add Transaction</button>
        </div>`
      )}

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
          <div style="font-size:11px;color:var(--text-secondary);">Updates entire dashboard</div>
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
              <p style="margin:2px 0 0 0;font-size:11.5px;color:var(--text-muted);">Every transaction or income entry sends a confirmed balance report to your registered email.</p>
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
                    <button class="btn-delete-epic btn-delete-sm" onclick="deleteTransaction('${t.id}', this.closest('#tx-row-${t.id}'))" data-tooltip="Delete Transaction & Send Alert">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- 2. Interactive SIP Compound Interest Growth Visualizer -->
        <div class="card card-glass" style="grid-column: span 2;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-chart-area" style="color:var(--emerald);"></i> Interactive SIP Compound Wealth Visualizer</h3>
            <span class="badge badge-success" style="font-size:12px;">Projected Total: <strong id="sip-future-value" style="color:#00f2fe;">₹1,75,48,740</strong></span>
          </div>

          <div class="grid grid-3" style="gap:16px;margin-bottom:16px;">
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
          </div>

          <div class="chart-canvas-wrap" style="height:220px;">
            <canvas id="finance-sip-chart"></canvas>
          </div>
        </div>

      </div>

      <!-- 3. Income Motivation & Wealth Building Intelligence -->
      <div class="card card-glass" style="background:linear-gradient(135deg, rgba(251,191,36,0.1), rgba(16,185,129,0.1));border:1px solid rgba(251,191,36,0.3);margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
          <div style="font-size:26px;">🚀</div>
          <div>
            <h4 style="margin:0;color:#fff;">Income Acceleration & Wealth Motivation (The 8th Wonder)</h4>
            <div style="font-size:12px;color:var(--text-muted);">How consistent ₹10,000+ incremental side-income scales your net worth exponentially</div>
          </div>
        </div>

        <div class="grid grid-3" style="gap:14px;font-size:12px;color:#cbd5e1;">
          <div style="background:rgba(15,23,42,0.85);padding:14px;border-radius:12px;border:1px solid var(--glass-border);">
            <strong style="color:var(--gold);display:block;margin-bottom:4px;">💡 Increase Income by ₹20k/mo</strong>
            Adding ₹20,000/month in consulting or digital SaaS and investing in Nifty 50 at 14% CAGR creates <strong>₹1.15 Crore</strong> in 15 years!
          </div>

          <div style="background:rgba(15,23,42,0.85);padding:14px;border-radius:12px;border:1px solid var(--glass-border);">
            <strong style="color:var(--cyan);display:block;margin-bottom:4px;">🛡️ The 6-Month Liquidity Rule</strong>
            Never touch mutual fund investments for short-term emergencies. Maintain ₹${emergencyTarget.toLocaleString()} in high-yield liquid funds for complete peace of mind.
          </div>

          <div style="background:rgba(15,23,42,0.85);padding:14px;border-radius:12px;border:1px solid var(--glass-border);">
            <strong style="color:var(--emerald);display:block;margin-bottom:4px;">🌱 50/30/20 Wealth Rule</strong>
            Keep essential needs under 50% (₹${Math.round(totalIncome * 0.5).toLocaleString()}). Channel the remaining 50% towards growth, skill elevation, and compounding assets.
          </div>
        </div>
      </div>

    </div>
  `;

  setTimeout(() => {
    const sipMonthly = Math.round(netSavings * 0.5 || 25000);
    renderSIPChartCanvas(sipMonthly, 14, 15);
  }, 200);

  return UI.dashboardLayout('/dashboard/finance', content);
}

// ─── Finance Interactive Handlers with Email Dispatch ──────
function openIncomeModal() {
  const currentIncome = Store.get('finances.monthlyIncome') || 100000;
  const html = `
    <h3>Update Monthly Income</h3>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">Updating your income will recalculate your net savings, savings rate, 50/30/20 budgets, and send an email notification.</p>
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

  // Send email notification
  const userEmail = Store.get('profile.email') || 'saladisiddharth@gmail.com';
  const htmlBody = `
    <div style="background:#070a14;border:1px solid #10b981;border-radius:18px;padding:24px;color:#fff;font-family:sans-serif;max-width:540px;margin:0 auto;">
      <h2 style="color:#10b981;margin:0 0 8px 0;">💰 BioVerse Income Update</h2>
      <p style="color:#cbd5e1;font-size:14px;">Your BioVerse monthly income has been updated to:</p>
      <div style="background:#0f172a;padding:16px;border-radius:12px;border:1px solid rgba(16,185,129,0.3);margin:16px 0;">
        <div style="font-size:26px;font-weight:900;color:#10b981;">₹${val.toLocaleString()} / month</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:4px;">All dashboard widgets, savings rate, and 50/30/20 budgets have been recalculated.</div>
      </div>
    </div>
  `;
  Store.sendEmailNotification(`💰 Income Updated: ₹${val.toLocaleString()}/mo`, htmlBody, userEmail);

  UI.toast('success', 'Monthly Income Updated 💰', `Updated to ₹${val.toLocaleString()}. Sent confirmation email!`);
  Router.render();
}
window.saveIncomeForm = saveIncomeForm;

function openTransactionModal() {
  const html = `
    <h3>Log Financial Transaction</h3>
    <form onsubmit="saveTransactionForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Transaction Type</label>
        <select id="t-type" class="chat-input">
          <option value="expense">Expense (-)</option>
          <option value="income">Income (+)</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Amount (₹)</label>
        <input type="number" step="1" id="t-amount" class="chat-input" placeholder="e.g. 15000" required>
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
        <input type="text" id="t-note" class="chat-input" placeholder="e.g. Client retainer or Rent">
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

  // Send email notification
  const userEmail = Store.get('profile.email') || 'saladisiddharth@gmail.com';
  const htmlBody = `
    <div style="background:#070a14;border:1px solid #fbbf24;border-radius:18px;padding:24px;color:#fff;font-family:sans-serif;max-width:540px;margin:0 auto;">
      <h2 style="color:#fbbf24;margin:0 0 8px 0;">💳 BioVerse Ledger Transaction Logged</h2>
      <p style="color:#cbd5e1;font-size:14px;">A new ${type.toUpperCase()} entry has been recorded in your real-time ledger:</p>
      <div style="background:#0f172a;padding:16px;border-radius:12px;margin:16px 0;border:1px solid rgba(255,255,255,0.1);">
        <div style="font-size:20px;font-weight:800;color:${type === 'income' ? '#10b981' : '#f87171'};">
          ${type === 'income' ? '+' : '-'} ₹${amount.toLocaleString()}
        </div>
        <div style="font-size:13px;color:#fff;margin-top:4px;">Category: ${category}</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:2px;">Note: ${note || '—'}</div>
      </div>
    </div>
  `;
  Store.sendEmailNotification(`💳 Ledger Transaction: ${type.toUpperCase()} ₹${amount.toLocaleString()}`, htmlBody, userEmail);

  if (typeof ActionPhysics !== 'undefined') ActionPhysics.coinWaterfall(amount);
  UI.toast('success', 'Transaction Saved & Alert Dispatched 💰', `Logged ₹${amount.toLocaleString()} to ledger.`);
  Router.render();
}
window.saveTransactionForm = saveTransactionForm;

function deleteTransaction(id, element) {
  const el = element || document.getElementById(`tx-row-${id}`);
  const finances = Store.get('finances') || {};
  const txs = (finances.transactions || []).filter(t => t.id !== id);

  DeleteEngine.tossAndDelete(el, () => {
    Store.set('finances.transactions', txs);
    UI.toast('info', 'Transaction Removed', 'Ledger entry deleted.');
    Router.render();
  });
}
window.deleteTransaction = deleteTransaction;

function onSIPSliderChange() {
  const p = Number(document.getElementById('sip-slider-monthly')?.value || 25000);
  const r = Number(document.getElementById('sip-slider-rate')?.value || 14);
  const y = Number(document.getElementById('sip-slider-years')?.value || 15);

  const pTxt = document.getElementById('sip-slider-monthly-txt');
  const rTxt = document.getElementById('sip-slider-rate-txt');
  const yTxt = document.getElementById('sip-slider-years-txt');

  if (pTxt) pTxt.textContent = `₹${p.toLocaleString()}`;
  if (rTxt) rTxt.textContent = `${r}%`;
  if (yTxt) yTxt.textContent = `${y} Years`;

  renderSIPChartCanvas(p, r, y);
}
window.onSIPSliderChange = onSIPSliderChange;

function renderSIPChartCanvas(monthly, rate, years) {
  const i = (rate / 100) / 12;
  const n = years * 12;
  const fv = Math.round(monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const fvEl = document.getElementById('sip-future-value');
  if (fvEl) fvEl.textContent = `₹${fv.toLocaleString()}`;

  const labels = [];
  const values = [];
  for (let yr = 1; yr <= years; yr++) {
    labels.push(`Yr ${yr}`);
    const months = yr * 12;
    const val = Math.round(monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i));
    values.push(val);
  }

  if (typeof Charts !== 'undefined') {
    Charts.line('finance-sip-chart', {
      labels,
      datasets: [{ label: 'SIP Corpus (₹)', data: values, borderColor: '#10b981', fill: true }]
    });
  }
}

function exportLedgerCSV() {
  const finances = Store.get('finances') || {};
  const transactions = finances.transactions || [];
  let csv = 'Date,Category,Note,Type,Amount\n';
  transactions.forEach(t => {
    csv += `"${t.date}","${t.category}","${t.note || ''}","${t.type}",${t.amount}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BioVerse_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  UI.toast('success', 'CSV Exported', 'Downloaded ledger export.');
}
window.exportLedgerCSV = exportLedgerCSV;
