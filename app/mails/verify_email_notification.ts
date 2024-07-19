import { BaseMail } from '@adonisjs/mail'

import type User from '#models/user'

export default class VerifyEmailNotification extends BaseMail {
  from = 'no-reply@shikigamistudio.com'
  subject = 'Welcome to ShikigamiStudio | Verify your email address'

  constructor(
    private user: User,
    private link: string,
    private linkRetry: string
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message.to(this.user.email)
    this.message.htmlView('emails/verify_email_html', {
      user: this.user,
      link: this.link,
      linkRetry: this.linkRetry,
    })
  }
}
