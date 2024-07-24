import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import type { ViewProps } from '#config/inertia'
import { errors as mailErrors } from '#exceptions/mails/index'
import SafetyAlert, { type SafetyAlertToken } from '#models/safety_alert'

/**
 * RevertEmailController handles the revert of user email addresses
 * when they follow a revert link.
 */
export default class RevertAccountController {
  async handle({ inertia, params, request }: HttpContext) {
    /** Step 1: Retrieve the token from the URL parameters */
    const token: SafetyAlertToken = params.token

    /** Step 2: Check if the token exists, throw an error if not found */
    const alert = await SafetyAlert.find(token)
    if (alert === null) {
      // Return a bad request response if the URL is invalid or expired
      throw new mailErrors.E_INVALID_EXPIRED_URL()
    }
    await alert.load('user')
    await alert.delete()

    /** Step 3: Check if the request URL has a valid signature */
    if (!request.hasValidSignature()) {
      // Return a bad request response if the URL is invalid or expired
      throw new mailErrors.E_INVALID_EXPIRED_URL()
    }

    /** Step 4: Apply the changes from the alert to the user */
    for (const change in alert.changes) {
      // @ts-expect-error - normal type problem between the change variable and the user due to not knowing the link on the ts side
      alert.user[change] = alert.changes[change]
      if (change === 'email') {
        alert.user.emailValidateAt = DateTime.now()
      }
    }

    /** Step 5: Save the updated user information */
    await alert.user.save()

    /** Step 6: Render the safety alert page */
    return inertia.render<Record<string, any>, ViewProps>('auth/safety_alert', undefined, {
      title: 'Safety Alert',
    })
  }
}
