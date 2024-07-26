import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'

import { Toast } from './toast'

export function ToastList() {
  const { toasts } = usePage<SharedProps>().props

  return (
    <div>
      {toasts &&
        Object.entries(toasts).map(([type, messages]) =>
          messages.map((message) => <Toast type={type}>{message}</Toast>)
        )}
    </div>
  )
}
