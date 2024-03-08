const express = require('express')
const router = express.Router()

const { apiErrorHandler } = require('../middlewares/error-handler')
const { authenticated } = require('../middlewares/auth-handler')
const { mainScreen } = require('../controllers/character-controller')
const { signUp, signIn, collections } = require('../controllers/user-controller')

router.post('/signup', signUp)
router.post('/signin', signIn)

router.get('/main/:charId', mainScreen)

router.get('/collections', authenticated, collections)

router.get('/', (req, res) => res.send('hello world'))

router.use('/', apiErrorHandler)

module.exports = router
