const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {type: String, required: true},
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxLength: 70
    },
    paymentInfo: {type: String},
    publisherAgreement: {
        type: Boolean, 
        default: false
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password
            return ret
        }
    }
})

module.exports = mongoose.model('User', userSchema)