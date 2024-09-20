// service-worker.js
self.addEventListener('push', function(event) {
    const data = event.data.json();
    const title = data.title || 'Nova Notificação!';
    const options = {
      body: data.body,
      icon: 'icon.png', // ícone da notificação
      data: {
        url: data.url || 'https://seu-site.com'
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  });