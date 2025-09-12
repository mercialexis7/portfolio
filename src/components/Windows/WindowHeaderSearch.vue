<template>
  <div v-if="isSearchVisible" class="flex items-center top-0 w-full h-5 px-0.5 bg-window-white border-top-grey shadow-header-window">
    <div>
      <p class="small-p text-gray-500 px-1.5 cursor-default">{{ $t('common.address') }}</p>
    </div>
    <div class="w-full h-full bg-white border-2 border-gray-400 pl-1 flex items-center justify-between relative dropdown-container" style="border-right: 2px inset #c0c0c0; border-bottom: 2px inset #c0c0c0;">
      <div class="flex items-center overflow-hidden flex-1">
        <img :src="iconSrc" alt="projects-icon" class="w-3.5 h-3.5" />
        <input
          v-if="isEditing"
          ref="addressInput"
          v-model="searchQuery"
          @keydown.enter="handleSearch"
          @keydown.escape="cancelEdit"
          @blur="cancelEdit"
          class="px-1 small-p flex-1 bg-white outline-none border-none"
          :placeholder="currentPath"
        />
        <p v-else @click="startEdit" class="px-1 small-p cursor-text truncate mt-px flex-1">
          {{ currentPath }}
        </p>
      </div>
      <div class="flex items-center">
        <div v-if="isEditing" class="mr-1">
          <img
            src="/img/icons/windows-header-tools/magnifier-icon.webp"
            alt="search"
            class="w-3.5 h-3.5 cursor-pointer hover:brightness-110"
            @click="handleSearch"
          />
        </div>
        <div class="mr-0.5 hover:brightness-110">
          <img
            src="/img/icons/windows-header-tools/down-icon.webp"
            alt="dropdown"
            class="w-3.5 h-3.5 cursor-pointer"
            @click="toggleDropdown"
          />
        </div>
      </div>

      <!-- Dropdown Menu -->
      <div
        v-if="showDropdown"
        class="absolute top-full left-0 right-0 bg-white border-2 border-gray-600 shadow-lg z-50 max-h-64 overflow-y-auto"
        style="border-top: 2px solid #c0c0c0; box-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
      >
        <!-- Search Input in Dropdown -->
        <div class="p-1 border-b border-gray-400 bg-gray-50">
          <div class="flex items-center bg-white border border-gray-600 px-1 py-0.5" style="border-right: 1px inset #c0c0c0; border-bottom: 1px inset #c0c0c0;">
            <input
              ref="dropdownSearchInput"
              v-model="dropdownSearchQuery"
              @input="filterItems"
              class="flex-1 text-xs bg-transparent outline-none border-none"
              :placeholder="props.id === 'documents' ? $t('common.searchDocuments') : $t('common.searchProjects')"
            />
          </div>
        </div>

        <!-- Navigation Items -->
        <div class="py-1">
          <!-- Documents Section (only show in documents window) -->
          <div v-if="props.id === 'documents' && filteredDocuments.length > 0" class="px-1 py-1">
            <div
              v-for="doc in filteredDocuments"
              :key="doc.id"
              @click="navigateToDocument(doc.id)"
              class="flex items-center px-2 py-1 text-xs hover:bg-blue-100 cursor-pointer"
            >
              <span>{{ doc.title }}</span>
            </div>
          </div>

          <!-- Projects Section (only show in projects window) -->
          <div v-if="props.id === 'myProjects' && filteredProjects.length > 0" class="px-1 py-1">
            <div
              v-for="project in filteredProjects"
              :key="project.name"
              @click="navigateToProject(project.name)"
              class="flex items-center px-2 py-1 text-xs hover:bg-blue-100 cursor-pointer"
            >
              <span>{{ project.title }}</span>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="((props.id === 'documents' && filteredDocuments.length === 0) || (props.id === 'myProjects' && filteredProjects.length === 0)) && dropdownSearchQuery" class="px-4 py-2 text-xs text-gray-500 text-center">
            {{ $t('common.noResults') }}
          </div>

          <!-- Empty State -->
          <div v-if="!dropdownSearchQuery && ((props.id === 'documents' && filteredDocuments.length === 0) || (props.id === 'myProjects' && filteredProjects.length === 0))" class="px-4 py-2 text-xs text-gray-500 text-center">
            {{ props.id === 'documents' ? $t('common.textDocument') + 's' : $t('common.projects') }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center px-2 gap-1 w-20 bg-gray-100 border-2 border-gray-400" style="border-left: 2px outset #c0c0c0; border-top: 2px outset #c0c0c0; border-right: 2px inset #c0c0c0; border-bottom: 2px inset #c0c0c0;">
      <img src="/img/icons/windows-header-tools/right-green-arrow-icon.webp" :alt="$t('common.icon') + ' ' + $t('common.go')" class="w-3.5 h-3.5" />
      <p class="small-p cursor-default font-bold">{{ $t('common.go') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useGoBackStore } from '@/stores/goBackStore'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import projectData from '@/data/projects-data.json'

const goBackStore = useGoBackStore()
const { t, te } = useI18n()
const router = useRouter()

const props = defineProps({
  id: String,
  title: String,
  iconSrc: String,
  isSearchVisible: Boolean
})

// Reactive state
const isEditing = ref(false)
const searchQuery = ref('')
const showDropdown = ref(false)
const dropdownSearchQuery = ref('')
const addressInput = ref(null)
const dropdownSearchInput = ref(null)

// Available documents and projects
const documents = ref([
  { id: 'about', title: t('windows.documents.about.title'), component: 'YouFoundThis' },
  { id: '000: origin memory', title: t('windows.documents.000: origin memory.title'), component: 'OriginMemory' },
  { id: 'theSpaceBetweenWorlds', title: t('windows.documents.theSpaceBetweenWorlds.title'), component: 'TheSpaceBetweenWorlds' },
  { id: 'fieldCoherence', title: t('windows.documents.fieldCoherence.title'), component: 'FieldCoherence' },
  { id: 'creationIsntProduction', title: t('windows.documents.creationIsntProduction.title'), component: 'CreationIsntProduction' },
  { id: 'scienceWillCatchUp', title: t('windows.documents.scienceWillCatchUp.title'), component: 'ScienceWillCatchUp' },
  { id: 'theArchitectureOfForgetting', title: t('windows.documents.theArchitectureOfForgetting.title'), component: 'TheArchitectureOfForgetting' },
  { id: 'goAllIn', title: t('windows.documents.goAllIn.title'), component: 'GoAllIn' }
])

const pages = ref([
  { name: 'windows.documents.about.title', component: 'YouFoundThis' },
  { name: 'windows.documents.000: origin memory.title', component: 'OriginMemory' },
  { name: 'windows.documents.theSpaceBetweenWorlds.title', component: 'TheSpaceBetweenWorlds' },
  { name: 'windows.documents.fieldCoherence.title', component: 'FieldCoherence' },
  { name: 'windows.documents.creationIsntProduction.title', component: 'CreationIsntProduction' },
  { name: 'windows.documents.scienceWillCatchUp.title', component: 'ScienceWillCatchUp' },
  { name: 'windows.documents.theArchitectureOfForgetting.title', component: 'TheArchitectureOfForgetting' },
  { name: 'windows.documents.goAllIn.title', component: 'GoAllIn' }
])

const projects = ref([
  { name: 'the joke is god', title: 'the joke is god', icon: 'projects-books.webp' },
  { name: 'leave the door open', title: 'leave the door open', icon: 'projects-books.webp' },
  { name: 'flow', title: 'flow', icon: 'projects-books.webp' },
  { name: 'research', title: 'research', icon: 'projects-research.webp' },
  { name: 'sound', title: 'sound', icon: 'projects-music.webp' },
  { name: 'threshold', title: 'threshold', icon: 'projects-threshold.webp' }
])

// Get full project data from JSON file for navigation
const fullProjectsData = ref(
  projectData.categories.flatMap(category =>
    category.projects.map(project => ({
      ...project,
      displayTitle: project.title.en.replace(' - poetry collection', '').replace(' - novel', '') // Remove suffixes for display
    }))
  )
)

// Computed properties
const currentPath = computed(() => {
  let formattedName = ''
  if (props.id === 'myProjects') {
    formattedName = formatName(goBackStore.currentActiveProject?.name)
  } else if (props.id === 'documents') {
    formattedName = formatName(goBackStore.currentActiveDocument?.name)
  }
  return formattedName ? `${props.title}/${formattedName}` : props.title
})

const filteredDocuments = computed(() => {
  if (!dropdownSearchQuery.value) return documents.value
  return documents.value.filter(doc =>
    doc.title.toLowerCase().includes(dropdownSearchQuery.value.toLowerCase())
  )
})

const filteredProjects = computed(() => {
  if (!dropdownSearchQuery.value) return projects.value
  const query = dropdownSearchQuery.value.toLowerCase().trim()
  return projects.value.filter(project =>
    project.title.toLowerCase().includes(query) ||
    project.name.toLowerCase().includes(query) ||
    query.includes(project.title.toLowerCase()) ||
    query.includes(project.name.toLowerCase())
  )
})

// Methods
const formatName = (nameKey) => {
  if (!nameKey) return ''
  // Check if the translation exists
  if (te(nameKey)) {
    const translatedName = t(nameKey)
    return translatedName.toLowerCase().replace(/[()]/g, '').replace(/ /g, '-')
  }
  // If no translation is found, return the original nameKey
  return nameKey.toLowerCase().replace(/[()]/g, '').replace(/ /g, '-')
}

const startEdit = () => {
  isEditing.value = true
  searchQuery.value = currentPath.value
  nextTick(() => {
    addressInput.value?.focus()
  })
}

const cancelEdit = () => {
  isEditing.value = false
  searchQuery.value = ''
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Parse the search query to determine navigation
    const query = searchQuery.value.trim().toLowerCase()

    if (props.id === 'documents') {
      // Only search documents in documents window
      const documentMatch = documents.value.find(doc =>
        doc.title.toLowerCase().includes(query) || doc.id.toLowerCase().includes(query)
      )
      if (documentMatch) {
        navigateToDocument(documentMatch.id)
        return
      }
    } else if (props.id === 'myProjects') {
      // Only search projects in projects window
      const query = searchQuery.value.trim().toLowerCase()
      const projectMatch = projects.value.find(project =>
        project.title.toLowerCase().includes(query) ||
        project.name.toLowerCase().includes(query) ||
        query.includes(project.title.toLowerCase()) ||
        query.includes(project.name.toLowerCase())
      )
      if (projectMatch) {
        navigateToProject(projectMatch.name)
        return
      }
    }
  }
  cancelEdit()
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    nextTick(() => {
      dropdownSearchInput.value?.focus()
    })
  }
}

const filterItems = () => {
  // Filtering is handled by computed properties
}

const navigateToDocument = (documentId) => {
  // Find the document in the pages array to get the component name
  const documentPage = pages.value.find(page => page.name.includes(documentId) || page.component.toLowerCase().includes(documentId.toLowerCase()))

  if (documentPage) {
    // Update the goBackStore with the correct structure
    goBackStore.currentActiveDocument = {
      name: documentId,
      component: documentPage.component
    }
  } else {
    // Fallback for direct navigation
    goBackStore.currentActiveDocument = { name: documentId }
  }

  // Close dropdown and cancel edit
  showDropdown.value = false
  cancelEdit()
}

const navigateToProject = (projectName) => {
  // Find the full project data from the JSON file
  const fullProjectData = fullProjectsData.value.find(project => project.name === projectName)

  if (fullProjectData) {
    // Update the goBackStore with the complete project structure
    goBackStore.currentActiveProject = {
      ...fullProjectData,
      componentName: 'WorksContent' // All projects use WorksContent component
    }
  } else {
    // Fallback
    goBackStore.currentActiveProject = { name: projectName, componentName: 'WorksContent' }
  }

  // Close dropdown and cancel edit
  showDropdown.value = false
  cancelEdit()
}

const handleClickOutside = (e) => {
  const target = e.target
  const dropdown = target.closest('.dropdown-container')
  if (!dropdown && showDropdown.value) {
    showDropdown.value = false
  }
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
