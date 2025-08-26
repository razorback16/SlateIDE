import { Component } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { $theme, toggleTheme } from '#/stores/ide.store'

const Settings: Component = () => {
  const theme = useStore($theme)

  return (
    <div class="view-container">
      <div class="mx-auto max-w-4xl p-6">
        <h2 class="mb-6 font-semibold text-2xl text-primary">Settings</h2>

        <div class="space-y-6">
          {/* Appearance Section */}
          <div class="rounded-lg border border-subtle bg-elevated p-6">
            <h3 class="mb-4 font-semibold text-lg text-primary">Appearance</h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-medium text-primary text-sm">Theme</span>
                  <p class="mt-1 text-secondary text-xs">Choose your preferred color theme</p>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  class="rounded border border-subtle bg-primary px-4 py-2 text-primary text-sm hover:bg-hover"
                >
                  {theme() === 'dark' ? 'Dark' : 'Light'} Mode
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <label for="font-size" class="font-medium text-primary text-sm">Font Size</label>
                  <p class="mt-1 text-secondary text-xs">Adjust the editor font size</p>
                </div>
                <select id="font-size" class="rounded border border-subtle bg-primary px-3 py-2 text-primary text-sm">
                  <option>12px</option>
                  <option selected>14px</option>
                  <option>16px</option>
                  <option>18px</option>
                </select>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          <div class="rounded-lg border border-subtle bg-elevated p-6">
            <h3 class="mb-4 font-semibold text-lg text-primary">Editor</h3>

            <div class="space-y-4">
              <label class="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable auto-save</span>
              </label>

              <label class="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Show line numbers</span>
              </label>

              <label class="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable word wrap</span>
              </label>

              <label class="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" class="accent-accent-primary" />
                <span>Show whitespace characters</span>
              </label>
            </div>
          </div>

          {/* AI Settings */}
          <div class="rounded-lg border border-subtle bg-elevated p-6">
            <h3 class="mb-4 font-semibold text-lg text-primary">AI Assistant</h3>

            <div class="space-y-4">
              <div>
                <label for="api-key" class="font-medium text-primary text-sm">API Key</label>
                <input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  class="mt-2 w-full rounded border border-subtle bg-primary px-3 py-2 text-primary text-sm"
                />
              </div>

              <div>
                <label for="ai-model" class="font-medium text-primary text-sm">Model</label>
                <select id="ai-model" class="mt-2 w-full rounded border border-subtle bg-primary px-3 py-2 text-primary text-sm">
                  <option>Claude 3 Opus</option>
                  <option selected>Claude 3 Sonnet</option>
                  <option>Claude 3 Haiku</option>
                </select>
              </div>

              <label class="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable AI suggestions</span>
              </label>

              <label class="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Show AI reasoning steps</span>
              </label>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div class="rounded-lg border border-subtle bg-elevated p-6">
            <h3 class="mb-4 font-semibold text-lg text-primary">Keyboard Shortcuts</h3>

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
