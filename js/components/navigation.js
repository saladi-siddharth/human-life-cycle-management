/* ============================================================
   NAVIGATION COMPONENT — Sidebar & Topbar
   ============================================================ */

const Navigation = {
  render() {
    return `
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <aside class="sidebar" id="sidebar">
        <div class="sidebar__brand">
          <div class="sidebar__logo">🧭</div>
          <div>
            <div class="sidebar__app-name">LifeGPS</div>
            <div class="sidebar__app-tagline">Your Life Navigator</div>
          </div>
        </div>

        <nav class="sidebar__nav">
          <div class="sidebar__section-label">Overview</div>
          <a class="sidebar__link" data-route="/dashboard" onclick="Router.navigate('/dashboard')">
            <span class="sidebar__link-icon">📊</span>
            <span>Dashboard</span>
          </a>
          <a class="sidebar__link" data-route="/coach" onclick="Router.navigate('/coach')">
            <span class="sidebar__link-icon">🤖</span>
            <span>AI Coach</span>
            <span class="sidebar__link-badge">AI</span>
          </a>

          <div class="sidebar__section-label">Life Domains</div>
          <a class="sidebar__link" data-route="/career" onclick="Router.navigate('/career')">
            <span class="sidebar__link-icon">🎯</span>
            <span>Career</span>
          </a>
          <a class="sidebar__link" data-route="/health" onclick="Router.navigate('/health')">
            <span class="sidebar__link-icon">💚</span>
            <span>Health</span>
          </a>
          <a class="sidebar__link" data-route="/finance" onclick="Router.navigate('/finance')">
            <span class="sidebar__link-icon">💰</span>
            <span>Finance</span>
          </a>
          <a class="sidebar__link" data-route="/work" onclick="Router.navigate('/work')">
            <span class="sidebar__link-icon">⚡</span>
            <span>Productivity</span>
          </a>
          <a class="sidebar__link" data-route="/life" onclick="Router.navigate('/life')">
            <span class="sidebar__link-icon">🌟</span>
            <span>Life Success</span>
          </a>

          <div class="sidebar__section-label">More</div>
          <a class="sidebar__link" data-route="/pricing" onclick="Router.navigate('/pricing')">
            <span class="sidebar__link-icon">💎</span>
            <span>Pricing</span>
          </a>
          <a class="sidebar__link" data-route="/settings" onclick="Router.navigate('/settings')">
            <span class="sidebar__link-icon">⚙️</span>
            <span>Settings</span>
          </a>
        </nav>

        <div class="sidebar__footer">
          <div class="sidebar__profile" onclick="Router.navigate('/settings')">
            <div class="avatar avatar--sm">${Store.userInitials}</div>
            <div class="sidebar__profile-info">
              <div class="sidebar__profile-name">${Store.userName}</div>
              <div class="sidebar__profile-role">${Store.identityType ? Store.identityType.charAt(0).toUpperCase() + Store.identityType.slice(1) : 'User'}</div>
            </div>
            <span style="color: var(--text-tertiary)">⋯</span>
          </div>
        </div>
      </aside>

      <div class="topbar" id="topbar">
        <div class="topbar__left">
          <div class="topbar__menu-toggle" id="menuToggle" onclick="Navigation.toggleSidebar()">☰</div>
          <h1 class="topbar__page-title" id="pageTitle">Dashboard</h1>
        </div>
        <div class="topbar__right">
          <div class="topbar__search">
            <span style="color: var(--text-tertiary)">🔍</span>
            <input class="topbar__search-input" type="text" placeholder="Search anything..." />
          </div>
          <div class="topbar__icon-btn" data-tooltip="Notifications" onclick="Navigation.toggleNotifications()">
            🔔
            <span class="topbar__notification-dot"></span>
          </div>
          <div class="topbar__icon-btn" onclick="Router.navigate('/settings')">
            ⚙️
          </div>
          <div class="avatar avatar--sm" onclick="Router.navigate('/settings')" style="cursor:pointer">
            ${Store.userInitials}
          </div>
        </div>
      </div>
    `;
  },

  setPageTitle(title) {
    const el = document.getElementById('pageTitle');
    if (el) el.textContent = title;
  },

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('sidebar--open');
    overlay.classList.toggle('sidebar-overlay--visible');
  },

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('sidebar--open');
    overlay.classList.remove('sidebar-overlay--visible');
  },

  toggleNotifications() {
    App.showToast('info', 'Notifications', 'You have 4 new notifications');
  },

  init() {
    // Close sidebar on overlay click
    document.addEventListener('click', (e) => {
      if (e.target.id === 'sidebarOverlay') {
        this.closeSidebar();
      }
    });
  }
};
