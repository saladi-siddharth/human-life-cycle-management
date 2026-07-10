/* ============================================================
   WORK & PRODUCTIVITY DASHBOARD
   ============================================================ */

const WorkPage = {
  render(container) {
    Navigation.setPageTitle('Productivity');
    const score = Store.getMetric('workScore') || 70;
    const data = MockData.work;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const completed = data.todayTasks.filter(t => t.done).length;

    container.querySelector('.page-content').innerHTML = `
      <div class="stagger-in">
        <div class="page-header">
          <h2 class="page-header__title">⚡ Productivity Dashboard</h2>
          <p class="page-header__subtitle">Optimize your time, energy, and output for peak performance</p>
        </div>

        <!-- Score Cards -->
        <div class="bento-grid bento-grid--dashboard mb-6">
          <div class="stat-card stat-card--primary">
            <div class="stat-card__label">Focus Score</div>
            <div class="stat-card__value text-gradient">${data.focusScore}%</div>
            <div class="stat-card__change stat-card__change--up">↑ 8% this week</div>
          </div>
          <div class="stat-card stat-card--secondary">
            <div class="stat-card__label">Deep Work</div>
            <div class="stat-card__value">${data.deepWorkHours}<span style="font-size: var(--text-base); font-weight: 400"> hrs</span></div>
            <div class="stat-card__change" style="color: var(--text-secondary)">This week</div>
          </div>
          <div class="stat-card stat-card--accent">
            <div class="stat-card__label">Tasks Done</div>
            <div class="stat-card__value">${completed}/${data.todayTasks.length}</div>
            <div class="stat-card__change" style="color: var(--text-secondary)">Today</div>
          </div>
          <div class="stat-card stat-card--warning">
            <div class="stat-card__label">Meetings</div>
            <div class="stat-card__value">${data.meetingHours}<span style="font-size: var(--text-base); font-weight: 400"> hrs</span></div>
            <div class="stat-card__change stat-card__change--down">↓ Target: 10 hrs</div>
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Today's Tasks -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">📋 Today's Tasks</div>
                <div class="glass-card__subtitle">${completed} of ${data.todayTasks.length} completed</div>
              </div>
              <button class="btn btn--secondary btn--sm">+ Add Task</button>
            </div>
            <div class="task-list">
              ${data.todayTasks.map((task, i) => `
                <div class="task-item">
                  <div class="task-item__checkbox ${task.done ? 'task-item__checkbox--checked' : ''}" 
                    onclick="WorkPage.toggleTask(${i})">
                    ${task.done ? '✓' : ''}
                  </div>
                  <span class="task-item__text ${task.done ? 'task-item__text--done' : ''}">${task.text}</span>
                  <div class="task-item__priority task-item__priority--${task.priority}"></div>
                  <span class="task-item__time">${task.time}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Productivity Chart + Energy -->
          <div class="flex flex-col gap-6">
            <!-- Weekly Productivity -->
            <div class="glass-card">
              <div class="glass-card__header">
                <div>
                  <div class="glass-card__title">Weekly Productivity</div>
                  <div class="glass-card__subtitle">Your output score by day</div>
                </div>
              </div>
              ${Charts.barChart(data.weeklyProductivity, days, 120)}
            </div>

            <!-- Energy Levels -->
            <div class="glass-card">
              <div class="glass-card__header">
                <div>
                  <div class="glass-card__title">⚡ Energy Levels</div>
                  <div class="glass-card__subtitle">Match tasks to your natural rhythms</div>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                    <span style="font-size: var(--text-sm);">🌅 Morning</span>
                    <span style="font-size: var(--text-sm); font-weight: 700; color: var(--color-accent);">${data.energyLevels.morning}%</span>
                  </div>
                  <div class="progress progress--success">
                    <div class="progress__bar animate-progress" style="width: ${data.energyLevels.morning}%"></div>
                  </div>
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                    <span style="font-size: var(--text-sm);">☀️ Afternoon</span>
                    <span style="font-size: var(--text-sm); font-weight: 700; color: var(--color-warning);">${data.energyLevels.afternoon}%</span>
                  </div>
                  <div class="progress progress--warning">
                    <div class="progress__bar animate-progress" style="width: ${data.energyLevels.afternoon}%"></div>
                  </div>
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-2);">
                    <span style="font-size: var(--text-sm);">🌙 Evening</span>
                    <span style="font-size: var(--text-sm); font-weight: 700; color: var(--color-danger);">${data.energyLevels.evening}%</span>
                  </div>
                  <div class="progress progress--danger">
                    <div class="progress__bar animate-progress" style="width: ${data.energyLevels.evening}%"></div>
                  </div>
                </div>
              </div>
              <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-4);">
                💡 Tip: Schedule deep work during your morning peak energy window for best results.
              </p>
            </div>
          </div>
        </div>

        <!-- Focus Score Ring -->
        <div class="glass-card" style="text-align: center;">
          <div class="glass-card__header" style="justify-content: center;">
            <div class="glass-card__title">🎯 Overall Productivity Score</div>
          </div>
          <div style="display: flex; justify-content: center; gap: var(--space-10); flex-wrap: wrap;">
            <div>
              ${Charts.scoreRing('focus', data.focusScore, 120, 8, '#6C5CE7')}
              <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">Focus</p>
            </div>
            <div>
              ${Charts.scoreRing('efficiency', 78, 120, 8, '#00D2FF')}
              <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">Efficiency</p>
            </div>
            <div>
              ${Charts.scoreRing('consistency', 65, 120, 8, '#10B981')}
              <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">Consistency</p>
            </div>
          </div>
        </div>
      </div>
    `;

    Charts.animateRings();
  },

  toggleTask(index) {
    MockData.work.todayTasks[index].done = !MockData.work.todayTasks[index].done;
    WorkPage.render(document.getElementById('app').querySelector('.main-content') ? document.getElementById('app') : document.getElementById('app'));
    // Re-render the page content within the app shell
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
      WorkPage.render({ querySelector: () => pageContent });
    }
  }
};
