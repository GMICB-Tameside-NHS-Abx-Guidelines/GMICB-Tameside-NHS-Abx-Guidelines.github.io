const TGAbxApp = "TG-ABX-App-v1.1.20"

const assets = [
  "/index.html",
  "/css/styles.css"
  // "/js/app.js",
  // "/assets/img/portfolio/abx.png",
  // "/assets/img/portfolio/baby.png",
  // "/assets/img/portfolio/blood.png",
  // "/assets/img/portfolio/bone.png",
  // "/assets/img/portfolio/cabin.png",
  // "/assets/img/portfolio/cake.png",
  // "/assets/img/portfolio/cardio.png",
  // "/assets/img/portfolio/circus.png",
  // "/assets/img/portfolio/ent.png",
  // "/assets/img/portfolio/eye.png",
  // "/assets/img/portfolio/game.png",
  // "/assets/img/portfolio/gender.png",
  // "/assets/img/portfolio/genital.png",
  // "/assets/img/portfolio/GitHub.png",
  // "/assets/img/portfolio/head.png",
  // "/assets/img/portfolio/hospital.png",
  // "/assets/img/portfolio/intestines.png",
  // "/assets/img/portfolio/lungs.png",
  // "/assets/img/portfolio/meningitis.png",
  // "/assets/img/portfolio/nhs-logo.png",
  // "/assets/img/portfolio/nhs.png",
  // "/assets/img/portfolio/parasite.png",
  // "/assets/img/portfolio/safe.png",
  // "/assets/img/portfolio/skin.png",
  // "/assets/img/portfolio/submarine.png",
  // "/assets/img/portfolio/tgh.png",
  // "/assets/img/portfolio/tooth.png",
  // "/assets/img/portfolio/urinary.png",
  // "/assets/img/portfolio/uterus.png",
  // "/assets/img/portfolio/virus.png",
  // "/assets/img/icons/icon-72x72.png",
  // "/assets/img/icons/icon-96x96.png",
  // "/assets/img/icons/icon-128x128.png",
  // "/assets/img/icons/icon-144x144.png",
  // "/assets/img/icons/icon-152x152.png",
  // "/assets/img/icons/icon-192x192.png",
  // "/assets/img/icons/icon-384x384.png",
  // "/assets/img/icons/icon-512x512.png"
]

// install event
self.addEventListener('install', (e) => {
  console.log('[Service Worker] install');
  e.waitUntil((async () => {
    const cache = await
    caches.open(TGAbxApp)
    console.log('[Service Worker] Caching all: app and content')
    await
    cache.addAll(assets)
  })())
})

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil
  (
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== TGAbxApp)
        .map(key => caches.delete(key))
      );
    })
  );
});

//fetch event
// self.addEventListener('fetch', (e) => {
//   e.respondWith((async () => {
//     const r = await
//     caches.match(e.request);
//     console.log(`[Service Worker] fetching resource: ${e.request.url}`);
//     if(r) {return r}
//     const response = await
//     fetch(e.request);
//     const cache = await
//     caches.open(TGAbxApp)
//     console.log(`[Service Worker] caching new resource: ${e.request.url}`)
//     cache.put(e.request, response.clone())
//     return response;
//   })())
// })

self.addEventListener('fetch', function (event) {
  var requestURL = new URL(event.request.url);
  var freshResource = fetch(event.request).then(function (response) {
      var clonedResponse = response.clone();
      // Don't update the cache with error pages!
      if (response.ok) {
          // All good? Update the cache with the network response
          caches.open(TGAbxApp).then(function (cache) {
              cache.put(event.request, clonedResponse);
          });
      }
      return response;
  });
  var cachedResource = caches.open(TGAbxApp).then(async function (cache) {
      const response = await cache.match(event.request);
    return response || freshResource;
  }).catch(function (e) {
      return freshResource;
  });
  event.respondWith(cachedResource);
});