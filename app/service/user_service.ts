import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UserRespository } from '../repositories/user_repository.js'

import { RabittMqServer } from './rabitt_mq_server.js'

@inject()
export class UserService {
  constructor(protected userRepository: UserRespository) {}

  async create(data: User) {
    const user = await this.userRepository.create(data)
    const publisher = new RabittMqServer('amqp://guest:guest@localhost:5672')

    await publisher.start()
    await publisher.publishInQueue('email', user.email)

    return user
  }

  async fetch() {
    return await this.userRepository.findAll()
  }

  async get(id: number) {
    return await this.userRepository.findById(id)
  }

  async update(id: number, data: User) {
    return await this.userRepository.update(id, data)
  }

  async delete(id: number) {
    await this.userRepository.delete(id)
  }
}
