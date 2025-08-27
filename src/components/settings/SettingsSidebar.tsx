import type { SettingsPanel } from '#/layouts/settings-window-layout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Settings, Palette, RefreshCw, Keyboard, Sparkles, Info, HelpCircle } from 'lucide-react'

interface SettingsSidebarProps {
  activePanel: SettingsPanel
  onPanelChange: (panel: SettingsPanel) => void
}

interface SidebarItem {
  id: SettingsPanel
  label: string
  icon: React.ComponentType<any>
}

const sidebarItems: SidebarItem[] = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'updates', label: 'Updates', icon: RefreshCw },
  { id: 'keyboard', label: 'Keyboard Shortcuts', icon: Keyboard },
  { id: 'whats-new', label: "What's new?", icon: Sparkles },
  { id: 'about', label: 'About', icon: Info },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
]

const SettingsSidebar = (props: SettingsSidebarProps) => {
  return (
    <div className="flex w-70 flex-col border-sidebar-border/50 border-r bg-sidebar/95 backdrop-blur-xl">
      <div className="border-sidebar-border/30 border-b px-5 py-5">
        <h1 className="font-semibold text-lg text-sidebar-foreground">Settings</h1>
      </div>

      <nav className="flex flex-1 flex-col space-y-2 px-2 py-3">
        <div className="flex flex-col space-y-1">
          {sidebarItems.slice(0, 3).map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.id}
                variant={props.activePanel === item.id ? 'default' : 'ghost'}
                className="h-8 justify-start font-normal text-sm"
                onClick={() => props.onPanelChange(item.id)}
              >
                <IconComponent className="mr-3 h-5 w-5 opacity-75" />
                <span>{item.label}</span>
              </Button>
            )
          })}
        </div>

        <Separator className="my-2" />

        <div className="flex flex-col space-y-1">
          {sidebarItems.slice(3, 5).map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.id}
                variant={props.activePanel === item.id ? 'default' : 'ghost'}
                className="h-8 justify-start font-normal text-sm"
                onClick={() => props.onPanelChange(item.id)}
              >
                <IconComponent className="mr-3 h-5 w-5 opacity-75" />
                <span>{item.label}</span>
              </Button>
            )
          })}
        </div>

        <Separator className="my-2" />

        <div className="flex flex-col space-y-1">
          {sidebarItems.slice(5).map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.id}
                variant={props.activePanel === item.id ? 'default' : 'ghost'}
                className="h-8 justify-start font-normal text-sm"
                onClick={() => props.onPanelChange(item.id)}
              >
                <IconComponent className="mr-3 h-5 w-5 opacity-75" />
                <span>{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default SettingsSidebar
