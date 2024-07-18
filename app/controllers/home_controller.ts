import type { HttpContext } from '@adonisjs/core/http'

/** Handle home page rendering */
export default class HomeController {
  /** Renders the landing page */
  handle({ inertia }: HttpContext) {
    return inertia.render('landing')
  }
}
