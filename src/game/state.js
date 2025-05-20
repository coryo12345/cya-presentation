import { PAGES } from './pages';
import { useStorage } from '@vueuse/core';
import { reactive } from 'vue';
import { ITEM_MAP } from './items';

// TODO: add note to noticeboard to go see mayor, help freeing town from curse
// TODO: add scene with mayor, trigger only if player has the pamphlet from the noticeboard from the mayor. Explain about some dark cultists that need to be stopped. They are performing rituals, people go missing
// here keep the story, going to the mill, clues to the chapel, & entering the chapel cellar. BUT lets make the hints not be that cultists are in the cellar, but some thieves/bandits/ruffians.
// The note in the mill should probably be a letter from one bandit, that they found a scroll, meet in the usual place <insert some obvious reference to the chapel cellar as hint>
// TODO: After getting past "bandits" (or whatever they are) in chapel cellar, find a scroll. But you can't understand it.
// TODO: Bring scroll to mayor -> you're going to need to find a scholar. "I thought one came to town recently". (better dialogue)
// TODO: Need to get into the inn. You bribe the guard/bouncer with a coin.
// TODO: Scholar is in the inn. He can translate the scroll.
// TODO: The scroll is "Shadowcult For Dummies". (intentionally a joke, the rules in the scroll are below:)
//    1. Don't share the location of our hideout: a hidden underground chamber off the forest path.
//          *You think that's near where you woke up!*
//    2. About the ritual & how to stop it
//    3. TODO: some more fun info here as filler. This is lore about the shadowcult, the dark god, etc.
// You can ask the scholar about the cultists, he'll tell you they seek to perform a ritual to summon a dark god.
//    If you ask how to stop them, he'll tell you that you could likely cause the ritual to fail by wearing a [shadowbane_charm_oakhaven] before the ritual.
//    He says he could help you make one, but you'll need to bring him a [glowing_crystal_shard_cave]. You can find one in the cave upstream of the river.
// TODO: will need to go to the cave to find a [glowing_crystal_shard_cave].
// TODO: flesh out the cave area. Maybe it's a maze?
// TODO: acquire a [glowing_crystal_shard_cave], and return to the scholar. He gives you a [shadowbane_charm_oakhaven].
// TODO: Go to the forest path, find new area for secret chamber.
// TODO: you find a door, it's locked.
// TODO: you pick the lock, and walk in. These cultists have fine robes turn towards you, whispering... "Is that really him?"
// TODO: one steps forwards, "Sir, you've finally returned. We've been waiting for you. The ritual is ready to perform". He leads you up to the altar. (The twist is that you are secretly the dark leader, but have forgotten)
// TODO: You are standing at the altar. You have the choice: "Embrace the darkness" or "Destroy the altar" or if you have the [shadowbane_charm_oakhaven], "Ruin the ritual"
// TODO: If you choose to destroy the altar, the cultists attack, bad ending.
// TODO: If you choose to embrace the darkness, ENDING: the cultists bow down to you, "Welcome back, our lord. We will serve you faithfully."
// TODO: if you choose to ruin the ritual, the ritual backfires, and destroys the cultists. You wake up in oakhaven, big celebration, good ending.

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
    return false;
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
