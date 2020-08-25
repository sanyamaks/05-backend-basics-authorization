const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Должно быть от 2 до 30 символов'],
    maxlength: [30, 'Должно быть от 2 до 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Должно быть от 2 до 30 символов'],
    maxlength: [30, 'Должно быть от 2 до 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Поле не валидно',
    },
  },
  email: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator(link) {
        return validator.isEmail(link);
      },
      message: 'Поле не валидно',
    },
    unique: [true, 'Такой пользователь уже существует'],
  },
  password: {
    type: String,
    required: [true, 'Это обязательное поле'],
    select: false,
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
