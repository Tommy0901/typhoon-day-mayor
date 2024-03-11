const { Character, Comment, Option, Record } = require('../models')

const { currentTaipeiTime } = require('../helpers/time-helpers')

module.exports = {
  addToHistory: async (req, res, next) => {
    try {
      const { body: { optionId }, user: { id: userId } } = req
      const data = await Record.create({ optionId, userId })
      data.dataValues.createdAt = currentTaipeiTime(data.dataValues.createdAt)
      data.dataValues.updatedAt = currentTaipeiTime(data.dataValues.updatedAt)
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  },
  history: async (req, res, next) => {
    try {
      const { user: { id } } = req
      const history = await Record.findAll({
        attributes: ['createdAt'],
        include: {
          model: Option,
          as: 'option',
          attributes: ['id', 'descriprion', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE'],
          include: {
            model: Comment,
            as: 'characterSpeech',
            attributes: ['comment'],
            include: {
              model: Character,
              as: 'character',
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
  },
  allRecords: async (req, res, next) => {
    try {
      const { query: { userId } } = req
      const records = await Record.findAll(userId ? { where: { userId } } : {})
      const data = records.map(data => {
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
