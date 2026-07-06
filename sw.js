const CACHE_NAME = "vanamalamma-temple-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Never intercept the live temple-data endpoint — the app itself decides
  // freshness (cache: no-store) and falls back to localStorage on failure.
  if (url.hostname === "script.google.com") return;

  // Only handle same-origin app-shell requests; let everything else
  // (Google fonts, Drive thumbnails, Maps embed) go straight to the network.
  if (url.origin !== self.location.origin) return;

  // Network-first: always try to get the latest deployed file. Only fall
  // back to the cached copy if the network is unavailable (offline / GitHub
  // Pages unreachable). This is what makes new pushes show up right away
  // instead of being masked by a stale cached response.
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
