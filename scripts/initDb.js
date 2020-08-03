const ClothItem = require('../models/ClothItem')
const ShopBrand = require('../models/ShopBrand')
const ShopItem = require('../models/ShopItem')
const ShopItemCategory = require('../models/ShopItemCategory')


const initDbModels = async () => {
    try{
        await ClothItem.sync({force: true})
        await ShopBrand.sync({force: true})
        await ShopItemCategory.sync({force: true})
        await ShopItem.sync({force: true})
    }catch(err){
        console.log(err)
    }
}

const fakeClothes = async () => {
    try{
        const data = [
            {
                title: '70% хлопок 30% шерсть'
            },
            {
                title: '60% хлопок 40% шерсть'
            },
            {
                title: '50% хлопок 50% шерсть'
            },
            {
                title: '100% хлопок'
            }

        ]
        for(const item of data){
            ClothItem.create({
                title: item.title
            })
        }
    }catch(err){

    }
}


const fakeBrands = async () => {
    try{
        const brands = [
            {
                title: 'dtk',
                country: 'Россия'
            },
            {
                title: 'SDS',
                country: 'Россия'
            },
            {
                title: 'dtk-2',
                country: 'Россия'
            },
            {
                title: 'light',
                country: 'Россия'
            },
            {
                title: 'CHS',
                country: 'Китай'
            },
        ]
        for(const item of brands){
            ShopBrand.create(item)
        }
    }catch(err){
        console.log(err)
    }
}

const fakeCategories = async () => {
    try{
        await ShopItemCategory.sync()
        await ShopItemCategory.create({title: 'халаты'})
        await ShopItemCategory.create({title: 'халаты-1'})
        await ShopItemCategory.create({title: 'халаты-2'})
        await ShopItemCategory.create({title: 'халаты-3'})
        await ShopItemCategory.create({title: 'халаты-4'})

    }catch (e) {

    }
}

const fakeItems = async () => {
    try{
        await ShopItem.sync()
        for(let i = 0; i < 10; i++){
            const randomCategory = Math.floor(Math.random() * 3 + 1)
            await ShopItem.create({
                about: `asdasdasd ${i}`,
                color: 'adasd',
                size: 40,
                sex: 'man',
                ShopBrandId: 1,
                ClothItemId: 1,
                ShopItemCategoryId: randomCategory,
                name: `title ${i}`,
                imageLink: 'user10-image-!=8<>: M:@0=0 >B 2020-04-11 11-20-02.png',
            })
        }
    }catch(err){}
}

initDbModels()
