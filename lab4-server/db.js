const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'str4lab',
    'postgres',
    'postgres',
    {
        dialect:"postgres",
        host: 'localhost',
        port: 6401 
    }
)