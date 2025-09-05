import { getOrCreateModel, setupMonacoEnvironment, configureTypeScript, setupMonacoTheme, setupMonacoLightTheme } from '@/lib/monaco-setup'
import { Editor, OnMount, BeforeMount } from '@monaco-editor/react'
import { useStore } from '@nanostores/react'
import type * as Monaco from 'monaco-editor'
import { useEffect, useRef } from 'react'
import { $editorState, saveFile, updateFileContent } from '@/stores/file-explorer.store'

interface CodeEditorProps {
  theme?: 'slate-dark' | 'slate-light'
}

export default function CodeEditor({ theme = 'slate-dark' }: CodeEditorProps) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<typeof Monaco | null>(null)
  const editorState = useStore($editorState)

  const activeFile = editorState.activeFilePath
    ? editorState.openFiles[editorState.activeFilePath]
    : null

  const handleEditorWillMount: BeforeMount = (monaco) => {
    // Setup Monaco environment and themes before the editor mounts
    setupMonacoEnvironment()
    setupMonacoTheme(monaco)      // Define slate-dark theme
    setupMonacoLightTheme(monaco)  // Define slate-light theme
    configureTypeScript(monaco)
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    try {
      // Handle potential web worker errors
      const originalConsoleError = console.error
      console.error = (...args) => {
        if (args[0]?.includes?.('Could not create web worker') || args[0]?.includes?.('web worker')) {
          console.warn('Monaco web workers failed to load, falling back to main thread execution.')
          // Continue with reduced functionality
        } else {
          originalConsoleError.apply(console, args)
        }
      }

      // Add save shortcut (Ctrl/Cmd+S)
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        if (activeFile) {
          saveFile(activeFile.path)
        }
      })

      // Add format document shortcut (Shift+Alt+F)
      editor.addCommand(monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF, () => {
        editor.getAction('editor.action.formatDocument')?.run()
      })

      // Focus editor
      editor.focus()
    } catch (error) {
      console.warn('Error initializing Monaco editor:', error)
      // Editor should still work with basic functionality
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFileContent(activeFile.path, value)
    }
  }

  // Update editor model when active file changes
  useEffect(() => {
    if (!editorRef.current || !activeFile || !monacoRef.current) return

    const model = getOrCreateModel(monacoRef.current, activeFile.path, activeFile.content, activeFile.language)

    // Set model
    editorRef.current.setModel(model)

    // Update model content if it differs (for external changes)
    if (model.getValue() !== activeFile.content) {
      model.setValue(activeFile.content)
    }
  }, [activeFile])

  if (!activeFile) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">📝</div>
          <div className="mb-2 font-semibold text-foreground text-lg">No file open</div>
          <div className="text-muted-foreground text-sm">
            Select a file from the explorer to start editing
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <Editor
        language={activeFile.language}
        theme={theme}
        value={activeFile.content}
        onChange={handleEditorChange}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Courier New', monospace",
          fontLigatures: true,
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          bracketPairColorization: { enabled: true },
          guides: {
            indentation: true,
            bracketPairs: true,
          },
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showClasses: true,
            showFunctions: true,
            showVariables: true,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          parameterHints: { enabled: true },
          hover: { enabled: true },
          formatOnPaste: true,
          formatOnType: true,
          acceptSuggestionOnEnter: 'on',
        }}
      />
    </div>
  )
}
