<template>
  <section class="h-full w-full bg-gray-500">
    <iframe
      src="https://pickerwheel.com/emb/?choices=Tim,Jarett,Alex,Louden,Dominique&title=Who's%20giving%20the%20presentation?&confetti=true"
      width="100%"
      height="100%"
      scrolling="no"
      frameborder="0"
      class="spinner"
    ></iframe>
    <div class="h-[100px] w-full flex justify-center items-center gap-4">
      <input v-model="who" type="text" class="bg-white rounded py-1 px-2 border border-gray-600" placeholder="Name" />
      <button
        class="bg-red-700 hover:bg-red-800 text-white rounded-lg border border-gray-600 text-xl px-4 py-2 cursor-pointer"
        @click="done()"
      >
        Done
      </button>
    </div>
  </section>
</template>

<script setup>
import { promptBuilder } from '@/presentation/promptBuilder';
import { ref } from 'vue';

const emit = defineEmits(['done']);

const who = ref('');

function done() {
  promptBuilder.person = who.value;
  emit('done');
}
</script>

<style scoped>
.spinner {
  width: 100%;
  height: calc(100% - 100px);
}
</style>
