import { PAGES } from './pages';
import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';
import { ITEM_MAP } from './items';

// TODO: add a checkpoint system. At any ending, the player can start again from the last checkpoint.

// TODO: add note to noticeboard to go see mayor, help freeing town from curse
// TODO: add scene with mayor. Explain about some dark cultists that need to be stopped. They are performing rituals, people go missing
// TODO: After getting past "cultists" (maybe not cultists?) (they have ragged/dirty robes) in chapel, find a scroll. But you can't understand it.
// TODO: Bring scroll to mayor -> you're going to need to find a scholar. I thought one came to town recently.
// TODO: Need to get into the inn. You bribe the guard with a coin.
// TODO: Scholar is in the inn. He can translate the scroll.
// TODO: The scroll is "Shadowcult For Dummies".
//    1. Don't share the location of our hideout: a hidden cave off the forest path.
//          You think that's near where you woke up!
//    2. About the ritual & how to stop it
//    3. TODO: some more info
// You can ask the scholar about the cultists, he'll tell you they seek to perform a ritual to summon a dark god.
//    If you ask how to stop them, he'll tell you that ... TODO something here to include in the final scene as third option
// TODO: Go to the forest path, find new area.
// TODO: You enter the cave. It's a maze.
// TODO: you find a door, it's locked.
// TODO: you pick the lock, and walk in. These cultists have fine robes turn towards you, whispering... "Is that really him?"
// TODO: one steps forwards, "Sir, you've finally returned. We've been waiting for you. The ritual is ready to perform". He leads you up to the altar.
// TODO: You are standing at the altar. You have the choice: "Embrace the darkness" or "Destroy the altar" or ""
// TODO: If you choose to destroy the altar, the cultists attack.

// TODO: If you choose to embrace the darkness, ENDING: the cultists bow down to you, "Welcome back, our lord. We will serve you faithfully."

const storedState = useStorage('cyoa-app', {
  /** @type {string[]} */
  history: ['tutorial'],
  /** @type {Record<string, string[]>} */
  actionsTaken: {},
  /** @type {string[]} */
  inventory: [],
});

const checkpoint = useStorage('cyoa-app-checkpoint', '');

export const state = reactive({
  restart() {
    storedState.value.history = ['tutorial'];
    storedState.value.inventory = [];
    storedState.value.actionsTaken = {};
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
   * Attempts to take a link.
   * @param {import('@/game/pages').PageLink} link
   */
  takeLink(link) {
    if (typeof link.onLink === 'function' && link.onLink() === false) {
      return;
    }
    this.goTo(link.link_to);
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
    this.dialog.title = interpolateItemNames(title, true).text;
    this.dialog.description = interpolateItemNames(description, true).text;
  },
  /**
   * @param {import('@/game/pages').Page} page
   * @param {import('@/game/pages').PageAction} action
   */
  takeAction(page, action) {
    if (typeof action.condition === 'function' && !action.condition()) {
      return;
    }
    let lockAction = true;
    if (typeof action.action === 'function') {
      if (action.action() === false) {
        lockAction = false;
      }
    } else if (action.effect) {
      const { text, items } = interpolateItemNames(action.effect, true);
      if (items.length) {
        items.forEach((item) => this.addItem(item.id));
      }
      this.openDialog(interpolateItemNames(action.name, true).text, text);
    }
    if (!storedState.value.actionsTaken[page.id]) {
      storedState.value.actionsTaken[page.id] = [];
    }
    if (lockAction) {
      storedState.value.actionsTaken[page.id].push(action.name);
    }
  },
  get getAvailableActions() {
    return (
      this.currentPage.actions?.filter(
        (action) =>
          !storedState.value.actionsTaken[this.currentPage.id]?.includes(action.name) &&
          (typeof action.condition === 'function' ? action.condition() : true),
      ) ?? []
    );
  },
  saveCheckpoint() {
    checkpoint.value = JSON.stringify(storedState.value);
  },
  /**
   * @returns {boolean}
   */
  loadCheckpoint() {
    if (!checkpoint.value || !checkpoint.value.length) {
      return false;
    }
    try {
      storedState.value = JSON.parse(checkpoint.value);
    } catch (e) {
      console.error('Error loading checkpoint', e);
      return false;
    }
    return true;
  },
});

/**
 * @param {string} text
 * @returns {{text: string, items: (import('@/game/items').Item)[]}}
 */
export function interpolateItemNames(str, useHtml = false) {
  const items = [];
  const text = str.replaceAll(/\[(.*)\]/g, (match, name) => {
    if (!match) return '';
    const item = ITEM_MAP[name];
    if (!item) return match;
    items.push(item);
    return useHtml ? `<span class="underline italic text-gray-200">${item.name}</span>` : item.name;
  });

  return { text, items };
}
