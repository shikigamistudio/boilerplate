import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilController {
  handle({ inertia }: HttpContext) {
    return inertia.render('auth/profil')
  }
}
