const jwt = require('jsonwebtoken');

const { User } = require('../models');

const authConfig = require('../../config/auth.config');

const login = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: 'O token é obrigatório' });
    }

    const parts = authHeader.split(' ');

    if (!parts.lenght === 2) {
      return res.status(401).send({ message: 'token error ' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ message: 'token malformatted' });
    }

    if (!token) {
      return res.status(401).send({ message: 'O token é obrigatório' });
    }
    const decoded = await jwt.verify(token, authConfig.secret);

    if (decoded) {
      await User.findByPk(decoded.id).then((user) => {
        req.user = user;
        return next();
      });
    }
  } catch (message) {
    return res.status(401).send({ message: `Você não está autorizado a realizar esta ação: ${message.message}` });
  }
};

module.exports = { 
	login
};