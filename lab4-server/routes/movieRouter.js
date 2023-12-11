const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movieController')
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.create)
router.get('/', movieController.getAll)
router.get('/genres', movieController.getGenres)
router.get('/:id', movieController.getOne)
router.get('/:id/reviews', reviewController.getReviews)
router.get('/:id/genres', movieController.getMovieGenres)
router.get('/p/:posterUrl', movieController.getPoster)

module.exports = router