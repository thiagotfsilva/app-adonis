import User from '#models/user'
import { test } from '@japa/runner'
import { UserRespository } from '../../../app/repositories/user_repository.js'
import { UserService } from '../../../app/service/user_service.js'

test.group('Users delete', () => {
  const data = {
    fullName: 'Thiago Felipe da Silva',
    email: 'silvathiago2@areopagus.tech',
    phoneNumber: '81999999999',
    password: 'areopagus258',
  } as User

  let userService: UserService
  let userRepository: UserRespository
  userRepository = new UserRespository()
  userService = new UserService(userRepository)

  test('Delete User', async ({ assert }) => {
    const user = await userService.create(data)
    const sut = await userService.delete(user.id)
    assert.notExists(sut)
  })

  test('Should throw error if user id not exist', async ({ assert }) => {
    const id = 100
    await assert.rejects(async () => {
      await userService.delete(id)
    }, 'Row not found')
  })
})
