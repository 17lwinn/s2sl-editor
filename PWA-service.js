self.addEventListener("install", function(event) {
  //console.log("Update " + Math.random().toString());
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "PWA/noInternet.html",
        "default.css",
        "logo.webp",
        "wallpaper.webp",
        "loading.webp",
        "jquery.js",
        "core.js",
        "close.svg", "max.svg", "min.svg",
        "https://fonts.googleapis.com/css?family=Open+Sans",
        "https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWJ0bbck.woff2",
        "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
      ]);
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
    return response ? response : fetch(event.request);
  }));
});