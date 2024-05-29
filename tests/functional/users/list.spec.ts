import User from '#models/user'
import { test } from '@japa/runner'

test.group('Users list', () => {
  test('should return a list of users ', async ({ client }) => {
    const user = await User.find(1)
    if (user) {
      const response = await client.get('api/v1/users').loginAs(user)
      response.assertStatus(200)
    }
  })
})
