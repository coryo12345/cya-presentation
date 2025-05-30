<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col items-center">
    <div
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style="background-image: url('/img/oakhaven/medieval-village.jpg'); filter: blur(3px); transform: scale(1.05)"
    ></div>

    <div class="relative z-10 px-8 py-12 bg-slate-900/90 w-full h-full overflow-auto">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-5xl font-bold text-amber-400">Endings Discovered</h1>
          <button
            @click="emit('back')"
            class="rounded-lg px-6 py-3 border border-black cursor-pointer bg-amber-900 text-white hover:bg-amber-800 transition-colors"
          >
            <div class="text-xl">Back to Menu</div>
          </button>
        </div>

        <div class="text-xl text-amber-200 mb-4">
          {{ discoveredCount }} of {{ endingsInfo.length }} endings discovered
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="ending in endingsInfo"
            :key="ending.id"
            class="rounded-lg border p-4 transition-all duration-300"
            :class="
              ending.achieved
                ? 'border-amber-500 bg-amber-900/40'
                : 'border-gray-700 bg-gray-900/40 grayscale opacity-70'
            "
          >
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 flex items-center justify-center rounded-full"
                :class="ending.achieved ? 'bg-amber-600' : 'bg-gray-700'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-10 h-10"
                  :class="ending.achieved ? 'text-amber-100' : 'text-gray-500'"
                >
                  <path
                    v-if="!ending.achieved"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16Z"
                    fill="#777"
                  />
                  <path
                    v-else
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.4453 2.75 16.5018 4.42242 17.0846 6.68694C17.1879 7.08808 17.5968 7.32957 17.9979 7.22633C18.3991 7.12308 18.6405 6.7142 18.5373 6.31306C17.788 3.4019 15.1463 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C4.13525 10.1379 3.40931 10.348 2.87868 10.8787C2 11.7574 2 13.1716 2 16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16C22 13.1716 22 11.7574 21.1213 10.8787C20.2426 10 18.8284 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM14 16C14 17.1046 13.1046 18 12 18C10.8954 18 10 17.1046 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16Z"
                    fill="#eee"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-semibold mb-1" :class="ending.achieved ? 'text-amber-200' : 'text-gray-400'">
                  {{ ending.achieved ? ending.title : 'Locked Ending' }}
                </h3>
                <p class="text-sm" :class="ending.achieved ? 'text-amber-100/80' : 'text-gray-500'">
                  {{ ending.achieved ? 'Discovered' : 'Keep exploring to unlock this ending' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { endings } from '@/game/endings';
import { computed } from 'vue';

const emit = defineEmits(['back']);

const endingsInfo = computed(() => endings.getEndingsInfo);
const discoveredCount = computed(() => endingsInfo.value.filter((ending) => ending.achieved).length);
</script>
