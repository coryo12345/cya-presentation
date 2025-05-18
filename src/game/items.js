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
    id: 'copper_coin',
    name: 'Copper Coin',
    description: 'A single, worn copper coin. It feels heavier than it looks.',
  },
  {
    id: 'old_map_fragment',
    name: 'Old Map Fragment',
    description: 'A tattered piece of parchment with faded lines, possibly showing a route through dense woods.',
  },
  {
    id: 'glowing_moss_clump',
    name: 'Glowing Moss Clump',
    description: "A small clump of moss that emits a soft, ethereal green light. It's slightly warm to the touch.",
  },
  {
    id: 'torch',
    name: 'Torch',
    description: 'A sturdy wooden stick tipped with oil-soaked rags, ready to be lit.',
  },
  {
    id: 'rope_10m',
    name: 'Rope (10m)',
    description: 'A 10-meter coil of surprisingly strong hempen rope.',
  },
  {
    id: 'lockpick_set',
    name: 'Set of Lockpicks',
    description: 'A small, concealable set of slender metal tools for manipulating tumblers.',
  },
  {
    id: 'waterskin_full',
    name: 'Full Waterskin',
    description: 'A leather waterskin, currently full of cool, fresh water.',
  },
  {
    id: 'basic_rations',
    name: 'Basic Rations',
    description: 'A small pouch containing dried meat, hard bread, and a piece of fruit.',
  },
  {
    id: 'hermits_talisman',
    name: "Hermit's Talisman",
    description: 'A small, carved wooden bird given by a reclusive hermit. It feels strangely comforting.',
  },
  {
    id: 'map_whispering_woods',
    name: 'Map of Whispering Woods',
    description: 'A crudely drawn map marking a path to the Temple of Sylvandell through the ominous Whispering Woods.',
  },
  {
    id: 'sunstone_key',
    name: 'Sunstone Key',
    description: 'A circular stone artifact with a sunburst pattern. It radiates a faint warmth.',
  },
  {
    id: 'ancient_lever_handle',
    name: 'Ancient Lever Handle',
    description: 'A heavy, ornate metal handle, clearly broken off from a larger mechanism.',
  },
  {
    id: 'reflective_shard_mirror',
    name: 'Reflective Shard Mirror',
    description: 'A shard of highly polished obsidian, smooth and cool to the touch. It seems to absorb light.',
  },
  {
    id: 'amulet_sylvandell_dormant',
    name: 'Amulet of Sylvandell (Dormant)',
    description: 'A beautiful silver amulet inlaid with a milky gemstone. It feels cold and inert.',
  },
  {
    id: 'amulet_sylvandell_awakened',
    name: 'Amulet of Sylvandell (Awakened)',
    description:
      'The silver amulet now pulses with a soft inner light, the gemstone glowing warmly. It hums with power.',
  },
  {
    id: 'waterlogged_plea',
    name: 'Waterlogged Plea',
    description: "A soggy, barely legible note: 'Help Oakhaven... shadow consumes... beware the...'.",
  },
  {
    id: 'villagers_diary_oakhaven',
    name: "Villager's Diary (Oakhaven)",
    description:
      'A diary detailing strange occurrences, growing paranoia, and fear of someone or something in Oakhaven.',
  },
  {
    id: 'strange_symbol_medallion',
    name: 'Strange Symbol Medallion',
    description: 'A small, tarnished silver medallion bearing an unsettling, unfamiliar symbol.',
  },
  {
    id: 'mayors_ledger_oakhaven',
    name: "Mayor's Ledger (Oakhaven)",
    description: 'A thick ledger detailing village finances, but with several suspicious entries and coded notes.',
  },
  {
    id: 'silver_dagger_inscribed',
    name: 'Inscribed Silver Dagger',
    description:
      'A well-crafted silver dagger with faint runes etched along its blade. It feels potent against unseen forces.',
  },
  {
    id: 'shadowbane_charm_oakhaven',
    name: 'Shadowbane Charm',
    description: 'A charm made of woven herbs and a piece of blessed metal, said to ward off dark influences.',
  },
  {
    id: 'glowing_crystal_shard_cave',
    name: 'Glowing Crystal Shard (Cave)',
    description: 'A vibrant, fist-sized crystal that pulses with a rhythmic blue light. It emits a faint hum.',
  },
  {
    id: 'miners_pickaxe',
    name: "Miner's Pickaxe",
    description: 'A sturdy pickaxe, useful for breaking rocks or dislodging stubborn objects.',
  },
  {
    id: 'runed_tablet_fragment_cave',
    name: 'Runed Tablet Fragment (Cave)',
    description: 'A piece of an ancient stone tablet covered in glowing runes you cannot decipher... yet.',
  },
  {
    id: 'lens_true_sight_cave',
    name: 'Lens of True Sight',
    description: 'A polished crystal lens that, when looked through, reveals hidden details or magical auras.',
  },
  {
    id: 'heartstone_gem_cave',
    name: 'Heartstone Gem',
    description:
      'A massive, perfectly cut gem that seems to hold the light of a captive star. It resonates with immense energy.',
  },
  {
    id: 'hermit_notes_eldoria',
    name: "Hermit's Notes on Eldoria",
    description: 'Scrawled notes from the Hermit about the Amulet of Eldoria and the dangers of the Whispering Woods.',
  },
];

export const ITEM_MAP = ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
