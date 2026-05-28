import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTypingStore = defineStore('typing', () => {
  const isActive = ref(false)
  const isFinished = ref(false)
  const targetText = ref('')
  const typedInput = ref('')
  
  const startTime = ref<number | null>(null)
  const timeRemaining = ref(0)
  let timerInterval: any = null

  const errors = ref(0)

  const wpm = computed(() => {
    if (!startTime.value) return 0;
    const elapsedMinutes = (Date.now() - startTime.value) / 60000;
    if (elapsedMinutes <= 0) return 0;
    const totalWords = typedInput.value.length / 5;
    return Math.round(totalWords / elapsedMinutes);
  })

  const accuracy = computed(() => {
    if (typedInput.value.length === 0) return 100;
    const correctChars = typedInput.value.length - errors.value;
    return Math.max(0, Math.round((correctChars / typedInput.value.length) * 100));
  })

  function startSession(duration: number) {
    isActive.value = true
    isFinished.value = false
    typedInput.value = ''
    errors.value = 0
    timeRemaining.value = duration
    startTime.value = Date.now()

    if (timerInterval) clearInterval(timerInterval)
    timerInterval = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        finishSession()
      }
    }, 1000)
  }

  function finishSession() {
    isActive.value = false
    isFinished.value = true
    if (timerInterval) clearInterval(timerInterval)
  }

  function resetSession() {
    isActive.value = false
    isFinished.value = false
    typedInput.value = ''
    targetText.value = ''
    errors.value = 0
    timeRemaining.value = 0
    startTime.value = null
    if (timerInterval) clearInterval(timerInterval)
  }

  return {
    isActive,
    isFinished,
    targetText,
    typedInput,
    timeRemaining,
    errors,
    wpm,
    accuracy,
    startSession,
    finishSession,
    resetSession
  }
})
