/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE ONBOARDING ENGINE — 4-STEP LIFE GPS SYNTHESIS
   1. Track & Identity Selection (Student / Employee / Business Owner)
   2. Customized Profile Deep-Dive & Domain Intel
   3. Goals, Risk Tolerance, Pain Points & 5-Year Vision
   4. AI Life GPS Engine Calibration & Command Center Launch
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Reusable Glassmorphic Stepper Component
 */
function renderOnboardingStepper(currentStep) {
  const steps = [
    { num: 1, label: 'Identity', icon: 'fa-compass' },
    { num: 2, label: 'Profile', icon: 'fa-user' },
    { num: 3, label: 'Goals', icon: 'fa-bullseye' },
    { num: 4, label: 'Launch', icon: 'fa-rocket' }
  ];

  return `
    <div class="onboarding-stepper">
      ${steps.map((s, idx) => {
        const isCompleted = s.num < currentStep;
        const isActive = s.num === currentStep;
        const statusClass = isCompleted ? 'completed' : isActive ? 'active' : '';
        return `
          <div class="step-item ${statusClass}" onclick="handleStepClick(${s.num}, ${currentStep})">
            <div class="step-badge">
              ${isCompleted ? '<i class="fas fa-check" style="font-size:11px;"></i>' : s.num}
            </div>
            <span class="step-title">${s.label}</span>
          </div>
          ${idx < steps.length - 1 ? `<div class="step-line ${isCompleted ? 'completed' : ''}"></div>` : ''}
        `;
      }).join('')}
    </div>
  `;
}

function handleStepClick(targetStep, currentStep) {
  if (targetStep < currentStep) {
    if (targetStep === 1) Router.navigate('/onboarding/identity');
    else if (targetStep === 2) Router.navigate('/onboarding/profile');
    else if (targetStep === 3) Router.navigate('/onboarding/goals');
  }
}
window.handleStepClick = handleStepClick;

/* ═══════════════════════════════════════════════════════════════════
   STEP 1: IDENTITY & TRACK SELECTION
   ═══════════════════════════════════════════════════════════════════ */
function IdentityPage() {
  const selected = Store.get('identity') || 'student';
  const userName = Store.get('profile.name') || 'Explorer';

  return `
    <div class="onboarding-page">
      <div class="orb orb-indigo" style="top:-120px;right:-120px;opacity:0.25;"></div>
      <div class="orb orb-violet" style="bottom:-120px;left:-120px;opacity:0.25;"></div>

      ${renderOnboardingStepper(1)}

      <div class="onboarding-container">
        <div class="onboarding-question">
          <h1>Welcome, <span class="text-gradient">${userName}!</span></h1>
          <p>Choose your primary life stage track to customize your roadmaps, AI coach intelligence, and decision engines.</p>
        </div>

        <div class="identity-cards">
          <!-- 1. STUDENT CARD -->
          <div class="identity-card ${selected === 'student' ? 'selected' : ''}" onclick="selectIdentity('student', this)" id="id-card-student">
            <div>
              <div class="id-icon">🎓</div>
              <h3>Student & Aspirant</h3>
              <p>College admissions, CGPA targets, entrance exams (JEE, NEET, GATE, CAT) & top company placement sprints.</p>
            </div>
            <div class="id-tags">
              <span class="id-tag"><i class="fas fa-university"></i> NIRF Colleges</span>
              <span class="id-tag"><i class="fas fa-award"></i> Scholarships</span>
              <span class="id-tag"><i class="fas fa-briefcase"></i> Internships</span>
            </div>
          </div>

          <!-- 2. EMPLOYEE CARD -->
          <div class="identity-card ${selected === 'employee' ? 'selected' : ''}" onclick="selectIdentity('employee', this)" id="id-card-employee">
            <div>
              <div class="id-icon">💼</div>
              <h3>Working Professional</h3>
              <p>Salary optimization, CTC benchmarking, 80C/80D tax shields, deep work sprints & career mobility.</p>
            </div>
            <div class="id-tags">
              <span class="id-tag"><i class="fas fa-chart-line"></i> CTC Benchmarks</span>
              <span class="id-tag"><i class="fas fa-shield-alt"></i> Tax Shield</span>
              <span class="id-tag"><i class="fas fa-coins"></i> SIP Compounding</span>
            </div>
          </div>

          <!-- 3. BUSINESS OWNER CARD -->
          <div class="identity-card ${selected === 'business' ? 'selected' : ''}" onclick="selectIdentity('business', this)" id="id-card-business">
            <div>
              <div class="id-icon">🏢</div>
              <h3>Founder & Business Owner</h3>
              <p>Startup scaling, unit economics, Startup India DPIIT recognition, cap table management & team leadership.</p>
            </div>
            <div class="id-tags">
              <span class="id-tag"><i class="fas fa-rocket"></i> Startup India</span>
              <span class="id-tag"><i class="fas fa-file-invoice-dollar"></i> Runway & ARR</span>
              <span class="id-tag"><i class="fas fa-users"></i> Team OKRs</span>
            </div>
          </div>
        </div>

        <div class="onboarding-nav">
          <button class="btn btn-ghost" onclick="Store.logout(); Router.navigate('/');" style="display:inline-flex; align-items:center; gap:8px;">
            <i class="fas fa-arrow-left"></i> Sign Out
          </button>
          <button class="btn btn-primary" id="identity-next-btn" onclick="goToProfile()" style="padding:12px 28px; font-size:14px; font-weight:700; border-radius:999px; display:inline-flex; align-items:center; gap:10px; background:linear-gradient(135deg, #00f2fe 0%, #4f46e5 100%); border:none; box-shadow:0 4px 20px rgba(0,242,254,0.35); cursor:pointer;">
            <span>Continue to Profile</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function selectIdentity(type, cardEl) {
  Store.set('identity', type);
  document.querySelectorAll('.identity-card').forEach(c => c.classList.remove('selected'));
  if (cardEl) {
    cardEl.classList.add('selected');
  } else {
    document.getElementById(`id-card-${type}`)?.classList.add('selected');
  }
  const btn = document.getElementById('identity-next-btn');
  if (btn) {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
  }
}
window.selectIdentity = selectIdentity;

function goToProfile() {
  if (!Store.get('identity')) {
    Store.set('identity', 'student');
  }
  Router.navigate('/onboarding/profile');
}
window.goToProfile = goToProfile;

/* ═══════════════════════════════════════════════════════════════════
   STEP 2: TAILORED PROFILE SETUP
   ═══════════════════════════════════════════════════════════════════ */
function ProfilePage() {
  const identity = Store.get('identity') || 'student';
  const profile = Store.get('profile') || {};

  let trackHeader = '';
  let identityFields = '';

  if (identity === 'student') {
    trackHeader = '🎓 Student Academic & Career Profile';
    identityFields = `
      <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Current Education Level</label>
          <select class="form-select" id="ob-education" onchange="Store.set('profile.educationLevel', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
            <option value="Undergraduate B.Tech" ${profile.educationLevel?.includes('Undergraduate') ? 'selected' : ''}>Undergraduate (B.Tech / B.E. / B.Sc / BCA)</option>
            <option value="High School Class 11-12" ${profile.educationLevel?.includes('High School') ? 'selected' : ''}>High School (Class 11 - 12)</option>
            <option value="Postgraduate M.Tech/MBA" ${profile.educationLevel?.includes('Postgraduate') ? 'selected' : ''}>Postgraduate (M.Tech / MBA / MS / MCA)</option>
            <option value="Doctorate PhD" ${profile.educationLevel?.includes('Doctorate') ? 'selected' : ''}>PhD & Doctoral Research</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Field of Study / Major</label>
          <select class="form-select" id="ob-field" onchange="Store.set('profile.fieldOfStudy', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
            <option value="Computer Science & AI" ${profile.fieldOfStudy?.includes('Computer') || !profile.fieldOfStudy ? 'selected' : ''}>Computer Science & Artificial Intelligence</option>
            <option value="Engineering & Tech" ${profile.fieldOfStudy?.includes('Engineering') ? 'selected' : ''}>Electronics / Mechanical / Civil Engineering</option>
            <option value="Business & Finance" ${profile.fieldOfStudy?.includes('Business') ? 'selected' : ''}>Commerce, Finance & Management</option>
            <option value="Medical & Healthcare" ${profile.fieldOfStudy?.includes('Medical') ? 'selected' : ''}>Medicine, Pharmacy & Biotechnology</option>
            <option value="Law & Legal Studies" ${profile.fieldOfStudy?.includes('Law') ? 'selected' : ''}>Law & Jurisprudence</option>
            <option value="Design & Creative" ${profile.fieldOfStudy?.includes('Design') ? 'selected' : ''}>UI/UX, Industrial Design & Arts</option>
          </select>
        </div>
      </div>

      <div class="form-row" style="display:grid; grid-template-columns:1.5fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">College / University Name</label>
          <input type="text" class="form-input" id="ob-college-name" placeholder="e.g. IIT Bombay / BITS Pilani / Delhi University" value="${profile.collegeName || ''}" onchange="Store.set('profile.collegeName', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Target CGPA / GPA</label>
          <input type="text" class="form-input" placeholder="e.g. 8.8 / 10 or 3.8 / 4.0" value="${profile.gpa || '8.8 / 10'}" onchange="Store.set('profile.gpa', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
      </div>

      <div class="form-group" style="margin-bottom:16px;">
        <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Dream Target Companies / Placements</label>
        <input type="text" class="form-input" placeholder="e.g. Google India, ISRO, Microsoft, Razorpay" value="${Array.isArray(profile.dreamCompanies) ? profile.dreamCompanies.join(', ') : (profile.dreamCompanies || 'Google India, Microsoft, ISRO')}" onchange="Store.set('profile.dreamCompanies', this.value.split(',').map(s=>s.trim()))" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
      </div>
    `;
  } else if (identity === 'employee') {
    trackHeader = '💼 Professional Career & Compensation Matrix';
    identityFields = `
      <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Current Organization / Employer</label>
          <input type="text" class="form-input" placeholder="e.g. Apex Tech / Infosys / Google" value="${profile.currentCompany || ''}" onchange="Store.set('profile.currentCompany', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Current Role / Designation</label>
          <input type="text" class="form-input" placeholder="e.g. Software Engineer / Product Lead" value="${profile.currentRole || ''}" onchange="Store.set('profile.currentRole', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
      </div>

      <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Annual Compensation (₹ CTC / $)</label>
          <input type="text" class="form-input" placeholder="e.g. ₹18,00,000 / $95,000" value="${profile.salary || '₹14,00,000'}" onchange="Store.set('profile.salary', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Years of Experience</label>
          <input type="number" class="form-input" placeholder="e.g. 3" min="0" max="40" value="${profile.yearsExperience || 2}" onchange="Store.set('profile.yearsExperience', parseInt(this.value))" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
      </div>

      <div class="form-group" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin:0;">Current Job Satisfaction & Fulfillment</label>
          <strong id="sat-val" style="color:#10b981; font-size:13px;">${profile.jobSatisfaction || 80}%</strong>
        </div>
        <input type="range" class="range-slider" min="0" max="100" value="${profile.jobSatisfaction || 80}" oninput="Store.set('profile.jobSatisfaction', parseInt(this.value)); document.getElementById('sat-val').textContent=this.value+'%'">
        <div class="range-labels"><span>Burnout Risk</span><span>Balanced</span><span>Peak Fulfillment</span></div>
      </div>
    `;
  } else {
    trackHeader = '🏢 Founder & Business Scalability Matrix';
    identityFields = `
      <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Venture / Business Name</label>
          <input type="text" class="form-input" placeholder="e.g. InnovateAI Technologies" value="${profile.businessName || ''}" onchange="Store.set('profile.businessName', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Business Growth Stage</label>
          <select class="form-select" onchange="Store.set('profile.businessStage', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
            <option value="Idea & Validation" ${profile.businessStage?.includes('Idea') ? 'selected' : ''}>Idea & Market Validation</option>
            <option value="Early Seed / MVP" ${profile.businessStage?.includes('Seed') || !profile.businessStage ? 'selected' : ''}>Early MVP & Prototype Stage</option>
            <option value="Scaling & Growth" ${profile.businessStage?.includes('Growth') ? 'selected' : ''}>Growth & Market Scale</option>
            <option value="Profitable Bootstrapped" ${profile.businessStage?.includes('Profitable') ? 'selected' : ''}>Profitable & Cashflow Positive</option>
          </select>
        </div>
      </div>

      <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Monthly Revenue / ARR</label>
          <input type="text" class="form-input" placeholder="e.g. ₹2,50,000 / mo" value="${profile.revenue || '₹2,50,000'}" onchange="Store.set('profile.revenue', this.value)" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Team Size / Headcount</label>
          <input type="number" class="form-input" placeholder="e.g. 5" min="1" max="1000" value="${profile.teamSize || 4}" onchange="Store.set('profile.teamSize', parseInt(this.value))" style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:12px; padding:10px 14px; width:100%; font-size:13px;">
        </div>
      </div>
    `;
  }

  const currentLifeStage = profile.lifeStage || 'Growth';

  return `
    <div class="onboarding-page">
      ${renderOnboardingStepper(2)}

      <div class="onboarding-container">
        <div class="onboarding-question">
          <h1>Configure Your <span class="text-gradient">Profile</span></h1>
          <p>This information seeds your personalized analytics, AI coach memory, and dashboard metrics.</p>
        </div>

        <div class="card" style="padding:28px 24px; background:rgba(15,23,42,0.7); backdrop-filter:blur(16px); border:1.5px solid rgba(255,255,255,0.12); border-radius:24px; box-shadow:0 12px 40px rgba(0,0,0,0.3);">
          
          <h3 style="font-size:16px; font-weight:700; color:#00f2fe; margin-bottom:18px; display:flex; align-items:center; gap:10px;">
            ${trackHeader}
          </h3>

          ${identityFields}

          <div style="height:1px; background:rgba(255,255,255,0.1); margin:20px 0;"></div>

          <div class="form-group" style="margin-bottom:16px;">
            <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:8px; display:block;">Current Life Stage Phase</label>
            <div class="option-grid" style="grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));">
              ${[
                { icon: '🔍', label: 'Exploration', val: 'Exploration' },
                { icon: '🏗️', label: 'Establishment', val: 'Establishment' },
                { icon: '📈', label: 'Hyper-Growth', val: 'Growth' },
                { icon: '🏆', label: 'Mastery & Scale', val: 'Mastery' }
              ].map(s => `
                <div class="option-item ${currentLifeStage.toLowerCase().includes(s.val.toLowerCase()) ? 'selected' : ''}" onclick="selectLifeStage(this, '${s.val}')">
                  <span class="option-icon">${s.icon}</span>
                  <span>${s.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="onboarding-nav">
          <button class="btn btn-ghost" onclick="Router.navigate('/onboarding/identity')" style="display:inline-flex; align-items:center; gap:8px;">
            <i class="fas fa-arrow-left"></i> Back to Identity
          </button>
          <button class="btn btn-primary" onclick="Router.navigate('/onboarding/goals')" style="padding:12px 28px; font-size:14px; font-weight:700; border-radius:999px; display:inline-flex; align-items:center; gap:10px; background:linear-gradient(135deg, #00f2fe 0%, #4f46e5 100%); border:none; box-shadow:0 4px 20px rgba(0,242,254,0.35); cursor:pointer;">
            <span>Continue to Goals</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function selectLifeStage(el, value) {
  Store.set('profile.lifeStage', value);
  el.parentElement.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
}
window.selectLifeStage = selectLifeStage;

/* ═══════════════════════════════════════════════════════════════════
   STEP 3: GOALS, INTENSITY & 5-YEAR VISION
   ═══════════════════════════════════════════════════════════════════ */
function GoalsPage() {
  const profile = Store.get('profile') || {};
  const currentIntensity = profile.goalIntensity || 'ambitious';
  const riskTolerance = profile.riskTolerance || 65;
  const weeklyHours = profile.weeklyHours || 15;
  const painPoint = profile.painPoint || 'Securing top tech internship & managing financial growth';
  const dreamVision = profile.dreamVision || 'Build an AI startup in India & achieve financial independence';

  return `
    <div class="onboarding-page">
      ${renderOnboardingStepper(3)}

      <div class="onboarding-container">
        <div class="onboarding-question">
          <h1>Calibrate Your <span class="text-gradient-accent">Life GPS</span></h1>
          <p>Define your execution pace, investment risk appetite, and 5-year North Star milestone.</p>
        </div>

        <div class="card" style="padding:28px 24px; background:rgba(15,23,42,0.7); backdrop-filter:blur(16px); border:1.5px solid rgba(255,255,255,0.12); border-radius:24px; box-shadow:0 12px 40px rgba(0,0,0,0.3);">
          
          <!-- 1. Goal Intensity -->
          <div class="form-group" style="margin-bottom:22px;">
            <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:8px; display:block;">Goal Execution Pace & Intensity</label>
            <div class="option-grid" style="grid-template-columns:repeat(3, 1fr);">
              ${[
                { icon: '🚀', label: 'Hyper-Growth', sub: 'High sprint velocity & rapid compounding', val: 'ambitious' },
                { icon: '⚖️', label: 'Balanced Life', sub: 'Sustainable growth & mindfulness harmony', val: 'balanced' },
                { icon: '🛡️', label: 'Consistent Mastery', sub: 'Steady daily habits & low burnout risk', val: 'steady' }
              ].map(g => `
                <div class="option-item ${currentIntensity === g.val ? 'selected' : ''}" onclick="selectGoalIntensity(this, '${g.val}')" style="padding:14px 10px;">
                  <span class="option-icon">${g.icon}</span>
                  <div style="font-weight:700; color:#fff; margin-bottom:2px;">${g.label}</div>
                  <div style="font-size:10.5px; color:#94a3b8; line-height:1.3;">${g.sub}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 2. Risk Tolerance Slider -->
          <div class="form-group" style="margin-bottom:22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin:0;">Wealth & Investment Risk Tolerance</label>
              <strong id="risk-val" style="color:#fbbf24; font-size:13px;">${riskTolerance}% (Balanced Growth)</strong>
            </div>
            <input type="range" class="range-slider" min="10" max="95" value="${riskTolerance}" oninput="updateRiskDisplay(this.value)">
            <div class="range-labels">
              <span>Conservative (FD & Debt)</span>
              <span>Balanced (Index Funds & SIP)</span>
              <span>Aggressive (Direct Equity & Venture)</span>
            </div>
          </div>

          <!-- 3. Weekly Hours -->
          <div class="form-group" style="margin-bottom:22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin:0;">Weekly Dedicated Focus for Self-Improvement</label>
              <strong id="hours-val" style="color:#00f2fe; font-size:13px;">${weeklyHours} Hours / Week</strong>
            </div>
            <input type="range" class="range-slider" min="2" max="35" value="${weeklyHours}" oninput="updateHoursDisplay(this.value)">
            <div class="range-labels">
              <span>2h (Micro-habits)</span>
              <span>15h (Part-time mastery)</span>
              <span>35h+ (Deep immersion)</span>
            </div>
          </div>

          <!-- 4. Primary Pain Point -->
          <div class="form-group" style="margin-bottom:22px;">
            <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:8px; display:block;">What is your #1 life priority / challenge to solve right now?</label>
            <div class="option-grid" style="grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));">
              ${[
                { icon: '🎯', label: 'Career Breakthrough & Placements', val: 'Career Growth & Opportunities' },
                { icon: '💰', label: 'Wealth Compounding & SIP Automation', val: 'Financial Optimization & Investments' },
                { icon: '⚡', label: 'Deep Work Focus & Beating Distractions', val: 'Focus & Productivity Protocols' },
                { icon: '🏃', label: 'Fitness, Nutrition & Circadian Sleep', val: 'Physical Health & Bio-Rhythm' },
                { icon: '🧠', label: 'Stress Management & Burnout Prevention', val: 'Mental Resilience & Balance' }
              ].map(p => `
                <div class="option-item ${painPoint.includes(p.val) || painPoint.includes(p.label.slice(0, 10)) ? 'selected' : ''}" onclick="selectPainPoint(this, '${p.val}')" style="padding:10px 8px; font-size:12px;">
                  <span class="option-icon" style="font-size:18px;">${p.icon}</span>
                  <span>${p.label}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 5. 5-Year Vision -->
          <div class="form-group">
            <label class="form-label" style="font-size:12.5px; color:#cbd5e1; margin-bottom:6px; display:block;">Your 5-Year North Star Vision (Where do you want to be by 2031?)</label>
            <textarea class="form-textarea" id="ob-vision-input" placeholder="Describe your dream career role, financial milestone, health physique, and personal legacy..." style="background:rgba(15,23,42,0.85); color:#fff; border:1px solid rgba(255,255,255,0.15); border-radius:14px; padding:12px 14px; width:100%; min-height:80px; font-size:13px; line-height:1.5;" onchange="Store.set('profile.dreamVision', this.value)">${dreamVision}</textarea>
          </div>
        </div>

        <div class="onboarding-nav">
          <button class="btn btn-ghost" onclick="Router.navigate('/onboarding/profile')" style="display:inline-flex; align-items:center; gap:8px;">
            <i class="fas fa-arrow-left"></i> Back to Profile
          </button>
          <button class="btn btn-primary" onclick="completeOnboardingFlow()" style="padding:12px 32px; font-size:14px; font-weight:800; border-radius:999px; display:inline-flex; align-items:center; gap:10px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); border:none; box-shadow:0 4px 20px rgba(16,185,129,0.4); cursor:pointer;">
            <i class="fas fa-check-circle"></i>
            <span>Synthesize My Life GPS</span>
          </button>
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
window.selectGoalIntensity = selectGoalIntensity;

function updateRiskDisplay(val) {
  Store.set('profile.riskTolerance', parseInt(val));
  const el = document.getElementById('risk-val');
  if (el) {
    let tier = 'Conservative';
    if (val > 40 && val <= 70) tier = 'Balanced Growth';
    else if (val > 70) tier = 'Aggressive Equity';
    el.textContent = `${val}% (${tier})`;
  }
}
window.updateRiskDisplay = updateRiskDisplay;

function updateHoursDisplay(val) {
  Store.set('profile.weeklyHours', parseInt(val));
  const el = document.getElementById('hours-val');
  if (el) {
    el.textContent = `${val} Hours / Week (~${val * 50}h / year)`;
  }
}
window.updateHoursDisplay = updateHoursDisplay;

function selectPainPoint(el, value) {
  Store.set('profile.painPoint', value);
  el.parentElement.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');
}
window.selectPainPoint = selectPainPoint;

function completeOnboardingFlow() {
  const visionText = document.getElementById('ob-vision-input')?.value;
  if (visionText) {
    Store.set('profile.dreamVision', visionText);
  }
  Router.navigate('/onboarding/complete');
}
window.completeOnboardingFlow = completeOnboardingFlow;

/* ═══════════════════════════════════════════════════════════════════
   STEP 4: ENGINE CALIBRATION & COMMAND CENTER LAUNCH
   ═══════════════════════════════════════════════════════════════════ */
function OnboardingCompletePage() {
  const userName = Store.get('profile.name') || 'Explorer';
  const identity = Store.get('identity') || 'student';
  const identityLabel = identity === 'student' ? 'Student & Academic' : identity === 'employee' ? 'Working Professional' : 'Founder & Business Owner';

  // Trigger celebration micro-effects
  setTimeout(() => {
    if (typeof ActionPhysics !== 'undefined') {
      ActionPhysics.cyberShieldUnlock(userName);
    }
  }, 100);

  return `
    <div class="onboarding-page" style="justify-content:center;">
      <div class="orb orb-indigo" style="top:-80px;left:50%;transform:translateX(-50%);opacity:0.3;width:400px;height:400px;"></div>

      ${renderOnboardingStepper(4)}

      <div class="onboarding-container" style="text-align:center;">
        <div style="font-size:64px; margin-bottom:16px; animation:float 3s ease-in-out infinite;">🎉</div>
        
        <h1 style="font-size:32px; font-weight:800; margin-bottom:10px;">
          You're All Set, <span class="text-gradient">${userName}!</span>
        </h1>
        
        <p style="font-size:15px; color:#cbd5e1; max-width:560px; margin:0 auto 28px; line-height:1.6;">
          Your customized <strong>${identityLabel}</strong> Life GPS roadmap, financial compounding engines, and AI Coach protocols have been successfully synthesized.
        </p>

        <!-- 5-Pillar Calibration Cards Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; max-width:680px; margin:0 auto 28px;">
          ${[
            { icon: '🚀', label: 'Career Roadmap', status: 'Active', color: '#6366f1' },
            { icon: '⚡', label: 'Work Protocols', status: 'Calibrated', color: '#06b6d4' },
            { icon: '💰', label: 'Wealth Engine', status: 'Synced', color: '#f59e0b' },
            { icon: '🏃', label: 'Health Vitality', status: 'Ready', color: '#10b981' },
            { icon: '🌟', label: 'Life Harmony', status: 'Online', color: '#ec4899' }
          ].map(p => `
            <div class="card" style="padding:16px 12px; background:rgba(15,23,42,0.7); backdrop-filter:blur(12px); border:1px solid ${p.color}40; border-radius:16px; text-align:center; transition:transform 0.25s ease;">
              <div style="font-size:26px; margin-bottom:6px;">${p.icon}</div>
              <div style="font-size:12px; font-weight:700; color:${p.color}; margin-bottom:2px;">${p.label}</div>
              <div style="font-size:10.5px; color:#10b981; font-weight:600;"><i class="fas fa-check-circle"></i> ${p.status}</div>
            </div>
          `).join('')}
        </div>

        <!-- Primary Launch Button -->
        <div style="display:flex; justify-content:center;">
          <button class="btn btn-primary" onclick="finalizeOnboardingAndLaunch()" style="padding:15px 38px; font-size:15px; font-weight:800; border-radius:999px; display:inline-flex; align-items:center; gap:12px; background:linear-gradient(135deg, #00f2fe 0%, #4f46e5 100%); border:none; box-shadow:0 6px 28px rgba(0,242,254,0.45); cursor:pointer; transition:transform 0.2s ease;">
            <i class="fas fa-th-large"></i>
            <span>Launch My BioVerse Command Center</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function finalizeOnboardingAndLaunch() {
  Store.completeOnboarding();
  if (typeof UI !== 'undefined') {
    UI.toast('success', '🚀 Command Center Activated', 'Welcome to your personalized BioVerse Life GPS dashboard!');
  }
  Router.navigate('/dashboard');
}
window.finalizeOnboardingAndLaunch = finalizeOnboardingAndLaunch;
