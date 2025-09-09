<template>
  <div class="absolute bottom-0 w-full bg-player h-14 shadow-inner">
    <div class="flex items-center justify-between h-full px-2">
      <div class="w-1/3">
        <div class="flex items-center gap-2">
          <img v-if="currentTrack.album && currentTrack.album.images" :src="currentTrack.album.images[0].url" alt="cover album musique" class="w-10 h-10 rounded-sm" />
          <div class="flex flex-col mr-5 w-full">
            <p class="text-xs font-trebuchet-pixel truncate">{{ currentTrack.name }}</p>
            <p class="text-xs font-trebuchet-pixel truncate">
              {{ currentTrack.artists ? currentTrack.artists[0].name : '' }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-1/3 flex items-center justify-center">
        <button @click="previousTrack" class="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 cursor-pointer">
          <img src="/img/icons/music/previous-icon.webp" alt="Musique précédente" class="w-full h-full" />
        </button>
        <button
          @click="togglePlay"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 relative overflow-hidden play-button cursor-pointer"
          :class="{ 'is-playing': isPlaying }"
        ></button>
        <button @click="nextTrack" class="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 cursor-pointer">
          <img src="/img/icons/music/next-icon.webp" alt="Musique suivante" class="w-full h-full" />
        </button>
      </div>
      <div class="w-1/3">
        <p class="text-xs font-trebuchet-pixel text-center">{{ formatTime(currentTime) }} / {{ formatTime(audioElement && audioElement.duration ? audioElement.duration * 1000 : currentTrack.duration_ms) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue'
import { useVolumeStore } from '@/stores/volumeStore'

const props = defineProps({
  playlist: {
    type: Array,
    required: true
  },
  trackToggled: String
})

const volumeStore = useVolumeStore()
const currentTrack = ref(props.playlist[0])
const isPlaying = ref(false)
const currentTime = ref(0)
const trackTime = ref(0)
let audioElement = null

const updateCurrentTime = () => {
  if (audioElement) {
    currentTime.value = audioElement.currentTime * 1000 // Convert to milliseconds
  }
  // Use actual audio duration instead of JSON duration_ms
  if (audioElement && audioElement.duration && currentTime.value >= audioElement.duration * 1000) {
    nextTrack()
  }
}

// Function to get the correct filename for a track
const getTrackFilename = (track) => {
  const filenameMap = {
    '0gws6FQUcFkNQQ7zTSPHQ3': 'Your Voice [lG3DvOzlZV4].mp3',
    '2UXEwIOtNGUUgGdXnds8V7': 'Goapele   Closer.mp3',
    '69NZl0552PdRSLB1FtzJ8V': 'Nobody Knows Me.mp3',
    '1ew2tHNanpNqx9cV15hGYM': 'Softly Softly.mp3',
    '7KZqVqDuJOlxwwZa6mmOGS': 'I Wanna Be Where You Are (Unedited Mix).mp3',
    '0VyCznZeMBOKcYAbg5tBn0': 'Luedji Luna - Asas.mp3',
    '5wAjg3auML6dlNuTxgipWn': 'Give Myself to You.mp3',
    '6kpNsMaTHS55hHPKJAagsT': 'Yuri Tanaka  Sky Restaurant.mp3',
    '5cndcvx5f5sR80N5RolUh4': 'Bliss - Wish You Were Here.mp3',
    '15EPc80XuFrb2LmOzGjuRg': 'GoldLink - Crew ft. Brent Faiyaz, Shy Glizzy.mp3',
    '4RE2d0lbKxbndeTy73eu4d': 'Sade Adu - Young Lion (Official Audio).mp3',
    '75w90hoCMVISvw80Kqbznq': 'Paul Grant - U (feat. brayla) (Official Audio).mp3',
    '5nkUIVKqOqdpB6ApKgEMkv': 'Jhene Aiko - Stay Ready (What A Life) (Lyrics) ft. Kendrick Lamar.mp3',
    '0ObFJdF5BiheDRKAXNjrpS': 'O Sonho Voltou.mp3',
    '4NaIl2XLSgc5AoFIZm1NIU': 'Poxa.mp3',
    '5HCTbcF18u5DcYNwEWWf3n': 'Ayonha.mp3',
    '6nVT7yKO7jV4Qw6PZ9B0PK': 'Thievery Corporation - Saudade [Official Audio].mp3',
    '6zE2xJvFmHEPECsvLki2CE': 'Alberto Baldan Bembo - Linda (1975).mp3',
    '6lezg9kxhv97VVHlsbRpYu': 'iliona - J\'ai du mal (Clip Officiel).mp3',
    '1NlWBpNYAnFT7gMGyC0Y1M': 'Mereba - Sandstorm ft. JID (Audio).mp3',
    '3kXUheF6zMgjzNlNp0u2jo': 'Snow over Leningrad.mp3',
    '0FTpFi1BlqoBVELlh7jK50': 'Le Depart.mp3',
    'new-marvin-gaye': 'Marvin Gaye - I Want You (1981, Rehearsal).mp3',
    'new-beautiful-days': 'Beautiful Days.mp3'
  }
  
  return filenameMap[track.id] || `${track.id}.mp3`
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  const audioFile = '/musics/' + getTrackFilename(currentTrack.value)
  if (isPlaying.value) {
    volumeStore.playAudio(audioFile)
    audioElement = volumeStore.audioElements[audioFile]
    audioElement.addEventListener('timeupdate', updateCurrentTime)
  } else {
    volumeStore.pauseAudio(audioFile)
    if (audioElement) {
      audioElement.removeEventListener('timeupdate', updateCurrentTime)
    }
  }
}

const previousTrack = () => {
  const currentIndex = props.playlist.findIndex((track) => track.id === currentTrack.value.id)
  const currentAudioFile = '/musics/' + getTrackFilename(currentTrack.value)
  volumeStore.pauseAudio(currentAudioFile)
  volumeStore.resetAudio(currentAudioFile)
  currentTime.value = 0

  if (audioElement) {
    audioElement.removeEventListener('timeupdate', updateCurrentTime)
  }

  if (currentIndex === 0) {
    currentTrack.value = props.playlist[props.playlist.length - 1]
  } else {
    currentTrack.value = props.playlist[currentIndex - 1]
  }

  const newAudioFile = '/musics/' + getTrackFilename(currentTrack.value)
  if (isPlaying.value) {
    volumeStore.playAudio(newAudioFile)
    audioElement = volumeStore.audioElements[newAudioFile]
    audioElement.addEventListener('timeupdate', updateCurrentTime)
  }
}

const nextTrack = () => {
  const currentIndex = props.playlist.findIndex((track) => track.id === currentTrack.value.id)
  const currentAudioFile = '/musics/' + getTrackFilename(currentTrack.value)
  volumeStore.pauseAudio(currentAudioFile)
  volumeStore.resetAudio(currentAudioFile)
  currentTime.value = 0

  if (audioElement) {
    audioElement.removeEventListener('timeupdate', updateCurrentTime)
  }

  if (currentIndex === props.playlist.length - 1) {
    currentTrack.value = props.playlist[0]
  } else {
    currentTrack.value = props.playlist[currentIndex + 1]
  }

  const newAudioFile = '/musics/' + getTrackFilename(currentTrack.value)
  if (isPlaying.value) {
    volumeStore.playAudio(newAudioFile)
    audioElement = volumeStore.audioElements[newAudioFile]
    audioElement.addEventListener('timeupdate', updateCurrentTime)
  }
}

function formatTime(ms) {
  if (ms == null || isNaN(ms) || ms == undefined) {
    return '0:00'
  }
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// watch the  trackToggled prop to play the track if it's different from the current track
watch(
  () => props.trackToggled,
  (newTrack) => {
    if (newTrack !== currentTrack.value.id) {
      const currentAudioFile = '/musics/' + getTrackFilename(currentTrack.value)
      volumeStore.pauseAudio(currentAudioFile)
      volumeStore.resetAudio(currentAudioFile)
      currentTime.value = 0

      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateCurrentTime)
      }

      currentTrack.value = props.playlist.find((track) => track.id === newTrack)
      const newAudioFile = '/musics/' + getTrackFilename(currentTrack.value)
      if (isPlaying.value) {
        volumeStore.playAudio(newAudioFile)
        audioElement = volumeStore.audioElements[newAudioFile]
        audioElement.addEventListener('timeupdate', updateCurrentTime)
      }
    }
  }
)

onUnmounted(() => {
  if (audioElement) {
    audioElement.removeEventListener('timeupdate', updateCurrentTime)
  }
  // Reset component state if window is closed
  const currentAudioFile = '/musics/' + getTrackFilename(currentTrack.value)
  volumeStore.pauseAudio(currentAudioFile)
  volumeStore.resetAudio(currentAudioFile)
  currentTime.value = 0
})
</script>

<style scoped>
.play-button {
  background-image: url('/img/icons/music/play-icon.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.play-button:hover {
  background-image: url('/img/icons/music/play-icon-hover.webp');
}

.play-button.is-playing {
  background-image: url('/img/icons/music/pause-icon.webp');
}
</style>
