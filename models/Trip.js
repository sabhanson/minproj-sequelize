const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');


class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    traveller_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    traveller_id: {
      type: DataTypes.INTEGER,
      unique: false,
      references: {
          model: 'Traveller',
          key: 'id'
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      unique: false,
      references: {
        model: "Location",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip',
  }
);

module.exports = Trip;