import { ITEM_MAP } from '@/game/items';
import { state } from '@/game/state';

/**
 * @typedef {Object} PageLink
 * @property {string} text
 * @property {string} [description]
 * @property {string} [image]
 * @property {string} [opacity]
 * @property {string} [backgroundColor]
 * @property {string} pageId
 */

/**
 * @typedef {Object} PageAction
 * @property {string} text
 * @property {string} [description]
 * @property {string} [image]
 * @property {string} [opacity]
 * @property {string} [backgroundColor]
 * @property {Function} action
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [image]
 * @property {number} [blur]
 * @property {string} [backgroundColor]
 * @property {PageLink[]} [links]
 * @property {PageAction[]} [actions]
 */

/** @type {Page[]} */
export const PAGES = [
  {
    id: 'tutorial',
    title: 'Tutorial',
    description: 'This is the tutorial page. Here would be a description of where you are / what is happening',
    backgroundColor: 'slategray',
    image:
      'https://shopgreatpretenders.com/cdn/shop/files/Untitleddesign-2023-08-23T101829.266_ee7c6476-c595-492f-be70-3357b1a31e3e.png?v=1692800320&width=1600',
    actions: [
      {
        text: 'A bonus action you can take',
        description: "you don't leave this screen by taking a bonus action",
        action: () => {
          alert('This is just an example. But something probably would have happened here!');
        },
      },
      {
        text: 'OR you can do this.',
        description: 'but you can only do one!',
        action: () => {
          alert('This is just an example. But something probably would have happened here!');
        },
      },
    ],
    links: [
      {
        text: 'Start the game!',
        description: 'This is your main choice.\nMaking a choice will move you to a new screen.',
        pageId: 'home',
      },
      {
        text: 'You could have multiple options here',
        description: 'This also starts the game.',
        pageId: 'home',
      },
    ],
  },
  {
    id: 'home',
    title: 'A grassy field',
    description: 'A large field of grass. Not much around, but you see an old sword in the ground at your feet.',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finkforall.com%2Fwp-content%2Fuploads%2F2022%2F12%2Fbenjamin-davies-Zm2n2O7Fph4-unsplash.jpg&f=1&nofb=1&ipt=886e9f49e53d1555e6c0338307b50dbf84313ff9f52ee72bf9dc06badfd02793',
    blur: 10,
    actions: [
      {
        text: 'Take the sword',
        action: () => {
          state.addItem(ITEM_MAP.sword);
        },
      },
    ],
    links: [
      {
        text: 'Link 1',
        description: 'Link 1 description',
        pageId: 'page1',
      },
      {
        text: 'Link 2',
        description: 'Link 2 description',
        pageId: 'page2',
      },
    ],
  },
  {
    id: 'page1',
    title: 'Page 1',
    description: 'Page 1 description',
  },
  {
    id: 'page2',
    title: 'Page 2',
    description: 'Page 2 description',
  },
];
