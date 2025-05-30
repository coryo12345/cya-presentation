<template>
  <div
    v-bind="$attrs"
    class="w-12 h-12 text-white rounded-lg bg-gray-800 p-1 opacity-30 cursor-pointer"
    @click="show = true"
  >
    <BackpackIcon></BackpackIcon>
  </div>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-end z-50" @click="show = false"></div>
  </Transition>
  <Transition name="slide">
    <div
      v-if="show"
      class="fixed right-0 top-0 bottom-0 h-screen w-96 bg-gray-800 p-4 overflow-y-auto z-51"
      @click.stop
    >
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-xl font-bold text-white">Inventory</h2>
        <button @click="show = false" class="text-white hover:text-gray-300 cursor-pointer">
          <span class="sr-only">Close</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-col justify-start items-start gap-4">
        <div
          v-for="item in visibleItems"
          :key="item.id"
          class="flex justify-start items-start gap-4 hover:bg-gray-600 transition-colors cursor-pointer rounded-lg p-2 w-full"
          :role="item.onClick ? 'button' : undefined"
          @click="handleItemClick(item)"
        >
          <div class="aspect-square w-28 h-28 bg-gray-700 rounded-lg p-2">
            <div class="w-full h-full bg-white">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
            </div>
          </div>
          <div class="text-white">
            <h6 class="text-lg font-bold text-wrap">
              {{ item.name }}
              <span v-if="item.count > 1">(x{{ item.count }})</span>
            </h6>
            <p class="text-sm text-wrap">{{ interpolateItemNames(item.description).text }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import BackpackIcon from '@/components/icons/BackpackIcon.vue';
import { interpolateItemNames, state } from '@/game/state';
import { computed } from 'vue';
const show = defineModel({ type: Boolean, default: false });

const visibleItems = computed(() => {
  return state.inventory
    .filter((item) => !item.hidden)
    .reduce((prev, curr) => {
      if (prev[curr.id]) {
        prev[curr.id].count += 1;
      } else {
        prev[curr.id] = { ...curr, count: 1 };
      }
      return prev;
    }, {});
});

const handleItemClick = (item) => {
  if (item.onClick) {
    item.onClick();
    show.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
