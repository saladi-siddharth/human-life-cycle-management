/* ═══════════════════════════════════════════════════════════════════
   STUDENT HUB — Indian Colleges, Real-Time Scholarships & Internships Portals
   ═══════════════════════════════════════════════════════════════════ */

let currentCollegeFieldFilter = 'All';
let currentCollegeTierFilter = 'All';
let collegeSearchQuery = '';

let currentScholarshipTypeFilter = 'All';
let scholarshipSearchQuery = '';

let currentInternshipTypeFilter = 'All';
let internshipSearchQuery = '';

// ─── 1. ALL-INDIA COLLEGES PORTAL ────────────────────────────
function StudentCollegesPage() {
  const colleges = Store.get('indianColleges') || [];
  const fields = ['All', 'Engineering & Tech', 'Medicine & Healthcare', 'Business & Management', 'Law', 'Pure Sciences', 'Design & Arts'];
  const tiers = ['All Tiers', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'];

  const filteredColleges = colleges.filter(c => {
    const matchesField = currentCollegeFieldFilter === 'All' || c.field === currentCollegeFieldFilter;
    const matchesTier = currentCollegeTierFilter === 'All Tiers' || (c.nirfRank && c.nirfRank.includes(currentCollegeTierFilter));
    const matchesSearch = !collegeSearchQuery || 
      c.name.toLowerCase().includes(collegeSearchQuery.toLowerCase()) || 
      c.location.toLowerCase().includes(collegeSearchQuery.toLowerCase()) ||
      c.exam.toLowerCase().includes(collegeSearchQuery.toLowerCase());
    return matchesField && matchesTier && matchesSearch;
  });

  const content = `
    <div class="student-colleges-page">
      ${UI.sectionHeader(
        '🇮🇳 All-India Top Universities & Institutes Directory',
        'Explore NIRF-ranked Indian colleges with real-time placement statistics, entrance exams, tuition, and direct admission portals.',
        `<div style="display:flex;gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="openCollegeCompareModal()"><i class="fas fa-columns"></i> Compare Institutes</button>
          <button class="btn btn-primary btn-sm" onclick="openAddCollegeModal()"><i class="fas fa-plus"></i> Add College</button>
        </div>`
      )}

      <!-- 🏆 Competitive Exam Countdowns & Syllabus Roadmap Banner 🏆 -->
      ${renderExamsTracker()}

      <!-- Search & Filters Bar -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:16px;">
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <div style="flex:1;position:relative;">
            <i class="fas fa-search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-muted);"></i>
            <input type="text" class="chat-input" style="padding-left:40px;height:42px;" placeholder="Search Indian colleges by name, city, or entrance exam (e.g. JEE, NEET, CAT, CLAT)..." value="${collegeSearchQuery}" oninput="onCollegeSearch(this.value)">
          </div>
          <button class="btn btn-outline btn-sm" onclick="searchWebColleges(collegeSearchQuery)" data-tooltip="Search live NIRF / JoSAA counseling portals"><i class="fas fa-globe"></i> Search Web Sources</button>
          <button class="btn btn-secondary btn-sm" onclick="openCollegeCompareModal()"><i class="fas fa-balance-scale"></i> Compare</button>
          <button class="btn btn-primary btn-sm" onclick="openAddCollegeModal()"><i class="fas fa-graduation-cap"></i> Add Institute</button>
        </div>

        <!-- Tier Pills -->
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;margin-bottom:8px;scrollbar-width:none;">
          <span style="font-size:11px;color:var(--text-muted);display:flex;align-items:center;margin-right:4px;">Tier:</span>
          ${tiers.map(t => `
            <button class="btn ${currentCollegeTierFilter === t ? 'btn-primary' : 'btn-ghost'} btn-sm" style="white-space:nowrap;padding:2px 10px;font-size:11px;" onclick="setCollegeTierFilter('${t}')">
              ${t}
            </button>
          `).join('')}
        </div>

        <!-- Educational Field Pills -->
        <div style="display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;">
          <span style="font-size:11px;color:var(--text-muted);display:flex;align-items:center;margin-right:4px;">Field:</span>
          ${fields.map(f => `
            <button class="btn ${currentCollegeFieldFilter === f ? 'btn-accent' : 'btn-secondary'} btn-sm" style="white-space:nowrap;padding:2px 10px;font-size:11px;" onclick="setCollegeFieldFilter('${f}')">
              ${f === 'All' ? '🎓 All Fields' : f}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Colleges Grid -->
      <div class="grid grid-3" style="gap:20px;">
        ${filteredColleges.length === 0 ? `
          <div style="grid-column:span 3;text-align:center;padding:40px;color:var(--text-muted);">
            <i class="fas fa-university" style="font-size:36px;margin-bottom:10px;color:var(--indigo-light);"></i>
            <p>No Indian colleges found matching your criteria. Try adjusting your search query or filter!</p>
          </div>
        ` : filteredColleges.map(c => `
          <div id="college-card-${c.id}" class="card card-glass card-hover" style="display:flex;flex-direction:column;justify-content:space-between;padding:20px;position:relative;transition:all 0.2s ease;">
            <div>
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:12px;">
                <span class="badge badge-primary" style="font-size:10px;">${c.nirfRank}</span>
                <div style="display:flex;align-items:center;gap:6px;">
                  <span class="badge badge-purple" style="font-size:10px;">${c.field}</span>
                  <button class="btn-delete-epic btn-delete-sm" onclick="deleteCollegeItem('${c.id}', this.closest('#college-card-${c.id}'))" data-tooltip="Crumple & Toss College">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
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

function onCollegeSearch(val) { collegeSearchQuery = val; Router.render(); }
function setCollegeFieldFilter(field) { currentCollegeFieldFilter = field; Router.render(); }
function setCollegeTierFilter(tier) { currentCollegeTierFilter = tier; Router.render(); }

function deleteCollegeItem(id, element) {
  const el = element || document.getElementById(`college-card-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteCollege(id);
    UI.toast('info', 'College Tossed', 'College entry crumpled into paper ball and tossed!');
    Router.render();
  });
}

function openAddCollegeModal() {
  const html = `
    <h3>🎓 Add New Indian College / Institute</h3>
    <form onsubmit="saveCollegeForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">College / University Name</label>
        <input type="text" id="c-name" class="chat-input" placeholder="e.g. IIIT Hyderabad or IISER Pune" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Educational Field</label>
          <select id="c-field" class="chat-input">
            <option value="Engineering & Tech">Engineering & Tech</option>
            <option value="Medicine & Healthcare">Medicine & Healthcare</option>
            <option value="Business & Management">Business & Management</option>
            <option value="Law">Law</option>
            <option value="Pure Sciences">Pure Sciences</option>
            <option value="Design & Arts">Design & Arts</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">City & State</label>
          <input type="text" id="c-loc" class="chat-input" placeholder="e.g. Hyderabad, Telangana" required>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">NIRF Rank / Tier</label>
          <input type="text" id="c-rank" class="chat-input" value="#15 Engineering (Tier 1)">
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Avg Placement LPA</label>
          <input type="text" id="c-place" class="chat-input" value="₹16.5 LPA">
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Entrance Exam</label>
          <input type="text" id="c-exam" class="chat-input" value="JEE Main / DASA">
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Tuition Fees</label>
          <input type="text" id="c-tuit" class="chat-input" value="₹3.0 Lakh/yr">
        </div>
      </div>
      ${UI.pillButton({ text: 'Save College Entry', icon: '<i class="fas fa-graduation-cap"></i>', theme: 'cyan', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}

function saveCollegeForm(e) {
  e.preventDefault();
  const name = document.getElementById('c-name').value;
  const field = document.getElementById('c-field').value;
  const location = document.getElementById('c-loc').value;
  const nirfRank = document.getElementById('c-rank').value;
  const avgPlacement = document.getElementById('c-place').value;
  const exam = document.getElementById('c-exam').value;
  const tuition = document.getElementById('c-tuit').value;

  Store.addCollege({ name, field, location, nirfRank, avgPlacement, exam, tuition });
  UI.closeModal();
  ActionPhysics.gradCapLaunch(name);
  UI.toast('success', 'College Added! 🎓✨', `Saved ${name} in Directory with 3D graduation cap launch!`);
  Router.render();
}


// ─── 2. REAL-TIME SCHOLARSHIPS PORTAL ────────────────────────
function StudentScholarshipsPage() {
  const scholarships = Store.get('indianScholarships') || [];
  const types = ['All', 'Government', 'Private CSR'];

  const filteredScholarships = scholarships.filter(s => {
    const matchesType = currentScholarshipTypeFilter === 'All' || s.type === currentScholarshipTypeFilter;
    const matchesSearch = !scholarshipSearchQuery ||
      s.name.toLowerCase().includes(scholarshipSearchQuery.toLowerCase()) ||
      s.provider.toLowerCase().includes(scholarshipSearchQuery.toLowerCase()) ||
      s.eligibility.toLowerCase().includes(scholarshipSearchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const content = `
    <div class="student-scholarships-page">
      ${UI.sectionHeader(
        '🏆 Indian Government & Corporate CSR Scholarships',
        'Official scholarships from Govt of India, Tata Trusts, Reliance Foundation, and corporate CSR programs with direct portal redirects.',
        `<button class="btn btn-success btn-sm" onclick="openAddScholarshipModal()"><i class="fas fa-plus"></i> Add Scholarship</button>`
      )}

      <!-- Search & Filter Bar -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:16px;">
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <div style="flex:1;position:relative;">
            <i class="fas fa-search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-muted);"></i>
            <input type="text" class="chat-input" style="padding-left:40px;height:42px;" placeholder="Search scholarships by provider, scheme name, or eligibility..." value="${scholarshipSearchQuery}" oninput="onScholarshipSearch(this.value)">
          </div>
          <button class="btn btn-outline btn-sm" onclick="searchWebScholarships(scholarshipSearchQuery)" data-tooltip="Search NSP, Buddy4Study & Govt portals"><i class="fas fa-globe"></i> Search Web Sources</button>
          <button class="btn btn-success btn-sm" onclick="openAddScholarshipModal()"><i class="fas fa-trophy"></i> Add Scholarship</button>
        </div>

        <div style="display:flex;gap:8px;">
          ${types.map(t => `
            <button class="btn ${currentScholarshipTypeFilter === t ? 'btn-success' : 'btn-secondary'} btn-sm" onclick="setScholarshipTypeFilter('${t}')">
              ${t} Scholarships
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Scholarships Grid -->
      <div class="grid grid-2" style="gap:20px;">
        ${filteredScholarships.length === 0 ? `
          <div style="grid-column:span 2;text-align:center;padding:40px;color:var(--text-muted);">
            <i class="fas fa-award" style="font-size:36px;margin-bottom:10px;color:var(--emerald);"></i>
            <p>No scholarships found. Try adjusting your query or filter!</p>
          </div>
        ` : filteredScholarships.map(s => `
          <div id="sch-card-${s.id}" class="card card-glass card-hover" style="display:flex;flex-direction:column;justify-content:space-between;padding:24px;position:relative;transition:all 0.2s ease;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <span class="badge ${s.type === 'Government' ? 'badge-success' : 'badge-primary'}">${s.type}</span>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-family:var(--font-mono);font-weight:800;font-size:16px;color:var(--emerald);">${s.amount}</span>
                  <button class="btn-delete-epic btn-delete-sm" onclick="deleteScholarshipItem('${s.id}', this.closest('#sch-card-${s.id}'))" data-tooltip="Crumple & Toss Scholarship">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
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

function onScholarshipSearch(val) { scholarshipSearchQuery = val; Router.render(); }
function setScholarshipTypeFilter(t) { currentScholarshipTypeFilter = t; Router.render(); }

function deleteScholarshipItem(id, element) {
  const el = element || document.getElementById(`sch-card-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteScholarship(id);
    UI.toast('info', 'Scholarship Tossed', 'Scholarship entry crumpled into paper ball and tossed!');
    Router.render();
  });
}

function openAddScholarshipModal() {
  const html = `
    <h3>🏆 Add New Scholarship Program</h3>
    <form onsubmit="saveScholarshipForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Scholarship Name</label>
        <input type="text" id="sch-name" class="chat-input" placeholder="e.g. HDFC Parivartan ECSS Scholarship" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Scholarship Type</label>
          <select id="sch-type" class="chat-input">
            <option value="Government">Government</option>
            <option value="Private CSR">Private CSR</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Grant Amount</label>
          <input type="text" id="sch-amt" class="chat-input" value="₹75,000 / year" required>
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Provider Trust / Foundation</label>
        <input type="text" id="sch-prov" class="chat-input" value="HDFC Bank Foundation">
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Eligibility Requirements</label>
        <input type="text" id="sch-elig" class="chat-input" value="Class 12th / UG Students, Income <₹6.0 LPA">
      </div>
      ${UI.pillButton({ text: 'Save Scholarship Program', icon: '<i class="fas fa-trophy"></i>', theme: 'emerald', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}

function saveScholarshipForm(e) {
  e.preventDefault();
  const name = document.getElementById('sch-name').value;
  const type = document.getElementById('sch-type').value;
  const amount = document.getElementById('sch-amt').value;
  const provider = document.getElementById('sch-prov').value;
  const eligibility = document.getElementById('sch-elig').value;

  Store.addScholarship({ name, type, amount, provider, eligibility });
  UI.closeModal();
  ActionPhysics.trophyShine(name, amount);
  UI.toast('success', 'Scholarship Tracked! 🏆🌟', `3D Gold Trophy awarded! Tracked ${name}.`);
  Router.render();
}


// ─── 3. REAL-TIME INTERNSHIPS PORTAL ─────────────────────────
function StudentInternshipsPage() {
  const internships = Store.get('indianInternships') || [];
  const types = ['All', 'Government', 'Corporate Tech', 'Fintech Unicorn'];

  const filteredInternships = internships.filter(i => {
    const matchesType = currentInternshipTypeFilter === 'All' || i.type === currentInternshipTypeFilter;
    const matchesSearch = !internshipSearchQuery ||
      i.title.toLowerCase().includes(internshipSearchQuery.toLowerCase()) ||
      i.company.toLowerCase().includes(internshipSearchQuery.toLowerCase()) ||
      i.location.toLowerCase().includes(internshipSearchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const content = `
    <div class="student-internships-page">
      ${UI.sectionHeader(
        '💼 Real-Time Student Internships (Govt & Corporate)',
        'Explore policy, research, and tech internships at NITI Aayog, ISRO, PM Internship Scheme 2026, Google, Microsoft, and tech startups.',
        `<button class="btn btn-primary btn-sm" onclick="openAddInternshipModal()"><i class="fas fa-plus"></i> Add Internship</button>`
      )}

      <!-- Search & Filter Bar -->
      <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:16px;">
        <div style="display:flex;gap:12px;margin-bottom:12px;">
          <div style="flex:1;position:relative;">
            <i class="fas fa-search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-muted);"></i>
            <input type="text" class="chat-input" style="padding-left:40px;height:42px;" placeholder="Search internships by company, role title, or city..." value="${internshipSearchQuery}" oninput="onInternshipSearch(this.value)">
          </div>
          <button class="btn btn-outline btn-sm" onclick="searchWebInternships(internshipSearchQuery)" data-tooltip="Search PM Internship Portal, ISRO & Google Careers"><i class="fas fa-globe"></i> Search Web Sources</button>
          <button class="btn btn-primary btn-sm" onclick="openAddInternshipModal()"><i class="fas fa-briefcase"></i> Add Internship</button>
        </div>

        <div style="display:flex;gap:8px;">
          ${types.map(t => `
            <button class="btn ${currentInternshipTypeFilter === t ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="setInternshipTypeFilter('${t}')">
              ${t}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Internships Grid -->
      <div class="grid grid-2" style="gap:20px;">
        ${filteredInternships.length === 0 ? `
          <div style="grid-column:span 2;text-align:center;padding:40px;color:var(--text-muted);">
            <i class="fas fa-briefcase" style="font-size:36px;margin-bottom:10px;color:var(--cyan);"></i>
            <p>No internships found matching your query. Try adjusting filters!</p>
          </div>
        ` : filteredInternships.map(i => `
          <div id="int-card-${i.id}" class="card card-glass card-hover" style="display:flex;flex-direction:column;justify-content:space-between;padding:24px;position:relative;transition:all 0.2s ease;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <span class="badge ${i.type === 'Government' ? 'badge-success' : 'badge-info'}">${i.type}</span>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-family:var(--font-mono);font-weight:800;font-size:15px;color:var(--cyan);">${i.stipend}</span>
                  <button class="btn-delete-epic btn-delete-sm" onclick="deleteInternshipItem('${i.id}', this.closest('#int-card-${i.id}'))" data-tooltip="Crumple & Toss Internship">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
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
              <i class="fas fa-external-link-alt"></i> Redirect to Application
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return UI.dashboardLayout('/student/internships', content);
}

function onInternshipSearch(val) { internshipSearchQuery = val; Router.render(); }
function setInternshipTypeFilter(t) { currentInternshipTypeFilter = t; Router.render(); }

function deleteInternshipItem(id, element) {
  const el = element || document.getElementById(`int-card-${id}`);
  DeleteEngine.tossAndDelete(el, () => {
    Store.deleteInternship(id);
    UI.toast('info', 'Internship Tossed', 'Internship entry crumpled into paper ball and tossed!');
    Router.render();
  });
}

function openAddInternshipModal() {
  const html = `
    <h3>💼 Add New Internship Opportunity</h3>
    <form onsubmit="saveInternshipForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Role Title</label>
        <input type="text" id="int-title" class="chat-input" placeholder="e.g. AI Research Intern or Policy Analyst" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Company / Ministry</label>
          <input type="text" id="int-comp" class="chat-input" placeholder="e.g. ISRO or Google India" required>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Type</label>
          <select id="int-type" class="chat-input">
            <option value="Government">Government</option>
            <option value="Corporate Tech">Corporate Tech</option>
            <option value="Fintech Unicorn">Fintech Unicorn</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Stipend</label>
          <input type="text" id="int-stip" class="chat-input" value="₹50,000 / month">
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Duration</label>
          <input type="text" id="int-dur" class="chat-input" value="3 Months">
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Location</label>
        <input type="text" id="int-loc" class="chat-input" value="Bengaluru / Remote">
      </div>
      ${UI.pillButton({ text: 'Track Internship Opportunity', icon: '<i class="fas fa-rocket"></i>', theme: 'cyan', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}

function saveInternshipForm(e) {
  e.preventDefault();
  const title = document.getElementById('int-title').value;
  const company = document.getElementById('int-comp').value;
  const type = document.getElementById('int-type').value;
  const stipend = document.getElementById('int-stip').value;
  const duration = document.getElementById('int-dur').value;
  const location = document.getElementById('int-loc').value;

  Store.addInternship({ title, company, type, stipend, duration, location });
  UI.closeModal();
  ActionPhysics.rocketLaunch(company, title);
  UI.toast('success', 'Internship Tracked! 🚀🔥', `3D Rocket launched for ${title} at ${company}!`);
  Router.render();
}

// ─── Exam Countdown & Syllabus Roadmap Engine ─────────────
function renderExamsTracker() {
  const exams = Store.get('exams') || [];
  if (!exams.length) return '';

  return `
    <div class="card card-glass" style="margin-bottom:var(--space-xl);padding:20px;background:linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08));border:1px solid rgba(0,242,254,0.3);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <h3 style="margin:0;display:flex;align-items:center;gap:8px;font-size:16px;">
          <i class="fas fa-bullseye" style="color:var(--cyan);"></i> Competitive Exams Countdown & Syllabus Tracker
        </h3>
        <button class="btn btn-ghost btn-sm" onclick="openAddExamModal()"><i class="fas fa-plus"></i> Track New Exam</button>
      </div>

      <div class="grid grid-3" style="gap:16px;">
        ${exams.map(e => {
          const target = new Date(e.targetDate);
          const now = new Date();
          const diffDays = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
          return `
            <div style="padding:14px;background:rgba(15,23,42,0.85);border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                <span style="font-weight:700;font-size:13px;color:#fff;">${e.name}</span>
                <span class="badge badge-primary" style="font-size:10px;font-family:var(--font-mono);">${diffDays} Days Left</span>
              </div>
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">Target: ${e.targetScore} • Date: ${e.targetDate}</div>
              
              <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px;">
                <span style="color:var(--text-secondary);">Syllabus Covered</span>
                <span style="color:var(--cyan);font-weight:700;">${e.syllabusProgress}%</span>
              </div>
              <div class="progress-bar" style="margin-bottom:8px;">
                <div class="progress-fill" style="width:${e.syllabusProgress}%;background:var(--gradient-accent);"></div>
              </div>
              <input type="range" class="bio-slider" min="0" max="100" value="${e.syllabusProgress}" oninput="updateExamProgressVal('${e.id}', this.value)" data-tooltip="Drag to update syllabus %">
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function updateExamProgressVal(id, val) {
  Store.updateExamProgress(id, val);
  Router.render();
}

function openAddExamModal() {
  const html = `
    <h3>🎯 Track Competitive Exam or Certification</h3>
    <form onsubmit="saveExamForm(event)" style="display:flex;flex-direction:column;gap:14px;margin-top:16px;">
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Exam / Certification Name</label>
        <input type="text" id="ex-name" class="chat-input" placeholder="e.g. GATE CSE 2027 or CAT 2026 or AWS Pro" required>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Exam Target Date</label>
          <input type="date" id="ex-date" class="chat-input" value="2027-02-01" required>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);">Current Syllabus %</label>
          <input type="number" id="ex-prog" class="chat-input" value="35" min="0" max="100" required>
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);">Target Score / Rank</label>
        <input type="text" id="ex-score" class="chat-input" value="AIR < 100" required>
      </div>
      ${UI.pillButton({ text: 'Track Exam Roadmap', icon: '<i class="fas fa-bullseye"></i>', theme: 'purple', type: 'submit' })}
    </form>
  `;
  UI.modal(html);
}

function saveExamForm(e) {
  e.preventDefault();
  const name = document.getElementById('ex-name').value;
  const targetDate = document.getElementById('ex-date').value;
  const syllabusProgress = document.getElementById('ex-prog').value;
  const targetScore = document.getElementById('ex-score').value;

  Store.addExam({ name, targetDate, syllabusProgress, targetScore });
  UI.closeModal();
  if (typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('wand');
  UI.toast('success', 'Exam Tracked! 🎯', `Roadmap milestone set for ${name}.`);
  Router.render();
}

// ─── Side-by-Side College Comparison Tool ─────────────────
function openCollegeCompareModal() {
  const colleges = Store.get('indianColleges') || [];
  const c1 = colleges[0] || {};
  const c2 = colleges[1] || {};
  const c3 = colleges[14] || {}; // IIIT Hyderabad

  const html = `
    <div style="max-width:760px;">
      <h3 style="margin-bottom:6px;"><i class="fas fa-balance-scale" style="color:var(--cyan);"></i> All-India College Comparison Matrix</h3>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:16px;">Side-by-side benchmark of top NIRF ranked institutes, avg placements, fees, and entrance cutoff routes.</p>
      
      <div style="overflow-x:auto;">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>${c1.name || 'IIT Bombay'}</th>
              <th>${c2.name || 'IIT Delhi'}</th>
              <th>${c3.name || 'IIIT Hyderabad'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>NIRF Ranking</strong></td>
              <td><span class="badge badge-primary">${c1.nirfRank}</span></td>
              <td><span class="badge badge-primary">${c2.nirfRank}</span></td>
              <td><span class="badge badge-info">${c3.nirfRank}</span></td>
            </tr>
            <tr>
              <td><strong>Avg Placement</strong></td>
              <td style="color:var(--emerald);font-weight:700;">${c1.avgPlacement}</td>
              <td style="color:var(--emerald);font-weight:700;">${c2.avgPlacement}</td>
              <td style="color:var(--emerald);font-weight:700;">${c3.avgPlacement}</td>
            </tr>
            <tr>
              <td><strong>Tuition / Year</strong></td>
              <td>${c1.tuition}</td>
              <td>${c2.tuition}</td>
              <td>${c3.tuition}</td>
            </tr>
            <tr>
              <td><strong>Entrance Exam</strong></td>
              <td><span class="badge badge-purple">${c1.exam}</span></td>
              <td><span class="badge badge-purple">${c2.exam}</span></td>
              <td><span class="badge badge-purple">${c3.exam}</span></td>
            </tr>
            <tr>
              <td><strong>Location</strong></td>
              <td>${c1.location}</td>
              <td>${c2.location}</td>
              <td>${c3.location}</td>
            </tr>
            <tr>
              <td><strong>Action</strong></td>
              <td><button class="btn btn-outline btn-sm" onclick="window.open('${c1.applyLink}', '_blank')">Apply</button></td>
              <td><button class="btn btn-outline btn-sm" onclick="window.open('${c2.applyLink}', '_blank')">Apply</button></td>
              <td><button class="btn btn-outline btn-sm" onclick="window.open('${c3.applyLink}', '_blank')">Apply</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  UI.modal(html);
}

function searchWebColleges(query) {
  const searchTerm = query ? `${query} admission portal NIRF ranking 2026` : 'Top NIRF Indian Colleges Admissions 2026';
  window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
}

function searchWebScholarships(query) {
  const searchTerm = query ? `${query} scholarship apply portal India 2026` : 'National Scholarship Portal NSP Buddy4Study Tata Trusts Scholarships India 2026';
  window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
}

function searchWebInternships(query) {
  const searchTerm = query ? `${query} internship apply portal 2026` : 'PM Internship Scheme 2026 NITI Aayog Google ISRO Internship apply India';
  window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
}

window.onCollegeSearch = onCollegeSearch;
window.setCollegeFieldFilter = setCollegeFieldFilter;
window.setCollegeTierFilter = setCollegeTierFilter;
window.deleteCollegeItem = deleteCollegeItem;
window.openAddCollegeModal = openAddCollegeModal;
window.saveCollegeForm = saveCollegeForm;
window.searchWebColleges = searchWebColleges;
window.openCollegeCompareModal = openCollegeCompareModal;
window.openAddExamModal = openAddExamModal;
window.saveExamForm = saveExamForm;
window.updateExamProgressVal = updateExamProgressVal;

window.onScholarshipSearch = onScholarshipSearch;
window.setScholarshipTypeFilter = setScholarshipTypeFilter;
window.deleteScholarshipItem = deleteScholarshipItem;
window.openAddScholarshipModal = openAddScholarshipModal;
window.saveScholarshipForm = saveScholarshipForm;
window.searchWebScholarships = searchWebScholarships;

window.onInternshipSearch = onInternshipSearch;
window.setInternshipTypeFilter = setInternshipTypeFilter;
window.deleteInternshipItem = deleteInternshipItem;
window.openAddInternshipModal = openAddInternshipModal;
window.saveInternshipForm = saveInternshipForm;
window.searchWebInternships = searchWebInternships;

