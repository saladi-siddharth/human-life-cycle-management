/* ============================================================
   FINANCE DASHBOARD
   ============================================================ */

const FinancePage = {
  render(container) {
    Navigation.setPageTitle('Finance');
    const type = Store.identityType || 'student';
    const data = MockData.finance[type];
    const score = Store.getMetric('financeScore') || 58;

    const formatMoney = (n) => {
      if (n < 0) return '-$' + Math.abs(n).toLocaleString();
      return '$' + n.toLocaleString();
    };

    container.querySelector('.page-content').innerHTML = `
      <div class="stagger-in">
        <div class="page-header">
          <h2 class="page-header__title">💰 Finance Dashboard</h2>
          <p class="page-header__subtitle">Your complete financial health overview and optimization tools</p>
        </div>

        <!-- Score Cards -->
        <div class="bento-grid bento-grid--dashboard mb-6">
          <div class="stat-card stat-card--primary">
            <div class="stat-card__label">Financial Health</div>
            <div class="stat-card__value text-gradient">${score}%</div>
            <div class="stat-card__change stat-card__change--up">↑ 5% this month</div>
          </div>
          <div class="stat-card stat-card--secondary">
            <div class="stat-card__label">Net Worth</div>
            <div class="stat-card__value" style="color: ${data.netWorth >= 0 ? 'var(--color-accent)' : 'var(--color-danger)'}; font-size: var(--text-2xl)">${formatMoney(data.netWorth)}</div>
            <div class="stat-card__change stat-card__change--up">↑ Trending up</div>
          </div>
          <div class="stat-card stat-card--accent">
            <div class="stat-card__label">Monthly Income</div>
            <div class="stat-card__value" style="font-size: var(--text-2xl)">${formatMoney(data.monthlyIncome)}</div>
            <div class="stat-card__change" style="color: var(--text-secondary)">This month</div>
          </div>
          <div class="stat-card stat-card--warning">
            <div class="stat-card__label">Monthly Expenses</div>
            <div class="stat-card__value" style="font-size: var(--text-2xl)">${formatMoney(data.monthlyExpenses)}</div>
            <div class="stat-card__change" style="color: var(--color-accent)">Savings: ${formatMoney(data.monthlyIncome - data.monthlyExpenses)}</div>
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Budget Breakdown -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Budget Breakdown</div>
                <div class="glass-card__subtitle">Where your money goes</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-6)">
              ${Charts.donutChart(data.budget, 170, formatMoney(data.monthlyExpenses), 'monthly')}
              <div class="chart-legend" style="flex-direction: column; margin-top: 0;">
                ${data.budget.map(b => `
                  <div class="chart-legend__item">
                    <div class="chart-legend__dot" style="background: ${b.color}"></div>
                    <span>${b.category}</span>
                    <span style="margin-left: auto; font-weight: 600; color: var(--text-primary)">${formatMoney(b.amount)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Net Worth Trend -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Net Worth Trend</div>
                <div class="glass-card__subtitle">Monthly progression</div>
              </div>
              <span class="badge badge--success">↑ Growing</span>
            </div>
            ${Charts.lineChart(
              MockData.finance.netWorthHistory, 
              MockData.finance.netWorthHistory.map(d => d.month), 
              180, 
              '#10B981'
            )}
          </div>
        </div>

        <!-- Savings Goals -->
        <div class="glass-card mb-6">
          <div class="glass-card__header">
            <div>
              <div class="glass-card__title">🎯 Savings Goals</div>
              <div class="glass-card__subtitle">Track progress towards your financial milestones</div>
            </div>
            <button class="btn btn--secondary btn--sm">+ Add Goal</button>
          </div>
          <div class="bento-grid bento-grid--3-col">
            ${data.goals.map(goal => {
              const pct = Math.round((goal.current / goal.target) * 100);
              return `
                <div style="padding: var(--space-5); background: rgba(255,255,255,0.03); border-radius: var(--radius-lg); border: 1px solid var(--glass-border);">
                  <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
                    <span style="font-size: 1.5rem">${goal.icon}</span>
                    <div>
                      <div style="font-size: var(--text-sm); font-weight: 600;">${goal.name}</div>
                      <div style="font-size: var(--text-xs); color: var(--text-tertiary);">${formatMoney(goal.current)} of ${formatMoney(goal.target)}</div>
                    </div>
                  </div>
                  <div class="progress progress--primary">
                    <div class="progress__bar animate-progress" style="width: ${pct}%"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-top: var(--space-2);">
                    <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${pct}% complete</span>
                    <span style="font-size: var(--text-xs); color: var(--color-primary-light);">${formatMoney(goal.target - goal.current)} to go</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Branch-Specific Finance -->
        <div class="glass-card">
          <div class="glass-card__header">
            <div>
              <div class="glass-card__title">${type === 'student' ? '🎓 Student Finance Tips' : type === 'employee' ? '💼 Employee Finance Optimizer' : '🚀 Business Finance Insights'}</div>
            </div>
          </div>
          <div class="bento-grid bento-grid--3-col">
            ${type === 'student' ? `
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">📚</div>
                <div class="stat-card__label">Student Loans</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-danger)">${formatMoney(data.loans)}</div>
              </div>
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">🛡️</div>
                <div class="stat-card__label">Emergency Fund</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-warning)">${formatMoney(data.savings)}</div>
              </div>
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">💡</div>
                <div class="stat-card__label">Scholarships Available</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-accent)">3</div>
              </div>
            ` : type === 'employee' ? `
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">🏦</div>
                <div class="stat-card__label">401(k) Balance</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-accent)">${formatMoney(data.retirement)}</div>
              </div>
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">📈</div>
                <div class="stat-card__label">Savings Rate</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-primary-light)">20%</div>
              </div>
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">🎯</div>
                <div class="stat-card__label">FIRE Progress</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-warning)">12%</div>
              </div>
            ` : `
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">⏰</div>
                <div class="stat-card__label">Runway</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-warning)">${data.runway} mo</div>
              </div>
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">🔥</div>
                <div class="stat-card__label">Burn Rate</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-danger)">${formatMoney(data.monthlyExpenses)}/mo</div>
              </div>
              <div class="stat-card" style="text-align: center">
                <div style="font-size: 2rem; margin-bottom: var(--space-2)">💵</div>
                <div class="stat-card__label">Cash Reserves</div>
                <div class="stat-card__value" style="font-size: var(--text-2xl); color: var(--color-accent)">${formatMoney(data.savings)}</div>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }
};
