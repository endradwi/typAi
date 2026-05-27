import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ISO6391 from 'iso-639-1'

export const useConfigStore = defineStore('config', () => {
  const timeLimit = ref(60) // in seconds
  const language = ref('English')
  const mode = ref('Words')
  const difficulty = ref('Medium')
  const showKeyboard = ref(false)

  const allLanguages = ISO6391.getAllNames().sort()
  const rtlLanguages = ['Arabic', 'Hebrew', 'Persian', 'Urdu', 'Pashto', 'Kurdish', 'Sindhi']
  
  const isRTL = computed(() => rtlLanguages.includes(language.value))
  const direction = computed(() => isRTL.value ? 'rtl' : 'ltr')

  const supportedKeyboardLayouts = ['English', 'Indonesian', 'Arabic', 'Russian', 'Korean', 'Kazakh', 'Spanish']
  const hasKeyboardLayout = computed(() => supportedKeyboardLayouts.includes(language.value))

  return {
    timeLimit,
    language,
    mode,
    difficulty,
    showKeyboard,
    allLanguages,
    hasKeyboardLayout,
    isRTL,
    direction
  }
})
