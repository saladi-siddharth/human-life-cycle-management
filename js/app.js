/* ============================================================
   APP.JS — Main Application Entry Point
   ============================================================ */

const App = {
  init() {
    // Initialize store
    Store.init();

    // Register routes
    this._registerRoutes();

    // Listen to Supabase auth changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        Store.reset();
        Router.navigate('/');
      } else if (event === 'SIGNED_IN' && session) {
        Store.set('user', session.user);
        if (session.user.user_metadata?.appState) {
          try {
            const savedState = JSON.parse(session.user.user_metadata.appState);
            Store._state = Store._deepMerge(Store._state, savedState);
            Store._persist();
          } catch(e) { console.error('Failed to parse appState from Supabase', e); }
        } else if (session.user.user_metadata?.identityType && !Store.get('identityType')) {
          Store.set('identityType', session.user.user_metadata.identityType);
        }
        
        // Auto-redirect from public auth pages if already logged in and onboarded
        if (Store.isOnboarded && (window.location.hash === '#/auth' || window.location.hash === '#/identity')) {
          Router.navigate('/dashboard');
        }
      }
    });

    // Navigation guard
    Router.beforeEach((to, from) => {
      // Allow public routes
      const publicRoutes = ['/', '/auth', '/identity', '/pricing'];
      if (publicRoutes.includes(to)) return true;

      // Check auth state
      const isAuthed = !!Store.get('user');

      if (!isAuthed && to !== '/onboarding') {
        return '/auth';
      }

      // If not onboarded, redirect to identity
      if (!Store.identityType && to !== '/onboarding') {
        return '/identity';
      }

      // If onboarding not complete, redirect to onboarding
      if (to !== '/onboarding' && !Store.isOnboarded && Store.identityType) {
        return '/onboarding';
      }

      return true;
    });

    // Check initial session before routing
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        Store.set('user', session.user);
        if (session.user.user_metadata?.appState) {
          try {
            const savedState = JSON.parse(session.user.user_metadata.appState);
            Store._state = Store._deepMerge(Store._state, savedState);
            Store._persist();
          } catch(e) { console.error('Failed to parse appState from Supabase', e); }
        } else if (session.user.user_metadata?.identityType && !Store.get('identityType')) {
          Store.set('identityType', session.user.user_metadata.identityType);
        }
      }
      // Initialize router
      Router.init();
    });
  },

  _registerRoutes() {
    // Public pages
    Router.register('/', (container) => LandingPage.render(container));
    Router.register('/auth', (container) => AuthPage.render(container));
    Router.register('/identity', (container) => IdentityPage.render(container));
    Router.register('/onboarding', (container) => OnboardingPage.render(container));

    // Dashboard pages (need app shell)
    const dashboardPages = {
      '/dashboard': DashboardPage,
      '/career': CareerPage,
      '/health': HealthPage,
      '/finance': FinancePage,
      '/work': WorkPage,
      '/life': LifePage,
      '/coach': CoachPage,
      '/settings': SettingsPage,
    };

    for (const [route, page] of Object.entries(dashboardPages)) {
      Router.register(route, (container) => {
        this._renderAppShell(container);
        page.render(container);
      });
    }

    // Pricing can be both public and in-app
    Router.register('/pricing', (container) => {
      if (Store.isOnboarded) {
        this._renderAppShell(container);
      }
      PricingPage.render(container);
    });
  },

  _renderAppShell(container) {
    // Only re-render shell if it's not already there
    if (!container.querySelector('.sidebar')) {
      container.innerHTML = `
        ${Navigation.render()}
        <main class="main-content">
          <div class="page-content"></div>
        </main>
      `;
      Navigation.init();
      Router._updateActiveLink();
    }
  },

  // Toast notification system
  showToast(type, title, message, duration = 4000) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const icons = {
      success: '✓',
      warning: '⚠',
      error: '✕',
      info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span class="toast__icon">${icons[type] || 'ℹ'}</span>
      <div class="toast__content">
        <div class="toast__title">${title}</div>
        ${message ? `<div class="toast__message">${message}</div>` : ''}
      </div>
      <span class="toast__close" onclick="this.parentElement.remove()">✕</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast--exit');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// Boot the app
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
