const { Option } = require('../models')

module.exports = {
  allOptions: async (req, res, next) => {
    try {
      res.json({
        status: 'success',
        data: await Option.findAll({
          attributes: ['id', 'descriprion', 'image', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE']
        })
      })
    } catch (err) {
      next(err)
    }
  }
}
