const Sequelize = require('sequelize')
const Model = Sequelize.Model
const ShopItemModel = require('./ShopItem')
const db = require('./db')

class ClothItem extends Model {}
ClothItem.init({
    title: {
        type: Sequelize.STRING,
    }
}, {
    sequelize: db,
})

ShopItemModel.belongsTo(ClothItem)
ClothItem.hasMany(ShopItemModel)

module.exports = ClothItem