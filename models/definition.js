'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Definition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Definition.init({
    name: DataTypes.STRING,
    descriprion: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'Definition',
    tableName: 'Definitions'
  })
  return Definition
}
