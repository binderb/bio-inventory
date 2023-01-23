import sequelize from '../config/connection.js';
import { Model, DataTypes } from 'sequelize';

class Itemlog extends Model {};

Itemlog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "item",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id"
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    modelName: 'itemlog'
  }
);

export default Itemlog;