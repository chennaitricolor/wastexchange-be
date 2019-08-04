module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_details',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'city',
        },
        pinCode: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'pin_code',
        },
        persona: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'persona',
        },
        address: {
          type: Sequelize.TEXT,
          allowNull: false,
          field: 'address',
        },
        mobNo: {
          type: Sequelize.BIGINT,
          allowNull: true,
          unique: true,
          field: 'mob_no',
        },
        altMobNo: {
          type: Sequelize.BIGINT,
          allowNull: true,
          field: 'alt_mob_no',
        },
        lat: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          field: 'lat',
        },
        long: {
          type: Sequelize.DOUBLE,
          allowNull: false,
          field: 'long',
        },
        emailId: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          field: 'email_id',
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'password',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'name',
        },
        loginId: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          field: 'loginId',
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
    return queryInterface.dropTable('user_details');
  },
};
