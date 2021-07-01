const nodemailer = require('nodemailer')

var serverConf = {
    host:'localhost',
    serverHost:'82.137.250.151',
    port:5252,                  //api port
    algorithm:'aes-256-ctr',        //encryption algorithm
    serverSKey:'billsManager@1234@3',       //a secret server key for encryption
    transport: nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "",
            pass: ""
        }
    })
}

module.exports = serverConf
