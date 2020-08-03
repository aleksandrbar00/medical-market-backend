const Sequelize = require('sequelize')
const Model = Sequelize.Model
const db = require('./db')

class NewsItem extends Model {}
NewsItem.init({
    title: {
        type: Sequelize.STRING,

    },
    content: {
        type: Sequelize.TEXT,
    }
})

module.exports = NewsItem