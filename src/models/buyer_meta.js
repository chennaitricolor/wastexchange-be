/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const buyer_meta = sequelize.define('buyerMeta', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'mobile_no'
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email_id'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_At'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    }
  }, {
    tableName: 'buyer_meta'
  });
  return buyer_meta;
};
