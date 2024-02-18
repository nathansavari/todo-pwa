const CACHE_NAME = "todo-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js", // Adjust based on your build output
  "/static/js/0.chunk.js", // Include all necessary assets
  "/static/js/main.chunk.js",
  "/static/css/main.chunk.css", // Adjust paths as necessary
  // Add other assets you want to cache
];

// Install a service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

// Update a service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["todo-app-cache-v1"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
