import type * as Monaco from 'monaco-editor'
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
  // Web Technologies
  ts: 'typescript',
  tsx: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  json: 'json',
  jsonc: 'jsonc',
  json5: 'json',
  html: 'html',
  htm: 'html',
  xhtml: 'html',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  less: 'less',
  stylus: 'stylus',
  vue: 'vue',
  svelte: 'svelte',
  
  // Documentation
  md: 'markdown',
  markdown: 'markdown',
  mdx: 'mdx',
  rst: 'restructuredtext',
  txt: 'plaintext',
  text: 'plaintext',
  
  // Python
  py: 'python',
  pyw: 'python',
  pyi: 'python',
  pyx: 'python',
  
  // Ruby
  rb: 'ruby',
  rbw: 'ruby',
  rake: 'ruby',
  
  // PHP
  php: 'php',
  php3: 'php',
  php4: 'php',
  php5: 'php',
  phtml: 'php',
  
  // Java & JVM Languages
  java: 'java',
  class: 'java',
  jar: 'java',
  kt: 'kotlin',
  kts: 'kotlin',
  scala: 'scala',
  sc: 'scala',
  groovy: 'groovy',
  gradle: 'groovy',
  clj: 'clojure',
  cljs: 'clojure',
  cljc: 'clojure',
  
  // C/C++
  c: 'c',
  cpp: 'cpp',
  cxx: 'cpp',
  cc: 'cpp',
  'c++': 'cpp',
  h: 'c',
  hpp: 'cpp',
  hxx: 'cpp',
  hh: 'cpp',
  'h++': 'cpp',
  
  // .NET Languages
  cs: 'csharp',
  csx: 'csharp',
  vb: 'vb',
  fs: 'fsharp',
  fsx: 'fsharp',
  fsi: 'fsharp',
  
  // Systems Programming
  rs: 'rust',
  go: 'go',
  zig: 'zig',
  nim: 'nim',
  nims: 'nim',
  d: 'd',
  
  // Scripting Languages
  sh: 'shell',
  bash: 'shell',
  zsh: 'shell',
  fish: 'shell',
  csh: 'shell',
  tcsh: 'shell',
  ksh: 'shell',
  ps1: 'powershell',
  psm1: 'powershell',
  psd1: 'powershell',
  bat: 'bat',
  cmd: 'bat',
  
  // Functional Languages
  hs: 'haskell',
  lhs: 'haskell',
  elm: 'elm',
  ml: 'ocaml',
  mli: 'ocaml',
  erl: 'erlang',
  hrl: 'erlang',
  ex: 'elixir',
  exs: 'elixir',
  
  // Lisp Family
  lisp: 'lisp',
  cl: 'lisp',
  scm: 'scheme',
  ss: 'scheme',
  
  // Configuration & Data
  xml: 'xml',
  xsl: 'xml',
  xslt: 'xml',
  xsd: 'xml',
  svg: 'xml',
  yml: 'yaml',
  yaml: 'yaml',
  toml: 'toml',
  ini: 'ini',
  conf: 'ini',
  cfg: 'ini',
  properties: 'properties',
  env: 'shell',
  
  // Database
  sql: 'sql',
  mysql: 'mysql',
  pgsql: 'pgsql',
  plsql: 'plsql',
  
  // Mobile Development
  swift: 'swift',
  m: 'objective-c',
  mm: 'objective-cpp',
  dart: 'dart',
  
  // Other Languages
  lua: 'lua',
  perl: 'perl',
  pl: 'perl',
  pm: 'perl',
  r: 'r',
  R: 'r',
  matlab: 'matlab',
  julia: 'julia',
  jl: 'julia',
  pas: 'pascal',
  pp: 'pascal',
  dpr: 'pascal',
  asm: 'asm',
  s: 'asm',
  nasm: 'asm',
  
  // Build Systems & Tools
  dockerfile: 'dockerfile',
  dockerignore: 'ignore',
  gitignore: 'ignore',
  npmignore: 'ignore',
  makefile: 'makefile',
  make: 'makefile',
  mk: 'makefile',
  cmake: 'cmake',
  bazel: 'starlark',
  bzl: 'starlark',
  
  // Templating
  hbs: 'handlebars',
  handlebars: 'handlebars',
  mustache: 'handlebars',
  twig: 'twig',
  j2: 'jinja',
  jinja: 'jinja',
  
  // Markup & Styling
  tex: 'latex',
  latex: 'latex',
  bib: 'bibtex',
  
  // Protocol Buffers & IDL
  proto: 'proto',
  protobuf: 'proto',
  thrift: 'thrift',
  
  // GraphQL
  graphql: 'graphql',
  gql: 'graphql',
  
  // WASM
  wat: 'wasm',
  wast: 'wasm',
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
  
  // Docker files
  if (filename === 'dockerfile') return 'dockerfile'
  if (filename.startsWith('dockerfile.')) return 'dockerfile'
  
  // Environment and config files
  if (filename.startsWith('.env')) return 'shell'
  if (filename === '.gitignore') return 'ignore'
  if (filename === '.dockerignore') return 'ignore'
  if (filename === '.npmignore') return 'ignore'
  if (filename === '.eslintignore') return 'ignore'
  
  // Build files
  if (filename === 'makefile') return 'makefile'
  if (filename === 'makefile.am') return 'makefile'
  if (filename === 'gnumakefile') return 'makefile'
  if (filename === 'cmakelists.txt') return 'cmake'
  if (filename === 'build.gradle') return 'groovy'
  if (filename === 'build.gradle.kts') return 'kotlin'
  if (filename === 'pom.xml') return 'xml'
  if (filename === 'cargo.toml') return 'toml'
  if (filename === 'pyproject.toml') return 'toml'
  
  // Package files
  if (filename === 'package.json') return 'json'
  if (filename === 'package-lock.json') return 'json'
  if (filename === 'yarn.lock') return 'yaml'
  if (filename === 'composer.json') return 'json'
  if (filename === 'gemfile') return 'ruby'
  if (filename === 'podfile') return 'ruby'
  
  // Config files
  if (filename === 'tsconfig.json') return 'jsonc'
  if (filename === 'jsconfig.json') return 'jsonc'
  if (filename.endsWith('.config.js')) return 'javascript'
  if (filename.endsWith('.config.ts')) return 'typescript'
  if (filename === 'babel.config.js') return 'javascript'
  if (filename === 'webpack.config.js') return 'javascript'
  if (filename === 'vite.config.js') return 'javascript'
  if (filename === 'vite.config.ts') return 'typescript'
  if (filename === 'rollup.config.js') return 'javascript'
  if (filename === '.prettierrc') return 'json'
  if (filename === '.eslintrc') return 'json'
  if (filename === '.eslintrc.js') return 'javascript'
  
  // README files
  if (filename === 'readme.md') return 'markdown'
  if (filename === 'readme.txt') return 'plaintext'
  if (filename === 'changelog.md') return 'markdown'
  if (filename === 'license') return 'plaintext'

  return getLanguageFromExtension(extension)
}

/**
 * Setup Monaco editor with dark theme
 */
export function setupMonacoTheme(monaco: typeof Monaco) {
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
export function setupMonacoLightTheme(monaco: typeof Monaco) {
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
export function configureTypeScript(monaco: typeof Monaco) {
  const compilerOptions: Monaco.languages.typescript.CompilerOptions = {
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
  monaco: typeof Monaco,
  filePath: string,
  content: string,
  language?: string
): Monaco.editor.ITextModel {
  const uri = monaco.Uri.parse(`file://${filePath}`)
  let model = monaco.editor.getModel(uri)

  if (!model) {
    const detectedLanguage = language || getLanguageFromPath(filePath)
    model = monaco.editor.createModel(content, detectedLanguage, uri)
  }

  return model
}


/**
 * Get file icon based on language
 */
export function getFileIcon(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase() || ''
  const filename = filePath.split(/[/\\]/).pop()?.toLowerCase() || ''

  // Special files
  if (filename === 'package.json') return '📦'
  if (filename === 'package-lock.json') return '🔒'
  if (filename === 'yarn.lock') return '🧶'
  if (filename === 'composer.json') return '🎼'
  if (filename === 'gemfile') return '💎'
  if (filename === 'cargo.toml') return '📦'
  if (filename === 'pyproject.toml') return '🐍'
  if (filename === 'tsconfig.json') return '⚙️'
  if (filename === 'jsconfig.json') return '⚙️'
  if (filename === 'dockerfile') return '🐳'
  if (filename.startsWith('.env')) return '🔧'
  if (filename === '.gitignore') return '🚫'
  if (filename === '.dockerignore') return '🚫'
  if (filename === '.npmignore') return '🚫'
  if (filename === 'makefile') return '🔨'
  if (filename === 'cmakelists.txt') return '🏗️'
  if (filename === 'build.gradle') return '🐘'
  if (filename === 'pom.xml') return '☕'
  if (filename === 'readme.md') return '📖'
  if (filename === 'license') return '📜'
  if (filename === 'changelog.md') return '📋'

  // By extension
  switch (extension) {
    // Web Technologies
    case 'ts':
    case 'tsx':
      return '🔷'
    case 'js':
    case 'jsx':
    case 'mjs':
    case 'cjs':
      return '💛'
    case 'html':
    case 'htm':
    case 'xhtml':
      return '🌐'
    case 'css':
    case 'scss':
    case 'sass':
    case 'less':
    case 'stylus':
      return '🎨'
    case 'vue':
      return '💚'
    case 'svelte':
      return '🧡'
    
    // Data formats
    case 'json':
    case 'jsonc':
    case 'json5':
      return '📋'
    case 'xml':
    case 'xsl':
    case 'xslt':
    case 'xsd':
      return '📄'
    case 'yml':
    case 'yaml':
      return '📝'
    case 'toml':
      return '⚙️'
    case 'ini':
    case 'conf':
    case 'cfg':
      return '🔧'
    case 'properties':
      return '📝'
    
    // Documentation
    case 'md':
    case 'markdown':
    case 'mdx':
      return '📝'
    case 'rst':
      return '📖'
    case 'txt':
    case 'text':
      return '📄'
    case 'tex':
    case 'latex':
      return '📚'
    case 'bib':
      return '🔖'
    
    // Python
    case 'py':
    case 'pyw':
    case 'pyi':
    case 'pyx':
      return '🐍'
    
    // Ruby
    case 'rb':
    case 'rbw':
    case 'rake':
      return '💎'
    
    // PHP
    case 'php':
    case 'php3':
    case 'php4':
    case 'php5':
    case 'phtml':
      return '🐘'
    
    // Java & JVM Languages
    case 'java':
    case 'class':
    case 'jar':
      return '☕'
    case 'kt':
    case 'kts':
      return '🟠'
    case 'scala':
    case 'sc':
      return '🔴'
    case 'groovy':
    case 'gradle':
      return '🐘'
    case 'clj':
    case 'cljs':
    case 'cljc':
      return '🟢'
    
    // C/C++
    case 'c':
    case 'h':
      return '🔵'
    case 'cpp':
    case 'cxx':
    case 'cc':
    case 'c++':
    case 'hpp':
    case 'hxx':
    case 'hh':
    case 'h++':
      return '🔷'
    
    // .NET Languages
    case 'cs':
    case 'csx':
      return '💜'
    case 'vb':
      return '🔵'
    case 'fs':
    case 'fsx':
    case 'fsi':
      return '🔷'
    
    // Systems Programming
    case 'rs':
      return '⚡'
    case 'go':
      return '🐹'
    case 'zig':
      return '⚡'
    case 'nim':
    case 'nims':
      return '👑'
    case 'd':
      return '🔴'
    
    // Scripting Languages
    case 'sh':
    case 'bash':
    case 'zsh':
    case 'fish':
    case 'csh':
    case 'tcsh':
    case 'ksh':
      return '🐚'
    case 'ps1':
    case 'psm1':
    case 'psd1':
      return '💙'
    case 'bat':
    case 'cmd':
      return '⚫'
    
    // Functional Languages
    case 'hs':
    case 'lhs':
      return '💜'
    case 'elm':
      return '🌳'
    case 'ml':
    case 'mli':
      return '🐪'
    case 'erl':
    case 'hrl':
      return '🔴'
    case 'ex':
    case 'exs':
      return '💜'
    
    // Lisp Family
    case 'lisp':
    case 'cl':
      return '🟣'
    case 'scm':
    case 'ss':
      return '🟢'
    
    // Database
    case 'sql':
    case 'mysql':
    case 'pgsql':
    case 'plsql':
      return '🗃️'
    
    // Mobile Development
    case 'swift':
      return '🦉'
    case 'm':
    case 'mm':
      return '🍎'
    case 'dart':
      return '🎯'
    
    // Other Languages
    case 'lua':
      return '🌙'
    case 'perl':
    case 'pl':
    case 'pm':
      return '🐪'
    case 'r':
      return '📊'
    case 'matlab':
      return '📈'
    case 'julia':
    case 'jl':
      return '🟣'
    case 'pas':
    case 'pp':
    case 'dpr':
      return '🔺'
    case 'asm':
    case 's':
    case 'nasm':
      return '⚙️'
    
    // Templating
    case 'hbs':
    case 'handlebars':
    case 'mustache':
      return '🎭'
    case 'twig':
      return '🌿'
    case 'j2':
    case 'jinja':
      return '🔥'
    
    // Protocol & API
    case 'proto':
    case 'protobuf':
      return '📡'
    case 'thrift':
      return '🔌'
    case 'graphql':
    case 'gql':
      return '🎯'
    
    // WebAssembly
    case 'wat':
    case 'wast':
      return '⚡'
    
    // Build & Config
    case 'dockerfile':
      return '🐳'
    case 'cmake':
      return '🏗️'
    case 'make':
    case 'mk':
    case 'makefile':
      return '🔨'
    case 'bazel':
    case 'bzl':
      return '🟢'
    
    // Images and media
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
      return '🖼️'
    case 'ico':
      return '🏷️'
    
    // Archives
    case 'zip':
    case 'tar':
    case 'gz':
    case 'rar':
    case '7z':
      return '📦'
    
    default:
      return '📄'
  }
}
