const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/401');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res.status(401).send({ message: 'Необходима авторизация' });
    throw new UnauthorizedError('Необходима авторизация');
  }

  // извлечём токен (запишется только JWT)
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // return res.status(401).send({ message: 'Необходима авторизация' });
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
