const cardSchema = require('../models/card')
const NotFoundError = require('../errors/not-found-err')
const UnauthorizedError = require('../errors/unauthorized-err')
const BadRequestError = require('../errors/bad-request-err')
const ForbiddenError = require('../errors/forbidden-err')

function getCards(req, res, next) {
  return cardSchema
    .find({})
    .then((r) => res.status(200).send(r.reverse()))
    .catch(next)
}

function createCard(req, res, next) {
  const owner = req.user.id

  const { name, link } = req.body
  return cardSchema
    .create({ name, link, owner })
    .then((r) => res.status(201).send(r))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'))
      } else {
        next(err)
      }
    })
}

function deleteCard(req, res, next) {
  const owner = req.user.id
  const card = req.params.cardId

  return cardSchema
    .findByIdAndDelete(card)
    .then((r) => {
      if (!r) {
        throw new NotFoundError('Карточка не найдена')
      }

      if (r.owner.toString() !== owner) {
        throw new ForbiddenError('Нелья удалить чужую карточку')
      } else {
        return res.status(200).send(r)
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный id'))
      } else {
        next(err)
      }
    })
}

function putLike(req, res, next) {

  return cardSchema
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user.id } }, { new: true })
    .then((r) => {
      if (!r) {
        throw new NotFoundError('Карточка не найдена')
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

function deleteLike(req, res, next) {
  return cardSchema
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user.id } }, { new: true })
    .then((r) => {
      if (!r) {
        throw new NotFoundError('Карточка не найдена')
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
}
