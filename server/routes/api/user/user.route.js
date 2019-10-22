const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

require('dotenv').config()

const User = require('../../../models/User/User.model')


router.all('*',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    console.log(req.user)
    next()
})

router.get('/',(req,res)=>{
    res.json({
        message:"登录成功",
        token:req.headers.authorization
    })
})

router.get('/:username', (req, res) => {
    User.find({ username: req.params.username }, (err, users) => {
        if (err) throw err
        if (users.length) {
            return res.json(users)
        } else {
            return res.status(400).json({
                message: "查询不到相应的用户信息"
            })
        }
    })
})






module.exports = router