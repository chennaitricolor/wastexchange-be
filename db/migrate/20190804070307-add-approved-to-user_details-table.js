module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('user_details', 'approved', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'approved',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user_details', 'approved');
  },
};
