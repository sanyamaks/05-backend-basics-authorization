const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

module.exports = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'password: Это обязательное поле' });
  }
  return bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' && err.errors.email && err.errors.email.kind === 'unique') {
        return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${err.message}` });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};
