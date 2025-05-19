import { state } from './state';

/**
 * @typedef {Object} PageLink
 * @property {string} name
 * @property {string} [description]
 * @property {string} [image]
 * @property {string} [opacity]
 * @property {string} [backgroundColor]
 * @property {string} link_to
 */

/**
 * @typedef {Object} PageAction
 * @property {string} name
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
 * @property {boolean} [invert]
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
        name: 'OR you can do this.',
        description: 'but you can only do one!',
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
      {
        name: 'Go Left (Deeper into Forest)',
        description: 'The path to the left seems to wind deeper into the shadowy woods.',
        link_to: 'forest_path_deeper',
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
    id: 'forest_path_deeper',
    title: 'Deeper Forest Path',
    description:
      'The trees press closer here, and the air is cooler. Strange shadows dance in your peripheral vision. The path is barely visible, covered in fallen leaves and twisted roots.',
    backgroundColor: '#006400',
    actions: [
      //(Hint for Amulet of Whispering Woods quest)
      {
        name: 'Examine Strange Markings on a Tree',
        description: 'You notice some odd carvings on an ancient, gnarled oak.',
        effect:
          "The markings are old and weathered, forming symbols you don't recognize. They seem to point towards a barely perceptible trail leading off the main path. You feel a faint thrum of old magic.",
      },
      {
        name: 'Listen to the Forest',
        description: 'Stand still and listen intently to the sounds around you.',
        effect:
          'Besides the wind and creaking branches, you hear a faint, rhythmic tapping sound coming from deeper within the woods, off the main path. It stops after a moment.',
      },
    ],
    links: [
      {
        name: 'Follow the Main Path (to Crossroads)',
        description: 'Continue along what seems to be the main path.',
        link_to: 'crossroads_central',
      },
      {
        name: "Investigate the Faint Trail (Hermit's Direction)",
        description: 'Follow the barely visible trail indicated by the tree markings.',
        link_to: 'hermits_clearing_approach',
      },
      {
        name: 'Go Back to Forest Path Start',
        description: 'Return to where you first awoke.',
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
    ],
  },
  {
    id: 'crossroads_central',
    title: 'Forest Crossroads',
    description:
      'The path opens into a small clearing where several tracks converge. A weathered, unreadable signpost stands crookedly in the center. You feel a sense of choice here.',
    backgroundColor: '#D2B48C',
    actions: [
      {
        name: 'Talk to the Travelling Merchant (Elara)',
        description: 'A cloaked figure with a large backpack is resting by the signpost.',
        effect:
          "The merchant, Elara, greets you. 'Well met, traveler. Looking for goods, or perhaps just news of the road?' If you have a [copper_coin], you can ask to trade for [basic_rations] or a [torch]. She might also share a rumor about strange lights in the mountains (hinting at Glimmering Caves) or troubles in Oakhaven if you ask.",
      },
    ],
    links: [
      {
        name: 'Take North Path (Towards Mountains/Caves)',
        description: 'This path seems to lead towards higher ground and distant peaks.',
        link_to: 'mountain_foothills_approach',
      },
      {
        name: 'Take East Path (Deeper into Woods/Hermit)',
        description: 'This path winds back into the denser part of the forest.',
        link_to: 'forest_path_deeper',
      },
      {
        name: 'Take South Path (Towards River/Oakhaven)',
        description: 'This path seems to head back towards the sound of the river and potential settlements.',
        link_to: 'river_calm_bend',
      },
      {
        name: 'Take West Path (Forest Clearing)',
        description: 'This less-travelled path leads to a small clearing.',
        link_to: 'forest_clearing_woodsman',
      },
    ],
  },
  {
    id: 'forest_clearing_woodsman',
    title: 'Forest Clearing',
    description:
      "This small, sun-dappled clearing contains a simple, well-kept woodsman's cabin with a thin trail of smoke curling from its chimney. Stacks of chopped firewood are piled neatly nearby.",
    backgroundColor: '#90EE90',
    actions: [
      {
        name: 'Approach the Cabin',
        description: 'Knock on the door of the cabin.',
        effect:
          "A grizzled but friendly Woodsman answers. He's wary but might offer you a piece of [basic_rations] if you seem harmless, or share local lore. He could warn you about the Whispering Woods: 'Best stay clear of the old temple ruins, lad/lass. Nothing good comes from there.'",
      },
    ],
    links: [
      {
        name: 'Return to Crossroads',
        description: 'Go back to the main crossroads.',
        link_to: 'crossroads_central',
      },
    ],
  },
  {
    id: 'hermits_clearing_approach',
    title: "Hermit's Clearing Approach",
    description:
      'The faint trail opens into a small, secluded clearing. A dilapidated hut stands in the center, a wisp of smoke rising from its chimney. Strange totems and wind chimes made of bone and wood hang from the surrounding trees.',
    backgroundColor: '#556B2F',
    actions: [
      {
        name: 'Observe the Hut',
        description: 'Watch the hut from a distance.',
        effect:
          'You see a figure moving inside, occasionally tending to a small herb garden. They seem old and move with a deliberate slowness.',
      },
    ],
    links: [
      {
        name: "Approach the Hermit's Hut",
        description: 'Walk towards the hut and try to speak with its occupant.',
        link_to: 'hermits_hut_exterior',
      },
      {
        name: 'Leave the Clearing',
        description: 'This place feels odd. Best to return to the main path.',
        link_to: 'forest_path_deeper',
      },
    ],
  },
  {
    id: 'hermits_hut_exterior',
    title: "Hermit's Hut",
    description:
      "You stand before the strange hut. An old, wizened figure in patched robes emerges, eyes sharp and observant. 'Few find their way to my door. State your purpose, or be on your way.'",
    backgroundColor: '#8FBC8F',
    actions: [
      {
        name: 'Ask about the Amulet of Whispering Woods',
        description: 'Mention the rumors or markings you might have heard or seen.',
        effect:
          "The Hermit's eyes narrow. 'The Amulet of Sylvandell... a dangerous prize. Why do you seek it?' This initiates dialogue that can lead to the Hermit giving you the [map_whispering_woods] and [hermits_talisman] if you convince them of your good intentions (or if you offer a [copper_coin] perhaps).",
      },
    ],
    links: [
      {
        name: 'Venture into the Whispering Woods (Requires Map)',
        description: 'If you have the map, you can attempt to find the Temple.',
        condition_item: 'map_whispering_woods',
        link_to: 'whispering_woods_entrance_Q1',
      },
      {
        name: 'Leave the Hermit',
        description: 'Thank the Hermit and depart.',
        link_to: 'hermits_clearing_approach',
      },
    ],
  },
  {
    id: 'whispering_woods_entrance_Q1',
    title: 'Whispering Woods Entrance',
    description:
      "Following the Hermit's map, you arrive at the edge of an ancient, unnaturally silent forest. The trees are gnarled and twisted, and a palpable sense of unease hangs in the air. This is the Whispering Woods. The path on your map leads into the gloom.",
    backgroundColor: '#2F4F4F',
    actions: [
      {
        name: "Listen to the 'Whispers'",
        description: 'Strain your ears to understand the faint sounds that give the woods its name.',
        effect:
          "You hear faint, sibilant whispers that seem to tug at the edges of your hearing, promising power, warning of danger, or trying to lure you off the path. It's unsettling.",
      },
    ],
    links: [
      {
        name: 'Enter the Whispering Woods',
        description: "Steel your nerves and follow the map's path.",
        link_to: 'whispering_woods_path_Q1',
      },
      {
        name: 'Turn Back',
        description: "This place feels too ominous. Return to the Hermit's clearing.",
        link_to: 'hermits_clearing_approach',
      },
    ],
  },
  {
    id: 'whispering_woods_path_Q1',
    title: 'Path Through Whispering Woods',
    description:
      "The woods are a labyrinth of shadows and half-seen movements. The whispers are constant now, trying to confuse you. You rely on the Hermit's map to stay on course towards the temple ruins.",
    backgroundColor: '#1A3A3A',
    actions: [
      {
        name: "Consult the Hermit's Talisman",
        description: 'Hold the [hermits_talisman] if you have it.',
        condition_item: 'hermits_talisman',
        effect:
          'The talisman grows faintly warm in your hand, and the confusing whispers seem to recede slightly, allowing you to focus on the true path.',
      },
    ],
    links: [
      {
        name: 'Press Deeper into the Woods',
        description: 'Continue following the map.',
        link_to: 'temple_ruins_approach_Q1',
      },
      {
        name: 'Attempt a Shortcut (Risky)',
        description: 'You see a less overgrown path that might be faster.',
        link_to: 'whispering_woods_lost_Q1',
      },
    ],
  },
  {
    id: 'whispering_woods_lost_Q1',
    title: 'Lost in the Whispering Woods',
    description:
      'The shortcut was a mistake. The whispers intensify, and the trees all look the same. Your map seems useless here, and a sense of dread washes over you. You are lost.',
    backgroundColor: '#0D1F1F',
    actions: [
      {
        name: 'Try to find the Sun',
        description: 'Look for a break in the canopy to get your bearings.',
        effect: 'The canopy is too thick. The whispers mock your attempts.',
      },
    ],
    links: [
      {
        name: 'Wander Aimlessly (Bad Ending)',
        description: 'Panic sets in. You stumble through the oppressive woods.',
        link_to: 'game_over_lost_woods_Q1',
      },
      {
        name: 'Backtrack Carefully (If you have Talisman)',
        description: 'Use the [hermits_talisman] to try and find your way back to a known path.',
        condition_item: 'hermits_talisman',
        link_to: 'whispering_woods_path_Q1',
      },
    ],
  },
  {
    id: 'temple_ruins_approach_Q1',
    title: 'Temple Ruins Approach',
    description:
      'The trees begin to thin, and you see crumbling stone walls ahead – the ruins of the Temple of Sylvandell. A heavy silence, broken only by the wind whistling through cracks in the masonry, replaces the whispers. The main entrance appears to be a sunken courtyard.',
    backgroundColor: '#4A5D5A',
    links: [
      {
        name: 'Enter the Sunken Courtyard (LOCK-IN POINT)',
        description: "Descend the mossy steps into the temple courtyard. There's a sense of finality to this choice.",
        link_to: 'temple_courtyard_Q1',
      },
      {
        name: 'Scout the Perimeter',
        description: 'Look for another way in or any useful items outside.',
        link_to: 'temple_perimeter_Q1',
      },
      {
        name: 'Leave the Temple Ruins',
        description: 'Decide this is too dangerous and return through the woods.',
        link_to: 'whispering_woods_entrance_Q1',
      },
    ],
  },
  {
    id: 'temple_perimeter_Q1',
    title: 'Temple Perimeter',
    description:
      'You circle the crumbling outer walls of the temple. Most are too high to climb or offer no entry. You find a small, discarded pouch near a collapsed section.',
    backgroundColor: '#5A6D6A',
    actions: [
      {
        name: 'Search the Pouch',
        description: "See what's inside the old pouch.",
        effect: 'Inside, you find a rusty but potentially usable [lockpick_set]!',
      },
    ],
    links: [
      {
        name: 'Return to the Sunken Courtyard Entrance',
        link_to: 'temple_ruins_approach_Q1',
      },
    ],
  },
  {
    id: 'temple_courtyard_Q1',
    title: 'Temple Courtyard (Locked In)',
    description:
      "You stand in a dilapidated courtyard. As you step onto the central flagstone, there's a deep groan and the sound of grinding stone behind you. The way you came is now blocked by a massive stone slab that has fallen from the archway! You are trapped within the temple.",
    backgroundColor: '#3B4D4A',
    links: [
      {
        name: 'Enter the Main Temple Hall',
        description: 'A large, imposing doorway leads into the heart of the temple.',
        link_to: 'temple_main_hall_Q1',
      },
      {
        name: 'Explore the Side Chapels',
        description: 'Smaller, shadowed archways lead to what look like side chapels.',
        link_to: 'temple_side_chapel_puzzle_Q1',
      },
    ],
  },
  {
    id: 'temple_main_hall_Q1',
    title: 'Temple Main Hall',
    description:
      "The main hall is vast and echoing. Fallen pillars and rubble litter the floor. At the far end, a raised dais holds a pedestal, but it's currently empty. Strange symbols cover the walls.",
    backgroundColor: '#2A3D3A',
    actions: [
      {
        name: 'Examine the Symbols',
        description: 'Study the symbols on the walls.',
        effect:
          'The symbols depict ancient rituals and astronomical alignments. Some seem to match markings on the [sunstone_key] if you found it in the side chapel.',
      },
    ],
    links: [
      {
        name: 'Approach the Dais',
        description: 'Walk towards the empty pedestal.',
        link_to: 'temple_dais_riddle_Q1',
      },
      {
        name: 'Return to Courtyard (Blocked)',
        description: 'The way back is sealed.',
        link_to: 'temple_courtyard_Q1',
      },
    ],
  },
  {
    id: 'temple_side_chapel_puzzle_Q1',
    title: 'Side Chapel - Sunstone Puzzle',
    description:
      'This smaller chapel is dimly lit by a crack in the ceiling. In the center is a stone altar with a circular depression. The walls are covered in carvings of suns and moons.',
    backgroundColor: '#334643',
    actions: [
      {
        name: 'Search the Altar',
        description: 'Investigate the altar closely.',
        effect: 'You find a hidden compartment beneath the altar! Inside is the [sunstone_key].',
      },
    ],
    links: [
      {
        name: 'Place the Sunstone Key (Requires Sunstone Key)',
        description: 'If you have the [sunstone_key], you can try placing it in the depression.',
        condition_item: 'sunstone_key',
        link_to: 'temple_side_chapel_solved_Q1',
      },
      {
        name: 'Return to the Main Hall',
        link_to: 'temple_main_hall_Q1',
      },
    ],
  },
  {
    id: 'temple_side_chapel_solved_Q1',
    title: 'Side Chapel - Mechanism Activated',
    description:
      'Placing the Sunstone Key into the depression causes a soft click. A section of the wall slides open, revealing a dusty alcove. Inside, you find an [ancient_lever_handle] and a [reflective_shard_mirror].',
    backgroundColor: '#334643',
    links: [
      {
        name: 'Take the Items and Return to the Main Hall',
        link_to: 'temple_main_hall_Q1',
      },
    ],
  },
  {
    id: 'temple_dais_riddle_Q1',
    title: 'Temple Dais - Riddle of Light',
    description:
      "You stand before the empty pedestal on the dais. An inscription reads: 'Only by reflecting truth can the path be opened.' There's a slot that looks like it could fit the [ancient_lever_handle]. Opposite the dais, a beam of light shines from a high window onto a specific floor tile.",
    backgroundColor: '#2A3D3A',
    actions: [
      {
        name: 'Use Reflective Shard (Requires Reflective Shard)',
        description: 'Try to use the [reflective_shard_mirror] with the beam of light.',
        condition_item: 'reflective_shard_mirror',
        effect:
          'By angling the shard, you can redirect the beam of light. It seems you need to hit a specific symbol on the wall.',
      },
      {
        name: 'Insert Lever Handle (Requires Ancient Lever Handle)',
        description: 'Place the [ancient_lever_handle] into the slot.',
        condition_item: 'ancient_lever_handle',
        effect: "The lever fits perfectly but won't budge yet.",
      },
    ],
    links: [
      {
        name: 'Solve the Light Puzzle (Requires Shard and Lever)',
        description: 'If you direct the light to the correct symbol and pull the lever...',
        condition_item: ['reflective_shard_mirror', 'ancient_lever_handle'],
        link_to: 'temple_secret_chamber_Q1',
      },
      {
        name: 'Pull Lever without Solving Puzzle (Bad Ending)',
        description: 'Try to force the lever.',
        condition_item: 'ancient_lever_handle',
        link_to: 'game_over_temple_trap_Q1',
      },
      {
        name: 'Return to Main Hall',
        link_to: 'temple_main_hall_Q1',
      },
    ],
  },
  {
    id: 'temple_secret_chamber_Q1',
    title: 'Secret Chamber - The Amulet',
    description:
      'With a grinding sound, the pedestal on the dais sinks into the floor, revealing a hidden staircase descending into darkness. At the bottom, a small, ornate chamber is lit by glowing crystals. Upon a velvet cushion rests the [amulet_sylvandell_dormant].',
    backgroundColor: '#1C2B2A',
    links: [
      {
        name: 'Take the Amulet',
        description: 'Reach out and claim the Amulet of Sylvandell.',
        link_to: 'temple_amulet_taken_Q1',
      },
      {
        name: 'Leave the Amulet',
        description: 'Perhaps some things are best left undisturbed.',
        link_to: 'temple_amulet_left_Q1',
      },
    ],
  },
  {
    id: 'temple_amulet_taken_Q1',
    title: "The Amulet's Power (Win Game)",
    description:
      'As your fingers close around the [amulet_sylvandell_dormant], it flares with a brilliant light, becoming the [amulet_sylvandell_awakened]. A wave of energy washes over you, invigorating and empowering. You feel a connection to the ancient magic of this place. A hidden passage grinds open, leading out of the temple into sunlight. You have succeeded!',
    backgroundColor: '#FFFACD',
    links: [
      {
        name: 'Exit the Temple (VICTORY!)',
        link_to: 'game_won_amulet_quest',
      },
    ],
  },
  {
    id: 'temple_amulet_left_Q1',
    title: 'A Noble Choice (Win Game)',
    description:
      "You decide against taking the amulet, sensing its volatile power. As you turn to leave, a soft voice echoes: 'Wisdom is its own reward.' The way out of the temple magically unseals, and you step back into the Whispering Woods, changed by your experience. The Hermit, if you meet them again, will commend your choice.",
    backgroundColor: '#E0FFFF',
    links: [
      {
        name: 'Exit the Temple (VICTORY!)',
        link_to: 'game_won_amulet_quest_noble',
      },
    ],
  },
  {
    id: 'game_over_lost_woods_Q1',
    title: 'GAME OVER - Lost to the Whispers',
    description:
      'Days turn into nights as you wander aimlessly. The whispers become your only companions, driving you to madness. You succumb to the darkness of the Whispering Woods, never to be seen again.',
    backgroundColor: '#000000',
    links: [
      {
        name: 'Try Again?',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'game_over_temple_trap_Q1',
    title: 'GAME OVER - Crushing Defeat',
    description:
      'You pull the lever without understanding its purpose. The floor beneath you groans, then gives way! You plummet into a dark, spike-filled pit. Your adventure ends here.',
    backgroundColor: '#000000',
    links: [
      {
        name: 'Try Again?',
        link_to: 'forest_path_start',
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
        name: 'Examine the Notice Board',
        description: "There's a weathered notice board near the village entrance.",
        link_to: 'oakhaven_notice_board_Q2',
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
    description:
      "The notice board has a few tattered posters. One offers a reward for a lost locket. Another is a stern warning from the Mayor about 'rumormongering and consorting with outsiders.' A newer, hastily scrawled note mentions 'strange noises from the old mill.'",
    backgroundColor: 'SADDLEBROWN',
    actions: [
      {
        name: "Take note of the 'Lost Locket'",
        description: 'Memorize the description of the locket.',
        effect:
          "The locket is described as silver, heart-shaped, with a tiny sapphire. It belongs to Martha, the baker's wife.",
      },
    ],
    links: [
      {
        name: 'Go to the Village Square',
        link_to: 'oakhaven_square_Q2',
      },
      {
        name: 'Head towards the Old Mill',
        link_to: 'oakhaven_mill_exterior_Q2',
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
    invert: true,
    actions: [
      {
        name: 'Try the Inn Door',
        description: "See if the 'Sleeping Dragon' Inn is open.",
        effect:
          "The door is barred from the inside. A gruff voice tells you to go away, they're not serving strangers.",
      },
    ],
    links: [
      // TODO - should allow player to buy lockpick
      {
        name: 'Visit the General Store (NYI)',
        link_to: 'oakhaven_general_store_Q2',
      },
      // TODO - NYI
      {
        name: 'Investigate a Suspicious Alleyway (NYI)',
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
        effect:
          "The diary speaks of secret gatherings at the 'Forbidden Cellar' beneath the old chapel and mentions a [strange_symbol_medallion] worn by cultists.",
      },
    ],
    links: [
      // TODO - this should be a condition to check if the player has the diary
      {
        name: 'Search for the Forbidden Cellar (Chapel)',
        description: 'The diary mentioned a cellar under the chapel...',
        link_to: 'oakhaven_chapel_exterior_Q2',
      },
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
      // TODO - NYI, maybe show dialog (it's bolted shut & can't be picked)
      {
        name: 'Try the Front Door (NYI)',
        description: "It's likely locked.",
        link_to: 'oakhaven_chapel_locked_Q2',
      },
      // TODO only show this if the player has the diary
      {
        name: 'Look for the Cellar Entrance around the Back',
        description: 'The diary mentioned a cellar.',
        link_to: 'oakhaven_cellar_entrance_Q2',
      },
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
      "Behind the chapel, hidden by overgrown bushes, you find a heavy, iron-bound cellar door, secured with a thick chain and a rusty padlock. A strange symbol, matching the one from the medallion if you've seen it, is carved into the wood.",
    backgroundColor: '#465058',
    links: [
      // (LOCK-IN POINT)
      // TODO - confirmation dialog? this is a big choice
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
    title: 'The Forbidden Cellar (Locked In)',
    description:
      "The air in the cellar is frigid and rank with the smell of decay and something else... something cloyingly sweet. Flickering torchlight from deeper within reveals a ritual chamber. Hooded figures chant around a dark altar. You've stumbled upon the heart of Oakhaven's shadow.",
    backgroundColor: '#2C3E50',
    links: [
      {
        name: 'Confront the Cultists',
        description: 'Step forward and challenge them.',
        link_to: 'oakhaven_cult_confrontation_Q2',
      },
      {
        name: 'Try to Sneak Past (Risky)',
        description: 'Attempt to find the source of the shadow without being seen.',
        link_to: 'oakhaven_cult_sneak_fail_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_cult_confrontation_Q2',
    title: 'Confrontation with the Shadow Cult',
    description:
      "The cultists turn, their faces hidden in shadow. Their leader, a tall figure holding a staff topped with a [strange_symbol_medallion], steps forward. 'Another fool stumbles into the Master's embrace!' Combat is not your strength, but perhaps words or a specific item can help.",
    backgroundColor: '#1A2430',
    actions: [
      {
        name: 'Use Silver Dagger (Requires Silver Dagger)',
        description: 'Brandish the [silver_dagger_inscribed].',
        condition_item: 'silver_dagger_inscribed',
        effect: "The cultists recoil from the silver's glint. The leader snarls, 'That trinket won't save you!'",
      },
      {
        name: 'Use Shadowbane Charm (Requires Shadowbane Charm)',
        description: 'Present the [shadowbane_charm_oakhaven].',
        condition_item: 'shadowbane_charm_oakhaven',
        effect:
          'The charm emits a bright pulse of light, causing the lesser cultists to cry out in pain and stumble back. The leader seems weakened but still defiant.',
      },
    ],
    links: [
      {
        name: 'Destroy the Altar (Requires Silver Dagger AND Shadowbane Charm)',
        description: 'Focus your efforts on the dark altar.',
        condition_item: ['silver_dagger_inscribed', 'shadowbane_charm_oakhaven'],
        link_to: 'oakhaven_shadow_banished_Q2',
      },
      {
        name: 'Attempt to Fight the Leader (Bad Ending)',
        description: 'Without enough protection, this is unwise.',
        link_to: 'game_over_cult_sacrifice_Q2',
      },
    ],
  },
  {
    id: 'oakhaven_shadow_banished_Q2',
    title: 'The Shadow Banished (Win Game)',
    description:
      'Using the blessed items, you manage to disrupt the ritual and shatter the dark altar. A piercing shriek echoes as the shadowy presence dissipates. The cultists collapse or flee in terror. Oakhaven is saved, thanks to you. The villagers, though shaken, hail you as their hero.',
    backgroundColor: '#E6E6FA',
    links: [
      {
        name: 'Celebrate with Oakhaven (VICTORY!)',
        link_to: 'game_won_oakhaven_quest',
      },
    ],
  },
  {
    id: 'game_over_cult_sacrifice_Q2',
    title: 'GAME OVER - Consumed by Shadow',
    description:
      "The cultists overwhelm you. The last thing you see is the leader's shadowy face as you are dragged towards the altar. Oakhaven falls completely into darkness, and you become another offering to the Shadow Master.",
    backgroundColor: '#000000',
    links: [
      {
        name: 'Try Again?',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'mountain_foothills_approach',
    title: 'Mountain Foothills',
    description:
      'The path from the crossroads has led you to the rugged foothills of a mountain range. The air is thin and crisp. You spot a dark opening in the mountainside – a possible cave entrance.',
    backgroundColor: '#A9A9A9',
    links: [
      {
        name: 'Approach the Cave Entrance',
        link_to: 'cave_hidden_entrance_exterior',
      },
      {
        name: 'Return to the Crossroads',
        link_to: 'crossroads_central',
      },
    ],
  },
  {
    id: 'cave_hidden_entrance_exterior',
    title: 'Glimmering Cave Entrance',
    description:
      'You stand before a dark fissure in the mountainside, partially hidden by thorny bushes. A faint, cool breeze emanates from within, carrying the scent of damp stone and something else... a subtle, metallic tang. Patches of [glowing_moss_clump] grow around the entrance.',
    backgroundColor: '#696969',
    actions: [
      {
        name: 'Collect Glowing Moss',
        description: 'Gather some of the glowing moss.',
        effect:
          'You carefully scrape some of the [glowing_moss_clump] into your pouch. It provides a dim, but steady light.',
      },
    ],
    links: [
      {
        name: 'Enter the Glimmering Cave',
        description: 'Squeeze through the narrow opening into the darkness.',
        link_to: 'cave_entry_passage_Q3',
      },
      {
        name: 'Head to the River Rapids',
        description: 'Decide not to enter the cave and head to the river rapids.',
        link_to: 'river_upstream_rapids',
      },
      {
        name: 'Leave and head to the Mountains',
        description: 'Decide not to enter and return to the foothills',
        link_to: 'mountain_foothills_approach',
      },
    ],
  },
  {
    id: 'cave_entry_passage_Q3',
    title: 'Cave - Entry Passage',
    description:
      'The passage is narrow and damp. Your footsteps echo eerily. The only light comes from your [glowing_moss_clump] or [torch], revealing walls slick with moisture and strange, pale fungi. The air grows colder.',
    backgroundColor: '#36454F',
    links: [
      {
        name: 'Press Deeper into the Cave',
        link_to: 'cave_echoing_chamber_Q3',
      },
      {
        name: 'Exit the Cave',
        link_to: 'cave_hidden_entrance_exterior',
      },
    ],
  },
  {
    id: 'cave_echoing_chamber_Q3',
    title: 'Cave - Echoing Chamber',
    description:
      'The passage opens into a vast chamber. Your voice echoes strangely. Water drips from unseen stalactites. Several tunnels lead off in different directions. You see faint glimmers of light from one of the tunnels.',
    backgroundColor: '#2F3E4A',
    actions: [
      {
        name: "Use Miner's Pickaxe on Loose Rocks (Requires Pickaxe)",
        description: 'One wall seems to have looser rocks than others.',
        condition_item: 'miners_pickaxe',
        effect: 'After some effort, you clear the rocks to reveal a small alcove containing a tattered [rope_10m]!',
      },
    ],
    links: [
      {
        name: 'Follow the Glimmering Tunnel',
        link_to: 'cave_crystal_path_Q3',
      },
      {
        name: 'Explore Dark Tunnel (West)',
        link_to: 'cave_dark_tunnel_dead_end_Q3',
      },
      {
        name: 'Explore Damp Tunnel (South - Leads to Underground River)',
        link_to: 'cave_underground_river_Q3',
      },
      {
        name: 'Return to Cave Entrance Passage',
        link_to: 'cave_entry_passage_Q3',
      },
    ],
  },
  {
    id: 'cave_crystal_path_Q3',
    title: 'Cave - Crystal Lined Path',
    description:
      'This tunnel glows with an ethereal blue light from veins of crystals embedded in the walls. The air hums with a faint energy. The path slopes gently downwards.',
    backgroundColor: '#483D8B',
    links: [
      {
        name: 'Continue Down the Crystal Path',
        link_to: 'cave_great_cavern_Q3',
      },
      {
        name: 'Go Back to Echoing Chamber',
        link_to: 'cave_echoing_chamber_Q3',
      },
    ],
  },
  {
    id: 'cave_great_cavern_Q3',
    title: 'Cave - The Great Cavern',
    description:
      'You emerge into a breathtaking cavern. Massive crystals jut from the floor and ceiling, pulsing with soft light. In the center of the cavern is a raised platform with an ancient, crystalline keystone. A deep chasm splits the far side of the cavern, too wide to jump.',
    backgroundColor: '#6A5ACD',
    actions: [
      {
        name: 'Examine the Keystone',
        description: 'Inspect the large crystal keystone on the platform.',
        effect:
          "It's covered in faint runes, similar to those on any [runed_tablet_fragment_cave] you might have found. There's a slot or depression in its surface.",
      },
      {
        name: 'Use Rope on Stalactite (Requires Rope)',
        description: 'Try to use your [rope_10m] to cross the chasm.',
        condition_item: 'rope_10m',
        effect:
          'You manage to lasso a sturdy stalactite on the other side of the chasm and secure the rope, creating a precarious bridge.',
      },
    ],
    links: [
      {
        name: 'Activate the Crystal Keystone (LOCK-IN POINT)',
        description: 'Touch or interact with the keystone, perhaps using a [glowing_crystal_shard_cave].',
        link_to: 'cave_keystone_activated_Q3',
      },
      {
        name: 'Cross the Chasm via Rope (Requires Rope)',
        description: 'Carefully make your way across the rope bridge.',
        condition_item: 'rope_10m',
        link_to: 'cave_other_side_chasm_Q3',
      },
      {
        name: 'Return via Crystal Path',
        link_to: 'cave_crystal_path_Q3',
      },
    ],
  },
  {
    id: 'cave_keystone_activated_Q3',
    title: 'Cave - Keystone Activated (Locked In)',
    description:
      'As you activate the keystone, it flares with intense light. The entire cavern hums with power. A section of the cavern wall slides open, revealing a new passage, but behind you, the crystal path back collapses with a deafening roar! There is no going back the way you came.',
    backgroundColor: '#7B68EE',
    links: [
      {
        name: 'Enter the Newly Opened Passage',
        link_to: 'cave_ancient_mechanism_room_Q3',
      },
    ],
  },
  {
    id: 'cave_ancient_mechanism_room_Q3',
    title: 'Cave - Ancient Mechanism Room',
    description:
      "This chamber houses a colossal, ancient mechanism made of interlocking crystals and stone gears. It's currently inert. Consoles with runic inscriptions and empty sockets are visible. You might need specific items like the [runed_tablet_fragment_cave] or the [lens_true_sight_cave] to understand it.",
    backgroundColor: '#8A2BE2',
    actions: [
      {
        name: 'Use Lens of True Sight (Requires Lens)',
        description: 'Peer at the mechanism and consoles through the [lens_true_sight_cave].',
        condition_item: 'lens_true_sight_cave',
        effect:
          'The lens reveals faint energy conduits and highlights specific runes. It seems you need to align or insert something to power it up.',
      },
      {
        name: 'Place Runed Tablet Fragment (Requires Tablet)',
        description: 'Try to fit the [runed_tablet_fragment_cave] into a socket.',
        condition_item: 'runed_tablet_fragment_cave',
        effect: 'The fragment fits perfectly! The mechanism hums faintly, but needs more.',
      },
    ],
    links: [
      {
        name: 'Attempt to Activate the Mechanism (Requires Tablet AND Lens solution)',
        description: "If you've figured out the sequence or placement...",
        link_to: 'cave_heartstone_chamber_Q3',
      },
      {
        name: 'Tamper with the Mechanism (Bad Ending)',
        description: 'Randomly push buttons or force parts.',
        link_to: 'game_over_cave_collapse_Q3',
      },
    ],
  },
  {
    id: 'cave_heartstone_chamber_Q3',
    title: 'Cave - The Heartstone Chamber (Win Game)',
    description:
      'The ancient mechanism groans to life, and a hidden door irises open, revealing the Heartstone Chamber. A colossal, perfectly formed crystal, the [heartstone_gem_cave], floats in the center, radiating immense power and bathing the room in a kaleidoscope of light. You feel its ancient, benign energy.',
    backgroundColor: '#9932CC',
    links: [
      {
        name: 'Commune with the Heartstone',
        description: "Reach out to the Heartstone's energy.",
        link_to: 'game_won_cave_quest',
      },
    ],
  },
  {
    id: 'game_over_cave_collapse_Q3',
    title: 'GAME OVER - Entombed',
    description:
      'Your clumsy tampering with the ancient mechanism proves disastrous. With a terrible grinding noise, the chamber begins to shake violently. Rocks fall from the ceiling, and the exit collapses. You are trapped and entombed forever in the silent dark.',
    backgroundColor: '#000000',
    links: [
      {
        name: 'Try Again?',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'game_won_amulet_quest',
    title: "VICTORY! - The Amulet's Chosen",
    description:
      'You emerged from the Temple of Sylvandell, the Amulet of Sylvandell now a part of your destiny. Its power flows through you, a beacon against the shadows of the world. Your quest is complete!',
    backgroundColor: '#FFD700',
    links: [
      {
        name: 'Start a New Adventure?',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'game_won_amulet_quest_noble',
    title: "VICTORY! - Wisdom's Reward",
    description:
      'You chose wisdom over power, leaving the Amulet undisturbed. The ancient spirits of the temple recognized your noble heart. You leave the Whispering Woods with a profound sense of peace and accomplishment. Your quest is complete!',
    backgroundColor: '#AFEEEE',
    links: [
      {
        name: 'Start a New Adventure?',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'game_won_oakhaven_quest',
    title: 'VICTORY! - Savior of Oakhaven',
    description:
      'The shadow over Oakhaven has been lifted, thanks to your bravery and detective skills. The village rejoices, and your name will be sung in local tales for years to come. Your quest is complete!',
    backgroundColor: '#90EE90',
    links: [
      {
        name: 'Start a New Adventure?',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'game_won_cave_quest',
    title: 'VICTORY! - Master of the Glimmering Caves',
    description:
      'You have reached the Heartstone and communed with the ancient magic of the Glimmering Caves. You leave with newfound understanding and a sense of wonder. The secrets of the cave are safe with you. Your quest is complete!',
    backgroundColor: '#DA70D6',
    links: [
      {
        name: 'Start a New Adventure?',
        link_to: 'forest_path_start',
      },
    ],
  },
];
