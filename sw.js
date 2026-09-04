/* ═══════════════════════════════════════════════════════════════════
   BIOVERSE SERVICE WORKER — Progressive Web App Caching Engine
   ═══════════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'bioverse-v3.4.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/design-system.css',
  '/css/components.css',
  '/css/animations.css',
  '/css/pages.css',
  '/css/pill-button.css',
  '/css/extraordinary-buttons.css',
  '/js/store.js',
  '/js/router.js',
  '/js/components.js',
  '/js/app.js',
  '/js/pdf-export.js',
  '/js/billing-engine.js',
  '/js/vision-engine.js',
  '/js/push-notifications.js',
  '/js/gamification.js',
  '/js/audio-soundscape.js',
  '/js/i18n.js',
  '/js/account-aggregator.js',
  '/js/morning-brief.js',
  '/js/ai-predictive.js',
  '/js/email.js',
  '/js/ai.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('PWA Asset pre-caching notice:', err.message);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Exclude API requests and SSE events from static cache
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic'
        ) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// ─── Push & Notification Click Handlers ────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '🧬 BioVerse Notification';
  const options = {
    body: data.body || 'Your daily life intelligence pulse is ready.',
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>",
    badge: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧬</text></svg>"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('#/dashboard') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/#/dashboard');
      }
    })
  );
});
