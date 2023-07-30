const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';
const urlsToCache = [
  "/",
  "/index.html",
  "/fallback.html",
  "/style.css",
  "/app.js",
  "/images/food-1.png",
  "/images/food-2.png",
  "/images/food-3.png",
  "/images/pic1.jpg",
  "/images/pic2.jpg",
];

// add routes in cache during service worker registration.
// install event fire first time and fire again if we do any changes in this sw.js file
self.addEventListener('install', e => {
  console.log("install event");
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(urlsToCache)
        // .then(() => self.skipWaiting()) // Activate the new service worker immediately
      })
      .catch(error => console.error('cache problem found : ', error))
  );
});

// clear old cache when we do changes in routes/assets.
// activate event fire first time and fire again if we do skipwaiting.
self.addEventListener('activate', e => {
  console.log("activate event");
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    .catch(error => console.error('cache delete problem found : ', error))
  );
});

// fetch data from cache also add new route in dynamic cache when user visit them.
// fetch event not fire first time but fire next every time when user made request
self.addEventListener("fetch", e => {
  console.log("fetch event");
  e.respondWith(
    caches.match(e.request)
    .then(res => {
      return res || fetch(e.request)
      .then(fetchRes => {
        return caches.open(DYNAMIC_CACHE)
        .then(cache => {
          cache.put(e.request.url,fetchRes.clone());
          return fetchRes;
        })
        .catch(error => console.error('dynamic cache problem found : ', error))
      })
    })
    .catch(error => {
      console.error('error occured when fetching from cache : ', error);
      if(e.request.url.indexOf('.html') > -1){
        return caches.match("/fallback.html");
      }
    })
  )
})

// handel push notification
// self.addEventListener('push', e => {
//   const payload = e.data ? e.data.text() : 'Default notification message';
//   e.waitUntil(
//     self.registration.showNotification('My PWA', {
//       body: payload,
//       icon: '/images/icons/icon-192x192.png',
//       // Other notification options (e.g., actions, badge, etc.)
//     })
//   );
// });

// background sync.
// sending form data, uploading images, or any other task that needs to be synchronized later.
// When the user is online and the task fails (e.g., due to a network issue),
// the Background Sync event will be triggered when the user's device is back online.

// function syncData() {
//   // Implement the logic to synchronize data in the background
//   // This could be sending form data, updating data on the server, etc.

//   // For the sake of the example, let's simply display a notification
//   self.registration.showNotification('Background Sync', {
//     body: 'Data synchronized in the background!',
//   });
// }

// self.addEventListener('sync', event => {
//   if (event.tag === 'my-background-sync') {
//     event.waitUntil(syncData());
//   }
// });