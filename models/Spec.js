import sequelize from '../config/connection.js';
import { Model, DataTypes } from 'sequelize';

class Spec extends Model {};

Spec.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    pn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    short_name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('active','inactive','discontinued'),
    },
    link: {
      type: DataTypes.STRING
    },
    catalog: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.FLOAT
    },
    shelf_life: {
      type: DataTypes.FLOAT
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    units: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reorder_qty_threshold: {
      type: DataTypes.INTEGER
    },
    reorder_amt_threshold: {
      type: DataTypes.FLOAT
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id"
      }
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "vendor",
        key: "id"
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: 'spec'
  }
);

export default Spec;