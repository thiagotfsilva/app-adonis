import User from '#models/user'
import { inject } from '@adonisjs/core'
import { UserRespository } from '../repositories/user_repository.js'
import mail from '@adonisjs/mail/services/main'

@inject()
export class UserService {
  constructor(protected userRepository: UserRespository) {}

  async create(data: User) {
    const user = await this.userRepository.create(data)
    await mail.send((messages) => {
      messages
        .to(user.email)
        .from('thiagosilva@areopagus.tech')
        .subject('Verify your email address')
        .htmlView('welcome_email', { user })
    })
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
