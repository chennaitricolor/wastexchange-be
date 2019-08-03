/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const userMeta = sequelize.define(
    'userMeta',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      // TODO: Why do we need a THIRD mobile number (there are already 2 present in the user model)?
      mobileNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'mobile_no',
      },
      emailId: {
        type: DataTypes.STRING,
        field: 'email_id',
        allowNull: {
          args: false,
          msg: 'Please enter your email address',
        },
        unique: {
          args: true,
          msg: 'Email already exists',
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Please enter a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter a password',
        },
        field: 'password',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
      },
      persona: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'persona',
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
    },
    {
      tableName: 'user_meta',
    },
  );
  userMeta.associate = (models) => {
    // associations can be defined here
    // TODO: When a 'user' is deleted, how should this association be handled? nulled out / deleted / ?
    userMeta.hasMany(models.userDetails, {
      foreignKey: 'userId',
    });
  };
  return userMeta;
};
