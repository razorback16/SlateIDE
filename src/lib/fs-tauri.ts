export type DirEntry = { path: string; name: string; isDir: boolean }

let impl: 'v2' | 'v1' | null = null

export async function readDirOnce(path: string): Promise<DirEntry[]> {
  if (!impl) impl = await detect()
  return impl === 'v2' ? readDirV2(path) : readDirV1(path)
}

export async function readFile(path: string): Promise<string> {
  if (!impl) impl = await detect()
  return impl === 'v2' ? readFileV2(path) : readFileV1(path)
}

export async function writeFile(path: string, contents: string): Promise<void> {
  if (!impl) impl = await detect()
  return impl === 'v2' ? writeFileV2(path, contents) : writeFileV1(path, contents)
}

async function detect(): Promise<'v2' | 'v1'> {
  try {
    // @ts-ignore dynamic import
    const mod = await import('@tauri-apps/plugin-fs')
    if (mod?.readDir) return 'v2'
  } catch {}
  return 'v1'
}

// ----- v2 plugin -----
async function readDirV2(path: string): Promise<DirEntry[]> {
  const { readDir } = await import('@tauri-apps/plugin-fs')
  const entries = await readDir(path, { recursive: false })
  return entries.map((e: any) => ({ path: e.path, name: e.name ?? basename(e.path), isDir: !!e.isDirectory }))
}

async function readFileV2(path: string): Promise<string> {
  const { readTextFile } = await import('@tauri-apps/plugin-fs')
  return readTextFile(path)
}

async function writeFileV2(path: string, contents: string): Promise<void> {
  const { writeTextFile } = await import('@tauri-apps/plugin-fs')
  await writeTextFile(path, contents)
}

// ----- v1 core -----
async function readDirV1(path: string): Promise<DirEntry[]> {
  const { readDir } = await import('@tauri-apps/api/fs')
  const entries = await readDir(path, { recursive: false })
  return entries.map((e: any) => ({ path: e.path, name: e.name ?? basename(e.path), isDir: !!e.children }))
}

async function readFileV1(path: string): Promise<string> {
  const { readTextFile } = await import('@tauri-apps/api/fs')
  return readTextFile(path)
}

async function writeFileV1(path: string, contents: string): Promise<void> {
  const { writeTextFile } = await import('@tauri-apps/api/fs')
  await writeTextFile(path, contents)
}

// Helpers
export function basename(p: string) {
  return p.replace(/[/\\]$/, '').split(/[/\\]/).pop() || p
}
