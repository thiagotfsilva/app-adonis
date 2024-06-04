import { test } from '@japa/runner'

test.group('Users create', () => {
  const data = {
    fullName: 'Test-User',
    email: 'test-email@email.com',
    phoneNumber: '81999885577',
    password: 'senha-test',
  }

  test('should create a user', async ({ client }) => {
    const response = await client.post('api/v1/users/register').json(data)
    response.assertStatus(201)
    response.assertBody({
      id: response.body().id,
      fullName: 'Test-User',
      email: 'test-email@email.com',
      phoneNumber: '81999885577',
      createdAt: response.body().createdAt,
      updatedAt: response.body().updatedAt,
    })
  })
})
