import { promptBuilder } from '@/presentation/promptBuilder';

/** @type {import('../game/pages/index').Page[]} */
export const PRESENTATION_PAGES = [
  {
    id: 'questions',
    title: 'Questions?',
    description: '',
    backgroundColor: '#111144',
    links: [
      {
        name: 'Next',
        description: '',
        link_to: 'home',
      },
    ],
  },
  {
    id: 'home',
    title: "Who's Next???",
    description:
      'In the spirit of "Choose your own adventure" games, you all get some input!\n\nTo make it more fun, we\'re gonna choose the prompt first, then the person.',
    textBackground: true,
    backgroundColor: '#111144',
    links: [
      {
        name: 'Get Started',
        link_to: 'q1',
      },
    ],
  },
  {
    id: 'q1',
    title: 'Practical or Creative?',
    description: 'Do you want our next presentation to be about something practical or something imaginative?',
    textBackground: true,
    backgroundColor: '#111144',
    links: [
      {
        name: 'Practical',
        link_to: 'practical_q',
      },
      {
        name: 'Creative',
        link_to: 'creative_q',
      },
    ],
  },
  {
    id: 'practical_q',
    title: 'Solve a problem or share a useful life hack?',
    description: 'Solve a totally real problem, or share something that is definitely super useful to us all?',
    textBackground: true,
    backgroundColor: '#111144',
    actions: [
      {
        name: 'Solve a problem',
        action: () => {
          promptBuilder.title = 'Help the world solve an important problem';
          promptBuilder.description =
            "This classic scenario, that plagues us all. You've just driven all the way to your favorite fishing spot, hours away from home. You unpack your bait, your lounge chair, and your best fishing hat. But OH NO! You've forgotten your fishing rod!!!\n\nHow can you still have a great fishing trip without your fishing rod?\n\nCome up with some practical solutions on how solve this problem. Provide visual aids.";
        },
      },
      {
        name: 'Life hack',
        action: () => {
          promptBuilder.title = 'Share a life hack';
          promptBuilder.description =
            "Our lives are so busy and inefficient. So of course, we all desperately need some super useful ways to make our lives easier.\n\nCome up with some incredible life hacks that can save us hours each day. Or maybe they\'ll save us money!\n\nI think we can all agree we\'d like to see at least 4 life hacks";
        },
      },
    ],
  },
  {
    id: 'creative_q',
    title: 'Celebrate or Prepare for doom?',
    description: 'Are we celebrating good times? Or preparing for impending doom?',
    textBackground: true,
    backgroundColor: '#111144',
    actions: [
      {
        name: 'Celebrate',
        action: () => {
          promptBuilder.title = 'Create a new holiday!';
          promptBuilder.description =
            "Holidays are great, except for when they aren't. This is your time to create the perfect holiday that has everything you want.\n\nWhen is it? What does it celebrate? What do the typical activities include? And most importantly, what are the main foods? Please create a sample dish to demonstrate.";
        },
      },
      {
        name: 'Prepare',
        action: () => {
          promptBuilder.title = 'Design a doomsday bunker';
          promptBuilder.description =
            "The world is ending, and you're going to be the one to survive. You've got to build a bunker that will keep you alive for as long as possible.\n\nWhat are the main features? What are the most important things to include? What are the most important things to avoid? Please create a detailed plan for the bunker.";
        },
      },
    ],
  },
];
