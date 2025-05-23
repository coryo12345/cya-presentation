import { state } from './state';

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
  {
    id: 'waterlogged_plea',
    name: 'Waterlogged Plea',
    description: "A soggy, barely legible note: 'Help Oakhaven... shadow consumes... beware the...'.",
    image: 'https://thumbs.dreamstime.com/b/paper-scroll-icon-vector-isolated-white-background-170758883.jpg',
  },
  {
    id: 'bandit_journal_oakhaven',
    name: "Bandit's Journal",
    description: 'A tattered journal belonging to one of the bandits. It mentions a meeting in the chapel cellar.',
    image:
      'https://static.vecteezy.com/system/resources/previews/014/934/276/large_2x/journal-icon-outline-letter-text-vector.jpg',
  },
  {
    id: 'lost_locket_pamphlet',
    name: 'Lost Locket Pamphlet',
    description: "A pamphlet detailing the lost locket that belongs to Martha, the baker's wife",
    image:
      'https://static.vecteezy.com/system/resources/previews/010/750/499/original/brochure-icon-design-free-vector.jpg',
  },
  {
    id: 'mayor_request_pamphlet',
    name: 'Mayoral Request',
    description: 'The mayor is looking for help to free the town from a curse. He will reward you handsomely.',
    image:
      'https://static.vecteezy.com/system/resources/previews/010/750/499/original/brochure-icon-design-free-vector.jpg',
  },
  {
    id: 'strange_symbol_medallion',
    name: 'Strange Symbol Medallion',
    description: 'A small, tarnished silver medallion bearing an unsettling, unfamiliar symbol.',
    image:
      'https://static.vecteezy.com/system/resources/previews/012/686/935/non_2x/medallion-icon-design-free-vector.jpg',
  },
  // TODO: this does nothing now, can we find a purpose?
  {
    id: 'silver_dagger_inscribed',
    name: 'Inscribed Silver Dagger',
    description:
      'A well-crafted silver dagger with faint runes etched along its blade. It feels potent against unseen forces.',
    image:
      'https://thumbs.dreamstime.com/b/dagger-icon-vector-isolated-white-background-your-web-mobile-app-design-dagger-logo-concept-dagger-icon-vector-sign-134071239.jpg',
  },
  {
    id: 'shadowbane_charm_oakhaven',
    name: 'Shadowbane Charm',
    description: 'A charm made of woven herbs and a piece of blessed metal, said to ward off dark influences.',
    image: 'https://www.pngitem.com/pimgs/m/333-3339558_necklace-svg-man-png-jewelry-icon-png-transparent.png',
  },
  {
    id: 'glowing_crystal_shard_cave',
    name: 'Glowing Crystal Shard',
    description: 'A vibrant, fist-sized crystal that pulses with a rhythmic blue light. It emits a faint hum.',
    image: 'https://cdn2.iconfinder.com/data/icons/crystals-glyph/64/146_crystal-mineral-stone-gem-1024.png',
  },
  {
    id: 'shadowcult_scroll',
    name: 'Shadowcult Scroll',
    description: 'An ancient scroll written in an unfamiliar language. The paper feels unnaturally cold.',
    image: 'https://thumbs.dreamstime.com/b/paper-scroll-icon-vector-isolated-white-background-170758883.jpg',
  },
  {
    id: 'shadowcult_scroll_translated',
    name: 'Shadowcult Scroll (Translated)',
    description: '(Click to read)',
    image: 'https://thumbs.dreamstime.com/b/paper-scroll-icon-vector-isolated-white-background-170758883.jpg',
    onClick: () => {
      state.openDialog(
        'Shadowcult Scroll (Translated)',
        `It reads:
Shadowcult Rules For Dummies

1. Don't share the location of our hideout: a hidden underground chamber off the forest path.
*You think that's near where you woke up!*

2. Our sacred ritual is to be performed only by our glorious leader. 

3. Villagers are required as sacrifices. It is your duty to prepare them.

4. The dark god A'kul is our lord. He will grant us power beyond our wildest dreams. It is imperative that we show honor to our lord.

5. We WILL summon the dark god, and by his side we will rule the world.`,
      );
    },
  },
  {
    id: 'shadowbane_charm_oakhaven_recipe',
    name: 'Shadowbane Charm Recipe',
    image: 'https://thumbs.dreamstime.com/b/paper-scroll-icon-vector-isolated-white-background-170758883.jpg',
    description:
      'A recipe for a shadowbane charm. The scholar said he requires a [glowing_crystal_shard_cave] to make one.\n\nHe said I could probably find one near the cave upstream of Oakhaven.',
  },
  {
    id: 'hidden_cultist_chamber_discovered',
    name: 'Hidden Cultist Chamber Discovered',
    description: 'Player has discovered the hidden cultist chamber.',
    hidden: true,
  },
  {
    id: 'hidden_cultist_chamber_stepped_forward',
    name: 'Stepped Forward',
    description: 'Player has stepped forward in the hidden cultist chamber.',
    hidden: true,
  },
  {
    id: 'hidden_oakhaven_inn_bribed',
    name: 'Oakhaven Inn Bribed',
    description: 'Player has bribed the Oakhaven Inn guard.',
    hidden: true,
  },
];

/** @type {Record<string, Item>} */
export const ITEM_MAP = ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
