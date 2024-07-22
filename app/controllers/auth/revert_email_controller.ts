import type { HttpContext } from '@adonisjs/core/http'

import { errors as mailErrors } from '#exceptions/mails/index'

/**
 * RevertEmailController handles the revert of user email addresses
 * when they follow a revert link.
 */
export default class RevertEmailController {
  /** Handles the email revert process. */
  async handle({ request, response }: HttpContext) {
    /** Step 1: Check if the request URL has a valid signature. */
    if (!request.hasValidSignature()) {
      // Return a bad request response if the URL is invalid or expired
      throw new mailErrors.E_INVALID_EXPIRED_URL()
    }

    return response.redirect().toRoute('profile')
  }
}
