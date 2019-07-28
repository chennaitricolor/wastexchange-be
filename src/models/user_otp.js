/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'userOtp',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      otp: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'otp'
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email_id'
      },
      mobileNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'mobile_no'
      },
      // TODO: Doesn't the 'createdAt' need to be non-nullable?
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at'
      },
      // TODO: Doesn't the 'updatedAt' need to be non-nullable?
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at'
      }
    },
    {
      tableName: 'user_otp'
    }
  );
};
