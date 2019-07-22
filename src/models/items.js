/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const items =  sequelize.define('items', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    // TODO: Doesn't the 'sellerId' need to be a foreign-key?
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'seller_id'
    },
    details: {
      type: DataTypes.JSON,
      allowNull: false,
      field: 'details'
    },
    // TODO: Doesn't the 'createdAt' need to be non-nullable?
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    // TODO: Doesn't the 'createdAt' need to be non-nullable?
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    tableName: 'items'
  });
  return items;
};
