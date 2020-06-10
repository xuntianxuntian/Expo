const express = require('express')
const router = express.Router()
const isEmpty = require('../../utils/isEmpty')
const escapeRegex = require('../../utils/escapeRegex')
const passport = require('passport')

const isContain = require('../../utils/isContain').isContain
const keepChar = require('../../utils/isContain').keepChar

require('dotenv').config()

const Booth = require('../../models/Booth/Booth.model')
const Expo = require('../../models/Expo/Expo.model')


//查询已添加的所有展位
router.get('/listAll', passport.authenticate('jwt', { session: false }), (req, res) => {
    Expo.find({ cid: req.query.cid }).exec(
        (err, expos) => {
            if (err) {
                res.status(503).json('服务器中断了请求!')
            } else {
                if(expos.length){
                    Booth.find({ userId: req.user.id ,expoId:expos[0].id}).exec(
                        (err, booths) => {
                            if (err) {
                                res.status(503).json(err)
                            } else {
                                if (booths.length > 0) {
                                    res.status(200).json(booths)
                                } else {
                                    res.status(404).json('未找到属于您的展位信息!')
                                }
                            }
                        }
                    )
                }
                else{
                    res.status(404).json('未找到对应展会的展位')
                }
            }
        }
    )
})

//查询展位
router.get('/search', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { boothId, boothName, cid } = req.query
    Expo.findOne({ cid }).exec(
        (err, expo) => {
            if (err) {
                res.status(503).json({error:'服务器中断您的请求!'})
            } else {
                console.log(expo.id)
                Booth.findOne({ boothId, expoId: expo.id }).exec(
                    (err, booth) => {
                        if (err) {
                            console.log('err')
                            res.status(404).json(err)
                        } else {
                            if (booth) {
                                console.log(isContain(keepChar(boothName), booth.boothName))
                                if (isContain(booth.boothName, keepChar(boothName))) {
                                    res.status(200).json(booth)
                                } else {
                                    res.json({error:{ boothName: '展位名称不匹配!' }})
                                }
                            } else {
                                console.log('err')
                                res.json({ error: { boothId: '当前展会未找到对应展位，请核对当前展会名称或展位号!' } })
                            }
                        }
                    }
                )
            }
        }
    )
})

//保存展位
router.post('/save', passport.authenticate('jwt', { session: false }),(req,res) => {
    console.log(req.body)
    Booth.findOne({boothId:req.body.booth.boothId,expoId:req.body.booth.expoId}).exec(
        (err,booth) => {
            if(err){
                res.status(503).json({error:'服务器中断了请求!'})
            }else{
                if(booth){
                    if(booth.userId){
                        res.json({isOccupied:true})
                    }else{
                        booth.userId = req.user.id
                        booth.save().then(savedBooth =>{
                            if(savedBooth.userId){
                                res.json({isoccupied:false})
                            }else{
                                res.json({error:'保存失败!'})
                            }
                        })
                    }
                }
            }
        }
    )
})

//查询展位信息模板
router.get('/infoTemp', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json(
        {
            infoTempList: [{
                id: 22,
                key: 0,
                tempName: '食材展会张经理',
                maxHt: '5',
                maxSp: '6',
                minTh: '200',
                totalEp: '3.5',
                cableTp: '5',
                bmName: '刘经理',
                bmTel: '15356464',
                emName: '赵经理',
                emTel: '1651651616',
                email: '871962206@qq.com',
                isDefault: true
            }, {
                id: 23,
                key: 1,
                tempName: '健博会刘',
                maxHt: '4',
                maxSp: '4',
                minTh: '100',
                totalEp: '2.5',
                cableTp: '3',
                bmName: '王经理',
                bmTel: '128825466',
                emName: '赵经理',
                emTel: '1465645416',
                email: '11232206@qq.com',
                isDefault: false
            }]
        }
    )
})

//更新、修改展位信息模板
router.put('/infoTemp', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({
        infoTempList: req.body
    })

})

//保存展位表单信息
router.post('/info',passport.authenticate('jwt', { session: false }), (req, res) => {
    Booth.findOne({userId:req.user.id,boothId:req.body.data.boothId})
    .exec(
        (err,booth) => {
            if(err){
                res.status(404).json('服务器无法完成请求!')
            }else{
                booth.info = req.body.data.formData
                booth.auth = {status:'commited',err:[]}
                booth.save((err,newBooth) => {
                    if(err){
                        res.status(500).json('保存失败!')
                    }else{
                        res.status(200).json(newBooth.info)
                    }
                })
            }
        }
    )
})

module.exports = router