<template>
  <section class="p-3 bg-gray-900 rounded-xl text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-4">Manage Inventory</h2>
    <div class="flex flex-col gap-2">
      <!-- Item Search -->
      <Autocomplete 
        :items="ITEMS" 
        placeholder="Search items to add..."
        :filterFunction="filterItems"
        @select="addItem"
      >
        <template #item="{ item }">
          <div class="font-medium">{{ item.name }}</div>
          <div class="text-sm text-gray-400 font-mono">{{ item.id }}{{ item.hidden ? ' (hidden)' : '' }}</div>
        </template>
      </Autocomplete>

      <!-- Current Inventory -->
      <div class="mt-4">
        <h3 class="text-xl font-semibold mb-2">Current Inventory</h3>

        <div v-if="playerInventory.length === 0" class="text-gray-400 italic mt-2">
          Inventory is empty. Use the search above to add items.
        </div>

        <div v-else class="mt-2 flex flex-col gap-2">
          <div
            v-for="item in playerInventory"
            :key="item.id"
            class="flex justify-between items-center px-3 py-2 bg-gray-800 rounded-lg"
          >
            <div class="flex flex-col">
              <span class="font-medium">
                <span v-if="item.hidden" title="Hidden item" class="inline-flex items-center mr-1">
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
                    class="text-gray-400"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="2" y1="2" x2="22" y2="22"></line>
                  </svg>
                </span>
                {{ item.name }}
                <span v-if="item.hidden" class="text-gray-400">(hidden)</span>
              </span>
              <span class="text-sm text-gray-400 font-mono">{{ item.id }}</span>
            </div>
            <button
              @click="removeItem(item)"
              class="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-700"
              title="Remove this item"
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
import { ITEMS } from '@/game/items';
import { state } from '@/game/state';
import { computed } from 'vue';
import Autocomplete from '@/components/Autocomplete.vue';

const playerInventory = computed(() => {
  return state.inventory;
});

const filterItems = (items, query) => {
  const lowercaseQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.id.toLowerCase().includes(lowercaseQuery) ||
      (item.description && item.description.toLowerCase().includes(lowercaseQuery)),
  );
};

const addItem = (item) => {
  state.addItem(item.id);
};

const removeItem = (item) => {
  state.removeItem(item.id);
};
</script>