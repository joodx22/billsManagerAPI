const express = require('express')
const uuid = require('uuid')
const verifyJWTToken = require('../middlewares/verifyJWTToken')
const verifyIsUserAdmin = require('../middlewares/verifyUserAdmin')
const router = express.Router()

router.get('/getBillsNow',(req,res)=>{
    res.json({message:'hello from bills'})
})

router.get('/', verifyJWTToken, async (req, res) => {
    let userId = req.query.userId
    let dbUserBills = await bill.findAll({
        include:['user','createdByUser',{
            model:billItem,
            as:'billItems',
            include:['item'],
            required:false
        }],
        order:[['dateTime']]
    })
    dbUserBills = await setBillsProfit(dbUserBills)
    res.status(200).json(dbUserBills)
})

router.get('/:id', verifyJWTToken, async (req, res) => {
    let dbBill = await bill.findAll({
        where:{userId:req.params.id},
        include:['user','createdByUser',{
            model:billItem,
            as:'billItems',
            include:['item'],
            required:false
        }],
        order:[['dateTime']]
    })
    dbBills = await setBillsProfit(dbBill)
    res.json(dbBills)
})

router.post('/', verifyJWTToken, async (req, res) => {
    try {
        let {userId,discount,billItems,createdBy} = req.body
        let dbBill = await db.transaction(async (t) => {
            let billId = uuid.v4()
            let dbInnerBill = await bill.create({userId,discount,createdBy, id:billId, dateTime:Date.now()}, {transaction: t})
            for (let i = 0; i < billItems.length; i++) {
                await createBillItem(billItems[i], billId, t)
            }
            return dbInnerBill
        })
        dbBill = await bill.findByPk(dbBill.dataValues.id,{
            include:['user','createdByUser',{
                model:billItem,
                as:'billItems',
                include:['item'],
                required:false
            }]
        })
        dbBill = (await setBillsProfit([dbBill]))[0]
        res.status(200).json(dbBill)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.put('/:id', verifyJWTToken, async (req, res) => {
    try {
        let id = req.params.id
        let {discount,billItems} = req.body
        await db.transaction(async (t) => {
            await bill.update({discount}, {where:{id}, transaction: t})
            for (let i = 0; i < billItems.length; i++) {
                if(billItems[i].id == -1) await createBillItem(billItems[i], id, t)
                else await updateBillItem(billItems[i], t)
            }
        })
        let dbBill = await bill.findByPk(id,{
            include:['user','createdByUser',{
                model:billItem,
                as:'billItems',
                include:['item'],
                required:false
            }]
        })
        dbBill = (await setBillsProfit([dbBill]))[0]
        res.status(200).json(dbBill)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/', verifyJWTToken, async (req, res) => {
    try {
        let id = req.body.id
        await bill.destroy({where: {id}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.delete('/billItem', verifyJWTToken, async (req, res) => {
    try {
        let id = req.body.id
        await billItem.destroy({where: {id}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})


router.delete('/allBills', verifyJWTToken,verifyIsUserAdmin, async (req, res) => {
    try {
        await bill.destroy({where:{}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

async function createBillItem(clientBillItem,id,t){
    let {price, amount, unit, itemId} = clientBillItem
    let dbItem = await item.findByPk(itemId)
    await billItem.create({price, amount, unit, itemId,itemPurchasePrice:dbItem.dataValues.purchasePrice, billId:id},{transaction:t})
    return
}

async function updateBillItem(clientBillItem, t){
    let {price, amount, unit, itemId, id} = clientBillItem
    await billItem.update({price, amount, unit, itemId},{where:{id},transaction:t})
    return
}

async function setBillsProfit(bills){
    for(let b=0 ; b<bills.length ; b++)
    {
        let dbBill = bills[b].dataValues
        let profit = 0
        let totalPrice = 0
        for(let i = 0 ;i<dbBill.billItems.length ; i++){
            let dbBillItem = dbBill.billItems[i].dataValues
            profit += dbBillItem.price - dbBillItem.amount * dbBillItem.itemPurchasePrice
            totalPrice += dbBillItem.price
        }
        bills[b].dataValues.totalPrice = totalPrice - totalPrice * dbBill.discount/100
        bills[b].dataValues.profit = profit - (totalPrice * dbBill.discount/100)
    }
    return bills
}
module.exports = router
