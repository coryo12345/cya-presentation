<template>
  <section class="p-3 bg-gray-900 rounded-xl text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-4">Action Unlocker</h2>
    <div class="flex flex-col gap-2">
      <Autocomplete 
        :items="PAGES" 
        placeholder="Search pages..."
        @select="selectPage"
      />

      <div v-if="selectedPage" class="mt-4">
        <div class="flex flex-wrap gap-1 mb-2">
          <p class="self-center">Actions taken on page:</p>
          <p class="text-lg self-end">{{ selectedPage.title ?? 'unnamed' }}</p>
          <p class="text-sm italic text-gray-200 self-center font-mono">({{ selectedPage.id }})</p>
        </div>

        <div v-if="actionsTaken.length === 0" class="text-gray-400 italic mt-2">
          No actions have been taken on this page.
        </div>

        <div v-else class="mt-2 flex flex-col gap-2">
          <div
            v-for="(action, index) in actionsTaken"
            :key="index"
            class="flex justify-between items-center px-3 py-2 bg-gray-800 rounded-lg"
          >
            <span>{{ action }}</span>
            <button
              @click="removeAction(action)"
              class="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-700"
              title="Remove this action"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PAGES } from '@/game/pages';
import { state } from '@/game/state';
import { computed, ref } from 'vue';
import Autocomplete from '@/components/Autocomplete.vue';

const selectedPage = ref(null);

const actionsTaken = computed(() => {
  if (!selectedPage.value) return [];
  const pageId = selectedPage.value.id;
  const fullState = state.debug.getFullState();
  return fullState.actionsTaken[pageId] || [];
});

const selectPage = (page) => {
  selectedPage.value = page;
};

const removeAction = (actionName) => {
  if (selectedPage.value) {
    state.debug.removeAction(selectedPage.value.id, actionName);
  }
};
</script>