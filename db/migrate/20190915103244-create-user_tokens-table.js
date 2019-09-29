'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_tokens',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      authToken: {
        type: Sequelize.STRING(500),
        allowNull: false,
        field: 'auth_token'
      },
      refreshToken: {
        type: Sequelize.STRING(500),
        allowNull: false,
        field: 'refresh_token'
      },
      authTokenExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'auth_token_expiry',
      },
      refreshTokenExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'refresh_token_expiry',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_details',
          key: 'id',
        }
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_used',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updated_at',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_tokens');
  }
};
