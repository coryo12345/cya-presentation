import oakhaven from './oakhaven.js';
import whispering_woods from './whispering_woods.js';

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} [image]
 * @property {boolean} [hidden] for items that are not visible to the player, but used in conditions
 * @property {function} [onClick] for items that can be interacted with
 */

/** @type {Item[]} */
export const ITEMS = [
  {
    id: 'copper_coin',
    name: 'Copper Coin',
    description: 'A single, worn copper coin. It feels heavier than it looks.',
    image:
      'https://static.vecteezy.com/system/resources/previews/000/404/975/non_2x/vector-illustration-of-a-copper-coin.jpg',
  },
  {
    id: 'lockpick',
    name: 'A Lockpick',
    description: 'A small, concealable & slender metal tool for manipulating tumblers. (Single use)',
    image:
      'https://thumbs.dreamstime.com/b/lockpick-icon-editable-bold-outline-color-fill-design-vector-illustration-lockpick-icon-247870269.jpg',
  },
  ...oakhaven,
  ...whispering_woods,
];

/** @type {Record<string, Item>} */
export const ITEM_MAP = ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
