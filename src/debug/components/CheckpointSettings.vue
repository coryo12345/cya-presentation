<template>
  <section class="p-3 bg-gray-900 rounded-xl text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-4">Checkpoint Settings</h2>
    <div class="flex flex-wrap gap-2">
      <button
        class="cursor-pointer border border-gray-700 rounded-md px-2 py-1 grow basis-0 min-w-3xs text-lg hover:bg-gray-800 transition-colors"
        @click="state.restart()"
      >
        Restart
      </button>
      <button
        class="cursor-pointer border border-gray-700 rounded-md px-2 py-1 grow basis-0 min-w-3xs text-lg hover:bg-gray-800 transition-colors"
        @click="state.saveCheckpoint()"
      >
        Save Checkpoint
      </button>
      <button
        class="border border-gray-700 rounded-md px-2 py-1 grow basis-0 min-w-3xs text-lg transition-colors"
        :class="checkpointLastLocation ? 'cursor-pointer hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'"
        :disabled="!checkpointLastLocation"
        @click="state.loadCheckpoint()"
      >
        <div class="text-lg">Load Checkpoint</div>
        <div class="text-sm italic text-gray-200">
          {{ checkpointLastLocation?.title ?? checkpointLastLocation?.id ?? '' }}
        </div>
      </button>
    </div>
  </section>
</template>

<script setup>
import { PAGES } from '@/game/pages';
import { state } from '@/game/state';
import { computed } from 'vue';

const checkpointLastLocation = computed(() => {
  const info = state.getCheckpointInfo();
  if (!info) return;
  const locId = info.history[info.history.length - 1];
  return PAGES.find((page) => page.id === locId);
});
</script>
