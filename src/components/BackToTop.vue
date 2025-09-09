<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow-lg transition-all duration-300 z-50 flex items-center gap-2 text-sm font-medium"
    :class="{ 'opacity-0 pointer-events-none': !isVisible }"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    {{ $t('common.backToTop') }}
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const toggleVisibility = () => {
  if (window.pageYOffset > 300) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<style scoped>
button {
  font-family: 'Tahoma', sans-serif;
  border: 1px solid #000;
}

button:hover {
  border-color: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
