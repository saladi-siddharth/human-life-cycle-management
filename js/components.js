/* ═══════════════════════════════════════════════════════════════════
   LIFEGPS COMPONENTS — Reusable UI Component Generators
   ═══════════════════════════════════════════════════════════════════ */

const UI = {
  // ─── Toast Notifications ─────────────────────────────
  toast(type, title, message, duration = 4000) {
    const container = document.getElementById('toast-container');
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // ─── Modal ────────────────────────────────────────────
  modal(content) {
    const overlay = document.getElementById('modal-overlay');
    const contentEl = document.getElementById('modal-content');
    contentEl.style.position = 'relative';
    const closeBtn = `<button class="btn btn-ghost btn-sm" style="position:absolute;top:14px;right:14px;font-size:16px;z-index:10;" onclick="UI.closeModal()">✕</button>`;
    contentEl.innerHTML = closeBtn + (typeof content === 'string' ? content : '');
    if (content instanceof HTMLElement) {
      contentEl.innerHTML = closeBtn;
      contentEl.appendChild(content);
    }
    overlay.classList.remove('hidden');
    overlay.onclick = (e) => {
      if (e.target === overlay) UI.closeModal();
    };
  },

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('hidden');
  },


  // ─── Topbar (Public) ──────────────────────────────────
  publicTopbar() {
    return `
      <nav class="topbar" id="topbar">
        <a class="topbar-brand" onclick="Router.navigate('/')">
          <span class="brand-icon">🧭</span>
          <span class="brand-text">LifeGPS</span>
        </a>
        <div class="topbar-nav" id="topbar-nav">
          <a class="topbar-link" onclick="Router.navigate('/')">Home</a>
          <a class="topbar-link" onclick="Router.navigate('/pricing')">Pricing</a>
          <a class="topbar-link" onclick="Router.navigate('/auth/login')">Login</a>
        </div>
        <div class="topbar-actions">
          <button class="btn btn-primary btn-sm" onclick="Router.navigate('/auth/register')">
            Get Started Free
          </button>
          <button class="mobile-menu-btn" onclick="document.getElementById('topbar-nav').classList.toggle('open')">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    `;
  },

  // ─── Topbar (Authenticated) ───────────────────────────
  authTopbar() {
    const state = Store.getState();
    const initials = Store.getInitials();
    const unread = state.notifications.filter(n => n.unread).length;
    return `
      <nav class="topbar" id="topbar">
        <button class="btn btn-ghost btn-icon btn-sm" onclick="Store.set('sidebarOpen', !Store.get('sidebarOpen')); document.getElementById('sidebar')?.classList.toggle('open')" style="margin-right:8px;">
          <i class="fas fa-bars"></i>
        </button>
        <a class="topbar-brand" onclick="Router.navigate('/dashboard')">
          <span class="brand-icon">🧭</span>
          <span class="brand-text">LifeGPS</span>
        </a>
        <div class="topbar-nav" id="topbar-nav">
          <a class="topbar-link" onclick="Router.navigate('/dashboard')">Dashboard</a>
          <a class="topbar-link" onclick="Router.navigate('/dashboard/coach')">AI Coach</a>
        </div>
        <div class="topbar-actions">
          <button class="btn btn-ghost btn-icon btn-sm" onclick="Router.navigate('/dashboard/notifications')" data-tooltip="Notifications" style="position:relative;">
            <i class="fas fa-bell"></i>
            ${unread > 0 ? `<span style="position:absolute;top:4px;right:4px;width:8px;height:8px;border-radius:50%;background:var(--rose);"></span>` : ''}
          </button>
          <div class="dropdown">
            <div class="avatar" style="cursor:pointer;" onclick="this.parentElement.querySelector('.dropdown-menu').classList.toggle('hidden')">${initials}</div>
            <div class="dropdown-menu hidden">
              <div style="padding:10px 14px;border-bottom:1px solid var(--glass-border);margin-bottom:4px;">
                <div style="font-weight:600;font-size:14px;">${state.profile.name || 'User'}</div>
                <div style="font-size:12px;color:var(--text-muted);">${state.profile.email || ''}</div>
              </div>
              <button class="dropdown-item" onclick="Router.navigate('/dashboard/settings')"><i class="fas fa-cog"></i> Settings</button>
              <button class="dropdown-item" onclick="Router.navigate('/dashboard/billing')"><i class="fas fa-credit-card"></i> Billing</button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" onclick="Store.logout(); Router.navigate('/'); UI.toast('info','Signed Out','You have been logged out.');" style="color:var(--rose);">
                <i class="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  },

  // ─── Sidebar ──────────────────────────────────────────
  sidebar(activePath) {
    const identity = Store.get('identity');
    const unread = Store.getState().notifications.filter(n => n.unread).length;

    const mainLinks = [
      { path: '/dashboard', icon: 'fas fa-th-large', label: 'Overview' },
      { path: '/dashboard/career', icon: 'fas fa-rocket', label: 'Career' },
      { path: '/dashboard/health', icon: 'fas fa-heartbeat', label: 'Health' },
      { path: '/dashboard/finance', icon: 'fas fa-wallet', label: 'Finance' },
      { path: '/dashboard/work', icon: 'fas fa-briefcase', label: 'Work' },
      { path: '/dashboard/life', icon: 'fas fa-star', label: 'Life Success' },
    ];

    let identityLinks = [];
    if (identity === 'student') {
      identityLinks = [
        { path: '/student/colleges', icon: 'fas fa-university', label: 'Colleges' },
        { path: '/student/scholarships', icon: 'fas fa-award', label: 'Scholarships' },
        { path: '/student/internships', icon: 'fas fa-id-badge', label: 'Internships' },
      ];
    } else if (identity === 'employee') {
      identityLinks = [
        { path: '/employee/jobs', icon: 'fas fa-search', label: 'Job Search' },
        { path: '/employee/salary', icon: 'fas fa-dollar-sign', label: 'Salary' },
        { path: '/employee/mobility', icon: 'fas fa-level-up-alt', label: 'Mobility' },
      ];
    } else if (identity === 'business') {
      identityLinks = [
        { path: '/business/overview', icon: 'fas fa-chart-pie', label: 'Business' },
        { path: '/business/fundraising', icon: 'fas fa-hand-holding-usd', label: 'Fundraising' },
        { path: '/business/team', icon: 'fas fa-users', label: 'Team' },
      ];
    }

    const toolLinks = [
      { path: '/dashboard/coach', icon: 'fas fa-robot', label: 'AI Coach' },
      { path: '/dashboard/notifications', icon: 'fas fa-bell', label: 'Notifications', badge: unread },
      { path: '/dashboard/settings', icon: 'fas fa-cog', label: 'Settings' },
    ];

    const renderLink = (l) => `
      <a class="sidebar-link ${activePath === l.path ? 'active' : ''}" onclick="Router.navigate('${l.path}')">
        <i class="link-icon ${l.icon}"></i>
        <span>${l.label}</span>
        ${l.badge ? `<span class="link-badge">${l.badge}</span>` : ''}
      </a>
    `;

    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-title">Main</div>
          ${mainLinks.map(renderLink).join('')}
        </div>
        ${identityLinks.length ? `
          <div class="sidebar-section">
            <div class="sidebar-title">${identity === 'student' ? 'Student' : identity === 'employee' ? 'Employee' : 'Business'}</div>
            ${identityLinks.map(renderLink).join('')}
          </div>
        ` : ''}
        <div class="sidebar-section">
          <div class="sidebar-title">Tools</div>
          ${toolLinks.map(renderLink).join('')}
        </div>
        <div class="sidebar-footer">
          <div class="sidebar-link" onclick="Router.navigate('/dashboard/billing')">
            <i class="link-icon fas fa-gem" style="color:var(--amber);"></i>
            <span>Upgrade to Pro</span>
          </div>
        </div>
      </aside>
    `;
  },

  // ─── Dashboard Page Wrapper ───────────────────────────
  dashboardLayout(activePath, content) {
    return `
      ${this.authTopbar()}
      ${this.sidebar(activePath)}
      <main class="main-content">
        ${content}
      </main>
    `;
  },

  // ─── Stat Card ────────────────────────────────────────
  statCard(icon, label, value, trend, trendDir, color) {
    return `
      <div class="card-stat hover-lift">
        <div class="stat-icon" style="background:${color}22;color:${color};">
          ${icon}
        </div>
        <div class="stat-value" style="color:${color};">${value}</div>
        <div class="stat-label">${label}</div>
        ${trend ? `<div class="stat-trend ${trendDir}">
          <i class="fas fa-arrow-${trendDir === 'up' ? 'up' : 'down'}"></i> ${trend}
        </div>` : ''}
      </div>
    `;
  },

  // ─── Progress Ring ────────────────────────────────────
  progressRing(percent, size = 120, strokeWidth = 8, color = '#6366f1') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    return `
      <div class="progress-ring" style="width:${size}px;height:${size}px;">
        <svg width="${size}" height="${size}">
          <circle class="progress-ring-track" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}"/>
          <circle class="progress-ring-fill" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}"
            stroke="${color}" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
            style="transition: stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1);"/>
        </svg>
        <div class="progress-ring-value" style="color:${color};">${percent}%</div>
      </div>
    `;
  },

  // ─── Progress Bar ─────────────────────────────────────
  progressBar(label, value, max, color = 'var(--gradient-primary)') {
    const percent = Math.round((value / max) * 100);
    return `
      <div style="margin-bottom:12px;">
        <div class="progress-label">
          <span>${label}</span>
          <span>${percent}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${percent}%;background:${color};"></div>
        </div>
      </div>
    `;
  },

  // ─── Section Header ──────────────────────────────────
  sectionHeader(title, subtitle, action) {
    return `
      <div class="page-header">
        <div class="page-header-info">
          <h1>${title}</h1>
          ${subtitle ? `<p>${subtitle}</p>` : ''}
        </div>
        ${action ? `<div class="page-header-actions">${action}</div>` : ''}
      </div>
    `;
  },

  // ─── Empty State ──────────────────────────────────────
  emptyState(icon, title, description, actionLabel, actionHandler) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${description}</p>
        ${actionLabel ? `<button class="btn btn-primary" onclick="${actionHandler}">${actionLabel}</button>` : ''}
      </div>
    `;
  },

  // ─── Particles Background ────────────────────────────
  particles(count = 30) {
    let html = '<div class="particles">';
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = 15 + Math.random() * 15;
      const size = 2 + Math.random() * 4;
      const opacity = 0.1 + Math.random() * 0.3;
      html += `<div class="particle" style="left:${x}%;bottom:-10px;width:${size}px;height:${size}px;opacity:${opacity};animation-delay:${delay}s;animation-duration:${duration}s;"></div>`;
    }
    html += '</div>';
    return html;
  },

  // ─── Real-Time Recommendation Banner ─────────────────
  recommendationBanner(icon, title, recommendation, actionLabel, actionHandler) {
    return `
      <div class="recommendation-banner">
        <div class="recommendation-content">
          <div class="recommendation-icon">${icon}</div>
          <div>
            <div style="font-weight:700;font-size:var(--text-sm);color:var(--indigo-light);">${title}</div>
            <div style="font-size:var(--text-xs);color:var(--text-secondary);">${recommendation}</div>
          </div>
        </div>
        ${actionLabel ? `<button class="btn btn-primary btn-sm" onclick="${actionHandler}">${actionLabel}</button>` : ''}
      </div>
    `;
  }
};

