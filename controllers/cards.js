const Card = require('../models/card');
const { BADREQUEST_ERROR, NOTFOUND_ERROR, SERVER_ERROR } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BADREQUEST_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOTFOUND_ERROR).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BADREQUEST_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOTFOUND_ERROR).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BADREQUEST_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOTFOUND_ERROR).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BADREQUEST_ERROR).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
