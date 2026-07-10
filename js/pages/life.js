/* ============================================================
   LIFE SUCCESS DASHBOARD
   ============================================================ */

const LifePage = {
  render(container) {
    Navigation.setPageTitle('Life Success');
    const score = Store.getMetric('lifeScore') || 75;
    const data = MockData.life;

    container.querySelector('.page-content').innerHTML = `
      <div class="stagger-in">
        <div class="page-header">
          <h2 class="page-header__title">🌟 Life Success Dashboard</h2>
          <p class="page-header__subtitle">Your vision, happiness, relationships, and personal growth — the things that truly matter</p>
        </div>

        <!-- Score Cards -->
        <div class="bento-grid bento-grid--dashboard mb-6">
          <div class="stat-card stat-card--primary">
            <div class="stat-card__label">Life Score</div>
            <div class="stat-card__value text-gradient">${score}%</div>
            <div class="stat-card__change stat-card__change--up">↑ 1% this month</div>
          </div>
          <div class="stat-card stat-card--secondary">
            <div class="stat-card__label">Happiness Index</div>
            <div class="stat-card__value" style="color: var(--color-warning)">${data.happinessIndex}%</div>
            <div class="stat-card__change stat-card__change--up">↑ Trending up</div>
          </div>
          <div class="stat-card stat-card--accent">
            <div class="stat-card__label">Relationships</div>
            <div class="stat-card__value" style="color: var(--color-accent)">${data.relationshipScore}%</div>
            <div class="stat-card__change" style="color: var(--text-secondary)">Strong</div>
          </div>
          <div class="stat-card stat-card--warning">
            <div class="stat-card__label">Books Read</div>
            <div class="stat-card__value">${data.personalGrowth.booksRead}</div>
            <div class="stat-card__change" style="color: var(--text-secondary)">This year</div>
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Vision Board -->
          <div class="glass-card bento-span-2">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">🎨 Vision Board</div>
                <div class="glass-card__subtitle">Visual representation of your life goals</div>
              </div>
              <button class="btn btn--secondary btn--sm">+ Add Vision</button>
            </div>
            <div class="vision-board">
              ${data.visionBoard.map((item, i) => `
                <div class="vision-item ${i === 0 ? 'vision-item--span-2' : ''}" style="background: linear-gradient(135deg, rgba(${this._randomColor()}, 0.08), rgba(${this._randomColor()}, 0.03));">
                  <span class="vision-item__emoji">${item.emoji}</span>
                  <span class="vision-item__label">${item.label}</span>
                  <div class="progress progress--sm progress--primary mt-2" style="width: 80%;">
                    <div class="progress__bar animate-progress" style="width: ${item.progress}%"></div>
                  </div>
                  <span style="font-size: 10px; color: var(--text-tertiary); margin-top: 4px;">${item.progress}%</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Happiness & Wellbeing -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">😊 Happiness & Wellbeing</div>
                <div class="glass-card__subtitle">What truly fulfills you</div>
              </div>
            </div>
            <div style="text-align: center; margin-bottom: var(--space-6);">
              ${Charts.scoreRing('happiness', data.happinessIndex, 140, 10, '#F59E0B')}
            </div>
            <div class="flex flex-col gap-3">
              <div style="display: flex; justify-content: space-between; padding: var(--space-3); background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
                <span style="font-size: var(--text-sm);">❤️ Relationships</span>
                <span style="font-size: var(--text-sm); font-weight: 700; color: var(--color-accent);">${data.relationshipScore}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: var(--space-3); background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
                <span style="font-size: var(--text-sm);">🎯 Purpose</span>
                <span style="font-size: var(--text-sm); font-weight: 700; color: var(--color-primary-light);">68%</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: var(--space-3); background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
                <span style="font-size: var(--text-sm);">🎨 Hobbies & Fun</span>
                <span style="font-size: var(--text-sm); font-weight: 700; color: var(--color-warning);">55%</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: var(--space-3); background: rgba(255,255,255,0.03); border-radius: var(--radius-md);">
                <span style="font-size: var(--text-sm);">🧘 Inner Peace</span>
                <span style="font-size: var(--text-sm); font-weight: 700; color: var(--color-secondary);">72%</span>
              </div>
            </div>
          </div>

          <!-- Personal Growth -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">📈 Personal Growth</div>
                <div class="glass-card__subtitle">Your development this year</div>
              </div>
            </div>
            <div class="bento-grid grid-2 mb-6" style="gap: var(--space-4);">
              <div style="padding: var(--space-4); background: rgba(108,92,231,0.08); border-radius: var(--radius-lg); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: var(--space-2);">📚</div>
                <div style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 800;">${data.personalGrowth.booksRead}</div>
                <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Books Read</div>
              </div>
              <div style="padding: var(--space-4); background: rgba(0,210,255,0.08); border-radius: var(--radius-lg); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: var(--space-2);">🎓</div>
                <div style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 800;">${data.personalGrowth.coursesCompleted}</div>
                <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Courses Done</div>
              </div>
              <div style="padding: var(--space-4); background: rgba(16,185,129,0.08); border-radius: var(--radius-lg); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: var(--space-2);">💡</div>
                <div style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 800;">${data.personalGrowth.skillsLearned}</div>
                <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Skills Gained</div>
              </div>
              <div style="padding: var(--space-4); background: rgba(245,158,11,0.08); border-radius: var(--radius-lg); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: var(--space-2);">🎨</div>
                <div style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 800;">${data.personalGrowth.hobbiesPursued}</div>
                <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Hobbies Active</div>
              </div>
            </div>

            <!-- Recent Milestones -->
            <div class="divider"></div>
            <h6 style="margin-bottom: var(--space-3);">🏆 Recent Achievements</h6>
            <div class="flex flex-col gap-2">
              ${data.milestones.slice(0, 3).map(m => `
                <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2);">
                  <span style="font-size: 1.2rem">${m.icon}</span>
                  <div class="flex-1">
                    <div style="font-size: var(--text-sm); font-weight: 500;">${m.title}</div>
                    <div style="font-size: 10px; color: var(--text-tertiary);">${m.date}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    Charts.animateRings();
  },

  _randomColor() {
    const colors = ['108, 92, 231', '0, 210, 255', '16, 185, 129', '245, 158, 11', '236, 72, 153'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};
