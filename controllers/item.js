const express = require('express')
const multer = require('multer')
const uuid = require('uuid')
const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyIsUserAdmin = require('../middlewares/verifyUserAdmin')
const router = express.Router()

const storageM = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, `${file.originalname.substring(0, file.originalname.lastIndexOf('.'))}.${file.mimetype.substring(file.mimetype.indexOf('/') + 1)}`)
    },
    destination: function (req, file, cb) {
        cb(null, 'images/items/')
    }
})
const upload = multer({
    dest: 'images/items',
    storage: storageM
})

router.get('/',verifyJWTToken,async (req,res)=>{
    let dbItems = await item.findAll({
        include:['images']
    })
    res.json(dbItems)
})

router.get('/:id',verifyJWTToken,async (req,res)=>{
    let dbItem = await item.findByPk(req.params.id,{include:['images']})
    res.json(dbItem)
})

router.post('/',verifyJWTToken,upload.array('images[]'),async (req,res)=>{
    try {
        let {name, arabicName, description,unit, purchasePrice, price} = req.body
        let dbItem = await db.transaction(async (t)=>{
            let itemId = uuid.v4()
            let dbInnerItem = await item.create({name,arabicName,description,purchasePrice,unit,price,id:itemId},{transaction:t})
            for(let f = 0;f<req.files.length ; f++){
                await createImage(req.files[f],itemId,t)
            }
            return dbInnerItem
        })
        res.status(200).json(await item.findByPk(dbItem.dataValues.id,{include:['images']}))
    }
    catch(error){
        console.error(error)
        res.status(500).json(error)
    }
})

router.put('/:id',verifyJWTToken,upload.array('images[]'),async (req,res)=>{
    try {
        let id = req.params.id
        let {name, arabicName, description,unit,purchasePrice, price} = req.body
        let dbItem = await db.transaction(async (t)=>{
            let dbInnerItem = await item.update({name,arabicName,description,unit,price,purchasePrice},{where:{id}, transaction:t})
            for(let f = 0;f<req.files.length ; f++){
                await createImage(req.files[f],id,t)
            }
            return dbInnerItem
        })
        res.status(200).json(await item.findByPk(id,{include:['images']}))
    }
    catch(error){
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/',verifyJWTToken,async (req,res)=>{
    try {
        let id = req.body.id
        await item.destroy({where:{id}})
        res.sendStatus(200)
    }
    catch(error){
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/itemImage',verifyJWTToken,async (req,res)=>{
    try {
        let id = req.body.id
        await itemImage.destroy({where:{id}})
        res.sendStatus(200)
    }
    catch(error){
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/allItems', verifyJWTToken,verifyIsUserAdmin, async (req, res) => {
    try {
        await item.destroy({where:{}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})


async function createImage(clientFile,id,t){
    await itemImage.create({imagePath:clientFile.path,itemId:id},{transaction:t})
    return
}
module.exports = router
