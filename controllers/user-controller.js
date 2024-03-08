const { User, Collection, Character, unlockable_ending, Ending } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { errorMsg } = require('../middlewares/message-handler')
const { currentTaipeiTime } = require('../helpers/time-helpers')
const { includes } = require('../config/initial/options')

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const { body: { name, email, password, passwordCheck } } = req
      if (!name || !email || !password) return errorMsg(res, 400, 'Please enter name, email and password!')
      if (password !== passwordCheck) return errorMsg(res, 401, 'Passwords do not match!')

      if (await User.findOne({ where: { email } })) return errorMsg(res, 401, 'Email already exists!')

      const createdUser = await User.create({ name, email, password: await bcrypt.hash(password, 10) })
      const { password: removePassword, ...user } = createdUser.toJSON()
      user.updatedAt = currentTaipeiTime(user.updatedAt)
      user.createdAt = currentTaipeiTime(user.createdAt)
      res.json({ status: 'success', data: user })
    } catch (err) {
      next(err)
    }
  },
  signIn: async (req, res, next) => {
    try {
      const { body: { password, email } } = req
      if (!password || !email) return errorMsg(res, 400, 'Please enter email and password!')

      const user = await User.findOne({ where: { email }, raw: true })
      if (!user) return errorMsg(res, 401, 'email 或密碼錯誤')

      await bcrypt.compare(password, user.password)
        ? res.json({
          status: 'success',
          data: {
            id: user.id,
            name: user.name,
            email,
            token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
          }
        })
        : errorMsg(res, 401, 'email 或密碼錯誤')
    } catch (err) {
      next(err)
    }
  },
  collections: async (req, res, next) => {
    try {
      const { user: { id } } = req
      const [characters, endings] = await Promise.all([
        Character.findAll({
          attributes: ['id', 'name', 'descriprion', 'image'],
          includes: { model: Collection, attributes: [], where: { userId: id } }
        }),
        Ending.findAll({
          attributes: ['id', 'name', 'descriprion', 'image'],
          includes: { model: unlockable_ending, attributes: [], where: { userId: id } }
        })
      ])
      const data = {}
      data.characters = characters
      data.endings = endings
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}
