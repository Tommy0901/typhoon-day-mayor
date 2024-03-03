'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Collection, { foreignKey: 'userId' })
      User.hasMany(models.unlockable_ending, { foreignKey: 'userId' })
      User.hasMany(models.Record, { foreignKey: 'userId' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
    tableName: 'Users'
  })
  return User
}
