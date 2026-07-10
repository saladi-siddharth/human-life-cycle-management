/* ============================================================
   HEALTH DASHBOARD
   ============================================================ */

const HealthPage = {
  render(container) {
    Navigation.setPageTitle('Health');
    const type = Store.identityType || 'student';
    const score = Store.getMetric('healthScore') || 65;
    const data = MockData.health;
    const tips = data[type]?.tips || data.student.tips;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    container.querySelector('.page-content').innerHTML = `
      <div class="stagger-in">
        <div class="page-header">
          <h2 class="page-header__title">💚 Health Dashboard</h2>
          <p class="page-header__subtitle">Your holistic wellness tracker — fitness, nutrition, sleep & mental health</p>
        </div>

        <!-- Score Cards -->
        <div class="bento-grid bento-grid--dashboard mb-6">
          <div class="stat-card stat-card--secondary">
            <div class="stat-card__label">Wellness Score</div>
            <div class="stat-card__value" style="color: var(--color-accent)">${score}%</div>
            <div class="stat-card__change stat-card__change--down">↓ 2% this week</div>
          </div>
          <div class="stat-card stat-card--accent">
            <div class="stat-card__label">Avg Sleep</div>
            <div class="stat-card__value">${(data.sleepData.reduce((a,b)=>a+b,0)/7).toFixed(1)}<span style="font-size: var(--text-base); font-weight: 400"> hrs</span></div>
            <div class="stat-card__change stat-card__change--up">↑ 0.3 hrs</div>
          </div>
          <div class="stat-card stat-card--primary">
            <div class="stat-card__label">Active Habits</div>
            <div class="stat-card__value">${data.habits.length}</div>
            <div class="stat-card__change" style="color: var(--text-secondary)">Tracking daily</div>
          </div>
          <div class="stat-card stat-card--warning">
            <div class="stat-card__label">Stress Level</div>
            <div class="stat-card__value" style="color: ${data.stressLevels[6] > 60 ? 'var(--color-danger)' : 'var(--color-warning)'}">${data.stressLevels[6]}%</div>
            <div class="stat-card__change stat-card__change--down">↓ 5% this week</div>
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Weekly Activity Chart -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Weekly Activity</div>
                <div class="glass-card__subtitle">Activity score by day</div>
              </div>
              <span class="badge badge--success">This Week</span>
            </div>
            ${Charts.barChart(data.weeklyActivity, days, 140, ['#6C5CE7', '#7C6CF7', '#00D2FF', '#10B981', '#6C5CE7', '#F59E0B', '#EF4444'])}
          </div>

          <!-- Sleep Quality -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Sleep Pattern</div>
                <div class="glass-card__subtitle">Hours of sleep this week</div>
              </div>
              <span class="badge badge--info">Target: 7.5 hrs</span>
            </div>
            ${Charts.lineChart(data.sleepData, days, 140, '#00D2FF')}
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Habit Tracker -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Habit Tracker</div>
                <div class="glass-card__subtitle">Build streaks, build your best self</div>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              ${data.habits.map(habit => `
                <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: rgba(255,255,255,0.02); border-radius: var(--radius-md);">
                  <span style="font-size: 1.5rem">${habit.icon}</span>
                  <div class="flex-1">
                    <div style="font-size: var(--text-sm); font-weight: 600;">${habit.name}</div>
                    <div class="progress progress--sm progress--success mt-2">
                      <div class="progress__bar animate-progress" style="width: ${(habit.streak / habit.target) * 100}%"></div>
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-family: var(--font-heading); font-weight: 700; color: var(--color-accent);">${habit.streak}</div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">/ ${habit.target} days</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Stress & Tips -->
          <div class="flex flex-col gap-6">
            <!-- Stress Monitor -->
            <div class="glass-card">
              <div class="glass-card__header">
                <div>
                  <div class="glass-card__title">Stress Monitor</div>
                  <div class="glass-card__subtitle">Weekly stress levels</div>
                </div>
              </div>
              ${Charts.lineChart(data.stressLevels, days, 100, '#F59E0B')}
            </div>

            <!-- Stage-Specific Tips -->
            <div class="glass-card">
              <div class="glass-card__header">
                <div>
                  <div class="glass-card__title">💡 Tips for You</div>
                  <div class="glass-card__subtitle">Based on your ${type} lifestyle</div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                ${tips.map(tip => `
                  <div style="display: flex; gap: var(--space-3); padding: var(--space-3); background: rgba(16,185,129,0.06); border-radius: var(--radius-md); border: 1px solid rgba(16,185,129,0.1);">
                    <span style="color: var(--color-accent)">✦</span>
                    <span style="font-size: var(--text-sm); color: var(--text-secondary)">${tip}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Preventive Health Calendar -->
        <div class="glass-card">
          <div class="glass-card__header">
            <div>
              <div class="glass-card__title">📅 Preventive Health Calendar</div>
              <div class="glass-card__subtitle">Upcoming checkups and screenings</div>
            </div>
          </div>
          <div class="bento-grid bento-grid--dashboard">
            ${data.preventiveCalendar.map(event => `
              <div style="padding: var(--space-4); background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
                <div style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--space-1);">${event.event}</div>
                <div style="font-size: var(--text-xs); color: var(--text-tertiary); margin-bottom: var(--space-2);">${new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <span class="badge ${event.status === 'upcoming' ? 'badge--warning' : event.status === 'scheduled' ? 'badge--success' : 'badge--neutral'}">${event.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
