const uuid = require('uuid')
const fs = require('fs')
const path = require('path');
const {Movie, Genre} = require('../models/models')
const {Sequelize} = require('sequelize')
const ApiError = require('../error/ApiError');

class MovieController {
    async getAll(req, res) {
        let {genres, rateFrom, rateTo} = req.query
        
        console.log(typeof(genres))

        let movies;
        if (!genres && !rateFrom && !rateTo) {
            movies = await Movie.findAll()
        }
        else if (genres && !rateFrom && !rateTo){
            
            const genresIds = JSON.parse(genres);

            movies = await Movie.findAll({
                include: [{
                    model: Genre,
                    where: {
                      id: {
                        [Sequelize.Op.in]: genresIds
                      }
                    }
                  }]
                }
            )
        }
        else if(!genres && (rateFrom || rateTo))
        {
            if(!rateFrom)
            {
                rateFrom = 0
            }
            if(!rateTo)
            {
                rateTo = 10
            }

            movies = await Movie.findAll({
                where: {
                  rating: {
                    [Sequelize.Op.between]: [rateFrom, rateTo]
                  }
                }
              });
        }
        else{
            if(!rateFrom)
            {
                rateFrom = 0
            }
            if(!rateTo)
            {
                rateTo = 10
            }

            const genresIds = JSON.parse(genres);

            movies = await Movie.findAll({
                where: {
                  rating: {
                    [Sequelize.Op.between]: [rateFrom, rateTo]
                  }
                },
                include: [{
                  model: Genre,
                  where: {
                    id: {
                      [Sequelize.Op.in]: genresIds
                    }
                  }
                }]
              });
        }
        return res.json({movies})
    }

    async getOne(req, res) {
        const {id} = req.params
        
        const movie = await Movie.findOne(
            {
                where: {id}
            },
        )
        return res.json(movie)
    }

    async getMovieGenres(req, res){
      const {id} = req.params

      const genres = await Genre.findAll({
        include:{
          model:Movie,
          where:{
            id: id
          }
        }
      })

      return res.json(genres)
    }

    async getGenres(req, res){
      const genres = await Genre.findAll()
      return res.json({genres})
    }

    async getPoster(req, res){
      const {posterUrl} = req.params
      if(posterUrl!='undefined'){
        const filePath = __dirname + '/images/'+posterUrl
  
        const fileData = fs.readFileSync(filePath, { encoding: 'base64' });
        res.send({'data':fileData})
      }

    }

}

module.exports = new MovieController()