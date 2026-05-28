<template>
  <div v-if="typing.isFinished" class="animate-slide-up" v-motion-pop>
    <!-- Result Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
        <span class="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
        Session Complete
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-white">Your Results</h2>
    </div>

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <!-- WPM -->
      <div class="stat-card border-gradient">
        <div class="text-5xl md:text-6xl font-bold text-gradient tabular-nums mb-2">{{ typing.wpm }}</div>
        <div class="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Words per Minute</div>
      </div>

      <!-- Accuracy -->
      <div class="stat-card border-gradient">
        <div class="text-5xl md:text-6xl font-bold tabular-nums mb-2">
          <span class="text-emerald-400">{{ typing.accuracy }}</span><span class="text-gray-500 text-3xl">%</span>
        </div>
        <div class="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Accuracy</div>
      </div>

      <!-- Errors -->
      <div class="stat-card border-gradient">
        <div class="text-5xl md:text-6xl font-bold tabular-nums mb-2">
          <span :class="typing.errors === 0 ? 'text-emerald-400' : 'text-rose-400'">{{ typing.errors }}</span>
        </div>
        <div class="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Errors</div>
      </div>
    </div>

    <!-- Action -->
    <div class="text-center">
      <button @click="restart" class="btn-primary px-8 py-3.5 text-base">
        <span class="relative z-10 flex items-center gap-2">
          <RotateCcwIcon class="w-4 h-4" />
          Try Again
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { RotateCcwIcon } from 'lucide-vue-next'
import { useTypingStore } from '~/features/stores/typingStore'
const typing = useTypingStore()

function restart() {
  typing.resetSession()
}
</script>
