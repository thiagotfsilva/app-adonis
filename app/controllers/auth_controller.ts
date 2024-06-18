import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { UserRespository } from '../repositories/user_repository.js'
import User from '#models/user'
import LogToHttpContext from '../../utils/logger.js'

@inject()
export default class AuthController {
  constructor(protected userRepository: UserRespository) {}

  /**
   *
   * @login
   * @requestBody {"password": "string", "email": "string"}
   *
   */
  async login(ctx: HttpContext) {
    LogToHttpContext(ctx)
    const { request, response } = ctx
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return response.json(token)
  }
}
