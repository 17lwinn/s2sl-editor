self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["logo.webp", "noInternet.html"]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.log(navigator.onLine)
  if (event.request.url.includes("logo.webp") && navigator.onLine == false) {
    event.respondWith(caches.match(event.request));
  } else if (navigator.onLine === false) {
    event.respondWith(caches.match("PWA/noInternet.html"));
  } else event.respondWith(fetch(event.request));
});