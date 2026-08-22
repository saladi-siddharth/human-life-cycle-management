/* ═══════════════════════════════════════════════════════════════════
   ONBOARDING PAGES — Identity, Profile, Goals, Complete
   ═══════════════════════════════════════════════════════════════════ */

function IdentityPage() {
  const selected = Store.get('identity');
  return `
    <div class="onboarding-page">
      <div class="orb orb-indigo" style="top:-150px;right:-150px;"></div>
      <div class="orb orb-violet" style="bottom:-150px;left:-150px;"></div>

      <div class="steps" style="margin-bottom:40px;">
        <div class="step active"><div class="step-number">1</div><span class="step-label">Identity</span></div>
        <div class="step-connector"></div>
        <div class="step"><div class="step-number">2</div><span class="step-label">Profile</span></div>
        <div class="step-connector"></div>
        <div class="step"><div class="step-number">3</div><span class="step-label">Goals</span></div>
        <div class="step-connector"></div>
        <div class="step"><div class="step-number">4</div><span class="step-label">Complete</span></div>
      </div>

      <div class="onboarding-container">
        <div class="onboarding-question">
          <h1>Who are you <span class="text-gradient">today?</span></h1>
          <p>This single answer will shape your entire LifeGPS experience — personalized roadmaps, tools, and intelligence designed for your exact life stage.</p>
        </div>

        <div class="identity-cards">
          <div class="identity-card ${selected === 'student' ? 'selected' : ''}" onclick="selectIdentity('student')">
            <div class="id-icon">🎓</div>
            <h3>Student</h3>
            <p>School, college, university — exploring your path and building your future.</p>
            <div style="margin-top:12px;">
              <span class="badge badge-primary" style="font-size:10px;">Career Mapping</span>
              <span class="badge badge-info" style="font-size:10px;">Scholarships</span>
            </div>
          </div>
          <div class="identity-card ${selected === 'employee' ? 'selected' : ''}" onclick="selectIdentity('employee')">
            <div class="id-icon">💼</div>
            <h3>Employee</h3>
            <p>Working professional — growing your career, managing finances, and maintaining balance.</p>
            <div style="margin-top:12px;">
              <span class="badge badge-success" style="font-size:10px;">Growth Track</span>
              <span class="badge badge-warning" style="font-size:10px;">Salary Intel</span>
            </div>
          </div>
          <div class="identity-card ${selected === 'business' ? 'selected' : ''}" onclick="selectIdentity('business')">
            <div class="id-icon">🏢</div>
            <h3>Business Owner</h3>
            <p>Founder, entrepreneur, CEO — scaling your venture while maintaining personal balance.</p>
            <div style="margin-top:12px;">
              <span class="badge badge-warning" style="font-size:10px;">Scale Tools</span>
              <span class="badge badge-danger" style="font-size:10px;">Exit Strategy</span>
            </div>
          </div>
        </div>

        <div class="onboarding-nav" style="display:flex;align-items:center;justify-content:space-between;gap:16px;">
          <button class="btn btn-ghost" onclick="Store.logout(); Router.navigate('/');">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <div class="pill pill--cyan" data-state="idle" onclick="goToProfile()" id="identity-next-btn" style="min-width:180px; ${!selected ? 'opacity:0.5;pointer-events:none;' : ''}">
            <span class="pill__cta">
              <svg class="pill__coil"></svg>
              <span class="pill__plate">
                <span class="pill__label">Continue to Profile</span>
                <span class="pill__icon"><i class="fas fa-arrow-right"></i></span>
              </span>
              <span class="pill__status">
                <span class="pill__spinner"></span>
                <span class="pill__success-text"><i class="fas fa-check"></i> Saving...</span>
              </span>
              <button type="button" aria-label="Continue to Profile"></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectIdentity(type) {
  Store.set('identity', type);
  document.querySelectorAll('.identity-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  const btn = document.getElementById('identity-next-btn');
  if (btn) { btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; btn.disabled = false; }
}

function goToProfile() {
  if (!Store.get('identity')) {
    UI.toast('warning', 'Select Identity', 'Please select Student, Employee, or Business Owner.');
    return;
  }
  Router.navigate('/onboarding/profile');
}

function ProfilePage() {
  const identity = Store.get('identity');
  const profile = Store.get('profile');

  let identityFields = '';
  if (identity === 'student') {
    identityFields = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Education Level</label>
          <select class="form-select" id="ob-education" onchange="Store.set('profile.educationLevel', this.value)">
            <option value="">Select level...</option>
            <option ${profile.educationLevel==='high-school'?'selected':''} value="high-school">High School</option>
            <option ${profile.educationLevel==='undergraduate'?'selected':''} value="undergraduate">Undergraduate</option>
            <option ${profile.educationLevel==='postgraduate'?'selected':''} value="postgraduate">Postgraduate</option>
            <option ${profile.educationLevel==='phd'?'selected':''} value="phd">PhD / Doctorate</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Field of Study</label>
          <select class="form-select" id="ob-field" onchange="Store.set('profile.fieldOfStudy', this.value)">
            <option value="">Select field...</option>
            <option value="cs">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business / MBA</option>
            <option value="medicine">Medicine</option>
            <option value="arts">Arts & Design</option>
            <option value="science">Natural Sciences</option>
            <option value="law">Law</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">GPA / Academic Score</label>
        <input type="text" class="form-input" placeholder="e.g., 3.5 / 4.0 or 85%" value="${profile.gpa}" onchange="Store.set('profile.gpa', this.value)">
      </div>
    `;
  } else if (identity === 'employee') {
    identityFields = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Current Company</label>
          <input type="text" class="form-input" placeholder="e.g., Google" value="${profile.currentCompany}" onchange="Store.set('profile.currentCompany', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Current Role</label>
          <input type="text" class="form-input" placeholder="e.g., Software Engineer" value="${profile.currentRole}" onchange="Store.set('profile.currentRole', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Annual Salary (USD)</label>
          <input type="text" class="form-input" placeholder="e.g., 85000" value="${profile.salary}" onchange="Store.set('profile.salary', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Years of Experience</label>
          <input type="number" class="form-input" placeholder="e.g., 5" value="${profile.yearsExperience || ''}" onchange="Store.set('profile.yearsExperience', parseInt(this.value))">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Job Satisfaction: <strong id="sat-val">${profile.jobSatisfaction}%</strong></label>
        <input type="range" class="range-slider" min="0" max="100" value="${profile.jobSatisfaction}" oninput="Store.set('profile.jobSatisfaction', parseInt(this.value)); document.getElementById('sat-val').textContent=this.value+'%'">
        <div class="range-labels"><span>Very Unhappy</span><span>Very Happy</span></div>
      </div>
    `;
  } else {
    identityFields = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Business Name</label>
          <input type="text" class="form-input" placeholder="e.g., NexaTech Inc." value="${profile.businessName}" onchange="Store.set('profile.businessName', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Business Stage</label>
          <select class="form-select" onchange="Store.set('profile.businessStage', this.value)">
            <option value="">Select stage...</option>
            <option value="idea">Idea / Pre-launch</option>
            <option value="mvp">MVP / Early Stage</option>
            <option value="growth">Growth / Scaling</option>
            <option value="mature">Mature / Established</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Monthly Revenue (USD)</label>
          <input type="text" class="form-input" placeholder="e.g., 50000" value="${profile.revenue}" onchange="Store.set('profile.revenue', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Team Size</label>
          <input type="number" class="form-input" placeholder="e.g., 12" value="${profile.teamSize || ''}" onchange="Store.set('profile.teamSize', parseInt(this.value))">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Funding Status</label>
        <div class="option-grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr));">
          ${['Bootstrapped', 'Angel', 'Seed', 'Series A+', 'Revenue-Funded'].map(s => `
            <div class="option-item ${profile.fundingStatus === s.toLowerCase() ? 'selected' : ''}" onclick="selectFunding(this, '${s.toLowerCase()}')">${s}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="onboarding-page">
      <div class="steps" style="margin-bottom:40px;">
        <div class="step completed"><div class="step-number"><i class="fas fa-check" style="font-size:12px;"></i></div><span class="step-label">Identity</span></div>
        <div class="step-connector completed"></div>
        <div class="step active"><div class="step-number">2</div><span class="step-label">Profile</span></div>
        <div class="step-connector"></div>
        <div class="step"><div class="step-number">3</div><span class="step-label">Goals</span></div>
        <div class="step-connector"></div>
        <div class="step"><div class="step-number">4</div><span class="step-label">Complete</span></div>
      </div>

      <div class="onboarding-container">
        <div class="onboarding-question">
          <h1>Tell us about <span class="text-gradient">yourself</span></h1>
          <p>Help us personalize your experience. You can always update this later.</p>
        </div>

        <div class="card-glass" style="padding:28px;">
          <h4 style="margin-bottom:20px;display:flex;align-items:center;gap:8px;">
            ${identity === 'student' ? '🎓' : identity === 'employee' ? '💼' : '🏢'}
            ${identity === 'student' ? 'Student' : identity === 'employee' ? 'Employee' : 'Business Owner'} Profile
          </h4>
          ${identityFields}

          <div class="divider"></div>
          <h5 style="margin-bottom:16px;">Life Stage</h5>
          <div class="option-grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr));">
            ${[
              { icon: '🔍', label: 'Exploration', val: 'exploration' },
              { icon: '🏗️', label: 'Establishment', val: 'establishment' },
              { icon: '📈', label: 'Growth', val: 'growth' },
              { icon: '🏆', label: 'Maintenance', val: 'maintenance' },
            ].map(s => `
              <div class="option-item ${profile.lifeStage === s.val ? 'selected' : ''}" onclick="selectLifeStage(this, '${s.val}')">
                <span class="option-icon">${s.icon}</span>${s.label}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="onboarding-nav" style="display:flex;align-items:center;justify-content:space-between;gap:16px;">
          <button class="btn btn-ghost" onclick="Router.navigate('/onboarding/identity')">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <div class="pill pill--cyan" data-state="idle" onclick="Router.navigate('/onboarding/goals')" style="min-width:180px;">
            <span class="pill__cta">
              <svg class="pill__coil"></svg>
              <span class="pill__plate">
                <span class="pill__label">Continue to Goals</span>
                <span class="pill__icon"><i class="fas fa-arrow-right"></i></span>
              </span>
              <span class="pill__status">
                <span class="pill__spinner"></span>
                <span class="pill__success-text"><i class="fas fa-check"></i> Next</span>
              </span>
              <button type="button" aria-label="Continue to Goals"></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectFunding(el, value) {
  Store.set('profile.fundingStatus', value);
  el.parentElement.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
}

function selectLifeStage(el, value) {
  Store.set('profile.lifeStage', value);
  el.parentElement.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
}

function GoalsPage() {
  const profile = Store.get('profile');
  return `
    <div class="onboarding-page">
      <div class="steps" style="margin-bottom:40px;">
        <div class="step completed"><div class="step-number"><i class="fas fa-check" style="font-size:12px;"></i></div><span class="step-label">Identity</span></div>
        <div class="step-connector completed"></div>
        <div class="step completed"><div class="step-number"><i class="fas fa-check" style="font-size:12px;"></i></div><span class="step-label">Profile</span></div>
        <div class="step-connector completed"></div>
        <div class="step active"><div class="step-number">3</div><span class="step-label">Goals</span></div>
        <div class="step-connector"></div>
        <div class="step"><div class="step-number">4</div><span class="step-label">Complete</span></div>
      </div>

      <div class="onboarding-container">
        <div class="onboarding-question">
          <h1>Your <span class="text-gradient-accent">Vision</span> & Goals</h1>
          <p>What does your ideal future look like? We'll build your personalized roadmap based on these answers.</p>
        </div>

        <div class="card-glass" style="padding:28px;">
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">Goal Intensity</label>
            <div class="option-grid" style="grid-template-columns:repeat(3,1fr);">
              ${[
                { icon: '🚀', label: 'Aggressive Growth', val: 'aggressive' },
                { icon: '⚖️', label: 'Balanced Life', val: 'balanced' },
                { icon: '🛡️', label: 'Conservative', val: 'conservative' },
              ].map(g => `
                <div class="option-item ${profile.goalIntensity === g.val ? 'selected' : ''}" onclick="selectGoalIntensity(this, '${g.val}')">
                  <span class="option-icon">${g.icon}</span>${g.label}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">Risk Tolerance: <strong id="risk-val">${profile.riskTolerance}%</strong></label>
            <input type="range" class="range-slider" min="0" max="100" value="${profile.riskTolerance}" oninput="Store.set('profile.riskTolerance', parseInt(this.value)); document.getElementById('risk-val').textContent=this.value+'%'">
            <div class="range-labels"><span>Very Conservative</span><span>Very Aggressive</span></div>
          </div>

          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">Weekly Hours for Self-Improvement: <strong id="hours-val">${profile.weeklyHours}h</strong></label>
            <input type="range" class="range-slider" min="1" max="40" value="${profile.weeklyHours}" oninput="Store.set('profile.weeklyHours', parseInt(this.value)); document.getElementById('hours-val').textContent=this.value+'h'">
            <div class="range-labels"><span>1 hour</span><span>40 hours</span></div>
          </div>

          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">What's your #1 pain point right now?</label>
            <select class="form-select" onchange="Store.set('profile.painPoint', this.value)">
              <option value="">Select...</option>
              <option value="career-stuck">Career feels stuck</option>
              <option value="financial-stress">Financial stress</option>
              <option value="health-neglected">Health is being neglected</option>
              <option value="work-life-balance">Poor work-life balance</option>
              <option value="no-direction">Lack of direction/purpose</option>
              <option value="burnout">Burnout & exhaustion</option>
              <option value="relationships">Relationship challenges</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Where do you want to be in 5 years?</label>
            <textarea class="form-textarea" placeholder="Describe your dream life in 5 years... Be specific about career, financial, health, and personal goals." style="min-height:80px;" onchange="Store.set('profile.dreamVision', this.value)">${profile.dreamVision}</textarea>
          </div>
        </div>

        <div class="onboarding-nav" style="display:flex;align-items:center;justify-content:space-between;gap:16px;">
          <button class="btn btn-ghost" onclick="Router.navigate('/onboarding/profile')">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <div class="pill pill--emerald" data-state="idle" onclick="completeOnboarding()" style="min-width:240px;">
            <span class="pill__cta">
              <svg class="pill__coil"></svg>
              <span class="pill__plate">
                <span class="pill__label">Complete Setup & Launch GPS</span>
                <span class="pill__icon"><i class="fas fa-check"></i></span>
              </span>
              <span class="pill__status">
                <span class="pill__spinner"></span>
                <span class="pill__success-text"><i class="fas fa-check"></i> Launching...</span>
              </span>
              <button type="submit" aria-label="Complete Setup & Launch GPS"></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectGoalIntensity(el, value) {
  Store.set('profile.goalIntensity', value);
  el.parentElement.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
}

function completeOnboarding() {
  Store.completeOnboarding();
  Router.navigate('/onboarding/complete');
}

function OnboardingCompletePage() {
  const name = Store.get('profile.name') || 'there';
  const identity = Store.get('identity');
  return `
    <div class="onboarding-page" style="justify-content:center;">
      <div class="orb orb-indigo" style="top:-100px;left:50%;transform:translateX(-50%);opacity:0.2;"></div>
      <div class="onboarding-container" style="text-align:center;">
        <div class="steps" style="margin-bottom:40px;">
          <div class="step completed"><div class="step-number"><i class="fas fa-check" style="font-size:12px;"></i></div><span class="step-label">Identity</span></div>
          <div class="step-connector completed"></div>
          <div class="step completed"><div class="step-number"><i class="fas fa-check" style="font-size:12px;"></i></div><span class="step-label">Profile</span></div>
          <div class="step-connector completed"></div>
          <div class="step completed"><div class="step-number"><i class="fas fa-check" style="font-size:12px;"></i></div><span class="step-label">Goals</span></div>
          <div class="step-connector completed"></div>
          <div class="step completed"><div class="step-number"><i class="fas fa-check" style="font-size:12px;"></i></div><span class="step-label">Complete</span></div>
        </div>

        <div style="font-size:72px;margin-bottom:24px;animation:float 3s ease-in-out infinite;">🎉</div>
        <h1 style="margin-bottom:12px;">Welcome aboard, <span class="text-gradient">${name}!</span></h1>
        <p style="font-size:18px;max-width:500px;margin:0 auto 32px;">
          Your personalized Life GPS is ready. We've created your ${identity === 'student' ? 'Student' : identity === 'employee' ? 'Employee' : 'Business Owner'} roadmap across Career, Health, Finance, Work & Life Success.
        </p>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;max-width:600px;margin:0 auto 32px;">
          ${[
            { icon: '🚀', label: 'Career', color: '#6366f1' },
            { icon: '💪', label: 'Health', color: '#10b981' },
            { icon: '💰', label: 'Finance', color: '#f59e0b' },
            { icon: '⚡', label: 'Work', color: '#06b6d4' },
            { icon: '🌟', label: 'Life', color: '#ec4899' },
          ].map(d => `
            <div class="card" style="text-align:center;border-color:${d.color}33;">
              <div style="font-size:28px;margin-bottom:8px;">${d.icon}</div>
              <div style="font-size:13px;font-weight:600;color:${d.color};">${d.label}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Ready</div>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;justify-content:center;">
          <div class="pill pill--cyan" data-state="idle" onclick="Router.navigate('/dashboard')" style="min-width:260px;">
            <span class="pill__cta">
              <svg class="pill__coil"></svg>
              <span class="pill__plate">
                <span class="pill__label">Go to My Dashboard</span>
                <span class="pill__icon"><i class="fas fa-th-large"></i></span>
              </span>
              <span class="pill__status">
                <span class="pill__spinner"></span>
                <span class="pill__success-text"><i class="fas fa-check"></i> Launching...</span>
              </span>
              <button type="button" aria-label="Go to My Dashboard"></button>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}
