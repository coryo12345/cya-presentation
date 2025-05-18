import { PAGES } from '@/game/pages';
import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';

const storedState = useStorage('cyoa-app', {
  /** @type {string[]} */
  history: ['tutorial'],
  /** @type {string[]} */
  inventory: [],
});

export const state = reactive({
  restart() {
    storedState.value.history = ['tutorial'];
    storedState.value.inventory = [];
  },
  /**
   * @returns {import('@/game/pages').Page}
   */
  get currentPage() {
    return PAGES.find((page) => page.id === storedState.value.history[storedState.value.history.length - 1]);
  },
  /**
   * @param {string} pageId
   */
  goTo(pageId) {
    storedState.value.history.push(pageId);
  },
  /**
   * @returns {import('@/game/items').Item[]}
   */
  get inventory() {
    return storedState.value.inventory.map((id) => ITEM_MAP[id]);
  },
  /**
   * @param {string} itemId
   * @param {number} count
   */
  addItem(itemId, count = 1) {
    for (let i = 0; i < count; i++) {
      storedState.value.inventory.push(itemId);
    }
  },
  /**
   * @param {string} itemId
   * @param {number} count
   */
  removeItem(itemId, count = 1) {
    while (count > 0 && storedState.value.inventory.includes(itemId)) {
      let idx = storedState.value.inventory.findIndex((id) => id === itemId);
      storedState.value.inventory.splice(idx, 1);
      count--;
    }
  },
});
