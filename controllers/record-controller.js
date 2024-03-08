const { Character, Comment, Option, Record } = require('../models')

const { currentTaipeiTime } = require('../helpers/time-helpers')

module.exports = {
  history: async (req, res, next) => {
    try {
      const { user: { id } } = req
      const history = await Record.findAll({
        attributes: ['createdAt'],
        include: {
          model: Option,
          attributes: ['descriprion', 'polling', 'funding', 'environment'],
          include: {
            model: Comment,
            attributes: ['comment'],
            include: {
              model: Character,
              attributes: ['name', 'image']
            }
          }
        },
        where: { userId: id },
        order: [['createdAt', 'DESC']]
      })
      const data = history.map(i => {
        i.dataValues.createdAt = currentTaipeiTime(i.dataValues.createdAt)
        return i
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
