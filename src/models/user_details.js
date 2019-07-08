
module.exports = function(sequelize, DataTypes) {
  const userDetails = sequelize.define('userDetails', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_meta',
        key: 'id'
      },
      field: 'user_id'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'city'
    },
    pinCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'pin_code'
    },
    persona: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'persona'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'address'
    },
    mobNo: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'mob_no'
    },
    altMobNo: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'alt_mob_no'
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'lat'
    },
    long: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'long'
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
    tableName: 'user_details'
  });
  userDetails.associate = (models) => {
    // associations can be defined here
    userDetails.belongsTo(models.userMeta, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return userDetails;
};
