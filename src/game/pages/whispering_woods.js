import { ITEM_MAP } from '../items';
import { state } from '../state';

/** @type {import('@/game/pages').Page[]} */
export default [
  {
    id: 'forest_path_deeper_amulet',
    title: 'Deeper Forest Path',
    description:
      'The forest path becomes wilder here, ancient trees loom with twisted branches. Sunlight barely penetrates the canopy. A barely visible side trail branches off, leading towards a secluded area.',
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
      // if the player doesn't have charcoal
      {
        name: 'Examine strange carvings on an old oak',
        description: 'Inspect the unusual markings on a massive, ancient oak.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['charcoal_stick_amulet']) &&
          !state.inventory.includes(ITEM_MAP['runic_carving_rubbing_amulet']),
        action: () => {
          state.openDialog(
            'Examine the carvings',
            'The carvings are ancient runes, weathered by time. They seem to depict a cycle of growth, decay, and rebirth, with a central amulet symbol. You feel a faint hum of old magic, but you have no way to copy them.',
          );
          return false;
        },
      },
      {
        name: 'Look around',
        description: 'Take your time looking for anything of value or use.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['charcoal_stick_amulet']) &&
          !state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        action: () => {
          if (Math.random() < 0.5) {
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
        name: 'Search More',
        description: 'Look around again.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['charcoal_stick_amulet']) ||
          state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        effect: "You've already searched this area thoroughly and found what you could.",
      },
    ],
    links: [
      {
        name: 'Follow the side trail',
        description: 'The trail is narrow and overgrown.',
        link_to: 'hermits_clearing_approach_amulet',
      },
      {
        name: 'Follow the map',
        description: 'Follow the map deeper into the woods.',
        condition: () => state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        link_to: 'whispering_woods_edge_amulet',
      },
      {
        name: "Follow the hermit's guidance",
        description: "Follow the hermit's guidance deeper into the woods.",
        condition: () =>
          state.inventory.includes(ITEM_MAP['hermits_guidance_amulet']) &&
          !state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        link_to: 'whispering_woods_edge_amulet',
      },
      {
        name: 'Return to Forest Path Start',
        link_to: 'forest_path_start',
      },
    ],
  },
  {
    id: 'hermits_clearing_approach_amulet',
    title: 'A Small Clearing',
    description:
      'A small, unnaturally quiet clearing. A humble, moss-covered hut sits in the center, a thin wisp of smoke rising from its chimney. Strange, small bone chimes tinkle faintly in the breeze.',
    blur: 5,
    textBackground: true,
    links: [
      {
        name: 'Approach the Hut',
        description: 'Enter the hut.',
        link_to: 'hermits_hut_amulet',
      },
      {
        name: 'Leave the clearing',
        description: 'Return to the forest path.',
        link_to: 'forest_path_deeper_amulet',
      },
    ],
  },
  {
    id: 'hermits_hut_amulet',
    title: "Hermit's Hut",
    description:
      "An old hermit with eyes that seem to see through you peers from the doorway. He's wrapped in simple, patched robes. 'Few disturb my solitude. Why have you come?'",
    blur: 3,
    textBackground: true,
    actions: [
      {
        name: 'Ask what brings him out here',
        description: 'Inquire about his presence in these woods.',
        condition: () => !state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']),
        action: () => {
          state.openDialog(
            'The Hermit',
            "The Hermit's eyes take on a distant look. 'These woods... they speak to those who listen. Ancient magics stir beneath the soil, secrets whisper on the wind. But what I truly seek lies deeper still - the legendary Amulet of Sylvandell.' He leans forward intently. 'Bring me this artifact, and I shall grant you one wish within my power. But beware... the woods test all who enter, and not all tests are what they seem.'",
          );
          return false;
        },
      },
      {
        name: 'Offer [copper_coin] for information',
        description: 'Try to buy some knowledge.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['copper_coin']) &&
          !state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']),
        action: () => {
          state.removeItem(ITEM_MAP['copper_coin']);
          state.openDialog(
            'Coin Offered',
            "The Hermit scoffs, a dry chuckle. 'My deepest knowledge is not for common trade, traveler. Though your coin is noted.' He doesn't offer any information for it.",
          );
        },
      },
      {
        name: 'Show [runic_carving_rubbing_amulet]',
        description: 'Present the rubbing of the runes.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['runic_carving_rubbing_amulet']) &&
          !state.inventory.includes(ITEM_MAP['warding_stone_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']),
        action: () => {
          state.addItem(ITEM_MAP['warding_stone_amulet']);
          state.addItem(ITEM_MAP['hermits_guidance_amulet']);
          state.openDialog(
            'Rubbing Shown',
            "The Hermit studies the rubbing intently. 'You have a keen eye and a patient hand. These runes speak of the Woods' old magic, of its heart. Perhaps you are not entirely witless.' He reaches into his hut and produces a small, smooth [warding_stone_amulet]. 'This may help shield you against the Woods' deceptions, should you venture there. The entrance lies deeper in, where the shadows lie thickest and the air itself whispers lies.'",
          );
        },
      },
      {
        name: 'Ask if he needs anything',
        description: 'Offer your assistance.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['hermit_needs_moonpetal_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']),
        action: () => {
          state.addItem(ITEM_MAP['hermit_needs_moonpetal_amulet']);
          state.openDialog(
            'An Offer of Help',
            "The Hermit looks thoughtful, stroking his long beard. 'There is a rare herb, Moonpetal, that only grows in the deepest, most shadowed parts of the Whispering Woods. My old bones are not what they were. If you happen upon it and bring it safely to me, I might have something more substantial to offer you in return for your trouble.'",
          );
        },
      },
      {
        name: 'Give [moonpetal_herb_amulet] to the Hermit',
        description: 'Present the rare herb.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['moonpetal_herb_amulet']) &&
          state.inventory.includes(ITEM_MAP['hermit_needs_moonpetal_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']),
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
        },
      },
      {
        name: 'Give [amulet_sylvandell_spring_amulet] to the Hermit',
        description: 'Present the Amulet of Sylvandell.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['amulet_sylvandell_spring_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']),
        action: () => {
          state.openDialog(
            '',
            // TODO update this text
            "The Hermit's eyes widen as you present the Amulet of Sylvandell. The moment his trembling fingers touch it, an extraordinary transformation begins. His hunched posture straightens, the wrinkles on his face smooth away, and his grey hair darkens to a rich brown. His skin takes on a healthy, almost luminous glow. Where moments ago stood a frail old man, now stands a figure of vitality and strength. 'By the ancient powers!' he exclaims in a clear, strong voice, flexing his rejuvenated hands. 'You have restored me, traveler. This artifact's power... it's everything I hoped for and more.'\n\nHe turns to you with bright, keen eyes. 'For this incredible gift, I offer you a wish in return. What would you have of me, now that my power is restored?'",
          );
          state.addItem(ITEM_MAP['hidden_gave_hermit_amulet']);
        },
      },
      {
        name: 'Give [amulet_sylvandell_autumn_amulet] to the Hermit',
        description: 'Present the Amulet of Sylvandell.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['amulet_sylvandell_autumn_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']),
        action: () => {
          state.saveCheckpoint();
          state.goTo('ending_hermit_receives_autumn_amulet');
        },
      },
      // wishes here
      {
        name: 'Wish for a [copper_coin]',
        description: 'A small wish',
        condition: () =>
          state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_hermit_wish_granted']),
        action: () => {
          state.openDialog(
            'Wish Granted',
            "He gives you a quizical look. 'You're not a very good wishmaker, are you? But I certainly can grant that.' He hands you a [copper_coin].",
          );
          state.addItem(ITEM_MAP['hidden_hermit_wish_granted']);
        },
      },
      {
        name: 'Wish for a grand feast',
        description: 'A fair wish',
        condition: () =>
          state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_hermit_wish_granted']),
        action: () => {
          state.saveCheckpoint();
          state.openDialog(
            'Wish Granted',
            "'Ah! A wonderful wish!' The Hermit's eyes twinkle. 'I think I can make that happen! Just give me a few moments...'",
            () => {
              state.goTo('ending_hermit_feast_amulet');
            },
          );
        },
      },
      {
        name: 'Wish for riches',
        description: 'A fair wish',
        condition: () =>
          state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_hermit_wish_granted']),
        action: () => {
          state.saveCheckpoint();
          state.openDialog(
            'Wish Granted',
            "'Ah! A wonderful wish!' The Hermit's eyes twinkle. 'I think I can make that happen! Just give me a few moments...'",
            () => {
              state.goTo('ending_hermit_riches_amulet');
            },
          );
        },
      },
      {
        name: 'Wish for the powers of a god',
        description: 'Shoot for the moon',
        condition: () =>
          state.inventory.includes(ITEM_MAP['hidden_gave_hermit_amulet']) &&
          !state.inventory.includes(ITEM_MAP['hidden_hermit_wish_granted']),
        action: () => {
          state.openDialog(
            'Wish Denied',
            "Don't be ridiculous. Who do you think I am? I can't grant that! Wish for something more reasonable.",
          );
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
    blur: 6,
    textBackground: true,
    actions: [
      {
        name: 'Listen to the Whispers',
        description: 'Try to make sense of the eerie sounds.',
        action: () => {
          let effectText =
            "You hear faint, sibilant voices on the wind - promises of power, warnings of unseen dangers, illusions of lost loved ones calling your name. It's a disorienting cacophony, hard to tell what's real and what's a trick of the woods.";
          if (state.inventory.includes(ITEM_MAP['warding_stone_amulet'])) {
            effectText +=
              '\n\nThe [warding_stone_amulet] in your pocket hums faintly, a steadying presence, and the whispers seem less able to cloud your thoughts.';
          }
          state.openDialog('The Whispers', effectText);
          return false;
        },
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
      'The path is barely discernible, covered in centuries of fallen leaves. Strange plants grow along the edges of the path. Shadows dance in your peripheral vision, and the whispers are louder here, coiling around you. You feel a profound sense of being watched, of unseen things just beyond your sight.',
    blur: 7,
    textBackground: true,
    actions: [
      {
        name: 'Pick the Moonpetal Herb',
        description: "You've found some of the Moonpetal Herb the Hermit mentioned.",
        condition: () =>
          state.inventory.includes(ITEM_MAP['hermit_needs_moonpetal_amulet']) &&
          !state.inventory.includes(ITEM_MAP['moonpetal_herb_amulet']),
        effect:
          'After some careful searching in a particularly shadowed and damp grove, nearly hidden beneath a mossy log, you find a single, luminescent [moonpetal_herb_amulet]! Its silvery glow is strangely beautiful in the oppressive gloom.',
      },
    ],
    links: [
      {
        name: 'Follow the path that *feels* right',
        description: 'Trust your instincts, despite the unsettling atmosphere.',
        condition: () => !state.inventory.includes(ITEM_MAP['warding_stone_amulet']),
        link_to: 'whispering_woods_illusion_trap_amulet',
      },
      {
        name: 'Follow the path indicated by the [old_map_fragment_amulet]',
        description: 'Trust your map.',
        condition: () => state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        link_to: 'whispering_woods_path_b_amulet',
      },
      {
        name: 'Try to bash through the undergrowth',
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
    id: 'whispering_woods_lost_amulet',
    title: 'Lost in the Woods',
    // TODO it would be cool to have a loader screen here to make it feel like it's taking time
    description:
      'Your attempt to forge your own path leads you deep into a disorienting, trackless part of the Whispering Woods. The whispers mock you, twisting familiar sounds into threats. After what feels like an eternity of stumbling in circles, you find yourself spat out at the edge of the woods, exhausted, disoriented, and no closer to your goal.',
    backgroundColor: '#3A3A3A',
    links: [
      {
        name: 'Return to the Whispering Woods Edge',
        link_to: 'whispering_woods_edge_amulet',
      },
    ],
  },
  {
    id: 'whispering_woods_illusion_trap_amulet',
    title: 'Sunlit Glade',
    description:
      'The path unexpectedly leads you into a beautiful, sunlit glade. A sparkling fountain bubbles merrily in the center, and colorful birds sing from blossom-laden trees. It feels peaceful, a stark contrast to the oppressive woods. The whispers are very soft here, almost comfortingly sweet.',
    blur: 2,
    textBackground: true,
    actions: [
      {
        name: 'Drink from the fountain',
        description: 'The water looks incredibly pure and inviting.',
        action: () => {
          state.saveCheckpoint();
          state.goTo('ending_eternal_slumber_amulet');
        },
      },
      {
        name: 'The [warding_stone_amulet] is pulsing in your pocket',
        description: 'The [warding_stone_amulet] seems to be trying to tell you something.',
        condition: () => state.inventory.includes(ITEM_MAP['warding_stone_amulet']),
        action: () => {
          state.addItem(ITEM_MAP['illusion_fountain_checked_warding_amulet_hidden']);
          state.openDialog(
            'The [warding_stone_amulet]',
            "You pull out the [warding_stone_amulet] and raise it towards the fountain. It's get incredibly hot and flashes violently at you. You don't think you should be here",
          );
          return false;
        },
      },
      {
        name: 'Check the map',
        description: 'Try to find this glade on the map',
        condition: () => state.inventory.includes(ITEM_MAP['old_map_fragment_amulet']),
        effect:
          "You pull out the [old_map_fragment_amulet] and try to find the glade on the map. It's not there. But you do see a warning on the map 'Beware! Not all is as it seems!' Maybe you shouldn't be here.",
      },
    ],
    links: [
      {
        name: 'Rest by the fountain for a while',
        description: 'It seems like a perfect place to recover your strength.',
        link_to: 'ending_eternal_slumber_amulet',
        onLink: () => state.saveCheckpoint(),
      },
      {
        name: 'Resist the illusion and try to find the true path',
        description: 'Focus your will and look for an exit.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['warding_stone_amulet']) &&
          state.inventory.includes(ITEM_MAP['illusion_fountain_checked_warding_amulet_hidden']),
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
        name: 'Turn back',
        description: 'Return to the previous path.',
        link_to: 'whispering_woods_path_a_amulet',
      },
    ],
  },
  {
    id: 'guardian_grove_amulet',
    title: "Guardian's Grove",
    description:
      "This secluded grove feels ancient and sorrowful, bathed in a dim, ethereal light. A spectral guardian, more mist and moonlight than solid form, coalesces before you. Its voice is like the rustling of dry leaves: 'Why do you disturb this sacred place, mortal? Few find their way here.'",
    blur: 4,
    textBackground: true,
    actions: [
      {
        name: 'State you seek the Amulet of Sylvandell',
        description: 'Be direct about your quest.',
        effect:
          "The Guardian sighs, a sound like wind through tombstones. 'Another treasure hunter, blinded by tales of power. The Amulet is a burden, a responsibility, not merely a prize. Prove your spirit is not consumed by greed or folly.'\n\nYou inquire about how you might prove yourself to the Guardian.\n\nHe says, 'If you wish to pass, you first must offer a sacrifice, then I will test your spirit.'\n\nYour weapon or a powerful artifact might be a worthy sacrifice.",
      },
      {
        name: 'Offer [warding_stone_amulet] as a sacrifice',
        description: 'Show the stone given by the Hermit.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['warding_stone_amulet']) &&
          !state.inventory.includes(ITEM_MAP['guardian_test_passed_amulet']),
        action: () => {
          state.removeItem(ITEM_MAP['warding_stone_amulet']);
          state.addItem(ITEM_MAP['guardian_test_passed_amulet']);
          state.openDialog(
            'Warding Stone Offered',
            "The Guardian's misty form shimmers as it regards the stone. 'A gift from the old one... who still remembers the true ways. You show some measure of wisdom by heeding his counsel.' The Guardian seems slightly less hostile, more contemplative.",
          );
        },
      },
      {
        name: 'Offer [silver_dagger_inscribed] as a sacrifice',
        description: 'Offer your weapon as a sacrifice.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['silver_dagger_inscribed']) &&
          !state.inventory.includes(ITEM_MAP['guardian_test_passed_amulet']),
        action: () => {
          state.removeItem(ITEM_MAP['silver_dagger_inscribed']);
          state.addItem(ITEM_MAP['guardian_test_passed_amulet']);
          state.openDialog(
            'Dagger Offered',
            'Ahh.. An ancient blade, forged in the fires of the old world. It carries the scent of true silver and ancient rites, a tool against shadows and corruption, not spirits of the wood bound to their duty. This is a worthy sacrifice.',
          );
          return false;
        },
      },
      {
        name: 'Offer [shadowbane_charm_oakhaven] as a sacrifice',
        description: 'Offer the charm the scholar made for you.',
        condition: () =>
          state.inventory.includes(ITEM_MAP['shadowbane_charm_oakhaven']) &&
          !state.inventory.includes(ITEM_MAP['guardian_test_passed_amulet']),
        action: () => {
          state.removeItem(ITEM_MAP['shadowbane_charm_oakhaven']);
          state.addItem(ITEM_MAP['guardian_test_passed_amulet']);
          state.openDialog(
            'Shadowbane Charm Offered',
            'The Guardian seems to sigh. "A gift from the old one... who still remembers the true ways. You show some measure of wisdom by heeding his counsel." The Guardian seems slightly less hostile, more contemplative.',
          );
        },
      },
    ],
    links: [
      {
        name: 'Attempt to fight the Guardian',
        description: 'Challenge the spectral entity.',
        link_to: 'ending_spirit_wrath_amulet',
        onLink: () => state.saveCheckpoint(),
      },
      {
        name: 'Ask if it will test you',
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
        description: 'Back to the main path.',
        link_to: 'whispering_woods_path_b_amulet',
      },
    ],
  },
  {
    id: 'ruined_shrine_exterior_amulet',
    title: 'Ruined Shrine Entrance',
    description:
      'Before you stands a crumbling stone shrine, half-swallowed by the encroaching forest. Roots like serpents crawl over its weathered stones. A heavy stone door, sealed shut by an ancient protective magic, blocks the only visible entrance. A curious, complex keyhole is set into the door.',
    blur: 4,
    textBackground: true,
    actions: [
      {
        name: 'Examine the door closely',
        description: 'Inspect the seal and keyhole.',
        action: () => {
          state.openDialog(
            'Examine the door closely',
            'The magic warding the door feels incredibly old and potent, designed to repel the unworthy. The keyhole is intricate, clearly requiring a specific, uniquely shaped key.',
          );
          return false;
        },
      },
      {
        name: 'Try to force the door',
        description: 'Put your shoulder into it.',
        effect:
          "The door doesn't budge even a fraction of an inch. You hear a faint, dry chuckle from the depths of the woods, as if mocking your efforts.",
      },
    ],
    links: [
      {
        name: 'Use [ancient_symposium_key_amulet] on the door',
        description: 'Try the ornate key in the lock.',
        condition: () => state.inventory.includes(ITEM_MAP['ancient_symposium_key_amulet']),
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
    blur: 3,
    textBackground: true,
    actions: [
      {
        name: 'Carefully reach through the rubble',
        description: 'Try to retrieve the glinting object.',
        condition: () => !state.inventory.includes(ITEM_MAP['silver_locket_lost_amulet']),
        effect:
          "After some careful maneuvering to avoid dislodging more stones, your fingers close around a small, cool object. You pull out a [silver_locket_lost_amulet]. It's tarnished with age, but feels strangely significant.",
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
      "The air inside the sanctum is still, heavy with the scent of dust, dried herbs, and forgotten magic. Faded tapestries cling to the walls. On a weathered stone pedestal in the center of the circular room, rests the Amulet of Sylvandell on a pedastal. It emits a soft, pulsing light, cycling through hues of green, gold, and deep amber.\n\nThe two halves of the room are very distinct. The left half is full of bright flowers and greenery, the right half looks more autumnal, covered in dead leaves and withered plants with an orange glow.\n\nTo reach the pedastal, you'll have to take the steps on one of the sides",
    textBackground: true,
    links: [
      {
        name: 'Approach from the left side',
        description: 'Walk towards the pedestal from the flowery side of the room.',
        link_to: 'amulet_of_sylvandell_left_amulet',
      },
      {
        name: 'Approach from the right side',
        description: 'Walk towards the pedestal from the autumnal side of the room.',
        link_to: 'amulet_of_sylvandell_right_amulet',
      },
      {
        name: 'Leave the inner sanctum',
        description: 'Return to the shrine entrance',
        link_to: 'ruined_shrine_exterior_amulet',
      },
    ],
  },
  {
    id: 'amulet_of_sylvandell_left_amulet',
    title: 'Shrine - Inner Sanctum - Flowery Side',
    description:
      'You approach the pedestal from the left side. Around you are bright flowers and healthy plants. The Amulet of Sylvandell is glowing brightly, and you feel a sense of peace and tranquility.',
    textBackground: true,
    actions: [
      {
        name: 'Wear the Amulet',
        description: 'Put on the Amulet of Sylvandell.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_spring_amulet']) &&
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_autumn_amulet']),
        action: () => {
          state.saveCheckpoint();
          state.goTo('ending_wear_spring_amulet');
        },
      },
      {
        name: 'Take the Amulet',
        description: "Take the Amulet of Sylvandell in it's spring state.",
        condition: () =>
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_spring_amulet']) &&
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_autumn_amulet']),
        effect:
          "You approach the pedestal and take the [amulet_sylvandell_spring_amulet]. It's a bit warm to the touch, but you feel a sense of peace and tranquility.",
      },
      {
        name: 'Destroy the Amulet',
        description: 'Destroy the Amulet of Sylvandell.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_spring_amulet']) &&
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_autumn_amulet']) &&
          state.inventory.includes(ITEM_MAP['silver_dagger_inscribed']),
        action: () => {
          state.saveCheckpoint();
          state.goTo('amulet_destroyed_ending_amulet');
        },
      },
    ],
    links: [
      {
        name: 'Leave the inner sanctum',
        description: 'Return to the shrine entrance',
        link_to: 'ruined_shrine_exterior_amulet',
      },
    ],
  },
  {
    id: 'amulet_of_sylvandell_right_amulet',
    title: 'Shrine - Inner Sanctum - Autumnal Side',
    description:
      'You approach the pedestal from the right side. Around you are dead leaves and withered plants. The Amulet of Sylvandell is glowing brightly, and you feel a sense of peace and tranquility.',
    textBackground: true,
    actions: [
      {
        name: 'Wear the Amulet',
        description: 'Put on the Amulet of Sylvandell.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_spring_amulet']) &&
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_autumn_amulet']),
        action: () => {
          state.saveCheckpoint();
          state.goTo('ending_wear_autumn_amulet');
        },
      },
      {
        name: 'Take the Amulet',
        description: "Take the Amulet of Sylvandell in it's autumn state.",
        condition: () =>
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_spring_amulet']) &&
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_autumn_amulet']),
        effect:
          "You approach the pedestal and take the [amulet_sylvandell_autumn_amulet]. It's a bit cold to the touch, but you feel a sense of peace and tranquility.",
      },
      {
        name: 'Destroy the Amulet',
        description: 'Destroy the Amulet of Sylvandell.',
        condition: () =>
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_spring_amulet']) &&
          !state.inventory.includes(ITEM_MAP['amulet_sylvandell_autumn_amulet']) &&
          state.inventory.includes(ITEM_MAP['silver_dagger_inscribed']),
        action: () => {
          state.saveCheckpoint();
          state.goTo('amulet_destroyed_ending_amulet');
        },
      },
    ],
    links: [
      {
        name: 'Leave the inner sanctum',
        description: 'Return to the shrine entrance',
        link_to: 'ruined_shrine_exterior_amulet',
      },
    ],
  },
  {
    id: 'ending_eternal_slumber_amulet',
    title: 'Ending: Eternal Slumber',
    description:
      "You drink deeply from the fountain. The water is sweeter than anything you've ever tasted, and an irresistible drowsiness washes over you. You lie down in the soft grass of the sunlit glade, falling into a deep, enchanted sleep, lost to the world forever. The Whispering Woods claims another soul, cradled in its most beautiful illusion.",
    backgroundColor: '#1A2430',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Lost in Dreams',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'ending_spirit_wrath_amulet',
    title: "Ending: Spirit's Wrath",
    description:
      'You foolishly attempt to strike the Spectral Guardian. Its misty form flares with an incandescent, cold rage. Ethereal tendrils, sharp as obsidian, lash out from its being, and your life force is drained away in an instant. Your aggression has earned you a permanent, silent place among the sorrowful watchers of the Whispering Woods.',
    backgroundColor: '#1A2430',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Judged Unworthy',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'ending_wear_spring_amulet',
    title: 'Ending: Herald of the Unending Spring',
    description:
      'You fasten the [amulet_sylvandell_spring_amulet] around your neck. A joyous, irrepressible wave of energy surges through you, like the first thaw after a long winter. Colors seem brighter, the air fresher, and you feel an overwhelming urge to cultivate, to nurture, to bring forth new life. The world, to you, is now a garden of endless possibilities, waiting for your touch to bloom. You become a wandering beacon of hope and renewal.\n\nYou forever wander the Whispering Woods, a guardian of the unending spring.',
    backgroundColor: '#90EE90',
    textBackground: true,
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - A Verdant Future Awaits',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'ending_wear_autumn_amulet',
    title: 'Ending: Guardian of the Golden Cycle',
    description:
      'You place the [amulet_sylvandell_autumn_amulet] upon yourself. A profound, calm wisdom settles over your mind, like the quiet hush of a forest in late autumn. You see the beauty in endings as much as beginnings, the necessary harvest and the peaceful slumber that follows. You become a keeper of memories, a sage of cycles, understanding the deep currents that guide the world through its seasons of change. Your path is one of introspection and guidance for others navigating their own autumns.\n\nYou forever wander the Whispering Woods, a guardian of the golden cycle.',
    backgroundColor: '#EAAA00',
    textBackground: true,
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Wisdom Guides Your Path',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'ending_hermit_feast_amulet',
    title: 'Ending: Feast of Eternity',
    description:
      'You turn around to find an impossibly long banquet table has materialized in the clearing, groaning under the weight of a magnificent feast. Roasted phoenix wings glisten with honey glaze, their edges still flickering with magical flame. Crystal bowls overflow with shimmering moonberry pudding that changes flavor with each spoonful. Loaves of cloudspun bread float gently above silver platters, soft as morning mist. Dragon-smoked venison releases tantalizing aromas into the air, while goblets of starlight wine cast dancing constellations across the tablecloth.\n\nAs you take your seat and begin to feast, you notice something remarkable - each dish you finish magically replenishes itself, the food as fresh and delectable as when it first appeared. The clearing fills with other guests who come and go like dreams - travelers, mystics, and magical beings all drawn to this eternal celebration.\n\nTime loses all meaning as you preside over this endless feast. Days and seasons blur together in a haze of culinary delights and fascinating conversation. You have become a legendary host in the Whispering Woods, keeper of a banquet that will never end.',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - You celebrate forever',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'ending_hermit_riches_amulet',
    title: 'Ending: Riches Everlasting',
    description:
      'The Hermit snaps his fingers. "Check your pocket," he says with a knowing smile. You reach in and find a small leather pouch that wasn\'t there before. The weight feels... modest. You look at him with slight disappointment.\n\nHis eyes twinkle mischievously. "Empty it out."\n\nYou pour the contents onto your palm - a decent sum of gold and silver coins, but hardly what you\'d call riches. You look up at him questioningly.\n\n"Now check the pouch again," he suggests.\n\nTo your amazement, the pouch is once again full of coins. You empty it again... and again... and again. Each time, it magically refills.\n\nWith unlimited wealth at your disposal, you purchase vast tracts of land and commission the finest architects and craftsmen. Soon, a magnificent castle rises from the forest edge, its spires reaching toward the heavens. A prosperous town grows around it, drawn by your patronage and generosity.\n\nYou spend your days in unimaginable luxury, hosting grand balls and feasts, collecting rare artifacts and artwork. Your name becomes legendary throughout the land - not just for your wealth, but for the splendor and beauty you\'ve brought to this once-quiet corner of the world.',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - Life of luxury',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'ending_hermit_receives_autumn_amulet',
    title: 'Ending: Death of a Hermit',
    description:
      "The Hermit's eyes widen. 'The Amulet of Sylvandell!' He reaches out and grasps the amulet in his hand. 'Long have I searched for it... The amulet shall renew me and restore my power!' You wait expectantly.\n\nYou notice the bags under his eyes become bigger and bigger. His hair begins to turn white before your eyes.\n\n'But wait... what is happening... this isn't... how... I should be...' his voice fades out as he collapses to the ground. You rush to his side, but he is already gone. Within moments he has turned to dust before you.\n\nYou are left alone in the clearing with the amulet. You hear it's whispers get louder and louder, and the world goes dark.",
    backgroundColor: '#FFDEAD',
    textBackground: true,
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: "Game Over - You've killed your guide",
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
  {
    id: 'amulet_destroyed_ending_amulet',
    title: 'Ending: The Shattered Balance',
    description:
      'With grim determination, you strike the Amulet of Sylvandell with the [silver_dagger_inscribed]. There is a deafening crack, a flash of blinding, multicolored light, and a shockwave that ripples through the shrine, shaking the very foundations of the Whispering Woods. The Amulet shatters into a thousand glittering, inert fragments, its ancient magic violently dispersed. The Woods groan as if in pain, and its ancient enchantments begin to unravel, the consequences unforeseen. You have broken a powerful artifact; its energy now seeps into the land unpredictably.',
    backgroundColor: '#404040',
    links: [
      {
        name: 'Restart from checkpoint',
        description: 'Go back',
        onLink: () => state.loadCheckpoint(),
        link_to: 'forest_path_start',
      },
      {
        name: 'Game Over - The Shattered Balance',
        description: 'Try again?',
        onLink: () => state.restart(),
        link_to: 'tutorial',
      },
    ],
  },
];
