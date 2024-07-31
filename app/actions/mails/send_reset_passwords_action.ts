import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

import ResetPasswordNotification from '#mails/reset_password_notification'
import PasswordReset from '#models/password_reset'
import type User from '#models/user'

export default class SendResetPasswordsAction {
  /**
   * Constructor to initialize the class with a user and the host URL.
   *
   * @param user - The user to whom the verification email will be sent
   * @param hostUrl - The base URL of the host, used for generating the verification link
   */
  constructor(
    private user: User,
    private hostUrl: string
  ) {}

  /** Sends the reset password email to the user. */
  async send() {
    // Find or create a password reset entry for the user's email
    const passwordReset = await PasswordReset.firstOrCreate({ email: this.user.email })

    // Generate a signed reset password link with a 1-day expiry
    const link = router
      .builder()
      .prefixUrl(this.hostUrl) // Base URL for the verification link
      .params({ token: passwordReset.token }) // Include the password reset token as a parameter
      .makeSigned('reset-password', {
        expiresIn: '1 day', // Set the expiry time for the link
      })

    // force the user name
    this.user.fullName = this.user.fullName || this.user.$original.fullName

    // Send the reset password email with the generated link
    await mail.sendLater(new ResetPasswordNotification(this.user, link, this.hostUrl))
  }
}
