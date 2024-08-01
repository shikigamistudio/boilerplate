import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { useDelayedRenderList } from '~/hooks/use_delayed_render_list_hook'

import { Toast } from './toast'

export function ToastList() {
  const { toasts } = usePage<SharedProps>().props

  const delayedList = useDelayedRenderList(250, toasts, 10000)

  if (delayedList.length > 0) {
    return (
      <div className="fixed bottom-2 right-2 z-10 flex max-w-xs flex-col-reverse gap-y-2">
        {delayedList.map((toast, index) => (
          <Toast
            type={toast.type}
            title={toast.title}
            key={index}
            zIndex={delayedList.length - index}
          >
            {toast.message}
          </Toast>
        ))}
      </div>
    )
  }

  return <></>
}
