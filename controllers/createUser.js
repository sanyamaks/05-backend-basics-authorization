const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

module.exports = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' && err.errors.email && err.errors.email.kind === 'unique') {
        return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${err.message}` });
      }
      if (err.message === 'data and salt arguments required') {
        return res.status(400).send({ message: 'password: Это обязательное поле' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};
