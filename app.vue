<template>
  <div class="min-h-screen p-4 md:p-8 relative">
    <!-- Subtle ambient glow orbs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/[0.03] rounded-full blur-3xl animate-float" style="animation-delay: 3s"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <header class="max-w-5xl mx-auto mb-10 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <KeyboardIcon class="w-5 h-5 text-black" />
          </div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight">
            <span class="text-white">Typ</span><span class="text-gradient">AI</span>
          </h1>
        </div>

        <!-- Live Timer -->
        <div v-if="typing.isActive" class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
          <div class="text-2xl font-mono font-bold text-gradient tabular-nums tracking-wider">
            {{ Math.floor(typing.timeRemaining / 60).toString().padStart(2, '0') }}:{{ (typing.timeRemaining % 60).toString().padStart(2, '0') }}
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto">
        <ConfigPanel />
        
        <div v-if="!typing.isFinished">
          <TypingArea />
          <VirtualKeyboard v-if="config.showKeyboard && config.hasKeyboardLayout" />
        </div>

        <StatsPanel v-else />
      </main>

      <!-- Footer -->
      <footer class="max-w-5xl mx-auto mt-16 text-center text-xs text-gray-600">
        Powered by Gemini AI &middot; Built with Nuxt 3
      </footer>
    </div>

    <Toaster />
  </div>
</template>

<script setup>
import { KeyboardIcon } from 'lucide-vue-next'
import Toaster from '~/components/ui/toast/Toaster.vue'
import { useTypingStore } from '~/stores/typingStore'
import { useConfigStore } from '~/stores/configStore'

const typing = useTypingStore()
const config = useConfigStore()
</script>
