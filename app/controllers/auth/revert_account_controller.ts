import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import type { ViewProps } from '#config/inertia'
import { errors as mailErrors } from '#exceptions/mails/index'
import AccountChange from '#models/revert_email_change'

/**
 * RevertEmailController handles the revert of user email addresses
 * when they follow a revert link.
 */
export default class RevertAccountController {
  async handle({ inertia, params, request }: HttpContext) {
    /** Step 1: */
    const token: AccountChange = params.token

    /** Step 2: Check if the token exists, throw error if not found. */
    const t = await AccountChange.find(token)
    if (t === null) {
      // Return a bad request response if the URL is invalid or expired
      throw new mailErrors.E_INVALID_EXPIRED_URL()
    }
    await t.load('user')
    await t.delete()

    /** Step 3: Check if the request URL has a valid signature. */
    if (!request.hasValidSignature()) {
      // Return a bad request response if the URL is invalid or expired
      throw new mailErrors.E_INVALID_EXPIRED_URL()
    }

    /** Step 3: */
    t.user.email = t.email
    t.user.emailValidateAt = DateTime.now()

    /** Step 4: */
    await t.user.save()

    /** Step 5:  */
    return inertia.render<Record<string, any>, ViewProps>(
      'auth/revert_account_changes',
      undefined,
      {
        title: 'Revert Account',
      }
    )
  }
}
