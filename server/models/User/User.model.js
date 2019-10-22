const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    tel:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})


module.exports = User = mongoose.model('users',UserSchema)