'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
     email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password : DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'user'
    }
  );
  return user;
};
