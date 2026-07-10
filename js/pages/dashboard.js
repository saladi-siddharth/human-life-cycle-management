/* ============================================================
   MAIN DASHBOARD — Life GPS Overview
   ============================================================ */

const DashboardPage = {
  render(container) {
    Navigation.setPageTitle('Dashboard');
    const type = Store.identityType || 'student';
    const name = Store.userName || 'Explorer';
    const metrics = Store.get('metrics') || {};
    const balance = metrics.lifeBalance || { career: 70, health: 65, finance: 58, work: 70, life: 75 };
    const typeEmoji = { student: '🎓', employee: '💼', business: '🚀' }[type];
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    // Priority alerts based on lowest score
    const sorted = Object.entries(balance).sort((a, b) => a[1] - b[1]);
    const weakest = sorted[0];
    const strongest = sorted[sorted.length - 1];

    container.querySelector('.page-content').innerHTML = `
      <div class="stagger-in">
        <!-- Welcome Banner -->
        <div class="dashboard-welcome mb-6">
          <div class="dashboard-welcome__greeting">${greeting}, ${name} ${typeEmoji}</div>
          <div class="dashboard-welcome__message">
            Your Life Score is <strong>${metrics.overallScore || 68}/100</strong>. 
            Your strongest area is <strong style="color: var(--color-accent)">${strongest[0]}</strong> (${strongest[1]}%) 
            and <strong style="color: var(--color-warning)">${weakest[0]}</strong> (${weakest[1]}%) needs attention.
          </div>
          <div class="dashboard-welcome__emoji">🧭</div>
        </div>

        <!-- Stat Cards Row -->
        <div class="bento-grid bento-grid--dashboard mb-6">
          <div class="stat-card stat-card--primary">
            <div class="stat-card__label">Career Score</div>
            <div class="stat-card__value text-gradient">${balance.career}%</div>
            <div class="stat-card__change stat-card__change--up">↑ 3% this month</div>
            <div class="stat-card__icon" style="background: rgba(108,92,231,0.12); color: var(--color-primary-light)">🎯</div>
          </div>
          <div class="stat-card stat-card--secondary">
            <div class="stat-card__label">Health Score</div>
            <div class="stat-card__value" style="color: var(--color-accent)">${balance.health}%</div>
            <div class="stat-card__change stat-card__change--down">↓ 2% this month</div>
            <div class="stat-card__icon" style="background: rgba(16,185,129,0.12); color: var(--color-accent)">💚</div>
          </div>
          <div class="stat-card stat-card--accent">
            <div class="stat-card__label">Finance Score</div>
            <div class="stat-card__value" style="color: var(--color-warning)">${balance.finance}%</div>
            <div class="stat-card__change stat-card__change--up">↑ 5% this month</div>
            <div class="stat-card__icon" style="background: rgba(245,158,11,0.12); color: var(--color-warning)">💰</div>
          </div>
          <div class="stat-card stat-card--warning">
            <div class="stat-card__label">Life Score</div>
            <div class="stat-card__value" style="color: var(--color-secondary)">${balance.life}%</div>
            <div class="stat-card__change stat-card__change--up">↑ 1% this month</div>
            <div class="stat-card__icon" style="background: rgba(0,210,255,0.12); color: var(--color-secondary)">🌟</div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Life Balance Radar -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Life Balance</div>
                <div class="glass-card__subtitle">Your score across all 5 domains</div>
              </div>
              <span class="badge badge--primary">${typeLabel}</span>
            </div>
            <div class="radar-chart-container">
              ${Charts.radarChart(balance, 260)}
            </div>
          </div>

          <!-- Overall Score + Quick Actions -->
          <div class="flex flex-col gap-6">
            <div class="glass-card" style="text-align: center;">
              <div class="glass-card__header" style="justify-content: center;">
                <div class="glass-card__title">Overall Life Score</div>
              </div>
              ${Charts.scoreRing('overall', metrics.overallScore || 68, 150, 10, '#6C5CE7')}
              <p class="text-secondary mt-4" style="font-size: var(--text-sm)">
                ${metrics.overallScore >= 70 ? '🌟 You\'re doing great! Keep the momentum.' : '💪 Room for growth — let\'s focus on your weak spots.'}
              </p>
            </div>

            <div class="glass-card">
              <div class="glass-card__header">
                <div class="glass-card__title">Quick Actions</div>
              </div>
              <div class="quick-actions">
                <div class="quick-action" onclick="Router.navigate('/coach')">
                  <span class="quick-action__icon">🤖</span>
                  <span>Talk to AI Coach</span>
                </div>
                <div class="quick-action" onclick="Router.navigate('/career')">
                  <span class="quick-action__icon">🎯</span>
                  <span>View Career Plan</span>
                </div>
                <div class="quick-action" onclick="Router.navigate('/health')">
                  <span class="quick-action__icon">💚</span>
                  <span>Health Check-in</span>
                </div>
                <div class="quick-action" onclick="Router.navigate('/finance')">
                  <span class="quick-action__icon">💰</span>
                  <span>Financial Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Priority Alerts & Notifications -->
        <div class="bento-grid bento-grid--2-col">
          <!-- Priority Alerts -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">🚨 Priority Alerts</div>
                <div class="glass-card__subtitle">What needs your attention now</div>
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <div class="list-item" onclick="Router.navigate('/health')">
                <div class="list-item__dot" style="background: var(--color-warning)"></div>
                <div class="flex-1">
                  <div style="font-size: var(--text-sm); font-weight: 500;">Health score dropped to ${balance.health}%</div>
                  <div style="font-size: var(--text-xs); color: var(--text-tertiary)">You missed 3 workouts this week</div>
                </div>
                <span class="badge badge--warning">Action Needed</span>
              </div>
              <div class="list-item" onclick="Router.navigate('/finance')">
                <div class="list-item__dot" style="background: var(--color-info)"></div>
                <div class="flex-1">
                  <div style="font-size: var(--text-sm); font-weight: 500;">Budget review due this week</div>
                  <div style="font-size: var(--text-xs); color: var(--text-tertiary)">Entertainment spending is at 85% of limit</div>
                </div>
                <span class="badge badge--info">Review</span>
              </div>
              <div class="list-item" onclick="Router.navigate('/career')">
                <div class="list-item__dot" style="background: var(--color-accent)"></div>
                <div class="flex-1">
                  <div style="font-size: var(--text-sm); font-weight: 500;">New skill recommendation available</div>
                  <div style="font-size: var(--text-xs); color: var(--text-tertiary)">AI Coach found a relevant course for you</div>
                </div>
                <span class="badge badge--success">New</span>
              </div>
            </div>
          </div>

          <!-- Recent Milestones -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">🏆 Recent Milestones</div>
                <div class="glass-card__subtitle">Celebrate your achievements</div>
              </div>
            </div>
            <div class="timeline">
              ${MockData.life.milestones.map((m, i) => `
                <div class="timeline__item">
                  <div class="timeline__dot ${i === 0 ? 'timeline__dot--current' : 'timeline__dot--completed'}"></div>
                  <div class="timeline__content">
                    <div class="timeline__title">${m.icon} ${m.title}</div>
                    <div class="timeline__time">${m.date}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    Charts.animateRings();
  }
};
