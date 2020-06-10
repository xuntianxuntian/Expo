const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InfoTempSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    temp:[{
        isDefault:Boolean,
        tempName:{
            type:String,
            required:true
        },
        maxHt:{//最高点 height
            type:String,
            required:true
        },
        maxSp:{//最大跨度span
            type:String,
            required:true
        },
        minTh:{//最小厚度
            type:String,
            required:true
        },
        totalEp:{//总用电功率 electricity power
            type:String,
            required:true
        },
        cableTp:{//电缆规格
            type:String,
            required:true
        },
        
        bmName:{//施工负责人名字 buildManager
            type:String,
            required:true
        },
        bmTel:{//施工负责人电话 buildManager
            type:String,
            required:true
        },
        emName:{//电力负责人名字 electricity Manager
            type:String,
            required:true
        },
        emTel:{//电力负责人电话
            type:String,
            required:true
        },
        email:{//预留邮箱
            type:String,
            required:true
        },
    }]
}, { timestamps: true })


module.exports = InfoTemp = mongoose.model('InfoTemp', InfoTempSchema)