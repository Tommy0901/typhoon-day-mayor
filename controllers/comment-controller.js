const { Comment, Option } = require('../models')

module.exports = {
  allComments: async (req, res, next) => {
    try {
      const { query: { commId: id } } = req
      if (!id) {
        const data = await Comment.findAll({
          attributes: ['id', 'comment', 'charId']
        })
        return res.json({ status: 'success', data })
      }
      const data = await Comment.findByPk(id, {
        attributes: ['id', 'comment', 'charId'],
        include: {
          model: Option,
          as: 'options',
          attributes: ['id', 'descriprion', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE']
        }
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
