const express = require('express')
const path = require('path')
const cors = require('cors')()
const serverConf = require('./serverConf')
const hf = require('./helperFunctions')
const db = require('./dbConnection')
const bodyParser = require('body-parser')
const associations = require('./associations')

const server = express()
const http = require('http').createServer(server)
server.use(cors)
const PORT = serverConf.port

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

db.sequelizer.authenticate()
    .then(() => {
        console.log('connected')
        global.db = db.sequelizer
        db.initModel()
        associations()
    })
    .catch((error) => console.log(`error ${error}`))

//
// //----------------------images directories------------
const iUsersDir = path.join(__dirname, '/images/users')
const iItemsDir = path.join(__dirname, '/images/items')

server.use('/images/users', express.static(iUsersDir))
server.use('/images/items', express.static(iItemsDir))
//
// //----------------------controllers-------------------
server.use('/api/item',require('./controllers/item.js'))
server.use('/api/user',require('./controllers/user.js'))
server.use('/api/bill',require('./controllers/bill.js'))
server.use('/api/purchase',require('./controllers/purchase.js'))
server.use('/api/externalPayment',require('./controllers/externalPayment.js'))
server.get('/',(req,res)=>{
    res.json({message:'hello'})
})
http.listen(PORT, console.log(`server is now listening on port ${PORT}`))
//const sockets = require('./sockets')
