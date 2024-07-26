import type { Session } from '@adonisjs/session'

export const SessionType = {
  success: 'success',
  warn: 'warn',
  info: 'info',
  error: 'error',
} as const

export function sendToast(
  session: Session,
  type: keyof typeof SessionType,
  message: string | string[]
) {
  if (!Object.values(SessionType).includes(type)) {
    throw new Error('Invalid toast type')
  }

  const oldMessage: string[] = session.flashMessages.get('toast.' + type) || []

  if (Array.isArray(message)) {
    session.flash('toast.' + type, [...oldMessage, ...message])
  } else {
    session.flash('toast.' + type, [...oldMessage, message])
  }
}
