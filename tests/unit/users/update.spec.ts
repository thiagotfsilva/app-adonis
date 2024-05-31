import User from '#models/user'
import { test } from '@japa/runner'
import { UserService } from '../../../app/service/user_service.js'
import { UserRespository } from '../../../app/repositories/user_repository.js'

test.group('Users update', () => {
  const data = {
    fullName: 'Thiago Felipe da Silva',
    email: 'silvathiago2@areopagus.tech',
    phoneNumber: '81999999999',
    password: 'areopagus258',
  } as User

  const newData = {
    fullName: 'Thiago Felipe',
    phoneNumber: '81988888888',
  } as User

  let userService: UserService
  let userRepository: UserRespository
  userRepository = new UserRespository()
  userService = new UserService(userRepository)

  test('Should update user', async ({ assert }) => {
    const result = await userService.create(data)
    const sut = await userService.update(result.id, newData)
    assert.equal(sut.fullName, 'Thiago Felipe')
    assert.equal(sut.phoneNumber, '81988888888')
  })

  test('Should throw error if user id not exist', async ({ assert }) => {
    const id = 100
    await assert.rejects(async () => {
      await userService.update(id, newData)
    }, 'Row not found')
  })
})
