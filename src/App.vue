<template>
  <DebugApp v-if="showDebug"></DebugApp>
  <PresentationScreen v-else-if="isPresentation"></PresentationScreen>
  <main v-else class="h-screen w-screen relative">
    <MainMenu v-if="isMainMenu" @start-game="showMainMenu = false"></MainMenu>
    <PageLoader v-else-if="showLoader" :page="currentPage"></PageLoader>
    <Page v-else :page="currentPage"></Page>
    <template v-if="!isMainMenu">
      <RestartDialog class="absolute top-2 left-2"></RestartDialog>
      <InventorySidebar class="absolute top-2 right-2"></InventorySidebar>
      <EffectDialog></EffectDialog>
    </template>
  </main>
</template>

<script setup>
import EffectDialog from '@/components/EffectDialog.vue';
import InventorySidebar from '@/components/InventorySidebar.vue';
import MainMenu from '@/components/MainMenu.vue';
import Page from '@/components/Page.vue';
import PageLoader from '@/components/PageLoader.vue';
import RestartDialog from '@/components/RestartDialog.vue';
import DebugApp from '@/debug/DebugApp.vue';
import { state } from '@/game/state';
import PresentationScreen from '@/presentation/PresentationScreen.vue';
import { computed, ref, watch } from 'vue';

// only need to run this on creation
const showDebug = window.location.pathname.toLocaleLowerCase() === '/debug';
const isPresentation = window.location.pathname.toLocaleLowerCase() === '/presentation';

const currentPage = computed(() => state.currentPage);
const isMainMenu = computed(() => currentPage.value.id === 'main_menu');

const showLoader = ref(false);
watch(currentPage, () => {
  if (currentPage.value.loader) {
    showLoader.value = true;
    setTimeout(() => {
      showLoader.value = false;
    }, 5000);
  }
});
</script>
