import type { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import type { Toast as ToastType } from '#actions/send_toasts_action'

const toastVariants = tv({
  slots: {
    iconColor: ['w-5', 'shrink-0'],
    toastColor: ['py-2', 'px-3', 'rounded-md', 'flex', 'gap-3', 'animate-slide-up-in', 'opacity-0'],
  },
  variants: {
    type: {
      success: {
        iconColor: 'fill-green-800',
        toastColor: ['bg-green-100', 'text-green-800'],
      },
      error: {
        iconColor: 'fill-red-800',
        toastColor: ['bg-red-100', 'text-red-800'],
      },
      info: {
        iconColor: 'fill-blue-800',
        toastColor: ['bg-blue-100', 'text-blue-800'],
      },
      warn: {
        iconColor: 'fill-orange-800',
        toastColor: ['bg-orange-100', 'text-orange-800'],
      },
    },
  },
})

export interface ToastProperties {
  type: ToastType['type']
  title: ToastType['title']
  children: ToastType['message']
  zIndex?: number
}

export function Toast(props: ToastProperties) {
  const { type, title, children, zIndex } = props

  const { iconColor, toastColor } = toastVariants({ type })

  let path: ReactNode | undefined
  switch (type) {
    case 'success':
      path = (
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
      )
      break
    case 'error':
      path = (
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
      )
      break
    case 'info':
      path = (
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
      )
      break
    case 'warn':
      path = (
        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
      )
      break
  }

  return (
    <div className={toastColor()} style={{ zIndex }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={iconColor()}>
        {path}
      </svg>
      <div>
        <p>{title}</p>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  )
}
