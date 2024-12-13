// Service Worker
const CACHE_NAME = "camera-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
  "https://code.jquery.com/jquery-3.5.1.slim.min.js",
  "https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
