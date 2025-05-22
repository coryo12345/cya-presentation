<template>
  <section class="p-3 bg-gray-900 rounded-xl text-white border border-gray-700">
    <h2 class="text-2xl font-bold mb-4">Checkpoint Settings</h2>
    <div class="flex flex-wrap gap-2">
      <ConfirmationDialog
        title="Restart Game"
        message="Are you sure you want to restart the game? All progress will be lost."
        confirm-text="Restart"
        class="grow basis-0"
        @confirm="state.restart()"
      >
        <template #activator="{ open }">
          <button
            class="cursor-pointer border border-gray-700 rounded-md px-2 py-1 w-full h-full min-w-3xs text-lg hover:bg-gray-800 transition-colors"
            @click="open"
          >
            Restart
          </button>
        </template>
      </ConfirmationDialog>

      <ConfirmationDialog
        title="Save Checkpoint"
        message="Are you sure you want to save a checkpoint at the current location? This will overwrite any existing checkpoint."
        confirm-text="Save"
        class="grow basis-0"
        @confirm="state.saveCheckpoint()"
      >
        <template #activator="{ open }">
          <button
            class="cursor-pointer border border-gray-700 rounded-md px-2 py-1 w-full h-full min-w-3xs text-lg hover:bg-gray-800 transition-colors"
            @click="open"
          >
            Save Checkpoint
          </button>
        </template>
      </ConfirmationDialog>

      <ConfirmationDialog
        title="Load Checkpoint"
        message="Are you sure you want to load the saved checkpoint? All current progress since the checkpoint will be lost."
        confirm-text="Load"
        class="grow basis-0"
        @confirm="state.loadCheckpoint()"
      >
        <template #activator="{ open }">
          <button
            class="border border-gray-700 rounded-md px-2 py-1 w-full h-full min-w-3xs text-lg transition-colors"
            :class="checkpointLastLocation ? 'cursor-pointer hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'"
            :disabled="!checkpointLastLocation"
            @click="checkpointLastLocation && open()"
          >
            <div class="text-lg">Load Checkpoint</div>
            <div class="text-sm italic text-gray-200">
              {{ checkpointLastLocation?.title ?? checkpointLastLocation?.id ?? '' }}
            </div>
          </button>
        </template>
      </ConfirmationDialog>
    </div>
  </section>
</template>

<script setup>
import { PAGES } from '@/game/pages';
import { state } from '@/game/state';
import { computed } from 'vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

const checkpointLastLocation = computed(() => {
  const info = state.getCheckpointInfo();
  if (!info) return;
  const locId = info.history[info.history.length - 1];
  return PAGES.find((page) => page.id === locId);
});
</script>
