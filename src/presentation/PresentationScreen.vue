<template>
  <main class="bg-black h-screen w-screen relative">
    <FinalImage v-if="showFinalImage" />
    <PersonWheel v-else-if="showSpinner" @done="showFinalImage = true" />
    <PresentationPage
      v-else-if="presentationPromptPick"
      :page="currentPage"
      @link="handleLink"
      @action="handleAction"
    />
    <section v-else class="h-full w-full">
      <img src="/img/original_prompt.png" alt="original prompt" class="w-full" />
      <button
        class="absolute bottom-4 left-1/2 -translate-1/2 bg-red-700 hover:bg-red-800 text-white rounded-2xl text-4xl px-4 py-2 cursor-pointer"
        @click="presentationPromptPick = true"
      >
        Next
      </button>
    </section>
  </main>
</template>

<script setup>
import FinalImage from '@/presentation/FinalImage.vue';
import { PRESENTATION_PAGES } from '@/presentation/pages';
import PersonWheel from '@/presentation/PersonWheel.vue';
import PresentationPage from '@/presentation/PresentationPage.vue';
import { ref } from 'vue';

const showFinalImage = ref(false);
const showSpinner = ref(false);
const presentationPromptPick = ref(false);
const currentPage = ref(PRESENTATION_PAGES[0]);

function handleLink(link) {
  currentPage.value = PRESENTATION_PAGES.find((page) => page.id === link.link_to);
}

function handleAction(action) {
  if (typeof action.action === 'function') {
    action.action();
  }
  // assume that an action means a prompt has been selected
  showSpinner.value = true;
}
</script>
