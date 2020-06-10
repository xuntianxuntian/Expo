const express = require('express')
const router = express.Router()
const isEmpty = require('../../utils/isEmpty')
const escapeRegex = require('../../utils/escapeRegex')
const passport = require('passport')

require('dotenv').config()

const Expo = require('../../models/Expo/Expo.model')

router.get('/all',passport.authenticate('jwt',{session:false}), (req, res) => {
        Expo.find().exec(
            (err, expos) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    res.json(expos)
                }
            }
        )
})

router.get('/query',passport.authenticate('jwt',{session:false}), (req, res) => {
        const regex = new RegExp(escapeRegex(req.query.expoName), 'gi')
        Expo.find({expoName:regex}).exec(
            (err,expos) => {
                if (err) {
                    res.sendStatus(403)
                } else {
                    res.json(expos)
                }
            }
        )
    } 
)



module.exports = router