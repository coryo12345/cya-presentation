<template>
  <div>
    <slot name="activator" v-bind="{ open }"></slot>
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gray-800 text-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        <h2 class="text-xl font-semibold mb-4" v-html="title"></h2>
        <p class="mb-4 whitespace-pre-line" v-html="message"></p>
        <div class="flex justify-end gap-3">
          <button
            @click="cancel"
            class="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded-md transition-colors cursor-pointer"
          >
            {{ cancelText }}
          </button>
          <button
            @click="confirm"
            class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Confirm Action',
  },
  message: {
    type: String,
    default: 'Are you sure you want to perform this action?',
  },
  confirmText: {
    type: String,
    default: 'Yes',
  },
  cancelText: {
    type: String,
    default: 'No',
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const isOpen = ref(false);

const open = () => {
  isOpen.value = true;
};

const confirm = () => {
  emit('confirm');
  isOpen.value = false;
};

const cancel = () => {
  emit('cancel');
  isOpen.value = false;
};

// Expose functions to parent components
defineExpose({
  open,
  close: () => {
    isOpen.value = false;
  },
});
</script>
