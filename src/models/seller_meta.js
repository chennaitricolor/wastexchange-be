/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const seller_meta =  sequelize.define('sellerMeta', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    tableName: 'seller_meta'
  });
  return seller_meta;
};
