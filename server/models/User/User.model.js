const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        // required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        unique: true
    },
    captcha: {
        type: String
    },
    handler: {
        type: String,
        default: 'USER'
    },
    myBooths: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booth'
        }],
    expoCID: [String],
    currentExpoCID: {
        type: String,
        default: ''
    },
}, { timestamps: true })


module.exports = User = mongoose.model('User', UserSchema)