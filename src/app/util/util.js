const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.config');

const {User} = require('../models/');

const generateToken = (params) => jwt.sign({params}, authConfig.secret, { expiresIn: 5086400 });

const getFollowerSummary = async (array) => {
	let arrayOfFollowers = [];
	for (let index = 0; index < array.length; index++) {
		const {UserId} = array[index];

		const {nome, avatar_url} = await User.findOne({
			where: {id:UserId}
		});

		let userSummary = {nome, avatar_url};
		if(userSummary) arrayOfFollowers.push(userSummary);
	}
	return arrayOfFollowers;
}

module.exports = {
	generateToken,
	getFollowerSummary
}