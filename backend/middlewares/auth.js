const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET_KEY
const UnauthorizedError = require('../errors/unauthorized-err')


function auth(req, res, next) {
  const authorization = req.headers.authorization

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  const token = authorization.replace('Bearer ', '')
  let payload

  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch {
    next(new UnauthorizedError('Необходима авторизация'))
  }

  req.user = payload

  next()
}

module.exports = { auth }
