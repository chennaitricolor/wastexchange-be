module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', [{
      seller_id: 1,
      details: '{}',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  }
};
