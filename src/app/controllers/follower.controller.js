const { User, Follower } = require('../models/');
const Util = require('../util/util');

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

const show = async (req, res) => {
	try {
		const data = req.body;

		const own = await User.findOne({
			where: {username: data.username}
		});

		const follower = await User.findOne({
			where: {nome: data.followerName}
		});

		const {nome, email, localizacao, avatar_url, bio} = await Follower.findOne({
			where: {
				UserId: own.id,
				followsId: follower.id
			}
		});
		let userProfile = {nome, email, localizacao, avatar_url, bio};
		res.status(200).json(userProfile);

	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const list = async (req, res) => {
	try {
		const username = req.body;
		const {id} = await User.findOne({
			where: username
		});

		const found = await Follower.findAll({
			where: { followsId:id }
		});

		const followers = await Util.getFollowerProfiles([...found]);
		
		return res.status(200).json({followers, count: followers.length});

	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const unfollow = async (req, res) => {
	try {
		const data = req.body;

		const own = await User.findOne({
			where: {username: data.username}
		});

		const unfollowing = await User.findOne({
			where: {nome: data.unfollowingName}
		});

		await Follower.destroy({
			where: {
				UserId: own.id,
				followsId: unfollowing.id
			}
		});

		return res.status(200).send();

	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

module.exports = {
	follow,
	show,
	list,
	unfollow
};