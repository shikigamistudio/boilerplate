import type { HttpContext } from '@adonisjs/core/http'

import type { ViewProps } from '#config/inertia'
import { errors as mailErrors } from '#exceptions/mails/index'
import { objectHelper } from '#helpers/objects_helper'
import SafetyAlert, { type SafetyAlertToken } from '#models/safety_alert'
import User from '#models/user'

/**
 * RestoreSettingsController handles the restoration of user settings
 * when they follow a revert link.
 */
export default class RestoreSettingsController {
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

    /** Step 4: */
    if (!objectHelper.isEmpty(alert.changes)) {
      await User.query().where('id', alert.user.id).update(alert.changes)
    }

    /** Step 5: Render the safety alert page */
    return inertia.render<Record<string, any>, ViewProps>('auth/safety_alert', undefined, {
      title: 'Restore Settings',
    })
  }
}
