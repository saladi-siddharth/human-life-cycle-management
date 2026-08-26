/* ═══════════════════════════════════════════════════════════════════
   EMPLOYEE-SPECIFIC PAGES — Job Search, Salary Intelligence & Mobility
   ═══════════════════════════════════════════════════════════════════ */

function EmployeeJobsPage() {
  const content = `
    ${UI.sectionHeader('🔍 High-Growth Job Search & Career Leads', 'AI-powered job matching, competitive CTC insights & application tracking', '<button class="btn btn-primary btn-sm" onclick="openJobModal()"><i class="fas fa-plus"></i> Add Job Lead</button>')}
    <div class="stats-grid">
      ${UI.statCard('📤', 'Applications', '23', 'sent this month', 'up', '#6366f1')}
      ${UI.statCard('📞', 'Interviews', '7', 'completed', 'up', '#06b6d4')}
      ${UI.statCard('✅', 'Offers', '2', 'pending decision', 'up', '#10b981')}
      ${UI.statCard('🎯', 'Match Score', '94%', 'avg relevance', 'up', '#f59e0b')}
    </div>
    <div class="card-glass">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h4 style="margin:0;">Recommended High-CTC Software & Product Roles</h4>
        <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/dashboard/career')">View Kanban Pipeline →</button>
      </div>
      ${[
        { title: 'Staff Software Engineer (Distributed Systems)', company: 'Google India', loc: 'Bengaluru / Hyderabad', salary: '₹55,00,000 - ₹85,00,000', match: 96, posted: '1d ago' },
        { title: 'Principal Backend Architect', company: 'Razorpay', loc: 'Bengaluru, Karnataka', salary: '₹48,00,000 - ₹72,00,000', match: 93, posted: '2d ago' },
        { title: 'Senior Full-Stack AI Engineer', company: 'Microsoft India', loc: 'Hyderabad / Noida', salary: '₹42,00,000 - ₹65,00,000', match: 90, posted: '3d ago' },
        { title: 'Engineering Manager (Core Infrastructure)', company: 'Swiggy', loc: 'Bengaluru, Karnataka', salary: '₹60,00,000 - ₹95,00,000', match: 88, posted: '4d ago' },
        { title: 'Lead Platform Engineer', company: 'Zerodha', loc: 'Bengaluru / Remote', salary: '₹40,00,000 - ₹60,00,000', match: 85, posted: '1w ago' },
      ].map(j => `
        <div class="card card-hover" style="margin-bottom:12px;display:flex;align-items:center;gap:16px;background:rgba(15,23,42,0.85);border:1px solid var(--glass-border);padding:16px;">
          <div class="avatar" style="background:var(--gradient-cool);font-size:16px;">${j.company[0]}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;color:#fff;">${j.title}</div>
            <div style="font-size:12px;color:var(--text-muted);">${j.company} · ${j.loc} · ${j.posted}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--emerald);">${j.salary}</div>
            <span class="badge badge-primary" style="font-size:10px;">${j.match}% match</span>
          </div>
          <button class="btn btn-sm btn-primary" onclick="quickApplyJob('${j.company}', '${j.title}')">Track & Apply</button>
        </div>
      `).join('')}
    </div>
  `;
  return UI.dashboardLayout('/employee/jobs', content);
}

function quickApplyJob(company, title) {
  Store.addJobApplication({ company, role: title, stage: 'Applied', salary: '5500000' });
  if (typeof ActionPhysics !== 'undefined') ActionPhysics.rocketLaunch(company, title);
  UI.toast('success', 'Job Opportunity Tracked! 🚀', `Added ${title} at ${company} to your active career pipeline.`);
  Router.render();
}

function EmployeeSalaryPage() {
  const content = `
    ${UI.sectionHeader('💵 Total Compensation & Salary Intelligence', 'Market data benchmarks, RSU stock grant valuations, and negotiation scripts', '<button class="btn btn-primary btn-sm" onclick="openSalaryNegotiationModal()"><i class="fas fa-hand-holding-usd"></i> Negotiation Playbook</button>')}
    
    <div class="stats-grid">
      ${UI.statCard('💰', 'Current Package', '₹14,00,000', 'Annual Fixed CTC', '', '#6366f1')}
      ${UI.statCard('📊', 'Market Benchmark', '₹22,50,000', 'Tier 1 SDE 2 Level', 'up', '#10b981')}
      ${UI.statCard('📈', 'Negotiation Upside', '+₹8,50,000', 'Potential Delta (+60%)', 'up', '#f59e0b')}
      ${UI.statCard('🎯', 'Next Target CTC', '₹28,00,000', 'Senior Engineer Target', 'up', '#06b6d4')}
    </div>

    <div class="grid-dashboard">
      <div>
        <!-- 📈 Interactive ESOP & Startup Equity Wealth Modeler 📈 -->
        <div class="card card-glass" style="margin-bottom:16px; padding:22px; border:1px solid rgba(16,185,129,0.3); background:linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(15,23,42,0.95) 100%);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <h4 style="margin:0; font-size:16px; display:flex; align-items:center; gap:8px;">
              <span>📈</span> ESOP & Stock Equity Wealth Modeler
            </h4>
            <span class="badge badge-success" style="font-size:12px;">Estimated Value: <strong id="esop-total-val" style="color:#00f2fe;">₹42,50,000</strong></span>
          </div>
          <p style="font-size:12px; color:#94a3b8; margin-bottom:16px;">
            Simulate your equity vesting trajectory, strike price upside, and future liquidity value at series funding rounds or IPO.
          </p>

          <div class="grid grid-3" style="gap:14px; margin-bottom:16px;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                <span style="color:#94a3b8;">Vested Options</span>
                <strong style="color:#fff;" id="esop-options-txt">5,000 Options</strong>
              </div>
              <input type="range" class="bio-slider" min="1000" max="25000" step="500" value="5000" oninput="updateESOPModeler('options', this.value)">
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                <span style="color:#94a3b8;">Strike Price (Grant)</span>
                <strong style="color:#fff;" id="esop-strike-txt">₹150 / share</strong>
              </div>
              <input type="range" class="bio-slider" min="10" max="1000" step="10" value="150" oninput="updateESOPModeler('strike', this.value)">
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:4px;">
                <span style="color:#94a3b8;">Future Fair Market Val</span>
                <strong style="color:#10b981;" id="esop-fmv-txt">₹1,000 / share</strong>
              </div>
              <input type="range" class="bio-slider" min="200" max="5000" step="50" value="1000" oninput="updateESOPModeler('fmv', this.value)">
            </div>
          </div>

          <div style="background:#070a14; border:1px solid #1e293b; border-radius:10px; padding:12px 16px; font-size:12px; color:#cbd5e1; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>Exercise Cost: <strong id="esop-cost-txt">₹7,50,000</strong></div>
            <div>Gross Pre-Tax Profit: <strong style="color:#10b981;" id="esop-profit-txt">₹42,50,000</strong></div>
            <div style="color:#00f2fe;">Net Post-Tax LTCG (12.5%): <strong id="esop-net-txt">₹37,18,750</strong></div>
          </div>
        </div>

        <div class="chart-container" style="margin-bottom:16px;">
          <div class="chart-header"><span class="chart-title">Salary & Total Compensation Growth Trajectory (INR Lakhs)</span></div>
          <div class="chart-canvas-wrap"><canvas id="salary-chart"></canvas></div>
        </div>
        
        <div class="card card-glass">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h4 style="margin:0;">💡 Executive Negotiation Strategies</h4>
            <button class="btn btn-accent btn-sm" onclick="openSalaryNegotiationModal()"><i class="fas fa-calculator"></i> Calculate Total Comp</button>
          </div>
          ${[
            'Benchmark base salary vs equity stock grants (RSUs) & joining bonuses separately',
            'Always negotiate after securing initial verbal offer before signing written contract',
            'Quantify your system engineering business impact in revenue saved or throughput increased',
            'Use competing offers from Tier 1 Indian startups & MNCs to negotiate counter-leverage'
          ].map((t, i) => `
            <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--glass-border);">
              <span style="font-weight:800;color:var(--cyan);min-width:24px;">0${i+1}.</span>
              <span style="font-size:13px;color:var(--text-secondary);line-height:1.5;">${t}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <div class="card card-glass" style="margin-bottom:16px;">
          <h4 style="margin-bottom:16px;">📊 Indian Tech Market Benchmarks</h4>
          ${[
            { company: 'Google India (L4 SDE 2)', salary: '₹34L Base', total: '₹65L TC' },
            { company: 'Razorpay (SDE 2)', salary: '₹30L Base', total: '₹48L TC' },
            { company: 'Microsoft India (L61)', salary: '₹28L Base', total: '₹50L TC' },
            { company: 'Swiggy / Zomato (Senior)', salary: '₹36L Base', total: '₹58L TC' },
            { company: 'Average Tech Product Co', salary: '₹20L Base', total: '₹28L TC' },
          ].map(c => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--glass-border);">
              <span style="font-size:13px;font-weight:600;flex:1;color:#fff;">${c.company}</span>
              <span style="font-size:12px;font-family:var(--font-mono);color:var(--text-muted);">${c.salary}</span>
              <span style="font-size:12px;font-family:var(--font-mono);color:var(--emerald);font-weight:700;">${c.total}</span>
            </div>
          `).join('')}
        </div>

        <div class="card card-glass">
          <h4 style="margin-bottom:16px;">🎯 High-Value Technical Skills</h4>
          ${[
            { skill: 'Distributed Systems & Microservices', premium: '+35% CTC' },
            { skill: 'Machine Learning & LLM Fine-Tuning', premium: '+45% CTC' },
            { skill: 'High-Concurrency Golang / Rust Backend', premium: '+30% CTC' },
            { skill: 'Cloud Architecture & Kubernetes Orchestration', premium: '+25% CTC' },
          ].map(s => `
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--glass-border);font-size:13px;">
              <span>${s.skill}</span>
              <span style="font-weight:800;color:var(--emerald);">${s.premium}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  setTimeout(() => {
    Charts.line('salary-chart', {
      labels: ['2023', '2024', '2025', '2026', '2027 Target*'],
      values: [800000, 1100000, 1400000, 1850000, 2800000]
    }, { height: 180, colors: ['#10b981'] });
  }, 300);
  return UI.dashboardLayout('/employee/salary', content);
}

function openSalaryNegotiationModal() {
  const html = `
    <div style="max-width:580px;">
      <h3 style="margin-bottom:6px;"><i class="fas fa-hand-holding-usd" style="color:var(--emerald);"></i> Total Compensation & Negotiation Calculator</h3>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:16px;">Simulate your total annual compensation breakdown and generate counter-negotiation arguments.</p>

      <form onsubmit="calculateOfferComp(event)" style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:11px;color:var(--text-muted);">Base Salary (₹ Annual)</label>
            <input type="number" id="neg-base" class="chat-input" value="2400000" required>
          </div>
          <div>
            <label style="font-size:11px;color:var(--text-muted);">Annual Stock / RSU (₹)</label>
            <input type="number" id="neg-rsu" class="chat-input" value="800000" required>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:11px;color:var(--text-muted);">Joining Bonus (₹)</label>
            <input type="number" id="neg-bonus" class="chat-input" value="300000">
          </div>
          <div>
            <label style="font-size:11px;color:var(--text-muted);">Performance Bonus (₹)</label>
            <input type="number" id="neg-perf" class="chat-input" value="250000">
          </div>
        </div>

        ${UI.pillButton({ text: 'Calculate Total Compensation', icon: '<i class="fas fa-calculator"></i>', theme: 'emerald', type: 'submit' })}
        <div id="neg-output" style="padding:14px;background:rgba(15,23,42,0.9);border-radius:10px;border:1px solid rgba(16,185,129,0.4);font-size:13px;display:none;margin-top:12px;"></div>
      </form>
    </div>
  `;
  UI.modal(html);
}

function calculateOfferComp(e) {
  e.preventDefault();
  const base = Number(document.getElementById('neg-base').value) || 0;
  const rsu = Number(document.getElementById('neg-rsu').value) || 0;
  const bonus = Number(document.getElementById('neg-bonus').value) || 0;
  const perf = Number(document.getElementById('neg-perf').value) || 0;
  const total = base + rsu + bonus + perf;

  const out = document.getElementById('neg-output');
  out.style.display = 'block';
  out.innerHTML = `
    <div style="font-size:16px;font-weight:800;color:var(--emerald);margin-bottom:6px;">
      Total Year 1 Compensation: ₹${total.toLocaleString()} (${(total / 100000).toFixed(1)} LPA)
    </div>
    <div style="font-size:12px;color:var(--text-secondary);line-height:1.5;">
      • Fixed Cash: ₹${base.toLocaleString()} (₹${Math.round(base / 12).toLocaleString()} / month)<br>
      • Variable Equity & Bonuses: ₹${(rsu + bonus + perf).toLocaleString()}<br>
      <strong>💡 Negotiation Tip:</strong> Target a 15% counter on base salary (₹${Math.round(base * 1.15).toLocaleString()}) with joining bonus acceleration.
    </div>
  `;
  if (typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('coinDrop');
}

function EmployeeMobilityPage() {
  const content = `
    ${UI.sectionHeader('📈 Internal Mobility & Promotion Ladder', 'Track promotion readiness, leveling requirements, and executive milestones')}
    
    <div class="card card-glass" style="margin-bottom:16px;">
      <h4 style="margin-bottom:16px;">🗺️ Software Engineering Career Leveling Path</h4>
      <div class="roadmap">
        ${[
          { date: '2023 - 2024', title: 'SDE 1 (Software Development Engineer)', desc: 'Mastered modular architecture, code quality, unit test coverage, and sprint velocity.', completed: true },
          { date: '2025 - Present', title: 'SDE 2 (Mid-Level Engineer)', desc: 'Leading high-throughput microservices, API contract designs, and mentoring juniors.', current: true },
          { date: '2027 Target', title: 'Senior Software Engineer (SDE 3)', desc: 'Cross-functional architectural ownership, distributed systems resilience, and technical roadmap execution.' },
          { date: '2029 Vision', title: 'Staff Engineer / Principal Architect', desc: 'Organizational technology strategy, multi-region scalability, and executive engineering leadership.' },
        ].map(r => `
          <div class="roadmap-item">
            <div class="roadmap-dot ${r.completed ? 'completed' : ''} ${r.current ? 'current' : ''}"></div>
            <div class="roadmap-content">
              <div class="roadmap-date">${r.date}</div>
              <div class="roadmap-title">${r.title}</div>
              <div class="roadmap-desc">${r.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card card-glass">
      <h4 style="margin-bottom:16px;">🏆 Promotion Readiness Matrix (Target: Senior Engineer)</h4>
      ${UI.progressBar('System Architecture & High-Scale Design', 85, 100, '#6366f1')}
      ${UI.progressBar('Technical Mentorship & Code Review Leadership', 75, 100, '#06b6d4')}
      ${UI.progressBar('Cross-Team Business Impact & KPI Delivery', 80, 100, '#10b981')}
      ${UI.progressBar('Executive Communication & Stakeholder Alignment', 65, 100, '#f59e0b')}
      
      <div style="margin-top:16px;padding:14px;background:rgba(99,102,241,0.1);border-radius:10px;border:1px solid rgba(99,102,241,0.3);font-size:13px;color:var(--text-secondary);">
        <strong style="color:var(--cyan);">💡 AI Career Coach Insight:</strong> Your technical system design and velocity score are exceptional. To lock in the Senior SDE promotion, author a major Architecture Decision Record (ADR) and present at the company-wide engineering summit.
      </div>
    </div>
  `;
  return UI.dashboardLayout('/employee/mobility', content);
}

let esopState = { options: 5000, strike: 150, fmv: 1000 };

function updateESOPModeler(key, val) {
  esopState[key] = Number(val);
  if (key === 'options') document.getElementById('esop-options-txt').textContent = `${Number(val).toLocaleString()} Options`;
  if (key === 'strike') document.getElementById('esop-strike-txt').textContent = `₹${val} / share`;
  if (key === 'fmv') document.getElementById('esop-fmv-txt').textContent = `₹${Number(val).toLocaleString()} / share`;

  const cost = esopState.options * esopState.strike;
  const grossValue = esopState.options * esopState.fmv;
  const profit = Math.max(0, grossValue - cost);
  const netLTCG = Math.round(profit * 0.875); // 12.5% LTCG tax (India Budget 2024)

  document.getElementById('esop-total-val').textContent = `₹${profit.toLocaleString('en-IN')}`;
  document.getElementById('esop-cost-txt').textContent = `₹${cost.toLocaleString('en-IN')}`;
  document.getElementById('esop-profit-txt').textContent = `₹${profit.toLocaleString('en-IN')}`;
  document.getElementById('esop-net-txt').textContent = `₹${netLTCG.toLocaleString('en-IN')}`;
}

window.quickApplyJob = quickApplyJob;
window.openSalaryNegotiationModal = openSalaryNegotiationModal;
window.calculateOfferComp = calculateOfferComp;
window.updateESOPModeler = updateESOPModeler;

