const { Location } = require('../models')

module.exports = {
  allLocations: async (req, res, next) => {
    try {
      const data = await Location.findAll({
        attributes: ['id', 'name', 'descriprion', 'image', 'polling', 'funding', 'environment']
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
