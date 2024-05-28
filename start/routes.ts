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
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/login', [AuthController, 'login']).prefix('api/v1')
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

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router
  .get('/docs', async () => {
    return AutoSwagger.default.ui('/swagger', swagger)
    // return AutoSwagger.default.scalar("/swagger", swagger); to use Scalar instead
    // return AutoSwagger.default.rapidoc("/swagger", swagger); to use RapiDoc instead
  })
  .prefix('api/v1')
