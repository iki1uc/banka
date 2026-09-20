// LIVE‑BRIDGE :: LAGE‑SERVICE‑WORKER
// Identity: LAGE-ROOT
// Role: Offline‑Presenter + BIOS‑Cache + GEN‑Pulse Support

const LAGE_CACHE = "live-bridge-lage-v1";

// Dateien, die der Presenter offline braucht
const LAGE_FILES = [
  "/index-lage.html",
  "/style-lage.css",
  "/live-core-lage.js",
  "/live-router-lage.js",
  "/live-pulse-lage.js",
  "/ID-lage.html",
  "/UI-SCANNER-lage.html",
  "/live-config-lage.json",
  "/live-lage.json",
  "/live-weiser-lage.json"
];

// INSTALLATION
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(LAGE_CACHE).then(cache => {
      return cache.addAll(LAGE_FILES);
    })
  );
  console.log("LAGE Service Worker installed :: BIOS ready");
});

// AKTIVIERUNG
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== LAGE_CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  console.log("LAGE Service Worker activated :: GEN‑Stargen sync");
});

// FETCH‑ROUTING
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Offline‑Presenter bevorzugt Cache
      if (response) {
        return response;
      }
      // Fallback: Netzwerk
      return fetch(event.request);
    })
  );
});
