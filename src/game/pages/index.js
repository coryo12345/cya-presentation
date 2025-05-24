import oakhaven from './oakhaven';
import { ITEM_MAP } from '../items';
import { state } from '../state';
import whispering_woods from './whispering_woods';

/**
 * @typedef {Object} PageLink
 * @property {string} name
 * @property {string} [description]
 * @property {string} [image]
 * @property {string} [opacity]
 * @property {string} [backgroundColor]
 * @property {string} link_to
 * @property {() => boolean} [condition]
 * @property {() => boolean} [onLink] returns false if the regular link should not be taken
 */

/**
 * @typedef {Object} PageAction
 * @property {string} name
 * @property {string} [description]
 * @property {string} [image]
 * @property {string} [opacity]
 * @property {string} [backgroundColor]
 * @property {() => boolean} [action] returns false if the action should not be marked as taken
 * @property {string} [effect] shorthand to open a dialog with the string content. Any reference items in [] will be given to the player.
 * @property {() => boolean} [condition]
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [image]
 * @property {number} [blur]
 * @property {boolean} [textBackground]
 * @property {string} [backgroundColor]
 * @property {PageLink[]} [links]
 * @property {PageAction[]} [actions]
 */

/** @type {Page[]} */
export const PAGES = [
  {
    id: 'tutorial',
    title: 'Tutorial',
    description: `This is the tutorial page. Here would be a description of where you are / what is happening.

You can restart the game at any time by clicking the restart button in the top left corner.

You can also view your inventory by clicking the inventory button in the top right corner.

Currently, there are 6 possible endings. Whether an ending is good or bad is subjective. Some endings are based on random chance.`,
    backgroundColor: 'slategray',
    image:
      'https://shopgreatpretenders.com/cdn/shop/files/Untitleddesign-2023-08-23T101829.266_ee7c6476-c595-492f-be70-3357b1a31e3e.png?v=1692800320&width=1600',
    actions: [
      {
        name: 'A bonus action you can take',
        description: "you don't leave this screen by taking a bonus action",
        action: () => {
          state.openDialog(
            'Bonus Action 1',
            'This is just an example. But something probably would have happened here!',
          );
        },
      },
      {
        name: 'You can also do this',
        description: 'cool huh?',
        action: () => {
          state.openDialog(
            'Bonus Action 2',
            'This is just an example. But something probably would have happened here!',
          );
        },
      },
    ],
    links: [
      {
        name: 'Start the game!',
        description: 'This is your main choice.\nMaking a choice will move you to a new screen.',
        link_to: 'forest_path_start',
      },
      {
        name: 'You could have multiple options here',
        description: 'This also starts the game.',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'forest_path_start',
    title: 'Forest Path - Awakening',
    description:
      'You awaken with a gasp, lying on damp earth. Towering trees form a dense canopy overhead, filtering the sunlight into dappled patterns. A narrow, overgrown path stretches to your left and right. Your head throbs, and you have no memory of how you arrived here.',
    image: 'https://cdn.pixabay.com/photo/2018/01/19/09/17/tree-3092026_1280.jpg',
    blur: 10,
    actions: [
      {
        name: 'Look Around Carefully',
        description: 'Scan your immediate surroundings for any clues or dangers.',
        effect:
          "The forest is quiet, save for the rustling of leaves and distant birdsong. The air is cool and smells of pine and damp soil. There's nothing immediately threatening, nor anything of obvious value right here.",
      },
      {
        name: 'Search for the Hidden Cultist Chamber',
        description: 'Search off the path',
        condition: () => state.inventory.includes(ITEM_MAP['shadowcult_scroll_translated']),
        action: () => {
          state.addItem(ITEM_MAP['hidden_cultist_chamber_discovered']);
          state.openDialog(
            'Hidden Cultist Chamber Discovered',
            'You have discovered a trapdoor in the ground. It looks like it leads to a hidden chamber.',
          );
        },
      },
    ],
    links: [
      {
        name: 'Go Left (Deeper into Forest)',
        description: 'The path to the left seems to wind deeper into the shadowy woods.',
        link_to: 'forest_path_deeper_amulet',
      },
      {
        name: 'Enter the Hidden Chamber',
        description: "Descend the trapdoor into the cult's hidden chamber",
        condition: () => state.inventory.includes(ITEM_MAP['hidden_cultist_chamber_discovered']),
        onLink: () => state.saveCheckpoint(),
        link_to: 'forest_path_secret_chamber_Q2',
      },
      {
        name: 'Go Right (Towards Sounds of Water)',
        description:
          'To the right, the path appears to descend slightly, and you think you hear the faint sound of running water.',
        link_to: 'river_bank_dead_end',
      },
    ],
  },
  {
    id: 'river_bank_dead_end',
    title: 'Riverbank',
    description:
      "The path ends abruptly at the bank of a wide, swiftly flowing river. The water is clear enough to see the rocky bottom. There's no obvious way to cross here.",
    image: 'https://cdn.pixabay.com/photo/2021/08/29/15/43/torrent-6583626_1280.jpg',
    blur: 10,
    actions: [
      {
        name: 'Look in the River',
        description: 'Peer into the clear water near the bank.',
        effect:
          'You spot something glinting on the riverbed! With a little effort, you retrieve a [copper_coin]. The current is too strong to wade out further safely.',
      },
    ],
    links: [
      {
        name: 'Go Upstream',
        description: 'Follow the riverbank upstream, where the terrain looks rougher.',
        link_to: 'river_upstream_rapids',
      },
      {
        name: 'Go Downstream',
        description: 'Follow the riverbank downstream, where the flow seems to calm.',
        link_to: 'river_calm_bend',
      },
      {
        name: 'Go Back to Forest Path',
        description: 'Return the way you came.',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'river_upstream_rapids',
    title: 'Upstream Rapids',
    description:
      'The river here is a torrent of white water crashing over jagged rocks. The air is filled with mist and the roar of the rapids. The path along the bank is treacherous.',
    image: 'https://cdn.pixabay.com/photo/2020/04/02/12/06/water-4994814_1280.jpg',
    textBackground: true,
    blur: 6,
    actions: [
      {
        name: 'Examine Glittering Rocks',
        description: "Carefully inspect the rocks near the water's edge, something catches your eye.",
        effect:
          'Among the wet stones, you find a small, unusually vibrant [glowing_crystal_shard_cave]. It pulses with a soft, inner light.',
      },
    ],
    links: [
      {
        name: 'Go Back Downstream',
        description: 'Return to the calmer part of the river.',
        link_to: 'river_bank_dead_end',
      },
    ],
  },
  {
    id: 'river_calm_bend',
    title: "River's Calm Bend",
    description:
      "The river slows here, widening into a peaceful bend. Reeds grow thickly along the banks, and dragonflies skim the water's surface. It's a surprisingly tranquil spot.",
    image: 'https://cdn.pixabay.com/photo/2021/10/13/12/33/forest-6706559_1280.jpg',
    blur: 8,
    actions: [
      // (Hint for The Shadow of Oakhaven quest)
      {
        name: 'Inspect a Washed-Up Satchel',
        description: 'You notice a small, waterlogged leather satchel caught in the reeds.',
        effect:
          "Inside, you find a [waterlogged_plea]. Most of it is illegible, but you can make out the words 'Oakhaven' and 'shadow'.",
      },
    ],
    links: [
      {
        name: 'Follow Path Towards Oakhaven Outskirts',
        description: 'A faint path leads away from the river, seemingly towards signs of civilization.',
        link_to: 'oakhaven_outskirts',
      },
      {
        name: 'Go Back Upstream',
        description: 'Return towards the main riverbank area.',
        link_to: 'river_bank_dead_end',
      },
      {
        name: 'Follow some footprints',
        description: 'Follow the footprints towards the forest.',
        link_to: 'hunter_camp_approach',
      },
    ],
  },
  ...oakhaven,
  ...whispering_woods,
];
