import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import SendToastsAction from '#actions/send_toasts_action'

/** Handle delete user related actions */
@inject()
export default class DeleteUsersController {
  constructor(protected sendToastAction: SendToastsAction) {}

  /** Executes the user deletion */
  async execute({ auth, response }: HttpContext) {
    /** Step 1: Retrieve the current user */
    const user = auth.user

    /** Step 2: Delete the current user */
    await user?.delete()

    /** Step 3: Log the user out */
    await auth.use('web').logout()

    /** Step 4: Notify the user */
    this.sendToastAction.send(
      'success',
      'Your account has been successfully deleted. We are sorry to see you go.',
      'Account Deletion'
    )

    /** Step 5: Redirect the user to the home page */
    return response.redirect().toPath('/')
  }
}
