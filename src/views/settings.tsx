import { Component } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { $theme, toggleTheme } from '#/stores/ide.store'

const Settings: Component = () => {
  const theme = useStore($theme)

  return (
    <div class="view-container">
      <div class="p-6 max-w-4xl mx-auto">
        <h2 class="text-2xl font-semibold text-primary mb-6">Settings</h2>
        
        <div class="space-y-6">
          {/* Appearance Section */}
          <div class="bg-elevated rounded-lg border border-subtle p-6">
            <h3 class="text-lg font-semibold text-primary mb-4">Appearance</h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-primary">Theme</label>
                  <p class="text-xs text-secondary mt-1">Choose your preferred color theme</p>
                </div>
                <button
                  onClick={toggleTheme}
                  class="px-4 py-2 bg-primary border border-subtle rounded text-sm text-primary hover:bg-hover"
                >
                  {theme() === 'dark' ? 'Dark' : 'Light'} Mode
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-primary">Font Size</label>
                  <p class="text-xs text-secondary mt-1">Adjust the editor font size</p>
                </div>
                <select class="px-3 py-2 bg-primary border border-subtle rounded text-sm text-primary">
                  <option>12px</option>
                  <option selected>14px</option>
                  <option>16px</option>
                  <option>18px</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Editor Section */}
          <div class="bg-elevated rounded-lg border border-subtle p-6">
            <h3 class="text-lg font-semibold text-primary mb-4">Editor</h3>
            
            <div class="space-y-4">
              <label class="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable auto-save</span>
              </label>
              
              <label class="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Show line numbers</span>
              </label>
              
              <label class="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable word wrap</span>
              </label>
              
              <label class="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input type="checkbox" class="accent-accent-primary" />
                <span>Show whitespace characters</span>
              </label>
            </div>
          </div>
          
          {/* AI Settings */}
          <div class="bg-elevated rounded-lg border border-subtle p-6">
            <h3 class="text-lg font-semibold text-primary mb-4">AI Assistant</h3>
            
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-primary">API Key</label>
                <input 
                  type="password" 
                  placeholder="sk-..."
                  class="w-full mt-2 px-3 py-2 bg-primary border border-subtle rounded text-sm text-primary"
                />
              </div>
              
              <div>
                <label class="text-sm font-medium text-primary">Model</label>
                <select class="w-full mt-2 px-3 py-2 bg-primary border border-subtle rounded text-sm text-primary">
                  <option>Claude 3 Opus</option>
                  <option selected>Claude 3 Sonnet</option>
                  <option>Claude 3 Haiku</option>
                </select>
              </div>
              
              <label class="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable AI suggestions</span>
              </label>
              
              <label class="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Show AI reasoning steps</span>
              </label>
            </div>
          </div>
          
          {/* Keyboard Shortcuts */}
          <div class="bg-elevated rounded-lg border border-subtle p-6">
            <h3 class="text-lg font-semibold text-primary mb-4">Keyboard Shortcuts</h3>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-secondary">Command Palette</span>
                <kbd class="kbd">⌘K</kbd>
              </div>
              <div class="flex justify-between">
                <span class="text-secondary">Switch Views</span>
                <kbd class="kbd">⌘1-7</kbd>
              </div>
              <div class="flex justify-between">
                <span class="text-secondary">Quick File Search</span>
                <kbd class="kbd">⌘⇧P</kbd>
              </div>
              <div class="flex justify-between">
                <span class="text-secondary">Global Search</span>
                <kbd class="kbd">⌘⇧F</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
