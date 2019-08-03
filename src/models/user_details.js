/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'userDetails',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'city',
      },
      pinCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'pin_code',
      },
      persona: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'persona',
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'address',
      },
      mobNo: {
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
        field: 'mob_no',
      },
      altMobNo: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'alt_mob_no',
      },
      // TODO: Doesn't the 'createdAt' need to be non-nullable?
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
      },
      // TODO: Doesn't the 'createdAt' need to be non-nullable?
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'lat',
      },
      long: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'long',
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email_id',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
      },
      loginId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'loginId',
      },
    },
    {
      tableName: 'user_details',
    },
  );
};
