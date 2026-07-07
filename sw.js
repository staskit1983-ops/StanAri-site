// This service worker previously intercepted every fetch without providing
// any real caching benefit (cache was never populated), which caused
// duplicate network requests for images and other assets.
// It now self-unregisters to stop intercepting requests.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach((client) => {
        if (client.url && client.navigate) {
          client.navigate(client.url);
        }
      });
    })
  );
});
