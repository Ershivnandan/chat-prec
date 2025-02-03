import morgan from 'morgan'
import logger from '../Utils/logger.js'
import colors from 'colors'

const requestLogger = morgan((tokens, req, res) => {
  const status = tokens.status(req, res)
  const method = tokens.method(req, res)

  const statusColor =
    status >= 500
      ? colors.red(status)
      : status >= 400
        ? colors.yellow(status)
        : status >= 300
          ? colors.cyan(status)
          : colors.green(status)

  const methodColor =
    method === 'GET'
      ? colors.green(method)
      : method === 'POST'
        ? colors.blue(method)
        : method === 'PUT' || method === 'PATCH'
          ? colors.yellow(method)
          : method === 'DELETE'
            ? colors.red(method)
            : colors.white(method)

  const logMessage = `${methodColor} ${tokens.url(req, res)} ${statusColor} ${tokens['response-time'](req, res)}ms - ${tokens['user-agent'](req, res)}`

  logger.info(logMessage)
  return logMessage
})

export default requestLogger
