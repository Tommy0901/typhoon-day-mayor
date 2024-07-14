const passport = require('../config/passport')
const jwt = require('jsonwebtoken')

module.exports = {
  authenticated (req, res, next) {
    passport.authenticate('jwt',
      (err, data) => {
        if (err || !data) {
          return err
            ? res.status(err.status || 500).json({ status: 'error', message: err.message })
            : res.status(401).json({ status: 'error', message: 'Authentication failed' })
        }
        req.user = data
        next()
      }
    )(req, res, next)
  },
  googleOauth (req, res, next) {
    next(passport.authenticate('google')(req, res))
  },
  googleOauthRedirect (req, res, next) {
    passport.authenticate('google',
      (err, data) => {
        if (err || !data) {
          return err
            ? res.status(500).json({ status: 'error', message: err.message })
            : res.status(401).json({ status: 'error', message: 'Authentication failed!' })
        }
        data.token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.json({ status: 'success', data })
      }
    )(req, res)
  }
}
