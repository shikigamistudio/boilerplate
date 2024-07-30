import type { HttpContext } from '@adonisjs/core/http'

/** Handle delete user related actions */
export default class DeleteUsersController {
  /** Executes the user deletion */
  async execute({ auth, response }: HttpContext) {
    /** Step 1: Retrieve the current user */
    const user = auth.user

    /** Step 2: Delete the current user */
    await user?.delete()

    /** Step 3: Log the user out */
    await auth.use('web').logout()

    /** Step 4: Redirect the user to the home page */
    return response.redirect().toPath('/')
  }
}
