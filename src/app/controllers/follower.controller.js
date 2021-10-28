const { User, Follower, Following } = require('../models/');
const Util = require('../util/util');

const follow = async (req, res) => {
	try {
		const data = req.body;

		const own = await User.findOne({
			where: {username: data.username}
		});

		const toFollow = await User.findOne({
			where: {nome: data.followingName}
		});

		const follower = await Follower.create({
			UserId: own.id,
			followsId: toFollow.id
		});

		const following = await Following.create({
			UserId: toFollow.id,
			followerId: own.id
		});

		return res.status(201).send();

	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const show = async (req, res) => {
	try {
		const data = req.body;

		const me = await User.findOne({
			where: {username: data.username}
		});
		const {id, nome, email, localizacao, avatar_url, bio} = await User.findOne({
			where: {nome: data.followerName}
		});

		const aux = await Follower.findOne({
			where: {
				UserId: id
			}
		});

		const followerCount = await Follower.count({
			where: {followsId: id}
		});
		const followingCount = await Following.count({
			where: {followerId: id}
		});

		const userProfile = {nome, email, localizacao, avatar_url, bio, followerCount, followingCount};
		res.status(200).json({userProfile});

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

		const followers = await Util.getFollowerSummary([...found]);
		
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

		await Following.destroy({
			where: {
				UserId: unfollowing.id,
				followerId: own.id
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