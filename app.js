const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const apiCardsRouter = require('./routes/apiCardsRouter.js');
const apiUsersRouter = require('./routes/apiUsersRouter.js');
const login = require('./controllers/login.js');
const createUser = require('./controllers/createUser.js');
const auth = require('./middlewares/auth.js');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(helmet());

app.post('/signup', createUser);
app.post('/signin', login);
app.use('/', auth, apiUsersRouter);
app.use('/', auth, apiCardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:');
  console.log(PORT);
});
