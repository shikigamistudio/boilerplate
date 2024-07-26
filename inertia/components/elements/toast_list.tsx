import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'

import { Toast } from './toast'

export function ToastList() {
  const { toasts } = usePage<SharedProps>().props

  if (toasts) {
    return (
      <div className="fixed bottom-2 right-2 z-10 flex max-w-xs flex-col-reverse">
        {toasts.map((m, index) => (
          <Toast type={m.type} title={m.title} key={index}>
            {m.message}
          </Toast>
        ))}
      </div>
    )
  }

  return <></>
}
