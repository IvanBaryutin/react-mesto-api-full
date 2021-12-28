const mongoose = require('mongoose');

const validator = require('validator');

const isURL = (link) => {
  const result = link && validator.isURL(link);
  return result;
};

// Опишем схему:
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    validate: [isURL, 'Некорректный url'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
