self.addEventListener("instal", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "logo.webp",
        "PWA/noInternet.html"
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log('👷', 'activate', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});