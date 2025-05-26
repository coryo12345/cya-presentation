<template>
  <section
    class="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  >
    <!-- Animated background particles -->
    <div class="absolute inset-0">
      <div
        v-for="i in 50"
        :key="i"
        class="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <!-- Floating geometric shapes -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute top-20 left-20 w-32 h-32 border-2 border-cyan-400 rotate-45 animate-spin-slow opacity-30"
      ></div>
      <div
        class="absolute top-40 right-32 w-24 h-24 border-2 border-pink-400 rounded-full animate-bounce opacity-40"
      ></div>
      <div
        class="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rotate-12 animate-pulse opacity-25"
      ></div>
      <div
        class="absolute bottom-20 right-20 w-28 h-28 border-2 border-green-400 rotate-45 animate-spin-reverse opacity-35"
      ></div>
    </div>

    <!-- Main content container -->
    <div class="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
      <!-- Person's name with spectacular entrance -->
      <div class="mb-12 transform animate-slide-down">
        <div class="relative">
          <h1
            class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x drop-shadow-2xl"
          >
            {{ promptBuilder.person || 'Mystery Person' }}
          </h1>
          <!-- Glowing effect behind text -->
          <div class="absolute inset-0 text-8xl font-black text-cyan-400 blur-lg opacity-50 animate-pulse">
            {{ promptBuilder.person || 'Mystery Person' }}
          </div>
        </div>
        <div class="mt-4 text-2xl text-gray-300 font-light tracking-widest animate-fade-in-delayed">IS PRESENTING</div>
      </div>

      <!-- Prompt title with amazing effects -->
      <div class="mb-8 transform animate-scale-in">
        <div
          class="relative bg-gradient-to-r from-purple-800/80 to-blue-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          <!-- Animated border glow -->
          <div
            class="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-75 blur-sm animate-pulse"
          ></div>
          <div class="relative z-10">
            <h2 class="text-5xl font-bold text-white mb-2 animate-text-shimmer">
              {{ promptBuilder.title || 'Amazing Presentation' }}
            </h2>
          </div>
        </div>
      </div>

      <!-- Prompt description with elegant styling -->
      <div class="max-w-4xl transform animate-fade-in-up">
        <div class="relative bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent"></div>
          <p class="relative text-xl text-gray-200 leading-relaxed font-light whitespace-pre-line">
            {{ promptBuilder.description || 'Get ready for an incredible presentation that will blow your mind!' }}
          </p>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="absolute top-1/2 left-8 transform -translate-y-1/2">
        <div class="w-1 h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      </div>
      <div class="absolute top-1/2 right-8 transform -translate-y-1/2">
        <div class="w-1 h-32 bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-pulse"></div>
      </div>

      <!-- Bottom accent -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div class="flex space-x-2">
          <div
            v-for="i in 5"
            :key="i"
            class="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-bounce"
            :style="{ animationDelay: `${i * 0.1}s` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Overlay effects -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none"></div>
  </section>
</template>

<script setup>
import { promptBuilder } from '@/presentation/promptBuilder';
import { ref, onMounted } from 'vue';

// Generate random positions for particles
const getParticleStyle = (index) => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const animationDelay = Math.random() * 3;
  const animationDuration = 2 + Math.random() * 3;

  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`,
  };
};
</script>

<style scoped>
@keyframes gradient-x {
  0%,
  100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delayed {
  0%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes text-shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animate-slide-down {
  animation: slide-down 1s ease-out;
}

.animate-scale-in {
  animation: scale-in 1s ease-out 0.5s both;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out 1s both;
}

.animate-fade-in-delayed {
  animation: fade-in-delayed 2s ease-out;
}

.animate-text-shimmer {
  background: linear-gradient(90deg, #ffffff, #60a5fa, #a855f7, #ec4899, #ffffff);
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  animation: text-shimmer 3s linear infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 6s linear infinite;
}
</style>
