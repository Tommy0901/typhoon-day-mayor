const { Character, Comment, Option } = require('../models')

module.exports = {
  allCharacters: async (req, res, next) => {
    try {
      const { query: { charId: id } } = req
      if (!id) {
        const data = await Character.findAll({
          attributes: ['id', 'name', 'description', 'image']
        })
        return res.json({ status: 'success', data })
      }
      const data = await Character.findByPk(id, {
        attributes: ['id', 'name', 'description', 'image'],
        include: {
          model: Comment,
          as: 'characterComment',
          attributes: ['id', 'comment'],
          include: {
            model: Option,
            as: 'options',
            attributes: ['id', 'description', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE']
          }
        }
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
