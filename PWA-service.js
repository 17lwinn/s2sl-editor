self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.add("logo.webp");
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.log(event.request);
  console.log(event.request.url);
  if (event.request.url === "logo.webp") {
    event.respondWith(caches.match(event.request).then(response => { return response || fetch(event.request) }));
  } else if (navigator.onLine === false) {
    event.respondWith(caches.match(`<div style="background-color:black;color:white;width:100%;height:100%;position:fixed;z-index:256;text-align:center;"><img src="logo.webp" style="position:absolute;top:50%;left:50%;margin-top:-95px;margin-left:-75px;">An internet connection is required to use auroraOS.</div>`))
  } else event.respondWith(fetch(event.request));
});