import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';
import { PAGES } from './pages';

const endingsStorage = useStorage('cyoa-app-endings', []);

/**
 * @typedef {Object} Ending
 * @property {string} id
 * @property {string} title
 * @property {boolean} achieved
 */

export const endings = reactive({
  /** @type {Ending[]} */
  get getEndingsInfo() {
    return PAGES.filter((p) => !!p.isEnding).map((page) => {
      return {
        id: page.id,
        title: page.title.replace('Ending:', '').trim() || '',
        achieved: endingsStorage.value.includes(page.id),
      };
    });
  },
  addAchievedEnding(ending) {
    if (
      typeof ending === 'string' &&
      PAGES.some((page) => page.id === ending) &&
      !endingsStorage.value.includes(ending)
    ) {
      endingsStorage.value.push(ending);
    }
  },
});
