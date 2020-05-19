const express = require('express')
const router = express.Router()
const ShopItemCategory = require('../models/ShopItemCategory')
const ShopItemModel = require('../models/ShopItem')
const ShopBrand = require('../models/ShopBrand')
const ClothItem = require('../models/ClothItem')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        req.login(user, {session: false}, async (err) => {
            if(err){
                res.send(err)
            }

            const token = await jwt.sign(user, "secret")
            return res.send({user, token})
        })
    })(req, res)
})

router.get('/shop-items', passport.authenticate('jwt', {session: false}), async (req, res) => {

    try{
        const items = await ShopItemModel.findAll({include: ShopBrand})
        const responseItems = items.map(item => {
            return {
                id: item.id,
                name: item.name,
                about: item.about,
                color: item.color,
                brand: item.ShopBrand.title,
                size: item.size,
                sex: item.sex,
                imageLink: item.imageLink
            }
        })
        if(items){
            res.send({items: responseItems})
        }
    }catch(err){
        console.log(err)
    }
})

router.post('/shop-items', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const payload = {
            ...req.body,
            ShopBrandId: req.body.brandId,
            ClothItemId: req.body.clothId,
            ShopItemCategoryId: req.body.categoryId,
        }

        const shopItem = await ShopItemModel.create(payload)
        if(shopItem){
            res.send({
                shopItem
            })
        }
    }catch (e) {
        console.log(e)
    }
})

router.delete('/shop-items/:id', passport.authenticate('jwt', {session: false}),  async (req, res) => {
    try{
        const itemId = req.params.id

        if(itemId){
            const item = await ShopItemModel.findByPk(itemId)
            await item.destroy()
            res.sendStatus(200)
        }
    }catch (e) {
        console.log(e)
    }
})

router.get('/brands',  passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const brands = await ShopBrand.findAll()
        res.send(brands)
    }catch (e) {
        console.log(e)
    }
})

router.post('/brands', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const brandItem = await ShopBrand.create(req.body)
        res.send(brandItem)
    }catch (e) {
        console.log(e)
    }
})

router.get('/clothes', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const clotheItems = await ClothItem.findAll()
        res.send(clotheItems)
    }catch (e) {
        console.log(e)
    }
})

router.post('/clothes', passport.authenticate('jwt', {session: false}),  async (req, res) => {
    try{
        const clothItem = await ClothItem.create({
            title: req.body.title
        })
        res.send(clothItem)
    }catch (e) {
        console.log(e)
    }
})

router.get('/categories', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const categories = await ShopItemCategory.findAll()
        res.send(categories)
    }catch (e) {
        console.log(e)
    }
})

router.post('/categories', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const categoryItem = await ShopItemCategory.create({
            title: req.body.title
        })

        res.send(categoryItem)
    }catch (e) {
        console.log(e)
    }
})

module.exports = router
