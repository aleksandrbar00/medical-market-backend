const express = require('express')
const router = express.Router()
const ShopItemModel = require('../models/ShopItem')
const ShopBrand = require('../models/ShopBrand')
const ClothItem = require('../models/ClothItem')


router.get('/dashboard', async (req, res) => {

    try{
        const items = await ShopItemModel.findAll({limit: 8})
        const brandItems = await ShopBrand.findAll({limit: 8})
        const clothItems = await ClothItem.findAll({limit: 8})
        res.render('admin-panel', {
            title: 'Админ-панель',
            shopItems: items,
            brandItems,
            clothItems
        })
    }catch(err){

    }

})

router.get('/auth', async (req, res) => {

    try{
        res.render('admin-auth', {
            title: 'Вход в админ панель'
        })
    }catch(err){
        console.log(err)
    }

})

router.post('/auth', async (req, res) => {
    try{
        console.log(req.body)
        res.redirect('/admin/dashboard')
    }catch(err){
        console.log(err)
    }
})

module.exports = router