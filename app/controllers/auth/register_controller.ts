import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import User from '#models/user'

export default class RegisterController {
  static schema = vine.object({
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(8)
      .maxLength(52)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/)
      .confirmed(),
  })

  handle({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async execute({ auth, request, response, session }: HttpContext) {
    /** Step 1: Get credentials from the request body */
    const requestData = request.only(['email', 'password', 'password_confirmation'])

    /** Step 2: Validate new users credentials */
    const validateData = await vine.validate({
      schema: RegisterController.schema,
      data: requestData,
      messagesProvider: new SimpleMessagesProvider({
        confirmed: 'The password and the confirmation must be the same',
        regex:
          'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      }),
    })

    /** Step 3: Create the user */
    let user: User | undefined
    try {
      user = await User.create(validateData)
    } catch (error) {
      session.flash('errors', 'The user already exist')
      return response.redirect().back()
    }

    /** Step 4: Login user */
    await auth.use('web').login(user)

    /** Step 5: Send them to a protected route */
    response.redirect('/')
  }
}
