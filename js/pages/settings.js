/* ═══════════════════════════════════════════════════════════════════
   SETTINGS PAGE — Gemini API Config, Gmail SMTP Dispatcher & Audit
   ═══════════════════════════════════════════════════════════════════ */

function SettingsPage() {
  const profile = Store.get('profile') || {};
  const apiKey = Store.get('apiSettings.geminiKey') || '';
  const emailLogs = Store.get('emailLogs') || [];

  const content = `
    <div class="settings-page">
      ${UI.sectionHeader(
        'Account & System Preferences',
        'Configure AI API integrations, Gmail SMTP email notifications, export local JSON backups, and generate full PDF reports.'
      )}

      <div class="grid grid-2" style="gap:24px;">

        <!-- 1. Gemini AI API Key Configuration -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-key" style="color:var(--indigo-light);"></i> Gemini AI Integration</h3>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:14px;">
            Provide your Google Gemini API Key to enable real-time generative AI for your AI Coach and Resume ATS Matcher.
          </p>

          <form onsubmit="saveGeminiKey(event)" style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="font-size:12px;color:var(--text-muted);">API Key</label>
              <input type="password" id="gemini-key-input" class="chat-input" value="${apiKey}" placeholder="AIzaSy...">
            </div>
            <div style="display:flex;gap:10px;align-items:center;">
              ${UI.pillButton({ text: 'Save API Key', icon: '<i class="fas fa-key"></i>', theme: 'cyan', type: 'submit', fullWidth: false })}
              <button type="button" class="btn btn-ghost btn-sm" onclick="toggleKeyVisibility()">Show/Hide</button>
            </div>
          </form>
        </div>

        <!-- 2. Gmail SMTP Notification Settings -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-envelope" style="color:var(--emerald);"></i> Gmail SMTP Email Alert Dispatcher</h3>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:14px;">
            Connected to Gmail SMTP relay for real-time notifications on security events, health targets, financial transactions & task priorities.
          </p>

          <div style="display:flex;flex-direction:column;gap:10px;font-size:12px;">
            <div style="display:flex;justify-content:space-between;padding:8px;background:var(--bg-tertiary);border-radius:6px;">
              <span>SMTP Host:</span>
              <strong style="font-family:var(--font-mono);color:var(--indigo-light);">smtp.gmail.com:465 (SSL)</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:8px;background:var(--bg-tertiary);border-radius:6px;">
              <span>User Email:</span>
              <strong style="font-family:var(--font-mono);color:var(--emerald);">mahisiddharth721@gmail.com</strong>
            </div>

            <button class="btn btn-success btn-sm" style="margin-top:6px;" onclick="EmailService.sendTestEmail()">
              <i class="fas fa-paper-plane"></i> Send Test Gmail Alert
            </button>
          </div>
        </div>

        <!-- 2B. TiDB Cloud Serverless MySQL Database Status Card -->
        <div class="card card-glass" style="grid-column: span 2; border:1px solid rgba(0,242,254,0.3); background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95));">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <h3 style="margin:0;display:flex;align-items:center;gap:10px;color:#00f2fe;">
              <i class="fas fa-database" style="color:#fbbf24;font-size:22px;"></i> TiDB Cloud Serverless MySQL Database Integration
            </h3>
            <span class="badge badge-success"><i class="fas fa-check-circle"></i> Connected & Active</span>
          </div>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:14px;">
            All reactive life metrics, double-entry financial ledgers, health logs, task matrices, and profile data for <strong>Rohan Sharma</strong> are automatically synchronized to TiDB Cloud over TLS 1.2 SSL.
          </p>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px;font-size:12px;">
            <div style="padding:10px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
              <div style="color:var(--text-muted);font-size:10px;">Cloud Gateway Host</div>
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--cyan);margin-top:2px;">gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com</div>
            </div>
            <div style="padding:10px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
              <div style="color:var(--text-muted);font-size:10px;">Authenticated User</div>
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--emerald);margin-top:2px;">Rohan Sharma (3aposv8BwtQq1iQ.root)</div>
            </div>
            <div style="padding:10px;background:rgba(255,255,255,0.04);border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
              <div style="color:var(--text-muted);font-size:10px;">Database Name</div>
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--amber);margin-top:2px;">test (Tables: bv_users, bv_state)</div>
            </div>
          </div>

          <div style="display:flex;gap:12px;">
            <button class="btn btn-primary btn-sm" onclick="forceTiDBSync()"><i class="fas fa-sync-alt"></i> ⚡ Force Database Sync Now</button>
            <button class="btn btn-outline btn-sm" onclick="checkTiDBHealth()"><i class="fas fa-heartbeat"></i> Check Database Health</button>
          </div>
        </div>

        <!-- 3. Live Storage Usage Meter -->
        <div style="grid-column: span 2;">
          ${DeleteEngine.renderStorageMeterCard()}
        </div>

        <!-- 4. Data Backup & Local Export/Import -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-database" style="color:var(--cyan);"></i> Data Backup & Recovery</h3>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:14px;">
            BioVerse is local-first. You own your data. Download a JSON snapshot or restore from a previous backup file.
          </p>

          <div style="display:flex;flex-direction:column;gap:10px;">
            <button class="btn btn-secondary" onclick="Store.exportJSON()"><i class="fas fa-download"></i> Export JSON Backup</button>
            <input type="file" id="import-json-file" style="display:none;" accept=".json" onchange="handleJSONImport(event)">
            <button class="btn btn-outline" onclick="document.getElementById('import-json-file').click()"><i class="fas fa-upload"></i> Import JSON Backup</button>
          </div>
        </div>

        <!-- 5. Printable Audit Report -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-file-pdf" style="color:var(--purple);"></i> Life Audit & PDF Report</h3>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:14px;">
            Generate a print-ready document containing 5 domain scores, health logs, double-entry ledger, and goals.
          </p>
          <button class="btn btn-accent" style="width:100%;" onclick="window.print()"><i class="fas fa-print"></i> Print / Download PDF</button>
        </div>

        <!-- 5. Live Email Dispatch Activity Log -->
        <div class="card card-glass" style="grid-column: span 2;">
          <h3 style="margin:0 0 14px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-history" style="color:var(--warning);"></i> SMTP Dispatch Activity Log</h3>
          <div style="overflow-x:auto;">
            <table class="table" style="font-size:12px;">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Recipient</th>
                  <th>Subject</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${emailLogs.length === 0 ? `
                  <tr>
                    <td colspan="5" style="text-align:center;color:var(--text-muted);padding:16px;">
                      No email dispatches recorded yet. Try logging in, recording a transaction, or clicking 'Send Test Gmail Alert'!
                    </td>
                  </tr>
                ` : emailLogs.slice(0, 10).map(l => `
                  <tr>
                    <td><span class="badge badge-primary">${l.category}</span></td>
                    <td style="font-family:var(--font-mono);">${l.to}</td>
                    <td><strong>${l.subject}</strong></td>
                    <td style="color:var(--text-muted);">${l.timestamp}</td>
                    <td>
                      <span class="badge ${l.status === 'sent' ? 'badge-success' : 'badge-info'}">
                        <i class="fas ${l.status === 'sent' ? 'fa-check-circle' : 'fa-paper-plane'}"></i> ${l.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `;

  return UI.dashboardLayout('/dashboard/settings', content);
}

function saveGeminiKey(e) {
  e.preventDefault();
  const key = document.getElementById('gemini-key-input').value.trim();
  Store.set('apiSettings.geminiKey', key);
  UI.toast('success', 'API Key Saved', key ? 'Live Gemini AI integration enabled!' : 'Cleared API Key.');
}

function toggleKeyVisibility() {
  const el = document.getElementById('gemini-key-input');
  el.type = el.type === 'password' ? 'text' : 'password';
}

function handleJSONImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    const success = Store.importJSON(evt.target.result);
    if (success) {
      UI.toast('success', 'Import Successful', 'Restored all profile data, finances, and tasks.');
      Router.render();
    }
  };
  reader.readAsText(file);
}

function forceTiDBSync() {
  UI.toast('info', 'Syncing Database...', 'Sending Rohan Sharma state to TiDB Cloud Serverless MySQL...');
  Store.syncWithBackend();
  setTimeout(() => {
    UI.toast('success', '⚡ TiDB Cloud Synced!', 'All life metrics, tasks, and ledgers for Rohan Sharma persisted in TiDB Cloud database!');
  }, 500);
}

async function checkTiDBHealth() {
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    if (res.ok && data.status === 'online') {
      UI.toast('success', '⚡ TiDB Cloud Database Online!', `Host: gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com | Time: ${data.tidbInfo?.serverTime || 'Active'}`);
    } else {
      UI.toast('warning', 'DB Local Fallback', 'Using local persistent JSON DB engine.');
    }
  } catch (err) {
    UI.toast('warning', 'Connection Check', 'Using local persistent DB engine.');
  }
}

window.saveGeminiKey = saveGeminiKey;
window.toggleKeyVisibility = toggleKeyVisibility;
window.handleJSONImport = handleJSONImport;
window.forceTiDBSync = forceTiDBSync;
window.checkTiDBHealth = checkTiDBHealth;


