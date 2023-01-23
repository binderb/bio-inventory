import sequelize from '../config/connection.js';
import Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';

class Item extends Model {};

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    lot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('unopened','opened','empty'),
      allowNull: false
    },
    boxgrid: {
      type: DataTypes.STRING
    },
    date_received: {
      type: DataTypes.DATE
    },
    current_amount: {
      type: DataTypes.FLOAT,
    },
    spec_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'spec'
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'location'
      }
    },
    sublocation_id: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'location'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: 'item'
  }
);

export default Item;