const express = require('express')
const router = express.Router()
const passport = require('passport')
const isEmpty = require('../../../utils/isEmpty')

require('dotenv').config()

const User = require('../../../models/User/User.model')
const Expo = require('../../../models/Expo/Expo.model')
const Company = require('../../../models/User/Company.model')

// router.all('*',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
//     console.log(req.user)
//     next()
// })

// router.get('/',(req,res)=>{
//     res.json({
//         message:"登录成功",
//         token:req.headers.authorization
//     })
// })

// router.get('/:username', (req, res) => {
//     User.find({ username: req.params.username }, (err, users) => {
//         if (err) throw err
//         if (users.length) {
//             return res.json(users)
//         } else {
//             return res.status(400).json({
//                 message: "查询不到相应的用户信息"
//             })
//         }
//     })
// })

router.put('/addExpo', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user.expoCID)
    console.log(typeof req.user.expoCID)

    req.user.expoCID.push(req.body.cid)
    User.update({ email: req.user.email }, { $set: { expoCID: req.user.expoCID } }).exec(
        (err, raw) => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }

        }
    )
})

router.get('/myExpo', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user.expoCID)
    Expo.find({ cid: { $in: req.user.expoCID } }).exec(
        (err, expos) => {
            if (err) {
                res.json({ error: '无法找到相应信息或服务器故障!' })
            } else {
                res.status(200).json({ data: expos })
            }
        }
    )
    // req.query.expoCID.forEach(cid => {

    // })

}
)

router.put('/currentExpo', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body)
    User.updateOne({ email: req.user.email }, { $set: { currentExpoCID: req.body.cid } })
        .exec(
            (err, raw) => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    if (raw) {
                        res.sendStatus(200)
                    } else {
                        res.status(403).json({ error: "服务器拒绝了您的请求!" })
                    }
                }
            }
        )
})
//公司信息认证  之后的修改和重新提交   post=>put
router.post('/company', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.company) {
        const newCom =  req.body.formData
        newCom.auth = {
            li:false,
            le:false,
            err:{
                li:'',
                le:''
            }
        }
        Company.findByIdAndUpdate({_id:req.user.company}, { $set: newCom })
            .exec(
                (err, raw) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json(err)
                    } else {
                        if (raw) {
                            res.json(newCom)
                        } else {
                            res.status(403).json({ error: "服务器拒绝了您的请求!" })
                        }
                    }
                }
            )
    }
    else {
        const newCom = new Company(req.body.formData)
        newCom.userId = req.user.id
        newCom.save(
            (err, company) => {
                if (err) {
                    console.log(err)
                    if (err.name === 'MongoError' && err.code === 11000) {
                        return res.status(202).json({ error: '已存在相同的公司信息!' })
                    }
                    return res.status(500).json(err)
                }
                else {
                    if (company) {
                        User.updateOne({ email: req.user.email }, { $set: { company: company._id } }).exec(
                            (err, raw) => {
                                if (err) {
                                    return res.status(400).json(company)
                                }
                                res.json(company)
                            }
                        )
                    } else {
                        return res.status(400).json({ error: "无法找到公司信息!" })
                    }

                }
            }
        )
    }
})

//用户更新修改公司信息
router.put('/company', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newCompany = req.body.company
    User.findOne({ email: req.user.email })
        .exec(
            (err, user) => {
                if (err) {
                    res.status(404).json(err)
                } if (user) {
                    Company.findByIdAndUpdate(user.company.id, { $set: newCompany })
                        .exec(
                            (err, raw) => {
                                if (err) {
                                    res.status(404).json(err)
                                } else {
                                    if (raw) {
                                        res.json('更新成功!')
                                    } else {
                                        res.status(403).json({ error: "服务器拒绝了您的请求!" })
                                    }
                                }
                            }
                        )
                }

            }
        )
})

//用户获取公司信息
router.get('/company', passport.authenticate('jwt', { session: false }), (req, res) => {
    if(req.user.company){
        User.findOne({ email: req.user.email })
            .populate('company').exec(
                (err, user) => {
                    if (err) {
                        res.status(500).json(err)
                    } else if (!user.company) {
                        res.status(404).json('信息不存在!')
                    } else {
                        res.status(200).json(user.company)
                    }
                }
            )
    }else{
        res.status(202).json('还未绑定公司信息!')
    }
})






module.exports = router