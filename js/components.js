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

    // Attach Live Interactive Typing Audio & Particle Feedback to Form Inputs
    setTimeout(() => {
      if (typeof ActionPhysics !== 'undefined') {
        ActionPhysics.attachTypingFeedback(contentEl);
      }
    }, 50);
  },

  // ─── Quantum Coil Pill Submit Button Generator ────────
  pillButton({
    text = 'Submit Details',
    icon = '<i class="fas fa-arrow-right"></i>',
    theme = 'cyan', // cyan | emerald | amber | purple
    type = 'button',
    fullWidth = true,
    onClick = '',
    id = '',
    extraClass = ''
  } = {}) {
    if (typeof PillButton !== 'undefined' && PillButton.create) {
      return PillButton.create({ text, icon, theme, type, fullWidth, onClick, id, extraClass });
    }
    const fullClass = fullWidth ? 'pill-full' : '';
    const idAttr = id ? `id="${id}"` : '';
    const clickAttr = onClick ? `onclick="${onClick}"` : '';

    return `
      <div class="pill pill--${theme} ${fullClass} ${extraClass}" ${idAttr} data-state="idle" ${clickAttr}>
        <span class="pill__cta">
          <svg class="pill__coil"></svg>
          <span class="pill__plate">
            <span class="pill__label">${text}</span>
            ${icon ? `<span class="pill__icon">${icon}</span>` : ''}
          </span>
          <span class="pill__status">
            <span class="pill__spinner"></span>
            <span class="pill__success-text"><i class="fas fa-check"></i> Success!</span>
          </span>
          <button type="${type}" aria-label="${text}"></button>
        </span>
      </div>
    `;
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
          <span class="brand-icon">🧬</span>
          <span class="brand-text">BioVerse</span>
        </a>
        <div class="topbar-nav" id="topbar-nav">
          <a class="topbar-link" onclick="Router.navigate('/')">Home</a>
          <a class="topbar-link" onclick="Router.navigate('/pricing')">Pricing</a>
          <a class="topbar-link" onclick="Router.navigate('/auth/login')">Login</a>
        </div>
        <div class="topbar-actions" style="display:flex; align-items:center; gap:8px;">
          ${typeof i18n !== 'undefined' ? i18n.renderLanguageSwitcher() : ''}
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
  authTopbar(showSidebarToggle = true) {
    const state = Store.getState();
    const initials = Store.getInitials();
    const identity = Store.get('identity') || 'student';
    const unread = state.notifications.filter(n => n.unread).length;

    const roleBadgeNames = {
      student: '🎓 Student Hub',
      employee: '💼 Professional Hub',
      business: '🏢 Founder & Business Hub'
    };

    return `
      <nav class="topbar" id="topbar" style="display:flex; justify-content:space-between; align-items:center; padding:0 24px;">
        <div style="display:flex; align-items:center; gap:12px;">
          ${showSidebarToggle ? `
            <button class="btn btn-ghost btn-icon btn-sm" onclick="Store.set('sidebarOpen', !Store.get('sidebarOpen')); document.getElementById('sidebar')?.classList.toggle('open')">
              <i class="fas fa-bars"></i>
            </button>
          ` : ''}
          <a class="topbar-brand" onclick="Router.navigate('/dashboard')" style="display:flex; align-items:center; gap:8px; cursor:pointer;">
            <span class="brand-icon">🧬</span>
            <span class="brand-text">BioVerse</span>
          </a>
          <span class="badge badge-primary" style="font-size:11px; padding:4px 10px; border-radius:999px; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); color:var(--cyan); font-weight:700;">
            ${roleBadgeNames[identity] || '🧬 Life Hub'}
          </span>
        </div>

        <!-- Right Aligned Actions & Profile -->
        <div class="topbar-actions" style="display:flex; align-items:center; gap:10px; margin-left:auto;">
          <!-- Spotlight Command Palette Trigger -->
          <button class="btn btn-ghost btn-sm" onclick="CommandPalette.open()" data-tooltip="Quick Command (Ctrl+K)" style="font-size:12px; font-weight:600; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:5px 10px; display:flex; align-items:center; gap:8px; color:#cbd5e1; cursor:pointer;">
            <i class="fas fa-search" style="color:var(--cyan);"></i>
            <span>Search...</span>
            <kbd style="font-size:10px; font-family:monospace; background:rgba(255,255,255,0.1); padding:2px 5px; border-radius:4px; color:#94a3b8;">⌘K</kbd>
          </button>

          <!-- Quick Return to Overview -->
          <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/dashboard')" data-tooltip="Dashboard Overview" style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px;">
            <i class="fas fa-th-large"></i> <span>Overview</span>
          </button>

          <!-- 3D Continuum Launch -->
          <a href="/continuum.html" target="_blank" class="btn btn-ghost btn-sm" data-tooltip="Launch 3D Continuum Pavilion" style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; color:#c084fc; border:1px solid rgba(192,132,252,0.3); border-radius:999px; padding:4px 12px; text-decoration:none;">
            <i class="fas fa-cube" style="color:#c084fc;"></i> <span>3D Continuum</span>
          </a>

          <!-- Pan-India Language Switcher -->
          ${typeof i18n !== 'undefined' ? i18n.renderLanguageSwitcher() : ''}

          <!-- Notifications Tray -->
          <button class="btn btn-ghost btn-icon btn-sm" onclick="Router.navigate('/dashboard/notifications')" data-tooltip="Notifications" style="position:relative;">
            <i class="fas fa-bell"></i>
            ${unread > 0 ? `<span style="position:absolute; top:4px; right:4px; width:8px; height:8px; border-radius:50%; background:var(--rose);"></span>` : ''}
          </button>

          <!-- User Avatar Menu (Neatly Aligned on the Right) -->
          <div class="dropdown">
            <div class="avatar" style="cursor:pointer; background:linear-gradient(135deg, #00f2fe 0%, #6366f1 100%); color:#070a14; font-weight:800; border:2px solid rgba(255,255,255,0.2);" onclick="this.parentElement.querySelector('.dropdown-menu').classList.toggle('hidden')">
              ${initials}
            </div>
            <div class="dropdown-menu hidden" style="right:0; left:auto; min-width:230px;">
              <div style="padding:12px 14px; border-bottom:1px solid var(--glass-border); margin-bottom:4px;">
                <div style="font-weight:700; font-size:14px; color:#fff;">${state.profile.name || 'User'}</div>
                <div style="font-size:11.5px; color:var(--text-muted);">${state.profile.email || ''}</div>
                <span class="badge badge-primary" style="font-size:10px; margin-top:6px; display:inline-block;">Track: ${identity.toUpperCase()}</span>
              </div>
              <button class="dropdown-item" onclick="Router.navigate('/dashboard')"><i class="fas fa-th-large"></i> Master Dashboard</button>
              <button class="dropdown-item" onclick="Router.navigate('/dashboard/career')"><i class="fas fa-rocket"></i> Career & ATS Resume</button>
              <button class="dropdown-item" onclick="Router.navigate('/dashboard/health')"><i class="fas fa-heartbeat"></i> Health & AI Diet</button>
              <button class="dropdown-item" onclick="Router.navigate('/dashboard/settings')"><i class="fas fa-cog"></i> Profile Settings</button>
              <button class="dropdown-item" onclick="Router.navigate('/dashboard/billing')"><i class="fas fa-credit-card"></i> Billing & Plans</button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" onclick="Store.logout(); Router.navigate('/'); UI.toast('info','Signed Out','You have been safely logged out.');" style="color:var(--rose);">
                <i class="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      ${this.telemetryTicker()}
    `;
  },

  // ─── Live Cyberpunk Bio-Telemetry Marquee ──────────────
  telemetryTicker() {
    const scores = Store.get('scores') || {};
    const finances = Store.get('finances') || {};
    const health = Store.get('health') || {};
    const tasks = Store.get('tasks') || [];
    const completedTasks = tasks.filter(t => t.completed).length;
    const velocity = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 92;

    return `
      <div class="bio-telemetry-ticker-bar" style="background:rgba(6,9,18,0.95); border-bottom:1px solid rgba(0,242,254,0.18); overflow:hidden; white-space:nowrap; padding:5px 0; font-family:var(--font-mono, monospace); font-size:11px; color:#94a3b8; display:flex; align-items:center;">
        <div class="ticker-content" style="display:inline-flex; gap:32px; animation: tickerMarquee 40s linear infinite;">
          <span><strong style="color:#10b981;">● TiDB CLOUD:</strong> CONNECTED (TLS 1.2 • 14ms)</span>
          <span><strong style="color:#00f2fe;">💧 HYDRATION:</strong> ${health.waterIntake || 2100}ml (${Math.min(100, Math.round(((health.waterIntake || 2100) / 2500) * 100))}%)</span>
          <span><strong style="color:#ec4899;">⚡ VELOCITY:</strong> ${velocity}% EXECUTION</span>
          <span><strong style="color:#fbbf24;">💰 MONTHLY INCOME:</strong> ₹${Number(finances.monthlyIncome || 100000).toLocaleString()}</span>
          <span><strong style="color:#c084fc;">🧬 MASTER LIFE SCORE:</strong> ${scores.life || 86}/100 <span style="color:#10b981;">▲ +4.2%</span></span>
          <span><strong style="color:#38bdf8;">🧠 AI LIFE COACH:</strong> GEMINI NEURAL ACTIVE</span>
          <span><strong style="color:#10b981;">🔒 DPDP ACT 2023:</strong> VAULT SECURED</span>
        </div>
      </div>
    `;
  },

  // ─── Sidebar ──────────────────────────────────────────
  sidebar(activePath) {
    const identity = Store.get('identity') || 'student';
    const unread = Store.getState().notifications.filter(n => n.unread).length;

    // Home is removed from sidebar links
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
      { href: '/continuum.html', icon: 'fas fa-cubes', label: '3D Continuum', target: '_blank', badge: '3D', color: '#c084fc' },
      { path: '/dashboard/coach', icon: 'fas fa-robot', label: 'AI Coach' },
      { path: '/dashboard/notifications', icon: 'fas fa-bell', label: 'Notifications', badge: unread },
      { path: '/dashboard/settings', icon: 'fas fa-cog', label: 'Settings' },
    ];

    const renderLink = (l) => l.href ? `
      <a class="sidebar-link" href="${l.href}" ${l.target ? `target="${l.target}"` : ''} style="color: ${l.color || 'var(--gold, #ead9b8)'};">
        <i class="link-icon ${l.icon}" style="color: ${l.color || 'var(--gold, #ead9b8)'};"></i>
        <span>${l.label}</span>
        ${l.badge ? `<span class="link-badge" style="background:rgba(192,132,252,0.25); color:#c084fc; border:1px solid rgba(192,132,252,0.4);">${l.badge}</span>` : ''}
      </a>
    ` : `
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
    // If on specialized student, employee, or business dedicated hubs, completely remove the sidebar
    const isRoleHub = activePath.startsWith('/student') || activePath.startsWith('/employee') || activePath.startsWith('/business');
    
    if (isRoleHub) {
      return `
        ${this.authTopbar(false)}
        <main class="main-content full-cockpit-layout" style="margin-left:0; width:100%; max-width:1380px; margin:0 auto; padding:28px 24px;">
          ${content}
        </main>
      `;
    }

    return `
      ${this.authTopbar(true)}
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
  },

  // ─── Aceternity UI Aurora Background ────────────────
  aurora() {
    return `<div class="aurora-bg"></div>`;
  },

  // ─── Aceternity UI Meteor Effects ────────────────────
  meteors(count = 15) {
    let html = '<div class="meteors-container" style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1;">';
    for (let i = 0; i < count; i++) {
      const top = Math.floor(Math.random() * 80) - 20;
      const left = Math.floor(Math.random() * 100) + 10;
      const delay = (Math.random() * 5).toFixed(2);
      const duration = (Math.random() * 4 + 3).toFixed(2);
      const width = Math.floor(Math.random() * 80 + 40);
      html += `<span class="meteor" style="top:${top}%;left:${left}%;animation-delay:${delay}s;animation-duration:${duration}s;width:${width}px;"></span>`;
    }
    html += '</div>';
    return html;
  },

  // ─── Magic UI Marquee Loop Component ────────────────
  marquee(items = []) {
    const listHtml = items.map(item => `
      <div class="card-glass hover-lift" style="padding:12px 24px;border-radius:9999px;white-space:nowrap;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
        <span style="font-size:18px;">${item.icon || '✨'}</span>
        <span style="font-weight:600;font-size:14px;color:var(--text-primary);">${item.text}</span>
        ${item.sub ? `<span style="font-size:12px;color:var(--indigo-light);background:rgba(99,102,241,0.15);padding:2px 8px;border-radius:12px;">${item.sub}</span>` : ''}
      </div>
    `).join('');

    return `
      <div class="marquee-container" style="margin:24px 0;">
        <div class="marquee-track">
          ${listHtml}
          ${listHtml}
        </div>
      </div>
    `;
  },

  // ─── Epic Delete Button Helper ───────────────────────
  deleteButton(id, clickHandler, label = '', isSm = true) {
    return `
      <button class="btn-delete-epic ${isSm ? 'btn-delete-sm' : ''}" onclick="${clickHandler}" data-tooltip="Crumple & Delete Item">
        <i class="fas fa-trash-alt"></i> ${label}
      </button>
    `;
  },

  // ─── Lottie Submit Button Helper ──────────────────────
  lottieSubmitButton(opts = {}) {
    if (typeof LottieSubmit !== 'undefined') {
      return LottieSubmit.create(opts);
    }
    return `<button type="submit" class="btn btn-primary btn-lg">Submit</button>`;
  }
};

// ─── Global Topbar Interactive Handlers ──────────────────
function switchPersonaMode(mode) {
  Store.setIdentity(mode);
  if (typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('wand');
  UI.toast('info', `Persona: ${mode.toUpperCase()} Active`, `Nav links, domain tools & AI coach prompt library updated.`);
  Router.render();
}

function toggleAppSound() {
  const enabled = Store.toggleSound();
  if (enabled && typeof ActionPhysics !== 'undefined') ActionPhysics.playSound('wand');
  UI.toast('info', enabled ? '🔊 Sound FX Enabled' : '🔇 Sound FX Muted', enabled ? 'Audio micro-interactions active.' : 'Audio muted.');
  Router.render();
}

window.switchPersonaMode = switchPersonaMode;
window.toggleAppSound = toggleAppSound;


