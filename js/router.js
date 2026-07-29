/* ═══════════════════════════════════════════════════════════════════
   LIFEGPS ROUTER — SPA Client-Side Router & Reactive View Engine
   ═══════════════════════════════════════════════════════════════════ */

const Router = {
  routes: {},
  currentRoute: null,

  register(path, handler) {
    this.routes[path] = handler;
  },

  render() {
    if (!this.currentRoute) return;
    const handler = this.routes[this.currentRoute];
    if (handler) {
      const app = document.getElementById('app');
      if (app) {
        const page = handler();
        if (typeof page === 'string') {
          app.innerHTML = page;
        } else if (page instanceof HTMLElement) {
          app.innerHTML = '';
          app.appendChild(page);
        }
        this._initPage(this.currentRoute);
      }
    }
  },

  refresh() {
    this.render();
  },

  navigate(path, pushState = true) {
    if (this.currentRoute === path) {
      this.render();
      return;
    }

    // Auth guard
    const publicRoutes = ['/', '/pricing', '/auth/login', '/auth/register', '/auth/forgot-password'];
    if (!publicRoutes.includes(path) && !Store.isLoggedIn()) {
      this.navigate('/auth/login');
      return;
    }

    // Onboarding guard
    if (Store.isLoggedIn() && !Store.isOnboarded()) {
      const onboardingRoutes = ['/onboarding/identity', '/onboarding/profile', '/onboarding/goals', '/onboarding/complete'];
      if (!onboardingRoutes.includes(path) && !publicRoutes.includes(path) && path !== '/auth/login' && path !== '/auth/register') {
        this.navigate('/onboarding/identity');
        return;
      }
    }

    const app = document.getElementById('app');

    // Page exit animation
    if (this.currentRoute && app && app.firstChild) {
      app.firstChild.classList?.add('page-exit');
    }

    setTimeout(() => {
      this.currentRoute = path;
      if (pushState) {
        history.pushState({ path }, '', `#${path}`);
      }

      const handler = this.routes[path];
      if (handler) {
        app.innerHTML = '';
        const page = handler();
        if (typeof page === 'string') {
          app.innerHTML = page;
        } else if (page instanceof HTMLElement) {
          app.appendChild(page);
        }
        // Page enter animation
        if (app.firstChild) {
          app.firstChild.classList?.add('page-enter');
        }
        // Scroll to top
        window.scrollTo(0, 0);
        // Init page scripts
        this._initPage(path);
      } else {
        app.innerHTML = this._notFoundPage();
      }
    }, this.currentRoute ? 100 : 0);
  },

  _initPage(path) {
    // Intersection observer for reveal animations
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(el);
      });

      // Counter animations
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        this._animateCount(el, 0, target, 1500);
      });
    }, 100);
  },

  _animateCount(el, start, end, duration) {
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  _notFoundPage() {
    return `
      <div class="auth-page">
        <div class="auth-card" style="text-align:center;">
          <div style="font-size:64px;margin-bottom:16px;">🗺️</div>
          <h2>Page Not Found</h2>
          <p style="margin:16px 0;">The page you're looking for doesn't exist or has been moved.</p>
          <button class="btn btn-primary btn-full" onclick="Router.navigate('/')">Go Home</button>
        </div>
      </div>
    `;
  },

  _getHashPath() {
    return window.location.hash.replace(/^#/, '') || '/';
  },

  init() {
    // Reactive subscription: auto-render view on any Store state update
    Store.subscribe(() => {
      this.render();
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      const path = e.state?.path || this._getHashPath() || '/';
      this.navigate(path, false);
    });

    // Handle initial route
    const initialPath = this._getHashPath() || '/';
    this.navigate(initialPath, false);
  }
};
