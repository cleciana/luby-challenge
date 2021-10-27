module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,   
        }
      },
      localizacao: {
        type: Sequelize.STRING
      },
      avatar_url: {
        allowNull: true,
        type: Sequelize.STRING,
        validate: {
          isUrl: true
        }
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT,
        validate: {
          len: [0,255]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};