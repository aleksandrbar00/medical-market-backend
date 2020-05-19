const express = require('express')
const router = express.Router()
const ShopBrand = require('../models/ShopBrand')
const ShopItemModel = require('../models/ShopItem')
const fs = require('fs')
const imageHelpers = require('../helpers/imageHelpers')
const queryHelpers = require('../helpers/queryHelpers')
const {Op} = require('sequelize')

router.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Главная',
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

    const categoriesArr = queryHelpers.getQueryParam(req.query.categories, ',', true)
    const sizesArr = queryHelpers.getQueryParam(req.query.sizes, ',', true)
    const brandsArr = queryHelpers.getQueryParam(req.query.brands, ',', true)
 //   const sex = queryHelpers.getQueryParam(req.query.sex, ',')

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


        const catalogArr = await ShopItemModel.findAndCountAll({offset: paginationOffset, limit: itemsPerPage, ...queryObject})
        const catalogParsed = catalogArr.rows.map(item => {
            return {
                title: item.name,
                size: item.size,
                id: item.id,
                imageLink: item.imageLink ? item.imageLink : 'https://img2.pngindir.com/20180611/cqw/kisspng-computer-icons-device-fonts-ten-year-itch-artific-orthophoto-5b1ee3daeaa645.2109300815287510669611.jpg',
            }
        })
        res.render('catalog.hbs', {
            title: 'Каталог',
            brandsItems,
            pagination: {
                grid: catalogParsed,
                pageNumber,
                renderFirstButton: parseInt(pageNumber) === 1 ? false : true,
                renderLastButton: parseInt(pageNumber) === totalPages ? false : true,
                renderNextButton: parseInt(pageNumber) + 1 <= totalPages ? true : false,
                renderPrevButton: parseInt(pageNumber) - 1 >= 1 ? true : false,
                prevUrl: parseInt(pageNumber) - 1 > 0 ? `/catalog?page=${parseInt(pageNumber) - 1}` : false,
                nextUrl: parseInt(pageNumber) + 1 <= totalPages ? `/catalog?page=${parseInt(pageNumber) + 1}` : false,
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

