import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async execute({ auth, response }: HttpContext) {
    /** Step 1: Send them to a guest route */
    await auth.use('web').logout()

    /** Step 2: Send them to a guest route */
    return response.redirect().toPath('/')
  }
}
