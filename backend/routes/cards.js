const router = require('express').Router()
const { getCards, createCard, deleteCard, putLike, deleteLike } = require('../controllers/cards')
const { Joi, celebrate } = require('celebrate')
const regExp = new RegExp('^(?:http(s)?:\/\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$')

router.get('/cards', getCards)
router.post(
  '/cards',
  celebrate({
    body: {
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(2).pattern(regExp)
    },
  }),
  createCard
)
router.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().min(24).max(24),
    }),
  }),
  deleteCard
)
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().min(24).max(24),
    }),
  }),
  putLike
)
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().min(24).max(24),
    }),
  }),
  deleteLike
)

module.exports = router
