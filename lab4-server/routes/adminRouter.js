const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')

router.get('/movies', adminController.movieGet)
router.get('/movies/:id', adminController.movieGetOne)
router.post('/movies/:id', adminController.movieUpdate)
router.delete('/movies/:id', adminController.movieDelete)
router.post('/movies', adminController.movieCreate)

router.get('/users', adminController.userGet)
router.get('/users/:id', adminController.userGetOne)
router.post('/users/:id', adminController.userUpdate)
router.delete('/users/:id', adminController.userDelete)
router.post('/users', adminController.userCreate)

router.get('/genres', adminController.genresGet)
router.get('/genres/:id', adminController.genresGetOne)
router.post('/genres/:id', adminController.genresUpdate)
router.delete('/genres/:id', adminController.genresDelete)
router.post('/genres', adminController.genresCreate)

router.get('/reviews', adminController.reviewsGet)
router.get('/reviews/:id', adminController.reviewsGetOne)
router.post('/reviews/:id', adminController.reviewsUpdate)
router.delete('/reviews/:id', adminController.reviewsDelete)
router.post('/reviews', adminController.reviewsCreate)


module.exports = router