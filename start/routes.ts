/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/', [UsersController, 'createUser'])
    router.get('/', [UsersController, 'getAllUsers'])
    router.get('/:id', [UsersController, 'getUser'])
    router.put('/:id', [UsersController, 'updateUser'])
    router.delete('/:id', [UsersController, 'deleteUser'])
  })
  .prefix('api/v1/users')
