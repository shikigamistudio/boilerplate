import { errors as adonisAuthErrors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import SendVerifyEmailsAction from '#actions/send_verify_emails_action'
import type { ViewProps } from '#config/inertia'
import { errors as authErrors } from '#exceptions/auth/index'
import User from '#models/user'

/** Handle profile-related actions */
export default class ProfileController {
  /** Define the schema for profile updates */
  static schema = vine.object({
    fullName: vine.string().trim().optional(),
    email: vine.string().email().optional(),
    current_password: vine.string().optional().requiredIfAnyExists(['email', 'new_password']),
    new_password: vine.string().minLength(8).maxLength(52).password().confirmed().optional(),
  })

  /** Renders the profile page */
  handle({ inertia }: HttpContext) {
    return inertia.render<Record<string, any>, ViewProps>('auth/profile', undefined, {
      title: 'Profile',
    })
  }

  /** Executes the profile update process */
  async execute({ auth, request, response, session }: HttpContext) {
    /** Step 1: Get user data from the request body */
    const requestData = request.only([
      'fullName',
      'email',
      'current_password',
      'new_password',
      'new_password_confirmation',
    ])

    /** Step 2: Validate the data */
    const validateData = await vine.validate({
      schema: ProfileController.schema,
      data: requestData,
      messagesProvider: new SimpleMessagesProvider({
        required: 'The current password field must be defined',
        confirmed: 'The new password and the confirmation must be the same',
      }),
    })

    /** Step 3: Verify user connection */
    const user = auth.user
    if (!user) throw new authErrors.E_UNLOGGED()
    if (validateData.current_password) {
      try {
        await User.verifyCredentials(user.email, validateData.current_password)
      } catch (error) {
        if (error instanceof adonisAuthErrors.E_INVALID_CREDENTIALS) {
          session.flash('errors', { current_password: 'Invalid password' })
          return response.redirect().toRoute('profile')
        }
        throw error
      }
    }

    /** Step 4: Update user information */
    // TODO send mail to old email to validate the email change if not intended
    user.fullName = validateData.fullName
    if (user.hasEmailValidate && validateData.email && user.email !== validateData.email) {
      // Set the new mail and set back validation to null
      user.email = validateData.email
      user.emailValidateAt = null

      // Extract the origin (protocol + host) from the complete URL of the request
      const hostUrl = new URL(request.completeUrl()).origin

      // Send the verification email to the created user
      const action = new SendVerifyEmailsAction(user, hostUrl)
      await action.send()
    }
    if (validateData.new_password && user.password !== validateData.new_password) {
      user.password = validateData.new_password
    }

    /** Step 5: Save the user */
    await user.save()

    /** Step 6: Redirect to the profile page */
    return response.redirect().toRoute('profile')
  }
}
