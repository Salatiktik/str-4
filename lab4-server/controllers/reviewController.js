const {Review} = require('../models/models')

class reviewController {
    async create(req, res, next) {

        const { text, rate, userId, movieId } = req.query;
            
            let date = Date.now();

            const newReview = await Review.create({
            text: text,
            rate: rate,
            date: date,
            userId: userId,
            movieId: movieId
            });
    
            return res.json(newReview)
    }

    async getReviews(req, res, next) {
        const {id} = req.params

        const reviews = await Review.findAll({
            where: {
                movieId: id
            }
        })
        return res.json(reviews)
    }
}

module.exports = new reviewController()