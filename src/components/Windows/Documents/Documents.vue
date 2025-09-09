<template>
  <div class="relative right-0 h-content-window flex">
    <WindowLeftMenu :leftMenuType="props.leftMenuType" />
    <div class="w-full h-full bg-white overflow-auto overflow-x-hidden pb-8 md:pb-5 relative">
      <div class="p-4">
        <section v-if="!goBackStore.currentActiveDocument">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="page in pages"
              :key="page.name"
              @click="focusPage(page)"
              @dblclick="toggleProject(page)"
              class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors"
              :class="{ 'bg-blue-50 border border-blue-200': page.isFocused }"
            >
              <img :src="'/img/icons/documents/' + page.icon" alt="Office icon" class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" :style="{ opacity: page.isFocused ? 0.7 : 1 }" />
              <div class="min-w-0 flex-1">
                <p class="text-xs font-tahoma font-medium leading-tight">{{ $t(page.name) }}</p>
                <p :class="'text-xs ' + [page.isFocused ? 'text-blue-600' : 'text-gray-500']">{{ $t(page.type) }}</p>
                <p :class="'text-xs ' + [page.isFocused ? 'text-blue-600' : 'text-gray-500']">{{ page.size }}</p>
              </div>
            </div>
          </div>
        </section>
        <component :is="currentComponent" v-if="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useGoBackStore } from '@/stores/goBackStore'
import WindowLeftMenu from '@/components/Windows/WindowLeftMenu.vue'
import OriginMemory from './OriginMemory.vue'
import YouFoundThis from './YouFoundThis.vue'
import TheSpaceBetweenWorlds from './TheSpaceBetweenWorlds.vue'
import FieldCoherence from './FieldCoherence.vue'
import CreationIsntProduction from './CreationIsntProduction.vue'
import ScienceWillCatchUp from './ScienceWillCatchUp.vue'
import TheArchitectureOfForgetting from './TheArchitectureOfForgetting.vue'

// Stores management
const goBackStore = useGoBackStore()

const props = defineProps({
  leftMenuType: String
})

const pages = ref([
  {
    name: 'windows.documents.about.title',
    type: 'common.textDocument',
    icon: 'txt-icon.webp',
    size: '6KB',
    isFocused: false,
    isActive: false,
    component: 'YouFoundThis'
  },
  {
    name: 'windows.documents.000: origin memory.title',
    type: 'common.textDocument',
    icon: 'txt-icon.webp',
    size: '8KB',
    isFocused: false,
    isActive: false,
    component: 'OriginMemory'
  },
  {
    name: 'windows.documents.theSpaceBetweenWorlds.title',
    type: 'common.textDocument',
    icon: 'txt-icon.webp',
    size: '10KB',
    isFocused: false,
    isActive: false,
    component: 'TheSpaceBetweenWorlds'
  },
  {
    name: 'windows.documents.fieldCoherence.title',
    type: 'common.textDocument',
    icon: 'txt-icon.webp',
    size: '14KB',
    isFocused: false,
    isActive: false,
    component: 'FieldCoherence'
  },
  {
    name: 'windows.documents.creationIsntProduction.title',
    type: 'common.textDocument',
    icon: 'txt-icon.webp',
    size: '9KB',
    isFocused: false,
    isActive: false,
    component: 'CreationIsntProduction'
  },
  {
    name: 'windows.documents.scienceWillCatchUp.title',
    type: 'common.textDocument',
    icon: 'txt-icon.webp',
    size: '13KB',
    isFocused: false,
    isActive: false,
    component: 'ScienceWillCatchUp'
  },
  {
    name: 'windows.documents.theArchitectureOfForgetting.title',
    type: 'common.textDocument',
    icon: 'txt-icon.webp',
    size: '11KB',
    isFocused: false,
    isActive: false,
    component: 'TheArchitectureOfForgetting'
  }
])

const componentMap = {
  YouFoundThis,
  OriginMemory,
  TheSpaceBetweenWorlds,
  FieldCoherence,
  CreationIsntProduction,
  ScienceWillCatchUp,
  TheArchitectureOfForgetting
}

const currentComponent = computed(() => {
  const activeDocument = goBackStore.currentActiveDocument
  return activeDocument ? componentMap[activeDocument.component] : null
})

onUnmounted(() => {
  goBackStore.currentActiveDocument = null
})

const toggleProperty = (page, property) => {
  if (page[property]) {
    return
  }

  pages.value.forEach((p) => {
    p[property] = false
  })

  page[property] = !page[property]
}

const toggleProject = (page) => {
  toggleProperty(page, 'isActive')
  goBackStore.currentActiveDocument = page
}

const focusPage = (page) => {
  toggleProperty(page, 'isFocused')
}
</script>
