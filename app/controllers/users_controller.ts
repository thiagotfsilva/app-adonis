import { HttpContext } from '@adonisjs/core/http'
import { UserService } from '../service/user_service.js'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import LogToHttpContext from '../../utils/logger.js'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  /**
   *
   * @createUser
   * @requestBody {"fullName": "string","password": "string", "email": "string","phoneNumber": "string"}
   *
   */
  async createUser(ctx: HttpContext) {
    LogToHttpContext(ctx)
    const { request, response } = ctx
    const data = request.body() as User
    const user = await this.userService.create(data)
    return response.status(201).json(user)
  }

  async getAllUsers(ctx: HttpContext) {
    LogToHttpContext(ctx)
    const { response } = ctx
    const users = await this.userService.fetch()
    return response.json(users)
  }

  async getUser(ctx: HttpContext) {
    LogToHttpContext(ctx)
    const { request, response } = ctx
    const { id } = request.params()
    const user = await this.userService.get(id)
    return response.json(user)
  }

  /**
   *
   * @updateUser
   * @paramPath id - The ID of the source - @type(number) @required
   * @requestBody {"fullName": "string","password": "string", "phoneNumber": "string"}
   *
   */
  async updateUser(ctx: HttpContext) {
    LogToHttpContext(ctx)
    const { request, response } = ctx
    const { id } = request.params()
    const data = request.body() as User
    const user = await this.userService.update(id, data)
    return response.json(user)
  }

  async deleteUser(ctx: HttpContext) {
    LogToHttpContext(ctx)
    const { request, response } = ctx
    const { id } = request.params()
    await this.userService.delete(id)
    return response.status(203)
  }
}
