import { watchEffect, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

export function useSEO(meta = {}) {
  const route = useRoute()

  const defaultMeta = {
    title: 'Alexis Musaelyan - Creative Portfolio',
    description: 'Discover the creative portfolio of Alexis Musaelyan - poet, author, and digital creator.',
    keywords: 'Alexis Musaelyan, poetry, creative writing, digital art, portfolio',
    image: 'https://alexismusaelyan.com/img/logo-portfolio-black.webp',
    url: `https://alexismusaelyan.com${route.path}`,
    type: 'website'
  }

  const finalMeta = { ...defaultMeta, ...meta }

  const updateMetaTags = () => {
    // Update document title
    document.title = finalMeta.title

    // Remove existing meta tags
    const existingMetaTags = document.querySelectorAll('meta[data-vue-seo]')
    existingMetaTags.forEach(tag => tag.remove())

    // Create new meta tags
    const metaTags = [
      // Basic meta tags
      { name: 'description', content: finalMeta.description },
      { name: 'keywords', content: finalMeta.keywords },
      { name: 'author', content: 'Alexis Musaelyan' },
      { name: 'robots', content: 'index, follow' },

      // Open Graph tags
      { property: 'og:title', content: finalMeta.title },
      { property: 'og:description', content: finalMeta.description },
      { property: 'og:image', content: finalMeta.image },
      { property: 'og:url', content: finalMeta.url },
      { property: 'og:type', content: finalMeta.type },
      { property: 'og:site_name', content: 'Alexis Musaelyan' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: finalMeta.title },
      { name: 'twitter:description', content: finalMeta.description },
      { name: 'twitter:image', content: finalMeta.image },
      { name: 'twitter:site', content: '@alexismusaelyan' },
      { name: 'twitter:creator', content: '@alexismusaelyan' }
    ]

    metaTags.forEach(tag => {
      const metaElement = document.createElement('meta')
      Object.keys(tag).forEach(key => {
        metaElement.setAttribute(key, tag[key])
      })
      metaElement.setAttribute('data-vue-seo', 'true')
      document.head.appendChild(metaElement)
    })

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', finalMeta.url)
  }

  // Update meta tags immediately
  updateMetaTags()

  // Watch for route changes and update meta tags
  const stopWatching = watchEffect(() => {
    if (route.path) {
      updateMetaTags()
    }
  })

  // Cleanup function
  onUnmounted(() => {
    stopWatching()
  })

  return {
    updateMetaTags
  }
}
