const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const userRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')
const { createUser } = require('./controllers/users')
const { login } = require('./controllers/users')
const { auth } = require('./middlewares/auth')
const { handleError } = require('./middlewares/error-handler.js')
const { Joi, celebrate, errors } = require('celebrate')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const cors = require('cors');
const regExp = new RegExp('^(?:http(s)?:\/\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$');
require('dotenv').config;

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env

const app = express()

app.use(cors());
app.use(express.json())
app.use(helmet())
app.disable('x-powered-by')

app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().min(2),
      password: Joi.string().required().min(6)
    }),
  }),
  login
)
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      email: Joi.string().required().email().min(2),
      password: Joi.string().required().min(6),
      avatar: Joi.string().min(2).pattern(regExp)
    }),
  }),
  createUser
)
app.use(auth)
app.use(cardsRouter)
app.use(userRouter)

app.use(errorLogger);

app.use('*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }))

app.use(errors())

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
})

app.use(handleError)

app.listen(PORT)
