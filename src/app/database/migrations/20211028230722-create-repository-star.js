module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RepositoryStars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
      },
      starredRepoId: {
        allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Repositories',
					key: 'id'
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
    await queryInterface.dropTable('RepositoryStars');
  }
};