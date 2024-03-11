const { Character, Comment, Option } = require('../models')

module.exports = {
  mainScreen: async (req, res, next) => {
    try {
      const { params: { charId: id } } = req
      const character = await Character.findByPk(id, {
        attributes: ['id', 'name', 'descriprion', 'image'],
        include: {
          model: Comment,
          as: 'characterSpeech',
          attributes: ['comment'],
          include: {
            model: Option,
            as: 'options',
            attributes: ['id', 'descriprion', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE']
          }
        }
      })
      const data = {}
      data.character = character
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  },
  allCharacters: async (req, res, next) => {
    try {
      const { query: { charId: id } } = req
      if (!id) {
        const data = await Character.findAll({
          attributes: ['id', 'name', 'descriprion', 'image']
        })
        return res.json({ status: 'success', data })
      }
      const data = await Character.findByPk(id, {
        attributes: ['id', 'name', 'descriprion', 'image'],
        include: {
          model: Comment,
          as: 'characterComment',
          attributes: ['id', 'comment'],
          include: {
            model: Option,
            as: 'options',
            attributes: ['id', 'descriprion', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE']
          }
        }
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
