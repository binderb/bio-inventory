const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Vendor extends Model {};

Vendor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: 'vendor'
  }
);

module.exports = Vendor;