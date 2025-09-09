<template>
  <div class="relative right-0 h-content-window flex overflow-hidden">
    <WindowLeftMenu :leftMenuType="props.leftMenuType" />
    <!-- Content of project -->
    <div class="w-full h-full bg-pictures-blue overflow-x-hidden">
      <!-- Carroussel -->
      <div class="flex flex-col justify-center items-center w-full h-9/12 gap-1">
        <div v-if="currentPicture" class="w-3/4 h-5/6 mt-1 border border-black overflow-hidden">
          <div
            class="w-full h-full bg-contain bg-center bg-no-repeat"
            :style="{
              backgroundImage: `url(${currentPicture.url})`,
              transform: `rotate(${rotation}deg)`
            }"
          ></div>
        </div>
        <div v-else class="flex items-center justify-center py-8">
          <WindowsXpLoader />
        </div>
        <div class="flex py-2">
          <div class="flex gap-0.5">
            <button
              @click="previousPicture"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/previous-icon.svg" :alt="$t('windows.pictures.previous')" />
            </button>
            <button
              @click="nextPicture"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/next-icon.svg" :alt="$t('windows.pictures.next')" />
            </button>
          </div>
          <hr class="w-px mx-2 h-full bg-moon-mist" />
          <div class="flex">
            <button
              @click="rotateLeft"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/left.svg" :alt="$t('windows.pictures.rotateLeft')" />
            </button>
            <button
              @click="rotateRight"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/right.svg" :alt="$t('windows.pictures.rotateRight')" />
            </button>
          </div>
        </div>
      </div>
      <!-- Footer preview image -->
            <!-- Footer preview image -->
      <div class="w-full h-3/12">
        <div class="flex items-center px-2 pt-1.5 pb-5 gap-2 overflow-x-auto h-full">
          <div ref="pictureContainer" v-for="(picture, index) in pictures" :key="picture.id" class="flex flex-col items-center flex-shrink-0">
            <div
              ref="pictureElements"
              @click="setCurrentPicture(picture)"
              :class="
                'w-20 h-16 bg-no-repeat bg-cover bg-center cursor-pointer rounded-sm' +
                (currentPicture && currentPicture.id === picture.id ? '' : '')
              "
              :style="{ backgroundImage: 'url(' + picture.url + ')' }"
            />
            <p
              @click="setCurrentPicture(picture)"
              :class="[
                'text-center inline-block font-trebuchet-pixel text-xxs cursor-pointer mt-1 max-w-20 truncate',
                currentPicture && currentPicture.id === picture.id ? 'bg-focus-blue px-1 my-px text-white' : ''
              ]"
            >
              {{ picture.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import WindowLeftMenu from '@/components/Windows/WindowLeftMenu.vue'
import picturesData from '@/data/pictures-data.json'
import WindowsXpLoader from '@/components/Loading/WindowsXpLoader.vue'

const props = defineProps({
  leftMenuType: String
})

let currentPicture = ref(null)
let currentIndex = ref(0)
const pictures = picturesData.pictures
const rotation = ref(0) // Define the rotation ref
const pictureContainer = ref(null)
const pictureElements = ref([])

onMounted(() => {
  if (pictures && pictures.length > 0) {
    setTimeout(() => {
      currentPicture.value = pictures[0]
      nextTick(() => scrollToCurrentPicture())
    }, 100)
  } else {
    console.error('No pictures available in picturesData')
  }
})

const setCurrentPicture = (picture) => {
  currentPicture.value = picture
  currentIndex.value = pictures.findIndex((p) => p.id === picture.id)
  nextTick(() => scrollToCurrentPicture())
}

const previousPicture = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = pictures.length - 1
  } else {
    currentIndex.value--
  }
  currentPicture.value = pictures[currentIndex.value]
  nextTick(() => scrollToCurrentPicture())
}

const nextPicture = () => {
  if (currentIndex.value === pictures.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
  currentPicture.value = pictures[currentIndex.value]
  nextTick(() => scrollToCurrentPicture())
}

const rotateLeft = () => {
  rotation.value -= 90
}

const rotateRight = () => {
  rotation.value += 90
}

const scrollToCurrentPicture = () => {
  const currentElement = pictureElements.value[currentIndex.value]
  if (currentElement) {
    currentElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
}
</script>
