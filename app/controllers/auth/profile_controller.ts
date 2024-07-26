import { errors as adonisAuthErrors } from '@adonisjs/auth'
import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import SendSafetyAlertAction from '#actions/mails/send_safety_alert_action'
import SendVerifyEmailsAction from '#actions/mails/send_verify_emails_action'
import type { ViewProps } from '#config/inertia'
import { errors as authErrors } from '#exceptions/auth/index'
import { objectHelper } from '#helpers/objects_helper'
import { sendToast } from '#helpers/send_toast'
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

    /** Step 4: Create an instance of SendRevertEmailChangesAction with the user and host URL */
    const hostUrl = new URL(request.completeUrl()).origin
    const safetyAction = new SendSafetyAlertAction(user, hostUrl)
    const changes: Parameters<SendSafetyAlertAction['send']>[0] = {}

    /** Step 5: Update user email */
    user.fullName = validateData.fullName
    if (user.hasEmailValidate && validateData.email && user.email !== validateData.email) {
      // Store old data in the modified state object
      changes.email = user.email
      changes.emailValidateAt = user.emailValidateAt

      // Set the new mail and set back validation to null
      user.email = validateData.email
      user.emailValidateAt = null

      // Send the verification email to the created user
      const action = new SendVerifyEmailsAction(user, hostUrl)
      await action.send()
    }
    if (validateData.new_password && user.password !== validateData.new_password) {
      changes.password = user.password
      user.password = validateData.new_password
    }

    /** Step 6: Send a safty alert to old email (if changed) */
    if (!objectHelper.isEmpty(changes)) {
      await safetyAction.send(changes)
    }

    /** Step 7: Save the user */
    await user.save()

    /** Step 8: Redirect to the profile page */
    sendToast(session, 'success', 'Your profile has been successfully updated.', 'Profile Updated')
    return response.redirect().toRoute('profile')
  }
}
