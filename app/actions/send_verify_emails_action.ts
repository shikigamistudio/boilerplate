import VerifyEmailNotification from '#mails/verify_email_notification'
import User from '#models/user'
import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

/** SendVerifyEmailsAction class handles sending verification emails to users. */
export default class SendVerifyEmailsAction {
  /**
   * Constructor to initialize the class with a user.
   *
   * @param user - The user to whom the verification email will be sent
   */
  constructor(private user: User) {}

  /** Sends the verification email to the user. */
  async send() {
    // Generate a signed verification link with a 1-hour expiry
    const link = router
      .builder()
      .prefixUrl('http://boilerplate.localhost:3333') // Base URL for the verification link
      .params({ id: this.user.id }) // Include user ID as a parameter in the link
      .makeSigned('verify-email', {
        expiresIn: '1 hour', // Set the expiry time for the link
      })

    // Retry link without signed parameters
    const linkRetry = 'http://localhost:3333'

    // Send the verification email with the generated link and retry link
    await mail.sendLater(new VerifyEmailNotification(this.user, link, linkRetry))
  }
}
