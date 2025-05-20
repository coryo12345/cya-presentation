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
 * @property {string} [effect]
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
    description: 'This is the tutorial page. Here would be a description of where you are / what is happening',
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
    ],
    links: [
      // {
      //   name: 'Go Left (Deeper into Forest)',
      //   description: 'The path to the left seems to wind deeper into the shadowy woods.',
      //   link_to: 'forest_path_deeper',
      // },
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
      {
        name: 'Search for Cave Entrance',
        description: 'The glowing shard makes you wonder if its source is nearby.',
        link_to: 'cave_hidden_entrance_exterior',
      },
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
    description:
      "You attempt to steal from the hunters. You think they aren't looking but they are too alert. They draw their bows and attack you. You are slain.",
    backgroundColor: '#1A2430',
    links: [
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
        effect: 'TODO', // TODO
      },
      {
        // TODO another filler note to build out the world
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
    actions: [
      {
        name: 'Try the Inn Door',
        description: "See if the 'Sleeping Dragon' Inn is open.",
        effect:
          "The door is barred from the inside. A gruff voice tells you to go away, they're not serving strangers.",
      },
    ],
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
        effect:
          "The shopkeeper looks at you curiously. 'I don't know anything about that, but I have had this [strange_symbol_medallion] for a while. You can have it if you want.'",
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
      "Inside, the mill is choked with dust and cobwebs. The air is heavy and smells of decay. You find a discarded [villagers_diary_oakhaven] half-hidden under a pile of sacks. It details strange meetings and growing fear of a 'Shadow Master.'",
    backgroundColor: '#5A3A1A',
    actions: [
      {
        name: "Read the Villager's Diary",
        description: 'Peruse the contents of the diary.',
        action: () => {
          state.addItem(ITEM_MAP['villagers_diary_oakhaven'].id);
          state.openDialog(
            "A Villager's Diary",
            interpolateItemNames(
              "The diary speaks of secret gatherings at the 'Forbidden Cellar' beneath the old chapel and mentions a [strange_symbol_medallion] worn by cultists.",
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
        description: 'An old wooden door',
        condition: () => state.inventory.includes(ITEM_MAP['lockpick']),
        onLink: () => state.removeItem(ITEM_MAP['lockpick']),
        link_to: 'oakhaven_chapel_interior_Q2',
      },
      {
        name: 'Look for the Cellar Entrance around the Back',
        description: 'The diary mentioned a cellar.',
        condition: () => state.inventory.includes(ITEM_MAP['villagers_diary_oakhaven']),
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
      "You enter the cellar, and the door slams shut behind you. You are locked in. \n\nThe air in the cellar is frigid and rank with the smell of decay and something else... something cloyingly sweet. Flickering torchlight from deeper within reveals a ritual chamber. Hooded figures chant around a dark altar. You've stumbled upon the heart of Oakhaven's shadow.",
    backgroundColor: '#2C3E50',
    actions: [
      // if you sneak, there is a 50/50 chance to succeed or fail
      {
        name: 'Try to Sneak Past (Risky)',
        description: 'Attempt to find the source of the shadow without being seen.',
        action: () => {
          if (Math.random() < 0.5) {
            state.goTo('oakhaven_cult_sneak_fail_Q2');
          } else {
            state.goTo('oakhaven_cult_confrontation_Q2');
          }
        },
      },
    ],
    links: [
      {
        name: 'Confront the Cultists',
        description: 'Step forward and challenge them.',
        link_to: 'oakhaven_cult_confrontation_fail_Q2',
      },
      {
        name: 'Brandish the [strange_symbol_medallion] and attempt to blend in',
        description:
          'Hold the [strange_symbol_medallion] in front of you and step forward, as if you were one of them.',
        condition: () => state.inventory.includes(ITEM_MAP['strange_symbol_medallion']),
        link_to: 'oakhaven_cult_confrontation_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_cult_confrontation_fail_Q2',
    title: 'Confrontation with the Shadow Cult',
    description:
      "The cultists turn, their faces hidden in shadow. One of the figures holds a staff topped with a [strange_symbol_medallion], and steps forward. 'Another fool stumbles into the Master's embrace!' \n\nHe raises his staff and a beam of shadow energy strikes you. You are slain.",
    backgroundColor: '#1A2430',
    links: [
      {
        name: 'Game Over - Slain by the Shadow Cultists',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'oakhaven_cult_sneak_fail_Q2',
    title: 'Sneak Past the Shadow Cult',
    description:
      "You attempt to sneak past the cultists, but they are too alert. 'Another fool stumbles into the Master's embrace!' \n\nThey turn and attack you. You are slain.",
    backgroundColor: '#1A2430',
    links: [
      {
        name: 'Game Over - Slain by the Shadow Master',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'oakhaven_cult_confrontation_Q2',
    title: 'Confrontation with the Shadow Cult',
    description:
      "The cultists turn, their faces hidden in shadow. Their leader, a tall figure holding a staff topped with a [strange_symbol_medallion], steps forward. 'Another fool stumbles into the Master's embrace!'",
    backgroundColor: '#1A2430',
    actions: [
      {
        name: 'Toss the [strange_symbol_medallion]',
        description: 'Throw the [strange_symbol_medallion] at the leader, hoping it will distract them.',
        condition: () => state.inventory.includes(ITEM_MAP['strange_symbol_medallion']),
        action: () => {
          state.addItem(ITEM_MAP['hidden_oakhaven_cult_distract']);
          state.removeItem(ITEM_MAP['strange_symbol_medallion']);
          state.openDialog('The Cultists are distracted by the medallion', 'You can now rush to the altar.');
        },
      },
    ],
    links: [
      {
        name: 'Destroy the Altar',
        description: 'Ignore the cultists & rush focus your efforts on the dark altar, rushing over to it.',
        condition: () => state.inventory.includes(ITEM_MAP['silver_dagger_inscribed']),
        link_to: 'oakhaven_shadow_banished_Q2',
        onLink: () => {
          if (!state.inventory.includes(ITEM_MAP['hidden_oakhaven_cult_distract'])) {
            state.goTo('game_over_cult_sacrifice_Q2');
            return false;
          }
        },
      },
      {
        name: 'Attempt to Fight the Leader',
        description: 'Without enough protection, this is unwise.',
        link_to: 'game_over_cult_sacrifice_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_shadow_banished_Q2',
    title: 'The Shadow Banished',
    description:
      'Using the blessed items, you manage to disrupt the ritual and shatter the dark altar. A piercing shriek echoes as the shadowy presence dissipates. The cultists collapse or flee in terror. Oakhaven is saved, thanks to you. The villagers, though shaken, hail you as their hero.',
    backgroundColor: '#E6E6FA',
    textBackground: true,
    links: [
      {
        name: 'Celebrate with Oakhaven',
        description: 'You are hailed as a hero. The villagers thank you for your bravery.',
        link_to: 'game_won_oakhaven_quest',
      },
    ],
  },
  {
    id: 'game_won_oakhaven_quest',
    title: 'VICTORY! - Savior of Oakhaven',
    description:
      'The shadow over Oakhaven has been lifted, thanks to your bravery and detective skills. The village rejoices, and your name will be sung in local tales for years to come. Your quest is complete!',
    backgroundColor: '#90EE90',
    textBackground: true,
    links: [
      {
        name: 'Start a New Adventure?',
        onLink: () => state.restart(),
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'game_over_cult_sacrifice_Q2',
    title: 'Consumed by Shadow',
    description:
      "The cultists overwhelm you. The last thing you see is the leader's shadowy face as you are dragged towards the altar. Oakhaven falls completely into darkness, and you become another offering to the Shadow Master.",
    backgroundColor: '#000000',
    links: [
      {
        name: 'Game Over - Slain by the Shadow Master',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
];
