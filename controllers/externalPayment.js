const express = require('express')
const uuid = require('uuid')
const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyIsUserAdmin = require('../middlewares/verifyUserAdmin')
const router = express.Router()

router.get('/', verifyJWTToken, async (req, res) => {
    let dbExternalPayments = await externalPayment.findAll()
    res.json(dbExternalPayments)
})

router.post('/', verifyJWTToken, async (req, res) => {
    try {
        let {price, description} = req.body
        let externalPaymentId = uuid.v4()
        let dbEPayment = await externalPayment.create({price,description,id:externalPaymentId,dateTime:Date.now()})
        res.status(200).json(dbEPayment)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.put('/:id', verifyJWTToken, async (req, res) => {
    try {
        let {id, price, description} = req.body
        await externalPayment.update({price,description},{where:{id}})
        res.status(200).json(await externalPayment.findByPk(id))
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/', verifyJWTToken, async (req, res) => {
    try {
        let id = req.body.id
        await externalPayment.destroy({where: {id}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/allExternalPayments', verifyJWTToken,verifyIsUserAdmin, async (req, res) => {
    try {
        await externalPayment.destroy({where:{}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})


module.exports = router
