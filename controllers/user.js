const express = require('express')
const multer = require('multer')
const uuid = require('uuid')
const bCrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const conf = require('../serverConf')
const verifyJWTToken = require('../middlewares/verifyJWTToken')
const router = express.Router()
const saltRound = 10

const storageM = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, `${file.originalname.substring(0, file.originalname.lastIndexOf('.'))}.${file.mimetype.substring(file.mimetype.indexOf('/') + 1)}`)
    },
    destination: function (req, file, cb) {
        cb(null, 'images/users/')
    }
})
const upload = multer({
    dest: 'images/users',
    storage: storageM
})

router.get('/', verifyJWTToken, async (req, res) => {
    let roleId = req.query.roleId
    let dbUsers = await user.findAll({where: {roleId}})
    res.json(dbUsers)
})

router.get('/:id', verifyJWTToken, async (req, res) => {
    let dbUser = await user.findByPk(req.params.id)
    res.json(dbUser)
})

//sign up
router.post('/', verifyJWTToken, upload.single('image'), async (req, res) => {
    try {
        let {username, password, firstName, middleName, lastName, contactNumber, email, roleId} = req.body
        let previouslyDBUser = await user.findOne({where:{username}})
        if(previouslyDBUser){
            res.status(500).json({
                message:'Username exist,Please put an Unique Username'
            })
            return
        }
        let userId = uuid.v4()
        let genKey = uuid.v4()
        let ex = crypto.createHash('sha256').update(genKey).digest('base64').substr(0, 16)
        let encryptedPassword = enctryptPassword(password, ex)
        let createObject = {
            username,
            firstName,
            middleName,
            lastName,
            contactNumber,
            email,
            roleId,
            id: userId,
            password: bCrypt.hashSync(encryptedPassword, saltRound),
            ex: ex,
            registrationDate:Date.now(),
        }
        if (req.file != null) createObject.image = req.file.path
        let dbUser = await user.create(createObject)
        res.status(200).json(dbUser)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.put('/:id', verifyJWTToken, upload.single('image'), async (req, res) => {
    try {
        let userId = req.params.id
        let {firstName, middleName, lastName, contactNumber, email} = req.body
        let createObject = {firstName, middleName, lastName, contactNumber, email}
        if (req.file != null) createObject.image = req.file.path
        await user.update(createObject, {where: {id: userId}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.post('/signIn', async (req, res) => {
    try {
        let {username, password, auto} = req.body
        let user = await global.user.findOne({
            where: {
                username
            },
            include: ['role']
        })
        if (user != null) {
            if ((auto && password == user.dataValues.password) || bCrypt.compareSync(enctryptPassword(password, user.dataValues.ex), user.dataValues.password)) {
                let token = await jwt.sign(user.dataValues, conf.serverSKey)
                res.status(200).json({
                    user, token
                })
            } else{
                res.sendStatus(404)
            }
        }
        else{
            res.sendStatus(404)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/', verifyJWTToken, async (req, res) => {
    try {
        let id = req.body.id
        await user.destroy({where: {id}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

function enctryptPassword(password, userEX) {
    let serverKey = crypto.createHash('sha256').update(conf.serverSKey).digest('base64').substr(0, 16)
    let cryptoKey = crypto.createCipheriv(conf.algorithm, serverKey + userEX, conf.serverSKey.toString('hex').slice(0, 16))
    return Buffer.concat([cryptoKey.update(password, 'utf8')]).toString()
}

module.exports = router
