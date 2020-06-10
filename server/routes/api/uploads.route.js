const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const passport = require('passport')
const multer = require('multer')


router.post('*', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('sssssssssssssss')
    const uploadApiArray = ['qualification', 'booth', 'submission', 'info', 'boothDesign']
    const uploadURL = req.url.slice(1)
    let URLislegal = false

    //判断当前路径是否合法
    for (i = 0; i < uploadApiArray.length; i++) {
        if (uploadApiArray[i] === uploadURL) {
            URLislegal = true
            break
        }
    }
    //不合法直接res
    if (!URLislegal) {
        res.json({ error: '上传路径不合法！' })
    }

    //动态设置不同的URL对应的上传options
    var options

    if (uploadURL === 'qualification') {
        options = [{ name: 'license', maxCount: 1 }, { name: 'level', maxCount: 3 }]
    } else if (uploadURL === 'booth') {
        options = [{ name: 'wtPic', maxCount: 2 }]
    } else if (uploadURL === 'boothDesign') {
        options = [{ name: 'xgPic', maxCount: 6 }, { name: 'ccPic', maxCount: 5 },
        { name: 'czPic', maxCount: 3 }, { name: 'dlPic', maxCount: 2 },
        { name: 'aqPic', maxCount: 5 }, { name: 'qtPic', maxCount: 5 }]
    }

    // 在图片文件前  删除之前已经上传的相关字段的图片  避免图片超过规定的量


    const qualificationStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const basePath = `uploads/${req.user.handler}/${req.user.id}/${uploadURL}`
            if (fs.existsSync(basePath)) {
                const fileArray = fs.readdirSync(basePath)
                const reg = new RegExp(file.fieldname)
                let maxFileNum;
                options.forEach(option => {
                    if (option.name == file.fieldname) {
                        maxFileNum = option.maxCount
                    }
                })
                let filteredArray = []
                fileArray.forEach(fileName => {
                    if (reg.test(fileName)) {
                        filteredArray.push(fileName)
                    }
                })
                if (!(filteredArray.length < maxFileNum)) {
                    let splitedArray = []
                    filteredArray.forEach(name => {
                        splitedArray.push(name.split('-')[1].split('.')[0])
                    })
                    let sortedArray = splitedArray.sort((a, b) => { return a - b })

                    let deleteArray = sortedArray.slice(0, splitedArray.length - maxFileNum + 1)
                    deleteArray.forEach(num => {
                        str = num.toString()
                        let deleteReg = new RegExp(str)
                        fileArray.forEach(fileName => {
                            if (deleteReg.test(fileName)) {
                                fs.unlink(basePath + '/' + fileName, (err) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    console.log(fileName + '已删除成功!')
                                })
                            }
                        })
                    })
                }

                cb(null, basePath)
            } else {
                fs.mkdirSync(basePath, { recursive: true })
                cb(null, basePath)
            }
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    const limits = {
        fieldNameSize: 100,
        fileSize: 1024 * 1024 * 2
    }

    const fileFilter = (req, file, cb) => {
        const imageFilterReg = /jpeg|jpg|png|gif/
        imageFilterReg.test(path.extname(file.originalname)) ? cb(null, true) : cb(new Error('文件类型错误!'))
    }

    const uploads = multer({ storage: qualificationStorage, limits, fileFilter })

    uploads.fields(options)(req, res, (err) => {
        if (err) {
            console.log(err)
            res.status(400).json({ err })
        } else {
            res.json({ message: '上传成功！' })
        }
    })

})





module.exports = router