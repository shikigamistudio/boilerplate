import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  handle({ inertia }: HttpContext) {
    return inertia.render('auth/profile')
  }
}
