const Sequelize = require('sequelize')
const Model = Sequelize.Model
const ShopItemModel = require('./ShopItem')
const db = require('./db')

class ShopBrand extends Model {}
ShopBrand.init({
    title: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    sequelize: db
})

ShopItemModel.belongsTo(ShopBrand)
ShopBrand.hasMany(ShopItemModel)

module.exports = ShopBrand