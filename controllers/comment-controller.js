const { Character, Comment, Option } = require('../models')

module.exports = {
  mainScreen: async (req, res, next) => {
    try {
      const DEFAULT_LIMIT = 6
      let { body: { commentIdArr }, query: { limit } } = req
      limit = +limit > 12 ? 12 : +limit < 1 ? 6 : +limit
      commentIdArr = Array.isArray(commentIdArr) && commentIdArr.length > 0
        ? commentIdArr
        : undefined
      const length = limit || DEFAULT_LIMIT
      const randomNumberRange = await Comment.count()
      const randomCommentId = commentIdArr || Array.from({ length }, () => Math.ceil(Math.random() * randomNumberRange))
      const comments = await Comment.findAll({
        attributes: ['id', 'comment'],
        include: [{
          model: Character,
          as: 'character',
          attributes: ['id', 'name', 'description', 'image']
        }, {
          model: Option,
          as: 'options',
          attributes: ['id', 'description', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE']
        }],
        where: { id: randomCommentId }
      })
      res.json({ status: 'success', data: comments })
    } catch (err) {
      next(err)
    }
  },
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
          attributes: ['id', 'description', 'polling', 'descP', 'funding', 'descF', 'environment', 'descE']
        }
      })
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
