import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class GuestMiddleware {
  /** The URL to redirect to when user is logged-in */
  redirectTo = '/'

  /**
   * Handles incoming HTTP requests, denying access if the user is authenticated.
   * Redirects to the specified route (redirectTo) if authentication check passes.
   *
   * @param ctx - The HTTP context containing request, response, session, etc.
   * @param next - The callback to proceed to the next middleware or route handler
   */
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    // Check each guard specified or use the default guard
    for (const guard of options.guards || [ctx.auth.defaultGuard]) {
      // If user is authenticated with the current guard, redirect to redirectTo
      if (await ctx.auth.use(guard).check()) {
        return ctx.response.redirect(this.redirectTo, true)
      }
    }

    // If user is not authenticated, proceed to the next middleware or route handler
    return next()
  }
}
