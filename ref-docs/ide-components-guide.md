# IDE Components Reference Guide

A comprehensive reference for building IDE applications using shadcn/ui components with TypeScript/React.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Core Components](#core-components)
4. [Editor Components](#editor-components)
5. [Navigation & Layout](#navigation--layout)
6. [File Management](#file-management)
7. [Theme & Styling](#theme--styling)
8. [Integration Guide](#integration-guide)
9. [Best Practices](#best-practices)
10. [API Reference](#api-reference)

---

## Overview

This documentation serves as a comprehensive guide for developers building IDE applications using shadcn/ui components. The architecture follows shadcn/ui's **open code philosophy**, providing you with complete control over component implementation while maintaining consistency and accessibility.

### Key Principles

- **Component Composition**: Build complex IDE features from smaller, reusable components
- **Type Safety**: Leverage TypeScript for robust component interfaces
- **Accessibility**: All components follow WAI-ARIA standards via Radix UI primitives
- **Customization**: Full control over styling and behavior through the open code approach

---

## Architecture

### Component Hierarchy

```
IDE Application
├── Layout Components
│   ├── AppShell
│   ├── Sidebar
│   └── StatusBar
├── Editor Components
│   ├── CodeEditor
│   ├── EditorTabs
│   └── EditorActions
├── File Management
│   ├── FileExplorer
│   ├── FileTree
│   └── FilePreview
└── Utility Components
    ├── CommandPalette
    ├── SearchPanel
    └── SettingsDialog
```

### Data Flow Pattern

```typescript
interface IDEState {
  activeFile: string | null;
  openFiles: FileTab[];
  explorerState: ExplorerState;
  editorConfig: EditorConfig;
  theme: ThemeConfig;
}

interface FileTab {
  id: string;
  path: string;
  content: string;
  isDirty: boolean;
  language: string;
}
```

---

## Core Components

### AppShell

The main container component that orchestrates the entire IDE layout.

#### Props & API

```typescript
interface AppShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  statusBar?: React.ReactNode;
  className?: string;
  theme?: "light" | "dark" | "system";
}

const AppShell: React.FC<AppShellProps> = ({
  children,
  sidebar,
  statusBar,
  className,
  theme = "system"
}) => {
  return (
    <div className={cn("h-screen flex flex-col bg-background text-foreground", className)}>
      <div className="flex flex-1 overflow-hidden">
        {sidebar && (
          <aside className="w-64 border-r bg-muted/50">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
      {statusBar && (
        <footer className="h-6 border-t bg-muted/30 px-2 flex items-center text-xs">
          {statusBar}
        </footer>
      )}
    </div>
  );
};
```

#### Usage Example

```tsx
import { AppShell } from "@/components/ide/app-shell";
import { Sidebar } from "@/components/ide/sidebar";
import { StatusBar } from "@/components/ide/status-bar";

function IDEApp() {
  return (
    <AppShell
      sidebar={<Sidebar />}
      statusBar={<StatusBar />}
      theme="dark"
    >
      <EditorArea />
    </AppShell>
  );
}
```

### Sidebar

Collapsible sidebar component for navigation and file management.

#### Props & API

```typescript
interface SidebarProps {
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  defaultWidth = 256,
  minWidth = 200,
  maxWidth = 400,
  collapsible = true,
  children,
  className
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <ResizablePanel
      defaultSize={width}
      minSize={minWidth}
      maxSize={maxWidth}
      collapsible={collapsible}
      className={cn("border-r bg-muted/50", className)}
    >
      {!isCollapsed && children}
      {collapsible && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-4 h-6 w-6 rounded-full border bg-background shadow"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      )}
    </ResizablePanel>
  );
};
```

---

## Editor Components

### CodeEditor

Monaco Editor integration with shadcn/ui theming and TypeScript support.

#### Props & API

```typescript
interface CodeEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  path?: string;
  theme?: "light" | "dark";
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  className?: string;
  height?: string | number;
  loading?: React.ReactNode;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  language,
  onChange,
  onMount,
  path,
  theme = "dark",
  options = {},
  className,
  height = "100%",
  loading = <div className="flex items-center justify-center h-full">Loading...</div>
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  
  const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    lineHeight: 1.5,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: "on",
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    ...options
  };

  return (
    <div className={cn("h-full border rounded-md overflow-hidden", className)}>
      <MonacoEditor
        height={height}
        language={language}
        value={value}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        options={defaultOptions}
        onChange={(val) => onChange(val || "")}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          onMount?.(editor);
        }}
        loading={loading}
        path={path}
      />
    </div>
  );
};
```

#### Usage Example

```tsx
import { CodeEditor } from "@/components/ide/code-editor";

function EditorPanel() {
  const [code, setCode] = useState('console.log("Hello, World!");');
  
  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // Configure editor commands, decorations, etc.
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save file logic
    });
  };
  
  return (
    <CodeEditor
      value={code}
      language="typescript"
      onChange={setCode}
      onMount={handleEditorMount}
      theme="dark"
      height="100vh"
    />
  );
}
```

### EditorTabs

Tab management for multiple open files.

#### Props & API

```typescript
interface EditorTab {
  id: string;
  title: string;
  path: string;
  isDirty?: boolean;
  language?: string;
  icon?: React.ReactNode;
}

interface EditorTabsProps {
  tabs: EditorTab[];
  activeTab: string | null;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabReorder?: (tabs: EditorTab[]) => void;
  maxTabs?: number;
  className?: string;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onTabClose,
  onTabReorder,
  maxTabs = 20,
  className
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={className}>
      <TabsList className="w-full justify-start rounded-none border-b h-10 px-0">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tabs" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex"
              >
                {tabs.map((tab, index) => (
                  <Draggable key={tab.id} draggableId={tab.id} index={index}>
                    {(provided, snapshot) => (
                      <TabsTrigger
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        value={tab.id}
                        className={cn(
                          "relative group h-10 px-3 rounded-none border-r",
                          snapshot.isDragging && "bg-accent"
                        )}
                      >
                        {tab.icon && <span className="mr-2">{tab.icon}</span>}
                        <span className="truncate max-w-[120px]">
                          {tab.title}
                        </span>
                        {tab.isDirty && (
                          <span className="ml-1 w-2 h-2 rounded-full bg-orange-500" />
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTabClose(tab.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </TabsTrigger>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </TabsList>
    </Tabs>
  );
};
```

---

## Navigation & Layout

### ResizablePanels

Layout system for creating resizable IDE panels.

#### Props & API

```typescript
interface ResizablePanelsProps {
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
  className?: string;
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  direction = "horizontal",
  children,
  className
}) => {
  return (
    <ResizablePanelGroup 
      direction={direction} 
      className={cn("h-full", className)}
    >
      {children}
    </ResizablePanelGroup>
  );
};

interface ResizablePanelProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  collapsible = false,
  children,
  className
}) => {
  return (
    <Panel
      defaultSize={defaultSize}
      minSize={minSize}
      maxSize={maxSize}
      collapsible={collapsible}
      className={className}
    >
      {children}
    </Panel>
  );
};
```

#### Usage Example

```tsx
<ResizablePanels direction="horizontal">
  <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
    <FileExplorer />
  </ResizablePanel>
  <PanelResizeHandle />
  <ResizablePanel defaultSize={80}>
    <ResizablePanels direction="vertical">
      <ResizablePanel defaultSize={70}>
        <EditorArea />
      </ResizablePanel>
      <PanelResizeHandle />
      <ResizablePanel defaultSize={30} collapsible>
        <Terminal />
      </ResizablePanel>
    </ResizablePanels>
  </ResizablePanel>
</ResizablePanels>
```

---

## File Management

### FileExplorer

Complete file system navigation component.

#### Props & API

```typescript
interface FileSystemItem {
  name: string;
  path: string;
  type: "file" | "directory";
  size?: number;
  modified?: Date;
  children?: FileSystemItem[];
}

interface FileExplorerProps {
  rootPath: string;
  onFileSelect: (path: string) => void;
  onFileOpen: (path: string) => void;
  onFileCreate: (path: string, type: "file" | "directory") => void;
  onFileDelete: (path: string) => void;
  onFileRename: (oldPath: string, newPath: string) => void;
  selectedPath?: string;
  expandedPaths?: Set<string>;
  className?: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  rootPath,
  onFileSelect,
  onFileOpen,
  onFileCreate,
  onFileDelete,
  onFileRename,
  selectedPath,
  expandedPaths = new Set(),
  className
}) => {
  const [fileTree, setFileTree] = useState<FileSystemItem[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    path: string;
    type: "file" | "directory";
  } | null>(null);

  return (
    <div className={cn("h-full overflow-auto", className)}>
      <div className="p-2 border-b">
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4" />
          <span className="font-medium text-sm">Explorer</span>
          <div className="ml-auto flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onFileCreate(rootPath, "file")}
            >
              <FileText className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onFileCreate(rootPath, "directory")}
            >
              <FolderPlus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <FileTree
        items={fileTree}
        selectedPath={selectedPath}
        expandedPaths={expandedPaths}
        onSelect={onFileSelect}
        onDoubleClick={onFileOpen}
        onContextMenu={setContextMenu}
      />
      
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        >
          <ContextMenuItem onClick={() => onFileOpen(contextMenu.path)}>
            Open
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onFileRename(contextMenu.path, "")}>
            Rename
          </ContextMenuItem>
          <ContextMenuItem 
            onClick={() => onFileDelete(contextMenu.path)}
            className="text-red-600"
          >
            Delete
          </ContextMenuItem>
        </ContextMenu>
      )}
    </div>
  );
};
```

### FileTree

Recursive tree component for file system navigation.

```typescript
interface FileTreeProps {
  items: FileSystemItem[];
  selectedPath?: string;
  expandedPaths: Set<string>;
  onSelect: (path: string) => void;
  onDoubleClick: (path: string) => void;
  onContextMenu: (event: { x: number; y: number; path: string; type: "file" | "directory" }) => void;
  level?: number;
}

const FileTree: React.FC<FileTreeProps> = ({
  items,
  selectedPath,
  expandedPaths,
  onSelect,
  onDoubleClick,
  onContextMenu,
  level = 0
}) => {
  const getFileIcon = (name: string, type: "file" | "directory") => {
    if (type === "directory") {
      return <Folder className="h-4 w-4 text-blue-500" />;
    }
    
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'js':
      case 'jsx':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'css':
      case 'scss':
        return <FileText className="h-4 w-4 text-pink-500" />;
      case 'html':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'json':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="select-none">
      {items.map((item) => {
        const isExpanded = expandedPaths.has(item.path);
        const isSelected = selectedPath === item.path;
        
        return (
          <div key={item.path}>
            <div
              className={cn(
                "flex items-center py-1 px-2 hover:bg-accent cursor-pointer",
                isSelected && "bg-accent",
                "transition-colors"
              )}
              style={{ paddingLeft: `${(level * 12) + 8}px` }}
              onClick={() => onSelect(item.path)}
              onDoubleClick={() => onDoubleClick(item.path)}
              onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  path: item.path,
                  type: item.type
                });
              }}
            >
              {item.type === "directory" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 mr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle expansion
                  }}
                >
                  {isExpanded ? 
                    <ChevronDown className="h-3 w-3" /> : 
                    <ChevronRight className="h-3 w-3" />
                  }
                </Button>
              )}
              {getFileIcon(item.name, item.type)}
              <span className="ml-2 text-sm truncate">{item.name}</span>
            </div>
            
            {item.type === "directory" && isExpanded && item.children && (
              <FileTree
                items={item.children}
                selectedPath={selectedPath}
                expandedPaths={expandedPaths}
                onSelect={onSelect}
                onDoubleClick={onDoubleClick}
                onContextMenu={onContextMenu}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
```

---

## Theme & Styling

### ThemeProvider

Centralized theme management for the entire IDE.

```typescript
interface IDETheme {
  name: string;
  cssVariables: Record<string, string>;
  monacoTheme: string;
  className: string;
}

const themes: Record<string, IDETheme> = {
  light: {
    name: "Light",
    cssVariables: {
      "--background": "0 0% 100%",
      "--foreground": "222.2 84% 4.9%",
      "--primary": "221.2 83.2% 53.3%",
      "--muted": "210 40% 96%",
      "--accent": "210 40% 90%"
    },
    monacoTheme: "vs",
    className: "theme-light"
  },
  dark: {
    name: "Dark",
    cssVariables: {
      "--background": "222.2 84% 4.9%",
      "--foreground": "210 40% 98%",
      "--primary": "217.2 91.2% 59.8%",
      "--muted": "217.2 32.6% 17.5%",
      "--accent": "217.2 32.6% 20%"
    },
    monacoTheme: "vs-dark",
    className: "theme-dark"
  }
};

interface ThemeProviderProps {
  defaultTheme?: string;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultTheme = "dark",
  children
}) => {
  const [theme, setTheme] = useState(defaultTheme);
  
  useEffect(() => {
    const root = document.documentElement;
    const activeTheme = themes[theme];
    
    Object.entries(activeTheme.cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    root.className = activeTheme.className;
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## Integration Guide

### Setting up the IDE

```tsx
// main.tsx
import { createRoot } from 'react-dom/client';
import { IDEApp } from './components/ide/ide-app';
import { ThemeProvider } from './components/ui/theme-provider';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark">
    <IDEApp />
  </ThemeProvider>
);

// components/ide/ide-app.tsx
export function IDEApp() {
  const [openFiles, setOpenFiles] = useState<FileTab[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  
  return (
    <AppShell
      sidebar={
        <FileExplorer
          rootPath="/workspace"
          onFileOpen={handleFileOpen}
          selectedPath={activeFile}
        />
      }
      statusBar={<StatusBar />}
    >
      <ResizablePanels>
        <ResizablePanel defaultSize={75}>
          <EditorArea
            files={openFiles}
            activeFile={activeFile}
            onFileChange={handleFileChange}
          />
        </ResizablePanel>
        <PanelResizeHandle />
        <ResizablePanel defaultSize={25} collapsible>
          <TerminalPanel />
        </ResizablePanel>
      </ResizablePanels>
    </AppShell>
  );
}
```

### File Management Integration

```typescript
// hooks/useFileSystem.ts
export function useFileSystem(rootPath: string) {
  const [fileTree, setFileTree] = useState<FileSystemItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const loadDirectory = async (path: string): Promise<FileSystemItem[]> => {
    try {
      const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
      return await response.json();
    } catch (error) {
      console.error("Failed to load directory:", error);
      return [];
    }
  };
  
  const createFile = async (path: string, type: "file" | "directory") => {
    try {
      await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, type })
      });
      // Refresh file tree
      await loadFileTree();
    } catch (error) {
      console.error("Failed to create file:", error);
    }
  };
  
  const loadFileTree = async () => {
    setLoading(true);
    const tree = await loadDirectory(rootPath);
    setFileTree(tree);
    setLoading(false);
  };
  
  useEffect(() => {
    loadFileTree();
  }, [rootPath]);
  
  return {
    fileTree,
    loading,
    createFile,
    deleteFile,
    renameFile,
    loadFileTree
  };
}
```

---

## Best Practices

### Component Organization

```
components/
├── ide/
│   ├── editor/
│   │   ├── code-editor.tsx
│   │   ├── editor-tabs.tsx
│   │   └── editor-actions.tsx
│   ├── file-explorer/
│   │   ├── file-explorer.tsx
│   │   ├── file-tree.tsx
│   │   └── context-menu.tsx
│   ├── layout/
│   │   ├── app-shell.tsx
│   │   ├── sidebar.tsx
│   │   └── status-bar.tsx
│   └── index.ts
├── ui/ (shadcn/ui components)
└── hooks/
    ├── useFileSystem.ts
    ├── useEditor.ts
    └── useTheme.ts
```

### Type Safety Guidelines

```typescript
// Define strict interfaces
interface EditorConfig {
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  minimap: boolean;
}

// Use discriminated unions for component variants
type PanelType = 
  | { type: "editor"; content: string; language: string }
  | { type: "terminal"; session: string }
  | { type: "preview"; url: string };

// Leverage generic types for reusable components
interface TreeNode<T = any> {
  id: string;
  label: string;
  children?: TreeNode<T>[];
  data: T;
}

interface TreeProps<T> {
  nodes: TreeNode<T>[];
  onSelect: (node: TreeNode<T>) => void;
  renderNode?: (node: TreeNode<T>) => React.ReactNode;
}
```

### Performance Optimization

```typescript
// Lazy load heavy components
const CodeEditor = lazy(() => import("./code-editor"));
const Terminal = lazy(() => import("./terminal"));

// Memoize expensive computations
const FileTree = memo(({ items, ...props }) => {
  const sortedItems = useMemo(() => 
    items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "directory" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    }),
    [items]
  );
  
  return <TreeView items={sortedItems} {...props} />;
});

// Virtualize large lists
import { FixedSizeList as List } from "react-window";

const VirtualizedFileList = ({ files }) => (
  <List
    height={600}
    itemCount={files.length}
    itemSize={24}
    itemData={files}
  >
    {FileItem}
  </List>
);
```

### Accessibility Considerations

```typescript
// Keyboard navigation support
const useKeyboardNavigation = (items: any[], onSelect: (item: any) => void) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          onSelect(items[selectedIndex]);
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onSelect]);
  
  return selectedIndex;
};

// ARIA attributes for screen readers
<div
  role="tree"
  aria-label="File Explorer"
  tabIndex={0}
>
  {items.map((item, index) => (
    <div
      key={item.id}
      role="treeitem"
      aria-selected={selectedIndex === index}
      aria-expanded={item.type === "directory" ? isExpanded : undefined}
      tabIndex={-1}
    >
      {item.name}
    </div>
  ))}
</div>
```

---

## API Reference

### Core Types

```typescript
// File System Types
interface FileSystemItem {
  name: string;
  path: string;
  type: "file" | "directory";
  size?: number;
  modified?: Date;
  children?: FileSystemItem[];
}

// Editor Types
interface EditorTab {
  id: string;
  title: string;
  path: string;
  content: string;
  language: string;
  isDirty: boolean;
  cursorPosition?: monaco.Position;
  viewState?: monaco.editor.ICodeEditorViewState;
}

// Theme Types
interface ThemeConfig {
  name: string;
  type: "light" | "dark";
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
  monacoTheme: string;
}

// IDE State Types
interface IDEState {
  files: {
    open: EditorTab[];
    active: string | null;
    tree: FileSystemItem[];
  };
  editor: {
    config: EditorConfig;
    theme: string;
  };
  layout: {
    sidebar: { width: number; collapsed: boolean };
    panels: PanelConfig[];
  };
}
```

### Component Props Reference

| Component | Required Props | Optional Props | Default Values |
|-----------|---------------|----------------|----------------|
| `AppShell` | `children` | `sidebar`, `statusBar`, `theme`, `className` | `theme: "system"` |
| `CodeEditor` | `value`, `language`, `onChange` | `theme`, `options`, `height`, `path`, `onMount` | `theme: "dark"`, `height: "100%"` |
| `FileExplorer` | `rootPath`, `onFileSelect`, `onFileOpen` | `selectedPath`, `expandedPaths`, `className` | `expandedPaths: new Set()` |
| `EditorTabs` | `tabs`, `activeTab`, `onTabChange`, `onTabClose` | `onTabReorder`, `maxTabs`, `className` | `maxTabs: 20` |
| `Sidebar` | `children` | `defaultWidth`, `minWidth`, `maxWidth`, `collapsible` | `defaultWidth: 256`, `collapsible: true` |

### Event Handlers

```typescript
// File Explorer Events
interface FileExplorerEvents {
  onFileSelect: (path: string) => void;
  onFileOpen: (path: string) => void;
  onFileCreate: (path: string, type: "file" | "directory") => Promise<void>;
  onFileDelete: (path: string) => Promise<void>;
  onFileRename: (oldPath: string, newPath: string) => Promise<void>;
  onFileCopy: (srcPath: string, destPath: string) => Promise<void>;
  onFileMove: (srcPath: string, destPath: string) => Promise<void>;
}

// Editor Events
interface EditorEvents {
  onChange: (value: string, event: monaco.editor.IModelContentChangedEvent) => void;
  onMount: (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => void;
  onFocus: (event: monaco.editor.IEditorFocusEvent) => void;
  onBlur: (event: monaco.editor.IEditorBlurEvent) => void;
  onCursorPositionChange: (event: monaco.editor.ICursorPositionChangedEvent) => void;
}

// Tab Events
interface TabEvents {
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabReorder: (tabs: EditorTab[]) => void;
  onTabContextMenu: (tabId: string, event: React.MouseEvent) => void;
}
```

### Utility Functions

```typescript
// File type detection
export const getFileLanguage = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    'ts': 'typescript',
    'tsx': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'json': 'json',
    'md': 'markdown',
    'py': 'python',
    'rs': 'rust',
    'go': 'go',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
  };
  return languageMap[ext || ''] || 'plaintext';
};

// Path utilities
export const getFileName = (path: string): string => {
  return path.split('/').pop() || path;
};

export const getFileExtension = (path: string): string => {
  return path.split('.').pop()?.toLowerCase() || '';
};

export const getDirectoryPath = (path: string): string => {
  const parts = path.split('/');
  return parts.slice(0, -1).join('/') || '/';
};

// Theme utilities
export const applyTheme = (theme: ThemeConfig) => {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  root.setAttribute('data-theme', theme.type);
};
```

---

## Conclusion

This documentation provides a comprehensive foundation for building IDE applications with shadcn/ui components. The architecture emphasizes:

- **Component composition** over monolithic structures
- **Type safety** through TypeScript interfaces
- **Accessibility** via Radix UI primitives  
- **Customization** through the open code philosophy
- **Performance** through lazy loading and memoization
- **Maintainability** through clear separation of concerns

Remember that shadcn/ui is not a traditional component library but a system for building your own component library. Use this guide as a starting point, then customize and extend the components to match your specific IDE requirements.

For additional resources and community examples, refer to the [shadcn/ui documentation](https://ui.shadcn.com) and explore the growing ecosystem of community-contributed components.

---

*Last updated: August 26, 2025*