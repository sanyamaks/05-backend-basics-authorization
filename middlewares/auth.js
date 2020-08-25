const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const securityScheme = 'Bearer ';
  if (!authorization || !authorization.startsWith(securityScheme)) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace(securityScheme, '');

  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
