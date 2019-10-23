const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateRegisterData = require('../../utils/register.validator')
require('dotenv').config()

const User = require('../../models/User/User.model')

router.post('/', (req, res) => {
    const { isValid, errors } = validateRegisterData(req.body)
    if (!isValid) return res.status(400).json(errors)
    User.find({ email: req.body.email })
        .then(users => {
            if (users.length) {
                return res.status(400).json({
                    email: "邮箱已被注册！"
                })
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    tel: req.body.tel,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
        .catch(err => console.log(err))
})


module.exports = router