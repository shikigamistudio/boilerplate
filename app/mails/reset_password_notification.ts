import { BaseMail } from '@adonisjs/mail'

import type User from '#models/user'

export default class ResetPasswordNotification extends BaseMail {
  from = 'no-reply@shikigamistudio.com'
  subject = 'Reset Your ShikigamiStudio Account Password'

  /**
   * Constructor to initialize the ResetPasswordNotification class.
   *
   * @param user - The user to whom the verification email is being sent
   * @param link - The verification link to be included in the email
   * @param hostUrl - The base URL of the host, used for generating the verification link
   */
  constructor(
    private user: User,
    private link: string,
    private hostUrl: string
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    /** Step 1: Set the recipient's email address. */
    this.message.to(this.user.email)

    /** Step 2: Set the email content. */
    this.message.htmlView('emails/reset_password_html', {
      user: this.user, // Pass the user data to the email view
      link: this.link,
      hostUrl: this.hostUrl, // Pass the host URL to the email view
    })
  }
}
