/**
 * Monaco Editor Web Workers Configuration for Vite
 * 
 * This file uses Vite's native worker syntax to import Monaco Editor workers
 * without requiring vite-plugin-monaco-editor plugin.
 */

// Base editor worker for general Monaco functionality
export const createEditorWorker = () => new Worker(
  new URL('monaco-editor/esm/vs/editor/editor.worker?worker', import.meta.url),
  { type: 'module' }
)

// JSON language worker for JSON validation, formatting, etc.
export const createJsonWorker = () => new Worker(
  new URL('monaco-editor/esm/vs/language/json/json.worker?worker', import.meta.url),
  { type: 'module' }
)

// CSS language worker for CSS/SCSS/LESS support
export const createCssWorker = () => new Worker(
  new URL('monaco-editor/esm/vs/language/css/css.worker?worker', import.meta.url),
  { type: 'module' }
)

// HTML language worker for HTML/Handlebars/Razor support
export const createHtmlWorker = () => new Worker(
  new URL('monaco-editor/esm/vs/language/html/html.worker?worker', import.meta.url),
  { type: 'module' }
)

// TypeScript language worker for TypeScript/JavaScript IntelliSense
export const createTsWorker = () => new Worker(
  new URL('monaco-editor/esm/vs/language/typescript/ts.worker?worker', import.meta.url),
  { type: 'module' }
)