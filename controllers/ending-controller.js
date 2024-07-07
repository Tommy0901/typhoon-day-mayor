const { unlockable_ending, Ending } = require('../models')

module.exports = {
  outcome: async (req, res, next) => {
    try {
      const { params: { endingId }, user: { id } } = req
      const ending = await Ending.findByPk(endingId, {
        attributes: ['id', 'name', 'description', 'image']
      })
      const record = await unlockable_ending.findOne({ where: { endingId, userId: id } })
      if (!record) await unlockable_ending.create({ endingId, userId: id })
      res.json({ status: 'success', data: ending })
    } catch (err) {
      next(err)
    }
  },
  allEndings: async (req, res, next) => {
    try {
      const data = await Ending.findAll({
        attributes: ['id', 'name', 'description', 'image']
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
