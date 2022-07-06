const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .regex(/^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
