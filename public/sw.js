// Service Worker for caching and offline functionality
const CACHE_NAME = 'alexis-portfolio-v1'
const STATIC_CACHE = 'alexis-static-v1'
const DYNAMIC_CACHE = 'alexis-dynamic-v1'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external requests
  if (!url.origin.includes('alexismusaelyan.com') && !url.origin.includes('localhost')) return

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(request)
        })
    )
    return
  }

  // Handle static assets with cache-first strategy
  if (
    url.pathname.match(/\.(css|js|png|jpg|jpeg|webp|svg|woff|woff2|ttf|eot)$/) ||
    url.pathname.startsWith('/img/') ||
    url.pathname.startsWith('/css/') ||
    url.pathname.startsWith('/js/')
  ) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response
          }

          return fetch(request)
            .then((response) => {
              // Don't cache if not successful
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response
              }

              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone)
              })

              return response
            })
        })
    )
    return
  }

  // Default: Network-first for HTML pages
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful HTML responses
        if (response.status === 200 && request.headers.get('accept').includes('text/html')) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
        }
        return response
      })
      .catch(() => {
        // Return cached version or offline page
        return caches.match(request)
          .then((response) => {
            if (response) {
              return response
            }
            // Return cached home page as fallback
            return caches.match('/')
          })
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag)

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Handle any offline actions that need to be synced
  console.log('Performing background sync...')
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/img/logo-portfolio-black.webp',
      badge: '/img/logo-portfolio-black.webp',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow('/')
  )
})
