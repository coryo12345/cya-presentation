import { state } from '../state';

/** @type {import('@/game/items').Item[]} */
export default [
  {
    id: 'charcoal_stick_amulet',
    name: 'Charcoal Stick',
    description: 'A simple stick of charcoal, useful for sketching or making rubbings.',
  },
  {
    id: 'runic_carving_rubbing_amulet',
    name: 'Runic Carving Rubbing',
    description: 'A charcoal rubbing taken from ancient runes on an oak tree. The symbols are complex.',
  },
  {
    id: 'silver_dagger_inscribed',
    name: 'Elvish Silver Dagger',
    description:
      'A well-crafted silver dagger with faint runes etched along its blade. It feels potent against unseen forces. It is inscribed with the Elvish runes of the Sylvandell.',
    image:
      'https://thumbs.dreamstime.com/b/dagger-icon-vector-isolated-white-background-your-web-mobile-app-design-dagger-logo-concept-dagger-icon-vector-sign-134071239.jpg',
  },
  {
    id: 'old_map_fragment_amulet',
    name: 'Old Map Fragment',
    description: '(Click to read)',
    onClick: () => {
      state.openDialog(
        'Old Map Fragment',
        "A charred, brittle piece of parchment showing a crude map of what might be a forest, with a large tree or shrine marked in the center. It also bears hastily scrawled notes: 'Paths shift!', and 'Don't trust your eyes!'",
      );
    },
  },
  {
    id: 'warding_stone_amulet',
    name: 'Warding Stone',
    description: 'A smooth, grey stone given by the Hermit. It hums with a faint protective energy against illusions.',
  },
  {
    id: 'hermits_guidance_amulet',
    name: "Hermit's Guidance",
    description: 'The Hermit has provided the player with guidance for entering the Whispering Woods.',
    hidden: true,
  },
  {
    id: 'moonpetal_herb_amulet',
    name: 'Moonpetal Herb',
    description: "A rare, silvery herb that glows faintly in the dark. It's said to have restorative properties.",
  },
  {
    id: 'hermit_needs_moonpetal_amulet',
    name: 'Hermit Needs Moonpetal',
    description: 'The Hermit has requested the player to find a Moonpetal Herb for him.',
    hidden: true,
  },
  {
    id: 'illusion_fountain_checked_warding_amulet_hidden',
    name: 'Illusion Fountain Ward Checked',
    description: 'The player has checked the [warding_stone_amulet] at the illusion fountain.',
    hidden: true,
  },
  {
    id: 'guardian_test_passed_amulet',
    name: "Guardian's Test Passed",
    description: 'You have shown the Spectral Guardian a measure of respect or wisdom.',
    hidden: true,
  },
  {
    id: 'ancient_symposium_key_amulet',
    name: 'Ancient Symposium Key',
    description: 'An ornate, ancient key made of a dark, unknown metal. Its teeth form a complex, interwoven symbol.',
  },
  {
    id: 'silver_locket_lost_amulet',
    name: 'Tarnished Silver Locket',
    description:
      'A small, tarnished silver locket. The pendant is shaped like a heart, with a small blue gem in the center.',
  },
  {
    id: 'amulet_sylvandell_spring_amulet',
    name: 'Amulet of Sylvandell (Spring)',
    description: 'The Amulet of Sylvandell, resonating with the gentle energy of healing, balance, and vibrant life.',
  },
  {
    id: 'amulet_sylvandell_autumn_amulet',
    name: 'Amulet of Sylvandell (Autumn)',
    description: 'The Amulet of Sylvandell, imbued with the quiet wisdom of cycles, endings, and ancient knowledge.',
  },
  {
    id: 'hidden_gave_hermit_amulet',
    name: 'Gave Hermit Amulet',
    description: 'Player has given the Hermit an Amulet of Sylvandell.',
    hidden: true,
  },
  {
    id: 'hidden_hermit_wish_granted',
    name: 'Hermit Wish Granted',
    description: 'Hermit has granted a wish to the Player.',
    hidden: true,
  },
];
