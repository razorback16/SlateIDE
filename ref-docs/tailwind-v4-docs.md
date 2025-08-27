# Tailwind CSS v4 Migration Guide

## Overview

Tailwind CSS v4 is a major rewrite that introduces significant performance improvements, modern CSS features, and a fundamentally different approach to configuration. This guide covers all the essential changes a developer experienced with v3 needs to know.

## Key Changes at a Glance

- **CSS-first configuration** instead of JavaScript config files
- **New Oxide engine** built in Rust for 5x faster builds
- **Automatic content detection** - no more `content` array configuration
- **Simplified installation** with zero configuration
- **Modern browser requirements**: Safari 16.4+, Chrome 111+, Firefox 128+
- **Built-in import support** - no more PostCSS plugins needed
- **CSS theme variables** exposed as native CSS custom properties

## Installation & Setup Changes

### Package Changes

**v3 Installation:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**v4 Installation:**
```bash
npm install tailwindcss@next
# Or use the Vite plugin
npm install @tailwindcss/vite
```

### CSS Import Changes

**v3 CSS File:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 CSS File:**
```css
@import "tailwindcss";
```

### PostCSS Configuration

**v3 Required PostCSS Setup:**
```js
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**v4 PostCSS Setup (if needed):**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Vite Integration (Recommended)

**v4 Vite Plugin:**
```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

## Configuration Migration

### JavaScript Config → CSS Config

The biggest change is moving from `tailwind.config.js` to CSS-based configuration using the `@theme` directive.

**v3 Configuration:**
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#EF4444',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}
```

**v4 CSS Configuration:**
```css
@import "tailwindcss";

@theme {
  --color-primary: #3B82F6;
  --color-secondary: #EF4444;
  --font-display: "Inter", "sans-serif";
  --spacing-18: 4.5rem;
}
```

### Content Detection

**v3:** Manual content configuration required
```js
content: ['./src/**/*.{js,jsx,ts,tsx}']
```

**v4:** Automatic content detection
- No configuration needed
- Automatically ignores `node_modules`, `.git`, etc.
- Respects `.gitignore` files
- Add custom sources with `@source` directive:

```css
@import "tailwindcss";
@source "../node_modules/@my-company/ui-lib";
```

### Theme Overriding

**v4 - Override Entire Namespaces:**
```css
@theme {
  /* Remove all default colors */
  --color-*: initial;
  
  /* Add only your custom colors */
  --color-brand: #3B82F6;
  --color-accent: #EF4444;
}
```

**v4 - Reset Everything:**
```css
@theme {
  /* Remove all default theme values */
  --*: initial;
  
  /* Define your complete custom theme */
  --color-primary: #3B82F6;
  --font-sans: "Inter", sans-serif;
  --spacing-4: 1rem;
}
```

## Custom Utilities Changes

### v3 Custom Utilities
```js
// tailwind.config.js
module.exports = {
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-responsive-sm': {
          'font-size': '0.75rem',
        },
        '.tab-4': {
          'tab-size': '4',
        }
      })
    }
  ]
}
```

### v4 Custom Utilities
```css
@utility text-responsive-sm {
  font-size: 0.75rem;
}

@utility tab-4 {
  tab-size: 4;
}

@utility flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Breaking Changes & Deprecated Utilities

### Renamed Utilities

| v3 Class | v4 Replacement | Description |
|----------|----------------|-------------|
| `bg-opacity-*` | `bg-black/50` | Use slash notation for opacity |
| `flex-shrink-*` | `shrink-*` | Simplified shrink utilities |
| `overflow-ellipsis` | `text-ellipsis` | Moved to text namespace |
| `shadow-sm` | `shadow-xs` | Size naming consistency |

### Default Value Changes

**Border Color:**
- **v3:** Default border color was `gray-200`
- **v4:** Default border color is `currentColor` (matches text color)

**Ring Width:**
- **v3:** Default `ring` class was 3px
- **v4:** Default `ring` class is 1px

**Placeholder Color:**
- **v3:** `theme(colors.gray.400)`  
- **v4:** 50% opacity of current text color

To maintain v3 behavior:
```css
@layer base {
  input::placeholder {
    color: theme(--color-gray-400);
  }
}
```

## New Features in v4

### Dynamic Utility Values

**v3:** Limited to predefined values
```html
<div class="grid grid-cols-[15]"> <!-- Arbitrary value needed -->
<div class="z-[999]"> <!-- Arbitrary value needed -->
```

**v4:** Any numeric value works
```html
<div class="grid grid-cols-15"> <!-- Just works -->
<div class="z-999"> <!-- Just works -->
<div class="w-73 h-42"> <!-- Any spacing value -->
```

### Data Attribute Support

**v3:** Required arbitrary values
```html
<div class="[&[data-state=open]]:opacity-100">
```

**v4:** Built-in data attribute variants
```html
<div class="data-[state=open]:opacity-100">
<div class="data-active:bg-blue-500">
```

### Container Queries (Built-in)

**v3:** Required plugin installation
```bash
npm install @tailwindcss/container-queries
```

**v4:** Built-in support
```html
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3">
    <!-- Responsive to container, not viewport -->
  </div>
  
  <!-- Max-width container queries -->
  <div class="hidden @max-md:block">
    <!-- Only show when container is smaller than md -->
  </div>
  
  <!-- Range queries -->
  <div class="@min-md:@max-xl:flex">
    <!-- Only flex when container is between md and xl -->
  </div>
</div>
```

### 3D Transforms

**v4 introduces comprehensive 3D transform utilities:**

```html
<div class="perspective-1000">
  <div class="transform-3d 
              rotate-x-12 rotate-y-45 rotate-z-30
              translate-z-10 scale-z-75
              hover:rotate-x-24">
    3D transformed element
  </div>
</div>
```

**Available 3D utilities:**
- `rotate-x-*`, `rotate-y-*`, `rotate-z-*`
- `translate-z-*`
- `scale-z-*`
- `perspective-*`
- `perspective-origin-*`
- `backface-visible`, `backface-hidden`
- `transform-3d`

### Enhanced Gradients

**Linear gradients** (renamed from `bg-gradient-*`):
```html
<div class="bg-linear-to-r from-blue-500 to-red-500">
```

**Conic gradients:**
```html
<div class="bg-conic from-red-500 to-blue-500">
<div class="bg-conic-[at_center] from-red-500 via-yellow-500 to-blue-500">
```

**Radial gradients:**
```html
<div class="bg-radial from-blue-500 to-transparent">
<div class="bg-radial-[at_top_left] from-white to-gray-900">
```

**Color interpolation:**
```html
<div class="bg-linear/[in_oklch] from-red-500 to-blue-500">
<div class="bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600">
```

### Modern CSS Features

**`@starting-style` support:**
```html
<div class="starting:opacity-0 opacity-100 transition-opacity">
  <!-- Animates from 0 to 100 opacity on first render -->
</div>
```

**`not-*` variant:**
```html
<div class="not-[:disabled]:hover:bg-blue-500">
  <!-- Only apply hover if not disabled -->
</div>
```

**P3 Color Palette:**
- More vivid colors using wider color gamut
- Better color representation on modern displays

## Custom Variants

### v3 Custom Variants
```js
// tailwind.config.js
module.exports = {
  plugins: [
    function({ addVariant }) {
      addVariant('third', '&:nth-child(3)')
      addVariant('hocus', ['&:hover', '&:focus'])
    }
  ]
}
```

### v4 Custom Variants
```css
@custom-variant third (&:nth-child(3));
@custom-variant hocus (&:hover, &:focus);
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Usage:
```html
<div class="third:bg-red-500 hocus:text-blue-600 theme-midnight:bg-black">
```

## Performance Improvements

### Build Speed Comparisons

- **Full builds:** Up to 5x faster
- **Incremental builds:** Up to 100x faster  
- **No changes:** Up to 182x faster (microseconds)

### New Oxide Engine Features

- **Rust-powered** performance-critical components
- **Lightning CSS** integration for parsing
- **Custom CSS parser** optimized for Tailwind
- **35% smaller** installed footprint
- **Single dependency** (Lightning CSS only)

## Browser Support & Compatibility

### Minimum Browser Requirements

- **Chrome 111+** (March 2023)
- **Safari 16.4+** (March 2023)  
- **Firefox 128+** (July 2024)

### No Longer Supported

- **CSS Preprocessors:** Sass, Less, Stylus not compatible
- **Internet Explorer:** Any version
- **Older PostCSS plugins:** `postcss-import`, `autoprefixer` built-in

### Modern CSS Features Used

- CSS Cascade Layers (`@layer`)
- Registered Custom Properties (`@property`)
- `color-mix()` function
- Container Queries
- `@starting-style`
- Field Sizing (`field-sizing: content`)

## Migration Checklist

### Automated Migration

Use the official upgrade tool:
```bash
npx @tailwindcss/upgrade
```

**Requirements:**
- Node.js 20+
- Run in a new Git branch
- Review all changes before merging

### Manual Migration Steps

1. **Update Dependencies**
   ```bash
   npm uninstall tailwindcss postcss autoprefixer postcss-import
   npm install tailwindcss@next @tailwindcss/vite
   ```

2. **Update CSS File**
   ```css
   /* Remove */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   /* Add */
   @import "tailwindcss";
   ```

3. **Migrate Configuration**
   - Delete `tailwind.config.js`
   - Move theme configuration to CSS using `@theme`
   - Convert custom utilities to `@utility` directive
   - Convert custom variants to `@custom-variant`

4. **Update Build Tools**
   - Remove PostCSS config (if using Vite plugin)
   - Configure Vite plugin if using Vite
   - Update other build tools as needed

5. **Fix Breaking Changes**
   - Update renamed utility classes
   - Handle border color changes
   - Fix ring width changes
   - Update shadow class names

6. **Test Thoroughly**
   - Visual regression testing
   - Cross-browser testing
   - Performance testing
   - Mobile/responsive testing

## Common Migration Issues

### `@apply` Not Working

**Problem:** `@apply` not recognized in component files

**Solution:** Use `@reference` directive or move to main CSS file
```css
@import "tailwindcss";
@reference; /* Enables @apply in this file */

.component {
  @apply bg-blue-500 text-white;
}
```

### Custom Properties Not Available

**Problem:** CSS variables not accessible in JavaScript

**Solution:** v4 exposes all theme values as CSS variables
```js
// These are automatically available
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');
```

### Plugin Compatibility

**Problem:** v3 plugins don't work in v4

**Solution:** 
- Check for v4-compatible versions
- Convert to CSS-first approach
- Use `@config` for JavaScript-based plugins if needed

## Best Practices for v4

### Theme Organization

**Organize by namespace:**
```css
@theme {
  /* Colors */
  --color-primary: #3B82F6;
  --color-secondary: #EF4444;
  
  /* Typography */
  --font-display: "Inter", sans-serif;
  --font-body: "Open Sans", sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  
  /* Breakpoints */
  --breakpoint-tablet: 48rem;
  --breakpoint-desktop: 64rem;
}
```

### Custom Utilities

**Keep utilities focused:**
```css
/* Good - Single purpose */
@utility center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Good - Related properties */
@utility card-base {
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: white;
}
```

### Performance Optimization

**Minimize theme overrides:**
```css
/* Instead of overriding everything */
@theme {
  --*: initial;
  /* Then redefining everything... */
}

/* Override only what you need */
@theme {
  --color-*: initial; /* Remove default colors only */
  --color-brand: #3B82F6;
  --color-accent: #EF4444;
}
```

## Conclusion

Tailwind CSS v4 represents a significant evolution of the framework, with major improvements in performance, developer experience, and modern CSS feature support. While the migration requires some effort, the benefits of faster builds, simpler configuration, and powerful new features make it worthwhile for most projects.

The key to successful migration is understanding the shift from JavaScript-based configuration to CSS-first configuration, and leveraging the automated upgrade tool to handle most of the mechanical changes.

For projects requiring older browser support, staying with v3.4 remains a viable option until browser requirements can be updated.