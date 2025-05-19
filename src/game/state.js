import { PAGES } from './pages';
import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';
import { ITEM_MAP } from './items';

// TODO - history needs to be more detailed. What bonus action was taken?
// that way we can add a back button. And refreshing will maintain state

// TODO - when showing page descriptions, interpolate item names

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
    let page = PAGES.find((page) => page.id === storedState.value.history[storedState.value.history.length - 1]);
    while (!page) {
      storedState.value.history.pop();
      page = PAGES.find((page) => page.id === storedState.value.history[storedState.value.history.length - 1]);
    }
    return page;
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
   * @param {string | object} item
   * @param {number} count
   */
  addItem(item, count = 1) {
    for (let i = 0; i < count; i++) {
      if (typeof item === 'object') {
        storedState.value.inventory.push(item.id);
      } else {
        storedState.value.inventory.push(item);
      }
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
  dialog: {
    show: false,
    title: '',
    description: '',
  },
  /**
   * @param {string} title
   * @param {string} description
   */
  openDialog(title, description) {
    this.dialog.show = true;
    this.dialog.title = title;
    this.dialog.description = description;
  },
});
