const CACHE_NAME = 'livable-pwa-v3';
const STATIC_ASSETS = [
  '/manifest.json',
  '/sarah_avatar.jpg',
  '/icon-192.png',
  '/icon-512.png'
];

// Install Event - Pre-cache static assets safely
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch((err) => {
      console.warn('SW: Pre-caching static assets failed:', err);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old cache versions
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

// Fetch Event - Handle requests safely without throwing ERR_FAILED
self.addEventListener('fetch', (event) => {
  // 1. Ignore non-GET requests (e.g. POST login, PATCH profile, etc.)
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // 2. Ignore cross-origin API requests or external links
  if (url.origin !== self.location.origin) {
    return;
  }

  // 3. For page navigations (HTML pages like /, /login, /today, etc.), use Network-First strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // If valid response, clone and cache it for offline use
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // If network fails (offline or server down), try returning cached page or start_url
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          const fallbackResponse = await caches.match('/');
          if (fallbackResponse) {
            return fallbackResponse;
          }
          // Return a basic fallback response instead of failing with ERR_FAILED
          return new Response(
            `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Offline</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>You are offline</h2><p>Please check your internet connection and try again.</p></body></html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // 4. For static assets (images, CSS, JS, fonts), use Cache-First with Network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Return empty 404 response to avoid breaking the page
        return new Response(null, { status: 404, statusText: 'Not Found' });
      });
    })
  );
});

