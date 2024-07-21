import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

import { errors as mailErrors } from '#exceptions/mails/index'
import User from '#models/user'

/**
 * VerifyEmailController handles the verification of user email addresses
 * when they follow a verification link.
 */
export default class VerifyEmailController {
  /** Handles the email verification process. */
  async handle({ inertia, params, request }: HttpContext) {
    /** Step 1: Check if the request URL has a valid signature. */
    if (!request.hasValidSignature()) {
      // Return a bad request response if the URL is invalid or expired
      throw new mailErrors.E_INVALID_EXPIRED_URL()
    }

    /** Step 2: Find the user by ID from the request parameters. */
    const user = await User.findOrFail(params.id)

    /** Step 3: Check if the user's email is already verified. */
    if (user.hasEmailValidate) {
      // Return a bad request response if the email is already verified
      throw new mailErrors.E_ALREADY_VERIFIED_EMAIL()
    }

    /** Step 4: Set the email verification timestamp to the current time. */
    user.emailValidateAt = DateTime.now()
    await user.save()

    /** Step 5: Render the email verified page using Inertia. */
    return inertia.render('auth/verified_email')
  }
}
