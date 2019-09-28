/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const userTokens = sequelize.define(
    'userTokens',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      authToken: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'auth_token',
      },
      refreshToken: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'refresh_token',
      },
      authTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'auth_token_expiry',
      },
      refreshTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'refresh_token_expiry',
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_details',
          key: 'id',
        },
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_used',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
    },
    {
      tableName: 'user_tokens',
    },
  );
  return userTokens;
};
