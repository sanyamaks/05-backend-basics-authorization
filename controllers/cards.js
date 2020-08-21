const CardModel = require('../models/card');

module.exports.getCards = (req, res) => {
  CardModel.find({}).populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => req.status(500).send({ message: 'Internal Server Error' }));
};

module.exports.getCard = (req, res) => {
  const { cardId } = req.params;

  CardModel.findById(cardId).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  CardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => req.status(400).send({ message: 'Bad Request' }));
};

module.exports.addLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));
};

module.exports.removeLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Нет карточки с таким id' }));
};
