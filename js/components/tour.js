/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE COMPREHENSIVE MULTI-PILLAR GUIDED DEMO TOUR
   Interactive spotlight, live page transitions & animations for first-time users
   ═══════════════════════════════════════════════════════════════════ */

const TourEngine = {
  currentStep: 0,
  steps: [
    {
      route: '/dashboard',
      targetId: 'life-score-card',
      title: '🧭 Master Overview & Life Score Index',
      description: 'Welcome to BioVerse! Your Master Life Score (0–100) is dynamically computed across Career, Health, Finance, Work, and Life Success. Track your overall life trajectory in one unified command center.',
      icon: 'fas fa-compass',
      color: '#00f2fe',
      pageName: 'Dashboard Overview'
    },
    {
      route: '/dashboard/career',
      targetId: 'ats-section',
      title: '🚀 Career: AI ATS Resume & Job Pipeline',
      description: 'Upload your resume for real-time ATS scoring, mistake detection, and actionable modifications. Track your active job pipeline with automatic email updates and audit your real skill gaps.',
      icon: 'fas fa-briefcase',
      color: '#6366f1',
      pageName: 'Career Matrix'
    },
    {
      route: '/dashboard/health',
      targetId: 'health-hydration-section',
      title: '💪 Health: Vitality, Hydration & 7-Day Diet',
      description: 'Log your daily hydration with email notifications, analyze meal nutrients (protein, carbs, fiber, fats) in real time, and generate a customized 7-day Indian healthy diet plan.',
      icon: 'fas fa-heartbeat',
      color: '#10b981',
      pageName: 'Health Protocol'
    },
    {
      route: '/dashboard/finance',
      targetId: 'finance-metrics-section',
      title: '💰 Finance: Real-Time Ledger & Micro-SIP',
      description: 'Monitor your monthly income, savings rate, emergency runway, and double-entry transaction ledger with instant email confirmations and wealth-building compounding motivation.',
      icon: 'fas fa-wallet',
      color: '#fbbf24',
      pageName: 'Finance Ledger'
    },
    {
      route: '/dashboard/work',
      targetId: 'work-todo-section',
      title: '⚡ Work: Eisenhower Matrix & Time-Based To-Do',
      description: 'Organize high-impact priorities with Eisenhower quadrants, schedule to-do tasks with exact due times, and receive pending task email reminders so nothing slips through.',
      icon: 'fas fa-tasks',
      color: '#ec4899',
      pageName: 'Work Execution'
    },
    {
      route: '/dashboard/life',
      targetId: 'life-radar-section',
      title: '🌟 Life Success: 5-Pillar Balance & Goals',
      description: 'Balance your life wheel across Growth, Relationships, Purpose, Adventure, and Legacy. Set milestone goals and receive daily inspirational life tips to achieve your dreams.',
      icon: 'fas fa-star',
      color: '#a855f7',
      pageName: 'Life Goals'
    }
  ],

  start(force = false) {
    if (!force && typeof Store !== 'undefined') {
      // Run ONLY if new user or tour not completed yet
      if (Store.hasSeenTour()) return;
    }

    this.currentStep = 0;
    this._renderTourOverlay();
    this._showStep(0);
  },

  _renderTourOverlay() {
    let overlay = document.getElementById('bioverse-tour-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'bioverse-tour-overlay';
      overlay.className = 'bioverse-tour-backdrop';
      overlay.innerHTML = `
        <div class="bioverse-tour-spotlight" id="tour-spotlight"></div>
        <div class="bioverse-tour-card liquid-glass-v2" id="tour-card">
          <div class="tour-header">
            <div class="tour-badge" id="tour-step-badge">Step 1 of 6</div>
            <div style="font-size:12px; color:#94a3b8;" id="tour-page-indicator">Dashboard Overview</div>
            <button class="tour-close-btn" onclick="TourEngine.skip()" title="Skip Tour">&times;</button>
          </div>
          <div class="tour-content">
            <div class="tour-icon-wrap" id="tour-icon-wrap">
              <i class="fas fa-compass" id="tour-icon"></i>
            </div>
            <h3 class="tour-title" id="tour-title">Welcome to BioVerse!</h3>
            <p class="tour-desc" id="tour-desc">Let us give you a quick walkthrough of your life management suite.</p>
          </div>
          <div class="tour-footer">
            <div class="tour-dots" id="tour-dots"></div>
            <div class="tour-actions">
              <button class="btn btn-ghost btn-sm" id="tour-btn-prev" onclick="TourEngine.prev()">Back</button>
              <button class="btn btn-primary btn-sm" id="tour-btn-next" onclick="TourEngine.next()">Next Pillar →</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
  },

  _showStep(index) {
    const step = this.steps[index];
    if (!step) return;

    this.currentStep = index;

    // Navigate to page if needed
    if (typeof Router !== 'undefined' && step.route && Router.currentRoute !== step.route) {
      Router.navigate(step.route, false);
    }

    const badge = document.getElementById('tour-step-badge');
    const pageIndicator = document.getElementById('tour-page-indicator');
    const title = document.getElementById('tour-title');
    const desc = document.getElementById('tour-desc');
    const icon = document.getElementById('tour-icon');
    const iconWrap = document.getElementById('tour-icon-wrap');
    const prevBtn = document.getElementById('tour-btn-prev');
    const nextBtn = document.getElementById('tour-btn-next');
    const dotsContainer = document.getElementById('tour-dots');

    if (badge) badge.textContent = `Step ${index + 1} of ${this.steps.length}`;
    if (pageIndicator) pageIndicator.textContent = step.pageName || 'BioVerse';
    if (title) title.textContent = step.title;
    if (desc) desc.textContent = step.description;
    if (icon) icon.className = step.icon;
    if (iconWrap) {
      iconWrap.style.background = `${step.color}22`;
      iconWrap.style.color = step.color;
      iconWrap.style.borderColor = `${step.color}66`;
    }

    if (prevBtn) {
      prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    }

    if (nextBtn) {
      if (index === this.steps.length - 1) {
        nextBtn.innerHTML = '<i class="fas fa-check"></i> Complete & Start Exploring';
        nextBtn.className = 'btn btn-success btn-sm';
      } else {
        nextBtn.innerHTML = 'Next Pillar <i class="fas fa-arrow-right"></i>';
        nextBtn.className = 'btn btn-primary btn-sm';
      }
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = this.steps.map((_, i) => `
        <span class="tour-dot ${i === index ? 'active' : ''}" onclick="TourEngine._showStep(${i})"></span>
      `).join('');
    }

    // Position spotlight over target if element exists
    setTimeout(() => {
      const spotlight = document.getElementById('tour-spotlight');
      const target = step.targetId ? document.getElementById(step.targetId) : null;
      if (target && spotlight) {
        const rect = target.getBoundingClientRect();
        spotlight.style.opacity = '1';
        spotlight.style.top = `${Math.max(10, rect.top - 8)}px`;
        spotlight.style.left = `${Math.max(10, rect.left - 8)}px`;
        spotlight.style.width = `${rect.width + 16}px`;
        spotlight.style.height = `${rect.height + 16}px`;
      } else if (spotlight) {
        spotlight.style.opacity = '0';
      }
    }, 200);
  },

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this._showStep(this.currentStep + 1);
    } else {
      this.finish();
    }
  },

  prev() {
    if (this.currentStep > 0) {
      this._showStep(this.currentStep - 1);
    }
  },

  skip() {
    this._close();
    if (typeof Store !== 'undefined') {
      Store.markTourCompleted();
    }
    if (typeof Router !== 'undefined') {
      Router.navigate('/dashboard');
    }
  },

  finish() {
    this._close();
    if (typeof Store !== 'undefined') {
      Store.markTourCompleted();
    }
    if (typeof Router !== 'undefined') {
      Router.navigate('/dashboard');
    }
    if (typeof UI !== 'undefined') {
      UI.toast('success', '🎉 Tour Completed!', 'Your personalized BioVerse platform is fully synchronized.');
    }
  },

  _close() {
    const overlay = document.getElementById('bioverse-tour-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        overlay.style.display = 'none';
        overlay.style.opacity = '1';
      }, 300);
    }
  }
};

window.TourEngine = TourEngine;
