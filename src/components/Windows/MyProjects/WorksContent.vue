<template>
  <section class="text-xs md:text-header-window">
    <!-- Book Cover Display -->
    <div v-if="coverImage" class="flex justify-center mb-4">
      <img :src="`/img/${coverImage}`" :alt="workName" class="max-w-48 max-h-48 object-contain" style="image-rendering: pixelated;" />
    </div>
    
    <h3 class="mt-5 mb-2 text-md">{{ $t('common.context') }}</h3>
    <p class="mb-2" v-if="getParagraphContent('contextFirstParagraph')">{{ getParagraphContent('contextFirstParagraph') }}</p>
    <p class="mb-2" v-if="getParagraphContent('contextSecondParagraph')">{{ getParagraphContent('contextSecondParagraph') }}</p>
    <p class="mb-2" v-if="getParagraphContent('contextThirdParagraph')">{{ getParagraphContent('contextThirdParagraph') }}</p>
    <p class="mb-2" v-if="getParagraphContent('contextFourthParagraph')">{{ getParagraphContent('contextFourthParagraph') }}</p>
    <p class="mb-2" v-if="getParagraphContent('contextFifthParagraph')">{{ getParagraphContent('contextFifthParagraph') }}</p>
    <p class="mb-2" v-if="getParagraphContent('contextSixthParagraph')">{{ getParagraphContent('contextSixthParagraph') }}</p>
    <p class="mb-2" v-if="getParagraphContent('contextSeventhParagraph')">{{ getParagraphContent('contextSeventhParagraph') }}</p>
    
    <!-- Amazon Link Button -->
    <div v-if="amazonLink" class="mt-4 mb-4 flex justify-center">
      <a :href="amazonLink" target="_blank" rel="noopener noreferrer" 
         class="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200">
        <img src="/img/icons/contact/send-icon.webp" alt="link" class="w-4 h-4 mr-2" />
        {{ $t('buttons.linkWebSite') }}
      </a>
    </div>
    
    <h3 class="mt-5 mb-2" v-if="hasGoals">{{ $t('common.objectives') }}</h3>
    <ul class="list-disc ml-3" v-if="hasGoals">
      <li v-if="getGoalContent('goalFirst')">{{ getGoalContent('goalFirst') }}</li>
      <li v-if="getGoalContent('goalSecond')">{{ getGoalContent('goalSecond') }}</li>
      <li v-if="getGoalContent('goalThird')">{{ getGoalContent('goalThird') }}</li>
      <li v-if="getGoalContent('goalFourth')">{{ getGoalContent('goalFourth') }}</li>
    </ul>
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
  
  // Only return content if it exists and is not the key itself (placeholder)
  if (content && content !== translationKey && content.trim() !== '') {
    return content
  }
  return null
}

const getGoalContent = (goalKey) => {
  const translationKey = `works.${workKey.value}.${goalKey}`
  const content = t(translationKey)
  
  // Only return content if it exists and is not the key itself (placeholder)
  if (content && content !== translationKey && content.trim() !== '') {
    return content
  }
  return null
}

const hasGoals = computed(() => {
  return getGoalContent('goalFirst') || getGoalContent('goalSecond') || 
         getGoalContent('goalThird') || getGoalContent('goalFourth')
})
</script>
