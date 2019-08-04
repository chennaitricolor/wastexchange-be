module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_details', [{
      city: 'Chennai',
      pin_code: 600041,
      persona: 'buyer',
      address: 'some address',
      lat: 1.0000,
      long: 1.0000,
      email_id: 'asd@asd.com',
      password: 'some pwd',
      name: 'some name',
      loginId: 'asd',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_details', null, {});
  },
};
