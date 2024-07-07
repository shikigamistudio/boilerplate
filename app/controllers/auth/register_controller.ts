import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import User from '#models/user'

export default class RegisterController {
  static schema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(4).maxLength(52).confirmed(),
  })

  handle({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async execute({ request, auth, response, session }: HttpContext) {
    /** Step 1: Get credentials from the request body */
    const {
      email,
      password,
      password_confirmation: passwordConfirmation,
    } = request.only(['email', 'password', 'password_confirmation'])

    /** Step 2: Validate new users credentials */
    const validateData = await vine.validate({
      schema: RegisterController.schema,
      data: { email, password, password_confirmation: passwordConfirmation },
      messagesProvider: new SimpleMessagesProvider({
        confirmed: 'The password and the confirmation must be the same',
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
