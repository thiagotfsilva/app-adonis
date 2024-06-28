import env from '#start/env'
import { defineConfig } from '@benhepburn/adonis-mongoose'

/**
 * Configuration options to use MongoDB with Mongoose in your AdonisJS application.
 */
const mongooseConfig = defineConfig({
  mongodb: {
    useDefaultConnection: true, // Whether to use Mongoose's default connection
    uri: env.get('MONGODB_URI'), // The MongoDB URI used to connect to the database
    options: {}, // See https://mongoosejs.com/docs/connections.html#options
  },
})

export default mongooseConfig
