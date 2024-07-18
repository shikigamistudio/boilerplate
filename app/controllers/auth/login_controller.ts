import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

/** Handle login-related actions */
export default class LoginController {
  /** Renders the login page */
  handle({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /** Executes the login process */
  async execute({ auth, request, response, session }: HttpContext) {
    /** Step 1: Get credentials from the request body */
    const { email, password } = request.only(['email', 'password'])

    /** Step 2: Verify credentials */
    let user: User | undefined
    try {
      // Check if the user credentials are valid
      user = await User.verifyCredentials(email, password)
    } catch (error) {
      // If verification fails, flash an error message and redirect back
      session.flash('errors', 'Invalid user credentials')
      return response.redirect().back()
    }

    /** Step 3: Log the user in using the 'web' authentication guard */
    await auth.use('web').login(user)

    /** Step 4: Redirect the user to the home page after successful login */
    response.redirect('/')
  }
}
