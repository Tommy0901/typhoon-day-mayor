const { unlockable_ending, Ending } = require('../models')

const { currentTaipeiTime } = require('../helpers/time-helpers')

module.exports = {
  outcome: async (req, res, next) => {
    try {
      const { params: { endingId }, user: { id } } = req
      const ending = await Ending.findByPk(endingId, {
        attributes: ['id', 'name', 'descriprion', 'image']
      })
      const record = await unlockable_ending.findOne({ where: { endingId, userId: id } })
      if (!record) await unlockable_ending.create({ endingId, userId: id })
      res.json({ status: 'success', data: ending })
    } catch (err) {
      next(err)
    }
  }
}
