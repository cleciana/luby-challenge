const {User, Token} = require('../models/');
const util = require('../util/util');

const authenticate = async (req, res) => {
	try {
		const username = req.body;
		const user = await User.findOne({
			where: username
		});

		await Token.create({
			user_id: user.id
		});

		const token = util.generateToken(user.id);
		return res.status(201).json({token: token});

	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}    
}

module.exports = {
	authenticate
};