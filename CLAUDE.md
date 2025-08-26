# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` - Start Tauri development environment (frontend + backend)
- `pnpm dev:ui` - Start only frontend development server on port 1420
- `pnpm build` - Build production Tauri application
- `pnpm build:debug` - Build with debug mode and developer tools enabled

### Code Quality & Testing
- `pnpm check` - Run Biome check and fix issues
- `pnpm lint` - Run Biome linter with auto-fix
- `pnpm format` - Format both Rust and JavaScript code
- `pnpm typecheck` - TypeScript type checking
- `pnpm test:js` - Run frontend tests with Vitest
- `pnpm test:rs` - Run Rust tests with cargo nextest
- `pnpm test:coverage` - Run tests with coverage report

### Platform-Specific Builds
- `pnpm build:mac:x64` - Build for Intel Macs
- `pnpm build:mac:arm` - Build for Apple Silicon Macs
- `pnpm build:mac:universal` - Build universal macOS binary
- `pnpm build:win:x64` - Build for Windows x64
- `pnpm build:win:arm` - Build for Windows ARM


## Architecture Overview

### Application Structure
This is a Tauri v2 desktop IDE application built with:
- **Frontend**: React + TypeScript + Tailwind CSS + Vite + shadcn/ui
- **Backend**: Rust with Tauri framework
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: Nanostores with persistent atoms (@nanostores/react)
- **Testing**: Vitest for frontend, cargo-nextest for Rust
- **Code Quality**: Biome for linting/formatting, Lefthook for git hooks

### Multi-Entry Architecture
The application has two main entry points:
1. **Main IDE** (`src/main.tsx` → `index.html`) - Primary IDE interface
2. **Settings Window** (`src/settings-main.tsx` → `settings.html`) - Separate settings window

### Key Frontend Architecture Components

#### Views System
The IDE uses a view-based architecture with lazy-loaded components:
- Views: `CodebaseView`, `ChatView`, `MCPView`, `AgentsView`, `HooksView`, `GitView`
- State managed through `$activeView` atom in `src/stores/ide.store.ts`
- Navigation controlled by sidebar with view switching

#### State Management
Uses Nanostores for reactive state:
- `src/stores/ide.store.ts` - Main IDE state (active view, theme, sidebar, command palette)
- Persistent atoms for user preferences (theme, settings)
- Map stores for complex state (session info, MCP status, sub-agents status)

#### Layout Structure
```
IDELayout
├── HeaderBar (title, session info, controls)
├── Sidebar (navigation, status indicators)
├── Main Content (lazy-loaded views)
└── CommandPalette (global search/commands)
```

#### Component Organization
- `src/components/ui/` - shadcn/ui components (Button, Switch, Select, etc.)
- `src/components/layout/` - Layout-specific components (HeaderBar, Sidebar)
- `src/components/common/` - Shared functionality (CommandPalette)
- `src/components/settings/` - Settings window components and panels
- `src/views/` - Main application views
- `src/lib/utils.ts` - shadcn/ui utility functions (cn helper)
- `src/libs/utils.ts` - Application utility functions

### Tauri Integration
- Rust backend in `src-tauri/` with comprehensive plugin ecosystem
- TypeScript bindings auto-generated via specta/tauri-specta
- Platform-specific features using conditional compilation
- Native macOS/Windows/Linux integrations

### Theming & Styling
- shadcn/ui theming system with CSS custom properties
- Dark/light theme support with system detection
- Tailwind CSS for component styling with shadcn/ui design tokens
- Theme state synchronized between main and settings windows
- `components.json` configures shadcn/ui component paths and styling

### Development Workflow
1. Frontend development uses Vite with HMR on port 1420
2. Tauri automatically rebuilds Rust code during development
3. Biome handles all linting and formatting
4. Lefthook runs pre-commit checks
5. Tests run in both frontend (Vitest) and backend (cargo-nextest)

### Key Files to Understand
- `src/stores/ide.store.ts` - Central state management and view types
- `src/layouts/ide-layout.tsx` - Main application layout structure
- `src/layouts/settings-window-layout.tsx` - Settings window layout
- `vite.config.ts` - Multi-entry build configuration with settings window
- `src-tauri/tauri.conf.json` - Tauri application configuration
- `package.json` - Comprehensive script definitions for all workflows
- `components.json` - shadcn/ui configuration for component installation
- `src/lib/utils.ts` - shadcn/ui utilities (cn function)
- `src/libs/utils.ts` - Application utilities

## UI Component System

### shadcn/ui Integration
- All UI components use shadcn/ui with Radix UI primitives
- Install new components with: `npx shadcn@latest add <component-name>`
- Components are installed to `src/components/ui/` directory
- Styling follows shadcn/ui design system with Tailwind CSS
- Theme tokens defined in `src/styles/global.css`

### Available Components
Core shadcn/ui components installed:
- Button, Input, Label, Switch
- Select, Dialog, Popover, Command
- Form, Badge, Card, Separator

### Settings Architecture
Settings window is a separate Tauri window with:
- `SettingsWindowLayout` - Main layout with sidebar navigation
- `SettingsSidebar` - Navigation between settings panels
- Settings panels in `src/components/settings/panels/`:
  - GeneralSettings - App behavior settings
  - AppearanceSettings - Theme and display settings
  - UpdatesSettings - Update preferences
  - KeyboardSettings - Keyboard shortcuts display
  - AboutSettings - App information
  - HelpSettings - Support and documentation links
  - WhatsNewSettings - Release notes