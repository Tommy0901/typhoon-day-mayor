'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Option.hasMany(models.Record, { foreignKey: 'optionId' })
      Option.belongsTo(models.Comment, { foreignKey: 'commId' })
    }
  }
  Option.init({
    // comm_Id: DataTypes.NUMBER,
    descriprion: DataTypes.TEXT,
    image: DataTypes.STRING,
    polling: DataTypes.NUMBER,
    funding: DataTypes.NUMBER,
    environment: DataTypes.NUMBER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Option',
    tableName: 'Options'
  })
  return Option
}
