const CACHE_NAME = 'offline-cache';

const urlsToCache = [
  '/',
  'index.html',
  'panorama.html',
  'script.js',
  // Add other files that should be cached
  'images/admin-office.jpg',
  'images/HM-Building.jpg',
  'images/Old-Building.jpg',
  'images/New-Building.jpg',
  'images/Auditorium.jpg',
  'images/Main-Gate.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
