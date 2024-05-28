import User from '#models/user'
import { test } from '@japa/runner'

test.group('Users delete user', () => {
  test('example test', async ({ client }) => {
    const user = await User.find(1)

    if (user) {
      const response = await client.delete('api/v1/users/1').loginAs(user)
      response.assertStatus(203)
    }
  })
})
