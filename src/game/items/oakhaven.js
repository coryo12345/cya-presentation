import { state } from '../state';

/** @type {import('@/game/items').Item[]} */
export default [
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
    id: 'silver_locket_lost_martha',
    name: 'Sapphire Heart Locket',
    description:
      'A small, tarnished silver locket. The pendant is shaped like a heart, with a small blue gem in the center.',
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
  {
    id: 'hidden_chapel_door_unlocked',
    name: 'Chapel Door Unlocked',
    description: 'Player has unlocked the chapel door.',
    hidden: true,
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
