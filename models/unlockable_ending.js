'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class unlockable_ending extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      unlockable_ending.belongsTo(models.Ending, { foreignKey: 'endingId' })
      unlockable_ending.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  unlockable_ending.init({
    // endingId: DataTypes.NUMBER,
    // userId: DataTypes.NUMBER
  }, {
    sequelize,
    underscored: true,
    modelName: 'unlockable_ending',
    tableName: 'unlockable_endings'
  })
  return unlockable_ending
}
