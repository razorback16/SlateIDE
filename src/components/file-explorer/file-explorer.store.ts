import { map } from 'nanostores'
import type { ExplorerState, NodeId } from './file-explorer.types'
import { readDirOnce, readFile } from '@/lib/fs-tauri'
import * as monaco from 'monaco-editor'
import { getLanguageFromExtension } from '@/lib/monaco-setup'

export const explorerStore = map<ExplorerState>({
  rootIds: [],
  nodes: {},
})

export async function openRoot(path: string) {
  const entries = await readDirOnce(path)
  explorerStore.set({
    rootIds: [path],
    nodes: {
      [path]: { id: path, name: basename(path), isFolder: true, children: entries.map(e => e.path) },
      ...Object.fromEntries(entries.map(e => [e.path, { id: e.path, name: e.name, isFolder: e.isDir }])),
    },
  })
}

export async function ensureLoaded(id: NodeId) {
  const state = explorerStore.get()
  const node = state.nodes[id]
  if (!node || !node.isFolder || node.children) return
  const entries = await readDirOnce(id)
  explorerStore.set({
    ...state,
    nodes: {
      ...state.nodes,
      [id]: { ...node, children: entries.map(e => e.path) },
      ...Object.fromEntries(entries.map(e => [e.path, { id: e.path, name: e.name, isFolder: e.isDir }])),
    },
  })
}

export async function activateFile(id: NodeId) {
  const content = await readFile(id)
  const uri = monaco.Uri.parse(`inmemory://${id}`)
  const ext = id.split('.').pop() || ''
  const lang = getLanguageFromExtension(ext)
  let model = monaco.editor.getModel(uri)
  if (!model) model = monaco.editor.createModel(content, lang, uri)
  explorerStore.setKey('activeId', id)
  editorInstance?.setModel(model)
}

let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null
export function registerEditor(editor: monaco.editor.IStandaloneCodeEditor) {
  editorInstance = editor
}

function basename(p: string) {
  return p.replace(/[/\\]$/, '').split(/[/\\]/).pop() || p
}
