/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE SPOTLIGHT COMMAND PALETTE ENGINE (Ctrl + K / Cmd + K)
   Ultra-Fast Fuzzy Search, Quick Action Shortcuts & Keyboard Navigation
   ═══════════════════════════════════════════════════════════════════ */

const CommandPalette = {
  isOpen: false,
  selectedIndex: 0,
  filteredItems: [],

  COMMANDS: [
    // 🧭 1. Navigation
    { id: 'nav_dash', category: 'Navigation', icon: 'fas fa-th-large', title: 'Dashboard Overview', shortcut: 'G D', action: () => Router.navigate('/dashboard') },
    { id: 'nav_career', category: 'Navigation', icon: 'fas fa-briefcase', title: 'Career & Skills Matrix', shortcut: 'G C', action: () => Router.navigate('/dashboard/career') },
    { id: 'nav_health', category: 'Navigation', icon: 'fas fa-heartbeat', title: 'Health & Vitality Tracker', shortcut: 'G H', action: () => Router.navigate('/dashboard/health') },
    { id: 'nav_finance', category: 'Navigation', icon: 'fas fa-wallet', title: 'Finance & Wealth Ledger', shortcut: 'G F', action: () => Router.navigate('/dashboard/finance') },
    { id: 'nav_work', category: 'Navigation', icon: 'fas fa-tasks', title: 'Work & Eisenhower Matrix', shortcut: 'G W', action: () => Router.navigate('/dashboard/work') },
    { id: 'nav_life', category: 'Navigation', icon: 'fas fa-compass', title: 'Life Success & Milestones', shortcut: 'G L', action: () => Router.navigate('/dashboard/life') },
    { id: 'nav_student', category: 'Navigation', icon: 'fas fa-graduation-cap', title: 'Student Colleges & Scholarships', action: () => Router.navigate('/student/colleges') },
    { id: 'nav_biz', category: 'Navigation', icon: 'fas fa-building', title: 'Founder & Venture Command', action: () => Router.navigate('/business/overview') },
    { id: 'nav_coach', category: 'Navigation', icon: 'fas fa-robot', title: 'AI Life Coach Co-Pilot', action: () => Router.navigate('/dashboard/coach') },
    { id: 'nav_settings', category: 'Navigation', icon: 'fas fa-cog', title: 'Settings & DPDP Vault', action: () => Router.navigate('/dashboard/settings') },
    { id: 'nav_3d', category: 'Navigation', icon: 'fas fa-cubes', title: 'Launch 3D Life Continuum', action: () => window.open('/continuum.html', '_blank') },

    // ⚡ 2. Quick Actions
    { id: 'act_water', category: 'Quick Action', icon: 'fas fa-tint', color: '#00f2fe', title: 'Quick Hydrate (+250ml Water)', action: () => { quickAddWater(250); UI.toast('success', '💧 Hydrated +250ml', 'Added to daily intake.'); } },
    { id: 'act_workout', category: 'Quick Action', icon: 'fas fa-dumbbell', color: '#10b981', title: 'Log Daily Physical Workout', action: () => openWorkoutModal() },
    { id: 'act_sleep', category: 'Quick Action', icon: 'fas fa-moon', color: '#c084fc', title: 'Log Circadian Sleep Hours', action: () => openSleepModal() },
    { id: 'act_tx', category: 'Quick Action', icon: 'fas fa-coins', color: '#fbbf24', title: 'Add Ledger Financial Entry', action: () => openTransactionModal() },
    { id: 'act_task', category: 'Quick Action', icon: 'fas fa-check-circle', color: '#38bdf8', title: 'Schedule Priority Work Task', action: () => openTaskModal() },
    { id: 'act_skill', category: 'Quick Action', icon: 'fas fa-rocket', color: '#ec4899', title: 'Add Career Mastery Skill', action: () => openAddSkillModal() },
    { id: 'act_pdf', category: 'Quick Action', icon: 'fas fa-file-pdf', color: '#10b981', title: 'Export Life Audit Dossier (PDF)', action: () => LifeAuditExporter.exportPDF() },
    { id: 'act_aa', category: 'Quick Action', icon: 'fas fa-university', color: '#fbbf24', title: 'Sync RBI Account Aggregator', action: () => AccountAggregator.openConsentModal() }
  ],

  init() {
    this.createDOM();
    this.bindKeyboardShortcuts();
  },

  createDOM() {
    let overlay = document.getElementById('bioverse-command-palette-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'bioverse-command-palette-overlay';
      overlay.className = 'command-palette-overlay hidden';
      overlay.innerHTML = `
        <div class="command-palette-modal">
          <div class="command-palette-header">
            <i class="fas fa-search command-search-icon"></i>
            <input type="text" id="command-palette-input" class="command-palette-input" placeholder="Type a command, search pillar, or habit... (Esc to close)" autocomplete="off">
            <span class="command-palette-badge">ESC</span>
          </div>
          <div class="command-palette-results" id="command-palette-results"></div>
          <div class="command-palette-footer">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const input = overlay.querySelector('#command-palette-input');
      input.addEventListener('input', (e) => this.filterCommands(e.target.value));

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }
  },

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Toggle Command Palette (Ctrl + K / Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
        return;
      }

      if (!this.isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % Math.max(1, this.filteredItems.length);
        this.renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.filteredItems.length) % Math.max(1, this.filteredItems.length);
        this.renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = this.filteredItems[this.selectedIndex];
        if (selected) {
          this.execute(selected);
        }
      }
    });
  },

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  },

  open() {
    this.isOpen = true;
    const overlay = document.getElementById('bioverse-command-palette-overlay');
    const input = document.getElementById('command-palette-input');
    if (overlay && input) {
      overlay.classList.remove('hidden');
      input.value = '';
      this.filterCommands('');
      setTimeout(() => input.focus(), 50);
      if (typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('wand');
    }
  },

  close() {
    this.isOpen = false;
    const overlay = document.getElementById('bioverse-command-palette-overlay');
    if (overlay) overlay.classList.add('hidden');
  },

  filterCommands(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.filteredItems = [...this.COMMANDS];
    } else {
      this.filteredItems = this.COMMANDS.filter(cmd => 
        cmd.title.toLowerCase().includes(q) || 
        cmd.category.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    this.renderResults();
  },

  renderResults() {
    const container = document.getElementById('command-palette-results');
    if (!container) return;

    if (this.filteredItems.length === 0) {
      container.innerHTML = `
        <div class="command-empty-state">
          <div style="font-size:32px;margin-bottom:8px;">🔍</div>
          <div>No matching commands found.</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Try searching for "Water", "Career", "PDF", or "Workout"</div>
        </div>
      `;
      return;
    }

    let html = '';
    let lastCat = '';

    this.filteredItems.forEach((item, idx) => {
      if (item.category !== lastCat) {
        lastCat = item.category;
        html += `<div class="command-category-title">${lastCat}</div>`;
      }

      const isSelected = idx === this.selectedIndex;
      html += `
        <div class="command-item ${isSelected ? 'selected' : ''}" onclick="CommandPalette.executeByIndex(${idx})">
          <div class="command-item-left">
            <div class="command-icon" style="color: ${item.color || 'var(--cyan)'};">
              <i class="${item.icon}"></i>
            </div>
            <span class="command-title">${item.title}</span>
          </div>
          ${item.shortcut ? `<span class="command-shortcut"><kbd>${item.shortcut}</kbd></span>` : ''}
        </div>
      `;
    });

    container.innerHTML = html;

    // Scroll selected item into view
    const selectedEl = container.querySelector('.command-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  },

  executeByIndex(idx) {
    const item = this.filteredItems[idx];
    if (item) this.execute(item);
  },

  execute(item) {
    this.close();
    if (typeof item.action === 'function') {
      setTimeout(() => item.action(), 100);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CommandPalette.init());
} else {
  CommandPalette.init();
}

window.CommandPalette = CommandPalette;
