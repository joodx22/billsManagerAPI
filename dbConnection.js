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
    sequelizer: new Sequelize('sql11423734', 'sql11423734', 'L6fWa6qJ1e', {
        host: 'sql11.freemysqlhosting.net',
        dialect: 'mysql',
        dialectOptions: {
            connectTimeout:100000
        },
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
