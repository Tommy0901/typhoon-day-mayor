const { Collection } = require('../models')

const { currentTaipeiTime } = require('../helpers/time-helpers')

module.exports = {
  allCollections: async (req, res, next) => {
    try {
      const { query: { userId } } = req
      const collections = await Collection.findAll(userId ? { where: { userId } } : {})
      const data = collections.map(data => {
        data.dataValues.updatedAt = currentTaipeiTime(data.dataValues.updatedAt)
        data.dataValues.createdAt = currentTaipeiTime(data.dataValues.createdAt)
        return data
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
