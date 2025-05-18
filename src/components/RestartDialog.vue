<template>
  <RefreshIcon
    v-bind="$attrs"
    class="w-8 h-8 text-white rounded-lg bg-gray-800 p-1 opacity-30 cursor-pointer"
    role="button"
    @click="show = true"
  ></RefreshIcon>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
      <h2 class="text-xl font-semibold mb-4">Are you sure you want to restart?</h2>
      <div class="flex justify-end gap-3">
        <button @click="show = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
          No
        </button>
        <button
          @click="restart"
          class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RefreshIcon from '@/components/icons/RefreshIcon.vue';
import { state } from '@/game/state';

const show = defineModel({ type: Boolean, default: false });

function restart() {
  state.restart();
  show.value = false;
}
</script>
