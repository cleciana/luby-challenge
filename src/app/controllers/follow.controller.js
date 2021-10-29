const { User, Follower } = require('../models');
const Util = require('../util/util');

const follow = async (req, res) => {
	try {
		const data = req.body;

		const me = await User.findOne({
			where: {username: data.username}
		});
		const toFollow = await User.findOne({
			where: {nome: data.followingName}
		});

		await Follower.create({
			UserId: me.id,
			followsId: toFollow.id
		});

		return res.status(201).json({message: `${me.nome} seguiu ${toFollow.nome}`});
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
			where: {UserId: id}
		});
		if (aux) {
			const followerCount = await Follower.count({
				where: {followsId: id}
			});
			const followingCount = await Follower.count({
				where: {UserId: id}
			});
	
			const userProfile = {nome, email, localizacao, avatar_url, bio, followerCount, followingCount};
	
			return res.status(200).json({userProfile});
		}
		return res.status(404).json({message: `Usuario existe, mas nao segue ${me.nome}`});		
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

		const me = await User.findOne({
			where: {username: data.username}
		});
		const unfollowing = await User.findOne({
			where: {nome: data.unfollowingName}
		});

		await Follower.destroy({
			where: {
				UserId: me.id,
				followsId: unfollowing.id
			}
		});

		return res.status(200).json({message: `Parou de seguir ${unfollowing.nome}`});
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