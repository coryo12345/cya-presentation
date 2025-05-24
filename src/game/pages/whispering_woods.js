import { ITEM_MAP } from '../items';
import { state } from '../state';

/** @type {import('@/game/pages').Page[]} */
export default [
  {
    id: 'forest_path_deeper_amulet',
    title: 'Deeper Forest Path',
    description:
      'The forest path becomes wilder here, ancient trees loom with twisted branches. Sunlight barely penetrates the canopy. A barely visible side trail branches off, leading towards a secluded area.',
    image: 'https://cdn.pixabay.com/photo/2017/08/06/02/08/forest-2589050_1280.jpg',
    blur: 8,
    textBackground: true,
    actions: [
      {
        name: 'Examine strange carvings on an old oak',
        description: 'Inspect the unusual markings on a massive, ancient oak.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['charcoal_stick_amulet']) &&
          !state.inventory.includes(ITEM_MAP['runic_carving_rubbing_amulet']),
        effect:
          'The carvings are ancient runes, weathered by time. Using your [charcoal_stick_amulet], you manage to make a [runic_carving_rubbing_amulet]. They seem to depict a cycle of growth, decay, and rebirth, with a central amulet symbol. You feel a faint hum of old magic.',
      },
      {
        name: 'Examine strange carvings on an old oak (No Charcoal)',
        description: 'Inspect the unusual markings on a massive, ancient oak.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['charcoal_stick_amulet']) &&
          !state.inventory.includes(ITEM_MAP['runic_carving_rubbing_amulet']),
        effect:
          'The carvings are ancient runes, weathered by time. They seem to depict a cycle of growth, decay, and rebirth, with a central amulet symbol. You feel a faint hum of old magic, but you have no way to copy them.',
      },
    ],
    links: [
      {
        name: "Follow the side trail (to Hermit's Clearing)",
        description: 'The trail is narrow and overgrown.',
        link_to: 'hermits_clearing_approach_amulet',
      },
      {
        name: 'Continue deeper into the woods (Whispering Woods Edge)',
        description: 'The main path continues into even darker woods.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']) ||
          state.inventory.includes(ITEM_MAP['hermits_guidance_amulet']),
        link_to: 'whispering_woods_edge_amulet',
      },
      {
        name: 'Search for useful items',
        description: 'Look around for anything that might be helpful.',
        link_to: 'forest_path_deeper_search_amulet',
      },
      {
        name: 'Return to Forest Path Start',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'forest_path_deeper_search_amulet',
    title: 'Searching the Deeper Forest',
    description: 'You spend some time searching the undergrowth and hollows of old trees.',
    image: 'https://cdn.pixabay.com/photo/2017/08/06/02/08/forest-2589050_1280.jpg',
    actions: [
      {
        name: 'Search carefully',
        description: 'Take your time looking for anything of value or use.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['charcoal_stick_amulet']) &&
          !state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        action: () => {
          if (Math.random() < 0.4) {
            state.addItem(ITEM_MAP['charcoal_stick_amulet']);
            state.openDialog(
              'Found Something!',
              'Tucked into a hollow log, you find a forgotten [charcoal_stick_amulet].',
            );
          } else if (Math.random() < 0.7) {
            state.addItem(ITEM_MAP['old_map_fragment_amulet']);
            state.openDialog('A Discovery!', 'Caught on a thorny bush, you find a tattered [old_map_fragment_amulet]!');
          } else {
            state.openDialog(
              'Nothing Found',
              'Despite your efforts, you find nothing of interest here, just damp leaves and rocks.',
            );
          }
        },
      },
      {
        name: 'Search (Already found items)',
        description: 'Look around again.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['charcoal_stick_amulet']) ||
          state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        effect: "You've already searched this area thoroughly and found what you could.",
      },
    ],
    links: [
      {
        name: 'Stop searching and return',
        link_to: 'forest_path_deeper_amulet',
      },
    ],
  },
  {
    id: 'hermits_clearing_approach_amulet',
    title: "Hermit's Clearing Approach",
    description:
      'A small, unnaturally quiet clearing. A humble, moss-covered hut sits in the center, a thin wisp of smoke rising from its chimney. Strange, small bone chimes tinkle faintly in the breeze.',
    image: 'https://cdn.pixabay.com/photo/2016/11/18/17/42/barbecue-1836053_1280.jpg',
    blur: 5,
    textBackground: true,
    links: [
      {
        name: "Approach the Hermit's Hut",
        link_to: 'hermits_hut_amulet',
      },
      {
        name: 'Leave the clearing',
        link_to: 'forest_path_deeper_amulet',
      },
    ],
  },
  {
    id: 'hermits_hut_amulet',
    title: "Hermit's Hut",
    description:
      "An old hermit with eyes that seem to see through you peers from the doorway. He's wrapped in simple, patched robes. 'Few disturb my solitude. Why have you come?'",
    image: 'https://cdn.pixabay.com/photo/2017/08/18/00/18/fantasy-2653575_1280.jpg',
    blur: 3,
    textBackground: true,
    actions: [
      {
        name: 'Ask about the Whispering Woods/Amulet',
        description: 'Inquire about the local legends.',
        effect:
          "The Hermit sighs, a sound like rustling leaves. 'The Amulet of Sylvandell... a thing of great power and greater peril. It lies guarded in the heart of the Whispering Woods, a place that tests the spirit. Many seek it, few are worthy. What is your true intent with such an artifact?'",
      },
      {
        name: 'Offer [copper_coin] for information',
        description: 'Try to buy some knowledge.',
        condition: () => state.inventory.includes(ITEM_MAP['copper_coin']),
        action: () => {
          state.removeItem(ITEM_MAP['copper_coin']);
          state.openDialog(
            'Coin Offered',
            "The Hermit scoffs, a dry chuckle. 'My deepest knowledge is not for common trade, traveler. Though your coin is noted.' He doesn't offer any information for it.",
          );
          return true;
        },
      },
      {
        name: 'Show [runic_carving_rubbing_amulet]',
        description: 'Present the rubbing of the runes.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['runic_carving_rubbing_amulet']) &&
          !state.inventory.includes(ITEM_MAP['warding_stone_amulet']),
        action: () => {
          state.addItem(ITEM_MAP['warding_stone_amulet']);
          state.addItem(ITEM_MAP['hermits_guidance_amulet']);
          state.openDialog(
            'Rubbing Shown',
            "The Hermit studies the rubbing intently. 'You have a keen eye and a patient hand. These runes speak of the Woods' old magic, of its heart. Perhaps you are not entirely witless.' He reaches into his hut and produces a small, smooth [warding_stone_amulet]. 'This may help shield you against the Woods' deceptions, should you venture there. The entrance lies deeper in, where the shadows lie thickest and the air itself whispers lies.'",
          );
          return true;
        },
      },
      {
        name: 'Ask if he needs anything',
        description: 'Offer your assistance.',
        condition: () => !state.inventory.includes(ITEM_MAP['hermit_needs_moonpetal_amulet']),
        action: () => {
          state.addItem(ITEM_MAP['hermit_needs_moonpetal_amulet']);
          state.openDialog(
            'An Offer of Help',
            "The Hermit looks thoughtful, stroking his long beard. 'There is a rare herb, Moonpetal, that only grows in the deepest, most shadowed parts of the Whispering Woods. My old bones are not what they were. If you happen upon it and bring it safely to me, I might have something more substantial to offer you in return for your trouble.'",
          );
          return true;
        },
      },
      {
        name: 'Give [moonpetal_herb_amulet] to the Hermit',
        description: 'Present the rare herb.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['moonpetal_herb_amulet']) &&
          state.inventory.includes(ITEM_MAP['hermit_needs_moonpetal_amulet']),
        action: () => {
          state.removeItem(ITEM_MAP['moonpetal_herb_amulet']);
          state.removeItem(ITEM_MAP['hermit_needs_moonpetal_amulet']);
          // Potentially give another item or crucial clue here.
          // For now, let's give another warding stone, or enhance the existing one.
          // Or, if player doesn't have a map, give the map fragment.
          if (!state.inventory.includes(ITEM_MAP['old_map_fragment_amulet'])) {
            state.addItem(ITEM_MAP['old_map_fragment_amulet']);
            state.openDialog(
              'Moonpetal Delivered',
              "The Hermit's eyes light up. 'Ah, the Moonpetal! Excellent work, child.' He takes the herb reverently. 'For your service, take this. It may guide your steps.' He hands you an [old_map_fragment_amulet] that seems to depict the Whispering Woods.",
            );
          } else {
            state.openDialog(
              'Moonpetal Delivered',
              "The Hermit's eyes light up. 'Ah, the Moonpetal! Excellent work, child.' He takes the herb reverently. 'You have my thanks. May your path be clear.' He offers no further item but seems more kindly disposed.",
            );
          }
          return true;
        },
      },
    ],
    links: [
      {
        name: 'Leave the Hermit',
        link_to: 'hermits_clearing_approach_amulet',
      },
    ],
  },
  {
    id: 'hunter_camp_approach',
    description:
      'You follow the footprints into the forest. You find a campsite with what looks like the ruins of a campfire',
    image: 'https://cdn.pixabay.com/photo/2020/11/09/15/12/trail-5726987_1280.jpg',
    blur: 6,
    textBackground: true,
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
    image: '/img/hunter_camp.png',
    textBackground: true,
    blur: 6,
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
    id: 'whispering_woods_edge_amulet',
    title: 'Edge of the Whispering Woods',
    description:
      'The air grows cold and heavy. Ancient, gnarled trees press close, their branches intertwining like skeletal fingers. A faint, unsettling whispering seems to emanate from the woods themselves, a chorus of indecipherable voices. This is the threshold of the dreaded Whispering Woods.',
    image: 'https://cdn.pixabay.com/photo/2016/11/08/05/09/forest-1807524_1280.jpg',
    blur: 6,
    textBackground: true,
    actions: [
      {
        name: 'Listen to the Whispers',
        description: 'Try to make sense of the eerie sounds.',
        action: () => {
          let effectText =
            "You hear faint, sibilant voices on the wind – promises of power, warnings of unseen dangers, illusions of lost loved ones calling your name. It's a disorienting cacophony, hard to tell what's real and what's a trick of the woods.";
          if (state.inventory.includes(ITEM_MAP['warding_stone_amulet'])) {
            effectText +=
              '\n\nThe [warding_stone_amulet] in your pocket hums faintly, a steadying presence, and the whispers seem less able to cloud your thoughts.';
          }
          state.openDialog('The Whispers', effectText);
        },
      },
      {
        name: 'Consult [old_map_fragment_amulet]',
        description: 'Check the map for guidance.',
        condition: () => state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        effect:
          "The map fragment shows a winding path leading into the dark woods. It also bears hastily scrawled notes: 'Paths shift!', 'Don't trust your eyes!', 'The shrine lies beyond the silent statues...'",
      },
    ],
    links: [
      {
        name: 'Enter the Whispering Woods',
        description: 'Steel your nerves and step onto the path.',
        link_to: 'whispering_woods_path_a_amulet',
      },
      {
        name: 'Turn back to the deeper forest',
        link_to: 'forest_path_deeper_amulet',
      },
    ],
  },
  {
    id: 'whispering_woods_path_a_amulet',
    title: 'Whispering Woods - Twisting Path',
    description:
      'The path is barely discernible, covered in centuries of fallen leaves. Shadows dance in your peripheral vision, and the whispers are louder here, coiling around you. You feel a profound sense of being watched, of unseen things just beyond your sight.',
    image: 'https://cdn.pixabay.com/photo/2015/09/09/20/17/forest-932404_1280.jpg',
    blur: 7,
    textBackground: true,
    actions: [
      {
        name: 'Use [warding_stone_amulet] to find the true path',
        description: "Focus on the stone's guidance.",
        condition: () => state.inventory.includes(ITEM_MAP['warding_stone_amulet']),
        effect:
          'Holding the stone, you feel a subtle pull towards what seems like a more solid, less deceptive direction. The illusions in your periphery seem to part slightly, revealing a faintly more worn trail.',
      },
      {
        name: 'Search for Moonpetal Herb',
        description: 'Look for the rare herb the Hermit mentioned.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['hermit_needs_moonpetal_amulet']) &&
          !state.inventory.includes(ITEM_MAP['moonpetal_herb_amulet']),
        effect:
          'After some careful searching in a particularly shadowed and damp grove, nearly hidden beneath a mossy log, you find a single, luminescent [moonpetal_herb_amulet]! Its silvery glow is strangely beautiful in the oppressive gloom.',
      },
    ],
    links: [
      {
        name: 'Follow the path that feels right (Illusionary Path)',
        description: 'Trust your instincts, despite the unsettling atmosphere.',
        condition: () => !state.inventory.includes(ITEM_MAP['warding_stone_amulet']),
        link_to: 'whispering_woods_illusion_trap_amulet',
      },
      {
        name: 'Follow the path indicated by guidance',
        description: 'Trust your map or the Warding Stone.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['warding_stone_amulet']) ||
          state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        link_to: 'whispering_woods_path_b_amulet',
      },
      {
        name: 'Try to bash through the undergrowth (Risky)',
        description: 'Attempt to forge your own path.',
        link_to: 'whispering_woods_lost_amulet',
      },
      {
        name: 'Leave the Whispering Woods',
        link_to: 'whispering_woods_edge_amulet',
      },
    ],
  },
  {
    id: 'whispering_woods_illusion_trap_amulet',
    title: 'Illusory Glade',
    description:
      'The path unexpectedly leads you into a beautiful, sunlit glade. A sparkling fountain bubbles merrily in the center, and colorful birds sing from blossom-laden trees. It feels peaceful, a stark contrast to the oppressive woods. Yet, a tiny, nagging doubt remains. The whispers are very soft here, almost comfortingly sweet.',
    image: 'https://cdn.pixabay.com/photo/2018/02/16/10/41/fantasy-3157480_1280.jpg',
    blur: 2,
    textBackground: true,
    actions: [
      {
        name: 'Drink from the fountain',
        description: 'The water looks incredibly pure and inviting.',
        action: () => {
          state.goTo('ending_eternal_slumber_amulet');
        },
      },
      {
        name: 'Examine the glade closely',
        description: 'Scrutinize your surroundings for anything amiss.',
        effect:
          "You force yourself to focus past the beauty. You notice the sunlight isn't casting proper shadows from the trees, and the birdsong seems to be on a subtle loop, repeating the same melody. The perfection is flawed. This place is a cunning illusion!",
      },
    ],
    links: [
      {
        name: 'Rest by the fountain for a while',
        description: 'It seems like a perfect place to recover your strength.',
        link_to: 'ending_eternal_slumber_amulet',
      },
      {
        name: 'Resist the illusion and try to find the true path',
        description: 'Focus your will and look for an exit.',
        condition: () => state.inventory.includes(ITEM_MAP['warding_stone_amulet']), // Or after the "Examine" action reveals it. For simplicity, linking to stone.
        link_to: 'whispering_woods_path_b_amulet',
      },
      {
        name: 'Flee the glade in panic',
        description: 'This place feels wrong!',
        link_to: 'whispering_woods_path_a_amulet',
      },
    ],
  },
  {
    id: 'whispering_woods_path_b_amulet',
    title: 'Whispering Woods - Silent Statues',
    description:
      'The woods grow denser and more ancient. You pass rows of moss-covered statues depicting forgotten guardians, their stone faces weathered and sorrowful. The whispers have faded here, replaced by an expectant silence. Through the trees, you glimpse the crumbling silhouette of a ruin.',
    image: 'https://cdn.pixabay.com/photo/2017/07/24/02/41/project-2533466_1280.jpg',
    blur: 5,
    textBackground: true,
    links: [
      {
        name: 'Approach the Ruined Shrine',
        description: 'Head towards the visible structure.',
        link_to: 'ruined_shrine_exterior_amulet',
      },
      {
        name: 'Explore a side path marked by a dying, lightning-struck tree',
        description: 'A narrow, almost hidden path veers off here.',
        link_to: 'guardian_grove_amulet',
      },
      {
        name: 'Turn back along the path',
        link_to: 'whispering_woods_path_a_amulet',
      },
    ],
  },
  {
    id: 'guardian_grove_amulet',
    title: "Guardian's Grove",
    description:
      "This secluded grove feels ancient and sorrowful, bathed in a dim, ethereal light. A spectral guardian, more mist and moonlight than solid form, coalesces before you. Its voice is like the rustling of dry leaves: 'Why do you disturb this sacred place, mortal? Few find their way here.'",
    image: 'https://cdn.pixabay.com/photo/2019/10/06/07/11/fantasy-4529514_1280.jpg',
    blur: 4,
    textBackground: true,
    actions: [
      {
        name: 'State you seek the Amulet of Sylvandell',
        description: 'Be direct about your quest.',
        effect:
          "The Guardian sighs, a sound like wind through tombstones. 'Another treasure hunter, blinded by tales of power. The Amulet is a burden, a responsibility, not merely a prize. Prove your spirit is not consumed by greed or folly.'",
      },
      {
        name: 'Offer [warding_stone_amulet] as a sign of respect',
        description: 'Show the stone given by the Hermit.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['warding_stone_amulet']) &&
          !state.inventory.includes(ITEM_MAP['guardian_test_passed_amulet']),
        action: () => {
          state.addItem(ITEM_MAP['guardian_test_passed_amulet']);
          state.openDialog(
            'Stone Offered',
            "The Guardian's misty form shimmers as it regards the stone. 'A gift from the old one... who still remembers the true ways. You show some measure of wisdom by heeding his counsel.' The Guardian seems slightly less hostile, more contemplative.",
          );
          return true;
        },
      },
      {
        name: 'Draw [silver_dagger_inscribed]',
        description: 'Prepare for a confrontation.',
        condition: () => state.inventory.includes(ITEM_MAP['silver_dagger_inscribed']),
        effect:
          "The Guardian recoils slightly, its form flickering. 'That blade... it carries the scent of true silver and ancient rites, a tool against shadows and corruption, not spirits of the wood bound to their duty. Such aggression is unwelcome here. Put it away, or face the consequences.'",
      },
    ],
    links: [
      {
        name: 'Attempt to fight the Guardian',
        description: 'Challenge the spectral entity.',
        link_to: 'ending_spirit_wrath_amulet',
      },
      {
        name: 'Ask if it will test you (Answer its riddle)',
        description: 'Seek a peaceful resolution.',
        condition: () => state.inventory.includes(ITEM_MAP['guardian_test_passed_amulet']),
        link_to: 'guardian_riddle_amulet',
      },
      {
        name: 'Apologize and leave the Grove',
        description: 'Retreat from the sacred place.',
        link_to: 'whispering_woods_path_b_amulet',
      },
    ],
  },
  {
    id: 'guardian_riddle_amulet',
    title: "The Guardian's Riddle",
    description:
      "The Spectral Guardian inclines its misty head. 'Very well. If you seek passage or boon, answer this: \n\nI have cities, but no houses.\nI have mountains, but no trees.\nI have water, but no fish.\n\nWhat am I?'",
    image: 'https://cdn.pixabay.com/photo/2019/10/06/07/11/fantasy-4529514_1280.jpg',
    textBackground: true,
    actions: [
      {
        name: 'Answer: A Map',
        description: "Offer 'A Map' as the solution.",
        action: () => {
          state.addItem(ITEM_MAP['ancient_symposium_key_amulet']);
          state.openDialog(
            'Riddle Solved',
            "The Guardian nods slowly, a shimmer of approval in its form. 'You are perceptive. The Amulet requires understanding, not just strength or desire.' It gestures towards a hidden alcove in an ancient tree root. 'Take this. It may open the way.' Inside the alcove, you find an [ancient_symposium_key_amulet].",
          );
        },
      },
      {
        name: 'Answer: A Dream',
        description: "Offer 'A Dream' as the solution.",
        effect:
          "The Guardian remains still. 'A compelling thought, but dreams are fleeting, and what I speak of endures. That is not the truth I seek.'",
      },
      {
        name: 'Answer: The Sky',
        description: "Offer 'The Sky' as the solution.",
        effect:
          "The Guardian seems to sigh. 'The sky holds many wonders, but it does not fit all parts of my words. Try again, if you wish, or depart.'",
      },
    ],
    links: [
      {
        name: 'Return to the main path',
        link_to: 'whispering_woods_path_b_amulet',
      },
    ],
  },
  {
    id: 'ruined_shrine_exterior_amulet',
    title: 'Ruined Shrine Entrance',
    description:
      'Before you stands a crumbling stone shrine, half-swallowed by the encroaching forest. Roots like serpents crawl over its weathered stones. A heavy stone door, sealed shut by thick, unnaturally resilient vines and ancient protective magic, blocks the only visible entrance. A curious, complex keyhole is set into the door.',
    image: 'https://cdn.pixabay.com/photo/2017/09/11/13/39/fantasy-2738947_1280.jpg',
    blur: 4,
    textBackground: true,
    actions: [
      {
        name: 'Examine the door closely',
        description: 'Inspect the seal and keyhole.',
        effect:
          'The magic warding the door feels incredibly old and potent, designed to repel the unworthy. The vines are as tough as iron cables. The keyhole is intricate, clearly requiring a specific, uniquely shaped key.',
      },
      {
        name: 'Try to force the door',
        description: 'Put your shoulder into it.',
        effect:
          "The door doesn't budge even a fraction of an inch. You hear a faint, dry chuckle from the depths of the woods, as if mocking your efforts.",
      },
      {
        name: 'Use [silver_dagger_inscribed] on the enchanted vines',
        description: 'Attempt to cut through the magical barrier.',
        condition: () => state.inventory.includes(ITEM_MAP['silver_dagger_inscribed']),
        effect:
          "The silver blade of the dagger flares with a faint light as it touches the enchanted vines. They recoil and hiss, then part with surprising ease, slithering away from the dagger's touch! The way to the keyhole is now clear.",
      },
    ],
    links: [
      {
        name: 'Use [ancient_symposium_key_amulet] on the door',
        description: 'Try the ornate key in the lock.',
        condition: () => state.inventory.includes(ITEM_MAP['ancient_symposium_key_amulet']), // Assuming vines cleared by dagger action
        link_to: 'shrine_inner_sanctum_amulet',
      },
      {
        name: "Search around the shrine's perimeter",
        description: 'Look for another way in or any overlooked details.',
        link_to: 'shrine_collapsed_wall_amulet',
      },
      {
        name: 'Leave the Shrine area',
        link_to: 'whispering_woods_path_b_amulet',
      },
    ],
  },
  {
    id: 'shrine_collapsed_wall_amulet',
    title: 'Shrine - Collapsed Wall',
    description:
      "You circle the shrine and find a section where the ancient stonework has partially collapsed, creating a small opening choked with rubble. It's far too small to squeeze through, but you can see a tiny glint of something metallic just within reach among the debris.",
    image: 'https://cdn.pixabay.com/photo/2016/03/27/23/00/ruins-1284619_1280.jpg',
    blur: 3,
    textBackground: true,
    actions: [
      {
        name: 'Carefully reach through the rubble',
        description: 'Try to retrieve the glinting object.',
        condition: () => !state.inventory.includes(ITEM_MAP['silver_locket_lost_amulet']),
        effect:
          "After some careful maneuvering to avoid dislodging more stones, your fingers close around a small, cool object. You pull out a [silver_locket_lost_amulet]. It's tarnished with age and stubbornly closed, but feels strangely significant.",
      },
    ],
    links: [
      {
        name: 'Return to the Shrine entrance',
        link_to: 'ruined_shrine_exterior_amulet',
      },
    ],
  },
  {
    id: 'shrine_inner_sanctum_amulet',
    title: 'Shrine - Inner Sanctum',
    description:
      'The air inside the sanctum is still, heavy with the scent of dust, dried herbs, and forgotten magic. Faded tapestries cling to the walls. On a weathered stone pedestal in the center of the circular room, rests the Amulet of Sylvandell. It emits a soft, pulsing light, cycling through hues of green, gold, and deep umber. Three distinct carvings adorn the sides of the pedestal: a tiny, sprouting Seed; a fully bloomed Flower; and a fragile, Withered Leaf.',
    image: 'https://cdn.pixabay.com/photo/2020/07/21/00/39/altar-5424864_1280.jpg',
    textBackground: true,
    actions: [
      {
        name: 'Examine the Seed carving',
        description: 'Focus on the symbol of beginnings.',
        effect:
          'This intricate carving depicts a tiny seed, just beginning to sprout, tendrils reaching out. It radiates an aura of immense potential, raw untamed nature, and the promise of new beginnings.',
      },
      {
        name: 'Examine the Flower carving',
        description: 'Focus on the symbol of bloom.',
        effect:
          'This carving shows a perfectly formed flower in full bloom, its petals unfurled to the sun. It evokes feelings of growth, vibrant life, beauty, healing, and harmonious balance.',
      },
      {
        name: 'Examine the Withered Leaf carving',
        description: 'Focus on the symbol of cycles.',
        effect:
          'This carving portrays a delicate, withered leaf, curled at the edges, about to return to the earth. It speaks of endings, the acceptance of natural cycles, the wisdom gleaned from decay, and the quiet dignity of release.',
      },
    ],
    links: [
      {
        name: "Take the Amulet (Focusing on the Seed's Power)",
        description: 'Claim the Amulet, embracing its connection to primal creation.',
        link_to: 'amulet_taken_seed_ending_amulet',
      },
      {
        name: "Take the Amulet (Focusing on the Flower's Grace)",
        description: 'Claim the Amulet, embracing its connection to life and healing.',
        link_to: 'amulet_taken_flower_ending_amulet',
      },
      {
        name: "Take the Amulet (Focusing on the Leaf's Wisdom)",
        description: 'Claim the Amulet, embracing its connection to cycles and knowledge.',
        link_to: 'amulet_taken_leaf_ending_amulet',
      },
      {
        name: 'Attempt to destroy the Amulet with [silver_dagger_inscribed]',
        description: 'Use the enchanted dagger against the artifact.',
        condition: () => state.inventory.includes(ITEM_MAP['silver_dagger_inscribed']),
        onLink: () => state.saveCheckpoint(),
        link_to: 'amulet_destroyed_ending_amulet',
      },
      {
        name: 'Leave the Amulet untouched and depart',
        description: 'Some things are best left to the ages.',
        onLink: () => state.saveCheckpoint(),
        link_to: 'amulet_left_alone_ending_amulet',
      },
    ],
  },
  {
    id: 'ending_eternal_slumber_amulet',
    title: 'Ending: Eternal Slumber',
    description:
      "You drink deeply from the fountain. The water is sweeter than anything you've ever tasted, and an irresistible drowsiness washes over you. You lie down in the soft grass of the sunlit glade, falling into a deep, enchanted sleep, lost to the world forever. The Whispering Woods claims another soul, cradled in its most beautiful illusion.",
    backgroundColor: '#1A2430',
    links: [{ name: 'Game Over - Lost in Dreams', onLink: () => state.restart(), link_to: 'tutorial' }],
  },
  {
    id: 'ending_spirit_wrath_amulet',
    title: "Ending: Spirit's Wrath",
    description:
      'You foolishly attempt to strike the Spectral Guardian. Its misty form flares with an incandescent, cold rage. Ethereal tendrils, sharp as obsidian, lash out from its being, and your life force is drained away in an instant. Your aggression has earned you a permanent, silent place among the sorrowful watchers of the Whispering Woods.',
    backgroundColor: '#1A2430',
    links: [{ name: 'Game Over - Judged Unworthy', onLink: () => state.restart(), link_to: 'tutorial' }],
  },
  {
    id: 'amulet_taken_seed_ending_amulet',
    title: 'Ending: The Untamed Heart',
    description:
      "As your fingers close around the Amulet, focusing on the Seed's raw potential, a surge of untamed natural energy flows into you. You feel an exhilarating connection to the primal forces of the world, the ceaseless drive of growth and wild creation. The woods outside the shrine seem to respond, growing wilder, more vibrant, almost sentient. You leave the shrine, carrying a piece of the world's ancient, untamed heart. You now possess the [amulet_of_the_seed_amulet]. Its future, and yours, is uncertain but potent.",
    backgroundColor: '#228B22',
    actions: [{ name: 'Gained Item', effect: 'You now possess the [amulet_of_the_seed_amulet].' }],
    links: [{ name: 'A New Path Begins', onLink: () => state.restart(), link_to: 'tutorial' }],
  },
  {
    id: 'amulet_taken_flower_ending_amulet',
    title: 'Ending: The Healing Bloom',
    description:
      "You reach for the Amulet, your thoughts aligned with the Flower's gentle grace. A warm, healing light envelops you, soothing old aches and calming your spirit. You feel a profound sense of peace and balance, a connection to all living things. The Whispering Woods seems to sigh in relief, its oppressive atmosphere lifting slightly, allowing true sunlight to filter through. You carry with you the power to mend and restore. You now possess the [amulet_of_the_flower_amulet].",
    backgroundColor: '#FFB6C1',
    actions: [{ name: 'Gained Item', effect: 'You now possess the [amulet_of_the_flower_amulet].' }],
    links: [{ name: 'A New Path Begins', onLink: () => state.restart(), link_to: 'tutorial' }],
  },
  {
    id: 'amulet_taken_leaf_ending_amulet',
    title: "Ending: The Sage's Insight",
    description:
      'Focusing on the Withered Leaf, you accept the Amulet. Visions of past ages and echoes of futures yet to come flood your mind. You gain a profound, sometimes sorrowful, understanding of the great cycles of life, death, and rebirth. The weight of this knowledge is immense, yet it brings a unique clarity. The Whispering Woods itself seems to acknowledge your insight. You now possess the [amulet_of_the_leaf_amulet].',
    backgroundColor: '#D2B48C',
    actions: [{ name: 'Gained Item', effect: 'You now possess the [amulet_of_the_leaf_amulet].' }],
    links: [{ name: 'A New Path Begins', onLink: () => state.restart(), link_to: 'tutorial' }],
  },
  {
    id: 'amulet_destroyed_ending_amulet',
    title: 'Ending: The Shattered Balance',
    description:
      'With grim determination, you strike the Amulet of Sylvandell with the [silver_dagger_inscribed]. There is a deafening crack, a flash of blinding, multicolored light, and a shockwave that ripples through the shrine, shaking the very foundations of the Whispering Woods. The Amulet shatters into a thousand glittering, inert fragments, its ancient magic violently dispersed. The Woods groan as if in pain, and its ancient enchantments begin to unravel, the consequences unforeseen. You have broken a powerful artifact; its energy now seeps into the land unpredictably.',
    backgroundColor: '#404040',
    links: [
      { name: 'Restart from checkpoint', onLink: () => state.loadCheckpoint(), link_to: 'forest_path_start' },
      { name: 'A New Path Begins (Game Over)', onLink: () => state.restart(), link_to: 'tutorial' },
    ],
  },
  {
    id: 'amulet_left_alone_ending_amulet',
    title: 'Ending: The Path of Wisdom',
    description:
      'You contemplate the Amulet and its potent magic, then decide that some powers are best left undisturbed, some mysteries best preserved. Showing deep respect for the ancient forces at play, you leave the Amulet of Sylvandell resting on its pedestal. As you exit the shrine, you feel a subtle sense of approval from the Whispering Woods itself. The oppressive atmosphere seems to lessen, and the path out is strangely clear. You carry with you the quiet satisfaction of a difficult, wise choice.',
    backgroundColor: '#B0E0E6',
    links: [
      { name: 'Restart from checkpoint', onLink: () => state.loadCheckpoint(), link_to: 'forest_path_start' },
      { name: 'A New Path Begins (Game Over)', onLink: () => state.restart(), link_to: 'tutorial' },
    ],
  },
  {
    id: 'whispering_woods_lost_amulet',
    title: 'Lost in the Woods',
    description:
      'Your attempt to forge your own path leads you deep into a disorienting, trackless part of the Whispering Woods. The whispers mock you, twisting familiar sounds into threats. After what feels like an eternity of stumbling in circles, you find yourself spat out at the edge of the woods, exhausted, disoriented, and no closer to your goal.',
    backgroundColor: '#3A3A3A',
    links: [
      {
        name: 'Return to the Whispering Woods Edge',
        link_to: 'whispering_woods_edge_amulet',
      },
      {
        name: 'Give up and return to the Deeper Forest Path',
        link_to: 'forest_path_deeper_amulet',
      },
    ],
  },
];
