const { User, Follower } = require('../models/');

const follow = async (req, res) => {
	try {
		const data = req.body;

		const own = await User.findOne({
			where: {username: data.username}
		});

		const following = await User.findOne({
			where: {nome: data.followingName}
		});

		const follower = await Follower.create({
			UserId: own.id,
			followsId: following.id
		});

		delete follower.dataValues.UserID;
		delete follower.dataValues.followsId;

		return res.status(201).json(follower);

	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

// const list = async (req, res) => {
// 	try {
// 		const followers = await Follower.findAll({
// 			where: {}
// 		});
// 	} catch (error) {
// 		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
// 	}
// }
module.exports = {
	follow,
};