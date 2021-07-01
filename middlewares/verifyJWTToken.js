const hf = require('../helperFunctions')
const jwt = require('jsonwebtoken')

module.exports = async function verifyJWTToken (req,res,next) {
    let verifyResult = await hf.verifyToken(jwt, req.headers['token'])
    if(verifyResult) next()
    else {res.sendStatus(403)}
}
