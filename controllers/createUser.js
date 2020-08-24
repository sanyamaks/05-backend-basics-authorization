const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

module.exports = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  UserModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).send({ message: 'Пользователь с таким email уже существует' });
      }

      return bcrypt.hash(password, 10)
        .then((hash) => UserModel.create({
          name, about, avatar, email, password: hash,
        }))
        .then((user) => res.send({ data: user }))
        .catch(() => { res.status(400).send({ message: 'Bad Request' }); });
    });
};
