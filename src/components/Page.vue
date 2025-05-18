<template>
  <div class="relative h-full">
    <div
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat"
      :style="pageStyle"
    ></div>
    <div class="relative text-white p-8 flex flex-col justify-between gap-4 h-full">
      <div class="flex justify-between gap-4 ml-4 mx-8">
        <div>
          <h2 class="text-4xl">{{ page.title }}</h2>
          <p>{{ page.description }}</p>
        </div>
        <div v-if="sideImg" class="w-1/3">
          <img :src="sideImg" class="max-h-[200px] rounded-lg ml-auto" />
        </div>
      </div>
      <div v-if="props.page.actions?.length && canTakeAction" class="flex flex-wrap justify-center gap-4">
        <button
          v-for="action in page.actions"
          :key="action.text"
          class="rounded-lg px-4 py-2 border border-black cursor-pointer"
          :class="action.backgroundColor ? `bg-${action.backgroundColor}` : 'bg-slate-600'"
          @click="takeAction(action)"
        >
          <div class="text-2xl">{{ action.text }}</div>
          <div v-if="action.description" class="text-sm whitespace-pre-line">{{ action.description }}</div>
        </button>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <button
          v-for="link in page.links"
          :key="link.pageId"
          class="rounded-lg px-4 py-2 border border-black cursor-pointer"
          :class="link.backgroundColor ? `bg-${link.backgroundColor}` : 'bg-amber-900'"
          @click="emit('go', link.pageId)"
        >
          <div class="text-2xl">{{ link.text }}</div>
          <div v-if="link.description" class="text-sm whitespace-pre-line">{{ link.description }}</div>
        </button>
      </div>
      <!-- empty spacer -->
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

/** @type {{
 * page:import('@/game/pages').Page
 * }} */
const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['go']);

const pageStyle = computed(() => {
  if (props.page.image && !props.page.backgroundColor) {
    return `background-image: url(${props.page.image}); filter: blur(${props.page.blur ?? 0}px);`;
  }
  return `background-color: ${props.page.backgroundColor ?? 'slategray'}`;
});

const sideImg = computed(() => {
  if (props.page.image && props.page.backgroundColor) {
    return props.page.image;
  }
});

const canTakeAction = ref(true);
/** @param {import('@/game/pages').PageAction} action */
const takeAction = (action) => {
  if (!canTakeAction.value) return;
  canTakeAction.value = false;
  action.action();
};
watch(
  () => props.page,
  () => (canTakeAction.value = true),
);
</script>
