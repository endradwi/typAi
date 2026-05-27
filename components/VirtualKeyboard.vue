<template>
  <!-- Hidden on mobile as requested by PRD -->
  <div class="hidden md:flex flex-col gap-1.5 max-w-3xl mx-auto items-center mt-6 p-5 glass rounded-2xl animate-fade-in" :dir="'ltr'">
    <div v-for="(row, i) in currentLayout" :key="i" class="flex gap-1.5 justify-center w-full" :class="getRowIndent(i)">
      <div 
        v-for="key in row" 
        :key="key"
        class="keyboard-key text-gray-200"
        :class="{ 'keyboard-key-active': isActive(key) }"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useConfigStore } from '~/stores/configStore'

const config = useConfigStore()

const layouts = {
  English: [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
  ],
  Indonesian: [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
  ],
  Arabic: [
    ['ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج','د'],
    ['ش','س','ي','ب','ل','ا','ت','ن','م','ك','ط'],
    ['ئ','ء','ؤ','ر','لا','ى','ة','و','ز','ظ']
  ],
  Russian: [
    ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'],
    ['ф','ы','в','а','п','р','о','л','д','ж','э'],
    ['я','ч','с','м','и','т','ь','б','ю']
  ],
  Korean: [
    ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
    ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
    ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ']
  ],
  Kazakh: [
    ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'],
    ['ф','ы','в','а','п','р','о','л','д','ж','э'],
    ['я','ч','с','м','и','т','ь','б','ю']
  ],
  Spanish: [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l','ñ'],
    ['z','x','c','v','b','n','m']
  ]
}

const currentLayout = computed(() => {
  return layouts[config.language] || layouts.English
})

const activeKeys = ref(new Set())

function getRowIndent(index) {
  if (index === 1) return 'pl-4'
  if (index === 2) return 'pl-10'
  return ''
}

function handleKeyDown(e) {
  activeKeys.value.add(e.key.toLowerCase())
}

function handleKeyUp(e) {
  activeKeys.value.delete(e.key.toLowerCase())
}

function isActive(key) {
  return activeKeys.value.has(key.toLowerCase())
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>
