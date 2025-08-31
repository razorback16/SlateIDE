# Goals

* Left: **Sidebar-11** (ShadCN) hosting our **file explorer** (Tauri FS).
* Main: **Monaco** editor with tabs.
* **Resizable** panels (ShadCN wrapper over `react-resizable-panels`) in the main area (e.g., editor ↔ aux/preview pane).

  > Note: Sidebar-11 itself remains collapsible via `SidebarTrigger`; we keep it as the canonical Explorer. Resizable is used in the content area. (If you want the explorer itself to be resizable instead of Sidebar-11, see “Variant B” at the end.)

---

## 0) Install (once)

```bash
# editor + panels + icons
npm i @monaco-editor/react monaco-editor lucide-react

# shadcn resizable (wrapper around react-resizable-panels)
npx shadcn@latest add resizable
# If you prefer manual:
# npm i react-resizable-panels

# tauri v2 plugins (JS + Rust sides)
npm run tauri add fs
npm run tauri add dialog
npm run tauri add persisted-scope   # optional, to remember granted paths
```

---

## 1) Tauri v2 wiring

**`src-tauri/src/main.rs`**

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_persisted_scope::init()) // optional
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

**`src-tauri/tauri.conf.json`** (CSP for Monaco workers + inline styles)

```json
{
  "app": {
    "security": {
      "csp": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; worker-src 'self' blob:;"
    }
  }
}
```

**`src-tauri/capabilities/main.json`** (dev-friendly; tighten for prod)

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "windows": ["main"],
  "permissions": [
    "fs:read-dirs",
    "fs:read-files",
    "fs:write-files",
    { "identifier": "fs:scope", "allow": [{ "path": "$HOME/**/*" }] }
  ]
}
```

> Picking a folder via the Dialog plugin auto-adds it to FS scope; `persisted-scope` keeps it across restarts.

---

## 2) Monaco workers (Vite-friendly, offline build)

**`src/monaco-setup.ts`**

```ts
import * as monaco from "monaco-editor"
import { loader } from "@monaco-editor/react"

import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import JsonWorker   from "monaco-editor/esm/vs/language/json/json.worker?worker"
import CssWorker    from "monaco-editor/esm/vs/language/css/css.worker?worker"
import HtmlWorker   from "monaco-editor/esm/vs/language/html/html.worker?worker"
import TsWorker     from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

self.MonacoEnvironment = {
  getWorker(_: unknown, label: string) {
    if (label === "json") return new JsonWorker()
    if (label === "css" || label === "scss" || label === "less") return new CssWorker()
    if (label === "html" || label === "handlebars" || label === "razor") return new HtmlWorker()
    if (label === "typescript" || label === "javascript") return new TsWorker()
    return new EditorWorker()
  },
} as any

loader.config({ monaco })
export const initMonaco = () => loader.init()
```

---

## 3) Sidebar-11 as the Explorer (ShadCN)

Use your existing Sidebar-11 skeleton. Replace `AppSidebar` with this **file explorer** that talks to Tauri FS.

**`src/components/app-sidebar.tsx`**

```tsx
import * as React from "react"
import { FolderOpen, ChevronRight, ChevronDown, File, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
} from "@/components/ui/sidebar"
import { readDir, type FileEntry } from "@tauri-apps/plugin-fs"

type Node = { path: string; name: string; isDir: boolean; open?: boolean; children?: Node[] }
const norm = (p: string) => p.replace(/\\/g, "/")

export interface AppSidebarProps {
  rootDir: string | null
  onPickFolder: () => void
  onOpenFile: (path: string) => void
}

export function AppSidebar({ rootDir, onPickFolder, onOpenFile }: AppSidebarProps) {
  const [tree, setTree] = React.useState<Node[]>([])

  React.useEffect(() => { if (rootDir) void loadRoot(rootDir) }, [rootDir])

  async function loadRoot(root: string) {
    const entries = await readDir(root)
    setTree(await toNodes(entries))
  }
  async function toNodes(entries: FileEntry[]): Promise<Node[]> {
    return entries.map((e) => ({
      path: e.path,
      name: e.name ?? norm(e.path).split("/").pop()!,
      isDir: !!e.isDirectory,
    }))
  }
  async function toggle(node: Node) {
    if (!node.isDir) return
    node.open = !node.open
    if (node.open && !node.children) {
      const entries = await readDir(node.path)
      node.children = await toNodes(entries)
    }
    setTree((t) => [...t])
  }
  function render(nodes: Node[], depth = 0): React.ReactNode {
    return nodes
      .sort((a,b)=> Number(b.isDir)-Number(a.isDir) || a.name.localeCompare(b.name))
      .map((n) => (
        <div key={n.path}>
          <button
            onClick={() => (n.isDir ? toggle(n) : onOpenFile(n.path))}
            className="w-full text-left px-2 py-1 hover:bg-accent/40 flex items-center gap-1"
            style={{ paddingLeft: 6 + depth * 12 }}
          >
            {n.isDir ? (n.open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />) : <span className="w-4" />}
            {n.isDir ? <Folder className="h-4 w-4 mr-1" /> : <File className="h-4 w-4 mr-1" />}
            <span className="text-xs">{n.name}</span>
          </button>
          {n.isDir && n.open && n.children && render(n.children, depth + 1)}
        </div>
      ))
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-2 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium opacity-80">Explorer</span>
          <Button size="xs" variant="outline" onClick={onPickFolder}>
            <FolderOpen className="h-3.5 w-3.5 mr-1" /> Open
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider opacity-60 px-2">
            {rootDir ? "Project" : "No folder selected"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-0">
            <ScrollArea className="h-[calc(100vh-6rem)]">
              {!rootDir ? (
                <div className="p-3 text-xs opacity-60">Pick a folder to show files.</div>
              ) : (
                <div className="py-1">{render(tree)}</div>
              )}
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 py-2 text-[10px] opacity-60">Monaco + Tauri</SidebarFooter>
    </Sidebar>
  )
}
```

---

## 4) Page using **Sidebar-11 + ShadCN Resizable** (editor ↔ aux split)

We keep the official **Sidebar-11** layout. Inside `SidebarInset` we add **ShadCN Resizable** to split the **editor** and a **right aux panel** (e.g., Problems/Outline/Terminal).

**`src/app/page.tsx` (or your route)**

```tsx
import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { open } from "@tauri-apps/plugin-dialog"
import EditorView from "@/views/EditorView"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

type Tab = { path: string; name: string }
const norm = (p?: string | null) => (p ?? "").replace(/\\/g, "/")

export default function Page() {
  const [rootDir, setRootDir] = React.useState<string | null>(null)
  const [tabs, setTabs] = React.useState<Tab[]>([])
  const [active, setActive] = React.useState<string | null>(null)

  async function pickFolder() {
    const selected = await open({ directory: true })
    if (typeof selected === "string") setRootDir(selected)
  }
  function openFileTab(path: string) {
    const name = norm(path).split("/").pop() || path
    setTabs((t) => (t.find(x => x.path === path) ? t : [...t, { path, name }]))
    setActive(path)
  }

  const crumbParts = React.useMemo(() => {
    if (!rootDir || !active) return []
    const activeN = norm(active), rootN = norm(rootDir)
    const rel = activeN.startsWith(rootN) ? activeN.slice(rootN.length).replace(/^\/+/, "") : activeN
    return rel.split("/").filter(Boolean)
  }, [rootDir, active])

  return (
    <SidebarProvider>
      <AppSidebar rootDir={rootDir} onPickFolder={pickFolder} onOpenFile={openFileTab} />

      <SidebarInset>
        {/* Header stays identical to Sidebar-11 */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {crumbParts.length === 0 ? (
                <BreadcrumbItem><BreadcrumbPage>—</BreadcrumbPage></BreadcrumbItem>
              ) : (
                <>
                  {crumbParts.slice(0, -1).map((part, i) => (
                    <React.Fragment key={i}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">{part}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </React.Fragment>
                  ))}
                  <BreadcrumbItem>
                    <BreadcrumbPage>{crumbParts[crumbParts.length - 1]}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* ShadCN Resizable in the main content area */}
        <div className="flex-1 p-4">
          <ResizablePanelGroup direction="horizontal" className="rounded-xl border h-[calc(100vh-7.5rem)]">
            {/* Left main editor panel */}
            <ResizablePanel defaultSize={74} minSize={30}>
              <div className="h-full flex flex-col">
                <Tabs value={active ?? ""} onValueChange={setActive} className="flex-1 flex flex-col">
                  <TabsList className="justify-start overflow-x-auto">
                    {tabs.map(t => (
                      <TabsTrigger key={t.path} value={t.path} className="text-xs">{t.name}</TabsTrigger>
                    ))}
                  </TabsList>

                  {tabs.map(t => (
                    <TabsContent key={t.path} value={t.path} className="flex-1 border-t">
                      <div className="h-[calc(100vh-10.5rem)]">
                        <EditorView filePath={t.path} />
                      </div>
                    </TabsContent>
                  ))}
                  {!tabs.length && (
                    <div className="flex-1 grid place-items-center text-sm opacity-60">
                      Open a file from the Explorer to start editing.
                    </div>
                  )}
                </Tabs>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right aux panel (outline / problems / terminal placeholder) */}
            <ResizablePanel defaultSize={26} minSize={16}>
              <div className="h-full p-3 text-xs opacity-70">
                <div className="font-medium mb-2">Outline / Problems / Terminal</div>
                <div className="rounded-lg border h-[calc(100%-1.5rem)] p-2">
                  {/* Implement later: search, symbols, diagnostics, terminal, etc. */}
                  Coming soon…
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

---

## 5) Monaco editor view (autosave to Tauri FS)

**`src/views/EditorView.tsx`**

```tsx
import * as React from "react"
import Editor, { type OnMount } from "@monaco-editor/react"
import { initMonaco } from "@/monaco-setup"
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs"

export default function EditorView({ filePath }: { filePath: string }) {
  const mounted = React.useRef(false)
  React.useEffect(() => { initMonaco() }, [])
  const modelPath = React.useMemo(() => `file://${filePath.replace(/\\/g, "/")}`, [filePath])

  const onMount: OnMount = async (editor, monaco) => {
    if (mounted.current) return; mounted.current = true

    const initial = await readTextFile(filePath)
    const uri = monaco.Uri.parse(modelPath)
    const model = monaco.editor.getModel(uri) ?? monaco.editor.createModel(initial, undefined, uri)
    editor.setModel(model)

    monaco.editor.defineTheme("slate-dark", { base: "vs-dark", inherit: true, rules: [], colors: {} })
    monaco.editor.setTheme("slate-dark")

    let timer: number | undefined
    editor.onDidChangeModelContent(() => {
      if (timer) window.clearTimeout(timer)
      timer = window.setTimeout(async () => {
        await writeTextFile(filePath, editor.getValue())
      }, 400)
    })
  }

  return (
    <Editor
      path={modelPath}
      height="100%"
      options={{ automaticLayout: true, minimap: { enabled: false }, fontLigatures: true }}
      onMount={onMount}
    />
  )
}
```

---

## 6) QA Checklist (handy)

* [ ] `SidebarTrigger` collapses/expands Sidebar-11; Explorer nodes open/close; files open in tabs.
* [ ] Resizable handle appears between **editor** and **aux** panel; keyboard resizing works (ShadCN wrapper).
* [ ] Monaco loads with workers (no CSP or worker errors) in **dev** and **packaged** builds.
* [ ] Edits autosave (400ms debounce) via Tauri FS.
* [ ] Folder chosen via `Dialog.open({ directory: true })` becomes accessible; restart app still allowed (if `persisted-scope` enabled).

---
