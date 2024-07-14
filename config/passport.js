const bcrypt = require('bcryptjs')
const passport = require('passport')

const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

const { User } = require('../models')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(
  new JwtStrategy(
    jwtOptions,
    async (jwtPayload, done) => {
      try {
        const user = await User.findByPk(jwtPayload.id, { raw: true })

        if (!user) return done(null, null)

        const { password, ...data } = user

        done(null, data)
      } catch (err) {
        done(err)
      }
    }
  )
)

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email']
}

passport.use(new GoogleStrategy(
  googleOptions,
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const { value: email } = profile.emails[0]
      const { displayName: name } = profile

      const user = await User.findOne({
        attributes: ['id', 'name', 'email'],
        where: { email },
        raw: true
      })

      if (user) {
        return cb(null, user)
      } else {
        const randomPwd = Math.random().toString(36).slice(-8)
        const { id } = await User.create({
          name,
          email,
          password: await bcrypt.hash(randomPwd, 10)
        })
        return cb(null, { id, name, email })
      }
    } catch (err) {
      cb(err)
    }
  }
))

module.exports = passport
