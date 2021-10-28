const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Repository extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Repository.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  };
  Repository.init({
    UserId: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    description: DataTypes.TEXT,
    public: DataTypes.BOOLEAN,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Repository',
  });
  return Repository;
};