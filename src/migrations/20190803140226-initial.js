'use strict';
var fs = require('fs');
// TODO: Should fix dev env name while setting up environments
var shouldRunMigration = (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      fs.readFile(__dirname + '/initial.sql', function(err, sql) {
        if (err) {
          reject(err)
        } else {
          if (shouldRunMigration) {
            queryInterface.sequelize.query(sql.toString());
          }
          resolve();
        }
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
