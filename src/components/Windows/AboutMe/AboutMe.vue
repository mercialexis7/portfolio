<script setup>
import { useLocaleStore } from '@/stores/localeStore'
import ProfileHeader from './ProfileHeader.vue'

const localeStore = useLocaleStore()
</script>

<template>
  <div class="relative right-0 h-content-window overflow-hidden">
    <div class="w-full h-full bg-white overflow-auto p-2">
      <div>
        <ProfileHeader />
        <section class="mt-5">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.aboutMe.whoIAm') }}</h2>
          <p class="mt-2">{{ $t('windows.aboutMe.whoIAmText') }}</p>
        </section>
        <section class="mt-5">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.aboutMe.passions') }}</h2>
          <p class="mt-2">{{ $t('windows.aboutMe.passionsText') }}</p>
        </section>
        <section class="mt-5">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.aboutMe.creations') }}</h2>
          <p class="mt-2">{{ $t('windows.aboutMe.creationsText') }}</p>
        </section>
        <section class="mt-5">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.aboutMe.howItWorks') }}</h2>
          <p class="mt-2">{{ $t('windows.aboutMe.howItWorksText') }}</p>
        </section>
      </div>
    </div>
  </div>
</template>
