const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoothSchema = new Schema({
    boothId: {
        type: String,
        required: true
    },
    boothSize: {
        type: String,
        required: true
    },
    boothName: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expoId: {
        type: Schema.Types.ObjectId,
        ref: 'Expo'
    },
    auth: {
        updatedAt:String,
        status:{
            type:String,
            default:'uncommited',// 'uncommited',未提交 'commited'已提交，审核中 
                                //'failed'已提交  审核失败 'success'已提交 审核通过
        },
        err:[{}]
    },
    files: {
        updatedAt:String,
        wtPic: {//委托证明
            type: String,//上传文件的路径地址及文件名
        },
        xgPic: {//效果图
            type: String,
        },
        ccPic: {//尺寸图
            type: String,
        },
        czPic: {//材质图
            type: String,
        },
        dlPic: {//电路图
            type: String,
        },
        aqPic: {//责任安全书
            type: String,
        },
        qtPic: {//其他证件
            type: String,
        },
    },
    info: {
        updatedAt:String,
        maxHt: {//最大高度
            type: String,
        },
        maxSp: {//最大跨度
            type: String,
        },
        minTh: {//支撑墙最小厚度
            type: String,
        },
        totalEp: {//总用电功率
            type: String,
        },
        cableTp: {//电缆规格
            type: String,
        },
        bmName: {//施工负责人
            type: String,
        },
        bmTel: {//施工负责人电话
            type: String,
        },
        emName: {//电力负责人
            type: String,
        },
        emTel: {//电力负责人电话
            type: String,
        },
        email: {//预留邮箱
            type: String,
        },
    }
}, { timestamps: true })


module.exports = Booth = mongoose.model('Booth', BoothSchema)