const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

const passport = require('passport')
const multer = require('multer')


router.all('*',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    console.log(req.user)
    const uploadApiArray = ['qualification',]
    next()
})

const qualificationStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        const basePath = `uploads/${req.user.handler}/${req.user.id}/qualification`
        if(fs.existsSync(basePath)){
            cb(null,basePath)
        }else{
            fs.mkdirSync(basePath,{recursive:true})
            cb(null,basePath)
        }
        
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname + '-' + Date.now()+path.extname(file.originalname))
    }
})

const limits = {
    fieldNameSize:20,
    fileSize:1024*1024*2
    
}

const fileFilter = (req,file,cb) =>{
    const imageFilterReg = /jpeg|jpg|png|gif/
    imageFilterReg.test(path.extname(file.originalname))?cb(null,true):cb(null,false)
}

const uploads = multer({storage:qualificationStorage,limits,fileFilter})

router.post('/qualification',(req,res,err)=>{
    console.log('3333333333333333333333333333333333')
    uploads.fields([{name:'yyzz',maxCount:1},{name:'zzyy',maxCount:1}])(req,res,(err)=>{
        if(err){
            res.status(400).json({err})
        }else{
            console.log(req.files['yyzz'][0].path)
            res.json({message:'上传成功！'})
        }
    })
})

module.exports = router