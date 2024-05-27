/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', [AuthController, 'login'])
router.post('/register', [UsersController, 'createUser']).prefix('api/v1/users')

router
  .group(() => {
    router.get('/', [UsersController, 'getAllUsers'])
    router.get('/:id', [UsersController, 'getUser'])
    router.put('/:id', [UsersController, 'updateUser'])
    router.delete('/:id', [UsersController, 'deleteUser'])
  })
  .prefix('api/v1/users')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
