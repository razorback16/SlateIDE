import * as monaco from 'monaco-editor'
import {
  createEditorWorker,
  createJsonWorker,
  createCssWorker,
  createHtmlWorker,
  createTsWorker
} from './monaco-workers'

/**
 * Configure Monaco Environment with web workers for Vite
 */
export function setupMonacoEnvironment() {
  // Configure Monaco's web worker environment
  self.MonacoEnvironment = {
    getWorker(_: any, label: string): Worker {
      switch (label) {
        case 'json':
          return createJsonWorker()
        case 'css':
        case 'scss':
        case 'less':
          return createCssWorker()
        case 'html':
        case 'handlebars':
        case 'razor':
          return createHtmlWorker()
        case 'typescript':
        case 'javascript':
          return createTsWorker()
        default:
          return createEditorWorker()
      }
    }
  }
}

/**
 * Language mapping for file extensions
 */
const LANGUAGE_MAP: Record<string, string> = {
  ts: 'typescript',
  tsx: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  json: 'json',
  html: 'html',
  htm: 'html',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  less: 'less',
  md: 'markdown',
  markdown: 'markdown',
  py: 'python',
  rb: 'ruby',
  php: 'php',
  java: 'java',
  c: 'c',
  cpp: 'cpp',
  cxx: 'cpp',
  cc: 'cpp',
  h: 'c',
  hpp: 'cpp',
  rs: 'rust',
  go: 'go',
  sh: 'shell',
  bash: 'shell',
  zsh: 'shell',
  fish: 'shell',
  xml: 'xml',
  yml: 'yaml',
  yaml: 'yaml',
  toml: 'toml',
  ini: 'ini',
  conf: 'ini',
  sql: 'sql',
  dockerfile: 'dockerfile',
  vue: 'vue',
  svelte: 'svelte',
}

/**
 * Get Monaco language from file extension
 */
export function getLanguageFromExtension(extension: string): string {
  return LANGUAGE_MAP[extension.toLowerCase()] || 'plaintext'
}

/**
 * Get Monaco language from file path
 */
export function getLanguageFromPath(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase() || ''

  // Special cases for specific filenames
  const filename = filePath.split(/[/\\]/).pop()?.toLowerCase() || ''
  if (filename === 'dockerfile') return 'dockerfile'
  if (filename.startsWith('.env')) return 'shell'
  if (filename === 'package.json') return 'json'
  if (filename === 'tsconfig.json') return 'jsonc'
  if (filename === 'jsconfig.json') return 'jsonc'

  return getLanguageFromExtension(extension)
}

/**
 * Setup Monaco editor with dark theme
 */
export function setupMonacoTheme() {
  monaco.editor.defineTheme('slate-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'keyword', foreground: '569CD6' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'type', foreground: '4EC9B0' },
      { token: 'class', foreground: '4EC9B0' },
      { token: 'function', foreground: 'DCDCAA' },
      { token: 'variable', foreground: '9CDCFE' },
    ],
    colors: {
      'editor.background': '#0D1117',
      'editor.foreground': '#E6EDF3',
      'editor.lineHighlightBackground': '#21262D',
      'editor.selectionBackground': '#264F78',
      'editor.selectionHighlightBackground': '#264F7850',
      'editorLineNumber.foreground': '#7D8590',
      'editorLineNumber.activeForeground': '#F0F6FC',
      'editorIndentGuide.background': '#21262D',
      'editorIndentGuide.activeBackground': '#30363D',
      'editor.findMatchBackground': '#9E6A03',
      'editor.findMatchHighlightBackground': '#9E6A0350',
    },
  })
}

/**
 * Setup Monaco editor with light theme
 */
export function setupMonacoLightTheme() {
  monaco.editor.defineTheme('slate-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '008000', fontStyle: 'italic' },
      { token: 'keyword', foreground: '0000FF' },
      { token: 'string', foreground: 'A31515' },
      { token: 'number', foreground: '09885A' },
      { token: 'type', foreground: '267F99' },
      { token: 'class', foreground: '267F99' },
      { token: 'function', foreground: '795E26' },
      { token: 'variable', foreground: '001080' },
    ],
    colors: {
      'editor.background': '#FFFFFF',
      'editor.foreground': '#000000',
      'editor.lineHighlightBackground': '#F5F5F5',
      'editor.selectionBackground': '#ADD6FF',
      'editor.selectionHighlightBackground': '#ADD6FF50',
      'editorLineNumber.foreground': '#237893',
      'editorLineNumber.activeForeground': '#0B216F',
      'editorIndentGuide.background': '#D3D3D3',
      'editorIndentGuide.activeBackground': '#939393',
      'editor.findMatchBackground': '#A8AC94',
      'editor.findMatchHighlightBackground': '#EA5C0050',
    },
  })
}

/**
 * Configure Monaco TypeScript defaults
 */
export function configureTypeScript() {
  const compilerOptions: monaco.languages.typescript.CompilerOptions = {
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowJs: true,
    typeRoots: ['node_modules/@types'],
    jsx: monaco.languages.typescript.JsxEmit.React,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
  }

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions)
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions)

  // Enable semantic validation
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })
}

/**
 * Create or get existing Monaco model for a file
 */
export function getOrCreateModel(
  filePath: string,
  content: string,
  language?: string
): monaco.editor.ITextModel {
  const uri = monaco.Uri.parse(`file://${filePath}`)
  let model = monaco.editor.getModel(uri)

  if (!model) {
    const detectedLanguage = language || getLanguageFromPath(filePath)
    model = monaco.editor.createModel(content, detectedLanguage, uri)
  }

  return model
}

/**
 * Initialize Monaco editor setup
 */
export function initializeMonaco() {
  setupMonacoEnvironment()
  setupMonacoTheme()
  setupMonacoLightTheme()
  configureTypeScript()
}

/**
 * Get file icon based on language
 */
export function getFileIcon(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase() || ''
  const filename = filePath.split(/[/\\]/).pop()?.toLowerCase() || ''

  // Special files
  if (filename === 'package.json') return '📦'
  if (filename === 'tsconfig.json') return '⚙️'
  if (filename === 'dockerfile') return '🐳'
  if (filename.startsWith('.env')) return '🔧'
  if (filename === 'readme.md') return '📖'

  // By extension
  switch (extension) {
    case 'ts':
    case 'tsx':
      return '🔷'
    case 'js':
    case 'jsx':
      return '💛'
    case 'html':
    case 'htm':
      return '🌐'
    case 'css':
    case 'scss':
    case 'sass':
    case 'less':
      return '🎨'
    case 'json':
      return '📋'
    case 'md':
    case 'markdown':
      return '📝'
    case 'py':
      return '🐍'
    case 'rs':
      return '⚡'
    case 'go':
      return '🐹'
    case 'java':
      return '☕'
    case 'php':
      return '🐘'
    case 'rb':
      return '💎'
    case 'vue':
      return '💚'
    case 'svelte':
      return '🧡'
    case 'xml':
      return '📄'
    case 'yml':
    case 'yaml':
      return '📝'
    case 'sql':
      return '🗃️'
    case 'sh':
    case 'bash':
      return '🐚'
    default:
      return '📄'
  }
}
