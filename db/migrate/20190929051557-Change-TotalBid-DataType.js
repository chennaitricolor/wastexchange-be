module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('bids', 'totalBid', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      field: 'total_bid',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('bids', 'totalBid', {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'total_bid',
    });
  },
};
