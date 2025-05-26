import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';
import { PAGES } from './pages/index';
import { state } from './state';

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
  getTotalEndingCount() {
    return PAGES?.filter((p) => !!p.isEnding).length || 0;
  },
});

/**
 * Generate link items for an ending page
 * @param {string} name
 * @returns {import('@/game/pages').PageLink[]}
 */
export function getEndingLinks(name) {
  return [
    {
      name: 'Restart from checkpoint',
      description: 'Go back',
      onLink: () => state.loadCheckpoint(),
      link_to: 'forest_path_start',
    },
    {
      name: `Game Over - ${name}`,
      description: 'Try again?',
      onLink: () => state.restart(),
      link_to: 'tutorial',
    },
  ];
}
