const express = require('express')
const router = express.Router()

const { apiErrorHandler } = require('../middlewares/error-handler')
const { authenticated } = require('../middlewares/auth-handler')
const { allOptions } = require('../controllers/option-controller')
const { outcome, allEndings } = require('../controllers/ending-controller')
const { addToHistory, history } = require('../controllers/record-controller')
const { signUp, signIn, collections } = require('../controllers/user-controller')
const { mainScreen, allCharacters } = require('../controllers/character-controller')

router.post('/signup', signUp)
router.post('/signin', signIn)

router.get('/main/:charId', mainScreen)
router.get('/characters', allCharacters)
router.get('/endings', allEndings)
router.get('/options', allOptions)

router.get('/outcome/:endingId', authenticated, outcome)
router.get('/collections', authenticated, collections)
router.post('/history', authenticated, addToHistory)
router.get('/history', authenticated, history)

router.get('/', (req, res) => res.send('hello world'))

router.use('/', apiErrorHandler)

module.exports = router
