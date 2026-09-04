const fs = require('fs');
const path = require('path');

const mockCtx = new Proxy({}, {
  get: (target, prop) => {
    if (prop === 'canvas') return { width: 800, height: 600 };
    return () => {};
  }
});

// Mock browser environment
global.window = {
  location: { hash: '#/dashboard', protocol: 'http:', origin: 'http://localhost:3000' },
  addEventListener: () => {},
  scrollTo: () => {},
  document: null,
  requestAnimationFrame: (cb) => setTimeout(cb, 16),
  cancelAnimationFrame: () => {},
  innerWidth: 1200,
  innerHeight: 800,
  devicePixelRatio: 1
};
global.requestAnimationFrame = global.window.requestAnimationFrame;
global.cancelAnimationFrame = global.window.cancelAnimationFrame;

global.document = {
  getElementById: (id) => ({
    innerHTML: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    appendChild: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    getContext: () => mockCtx,
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 800, height: 600, right: 800, bottom: 600 }),
    addEventListener: () => {}
  }),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {},
  createElement: (tag) => ({
    style: {},
    classList: { add: () => {}, remove: () => {} },
    appendChild: () => {},
    getContext: () => mockCtx,
    addEventListener: () => {}
  }),
  body: { appendChild: () => {}, style: {}, addEventListener: () => {} }
};
global.window.document = global.document;
global.localStorage = {
  _store: {},
  getItem(key) { return this._store[key] || null; },
  setItem(key, val) { this._store[key] = String(val); },
  removeItem(key) { delete this._store[key]; },
  clear() { this._store = {}; }
};
global.sessionStorage = { ...global.localStorage, _store: {} };
global.window.localStorage = global.localStorage;
global.window.sessionStorage = global.sessionStorage;
global.navigator = { userAgent: 'node', language: 'en-US' };
global.history = { pushState: () => {} };
global.IntersectionObserver = class { observe() {} unobserve() {} };
global.MutationObserver = class { observe() {} disconnect() {} };

const scripts = [
  'js/store.js',
  'js/delete-engine.js',
  'js/water-physics.js',
  'js/action-physics.js',
  'js/ai-predictive.js',
  'js/pdf-export.js',
  'js/billing-engine.js',
  'js/vision-engine.js',
  'js/push-notifications.js',
  'js/gamification.js',
  'js/audio-soundscape.js',
  'js/i18n.js',
  'js/account-aggregator.js',
  'js/morning-brief.js',
  'js/email.js',
  'js/ai.js',
  'js/router.js',
  'js/components.js',
  'js/components/pill-button.js',
  'js/components/lottie-submit-button.js',
  'js/components/tour.js',
  'js/charts.js',
  // Pages
  'js/pages/landing.js',
  'js/pages/auth.js',
  'js/pages/onboarding.js',
  'js/pages/dashboard.js',
  'js/pages/career.js',
  'js/pages/health.js',
  'js/pages/finance.js',
  'js/pages/work.js',
  'js/pages/life.js',
  'js/pages/coach.js',
  'js/pages/student.js',
  'js/pages/employee.js',
  'js/pages/business.js',
  'js/pages/admin.js',
  'js/pages/settings.js',
  'js/pages/notifications.js',
  'js/pages/billing.js',
  'js/pages/pricing.js',
  'js/constellation-mesh.js',
  'js/card-tilt.js',
  'js/command-palette.js',
  'js/app.js'
];

const allCode = scripts.map(s => {
  const p = path.join(__dirname, '..', s);
  if (fs.existsSync(p)) {
    return fs.readFileSync(p, 'utf8');
  }
  return '';
}).join('\n;\n') + '\n; return { Router, Store, UI };';

try {
  const { Router, Store, UI } = (new Function(allCode))();

  console.log(`\nRegistered ${Object.keys(Router.routes).length} routes in Router.`);

  let successCount = 0;
  let failCount = 0;

  for (const [route, handler] of Object.entries(Router.routes)) {
    try {
      const output = handler();
      if (!output) {
        throw new Error('Handler returned empty/null output');
      }
      successCount++;
      console.log(`✓ Route [${route}] rendered successfully`);
    } catch (e) {
      console.error(`✗ Route [${route}] failed to render:`, e.message);
      failCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Route Render Results: ${successCount} PASSED, ${failCount} FAILED`);
  console.log(`========================================\n`);
  process.exit(failCount > 0 ? 1 : 0);
} catch (err) {
  console.error('Execution error:', err);
  process.exit(1);
}
