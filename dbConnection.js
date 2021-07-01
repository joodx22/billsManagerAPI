const Sequelize = require('sequelize')
const serverConf = require('./serverConf')
const models = ['role',
                'user',
                'item',
                'itemImage',
                'bill',
                'billItem',
                'itemPurchase',
                'externalPayment']

module.exports = {
    sequelizer: new Sequelize('billsmanager', 'root', '12345', {
        host: 'http://82.137.250.151',
        dialect: 'mysql',
        define: {
            timestamps: false
        },
        pool: {
            max: 25,
            min: 0,
            idle: 10000
        },
    }),
    initModel: () => {
        models.forEach(m=>{
            let mObject = require(`./models/${m.toLowerCase()}.js`)(global.db)
            global[m] = mObject
        })
    }
}
