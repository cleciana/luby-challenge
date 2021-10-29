const { User, Repository, RepositoryStar } = require('../models');

const star = async (req, res) => {
	try {
		const data = req.body;

		const user = await User.findOne({
			where: {username: data.username}
		});
		const repository = await Repository.findOne({
			where: {nome: data.nome}
		});

		const star = await RepositoryStar.create({
			UserId: user.id,
			starredRepoId: repository.id
		});

		return res.status(201).json({message: `${user.nome} deu uma estrela para ${repository.nome}`});
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const list = async (req, res) => {
	try {
		const nome = req.body;

		const repository = await Repository.findOne({
			where: nome
		});

		const {rows:data, count} = await RepositoryStar.findAndCountAll({
			where: {starredRepoId: repository.id}
		});
		
		return res.status(200).json({data, count});
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const unstar = async (req, res) => {
	try {
		const data = req.body;

		const user = await User.findOne({
			where: {username: data.username}
		});
		const repository = await Repository.findOne({
			where: {nome: data.nome}
		});

		await RepositoryStar.destroy({
			where: {
				UserId: user.id,
				starredRepoId: repository.id
			}
		});

		return res.status(200).json({message: `estrela removida de ${repository.nome}`});
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

module.exports = {
	star,
	list,
	unstar
};