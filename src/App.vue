<template>
  <main class="h-screen w-screen relative">
    <Page :page="currentPage" @go="state.goTo"></Page>
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
import { state } from '@/game/state';
import { computed } from 'vue';

const currentPage = computed(() => state.currentPage);
</script>
