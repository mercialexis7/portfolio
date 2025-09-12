<template>
  <!-- Structured data is added to head via useHead -->
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t, locale } = useI18n()
const route = useRoute()

const props = defineProps({
  type: {
    type: String,
    default: 'website'
  },
  customData: {
    type: Object,
    default: () => ({})
  }
})

const structuredData = computed(() => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alexis Musaelyan',
    url: 'https://alexismusaelyan.com',
    sameAs: [
      'https://twitter.com/alexismusaelyan',
      'https://linkedin.com/in/alexismusaelyan',
      'https://github.com/mercialexis7'
    ],
    jobTitle: 'Creative Director & Digital Artist',
    description: t('meta.office.description'),
    image: 'https://alexismusaelyan.com/img/logo-portfolio-black.webp',
    knowsAbout: [
      'Creative Writing',
      'Poetry',
      'Digital Art',
      'Web Development',
      'Music Production',
      'Entrepreneurship'
    ]
  }

  // Add route-specific structured data
  switch (route.name) {
    case 'documents':
      return {
        ...baseData,
        '@type': 'Article',
        headline: t('windows.documents.title'),
        articleSection: 'Creative Writing',
        author: {
          '@type': 'Person',
          name: 'Alexis Musaelyan'
        },
        publisher: {
          '@type': 'Person',
          name: 'Alexis Musaelyan'
        }
      }

    case 'myProjects':
      return {
        ...baseData,
        '@type': 'CollectionPage',
        name: t('windows.myProjects.title'),
        description: t('meta.projects.description'),
        mainEntity: {
          '@type': 'ItemList',
          name: 'Creative Projects',
          description: 'Portfolio of creative projects and works'
        }
      }

    default:
      return {
        ...baseData,
        '@type': 'WebSite',
        name: 'Alexis Musaelyan - Creative Portfolio',
        description: t('meta.office.description'),
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://alexismusaelyan.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
  }
})

// Add structured data to head
useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify(structuredData.value)
  }]
})
</script>
