import * as monaco from 'monaco-editor'

export function setupMonaco() {
  monaco.editor.defineTheme('slate-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {},
  })
}

export function getLanguageFromExtension(ext: string): string {
  switch (ext) {
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'json':
      return 'json'
    case 'css':
      return 'css'
    case 'html':
      return 'html'
    default:
      return ''
  }
}
