<template>
  <div
    v-if="!showEndings"
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col items-center justify-center"
  >
    <div
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style="background-image: url('/img/oakhaven/medieval-village.jpg'); filter: blur(3px); transform: scale(1.05)"
    ></div>

    <div
      class="relative flex flex-col items-center z-10 px-8 py-12 bg-slate-900/80 rounded-lg border border-amber-700 max-w-2xl mx-auto"
    >
      <h1 class="text-6xl font-bold text-amber-400 mb-8 text-center">Choose Your Adventure</h1>

      <div class="flex flex-col gap-4 w-72">
        <button
          @click="startNewGame"
          class="rounded-lg px-6 py-3 border border-black cursor-pointer bg-amber-900 text-white hover:bg-amber-800 transition-colors"
        >
          <div class="text-2xl">New Game</div>
        </button>

        <button
          @click="showEndings = true"
          class="rounded-lg px-6 py-3 border border-black cursor-pointer bg-amber-900 text-white hover:bg-amber-800 transition-colors"
        >
          <div class="text-2xl">Endings</div>
        </button>
      </div>
    </div>
  </div>
  <EndingTracker v-else @back="showEndings = false"></EndingTracker>
</template>

<script setup>
import EndingTracker from '@/components/EndingTracker.vue';
import { state } from '@/game/state';
import { ref } from 'vue';

const startNewGame = () => {
  state.restart();
  state.goTo('tutorial');
};

const showEndings = ref(false);
</script>
