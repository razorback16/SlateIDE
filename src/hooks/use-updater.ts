import { listen } from '@tauri-apps/api/event'
import { createConsola } from 'consola/basic'
import { useEffect } from 'react'

interface UpdateStatus {
  status: string
  progress?: number
  error?: string
  timestamp: number
  formatted_time: string
}

export function useUpdateHandler() {
  const log = createConsola({ defaults: { tag: 'app-updater' } })

  useEffect(() => {
    const setupListener = async () => {
      const unlistenUpdate = await listen<UpdateStatus>('app-updater', (event) => {
        const { status, progress, error, formatted_time } = event.payload

        switch (status) {
          case 'downloading':
            log.info(formatted_time, `Downloading update: ${progress?.toFixed(2)}%`)
            break
          case 'ready':
            log.success(formatted_time, 'Update downloaded and ready to install')
            break
          case 'up-to-date':
            log.info(formatted_time, 'Application is up to date')
            break
          case 'error':
            log.error(formatted_time, error)
            break
        }
      })

      return unlistenUpdate
    }

    let unlisten: (() => void) | undefined

    setupListener().then((fn) => {
      unlisten = fn
    })

    return () => {
      if (unlisten) {
        unlisten()
      }
    }
  }, [log])
}
