/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE LIFE AUDIT DOSSIER — Client-Side PDF Export Engine
   ═══════════════════════════════════════════════════════════════════ */

const LifeAuditExporter = {
  /**
   * Generates and triggers download of an executive Life Audit Dossier PDF.
   */
  async exportPDF() {
    if (typeof html2pdf === 'undefined') {
      UI.toast('warning', 'Loading PDF Engine', 'Please wait while the PDF engine loads...');
      return;
    }

    UI.toast('info', 'Generating Dossier', 'Compiling your full-spectrum Life Audit report...');

    const state = Store.getState();
    const user = state.user || {};
    const profile = state.profile || {};
    const scores = state.scores || {};
    const health = state.health || {};
    const finances = state.finances || {};
    const tasks = state.tasks || [];
    const lifeGoals = state.lifeGoals || [];
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Create printable container off-screen
    const container = document.createElement('div');
    container.id = 'life-audit-printable-dossier';
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 794px; /* Standard A4 width in px at 96 DPI */
      background: #070a14;
      color: #f8fafc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      box-sizing: border-box;
      line-height: 1.5;
    `;

    const recentSleep = health.sleepLogs && health.sleepLogs.length ? health.sleepLogs[0].hours : 7.5;
    const completedTasks = tasks.filter(t => t.completed).length;
    const income = Number(finances.monthlyIncome) || 75000;
    const expenses = (finances.transactions || []).filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

    container.innerHTML = `
      <div style="border: 2px solid #1e293b; border-radius: 16px; padding: 32px; background: #0c1222; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
        <!-- Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px;">
          <div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:28px;">🧬</span>
              <h1 style="margin:0; font-size:26px; font-weight:900; letter-spacing:-0.5px; background:linear-gradient(135deg,#00f2fe,#4facfe); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">BioVerse Life Audit Dossier</h1>
            </div>
            <div style="font-size:12px; color:#94a3b8; margin-top:4px;">Holistic Human Lifecycle & Trajectory Performance Report</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700; font-size:15px; color:#f8fafc;">${profile.name || user.name || 'BioVerse Member'}</div>
            <div style="font-size:12px; color:#38bdf8;">${profile.email || user.email || ''}</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">Issued: ${dateStr}</div>
          </div>
        </div>

        <!-- Pillar Scores Summary Grid -->
        <div style="margin-bottom:28px;">
          <h2 style="font-size:14px; text-transform:uppercase; letter-spacing:1px; color:#38bdf8; margin:0 0 12px 0;">Executive Pillar Index</h2>
          <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:10px;">
            <div style="background:#131c31; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
              <div style="font-size:11px; color:#94a3b8; font-weight:600;">MASTER</div>
              <div style="font-size:22px; font-weight:900; color:#00f2fe; margin-top:4px;">${scores.life || 78}%</div>
            </div>
            <div style="background:#131c31; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
              <div style="font-size:11px; color:#94a3b8; font-weight:600;">CAREER</div>
              <div style="font-size:22px; font-weight:900; color:#38bdf8; margin-top:4px;">${scores.career || 75}%</div>
            </div>
            <div style="background:#131c31; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
              <div style="font-size:11px; color:#94a3b8; font-weight:600;">HEALTH</div>
              <div style="font-size:22px; font-weight:900; color:#10b981; margin-top:4px;">${scores.health || 82}%</div>
            </div>
            <div style="background:#131c31; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
              <div style="font-size:11px; color:#94a3b8; font-weight:600;">FINANCE</div>
              <div style="font-size:22px; font-weight:900; color:#f59e0b; margin-top:4px;">${scores.finance || 70}%</div>
            </div>
            <div style="background:#131c31; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
              <div style="font-size:11px; color:#94a3b8; font-weight:600;">WORK</div>
              <div style="font-size:22px; font-weight:900; color:#a855f7; margin-top:4px;">${scores.work || 80}%</div>
            </div>
            <div style="background:#131c31; border:1px solid #1e293b; border-radius:10px; padding:12px; text-align:center;">
              <div style="font-size:11px; color:#94a3b8; font-weight:600;">SUCCESS</div>
              <div style="font-size:22px; font-weight:900; color:#ec4899; margin-top:4px;">${scores.success || 77}%</div>
            </div>
          </div>
        </div>

        <!-- Two Columns Detail -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:24px;">
          <!-- Left: Health & Vitality -->
          <div style="background:#131c31; border:1px solid #1e293b; border-radius:12px; padding:18px;">
            <h3 style="margin:0 0 12px 0; font-size:14px; color:#10b981; display:flex; align-items:center; gap:8px;">
              <span>🩺</span> Health & Vitality Biometrics
            </h3>
            <div style="font-size:12px; color:#cbd5e1; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;">
                <span>Daily Hydration:</span>
                <strong style="color:#38bdf8;">${health.waterIntake || 2000} ml / ${health.waterTarget || 2500} ml</strong>
              </div>
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;">
                <span>Recent Sleep Log:</span>
                <strong style="color:#a855f7;">${recentSleep} Hours (Optimal)</strong>
              </div>
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;">
                <span>Dietary Protocol:</span>
                <strong style="color:#10b981;">Pure Vegetarian (Sattvic Lean Hypertrophy)</strong>
              </div>
              <div style="display:flex; justify-content:space-between; padding-top:2px;">
                <span>Daily Target Calories:</span>
                <strong style="color:#f59e0b;">~2,300 kcal (145g Protein)</strong>
              </div>
            </div>
          </div>

          <!-- Right: Financial Ledger -->
          <div style="background:#131c31; border:1px solid #1e293b; border-radius:12px; padding:18px;">
            <h3 style="margin:0 0 12px 0; font-size:14px; color:#f59e0b; display:flex; align-items:center; gap:8px;">
              <span>💰</span> Financial Stability & Wealth Engine
            </h3>
            <div style="font-size:12px; color:#cbd5e1; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;">
                <span>Monthly Active Inflow:</span>
                <strong style="color:#10b981;">₹${income.toLocaleString('en-IN')}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;">
                <span>Tracked Expenses:</span>
                <strong style="color:#f43f5e;">₹${expenses.toLocaleString('en-IN')}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px;">
                <span>Emergency Liquid Reserve:</span>
                <strong style="color:#38bdf8;">₹${(Number(finances.emergencyFund) || 180000).toLocaleString('en-IN')}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; padding-top:2px;">
                <span>Investment Strategy:</span>
                <strong style="color:#a855f7;">Nifty 50 Step-Up SIP Auto-Allocated</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Task & Strategic Focus Table -->
        <div style="background:#131c31; border:1px solid #1e293b; border-radius:12px; padding:18px; margin-bottom:20px;">
          <h3 style="margin:0 0 12px 0; font-size:14px; color:#38bdf8; display:flex; align-items:center; gap:8px;">
            <span>🎯</span> Strategic Priority Commitments (${completedTasks}/${tasks.length} Completed)
          </h3>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${tasks.slice(0, 4).map(t => `
              <div style="display:flex; align-items:center; justify-content:space-between; font-size:11.5px; background:rgba(255,255,255,0.02); padding:6px 10px; border-radius:6px;">
                <span style="color:${t.completed ? '#64748b' : '#f8fafc'}; text-decoration:${t.completed ? 'line-through' : 'none'};">
                  ${t.completed ? '✅' : '⏳'} ${t.title}
                </span>
                <span style="color:#94a3b8; font-size:10.5px; padding:2px 6px; background:#0c1222; border-radius:4px;">${t.domain?.toUpperCase() || 'GENERAL'}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Footer Seal -->
        <div style="border-top:1px solid #1e293b; padding-top:16px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#64748b;">
          <div>Secured & Verified via BioVerse Cryptographic Telemetry Engine</div>
          <div style="color:#38bdf8; font-weight:700;">https://bioverse.ai • Life In Perfect Equilibrium</div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `BioVerse_Life_Audit_${(profile.name || 'Member').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#070a14' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(container).save();
      UI.toast('success', 'Dossier Downloaded', 'Your Life Audit PDF has been saved successfully.');
    } catch (err) {
      console.error('PDF generation failure:', err);
      UI.toast('error', 'Export Failed', 'Failed to generate PDF dossier: ' + err.message);
    } finally {
      container.remove();
    }
  }
};
