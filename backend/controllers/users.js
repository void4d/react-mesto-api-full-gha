const userSchema = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const NotFoundError = require('../errors/not-found-err')
const ConflictError = require('../errors/conflict-err')
const UnauthorizedError = require('../errors/unauthorized-err')
const BadRequestError = require('../errors/bad-request-err')

const SALT_ROUNDS = 10
const JWT_SECRET = 'secretstring'

function getUsers(req, res, next) {
  return userSchema
    .find()
    .then((r) => res.status(200).send(r))
    .catch(next)
}

function getUserById(req, res, next) {
  const { userId } = req.params

  return userSchema
    .findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь с таким id не найден')
    })
    .then((r) => {
      res.status(200).send(r)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Неверный id'))
      } else {
        next(err)
      }
    })
}

function getMyProfile(req, res, next) {
  const id = req.user.id

  return userSchema
    .findById(id)
    .then((r) => {
      if (!r) {
        throw new NotFoundError('Пользователь с таким id не найден')
      }
      res.status(200).send(r)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный id'))
      } else {
        next(err)
      }
    })
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body

  bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
      return userSchema
        .create({ name, about, avatar, email, password: hash })
        .then((r) => res.status(201).send({ name, about, avatar, email }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Неверные данные'))
          } else if (err.code === 11000) {
            next(new ConflictError('Email уже используется'))
          } else {
            next(err)
          }
        })
  })
}

function updateUser(req, res, next) {
  const { name, about } = req.body

  return userSchema
    .findByIdAndUpdate(req.user.id, { name, about }, { new: 'true', runValidators: 'true' })
    .then(() => res.status(200).send({ name, about }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'))
      } else {
        next(err)
      }
    })
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body

  return userSchema
    .findByIdAndUpdate(req.user.id, { avatar }, { new: 'true', runValidators: 'true' })
    .then((r) => {
      res.status(200).send({ avatar })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'))
      } else {
        next(err)
      }
    })
}

function login(req, res, next) {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Почта или пароль не могут быть пустыми')
  }

  return userSchema
    .findOne({ email })
    .select('+password')
    .then((r) => {
      if (!r) {
        throw new UnauthorizedError('Такого пользователя не существует')
      }

      bcrypt.compare(password, r.password, (error, isValid) => {
        if (!isValid) {
          throw new UnauthorizedError('Неверный пароль или почта')
        }

        const token = jwt.sign({ id: r.id }, JWT_SECRET, { expiresIn: '7d' })

        return res.status(200).send({ token })
      })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'))
      } else {
        next(err)
      }
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getMyProfile,
}
