/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'bids',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      // TODO: Doesn't the 'sellerId' need to be a foreign-key?
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'seller_id',
      },
      // TODO: Doesn't the 'buyerId' need to be a foreign-key?
      buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'buyer_id',
      },
      // TODO: What does this column signify? Can it be named more appropriately
      // If this the time when the bid was captured, doesn't it need to be non-nullable?
      pDateTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'p_date_time',
      },
      details: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'details',
      },
      // TODO: Can 'totalBid' be nullable?
      totalBid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'total_bid',
        get() {
          // Workaround until sequelize issue https://github.com/sequelize/sequelize/issues/8019 is fixed
          const value = this.getDataValue('totalBid');
          return value === null ? null : parseFloat(value);
        },
      },
      contactName: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'contact_name',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'status',
      },
      // TODO: Doesn't the 'createdAt' need to be non-nullable?
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
      },
      // TODO: Doesn't the 'updatedAt' need to be non-nullable?
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
      // TODO: Are we missing the 'createdBy' and 'updatedBy' audit columns?
    },
    {
      tableName: 'bids',
    },
  );
};
