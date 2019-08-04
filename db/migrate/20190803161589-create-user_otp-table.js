module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_otp',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        otp: {
          type: Sequelize.BIGINT,
          allowNull: false,
          field: 'otp',
        },
        emailId: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'email_id',
        },
        mobileNo: {
          type: Sequelize.BIGINT,
          allowNull: false,
          field: 'mobile_no',
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
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_otp');
  }
};
