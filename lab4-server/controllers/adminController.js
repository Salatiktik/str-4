const uuid = require('uuid')
const fs = require('fs')
const bcrypt = require('bcrypt')
const path = require('path');
const {Movie, Genre, Review, User, MovieGenre} = require('../models/models')
const {Sequelize} = require('sequelize')
const ApiError = require('../error/ApiError');


class adminController{
    async movieGet( req, res){
        let movies = await Movie.findAll();

        return res.json(movies);
    }

    async movieGetOne(req, res){
        const {id} = req.params
        
        const movie = await Movie.findOne(
            {
                where: {id}
            },
        )
        return res.json(movie)
    }

    async movieUpdate(req, res){
        var { name, duration, country, rating, genres, posterUrl} = req.query;
        const {id} = req.params

        const existingMovie = await Movie.findOne({where: {id}});

        existingMovie.name = name;
        existingMovie.duration = duration;
        existingMovie.country = country;
        existingMovie.rating = rating;

        if (genres) {
            console.log(genres, typeof(genres))
            genres = JSON.parse(genres, typeof(genres))
            console.log(genres)
            await MovieGenre.destroy({ where: { movieId: id } });

            for (var genreId of genres) {
                console.log(genreId)
                await MovieGenre.create({ movieId: id, genreId: genreId });
                console.log(await MovieGenre.findAll({ where: { movieId: id } }))
              }
        };

        if(posterUrl!='undefined'){
            existingMovie.posterUrl = posterUrl;
            const { data } = req.files.file;
            
            const filePath = path.join(__dirname+'/images/', posterUrl);
    
            fs.writeFileSync(filePath, data);
        }
        await existingMovie.save();
        return res.json(existingMovie);

    }

    async movieDelete(req, res){
        const {id} = req.params
        var movie = Movie.destroy({where:{id}});
        return res.json(movie);
    }

    async movieCreate(req, res){
        let {name, country, duration, rating, genres, posterUrl} = req.query

        const movie = await Movie.create({name, country, duration, posterUrl, rating});

        genres = JSON.parse(genres)
        for (var genreId of genres) {
            await MovieGenre.create({ movieId: movie.id, genreId: genreId });
        }

        const { data } = req.files.file;
        
        const filePath = path.join(__dirname+'/images/', posterUrl);

        fs.writeFileSync(filePath, data)

        return res.json(movie)
    }

    //=========================
    
    async userGet(req, res){
        var users = await User.findAll()

        return res.json(users)
    }

    async userGetOne(req, res){
        const {id} = req.params
        
        const user = await User.findOne(
            {
                where: {id}
            },
        )
        return res.json(user)
    }

    async userUpdate(req, res){
        const { email, password, role } = req.query;
        console.log(req)
        const {id} = req.params
        const userToUpdate = await User.findOne({
            where: {id}
        });
        var hashPassword
        if (password) {
            hashPassword = await bcrypt.hash(password, 5)
        }

        console.log(23456789, email, password, role)

        if (email) userToUpdate.email = email;
        if (password) userToUpdate.password = hashPassword;
        if (role) userToUpdate.role = role;

        await userToUpdate.save();

        return res.json(userToUpdate)
    }

    async userDelete(req, res){
        const {id} = req.params
        var user = User.destroy({where:{id}});
        return res.json(user);
    }

    async userCreate(req, res){
        const { email, password, role } = req.query;
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await User.create({
        email: email,
        password: hashPassword,
        role: role || 'user' 
        });

        return res.json(newUser)
    }

    //=========================
    
    async genresGet(req, res){
        var genres = await Genre.findAll()

        return res.json(genres)
    }

    async genresGetOne(req, res){
        const {id} = req.params
        
        const genre = await Genre.findOne(
            {
                where: {id}
            },
        )
        return res.json(genre)
    }

    async genresUpdate(req, res){
        const {id} = req.params
        const { name } = req.query;

        const genreToUpdate = await Genre.findOne(
            {
                where: {id}
            },
        )

        if (name) genreToUpdate.name = name;
        await genreToUpdate.save();

        return res.json(genreToUpdate)
    }

    async genresDelete(req, res){
        const {id} = req.params
        var genre = Genre.destroy({where:{id}});
        return res.json(genre);
    }

    async genresCreate(req, res){
        const { name } = req.query;

        const newGenre = await Genre.create({
            name: name
        });
        return res.json(newGenre);
    }

    //=========================
    
    async reviewsGet(req, res){
        var reviews = await Review.findAll()

        return res.json(reviews)
    }

    async reviewsGetOne(req, res){
        const {id} = req.params
        
        const review = await Review.findOne(
            {
                where: {id}
            },
        )
        return res.json(review)
    }

    async reviewsUpdate(req, res){
        const {id} = req.params; 
        const reviewToUpdate = await Review.findOne(
            {
                where: {id}
            },
        )

        const { text, rate, date , userId, movieId} = req.query;
        
        

        if (text) reviewToUpdate.text = text;
        if (rate) reviewToUpdate.rate = rate;
        if (date) reviewToUpdate.date = date;
        if (userId) reviewToUpdate.userId = userId;
        if (movieId) reviewToUpdate.movieId = movieId;

        await reviewToUpdate.save();
        return res.json(reviewToUpdate)
    }

    async reviewsDelete(req, res){
        const {id} = req.params
        var review = Review.destroy({where:{id}});
        return res.json(review);
    }

    async reviewsCreate(req, res){
        const { text, rate, date, userId, movieId } = req.query;

        const newReview = await Review.create({
        text: text,
        rate: rate,
        date: date,
        userId: userId,
        movieId: movieId
        });

        return res.json(newReview)
    }
}

module.exports = new adminController()