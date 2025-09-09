<template>
  <section class="text-xs md:text-header-window">
    <!-- Book Cover Display - Only show if cover image exists -->
    <div v-if="coverImage && coverImage.trim()" class="flex justify-center mb-4">
      <img :src="`/img/${coverImage}`" :alt="workName" class="max-w-48 max-h-48 object-contain" style="image-rendering: pixelated;" />
    </div>
    
    <!-- Details section - only show if there's content -->
    <div v-if="hasContent" class="mt-4">
      <div class="space-y-2">
        <p v-if="getParagraphContent('contextFirstParagraph')">{{ getParagraphContent('contextFirstParagraph') }}</p>
        <p v-if="getParagraphContent('contextSecondParagraph')">{{ getParagraphContent('contextSecondParagraph') }}</p>
        <p v-if="getParagraphContent('contextThirdParagraph')">{{ getParagraphContent('contextThirdParagraph') }}</p>
        <p v-if="getParagraphContent('contextFourthParagraph')">{{ getParagraphContent('contextFourthParagraph') }}</p>
        <p v-if="getParagraphContent('contextFifthParagraph')">{{ getParagraphContent('contextFifthParagraph') }}</p>
        <p v-if="getParagraphContent('contextSixthParagraph')">{{ getParagraphContent('contextSixthParagraph') }}</p>
        <p v-if="getParagraphContent('contextSeventhParagraph')">{{ getParagraphContent('contextSeventhParagraph') }}</p>
      </div>
      
      <!-- Amazon Link Button -->
      <div v-if="amazonLink" class="mt-4 mb-4 flex justify-center">
        <a :href="amazonLink" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md">
          <img src="/img/icons/contact/send-icon.webp" alt="link" class="w-4 h-4 mr-2" />
          {{ $t('buttons.linkWebSite') }}
        </a>
      </div>
      
      <!-- Goals section -->
      <div v-if="hasGoals" class="mt-4">
        <h3 class="mt-5 mb-2 text-md font-semibold">{{ $t('common.objectives') }}</h3>
        <ul class="list-disc ml-3 space-y-1">
          <li v-if="getGoalContent('goalFirst')">{{ getGoalContent('goalFirst') }}</li>
          <li v-if="getGoalContent('goalSecond')">{{ getGoalContent('goalSecond') }}</li>
          <li v-if="getGoalContent('goalThird')">{{ getGoalContent('goalThird') }}</li>
          <li v-if="getGoalContent('goalFourth')">{{ getGoalContent('goalFourth') }}</li>
        </ul>
      </div>
    </div>
    
    <!-- No content message -->
    <div v-else class="flex flex-col items-center justify-center py-8 text-center">
      <div class="text-gray-400 mb-2">
        <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <p class="text-gray-500 text-sm">Content coming soon...</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  workName: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: null
  },
  amazonLink: {
    type: String,
    default: null
  }
})

const workKey = computed(() => {
  // Convert work name to camelCase key
  return props.workName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
})

const getParagraphContent = (paragraphKey) => {
  const translationKey = `works.${workKey.value}.${paragraphKey}`
  const content = t(translationKey)
  
  // Only return content if it exists, is not the key itself (placeholder), and is not empty
  if (content && content !== translationKey && content.trim() !== '' && content.trim() !== paragraphKey) {
    return content
  }
  return null
}

const getGoalContent = (goalKey) => {
  const translationKey = `works.${workKey.value}.${goalKey}`
  const content = t(translationKey)
  
  // Only return content if it exists, is not the key itself (placeholder), and is not empty
  if (content && content !== translationKey && content.trim() !== '' && content.trim() !== goalKey) {
    return content
  }
  return null
}

const hasGoals = computed(() => {
  return getGoalContent('goalFirst') || getGoalContent('goalSecond') || 
         getGoalContent('goalThird') || getGoalContent('goalFourth')
})

const hasContent = computed(() => {
  // Check if any paragraph content exists
  const paragraphs = [
    'contextFirstParagraph', 'contextSecondParagraph', 'contextThirdParagraph',
    'contextFourthParagraph', 'contextFifthParagraph', 'contextSixthParagraph', 
    'contextSeventhParagraph'
  ]
  
  const hasParagraphs = paragraphs.some(key => {
    const translationKey = `works.${workKey.value}.${key}`
    const content = t(translationKey)
    return content && content !== translationKey && content.trim() !== '' && content.trim() !== key
  })
  
  // Check if amazon link exists
  const hasLink = props.amazonLink && props.amazonLink.trim() !== ''
  
  // Check if goals exist
  const goals = ['goalFirst', 'goalSecond', 'goalThird', 'goalFourth']
  const hasGoalsContent = goals.some(key => {
    const translationKey = `works.${workKey.value}.${key}`
    const content = t(translationKey)
    return content && content !== translationKey && content.trim() !== '' && content.trim() !== key
  })
  
  return hasParagraphs || hasLink || hasGoalsContent
})
</script>
