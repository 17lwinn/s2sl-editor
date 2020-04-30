self.addEventListener("install", function(event) {
  console.log("update " + Math.random().toString());
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["PWA/noInternet.html", "index.html", "default.css", "logo.webp", "wallpaper.webp", "loading.webp", "jquery.js", "core.js"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (["v1"].indexOf(key) === -1) {
          return caches.delete(key);
        }
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