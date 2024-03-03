'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Comment.hasMany(models.Option, { foreignKey: 'commId' })
      Comment.belongsTo(models.Character, { foreignKey: 'charId' })
    }
  }
  Comment.init({
    // char_id: DataTypes.NUMBER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'Comment',
    tableName: 'Comments'
  })
  return Comment
}
