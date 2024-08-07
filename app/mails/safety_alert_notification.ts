import type { ModelObject } from '@adonisjs/lucid/types/model'
import { BaseMail } from '@adonisjs/mail'

import type SendSafetyAlertAction from '#actions/mails/send_safety_alert_action'

export default class SafetyAlertNotification extends BaseMail {
  from = 'no-reply@shikigamistudio.com'
  subject = 'Safety alert'

  /**
   * Constructor to initialize the VerifyEmailNotification class.
   *
   * @param user - The user to whom the verification email is being sent
   * @param link - The revert email link to be included in the email
   * @param hostUrl - The base URL of the host, used for generating the verification link
   */
  constructor(
    private user: ModelObject,
    private link: string,
    private hostUrl: string,
    private changes: Parameters<SendSafetyAlertAction['send']>[0]
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   * It sets up the email recipient and the HTML view with necessary data.
   */
  prepare() {
    /** Step 1: Set the recipient's email address. */
    this.message.to(this.user.email)

    /** Step 2: Set the email content. */
    this.message.htmlView('emails/safety_alert_html', {
      user: this.user, // Pass the user data to the email view
      link: this.link, // Pass the revert email link to the email view
      hostUrl: this.hostUrl, // Pass the host URL to the email view
      changes: Object.keys(this.changes), // Pass the list of changed fields to the email view
    })
  }
}
