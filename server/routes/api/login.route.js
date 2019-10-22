const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../../models/User/User.model')



router.post('/', (req, res) => {
    const { email, password } = req.body
    User.find({ email })
        .then(users => {
            if (users.length === 0) {
                return res.status(400).json({ email: "用户不存在" })
            } else {
                bcrypt.compare(password, users[0].password)
                    .then(passwordMatch => {
                        if (passwordMatch) {
                            console.log(process.env.JWT_KEY)
                            const jwtRule = { id: users[0].id, username: users[0].username }
                            jwt.sign(jwtRule,
                                process.env.JWT_KEY,
                                { expiresIn: 1800 },
                                (err, token) => {
                                    if(err) throw  err
                                    return res.json({
                                        message:"Token Success",
                                        token:"Bearer " + token
                                    })
                                })
                        }else{
                            return res.status(400).json({ password: "密码错误" })
                        }
                    })
            }
        })
        .catch(err => { console.log(err) })

})


module.exports = router