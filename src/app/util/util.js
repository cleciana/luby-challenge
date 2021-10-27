const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.config');

const generateToken = (params) => jwt.sign({params}, authConfig.secret, { expiresIn: 5086400 });


module.exports = {
	generateToken
}