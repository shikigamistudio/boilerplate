import { combine } from '#helpers/class_name_combine_helper'
import type { Toast as ToastType } from '#helpers/send_toast'

export interface ToastProperties {
  type: ToastType['type']
  title: ToastType['title']
  children: ToastType['message']
}

export function Toast(props: ToastProperties) {
  const { type, title, children } = props

  const iconStyle = 'w-5'
  let toastColor = 'bg-white'
  let icon: JSX.Element | undefined
  switch (type) {
    case 'success':
      toastColor = 'bg-green-100 text-green-800'
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={combine('fill-green-800', iconStyle)}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
      )
      break
    case 'error':
      toastColor = 'bg-red-100 text-red-800'
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={combine('fill-red-800', iconStyle)}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
        </svg>
      )
      break
    case 'info':
      toastColor = 'bg-blue-100 text-blue-800'
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={combine('fill-blue-800', iconStyle)}
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
      )
      break
    case 'warn':
      toastColor = 'bg-orange-100 text-orange-800'
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={combine('fill-orange-800', iconStyle)}
        >
          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
        </svg>
      )
      break
  }

  return (
    <div className={combine('py-2 px-3 rounded-md flex gap-3', toastColor)}>
      {icon}
      <div>
        <p>{title}</p>
        <p className="text-sm">{children}</p>
      </div>
    </div>
  )
}
