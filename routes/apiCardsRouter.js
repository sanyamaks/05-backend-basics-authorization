const apiCardsRouter = require('express').Router();
const {
  getCards, getCard, createCard, addLike, removeLike,
} = require('../controllers/cards');

apiCardsRouter.get('/cards', getCards);
apiCardsRouter.get('/cards/:cardId', getCard);
apiCardsRouter.post('/cards', createCard);
apiCardsRouter.put('/cards/:cardId/likes', addLike);
apiCardsRouter.delete('/cards/:cardId/likes', removeLike);

module.exports = apiCardsRouter;
