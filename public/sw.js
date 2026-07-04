// Minimal service worker shared by all public tenant routes (tarjeta/landing/portafolio/cv).
// Its only purpose is to satisfy PWA installability — it does NOT cache anything, since each
// route's content is per-tenant and can change at any time (editing a card, publishing a CV...).
// Caching would risk showing a stale card/landing/portfolio/cv after the tenant updates it.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
