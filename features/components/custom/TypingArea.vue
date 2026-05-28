<template>
  <div 
    class="relative w-full leading-relaxed font-mono mb-8 select-none animate-fade-in"
    :dir="config.direction"
  >
    <!-- Target Text Display -->
    <div class="glass-strong rounded-2xl p-6 min-h-[160px] max-h-[320px] overflow-y-auto break-words mb-4 border-gradient z-0">
      <div v-if="!typing.targetText" class="flex flex-col items-center justify-center gap-3 min-h-[120px] text-gray-500">
        <svg class="w-12 h-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
        <p class="text-sm">Click <span class="text-amber-400 font-semibold">"Generate Text"</span> to begin</p>
      </div>
      <template v-else>
        <span 
          v-for="(char, index) in targetChars" 
          :key="index"
          :class="getCharClass(index)"
          class="transition-all duration-100 text-[22px] md:text-[26px]"
        >
          <span v-if="char === ' ' && getCharClass(index).includes('bg-rose-500/20')" class="px-0.5 mx-0.5 rounded">·</span>
          <span v-else>{{ char }}</span>
        </span>
      </template>
    </div>

    <!-- Separator with label -->
    <div class="flex items-center gap-3 mb-4 px-2">
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <span class="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold">your input</span>
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>

    <!-- Visible Input Field -->
    <textarea
      ref="visibleInput"
      v-model="inputValue"
      @input="handleInput"
      @keydown="handleKeydown"
      :disabled="!typing.targetText || typing.isFinished"
      :class="['w-full p-5 text-xl md:text-2xl font-mono rounded-2xl resize-none', 
             config.showKeyboard ? 'h-[150px]' : 'h-[250px]',
             'bg-white/[0.04] border border-white/[0.08] text-gray-200 placeholder:text-gray-600 transition-all duration-300 focus:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:bg-white/[0.06] disabled:bg-white/[0.02] disabled:border-white/[0.04] disabled:text-gray-700 disabled:cursor-not-allowed']"
      :placeholder="!typing.targetText ? 'Input will be enabled after text is generated...' : 'Start typing here...'"
      spellcheck="false"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useConfigStore } from '~/features/stores/configStore'
import { useTypingStore } from '~/features/stores/typingStore'
import { useToast } from '~/features/components/ui/toast/use-toast'

const config = useConfigStore()
const typing = useTypingStore()
const { toast } = useToast()
const visibleInput = ref(null)
const inputValue = ref('')

const targetChars = computed(() => typing.targetText.split(''))

function focusInput() {
  if (visibleInput.value && !typing.isFinished && typing.targetText) {
    visibleInput.value.focus()
  }
}

watch(() => typing.targetText, (newVal) => {
  inputValue.value = ''
  if (newVal) {
    setTimeout(focusInput, 100)
    triggerToast()
  }
})

function getCharClass(index) {
  if (index < inputValue.value.length) {
    const isCorrect = inputValue.value[index] === targetChars.value[index]
    return isCorrect
      ? 'text-emerald-400'
      : 'text-rose-400 bg-rose-500/20 rounded-sm'
  } else if (index === inputValue.value.length) {
    return 'text-amber-300 bg-amber-500/20 rounded-sm animate-pulse'
  }
  return 'text-gray-500'
}

function handleKeydown(e) {
  if (!typing.isActive && typing.targetText && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    typing.startSession(config.timeLimit)
  }

  // Smart mapping (Transliteration)
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    const mappedChar = getMappedChar(config.language, e.key)
    if (mappedChar) {
      e.preventDefault()
      inputValue.value += mappedChar
      handleInput() // Manually trigger validation
    }
  }
}

function triggerToast() {
  toast({
    title: '🚀 Text is ready!',
    description: 'The timer will start when you begin typing.',
    duration: 4000,
  })
}

function handleInput() {
  typing.typedInput = inputValue.value
  
  let errCount = 0
  for(let i=0; i<inputValue.value.length; i++) {
    if(inputValue.value[i] !== targetChars.value[i]) {
      errCount++
    }
  }
  typing.errors = errCount

  if (inputValue.value.length === targetChars.value.length && targetChars.value.length > 0) {
    typing.finishSession()
  }
}

onMounted(() => {
  focusInput()
})
</script>
