<script setup>
import { ref } from 'vue'
import ProfileHeader from './ProfileHeader.vue'

const birthdate = new Date(1999, 8, 23) // September 23, 1999 8 is the month index starting at 0
const today = new Date()
let age = ref(today.getFullYear() - birthdate.getFullYear())

// Adjust age if the current date has not passed the birthdate in the current year
if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
  age.value--
}
</script>

<template>
  <div class="relative right-0 h-content-window overflow-hidden">
    <div class="w-full h-full bg-white overflow-auto p-2">
      <div>
        <ProfileHeader :age="age" />
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
      </div>
    </div>
  </div>
  <a
    rel="noopener"
    :href="'pdf/About_Me_alexis_musaelyan_' + localeStore.currentLocale + '.pdf'"
    :download="'About_Me_alexis_musaelyan_' + localeStore.currentLocale + '.pdf'"
    class="absolute bottom-2 right-1 md:right-4 h-6 text-xxs border border-twilight-blue bg-button-submit rounded-sm leading-loose px-3 hover:shadow-button-submit-hover cursor-pointer active:bg-button-clicked"
  >
    {{ $t('buttons.downloadAboutMe') }}
  </a>
</template>
