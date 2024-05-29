import User from '#models/user'
import { test } from '@japa/runner'

test.group('Users get by id', () => {
  test('should return a user by id', async ({ client }) => {
    const user = await User.find(1)
    if (user) {
      const response = await client.get('api/v1/users/1').loginAs(user)
      response.assertStatus(200)
    }
  })
})
