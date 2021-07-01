const hf = require('../helperFunctions')
const jwt = require('jsonwebtoken')

module.exports = async function verifyIsUserAdmin (req,res,next) {
    let decodedUser = await hf.decodeToken(jwt, req.headers['token'])
    if(decodedUser){
        let dbUser = await user.findByPk(decodedUser.id)
        if(dbUser && dbUser.dataValues.roleId == 1) next()
        else res.sendStatus(403)
    }
    else {res.sendStatus(403)}
}
