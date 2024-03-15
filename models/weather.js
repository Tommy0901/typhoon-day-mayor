'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Weather.init({
    年份: DataTypes.NUMBER,
    颱風編號: DataTypes.NUMBER,
    中文名稱: DataTypes.STRING,
    英文名稱: DataTypes.STRING,
    侵臺路徑分類: DataTypes.NUMBER,
    警報開始: DataTypes.DATE,
    警報結束: DataTypes.DATE,
    近臺強度: DataTypes.STRING,
    近臺最低氣壓_hPa: DataTypes.NUMBER,
    近臺最大風速_m_per_s: DataTypes.NUMBER,
    近臺7級風暴風半徑_km: DataTypes.NUMBER,
    近臺10級風暴風半徑_km: DataTypes.NUMBER,
    警報發布報數: DataTypes.NUMBER
  }, {
    sequelize,
    // underscored: true,
    modelName: 'Weather',
    tableName: 'Weather'
  })
  return Weather
}
