import sequelize from '../config/connection.js';
import { Model, DataTypes } from 'sequelize';

class Location extends Model {};

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('cold','rt','box'),
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "location",
        key: "id",
      },
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: 'location'
  }
);

export default Location;