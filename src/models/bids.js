/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bids', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'seller_id'
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'buyer_id'
    },
    pDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'p_date'
    },
    pTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'p_time'
    },
    details: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'details'
    },
    totalBid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'total_bid'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'status'
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
    tableName: 'bids'
  });
};
