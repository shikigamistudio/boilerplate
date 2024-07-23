import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

import AccountChangesNotification from '#mails/account_changes_notification'
import AccountChange from '#models/revert_email_change'
import type User from '#models/user'

export default class SendRevertAccountAction {
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
    // Create a RevertEmailChange record with the current user's ID and email
    const revertEmailChange = await AccountChange.create({
      userId: this.user.id,
      email: this.user.email,
    })

    // Generate a signed revert account link with a 1-week expiry
    const link = router
      .builder()
      .prefixUrl(this.hostUrl) // Base URL for the verification link
      .params({ token: revertEmailChange.token }) // Add token as a URL parameter
      .makeSigned('revert-account', {
        expiresIn: '1 week', // Set the expiry time for the link
      })

    // Send the verification email with the generated link
    await mail.sendLater(new AccountChangesNotification(this.user, link, this.hostUrl))
  }
}
