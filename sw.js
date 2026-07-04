const STATIC_CACHE = 'temple-pwa-static-v1';
const DATA_CACHE = 'temple-pwa-data-v1';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxElKmiEFwhiIbpUxypWMB5xx31ZxaJ0ThHwqUCLQs0kwDp5fyITci_pnBqDytY6AH2/exec?sheetId=1IuC4hcLCJlKuJE2jFWYCndFUaMDCQF6QfJRTkHuHcu8';
const APP_ASSETS = ['./', './index.html', './manifest.json', './sw.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => {
      if (![STATIC_CACHE, DATA_CACHE].includes(key)) return caches.delete(key);
      return Promise.resolve();
    })))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.href === SHEET_URL) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (request.mode === 'navigate' || APP_ASSETS.includes(url.pathname.split('/').pop() ? `./${url.pathname.split('/').pop()}` : './')) {
    event.respondWith(cacheFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(DATA_CACHE);
  try {
    const fresh = await fetch(request, { cache: 'no-store' });
    if (fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (error) {
    const cached = await cache.match(request);
    return cached || Response.json({ error: true, message: 'offline' }, { status: 503 });
  }
}



