const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Follower, { 
				foreignKey: 'UserId' 
			});
			User.hasMany(models.Following, { 
				foreignKey: 'UserId' 
			});
			User.hasMany(models.Repository, { 
				foreignKey: 'UserId' 
			});
		}
	};
	User.init({
		nome: DataTypes.STRING,
		email: DataTypes.STRING,
		localizacao: DataTypes.STRING,
		avatar_url: DataTypes.STRING,
		username: DataTypes.STRING,
		bio: DataTypes.TEXT,
		}, {
		sequelize,
		modelName: 'User',
		},
	);
	return User;
};