import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import SendResetPasswordsAction from '#actions/send_reset_passwords_action'
import User from '#models/user'

/** Handle forgot password-related actions */
export default class ForgotPasswordController {
  /** Define the validation schema for the forgot password form */
  static schema = vine.object({
    email: vine.string().email(),
  })

  /** Render the forgot password page. */
  handle({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password')
  }

  /** Executes the forgot password process. */
  async execute({ request, response }: HttpContext) {
    /** Step 1: Extract email from the request */
    const requestData = request.only(['email'])

    /** Step 2: Validate the request data using the defined schema */
    const validateData = await vine.validate({
      schema: ForgotPasswordController.schema,
      data: requestData,
    })

    /** Step 3: Find the user by email */
    const user = await User.findBy('email', validateData.email)

    /** Step 4: If the user exists, send the reset password email */
    if (user !== null) {
      // Extract the origin (protocol + host) from the complete URL of the request
      const hostUrl = new URL(request.completeUrl()).origin

      // Instantiate the SendResetPasswordsAction with the user and host URL
      const action = new SendResetPasswordsAction(user, hostUrl)

      // Send the reset password email
      action.send()
    }

    /** Step 5: Redirect to the login page after processing the forgot password request */
    return response.redirect('/login')
  }
}
