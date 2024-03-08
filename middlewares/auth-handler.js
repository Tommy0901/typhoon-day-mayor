const passport = require('../config/passport')

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
  }
}
