# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a "Choose Your Own Adventure" (CYOA) game built with Vue 3 and Vite. It's a text-based adventure game where players navigate through different pages, make choices, collect items, and reach various endings based on their decisions.

## Commands

### Development

```sh
# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code with Prettier
npm run format
```

## Architecture

### Core Components

1. **Game State Management** (`src/game/state.js`):
   - Central state manager using Vue's reactivity system
   - Handles player history, inventory, actions taken
   - Provides checkpoint save/load functionality
   - Manages page transitions and game flow

2. **Game Content** (`src/game/pages.js` and `src/game/items.js`):
   - `pages.js` defines all game locations, their descriptions, available actions, and navigation links
   - `items.js` defines all collectible items with properties and interactions
   - Both use TypeScript-like JSDoc annotations for type safety

3. **UI Components** (`src/components/`):
   - `Page.vue`: Renders the current game page with its title, description, actions, and links
   - `InventorySidebar.vue`: Displays and manages player inventory
   - `EffectDialog.vue`: Shows dialogs when actions are taken
   - `RestartDialog.vue`: Provides game reset functionality

4. **Debug Mode** (`src/debug/`):
   - Accessed via '/debug' URL
   - Tools for testing game states, manipulating inventory, and navigating between pages
   - Checkpoint management for development and testing

### Key Game Mechanics

1. **Navigation System**:
   - Players move between pages by selecting links
   - Conditional links (only appear if certain conditions are met)
   - Action system for in-page interactions

2. **Inventory System**:
   - Items can be collected, viewed, and sometimes used
   - Items can influence available actions and navigation options
   - Items can have special click behaviors

3. **Checkpoint System**:
   - Uses localStorage to save and restore game state
   - Allows players to return to key decision points

4. **Dynamic Content**:
   - Text interpolation system for embedding item references in descriptions
   - Condition-based action and link availability

5. **Image Preloading**:
   - Custom Vite plugin (`dynamic-preload.js`) preloads all game images
   - Ensures smooth gameplay without loading delays

## Implementation Notes

- The application uses Vue 3's Composition API with `<script setup>` syntax
- Game state persists using `useStorage` from `@vueuse/core`
- Tailwind CSS is used for styling
- The project follows a modular structure with clear separation between game logic and UI