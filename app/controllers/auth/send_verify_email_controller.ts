import type { HttpContext } from '@adonisjs/core/http'

import SendVerifyEmailsAction from '#actions/send_verify_emails_action'
import { errors as authErrors } from '#exceptions/auth/index'

/**
 * SendVerifyEmailsController class handles the HTTP request for sending
 * verification emails to authenticated users.
 */
export default class SendVerifyEmailController {
  /**
   * Executes the action to send a verification email to the authenticated user.
   *
   * @param ctx - The HTTP context containing authentication and response objects
   * @param ctx.auth - The authentication context containing user information
   * @param ctx.request - The HTTP request object containing request data
   * @param ctx.response - The HTTP response object for sending responses to the client
   */
  async execute({ auth, request, response }: HttpContext) {
    /** Step 1: Check if the user is authenticated */
    if (!auth.user) {
      // Return unauthorized response if the user is not logged in
      throw new authErrors.E_UNLOGGED('You need to be logged to proceed an email verification')
    }

    /** Step 2: Extract the origin (protocol + host) from the complete URL of the request */
    const hostUrl = new URL(request.completeUrl()).origin

    /** Step 3: Instantiate the SendVerifyEmailsAction with the authenticated user. */
    const action = new SendVerifyEmailsAction(auth.user, hostUrl)

    /** Step 4: Send the verification email. */
    await action.send()

    /** Step 5: Redirect back to the previous page after sending the email. */
    return response.redirect().toRoute('profile')
  }
}
