import type { Session } from '@adonisjs/session'

export const ToastType = {
  success: 'success',
  warn: 'warn',
  info: 'info',
  error: 'error',
} as const

export type Toast = {
  type: keyof typeof ToastType
  title?: string
  message: string
}

export function sendToast(
  session: Session,
  type: Toast['type'],
  message: Toast['message'],
  title?: Toast['title']
) {
  if (!Object.values(ToastType).includes(type)) {
    throw new Error('Invalid toast type')
  }

  const len = session.flashMessages.get('toast')?.length || 0

  session.flash(`toast[${len}]`, {
    type,
    title,
    message,
  })

  // const oldMessage: string[] = session.flashMessages.get('toast.' + type) || []

  // if (Array.isArray(message)) {
  //   session.flash('toast.' + type, [...oldMessage, ...message])
  // } else {
  //   session.flash('toast.' + type, [...oldMessage, message])
  // }
}
