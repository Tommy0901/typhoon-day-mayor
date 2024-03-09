'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Record.belongsTo(models.Option, { foreignKey: 'optionId', as: 'option' })
      Record.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Record.init({
    // option_id: DataTypes.NUMBER,
    // user_id: DataTypes.NUMBER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Record',
    tableName: 'Records'
  })
  return Record
}
