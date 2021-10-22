'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhoneNumber.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
    }
  };
  PhoneNumber.init({
    restaurantId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    number: {
      allowNull: false,
      default: '',
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'PhoneNumber',
  });
  return PhoneNumber;
};