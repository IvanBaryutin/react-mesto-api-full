const Card = require('../models/card');

const BadRequestError = require('../errors/400');
const ForbiddenError = require('../errors/403');
const NotFoundError = require('../errors/404');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    // .then((card) => res.status(200).send({ data: card }))
    .then((card) => res.status(200).send({ card }))
    // данные не записались, вернём ошибку
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    // вернём записанные в базу данные
    // .then((card) => res.status(200).send({ data: card }))
    .then((card) => res.status(200).send({ card }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          // res.send({});
          Card.deleteOne({ card })
            .then(res.status(200).send({ message: 'Карточка удалена' }));
        } else {
          next(new ForbiddenError('Запрещено удалять чужие карточки.'));
        }
      } else {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    })
    // .then((card) => res.status(200).send({ data: card }))
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          next(new BadRequestError('Передан несуществующий _id карточки.'));
          break;
        case 'ValidationError':
          next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
          break;
        default:
          next(err);
      }
    });
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    })
    // вернём записанные в базу данные
    // .then((card) => res.send({ data: card }))
    .then((card) => res.send({ card }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      switch (err.name) {
        case 'CastError':
          next(new BadRequestError('Передан несуществующий _id карточки.'));
          break;
        case 'ValidationError':
          next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
          break;
        default:
          next(err);
      }
    });
};
