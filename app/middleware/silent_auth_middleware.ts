import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * SilentAuthMiddleware class silently checks the authentication status
 * of incoming HTTP requests without taking any action.
 *
 * This middleware can be used to perform silent authentication checks
 * without redirecting or modifying the request/response flow.
 */
export default class SilentAuthMiddleware {
  /**
   * Handles incoming HTTP requests, silently checking authentication status.
   * Calls the next middleware or route handler without modifying the request/response.
   *
   * @param ctx - The HTTP context containing request, response, session, etc.
   * @param next - The callback to proceed to the next middleware or route handler
   */
  async handle(ctx: HttpContext, next: NextFn) {
    // Check authentication status without taking any action
    await ctx.auth.check()
    return next() // Proceed to the next middleware or route handler
  }
}
