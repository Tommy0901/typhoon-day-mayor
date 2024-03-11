const { Event } = require('../models')

module.exports = {
  allEvents: async (req, res, next) => {
    try {
      const data = await Event.findAll({
        attributes: ['id', 'name', 'good', 'bad']
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
