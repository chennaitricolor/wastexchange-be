module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bids', [{
      seller_id: 1,
      buyer_id: 1,
      p_date_time: new Date(),
      contact_name: 'mr contact',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bids', null, {});
  }
};
