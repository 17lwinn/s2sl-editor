self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["logo.webp", "PWA/noInternet.html", "https://fonts.googleapis.com/css?family=Open+Sans", "default.css"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        return caches.delete(key);
      }));
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(caches.match(event.request).then(response => {
    if (!response && navigator.onLine === false) return caches.match("PWA/noInternet.html");
    return response || fetch(event.request);
  }));
});