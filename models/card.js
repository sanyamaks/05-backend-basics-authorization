const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Должно быть от 2 до 30 символов'],
    maxlength: [30, 'Должно быть от 2 до 30 символов'],
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Поле не валидно',
    },
    required: [true, 'Это обязательное поле'],

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Это обязательное поле'],

  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),

  },
});

module.exports = mongoose.model('card', cardSchema);
