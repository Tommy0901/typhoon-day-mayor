const { Character, Comment, Option } = require('../models')

module.exports = {
  mainScreen: async (req, res, next) => {
    try {
      const { params: { charId: id } } = req
      const [character, messages] = await Promise.all([
        Character.findByPk(id, {
          attributes: ['id', 'name', 'descriprion', 'image'],
          include: {
            model: Comment,
            attributes: ['comment'],
            include: { model: Option, attributes: ['descriprion', 'polling', 'funding', 'environment'] }
          }
        }),
        Character.findAll({ attributes: ['id', 'name', 'descriprion', 'image'] })
      ])
      const data = {}
      data.character = character
      data.messages = messages
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
