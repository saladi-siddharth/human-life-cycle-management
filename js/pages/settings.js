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
            <div style="display:flex;gap:10px;">
              <button type="submit" class="btn btn-primary btn-sm">Save Key</button>
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
            <div style="display:flex;justify-content:space-between;padding:8px;background:var(--bg-tertiary);border-radius:6px;">
              <span>SMTP App Password:</span>
              <strong style="font-family:var(--font-mono);color:var(--cyan);">mqoqiqzpcfcqvnzp</strong>
            </div>

            <button class="btn btn-success btn-sm" style="margin-top:6px;" onclick="EmailService.sendTestEmail()">
              <i class="fas fa-paper-plane"></i> Send Test Gmail Alert
            </button>
          </div>
        </div>

        <!-- 3. Data Backup & Local Export/Import -->
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

        <!-- 4. Printable Audit Report -->
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

window.saveGeminiKey = saveGeminiKey;
window.toggleKeyVisibility = toggleKeyVisibility;
window.handleJSONImport = handleJSONImport;


