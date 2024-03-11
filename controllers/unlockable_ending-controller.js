const { unlockable_ending } = require('../models')

const { currentTaipeiTime } = require('../helpers/time-helpers')

module.exports = {
  allUnlockableEndings: async (req, res, next) => {
    try {
      const { query: { userId } } = req
      const unlockableEndings = await unlockable_ending.findAll(userId ? { where: { userId } } : {})
      const data = unlockableEndings.map(data => {
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
