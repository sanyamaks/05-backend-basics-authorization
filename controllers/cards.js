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
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  CardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${err.message}` });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.removeCard = (req, res) => {
  const { cardId } = req.params;

  CardModel.findById(cardId).populate(['owner', 'likes']).orFail()
    .then((probableCard) => {
      if (probableCard.owner._id.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Карточку может удалить только создатель' });
      }
      return CardModel.findByIdAndRemove(cardId)
        .orFail()
        .then((card) => {
          res.send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.addLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.removeLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).populate(['owner', 'likes']).orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: 'Internal Server Error' });
    });
};
