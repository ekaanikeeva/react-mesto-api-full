const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Имя',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'О себе',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5jb2duaXRvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized({ message: 'Неверный пароль или email' });
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized({ message: 'Неверный пароль или email' });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
