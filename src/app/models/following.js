const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Following.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  };
  Following.init({
    UserId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Following',
  });
  return Following;
};