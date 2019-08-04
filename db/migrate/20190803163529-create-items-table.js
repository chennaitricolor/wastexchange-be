module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        // TODO: Doesn't the 'sellerId' need to be a foreign-key?
        sellerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'seller_id',
        },
        details: {
          type: Sequelize.JSON,
          allowNull: false,
          field: 'details',
        },
        // TODO: Doesn't the 'createdAt' need to be non-nullable?
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'created_at',
        },
        // TODO: Doesn't the 'createdAt' need to be non-nullable?
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'updated_at',
        },
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('items');
  }
};
