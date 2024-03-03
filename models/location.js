'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Location.init({
    name: DataTypes.STRING,
    descriprion: DataTypes.TEXT,
    image: DataTypes.STRING,
    polling: DataTypes.NUMBER,
    funding: DataTypes.NUMBER,
    environment: DataTypes.NUMBER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Location',
    tableName: 'Locations'
  })
  return Location
}
