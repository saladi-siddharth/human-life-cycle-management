/* ═══════════════════════════════════════════════════════════════════
   CAREER & PROFESSIONAL GROWTH PAGE — Skill Matrix, ATS Matcher & Kanban
   ═══════════════════════════════════════════════════════════════════ */

function CareerPage() {
  const career = Store.get('career') || {};
  const scores = Store.get('scores') || {};
  const skills = career.skills || [];
  const applications = career.jobApplications || [];

  const wishlistApps = applications.filter(a => a.stage === 'Wishlist');
  const appliedApps = applications.filter(a => a.stage === 'Applied');
  const interviewApps = applications.filter(a => a.stage === 'Interviewing');
  const offerApps = applications.filter(a => a.stage === 'Offer');

  // Recommendation
  let recIcon = '🚀';
  let recTitle = 'ATS & Skill Acceleration';
  let recText = `You have 1 offer stage lead ($275K Total Comp) and 2 active applications. Run the ATS Matcher below to optimize your keywords!`;

  const content = `
    <div class="career-page">
      ${UI.sectionHeader(
        'Career Matrix & Job Pipeline',
        'Analyze ATS resume keywords, track job application pipelines, and bridge skill gaps.',
        `<button class="btn btn-primary btn-sm" onclick="openJobModal()"><i class="fas fa-plus"></i> Track Application</button>`
      )}

      <!-- Real-Time Recommendation -->
      ${UI.recommendationBanner(recIcon, recTitle, recText, 'Run ATS Matcher', 'scrollToATS()')}

      <!-- Score Overview Header -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);display:flex;align-items:center;justify-content:space-between;padding:24px;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="font-size:42px;background:rgba(99,102,241,0.15);width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;">🎯</div>
          <div>
            <h2 style="margin:0;font-size:24px;">Career Score: <span style="color:var(--indigo-light);">${scores.career || 72}/100</span></h2>
            <p style="margin:4px 0 0 0;color:var(--text-secondary);font-size:var(--text-sm);">Skill coverage, active applications pipeline, and ATS keyword strength.</p>
          </div>
        </div>
        <button class="btn btn-primary" onclick="openJobModal()"><i class="fas fa-briefcase"></i> Add Job Opportunity</button>
      </div>

      <!-- 4 Core Sub-Components -->
      <div class="grid grid-2" style="gap:24px;margin-bottom:24px;">

        <!-- 1. Interactive Skill Matrix & Gap Analyzer -->
        <div class="card card-glass">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-layer-group" style="color:var(--indigo-light);"></i> Skill Gap Analysis</h3>
            <span class="badge badge-primary">Target: Senior Lead</span>
          </div>

          <div style="display:flex;flex-direction:column;gap:14px;">
            ${skills.map(s => `
              <div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);margin-bottom:4px;">
                  <span style="font-weight:600;">${s.name}</span>
                  <span style="color:var(--indigo-light);">Level ${s.level} / ${s.target}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${(s.level / s.target) * 100}%;background:var(--gradient-primary);"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. AI Resume Score & ATS Keyword Matcher -->
        <div class="card card-glass" id="ats-section">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-file-contract" style="color:var(--cyan);"></i> AI Resume & ATS Matcher</h3>
          
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="font-size:11px;color:var(--text-muted);">Paste Job Description or Target Skill List</label>
              <textarea id="job-desc-input" class="chat-input" style="height:70px;" placeholder="e.g. Seeking Senior Software Architect with System Design, AWS Cloud, microservices, and team leadership experience..."></textarea>
            </div>
            <button class="btn btn-accent btn-sm" onclick="runATSAnalysis()"><i class="fas fa-magic"></i> Calculate ATS Match %</button>
            <div id="ats-result-output" style="font-size:var(--text-xs);color:var(--text-secondary);margin-top:8px;"></div>
          </div>
        </div>

      </div>

      <!-- 3. Job Application Pipeline (Kanban Board) -->
      <h3 style="margin:0 0 12px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-columns" style="color:var(--purple);"></i> Job Application Pipeline (Kanban)</h3>
      <div class="kanban-grid">
        
        <!-- Wishlist -->
        <div class="kanban-col">
          <div class="kanban-col-header"><span>⭐ Wishlist</span><span class="badge badge-neutral">${wishlistApps.length}</span></div>
          ${renderKanbanCards(wishlistApps)}
        </div>

        <!-- Applied -->
        <div class="kanban-col">
          <div class="kanban-col-header"><span>📬 Applied</span><span class="badge badge-info">${appliedApps.length}</span></div>
          ${renderKanbanCards(appliedApps)}
        </div>

        <!-- Interviewing -->
        <div class="kanban-col">
          <div class="kanban-col-header"><span>💬 Interviewing</span><span class="badge badge-warning">${interviewApps.length}</span></div>
          ${renderKanbanCards(interviewApps)}
        </div>

        <!-- Offer Received -->
        <div class="kanban-col">
          <div class="kanban-col-header"><span>🎉 Offer</span><span class="badge badge-success">${offerApps.length}</span></div>
          ${renderKanbanCards(offerApps)}
        </div>

      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/career', content);
}

function renderKanbanCards(apps) {
  if (!apps.length) return `<div style="font-size:var(--text-xs);color:var(--text-muted);padding:12px 0;">No applications</div>`;
  return apps.map(a => `
    <div id="job-card-${a.id}" class="kanban-card" style="position:relative;transition:all 0.2s ease;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;">
        <div>
          <div style="font-weight:700;font-size:var(--text-sm);">${a.company}</div>
          <div style="font-size:var(--text-xs);color:var(--indigo-light);">${a.role}</div>
        </div>
        <button class="btn-delete-epic btn-delete-sm" onclick="deleteJobItem('${a.id}', this.closest('#job-card-${a.id}'))" data-tooltip="Crumple & Toss Application">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div style="font-size:11px;color:var(--emerald);margin-top:4px;font-weight:600;">$${Number(a.salary).toLocaleString()}</div>
      <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Applied: ${a.appliedDate}</div>
      <div style="margin-top:8px;display:flex;gap:4px;">
        <button class="btn btn-ghost btn-sm" style="padding:2px 6px;font-size:10px;" onclick="shiftJobStage('${a.id}', 'Interviewing')">Interview</button>
        <button class="btn btn-ghost btn-sm" style="padding:2px 6px;font-size:10px;" onclick="shiftJobStage('${a.id}', 'Offer')">Offer</button>
      </div>
    </div>
  `).join('');
}

function deleteJobItem(id, element) {
  const el = element || document.getElementById(`job-card-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteJobApplication(id);
    UI.toast('info', 'Application Tossed', 'Job application crumpled into paper ball and tossed!');
    Router.render();
  });
}

// ─── Career Interactive Handlers ──────────────────────────
function scrollToATS() {
  const el = document.getElementById('ats-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

async function runATSAnalysis() {
  const text = document.getElementById('job-desc-input').value;
  const output = document.getElementById('ats-result-output');
  if (!text || text.length < 10) {
    UI.toast('warning', 'Input Needed', 'Please paste a job description first.');
    return;
  }

  output.innerHTML = 'Analyzing resume keywords with AI...';
  const response = await AIService.analyzeResume(Store.get('career.resumeText'), text);
  output.innerHTML = response.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function openJobModal() {
  const html = `
    <h3>Track New Job Application</h3>
    <form onsubmit="saveJobForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Company Name</label>
        <input type="text" id="j-comp" class="chat-input" placeholder="e.g. OpenAI, Google, Stripe" required>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Role Title</label>
        <input type="text" id="j-role" class="chat-input" placeholder="e.g. Senior Software Architect" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Pipeline Stage</label>
          <select id="j-stage" class="chat-input">
            <option value="Wishlist">Wishlist</option>
            <option value="Applied" selected>Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer Received</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Target Total Comp ($)</label>
          <input type="number" id="j-sal" class="chat-input" value="220000" required>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Track Opportunity</button>
    </form>
  `;
  UI.modal(html);
}

function saveJobForm(e) {
  e.preventDefault();
  const company = document.getElementById('j-comp').value;
  const role = document.getElementById('j-role').value;
  const stage = document.getElementById('j-stage').value;
  const salary = document.getElementById('j-sal').value;
  Store.addJobApplication({ company, role, stage, salary });
  UI.closeModal();
  ActionPhysics.rocketLaunch(company, role);
  UI.toast('success', 'Application Tracked 🚀', `3D Rocket launched! Added ${role} at ${company} to Kanban.`);
  Router.render();
}

function shiftJobStage(id, stage) {
  Store.updateJobStage(id, stage);
  UI.toast('success', 'Pipeline Updated', `Moved application to ${stage}.`);
  Router.render();
}

window.openJobModal = openJobModal;
window.saveJobForm = saveJobForm;
window.shiftJobStage = shiftJobStage;
window.runATSAnalysis = runATSAnalysis;
window.scrollToATS = scrollToATS;
window.deleteJobItem = deleteJobItem;

