const UserModel = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  UserModel.findById(id).orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UserModel.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Bad Request' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  }).orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Bad Request'}));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  }).orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Bad Request' }));
};
