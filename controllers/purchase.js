const express = require('express')
const uuid = require('uuid')
const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyIsUserAdmin = require('../middlewares/verifyUserAdmin')
const router = express.Router()

router.get('/', verifyJWTToken, async (req, res) => {
    let dbExternalPayments = await itemPurchase.findAll({
        include: [{
            model: item,
            as: 'item',
            include: ['images']
        }]
    })
    res.json(dbExternalPayments)
})

router.post('/', verifyJWTToken, async (req, res) => {
    try {
        let {price, amount, description, itemId} = req.body
        let itemPaymentId = uuid.v4()
        let dbIPayment = await itemPurchase.create({
            price,
            amount,
            description,
            itemId,
            id: itemPaymentId,
            dateTime: Date.now()
        })
        res.json(await itemPurchase.findByPk(dbIPayment.dataValues.id, {
            include: [{
                model: item,
                as: 'item',
                include: ['images']
            }]
        }))
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.put('/:id', verifyJWTToken, async (req, res) => {
    try {
        let {id, price, amount, description, itemId} = req.body
        let dbIPayment = await itemPurchase.update({
            price,
            amount,
            description,
            itemId
        },{
            where:{id}
        })
        res.status(200).json(await itemPurchase.findByPk(id, {
            include: [{
                model: item,
                as: 'item',
                include: ['images']
            }]
        }))
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/', verifyJWTToken, async (req, res) => {
    try {
        let id = req.body.id
        await itemPurchase.destroy({where: {id}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/allPurchases', verifyJWTToken,verifyIsUserAdmin, async (req, res) => {
    try {
        await itemPurchase.destroy({where:{}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router
