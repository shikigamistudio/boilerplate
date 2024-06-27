import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  handle({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  execute({ response }: HttpContext) {
    return response.redirect('/register')
  }
}
