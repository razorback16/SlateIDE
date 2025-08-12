# Claude Code IDE - High-Fidelity Layout Blueprint

## Main Application Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER BAR (48px)                                                          │
├─────┬───────────────────────────────────────────────────────────────────────┤
│     │                                                                       │
│  S  │                         MAIN CONTENT AREA                            │
│  I  │                                                                       │
│  D  │                                                                       │
│  E  │                                                                       │
│     │                                                                       │
│  B  │                                                                       │
│  A  │                                                                       │
│  R  │                                                                       │
│     │                                                                       │
│(60) │                                                                       │
└─────┴───────────────────────────────────────────────────────────────────────┘
```

## 1. Header Bar (48px height)
- **Left**: Logo/Brand mark (24x24)
- **Center**: 
  - Session breadcrumb: `Project Name > Session #12 > Branch: feature-auth`
  - Quick actions: Resume | Branch | New Session
- **Right**:
  - Command Palette trigger `⌘K`
  - Status indicators (MCP connections, sub-agents active)
  - User avatar/settings dropdown

## 2. Sidebar Navigation (60px collapsed / 240px expanded)

### Icon-First Navigation (top to bottom):
```
┌──────┐
│  📂  │ Codebase
├──────┤
│  💬  │ Chat
├──────┤
│  🔌  │ MCP
├──────┤
│  🤖  │ Sub-agents
├──────┤
│  🔗  │ Hooks
├──────┤
│  📦  │ Git
├──────┤
│  ⚙️  │ Settings
└──────┘
```

**Behavior**: 
- Hover expands to show labels
- Click switches main content area
- Active state highlighted with accent color
- Badge indicators for activity (e.g., pending changes in Git)

## 3. Main Content Area Layouts

### 3.1 CODEBASE VIEW (Default)
```
┌─────────────────────────────────────────────────────────────────────────┐
│ TAB BAR: Working Set | Tree+ | Code Map | Search                       │
├───────────────────┬─────────────────────────────┬─────────────────────┤
│                   │                             │                     │
│  FILE EXPLORER    │     CODE EDITOR             │   CONTEXT PANE      │
│  (240px)          │     (flex: 1)               │   (320px)           │
│                   │                             │                     │
│ ┌───────────────┐ │ ┌─────────────────────────┐ │ ┌─────────────────┐ │
│ │Working Set    │ │ │file.ts                  │ │ │Outline          │ │
│ │◆ auth.ts  *   │ │ │─────────────────────────│ │ │├─ Functions     │ │
│ │◆ user.ts      │ │ │1  import { User }       │ │ │├─ Classes       │ │
│ │◆ api.ts   *   │ │ │2  from './types';       │ │ │└─ Exports       │ │
│ │               │ │ │3                        │ │ │                 │ │
│ │AI Suggested:  │ │ │4  export async function │ │ │Related:         │ │
│ │○ types.ts     │ │ │5    authenticate(       │ │ │• login.ts       │ │
│ │○ config.ts    │ │ │6      credentials       │ │ │• session.ts     │ │
│ └───────────────┘ │ └─────────────────────────┘ │ └─────────────────┘ │
│                   │                             │                     │
│                   │ DIFF OVERLAY (when active): │                     │
│                   │ ┌─────────────────────────┐ │                     │
│                   │ │- old line               │ │                     │
│                   │ │+ new line               │ │                     │
│                   │ │ [Accept] [Reject]       │ │                     │
│                   │ └─────────────────────────┘ │                     │
└───────────────────┴─────────────────────────────┴─────────────────────┘
```

### 3.2 CHAT VIEW
```
┌─────────────────────────────────────────────────────────────────────────┐
│ CHAT HEADER: Claude Code | Sub-agent: Testing | Trail: 47 actions      │
├─────────────────────┬───────────────────────────────────────────────────┤
│                     │                                                   │
│   CLAUDE TRAIL      │              CONVERSATION                         │
│   (280px)           │              (flex: 1)                            │
│                     │                                                   │
│ ┌─────────────────┐ │ ┌───────────────────────────────────────────────┐ │
│ │Timeline         │ │ │ User: Fix the auth bug                         │ │
│ │─────────────────│ │ ├───────────────────────────────────────────────┤ │
│ │14:32 Read       │ │ │ Claude: I'll help fix the auth bug. Let me    │ │
│ │  └ auth.ts      │ │ │ examine the code first...                      │ │
│ │14:33 Edit       │ │ │                                                │ │
│ │  └ auth.ts:45   │ │ │ [Code block showing analysis]                  │ │
│ │14:33 Test       │ │ ├───────────────────────────────────────────────┤ │
│ │  └ auth.test.ts │ │ │ Input box with formatting toolbar              │ │
│ │14:34 MCP Call   │ │ │ [B] [I] [Code] [Link] | @ mention sub-agent    │ │
│ │  └ database     │ │ └───────────────────────────────────────────────┘ │
│ └─────────────────┘ │                                                   │
│                     │ FLOATING ACTION BAR (bottom right):              │
│ [Filter] [Export]   │ [Resume] [Branch] [Clear Context]                │
└─────────────────────┴───────────────────────────────────────────────────┘
```

### 3.3 MCP SERVER MANAGEMENT
```
┌─────────────────────────────────────────────────────────────────────────┐
│ MCP SERVERS                                              [+ Add Server] │
├──────────────────────┬──────────────────────────────────────────────────┤
│                      │                                                  │
│  SERVER LIST         │           SERVER DETAILS                         │
│  (320px)             │           (flex: 1)                              │
│                      │                                                  │
│ ┌──────────────────┐ │ ┌────────────────────────────────────────────────┐ │
│ │Project Scope     │ │ │ Database Server                                │ │
│ │├─ 🟢 Database    │ │ │ Status: Connected | Scope: Project             │ │
│ │├─ 🟡 GitHub API  │ │ │                                                │ │
│ │└─ 🔴 Slack       │ │ │ CONFIGURATION                                  │ │
│ │                  │ │ │ ┌──────────────────────────────────────────┐   │ │
│ │User Scope        │ │ │ │ URL: postgres://localhost:5432            │   │ │
│ │├─ 🟢 Calculator  │ │ │ │ Auth: [Configure...]                       │   │ │
│ │└─ 🟢 Weather     │ │ │ └──────────────────────────────────────────┘   │ │
│ │                  │ │ │                                                │ │
│ │Imported          │ │ │ AVAILABLE RESOURCES                            │ │
│ │└─ 🟢 NPM Search  │ │ │ • users_table (read/write)                    │ │
│ └──────────────────┘ │ │ • posts_table (read/write)                    │ │
│                      │ │                                                │ │
│ [Import] [Export]    │ │ PROMPTS                                        │ │
│                      │ │ • query_database(sql: string)                  │ │
│                      │ │ • backup_data()                                │ │
│                      │ │                                                │ │
│                      │ │ ACCESS CONTROL                                 │ │
│                      │ │ ☑ Claude Code  ☑ Testing Agent  ☐ Docs Agent  │ │
│                      │ └────────────────────────────────────────────────┘ │
└──────────────────────┴──────────────────────────────────────────────────┘
```

### 3.4 SUB-AGENT STUDIO
```
┌─────────────────────────────────────────────────────────────────────────┐
│ SUB-AGENTS                                           [+ Create Agent]   │
├──────────────────────┬──────────────────────────────────────────────────┤
│                      │                                                  │
│  AGENT LIST          │         AGENT EDITOR                             │
│  (280px)             │         (flex: 1)                                │
│                      │                                                  │
│ ┌──────────────────┐ │ TABS: Definition | Permissions | Test           │
│ │My Agents         │ │ ┌────────────────────────────────────────────────┐ │
│ │├─ 📝 Docs Writer │ │ │ Name: Testing Agent                            │ │
│ │├─ 🧪 Testing     │ │ │ Description: Specialized for unit testing      │ │
│ │├─ 🔍 Code Review │ │ │                                                │ │
│ │└─ 🚀 Deploy      │ │ │ SYSTEM PROMPT                                  │ │
│ │                  │ │ │ ┌──────────────────────────────────────────┐   │ │
│ │Project Agents    │ │ │ │ You are a testing specialist focused on   │   │ │
│ │├─ 📊 Analytics   │ │ │ │ writing comprehensive test suites...      │   │ │
│ │└─ 🔒 Security    │ │ │ └──────────────────────────────────────────┘   │ │
│ └──────────────────┘ │ │                                                │ │
│                      │ │ TOOL PERMISSIONS                               │ │
│                      │ │ ☑ Read Files  ☑ Write Tests  ☐ Edit Code      │ │
│                      │ │                                                │ │
│                      │ │ MCP SERVERS                                    │ │
│                      │ │ ☑ Testing Database  ☐ Production API          │ │
│                      │ │                                                │ │
│                      │ │ [Save] [Test Run] [Export YAML]                │ │
│                      │ └────────────────────────────────────────────────┘ │
└──────────────────────┴──────────────────────────────────────────────────┘
```

### 3.5 HOOKS & POLICIES
```
┌─────────────────────────────────────────────────────────────────────────┐
│ HOOKS & POLICIES                                          [+ Add Hook]  │
├──────────────────────┬──────────────────────────────────────────────────┤
│                      │                                                  │
│  HOOK LIST           │         HOOK EDITOR                              │
│  (280px)             │         (flex: 1)                                │
│                      │                                                  │
│ ┌──────────────────┐ │ ┌────────────────────────────────────────────────┐ │
│ │PreToolUse        │ │ │ Hook: Validate File Paths                      │ │
│ │├─ ✓ Path Check   │ │ │ Event: PreToolUse                               │ │
│ │└─ ✓ Size Limit   │ │ │                                                │ │
│ │                  │ │ │ CONDITIONS (Visual Builder)                    │ │
│ │PostToolUse       │ │ │ ┌──────────────────────────────────────────┐   │ │
│ │├─ ✓ Git Commit   │ │ │ │ IF tool.name = "edit_file"                │   │ │
│ │└─ ✓ Test Runner  │ │ │ │ AND file.path CONTAINS "/src/"            │   │ │
│ │                  │ │ │ └──────────────────────────────────────────┘   │ │
│ │OnError           │ │ │                                                │ │
│ │└─ ✓ Rollback     │ │ │ ACTIONS                                        │ │
│ └──────────────────┘ │ │ ┌──────────────────────────────────────────┐   │ │
│                      │ │ │ 1. Validate path against .claude/allowed  │   │ │
│ [Import] [Export]    │ │ │ 2. Check file size < 1MB                  │   │ │
│                      │ │ │ 3. Log to audit.log                       │   │ │
│                      │ │ └──────────────────────────────────────────┘   │ │
│                      │ │                                                │ │
│                      │ │ [Enable Hook] [Test] [Save]                    │ │
│                      │ └────────────────────────────────────────────────┘ │
└──────────────────────┴──────────────────────────────────────────────────┘
```

### 3.6 GIT INTEGRATION
```
┌─────────────────────────────────────────────────────────────────────────┐
│ GIT                                    Current: feature-auth | main ↑2  │
├─────────────────────┬───────────────────────────────────────────────────┤
│                     │                                                   │
│  CHANGES            │           DIFF VIEWER                             │
│  (320px)            │           (flex: 1)                               │
│                     │                                                   │
│ ┌─────────────────┐ │ ┌───────────────────────────────────────────────┐ │
│ │Staged (3)       │ │ │ auth.ts | +42 -15                              │ │
│ │☑ auth.ts        │ │ ├───────────────────────────────────────────────┤ │
│ │☑ user.ts        │ │ │23  - function oldAuth() {                      │ │
│ │☑ api.ts         │ │ │24  -   return false;                           │ │
│ │                 │ │ │25  - }                                         │ │
│ │Unstaged (2)     │ │ │23  + async function authenticate(              │ │
│ │☐ config.ts      │ │ │24  +   credentials: Credentials                │ │
│ │☐ README.md      │ │ │25  + ): Promise<User> {                        │ │
│ └─────────────────┘ │ │26  +   // Improved implementation              │ │
│                     │ └───────────────────────────────────────────────┘ │
│ COMMIT MESSAGE      │                                                   │
│ ┌─────────────────┐ │ PR ASSISTANT                                      │
│ │Fix auth bug     │ │ ┌───────────────────────────────────────────────┐ │
│ │                 │ │ │ 🤖 Claude suggests:                            │ │
│ │Details...       │ │ │ "Refactor authentication to use async/await    │ │
│ └─────────────────┘ │ │  and improve error handling"                   │ │
│                     │ │                                                │ │
│ [Commit] [Push]     │ │ [Use Suggestion] [Edit]                        │ │
│                     │ └───────────────────────────────────────────────┘ │
└─────────────────────┴───────────────────────────────────────────────────┘
```

## 4. Floating/Modal Elements

### Command Palette (⌘K)
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Type a command or search...                         │
├─────────────────────────────────────────────────────────┤
│ Recent                                                  │
│ > Open file: auth.ts                                   │
│ > Run test: auth.test.ts                               │
│                                                         │
│ Commands                                                │
│ > Chat: New session                    ⌘N              │
│ > Git: Commit changes                  ⌘⇧C             │
│ > MCP: Connect server                                  │
│ > Sub-agent: Invoke testing            ⌘⇧T             │
└─────────────────────────────────────────────────────────┘
```

### Diff Review Modal
```
┌─────────────────────────────────────────────────────────┐
│ Review Changes (3 files, 127 lines)        [X] Close   │
├─────────────────────────────────────────────────────────┤
│ auth.ts (42 additions, 15 deletions)                   │
│ ┌───────────────────────────────────────────────────┐   │
│ │ [Show full diff]                                  │   │
│ └───────────────────────────────────────────────────┘   │
│                                                         │
│ user.ts (23 additions, 8 deletions)                    │
│ ┌───────────────────────────────────────────────────┐   │
│ │ [Show full diff]                                  │   │
│ └───────────────────────────────────────────────────┘   │
│                                                         │
│ [Accept All] [Reject All] [Review Each]                │
└─────────────────────────────────────────────────────────┘
```

## 5. Responsive Breakpoints

- **Desktop (1920px+)**: Full layout as shown
- **Laptop (1440px)**: Context pane collapses to icons, expands on hover
- **Tablet (1024px)**: Sidebar auto-collapses, single column layout
- **Mobile**: Not supported (IDE requires desktop environment)

## 6. Visual Design System

### Colors
- **Background**: #0A0B0D (primary), #12141A (elevated)
- **Text**: #E4E4E7 (primary), #A1A1AA (secondary)
- **Accent**: #3B82F6 (blue), #10B981 (success), #F59E0B (warning)
- **Borders**: #27272A (subtle), #3F3F46 (prominent)

### Typography
- **Font**: Inter or SF Pro
- **Code**: JetBrains Mono or Fira Code
- **Sizes**: 12px (small), 14px (body), 16px (headers)

### Spacing
- **Grid**: 4px base unit
- **Padding**: 8px (tight), 16px (default), 24px (loose)
- **Margins**: Consistent 16px between major sections

### Interactive States
- **Hover**: Subtle background highlight (#1A1B1F)
- **Active**: Accent color border or background
- **Focus**: 2px accent color ring
- **Disabled**: 50% opacity

## 7. Keyboard Navigation Map

### Global
- `⌘K` - Command palette
- `⌘1-7` - Switch sidebar sections
- `⌘⇧P` - Quick file search
- `⌘⇧F` - Global search

### Code Editor
- `⌘S` - Save
- `⌘Z/⌘⇧Z` - Undo/Redo
- `⌘D` - Accept diff
- `⌘⇧D` - Reject diff

### Chat
- `⌘Enter` - Send message
- `⌘⇧Enter` - New line
- `@` - Mention sub-agent
- `/` - Quick commands

### Navigation
- `Tab/⇧Tab` - Navigate sections
- `↑↓` - Navigate lists
- `Space` - Toggle checkboxes
- `Enter` - Activate selection