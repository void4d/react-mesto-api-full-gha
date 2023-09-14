const winston = require('winston')
const expressWinston = require('express-winston')
const { format } = require('winston')
const { combine, timestamp, label, printf, prettyPrint } = format
const CATEGORY = 'winston custom format'

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
})

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
})

module.exports = {
  requestLogger,
  errorLogger,
}
