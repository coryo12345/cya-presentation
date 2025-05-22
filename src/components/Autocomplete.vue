<template>
  <div class="relative mt-2" ref="dropdownContainer">
    <input
      type="text"
      v-model="searchQuery"
      @focus="showDropdown = true"
      :placeholder="placeholder"
      class="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div
      v-if="showDropdown"
      class="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
        v-for="item in filteredItems"
        :key="item.id"
        @click="selectItem(item)"
        class="px-3 py-2 hover:bg-gray-700 cursor-pointer"
      >
        <slot name="item" :item="item">
          <div class="font-medium">{{ item.name || item.title || '(unnamed)' }}</div>
          <div class="text-sm text-gray-400 font-mono">{{ item.id }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  filterFunction: {
    type: Function,
    default: (items, query) => {
      const lowercaseQuery = query.toLowerCase();
      return items.filter(item => {
        const nameField = item.name || item.title || '';
        return nameField.toLowerCase().includes(lowercaseQuery) || 
               item.id.toLowerCase().includes(lowercaseQuery);
      });
    }
  }
});

const emit = defineEmits(['select']);

const searchQuery = ref('');
const showDropdown = ref(false);
const dropdownContainer = ref(null);

const filteredItems = computed(() => {
  return props.filterFunction(props.items, searchQuery.value);
});

const selectItem = (item) => {
  emit('select', item);
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