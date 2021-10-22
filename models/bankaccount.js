'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BankAccount.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' })
    }
  };
  BankAccount.init({
    restaurantId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    clabe: {
      allowNull: false,
      default: '',
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'BankAccount',
  });
  return BankAccount;
};