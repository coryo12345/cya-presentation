import { ITEM_MAP } from './items';
import { interpolateItemNames, state } from './state';

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
 * @property {() => boolean} [action] returns false if the action should not be marked astaken
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
      // {
      //   name: 'Go Left (Deeper into Forest)',
      //   description: 'The path to the left seems to wind deeper into the shadowy woods.',
      //   link_to: 'forest_path_deeper',
      // },
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
    backgroundColor: '#4682B4',
    image: 'https://cdn.pixabay.com/photo/2020/04/02/12/06/water-4994814_1280.jpg',
    blur: 10,
    actions: [
      {
        name: 'Examine Glittering Rocks',
        description: "Carefully inspect the rocks near the water's edge, something catches your eye.",
        effect:
          'Among the wet stones, you find a small, unusually vibrant [glowing_crystal_shard_cave]. It pulses with a soft, inner light.',
      },
    ],
    links: [
      // {
      //   name: 'Search for Cave Entrance',
      //   description: 'The glowing shard makes you wonder if its source is nearby.',
      //   link_to: 'cave_hidden_entrance_exterior',
      // },
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
  {
    id: 'hunter_camp_approach',
    description:
      'You follow the footprints into the forest. You find a campsite with what looks like the ruins of a campfire',
    actions: [
      {
        name: 'Search the campsite',
        description: 'Search the campsite for anything useful.',
        effect: 'You find a [copper_coin].',
      },
      {
        name: 'Dig in the campfire ruins',
        description: 'Search in the ashes for anything useful.',
        effect:
          "Nothing. It's just ashes... you realize people typically don\'t throw valuables in their fires. Usually...",
      },
    ],
    links: [
      {
        name: 'Follow the footprints further',
        description: 'Follow the footprints further into the forest.',
        link_to: 'hunter_camp',
      },
      {
        name: 'Go Back to the river',
        description: 'Return to the riverbank area.',
        link_to: 'river_calm_bend',
      },
    ],
  },
  {
    id: 'hunter_camp',
    title: 'Hunter Camp',
    description: 'You find a large campground with some hunters and their tents.',
    actions: [
      {
        name: 'Inquire about the footprints',
        description: 'Ask the hunters about the footprints you found.',
        effect:
          "The hunters tell you that they were tracking a bear that had been causing trouble in the area. They lost the trail in the forest. One hunter gives you a [silver_dagger_inscribed] in case you need protection.\n\nYou're now sure what a dagger will do against a bear, but you accept the gift.",
      },
      {
        name: 'Search the tents (Risky)',
        description: 'Search the tents for anything useful.',
        action: () => {
          if (Math.random() < 0.5) {
            state.saveCheckpoint();
            state.goTo('hunter_camp_sneak_fail');
          } else {
            state.addItem(ITEM_MAP['copper_coin']);
            state.addItem(ITEM_MAP['lockpick']);
            state.openDialog('You loot the tents.', 'You find a [copper_coin] and a [lockpick].');
          }
        },
      },
    ],
    links: [
      {
        name: 'Follow the path back',
        description: 'Return to the riverbank area.',
        link_to: 'river_calm_bend',
      },
    ],
  },
  {
    id: 'hunter_camp_sneak_fail',
    title: 'Ending: Slain by the Hunters',
    description:
      "You attempt to steal from the hunters. You think they aren't looking but they are too alert. They draw their bows and attack you. You are slain.",
    backgroundColor: '#1A2430',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Slain by the Hunters',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'oakhaven_outskirts',
    title: 'Oakhaven Outskirts',
    description:
      "You approach the village of Oakhaven. Ramshackle fences line a muddy track leading towards simple wooden houses. A pall of unease hangs in the air; it's unnaturally quiet, and the few villagers you see hurry indoors, casting suspicious glances.",
    backgroundColor: '#A0522D',
    image: '/medieval-village.jpg',
    links: [
      {
        name: 'Enter the Village Square',
        description: 'Head towards the center of Oakhaven.',
        link_to: 'oakhaven_square_Q2',
      },
      {
        name: 'Head to the Old Mill',
        description: 'The old mill is within sight.',
        link_to: 'oakhaven_mill_exterior_Q2',
      },
      {
        name: 'Leave Oakhaven',
        description: 'This place feels unwelcoming. Best to move on.',
        link_to: 'river_calm_bend',
      },
    ],
  },
  {
    id: 'oakhaven_notice_board_Q2',
    title: 'Oakhaven Notice Board',
    description: 'The notice board has a few tattered posters.',
    backgroundColor: 'SADDLEBROWN',
    actions: [
      {
        name: 'Notice: Lost Locket',
        description: 'A note about a missing locket.',
        action: () => {
          state.addItem(ITEM_MAP['lost_locket_pamphlet'].id);
          state.openDialog(
            'Notice: Lost Locket',
            "The locket is described as silver, heart-shaped, with a tiny sapphire. It belongs to Martha, the baker's wife.",
          );
        },
      },
      {
        name: 'Mayoral Request',
        description: 'An urgent request from the Mayor.',
        action: () => {
          state.addItem(ITEM_MAP['mayor_request_pamphlet'].id);
          state.openDialog(
            'Mayoral Request',
            'The mayor seeks help in freeing the town from a mysterious curse. He promises a handsome reward for anyone who can help.',
          );
        },
      },
    ],
    links: [
      {
        name: 'Back to the Village Square',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_square_Q2',
    title: 'Oakhaven Village Square',
    description:
      "The square is dusty and mostly empty. A few closed market stalls stand forlornly. The largest buildings are the Mayor's House and the 'Sleeping Dragon' Inn, though the inn looks closed. Fearful eyes watch you from darkened windows.",
    image: 'medieval-village.jpg',
    blur: 10,
    textBackground: true,
    links: [
      {
        name: 'Examine the Notice Board',
        description: "There's a weathered notice board near the village entrance.",
        link_to: 'oakhaven_notice_board_Q2',
      },
      {
        name: 'Visit the General Store',
        description: 'Maybe the shopkeeper has something useful.',
        link_to: 'oakhaven_general_store_Q2',
      },
      {
        name: 'Visit the Mayor',
        description: "The mayor's house is the largest building in the square.",
        link_to: 'oakhaven_mayor_house_Q2',
      },
      {
        name: "Approach the 'Sleeping Dragon' Inn",
        description: 'The inn is closed, but you can see a few people inside.',
        link_to: 'oakhaven_inn_exterior_Q2',
        condition: () => !state.inventory.includes(ITEM_MAP['hidden_oakhaven_inn_bribed']),
      },
      {
        name: "Approach the 'Sleeping Dragon' Inn",
        description: 'The inn is closed, but you can see a few people inside.',
        link_to: 'oakhaven_inn_interior_Q2',
        condition: () => state.inventory.includes(ITEM_MAP['hidden_oakhaven_inn_bribed']),
      },
      {
        name: 'Investigate a Suspicious Alleyway',
        description: 'A narrow alleyway is tucked between two buildings.',
        link_to: 'oakhaven_alley_Q2',
      },
      {
        name: 'Go to the Chapel',
        description: 'The old chapel is nearby.',
        link_to: 'oakhaven_chapel_exterior_Q2',
      },
      {
        name: 'Return to Oakhaven Outskirts',
        link_to: 'oakhaven_outskirts',
      },
    ],
  },
  {
    id: 'oakhaven_alley_Q2',
    title: 'Alleyway',
    description:
      'You find yourself in a narrow alleyway between two buildings. A foul odor seeps through the boards of the nearby building. You hear faint footsteps approaching.',
    backgroundColor: '#8B4513',
    actions: [
      {
        name: 'Search Trash Pile',
        description: 'Search the trash pile for anything useful.',
        action: () => {
          if (!state.inventory.includes(ITEM_MAP['lockpick'])) {
            state.addItem(ITEM_MAP['lockpick']);
            state.openDialog('You find a [lockpick] in the trash.', 'This could be useful...');
          } else {
            state.openDialog('You find nothing useful in the trash.', "What did you think you'd find?");
          }
        },
      },
      {
        name: 'Hide in the shadows',
        description: 'Hide in the shadows and wait for the footsteps to pass.',
        action: () => {
          if (!state.inventory.includes(ITEM_MAP['strange_symbol_medallion'])) {
            state.addItem(ITEM_MAP['strange_symbol_medallion']);
            state.openDialog(
              'You hide and wait...',
              'You hear a *clink* as the footsteps approach and pass by...\n\nYou find a [strange_symbol_medallion] on the ground.',
            );
          } else {
            state.addItem(ITEM_MAP['copper_coin']);
            state.openDialog(
              'You hide and wait...',
              'You hear a *clink* as the footsteps approach and pass by...\n\nYou pick up the [copper_coin] the stranger dropped.',
            );
          }
        },
      },
    ],
    links: [
      {
        name: 'Return to the Village Square',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_general_store_Q2',
    title: 'General Store',
    description: 'An old weary shopkeeper is behind the counter. "What can I get you..."',
    backgroundColor: '#A0522D',
    actions: [
      {
        name: 'Buy a Lockpick (1 Coin)',
        description: 'The shopkeeper has a lockpick for sale.',
        action: () => {
          if (state.inventory.includes(ITEM_MAP['copper_coin'])) {
            state.removeItem(ITEM_MAP['copper_coin']);
            state.addItem(ITEM_MAP['lockpick']);
            state.openDialog('You buy a [lockpick].', 'This could be useful...');
          } else {
            state.openDialog(
              'Nice try',
              '"Hah. You think I\'m gonna give you a lockpick for free? Come back with a coin."',
            );
            return false;
          }
        },
      },
      {
        name: 'Ask about the lost locket',
        description: 'See if the shopkeeper has information about the lost locket.',
        condition: () => state.inventory.includes(ITEM_MAP['lost_locket_pamphlet']),
        action: () => {
          state.removeItem(ITEM_MAP['lost_locket_pamphlet']);
          state.openDialog(
            '',
            "The shopkeeper looks at you curiously. 'I don't know anything about that, but I have had this [strange_symbol_medallion] for a while. You can have it if you want.'",
          );
        },
      },
    ],
    links: [
      {
        name: 'Return to the Village Square',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_mayor_house_Q2',
    title: "Mayor's House",
    description: 'A well-maintained house in the center of town. The mayor sits behind a large desk, looking troubled.',
    backgroundColor: '#A0522D',
    actions: [
      {
        name: 'Show the Mayoral Request',
        description: 'Show the mayor the request you found.',
        condition: () => state.inventory.includes(ITEM_MAP['mayor_request_pamphlet']),
        action: () => {
          state.removeItem(ITEM_MAP['mayor_request_pamphlet']);
          state.openDialog(
            '',
            "The mayor's eyes light up. 'Ah, you've come to help! Dark forces have taken hold of our town. People have been disappearing, and there is talk of a cult. I fear the rumors are true. We need someone brave enough to investigate and stop them before more lives are lost.'\n\n'Will you help us?'",
          );
        },
      },
      {
        name: 'Ask about the [shadowcult_scroll]',
        description: 'Ask the mayor if he knows anything about the [shadowcult_scroll].',
        condition: () => state.inventory.includes(ITEM_MAP['shadowcult_scroll']),
        effect:
          "I've never seen anything like that before. I certainly can't read it. But I believe a scholar came to town recently. Maybe you can try to find him?",
      },
    ],
    links: [
      {
        name: 'Return to Village Square',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_mill_exterior_Q2',
    title: 'Old Mill Exterior',
    description:
      "The old watermill stands by a stagnant creek on the edge of the village. It's dilapidated, and the water wheel is still. A faint, unsettling scratching sound comes from within.",
    backgroundColor: '#8B4513',
    links: [
      {
        name: 'Enter the Old Mill',
        description: 'Push open the creaking door and step inside.',
        link_to: 'oakhaven_mill_interior_Q2',
      },
      {
        name: 'Return to Oakhaven Outskirts',
        link_to: 'oakhaven_outskirts',
      },
    ],
  },
  {
    id: 'oakhaven_mill_interior_Q2',
    title: 'Old Mill Interior',
    description:
      'Inside, the mill is choked with dust and cobwebs. The air is heavy and smells of decay. You find a discarded [bandit_journal_oakhaven] half-hidden under a pile of sacks.',
    backgroundColor: '#5A3A1A',
    actions: [
      {
        name: "Read the Bandit's Journal",
        description: 'Peruse the contents of the journal.',
        action: () => {
          state.addItem(ITEM_MAP['bandit_journal_oakhaven'].id);
          state.openDialog(
            "Bandit's Journal",
            interpolateItemNames(
              "The journal entry reads: 'Found some weird scroll on a job. Boss is excited about it, says it's worth a fortune. Meeting at the usual place tonight with an unknown buyer. The buyer should have a [strange_symbol_medallion] with them. Not sure why the boss thinks the chapel cellar is such a nice hideout, but at least it's dry.'",
              true,
            ).text,
          );
        },
      },
    ],
    links: [
      {
        name: 'Leave the Mill',
        link_to: 'oakhaven_mill_exterior_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_chapel_exterior_Q2',
    title: 'Old Chapel Exterior',
    description:
      "The village chapel is a small, stone building with boarded-up windows. It looks abandoned, but you feel a strange coldness emanating from it. There's a heavy oak door at the front and a smaller, overgrown path leading around the back.",
    backgroundColor: '#708090',
    links: [
      {
        name: 'Enter the Front Door',
        description: 'An old wooden door',
        condition: () => !state.inventory.includes(ITEM_MAP['lockpick']),
        link_to: 'oakhaven_chapel_locked_Q2',
      },
      {
        name: 'Enter the Front Door',
        description: 'Pick the lock to the old wooden door',
        condition: () => state.inventory.includes(ITEM_MAP['lockpick']),
        onLink: () => state.removeItem(ITEM_MAP['lockpick']),
        link_to: 'oakhaven_chapel_interior_Q2',
      },
      {
        name: 'Look for the Cellar Entrance around the Back',
        description: 'The diary mentioned a cellar.',
        condition: () => state.inventory.includes(ITEM_MAP['bandit_journal_oakhaven']),
        link_to: 'oakhaven_cellar_entrance_Q2',
      },
      {
        name: 'Return to the Village Square',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_chapel_locked_Q2',
    title: 'The Door is Locked',
    description: 'The door is locked. If only you had something to unlock it.',
    backgroundColor: '#8B4513',
    actions: [
      {
        name: 'Smash the lock with your fists',
        effect:
          "It doesn't budge of course. It's a metal lock. Now your hands hurt. \n\nDid you think that would work?",
      },
    ],
    links: [
      {
        name: 'Return to the Chapel Exterior',
        link_to: 'oakhaven_chapel_exterior_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_chapel_interior_Q2',
    title: 'Old Chapel Interior',
    description: 'A cathedral room with faded scarlet pews and an oak pulpit.',
    actions: [
      {
        name: 'Pray at the altar',
        description: 'Pray to the gods for guidance.',
        effect: 'The gods are silent. You feel no change.',
      },
      {
        name: 'Confess your sins',
        description: 'Enter the confessional',
        effect: 'You sit for a moment, but nothing happens. You do find a [copper_coin] though. So that\s cool.',
      },
      {
        name: 'Search around the room',
        description: 'Look for anything useful.',
        effect: 'You find a [copper_coin] on the ground under a pew.',
      },
    ],
    links: [
      {
        name: 'Return to the Village Square',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_cellar_entrance_Q2',
    title: 'Forbidden Cellar Entrance',
    description:
      'Behind the chapel, hidden by overgrown bushes, you find a heavy, iron cellar door. A strange symbol is carved into the wood.',
    backgroundColor: '#465058',
    links: [
      {
        name: 'Enter the Forbidden Cellar',
        description: 'Descend into the darkness beneath the chapel.',
        onLink: () => state.saveCheckpoint(),
        link_to: 'oakhaven_forbidden_cellar_Q2',
      },
      {
        name: 'Leave the Cellar Entrance',
        link_to: 'oakhaven_chapel_exterior_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_forbidden_cellar_Q2',
    title: 'The Forbidden Cellar',
    description:
      "You enter the cellar, and the door slams shut behind you. You are locked in. \n\nThe air in the cellar is musty and smells of damp earth. Flickering torchlight from deeper within reveals a group of rough-looking men gathered around a table. You've stumbled upon the bandits' hideout.",
    backgroundColor: '#2C3E50',
    actions: [
      {
        name: 'Try to Sneak Past (Risky)',
        description: 'Attempt to get past the bandits without being seen.',
        action: () => {
          if (Math.random() < 0.5) {
            state.goTo('oakhaven_cellar_sneak_fail_Q2');
          } else {
            state.goTo('oakhaven_bandit_treasure_Q2');
          }
        },
      },
    ],
    links: [
      {
        name: 'Confront the Bandits',
        description: 'Step forward and challenge them.',
        link_to: 'oakhaven_bandit_confrontation_fail_Q2',
      },
      {
        name: 'Brandish the [strange_symbol_medallion] and pretend be the buyer.',
        description:
          'Hold the [strange_symbol_medallion] in front of you and step forward, as if you were one of them.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['strange_symbol_medallion']) &&
          state.inventory.includes(ITEM_MAP['bandit_journal_oakhaven']) &&
          !state.inventory.includes(ITEM_MAP['shadowcult_scroll']) &&
          !state.inventory.includes(ITEM_MAP['shadowcult_scroll_translated']),
        link_to: 'oakhaven_bandit_confrontation_Q2',
      },
      {
        name: 'Leave the Cellar',
        description: "You already have the scroll, so you don't need to be here.",
        condition: () =>
          state.inventory.includes(ITEM_MAP['shadowcult_scroll']) ||
          state.inventory.includes(ITEM_MAP['shadowcult_scroll_translated']),
        link_to: 'oakhaven_chapel_exterior_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_bandit_confrontation_fail_Q2',
    title: 'Ending: Confrontation with the Bandits',
    description:
      "The bandits turn, their faces flickering in the light of their torches. One of the figures steps forward. 'You shouldn't have come here!' \n\nHe raises his axe and strikes you down. You are slain.",
    backgroundColor: '#1A2430',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Slain by the Bandits',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'oakhaven_cellar_sneak_fail_Q2',
    title: 'Ending: Caught by the Bandits',
    description:
      "You attempt to sneak past the bandits, but they are too alert. 'You're not getting away with that!' \n\nThey turn and attack you. You are slain.",
    backgroundColor: '#1A2430',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Slain by the Bandits',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'oakhaven_bandit_treasure_Q2',
    title: 'Bandit Treasure Room',
    description: 'You have made your way past the bandits and found the treasure room.',
    backgroundColor: '#1A2430',
    actions: [
      {
        name: 'Search the room',
        description: 'Look for anything useful.',
        effect:
          "You find a [shadowcult_scroll] in one of the chests.\n\nYou can't make out the writing, but it looks important. Perhaps you should find someone who can translate it.",
      },
    ],
    links: [
      {
        name: 'Leave the Cellar',
        link_to: 'oakhaven_chapel_exterior_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_bandit_confrontation_Q2',
    title: 'Confrontation with the Bandits',
    description:
      "The bandits turn to face you. Seeing the [strange_symbol_medallion] in your possession, their leader steps forward. 'Ah, you're the buyer! I'm glad you're here. We've got the scroll ready for you.'",
    backgroundColor: '#1A2430',
    actions: [
      {
        name: 'Buy the Scroll',
        description: 'Trade a [copper_coin] for the scroll.',
        condition: () => state.inventory.includes(ITEM_MAP['copper_coin']),
        action: () => {
          state.removeItem(ITEM_MAP['copper_coin']);
          state.addItem(ITEM_MAP['shadowcult_scroll']);
          state.openDialog(
            'You buy the [shadowcult_scroll].',
            "You can't make out the writing, but it looks important. Perhaps you should find someone who can translate it.",
          );
        },
      },
    ],
    links: [
      {
        name: 'Leave the Cellar',
        link_to: 'oakhaven_chapel_exterior_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_inn_exterior_Q2',
    title: 'Sleeping Dragon Inn',
    description:
      'The inn looks closed, with a burly guard standing at the door. He eyes you suspiciously, while barring your way. Perhaps you could bribe him with a coin.',
    backgroundColor: '#8B4513',
    actions: [
      {
        name: 'Bribe the Guard',
        description: 'Offer a coin to the guard to let you in.',
        condition: () => state.inventory.includes(ITEM_MAP['copper_coin']),
        action: () => {
          state.removeItem(ITEM_MAP['copper_coin']);
          state.addItem(ITEM_MAP['hidden_oakhaven_inn_bribed']);
          state.goTo('oakhaven_inn_interior_Q2');
        },
      },
    ],
    links: [
      {
        name: 'Return to Village Square',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_inn_interior_Q2',
    title: 'Sleeping Dragon Inn Interior',
    description:
      'The inn is dimly lit and mostly empty. A scholarly-looking man sits in the corner, surrounded by books and scrolls.',
    backgroundColor: '#5A3A1A',
    actions: [
      {
        name: 'Greet the Scholar',
        description: 'Introduce yourself.',
        condition: () => !state.inventory.includes(ITEM_MAP['shadowcult_scroll_translated']),
        effect: "The scholar looks up at you. 'I'm sorry, I'm quite busy right now.'",
      },
      {
        name: 'Show the Scroll to the Scholar',
        description: 'Ask the scholar to translate the scroll.',
        condition: () => state.inventory.includes(ITEM_MAP['shadowcult_scroll']),
        action: () => {
          state.removeItem(ITEM_MAP['shadowcult_scroll']);
          state.addItem(ITEM_MAP['shadowcult_scroll_translated']);
          state.openDialog(
            "Scholar's Translation",
            "The scholar's eyes widen as he reads. 'This must be a scroll from the Shadow Cult!'\n\nLet me translate it for you.\n\nHe gives you a [shadowcult_scroll_translated].",
          );
        },
      },
      {
        name: 'Ask the Scholar about the Shadow Cult',
        description: 'Ask for more information about the Shadow Cult.',
        condition: () => state.inventory.includes(ITEM_MAP['shadowcult_scroll_translated']),
        action: () => {
          if (!state.inventory.includes(ITEM_MAP['shadowbane_charm_oakhaven_recipe'])) {
            state.addItem(ITEM_MAP['shadowbane_charm_oakhaven_recipe']);
          }
          state.openDialog(
            '',
            `Hmm... yes I do know a bit about them. They're a strange bunch, to say the least.

They worship a god called A'kul. He's some sort of dark entity that they claim will grant them great power.

I have read about their ritual before, but I don't remember where. If they complete their ritual of darkness, they will be able to summon the dark god A'kul.

The ritual can't be stopped once it has started, but I believe a [shadowbane_charm_oakhaven] could be used to reverse the effects, and destroy all the worshippers of the darkness.

I don't have one, but I believe I could help make you one if you could bring me a [glowing_crystal_shard_cave]. I should have the rest of the ingredients on me.

You could probably find a [glowing_crystal_shard_cave] near the cave upstream of Oakhaven.`,
          );
        },
      },
      {
        name: 'Hand the [glowing_crystal_shard_cave] to the Scholar',
        description: 'Have the scholar make you a [shadowbane_charm_oakhaven].',
        condition: () =>
          state.inventory.includes(ITEM_MAP['glowing_crystal_shard_cave']) &&
          state.inventory.includes(ITEM_MAP['shadowbane_charm_oakhaven_recipe']),
        action: () => {
          state.removeItem(ITEM_MAP['glowing_crystal_shard_cave']);
          state.removeItem(ITEM_MAP['shadowbane_charm_oakhaven_recipe']);
          state.addItem(ITEM_MAP['shadowbane_charm_oakhaven']);
          state.openDialog(
            '',
            'You hand the [glowing_crystal_shard_cave] to the scholar. He looks at it and nods.\n\nHe performs a few incantations and a [shadowbane_charm_oakhaven] is created. He hands it to you.',
          );
        },
      },
      {
        name: 'Ask for Work',
        description: 'Ask the owner of the inn if he needs help with anything.',
        effect:
          'The owner of the inn is a bit busy, but he could use some help cleaning a few rooms.\n\nYou spend some time cleaning the rooms, and in return, he gives you a [copper_coin].',
      },
    ],
    links: [
      {
        name: 'Leave the Inn',
        link_to: 'oakhaven_square_Q2',
      },
    ],
  },
  {
    id: 'forest_path_secret_chamber_Q2',
    title: 'Secret Chamber',
    description:
      "You find a hidden trapdoor in the ground in the forest. Inside, you discover a chamber filled with robed figures. They turn towards you, whispering... 'Is that really him?'",
    backgroundColor: '#2C3E50',
    actions: [
      {
        name: 'Step Forward',
        description: 'Move closer to the altar.',
        action: () => {
          state.addItem(ITEM_MAP['hidden_cultist_chamber_stepped_forward']);
          state.openDialog(
            '',
            "One of the cultists steps forward. 'Sir, you've finally returned. We've been waiting for you. The ritual is ready to perform.'\n\n\nIt seems they think you are their leader. You did wake up just outside here after all.\n\nCould this be your destiny?",
          );
        },
      },
    ],
    links: [
      {
        name: 'Embrace the Darkness',
        description: 'Accept your role as their leader.',
        condition: () => state.inventory.includes(ITEM_MAP['hidden_cultist_chamber_stepped_forward']),
        link_to: 'game_over_dark_embrace_Q2',
      },
      {
        name: 'Destroy the Altar',
        description: 'Try to smash the dark altar.',
        condition: () => state.inventory.includes(ITEM_MAP['hidden_cultist_chamber_stepped_forward']),
        link_to: 'game_over_cult_sacrifice_Q2',
      },
      {
        name: 'Ruin the Ritual',
        description: 'Use the Shadowbane Charm to reverse the ritual effects, destroying the shadow cult.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['hidden_cultist_chamber_stepped_forward']) &&
          state.inventory.includes(ITEM_MAP['shadowbane_charm_oakhaven']),
        link_to: 'game_over_ritual_reversed_Q2',
      },
    ],
  },
  {
    id: 'game_over_dark_embrace_Q2',
    title: 'Ending: Dark Embrace',
    description:
      "The cultists bow down to you. 'Welcome back, our lord. We will serve you faithfully.'\n\nYou perform the ritual, and the darkness claims you. A'kul is summoned, and the world is plunged into darkness.\n\nThe shadow cult has won, with you as their leader and their dark god A'kul at the helm.",
    backgroundColor: '#000000',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Dark Lord',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'game_over_cult_sacrifice_Q2',
    title: 'Ending: Cult Sacrifice',
    description:
      "You try to destroy the altar, but the cultists stop you before you can make any progress. They overpower you and sacrifice you to A'kul. You are slain.",
    backgroundColor: '#000000',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: "Game Over - Sacrificed to A'kul",
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'game_over_ritual_reversed_Q2',
    title: 'Reverse the Ritual',
    description:
      'You tell the cultists you are going to perform the ritual, but you use the [shadowbane_charm_oakhaven] to reverse the effects. What should have summoned darkness, summons a bright holy light. The light reaches out into the world and destroys the shadow cult. You pass out from casting the ritual.',
    backgroundColor: '#000000',
    links: [
      {
        name: 'Continue',
        description: 'Continue the story',
        link_to: 'game_over_ritual_reversed_celebration_Q2',
      },
    ],
  },
  {
    id: 'game_over_ritual_reversed_celebration_Q2',
    title: 'Ending: Ritual Reversed',
    description:
      "You wake up in Oakhaven. The mayor is there to greet you. 'Thank you for saving us!'\n\nYou are hailed as a hero, and the shadow cult is destroyed. The world is saved!",
    backgroundColor: '#000000',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Ritual Reversed',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
];
