const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RepositoryStar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RepositoryStar.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
      RepositoryStar.belongsTo(models.Repository, {
        foreignKey: 'starredRepoId'
      });
    }
  };
  RepositoryStar.init({
    UserId: DataTypes.INTEGER,
    starredRepoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RepositoryStar',
  });
  return RepositoryStar;
};