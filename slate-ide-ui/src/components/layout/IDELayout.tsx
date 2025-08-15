import { type ReactNode } from "react";
import { HeaderBar } from "./HeaderBar";
import { SidebarNavigation } from "./SidebarNavigation";

type ViewType =
  | "codebase"
  | "chat"
  | "mcp"
  | "sub-agents"
  | "hooks"
  | "git"
  | "settings";

interface IDELayoutProps {
  children: ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function IDELayout({
  children,
  activeView,
  onViewChange,
}: IDELayoutProps) {
  return (
    <div className="h-screen flex flex-col relative">
      {/* Header Bar */}
      <HeaderBar />

      {/* Main Layout - Simple Flexbox */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - CSS-based hover expansion */}
        <div className="sidebar-container relative">
          <div className="ide-panel h-full">
            <SidebarNavigation
              activeView={activeView}
              onViewChange={onViewChange}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full px-4 relative min-w-0 overflow-hidden lm-bg-card">
          {children}
        </div>
      </div>
    </div>
  );
}
