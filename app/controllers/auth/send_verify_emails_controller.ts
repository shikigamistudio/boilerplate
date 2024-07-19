import type { HttpContext } from '@adonisjs/core/http'
import SendVerifyEmailsAction from '#actions/send_verify_emails_action'

/**
 * SendVerifyEmailsController class handles the HTTP request for sending
 * verification emails to authenticated users.
 */
export default class SendVerifyEmailsController {
  /**
   * Executes the action to send a verification email to the authenticated user.
   *
   * @param ctx - The HTTP context containing authentication and response objects
   */
  async execute({ auth, response }: HttpContext) {
    /** Step 1: Check if the user is authenticated */
    if (!auth.user) {
      // Return unauthorized response if the user is not logged in
      return response.unauthorized('You need to be logged to proceed an email verification')
    }

    /** Step 2: Instantiate the SendVerifyEmailsAction with the authenticated user. */
    const action = new SendVerifyEmailsAction(auth.user)

    /** Step 3: Send the verification email. */
    await action.send()

    /** Step 4: Redirect back to the previous page after sending the email. */
    return response.redirect().back()
  }
}
