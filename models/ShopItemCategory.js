const Sequelize = require('sequelize')
const Model = Sequelize.Model
const ShopItemModel = require('./ShopItem')
const db = require('./db')

class ShopItemCategory extends Model {}
ShopItemCategory.init({
    title: {
        type: Sequelize.STRING,
    }
}, {
    sequelize: db
})

ShopItemModel.belongsTo(ShopItemCategory)
ShopItemCategory.hasMany(ShopItemModel)

module.exports = ShopItemCategory
