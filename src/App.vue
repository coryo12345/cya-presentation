<template>
  <DebugApp v-if="showDebug"></DebugApp>
  <main v-else class="h-screen w-screen relative">
    <Page :page="currentPage"></Page>
    <RestartDialog class="absolute top-2 left-2"></RestartDialog>
    <InventorySidebar class="absolute top-2 right-2"></InventorySidebar>
    <EffectDialog></EffectDialog>
  </main>
</template>

<script setup>
import EffectDialog from '@/components/EffectDialog.vue';
import InventorySidebar from '@/components/InventorySidebar.vue';
import Page from '@/components/Page.vue';
import RestartDialog from '@/components/RestartDialog.vue';
import DebugApp from '@/debug/DebugApp.vue';
import { state } from '@/game/state';
import { computed } from 'vue';

// only need to run this on creation
const showDebug = window.location.pathname.toLocaleLowerCase() === '/debug';

const currentPage = computed(() => state.currentPage);
</script>
