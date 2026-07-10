/* ============================================================
   SPA ROUTER — Hash-based Client-Side Routing
   ============================================================ */

const Router = {
  routes: {},
  currentRoute: null,
  beforeHooks: [],

  init() {
    window.addEventListener('hashchange', () => this._handleRoute());
    window.addEventListener('load', () => this._handleRoute());
  },

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  beforeEach(hook) {
    this.beforeHooks.push(hook);
  },

  _handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];

    // Run before hooks
    for (const hook of this.beforeHooks) {
      const result = hook(path, this.currentRoute);
      if (result === false) return;
      if (typeof result === 'string') {
        this.navigate(result);
        return;
      }
    }

    // Find matching route
    const handler = this.routes[path];
    if (handler) {
      this.currentRoute = path;
      this._transition(handler);
    } else {
      // 404 - redirect to landing
      this.navigate('/');
    }
  },

  _transition(handler) {
    const container = document.getElementById('app');
    if (!container) return;

    // Exit animation
    container.classList.add('page-exit');

    setTimeout(() => {
      container.classList.remove('page-exit');
      handler(container);
      container.classList.add('page-enter');

      setTimeout(() => {
        container.classList.remove('page-enter');
      }, 400);

      // Scroll to top
      window.scrollTo(0, 0);

      // Update active sidebar link
      this._updateActiveLink();
    }, 200);
  },

  _updateActiveLink() {
    document.querySelectorAll('.sidebar__link').forEach(link => {
      link.classList.remove('sidebar__link--active');
      if (link.dataset.route === this.currentRoute) {
        link.classList.add('sidebar__link--active');
      }
    });
  }
};
