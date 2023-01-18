import sequelize from '../config/connection.js';
import { Model, DataTypes } from 'sequelize';

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

export default Vendor;