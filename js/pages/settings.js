/* ═══════════════════════════════════════════════════════════════════
   SETTINGS PAGE — Gemini API Config, Data Export/Import & Printable Audit
   ═══════════════════════════════════════════════════════════════════ */

function SettingsPage() {
  const profile = Store.get('profile') || {};
  const apiKey = Store.get('apiSettings.geminiKey') || '';

  const content = `
    <div class="settings-page">
      ${UI.sectionHeader(
        'Account & System Preferences',
        'Configure AI API integrations, export local JSON backups, and generate full PDF life reports.'
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

        <!-- 2. Data Backup & Local Export/Import -->
        <div class="card card-glass">
          <h3 style="margin:0 0 16px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-database" style="color:var(--cyan);"></i> Data Backup & Recovery</h3>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:14px;">
            LifeGPS is local-first. You own your data. Download a JSON snapshot or restore from a previous backup file.
          </p>

          <div style="display:flex;flex-direction:column;gap:10px;">
            <button class="btn btn-secondary" onclick="Store.exportJSON()"><i class="fas fa-download"></i> Export JSON Backup</button>
            <input type="file" id="import-json-file" style="display:none;" accept=".json" onchange="handleJSONImport(event)">
            <button class="btn btn-outline" onclick="document.getElementById('import-json-file').click()"><i class="fas fa-upload"></i> Import JSON Backup</button>
          </div>
        </div>

        <!-- 3. Comprehensive Printable Life Audit Report -->
        <div class="card card-glass" style="grid-column: span 2;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <h3 style="margin:0;display:flex;align-items:center;gap:8px;"><i class="fas fa-file-pdf" style="color:var(--purple);"></i> Generate Full Life Audit & Action Plan</h3>
              <p style="margin:4px 0 0 0;font-size:var(--text-xs);color:var(--text-secondary);">
                Creates a beautiful, print-ready document containing your 5 domain scores, health logs, double-entry financial ledger, and active goals.
              </p>
            </div>
            <button class="btn btn-accent" onclick="window.print()"><i class="fas fa-print"></i> Print / Download PDF Report</button>
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

