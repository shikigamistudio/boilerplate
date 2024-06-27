import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class HomeController {
  handle({ inertia }: HttpContext) {
    let appPath = app.makePath('.')
    appPath = appPath[0].toLowerCase() + appPath.slice(1).replace(/\\/g, '/')

    return inertia.render('landing', { appPath })
  }
}
