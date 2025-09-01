import Editor, { OnMount } from '@monaco-editor/react'
import { useEffect } from 'react'
import { setupMonaco } from '@/lib/monaco-setup'
import { writeFile } from '@/lib/fs-tauri'
import { registerEditor } from '@/components/file-explorer/file-explorer.store'

interface Props {
  filePath: string
  initialValue: string
  language: string
  theme?: string
  onChange?: (value: string) => void
}

export default function CodeEditor({ filePath, initialValue, language, theme = 'slate-dark', onChange }: Props) {
  useEffect(() => {
    setupMonaco()
  }, [])

  const handleMount: OnMount = (editor, monacoApi) => {
    registerEditor(editor)
    editor.addCommand(monacoApi.KeyMod.CtrlCmd | monacoApi.KeyCode.KeyS, async () => {
      const v = editor.getValue()
      await writeFile(filePath, v)
    })
  }

  return (
    <Editor
      height="100%"
      path={filePath}
      defaultLanguage={language}
      defaultValue={initialValue}
      theme={theme}
      onMount={handleMount}
      onChange={(value) => onChange?.(value ?? '')}
      options={{ minimap: { enabled: false } }}
    />
  )
}
