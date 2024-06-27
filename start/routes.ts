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
import AWS from 'aws-sdk'
import env from './env.js'
import { cuid } from '@adonisjs/core/helpers'
import fs from 'node:fs'
import mail from '@adonisjs/mail/services/main'
import { RabittMqConsumer } from '../consumer.js'

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

router.get('/', async ({ view }) => {
  return view.render('form_report')
})

router.get('/hello', async ({ response }) => {
  return response.json({ message: 'Hello!' })
})

// aws-s3
AWS.config.update({
  accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
  secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
  region: env.get('S3_REGION'),
})

router
  .post('/upload', async ({ request, response }) => {
    try {
      const file = request.file('file_trein')
      const s3 = new AWS.S3()
      const pathFile = file?.tmpPath
      if (!pathFile) throw new Error()
      const content = fs.readFileSync(pathFile)

      const params: any = {
        Bucket: env.get('S3_BUCKET'),
        Key: `${cuid() + file?.extname}`,
        Body: content,
      }

      await s3.upload(params).promise()
      response.json({ message: 'uploado ok' })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  })
  .prefix('api/v1')

//rabittmq consumer

router
  .post('/queue', async ({ response }) => {
    try {
      const consumer = new RabittMqConsumer('amqp://guest:guest@localhost:5672')
      await consumer.start()
      await consumer.consume('email', async (message) => {
        const email = message.content.toString()
        await mail.send((messages) => {
          messages
            .to(email)
            .from('thiagosilva@areopagus.tech')
            .subject('Verify your email address')
            .htmlView('welcome_email', email)
        })
      })
      response.json({ message: 'ok' })
    } catch (error) {
      console.log((error as Error).message)
    }
  })
  .prefix('api/v1')
