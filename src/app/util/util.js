const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.config');

const {User} = require('../models/');

const generateToken = (params) => jwt.sign({params}, authConfig.secret, { expiresIn: 5086400 });

const getFollowerProfiles = async (array) => {
	let arrayOfFollowers = [];
	for (let index = 0; index < array.length; index++) {
		const {UserId} = array[index];

		const {nome, email, localizacao, avatar_url, bio} = await User.findOne({
			where: {id:UserId}
		});
		
		let userProfile = {nome, email, localizacao, avatar_url, bio};
		if(userProfile) arrayOfFollowers.push(userProfile);
	}
	return arrayOfFollowers;
} 


module.exports = {
	generateToken,
	getFollowerProfiles
}