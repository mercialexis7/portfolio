<template>
  <div class="share-buttons">
    <div class="share-header">
      <img src="/img/icons/share-icon.png" alt="Share" class="share-icon" />
      <span class="share-text">{{ $t('common.share') }}</span>
    </div>
    <div class="share-links">
      <button
        v-if="canShare"
        @click="shareNative"
        class="share-button native-share-button"
        title="Share this article"
      >
        <svg class="button-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
        </svg>
        <span class="button-text">{{ $t('common.shareArticle') }}</span>
      </button>

      <button @click="copyLink" class="share-button copy-button" title="Copy Link">
        <svg class="button-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        <span class="button-text">{{ copyText }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: () => window.location.href
  }
})

const copyText = ref(t('common.copyLink'))
const canShare = ref(navigator.share !== undefined)

const shareNative = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.title,
        text: `Check out this article: ${props.title}`,
        url: props.url
      })
    } catch (error) {
      console.log('Error sharing:', error)
    }
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.url)
    copyText.value = t('common.copied')
    setTimeout(() => {
      copyText.value = t('common.copyLink')
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = props.url
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copyText.value = t('common.copied')
    setTimeout(() => {
      copyText.value = t('common.copyLink')
    }, 2000)
  }
}
</script>

<style scoped>
.share-buttons {
  margin: 2rem 0;
  padding: 1rem;
  background: #f0f0f0;
  border: 2px inset #c0c0c0;
  border-radius: 0;
}

.share-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #808080;
}

.share-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.share-text {
  font-family: 'Tahoma', sans-serif;
  font-size: 11px;
  font-weight: bold;
  color: #000;
}

.share-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  border-radius: 0;
  font-family: 'Tahoma', sans-serif;
  font-size: 10px;
  font-weight: normal;
  color: #000;
  cursor: pointer;
  transition: all 0.1s ease;
  min-height: 20px;
}

.share-button:hover {
  background: #d0d0d0;
  border: 2px inset #c0c0c0;
}

.share-button:active {
  background: #a0a0a0;
  border: 2px inset #808080;
  transform: translate(1px, 1px);
}

.button-icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.button-text {
  white-space: nowrap;
}

.native-share-button {
  background: #c0c0c0;
}

.copy-button {
  background: #c0c0c0;
}

@media (max-width: 768px) {
  .share-links {
    flex-direction: column;
  }

  .share-button {
    justify-content: center;
    width: 100%;
  }
}
</style>
