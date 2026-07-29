/* ═══════════════════════════════════════════════════════════════════
   STUDENT HUB — Indian Colleges, Real-Time Scholarships & Internships
   ═══════════════════════════════════════════════════════════════════ */

let currentCollegeFieldFilter = 'All';

function StudentCollegesPage() {
  const colleges = Store.get('indianColleges') || [];
  
  const fields = ['All', 'Engineering & Tech', 'Medicine & Healthcare', 'Business & Management', 'Law', 'Pure Sciences', 'Design & Arts', 'Humanities & Arts'];

  const filteredColleges = currentCollegeFieldFilter === 'All' 
    ? colleges 
    : colleges.filter(c => c.field === currentCollegeFieldFilter);

  const content = `
    <div class="student-colleges-page">
      ${UI.sectionHeader(
        '🇮🇳 Top Indian Universities & Institutes Directory',
        'Explore NIRF-ranked Indian colleges filtered by educational field with real-time tuition, placement averages, and direct admission portals.'
      )}

      <!-- Educational Field Filter Tabs -->
      <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:12px;margin-bottom:var(--space-xl);scrollbar-width:none;">
        ${fields.map(f => `
          <button class="btn ${currentCollegeFieldFilter === f ? 'btn-primary' : 'btn-secondary'} btn-sm" style="white-space:nowrap;" onclick="setCollegeFieldFilter('${f}')">
            ${f === 'All' ? '🎓 All Fields' : f}
          </button>
        `).join('')}
      </div>

      <!-- Colleges Grid -->
      <div class="grid grid-3" style="gap:20px;">
        ${filteredColleges.map(c => `
          <div class="card card-glass card-hover" style="display:flex;flex-direction:column;justify-content:space-between;padding:20px;">
            <div>
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px;">
                <span class="badge badge-primary" style="font-size:10px;">${c.nirfRank}</span>
                <span class="badge badge-purple" style="font-size:10px;">${c.field}</span>
              </div>
              <h3 style="margin:0 0 6px 0;font-size:18px;color:var(--text-primary);">${c.name}</h3>
              <div style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:14px;">
                <i class="fas fa-map-marker-alt" style="color:var(--cyan);"></i> ${c.location}
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);margin-bottom:16px;">
                <div>
                  <div style="font-size:10px;color:var(--text-muted);">Avg Placement</div>
                  <div style="font-weight:700;font-size:13px;color:var(--emerald);">${c.avgPlacement}</div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--text-muted);">Entrance Exam</div>
                  <div style="font-weight:700;font-size:13px;color:var(--cyan);">${c.exam}</div>
                </div>
                <div style="grid-column:span 2;">
                  <div style="font-size:10px;color:var(--text-muted);">Tuition / Fees</div>
                  <div style="font-weight:600;font-size:12px;color:var(--text-secondary);">${c.tuition}</div>
                </div>
              </div>
            </div>

            <div style="display:flex;gap:8px;">
              <button class="btn btn-outline btn-sm" style="flex:1;" onclick="window.open('${c.link}', '_blank')"><i class="fas fa-globe"></i> Website</button>
              <button class="btn btn-primary btn-sm" style="flex:1;" onclick="window.open('${c.applyLink}', '_blank')"><i class="fas fa-external-link-alt"></i> Apply Portal</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return UI.dashboardLayout('/student/colleges', content);
}

function setCollegeFieldFilter(field) {
  currentCollegeFieldFilter = field;
  Router.render();
}

// ─── Real-Time Indian Scholarships Page ─────────────────────
function StudentScholarshipsPage() {
  const scholarships = Store.get('indianScholarships') || [];

  const content = `
    <div class="student-scholarships-page">
      ${UI.sectionHeader(
        '🏆 Indian Government & Private Scholarships',
        'Official scholarships from Govt of India, Tata Trusts, Reliance Foundation, and corporate CSR programs with direct portal redirects.'
      )}

      <div class="grid grid-2" style="gap:20px;">
        ${scholarships.map(s => `
          <div class="card card-glass card-hover" style="display:flex;flex-direction:column;justify-content:space-between;padding:24px;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <span class="badge ${s.type === 'Government' ? 'badge-success' : 'badge-primary'}">${s.type}</span>
                <span style="font-family:var(--font-mono);font-weight:800;font-size:16px;color:var(--emerald);">${s.amount}</span>
              </div>
              <h3 style="margin:0 0 6px 0;font-size:18px;">${s.name}</h3>
              <div style="font-size:var(--text-xs);color:var(--indigo-light);margin-bottom:12px;font-weight:600;">Provider: ${s.provider}</div>
              
              <div style="padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);margin-bottom:16px;">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">Eligibility Criteria:</div>
                <div style="font-size:12px;color:var(--text-secondary);">${s.eligibility}</div>
                <div style="font-size:11px;color:var(--amber);margin-top:8px;font-weight:600;"><i class="fas fa-clock"></i> Deadline: ${s.deadline}</div>
              </div>
            </div>

            <button class="btn btn-success btn-sm" style="width:100%;" onclick="window.open('${s.applyLink}', '_blank')">
              <i class="fas fa-paper-plane"></i> Redirect to Apply Portal
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return UI.dashboardLayout('/student/scholarships', content);
}

// ─── Real-Time Student Internships Page ──────────────────────
function StudentInternshipsPage() {
  const internships = Store.get('indianInternships') || [];

  const content = `
    <div class="student-internships-page">
      ${UI.sectionHeader(
        '💼 Real-Time Student Internships (Govt & Corporate)',
        'Explore policy, research, and tech internships at NITI Aayog, ISRO, PM Internship Scheme, Google, Microsoft, and tech startups.'
      )}

      <div class="grid grid-2" style="gap:20px;">
        ${internships.map(i => `
          <div class="card card-glass card-hover" style="display:flex;flex-direction:column;justify-content:space-between;padding:24px;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <span class="badge ${i.type === 'Government' ? 'badge-success' : 'badge-info'}">${i.type}</span>
                <span style="font-family:var(--font-mono);font-weight:800;font-size:15px;color:var(--cyan);">${i.stipend}</span>
              </div>
              <h3 style="margin:0 0 4px 0;font-size:18px;">${i.title}</h3>
              <div style="font-size:var(--text-xs);color:var(--indigo-light);font-weight:700;margin-bottom:12px;">${i.company}</div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);border:1px solid var(--glass-border);margin-bottom:16px;">
                <div>
                  <div style="font-size:10px;color:var(--text-muted);">Location</div>
                  <div style="font-weight:600;font-size:12px;">${i.location}</div>
                </div>
                <div>
                  <div style="font-size:10px;color:var(--text-muted);">Duration</div>
                  <div style="font-weight:600;font-size:12px;">${i.duration}</div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary btn-sm" style="width:100%;" onclick="window.open('${i.applyLink}', '_blank')">
              <i class="fas fa-external-link-alt"></i> Redirect to Internship Application
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return UI.dashboardLayout('/student/internships', content);
}

window.setCollegeFieldFilter = setCollegeFieldFilter;

