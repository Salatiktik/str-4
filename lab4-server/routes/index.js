const Router = require('express')
const router = new Router()
const movieRouter = require('./movieRouter')
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter)
router.use('/movie', movieRouter)
router.use('/admin', adminRouter)

module.exports = router