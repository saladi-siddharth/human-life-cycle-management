/* ============================================================
   IDENTITY CAPTURE PAGE — The Single Question
   ============================================================ */

const IdentityPage = {
  render(container) {
    container.innerHTML = `
      <div class="identity-page">
        <div class="hero__bg">
          <div class="hero__orb hero__orb--1"></div>
          <div class="hero__orb hero__orb--2"></div>
          <div class="hero__orb hero__orb--3"></div>
          <div class="hero__grid"></div>
        </div>

        <div style="position: relative; z-index: 1; width: 100%; max-width: 1100px;">
          <div style="text-align: center; margin-bottom: var(--space-6);">
            <a href="#/" style="color: var(--text-tertiary); font-size: var(--text-sm); text-decoration: none;">← Back to Home</a>
          </div>

          <h1 class="identity-page__question slide-up">
            Who Are You <span class="text-gradient">Today</span>?
          </h1>
          <p class="identity-page__subtext fade-in" style="animation-delay: 0.2s;">
            This single answer shapes your entire LifeGPS experience. Don't worry — you can always change it later.
          </p>

          <div class="identity-cards stagger-in">
            <div class="identity-card identity-card--student" id="card-student" onclick="IdentityPage.select('student')">
              <span class="identity-card__emoji">🎓</span>
              <h3 class="identity-card__title">I'm a Student</h3>
              <p class="identity-card__desc">Currently pursuing education — from high school to PhD</p>
              <div class="identity-card__features">
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Academic performance tracking</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Scholarship & internship finder</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Career path exploration</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Student budget optimizer</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Exam stress management</span>
                </div>
              </div>
            </div>

            <div class="identity-card identity-card--employee" id="card-employee" onclick="IdentityPage.select('employee')">
              <span class="identity-card__emoji">💼</span>
              <h3 class="identity-card__title">I'm an Employee</h3>
              <p class="identity-card__desc">Working professional looking to grow and optimize life</p>
              <div class="identity-card__features">
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Promotion roadmap & timeline</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Salary negotiation coaching</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>401(k) & investment optimizer</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Burnout prevention system</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Work-life balance tracking</span>
                </div>
              </div>
            </div>

            <div class="identity-card identity-card--business" id="card-business" onclick="IdentityPage.select('business')">
              <span class="identity-card__emoji">🚀</span>
              <h3 class="identity-card__title">I'm a Business Owner</h3>
              <p class="identity-card__desc">Running or building a business — startup to enterprise</p>
              <div class="identity-card__features">
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Business financial dashboard</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Fundraising & investor CRM</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Team & hiring management</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Growth stage playbooks</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Exit strategy planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  select(type) {
    // Remove previous selection
    document.querySelectorAll('.identity-card').forEach(card => {
      card.classList.remove('identity-card--selected');
    });

    // Add selection
    document.getElementById(`card-${type}`).classList.add('identity-card--selected');

    // Save to store
    Store.set('identityType', type);

    // Navigate to onboarding after brief delay
    setTimeout(() => {
      Store.set('onboardingStep', 0);
      Router.navigate('/onboarding');
    }, 600);
  }
};
