self.addEventListener("install", function(event) {
  console.log("update " + Math.random().toString());
  event.waitUntil(
    caches.open("v2").then((cache) => {
      return cache.addAll(["logo.webp", "PWA/noInternet.html", "https://fonts.googleapis.com/css?family=Open+Sans", "jquery.js", "default.css", "loading.webp", "index.html", ""]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (["v2"].indexOf(key) === -1) {
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