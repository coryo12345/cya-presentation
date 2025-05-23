<template>
  <div class="relative h-full">
    <div
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat"
      :style="pageStyle"
    ></div>
    <div class="relative p-8 flex flex-col justify-between gap-4 h-full text-white">
      <div class="flex justify-between gap-4 ml-4 mx-8">
        <div
          class="flex-2/3 self-start"
          :class="props.page.textBackground && 'bg-slate-500/90 rounded-lg px-4 py-2 border border-black'"
        >
          <h2 class="text-4xl">{{ page.title }}</h2>
          <p v-html="pageDescription" class="whitespace-pre-line"></p>
        </div>
        <div v-if="sideImg" class="flex-1/3">
          <img :src="sideImg" class="max-h-[200px] rounded-lg mx-auto" />
        </div>
      </div>
      <div v-if="props.page.actions?.length" class="flex flex-wrap justify-center gap-4">
        <button
          v-for="action in availableActions"
          :key="action.name"
          class="rounded-lg px-4 py-2 border border-black cursor-pointer w-[300px]"
          :class="action.backgroundColor ? `bg-${action.backgroundColor}` : 'bg-slate-600'"
          @click="state.takeAction(props.page, action)"
        >
          <div class="text-2xl">{{ interpolateItemNames(action.name).text }}</div>
          <div v-if="action.description" class="text-sm whitespace-pre-line">
            {{ interpolateItemNames(action.description).text }}
          </div>
        </button>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <button
          v-for="link in availableLinks"
          :key="link.name"
          class="rounded-lg px-4 py-2 border border-black cursor-pointer w-[300px]"
          :class="link.backgroundColor ? `bg-${link.backgroundColor}` : 'bg-amber-900'"
          @click="state.takeLink(link)"
        >
          <div class="text-2xl">{{ interpolateItemNames(link.name).text }}</div>
          <div v-if="link.description" class="text-sm whitespace-pre-line">
            {{ interpolateItemNames(link.description).text }}
          </div>
        </button>
      </div>
      <!-- empty spacer -->
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { ITEM_MAP } from '@/game/items';
import { interpolateItemNames, state } from '@/game/state';
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

const pageStyle = computed(() => {
  if (props.page.image && !props.page.backgroundColor) {
    return `background-image: url(${props.page.image}); filter: blur(${props.page.blur ?? 0}px); transform: scale(1.05); background-size: cover; background-position: center; background-repeat: no-repeat;`;
  }
  return `background-color: ${props.page.backgroundColor ?? 'slategray'}`;
});

const sideImg = computed(() => {
  if (props.page.image && props.page.backgroundColor) {
    return props.page.image;
  }
});

const pageDescription = computed(() => interpolateItemNames(props.page.description, true).text);
const availableActions = computed(() => state.getAvailableActions);
const availableLinks = computed(
  () => props.page.links?.filter((link) => (typeof link.condition === 'function' ? link.condition() : true)) ?? [],
);
</script>
