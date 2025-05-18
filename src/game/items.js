/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 */

/** @type {Item[]} */
export const ITEMS = [
  {
    id: 'sword',
    name: 'Sword',
    description: 'A sharp blade with a hilt.',
    image: 'https://i.mmo.cm/is/image/mmoimg/an-product-max-mobile/sword-anglo-saxon-87cm-larp-weapon--600152-1.jpg',
  },
];

export const ITEM_MAP = ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
