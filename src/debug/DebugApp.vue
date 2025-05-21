<template>
  <div class="h-full w-full min-h-screen min-w-screen relative bg-gray-950 text-white">
    <main class="max-w-5xl mx-auto py-8 px-4">
      <h1 class="text-2xl font-bold mb-4">CYOA Debug Menu</h1>
      <div class="flex flex-col gap-4">
        <CheckpointSettings></CheckpointSettings>
        <NavigationHelper></NavigationHelper>
        <ActionUnlocker></ActionUnlocker>
        <ManageInventory></ManageInventory>
      </div>
    </main>
  </div>
</template>

<script setup>
import ActionUnlocker from '@/debug/components/ActionUnlocker.vue';
import CheckpointSettings from '@/debug/components/CheckpointSettings.vue';
import ManageInventory from '@/debug/components/ManageInventory.vue';
import NavigationHelper from '@/debug/components/NavigationHelper.vue';
import { onMounted } from 'vue';

onMounted(() => {
  window.document.title = 'CYOA Debug';
});
</script>
