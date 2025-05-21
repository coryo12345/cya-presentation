<template>
  <section class="p-3 bg-gray-900 rounded-xl text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-4">Navigation Helper</h2>
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap gap-1 -mb-2">
        <p class="self-center">You are currently at:</p>
        <p class="text-lg self-end">{{ currentPage.title ?? 'unnamed' }}</p>
        <p class="text-sm italic text-gray-200 self-center font-mono">({{ currentPage.id }})</p>
      </div>
      <div class="relative mt-2" ref="dropdownContainer">
        <input
          type="text"
          v-model="searchQuery"
          @focus="showDropdown = true"
          placeholder="Search pages to teleport..."
          class="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          v-if="showDropdown"
          class="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div
            v-for="page in filteredPages"
            :key="page.id"
            @click="navigateTo(page.id)"
            class="px-3 py-2 hover:bg-gray-700 cursor-pointer"
          >
            <div class="font-medium">{{ page.title ?? '(unnamed)' }}</div>
            <div class="text-sm text-gray-400 font-mono">{{ page.id }}</div>
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

const currentPage = computed(() => state.currentPage);
const searchQuery = ref('');
const showDropdown = ref(false);
const dropdownContainer = ref(null);

const filteredPages = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return PAGES.filter((page) => page.title?.toLowerCase().includes(query) || page.id.toLowerCase().includes(query));
});

const navigateTo = (pageId) => {
  console.log('navigating to', pageId);
  state.goTo(pageId);
  showDropdown.value = false;
  searchQuery.value = '';
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
