import type { SessionType } from '#helpers/send_toast'

export interface ToastProperties {
  type: keyof typeof SessionType
  children: string
}

export function Toast(props: ToastProperties) {
  const { type, children } = props

  switch (type) {
    case 'success':
      return <p>success : {children}</p>
  }
  return <p>fail</p>
}
