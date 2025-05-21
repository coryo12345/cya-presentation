<template>
  <section class="p-3 bg-gray-900 rounded-xl text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-4">Action Unlocker</h2>
    <div class="flex flex-col gap-2">
      <div class="relative mt-2" ref="dropdownContainer">
        <input
          type="text"
          v-model="searchQuery"
          @focus="showDropdown = true"
          placeholder="Search pages..."
          class="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          v-if="showDropdown"
          class="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div
            v-for="page in filteredPages"
            :key="page.id"
            @click="selectPage(page)"
            class="px-3 py-2 hover:bg-gray-700 cursor-pointer"
          >
            <div class="font-medium">{{ page.title ?? '(unnamed)' }}</div>
            <div class="text-sm text-gray-400 font-mono">{{ page.id }}</div>
          </div>
        </div>
      </div>

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
import { computed, ref, onMounted, onUnmounted } from 'vue';

const searchQuery = ref('');
const showDropdown = ref(false);
const dropdownContainer = ref(null);
const selectedPage = ref(null);

const filteredPages = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return PAGES.filter((page) => page.title?.toLowerCase().includes(query) || page.id.toLowerCase().includes(query));
});

const actionsTaken = computed(() => {
  if (!selectedPage.value) return [];
  const pageId = selectedPage.value.id;
  const fullState = state.debug.getFullState();
  return fullState.actionsTaken[pageId] || [];
});

const selectPage = (page) => {
  selectedPage.value = page;
  showDropdown.value = false;
  searchQuery.value = '';
};

const removeAction = (actionName) => {
  if (selectedPage.value) {
    state.debug.removeAction(selectedPage.value.id, actionName);
  }
};

const handleClickOutside = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
