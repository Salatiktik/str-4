const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    googleid: {type: DataTypes.STRING, defaultValue:'null'},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Movie = sequelize.define('movie', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : {type:DataTypes.STRING},
    country : {type:DataTypes.STRING},
    duration : {type:DataTypes.TIME},
    posterUrl : {type:DataTypes.STRING},
    rating : {type:DataTypes.FLOAT}
}
)

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : {type:DataTypes.STRING}
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type:DataTypes.TEXT},
    rate: {type:DataTypes.INTEGER},
    date: {type:DataTypes.DATE},
})

const MovieGenre = sequelize.define('movie_genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasMany(Review)
Review.belongsTo(User)

Movie.hasMany(Review)
Review.belongsTo(Movie)

Movie.belongsToMany(Genre, {through: MovieGenre })
Genre.belongsToMany(Movie, {through: MovieGenre })

module.exports = {
    User,
    Movie,
    Genre,
    Review,
    MovieGenre
}




