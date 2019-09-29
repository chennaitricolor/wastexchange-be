module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bids', {
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
      // TODO: Doesn't the 'buyerId' need to be a foreign-key?
      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'buyer_id',
      },
      pDateTime: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'p_date_time',
      },
      details: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'details',
      },
      totalBid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'total_bid',
      },
      contactName: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'contact_name',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'status',
      },
      // TODO: Doesn't the 'createdAt' need to be non-nullable?
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'created_at',
      },
      // TODO: Doesn't the 'updatedAt' need to be non-nullable?
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updated_at',
      },
      // TODO: Are we missing the 'createdBy' and 'updatedBy' audit columns?
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bids');
  },
};
