/* ═══════════════════════════════════════════════════════════════════
   FINANCE & WEALTH PAGE — Double-Entry Ledger, Dynamic Income & Growth AI
   ═══════════════════════════════════════════════════════════════════ */

function FinancePage() {
  const finances = Store.get('finances') || {};
  const scores = Store.get('scores') || {};
  const transactions = finances.transactions || [];
  const assets = finances.assets || [];
  const liabilities = finances.liabilities || [];

  const totalIncome = Number(finances.monthlyIncome) || 75000;
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const netSavings = Math.max(0, totalIncome - totalExpenses);
  const savingsRate = Math.round((netSavings / totalIncome) * 100);

  const totalAssets = assets.reduce((sum, a) => sum + Number(a.amount), 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + Number(l.amount), 0);
  const netWorth = totalAssets - totalLiabilities;

  const emergencyFund = Number(finances.emergencyFund) || 180000;
  const emergencyTarget = Number(finances.emergencyFundTarget) || 300000;
  const emergencyMonths = totalExpenses > 0 ? (emergencyFund / totalExpenses).toFixed(1) : '6.0';

  // Dynamic Financial Growth Recommendations Generator
  let growthRecIcon = '📈';
  let growthRecTitle = 'Financial Growth & SIP Recommendation';
  let growthRecText = `Your monthly income is ₹${totalIncome.toLocaleString()}. With a ${savingsRate}% savings rate (₹${netSavings.toLocaleString()} net savings), allocate ₹${Math.round(netSavings * 0.6).toLocaleString()} into low-cost Nifty 50 Index Mutual Fund SIPs for compounding wealth.`;

  if (savingsRate < 20) {
    growthRecIcon = '⚠️';
    growthRecTitle = 'Low Savings Rate Alert';
    growthRecText = `Your savings rate is ${savingsRate}%. Target at least 25% (₹${Math.round(totalIncome * 0.25).toLocaleString()}/month) by auditing non-essential dining and subscription expenses.`;
  } else if (emergencyMonths < 3) {
    growthRecIcon = '🛡️';
    growthRecTitle = 'Emergency Liquidity Guard';
    growthRecText = `Emergency fund covers ${emergencyMonths} months of expenses. Allocate 50% of monthly net savings to reach the ₹${emergencyTarget.toLocaleString()} (6 months) target.`;
  }

  const content = `
    <div class="finance-page">
      ${UI.sectionHeader(
        'Financial Freedom & Real-Time Ledger',
        'Dynamic ledger tracking income, expenses, 50/30/20 budgets, and compound interest growth.',
        `<button class="btn btn-primary btn-sm" onclick="openTransactionModal()"><i class="fas fa-plus"></i> Add Transaction</button>`
      )}

      <!-- Dynamic Real-Time Financial Growth Banner -->
      ${UI.recommendationBanner(growthRecIcon, growthRecTitle, growthRecText, 'Log Income / Expense', 'openTransactionModal()')}

      <!-- Key Metrics Row -->
      <div class="grid grid-4" style="gap:16px;margin-bottom:var(--space-xl);">
        <div class="card card-glass">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Monthly Income</div>
          <div style="font-size:24px;font-weight:800;color:var(--emerald);">₹${totalIncome.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Updates entire dashboard</div>
        </div>

        <div class="card card-glass">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Monthly Net Savings</div>
          <div style="font-size:24px;font-weight:800;color:var(--cyan);">₹${netSavings.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--emerald);margin-top:4px;font-weight:600;">Savings Rate: ${savingsRate}%</div>
        </div>

        <div class="card card-glass">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Emergency Runway</div>
          <div style="font-size:24px;font-weight:800;color:var(--indigo-light);">${emergencyMonths} Months</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Target: ₹${emergencyTarget.toLocaleString()}</div>
        </div>

        <div class="card card-glass">
          <div style="font-size:var(--text-xs);color:var(--text-muted);">Finance Score</div>
          <div style="font-size:24px;font-weight:800;color:var(--purple);">${scores.finance || 70}/100</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;">Dynamic Ledger Analysis</div>
        </div>
      </div>

      <!-- 4 Core Sub-Component Grid -->
      <div class="grid grid-2" style="gap:24px;">

        <!-- 1. Double-Entry Transaction Ledger -->
        <div class="card card-glass" style="grid-column: span 2;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-receipt" style="color:var(--indigo-light);"></i> Real-Time Transaction Ledger</h3>
            <button class="btn btn-secondary btn-sm" onclick="openTransactionModal()"><i class="fas fa-plus"></i> Add Entry</button>
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
                    <button class="btn-delete-epic btn-delete-sm" onclick="deleteTransaction('${t.id}', this.closest('#tx-row-${t.id}'))" data-tooltip="Crumple & Toss Transaction">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- 2. Smart 50/30/20 Budget Allocator -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-chart-pie" style="color:var(--cyan);"></i> 50/30/20 Smart Budget</h3>
          
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);margin-bottom:6px;">
                <span>Needs (50% Target: ₹${Math.round(totalIncome * 0.5).toLocaleString()})</span>
                <span>Actual Expenses: ₹${totalExpenses.toLocaleString()}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${Math.min(100, Math.round((totalExpenses / (totalIncome * 0.5)) * 100))}%;background:var(--indigo);"></div>
              </div>
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);margin-bottom:6px;">
                <span>Savings & SIP (30% Target: ₹${Math.round(totalIncome * 0.3).toLocaleString()})</span>
                <span>Saved: ₹${netSavings.toLocaleString()}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${Math.min(100, Math.round((netSavings / (totalIncome * 0.3)) * 100))}%;background:var(--emerald);"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Compound Interest Growth Simulator -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-seedling" style="color:var(--emerald);"></i> Compound Growth Simulator</h3>
          
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div>
              <label style="font-size:12px;color:var(--text-muted);display:flex;justify-content:space-between;">
                <span>Monthly Investment Deposit (SIP)</span>
                <span id="monthly-val" style="font-weight:700;color:var(--emerald);">₹10,000</span>
              </label>
              <input type="range" min="1000" max="100000" step="1000" value="10000" class="slider" id="calc-monthly" oninput="updateCompoundCalc()">
            </div>

            <div>
              <label style="font-size:12px;color:var(--text-muted);display:flex;justify-content:space-between;">
                <span>Investment Horizon (Years)</span>
                <span id="years-val" style="font-weight:700;color:var(--cyan);">10 Years</span>
              </label>
              <input type="range" min="1" max="30" step="1" value="10" class="slider" id="calc-years" oninput="updateCompoundCalc()">
            </div>

            <div style="padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-md);text-align:center;border:1px solid var(--glass-border);">
              <div style="font-size:var(--text-xs);color:var(--text-muted);">Projected Portfolio Value (at 12% CAGR)</div>
              <div id="compound-total" style="font-size:26px;font-weight:900;color:var(--emerald);margin-top:4px;">₹23,23,391</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/finance', content);
}

// ─── Finance Interactive Handlers ──────────────────────────
function openTransactionModal() {
  const html = `
    <h3>Log Financial Transaction</h3>
    <form onsubmit="saveTransactionForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Transaction Type</label>
        <select id="t-type" class="chat-input" onchange="toggleCategorySelect(this.value)">
          <option value="expense">Expense (-)</option>
          <option value="income">Income (+ Update Total Income)</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Amount (₹)</label>
        <input type="number" step="1" id="t-amount" class="chat-input" placeholder="e.g. 75000" required>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Category</label>
        <select id="t-cat" class="chat-input">
          <option value="Stipend / Income">Stipend / Income</option>
          <option value="Housing & Rent">Housing & Rent</option>
          <option value="Food & Mess">Food & Mess</option>
          <option value="Utilities & Books">Utilities & Books</option>
          <option value="Savings & Mutual Funds">Savings & Mutual Funds</option>
          <option value="Dining & Outing">Dining & Outing</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Note / Description</label>
        <input type="text" id="t-note" class="chat-input" placeholder="e.g. Monthly stipend or Rent payment">
      </div>
      <button type="submit" class="btn btn-primary">Save Transaction</button>
    </form>
  `;
  UI.modal(html);
}

function saveTransactionForm(e) {
  e.preventDefault();
  const type = document.getElementById('t-type').value;
  const amount = document.getElementById('t-amount').value;
  const category = document.getElementById('t-cat').value;
  const note = document.getElementById('t-note').value;
  
  Store.addTransaction({ type, amount, category, note });
  EmailService.sendFinanceAlert('Financial Ledger Activity', `Logged ${type.toUpperCase()} of ₹${Number(amount).toLocaleString()} (${category} - ${note || 'General'})`);
  UI.closeModal();
  DeleteEngine.dropCoins(10);
  UI.toast('success', 'Transaction Recorded 🪙', `Saved ${type.toUpperCase()} of ₹${Number(amount).toLocaleString()}. 3D gold coins dropped into ledger!`);
  Router.render();
}

function deleteTransaction(id, element) {
  const el = element || document.getElementById(`tx-row-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteTransaction(id);
    UI.toast('info', 'Transaction Removed', 'Transaction crumpled into paper ball and tossed!');
    Router.render();
  });
}

function updateCompoundCalc() {
  const p = 50000;
  const pm = Number(document.getElementById('calc-monthly').value);
  const t = Number(document.getElementById('calc-years').value);
  const r = 0.12 / 12; // 12% CAGR in Indian Markets
  const n = t * 12;

  const fv = p * Math.pow(1 + r, n) + pm * ((Math.pow(1 + r, n) - 1) / r);

  document.getElementById('monthly-val').textContent = `₹${pm.toLocaleString()}`;
  document.getElementById('years-val').textContent = `${t} Years`;
  document.getElementById('compound-total').textContent = `₹${Math.round(fv).toLocaleString()}`;
}

function toggleCategorySelect(val) {
  const catSelect = document.getElementById('t-cat');
  if (catSelect) {
    if (val === 'income') {
      catSelect.value = 'Stipend / Income';
    } else {
      catSelect.value = 'Housing & Rent';
    }
  }
}

window.openTransactionModal = openTransactionModal;
window.saveTransactionForm = saveTransactionForm;
window.deleteTransaction = deleteTransaction;
window.updateCompoundCalc = updateCompoundCalc;
window.toggleCategorySelect = toggleCategorySelect;


