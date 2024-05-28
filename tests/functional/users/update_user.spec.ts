import User from '#models/user'
import { test } from '@japa/runner'

test.group('Users update user', () => {
  const data = {
    fullName: 'User new name',
    phoneNumber: '81999999999',
  }
  test('example test', async ({ client }) => {
    const user = await User.find(1)

    if (user) {
      const response = await client.put('api/v1/users/1').json(data).loginAs(user)
      response.assertStatus(200)
      response.assertBodyContains(data)
    }
  })
})
