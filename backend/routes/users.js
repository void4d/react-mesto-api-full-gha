const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getMyProfile
} = require('../controllers/users');
const { Joi, celebrate } = require('celebrate');
const regExp = new RegExp('^(?:http(s)?:\/\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$')

router.get('/users', getUsers);
router.get('/users/me', getMyProfile);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().min(24).max(24),
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).pattern(regExp)
  })
}), updateAvatar);

module.exports = router;
