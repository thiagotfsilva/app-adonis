import { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { DateTime } from 'luxon'

export default function LogToHttpContext(ctx: HttpContext) {
  logger.info('Http Verb: ' + ctx.request.method())
  logger.info('Route: ' + JSON.stringify(ctx.request.completeUrl()))
  logger.info('Timestamp: ' + DateTime.now().toFormat('yyyy-MM-dd hh:mm:ss'))
  logger.info('Body: ' + JSON.stringify(ctx.request.body()))
  logger.info('Query Params: ' + JSON.stringify(ctx.request.params()))
  logger.info('IP: ' + ctx.request.ip())
  logger.info('Hostname: ' + ctx.request.hostname()?.toString())
  const jsonObj = JSON.parse(JSON.stringify(ctx.request.headers()))
  delete jsonObj.authorization
  const newJsonStr = JSON.stringify(jsonObj)
  logger.info('Headers: ' + newJsonStr)
}
