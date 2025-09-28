const CACHE_NAME = 'cr7-goals-cache-v1';

// Lista de ficheiros essenciais para que a App funcione offline
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './data.json',
    './manifest.json',
    // Imagens e Ícones
    '/favicon.png',
    '/assets/img/background.jpg',
    '/assets/img/icon-192.png', // Novos ícones para o manifest
    '/assets/img/icon-512.png',
    // Logos dos clubes
    '/assets/logos/sporting.png',
    '/assets/logos/manutd.png',
    '/assets/logos/realmadrid.png',
    '/assets/logos/juventus.png',
    '/assets/logos/alnassr.png',
    '/assets/logos/portugal.png',
    // Ícones dos troféus (assumindo que o nome do ícone genérico é trophy.svg)
    '/assets/icons/ucl.svg',
    '/assets/icons/euro.svg',
    '/assets/icons/ballon-dor.svg',
    '/assets/icons/trophy.svg' 
];

// 1. Instalação: Guarda todos os ficheiros na cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. Fetch: Interceta pedidos e serve da cache
self.addEventListener('fetch', event => {
    // Tenta ir buscar o recurso à cache primeiro
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se o recurso estiver na cache, serve-o
                if (response) {
                    return response;
                }
                // Caso contrário, vai à rede
                return fetch(event.request);
            })
    );
});

// 3. Ativação: Elimina caches antigas (para atualizações)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});