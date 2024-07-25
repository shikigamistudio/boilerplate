import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

import { errors as mailErrors } from '#exceptions/mails/index'
import VerifyEmailNotification from '#mails/verify_email_notification'
import type User from '#models/user'

/** SendVerifyEmailsAction class handles sending verification emails to users. */
export default class SendVerifyEmailsAction {
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

  /** Sends the verification email to the user. */
  async send() {
    // Throw an exception if the user's email is already verified
    if (this.user.hasEmailValidate) throw new mailErrors.E_ALREADY_VERIFIED_EMAIL()

    // Generate a signed verification link with a 1-hour expiry
    const link = router
      .builder()
      .prefixUrl(this.hostUrl) // Base URL for the verification link
      .params({ id: this.user.id }) // Include user ID as a parameter in the link
      .makeSigned('verify-email', {
        expiresIn: '1 hour', // Set the expiry time for the link
      })

    // Generate a retry verification link using the router builder.
    const linkRetry = router.builder().prefixUrl(this.hostUrl).make('retry.verify-email')

    // Send the verification email with the generated link and retry link
    await mail.sendLater(new VerifyEmailNotification(this.user, link, linkRetry, this.hostUrl))
  }
}
