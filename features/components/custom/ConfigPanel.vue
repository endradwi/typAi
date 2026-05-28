<template>
  <div class="card mb-8 animate-fade-in relative z-50">
    <!-- Config Row -->
    <div class="flex flex-wrap gap-3 items-center justify-between">
      <div class="flex gap-3 items-center flex-wrap">
        <!-- Language -->
        <div class="flex flex-col gap-1.5 relative z-[100]" ref="dropdownRef">
          <label class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Language</label>
          <button @click="toggleDropdown" class="input-glass w-[140px] flex items-center justify-between " :disabled="typing.isActive || typing.isFinished">
            <span class="truncate">{{ config.language }}</span>
            <ChevronDownIcon class="w-4 h-4 opacity-50 shrink-0" />
          </button>
          
          <div v-if="isOpen" class="absolute top-full left-0 mt-2 w-[220px] bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden z-50 animate-fade-in shadow-[0_16px_40px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
            <div class="p-2 border-b border-white/[0.08]">
              <input 
                v-model="searchQuery" 
                @input="debouncedSearch"
                type="text" 
                placeholder="Search language..." 
                class="w-full bg-black/40 text-sm text-gray-200 px-3 py-1.5 rounded-lg border border-white/5 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 placeholder:text-gray-500"
              />
            </div>
            <ul class="max-h-[250px] overflow-y-auto py-1">
              <li 
                v-for="lang in filteredLanguages" 
                :key="lang"
                @click="selectLanguage(lang)"
                class="px-4 py-2 text-sm text-gray-300 hover:bg-white/[0.06] hover:text-white cursor-pointer transition-colors"
                :class="{ 'bg-amber-500/10 !text-amber-400': config.language === lang }"
              >
                {{ lang }}
              </li>
              <li v-if="filteredLanguages.length === 0" class="px-4 py-3 text-xs text-gray-500 text-center">
                No results found
              </li>
            </ul>
          </div>
        </div>

        <!-- Mode -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Mode</label>
          <select v-model="config.mode" class="input-glass" :disabled="typing.isActive || typing.isFinished">
            <option>Words</option>
            <option>Quotes</option>
            <option>Paragraph</option>
          </select>
        </div>

        <!-- Difficulty -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Difficulty</label>
          <select v-model="config.difficulty" class="input-glass" :disabled="typing.isActive || typing.isFinished">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <!-- Duration -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Duration</label>
          <select v-model="config.timeLimit" class="input-glass" :disabled="typing.isActive || typing.isFinished">
            <option :value="15">15s</option>
            <option :value="30">30s</option>
            <option :value="60">60s</option>
            <option :value="120">2m</option>
          </select>
        </div>
        <!-- Keyboard Toggle -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Keyboard</label>
          <button 
            @click="config.showKeyboard = !config.showKeyboard" 
            class="input-glass flex items-center justify-center min-w-[80px]" 
            :disabled="!config.hasKeyboardLayout || typing.isActive || typing.isFinished"
            :class="[
              config.hasKeyboardLayout && config.showKeyboard ? '!bg-amber-500/20 !border-amber-500/40 text-amber-400' : '',
              !config.hasKeyboardLayout ? 'opacity-50 cursor-not-allowed !bg-white/[0.02] !text-gray-600' : ''
            ]"
          >
            {{ !config.hasKeyboardLayout ? 'N/A' : (config.showKeyboard ? 'ON' : 'OFF') }}
          </button>
        </div>
      </div>

      <!-- Generate Button -->
      <button @click="generateText" class="btn-primary flex items-center gap-2" :disabled="isLoading || typing.isActive || typing.isFinished">
        <span class="relative z-10 flex items-center gap-2">
          <RefreshCwIcon v-if="isLoading" class="w-4 h-4 animate-spin" />
          <ZapIcon v-else class="w-4 h-4" />
          {{ isLoading ? 'Generating...' : 'Generate Text' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RefreshCwIcon, ZapIcon, ChevronDownIcon } from 'lucide-vue-next'
import { useConfigStore } from '~/features/stores/configStore'
import { useTypingStore } from '~/features/stores/typingStore'

const config = useConfigStore()
const typing = useTypingStore()
const isLoading = ref(false)

// Custom Dropdown Logic
const isOpen = ref(false)
const dropdownRef = ref(null)
const searchQuery = ref('')
const debouncedQuery = ref('')
let debounceTimer = null

function toggleDropdown() {
  if (!typing.isActive && !typing.isFinished) isOpen.value = !isOpen.value
}

function debouncedSearch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = searchQuery.value
  }, 300)
}

const filteredLanguages = computed(() => {
  if (!debouncedQuery.value) return config.allLanguages
  const q = debouncedQuery.value.toLowerCase()
  return config.allLanguages.filter(lang => lang.toLowerCase().includes(q))
})

function selectLanguage(lang) {
  config.language = lang
  isOpen.value = false
  searchQuery.value = ''
  debouncedQuery.value = ''
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

async function generateText() {
  isLoading.value = true
  try {
    const { data } = await useFetch('/api/generate', {
      method: 'POST',
      body: {
        language: config.language,
        mode: config.mode,
        difficulty: config.difficulty
      }
    })
    
    if (data.value?.text) {
      typing.resetSession()
      typing.targetText = data.value.text
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>
