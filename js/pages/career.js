/* ============================================================
   CAREER DASHBOARD
   ============================================================ */

const CareerPage = {
  render(container) {
    Navigation.setPageTitle('Career');
    const type = Store.identityType || 'student';
    const data = MockData.career[type];
    const score = Store.getMetric('careerScore') || 72;

    container.querySelector('.page-content').innerHTML = `
      <div class="stagger-in">
        <div class="page-header">
          <h2 class="page-header__title">🎯 Career Dashboard</h2>
          <p class="page-header__subtitle">Your personalized career roadmap and skill development tracker</p>
        </div>

        <!-- Score + Overview -->
        <div class="bento-grid bento-grid--dashboard mb-6">
          <div class="stat-card stat-card--primary">
            <div class="stat-card__label">Career Score</div>
            <div class="stat-card__value text-gradient">${score}%</div>
            <div class="stat-card__change stat-card__change--up">↑ 3% this month</div>
          </div>
          <div class="stat-card stat-card--secondary">
            <div class="stat-card__label">Skills Tracked</div>
            <div class="stat-card__value">${data.skills.length}</div>
            <div class="stat-card__change" style="color: var(--text-secondary)">Active development</div>
          </div>
          <div class="stat-card stat-card--accent">
            <div class="stat-card__label">Resources</div>
            <div class="stat-card__value">${data.resources.length}</div>
            <div class="stat-card__change stat-card__change--up">In progress</div>
          </div>
          <div class="stat-card stat-card--warning">
            <div class="stat-card__label">Roadmap Progress</div>
            <div class="stat-card__value">${Math.round((data.roadmap.filter(r => r.status === 'completed').length / data.roadmap.length) * 100)}%</div>
            <div class="stat-card__change" style="color: var(--text-secondary)">On track</div>
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col mb-6">
          <!-- Career Roadmap Timeline -->
          <div class="glass-card bento-span-2">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Career Roadmap</div>
                <div class="glass-card__subtitle">Your step-by-step path to success</div>
              </div>
              <span class="badge badge--primary">${type.charAt(0).toUpperCase() + type.slice(1)} Track</span>
            </div>
            <div class="timeline">
              ${data.roadmap.map(step => `
                <div class="timeline__item">
                  <div class="timeline__dot ${step.status === 'completed' ? 'timeline__dot--completed' : step.status === 'current' ? 'timeline__dot--current' : ''}"></div>
                  <div class="timeline__content">
                    <div class="timeline__title">
                      ${step.status === 'completed' ? '✅' : step.status === 'current' ? '🔵' : '⬜'} ${step.title}
                    </div>
                    <div class="timeline__desc">${step.desc}</div>
                    <div class="timeline__time">${step.time}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="bento-grid bento-grid--2-col">
          <!-- Skill Development -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Skill Development</div>
                <div class="glass-card__subtitle">Current vs. target proficiency</div>
              </div>
            </div>
            ${data.skills.map(skill => `
              <div class="skill-bar">
                <div class="skill-bar__header">
                  <span class="skill-bar__name">${skill.name}</span>
                  <span class="skill-bar__level">${skill.level}% / ${skill.target}%</span>
                </div>
                <div class="progress progress--primary">
                  <div class="progress__bar animate-progress" style="width: ${skill.level}%"></div>
                </div>
                <div class="progress mt-1" style="height: 2px; opacity: 0.3">
                  <div class="progress__bar" style="width: ${skill.target}%; background: var(--text-tertiary)"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Learning Resources -->
          <div class="glass-card">
            <div class="glass-card__header">
              <div>
                <div class="glass-card__title">Learning Resources</div>
                <div class="glass-card__subtitle">Curated for your career path</div>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              ${data.resources.map(res => `
                <div style="padding: var(--space-4); background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
                  <div class="flex justify-between items-center mb-2">
                    <div>
                      <div style="font-size: var(--text-sm); font-weight: 600;">${res.title}</div>
                      <div style="font-size: var(--text-xs); color: var(--text-tertiary);">${res.type} • ${res.provider}</div>
                    </div>
                    <span class="badge ${res.progress === 100 ? 'badge--success' : 'badge--primary'}">${res.progress}%</span>
                  </div>
                  <div class="progress progress--sm ${res.progress === 100 ? 'progress--success' : 'progress--primary'}">
                    <div class="progress__bar animate-progress" style="width: ${res.progress}%"></div>
                  </div>
                </div>
              `).join('')}
              <button class="btn btn--secondary btn--full mt-2">+ Browse More Resources</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
