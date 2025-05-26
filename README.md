# Choose Your Own Adventure Game

A modern web-based Choose Your Own Adventure (CYOA) game built with Vue 3 and Vite. Navigate through an immersive text-based story where your choices shape the adventure, collect items that influence your journey, and discover multiple endings based on your decisions.

## Features

- **Interactive storytelling** with branching narratives
- **Dynamic inventory system** that affects available actions and story paths
- **Multiple endings** based on player choices and items collected
- **Checkpoint system** to save and restore progress
- **Rich visual experience** with location-specific artwork
- **Debug mode** for development and testing
- **Responsive design** that works on desktop and mobile

## Technologies Used

- **Vue 3** with Composition API and `<script setup>` syntax
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **VueUse** for reactive localStorage and utilities
- **Custom image preloading** system for smooth gameplay

## How It Works

### Page System

The game is built around a **page-based navigation system**:

- Each location in the game world is represented as a "page"
- Pages contain descriptions, available actions, and links to other pages
- Links can be conditional (only appear when certain requirements are met)
- Players navigate by clicking on available links

### Item System

Items play a crucial role in shaping the adventure:

- **Collectible items** can be found and added to inventory
- **Interactive items** can be clicked for special effects or information
- **Conditional actions** - some choices only appear when you have specific items
- **Story influence** - items can unlock new paths or change story outcomes

### Game State Management

- **Centralized state** tracks player history, inventory, and progress
- **Persistent storage** using localStorage to maintain progress across sessions
- **Checkpoint system** allows players to save at key decision points
- **Action tracking** remembers what the player has done to prevent repeated actions

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd cya-presentation
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Commands

```bash
# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Format code with Prettier
npm run format
```

## Project Structure

```
src/
├── components/          # Vue components (UI elements)
├── game/
│   ├── pages/          # Game content - locations and stories
│   ├── items/          # Item definitions and properties
│   ├── state.js        # Central game state management
│   └── endings.js      # Game ending definitions
├── debug/              # Debug tools and development helpers
└── presentation/       # Special presentation mode components
```

## Development

### Debug Mode

Access debug tools by navigating to `/debug` in your browser. This provides:

- Navigation helper to jump to any page
- Inventory management tools
- Checkpoint save/load functionality
- Action unlocker for testing different game states

### Adding New Content

**New Pages**: Add to `src/game/pages/` with title, description, actions, and links
**New Items**: Define in `src/game/items/` with properties and behaviors
**New Images**: Place in `public/img/` and they'll be automatically preloaded

The game uses a declarative content system where pages and items are defined as JavaScript objects with TypeScript-like JSDoc annotations for type safety.

## Deployment

The project is configured for easy deployment to Vercel or similar platforms. Simply run:

```bash
npm run build
```

The built files in the `dist` folder can be deployed to any static hosting service.
