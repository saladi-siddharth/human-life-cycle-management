/* ============================================================
   SETTINGS PAGE
   ============================================================ */

const SettingsPage = {
  render(container) {
    Navigation.setPageTitle('Settings');
    const type = Store.identityType || 'student';
    const profile = Store.get('profile') || {};
    const settings = Store.get('settings') || {};
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

    container.querySelector('.page-content').innerHTML = `
      <div class="stagger-in" style="max-width: 800px;">
        <div class="page-header">
          <h2 class="page-header__title">⚙️ Settings</h2>
          <p class="page-header__subtitle">Manage your profile, preferences, and account</p>
        </div>

        <!-- Profile Section -->
        <div class="glass-card mb-6">
          <div class="settings-section">
            <div class="settings-section__title">👤 Profile</div>
            
            <div style="display: flex; align-items: center; gap: var(--space-5); margin-bottom: var(--space-6);">
              <div class="avatar avatar--xl">${Store.userInitials}</div>
              <div>
                <h4>${Store.userName}</h4>
                <p style="color: var(--text-secondary); font-size: var(--text-sm);">${typeLabel} • Member since 2026</p>
                <span class="badge badge--primary mt-2">${typeLabel} Plan</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input class="form-input" type="text" value="${profile.name || ''}" 
                onchange="Store.set('profile.name', this.value)">
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-input" type="email" value="${profile.email || ''}" 
                placeholder="your@email.com"
                onchange="Store.set('profile.email', this.value)">
            </div>

            <div class="form-group">
              <label class="form-label">Identity Type</label>
              <div class="flex gap-3">
                <button class="btn ${type === 'student' ? 'btn--primary' : 'btn--secondary'} btn--sm" 
                  onclick="Store.set('identityType', 'student'); SettingsPage.render(document.getElementById('app'))">🎓 Student</button>
                <button class="btn ${type === 'employee' ? 'btn--primary' : 'btn--secondary'} btn--sm"
                  onclick="Store.set('identityType', 'employee'); SettingsPage.render(document.getElementById('app'))">💼 Employee</button>
                <button class="btn ${type === 'business' ? 'btn--primary' : 'btn--secondary'} btn--sm"
                  onclick="Store.set('identityType', 'business'); SettingsPage.render(document.getElementById('app'))">🚀 Business</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Life Stage</label>
              <select class="form-input form-select" onchange="Store.set('profile.lifeStage', this.value)">
                <option value="exploration" ${profile.lifeStage === 'exploration' ? 'selected' : ''}>🔍 Exploration</option>
                <option value="establishment" ${profile.lifeStage === 'establishment' ? 'selected' : ''}>🏗️ Establishment</option>
                <option value="advancement" ${profile.lifeStage === 'advancement' ? 'selected' : ''}>📈 Advancement</option>
                <option value="maintenance" ${profile.lifeStage === 'maintenance' ? 'selected' : ''}>⚖️ Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div class="glass-card mb-6">
          <div class="settings-section">
            <div class="settings-section__title">🎛️ Preferences</div>

            <div class="settings-row">
              <div>
                <div class="settings-row__label">Push Notifications</div>
                <div class="settings-row__desc">Get alerts for goals, reminders, and milestones</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.notifications ? 'checked' : ''} 
                  onchange="Store.set('settings.notifications', this.checked)">
                <span class="toggle__slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div>
                <div class="settings-row__label">Weekly Email Digest</div>
                <div class="settings-row__desc">Receive a summary of your progress every Monday</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.emailDigest ? 'checked' : ''} 
                  onchange="Store.set('settings.emailDigest', this.checked)">
                <span class="toggle__slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div>
                <div class="settings-row__label">Data Sharing (Anonymized)</div>
                <div class="settings-row__desc">Help improve LifeGPS with anonymized usage data</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${settings.dataSharing ? 'checked' : ''} 
                  onchange="Store.set('settings.dataSharing', this.checked)">
                <span class="toggle__slider"></span>
              </label>
            </div>

            <div class="settings-row">
              <div>
                <div class="settings-row__label">Goal Intensity</div>
                <div class="settings-row__desc">How aggressively should we push you?</div>
              </div>
              <div class="tabs">
                <div class="tab ${profile.goalIntensity === 'conservative' ? 'tab--active' : ''}" 
                  onclick="Store.set('profile.goalIntensity', 'conservative'); SettingsPage.render(document.getElementById('app'))">Gentle</div>
                <div class="tab ${profile.goalIntensity === 'balanced' ? 'tab--active' : ''}"
                  onclick="Store.set('profile.goalIntensity', 'balanced'); SettingsPage.render(document.getElementById('app'))">Balanced</div>
                <div class="tab ${profile.goalIntensity === 'aggressive' ? 'tab--active' : ''}"
                  onclick="Store.set('profile.goalIntensity', 'aggressive'); SettingsPage.render(document.getElementById('app'))">Intense</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data & Privacy -->
        <div class="glass-card mb-6">
          <div class="settings-section">
            <div class="settings-section__title">🔒 Data & Privacy</div>

            <div class="settings-row">
              <div>
                <div class="settings-row__label">Export My Data</div>
                <div class="settings-row__desc">Download all your data as JSON</div>
              </div>
              <button class="btn btn--secondary btn--sm" onclick="SettingsPage.exportData()">Download</button>
            </div>

            <div class="settings-row">
              <div>
                <div class="settings-row__label">Re-run Onboarding</div>
                <div class="settings-row__desc">Go through the onboarding wizard again</div>
              </div>
              <button class="btn btn--secondary btn--sm" onclick="Store.set('onboardingComplete', false); Router.navigate('/identity')">Re-start</button>
            </div>

            <div class="settings-row" style="border-bottom: none;">
              <div>
                <div class="settings-row__label" style="color: var(--color-danger)">Reset All Data</div>
                <div class="settings-row__desc">Delete all data and start fresh</div>
              </div>
              <button class="btn btn--danger btn--sm" onclick="if(confirm('Are you sure? This will delete all your data.')){Store.reset(); Router.navigate('/');}">Reset</button>
            </div>
          </div>
        </div>

        <!-- Subscription -->
        <div class="glass-card">
          <div class="settings-section">
            <div class="settings-section__title">💎 Subscription</div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); background: rgba(108,92,231,0.08); border-radius: var(--radius-lg); border: 1px solid rgba(108,92,231,0.2);">
              <div>
                <div style="font-weight: 600;">Free Plan</div>
                <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Basic features with AI Coach access</div>
              </div>
              <button class="btn btn--primary btn--sm" onclick="Router.navigate('/pricing')">Upgrade →</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  exportData() {
    const data = JSON.stringify(Store.get(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lifegps-data.json';
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('success', 'Data Exported', 'Your data has been downloaded successfully.');
  }
};
