import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class LoginController {
  handle({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ request, auth, response, session }: HttpContext) {
    /** Step 1: Get credentials from the request body */
    const { email, password } = request.only(['email', 'password'])

    /** Step 2: Verify credentials */
    let user: User | undefined
    try {
      user = await User.verifyCredentials(email, password)
    } catch (error) {
      session.flash('errors', 'Invalid user credentials')
      return response.redirect().back()
    }

    /** Step 3: Login user */
    await auth.use('web').login(user)

    /** Step 4: Send them to a protected route */
    response.redirect('/')
  }
}
