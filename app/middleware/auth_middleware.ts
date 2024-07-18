import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /** The URL to redirect to, when authentication fails */
  redirectTo = '/login'

  /**
   * Handles incoming HTTP requests, authenticating users using specified guards.
   *
   * @param ctx - The HTTP context containing request, response, session, etc.
   * @param next - The callback to proceed to the next middleware or route handler
   */
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    // Authenticate user using specified guards, redirecting to login route on failure
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    return next() // Proceed to the next middleware or route handler
  }
}
