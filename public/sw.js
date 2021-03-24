// console.log('Custom service Worker Loaded...');

self.addEventListener('push', (e) => {
  console.log('Push Received...');

  const { image, tag, url, title, text } = e.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: image,
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: image,
      },
    ],
  };

  e.waitUntil(self.registration.showNotification(title, options));
});
