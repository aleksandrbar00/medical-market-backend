const express = require('express')
const router = express.Router()
const ShopBrand = require('../models/ShopBrand')
const ShopItemModel = require('../models/ShopItem')
const ShopItemCategory = require('../models/ShopItemCategory')
const fs = require('fs')
const imageHelpers = require('../helpers/imageHelpers')
const queryHelpers = require('../helpers/queryHelpers')
const {Op} = require('sequelize')

router.get('/', async (req, res) => {

    const popularItems = await ShopItemModel.findAll({limit: 12})

    const payload = []
    for(let i = 0; i < popularItems.length; i+=4){
        payload.push(popularItems.slice(i, i + 4))
    }

    res.render('index.hbs', {
        title: 'Главная',
        popularItems: payload
    })
})

router.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'О нас'
    })
})

router.get('/news', (req, res) => {
    res.render('news.hbs', {
        title: 'Новости'
    })
})

router.post('/catalog/items/:id/media', async (req, res) => {
    const file = req.files.image
    const isSaved = false
    try{
        const fileName = imageHelpers.generateName(req.params.id)
        await file.mv(`upload/${fileName}`)
        const shopItem = await ShopItemModel.findByPk(req.params.id)
        shopItem.imageLink = fileName
        await shopItem.save()

        res.send(fileName)
    }catch(err){
        console.log(err)
    }
})

router.get('/catalog', async (req, res) => {

    const pageNumber = req.query.page || 1
    const itemsPerPage = req.query.length || 9

    const categoriesArr = queryHelpers.getQueryParam(req.query.category, ',', true)
    const sizesArr = queryHelpers.getQueryParam(req.query.sizes, ',', true)
    const brandsArr = queryHelpers.getQueryParam(req.query.brands, ',', true)
    const sex = queryHelpers.getQueryParam(req.query.sex, ',')



    try{
        const paginationOffset = (pageNumber - 1) * itemsPerPage
        const totalResults = await ShopItemModel.count()
        const totalPages = Math.ceil(totalResults / itemsPerPage)
        const paginationButtons = []
        for(let i = pageNumber; i <= pageNumber + 2; i++){
            if(i <= totalPages){
                paginationButtons.push(i)
            }
        }
        const catalogItems = await ShopItemCategory.findAll()
        const brandsItems = await ShopBrand.findAll()
        const queryObject = {
            where: {

            }
        }
        if(categoriesArr.length > 0){
            queryObject.where.ShopItemCategoryId = {
                [Op.in]: categoriesArr
            }
        }
        if(brandsArr.length > 0){
            queryObject.where.ShopBrandId = {
                [Op.in]: brandsArr
            }
        }
        if(sizesArr.length > 0){
            queryObject.where.size = {
                [Op.in]: sizesArr
            }
        }


        const catalogArr = await ShopItemModel.findAndCountAll({offset: paginationOffset, limit: itemsPerPage, ...queryObject})
        const catalogParsed = catalogArr.rows.map(item => {
            return {
                title: item.name,
                size: item.size,
                id: item.id,
                imageLink: item.imageLink ? item.imageLink : 'https://img2.pngindir.com/20180611/cqw/kisspng-computer-icons-device-fonts-ten-year-itch-artific-orthophoto-5b1ee3daeaa645.2109300815287510669611.jpg',
            }
        })
        if(req.query.format && req.query.format === 'json'){
            res.send(catalogParsed)
        }

        
        res.render('catalog.hbs', {
            title: 'Каталог',
            brandsItems,
            catalogItems,
            pagination: {
                grid: catalogParsed,
                gridLen: catalogArr.count,
                pageNumber,
                renderFirstButton: parseInt(pageNumber) === 1 ? false : true,
                renderLastButton: parseInt(pageNumber) === totalPages ? false : true,
                renderNextButton: parseInt(pageNumber) + 1 <= totalPages ? true : false,
                renderPrevButton: parseInt(pageNumber) - 1 >= 1 ? true : false,
                prevUrl: parseInt(pageNumber) - 1 > 0 ? `${req.url}${parseInt(pageNumber) - 1}` : false,
                nextUrl: parseInt(pageNumber) + 1 <= totalPages ? `${req.url}${parseInt(pageNumber) + 1}` : false,
                paginationButtons,
                totalPages
            }
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/catalog/items/:id', async (req, res) => {

    try{
        const item = await ShopItemModel.findByPk(req.params.id, {include: ShopBrand})

        res.render('detailed-item.hbs', {
            title: item.name,
            item: {
                title: item.name,
                color: item.color,
                size: item.size,
                brand: item.ShopBrand.title,
                country: item.ShopBrand.country,
                about: item.about,
                imageLink: item.imageLink ? `/${item.imageLink}` : `https://img2.pngindir.com/20180611/cqw/kisspng-computer-icons-device-fonts-ten-year-itch-artific-orthophoto-5b1ee3daeaa645.2109300815287510669611.jpg`,
            }
        })

    }catch(err){
        console.log(err)
    }
})

module.exports = router

