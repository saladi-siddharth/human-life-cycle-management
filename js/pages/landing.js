/* ============================================================
   LANDING PAGE
   ============================================================ */

const LandingPage = {
  render(container) {
    container.innerHTML = `
      <div class="app-shell--public">
        <!-- Navigation -->
        <nav class="landing-nav" id="landingNav">
          <a class="landing-nav__brand" href="#/">
            <div class="landing-nav__logo">🧭</div>
            <span class="landing-nav__name">LifeGPS</span>
          </a>
          <div class="landing-nav__links">
            <span class="landing-nav__link" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">Features</span>
            <span class="landing-nav__link" onclick="document.getElementById('stats').scrollIntoView({behavior:'smooth'})">Impact</span>
            <span class="landing-nav__link" onclick="Router.navigate('/pricing')">Pricing</span>
            <button class="btn btn--primary btn--sm" onclick="Router.navigate('/identity')">Get Started</button>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero">
          <div class="hero__bg">
            <div class="hero__orb hero__orb--1"></div>
            <div class="hero__orb hero__orb--2"></div>
            <div class="hero__orb hero__orb--3"></div>
            <div class="hero__grid"></div>
          </div>

          <div class="hero__content">
            <div class="hero__badge">
              <span class="hero__badge-dot"></span>
              AI-Powered Life Management Platform
            </div>

            <h1 class="hero__title">
              Your Life<br>
              <span class="hero__title-highlight">Deserves a GPS</span>
            </h1>

            <p class="hero__subtitle">
              One platform. One identity. Lifetime guidance across Career, Health, Finance, 
              Productivity & Life Success — powered by AI that knows you.
            </p>

            <div class="hero__cta">
              <button class="btn btn--primary btn--lg" onclick="Router.navigate('/identity')">
                🚀 Start Your Journey — Free
              </button>
              <button class="btn btn--secondary btn--lg" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">
                Learn More ↓
              </button>
            </div>
          </div>

          <div class="hero__scroll-hint">
            <span>Scroll to explore</span>
            <span>↓</span>
          </div>
        </section>

        <!-- Identity Preview Section -->
        <section style="padding: var(--space-24) var(--space-6); text-align: center;">
          <div class="label mb-4" style="color: var(--color-primary-light);">ONE QUESTION TO START</div>
          <h2 style="margin-bottom: var(--space-3);">Who Are You Today?</h2>
          <p class="text-secondary" style="margin-bottom: var(--space-10); max-width: 500px; margin-inline: auto;">
            Answer one simple question and unlock a personalized life management experience 
            tailored to your exact stage and goals.
          </p>
          <div class="identity-cards">
            <div class="identity-card identity-card--student" onclick="Router.navigate('/identity')">
              <span class="identity-card__emoji">🎓</span>
              <h3 class="identity-card__title">Student</h3>
              <p class="identity-card__desc">Navigating education, building skills, and planning your first career moves</p>
              <div class="identity-card__features">
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>College & Scholarship Finder</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Career Path Builder</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Student Budget Optimizer</span>
                </div>
              </div>
            </div>

            <div class="identity-card identity-card--employee" onclick="Router.navigate('/identity')">
              <span class="identity-card__emoji">💼</span>
              <h3 class="identity-card__title">Employee</h3>
              <p class="identity-card__desc">Growing your career, managing finances, and achieving work-life balance</p>
              <div class="identity-card__features">
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Promotion Roadmap</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Salary Negotiation Coach</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Burnout Prevention</span>
                </div>
              </div>
            </div>

            <div class="identity-card identity-card--business" onclick="Router.navigate('/identity')">
              <span class="identity-card__emoji">🚀</span>
              <h3 class="identity-card__title">Business Owner</h3>
              <p class="identity-card__desc">Scaling your venture while maintaining personal health and relationships</p>
              <div class="identity-card__features">
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Business Financial Dashboard</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Founder Burnout Prevention</span>
                </div>
                <div class="identity-card__feature">
                  <span class="identity-card__feature-icon">✓</span>
                  <span>Exit Strategy Planner</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section" id="features">
          <div class="features-section__header">
            <div class="label mb-4" style="color: var(--color-secondary);">COMPREHENSIVE PLATFORM</div>
            <h2 style="margin-bottom: var(--space-3);">Five Domains. One Platform.</h2>
            <p class="text-secondary" style="max-width: 500px; margin-inline: auto;">
              Unlike fragmented tools, LifeGPS connects every aspect of your life for 
              truly intelligent guidance.
            </p>
          </div>
          <div class="features-section__grid stagger-in">
            <div class="feature-item">
              <div class="feature-item__icon" style="background: rgba(108, 92, 231, 0.15); color: var(--color-primary-light)">🎯</div>
              <h4 class="feature-item__title">Career Intelligence</h4>
              <p class="feature-item__desc">Personalized career roadmaps, skill gap analysis, and AI-powered job matching based on your unique profile.</p>
            </div>
            <div class="feature-item">
              <div class="feature-item__icon" style="background: rgba(16, 185, 129, 0.15); color: var(--color-accent)">💚</div>
              <h4 class="feature-item__title">Holistic Health</h4>
              <p class="feature-item__desc">Fitness, nutrition, mental wellness, and preventive care — all adapted to your life stage and work demands.</p>
            </div>
            <div class="feature-item">
              <div class="feature-item__icon" style="background: rgba(245, 158, 11, 0.15); color: var(--color-warning)">💰</div>
              <h4 class="feature-item__title">Smart Finance</h4>
              <p class="feature-item__desc">Budget optimization, investment guidance, and financial planning that grows with your income and goals.</p>
            </div>
            <div class="feature-item">
              <div class="feature-item__icon" style="background: rgba(0, 210, 255, 0.15); color: var(--color-secondary)">⚡</div>
              <h4 class="feature-item__title">Productivity Engine</h4>
              <p class="feature-item__desc">Time management, deep work scheduling, and energy optimization matched to your natural rhythms.</p>
            </div>
            <div class="feature-item">
              <div class="feature-item__icon" style="background: rgba(236, 72, 153, 0.15); color: #EC4899">🌟</div>
              <h4 class="feature-item__title">Life Success</h4>
              <p class="feature-item__desc">Vision boards, happiness tracking, relationship health, and legacy planning for a fulfilled life.</p>
            </div>
            <div class="feature-item">
              <div class="feature-item__icon" style="background: rgba(139, 92, 246, 0.15); color: #A78BFA">🤖</div>
              <h4 class="feature-item__title">AI Life Coach</h4>
              <p class="feature-item__desc">24/7 AI companion that understands your complete picture and provides contextual, actionable advice.</p>
            </div>
          </div>
        </section>

        <!-- Stats Section -->
        <section class="stats-section" id="stats">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-item__number" data-count="260">260+</div>
              <div class="stat-item__label">Features Built</div>
            </div>
            <div class="stat-item">
              <div class="stat-item__number" data-count="5">5</div>
              <div class="stat-item__label">Life Domains</div>
            </div>
            <div class="stat-item">
              <div class="stat-item__number" data-count="3">3</div>
              <div class="stat-item__label">Identity Paths</div>
            </div>
            <div class="stat-item">
              <div class="stat-item__number" data-count="24">24/7</div>
              <div class="stat-item__label">AI Coach Access</div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section">
          <div class="cta-section__card">
            <h2 style="margin-bottom: var(--space-3); position: relative; z-index: 1;">
              Ready to Navigate Your <span class="text-gradient">Life Journey</span>?
            </h2>
            <p class="text-secondary mb-8" style="position: relative; z-index: 1;">
              Join thousands of people who've taken control of their careers, health, 
              and finances with AI-powered guidance.
            </p>
            <button class="btn btn--primary btn--lg" onclick="Router.navigate('/identity')" style="position: relative; z-index: 1;">
              🧭 Start Free — It Takes 30 Seconds
            </button>
          </div>
        </section>

        <!-- Footer -->
        <footer class="landing-footer">
          <p class="landing-footer__text">
            © 2026 LifeGPS — Your Life Navigator. Built with ❤️ for lifelong growth.
          </p>
        </footer>
      </div>
    `;

    // Nav scroll effect
    const nav = document.getElementById('landingNav');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('landing-nav--scrolled');
      } else {
        nav.classList.remove('landing-nav--scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }
};
