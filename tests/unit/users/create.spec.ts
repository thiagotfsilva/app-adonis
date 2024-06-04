import User from '#models/user'
import { test } from '@japa/runner'
import { UserService } from '../../../app/service/user_service.js'
import { UserRespository } from '../../../app/repositories/user_repository.js'

test.group('Users create - unit', () => {
  const data = {
    fullName: 'Thiago Felipe da Silva',
    email: 'silvathiago@areopagus.tech',
    phoneNumber: '81999999999',
    password: 'areopagus258',
  } as User

  let userService: UserService
  let userRepository: UserRespository
  userRepository = new UserRespository()
  userService = new UserService(userRepository)

  test('Should create user', async ({ assert }) => {
    const sut = await userService.create(data)
    assert.equal(sut.fullName, data.fullName)
    assert.equal(sut.email, data.email)
    assert.equal(sut.phoneNumber, data.phoneNumber)
  })
})
