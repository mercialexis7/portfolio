import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export function useDynamicMeta() {
  const { t, locale } = useI18n()
  const route = useRoute()

  const getMetaForRoute = (routeName) => {
    const baseUrl = 'https://alexismusaelyan.com'
    const baseImage = `${baseUrl}/img/logo-portfolio-black.webp`

    const metaMap = {
      'office': {
        title: 'Alexis Musaelyan - Creative Portfolio',
        description: t('meta.office.description'),
        image: baseImage,
        url: baseUrl,
        type: 'website'
      },
      'documents': {
        title: `${t('windows.documents.title')} - Alexis Musaelyan`,
        description: t('meta.documents.description'),
        image: baseImage,
        url: `${baseUrl}/documents`,
        type: 'article'
      },
      'myProjects': {
        title: `${t('windows.myProjects.title')} - Alexis Musaelyan`,
        description: t('meta.projects.description'),
        image: baseImage,
        url: `${baseUrl}/projects`,
        type: 'website'
      },
      'about': {
        title: `${t('windows.documents.about.title')} - Alexis Musaelyan`,
        description: t('meta.about.description'),
        image: baseImage,
        url: `${baseUrl}/documents/about`,
        type: 'article'
      },
      'contact': {
        title: `${t('windows.contact.title')} - Alexis Musaelyan`,
        description: t('meta.contact.description'),
        image: baseImage,
        url: `${baseUrl}/contact`,
        type: 'website'
      }
    }

    return metaMap[routeName] || metaMap.office
  }

  const currentMeta = computed(() => {
    const routeName = route.name || 'office'
    return getMetaForRoute(routeName)
  })

  const setMeta = () => {
    const meta = currentMeta.value

    useHead({
      title: meta.title,
      meta: [
        // Basic meta tags
        { name: 'description', content: meta.description },
        { name: 'keywords', content: 'Alexis Musaelyan, portfolio, creative, developer, designer, music, writing' },
        { name: 'author', content: 'Alexis Musaelyan' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: locale.value },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

        // Open Graph meta tags
        { property: 'og:type', content: meta.type },
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description },
        { property: 'og:url', content: meta.url },
        { property: 'og:image', content: meta.image },
        { property: 'og:image:alt', content: 'Alexis Musaelyan Portfolio Logo' },
        { property: 'og:site_name', content: 'Alexis Musaelyan' },
        { property: 'og:locale', content: locale.value === 'en' ? 'en_US' : 'ru_RU' },

        // Twitter Card meta tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: meta.title },
        { name: 'twitter:description', content: meta.description },
        { name: 'twitter:image', content: meta.image },
        { name: 'twitter:image:alt', content: 'Alexis Musaelyan Portfolio Logo' },

        // Additional SEO meta tags
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Alexis Musaelyan' },

        // Canonical URL
        { rel: 'canonical', href: meta.url },
      ],
      link: [
        // Favicon and icons
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/img/logo-portfolio-black.webp' },

        // Preconnect to external domains for performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://matomo.rocketegg.systems' },

        // Canonical URL
        { rel: 'canonical', href: meta.url },
      ],
      htmlAttrs: {
        lang: locale.value
      }
    })
  }

  return {
    setMeta,
    currentMeta
  }
}
