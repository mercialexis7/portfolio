<template>
  <div class="flex items-center justify-center py-8">
    <img
      src="/img/icons/search-icon.gif"
      alt="Loading..."
      class="w-20 h-20"
      style="image-rendering: pixelated;"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
