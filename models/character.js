'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Character.hasMany(models.Comment, { foreignKey: 'charId', as: 'characterSpeech' })
      Character.hasMany(models.Collection, { foreignKey: 'charId' })
    }
  }
  Character.init({
    name: DataTypes.STRING,
    descriprion: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'Character',
    tableName: 'Characters'
  })
  return Character
}
