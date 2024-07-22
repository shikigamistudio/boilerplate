import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

import RevertEmailChangeNotification from '#mails/revert_email_change_notification'
import type User from '#models/user'

export default class SendRevertEmailChangesAction {
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

  /** Sends the revert email to the user. */
  async send() {
    // Generate a signed revert email link with a 1-week expiry
    const link = router
      .builder()
      .prefixUrl(this.hostUrl) // Base URL for the verification link
      .params({ id: this.user.id }) // Include user ID as a parameter in the link
      .makeSigned('verify-email', {
        expiresIn: '1 week', // Set the expiry time for the link
      })

    // Send the verification email with the generated link and retry link
    await mail.sendLater(new RevertEmailChangeNotification(this.user, link, this.hostUrl))
  }
}
