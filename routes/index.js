const express = require('express')
const router = express.Router()

const { apiErrorHandler } = require('../middlewares/error-handler')
const { authenticated, googleOauth, googleOauthRedirect } = require('../middlewares/auth-handler')
const userController = require('../controllers/user-controller')
const optionController = require('../controllers/option-controller')
const endingController = require('../controllers/ending-controller')
const recordController = require('../controllers/record-controller')
const eventController = require('../controllers/event-controller')
const commentController = require('../controllers/comment-controller')
const weatherController = require('../controllers/weather-controller')
const characterController = require('../controllers/character-controller')
const locationController = require('../controllers/location-controller')
const collectionController = require('../controllers/collection-controller')
const definitionController = require('../controllers/definition-controller')
const unlockableEndingController = require('../controllers/unlockable_ending-controller')

router.get('/oauth/google', googleOauth)
router.get('/oauth/google/callback', googleOauthRedirect)

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

router.get('/mainScreen', commentController.mainScreen)
router.get('/weather', weatherController.allWeatherDatas)

router.get('/unlockableEndings', unlockableEndingController.allUnlockableEndings)
router.get('/definitions', definitionController.allDefinitions)
router.get('/collections', collectionController.allCollections)
router.get('/characters', characterController.allCharacters)
router.get('/locations', locationController.allLocations)
router.get('/comments', commentController.allComments)
router.get('/records', recordController.allRecords)
router.get('/endings', endingController.allEndings)
router.get('/options', optionController.allOptions)
router.get('/events', eventController.allEvents)
router.get('/users', userController.allUsers)

router.get('/outcome/:endingId', authenticated, endingController.outcome)
router.post('/progress', authenticated, userController.addCollections)
router.get('/progress', authenticated, userController.collections)
router.post('/history', authenticated, recordController.addToHistory)
router.get('/history', authenticated, recordController.history)

router.get('/', (req, res) => res.send('hello world'))

router.use('/', apiErrorHandler)

module.exports = router
