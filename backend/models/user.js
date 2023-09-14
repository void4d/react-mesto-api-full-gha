const mongoose = require('mongoose');
const validator = require('validator');
const regExp = new RegExp('^(?:http(s)?:\/\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов'],
    default: 'Жак-Ив Кусто'
  },
  avatar: {
    type: String,
    minlength: [2, 'Минимальная длина поля "avatar" - 2 символа'],
    validate: {
      validator: function(v) {
        return regExp.test(v)
      },
      message: 'Некорректный URL'
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "about" - 30 символов'],
    default: 'Исследователь'
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "email" - 2 символа'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный URL'
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    minlength: [6, 'Минимальная длина поля "password" - 6 символов'],
    select: false
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
