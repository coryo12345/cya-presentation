import { PAGES } from '@/pages';
import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';

const storedState = useStorage('cyoa-app', {
  history: ['tutorial'],
});

export const state = reactive({
  restart() {
    storedState.value.history = ['tutorial'];
  },
  get currentPage() {
    return PAGES.find((page) => page.id === storedState.value.history[storedState.value.history.length - 1]);
  },
  goTo(pageId) {
    storedState.value.history.push(pageId);
  },
});
