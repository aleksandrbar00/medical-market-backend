const Sequelize = require('sequelize')

const db = new Sequelize('med_market', 'postgres', '0000', {
    dialect: 'postgres',
})

module.exports = db