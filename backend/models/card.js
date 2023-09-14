const mongoose = require('mongoose');
const validator = require('validator');
const regExp = new RegExp('^(?:http(s)?:\/\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$')

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов']
  },
  link: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина поля "link" - 2 символа'],
    validate: {
      validator: function(v) {
        return regExp.test(v)
      },
      message: 'Некорректный URL'
    }
  },
  owner: mongoose.Schema.Types.ObjectId,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  createdAt: {
    type: Date,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
