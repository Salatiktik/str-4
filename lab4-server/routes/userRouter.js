const Router = require('express')
const passport = require('../controllers/googlePassport')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/:id', userController.getUser)
router.post('/google/token', userController.googleAuthCallback)

module.exports = router