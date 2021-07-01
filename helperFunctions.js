const conf = require('./serverConf')

var helperFunction = {
    verifyToken: async (jwt, token) => {
        try {
            if (token == null) return false
            let verifyResult = await jwt.verify(token, conf.serverSKey)
            if (verifyResult) return true
            else return false
        } catch (error) {
            return false
        }
    },
    decodeToken: async (jwt, token) => {
        try {
            if (token == null) return null
            let decodeResult = await jwt.decode(token, conf.serverSKey)
            return decodeResult
        } catch (error) {
            throw 'Token couldn\'t get decoded'
        }
    },
    sendConfirmationEMail: async (toEmail, jwtSign) => {
        let email = {
            from: conf.apiEmail,
            to: toEmail,
            subject: 'confirming EMail address',
            html: `<h3 style="margin: 0 auto; width: auto">please click <a href="http://${conf.serverHost}:${conf.port}/email?function=confirmEmail&co=${jwtSign}">Here</a> to activate your account</h3>`
        }

        conf.transport.sendMail(email, (err, info) => {
            if (err) {
                console.error(err)
            } else {
                console.log(info)
            }
        })
    },
    sendResetPasswordEmail: async (toEmail, uuid, userFullName) => {
        let email = {
            from: conf.apiEmail,
            to: toEmail,
            subject: 'confirming EMail address',
            html: `<p>hey ${userFullName}</p><br>` +
                `<p>We heard you lost your Restaurants account password.Sorry about that!</p><br>` +
                `<p>But don\'t worry! You can reset your password by clicking</p>` +
                `<a href="http://${conf.serverHost}:${conf.port}/email?function=resetPasswordLink&i=${uuid}">Here</a></p>`
        }

        conf.transport.sendMail(email, (err, info) => {
            if (err) {
                console.error(err)
            } else {
                console.log(info)
            }
        })
    }
}

module.exports = helperFunction
