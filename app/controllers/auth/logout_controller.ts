import type { HttpContext } from '@adonisjs/core/http'

/** Handle logout-related actions */
export default class LogoutController {
  /** Executes the logout process */
  async execute({ auth, response }: HttpContext) {
    /** Step 1: Log the user out */
    await auth.use('web').logout()

    /** Step 2: Redirect the user to the home page */
    return response.redirect().toPath('/')
  }
}
