import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import type { PasswordResetToken } from '#models/password_reset'
import PasswordReset from '#models/password_reset'
import User from '#models/user'

/** Handle reset password-related actions */
export default class ResetPasswordController {
  /** Define the validation schema for the password reset */
  static schema = vine.object({
    password: vine.string().minLength(8).maxLength(52).password().confirmed(),
  })

  /** Render the reset password page. */
  async handle({ inertia, params }: HttpContext) {
    /** Step 1: Extract the token from the request parameters. */
    const token: PasswordResetToken = params.token

    /** Step 2: Check if the token exists, throw error if not found. */
    await PasswordReset.findOrFail(token)

    /** Step 3: Render the reset password page with the token. */
    return inertia.render('auth/reset_password', { token })
  }

  /** Executes the password reset process. */
  async execute({ params, request, response }: HttpContext) {
    /** Step 1: Extract password and password confirmation from the request */
    const requestData = request.only(['password', 'password_confirmation'])
    const token: PasswordResetToken = params.token

    /** Step 2: Validate the request data using the defined schema */
    const validateData = await vine.validate({
      schema: ResetPasswordController.schema,
      data: requestData,
      messagesProvider: new SimpleMessagesProvider({
        confirmed: 'The password and the confirmation must be the same',
      }),
    })

    /** Step 3: Find the PasswordReset entry and associated user by email */
    const passwordReset = await PasswordReset.findOrFail(token) // Find the PasswordReset entry by token
    const user = await User.findByOrFail('email', passwordReset.email) // Find the user by email

    /** Step 4: Update the user's password with the validated data */
    user.password = validateData.password

    /** Step 5: Save the user and delete the PasswordReset entry */
    await user.save()
    await passwordReset.delete()

    /** Step 6: Redirect to the login page after successful password reset */
    return response.redirect('/login')
  }
}
