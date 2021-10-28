const {User} = require('../models/');

const create = async (req, res) => {
	try {
		const {nome, email, localizacao, avatar_url, username, bio} = req.body;

		const user = await User.create({
			nome, email, localizacao, avatar_url, username, bio
		});

		delete user.dataValues.createdAt;
		delete user.dataValues.updatedAt;
		delete user.dataValues.username;

		return res.status(201).json(user);
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const show = async (req, res) => {
	try {
		const username = req.body;

		const user = await User.findOne({
			where: username
		});

		delete user.dataValues.createdAt;
		delete user.dataValues.updatedAt;

		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}    
}

const update = async (req, res) => {
	try {
		const data = req.body;

		const user = await User.findOne({
			where: {username: data.username}
		});
		const updated = await user.update(data);

		delete updated.dataValues.createdAt;
		delete updated.dataValues.updatedAt;
		delete updated.dataValues.username;

		return res.status(200).json(updated);
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}    
}

const remove = async (req, res) => {
	try {
		const username = req.body;

		await User.destroy({
			where: username
		});

		return res.status(200).send({message: 'Conta excluida com sucesso.'});
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}    
}

module.exports = {
	create,
	show,
	update,
	remove
}