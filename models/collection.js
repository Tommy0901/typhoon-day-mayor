'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Collection.belongsTo(models.Character, { foreignKey: 'charId' })
      Collection.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Collection.init({
    // charId: DataTypes.NUMBER,
    // userId: DataTypes.NUMBER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Collection',
    tableName: 'Collections'
  })
  return Collection
}
