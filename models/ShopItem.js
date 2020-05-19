const Sequelize = require('sequelize')
const Model = Sequelize.Model
const db = require('./db')

class ShopItemModel extends Model {}
ShopItemModel.init({
    name: {
        type: Sequelize.STRING,
    },
    about: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    awallableSizes: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageLink: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    sequelize: db
})



module.exports = ShopItemModel