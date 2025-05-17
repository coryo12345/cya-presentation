<template>
  <main class="h-screen w-screen relative">
    <Page :page="currentPage" @go="state.goTo"></Page>
    <RestartDialog class="absolute top-2 left-2"></RestartDialog>
  </main>
</template>

<script setup>
import Page from '@/components/Page.vue';
import RestartDialog from '@/components/RestartDialog.vue';
import { state } from '@/state';
import { computed } from 'vue';

const currentPage = computed(() => state.currentPage);
</script>
