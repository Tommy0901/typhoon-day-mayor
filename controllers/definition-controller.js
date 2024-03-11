const { Definition } = require('../models')

module.exports = {
  allDefinitions: async (req, res, next) => {
    try {
      const data = await Definition.findAll({
        attributes: ['id', 'name', 'descriprion', 'image']
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
