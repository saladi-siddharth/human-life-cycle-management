/* ============================================================
   ONBOARDING PAGE — Progressive Multi-Step Wizard
   ============================================================ */

const OnboardingPage = {
  steps: [],
  currentStep: 0,

  getSteps() {
    const type = Store.identityType || 'student';
    const shared = [
      {
        id: 'name',
        emoji: '👋',
        title: "What's your name?",
        subtitle: 'So we can personalize your experience',
        type: 'input',
        field: 'profile.name',
        placeholder: 'Enter your full name',
        inputType: 'text'
      },
      {
        id: 'lifeStage',
        emoji: '🌱',
        title: 'What life stage are you in?',
        subtitle: 'This helps us calibrate your guidance',
        type: 'options',
        field: 'profile.lifeStage',
        options: [
          { value: 'exploration', emoji: '🔍', label: 'Exploration', hint: 'Discovering my path' },
          { value: 'establishment', emoji: '🏗️', label: 'Establishment', hint: 'Building my foundation' },
          { value: 'advancement', emoji: '📈', label: 'Advancement', hint: 'Growing & scaling up' },
          { value: 'maintenance', emoji: '⚖️', label: 'Maintenance', hint: 'Optimizing what I have' }
        ],
        cols: 2
      },
      {
        id: 'goalIntensity',
        emoji: '🎯',
        title: 'What\'s your growth style?',
        subtitle: 'How aggressively do you want to pursue goals?',
        type: 'options',
        field: 'profile.goalIntensity',
        options: [
          { value: 'aggressive', emoji: '🔥', label: 'Aggressive Growth', hint: 'Push hard, move fast' },
          { value: 'balanced', emoji: '⚖️', label: 'Balanced Life', hint: 'Steady, sustainable progress' },
          { value: 'conservative', emoji: '🛡️', label: 'Conservative', hint: 'Stable & risk-averse' }
        ],
        cols: 3
      },
      {
        id: 'riskTolerance',
        emoji: '📊',
        title: 'How much risk are you comfortable with?',
        subtitle: 'This shapes our financial and career advice',
        type: 'slider',
        field: 'profile.riskTolerance',
        min: 0,
        max: 100,
        labels: ['Very Conservative', 'Moderate', 'Very Aggressive']
      },
      {
        id: 'timeAvailable',
        emoji: '⏰',
        title: 'Hours per week for self-improvement?',
        subtitle: 'We\'ll build plans that fit your available time',
        type: 'slider',
        field: 'profile.timeAvailable',
        min: 1,
        max: 40,
        unit: 'hrs/week',
        labels: ['Minimal', 'Moderate', 'Dedicated']
      },
      {
        id: 'painPoint',
        emoji: '🎯',
        title: 'What\'s your #1 challenge right now?',
        subtitle: 'We\'ll prioritize solutions for this',
        type: 'options',
        field: 'profile.painPoint',
        options: [
          { value: 'career', emoji: '🎯', label: 'Career Direction', hint: 'Unclear about next steps' },
          { value: 'finance', emoji: '💰', label: 'Financial Stress', hint: 'Not enough or poorly managed' },
          { value: 'health', emoji: '❤️', label: 'Health & Energy', hint: 'Feeling drained or unhealthy' },
          { value: 'productivity', emoji: '⚡', label: 'Productivity', hint: 'Can\'t get enough done' },
          { value: 'balance', emoji: '⚖️', label: 'Work-Life Balance', hint: 'Everything feels overwhelming' },
          { value: 'purpose', emoji: '🌟', label: 'Purpose & Meaning', hint: 'Feeling lost or unmotivated' }
        ],
        cols: 2
      }
    ];

    const branchSteps = {
      student: [
        {
          id: 'educationLevel',
          emoji: '🎓',
          title: 'What\'s your education level?',
          subtitle: 'Current or most recent',
          type: 'options',
          field: 'student.educationLevel',
          options: [
            { value: 'highschool', emoji: '🏫', label: 'High School', hint: 'Grades 9-12' },
            { value: 'undergraduate', emoji: '🎓', label: 'Undergraduate', hint: 'Bachelor\'s degree' },
            { value: 'postgraduate', emoji: '📚', label: 'Postgraduate', hint: 'Master\'s degree' },
            { value: 'phd', emoji: '🔬', label: 'PhD/Doctoral', hint: 'Research degree' }
          ],
          cols: 2
        },
        {
          id: 'fieldOfStudy',
          emoji: '📖',
          title: 'What are you studying?',
          subtitle: 'Your field of study or interest',
          type: 'input',
          field: 'student.fieldOfStudy',
          placeholder: 'e.g., Computer Science, Business, Medicine',
          inputType: 'text'
        },
        {
          id: 'careerAspiration',
          emoji: '🌟',
          title: 'What\'s your dream career?',
          subtitle: 'Don\'t hold back — dream big!',
          type: 'input',
          field: 'student.careerAspiration',
          placeholder: 'e.g., Software Engineer at Google, Startup Founder',
          inputType: 'text'
        }
      ],
      employee: [
        {
          id: 'role',
          emoji: '💼',
          title: 'What\'s your current role?',
          subtitle: 'Your job title and company',
          type: 'input',
          field: 'employee.role',
          placeholder: 'e.g., Senior Software Engineer at Microsoft',
          inputType: 'text'
        },
        {
          id: 'satisfaction',
          emoji: '😊',
          title: 'How satisfied are you at work?',
          subtitle: 'Be honest — this helps us help you',
          type: 'slider',
          field: 'employee.satisfaction',
          min: 0,
          max: 100,
          labels: ['Very Unsatisfied', 'Neutral', 'Love It']
        },
        {
          id: 'burnoutRisk',
          emoji: '🔥',
          title: 'How burned out do you feel?',
          subtitle: 'We\'ll build recovery into your plan',
          type: 'slider',
          field: 'employee.burnoutRisk',
          min: 0,
          max: 100,
          labels: ['Fresh & Energized', 'Moderate', 'Completely Burned Out']
        }
      ],
      business: [
        {
          id: 'businessName',
          emoji: '🏢',
          title: 'What\'s your business?',
          subtitle: 'Company name and what you do',
          type: 'input',
          field: 'business.businessName',
          placeholder: 'e.g., TechCo — B2B SaaS for healthcare',
          inputType: 'text'
        },
        {
          id: 'stage',
          emoji: '📈',
          title: 'What stage is your business?',
          subtitle: 'This determines which playbooks we show you',
          type: 'options',
          field: 'business.stage',
          options: [
            { value: 'idea', emoji: '💡', label: 'Idea Stage', hint: 'Still validating' },
            { value: 'mvp', emoji: '🔨', label: 'MVP/Early', hint: 'Building first version' },
            { value: 'growth', emoji: '📈', label: 'Growth', hint: 'Revenue growing' },
            { value: 'scale', emoji: '🚀', label: 'Scaling', hint: '100+ customers' }
          ],
          cols: 2
        },
        {
          id: 'fundingStatus',
          emoji: '💰',
          title: 'How are you funded?',
          subtitle: 'Impacts our financial recommendations',
          type: 'options',
          field: 'business.fundingStatus',
          options: [
            { value: 'bootstrapped', emoji: '🏋️', label: 'Bootstrapped', hint: 'Self-funded' },
            { value: 'angel', emoji: '👼', label: 'Angel/Seed', hint: 'Early investors' },
            { value: 'vc', emoji: '🏦', label: 'VC Funded', hint: 'Institutional investors' },
            { value: 'revenue', emoji: '💵', label: 'Revenue-Funded', hint: 'Profitable' }
          ],
          cols: 2
        }
      ]
    };

    return [...shared, ...branchSteps[type]];
  },

  render(container) {
    this.steps = this.getSteps();
    this.currentStep = Store.get('onboardingStep') || 0;
    if (this.currentStep >= this.steps.length) this.currentStep = 0;
    this._renderStep(container);
  },

  _renderStep(container) {
    const step = this.steps[this.currentStep];
    const progress = ((this.currentStep + 1) / this.steps.length) * 100;
    const isLast = this.currentStep === this.steps.length - 1;

    // Step dots
    let dots = '';
    this.steps.forEach((_, i) => {
      if (i > 0) {
        dots += `<div class="onboarding__step-line ${i <= this.currentStep ? 'onboarding__step-line--completed' : ''}"></div>`;
      }
      let cls = 'onboarding__step-dot';
      if (i < this.currentStep) cls += ' onboarding__step-dot--completed';
      if (i === this.currentStep) cls += ' onboarding__step-dot--active';
      dots += `<div class="${cls}"></div>`;
    });

    // Content based on type
    let content = '';
    const currentValue = Store.get(step.field);

    if (step.type === 'input') {
      content = `
        <div class="form-group">
          <input class="form-input" type="${step.inputType || 'text'}" id="onboardInput" 
            placeholder="${step.placeholder}" value="${currentValue || ''}"
            style="font-size: var(--text-lg); padding: var(--space-4) var(--space-5); text-align: center;"
            onkeydown="if(event.key==='Enter')OnboardingPage.next()">
        </div>
      `;
    } else if (step.type === 'options') {
      const colClass = step.cols === 3 ? 'option-cards--3-col' : 'option-cards--2-col';
      content = `<div class="option-cards ${colClass}">`;
      step.options.forEach(opt => {
        const selected = currentValue === opt.value ? 'option-card--selected' : '';
        content += `
          <div class="option-card ${selected}" onclick="OnboardingPage.selectOption('${step.field}', '${opt.value}', this)">
            <span class="option-card__emoji">${opt.emoji}</span>
            <div class="option-card__label">${opt.label}</div>
            <div class="option-card__hint">${opt.hint}</div>
          </div>
        `;
      });
      content += '</div>';
    } else if (step.type === 'slider') {
      const val = currentValue || Math.round((step.min + step.max) / 2);
      const unit = step.unit || '%';
      content = `
        <div class="slider-group">
          <div class="slider-label">
            <span class="slider-label__text">${step.labels[0]}</span>
            <span class="slider-label__value" id="sliderValue">${val}${unit === '%' ? '%' : ' ' + unit}</span>
            <span class="slider-label__text">${step.labels[2]}</span>
          </div>
          <input type="range" class="slider-input" id="onboardSlider" 
            min="${step.min}" max="${step.max}" value="${val}"
            oninput="OnboardingPage.updateSlider('${step.field}', this.value, '${unit}')">
        </div>
      `;
    }

    container.innerHTML = `
      <div class="onboarding">
        <div class="onboarding__bg-orb onboarding__bg-orb--1"></div>
        <div class="onboarding__bg-orb onboarding__bg-orb--2"></div>

        <div class="onboarding__progress">
          <div class="onboarding__progress-bar" style="width: ${progress}%"></div>
        </div>

        <div class="onboarding__steps">${dots}</div>

        <div class="onboarding__card">
          <span class="onboarding__emoji">${step.emoji}</span>
          <h2 class="onboarding__title">${step.title}</h2>
          <p class="onboarding__subtitle">${step.subtitle}</p>
          
          ${content}

          <div class="onboarding__nav">
            ${this.currentStep > 0 
              ? '<button class="btn btn--ghost" onclick="OnboardingPage.prev()">← Back</button>'
              : '<button class="btn btn--ghost" onclick="Router.navigate(\'/identity\')">← Change Identity</button>'
            }
            <button class="btn btn--primary" onclick="OnboardingPage.next()" id="nextBtn">
              ${isLast ? '🚀 Launch My Dashboard' : 'Continue →'}
            </button>
          </div>
        </div>

        <div class="onboarding__skip" onclick="OnboardingPage.skip()">
          Skip onboarding →
        </div>
      </div>
    `;

    // Focus input if present
    const input = document.getElementById('onboardInput');
    if (input) setTimeout(() => input.focus(), 300);
  },

  selectOption(field, value, element) {
    document.querySelectorAll('.option-card').forEach(card => {
      card.classList.remove('option-card--selected');
    });
    element.classList.add('option-card--selected');
    Store.set(field, value);
  },

  updateSlider(field, value, unit) {
    Store.set(field, parseInt(value));
    const el = document.getElementById('sliderValue');
    if (el) el.textContent = value + (unit === '%' ? '%' : ' ' + unit);
  },

  next() {
    // Save input value if present
    const input = document.getElementById('onboardInput');
    if (input && this.steps[this.currentStep]) {
      Store.set(this.steps[this.currentStep].field, input.value);
    }

    // Save slider value if present
    const slider = document.getElementById('onboardSlider');
    if (slider && this.steps[this.currentStep]) {
      Store.set(this.steps[this.currentStep].field, parseInt(slider.value));
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      Store.set('onboardingStep', this.currentStep);
      this._renderStep(document.getElementById('app'));
    } else {
      this.complete();
    }
  },

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      Store.set('onboardingStep', this.currentStep);
      this._renderStep(document.getElementById('app'));
    }
  },

  skip() {
    // Set default name if empty
    if (!Store.get('profile.name')) {
      Store.set('profile.name', 'Explorer');
    }
    this.complete();
  },

  complete() {
    // Generate identity-based metrics
    Store.generateMetrics();
    Store.set('onboardingComplete', true);
    
    // Show completion briefly then go to dashboard
    const container = document.getElementById('app');
    const name = Store.userName || 'Explorer';
    const type = Store.identityType || 'student';
    const typeEmoji = { student: '🎓', employee: '💼', business: '🚀' }[type];

    container.innerHTML = `
      <div class="onboarding">
        <div class="onboarding__bg-orb onboarding__bg-orb--1"></div>
        <div class="onboarding__bg-orb onboarding__bg-orb--2"></div>
        <div class="onboarding__card onboarding-complete">
          <div class="onboarding-complete__checkmark">✓</div>
          <h2 class="onboarding__title">Welcome, ${name}! ${typeEmoji}</h2>
          <p class="onboarding__subtitle">Your personalized Life GPS is ready. Let's make every day count.</p>
          
          <div class="onboarding-complete__stats">
            <div class="onboarding-complete__stat">
              <div class="onboarding-complete__stat-value text-gradient">${Store.getMetric('overallScore')}</div>
              <div class="onboarding-complete__stat-label">Life Score</div>
            </div>
            <div class="onboarding-complete__stat">
              <div class="onboarding-complete__stat-value text-gradient">5</div>
              <div class="onboarding-complete__stat-label">Domains Active</div>
            </div>
            <div class="onboarding-complete__stat">
              <div class="onboarding-complete__stat-value text-gradient">∞</div>
              <div class="onboarding-complete__stat-label">Potential</div>
            </div>
          </div>

          <button class="btn btn--primary btn--lg btn--full" onclick="Router.navigate('/dashboard')">
            🧭 Open My Dashboard
          </button>
        </div>
      </div>
    `;
  }
};
