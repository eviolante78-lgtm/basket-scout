// Service worker: l'app funziona offline dopo la prima apertura.
// Quando pubblichi una nuova versione, cambia CACHE (es. v2) per forzare l'aggiornamento.
const CACHE = "basket-scout-v13";
const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Pagina: rete prima (così vedi subito gli aggiornamenti), cache se sei offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { caches.open(CACHE).then((c) => c.put("./index.html", res.clone())); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Resto (icone, font): cache prima, poi rete e salvataggio.
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(
      caches.match(req).then((hit) =>
        hit || fetch(req).then((res) => {
          if (res && (res.ok || res.type === "opaque")) caches.open(CACHE).then((c) => c.put(req, res.clone()));
          return res;
        }).catch(() => hit)
      )
    );
  }
});
