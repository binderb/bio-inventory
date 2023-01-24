import sequelize from '../config/connection.js';
import { Model, DataTypes } from 'sequelize';

class Speclog extends Model {};

Speclog.init(
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
    spec_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "spec",
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
    modelName: 'speclog'
  }
);

export default Speclog;