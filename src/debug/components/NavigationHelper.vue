<template>
  <section class="p-3 bg-gray-900 rounded-xl text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-4">Navigation Helper</h2>
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap gap-1 -mb-2">
        <p class="self-center">You are currently at:</p>
        <p class="text-lg self-end">{{ currentPage.title ?? 'unnamed' }}</p>
        <p class="text-sm italic text-gray-200 self-center font-mono">({{ currentPage.id }})</p>
      </div>
      <Autocomplete :items="PAGES" placeholder="Search pages to teleport..." @select="navigateTo" />
    </div>
  </section>
</template>

<script setup>
import { PAGES } from '@/game/pages';
import { state } from '@/game/state';
import { computed } from 'vue';
import Autocomplete from '@/components/Autocomplete.vue';

const currentPage = computed(() => state.currentPage);

const navigateTo = (page) => {
  state.goTo(page.id);
};
</script>
