import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

import SafetyAlertNotification from '#mails/safety_alert_notification'
import SafetyAlert from '#models/safety_alert'
import type User from '#models/user'

export default class SendSafetyAlertAction {
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
    const revertEmailChange = await SafetyAlert.create({
      userId: this.user.id,
      changes: { email: this.user.email },
    })

    // Generate a signed revert account link with a 1-week expiry
    const link = router
      .builder()
      .prefixUrl(this.hostUrl) // Base URL for the verification link
      .params({ token: revertEmailChange.token }) // Add token as a URL parameter
      .makeSigned('safety-alert', {
        expiresIn: '1 week', // Set the expiry time for the link
      })

    // Send the verification email with the generated link
    await mail.sendLater(new SafetyAlertNotification(this.user, link, this.hostUrl))
  }
}
