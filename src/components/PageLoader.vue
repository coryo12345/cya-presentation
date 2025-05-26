<template>
  <div class="absolute top-0 left-0 right-0 bottom-0" :style="`background: ${props.page.backgroundColor ?? 'gray'}`">
    <template v-if="props.page.loader === 'walking'">
      <div class="step-container flex justify-center items-center gap-1 h-full w-full">
        <svg
          v-for="i in 5"
          :key="i"
          class="step"
          width="60px"
          height="60px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="white"
              d="M4 18h5.5v1.25a2.75 2.75 0 1 1-5.5 0V18zM8 6.12c2 0 3 2.88 3 4.88 0 1-.5 2-1 3.5L9.5 16H4c0-1-.5-2.5-.5-5S5.498 6.12 8 6.12zm12.054 7.978l-.217 1.231a2.75 2.75 0 0 1-5.417-.955l.218-1.23 5.416.954zM18.178 1.705c2.464.434 4.018 3.124 3.584 5.586-.434 2.463-1.187 3.853-1.36 4.838l-5.417-.955-.232-1.564c-.232-1.564-.55-2.636-.377-3.62.347-1.97 1.832-4.632 3.802-4.285z"
            />
          </g>
        </svg>
      </div>
    </template>
  </div>
</template>

<script setup>
/** @type {{page: import('@/game/pages').Page}} */
const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.step-container {
  position: relative;
}

.step-container .step {
  opacity: 0;
  animation: appear 0.5s ease-in-out forwards;
}

.step-container .step:nth-child(1) {
  animation-delay: 0s;
  transform: translateY(10px) rotate(75deg);
}

.step-container .step:nth-child(2) {
  animation-delay: 1s;
  transform: translateY(2px) rotate(70deg);
}

.step-container .step:nth-child(3) {
  animation-delay: 2s;
  transform: translateY(3px) rotate(80deg);
}

.step-container .step:nth-child(4) {
  animation-delay: 3s;
  transform: translateY(-5px) rotate(70deg);
}

.step-container .step:nth-child(5) {
  animation-delay: 4s;
  transform: translateY(-2px) rotate(75deg);
}

@keyframes appear {
  from {
    opacity: 0;
    transform: inherit scale(0.8);
  }
  to {
    opacity: 1;
    transform: inherit scale(1);
  }
}
</style>
