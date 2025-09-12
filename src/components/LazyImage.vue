<template>
  <img
    v-if="isLoaded || !lazy"
    :src="currentSrc"
    :alt="alt"
    :class="imgClass"
    :style="imgStyle"
    @load="onLoad"
    @error="onError"
  />
  <div
    v-else
    :class="`${imgClass} ${placeholderClass}`"
    :style="placeholderStyle"
  >
    <slot name="placeholder">
      <div class="flex items-center justify-center w-full h-full bg-gray-200 animate-pulse">
        <div class="w-8 h-8 bg-gray-300 rounded"></div>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: true
  },
  imgClass: {
    type: String,
    default: ''
  },
  placeholderClass: {
    type: String,
    default: ''
  },
  webpSrc: {
    type: String,
    default: ''
  },
  avifSrc: {
    type: String,
    default: ''
  }
})

const isLoaded = ref(false)
const isInView = ref(false)
const imgElement = ref(null)
const observer = ref(null)

const currentSrc = computed(() => {
  if (!isInView.value && props.lazy) return ''

  // Use modern formats if supported
  if (props.avifSrc && supportsFormat('avif')) {
    return props.avifSrc
  }
  if (props.webpSrc && supportsFormat('webp')) {
    return props.webpSrc
  }
  return props.src
})

const imgStyle = computed(() => ({
  opacity: isLoaded.value ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out'
}))

const placeholderStyle = computed(() => ({
  aspectRatio: '16/9', // Default aspect ratio, can be overridden
  minHeight: '200px' // Minimum height to prevent layout shift
}))

const supportsFormat = (format) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return false

  const img = new Image()
  img.src = `data:image/${format};base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=`
  return img.complete && img.naturalWidth > 0
}

const onLoad = () => {
  isLoaded.value = true
}

const onError = () => {
  // Fallback to original src if optimized version fails
  if (currentSrc.value !== props.src) {
    imgElement.value.src = props.src
  }
}

const setupIntersectionObserver = () => {
  if (!props.lazy || typeof window === 'undefined' || !window.IntersectionObserver) {
    isInView.value = true
    return
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          observer.value?.disconnect()
        }
      })
    },
    {
      rootMargin: '50px' // Start loading 50px before the image enters the viewport
    }
  )

  if (imgElement.value) {
    observer.value.observe(imgElement.value)
  }
}

onMounted(() => {
  if (props.lazy) {
    setupIntersectionObserver()
  } else {
    isInView.value = true
  }
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<style scoped>
/* Additional styles for better image loading experience */
img {
  max-width: 100%;
  height: auto;
}
</style>
