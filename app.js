const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiCardsRouter = require('./routes/apiCardsRouter.js');
const apiUsersRouter = require('./routes/apiUsersRouter.js');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { PORT } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5f2eb5c409439c230cbf0991',
  };
  next();
});

app.use('/', apiUsersRouter);
app.use('/', apiCardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
