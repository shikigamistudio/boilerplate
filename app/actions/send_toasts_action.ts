import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import type { Session } from '@adonisjs/session'

@inject()
export default class SendToastsAction {
  private toasts: Toast[]
  private session: Session

  constructor(ctx: HttpContext) {
    this.session = ctx.session
    this.toasts = this.session?.flashMessages.get('toast') || []
  }

  send(type: keyof typeof ToastType, message: string, title?: string) {
    this.toasts.push({ type, message, title })
    this.session.flash({ toast: this.toasts })
  }
}

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
