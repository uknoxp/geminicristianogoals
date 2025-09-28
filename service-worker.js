const CACHE_NAME = 'gemini-cr7-v1';
const urlsToCache = [
  // Ficheiros essenciais
  '/geminicristianogoals/index.html',
  '/geminicristianogoals/assets/css/style.css',
  '/geminicristianogoals/manifest.json',
  
  // Imagens e Ícones
  '/geminicristianogoals/assets/img/background.jpg',
  '/geminicristianogoals/assets/img/icon-192.png',
  '/geminicristianogoals/assets/img/icon-512.png',
  
  // Adicione aqui os caminhos de todas as suas imagens de clubes e troféus
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o que está na cache, ou tenta buscar na rede
        return response || fetch(event.request);
      })
    );
});