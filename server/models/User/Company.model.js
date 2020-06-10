const mongoose = require('mongoose')
const Schema = mongoose.Schema


const companySchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    addr: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    taxId: { //税号
        type: String,
        required: true
    },
    bank: {//
        type: String,
        required: true
    },
    account: {//
        type: String,
        required: true,
        unique: true
    },
    license: {//
        type: [String],
        required: true
    },
    level: {//资质证书
        type: [String],
        required: true
    },
    auth: {//验证
        //营业执照验证
        li: {
            type: Boolean,
            default: false
        },
        //资质证书验证
        le: {
            type: Boolean,
            default: false
        },
        //auth error message 验证错误信息
        err: {
            li:{
                type:String,
                default:''
            },
            le:{
                type:String,
                default:''
            }
        }
    }


}, { timestamps: true })


module.exports = Company = mongoose.model('Company', companySchema)
