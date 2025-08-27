# Complete shadcn/ui Reference Guide for React + Vite + Tauri

## Table of Contents

1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Tauri Integration](#tauri-integration)
4. [Component Reference](#component-reference)
5. [CLI Commands](#cli-commands)
6. [Configuration](#configuration)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Introduction

**shadcn/ui** is not a traditional component library. It's a code distribution system that provides beautifully designed, accessible components that you copy directly into your project. This approach gives you full control over component customization and eliminates the need for style overrides.

### Key Principles

- **Open Code**: Complete access to component source code for unlimited customization
- **Composition**: All components use a common, composable interface
- **Distribution**: Flat-file schema with CLI for easy component distribution
- **Beautiful Defaults**: Carefully chosen default styles for immediate use
- **AI-Ready**: Open code structure optimized for LLM integration

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- React project with Vite
- TypeScript (recommended)

### 1. Create Vite React Project

```bash
# Create new Vite project with React + TypeScript template
npm create vite@latest my-shadcn-app -- --template react-ts
cd my-shadcn-app
npm install
```

### 2. Install and Configure Tailwind CSS

```bash
# Install Tailwind CSS and dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Update `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Replace `src/index.css` content

```css
@import "tailwindcss";
```

### 3. Configure TypeScript Paths

#### Update `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ... other options
  }
}
```

#### Update `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ... other options
  }
}
```

### 4. Configure Vite

#### Update `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Install `@types/node` if needed:

```bash
npm install -D @types/node
```

### 5. Initialize shadcn/ui

```bash
npx shadcn@latest init
```

You'll be prompted to configure:

- **TypeScript**: Yes (recommended)
- **Style**: Default or New York
- **Base color**: Slate, Gray, Zinc, Neutral, or Stone
- **Global CSS file**: `src/index.css`
- **Tailwind config**: `tailwind.config.js`
- **Component alias**: `@/components`
- **Utils alias**: `@/lib/utils`
- **React Server Components**: No (for Vite)
- **CSS variables**: Yes (recommended)

### 6. Add Your First Component

```bash
npx shadcn@latest add button
```

#### Use the component

```tsx
// src/App.tsx
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="p-4">
      <Button>Click me</Button>
    </div>
  )
}

export default App
```

## Tauri Integration

### Setting up shadcn/ui in a Tauri Project

If you're building a Tauri desktop application, shadcn/ui integrates seamlessly since Tauri uses web technologies for the frontend.

#### 1. Create Tauri Project with Vite

```bash
# Use create-tauri-app with Vite template
npm create tauri-app@latest my-tauri-app
# Select: TypeScript/JavaScript -> Vite -> React -> TypeScript
cd my-tauri-app
npm install
```

#### 2. Follow Standard Setup

Follow the same installation steps as above (steps 2-6) within your Tauri project's `src` directory.

#### 3. Tauri-Specific Considerations

- **Window Controls**: Consider using `tauri-controls` for native-looking window controls
- **Bundle Size**: shadcn/ui components are optimized and won't significantly impact bundle size
- **Native Integration**: Components work seamlessly with Tauri's native APIs

#### 4. Example Tauri-Optimized Component

```tsx
// src/components/AppHeader.tsx
import { Button } from '@/components/ui/button'
import { X, Minus, Square } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="flex justify-between items-center p-2 bg-background border-b">
      <h1 className="text-lg font-semibold">My Tauri App</h1>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon">
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Square className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
```

## Component Reference

### Complete List of Available Components (51 Total)

1. **Accordion** - Collapsible content sections
2. **Alert** - Display important messages
3. **Alert Dialog** - Modal dialogs for critical actions
4. **Aspect Ratio** - Maintain consistent aspect ratios
5. **Avatar** - User profile pictures with fallbacks
6. **Badge** - Small status indicators
7. **Breadcrumb** - Navigation hierarchy
8. **Button** - Interactive buttons with variants
9. **Calendar** - Date selection component
10. **Card** - Content containers
11. **Carousel** - Image/content sliders
12. **Chart** - Data visualization components
13. **Checkbox** - Boolean input controls
14. **Collapsible** - Expandable content areas
15. **Combobox** - Searchable select input
16. **Command** - Command palette interface
17. **Context Menu** - Right-click menus
18. **Data Table** - Feature-rich table component
19. **Date Picker** - Date selection input
20. **Dialog** - Modal dialogs
21. **Drawer** - Sliding panel component
22. **Dropdown Menu** - Menu dropdowns
23. **React Hook Form** - Form integration
24. **Hover Card** - Popover on hover
25. **Input** - Text input fields
26. **Input OTP** - One-time password input
27. **Label** - Form labels
28. **Menubar** - Application menu bar
29. **Navigation Menu** - Site navigation
30. **Pagination** - Page navigation controls
31. **Popover** - Floating content panels
32. **Progress** - Progress indicators
33. **Radio Group** - Single-choice options
34. **Resizable** - Resizable panels
35. **Scroll-area** - Custom scrollable areas
36. **Select** - Dropdown selection
37. **Separator** - Visual dividers
38. **Sheet** - Side panels/drawers
39. **Sidebar** - Application sidebars
40. **Skeleton** - Loading placeholders
41. **Slider** - Range input controls
42. **Sonner** - Toast notifications
43. **Switch** - Toggle controls
44. **Table** - Basic data tables
45. **Tabs** - Tabbed content
46. **Textarea** - Multi-line text input
47. **Toast** - Notification messages
48. **Toggle** - Toggle buttons
49. **Toggle Group** - Toggle button groups
50. **Tooltip** - Contextual information
51. **Typography** - Text styling utilities

### Common Component Patterns

#### Button Component

```tsx
// Installation
npx shadcn@latest add button

// Usage
import { Button } from '@/components/ui/button'

// Variants
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// As Child (renders as different element)
<Button asChild>
  <a href="/about">About</a>
</Button>
```

#### Input Component

```tsx
// Installation
npx shadcn@latest add input label

// Usage
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter your email" 
  />
</div>
```

#### Card Component

```tsx
// Installation
npx shadcn@latest add card

// Usage
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
        {/* Form content */}
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

#### Dialog Component

```tsx
// Installation
npx shadcn@latest add dialog

// Usage
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Component Customization

#### Extending Component Props

```tsx
// Extending Button component
interface CustomButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  loading?: boolean
  icon?: React.ReactNode
}

const CustomButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  CustomButtonProps
>(({ className, loading, icon, children, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn(loading && "opacity-50", className)}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && <Spinner className="mr-2 h-4 w-4" />}
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </Button>
))
CustomButton.displayName = "CustomButton"
```

#### Using Variants with CVA

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## CLI Commands

### Basic Commands

```bash
# Initialize shadcn/ui in your project
npx shadcn@latest init

# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog

# Add all components
npx shadcn@latest add --all

# View component before installing
npx shadcn@latest view button

# Search for components
npx shadcn@latest search table

# List all available components
npx shadcn@latest list
```

### CLI Options

```bash
# Skip confirmation prompts
npx shadcn@latest add button --yes

# Overwrite existing files
npx shadcn@latest add button --overwrite

# Specify custom path
npx shadcn@latest add button --path ./src/components

# Add with specific registry
npx shadcn@latest add button --registry https://example.com/registry
```

## Configuration

### components.json

This file is created after running `npx shadcn@latest init` and controls how components are generated.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Theming

#### CSS Variables (Recommended)

```css
/* src/index.css */
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}
```

#### Dark Mode Setup

```tsx
// src/components/ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const ThemeProviderContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'system',
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
```

### Form Integration

#### React Hook Form Example

```tsx
// Installation
npx shadcn@latest add form input label button

// Usage
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Best Practices

### 1. Component Organization

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── custom/            # Your custom components
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   └── forms/             # Form-specific components
│       └── profile-form.tsx
├── lib/
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Schema validations
└── hooks/                 # Custom hooks
    └── use-theme.ts
```

### 2. Customization Strategy

- **Modify components directly** for project-specific needs
- **Create wrapper components** for reusable customizations
- **Use CSS variables** for theming
- **Leverage Tailwind utilities** for quick styling

### 3. TypeScript Best Practices

```tsx
// Always type your component props
interface CustomComponentProps {
  title: string
  description?: string
  children: React.ReactNode
}

// Use proper forwarding for custom components
const CustomComponent = React.forwardRef<
  HTMLDivElement,
  CustomComponentProps
>(({ title, description, children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {/* component content */}
  </div>
))
CustomComponent.displayName = "CustomComponent"
```

### 4. Performance Optimization

```tsx
// Lazy load heavy components
const DataTable = React.lazy(() => import('@/components/ui/data-table'))

// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // component logic
})

// Optimize bundle size by importing only needed icons
import { ChevronDown, X, Check } from 'lucide-react'
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Module Resolution Errors

**Error**: `Cannot resolve '@/components/ui/button'`

**Solution**:
```bash
# Ensure path aliases are configured correctly
# Check tsconfig.json and vite.config.ts
npm install -D @types/node
```

#### 2. Tailwind Styles Not Applied

**Error**: Components appear unstyled

**Solution**:
```css
/* Ensure Tailwind is imported in src/index.css */
@import "tailwindcss";

/* Or use the traditional approach */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 3. Dark Mode Not Working

**Solution**:
```tsx
// Ensure ThemeProvider wraps your app
// Check that 'dark' class is applied to html element
// Verify CSS variables are defined for both themes
```

#### 4. Component Not Found After Installation

**Solution**:
```bash
# Reinstall the component
npx shadcn@latest add button --overwrite

# Check components.json configuration
# Verify file was created in correct location
```

#### 5. TypeScript Errors

**Error**: Type errors with component props

**Solution**:
```tsx
// Use proper type imports
import type { ComponentProps } from 'react'
import type { VariantProps } from 'class-variance-authority'

// Extend component props properly
interface CustomProps extends ComponentProps<'button'> {
  // custom props
}
```

### JavaScript Projects

For JavaScript projects without TypeScript:

1. Create `jsconfig.json` instead of `tsconfig.json`
2. Remove type annotations from copied components
3. Use `components.json` with `"tsx": false`

```json
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tauri-Specific Issues

1. **Bundle Size**: shadcn/ui components are optimized and tree-shakeable
2. **Native Integration**: Components work with Tauri's invoke functions
3. **Window Controls**: Consider integrating with tauri-controls for native feel
4. **File System**: Use Tauri APIs for file operations, not web APIs

## Conclusion

This reference guide covers everything you need to implement shadcn/ui in your React + Vite + Tauri projects. The key advantages of shadcn/ui are:

- **Full control** over component code
- **No runtime dependencies** for components
- **Excellent TypeScript support**
- **Flexible customization**
- **Modern, accessible design**
- **Perfect for Tauri desktop applications**

Remember that shadcn/ui is not just a component library—it's a new paradigm for building component systems that gives you ownership and control over your UI code while maintaining consistency and quality.

For the most up-to-date information, always refer to the [official shadcn/ui documentation](https://ui.shadcn.com/docs).