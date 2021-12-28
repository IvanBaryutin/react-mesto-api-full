const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, updateUserInfo, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const userIdValidator = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

const userInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^http(s)?:\/\/?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/),
  }),
});

router.get('/', getUsers);

router.get('/me', userIdValidator, getCurrentUser);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', userInfoValidator, updateUserInfo);
router.patch('/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
