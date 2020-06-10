const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expoSchema = new Schema({
    cid:{
        type:String,
        required:true,
        unique:true
    },
    expoName:{
        type:String,
        required:true,
        unique:true
    },
    expoUrl:{
        type:String,
    },
    openTime:{
        type:String,
        required:true
    },
    closeTime:{
        type:String,
        required:true
    },
    hostBy:{
        type:String,
    },
    desc:{
        type:String
    },
    createdBy:{
        type:Schema.ObjectId,
        ref:'User',
        required:true
    },
    
},{timestamps:true})


module.exports = Expo = mongoose.model('Expo',expoSchema)