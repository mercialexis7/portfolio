import { createRouter, createWebHistory } from 'vue-router'
import Loader from '../views/Loader.vue'
import Office from '../views/Office.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Loader,
      meta: {
        title: 'Alexis Musaelyan - Creative Portfolio | Poetry, Books & Digital Art',
        metaTags: [
          {
            rel: 'canonical',
            href: 'https://alexismusaelyan.com'
          },
          {
            name: 'title',
            content: 'Alexis Musaelyan - Creative Portfolio | Poetry, Books & Digital Art'
          },
          {
            name: 'description',
            content: 'Discover the creative portfolio of Alexis Musaelyan - poet, author, and digital creator. Explore published poetry collections, creative writing, and immersive digital experiences.'
          },
          {
            name: 'keywords',
            content: 'Alexis Musaelyan, poetry, creative writing, digital art, portfolio, books, poetry collection, creative portfolio, digital creator, threshold, entrepreneur'
          },
          {
            name: 'author',
            content: 'Alexis Musaelyan'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Alexis Musaelyan'
          },
          {
            name: 'application-name',
            content: 'Alexis Musaelyan'
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            name: 'twitter:title',
            content: 'Alexis Musaelyan - Creative Portfolio'
          },
          {
            name: 'twitter:description',
            content: 'Discover the creative portfolio of Alexis Musaelyan - poet, author, and digital creator. Explore published poetry collections and immersive digital experiences.'
          },
          {
            name: 'twitter:image',
            content: 'https://alexismusaelyan.com/img/logo-portfolio-black.webp'
          },
          {
            name: 'twitter:image:alt',
            content: 'Alexis Musaelyan Creative Portfolio Logo'
          },
          {
            name: 'twitter:site',
            content: '@alexismusaelyan'
          },
          {
            name: 'twitter:creator',
            content: '@alexismusaelyan'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:title',
            content: 'Alexis Musaelyan - Creative Portfolio | Poetry, Books & Digital Art'
          },
          {
            property: 'og:description',
            content: 'Discover the creative portfolio of Alexis Musaelyan - poet, author, and digital creator. Explore published poetry collections, creative writing, and immersive digital experiences.'
          },
          {
            property: 'og:site_name',
            content: 'Alexis Musaelyan'
          },
          {
            property: 'og:url',
            content: 'https://alexismusaelyan.com'
          },
          {
            property: 'og:image',
            content: 'https://alexismusaelyan.com/img/logo-portfolio-black.webp'
          },
          {
            property: 'og:image:alt',
            content: 'Alexis Musaelyan Creative Portfolio Logo'
          },
          {
            property: 'og:image:width',
            content: '1200'
          },
          {
            property: 'og:image:height',
            content: '630'
          },
          {
            property: 'og:locale',
            content: 'en_US'
          },
          {
            property: 'og:locale:alternate',
            content: 'ru_RU'
          },
          {
            property: 'og:locale:alternate',
            content: 'fr_FR'
          }
        ]
      }
    },
    {
      path: '/office',
      name: 'Office',
      component: Office,
      meta: {
        title: 'Office - Alexis Musaelyan Portfolio',
        metaTags: [
          {
            rel: 'canonical',
            href: 'https://alexismusaelyan.com/office'
          },
          {
            name: 'title',
            content: 'Office - Alexis Musaelyan Portfolio'
          },
          {
            name: 'description',
            content: 'Explore Alexis Musaelyan\'s creative workspace - featuring poetry collections, digital art, blog posts, and professional documents in an immersive Windows XP-inspired interface.'
          },
          {
            name: 'keywords',
            content: 'Alexis Musaelyan, office, portfolio, poetry, digital art, blog, documents, creative workspace, Windows XP, poetry collection, creative writing'
          },
          {
            name: 'author',
            content: 'Alexis Musaelyan'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Alexis Musaelyan'
          },
          {
            name: 'application-name',
            content: 'Alexis Musaelyan'
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            name: 'twitter:title',
            content: 'Office - Alexis Musaelyan Portfolio'
          },
          {
            name: 'twitter:description',
            content: 'Explore Alexis Musaelyan\'s creative workspace - featuring poetry collections, digital art, blog posts, and professional documents in an immersive Windows XP-inspired interface.'
          },
          {
            name: 'twitter:image',
            content: 'https://alexismusaelyan.com/img/office-picture.webp'
          },
          {
            name: 'twitter:image:alt',
            content: 'Alexis Musaelyan Creative Office Workspace'
          },
          {
            name: 'twitter:site',
            content: '@alexismusaelyan'
          },
          {
            name: 'twitter:creator',
            content: '@alexismusaelyan'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:title',
            content: 'Office - Alexis Musaelyan Portfolio'
          },
          {
            property: 'og:description',
            content: 'Explore Alexis Musaelyan\'s creative workspace - featuring poetry collections, digital art, blog posts, and professional documents in an immersive Windows XP-inspired interface.'
          },
          {
            property: 'og:site_name',
            content: 'Alexis Musaelyan'
          },
          {
            property: 'og:url',
            content: 'https://alexismusaelyan.com/office'
          },
          {
            property: 'og:image',
            content: 'https://alexismusaelyan.com/img/office-picture.webp'
          },
          {
            property: 'og:image:alt',
            content: 'Alexis Musaelyan Creative Office Workspace'
          },
          {
            property: 'og:image:width',
            content: '1200'
          },
          {
            property: 'og:image:height',
            content: '630'
          },
          {
            property: 'og:locale',
            content: 'en_US'
          },
          {
            property: 'og:locale:alternate',
            content: 'ru_RU'
          },
          {
            property: 'og:locale:alternate',
            content: 'fr_FR'
          }
        ]
      }
    }
  ],
})

export default router
