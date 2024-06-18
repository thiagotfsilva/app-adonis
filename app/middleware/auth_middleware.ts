import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
      const user = ctx.auth.user as User
      const jsonObj = JSON.parse(JSON.stringify(user.serialize()))
      delete jsonObj.password
      const newJsonStr = JSON.stringify(jsonObj)
      logger.info('User valided (auth)' + newJsonStr)
    } catch (error) {
      logger.info('Invalid Token (auth)')
      logger.info(error.message)
      logger.info(JSON.stringify(ctx.auth))
      logger.info(JSON.stringify(ctx.request))
      return ctx.response.status(401).json({ message: 'Invalid Token!' })
    }
    return next()
  }
}
