const { Weather } = require('../models')
const { Op } = require('sequelize')

const { currentTaipeiTime } = require('../helpers/time-helpers')

module.exports = {
  allWeatherDatas: async (req, res, next) => {
    try {
      const { query: { year, keyword, categoryId, intensity } } = req
      const 侵臺路徑分類 = categoryId === 'null' ? null : categoryId
      const cb = () => ({ [Op.like]: `%${keyword}%` })
      const [中文名稱, 英文名稱] = Array.from({ length: 2 }, cb)
      const weatherDatas = await Weather.findAll({
        attributes:
        [
          'id',
          '年份',
          '颱風編號',
          '中文名稱',
          '英文名稱',
          '侵臺路徑分類',
          '警報開始',
          '警報結束',
          '近臺強度',
          '近臺最低氣壓_hPa',
          '近臺最大風速_m_per_s',
          '近臺7級風暴風半徑_km',
          '近臺10級風暴風半徑_km',
          '警報發布報數'
        ],
        raw: true,
        where: [
          year ? { 年份: year } : {},
          keyword ? { [Op.or]: [{ 中文名稱 }, { 英文名稱 }] } : {},
          categoryId ? { 侵臺路徑分類 } : {},
          intensity ? { 近臺強度: intensity } : {}
        ]
      })
      const data = {}
      data.intensity = ['輕度', '中度', '強烈']
      data.typhoon = weatherDatas.map(data => {
        data.警報開始 = currentTaipeiTime(data.警報開始)
        data.警報結束 = currentTaipeiTime(data.警報結束)
        return data
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
