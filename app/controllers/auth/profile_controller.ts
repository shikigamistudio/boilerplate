import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import User from '#models/user'

export default class ProfileController {
  static schema = vine.object({
    fullName: vine.string().trim().optional(),
    email: vine.string().email().optional(),
    current_password: vine.string().optional().requiredIfAnyExists(['email', 'new_password']),
    new_password: vine
      .string()
      .minLength(8)
      .maxLength(52)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/)
      .confirmed()
      .optional(),
  })

  handle({ inertia }: HttpContext) {
    return inertia.render('auth/profile')
  }

  async execute({ auth, request, response }: HttpContext) {
    /** Step 1: Get users from the request body */
    const requestData = request.only([
      'fullName',
      'email',
      'current_password',
      'new_password',
      'new_password_confirmation',
    ])

    /** Step 2: Validate datas */
    const validateData = await vine.validate({
      schema: ProfileController.schema,
      data: requestData,
      messagesProvider: new SimpleMessagesProvider({
        required: 'The current password field must be defined',
        confirmed: 'The new password and the confirmation must be the same',
        regex:
          'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      }),
    })

    /** Step 3: Verify user connexion */
    const user = auth.user
    if (!user) throw new Error('The user must be logged')
    if (validateData.current_password) {
      await User.verifyCredentials(user.email, validateData.current_password)
    }

    /** Step 4: Update user infos */
    user.fullName = validateData.fullName
    if (validateData.email) user.email = validateData.email
    if (validateData.new_password) user.password = validateData.new_password

    /** Step 5: Save the user */
    await user.save()

    /** Step 6: Send them to a protected route */
    response.redirect('/profile')
  }
}
