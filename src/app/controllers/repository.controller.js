const { User, Repository } = require('../models');

const create = async (req, res) => {
	try {
		const data = req.body;
		
		const user = await User.findOne({
			where: {username: data.username}
		});

		const repository = await Repository.create({
			UserId: user.id,
			nome: data.nome, 
			description: data.description, 
			public: data.public, 
			slug: `${user.nome}-${data.nome}`
		})
		
		delete repository.dataValues.UserId;
		delete repository.dataValues.createdAt;
		delete repository.dataValues.updatedAt;

		return res.status(201).json(repository);
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const list = async (req, res) => {
	try {
		const username = req.body;

		const user = await User.findOne({
			where: username
		});
		const {rows:data, count} = await Repository.findAndCountAll({
			where: {UserId: user.id}
		});

		return res.status(200).json({data, count});
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
		
		if (user) {
			const repository = await Repository.findOne({
				where: {
					UserId: user.id,
					nome: data.nome
				}
			});
	
			const updated = await repository.update(data);
	
			delete updated.dataValues.id;
			delete updated.dataValues.UserId;
			delete updated.dataValues.createdAt;
			delete updated.dataValues.updatedAt;
	
			return res.status(200).json(updated);
		}
		return res.status(404).json({message: 'Usuario nao encontrado'});
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

const remove = async (req, res) => {
	try {
		const data = req.body;
		const user = await User.findOne({
			where: {username: data.username}
		});

		await Repository.destroy({
			where: {
				UserId: user.id,
				nome: data.nome
			}
		});

		return res.status(200).json({message: 'Repositório excluido com sucesso'});
	} catch (error) {
		return res.status(500).json({message:`Ops, houve um erro: ${error.message}`});
	}
}

module.exports = {
	create,
	list,
	update,
	remove
};